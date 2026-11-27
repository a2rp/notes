# 137 - Error handling, reliability, and application security

Errors are part of a program's contract. Good error handling distinguishes expected failures from defects, gives callers enough information to respond, and keeps sensitive implementation details out of user-facing messages.

Reliability and security meet at system boundaries. Validate inputs before relying on them, constrain retries and resource use, make side effects explicit, and fail safely when an operation cannot be trusted to continue.

## Learning goals

- Throw meaningful Error objects and preserve causes when translating failures.
- Catch errors only where the program can respond usefully.
- Handle rejected promises and cleanup with finally.
- Model expected failure categories explicitly.
- Add bounded retries, timeouts, and cancellation only where they fit the operation.
- Validate inputs, authorize actions, and render untrusted data safely.
- Keep secrets and implementation details out of client-visible errors and logs.

## Exceptions and Error objects

JavaScript allows any value to be thrown, but application code should throw Error objects. They carry a message and stack information and work consistently with catch blocks.

~~~js
throw new TypeError("Expected a string");
~~~

Use the built-in error type that best describes the failure when it fits. Common types include **TypeError**, **RangeError**, and **SyntaxError**. Define application-specific error classes when callers need to distinguish stable categories.

~~~js
class NotFoundError extends Error {
  constructor(resource, id) {
    super(resource + " was not found: " + id);
    this.name = "NotFoundError";
    this.code = "NOT_FOUND";
  }
}
~~~

An error message should help a developer understand the failure. It should not contain passwords, tokens, private user data, or other secrets.

## Catch errors at a useful boundary

A catch block is useful when it can recover, translate an error, add context, or present a safe response. Catching an error only to log and continue can hide a broken state.

~~~js
function parseSettings(text) {
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new SyntaxError("Settings contain invalid JSON", { cause });
  }
}
~~~

The new error preserves the original cause for diagnostics while giving callers a stable domain-level meaning. A caught value is not guaranteed to be an Error object, so code that inspects it should be defensive.

~~~js
try {
  performOperation();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown failure";
  console.error(message);
}
~~~

Do not expose raw stack traces or database messages to application users. Translate them at the presentation or transport boundary into a safe message and a suitable response.

## Error categories and contracts

For each operation, decide which failures are expected and how callers should respond. Examples include:

- Invalid input: reject it close to the boundary with a useful validation error.
- Missing data: return a documented absence value or throw a not-found error.
- Permission denied: stop the operation and avoid revealing protected data.
- Temporary dependency failure: retry only if the operation and failure are safe to retry.
- Programmer defect: preserve the failure and report it rather than pretending the operation succeeded.

Use return values such as **null** or a result object when absence or failure is a normal part of the function's documented result. Use exceptions when the operation cannot produce its normal result. Avoid mixing several undocumented conventions in one API.

~~~js
function findUser(users, id) {
  return users.find((user) => user.id === id) ?? null;
}
~~~

For richer outcomes, use a discriminated result shape:

~~~js
function validateAge(value) {
  if (!Number.isInteger(value)) {
    return { ok: false, error: "Age must be a whole number" };
  }
  if (value < 0 || value > 130) {
    return { ok: false, error: "Age is outside the allowed range" };
  }
  return { ok: true, value };
}
~~~

A result object makes expected validation outcomes explicit. It should not be used to swallow unexpected programming or infrastructure failures.

## Promise errors and async functions

A synchronous throw inside an async function becomes a rejected promise. Use **try/catch** around an **await** when that code can handle or translate the rejection.

~~~js
async function loadProfile(id, repository) {
  try {
    return await repository.findById(id);
  } catch (cause) {
    throw new Error("Could not load the profile", { cause });
  }
}
~~~

If the caller does not await or return a promise, the rejection may escape the current control flow.

~~~js
async function main() {
  await loadConfiguration();
  await startApplication();
}

main().catch((error) => {
  console.error("Startup failed:", error);
  process.exitCode = 1;
});
~~~

Handle rejections at an intentional boundary such as an event handler, request handler, job runner, or application entry point. A process-wide unhandled-rejection handler is a last-resort reporting mechanism, not a replacement for handling each operation's promise.

A **catch** handler that returns normally converts the rejected promise into a fulfilled promise. Rethrow or return an explicit failure when the caller still needs to know that the operation failed.

## Cleanup with finally

A **finally** block runs whether the operation succeeds or fails. Use it to release resources or reset local state.

~~~js
async function refresh(button, loadData) {
  button.disabled = true;
  try {
    return await loadData();
  } finally {
    button.disabled = false;
  }
}
~~~

Do not return a value or throw a new error from **finally** unless replacing the earlier result is intended. Such control flow can hide a return value or error from the **try** or **catch** block.

For resources such as files, locks, or transactions, use the host API's documented cleanup pattern and ensure cleanup itself does not erase the original failure.

## Preserve error causes and add context

When a lower-level error crosses an application boundary, wrap it with a useful stable message and keep the original as its cause.

~~~js
async function saveOrder(order, repository) {
  try {
    await repository.save(order);
  } catch (cause) {
    throw new Error("Order could not be saved", { cause });
  }
}
~~~

Add context that helps locate the operation, but do not leak the underlying message to an end user. Avoid wrapping the same error at every layer with redundant messages. Translate it when ownership or recovery strategy changes.

## Timeouts and cancellation

An operation that waits on a network or other external system should have a bounded lifetime when the surrounding API supports it. Cancellation lets a caller stop work that is no longer needed.

~~~js
async function loadData(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Request failed with status " + response.status);
  }
  return response.json();
}

const controller = new AbortController();
const pending = loadData("/api/data", controller.signal);
controller.abort();
~~~

Aborting is a request to stop work. A dependency may have already completed or may not support cancellation. Ensure cancelled operations are not later treated as successful current work.

## Retries and idempotency

Retry only failures that may be temporary and operations that are safe to repeat. A read request is often safe to retry; a payment or message send may create a duplicate effect unless the system provides an idempotency mechanism.

Use a small retry limit, a delay that grows between attempts, and jitter to spread synchronized retries. Respect cancellation and the service's retry guidance when available.

~~~js
function backoffDelay(attempt, random = Math.random) {
  const maximum = 5000;
  const exponential = Math.min(maximum, 200 * 2 ** attempt);
  return Math.floor(exponential * (0.5 + random()));
}
~~~

Do not retry validation errors, permission errors, or every error indiscriminately. A retry loop without bounds can amplify an outage. Avoid retries at several layers at once because their attempt counts multiply.

## Reliability patterns

### Fail with a known state

Check assumptions at system boundaries and stop when state is invalid. Do not continue with a half-updated object after an operation fails. Use a transaction or explicit rollback when a group of changes must succeed together.

### Bound work

Set appropriate limits for request duration, retries, input size, concurrency, and queued work. Unbounded work can exhaust memory or keep a failing service overloaded.

### Keep fallback behavior honest

A fallback is useful when it provides an acceptable and clearly identified result. Do not silently return fake success or stale data when callers depend on freshness or correctness.

### Make failures observable

Record structured information such as operation name, error category, request identifier, and retry count. Keep logs useful for diagnosis and avoid secrets, credentials, access tokens, or unnecessary personal data. Client errors should not reveal stack traces or internal topology.

## Input validation and authorization

Validate input's type, shape, size, and semantic constraints before using it. Prefer allowlists and parsers appropriate to the expected format. Validation can reject malformed data, but it does not prove that the current user is allowed to perform the action.

Authorization must be checked for each protected operation using trusted server-side state. A client-side check can improve usability, but a user can modify or bypass client code. Never rely on a hidden button or client variable as the only access control.

Keep separate concepts separate:

- **Validation** checks whether a value has an acceptable form and meaning.
- **Authentication** identifies a caller.
- **Authorization** checks whether that caller may perform an operation.
- **Encoding** makes data safe for the context where it is displayed or interpreted.
- **Sanitization** removes disallowed markup when an application intentionally accepts limited HTML.

## Safe DOM updates and injection

Treat input from users, URLs, stored records, and remote services as untrusted. If a value should display as text, use a text-oriented DOM API.

~~~js
element.textContent = userSuppliedName;
~~~

Avoid passing untrusted strings to **innerHTML**, **eval**, **new Function**, or string-based event handlers. If the product must display user-authored HTML, use a maintained sanitizer with an explicit allowlist and do not modify the sanitized result unsafely afterward.

Protection depends on the destination context. A string safe as HTML text is not automatically safe inside a URL, script, CSS, or attribute. Use trusted APIs and context-appropriate handling instead of a generic escaping rule.

## Secrets and data exposure

Do not put private API keys, server credentials, or signing secrets in browser-delivered JavaScript. Anything sent to a browser can be inspected and changed by the user. Keep secrets on a trusted server and return only the data needed for the current view.

Use least privilege for credentials and services. Avoid logging secrets or full sensitive records. Show users a stable, actionable message and keep detailed diagnostics in access-controlled logs.

## Dependency and environment boundaries

Treat values from environment variables, files, APIs, and dependencies as inputs that need validation. Do not evaluate downloaded or user-controlled strings as code. Use maintained dependencies, review update sources, and keep lockfiles and dependency checks in the project workflow.

Separate security-sensitive decisions from display logic. The application can produce a safe domain error, while an HTTP or UI adapter decides how to present it without exposing implementation details.

## Common mistakes

- Throwing strings instead of Error objects.
- Catching an error and continuing with invalid or incomplete state.
- Logging an error but leaving the returned promise rejected without a deliberate boundary.
- Catching every failure and returning a success-looking default.
- Retrying non-idempotent operations without duplicate protection.
- Retrying indefinitely or at multiple layers without an overall bound.
- Returning from **finally** and hiding an earlier result or error.
- Showing raw exception messages or stack traces to users.
- Assuming input validation also checks authorization.
- Inserting untrusted text with **innerHTML** or evaluating it as code.
- Putting private credentials into client-side source or logs.
- Using a client-side check as the only security control.

## Key points

- Use Error objects and stable application-specific categories.
- Catch failures where recovery, translation, cleanup, or safe presentation is possible.
- Handle promises at the right async boundary and keep rejected work observable.
- Preserve causes when translating errors across layers.
- Bound time, retries, concurrency, and resource use.
- Retry only transient failures when repeating the operation is safe.
- Validate inputs, authorize independently, and render untrusted data for its context.
- Keep secrets on trusted servers and keep sensitive details out of user-facing errors.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [136 - Modular architecture and dependency boundaries](136-modular-architecture-and-dependency-boundaries.md) | [Open Q&A](../qnas/137-error-handling-reliability-and-application-security.md) | [Open example](../examples/137-error-handling-reliability-and-application-security.md) | [138 - Dependency hygiene, lockfiles, and software supply chain](138-dependency-hygiene-lockfiles-and-software-supply-chain.md) |
