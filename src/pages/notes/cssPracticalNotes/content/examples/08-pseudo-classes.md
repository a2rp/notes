# 08 - Pseudo-classes: Example

## Goal

Create a small interactive page that uses pseudo-classes for focus, form state, element position, and relationships. The styles respond to existing HTML state. They do not implement the page's behavior.

## Complete example

Copy the complete document into a file named `index.html`, then open it in a browser. Use Tab to move through the controls and link, check the checkbox, and follow the in-page link to see the different states.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pseudo-class Playground</title>
  <style>
    * {
      box-sizing: border-box;
    }

    :root {
      color-scheme: light;
    }

    body {
      margin: 0;
      padding: 2rem;
      background-color: #f1f5f9;
      color: #1e293b;
      font-family: Arial, sans-serif;
    }

    .page {
      max-width: 46rem;
      margin: 0 auto;
      padding: 1.5rem;
      background-color: white;
      border: 1px solid #cbd5e1;
    }

    :where(.page, .card) {
      border-radius: 0.75rem;
    }

    :is(h1, h2) {
      color: #173b68;
    }

    p,
    label {
      line-height: 1.6;
    }

    a:any-link {
      color: #1d4ed8;
    }

    a:hover {
      text-decoration-thickness: 0.15em;
    }

    .signup {
      margin: 1.5rem 0;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
    }

    .signup:focus-within {
      border-color: #7c3aed;
    }

    .signup label {
      display: block;
      margin-bottom: 1rem;
    }

    input[type="email"] {
      display: block;
      width: 100%;
      max-width: 24rem;
      margin-top: 0.35rem;
      padding: 0.65rem;
      border: 1px solid #94a3b8;
      border-radius: 0.35rem;
    }

    input[type="email"]:required:valid {
      border-color: #15803d;
    }

    input[type="checkbox"]:checked {
      accent-color: #15803d;
    }

    a:focus-visible,
    input:focus-visible,
    button:focus-visible {
      outline: 3px solid #7c3aed;
      outline-offset: 3px;
    }

    button {
      margin: 0.25rem 0.5rem 0.25rem 0;
      padding: 0.6rem 0.9rem;
      border: 0;
      border-radius: 0.35rem;
      background-color: #1d4ed8;
      color: white;
    }

    button:not(:disabled) {
      cursor: pointer;
    }

    button:not(:disabled):hover {
      background-color: #1e40af;
    }

    button:not(:disabled):active {
      transform: translateY(1px);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .card {
      margin-top: 1.25rem;
      padding: 1rem;
      border: 1px solid #cbd5e1;
    }

    .card:has(> .status) {
      border-left: 0.35rem solid #0f766e;
    }

    .status {
      color: #0f766e;
      font-weight: bold;
    }

    .tasks li {
      padding: 0.5rem;
    }

    .tasks li:nth-child(even) {
      background-color: #e2e8f0;
    }

    .tasks li:first-child {
      font-weight: bold;
    }

    #details:target {
      background-color: #fef3c7;
      border-color: #d97706;
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>Pseudo-class Playground</h1>
    <p>Use the form and links to see how selectors respond to element state.</p>

    <nav>
      <a href="#details">Jump to details</a>
    </nav>

    <form class="signup">
      <h2>Account settings</h2>
      <label>
        Email address
        <input type="email" name="email" value="amaya@example.test" required>
      </label>
      <label>
        <input type="checkbox" name="updates" checked>
        Receive learning updates
      </label>
      <button type="button">Enabled button</button>
      <button type="button" disabled>Unavailable action</button>
    </form>

    <section class="card">
      <h2>Featured profile</h2>
      <p class="status">Profile is ready</p>
      <p>This card has a direct child with the status class.</p>
    </section>

    <section class="card">
      <h2>Task list</h2>
      <ul class="tasks">
        <li>Read the lesson</li>
        <li>Try the selectors</li>
        <li>Review the results</li>
        <li>Save your notes</li>
      </ul>
    </section>

    <section class="card" id="details">
      <h2>Details</h2>
      <p>Follow the link above to make this section the current target.</p>
    </section>
  </main>
</body>
</html>
```

## Expected output

The browser displays a centered white page with an account form, a featured profile, an alternating task list, and a details section.

- The headings share the same dark blue style because they are matched by `:is(h1, h2)`.
- The page and cards have rounded corners from the low-specificity `:where()` rule.
- The valid required email field has a green border.
- The checked checkbox uses a green accent.
- The form border turns purple while one of its controls has focus.
- Keyboard focus has a visible purple outline when you tab to the link, inputs, or enabled buttons.
- The enabled button darkens on hover and moves slightly while active. The disabled button stays dim and does not get the enabled-button pointer treatment.
- The profile card has a teal left edge because it contains a direct child with the `status` class.
- The second and fourth task items have a pale background, and the first task is bold.
- After following â€œJump to details,â€ the details section gets a pale yellow background and an orange border because it matches `:target`.

## How each pseudo-class works

### Focus and form states

```css
.signup:focus-within { ... }
input[type="email"]:required:valid { ... }
input[type="checkbox"]:checked { ... }
```

`:focus-within` matches the form while one of its descendants has focus. The email selector combines an input type with two states, so the green border applies only while the required email input is valid. `:checked` matches the checked checkbox.

The checked state is already present in the HTML. CSS reflects that state; it does not check or uncheck the control.

### Keyboard focus, hover, and activation

```css
a:focus-visible,
input:focus-visible,
button:focus-visible { ... }

button:not(:disabled):hover { ... }
button:not(:disabled):active { ... }
```

`:focus-visible` provides a visible indicator for focus when appropriate. The `:not(:disabled)` condition keeps hover and active styling limited to enabled buttons. Hover and active are pointer feedback; focus styling supports keyboard use.

### Structural position

```css
.tasks li:nth-child(even) { ... }
.tasks li:first-child { ... }
```

`:nth-child(even)` matches the second and fourth list items. `:first-child` matches the first element child in the list.

### Related elements

```css
.card:has(> .status) { ... }
```

`:has()` matches a card when a direct child matches `.status`. Only the featured profile card meets that condition.

### URL fragment target

```css
#details:target { ... }
```

The section is the target when the current URL fragment is `#details`, such as after following the in-page link.

### Grouped selector arguments

```css
:is(h1, h2) { ... }
:where(.page, .card) { ... }
```

`:is()` groups heading alternatives into one rule. `:where()` groups the page and card classes, but contributes zero specificity, so the rule is easy to override.

## Try these changes

1. Use Tab to move focus through the in-page link and form controls. Confirm the focus outline remains visible.
2. Click the checkbox to toggle its checked state and observe the accent.
3. Change the email value to `not-an-email`. The input stops matching `:valid` and loses its green border.
4. Remove `required` from the email field. It no longer matches `:required:valid`.
5. Add `class="status"` to a direct child of the task-list card. That card receives the teal left edge.
6. Wrap the status paragraph in another element. It is no longer a direct child, so `.card:has(> .status)` does not match that card.
7. Follow the details link, then remove `:target` from the CSS and compare the section.
8. Change `:nth-child(even)` to `:nth-child(odd)` and observe which list items receive the background.
9. Temporarily remove the disabled attribute from the unavailable button to see its enabled, hover, and focus styles.

## Key points

- Pseudo-classes select elements by state, position, or relationship.
- Form and interaction pseudo-classes reflect actual HTML and user states.
- `:nth-child()` counts element siblings, while `:nth-of-type()` counts siblings of the same type.
- `:is()`, `:where()`, `:not()`, and `:has()` group, exclude, or relate selector matches.
- Keep keyboard focus visible and do not make hover the only way to access important content.
- The `:target` pseudo-class matches the element identified by the current URL fragment.
- CSS shows states but does not implement application behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [07 - Attribute selectors](../examples/07-attribute-selectors.md) | [Lesson](../lessons/08-pseudo-classes.md) | [Q&A](../qnas/08-pseudo-classes.md) | [09 - Pseudo-elements](09-pseudo-elements.md) |
