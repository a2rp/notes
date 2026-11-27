# 13. Native interactive elements

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Loading scripts and external resources](./12-loading-scripts-and-external-resources.md) | [Notes index](../README.md) | [Next: Accessibility and ARIA basics](./14-accessibility-and-aria-basics.md) |

## Use details for a disclosure

details and summary create a disclosure without JavaScript. The summary is the visible control that opens or closes the rest of the content.

~~~html
<details>
  <summary>Show planting notes</summary>
  <p>Water the seedlings after moving them into the bed.</p>
</details>
~~~

The browser provides keyboard behavior and an open state. Use this native element when the interaction is simply to reveal or hide a small section.

## Open a native dialog

dialog represents a dialog box. Use showModal() when the interaction should be modal and show() for a non-modal dialog.

~~~html
<button type="button" id="open-help">Open help</button>

<dialog id="help-dialog" aria-labelledby="help-title">
  <h2 id="help-title">Garden help</h2>
  <p>Choose a sunny spot with good drainage.</p>

  <form method="dialog">
    <button type="submit">Close help</button>
  </form>
</dialog>
~~~

~~~js
const helpDialog = document.querySelector("#help-dialog");
const openHelpButton = document.querySelector("#open-help");

openHelpButton.addEventListener("click", () => {
  helpDialog.showModal();
});
~~~

A modal dialog opened with showModal is placed in the top layer, and the rest of the document is not interactive until it closes. Escape closes a modal dialog by default. The heading gives the dialog an accessible name.

## Close a dialog with a form

A form with method="dialog" can close the dialog when its submit button is activated. The button value can be read from the dialog returnValue after it closes.

~~~html
<dialog id="confirm-dialog">
  <p>Remove this draft?</p>
  <form method="dialog">
    <button value="cancel">Keep draft</button>
    <button value="remove">Remove draft</button>
  </form>
</dialog>
~~~

For a destructive action, connect the chosen value to application logic and make the effect clear before the user confirms it.

## Prefer built-in controls

Use button for an action, a for navigation, input for data entry, and select for a choice from a list. Native controls bring expected behavior and keyboard support that a generic div does not provide.

Custom behavior is sometimes necessary, but it also requires implementing keyboard, focus, and state behavior carefully.

## Practice questions

1. Which elements create a native disclosure?
2. Does details require JavaScript to open and close?
3. What does dialog represent?
4. How does showModal differ from show?
5. What happens to the rest of the page while a modal dialog is open?
6. What does method="dialog" do on a form?
7. Why should a dialog have a heading or accessible name?
8. Which native element should represent an action?

## Main references

- [The details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)
- [The summary element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary)
- [The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- [HTML interactive elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)