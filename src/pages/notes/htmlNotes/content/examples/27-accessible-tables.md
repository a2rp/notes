# Example 27 - Table headings, captions, and accessible structure

## Question

Create a page with a simple plant-care table and a grouped assessment table. Give each table a caption, mark row and column headings, and explicitly connect every score to its cohort, student, assessment group, and assessment heading.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Learning Centre Reports</title>
  </head>
  <body>
    <main>
      <h1>Garden Learning Centre</h1>
      <p>
        These reports show plant-care details and scores from the
        garden skills workshops.
      </p>

      <section aria-labelledby="care-heading">
        <h2 id="care-heading">Plant care</h2>
        <p>
          Use this simple table to compare the care requirements of each plant.
        </p>

        <table>
          <caption>Watering and light needs for selected plants</caption>
          <thead>
            <tr>
              <th scope="col">Plant</th>
              <th scope="col">Watering</th>
              <th scope="col">Light</th>
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
            <tr>
              <th scope="row">Mint</th>
              <td>When the top soil feels dry</td>
              <td>Bright, indirect light</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section aria-labelledby="scores-heading">
        <h2 id="scores-heading">Workshop scores</h2>
        <p>
          This table groups two assessments under one heading and groups
          students by workshop level. Each score names all of its related
          headers in the markup.
        </p>

        <table>
          <caption>Quiz and project scores by workshop level</caption>
          <colgroup span="2"></colgroup>
          <colgroup span="2"></colgroup>
          <thead>
            <tr>
              <th id="level-column-heading" scope="col" rowspan="2">Level</th>
              <th id="student-column-heading" scope="col" rowspan="2">Student</th>
              <th id="assessments-heading" scope="colgroup" colspan="2">
                Assessments
              </th>
            </tr>
            <tr>
              <th
                id="quiz-heading"
                scope="col"
                headers="assessments-heading">
                Quiz
              </th>
              <th
                id="project-heading"
                scope="col"
                headers="assessments-heading">
                Project
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th
                id="beginner-group-heading"
                scope="rowgroup"
                rowspan="2">
                Beginner
              </th>
              <th id="asha-row-heading" scope="row">Asha</th>
              <td headers="beginner-group-heading asha-row-heading assessments-heading quiz-heading">8</td>
              <td headers="beginner-group-heading asha-row-heading assessments-heading project-heading">9</td>
            </tr>
            <tr>
              <th id="dev-row-heading" scope="row">Dev</th>
              <td headers="beginner-group-heading dev-row-heading assessments-heading quiz-heading">7</td>
              <td headers="beginner-group-heading dev-row-heading assessments-heading project-heading">10</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th
                id="advanced-group-heading"
                scope="rowgroup"
                rowspan="2">
                Advanced
              </th>
              <th id="mira-row-heading" scope="row">Mira</th>
              <td headers="advanced-group-heading mira-row-heading assessments-heading quiz-heading">9</td>
              <td headers="advanced-group-heading mira-row-heading assessments-heading project-heading">10</td>
            </tr>
            <tr>
              <th id="noah-row-heading" scope="row">Noah</th>
              <td headers="advanced-group-heading noah-row-heading assessments-heading quiz-heading">10</td>
              <td headers="advanced-group-heading noah-row-heading assessments-heading project-heading">8</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays a plant-care table with three plants and a workshop score table. In the score table, Quiz and Project sit under the shared Assessments heading. The students are grouped under Beginner and Advanced.

The captions name each table. The heading cells and their associations are part of the HTML structure; assistive technologies can use them to provide context as a reader moves through the data. Exact presentation depends on the browser and assistive technology.

HTML table markup does not add visible borders or styling by itself.

## Explanation

- Each caption gives its table a concise name. The nearby headings and paragraphs introduce the sections and explain their purpose.
- In the simple plant-care table, scope="col" identifies each column heading and scope="row" identifies each plant heading.
- The score table uses two colgroup elements to group its columns. The Assessments header spans the two assessment columns and uses scope="colgroup".
- The score table has two tbody row groups. Each group heading uses scope="rowgroup" and rowspan="2" to identify the two students in that group.
- Every id value is unique within the table. Each score cell's headers value lists the ids for its student group, student, assessment group, and specific assessment. The ids are separated by spaces.
- The quiz and project subheadings also refer to their parent Assessments heading with headers.
- Explicit id and headers associations are useful for complex tables. Most simple tables need only a caption, th cells, and appropriate scope values. If a complex table is difficult to follow, consider splitting it into simpler tables.

## How to try it

Copy the HTML code block using its copy button and save it as garden-learning-centre.html. Review each headers value and match every id to a heading in the same table. Try removing one referenced id to see why complete associations matter.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 27 - Table headings, captions, and accessible structure](../lessons/27-accessible-tables.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [26 - HTML tables: rows, columns, and cells](26-html-tables.md) | [Lesson](../lessons/27-accessible-tables.md) | [Q&A](../qnas/27-accessible-tables.md) | [28 - Forms: the form element and submission flow](28-forms-overview.md) |
