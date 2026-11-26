# 68 - Practical page projects - Q&A

Use these questions to review how to plan and finish a small page project. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is a useful first step before writing CSS for a page project?

- A. Add animation to the hero
- B. Write a brief that defines purpose, audience, content, and success checks
- C. Choose breakpoints for every popular phone
- D. Create a separate stylesheet for every section

**Answer: B. Write a brief that defines purpose, audience, content, and success checks.**

**Explanation:** A clear brief guides content, structure, and design choices so you can decide whether a feature belongs on the page.

### 2. Why should content order be planned before the visual layout?

- A. CSS cannot change layout
- B. A logical source order supports reading and navigation even when styling changes
- C. It removes the need for headings
- D. It guarantees that every browser uses the same font

**Answer: B. A logical source order supports reading and navigation even when styling changes.**

### 3. Which element usually contains the primary content of a page?

- A. `<main>`
- B. `<span>`
- C. `<small>`
- D. `<br>`

**Answer: A. `<main>`.**

**Explanation:** A page normally has one main content region, with navigation, header, and footer content around it as needed.

### 4. How should headings be chosen?

- A. By the default font size that looks best
- B. By the relationships and hierarchy of the content
- C. By alternating `h1` and `h6`
- D. By the CSS selector names

**Answer: B. By the relationships and hierarchy of the content.**

### 5. When should you add a responsive breakpoint?

- A. Whenever a phone model is released
- B. When the content or layout needs a different arrangement
- C. Every 100 pixels
- D. Only at a standard device width

**Answer: B. When the content or layout needs a different arrangement.**

**Explanation:** Content fit gives a practical reason for a breakpoint. Device names do not determine the best layout threshold.

### 6. Which layout method is often suitable for a group of cards arranged in rows and columns?

- A. CSS Grid
- B. `text-decoration`
- C. `list-style`
- D. `font-weight`

**Answer: A. CSS Grid.**

### 7. Which layout method is often suitable for aligning items along one axis, such as a header row?

- A. Flexbox
- B. `caption-side`
- C. `border-collapse`
- D. `white-space`

**Answer: A. Flexbox.**

### 8. What does a design token help you manage?

- A. A repeated design choice such as a color, spacing value, or content width
- B. A browser's history
- C. An HTML heading level
- D. A user's keyboard focus

**Answer: A. A repeated design choice such as a color, spacing value, or content width.**

### 9. Which element should usually be used for navigation to another location?

- A. A link
- B. A button with no behavior
- C. A heading
- D. A generic `div`

**Answer: A. A link.**

### 10. Which element should usually be used to perform an action on the current page?

- A. A button
- B. A heading
- C. A `span` with a click color
- D. An image with no alternative text

**Answer: A. A button.**

### 11. Why should interactive controls have a visible keyboard focus style?

- A. Keyboard users need to identify which control is focused
- B. It makes CSS files smaller
- C. It prevents all browser differences
- D. It replaces hover styling

**Answer: A. Keyboard users need to identify which control is focused.**

### 12. What should you check after fixing a narrow-screen layout?

- A. Only the first heading
- B. Other content, controls, focus states, and nearby viewport widths
- C. Only the desktop screenshot
- D. Nothing if the CSS validates

**Answer: B. Other content, controls, focus states, and nearby viewport widths.**

### 13. Why should placeholder text be replaced with realistic content before final review?

- A. Real text can reveal wrapping, spacing, and overflow issues
- B. Placeholder text prevents CSS from parsing
- C. Real content cannot wrap
- D. Placeholder text disables landmarks

**Answer: A. Real text can reveal wrapping, spacing, and overflow issues.**

### 14. What is a good reason to add an animation to a practical page?

- A. It supports an interaction or communicates useful feedback
- B. Every page needs motion
- C. It makes keyboard navigation unnecessary
- D. It hides missing content

**Answer: A. It supports an interaction or communicates useful feedback.**

### 15. What should guide the final project review?

- A. The original brief and its success checks
- B. The number of CSS properties used
- C. The most complex selector in the stylesheet
- D. Whether every section has a shadow

**Answer: A. The original brief and its success checks.**

## Short-answer questions

### 16. What information belongs in a short project brief?

**Answer:** The page purpose, audience, primary action, content, constraints, and checks that define success.

### 17. Why is semantic HTML useful in a page project?

**Answer:** It communicates the page's regions and content relationships in the markup, which helps people navigate and makes the structure easier to maintain.

### 18. Why is one page-level `h1` useful?

**Answer:** It gives the page a clear main heading. Other headings can then describe the sections and subsections in their logical order.

### 19. How should you choose a content width?

**Answer:** Keep text lines readable and let the layout use available space without stretching paragraphs across excessively wide areas.

### 20. What is the difference between a link and a button?

**Answer:** A link navigates to a location. A button performs an action. Choose the element based on the behavior, not its appearance.

### 21. Why should you test a page at increased zoom?

**Answer:** Zoom can reveal clipping, fixed-size assumptions, and layouts that fail when text or content needs more room.

### 22. Why should a section have a clear purpose and heading?

**Answer:** Clear grouping and headings help readers understand the page outline and find the information they need.

### 23. What should you do if a final CSS tweak changes the page at another width?

**Answer:** Recheck the affected layouts and states, then adjust the cause and repeat the checks before calling the project complete.

## Applied project questions

### 24. A project brief has four different primary actions. What should you clarify?

**Answer:** Determine which visitor task is most important and distinguish the primary action from secondary actions. Then make the page hierarchy and labels reflect that priority.

### 25. A desktop mockup has three columns, but the cards become cramped on a tablet. What should you do?

**Answer:** Change the layout when the content begins to feel cramped. Use fewer columns or a single column at the relevant width instead of matching the desktop arrangement at every size.

### 26. A section uses a large styled paragraph because its text looks like a heading. What should you review?

**Answer:** Check whether the text actually names the section. If it does, mark it up with the appropriate heading and use CSS for its visual appearance.

### 27. A navigation item is styled like a button and triggers an in-page action. Which element is more appropriate?

**Answer:** Use a button for an action. If the item instead navigates to another URL or page fragment, use a link.

### 28. The page looks right with a mouse, but keyboard focus is not apparent. What should you change?

**Answer:** Add or refine visible focus styles for interactive elements, then navigate the complete page using the keyboard and confirm focus remains easy to follow.

### 29. The hero has a decorative image, but the page has no text explaining its purpose. What should you consider?

**Answer:** Decide whether the image conveys information the content needs. If it is decorative, provide appropriate empty alternative text or hide a CSS decoration from assistive technology. If it conveys information, provide a useful text alternative or nearby explanation.

### 30. The page passes a CSS validator, but users cannot find the registration action. Is the project complete?

**Answer:** No. Revisit the content hierarchy, action label, and placement against the page brief. A validator does not determine whether the page communicates its purpose or helps users complete the task.

## Practice task

### 31. What should you record when reviewing a finished project?

**Answer:** Record which brief checks pass, the browsers and viewport conditions tested, any keyboard or preference checks, and limitations that remain.

**Explanation:** A concise review makes the result clear and provides a useful starting point for future changes.

## Chapter navigation

| Previous chapter | Lesson | Example | Next chapter |
| :--- | :--- | :--- | :--- |
| [67 - CSS performance](../lessons/67-css-performance.md) | [Lesson](../lessons/68-practical-page-projects.md) | [Example](../examples/68-practical-page-projects.md) | [69 - CSS reference and glossary](../lessons/69-css-reference-and-glossary.md) |