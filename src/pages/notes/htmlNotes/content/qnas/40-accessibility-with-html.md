# 40 - Accessibility with native HTML: Questions and Answers

Use these questions to review [Chapter 40 - Accessibility with native HTML](../lessons/40-accessibility-with-html.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is a good starting point for accessible HTML?

A. Use generic elements and add ARIA roles to all of them

B. Choose native HTML elements that match the content and behavior

C. Use CSS colors to indicate every relationship

D. Add `tabindex="1"` to all page elements

**Answer: B.** Native elements provide built-in meaning, and many controls provide standard keyboard behavior. ARIA and custom code should not replace a native element that already fits.

### 2. What should the `alt` value be when an image is purely decorative?

A. Omit the `alt` attribute

B. Use the image file name

C. Use an empty value: `alt=""`

D. Repeat the whole paragraph next to the image

**Answer: C.** An empty alternative lets assistive technologies ignore a decorative image. Omitting `alt` can cause a file name or URL to be announced.

### 3. What should the alternative text for an informative image communicate?

A. The image file name

B. The important information the image adds in its context

C. A long list of every visible detail

D. The word "image" followed by the file name

**Answer: B.** Alternative text should convey the image's relevant information or purpose. Keep it concise and avoid information already provided nearby.

### 4. How can a visible label be explicitly associated with an input?

A. Give the label and input the same `name`

B. Match the label's `for` value to the input's `id`

C. Put instructions only in the input's placeholder

D. Add `tabindex="0"` to the label

**Answer: B.** The label's `for` attribute must exactly match the control's `id`. This provides a programmatic association and makes the label clickable.

### 5. Why is placeholder text not a replacement for a form label?

A. A placeholder cannot contain text

B. It may disappear when someone types and does not provide a dependable label

C. It prevents form submission

D. It changes the input's name

**Answer: B.** A visible label stays available while the user enters a value and clearly identifies the control's purpose.

### 6. Which markup identifies a column heading in a data table?

A. `<td scope="col">Date</td>`

B. `<th scope="col">Date</th>`

C. `<caption scope="col">Date</caption>`

D. `<label>Date</label>`

**Answer: B.** Use `<th>` for a header cell and `scope="col"` when it labels a column. Data values belong in `<td>` cells.

### 7. Which element should be used for an action that can be activated by keyboard?

A. `<div class="button">Save</div>`

B. `<button type="button">Save</button>`

C. `<span onclick="save()">Save</span>`

D. `<a href="#">Save</a>`

**Answer: B.** A native button provides the expected button semantics and keyboard behavior. A generic element does not gain those features merely by looking clickable.

### 8. What should determine a heading's level?

A. The font size wanted by the design

B. The heading's place in the content hierarchy

C. Whether the heading is inside a `<div>`

D. The number of words in the heading

**Answer: B.** Heading levels communicate relationships between topics. CSS can change their visual size independently.

### 9. Which attribute on `<html>` identifies the document's primary language?

A. `charset`

B. `language`

C. `lang`

D. `locale`

**Answer: C.** The `lang` attribute identifies the language, for example `<html lang="en">`. Assistive technologies can use it to apply appropriate pronunciation rules.

### 10. Which statement about data tables is correct?

A. Use a table for any page layout with rows and columns

B. Use `<th>` and `<td>` to communicate header and data cell relationships

C. Make headers bold with CSS and leave every cell as `<td>`

D. A caption is required to be an image

**Answer: B.** Structural table markup lets assistive technologies associate cells with their row or column headers. Use tables for data relationships, not visual page layout.

## True or false

### 1. Native HTML elements can provide semantics and built-in behavior to browsers and assistive technologies.

**Answer: True.** A native button, for example, identifies itself as a button and supports standard keyboard activation.

### 2. A decorative image should omit the `alt` attribute entirely.

**Answer: False.** Use `alt=""` for a decorative image. Omitting the attribute can lead assistive technologies to announce a file name or URL.

### 3. Placeholder text is a complete substitute for a visible label.

**Answer: False.** A placeholder may disappear while someone types and does not replace a dependable label associated with the control.

### 4. A data table should identify its header cells with `<th>` elements.

**Answer: True.** Header cells and data cells have different purposes. Marking them up lets software determine their relationships.

### 5. A `<div>` becomes a fully keyboard-operable button if it is styled to look like one.

**Answer: False.** Appearance does not provide button semantics or keyboard behavior. Use a native `<button>` for an action.

### 6. A skip link can help keyboard users bypass repeated navigation.

**Answer: True.** It is a normal link placed early in the document that points to a useful destination, commonly the main content.

### 7. Positive `tabindex` values are a good way to make every page element keyboard accessible.

**Answer: False.** Positive values can create a confusing focus order. Use native focusable elements and a sensible document order.

### 8. Setting `lang="en"` on the root `<html>` element can help assistive technology process spoken content.

**Answer: True.** The language helps speech tools choose pronunciation rules for the document. Mark passages in a different language separately when needed.

## Short-answer questions

### 1. Why should you prefer a native HTML control over a generic element made to look like a control?

**Answer:** Native controls already provide standard semantics and behavior, including keyboard support for common interactions. A custom control requires extra work to reproduce its role, name, focus handling, keyboard behavior, and state.

### 2. How should the `alt` text differ for informative, decorative, and functional images?

**Answer:** Describe the relevant information for an informative image, use `alt=""` for a decorative image, and describe the destination or action for a functional image used in a link or button.

### 3. How do you associate a visible label with a form input?

**Answer:** Give the input a unique `id` and set the label's `for` attribute to the same value:

~~~html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel">
~~~

### 4. Why should placeholder text not be the only instruction for an input?

**Answer:** Placeholder text can disappear after entry and may not provide a stable, visible name for the field. Use a visible `<label>` and place extra format instructions near it when needed.

### 5. What HTML markup helps people understand the structure of a data table?

**Answer:** Use `<caption>` to identify the table's topic, `<th>` for header cells, `<td>` for data cells, and `scope="row"` or `scope="col"` for simple header relationships.

### 6. What does a skip link do, and how is its destination specified?

**Answer:** A skip link lets a user bypass repeated content. Its `href` fragment must match the unique `id` of the destination, for example `href="#main-content"` and `id="main-content"`.

### 7. Why is document source order important?

**Answer:** Some people navigate or hear content in source order. A logical sequence helps them understand the relationships between headings, text, and controls even if CSS changes the visual layout.

### 8. What does the `lang` attribute do?

**Answer:** It identifies the language of the document or a passage. Assistive technologies can use that information to choose pronunciation rules and other language-specific processing.

## Practical questions

### 1. Replace this generic element with a native button for an action.

~~~html
<div class="button" onclick="saveDraft()">Save draft</div>
~~~

**Answer:**

~~~html
<button type="button" onclick="saveDraft()">Save draft</button>
~~~

The button has native button semantics and keyboard behavior. Its action still needs to be implemented by the page.

### 2. Add meaningful text alternatives to these images. The first image provides information, the second is decorative, and the third is a linked home logo.

~~~html
<img src="seedlings.jpg">
<img src="leaf-divider.svg">
<a href="/"><img src="logo.svg"></a>
~~~

**Answer:**

~~~html
<img src="seedlings.jpg" alt="Young tomato seedlings growing in small pots">
<img src="leaf-divider.svg" alt="">
<a href="/">
  <img src="logo.svg" alt="City Garden home">
</a>
~~~

The first description conveys relevant image content. The decorative image has an empty alternative. The linked logo names its destination.

### 3. Associate a visible label with this email input.

~~~html
<input type="email" name="email">
~~~

**Answer:**

~~~html
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
~~~

The `for` and `id` values match exactly. The visible label remains available after the user starts typing.

### 4. Group these radio choices under the question "Preferred contact method".

~~~html
<label><input type="radio" name="contact" value="email"> Email</label>
<label><input type="radio" name="contact" value="phone"> Phone</label>
~~~

**Answer:**

~~~html
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
~~~

The fieldset groups the related controls, and the legend names the group.

### 5. Fix the heading levels so they show a page topic, a section, and a subsection.

~~~html
<h1>Home composting</h1>
<h3>Choose a container</h3>
<h5>Indoor options</h5>
~~~

**Answer:**

~~~html
<h1>Home composting</h1>
<h2>Choose a container</h2>
<h3>Indoor options</h3>
~~~

The heading levels communicate a clear hierarchy. CSS can change their appearance without changing these levels.

### 6. Improve the structure of this data table.

~~~html
<table>
  <tr><td>Day</td><td>Workshop</td></tr>
  <tr><td>Tuesday</td><td>Starting seeds</td></tr>
</table>
~~~

**Answer:**

~~~html
<table>
  <caption>Garden workshop schedule</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Workshop</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Tuesday</th>
      <td>Starting seeds</td>
    </tr>
  </tbody>
</table>
~~~

The caption identifies the topic. Header and data cells are marked distinctly, and the row and column relationships are stated.

### 7. Add a skip link to this page's main content.

~~~html
<main id="main-content">
  <h1>Plant care</h1>
</main>
~~~

**Answer:**

~~~html
<a href="#main-content">Skip to main content</a>

<header>
  <nav>
    <a href="/plants">Plants</a>
    <a href="/guides">Guides</a>
  </nav>
</header>

<main id="main-content">
  <h1>Plant care</h1>
</main>
~~~

The link is placed before the repeated content and its fragment matches the main element's ID.

### 8. Improve the link text so the destination is clear.

~~~html
<p>For advice on pruning, <a href="/pruning">click here</a>.</p>
~~~

**Answer:**

~~~html
<p><a href="/pruning">Read the pruning guide</a> for advice on trimming plants.</p>
~~~

The link text describes its destination and remains understandable when viewed outside the surrounding sentence.

### 9. Add a primary language to this document and mark the French word.

~~~html
<html>
  <body>
    <p>The French word bonjour means hello.</p>
  </body>
</html>
~~~

**Answer:**

~~~html
<html lang="en">
  <body>
    <p>The French word <span lang="fr">bonjour</span> means hello.</p>
  </body>
</html>
~~~

The root language identifies the main document language. A nested `lang` value identifies a passage that uses another language.

### 10. Review a page with a mouse-free keyboard check. What should you verify?

**Answer:** Confirm that links and form controls can be reached in a sensible order, the current focus is visible, links activate their destinations, and buttons and form controls can be operated with their expected keys. Native HTML handles common interactions, but the complete page still needs review.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [39 - Landmarks, headings, and accessible page navigation](39-landmarks-and-page-navigation.md) | [Lesson](../lessons/40-accessibility-with-html.md) | [Example](../examples/40-accessibility-with-html.md) | [41 - ARIA in HTML: when and how to use it](41-aria-in-html.md) |
