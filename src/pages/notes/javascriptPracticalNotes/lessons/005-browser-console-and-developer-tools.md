# 05 - Browser console and developer tools

The browser is more than a place to view a page. It also includes developer tools that help you inspect a page, run JavaScript, read messages, and investigate problems. In this lesson, you will learn how to open those tools and use the Console as a practical debugging aid.

## What are developer tools?

Browser developer tools, often called DevTools, are panels built into a browser. They work with the page currently open in that browser tab. You can inspect the page structure, see messages from JavaScript, examine network requests, and debug source files.

Developer tools are useful because they show what the browser is doing while your page runs. They can help answer questions such as:

- Did the browser load the page I expected?
- Did my JavaScript file run?
- What value does this variable contain?
- Which line produced an error?
- Did a request for an image or script fail?
- Does the page contain the element my code is trying to find?

DevTools are not a replacement for your code editor. Most of your lasting changes should be made in project files, saved, and then checked in the browser. Changes made directly in some DevTools panels are temporary.

## Opening developer tools

The exact menu labels and keyboard shortcuts can vary by browser, operating system, and version. In Chrome on Windows or Linux, common ways to open DevTools include:

- Press **F12** or **Ctrl + Shift + I** to open DevTools.
- Press **Ctrl + Shift + J** to open DevTools with the Console selected.
- Right-click an element on a page and choose **Inspect** to open the tools near that element.
- Open the browser menu and choose **More tools**, then **Developer tools**.

If a shortcut does not work, use the browser menu. On a laptop, the function keys may require holding **Fn** as well.

DevTools may open docked beside or below the page, or in a separate window. The docking control in the DevTools toolbar changes its position. A narrow dock makes the page viewport smaller, so resize or undock the tools if the layout is difficult to inspect.

## The Console

The Console is a panel for reading messages and evaluating JavaScript in the context of the current page. It commonly displays:

- Messages written by page code, such as **console.log** calls.
- Warnings and errors from the browser or page.
- Results from JavaScript expressions you enter.
- Links to source files and line numbers when available.

A page can write different kinds of messages:

~~~js
console.log("A general debugging message");
console.info("The page initialized");
console.warn("Check this value");
console.error("Something failed");
~~~

These methods help distinguish the purpose of each message. They do not change the page by themselves. A message appears in the Console so you can observe what the code reached or what information it produced.

For example, if a button handler should run when a button is clicked, temporarily add a message inside the handler:

~~~js
button.addEventListener("click", () => {
  console.log("The button was clicked");
});
~~~

If the message appears after the click, the handler ran. If it does not appear, check whether the script loaded, whether the button was found, and whether the event listener was attached.

### Displaying values

Pass values to **console.log** to inspect them:

~~~js
const quantity = 3;
const unitPrice = 12;
const total = quantity * unitPrice;

console.log("Quantity:", quantity);
console.log("Total:", total);
~~~

The Console displays the label and the value. You can pass several values as separate arguments. This can be easier to read than joining them into one string.

You can also inspect an expression directly in the Console. For example, enter **2 + 3** and press **Enter**. The Console evaluates the expression and shows **5**. This is useful for small checks, but code entered there is not automatically saved in your project file.

### Running code in the Console

The Console's JavaScript runs in the selected page's context. On a normal web page, this means browser features such as **document** and **window** are available. For example, entering the following expression reads the page title:

~~~js
document.title
~~~

The Console may also let you inspect or change the current page temporarily:

~~~js
document.querySelector("h1")
~~~

This expression returns the first matching heading element, or **null** if the page has no matching element. A Console change is useful for investigation, but it is not a reliable way to make a lasting update. Put the intended change in your HTML, CSS, or JavaScript file instead.

The browser Console is different from the terminal. A browser Console runs in a page context. A terminal runs shell commands and may run JavaScript through an environment such as Node.js. For example, **document** is normally available in a browser page but is not a built-in global in a plain Node.js script.

## Understanding errors

A Console error often includes a message, a source file, and a line number. Read the message first, then use the source link to inspect where it came from. The wording may look unfamiliar at first, but it often points to a useful clue.

Common error categories include:

- **SyntaxError**: JavaScript could not parse the code, often because punctuation or structure is invalid.
- **ReferenceError**: the code tried to use a name that is not available in that scope.
- **TypeError**: an operation was attempted on a value that does not support it, such as calling a missing function.
- **Network or loading error**: a requested file or resource could not be loaded.

A line number identifies where the browser reported the problem. The underlying mistake can be a few lines earlier, so inspect nearby code too. Fix one issue, save the file, and reload or repeat the action to see whether the message changes.

A useful debugging routine is:

1. Reproduce the problem and note what action causes it.
2. Open the Console and read the first relevant error.
3. Follow its source link and inspect the indicated code and nearby lines.
4. Check the values involved in the failing operation.
5. Make one focused change in your source file.
6. Save, reload the page, and repeat the same action.
7. Confirm both that the error is gone and that the intended behavior works.

Do not assume every red message is caused by your code. Browser extensions, blocked resources, or unrelated page activity can also produce messages. Connect a message to the action you are investigating before changing your program.

## Useful DevTools panels

DevTools has several panels. Their names and arrangement can vary, but these are common:

### Elements

The Elements panel shows the current page's document structure and its styles. You can select an element, inspect its attributes, and see which CSS rules apply. Clicking an element in the page and choosing **Inspect** usually selects it in this panel.

Edits made in Elements are generally temporary. They help you test a visual idea or inspect the current DOM, but they do not automatically rewrite your saved HTML or CSS files.

### Console

The Console shows messages and lets you evaluate JavaScript in the page context. Use it to inspect values, check whether code runs, and read errors.

### Sources

The Sources panel helps you inspect files loaded by the page and debug JavaScript. It can show source locations and, in many browsers, lets you pause execution at a breakpoint. When execution pauses, inspect the current values and the call stack to understand how the code arrived there.

A breakpoint is a pause point set on a line of code. It lets you inspect execution step by step. Breakpoints are useful when a result is wrong but the exact point where it becomes wrong is unclear.

### Network

The Network panel records requests made by the page, such as requests for HTML, scripts, stylesheets, images, and data. Reload the page while this panel is open to see the requests made during loading. A failed request may explain why a script, stylesheet, image, or data item is missing.

### Application or Storage

This panel provides ways to inspect browser-managed data such as cookies, local storage, and session storage. The available sections depend on the browser and the page. Storage is useful when a page remembers preferences or data between visits.

You do not need to learn every panel at once. Start with the Console, then open other panels when a question requires them.

## Filtering and clearing Console messages

As a page runs, the Console can collect many messages. Use the available level controls or search field to narrow what is shown. A filter changes what you see, not what your code does.

The clear control removes displayed messages from the current Console view. Some DevTools versions also provide an option to preserve messages across page loads. If the Console looks empty, check whether a filter is hiding the messages and whether the correct page or frame is selected.

Expand objects and error details when needed. Source links in messages may open the corresponding file and line in the Sources panel.

## Keep Console use safe

Only paste JavaScript into the browser Console when you understand what it does and trust its source. A command entered there can act on the current page with the browser permissions available to that page. Do not paste code from an unknown person or website just because it promises to fix a problem.

Use the Console for small, deliberate checks. Store lasting code in your project files, where it can be reviewed, edited, and run again.

## Common beginner problems

- **No message appears:** confirm the script loaded, the relevant code ran, and the message is not filtered.
- **The wrong page is selected:** check the active browser tab and the selected frame in DevTools.
- **An element query returns null:** check the selector and confirm the element exists when the code runs.
- **A line number seems unrelated:** inspect nearby lines and the call stack. The error may be triggered by an earlier value or action.
- **An edit disappears after reload:** changes made through Elements or the Console are commonly temporary. Update the source file and save it.
- **A browser API is undefined in Node.js:** browser globals belong to a browser environment. A plain Node.js process does not automatically provide the page's **document** or **window**.
- **Too many messages appear:** clear the view or filter by message level, then repeat the action you are debugging.

## Try it yourself

1. Open a simple HTML page in your browser and open DevTools.
2. Select the Console panel and enter **2 + 3**. Read the result.
3. Add a **console.log** message to a page script, save the file, and reload the page.
4. Use **document.title** in the Console to inspect the current page title.
5. Use **document.querySelector("h1")** and observe the returned element. If the page has no heading, observe the result.
6. Open the Elements panel, temporarily change a heading's text, and reload the page to see whether the edit persisted.
7. Open the Network panel, reload the page, and identify the HTML and JavaScript requests.
8. Trigger a deliberate problem in a practice file, read the first relevant error, then correct the source and verify the result.

## Key points

- DevTools helps inspect and debug the page currently open in a browser.
- The Console displays messages and evaluates JavaScript in the current page context.
- **console.log**, **console.info**, **console.warn**, and **console.error** create messages with different purposes.
- Console expressions are useful for investigation, but they are not saved in your project automatically.
- Syntax, reference, and type errors describe different kinds of problems.
- Elements, Sources, Network, and Application panels answer different debugging questions.
- Make lasting changes in your source files, save them, and repeat the same steps to verify the fix.
- Be cautious with code pasted into the Console.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [04 - Set up the editor, terminal, and project files](004-set-up-the-editor-terminal-and-project-files.md) | [Open Q&A](../qnas/005-browser-console-and-developer-tools.md) | [Open example](../examples/005-browser-console-and-developer-tools.md) | [06 - ECMAScript editions, proposals, and compatibility](006-ecmascript-editions-proposals-and-compatibility.md) |
