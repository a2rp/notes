# 54 - Focus styles and keyboard interaction - Q&A

Review keyboard focus, focus indicators, CSS focus pseudo-classes, semantic controls, and focus visibility during scrolling. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does keyboard focus identify?

- A. The element that will receive keyboard input
- B. The element under the mouse pointer
- C. The element with the largest font size
- D. The first element in the HTML file only

**Answer: A. The element that will receive keyboard input.**

**Explanation:** Focus marks the current interaction point for keyboard operation, such as moving through links or entering text into a field.

### 2. Which pseudo-class matches the currently focused element?

- A. `:hover`
- B. `:focus`
- C. `:visited`
- D. `:checked`

**Answer: B. `:focus`.**

**Explanation:** `:focus` matches an element that currently has focus, regardless of whether the browser decides to show its focus indicator in a particular way.

### 3. What is the main purpose of `:focus-visible`?

- A. Match every element that has a pointer over it
- B. Match focused elements when the browser determines a visible indicator is appropriate
- C. Add keyboard behavior to a `div`
- D. Match every element with a visible border

**Answer: B. Match focused elements when the browser determines a visible indicator is appropriate.**

**Explanation:** Browsers commonly show this state during keyboard navigation, based on heuristics. It is not an absolute keyboard-device detector.

### 4. What does `:focus-within` match?

- A. A component when it or one of its descendants has focus
- B. Only the page's `<body>` element
- C. Every element with a child element
- D. A control only when the mouse is inside it

**Answer: A. A component when it or one of its descendants has focus.**

**Explanation:** This pseudo-class lets a group provide context while a child control is focused. It does not move focus or make the group interactive.

### 5. Why is an outline useful for focus indication?

- A. It removes the element from the Tab order
- B. It is drawn outside the border and does not take layout space
- C. It automatically increases contrast in every theme
- D. It adds button semantics

**Answer: B. It is drawn outside the border and does not take layout space.**

**Explanation:** An outline can make focus visible without changing the element's dimensions. Its color and visibility still need to be checked against surrounding colors.

### 6. What does CSS alone not do to an arbitrary `div` styled like a button?

- A. Change its color
- B. Add padding
- C. Provide native button semantics and keyboard behavior
- D. Draw a border

**Answer: C. Provide native button semantics and keyboard behavior.**

**Explanation:** Use a real `<button>` for an action. CSS controls presentation, not the complete interaction model or semantic role.

### 7. What does a positive `tabindex` value usually risk?

- A. Making focus order hard to follow and inconsistent with document order
- B. Removing all CSS styling
- C. Making an element invisible
- D. Preventing text selection

**Answer: A. Making focus order hard to follow and inconsistent with document order.**

**Explanation:** Natural document order is generally easier to maintain. Avoid positive values that reorder focus away from the page structure.

### 8. Which CSS state is not a replacement for keyboard focus styling?

- A. `:focus`
- B. `:focus-visible`
- C. `:hover`
- D. `:focus-within`

**Answer: C. `:hover`.**

**Explanation:** Hover represents pointer interaction. Keyboard users need an indicator tied to focus.

### 9. Which CSS property can reserve space near the top of a scroll container for focused content?

- A. `scroll-padding-block-start`
- B. `outline-style`
- C. `tab-index`
- D. `pointer-events`

**Answer: A. `scroll-padding-block-start`.**

**Explanation:** Scroll padding can keep scrolled-to content from sitting underneath a sticky header. Use it with values that match the actual layout.

### 10. Which system color can be used for a focus outline in forced colors mode?

- A. `Highlight`
- B. `brand-color`
- C. `#forced`
- D. `focus-mode`

**Answer: A. `Highlight`.**

**Explanation:** `Highlight` is a system color that follows the active palette, unlike a hard-coded author color.

## Short-answer questions

### 11. What is the difference between `:focus` and `:focus-visible`?

**Answer:** `:focus` matches the focused element. `:focus-visible` matches focused elements when the user agent determines that a visible focus indicator is appropriate.

**Explanation:** The browser may use input mode and other heuristics to decide when `:focus-visible` matches. It is not a strict keyboard-only test.

### 12. Why should focus indicators not be time-limited?

**Answer:** The indicator should remain while the element has focus so users can track the current interaction point.

**Explanation:** A focus cue that disappears while focus remains can leave keyboard users unsure where their next action will apply.

### 13. Does `:focus-within` make a component's descendants focusable?

**Answer:** No. It styles an ancestor when a descendant already has focus.

**Explanation:** Focusability and keyboard behavior come from the element's semantics, attributes, and interaction implementation, not from this CSS pseudo-class.

### 14. Why avoid removing the outline without a replacement?

**Answer:** It can remove the visible location cue for keyboard users.

**Explanation:** If the default indicator is replaced, the new style must remain clearly visible in the relevant themes and user settings.

### 15. When is a native button preferable to a styled `div`?

**Answer:** When the control performs an action that should behave like a button.

**Explanation:** A native button provides built-in semantics, focus behavior, and keyboard activation. A styled `div` does not gain those from CSS.

### 16. What does `tabindex="-1"` do?

**Answer:** It allows an element to be focused programmatically without adding it to the normal sequential Tab order.

**Explanation:** This can be useful for moving focus to a heading or container after an interaction. Use it deliberately and preserve a sensible focus experience.

### 17. Why can `overflow: hidden` interfere with an outline?

**Answer:** An ancestor can clip an outline that is drawn outside the focused element's border.

**Explanation:** Check surrounding containers when an indicator appears cut off. Adjust spacing or overflow behavior rather than hiding focus.

### 18. What should be checked when a sticky header is present?

**Answer:** Make sure keyboard focus does not scroll underneath or become obscured by the header.

**Explanation:** Scroll padding or scroll margin can help reserve space, but the actual page layout and overlays still need to be checked.

## Applied reasoning

### 19. A link has a strong `:hover` color change but no focus style. Is its keyboard location clear?

**Answer:** Not necessarily. Hover styling applies to pointer hover and does not replace a focus indicator.

**Explanation:** Add a visible style for `:focus` or `:focus-visible` so keyboard users can identify the active link.

### 20. A form wrapper gets a blue border with `:focus-within`, but its input has no focus ring. Is the input's focus necessarily clear?

**Answer:** No. The wrapper's change may provide context, but the focused input should still have a visible indicator of its own.

**Explanation:** A group indicator and a control indicator serve related but distinct purposes. Check that the actual focused control can be identified.

### 21. A designer removes all outlines because they do not match the design. What should be done?

**Answer:** Keep or create a clear replacement focus indicator and verify it across relevant backgrounds and user color settings.

**Explanation:** Visual consistency does not justify removing the location cue. The focused state needs to remain distinguishable.

### 22. A custom button is a `div` with `cursor: pointer` and `:hover` styles. What else is missing?

**Answer:** Appropriate button semantics, keyboard focus and activation behavior, and a visible focus style.

**Explanation:** A pointer cursor and visual states do not provide the behavior of a native button. Prefer a real `<button>` unless a custom widget has a justified interaction model.

### 23. A sticky header covers a control after Tab scrolls it into view. What CSS could help?

**Answer:** Set suitable scroll padding on the scroll container or scroll margin on the focused targets.

**Explanation:** These properties can keep scrolled-to content away from the sticky header, but test the actual header size and responsive layout.

### 24. A forced-colors user cannot see a blue-only focus shadow. What is a more robust approach?

**Answer:** Preserve an outline and use a system color such as `Highlight` in forced colors mode.

**Explanation:** Shadows may disappear or become ineffective when the user palette is applied. A system-color outline can remain visible with that palette.

## Code reading and correction

### 25. Why does this rule fail keyboard users?

~~~css
button:hover {
  background: #dbeafe;
}
~~~

**Answer:** It changes the button only on pointer hover and provides no focus indicator.

**Explanation:** Add a `:focus` or `:focus-visible` rule so keyboard users can identify the focused button.

### 26. Add a basic visible focus indicator to this link.

~~~css
a {
  color: #145da0;
}
~~~

**Answer:** Add an outline for focus:

~~~css
a:focus {
  outline: 2px solid #174a7e;
  outline-offset: 2px;
}

 a:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
}
~~~

**Explanation:** The `:focus` rule provides a general fallback. The `:focus-visible` rule can provide a stronger indicator when the browser matches that state.

### 27. What does this selector match?

~~~css
.search-form:focus-within {
  border-color: #005fcc;
}
~~~

**Answer:** The `.search-form` when it or one of its descendants has focus.

**Explanation:** It can highlight the form group while a child input or button is active. It does not make the form or its children focusable.

### 28. What is wrong with this focus rule?

~~~css
:focus {
  outline: none;
}
~~~

**Answer:** It removes the focus indicator without providing a replacement.

**Explanation:** Keyboard users may lose the visual cue that identifies the active control. Keep the default or add an equally visible alternative.

### 29. Update this CSS so a sticky header does not cover scrolled-to content.

~~~css
header {
  position: sticky;
  top: 0;
}
~~~

**Answer:** Reserve space in the scroll container, and optionally add target scroll margin:

~~~css
:root {
  scroll-padding-block-start: 5rem;
}

section[id],
[tabindex="-1"] {
  scroll-margin-block-start: 5rem;
}
~~~

**Explanation:** The values should match the header's actual size and be checked at narrow widths and zoom levels.

### 30. What does this forced-colors rule preserve?

~~~css
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid Highlight;
  }
}
~~~

**Answer:** A visible outline on elements matching `:focus-visible`, using the active system highlight color.

**Explanation:** A system color follows the user's forced palette instead of relying on a fixed author color.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [53 - Accessible CSS and user preferences](../lessons/53-accessible-css-and-user-preferences.md) | [Q&A](54-focus-and-keyboard-interaction.md) | [Example](../examples/54-focus-and-keyboard-interaction.md) | [55 - Color schemes and theming](../lessons/55-color-schemes-and-theming.md) |
