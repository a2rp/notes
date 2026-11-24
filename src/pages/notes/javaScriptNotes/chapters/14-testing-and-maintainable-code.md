# 14. Testing and maintainable code

A useful test describes observable behavior: given an input or user action, what result should a caller see? Start with small, deterministic unit tests for pure functions. Add integration tests when multiple modules or platform APIs must work together. Use end-to-end tests for critical user journeys rather than duplicating every unit assertion in the browser.

Node provides a built-in test runner:

```js
import test from "node:test";
import assert from "node:assert/strict";

function addTax(amount, rate) {
  return amount + amount * rate;
}

test("adds the supplied tax rate", () => {
  assert.equal(addTax(100, 0.1), 110);
});
```

This file can be run with a compatible Node.js version using `node --test`. Browser applications may instead use a project test runner that simulates a DOM or launches a real browser; verify what each environment actually covers.

## Test the boundary, not implementation trivia

Check return values, rendered output, network behavior, and user-visible states. Avoid asserting private variable names or exact call sequences when they are not part of the contract. For asynchronous behavior, await the operation and test success, rejection, and cancellation paths.

Use dependency injection or a narrow wrapper for time, random values, network calls, and storage when tests need deterministic control. Do not mock every function: a test that only repeats implementation details can pass while the feature is broken.

## Maintainability practices

- Give values and functions names that explain their role.
- Keep one module focused on a related responsibility.
- Validate external input at its boundary.
- Prefer explicit return values over hidden shared mutation.
- Refactor duplication only when the shared abstraction clarifies behavior.

## References

- [Node.js test runner](https://nodejs.org/api/test.html)
- [MDN: Testing](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing)
