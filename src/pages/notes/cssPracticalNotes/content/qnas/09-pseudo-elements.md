# 09 - Pseudo-elements: Questions and Answers

Use these questions to review pseudo-elements that style parts of rendered content or browser controls. Each answer follows its question, with explanations where useful.

## Multiple-choice questions

### 1. What does a pseudo-element select?

A. A part of an element or generated presentation / B. A new HTML attribute / C. A JavaScript variable / D. A CSS declaration block

**Answer: A.** Pseudo-elements target parts of rendered content or generated presentation that are not ordinary HTML elements in the document source.

### 2. Which syntax should be used for a pseudo-element in new CSS?

A. `.before` / B. `#before` / C. `::before` / D. `:before` in every case

**Answer: C.** Use the modern double-colon syntax. A few older pseudo-elements accept a single-colon spelling for compatibility, but the double-colon form is preferred.

### 3. Which pseudo-element generates content before an element's original content?

A. `::after` / B. `::before` / C. `::first-line` / D. `::marker`

**Answer: B.** `::before` generates a pseudo-element box before the originating element's content.

### 4. What property is needed to give `::before` or `::after` generated content?

A. `display` / B. `content` / C. `position` / D. `visibility`

**Answer: B.** The `content` property supplies the generated content. Use `content: ""` when you need an empty decorative box.

### 5. Which declaration prevents a `::before` pseudo-element from being generated?

A. `content: none` / B. `content: ""` / C. `display: inline` / D. `opacity: 0`

**Answer: A.** `content: none` prevents the generated pseudo-element. An empty string still creates a box that can be styled.

### 6. Which pseudo-element styles the first formatted line of text?

A. `::first-letter` / B. `::first-line` / C. `::marker` / D. `::selection`

**Answer: B.** `::first-line` targets the line created by the current layout. The words in that line can change when the available width changes.

### 7. Which pseudo-element styles the bullet or number of a list item?

A. `::marker` / B. `::before` / C. `::selection` / D. `::placeholder`

**Answer: A.** `::marker` targets a list item's marker presentation.

### 8. Which pseudo-element targets text currently selected by the user?

A. `::target` / B. `::selection` / C. `::selected` / D. `::highlighted`

**Answer: B.** `::selection` targets the selected text portion.

### 9. Which pseudo-element targets placeholder text inside a form control?

A. `::placeholder` / B. `::input` / C. `::hint` / D. `::label`

**Answer: A.** `::placeholder` styles the placeholder hint. It does not replace the need for a real label.

### 10. Which pseudo-element styles the button portion of a file input?

A. `::button` / B. `::file-selector-button` / C. `::file-button` / D. `::upload`

**Answer: B.** `::file-selector-button` targets the button portion of a file input control.

### 11. Which pseudo-element styles the layer behind a modal dialog shown with `showModal()`?

A. `::background` / B. `::underlay` / C. `::backdrop` / D. `::overlay`

**Answer: C.** `::backdrop` targets the layer behind an element shown in the top layer, including a modal dialog.

## True or false

### 12. Pseudo-elements become ordinary HTML elements in the document source.

**Answer: False.** Pseudo-elements are generated or abstract rendered parts. They are not inserted into the HTML source or ordinary document tree.

### 13. `::before` and `::after` can be used to add a decorative symbol.

**Answer: True.** A short visual cue such as a decorative mark can be generated with `content`.

### 14. Essential instructions should be placed only in a `::before` pseudo-element.

**Answer: False.** Put meaningful information in HTML. Do not rely on generated content as the only way to communicate important text.

### 15. `::first-line` always styles the same words at every viewport width.

**Answer: False.** The first formatted line depends on layout and can contain different words as the line width changes.

### 16. Styling `::marker` creates a semantic list when the HTML has no list elements.

**Answer: False.** Use semantic list markup such as `<ul>` or `<ol>` with `<li>` elements. `::marker` styles a list item's marker presentation.

### 17. Placeholder text is a reliable replacement for a form label.

**Answer: False.** Placeholder text can disappear as the user types. Provide a real label in HTML.

### 18. `::selection` supports every CSS property that can be applied to a regular element.

**Answer: False.** Only a defined subset of properties applies to selected text. Check contrast for the colors you use.

### 19. Generated pseudo-elements affect how `:first-child` counts the originating element's children.

**Answer: False.** Pseudo-elements do not become ordinary children in the document tree, so they do not alter structural selector counts.

### 20. `:before` and `::before` are both accepted by browsers for legacy compatibility.

**Answer: True.** The older single-colon spelling is accepted for `::before`, `::after`, `::first-line`, and `::first-letter`. Write the double-colon form in new CSS.

## Short-answer questions

### 21. What is an originating element?

**Answer:** It is the real element to which a pseudo-element is attached. In `.notice::before`, the element with class `notice` is the originating element.

### 22. What is the difference between `content: ""` and `content: none` for `::before`?

**Answer:** An empty string creates a pseudo-element with no text, which can still have a visible styled box. `none` prevents the pseudo-element from being generated.

### 23. When is generated content a suitable choice?

**Answer:** It is suitable for decoration and short visual cues, such as a divider, icon-like mark, or label that is not essential to understanding. Put meaningful content and controls in HTML.

### 24. Why can `::first-line` style different words on a narrow screen and a wide screen?

**Answer:** It follows the line created by layout. The available width and font metrics affect where the first line ends.

### 25. What does `::part()` do in web components?

**Answer:** It allows styles outside a component's shadow boundary to target a part that the component explicitly exposes. It is a specialized selector for component APIs.

### 26. What does `::slotted()` do?

**Answer:** It allows a component's styles to target elements assigned to a slot in a shadow tree, subject to the selector rules for slotted content.

### 27. Why should a placeholder not be the only label for an input?

**Answer:** A placeholder can disappear when the user enters a value and is not a dependable persistent name for the control. Use an associated HTML label.

## Read the HTML and CSS

Use this markup for Questions 28 to 31:

```html
<p class="notice">Your changes are saved.</p>
<ul>
  <li>Read</li>
  <li>Practice</li>
</ul>
<input placeholder="Search lessons">
```

### 28. What appears before the paragraph's original text with this rule?

```css
.notice::before {
  content: "Note: ";
}
```

**Answer:** The rendered paragraph begins with “Note: ”, followed by “Your changes are saved.” The generated wording is not added to the HTML source.

### 29. Will this rule create a visible pseudo-element box?

```css
.notice::after {
  content: "";
  width: 1rem;
  height: 1rem;
  background-color: seagreen;
}
```

**Answer:** It creates an empty pseudo-element, but it is inline by default. Width and height do not make an ordinary inline box visibly sized. Set an appropriate display value, such as `inline-block`, to create a sized decorative box.

### 30. What does this rule target?

```css
li::marker {
  color: darkorange;
}
```

**Answer:** The bullet or number marker for each list item. It does not style the list item's text as a whole.

### 31. What does this rule target?

```css
input::placeholder {
  color: slategray;
}
```

**Answer:** The placeholder hint “Search lessons” inside the input, while it is being displayed. It does not style the input's value after the user types.

### 32. Does this selector match a real DOM element?

```css
p::first-line {
  font-weight: bold;
}
```

**Answer:** No. It selects the first formatted line pseudo-element associated with each matching paragraph. The pseudo-element is not a real paragraph child in the DOM.

## Fix the code

### 33. The goal is to show a decorative empty circle before `.status`. Fix the rule so its dimensions can take effect.

```css
.status::before {
  width: 0.6rem;
  height: 0.6rem;
  background-color: seagreen;
}
```

**Answer:**

```css
.status::before {
  content: "";
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: seagreen;
}
```

**Explanation:** `content` generates the empty pseudo-element, and `inline-block` allows its width and height to apply.

### 34. Fix the selector to use modern pseudo-element syntax.

```css
p:first-line {
  color: navy;
}
```

**Answer:**

```css
p::first-line {
  color: navy;
}
```

**Explanation:** The single-colon form is a legacy compatibility spelling. Use two colons in new CSS.

### 35. A form uses the placeholder “Email address” but has no label. What should be changed?

**Answer:** Add a real HTML label associated with the input. Keep the placeholder only as an optional hint, and use `::placeholder` only to style that hint.

## Practice questions

### 36. Write a rule that adds the decorative text `New` before an element with class `badge`.

**Answer:**

```css
.badge::before {
  content: "New ";
  font-weight: bold;
}
```

**Explanation:** `::before` generates content before the originating element's original content. Use this for decorative wording, not essential instructions.

### 37. Write a rule that changes the bullet color of list items to purple.

**Answer:**

```css
li::marker {
  color: rebeccapurple;
}
```

### 38. Write a rule that makes selected text white on a dark blue background.

**Answer:**

```css
::selection {
  color: white;
  background-color: #1e3a8a;
}
```

### 39. Write a rule that styles the backdrop of modal dialogs with a translucent dark color.

**Answer:**

```css
dialog::backdrop {
  background-color: rgb(15 23 42 / 55%);
}
```

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [08 - Pseudo-classes](../qnas/08-pseudo-classes.md) | [Lesson](../lessons/09-pseudo-elements.md) | [Example](../examples/09-pseudo-elements.md) | [10 - The cascade and inheritance](10-cascade-and-inheritance.md) |
