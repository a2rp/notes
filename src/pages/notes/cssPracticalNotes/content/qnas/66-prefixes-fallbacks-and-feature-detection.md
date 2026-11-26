# 66 - Prefixes, fallbacks, and feature detection - Q&A

Use these questions to review fallback order, vendor-prefixed declarations, feature queries, and browser-targeted prefix generation. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What should come first when writing CSS for an optional enhancement?

- A. A usable baseline
- B. A vendor prefix copied from an old stylesheet
- C. An `!important` declaration
- D. A rule that hides the content

**Answer: A. A usable baseline.**

**Explanation:** The page should remain useful if the browser ignores the enhancement or cannot parse its feature query.

### 2. In which order should alternate values for the same property usually appear?

- A. Newer value first, fallback last
- B. Fallback first, newer supported value after it
- C. Alphabetical order
- D. Put both values in separate unrelated selectors

**Answer: B. Fallback first, newer supported value after it.**

**Explanation:** A browser that recognizes both values uses the later declaration. One that does not recognize the newer value ignores it and retains the fallback.

### 3. What is a vendor prefix?

- A. A browser-specific spelling historically used for some experimental or nonstandard features
- B. A guarantee that CSS works in every browser
- C. A CSS comment that disables a rule
- D. A required part of every CSS property

**Answer: A. A browser-specific spelling historically used for some experimental or nonstandard features.**

### 4. If a prefix is needed, what is a common declaration order?

- A. Standard declaration, then prefixed declaration
- B. Prefixed declaration, then standard declaration
- C. Put only the prefixed declaration in the stylesheet
- D. Put the declarations in a media query

**Answer: B. Prefixed declaration, then standard declaration.**

**Explanation:** A browser that understands the standard form can use the standard declaration that follows. Keep the baseline appearance usable if neither form applies.

### 5. What does `@supports (display: grid)` check?

- A. Whether the browser recognizes that declaration
- B. Whether the layout is attractive
- C. Whether all users can operate the page
- D. Whether the CSS file was committed

**Answer: A. Whether the browser recognizes that declaration.**

**Explanation:** The query does not prove that the complete design works correctly in every context.

### 6. Which condition means either declaration can enable the enhancement?

- A. `and`
- B. `or`
- C. `not`
- D. `only`

**Answer: B. `or`.**

**Explanation:** For example, a query can test for either a standard property or a prefixed property.

### 7. When should you use `and` inside a feature query?

- A. When the enhancement requires all listed declarations to be recognized
- B. When either declaration is sufficient
- C. To add a vendor prefix automatically
- D. To validate the HTML document

**Answer: A. When the enhancement requires all listed declarations to be recognized.**

### 8. What does `@supports selector(:focus-visible)` test?

- A. Whether the browser recognizes the selector syntax
- B. Whether the element is visible on the screen
- C. Whether the browser has a keyboard attached
- D. Whether a focus outline has enough contrast

**Answer: A. Whether the browser recognizes the selector syntax.**

**Explanation:** You still need to test that the resulting focus behavior is visible and usable.

### 9. What should remain outside an optional `@supports` block?

- A. The baseline presentation and necessary content styles
- B. Only declarations that use unknown syntax
- C. A browser-specific user agent check
- D. The final build output

**Answer: A. The baseline presentation and necessary content styles.**

### 10. What is a prefix-generation tool designed to do?

- A. Generate relevant prefixed CSS based on configured browser targets and support data
- B. Polyfill every CSS feature in every browser
- C. Replace browser testing
- D. Guarantee accessible color contrast

**Answer: A. Generate relevant prefixed CSS based on configured browser targets and support data.**

### 11. What should you inspect when generated prefix output does not match expectations?

- A. The build tool configuration, browser targets, and generated CSS
- B. Only the HTML page title
- C. The number of CSS comments
- D. The browser's bookmarks

**Answer: A. The build tool configuration, browser targets, and generated CSS.**

### 12. Does a prefixed declaration act as a polyfill for a missing feature?

- A. Yes, it implements every missing behavior
- B. No, it only provides a browser-specific declaration when that browser supports it
- C. Yes, if it is placed last
- D. No, prefixes are always ignored

**Answer: B. No, it only provides a browser-specific declaration when that browser supports it.**

### 13. Why can a blanket list of old prefixes be harmful?

- A. It can add clutter and preserve behavior that no target browser needs
- B. It makes every declaration invalid
- C. It disables all standard properties
- D. It prevents CSS from being cached

**Answer: A. It can add clutter and preserve behavior that no target browser needs.**

### 14. A browser cannot parse `@supports`. How should the page behave?

- A. It should rely on the enhancement block anyway
- B. Its baseline rules should still provide a useful result
- C. It should hide all content
- D. It should load a JavaScript polyfill automatically

**Answer: B. Its baseline rules should still provide a useful result.**

### 15. How should you verify an optional enhancement?

- A. Check only the declaration in a support table
- B. Test both the enhanced state and the baseline in the relevant target browsers
- C. Add `!important` to every enhancement
- D. Remove the fallback after the modern browser looks correct

**Answer: B. Test both the enhanced state and the baseline in the relevant target browsers.**

## Short-answer questions

### 16. How does a fallback value help with unsupported CSS values?

**Answer:** Put a broadly understood value first, then the newer value for the same property. Browsers that do not recognize the later value ignore it and retain the earlier value.

### 17. What makes a good fallback layout?

**Answer:** It preserves content, reading order, and important tasks in a clear arrangement, even if it has fewer visual enhancements.

### 18. What is the difference between a prefix and a feature query?

**Answer:** A prefix is a browser-specific spelling of a feature. A feature query conditionally applies rules when a browser recognizes a declaration or selector.

### 19. Why can a prefix be insufficient even when the browser accepts it?

**Answer:** Historical prefixed syntax or behavior can differ from the final standard, and recognition does not guarantee that the feature works as the design expects.

### 20. Why should a project set browser targets for prefix generation?

**Answer:** The target determines which browser support needs the tool considers. An unsuitable target can create unnecessary output or miss a required compatibility case.

### 21. What does `@supports` fail to prove?

**Answer:** It does not prove that the feature is bug free, produces the desired rendering, or is accessible in the complete interface.

### 22. Why should you inspect a fallback after changing a feature query?

**Answer:** The baseline can have different spacing, order, or sizing. Testing it helps reveal issues that are hidden in the enhanced state.

## Applied troubleshooting questions

### 23. A card layout uses only `display: grid`. What should you change if some target browsers do not support that feature?

**Answer:** Add a usable baseline layout before the Grid declaration, then apply Grid inside an appropriate feature query. Test the baseline and enhanced layouts separately.

**Explanation:** Unsupported declarations are ignored, but the browser will not invent the intended fallback layout for you.

### 24. A panel should blur its background where supported, but remain readable elsewhere. What pattern works?

**Answer:** Give the panel an opaque or otherwise readable background by default. Add the translucent background and standard or required prefixed filter inside a feature query that checks the relevant spelling or spellings.

### 25. An Autoprefixer build does not add a prefix you expected. What should you inspect?

**Answer:** Check whether the feature still needs that prefix for the configured target, then inspect the target configuration, support data, source declaration, and generated CSS.

### 26. A selector feature query passes, but keyboard focus is hard to see. Is the query enough?

**Answer:** No. The query only checks selector recognition. Keep a visible baseline focus style and test keyboard operation and focus visibility in the actual page.

### 27. A stylesheet contains a prefixed declaration from an old tutorial. What should you do before deleting it?

**Answer:** Identify the feature, check whether a browser in the current support target still needs that exact form, and test the standard declaration in the relevant environments.

### 28. The new declaration and its fallback both appear to apply. Which value should a browser use?

**Answer:** If both declarations set the same property, have equal cascade priority, and are in the same rule, the later valid declaration wins. Check the cascade if another rule or importance changes that order.

## Practice task

### 29. What should you document for a compatibility workaround?

**Answer:** State the affected target browser or condition, the observed issue, why the fallback or prefix is needed, and the test that verifies it. Remove the workaround when the support need no longer applies.

**Explanation:** A small reason comment keeps compatibility code reviewable and easier to retire.

## Chapter navigation

| Previous chapter | Lesson | Example | Next chapter |
| :--- | :--- | :--- | :--- |
| [65 - Validation and browser compatibility](../lessons/65-validation-and-browser-compatibility.md) | [Lesson](../lessons/66-prefixes-fallbacks-and-feature-detection.md) | [Example](../examples/66-prefixes-fallbacks-and-feature-detection.md) | [67 - CSS performance](../lessons/67-css-performance.md) |