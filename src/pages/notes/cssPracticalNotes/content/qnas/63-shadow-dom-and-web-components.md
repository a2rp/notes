# 63 - Styling Shadow DOM and web components - Q&A

Use these questions to review shadow trees, hosts, slots, custom properties, and the styling hooks a component can expose. Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the custom element that owns a shadow root called?

- A. The host
- B. The slot
- C. The part
- D. The light selector

**Answer: A. The host.**

**Explanation:** The host is the custom element in the document that owns the shadow tree.

### 2. What does Shadow DOM primarily provide for CSS?

- A. A scope boundary around component internals
- B. A way to disable the cascade
- C. A replacement for HTML semantics
- D. A guarantee that a page has no styles

**Answer: A. A scope boundary around component internals.**

**Explanation:** Ordinary page selectors do not normally select elements inside a shadow tree, and shadow stylesheet selectors do not select unrelated page elements.

### 3. Can this document rule normally select an internal element inside a shadow tree?

~~~
.card { border: 1px solid; }
~~~

- A. Yes, any class selector can cross a shadow boundary
- B. No, the selector is scoped to the document tree
- C. Only if the shadow root is open
- D. Only if the host has an ID

**Answer: B. No, the selector is scoped to the document tree.**

**Explanation:** A class inside the shadow tree is not automatically reachable from an ordinary document stylesheet.

### 4. What does :host select when used in a shadow stylesheet?

- A. The custom element that owns the shadow root
- B. Every element in the page
- C. Only a slotted paragraph
- D. An element exposed by part

**Answer: A. The custom element that owns the shadow root.**

**Explanation:** It lets the component define styles for its host from inside the shadow context.

### 5. What does :host([featured]) match inside a component stylesheet?

- A. The host when it has the featured attribute
- B. Every element with class featured in the page
- C. Only the first slot
- D. A part named featured

**Answer: A. The host when it has the featured attribute.**

**Explanation:** The argument to :host() checks the host's selector state.

### 6. Which mechanism is usually best for passing a theme color into a component?

- A. A documented custom property
- B. A long selector into the shadow tree
- C. A slot
- D. A part name used as a color

**Answer: A. A documented custom property.**

**Explanation:** The page can set a value on the host, and the component can consume it internally with var().

### 7. What does a named slot do?

- A. Places matching light DOM content at a named location in the shadow tree
- B. Exposes every internal class
- C. Changes the host into a button
- D. Loads a stylesheet

**Answer: A. Places matching light DOM content at a named location in the shadow tree.**

**Explanation:** A child with slot="title" is assigned to a shadow slot whose name is title.

### 8. Where does slotted content remain in the DOM?

- A. In the light DOM
- B. It moves permanently into the shadow tree
- C. It becomes a CSS pseudo-element
- D. It is removed after rendering

**Answer: A. In the light DOM.**

**Explanation:** Slotting changes where the content is rendered in the composed presentation, but the assigned node remains a light DOM node.

### 9. Which selector is used inside shadow CSS to style a directly assigned paragraph?

- A. ::part(p)
- B. ::slotted(p)
- C. :host(p)
- D. ::shadow(p)

**Answer: B. ::slotted(p).**

**Explanation:** ::slotted() lets a shadow stylesheet target elements assigned directly to a slot.

### 10. Can ::slotted(p) style a span nested inside the assigned paragraph?

- A. Yes, it recursively selects all descendants
- B. No, it selects the directly assigned element, not arbitrary descendants
- C. Only if the span has an ID
- D. Only when the slot is unnamed

**Answer: B. No, it selects the directly assigned element, not arbitrary descendants.**

**Explanation:** The selector does not provide a way to traverse into arbitrary nested content.

### 11. What does the part attribute do?

- A. Exposes a selected internal element for outer styling
- B. Assigns a child to a named slot
- C. Creates a new shadow root
- D. Sets a CSS custom property

**Answer: A. Exposes a selected internal element for outer styling.**

**Explanation:** An element marked part="title" can be targeted from outside with host::part(title).

### 12. Which outer selector can style a component's exposed title part?

- A. .title
- B. plant-card .title
- C. plant-card::part(title)
- D. :host(title)

**Answer: C. plant-card::part(title).**

**Explanation:** The component must expose the internal element with part="title" for the outer selector to match it.

### 13. Which statement about custom properties and Shadow DOM is correct?

- A. They can be inherited from the host and consumed inside the shadow tree
- B. They always expose every internal selector
- C. They only work on light DOM elements
- D. They disable encapsulation

**Answer: A. They can be inherited from the host and consumed inside the shadow tree.**

**Explanation:** Custom properties offer a controlled way to pass values such as colors or spacing across the boundary.

### 14. Does an open shadow root provide a security boundary?

- A. Yes, it prevents scripts and styles from interacting
- B. No, Shadow DOM is an encapsulation and styling mechanism, not a security boundary
- C. Yes, but only for CSS
- D. It depends on whether the host has a class

**Answer: B. No, Shadow DOM is an encapsulation and styling mechanism, not a security boundary.**

**Explanation:** Do not rely on shadow root mode to protect sensitive information or enforce access control.

## Short-answer questions

### 15. What is the difference between the shadow tree and the light DOM?

**Answer:** The shadow tree is the component's internal subtree rooted at its shadow root. The light DOM is the ordinary child content placed inside the custom element by the page.

**Explanation:** A slot can render light DOM nodes at a location inside the shadow tree without changing their tree ownership.

### 16. Why might a component set display: block in :host?

**Answer:** A custom element's default layout behavior may not fit the component. Setting display explicitly makes its intended host layout clear.

**Explanation:** The component should choose the host display value that fits how it is meant to participate in the page.

### 17. What can :host() be used for?

**Answer:** It can match the host when it satisfies a selector, such as having a featured attribute.

**Explanation:** This lets a component respond internally to documented host attributes without exposing internal class names.

### 18. Why are custom properties useful as a component styling API?

**Answer:** They allow a page to provide documented values, such as an accent color, while the component keeps its internal selectors private.

**Explanation:** The component can use var() with a fallback and decide exactly where the value affects its internals.

### 19. What is fallback content in a slot?

**Answer:** It is the content placed inside the slot element in the shadow tree. It can appear when no matching light DOM content is assigned.

**Explanation:** Fallback content gives a component a useful default when an optional slot is left empty.

### 20. What does ::part() expose?

**Answer:** It exposes only internal elements deliberately marked with matching part names.

**Explanation:** It does not let outer styles inspect or select every element in the shadow tree.

### 21. How does a nested component expose a part through another shadow boundary?

**Answer:** The intermediate component can deliberately forward it with the exportparts attribute.

**Explanation:** Part exposure is not automatically forwarded through every nested component.

### 22. Why should public part names be changed carefully?

**Answer:** Page authors may use those names in their stylesheets, so a rename can break consumer styling.

**Explanation:** Treat part names like other public component API names, such as attributes and custom properties.

### 23. Why does a component need its own internal baseline styles?

**Answer:** A document reset does not normally select elements inside the shadow tree.

**Explanation:** The component should set the internal defaults it needs, while inherited values and custom properties can still be accepted from the host.

### 24. Does slotting let a component take ownership of page-provided content?

**Answer:** No. Slotted nodes remain in the light DOM and are assigned for rendering at the slot position.

**Explanation:** The page can style those nodes normally, while the component can use ::slotted() for direct assigned elements.

### 25. How should a component decide which internal styles to expose?

**Answer:** Expose only stable customization points with a real consumer need. Use slots for content, custom properties for values, and parts for selected internal elements.

**Explanation:** A small public API lets the implementation change without breaking page styles.

## Applied questions

### 26. A page wants to change the border color of an internal card. What should the component expose?

**Answer:** It could expose a documented custom property for the border color or expose the card with a part name if styling the card itself is an intended customization.

**Explanation:** Choose the narrower API. A custom property is often better when only a value needs to change.

### 27. A page rule does not affect a component's internal title:

~~~
plant-card .card__title {
    color: green;
}
~~~

What should be changed?

**Answer:** The component can expose the title with part="title", then the page can target it:

~~~
plant-card::part(title) {
    color: green;
}
~~~

**Explanation:** A normal descendant selector does not cross the shadow boundary. The component must intentionally expose the title.

### 28. The component should let the page provide a custom title. What markup should the shadow tree contain?

**Answer:**

~~~
<h2 part="title">
    <slot name="title">Untitled</slot>
</h2>
~~~

The page can provide:

~~~
<plant-card>
    <span slot="title">Sweet basil</span>
</plant-card>
~~~

**Explanation:** The named slot accepts page content, while the heading is also exposed as a styleable part.

### 29. A component needs to style an assigned paragraph but not its nested strong element. What selector can it use?

**Answer:**

~~~
::slotted(p) {
    margin: 0;
}
~~~

**Explanation:** It styles the directly assigned paragraph. It does not select arbitrary descendants inside that paragraph.

### 30. A page should theme all plant cards with the same accent. Show one approach.

**Answer:**

~~~
plant-card {
    --plant-card-accent: #285c42;
}
~~~

Inside the component:

~~~
.card {
    border-color: var(--plant-card-accent, #596b5e);
}
~~~

**Explanation:** The custom property is a documented host-level value, and the internal rule controls how the value is used.

### 31. A component has a featured variation. How can its internal stylesheet respond to a host attribute?

**Answer:**

~~~
:host([featured]) .card {
    border-inline-start-width: 0.4rem;
}
~~~

The page sets the state with:

~~~
<plant-card featured></plant-card>
~~~

**Explanation:** :host() matches the host based on its attribute and lets the component style its own internal card.

### 32. A component has a private class named .layout-wrapper. Should it expose that class as a part?

**Answer:** Not unless consumers have a real need to style that wrapper and its role is stable.

**Explanation:** Exposing implementation details makes future markup changes harder. Expose a public role such as title or actions only when customization is intended.

### 33. A page's global reset sets every article margin to zero. Does that rule also reset an article inside a shadow tree?

**Answer:** No, an ordinary document selector does not cross into the component's shadow tree.

**Explanation:** The component should define any internal reset or spacing that it needs.

### 34. A developer uses a closed shadow root to protect private customer information. Is that sufficient?

**Answer:** No. Shadow DOM is not a security boundary and should not be used for access control or protection of sensitive data.

**Explanation:** Security must be enforced by appropriate application and server-side controls, not by CSS scoping.

## Practice task

Design a plant-card component API with a title slot, a default body slot, a featured host attribute, an accent custom property, and an exposed title part. Explain what page authors can customize and what stays private.

**One possible API:**

Page markup:

~~~html
<plant-card featured>
    <span slot="title">Sweet basil</span>
    <p>A fragrant herb for a sunny container.</p>
</plant-card>
~~~

Shadow stylesheet:

~~~css
:host {
    display: block;
    color: var(--plant-card-text, #26362c);
}

:host([featured]) .card {
    border-inline-start: 0.3rem solid
        var(--plant-card-accent, #285c42);
}

.card {
    padding: 1rem;
}
~~~

Shadow template:

~~~html
<article class="card">
    <h2 part="title"><slot name="title">Untitled</slot></h2>
    <slot>Details are not available.</slot>
</article>
~~~

**Explanation:** The page supplies content through slots and opts into a documented featured state. Custom properties provide theme values. The title is exposed as a part. The internal card class stays private.
## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [62 - Organizing large stylesheets](../lessons/62-organizing-large-stylesheets.md) | [Q&A](63-shadow-dom-and-web-components.md) | [Example](../examples/63-shadow-dom-and-web-components.md) | [64 - Debugging with browser developer tools](../lessons/64-debugging-with-browser-devtools.md) |