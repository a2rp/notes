# 38 - Styling links and link states

Links help people move between pages and sections. CSS can show which links are available, which are being interacted with, and where keyboard focus is, while the HTML keeps each destination and its meaning.

## Learning outcomes

After this chapter, you should be able to:

- Distinguish a link that navigates from a button that performs an action.
- Style unvisited, visited, hover, active, focus, and target states.
- Keep a visible focus indicator for keyboard users.
- Use underlines, color, and contrast so links are easy to recognize.
- Order link state rules so the intended state wins in the cascade.
- Avoid relying on hover or color alone to communicate a link.

## Use an anchor for navigation

An anchor with an `href` attribute creates a hyperlink:

~~~html
<a href="#contact">Go to the contact section</a>
~~~

`href` identifies the destination. The destination can be another page, a file, a full URL, or a fragment in the current page.

Use an anchor when activating it navigates somewhere. Use a `<button>` when activating it performs an action, such as opening a dialog, submitting a form, or changing a setting.

~~~html
<a href="schedule.html">View the schedule</a>
<button type="button">Open the menu</button>
~~~

An `<a>` without `href` is not a hyperlink. Do not use an anchor just because it looks clickable.

## Make link text meaningful

Link text should describe the destination or action:

~~~html
<a href="schedule.html">View the workshop schedule</a>
~~~

Avoid link text that depends on nearby words, such as "click here" or "read more", when the destination can be described directly. People may navigate through a list of links without reading all surrounding text.

A link's visible text is also its accessible name. If an image is the only content in a link, give that image appropriate alternative text.

## Base link styling

Browsers provide default link styling, usually including an underline and a distinct color. A site can customize these styles, but links should remain recognizable in body copy.

~~~css
a {
  color: #075b9b;
  text-decoration-line: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}
~~~

Underline thickness and offset can improve readability. Do not remove the underline from text links unless another clear visual treatment keeps them recognizable.

If link and surrounding text have similar colors, keep a non-color signal such as an underline. Check contrast in every state.

## Link state pseudo-classes

CSS provides pseudo-classes for link and interaction states:

| Pseudo-class | When it matches |
| :--- | :--- |
| `:link` | An unvisited hyperlink |
| `:visited` | A hyperlink the browser considers visited |
| `:hover` | An element while a pointing device is over it |
| `:active` | An element while it is being activated |
| `:focus` | An element that currently has keyboard or programmatic focus |
| `:focus-visible` | A focused element when the browser determines a visible focus indicator is appropriate |
| `:target` | The element whose identifier matches the URL fragment |

`:link` and `:visited` match anchors that are hyperlinks. `:hover`, `:active`, and focus pseudo-classes can also match other interactive elements.

## Order the state rules

Several state pseudo-classes can match at once. For example, a link under a pointer can also be focused, and a link being activated can also be hovered. When selectors have equal specificity, later declarations in the cascade can override earlier ones.

A useful order for link styles is unvisited, visited, hover, focus, then active:

~~~css
a:link {
  color: #075b9b;
}

a:visited {
  color: #694b8e;
}

a:hover {
  color: #0a3f70;
}

a:focus-visible {
  outline: 3px solid #c4551a;
  outline-offset: 3px;
  border-radius: 0.12rem;
}

a:active {
  color: #8b2f13;
}
~~~

Keep the focus indicator distinct and visible. Do not remove the browser's outline unless you replace it with an equally visible focus style.

`:focus-visible` helps show focus when it is useful, such as during keyboard navigation. Browsers decide when it matches based on their input heuristics. Use `:focus` when you intentionally want a style whenever an element has focus.

## Hover is not enough

A hover effect only appears when a pointing device can hover. Touch users and keyboard users need other cues.

~~~css
a:hover {
  text-decoration-thickness: 0.14em;
}

a:focus-visible {
  outline: 3px solid #c4551a;
  outline-offset: 3px;
}
~~~

A hover effect can improve feedback, but it should not be the only way to discover that an item is interactive. Keep a visible link treatment at rest and a visible focus style for keyboard use.

## Visited link privacy

The `:visited` state lets a browser indicate that a destination has been visited. Browsers restrict which styles can affect visited links to protect browsing history from being exposed to scripts or other page behavior.

Keep a visited link distinguishable and readable. Do not depend on the visited style to reveal private or essential information.

~~~css
a:visited {
  color: #694b8e;
}
~~~

Color is a common way to distinguish visited links, but maintain enough contrast and do not make the state depend on color alone.

## In-page links and target

A fragment link navigates to an element with a matching ID:

~~~html
<a href="#directions">Directions</a>

<section id="directions">
  <h2>Directions</h2>
</section>
~~~

The destination can be styled with `:target` after navigation:

~~~css
section:target {
  outline: 3px solid #8bb9c3;
  outline-offset: 0.5rem;
}
~~~

`scroll-margin-block-start` can keep a target heading from sitting directly under a fixed header:

~~~css
section[id] {
  scroll-margin-block-start: 1rem;
}
~~~

Use unique IDs. A link whose fragment does not match an element cannot reach the intended section.

## Link-specific selectors

A class can describe a link's role and keep styles scoped:

~~~css
.site-nav__link {
  color: #173a4d;
  font-weight: 700;
}

.site-nav__link[aria-current="page"] {
  text-decoration-thickness: 0.18em;
  text-underline-offset: 0.25em;
}
~~~

`aria-current="page"` can identify the current page in navigation. It does not replace a working `href` on the link.

Use a specific class or container selector when the same site needs different link treatments in navigation, body copy, and cards. Avoid styling every anchor as if it served the same role.

## Common mistakes

| Mistake | Why it causes trouble | Better approach |
| :--- | :--- | :--- |
| Using an anchor for an action | The semantics promise navigation | Use a button for actions |
| Styling a link only on hover | Keyboard and touch users may not see the cue | Keep a visible base style and focus indicator |
| Removing the outline without a replacement | Keyboard focus becomes difficult to locate | Provide a clear `:focus-visible` style |
| Removing underlines from body links | Link text can blend into paragraphs | Keep an underline or another clear cue |
| Placing `:hover` after `:active` with equal specificity | Hover styling can override the active style | Order the pseudo-class rules intentionally |
| Using vague link text | The destination is unclear out of context | Describe the destination in the link text |
| Treating `:visited` as a normal unrestricted state | Browsers restrict visited styling for privacy | Use it only for readable visual feedback |

## Try it yourself

1. Style `:link` and `:visited` with distinct colors and check their contrast.
2. Add hover, focus-visible, and active styles in a deliberate order.
3. Use the keyboard to tab through links and verify the focus indicator.
4. Create a fragment link and style its destination with `:target`.
5. Replace vague link text with a clear destination description.
6. Change a link that performs an action into a button and compare its purpose.

## Key points

- Use anchors to navigate and buttons to perform actions.
- An anchor needs an `href` to create a hyperlink.
- Keep links recognizable at rest, on hover, and with keyboard focus.
- Multiple state rules can match at once, so cascade order matters.
- Visited link styling is restricted by browsers for privacy.
- Descriptive link text makes the destination clear in and out of context.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [37 - Styling tables](37-styling-tables.md) | [Q&A](../qnas/38-styling-links.md) | [Example](../examples/38-styling-links.md) | [39 - Styling forms and controls](39-styling-forms-and-controls.md) |
