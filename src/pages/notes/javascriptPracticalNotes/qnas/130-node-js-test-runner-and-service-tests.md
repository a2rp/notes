# 130 - Node.js test runner and service tests: Q&A

Review the built-in test runner, assertions, asynchronous tests, and HTTP service testing. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which module provides Node.js built-in test definitions?

- A. node:test
- B. node:assert/strict
- C. node:http
- D. node:events

**Answer: A.**

**Explanation:** node:test provides the test runner APIs. node:assert/strict provides assertion functions.

### 2. Which command runs the Node.js test runner?

- A. node --test
- B. node --assert
- C. node --check-test
- D. npm --node-test

**Answer: A.**

**Explanation:** The --test flag runs matching test files. A file path can also be passed directly.

### 3. Which assertion import selects strict assertion behavior?

- A. import assert from "node:assert/strict"
- B. import assert from "node:test"
- C. import assert from "node:http"
- D. import assert from "node:events"

**Answer: A.**

**Explanation:** node:assert/strict gives strict comparisons, including strict deep comparisons.

### 4. What does a passing assertion do?

- A. It lets the test continue
- B. It automatically skips the test
- C. It starts a server
- D. It changes the test runner reporter

**Answer: A.**

**Explanation:** An assertion throws when its condition is not met. A passing assertion does not throw.

### 5. What must an async test do with the Promise it is checking?

- A. Return or await it
- B. Start it and let the test end
- C. Convert it to a string
- D. Place it in a global variable

**Answer: A.**

**Explanation:** The runner needs the test function's returned Promise to know when asynchronous work has completed.

### 6. Which assertion is suitable for checking that a Promise rejects?

- A. assert.rejects()
- B. assert.match()
- C. assert.equal()
- D. assert.ifError() only

**Answer: A.**

**Explanation:** assert.rejects() waits for a Promise-producing function and verifies its rejection.

### 7. Which hook is appropriate for registering cleanup for a resource created by one test?

- A. t.after()
- B. test.only()
- C. assert.deepEqual()
- D. describe.skip()

**Answer: A.**

**Explanation:** A test context's after hook runs cleanup after that test, including when an assertion fails.

### 8. Why should an HTTP service test listen on port 0?

- A. The operating system selects an available port
- B. The test disables the network
- C. Port 0 means HTTP is skipped
- D. It makes the server use HTTPS

**Answer: A.**

**Explanation:** Read the selected port from server.address() after the server starts. This avoids collisions with a fixed development port.

### 9. What should a service test generally assert?

- A. The observable contract, such as response status and body
- B. The exact order of every internal helper call
- C. The source code text
- D. The number of files in the project

**Answer: A.**

**Explanation:** Contract-focused assertions let internal implementation change while preserving the required behavior.

### 10. Why is reusing mutable state between test cases risky?

- A. One test can change the result of another
- B. It makes strict assertions unavailable
- C. The runner stops discovering files
- D. It changes HTTP status codes automatically

**Answer: A.**

**Explanation:** Shared state creates order-dependent tests. Give each test a fresh service or fixture where practical.

### 11. What does a test.only() marker risk doing?

- A. Hiding other tests from the run
- B. Turning a unit test into HTTPS
- C. Converting all assertions to loose equality
- D. Cleaning up the server automatically

**Answer: A.**

**Explanation:** An only test can restrict which tests are selected. Do not leave it enabled in committed test code.

### 12. Does high code coverage prove that a service is correct?

- A. No
- B. Yes, always
- C. Only for HTTP routes
- D. Only when tests are skipped

**Answer: A.**

**Explanation:** Coverage reports which code ran. It does not show whether assertions adequately check the intended behavior.

## Short-answer questions

### 13. What is the difference between node:test and node:assert/strict?

**Answer:** node:test defines and runs tests. node:assert/strict supplies assertion functions that throw when expectations are not met.

**Explanation:** They work together, but each module has a separate role.

### 14. Why should a test name describe behavior?

**Answer:** A specific name makes test reports and failures easier to understand.

**Explanation:** A useful name tells the reader what contract the test checks without requiring them to inspect every line first.

### 15. Why should subtests be awaited?

**Answer:** Awaiting keeps the parent test active until its subtests finish.

**Explanation:** An unawaited subtest can outlive its parent and be cancelled or reported incorrectly.

### 16. What does t.after() help with in a server test?

**Answer:** It closes the server after the test finishes.

**Explanation:** Register cleanup when the server starts so resources are released after both passing and failing assertions.

### 17. Why is a fresh service instance useful for each test?

**Answer:** It prevents mutable state created by one test from affecting another.

**Explanation:** Independent fixtures reduce order dependence and make failures easier to reproduce.

### 18. What should be tested for an HTTP endpoint that creates a record?

**Answer:** Check the response status, relevant headers, and returned data. Also test invalid input and other documented error cases.

**Explanation:** Testing only the success path misses part of the endpoint's public contract.

### 19. What is a test double or injected dependency useful for?

**Answer:** It lets a test control an external boundary, such as time or a remote client, without depending on a real external system.

**Explanation:** Keep the boundary narrow. Excessive mocking of internal functions can make tests reflect implementation instead of behavior.

### 20. Why is an arbitrary sleep a poor way to wait for a test server?

**Answer:** A fixed delay can be too short on a slow machine and unnecessarily long on a fast one.

**Explanation:** Wait for the server's listening event, then obtain its assigned port.

## Scenarios

### 21. A test starts fetch() but does not await it. The test report says it passed before the HTTP response arrives. What is wrong?

**Answer:** The test ended before its asynchronous work completed.

**Explanation:** Return or await the Promise so the runner can observe a rejection and wait for assertions.

### 22. A suite fails only when all test files run together, but each file passes alone. What should you investigate?

**Answer:** Look for shared state, fixed ports, environment changes, and resources that are not cleaned up.

**Explanation:** Tests should not rely on execution order or on another file leaving global state in a particular condition.

### 23. Two tests use the same fixed local port and occasionally fail with an address-in-use error. What should they do?

**Answer:** Start each test server on port 0 and use the assigned port from server.address().

**Explanation:** The operating system selects an available port, reducing conflicts with other tests and developer processes.

### 24. An HTTP test receives status 400 but checks only that the request completed. Is the test sufficient?

**Answer:** No. It should assert whether 400 is the intended status and verify the response body or headers that are part of the contract.

**Explanation:** A completed request does not prove that the endpoint handled the input correctly.

### 25. A mock is used for every helper in the service, and the tests pass while the real routes are broken. What is the problem?

**Answer:** The tests replace too much implementation and no longer exercise the service contract.

**Explanation:** Mock external boundaries when needed, and use integration tests to exercise real routing and serialization.

### 26. A t.after() hook closes a server, but the test never awaited the Promise returned by close. What can happen?

**Answer:** Cleanup can finish after the test is reported, or an error from cleanup can be missed.

**Explanation:** Return the Promise from the hook so the runner waits for it.

### 27. A malformed JSON test expects 500. What status should it normally expect from a request parser?

**Answer:** 400 Bad Request.

**Explanation:** The client sent invalid request syntax. A 500 status is for an unexpected server failure.

### 28. A coverage report says every line ran, but a route returns the wrong status and tests still pass. What does that indicate?

**Answer:** The tests execute the route without asserting the required status.

**Explanation:** Coverage measures execution, not assertion quality or correctness.

### 29. A TODO test is reported but not treated as a passing implementation. Why is TODO useful?

**Answer:** It records planned behavior that has not been implemented or verified yet.

**Explanation:** A TODO marker is a visible reminder. It should not replace a completed test for behavior the service claims to support.

### 30. A service test leaves an HTTP server open. What symptom may appear?

**Answer:** The test process can remain alive after the assertions finish.

**Explanation:** Open sockets and other active handles keep Node.js running. Register cleanup and close the server.

## Coding questions

### 31. Write an asynchronous test that checks a rejected Promise.

**Answer:**

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";

test("rejects an invalid request", async () => {
  await assert.rejects(
    async () => {
      throw new Error("Invalid request");
    },
    { message: "Invalid request" }
  );
});
~~~

**Explanation:** The test awaits assert.rejects(), so the runner waits for the rejection assertion to complete.

### 32. Start a service on an available port and register cleanup.

**Answer:**

~~~js
async function startServer(t, server) {
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
~~~

**Explanation:** Port 0 requests an available port. The helper waits for the listening event, registers async cleanup, and returns the actual address.

### 33. Test an HTTP health route's status and JSON response.

**Answer:**

~~~js
import assert from "node:assert/strict";
import { test } from "node:test";

test("health route returns an OK status", async (t) => {
  const baseUrl = await startTestServer(t);
  const response = await fetch(baseUrl + "/health");

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
~~~

**Explanation:** The test checks both the status and the response payload. Its server fixture should register cleanup before returning the base URL.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [129 - Build HTTP servers and handle requests](../lessons/129-build-http-servers-and-handle-requests.md) | [Lesson 130](../lessons/130-node-js-test-runner-and-service-tests.md) | [Example 130](../examples/130-node-js-test-runner-and-service-tests.md) | [131 - Node.js debugging, diagnostics, and profiling](../lessons/131-node-js-debugging-diagnostics-and-profiling.md) |
