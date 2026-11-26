# 59 - Responsive typography and fluid sizing - Q&A

Review relative units, fluid sizing functions, line length, and container-relative sizing. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is rem relative to?

- A. The current element's width
- B. The computed font size of the root element
- C. The viewport height
- D. The width of the zero glyph

**Answer: B. The computed font size of the root element.**

**Explanation:** rem provides a shared root-based scale. If the root font size changes, rem-based lengths can scale with it.

### 2. When em is used for the font-size property, what is it relative to?

- A. The viewport width
- B. The parent's computed font size
- C. The root line height
- D. The width of the zero glyph

**Answer: B. The parent's computed font size.**

**Explanation:** For font-size, em is based on the parent. For many other properties, em is based on the current element's computed font size.

### 3. What does the ch unit approximately represent?

- A. The advance measure of the zero glyph in the element's font
- B. The height of a capital letter
- C. Exactly one character in every font
- D. The root font size

**Answer: A. The advance measure of the zero glyph in the element's font.**

**Explanation:** ch can help estimate a line measure, but it is not an exact count of letters or words.

### 4. What does clamp(minimum, preferred, maximum) do?

- A. Chooses the preferred value within the minimum and maximum bounds
- B. Adds all three values together
- C. Applies the maximum value only
- D. Scales the element by its parent

**Answer: A. Chooses the preferred value within the minimum and maximum bounds.**

**Explanation:** The preferred value can change fluidly, while the lower and upper values limit it.

### 5. What happens if the minimum and maximum passed to clamp() conflict?

- A. The declaration becomes invalid
- B. The minimum wins
- C. The maximum always wins
- D. The browser averages them

**Answer: B. The minimum wins.**

**Explanation:** CSS comparison functions give the minimum precedence if the bounds are in the wrong order. Choose and test sensible limits.

### 6. What is one risk of setting font-size with vw alone?

- A. The size can become too small or too large as the viewport changes
- B. The text automatically becomes bold
- C. It stops inheriting color
- D. It cannot be used in a media query

**Answer: A. The size can become too small or too large as the viewport changes.**

**Explanation:** Viewport units are tied to the viewport. Combine them with relative values and clear bounds for text.

### 7. What does max() do when used to compare lengths?

- A. Returns the larger value
- B. Returns the smaller value
- C. Always returns the first value
- D. Converts the values to rem

**Answer: A. Returns the larger value.**

**Explanation:** max() is useful for enforcing a minimum, such as keeping font size at or above a chosen floor.

### 8. What does min() do when used to compare lengths?

- A. Returns the larger value
- B. Returns the smaller value
- C. Converts all values to percentages
- D. Removes the smallest value

**Answer: B. Returns the smaller value.**

**Explanation:** min() can cap a size, such as limiting the width of a page shell.

### 9. Why is a unitless line-height useful for scalable type?

- A. It is inherited as a multiplier and scales with each element's font size
- B. It creates a fixed line box in pixels
- C. It prevents text wrapping
- D. It only works on headings

**Answer: A. It is inherited as a multiplier and scales with each element's font size.**

**Explanation:** A unitless value such as 1.5 is multiplied by each element's own font size, including descendants with larger text.

### 10. What is a risk of inheriting a length-valued line-height?

- A. A child with larger text may inherit a line box that is too small
- B. It makes every child invisible
- C. It changes the font family
- D. It prevents the parent from having padding

**Answer: A. A child with larger text may inherit a line box that is too small.**

**Explanation:** A length can be computed on the parent and inherited as a length. It does not automatically scale with a larger child font.

### 11. What does 1cqi represent?

- A. One percent of the relevant query container's inline size
- B. One percent of the viewport height
- C. One percent of the root font size
- D. One character in the current font

**Answer: A. One percent of the relevant query container's inline size.**

**Explanation:** Container query units allow a component's size to respond to its query container rather than the overall viewport.

### 12. What is needed for a component to use cqi relative to its own wrapper?

- A. An eligible query container ancestor
- B. An HTML ID matching the unit
- C. A fixed viewport width
- D. A JavaScript resize listener

**Answer: A. An eligible query container ancestor.**

**Explanation:** Set an appropriate container type on a wrapper. Then its descendants can resolve cqi against that container.

### 13. What is a good use for max-inline-size: 68ch on an article?

- A. Limiting the approximate measure of long text lines
- B. Setting the article to exactly 68 characters
- C. Limiting the font size to 68 pixels
- D. Preventing the article from wrapping

**Answer: A. Limiting the approximate measure of long text lines.**

**Explanation:** ch is based on the zero glyph's advance width, so it is a useful estimate rather than a precise character count.

### 14. Which approach is usually appropriate when a layout should switch from one column to two?

- A. A media or container query at a suitable size
- B. Increasing every font size with vw
- C. Adding more em units
- D. Setting a fixed height

**Answer: A. A media or container query at a suitable size.**

**Explanation:** Fluid formulas are useful for gradual changes. Queries handle distinct composition changes.

### 15. Which declaration provides a simple fixed fallback before a fluid value?

- A. font-size: 2rem; followed by font-size: clamp(...)
- B. font-size: none; followed by font-size: unset
- C. font-size: cqi; followed by font-size: auto
- D. font-size: inherit; followed by font-size: initial

**Answer: A. font-size: 2rem; followed by font-size: clamp(...).**

**Explanation:** A browser that does not understand clamp() can keep the earlier valid declaration.

### 16. Which statement about user zoom and larger text is best?

- A. Fluid sizing removes the need to test zoom
- B. A layout should be checked with zoom and larger text for clipping and overlap
- C. Relative units prevent every overflow
- D. Zoom matters only to fixed-width layouts

**Answer: B. A layout should be checked with zoom and larger text for clipping and overlap.**

**Explanation:** Relative units help a design respond, but fixed heights and narrow components can still break when text grows.

## Short-answer questions

### 17. Explain the difference between rem and em.

**Answer:** rem is based on the root element's computed font size. em is based on the parent's font size when used in font-size, and commonly on the current element's font size for other properties.

**Explanation:** Use rem for a shared type scale and em when component spacing should grow with that component's text.

### 18. Why should nested em font sizes be used carefully?

**Answer:** Each nested font-size can be calculated from the parent, so repeated scaling can compound.

**Explanation:** A chain of values larger than 1em can grow more than expected. A root-based rem value may be clearer for a shared scale.

### 19. What are the three roles of the arguments to clamp()?

**Answer:** The first is the minimum, the second is the preferred value, and the third is the maximum.

**Explanation:** The preferred value may change with a viewport or container, but the output stays within the bounds.

### 20. Why combine rem with a viewport unit in a fluid font-size?

**Answer:** The rem part responds to root text sizing, while the viewport part adds fluid change as the viewport grows.

**Explanation:** This is generally more adaptable than a font size based only on vw, though it still needs limits and testing.

### 21. When is a fluid sizing formula preferable to a breakpoint?

**Answer:** Use a fluid formula when a value should change gradually over a range.

**Explanation:** If the layout composition needs a distinct switch, use a media or container query instead.

### 22. What does a unitless line-height inherit?

**Answer:** It inherits the unitless multiplier, which is applied to each element's own font size.

**Explanation:** This lets a descendant with larger text have a correspondingly larger line box.

### 23. What does ch estimate, and why is it not an exact character count?

**Answer:** It estimates the advance measure of the zero glyph in the current font.

**Explanation:** Other glyphs have different widths, and fonts vary. A value such as 65ch creates a useful approximate reading measure, not a guaranteed number of characters.

### 24. What is the difference between vw and cqi?

**Answer:** vw is based on the viewport width; cqi is based on an eligible query container's inline size.

**Explanation:** Use viewport units for viewport-driven scaling and container units for a component that must adapt to the space where it is placed.

### 25. Why should a root font size generally not be forced to a fixed pixel value?

**Answer:** A fixed root size can work against browser or user default text-size preferences.

**Explanation:** Root-relative units are useful when they remain relative to the computed root size.

### 26. Name three checks for a responsive type system.

**Answer:** Check narrow and wide viewports, browser zoom or larger text, and long or translated content.

**Explanation:** These reveal clipping, awkward wrapping, overly long line lengths, and control layouts that fluid calculations alone may not catch.

## Applied questions

### 27. Create a heading that grows between 2rem and 4rem using a viewport-based preferred value.

**Answer:**

~~~
h1 {
    font-size: clamp(2rem, calc(1.3rem + 3vw), 4rem);
}
~~~

**Explanation:** The middle calculation changes with viewport width, while the first and third values bound the result.

### 28. A title should be 16px at 320px viewport width and 24px at 1120px. Assuming a 16px root font size, write a preferred formula and clamp it to those sizes.

**Answer:**

~~~
.title {
    font-size: clamp(1rem, calc(0.8rem + 1vw), 1.5rem);
}
~~~

**Explanation:** The preferred value is 12.8px plus one percent of the viewport width. It reaches 16px at 320px and 24px at 1120px when the root size is 16px.

### 29. Make a page shell use the available width minus side gutters, but never exceed 72rem.

**Answer:**

~~~
.page-shell {
    width: min(100% - 2rem, 72rem);
    margin-inline: auto;
}
~~~

**Explanation:** min() selects the smaller width. The percentage-based value keeps side gutters, and 72rem caps the wide layout.

### 30. Keep body text at least 1rem while allowing a small amount of viewport-based growth.

**Answer:**

~~~
body {
    font-size: max(1rem, calc(0.95rem + 0.2vw));
}
~~~

**Explanation:** max() picks whichever value is larger, so the result cannot fall below 1rem.

### 31. Give article paragraphs an approximate maximum line measure of 68 zero-glyph widths.

**Answer:**

~~~
.article-body {
    max-inline-size: 68ch;
}
~~~

**Explanation:** This estimates a readable text measure based on the chosen font. It does not promise exactly 68 characters per line.

### 32. Set a wrapper as an inline-size query container and let its heading grow with the available component width.

**Answer:**

~~~
.card {
    container-type: inline-size;
}

.card h2 {
    font-size: clamp(1.1rem, calc(1rem + 1.2cqi), 1.6rem);
}
~~~

**Explanation:** The heading is inside the container, so cqi can respond to the card's inline size. The clamp bounds prevent the size from becoming too small or too large.

### 33. Add a fluid amount of horizontal padding with a one-rem minimum and three-rem maximum.

**Answer:**

~~~
.article {
    padding-inline: clamp(1rem, 4vw, 3rem);
}
~~~

**Explanation:** The preferred padding grows with the viewport but stays within the chosen limits.

### 34. Make a title's line-height 1.1 times its own font size.

**Answer:**

~~~
h1 {
    line-height: 1.1;
}
~~~

**Explanation:** A unitless value is inherited as a multiplier, so it scales with the title's font size.

### 35. A paragraph clips after browser zoom increases. Name two layout changes that can help.

**Answer:** Remove fixed heights around the text and allow the containing layout to grow or wrap. Also check widths, overflow rules, and line length.

**Explanation:** Zoom and larger text increase the space content needs. A fixed-size box or hidden overflow can conceal it.

### 36. A card title uses cqi but scales according to the viewport rather than the card. What should you check?

**Answer:** Check that an eligible query container is an ancestor of the title and that the title is inside the intended container.

**Explanation:** Container units resolve against the nearest eligible query container on the relevant axis. Without one, the unit can fall back to viewport-based sizing.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [58 - Styling view transitions](../lessons/58-view-transitions.md) | [Q&A](59-responsive-typography-and-fluid-sizing.md) | [Example](../examples/59-responsive-typography-and-fluid-sizing.md) | [60 - CSS architecture and naming conventions](../lessons/60-css-architecture-and-naming.md) |