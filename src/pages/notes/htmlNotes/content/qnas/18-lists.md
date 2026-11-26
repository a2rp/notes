# 18 - Unordered, ordered, and description lists: Questions and Answers

Practice questions for [Lesson 18 - Unordered, ordered, and description lists](../lessons/18-lists.md). Each question is followed by its answer and an explanation or worked example where useful. Other examples can also be correct when the list structure matches the content.

## Multiple-choice questions

### 1. When should you use ul?

- A. When the items have a required sequence.
- B. When the items are related but their order does not matter.
- C. When each term needs a definition.
- D. When you want a heading.

**Answer: B.** Ul represents a group of items whose order does not change their meaning.

### 2. When is ol the right choice?

- A. When order is meaningful, such as steps in a process.
- B. When item order does not matter.
- C. When labels are paired with values.
- D. When you want an indented paragraph.

**Answer: A.** Ol represents an intentionally ordered list.

### 3. Which element represents an item in an unordered or ordered list?

- A. dt
- B. dd
- C. li
- D. dl

**Answer: C.** Li marks an item in an ul or ol list.

### 4. Where should a nested list go?

- A. Inside the li item it describes.
- B. After the parent list.
- C. Inside a dt element.
- D. Between the opening and closing tags of an unrelated paragraph.

**Answer: A.** Nesting the child list inside its parent li makes the relationship clear.

### 5. What is dl used for?

- A. A group of terms or names paired with descriptions or values.
- B. A numbered sequence only.
- C. A group of links only.
- D. A list of images.

**Answer: A.** Dl represents name-value groups, including terms and definitions or metadata labels and values.

### 6. Which element contains the term or name in a description list?

- A. li
- B. dt
- C. dd
- D. ol

**Answer: B.** Dt represents a term or name in a description list.

### 7. Which element contains the description or value in a description list?

- A. dd
- B. dt
- C. ul
- D. li

**Answer: A.** Dd represents a description, definition, or value paired with a dt.

### 8. What does the start attribute on ol do?

- A. Changes the first displayed number.
- B. Adds a heading to the list.
- C. Reverses the list.
- D. Changes the list into a description list.

**Answer: A.** Start sets the initial number used by an ordered list.

### 9. What does the reversed attribute on ol do?

- A. Reorders the HTML source automatically.
- B. Counts the list down instead of up.
- C. Hides the list markers.
- D. Reverses the text in each item.

**Answer: B.** Reversed makes an ordered list count down.

### 10. Which is a suitable use for dl?

- A. A series of recipe steps that must be followed in order.
- B. A set of product details with labels such as “Color” and “Price”.
- C. A list of unrelated navigation links.
- D. A paragraph that needs indentation.

**Answer: B.** Description lists can pair metadata names with their values.

## True or false

### 1. Use ul when changing the item order would not change the meaning.

**Answer: True.** Ul is appropriate for related items without a meaningful sequence.

### 2. Use ol for instructions where the order matters.

**Answer: True.** Ol represents a sequence in which changing order would affect meaning.

### 3. The browser can provide the default numbering for an ol list.

**Answer: True.** Put the item text inside li elements and the browser supplies the numbering by default.

### 4. A nested list should be placed outside the parent li.

**Answer: False.** Place it inside the li item it elaborates.

### 5. Dt represents the description in a description list.

**Answer: False.** Dt represents the term or name. Dd represents its description or value.

### 6. A description list can represent metadata labels and values.

**Answer: True.** A term can be a label such as “Author”, and its dd can contain the value.

### 7. A dl is useful only for dictionary definitions.

**Answer: False.** It can represent other name-value relationships, such as metadata and questions paired with answers.

### 8. The start attribute can make an ol begin at a number other than 1.

**Answer: True.** For example, start="4" makes the first item use 4.

### 9. Lists should be chosen only by the marker style you want to see.

**Answer: False.** Choose a list based on the relationship and meaning of its items. CSS can change visual styling.

### 10. Typing numbers into paragraphs is always better than using ol for ordered steps.

**Answer: False.** Use ol when the sequence is meaningful so the order is represented in HTML.

## Fill in the blanks

### 1. Use ______ for a group of related items whose order does not matter.

**Answer: ul.** It represents an unordered list.

### 2. Use ______ when the sequence of items is meaningful.

**Answer: ol.** It represents an ordered list.

### 3. An individual item in an ul or ol uses the ______ element.

**Answer: li.** Each li is an item in its parent list.

### 4. A ______ list pairs terms or names with descriptions or values.

**Answer: description.** A description list uses dl, dt, and dd.

### 5. The ______ element holds a term or name in a description list.

**Answer: dt.** It is paired with one or more descriptions or values.

### 6. The ______ element holds a description, definition, or value.

**Answer: dd.** It is associated with a term or name in a dl.

### 7. The ______ attribute sets the first number of an ordered list.

**Answer: start.** For example, ol start="4" begins its numbering at 4.

### 8. The ______ attribute makes an ordered list count down.

**Answer: reversed.** It changes the direction of the numbering.

## Short-answer questions

### 1. Explain the difference between ul and ol.

**Answer:** Ul is for related items whose order is not meaningful. Ol is for items whose sequence matters, such as steps or a ranking.

### 2. Why should you not type numbers into each ordered list item?

**Answer:** Ol provides numbering based on the list structure. If items are added or moved, the browser can update the numbering without editing the text in each item.

### 3. How should a nested list be structured?

**Answer:** Put the nested ul or ol inside the li item that it explains. This makes the child items part of the correct parent item.

### 4. Explain what dt and dd represent.

**Answer:** Dt contains a term or name. Dd contains the associated description, definition, or value.

### 5. Give two uses for a description list besides dictionary entries.

**Answer:** It can pair metadata labels with values, such as Author and A. Writer, or questions with their answers.

### 6. What does the start attribute do on an ol?

**Answer:** It sets the first number of the ordered list. For example, start="5" makes the first item number 5.

### 7. When should you use reversed on an ordered list?

**Answer:** Use it when the list's meaningful numbering counts down, such as a countdown or ranking presented from last to first.

### 8. Why should you not use a list element just to get indentation?

**Answer:** List elements communicate relationships between items. If content is not actually a list, use suitable content markup and CSS for presentation.

## Practical and coding questions

### 1. Create an unordered list of three topics: headings, paragraphs, and links.

**Answer:**

~~~html
<ul>
  <li>Headings</li>
  <li>Paragraphs</li>
  <li>Links</li>
</ul>
~~~

The order of the topics does not change their meaning, so ul is appropriate.

### 2. Create an ordered list of three steps for checking a web page.

**Answer:**

~~~html
<ol>
  <li>Open the page in a browser.</li>
  <li>Check the text and links.</li>
  <li>Correct any mistakes.</li>
</ol>
~~~

These items should be followed in sequence, so ol is appropriate.

### 3. Add a nested list of topics under “Text elements”.

**Answer:**

~~~html
<ul>
  <li>
    Text elements
    <ul>
      <li>Headings</li>
      <li>Paragraphs</li>
    </ul>
  </li>
  <li>Links</li>
</ul>
~~~

The nested list is inside the Text elements li, so its relationship to the parent item is clear.

### 4. Create a description list with the terms HTML and CSS and a short definition for each.

**Answer:**

~~~html
<dl>
  <dt>HTML</dt>
  <dd>A markup language for structuring web content.</dd>
  <dt>CSS</dt>
  <dd>A style language for presenting web content.</dd>
</dl>
~~~

Dt contains each term, and dd contains its description.

### 5. Make an ordered list of two remaining tasks that starts at number 4.

**Answer:**

~~~html
<ol start="4">
  <li>Review the links.</li>
  <li>Publish the page.</li>
</ol>
~~~

The start attribute sets the first marker to 4, and the next item is numbered 5.

### 6. Create a three-item countdown with an ordered list.

**Answer:**

~~~html
<ol reversed>
  <li>Three</li>
  <li>Two</li>
  <li>One</li>
</ol>
~~~

Reversed makes an ordered list count down.

### 7. Correct this nested list so that the HTML topics belong to the “Text elements” item.

~~~html
<ul>
  <li>Text elements</li>
</ul>
<ul>
  <li>Headings</li>
  <li>Paragraphs</li>
</ul>
~~~

**Answer:**

~~~html
<ul>
  <li>
    Text elements
    <ul>
      <li>Headings</li>
      <li>Paragraphs</li>
    </ul>
  </li>
</ul>
~~~

The nested list belongs inside the parent li, not in a separate list after the parent ul.

### 8. Create a description list for Author, A. Writer, and Published, November 2026.

**Answer:**

~~~html
<dl>
  <dt>Author</dt>
  <dd>A. Writer</dd>
  <dt>Published</dt>
  <dd>November 2026</dd>
</dl>
~~~

Each label is a dt and each corresponding value is a dd.

## Related lesson

- [Lesson 18 - Unordered, ordered, and description lists](../lessons/18-lists.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [17 - Navigation and linking between pages](17-navigation-and-page-links.md) | [Lesson](../lessons/18-lists.md) | [Example](../examples/18-lists.md) | [19 - Images and alternative text](19-images-and-alt-text.md) |
