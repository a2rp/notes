# 25. Abstract Syntax Trees

How parsers represent source code as a structured tree.

AST

AST means Abstract Syntax Tree. It is a tree representation of your code where each node represents a meaningful construct like an expression, statement, variable, or function. Compilers, interpreters, linters, and formatters use AST to understand code structure.

Tree of code meaning Used by compilers Powers lint and format Enables transforms

AST

Click to collapse with beginner explanation and real examples

### Meaning

An **Abstract Syntax Tree** is a tree that represents the structure of code after parsing. It removes unnecessary text details (like extra spaces) and keeps only the real meaning.

Why it is called abstract

It ignores formatting and focuses on structure.
Example: spaces and line breaks do not change the AST.

Why it is a tree

Code has nested structure.
Expressions contain smaller expressions, so a tree fits naturally.

### From code to AST - the pipeline

Most language tools follow a similar flow. The names can vary, but the idea is the same.

1 - Lexing

Break code into tokens.
Token examples: identifiers, numbers, operators.

2 - Parsing

Convert tokens into an AST.
This checks grammar rules.

3 - Analysis

Validate meaning.
Types, scopes, variables, etc.

4 - Transform

Change AST to optimize or rewrite.
Example: transpile modern syntax.

5 - Generate

Produce output.
Machine code or bytecode or JS code.

Key terms

Lexing - converting text to tokens

Token - smallest meaningful unit

Parsing - building the AST from tokens

### Simple AST example

Consider this code. AST represents the "meaning" of this expression.

Code



```text
a = 2 + 3 * 4
```



Why AST helps

Multiplication has higher precedence than addition. AST stores this correctly, so tools do not get confused by plain text.

AST shape (simplified)



```text
Assign
- left: Identifier(a)
- right: Add(+)
  - left: Number(2)
  - right: Multiply(*)
    - left: Number(3)
    - right: Number(4)
```



Without AST

A tool might read left to right and get wrong meaning.

With AST

The tree clearly tells what happens first.

### Where you see AST in real dev life

Linting

ESLint parses code to AST to find patterns like unused variables.

Formatting

Prettier formats code by printing from AST, not by regex.

Transpiling

Babel reads AST and rewrites modern syntax into older syntax.

Minification

Tools rename variables safely using AST rules.

Compiler

C, C++, Java compilers use AST to analyze and optimize.

IDE features

Autocomplete and go to definition often rely on AST.

### AST vs Parse tree

A **parse tree** shows every grammar step. An **AST** is a simplified tree that focuses on meaning. Most developer tooling talks about AST.

Parse tree

Very detailed, includes grammar rules and symbols.

AST

Cleaner and easier for tools to transform and analyze.

### Full forms and terms

AST - Abstract Syntax Tree

IDE - Integrated Development Environment

JS - JavaScript

CPU - Central Processing Unit

If you can explain AST, you automatically understand how linting, formatting, and transpilers work under the hood.

### Mini practice

Q Why does Prettier need AST instead of regex?

A Because AST understands code meaning and nesting. Regex can break on complex syntax and edge cases.

Q Does spacing change AST?

A No. Spacing is formatting. AST keeps the same structure.

### How to say it in interviews

- "AST is a tree representation of code meaning created by parsing tokens."

- "Tools like ESLint, Prettier, and Babel work by reading and transforming AST."

- "AST encodes operator precedence and nesting, so transformations stay correct."

### Next in compiler basics

Compilation vs interpretation

Transpilers and why they exist

Lexing, parsing, semantic analysis
