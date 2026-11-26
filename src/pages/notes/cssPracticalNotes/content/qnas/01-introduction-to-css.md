# 01 - Introduction to CSS: Questions and Answers

Practice questions for [Lesson 01 - Introduction to CSS](../lessons/01-introduction-to-css.md). Each question is followed by its answer and an explanation or example where useful.

## Multiple-choice questions

### 1. What does CSS stand for?

- A. Computer Style Syntax
- B. Cascading Style Sheets
- C. Creative Screen System
- D. Common Styling Source

**Answer: B. Cascading Style Sheets.** CSS is the stylesheet language commonly used to describe the presentation of HTML documents.

### 2. What is CSS mainly used for on a web page?

- A. Describing the meaning of every piece of content
- B. Storing page information on a server
- C. Controlling presentation and layout
- D. Replacing the browser

**Answer: C. Controlling presentation and layout.** CSS can set colors, typography, spacing, sizing, and layout for document content.

### 3. Which technology primarily describes the structure and meaning of web content?

- A. HTML
- B. CSS
- C. JavaScript
- D. A stylesheet

**Answer: A. HTML.** HTML uses elements to describe content such as headings, paragraphs, links, and forms.

### 4. Which technology is commonly used to add behavior and logic to a web page?

- A. HTML
- B. CSS
- C. JavaScript
- D. A color value

**Answer: C. JavaScript.** JavaScript can respond to events and update a page when behavior beyond the document and browser defaults is needed.

### 5. In this rule, which part is the selector?

```css
p {
  color: navy;
}
```

- A. `p`
- B. `color`
- C. `navy`
- D. The closing brace

**Answer: A. `p`.** The selector identifies which elements the rule can match. Here it matches paragraph elements.

### 6. In `color: navy;`, what is `color`?

- A. A selector
- B. A property
- C. A value
- D. An HTML element

**Answer: B. A property.** The property names the presentation setting. `navy` is the value requested for that setting.

### 7. What happens to a paragraph's meaning if CSS makes its text large and bold?

- A. It automatically becomes a heading
- B. It becomes a link
- C. It remains a paragraph
- D. It stops being HTML

**Answer: C. It remains a paragraph.** CSS changes presentation. Use a heading element in HTML when the content is a heading.

### 8. If an author stylesheet fails to load, what can the browser still use to display the page?

- A. The HTML document and built-in browser styles
- B. Only JavaScript
- C. The CSS file name
- D. Nothing at all

**Answer: A. The HTML document and built-in browser styles.** The page may look different or plainer, but its HTML content is still available to the browser.

### 9. Why is a separate stylesheet often a good choice for reusable styles?

- A. It changes HTML into JavaScript
- B. It keeps presentation in a file that documents can share
- C. It guarantees every color has sufficient contrast
- D. It removes the need for HTML

**Answer: B. It keeps presentation in a file that documents can share.** A separate CSS file is easier to organize and reuse across pages. The HTML must still connect to it.

### 10. Which statement about CSS is correct?

- A. CSS can make a paragraph semantically become a heading
- B. CSS is only used to set text colors
- C. CSS can affect type, spacing, sizing, and layout
- D. CSS is required for HTML content to exist

**Answer: C. CSS can affect type, spacing, sizing, and layout.** Color is one part of presentation. CSS describes many visual and layout choices.

## Objective questions

### True or false

### 11. CSS stands for Cascading Style Sheets.

**Answer: True.** That is the full form of CSS.

### 12. HTML and CSS have exactly the same role in a page.

**Answer: False.** HTML describes structure and meaning. CSS describes presentation and layout.

### 13. CSS can style a link, but the CSS rule does not provide the link's destination.

**Answer: True.** The destination comes from the link's HTML, usually through its `href` attribute. CSS can change how the link looks.

### 14. If CSS is unavailable, all HTML content disappears.

**Answer: False.** The browser can still display the HTML, typically with its built-in styles.

### 15. Making text look like a heading is a replacement for using a heading element.

**Answer: False.** Appearance does not change an element's meaning. Mark a heading with an appropriate HTML heading element, then style it with CSS if needed.

### 16. CSS can control page layout as well as colors.

**Answer: True.** CSS includes properties and layout systems for arranging content, along with properties for colors, type, spacing, and other presentation.

### 17. JavaScript is required for every interaction on every page.

**Answer: False.** Links and many form controls already have browser behavior. JavaScript is used when additional behavior or logic is needed.

## Short-answer questions

### 18. Explain the main roles of HTML, CSS, and JavaScript.

**Answer:** HTML describes content structure and meaning. CSS controls how that content is presented. JavaScript can add behavior and logic.

**Explanation:** These roles can work together in one page, but one technology should not be used as a substitute for another's primary purpose.

### 19. What are three examples of things CSS can control?

**Answer:** Any three of these are correct: text color, background color, font size, spacing, borders, sizing, layout, responsive presentation, or visual states such as focus.

**Explanation:** CSS describes presentation choices. It does not create the underlying content or automatically provide the behavior of a control.

### 20. Why should CSS not be used to turn a paragraph into a heading?

**Answer:** CSS changes appearance, not the role expressed by the HTML. A real heading should use an appropriate heading element.

**Explanation:** Meaningful HTML helps browsers and assistive technologies understand the document. CSS can then style that heading without changing its role.

### 21. What does a browser do with an HTML document and its CSS rules?

**Answer:** It parses the document and stylesheets, determines which rules apply to elements, and uses the resulting styles when it lays out and paints the page.

**Explanation:** A simple way to think about it is that HTML supplies the document structure and CSS describes how matching parts should be presented.

### 22. What is one benefit of keeping reusable CSS in a separate file?

**Answer:** Multiple HTML documents can share the same stylesheet, and presentation rules stay organized separately from the content structure.

**Explanation:** This makes common styles easier to maintain. The HTML documents still need to connect to the stylesheet.

### 23. Name one accessibility concern to keep in mind while styling.

**Answer:** Examples include keeping text readable, providing enough contrast, keeping keyboard focus visible, and not using color as the only way to communicate important information.

**Explanation:** A visual design should not make content or controls difficult to perceive or use.

## Read and explain the CSS

### 24. In the following rule, identify the selector, property, and value.

```css
p {
  color: navy;
}
```

**Answer:** The selector is `p`, the property is `color`, and the value is `navy`.

**Explanation:** The rule asks the browser to use navy text for paragraph elements that match the selector.

### 25. Which paragraph matches this rule?

```html
<p class="intro">First paragraph</p>
<p class="note">Second paragraph</p>
```

```css
.intro {
  color: darkslateblue;
}
```

**Answer:** The first paragraph matches because its class is `intro`.

**Explanation:** A class selector begins with a period and matches elements whose `class` attribute includes that class name. The second paragraph has the class `note`, so it does not match this selector.

### 26. Does this CSS change the paragraph into a heading?

```html
<p class="large-text">A paragraph</p>
```

```css
.large-text {
  font-size: 2rem;
  font-weight: bold;
}
```

**Answer:** No. It remains a paragraph.

**Explanation:** The declarations change the paragraph's size and weight. The `p` element still provides its HTML role.

## Correct the misunderstanding

### 27. A learner says, "CSS is only for colors." What is a more accurate description?

**Answer:** CSS describes many presentation choices, including colors, typography, spacing, sizing, layout, and responsive behavior.

### 28. A learner says, "If I remove CSS, the HTML is deleted." Correct the statement.

**Answer:** Removing or failing to load CSS changes the page's presentation. The HTML content remains and can be shown with the browser's built-in styles.

### 29. A learner makes a paragraph visually large and calls it the page heading. What should they change?

**Answer:** If the content is the page's main heading, mark it with an appropriate HTML heading element. Then use CSS to control its appearance.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
|  | [Lesson](../lessons/01-introduction-to-css.md) | [Example](../examples/01-introduction-to-css.md) | [02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
