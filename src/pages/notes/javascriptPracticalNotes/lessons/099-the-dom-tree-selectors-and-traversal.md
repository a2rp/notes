# 99 - The DOM tree, selectors, and traversal

The Document Object Model (DOM) represents a parsed page as a tree of objects. JavaScript can select elements in that tree, inspect their relationships, and move through related nodes. Understanding the tree helps explain why whitespace can appear in childNodes, why querySelectorAll() does not return an array, and why a selector may not find the element you expected.

This chapter covers the ordinary document tree. Shadow DOM creates separate trees with their own boundaries, which are introduced here only where they affect selection and traversal.

## Learning goals

By the end of this chapter, you should be able to:

- Describe a DOM tree and distinguish elements, text nodes, comments, and attributes.
- Compare parent, child, descendant, and sibling relationships.
- Choose between childNodes and children.
- Find elements with getElementById(), querySelector(), and querySelectorAll().
- Use matches() and closest() when starting from an element you already have.
- Traverse ancestors, children, and siblings with node or element properties.
- Use NodeIterator or TreeWalker for node-by-node traversal.
- Account for live collections, static query results, and tree boundaries.

## The DOM is a tree

HTML source is parsed into a document tree. Elements can contain other elements and text. Comments can also appear as nodes. Whitespace between tags is represented by text nodes, so the tree is more detailed than a diagram that shows only element names.

Given this markup:

```html
<main id="content">
    <h1>DOM basics</h1>
    <!-- A note for maintainers -->
    <p class="intro">Select the elements you need.</p>
</main>
```

The relevant tree is conceptually:

```text
main#content
├── text node (whitespace)
├── h1
│   └── text node: "DOM basics"
├── text node (whitespace)
├── comment node
├── text node (whitespace)
├── p.intro
│   └── text node: "Select the elements you need."
└── text node (whitespace)
```

The Document is the root of the page tree. The html element is its document element. The head and body elements are descendants of html. An element's text content is represented by Text nodes in the tree.

Attributes such as id and class describe an element, but are not child nodes of that element. Use element.id, element.className, getAttribute(), or related attribute APIs to read them.

The browser may normalize or repair source while parsing it. The tree you inspect is the parsed DOM, not necessarily a character-for-character copy of the source. For example, HTML parsing can insert elements required by the parsing rules.

## Parent, child, descendant, and sibling

These relationship names describe position in the tree:

- A **parent** is the node immediately above another node.
- A **child** is a node directly below its parent.
- An **ancestor** is any parent, grandparent, or higher node on the path toward the root.
- A **descendant** is any child, grandchild, or lower node.
- **Siblings** share the same parent.

For a paragraph inside a section inside main, main is an ancestor of the paragraph, but it is not the paragraph's parent. The section is the direct parent.

Nodes can have node types other than Element. This matters when using generic Node relationships such as parentNode, firstChild, and nextSibling. The Element-specific alternatives such as parentElement, firstElementChild, and nextElementSibling skip non-element nodes.

```js
const paragraph = document.querySelector(".intro");

console.log(paragraph.parentElement);       // The direct element parent
console.log(paragraph.parentNode);          // The direct parent node
console.log(paragraph.parentElement.parentElement); // A higher element ancestor
console.log(paragraph.previousElementSibling); // Previous element sibling, or null
```

Check for null when a relationship may not exist. The root has no parent, and the first or last sibling has no previous or next sibling.

## childNodes and children

childNodes contains every child node, including whitespace text nodes and comments. It returns a live NodeList: its contents reflect changes to the tree.

children contains only child elements. It returns a live HTMLCollection.

```js
const main = document.querySelector("main");

console.log(main.childNodes.length); // May include whitespace and comments
console.log(main.children.length);   // Element children only
console.log(main.firstChild);        // Could be a whitespace Text node
console.log(main.firstElementChild); // First child Element, or null
```

A live collection changes as the DOM changes. If code removes or inserts elements while iterating over a live collection, the indexes may shift. When a stable set is needed, copy it first:

```js
const items = Array.from(document.querySelectorAll(".item"));

for (const item of items) {
    console.log(item.textContent);
}
```

querySelectorAll() returns a static NodeList. The list does not gain or lose entries when the DOM later changes, though the Element objects already in the list are still the same objects and can themselves be changed or removed.

## Find an element by id

document.getElementById() finds the element with a given id in that document:

```js
const heading = document.getElementById("page-title");

if (heading !== null) {
    console.log(heading.textContent);
}
```

The id value should be unique within the document. If no matching element exists, getElementById() returns null. This method is available on Document, not on every Element.

## Select elements with CSS selectors

querySelector() returns the first matching descendant Element, or null when nothing matches. querySelectorAll() returns all matching descendant Elements in document order as a static NodeList.

```js
const firstOpenTask = document.querySelector(".task[data-state='open']");
const openTasks = document.querySelectorAll(".task[data-state='open']");

console.log(firstOpenTask);
console.log(openTasks.length);

openTasks.forEach((task) => {
    console.log(task.textContent);
});
```

These methods accept CSS selector syntax, including:

```js
document.querySelector("#page-title");              // id
document.querySelector(".notice");                  // class
document.querySelector("button[disabled]");         // attribute presence
document.querySelector("nav a.current");            // descendant relationship
document.querySelector("ul > li:first-child");       // direct child and pseudo-class
```

An invalid selector string throws a SyntaxError DOMException. If a selector is built from user-provided or otherwise dynamic text, do not assume that text is valid selector syntax. Prefer a purpose-built lookup such as getElementById() when possible, or escape dynamic selector pieces with CSS.escape().

Calling querySelector() on an Element searches its descendants. It does not test the element itself. Use matches() to test that element:

```js
const panel = document.querySelector("#settings");

if (panel && panel.matches(".panel[data-state='open']")) {
    console.log("The settings panel is open");
}
```

If you need to include an element's direct children in a scoped selector, use :scope:

```js
const directLinks = panel?.querySelectorAll(":scope > a");
```

## Start from an element with matches() or closest()

matches() returns whether the element itself matches a selector. closest() checks the element first, then its parent elements in order, and returns the first match or null.

These methods are useful for event delegation, where a listener is attached to a containing element and the code identifies which nested element was activated:

```js
const list = document.querySelector("#task-list");

list?.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const button = event.target.closest("button[data-action='remove']");

    if (button && list.contains(button)) {
        console.log("Remove button in this list was clicked");
    }
});
```

The containment check ensures the closest matching button belongs to this list. Without it, closest() could find a matching ancestor outside the intended container.

closest() starts at the element itself. It is not limited to ancestors strictly above it. As with querySelector(), invalid selector syntax throws a SyntaxError DOMException.

## Traverse the tree

For predictable element navigation, prefer element-only relationships:

```js
const list = document.querySelector("#task-list");

if (list) {
    const firstItem = list.firstElementChild;
    const lastItem = list.lastElementChild;

    console.log(list.children.length);
    console.log(firstItem?.nextElementSibling);
    console.log(lastItem?.previousElementSibling);
}
```

For general node traversal, use properties such as childNodes, firstChild, nextSibling, and parentNode. These include text and comment nodes. For element-only traversal, use children, firstElementChild, nextElementSibling, and parentElement.

A selector is often clearer than manually walking several levels. Traversal is useful when the relationship itself matters, such as moving to the next element in a list or walking up to a containing section.

DOM tree order does not necessarily match visual layout. CSS can reorder or reposition elements without changing their DOM relationships. For semantic order, keyboard navigation, and assistive technology, keep the source tree meaningful instead of relying on visual styling to imply structure.

## NodeIterator and TreeWalker

When code needs to inspect many node types or apply a filter during traversal, Document.createNodeIterator() or Document.createTreeWalker() can be useful.

This example visits text nodes under an article and collects the ones that contain a search term:

```js
const article = document.querySelector("article");
const matches = [];

if (article) {
    const walker = document.createTreeWalker(
        article,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                return node.textContent.includes("DOM")
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        }
    );

    while (walker.nextNode()) {
        matches.push(walker.currentNode);
    }
}

console.log(matches);
```

TreeWalker keeps a currentNode and exposes methods to move to a parent, child, or sibling. NodeIterator offers a simpler forward traversal through its filtered view. These APIs are specialized; querySelectorAll() or ordinary element relationships are usually simpler when they solve the problem.

## Shadow DOM boundary

A document query generally searches the document's ordinary tree and does not enter a component's shadow root. Code with a reference to an open shadow root can query within that root:

```js
const component = document.querySelector("user-card");
const name = component?.shadowRoot?.querySelector(".name");
```

A shadow root is a separate tree boundary. A selector in the document does not automatically match elements inside it, and ordinary parent relationships do not cross from a shadow tree to its host. Encapsulated component internals should be accessed through the component's intended interface.

## Common mistakes

### Expecting childNodes to contain only elements

Whitespace and comments are nodes too. Use children or element-specific relationship properties when you only need elements.

### Treating a descendant as a direct child

A nested match may be several levels down. Use direct-child relationships only when the markup structure guarantees them.

### Assuming querySelector() tests the receiver

It searches descendants. Use matches() to test the receiver element itself.

### Assuming querySelectorAll() returns an Array

It returns a static NodeList. Use forEach() where supported, or Array.from() when array methods such as map() or filter() are needed.

### Confusing live and static collections

childNodes, children, and getElementsByClassName() are live collections. querySelectorAll() returns a static list. Know whether the collection updates while the DOM changes.

### Assuming visual order equals DOM order

CSS layout can change visual placement without changing parent, sibling, or tree-order relationships.

### Expecting selectors to cross a shadow boundary

A document-level query does not automatically search inside a shadow root. Query through the root reference when the component exposes it.

## Try it yourself

1. Inspect document.documentElement, document.head, and document.body.
2. Put a comment and whitespace between two elements, then compare childNodes with children.
3. Find one element with getElementById() and another with querySelector().
4. Select all matching elements and verify that the returned NodeList is static after adding a new match.
5. Remove an element while iterating a live children collection. Then repeat with Array.from() and compare.
6. Use matches() to test an element and closest() to find a matching ancestor.
7. Add an event listener to a list and use closest() to identify a clicked nested button.
8. Use nextElementSibling to walk across a list without visiting whitespace text nodes.
9. Create a TreeWalker that visits element nodes only, then one that visits text nodes.
10. Explain why a document query cannot select an element inside a component's shadow root.

## Key points

- The DOM is a parsed tree containing elements, text, comments, and other node types.
- Attributes are associated with elements but are not their child nodes.
- childNodes includes all node types; children includes element children only.
- Node-based and element-based parent, child, and sibling properties answer different questions.
- getElementById() finds a document element by its unique id.
- querySelector() returns the first matching descendant; querySelectorAll() returns a static NodeList of matches.
- matches() tests the current element, while closest() checks it and then its element ancestors.
- Live collections update when the DOM changes; static query results do not.
- TreeWalker and NodeIterator support filtered node traversal.
- DOM relationships describe tree order, not CSS visual layout.
- Shadow roots are separate query and traversal boundaries.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [98 - Browser globals, globalThis, window, and document](098-browser-globals-globalthis-window-and-document.md) | [Open Q&A](../qnas/099-the-dom-tree-selectors-and-traversal.md) | [Open example](../examples/099-the-dom-tree-selectors-and-traversal.md) | [100 - Creating, updating, and removing DOM content](100-creating-updating-and-removing-dom-content.md) |
