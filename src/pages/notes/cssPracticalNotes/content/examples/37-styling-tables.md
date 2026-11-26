# 37 - Styling tables - Example

This example styles a data table for weekly weather measurements. It includes a caption, column and row headers, alternating body rows, numeric alignment, and a scroll wrapper for narrow screens.

## Question

Create a responsive weather table that:

- Uses HTML table sections and meaningful header cells.
- Uses collapsed borders and readable cell padding.
- Aligns measurements consistently.
- Adds subtle alternating row backgrounds.
- Remains usable on a narrow screen without hiding columns.

## Complete HTML

Copy the code into an HTML file and open it in a browser to see the page.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Styling Tables</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      font-size: 100%;
      color-scheme: light;
      --ink: #1e2a38;
      --muted: #596a7d;
      --paper: #f2f6f8;
      --surface: #fff;
      --line: #d4dfe6;
      --header: #174c5a;
      --stripe: #eef5f7;
      --summary: #e3f0f2;
      --focus: #b44d18;
    }

    body {
      min-width: 320px;
      min-height: 100vh;
      padding: clamp(1rem, 4vw, 3rem);
      color: var(--ink);
      background-color: var(--paper);
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      font-size: 1rem;
      line-height: 1.6;
    }

    .page {
      width: min(100%, 1000px);
      margin-inline: auto;
    }

    .hero {
      padding: clamp(1.5rem, 4vw, 3rem);
      border-radius: 1.25rem;
      color: #fff;
      background-color: #174c5a;
    }

    .eyebrow {
      color: #166477;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .hero .eyebrow {
      color: #b9e5e8;
    }

    .hero h1 {
      margin-top: 0.5rem;
      font-size: clamp(2rem, 5vw, 3.6rem);
      line-height: 1.1;
    }

    .hero p:last-child {
      max-width: 64ch;
      margin-top: 0.8rem;
      color: #e4f0f2;
    }

    .section {
      margin-top: 2.5rem;
    }

    .section h2 {
      font-size: clamp(1.5rem, 3vw, 2rem);
      line-height: 1.2;
    }

    .section__intro {
      max-width: 68ch;
      margin-top: 0.5rem;
      color: var(--muted);
    }

    .table-card {
      margin-top: 1.25rem;
      padding: clamp(0.75rem, 3vw, 1.5rem);
      border: 1px solid var(--line);
      border-radius: 1rem;
      background-color: var(--surface);
      box-shadow: 0 0.5rem 1.5rem rgb(28 49 66 / 7%);
    }

    .table-scroll {
      max-width: 100%;
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: 0.65rem;
    }

    .table-scroll:focus-visible {
      outline: 3px solid var(--focus);
      outline-offset: 4px;
    }

    .weather-table {
      width: 100%;
      min-width: 46rem;
      table-layout: fixed;
      border-collapse: collapse;
      background-color: var(--surface);
    }

    .weather-table col.day-column {
      width: 25%;
    }

    .weather-table col.measure-column {
      width: 25%;
    }

    .weather-table caption {
      padding: 0.9rem 1rem;
      color: var(--ink);
      background-color: #f7fafb;
      font-size: 1.05rem;
      font-weight: 700;
      text-align: start;
      caption-side: top;
    }

    .weather-table th,
    .weather-table td {
      padding: 0.8rem 1rem;
      border-bottom: 1px solid var(--line);
      vertical-align: middle;
    }

    .weather-table thead th {
      color: #fff;
      background-color: var(--header);
      font-size: 0.9rem;
      font-weight: 700;
      text-align: start;
    }

    .weather-table tbody th {
      font-weight: 650;
      text-align: start;
    }

    .weather-table td.numeric {
      text-align: end;
      font-variant-numeric: tabular-nums;
    }

    .weather-table tbody tr:nth-child(even) {
      background-color: var(--stripe);
    }

    .weather-table tbody tr:hover {
      background-color: #e2eff2;
    }

    .weather-table tfoot th,
    .weather-table tfoot td {
      border-top: 2px solid #8eabb4;
      border-bottom: 0;
      background-color: var(--summary);
      font-weight: 700;
    }

    .weather-table tfoot th {
      text-align: start;
    }

    .table-note {
      margin-top: 0.85rem;
      color: var(--muted);
      font-size: 0.9rem;
    }

    .closing-note {
      margin-top: 2rem;
      color: var(--muted);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">A practical table</p>
      <h1>Compare the week's weather</h1>
      <p>
        The table groups daily measurements into rows and measurement types
        into columns. Use the caption and headers to understand each value.
      </p>
    </header>

    <section class="section" aria-labelledby="report-heading">
      <h2 id="report-heading">Weather report</h2>
      <p class="section__intro">
        The table keeps a readable minimum width. On a narrow screen, scroll
        the data area horizontally instead of hiding measurements.
      </p>

      <div class="table-card">
        <div
          class="table-scroll"
          role="region"
          aria-labelledby="weather-caption"
          tabindex="0"
        >
          <table class="weather-table">
            <caption id="weather-caption">
              Daily temperatures and rainfall for one week
            </caption>

            <colgroup>
              <col class="day-column">
              <col class="measure-column">
              <col class="measure-column">
              <col class="measure-column">
            </colgroup>

            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Morning °C</th>
                <th scope="col">Afternoon °C</th>
                <th scope="col">Rainfall mm</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">Monday</th>
                <td class="numeric">18.2</td>
                <td class="numeric">24.6</td>
                <td class="numeric">0.0</td>
              </tr>
              <tr>
                <th scope="row">Tuesday</th>
                <td class="numeric">17.5</td>
                <td class="numeric">23.8</td>
                <td class="numeric">2.4</td>
              </tr>
              <tr>
                <th scope="row">Wednesday</th>
                <td class="numeric">19.1</td>
                <td class="numeric">25.3</td>
                <td class="numeric">0.0</td>
              </tr>
              <tr>
                <th scope="row">Thursday</th>
                <td class="numeric">18.7</td>
                <td class="numeric">22.9</td>
                <td class="numeric">6.8</td>
              </tr>
              <tr>
                <th scope="row">Friday</th>
                <td class="numeric">16.9</td>
                <td class="numeric">21.7</td>
                <td class="numeric">1.2</td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th scope="row">Weekly average</th>
                <td class="numeric">18.1</td>
                <td class="numeric">23.7</td>
                <td class="numeric">2.1</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p class="table-note">
          On a narrow screen, focus the table region and scroll horizontally
          to reach every column.
        </p>
      </div>
    </section>

    <p class="closing-note">
      The table's structure remains in the HTML. CSS controls its borders,
      spacing, alignment, and colors.
    </p>
  </main>
</body>
</html>
~~~

## Explanation

### Table structure

The caption names the data. The column headers use `scope="col"`, and each day is a row header with `scope="row"`. The body contains daily readings, and the footer summarizes the measurements.

### Sizing and borders

The table fills its wrapper but has a minimum width for its four columns. `table-layout: fixed` makes the column widths predictable. The `colgroup` assigns one quarter of the table width to each column.

`border-collapse: collapse` creates shared cell edges. The cell padding leaves room around each value without adding separate gaps between borders.

### Alignment and row styling

Day names align to the start edge. Measurements align to the end edge and use tabular numerals where available. Alternating body row color helps the eye follow a row, while the text and headers still identify its contents.

### Narrow screens and keyboard use

The outer region scrolls horizontally when the table is wider than the available space. It has a visible focus outline and can receive keyboard focus, so users can reach the scrollable area without a pointer.

## Expected output

The page begins with a dark teal banner titled "Compare the week's weather". A white table card below it contains a caption and a four-column weather table. The header row has a dark teal background, even-numbered body rows have a pale blue tint, and the footer has a separate summary background.

Day names align left, numeric measurements align right, and the shared borders form a compact grid. On a narrow screen, the table keeps readable column widths and can be scrolled horizontally inside its wrapper.

The markdown displays this HTML as code. Copy it into an HTML file and open that file in a browser to see the described output.

## Optional separated-border variation

To add gaps between cells instead of shared edges, change the table border model and set spacing:

~~~css
.weather-table {
  border-collapse: separate;
  border-spacing: 0.35rem;
}
~~~

Remove or adjust the cell borders if the gaps already separate the cells clearly. `border-spacing` is used with the separated-border model.

## Try it yourself

1. Change the body row stripe from even rows to odd rows.
2. Change the table to `border-collapse: separate` and set a small border spacing.
3. Remove `table-layout: fixed` and compare how the content affects column widths.
4. Add a longer day label and see how the table handles it.
5. Narrow the browser and use the keyboard to focus and scroll the table region.
6. Change numeric alignment to `text-align: center` and compare how easy the values are to scan.

## Key points

- The caption and header cells explain the table's purpose and relationships.
- The table uses collapsed borders and padded cells for a compact grid.
- Numeric alignment helps readers compare values.
- Alternating colors support scanning but do not replace meaningful headers.
- A horizontal scroll wrapper can preserve a wide table on a small screen.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [36 - Lists and markers](../lessons/36-lists-and-markers.md) | [Lesson](../lessons/37-styling-tables.md) | [Q&A](../qnas/37-styling-tables.md) | [38 - Styling links and link states](../lessons/38-styling-links.md) |
