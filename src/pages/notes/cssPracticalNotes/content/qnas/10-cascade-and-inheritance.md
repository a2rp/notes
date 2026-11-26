# 10 - The Cascade and Inheritance: Questions and Answers

Use these questions to review how CSS resolves competing declarations and passes selected values from parent elements to children. Each answer follows its question, with explanations where useful.

## Multiple-choice questions

### 1. What does the cascade determine?

A. Which HTML element is created / B. Which declaration supplies a property's value when declarations compete / C. Which file is opened / D. Which selector is written first

**Answer: B.** The cascade compares applicable declarations and selects a winning value for each property on an element.

### 2. Two matching declarations have the same origin, importance, layer, and specificity. Which normally wins?

A. The first declaration / B. The later declaration in source order / C. The declaration with more properties / D. Neither declaration

**Answer: B.** Source order breaks a tie when the earlier cascade priorities are equal.

### 3. Which selector priority is generally greater within the same origin, importance, and layer?

A. A type selector such as `p` / B. An ID selector such as `#message` / C. The selector written earlier / D. The selector with fewer declarations

**Answer: B.** An ID selector has greater specificity than a type selector. Specificity is covered fully in the next chapter.

### 4. Which property commonly inherits from a parent?

A. `color` / B. `margin` / C. `border` / D. `padding`

**Answer: A.** Text properties such as `color` commonly inherit. Box properties such as margin, border, and padding generally do not.

### 5. What happens when a child has its own declaration for an inherited property?

A. The parent's inherited value always wins / B. The child's cascaded value is used / C. Both values are combined / D. The property becomes invalid

**Answer: B.** An inherited value is used only when the child does not have a cascaded value of its own for that property.

### 6. What does `color: inherit` do?

A. Uses the property's initial value / B. Uses the parent's computed color / C. Removes the declaration / D. Uses the browser default regardless of the parent

**Answer: B.** The `inherit` keyword explicitly takes the value from the parent element.

### 7. What does `width: initial` request?

A. The parent's width / B. The width from the last rule / C. The CSS-defined initial value of `width` / D. The browser's usual width for the HTML element

**Answer: C.** `initial` uses the property's defined initial value. It may not match a browser's usual presentation for a particular element.

### 8. How does `unset` behave?

A. It always inherits / B. It always uses the initial value / C. It inherits for inherited properties and uses the initial value for non-inherited properties / D. It deletes the element

**Answer: C.** `unset` behaves like `inherit` or `initial` depending on whether the property is inherited by default.

### 9. Which statement about `!important` is correct?

A. It makes a selector more specific / B. It affects cascade priority before specificity / C. It always beats every CSS declaration / D. It makes a declaration inherit

**Answer: B.** Importance is compared before specificity. Its full priority still depends on origin and layers.

### 10. Which author declaration wins if both are in the same origin and layer?

A. A normal declaration with a more specific selector always wins / B. An important declaration wins over a normal declaration / C. The first declaration always wins / D. The declaration with more properties wins

**Answer: B.** Within the same origin and layer, an important declaration outranks a normal declaration even if the normal selector is more specific.

### 11. What can happen when the browser has no cascaded value for an inherited property on an element?

A. The element always becomes hidden / B. The property can inherit from its parent / C. The declaration is copied from a sibling / D. The property is removed from CSS

**Answer: B.** Inherited properties normally use the parent's value when the child has no value of its own.

### 12. Which is the normal origin priority from higher to lower?

A. User-agent, user, author / B. Author, user, user-agent / C. User, author, user-agent / D. Author, user-agent, user

**Answer: B.** For normal declarations, author styles generally outrank user styles, which generally outrank browser defaults.

### 13. Within the important origins, which is the highest of these three?

A. Author-important / B. User-important / C. User-agent-important / D. They are always equal

**Answer: C.** The important origin order is reversed compared with the normal author, user, and user-agent order.

### 14. What does the `revert` keyword do in an author declaration?

A. Reverts only to the previous source line / B. Rolls the value back as if the current origin had not supplied it / C. Uses the parent's value in every case / D. Reverses the selector

**Answer: B.** `revert` rolls back the value to the result from a previous cascade origin.

### 15. What does `revert-layer` do?

A. Rolls the value back to an earlier cascade layer / B. Removes the stylesheet / C. Resets all properties to inherited values / D. Reverses source order

**Answer: A.** `revert-layer` rolls back the value within the cascade layer system, which is covered in a later chapter.

### 16. Which has higher priority than CSS animations in the cascade?

A. Normal user-agent declarations / B. Normal user declarations / C. Normal author declarations / D. Important declarations

**Answer: D.** Important declarations outrank animation values. Active transitions have a higher priority than important declarations.

## True or false

### 17. The cascade chooses one whole CSS rule and discards every other matching rule.

**Answer: False.** It resolves values per property. Declarations from several rules can contribute different properties to one element.

### 18. A declaration later in the stylesheet always wins.

**Answer: False.** Source order breaks ties only after earlier cascade priorities, such as importance, layers, and specificity, are considered.

### 19. If a child has a direct normal `color` declaration, it uses that value instead of inheriting the parent's color.

**Answer: True.** A cascaded value on the child is used. The parent's value does not compete with it as another selector for the child.

### 20. A border on a parent automatically gives every child the same border.

**Answer: False.** `border` is not inherited by default. The border belongs to the parent unless a child gets its own border declaration.

### 21. `initial` always reproduces the browser's usual presentation of an HTML element.

**Answer: False.** It uses the property's CSS-defined initial value. That value can differ from the browser's normal element styling.

### 22. An important declaration can fix a selector that does not match the element.

**Answer: False.** Importance only affects declarations that apply. A non-matching selector has no declaration to compete in the cascade.

### 23. Inheritance copies every property from the parent to each child.

**Answer: False.** Only properties defined to inherit do so by default. Many layout and box properties are not inherited.

### 24. If a parent gets its `color` from an important declaration, a child with its own normal `color` declaration must still use the parent's color.

**Answer: False.** The importance resolves the parent's value for the parent. The child's direct cascaded value is considered separately and overrides the inherited value.

## Short-answer questions

### 25. What does the user-agent origin provide?

**Answer:** It provides browser defaults, such as default styles for headings, lists, and controls.

### 26. Why is inheritance useful?

**Answer:** It lets shared values, such as text color or font family, be set on a parent instead of repeated on every child.

### 27. Name two commonly inherited properties and two properties that generally do not inherit.

**Answer:** `color` and `font-family` commonly inherit. `margin` and `border` generally do not.

### 28. Why does a later `p` rule not necessarily override an earlier `#message` rule?

**Answer:** The ID selector has greater specificity than the type selector. Source order only breaks a tie after earlier priorities are equal.

### 29. What is the difference between `initial` and `inherit`?

**Answer:** `initial` uses the property's CSS-defined initial value. `inherit` uses the parent's computed value.

### 30. What is the difference between `unset` and `initial` for an inherited property?

**Answer:** For an inherited property, `unset` behaves like `inherit`, while `initial` uses that property's initial value.

### 31. Why should `!important` be used sparingly?

**Answer:** It changes cascade priority and can make later overrides difficult. Many important declarations obscure why a value wins instead of fixing the selector or stylesheet structure.

### 32. When does source order decide the winning value?

**Answer:** When declarations tie on the earlier cascade priorities, including origin, importance, layer, and specificity, and any applicable scoped-rule comparison.

## Read the CSS

### 33. What color does the paragraph use?

```css
p {
  color: navy;
}

p {
  color: seagreen;
}
```

**Answer: Seagreen.** Both selectors have equal specificity and priority, so the later declaration wins.

### 34. What color does this paragraph use?

```html
<p id="message">Hello.</p>
```

```css
#message {
  color: crimson;
}

p {
  color: seagreen;
}
```

**Answer: Crimson.** The ID selector has greater specificity than the type selector, so it wins despite appearing earlier.

### 35. What color does the `<strong>` element use?

```html
<article>
  <p>A <strong>useful</strong> note.</p>
</article>
```

```css
article {
  color: navy;
}

strong {
  color: crimson;
}
```

**Answer: Crimson.** The `strong` element has its own declaration. It does not use the inherited navy value from `article`.

### 36. What color does `<em>` use if there is no rule matching it?

```html
<article>
  <p>A <em>useful</em> note.</p>
</article>
```

```css
article {
  color: navy;
}
```

**Answer: Navy.** `color` is inherited, and the `em` element has no cascaded color value of its own.

### 37. Which properties in this example are inherited by the paragraph?

```css
article {
  color: navy;
  font-family: Arial, sans-serif;
  padding: 1rem;
  border: 1px solid gray;
}
```

**Answer:** The paragraph inherits `color` and `font-family`. It does not inherit the article's `padding` or `border`.

### 38. Which color wins when both rules match the same paragraph in the same origin and layer?

```css
#message {
  color: crimson;
}

p {
  color: seagreen !important;
}
```

**Answer: Seagreen.** The important declaration outranks a normal declaration before specificity is compared.

### 39. What value does `display: initial` use?

**Answer:** It uses the CSS-defined initial value of `display`, which is `inline`. This may differ from the browser's normal style for an element such as `<div>`.

## Practice questions

### 40. Write a rule that explicitly makes a child use its parent's text color.

**Answer:**

```css
.child {
  color: inherit;
}
```

### 41. Write a declaration that uses the initial value of `margin`.

**Answer:**

```css
.example {
  margin: initial;
}
```

### 42. A rule does not style an element. What should you check before adding `!important`?

**Answer:** Confirm that the selector matches the element, the stylesheet is loaded, any media or conditional rule is active, and another declaration does not win earlier in the cascade.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [09 - Pseudo-elements](../qnas/09-pseudo-elements.md) | [Lesson](../lessons/10-cascade-and-inheritance.md) | [Example](../examples/10-cascade-and-inheritance.md) | [11 - Specificity and resolving conflicts](11-specificity-and-conflicts.md) |
