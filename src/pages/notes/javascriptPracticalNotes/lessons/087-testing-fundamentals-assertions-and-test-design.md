# 87 - Testing fundamentals, assertions, and test design

Tests are executable checks of the behavior a program promises. They help you find mistakes, protect working behavior while code changes, and make assumptions visible to other developers. A useful test is more than code that runs: it checks an important outcome clearly and fails when that outcome is wrong.

This chapter introduces test design before focusing on particular test tools. The following chapter covers test runners, mocking, and browser testing in more depth.

## Learning goals

After this chapter, you should be able to:

- Explain why tests are useful and what they cannot prove.
- Turn a requirement into focused test cases and clear assertions.
- Apply the arrange, act, assert pattern.
- Choose representative, boundary, invalid, and error cases.
- Distinguish unit, integration, and end-to-end tests.
- Keep tests deterministic, isolated, and easy to understand.
- Interpret coverage metrics without treating them as proof of quality.

## What a test checks

A test describes an input, an action, and an expected result. It should express a promise made by the program rather than repeat the implementation line by line.

Suppose a function calculates a discount. A behavior-focused requirement might say:

> Orders of 100 dollars or more receive free standard shipping.

A useful test checks an order just below the threshold and one at the threshold. The test does not need to know which conditional statement or helper function the implementation uses.

A program can have bugs even if it has no tests. A test suite can also pass while a bug remains, because tests only check the cases and expectations that were written and executed.

## Test cases and assertions

A **test case** is one named check of a behavior. It commonly includes:

1. **Arrange** the input and required state.
2. **Act** by calling the function or performing the operation.
3. **Assert** the observed result against the expected result.

~~~js
const subtotal = 49.99;
const shippingCost = calculateShipping(subtotal);

assert.equal(shippingCost, 5.99);
~~~

Here, the subtotal is the arranged input, the function call is the action, and the assertion checks the result. A short test may combine these steps, but keeping them mentally separate makes failures easier to investigate.

An **assertion** states what must be true. Common assertion categories include:

- Equality: a returned value matches an expected value.
- Identity: two values are the same object or reference.
- Truthiness: a value is truthy or falsy.
- Collection checks: an item is present, absent, or the collection has a given size.
- Error checks: an operation throws or rejects with the expected error.
- State checks: an operation changes state as promised.

Choose the narrowest assertion that expresses the requirement. For example, checking that a result equals 0 is more informative than merely checking that it is falsy.

## Design tests from behavior

Start with the requirement and list its distinct outcomes. A small decision table can help:

| Situation | Expected behavior |
| --- | --- |
| Standard shipping and subtotal below 50 | Charge 5.99 |
| Standard shipping and subtotal at least 50 | Charge 0 |
| Express shipping | Charge 12 |
| Negative subtotal | Reject with a range error |
| Non-finite subtotal | Reject with a type error |

This table guides test cases without tying them to internal implementation details.

### Representative values

When many values follow the same rule, choose a small set that represents the important behaviors. **Equivalence partitioning** groups inputs expected to behave alike. If every valid subtotal below 50 follows the same rule, a typical value such as 20 may represent that group.

Representative values do not replace boundary checks. A program can be correct for 20 and wrong for 50 because the condition uses the wrong comparison operator.

### Boundary values

A **boundary value** is at or near a point where behavior changes. For a threshold of 50, useful checks include:

- Just below the boundary: 49.99
- At the boundary: 50
- Just above the boundary: 50.01

For a range that includes 1 and 10, examine the endpoints and the values immediately outside the range. Boundaries are common sources of off-by-one and comparison mistakes.

### Decision branches and combinations

For each meaningful decision, identify the outcomes that should be tested. A condition with several inputs can create many combinations. Test combinations that represent distinct behavior, especially when one input can override or change the effect of another.

You do not need to test every possible value. You do need enough cases to cover the requirements, important branches, and likely failure points.

### Invalid and error cases

Test invalid inputs when the program defines what should happen for them. Check the promised error type or result, and where it matters, check the error message. Do not add checks for behavior the program has never promised unless that behavior is part of a deliberate validation rule.

For asynchronous behavior, verify both success and failure paths. A rejected promise that is not observed can make a test misleading or cause a failure to appear outside the intended assertion.

## Keep tests independent and deterministic

A test is **deterministic** when the same code and controlled inputs produce the same result. Avoid relying on uncontrolled current time, random values, network responses, machine-specific paths, or shared mutable state. If a behavior depends on a clock or random generator, make that dependency controllable so tests can supply a known value.

A test is **isolated** when it can run without depending on another test's order or side effects. Each test should establish its own data and state, and clean up resources it creates. One test passing must not be a prerequisite for another test to pass.

Common sources of flaky tests include:

- Tests sharing and changing the same object or database record.
- Waiting for arbitrary time instead of waiting for a specific event.
- Depending on remote services that may be unavailable or slow.
- Assuming tests run in a particular order.
- Leaving timers, files, sockets, or other resources open.
- Using dates, locales, or environment settings that differ by machine.

Prefer small, local inputs and explicit setup. When cleanup is needed, make sure it also happens after a failure.

## Choose a useful test level

The names below describe scope, not a strict ranking:

- A **unit test** checks a small unit of behavior, often a function or module, with its relevant dependencies controlled.
- An **integration test** checks that multiple parts work together, such as application code with a database adapter.
- An **end-to-end test** exercises a user-facing flow through a running application, often through a browser or API boundary.

Each level can catch different problems. A pure calculation may need only focused unit tests. A database query or browser interaction may need an integration or end-to-end check. Select the smallest scope that can prove the behavior you care about, then add broader checks for risks that smaller tests cannot cover.

A test pyramid is a planning heuristic: keep fast, focused checks plentiful and broader, slower checks targeted. It is not a rule that every project must follow the same ratio or number of tests.

## Make failures useful

A test name should describe the behavior and the relevant condition. For example, “returns free standard shipping at the threshold” tells a reader more than “case 4”.

When a test fails, a developer should be able to identify:

- Which behavior failed.
- What input or state was used.
- What result was expected.
- What result was observed.

Prefer one clear reason for failure in each test. If a single test checks many unrelated outcomes, the failure report can be hard to interpret. Data-driven tests can share a structure, but each case should keep a useful name and a clear expected result.

Avoid assertions so broad that they hide defects. Checking only that an array is non-empty may miss a missing or incorrectly ordered item when the requirement promises exact contents.

## Test behavior, not incidental implementation

A test coupled to internal details can fail after a harmless refactor, even when users see no change. Test public inputs and outputs, meaningful state changes, and observable side effects. Keep implementation-specific checks only when those details are themselves important requirements, such as a security constraint or resource limit.

Tests can also become too permissive. If an assertion accepts several unrelated outcomes, a real regression may pass unnoticed. Assertions should be precise enough to protect the contract while allowing internal code to evolve.

## Coverage and test quality

**Line coverage** estimates which executable lines ran during a test run. **Branch coverage** estimates which decision outcomes ran. These measurements can help reveal unvisited areas, but they cannot tell whether the assertions were correct or whether the cases were meaningful.

A test suite can reach high coverage while asserting almost nothing useful. A suite with lower coverage may still protect critical behavior well, though uncovered code can contain undiscovered defects. Use coverage to ask where additional tests may help, then inspect the behavior and assertions themselves.

A useful review asks:

- Does each important requirement have a corresponding check?
- Are boundaries and error cases represented?
- Would the test fail if the behavior were accidentally broken?
- Does its name match what it checks?
- Can it run alone and repeatedly with the same result?
- Is it testing an observable contract instead of an unnecessary implementation detail?

## A practical workflow

1. Write the expected behavior in plain language.
2. Identify valid inputs, invalid inputs, boundaries, and meaningful branches.
3. Select the appropriate test scope.
4. Arrange a small, controlled scenario.
5. Act once and assert the promised behavior.
6. Run the test and read failures carefully.
7. Add a regression case when fixing a bug.
8. Keep the test easy to change when the requirement changes.

Tests support careful development, but they do not replace code review, accessibility checks, security review, or testing in the environments the application must support.

## Key points

- Tests make expected behavior executable and help prevent regressions.
- Arrange, act, assert is a simple structure for a focused test.
- Representative inputs, boundaries, branches, and invalid cases reveal different classes of defects.
- Independent, deterministic tests are easier to trust and debug.
- Unit, integration, and end-to-end tests check different scopes.
- Coverage is a signal about execution, not proof that behavior is correct.
- Test observable requirements so harmless refactoring remains possible.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [86 - Transpilation, bundlers, polyfills, and source maps](086-transpilation-bundlers-polyfills-and-source-maps.md) | [Open Q&A](../qnas/087-testing-fundamentals-assertions-and-test-design.md) | [Open example](../examples/087-testing-fundamentals-assertions-and-test-design.md) | [88 - Test runners, mocking, and browser testing](088-test-runners-mocking-and-browser-testing.md) |
