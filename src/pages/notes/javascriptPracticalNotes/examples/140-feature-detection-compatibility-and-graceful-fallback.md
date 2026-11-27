# Example 140 - Feature detection, compatibility, and graceful fallback

## Question

How can a page offer native device sharing when it is available, while keeping a simple copyable-link path for users whose browser does not provide the sharing API or whose share action fails?

## Complete example

Save this as an HTML file and open it in a browser. The core fallback is the page address and instructions to copy it. The native share button is an enhancement, shown only when a callable API is available.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Share this page</title>
  <style>
    body {
      max-width: 40rem;
      margin: 2rem auto;
      padding: 0 1rem;
      font: 1rem/1.5 system-ui, sans-serif;
    }

    .share-card {
      border: 1px solid #888;
      border-radius: 0.5rem;
      padding: 1rem;
    }

    .share-options {
      display: block;
    }

    .share-options label {
      display: block;
      margin-bottom: 0.5rem;
    }

    .share-options input,
    .share-options button {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem;
      font: inherit;
    }

    .share-options button {
      margin-top: 0.5rem;
    }

    @supports (display: grid) {
      .share-options {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: end;
        gap: 0.5rem;
      }

      .share-options label {
        margin-bottom: 0;
      }

      .share-options button {
        width: auto;
        margin-top: 0;
      }
    }
  </style>
</head>
<body>
  <main class="share-card">
    <h1>Share this page</h1>
    <p>
      You can copy this page address from the field below or from your
      browser's address bar.
    </p>

    <div class="share-options">
      <label for="page-address">
        Page address
        <input id="page-address" type="url" readonly>
      </label>
      <button id="share-button" type="button" hidden>
        Share using this device
      </button>
    </div>

    <p id="status" role="status" aria-live="polite">
      The page address can be copied and shared.
    </p>
  </main>

  <script>
    const addressInput = document.querySelector("#page-address");
    const shareButton = document.querySelector("#share-button");
    const status = document.querySelector("#status");

    addressInput.value = window.location.href;

    addressInput.addEventListener("focus", () => {
      addressInput.select();
    });

    const hasNativeShare = typeof navigator.share === "function";

    if (hasNativeShare) {
      shareButton.hidden = false;
      status.textContent =
        "Native sharing is available. You can also copy the address below.";
    } else {
      status.textContent =
        "Native sharing is not available here. Copy the address below.";
    }

    shareButton.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        text: "I thought you might like this page.",
        url: addressInput.value
      };

      try {
        if (
          typeof navigator.canShare === "function" &&
          !navigator.canShare(shareData)
        ) {
          status.textContent =
            "This page cannot be shared with the native action here. Copy the address below.";
          addressInput.focus();
          return;
        }

        await navigator.share(shareData);
        status.textContent = "The share action completed.";
      } catch (error) {
        if (error && error.name === "AbortError") {
          status.textContent =
            "Sharing was cancelled. You can still copy the address below.";
          return;
        }

        status.textContent =
          "Sharing failed. You can still copy the address below.";
      }
    });
  </script>
</body>
</html>
~~~

## Expected output

- If the browser does not expose a callable native share method, the share button stays hidden. The page address remains available to select and copy.
- If the API is available, the page shows **Share using this device**. Selecting it opens the platform's share flow when the current context and data are supported.
- If the user cancels or sharing fails, the status explains the outcome and the copyable address remains available.
- In a browser that supports CSS Grid, the field and button appear in an enhanced row. Otherwise, the base block layout still works.

The native share UI depends on the browser, device, security context, and user action. Its exact appearance and result can vary.

## Explanation

- **The core task is available first.** The user can copy the URL without the native share feature. JavaScript enhances the page when the browser exposes the API.
- **The code checks a capability.** typeof navigator.share checks for a callable method rather than guessing the browser brand.
- **The operation still has error handling.** An API can reject, the user can cancel, or the data may not be accepted. Each outcome leaves the copy path intact.
- **The action begins in a click handler.** Some browser APIs require direct user activation, so the share call is made from the user's button click.
- **CSS has its own feature query.** Base block styles work first. Grid is an optional layout enhancement inside @supports.
- **The share check is not proof of success.** API availability does not guarantee the right context, permissions, or successful completion.
- **The address field is a fallback, not an authorization control.** The page does not use feature detection to protect private content or data.

## Try it yourself

1. Open the page in environments with and without native sharing and compare the visible controls.
2. In a supported environment, choose the share button and then cancel. Confirm that the fallback address remains available.
3. Temporarily change the share data to a format the platform does not accept and observe the fallback message.
4. Remove the @supports block and compare the base layout with the enhanced layout.
5. Disable JavaScript and confirm that the page still tells users to copy its address from the browser's address bar.
6. Test keyboard focus on the address field and share button.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [139 - Performance analysis, memory leaks, and optimization](../lessons/139-performance-analysis-memory-leaks-and-optimization.md) | [Lesson](../lessons/140-feature-detection-compatibility-and-graceful-fallback.md) · [Q&A](../qnas/140-feature-detection-compatibility-and-graceful-fallback.md) · [Example](140-feature-detection-compatibility-and-graceful-fallback.md) | [141 - Browser project: build an interactive interface](../lessons/141-browser-project-build-an-interactive-interface.md) |
