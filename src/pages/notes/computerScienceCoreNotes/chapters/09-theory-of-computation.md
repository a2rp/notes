# 09. Theory of Computation

Formal languages, automata, computability, and complexity concepts.

Theory of Computation

Automata, regex, CFG, Turing machine, decidability, and P vs NP - structured for quick revision.

Collapse

Start with "At a glance". Then read examples to lock the mental model.

Automata

At-a-glance summary and beginner examples

At a glance

- Automata are abstract machines that read input symbols and change states.

- Finite Automata are used for pattern matching and tokenization.

- Different automata have different power: DFA < NFA < PDA < TM.

What is an automaton

An automaton is a mathematical model of a machine that processes input step by step.

It has states and rules for moving between states based on input symbols.

It helps us formally define what problems a machine can solve.

Example

- A simple login validator can be seen as a state machine: start -> reading -> valid or invalid.

Finite Automata (DFA and NFA)

DFA (Deterministic Finite Automaton) has exactly one transition for each input symbol from a state.

NFA (Non-deterministic Finite Automaton) can have multiple possible transitions for the same symbol.

DFA and NFA accept the same class of languages called regular languages.

Quick intuition

- NFA is easier to design.

- DFA is easier to execute directly.

- Compilers usually convert NFA to DFA internally.

Common automata types

DFA

Deterministic, one path only. Used for fast matching.

NFA

Non-deterministic, multiple paths. Same power as DFA.

PDA

Pushdown Automaton with a stack. Used for CFG languages.

TM

Turing Machine. Most powerful classical model.

Regular expressions

At-a-glance summary and beginner examples

At a glance

- Regex describes regular languages.

- Regex is equivalent in power to DFA and NFA.

- Used heavily in lexers, search, validation, and parsing preparation.

What regex is

Regular expressions are patterns that describe sets of strings.

They are not just a programming feature. They come from formal language theory.

Regex patterns can be converted to automata, and automata can be converted back to regex.

Example patterns

- a* means empty or many a

- (ab)* means repeating ab blocks

- a|b means either a or b

- a.b means a then any char then b (programming regex style)

Where regex fits in real systems

Lexical analysis in compilers uses regex to define tokens like identifiers and numbers.

Search tools, log filters, and input validators use regex for quick matching.

Regex cannot match nested structures properly, that requires CFG.

Limitation example

- Matching balanced parentheses is not regular, so pure regex cannot do it correctly.

Context free grammar

At-a-glance summary and beginner examples

At a glance

- CFG describes languages with nested structure.

- Used for programming language syntax, parsers, and compilers.

- CFG is more powerful than regex because it can represent recursion.

What CFG is

A Context Free Grammar is a set of rules that generate strings by expanding non-terminals.

It is called context free because a rule can be applied regardless of surrounding symbols.

CFG is the foundation for parsing and syntax checking.

Mini CFG example

- E -> E + E | E * E | (E) | id

- This generates arithmetic expressions like id+id*id.

PDA connection

CFG languages are accepted by Pushdown Automata (PDA).

The stack helps handle nesting like parentheses and function calls.

Example

- Balanced parentheses can be recognized using a stack, push on '(' and pop on ')'.

Key CFG terms

Terminal

Actual symbols that appear in output string.

Non-terminal

Variables like E, S used for expansions.

Production

Rules like S -> aSb | ab.

Parse tree

Tree showing grammar expansions for a string.

Turing machine

At-a-glance summary and beginner examples

At a glance

- Turing Machine is a mathematical model of a general-purpose computer.

- Has an infinite tape, a head, and a state machine controller.

- Used to define what it means for a problem to be computable.

Core idea

A Turing Machine reads and writes symbols on a tape and moves left or right.

It can simulate any algorithm, given enough time and tape space.

This model is used to define the limits of computation.

Mental model

- Tape = memory

- Head = pointer that reads and writes

- State machine = program logic

Why TM matters

It helps answer: can a machine solve this problem at all, even with infinite time.

This separates computable problems from non-computable problems.

Example

- Halting problem is not computable, no TM can solve it for all programs.

Decidability

At-a-glance summary and beginner examples

At a glance

- Decidable means there exists an algorithm that always halts with yes or no.

- Undecidable means no algorithm can solve it for all inputs.

- Halting problem is the classic undecidable example.

Decidable problems

A problem is decidable if some Turing Machine halts on every input and answers correctly.

If it always finishes, we say the language is recursive.

Example

- Checking if a number is even is decidable, algorithm halts quickly.

Undecidable problems

A problem is undecidable if no algorithm exists that always halts and answers correctly for every input.

These are not problems of speed, they are problems of possibility.

Classic example

- Halting problem: given a program and input, decide whether it stops or runs forever.

Key difference

- Decidable means always halts with correct yes or no.

- Recognizable means may loop forever on some inputs but halts on accepted ones.

P vs NP

At-a-glance summary and beginner examples

At a glance

- P problems are solvable fast.

- NP problems have solutions verifiable fast.

- Big open question: Is P equal to NP.

What is P

P is the set of decision problems solvable in polynomial time, like O(n), O(n^2), O(n^3).

These are considered efficiently solvable.

Example

- Shortest path in a graph can be solved in polynomial time.

What is NP

NP is the set of decision problems where a proposed solution can be verified in polynomial time.

Important point: NP does not mean not polynomial. It means verifiable fast.

Example

- Given a Sudoku solution, checking it is correct is fast, but finding it may be hard.

NP-complete intuition

NP-complete problems are the hardest problems in NP.

If you solve one NP-complete problem in polynomial time, you can solve all NP problems in polynomial time.

Example

- SAT is NP-complete. Many problems reduce to SAT.

Fast revision table

P

Solve fast (polynomial time).

NP

Verify fast (polynomial time).

NP-complete

Hardest in NP, all NP problems reduce to these.

NP-hard

At least as hard as NP-complete, may not be in NP.

Interview tip - Explain power levels using the ladder: regex and DFA handle regular patterns, CFG handles nested structures, Turing machine defines full computability.
