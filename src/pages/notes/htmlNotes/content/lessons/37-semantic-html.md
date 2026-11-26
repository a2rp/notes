# 37 - Semantic HTML and page structure

Semantic HTML means choosing elements that describe the purpose of the content they contain. A heading is marked as a heading, a list as a list, and an action as a button. The markup communicates what the content is, while CSS controls how it looks.

This chapter explains how to think about meaning when writing HTML, how semantic and generic elements differ, and how to choose between common elements. The next chapter looks more closely at the elements used to organize a whole page.

## What you will learn

- What semantics means in HTML
- Why meaning should come from HTML rather than visual styling
- How semantic elements differ from generic `div` and `span` elements
- How to choose elements for headings, emphasis, links, and actions
- How native HTML semantics help browsers and assistive technologies
- Common semantic markup mistakes and how to improve them

## What does semantic HTML mean?

Semantics is the meaning or purpose of something. In HTML, an element gives the content inside it a role. For example, `<h1>` identifies a top-level heading, `<p>` identifies a paragraph, and `<ul>` with `<li>` elements identifies a list.

~~~html
<h1>Preparing for a hike</h1>
<p>Check the weather before leaving.</p>
<ul>
  <li>Water</li>
  <li>First-aid kit</li>
</ul>
~~~

These elements describe the content even if a stylesheet changes their appearance. A heading can be styled to look small, and a paragraph can be styled to look large, but their HTML meaning remains the same.

A browser parses HTML into a document structure. Browsers and assistive technologies can use element semantics as part of how they expose and navigate that document. Semantic markup also makes source code easier for people to understand and maintain. It does not automatically make every page accessible or guarantee a search ranking. Content, labels, interaction, and implementation still matter.

## Meaning and appearance are different

HTML should identify what the content means. CSS should control visual presentation such as color, spacing, borders, font size, and layout.

For example, do not choose a heading just because its default text is large. Use the heading level that describes the content's place in the document, then use CSS if you need a different visual size.

~~~html
<h2>Shipping details</h2>
~~~

If this heading needs to appear smaller, CSS can change its size without changing its role. Conversely, making a `<div>` look exactly like a heading does not give it heading semantics:

~~~html
<div class="large-text">Shipping details</div>
~~~

The second example is only a generic container with styled text. A stylesheet can change appearance, but it cannot by itself turn that element into a real heading.

## Semantic elements and generic elements

Many HTML elements have a defined purpose. Examples include headings, paragraphs, lists, links, form controls, and table elements. Choose one when it matches the content or behavior.

`<div>` and `<span>` are generic containers. They do not describe a special kind of content by themselves:

- `<div>` is a generic container for flow content.
- `<span>` is a generic container for phrasing content, usually a short part of text.

They are useful when you need a container for styling, scripting, or grouping and no more specific HTML element fits. They are not wrong, but using them for every part of a page throws away meaning that a better element could provide.

~~~html
<p>Your order will arrive on <time datetime="2026-11-25">November 25</time>.</p>
<p>Read the <a href="/returns">return policy</a>.</p>
~~~

Here, `<time>` identifies a date, and `<a>` identifies a link to a destination. Their purpose is apparent from the HTML itself.

## Choose an element by the job it does

A useful question is: "What is this content or control for?" Choose the element that answers that question.

| Content or purpose | HTML element to consider |
| --- | --- |
| A heading for a section of content | `<h1>` through `<h6>` |
| A paragraph of prose | `<p>` |
| A group of related list items | `<ul>` or `<ol>` with `<li>` |
| A link to another location | `<a href="...">` |
| An action the user can perform | `<button>` |
| Text with stress emphasis | `<em>` |
| Content with strong importance | `<strong>` |
| A date or time | `<time datetime="...">` |
| A generic grouping with no more specific meaning | `<div>` or `<span>` |

This is a guide, not a replacement for checking the element's full definition. Some elements have specific content and nesting rules.

### Headings describe the document structure

Use heading elements for headings, in a logical order that reflects the content. Do not select a heading level just to get a particular font size, and do not use bold text in place of a heading when the text actually introduces a section.

~~~html
<h1>Garden care</h1>
<h2>Watering</h2>
<p>Check the soil before watering.</p>
<h2>Pruning</h2>
<p>Remove damaged branches with clean tools.</p>
~~~

Heading levels express hierarchy. CSS can style each level independently. The details of page landmarks and sectioning elements are covered in the next chapters.

### Emphasis and importance describe meaning

`<em>` marks stress emphasis that can affect the meaning of a sentence. `<strong>` marks content with strong importance, seriousness, or urgency. Browsers commonly display them in italics and bold, respectively, but that appearance is not their purpose.

~~~html
<p>I asked for the <em>blue</em> folder, not the green one.</p>
<p><strong>Warning:</strong> Disconnect the power before opening the case.</p>
~~~

Use CSS when the only goal is to change appearance. Use semantic text elements when the meaning they represent is present. Chapter 12 discusses text semantics in more depth.

### Links and buttons do different jobs

A link navigates to a destination. A button performs an action in the current interface, such as opening a dialog, submitting a form, or toggling a control.

~~~html
<a href="/account">View your account</a>
<button type="button">Show password</button>
~~~

Do not use an anchor with `href="#"` as a substitute for a button, and do not use a button when the user should navigate to a real URL. Choose the element whose built-in role matches the interaction. Chapters 15 and 33 cover links and buttons in more detail.

## Native semantics are a useful starting point

A semantic HTML element gives the browser a standard role and, for many controls, standard behavior. For example, a real button can receive keyboard focus and be activated using the keyboard. A link with a valid `href` exposes a destination and supports browser navigation features.

When a suitable native HTML element exists, use it before building a custom element out of generic containers and ARIA attributes. Custom controls require additional work to provide the expected role, accessible name, focus behavior, keyboard support, and state. Native HTML provides a strong starting point, though the surrounding content and implementation still need care.

~~~html
<!-- Native button with built-in button semantics -->
<button type="button">Add to favorites</button>

<!-- Generic text does not become a button just because it looks clickable -->
<div class="button-like">Add to favorites</div>
~~~

The second element needs extra code to behave like a control. It also lacks the native button semantics and keyboard behavior by default.

ARIA can add or refine accessibility information when needed, but it does not automatically add behavior. Do not add an ARIA role that conflicts with an element's native role, or use ARIA as a substitute for a native element that already fits.

## A practical decision process

Before choosing an element, work through these questions:

1. What is this content, or what does this control do?
2. Is there an HTML element whose built-in meaning matches that purpose?
3. Does the chosen element fit the content and nesting rules?
4. Does an interactive element have a clear label and work with a keyboard?
5. Am I choosing this element for its meaning, or only for its default appearance?

For example, if a line introduces the following content, use a heading. If it sends the user to another page, use a link. If it changes something on the current page, use a button. Then style these elements as needed with CSS.

## Common mistakes

### Using generic containers for everything

~~~html
<div>Weekly specials</div>
<div>Fresh bread is available today.</div>
<div>Read the menu</div>
~~~

Choose elements that match the content and behavior:

~~~html
<h2>Weekly specials</h2>
<p>Fresh bread is available today.</p>
<a href="/menu">Read the menu</a>
~~~

### Using headings only to make text large

A heading changes the document structure. Use CSS to adjust text size while keeping the correct element for the content.

### Using bold or italic appearance as the only reason for a semantic element

Do not use `<strong>` only because you want bold text, or `<em>` only because you want italic text. Choose them when the content has importance or stress emphasis. Use CSS for purely visual styling.

### Making a fake button from a `div`

A `div` does not become a native button when it is styled to look clickable. Use `<button>` for an action and `<a href="...">` for navigation.

### Adding ARIA without checking native HTML

Extra ARIA does not make incorrect HTML correct. First choose the right native element. Add ARIA only when a specific accessibility need remains and you understand the required interaction behavior.

## Try it yourself

1. Write a short page with one main heading, two subheadings, and paragraphs under each subheading.
2. Add a three-item list using the correct list elements.
3. Add one link to another page and one button for an action. Explain why they use different elements.
4. Mark a date with `<time>` and include a machine-readable `datetime` value.
5. Find a `div` or `span` that could be replaced by a more meaningful element. Make the change and explain what meaning the markup now conveys.
6. Style a heading and paragraph with CSS so their sizes look similar. Confirm that their HTML meanings are still different.
7. Review an interactive control built from a generic element. Replace it with a suitable native element and list the behavior you no longer need to recreate yourself.

## Key points

- Semantic HTML describes the meaning and purpose of content and controls.
- HTML meaning and visual presentation are separate. Use CSS to control appearance.
- Prefer a specific semantic element when it matches the content or behavior.
- Use `div` and `span` as generic containers when no more meaningful element fits.
- Use links for navigation and buttons for actions.
- Native HTML provides standard semantics and behavior, but good accessibility still depends on the whole implementation.
- ARIA can supplement HTML semantics, but does not automatically provide native behavior.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [36 - Autocomplete and autofill](36-autocomplete-and-autofill.md) | [Q&A](../qnas/37-semantic-html.md) | [Example](../examples/37-semantic-html.md) | [38 - Header, navigation, main, section, article, and footer](38-page-structure-elements.md) |
