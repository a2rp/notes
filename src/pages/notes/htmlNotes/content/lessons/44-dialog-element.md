# 44 - Dialog elements

A dialog presents information or a task in a separate interface. The HTML `<dialog>` element provides a native foundation for modal and non-modal dialogs. This chapter covers the markup, how dialogs are shown and closed, and the details that make a dialog understandable and usable.

## What you will learn

- How to write a `<dialog>` with a clear heading and content
- The difference between a modal dialog and a non-modal dialog
- What `showModal()`, `show()`, and `close()` do
- How a form with `method="dialog"` closes its containing dialog
- How to label a dialog and place initial focus
- Why an explicit close control matters
- Why adding `open` is not the same as showing a modal dialog

## The basic dialog element

A `<dialog>` holds a distinct interface, such as a confirmation prompt, a short form, or a focused task:

~~~html
<dialog aria-labelledby="notice-title">
  <h2 id="notice-title">Workshop information</h2>
  <p>Bring a notebook. All gardening tools will be provided.</p>
</dialog>
~~~

The heading gives the dialog a meaningful title. `aria-labelledby` points to the visible heading so assistive technologies can identify the dialog. The attribute does not open the dialog.

By default, a dialog without an `open` attribute is not displayed. It needs to be shown using an appropriate method or declarative control. Merely writing the element in the document does not make it visible.

## Modal and non-modal dialogs

A dialog can be shown in two different ways:

| Method | Result | Can the user interact with the rest of the page? |
| --- | --- | --- |
| `showModal()` | Opens the dialog modally above the page | No, the rest of the document is made inert while it is open |
| `show()` | Opens a non-modal dialog | Yes, the rest of the page remains interactive |

Use a modal dialog only when the user needs to handle a focused task before returning to the page, such as confirming a destructive action. A non-modal dialog is better when the user may consult or interact with the rest of the page while it is open.

The traditional approach calls dialog methods from JavaScript. The example below shows `showModal()` and `close()`. Modern browsers also support declarative command buttons for common dialog actions, shown in the next section.

~~~html
<button type="button" id="open-notice">Read the workshop notice</button>

<dialog id="notice-dialog" aria-labelledby="notice-title">
  <h2 id="notice-title">Workshop information</h2>
  <p>Bring a notebook. All gardening tools will be provided.</p>
  <button type="button" id="close-notice">Close</button>
</dialog>

<script>
  const noticeDialog = document.querySelector("#notice-dialog");

  document.querySelector("#open-notice").addEventListener("click", () => {
    noticeDialog.showModal();
  });

  document.querySelector("#close-notice").addEventListener("click", () => {
    noticeDialog.close();
  });
</script>
~~~

`showModal()` opens the dialog in the browser's modal layer. While it is open, users cannot interact with the rest of the page. `close()` closes it and returns the user to the page.

A non-modal version uses `show()`:

~~~js
noticeDialog.show();
~~~

The rest of the page remains usable while a dialog shown with `show()` is open. Choose the method according to the interaction, not just how you want the dialog to look.

## Open and close with declarative HTML commands

A `<button>` can target a dialog with `commandfor` and ask it to perform a built-in command with `command`. The `show-modal` command opens the dialog as a modal, and `close` closes it:

~~~html
<button type="button" commandfor="notice-dialog" command="show-modal">
  Read the workshop notice
</button>

<dialog id="notice-dialog" aria-labelledby="notice-title">
  <h2 id="notice-title">Workshop information</h2>
  <p>Bring a notebook. All gardening tools will be provided.</p>
  <button type="button" commandfor="notice-dialog" command="close">
    Close
  </button>
</dialog>
~~~

The value of `commandfor` must match the dialog's `id`. These declarative commands provide HTML-only open and close controls in browsers that support them. Check browser compatibility if the page must support older browsers. Use JavaScript methods such as `showModal()` and `close()` when you need broader support or additional application behavior.
## The `open` attribute

The Boolean `open` attribute makes a dialog visible when the page loads:

~~~html
<dialog open aria-labelledby="announcement-title">
  <h2 id="announcement-title">Today's announcement</h2>
  <p>The garden entrance is on the east side.</p>
</dialog>
~~~

A dialog shown this way is non-modal. It does not block interaction with the rest of the page or acquire the modal behavior of `showModal()`.

For an interactive dialog that should open in response to an action, use `show()` or `showModal()` rather than manually adding and removing `open`. The dialog methods manage the browser's dialog state, including behavior related to focus and modality.

## Close a dialog

Give users a clear way to finish or dismiss the dialog. A modal dialog shown with `showModal()` can usually also be dismissed with the platform's close request, such as the Escape key. Do not make Escape the only way to close an important dialog. Include a clear button inside the dialog.

A form with `method="dialog"` can close its containing dialog without JavaScript:

~~~html
<dialog aria-labelledby="notice-title">
  <h2 id="notice-title">Workshop information</h2>
  <p>Bring a notebook. All gardening tools will be provided.</p>

  <form method="dialog">
    <button type="submit">Got it</button>
  </form>
</dialog>
~~~

Submitting this form closes the dialog. It does not send the form data to a server. Use this method for simple choices within a dialog, not for a form submission that should be sent to a server.

A dialog can also close with `dialog.close()`. The optional value passed to `close(value)` becomes the dialog's `returnValue`:

~~~html
<dialog id="choice-dialog" aria-labelledby="choice-title">
  <h2 id="choice-title">Save your changes?</h2>
  <form method="dialog">
    <button type="submit" value="cancel">Keep editing</button>
    <button type="submit" value="save">Save</button>
  </form>
</dialog>
~~~

When the form closes the dialog, the activated submit button's `value` can be read as the dialog's return value by the surrounding application. This is useful when the application needs to know which choice the user made.

## Give the dialog a clear name

A dialog should have an accessible name that identifies its purpose. A visible heading is usually a good source. Connect it with `aria-labelledby`:

~~~html
<dialog aria-labelledby="delete-title">
  <h2 id="delete-title">Delete this draft?</h2>
  <p>This action cannot be undone.</p>
  <form method="dialog">
    <button type="submit" value="cancel">Cancel</button>
    <button type="submit" value="delete">Delete draft</button>
  </form>
</dialog>
~~~

Use a concise heading that names the task. Keep the explanation in visible dialog content. Avoid a vague title such as "Message" when the dialog is asking the user to confirm deleting a draft.

The native `<dialog>` element supplies dialog semantics. Do not add a redundant `role="dialog"` or `aria-modal="true"` when using `showModal()`. A modal shown with `showModal()` is already exposed as modal by the browser.

## Manage initial focus

When a modal dialog opens, the browser moves focus into it. Choose an initial focus target that makes sense for the task. The `autofocus` attribute can identify the element that should receive focus:

~~~html
<dialog aria-labelledby="delete-title">
  <h2 id="delete-title">Delete this draft?</h2>
  <p>This action cannot be undone.</p>
  <form method="dialog">
    <button type="submit" value="cancel" autofocus>Cancel</button>
    <button type="submit" value="delete">Delete draft</button>
  </form>
</dialog>
~~~

For a destructive confirmation, focusing the safer option first can reduce accidental activation. Choose focus according to the dialog's content and task, rather than adding `autofocus` mechanically.

Do not add `tabindex` to the `<dialog>` element itself. Put focus on an appropriate control inside it, or use a suitable focus target within the dialog when its content requires one.

When a modal closes, the browser normally restores focus to the element that opened it. This helps keyboard users continue where they left off.

## Make the content and controls clear

A dialog should have a focused purpose. Keep its instructions concise and give every button a descriptive label:

~~~html
<dialog aria-labelledby="email-title">
  <h2 id="email-title">Subscribe to garden updates</h2>
  <form action="/subscribe" method="post">
    <p>
      <label for="email-address">Email address</label>
      <input id="email-address" name="email" type="email" required>
    </p>
    <button type="submit">Subscribe</button>
    <button type="button" id="cancel-subscription">Cancel</button>
  </form>
</dialog>
~~~

A server-submission form inside a dialog is still a normal form. Its submit button sends the form according to its `action` and `method`. Use `method="dialog"` only when the form is meant to close the dialog without sending data.

Avoid putting an entire page or a long article inside a modal. The user should understand the task, complete it, and return to the original page without losing their place.

## A complete confirmation example

This example uses a modal dialog with a title, an explanation, a form, and clear choices:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Draft manager</title>
  </head>
  <body>
    <main>
      <h1>Draft manager</h1>
      <p>Current draft: Spring planting plan</p>
      <button type="button" id="delete-draft">Delete draft</button>
    </main>

    <dialog id="delete-dialog" aria-labelledby="delete-title">
      <h2 id="delete-title">Delete this draft?</h2>
      <p>The Spring planting plan will be permanently deleted.</p>
      <form method="dialog">
        <button type="submit" value="cancel" autofocus>Cancel</button>
        <button type="submit" value="delete">Delete draft</button>
      </form>
    </dialog>

    <script>
      const deleteDialog = document.querySelector("#delete-dialog");

      document.querySelector("#delete-draft").addEventListener("click", () => {
        deleteDialog.showModal();
      });

      deleteDialog.addEventListener("close", () => {
        if (deleteDialog.returnValue === "delete") {
          console.log("The application can now delete the draft.");
        }
      });
    </script>
  </body>
</html>
~~~

The dialog does not delete the draft by itself. The example shows how its return value can tell the application which option was chosen. A real application must connect that result to its own deletion behavior.

## Common mistakes

### Treating `<dialog open>` as modal

The `open` attribute makes a dialog visible in a non-modal state. Use `showModal()` when the rest of the page must be blocked until the dialog is handled.

### Using a modal for information that does not require interruption

A modal temporarily blocks the page. Use a non-modal dialog or ordinary page content when users should be able to continue interacting with the rest of the page.

### Forgetting a close control

Provide a clearly labeled button inside the dialog. A modal may support Escape, but a visible control makes the available action clear to all users.

### Omitting an accessible name

A dialog needs a clear purpose. Add a visible heading and connect it using `aria-labelledby`.

### Adding redundant dialog ARIA

The native element already provides dialog semantics. A modal opened with `showModal()` already has modal semantics, so duplicate role or modal attributes are unnecessary.

### Putting `tabindex` on `<dialog>`

Do not set `tabindex` on the dialog element itself. Set initial focus on a suitable element inside it when needed.

### Using `method="dialog"` to submit data to a server

This method closes the dialog and does not perform a normal server form submission. Use an ordinary form submission method when the data needs to be sent.

### Removing `open` manually from a modal dialog

Changing the attribute directly does not perform all the dialog closing steps. Use `close()` or an appropriate close control so the browser can clean up the dialog's modal state correctly.

## Try it yourself

1. Create a dialog with a visible heading and connect it using `aria-labelledby`.
2. Add a button that opens the dialog with `showModal()`.
3. Add a visible close button and close the dialog with `close()`.
4. Add `autofocus` to a sensible initial control and test the focus when the dialog opens.
5. Create a non-modal dialog with `show()` and compare whether the rest of the page remains interactive.
6. Add `open` to a dialog and explain why it is visible but non-modal.
7. Create a confirmation dialog with a form using `method="dialog"` and distinct button values.
8. Read the dialog's `returnValue` after it closes and decide what the application should do next.
9. Use the keyboard to open, operate, and close a modal dialog.
10. Check that focus returns to the button that opened the dialog.

## Key points

- `<dialog>` represents a dialog, while `showModal()` opens it modally and `show()` opens it non-modally.
- A dialog with the `open` attribute is non-modal. The attribute alone does not block the rest of the page.
- Provide a visible heading and connect it to the dialog with `aria-labelledby`.
- Include a clear way to close the dialog and choose a sensible initial focus target.
- `method="dialog"` closes a containing dialog without sending form data to a server.
- A native modal opened with `showModal()` provides modal semantics and makes the rest of the document inert.
- Use dialogs for focused tasks, not as a generic substitute for page content, disclosures, or tabs.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [43 - Details and summary](43-details-and-summary.md) | [Q&A](../qnas/44-dialog-element.md) | [Example](../examples/44-dialog-element.md) | [45 - Popover attributes](45-popover-attributes.md) |