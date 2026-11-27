# 05 - Browser console and developer tools: example

This example gives you a small page to inspect and debug with browser developer tools. The page has a form, a status message, and Console output for both successful and empty submissions.

## Goal

After opening the page and DevTools, you will:

- See a startup message in the Console.
- Submit a name and inspect the logged value.
- Submit an empty value and see a warning.
- Inspect the page in the Elements panel.
- Use the Console to check a page element.
- Follow a breakpoint in the Sources panel.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DevTools debugging practice</title>
  <style>
    body {
      max-width: 42rem;
      margin: 3rem auto;
      padding: 0 1rem;
      font-family: system-ui, sans-serif;
      line-height: 1.6;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-block: 1rem;
    }

    label {
      flex-basis: 100%;
    }

    input,
    button {
      padding: 0.6rem 0.8rem;
      font: inherit;
    }

    #status {
      min-height: 1.6em;
      padding: 0.75rem;
      border: 1px solid #777;
      border-radius: 0.4rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>DevTools debugging practice</h1>
    <p>Enter a name, submit the form, and inspect the result in your browser.</p>

    <form id="greeting-form">
      <label for="name">Your name</label>
      <input id="name" name="name" type="text" autocomplete="name">
      <button type="submit">Show greeting</button>
    </form>

    <p id="status" aria-live="polite">Your greeting will appear here.</p>
  </main>

  <script>
    const greetingForm = document.querySelector("#greeting-form");
    const nameInput = document.querySelector("#name");
    const statusMessage = document.querySelector("#status");

    console.info("Practice page ready.");

    greetingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = nameInput.value.trim();

      if (name === "") {
        console.warn("The name field is empty.");
        statusMessage.textContent = "Enter a name before submitting.";
        return;
      }

      console.log("Greeting requested for:", { name });
      statusMessage.textContent = "Hello, " + name + "! Check the Console for the logged value.";
    });
  </script>
</body>
</html>
~~~

## Open the page and DevTools

1. Save **index.html**.
2. Open the file in a browser.
3. Open DevTools with the browser menu or a shortcut supported by your browser.
4. Select the Console panel.
5. Reload the page.
6. Confirm that the startup message appears.

The exact shortcut depends on the browser and operating system. If a shortcut does not work, open DevTools from the browser menu.

## Inspect a successful submission

1. Enter **Asha** in the name field.
2. Select **Show greeting**.
3. Read the status message on the page.
4. Read the logged object in the Console.

The page shows:

~~~text
Hello, Asha! Check the Console for the logged value.
~~~

The Console shows an info message when the page loads and a log entry after a successful submission. The object contains the trimmed value of **name**.

## Inspect an empty submission

1. Clear the name field.
2. Select **Show greeting**.
3. Read the status message and the Console warning.

The page shows:

~~~text
Enter a name before submitting.
~~~

The Console shows:

~~~text
The name field is empty.
~~~

The warning appears because the submit handler checks whether the trimmed input is empty. The **return** statement stops the handler before it logs a greeting.

## Check the element in the Console

With this page open and the Console selected, enter the following expression and press **Enter**:

~~~js
document.querySelector("#status")
~~~

The Console returns the paragraph element with id **status**. You can also read its current text with:

~~~js
document.querySelector("#status").textContent
~~~

Try a selector that does not match an element:

~~~js
document.querySelector("#missing")
~~~

The result is **null**. This is a useful clue when your own selector does not find the element you expected. Check the spelling of the selector and confirm that the element exists in the page.

These expressions are temporary inspection steps. They do not replace edits in your saved HTML file.

## Inspect the page structure

1. Open the Elements panel.
2. Select the form or status paragraph.
3. Inspect its id, attributes, and text.
4. Temporarily change the paragraph text in DevTools.
5. Reload the page and notice that the saved source restores the original text.

The temporary change helps you inspect the current page. To make a lasting change, edit **index.html**, save it, and reload.

## Follow a breakpoint

1. Open the Sources panel.
2. Find the inline script in **index.html**.
3. Set a breakpoint on the line that reads **const name = nameInput.value.trim();**.
4. Return to the page and enter a name.
5. Submit the form.
6. When execution pauses, inspect **nameInput.value** and the local variables available in the scope panel.
7. Resume execution and observe the page and Console.
8. Remove the breakpoint when finished.

A breakpoint pauses the handler so you can inspect its current state. This is useful when a value changes unexpectedly or the code takes a branch you did not expect.

## What the code is doing

- **querySelector** finds the form, input, and status paragraph in the document.
- **console.info** confirms that the script ran during page loading.
- The **submit** event listener handles a form submission.
- **preventDefault** keeps the browser from navigating away or reloading for this practice form.
- **trim** removes whitespace at the beginning and end of the entered name.
- The empty-value condition writes a warning, updates the page, and exits the handler.
- A non-empty value is logged as an object and used to update the visible status message.
- **textContent** writes plain text into the paragraph.

## Expected results

| Action | Page result | Console result |
| --- | --- | --- |
| Load the page | The initial status text remains visible | An info message says the practice page is ready |
| Submit **Asha** | A greeting appears | A log entry includes an object with the name **Asha** |
| Submit an empty field | A prompt asks you to enter a name | A warning says the name field is empty |
| Query **#status** | The page does not change | The matching paragraph element is returned |
| Query **#missing** | The page does not change | The result is **null** |

## Troubleshooting

- **The Console is empty:** reload the page, remove active filters, and confirm you opened the Console for the correct browser tab.
- **The submit button reloads the page:** confirm that the JavaScript loaded and the handler calls **event.preventDefault()**.
- **The Console says it cannot read a property of null:** check whether the selector found the intended element and whether the script ran after that element was created.
- **No greeting appears:** inspect the input value and the condition in the submit handler. A blank or whitespace-only value takes the warning branch.
- **A temporary Elements change disappears:** update the source file and save it before reloading.
- **A browser global is missing in a terminal:** this file is meant to run as a browser page. A plain Node.js process does not automatically provide the page's **document**.

## Try a small change

1. Change the startup message and reload the page.
2. Change the greeting text and submit a name again.
3. Add **console.log("Trimmed name:", name);** after the name is read, then inspect the output.
4. Enter a name with spaces before and after it. Confirm that **trim** removes those spaces.
5. Set the breakpoint on the empty-value condition and submit both an empty and non-empty value.
6. Remove the added message and breakpoint when you finish experimenting.

## Key ideas shown

- The browser Console can display messages from a page and evaluate expressions in that page.
- Logs and warnings help reveal which code path ran and what values were produced.
- **null** from a selector means there is no matching element at the time of the query.
- Elements edits are useful for inspection, but source-file changes are needed for lasting updates.
- A breakpoint pauses execution so you can inspect values during an event handler.
- Repeat the same action after a source change to verify the behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [04 - Set up the editor, terminal, and project files](../lessons/004-set-up-the-editor-terminal-and-project-files.md) | [Open lesson](../lessons/005-browser-console-and-developer-tools.md) | [Open Q&A](../qnas/005-browser-console-and-developer-tools.md) | [06 - ECMAScript editions, proposals, and compatibility](../lessons/006-ecmascript-editions-proposals-and-compatibility.md) |
