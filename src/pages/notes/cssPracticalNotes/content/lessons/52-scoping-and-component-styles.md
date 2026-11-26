# 52 - Scoped styles and component styling

CSS scopes let a stylesheet limit where selected rules can match. The `@scope` at-rule gives component styles a clear root and, optionally, a boundary that stops those styles from reaching nested content.

A CSS scope helps organize and constrain selector matching. It is not complete style or DOM isolation: inherited properties can still pass into descendants, and rules outside the scope can still participate in the cascade.

## Learning outcomes

After this chapter, you should be able to:

- Create a scope with the `@scope` at-rule.
- Identify a scope root and an optional scope limit.
- Use relative selectors and `:scope` inside a scoped rule list.
- Explain how scope proximity affects the cascade.
- Keep a nested component's styles separate from an outer component's rules.
- Distinguish CSS scoping from Shadow DOM and CSS Modules.

## What a CSS scope does

A scope starts at one or more elements matched by its root selector. Rules inside the scope can match elements within that subtree:

~~~css
@scope (.notice) {
  h2 {
    margin-block: 0 0.5rem;
  }

  p {
    color: #334155;
  }
}
~~~

The `h2` and `p` selectors are relative to the scope. They match headings and paragraphs in a `.notice`, not every heading and paragraph in the document. If several elements match `.notice`, each one creates a scope.

The root element is part of its own scope. Selectors inside the block normally target descendants, so use `:scope` to select the root itself:

~~~css
@scope (.notice) {
  :scope {
    padding: 1rem;
    border: 1px solid #cbd5e1;
  }

  > h2 {
    margin-top: 0;
  }
}
~~~

Here `:scope` matches the `.notice` root. The leading child combinator in `> h2` selects a direct child heading. It is equivalent to `:scope > h2` in this context.

## Set a scope limit

An optional `to (...)` clause sets a lower boundary. The element matching that limit and its descendants are outside the scope:

~~~css
@scope (.article) to (.embedded-widget) {
  p {
    color: #334155;
  }
}
~~~

Paragraphs in the article receive the scoped color up to the embedded widget. The widget and its contents are excluded, so another component can control its own presentation.

A scope limit is useful when a component can contain another component. It keeps an outer component's rules from reaching into the nested component's subtree. The scope limit itself is excluded too, so style its root in its own scope or with a deliberate separate rule.

## Scope selectors are not added to specificity

The root selector in the `@scope` prelude establishes where the rules can match. It does not get appended to each selector and does not add its specificity to those selectors.

~~~css
@scope (#profile) {
  p {
    color: #334155;
  }
}
~~~

The scoped `p` selector has the specificity of `p`. The ID in the scope prelude does not turn it into an ID-level selector. This lets the scope provide a boundary without making every rule unusually hard to override.

The limit selector also defines a boundary. It is not appended to the inner selectors or added to their specificity.

## Scope proximity in the cascade

When competing declarations have the same earlier cascade factors, including origin, importance, layer, and specificity, a rule with a closer scope root wins over a rule with a more distant scope root. This comparison is called scope proximity.

~~~css
@scope (.article) {
  p {
    color: #334155;
  }
}

@scope (.article .callout) {
  p {
    color: #7c2d12;
  }
}
~~~

A paragraph inside `.callout` is within both scopes. Both rules use the same `p` selector, so the more proximate `.callout` scope wins for that paragraph. Scope proximity is considered before source order when the compared scoped declarations tie on the earlier cascade factors.

Scope proximity does not override every cascade decision. A declaration in a higher-priority origin, importance, layer, or specificity can still win according to the cascade.

## Scope lists and multiple components

A scope root can be a selector list:

~~~css
@scope (.notice, .callout) {
  > h2 {
    font-size: 1.25rem;
  }
}
~~~

The rules apply independently to descendants of each matching root. Keep a root list focused on components that should share the same rules and boundaries.

You can also write an `@scope` without a root selector. In that form, its root is determined by where the stylesheet is attached. This is useful for local styles in certain embedded stylesheet contexts, but explicit roots are usually easier to read in a shared stylesheet.

## Component styling patterns

Component styles are easier to maintain when the markup and CSS have clear boundaries:

- Give the component root an intentional class, such as `.product-card`.
- Keep selectors short and focused on the component's parts.
- Use an optional scope limit when the component can contain another independently styled component.
- Keep document-wide rules, such as base typography or a reset, outside the component scope.
- Avoid relying on accidental markup depth or overly broad element selectors.

For example:

~~~css
@scope (.product-card) {
  :scope {
    padding: 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.75rem;
  }

  > h2 {
    margin-block: 0 0.5rem;
  }

  .price {
    font-weight: 700;
  }
}
~~~

This keeps card rules near their component boundary. A `.price` inside the card is selected, but an unrelated `.price` elsewhere on the page is not.

## CSS scopes, Shadow DOM, and CSS Modules

These tools solve related but different problems:

- **CSS `@scope`:** Limits where scoped selectors can match within the document. The DOM remains part of the same tree, and inherited values still flow normally.
- **Shadow DOM:** Creates a shadow tree with its own style encapsulation model and explicit mechanisms for styling across the boundary.
- **CSS Modules:** A build-time convention that transforms local class names into generated names. It is not a browser CSS at-rule and depends on tooling.

Choose the boundary that matches the component architecture. Do not treat `@scope` as a security boundary or as a replacement for Shadow DOM when actual DOM encapsulation is needed.

## Browser support and graceful fallback

`@scope` is a newer CSS feature. Check that the browsers and tools targeted by a project support it. Browsers that do not understand the at-rule will not apply its scoped rules, so keep essential content and readable baseline styles available outside it when required.

A conventionally prefixed selector can serve as a fallback for a simple component:

~~~css
.product-card > h2 {
  margin-block: 0 0.5rem;
}

@scope (.product-card) {
  > h2 {
    margin-block: 0 0.5rem;
  }
}
~~~

This fallback has a tradeoff: the ordinary selector can also match inside nested product-card markup. If nesting is possible, define the fallback boundary carefully or accept reduced component isolation in unsupported browsers.

## Common mistakes

- **Assuming scope means full isolation:** Rules outside the scope still exist, and inherited properties still apply.
- **Forgetting that the root is included:** The root is in scope, but ordinary descendant selectors do not select the root itself. Use `:scope` for it.
- **Treating the limit as part of the scope:** The limit and its descendants are excluded from the scoped region.
- **Expecting the root selector to add specificity:** The `@scope` prelude does not add its specificity to scoped selectors.
- **Thinking a closer scope always wins:** Scope proximity is compared only after the earlier cascade factors, including specificity, are tied.
- **Using a broad element selector without considering nested components:** Add a scope limit or use component-specific selectors where appropriate.
- **Putting essential styles only inside an unsupported feature:** Provide any needed baseline outside the scope.
- **Confusing a scope with Shadow DOM:** `@scope` constrains selector matching but does not create a separate DOM tree.

## Try it yourself

1. Put a heading and paragraph inside a `.notice` and style them with `@scope (.notice)`.
2. Use `:scope` to add padding and a border to the root itself.
3. Add a nested `.embedded-widget` and set it as a scope limit for the outer article.
4. Give the widget its own scope and style its heading and paragraph there.
5. Add nested `.callout` content and compare two equally specific paragraph rules in outer and inner scopes.
6. Move one rule outside `@scope` and explain which boundaries no longer constrain its selector.
7. Add an ordinary selector fallback and inspect how it can reach a nested component.
8. Compare the behavior of `@scope` with the guarantees your project expects from Shadow DOM or CSS Modules.

## Key points

- `@scope` defines a root and optionally a lower limit for selector matching.
- The scope root is part of the scope; the limit element and its descendants are excluded.
- Use `:scope` to target the scope root itself.
- The `@scope` prelude does not increase the specificity of selectors inside it.
- Scope proximity can favor the nearer root when competing declarations tie on earlier cascade factors.
- Scoping limits help prevent an outer component's rules from reaching a nested component.
- CSS scopes constrain selector matching, but do not provide Shadow DOM-style encapsulation or stop inheritance.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [51 - Feature queries and progressive enhancement](51-feature-queries-and-progressive-enhancement.md) | [Q&A](../qnas/52-scoping-and-component-styles.md) | [Example](../examples/52-scoping-and-component-styles.md) | [53 - Accessible CSS and user preferences](53-accessible-css-and-user-preferences.md) |
