# Example 26 - HTML tables: rows, columns, and cells

## Question

Create a weekly workshop schedule with four columns. Group its header, session rows, and summary into table sections. Show that two sessions share a room with rowspan, then use colspan for a total row.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weekly Workshop Schedule</title>
  </head>
  <body>
    <main>
      <h1>Weekly Workshop Schedule</h1>

      <table>
        <caption>Rooms and seats for this week's web workshops</caption>

        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Session</th>
            <th scope="col">Room</th>
            <th scope="col">Seats</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">Monday</th>
            <td>HTML basics</td>
            <td>Room 2</td>
            <td>18</td>
          </tr>
          <tr>
            <th scope="row">Tuesday</th>
            <td>Working with links</td>
            <td rowspan="2">Room 4</td>
            <td>12</td>
          </tr>
          <tr>
            <th scope="row">Wednesday</th>
            <td>Forms practice</td>
            <td>15</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <th scope="row" colspan="3">Total seats across sessions</th>
            <td>45</td>
          </tr>
        </tfoot>
      </table>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays a weekly schedule with the column headings Day, Session, Room, and Seats. It lists three workshop sessions. Room 4 is shared by Tuesday and Wednesday, and the final row reports 45 seats in total.

HTML table markup does not add visible borders or styling by itself. The elements describe the data and how its cells fit together.

## Explanation

- The table element contains the complete data table. Its caption names the information being shown.
- The thead groups the column headings, tbody groups the three session records, and tfoot groups the summary row.
- Each tr creates a row. The th elements identify the day and the column headings, while td elements contain the session details and seat counts.
- The Room 4 cell uses rowspan="2" to occupy the Room column for both Tuesday and Wednesday. The Wednesday row omits a separate Room cell because that position is already occupied by the spanning cell.
- The total row uses colspan="3" so its heading covers the Day, Session, and Room columns. The value 45 sits in the remaining Seats column.
- The table keeps a consistent four-column grid even though some cells span multiple positions. Use tables for related data, not to position unrelated page content.

## How to try it

Copy the HTML code block using its copy button and save it as weekly-workshop-schedule.html. Open the file in a browser to inspect how the cells line up. Remove rowspan or colspan one at a time and observe how the table grid changes.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 26 - HTML tables: rows, columns, and cells](../lessons/26-html-tables.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [25 - Inline SVG and MathML in HTML](25-svg-and-mathml.md) | [Lesson](../lessons/26-html-tables.md) | [Q&A](../qnas/26-html-tables.md) | [27 - Table headings, captions, and accessible structure](27-accessible-tables.md) |
