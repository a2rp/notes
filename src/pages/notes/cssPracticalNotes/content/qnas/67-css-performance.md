# 67 - CSS performance - Q&A

Use these questions to review how CSS affects initial rendering, stylesheet delivery, layout work, paint, and animation performance. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is a good first step before optimizing CSS performance?

- A. Add `will-change` to every element
- B. Measure and reproduce the actual slow experience
- C. Remove every rule marked unused in one recording
- D. Move all CSS out of the document head

**Answer: B. Measure and reproduce the actual slow experience.**

**Explanation:** Measurement helps identify whether the bottleneck is resource loading, style recalculation, layout, paint, or another part of the page.

### 2. Why can a stylesheet delay the first render?

- A. The browser needs to process relevant CSS to know how to style the page
- B. CSS always blocks every network request
- C. Stylesheets cannot load until JavaScript finishes
- D. CSS files are executed like scripts

**Answer: A. The browser needs to process relevant CSS to know how to style the page.**

### 3. Why can an `@import` chain add delay?

- A. The imported stylesheet may be discovered only after the importing sheet is received and parsed
- B. It deletes the HTML document
- C. It disables browser caching
- D. It forces all animations to run

**Answer: A. The imported stylesheet may be discovered only after the importing sheet is received and parsed.**

### 4. What does a CSS coverage report show?

- A. All CSS that can ever be used in the application
- B. Rules used during the specific page and states recorded
- C. Whether the page is accessible
- D. Whether every browser supports every rule

**Answer: B. Rules used during the specific page and states recorded.**

**Explanation:** A rule that appears unused in one route, viewport, or interaction may be used somewhere else.

### 5. Which properties are often useful for simple movement and fading animations?

- A. `width` and `margin`
- B. `transform` and `opacity`
- C. `padding` and `top`
- D. `height` and `left`

**Answer: B. `transform` and `opacity`.**

**Explanation:** These often avoid layout changes, but profiling is still needed because the result depends on the effect, element size, browser, and device.

### 6. Which change is most likely to cause repeated layout work during an animation?

- A. Animating `width` every frame
- B. Updating `opacity`
- C. Updating a class once before an animation
- D. Loading a print-only stylesheet

**Answer: A. Animating `width` every frame.**

### 7. What is a good use of `will-change`?

- A. A measured, specific animation problem where a browser hint improves the result
- B. Every image, card, and button on the page
- C. Replacing a missing fallback
- D. Preventing all repaint work

**Answer: A. A measured, specific animation problem where a browser hint improves the result.**

### 8. What is one risk of inlining all CSS in the HTML?

- A. It can duplicate bytes, enlarge HTML, and make updates harder to maintain
- B. It disables styles on mobile
- C. It prevents the browser from parsing the page
- D. It guarantees slower rendering

**Answer: A. It can duplicate bytes, enlarge HTML, and make updates harder to maintain.**

### 9. Why should nonessential CSS not simply be delayed without checking?

- A. Essential content may appear unstyled or shift when CSS arrives late
- B. The browser will stop parsing HTML forever
- C. CSS files cannot be cached after a delay
- D. It makes the stylesheet invalid

**Answer: A. Essential content may appear unstyled or shift when CSS arrives late.**

### 10. What is a reasonable reason to split CSS by media condition?

- A. A stylesheet is only needed under a distinct condition, such as print
- B. Every selector should have its own file
- C. The site needs more network requests
- D. To avoid writing a support target

**Answer: A. A stylesheet is only needed under a distinct condition, such as print.**

### 11. What should you do before removing a rule that appears unused?

- A. Check other routes, states, viewports, and conditions where it may apply
- B. Delete the whole stylesheet
- C. Rename the property
- D. Add `!important` to every remaining rule

**Answer: A. Check other routes, states, viewports, and conditions where it may apply.**

### 12. Does a transform animation guarantee that the browser will do no paint work?

- A. Yes, always
- B. No, actual work depends on the element, effect, browser, and device
- C. Yes, if the element has a class
- D. No, because transforms are invalid CSS

**Answer: B. No, actual work depends on the element, effect, browser, and device.**

### 13. What can a network panel help you find when a page loads slowly?

- A. Stylesheet requests, sizes, caching, and request timing
- B. Whether the text is semantically meaningful
- C. Whether a selector has good names
- D. Which color a visitor prefers

**Answer: A. Stylesheet requests, sizes, caching, and request timing.**

### 14. How should reduced-motion preferences affect nonessential animations?

- A. They can be removed or shortened for users who request less motion
- B. They must always be made longer
- C. They should disable every stylesheet
- D. They replace browser support testing

**Answer: A. They can be removed or shortened for users who request less motion.**

### 15. Why should you compare performance recordings under the same conditions?

- A. To make the before and after results more meaningful
- B. To avoid inspecting the page
- C. To prevent CSS parsing
- D. To make all devices behave identically

**Answer: A. To make the before and after results more meaningful.**

## Short-answer questions

### 16. What are style recalculation, layout, paint, and compositing?

**Answer:** Style recalculation determines which CSS applies. Layout calculates sizes and positions. Paint draws visual details. Compositing combines rendered layers for display.

### 17. Why is “this stylesheet has many lines” not enough evidence that CSS is a performance problem?

**Answer:** Source length alone does not show transfer size, parsing cost, render delay, or repeated work. Measure the delivered CSS and the browser activity that corresponds to the actual symptom.

### 18. How can a `media` attribute on a stylesheet link help?

**Answer:** It identifies CSS intended for a particular media condition, such as print. Rules that do not match the current screen may not block that screen's initial render, though the resource may still be downloaded.

### 19. What are two tradeoffs of critical CSS inlining?

**Answer:** It can remove a stylesheet request from the initial render path, but it can duplicate bytes in HTML and make the inline and external styles harder to keep synchronized.

### 20. Why should CSS splitting be based on measurements and site structure?

**Answer:** Separate files can reduce the CSS needed on a route, but they can also add requests, dependency chains, and coordination overhead. The result depends on how the site is delivered and cached.

### 21. Why is `will-change` not a default optimization?

**Answer:** It can cause the browser to prepare resources or layers that consume memory. A hint should address a measured issue, not an imagined one.

### 22. What should you verify after changing animation properties for performance?

**Answer:** Compare a performance recording under the same conditions, then check visual quality, interaction, reduced motion, and the affected viewport sizes.

## Applied troubleshooting questions

### 23. A scroll interaction feels slow while a large panel animates its height. What should you investigate?

**Answer:** Record the interaction and check whether repeated layout and paint are occurring. Test a smaller effect or a transform-based movement when it matches the design, then compare traces and recheck the visual result.

### 24. A coverage tool marks a component stylesheet as unused. Can you delete it immediately?

**Answer:** No. Record the relevant route and state, then check other routes, responsive conditions, interaction states, and print behavior before removing it.

### 25. A performance audit reports a render-blocking stylesheet. What should you inspect first?

**Answer:** Confirm whether the stylesheet contains styles needed for the initial view, inspect its request timing and size, and check whether unused styles, an import chain, or delivery delays can be reduced without making the page render unstyled.

### 26. You add `will-change: transform` to every card and performance gets worse. Why might that happen?

**Answer:** Preparing many elements can consume memory and other rendering resources. Remove the blanket hint and profile a focused change only on the element with a measured problem.

### 27. The page loads more slowly after splitting one stylesheet into many files. What should you compare?

**Answer:** Compare request count, discovery timing, cache behavior, total transferred bytes, and the critical styles needed for first render. Combine or reorganize files when the split creates costly request chains without a measured benefit.

### 28. A transform-based animation still stutters on a low-powered device. What should you do?

**Answer:** Profile that device and effect. Check element size, other simultaneous work, paint effects, and frame timing. Simplify or remove nonessential motion if the measured experience remains poor.

## Practice task

### 29. What should you write down after a performance investigation?

**Answer:** Record the symptom, browser and device, viewport, action, trace or network evidence, one change made, the before and after result under the same conditions, and any visual or interaction regression checks.

**Explanation:** This makes the optimization reproducible and shows whether the change helped the user's experience.

## Chapter navigation

| Previous chapter | Lesson | Example | Next chapter |
| :--- | :--- | :--- | :--- |
| [66 - Prefixes, fallbacks, and feature detection](../lessons/66-prefixes-fallbacks-and-feature-detection.md) | [Lesson](../lessons/67-css-performance.md) | [Example](../examples/67-css-performance.md) | [68 - Practical page projects](../lessons/68-practical-page-projects.md) |