# 100 - Creating, updating, and removing DOM content: Questions and Answers

Use these questions to review the DOM creation and update methods from chapter 100. Each answer follows its question, with an explanation where it helps clarify the behavior.

## Multiple-choice questions

### 1. Which method creates a new element node?

- A. **document.makeElement()**
- B. **document.createElement()**
- C. **document.appendElement()**
- D. **document.newNode()**

**Answer: B. document.createElement().**

It creates an element node, such as a **p** or **li**. The new node is detached until it is inserted into a document tree.

### 2. What does this code do?

~~~js
const item = document.createElement("li");
item.textContent = "Read";
~~~

- A. Adds the item to the page immediately
- B. Creates a list item and sets its text, but does not insert it
- C. Parses the word Read as HTML
- D. Removes the first list item

**Answer: B. Creates a list item and sets its text, but does not insert it.**

Creating a node and inserting it are separate operations. The code needs an insertion method such as **append()** before the item becomes a child of a page element.

### 3. Which statement about **append()** is correct?

- A. It accepts only element nodes.
- B. It accepts nodes and strings.
- C. It always creates a copy of a node.
- D. It replaces all existing children.

**Answer: B. It accepts nodes and strings.**

A string passed to **append()** becomes a text node. Passing a node that already belongs elsewhere moves that node.

### 4. What happens when **textContent** is assigned on an element that already has child elements?

- A. The new text is added after all existing children.
- B. The old children remain, and only text nodes change.
- C. The existing children are replaced by the assigned text.
- D. The browser throws an error.

**Answer: C. The existing children are replaced by the assigned text.**

Setting **textContent** on an element removes its existing children and replaces them with a text node for the assigned value.

### 5. What happens when an existing node is passed to another parent's **append()** method?

- A. The browser makes a copy.
- B. The node is moved from its old parent to the new parent.
- C. The node is removed permanently.
- D. The method does nothing.

**Answer: B. The node is moved from its old parent to the new parent.**

A DOM node can have only one parent at a time. Clone it first if the original must remain in its current location.

### 6. What is true after a **DocumentFragment** is appended to an element?

- A. The fragment becomes a visible element in the page.
- B. The fragment's children are moved into the element, and the fragment is empty.
- C. The children are copied, so both places keep them.
- D. The destination element is replaced.

**Answer: B. The fragment's children are moved into the element, and the fragment is empty.**

A fragment is a temporary container. Its children are inserted at the fragment's insertion point.

### 7. Which call clears all children of an element?

- A. **element.clear()**
- B. **element.remove()**
- C. **element.replaceChildren()**
- D. **element.deleteChildren()**

**Answer: C. element.replaceChildren().**

Calling **replaceChildren()** with no arguments removes all of the element's children while leaving the element itself in place.

### 8. Which method replaces a node with a new node or text?

- A. **replaceWith()**
- B. **replaceChildText()**
- C. **changeNode()**
- D. **append()**

**Answer: A. replaceWith().**

Call **oldNode.replaceWith(newNode)** to replace that specific node. Use **parent.replaceChildren(...)** when the goal is to replace the parent's child list.

### 9. Which statement about **cloneNode(true)** is correct?

- A. It clones the node and its descendants, including listeners registered with **addEventListener()**.
- B. It clones only the node and never its descendants.
- C. It clones the node and its descendants, but does not copy listeners registered with **addEventListener()**.
- D. It moves the original node.

**Answer: C. It clones the node and its descendants, but does not copy listeners registered with addEventListener().**

The **true** argument requests a deep clone of the node structure. Behavior attached with **addEventListener()** must be attached to the clone separately.

### 10. Which is the safest choice for displaying an untrusted comment as plain text?

- A. Assign it to **innerHTML**.
- B. Assign it to **textContent**.
- C. Pass it to **document.write()**.
- D. Add it as a CSS selector.

**Answer: B. Assign it to textContent.**

**textContent** inserts the value as text. **innerHTML** parses the string as markup, which can create unsafe elements or attributes when the string is untrusted.

## Objective questions

### 11. True or false: A node returned by **document.createElement()** is immediately a child of the document.

**Answer: False.**

It is initially detached. Use an insertion method, such as **append()**, to connect it to a parent.

### 12. True or false: Passing the same node to **append()** twice creates two copies.

**Answer: False.**

The second insertion moves the same node to its new position. Call **cloneNode()** if a separate copy is required.

### 13. True or false: **appendChild()** accepts a plain string in the same way **append()** does.

**Answer: False.**

**appendChild()** expects a node. **append()** accepts either nodes or strings.

### 14. True or false: Calling **remove()** on an element also sets every JavaScript variable referencing that element to **null**.

**Answer: False.**

The node is detached from its parent, but any variables that refer to it still hold that reference.

### 15. True or false: **replaceChildren()** with no arguments removes the element itself.

**Answer: False.**

It removes the element's children. The element remains in its parent.

### 16. True or false: A deep clone created with **cloneNode(true)** can introduce duplicate **id** attributes.

**Answer: True.**

The clone includes copied attributes. If both original and clone are in the same document, update IDs that are meant to be unique.

### 17. True or false: Assigning **textContent** to a parent element keeps all of its nested elements.

**Answer: False.**

It replaces the parent's children with text. Select and update a specific descendant if the surrounding markup must remain.

### 18. Fill in the blank: Use **document.________("li")** to create a new list item.

**Answer: createElement.**

For example, **document.createElement("li")** creates a list item element.

## Short-answer and reasoning questions

### 19. Explain the difference between creating a node and inserting a node.

**Answer:** Creating a node makes a DOM object in memory. Inserting it connects it to a parent in the document tree.

For example, **document.createElement("p")** creates a detached paragraph. Calling **main.append(paragraph)** inserts it into the page's **main** element.

### 20. When should you use **textContent** instead of **innerHTML**?

**Answer:** Use **textContent** when the value should be displayed as plain text, especially if it came from a user, a file, or a network response.

**innerHTML** parses its string as markup. Untrusted input can create unsafe markup, so it requires a trusted or properly sanitized source.

### 21. What is the difference between **replaceWith()** and **replaceChildren()**?

**Answer:** **replaceWith()** replaces the node on which it is called. **replaceChildren()** replaces all children of the element on which it is called.

For example, call **notice.replaceWith(newNotice)** to replace one notice. Call **container.replaceChildren(newContent)** to replace the contents of a container.

### 22. Why might a developer use a **DocumentFragment**?

**Answer:** It provides a temporary place to build a group of nodes before inserting them into the document.

This can make multi-node construction easier to organize. It should not be treated as a guaranteed performance improvement in every situation.

### 23. What is the difference between a shallow clone and a deep clone?

**Answer:** **cloneNode(false)** clones the node itself without its descendants. **cloneNode(true)** also clones its descendant nodes.

Neither form copies listeners registered using **addEventListener()**.

### 24. Why can **removeChild()** throw an error?

**Answer:** The node passed to **parent.removeChild(node)** must be a direct child of that parent.

If the node has a different parent or is detached, the call cannot remove it from the specified parent. If you already have the node reference, **node.remove()** is often simpler.

### 25. A paragraph contains a label and a nested **span**. You want to change only the span's text. Why should you avoid setting **textContent** on the paragraph?

**Answer:** Setting the paragraph's **textContent** would replace all of its child nodes, including the label and the span.

Select the span and update its **textContent** so that the rest of the paragraph remains intact.

## Code-reading and coding questions

### 26. What is printed by this code?

~~~js
const first = document.createElement("li");
first.textContent = "One";

const second = document.createElement("li");
second.textContent = "Two";

const list = document.createElement("ul");
list.append(first, second);

console.log(list.children.length);
console.log(list.textContent);
~~~

**Answer:**

~~~text
2
OneTwo
~~~

The list has two element children. **textContent** combines their descendant text; it does not add spaces automatically.

### 27. Write code that creates a heading with the text **Tasks** and appends it to a **main** element.

**Answer:**

~~~js
const heading = document.createElement("h2");
heading.textContent = "Tasks";
document.querySelector("main").append(heading);
~~~

The heading is created first, receives a text value, and is then inserted into **main**.

### 28. Write code that removes the button stored in a variable named **removeButton**.

**Answer:**

~~~js
removeButton.remove();
~~~

**remove()** detaches the button from its parent. The variable continues to reference the detached button.

### 29. Write code that inserts a new paragraph immediately before an element stored in **target**.

**Answer:**

~~~js
const paragraph = document.createElement("p");
paragraph.textContent = "A note before the target.";
target.before(paragraph);
~~~

**before()** inserts the new paragraph as a sibling immediately before **target**.

### 30. Write code that builds three list items inside a **DocumentFragment** and appends them to a list stored in **list**.

**Answer:**

~~~js
const fragment = document.createDocumentFragment();

for (const label of ["Plan", "Build", "Review"]) {
  const item = document.createElement("li");
  item.textContent = label;
  fragment.append(item);
}

list.append(fragment);
~~~

The items are built in the fragment and then moved into **list** when the fragment is appended.

### 31. A developer writes the following code. Identify the behavior issue and correct it so the value is displayed as text.

~~~js
const output = document.querySelector("#output");
output.innerHTML = userInput;
~~~

**Answer:** The code parses **userInput** as HTML. Use **textContent** when the value should appear as plain text:

~~~js
const output = document.querySelector("#output");
output.textContent = userInput;
~~~

This avoids interpreting the input as markup.

### 32. A developer wants the same card structure in two places. Should they append the original card to both places? Explain and show the alternative.

**Answer:** No. Appending the original card to a second parent moves it out of the first parent. Clone it to create another node:

~~~js
const copy = originalCard.cloneNode(true);
secondContainer.append(copy);
~~~

A deep clone includes descendants. Reattach any **addEventListener()** listeners and ensure copied IDs remain unique.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [99 - The DOM tree, selectors, and traversal](../qnas/099-the-dom-tree-selectors-and-traversal.md) | [Open lesson](../lessons/100-creating-updating-and-removing-dom-content.md) | [Open example](../examples/100-creating-updating-and-removing-dom-content.md) | [101 - Attributes, classes, forms, and styles from JavaScript](101-attributes-classes-forms-and-styles-from-javascript.md) |
