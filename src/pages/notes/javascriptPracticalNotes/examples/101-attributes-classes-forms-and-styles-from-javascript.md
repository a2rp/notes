# 101 - Attributes, classes, forms, and styles from JavaScript: Example

## Goal

Create a profile preview form. As the form changes, JavaScript updates the preview's text, a visibility attribute, a state class, and an inline CSS custom property.

## Complete example

Save this as an HTML file and open it in a browser. The source is displayed here in Markdown.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profile preview</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: min(100%, 42rem);
      margin-inline: auto;
    }

    form {
      display: grid;
      gap: 1rem;
      margin-block: 1.5rem;
    }

    label {
      display: grid;
      gap: 0.4rem;
    }

    input,
    select,
    button {
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      font: inherit;
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .checkbox-row input {
      min-height: auto;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .preview {
      --accent-color: #2457c5;
      padding: 1.5rem;
      border: 1px solid currentColor;
      border-top: 0.4rem solid var(--accent-color);
      border-radius: 0.75rem;
    }

    .preview.is-compact {
      padding: 0.75rem;
    }

    .preview[data-state="missing-name"] {
      border-style: dashed;
    }

    #preview-role[hidden] {
      display: none;
    }

    #preview-status {
      min-height: 1.5em;
    }
  </style>
</head>
<body>
  <main>
    <h1>Profile preview</h1>
    <p>Change the controls to update the profile card.</p>

    <form id="profile-form">
      <label for="display-name">
        Display name
        <input
          id="display-name"
          name="displayName"
          type="text"
          value="Asha"
          maxlength="40"
          required
        >
      </label>

      <label for="role">
        Role
        <select id="role" name="role" required>
          <option value="Front-end developer">Front-end developer</option>
          <option value="Designer">Designer</option>
          <option value="Student">Student</option>
        </select>
      </label>

      <label class="checkbox-row" for="compact">
        <input id="compact" name="compact" type="checkbox" value="yes">
        Use compact spacing
      </label>

      <label class="checkbox-row" for="show-role">
        <input id="show-role" name="showRole" type="checkbox" value="yes" checked>
        Show role on the card
      </label>

      <label for="accent">
        Accent color
        <input id="accent" name="accent" type="color" value="#2457c5">
      </label>

      <div class="actions">
        <button type="submit">Save preview</button>
        <button type="reset">Reset form</button>
      </div>
    </form>

    <article id="profile-card" class="preview" data-state="ready" aria-labelledby="preview-name">
      <h2 id="preview-name">Asha</h2>
      <p id="preview-role">Front-end developer</p>
    </article>

    <p id="preview-status" aria-live="polite">Preview is ready.</p>
  </main>

  <script>
    const form = document.querySelector("#profile-form");
    const nameInput = document.querySelector("#display-name");
    const roleSelect = document.querySelector("#role");
    const compactInput = document.querySelector("#compact");
    const showRoleInput = document.querySelector("#show-role");
    const accentInput = document.querySelector("#accent");

    const card = document.querySelector("#profile-card");
    const previewName = document.querySelector("#preview-name");
    const previewRole = document.querySelector("#preview-role");
    const status = document.querySelector("#preview-status");

    function updatePreview() {
      const displayName = nameInput.value.trim();
      const missingName = displayName === "";

      previewName.textContent = displayName || "Your name";
      previewRole.textContent = roleSelect.value;
      previewRole.hidden = !showRoleInput.checked;

      card.classList.toggle("is-compact", compactInput.checked);
      card.dataset.state = missingName ? "missing-name" : "ready";
      card.style.setProperty("--accent-color", accentInput.value);

      nameInput.setAttribute("aria-invalid", String(missingName));
      nameInput.setCustomValidity(
        missingName ? "Enter a name that is not only spaces." : ""
      );
    }

    form.addEventListener("input", updatePreview);
    form.addEventListener("change", updatePreview);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = new FormData(form);
      const savedName = data.get("displayName");

      status.textContent = "Preview saved for " + savedName + ".";
    });

    form.addEventListener("reset", function () {
      window.setTimeout(updatePreview, 0);
      status.textContent = "Form reset to its default values.";
    });

    updatePreview();
  </script>
</body>
</html>
~~~

## Expected output

The page initially displays a profile card for **Asha**, with the role **Front-end developer** and a blue accent border. The form has a compact spacing checkbox, a checked show-role checkbox, a color control, and **Save preview** and **Reset form** buttons.

- Editing the display name updates the card heading.
- Changing the role updates the role text.
- Unchecking **Show role on the card** hides the role paragraph.
- Checking **Use compact spacing** adds the **is-compact** class and reduces the card padding.
- Selecting another accent color updates the card's CSS custom property and border.
- Submitting the form shows a status message. An empty or spaces-only name is rejected with a validation message.
- Resetting restores the control defaults and updates the preview to match them.

## How it works

### 1. Read current form state from properties

The script reads **nameInput.value**, **roleSelect.value**, **compactInput.checked**, and **showRoleInput.checked**. These properties represent the current state of the controls.

The controls also have markup defaults. For example, the display name starts with the **value** attribute set to **Asha**, and the show-role checkbox has the **checked** attribute. Reset returns the controls to those defaults.

### 2. Update text and the hidden attribute

The selected name and role are assigned to **textContent**, so the values appear as text. The **hidden** property of the role paragraph reflects whether its **hidden** attribute is present.

### 3. Set class and data attribute states

The call to **classList.toggle("is-compact", compactInput.checked)** makes the compact class match the checkbox state. The assignment to **card.dataset.state** changes the **data-state** attribute. CSS uses these states to adjust the card's appearance.

### 4. Set an inline CSS custom property

**style.setProperty("--accent-color", accentInput.value)** sets the custom property used by the card's border. The CSS rule defines how that value affects the page.

### 5. Validate and read named form data

The name is trimmed before display. **setCustomValidity()** sets a useful validation message for an empty or spaces-only name. Clearing the issue requires passing an empty string.

On submission, **new FormData(form)** collects named, enabled controls and the code reads the display name with **data.get()**. The form's submit event is handled without navigating away.

### 6. Restore the defaults

The browser resets form controls after dispatching the reset event. A short timeout lets the reset finish before **updatePreview()** reads the restored values and updates the card.

## Try these changes

1. Change the default name in the input's **value** attribute, then reset the form.
2. Uncheck the role checkbox and inspect the paragraph's **hidden** property.
3. Change the accent color and inspect **card.style** in the browser's developer tools.
4. Replace the force argument to **classList.toggle()** with a one-argument toggle and observe why repeated state updates can flip the class unexpectedly.
5. Add a checkbox and inspect how checking or unchecking it changes the entries in **FormData**.
6. Remove the input's **name** and observe whether **FormData** still includes its value.
7. Try entering only spaces in the display-name field and read the custom validation feedback.

## Key ideas shown

- Form-control properties expose current values and checked states.
- Markup attributes provide defaults and boolean states are based on presence.
- **dataset** properties read and write **data-*** attributes as strings.
- **classList.toggle(name, force)** keeps a class aligned with a boolean state.
- **hidden** reflects the presence or absence of the **hidden** attribute.
- **style.setProperty()** updates an inline CSS custom property.
- **FormData** collects eligible named controls.
- Built-in constraints and custom validity messages help with user input; the server must still validate received data.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [100 - Creating, updating, and removing DOM content](../examples/100-creating-updating-and-removing-dom-content.md) | [Open lesson](../lessons/101-attributes-classes-forms-and-styles-from-javascript.md) | [Open Q&A](../qnas/101-attributes-classes-forms-and-styles-from-javascript.md) | [102 - Browser events: capture, bubbling, and default actions](../lessons/102-browser-events-capture-bubbling-and-default-actions.md) |
