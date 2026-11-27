# 115 - Web Components, custom elements, and Shadow DOM: Q&A

This chapter reviews custom elements, lifecycle callbacks, Shadow DOM, templates, slots, styling, events, and accessible component design. Each answer follows its question so you can check your understanding as you go.

## Multiple-choice questions

### 1. Which tag name is a valid choice for an autonomous custom element?

A. `<usercard>`  
B. `<user-card>`  
C. `<UserCard>`  
D. `<custom>`

**Answer: B. `<user-card>`.**

**Explanation:** An autonomous custom element name must contain a hyphen and follow the HTML custom-element name rules. A hyphen helps distinguish custom names from built-in elements.

### 2. Which class should a basic autonomous custom element extend?

A. `HTMLElement`  
B. `Document`  
C. `NodeList`  
D. `EventTarget`

**Answer: A. `HTMLElement`.**

**Explanation:** Autonomous custom elements extend `HTMLElement`. Customized built-in elements extend a specific built-in element interface, such as `HTMLButtonElement`.

### 3. What is the normal method for registering a custom element?

A. `document.register()`  
B. `customElements.define()`  
C. `HTMLElement.create()`  
D. `window.addTag()`

**Answer: B. `customElements.define()`.**

**Explanation:** The browser's custom element registry associates a valid name with a constructor.

### 4. Which callback runs when an element is inserted into a document?

A. `loadedCallback()`  
B. `connectedCallback()`  
C. `insertedCallback()`  
D. `readyCallback()`

**Answer: B. `connectedCallback()`.**

**Explanation:** This callback can run again if the element is removed and later reinserted, so connection work should be safe to repeat.

### 5. What must a custom element constructor do before using `this`?

A. Call `document.readyState`  
B. Call `super()`  
C. Call `connectedCallback()`  
D. Register the element again

**Answer: B. Call `super()`.**

**Explanation:** A derived JavaScript class must call its parent constructor before accessing `this`.

### 6. What is the purpose of `static observedAttributes`?

A. It lists attributes that trigger `attributeChangedCallback()`.  
B. It lists all CSS custom properties.  
C. It defines the element's child nodes.  
D. It registers event listeners automatically.

**Answer: A.**

**Explanation:** The browser observes only the attribute names returned in this static list for `attributeChangedCallback()` notifications.

### 7. In an open shadow root, how can outside JavaScript access the root?

A. `element.shadowRoot`  
B. `element.childNodes`  
C. `document.shadowRoot`  
D. `element.template`

**Answer: A. `element.shadowRoot`.**

**Explanation:** The host exposes an open shadow root through `shadowRoot`. A closed root is not returned by that property, but closed mode is not a security boundary.

### 8. What does a `<slot>` do in a shadow tree?

A. Copies shadow nodes into light DOM.  
B. Provides a place to render assigned light DOM content.  
C. Registers the custom element.  
D. Makes every child a shadow root.

**Answer: B.**

**Explanation:** A slot projects consumer-provided light DOM nodes into the component's shadow-tree layout. The assigned nodes remain light DOM nodes.

### 9. Which event options let a custom event bubble and cross a shadow boundary?

A. `{ bubbles: true, composed: true }`  
B. `{ cancelable: true }`  
C. `{ capture: true }`  
D. `{ once: true }`

**Answer: A.**

**Explanation:** `bubbles` controls bubbling through ancestors. `composed` controls whether an event can cross a shadow boundary. They are separate choices.

### 10. What does `customElements.whenDefined("user-card")` provide?

A. A promise that resolves when the name is registered.  
B. A new `user-card` element.  
C. The custom element constructor immediately, even if unregistered.  
D. A shadow root for every `user-card` element.

**Answer: A.**

**Explanation:** It is useful when code must wait for the definition before using component-specific behavior.

## True or false

### 11. A custom element's `connectedCallback()` is guaranteed to run only once.

**Answer: False.**

**Explanation:** An element can be removed and reinserted. Its connection callback can run each time it becomes connected.

### 12. A component should usually remove connection-dependent listeners and observers in `disconnectedCallback()`.

**Answer: True.**

**Explanation:** Cleanup avoids stale work and retained references after the element leaves the document. If the element reconnects, its setup should be able to run again.

### 13. Attributes always contain JavaScript numbers or booleans.

**Answer: False.**

**Explanation:** HTML attributes are strings or absent. A component must parse and validate values such as numbers, and boolean attributes are commonly represented by presence or absence.

### 14. A `closed` shadow root keeps its contents secret from the page and provides a security boundary.

**Answer: False.**

**Explanation:** Closed mode limits access through the host's `shadowRoot` property. It does not protect secrets or make the component secure against page scripts.

### 15. A light DOM node assigned to a slot becomes a child inside the shadow tree.

**Answer: False.**

**Explanation:** Slotting changes where the node is rendered. The assigned node remains in the host's light DOM.

### 16. `::slotted()` can select any descendant nested inside a slotted element.

**Answer: False.**

**Explanation:** `::slotted()` matches elements assigned directly to a slot. It does not reach arbitrary descendants of those elements.

### 17. A `CustomEvent` bubbles and crosses a shadow boundary by default.

**Answer: False.**

**Explanation:** Those behaviors are off by default. Set `bubbles` and `composed` explicitly when the component API requires them.

### 18. Shadow DOM style isolation means that inherited values and CSS custom properties cannot cross from the page into the component.

**Answer: False.**

**Explanation:** Shadow DOM limits selector reach, but inherited properties and custom properties can provide deliberate theming inputs across the boundary.

## Short-answer questions

### 19. Why should an autonomous custom element name contain a hyphen?

**Answer:** The hyphen distinguishes a custom-element name from built-in HTML element names and is part of the validity requirements for autonomous custom elements.

### 20. What is the difference between an autonomous custom element and a customized built-in element?

**Answer:** An autonomous element extends `HTMLElement` and uses its own tag, such as `<user-card>`. A customized built-in extends a specific built-in interface and enhances an existing tag using the `is` attribute.

**Explanation:** Check browser support before relying on customized built-ins because support has historically been less uniform.

### 21. Why should a constructor avoid reading attributes and children?

**Answer:** The element may be constructed before its attributes and children have been fully assigned. The constructor should establish internal state and the component's own root, then use lifecycle callbacks for connection and observed-attribute work.

### 22. What does `attributeChangedCallback(name, oldValue, newValue)` receive when an observed attribute is removed?

**Answer:** `newValue` is `null`.

**Explanation:** Attribute callbacks can also happen for initial attributes when an element is upgraded. Code should handle missing and invalid values.

### 23. What is the difference between an attribute and a JavaScript property on a custom element?

**Answer:** An attribute is declarative markup represented as a string or as absent. A property is a JavaScript value on the element and can hold values such as numbers, objects, or functions.

**Explanation:** If an API exposes both, document which one is authoritative and how changes are reflected to avoid update loops.

### 24. What does the `slot` attribute on a light DOM child name?

**Answer:** It names the slot in the shadow tree to which that child is assigned. A child with no `slot` attribute is assigned to the default slot.

### 25. When can a `slotchange` event be useful?

**Answer:** It can tell a component that the set of nodes assigned to a slot has changed.

**Explanation:** It is about slot assignment changes, not a general notification for every text or attribute change inside an assigned node.

### 26. What is one important difference between `bubbles` and `composed` on an event?

**Answer:** `bubbles` lets the event travel up through ancestors in its tree. `composed` lets the event cross a shadow boundary. A component may need both for an outside ancestor listener to receive a custom event.

### 27. What does event retargeting mean at a shadow boundary?

**Answer:** An outside listener generally sees the custom-element host as `event.target` rather than seeing a private internal node as the target.

**Explanation:** This keeps implementation details from becoming the normal outside event target. The public API should expose useful data through a documented event and its `detail` value.

### 28. When should a component expose a `part` name?

**Answer:** When page authors are intentionally allowed to style a particular internal element with `::part()`.

**Explanation:** Exposed parts are a styling API. Expose only stable, useful hooks instead of every internal element.

### 29. What is one reason to use a `<template>` for a component's markup?

**Answer:** Its content is stored inertly and can be cloned for each component instance, keeping reusable structure separate from instance setup.

### 30. Name two accessibility responsibilities when creating a custom element.

**Answer:** Any two of: use native controls when possible, provide accessible names, preserve keyboard operation and visible focus, choose appropriate semantics, and test with keyboard navigation and assistive technology.

**Explanation:** A custom tag does not automatically inherit the behavior or semantics of a native button, input, or landmark.

## Code and design questions

### 31. Complete the registration code for a class named `NoticeBanner`.

```js
class NoticeBanner extends HTMLElement {}

// Add the registration call.
```

**Answer:**

```js
customElements.define("notice-banner", NoticeBanner);
```

**Explanation:** The tag name is lowercase and contains a hyphen. Register a given name and constructor only once per registry.

### 32. Write an `observedAttributes` declaration for a component that watches `value` and `disabled`.

**Answer:**

```js
static observedAttributes = ["value", "disabled"];
```

The declaration belongs inside the custom element class.

### 33. A component starts a `MutationObserver` in `connectedCallback()`. Where should it normally stop observing?

**Answer:** In `disconnectedCallback()`, using `disconnect()` or an appropriate `unobserve()` call.

**Explanation:** A component should release connection-dependent work when removed. It can start observing again if it reconnects.

### 34. Dispatch a public `item-selected` event with a `detail` object containing `{ id: "item-7" }`, so an ancestor listener can receive it across a shadow boundary.

**Answer:**

```js
this.dispatchEvent(new CustomEvent("item-selected", {
  bubbles: true,
  composed: true,
  detail: { id: "item-7" }
}));
```

**Explanation:** The event name and `detail` shape are part of the component's API. Add `cancelable: true` only if consumers are meant to cancel the action.

### 35. A component receives a `label` attribute. What should it do if that attribute can be missing?

**Answer:** Define a sensible fallback and handle `null` explicitly, for example:

```js
const label = this.getAttribute("label") ?? "Untitled";
```

**Explanation:** An absent attribute returns `null`. Do not assume every element has valid input.

### 36. A component must expose its internal button to page CSS. Show the markup and selector.

**Answer:**

```html
<!-- In the component's shadow markup -->
<button part="action">Save</button>
```

```css
<!-- In the page stylesheet -->
my-editor::part(action) {
  border-radius: 0.5rem;
}
```

**Explanation:** `part` and `::part()` create an explicit styling hook across the shadow boundary.

### 37. A custom element writes this in `connectedCallback()`: `this.innerHTML = "Loaded"`. What design concern should you check?

**Answer:** It may erase light DOM children supplied by the page, and the callback may run again after reconnection. Keep component-owned rendering separate from consumer-owned content and make repeated connection work safe.

### 38. A page listens for a click on a button inside a shadow root. Why might `event.target` outside the component be the host?

**Answer:** Events crossing a shadow boundary are retargeted so outside code generally sees the host instead of an internal implementation node.

### 39. A component inserts a user-provided string with `shadowRoot.innerHTML = value`. What should be changed?

**Answer:** Treat the string as text and use `textContent` or DOM methods to create nodes. Parsing untrusted data as HTML can cause cross-site scripting.

### 40. You need to know whether a custom element's module has registered its name before calling a component-specific method. What can you await?

**Answer:**

```js
await customElements.whenDefined("user-card");
```

**Explanation:** The promise resolves when that name is defined in the registry. It does not wait for unrelated asynchronous work inside the component.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [114 - Mutation, intersection, and resize observers](../qnas/114-mutation-intersection-and-resize-observers.md) | [Open lesson](../lessons/115-web-components-custom-elements-and-shadow-dom.md) | [Open example](../examples/115-web-components-custom-elements-and-shadow-dom.md) | [116 - WebSockets, Server-Sent Events, and real-time updates](../lessons/116-websockets-server-sent-events-and-real-time-updates.md) |

