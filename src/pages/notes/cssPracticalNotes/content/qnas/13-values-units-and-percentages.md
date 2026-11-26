# 13 - Values, Units, and Percentages: Questions and Answers

Use these questions to practise recognizing CSS value types, choosing units, resolving percentage references, and calculating simple conversions. Each answer follows its question.

## Multiple-choice questions

### 1. Which item is a CSS dimension?

- A. 1.5
- B. 24px
- C. 80%
- D. auto

**Answer: B.** A dimension has a number followed immediately by a unit. 24px is a length dimension.

### 2. If the root font size is 16px, how long is 1.5rem?

- A. 10.5px
- B. 16px
- C. 24px
- D. 32px

**Answer: C.** rem is relative to the root font size, so 1.5 times 16px is 24px.

### 3. Which spelling is a valid length dimension?

- A. 12 px
- B. 12px
- C. px12
- D. 12

**Answer: B.** The number and unit must be adjacent. A nonzero length such as 12 needs a unit.

### 4. How many CSS pixels are in one CSS inch?

- A. 72px
- B. 90px
- C. 96px
- D. 120px

**Answer: C.** CSS defines 1in as 96px.

### 5. What does the ch unit approximate?

- A. The width of every character in a line
- B. The advance width of the font's zero glyph
- C. The height of a capital letter
- D. One percent of the viewport width

**Answer: B.** ch is based on the advance measure of the zero glyph. It is not an exact character counter.

### 6. What does rem refer to?

- A. The current element's padding
- B. The root element's font size
- C. The containing block's width
- D. The viewport's height

**Answer: B.** rem is relative to the root element's computed font size.

### 7. For an element's padding, what does 1em generally refer to?

- A. The element's computed font size
- B. The root element's font size
- C. The viewport height
- D. The parent's width

**Answer: A.** For properties other than font-size itself, em is based on the element's computed font size.

### 8. A width of 50% is generally based on which measurement?

- A. The root font size
- B. The containing block's width
- C. The viewport height
- D. The font's zero glyph

**Answer: B.** The width property's percentage is generally relative to its containing block's width.

### 9. A font-size of 120% is based on which measurement?

- A. The parent's font size
- B. The parent's width
- C. The viewport width
- D. 16px in every case

**Answer: A.** A font-size percentage is relative to the parent's computed font size.

### 10. What does 1vw represent?

- A. One percent of the viewport width
- B. One percent of the viewport height
- C. One percent of the root font size
- D. One CSS inch

**Answer: A.** vw is one percent of the viewport width.

### 11. Which statement describes 100svh?

- A. It is always 100 CSS pixels
- B. It is based on the small viewport height
- C. It is based on the root font size
- D. It is a grid fraction

**Answer: B.** Small viewport units use the viewport size with expandable browser interface controls shown.

### 12. Which property commonly accepts a unitless multiplier?

- A. width
- B. line-height
- C. margin
- D. border-width

**Answer: B.** line-height accepts a unitless number, such as 1.5, which acts as a multiplier.

### 13. How many milliseconds are in one second?

- A. 10
- B. 100
- C. 1000
- D. 10,000

**Answer: C.** There are 1000ms in 1s.

### 14. Which value represents one quarter of a full rotation?

- A. 0.25turn
- B. 0.25px
- C. 25ms
- D. 25fr

**Answer: A.** A full turn is 360 degrees, so 0.25turn is a quarter turn, or 90 degrees.

### 15. What is the fr unit used for?

- A. Font-relative spacing
- B. Grid track space distribution
- C. Viewport height
- D. Print measurements

**Answer: B.** fr distributes a share of available space among CSS Grid tracks. It is not a length unit.

### 16. Why does a CSS pixel not always equal one physical screen pixel?

- A. CSS pixels are reference units that can map to device pixels differently
- B. The px unit changes into rem on mobile
- C. Browsers ignore px on high-resolution displays
- D. A CSS pixel is always exactly one inch

**Answer: A.** A device can use multiple physical device pixels to represent one CSS reference pixel.

### 17. Which value is a percentage?

- A. 1.25
- B. 16rem
- C. 75%
- D. auto

**Answer: C.** A percentage is a number followed by the percent sign. Its reference depends on the property.

### 18. Which declaration uses a unitless number correctly?

- A. opacity: 0.5
- B. opacity: 0.5px
- C. opacity: 50px
- D. opacity: 0.5rem

**Answer: A.** opacity expects a number between its allowed bounds, not a length.

## Short-answer questions

### 19. What is the difference between a number and a dimension?

**Answer:** A number has no unit, such as 1.5. A dimension has a number followed immediately by a unit, such as 1.5rem or 200ms.

### 20. Do all CSS percentages refer to the parent's width?

**Answer:** No. Each property defines its own percentage reference. Width commonly refers to the containing block's width, while font-size refers to the parent's font size.

### 21. What happens if a nonzero length is written without a unit?

**Answer:** The declaration is generally invalid for that property and is ignored.

**Example:** margin: 12 is invalid as a length. Write margin: 12px or margin: 0.75rem.

### 22. Why can em values compound in nested font-size declarations?

**Answer:** The em unit in font-size is relative to the parent's computed font size. Nested em font sizes therefore apply successive multipliers.

### 23. When is rem useful?

**Answer:** rem is useful for values that should share a consistent scale based on the root font size, such as text sizes and spacing.

### 24. Is ch an exact number of characters?

**Answer:** No. It is based on the advance width of the font's zero glyph. Other characters may be wider or narrower.

### 25. What is the difference between vw and vh?

**Answer:** vw is one percent of the viewport width. vh is one percent of the viewport height.

### 26. What is the purpose of small, large, and dynamic viewport units?

**Answer:** They represent viewport measurements with different assumptions about browser interface controls. Small units use the smaller viewport, large units use the larger viewport, and dynamic units track changes in the visible viewport.

### 27. Why is unitless line-height often useful for body text?

**Answer:** It remains a multiplier, so each child text size gets line spacing proportional to its own font size.

### 28. Why can percentage line-height behave differently when inherited?

**Answer:** The percentage is resolved against the element's font size and computes to a length. A child inherits that length rather than the original percentage multiplier.

### 29. What does the fr unit measure?

**Answer:** It represents a fraction of available space distributed among grid tracks. It is not a fixed length.

### 30. How does calc() combine percentages and lengths?

**Answer:** When a property accepts a compatible length or percentage, calc() can combine them. For example, calc(100% - 2rem) subtracts root-relative spacing from the percentage-based length.

## Unit calculations

### 31. A containing block is 800px wide. What is 50% of its width?

**Answer: 400px.** The width percentage uses the containing block's width as its reference.

### 32. The parent font size is 18px. What is 120% of it?

**Answer: 21.6px.** Multiply 18px by 1.2.

### 33. The root font size is 16px. What is 2rem?

**Answer: 32px.** Two times 16px equals 32px.

### 34. An element's font size is 18px. What is 1.5em when used for its padding?

**Answer: 27px.** For padding, em is based on the element's computed font size, so 1.5 times 18px equals 27px.

### 35. Convert 36pt to CSS pixels.

**Answer: 48px.** One point is 1/72 of an inch, and one inch is 96px. Therefore 36pt equals half an inch, or 48px.

### 36. Convert 250ms to seconds.

**Answer: 0.25s.** Divide 250 by 1000 because 1000ms equals one second.

### 37. Convert 0.25turn to degrees.

**Answer: 90deg.** One turn is 360 degrees, and one quarter of 360 is 90.

### 38. A viewport is 1400px wide. What is 1vw?

**Answer: 14px.** vw is one percent of viewport width, and one percent of 1400px is 14px.

### 39. An element has font-size: 20px and line-height: 150%. What length does that percentage produce on the element?

**Answer: 30px.** 150% of 20px is 30px. If a child inherits this computed line-height, it inherits the 30px length.

### 40. A child has font-size: 12px and inherits line-height: 1.5 as a unitless value. What line height does the multiplier produce for the child?

**Answer: 18px.** The inherited unitless multiplier is applied to the child's own font size: 1.5 times 12px.

## Code and value analysis

### 41. What width does the child get if its containing block is 640px wide?

~~~css
.child {
  width: 75%;
}
~~~

**Answer: 480px.** 75% of the containing block's 640px width is 480px.

### 42. The parent is 600px wide and the root font size is 16px. What is this width?

~~~css
.content {
  width: calc(100% - 2rem);
}
~~~

**Answer: 568px.** 2rem is 32px. Subtract 32px from 600px to get 568px.

### 43. The parent font size is 16px. What font size does this child receive?

~~~css
.child {
  font-size: 1.25em;
}
~~~

**Answer: 20px.** In the font-size property, em is relative to the parent's computed font size. 1.25 times 16px is 20px.

### 44. What happens to this declaration?

~~~css
.card {
  margin: 12;
}
~~~

**Answer:** The declaration is invalid because 12 is a nonzero number without a length unit. The browser ignores that declaration.

### 45. Is this a valid way to remove a margin?

~~~css
.card {
  margin: 0;
}
~~~

**Answer: Yes.** Zero length values can generally omit the unit where that property accepts a length.

### 46. Which line-height is more likely to keep proportional spacing for children with different font sizes?

- **A.** line-height: 150%
- **B.** line-height: 1.5

**Answer: B.** The unitless value is inherited as a multiplier and scales with each child's font size. The percentage computes to a length on the element where it is declared.

### 47. A designer wants a paragraph to have an approximate width of 68 zero-glyph advances. Which unit could help?

**Answer:** ch, for example max-width: 68ch.

**Explanation:** ch is based on the advance width of the font's zero glyph. It approximates a character-based line length, but is not an exact count of visible characters.

### 48. Why might 100vh not fit the currently visible area of a mobile browser in every state?

**Answer:** The viewport height can be affected by browser interface controls. Small, large, and dynamic viewport units provide alternatives for different sizing behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [12 - Cascade layers](../qnas/12-cascade-layers.md) | [Lesson](../lessons/13-values-units-and-percentages.md) | [Example](../examples/13-values-units-and-percentages.md) | [14 - Colors and color functions](14-colors-and-color-functions.md) |