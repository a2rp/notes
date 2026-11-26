# 30 - Responsive Design and Media Queries: Questions and Answers

Use these questions to review responsive layout foundations, media query syntax, breakpoints, viewport behavior, printing, interaction features, and user preferences. Each answer follows its question.

## Multiple-choice questions

### 1. What does a media query do?

- A. It changes the HTML source order.
- B. It conditionally applies CSS when a media condition matches.
- C. It creates a new grid container.
- D. It replaces the CSS cascade.

**Answer: B. It conditionally applies CSS when a media condition matches.**

**Explanation:** The styles inside a matching media query participate in the normal cascade.

### 2. What does `(min-width: 48rem)` test?

- A. Whether the physical device is 48rem wide.
- B. Whether the viewport is at least 48rem wide.
- C. Whether the browser window is exactly 48rem wide.
- D. Whether the page has 48rem of content.

**Answer: B. Whether the viewport is at least 48rem wide.**

**Explanation:** The `width` feature describes the viewport width for continuous screen output.

### 3. What does a comma between media queries mean?

- A. Both queries must match.
- B. Either query can match.
- C. The queries are evaluated in source order.
- D. The second query is negated.

**Answer: B. Either query can match.**

**Explanation:** A comma-separated media query list is true if any one of its component queries is true.

### 4. Which operator requires all joined conditions to match?

- A. `and`
- B. A comma
- C. `or`
- D. `then`

**Answer: A. `and`.**

**Explanation:** The comma represents OR. The keyword `and` joins conditions that must all be true.

### 5. Which HTML declaration helps a mobile browser use the device viewport for layout?

- A. `<meta name="viewport" content="width=device-width, initial-scale=1">`
- B. `<meta name="device" content="mobile">`
- C. `<meta name="width" content="100%">`
- D. `<meta name="screen" content="responsive">`

**Answer: A.**

**Explanation:** The viewport declaration prevents a mobile page from being laid out against an artificially wide virtual viewport and then scaled down.

### 6. Which stylesheet is intended for print output?

- A. `@media screen`
- B. `@media print`
- C. `@media paper`
- D. `@media page`

**Answer: B. `@media print`.**

**Explanation:** A print query can remove screen-only controls and adjust colors or layout for printed pages.

### 7. Which feature detects whether the primary pointing mechanism can hover?

- A. `pointer`
- B. `hover`
- C. `orientation`
- D. `resolution`

**Answer: B. `hover`.**

**Explanation:** The `hover` feature describes the primary pointing mechanism's ability to hover. It should be used for enhancements, not essential functionality.

### 8. Which feature describes the accuracy of the primary pointing mechanism?

- A. `pointer`
- B. `hover`
- C. `width`
- D. `aspect-ratio`

**Answer: A. `pointer`.**

**Explanation:** Values such as `coarse` and `fine` describe the precision of the primary pointer.

### 9. Which media feature can respond to a request for less non-essential motion?

- A. `prefers-color-scheme`
- B. `prefers-reduced-motion`
- C. `forced-colors`
- D. `orientation`

**Answer: B. `prefers-reduced-motion`.**

**Explanation:** Use it to adjust non-essential animation or smooth movement while keeping information and controls available.

### 10. Where should a responsive breakpoint usually be placed?

- A. At a standard width for every phone.
- B. Where the content needs a different layout.
- C. At the width of a developer's monitor.
- D. Only at 768px and 1024px.

**Answer: B. Where the content needs a different layout.**

**Explanation:** Breakpoints are design decisions based on content fit, not a device catalog.

## True or false

### 11. Responsive design requires a media query for every screen size.

**Answer: False.**

**Explanation:** Flexible widths, wrapping layouts, and intrinsic Grid sizing can adapt continuously. Add a query when the design needs a specific change.

### 12. A media query increases the specificity of selectors inside it.

**Answer: False.**

**Explanation:** The declarations still use the normal selector specificity. The query only determines whether they apply.

### 13. `(width: 48rem)` matches every viewport at least 48rem wide.

**Answer: False.**

**Explanation:** It matches an exact width. Use `(min-width: 48rem)` or the range condition `(width >= 48rem)` for a minimum.

### 14. The `orientation: landscape` feature describes the shape of the viewport.

**Answer: True.**

**Explanation:** It is based on the viewport's width and height, not a device's model or whether the reader has physically rotated it.

### 15. A control may be hidden unless `hover` matches.

**Answer: False.**

**Explanation:** Touch and keyboard users may not use hover. Keep essential content and actions available in the base style.

### 16. A comma-separated query list is true if any of its queries match.

**Answer: True.**

**Explanation:** Commas represent OR between component queries.

### 17. A breakpoint pair using `max-width: 48rem` and `min-width: 48rem` can both match exactly at 48rem.

**Answer: True.**

**Explanation:** Both bounds are inclusive. A base layout plus one minimum-width query often avoids needing adjacent pairs.

### 18. The `device-width` feature is usually a better responsive target than `width`.

**Answer: False.**

**Explanation:** `width` checks the space available to the page. The physical device size does not tell you how much room the browser has.

## Short-answer questions

### 19. What is a breakpoint?

**Answer:** A breakpoint is a point where a layout or component needs a different arrangement.

**Explanation:** Choose it when the content starts to feel crowded or needs another column, not because a particular product is expected.

### 20. What does mobile-first CSS mean?

**Answer:** The base styles provide a usable narrow layout, and minimum-width queries add wider arrangements.

**Explanation:** The browser applies the base styles before any query matches. Wider query rules build on that foundation.

### 21. Why include a viewport meta declaration?

**Answer:** It tells mobile browsers to lay out the page using the device viewport and a normal initial scale.

**Explanation:** Without it, a mobile browser may use a wide virtual layout viewport and shrink the page to fit.

### 22. What is the difference between `and` and a comma in a media query?

**Answer:** `and` requires all joined conditions to match. A comma lets any one of the listed queries match.

**Explanation:** For example, `screen and (min-width: 48rem)` requires both screen output and the width condition.

### 23. Why should a breakpoint respond to content rather than a named device?

**Answer:** Viewport sizes vary, and the same device can show different available space because of windows, zoom, or settings.

**Explanation:** A content-based breakpoint keeps the layout useful across devices and in resized desktop windows.

### 24. What is a fluid layout?

**Answer:** A fluid layout uses flexible sizing so content can adapt continuously to the available space.

**Explanation:** Percentage sizes, flexible Grid tracks, wrapping, and functions such as `min()`, `max()`, and `clamp()` can reduce the number of required breakpoints.

### 25. Why should hover effects be optional?

**Answer:** A touchscreen may not provide hover, and keyboard users interact in a different way.

**Explanation:** Essential content, links, and controls should be visible or reachable without hovering.

### 26. What should a reduced-motion rule preserve?

**Answer:** It should preserve the information and operation of the interface while reducing non-essential movement.

**Explanation:** Adapt animations or smooth scrolling that could be uncomfortable. Do not make motion the only way to understand content.

### 27. What kinds of changes can a print query make?

**Answer:** It can hide screen-only controls and adjust layout, text color, and backgrounds for paper.

**Explanation:** Keep the article and important instructions. Hide only elements that are not useful on paper.

### 28. What is one benefit of using `max-inline-size: 100%` on an image?

**Answer:** It keeps the image from exceeding the inline size of its container.

**Explanation:** Pair it with `block-size: auto` to preserve the image's aspect ratio.

### 29. Why can a page still overflow even when its main container is responsive?

**Answer:** A child element may still have a fixed width or unbreakable content wider than the container.

**Explanation:** Check images, tables, long strings, grid minimum sizes, margins, and padding.

### 30. What does `forced-colors: active` indicate?

**Answer:** It indicates that the user agent is using a forced color palette.

**Explanation:** Native controls, system colors, and meaningful borders help the interface remain understandable in that mode.

## Read the code

### 31. When does this rule apply?

~~~css
@media (min-width: 48rem) {
  .layout {
    grid-template-columns: 14rem 1fr;
  }
}
~~~

**Answer:** It applies when the viewport is 48rem wide or wider.

**Explanation:** The query does not apply at narrower widths, so the base layout should remain usable there.

### 32. What does this query mean?

~~~css
@media screen and (min-width: 48rem) and (orientation: landscape) {
  .layout {
    grid-template-columns: 14rem 1fr;
  }
}
~~~

**Answer:** All three conditions must match: screen output, a viewport at least 48rem wide, and landscape viewport orientation.

**Explanation:** The `and` keywords combine conditions.

### 33. What does this query list mean?

~~~css
@media print, (min-width: 80rem) {
  .page {
    max-width: none;
  }
}
~~~

**Answer:** The style applies in print or when the viewport is at least 80rem wide.

**Explanation:** The comma means either component query can make the list match.

### 34. What can happen at exactly 48rem?

~~~css
@media (max-width: 48rem) {
  .layout {
    display: block;
  }
}

@media (min-width: 48rem) {
  .layout {
    display: grid;
  }
}
~~~

**Answer:** Both queries match at exactly 48rem, and the later declaration wins when the selectors have equal specificity.

**Explanation:** Inclusive maximum and minimum bounds overlap at their shared value. A single base rule plus a minimum-width query can avoid this pattern.

### 35. Why does this rule avoid a fixed device assumption?

~~~css
@media (min-width: 48rem) {
  .navigation {
    justify-content: space-between;
  }
}
~~~

**Answer:** It checks the viewport space available to the page rather than a physical device size.

**Explanation:** A window can be resized on a large monitor, and a device can be zoomed. The viewport is the relevant layout space.

### 36. What remains usable when the pointer cannot hover?

~~~css
.card-link {
  text-decoration: underline;
}

@media (hover: hover) and (pointer: fine) {
  .card-link:hover {
    text-decoration-thickness: 0.15em;
  }
}
~~~

**Answer:** The underlined link remains usable; only the decoration enhancement depends on hover and a fine pointer.

**Explanation:** The base style keeps link affordance visible for touch and keyboard users.

### 37. What does this reduced-motion query change?

~~~css
@media (prefers-reduced-motion: reduce) {
  .banner {
    animation: none;
  }
}
~~~

**Answer:** It removes the banner animation when the reader requests less motion.

**Explanation:** The banner's text and purpose should remain available without the animation.

### 38. What is wrong with this responsive image rule?

~~~css
.image {
  width: 800px;
}
~~~

**Answer:** It can exceed a narrow containing block and cause horizontal overflow.

**Explanation:** A common responsive rule is `max-inline-size: 100%; block-size: auto`.

## Practical and scenario questions

### 39. A product grid is cramped until it reaches a certain width. What should guide the breakpoint value?

**Answer:** The width at which the cards can fit their intended content and spacing.

**Explanation:** Try resizing gradually. The best value depends on the card content and layout, not a device label.

### 40. A navigation menu wraps into two rows at narrow widths. How can a wide layout use one row?

**Answer:**

~~~css
.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (min-width: 52rem) {
  .navigation {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
~~~

**Explanation:** The narrow base layout can wrap. The wider arrangement applies when the viewport has enough room.

### 41. A screen-only menu appears in printed pages. What rule could hide it?

**Answer:**

~~~css
@media print {
  .site-navigation {
    display: none;
  }
}
~~~

**Explanation:** Hide navigation only if it does not contain information needed in the printed document.

### 42. A site changes to dark colors under a reader preference. What should be reviewed besides the page background?

**Answer:** Text, borders, form controls, focus indicators, icons, and images.

**Explanation:** Changing only the background can leave some elements with poor contrast or invisible outlines.

## Layout challenge

### 43. Write a mobile-first card layout that uses one column by default, two columns when there is room, and three columns on a wide viewport.

**Answer:**

~~~css
.card-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

@media (min-width: 42rem) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 68rem) {
  .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
~~~

**Explanation:** The base rule handles narrow viewports. Each minimum-width query adds columns when the content can use the extra space. The values are example breakpoints and should be adjusted to the actual cards.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [29 - Multi-column Layout](../lessons/29-multi-column-layout.md) | [Q&A](30-responsive-design-and-media-queries.md) | [Example](../examples/30-responsive-design-and-media-queries.md) | [31 - Container Queries](../lessons/31-container-queries.md) |
