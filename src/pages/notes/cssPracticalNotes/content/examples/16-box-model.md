# 16 - The CSS Box Model: Example

## Goal

Compare `content-box` with `border-box` and see how content, padding, border, and margin affect an element's size.

Copy the complete HTML into a file named `index.html` and open it in a browser. GitHub's Markdown preview shows a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The CSS Box Model</title>
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :root {
      color: #172033;
      background: #f1f5f9;
      font-family: Arial, sans-serif;
      line-height: 1.5;
    }

    body {
      margin: 0;
      padding: 2rem 1rem;
    }

    main {
      width: min(100%, 68rem);
      margin-inline: auto;
    }

    h1,
    h2,
    p {
      margin-top: 0;
    }

    h1 {
      margin-bottom: 0.5rem;
      font-size: 2rem;
      line-height: 1.2;
    }

    .intro {
      max-width: 48rem;
      color: #475569;
    }

    .comparison {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
      margin-block: 2rem;
    }

    .demo {
      min-width: 0;
      padding: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #ffffff;
    }

    .demo h2 {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }

    .demo p {
      color: #475569;
    }

    .stage {
      overflow-x: auto;
      padding: 0.5rem;
      border: 1px dashed #94a3b8;
      background: #f8fafc;
    }

    .box {
      width: 224px;
      margin: 8px;
      padding: 16px;
      border: 4px solid #1d4ed8;
      border-radius: 0.5rem;
      background: #bfdbfe;
    }

    .content-box {
      box-sizing: content-box;
    }

    .border-box {
      box-sizing: border-box;
      outline: 2px solid #7c3aed;
      outline-offset: 3px;
      box-shadow: 0 4px 12px rgb(15 23 42 / 15%);
    }

    .box-content {
      min-height: 5rem;
      padding: 0.75rem;
      border-radius: 0.25rem;
      background: #ffffff;
    }

    .box-content strong {
      display: block;
      margin-bottom: 0.25rem;
    }

    .dimensions {
      margin: 1rem 0 0;
      padding-left: 1.25rem;
    }

    .dimensions li + li {
      margin-top: 0.25rem;
    }

    .note {
      padding: 1rem;
      border-left: 4px solid #0f766e;
      background: #ccfbf1;
    }

    @media (max-width: 42rem) {
      .comparison {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>The CSS Box Model</h1>
    <p class="intro">
      Both boxes declare a width of 224px and use the same padding, border,
      and margin. Only their box-sizing value is different.
    </p>

    <div class="comparison">
      <section class="demo" aria-labelledby="content-box-heading">
        <h2 id="content-box-heading">content-box</h2>
        <p>The declared width describes the content area.</p>

        <div class="stage">
          <div class="box content-box">
            <div class="box-content">
              <strong>Content area</strong>
              Text sits inside the content. The blue area around it is padding.
            </div>
          </div>
        </div>

        <ul class="dimensions">
          <li>Content width: 224px</li>
          <li>Padding: 16px on each side</li>
          <li>Border: 4px on each side</li>
          <li>Border-box width: 264px</li>
          <li>Space including margins: 280px</li>
        </ul>
      </section>

      <section class="demo" aria-labelledby="border-box-heading">
        <h2 id="border-box-heading">border-box</h2>
        <p>The declared width includes content, padding, and border.</p>

        <div class="stage">
          <div class="box border-box">
            <div class="box-content">
              <strong>Content area</strong>
              The content uses the space left inside the declared border-box width.
            </div>
          </div>
        </div>

        <ul class="dimensions">
          <li>Border-box width: 224px</li>
          <li>Padding: 16px on each side</li>
          <li>Border: 4px on each side</li>
          <li>Content width: 184px</li>
          <li>Space including margins: 240px</li>
        </ul>
      </section>
    </div>

    <p class="note">
      The violet outline and shadow on the border-box example are visual effects.
      They do not add to its layout width. Its 8px margins are outside the border box.
    </p>
  </main>
</body>
</html>
~~~

## Expected output

The page has a heading and a short introduction, followed by two comparison panels. Each panel contains a pale stage and a blue box with a white content region.

On a wide screen, the panels appear side by side. On a narrow screen, they stack vertically. The stage can scroll horizontally if the viewport is too narrow for the full content-box sample. The first blue box has a wider border edge because its 224px declared width applies only to the content. The second box's border edge is 224px wide because its declared width includes padding and border.

The violet outline and shadow around the second box do not move other content. The light space between the box and the dashed stage is its margin.

## How the dimensions are calculated

The sample uses fixed pixel values so the arithmetic stays easy to check.

### First box: content-box

~~~text
Content width:              224px
Left and right padding:     16px + 16px = 32px
Left and right borders:    4px + 4px = 8px
Border-box width:           224px + 32px + 8px = 264px
Both margins:               8px + 8px = 16px
Margin-box width:           264px + 16px = 280px
~~~

### Second box: border-box

~~~text
Border-box width:           224px
Left and right padding:     16px + 16px = 32px
Left and right borders:    4px + 4px = 8px
Content width:              224px - 32px - 8px = 184px
Both margins:               8px + 8px = 16px
Margin-box width:           224px + 16px = 240px
~~~

## Why this matters

With `content-box`, adding padding or a border increases the visible border-box size beyond the declared width. With `border-box`, the declared width stays the same while the content area gets smaller to make room for padding and border.

Margins remain outside the border box in both models. Outlines and shadows are painted effects and do not contribute to normal layout size.

The example applies `border-box` to all elements first, then overrides the first sample with `box-sizing: content-box`. This makes the comparison visible without needing a separate stylesheet.

## Try it yourself

1. Change the first box's width from 224px to 260px. Recalculate its border-box and margin-box widths.
2. Change the second box's padding from 16px to 24px. Its border-box width stays 224px while the content area gets narrower.
3. Change the border from 4px to 8px. Recalculate both content widths.
4. Remove the margin from both boxes. Observe which measurements change.
5. Temporarily add a background color to `.stage`. Find the margin between the box and its parent.
6. Remove the outline and shadow from the second box. Check that its layout width and position stay the same.
7. Replace the global reset with the inherited pattern from the lesson and confirm both examples still use their intended box-sizing values.

## Key points

- The content-box sample's 224px width describes only its content.
- The border-box sample's 224px width includes its content, padding, and border.
- Margins are outside both border boxes.
- Outlines and shadows do not add layout width.
- A global border-box rule can simplify sizing, while individual elements can opt into another model.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [15 - CSS Math Functions: calc, min, max, and clamp](15-css-math-functions.md) | [Lesson](../lessons/16-box-model.md) | [Q&A](../qnas/16-box-model.md) | [17 - Width, height, and sizing](17-width-height-and-sizing.md) |
