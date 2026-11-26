# 06. Compiler Design

Language processing, lexical analysis, parsing, semantic checks, and code generation.

Compiler Design

At-a-glance revision notes for compiler phases, parsing, and automata used in lexing.

Collapse

Scan "At a glance" first. Then read examples to connect grammar and automata ideas to real code behavior.

Compiler Phases

Quick revision points and beginner examples

At a glance

- Compiler converts source code into machine code step by step.

- Each phase produces output for the next phase.

- Errors are found at different phases like syntax vs semantics.

What is a compiler

A compiler is a program that translates high-level source code into a lower-level form like assembly or machine code.

It also checks errors and tries to optimize code for better performance.

Example

- C or C++ code is compiled into an executable.

- Java is compiled into bytecode that runs on the JVM.

Lexical analysis

Lexical analysis breaks the source code into tokens like keywords, identifiers, numbers, and operators.

This phase removes whitespace and comments and produces a token stream for the parser.

Example tokenization

- Code: int x = 10;

- Tokens: [int] [identifier:x] [=] [number:10] [;]

Syntax analysis and parsing

Syntax analysis checks whether the token sequence follows grammar rules.

Parsing builds a parse tree or syntax tree that represents the structure of the program.

Example

- Code: x = 10 + 2

- Parser checks that assignment and expression rules are valid.

Semantic analysis

Semantic analysis checks meaning, not just grammar.

It checks types, variable declarations, scope rules, and function argument matching.

Example semantic errors

- int x = 'hello' - type mismatch

- y = 5 - y not declared

Intermediate code generation

Compiler converts the syntax tree into an intermediate representation (IR).

IR is easier to optimize and can be reused for different target machines.

Example IR idea

- Expression: a = b + c

- IR: t1 = b + c, a = t1

Optimization

Optimization improves performance or reduces memory without changing program output.

It can remove dead code, reduce redundant calculations, and simplify expressions.

Example optimization

- x = 2 * 8 can become x = 16

- Repeated: (a + b) used many times can be computed once

Code generation

Final phase converts IR into target code like assembly or machine instructions.

It includes register allocation and instruction selection.

Example output

- IR becomes assembly instructions like MOV, ADD, JMP

- Then assembler turns it into machine code bytes

Parsing Types

Quick revision points and beginner examples

At a glance

- LL parsing is top-down. It predicts productions from left to right.

- LR parsing is bottom-up. It reduces input into grammar rules.

- LR is more powerful than LL for many grammars.

Parsing in simple words

Parsing is the process of taking tokens and building structure.

The parser tries to match token sequences to grammar rules so the compiler understands code.

Beginner mental model

- Tokens are like words.

- Grammar is like sentence rules.

- Parser checks if the sentence is valid and builds a tree.

Quick intuition

- LL tries to expand rules to match input.

- LR tries to reduce input back into rules.

- If grammar is complex, LR usually handles it better.

Common parser families

LL parser

Top-down parsing. Reads input Left to right and produces Leftmost derivation. Often easier to implement but less powerful.

LR parser

Bottom-up parsing. Reads input Left to right and produces Rightmost derivation in reverse. More powerful and common in real compilers.

Automata Basics

Quick revision points and beginner examples

At a glance

- Automata are machines that recognize patterns.

- Lexer often uses automata to recognize tokens.

- DFA is deterministic, NFA is nondeterministic.

Why automata matters in compilers

Lexical analysis needs a fast way to recognize patterns like identifiers, numbers, and keywords.

Regular expressions define token patterns, and automata can implement them efficiently.

Example

- Identifier pattern: letter followed by letters or digits

- Number pattern: digits with optional decimal part

Common interview note

- Regex to NFA is straightforward.

- NFA to DFA uses subset construction.

- DFA is usually preferred for fast tokenizing.

DFA vs NFA

NFA

Nondeterministic Finite Automaton. Can have multiple possible next states for the same input. Easier to build from regex.

DFA

Deterministic Finite Automaton. Only one next state per input. Faster to run. NFA can be converted to DFA.

At a Glance Map

Quick revision points and beginner examples

At a glance

- Lexer turns text into tokens.

- Parser turns tokens into a tree.

- Semantic phase checks meaning and types.

One-line flow

Lexical

Characters to tokens

Parsing

Tokens to parse tree or AST

Semantic

AST plus symbol table checks

IR

AST to intermediate code

Optimize

IR improvements

Generate

IR to assembly or machine code

Interview tip - Explain the pipeline with one small example and show where each error type is caught: lexical, syntax, semantic.
