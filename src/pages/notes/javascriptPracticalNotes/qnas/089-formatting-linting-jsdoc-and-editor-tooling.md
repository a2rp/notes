# 89 - Formatting, linting, JSDoc, and editor tooling

This Q&A reviews [Lesson 89](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md). Every answer is followed by an explanation.

## Tool roles

### 1. What does a code formatter do?

**Answer:** It applies consistent layout rules to source files.

**Explanation:** A formatter handles presentation such as indentation, quotes, and line wrapping. It does not prove that the program's behavior is correct.

### 2. What does a linter do?

**Answer:** It reports code patterns selected by configured rules.

**Explanation:** A linter can identify issues such as unused variables or undefined names. Its findings depend on the rules and runtime settings chosen for the project.

### 3. Which tool should normally decide line wrapping and indentation?

A. A test runner.
B. A formatter.
C. A package manager.
D. A browser.

**Answer:** B. A formatter.

**Explanation:** A formatter is designed to apply consistent code layout. Other tools may report style, but the project should avoid competing sources of formatting changes.

### 4. What should tests check that formatting and linting do not?

**Answer:** Tests should check whether the program's behavior matches its requirements for the exercised scenarios.

**Explanation:** Formatting changes layout and linting checks configured code patterns. Neither one executes the full behavior the way a test does.

### 5. What is the difference between Prettier write mode and check mode?

**Answer:** Write mode changes files to match the formatter; check mode reports files that need formatting without rewriting them.

**Explanation:** Write mode is useful during development. Check mode is appropriate in CI because validation should not silently modify the working tree.

### 6. Why should a project install tools locally?

**Answer:** So the project can use known tool versions consistently across developers and automation.

**Explanation:** A local dependency and committed lockfile make it less likely that different machines format or lint the same code differently.

### 7. Why can an unpinned formatter version create noisy changes?

**Answer:** Formatter releases can change output, so different versions may rewrite the same code in different ways.

**Explanation:** Pinning the project version and keeping its lockfile current gives the team a shared formatting result.

### 8. What is ESLint's flat configuration file commonly named?

**Answer:** eslint.config.js, eslint.config.mjs, or another supported eslint.config file extension.

**Explanation:** The configuration belongs at the project root and describes which rules and options apply to which files.

### 9. What does an ESLint recommended configuration provide?

**Answer:** A set of selected rules that the configuration enables for the project.

**Explanation:** A linter does not automatically apply every possible rule. The project must choose a configuration or specify rules.

### 10. ESLint reports document as undefined in browser code. What should be checked first?

**Answer:** Whether the configuration declares browser globals for those files.

**Explanation:** The source may be valid browser code while the linter is configured for a different runtime. Configure the right globals rather than suppressing a useful rule blindly.

## Formatting and lint workflow

### 11. Why can ESLint and Prettier conflict?

**Answer:** Both can be configured to make decisions about stylistic details such as spacing or quotes.

**Explanation:** A project can make Prettier responsible for formatting and configure ESLint to avoid overlapping style rules.

### 12. What is a package script useful for?

**Answer:** It gives a project a consistent command name for routine tasks such as linting and formatting.

**Explanation:** Scripts make it easier for contributors and CI to run the intended tools without memorizing long commands.

### 13. Why should CI run a formatting check instead of write mode?

**Answer:** CI should validate the existing files without modifying them.

**Explanation:** If files are not formatted, check mode can fail the job and tell a developer to format them locally.

### 14. Why ignore generated output and dependencies in formatter inputs?

**Answer:** Those files are not usually maintained by hand and may be large, generated, or unsuitable for formatting.

**Explanation:** Explicit ignore rules avoid changing build output or wasting time processing installed dependencies.

### 15. Should every project add many formatter options?

**Answer:** No. Add only the preferences the team wants to maintain.

**Explanation:** Defaults may already be adequate. Extra configuration creates more policy to understand and keep consistent.

## JSDoc

### 16. What is JSDoc?

**Answer:** A comment syntax for documenting JavaScript APIs and their parameters, return values, and other contracts.

**Explanation:** JSDoc can help human readers and editor language services, but it does not change runtime behavior by itself.

### 17. Which JSDoc tag documents a parameter?

**Answer:** @param.

**Explanation:** A parameter tag can state the expected type and describe what the argument means.

### 18. Which JSDoc tag documents a function's returned value?

**Answer:** @returns.

**Explanation:** A return tag explains what the caller receives and can also describe its type.

### 19. Which JSDoc tag can document an error condition?

**Answer:** @throws.

**Explanation:** It tells a caller what kind of error can be raised and under which condition.

### 20. What is @typedef used for?

**Answer:** To define a reusable type description, often for an object shape or callback.

**Explanation:** Naming a shape can make function documentation shorter and help editors show property hints.

### 21. Does JSDoc validation automatically reject bad input at runtime?

**Answer:** No.

**Explanation:** JSDoc comments are documentation and can provide static editor hints. Runtime checks must still be written when the program needs to validate actual values.

### 22. Why can JSDoc improve editor completions?

**Answer:** It gives the language service additional information about parameter types, object properties, and API intent.

**Explanation:** With that information, an editor can show more useful parameter hints, hover text, and member suggestions in JavaScript.

### 23. What is the purpose of a // @ts-check comment in JavaScript?

**Answer:** It asks supported editor tooling to check that file more strictly using inferred and documented types.

**Explanation:** It can be a small file-level starting point before enabling checking across a project.

### 24. What does checkJs in a jsconfig file request?

**Answer:** Project-wide JavaScript diagnostics for files included by the configuration.

**Explanation:** It enables static feedback based on inference and JSDoc. It does not execute the program or replace tests.

### 25. When is JSDoc most useful?

**Answer:** For exported functions, reusable modules, non-obvious object shapes, and APIs whose callers benefit from a clear contract.

**Explanation:** Documentation is most valuable where it helps someone use or maintain an API. Repeating obvious implementation details adds noise.

### 26. Why is outdated JSDoc harmful?

**Answer:** It can give callers the wrong expectations about the API.

**Explanation:** Comments are part of the information developers rely on. Update or remove them when behavior changes.

## Editor and team configuration

### 27. Name two common IntelliSense features.

**Answer:** Code completion and parameter information.

**Explanation:** Editors can also show hover documentation, inferred types, references, and other language-aware suggestions.

### 28. Why should editor settings be shared at the project level where useful?

**Answer:** They can help the team use the same formatter and save behavior.

**Explanation:** Shared settings reduce differences between contributors, though command-line checks are still needed for people using other editors.

### 29. Why is format-on-save not enough to validate a repository?

**Answer:** Not every contributor uses the same editor or settings, and formatting does not check behavior or all configured lint rules.

**Explanation:** A documented command line and CI checks provide a shared validation path independent of the editor.

### 30. What should a developer do when a lint rule reports an issue?

**Answer:** Read the diagnostic, understand the configured rule, then fix the code or adjust the rule only when the project policy requires it.

**Explanation:** Disabling a rule without understanding it can hide a real issue or weaken checks for unrelated files.

### 31. What is a formatter ignore file for?

**Answer:** Listing files and directories that the formatter should leave alone.

**Explanation:** It helps exclude generated artifacts, dependencies, and other content not maintained as ordinary source.

### 32. What does a lockfile contribute to a JavaScript toolchain?

**Answer:** It records resolved dependency versions so installs are more reproducible.

**Explanation:** The package manifest expresses dependencies and ranges, while the lockfile captures the resolution selected for the project.

### 33. Should a project run a formatter automatically in CI if the job is supposed to validate a change?

**Answer:** It should use a non-writing check in CI.

**Explanation:** A validation job should report that a file needs formatting instead of silently changing files after they were committed.

## Apply the ideas

### 34. A function accepts price and percentage. Which JSDoc tags would document its inputs and result?

**Answer:** Use @param for price and percentage and @returns for the calculated result.

**Explanation:** These tags communicate the function contract at the point where callers and editors need it.

### 35. A function throws RangeError when a percentage is outside 0 through 100. Which tag can document that behavior?

**Answer:** @throws.

**Explanation:** Documenting expected errors helps callers understand which invalid values need to be handled.

### 36. A project formats files consistently but has a failing test for a wrong total. What does that show?

**Answer:** Formatting consistency does not guarantee correct program behavior.

**Explanation:** The formatter only manages layout. A test is needed to check the total against its expected value.

### 37. An editor shows no useful property hints for a documented object argument. What could help?

**Answer:** Add or correct a JSDoc typedef and parameter annotation, and confirm JavaScript checking or language support is enabled.

**Explanation:** An editor can only provide hints from information it can infer or read. Incorrect or missing annotations limit those suggestions.

### 38. The project has browser JavaScript and Node.js scripts. Should all files share one runtime-global configuration?

**Answer:** Not if the files run in different environments. Configure appropriate globals for each file group.

**Explanation:** Browser files use names such as document, while Node files have different globals. File-specific settings help catch genuine undefined names.

### 39. What should happen when code changes but its JSDoc still describes the old behavior?

**Answer:** Update the documentation or remove the misleading claim.

**Explanation:** The documented contract should match the implementation and requirements. Stale comments can cause callers to use an API incorrectly.

### 40. Give a short team workflow that uses formatting, linting, tests, and review in useful order.

**Answer:** Edit code and JSDoc, format changed files, run lint and tests, inspect the diff, then let CI repeat the checks.

**Explanation:** Each step serves a different purpose. Formatting normalizes layout, linting checks configured patterns, tests check behavior, and review evaluates intent and risk.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [88 - Test runners, mocking, and browser testing](../lessons/088-test-runners-mocking-and-browser-testing.md) | [Lesson](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md) / [Example](../examples/089-formatting-linting-jsdoc-and-editor-tooling.md) | [90 - The asynchronous programming model](../lessons/090-the-asynchronous-programming-model.md) |
