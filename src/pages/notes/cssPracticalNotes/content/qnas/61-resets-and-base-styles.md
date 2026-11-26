# 61 - Resets and base styles - Q&A

Use these questions to review browser defaults, reset strategies, box sizing, typography, media, form controls, and focus styles. Each answer follows its question, with an explanation or code example where it helps.

## Multiple-choice questions

### 1. Why does an HTML page have some styling before an author stylesheet is added?

- A. HTML elements contain their own CSS
- B. Browsers apply user-agent styles
- C. Every page inherits styles from the operating system
- D. The browser automatically creates a reset stylesheet

**Answer: B. Browsers apply user-agent styles.**

**Explanation:** Browser-provided defaults give elements useful presentation, such as heading differences, list markers, links, and controls.

### 2. What does a reset stylesheet generally do?

- A. Changes selected browser defaults
- B. Removes HTML semantics
- C. Adds JavaScript behavior
- D. Forces every element to have the same display value

**Answer: A. Changes selected browser defaults.**

**Explanation:** A reset can make selected starting values more predictable. It does not change the semantic meaning of an element.

### 3. What is a common goal of normalization?

- A. Make useful defaults more consistent across browsers
- B. Remove all visible default styles
- C. Replace every HTML element with a div
- D. Remove native form behavior

**Answer: A. Make useful defaults more consistent across browsers.**

**Explanation:** Normalization tends to preserve useful presentation while addressing differences, whereas a reset often removes or replaces selected defaults.

### 4. With box-sizing: border-box, what does a declared width include?

- A. Content only
- B. Content and margin
- C. Content, padding, and border
- D. Padding and margin only

**Answer: C. Content, padding, and border.**

**Explanation:** Margins remain outside the border box. Border-box sizing makes the declared width account for the content, padding, and border.

### 5. Why is this selector commonly used in a box-sizing baseline?

~~~
*,
*::before,
*::after {}
~~~

- A. It sets every element to display block
- B. It applies the box-sizing choice to elements and their pseudo-elements
- C. It removes all inherited styles
- D. It disables browser controls

**Answer: B. It applies the box-sizing choice to elements and their pseudo-elements.**

**Explanation:** Pseudo-elements can have their own boxes, so including them keeps sizing behavior consistent.

### 6. If a project removes default margins, what should it also provide?

- A. A deliberate spacing system
- B. A fixed height for every paragraph
- C. A margin on every HTML element
- D. A new element for every gap

**Answer: A. A deliberate spacing system.**

**Explanation:** Removing margins without replacing the spacing rhythm can make content crowded and harder to read.

### 7. Which list should usually keep its markers?

- A. A list of steps in an article
- B. A horizontal navigation list whose design omits markers
- C. A list used only to align icons
- D. Every list should always lose its markers

**Answer: A. A list of steps in an article.**

**Explanation:** Markers help readers recognize content lists. A navigation list may be styled without markers when the design intentionally calls for it.

### 8. What is a reasonable general rule for inline form control fonts?

- A. Make every control inherit the page font
- B. Set every control to a 10px font
- C. Remove the controls from keyboard navigation
- D. Use a different font for every control

**Answer: A. Make every control inherit the page font.**

**Explanation:** Browser controls often have their own font defaults. Inheriting can make them fit the design, while retaining native interaction behavior.

### 9. What should replace an outline if a design removes the default focus indicator?

- A. Nothing, because focus is not visible to keyboard users
- B. An equally clear visible focus style
- C. A hover color only
- D. A larger margin

**Answer: B. An equally clear visible focus style.**

**Explanation:** Keyboard users need to see which element is focused. Hover alone does not indicate keyboard focus.

### 10. What is a useful characteristic of :focus-visible?

- A. It is a pseudo-class for browser-determined visible focus
- B. It selects only links that have been visited
- C. It disables keyboard focus
- D. It replaces semantic HTML

**Answer: A. It is a pseudo-class for browser-determined visible focus.**

**Explanation:** Browsers generally show it when a visible focus indicator is useful, including typical keyboard navigation. Test the actual interaction.

### 11. What could happen when all: unset is applied broadly to a common element?

- A. The element's expected display and inherited styles can change
- B. The element becomes an image
- C. The browser restores all author styles
- D. It adds a focus indicator

**Answer: A. The element's expected display and inherited styles can change.**

**Explanation:** A broad reset may remove useful behavior and styling. Use it only when the needed properties and interaction states are deliberately rebuilt.

### 12. Which property is a logical way to limit an image to its parent's inline size?

- A. max-inline-size
- B. float
- C. text-indent
- D. border-collapse

**Answer: A. max-inline-size.**

**Explanation:** max-inline-size: 100% limits the image along the inline axis and adapts to writing direction.

### 13. Why should a project avoid styling every SVG as display: block without considering its use?

- A. SVG is not allowed in CSS
- B. Inline SVG icons may need to align with surrounding text
- C. SVG cannot have a width
- D. Block elements cannot have accessible names

**Answer: B. Inline SVG icons may need to align with surrounding text.**

**Explanation:** Standalone SVG media and inline icons can have different layout needs. Choose a rule that matches how the asset is used.

### 14. Does border-box sizing alone prevent all overflow and layout problems?

- A. Yes, it makes every layout fit automatically
- B. No, intrinsic sizing, constraints, and layout rules still matter
- C. Yes, it removes all margins
- D. No, because it only applies to images

**Answer: B. No, intrinsic sizing, constraints, and layout rules still matter.**

**Explanation:** Box sizing clarifies how a dimension includes padding and borders. It does not replace responsive layout or content sizing decisions.

## Short-answer questions

### 15. What is the difference between a reset and base styles?

**Answer:** A reset changes selected starting defaults. Base styles establish shared project choices such as typography, text color, and link treatment.

**Explanation:** A stylesheet often contains both, but separating their purpose helps keep the starting rules intentional.

### 16. Does resetting a heading's font size or margin turn it into a paragraph?

**Answer:** No. CSS changes presentation, not the element's HTML meaning.

**Explanation:** Use HTML elements for their semantics and CSS for their appearance.

### 17. Why might a team use a unitless line-height on body text?

**Answer:** It scales with the font size and is inherited as a multiplier.

**Explanation:** This tends to work well when headings and text have different sizes, since each can receive line spacing appropriate to its font size.

### 18. What is the box model difference between content-box and border-box?

**Answer:** With content-box, the declared width or height applies to the content area, and padding and border are added outside it. With border-box, the declared size includes the content, padding, and border.

**Explanation:** Margins are outside either box.

### 19. When is it appropriate to remove list markers?

**Answer:** When a list is being styled for a deliberate interface layout, such as site navigation, and its list semantics are kept.

**Explanation:** Do not remove markers from ordinary content lists if they help readers understand the structure.

### 20. Why should a reset avoid removing all native control behavior?

**Answer:** Native controls provide familiar interaction and state behavior. Removing their appearance can also remove useful visual cues unless accessible replacements are provided.

**Explanation:** If a control is restyled, check keyboard use, focus, checked, disabled, and invalid states.

### 21. What should you check when a focus outline is clipped?

**Answer:** Check the focused style's outline offset and whether an ancestor clips overflow.

**Explanation:** A visible focus ring must remain visible around the control and contrast with its background.

### 22. What is one reason to use logical properties in base styles?

**Answer:** They describe inline and block directions and can adapt to different writing modes.

**Explanation:** padding-inline expresses spacing along the inline axis without assuming that this axis is always left to right.

### 23. Why can browser defaults still differ after using a reset?

**Answer:** Defaults and native controls can vary by browser, operating system, fonts, user styles, and user preferences.

**Explanation:** A reset can reduce selected differences, but it cannot guarantee identical rendering everywhere.

## Applied questions

### 24. A card is declared as width: 20rem with 1rem padding and a 2px border. Why can it end up wider than 20rem?

**Answer:** If it uses content-box sizing, the padding and border are added outside the 20rem content width.

**Explanation:** Applying border-box includes the padding and border in the declared width.

### 25. A page reset removes margins from headings and paragraphs. The page now looks crowded. What should be changed?

**Answer:** Add a deliberate spacing pattern, such as a flow utility or component spacing rules.

~~~
.flow > * + * {
    margin-block-start: 1rem;
}
~~~

**Explanation:** A reset should not leave content without readable rhythm.

### 26. A designer wants a content list without bullets, so the developer removes markers from every ul. What is a better approach?

**Answer:** Keep markers on content lists and remove them only from the specific navigation list.

~~~
.site-nav__list {
    padding: 0;
    list-style: none;
}
~~~

**Explanation:** The semantic list can remain while its presentation changes for a particular interface role.

### 27. A page has images that overflow a narrow card. Suggest a base rule.

**Answer:**

~~~
img,
picture,
video {
    display: block;
    max-inline-size: 100%;
}
~~~

**Explanation:** This constrains media to its available inline size. It does not force a crop or a fixed height.

### 28. A custom-styled button has no visible keyboard focus. What should be added?

**Answer:** Add a visible :focus-visible style, for example:

~~~
button:focus-visible {
    outline: 3px solid #a34d13;
    outline-offset: 3px;
}
~~~

**Explanation:** Check the outline against all surfaces and confirm that containers do not clip it.

### 29. A project reset sets every element and every pseudo-element to border-box. Why include pseudo-elements?

**Answer:** Pseudo-elements can generate boxes with padding and borders too, so applying the same sizing model avoids inconsistent calculations.

**Explanation:** The universal selector covers elements, while the pseudo-element selectors include generated content boxes.

### 30. A developer applies all: unset to every button and input. What is a safer process?

**Answer:** Start by identifying the specific browser differences to change. Keep native behavior where it helps, then style the required normal, hover, focus, disabled, and validation states deliberately.

**Explanation:** A blanket reset can change more than appearance and leave controls without useful affordances.

### 31. A site uses inline SVG icons beside text. Should all SVG elements be forced to display block?

**Answer:** No. Decide separately how standalone SVG media and inline icon SVG should be displayed.

**Explanation:** Block display can break baseline alignment for inline icons.

### 32. A page looks fine at one desktop size but breaks when zoomed. What should be reviewed?

**Answer:** Check fixed dimensions, text wrapping, control sizing, spacing, and whether media and containers can shrink.

**Explanation:** Zoom and larger text settings can expose assumptions that are hidden at one viewport size.

## Practice task

Create a short page with a heading, a content list, an image, a navigation list, and a form. Add a small reset and base layer. Preserve content list markers, style only the navigation list without markers, and make keyboard focus visible.

**One possible CSS answer:**

~~~
@layer reset, base;

@layer reset {
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body,
    h1,
    p,
    ul {
        margin: 0;
    }

    img {
        display: block;
        max-inline-size: 100%;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }
}

@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.5;
    }

    :focus-visible {
        outline: 3px solid #a34d13;
        outline-offset: 3px;
    }

    .site-nav__list {
        padding: 0;
        list-style: none;
    }
}
~~~

**Explanation:** The reset makes box sizing and selected defaults predictable. The base layer sets general typography and focus visibility. Only the navigation list loses markers, while an article list can retain them.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [60 - CSS architecture and naming conventions](../lessons/60-css-architecture-and-naming.md) | [Q&A](61-resets-and-base-styles.md) | [Example](../examples/61-resets-and-base-styles.md) | [62 - Organizing large stylesheets](../lessons/62-organizing-large-stylesheets.md) |