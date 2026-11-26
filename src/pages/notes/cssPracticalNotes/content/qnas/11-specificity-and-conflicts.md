# 11 - Specificity and Resolving Conflicts: Questions and Answers

Use these questions to practise calculating specificity and finding why a declaration wins or loses. Each answer follows its question. Explanations are included to show the reasoning.

## Multiple-choice questions

### 1. What is the specificity of #sidebar .link:hover?

- **A.** 1-1-0
- **B.** 1-2-0
- **C.** 0-2-1
- **D.** 1-0-2

**Answer: B.** #sidebar adds one ID, while .link and :hover add two class-like selectors.

### 2. What is the specificity of main#app .card > a::before?

- **A.** 1-1-2
- **B.** 1-1-3
- **C.** 1-2-2
- **D.** 0-1-3

**Answer: B.** #app contributes one ID, .card one class, and main, a, and ::before contribute three type or pseudo-element selectors.

### 3. What is the specificity of * > p?

- **A.** 0-0-0
- **B.** 0-0-1
- **C.** 0-1-1
- **D.** 1-0-1

**Answer: B.** The universal selector and child combinator add nothing. The type selector p contributes one to C.

### 4. Which selector has higher specificity?

- **A.** #app
- **B.** .card.featured.active
- **C.** They are equal
- **D.** The later selector always wins

**Answer: A.** #app is 1-0-0, while the three classes are 0-3-0. Specificity compares components from left to right.

### 5. A normal author rule uses an ID selector. A matching author rule in the same layer uses a class selector with !important. Which value wins?

- **A.** The ID rule, because IDs always win
- **B.** The important class rule
- **C.** The later rule in the file, in every case
- **D.** Neither declaration

**Answer: B.** Importance is considered before specificity. A normal declaration does not beat an important declaration because its selector is more specific.

### 6. What is the specificity of :where(#app) .button?

- **A.** 1-1-0
- **B.** 1-0-0
- **C.** 0-1-0
- **D.** 0-2-0

**Answer: C.** :where() and its arguments contribute zero. The .button class contributes one to B.

### 7. What is the specificity of :is(.item, #featured)?

- **A.** 0-1-0
- **B.** 1-0-0
- **C.** 1-1-0
- **D.** 0-2-0

**Answer: B.** :is() uses the specificity of its most specific argument. #featured contributes 1-0-0.

### 8. What is the specificity of button:not(.disabled)?

- **A.** 0-1-1
- **B.** 0-2-1
- **C.** 0-1-0
- **D.** 1-0-1

**Answer: A.** button contributes one type selector. :not() takes the specificity of .disabled, which contributes one class. :not() itself adds no extra component.

### 9. Two matching declarations have equal cascade priorities and equal specificity. What normally decides the winner?

- **A.** Which selector has fewer characters
- **B.** Which declaration appears later in source order
- **C.** Which rule has more declarations
- **D.** Which value is a color

**Answer: B.** Source order resolves a tie after cascade priorities and specificity are equal.

### 10. A selector has a very high specificity but does not match the element. What happens?

- **A.** It still wins because its specificity is high
- **B.** It applies only to inherited properties
- **C.** It does not participate in the element's cascade
- **D.** It becomes an important declaration

**Answer: C.** Only declarations whose selectors match the element can compete for that element's property.

### 11. What is the specificity of .item:nth-child(odd of li, #selected)?

- **A.** 1-1-0
- **B.** 1-2-0
- **C.** 0-2-1
- **D.** 1-2-1

**Answer: B.** .item and :nth-child() each add one to B. The most specific selector in the of list is #selected, which adds one to A.

### 12. A normal inline style conflicts with a stylesheet declaration marked !important. Which one wins in this case?

- **A.** The normal inline style
- **B.** The important stylesheet declaration
- **C.** The one with the longer selector
- **D.** The declaration written first

**Answer: B.** Importance is considered before selector specificity. A normal inline declaration does not outrank an important author declaration.

### 13. Two ordinary matching rules have the same selector and cascade priorities. The later rule changes color. Which color is used?

- **A.** The color in the first rule
- **B.** The color in the later rule
- **C.** Both colors are blended
- **D.** Neither color is used

**Answer: B.** Their specificity and earlier priorities tie, so the later declaration wins by source order.

### 14. A selector matches an element and sets color. Another matching rule sets font-weight. How are the winners chosen?

- **A.** One rule must win all properties
- **B.** The cascade resolves each property separately
- **C.** The rule with more declarations wins both
- **D.** The rule written last wins both

**Answer: B.** CSS resolves each property independently, so different declarations can win for color and font-weight.

### 15. Which selector has greater specificity?

- **A.** #profile
- **B.** main #profile
- **C.** They have equal specificity
- **D.** It depends on which selector is longer

**Answer: B.** Both have one ID, so A ties. main #profile has one additional type selector and therefore wins at C.

### 16. Which statement about :has(> img.featured) is correct?

- **A.** :has() always contributes zero
- **B.** It has the specificity of its most specific argument
- **C.** It always counts as one ID
- **D.** The child combinator adds one class

**Answer: B.** :has() takes specificity from the most specific selector in its argument. Here img.featured contributes 0-1-1.

### 17. How much specificity does an attribute selector such as [disabled] add?

- **A.** One to A
- **B.** One to B
- **C.** One to C
- **D.** None

**Answer: B.** Attribute selectors count in the class-like B component.

### 18. How much specificity does ::before add?

- **A.** One to A
- **B.** One to B
- **C.** One to C
- **D.** None

**Answer: C.** Pseudo-elements count with type selectors in component C.

### 19. Which selector part does not add specificity?

- **A.** A class selector
- **B.** An attribute selector
- **C.** A combinator such as >
- **D.** A pseudo-class

**Answer: C.** Combinators describe relationships between selector parts but contribute no specificity.

### 20. When should you compare specificity?

- **A.** Before checking whether the selector matches
- **B.** Before comparing importance and cascade layers
- **C.** After earlier cascade priorities tie
- **D.** Only when a declaration uses !important

**Answer: C.** Specificity is one step in the cascade. First confirm the declaration applies and compare earlier priorities.

## Short-answer questions

### 21. What does specificity measure?

**Answer:** Specificity is the priority score of a matching selector within the cascade step where specificity is compared.

**Explanation:** It helps decide between matching declarations after earlier cascade priorities, such as origin, importance, and layer, have been considered.

### 22. What do the three specificity components represent?

**Answer:** A counts IDs, B counts classes, attributes, and pseudo-classes, and C counts type selectors and pseudo-elements.

### 23. How do you compare specificity tuples?

**Answer:** Compare A first, then B if A ties, then C if both A and B tie.

**Explanation:** Do not add the three values as ordinary numbers. A larger value in an earlier component takes priority over any value in a later component.

### 24. What specificity does the universal selector add?

**Answer:** It adds zero. It can still be part of a matching selector, but it contributes no value to A, B, or C.

### 25. Do descendant, child, adjacent-sibling, and general-sibling combinators add specificity?

**Answer:** No. Combinators express relationships between selector parts but add no specificity.

### 26. Does :hover count as a type selector or a class-like selector?

**Answer:** It counts as a pseudo-class in component B.

### 27. Why can :where() help with reusable base styles?

**Answer:** :where() and its arguments contribute zero specificity, so a contextual default rule can remain easy to override with ordinary classes.

### 28. Why can :is() unexpectedly make a selector hard to override?

**Answer:** Its specificity comes from the most specific selector in its argument list. An ID inside :is() can therefore give the complete selector an ID component.

### 29. Does !important increase selector specificity?

**Answer:** No. It changes a declaration's cascade priority, not its selector specificity.

### 30. Does an inline style count as an ID selector?

**Answer:** No. An inline style is not included in the A-B-C selector tuple. It has its own position in the cascade compared with stylesheet declarations.

### 31. Why does a later rule sometimes fail to override an earlier rule?

**Answer:** The later rule may have lower specificity, lower cascade priority, or may not match or apply at all. Source order only resolves ties after earlier comparisons.

### 32. Why should specificity be considered separately for each property?

**Answer:** A rule may set several properties, but each property has its own set of competing declarations. One selector can win color while another wins padding.

## Specificity calculations

### 33. Calculate the specificity of article#news .headline.

**Answer: 1-1-1.** #news contributes one ID, .headline contributes one class, and article contributes one type selector.

### 34. Calculate the specificity of input[type="email"]:focus.

**Answer: 0-2-1.** The attribute selector and :focus contribute two to B. input contributes one to C.

### 35. Calculate the specificity of #app main .card button.primary:focus-visible.

**Answer: 1-3-2.** #app contributes one ID. .card, .primary, and :focus-visible contribute three class-like selectors. main and button contribute two type selectors.

### 36. Calculate the specificity of :where(#app, .page) p.notice.

**Answer: 0-1-1.** :where() and its arguments add zero. .notice contributes one to B, and p contributes one to C.

### 37. Calculate the specificity of :not(#hidden) .panel.

**Answer: 1-1-0.** :not() takes the specificity of its most specific argument, #hidden. .panel adds one class.

### 38. Calculate the specificity of :is(h1, h2, #title)::before.

**Answer: 1-0-1.** :is() takes the specificity of #title, and ::before adds one pseudo-element in C.

## Code and conflict analysis

### 39. Which color is used for this element when all declarations have equal cascade priorities?

~~~html
<p id="summary" class="notice">Status</p>
~~~

~~~css
p { color: teal; }
.notice { color: darkorange; }
#summary { color: navy; }
~~~

**Answer: Navy.** All three selectors match. Their scores are 0-0-1, 0-1-0, and 1-0-0. The ID selector wins at A.

### 40. Which color is used if the class rule is moved after the ID rule in question 39?

**Answer: Navy.** Moving the class rule changes source order, but the ID selector still has higher specificity. Source order cannot break a specificity difference.

### 41. Which color is used when these rules apply in the same author layer?

~~~css
#status { color: navy; }
.message { color: tomato !important; }
~~~

**Answer: Tomato.** The important declaration wins over the normal declaration before specificity is compared. The fact that #status is more specific does not change that result.

### 42. What is the specificity of :is(.card, #featured) p, and why?

**Answer: 1-0-1.** The most specific :is() argument is #featured, giving 1-0-0. The p type selector adds one to C.

### 43. What is the specificity of :where(#app) .button, and why?

**Answer: 0-1-0.** :where() and #app contribute zero. .button contributes one class.

### 44. A declaration is crossed out in developer tools. What should you inspect before adding !important?

**Answer:** Confirm that the intended selector matches, the stylesheet loaded, and any condition is active. Then inspect the winning declaration and compare cascade priority, specificity, and source order.

**Explanation:** The crossed-out declaration usually reveals which competing rule won. Adding !important without identifying the cause can make future overrides harder.

### 45. How can you reduce specificity when several selectors are needed for a contextual default?

**Answer:** Consider putting the context selector inside :where(), or use a simpler class selector.

**Example:**

~~~css
:where(#app) .button {
  border-radius: 0.25rem;
}
~~~

The ID inside :where() contributes zero, so the selector remains at 0-1-0.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [10 - The cascade and inheritance](../qnas/10-cascade-and-inheritance.md) | [Lesson](../lessons/11-specificity-and-conflicts.md) | [Example](../examples/11-specificity-and-conflicts.md) | [12 - Cascade layers](12-cascade-layers.md) |