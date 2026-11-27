# Browser project: build an interactive interface - Q&A

These questions review [Chapter 141](../lessons/141-browser-project-build-an-interactive-interface.md). Each answer follows its question and includes an explanation.

## Multiple-choice questions

### 1. What should you write before implementing an interactive task list?

A. A list of browser brands  
B. User stories and observable behavior  
C. The complete CSS theme  
D. A deployment script  

**Answer:** B. User stories and observable behavior.

**Explanation:** Concrete behaviors make the scope clear and expose cases such as empty input, keyboard submission, and empty filters before implementation begins.

### 2. Which part should be the source of truth for the tasks?

A. The text currently visible in the DOM  
B. A JavaScript data model  
C. The browser's address bar  
D. The selected button's color  

**Answer:** B. A JavaScript data model.

**Explanation:** State holds the task data. The DOM is rendered from it, so filtering or re-rendering does not lose the underlying tasks.

### 3. Which HTML element is appropriate for a visitor submitting a new task?

A. A form  
B. A paragraph  
C. A footer  
D. A heading  

**Answer:** A. A form.

**Explanation:** A form gives input and submission their native meaning and supports submitting through Enter as well as a submit button.

### 4. Why should a text input have a visible label?

A. It automatically saves its value  
B. It identifies the field visually and programmatically  
C. It changes the input into a button  
D. It prevents all invalid values  

**Answer:** B. It identifies the field visually and programmatically.

**Explanation:** An associated label helps people understand the field and gives assistive technology a programmatic name for it.

### 5. What does trimming the submitted value help detect?

A. Whether the visitor typed only whitespace  
B. Whether a task is already completed  
C. Whether the browser supports CSS  
D. Whether the page has loaded  

**Answer:** A. Whether the visitor typed only whitespace.

**Explanation:** A string containing spaces is technically non-empty, but after trimming it becomes empty and should not be added as a task.

### 6. Which approach safely displays visitor-provided task text?

A. Insert it as parsed HTML  
B. Assign it as text content on a created element  
C. Treat it as a CSS selector  
D. Put it in an event handler string  

**Answer:** B. Assign it as text content on a created element.

**Explanation:** Text content displays the input literally. Parsing user input as HTML can create unintended elements or executable markup.

### 7. What is event delegation?

A. Putting all events on the window  
B. Handling child interactions with a listener on a stable ancestor  
C. Adding a new listener after every click  
D. Replacing event handlers with CSS  

**Answer:** B. Handling child interactions with a listener on a stable ancestor.

**Explanation:** Events bubble from a child to its ancestors. A stable list can handle actions from rows that are repeatedly created or replaced.

### 8. Why should filter buttons use button type?

A. To make them submit the task form  
B. To specify that they perform an action without submitting a form  
C. To turn them into links  
D. To store the selected filter automatically  

**Answer:** B. To specify that they perform an action without submitting a form.

**Explanation:** Explicit button type avoids accidental form submission and page navigation when a button is used for an in-page action.

### 9. What should happen after a successful task submission?

A. The entire page should reload  
B. State should update and the interface should render again  
C. The task should only be written into the DOM  
D. All filters should be removed  

**Answer:** B. State should update and the interface should render again.

**Explanation:** Updating state first and deriving the visible page from it keeps the application data and interface consistent.

### 10. What is the purpose of the pressed state on filter buttons?

A. It changes the task data  
B. It communicates which filter is selected  
C. It submits the form  
D. It announces every task  

**Answer:** B. It communicates which filter is selected.

**Explanation:** A pressed state exposes the selected toggle button state to assistive technology. A visible selected style should also be provided.

## Short-answer questions

### 11. What is an acceptance criterion?

**Answer:** An observable condition that should be true when a user story is implemented.

**Explanation:** For example, after adding a valid task, one active task appears, the input clears, and the count updates. This is specific enough to review.

### 12. Why is application state preferable to reading task data back out of the DOM?

**Answer:** State stores the data independently of how it is currently displayed.

**Explanation:** Filtering or replacing DOM rows does not destroy the underlying tasks. The page can be rendered again from the same state.

### 13. What is the difference between an empty task collection and an empty filtered view?

**Answer:** An empty collection has no tasks at all; an empty filtered view has tasks, but none match the selected filter.

**Explanation:** These cases need different messages. One can invite the visitor to add the first task, while the other can explain that no tasks match the current filter.

### 14. Why should rendering avoid changing application data?

**Answer:** Rendering should describe the current state as DOM, not secretly perform actions.

**Explanation:** Separating state changes from rendering makes it easier to understand why the page changed and prevents duplicate or unexpected updates.

### 15. What does event bubbling enable in a repeated task list?

**Answer:** A single listener on the list can handle actions from its child controls.

**Explanation:** The event from a checkbox or button travels up the DOM tree. The list listener can inspect the original target and identify the action.

### 16. Why should the event handler verify that the action button belongs to the task list?

**Answer:** To avoid responding to unrelated matching controls elsewhere on the page.

**Explanation:** Checking containment keeps the delegated listener scoped to its intended component.

### 17. What does a task identifier provide?

**Answer:** A stable way to connect a control to the data item it acts on.

**Explanation:** Array positions can change after filtering or removal. An identifier continues to refer to the same task.

### 18. Why should focus be considered when removing a task?

**Answer:** The focused button may be removed along with its row, leaving keyboard users without a clear place to continue.

**Explanation:** After removal, focus can move to a nearby task action or back to the input if the list becomes empty.

### 19. What is the role of a status region in this project?

**Answer:** It communicates short dynamic updates, such as a task being added or completed.

**Explanation:** Assistive technology may not notice a change elsewhere on the page. A polite status can announce relevant updates without taking focus.

### 20. Why are empty states part of the interface design?

**Answer:** They tell users what the current view means and what action they can take next.

**Explanation:** Without an empty-state message, a blank list can look broken or fail to explain that a filter has no matching tasks.

## Read the code

### 21. What value is stored in text after this statement?

~~~js
const text = input.value.trim();
~~~

**Answer:** The input value with whitespace removed from both ends.

**Explanation:** Trimming makes a value such as spaces-only become an empty string, while retaining spaces between words.

### 22. What does this check prevent?

~~~js
if (text === "") {
  return;
}
~~~

**Answer:** It prevents the following code from adding an empty task.

**Explanation:** Returning exits the current function. A useful interface should also explain the validation problem and keep focus in the field.

### 23. What does preventDefault do in the form submit handler?

~~~js
event.preventDefault();
~~~

**Answer:** It stops the browser's default form navigation or submission behavior.

**Explanation:** The application handles the submission in the current page and updates its own state and DOM instead.

### 24. What task values remain after this operation?

~~~js
state.tasks = state.tasks.filter((task) => !task.completed);
~~~

**Answer:** Only tasks whose completed property is false.

**Explanation:** The filter callback keeps an item when its condition is true. The result is a new array containing active tasks.

### 25. What does this expression return when the task is found?

~~~js
state.tasks.find((task) => task.id === taskId);
~~~

**Answer:** The first task object with the matching identifier.

**Explanation:** If no item matches, find returns undefined. Code should handle that case before trying to change the task.

### 26. Why is the list listener still available after replacing list children?

~~~js
taskList.replaceChildren(fragment);
~~~

**Answer:** The listener is attached to the stable taskList element, not to the child rows.

**Explanation:** Replacing children removes the old rows, but it does not remove the listener from their parent.

### 27. What does this code update?

~~~js
button.setAttribute("aria-pressed", String(selected));
~~~

**Answer:** The button's programmatic pressed state to the string true or false.

**Explanation:** This exposes the selected state to assistive technology. The interface should also show the selected filter visually.

### 28. What is the result when task text is assigned with this statement?

~~~js
text.textContent = task.text;
~~~

**Answer:** The task text appears as literal text inside the element.

**Explanation:** Characters that resemble HTML are not parsed into markup by textContent, which makes it safer for visitor-provided strings.

### 29. Why does the render function use a DocumentFragment?

~~~js
const fragment = document.createDocumentFragment();
~~~

**Answer:** It provides a temporary container to assemble the rows before adding them to the page.

**Explanation:** The code can build the new list in one place, then replace the old children with the finished fragment. For a small list, clarity matters more than speed.

### 30. What should this handler do if the task lookup fails?

~~~js
const task = state.tasks.find((item) => item.id === taskId);
~~~

**Answer:** Stop safely without trying to change an undefined value.

**Explanation:** The state may have changed since a control was rendered. A guard for a missing task avoids a runtime error.

## Applied questions

### 31. A visitor submits a string containing only spaces. What should the interface do?

**Answer:** Trim the value, reject it, show a short explanation, and keep or return focus to the input.

**Explanation:** Native required validation may regard whitespace as a value. Application-level trimming enforces the intended rule.

### 32. A task contains text that looks like an HTML image element. How should it be displayed?

**Answer:** Display the characters literally using created elements and text content.

**Explanation:** Visitor data is content, not markup. Parsing it as HTML can create elements the application did not intend.

### 33. You filter to completed tasks and then remove one. What data should be removed?

**Answer:** Remove the matching task from the full state collection, then render the selected completed view again.

**Explanation:** The filter changes what is shown, not which data exists. Removal should target the item by identifier in the source collection.

### 34. A visitor clicks a nested icon inside a remove button. How can a delegated handler still find the action?

**Answer:** Use the event target's closest matching action button, then check that it is inside the list.

**Explanation:** The original event target may be a nested child rather than the button. The closest ancestor identifies the intended control.

### 35. A filter shows no results, but other tasks exist. What should the page communicate?

**Answer:** Explain that no tasks match the current filter and allow the visitor to choose another filter.

**Explanation:** The collection is not empty. A no-match message is clearer than presenting it as though no tasks have ever been added.

### 36. After deleting the focused task, where could focus move?

**Answer:** To a nearby task action, or to the task input if no task rows remain.

**Explanation:** Focus should remain predictable when the currently focused element is removed from the document.

### 37. The count is correct after adding tasks but wrong after completing one. What should you inspect?

**Answer:** Check whether the completion handler updates state and calls the same rendering or count-update path.

**Explanation:** Every state change that affects displayed counts must update the derived interface, not only the add handler.

### 38. Why is adding an event listener inside render a problem?

**Answer:** Each render can attach another listener, causing one action to run multiple times.

**Explanation:** Attach listeners once to stable elements. Rendering should create and replace view elements without registering duplicate handlers.

### 39. How should an inaccessible selected-filter style be improved?

**Answer:** Keep a visible selected style and also update the filter button's pressed state.

**Explanation:** Color alone may not communicate selection to everyone. A programmatic state and clear visual treatment serve different users.

### 40. What should you review before calling the interface complete?

**Answer:** Check the acceptance criteria, invalid and empty states, keyboard behavior, focus, task actions, counts, safe text display, and browser console.

**Explanation:** Reviewing only whether a task can be added misses important interaction paths. A small, systematic review catches incomplete behavior before the next project adds API data.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [140 - Feature detection, compatibility, and graceful fallback](../lessons/140-feature-detection-compatibility-and-graceful-fallback.md) | [Lesson](../lessons/141-browser-project-build-an-interactive-interface.md) · [Example](../examples/141-browser-project-build-an-interactive-interface.md) | [142 - Browser project: build an API-driven application](142-browser-project-build-an-api-driven-application.md) |
