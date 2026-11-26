# 49 - CSS nesting

CSS nesting lets related style rules sit inside a parent rule. A nested selector can refer to the parent selector without repeating it, which can make component styles easier to scan and maintain.

Native CSS nesting is part of CSS itself. It does not add preprocessor features such as variables from Sass, mixins, or text-based selector concatenation.

## Learning outcomes

After this chapter, you should be able to:

- Nest a child selector inside a parent style rule.
- Use `&` to refer explicitly to the parent selector.
- Write descendant, state, compound, and ancestor relationships.
- Nest conditional group rules such as `@media` and `@supports`.
- Understand how selector-list specificity affects nested rules.
- Avoid patterns that work in preprocessors but not in native CSS.

## Basic nesting

A rule inside another style rule is a nested rule. If the nested selector does not begin with a combinator or use `&` explicitly, it matches a descendant of the parent selector:

~~~css
.card {
  border: 1px solid #ccd5df;
  padding: 1rem;

  .card__title {
    margin: 0;
  }

  .card__copy {
    color: #46566a;
  }
}
~~~

This is equivalent to the flat selectors `.card .card__title` and `.card .card__copy`. The space represents a descendant relationship: the title or copy is somewhere inside the card.

Nesting keeps related styles together, but the browser still evaluates selectors against the document. Choose nesting where it improves organization; a short flat selector can be clearer than a deeply nested block.

## Refer to the parent with `&`

The nesting selector `&` stands for the selector of the parent rule. It makes relationships explicit and is required when styling a state or another selector condition on the same element:

~~~css
.button {
  background: #145da0;
  color: white;

  &:hover {
    background: #0d477d;
  }

  &:focus-visible {
    outline: 3px solid #f2a900;
    outline-offset: 3px;
  }

  &[aria-expanded="true"] {
    background: #123b5d;
  }
}
~~~

These nested selectors match the button itself when it is hovered, keyboard focused, or has the specified attribute. Without `&`, a nested `:hover` would mean a hovered descendant of the button, not the button itself.

A leading combinator can also describe a relationship to the parent:

~~~css
.list-item {
  + .list-item {
    border-top: 1px solid #ccd5df;
  }

  > .list-item__title {
    font-weight: 700;
  }
}
~~~

Here, `+ .list-item` matches an adjacent sibling after a list item. `> .list-item__title` matches a direct child. These can also be written with an explicit parent selector, as `& + .list-item` and `& > .list-item__title`.

The parent can appear on the right side of a selector too:

~~~css
.theme-dark & {
  color: white;
}
~~~

When nested inside a component selector, this describes the component when it is inside an ancestor with the `theme-dark` class.

## Nested selector lists

A parent or child rule can contain a selector list:

~~~css
.card,
.panel {
  & > h2,
  & > h3 {
    margin-block-start: 0;
  }
}
~~~

Nesting combines the parent and child selector relationships. A parent list can expand into multiple selector combinations. Keep the combinations in mind when reading the result.

The nesting selector's specificity is based on the most specific selector in the parent selector list, similar to `:is()`. This can make a nested rule more specific than expected:

~~~css
#featured,
.card {
  & .card__title {
    color: darkred;
  }
}
~~~

The nested selector has the specificity of the most specific parent, including the ID selector. That means the title inside an ordinary `.card` can receive unexpectedly high specificity. If independent specificity is important, split the parent rules or use a deliberate low-specificity selector such as `:where()`.

## Compound selectors and preprocessor differences

Native CSS nesting combines selectors by matching elements. It does not concatenate selector text like a preprocessor can.

This is invalid native CSS nesting:

~~~css
.card {
  &__title {
    font-size: 1.2rem;
  }
}
~~~

The browser does not turn `&__title` into `.card__title`. The ampersand is a selector, not a string-replacement token. Write a descendant class explicitly:

~~~css
.card {
  .card__title {
    font-size: 1.2rem;
  }
}
~~~

Or use two classes on the same element with a compound selector:

~~~css
.card {
  &.card--featured {
    border-color: #d28b00;
  }
}
~~~

This matches an element that has both `card` and `card--featured` classes. It does not match a child whose class name begins with the parent class.

## Nest conditional group rules

Group at-rules such as `@media` and `@supports` can be nested inside a style rule. The declarations and selectors inside them remain associated with the parent component:

~~~css
.card {
  display: grid;
  gap: 1rem;

  @media (min-width: 48rem) {
    grid-template-columns: 12rem 1fr;
    align-items: center;
  }

  @supports (text-wrap: balance) {
    .card__title {
      text-wrap: balance;
    }
  }
}
~~~

The media query applies the layout change only when its condition matches. The support query applies the title style only when the browser recognizes the declaration.

You can place a nested selector inside the conditional rule and use `&` when needed:

~~~css
.navigation {
  @media (min-width: 48rem) {
    & > ul {
      display: flex;
    }
  }
}
~~~

This is the nested form of a media query containing a selector for the navigation's direct child list.

## Cascade order and readable structure

Nested rules participate in the normal cascade. Specificity, origin, importance, layers, and source order still determine which declaration wins. Nesting does not create a separate cascade.

Modern CSS nesting preserves the source order of declarations and nested rules, even when they are interleaved. For readability and compatibility with older CSS parsers, a useful convention is to put the parent declarations first, then its nested selectors and conditional rules:

~~~css
.notice {
  padding: 1rem;
  color: #17212b;
  background: #eef4fa;

  .notice__title {
    margin-block: 0 0.5rem;
  }

  &:hover {
    background: #e0ebf5;
  }
}
~~~

This structure makes the base component easy to find and keeps state or child rules close to it. Avoid nesting many levels deep, because long selector paths are harder to understand and may couple markup too tightly to one component structure.

## When to flatten a nested rule

Nesting is a way to organize rules, not a requirement. Keep a selector flat when it is shared across components, already short, or easier to understand on its own:

~~~css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
~~~

Do not wrap a global utility class in an unrelated component selector if the utility should work anywhere. Also avoid large nested blocks that mix unrelated components or concerns.

## Browser and tooling considerations

Native nesting syntax is understood by modern browsers, but older browsers and some CSS tools may not accept every nested rule. Check the browsers the project supports and make sure formatters, linters, minifiers, and build tools parse the syntax correctly.

If a project needs to support older CSS parsers, use a build step that transforms nesting to flat CSS or write flat selectors directly. A transformation only handles syntax; it does not make Sass variables or mixins available in native CSS.

## Common mistakes

- Assuming a nested selector without `&` styles the parent state instead of a descendant.
- Treating `&` as text that can be concatenated into a class name.
- Forgetting that nested selectors still participate in the ordinary cascade.
- Using a selector list with an ID and overlooking its effect on nested-rule specificity.
- Nesting unrelated rules just because the syntax allows it.
- Assuming CSS nesting provides variables, mixins, or every preprocessor feature.
- Forgetting to check the syntax support of older browsers and project tools.

## Try it yourself

1. Convert a flat card stylesheet into one nested `.card` rule.
2. Add `&:hover` and `&:focus-visible` states to a button.
3. Nest a direct-child selector for a list inside a navigation component.
4. Place a responsive layout rule inside a nested `@media` block.
5. Put a declaration support check inside a component with nested `@supports`.
6. Try `&__title` and inspect why native CSS does not concatenate the class name.
7. Compare specificity when nesting under a selector list that includes an ID.
8. Move a global utility out of a component rule and verify it can be reused.

## Key points

- A nested selector without a leading combinator or `&` normally selects a descendant.
- `&` explicitly refers to the parent selector and is useful for states and compound selectors.
- Native nesting matches selectors; it does not concatenate selector text like a preprocessor.
- Nested media and supports rules keep conditional styles close to their component.
- Specificity and source order still follow the CSS cascade. Selector lists can raise nested specificity.
- Nest where it improves organization, keep nesting shallow, and check browser and tool support.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [48 - Clipping, masks, and shapes](48-clipping-masking-and-shapes.md) | [Q&A](../qnas/49-css-nesting.md) | [Example](../examples/49-css-nesting.md) | [50 - At-rules, imports, and font-face](50-at-rules-and-imports.md) |
