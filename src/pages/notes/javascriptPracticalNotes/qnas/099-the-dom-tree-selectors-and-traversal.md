# 99 - The DOM tree, selectors, and traversal: Questions and Answers

Use these questions to review DOM node relationships, selectors, and traversal. Each answer is followed by an explanation.

## Multiple-choice questions

### 1. Which node is the document element in an HTML document?

- A. The body element
- B. The head element
- C. The html element
- D. The first script element

**Answer: C. The html element.**

**Explanation:** The html element is the document element. The head and body are descendants of it.

### 2. What can appear in an element's childNodes collection?

- A. Only child elements
- B. Child elements, text nodes, and comments
- C. Only text nodes
- D. Only elements with an id

**Answer: B. Child elements, text nodes, and comments.**

**Explanation:** childNodes contains all child nodes. Whitespace between tags can be represented by Text nodes, and comments are nodes too.

### 3. Which property returns only child elements?

- A. childNodes
- B. children
- C. textContent
- D. attributes

**Answer: B. children.**

**Explanation:** children is an HTMLCollection of the element's child elements. It skips text and comment nodes.

### 4. Which lookup returns the first matching descendant or null?

- A. querySelector()
- B. querySelectorAll()
- C. matches()
- D. closestAll()

**Answer: A. querySelector().**

**Explanation:** querySelector() searches descendants using a CSS selector and returns the first match or null.

### 5. What does querySelectorAll() return?

- A. An Array containing every node type
- B. A static NodeList of matching elements
- C. A live HTMLCollection
- D. The first matching element

**Answer: B. A static NodeList of matching elements.**

**Explanation:** The result's membership does not automatically change after later DOM updates. The elements already in the list are still the same objects.

### 6. Which collection is live?

- A. The result of querySelectorAll()
- B. An Array created with Array.from()
- C. children
- D. A manually copied array

**Answer: C. children.**

**Explanation:** children is a live HTMLCollection. It reflects changes to the element's child elements.

### 7. Which method tests whether an element itself matches a selector?

- A. closest()
- B. matches()
- C. querySelector()
- D. getElementById()

**Answer: B. matches().**

**Explanation:** matches() tests the element on which it is called. querySelector() searches that element's descendants instead.

### 8. Where does closest() begin its selector check?

- A. At the document root only
- B. At the element itself, then its parent elements
- C. At the element's first child
- D. At the next sibling

**Answer: B. At the element itself, then its parent elements.**

**Explanation:** closest() checks the receiver first, then walks upward through its element ancestors until it finds a match or reaches the top.

### 9. Which property moves to the next element sibling, skipping text nodes?

- A. nextSibling
- B. nextElementSibling
- C. childNodes
- D. parentNode

**Answer: B. nextElementSibling.**

**Explanation:** nextElementSibling returns the next sibling that is an Element. nextSibling can return a whitespace Text node or comment.

### 10. Which statement about attributes is correct?

- A. An id attribute is a child node of its element.
- B. Attributes are associated with elements but are not child nodes.
- C. Attributes are always Text children.
- D. Attributes have element siblings.

**Answer: B. Attributes are associated with elements but are not child nodes.**

**Explanation:** The DOM represents attributes through an element's attribute APIs. They do not appear in childNodes.

### 11. What happens if querySelector() receives invalid selector syntax?

- A. It silently returns the document
- B. It returns an empty Array
- C. It throws a SyntaxError DOMException
- D. It changes the selector to a valid one

**Answer: C. It throws a SyntaxError DOMException.**

**Explanation:** Selector strings are parsed as CSS selectors. Invalid syntax causes an exception, so dynamic selector pieces need care.

### 12. Which selector asks for direct li children of a particular list?

- A. li ul
- B. :scope > li
- C. li + ul
- D. li:first-child

**Answer: B. :scope > li.**

**Explanation:** When used on the list element, :scope refers to that element and > selects its direct children.

## Objective questions

### 13. True or false: Indentation whitespace between HTML elements can create Text nodes.

**Answer: True.**

**Explanation:** The HTML parser represents inter-element whitespace in the DOM as Text nodes.

### 14. True or false: An element can have two parents at the same time.

**Answer: False.**

**Explanation:** A node has at most one parent in a tree. Inserting an existing node elsewhere moves it from its previous parent.

### 15. True or false: querySelector() called on an element tests that element before searching its descendants.

**Answer: False.**

**Explanation:** querySelector() searches descendant elements. Use matches() to test the receiver itself.

### 16. True or false: getElementById() returns null when the requested id is not found.

**Answer: True.**

**Explanation:** Callers should handle the missing-element case before using the returned value.

### 17. True or false: A static NodeList returned by querySelectorAll() updates its members after a new matching element is inserted.

**Answer: False.**

**Explanation:** The list is static. Run querySelectorAll() again to get a new result set.

### 18. True or false: The element objects in a querySelectorAll() result stop changing when the result list is static.

**Answer: False.**

**Explanation:** Static describes whether list membership updates. The Element objects in the list can still be changed or removed from the DOM.

### 19. True or false: CSS can change the visual order of elements without changing their DOM sibling relationships.

**Answer: True.**

**Explanation:** CSS layout affects presentation. DOM relationships continue to describe the document tree.

### 20. True or false: A document-level querySelector() automatically searches inside every component's shadow root.

**Answer: False.**

**Explanation:** A shadow root is a separate tree boundary. Query through a reference to the shadow root when it is available.

## Short-answer and reasoning questions

### 21. What is the difference between a parent and an ancestor?

**Answer:** A parent is the direct node above another node. An ancestor is any node above it, including its parent, grandparent, and higher nodes.

**Explanation:** Every parent is an ancestor, but a higher ancestor is not necessarily the direct parent.

### 22. Why might firstChild return a Text node when the first visible item is an element?

**Answer:** Whitespace or a line break before the element may be a Text node.

**Explanation:** firstChild uses node relationships and includes non-element nodes. firstElementChild skips them.

### 23. Why should an id value be unique within a document?

**Answer:** A unique id gives an element an unambiguous identity for document lookups and references.

**Explanation:** Duplicate ids can make selectors and APIs that expect one element difficult to reason about.

### 24. Explain the difference between querySelector() and querySelectorAll().

**Answer:** querySelector() returns the first matching descendant or null. querySelectorAll() returns a static NodeList containing all matching descendants.

**Explanation:** Use the first when one match is needed and the latter when a snapshot of all matches is needed.

### 25. When is Array.from() useful with DOM collections?

**Answer:** It creates an Array copy so array methods such as map() and filter() can be used, and it provides a stable snapshot of membership.

**Explanation:** Some DOM collections are live, so copying them also avoids collection indexes shifting during later tree changes.

### 26. What should code do when querySelector() might not find an element?

**Answer:** Check for null before using the result.

**Explanation:** A selector can have no match because the markup differs, the element has not been added yet, or the selector is scoped to another subtree.

### 27. How do matches() and closest() differ?

**Answer:** matches() checks only the current element. closest() checks the current element and then its parent elements.

**Explanation:** Use matches() for a direct condition and closest() to find a containing element that satisfies a selector.

### 28. What does the selector :scope > li mean when used on a list element?

**Answer:** It selects li elements that are direct children of that list.

**Explanation:** :scope identifies the element on which the selector search is scoped, and > means direct child.

### 29. Why can a selector built from arbitrary user text fail?

**Answer:** The text might not form valid CSS selector syntax or could change what the selector matches.

**Explanation:** Prefer an API designed for the lookup, such as getElementById(), or escape dynamic selector components with CSS.escape().

### 30. When might TreeWalker be preferable to querySelectorAll()?

**Answer:** When code needs to walk node types such as Text nodes or apply a filter during traversal.

**Explanation:** TreeWalker supports node-type masks, filtering, and movement through the tree. For common element selection, querySelectorAll() is usually simpler.

### 31. Why can a document selector not find an element inside a shadow root?

**Answer:** The shadow root is a separate tree and selectors do not automatically cross that boundary.

**Explanation:** If code has access to an open shadow root, it can call querySelector() on that root.

### 32. Why should semantic source order remain meaningful even when CSS changes visual layout?

**Answer:** DOM order continues to determine relationships and can affect keyboard navigation and assistive technology, even if CSS repositions items visually.

**Explanation:** Visual appearance alone does not rewrite the document tree. A meaningful source order makes the page structure more predictable.

## Coding and traversal questions

### 33. Select the element with id "results" and safely log its number of element children.

**Answer:**

~~~js
const results = document.getElementById("results");

if (results) {
    console.log(results.children.length);
}
~~~

**Explanation:** getElementById() can return null. children counts Element children and skips whitespace Text nodes and comments.

### 34. Select all buttons with a data-action value of "save" inside a form.

**Answer:**

~~~js
const form = document.querySelector("form");
const saveButtons = form?.querySelectorAll("button[data-action='save']");
~~~

**Explanation:** Calling querySelectorAll() on the form scopes the search to its descendants. The optional chain handles a missing form.

### 35. Find the closest list item for a clicked element, then ensure it belongs to a particular list.

**Answer:**

~~~js
function findListItem(clickedElement, list) {
    const item = clickedElement.closest("li");
    return item && list.contains(item) ? item : null;
}
~~~

**Explanation:** closest() can find a matching ancestor outside the intended list, so contains() verifies that the result belongs to the target list.

### 36. Collect paragraph elements into an Array snapshot before processing them.

**Answer:**

~~~js
const paragraphs = Array.from(document.querySelectorAll("p"));

for (const paragraph of paragraphs) {
    console.log(paragraph.textContent);
}
~~~

**Explanation:** querySelectorAll() returns a static NodeList. Array.from() creates an Array, which supports the full set of Array methods.

### 37. Move through direct element children of a container without visiting whitespace nodes.

**Answer:**

~~~js
const container = document.querySelector("#items");

for (let item = container?.firstElementChild; item; item = item.nextElementSibling) {
    console.log(item);
}
~~~

**Explanation:** firstElementChild and nextElementSibling skip text and comment nodes.

### 38. Write a TreeWalker that visits only Element nodes under a section.

**Answer:**

~~~js
const section = document.querySelector("section");

if (section) {
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_ELEMENT
    );

    while (walker.nextNode()) {
        console.log(walker.currentNode);
    }
}
~~~

**Explanation:** NodeFilter.SHOW_ELEMENT limits the walk to elements. nextNode() advances through the filtered traversal.

### 39. Check whether a known element matches an enabled button selector.

**Answer:**

~~~js
const control = document.querySelector("#submit");

if (control?.matches("button:not(:disabled)")) {
    console.log("The control is an enabled button");
}
~~~

**Explanation:** matches() tests the existing element itself. Optional chaining handles the case where the id lookup finds nothing.

### 40. A live children collection is changing while code removes items. Give a safe approach to remove every child element.

**Answer:**

~~~js
const container = document.querySelector("#items");

if (container) {
    for (const child of Array.from(container.children)) {
        child.remove();
    }
}
~~~

**Explanation:** Array.from() copies the live HTMLCollection before removals change its indexes. replaceChildren() is simpler if the goal is just to clear all child nodes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [98 - Browser globals, globalThis, window, and document](../qnas/098-browser-globals-globalthis-window-and-document.md) | [Open lesson](../lessons/099-the-dom-tree-selectors-and-traversal.md) | [Open example](../examples/099-the-dom-tree-selectors-and-traversal.md) | [100 - Creating, updating, and removing DOM content](100-creating-updating-and-removing-dom-content.md) |
