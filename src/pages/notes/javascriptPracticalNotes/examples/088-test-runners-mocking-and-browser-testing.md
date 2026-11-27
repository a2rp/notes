# 88 - Test runners, mocking, and browser testing

## Question

A reminder service must send one message through a mailer, but a unit test should not contact a real email provider. Separately, a browser test should verify that a person can submit an email address and see a confirmation.

How can you test the service with a controlled dependency and test the form in a real browser?

## Part 1: Mock a dependency in a Node.js test

### Project files

~~~text
runner-example/
  reminder.mjs
  reminder.test.mjs
~~~

### Implementation

~~~js
// reminder.mjs
export async function sendReminder(recipient, mailer) {
  if (typeof recipient !== "string" || recipient.length === 0) {
    throw new TypeError("recipient must be a non-empty string");
  }

  if (!mailer || typeof mailer.send !== "function") {
    throw new TypeError("mailer must provide a send method");
  }

  const message = {
    to: recipient,
    subject: "Reminder"
  };

  return mailer.send(message);
}
~~~

### Test with a scoped mock

~~~js
// reminder.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { sendReminder } from "./reminder.mjs";

test("sends a reminder to the requested recipient", async (context) => {
  const mailer = {
    async send(message) {
      return "sent to " + message.to;
    }
  };

  const sendMock = context.mock.method(
    mailer,
    "send",
    async (message) => "queued for " + message.to
  );

  const result = await sendReminder("ari@example.test", mailer);

  assert.equal(result, "queued for ari@example.test");
  assert.equal(sendMock.mock.callCount(), 1);
  assert.deepEqual(sendMock.mock.calls[0].arguments, [
    { to: "ari@example.test", subject: "Reminder" }
  ]);
});
~~~

Run this Node.js test from the project directory:

~~~bash
node --test reminder.test.mjs
~~~

The method mock replaces the mailer's real send operation, returns a controlled result, and records the call. The test checks both the service's result and the message it attempted to send. Because the mock belongs to the test context, it is restored when that test finishes.

This isolates the unit test from a real email provider. A separate integration test can check the application's provider configuration in a controlled environment.

## Part 2: Test a form in a browser

This small app has a form and displays a confirmation when a valid email is submitted.

### Project files

~~~text
browser-example/
  index.html
  server.mjs
  playwright.config.js
  tests/
    subscription.spec.js
~~~

### Install the browser test dependency

Start a Node.js project, install Playwright Test, and install Chromium:

~~~bash
npm init -y
npm install --save-dev @playwright/test
npx playwright install chromium
~~~

Add scripts to the generated package manifest so the commands are easy to remember:

~~~json
{
  "scripts": {
    "test:unit": "node --test",
    "test:browser": "playwright test"
  }
}
~~~

### App page

~~~html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Newsletter signup</title>
  </head>
  <body>
    <main>
      <h1>Newsletter signup</h1>

      <form id="subscription-form">
        <label for="email">Email address</label>
        <input id="email" name="email" type="email" required>
        <button type="submit">Subscribe</button>
      </form>

      <p id="status" role="status" aria-live="polite"></p>
    </main>

    <script>
      const form = document.querySelector("#subscription-form");
      const email = document.querySelector("#email");
      const status = document.querySelector("#status");

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!email.checkValidity()) {
          return;
        }

        status.textContent = "Thanks for subscribing";
      });
    </script>
  </body>
</html>
~~~

The required email field uses browser validation. The form handler updates a status message after a valid submission.

### Local test server

~~~js
// server.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("./index.html", import.meta.url));

const server = createServer((request, response) => {
  if (request.method !== "GET" || request.url !== "/") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(html);
});

server.listen(4173, "127.0.0.1");
~~~

This server serves only the example page. A real application would use its own development server or configured test environment.

### Playwright configuration

~~~js
// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium"
  },
  webServer: {
    command: "node server.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI
  }
});
~~~

The web server setting starts the local page before the browser test and waits until its address responds.

### Browser test

~~~js
// tests/subscription.spec.js
const { expect, test } = require("@playwright/test");

test("shows a confirmation after a valid subscription", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Email address").fill("ari@example.test");
  await page.getByRole("button", { name: "Subscribe" }).click();

  await expect(page.getByRole("status"))
    .toHaveText("Thanks for subscribing");
});
~~~

Run the browser test with:

~~~bash
npm run test:browser
~~~

## Expected output

A successful Node.js unit test run reports one passing test and zero failures. A successful Playwright run reports one passing browser test. Exact terminal formatting, durations, and browser details vary by runner version.

~~~text
Unit tests: 1 passed, 0 failed
Browser tests: 1 passed, 0 failed
~~~

## Explanation

- The reminder service is the real code under test. Only the mailer's send method is replaced.
- The test checks the returned result, call count, and exact message arguments.
- The Node test runner waits for the async test because the callback returns a promise.
- The browser test starts the local server and opens a fresh page through Playwright's page fixture.
- The email control is found by its label, and the submit control by its button role and name.
- The status assertion waits for the expected text instead of reading the page immediately after clicking.
- The page and test data are local, so the example does not depend on a real email account or remote API.
- The Playwright test checks the user-visible flow. The Node test checks the service's interaction with its mailer dependency.

The two parts are separate on purpose. The Node runner checks a small service quickly. The browser runner checks that a real browser can interact with the page and show the result.

## Try another case

Add browser coverage for submitting an invalid email address. Verify that the browser keeps the required field invalid and that the success status is not shown. Then add a second Chromium and Firefox project if the application needs both engines.

## Key points

- Replace a real external service with a scoped mock when the unit test needs a controlled result.
- Check the interaction that matters, not every internal call.
- Use a local test server for a reproducible browser flow.
- Prefer accessible locators and assertions that wait for the expected page state.
- Keep unit and browser tests focused on different questions.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [87 - Testing fundamentals, assertions, and test design](../lessons/087-testing-fundamentals-assertions-and-test-design.md) | [Open lesson](../lessons/088-test-runners-mocking-and-browser-testing.md) | [Open Q&A](../qnas/088-test-runners-mocking-and-browser-testing.md) | [89 - Formatting, linting, JSDoc, and editor tooling](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md) |
