# Example 25 - Inline SVG and MathML in HTML

## Question

Create a garden journal page with an accessible SVG chart of seedling growth and mathematical expressions for a circular planter's area and the average recorded seedling height. Include a decorative SVG reminder icon that assistive technology can ignore.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Growth Journal</title>
  </head>
  <body>
    <main>
      <h1>Garden Growth Journal</h1>
      <p>Notes about this month's seedlings and their growing space.</p>

      <section aria-labelledby="growth-heading">
        <h2 id="growth-heading">Seedling height by week</h2>
        <p>
          The seedlings grew from 2 centimeters in week 1 to 8 centimeters
          in week 3. Their measured heights were 2, 5, and 8 centimeters.
        </p>

        <svg
          viewBox="0 0 360 220"
          width="360"
          height="220"
          role="img"
          aria-labelledby="growth-chart-title growth-chart-description">
          <title id="growth-chart-title">Seedling height by week</title>
          <desc id="growth-chart-description">
            Line chart with seedling heights of 2 centimeters in week 1,
            5 centimeters in week 2, and 8 centimeters in week 3.
          </desc>

          <line x1="52" y1="40" x2="52" y2="160" stroke="currentColor">
          </line>
          <line x1="52" y1="160" x2="320" y2="160" stroke="currentColor">
          </line>

          <line x1="52" y1="100" x2="320" y2="100" stroke="gray">
          </line>
          <line x1="52" y1="40" x2="320" y2="40" stroke="gray">
          </line>

          <text x="42" y="164" text-anchor="end">0</text>
          <text x="42" y="104" text-anchor="end">5</text>
          <text x="42" y="44" text-anchor="end">10</text>
          <text x="12" y="24">cm</text>

          <text x="80" y="184" text-anchor="middle">Week 1</text>
          <text x="180" y="184" text-anchor="middle">Week 2</text>
          <text x="280" y="184" text-anchor="middle">Week 3</text>

          <polyline
            points="80,136 180,100 280,64"
            fill="none"
            stroke="royalblue"
            stroke-width="3">
          </polyline>
          <circle cx="80" cy="136" r="5" fill="royalblue"></circle>
          <circle cx="180" cy="100" r="5" fill="royalblue"></circle>
          <circle cx="280" cy="64" r="5" fill="royalblue"></circle>
        </svg>
      </section>

      <section aria-labelledby="math-heading">
        <h2 id="math-heading">Math for the garden</h2>

        <p>
          To find the area of a circular planter, use the formula
          <math>
            <mrow>
              <mi>A</mi>
              <mo>=</mo>
              <mi>π</mi>
              <msup>
                <mi>r</mi>
                <mn>2</mn>
              </msup>
            </mrow>
          </math>,
          where r is the radius.
        </p>

        <p>
          The average of the three recorded heights is
          <math>
            <mrow>
              <mfrac>
                <mrow>
                  <mn>2</mn>
                  <mo>+</mo>
                  <mn>5</mn>
                  <mo>+</mo>
                  <mn>8</mn>
                </mrow>
                <mn>3</mn>
              </mfrac>
              <mo>=</mo>
              <mn>5</mn>
            </mrow>
          </math>
          centimeters.
        </p>
      </section>

      <section aria-labelledby="reminder-heading">
        <h2 id="reminder-heading">Care reminder</h2>
        <p>
          <svg
            viewBox="0 0 20 20"
            width="20"
            height="20"
            aria-hidden="true">
            <path
              d="M10 1 12.5 7.5 19 10 12.5 12.5 10 19 7.5 12.5 1 10 7.5 7.5Z"
              fill="currentColor">
            </path>
          </svg>
          Water the seedlings when the soil feels dry.
        </p>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page shows a heading and a line chart with three weekly measurements. The chart rises from 2 centimeters in week 1, to 5 centimeters in week 2, to 8 centimeters in week 3. Nearby text gives the same values in words.

The MathML expressions display the circle-area formula and the average-height calculation as mathematical notation. A small decorative star appears beside the care reminder.

## Explanation

- The outer HTML document uses familiar elements such as main, section, headings, and paragraphs to organize the page.
- The inline svg element contains vector drawing instructions. Its viewBox defines a coordinate space from 0 to 360 horizontally and 0 to 220 vertically. The width and height set the displayed viewport.
- The SVG title and description are connected to the graphic with aria-labelledby. The nearby paragraph also states the chart's important values, so the information is available as text.
- The chart uses line elements for its axes and grid, text elements for labels, a polyline for the trend, and circles for the measured points.
- The decorative SVG uses aria-hidden="true" because the adjacent words already convey the reminder. Inline SVG does not use an alt attribute.
- Each MathML expression is wrapped in a math element. mi represents identifiers, mn represents numbers, mo represents operators, msup creates a superscript, and mfrac structures a fraction.
- The area formula is A = πr². The average calculation is (2 + 5 + 8) / 3 = 5 centimeters.

## How to try it

Copy the HTML code block using its copy button and save it as garden-growth-journal.html. Open that file in a browser to view the chart and mathematical notation. Change the chart's point coordinates and labels together if you want to show different measurements.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 25 - Inline SVG and MathML in HTML](../lessons/25-svg-and-mathml.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [24 - Responsive images: picture, srcset, and sizes](24-responsive-images.md) | [Lesson](../lessons/25-svg-and-mathml.md) | [Q&A](../qnas/25-svg-and-mathml.md) | [26 - HTML tables: rows, columns, and cells](26-html-tables.md) |
