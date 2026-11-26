# 65 - Validation and browser compatibility - Q&A

Use these questions to review what CSS validation can and cannot prove, how to plan browser coverage, and how to investigate compatibility differences. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What does a CSS validator primarily check?

- A. Whether a page is attractive
- B. CSS syntax and conformance issues in the checked input
- C. Whether every user can complete every task
- D. Whether a website is fast on every network

**Answer: B. CSS syntax and conformance issues in the checked input.**

**Explanation:** Validation can find malformed syntax, invalid values, or other reported issues. It does not judge the complete rendered experience.

### 2. A stylesheet passes validation. What does that prove?

- A. The design works in every browser
- B. The page has accessible focus and contrast
- C. The checked stylesheet has no issues reported by that validation run
- D. All assets loaded successfully

**Answer: C. The checked stylesheet has no issues reported by that validation run.**

**Explanation:** A clean report is useful, but it does not test visual behavior, interactions, accessibility, performance, or compatibility in every environment.

### 3. Which tool is best suited to check whether a declaration is recognized by the current browser?

- A. A CSS feature query such as `@supports`
- B. A screenshot editor
- C. A file renamer
- D. A keyboard shortcut list

**Answer: A. A CSS feature query such as `@supports`.**

**Explanation:** `@supports` checks whether the browser recognizes a CSS declaration or selector syntax. It does not prove that the feature behaves perfectly.

### 4. What is an important limitation of `@supports`?

- A. It only checks page width
- B. It cannot establish that a recognized feature is bug free or accessible
- C. It always disables the declaration it checks
- D. It can only test color values

**Answer: B. It cannot establish that a recognized feature is bug free or accessible.**

**Explanation:** Test the actual behavior in the relevant page and browsers.

### 5. What should you do before choosing browser versions to support?

- A. Select every browser version ever released
- B. Define a support target based on the audience and project needs
- C. Test only the browser installed on your computer
- D. Add vendor prefixes to every declaration

**Answer: B. Define a support target based on the audience and project needs.**

**Explanation:** A clear support target helps choose meaningful test coverage and avoid spending effort on combinations the project does not need to support.

### 6. What information should you record when reporting a browser-specific bug?

- A. Browser and version, environment, viewport, steps, and observed result
- B. Only the color of the affected element
- C. Only the CSS framework name
- D. Nothing, because screenshots reproduce every bug

**Answer: A. Browser and version, environment, viewport, steps, and observed result.**

**Explanation:** Specific conditions make the issue reproducible and help distinguish a browser difference from a missing stylesheet or user preference.

### 7. What is progressive enhancement?

- A. Make core content depend on the newest CSS feature
- B. Provide a usable baseline, then add enhancements where supported
- C. Disable all CSS in older browsers
- D. Use the same fixed layout at every viewport

**Answer: B. Provide a usable baseline, then add enhancements where supported.**

**Explanation:** Users can still access the important content when an optional enhancement is unavailable.

### 8. If a browser does not recognize a CSS declaration, what generally happens?

- A. The browser ignores that declaration and continues parsing the stylesheet
- B. The browser deletes the stylesheet
- C. The browser disables all CSS on the page
- D. The browser automatically installs support for the feature

**Answer: A. The browser ignores that declaration and continues parsing the stylesheet.**

**Explanation:** Error handling can preserve some styling, but it does not automatically create a good fallback.

### 9. Which is a good reason to check compatibility information?

- A. To plan which browsers and feature versions need testing
- B. To avoid testing entirely
- C. To prove a page is accessible
- D. To remove all fallback styles

**Answer: A. To plan which browsers and feature versions need testing.**

**Explanation:** Support information helps select test cases. The actual behavior still needs verification.

### 10. Why can a CSS linter report an issue that needs human review?

- A. A linter may apply project conventions or heuristics that require context
- B. A linter can see every user interaction
- C. A linter always knows the product requirements
- D. A linter replaces browser testing

**Answer: A. A linter may apply project conventions or heuristics that require context.**

**Explanation:** Inspect the message, source, and project setup before fixing or suppressing it.

### 11. Which test is most useful after adding an optional layout enhancement?

- A. Confirm the baseline remains usable when the enhancement is unavailable
- B. Confirm only the newest browser shows the enhancement
- C. Remove all baseline declarations
- D. Check only the desktop screenshot

**Answer: A. Confirm the baseline remains usable when the enhancement is unavailable.**

### 12. Why should you test at increased zoom or text scaling when relevant?

- A. It can reveal clipping, overflow, or layouts that fail when content grows
- B. It validates stylesheet syntax
- C. It proves the browser supports every CSS property
- D. It replaces testing on mobile

**Answer: A. It can reveal clipping, overflow, or layouts that fail when content grows.**

### 13. What should you do before adding a vendor prefix to fix a browser difference?

- A. Confirm the exact feature, target browser, cause, and project toolchain
- B. Add every known prefix to every rule
- C. Remove the unprefixed declaration
- D. Disable validation

**Answer: A. Confirm the exact feature, target browser, cause, and project toolchain.**

**Explanation:** A prefix may not address the real cause. Prefix strategy and fallbacks are covered in the next chapter.

### 14. Which statement about compatibility summaries is correct?

- A. They replace accessibility and usability testing
- B. They summarize support, but do not prove the feature works in every environment
- C. They list the exact appearance of every website
- D. They guarantee all old devices behave the same way

**Answer: B. They summarize support, but do not prove the feature works in every environment.**

## Short-answer questions

### 15. How are validation and browser testing different?

**Answer:** Validation checks the stylesheet for syntax or conformance issues. Browser testing checks the rendered behavior in specific browsers, versions, devices, viewports, and user settings.

### 16. Why can valid CSS still produce a broken layout?

**Answer:** The CSS may be valid but select the wrong element, conflict in the cascade, behave poorly with real content, or rely on a feature that is missing or behaves differently in a target browser.

### 17. What does a feature query test?

**Answer:** It tests whether the browser recognizes a specified CSS declaration or selector syntax.

**Explanation:** It does not test the complete design outcome, implementation correctness, accessibility, or all possible bugs.

### 18. What belongs in a useful browser test matrix?

**Answer:** The supported browser and version combinations, relevant devices or operating systems, viewport sizes, input methods, and user conditions such as zoom or reduced motion when they affect the page.

### 19. What is a baseline style?

**Answer:** The set of styles that provides the essential, usable presentation before optional enhancements are applied.

### 20. How should you handle a validator warning?

**Answer:** Inspect its file and line, understand what it reports, check whether the source is generated or authored, and decide whether the message points to a real project issue before fixing or suppressing it.

### 21. What is a useful first step when a layout differs between two browsers?

**Answer:** Record the exact browser versions and conditions, reproduce the same page state in both, and inspect the affected element and computed styles before changing CSS.

### 22. Why is testing a fallback important?

**Answer:** An unsupported enhancement may be ignored, leaving only the baseline. Testing confirms that important content and tasks still work in that state.

## Applied troubleshooting questions

### 23. A page passes a CSS validator but has horizontal scrolling on a phone. What should you do?

**Answer:** Reproduce the issue at the affected viewport, inspect the overflowing element and its ancestors, and check fixed widths, min-width constraints, intrinsic content sizes, and overflow. Then fix the actual layout and retest nearby widths.

**Explanation:** A syntax validator cannot determine whether a valid width is appropriate for the page's content and viewport.

### 24. A feature query becomes true, but the feature looks wrong in one browser. What does that suggest?

**Answer:** The browser recognizes the syntax, but the actual behavior or the page's use of the feature still needs investigation. Reproduce the case, inspect computed styles, and test an appropriate simpler fallback or correction.

### 25. A newer browser looks correct while an older supported browser loses the card layout. What is a good approach?

**Answer:** Confirm the exact unsupported feature and the older browser version. Provide a useful baseline layout, apply the enhancement only when supported, and test both the baseline and enhanced states.

### 26. A validator flags an unfamiliar property that is intentionally generated by a build tool. What should you check?

**Answer:** Confirm whether the tool is validating authored source or generated output, identify the project's intended syntax and build steps, and inspect whether the reported property is valid for the target setup before changing or suppressing it.

### 27. The same CSS bug appears only when users increase text size. What should you investigate?

**Answer:** Reproduce the relevant scaling or zoom condition, then inspect fixed heights, clipping, overflow, line wrapping, and content sizing. Change the layout so the content can grow and verify the task remains usable.

### 28. A compatibility report says a feature is widely available. Is more testing necessary?

**Answer:** Yes, if the feature affects an important result. Confirm the exact property and value, the report's browser and version scope, and test the actual behavior in the project’s target environments.

## Practice task

### 29. What should a concise compatibility bug report contain?

**Answer:** Include the browser and version, device or operating system, viewport and zoom, relevant user preference, steps to reproduce, expected result, observed result, and the smallest useful code case if available.

**Explanation:** This gives another developer enough information to reproduce and diagnose the issue.

## Chapter navigation

| Previous chapter | Lesson | Example | Next chapter |
| :--- | :--- | :--- | :--- |
| [64 - Debugging with browser developer tools](../lessons/64-debugging-with-browser-devtools.md) | [Lesson](../lessons/65-validation-and-browser-compatibility.md) | [Example](../examples/65-validation-and-browser-compatibility.md) | [66 - Prefixes, fallbacks, and feature detection](../lessons/66-prefixes-fallbacks-and-feature-detection.md) |