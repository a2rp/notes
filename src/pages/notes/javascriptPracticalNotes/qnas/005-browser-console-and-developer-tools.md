# 05 - Browser console and developer tools: Q&A

This Q&A reviews the browser developer tools, Console messages, error clues, and a practical debugging routine from the lesson.

## Multiple-choice questions

### 1. What is the main purpose of browser developer tools?

A. To permanently replace the source files in your project  
B. To inspect and debug a page while it runs in the browser  
C. To convert every JavaScript file into HTML  
D. To install browser extensions automatically

**Answer: B.** Developer tools help you inspect the current page, view messages, examine requests, and investigate behavior. Most lasting code changes should still be made in your project files.

### 2. Which panel is most directly used to view JavaScript messages and evaluate expressions in a page?

A. Network  
B. Elements  
C. Console  
D. Application

**Answer: C.** The Console displays messages such as **console.log** output and lets you evaluate JavaScript in the selected page context.

### 3. What does this statement do?

~~~js
console.warn("Check this value");
~~~

A. It stops the browser  
B. It writes a warning message to the Console  
C. It changes the page heading  
D. It saves a warning in the JavaScript file

**Answer: B.** **console.warn** displays a warning message. It does not edit the page or save anything.

### 4. In Chrome on Windows or Linux, which shortcut commonly opens DevTools with the Console selected?

A. Ctrl + Shift + J  
B. Ctrl + S  
C. Alt + F4  
D. Ctrl + P

**Answer: A.** Chrome commonly uses **Ctrl + Shift + J** for the Console. Shortcuts can differ by browser, operating system, and version, so use the browser menu if needed.

### 5. Which panel is useful for checking whether an image or script request failed?

A. Elements  
B. Network  
C. Sources  
D. Console filters

**Answer: B.** The Network panel records requests made by the page and shows their results, which can help identify failed resource loads.

### 6. What does a breakpoint do in the Sources panel?

A. It permanently deletes the selected line  
B. It pauses JavaScript execution at a selected point  
C. It changes the browser's default search engine  
D. It hides all Console messages

**Answer: B.** A breakpoint pauses execution so you can inspect values and follow how the code reached that point.

### 7. What might **document.querySelector("h1")** return if the page has no h1 element?

A. Always an empty string  
B. **null**  
C. The browser's home page  
D. A SyntaxError in every case

**Answer: B.** A valid selector with no matching element returns **null**. The selector itself is valid, so the absence of a match is not necessarily an error.

### 8. Where should a lasting code fix normally be made?

A. Only in a temporary Console expression  
B. In the project source file, then saved and checked in the browser  
C. In the Network panel  
D. In the browser address bar

**Answer: B.** Console and Elements experiments are commonly temporary. Put the intended fix in the source file so it can be reviewed and used again.

## True or false

### 9. The browser Console and a terminal are the same environment.

**Answer: False.** The Console usually evaluates code in a page context, while a terminal runs shell commands and can run JavaScript using an environment such as Node.js.

### 10. A message printed by **console.log** automatically appears as text inside the web page.

**Answer: False.** It appears in the Console. To display text on the page, JavaScript must update a page element or use another page-rendering method.

### 11. Changes made directly in the Elements panel are generally saved back into the original HTML file.

**Answer: False.** They are normally temporary inspection or experimentation changes. Update the actual source file for a lasting change.

### 12. A Console filter can hide messages without changing what the JavaScript program does.

**Answer: True.** Filtering changes which messages are visible in the DevTools view. It does not alter the program's behavior.

### 13. Every red error message in DevTools must have been caused by the code you are currently debugging.

**Answer: False.** Extensions, blocked resources, or unrelated page activity can also produce messages. Connect an error to the action and source you are investigating.

### 14. A reported line number is useful even if the underlying mistake is a few lines earlier.

**Answer: True.** The line shows where the browser noticed or reported the problem. Inspect nearby code and values because the cause may occur earlier.

### 15. It is safe to paste any code into the browser Console if someone says it will fix a problem.

**Answer: False.** Console code can act on the current page. Only run code you understand and trust.

## Short-answer questions

### 16. What kinds of information can the Console show?

**Answer:** It can show messages written by page code, browser or page warnings and errors, results of expressions entered into the Console, and source file links or line numbers when available.

### 17. What is the difference between **console.log** and changing a page element?

**Answer:** **console.log** sends information to the DevTools Console for inspection. Changing a page element updates visible page content, for example by assigning a value to an element's **textContent**.

### 18. What is a **SyntaxError**?

**Answer:** A **SyntaxError** means JavaScript could not parse the code. A missing delimiter, invalid structure, or misplaced token can cause one. Check the reported location and nearby lines.

### 19. What is a **ReferenceError**?

**Answer:** A **ReferenceError** occurs when code tries to use a name that is not available in its current scope. Check spelling, declarations, and whether the code is running in the scope where that name exists.

### 20. What is a **TypeError**?

**Answer:** A **TypeError** means an operation was attempted on a value that does not support it. For example, code may try to call a property that is not a function or read a property from **null**.

### 21. Why can a browser page use **document** while a plain Node.js script usually cannot?

**Answer:** **document** is provided by a browser page environment because it represents that page's document. A plain Node.js process does not automatically create a browser page or provide its DOM globals.

### 22. What does the Network panel help you investigate?

**Answer:** It shows requests made by the page for resources such as HTML, JavaScript, stylesheets, images, and data. It can help identify a missing file or failed request.

### 23. Why should you save and reload after editing a source file?

**Answer:** Saving makes the updated source available to the browser. Reloading lets you check the changed code from a fresh page load and confirm whether the fix worked.

## Read the code

### 24. What message appears in the Console?

~~~js
const score = 8;
console.log("Score:", score);
~~~

**Answer:**

~~~text
Score: 8
~~~

The first argument is the label, and the second argument is the value of **score**.

### 25. What does this expression return if the page contains a heading with id **status**?

~~~js
document.querySelector("#status")
~~~

**Answer:** It returns the first page element whose **id** is **status**. If there is no matching element, it returns **null**.

### 26. What does the following code help you check?

~~~js
button.addEventListener("click", () => {
  console.log("The button was clicked");
});
~~~

**Answer:** It helps check whether the button's click handler runs. If the message appears after clicking, the event listener was attached and the handler executed.

### 27. What is a useful next step if a click handler's message never appears?

**Answer:** Check that the JavaScript file loaded, that **button** refers to the expected element, and that the event listener was attached before the click. Also confirm that Console messages are not filtered and that the right browser tab is selected.

### 28. A script reports that it cannot read a property from **null**. What should you check?

**Answer:** Check the value that is **null** before the property access. If it came from **document.querySelector**, verify the selector and confirm the matching element exists when the code runs. Also check whether the script runs before the HTML element is created.

## Debugging scenarios

### 29. You click a button, but nothing happens and no message appears. What is a sensible first debugging sequence?

**Answer:** Reproduce the click with DevTools open, make sure the correct page and Console are selected, and check whether messages are filtered. Then check for errors, confirm the script loaded, verify that the button was found, and inspect whether the click handler was attached.

### 30. You changed a heading in Elements, but the original text returns after reload. Why?

**Answer:** The Elements edit was a temporary change to the current page. Make the desired edit in the saved HTML or JavaScript source file, save it, and reload.

### 31. The Console shows a failed request for **app.js**. What should you inspect?

**Answer:** Check that the script path in the HTML is correct, that the file exists at that location, and that the file name and extension match exactly. Use the Network request details to see the failure and reload after correcting the source.

### 32. You see an error from an extension while debugging your own page. Should you immediately rewrite your code?

**Answer:** No. First determine whether the message comes from your page code or an unrelated extension. Reproduce the page action and inspect the error's source before changing the application.

### 33. The page works in a browser, but the same code reports **document is not defined** when run with Node.js. What explains the difference?

**Answer:** The browser page provides a DOM and the **document** global. A plain Node.js runtime does not automatically provide a browser document. Run browser-specific code in a browser or use an appropriate DOM environment when a project requires one.

### 34. Why is it better to change one thing at a time while debugging?

**Answer:** A single focused change makes it easier to tell which change affected the result. If many changes are made together, it becomes harder to identify the actual cause or fix.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [04 - Set up the editor, terminal, and project files](../lessons/004-set-up-the-editor-terminal-and-project-files.md) | [Open lesson](../lessons/005-browser-console-and-developer-tools.md) | [Open example](../examples/005-browser-console-and-developer-tools.md) | [06 - ECMAScript editions, proposals, and compatibility](../lessons/006-ecmascript-editions-proposals-and-compatibility.md) |
