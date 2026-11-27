# 01 - Introduction to JavaScript: Questions and Answers

Use these questions to check your understanding of the first lesson. Every answer appears directly after its question, with an explanation where it helps clarify the idea.

## Multiple-choice questions

### 1. What is JavaScript?

A. A markup language for describing page structure  
B. A programming language for writing instructions and behavior  
C. A database used to store web pages  
D. A browser

**Answer: B. A programming language for writing instructions and behavior.**

JavaScript can work with data, make decisions, and respond to events. HTML describes document structure, while a browser is an application that can run JavaScript.

### 2. What does ECMAScript refer to?

A. The standardized core language that JavaScript engines implement  
B. A web browser  
C. A JavaScript file extension  
D. A database query language

**Answer: A. The standardized core language that JavaScript engines implement.**

ECMAScript specifies the language rules. Browsers and other runtimes implement those rules and can provide additional environment-specific APIs.

### 3. Which statement best describes a JavaScript runtime environment?

A. It is only another name for a JavaScript variable.  
B. It runs JavaScript and may provide APIs for its host environment.  
C. It is a CSS file that styles JavaScript.  
D. It is required only when JavaScript is used with HTML.

**Answer: B. It runs JavaScript and may provide APIs for its host environment.**

A browser and Node.js can both run JavaScript, but they provide different host features. The runtime is more than the language syntax alone.

### 4. Where is `document` normally available?

A. In every JavaScript environment  
B. In a web page environment provided by a browser  
C. Only in CSS  
D. Only in Java

**Answer: B. In a web page environment provided by a browser.**

`document` represents the page document in a browser. A regular Node.js process does not provide a page document by default.

### 5. Which is a typical use of Node.js?

A. Describing the color of a heading  
B. Running JavaScript outside a web browser, such as in a server or command-line tool  
C. Replacing the ECMAScript language standard  
D. Defining HTML tags

**Answer: B. Running JavaScript outside a web browser, such as in a server or command-line tool.**

Node.js is a JavaScript runtime used beyond the browser. It provides its own APIs, including features relevant to servers and command-line programs.

### 6. Which statement about JavaScript and Java is correct?

A. JavaScript is a shorter version of Java.  
B. JavaScript and Java are separate programming languages.  
C. JavaScript programs must be written in Java first.  
D. They are two names for the same language.

**Answer: B. JavaScript and Java are separate programming languages.**

Their names are similar, but they have different language designs, tools, and common uses.

### 7. A program receives a name, combines it with a greeting, and displays the result. Which sequence describes this?

A. Output, input, processing  
B. Processing, output, input  
C. Input, processing, output  
D. Runtime, engine, language

**Answer: C. Input, processing, output.**

The name is the input, combining it with a greeting is the processing, and displaying the greeting is the output.

### 8. What causes an event-driven browser program to respond to a button press?

A. The browser reports a click event that JavaScript can handle.  
B. CSS executes a database query.  
C. HTML automatically changes JavaScript variables.  
D. Node.js sends the browser a Java class.

**Answer: A. The browser reports a click event that JavaScript can handle.**

The browser provides the event. JavaScript can register behavior that runs when that event occurs.

### 9. Which statement about browser and Node.js APIs is true?

A. Both environments always expose exactly the same APIs.  
B. APIs depend partly on the environment in which the code runs.  
C. Node.js always provides the browser's `document`.  
D. Browser JavaScript can always access the local file system directly.

**Answer: B. APIs depend partly on the environment in which the code runs.**

The language can be shared, but the host environment provides APIs and permissions. Browser-only APIs should not be assumed to exist in Node.js, and Node.js APIs should not be assumed to exist in a browser.

### 10. What does `console.log()` do in the introductory example?

A. It asks the environment's console to display a value.  
B. It creates a browser window.  
C. It changes the HTML standard.  
D. It sends a message to every user.

**Answer: A. It asks the environment's console to display a value.**

The precise place where the message appears depends on the environment. In a browser it can appear in developer tools; in Node.js it appears in the terminal.

## True or false

### 11. JavaScript can only be used to make web pages interactive.

**Answer: False.**

JavaScript also runs in Node.js and other environments. The environment determines what additional features are available.

### 12. HTML, CSS, and JavaScript have different but related roles on a web page.

**Answer: True.**

HTML describes structure and content, CSS controls presentation, and JavaScript can add behavior or update content.

### 13. Every JavaScript program has access to the browser's `document` object.

**Answer: False.**

`document` is a browser page API. A regular Node.js script does not have it by default.

### 14. A client-side form check is enough to secure important data sent to a server.

**Answer: False.**

Browser-side checks are useful for feedback, but users can bypass them. A server must validate important data it receives.

### 15. JavaScript and Java are the same programming language.

**Answer: False.**

They are separate languages despite their similar names.

## Short-answer questions

### 16. What is a program?

**Answer:** A program is a set of instructions that a computer can follow.

Those instructions can work with data, choose what to do, repeat work, or respond when an event occurs.

### 17. What is the difference between the JavaScript language and a runtime environment?

**Answer:** The language defines how JavaScript code is written and what its core constructs mean. A runtime environment runs that code and can provide APIs for interacting with a host, such as a browser page or an operating system.

This distinction explains why syntax such as a function can be understood in several runtimes while a browser API such as `document` is not automatically available in each one.

### 18. What is ECMAScript?

**Answer:** ECMAScript is the standardized core language that JavaScript engines implement.

It describes language rules. Browser and Node.js APIs are supplied by their respective environments rather than by the core language alone.

### 19. Name one task JavaScript can perform in a browser and one task it can perform with Node.js.

**Answer:** In a browser, JavaScript can respond to a button click and update page text. With Node.js, it can run a command-line tool or server program.

These are examples, not limits. The available APIs depend on the runtime.

### 20. What does input, processing, and output mean?

**Answer:** Input is information a program receives, processing is what it does with that information, and output is the result it produces.

For a greeting, a name is the input, joining the name to a greeting is the processing, and showing the message is the output.

### 21. What is an event?

**Answer:** An event is a notification that something happened, such as a click, key press, form submission, or response from a server.

A program can register behavior to run when an event occurs.

### 22. Why should a browser-side validation check not be the only validation for important data?

**Answer:** Browser-side code runs on a user's device and can be changed or bypassed. The server that receives important data must check it independently.

Client-side checks still help users catch mistakes earlier and improve feedback.

### 23. Does a message from `console.log()` always appear on the web page?

**Answer:** No. It appears in the environment's console, which is usually the browser developer console or a terminal when using Node.js.

To show text in a page, a program needs to update page content using browser APIs, which will be covered in later chapters.

## Scenario questions

### 24. You run a JavaScript file in Node.js and see an error saying `document` is not defined. Why?

**Answer:** The code expects a browser page API, but the regular Node.js environment does not provide a page `document` by default.

Run that code in a browser page or change the program to use APIs available in Node.js. A separate library can also simulate a document in some Node.js projects, but it must be deliberately added.

### 25. A web page has correct HTML and CSS, but a button does nothing when clicked. What role could JavaScript play?

**Answer:** JavaScript can listen for the button's click event and run the intended action.

HTML can provide the button and CSS can style it, but behavior must be provided by appropriate page logic or native browser behavior.

### 26. A developer says, "My form checks the email in JavaScript, so the server can trust it." Is that a safe conclusion?

**Answer:** No. The browser check is useful feedback, but it can be skipped or modified. The server must validate the submitted data independently.

### 27. A code sample works in a browser but fails in Node.js because it uses a browser storage API. What should you check?

**Answer:** Check which APIs the code depends on and whether the current runtime provides them.

The core JavaScript language may be supported in both places while host-specific APIs differ.

## Code-reading questions

### 28. What does this program display?

~~~js
const language = "JavaScript";
console.log("Learning " + language);
~~~

**Answer:**

~~~text
Learning JavaScript
~~~

The first line stores text in a variable. The second line combines two text values and sends the result to the console.

### 29. In the following model, identify the input, processing, and output: a program receives the number 4, doubles it, and displays 8.

**Answer:** The input is 4, the processing is multiplying it by 2, and the output is 8.

### 30. What information is missing if someone says only, "This JavaScript program uses `document`"?

**Answer:** We still need to know which runtime or host environment runs the code.

`document` normally refers to a browser page API, so the code needs a web page environment or another environment that deliberately provides a compatible document object.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| - | [Open lesson](../lessons/001-introduction-to-javascript.md) | [Open example](../examples/001-introduction-to-javascript.md) | [02 - JavaScript on the web: HTML, CSS, and JavaScript roles](../lessons/002-javascript-on-the-web-html-css-and-javascript-roles.md) |
