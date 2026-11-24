# 12. DOM, events, and accessible interfaces

The DOM is a browser API, not part of the ECMAScript language itself. JavaScript can select elements, update text, and respond to user actions. Prefer semantic HTML first; JavaScript should add behavior rather than recreate native links, buttons, and form controls.

```js
const button = document.querySelector("[data-action='save']");
button?.addEventListener("click", handleSave);
```

Use `textContent` for untrusted text. Avoid inserting user-provided strings with `innerHTML`; parsing them as markup can create cross-site scripting vulnerabilities. If rich HTML is required, use a well-maintained sanitizer and a narrow allowlist.

## Event handling

Events bubble from the target through ancestors. Event delegation can handle a list of similar controls with one listener, but check that the event target is an expected element. Call `preventDefault` only when replacing a browser default behavior, and use `stopPropagation` sparingly because it can interfere with other listeners.

Listeners that outlive a component should be removed. An `AbortController` can group listener cleanup in browsers that support the signal option:

```js
const controller = new AbortController();
container.addEventListener("click", handleClick, { signal: controller.signal });

// During cleanup:
controller.abort();
```

## Forms and accessibility

Read form values from the form controls, validate them, and report errors next to the relevant fields. Keep controls labeled, preserve keyboard operation, and move focus deliberately when an interaction changes context. Announce important asynchronous status changes accessibly; do not use color alone to indicate success or failure.

For a simple form, listen to its `submit` event, call `preventDefault` when handling submission in JavaScript, and let the browser provide native validation unless the product needs custom rules.

## References

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN: textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
