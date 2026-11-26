# 27 - Table headings, captions, and accessible structure

Table data is easier to understand when the markup explains what each row and column means. Use header cells and captions to give tables structure, and use explicit associations when a table has multiple levels of headings.

## What you will learn

- How a caption identifies a table's subject.
- How th cells differ from td cells.
- How scope connects simple row and column headings with data.
- How row and column groups help organize table structure.
- How id and headers connect cells in complex tables.
- How to decide when a complicated table should be simplified.

## Make table relationships clear

A data table is a grid of values. Readers need to know which row and column describe each value. Visual styling alone does not identify these relationships for everyone.

Use native table elements to mark the structure:

- caption names the table's subject.
- th marks a header cell.
- td marks a data cell.
- scope states whether a simple header applies to a row or column.
- id and headers can make explicit associations in complex tables.

Assistive technologies can use this markup to present header context as users navigate through the cells. Exact presentation depends on the browser and assistive technology, so keep the table structure clear and test important tables with the tools your audience uses.

## Add a caption

Place a caption directly inside the table, after the opening table tag:

~~~html
<table>
  <caption>Plant watering schedule</caption>
  ...
</table>
~~~

A concise caption tells readers what the table contains before they explore its cells. A heading placed before a table can introduce the section, while the caption names the table itself. Use both when each provides useful context.

## Mark column and row headers

Use th for cells that label data and td for ordinary data. In a straightforward table, a header row labels columns, and a header cell at the start of a row can label that row.

The scope attribute can make the direction of a header explicit. Use scope="col" for a column header and scope="row" for a row header:

~~~html
<table>
  <caption>Plant watering schedule</caption>
  <thead>
    <tr>
      <th scope="col">Plant</th>
      <th scope="col">Watering frequency</th>
      <th scope="col">Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Basil</th>
      <td>Every two days</td>
      <td>Sunny window</td>
    </tr>
    <tr>
      <th scope="row">Fern</th>
      <td>Once a week</td>
      <td>Shaded shelf</td>
    </tr>
  </tbody>
</table>
~~~

The column headers tell readers what each column contains. Each row header identifies the plant whose watering details follow. The scope values add meaning to the markup; they do not set a visual style.

For uncomplicated tables, browsers and assistive technologies can often infer the header direction from the structure. Writing scope explicitly can make the relationships clear in the source and easier to maintain.

## Group related headings

A table can have multiple header levels. For example, a top-level header might group two related columns. A table can also divide rows into groups using separate tbody elements.

The scope values rowgroup and colgroup can identify headers for row or column groups when the table structure supports those groups. Use them for grouped data rather than guessing based on how cells look.

If a table has many merged cells or several levels of headings, its relationships can become difficult to follow. Consider whether it would be clearer to divide the data into simpler tables. When the complex grid is necessary, explicit id and headers associations can name all relevant headings.

## Connect complex headers with id and headers

Give each relevant th a unique id. Then give each data cell a headers attribute containing the ids of all its associated header cells. Separate multiple ids with spaces.

This example has a group heading, subheadings, and row headings:

~~~html
<table>
  <caption>Assessment scores by student</caption>
  <thead>
    <tr>
      <th rowspan="2" scope="col">Student</th>
      <th id="scores-heading" colspan="2">Scores</th>
    </tr>
    <tr>
      <th id="quiz-heading" headers="scores-heading">Quiz</th>
      <th id="project-heading" headers="scores-heading">Project</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="asha-heading" scope="row">Asha</th>
      <td headers="asha-heading scores-heading quiz-heading">8</td>
      <td headers="asha-heading scores-heading project-heading">9</td>
    </tr>
    <tr>
      <th id="dev-heading" scope="row">Dev</th>
      <td headers="dev-heading scores-heading quiz-heading">7</td>
      <td headers="dev-heading scores-heading project-heading">10</td>
    </tr>
  </tbody>
</table>
~~~

For Asha's quiz score, the headers list names the row header, the group heading, and the quiz subheading. The ids are unique, and every referenced id points to a header cell in the same table.

Most simple tables do not need headers attributes. Use the simplest table structure that communicates the data accurately.

## Avoid unnecessary complexity

Many merged or multi-level headings can make a table difficult to navigate, even when the markup is technically correct. Before adding more spans and associations:

1. Check whether the data can be shown in a simpler table.
2. Add a caption that describes the subject.
3. Mark headers with th instead of relying on bold text or color.
4. Use scope for straightforward row and column relationships.
5. Use id and headers when a data cell is associated with several headings that cannot be described clearly with the simpler structure.
6. Check that the table remains understandable when read one cell at a time.

Do not use an old summary attribute on table. Use a caption for the table's name, and provide any longer explanation in regular text near the table.

## Common mistakes

- Making header cells look bold but marking them as td.
- Adding a caption outside the table when it should identify the table itself.
- Using an empty caption or a vague name that does not explain the table.
- Using scope="col" on a row heading or scope="row" on a column heading.
- Assuming scope changes how the table looks. It provides structure, not styling.
- Reusing the same id for multiple header cells.
- Referencing a missing or misspelled id in a headers value.
- Forgetting to include all relevant heading ids in a complex cell's headers value.
- Adding id and headers to a simple table that does not need complex associations.
- Keeping a very complex table when dividing it into smaller tables would be clearer.
- Using the obsolete summary attribute instead of a caption and nearby explanatory text.

## Try it yourself

1. Add a concise caption to the workshop table from the previous chapter.
2. Mark each column heading with th and scope="col".
3. Add a row header for each workshop name with th and scope="row".
4. Explain the purpose of the table in one sentence outside the table.
5. Create a table with a group heading and two subheadings. Give the header cells unique ids.
6. Add headers values to the data cells so each one references its row, group, and column headings.
7. Check that every id is unique and every headers token points to a th in the same table.
8. Decide whether a complex table could be split into simpler tables.

## Key points

- A caption gives a table a concise name.
- Use th for header cells and td for data cells.
- Use scope="col" and scope="row" to describe simple column and row headers.
- Use rowgroup and colgroup when a header applies to a row or column group.
- In a complex table, unique ids and headers values can associate each data cell with its relevant headers.
- Keep tables as simple as the information allows.
- Do not use the obsolete summary attribute.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [26 - HTML tables: rows, columns, and cells](26-html-tables.md) | [Q&A](../qnas/27-accessible-tables.md) | [Example](../examples/27-accessible-tables.md) | [28 - Forms: the form element and submission flow](28-forms-overview.md) |
