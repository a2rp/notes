# 01 - Introduction to JavaScript

JavaScript is a programming language that lets a program respond to information, make decisions, and perform actions. You will first meet it in the browser, where it can react to clicks, update a page, and request data. The same language is also used in server programs, command-line tools, and other environments.

This chapter introduces what JavaScript is, where it runs, and how it fits into a program. It gives you a small first program without expecting you to know the language already.

## Learning goals

After this chapter, you should be able to:

- Describe JavaScript in your own words.
- Name a few kinds of programs JavaScript can build.
- Explain the difference between the JavaScript language and the environment that runs it.
- Recognize that a browser and Node.js provide different environment features.
- Read and run a very small JavaScript program.

## What is JavaScript?

JavaScript is a general-purpose programming language. A program is a set of instructions that a computer can follow. JavaScript instructions can work with data, make choices, repeat operations, organize reusable behavior, and respond to events.

For example, a JavaScript program can:

- Respond when someone presses a button.
- Check whether a form field has a value before showing a message.
- Update a page with new information.
- Ask a server for data and show the result.
- Process files or automate a repeated task in an environment that allows it.
- Run server-side code with a runtime such as Node.js.

JavaScript is not limited to websites. The environment determines which additional capabilities are available to a program.

## JavaScript is not Java

JavaScript and Java are separate programming languages. Their names look similar, but learning one does not mean you already know the other. They have different language designs, tools, and common uses.

## The language and the environment

It helps to separate two ideas:

1. **The language** defines the rules for writing JavaScript, such as values, variables, functions, and operators.
2. **The environment** runs the program and may provide extra features for interacting with a host system.

The core language is standardized as ECMAScript. JavaScript engines implement that language standard. An engine alone is not the whole environment a program uses.

A web browser provides browser-specific features such as the page document, user events, and browser storage. Node.js provides server and operating-system features such as file access and process information. Some JavaScript features are common to both environments, while others exist only in one environment.

For example, `document` is provided by a web page environment. A regular Node.js script does not have a web page document by default. Code that uses `document` therefore needs an environment that provides it.

This course will introduce the language first, then cover browser APIs and Node.js APIs in their own chapters.

## What JavaScript does on a web page

A web page can combine three technologies:

- **HTML** describes the content and structure.
- **CSS** controls presentation and layout.
- **JavaScript** can add behavior and update the page in response to events or data.

JavaScript does not replace HTML or CSS. A useful web page often uses all three, each for a different job. The next chapter explains these roles in more detail.

## A simple program

Here is a short JavaScript program:

~~~js
const learner = "Maya";
const topic = "JavaScript";

console.log("Hello, " + learner + "!");
console.log("Today we are starting " + topic + ".");
~~~

When this code runs, the environment's console displays:

~~~text
Hello, Maya!
Today we are starting JavaScript.
~~~

The program stores two pieces of text, then asks the console to display messages using that text. The `const` declarations and string values will be explained in later chapters. For now, notice that the program is a sequence of instructions and that the output comes from `console.log()`.

## Input, processing, and output

Many programs can be understood using this simple model:

1. **Input** is information the program receives. It might come from a person, a file, a web page, or a server.
2. **Processing** is the work the program does with that information. It might check, transform, compare, or organize data.
3. **Output** is the result the program produces. It might be text, a changed page, a saved file, or a response sent to another system.

For a greeting program, a person's name could be the input, combining it with a greeting would be the processing, and displaying the greeting would be the output.

Not every program needs visible input from a person. A program may process a scheduled task, react to a network response, or run through a list of data.

## Programs can react to events

An event is something the environment reports has happened. Examples include a button click, a key press, a form submission, or a server response.

A common browser program waits for an event and then performs an action:

- The user activates a button.
- The browser reports the click event.
- JavaScript handles the event.
- The page changes or another action takes place.

You will learn the exact event APIs later. At this point, remember that JavaScript can describe behavior that runs when something happens, instead of only producing output once.

## Where can JavaScript run?

### In a browser

A browser can run JavaScript associated with a web page. The page's JavaScript can work with the document and browser features that the browser makes available. This is how pages can respond to user actions and update content without replacing the entire page.

### In Node.js

Node.js is a JavaScript runtime that runs JavaScript outside a web browser. It is commonly used for server programs and command-line tools. It also provides APIs that are different from browser APIs.

### In other environments

JavaScript can be embedded in other products and tools. The same language can be used in different environments, but available APIs and restrictions vary. Do not assume that a browser-only feature exists everywhere JavaScript runs.

## A beginner's mental model

When reading a JavaScript program, ask:

1. What information does the program have?
2. What instructions does it follow?
3. What causes those instructions to run?
4. What result can I observe?

These questions help you understand a program before worrying about every symbol or technical detail.

## What JavaScript does not automatically provide

The language by itself does not decide how a page looks, where a program runs, or which system resources it can access. Those things depend on the environment and its rules.

A web page also should not rely on JavaScript checks as the only security check for important data. Browser code can help users catch mistakes early, but a server must independently check data it receives. Security will be discussed in later chapters.

## Common misunderstandings

| Misunderstanding | Correction |
| --- | --- |
| JavaScript is another name for Java. | They are different programming languages. |
| JavaScript only runs in browsers. | It also runs in Node.js and other environments. |
| Every JavaScript environment has the same APIs. | The core language may be shared, while host APIs differ. |
| JavaScript automatically handles every part of a web page. | HTML, CSS, JavaScript, and the browser each have distinct roles. |
| A program's output must appear on the page. | Output may appear in a console, update a page, write a file, or use another environment-specific mechanism. |
| A browser-side check makes submitted data secure. | Important data must also be validated by the server that receives it. |

## Try it yourself

1. In your own words, write one sentence describing JavaScript.
2. Name one task a browser program might do and one task a Node.js program might do.
3. In the sample program, change `Maya` to another name and read the output again.
4. Identify the input, processing, and output in the greeting example.
5. Explain why code that refers to `document` needs an environment that provides a web page document.

## Key points

- JavaScript is a general-purpose programming language.
- ECMAScript is the standardized core language; an engine runs JavaScript in a host environment.
- Browsers and Node.js provide different environment APIs.
- JavaScript can respond to events, process data, and produce output.
- HTML, CSS, and JavaScript have related but distinct roles on a web page.
- JavaScript is not the same language as Java.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| - | [Open Q&A](../qnas/001-introduction-to-javascript.md) | [Open example](../examples/001-introduction-to-javascript.md) | [02 - JavaScript on the web: HTML, CSS, and JavaScript roles](002-javascript-on-the-web-html-css-and-javascript-roles.md) |
