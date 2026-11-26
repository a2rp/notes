# 25 - Inline SVG and MathML in HTML

HTML can include vector graphics and mathematical notation directly in a document. SVG describes graphic shapes and drawings. MathML describes the structure of mathematical expressions. Both can sit alongside ordinary HTML content.

## What you will learn

- What SVG and MathML are used for in an HTML page.
- How to add simple inline SVG shapes.
- How the SVG viewBox sets a drawing coordinate system.
- How to label informative SVG graphics for assistive technology.
- How to mark an SVG as decorative.
- How to write simple mathematical expressions with MathML.
- When an SVG file in an img element may be a better choice than inline SVG.

## SVG and MathML in an HTML page

SVG and MathML use their own elements inside an HTML document:

- Use SVG for vector illustrations, diagrams, icons, charts, and other graphics.
- Use MathML for equations and mathematical notation.

They are markup languages, not replacements for HTML page structure. Use HTML for the document, headings, paragraphs, lists, and other content. Add SVG or MathML where a graphic or equation belongs.

An SVG graphic can be written inline, with its markup placed directly in the HTML file, or it can be saved as its own file and referenced by an img element. MathML is written with a math element around each expression.

## Draw a simple graphic with inline SVG

The svg element is the root of an inline SVG graphic. Its child elements describe the shapes to draw. This example draws a blue circle and a green rectangle:

~~~html
<svg viewBox="0 0 120 80" width="240" height="160">
  <circle cx="35" cy="40" r="24" fill="royalblue">
  </circle>
  <rect x="70" y="16" width="36" height="48" fill="seagreen">
  </rect>
</svg>
~~~

The svg element contains both circles and rectangles, along with many other kinds of shapes. A few useful shape elements are:

- circle draws a circle. cx and cy set its center, and r sets its radius.
- rect draws a rectangle. x and y set its upper-left position, and width and height set its size.
- line draws a straight line between two points.
- path describes a shape or line using drawing commands.

SVG names such as circle and rect belong inside the svg element. They are not ordinary HTML elements.

## Understand the viewBox

The viewBox attribute defines a rectangle of SVG drawing coordinates. It has four values:

~~~text
min-x min-y width height
~~~

In viewBox="0 0 120 80", the drawing coordinate system starts at x=0 and y=0, is 120 units wide, and is 80 units tall. The browser maps that coordinate system into the rendered SVG viewport.

The width and height attributes set the SVG viewport size in the page. The viewBox describes the coordinate space used by its shapes. Keeping the viewBox proportional to the viewport helps the drawing scale without rewriting every shape coordinate.

For example, a circle at cx="35" cy="40" with r="24" is placed using the viewBox coordinates. It is not necessarily 35 CSS pixels from the left edge of the page.

## Label an informative SVG

If an SVG communicates information, provide an accessible name. A title element inside the svg can name the graphic. The title is not drawn as part of the graphic. Connect it to the svg with aria-labelledby and give the title an id:

~~~html
<svg
  viewBox="0 0 120 80"
  role="img"
  aria-labelledby="sales-title">
  <title id="sales-title">Sales increased from January to March</title>
  <line x1="16" y1="64" x2="104" y2="16" stroke="royalblue">
  </line>
  <circle cx="16" cy="64" r="4" fill="royalblue">
  </circle>
  <circle cx="60" cy="40" r="4" fill="royalblue">
  </circle>
  <circle cx="104" cy="16" r="4" fill="royalblue">
  </circle>
</svg>
~~~

The role="img" tells assistive technology to treat the graphic as one image. aria-labelledby points to the title that gives it a name. Make the title concise and describe the information the graphic contributes.

For a complex diagram or chart, a short title may not communicate all of its details. Add an explanation in nearby HTML text, or provide a longer description that users can find in the page. Do not make a person rely on seeing the shapes to understand the important information.

### Decorative SVG

If an SVG is only decoration and adds no information, hide it from assistive technology:

~~~html
<svg viewBox="0 0 20 20" aria-hidden="true">
  <circle cx="10" cy="10" r="8" fill="currentColor">
  </circle>
</svg>
~~~

The page should still communicate any information that the decoration might otherwise convey. For example, if an icon appears beside a button label, the visible button text can provide the name.

Inline SVG does not use an alt attribute. If you reference an SVG file with an img element, put the text alternative on img:

~~~html
<img src="images/compass.svg" alt="Compass pointing north">
~~~

Use a useful text alternative for an informative image. If the file is purely decorative, use an empty alt value: alt="".

## Write a mathematical expression with MathML

Wrap each MathML expression in a math element. The child elements describe the parts of the expression and how they relate. This example represents the area of a circle:

~~~html
<p>
  The area of a circle is
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
  </math>.
</p>
~~~

Here, mi marks an identifier such as a variable, mn marks a number, and mo marks an operator. The msup element places its first child in a superscript position relative to its second child. In this example, the expression means A = πr².

A fraction uses mfrac:

~~~html
<math display="block">
  <mfrac>
    <mn>1</mn>
    <mn>2</mn>
  </mfrac>
</math>
~~~

The first child of mfrac is the numerator, and the second child is the denominator. The display="block" value presents this expression as a separate block. Without it, math is inline by default.

Other useful MathML elements include:

- msub for a subscript.
- msup for a superscript.
- msqrt for a square root.
- mfrac for a fraction.
- mrow for grouping expression parts.
- mi for identifiers, mn for numbers, and mo for operators.

MathML is structured markup. For example, a fraction is represented as a numerator and denominator, rather than as characters positioned with spaces. This gives browsers and assistive technologies information about the expression's parts.

## Inline SVG or an SVG file?

Choose inline SVG when the graphic is a small part of the page and it is useful to keep its markup in the HTML document. Inline markup is part of the page's document tree, and can be referenced by its own title and other attributes.

Choose an external SVG file in an img element when you want to reuse a graphic file or keep its source separate from the HTML. The img element also gives you a familiar place to write alt text. A standalone SVG document can also be embedded in other ways, but those are beyond this lesson.

## Common mistakes

- Leaving out the opening svg element or placing SVG shape elements outside it.
- Confusing the viewBox coordinate system with CSS pixel positioning.
- Assuming the SVG title will appear as a visible caption.
- Giving an informative SVG no accessible name or explanation.
- Adding alt directly to an inline svg element.
- Hiding an informative graphic with aria-hidden="true".
- Using MathML elements outside a math element.
- Treating a visual fraction as plain text when its mathematical structure matters.
- Omitting surrounding explanation when an equation is central to the page.

## Try it yourself

1. Create an inline SVG with a viewBox of 0 0 100 100 and draw a circle in its center.
2. Add a rectangle and a line to the same graphic.
3. Change the viewport width and height while keeping the viewBox the same. Observe how the drawing scales.
4. Add a title and connect it to the svg with aria-labelledby.
5. Add an explanation in ordinary HTML text for a chart with several data points.
6. Create an inline MathML expression for x squared.
7. Create a MathML fraction with 3 as its numerator and 4 as its denominator.
8. Explain the difference between inline SVG and an SVG file referenced by img.

## Key points

- SVG describes vector graphics, while MathML describes mathematical expressions.
- Inline SVG is placed inside an svg element. Its child elements describe shapes and drawing content.
- The viewBox establishes the coordinate system used by SVG shapes.
- An informative inline SVG needs an accessible name and, when necessary, a text explanation.
- Inline SVG has no alt attribute. An SVG file shown with img uses the img alt attribute.
- Every MathML expression is wrapped in a math element.
- MathML elements communicate the structure of an expression, such as a fraction or superscript.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [24 - Responsive images: picture, srcset, and sizes](24-responsive-images.md) | [Q&A](../qnas/25-svg-and-mathml.md) | [Example](../examples/25-svg-and-mathml.md) | [26 - HTML tables: rows, columns, and cells](26-html-tables.md) |
