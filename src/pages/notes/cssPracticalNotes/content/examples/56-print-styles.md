# 56 - Print styles

This example turns a screen-oriented project report into a readable printed document. It uses a print media query, a preferred page size, page-break guidance, a table header, and screen-only controls.

## Question

How can a page keep its useful report content while hiding screen controls and guiding the browser's page breaks for printing?

## Complete example

Save the following as index.html and styles.css in the same folder. Open index.html in a browser and use the Print report button. The button calls the browser's print dialog; the layout changes because of the print CSS.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Project report - Print styles</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="document">
    <header class="page-header">
      <div>
        <p class="eyebrow">Quarterly project report</p>
        <h1>Community garden progress</h1>
        <p class="intro">
          A concise update on the garden's work, resources, and next steps.
        </p>
      </div>

      <button class="print-button screen-only" type="button" onclick="window.print()">
        Print report
      </button>
    </header>

    <nav class="screen-navigation" aria-label="Report sections">
      <a href="#overview">Overview</a>
      <a href="#activity">Recent activity</a>
      <a href="#next-steps">Next steps</a>
    </nav>

    <p class="print-note print-only">
      Community garden progress report. Prepared for printed reading.
    </p>

    <section class="report-section" id="overview" aria-labelledby="overview-title">
      <h2 id="overview-title">Overview</h2>
      <p>
        Volunteers maintained the shared beds, welcomed new gardeners, and
        prepared the site for the next planting cycle.
      </p>

      <div class="summary-grid">
        <article class="summary-card">
          <p class="summary-label">Active volunteers</p>
          <p class="summary-value">24</p>
        </article>

        <article class="summary-card">
          <p class="summary-label">Beds in use</p>
          <p class="summary-value">8 of 10</p>
        </article>

        <article class="summary-card">
          <p class="summary-label">Work sessions</p>
          <p class="summary-value">6</p>
        </article>
      </div>

      <aside class="callout">
        <h3>Current focus</h3>
        <p>
          Finish the accessible path, label shared tools, and prepare the
          compost area before the next group planting day.
        </p>
      </aside>
    </section>

    <section class="report-section" id="activity" aria-labelledby="activity-title">
      <h2 id="activity-title">Recent activity</h2>
      <p>
        The table summarizes work completed during the current reporting period.
      </p>

      <table class="activity-table">
        <caption>Volunteer activity summary</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Activity</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>May 04</td>
            <td>Prepared raised beds</td>
            <td>8</td>
            <td><span class="status status-complete">Complete</span></td>
          </tr>
          <tr>
            <td>May 11</td>
            <td>Sorted tools and supplies</td>
            <td>5</td>
            <td><span class="status status-complete">Complete</span></td>
          </tr>
          <tr>
            <td>May 18</td>
            <td>Planted herbs and greens</td>
            <td>11</td>
            <td><span class="status status-complete">Complete</span></td>
          </tr>
          <tr>
            <td>May 25</td>
            <td>Repaired the water station</td>
            <td>4</td>
            <td><span class="status status-planned">Follow-up</span></td>
          </tr>
          <tr>
            <td>June 01</td>
            <td>Added labels to shared beds</td>
            <td>7</td>
            <td><span class="status status-complete">Complete</span></td>
          </tr>
          <tr>
            <td>June 08</td>
            <td>Cleared the path edges</td>
            <td>6</td>
            <td><span class="status status-planned">Follow-up</span></td>
          </tr>
          <tr>
            <td>June 15</td>
            <td>Checked compost temperature</td>
            <td>3</td>
            <td><span class="status status-complete">Complete</span></td>
          </tr>
          <tr>
            <td>June 22</td>
            <td>Reviewed the planting plan</td>
            <td>9</td>
            <td><span class="status status-planned">Follow-up</span></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="report-section page-start" id="next-steps" aria-labelledby="next-steps-title">
      <h2 id="next-steps-title">Next steps</h2>
      <p>
        The next phase focuses on safe access, clear labels, and a predictable
        schedule for maintaining shared spaces.
      </p>

      <div class="next-step-list">
        <article class="next-step">
          <h3>Complete the accessible path</h3>
          <p>
            Confirm the route is clear and stable, then check that signs are
            visible from the entrance.
          </p>
        </article>

        <article class="next-step">
          <h3>Publish the watering schedule</h3>
          <p>
            Add names and dates to the shared schedule so each bed has a
            clearly assigned volunteer.
          </p>
        </article>

        <article class="next-step">
          <h3>Review shared tools</h3>
          <p>
            Replace damaged labels and return tools to the marked storage area
            after each work session.
          </p>
        </article>
      </div>
    </section>

    <footer class="report-footer">
      <p><strong>Prepared by:</strong> Garden coordination group</p>
      <p><strong>Contact:</strong> Community garden desk</p>
      <p><strong>Report period:</strong> May to June</p>
    </footer>
  </main>
</body>
</html>
~~~

### styles.css

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #1f2937;
  background: #eef2f7;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

.document {
  width: min(100% - 2rem, 960px);
  margin: 2rem auto;
  padding: 3rem;
  background: #fff;
  border: 1px solid #d8dee8;
  border-radius: 1rem;
  box-shadow: 0 1rem 3rem rgb(15 23 42 / 10%);
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #d8dee8;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #526178;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0.5rem;
  color: #18324b;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.1;
}

h2 {
  margin-bottom: 0.5rem;
  color: #18324b;
  font-size: 1.5rem;
}

h3 {
  margin-bottom: 0.35rem;
  color: #18324b;
  font-size: 1.05rem;
}

.intro {
  max-width: 42rem;
  margin-bottom: 0;
  color: #526178;
}

.print-button {
  flex: 0 0 auto;
  padding: 0.7rem 1rem;
  color: #fff;
  background: #155eef;
  border: 0;
  border-radius: 0.5rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.print-button:hover {
  background: #1249bd;
}

.screen-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #d8dee8;
}

.screen-navigation a {
  color: #155eef;
  font-weight: 700;
}

.print-only {
  display: none;
}

.report-section {
  margin-top: 2rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.25rem 0;
}

.summary-card {
  padding: 1rem;
  background: #f5f8fc;
  border: 1px solid #d8dee8;
  border-radius: 0.75rem;
}

.summary-label {
  margin-bottom: 0.25rem;
  color: #526178;
  font-size: 0.9rem;
}

.summary-value {
  margin-bottom: 0;
  color: #18324b;
  font-size: 1.75rem;
  font-weight: 700;
}

.callout {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  color: #fff;
  background: #18324b;
  border-left: 0.35rem solid #f5b942;
  border-radius: 0.5rem;
}

.callout h3 {
  color: inherit;
}

.callout p {
  margin-bottom: 0;
}

.activity-table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  text-align: left;
}

.activity-table caption {
  margin-bottom: 0.5rem;
  color: #526178;
  font-weight: 700;
  text-align: left;
}

.activity-table th,
.activity-table td {
  padding: 0.7rem;
  border: 1px solid #cbd5e1;
}

.activity-table th {
  color: #18324b;
  background: #eaf0f7;
}

.activity-table tbody tr:nth-child(even) {
  background: #f8fafc;
}

.status {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-complete {
  color: #14532d;
  background: #dcfce7;
}

.status-planned {
  color: #713f12;
  background: #fef3c7;
}

.next-step-list {
  display: grid;
  gap: 0.85rem;
  margin-top: 1rem;
}

.next-step {
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.65rem;
}

.next-step p {
  margin-bottom: 0;
}

.report-footer {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #cbd5e1;
  color: #526178;
  font-size: 0.9rem;
}

.report-footer p {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .document {
    width: 100%;
    margin: 0;
    padding: 1.25rem;
    border: 0;
    border-radius: 0;
  }

  .page-header {
    flex-direction: column;
  }

  .summary-grid,
  .report-footer {
    grid-template-columns: 1fr;
  }

  .activity-table th,
  .activity-table td {
    padding: 0.45rem;
    font-size: 0.9rem;
  }
}

@page {
  size: A4 portrait;
  margin: 18mm;
}

@media print {
  body {
    color: #111;
    background: #fff;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10.5pt;
    line-height: 1.45;
  }

  .document {
    width: auto;
    margin: 0;
    padding: 0;
    background: #fff;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .screen-only,
  .screen-navigation {
    display: none !important;
  }

  .print-only {
    display: block;
  }

  .print-note {
    margin: 1rem 0;
    color: #333;
    font-size: 9pt;
  }

  h1,
  h2,
  h3 {
    color: #000;
    break-after: avoid-page;
  }

  h1 {
    font-size: 24pt;
  }

  h2 {
    margin-top: 0;
    font-size: 16pt;
  }

  .report-section {
    margin-top: 1.25rem;
  }

  .page-start {
    break-before: page;
  }

  .summary-card,
  .callout,
  .next-step {
    break-inside: avoid-page;
  }

  .summary-grid {
    gap: 0.5rem;
  }

  .summary-card {
    padding: 0.65rem;
    background: transparent;
    border: 1px solid #777;
    border-radius: 0;
  }

  .summary-value {
    font-size: 15pt;
  }

  .callout {
    color: #111;
    background: transparent;
    border: 1px solid #777;
    border-left: 3px solid #333;
    border-radius: 0;
    print-color-adjust: economy;
  }

  .activity-table {
    font-size: 9pt;
  }

  .activity-table thead {
    display: table-header-group;
  }

  .activity-table tr {
    break-inside: avoid-page;
  }

  .activity-table th {
    color: #000;
    background: #eee;
  }

  .activity-table th,
  .activity-table td {
    padding: 0.45rem;
    border-color: #777;
  }

  .status {
    color: #000;
    background: transparent;
    border: 1px solid #777;
  }

  .report-footer {
    gap: 0.5rem;
    margin-top: 1.25rem;
    color: #222;
  }
}
~~~

## Expected output

On screen, the report appears as a centered white document with navigation, summary cards, a colored callout, a data table, and a Print report button.

In print preview, the page uses a white background and compact typography. The navigation and button disappear, while the report title, status words, table, next steps, and contact details remain. The next steps section is requested to start on a new page. Short cards are kept together where space permits, and a table header is requested on continued pages.

The final pagination may differ with paper size, print scale, browser, printer, and user settings. Inspect the preview before printing.

## Explanation

1. The Print report button calls window.print(), which opens the browser's print interface. CSS controls the printed presentation; the small inline event handler only requests the dialog.
2. The print media query changes the body and document to a plain, readable paper layout and removes the screen navigation and button.
3. The print-only note is hidden on screen and shown in print.
4. The @page rule requests A4 portrait pages with 18 mm margins. The print dialog can still use different settings.
5. The page-start class uses break-before: page to request a deliberate page boundary before Next steps.
6. Compact cards use break-inside: avoid-page so the browser tries to keep each card together. The table rows use the same preference.
7. The table head uses table-header-group so the browser can repeat it when the table continues on another sheet.
8. Status text says Complete or Follow-up, so the meaning remains available even when color printing is off.
9. The callout becomes a light, bordered block in print. It stays readable without depending on the dark screen background.
10. The screen media query adjusts the document and summary layout for narrow screens without changing the print rules.

## Try it yourself

1. Use print preview with the default settings, then switch background printing off and check whether the report remains clear.
2. Change the paper size or scale and inspect the section break and table width.
3. Remove the page-start class and compare automatic pagination with the forced section boundary.
4. Add more table rows until the table spans multiple pages, then check whether its header repeats.
5. Remove break-inside: avoid-page from the cards and compare how the browser splits them.
6. Change the print font size and inspect the number of pages and line wrapping.
7. Temporarily hide the status words and observe why color alone is not enough to identify each status.
8. Remove the print-only note and compare the screen and printed document.

## Key points

- A useful print version keeps the report content and hides only screen-only controls.
- Print CSS can request page dimensions and guide breaks, but the browser and print settings influence the final result.
- Backgrounds may not print, so labels and text should carry important meaning.
- Avoidance properties guide pagination but cannot keep content larger than a page together.
- Print preview is part of checking the document, especially for long tables and section boundaries.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [55 - Color schemes and theming](../lessons/55-color-schemes-and-theming.md) | [Q&A](../qnas/56-print-styles.md) | [Example](56-print-styles.md) | [57 - Anchor positioning](../lessons/57-anchor-positioning.md) |