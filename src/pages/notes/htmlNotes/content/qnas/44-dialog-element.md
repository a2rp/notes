# 44 - Dialog elements: Questions and Answers

Use these questions to review [Chapter 44 - Dialog elements](../lessons/44-dialog-element.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the purpose of the `<dialog>` element?

A. To create a disclosure that expands inline

B. To represent a dialog box or focused interactive task

C. To create a navigation landmark

D. To replace every form

**Answer: B.** A dialog presents a distinct interface for a task or information. Use `<details>` for a disclosure, navigation elements for navigation, and forms for data entry.

### 2. What does `showModal()` do?

A. Shows the dialog as modal and blocks interaction with the rest of the page

B. Shows the dialog without affecting the rest of the page

C. Closes the dialog and clears its fields

D. Sends a form to a server

**Answer: A.** A modal dialog is shown above the page and makes the rest of the document inert while it is open.

### 3. What does `show()` do?

A. Opens the dialog as modal

B. Opens a non-modal dialog while leaving the rest of the page interactive

C. Closes a dialog

D. Gives the dialog an accessible name

**Answer: B.** Use `show()` for a non-modal dialog. Use `showModal()` when the task should temporarily block interaction with the page behind it.

### 4. What does `<dialog open>` do?

A. Displays the dialog as a modal and makes the rest of the page inert

B. Displays the dialog in a non-modal state

C. Adds a close button automatically

D. Opens the dialog only after a form is submitted

**Answer: B.** The `open` attribute makes a dialog visible, but it does not give it modal behavior. Use `showModal()` for a modal dialog.

### 5. What does a form with `method="dialog"` do when submitted inside a dialog?

A. Sends the form data to the server using GET

B. Closes the containing dialog without a normal server submission

C. Opens another modal dialog

D. Automatically validates every dialog on the page

**Answer: B.** `method="dialog"` is intended for choices inside the dialog. It closes the dialog and does not send the form data to a server.

### 6. How can a visible heading provide the dialog's accessible name?

A. Connect it with `aria-labelledby` using the heading's ID

B. Add `tabindex="1"` to the heading

C. Put the heading in the document title only

D. Add `aria-hidden="true"` to the dialog

**Answer: A.** `aria-labelledby` can refer to the visible heading by ID. This gives the dialog a name that describes its purpose.

### 7. Where should initial focus usually be placed when a dialog opens?

A. On the browser address bar

B. On a suitable control or content element inside the dialog

C. On the `<dialog>` with `tabindex="1"`

D. On the footer of the page behind it

**Answer: B.** Choose an appropriate focus target inside the dialog. The `autofocus` attribute can identify an initial focus control. Do not add `tabindex` to the dialog element itself.

### 8. What is the `returnValue` useful for?

A. It identifies which choice closed the dialog

B. It names the dialog for a screen reader

C. It makes the dialog modal

D. It opens the dialog again

**Answer: A.** A close method or a `method="dialog"` form can provide a value. The application can use that value to determine which option the user selected.

### 9. What do `commandfor` and `command="show-modal"` on a button provide?

A. A declarative HTML way to show a target dialog as modal in supporting browsers

B. A way to submit the dialog's content to a server

C. A way to create an accessible name from the button's ID

D. A way to make the dialog non-modal

**Answer: A.** `commandfor` identifies the target element by ID, and `command="show-modal"` asks the browser to show it as modal. Check compatibility if older browsers must be supported.

### 10. Which action is a typical way to dismiss a modal dialog?

A. Pressing Escape or activating a clearly labeled close control

B. Removing the document's `<body>` element

C. Clicking a link behind the modal

D. Adding `open="false"`

**Answer: A.** Modal dialogs support a close request such as Escape by default, and should also provide a clear in-dialog control so users can dismiss them directly.

## True or false

### 1. Writing a `<dialog>` element in the page automatically makes it visible.

**Answer: False.** A dialog without `open` is not displayed until it is shown with a method or an appropriate declarative control.

### 2. A dialog with an `open` attribute is automatically modal.

**Answer: False.** The `open` attribute displays it in a non-modal state. `showModal()` provides the modal behavior.

### 3. While a dialog is shown with `showModal()`, the page behind it is inert.

**Answer: True.** The modal dialog is placed above the document and prevents interaction with the rest of the page until it closes.

### 4. A form with `method="dialog"` sends its form values to the server.

**Answer: False.** It closes the containing dialog instead of performing a normal server submission.

### 5. A visible heading connected with `aria-labelledby` can name a dialog.

**Answer: True.** It reuses the heading text as the dialog's accessible name and keeps the purpose visible on screen.

### 6. Adding `tabindex` to the `<dialog>` element is the recommended way to set focus.

**Answer: False.** Do not add `tabindex` to `<dialog>`. Use a suitable focusable element inside the dialog as the initial target.

### 7. The browser can handle modal behavior and focus management for a native dialog shown with `showModal()`.

**Answer: True.** The native method supplies important dialog behavior, including modality and focus handling, which a custom dialog would need to recreate.

### 8. The `commandfor` and `command` attributes can provide dialog controls without JavaScript in supporting browsers.

**Answer: True.** For example, `command="show-modal"` can show the targeted dialog, and `command="close"` can close it. Check support when older browsers matter.

## Short-answer questions

### 1. What is the difference between `showModal()` and `show()`?

**Answer:** `showModal()` opens a modal dialog and makes the rest of the document inert. `show()` opens a non-modal dialog and leaves the rest of the page interactive.

### 2. Why is `<dialog open>` not equivalent to `showModal()`?

**Answer:** The `open` attribute only makes the dialog visible in a non-modal state. It does not block interaction with the rest of the page or provide all the browser behavior associated with a modal dialog.

### 3. How can you give a dialog an accessible name?

**Answer:** Provide a visible heading with a unique `id` and set the dialog's `aria-labelledby` to that ID, for example `<dialog aria-labelledby="confirm-title">` with `<h2 id="confirm-title">Confirm your choice</h2>`.

### 4. What does `method="dialog"` do?

**Answer:** When a form inside a dialog is submitted, it closes the dialog instead of sending the form data to a server. A submit button's value can be used to identify the choice.

### 5. Why should a dialog include a clearly labeled close or cancel control?

**Answer:** A visible control makes the way to finish or dismiss the dialog clear. Modal dialogs usually also support Escape, but that should not be the only way users can close the dialog.

### 6. What is a suitable use of `autofocus` in a dialog?

**Answer:** Use it on a control inside the dialog that should receive focus immediately, such as the safer Cancel button in a destructive confirmation. Choose the initial target based on the task.

### 7. What do `commandfor` and `command` do on a button?

**Answer:** `commandfor` identifies the target element by its ID, and `command` names the action. For example, `command="show-modal"` shows the target dialog as modal and `command="close"` closes it.

### 8. When should you choose a non-modal dialog instead of a modal one?

**Answer:** Choose a non-modal dialog when the user should be able to keep interacting with the rest of the page while the dialog is open. Use a modal when a focused task needs to be handled before returning to the page.

## Practical questions

### 1. Add a visible heading and accessible name to this dialog.

~~~html
<dialog>
  <p>Your profile has been saved.</p>
</dialog>
~~~

**Answer:**

~~~html
<dialog aria-labelledby="saved-title">
  <h2 id="saved-title">Profile saved</h2>
  <p>Your profile has been saved.</p>
</dialog>
~~~

The visible heading describes the dialog, and `aria-labelledby` references it to provide the dialog's accessible name.

### 2. Add a button that opens this dialog as modal using HTML command attributes.

~~~html
<dialog id="help-dialog" aria-labelledby="help-title">
  <h2 id="help-title">Help</h2>
  <p>Contact support if you cannot sign in.</p>
</dialog>
~~~

**Answer:**

~~~html
<button type="button" commandfor="help-dialog" command="show-modal">
  Open help
</button>

<dialog id="help-dialog" aria-labelledby="help-title">
  <h2 id="help-title">Help</h2>
  <p>Contact support if you cannot sign in.</p>
  <button type="button" commandfor="help-dialog" command="close">
    Close help
  </button>
</dialog>
~~~

The target ID in `commandfor` matches the dialog's `id`. Declarative command buttons work in supporting browsers; check browser compatibility for older targets.

### 3. Add a close button that dismisses this dialog through a form without sending data to a server.

~~~html
<dialog aria-labelledby="notice-title">
  <h2 id="notice-title">Notice</h2>
  <p>The office closes at 4 p.m. today.</p>
</dialog>
~~~

**Answer:**

~~~html
<dialog aria-labelledby="notice-title">
  <h2 id="notice-title">Notice</h2>
  <p>The office closes at 4 p.m. today.</p>
  <form method="dialog">
    <button type="submit">Got it</button>
  </form>
</dialog>
~~~

Submitting the form closes the dialog without a normal server submission.

### 4. This dialog should start visible but remain non-modal. Add the appropriate markup.

~~~html
<dialog aria-labelledby="announcement-title">
  <h2 id="announcement-title">Announcement</h2>
  <p>The library entrance is on Oak Street.</p>
</dialog>
~~~

**Answer:**

~~~html
<dialog open aria-labelledby="announcement-title">
  <h2 id="announcement-title">Announcement</h2>
  <p>The library entrance is on Oak Street.</p>
</dialog>
~~~

The `open` attribute displays the dialog in a non-modal state. The rest of the page remains interactive.

### 5. Add `autofocus` to the safer option in this destructive confirmation dialog.

~~~html
<dialog aria-labelledby="delete-title">
  <h2 id="delete-title">Delete this draft?</h2>
  <form method="dialog">
    <button type="submit" value="cancel">Cancel</button>
    <button type="submit" value="delete">Delete draft</button>
  </form>
</dialog>
~~~

**Answer:**

~~~html
<dialog aria-labelledby="delete-title">
  <h2 id="delete-title">Delete this draft?</h2>
  <form method="dialog">
    <button type="submit" value="cancel" autofocus>Cancel</button>
    <button type="submit" value="delete">Delete draft</button>
  </form>
</dialog>
~~~

The Cancel control receives initial focus. This is often a safer starting point for an irreversible action.

### 6. This dialog's form must send an email address to the server. Should it use `method="dialog"` or a normal form method?

**Answer:** Use a normal form method and an `action` that handles the submission:

~~~html
<dialog aria-labelledby="subscribe-title">
  <h2 id="subscribe-title">Subscribe to garden updates</h2>
  <form action="/subscribe" method="post">
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Subscribe</button>
  </form>
</dialog>
~~~

`method="dialog"` closes the dialog without sending data to a server, so it is not appropriate for this task.

### 7. Let the application tell which of these two choices the user selected.

~~~html
<dialog id="choice-dialog" aria-labelledby="choice-title">
  <h2 id="choice-title">Save your changes?</h2>
  <form method="dialog">
    <button type="submit">Keep editing</button>
    <button type="submit">Save</button>
  </form>
</dialog>
~~~

**Answer:**

~~~html
<dialog id="choice-dialog" aria-labelledby="choice-title">
  <h2 id="choice-title">Save your changes?</h2>
  <form method="dialog">
    <button type="submit" value="cancel">Keep editing</button>
    <button type="submit" value="save">Save</button>
  </form>
</dialog>
~~~

The activated button's value becomes the dialog's return value. The application can check it after the dialog closes.

### 8. Fix this dialog, which incorrectly uses `tabindex` on the dialog element itself.

~~~html
<dialog tabindex="0" aria-labelledby="info-title">
  <h2 id="info-title">Account information</h2>
  <button type="button">Close</button>
</dialog>
~~~

**Answer:**

~~~html
<dialog aria-labelledby="info-title">
  <h2 id="info-title">Account information</h2>
  <button type="button" autofocus>Close</button>
</dialog>
~~~

Do not put `tabindex` on `<dialog>`. If the Close button is the desired initial focus target, put `autofocus` on that control.

### 9. Add a JavaScript button handler to open this dialog as modal.

~~~html
<button type="button" id="open-dialog">Open details</button>
<dialog id="details-dialog" aria-labelledby="details-title">
  <h2 id="details-title">Account details</h2>
  <p>Your account is active.</p>
</dialog>
~~~

**Answer:**

~~~html
<button type="button" id="open-dialog">Open details</button>
<dialog id="details-dialog" aria-labelledby="details-title">
  <h2 id="details-title">Account details</h2>
  <p>Your account is active.</p>
  <form method="dialog">
    <button type="submit">Close</button>
  </form>
</dialog>

<script>
  const detailsDialog = document.querySelector("#details-dialog");

  document.querySelector("#open-dialog").addEventListener("click", () => {
    detailsDialog.showModal();
  });
</script>
~~~

The event handler calls `showModal()`. The form supplies a close control without extra JavaScript.

### 10. A dialog displays a non-blocking status message while a user continues to interact with the page. Which method should open it?

**Answer:** Use `show()` to open it as a non-modal dialog. The rest of the page remains interactive. Use `showModal()` only when interaction with the rest of the page should be blocked until the dialog closes.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [43 - Details and summary](43-details-and-summary.md) | [Lesson](../lessons/44-dialog-element.md) | [Example](../examples/44-dialog-element.md) | [45 - Popover attributes](45-popover-attributes.md) |