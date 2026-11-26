# 24. Compiler Basics

The stages that translate source code into executable behavior.

Compiler basics

Compiler basics explains how your source code becomes something a machine can run. It covers compilation vs interpretation, Abstract Syntax Tree (AST), and transpilers, which are common in modern JavaScript and frontend tooling.

Parse and AST Machine runnable output Transpile languages Tooling foundation

Compiler basics

Click to collapse with simple pipeline and examples

### What is a compiler (simple meaning)

A **compiler** is a program that converts source code into another form, usually a lower level form that a machine can run.
- Example: C code compiled into machine code binary
- Example: TypeScript compiled into JavaScript

Why compilers exist

Computers understand machine code. Humans write high level code. The compiler bridges that gap.

What you get

Faster execution, error checking before running, and optimized output.

### Compilation vs interpretation

These two are common ways to run code.
- **Compilation** converts the full program to an output first, then runs it.
- **Interpretation** runs code step by step without producing a full binary upfront.

Compilation

- Translate first, run later

- Errors are caught before execution

- Output can be very fast

Interpretation

- Run line by line or node by node

- Errors may appear during execution

- Easier to be interactive

Real world note

Many modern systems are hybrid. JavaScript engines use JIT which is Just In Time compilation.

Simple example



```text
C language:
- Write hello.c
- Compile to a binary
- Run the binary

JavaScript:
- Write hello.js
- The engine parses and runs it
- It can also optimize hot code using JIT
```



### The compilation pipeline (big picture)

Most compilers follow a pipeline. You do not need all details now, but you should know the major steps.

1 - Lexing

Break source code into tokens. Token example: keyword, identifier, number.

2 - Parsing

Build a tree structure from tokens. This tree is the AST.

3 - Semantic checks

Validate meaning, types, scope rules, and variable declarations.

4 - IR

Convert to Intermediate Representation for optimization and portability.

5 - Optimize

Remove dead code, simplify expressions, improve performance.

6 - Codegen

Generate machine code or target language output.

Token and AST intuition



```text
Code:
a = b + 1

Tokens:
- identifier a
- equals =
- identifier b
- plus +
- number 1

AST (simplified):
Assign(
  left: Identifier(a),
  right: Add(Identifier(b), Number(1))
)
```



### AST - Abstract Syntax Tree

An **AST** is a tree that represents the structure of code in a clean, meaningful way. It removes unnecessary characters like spaces and focuses on the syntax structure.

Why AST matters

Tools like linters, formatters, and transpilers work by reading and editing AST.

Frontend example

ESLint checks code rules using AST. Prettier formats code using AST.

AST is not a parse tree

A parse tree contains more grammar detail. AST is simplified and focuses on meaning.

### Transpilers (why they exist)

A **transpiler** converts code from one high level language to another high level language. It is used to support older runtimes or add syntax features.

Common examples

- TypeScript - to JavaScript

- Babel - modern JavaScript to older JavaScript

- JSX - to JavaScript function calls

Why it is useful

- Use new syntax safely

- Support older browsers

- Add build time checks

JSX transpile intuition



```text
JSX:
<button>Save</button>

After transpile (idea):
React.createElement("button", null, "Save")
```



A transpiler is like translation between human languages. A compiler is like translation into machine language or a lower level form.

### Full forms and key terms

AST - Abstract Syntax Tree

IR - Intermediate Representation

JIT - Just In Time (compilation)

CPU - Central Processing Unit

JSX - JavaScript XML (syntax extension used by React)

### Mini practice

Q Why do tools like ESLint need an AST?

A Because an AST represents code structure reliably. It lets tools understand meaning, not just raw text.

Q TypeScript compilation is closer to which idea?

A Transpiling, because it converts high level TypeScript to high level JavaScript.

### How to say it in interviews

- "Compilation translates a whole program to an output first. Interpretation runs step by step."

- "AST is a simplified tree representation of code structure used by linters, formatters, and transpilers."

- "Transpilers convert one high level language to another, like TypeScript to JavaScript."

- "Many modern runtimes are hybrid, like JavaScript engines using JIT compilation."

### Next topics

Lexing and parsing deeper

IR and optimizations

Bytecode and virtual machines

JIT and runtime optimizations
