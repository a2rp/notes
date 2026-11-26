# 09 - The head element and page title: Questions and Answers

Practice questions for [Lesson 09 - The head element and page title](../lessons/09-head-and-title.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What is the main purpose of the head element?

- A. To contain the page's visible article text.
- B. To contain document metadata and resource information.
- C. To contain every heading in the page.
- D. To display a browser toolbar.

**Answer: B.** The head contains information about the document. Visible page content belongs in the body.

### 2. Where does the document title element belong?

- A. Inside the body.
- B. Inside the head.
- C. Inside the first paragraph.
- D. After the closing html tag.

**Answer: B.** Put the document's title element inside the head.

### 3. Where is a document title commonly shown by a browser?

- A. In the browser tab.
- B. As the page's first paragraph.
- C. In place of the body.
- D. As a form button.

**Answer: A.** Browsers commonly use the document title in the tab. It can also appear in bookmarks and history.

### 4. Which element provides the main visible heading in page content?

- A. title
- B. head
- C. h1
- D. meta

**Answer: C.** Use an h1 in the body for the main visible page heading. The title names the document outside the content.

### 5. What is the difference between the title element and the title attribute?

- A. They are two spellings for the same thing.
- B. The element names the document; the attribute provides advisory information for one element.
- C. The attribute must always be placed in the head.
- D. The element creates a tooltip.

**Answer: B.** The title element belongs in the head. The title attribute can provide advisory information on an individual element.

### 6. How many title elements should a normal HTML document have?

- A. None.
- B. One.
- C. One for every heading.
- D. At least two.

**Answer: B.** A normal HTML document should have one document title.

### 7. What kind of content belongs inside the title element?

- A. Text naming the document.
- B. An h1 and an image.
- C. All page paragraphs.
- D. A navigation menu.

**Answer: A.** The title element contains text. It is not a container for visible page elements.

### 8. Where should a paragraph intended for the reader appear?

- A. In the head.
- B. In the body.
- C. Inside the title.
- D. In the doctype.

**Answer: B.** The body contains the document's page content.

### 9. Which document title is more useful in a list of browser tabs?

- A. Page
- B. Home
- C. Growing basil indoors | Garden journal
- D. An empty title

**Answer: C.** A specific title identifies the page subject and can include the site name for context.

### 10. Does a search service always have to show the exact title text as its result heading?

- A. Yes, it cannot change the wording.
- B. No, it may choose other text.
- C. Yes, if the page has an h1.
- D. No, because a title is never used in search results.

**Answer: B.** Search services may use the document title, but they can choose other text when describing a result.

## Objective questions

### True or false

### 1. The head element contains document metadata and resource information.

**Answer: True.** It provides information about the document rather than the main visible content.

### 2. The body element contains page content presented to readers.

**Answer: True.** Headings, paragraphs, and other visible content belong in the body.

### 3. The document's title element should be placed in the body.

**Answer: False.** Place it inside the head.

### 4. The title element and a visible h1 have the same job.

**Answer: False.** The title names the document outside the page content. The h1 is a visible heading in the content.

### 5. A useful document title should identify its page even when seen out of context.

**Answer: True.** This helps people recognize it in tabs, bookmarks, or browsing history.

### 6. A page's document title and visible h1 must use exactly the same words.

**Answer: False.** They may be related, but each serves a different purpose and can use different wording.

### 7. A normal HTML document should usually have one title element.

**Answer: True.** Do not add a separate document title for every heading.

### 8. The title attribute on a paragraph is the same as the title element in the head.

**Answer: False.** One is an attribute on an individual element; the other names the document.

### 9. Browsers may repair incomplete markup, so explicitly writing the document structure is still useful.

**Answer: True.** Explicit head and body elements make the source clearer and more predictable.

### 10. A meta element commonly appears in the head.

**Answer: True.** Metadata belongs in the head. The next lesson covers common meta elements in detail.

## Fill in the blanks

### 1. The ________ element contains document metadata and resource information.

**Answer: head.** It is a child of the html element.

### 2. The ________ element contains page content presented to readers.

**Answer: body.** Headings and paragraphs belong here.

### 3. The document's ________ element belongs inside the head.

**Answer: title.** It names the document.

### 4. The ________ element is commonly used for the main visible page heading.

**Answer: h1.** Put it in the body where it introduces the page content.

### 5. A normal HTML document should usually have ________ document title.

**Answer: One.** A page should have one title element.

### 6. A title should identify its page even when seen out of ________.

**Answer: Context.** Examples include a browser tab, bookmark, or history list.

### 7. The title element contains document-title ________, not visible HTML child elements.

**Answer: Text.** Do not put an h1, image, or other element inside it.

### 8. The title element is different from the title ________.

**Answer: Attribute.** The attribute provides advisory information for an individual element.

## Short-answer questions

### 1. What is the purpose of the head element?

**Answer:** It contains metadata and information about the document, along with references to resources. It is not where the main visible page content goes.

### 2. What is the purpose of the title element?

**Answer:** It names the document. Browsers commonly show it in a tab, and it may also appear in bookmarks or browsing history.

### 3. How are the title element and the h1 element different?

**Answer:** The title element names the document outside the page content. The h1 is the main visible heading in the body.

### 4. What makes a document title useful?

**Answer:** It clearly identifies the page subject, stays concise, and makes sense when viewed away from the page, such as in a tab or bookmark.

### 5. Does a page title have to match its visible h1 exactly?

**Answer:** No. They can describe the same topic with different wording. The title should work out of context, while the h1 should introduce the visible content.

### 6. What is the difference between the title element and the title attribute?

**Answer:** The title element names the whole document and belongs in the head. The title attribute belongs to an individual element and can provide advisory information.

## Practical HTML questions

### 1. Write the smallest useful head for a page called “Garden journal”.

**Answer:**

~~~html
<head>
  <title>Garden journal</title>
</head>
~~~

**Explanation:** The title element is inside the head and contains text naming the document.

### 2. Write a useful document title for a page about growing tomatoes in containers on a site called “Garden journal”.

**Answer:**

~~~html
<title>Growing tomatoes in containers | Garden journal</title>
~~~

**Explanation:** The title identifies the specific subject and includes the site name for context.

### 3. Add a visible main heading and paragraph to a document. Put them in the correct part of the document.

**Answer:**

~~~html
<body>
  <h1>Growing tomatoes in containers</h1>
  <p>Choose a sunny spot and a container with drainage.</p>
</body>
~~~

**Explanation:** Reader-facing content belongs in the body.

### 4. Complete this skeleton with a document title and visible heading.

**Answer:**

~~~html
<!doctype html>
<html lang="en">
  <head>
    <title>Herb garden basics | Garden journal</title>
  </head>
  <body>
    <h1>Herb garden basics</h1>
  </body>
</html>
~~~

**Explanation:** The document title is in the head. The visible heading is in the body.

### 5. A document has the title “Home” and the visible heading “Growing basil indoors”. Improve the document title while keeping the heading.

**Answer:**

~~~html
<title>Growing basil indoors | Garden journal</title>
~~~

**Explanation:** The updated title clearly identifies the page in a browser tab or bookmark. The visible heading can remain as written.

### 6. A paragraph has a title attribute with the value “More details”, but the document has no title element. Add the document title for a page called “Plant care basics”.

**Answer:**

~~~html
<head>
  <title>Plant care basics</title>
</head>
~~~

**Explanation:** The attribute on the paragraph does not name the document. Add a title element inside the head.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [08 - Comments, character references, and special characters](08-comments-and-character-references.md) | [Lesson](../lessons/09-head-and-title.md) | [Example](../examples/09-head-and-title.md) | [10 - Metadata: charset, viewport, and description](10-document-metadata.md) |
