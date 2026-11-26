# 31 - Container Queries: Questions and Answers

Use these questions to review query containers, size conditions, containment types, names, container units, and common debugging issues. Each answer follows its question.

## Multiple-choice questions

### 1. What does a size container query measure?

- A. Only the browser window
- B. A qualifying ancestor element in the document
- C. The physical screen resolution
- D. The number of child elements

**Answer: B. A qualifying ancestor element in the document.**

**Explanation:** A container query can let descendants adapt to the size of an ancestor query container.

### 2. Which property establishes an element as a size query container?

- A. `query-size`
- B. `container-query`
- C. `container-type`
- D. `container-name`

**Answer: C. `container-type`.**

**Explanation:** A size query needs an ancestor with a suitable `container-type`, such as `inline-size` or `size`.

### 3. Which container type is usually best for a card that changes layout based on its available width?

- A. `normal`
- B. `inline-size`
- C. `size` in every case
- D. `block-size`

**Answer: B. `inline-size`.**

**Explanation:** Most responsive components only need to query their inline dimension. This leaves their block size content-driven.

### 4. Which element can a container query style?

~~~css
.card {
  container-type: inline-size;
}
~~~

- A. Only the `.card` element itself
- B. Descendants of `.card`
- C. Any element on the page
- D. Only the parent of `.card`

**Answer: B. Descendants of `.card`.**

**Explanation:** The query container is an ancestor used to evaluate a condition. A size query cannot style that container based on its own size.

### 5. What does the name do in this rule?

~~~css
@container sidebar (inline-size >= 30rem) {
  .menu {
    display: block;
  }
}
~~~

- A. It creates an element named `sidebar`.
- B. It selects a matching named ancestor query container.
- C. It changes the viewport width.
- D. It assigns `sidebar` as a class to `.menu`.

**Answer: B. It selects a matching named ancestor query container.**

**Explanation:** The ancestor must have the name `sidebar` and support the queried dimension. A name alone does not establish a size query container.

### 6. Which feature can query the logical inline dimension?

- A. `inline-size`
- B. `orientation`
- C. `color-scheme`
- D. `aspect-ratio` only

**Answer: A. `inline-size`.**

**Explanation:** The inline dimension is logical, so it can follow the writing mode. It is generally preferable for reusable components.

### 7. What does `container-type: size` allow?

- A. Querying only the inline axis
- B. Querying both inline and block dimensions
- C. Querying the browser's color scheme
- D. Querying an element's text content

**Answer: B. Querying both inline and block dimensions.**

**Explanation:** Size containment supports queries on both axes, but it also changes intrinsic sizing in both axes. Use it when the container's dimensions can be constrained independently of its content.

### 8. What does `1cqi` represent?

- A. One percent of the viewport width
- B. One percent of an eligible query container's inline size
- C. One pixel of the query container's height
- D. One percent of the root font size

**Answer: B. One percent of an eligible query container's inline size.**

**Explanation:** The `cqi` unit is relative to a container's inline dimension. It is useful for details that should scale with a component.

### 9. What does `and` mean in a container condition?

~~~css
@container (inline-size >= 24rem) and (inline-size < 48rem) {
  /* styles */
}
~~~

- A. Either condition can match.
- B. Both conditions must match.
- C. The second condition overrides the first.
- D. The conditions are ignored.

**Answer: B. Both conditions must match.**

**Explanation:** `and` combines conditions that must all be true for the rule to apply.

## True or false

### 10. Setting only `container-name` is enough to make an element a size query container.

**Answer: False.**

**Explanation:** A name identifies a container for selection. A size query still requires an appropriate `container-type`, such as `inline-size` or `size`.

### 11. A named query can select a matching ancestor farther away than the nearest unnamed container.

**Answer: True.**

**Explanation:** The browser searches ancestors for one that matches the name and supports the queried dimension.

### 12. Container queries make media queries unnecessary.

**Answer: False.**

**Explanation:** The query types answer different questions. Media queries are useful for viewport and user-environment changes; container queries are useful for component space. They can be combined.

### 13. A useful base style should exist outside a container query.

**Answer: True.**

**Explanation:** The base style keeps the content usable below the threshold and in browsers that do not support the enhancement.

## Short-answer questions

### 14. How does `inline-size` differ from `size`?

**Answer:** `inline-size` makes the inline dimension queryable. `size` makes both the inline and block dimensions queryable.

**Explanation:** `inline-size` is a good default for cards and widgets because the block dimension can still be determined by content. `size` applies size containment on both axes, so dimensions may need explicit constraints.

### 15. Why should a component breakpoint be chosen based on its content?

**Answer:** The component needs more or less space based on its contents, not the name of a device.

**Explanation:** A card might appear in a narrow sidebar on a large screen or a wide region on a smaller screen. A container condition responds to the actual space available to that instance.

### 16. What is the difference between `cqi` and `cqb`?

**Answer:** `cqi` is relative to one percent of an eligible container's inline size. `cqb` is relative to one percent of its block size.

**Explanation:** The first follows the inline axis and the second follows the block axis. Their physical directions depend on writing mode.

### 17. If no eligible query container is available for a container-relative unit, what happens?

**Answer:** The unit falls back to the corresponding small viewport dimension.

**Explanation:** This fallback can make a component's sizing change when it is moved outside its intended container. Keep a sensible base value and test both contexts.

## Read the code

### 18. When will the inner content become two columns?

~~~css
.card {
  container-type: inline-size;
}

.card__content {
  display: grid;
  grid-template-columns: 1fr;
}

@container (inline-size >= 32rem) {
  .card__content {
    grid-template-columns: 8rem 1fr;
  }
}
~~~

**Answer:** When the nearest eligible query container is at least `32rem` in its inline size.

**Explanation:** The container is `.card`, and the query changes the descendant `.card__content`. Below the threshold, the one-column base remains.

### 19. Does this rule apply when `.card` is 40rem wide?

~~~css
.card {
  container-type: inline-size;
}

@container card (inline-size >= 30rem) {
  .card__title {
    font-size: 1.5rem;
  }
}
~~~

**Answer:** Not from the code shown, because the container has not been given the name `card`.

**Explanation:** Add `container-name: card` or use the shorthand `container: card / inline-size`. The condition's size alone does not satisfy a named query.

## Troubleshooting and coding

### 20. A query does not match. What should you inspect first?

**Answer:** Check that an ancestor has a suitable `container-type`, that the queried selector targets a descendant, and that the condition is measured against the intended container.

**Explanation:** A missing container, a query on the container itself, or an unsupported queried axis are common causes. If the query is named, verify the name too.

### 21. Fix this code so the card content can respond to the card's inline size.

~~~css
.card__content {
  container-type: inline-size;
}

@container (inline-size >= 30rem) {
  .card__content {
    grid-template-columns: 8rem 1fr;
  }
}
~~~

**Answer:**

~~~css
.card {
  container-type: inline-size;
}

.card__content {
  display: grid;
  grid-template-columns: 1fr;
}

@container (inline-size >= 30rem) {
  .card__content {
    grid-template-columns: 8rem minmax(0, 1fr);
  }
}
~~~

**Explanation:** Put the query container on an ancestor and change a descendant. The base layout remains usable when the query does not match.

### 22. Write a query that changes `.article__body` to two columns when a named `article` container reaches at least `40rem` inline size.

**Answer:**

~~~css
.article {
  container: article / inline-size;
}

.article__body {
  display: grid;
  grid-template-columns: 1fr;
}

@container article (inline-size >= 40rem) {
  .article__body {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
~~~

**Explanation:** The shorthand assigns the name and type. The query targets the body inside the ancestor and keeps a single-column base layout.

### 23. A card's content is no longer contributing to its automatic width after adding `container-type: inline-size`. Is this necessarily a browser bug?

**Answer: No.**

**Explanation:** Inline-size containment changes how the container's intrinsic inline size is determined. Check the parent grid or flex layout, the available width, and minimum-size constraints.

## Key takeaways

- Size queries need a suitable ancestor query container.
- `inline-size` is the common choice for responsive components.
- Queries style descendants, not the query container itself.
- A name helps select an ancestor when containers are nested.
- `size` supports both axes and also affects intrinsic sizing in both axes.
- Container-relative units scale details with a component's dimensions.
- Keep base styles useful and debug by resizing the actual container.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [30 - Responsive Design and Media Queries](../lessons/30-responsive-design-and-media-queries.md) | [Q&A](31-container-queries.md) | [Example](../examples/31-container-queries.md) | [32 - Logical Properties and Writing Modes](../lessons/32-logical-properties-and-writing-modes.md) |
