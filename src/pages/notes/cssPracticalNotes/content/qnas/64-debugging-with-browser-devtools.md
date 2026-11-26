# 64 - Debugging with browser developer tools - Q&A

Use these questions to review how to inspect the rendered page, trace CSS values, test a likely cause, and save a durable fix. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What should you do first when a visible element looks wrong?

- A. Add `!important` to the nearest selector
- B. Inspect the exact affected element
- C. Rewrite the page stylesheet
- D. Clear every browser cache

**Answer: B. Inspect the exact affected element.**

**Explanation:** Confirm the selected node, its classes, its ancestors, and whether a parent, child, pseudo-element, or shadow tree controls the visible result.

### 2. What does the computed styles view tell you?

- A. Every CSS declaration in the repository
- B. The resolved value the browser uses for a property
- C. Which files have uncommitted changes
- D. The original value before the cascade

**Answer: B. The resolved value the browser uses for a property.**

**Explanation:** The computed view helps answer what value is currently applied. Follow the property to its source rule to learn why that value won.

### 3. A matching `color` declaration is crossed out in the rules view. What does this usually mean?

- A. The browser did not download any CSS
- B. The declaration lost to another applicable declaration
- C. The element is hidden from assistive technology
- D. The property only works on headings

**Answer: B. The declaration lost to another applicable declaration.**

**Explanation:** Compare the competing declarations, including cascade origin, importance, layer, specificity, and source order as applicable.

### 4. A rule is visible but dimmed or marked inactive. What should you check?

- A. Its media or support condition and whether it applies to the current element
- B. The spelling of the HTML document title only
- C. Whether the element has a `title` attribute
- D. The repository's license

**Answer: A. Its media or support condition and whether it applies to the current element.**

**Explanation:** A media query may not match the current viewport, a selector may not match, or a declaration may not apply in that layout context.

### 5. Which view is best for finding the padding and border contributing to an element's size?

- A. The box model view
- B. The page source view
- C. The console history only
- D. The bookmarks panel

**Answer: A. The box model view.**

**Explanation:** The box model separates content, padding, border, and margin so you can see where the measured space comes from.

### 6. A flex item refuses to shrink and causes horizontal overflow. Which clue is especially useful to inspect?

- A. Its minimum size and the size of its contents
- B. The document's language attribute
- C. The color of its border
- D. Whether the stylesheet contains comments

**Answer: A. Its minimum size and the size of its contents.**

**Explanation:** A flex or grid item can have an automatic minimum size influenced by intrinsic content. Inspect computed sizing, the parent layout, and overflowing children before changing unrelated properties.

### 7. Why can an element's `width` declaration appear to have no visible effect?

- A. Width is always ignored by browsers
- B. The element's display or layout context may make that width inapplicable or constrained
- C. Width only accepts percentages
- D. The browser has disabled all inline styles

**Answer: B. The element's display or layout context may make that width inapplicable or constrained.**

**Explanation:** Check the computed display, min/max constraints, parent layout, and whether another sizing rule controls the used size.

### 8. Why toggle `:hover` or `:focus` in developer tools?

- A. To make a temporary state remain saved after reload
- B. To inspect state-specific styles without losing the state while moving the pointer
- C. To change the element's HTML tag
- D. To bypass keyboard focus rules

**Answer: B. To inspect state-specific styles without losing the state while moving the pointer.**

**Explanation:** State emulation keeps the pseudo-class active while you inspect its matching rules. Also test keyboard interaction in the page itself.

### 9. What is a good way to check a responsive CSS issue?

- A. Inspect only one wide viewport
- B. Resize or emulate the viewport, then check which condition and rule became active
- C. Change every breakpoint at once
- D. Use a larger font to hide the issue

**Answer: B. Resize or emulate the viewport, then check which condition and rule became active.**

**Explanation:** Compare the affected widths and inspect the active media or container condition and the element's actual containing block.

### 10. A rule is absent from the rules view even though you expect it. What is a useful first check?

- A. Verify the stylesheet request and the loaded file path
- B. Increase the selector specificity immediately
- C. Add the same rule to every stylesheet
- D. Rename the HTML element

**Answer: A. Verify the stylesheet request and the loaded file path.**

**Explanation:** The stylesheet may have a wrong path, failed request, stale response, or generated output that differs from the source file you edited.

### 11. What usually happens to an ordinary style edit made only in developer tools?

- A. It automatically updates the project's source file
- B. It is temporary and may disappear after reload
- C. It is committed to Git automatically
- D. It changes the CSS standard

**Answer: B. It is temporary and may disappear after reload.**

**Explanation:** Use the temporary edit to test a hypothesis, then make the confirmed change in the actual project source unless a configured workspace or local override feature is deliberately being used.

### 12. A document stylesheet does not affect a component's internal shadow element. What should you inspect?

- A. The shadow tree, component styles, and exposed styling hooks
- B. Only the document's `body` selector
- C. The browser's download folder
- D. The number of CSS comments

**Answer: A. The shadow tree, component styles, and exposed styling hooks.**

**Explanation:** A shadow boundary limits ordinary selector reach. Check the component's own styles, host, custom properties, slots, and exposed parts.

### 13. What is the main benefit of changing one value at a time while debugging?

- A. It guarantees the browser has no bugs
- B. It makes cause and effect easier to identify
- C. It prevents the cascade from running
- D. It saves each experiment to source automatically

**Answer: B. It makes cause and effect easier to identify.**

**Explanation:** A small experiment provides clearer evidence about whether the suspected property controls the symptom.

### 14. Which sequence best describes a reliable debugging loop?

- A. Guess a selector, add `!important`, and stop when it looks close
- B. Inspect the element, read the computed property, trace its winning rule, test one change, then fix and verify the source
- C. Rewrite all CSS and skip the browser
- D. Change HTML, CSS, and viewport settings simultaneously

**Answer: B. Inspect the element, read the computed property, trace its winning rule, test one change, then fix and verify the source.**

**Explanation:** This connects the visible symptom to browser evidence and then to a durable, verified source change.

## Short-answer questions

### 15. What is the difference between the rules view and the computed view?

**Answer:** The rules view shows declarations that match an element and how they compete. The computed view shows the resolved value the browser uses for a property.

**Explanation:** Use the computed value to identify the result, then use the rules view and its source locations to understand the cause.

### 16. How can you find which declaration supplied a computed value?

**Answer:** Expand or inspect the computed property and follow its source link to the winning rule and stylesheet location.

**Explanation:** The source location helps distinguish the intended declaration from an older override or a generated stylesheet.

### 17. What factors should you compare when a declaration loses the cascade?

**Answer:** First check whether each rule is active, matches the element, and has a valid applicable declaration. Then compare origin, importance, cascade layer, specificity, and source order where relevant.

**Explanation:** The cascade has an ordering model. Increasing specificity only helps when specificity is the factor that decides the conflict.

### 18. How can the box model help explain unexpected dimensions?

**Answer:** It shows content size, padding, border, and margin separately. Compare these with `box-sizing`, min/max sizes, parent constraints, and the content's intrinsic size.

### 19. What should you do after a temporary developer tools change fixes the display?

**Answer:** Record what the change proved, make the durable correction in the source stylesheet or component, reload, and verify the same state again.

**Explanation:** A normal DevTools edit is an experiment, not necessarily a source change.

### 20. Why is checking the Network panel useful when a CSS rule appears to be missing?

**Answer:** It can show whether the stylesheet request succeeded, which path was loaded, and whether the browser received the expected response.

### 21. How can you inspect a state that disappears when you move the pointer to developer tools?

**Answer:** Use the tool's pseudo-class state control to force a state such as `:hover` or `:focus`, then inspect its matching rules.

### 22. What should you check when a page rule does not style an element inside a web component?

**Answer:** Confirm whether the element is in a shadow tree, inspect component-owned styles and the host, and use only styling hooks the component exposes, such as documented custom properties or parts.

## Applied debugging questions

### 23. A heading looks gray. The computed `color` value is gray, and your green declaration is crossed out. What do you do next?

**Answer:** Follow the computed color to its winning source rule, inspect the competing declaration and why it wins, then test disabling the winner. If that confirms the cause, update the intended source rule or remove the obsolete override.

**Explanation:** The visible symptom is about `color`, so trace that property instead of changing unrelated layout styles.

### 24. A card is wider than its parent even though its width is set to `100%`. What should you inspect?

**Answer:** Inspect the card's box sizing, padding and borders, min/max width, parent content box, intrinsic child widths, and overflow. Also inspect whether a flex or grid item's minimum size is preventing shrinkage.

**Explanation:** The declaration alone does not explain the used size. The box model and layout context matter.

### 25. A mobile-only rule does not appear active while the page is open on a desktop-sized viewport. Is the rule broken?

**Answer:** Not necessarily. Resize or emulate the intended viewport, then check whether the condition matches and whether the rule becomes active.

### 26. You edit a declaration in DevTools, reload, and the bug returns. What does that tell you?

**Answer:** The edit was temporary or was not saved through a configured workspace/override feature. Apply the confirmed fix in the project source, reload, and verify it persists.

### 27. The stylesheet file in your editor contains a rule, but DevTools shows no matching rule and the page looks old. What should you investigate?

**Answer:** Check the stylesheet request, loaded URL/path, response, cache, build output, selector match, and whether the browser is loading generated CSS rather than the source file.

## Practice task

### 28. What evidence should you collect while investigating one visual bug?

**Answer:** Record the affected element, the property tied to the symptom, its computed value, the winning source rule, relevant competing or inactive rules, the temporary change that confirmed the cause, and the source edit that fixed it.

**Explanation:** This makes the investigation reproducible and reduces guesswork if the issue returns.

## Chapter navigation

| Previous chapter | Lesson | Example | Next chapter |
| :--- | :--- | :--- | :--- |
| [63 - Styling Shadow DOM and web components](../lessons/63-shadow-dom-and-web-components.md) | [Lesson](../lessons/64-debugging-with-browser-devtools.md) | [Example](../examples/64-debugging-with-browser-devtools.md) | [65 - Validation and browser compatibility](../lessons/65-validation-and-browser-compatibility.md) |