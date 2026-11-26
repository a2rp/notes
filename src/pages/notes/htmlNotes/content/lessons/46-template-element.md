# 46 - Template elements

The `<template>` element stores a fragment of HTML that is not displayed when the page first loads. A script can later clone that fragment, fill in its content, and add it to the document. This is useful when a page needs to create repeated cards, list items, table rows, or other structures from data.

## What a template does

Markup inside a normal `<template>` is parsed, but it is kept inert. The browser does not render it as part of the page. Its contents are available through the template element's `content` property, which is a `DocumentFragment`.

```html
<template id="message-template">
  <article class="message">
    <h2></h2>
    <p></p>
  </article>
</template>
```

The template definition does not show an empty article. It is a blueprint stored for later use. The elements inside it are in `template.content`, rather than ordinary child nodes of the `<template>` element.

## Clone, fill, and insert

To display a copy, clone the template content, fill in the copy, then append it to a normal element in the page.

```html
<template id="message-template">
  <article class="message">
    <h2></h2>
    <p></p>
  </article>
</template>

<main id="messages"></main>

<script>
  const template = document.querySelector("#message-template");
  const messages = document.querySelector("#messages");

  const items = [
    { title: "First note", text: "This card was made from a template." },
    { title: "Second note", text: "The same structure can be reused." }
  ];

  for (const item of items) {
    const fragment = document.importNode(template.content, true);
    fragment.querySelector("h2").textContent = item.title;
    fragment.querySelector("p").textContent = item.text;
    messages.append(fragment);
  }
</script>
```

`document.importNode(template.content, true)` makes a deep copy of the fragment for the current document. The second argument, `true`, means that the nested elements are copied too. Setting `textContent` fills the headings and paragraphs as text.

Appending a `DocumentFragment` moves its children into the destination. The fragment itself is not inserted as an extra wrapper element. Each loop iteration uses a fresh clone, so the original template remains available for the next item.

## Why clone the fragment

The content of a template is a fragment that can be consumed when appended. If you append `template.content` directly, its children move out of the template's fragment. A later append will not create another copy. Clone the content each time you need another instance.

When filling a clone, use `textContent` for plain text. Avoid building HTML by concatenating untrusted values into `innerHTML`. If the template includes controls, give them clear labels and preserve the relationships between labels and controls in every copy.

## A template for a table row

Templates can hold any suitable fragment, including a table row. Put the template in a valid location in the document, then clone its row when adding data.

```html
<table>
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Status</th></tr>
  </thead>
  <tbody id="task-list"></tbody>
</table>

<template id="task-row-template">
  <tr>
    <th scope="row"></th>
    <td></td>
  </tr>
</template>

<script>
  const rowTemplate = document.querySelector("#task-row-template");
  const taskList = document.querySelector("#task-list");
  const tasks = [
    { name: "Read the lesson", status: "Complete" },
    { name: "Try the example", status: "Next" }
  ];

  for (const task of tasks) {
    const row = document.importNode(rowTemplate.content, true);
    row.querySelector("th").textContent = task.name;
    row.querySelector("td").textContent = task.status;
    taskList.append(row);
  }
</script>
```

The template supplies the row structure. JavaScript supplies the values and inserts each row into the table body. The row heading uses `scope="row"` to identify the row's label for assistive technology.

## Template elements and scripts

Script elements inside an ordinary template do not run simply because the browser parsed the template. A template is a store of markup, not a way to run a script later. Put the code that creates and fills instances in a normal script in the page or in an external JavaScript file.

## Template and slot are different

| Element | Purpose |
| --- | --- |
| `<template>` | Stores inert markup that code can clone and insert later. |
| `<slot>` | Marks a place in a web component's shadow tree where supplied content can appear. |

A template is a source of markup. A slot is a placeholder used by a component. They can be used together in web components, but they do different jobs.

## Declarative Shadow DOM

The `shadowrootmode` attribute gives a `<template>` a specialized role when it appears as a direct child of a shadow host. The HTML parser uses it to create a shadow root from the template's contents.

```html
<article>
  <template shadowrootmode="open">
    <style>
      p { color: darkgreen; }
    </style>
    <p>This paragraph is inside the article's shadow root.</p>
  </template>
  Light DOM content can go here.
</article>
```

This declarative form is different from an ordinary reusable template with an `id`. Its purpose is to declare a shadow root in HTML. In this example, the `open` mode allows JavaScript to access the root through the host element's `shadowRoot` property. Check browser support for the environments you need to serve.

## Common mistakes

- Expecting template content to appear before it is cloned and inserted.
- Looking for template content among the `<template>` element's regular child nodes instead of using `.content`.
- Appending the same fragment repeatedly without cloning it first.
- Putting initialization code inside a template and expecting it to execute automatically.
- Reusing the same `id` in every clone. An `id` should identify one element in a document; prefer classes or scoped queries when repeated instances are needed.
- Confusing `<template>` with `<slot>`, which serves a separate role in web components.

## Try it yourself

1. Create a template containing an article with a heading and a paragraph.
2. Create a destination element outside the template.
3. Clone the template content twice, set different text with `textContent`, and append both fragments.
4. Inspect the page before and after insertion. Notice that the template definition itself is not displayed.
5. Change the example to create three table rows from an array of objects.

## Key points

- A normal `<template>` stores markup without rendering it on initial page load.
- Its contents are exposed as a `DocumentFragment` through `.content`.
- Clone the fragment for each instance, fill the clone, and append it to the document.
- Scripts inside an ordinary template do not run just because the template was parsed.
- `<template>` stores reusable markup; `<slot>` marks an insertion point in a shadow tree.
- `shadowrootmode` supports a separate declarative Shadow DOM use case.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [45 - Popover attributes](45-popover-attributes.md) | [Q&A](../qnas/46-template-element.md) | [Example](../examples/46-template-element.md) | [47 - Hidden, inert, tabindex, and editable content](47-visibility-and-interaction-attributes.md) |
