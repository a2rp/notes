# 53 - Accessible CSS and user preferences - Q&A

Review accessible defaults, color schemes, motion and contrast preferences, forced colors, flexible layouts, and print styles. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does `prefers-color-scheme` report?

- A. Whether the page contains dark colors
- B. A user's preferred light or dark color scheme
- C. Whether the browser supports CSS variables
- D. Whether the page is being printed

**Answer: B. A user's preferred light or dark color scheme.**

**Explanation:** This media feature lets CSS adapt to a light or dark preference. It does not define the page's colors for the author.

### 2. What does `color-scheme: light dark` communicate?

- A. The author supports both schemes and browser-provided UI can adapt
- B. The page must always use a dark background
- C. Every author color is automatically made accessible
- D. The browser should hide form controls

**Answer: A. The author supports both schemes and browser-provided UI can adapt.**

**Explanation:** The property informs the browser about supported schemes, which can affect browser-provided controls and other UI. Author-defined colors still need suitable values.

### 3. Which query responds to a request to minimize non-essential motion?

- A. `@media (prefers-motion: none)`
- B. `@media (prefers-reduced-motion: reduce)`
- C. `@media (animation: off)`
- D. `@media (motion: low)`

**Answer: B. `@media (prefers-reduced-motion: reduce)`.**

**Explanation:** This is the media feature and value used to detect a reduced-motion preference.

### 4. Why should a high-contrast override specify `prefers-contrast: more`?

- A. Because the unqualified query can match preferences other than more contrast
- B. Because `more` disables all CSS colors
- C. Because the value is only valid in print
- D. Because the query otherwise checks font size

**Answer: A. Because the unqualified query can match preferences other than more contrast.**

**Explanation:** The feature can report values such as `more`, `less`, and `custom`. Be explicit when a rule responds specifically to a request for more contrast.

### 5. What does `forced-colors: active` indicate?

- A. The page is using only CSS variables
- B. The user agent is applying a forced color palette
- C. The page uses a dark color scheme
- D. The page is open in a print preview

**Answer: B. The user agent is applying a forced color palette.**

**Explanation:** Forced colors mode lets a user agent apply a user-selected palette, commonly to support readability.

### 6. Which value is a CSS system color?

- A. `CanvasText`
- B. `brand-blue`
- C. `#canvas`
- D. `dark-mode`

**Answer: A. `CanvasText`.**

**Explanation:** System colors such as `Canvas`, `CanvasText`, `ButtonText`, and `LinkText` represent colors from the active system palette.

### 7. What is a safer way to indicate an error than changing a field border to red alone?

- A. Use red and no other change
- B. Add an error message or another visible cue as well
- C. Hide the field label
- D. Make the error flash continuously

**Answer: B. Add an error message or another visible cue as well.**

**Explanation:** Color should not be the only means of communicating information. Text, an icon with an accessible name, or another visible cue can make the state understandable.

### 8. Which sizing approach is more likely to tolerate text enlargement?

- A. Fixed heights for every text box
- B. Flexible widths and content-driven heights
- C. `overflow: hidden` on every paragraph
- D. Fixed widths based on one language

**Answer: B. Flexible widths and content-driven heights.**

**Explanation:** Flexible sizing and natural height let content wrap and grow when text is enlarged or translated.

### 9. What is a common purpose of `@media print`?

- A. To apply styles when the user prefers dark mode
- B. To adjust the page for paper output
- C. To disable all text
- D. To select browser versions

**Answer: B. To adjust the page for paper output.**

**Explanation:** Print styles can hide screen-only controls and preserve clear text and section boundaries on paper.

### 10. What does `forced-color-adjust: none` do?

- A. Opts an element out of forced color adjustments
- B. Turns on forced colors mode for everyone
- C. Adds a color contrast ratio
- D. Removes inherited properties

**Answer: A. Opts an element out of forced color adjustments.**

**Explanation:** This can prevent the user's palette from being applied to that element. Use it sparingly because it can reduce readability.

## Short-answer questions

### 11. Does `prefers-color-scheme: dark` choose the colors for a page's cards and text?

**Answer:** No. It reports the preference so the author can define appropriate colors.

**Explanation:** Browser-provided UI may adapt when the page supports a scheme, but author-defined foregrounds and backgrounds still need to be set as a readable pair.

### 12. What should a reduced-motion rule change?

**Answer:** Remove, simplify, or replace non-essential motion while keeping the content and state understandable.

**Explanation:** The page should not depend on animation to convey information. Some effects may also need a user-operable pause control.

### 13. What are common `prefers-contrast` values?

**Answer:** `no-preference`, `more`, `less`, and `custom`.

**Explanation:** The values can represent a preference for increased contrast, reduced contrast, or a user-selected palette. A rule should name the preference it intends to handle.

### 14. Why should a page not depend on its background colors for printed meaning?

**Answer:** Browsers or users may omit backgrounds to save ink, so the meaning could disappear.

**Explanation:** Use headings, text, spacing, borders, or other cues that remain visible without a background fill.

### 15. What is one way to avoid signaling status with color alone?

**Answer:** Pair the color with visible text, an icon, a shape, or another distinct cue.

**Explanation:** A color change alone may not be perceived by everyone, and it can disappear or change in alternate palettes.

### 16. Why avoid fixed heights on text containers?

**Answer:** Larger text, translated text, or narrower viewports can need more vertical space and get clipped.

**Explanation:** Let containers grow with their content unless a fixed dimension is required for a specific functional reason.

### 17. What contrast ratios does WCAG 2.2 Success Criterion 1.4.3 use for text at AA, subject to its stated exceptions?

**Answer:** At least 4.5:1 for normal text and 3:1 for large text.

**Explanation:** A contrast check should consider the actual foreground and background colors. A media query does not establish that a palette meets these ratios.

### 18. What should the page's baseline styling do if a preference query is not matched or supported?

**Answer:** It should still keep content readable and usable.

**Explanation:** Preferences are enhancements to a sound default, not a prerequisite for legibility or operation.

## Applied reasoning

### 19. A dark-mode rule changes the page background but leaves dark text and dark card backgrounds unchanged. What is the risk?

**Answer:** Text or card boundaries may become difficult to see because the colors were not updated as a coordinated palette.

**Explanation:** Set foreground and background colors together, including surfaces, links, borders, and controls.

### 20. A stylesheet uses `@media (prefers-contrast)` to force a high-contrast palette. Why can that be wrong?

**Answer:** The query can match users who requested less contrast or selected a custom palette, not only users who requested more.

**Explanation:** Use `prefers-contrast: more` for an override specifically intended for increased contrast.

### 21. An animated badge disappears when reduced motion is requested, but its label remains. Is the status still available?

**Answer:** Yes, if the remaining label still communicates the status.

**Explanation:** Removing decorative motion is acceptable when the underlying information remains available without it.

### 22. A forced-colors palette removes a card's subtle shadow. What can make the card boundary visible?

**Answer:** Add a visible border using a system color such as `CanvasText`.

**Explanation:** Shadows and background fills may not provide a reliable boundary in forced colors mode. A system-color border can use the active palette.

### 23. A page marks required fields only with red borders. What should be added?

**Answer:** Add an explicit visible indication, such as “Required” text or a clear error message, and ensure the label communicates the requirement.

**Explanation:** Color alone should not convey a requirement or error state.

### 24. A card clips its text at 200% zoom because it has a fixed height. What is a suitable CSS change?

**Answer:** Remove the fixed height or make the card height content-driven, and allow its text to wrap.

**Explanation:** The container should expand when enlarged text needs more room instead of hiding the content.

## Code reading and correction

### 25. What happens to the root page colors when the user prefers dark mode?

~~~css
:root {
  color: #243447;
  background-color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #e8eef5;
    background-color: #151b23;
  }
}
~~~

**Answer:** The root text and background colors change to the light text and dark background values.

**Explanation:** The media query applies its declarations when the dark preference matches. Other components may need their own coordinated color overrides.

### 26. What does this reduced-motion rule do?

~~~css
@media (prefers-reduced-motion: reduce) {
  .loading-indicator {
    animation: none;
  }
}
~~~

**Answer:** It stops the loading indicator's CSS animation when a reduced-motion preference is active.

**Explanation:** The indicator should still communicate the loading state without relying on movement, for example through a text label.

### 27. Why is this rule too broad if its intent is only to add high-contrast styles?

~~~css
@media (prefers-contrast) {
  .card {
    border-width: 2px;
  }
}
~~~

**Answer:** The query may match preferences other than `more` contrast.

**Explanation:** Use `@media (prefers-contrast: more)` when the change is specifically for an increased-contrast preference.

### 28. What is the purpose of this rule?

~~~css
@media (forced-colors: active) {
  .card {
    border: 1px solid CanvasText;
  }
}
~~~

**Answer:** It gives cards a border using a color from the active system palette in forced colors mode.

**Explanation:** The system color can remain visible in the user's selected palette, unlike a hard-coded brand color or subtle shadow.

### 29. How can this fixed-width text layout be made more flexible?

~~~css
.article {
  width: 900px;
  height: 500px;
  overflow: hidden;
}
~~~

**Answer:** Let the width shrink, set a maximum width, remove the fixed height, and allow content to grow:

~~~css
.article {
  width: 100%;
  max-width: 70ch;
  margin-inline: auto;
  padding-inline: 1rem;
}
~~~

**Explanation:** A flexible width and natural height let text reflow instead of clipping at narrow widths or when enlarged.

### 30. Improve this print rule so important content remains clear without colored backgrounds.

~~~css
@media print {
  .card {
    background: #e8eef5;
  }
}
~~~

**Answer:** Use a visible border and clear text colors instead of relying on the fill:

~~~css
@media print {
  .card {
    color: #000000;
    background: #ffffff;
    border: 1px solid #555555;
    box-shadow: none;
    break-inside: avoid;
  }
}
~~~

**Explanation:** Print settings may omit background colors. Text and borders preserve the card's content and boundary on paper.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [52 - Scoped styles and component styling](../lessons/52-scoping-and-component-styles.md) | [Q&A](53-accessible-css-and-user-preferences.md) | [Example](../examples/53-accessible-css-and-user-preferences.md) | [54 - Focus styles and keyboard interaction](../lessons/54-focus-and-keyboard-interaction.md) |
