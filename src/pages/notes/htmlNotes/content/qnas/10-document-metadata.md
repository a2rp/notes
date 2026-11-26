# 10 - Metadata: charset, viewport, and description: Questions and Answers

Practice questions for [Lesson 10 - Metadata: charset, viewport, and description](../lessons/10-document-metadata.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is metadata?

- A. Information about a document.
- B. A visible page heading.
- C. A type of image.
- D. A CSS layout rule.

**Answer: A.** Metadata describes a document or tells software how to process it.

### 2. Where do metadata elements usually go?

- A. Inside the first paragraph.
- B. In the head.
- C. In the footer.
- D. After the closing html tag.

**Answer: B.** Metadata usually belongs in the document's head.

### 3. Which charset value is used for modern HTML documents?

- A. ascii
- B. utf-8
- C. unicode-all
- D. latin-only

**Answer: B.** Use UTF-8 and save the file using UTF-8 too.

### 4. How many charset declarations should one HTML document have?

- A. None.
- B. One.
- C. One for every paragraph.
- D. As many as possible.

**Answer: B.** Use one character encoding declaration, placed near the beginning of the document.

### 5. Where should the charset declaration appear?

- A. Near the start of the document, within the first 1024 bytes.
- B. Only after the body.
- C. Inside every heading.
- D. It can appear only in an external stylesheet.

**Answer: A.** The declaration should appear early so the browser can decode the document correctly.

### 6. What does width=device-width request in a viewport setting?

- A. Make every image the device's full width.
- B. Use the device's width for the layout viewport.
- C. Disable page zoom.
- D. Set the document encoding.

**Answer: B.** It asks the browser to use the device width as the layout viewport width.

### 7. What does initial-scale=1 set?

- A. The document title.
- B. The initial zoom scale.
- C. The number of columns.
- D. The description text.

**Answer: B.** It sets the page's initial scale when displayed.

### 8. Does viewport metadata by itself make a fixed-width page responsive?

- A. Yes, it rewrites the page layout.
- B. No, the page's content and layout must also adapt.
- C. Yes, if the page has a title.
- D. No, viewport metadata is only for desktop computers.

**Answer: B.** Viewport settings help establish the layout width, but they do not make fixed-width content adapt by themselves.

### 9. Which meta element provides a page description?

- A. A meta element with name="description" and a content value.
- B. A meta element with name="heading".
- C. The title attribute on the body.
- D. A paragraph inside the head.

**Answer: A.** The name identifies the metadata kind, and content supplies the description text.

### 10. Is a search service required to show the exact description text in every result?

- A. Yes.
- B. No, it may choose other text.
- C. Yes, when the page has an h1.
- D. No, because descriptions cannot be used in results.

**Answer: B.** A service may use the description, but it can select other text for a result.

## Objective questions

### True or false

### 1. Metadata is information about a document rather than its main reader-facing content.

**Answer: True.** Metadata describes the page or helps software process it.

### 2. A meta element usually belongs in the head.

**Answer: True.** Put document metadata in the head.

### 3. The charset declaration changes the saved file's encoding automatically.

**Answer: False.** The file itself must be saved as UTF-8. The declaration does not convert it.

### 4. One document should contain multiple charset declarations so browsers can choose one.

**Answer: False.** Use one charset declaration.

### 5. The charset declaration should be placed early in the document.

**Answer: True.** The standard requires it within the first 1024 bytes so the browser can determine encoding early.

### 6. The common viewport setting includes width=device-width and initial-scale=1.

**Answer: True.** It is a widely used starting point for pages intended to adapt to mobile screens.

### 7. Viewport metadata alone can fix a page designed with a fixed width.

**Answer: False.** The page layout and content also need to fit different available widths.

### 8. The description meta element is displayed as a paragraph in the page.

**Answer: False.** It stores metadata in attributes. Add visible text in the body when readers need to see it.

### 9. A search service may choose other text instead of a page's description.

**Answer: True.** The description may be used, but the displayed snippet is not guaranteed to match it.

### 10. Preventing users from zooming is a good default viewport practice.

**Answer: False.** Users should be able to zoom when they need to.

## Fill in the blanks

### 1. The element commonly used to provide HTML metadata is called ________.

**Answer: meta.** It is a void element and has no closing tag.

### 2. The character encoding commonly declared for HTML documents is ________.

**Answer: UTF-8.** Save the file in UTF-8 as well.

### 3. The charset declaration should appear within the first ________ bytes of the document.

**Answer: 1024.** Put it near the start of the head.

### 4. The viewport setting width=device-width uses the device width for the layout ________.

**Answer: Viewport.** This helps the browser lay out the page for the available screen width.

### 5. The viewport setting initial-scale=1 establishes the initial ________.

**Answer: Scale.** It sets the starting zoom scale.

### 6. In a description meta element, the name attribute identifies the metadata type and the ________ attribute provides its value.

**Answer: content.** The content attribute carries the description text.

### 7. A description meta element uses the metadata name ________.

**Answer: description.** Its content value should summarize the page accurately.

### 8. Reader-facing paragraphs belong in the ________, not inside a meta element.

**Answer: Body.** Metadata describes the page; the body contains its visible content.

## Short-answer questions

### 1. What does a character encoding declaration do?

**Answer:** It tells software which character encoding to use when decoding the document's bytes into text.

**Explanation:** The document should be saved using the encoding it declares. For HTML, use UTF-8.

### 2. Why should the charset declaration appear near the beginning of the document?

**Answer:** The browser needs to know how to decode the document before it processes much text. The declaration must be within the first 1024 bytes.

### 3. Explain what the common viewport setting does.

**Answer:** width=device-width asks the browser to use the device width for the layout viewport. initial-scale=1 sets the initial zoom scale.

### 4. Why does viewport metadata not make every page responsive?

**Answer:** It sets a useful viewport width and starting scale, but fixed-width elements can still overflow. The page's layout and content need to adapt too.

### 5. What is the purpose of the description meta element?

**Answer:** It supplies a short summary of the page for software that processes document metadata. Search services may use it in results, but they may choose other text.

### 6. Why should a description be accurate and specific?

**Answer:** It should reflect the page so software and people get a useful summary. A generic or unrelated description can misrepresent the page.

## Practical HTML questions

### 1. Add a UTF-8 declaration to the head of an HTML document.

**Answer:**

~~~html
<head>
  <meta charset="utf-8">
  <title>Garden journal</title>
</head>
~~~

**Explanation:** Place the declaration early and save the actual file using UTF-8.

### 2. Add the common viewport setting for a mobile-friendly page.

**Answer:**

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

**Explanation:** The setting describes the layout viewport width and initial scale. The page layout still needs to adapt to that width.

### 3. Write a description meta element for a page about container gardening.

**Answer:**

~~~html
<meta name="description" content="Practical tips for growing vegetables in containers on a balcony or patio.">
~~~

**Explanation:** The content value summarizes the page. It is metadata, not visible page text.

### 4. Complete a head with UTF-8, a viewport setting, a description, and a title for a basil-growing page.

**Answer:**

~~~html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A beginner's guide to growing basil indoors.">
  <title>Growing basil indoors | Garden journal</title>
</head>
~~~

**Explanation:** Each meta element describes a different aspect of the document. The title names the page.

### 5. A page declares UTF-8 but was saved using another encoding. What should you fix?

**Answer:** Save the file itself as UTF-8 so its actual encoding matches the declaration.

**Explanation:** The meta declaration does not convert the stored bytes.

### 6. A page is too wide on a phone even though it has the viewport setting. Name one other thing to inspect.

**Answer:** Check for fixed-width elements or layouts that do not adapt to narrow screens.

**Explanation:** Viewport metadata does not automatically resize every element. The page's layout also needs to respond to the available width.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [09 - The head element and page title](09-head-and-title.md) | [Lesson](../lessons/10-document-metadata.md) | [Example](../examples/10-document-metadata.md) | [11 - Headings and paragraphs](11-headings-and-paragraphs.md) |
