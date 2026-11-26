# 52 - Scoped styles and component styling - Q&A

Review CSS `@scope`, component boundaries, scope proximity, and the difference between selector scoping and DOM encapsulation. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. What does the selector in an `@scope` prelude identify?

- A. A scoping root where the rules begin to apply
- B. A stylesheet to download
- C. A cascade layer name
- D. A JavaScript event target

**Answer: A. A scoping root where the rules begin to apply.**

**Explanation:** The root selector identifies elements that start a scope. Scoped selectors are constrained to the resulting subtree unless a limit narrows it.

### 2. In `@scope (.article) to (.widget)`, which part is outside the article scope?

- A. Only the widget's opening tag
- B. The widget element and its descendants
- C. Only elements before the widget
- D. The whole article

**Answer: B. The widget element and its descendants.**

**Explanation:** The scope limit and its subtree are excluded from the scope created by `.article`.

### 3. Inside `@scope (.card)`, what does an ordinary `h2` selector normally target?

- A. The `.card` root only
- B. Descendant `h2` elements in the scope
- C. Every `h2` in the document
- D. Only direct-child `h2` elements

**Answer: B. Descendant `h2` elements in the scope.**

**Explanation:** Scoped style selectors are relative to the root and normally select descendants. Use a leading child combinator when only direct children should match.

### 4. Which selector targets the scope root itself?

- A. `:scope`
- B. `:root`
- C. `:host`
- D. `:target`

**Answer: A. `:scope`.**

**Explanation:** Within the scoped rule list, `:scope` represents the scoping root. `:root` has a different meaning and matches the document root element in a document tree.

### 5. Does the root selector in the `@scope` prelude add its specificity to selectors inside the block?

- A. Yes, always
- B. Only when it is an ID
- C. No
- D. Only when the selector contains a class

**Answer: C. No.**

**Explanation:** The prelude establishes a matching boundary. It is not appended to each inner selector and does not raise its specificity.

### 6. When can scope proximity decide between two declarations?

- A. Before origin, importance, and layer
- B. After earlier cascade factors, when the declarations tie on those factors
- C. Whenever one rule is inside `@scope`
- D. Only when the selectors have different specificity

**Answer: B. After earlier cascade factors, when the declarations tie on those factors.**

**Explanation:** Scope proximity is a later cascade comparison. A closer root does not defeat a declaration that already wins on a higher-priority cascade factor.

### 7. If two scoped `p` rules tie on earlier cascade factors, which root is more proximate to a paragraph inside a nested callout?

- A. The outer article root
- B. The nested callout root
- C. The document root in all cases
- D. The first rule in source order

**Answer: B. The nested callout root.**

**Explanation:** The nested root has fewer tree hops to the paragraph, so its scoped declaration wins the scope-proximity comparison.

### 8. What does `@scope` provide?

- A. A security boundary for a subtree
- B. A separate DOM tree
- C. A boundary that constrains scoped selector matching
- D. Automatic unique class names

**Answer: C. A boundary that constrains scoped selector matching.**

**Explanation:** CSS scoping is useful for component styles, but it does not isolate the DOM or prevent inheritance.

### 9. Which technology creates a distinct shadow tree with its own encapsulation model?

- A. `@scope`
- B. Shadow DOM
- C. CSS Modules
- D. A selector list

**Answer: B. Shadow DOM.**

**Explanation:** Shadow DOM creates a shadow tree and defines mechanisms for style encapsulation. `@scope` only constrains selector matching in CSS.

### 10. What are CSS Modules in common build setups?

- A. A browser-defined `@module` at-rule
- B. A tooling convention that transforms local class names
- C. A form of scope limit
- D. A built-in DOM tree boundary

**Answer: B. A tooling convention that transforms local class names.**

**Explanation:** CSS Modules rely on a build tool or framework. They are not a native CSS scoping at-rule.

## Short-answer questions

### 11. What is a scoping root?

**Answer:** It is the element matched by the root selector in an `@scope` rule. It starts the region in which the scoped selectors can match.

**Explanation:** Every matching root creates a scope for its own subtree, subject to any scope limit.

### 12. What is a scope limit?

**Answer:** It is an optional lower boundary declared with `to (...)`. The element matching the limit and its descendants are excluded from that scope.

**Explanation:** Limits help an outer component stop styling an independently styled nested component.

### 13. Why use `:scope` inside a scoped rule list?

**Answer:** Use it when the rule should select the scope root itself.

**Explanation:** An ordinary selector such as `h2` targets descendants. `:scope` explicitly refers to the root.

### 14. What does `> h2` mean inside `@scope (.card)`?

**Answer:** It selects an `h2` that is a direct child of the scope root.

**Explanation:** The leading child combinator makes the relationship direct. It is equivalent to `:scope > h2` in this context.

### 15. Does a CSS scope stop inherited values from passing to descendants?

**Answer:** No. Inheritance still works according to CSS rules.

**Explanation:** `@scope` constrains which elements a scoped selector can match. It does not create a separate style or DOM tree.

### 16. Does an ID selector in the scope prelude make every inner selector highly specific?

**Answer:** No. The prelude selector does not contribute specificity to the inner selectors.

**Explanation:** A scoped `p` rule still has the specificity of `p`. The root selector defines the boundary rather than being concatenated to the rule.

### 17. Does a closer scope root always win over a farther scope root?

**Answer:** No. Scope proximity only decides after the earlier cascade factors tie.

**Explanation:** Origin, importance, cascade layer, and specificity can determine the winner before proximity is considered.

### 18. Why might an ordinary selector fallback leak into a nested component?

**Answer:** The unscoped selector has no `@scope` boundary, so it may also match descendants inside nested component markup.

**Explanation:** A fallback can preserve styling in browsers without `@scope`, but its selector must be designed carefully if components can nest.

## Applied reasoning

### 19. An article scope has a widget as its limit. Will the article's scoped paragraph rule style a paragraph inside that widget?

**Answer:** No.

**Explanation:** The widget is the limit, so it and its descendants are outside the article's resulting scope.

### 20. A nested callout is not a limit. A paragraph inside it matches both an article scope and a callout scope. Both rules use `p` and otherwise tie. Which rule wins?

**Answer:** The callout-scoped rule wins because its scope root is closer to the paragraph.

**Explanation:** Scope proximity favors the nearer root when declarations tie on earlier cascade factors.

### 21. A rule inside `@scope (.card)` uses `.price`. Will an unrelated `.price` elsewhere on the page match it?

**Answer:** No, not from that scoped rule.

**Explanation:** The target element for a scoped style rule must be in the scope, so the unrelated element outside the card is excluded.

### 22. Multiple cards match the root selector `.card`. How do their scopes behave?

**Answer:** Each matching card creates its own scope, and the rule list applies independently to each scope.

**Explanation:** A root selector can match multiple elements. Each match establishes its own boundary.

### 23. A project needs only to keep a button selector from matching buttons in unrelated page sections. Is Shadow DOM necessarily required?

**Answer:** No. A scoped rule may be enough if the project only needs to constrain selector matching.

**Explanation:** Use the smallest boundary that meets the requirement. Shadow DOM is relevant when a separate shadow tree and its encapsulation model are needed.

### 24. A component's scoped rules are unsupported in a targeted browser. What should the author consider?

**Answer:** Keep essential content and readable baseline styles outside the scope, and decide whether a carefully bounded ordinary-selector fallback is needed.

**Explanation:** Unsupported scoped rules may not apply. A fallback can help, but it may have broader matching behavior if components nest.

## Code reading and correction

### 25. What does this rule style?

~~~css
@scope (.notice) {
  p {
    color: #334155;
  }
}
~~~

**Answer:** Paragraph descendants in each `.notice` scope.

**Explanation:** The scoped `p` selector is relative to the root and only matches targets inside the scope.

### 26. Change this rule so it styles the `.notice` root itself.

~~~css
@scope (.notice) {
  .notice {
    padding: 1rem;
  }
}
~~~

**Answer:** Use `:scope`:

~~~css
@scope (.notice) {
  :scope {
    padding: 1rem;
  }
}
~~~

**Explanation:** The inner `.notice` selector is relative to the scope and describes a descendant matching that class. `:scope` directly selects the root.

### 27. Which elements are in scope here?

~~~css
@scope (.article) to (.embedded-widget) {
  a {
    color: #145da0;
  }
}
~~~

**Answer:** Links within the article scope, except links inside an `.embedded-widget` and the widget subtree itself.

**Explanation:** The widget is the lower boundary, and its descendants are excluded from the outer scope.

### 28. Which paragraph color wins for a paragraph inside `.callout`, assuming the rules tie on other cascade factors?

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

**Answer:** `#7c2d12` from the callout scope.

**Explanation:** The `.callout` root is more proximate to the paragraph. The selectors have equal specificity, so scope proximity can decide the result.

### 29. Why is this description inaccurate: “The `#profile` scope makes the inner `p` selector have ID specificity”?

~~~css
@scope (#profile) {
  p {
    color: #334155;
  }
}
~~~

**Answer:** The inner selector retains the specificity of `p`; the scope prelude does not add the ID selector's specificity.

**Explanation:** The `#profile` selector identifies the scope root, but is not concatenated to the scoped style selector.

### 30. What limitation should be documented for this component rule?

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

**Answer:** The ordinary selector fallback can match headings in nested product-card markup, while the scoped rule is constrained by its own root.

**Explanation:** The fallback improves compatibility but has different boundaries. If product cards can nest, refine the fallback selector or accept that difference.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [51 - Feature queries and progressive enhancement](../lessons/51-feature-queries-and-progressive-enhancement.md) | [Q&A](52-scoping-and-component-styles.md) | [Example](../examples/52-scoping-and-component-styles.md) | [53 - Accessible CSS and user preferences](../lessons/53-accessible-css-and-user-preferences.md) |
