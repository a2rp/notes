# 06 - Combinators and Selector Relationships: Questions and Answers

Review how CSS combinators match elements based on their relationships in the document tree. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What does a CSS combinator describe?

A. A new HTML element / B. A relationship between elements / C. A color value / D. A class name

**Answer: B.** Combinators describe relationships that must exist between elements for a selector to match.

### 2. Which combinator matches descendants at any depth?

A. `>` / B. `+` / C. A space / D. `~`

**Answer: C.** A space between selectors is the descendant combinator. It can match a direct child or a more deeply nested descendant.

### 3. Which selector matches only `<p>` elements that are direct children of `.panel`?

A. `.panel p` / B. `.panel > p` / C. `.panel + p` / D. `.panel ~ p`

**Answer: B.** The child combinator `>` requires the paragraph's direct parent to match `.panel`.

### 4. Which selector matches a paragraph immediately after an `h2`, with both sharing the same parent?

A. `h2 ~ p` / B. `h2 > p` / C. `h2 + p` / D. `h2 p`

**Answer: C.** The adjacent sibling combinator `+` matches the immediately following sibling.

### 5. Which selector matches later paragraph siblings after an `h2`, even if other siblings occur in between?

A. `h2 ~ p` / B. `h2 + p` / C. `h2 > p` / D. `h2, p`

**Answer: A.** The general sibling combinator `~` can match any later sibling of the same parent.

### 6. Given `<article class="card"><div><p>Text</p></div></article>`, which selector matches the paragraph?

A. `.card > p` / B. `.card p` / C. `article + p` / D. `div + article`

**Answer: B.** The paragraph is a descendant of `.card`, but its direct parent is the `div`, so `.card > p` does not match it.

### 7. What must be true for `h2 + p` to match a paragraph?

A. The paragraph must be anywhere inside the heading. / B. The paragraph must immediately follow the heading as a sibling. / C. The paragraph must come before the heading. / D. The paragraph must have a class named `h2`.

**Answer: B.** `+` requires the two matched elements to be adjacent siblings under the same parent, with the paragraph second.

### 8. What is the main difference between `h2 + p` and `h2 ~ p`?

A. `+` selects any later sibling, while `~` selects only the next one. / B. `+` selects only the next sibling, while `~` can select any later sibling. / C. They always match the same elements. / D. `~` selects descendants at any depth.

**Answer: B.** Both are sibling combinators, but only `+` requires immediate adjacency.

## True or false

### 9. Every direct child is also a descendant.

**Answer: True.** A child is one kind of descendant. A descendant can also be nested several levels deeper.

### 10. Every descendant is a direct child.

**Answer: False.** A descendant may have one or more elements between it and the ancestor.

### 11. Sibling combinators match elements with different direct parents.

**Answer: False.** Siblings share the same direct parent.

### 12. `h2 + p` can match a paragraph nested inside a `div` that follows the `h2`.

**Answer: False.** The paragraph is nested inside the `div`, so it is not a sibling of the `h2`.

### 13. Newlines and indentation in an HTML source file prevent two element siblings from being adjacent.

**Answer: False.** Source formatting whitespace does not add an intervening element. Adjacency is determined by the element siblings in the document tree.

### 14. In `h2 ~ p`, the paragraph must come after the heading.

**Answer: True.** The general sibling combinator matches later siblings in the order of the document, not earlier siblings.

### 15. A combinator changes the meaning of the HTML element it matches.

**Answer: False.** A combinator only helps choose elements for styling. It does not alter HTML semantics or create relationships.

## Short-answer questions

### 16. Explain the difference between a child and a descendant.

**Answer:** A child is directly nested inside an element. A descendant is anywhere inside it, either directly or through other nested elements.

### 17. What does `.menu a` match?

**Answer:** Anchor elements anywhere inside an element with the `menu` class. The anchors may be direct children or nested more deeply.

### 18. What does `.menu > a` match?

**Answer:** Anchor elements that are direct children of an element with the `menu` class.

### 19. What does `h3 + p` match?

**Answer:** A paragraph immediately following an `h3` as a sibling under the same parent.

### 20. What does `h3 ~ p` match?

**Answer:** Paragraph siblings that occur after an `h3` under the same parent. Other sibling elements may occur between the heading and a matching paragraph.

### 21. Why does selector order matter in `h2 + p`?

**Answer:** The selector on the right is the element being matched, and it must follow the selector on the left. `h2 + p` looks for a paragraph after a heading; `p + h2` looks for a heading after a paragraph.

### 22. What does the comma mean in `h1, h2`? Is it a combinator?

**Answer:** It separates alternatives in a selector list, so the rule matches `h1` elements and `h2` elements. A comma is not a combinator because it does not describe a relationship between elements.

## Read the HTML and CSS

Use this markup for Questions 23 to 26:

```html
<section class="panel">
  <h2>Overview</h2>
  <p>First paragraph.</p>
  <ul>
    <li>One item</li>
  </ul>
  <p>Second paragraph.</p>
  <div>
    <p>Nested paragraph.</p>
  </div>
</section>
```

### 23. Which paragraphs match `.panel p`?

**Answer:** All three paragraphs match, including the nested paragraph. Each is somewhere inside `.panel`.

### 24. Which paragraphs match `.panel > p`?

**Answer:** “First paragraph.” and “Second paragraph.” They are direct children of the section. “Nested paragraph.” is inside a `div` and is not a direct child of `.panel`.

### 25. Which paragraph matches `h2 + p`?

**Answer:** “First paragraph.” It immediately follows the `h2` among the section's element siblings.

### 26. Which paragraphs match `h2 ~ p`?

**Answer:** “First paragraph.” and “Second paragraph.” They are later paragraph siblings of the `h2`. The nested paragraph is not a sibling of the heading because it is inside a `div`.

### 27. If another paragraph is inserted between the `h2` and “First paragraph,” what changes for `h2 + p` and `h2 ~ p`?

**Answer:** `h2 + p` matches the newly inserted paragraph because that is now the immediate next paragraph sibling. `h2 ~ p` matches the inserted paragraph and all later paragraph siblings.

## Fix the selector

### 28. The goal is to style only direct paragraph children of `.card`. Fix this selector.

```css
.card p {
  color: gray;
}
```

**Answer:**

```css
.card > p {
  color: gray;
}
```

**Explanation:** The space matches all descendants. The child combinator `>` limits the match to direct children.

### 29. The goal is to style every paragraph sibling that appears after an `h2`. Fix this selector.

```css
h2 + p {
  color: gray;
}
```

**Answer:**

```css
h2 ~ p {
  color: gray;
}
```

**Explanation:** `+` matches only the immediately following sibling. `~` matches any later sibling of the same parent.

### 30. The goal is to style an `h2` that immediately follows a paragraph. Is this selector correct?

```css
h2 + p {
  margin-top: 0;
}
```

**Answer:** No. Use `p + h2`.

```css
p + h2 {
  margin-top: 0;
}
```

**Explanation:** The right-hand selector is the element being matched. To match an `h2` after a paragraph, put `p` on the left and `h2` on the right.

## Practice questions

### 31. Write a selector for all `a` elements anywhere inside `.navigation`.

**Answer:**

```css
.navigation a {
  /* declarations */
}
```

**Explanation:** The descendant combinator matches anchors at any depth inside `.navigation`.

### 32. Write a selector for only `li` elements directly inside `.list`.

**Answer:**

```css
.list > li {
  /* declarations */
}
```

### 33. Write a selector for every `p` sibling that appears after an `h2`, with both at the same level.

**Answer:**

```css
h2 ~ p {
  /* declarations */
}
```

### 34. In one sentence, explain why `.panel > p` does not match a paragraph inside `.panel`'s child `div`.

**Answer:** The paragraph's direct parent is the `div`, not `.panel`, so it is a descendant but not a direct child of `.panel`.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [05 - CSS selector basics](../qnas/05-selector-basics.md) | [Lesson](../lessons/06-combinators-and-selector-relationships.md) | [Example](../examples/06-combinators-and-selector-relationships.md) | [07 - Attribute selectors](07-attribute-selectors.md) |
