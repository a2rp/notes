# 9. Errors, debugging, and defensive code

An error is a signal that an operation could not safely continue. Throw an `Error` (or a specialized subclass) with a useful message; do not throw strings or silently return a success-shaped value when the operation failed.

```js
function parseAge(value) {
  const age = Number(value);
  if (!Number.isInteger(age) || age < 0) {
    throw new RangeError("Age must be a non-negative integer");
  }
  return age;
}
```

Use `try...catch` where your code can recover, add context, or translate an error for a caller. Avoid catching an error only to hide it. A `finally` block is useful for cleanup that must run whether an operation succeeds or fails.

```js
async function saveDocumentSafely() {
  try {
    await saveDocument(document);
  } catch (error) {
    reportSaveFailure(error);
    throw error;
  }
}
```

Errors can have a `cause` so a higher layer can add context without discarding the original failure:

```js
async function initialize() {
  try {
    return await loadSettings();
  } catch (cause) {
    throw new Error("Could not initialize the application", { cause });
  }
}
```

## Debug systematically

Read the complete stack trace, identify the first frame in your own code, and inspect the values at that boundary. Use a debugger breakpoint or a focused log rather than adding many permanent console statements. Reproduce with the smallest input that still fails, then add a regression test for the behavior.

Treat boundaries defensively: validate network data, parse user input, check optional values, and handle expected failure states. Do not use broad catch blocks as a replacement for input validation.

## Error boundaries

A useful error message says what operation failed and includes safe context, but avoids passwords, tokens, private user data, and raw secrets. At a UI boundary, show a clear next step while retaining technical detail in protected logs.

## References

- [MDN: Error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Node.js: Diagnostics](https://nodejs.org/en/learn/diagnostics)


