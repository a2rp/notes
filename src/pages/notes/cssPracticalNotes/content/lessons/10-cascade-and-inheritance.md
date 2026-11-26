# 10 - The Cascade and Inheritance

A browser can find several CSS declarations for the same property on the same element. The cascade is the system CSS uses to choose which declaration supplies the value. Inheritance is how some property values pass from a parent element to its children when the child does not specify its own value.

These ideas explain why a style wins, why some values appear on nested content, and why a rule later in a file does not always take effect.

## The cascade chooses between declarations

Consider two rules that set the same property on the same paragraph:

```css
p {
  color: navy;
}

p {
  color: seagreen;
}
```

Both rules match. Their origin, importance, layers, and specificity are equal, so the later declaration wins and the paragraph is green.

The cascade only compares declarations that apply to the element and property. A rule cannot win if its selector does not match or if its conditional rule, such as a media query, is inactive.

## Where CSS declarations come from

CSS declarations can come from different origins:

- **User-agent styles** are browser defaults, such as the default display style for headings.
- **User styles** are styles a person or their browser supplies for their own needs.
- **Author styles** are stylesheets and style attributes written for the page.

For ordinary declarations, author styles generally take precedence over user styles, which generally take precedence over browser defaults. Importance changes the precedence order. Active transitions and animations also have defined positions in the cascade.

A simplified precedence order from higher to lower, before comparing declarations inside layers, is:

| Priority | Declaration type |
| --- | --- |
| 1 | Active transition values |
| 2 | User-agent `!important` declarations |
| 3 | User `!important` declarations |
| 4 | Author `!important` declarations |
| 5 | CSS animation values |
| 6 | Normal author declarations |
| 7 | Normal user declarations |
| 8 | Normal user-agent declarations |

This ordering shows why `!important` does not mean “wins over everything.” A user-important declaration can override an author-important declaration, and a transition can temporarily override other values. For everyday page styles, avoid adding `!important` unless there is a specific reason.

## Importance and `!important`

Add `!important` after a declaration value to mark that declaration important:

```css
.notice {
  color: navy !important;
}
```

Importance is compared before selector specificity. In the same origin and layer, an important declaration outranks a normal declaration even if the normal declaration has a more specific selector.

```css
#message {
  color: crimson;
}

.notice {
  color: navy !important;
}
```

If the same element has both `id="message"` and `class="notice"`, the important navy declaration wins over the normal crimson declaration. Specificity does not override a higher cascade priority.

Too many important declarations make styles harder to override and maintain. First check whether the intended selector matches and whether a more suitable rule or layer structure solves the problem.

## Cascade layers, specificity, and source order

Once the browser has considered relevance, origin, and importance, it compares declarations within the same origin and importance using cascade layers, specificity, and then source order. Scoped rules add a scope-proximity comparison when that feature is used.

The next chapters cover specificity and cascade layers in detail. For the examples in this chapter, use these practical rules:

1. A matching important declaration can outrank a normal declaration.
2. For declarations in the same origin, importance, and layer, the more specific selector wins.
3. If those priorities tie, the later declaration in source order wins.

For example, the later type selector does not defeat the earlier ID selector:

```css
#message {
  color: crimson;
}

p {
  color: seagreen;
}
```

If the paragraph has `id="message"`, the ID selector is more specific, so it wins even though the `p` rule appears later. Specificity is discussed fully in the next chapter.

When two equally specific rules set the same property and have the same importance and layer, the later rule wins:

```css
p {
  color: navy;
}

p {
  color: seagreen;
}
```

The later `color` declaration wins. Other properties from both rules still apply if they do not conflict.

## A declaration applies per property

The cascade resolves each property separately. One rule can win for `color`, while another wins for `font-weight`:

```css
.notice {
  color: navy;
  font-weight: bold;
}

#message {
  color: crimson;
}
```

For an element matching both selectors, the ID rule wins the color conflict. The class rule still supplies `font-weight` because the ID rule does not set that property.

CSS does not select one entire rule and discard every other rule. It resolves the winning value for each property individually.

## Inheritance passes selected values from parent to child

Some CSS properties inherit by default. Common examples include `color`, `font-family`, and `line-height`:

```css
article {
  color: #334155;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
```

Text inside the article's child elements uses those inherited values unless a child has a value of its own. This makes it possible to set shared text styles on a parent.

Many layout and box properties do not inherit by default. Examples include `margin`, `padding`, `border`, and `width`:

```css
article {
  border: 1px solid gray;
  padding: 1rem;
}
```

The article's children do not each receive that border or padding. The border and padding belong to the article itself.

Whether a property inherits is defined for that property. Do not assume that every style on a parent automatically appears on a child.

## A child declaration takes precedence over an inherited value

An inherited value is used only when the child does not get a cascaded value of its own for that property:

```css
article {
  color: navy;
}

strong {
  color: crimson;
}
```

A `<strong>` inside the article is crimson because its own matching declaration supplies a value. The parent's navy color does not compete with the child's declaration. If the `strong` rule is removed, the strong element inherits navy.

## CSS-wide keywords

CSS provides keywords that explicitly control how a property value is chosen:

| Keyword | Meaning |
| --- | --- |
| `inherit` | Use the parent's computed value for this property. |
| `initial` | Use the property's initial value defined by CSS. |
| `unset` | Behave like `inherit` for an inherited property and like `initial` for a non-inherited property. |
| `revert` | Roll the value back to the previous cascade origin, as if the current origin had not supplied it. |
| `revert-layer` | Roll the value back to an earlier cascade layer. Layer behavior is covered in Chapter 12. |

Examples:

```css
.card-title {
  color: inherit;
}

.reset-width {
  width: initial;
}

.child-text {
  color: unset;
}
```

`initial` means the property's CSS-defined initial value. It does not necessarily mean the browser's usual style for a particular HTML element. For example, a browser may normally display a `<div>` as a block, while the initial value of the `display` property is `inline`.

Use these keywords when their intent is clear. A broad reset with `all` or many `initial` declarations can remove useful browser behavior or inherited styling.

## Initial, inherited, and used values

When a property has no winning declaration, CSS determines its default according to that property's rules. An inherited property normally takes its value from the parent. A non-inherited property normally uses its initial value or a value supplied by another applicable rule.

This means the browser does not blindly copy every parent's style. It uses the property's inheritance behavior and the cascade result for each element.

## A practical way to debug a conflict

When a style is unexpected, inspect one property at a time:

1. Confirm the selector matches the element.
2. Check whether a conditional rule is active.
3. Compare origins and whether declarations are important.
4. Check cascade layers if the stylesheet uses them.
5. Compare selector specificity.
6. If priorities tie, check which declaration comes later in source order.
7. If no declaration supplies a value on the element, check whether the property inherits from its parent.

This order prevents a common mistake: assuming that a later rule always wins or that a parent value competes with a direct child declaration.

## Common mistakes

### Assuming the last rule always wins

Source order breaks ties after earlier cascade priorities. A later low-specificity selector does not necessarily beat an earlier high-specificity selector.

### Treating inheritance as the cascade

Inheritance supplies a value from a parent when the child has no cascaded value of its own. It is not another competing selector for the child.

### Assuming all properties inherit

Text properties such as `color` commonly inherit. Box and layout properties such as `margin`, `padding`, `border`, and `width` generally do not.

### Assuming `!important` always wins

Importance is only one part of the cascade. Origin and layer ordering can cause another important declaration to take precedence. Active transitions can also take precedence over important declarations.

### Confusing `initial` with a browser's usual element style

`initial` uses a property's defined initial value, which may differ from the browser's normal presentation of a particular HTML element.

### Adding `!important` to fix a selector that does not match

An important declaration cannot style an element when the selector does not match. Verify the markup and selector before changing priority.

## Try it yourself

1. Add two matching type-selector rules that set `color`. Change their order and observe which value is used.
2. Add an ID rule before a later type rule. Give an element both matches and observe why the later type rule may still lose.
3. Set `color` and `font-family` on a parent and inspect nested text. Then override `color` on a child.
4. Set `padding` on a parent and observe that its children do not each receive that padding.
5. Compare `width: initial` with the browser's normal width behavior for an element.
6. Add `!important` to a declaration and compare it with a normal declaration of higher specificity in the same author stylesheet.
7. Remove the selector that supplies a child value and observe which properties it inherits.

## Key points

- The cascade chooses a winning value separately for each property.
- The browser first considers whether declarations apply, then compares their cascade priority.
- Importance and origin can matter before layers, specificity, and source order.
- For rules with the same earlier priorities, specificity is compared before source order.
- Inheritance supplies certain property values from a parent when the child has no value of its own.
- A direct child declaration wins over an inherited parent value for that child.
- `inherit`, `initial`, `unset`, `revert`, and `revert-layer` control how values are resolved.
- Use `!important` sparingly and inspect the actual cascade when a declaration does not win.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [09 - Pseudo-elements](09-pseudo-elements.md) | [Q&A](../qnas/10-cascade-and-inheritance.md) | [Example](../examples/10-cascade-and-inheritance.md) | [11 - Specificity and resolving conflicts](11-specificity-and-conflicts.md) |
