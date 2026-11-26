# 05 - Elements, tags, and attributes: Questions and Answers

Practice questions for [Lesson 05 - Elements, tags, and attributes](../lessons/05-elements-tags-and-attributes.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. In `<p>Hello.</p>`, which part is the complete element?

- A. Only `<p>`
- B. Only `Hello.`
- C. `<p>Hello.</p>`
- D. Only `</p>`

**Answer: C.** The element is the complete unit: start tag, content, and end tag.

### 2. What marks an end tag?

- A. A slash before the element name
- B. An equals sign after the element name
- C. A period before the element name
- D. A second attribute

**Answer: A.** An end tag uses a slash after the opening angle bracket, as in `</p>`.

### 3. In `<a href="https://example.com/">Visit Example</a>`, which part is the attribute name?

- A. `a`
- B. `href`
- C. `Visit Example`
- D. `</a>`

**Answer: B.** The anchor is the element name. `href` is an attribute name, and the URL is its value.

### 4. Where should an attribute be written?

- A. Inside the element's start tag
- B. Inside its end tag
- C. After the complete element
- D. Between the angle brackets of the doctype

**Answer: A.** Attributes appear in the start tag, before its closing `>`.

### 5. Which is a clear and valid way to write a class attribute with a value containing a space?

- A. `<p class=page title>Text</p>`
- B. `<p class="page title">Text</p>`
- C. `<p "class"="page title">Text</p>`
- D. `<p class="page title" Text</p>`

**Answer: B.** Put the attribute name before the equals sign and quote the complete value.

### 6. How do you write two different attributes on the same element?

- A. Separate them with spaces
- B. Join them with a comma
- C. Put one in the end tag
- D. Put both after the element

**Answer: A.** Different attributes are written in the start tag and separated by spaces.

### 7. What does the presence of the Boolean attribute `disabled` mean on a button?

- A. The button is enabled
- B. The button is disabled
- C. The browser ignores the button
- D. The button becomes a paragraph

**Answer: B.** A Boolean attribute is on when present and off when absent.

### 8. What happens with `disabled="false"` in HTML?

- A. The button is enabled because the value says false
- B. The button is still disabled because the attribute is present
- C. The browser removes the button
- D. It changes the button's label

**Answer: B.** For a Boolean attribute, its presence sets it on. Remove `disabled` to enable the button.

### 9. Which statement about element meaning and appearance is correct?

- A. A paragraph becomes a heading if it is displayed in a large font
- B. The HTML element describes meaning; CSS can change appearance
- C. Every element has the same meaning
- D. The browser's default color defines an element's purpose

**Answer: B.** Choose an element for the role of its content. Presentation can be changed separately.

### 10. Which element name uses the common lowercase style?

- A. `<P>Text</P>`
- B. `<p>Text</p>`
- C. `<PaRaGrApH>Text</PaRaGrApH>`
- D. `<paragraph>Text</paragraph>`

**Answer: B.** HTML tag names are case-insensitive, but lowercase is the usual and consistent style.

## Objective questions

### True or false

### 1. A start tag, its content, and its end tag together make an element.

**Answer: True.** For example, `<p>Hi.</p>` is a complete paragraph element.

### 2. The word "tag" and the word "element" always mean the same part of the markup.

**Answer: False.** A tag is a start or end marker. An element is the complete structure made from its tags and content.

### 3. The attribute name `href` in a link identifies its destination value.

**Answer: True.** The value after `href=` supplies the link destination.

### 4. Attributes should be placed in an element's end tag.

**Answer: False.** Attributes belong in the start tag.

### 5. Double quotes are a common way to quote an attribute value.

**Answer: True.** Single quotes can also be valid, but using double quotes consistently is a clear convention.

### 6. The order of different attributes in a start tag usually changes their meaning.

**Answer: False.** The order of different attributes usually does not change their meaning.

### 7. A Boolean attribute is off when it is present with the value `false`.

**Answer: False.** Its presence means it is on. To turn it off, omit the attribute.

### 8. HTML element names are case-insensitive.

**Answer: True.** Uppercase can work, but lowercase is the common style used in these notes.

### 9. CSS can change how an element looks without changing which HTML element it is.

**Answer: True.** Presentation and HTML meaning are separate.

### 10. An element can have multiple different attributes in the same start tag.

**Answer: True.** For example, a link can have both `class` and `href` attributes.

## Fill in the blanks

### 1. The part that begins an element is its ________ tag.

**Answer: Start.** A paragraph begins with `<p>`.

### 2. An end tag places a ________ before the element name.

**Answer: Slash.** For example, the paragraph end tag is `</p>`.

### 3. The complete unit made from its tags and content is an ________.

**Answer: Element.** A paragraph element includes its tags and its text.

### 4. Extra information written in a start tag is provided by an ________.

**Answer: Attribute.** An anchor's `href` attribute gives it a destination.

### 5. In `<p class="intro">Hi.</p>`, the attribute value is ________.

**Answer: `intro`.** The name is `class` and the quoted value is `intro`.

### 6. Attribute values should be consistently enclosed in ________.

**Answer: Quotes.** Double quotes are common; single quotes are also valid.

### 7. A Boolean attribute is on when it is ________ and off when it is omitted.

**Answer: Present.** A value such as `false` does not turn a present Boolean attribute off.

### 8. The common style for HTML element names is ________case.

**Answer: Lower.** Use names such as `<p>` and `<h1>` consistently.

## Short-answer questions

### 1. Explain the difference between a tag and an element.

**Answer:** A tag is a marker such as `<p>` or `</p>`. An element is the complete markup unit that includes its tags and content, such as `<p>Hello.</p>`.

### 2. In `<a href="https://example.com/">Visit Example</a>`, identify the element, attribute, value, and content.

**Answer:** The complete anchor markup is the element. `a` is the element name, `href` is the attribute name, `https://example.com/` is the value, and `Visit Example` is the content.

### 3. Why are quotes recommended around attribute values?

**Answer:** Quotes make the boundary of a value clear and prevent mistakes when it contains spaces. Consistent quoting also makes source code easier to read.

### 4. What does it mean that Boolean attributes are controlled by presence?

**Answer:** If the attribute appears in the start tag, it is on. If it is absent, it is off. Writing `disabled="false"` still leaves the button disabled.

### 5. Why should you choose an element for meaning instead of only for its default appearance?

**Answer:** HTML identifies the purpose of the content. CSS can change its visual style, but styling alone does not change the element's meaning.

### 6. Can two different attributes be written in either order?

**Answer:** Usually yes. For example, changing the order of `class` and `href` on a link does not change their meaning. Keep each attribute name unique on that element.

## Practical HTML questions

### 1. Identify the start tag, attribute, content, and end tag.

~~~html
<p class="note">Read this carefully.</p>
~~~

**Answer:** The start tag is `<p class="note">`. Its attribute is `class="note"`. The content is `Read this carefully.`, and the end tag is `</p>`.

### 2. Write a paragraph with the text "Welcome to my notes." and the class value "intro".

**Answer:**

~~~html
<p class="intro">Welcome to my notes.</p>
~~~

**Explanation:** The class attribute belongs in the start tag, and its value is quoted.

### 3. Write a link to `https://example.com/` with the visible text "Visit Example".

**Answer:**

~~~html
<a href="https://example.com/">Visit Example</a>
~~~

**Explanation:** The `href` value gives the destination. The text between the tags is what the reader sees as the link label.

### 4. Write an image element for a file named `flower.jpg` with useful alternative text.

**Answer:**

~~~html
<img src="flower.jpg" alt="A yellow flower in a garden">
~~~

**Explanation:** `src` identifies the image file. `alt` describes the image for cases where it cannot be seen or loaded. Image details are covered in a later lesson.

### 5. Correct the attributes in this example so the paragraph has a class value that includes a space.

~~~html
<p class=page title>My page</p>
~~~

**Answer:**

~~~html
<p class="page title">My page</p>
~~~

**Explanation:** Quotes make the full value clear as one attribute value.

### 6. This button is intended to be available. Correct its Boolean attribute.

~~~html
<button type="button" disabled="false">Continue</button>
~~~

**Answer:**

~~~html
<button type="button">Continue</button>
~~~

**Explanation:** A present `disabled` attribute disables the button, even if its value says `false`. Remove it to make the button available.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [04 - Doctype and browser rendering modes](04-doctype-and-rendering-modes.md) | [Lesson](../lessons/05-elements-tags-and-attributes.md) | [Example](../examples/05-elements-tags-and-attributes.md) | [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) |
