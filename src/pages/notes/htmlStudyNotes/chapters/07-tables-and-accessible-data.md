# 07. Tables and accessible data

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Audio, video, and embedded content](./06-audio-video-and-embedded-content.md) | [Notes index](../README.md) | [Next: Forms, controls, and labels](./08-forms-controls-and-labels.md) |

## Use a table for related data

A table represents information arranged in rows and columns. Use it for data with a meaningful relationship between each row and column, not to position page content.

~~~html
<table>
  <caption>Weekly garden watering schedule</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Morning</th>
      <th scope="col">Evening</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>Seedlings</td>
      <td>Tomatoes</td>
    </tr>
    <tr>
      <th scope="row">Tuesday</th>
      <td>Herbs</td>
      <td>Raised beds</td>
    </tr>
  </tbody>
</table>
~~~

caption describes the table. th marks a header cell, and scope tells the browser whether it labels a row or column. td holds ordinary data.

## Group table sections

thead groups header rows, tbody groups the main data, and tfoot can group summary rows.

~~~html
<table>
  <caption>Hours spent studying this week</caption>
  <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Hours</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML</th>
      <td>4</td>
    </tr>
    <tr>
      <th scope="row">JavaScript</th>
      <td>6</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>10</td>
    </tr>
  </tfoot>
</table>
~~~

Use sections to make the table source easier to read and to help browsers and assistive technology understand its structure.

## Handle a complex table carefully

For a table with multiple levels of headers, use id and headers to associate each data cell with its header cells. Keep the structure simple when possible.

~~~html
<table>
  <caption>Monthly rainfall by location</caption>
  <thead>
    <tr>
      <th id="location" scope="col">Location</th>
      <th id="january" scope="col">January</th>
      <th id="february" scope="col">February</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="north" scope="row">North garden</th>
      <td headers="north january">42 mm</td>
      <td headers="north february">38 mm</td>
    </tr>
  </tbody>
</table>
~~~

For ordinary tables, scope is often enough. Explicit headers associations are useful when the relationship cannot be understood from a simple row and column structure.

## Make wide tables usable

A wide data table may need horizontal scrolling on a narrow screen. Preserve the table semantics and make the scroll region discoverable instead of removing important columns.

Do not use table markup solely for visual layout. Use CSS layout tools for page columns and spacing.

## Practice questions

1. When is a table the right element?
2. What does caption describe?
3. How does th differ from td?
4. What does scope="col" communicate?
5. What does scope="row" communicate?
6. What do thead, tbody, and tfoot group?
7. When can headers and id associations help?
8. Why should tables not be used for page layout?

## Main references

- [HTML tables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_table_basics)
- [The table element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table)
- [The th element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th)
- [The caption element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption)