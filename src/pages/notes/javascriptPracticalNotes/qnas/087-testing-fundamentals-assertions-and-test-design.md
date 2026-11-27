# 87 - Testing fundamentals, assertions, and test design

This Q&A reviews the ideas in [Lesson 87](../lessons/087-testing-fundamentals-assertions-and-test-design.md). Each answer appears directly after its question, followed by an explanation.

## Foundations

### 1. What is the main purpose of a software test?

**Answer:** To check whether observable program behavior matches an expected requirement for a chosen scenario.

**Explanation:** A test makes an expectation executable. Tests can find defects and prevent regressions, but they only check the scenarios and assertions that were written.

### 2. What is a regression?

**Answer:** A defect where a change causes behavior that previously worked to stop working or change unexpectedly.

**Explanation:** A regression test records an important behavior so future code changes can be checked against it.

### 3. What are the three common parts of a focused test?

**Answer:** Arrange, act, and assert.

**Explanation:** Arrange the inputs and state, act by invoking the behavior, and assert the expected result. These steps help readers understand the test's purpose.

### 4. Which assertion is more precise when a calculation must return zero?

A. Check that the result is falsy.
B. Check that the result is exactly zero.

**Answer:** B. Check that the result is exactly zero.

**Explanation:** A falsy check also accepts values such as false, an empty string, or null. Equality with zero states the contract more precisely.

### 5. Why should a test usually focus on behavior instead of the exact implementation?

**Answer:** Because internal code can be refactored without changing the behavior promised to callers.

**Explanation:** A behavior-focused test continues to pass after a harmless refactor and fails when the observable contract breaks.

### 6. What is an assertion?

**Answer:** A check that states a condition the test expects to be true.

**Explanation:** Assertions compare observed values or state with expectations. A failing assertion reports that the scenario did not meet its stated expectation.

## Choosing test cases

### 7. What does equivalence partitioning help a tester do?

**Answer:** Group inputs expected to follow the same behavior, then choose representative values from those groups.

**Explanation:** Testing every possible input is usually impossible. Representative values keep the suite manageable while still covering distinct rules.

### 8. What is a boundary value?

**Answer:** A value at or near a point where the expected behavior changes.

**Explanation:** Boundaries often reveal comparison and off-by-one errors. For a threshold of 50, values such as 49.99, 50, and 50.01 are useful.

### 9. A requirement says a discount applies when quantity is at least 10. Which condition matches it?

A. quantity > 10
B. quantity >= 10
C. quantity < 10
D. quantity !== 10

**Answer:** B. quantity >= 10.

**Explanation:** “At least 10” includes 10 and all larger values. The test should include the exact boundary to catch an accidental strict greater-than condition.

### 10. Why include invalid-input tests?

**Answer:** To verify how the program handles inputs that violate a defined validation rule.

**Explanation:** Invalid cases matter when the program promises to reject, normalize, or otherwise handle them. Avoid inventing a requirement that the program does not define.

### 11. When testing an error, what should be checked?

**Answer:** Check that the operation fails in the promised way, such as throwing or rejecting with the expected error type.

**Explanation:** An error test should distinguish the intended validation failure from an unrelated crash. Check a message too when it is part of the user-facing contract.

### 12. A function accepts any finite non-negative subtotal. Which value is invalid by type validation?

A. 0
B. 25.50
C. Infinity
D. 50

**Answer:** C. Infinity.

**Explanation:** Infinity is not a finite number. Zero and the other finite non-negative values meet the stated input rule.

### 13. Why test values just below, at, and just above a threshold?

**Answer:** To check both sides of the rule and the exact point where behavior changes.

**Explanation:** A typical value may pass even if the comparison operator is wrong. Boundary checks expose such mistakes.

### 14. What is a decision table useful for?

**Answer:** Listing important conditions and the expected outcome for each meaningful combination.

**Explanation:** A table helps reveal missing combinations and provides a direct plan for test cases before implementation details are considered.

## Reliability and test structure

### 15. What makes a test deterministic?

**Answer:** Given the same controlled code and inputs, it produces the same result every time.

**Explanation:** Uncontrolled time, randomness, network state, and machine configuration can make a test behave differently between runs.

### 16. How can code that depends on the current time be easier to test?

**Answer:** Pass in a clock or time value so the test can use a fixed, known time.

**Explanation:** Controlling the time removes dependence on when the test happens to run and makes edge cases such as midnight reproducible.

### 17. What does test isolation mean?

**Answer:** A test can run without depending on the order or side effects of another test.

**Explanation:** An isolated test creates or resets the state it needs and cleans up what it changes. This makes failures easier to reproduce.

### 18. What can go wrong when tests share mutable state?

**Answer:** One test may change data another test expects, causing order-dependent failures.

**Explanation:** Shared state creates hidden dependencies. Give each test its own data where practical, and reset unavoidable shared resources.

### 19. Why is waiting for a fixed delay often a poor synchronization strategy?

**Answer:** The operation may take longer than the delay on one machine and much less time on another.

**Explanation:** A fixed sleep wastes time and can still be flaky. Wait for a defined event or completion signal instead.

### 20. Why should a test clean up resources it creates?

**Answer:** To prevent later tests or future runs from inheriting open handles, files, timers, or modified data.

**Explanation:** Cleanup should also occur if an assertion fails. Otherwise a failed test can leave the environment in a state that causes confusing follow-on failures.

### 21. Which example is most likely to be flaky?

A. A pure calculation with fixed inputs.
B. A check that depends on a remote service being fast and available.
C. A validation check using a fixed invalid string.
D. A comparison of two fixed objects.

**Answer:** B. A check that depends on a remote service being fast and available.

**Explanation:** Network services can be slow, unavailable, or return changing data. Tests should control or deliberately isolate those dependencies.

### 22. What should a test name communicate?

**Answer:** The behavior being checked and any important condition.

**Explanation:** A name such as “returns free standard shipping at the threshold” is more useful than “test 3” when a failure appears in a report.

### 23. Is “one assertion per test” an absolute rule?

**Answer:** No. A test can have several assertions when they support one coherent behavior.

**Explanation:** The goal is a clear failure with one understandable reason. Unrelated checks in one test make it harder to know what broke.

## Test scope

### 24. What does a unit test typically check?

**Answer:** A small unit of behavior, often a function or module, with relevant dependencies controlled.

**Explanation:** Unit tests are usually focused and fast, which makes them useful for exercising many input cases.

### 25. What does an integration test typically check?

**Answer:** Whether multiple parts work together across a meaningful boundary.

**Explanation:** An integration test might check application code interacting with a database adapter or another component. It can reveal problems that isolated unit tests cannot.

### 26. What does an end-to-end test typically check?

**Answer:** A user-facing flow through a running application, often through a browser or an API boundary.

**Explanation:** This broader scope can verify that several layers work together, but the setup is generally more involved than a focused unit test.

### 27. Which is the smallest useful scope for checking a pure function's price calculation?

A. A unit test of the function.
B. A full browser test of the entire website.
C. A manual review of a screenshot.
D. A deployment test against production.

**Answer:** A. A unit test of the function.

**Explanation:** A unit test directly checks the calculation with controlled inputs. A broader test is unnecessary for this isolated behavior unless it verifies a separate integration requirement.

### 28. Is a test pyramid a strict formula?

**Answer:** No. It is a planning heuristic that encourages many focused checks and targeted broader checks.

**Explanation:** Projects have different risks and architectures. The useful scope and balance depend on what kinds of failures matter for that application.

## Coverage and quality

### 29. What does line coverage estimate?

**Answer:** Which executable lines ran during a test run.

**Explanation:** It helps identify code that was never exercised. It does not reveal whether the tests checked the right result.

### 30. What does branch coverage estimate?

**Answer:** Which decision outcomes, such as true and false paths, ran during a test run.

**Explanation:** Branch coverage can reveal untested paths, but a test can execute a branch without checking whether its behavior is correct.

### 31. Does 100 percent coverage prove that software has no bugs?

**Answer:** No.

**Explanation:** Coverage measures execution, not the quality of expectations. Tests can execute every line and still assert incorrect or incomplete behavior.

### 32. How should coverage information be used?

**Answer:** As a signal for reviewing untested behavior and deciding whether additional meaningful cases are needed.

**Explanation:** Use it to ask questions about requirements, branches, and risk. Do not treat the percentage as a quality score by itself.

### 33. What is wrong with asserting only that an expected array is non-empty when its exact contents are part of the requirement?

**Answer:** The assertion can pass even if the array contains the wrong items or order.

**Explanation:** The assertion is too broad to protect the contract. Compare the required contents and order when those details matter.

### 34. What should a good failure report help a developer identify?

**Answer:** The behavior, input or state, expected result, and observed result.

**Explanation:** Clear names and focused assertions reduce the time needed to reproduce and diagnose a failure.

## Apply the ideas

### 35. A standard-shipping fee is free for subtotals of 50 or more. Give three useful boundary inputs.

**Answer:** 49.99, 50, and 50.01.

**Explanation:** They represent just below the threshold, exactly at it, and just above it.

### 36. A test passes locally but fails depending on which test ran first. What is a likely design problem?

**Answer:** The tests probably share state or rely on test execution order.

**Explanation:** Make each test establish its own inputs, reset shared state, and clean up side effects.

### 37. A developer changes a private helper name, and several tests fail even though application behavior is unchanged. What might those tests be checking?

**Answer:** They may be coupled to implementation details rather than observable behavior.

**Explanation:** Tests should normally exercise public behavior. Keep internal checks only when the internal property itself is a requirement.

### 38. A test calls an asynchronous operation but never waits for its returned promise. What risk does this create?

**Answer:** The test may finish before the operation or its assertion completes, hiding a failure or reporting it unclearly.

**Explanation:** Return or await the promise so the test framework knows when the asynchronous behavior has finished.

### 39. What is a useful regression test to add after fixing a bug?

**Answer:** A focused test that reproduces the original failing scenario and asserts the corrected behavior.

**Explanation:** The test documents the defect as a behavior that must remain fixed and helps catch a future recurrence.

### 40. A checkout requirement says standard shipping costs 5.99 below 50 and is free at 50 or above. Express shipping always costs 12. Name a compact set of cases that exercises the main rules.

**Answer:** Standard at 49.99, standard at 50, standard above 50, express below 50, and express at or above 50.

**Explanation:** These cases cover the threshold and verify that express shipping follows its separate rule. Additional tests should check any defined invalid-input behavior.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [86 - Transpilation, bundlers, polyfills, and source maps](../lessons/086-transpilation-bundlers-polyfills-and-source-maps.md) | [Lesson](../lessons/087-testing-fundamentals-assertions-and-test-design.md) / [Example](../examples/087-testing-fundamentals-assertions-and-test-design.md) | [88 - Test runners, mocking, and browser testing](../lessons/088-test-runners-mocking-and-browser-testing.md) |
