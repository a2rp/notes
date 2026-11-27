# 07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion: example

This example is a complete HTML page with JavaScript that logs several syntax examples to the browser Console. It compares safe statement boundaries with line breaks that continue an expression.

## Goal

You will see that:

- Expressions evaluate to values.
- Declarations and function calls are statements in their program context.
- Comments are ignored as code.
- A line break does not always end a statement.
- A newline after **return** can change the returned value.
- Explicit semicolons can make intended statement boundaries clear.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the full code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript syntax and ASI practice</title>
</head>
<body>
  <main>
    <h1>JavaScript syntax and ASI practice</h1>
    <p>
      Open the browser developer tools and select the Console to see the
      examples. The page source contains comments and deliberate line breaks.
    </p>
  </main>

  <script>
    // These declarations and expressions use explicit statement boundaries.
    const price = 4;
    const quantity = 2;
    const total = price * quantity;

    console.log("Total:", total);

    function getAnswerOnOneLine() {
      return 42;
    }

    function getAnswerAfterLineBreak() {
      return
      42;
    }

    console.log("Same-line return:", getAnswerOnOneLine());
    console.log("Return followed by a line break:", getAnswerAfterLineBreak());

    // The plus sign continues the expression from the previous line.
    const sum = 4
    + 6;

    console.log("Plus continues the expression:", sum);

    // The bracket continues the array expression instead of starting a new one.
    const unexpectedValue = [10, 20]
    [0];

    // This version uses a semicolon to end the declaration explicitly.
    const intendedArray = [10, 20];

    console.log("Value after bracket continuation:", unexpectedValue);
    console.log("Is that value an array?", Array.isArray(unexpectedValue));
    console.log("Is the intended value an array?", Array.isArray(intendedArray));

    // The slash characters below are string content, not comment markers.
    const exampleAddress = "https://example.test/page";

    /*
      This block comment is ignored by JavaScript.
      It can explain context for someone reading the source.
    */

    console.info("Syntax and ASI practice page loaded.");
    console.log("String containing slash characters:", exampleAddress);
  </script>
</body>
</html>
~~~

## Run the example

1. Save **index.html**.
2. Open it in a browser.
3. Open the browser developer tools and select the Console.
4. Reload the page if the Console is already open.
5. Read the messages in the order shown.

## Expected Console output

~~~text
Total: 8
Same-line return: 42
Return followed by a line break: undefined
Plus continues the expression: 10
Value after bracket continuation: 10
Is that value an array? false
Is the intended value an array? true
Syntax and ASI practice page loaded.
String containing slash characters: https://example.test/page
~~~

The exact visual formatting can vary by browser because the Console styles messages differently, but the values should match.

## Read the expressions and statements

In this declaration:

~~~js
const total = price * quantity;
~~~

**price * quantity** is an expression. It evaluates to **8**. The full declaration statement creates a binding named **total** and assigns that value to it.

In this line:

~~~js
console.log("Total:", total);
~~~

The call expression is used as an expression statement. It writes a message to the Console.

## Compare the two return functions

The first function keeps the expression on the same line as **return**:

~~~js
function getAnswerOnOneLine() {
  return 42;
}
~~~

It returns **42**.

In the second function, a line terminator appears immediately after **return**:

~~~js
function getAnswerAfterLineBreak() {
  return
  42;
}
~~~

Automatic semicolon insertion ends the return statement after the keyword. This function returns **undefined**. The **42** on the following line is a separate expression statement whose value is not returned.

Keep a return expression on the same line as **return**:

~~~js
function getAnswer() {
  return 42;
}
~~~

## Observe expression continuation

The plus sign at the beginning of the second line continues the addition:

~~~js
const sum = 4
+ 6;
~~~

The value of **sum** is **10**. A newline is allowed inside this expression, so ASI does not end it before the plus sign.

The bracket can also continue the previous expression:

~~~js
const unexpectedValue = [10, 20]
[0];
~~~

This is parsed like:

~~~js
const unexpectedValue = [10, 20][0];
~~~

So **unexpectedValue** is the number **10**, not an array. The Console confirms this with **Array.isArray**.

To create an array and then use it separately, make the boundary explicit:

~~~js
const intendedArray = [10, 20];
console.log(intendedArray[0]);
~~~

Now **intendedArray** is an array. Its first item is **10**.

## Understand the comments

The **//** comment continues to the end of its line. The **/* ... */** comment spans several lines. Neither comment produces Console output.

The address is a string:

~~~js
const exampleAddress = "https://example.test/page";
~~~

The two slash characters are part of that string. They do not begin a comment because the parser is currently reading a string literal.

## A syntax error to recognize

A line terminator between **throw** and its expression is invalid:

~~~js
throw
new Error("Something went wrong");
~~~

Do not add this invalid snippet to the main page script, because it would prevent the entire script from parsing. Write it in a separate practice file if you want to observe the syntax error. The valid form keeps the expression on the same line:

~~~js
throw new Error("Something went wrong");
~~~

## Try a small change

1. Change **price** or **quantity** and read the new total.
2. Move **42** onto the same line as **return** in the second function. Reload and compare the result.
3. Add a semicolon after **[10, 20]** in the **unexpectedValue** declaration. Check the type again.
4. Remove the plus sign and observe how the parser treats the following line.
5. Add a single-line comment after a declaration and keep a second declaration on the next line.
6. Change the example address text and confirm that the slash characters remain part of the string.
7. Open the Sources panel and set a breakpoint on the line that assigns **unexpectedValue**. Reload and inspect the value after the line runs.

## Key ideas shown

- An expression evaluates to a value, while a statement is a program instruction or declaration.
- Comments do not execute, and comment markers inside strings are ordinary string content.
- Automatic semicolon insertion is based on grammar rules, not every newline.
- A line break after **return** can end the return statement.
- A leading **+** or **[** can continue an expression from the previous line.
- Explicit semicolons make statement boundaries clearer and avoid accidental continuation.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [06 - ECMAScript editions, proposals, and compatibility](../lessons/006-ecmascript-editions-proposals-and-compatibility.md) | [Open lesson](../lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [Open Q&A](../qnas/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [08 - Identifiers, keywords, reserved words, and naming](../lessons/008-identifiers-keywords-reserved-words-and-naming.md) |
