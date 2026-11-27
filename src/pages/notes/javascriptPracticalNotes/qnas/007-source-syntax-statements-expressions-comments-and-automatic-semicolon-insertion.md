# 07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion: Q&A

These questions review JavaScript source syntax, statements and expressions, comments, and the rules that can insert semicolons during parsing.

## Multiple-choice questions

### 1. What happens before JavaScript source code executes?

A. The browser turns it into an image  
B. The engine parses it and checks its syntax  
C. The engine adds indentation  
D. The runtime converts every statement into a comment

**Answer: B.** The engine reads the source and parses its tokens and grammatical structures. Invalid syntax can stop execution before the program runs.

### 2. Which statement best describes an expression?

A. Code that evaluates to a value  
B. A comment that spans several lines  
C. A file loaded by the browser  
D. A group of spaces and tabs

**Answer: A.** For example, **2 + 3** is an expression that evaluates to **5**.

### 3. Which line is an expression statement?

A. **const total = 2 + 3;**  
B. **console.log(2 + 3);**  
C. **// print the total**  
D. **if**

**Answer: B.** It uses a function-call expression as a program step. The first choice is a declaration, and the third is a comment.

### 4. What does a single-line JavaScript comment begin with?

A. **<!--**  
B. **//**  
C. **##**  
D. **/***

**Answer: B.** The **//** comment continues to the end of its line.

### 5. How does a JavaScript block comment begin and end?

A. It begins with **//** and ends at the next blank line  
B. It begins with **/* ** and ends with ** */**  
C. It begins with **<!--** and ends with **-->**  
D. It begins with **#** and ends at the end of the file

**Answer: B.** A block comment can span lines. It cannot nest another block comment using the same markers.

### 6. What does automatic semicolon insertion mean?

A. A semicolon is inserted after every newline  
B. The parser inserts semicolons in certain grammar-defined situations  
C. The formatter always inserts semicolons in comments  
D. The browser adds semicolons to HTML

**Answer: B.** ASI follows specific parsing rules. A line break alone does not always end a statement.

### 7. What does this function return?

~~~js
function getAnswer() {
  return
  42;
}
~~~

A. **42**  
B. **0**  
C. **undefined**  
D. A string

**Answer: C.** A line terminator immediately after **return** ends the return statement. The function returns without a value, so its result is **undefined**.

### 8. Which next-line token can continue an expression from the previous line?

A. **[**  
B. **//**  
C. A blank line  
D. A comment heading

**Answer: A.** A bracket can continue an expression as computed property access. Parentheses, plus, and other operators can also continue an expression.

### 9. What happens with a line break between **throw** and its expression?

A. The expression is always returned  
B. It is a syntax error  
C. A comment is inserted  
D. The error is silently ignored

**Answer: B.** A line terminator is not allowed between **throw** and the expression being thrown.

## True or false

### 10. Whitespace and indentation normally determine the meaning of a JavaScript block.

**Answer: False.** Braces and grammar determine block structure. Indentation helps people read it.

### 11. Every expression is automatically a separate statement.

**Answer: False.** Expressions can be nested inside other expressions, and JavaScript grammar only allows certain expressions to be used as expression statements.

### 12. A function call can be an expression and can also be used as an expression statement.

**Answer: True.** A call can evaluate to a value. When placed as a standalone program step, it is an expression statement.

### 13. Comment text is executed as JavaScript.

**Answer: False.** Comment text is ignored as code. Line terminators around comments can still affect parsing.

### 14. The characters **//** always begin a comment wherever they appear in a JavaScript file.

**Answer: False.** Inside a string or template literal, those characters are part of the text. The parser follows the syntax of the surrounding construct.

### 15. A block comment can include a line terminator that matters for automatic semicolon insertion.

**Answer: True.** The comment text is ignored, but a line terminator inside the block comment still counts as a line terminator.

### 16. JavaScript automatically inserts a semicolon at every line break.

**Answer: False.** A line break may separate statements, but it may also occur within an expression. ASI depends on the grammar and tokens.

### 17. A semicolon can prevent the next line from continuing a previous expression.

**Answer: True.** An explicit semicolon makes the statement boundary clear.

### 18. A runtime error and a syntax error happen at the same stage.

**Answer: False.** A syntax error occurs while parsing source. A runtime error occurs after parsing, while executing the program.

## Short-answer questions

### 19. What is a token in JavaScript source?

**Answer:** A token is a meaningful unit recognized by the parser, such as an identifier, keyword, literal, operator, or punctuation mark.

### 20. What is the difference between a declaration and an expression?

**Answer:** A declaration introduces a binding or other declared item, such as **const total = 5**. An expression evaluates to a value, such as **2 + 3**. A declaration is not itself an expression value that can be passed as a function argument.

### 21. Name four common statement forms.

**Answer:** Declarations, expression statements, control-flow statements, and block statements are common forms. Return statements are another important form.

### 22. Why should comments usually explain context instead of restating the code?

**Answer:** A clear line already shows what operation it performs. A useful comment adds information such as intent, an assumption, or a reason that is not obvious from the code itself.

### 23. Does JavaScript require semicolons after every construct?

**Answer:** No. Many statements and declarations can be terminated by automatic semicolon insertion in defined situations. Explicit and consistent semicolons are still useful for making statement boundaries clear.

### 24. Name three tokens that can continue an expression from the previous line.

**Answer:** An opening parenthesis **(**, an opening bracket **[**, and a plus sign **+** can continue an expression. Other operators can also do so.

### 25. What should a beginner do when writing an expression after **return**?

**Answer:** Keep the returned expression on the same line as **return** or start a parenthesized expression on that same line. This avoids accidental insertion of a semicolon after **return**.

### 26. Why is this code invalid?

~~~js
throw
new Error("Problem");
~~~

**Answer:** A line terminator cannot appear between **throw** and the expression it throws. Write **throw new Error("Problem");** on one line.

## Read the code

### 27. What value is printed?

~~~js
const total = 4
+ 6;

console.log(total);
~~~

**Answer:**

~~~text
10
~~~

The plus sign continues the expression from the previous line. The line break does not terminate the declaration.

### 28. What value is printed?

~~~js
const label = "ready"
[0].toUpperCase();

console.log(label);
~~~

**Answer:**

~~~text
R
~~~

The bracket continues the string expression as indexed property access. The declaration is parsed like **const label = "ready"[0].toUpperCase();**. Add a semicolon after **"ready"** if the bracket expression is intended to start a separate statement.

### 29. What value does this function return?

~~~js
function makeMessage() {
  return "Hello";
}
~~~

**Answer:** It returns the string **"Hello"**. The expression follows **return** on the same line, so it is part of the return statement.

### 30. What does the line comment include?

~~~js
const amount = 5; // save the current amount
const nextAmount = amount + 1;
~~~

**Answer:** The comment includes **save the current amount** and ends at the line terminator. The second declaration is separate code on the next line.

### 31. Is **//** a comment marker in this string?

~~~js
const path = "https://example.test/page";
~~~

**Answer:** No. The slash characters are part of the string value. The parser does not treat them as a comment inside the string.

### 32. What is wrong with the nesting in this comment?

~~~js
/*
  outer comment
  /* inner comment */
  more outer comment
*/
~~~

**Answer:** JavaScript block comments do not nest. The first ***/** closes the original block comment, leaving **more outer comment** and the final ***/** outside the comment, where they cause invalid syntax.

## Scenarios

### 33. A statement begins on a new line with an opening bracket, but the previous line has no semicolon. What should you inspect?

**Answer:** Check whether the bracket is being parsed as property access on the preceding expression. Add an explicit semicolon after the preceding statement if the bracket expression is intended to be separate.

### 34. A line comment appears after a declaration, and another declaration is on the next line. Does the comment hide the second declaration?

**Answer:** No. The line comment ends at its line terminator. The following declaration remains JavaScript source code.

### 35. A formatter adds semicolons to a file. Does that prove the program expresses your intent?

**Answer:** No. A formatter standardizes source layout. Review the meaning, especially line breaks after restricted keywords and lines beginning with tokens that can continue an expression.

### 36. You need to debug a surprising result caused by ASI. What is a good approach?

**Answer:** Inspect the expression and the tokens at the start of the next line. Check whether a line break is allowed at that grammar position, then add explicit statement boundaries and verify the intended result.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [06 - ECMAScript editions, proposals, and compatibility](../lessons/006-ecmascript-editions-proposals-and-compatibility.md) | [Open lesson](../lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [Open example](../examples/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [08 - Identifiers, keywords, reserved words, and naming](../lessons/008-identifiers-keywords-reserved-words-and-naming.md) |
