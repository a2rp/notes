# 37 - Styling tables - Q&A

Review table semantics, layout, cell styling, borders, and responsive handling. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. When is an HTML table the appropriate structure?

- A. Whenever a page needs columns
- B. When the content has row-and-column relationships
- C. Whenever CSS Grid is unavailable
- D. Whenever a heading needs centered text

**Answer: B. When the content has row-and-column relationships.**

**Explanation:** Tables are for tabular data. Use CSS Grid, Flexbox, or normal flow for general page layout.

### 2. Which element provides a title or description for a table?

- A. `<caption>`
- B. `<label>`
- C. `<summary>`
- D. `<legend>`

**Answer: A. `<caption>`.**

**Explanation:** A caption identifies the table's subject and is associated with the table.

### 3. What does `border-collapse: collapse` do?

- A. Removes every border from the table
- B. Combines adjacent cell borders into shared edges
- C. Adds space between each cell
- D. Hides empty rows

**Answer: B. It combines adjacent cell borders into shared edges.**

**Explanation:** In the collapsed-border model, neighboring cell borders share an edge.

### 4. Which property adds spacing between cells in the separated-border model?

- A. `border-gap`
- B. `cell-spacing`
- C. `border-spacing`
- D. `padding-spacing`

**Answer: C. `border-spacing`.**

**Explanation:** The property applies when the table uses `border-collapse: separate`.

### 5. What does `table-layout: fixed` help control?

- A. How column widths are allocated when the table width is specified
- B. Whether the table has accessible headers
- C. Whether the caption is visible
- D. Whether the table can scroll

**Answer: A. How column widths are allocated when the table width is specified.**

**Explanation:** Fixed layout uses the specified table width and column sizing information rather than allowing all cell content to determine the widths.

### 6. Which header is appropriate for a cell that labels its row?

- A. `<td>`
- B. `<th scope="row">`
- C. `<caption scope="row">`
- D. `<col>`

**Answer: B. `<th scope="row">`.**

**Explanation:** A row header labels the related cells in that row. A column header generally uses `<th scope="col">`.

### 7. How can a wide table remain usable on a narrow screen?

- A. Make all text smaller until it fits
- B. Hide half of the columns
- C. Put it in a wrapper with horizontal overflow
- D. Change every cell into a heading

**Answer: C. Put it in a wrapper with horizontal overflow.**

**Explanation:** A scrollable wrapper can preserve the full table and its row-and-column relationships.

### 8. Why might numeric values be aligned to the end edge of their cells?

- A. It creates alternating row colors
- B. It makes values easier to compare by their final digits
- C. It changes the table to fixed layout
- D. It removes extra columns

**Answer: B. It makes values easier to compare by their final digits.**

**Explanation:** Consistent end alignment helps readers compare the digits of numeric values.

## True or false

### 9. A table is a good general-purpose replacement for CSS Grid.

**Answer: False.**

**Explanation:** A table implies tabular relationships. Grid and Flexbox are better for general layout.

### 10. A table with `width: 100%` can still overflow a narrow viewport.

**Answer: True.**

**Explanation:** Many columns or long unbreakable content can require more space than the container provides.

### 11. `border-spacing` creates visible gaps in a table using `border-collapse: collapse`.

**Answer: False.**

**Explanation:** `border-spacing` applies to the separated-border model. It does not create gaps when borders collapse.

### 12. Alternating row colors should be the only way to identify a row.

**Answer: False.**

**Explanation:** Color can be removed or difficult to distinguish. The table should retain meaningful headers and structure.

### 13. `<thead>`, `<tbody>`, and `<tfoot>` describe table sections in HTML.

**Answer: True.**

**Explanation:** These elements group header, body, and footer rows. CSS can style each group.

## Short-answer questions

### 14. What is the difference between `<th>` and `<td>`?

**Answer:** `<th>` marks a header cell. `<td>` marks a data cell.

**Explanation:** Header cells describe related rows or columns. Use an appropriate `scope` value for straightforward tables.

### 15. Explain the difference between automatic and fixed table layout.

**Answer:** Automatic layout considers cell content while distributing column widths. Fixed layout uses the table's specified width and column sizing information.

**Explanation:** Fixed layout can be more predictable, but it does not make long content disappear. It may wrap or overflow.

### 16. Why should a data table have a caption?

**Answer:** A caption can tell readers what the table covers before they inspect its rows and columns.

**Explanation:** It provides a concise title or description associated with the table.

### 17. What are the two common border models for an HTML table?

**Answer:** Collapsed borders, where neighboring borders share edges, and separated borders, where borders are distinct and may have space between them.

**Explanation:** Choose the model that matches the design. `border-spacing` works with separated borders.

### 18. Why is a horizontal scroll wrapper often better than shrinking every table cell?

**Answer:** It preserves a readable table width and all of the data without making the text too small.

**Explanation:** Readers can scroll horizontally to compare the columns. Check that the scroll area works with the input methods your page supports.

## Debugging questions

### 19. Why is this row of cells still separated by gaps?

~~~css
table {
  border-collapse: separate;
  border-spacing: 0.75rem;
}
~~~

**Answer:** The table is explicitly using the separated-border model, so the spacing is expected.

**Fix:** If the intent is to share borders between cells, use:

~~~css
table {
  border-collapse: collapse;
}
~~~

**Explanation:** Select one border model. The spacing property does not combine with collapsed borders.

### 20. Why does this table still overflow even though it is 100% wide?

~~~css
table {
  width: 100%;
}
~~~

**Answer:** Its columns and cell content may need more width than the containing block provides.

**Fix:** Preserve a readable minimum width and put the table inside a horizontal scroll wrapper:

~~~css
.table-scroll {
  max-width: 100%;
  overflow-x: auto;
}

table {
  min-width: 42rem;
  width: 100%;
}
~~~

**Explanation:** Percentage width controls the table's requested width, but it does not guarantee every cell can fit without overflow.

### 21. Why do nested or unrelated cells all receive the same header background?

~~~css
th {
  background-color: navy;
}
~~~

**Answer:** The broad selector styles every header cell in the table, including row headers and nested table headers.

**Fix:** Use a more specific selector for the intended header group, such as:

~~~css
thead th {
  color: white;
  background-color: navy;
}
~~~

**Explanation:** Scope styles to the table section or component they are meant to affect.

### 22. Why does this table not expose its first column as row headers?

~~~html
<tr>
  <td>Monday</td>
  <td>18 °C</td>
  <td>24 °C</td>
</tr>
~~~

**Answer:** Every cell is a data cell. The day label should be a header cell that identifies the row.

**Fix:**

~~~html
<tr>
  <th scope="row">Monday</th>
  <td>18 °C</td>
  <td>24 °C</td>
</tr>
~~~

**Explanation:** Markup communicates cell relationships to assistive technology, not just visual styling.

## Coding questions

### 23. Write CSS for a full-width compact table with shared borders and padded cells.

**Answer:**

~~~css
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5df;
}
~~~

**Explanation:** The collapsed model creates shared border lines. Padding keeps cell content from touching those borders.

### 24. Add alternating backgrounds to body rows without styling the header row.

**Answer:**

~~~css
.data-table tbody tr:nth-child(even) {
  background-color: #f0f5f7;
}
~~~

**Explanation:** Scoping the selector to `tbody` avoids applying the stripe to header rows. Keep text contrast clear.

### 25. Make numeric values align to the end edge and use tabular digits when available.

**Answer:**

~~~css
.data-table td.numeric {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
~~~

**Explanation:** End alignment helps compare values, and tabular digits can make numbers line up consistently.

### 26. Add a horizontal scroll wrapper for a table on narrow screens.

**Answer:**

~~~html
<div class="table-scroll">
  <table class="data-table">
    <!-- table caption, sections, rows, and cells -->
  </table>
</div>
~~~

~~~css
.table-scroll {
  max-width: 100%;
  overflow-x: auto;
}

.data-table {
  min-width: 42rem;
  width: 100%;
}
~~~

**Explanation:** The table keeps a readable minimum width while the wrapper provides horizontal scrolling.

## Key takeaways

- Use tables for data with row-and-column relationships.
- Captions and header cells give the table and its data context.
- Choose collapsed or separated borders intentionally.
- A full-width table can still need horizontal scrolling.
- Scope styles to the table sections they are intended to change.
- Preserve table structure and readable text on narrow screens.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [36 - Lists and markers](../lessons/36-lists-and-markers.md) | [Q&A](37-styling-tables.md) | [Example](../examples/37-styling-tables.md) | [38 - Styling links and link states](../lessons/38-styling-links.md) |
