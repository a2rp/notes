# 04 - Set up the editor, terminal, and project files

Before learning more JavaScript, prepare a small workspace where you can create files, save changes, and run code. A code editor helps you write and inspect files. A terminal runs commands. A browser runs page examples, and Node.js runs JavaScript files outside a browser.

You do not need a large toolchain to begin. This chapter sets up a simple folder and explains how to tell which tool runs each kind of file.

## Learning goals

After this chapter, you should be able to:

- Open a project folder in a code editor.
- Create and save HTML and JavaScript files with the correct extensions.
- Open an editor's integrated terminal.
- Check the current folder and list its files.
- Open an HTML page in a browser.
- Check whether Node.js is available and run a JavaScript file with it.
- Recognize common file-path and command errors.

## The tools you need

### A code editor

A code editor edits plain text files and helps you read code. Visual Studio Code is one example, and it includes JavaScript editing support and an integrated terminal. Other editors can work too.

A code editor is not the same thing as a JavaScript runtime. Installing an editor does not automatically mean that Node.js is installed.

Use a plain-text code editor for source files. Word processors can add formatting characters that do not belong in source code.

### A browser

A browser opens HTML pages and runs JavaScript that is included in or connected to those pages. You can also use its developer tools later in this course.

### Node.js

Node.js is needed when you want to run a JavaScript file directly from a terminal. Install a current supported LTS release from the official Node.js distribution for your operating system. Follow its installation instructions, then open a new terminal before checking it.

You do not need Node.js just to open a simple HTML page in a browser. This course uses it for standalone JavaScript and Node.js chapters.

### A terminal

A terminal accepts commands and runs programs. The integrated terminal in an editor gives you a terminal in the context of your project folder. You can also use a separate terminal application.

## Create a practice folder

Choose a location where you can find your work again, such as a dedicated programming practice folder. Create this structure:

~~~text
javascript-practice/
  browser/
    index.html
    app.js
  node/
    hello.js
~~~

The browser folder contains a page and its JavaScript file. The node folder contains a JavaScript file that runs directly with Node.js.

You can create the folders in File Explorer or your operating system's file manager. You can also create them from a terminal:

~~~text
mkdir javascript-practice
cd javascript-practice
mkdir browser
mkdir node
~~~

The **cd** command moves the terminal into the new project folder. Commands that create files may differ by shell, so it is fine to make the files from the editor.

## Open the project folder in your editor

In Visual Studio Code:

1. Open the File menu and choose **Open Folder**.
2. Select the **javascript-practice** folder.
3. If prompted, trust the folder only if you know and control its contents.
4. Use the Explorer panel to create the **browser** and **node** folders if they do not already exist.
5. Create the files shown in the project tree.

Opening the project folder gives the editor a clear workspace. If you open only one file, the editor may not show the related files and folders as a project.

The menu names can vary slightly between editor versions. Look for the command that opens a folder or workspace.

## Make sure file extensions are correct

Use these exact extensions:

- **index.html** for the browser page.
- **app.js** for JavaScript loaded by the browser page.
- **hello.js** for the Node.js program.

On Windows, file extensions may be hidden in File Explorer. If a file accidentally becomes **hello.js.txt**, Node.js will not find it as **hello.js**. Turn on the display of file-name extensions in File Explorer and check the complete name.

Save files as plain text. Use the editor's normal save command after creating or changing each file.

## Create the browser files

Put this starter page in **browser/index.html**:

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

Put this code in **browser/app.js**:

~~~js
const message = document.querySelector("#message");
message.textContent = "The browser loaded app.js.";
~~~

The HTML page links to the JavaScript file. When you open **index.html** in a browser, the browser reads the page and loads the script. The **defer** attribute tells the browser to run this external script after it has parsed the HTML. Script-loading details are covered in a later lesson.

## Open the page in a browser

Use your file manager to open **browser/index.html** in a browser. You can also open the HTML file from the editor if that option is available.

The page should show:

~~~text
My JavaScript practice page
The browser loaded app.js.
~~~

If it still says **Waiting for JavaScript...**, check that:

- The file is named **app.js** and is in the **browser** folder.
- The script path in the HTML is **./app.js**.
- The HTML and JavaScript files are saved.
- The browser console does not show a loading or syntax error.

The browser handles the HTML page and provides APIs such as the document object used by the script.

## Check the terminal location

Open a new terminal in the editor. In Visual Studio Code, use the Terminal menu and choose **New Terminal**.

Check which folder the terminal is currently using:

~~~text
pwd
~~~

The output should end in **javascript-practice**. If it does not, move to the correct folder with **cd** and the path to your project.

List the current folder's contents with:

~~~text
ls
~~~

You should see **browser** and **node**. If you do not, check the location shown by **pwd**.

## Check Node.js

In the terminal, run:

~~~text
node --version
~~~

If Node.js is installed and available to the terminal, this prints a version such as **v26.0.0**. The exact number depends on the version installed.

If the terminal says it cannot find the command:

1. Confirm that Node.js is installed.
2. Close the old terminal and open a new one.
3. Check the command again.
4. If it still fails, review the installer's setup instructions for your operating system.

An editor's JavaScript highlighting can work even when Node.js is not installed. Editing support and program execution are separate.

## Create and run a Node.js file

Put this code in **node/hello.js**:

~~~js
console.log("Hello from Node.js.");
console.log("2 + 3 = " + (2 + 3));
~~~

From the **javascript-practice** folder, run:

~~~text
node node/hello.js
~~~

The terminal should display:

~~~text
Hello from Node.js.
2 + 3 = 5
~~~

The command tells Node.js which JavaScript file to run. Typing only the file name in the editor does not run it. You must save the file and run the command in a terminal.

## Editor, terminal, browser, and Node.js

| Tool | What it does in this chapter |
| --- | --- |
| Code editor | Creates and edits HTML and JavaScript source files |
| Terminal | Runs commands from a current folder |
| Browser | Opens the HTML page and runs its connected page script |
| Node.js | Runs a JavaScript file directly from the terminal |

These tools work together, but they have separate jobs. When a result is unexpected, first confirm which tool is supposed to run the file.

## Useful file and folder commands

These commands are useful in most development workflows:

| Command | Purpose |
| --- | --- |
| **pwd** | Show the current folder |
| **ls** | List files and folders |
| **cd folder-name** | Move into a folder |
| **node --version** | Show the available Node.js version |
| **node path/to/file.js** | Run a JavaScript file with Node.js |

Some shells use different command names or path syntax. If a command does not work, check which shell the terminal is using.

## Common setup problems

| Problem | What to check |
| --- | --- |
| Node.js command cannot be found | Node.js installation, terminal restart, and system command path |
| Node.js says it cannot find the file | Current folder, file name, extension, and relative path |
| Browser page does not update | HTML script path, saved files, and browser console |
| File appears to be JavaScript but ends in .txt | Full file name and visible extensions |
| Editor shows code but nothing runs | Choose the browser or Node.js as the runtime and follow its run steps |
| Terminal lists unexpected folders | Current location shown by **pwd** |
| Browser says an element cannot be found | Check that the HTML ID matches the selector in the script |

## A safe, simple workflow

1. Open the project folder, not an unrelated system folder.
2. Create or open the file you intend to edit.
3. Make one small change and save it.
4. Run the file using the correct environment.
5. Read the output or error message.
6. Check the file name and current folder before changing code.

You do not need to install extensions or packages for the examples in this chapter. Add tools only when a lesson or project needs them.

## Try it yourself

1. Create the project tree in your own practice location.
2. Change the heading in **index.html** and reload the browser page.
3. Change the message in **app.js**, save it, and reload the page.
4. Change the arithmetic in **hello.js**, save it, and run the Node.js command again.
5. Run **pwd** before and after changing folders with **cd**.
6. Rename **hello.js** temporarily and see what message Node.js gives when the old file path is used. Then restore the correct name.

## Key points

- A code editor edits source files; a runtime executes them.
- A browser runs HTML pages and their connected browser scripts.
- Node.js runs JavaScript files outside the browser.
- The terminal's current folder matters when running a file by relative path.
- Correct file names and extensions prevent many beginner errors.
- Save files before reloading a page or running a script.
- A small folder structure is enough to begin learning JavaScript.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [03 - JavaScript engines and runtime environments](003-javascript-engines-and-runtime-environments.md) | [Open Q&A](../qnas/004-set-up-the-editor-terminal-and-project-files.md) | [Open example](../examples/004-set-up-the-editor-terminal-and-project-files.md) | [05 - Browser console and developer tools](005-browser-console-and-developer-tools.md) |
