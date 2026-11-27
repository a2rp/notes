# 88 - Test runners, mocking, and browser testing

A test runner discovers and executes tests, reports their results, and gives a project a repeatable way to check behavior. Mocking can replace or observe a dependency so a test does not rely on a slow or unpredictable service. Browser tests exercise a web page through user-visible interactions.

This chapter connects those tools to the test design principles from [Chapter 87](087-testing-fundamentals-assertions-and-test-design.md). It uses Node.js's built-in test runner for JavaScript tests and Playwright as an example of browser testing.

## Learning goals

After this chapter, you should be able to:

- Describe what a test runner does and how to run tests from a command line.
- Choose a runner based on the project and the kind of behavior being checked.
- Distinguish a stub, fake, spy, and mock in practical use.
- Replace a dependency at a controlled boundary and restore it after a test.
- Write a browser test with accessible locators and retrying assertions.
- Recognize common causes of flaky browser tests.
- Decide when mocking improves a test and when a real integration is more useful.

## What a test runner does

A **test runner** coordinates the test process. Depending on the tool, it can:

- Discover test files using configured names or patterns.
- Load test code and provide test functions, assertions, and setup hooks.
- Run tests sequentially or concurrently.
- Report passing tests, failures, skipped tests, and diagnostics.
- Set a non-zero process exit code when a test run fails.
- Collect coverage or write reports for local development and continuous integration.

A runner is not the same thing as an assertion library. Assertions compare actual results with expectations. A test framework may provide both assertions and a runner, while another project may combine separate tools.

## Pick a runner that fits the project

JavaScript has several runner choices. The best fit depends on the runtime, framework, and test scope:

- **Node.js test runner:** built into Node.js and useful for tests that run in Node without a separate test-runner dependency.
- **Framework-oriented runners:** projects may choose a separate runner when it fits their UI framework, transforms, plugin ecosystem, or existing project configuration.
- **Browser end-to-end runners:** tools such as Playwright start or connect to browsers and drive pages through user-visible actions.

Do not add a second runner automatically. Check the project's existing scripts and dependencies first. One consistent command for the common test suite is easier to maintain than several overlapping ways to run the same files.

## Run tests from the command line

For the Node.js test runner, test functions come from the built-in **node:test** module. Assertions can come from **node:assert/strict**.

~~~js
import assert from "node:assert/strict";
import test from "node:test";

test("adds two numbers", () => {
  assert.equal(2 + 3, 5);
});
~~~

The command below asks Node.js to discover and run matching test files:

~~~bash
node --test
~~~

A project can give this command a familiar script name in its package manifest:

~~~json
{
  "scripts": {
    "test": "node --test"
  }
}
~~~

Then a developer or CI job can run:

~~~bash
npm test
~~~

A failed test run should cause the command to exit unsuccessfully. CI can use that exit status to stop a deployment or mark a change as needing attention. Reports help explain the result, but the exit status is what lets automation reliably distinguish a passing run from a failed one.

Test-file naming and runner configuration vary. Keep the command and discovery rules documented in the project so a new contributor knows which files actually run.

## Setup, teardown, and asynchronous tests

Tests sometimes need to create temporary state, open a resource, or prepare data. Setup and teardown hooks can share repeated work, but keep each test's assumptions visible. Clean up files, servers, timers, and records even when an assertion fails.

Asynchronous tests must let the runner know when the work is complete. Return or await a promise. Do not start an operation and let the test finish before its result or rejection is observed.

~~~js
test("loads a profile", async () => {
  const profile = await loadProfile("user-42");
  assert.equal(profile.name, "Ari");
});
~~~

Avoid callbacks and promises at the same time unless a runner explicitly requires a callback style. A test should have one clear completion signal.

## Test doubles and mocks

A **test double** is a replacement used in place of a real collaborator. Teams use these terms somewhat differently, but the following practical distinctions are helpful:

- A **dummy** is passed around only to fill a required argument and is not meaningfully used.
- A **stub** supplies a known response, such as a fixed API result.
- A **fake** has a working but simplified behavior, such as an in-memory store.
- A **spy** records calls so a test can inspect whether and how a function was used.
- A **mock** is configured with expected interactions and can fail when those expectations are not met.

For example, a payment service test may use a stub response to simulate a card decline. A spy might verify that a receipt sender was called with the order identifier. The useful choice depends on the requirement.

### Prefer controlled boundaries

Mock a dependency when the real collaborator is slow, costly, nondeterministic, destructive, or outside the part of the system being checked. Common boundaries include network clients, clocks, random generators, file systems, and message queues.

Keep the code under test real. If a test replaces every dependency and verifies only the calls between mocks, it may prove that the mocks were arranged as expected while missing a defect in the actual behavior.

When practical, inject a collaborator as a parameter. This makes dependencies explicit and avoids changing global process state:

~~~js
export async function sendReceipt(order, mailer) {
  return mailer.send({
    to: order.email,
    subject: "Order received",
    body: "Order " + order.id + " was received."
  });
}
~~~

A test can pass a small fake or spy for **mailer**. For code that already calls an object method, a runner may also provide a method-mocking API.

~~~js
import assert from "node:assert/strict";
import test from "node:test";

test("records a call to the receipt sender", (context) => {
  const mailer = {
    send(message) {
      return Promise.resolve(message.to);
    }
  };

  const sendSpy = context.mock.method(mailer, "send");
  const message = { to: "ari@example.test" };

  const result = mailer.send(message);

  assert.equal(sendSpy.mock.callCount(), 1);
  assert.deepEqual(sendSpy.mock.calls[0].arguments, [message]);
  assert.equal(result instanceof Promise, true);
});
~~~

This spy records calls while keeping the original method behavior. For asynchronous behavior, await the result as well as checking the call:

~~~js
test("sends to the order email address", async (context) => {
  const mailer = {
    async send(message) {
      return message.to;
    }
  };

  const sendSpy = context.mock.method(mailer, "send");
  const order = { id: "order-7", email: "ari@example.test" };

  await sendReceipt(order, mailer);

  assert.equal(sendSpy.mock.callCount(), 1);
  assert.equal(sendSpy.mock.calls[0].arguments[0].to, order.email);
});
~~~

The test context owns this mock, so the runner can restore it when the test finishes. Prefer test-scoped mocks over edits to globals that can leak between tests.

### Use mocks with restraint

A mock can make a test fast and predictable, but it also introduces assumptions. Too many mocks can hide wiring problems or force a test to mirror private implementation details.

Ask:

- Is this dependency outside the behavior I want to verify?
- Does the test need a known response or a recorded interaction?
- Could a small fake make the scenario clearer?
- Would an integration test with the real dependency catch a risk this unit test cannot?
- Is the mock scoped to this test and restored afterward?

Do not mock a collaborator merely because it is possible. Keep a useful layer of tests that verifies important components work together.

## Browser testing

A browser test starts from a page and checks a flow a person can perform. It may verify that a form can be filled, a button can be used, a confirmation is shown, or a route displays the expected content.

Browser tools commonly provide a test runner, browser control, page fixtures, assertions, and diagnostics. A Playwright test can be written with a fixture-provided **page**:

~~~js
import { expect, test } from "@playwright/test";

test("shows a confirmation after subscribing", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Email address").fill("ari@example.test");
  await page.getByRole("button", { name: "Subscribe" }).click();

  await expect(page.getByRole("status"))
    .toHaveText("Thanks for subscribing");
});
~~~

The test describes the user-visible flow. A label gives the form control an accessible name, the role identifies the button, and the status role identifies the confirmation. These locators are more resilient and meaningful than selectors tied to a layout class or a particular DOM nesting structure.

### Prefer locator assertions that wait

A browser page often updates asynchronously. A locator assertion such as checking that a status has particular text can retry until the expected state appears or a timeout is reached. This is more reliable than reading the text immediately after a click or sleeping for a fixed number of milliseconds.

The action methods also wait for relevant conditions before interacting with a target. Avoid adding fixed delays to make a test “stable.” Find the specific state or event the test needs and wait for that.

### Keep browser tests isolated

Each test should begin with controlled state. Browser testing tools often create a fresh page or browser context per test. Use that isolation and arrange any application data the test requires. Do not make one test depend on a page or record created by another.

A browser suite can run against different browser engines, but a cross-browser matrix costs more time. Start with the browser coverage that matches the application's support requirements. Add other projects when they help catch a real compatibility risk.

### Keep the test environment under control

A browser test still depends on an application server and possibly API services. Make the server address, test data, and external dependencies predictable. Use test fixtures, local services, or controlled API responses for cases that do not need a real third-party service.

Browser tests are broader than unit tests, so they can fail because of application behavior, environment setup, network timing, or browser differences. Keep them focused on important user flows and use the test runner's reports, screenshots, or traces to diagnose failures.

## A useful test strategy

Combine layers according to risk:

1. Use unit tests for many input and boundary cases in small pieces of logic.
2. Use integration tests for important connections between modules or services.
3. Use browser tests for a smaller number of critical user flows.
4. Use mocks at boundaries to control cases that would otherwise be slow or unpredictable.
5. Keep some tests with real collaborators so integration defects are not hidden.
6. Run the same documented commands locally and in CI.

A passing unit suite does not prove the application works in a browser. A passing browser suite does not cover every input to every function. Each layer answers a different question.

## Troubleshooting failures

When a test fails:

- Read the test name and runner's expected-versus-actual output.
- Reproduce it with the smallest test command or file filter available.
- Check whether the failure is deterministic.
- Separate an application defect from setup, environment, or service problems.
- Inspect runner diagnostics instead of adding an arbitrary delay.
- If a test is flaky, identify the uncontrolled clock, data, network, shared state, or race.

Retries can help collect diagnostics for intermittent failures, but they should not be used to hide a test that is unreliable. A test that passes only after retries still needs investigation.

## Key points

- A runner discovers tests, coordinates execution, reports results, and signals failure to automation.
- A test double controls or observes a collaborator at a boundary.
- Dependency injection and test-scoped mocks make behavior easier to control and restore.
- Mock only what helps answer the test's question.
- Browser tests should exercise visible behavior with accessible locators.
- Prefer retrying state assertions and explicit events over fixed delays.
- Use unit, integration, and browser tests together where each layer adds useful evidence.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [87 - Testing fundamentals, assertions, and test design](087-testing-fundamentals-assertions-and-test-design.md) | [Open Q&A](../qnas/088-test-runners-mocking-and-browser-testing.md) | [Open example](../examples/088-test-runners-mocking-and-browser-testing.md) | [89 - Formatting, linting, JSDoc, and editor tooling](089-formatting-linting-jsdoc-and-editor-tooling.md) |
