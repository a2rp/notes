# 45 - Popover attributes

The Popover API lets an HTML element display above the page as a popover. With the `popover`, `popovertarget`, and `popovertargetaction` attributes, buttons can show and hide many popovers without JavaScript. The browser handles important parts of the interaction, including the top layer and light dismissal for applicable popovers.

## What you will learn

- How to declare a popover with the global `popover` attribute
- How to connect a button to a popover with `popovertarget`
- How `popovertargetaction` controls showing, hiding, and toggling
- How `auto`, `manual`, and `hint` popovers differ
- What the browser's top layer and light dismissal mean
- Why a popover is not a modal dialog
- How to choose semantic HTML for the content inside a popover

## Create a basic popover

Add an `id` and the `popover` attribute to the element that contains the popover content. Point a button's `popovertarget` at that ID:

~~~html
<button type="button" popovertarget="account-help">
  Account help
</button>

<aside id="account-help" popover>
  <h2>Account help</h2>
  <p>Contact support if you cannot sign in.</p>
</aside>
~~~

The popover is hidden when the page first loads. Activating the button toggles it between hidden and shown. If the `popover` attribute has no value, it behaves as `popover="auto"`.

The value of `popovertarget` must match the `id` of an element with the `popover` attribute. Keep IDs unique. Place the popover near its invoking button in the source when possible, so its location in the document makes sense to people navigating the page with assistive technology.

## Choose the popover content element by meaning

The `popover` attribute is global, so it can be used on different HTML elements. Choose an element that describes the content:

- Use `<nav popover>` for a group of navigation links.
- Use `<aside popover>` for related supporting information.
- Use `<div popover>` when the content has no more specific semantic element.

The attribute controls how the element is displayed. It does not turn its content into a menu, dialog, or tooltip. Provide meaningful text and use the right HTML for the content.

## Choose an action for the invoking button

`popovertargetaction` says what the button should do. Its values are `toggle`, `show`, and `hide`:

| Value | Effect |
| --- | --- |
| `toggle` | Show a hidden popover or hide a shown popover |
| `show` | Show the popover if it is hidden |
| `hide` | Hide the popover if it is shown |

If the attribute is omitted, the action is `toggle`:

~~~html
<button type="button" popovertarget="tips">Show or hide tips</button>
<div id="tips" popover>
  <p>Water seedlings gently so their soil stays moist.</p>
</div>
~~~

Use `show` or `hide` when the button's label describes one specific action:

~~~html
<button type="button" popovertarget="site-navigation"
        popovertargetaction="show">
  Open navigation
</button>

<nav id="site-navigation" popover>
  <ul>
    <li><a href="/plants/">Plants</a></li>
    <li><a href="/workshops/">Workshops</a></li>
  </ul>
  <button type="button" popovertarget="site-navigation"
          popovertargetaction="hide">
    Close navigation
  </button>
</nav>
~~~

If a control is inside a form and it is not meant to submit the form, set `type="button"` as shown above.

## Choose the popover behavior

The `popover` attribute has three meaningful values: `auto`, `manual`, and `hint`. Each value changes how the browser manages showing and dismissing popovers.

### `popover="auto"`

An auto popover can be dismissed by a light-dismiss action, such as clicking outside it or pressing Escape. Opening another auto popover generally closes an already open auto popover, except for nested popovers in the same stack.

An empty `popover` attribute is equivalent to `popover="auto"`:

~~~html
<div id="hours" popover="auto">
  <p>The garden is open from 9 a.m. to 5 p.m.</p>
</div>

<div id="contact" popover>
  <p>Call the garden office at 555-0100.</p>
</div>
~~~

Use auto behavior when a popover should close naturally after the user makes a selection, opens another related popover, clicks elsewhere, or presses Escape.

### `popover="manual"`

A manual popover does not close automatically when the user clicks elsewhere, presses Escape, or opens another popover. The page must provide an explicit control to hide it or code that hides it:

~~~html
<button type="button" popovertarget="saved-message"
        popovertargetaction="show">
  Show saved message
</button>

<div id="saved-message" popover="manual">
  <p>Your changes have been saved.</p>
  <button type="button" popovertarget="saved-message"
          popovertargetaction="hide">
    Dismiss message
  </button>
</div>
~~~

Manual behavior can be appropriate when the interface must keep a popover open until the user explicitly dismisses it. Provide a clear way to close it. Multiple manual popovers can remain open independently.

### `popover="hint"`

A hint popover is intended for brief supplemental information. It can be dismissed, but showing it does not close an open auto popover. Other hint popovers may close when a new hint is shown, unless they are in a nested relationship.

~~~html
<button type="button" popovertarget="username-hint">
  Username help
</button>

<div id="username-hint" popover="hint">
  <p>Your username must be between 4 and 20 characters.</p>
</div>
~~~

Hint behavior is useful when supporting information should appear without dismissing a separate auto popover. Some newer popover features may not be supported in older browsers, so check compatibility when using `hint` for an important interaction.

## Understand the top layer

When a popover is shown, the browser places it in the top layer above ordinary page content. It is not clipped by an ancestor's `overflow` setting or covered simply because another element has a larger `z-index`.

The element remains in its original location in the HTML document. The top layer changes how it is painted, not where it appears in the DOM or reading order. Use CSS separately when you want to position or style the popover.

A popover is non-modal. Showing one does not make the rest of the page inert. Users can still interact with the page outside it. If the task should block the background and require the user to respond first, use a modal `<dialog>` opened with `showModal()` instead.

## Compare popovers with related patterns

| Pattern | HTML feature | Main behavior |
| --- | --- | --- |
| Optional content revealed in place | `<details>` and `<summary>` | Expands or collapses content in the document flow |
| Floating supplementary content | `popover` | Displays non-modal content in the top layer |
| Focused blocking task | `<dialog>` with `showModal()` | Displays a modal and makes the rest of the page inert |

Choose based on the interaction users need. A popover is not automatically a disclosure, modal dialog, tooltip, or navigation menu. Its content and controls still need appropriate HTML and clear labels.

## Use popovers without JavaScript

A simple popover can be opened, toggled, and hidden using only HTML attributes:

~~~html
<button type="button" popovertarget="shipping-info"
        popovertargetaction="show">
  Show shipping information
</button>

<section id="shipping-info" popover>
  <h2>Shipping information</h2>
  <p>Orders usually arrive within three business days.</p>
  <button type="button" popovertarget="shipping-info"
          popovertargetaction="hide">
    Close shipping information
  </button>
</section>
~~~

The browser handles the popover state and the button relationship. JavaScript is optional when the built-in actions are enough. Scripts can use the Popover API when a page needs additional behavior.

## Common mistakes

### Assuming `popover` means the element is visible

The `popover` attribute designates an element as a popover and it is hidden initially. A control or script must show it.

### Forgetting the matching ID

The ID in `popovertarget` must match the ID of the popover element. A misspelling or duplicate ID prevents the control from targeting the intended element.

### Treating a popover as a modal dialog

A popover does not block interaction with the rest of the page. Use a modal dialog when the user must handle a focused task before continuing.

### Choosing `manual` without a way to close it

Manual popovers are not light-dismissed and do not close automatically when another opens. Provide a visible hide control or a deliberate way for the application to close them.

### Assuming all popovers close the same way

The `auto`, `manual`, and `hint` behaviors differ. Choose the value that matches how the content should be dismissed and how it should interact with other popovers.

### Putting interactive content into a vague or confusing control

The button that invokes the popover should have a clear label describing what it opens or does. The content inside the popover needs appropriate semantic HTML and usable controls.

### Assuming the top layer changes reading order

The popover appears above the page visually but remains at its original position in the document. Place it near the invoking control when that gives a clearer source and reading order.

## Try it yourself

1. Create an auto popover with a button that toggles it.
2. Change the button to use `popovertargetaction="show"` and add a separate hide button.
3. Add a second auto popover and test what happens when it opens.
4. Change one popover to `manual` and add a clear hide control.
5. Add a hint popover and compare how it interacts with an auto popover.
6. Put the popover inside a container with `overflow: hidden` and observe that it can display in the top layer.
7. Confirm that the page remains interactive outside the popover.
8. Give the popover content a suitable semantic element such as `<nav>` or `<aside>`.
9. Check that every `popovertarget` points to an existing, unique ID.
10. Decide whether a sample interface should use `<details>`, `popover`, or a modal `<dialog>` and explain why.

## Key points

- The global `popover` attribute designates content that the browser can show in the top layer.
- A popover is hidden initially. Use `popovertarget` on a button to control it declaratively.
- `popovertargetaction` accepts `toggle`, `show`, or `hide`; the default is `toggle`.
- Auto popovers support light dismissal and generally close other auto popovers when shown.
- Manual popovers require an explicit close action and can remain open independently.
- Hint popovers provide supplemental content and do not close auto popovers when shown.
- Popovers are non-modal. Use a modal dialog when the rest of the page must be blocked.
- Choose meaningful HTML for the popover content and give every invoking control a clear label.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [44 - Dialog elements](44-dialog-element.md) | [Q&A](../qnas/45-popover-attributes.md) | [Example](../examples/45-popover-attributes.md) | [46 - Template elements](46-template-element.md) |