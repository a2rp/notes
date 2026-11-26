# 23 - Z-index and Stacking Contexts: Questions and Answers

## Multiple-choice questions

### 1. What does `z-index` control?

- **A.** The stack level of an eligible box inside its stacking context
- **B.** The width of an element
- **C.** The order of CSS declarations in a stylesheet
- **D.** The keyboard focus order

**Answer: A.** `z-index` affects `paint` order when boxes overlap. Its value is compared within a stacking context, not across the entire page.

### 2. Which value is valid for `z-index`?

- **A.** 2px
- **B.** 2rem
- **C.** 2
- **D.** 2%

**Answer: C.** `z-index` accepts `auto` or an integer. It is not a length or percentage.

### 3. An ordinary `static` block has `z-index`: 10. What usually happens?

- **A.** It is painted above all siblings.
- **B.** The `z-index` does not control its stacking.
- **C.** It becomes `fixed`.
- **D.** It creates a containing block for every descendant.

**Answer: B.** An ordinary `static` block does not respond to `z-index` in the usual way. A positioned box can use it, and `flex` and `grid` items are special cases.

### 4. What is the main effect of an integer `z-index` on a positioned element?

- **A.** It changes the element's HTML meaning.
- **B.** It sets a stack level and creates a stacking context.
- **C.** It creates a scroll container.
- **D.** It changes the element's display to `grid`.

**Answer: B.** The integer sets the element's stack level in its parent context, and the element groups its descendants in a new stacking context.

### 5. How does `z-index`: `auto` differ from `z-index`: 0 on a `relative` element?

- **A.** Both always create identical stacking contexts.
- **B.** `auto` does not create a separate context for an ordinary `relative` box, while integer zero does.
- **C.** zero removes the element from layout.
- **D.** `auto` always paints above zero.

**Answer: B.** An explicit integer, including zero, creates a stacking context. An ordinary `relative` or `absolute` box with `auto` does not establish one.

### 6. Which positioned boxes form a stacking context even when `z-index` is `auto`?

- **A.** Only `relative` boxes
- **B.** Fixed and `sticky` boxes
- **C.** Only `absolute` boxes
- **D.** No positioned boxes

**Answer: B.** Fixed and `sticky` boxes form stacking contexts even with `auto`. Relative and `absolute` boxes with `auto` do not form a separate stacking context.

### 7. What happens to a child with `z-index`: 9999 inside a parent stacking context at level 1 when a sibling context is at level 2?

- **A.** The child always appears above the sibling.
- **B.** The child can remain behind the sibling because its parent context is at level 1.
- **C.** The child is removed from the document.
- **D.** The child's `z-index` changes the parent's level to 9999.

**Answer: B.** The parent compares the two stacking contexts as whole groups. The child cannot escape its parent's context by using a larger number.

### 8. Which value can place a stacking context in a negative stack level?

- **A.** `z-index`: -1
- **B.** `z-index`: behind
- **C.** `z-index`: 0%
- **D.** `z-index`: `none`

**Answer: A.** Negative integers are valid stack levels. Use them carefully because content may be painted behind a parent background or other content.

### 9. Which statement about a `flex` item is true?

- **A.** It must be positioned before `z-index` can apply.
- **B.** A non-`auto` `z-index` can affect its stacking even when `position` is `static`.
- **C.** It always forms a stacking context.
- **D.** Its `z-index` changes the `flex` container's order.

**Answer: B.** Flex items can use a non-`auto` `z-index` without setting `position`. This affects stacking, not the `flex` layout order by itself.

### 10. Which statement about a `grid` item is true?

- **A.** A non-`auto` `z-index` can create a stacking context even if `position` is `static`.
- **B.** `z-index` is never allowed on a `grid` item.
- **C.** `z-index` changes its `grid` area to the whole page.
- **D.** It always escapes its parent context.

**Answer: A.** Grid items can use `z-index` without becoming positioned. The resulting stack level remains subject to parent stacking contexts.

### 11. Which declaration creates a stacking context even though it looks like no visible movement?

- **A.** `transform`: `translateX`(0)
- **B.** margin: 0
- **C.** `position`: `static`
- **D.** color: black

**Answer: A.** A `transform` value other than `none` creates a stacking context, even when the `transform` appears visually neutral.

### 12. Which `opacity` value creates a stacking context?

- **A.** `opacity`: 1
- **B.** `opacity`: 0.99
- **C.** `opacity`: inherit
- **D.** `opacity`: initial

**Answer: B.** Any computed `opacity` below 1 creates a stacking context. The element and its descendants are painted as a group.

### 13. What does `isolation`: isolate do?

- **A.** Creates a stacking context for the element
- **B.** Removes the element from normal flow
- **C.** Sets every child to `z-index`: 1
- **D.** Clips all `overflow`

**Answer: A.** `isolation`: isolate creates a local stacking context. It can keep a component's internal layers local without positioning the element.

### 14. A menu is cut off by an ancestor with `overflow`: `hidden`. What will increasing the menu's `z-index` do?

- **A.** It always removes the clipping.
- **B.** It does not remove the clipping.
- **C.** It makes the ancestor `overflow` visible.
- **D.** It changes the menu into a `fixed` element.

**Answer: B.** Clipping and stacking are separate. A larger stack level cannot `paint` the menu outside the clipped area.

### 15. Which statement about containing blocks and stacking contexts is accurate?

- **A.** They mean the same thing.
- **B.** A containing block is a positioning reference; a stacking context is a `paint`-order group.
- **C.** Every containing block creates a stacking context.
- **D.** A stacking context always changes an element's size.

**Answer: B.** These concepts answer different questions. A single property can create both, but one does not imply the other in every case.

## True or false

### 16. `z-index` is a page-wide priority number, so 9999 always wins.

**Answer: False.** Values are compared within stacking contexts. A descendant cannot escape its parent context by increasing its own number.

### 17. A stacking context is painted atomically in its parent context.

**Answer: True.** The parent compares the context as one group. Boxes from an outside sibling context cannot be inserted between its internal layers.

### 18. An integer `z-index` on a positioned element creates a stacking context.

**Answer: True.** Any integer, including zero and negative values, creates a context for a positioned element.

### 19. `z-index`: 0 and `z-index`: `auto` always have the same stacking-context behavior.

**Answer: False.** Zero is an integer and creates a context on a positioned element. `auto` does not create one for ordinary `relative` or `absolute` boxes, although `fixed` and `sticky` boxes do create one with `auto`.

### 20. A `relative` element with `z-index`: `auto` always creates its own stacking context.

**Answer: False.** An ordinary `relative` element with `auto` does not create a separate stacking context. Fixed and `sticky` positioning have different behavior.

### 21. A `grid` item can use a non-`auto` `z-index` while `position` remains `static`.

**Answer: True.** Grid items can use `z-index` without first becoming positioned.

### 22. A `transform` value other than `none` can create a stacking context.

**Answer: True.** The transformed element is grouped in a stacking context, including when the `transform` causes no visible movement.

### 23. `opacity`: 1 creates a stacking context for the same reason as `opacity`: 0.99.

**Answer: False.** An `opacity` value below 1 creates a stacking context. A fully opaque value of 1 does not create one by `opacity` alone.

### 24. Adding `z-index` can make an element `paint` outside an ancestor's clipping boundary.

**Answer: False.** Stacking does not remove clipping. The `overflow` or clipping behavior must be addressed separately.

### 25. Changing `z-index` changes keyboard focus order.

**Answer: False.** `z-index` changes visual `paint` order. It does not reorder the document, keyboard navigation, or screen reader reading order.

## Short-answer questions

### 26. What is a stacking context?

**Answer:** It is a local group of boxes whose internal `paint` order is resolved together. The group is then painted as one unit within its parent stacking context.

### 27. Why might a child with a very large `z-index` appear behind another element?

**Answer:** Its parent may be in a lower stacking context than the other element. The parent context is compared as a whole, so the child's number cannot make it escape that boundary.

### 28. What is the difference between `z-index`: `auto` and `z-index`: 0 on a `relative` element?

**Answer:** `auto` uses the automatic stack level and does not create a separate context for an ordinary `relative` element. Zero is an explicit integer and creates a stacking context, even though its level is zero.

### 29. Can a `static` element ever use `z-index`?

**Answer:** An ordinary `static` block does not use `z-index` to stack above other blocks. Flex and `grid` items are exceptions: a non-`auto` `z-index` can control the item's stacking while `position` is `static`.

### 30. What does a negative `z-index` do?

**Answer:** It assigns a negative stack level within the parent stacking context. The element may be painted behind level-zero content or a parent background, so confirm that it remains visible and usable.

### 31. Name four common ways to create a stacking context.

**Answer:** Examples include the root element, a positioned element with integer `z-index`, `fixed` or `sticky` positioning, `opacity` below 1, a `transform`, `isolation`: isolate, `paint` containment, or a `flex`/`grid` item with non-`auto` `z-index`.

### 32. Why does `opacity` below 1 group an element's descendants for painting?

**Answer:** The element and its descendants are composited as a group so the `opacity` can affect the rendered group. That group has a stacking-context boundary, so children cannot compete directly with outside elements.

### 33. What does `isolation`: isolate help with?

**Answer:** It intentionally creates a local stacking context. A component can keep its internal layers grouped, but those children then cannot independently outrank elements outside the component's context.

### 34. How can a `transform` cause a `z-index` surprise?

**Answer:** A `transform` creates a stacking context. It can also establish a containing block for positioned descendants, so adding it to an ancestor can change both `paint` grouping and positioning references.

### 35. How should you debug a `z-index` issue?

**Answer:** Identify the overlapping boxes, check whether `z-index` applies to the target, then inspect each ancestor for stacking-context creators. Compare the nearest ancestor contexts that share a parent. Also check clipping and source order.

### 36. How are `paint` order and source order related?

**Answer:** Source or tree order helps determine the `paint` order when boxes share a stack level and `paint` layer. Other rules, including explicit stack levels and `flex`/`grid` order-modified painting order, can affect the result.

### 37. What is the difference between a containing block and a stacking context?

**Answer:** A containing block is a reference rectangle for calculating a positioned descendant's location or size. A stacking context is a group that determines how boxes are painted in front of or behind other groups.

## Read the CSS

### 38. Which box appears in front when these siblings overlap?

~~~css
.first {
  position: relative;
  z-index: 1;
}

.second {
  position: relative;
  z-index: 2;
}
~~~

**Answer:** .second is painted in front because both are positioned siblings in the same stacking context and its stack level is higher.

### 39. Does this child necessarily appear above the menu?

~~~css
.card {
  position: relative;
  z-index: 1;
}

.badge {
  position: absolute;
  z-index: 9999;
}

.menu {
  position: relative;
  z-index: 2;
}
~~~

**Answer: No.** The badge is inside the card's stacking context. The browser compares the card context at level 1 with the menu at level 2, so the menu can appear in front of the entire card group.

### 40. Does the `relative` element create a stacking context here?

~~~css
.notice {
  position: relative;
  z-index: auto;
}
~~~

**Answer: No, not by this declaration.** An ordinary `relative` box with `auto` does not create a separate stacking context. Setting an integer such as zero would create one.

### 41. Does this `grid` item need `position`: `relative` for `z-index` to apply?

~~~css
.grid {
  display: grid;
}

.item {
  z-index: 1;
}
~~~

**Answer: No.** A `grid` item can use a non-`auto` `z-index` while `position` is `static`. Its stacking is still contained by any stacking context created by its ancestors.

### 42. Which declaration creates a stacking context in this example?

~~~css
.panel {
  opacity: 0.99;
}
~~~

**Answer:** The `opacity` value creates a stacking context because it is below 1. The panel and its descendants are painted as a group.

### 43. Does a larger `z-index` remove the clipping in this example?

~~~css
.panel {
  overflow: hidden;
}

.menu {
  position: absolute;
  z-index: 1000;
}
~~~

**Answer: No.** The ancestor still clips its contents. Change the clipping or menu placement if the menu must extend beyond the panel.

### 44. Does this `transform` create a stacking context?

~~~css
.card {
  transform: translateX(0);
}
~~~

**Answer: Yes.** A `transform` other than `none` creates a stacking context even when its visual effect is neutral.

### 45. Which group is painted in front?

~~~css
.left-group {
  position: relative;
  z-index: 4;
}

.right-group {
  position: relative;
  z-index: 5;
}

.left-group .child {
  position: relative;
  z-index: 99999;
}
~~~

**Answer:** The right group is painted in front of the left group if they overlap in the same parent stacking context. The left child cannot escape its parent's level 4 context.

### 46. Does this ordinary block move in front of its sibling?

~~~css
.box {
  position: static;
  z-index: 20;
}
~~~

**Answer: No, not because of this `z-index`.** An ordinary `static` block does not use `z-index` to change its stack level. Make it positioned or use a layout context where it is a `flex` or `grid` item if that matches the design.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [22 - Positioning Elements](22-positioning.md) | [Lesson](../lessons/23-z-index-and-stacking-contexts.md) | [Example](../examples/23-z-index-and-stacking-contexts.md) | [24 - Overflow and Scrolling](24-overflow-and-scrolling.md) |
