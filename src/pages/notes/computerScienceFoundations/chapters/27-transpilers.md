# 27. Transpilers

How source code is translated between languages or language versions.

Transpilers

A transpiler is a source to source compiler. It converts code from one programming language to another programming language at a similar level. The goal is compatibility, readability, and tooling, not making machine code directly.

Source to source Keep meaning same Output is code Compatibility

Transpilers

Click to collapse with clear terms and examples

### Meaning

A **transpiler** converts one high level language into another high level language while keeping the same meaning.
It is used when you want to write in a modern or nicer language but need to run on an older or different environment.

What it produces

Output is still source code, not machine code.

Main goal

Compatibility and tooling, not raw speed.

### Transpiler vs Compiler vs Interpreter

Transpiler

Source language to source language. Example: TypeScript to JavaScript.

Compiler

Source language to lower level output like machine code or bytecode.

Interpreter

Runs code line by line or node by node without producing a final binary output.

A transpiler is still a compiler, but it is a specific type called source to source.

### Most common real world examples

TypeScript

Converts TypeScript to JavaScript so browsers can run it.

Babel

Converts modern JavaScript to older JavaScript for older browsers.

Sass

Converts Sass to CSS so browsers can use styles.

Example - modern JavaScript to older



```text
Input (modern JavaScript)
const add = (a, b) => a + b

Output (older JavaScript)
var add = function (a, b) {
  return a + b
}
```



### What happens inside a transpiler (simple)

Most transpilers follow a pipeline similar to compilers:
- parse input code into an AST
- transform the AST
- generate output code

Parse

Convert code into AST (Abstract Syntax Tree).

Transform

Change AST nodes to match target language features.

Generate

Turn AST back into readable output code.

AST idea

AST is a tree representation of your code. Tools change the tree, then print a new code version.

### Why front end and MERN devs use it

Language features

Use modern syntax and still support older runtimes.

Safety and tooling

TypeScript adds types, better editor help, and safer refactors.

Example - TypeScript to JavaScript



```text
Input (TypeScript)
type User = { id: number; name: string }

function greet(u: User) {
  return "Hello " + u.name
}

Output (JavaScript)
function greet(u) {
  return "Hello " + u.name
}
```



### Full forms and key terms

AST - Abstract Syntax Tree

JS - JavaScript

TS - TypeScript

CSS - Cascading Style Sheets

ES - ECMAScript

Transpilers are everywhere in modern web development. You write modern code, tools translate it into code your runtime can actually execute.

### Mini practice

Q Why is TypeScript called a transpiled language?

A Because TypeScript is converted into JavaScript source code before running.

Q Is transpiling done at runtime?

A Usually no. It is done in build time, then the output code runs.

### How to say it in interviews

- "A transpiler converts source code to source code. TypeScript to JavaScript is the classic example."

- "Most transpilers parse code into an AST, transform it, then generate new code."

- "The goal is compatibility and tooling, not producing machine code directly."

### Next topics nearby

Compilation vs interpretation

AST basics

Compiler pipeline

Babel and build tools
