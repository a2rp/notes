# 28 - Alignment and Gaps: Questions and Answers

Use these questions to review Grid and Flexbox alignment, the alignment axes, place shorthands, gaps, and common layout behavior. Each answer follows its question.

## Multiple-choice questions

### 1. In a Grid container, which axis does `justify-items` control?

- A. Block axis
- B. Inline axis
- C. Both axes
D. It controls the grid tracks

**Answer: B. Inline axis.**

**Explanation:** In Grid, justify properties follow the inline axis and align properties follow the block axis.

### 2. In a Flexbox row, which axis does `justify-content` control?

- A. Main axis
- B. Cross axis
- C. Always the block axis
D. It controls item height

**Answer: A. Main axis.**

**Explanation:** Flexbox defines its main axis from `flex-direction`. For a row, this usually runs in the inline direction.

### 3. Which property sets a default cross-axis alignment for Flexbox items?

- A. `justify-items`
- B. `align-items`
- C. `justify-self`
D. `place-content`

**Answer: B. `align-items`.**

**Explanation:** `align-items` sets the cross-axis alignment for items on a flex line. One item can override it with `align-self`.

### 4. What does `place-items: start center` mean?

- A. `justify-items: start` and `align-items: center`
- B. `align-items: start` and `justify-items: center`
- C. `align-content: start` and `justify-content: center`
D. It sets only one alignment value

**Answer: B. `align-items: start` and `justify-items: center`.**

**Explanation:** The place shorthands list align first and justify second.

### 5. In `gap: 12px 20px`, what do the two values set?

- A. Column gap, then row gap
- B. Row gap, then column gap
- C. Main-axis gap, then cross-axis gap in every layout
D. Outside margin, then inside padding

**Answer: B. Row gap, then column gap.**

**Explanation:** One value sets both gaps. With two values, the first is the row gap and the second is the column gap.

### 6. Which property distributes multiple flex lines across the cross axis?

- A. `align-content`
- B. `justify-items`
- C. `justify-self`
D. `align-self`

**Answer: A. `align-content`.**

**Explanation:** The container needs wrapping, multiple lines, and extra cross-axis room for the distribution to be visible.

### 7. How should a single flex item be moved to the far end of a row while other items remain grouped?

- A. Set `justify-self: end` on that item
- B. Give that item a main-axis auto margin
- C. Set `align-items: end` on the container
D. Add an extra `gap` to the container

**Answer: B. Give that item a main-axis auto margin.**

**Explanation:** Flex items do not use `justify-self` for normal main-axis positioning. An auto margin can absorb the free space before `justify-content` distributes any remaining space.

### 8. Which property aligns the text baselines of items?

- A. `align-items: baseline`
- B. `justify-content: baseline`
- C. `gap: baseline`
D. `place-content: baseline`

**Answer: A. `align-items: baseline`.**

**Explanation:** Baseline alignment lines up text baselines rather than centering or aligning the outer box edges.

## True or false

### 9. `justify-content` always controls horizontal alignment.

**Answer: False.**

**Explanation:** It follows the inline axis in Grid and the main axis in Flexbox. The physical direction depends on writing mode and, in Flexbox, `flex-direction`.

### 10. `gap` adds space before the first item and after the last item in a Grid.

**Answer: False.**

**Explanation:** Gaps are placed between adjacent rows or columns. Use container padding for space at the outer edges.

### 11. A row flex container uses `column-gap` between items and `row-gap` between wrapped lines.

**Answer: True.**

**Explanation:** In a column flex container, the roles correspond to the layout's physical rows and columns, so check the direction when debugging gaps.

### 12. `justify-content` creates extra free space if the items already fill the container.

**Answer: False.**

**Explanation:** Content alignment distributes available free space. It does not create the space it needs.

### 13. `align-content` normally has no visible effect on a single-line flex container.

**Answer: True.**

**Explanation:** There are no multiple flex lines to distribute. A wrapping container also needs extra cross-axis space.

### 14. An auto margin on a flex item can absorb positive free space before `justify-content` distributes what remains.

**Answer: True.**

**Explanation:** This makes auto margins useful for separating one item from a group, such as an account link in a toolbar.

### 15. In a two-value `place-items` declaration, the first value is for `justify-items`.

**Answer: False.**

**Explanation:** The first value is for `align-items` and the second is for `justify-items`.

### 16. Grid and Flexbox use the same meaning for the main and cross axes.

**Answer: False.**

**Explanation:** Main and cross are Flexbox terms. Grid alignment is described by inline and block axes.

## Short-answer questions

### 17. What is self-alignment?

**Answer:** Self-alignment positions one item inside its available alignment area.

**Explanation:** Use `justify-self` and `align-self` for an individual grid item. `align-self` also works for a flex item on its cross axis.

### 18. What is content-alignment?

**Answer:** Content-alignment positions tracks or lines inside their container when there is available space.

**Explanation:** In Grid, `justify-content` and `align-content` distribute tracks. In a wrapping flex container, `align-content` can distribute flex lines.

### 19. What is the difference between `align-items` and `align-self`?

**Answer:** `align-items` sets the default alignment for a container's items. `align-self` overrides that alignment for one item.

**Explanation:** The same container-default and individual-override pattern applies to `justify-items` and `justify-self` in Grid.

### 20. Why can `justify-content: space-between` appear to do nothing in a Grid?

**Answer:** The grid tracks may already fill the container, leaving no free space to distribute.

**Explanation:** Flexible tracks such as `1fr` can grow to use the available width. Try fixed or intrinsic track sizes in a wider container to see the distribution.

### 21. Why is `align-content` not a replacement for `align-items`?

**Answer:** They align different things. `align-content` distributes rows or flex lines inside the container. `align-items` aligns items inside their own areas or flex line.

**Explanation:** First decide whether the tracks or lines need to move as a group, or whether individual items need to move inside their areas.

### 22. What does `gap` do that item margins do not?

**Answer:** `gap` lets the container create consistent spacing between adjacent rows and columns.

**Explanation:** It does not add an outside gap and it does not collapse like adjacent vertical margins can. Margins remain useful when spacing belongs to one particular item.

### 23. How does `flex-direction` affect justify and align?

**Answer:** It determines the Flexbox main axis. Justify follows that main axis, and align follows the perpendicular cross axis.

**Explanation:** Changing a row to a column changes which physical direction each property affects.

### 24. What does baseline alignment line up?

**Answer:** It lines up the text baselines of the aligned items.

**Explanation:** It is useful for neighboring text with different font sizes. It does not center the entire item boxes.

### 25. What does `place-content` set?

**Answer:** It sets `align-content` first and `justify-content` second.

**Explanation:** For example, `place-content: center space-between` centers content on the align axis and distributes it with space between on the justify axis.

### 26. When can `stretch` fail to visibly enlarge an item?

**Answer:** The item may have an explicit size, or there may be no extra space in that axis.

**Explanation:** Stretch generally affects auto-sized items. Check the item's width or height and the size of its grid area or flex line.

## Read the code

### 27. Where is the item centered by this rule?

~~~css
.tile {
  display: grid;
  place-items: center;
}
~~~

**Answer:** The grid container's child items are centered within their own grid areas on both axes.

**Explanation:** `place-items` sets the default item alignment. It does not center the grid tracks inside an outer container.

### 28. In this row toolbar, which direction does `justify-content` control?

~~~css
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
~~~

**Answer:** It distributes items along the row's main axis.

**Explanation:** In the usual writing mode, that is the inline direction. If the flex direction changes to column, the main axis changes too.

### 29. Why can this rule fail to push the account link to the end?

~~~css
.navigation {
  display: flex;
  justify-content: space-between;
}

.account {
  justify-self: end;
}
~~~

**Answer:** `justify-self` does not normally position a flex item along the main axis.

**Explanation:** Use `margin-inline-start: auto` on the account item, or use `justify-content` on the entire flex container if the whole group should be distributed.

### 30. What do the gap values mean here?

~~~css
.cards {
  display: grid;
  row-gap: 0.75rem;
  column-gap: 1.25rem;
}
~~~

**Answer:** Rows are separated by `0.75rem` and columns by `1.25rem`.

**Explanation:** The gap appears between adjacent tracks, not around the outer edge of the grid.

### 31. When will this `align-content` declaration visibly distribute rows?

~~~css
.tags {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  min-height: 14rem;
}
~~~

**Answer:** When the tags wrap onto at least two flex lines and those lines do not already fill the cross-axis space.

**Explanation:** With only one line, there are no multiple lines to distribute.

### 32. What happens to the available space in this navigation?

~~~css
.navigation {
  display: flex;
  justify-content: space-between;
}

.account {
  margin-inline-start: auto;
}
~~~

**Answer:** The auto margin takes positive free space before `justify-content` can distribute it.

**Explanation:** If the margin absorbs all the free space, `justify-content` has none left to share. Remove one spacing strategy if the combination is confusing.

### 33. What is the difference between these two declarations?

~~~css
.grid {
  justify-content: center;
}

.grid > * {
  justify-self: center;
}
~~~

**Answer:** The first centers the grid tracks as a group inside the container. The second centers each grid item inside its own grid area.

**Explanation:** Content-alignment moves tracks. Self-alignment moves individual items.

## Practical and scenario questions

### 34. A row of cards has uneven content heights. How can you align each card's content to the top and keep consistent spacing between cards?

**Answer:**

~~~css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  align-items: start;
  gap: 1rem;
}
~~~

**Explanation:** `align-items: start` prevents eligible cards from stretching vertically to fill their row, and `gap` keeps row and column spacing consistent.

### 35. A toolbar has a logo, navigation links, and an account link that should sit at the far end. What layout can do this without applying spacing to every item?

**Answer:**

~~~css
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toolbar__account {
  margin-inline-start: auto;
}
~~~

**Explanation:** The logical auto margin pushes the account link away from the preceding group, while `gap` maintains minimum spacing between adjacent items.

### 36. A two-column grid has fixed-width tracks in a large container. How can you center the tracks as a group while centering each item inside its cell?

**Answer:**

~~~css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 12rem);
  justify-content: center;
  justify-items: center;
  gap: 1rem;
}
~~~

**Explanation:** `justify-content` centers the tracks; `justify-items` centers each item's box within its own cell. Add `align-items: center` if the items also need block-axis centering.

### 37. A centered dialog's content can become taller than the viewport. What should you consider?

**Answer:** Let the dialog content grow or scroll, and consider safe alignment where the target browsers support it.

**Explanation:** Centering an oversized box can push content beyond the visible start edge. Essential content should remain reachable; alignment alone does not solve overflow.

### 38. A heading and a smaller unit are side by side. Which alignment might make their text look level?

**Answer:** Use baseline alignment, such as `align-items: baseline` in a row flex container.

**Explanation:** Baseline alignment lines up the text baselines. Center alignment would center the outer boxes instead.

## Layout challenge

### 39. Create a responsive card gallery with centered items and even spacing. What CSS would you start with?

**Answer:**

~~~css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  place-items: center;
  gap: 1rem;
}
~~~

**Explanation:** The columns adapt to available width, `place-items` centers each eligible item within its grid area, and `gap` separates both rows and columns. If cards should fill the cells and keep their content aligned to the top instead, use `align-items: start` and remove the item centering.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [27 - CSS Grid Layout](27-css-grid.md) | [Q&A](28-alignment-and-gaps.md) | [Example](../examples/28-alignment-and-gaps.md) | [29 - Multi-column Layout](../lessons/29-multi-column-layout.md) |
