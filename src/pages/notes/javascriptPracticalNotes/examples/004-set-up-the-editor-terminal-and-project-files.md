# 04 - Set up the editor, terminal, and project files - Example

## Goal

Create a small practice project with one browser page and one Node.js program. The files will be visible in your editor, and each program will be run with its own runtime.

## Question

How do you create the files, open the project in an editor, show the browser result, and run a JavaScript file from a terminal?

## Project structure

Create this folder structure:

~~~text
javascript-practice/
  browser/
    index.html
    app.js
  node/
    hello.js
~~~

The Markdown page displays the source code and instructions. It does not run the code. Each code block in GitHub has a copy button.

## 1. Create the folders

Use File Explorer or your operating system's file manager to create the main **javascript-practice** folder, then add **browser** and **node** folders inside it.

You can also create them in a terminal:

~~~text
mkdir javascript-practice
cd javascript-practice
mkdir browser
mkdir node
~~~

Open the **javascript-practice** folder in your code editor. In Visual Studio Code, use **File > Open Folder** and select it. Create the files listed in the project structure from the editor's Explorer panel.

## 2. Create the browser page

Create **browser/index.html** with this complete page:

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript Practice</title>
  <script src="./app.js" defer></script>
</head>
<body>
  <main>
    <h1>My JavaScript practice page</h1>
    <p id="message">Waiting for JavaScript...</p>
  </main>
</body>
</html>
~~~

The HTML provides the page structure and initial message. Its script element connects the page to **app.js** in the same folder.

## 3. Create the browser JavaScript file

Create **browser/app.js** with:

~~~js
const message = document.querySelector("#message");
message.textContent = "The browser loaded app.js.";
~~~

This code uses the browser's document API to find the paragraph and update its text.

Save both files. Then open **browser/index.html** in a browser.

### Expected browser result

The browser page displays:

> My JavaScript practice page  
> The browser loaded app.js.

## 4. Create the Node.js file

Create **node/hello.js** with:

~~~js
console.log("Hello from Node.js.");
console.log("2 + 3 = " + (2 + 3));
~~~

Open a terminal in the **javascript-practice** project folder. Check the folder with:

~~~text
pwd
~~~

Check that the **browser** and **node** folders appear when you list it:

~~~text
ls
~~~

Run the Node.js file:

~~~text
node node/hello.js
~~~

### Expected terminal result

~~~text
Hello from Node.js.
2 + 3 = 5
~~~

The browser runs the page and its connected script. Node.js runs the standalone file and writes its output to the terminal.

## 5. What each tool did

| Step | Tool | Result |
| --- | --- | --- |
| Create and edit files | Code editor | Source files saved in the project folders |
| Change folders and list files | Terminal | Commands run from the project root |
| Open **index.html** | Browser | Page content and its connected script displayed |
| Run **node node/hello.js** | Node.js in the terminal | JavaScript output printed in the terminal |

The editor does not run the code just because a file is open. Pick the browser or Node.js based on the kind of program.

## Troubleshooting

- If the browser shows the original waiting message, save **app.js** and reload **index.html**.
- If the browser reports a missing script, check that both browser files are in the same folder and that the script source is **./app.js**.
- If the terminal cannot find the Node.js command, check the setup steps in the lesson and open a new terminal.
- If Node.js cannot find the file, check that the terminal is in **javascript-practice** and that the file is **node/hello.js**.
- If File Explorer shows **hello.js.txt**, turn on file-name extensions and correct the file name.
- If the output is missing, save **hello.js** and run the command again.

## Try a small change

1. Change the page heading and reload the browser.
2. Change the browser message in **app.js**, save the file, and reload the page.
3. Change the Node.js greeting in **hello.js**, save it, and run the command again.
4. Change the arithmetic expression and read the new terminal output.
5. Run **pwd** from a different folder, then return to the project root and run the Node.js command again.

## Key ideas shown

- A project is a collection of files and folders that you open together in the editor.
- HTML pages run in a browser.
- Node.js runs JavaScript files from a terminal.
- The terminal's current folder affects relative file paths.
- Saving a file is required before another tool sees the updated source.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [03 - JavaScript engines and runtime environments](../lessons/003-javascript-engines-and-runtime-environments.md) | [Open lesson](../lessons/004-set-up-the-editor-terminal-and-project-files.md) | [Open Q&A](../qnas/004-set-up-the-editor-terminal-and-project-files.md) | [05 - Browser console and developer tools](../lessons/005-browser-console-and-developer-tools.md) |
