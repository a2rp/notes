# 39 - Styling forms and controls - Example

This example styles a workshop preference form while keeping native controls and browser behavior. It includes visible labels, help text, a grouped radio choice, a select menu, a checkbox, focus feedback, and a disabled button.

## Question

Build a workshop preference form that:

- Uses visible labels and helpful instructions.
- Groups related radio choices with a `fieldset` and `legend`.
- Uses consistent typography, padding, and spacing.
- Keeps a clear keyboard focus indicator.
- Uses `accent-color` for native radio buttons and checkboxes.
- Shows a required field's invalid state when it is focused.
- Distinguishes an enabled button from a disabled one.

## Complete HTML

Copy the code into an HTML file and open it in a browser. The form submits only the selected workshop preferences to the same page with the GET method. It does not send or save them on a server.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Styling Forms and Controls</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      color-scheme: light;
      --ink: #1c2938;
      --muted: #526276;
      --paper: #f2f6fa;
      --surface: #fff;
      --line: #d3dee8;
      --link: #075b9b;
      --focus: #b33d18;
      --error: #a33125;
      --accent: #075b9b;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: var(--ink);
      background-color: var(--paper);
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      font-size: 1rem;
      line-height: 1.6;
    }

    .page {
      width: min(100%, 760px);
      margin-inline: auto;
    }

    .page-header,
    .form-card {
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
    }

    .page-header {
      padding: clamp(1.25rem, 4vw, 2rem);
      background-image: linear-gradient(135deg, #e7f2fb, #fff 72%);
    }

    .eyebrow {
      color: var(--muted);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    h1 {
      margin-top: 0.4rem;
      font-size: clamp(2rem, 6vw, 3rem);
    }

    h2 {
      font-size: 1.35rem;
    }

    .page-header p:last-child {
      max-width: 62ch;
      margin-top: 0.8rem;
      color: var(--muted);
    }

    .form-card {
      margin-top: 1.25rem;
      padding: clamp(1.25rem, 4vw, 2rem);
    }

    .form-card > p {
      margin-top: 0.55rem;
      color: var(--muted);
    }

    form {
      display: grid;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .form-field {
      display: grid;
      gap: 0.45rem;
      padding: 0.25rem;
      border-radius: 0.5rem;
    }

    .form-field:focus-within {
      background-color: #f5f9fc;
    }

    label,
    legend {
      font-weight: 700;
    }

    .required-mark {
      color: var(--error);
    }

    .hint {
      color: var(--muted);
      font-size: 0.92rem;
    }

    input,
    select,
    textarea,
    button {
      font: inherit;
    }

    input[type="text"],
    select {
      width: 100%;
      min-height: 2.8rem;
      padding: 0.65rem 0.75rem;
      color: var(--ink);
      background-color: #fff;
      border: 1px solid #64748b;
      border-radius: 0.4rem;
    }

    select {
      padding-right: 2.5rem;
      appearance: auto;
    }

    input[type="text"]:focus:invalid,
    select:focus:invalid {
      border-color: var(--error);
    }

    fieldset {
      display: grid;
      gap: 0.75rem;
      min-width: 0;
      padding: 1rem;
      border: 1px solid var(--line);
      border-radius: 0.65rem;
    }

    legend {
      padding-inline: 0.35rem;
    }

    .choice-list {
      display: grid;
      gap: 0.65rem;
    }

    .choice-option {
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
      width: fit-content;
      font-weight: 400;
      cursor: pointer;
    }

    .choice-option input {
      width: 1.15rem;
      height: 1.15rem;
      flex: 0 0 auto;
      margin-top: 0.2rem;
      accent-color: var(--accent);
    }

    .choice-option input:checked + span {
      color: #123f62;
      font-weight: 700;
    }

    input:focus-visible,
    select:focus-visible,
    button:focus-visible {
      outline: 3px solid var(--focus);
      outline-offset: 3px;
    }

    .form-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    button {
      min-height: 2.8rem;
      padding: 0.65rem 1rem;
      border: 1px solid transparent;
      border-radius: 0.4rem;
      font-weight: 700;
      cursor: pointer;
    }

    button[type="submit"] {
      color: #fff;
      background-color: var(--link);
      border-color: var(--link);
    }

    button[type="submit"]:hover:enabled {
      background-color: #064574;
    }

    button[type="reset"] {
      color: var(--ink);
      background-color: #fff;
      border-color: #64748b;
    }

    button:disabled {
      color: #465363;
      background-color: #d9e0e7;
      border-color: #aeb9c5;
      cursor: not-allowed;
    }

    .availability {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--line);
    }

    .availability p {
      margin-bottom: 0.65rem;
      color: var(--muted);
    }

    .page-footer {
      margin-top: 1rem;
      color: var(--muted);
      font-size: 0.9rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">CSS practice form</p>
      <h1>Workshop preferences</h1>
      <p>
        Choose a session and format. Labels remain visible, and the controls
        retain their native browser behavior.
      </p>
    </header>

    <section class="form-card" aria-labelledby="form-title">
      <h2 id="form-title">Choose your options</h2>
      <p><span class="required-mark" aria-hidden="true">*</span> Required field</p>

      <form action="" method="get">
        <div class="form-field">
          <label for="topic">
            Workshop topic <span class="required-mark" aria-hidden="true">*</span>
          </label>
          <p class="hint" id="topic-hint">For example, grid, colors, or typography.</p>
          <input
            id="topic"
            name="topic"
            type="text"
            placeholder="Enter a CSS topic"
            autocomplete="off"
            required
            aria-describedby="topic-hint"
          >
        </div>

        <div class="form-field">
          <label for="session">
            Preferred session <span class="required-mark" aria-hidden="true">*</span>
          </label>
          <p class="hint" id="session-hint">Choose one available session.</p>
          <select id="session" name="session" required aria-describedby="session-hint">
            <option value="" selected disabled>Choose a session</option>
            <option value="morning">Morning session</option>
            <option value="afternoon">Afternoon session</option>
          </select>
        </div>

        <fieldset>
          <legend>How would you like to attend?</legend>
          <div class="choice-list">
            <label class="choice-option">
              <input type="radio" name="format" value="in-person" required>
              <span>In person</span>
            </label>
            <label class="choice-option">
              <input type="radio" name="format" value="online">
              <span>Online</span>
            </label>
          </div>
        </fieldset>

        <label class="choice-option">
          <input type="checkbox" name="updates" value="yes">
          <span>Send me workshop updates</span>
        </label>

        <div class="form-actions">
          <button type="submit">Save preferences</button>
          <button type="reset">Reset choices</button>
        </div>
      </form>

      <aside class="availability" aria-labelledby="availability-title">
        <h2 id="availability-title">Another session</h2>
        <p>Registration for this session is currently unavailable.</p>
        <button type="button" disabled>Session is full</button>
      </aside>
    </section>

    <footer class="page-footer">
      <p>This static example does not save preferences on a server.</p>
    </footer>
  </main>
</body>
</html>
~~~

## Explanation

- The form uses visible labels associated with inputs through matching `for` and `id` values.
- Help text is connected to the topic and session controls with `aria-describedby`.
- The radio choices are grouped in a `fieldset` with a descriptive `legend`.
- `font: inherit` gives text controls and buttons the same font as the page.
- Text fields and the select control share a minimum height, padding, border, and width.
- The select keeps its native appearance, including a platform-provided indicator.
- `accent-color` tints the native radio buttons and checkbox without replacing their behavior.
- `:focus-visible` keeps a strong outline on controls during keyboard navigation. The field wrapper also changes subtly with `:focus-within`.
- A required invalid text field or select gets a red border when focused. The browser also provides its native validation when a person submits an incomplete form.
- The enabled submit button has a hover style. The disabled button uses `:disabled` and remains visually distinct.
- The form uses GET with only workshop preference fields and submits to the same page. It does not store or send the selection to a server.

## Expected output

The page displays a centered preference form with stacked labels and controls. The radio buttons and checkbox keep their native shape with a blue accent. Use Tab to move through the controls and see the orange focus outline. Focus an empty required field to see its invalid border. Select a session and an attendance format before submitting. The disabled “Session is full” button stays visibly unavailable.

## Try it yourself

1. Use Tab and Shift+Tab to inspect focus styling on each control.
2. Focus the empty topic field and the session menu to see the invalid border.
3. Choose a session and test the native validation when submitting without selecting an attendance format.
4. Change `--accent` and compare the checkbox and radio button colors.
5. Remove the `font: inherit` rule and compare control typography.
6. Change the select to `appearance: none` and list the visual details you would need to recreate.
7. Resize the browser and confirm the form still fits narrow screens.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [38 - Styling links and link states](../lessons/38-styling-links.md) | [Lesson](../lessons/39-styling-forms-and-controls.md) | [Q&A](../qnas/39-styling-forms-and-controls.md) | [40 - Replaced elements, aspect ratios, and object fitting](../lessons/40-replaced-elements-and-object-fitting.md) |