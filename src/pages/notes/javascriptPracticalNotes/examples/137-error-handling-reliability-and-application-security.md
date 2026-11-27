# Example 137 - Error handling, reliability, and application security

## Question

How can a browser page validate a profile ID, retry a temporary request failure with a limit, cancel stale work, and display returned text safely?

## Complete example

Save this as an HTML file and open it in a browser. The mock transport marks one simulated network failure as retryable, then succeeds. No server is required.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reliable profile lookup</title>
  <style>
    body { max-width: 42rem; margin: 2rem auto; padding: 0 1rem; font: 1rem/1.5 system-ui, sans-serif; }
    form { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    input, button { font: inherit; padding: 0.5rem; }
    #status { min-height: 1.5em; }
    #result { border: 1px solid #888; border-radius: 0.5rem; padding: 1rem; }
  </style>
</head>
<body>
  <main>
    <h1>Profile lookup</h1>
    <p>Use a profile ID made of letters, numbers, and hyphens.</p>
    <form id="lookup-form">
      <label for="profile-id">Profile ID</label>
      <input id="profile-id" name="profileId" value="ada" required>
      <button type="submit">Load profile</button>
    </form>
    <p id="status" role="status" aria-live="polite"></p>
    <section id="result" aria-label="Profile result"></section>
  </main>

  <script>
    class AppError extends Error {
      constructor(message, options = {}) {
        super(message);
        this.name = new.target.name;
        this.code = options.code || "APP_ERROR";
        this.retryable = options.retryable === true;
        if (options.cause !== undefined) this.cause = options.cause;
      }
    }

    class NetworkError extends AppError {
      constructor(cause) {
        super("The profile service could not be reached.", {
          code: "NETWORK_ERROR",
          retryable: true,
          cause
        });
      }
    }

    class HttpError extends AppError {
      constructor(status) {
        super("The profile service returned an error.", {
          code: status === 404 ? "PROFILE_NOT_FOUND" : "HTTP_ERROR",
          retryable: status === 429 || status >= 500
        });
        this.status = status;
      }
    }

    function validateProfileId(value) {
      const id = value.trim();
      if (!/^[a-z0-9-]{1,24}$/i.test(id)) {
        throw new AppError("Enter a valid profile ID.", { code: "INVALID_PROFILE_ID" });
      }
      return id;
    }

    async function mockFetch(url, options) {
      if (options.signal.aborted) {
        throw new DOMException("Cancelled.", "AbortError");
      }

      const id = decodeURIComponent(url.split("/").pop());
      if (id === "ada" && mockFetch.firstAttempt) {
        mockFetch.firstAttempt = false;
        throw new NetworkError(new Error("Simulated temporary network failure"));
      }

      if (id === "ada") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ id: "ada", name: "Ada Lovelace" })
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    }

    mockFetch.firstAttempt = true;

    async function fetchProfile(id, signal) {
      let response;
      try {
        response = await mockFetch(
          "/api/profiles/" + encodeURIComponent(id),
          { signal }
        );
      } catch (cause) {
        if (signal.aborted) throw new DOMException("Cancelled.", "AbortError");
        throw cause;
      }

      if (!response.ok) throw new HttpError(response.status);

      let profile;
      try {
        profile = await response.json();
      } catch (cause) {
        throw new AppError("The profile response could not be read.", {
          code: "INVALID_RESPONSE",
          cause
        });
      }

      if (
        profile === null ||
        typeof profile !== "object" ||
        typeof profile.id !== "string" ||
        typeof profile.name !== "string" ||
        profile.name.trim() === "" ||
        profile.name.length > 80
      ) {
        throw new AppError("The profile response had an invalid shape.", {
          code: "INVALID_RESPONSE"
        });
      }
      return profile;
    }

    function wait(ms, signal) {
      return new Promise((resolve, reject) => {
        if (signal.aborted) {
          reject(new DOMException("Cancelled.", "AbortError"));
          return;
        }
        const timer = setTimeout(() => {
          signal.removeEventListener("abort", cancel);
          resolve();
        }, ms);
        function cancel() {
          clearTimeout(timer);
          signal.removeEventListener("abort", cancel);
          reject(new DOMException("Cancelled.", "AbortError"));
        }
        signal.addEventListener("abort", cancel, { once: true });
      });
    }

    async function withRetry(operation, signal) {
      const maxAttempts = 3;
      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        if (signal.aborted) throw new DOMException("Cancelled.", "AbortError");
        try {
          return await operation();
        } catch (error) {
          const isLastAttempt = attempt === maxAttempts - 1;
          if (!error.retryable || isLastAttempt || signal.aborted) throw error;

          const baseDelay = Math.min(2000, 250 * (2 ** attempt));
          const delayMs = Math.round(baseDelay * (0.75 + Math.random() * 0.5));
          console.info("Retrying profile request", {
            attempt: attempt + 1,
            delayMs
          });
          await wait(delayMs, signal);
        }
      }
      throw new AppError("Unexpected request state.", { code: "UNEXPECTED_STATE" });
    }

    function userMessageFor(error) {
      if (error.code === "INVALID_PROFILE_ID") {
        return "Use 1 to 24 letters, numbers, or hyphens.";
      }
      if (error.code === "PROFILE_NOT_FOUND") {
        return "No profile was found for that ID.";
      }
      return "The profile could not be loaded. Please try again.";
    }

    function renderProfile(container, profile) {
      const heading = document.createElement("h2");
      heading.textContent = profile.name;
      const id = document.createElement("p");
      id.textContent = "Profile ID: " + profile.id;
      container.replaceChildren(heading, id);
    }

    const form = document.querySelector("#lookup-form");
    const input = document.querySelector("#profile-id");
    const status = document.querySelector("#status");
    const result = document.querySelector("#result");
    let activeController = null;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (activeController) activeController.abort();

      const controller = new AbortController();
      activeController = controller;
      result.replaceChildren();
      status.textContent = "Loading profile...";

      try {
        const id = validateProfileId(input.value);
        const profile = await withRetry(
          () => fetchProfile(id, controller.signal),
          controller.signal
        );
        renderProfile(result, profile);
        status.textContent = "Profile loaded.";
      } catch (error) {
        if (controller.signal.aborted) return;
        result.replaceChildren();
        status.textContent = userMessageFor(error);
      } finally {
        if (activeController === controller) activeController = null;
      }
    });
  </script>
</body>
</html>
~~~

## Expected output

With the prefilled ID ada, the mock request fails temporarily on its first attempt and succeeds on the second:

- The status first says **Loading profile...**
- The console reports one bounded retry and its delay.
- The status then says **Profile loaded.**
- The result shows **Ada Lovelace** and **Profile ID: ada**.

Enter another valid ID to see **No profile was found for that ID.** An invalid ID is rejected before a request. The retry delay varies because it includes jitter.

## Explanation

- **Validate at the boundary.** The ID is trimmed and restricted to a short allowlist. The server must validate independently.
- **Classify failures.** Temporary network errors can be retried; a 404 and malformed response cannot. Stable codes drive program behavior instead of message text.
- **Bound retries.** There are at most three attempts, with increasing delays, jitter, and cancellation. A write request also needs an idempotency strategy before retrying. Do not classify programming errors as transient network failures.
- **Cancel stale work.** A new submission aborts the previous request. The previous catch path cannot replace the new request's UI.
- **Check response data.** A success status does not guarantee that the response has the expected shape.
- **Render text safely.** The profile name uses textContent, so markup-like characters are shown as text instead of parsed as HTML.
- **Keep errors safe.** The UI does not expose stack traces or causes. Production logs should be structured and omit credentials and unnecessary personal information.
- **Use a real transport in an application.** Replace mockFetch with fetch while keeping the same validation, error classification, retry budget, cancellation, and safe rendering.

## Try it yourself

1. Submit ada and observe that the temporary failure is retried once.
2. Submit missing and observe the not-found message.
3. Submit a value with spaces or punctuation and observe that no request is made.
4. Change the mock name to &lt;img src=x onerror=alert(1)&gt;. It should appear as text and must not create an image or run code.
5. Change the retry limit to one attempt and observe the failure message.
6. Add a longer wait, submit twice quickly, and confirm the earlier request cannot replace the newer result.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [136 - Modular architecture and dependency boundaries](../lessons/136-modular-architecture-and-dependency-boundaries.md) | [Lesson](../lessons/137-error-handling-reliability-and-application-security.md) · [Q&A](../qnas/137-error-handling-reliability-and-application-security.md) · [Example](137-error-handling-reliability-and-application-security.md) | [138 - Dependency hygiene, lockfiles, and software supply chain](../lessons/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) |


