# 19 - Images and alternative text: Questions and Answers

Practice questions for [Lesson 19 - Images and alternative text](../lessons/19-images-and-alt-text.md). Each question is followed by its answer and an explanation or worked example where useful. The right alternative depends on the image's purpose in its page context.

## Multiple-choice questions

### 1. Which attribute provides a text alternative for an img element?

- A. src
- B. alt
- C. title
- D. width

**Answer: B.** Alt provides equivalent text for people who cannot see or load the image.

### 2. What does the src attribute contain?

- A. The image's address.
- B. A caption for the image.
- C. The image's alternative text.
- D. A CSS selector.

**Answer: A.** Src points to the image resource.

### 3. What should a useful alt value for an informative image do?

- A. Describe every visible pixel.
- B. Convey the information the image contributes in its context.
- C. Repeat the file name.
- D. Say only “image”.

**Answer: B.** The alternative should preserve the image's relevant meaning, not narrate unnecessary details.

### 4. What alt value is appropriate for a purely decorative img?

- A. No alt attribute.
- B. alt="decorative"
- C. alt=""
- D. alt="image"

**Answer: C.** An empty alt value allows assistive technology to ignore the decorative image. The attribute should still be present.

### 5. An image is the only content inside a link. What should its alt describe?

- A. The icon's color and shape only.
- B. The link's destination or purpose.
- C. The file extension.
- D. The page's background.

**Answer: B.** The image supplies the link's accessible text, so its alternative should say what following the link does.

### 6. A link contains an icon and visible text that already describes its purpose. What is usually suitable for the redundant icon's alt?

- A. A duplicate of the visible text.
- B. An empty alt value.
- C. The icon file name.
- D. A long visual description.

**Answer: B.** The visible text already provides the link purpose, so an empty alt avoids repeating it.

### 7. What is a good approach for a complex chart?

- A. Put all its values into a very long alt value.
- B. Give it a concise alt and provide the detailed data or explanation as page text.
- C. Omit alt because charts are too complex.
- D. Use only a caption and no text alternative.

**Answer: B.** Use concise alternative text to identify the chart, then provide its important information in normal page content.

### 8. What should alt say when an image contains important text that is not shown elsewhere?

- A. Include the meaningful words from the image.
- B. Give only the image's color.
- C. Repeat the image file name.
- D. Leave alt empty.

**Answer: A.** If the image's text conveys information and is not otherwise available, include that information in its text alternative.

### 9. What is the img element's relationship to closing tags?

- A. It requires a closing img tag.
- B. It is a void element and has no closing tag.
- C. It must always contain a paragraph.
- D. It must be nested in a link.

**Answer: B.** Img is a void element. Write its attributes in the start tag and do not add an end tag.

### 10. Why is title not a replacement for alt?

- A. Title is only valid on links.
- B. Alt provides replacement text, while title is not a reliable equivalent for the image.
- C. Title changes the image source.
- D. Alt is only used for styling.

**Answer: B.** Use alt for the image's text alternative. Title does not serve as a dependable substitute.

## True or false

### 1. Alt text should be chosen based on what the image means in its context.

**Answer: True.** The same image can have different useful alternatives in different contexts.

### 2. A decorative image should usually omit the alt attribute.

**Answer: False.** Use an empty alt value, alt="", so assistive technology can skip it.

### 3. An empty alt value and a missing alt attribute mean exactly the same thing.

**Answer: False.** An empty alt explicitly marks an image as decorative or redundant. A missing alt may leave users with no useful alternative.

### 4. If an image is the only content inside a link, its alt should describe the link purpose.

**Answer: True.** The alt provides the link's text when no other text is present.

### 5. A short alt value can identify a complex chart while the detailed values are provided nearby as text.

**Answer: True.** This gives a concise summary and makes the chart's details available in normal content.

### 6. The image file name is usually the best alt value.

**Answer: False.** File names rarely explain the image's meaning or function to readers.

### 7. Alt text should repeat all nearby prose even when the image adds no new information.

**Answer: False.** If an image only repeats nearby information, an empty alt can avoid duplication.

### 8. A linked image's alt should explain what the icon looks like even when the link's purpose is to go home.

**Answer: False.** Describe the link's purpose, such as “Home”, rather than only the icon's appearance.

### 9. A long data table should generally be placed in page content instead of packed into alt.

**Answer: True.** Keep alt concise and provide detailed information in normal text or a data table.

### 10. The alt attribute is a caption shown as a tooltip.

**Answer: False.** Alt is replacement text for the image, not a caption or advisory tooltip.

## Fill in the blanks

### 1. The ______ attribute gives the browser the address of an image resource.

**Answer: src.** It points to the file to display.

### 2. The ______ attribute provides the image's text alternative.

**Answer: alt.** Its value should communicate the image's meaning or function in context.

### 3. A decorative image uses an ______ alt value.

**Answer: empty.** Write alt="" so the image can be skipped by assistive technology.

### 4. If an image is the only content of a link, its alt should describe the link's ______.

**Answer: purpose.** For example, an icon linking to the home page could use alt="Home".

### 5. For a complex chart, use concise alt and provide detailed values as page ______.

**Answer: text.** A list or data table can present the chart's details.

### 6. An img element is a ______ element and has no closing tag.

**Answer: void.** It does not wrap inner content.

### 7. If an image's meaningful text is not present elsewhere, include it in the text ______.

**Answer: alternative.** This lets people access the information without seeing the image.

### 8. Alternative text should not repeat information that is already provided in nearby ______.

**Answer: prose.** Avoid duplicate announcements when the image adds no new information.

## Short-answer questions

### 1. What is the role of src on an img element?

**Answer:** Src gives the URL or path of the image resource that the browser should load.

### 2. What makes alternative text useful?

**Answer:** It conveys the information or function the image contributes in the current context. It should be concise and avoid details that do not help someone understand the page.

### 3. When should an image use alt=""?

**Answer:** Use an empty alt value when the image is purely decorative or redundant with nearby text and does not add information for the reader.

### 4. How should alt change when an image is the only content in a link?

**Answer:** It should communicate the link's destination or purpose. For example, a home icon that links to the home page can use alt="Home".

### 5. How should a page make a complex chart understandable without relying only on alt?

**Answer:** Give the chart a concise alt value and provide its important data or explanation in normal page text, such as a list or table.

### 6. Why should you avoid using an image's file name as alt?

**Answer:** A file name such as graph-final-2.png usually does not explain what the image communicates or what a linked image does.

### 7. Why is a missing alt attribute not the same as an empty alt attribute?

**Answer:** Empty alt intentionally marks an image as decorative or redundant. A missing alt may leave users without an appropriate text alternative and can expose an unhelpful file name.

### 8. Why should alt not repeat the caption or nearby text word for word?

**Answer:** Alt replaces the image's meaning for people who cannot use it. A caption or adjacent text already provides that information, so repeating it can create unnecessary duplicate announcements.

## Practical and coding questions

### 1. Add an informative image of a blue jay on a branch.

**Answer:**

~~~html
<img src="images/bird.jpg" alt="A blue jay perched on a branch">
~~~

The alternative describes the relevant visual information.

### 2. Add a decorative divider image.

**Answer:**

~~~html
<img src="images/divider.png" alt="">
~~~

The empty alt value lets assistive technology skip an image that adds no content information.

### 3. Make a home icon the only content of a link to the site home page.

**Answer:**

~~~html
<a href="/">
  <img src="images/home-icon.png" alt="Home">
</a>
~~~

The image's alt describes the link destination.

### 4. Add a search icon next to visible “Search” text in the same link.

**Answer:**

~~~html
<a href="/search.html">
  <img src="images/search-icon.png" alt="">
  Search
</a>
~~~

The visible text already describes the link. Empty alt avoids repeating it.

### 5. Add an image that contains the notice “Workshop moved to Room 4”.

**Answer:**

~~~html
<img src="images/workshop-notice.png" alt="Workshop moved to Room 4">
~~~

The words carry important information and are included in the text alternative.

### 6. Add a chart with a concise alternative and its important values in a list.

**Answer:**

~~~html
<img src="images/monthly-visitors.png" alt="Bar chart comparing monthly visitors to three websites">

<ul>
  <li>Site A: 1,200 in January and 1,500 in February.</li>
  <li>Site B: 900 in January and 1,100 in February.</li>
  <li>Site C: 1,400 in January and 1,300 in February.</li>
</ul>
~~~

The alt identifies the chart, and the list exposes the detailed values as text.

### 7. Correct this markup for a decorative flourish: <img src="images/corner-flourish.png">

**Answer:**

~~~html
<img src="images/corner-flourish.png" alt="">
~~~

The image is decorative, so it should have an empty alt value. Do not omit the alt attribute.

### 8. Improve this alt value for a logo used as a link to the home page: alt="blue circle with white house icon"

**Answer:**

~~~html
<a href="/">
  <img src="images/home-icon.png" alt="Home">
</a>
~~~

The icon is functional, so alt describes the link's destination rather than its visual appearance.

## Related lesson

- [Lesson 19 - Images and alternative text](../lessons/19-images-and-alt-text.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [18 - Unordered, ordered, and description lists](18-lists.md) | [Lesson](../lessons/19-images-and-alt-text.md) | [Example](../examples/19-images-and-alt-text.md) | [20 - Figures and captions](20-figures-and-captions.md) |
