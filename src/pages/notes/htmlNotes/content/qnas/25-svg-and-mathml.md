# 25 - Inline SVG and MathML: Questions and Answers

Practice questions for [Lesson 25 - Inline SVG and MathML in HTML](../lessons/25-svg-and-mathml.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. Which markup is used to draw vector graphics inline in an HTML document?

- A. The svg element.
- B. The canvas element only.
- C. The math element.
- D. The picture element.

**Answer: A.** The svg element contains SVG shapes and drawing content directly in the document.

### 2. What does the SVG viewBox attribute describe?

- A. The browser window size.
- B. The graphic's coordinate system.
- C. The file size of the SVG.
- D. The image alternative text.

**Answer: B.** The viewBox defines a coordinate rectangle that the browser maps into the SVG viewport.

### 3. In viewBox="0 0 100 50", what do 100 and 50 represent?

- A. The x and y coordinates of the first shape.
- B. The width and height of the viewBox coordinate space.
- C. The width and height in CSS pixels in every layout.
- D. The number of SVG elements.

**Answer: B.** The four viewBox numbers are min-x, min-y, width, and height.

### 4. What is a useful way to give an informative inline SVG an accessible name?

- A. Put alt on the svg element.
- B. Put a title inside svg and reference its id with aria-labelledby.
- C. Add a title attribute to every shape.
- D. Add aria-hidden="true".

**Answer: B.** Inline SVG does not use alt. A title referenced by aria-labelledby can provide a concise accessible name.

### 5. What should you do with an SVG that is purely decorative?

- A. Give it a long title.
- B. Hide it from assistive technology with aria-hidden="true".
- C. Add it to the page twice.
- D. Replace its viewBox with an alt attribute.

**Answer: B.** A decorative SVG adds no information, so it can be hidden from assistive technology. Do not hide graphics that communicate useful information.

### 6. Which element wraps a MathML expression?

- A. expression
- B. mrow
- C. math
- D. mi

**Answer: C.** Each complete MathML expression is enclosed by the math element.

### 7. What does mfrac represent?

- A. A fraction.
- B. A footnote.
- C. A figure caption.
- D. A graphic shape.

**Answer: A.** The first child of mfrac is the numerator, and its second child is the denominator.

### 8. What does msup do?

- A. Places its first child below its second child.
- B. Places its first child in a superscript position relative to its second child.
- C. Joins two MathML expressions.
- D. Hides an expression from assistive technology.

**Answer: B.** For example, msup containing r and 2 represents r squared.

### 9. Which element provides the alternative text when an SVG file is displayed as an image?

- A. The svg element's viewBox attribute.
- B. The img element's alt attribute.
- C. A title element inside the HTML head.
- D. The source element's type attribute.

**Answer: B.** For an SVG file referenced through img, write the text alternative on the img element.

### 10. When is inline SVG especially useful?

- A. When a small graphic belongs directly in the HTML document.
- B. When a paragraph needs a heading.
- C. When a page needs a video transcript.
- D. When you want to replace every HTML element.

**Answer: A.** Inline SVG keeps the graphic markup in the document, where it can be described and referenced as part of the page.

## True or false

### 1. The viewBox coordinate values are always CSS pixels measured from the browser window.

**Answer: False.** They define the SVG drawing coordinate space, which the browser maps into the SVG viewport.

### 2. The text inside an SVG title is drawn visibly inside the graphic.

**Answer: False.** The title is not rendered as part of the graphic. Use visible HTML text if a visible caption or explanation is needed.

### 3. An inline svg element supports an alt attribute in the same way as img.

**Answer: False.** Inline SVG has no alt attribute. Use an accessible name such as a title referenced by aria-labelledby.

### 4. A complex chart may need a nearby text explanation in addition to a short accessible name.

**Answer: True.** A short name can identify a graphic but may not convey its detailed data or conclusions.

### 5. Every MathML expression should be contained in a math element.

**Answer: True.** The math element is the root for a MathML expression.

### 6. In an mfrac element, the denominator comes before the numerator.

**Answer: False.** The numerator is the first child, and the denominator is the second.

### 7. aria-hidden="true" is appropriate for an SVG that communicates important data.

**Answer: False.** Hiding an informative SVG can remove that information from assistive technology. Only hide decoration that adds no information.

### 8. An SVG file referenced with img can use the img element's alt attribute.

**Answer: True.** The alt text belongs on img and should express the image's purpose in the page.

## Short-answer questions

### 1. What is the difference between SVG and MathML?

**Answer:** SVG describes vector graphics, such as diagrams and icons. MathML describes mathematical expressions and their structure, such as fractions, variables, and superscripts.

### 2. What are the four values in an SVG viewBox?

**Answer:** The values are min-x, min-y, width, and height. They define the coordinate rectangle used for drawing the SVG shapes.

### 3. Why might a chart need text outside the SVG?

**Answer:** A short accessible name can identify the chart, but may not explain all of its values or relationships. Nearby text can communicate the chart's main finding or provide a fuller description.

### 4. What is the purpose of aria-labelledby on an SVG?

**Answer:** It points to one or more elements, commonly an SVG title, whose text labels the graphic for assistive technology.

### 5. What do mi, mn, and mo represent in MathML?

**Answer:** mi marks an identifier such as a variable, mn marks a number, and mo marks an operator such as an equals or plus sign.

### 6. How is a fraction represented with mfrac?

**Answer:** Put the numerator first and the denominator second inside mfrac. For example, mfrac with mn 1 followed by mn 2 represents one half.

### 7. When might you use an SVG file in an img element instead of inline SVG?

**Answer:** Use an SVG file in img when you want to reuse the graphic file or keep its source separate from the page markup. The img element also provides a familiar place for alternative text.

### 8. Why is MathML more meaningful than manually spacing characters to look like an equation?

**Answer:** MathML marks the parts and relationships in the expression. A browser or assistive technology can interpret a numerator and denominator as a fraction instead of encountering characters positioned with spaces.

## Practical questions

### 1. Add an accessible name to this informative SVG.

~~~html
<svg viewBox="0 0 20 20">
  <circle cx="10" cy="10" r="8" fill="royalblue">
  </circle>
</svg>
~~~

**Answer:**

~~~html
<svg
  viewBox="0 0 20 20"
  role="img"
  aria-labelledby="circle-title">
  <title id="circle-title">Blue circle</title>
  <circle cx="10" cy="10" r="8" fill="royalblue">
  </circle>
</svg>
~~~

The title provides a name, and aria-labelledby connects that text to the SVG. The role identifies it as a single graphic.

### 2. Mark this decorative icon so assistive technology can ignore it.

~~~html
<svg viewBox="0 0 20 20">
  <circle cx="10" cy="10" r="8" fill="currentColor">
  </circle>
</svg>
~~~

**Answer:**

~~~html
<svg viewBox="0 0 20 20" aria-hidden="true">
  <circle cx="10" cy="10" r="8" fill="currentColor">
  </circle>
</svg>
~~~

Use aria-hidden only when the icon is decorative and its meaning is available elsewhere, such as in a nearby button label.

### 3. Write an SVG image with useful alternative text using img.

**Answer:**

~~~html
<img src="images/compass.svg" alt="Compass pointing north">
~~~

The img element references the SVG file, and its alt value describes the information the image provides.

### 4. Write MathML for x squared.

**Answer:**

~~~html
<math>
  <msup>
    <mi>x</mi>
    <mn>2</mn>
  </msup>
</math>
~~~

The msup element places its first child, x, in superscript position relative to its second child, 2.

### 5. Write MathML for the fraction three quarters.

**Answer:**

~~~html
<math>
  <mfrac>
    <mn>3</mn>
    <mn>4</mn>
  </mfrac>
</math>
~~~

The first mfrac child is the numerator, and the second is the denominator.

### 6. Correct the MathML so it represents one half.

~~~html
<math>
  <mfrac>
    <mn>2</mn>
    <mn>1</mn>
  </mfrac>
</math>
~~~

**Answer:**

~~~html
<math>
  <mfrac>
    <mn>1</mn>
    <mn>2</mn>
  </mfrac>
</math>
~~~

The numerator comes before the denominator.

### 7. Write MathML for the expression a plus b equals c.

**Answer:**

~~~html
<math>
  <mrow>
    <mi>a</mi>
    <mo>+</mo>
    <mi>b</mi>
    <mo>=</mo>
    <mi>c</mi>
  </mrow>
</math>
~~~

The mi elements mark variables, and mo elements mark the plus and equals operators.

### 8. Describe a complex SVG chart for readers who cannot see the graphic.

**Answer:** Give the SVG a concise accessible name, then add nearby HTML text that states the chart's key finding or explains its data. For example:

~~~html
<p>
  The chart shows monthly sales rising from 12 units in January
  to 18 in February and 25 in March.
</p>
<svg
  viewBox="0 0 120 80"
  role="img"
  aria-labelledby="sales-title">
  <title id="sales-title">Sales increased from January to March</title>
  <!-- Chart shapes go here. -->
</svg>
~~~

The text outside the SVG provides the chart's important details. The title gives the graphic a concise name.

## Related lesson

- [Lesson 25 - Inline SVG and MathML in HTML](../lessons/25-svg-and-mathml.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [24 - Responsive images: picture, srcset, and sizes](24-responsive-images.md) | [Lesson](../lessons/25-svg-and-mathml.md) | [Example](../examples/25-svg-and-mathml.md) | [26 - HTML tables: rows, columns, and cells](26-html-tables.md) |
