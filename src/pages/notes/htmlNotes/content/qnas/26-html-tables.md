# 26 - HTML tables: Questions and Answers

Practice questions for [Lesson 26 - HTML tables: rows, columns, and cells](../lessons/26-html-tables.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What kind of information is an HTML table designed to present?

- A. Related data arranged in rows and columns.
- B. Any page content that needs indentation.
- C. A website's navigation menu only.
- D. Text that should be hidden.

**Answer: A.** Tables represent meaningful relationships between values arranged in rows and columns.

### 2. Which element contains a table row?

- A. td
- B. tr
- C. th
- D. tbody

**Answer: B.** The tr element represents one row in a table.

### 3. Which element represents a regular data cell?

- A. td
- B. th
- C. tr
- D. thead

**Answer: A.** A td element contains data in a table cell. A th element marks a header cell.

### 4. How are columns formed in a basic table?

- A. Each column must be created with a separate column element.
- B. Cells in the same position in each row line up to form columns.
- C. Every tr element creates one column.
- D. The browser guesses columns from the table text.

**Answer: B.** Cells align by their order in each row. Explicit column elements are not required for a basic table.

### 5. What does tbody do?

- A. Groups the main rows of table data.
- B. Creates a new table.
- C. Makes every cell a heading.
- D. Merges the first and last columns.

**Answer: A.** The tbody element groups one or more rows of the table's main data.

### 6. Which element groups a table's header rows?

- A. tfoot
- B. thead
- C. td
- D. col

**Answer: B.** Use thead to group the table's header rows.

### 7. What does colspan="2" mean on a table cell?

- A. The cell spans two rows.
- B. The cell spans two columns.
- C. The table has two columns total.
- D. The cell contains two values.

**Answer: B.** The cell occupies two column positions in the table grid.

### 8. What does rowspan="2" mean on a table cell?

- A. The cell spans two rows.
- B. The cell spans two columns.
- C. The table has two header rows.
- D. The cell is repeated twice.

**Answer: A.** The cell occupies its column position in the current row and the next row.

### 9. Why should tables not be used to arrange an ordinary page layout?

- A. Tables can only contain numbers.
- B. Tables describe data relationships, not general page layout.
- C. Tables cannot contain text.
- D. Tables are not allowed inside HTML.

**Answer: B.** Choose HTML elements for the page content and use a table when the content itself is tabular data.

### 10. Which row grouping is commonly used for a summary such as a total?

- A. thead
- B. tbody
- C. tfoot
- D. tr

**Answer: C.** The tfoot element groups summary rows at the end of a table.

## True or false

### 1. The table element contains the structure of a table.

**Answer: True.** Rows and cells are placed inside the table.

### 2. A td element represents a table row.

**Answer: False.** The tr element represents a row. A td element represents a data cell inside a row.

### 3. A th element is used for a header cell.

**Answer: True.** It identifies a cell as a header. More detail about captions and accessible header relationships is covered in the next chapter.

### 4. Every basic HTML table needs a separate element for each column.

**Answer: False.** The cells in each row line up to form the columns.

### 5. A cell with colspan="3" covers three column positions.

**Answer: True.** Count all three positions when checking the table grid.

### 6. A cell with rowspan="2" should normally be followed by another cell in the same column on the next row.

**Answer: False.** The spanning cell already occupies that position in the next row.

### 7. A tbody element can group multiple table rows.

**Answer: True.** It groups one or more rows of the table's main data.

### 8. A table is a good choice whenever text needs to appear next to other text.

**Answer: False.** Use a table when the data has meaningful row and column relationships, not just to position page content.

## Short-answer questions

### 1. What does the tr element represent?

**Answer:** It represents one table row and contains the row's header and data cells.

### 2. What is the difference between td and th?

**Answer:** td represents a data cell. th represents a header cell. The next chapter explains captions and header relationships in more detail.

### 3. How do cells create columns?

**Answer:** Cells in the same position within each row line up to form a column. The first cells line up as the first column, the second cells as the second column, and so on.

### 4. What are thead, tbody, and tfoot used for?

**Answer:** They group header rows, main data rows, and summary rows respectively. They group rows but do not replace the table, row, or cell elements.

### 5. What does colspan do?

**Answer:** It makes one cell occupy multiple columns. For example, colspan="2" makes the cell cover two column positions.

### 6. What does rowspan do?

**Answer:** It makes one cell occupy multiple rows. For example, rowspan="2" makes the cell cover its current row and the next row.

### 7. What should you check after adding a spanning cell?

**Answer:** Count the grid positions occupied by the spanning cell and make sure the other rows still place their values under the intended columns.

### 8. When should you use an HTML table?

**Answer:** Use it for related data that readers need to compare across rows and columns, such as a schedule, inventory, or measurements.

## Practical questions

### 1. Write a table with two column headings, Country and Capital, and two rows of data.

**Answer:**

~~~html
<table>
  <thead>
    <tr>
      <th>Country</th>
      <th>Capital</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Japan</td>
      <td>Tokyo</td>
    </tr>
    <tr>
      <td>Kenya</td>
      <td>Nairobi</td>
    </tr>
  </tbody>
</table>
~~~

The header row has two cells, and each data row has two cells in the same order.

### 2. Fix this markup by putting the cells inside a table row.

~~~html
<table>
  <td>HTML</td>
  <td>Lesson 26</td>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <td>HTML</td>
    <td>Lesson 26</td>
  </tr>
</table>
~~~

The tr element groups the two cells into one row.

### 3. Add a summary row that spans the first two columns and shows 3 total books in the third column.

**Answer:**

~~~html
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>River Stories</td>
      <td>Mina Das</td>
      <td>2020</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="2">Total books</th>
      <td>3</td>
    </tr>
  </tfoot>
</table>
~~~

The total label occupies the first two column positions. The value 3 is in the third position.

### 4. Correct the row so its values align under the three headings.

~~~html
<table>
  <tr>
    <th>Item</th>
    <th>Room</th>
    <th>Seats</th>
  </tr>
  <tr>
    <td>HTML basics</td>
    <td>Room 2</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <th>Item</th>
    <th>Room</th>
    <th>Seats</th>
  </tr>
  <tr>
    <td>HTML basics</td>
    <td>Room 2</td>
    <td>18</td>
  </tr>
</table>
~~~

The data row needs a third cell so its values align with all three headings.

### 5. Make the Room A cell cover both Monday and Tuesday.

~~~html
<table>
  <tr>
    <th>Day</th>
    <th>Activity</th>
    <th>Room</th>
  </tr>
  <tr>
    <th>Monday</th>
    <td>HTML</td>
    <td>Room A</td>
  </tr>
  <tr>
    <th>Tuesday</th>
    <td>Tables</td>
    <td>Room A</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tr>
    <th>Day</th>
    <th>Activity</th>
    <th>Room</th>
  </tr>
  <tr>
    <th>Monday</th>
    <td>HTML</td>
    <td rowspan="2">Room A</td>
  </tr>
  <tr>
    <th>Tuesday</th>
    <td>Tables</td>
  </tr>
</table>
~~~

The rowspan cell occupies the Room column for both rows, so the second Room A cell is removed.

### 6. Make the label "No sessions" cover all three columns of this row.

~~~html
<tr>
  <td>No sessions</td>
</tr>
~~~

**Answer:**

~~~html
<tr>
  <td colspan="3">No sessions</td>
</tr>
~~~

The cell now spans three column positions.

### 7. Put the data rows in a tbody and the summary row in a tfoot.

~~~html
<table>
  <tr>
    <td>Notebook</td>
    <td>4</td>
  </tr>
  <tr>
    <th>Total items</th>
    <td>4</td>
  </tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <tbody>
    <tr>
      <td>Notebook</td>
      <td>4</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Total items</th>
      <td>4</td>
    </tr>
  </tfoot>
</table>
~~~

tbody groups the main data row, and tfoot groups the summary row.

### 8. Explain why this page layout should not use a table, and name an appropriate kind of content for a table.

~~~html
<table>
  <tr>
    <td>Welcome to my website</td>
    <td>About me</td>
  </tr>
</table>
~~~

**Answer:** The example uses cells to position unrelated page content, so it is not tabular data. A table would be appropriate for information such as a timetable with days in one column and session times in another.

## Related lesson

- [Lesson 26 - HTML tables: rows, columns, and cells](../lessons/26-html-tables.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [25 - Inline SVG and MathML in HTML](25-svg-and-mathml.md) | [Lesson](../lessons/26-html-tables.md) | [Example](../examples/26-html-tables.md) | [27 - Table headings, captions, and accessible structure](27-accessible-tables.md) |
