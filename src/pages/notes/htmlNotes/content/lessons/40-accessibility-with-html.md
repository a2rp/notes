# 40 - Accessibility with native HTML

Accessible HTML helps people understand page content and operate controls with different devices and assistive technologies. A strong starting point is to use HTML elements according to their purpose, provide useful text alternatives, and connect form controls to clear labels.

This chapter brings together native HTML techniques from earlier lessons. It focuses on document structure, images, links, forms, tables, language, and keyboard use. The next chapter explains how ARIA can supplement HTML when a specific need remains.

## What you will learn

- How native HTML semantics support accessibility
- Why source order and heading structure matter
- How to choose useful text alternatives for images
- How to give links and controls clear names
- How labels and field groups make forms easier to use
- How table headers and captions communicate data relationships
- How native controls support keyboard interaction
- How to review a page for common HTML accessibility problems

## Start with the right HTML element

HTML elements communicate what content is and what a control does. Browsers expose much of this information to assistive technologies and provide built-in interaction behavior for native controls.

Use elements according to their purpose:

- Use headings for headings and paragraphs for prose.
- Use lists for groups of related items.
- Use `<a href="...">` for navigation to a destination.
- Use `<button>` for an action.
- Use native form controls such as `<input>`, `<select>`, and `<textarea>` for user input.
- Use `<main>`, `<nav>`, `<section>`, `<article>`, and related elements for the page structures they represent.

A generic element styled to look like a control does not automatically get the meaning or behavior of the real control:

~~~html
<!-- A native button can be reached and activated with a keyboard. -->
<button type="button">Show details</button>

<!-- This generic element is not automatically a button. -->
<div class="button-like">Show details</div>
~~~

A native button is focusable and supports standard keyboard activation. The generic `<div>` would require extra code to provide its role, focus behavior, keyboard support, state, and action. Prefer the native element when it fits.

## Structure content in a clear reading order

A meaningful source order helps users follow the page. Place content in an order that makes sense when read from the beginning, then use CSS to change its visual arrangement if needed.

Use headings to show the relationships between topics. A typical page uses one `<h1>` for its main topic, `<h2>` for major sections, and `<h3>` for nested topics. Do not choose heading levels to get a certain font size. Chapter 39 covers heading hierarchy and landmarks in more detail.

~~~html
<h1>Planning a small garden</h1>

<h2>Choose a location</h2>
<p>Look for a place with enough light and access to water.</p>

<h2>Select plants</h2>
<p>Choose varieties that fit the available space.</p>

<h3>Herbs for beginners</h3>
<p>Mint and parsley are useful plants to start with.</p>
~~~

A page can look different from its source order, but users who read the document linearly still need a sensible sequence. Do not rely only on visual position, color, or indentation to communicate relationships.

## Provide useful text alternatives for images

The `alt` attribute gives a text alternative for an image. Write it according to the image's purpose in its context, not just a list of visual details.

### Informative image

If an image conveys information that is not already available nearby, describe the important information:

~~~html
<img src="garden-bed.jpg" alt="Raised garden bed with rows of lettuce and carrots">
~~~

Keep the description concise and relevant. Do not start every alternative with "Image of" because assistive technologies already identify the image.

### Decorative image

If an image adds no information and is purely decorative, use an empty `alt` value:

~~~html
<img src="leaf-divider.svg" alt="">
~~~

Do not omit the `alt` attribute from an `<img>`. An omitted value can cause the file name or URL to be announced instead of a useful alternative.

### Functional image

If an image is the only content inside a link or button, its alternative should explain the destination or action:

~~~html
<a href="/">
  <img src="garden-logo.svg" alt="City Garden home">
</a>
~~~

If a linked image sits beside text that already names the same destination, the image can use `alt=""` to avoid repeating the link name.

## Make links and controls understandable

Link text should make the destination clear, including when a person encounters the link outside its surrounding paragraph.

~~~html
<!-- Unclear destination -->
<a href="/watering">Click here</a>

<!-- Clear destination -->
<a href="/watering">Read the watering guide</a>
~~~

Use a link with a real `href` for navigation. Use a button for an action such as opening or closing a control or submitting a form. Do not use placeholder links such as `href="#"` as fake buttons.

A button needs a clear name that describes its action. Inside a form, specify its `type` so its behavior is clear:

~~~html
<button type="submit">Subscribe</button>
<button type="button">Show password</button>
~~~

A button associated with a form defaults to submitting it when its type is omitted. `type="button"` is appropriate for a button that performs another action.

## Give every form control a label

A visible label tells users what information a control needs. Associate a `<label>` with the control using matching `for` and `id` values:

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email" required>
~~~

The label's `for` value must match the control's `id`. This association helps assistive technologies identify the field and makes the label clickable to focus or activate the control.

Placeholder text is not a replacement for a label. It may disappear as someone types and may be difficult to see. Keep a visible label, and use placeholder text only for an optional example or hint.

Group related controls with `<fieldset>` and describe the group with `<legend>`:

~~~html
<fieldset>
  <legend>Preferred contact method</legend>

  <label>
    <input type="radio" name="contact" value="email">
    Email
  </label>

  <label>
    <input type="radio" name="contact" value="phone">
    Phone
  </label>
</fieldset>
~~~

Use labels and instructions to explain required fields and expected formats. Do not rely only on color, position, or a placeholder to communicate what a control needs.

## Mark up data tables with headers

Use tables for data that has a real row and column relationship. Do not use a table just to position page content.

A simple data table can identify its topic with `<caption>`, its header cells with `<th>`, and its data cells with `<td>`:

~~~html
<table>
  <caption>Weekly garden workshop schedule</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Workshop</th>
      <th scope="col">Start time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Tuesday</th>
      <td>Starting seeds</td>
      <td>10:00 a.m.</td>
    </tr>
    <tr>
      <th scope="row">Thursday</th>
      <td>Container gardening</td>
      <td>2:00 p.m.</td>
    </tr>
  </tbody>
</table>
~~~

The `scope` attribute identifies whether a header applies to a row or a column. This lets assistive technologies provide the header context as users move through the data cells. More complex tables may need additional associations, which are covered in the table lessons.

## Preserve native keyboard behavior

Links and form controls have built-in keyboard support. Let users reach them with the normal tab order and operate them with the keys expected for that control. Avoid replacing a native link or button with a `<div>` or `<span>`.

Do not assign positive `tabindex` values to force a custom tab order. This can make the keyboard sequence differ from the order of the document. Arrange the HTML in a sensible reading order and rely on native focus order where possible.

A visible focus indicator helps keyboard users see which control is active. Do not remove focus styling unless an equally clear alternative is provided. Focus appearance is usually controlled with CSS, while native HTML supplies the control's identity and behavior.

## Identify the document's language

Set the primary language on the root `<html>` element:

~~~html
<html lang="en">
~~~

A correct language helps assistive technologies select suitable pronunciation rules. If a passage changes language, mark that passage with its own `lang` value:

~~~html
<p>The French phrase <span lang="fr">bonjour</span> means hello.</p>
~~~

Chapter 42 covers language, text direction, and international content in more depth.

## Putting the techniques together

This example combines landmarks, useful alternative text, clear links, labeled form controls, and a structured data table:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>City Garden workshops</title>
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>

    <header>
      <a href="/">
        <img src="city-garden-logo.svg" alt="City Garden home">
      </a>
    </header>

    <nav>
      <ul>
        <li><a href="/plants">Plants</a></li>
        <li><a href="/workshops">Workshops</a></li>
      </ul>
    </nav>

    <main id="main-content">
      <h1>City Garden workshops</h1>
      <p>Join a practical workshop and learn by growing.</p>

      <section>
        <h2>Upcoming schedule</h2>
        <table>
          <caption>Workshop dates and topics</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Topic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Tuesday, November 24</th>
              <td>Starting seeds</td>
            </tr>
            <tr>
              <th scope="row">Thursday, November 26</th>
              <td>Container gardening</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Ask about a workshop</h2>
        <form action="/workshop-question" method="post">
          <p>
            <label for="name">Your name</label>
            <input id="name" name="name" autocomplete="name" required>
          </p>

          <p>
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </p>

          <p>
            <label for="question">Your question</label>
            <textarea id="question" name="question" rows="4"></textarea>
          </p>

          <button type="submit">Send question</button>
        </form>
      </section>
    </main>

    <footer>
      <p>City Garden workshops</p>
    </footer>
  </body>
</html>
~~~

Each control has a text label, each table header is marked as a header, and the main content can be reached from the skip link. A browser or assistive technology can use the native structure, while CSS can control the visual design.

## Common mistakes

### Using a generic element as an interactive control

A styled `<div>` does not automatically receive the keyboard support or control semantics of a native button. Use `<button>` for actions and `<a href="...">` for navigation.

### Omitting image alternative text

Every `<img>` needs an `alt` value. Describe informative images, describe the purpose of functional images, and use `alt=""` for decorative images.

### Using placeholder text as the only form label

A placeholder disappears as someone enters text and does not replace a visible label. Use `<label>` with an explicit `for` and matching control `id`.

### Communicating information only through appearance

Do not rely only on color, font size, position, or bold text to show meaning. Mark the information with appropriate HTML and provide text where needed.

### Making data tables understandable only visually

Use `<th>` for header cells, `<td>` for data cells, and a `<caption>` when it helps identify the table. Use `scope` for straightforward row and column relationships.

### Forcing keyboard order with positive `tabindex`

Positive values can cause focus to move in a sequence that does not match the document. Prefer a sensible source order and native focus behavior.

## Try it yourself

1. Inspect a page and list its native headings, landmarks, links, buttons, and form controls.
2. Replace a fake button or fake link with the correct native element.
3. Add an informative image with concise alt text and a decorative image with an empty alt value.
4. Add visible labels to a form's text field, select, checkbox, and textarea.
5. Group related radio buttons using `<fieldset>` and `<legend>`.
6. Create a data table with a caption, column headings, row headings, and appropriate `scope` values.
7. Add a skip link and confirm that its fragment matches a unique `id` on the main content.
8. Set the document language and mark a phrase in another language.
9. Read the HTML in source order and decide whether its content would still make sense without visual styling.
10. Review a page without a mouse. Check that each link and control can be reached and used with the keyboard.

## Key points

- Native HTML gives browsers and assistive technologies meaningful structure and built-in control behavior.
- Source order, headings, and landmarks help people follow and navigate the content.
- Image alternatives depend on whether an image is informative, decorative, or functional.
- Links need clear destinations, and controls need clear names and native semantics.
- Form controls need labels, and related controls may need a fieldset and legend.
- Data tables need headers and cells marked up according to their relationships.
- Set the document language with `lang`.
- Accessibility needs to be considered across the complete page, not only in one element.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [39 - Landmarks, headings, and accessible page navigation](39-landmarks-and-page-navigation.md) | [Q&A](../qnas/40-accessibility-with-html.md) | [Example](../examples/40-accessibility-with-html.md) | [41 - ARIA in HTML: when and how to use it](41-aria-in-html.md) |
