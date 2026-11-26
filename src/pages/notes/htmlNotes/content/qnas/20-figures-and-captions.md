# 20 - Figures and captions: Questions and Answers

Practice questions for [Lesson 20 - Figures and captions](../lessons/20-figures-and-captions.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is the main purpose of the figure element?

- A. To add a border around an image.
- B. To group self-contained content that belongs together as one unit.
- C. To make every image accessible automatically.
- D. To create a two-column layout.

**Answer: B.** A figure groups content such as an image, chart, or code example that forms a self-contained unit in the document.

### 2. Where may a figcaption appear inside its figure?

- A. Only before all other content.
- B. Only after all other content.
- C. As the first or last child.
- D. Anywhere, including between parts of the figure.

**Answer: C.** A figcaption must be the first or last child of its figure.

### 3. Is a figcaption required for every figure?

- A. Yes, every figure must have one.
- B. No, a figure may have no caption.
- C. Only when the figure contains an image.
- D. Only when the figure contains code.

**Answer: B.** A figure can have a caption or no caption.

### 4. How many figcaption elements should one figure contain?

- A. None or one.
- B. Exactly two.
- C. As many as needed.
- D. One for every item inside the figure.

**Answer: A.** A figure can have at most one figcaption.

### 5. Which kind of content can be grouped in a figure?

- A. Images only.
- B. Images and video only.
- C. Images, diagrams, charts, code examples, and other self-contained content.
- D. Only content loaded from another page.

**Answer: C.** A figure is not limited to pictures. It can group different kinds of self-contained flow content.

### 6. What is the purpose of a figcaption?

- A. To provide CSS for the figure.
- B. To caption or describe the contents of its parent figure.
- C. To replace every image's alt text.
- D. To provide the image file path.

**Answer: B.** The caption labels or explains the figure's content for readers.

### 7. How does alt text differ from a figure caption?

- A. They always have identical text.
- B. Alt is the image's text alternative; a caption is visible page content that labels or explains the figure.
- C. Alt is only for charts.
- D. A caption is an HTML attribute.

**Answer: B.** They serve related but different purposes. Write useful image alternatives and captions without unnecessary repetition.

### 8. A pull quote repeats a sentence already in an article and is shown for emphasis. Which element is usually a better choice for the repeated quote?

- A. aside
- B. figcaption
- C. title
- D. label

**Answer: A.** A repeated quote used as a related sidebar or callout may fit in an aside. A figure is for self-contained content treated as a unit.

### 9. What visual style does figure add by itself?

- A. A border and a shadow.
- B. A two-column grid.
- C. No special border or layout; styling can be added separately.
- D. A numbered caption.

**Answer: C.** Figure provides semantic grouping. CSS controls its visual presentation.

### 10. A chart contains detailed values that readers need to understand. What is a useful approach?

- A. Put every value into an extremely long alt value.
- B. Provide a concise alternative, a useful caption, and the important data or explanation as page text.
- C. Remove the chart's alternative text.
- D. Use a caption as the only source of the values.

**Answer: B.** Important information in a complex visual should also be available in text.

## True or false

### 1. A figure can contain code or a chart, not just an image.

**Answer: True.** Figure can group different kinds of self-contained content.

### 2. Every figure must contain a figcaption.

**Answer: False.** The caption is optional.

### 3. A figcaption can be the first or last child of its figure.

**Answer: True.** These are the allowed positions for the figure caption.

### 4. One figure should contain multiple figcaption elements if it has several images.

**Answer: False.** A figure can have at most one figcaption. If separate items need separate captions, consider whether they should be separate figures.

### 5. A figure element automatically adds a visible border around its content.

**Answer: False.** Figure provides semantic grouping, not a special visual design.

### 6. A caption and an image's alt value always have the same purpose.

**Answer: False.** Alt is the image's text alternative; a caption labels or explains the figure for page readers.

### 7. A figcaption can be placed between the image and another child in the figure.

**Answer: False.** Put it before or after the figure's other content.

### 8. Key information from a complex diagram should be available as text as well as in the visual.

**Answer: True.** Text makes the information accessible to people who cannot use or interpret the image.

### 9. A figure without a figcaption is invalid HTML.

**Answer: False.** A caption is optional.

### 10. An image inside a figure may still need an appropriate alt value.

**Answer: True.** Grouping an image in a figure does not automatically provide its text alternative.

## Fill in the blanks

### 1. The element used to group self-contained content is ______.

**Answer: figure.**

### 2. The element used for a figure's caption is ______.

**Answer: figcaption.**

### 3. A figcaption can be the ______ or last child of its figure.

**Answer: first.**

### 4. A figure can contain at most ______ figcaption element.

**Answer: one.**

### 5. Figure is useful when content forms a self-contained ______.

**Answer: unit.**

### 6. A text alternative for an image is commonly provided with the ______ attribute.

**Answer: alt.**

### 7. A repeated pull quote that is related to the article may be grouped in an ______.

**Answer: aside.**

### 8. CSS controls a figure's visual ______.

**Answer: presentation.**

## Short-answer questions

### 1. What makes content a good candidate for a figure?

**Answer:** It is self-contained, belongs together as a unit, and is typically referenced from the surrounding content. An image, chart, diagram, or code example may qualify.

### 2. Is a caption required for a figure? Explain.

**Answer:** No. A figure can have a figcaption or no caption. Add one when a visible label or explanation helps readers understand the figure.

### 3. Where can figcaption appear?

**Answer:** It can be the first or last child of its figure. Do not place it in the middle of the figure's other content.

### 4. Explain the difference between alt text and a caption.

**Answer:** Alt text is a text alternative for an image. A caption is visible content that labels or explains the figure. They may complement one another, so avoid repeating the same information without a reason.

### 5. Can a figure contain a code example? Give a reason.

**Answer:** Yes. A code listing can be a self-contained example that the surrounding text refers to. A figcaption can identify what the example demonstrates.

### 6. Should every image be placed in a figure?

**Answer:** No. Use a regular img when an image is simply part of a sentence or paragraph. Use figure when the content is a distinct unit that benefits from being grouped or captioned.

### 7. What should you do when a chart's important information is too detailed for a short alternative?

**Answer:** Keep the image alternative concise and provide the important values or explanation in nearby page text. A caption can identify the chart or state its main point.

### 8. Does figure provide its own border and spacing?

**Answer:** No. It groups content semantically. Add CSS if the design needs borders, spacing, or a particular layout.

## Practical coding questions

### 1. Mark up a photo as a figure with a useful alternative and a caption.

**Answer:**

~~~html
<figure>
  <img
    src="images/garden.jpg"
    alt="Rows of young vegetables growing in raised garden beds">
  <figcaption>The community garden in early spring.</figcaption>
</figure>
~~~

The alt value describes useful image information. The caption identifies the photo in the context of the page.

### 2. Rewrite this figure so its caption appears before the image:

~~~html
<figure>
  <img src="images/bridge.jpg" alt="A wooden footbridge over a stream">
  <figcaption>The footbridge after the first snowfall.</figcaption>
</figure>
~~~

**Answer:**

~~~html
<figure>
  <figcaption>The footbridge after the first snowfall.</figcaption>
  <img src="images/bridge.jpg" alt="A wooden footbridge over a stream">
</figure>
~~~

Figcaption is allowed as the first or last child.

### 3. Add a caption to a code example that shows a link.

**Answer:**

~~~html
<figure>
  <figcaption>Example 1. A link to the contact page.</figcaption>
  <pre><code>&lt;a href="contact.html"&gt;Contact us&lt;/a&gt;</code></pre>
</figure>
~~~

The figure groups the code listing and its label as one self-contained example.

### 4. This markup puts the caption between two parts of the figure. Fix it.

~~~html
<figure>
  <img src="images/diagram.png" alt="Three steps connected by arrows">
  <figcaption>Three-step process.</figcaption>
  <p>Plan, build, and review.</p>
</figure>
~~~

**Answer:**

~~~html
<figure>
  <img src="images/diagram.png" alt="Three steps connected by arrows">
  <p>Plan, build, and review.</p>
  <figcaption>Three-step process.</figcaption>
</figure>
~~~

The caption is now the last child of the figure.

### 5. Fix this figure, which has two captions.

~~~html
<figure>
  <img src="images/park.jpg" alt="A path through a city park">
  <figcaption>A path through the park.</figcaption>
  <figcaption>Photograph taken in April.</figcaption>
</figure>
~~~

**Answer:**

~~~html
<figure>
  <img src="images/park.jpg" alt="A path through a city park">
  <figcaption>
    A path through the park.
    <small>Photograph taken in April.</small>
  </figcaption>
</figure>
~~~

Combine related caption details into one figcaption. If the second paragraph is not a caption, move it outside the figure as appropriate.

### 6. An icon is part of a sentence and does not need its own caption. Show a suitable markup pattern.

**Answer:**

~~~html
<p>
  Select the
  <img src="images/search.svg" alt="">
  search control to look up a book.
</p>
~~~

The icon is decorative or redundant in this sentence, so it uses an empty alt value. It does not need a separate figure.

### 7. A chart shows weekly visitors. Add a concise image alternative, a caption, and a sentence with the main trend.

**Answer:**

~~~html
<p>Visitor numbers increased each week, from 120 in week one to 260 in week four.</p>

<figure>
  <img
    src="images/weekly-visitors.png"
    alt="Bar chart of visitor numbers across four weeks">
  <figcaption>Weekly library visitors in April.</figcaption>
</figure>
~~~

The paragraph makes the important trend available as text. The alt value identifies the chart, while the caption labels it.

### 8. A quotation repeats a sentence from an article and is shown as a related callout. Mark up the callout.

**Answer:**

~~~html
<aside>
  <blockquote>
    <p>Small changes, repeated daily, can lead to lasting progress.</p>
  </blockquote>
</aside>
~~~

The quote is repeated from the article for emphasis, so aside is a suitable grouping. It is not a separate figure in this context.

## Related lesson

- [Lesson 20 - Figures and captions](../lessons/20-figures-and-captions.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [19 - Images and alternative text](19-images-and-alt-text.md) | [Lesson](../lessons/20-figures-and-captions.md) | [Example](../examples/20-figures-and-captions.md) | [21 - Audio and video](21-audio-and-video.md) |
