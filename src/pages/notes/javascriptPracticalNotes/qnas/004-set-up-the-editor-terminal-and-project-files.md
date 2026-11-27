# 04 - Set up the editor, terminal, and project files - Questions and Answers

Use these questions to check that your editor, project folder, browser, terminal, and Node.js have distinct roles. Each answer follows its question directly.

## Multiple-choice questions

### 1. What is the main job of a code editor?

A. Edit and organize source files  
B. Automatically host every website  
C. Replace the JavaScript runtime  
D. Install every package used by a project

**Answer: A. Edit and organize source files.**

A code editor helps create, read, and change files. A browser or Node.js runs JavaScript in its own environment.

### 2. What does a terminal do?

A. Applies CSS to an HTML page  
B. Accepts commands and runs programs  
C. Replaces the editor's files  
D. Automatically fixes every syntax error

**Answer: B. Accepts commands and runs programs.**

The terminal runs commands from its current folder. For example, it can run Node.js with a JavaScript file path.

### 3. Which tool runs a page saved as an HTML file?

A. A browser  
B. Node.js only  
C. A text editor only  
D. A file extension

**Answer: A. A browser.**

A browser opens the HTML document and runs JavaScript connected to the page.

### 4. Which command checks whether Node.js is available in the terminal?

A. **node --version**  
B. **html --version**  
C. **browser --version**  
D. **css --version**

**Answer: A. node --version.**

When Node.js is installed and available on the terminal's command path, this command prints its version.

### 5. What does the command **node node/hello.js** do when run from the project root?

A. Opens the JavaScript file in the editor  
B. Asks Node.js to run that file  
C. Opens the browser's developer tools  
D. Changes the file extension

**Answer: B. Asks Node.js to run that file.**

The command uses Node.js as the runtime and gives it a relative path to the program.

### 6. What does **pwd** show in a terminal?

A. The current working folder  
B. The installed Node.js version  
C. The browser page title  
D. The current file's JavaScript output

**Answer: A. The current working folder.**

The current folder matters because a relative path is interpreted from that location.

### 7. What is the purpose of the **cd** command?

A. Create a CSS rule  
B. Change the terminal's current folder  
C. Close a browser tab  
D. Change a JavaScript variable

**Answer: B. Change the terminal's current folder.**

After changing directories, commands and relative file paths are interpreted from the new location.

### 8. Why should the full file name **hello.js.txt** be checked on Windows?

A. It is a special JavaScript syntax.  
B. The visible name may include an extra text-file extension, so it is not named **hello.js**.  
C. Node.js requires all files to end with **.txt**.  
D. Browsers cannot open text files.

**Answer: B. The visible name may include an extra text-file extension.**

Windows may hide known extensions in File Explorer. Showing extensions helps you see the actual name.

### 9. In the lesson's browser starter page, what does the **defer** attribute on the script element do?

A. It tells the browser to run the external script after the HTML has been parsed.  
B. It turns JavaScript into CSS.  
C. It saves the page automatically.  
D. It prevents the browser from loading the script.

**Answer: A. It tells the browser to run the external script after the HTML has been parsed.**

This allows the script in the example to find page elements that have already been parsed.

### 10. Which project layout matches the lesson's practice folder?

A. One folder for browser files and another for Node.js files  
B. A single file named **javascript-practice.txt**  
C. A folder for each line of JavaScript  
D. No folders or files

**Answer: A. One folder for browser files and another for Node.js files.**

Separating the two practice contexts makes it easier to know which runtime should run each program.

## True or false

### 11. Installing Visual Studio Code automatically installs Node.js.

**Answer: False.**

Editor support and runtime installation are separate. Node.js must be installed if you want to run JavaScript files directly with Node.js.

### 12. A browser can open an HTML page without Node.js being installed.

**Answer: True.**

A simple local HTML page can be opened in a browser. Node.js is used for standalone JavaScript and Node.js projects.

### 13. A JavaScript file shown in the editor has already been executed.

**Answer: False.**

The editor displays and edits the source. A browser or Node.js must run the program.

### 14. The terminal's current folder can affect whether a relative file path works.

**Answer: True.**

A path such as **node/hello.js** is resolved relative to the current folder.

### 15. The files should be saved before reloading the page or running the script.

**Answer: True.**

The browser and Node.js read the saved file contents. Unsaved editor changes are not included in what they run.

### 16. Node.js is required to run every JavaScript example in this course.

**Answer: False.**

Browser page examples run in a browser. Node.js is required only for the examples and chapters that use it.

## Short-answer questions

### 17. What is the difference between a code editor and a runtime?

**Answer:** A code editor creates and changes source files. A runtime executes JavaScript.

Visual Studio Code can edit JavaScript, while the browser or Node.js can run it.

### 18. What is a project folder?

**Answer:** A project folder is the main folder that holds the files and subfolders for a project.

Opening the folder in an editor gives the workspace a clear boundary and makes related files easier to find.

### 19. What is a relative file path?

**Answer:** A relative file path describes a file's location starting from the current folder rather than from a full system path.

For example, **node/hello.js** means a file named **hello.js** inside a **node** folder beneath the terminal's current folder.

### 20. Why does the chapter create separate browser and Node.js folders?

**Answer:** The folders make it clear which files are browser pages and which files should be run with Node.js.

This also helps avoid confusing browser APIs with Node.js APIs.

### 21. What should you do if the terminal cannot find the **node** command?

**Answer:** Confirm Node.js is installed, open a new terminal, and run **node --version** again. If the command is still unavailable, review the installer's setup instructions for the operating system.

A terminal that was already open before installation may not have refreshed its command path.

### 22. Why should you use a plain-text editor instead of a word processor for source code?

**Answer:** A word processor can add formatting, typography, or hidden characters that do not belong in a source file.

A code editor saves plain text with the file extension required by the browser or runtime.

### 23. What do the browser and Node.js each do in this setup?

**Answer:** The browser opens the HTML page and runs its connected page script. Node.js runs a JavaScript file directly from the terminal.

Each is a runtime for its own kind of program.

## Scenario questions

### 24. The browser page still displays "Waiting for JavaScript..." after you open it. What should you check?

**Answer:** Check that the HTML and JavaScript files are saved, that **app.js** is in the **browser** folder, and that the HTML script path is **./app.js**.

Then inspect the browser console for a loading or syntax error.

### 25. The terminal says it cannot find **node/hello.js**. What should you check first?

**Answer:** Run **pwd** to see the current folder, then check whether the **node** folder and **hello.js** file exist there.

Also check the exact spelling and extension of the file.

### 26. The editor colors JavaScript syntax, but the terminal cannot run a JavaScript file. Is that contradictory?

**Answer:** No. Syntax coloring is an editor feature. Running a file with the **node** command requires Node.js to be installed and available to the terminal.

### 27. A file appears as **hello.js.txt** in File Explorer. Why might the command fail?

**Answer:** The file is actually named **hello.js.txt**, while the command expects **hello.js**.

Show file-name extensions and rename it to the intended name.

### 28. You changed **app.js** in the editor, but the browser shows the old message. What should you do?

**Answer:** Save **app.js** and reload the HTML page.

If the old message remains, confirm that the browser opened the correct **index.html** file and that it links to the correct script path.

## Command and output questions

### 29. If the terminal is in the **javascript-practice** folder, what does this command run?

~~~text
node node/hello.js
~~~

**Answer:** It asks Node.js to run **hello.js** inside the **node** subfolder of the current project folder.

The relative path works because the command is run from the project root.

### 30. What output should this Node.js file produce?

~~~js
console.log("Hello from Node.js.");
console.log("2 + 3 = " + (2 + 3));
~~~

**Answer:**

~~~text
Hello from Node.js.
2 + 3 = 5
~~~

The terminal shows the strings passed to **console.log**. The arithmetic expression is evaluated by JavaScript before the second line is displayed.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [03 - JavaScript engines and runtime environments](../lessons/003-javascript-engines-and-runtime-environments.md) | [Open lesson](../lessons/004-set-up-the-editor-terminal-and-project-files.md) | [Open example](../examples/004-set-up-the-editor-terminal-and-project-files.md) | [05 - Browser console and developer tools](../lessons/005-browser-console-and-developer-tools.md) |
