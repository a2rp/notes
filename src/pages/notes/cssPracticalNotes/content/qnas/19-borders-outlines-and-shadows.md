# 19 - Borders, Outlines, and Shadows: Questions and Answers

## Multiple-choice questions

### 1. Which set of properties defines a normal CSS border?

- **A.** Size, opacity, and position
- **B.** Width, style, and color
- **C.** Blur, spread, and color
- **D.** Margin, padding, and display

**Answer: B.** A border is described by its width, style, and color. The style determines whether and how its line is drawn.

### 2. Which declaration draws a visible 2px blue border?

- **A.** `border: 2px blue`
- **B.** `border: 2px solid blue`
- **C.** `border: blue`
- **D.** `border-width: 2px; border-color: blue`

**Answer: B.** The shorthand needs a visible border style. In option D the style remains its initial value, `none`, so the border is not drawn.

### 3. What is the default border color when one is not specified?

- **A.** Always black
- **B.** Transparent
- **C.** `currentColor`
- **D.** The parent's background color

**Answer: C.** `currentColor` resolves to the element's `color`, so a border can match its text color.

### 4. What does this declaration set?

~~~css
border: 1px solid #334155;
~~~

- **A.** Only the top border
- **B.** All four border sides
- **C.** The outline and shadow
- **D.** The margin and padding

**Answer: B.** The `border` shorthand applies width, style, and color to all four physical sides.

### 5. Which `border-radius` order is used with four values?

- **A.** top, right, bottom, left
- **B.** top-left, top-right, bottom-right, bottom-left
- **C.** top-left, bottom-left, top-right, bottom-right
- **D.** left, top, right, bottom

**Answer: B.** Four corner radii are assigned clockwise, starting at the top-left corner.

### 6. Which statement about outlines is correct?

- **A.** An outline always increases the element's layout width.
- **B.** An outline reserves space outside the margin.
- **C.** An outline does not take up layout space.
- **D.** An outline is another name for `border`.

**Answer: C.** Outlines are painted around a box without changing its layout dimensions, so they can overlap nearby content.

### 7. Which property moves an outline away from the border edge?

- **A.** `border-spacing`
- **B.** `outline-offset`
- **C.** `box-shadow`
- **D.** `padding-offset`

**Answer: B.** `outline-offset` changes the outline's position and is separate from the `outline` shorthand.

### 8. What is the minimum number of lengths required for a `box-shadow`?

- **A.** One
- **B.** Two
- **C.** Three
- **D.** Four

**Answer: B.** Horizontal and vertical offsets are required. Blur and spread are optional.

### 9. What does a negative spread value do to a box shadow?

- **A.** Makes its blur negative
- **B.** Contracts the shadow shape
- **C.** Moves the element
- **D.** Removes the border

**Answer: B.** Spread changes the shadow's size. A negative spread contracts it; the blur radius itself cannot be negative.

### 10. How are multiple box shadows written?

- **A.** With spaces between them
- **B.** With semicolons inside one declaration
- **C.** As a comma-separated list
- **D.** In separate `box-shadow` properties on the same rule

**Answer: C.** Multiple shadows form a comma-separated list. The first listed shadow is painted above later listed shadows.

### 11. Which feature belongs to `text-shadow`?

- **A.** Spread radius
- **B.** `inset` keyword
- **C.** Horizontal and vertical offsets
- **D.** Border style

**Answer: C.** Text shadows use offsets, optional blur, and optional color. They do not have a spread radius or `inset`.

### 12. Which declaration is most appropriate for a keyboard focus indicator that should not move surrounding content?

- **A.** `border: 3px solid purple`
- **B.** `outline: 3px solid purple`
- **C.** `margin: 3px solid purple`
- **D.** `box-shadow: 3px solid purple`

**Answer: B.** An outline can mark focus without changing layout. Keep it clearly visible and avoid removing it without a suitable replacement.

### 13. What does `inset` do in a `box-shadow` declaration?

- **A.** Places the shadow inside the box
- **B.** Makes the shadow part of the margin
- **C.** Moves the shadow behind the page
- **D.** Increases the element's width

**Answer: A.** An inset shadow is painted inside the box rather than outside it.

### 14. Why can `border: 5px solid red` make a content-box element wider?

- **A.** Border width is added outside the declared content width under `content-box`.
- **B.** Red borders add extra pixels.
- **C.** Solid borders ignore box sizing.
- **D.** The browser adds margin automatically.

**Answer: A.** Under `content-box`, the declared width measures the content box, and border widths add to the outside size. With `border-box`, the border is included in the declared width.

### 15. Which property should be used when a divider should adapt to writing direction?

- **A.** `border-left`
- **B.** `border-inline-start`
- **C.** `border-width-left`
- **D.** `outline-inline`

**Answer: B.** `border-inline-start` follows the inline direction of the writing mode, while `border-left` always targets the physical left side.

## True or false

### 16. A nonzero border width alone guarantees a visible border.

**Answer: False.** The border style is initially `none`. A visible style such as `solid` must be set.

### 17. If a border color is omitted, it can follow the element's text color.

**Answer: True.** The border color defaults to `currentColor`.

### 18. Outlines reserve layout space in the same way as borders.

**Answer: False.** Outlines do not participate in box sizing and can overlap nearby content.

### 19. The `outline-offset` property is included in the `outline` shorthand.

**Answer: False.** The shorthand sets outline width, style, and color. Offset is configured separately.

### 20. A shadow pushes nearby elements away from the box.

**Answer: False.** Shadows are painted effects and do not reserve layout space. Use margin or padding to change layout spacing.

### 21. A shadow can be clipped by an ancestor with clipping or scrolling overflow.

**Answer: True.** The shadow can extend beyond its element, but ancestor clipping can cut off that painted area.

### 22. A later `border` shorthand can replace values set by earlier side-specific border declarations.

**Answer: True.** The shorthand sets all four sides. If it wins the cascade and comes later, it can reset earlier side values.

### 23. Text shadows support a spread radius.

**Answer: False.** Text shadows use offsets and optional blur and color, but have no spread component.

### 24. A rounded corner with percentage radii uses the border box dimensions as its reference.

**Answer: True.** Horizontal corner radii use the border box width, and vertical radii use its height.

### 25. It is safe to remove every focus outline because a border is present.

**Answer: False.** A border may not make the focused state clear. Keyboard users need a visible focus indicator, whether that is the browser outline or a suitable replacement.

## Short-answer questions

### 26. What are the three main parts of a border declaration?

**Answer:** Width, style, and color. Width controls thickness, style controls the line pattern, and color controls its color.

### 27. Why does `border-width: 4px` appear to do nothing?

**Answer:** The border style may still be `none`. Set a visible style such as `border-style: solid`.

### 28. What does `border: 2px solid` use as its color if no color is included?

**Answer:** It uses `currentColor`, which resolves from the element's `color` property.

### 29. How does a border differ from an outline?

**Answer:** A border is part of the box edge and can affect its dimensions. An outline is painted outside the border edge and does not take up layout space.

### 30. Why is an outline useful for keyboard focus?

**Answer:** It can show which control currently has focus without moving surrounding content. A clearly visible focus indicator helps keyboard users follow interaction.

### 31. What does `outline-offset: 4px` do?

**Answer:** It moves the outline outward from the border edge by 4px. Offset is separate from the `outline` shorthand.

### 32. Explain the parts of `box-shadow: 4px 8px 12px 2px #000`.

**Answer:** The shadow is offset 4px horizontally and 8px vertically, has a 12px blur radius, and a 2px spread. Its color is black. It is an outer shadow because `inset` is absent.

### 33. What is the difference between blur and spread in a box shadow?

**Answer:** Blur controls how soft the shadow edge appears. Spread changes the size of the shadow shape before its blur is painted.

### 34. Why should a shadow not be used to create spacing between cards?

**Answer:** A shadow does not alter layout. Use margin, padding, or a layout gap for actual spacing, and use a shadow only for visual depth.

### 35. How can you express elliptical rounded corners?

**Answer:** Put horizontal and vertical radii on either side of a slash, such as `border-radius: 24px / 12px`.

## Read the CSS

### 36. Will this rule draw a border?

~~~css
.card {
  border-width: 3px;
  border-color: teal;
}
~~~

**Answer: No.** The border style was not changed, so it remains `none`. Add `border-style: solid` or use `border: 3px solid teal`.

### 37. Which side has the blue 4px border?

~~~css
.notice {
  border: 1px solid gray;
  border-left: 4px solid blue;
}
~~~

**Answer:** The left border is 4px solid blue. The other three sides remain 1px solid gray because the side-specific declaration comes after the shorthand.

### 38. What are the final border values for this element?

~~~css
.card {
  border-left: 4px solid blue;
  border: 1px dashed gray;
}
~~~

**Answer:** All four sides have a 1px dashed gray border. The later shorthand resets the earlier left border values.

### 39. What happens to the neighboring layout when this outline appears?

~~~css
button:focus-visible {
  outline: 3px solid purple;
}
~~~

**Answer:** The button gets a visible purple outline, and neighboring layout does not move. The outline does not take up space.

### 40. How far is this outline from the border edge?

~~~css
a:focus-visible {
  outline: 2px solid navy;
  outline-offset: 5px;
}
~~~

**Answer:** It is offset outward by 5px. The outline width is 2px, and the offset is configured separately from the shorthand.

### 41. Is this shadow valid?

~~~css
.card {
  box-shadow: 4px 6px -3px #000;
}
~~~

**Answer: No.** The third length is the blur radius, which cannot be negative. A negative spread is allowed, but it must be the fourth length here, for example `4px 6px 8px -3px #000`.

### 42. Which shadow is painted on top?

~~~css
.card {
  box-shadow:
    0 2px 4px rgb(0 0 0 / 20%),
    0 10px 24px rgb(0 0 0 / 12%);
}
~~~

**Answer:** The first, smaller shadow is painted on top of the second shadow. The order of a comma-separated shadow list controls their painting order.

### 43. Does this declaration add layout space inside the field?

~~~css
input {
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 18%);
}
~~~

**Answer: No.** It paints an inner shadow but does not change the input's content, padding, border, or margin dimensions.

### 44. What does this shorthand create?

~~~css
.card {
  border-radius: 12px 24px;
}
~~~

**Answer:** The top-left and bottom-right corners get 12px radii. The top-right and bottom-left corners get 24px radii.

### 45. What is wrong with this focus rule, and how could it be improved?

~~~css
button:focus {
  outline: none;
}
~~~

**Answer:** It removes the visible focus indicator and gives no replacement, making keyboard focus harder to track. Keep the browser outline or add a clear `:focus-visible` style, such as `outline: 3px solid #7c3aed; outline-offset: 3px;`.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [18 - Margin and Padding](18-margin-and-padding.md) | [Lesson](../lessons/19-borders-outlines-and-shadows.md) | [Example](../examples/19-borders-outlines-and-shadows.md) | [20 - Display and Box Types](20-display-and-box-types.md) |
