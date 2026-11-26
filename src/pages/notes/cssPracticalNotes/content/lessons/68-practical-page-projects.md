# 68 - Practical page projects

A practical page project brings CSS ideas together in a complete interface. The goal is not to use every property you have learned. The goal is to turn a clear content and design brief into a page that is readable, responsive, accessible, and maintainable.

A small project is easier to finish when you decide what it should do before styling it. Build the page in layers, check it at useful widths and states, and refine the parts that affect the user's task.

## Start with a short project brief

Before writing CSS, describe the page in a few sentences. Record:

- **Purpose:** What should the page help a visitor understand or do?
- **Audience:** Who will use the page, and what context might they be in?
- **Primary action:** What is the most important next step?
- **Content:** What headings, details, links, and supporting material are needed?
- **Constraints:** Which devices, browsers, content length, or project rules matter?
- **Success checks:** How will you know the finished page works?

Keep the first project small. One landing page, article page, profile, event page, or product overview is enough to practice structure and visual hierarchy. Avoid inventing extra features that the brief does not need.

## Plan the content before the visual layout

Write the content in a useful order before deciding how many columns to use. A simple page outline might be:

1. Site header and primary navigation.
2. Main page heading and brief introduction.
3. Main sections that support the purpose.
4. A clear primary action or contact section.
5. Footer information.

Use meaningful HTML elements for the page regions and headings. A `header`, `nav`, `main`, `section`, and `footer` can make the structure easier to understand and navigate. Use one clear page-level `h1`, then nest section headings according to the content hierarchy. Do not select heading levels only because their default font sizes look right.

Each section should have a purpose and a useful heading. Use a generic `div` when no semantic element better describes the grouping. Add accessible names to sections or navigation regions when people need to distinguish multiple regions of the same type.

A clear content outline helps sighted readers scan the page and helps people using assistive technology navigate its landmarks and headings. It also makes the later CSS less dependent on visual-only structure.

## Establish the visual system

Choose a small set of values before styling every component. For example:

- A small color palette for page background, text, accent, and borders.
- A spacing scale used consistently between sections and components.
- A type scale for body text, section headings, and the page title.
- A content width and readable line length.
- A small set of border radii and shadows, if they support the design.

Store repeated choices in custom properties:

~~~css
:root {
  --color-ink: #1d2e26;
  --color-paper: #f5f7f2;
  --color-accent: #24623e;
  --space-section: 4rem;
  --content-width: 70rem;
}
~~~

Use the tokens where they clarify repeated decisions. Do not create a variable for every one-off declaration.

## Build from the small layout upward

Start with a narrow viewport and normal document flow. Add a flexible layout that grows when the content has room. Use Grid for two-dimensional groups such as cards or page columns, and Flexbox for one-dimensional alignment such as a header row or button group.

Prefer layouts that adapt to available space. Let text wrap, let cards shrink or move to new rows, and constrain long content to a readable width. Add a media query when the content itself needs a different arrangement, not just because a familiar device width is listed in a design mockup.

For example, a card group can begin in one column, gain two columns when the cards fit, and use a wider layout only when the content has enough room:

~~~css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 42rem) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
~~~

The values above are examples, not device rules. Adjust a breakpoint when the content begins to feel crowded or when another column becomes comfortable.

## Style components and states

After the page structure and broad layout work, style reusable parts such as navigation links, buttons, cards, labels, and calls to action. Keep selector names tied to meaningful components or roles in the page.

For each interactive element, consider its relevant states:

- Default.
- Hover, when a pointer is available.
- Keyboard focus.
- Active or pressed, when appropriate.
- Disabled, if the control can actually be disabled.
- Error or success, for forms and feedback.

Do not use color as the only sign of state. Make keyboard focus easy to see. Use links for navigation and buttons for actions. A styled link does not become a button just because it looks like one.

## Add responsive and preference conditions

Check the page at widths where the content changes shape. Test long headings, narrow cards, navigation wrapping, and the primary action. Use the page's actual content when checking line length and overflow.

When relevant, check:

- Keyboard-only navigation.
- Increased zoom or text size.
- Reduced motion.
- Dark or light color scheme.
- Forced colors.
- Print output.

Only add CSS for conditions the page needs. For nonessential motion, honor reduced-motion preferences. Keep content and controls usable when an optional enhancement is not supported.

## Work in small passes

A practical sequence is:

1. Write a brief and content outline.
2. Create semantic HTML and working local links.
3. Add base typography, color tokens, and a content width.
4. Build the narrow layout using normal flow.
5. Add Grid or Flexbox for groups that need it.
6. Style components and interaction states.
7. Add media queries when the content needs them.
8. Check keyboard use, zoom, motion preferences, and contrast.
9. Test in the supported browsers and inspect console or network issues.
10. Remove unused rules and temporary experiments.
11. Review the page with the actual content and record remaining limitations.

Change one area at a time. It is easier to notice a broken relationship between layout and content when the page is not being redesigned in every direction at once.

## Check the finished page against its purpose

Use a short checklist tied to the brief:

- Can a visitor tell what the page is about from its title and opening content?
- Is the most important action easy to locate and understand?
- Does the content have a logical reading order without CSS?
- Do links and buttons do what their labels promise?
- Can a keyboard user reach and identify interactive controls?
- Does content remain readable at narrow widths and zoom?
- Do sections have useful headings and clear grouping?
- Do images have appropriate text alternatives, or are decorative images hidden from assistive technology?
- Do focus, hover, and feedback states remain distinguishable?
- Does the page still work if an optional visual effect is unavailable?
- Are browser, responsive, and reduced-motion checks documented?

If a check fails, trace it to the appropriate layer. A confusing action label is a content problem. A section in the wrong order is often an HTML structure problem. An overflowing card is a layout problem. Fix the cause instead of adding unrelated CSS.

## Common project mistakes

- **Starting with decoration before content:** The page may look polished but fail to explain its purpose.
- **Using generic containers for every region:** Meaningful HTML elements make structure and navigation clearer.
- **Picking breakpoints from device names:** Content fit is a better guide than a list of popular screen widths.
- **Forcing fixed heights on text content:** Longer text or zoom can cause clipping.
- **Using color alone for state:** Some users may not distinguish the state.
- **Styling a link as a button without checking its behavior:** Choose the element that matches the action.
- **Checking only the first viewport:** Lower sections, footers, and narrow layouts can contain defects too.
- **Using placeholders that never become real content:** Placeholder text can hide wrapping and spacing issues.
- **Adding unnecessary interactions or animation:** Each feature adds behavior and testing work.
- **Calling the project complete without retesting after the final edit:** Small CSS changes can affect other widths and states.

## Project ideas

Choose one small brief and finish it before starting another:

- **Community event page:** Explain the event, provide the schedule, and make registration details easy to find.
- **Personal profile:** Introduce a person, group work into clear sections, and provide a contact action.
- **Product overview:** Explain the product, show its benefits, and make the next step clear.
- **Article page:** Create a readable heading hierarchy, body width, related sections, and a useful footer.
- **Local service page:** Describe services, hours, location details, and how to make an inquiry.

Write a brief and success checklist for the project before styling it. Keep the page small enough to review from top to bottom.

## Try it yourself

1. Choose one project idea and write a six-line brief covering purpose, audience, primary action, content, constraints, and success checks.
2. Draft the page outline using headings and semantic landmarks before writing CSS.
3. Build the base layout with normal flow and a readable content width.
4. Add one responsive card group and choose breakpoints based on when the content needs more columns.
5. Add hover and keyboard focus styles to the page's links and buttons.
6. Test a narrow viewport, a wide viewport, and increased zoom.
7. Check that navigation works and every visible control has the behavior its label suggests.
8. Review reduced-motion and print states if the page uses motion or needs print support.
9. Remove one decorative feature that does not support the page's purpose.
10. Compare the finished page against the brief and record any remaining limitations.

## Key points

- Start with a specific brief, audience, content outline, and success checks.
- Use semantic HTML and a logical heading structure before visual styling.
- Build a flexible narrow layout first, then add wider arrangements where content fits.
- Reuse a small set of tokens and component styles.
- Provide clear keyboard focus and meaningful control behavior.
- Test the complete page at relevant widths, states, preferences, and browsers.
- Keep optional decoration and interaction in service of the page's purpose.
- Recheck the page after final edits and document its remaining limitations.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [67 - CSS performance](67-css-performance.md) | [Q&A](../qnas/68-practical-page-projects.md) | [Example](../examples/68-practical-page-projects.md) | [69 - CSS reference and glossary](69-css-reference-and-glossary.md) |