# 100 - Creating, updating, and removing DOM content

JavaScript can change a page after the browser has built its initial document. It can create elements, add text, insert nodes in a chosen position, replace existing content, and remove nodes. These operations work with the Document Object Model (DOM), the browser's object representation of the page.

This chapter focuses on using DOM methods to create and update content safely and predictably. It builds on selecting nodes and traversing the DOM from the previous chapter.

## Learning goals

By the end of this chapter, you should be able to:

- Create elements and text nodes with the **document** object.
- Add and replace content with **append()**, **prepend()**, and related methods.
- Explain how inserting an existing node moves it.
- Use a **DocumentFragment** to prepare several nodes before inserting them.
- Update text without parsing it as HTML.
- Replace or remove nodes with the appropriate DOM methods.
- Clone a node when a second copy is needed.
- Avoid common content injection and DOM update mistakes.

## The document is a tree of nodes

A browser represents a page as connected nodes. Elements such as **main**, **ul**, and **li** are element nodes. Text inside an element is stored in text nodes. Comments are comment nodes. The **document** object represents the page and provides methods for creating new nodes.

A node can be detached, meaning it has not yet been inserted into the visible document. After a node is inserted into a connected part of the document, the browser can display it.

## Create an element and set its text

Use **document.createElement()** to create an element. Set text with **textContent** when the value should appear as text.

~~~js
const message = document.createElement("p");
message.textContent = "Your changes have been saved.";

document.querySelector("main").append(message);
~~~

**createElement("p")** creates a paragraph element. The node is initially detached. **append()** connects it to the end of the selected **main** element.

To create a text node explicitly, use **document.createTextNode()**:

~~~js
const label = document.createElement("strong");
const labelText = document.createTextNode("Status: ");
const value = document.createTextNode("Ready");

label.append(labelText, value);
~~~

For ordinary text updates, assigning **textContent** is usually shorter. Setting an element's **textContent** replaces all of its children with text. Reading **textContent** returns the text of the node and its descendants.

## Add nodes in different positions

Several DOM methods insert nodes relative to a parent or another node:

~~~js
const list = document.querySelector("ul");
const firstItem = document.createElement("li");
firstItem.textContent = "First";

const lastItem = document.createElement("li");
lastItem.textContent = "Last";

list.prepend(firstItem);
list.append(lastItem);
~~~

- **parent.append(node)** inserts a node after the parent's existing children.
- **parent.prepend(node)** inserts a node before the parent's existing children.
- **node.before(otherNode)** inserts a node immediately before **node**.
- **node.after(otherNode)** inserts a node immediately after **node**.
- **parent.appendChild(node)** appends one node and returns that node. It accepts a node, not a plain string.
- **append()** and **prepend()** accept nodes and strings. A string argument becomes a text node.

These methods do not create a new copy when given a node that is already in the DOM. They move that node from its current location.

~~~js
const listA = document.querySelector("#list-a");
const listB = document.querySelector("#list-b");
const item = listA.querySelector("li");

listB.append(item);
~~~

After this code runs, **item** belongs to **listB**; it is no longer a child of **listA**.

## Replace content or a node

Use **replaceChildren()** to replace all children of an element. Call it with no arguments to clear the element.

~~~js
const status = document.querySelector("#status");

status.replaceChildren("Ready");
status.replaceChildren();
~~~

The first call replaces the element's children with one text node. The second call removes every child.

Use **replaceWith()** to replace a node with another node or text:

~~~js
const oldNotice = document.querySelector(".notice");
const newNotice = document.createElement("p");

newNotice.textContent = "The notice has been updated.";
newNotice.className = "notice";

oldNotice.replaceWith(newNotice);
~~~

**replaceWith()** acts on the node being replaced. **replaceChildren()** acts on the parent whose children should be replaced.

## Remove a node

Call **remove()** on the node you want to detach:

~~~js
const item = document.querySelector("li");
item.remove();
~~~

The JavaScript variable can still refer to the removed node. Removing it from the document does not automatically set that variable to **null**.

To remove a child through its parent, **parent.removeChild(child)** is also available. It returns the removed child and throws an error if the argument is not a child of that parent. Prefer **child.remove()** when you already have the child reference.

## Prepare several nodes with a DocumentFragment

A **DocumentFragment** is a lightweight container for nodes. Build a group of nodes inside it, then append the fragment to the document:

~~~js
const list = document.querySelector("#tasks");
const fragment = document.createDocumentFragment();

for (const taskName of ["Read", "Practice", "Review"]) {
  const item = document.createElement("li");
  item.textContent = taskName;
  fragment.append(item);
}

list.append(fragment);
~~~

Appending a fragment moves its children into the destination. The fragment itself remains, now empty. A fragment is useful for separating the construction of a group of nodes from the point where they are inserted. Do not assume it always makes code faster; use it when it makes the update easier to organize.

## Move a node or make a copy

Appending an existing node moves it. If you need an independent copy, use **cloneNode()**:

~~~js
const original = document.querySelector(".card");
const copy = original.cloneNode(true);

document.querySelector("#archive").append(copy);
~~~

The **true** argument requests a deep clone, including descendants. Without it, only the node itself is cloned. A clone does not copy listeners registered with **addEventListener()**, and cloned markup can contain duplicate **id** values. Update IDs and reattach behavior when needed.

## Set text safely

Treat text that comes from a user, a file, or a network response as data. Put it in the page with **textContent**:

~~~js
const comment = document.createElement("p");
comment.textContent = userComment;
document.querySelector("#comments").append(comment);
~~~

If **userComment** contains characters such as **<** and **>**, they are displayed as text. They are not parsed into elements.

By contrast, **innerHTML** parses a string as HTML and replaces the element's children. Assigning untrusted text to **innerHTML** can create unwanted markup and expose a page to cross-site scripting. Use DOM creation methods and **textContent** for plain text. Only insert HTML from a source and process you trust, with an appropriate sanitization strategy.

## Update existing text

You can update the text of an existing element directly:

~~~js
const heading = document.querySelector("h1");
heading.textContent = "Updated page heading";
~~~

This replaces the heading's child nodes with a text node. If the element contains nested markup that must remain, update a specific child instead of setting **textContent** on the whole parent.

~~~html
<p>Selected: <span id="selection">none</span></p>
~~~

~~~js
document.querySelector("#selection").textContent = "Chapter 100";
~~~

Only the **span** text changes; the surrounding paragraph stays in place.

## A small content-building helper

A helper can keep node creation consistent when the same structure is needed more than once:

~~~js
function createTaskItem(taskName) {
  const item = document.createElement("li");
  const text = document.createElement("span");

  text.textContent = taskName;
  item.append(text);

  return item;
}

const tasks = document.querySelector("#tasks");
tasks.append(createTaskItem("Review DOM methods"));
tasks.append(createTaskItem("Practice with a fragment"));
~~~

The helper returns a detached **li**. The caller decides where to insert it. Keeping creation and insertion separate can make a page easier to maintain.

## Common mistakes

### Expecting an inserted node to stay in its old place

Inserting an existing node moves it. Clone it first if the original must remain where it is.

### Using innerHTML for plain text

**innerHTML** parses markup. Use **textContent** for plain text, especially when its value may come from outside the program.

### Replacing a parent when only one child should change

Setting **textContent** on a parent removes all of its descendants. Select the exact child that should change.

### Calling removeChild() on the wrong parent

The node must be a direct child of the parent passed to **removeChild()**. When you already have the node, **node.remove()** avoids that parent lookup.

### Assuming cloneNode(true) copies all behavior

Cloning copies the node structure and attributes, but not listeners registered with **addEventListener()**. Attach behavior to the clone separately.

## Try it yourself

1. Create a **p** element, set its **textContent**, and append it to a **main** element.
2. Build three **li** elements in a **DocumentFragment**, then append the fragment to a **ul**.
3. Create a node in one list and append it to a second list. Check where it appears afterward.
4. Clone a nested element with **cloneNode(true)** and compare it with a shallow clone.
5. Replace the children of a container using **replaceChildren()**, then clear it.
6. Remove one item with **remove()** and another with its parent's **removeChild()**.
7. Display the string **<strong>hello</strong>** as text without creating a **strong** element.
8. Change text inside a nested **span** without replacing its parent paragraph.
9. Explain why adding the same node twice does not produce two copies.
10. Add an event listener to a node, clone it, and verify that the clone needs its own listener.

## Key points

- Create elements with **document.createElement()** and text nodes with **document.createTextNode()**.
- Use **textContent** to display plain text without parsing it as markup.
- **append()**, **prepend()**, **before()**, and **after()** place nodes in the document.
- Inserting a node that already has a parent moves it.
- Use **replaceChildren()** to replace or clear child content, **replaceWith()** to replace a node, and **remove()** to detach one.
- A **DocumentFragment** can hold a group of nodes before insertion; appending it moves its children into the destination.
- **cloneNode(true)** copies descendants but not listeners registered with **addEventListener()**.
- Treat untrusted content as text and avoid assigning it to **innerHTML**.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [99 - The DOM tree, selectors, and traversal](099-the-dom-tree-selectors-and-traversal.md) | [Open Q&A](../qnas/100-creating-updating-and-removing-dom-content.md) | [Open example](../examples/100-creating-updating-and-removing-dom-content.md) | [101 - Attributes, classes, forms, and styles from JavaScript](101-attributes-classes-forms-and-styles-from-javascript.md) |
