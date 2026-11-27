# 115 - Web Components, custom elements, and Shadow DOM

Web Components are browser features for building reusable interface elements. They let a page define its own HTML tags, isolate part of an element's DOM and styles, and provide named insertion points for consumer content. The browser supplies these features directly, so a component does not require a framework.

Web Components is an umbrella term for several pieces that work together:

- **Custom elements** define new element names and their behavior.
- **Shadow DOM** gives an element a separate DOM subtree with its own style scope.
- **Templates** hold reusable markup that is inert until code clones it.
- **Slots** let a component display content supplied by the page using it.

These features are independent. A custom element can use light DOM without a shadow root, and a shadow root can exist without a custom element. Choose each feature to solve a clear need.

## Learning goals

After this lesson, you should be able to:

- define an autonomous custom element and use its lifecycle callbacks;
- treat attributes and properties as a clear public API;
- create and style a shadow tree without treating it as a security boundary;
- expose page-authored content through named and default slots;
- design custom events that can cross a shadow boundary intentionally;
- preserve native semantics and clean up work when an element disconnects.

## Custom elements

A custom element is an element whose behavior is registered with the browser's `CustomElementRegistry`. An autonomous custom element has a name containing a hyphen, such as `<user-card>` or `<site-navigation>`. The hyphen distinguishes custom names from current and future built-in HTML elements.

```js
class GreetingCard extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello from a custom element.";
  }
}

customElements.define("greeting-card", GreetingCard);
```

After registration, the browser can construct `<greeting-card>` elements in parsed HTML or with `document.createElement("greeting-card")`. Register a name once in a given registry. Defining a name or constructor that is already registered throws an error.

Custom element names have additional validity rules. They must contain a hyphen, cannot be a reserved name, and must satisfy the HTML name rules. Use a meaningful, project-specific name so it is unlikely to conflict with another component.

### Autonomous and customized built-in elements

An autonomous custom element extends `HTMLElement` and uses its own tag name:

```js
class UserCard extends HTMLElement {}
customElements.define("user-card", UserCard);
```

A customized built-in element extends an HTML element interface and adds behavior to a built-in tag. It is registered with an `extends` option and used with an `is` attribute:

```js
class FancyButton extends HTMLButtonElement {}
customElements.define("fancy-button", FancyButton, { extends: "button" });
```

```html
<button is="fancy-button">Save</button>
```

Customized built-ins retain the built-in element's local name and behavior. Browser support has historically been less uniform than for autonomous elements, so check support for your target browsers before depending on them. An autonomous custom element is often a simpler choice when broad support matters.

## Constructors and lifecycle

A custom element constructor must call `super()` before using `this`. Keep it focused on initializing internal state and creating the element's own shadow root. Do not inspect its attributes or children, add light DOM children, or perform work that assumes the element is connected. Attributes and children may not have been fully assigned when construction happens.

The browser calls lifecycle callbacks as the element changes:

| Callback | When it is used |
| --- | --- |
| `connectedCallback()` | The element is inserted into a document, or connected again. |
| `disconnectedCallback()` | The element is removed from a document. |
| `adoptedCallback()` | The element is moved to a different document. |
| `attributeChangedCallback(name, oldValue, newValue)` | A listed observed attribute is added, removed, or changed. |

An element can be disconnected and reconnected more than once. `connectedCallback()` is not a one-time initializer. Start connection-dependent work there, make setup safe to repeat, and stop listeners, observers, timers, or other ongoing work in `disconnectedCallback()`.

```js
class LiveClock extends HTMLElement {
  constructor() {
    super();
    this._update = this._update.bind(this);
    this._timer = null;
  }

  connectedCallback() {
    this._update();
    this._timer = window.setInterval(this._update, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this._timer);
    this._timer = null;
  }

  _update() {
    this.textContent = new Date().toLocaleTimeString();
  }
}
```

This simple clock writes into light DOM. In a real component, keep ownership of content clear: avoid overwriting children that the page supplies. A shadow root or a dedicated internal container can separate component-owned output from consumer-provided markup.

## Observed attributes and public state

Only attributes listed in the static `observedAttributes` property trigger `attributeChangedCallback()`:

```js
class StatusBadge extends HTMLElement {
  static observedAttributes = ["status"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "status" && oldValue !== newValue) {
      this._renderStatus(newValue);
    }
  }

  _renderStatus(status) {
    // Update component-owned rendering from the new value.
  }
}
```

The callback can run when an observed attribute is first applied, when it is later changed or removed, and when an unresolved element is upgraded after its attributes already exist. Code should handle `newValue` being `null`, and should ignore a value that did not actually change when appropriate.

HTML attributes are strings. Decide how strings map to component state:

- A presence attribute such as `disabled` is usually read with `hasAttribute()`.
- A numeric attribute needs parsing, a fallback, and a policy for invalid values.
- A token attribute such as `status="warning"` should accept a documented set of values.

Properties are JavaScript values and can hold types that attributes cannot, such as objects or functions. A component may expose both an attribute and a property, but define how they stay in sync. Avoid an endless loop where changing the property writes an attribute, then the attribute callback writes the property again. If the attribute is the public source of truth, a property setter can update the attribute and the callback can update rendering.

```js
class ProgressLabel extends HTMLElement {
  static observedAttributes = ["value"];

  get value() {
    return Number(this.getAttribute("value") ?? 0);
  }

  set value(nextValue) {
    this.setAttribute("value", String(nextValue));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render();
    }
  }
}
```

This example leaves validation out. Production components should clamp or reject values according to their documented API rather than accidentally accepting `NaN`, unsupported tokens, or impossible ranges.

## Shadow DOM

A shadow root is a separate DOM tree attached to an element, called its **host**. Create it with `attachShadow()`:

```js
class SearchPanel extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `<p>Search controls belong to this component.</p>`;
  }
}
```

With `mode: "open"`, code can access the root through `element.shadowRoot`. With `mode: "closed"`, that property returns `null` to outside code. Closed mode is not a security boundary: code that creates or otherwise holds the root can still use it, and page scripts can often interact with the host. Do not put secrets in a shadow tree.

Shadow DOM can isolate selectors and organize internal markup. It does not make a component impossible to inspect, guarantee privacy, or replace good API design. A shadow root is useful when a component needs internal structure and style isolation. It is unnecessary for a tiny behavior that has no internal markup.

### Templates

A `<template>` element stores a `DocumentFragment` in its `content`. Its markup is not rendered as part of the page until code clones and inserts it. This makes templates useful for component markup that will be instantiated more than once.

```html
<template id="notice-template">
  <style>
    p { border-inline-start: 0.25rem solid steelblue; padding: 0.75rem; }
  </style>
  <p><slot></slot></p>
</template>
```

```js
const template = document.querySelector("#notice-template");
const root = this.attachShadow({ mode: "open" });
root.append(template.content.cloneNode(true));
```

A template is inert storage, not a rendered subtree. Clone its content for each component instance. Avoid using `innerHTML` with untrusted strings: parsing an untrusted string as markup can introduce cross-site scripting. Prefer DOM methods and `textContent` for user-provided text.

## Light DOM and slots

The **light DOM** is the markup between a custom element's opening and closing tags. A component can project that content into its shadow tree with `<slot>`:

```html
<user-card>
  <strong slot="name">Asha</strong>
  <p>Learning to build accessible interfaces.</p>
</user-card>
```

```html
<template id="user-card-template">
  <article>
    <h2><slot name="name">User</slot></h2>
    <div><slot></slot></div>
  </article>
</template>
```

A light DOM child with `slot="name"` is assigned to the slot whose `name` matches. Children without a `slot` attribute go to the default slot. If no matching content is assigned, fallback children inside the slot are shown. Slotting changes where light DOM content is rendered; it does not move those nodes into the shadow tree.

Use slots when consumers should supply content while the component controls the surrounding structure. Do not copy consumer nodes into the shadow tree unless copying is intentional. A `slotchange` event can tell the component that the set of assigned nodes changed.

`::slotted()` can style assigned elements from a shadow stylesheet, but it matches only elements assigned directly to that slot. It does not select arbitrary descendants inside those elements. Keep most component styling on the component's own internal elements.

## Styling across the boundary

Selectors in a shadow stylesheet generally match nodes in that shadow tree, not arbitrary page content. Page styles also do not select internal shadow nodes with ordinary selectors. The boundary still has deliberate styling hooks:

- inherited properties and CSS custom properties can provide values from the host or its ancestors;
- `:host` selects the custom element from inside its shadow stylesheet;
- `::slotted()` styles directly assigned elements in a slot;
- the `part` attribute and `::part()` expose selected internal elements as a styling API.

```html
<!-- Inside a component template -->
<button part="action">Continue</button>
```

```css
/* In the page stylesheet */
my-panel::part(action) {
  border-radius: 0.5rem;
}
```

Expose only the parts consumers are meant to style. Every exposed part becomes a public styling surface that may be used by pages, so changing its name or structure can affect consumers. CSS custom properties are useful for theming without exposing all internal selectors.

## Events and shadow boundaries

Events dispatched inside a shadow tree can cross its boundary according to their event flags. For events crossing the boundary, the browser retargets `event.target` so outside listeners generally see the host rather than a private internal button. `event.composedPath()` can show the propagation path available to that listener.

A `CustomEvent` does not bubble or cross a shadow boundary by default. If an event is part of the component's public API and parent code should listen for it, set the needed options deliberately:

```js
this.dispatchEvent(new CustomEvent("selection-change", {
  bubbles: true,
  composed: true,
  detail: { value: "weekly" }
}));
```

A consumer can listen on the custom element or an ancestor:

```js
document.querySelector("schedule-picker").addEventListener(
  "selection-change",
  (event) => {
    console.log(event.target); // the schedule-picker host
    console.log(event.detail.value); // "weekly"
  }
);
```

Use a clear event name and a small documented `detail` object. Do not dispatch internal click or keystroke details as public events unless consumers need them. Choose `bubbles` and `composed` based on the intended listener location and component boundary, not by habit.

## Accessibility and native behavior

A custom tag does not automatically gain the semantics, keyboard behavior, form behavior, or accessibility support of a built-in element. Prefer native HTML inside the component whenever it fits:

- use a real `<button>` for an action, not a clickable `<div>`;
- preserve visible focus and support keyboard activation;
- give controls an accessible name and associate labels where appropriate;
- announce changing status only when users need that update;
- keep heading levels and landmarks meaningful in the page context;
- test the component with keyboard navigation and assistive technology.

A shadow boundary does not excuse inaccessible markup. Component authors need to decide how labels and focus work across the host and its internal controls. Form-associated custom elements can integrate with forms using `ElementInternals`, but that is an advanced feature and should be designed with the form and accessibility requirements in mind.

## Loading and upgrading custom elements

The browser can encounter a custom tag before its definition has loaded. Until the name is registered, the element is an unresolved custom element. When code later calls `customElements.define()`, matching elements are upgraded and their constructors and callbacks run.

Load component modules in a predictable order. A normal module script is deferred until HTML parsing finishes:

```html
<script type="module" src="/components/user-card.js"></script>
```

Code can wait for a definition before using a component-specific API:

```js
await customElements.whenDefined("user-card");
```

If a page can use an element before its module arrives, provide sensible fallback content in its light DOM or template. Do not assume a custom element is ready solely because its tag is present in the document.

## Component design checklist

Before adding a custom element, decide:

1. What problem does this element solve that a function or ordinary markup does not?
2. What attributes, properties, events, slots, and styling hooks are public?
3. Which state belongs in attributes, which belongs in properties, and what is reflected?
4. Can the element disconnect and reconnect without duplicating listeners or work?
5. Does it use native semantics and preserve keyboard and focus behavior?
6. Are values and user-provided content handled safely?
7. Does its shadow root provide a real benefit, or is light DOM simpler?
8. What browsers and assistive technologies must it support?

## Common mistakes

- Registering a name twice or choosing a name without a hyphen.
- Doing connection-dependent work in the constructor.
- Assuming `connectedCallback()` runs exactly once.
- Adding listeners or observers without cleaning them up.
- Treating closed Shadow DOM as private or secure.
- Forgetting that HTML attributes are strings and can be absent or invalid.
- Using a shadow root when ordinary markup would be easier to style and understand.
- Making a custom tag interactive without native keyboard behavior or accessible semantics.
- Dispatching an event that cannot bubble or cross the boundary when outside code needs to hear it.
- Exposing every internal selector instead of a small set of intentional styling hooks.
- Treating a slot as a copy of the assigned light DOM nodes.
- Inserting untrusted strings with `innerHTML`.

## Key points

- Custom elements add browser-recognized behavior to a hyphenated tag name.
- Lifecycle callbacks connect component work to insertion, removal, adoption, and observed attribute changes.
- Attributes, properties, events, slots, and styling hooks form a component's public API.
- Shadow DOM creates a separate tree and style scope, not a security barrier.
- Slots render consumer-owned light DOM content inside a component's structure.
- Public custom events need suitable `bubbles` and `composed` options to reach outside listeners.
- Native HTML, cleanup, clear API boundaries, and safe DOM handling remain essential.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [114 - Mutation, intersection, and resize observers](114-mutation-intersection-and-resize-observers.md) | [Open Q&A](../qnas/115-web-components-custom-elements-and-shadow-dom.md) | [Open example](../examples/115-web-components-custom-elements-and-shadow-dom.md) | [116 - WebSockets, Server-Sent Events, and real-time updates](116-websockets-server-sent-events-and-real-time-updates.md) |

