# 23 - Strings and template literals: example

This complete HTML page demonstrates quoted strings, escape sequences, template literals, string methods, tagged templates, raw template text, and safe insertion of plain text into a page. It prints the results to the browser Console and displays one message in the page.

## Question

How can you build readable text from values while keeping string operations and inserted content predictable?

## Goal

After working through this example, you should be able to:

- Create strings with quotes and escape sequences.
- Insert expressions into a template literal.
- Create multiline text and inspect its whitespace.
- Use common string methods without changing the original value.
- See how a tagged template receives values.
- Use **textContent** to display plain text safely.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript strings practice</title>
</head>
<body>
  <main>
    <h1>Strings and template literals</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      string values, template substitutions, and method results.
    </p>
    <p id="message"></p>
  </main>

  <script>
    // Quoted strings and escape sequences.
    const singleQuoted = 'A string with single quotes';
    const doubleQuoted = "A string with double quotes";
    const escapedLines = "First line\nSecond line";
    const folderPath = "C:\\notes\\javascript";

    console.log("single quoted:", singleQuoted);
    console.log("double quoted:", doubleQuoted);
    console.log("escaped line count:", escapedLines.split("\n").length);
    console.log("folder path:", folderPath);

    // Template substitutions evaluate expressions.
    const name = "Maya";
    const quantity = 3;
    const unitPrice = 12;
    const receipt = `Hello, ${name}. Total: ${quantity * unitPrice}.`;

    console.log("template message:", receipt);

    // A line break typed in a template is included in the value.
    const multiline = `First line
Second line`;

    console.log("multiline line count:", multiline.split("\n").length);

    // A backslash before the dollar sign keeps the placeholder text literal.
    const placeholderText = `Write \${name} literally.`;

    console.log("literal placeholder:", placeholderText);

    // Common methods create new strings.
    const original = "  JavaScript strings  ";
    const trimmed = original.trim();

    console.log("original:", original);
    console.log("trimmed:", trimmed);
    console.log("uppercase:", trimmed.toUpperCase());
    console.log("contains Script:", trimmed.includes("Script"));
    console.log("starts with Java:", trimmed.startsWith("Java"));
    console.log("ends with strings:", trimmed.endsWith("strings"));
    console.log("slice:", "JavaScript".slice(4, 10));
    console.log("replace first:", "red red".replace("red", "blue"));
    console.log("replace all:", "red red".replaceAll("red", "blue"));
    console.log("split and join:", "red,green,blue".split(",").join(" | "));
    console.log("original remains:", original);

    // Template substitutions convert values to text.
    const profile = { name: "Asha" };

    console.log("object value:", `Profile: ${profile}`);
    console.log("selected property:", `Name: ${profile.name}`);
    console.log(
      "JSON text:",
      `${JSON.stringify(profile)}`
    );

    // A tagged template receives literal segments and values separately.
    function bracket(strings, ...values) {
      let result = strings[0];

      for (let index = 0; index < values.length; index += 1) {
        result += "[" + values[index] + "]" + strings[index + 1];
      }

      return result;
    }

    console.log(
      "tagged template:",
      bracket`Hello ${name}, score ${95}!`
    );

    // String.raw keeps escape characters in its template text.
    const rawPath = String.raw`C:\new\file.txt`;
    const rawLine = String.raw`First\nSecond`;

    console.log("raw path:", rawPath);
    console.log("raw line:", rawLine);

    // Put untrusted text into the page as text, not parsed markup.
    const userInput = "<strong>Visitor</strong>";
    const message = `Message: ${userInput}`;
    const messageElement = document.querySelector("#message");

    messageElement.textContent = message;
    console.log("text content:", messageElement.textContent);

    // String length counts UTF-16 code units.
    const face = "😀";

    console.log("emoji length:", face.length);
    console.log("emoji code point count:", [...face].length);
  </script>
</body>
</html>
~~~

## Expected Console output

~~~text
single quoted: A string with single quotes
double quoted: A string with double quotes
escaped line count: 2
folder path: C:\notes\javascript
template message: Hello, Maya. Total: 36.
multiline line count: 2
literal placeholder: Write ${name} literally.
original:   JavaScript strings  
trimmed: JavaScript strings
uppercase: JAVASCRIPT STRINGS
contains Script: true
starts with Java: true
ends with strings: true
slice: Script
replace first: blue red
replace all: blue blue
split and join: red | green | blue
original remains:   JavaScript strings  
object value: Profile: [object Object]
selected property: Name: Asha
JSON text: {"name":"Asha"}
tagged template: Hello [Maya], score [95]!
raw path: C:\new\file.txt
raw line: First\nSecond
text content: Message: <strong>Visitor</strong>
emoji length: 2
emoji code point count: 1
~~~

## Explanation

- **escapedLines** uses **\\n** to include a line feed. The backslashes in **folderPath** are escaped so they remain in the resulting string.
- **receipt** inserts a name and the result of an arithmetic expression. The expression is evaluated before it becomes part of the text.
- The source line break in **multiline** is part of the value. Splitting on a line feed produces two pieces.
- Escaping the dollar sign in **placeholderText** prevents its braces from starting a substitution.
- **trim()**, **toUpperCase()**, **includes()**, **startsWith()**, **endsWith()**, **slice()**, **replace()**, and **replaceAll()** return results without mutating **original**.
- **replace()** with a string search changes the first match, while **replaceAll()** changes both.
- Interpolating an ordinary object gives its default text representation. Interpolate a property or call **JSON.stringify()** when that output is needed.
- **bracket()** receives literal segments and substitution values separately. It returns its own formatted string.
- **String.raw** keeps backslash sequences from its template text as literal characters.
- **textContent** displays the provided tag-like input as text. It does not parse it as an HTML element.
- **face.length** counts two UTF-16 code units. The spread expression counts one code point. The Unicode chapter explains further differences.

## Try it yourself

1. Change **name**, **quantity**, and **unitPrice** and observe the resulting message.
2. Add leading spaces to **trimmed** after calling **trim()** and compare it with **original**.
3. Change the first **replace()** call to **replaceAll()** and compare the two results.
4. Add another substitution to the call to **bracket()**.
5. Use **String.raw** with a path containing **\\t** and **\\n**.
6. Change **userInput** to another string containing angle brackets and inspect the page.
7. Compare **"😀".length** with **[..."😀"].length**.
8. Add **split()** to divide a sentence on spaces, then join the pieces with hyphens.
9. Create a template literal with a conditional expression, or compute the conditional before the template.
10. Display a user-provided value with **textContent**. Do not use **innerHTML** for untrusted plain text.

## Key ideas shown

- Strings are immutable, and methods return new strings.
- Template literals interpolate expressions and can contain source-level line breaks.
- A template tag receives literal segments and substitution values.
- **String.raw** preserves raw escape text in the literal portions.
- String methods such as **replace()** and **replaceAll()** have different matching behavior.
- String length counts UTF-16 code units, which can differ from code points and visible graphemes.
- Template literals do not sanitize inserted data. **textContent** is appropriate for displaying plain text.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [22 - BigInt](../lessons/022-bigint.md) | [Open lesson](../lessons/023-strings-and-template-literals.md) | [Open Q&A](../qnas/023-strings-and-template-literals.md) | [24 - Unicode: code units, code points, and graphemes](../lessons/024-unicode-code-units-code-points-and-graphemes.md) |