# 87 - Testing fundamentals, assertions, and test design

## Question

A shop uses these shipping rules:

- Standard shipping costs 5.99 when the order subtotal is below 50.
- Standard shipping is free when the subtotal is 50 or higher.
- Express shipping always costs 12.
- The subtotal must be a finite, non-negative number.
- The express option must be a boolean.

How can you write focused tests for these rules, including the important boundary and invalid-input cases?

## Expected behavior

| Scenario | Expected result |
| --- | --- |
| Standard shipping, subtotal 49.99 | 5.99 |
| Standard shipping, subtotal 50 | 0 |
| Standard shipping, subtotal 50.01 | 0 |
| Express shipping, subtotal below 50 | 12 |
| Express shipping, subtotal at or above 50 | 12 |
| Subtotal 0 | 5.99 |
| Subtotal is not finite | Throw a TypeError |
| Subtotal is negative | Throw a RangeError |
| Express option is not boolean | Throw a TypeError |

## Solution

Create two files in a small JavaScript project:

~~~text
shipping-example/
  shipping.mjs
  shipping.test.mjs
~~~

The function module contains the behavior:

~~~js
// shipping.mjs
export function calculateShipping(subtotal, options = {}) {
  if (!Number.isFinite(subtotal)) {
    throw new TypeError("subtotal must be a finite number");
  }

  if (subtotal < 0) {
    throw new RangeError("subtotal cannot be negative");
  }

  const { express = false } = options;

  if (typeof express !== "boolean") {
    throw new TypeError("express must be a boolean");
  }

  if (express) {
    return 12;
  }

  return subtotal >= 50 ? 0 : 5.99;
}
~~~

The test file describes outcomes users of the function can observe:

~~~js
// shipping.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateShipping } from "./shipping.mjs";

test("charges standard shipping below the free-shipping threshold", () => {
  assert.equal(calculateShipping(49.99), 5.99);
});

test("makes standard shipping free at the threshold", () => {
  assert.equal(calculateShipping(50), 0);
});

test("keeps standard shipping free above the threshold", () => {
  assert.equal(calculateShipping(50.01), 0);
});

test("charges the express rate below the threshold", () => {
  assert.equal(calculateShipping(20, { express: true }), 12);
});

test("charges the express rate at and above the threshold", () => {
  assert.equal(calculateShipping(50, { express: true }), 12);
  assert.equal(calculateShipping(75, { express: true }), 12);
});

test("accepts a zero subtotal", () => {
  assert.equal(calculateShipping(0), 5.99);
});

test("rejects a subtotal that is not finite", () => {
  assert.throws(() => calculateShipping(Number.NaN), TypeError);
  assert.throws(() => calculateShipping(Number.POSITIVE_INFINITY), TypeError);
});

test("rejects a negative subtotal", () => {
  assert.throws(() => calculateShipping(-0.01), RangeError);
});

test("rejects an express option that is not boolean", () => {
  assert.throws(() => calculateShipping(20, { express: "yes" }), TypeError);
});
~~~

The test file uses Node's built-in test API and strict assertions. From the project directory, run it with:

~~~bash
node --test shipping.test.mjs
~~~

## Sample output

A successful run reports nine passing tests and zero failures. The runner's formatting and timing details can differ between Node.js versions.

~~~text
tests 9
pass 9
fail 0
~~~

## Explanation

- The three standard-shipping cases immediately below, at, and above 50 check the threshold boundary.
- The express cases confirm that its fixed rate takes precedence over the standard free-shipping rule.
- Zero is a valid lower boundary, while a slightly negative amount is invalid.
- NaN and positive infinity exercise the finite-number validation.
- A string for the express option exercises the boolean validation.
- Each test name describes one behavior, so a failure report points to the rule that needs attention.
- The function is deterministic and does not depend on a clock, network, random value, or shared state.
- The tests check returned values and promised errors. They do not depend on private helper names or the exact structure of the conditional statements.

The example focuses on test design and assertions. More advanced runner configuration, dependency substitution, and browser testing are covered in the next chapter.

## Try another case

Change the free-shipping threshold from 50 to 75 in the requirement. Update the implementation and tests. Identify which tests should change and add cases for 74.99, 75, and 75.01.

## Key points

- Translate each rule into observable outcomes before writing tests.
- Check values around a behavior boundary, not only typical values.
- Include valid edge cases and defined invalid-input cases.
- Use clear names and precise assertions to make failures understandable.
- Keep a test independent of the order and outcome of other tests.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [86 - Transpilation, bundlers, polyfills, and source maps](../lessons/086-transpilation-bundlers-polyfills-and-source-maps.md) | [Open lesson](../lessons/087-testing-fundamentals-assertions-and-test-design.md) | [Open Q&A](../qnas/087-testing-fundamentals-assertions-and-test-design.md) | [88 - Test runners, mocking, and browser testing](../lessons/088-test-runners-mocking-and-browser-testing.md) |
