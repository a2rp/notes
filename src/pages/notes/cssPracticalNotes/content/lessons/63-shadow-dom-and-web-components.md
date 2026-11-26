# 63 - Styling Shadow DOM and web components

Web components can use a shadow tree to keep a component's internal markup and styles separate from the rest of a page. This separation prevents ordinary page selectors from reaching into the component, and prevents ordinary component selectors from leaking out.

The boundary is intentional, but it is not a styling dead end. A component can expose a small public styling interface through its host, inherited custom properties, slots, and shadow parts. Good component styling decides which details belong to the component and which choices a page author may customize.

## Understand the host, shadow tree, and light DOM

A custom element placed in a page is the **host**. Its shadow root contains the component's internal markup and styles. The host's regular child nodes remain in the page's **light DOM** and can be assigned to slots in the shadow tree.

~~~
<plant-card>
  <span slot="title">Sweet basil</span>
</plant-card>
~~~

In this example, plant-card is the host. Its internal shadow tree may contain a heading with a named title slot. The span stays in the light DOM, even though it is rendered at the slot position.

Ordinary document CSS can style the host:

~~~
plant-card {
    display: block;
    margin-block: 1rem;
}
~~~

But a document selector such as .card does not select an internal element with class card inside the shadow root. Similarly, a selector in the component's shadow stylesheet cannot select ordinary ancestors or unrelated page elements.

This scoping protects internal implementation details from accidental selector matches. It does not make the component unstyleable. It means the component needs to define the public ways that page styles can influence it.

## Style the host from inside with :host

Inside a shadow stylesheet, :host selects the custom element that owns that shadow root:

~~~
:host {
    display: block;
    color: #26362c;
    font-family: system-ui, sans-serif;
}
~~~

A component can respond to an attribute on its host by using :host() with a selector:

~~~
:host([featured]) .card {
    border-inline-start: 0.3rem solid #285c42;
}
~~~

The page can set the attribute in HTML:

~~~
<plant-card featured></plant-card>
~~~

The component stylesheet still owns the internal .card element. The attribute gives the host a public state that the shadow stylesheet can use.

Do not rely on an internal class name from the outer page. If a state should be configurable, expose a meaningful host attribute or a documented part instead of asking consumers to target private implementation details.

## Pass theme values with custom properties

Inherited values can pass from the host into the shadow tree. Custom properties are especially useful because the page can set a component theme value without knowing how the component uses it:

~~~
plant-card {
    --plant-card-accent: #285c42;
}
~~~

The shadow stylesheet can consume it and provide a fallback:

~~~
:host {
    --card-accent: var(--plant-card-accent, #596b5e);
}

.card {
    border-block-start: 0.3rem solid var(--card-accent);
}
~~~

The page sets a public value. The component maps that value to its internal design. This lets the component keep its internal selector names private while allowing controlled theming.

Use custom properties for values the component intends to expose, such as an accent color, spacing scale, or type scale. Document the property name and expected value. Do not expose every internal value if consumers do not need to change it.

## Put page-provided content into slots

A slot marks where light DOM content appears in the component:

~~~
<article class="card">
    <h2><slot name="title">Untitled</slot></h2>
    <div class="card__body">
        <slot>Default body content</slot>
    </div>
</article>
~~~

The page assigns content to a named slot by using a matching slot attribute:

~~~
<plant-card>
    <span slot="title">Sweet basil</span>
    <p>A fragrant herb for a sunny container.</p>
</plant-card>
~~~

The span appears at the title slot. The paragraph uses the unnamed default slot. If no content is assigned to a slot, its fallback text or markup can appear.

Slotted nodes remain in the light DOM. The page can style those nodes with its ordinary selectors. A stylesheet inside the shadow tree can target directly assigned elements with ::slotted():

~~~
::slotted(p) {
    margin: 0;
}
~~~

::slotted() only selects elements assigned directly to that slot. It does not let the component stylesheet reach into arbitrary descendants inside a slotted element. Keep that limit in mind when designing the slot content contract.

## Expose selected internals with part

Sometimes a page needs to style a particular internal element. The component can intentionally expose that element with a part attribute:

~~~
<h2 part="title"><slot name="title"></slot></h2>
~~~

The outer page can then style the exposed part:

~~~
plant-card::part(title) {
    font-size: 1.5rem;
    color: #1d4d35;
}
~~~

Only elements with named parts are exposed through this mechanism. An outer selector cannot use ::part() to discover every descendant or traverse the component's full internal tree.

Treat part names as a public styling API. Consumers may rely on them, so change them carefully. Use clear names that describe the exposed role, not the internal class or current layout implementation.

For nested components, a part is not automatically forwarded through every shadow boundary. A component can use the exportparts attribute to deliberately map a nested part to a public name. Expose only the parts that consumers need.

## Keep internal styles and public customization separate

A component can combine several styling channels:

- **Internal selectors** style implementation details inside the shadow tree.
- **:host** styles the custom element itself or reacts to its public attributes.
- **Custom properties** pass documented values from the page into the component.
- **Slots** accept page-provided content.
- **::part()** exposes selected internal elements for outer styling.
- **::slotted()** lets the component style directly assigned light DOM elements.

Choose the narrowest channel that fits the customization. A theme color is usually a good custom property. A replaceable heading is usually slot content. A border or type style on a particular internal title may be an exposed part. An internal wrapper that should never be customized should stay private.

## Do not assume a global reset styles the shadow tree

A document stylesheet, including a reset, does not normally select elements inside a shadow tree. The component should establish any internal defaults it requires, such as box sizing, font inheritance, or spacing.

Some inherited values can come through the host, including text color, font properties, and custom properties. Non-inherited declarations from a page selector do not cross the shadow boundary. Decide which inherited values the component accepts and set the rest explicitly.

A component should also account for its host's layout behavior. Custom elements commonly need an explicit display value, such as block or inline-block, when the default inline behavior is not appropriate.

## Keep the styling API small and stable

Every exposed part, host attribute, slot, and custom property adds a contract for page authors. A focused API is easier to document and maintain than a large collection of implementation details.

Before exposing a style hook, ask:

1. Does a page author have a real use for this customization?
2. Is this a stable role or just an internal class name?
3. Would a custom property or slot be a better fit?
4. Can the component keep a sensible default when the hook is unused?
5. Does changing this hook preserve readable contrast and visible interaction states?

Avoid styles that depend on the exact internal markup. If the component changes its wrappers, a public role-based part can remain stable while its implementation changes.

## Common mistakes

- **Expecting document selectors to reach into a shadow tree:** Ordinary selectors stop at the boundary.
- **Expecting shadow selectors to style page ancestors:** Internal styles are scoped to the shadow tree.
- **Using ::part() without a part attribute:** Only explicitly exposed parts can be selected from outside.
- **Treating part names as private implementation details:** Consumers can depend on part names as a public styling API.
- **Expecting ::slotted() to select nested descendants:** It targets directly assigned elements, not arbitrary content below them.
- **Assuming a page reset reaches component internals:** The component needs its own internal baseline.
- **Exposing too many parts:** The component becomes harder to change without breaking consumers.
- **Using slots for styling instead of content:** Slots are for inserting content into the component's structure.
- **Using parts to pass arbitrary theme values:** Custom properties are usually clearer for values such as color and spacing.
- **Relying on a closed shadow root for security:** Shadow DOM is a styling and encapsulation feature, not a security boundary.
- **Changing public part names without considering consumers:** Treat exposed names and custom properties as component API.

## Try it yourself

1. Create a custom element with a shadow root and an internal card.
2. Add a :host rule that sets the host's display and text font.
3. Set an accent custom property on the host and read it inside the shadow stylesheet.
4. Add a named slot for the title and a default slot for body content.
5. Use ::slotted() to style one type of directly assigned element.
6. Expose the internal title with part="title" and customize it from the page.
7. Try to select an internal class from the page stylesheet and observe that it does not match.
8. Add a second host attribute and use :host() to style an internal variation.
9. Remove the part attribute and confirm that the outer ::part() rule no longer matches.
10. Document which slots, host attributes, parts, and custom properties are part of the component's public API.

## Key points

- Shadow DOM scopes selectors so ordinary styles do not cross the boundary.
- The custom element is the host, and page-provided children remain in the light DOM.
- :host lets the component style its host and respond to public host attributes.
- Custom properties can pass documented theme values into a shadow tree.
- Slots place light DOM content into the component's structure.
- ::slotted() targets directly assigned elements, not their arbitrary descendants.
- ::part() exposes selected internal elements for outer styles.
- A global reset does not replace the component's own internal baseline.
- Keep public customization hooks intentional and stable.
- Shadow DOM provides encapsulation, not security.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [62 - Organizing large stylesheets](62-organizing-large-stylesheets.md) | [Q&A](../qnas/63-shadow-dom-and-web-components.md) | [Example](../examples/63-shadow-dom-and-web-components.md) | [64 - Debugging with browser developer tools](64-debugging-with-browser-devtools.md) |