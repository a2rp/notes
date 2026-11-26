# 26. Compilation vs Interpretation

Different ways language implementations execute programs.

Compilation vs interpretation

Compilation converts source code into a runnable form before execution. Interpretation runs code by reading and executing it step by step. Many modern runtimes use a hybrid approach (compile plus interpret).

Build step Run step Machine execution Hybrid runtimes Performance trade offs

Compilation vs interpretation

Click to collapse with beginner explanation and examples

### Simple meaning

Compilation

Convert your source code into a lower level runnable form first, then run it.

Think - "prepare once, run many times"

Interpretation

Run code by reading it and executing it directly, usually line by line or statement by statement.

Think - "read and run as you go"

### Why these exist

Why compile

- Faster execution speed

- Errors caught earlier

- Distribute binaries easily

- Better optimizations possible

Why interpret

- Fast edit and run cycle

- Portability via interpreter

- Great for scripting and tools

- Dynamic features easier

### Core pipeline (mental model)

Source

Code you write in a language like C, C++, Java, JavaScript.

Translation

Compiler or interpreter converts it into something the machine can execute.

Execute

CPU runs machine instructions, or a runtime runs bytecode.

Important truth

CPU only understands machine code. Everything else must be translated to machine instructions at some point.

### Examples you already know

C and C++

Usually compiled ahead of time into a native binary (machine code).

Java

Compiled into bytecode, then executed by the JVM with JIT compilation.

JavaScript

Executed by an engine (like V8) that parses, interprets, and JIT compiles.

Practical feel



```text
C program
- you build once
- you get an executable file
- it runs fast

JavaScript script
- you run it immediately in a browser or Node.js
- engine translates while running
- fast iteration, flexible runtime
```



### Hybrid approach (most modern)

Modern systems often do both: compile some parts, interpret some parts, and use JIT (Just In Time) compilation for hot code.

JIT

Just In Time compilation compiles code during execution when it becomes hot (runs many times).

Hot code - frequently executed code

AOT

Ahead Of Time compilation compiles before running. Faster startup, more predictable.

AOT is common in native apps

Why JIT helps

Runtime sees real behavior and can optimize based on what actually happens (types, branches, hot loops).

### Trade offs (quick table)

Speed

Compiled is often faster after build. Interpreted can be slower unless JIT optimizes.

Startup

Interpreted can start faster. Compiled may have build time but quick run.

Portability

Bytecode and interpreters can run on many platforms. Native binaries are platform specific.

Debugging

Interpreters can give nicer runtime feedback. Compilers catch many errors early.

### Full forms and key terms

CPU - Central Processing Unit

JIT - Just In Time

AOT - Ahead Of Time

JVM - Java Virtual Machine

V8 - JavaScript engine used by Chrome and Node.js

Bytecode - Intermediate code executed by a virtual machine

Interviews love one line - compilation usually translates before running, interpretation translates while running, and modern runtimes often combine both using JIT.

### Mini practice

Q Why can JIT make programs faster than plain interpretation?

A Because it compiles hot code into optimized machine code and avoids repeatedly interpreting the same instructions.

### Next topics

AST basics

Transpilers and bundlers

Compiler pipeline overview

Bytecode and virtual machines
