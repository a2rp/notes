# 43 - Details and summary

The `<details>` and `<summary>` elements create a native disclosure: a control that shows or hides additional information. The browser supplies the basic interaction and open or closed state, so this pattern often needs no JavaScript or ARIA.

## What you will learn

- How `<details>` and `<summary>` work together
- How to choose a clear summary label
- How the Boolean `open` attribute sets the initial state
- How to group disclosures with the `name` attribute
- How to use disclosures for FAQs and optional supporting information
- What the `toggle` event can be used for
- When a disclosure is the wrong interface pattern

## A first disclosure

A `<details>` element contains a `<summary>` followed by the information that can be disclosed:

~~~html
<details>
  <summary>Opening hours</summary>
  <p>The garden is open from 9 a.m. to 5 p.m. every day.</p>
</details>
~~~

The summary remains visible. Activating it opens or closes the additional content. Browsers display a marker, often a small triangle, to show the disclosure state.

The `<summary>` should be the first child of `<details>`. Use a summary that tells people what they will find when they open the disclosure. A vague label such as "More" does not explain what the hidden content contains.

~~~html
<!-- Unclear -->
<details>
  <summary>More</summary>
  <p>Our return window is 30 days from the purchase date.</p>
</details>

<!-- Clear -->
<details>
  <summary>What is the return window?</summary>
  <p>Our return window is 30 days from the purchase date.</p>
</details>
~~~

## What the browser provides

A native disclosure includes several useful features:

- The browser displays the summary while the details are closed or open.
- Activating the summary toggles the disclosure.
- The disclosure can be reached and operated with a keyboard.
- The browser exposes its interactive state to accessibility APIs.
- The `open` attribute reflects whether its content is currently shown.

You do not need to recreate these features with a clickable `<div>`, an event handler, or a manually maintained `aria-expanded` attribute. Use the native elements when a disclosure is the right pattern.

## Control the initial state with `open`

By default, the additional information is hidden. Add the Boolean `open` attribute to show it when the page first loads:

~~~html
<details open>
  <summary>Shipping information</summary>
  <p>Orders are usually delivered within three business days.</p>
</details>
~~~

`open` is a Boolean attribute. Its presence means open, and its absence means closed. These examples are all open because the attribute is present:

~~~html
<details open>...</details>
<details open="">...</details>
<details open="open">...</details>
~~~

This is still open:

~~~html
<details open="false">
  <summary>Read the policy</summary>
  <p>The details are visible because the attribute is present.</p>
</details>
~~~

Writing `false` as the value does not turn a Boolean attribute off. Remove the `open` attribute to start closed.

Choose the initial state based on the content and task. Keep essential information visible when people need it to complete the main task. A disclosure is useful for optional or supporting information that benefits from a compact presentation.

## Make a group of exclusive disclosures

Give multiple `<details>` elements the same non-empty `name` value to put them in a group. The browser allows only one member of that group to be open at a time:

~~~html
<h2>Common questions</h2>

<details name="garden-faq">
  <summary>When should I water seedlings?</summary>
  <p>Check the soil regularly and water when its surface begins to dry.</p>
</details>

<details name="garden-faq">
  <summary>How much sunlight do tomatoes need?</summary>
  <p>Tomatoes generally grow best in a sunny location.</p>
</details>

<details name="garden-faq">
  <summary>Can I grow herbs in a container?</summary>
  <p>Yes. Choose a container with drainage and enough room for the roots.</p>
</details>
~~~

Opening one disclosure closes another disclosure with the same `name`. Disclosures without a `name`, or with different names, can stay open independently.

The `name` attribute makes an exclusive accordion-like group. Use it only when having one answer open at a time is useful. If readers need to compare multiple answers at once, leave the disclosures ungrouped.

If a group needs an item open on initial page load, add `open` to that item only. Avoid marking multiple members of the same group open in the initial markup.

## Use details for appropriate content

A disclosure works well when users can decide whether to reveal a clearly identified piece of supporting content. Common uses include:

- Frequently asked questions
- Additional shipping or return information
- Optional instructions
- Supporting explanations or definitions
- Extra details that are useful but not required for everyone

Keep the summary meaningful on its own. People should not have to open every item to understand what each one contains.

A disclosure is not a general replacement for every interactive pattern. Do not use `<details>` to imitate:

- A tab interface that switches between related panels
- A navigation menu or list of links
- A modal dialog or confirmation prompt
- Footnotes that should be read in the surrounding text

Choose an element and interaction that match the task. Chapter 44 covers the `<dialog>` element for dialogs.

## Nesting disclosures

A disclosure can contain other flow content, including another `<details>` element. Nest them only when the content really has a hierarchy and the labels make the relationship clear:

~~~html
<details>
  <summary>Plant care</summary>
  <p>General care information for this plant.</p>

  <details>
    <summary>Winter care</summary>
    <p>Move the container away from freezing temperatures.</p>
  </details>
</details>
~~~

Deeply nested disclosures can make information hard to find. Prefer a simple structure and avoid making people open several layers to reach important content.

## Listen for a state change

When the disclosure changes between open and closed, the browser fires a `toggle` event on the `<details>` element. A script can listen for this event if it needs to respond to the change, such as recording that a section was opened.

~~~html
<details id="shipping-details">
  <summary>Shipping information</summary>
  <p>Orders are usually delivered within three business days.</p>
</details>
~~~

The markup already creates a working disclosure. A `toggle` listener is only needed when the page has an additional task to perform after the state changes. When several toggles happen quickly, browsers may combine them before dispatching the event.

## A complete FAQ example

This page uses clear summaries and groups the questions so only one answer can be open at a time:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden workshop questions</title>
  </head>
  <body>
    <main>
      <h1>Garden workshop questions</h1>
      <p>Open a question to read its answer.</p>

      <details name="workshop-questions">
        <summary>Do I need to bring any tools?</summary>
        <p>No. The workshop provides the tools you will need.</p>
      </details>

      <details name="workshop-questions">
        <summary>Can beginners attend?</summary>
        <p>Yes. The activities are designed for people who are new to gardening.</p>
      </details>

      <details name="workshop-questions">
        <summary>What should I wear?</summary>
        <p>Wear comfortable clothes that you do not mind getting dirty.</p>
      </details>
    </main>
  </body>
</html>
~~~

The document language is declared, the page has a main heading, and each summary clearly describes its answer. The disclosure interaction works without JavaScript.

## Common mistakes

### Putting `<summary>` outside `<details>`

A `<summary>` has its disclosure meaning as a child of `<details>`. Put it first inside the details element.

### Using a vague summary

A person should be able to decide whether to open an item from its summary. Name the topic or question directly.

### Treating `open` as a true-or-false text value

`open="false"` is still open because the Boolean attribute exists. Remove the attribute for the closed state.

### Replacing the native disclosure with a generic element

A clickable generic element does not automatically get a disclosure's state, keyboard behavior, or accessibility semantics. Prefer `<details>` and `<summary>` when the interaction is a disclosure.

### Adding redundant ARIA state

The browser already exposes the native disclosure and its current state. Avoid adding a second state attribute that might disagree with the actual `open` state.

### Grouping everything into one exclusive accordion

If readers benefit from comparing several answers at once, exclusive grouping makes that harder. Add the same `name` only when opening one item should close the others.

### Hiding essential instructions

Do not make required instructions available only after someone opens an item if users need them to complete the task. Keep important content visible or place it in a clearly presented location.

## Try it yourself

1. Create a `<details>` element with a clear first-child `<summary>` and a short answer.
2. Add `open` and observe the initial state. Remove it to start closed.
3. Try `open="false"` and explain why the element is still open.
4. Create three FAQ disclosures with the same `name` and open them one at a time.
5. Remove the `name` values and compare the behavior.
6. Write summaries that make sense without reading the hidden answers.
7. Put essential instructions outside the disclosure and optional help inside it.
8. Use a keyboard to focus and toggle each disclosure.
9. Inspect the open and closed states in the browser's accessibility information.
10. Decide whether a sample interface is a disclosure, a tab set, a menu, or a dialog, then choose the matching pattern.

## Key points

- `<details>` creates a native disclosure widget, and `<summary>` labels it.
- The summary should be the first child of its details element and should clearly describe the hidden content.
- The Boolean `open` attribute controls the initial and current visible state. If present, the disclosure is open, even if its text value is `false`.
- Matching non-empty `name` values create a group where only one details element can be open at a time.
- Native disclosure behavior includes keyboard interaction and an exposed state. Avoid rebuilding it with generic elements or redundant ARIA.
- Use disclosures for optional supporting information, not for tabs, menus, dialogs, or footnotes.
- Add scripting only when the page needs extra behavior beyond the built-in disclosure.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [42 - Language, text direction, and international content](42-language-and-text-direction.md) | [Q&A](../qnas/43-details-and-summary.md) | [Example](../examples/43-details-and-summary.md) | [44 - Dialog elements](44-dialog-element.md) |