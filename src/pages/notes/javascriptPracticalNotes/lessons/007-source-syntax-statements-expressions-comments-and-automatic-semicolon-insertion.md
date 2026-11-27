# 07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion

JavaScript source code is text that the engine reads and parses before it runs. Learning the basic pieces of that text helps you read programs, write comments clearly, and avoid surprising behavior when a line break appears near an expression.

## From characters to a program

A JavaScript file contains characters arranged into meaningful tokens and grammatical structures. Tokens include names, keywords, literals, operators, and punctuation.

For example:

~~~js
const total = 4 + 6;
~~~

The engine reads tokens such as **const**, **total**, **=**, the number literals, **+**, and **;**. It then checks whether those tokens form valid JavaScript syntax. If the syntax is valid, the runtime can execute the code.

Whitespace such as spaces and indentation usually makes source code easier to read without changing its meaning. Line terminators also separate source lines, but they can affect automatic semicolon insertion in specific situations.

A syntax error means the source could not be parsed as valid JavaScript. A runtime error happens after parsing, while the program is executing.

## Statements and expressions

An **expression** is code that evaluates to a value. Examples include:

~~~js
2 + 3
name
price * quantity
getGreeting()
~~~

The expression **2 + 3** evaluates to the number **5**. A function call expression can evaluate to whatever value the function returns.

A **statement** is an instruction or declaration that forms a step in a program. Examples include:

~~~js
const price = 4;
let quantity = 2;
console.log(price * quantity);
~~~

The first two lines are declarations. The last line is an expression statement: it evaluates a function call as an instruction. Its visible effect is writing output to the Console.

Common statement forms include:

- **Declarations**, such as **const**, **let**, **var**, and function declarations.
- **Expression statements**, such as an assignment or function call used as a step.
- **Control-flow statements**, such as **if**, **for**, and **while**.
- **Block statements**, which group statements inside braces.
- **Return statements**, which end a function and optionally provide a value.

An expression can appear inside a larger expression. For example, **price * quantity** is an expression used as an argument to **console.log**. A declaration such as **const price = 4** is not an expression that produces a value you can use as an argument.

Braces often mark the body of a function, condition, loop, or class. In a block, multiple statements are grouped:

~~~js
if (quantity > 0) {
  console.log("Items are available");
  console.log("Quantity:", quantity);
}
~~~

Indentation helps people see the block structure. JavaScript uses braces and grammar, not indentation alone, to determine the block.

## Comments

Comments explain source code to people. JavaScript has single-line comments and block comments.

A single-line comment begins with **//** and continues to the end of the line:

~~~js
// Calculate a subtotal before adding tax.
const subtotal = 12 * 3;
~~~

A block comment begins with **/* ** and ends with ** */**. It can span multiple lines:

~~~js
/*
  This calculation uses a fixed rate.
  A real application may load the rate from data.
*/
const tax = subtotal * 0.1;
~~~

Comments are not executed as JavaScript. They can describe intent, assumptions, or a reason for a non-obvious decision. Prefer comments that add useful context instead of repeating what a clear line already says.

Comment markers are not comments when they occur inside a string or template literal:

~~~js
const urlText = "https://example.test/page";
const markerText = "Use // to begin a single-line comment";
~~~

Here the slash characters are part of string values. The parser treats text inside a string according to string syntax.

A block comment cannot contain another block comment by nesting **/* ... */** markers. Close a block comment before starting another one.

### Comments and line breaks

A line comment ends before its line terminator. The line terminator still separates source code after the comment. A block comment can include a line terminator too. That line break can matter to automatic semicolon insertion, even though the comment text is ignored.

~~~js
const count = 1; // This comment does not consume the next line.
const nextCount = count + 1;
~~~

## Semicolons

A semicolon **;** marks the end of many JavaScript statements and declarations. Many code styles write semicolons explicitly:

~~~js
const firstName = "Asha";
const greeting = "Hello, " + firstName;
console.log(greeting);
~~~

Some code styles omit many semicolons because JavaScript has automatic semicolon insertion. Both styles are common. Consistency and understanding where line breaks matter are more important than relying on a formatter's appearance.

Automatic semicolon insertion, often shortened to **ASI**, is part of JavaScript parsing. It does not mean “put a semicolon at every newline.” The parser inserts a semicolon only in specified situations.

## The practical ASI rules

At a high level, automatic semicolon insertion can happen when:

1. The parser encounters a token that cannot continue the current grammar, and a line terminator separates it from the previous token.
2. The input ends while the parser needs a statement terminator.
3. A line terminator appears where the grammar forbids one, such as between **return** and its expression or between a value and a postfix **++** or **--** operator.

The language also has constraints on where an inserted semicolon is allowed. For example, insertion does not simply fill either semicolon slot in a **for** loop header.

These details explain why source layout can affect how code is interpreted. They do not make every newline a statement boundary.

### A line break can continue an expression

Tokens such as **(**, **[**, **/**, **+**, and **-** can continue an expression from the previous line. This can produce code that parses differently than a beginner expects.

~~~js
const label = "ready"
[0].toUpperCase();

console.log(label);
~~~

The bracket on the next line can be read as property access on the string expression. The declaration is effectively treated like this:

~~~js
const label = "ready"[0].toUpperCase();
~~~

The value of **label** is **"R"**, not the full word **"ready"**. Put a semicolon after the declaration to make the intended boundary explicit:

~~~js
const label = "ready";
[0].toUpperCase();
~~~

The second statement now begins a separate array expression. A formatter or linter can help catch risky line starts.

A plus sign can also continue an expression:

~~~js
const total = 4
+ 6;
~~~

This evaluates as **4 + 6**, so **total** is **10**. The line break did not end the declaration.

## Restricted line breaks

Some JavaScript syntax does not allow a line terminator in a particular position. A line break there changes parsing or makes the program invalid.

### return followed by a line break

A line terminator immediately after **return** ends the return statement through automatic semicolon insertion:

~~~js
function getAnswer() {
  return
  42;
}

console.log(getAnswer());
~~~

This function returns **undefined**. The parser treats it like:

~~~js
function getAnswer() {
  return;
  42;
}
~~~

Write the expression on the same line as **return** or place an opening parenthesis after it on that same line:

~~~js
function getAnswer() {
  return 42;
}
~~~

### throw followed by a line break

A line terminator cannot appear between **throw** and the expression it throws. This is a syntax error:

~~~js
throw
new Error("Something went wrong");
~~~

Keep the expression on the same line:

~~~js
throw new Error("Something went wrong");
~~~

### break and continue labels

A line terminator after **break** or **continue** ends the statement. Labels are an advanced feature, but the line break rule is useful to know when reading code that uses them.

### Increment and decrement

A line terminator between a value and a postfix **++** or **--** means the operator cannot be treated as postfix across that line. If you are learning these operators, keep the operand and postfix operator together and use explicit statement boundaries.

## Common ASI misconceptions

- **“A newline always ends a statement.”** False. A newline can occur inside an expression, and some tokens continue the previous expression.
- **“ASI makes semicolons unnecessary in every situation.”** False. Some line breaks can change behavior or cause a syntax error.
- **“Comments remove their line breaks.”** False. Comment text is ignored, but a line terminator inside or after a comment can still matter.
- **“A semicolon is just decoration.”** False. It can make a statement boundary explicit and prevent accidental continuation.
- **“The formatter proves the code means what I intended.”** A formatter can standardize layout, but you still need to understand the syntax and review the result.

## A practical style

For clear beginner code:

- Use one statement per line.
- Follow the semicolon style used by the project.
- If the project does not have a style yet, explicit semicolons are a clear choice for practice.
- Avoid starting a new line with **(**, **[**, **/**, **+**, or **-** when the previous line may be an unfinished expression.
- Keep **return** and **throw** expressions on the same line as their keywords.
- Use braces for multi-line control-flow bodies.
- Use comments for context, assumptions, or explanations that are not obvious from the code.
- Use a formatter consistently, then review the code it produces.

## Try it yourself

1. Label each part of **const total = price * quantity;** as a keyword, identifier, operator, expression, and statement.
2. Write a single-line comment and a block comment describing a calculation.
3. Put **2 + 3** on separate lines without a semicolon after **2**. Observe that the plus sign continues the expression.
4. Run the **label** example without the semicolon and inspect its value. Then add the semicolon and compare.
5. Run the **return** example and explain why it returns **undefined**. Move the value onto the same line and compare.
6. Add a line break between **throw** and **new Error(...)** in a practice file. Read the syntax error, then fix it.
7. Put a line comment after a declaration and write another declaration on the next line. Confirm that the second declaration still runs.
8. Reformat a small file with one statement per line and consistent semicolons.

## Key points

- JavaScript source is parsed into tokens and grammatical structures before execution.
- Expressions evaluate to values; statements perform program steps or declare bindings.
- Comments are ignored as code, but line terminators around comments can still affect parsing.
- Automatic semicolon insertion follows specific grammar rules and is not a simple newline rule.
- A line break after **return** can end the return statement, while a line break after **throw** can make the code invalid.
- Tokens such as **(** and **[** can continue an expression from the previous line.
- Explicit, consistent statement boundaries make beginner code easier to read and debug.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [06 - ECMAScript editions, proposals, and compatibility](006-ecmascript-editions-proposals-and-compatibility.md) | [Open Q&A](../qnas/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [Open example](../examples/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [08 - Identifiers, keywords, reserved words, and naming](008-identifiers-keywords-reserved-words-and-naming.md) |
