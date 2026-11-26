# 46 - Template elements: Questions and Answers

Use these questions to review [Chapter 46 - Template elements](../lessons/46-template-element.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the main purpose of an ordinary `<template>` element?

A. To display hidden content automatically when the page loads

B. To store markup that can be cloned and inserted later

C. To run JavaScript after a user clicks the element

D. To create a form submission target

**Answer: B.** An ordinary template stores inert markup for later use. Code can clone its content, fill it, and insert it into the document.

### 2. Where can code read the content of a template?

A. `template.children`

B. `template.html`

C. `template.content`

D. `template.shadowRoot`

**Answer: C.** The `content` property returns the template's `DocumentFragment`. The template content is not represented by ordinary child nodes of the template element.

### 3. What does `document.importNode(template.content, true)` do?

A. Removes the template from the page

B. Makes a deep copy of the fragment for the current document

C. Converts the fragment into a string

D. Displays the template without copying it

**Answer: B.** The `true` argument requests a deep copy, including nested elements. The template remains available for future copies.

### 4. What happens when a `DocumentFragment` is appended to an element?

A. The fragment becomes a visible wrapper around its children

B. The fragment's children move into the destination

C. The browser clones the fragment automatically each time

D. The destination element is replaced by the fragment

**Answer: B.** A fragment is a temporary container. Appending it moves its children into the destination, while the fragment itself does not become an extra element in the document.

### 5. How should plain text from data usually be added to a cloned template?

A. Set `textContent` on the appropriate element

B. Put the value into an `id` attribute

C. Append it as a new `<script>` element

D. Set `shadowrootmode` on the element

**Answer: A.** `textContent` adds the value as text. It avoids interpreting the value as HTML markup.

### 6. Why should a template fragment be cloned before making several instances?

A. Appending consumes its children, so the original fragment cannot supply the same children again

B. Cloning is required to make the template visible

C. The browser only allows one element inside a template

D. A template can only be used with tables

**Answer: A.** Appending a fragment moves its children. Clone `template.content` for each new instance so each copy has its own nodes.

### 7. What is the relationship between `<template>` and `<slot>`?

A. Both elements execute embedded JavaScript

B. A template stores markup; a slot marks an insertion point in a shadow tree

C. A slot stores markup for later cloning; a template labels form fields

D. They are alternate names for the same feature

**Answer: B.** They can both appear in web component code, but their jobs are different.

### 8. What does `shadowrootmode="open"` on a template directly inside a shadow host declare?

A. A form that opens in a new tab

B. A declarative shadow root that can be accessed through the host's `shadowRoot` property

C. An ordinary template that is rendered immediately

D. A popover that opens automatically

**Answer: B.** Declarative Shadow DOM uses this attribute to ask the HTML parser to create a shadow root. With `open`, JavaScript can access that root through the host.

## True or false

### 1. An ordinary template's contents are displayed as part of the page when the browser first renders it.

**Answer: False.** The contents are inert and are not rendered unless code inserts a copy into the document.

### 2. The `content` property of an ordinary template returns a `DocumentFragment`.

**Answer: True.** The fragment contains the template's stored nodes.

### 3. The browser runs a script inside a template just because it parsed the template element.

**Answer: False.** A script in an ordinary template does not run merely because the template was parsed. Put initialization code in a normal script.

### 4. Appending a fragment moves its child nodes into the destination.

**Answer: True.** The fragment is emptied as its children are inserted. It does not stay as a wrapper element in the document.

### 5. A template can store a fragment containing a table row.

**Answer: True.** A template can hold markup for a row, which code can clone and append to a table body.

### 6. It is safe to repeat the same `id` in every cloned card because each card came from a template.

**Answer: False.** Cloned IDs still exist in the same document and should remain unique. Use classes or queries scoped to each cloned card for repeated content.

### 7. A slot and a template have the same purpose in a web component.

**Answer: False.** A template stores markup for cloning. A slot marks where supplied content can appear in a shadow tree.

### 8. A template with `shadowrootmode` is being used for Declarative Shadow DOM rather than as a regular reusable template.

**Answer: True.** In that context the parser creates a shadow root from the template contents. It is a specialized role distinct from cloning an ordinary template.

## Short-answer questions

### 1. What does inert mean for the contents of an ordinary template?

**Answer:** The contents are parsed and stored, but they are not rendered as page content or activated just because the template exists. They can be cloned and inserted later.

### 2. What kind of object is `template.content`?

**Answer:** It is a `DocumentFragment`, a lightweight container for a group of DOM nodes.

### 3. Why is the second argument to `document.importNode` set to `true` in the chapter examples?

**Answer:** It requests a deep copy. Without a deep copy, nested nodes in the template fragment would not be copied with the fragment.

### 4. Why does a page often clone a template once for each data item?

**Answer:** Each item needs its own set of DOM nodes. Cloning preserves the original template and provides a separate fragment to fill and insert for each item.

### 5. What happens to a fragment's children when the fragment is appended?

**Answer:** Its children move into the destination element. The fragment itself is not added as a visible wrapper node.

### 6. Why is `textContent` a good default for inserting plain data into a cloned template?

**Answer:** It inserts the value as text instead of parsing it as HTML. This is clearer and avoids accidentally treating data as markup.

### 7. Name one reason not to repeat an `id` value in each template instance.

**Answer:** IDs should identify a single element in the document. Repeating them makes references such as labels, fragments, and document queries ambiguous.

### 8. How is Declarative Shadow DOM different from a normal template used for cards?

**Answer:** A normal template is stored so code can clone and insert it later. A template with `shadowrootmode` directly inside a shadow host is used by the parser to declare that host's shadow root.

## Practical questions

### 1. Complete the code so it clones a template, writes a title, and inserts the result into the page.

```html
<template id="notice-template">
  <article><h2></h2></article>
</template>
<div id="notices"></div>
```

```js
const template = document.querySelector("#notice-template");
const notices = document.querySelector("#notices");
const copy = document.importNode(template.content, true);
// Add the title "Welcome" to the cloned heading and append the copy.
```

**Answer:**

```js
copy.querySelector("h2").textContent = "Welcome";
notices.append(copy);
```

The content is cloned first, then the heading is filled and the fragment's children are moved into the destination.

### 2. Create one card for every item in this array. Each card has a heading and paragraph.

```js
const items = [
  { title: "Plan", text: "Write the outline." },
  { title: "Build", text: "Create the page." }
];
```

Assume `#card-template` contains an `<article>` with an empty `<h2>` and `<p>`, and `#cards` is the destination.

**Answer:**

```js
const template = document.querySelector("#card-template");
const cards = document.querySelector("#cards");

for (const item of items) {
  const card = document.importNode(template.content, true);
  card.querySelector("h2").textContent = item.title;
  card.querySelector("p").textContent = item.text;
  cards.append(card);
}
```

Each loop creates an independent copy, fills it with one item's text, and appends it.

### 3. A developer appends `template.content` once for every item in a loop, but only the first item appears. What should change?

**Answer:** Clone the fragment for each item before filling and appending it. Appending a fragment moves its nodes, so the original fragment no longer contains those children for the next iteration.

```js
const copy = document.importNode(template.content, true);
```

### 4. A page needs to add task rows to `<tbody id="tasks"></tbody>`. What should the template contain, and where should each clone be appended?

**Answer:** The template can contain a `<tr>` with a row heading and a data cell. Clone its content, fill the cells, and append the fragment to the `tbody` element.

```html
<template id="task-template">
  <tr><th scope="row"></th><td></td></tr>
</template>
```

```js
const row = document.importNode(taskTemplate.content, true);
row.querySelector("th").textContent = task.name;
row.querySelector("td").textContent = task.status;
tasks.append(row);
```

### 5. A template creates repeated cards, and each card contains `<h2 id="title">`. What is a better way to find each heading after cloning?

**Answer:** Use a class or a query scoped to the cloned fragment instead of repeating an ID.

```html
<h2 class="title"></h2>
```

```js
card.querySelector(".title").textContent = item.title;
```

This avoids duplicate IDs in the document.

### 6. A value from a user profile should become the paragraph text in a cloned template. Which property should be set, and why?

**Answer:** Set the paragraph's `textContent` property. It inserts the value as text rather than interpreting it as HTML.

```js
copy.querySelector("p").textContent = profile.description;
```

### 7. Choose the right element: use a template to create repeated cards later, or use a slot to mark where a component displays supplied content.

**Answer:** Use `<template>` as the source for repeated cards. Use `<slot>` as the placeholder in a shadow tree where supplied content is displayed.

### 8. In the following markup, what does the parser create, and how can script access it?

```html
<article id="profile-card">
  <template shadowrootmode="open">
    <p>Profile details</p>
  </template>
</article>
```

**Answer:** The parser creates a shadow root for the `<article>` and places the paragraph in it. Because the mode is `open`, script can read it with `document.querySelector("#profile-card").shadowRoot`.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [45 - Popover attributes](45-popover-attributes.md) | [Lesson](../lessons/46-template-element.md) | [Example](../examples/46-template-element.md) | [47 - Hidden, inert, tabindex, and editable content](47-visibility-and-interaction-attributes.md) |