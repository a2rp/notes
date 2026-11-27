# 130 - Node.js test runner and service tests

Node.js includes a test runner and assertion library. This chapter uses them to write focused unit tests and service-level HTTP tests, run a selected test file, and keep tests repeatable.

## Why test a service?

A service can have several layers of behavior:

- A unit test checks one function or rule with controlled inputs.
- A service integration test exercises multiple parts of the service together, such as routing, validation, and response serialization.
- An end-to-end test exercises a larger deployed system and its external dependencies.

This chapter focuses on unit tests and service integration tests using Node.js built-in tools. The service tests start a real local HTTP server, but use an ephemeral port and in-memory state. They do not require a database or a deployed environment.

## The built-in test runner

Import test from node:test and assertions from node:assert/strict.

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";

test("adds two numbers", () => {
  assert.equal(2 + 3, 5);
});
~~~

Run tests with:

~~~sh
node --test
~~~

The runner discovers files using conventional test file names, including names that end in .test.mjs and files in a test directory. For a predictable command across shells, pass a file path directly:

~~~sh
node --test test/notes-service.test.mjs
~~~

The runner reports passing and failing tests and returns an unsuccessful process status when a test fails. This makes it useful in local development and automation.

## Write useful assertions

Prefer strict assertions so the test checks the value and type you intended.

~~~js
import assert from "node:assert/strict";

assert.equal(2 + 3, 5);
assert.deepEqual(
  { title: "Study Node.js" },
  { title: "Study Node.js" }
);
~~~

Use assertions that describe the contract:

- equal or strictEqual for primitive values;
- deepEqual for nested values;
- match for strings checked against a pattern;
- throws for synchronous errors;
- rejects for Promise rejections.

A test should fail when the behavior is wrong. Avoid assertions that merely repeat how an implementation is written.

## Test asynchronous work

An async test must return or await the Promise that represents its work. The runner waits for an async test function to settle.

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";

test("rejects an invalid value", async () => {
  await assert.rejects(
    async () => {
      throw new Error("Invalid value");
    },
    { message: "Invalid value" }
  );
});
~~~

For callback APIs, use a Promise wrapper or the test runner's callback support. Do not start asynchronous work and then let the test function finish before checking its result. That creates activity that can outlive the test and makes failures unreliable.

## Organize related tests

Use test names that explain the behavior. Nested tests can group behavior under a shared topic.

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";

test("note validation", async (t) => {
  await t.test("accepts a non-empty title", () => {
    assert.equal("Learn Node.js".trim().length > 0, true);
  });

  await t.test("rejects an empty title", () => {
    assert.equal("   ".trim().length, 0);
  });
});
~~~

Await each subtest. The parent test should not finish while its subtests are still running.

Node's test module also provides describe() and it() aliases, lifecycle hooks, skipping, TODO tests, and mock utilities. Use hooks for shared setup and cleanup when it makes related tests clearer. Use skip or todo to describe intentionally unavailable coverage. Avoid leaving an only test enabled in committed code because it can hide other tests from a run.

## Test seams and mocks

A test seam is a boundary where a dependency can be supplied or replaced. Prefer passing dependencies into a function over changing global state.

~~~js
export function makeGreetingService({ now = () => new Date() } = {}) {
  return {
    greeting(name) {
      return {
        name,
        createdAt: now().toISOString()
      };
    }
  };
}
~~~

A test can provide a deterministic clock:

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";
import { makeGreetingService } from "../src/greeting-service.mjs";

test("uses the provided clock", (t) => {
  const now = t.mock.fn(
    () => new Date("2026-01-02T03:04:05.000Z")
  );
  const service = makeGreetingService({ now });

  assert.deepEqual(service.greeting("Asha"), {
    name: "Asha",
    createdAt: "2026-01-02T03:04:05.000Z"
  });
  assert.equal(now.mock.callCount(), 1);
});
~~~

The test runner restores its mock utilities at the end of their test context. Keep mock scope narrow and mock external boundaries, such as clocks or remote clients, instead of replacing every internal function.

## Test a service over HTTP

A service test can start the application server on port 0. The operating system selects an available port, so tests do not collide with a developer's server or another test.

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";
import { createNotesServer } from "../src/notes-server.mjs";

async function startServer(t) {
  const server = createNotesServer();

  await new Promise((resolve, reject) => {
    const onError = (error) => reject(error);

    server.once("error", onError);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", onError);
      resolve();
    });
  });

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  }));

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected a TCP address");
  }

  return "http://127.0.0.1:" + address.port;
}

test("health route returns JSON", async (t) => {
  const baseUrl = await startServer(t);
  const response = await fetch(baseUrl + "/health");

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
~~~

The test starts the service, sends a real HTTP request, checks the status and decoded JSON, and closes the server through t.after(). If an assertion fails, the cleanup hook still runs.

Use a fresh service instance per test when its state is mutable. That keeps one test's created note from changing another test's result.

## Test success and failure paths

Service tests should cover expected responses and important error cases. For a JSON notes API, useful cases include:

- health endpoint returns 200 with the expected JSON;
- listing notes returns the current service state;
- a valid POST returns 201 and the created record;
- invalid JSON or invalid fields return 400;
- an oversized body returns 413;
- a non-JSON content type returns 415;
- an unknown route returns 404;
- an unsupported method on a known route returns 405 and an Allow header.

Assert both status and body where both are part of the service contract. For headers, check the behavior the client depends on, such as content type or Allow.

Do not test only the successful request. Error responses are part of the service's public behavior.

## Keep tests reliable

- Do not depend on a particular test execution order.
- Avoid sharing mutable state between tests.
- Use port 0 for local test servers and read the selected port from server.address().
- Register cleanup as soon as the resource starts.
- Await fetch(), response.json(), and other asynchronous work.
- Use deterministic fixtures instead of sleeping for arbitrary durations.
- Test observable behavior rather than private implementation details.
- Keep test names specific enough to identify a failure.
- Use a real dependency only when the behavior under test needs that boundary.
- Give network tests timeouts or cancellation policies if they can hang.

Tests in different files can run in separate processes when the runner's process-level isolation is enabled. Do not use that as a substitute for independent tests. Each test should still establish and clean up the resources it uses.

## Run, filter, and watch tests

Run all discovered test files:

~~~sh
node --test
~~~

Run one specific test file:

~~~sh
node --test test/notes-service.test.mjs
~~~

Filter test names when investigating one behavior:

~~~sh
node --test --test-name-pattern="creates a note"
~~~

Use watch mode during development if supported by the Node.js version in the project:

~~~sh
node --test --watch
~~~

The test runner supports different reporters and can collect coverage in supported Node.js versions. Read the command's help for flags available in the installed runtime. Coverage can reveal code that was not exercised, but a high percentage does not prove that assertions are useful.

## Interpret failures

When an assertion fails, compare the actual and expected values first. Then check whether the test setup reflects the service's intended contract.

When a test hangs, look for an unawaited or unresolved Promise, an open server, an active timer, or a response that was not consumed. Cleanup hooks help release test resources, but do not hide a service lifecycle bug.

When a test passes alone but fails in a full run, look for shared state, fixed ports, execution-order assumptions, and missing cleanup.

## Common mistakes

- Importing assertion functions from the legacy non-strict assertion mode by accident.
- Starting an async operation without awaiting it in the test.
- Asserting that a function ran instead of asserting the result that matters.
- Starting every service test on the same fixed port.
- Forgetting to close an HTTP server after a test.
- Reusing mutable data between test cases.
- Testing only success while ignoring malformed and unsupported requests.
- Using arbitrary sleeps to wait for a server that should signal readiness.
- Leaving test.only() in the repository.
- Treating code coverage as proof that behavior is correct.
- Mocking internal details so heavily that the test no longer represents the service contract.

## Key points

- node:test supplies the built-in runner, and node:assert/strict supplies strict assertions.
- Use node --test to discover and run tests, or pass a test file directly.
- Async tests must await the work and assertions they depend on.
- Use subtests and hooks to organize behavior and clean up resources.
- Test HTTP services on ephemeral ports and close each server after its test.
- Verify both success and error responses.
- Keep tests independent, deterministic, and focused on observable behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [129 - Build HTTP servers and handle requests](129-build-http-servers-and-handle-requests.md) | [Open Q&A](../qnas/130-node-js-test-runner-and-service-tests.md) | [Open example](../examples/130-node-js-test-runner-and-service-tests.md) | [131 - Node.js debugging, diagnostics, and profiling](131-node-js-debugging-diagnostics-and-profiling.md) |
