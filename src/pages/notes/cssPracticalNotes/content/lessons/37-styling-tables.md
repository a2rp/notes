# 37 - Styling tables

HTML tables represent information with relationships between rows and columns. CSS can make those relationships easier to scan with spacing, borders, alignment, and responsive overflow while the HTML keeps the table's structure.

## Learning outcomes

After this chapter, you should be able to:

- Use tables for data that has row-and-column relationships.
- Style table captions, headers, body rows, and footer rows.
- Choose between collapsed borders and separated borders.
- Control table width, column sizing, cell padding, and alignment.
- Add alternating row backgrounds without making color the only way to distinguish data.
- Keep wide tables usable on narrow screens.

## Use tables for tabular data

Use an HTML table when a reader needs to compare related values across rows and columns. Do not use a table just to place page content in a grid. CSS Grid, Flexbox, and normal flow are layout tools for non-tabular content.

A data table can use:

- `<caption>` for a title or description of the table.
- `<thead>` for column headers.
- `<tbody>` for the main rows.
- `<tfoot>` for totals or summaries.
- `<th>` for header cells.
- `<td>` for data cells.

~~~html
<table>
  <caption>Weekly temperatures</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Morning</th>
      <th scope="col">Afternoon</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>18 °C</td>
      <td>24 °C</td>
    </tr>
  </tbody>
</table>
~~~

Use `scope="col"` for a header describing a column and `scope="row"` for a header describing a row. The heading relationships are in HTML. CSS changes only their presentation.

## Give the table room

A table's intrinsic size depends on its cells and content. Set its width when the design needs a clear size:

~~~css
.data-table {
  width: 100%;
}
~~~

This makes the table fill its containing block, but it does not guarantee that every column's contents will fit at every viewport width. Avoid shrinking text until it becomes difficult to read.

### Automatic and fixed table layout

`table-layout: auto` is the default. The browser considers cell content when distributing column widths.

`table-layout: fixed` uses the table's specified width and column sizing information rather than allowing all cell content to determine the column widths. It can make columns more predictable, but long content may wrap or overflow inside them.

~~~css
.data-table {
  width: 100%;
  table-layout: fixed;
}
~~~

When using a fixed layout, set reasonable widths for important columns and provide appropriate wrapping for long content. Do not use fixed layout to hide content.

## Cell padding and alignment

Cell padding creates space between the cell's content and its edges:

~~~css
.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
}
~~~

Text alignment can distinguish labels from measurements. Logical alignment values adapt to text direction:

~~~css
.data-table th {
  text-align: start;
}

.data-table td.numeric {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
~~~

For cells with content on multiple lines, `vertical-align` controls alignment within the row:

~~~css
.data-table td {
  vertical-align: top;
}
~~~

Choose alignment that helps comparison. Text labels usually align to the start edge. Numeric values often align to the end edge so their digits are easier to compare.

## Borders and spacing

The `border-collapse` property chooses how adjacent cell borders are drawn.

~~~css
.data-table {
  border-collapse: collapse;
}
~~~

With `collapse`, neighboring borders share an edge and appear as a single border. Set borders on the cells or table sections to create a compact grid.

With `separate`, borders remain distinct and there can be space between cells. `border-spacing` controls that space:

~~~css
.spaced-table {
  border-collapse: separate;
  border-spacing: 0.5rem 0.25rem;
}
~~~

The first spacing value is horizontal and the second is vertical. `border-spacing` applies to the separated border model, not to a collapsed-border table.

Do not set both models and expect them to combine. Choose one model for each table and style it consistently.

## Header and row styling

Use background and border styles to clarify the table's structure:

~~~css
.data-table thead {
  color: #fff;
  background-color: #173d48;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f0f5f7;
}

.data-table tbody th,
.data-table tbody td {
  border-bottom: 1px solid #d5e0e5;
}
~~~

Alternating row backgrounds can help readers follow across a wide table. Keep enough text contrast and preserve visible row and column relationships if colors are removed or overridden.

A caption can be placed above or below the table:

~~~css
.data-table caption {
  caption-side: top;
  text-align: start;
}
~~~

Keep a visible caption when it helps explain what the measurements or categories mean.

## Responsive tables

A table with several columns may need more width than a phone screen. One practical approach is to let the table keep a readable minimum width and allow its wrapper to scroll horizontally:

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

This preserves the rows and columns for comparison. Make the scroll area discoverable and test keyboard use on the actual page. Do not hide columns or replace a data table with unrelated cards unless the relationships remain clear.

For a simple table with only a few columns, wrapping text and using flexible widths may be enough. Choose based on the content and check at narrow viewports.

## Column styling and spanning cells

A `<colgroup>` can group columns, and `<col>` can provide column-related styling such as widths and backgrounds:

~~~html
<table>
  <colgroup>
    <col class="name-column">
    <col>
    <col>
  </colgroup>
  <!-- thead and tbody -->
</table>
~~~

~~~css
.name-column {
  width: 30%;
}
~~~

Cells can span columns with `colspan` or rows with `rowspan` when the data relationship calls for it. Keep the grid understandable, and make header relationships clear for cells that span multiple sections.

## Common mistakes

| Mistake | Why it causes trouble | Better approach |
| :--- | :--- | :--- |
| Using a table for page layout | The markup suggests relationships that are not data | Use Grid, Flexbox, or normal flow |
| Using `<td>` for every cell | Header relationships are missing | Use `<th>` with the appropriate `scope` |
| Setting `width: 100%` and assuming no overflow can happen | Long content and many columns still need space | Wrap the table in a horizontal scroll container |
| Combining `border-collapse: collapse` with `border-spacing` | Spacing does not apply to collapsed borders | Choose collapsed or separated borders |
| Using fixed table layout to hide long values | Content can wrap badly or overflow | Adjust the column widths or allow scrolling |
| Using color alone to identify a row | The distinction can disappear in other viewing conditions | Keep headings and table structure meaningful |
| Making every number center aligned | Values are harder to compare by digit position | Align numeric values consistently, often to the end |

## Try it yourself

1. Add a caption, a header row, and row headers to a plain data table.
2. Compare `border-collapse: collapse` with `border-collapse: separate`.
3. Add cell padding and align text labels and numeric values differently.
4. Add alternating backgrounds to body rows and check text contrast.
5. Put a wide table in an `overflow-x: auto` wrapper and view it at phone width.
6. Add a `<colgroup>` and adjust the width of the first column.

## Key points

- Use tables for data with row-and-column relationships, not general page layout.
- Captions and header cells help explain the data and its relationships.
- Choose either collapsed borders or separated borders.
- Width and fixed layout do not remove the need to handle long content.
- Horizontal scrolling can preserve a wide data table on a narrow screen.
- Keep structure meaningful so the table still makes sense without visual styling.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [36 - Lists and markers](36-lists-and-markers.md) | [Q&A](../qnas/37-styling-tables.md) | [Example](../examples/37-styling-tables.md) | [38 - Styling links and link states](38-styling-links.md) |
