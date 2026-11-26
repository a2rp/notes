# 11 - Specificity and Resolving Conflicts

When multiple CSS rules set the same property on the same element, the cascade decides which value is used. Specificity is one part of that decision. It compares selectors only after earlier cascade priorities, such as origin, importance, and cascade layer, have been considered.

This chapter explains how to calculate specificity, compare it correctly, understand special pseudo-class rules, and fix conflicts without starting a specificity battle.

## Where specificity fits in the cascade

Before comparing specificity, check that the declarations are actually competing:

1. The selector matches the element.
2. The declaration applies in the current conditions, such as an active media query.
3. Earlier cascade priorities, including origin, importance, and layer, have been compared.
4. If those priorities tie, compare selector specificity.
5. If specificity also ties, the later declaration in source order wins.

Specificity cannot make a non-matching selector apply. It also does not override higher cascade priorities. A normal declaration does not beat an important declaration simply because its selector contains more IDs.

The cascade resolves each property separately. One rule can win for color while another rule wins for font weight.

## The specificity tuple

Specificity is written as three values: **A-B-C**.

| Component | Counts |
| --- | --- |
| A | ID selectors, such as #header |
| B | Class selectors, attribute selectors, and pseudo-classes, such as .notice, [open], and :hover |
| C | Type selectors and pseudo-elements, such as button and ::before |

Compare the values from left to right. First compare A. If A ties, compare B. If B also ties, compare C.

~~~css
p { }                         /* 0-0-1 */
.note { }                     /* 0-1-0 */
#notice { }                   /* 1-0-0 */
main#app .notice > p { }      /* 1-1-2 */
~~~

The last selector has one ID, one class, and two type selectors. The > combinator does not add specificity.

The tuple is not a number written in base 10. Do not add the components together. An ID selector beats any number of class or type selectors in the next components:

~~~css
#page { }                     /* 1-0-0 */
.card.featured.active { }     /* 0-3-0 */
~~~

When earlier cascade priorities are equal, #page has higher specificity because its A component is greater.

## What contributes to specificity

### ID selectors

Each ID selector adds one to A:

~~~css
#account { }                  /* 1-0-0 */
#account .menu { }            /* 1-1-0 */
~~~

IDs identify elements, but relying on them for ordinary styling can make later overrides difficult. Reusable classes are usually easier to compose and override.

### Classes, attributes, and pseudo-classes

Each class selector, attribute selector, or pseudo-class adds one to B:

~~~css
.card { }                     /* 0-1-0 */
[aria-expanded="true"] { }    /* 0-1-0 */
button:hover { }              /* 0-1-1 */
input:focus-visible { }       /* 0-1-1 */
~~~

A pseudo-class such as :hover, :focus-visible, or :checked counts like a class selector. The element's state does not change the specificity score.

### Type selectors and pseudo-elements

Each type selector and pseudo-element adds one to C:

~~~css
article p { }                 /* 0-0-2 */
.notice::before { }           /* 0-1-1 */
~~~

The double-colon form identifies a pseudo-element, which counts in C. Prefer ::before, ::after, and similar double-colon spellings in new CSS.

### Selectors that add no specificity

The universal selector and combinators do not add specificity:

~~~css
* { }                         /* 0-0-0 */
.card > p { }                 /* 0-1-1 */
main .card + p { }            /* 0-1-2 */
~~~

The selector still needs to match. These parts simply add no points to the tuple.

## Functional pseudo-classes

Some functional pseudo-classes have special specificity rules. Do not count each one as an ordinary pseudo-class without checking its rule.

### :is(), :not(), and :has()

These pseudo-classes take their specificity from the most specific selector in their argument list. The pseudo-class itself does not add another B component.

~~~css
:is(.card, #featured) p { }
~~~

This has specificity **1-0-1**. The most specific argument is #featured, and p contributes one type selector.

~~~css
button:not(.disabled) { }
~~~

This has specificity **0-1-1**. The argument .disabled contributes one class, and button contributes one type selector.

A high-specificity selector inside :is(), :not(), or :has() can make the complete selector harder to override than it first appears.

### :where()

:where() and everything inside its argument contribute zero specificity:

~~~css
:where(#app, .page) .button { }
~~~

This has specificity **0-1-0**. The :where() portion adds nothing, while .button adds one class. It is useful for contextual defaults that should remain easy to override.

### :nth-child() and its of selector list

A pseudo-class such as :nth-child() contributes one B component. If it includes an of selector list, the most specific selector in that list is added as well:

~~~css
.item:nth-child(odd of .item, #featured) { }
~~~

This has specificity **1-2-0**: one class for .item, one pseudo-class for :nth-child(), and one ID from the most specific selector in the of list.

## Compound selectors

A compound selector has no combinator between its parts. Every selector in the compound contributes to the total:

~~~css
button.primary[aria-pressed="true"] { }
~~~

This has specificity **0-2-1**: .primary and the attribute selector count in B, while button counts in C.

A longer selector can accumulate a high score:

~~~css
main#settings .panel button.primary:focus-visible { }
~~~

This has specificity **1-3-2**: one ID, three class-like selectors, and two type selectors.

When a rule contains multiple selectors separated by commas, inspect the selector that matches the element and calculate its specificity. Keep selectors simple enough that you can reason about the winning declaration without mental arithmetic.

## Inline styles and !important

An inline style is written on an element:

~~~html
<p style="color: purple">A paragraph</p>
~~~

An inline style is not an ID selector and is not added to the A-B-C tuple. It participates in the cascade with special priority compared with normal author stylesheet rules. An author !important declaration can outrank a normal inline declaration because importance is considered before selector specificity.

The !important flag does not add specificity:

~~~css
#message {
  color: navy;
}

.notice {
  color: tomato !important;
}
~~~

If both declarations are author rules in the same layer, the important declaration wins even though its selector has lower specificity. Do not use !important as a shortcut for a selector that does not match or for a stylesheet that is not loaded.

## Worked comparison

Given this markup:

~~~html
<p id="summary" class="notice">Status message</p>
~~~

And these rules:

~~~css
p {
  color: teal;
}

.notice {
  color: darkorange;
}

#summary {
  color: navy;
}
~~~

All three selectors match the paragraph and set color. Their specificities are:

| Selector | Specificity |
| --- | --- |
| p | 0-0-1 |
| .notice | 0-1-0 |
| #summary | 1-0-0 |

Assuming the declarations have equal cascade priorities, #summary wins and the text is navy. Moving p to the end would not change the result. Source order is checked only after specificity ties.

If the ID rule is removed, .notice wins over p. If the class rule is also removed, the type selector supplies the color.

## A practical way to debug a conflict

When a style is not appearing as expected:

1. Inspect the element and confirm that the selector matches it.
2. Confirm that the stylesheet loaded and any media query or other condition is active.
3. In developer tools, inspect matched rules and see which declarations are crossed out.
4. Check origin, importance, and layer before comparing specificity.
5. Calculate specificity as A-B-C for the competing selectors.
6. If the scores and earlier priorities tie, check source order.
7. Check whether a shorthand declaration sets the property you are inspecting.

This process identifies the actual reason a declaration lost and avoids adding unnecessary IDs or !important.

## Common mistakes

### Adding the specificity components

The tuple is compared from left to right. One ID is not equivalent to one class plus one type selector.

### Assuming the last rule always wins

Source order breaks a tie only after earlier cascade priorities and specificity are equal.

### Counting combinators or *

Combinators and the universal selector do not add specificity. Type, class, attribute, ID, pseudo-class, and pseudo-element selectors do.

### Counting every pseudo-class the same way

:is(), :not(), and :has() use the most specific argument. :where() always contributes zero. :nth-child() with an of list has an additional rule.

### Using an ID or !important for every override

These choices can make a stylesheet harder to maintain. Prefer clear, reusable classes and remove or adjust the conflicting rule when practical.

### Treating a non-matching selector as a low-priority selector

Specificity matters only when a selector matches. Check the markup, spelling, relationship, and state before comparing scores.

## Try it yourself

1. Calculate the specificity of nav#main .item[aria-current="page"] a:hover.
2. Compare #profile with .account .profile.active. Which wins when all earlier cascade priorities tie?
3. Change :is(.card, #featured) p to :where(.card, #featured) p. How does its specificity change?
4. Add a normal ID rule and a lower-specificity !important rule in the same layer. Which declaration supplies the property?
5. In developer tools, find a crossed-out declaration and identify whether it lost because of cascade priority, specificity, or source order.
6. Remove an ID selector from a styling rule and replace it with a class. Try overriding the class from a later stylesheet.

## Key points

- Specificity is compared only after earlier cascade priorities.
- Use the A-B-C tuple: IDs, class-like selectors, then types and pseudo-elements.
- Compare tuple components from left to right; do not add them as ordinary numbers.
- Combinators and the universal selector add no specificity.
- :is(), :not(), and :has() use the most specific argument; :where() contributes zero.
- Source order breaks ties only when earlier cascade priorities and specificity are equal.
- Inspect the cascade in developer tools and prefer simple selectors over escalating overrides.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [10 - The cascade and inheritance](10-cascade-and-inheritance.md) | [Q&A](../qnas/11-specificity-and-conflicts.md) | [Example](../examples/11-specificity-and-conflicts.md) | [12 - Cascade layers](12-cascade-layers.md) |