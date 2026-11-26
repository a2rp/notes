# 26 - HTML tables: rows, columns, and cells

An HTML table presents related information in rows and columns. Use a table when readers need to compare values that belong together, such as a schedule, an inventory, or a set of measurements.

## What you will learn

- When tabular data belongs in an HTML table.
- How table, tr, th, and td work together.
- How rows and columns are formed from cells.
- How thead, tbody, and tfoot group table rows.
- How a cell can span more than one row or column.
- How to keep a table grid clear and consistent.

## When to use a table

Use a table for data that has a meaningful row and column relationship. A reader should be able to follow a row, follow a column, and compare the values where they meet.

Do not use a table just to position page content into columns or line things up. Tables describe data relationships. The next chapter covers more about table headings, captions, and accessible structure.

## Build a small table

A table is made from nested elements:

- table contains the whole table.
- tr contains one table row.
- td contains a data cell.
- th contains a header cell.

Here is a small table of workshop sessions:

~~~html
<table>
  <tr>
    <th>Session</th>
    <th>Room</th>
    <th>Seats</th>
  </tr>
  <tr>
    <td>HTML basics</td>
    <td>Room 2</td>
    <td>18</td>
  </tr>
  <tr>
    <td>Working with links</td>
    <td>Room 4</td>
    <td>12</td>
  </tr>
</table>
~~~

The first row has three header cells. Each following row has three data cells. The first cell in each row forms the first column, the second cell forms the second column, and the third cell forms the third column.

HTML does not require a separate element for every column in a basic table. The cells in each row line up in order to form the columns. Keep related cells in the same order in every row so their values stay under the intended headings.

## Group rows into sections

For a table with a header row, body rows, and possibly a summary row, group the rows with thead, tbody, and tfoot:

~~~html
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Unit price</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Notebook</td>
      <td>3.50</td>
      <td>4</td>
    </tr>
    <tr>
      <td>Pencil</td>
      <td>0.80</td>
      <td>10</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Total items</th>
      <td colspan="2">14</td>
    </tr>
  </tfoot>
</table>
~~~

- thead groups the table's header rows.
- tbody groups the main rows of data.
- tfoot groups summary rows, such as totals.

A table can have one or more tbody elements. The section elements group rows. They do not replace table, tr, th, or td.

Browsers can create a tbody around rows when it is omitted in HTML source. Writing the group explicitly makes a table's structure easier to read and maintain.

## Make a cell span columns

The colspan attribute makes one cell cover multiple columns. In the example above, the total value cell spans two columns:

~~~html
<tr>
  <th>Total items</th>
  <td colspan="2">14</td>
</tr>
~~~

The row still occupies three columns: the Total items heading spans two columns, and the value occupies the third. Use colspan when a cell really applies across those columns, not to create visual space.

## Make a cell span rows

The rowspan attribute makes a cell cover more than one row:

~~~html
<table>
  <thead>
    <tr>
      <th>Day</th>
      <th>Activity</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Monday</th>
      <td>HTML practice</td>
      <td rowspan="2">Lab A</td>
    </tr>
    <tr>
      <th>Tuesday</th>
      <td>Table practice</td>
    </tr>
  </tbody>
</table>
~~~

The Lab A cell covers the Location column for both Monday and Tuesday. It is written once, on the first row it covers. Do not add another cell in that same column on Tuesday, because the rowspan cell already occupies that position.

## Keep the table grid consistent

Each row should provide the cells needed for its columns. A cell with colspan or rowspan occupies more than one grid position, so account for those positions when writing nearby rows.

Before adding a span, sketch the rows and columns or count the positions. This helps prevent shifted values and confusing gaps.

## Common mistakes

- Using a table to lay out a page instead of representing tabular data.
- Forgetting to place cells inside a tr element.
- Putting a td directly inside table instead of inside a tr, or nesting rows inside rows.
- Putting text directly inside table instead of inside a cell.
- Leaving cells out of a row so values fall under the wrong columns.
- Counting a spanning cell as only one column when checking the grid.
- Adding an extra cell in a column already occupied by a rowspan.
- Using colspan to make empty space rather than express a real data relationship.
- Treating thead, tbody, or tfoot as replacements for table rows and cells.

## Try it yourself

1. Create a table with three columns for a book title, author, and publication year.
2. Add a thead for the column headings and a tbody for at least three book rows.
3. Add a tfoot row that summarizes the number of books.
4. Make the summary cell span the columns it describes with colspan.
5. Create a weekly schedule and use rowspan when one location is shared by two consecutive rows.
6. Check that every row lines up with the same columns after you add a span.
7. Explain why a table is useful for comparing data but not for laying out an ordinary page.

## Key points

- A table represents data with meaningful row and column relationships.
- table contains the table, tr contains rows, td contains data cells, and th contains header cells.
- Cells align by their order in each row to form columns.
- thead, tbody, and tfoot group header, body, and summary rows.
- colspan and rowspan let a cell cover multiple grid positions.
- Plan the table grid so values stay under the intended columns.
- Use tables for data, not as a page layout tool.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [25 - Inline SVG and MathML in HTML](25-svg-and-mathml.md) | [Q&A](../qnas/26-html-tables.md) | [Example](../examples/26-html-tables.md) | [27 - Table headings, captions, and accessible structure](27-accessible-tables.md) |
