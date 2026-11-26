# 11 - Headings and paragraphs: Questions and Answers

Practice questions for [Lesson 11 - Headings and paragraphs](../lessons/11-headings-and-paragraphs.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. What do HTML heading levels mainly communicate?

- A. The color of the text.
- B. The structure of topics and subtopics.
- C. The page's character encoding.
- D. The amount of space above a paragraph.

**Answer: B.** Heading levels communicate the organization of the content. CSS can change their appearance.

### 2. Which heading element has the highest level?

- A. h6
- B. h4
- C. h1
- D. p

**Answer: C.** The heading levels run from h1, the highest, through h6, the lowest.

### 3. Which heading level is a typical subsection under an h2?

- A. h1
- B. h3
- C. h5
- D. p

**Answer: B.** An h3 commonly introduces a subsection within an h2 topic.

### 4. What should determine whether you use h2 or h3?

- A. The default font size you want.
- B. How the topic fits into the content hierarchy.
- C. The number of paragraphs on the page.
- D. Whether the text is bold.

**Answer: B.** Choose the heading level based on the structure of the topics.

### 5. Which element marks a paragraph?

- A. p
- B. h1
- C. head
- D. br

**Answer: A.** The p element represents a paragraph.

### 6. Does a blank line in the HTML source create a new paragraph in the page?

- A. Yes, every blank line creates a p element.
- B. No, use a separate p element.
- C. Yes, but only inside main.
- D. No, a paragraph cannot contain text.

**Answer: B.** The p tags mark the paragraph. A blank source line is only for readability.

### 7. What is a suitable use for the br element?

- A. Creating space between every section.
- B. Marking a meaningful line break within content, such as an address.
- C. Making text into a heading.
- D. Starting a new document.

**Answer: B.** Use br when a line break is part of the content, not as a general spacing tool.

### 8. What should you do instead of putting a list inside a paragraph?

- A. Put the list after the paragraph as a separate element.
- B. Put the list inside the title element.
- C. Replace the list with several br elements.
- D. Turn the paragraph into an h1.

**Answer: A.** A list is a separate block of content. Close the paragraph before starting the list.

### 9. If an h2 topic has a subsection, which heading usually introduces it?

- A. h1
- B. h3
- C. h2
- D. p

**Answer: B.** An h3 usually identifies a subsection under an h2.

### 10. Do heading levels automatically create nested parent and child elements in the HTML tree?

- A. Yes, every h3 becomes a child of the nearest h2.
- B. No, element tags and containers define tree relationships.
- C. Yes, but only if the headings are bold.
- D. No, HTML does not have a document tree.

**Answer: B.** Heading ranks express topic hierarchy. The actual element tree is created by the markup and containers.

## Objective questions

### True or false

### 1. HTML has six heading elements, from h1 to h6.

**Answer: True.** The numbers represent heading levels.

### 2. h1 is the lowest heading level and h6 is the highest.

**Answer: False.** h1 is the highest level and h6 is the lowest.

### 3. Heading level should be selected based on the content hierarchy rather than default text size.

**Answer: True.** CSS can style headings without changing what their levels mean.

### 4. A page usually benefits from one clear h1 describing its main subject.

**Answer: True.** This is a useful practice for giving the page a clear main topic.

### 5. HTML requires every document to have exactly one h1.

**Answer: False.** A clear main h1 is common guidance, but it is not an absolute requirement for every HTML document.

### 6. A separate p element marks a separate paragraph.

**Answer: True.** Use p tags to group paragraphs in the source.

### 7. A blank line in the source automatically creates a new paragraph element.

**Answer: False.** Blank lines help people read the source. The p element marks the paragraph.

### 8. A p element should contain a heading or a list.

**Answer: False.** A paragraph should contain phrasing content. Put headings and lists outside it.

### 9. Repeated br elements are a good general way to create visual spacing.

**Answer: False.** Use separate paragraphs for separate ideas and CSS for visual spacing.

### 10. Heading levels alone make one heading an HTML child of another.

**Answer: False.** The markup's nesting determines parent and child relationships.

## Fill in the blanks

### 1. HTML heading elements range from ________ through ________.

**Answer: h1 through h6.** h1 is the highest heading level and h6 is the lowest.

### 2. The heading element with the highest level is ________.

**Answer: h1.** It commonly identifies the main topic of a page.

### 3. A heading one level below h2 is ________.

**Answer: h3.** It commonly introduces an h2 subsection.

### 4. The ________ element represents a paragraph.

**Answer: p.** Use a separate p element for each paragraph.

### 5. A blank line in source does not replace a ________ element.

**Answer: p.** The tags mark the paragraph.

### 6. The ________ element creates a line break within content.

**Answer: br.** Use it when a line break is meaningful, such as in an address.

### 7. Use CSS to change the visual ________ of a heading without changing its semantic level.

**Answer: Appearance.** Choose the heading level based on structure.

### 8. Heading levels communicate topic ________, while tags and containers define the element tree.

**Answer: Hierarchy.** The heading number does not automatically nest the element.

## Short-answer questions

### 1. What is the difference between an h1 and an h2?

**Answer:** An h1 is the highest heading level and commonly introduces the page's main subject. An h2 introduces a major topic within that page.

### 2. Why should you not choose a heading element only because of its default size?

**Answer:** Its level communicates structure, not a design choice. Use CSS to change appearance while keeping the correct heading level.

### 3. How should heading levels usually progress within a section?

**Answer:** Use an h2 for a major topic, then an h3 for its subsection. Continue to lower levels only when the content has further subsections.

### 4. How do you mark two separate paragraphs?

**Answer:** Put each paragraph in its own p element.

**Explanation:** A blank line in the source does not create a paragraph in the HTML document.

### 5. When is br appropriate?

**Answer:** Use br for a meaningful line break within content, such as the lines of an address or poem. Do not use repeated br elements for general spacing.

### 6. Do heading levels automatically nest elements in the document tree?

**Answer:** No. Heading levels describe the topic hierarchy. Tags and their actual nesting determine the document tree.

## Practical HTML questions

### 1. Write a page heading, two section headings, and one subsection heading in a useful order.

**Answer:**

~~~html
<h1>Houseplant care</h1>
<h2>Watering</h2>
<h3>Check the soil</h3>
<h2>Light</h2>
~~~

**Explanation:** The h3 is a subsection of the watering topic. Light is another major topic at the h2 level.

### 2. Correct this heading sequence so it does not skip a level.

~~~html
<h1>Garden care</h1>
<h2>Watering</h2>
<h4>Check the soil</h4>
~~~

**Answer:**

~~~html
<h1>Garden care</h1>
<h2>Watering</h2>
<h3>Check the soil</h3>
~~~

**Explanation:** The subsection under an h2 should normally be an h3.

### 3. Write two separate paragraphs about sunlight and watering.

**Answer:**

~~~html
<p>Most herbs need a bright place to grow well.</p>
<p>Check the soil before watering the plants.</p>
~~~

**Explanation:** Each p element marks one paragraph.

### 4. Correct this markup so the list is not inside a paragraph.

~~~html
<p>Things to check:
  <ul>
    <li>Sunlight</li>
    <li>Drainage</li>
  </ul>
</p>
~~~

**Answer:**

~~~html
<p>Things to check:</p>
<ul>
  <li>Sunlight</li>
  <li>Drainage</li>
</ul>
~~~

**Explanation:** The paragraph ends before the list begins.

### 5. Write a two-line address using a line break.

**Answer:**

~~~html
<address>
  12 Green Lane<br>
  Hillview
</address>
~~~

**Explanation:** The line break is part of the address formatting. Use separate paragraphs for separate prose ideas.

### 6. The heading needs to look smaller, but it introduces a major topic. What should you change?

**Answer:** Keep the heading level that matches the content hierarchy, and use CSS to adjust its appearance.

**Explanation:** Changing from h2 to h4 only to reduce the font size changes the document's heading structure.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [10 - Metadata: charset, viewport, and description](10-document-metadata.md) | [Lesson](../lessons/11-headings-and-paragraphs.md) | [Example](../examples/11-headings-and-paragraphs.md) | [12 - Text semantics: emphasis, importance, and meaning](12-text-semantics.md) |
