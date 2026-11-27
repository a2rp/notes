# 88 - Test runners, mocking, and browser testing

This Q&A reviews [Lesson 88](../lessons/088-test-runners-mocking-and-browser-testing.md). Each answer is followed immediately by an explanation.

## Test runners

### 1. What does a test runner do?

**Answer:** It discovers and executes tests, coordinates setup and reporting, and signals whether the run passed or failed.

**Explanation:** A runner gives developers and automation a repeatable way to run checks. Some runners also provide assertions, coverage, filtering, or browser control.

### 2. How is a test runner different from an assertion?

**Answer:** A runner coordinates test execution. An assertion compares an observed result with an expected condition.

**Explanation:** A runner may include assertions, but the concepts are separate. A project can combine a runner with a separate assertion library.

### 3. What does Node.js use to run its built-in JavaScript tests?

**Answer:** The built-in node:test module, invoked from the command line with the test flag.

**Explanation:** It lets a Node.js project define and run tests without installing a separate runner package.

### 4. What command runs Node.js test files discovered by the built-in runner?

**Answer:** node --test.

**Explanation:** The runner searches for matching test files and executes them. A project can also provide explicit file patterns or configuration.

### 5. Why put a test command in the package manifest?

**Answer:** It gives developers and CI one consistent, memorable command for running the suite.

**Explanation:** For example, a script named test can run node --test. This reduces differences between local and automated workflows.

### 6. What should automation do when a test command exits unsuccessfully?

**Answer:** Treat the test run as failed and stop any dependent action, such as publishing a release.

**Explanation:** Human-readable reports explain failures, while a non-zero exit status lets automation make a reliable decision.

### 7. Why should a project document test-file discovery rules?

**Answer:** So contributors know which files the runner actually includes.

**Explanation:** A correctly written test can provide no protection if its filename or directory is outside the runner's discovery rules.

### 8. What must an asynchronous test do so its runner can observe completion?

**Answer:** Return or await the promise that represents the operation.

**Explanation:** If a test finishes early, a later rejection or assertion might be lost or reported outside the intended test.

### 9. What is a setup or teardown hook used for?

**Answer:** Preparing shared test prerequisites or cleaning up resources around tests.

**Explanation:** Hooks can reduce repeated setup, but each test should still make its assumptions understandable. Cleanup should happen after failures too.

### 10. Why is it useful to run tests in CI?

**Answer:** CI can run the same documented checks for every change and prevent known failures from being merged or released.

**Explanation:** The exact workflow varies by project, but repeatable automation catches regressions before they reach users.

## Test doubles and mocking

### 11. What is a test double?

**Answer:** A replacement for a real collaborator used to control or observe a test scenario.

**Explanation:** Test doubles make it possible to check behavior without depending on a slow, unpredictable, expensive, or destructive real service.

### 12. What is a dummy?

**Answer:** A value passed to a function only because an argument is required, even though the scenario does not meaningfully use it.

**Explanation:** A dummy fills a slot. It does not usually return data or record behavior that the test checks.

### 13. What is a stub?

**Answer:** A replacement that returns a predefined response.

**Explanation:** A stub can supply a known result such as a declined payment response, so the test can focus on the code that handles it.

### 14. What is a fake?

**Answer:** A simplified implementation that performs a useful behavior in memory or in a controlled environment.

**Explanation:** An in-memory store is a common example. A fake behaves more like a small working system than a fixed stub response.

### 15. What is a spy?

**Answer:** A function or method that records calls so a test can inspect how it was used.

**Explanation:** A spy can capture the number of calls and their arguments. Some spies also call through to the original behavior.

### 16. What is a mock in the practical sense used in this lesson?

**Answer:** A test double configured with expected interactions, where unexpected calls or arguments can fail the test.

**Explanation:** Teams sometimes use the words spy and mock differently. State whether the test is supplying a response, recording a call, or requiring a particular interaction.

### 17. Where is mocking most useful?

**Answer:** At a dependency boundary that is slow, nondeterministic, costly, destructive, or outside the behavior under test.

**Explanation:** Examples include network clients, clocks, random values, file systems, and message queues.

### 18. Why inject a dependency into a function?

**Answer:** It makes the collaborator explicit and lets a test provide a controlled implementation.

**Explanation:** Passing a mailer or storage object as an argument avoids changing process-wide state and often makes the design easier to understand.

### 19. What does a spy created by Node's test context let you inspect?

**Answer:** Calls to the selected method, including call count and arguments.

**Explanation:** A test-scoped mock such as context.mock.method can record calls while retaining the original method behavior by default.

### 20. Why prefer a test-scoped mock over changing a global function?

**Answer:** The runner can restore the test-scoped mock at the end of the test, limiting state leakage.

**Explanation:** Replacing globals can affect unrelated tests and make results depend on execution order.

### 21. What is a risk of mocking every dependency in a test?

**Answer:** The test can stop checking whether real components work together and instead verify only the arrangement of mocks.

**Explanation:** Keep the code under test real and mock only collaborators needed to control the scenario. Add integration checks for important connections.

### 22. Should a test usually mock the function whose behavior it is supposed to verify?

**Answer:** No.

**Explanation:** Replacing the system under test removes the behavior the test needs to check. Replace its collaborator instead.

### 23. When might a fake be clearer than a mock?

**Answer:** When the test benefits from a small, realistic stateful behavior, such as an in-memory repository.

**Explanation:** A fake can exercise ordinary interactions without requiring a long list of expected calls. It should stay simple and predictable.

### 24. What should be checked before adding a mock to a test?

**Answer:** Whether the dependency is outside the behavior being checked and whether controlling it makes the scenario clearer or more reliable.

**Explanation:** Mocking is a choice, not a requirement. A real integration can provide evidence that a fully mocked test cannot.

## Browser testing

### 25. What does a browser end-to-end test exercise?

**Answer:** A user-facing flow through a running application in a browser.

**Explanation:** It may navigate to a page, enter data, click controls, and verify the visible result across multiple application layers.

### 26. Why locate an interactive control by its accessible role and name?

**Answer:** It describes the control in terms a user can recognize and is less tied to internal layout or CSS classes.

**Explanation:** A locator such as a button named Subscribe reflects the user-facing interface and can also reveal accessibility problems.

### 27. What is a web-first assertion?

**Answer:** An assertion that retries a browser state check until it passes or reaches its timeout.

**Explanation:** Pages update asynchronously. Retrying checks can observe a state that appears shortly after an interaction without an arbitrary sleep.

### 28. Why are fixed sleeps often unreliable in browser tests?

**Answer:** The page may update sooner or later than the chosen delay.

**Explanation:** A fixed wait can waste time and still fail on a slower machine. Wait for the expected state or event instead.

### 29. What does a page fixture provide to a browser test?

**Answer:** A page or browser tab configured by the test framework for that test.

**Explanation:** Browser-test tools commonly provide a fresh page or context through fixtures, which helps isolate cookies, storage, and page state.

### 30. What does browser-context isolation help prevent?

**Answer:** State from one test leaking into another test.

**Explanation:** Separate contexts can provide independent pages, cookies, and storage, which makes tests more reproducible.

### 31. Should every browser test run in every browser engine?

**Answer:** Not necessarily. Select the browser coverage that matches the product's support requirements and compatibility risks.

**Explanation:** A cross-browser matrix can catch engine differences, but more projects also require more time and resources.

### 32. What kinds of behavior are best suited to browser tests?

**Answer:** A small set of important user flows that need evidence across the real page and browser interactions.

**Explanation:** Fast unit tests are usually better for exhaustive input cases. Browser tests add value when the interface and integration path matter.

### 33. How should an app's external API dependency be handled in a browser test?

**Answer:** Control or isolate the API when the scenario does not need the real external service, and reserve real-service checks for cases where that integration is the subject.

**Explanation:** Third-party availability and data can change independently of the app, causing slow or flaky tests.

### 34. What should you do when a browser test fails intermittently?

**Answer:** Investigate uncontrolled state, timing, network calls, test data, and environment differences.

**Explanation:** Retries can collect more diagnostics, but they do not fix the source of a flaky test.

## Apply the ideas

### 35. A test needs an API to return a fixed “not found” response. Which test double is the most direct choice?

A. A stub.
B. A dummy.
C. A browser context.
D. A test reporter.

**Answer:** A. A stub.

**Explanation:** A stub supplies a predetermined result, which makes it a direct way to exercise the not-found handling.

### 36. A test needs to verify that a receipt sender was called with a particular order ID. Which kind of test double is useful?

**Answer:** A spy.

**Explanation:** A spy records the call and arguments so the test can inspect the interaction.

### 37. A test changes the global clock and does not restore it. What is a likely consequence?

**Answer:** Other tests may see the modified clock and fail or behave differently.

**Explanation:** Global state creates test-order dependencies. Use a test-scoped clock mock or inject a clock dependency.

### 38. A browser test clicks Submit, then immediately reads text from the page with a synchronous check. What could make it flaky?

**Answer:** The UI update may not have completed when the immediate check runs.

**Explanation:** Use an assertion that waits for the expected visible state instead of reading too early or adding a guessed sleep.

### 39. A team has many unit tests but no check that the sign-in flow works in an actual browser. What test layer could address that gap?

**Answer:** A focused browser end-to-end test for the sign-in flow.

**Explanation:** Unit tests can verify isolated logic, but they do not prove that the page, controls, navigation, and integration all work together.

### 40. A project already has a runner configured for its framework and CI. Should a second runner be added only because another runner is popular?

**Answer:** No. Keep the existing runner unless a concrete project need justifies another.

**Explanation:** Overlapping tools create extra configuration and multiple ways to run the same checks without necessarily improving coverage.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [87 - Testing fundamentals, assertions, and test design](../lessons/087-testing-fundamentals-assertions-and-test-design.md) | [Lesson](../lessons/088-test-runners-mocking-and-browser-testing.md) / [Example](../examples/088-test-runners-mocking-and-browser-testing.md) | [89 - Formatting, linting, JSDoc, and editor tooling](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md) |
