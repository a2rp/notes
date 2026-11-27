# 23 - Strings and template literals

Strings represent text in JavaScript. You can create them with single quotes, double quotes, or backticks. Backticks also support multiline text and embedded expressions, which makes them useful for building messages and other text from values.

This chapter introduces string values, common operations, escape sequences, template literals, and tagged templates. The next chapter looks more closely at Unicode and how JavaScript counts and indexes text.

## String values

A string is a primitive value containing a sequence of text units. It can be empty or contain letters, spaces, punctuation, line breaks, and Unicode text.

~~~js
const empty = "";
const singleQuoted = 'Hello';
const doubleQuoted = "Hello";

console.log(typeof singleQuoted); // "string"
console.log(singleQuoted === doubleQuoted); // true
console.log(empty.length); // 0
~~~

Single and double quotes create ordinary strings. Choose a quote style that makes the contents easy to read, and use the project's style consistently.

~~~js
const withApostrophe = "It's a clear day.";
const withDoubleQuote = 'She said, "hello."';
~~~

A string is immutable. String methods return a new string instead of changing the original value.

~~~js
const greeting = "hello";
const upperGreeting = greeting.toUpperCase();

console.log(upperGreeting); // "HELLO"
console.log(greeting); // "hello"
~~~

## Escape sequences

Use a backslash to write special characters inside quoted strings:

| Escape | Meaning |
| --- | --- |
| **\n** | Line feed |
| **\r** | Carriage return |
| **\t** | Tab |
| **\\\\** | Backslash |
| **\\"** | Double quote |
| **\\'** | Single quote |

~~~js
const lines = "First line\nSecond line";
const folder = "C:\\notes\\javascript";

console.log(lines);
console.log(folder);
~~~

The first string contains a line break. The second contains literal backslashes.

In ordinary quoted strings, a line break cannot appear directly between the opening and closing quotes. Use an escape sequence or use a template literal for a multiline string.

## Combining strings

The **+** operator combines strings. If one operand is a string, JavaScript can convert the other operand to text as part of the addition operation.

~~~js
const label = "Score: " + 95;
const fullName = "Ada" + " " + "Lovelace";

console.log(label); // "Score: 95"
console.log(fullName); // "Ada Lovelace"
~~~

This is useful for small combinations, but a long series of **+** operations can be hard to read. Template literals provide a clearer way to insert values into text.

## Template literals

A template literal is enclosed by backticks. It can span multiple lines and can contain substitutions written as **${expression}**.

~~~js
const name = "Maya";
const score = 95;

const message = `Hello, ${name}. Your score is ${score}.`;

console.log(message); // "Hello, Maya. Your score is 95."
~~~

Each substitution is an expression. JavaScript evaluates it and converts the result to text.

~~~js
const quantity = 3;
const unitPrice = 12;

const receiptLine = `Total: ${quantity * unitPrice}`;

console.log(receiptLine); // "Total: 36"
~~~

Expressions can include property access, function calls, conditionals, and arithmetic. Keep complicated logic in named variables so the text stays readable.

~~~js
const user = { firstName: "Asha" };
const displayName = user.firstName;
const greeting = `Welcome, ${displayName}!`;

console.log(greeting); // "Welcome, Asha!"
~~~

### Multiline template literals

A line break in the source is included in the resulting string:

~~~js
const note = `First line
Second line`;

console.log(note);
~~~

Indentation and spaces inside the template literal are also part of the string. Format the source with that in mind.

If the result should not contain a line break, keep the template literal on one line or combine separate strings deliberately.

### Interpolated values are converted to strings

Template substitutions convert their expression results to text. This does not automatically format objects as useful data or serialize them as JSON.

~~~js
const count = 4;
const missing = null;
const profile = { name: "Asha" };

console.log(`Count: ${count}`); // "Count: 4"
console.log(`Value: ${missing}`); // "Value: null"
console.log(`Profile: ${profile}`); // "Profile: [object Object]"
console.log(`Name: ${profile.name}`); // "Name: Asha"
console.log(`Profile data: ${JSON.stringify(profile)}`); // JSON text
~~~

Select the property or formatting you want. Use **JSON.stringify()** when JSON text is specifically needed.

## Useful string properties and methods

Strings have a **length** property and methods for inspecting or creating text:

~~~js
const text = "  JavaScript strings  ";

console.log(text.length); // includes the surrounding spaces
console.log(text.trim()); // "JavaScript strings"
console.log(text.includes("Script")); // true
console.log(text.startsWith("  Java")); // true
console.log(text.endsWith("  ")); // true
~~~

Common methods include:

- **trim()**, **trimStart()**, and **trimEnd()** return strings with surrounding whitespace removed.
- **includes(search)** checks whether text contains a substring.
- **startsWith(search)** and **endsWith(search)** check the beginning and end.
- **slice(start, end)** returns a portion from **start** up to, but not including, **end**. Negative indexes count from the end.
- **replace(search, replacement)** replaces a match. With a string search, it replaces the first matching occurrence.
- **replaceAll(search, replacement)** replaces all matching occurrences of a string search.
- **split(separator)** divides a string into an array of pieces.

~~~js
const title = "  learn JavaScript  ";

console.log(title.trim()); // "learn JavaScript"
console.log(title.slice(2, 7)); // "learn"
console.log("red red".replace("red", "blue")); // "blue red"
console.log("red red".replaceAll("red", "blue")); // "blue blue"
console.log("one,two,three".split(",")); // ["one", "two", "three"]
~~~

Methods do not mutate the original string:

~~~js
const original = "cat";
const changed = original.replace("cat", "dog");

console.log(original); // "cat"
console.log(changed); // "dog"
~~~

Use **slice()** for most substring extraction. **substring()** is another option, but it handles negative and reversed indexes differently. Choose one method and make its index behavior clear.

## Strings and indexing

JavaScript string indexes and **length** count UTF-16 code units. For ordinary English text, a visible character usually uses one code unit. Some Unicode characters use more than one, so the number of code units may differ from the number of visible characters.

~~~js
const face = "😀";

console.log(face.length); // 2
console.log([...face].length); // 1 code point
~~~

The spread example iterates code points, but a user-perceived character can contain multiple code points. The next chapter covers code units, code points, and grapheme clusters in more detail.

Do not assume that **text[index]** always returns a complete visible character for arbitrary Unicode text.

## Tagged templates

A tagged template calls a function with the literal text pieces and substitution values as separate arguments. The tag function decides what result to return.

~~~js
function describe(strings, value) {
    return strings[0] + value + strings[1];
}

const result = describe`Hello, ${"Maya"}!`;

console.log(result); // "Hello, Maya!"
~~~

The first argument contains the literal string segments. The remaining arguments contain the evaluated substitutions. A tag can return a string, another value, or an object.

JavaScript does not automatically escape or sanitize a tagged template's values. A tag used for HTML, SQL, or another structured format must follow the rules for that specific context. A tag name alone does not make interpolation safe.

### String.raw

**String.raw** is a built-in tag that uses the raw text from a template literal. Escape sequences are not interpreted the usual way in its literal portions.

~~~js
const ordinary = `Line 1\nLine 2`;
const raw = String.raw`Line 1\nLine 2`;

console.log(ordinary);
console.log(raw);
~~~

The first value contains a line break. The second contains the two characters backslash and **n**.

## Choose between quotes and templates

Use single or double quotes for a simple string with no substitutions or source-level line breaks:

~~~js
const status = "ready";
~~~

Use a template literal when it improves readability through interpolation or intentional multiline text:

~~~js
const statusMessage = `Current status: ${status}`;
~~~

Do not use a template literal just to avoid choosing a quote style. Also avoid building a long, difficult-to-read template with complex expressions embedded in it. Compute values first, then interpolate the names.

## Keep text safe in the browser

Template literals only create strings. They do not make inserted content safe for HTML.

For plain text in a page, use a text-oriented DOM API such as **textContent**:

~~~js
const message = `Hello, ${userInput}`;
messageElement.textContent = message;
~~~

Do not place untrusted input into **innerHTML** without context-appropriate sanitization. HTML parsing treats inserted text as markup, which can create security problems.

## Common mistakes

- Expecting **${expression}** to work inside single or double quotes.
- Forgetting that whitespace and line breaks in a multiline template are part of the value.
- Assuming a template literal automatically escapes HTML or other markup.
- Expecting string methods to modify the original string.
- Assuming **replace()** with a string search replaces every occurrence.
- Treating **length** as the count of visible characters for all Unicode text.
- Interpolating a whole object and expecting a useful formatted representation.
- Putting complex calculations directly inside a long template literal.
- Using **innerHTML** with untrusted interpolated content.

## Try it yourself

1. Write a greeting with a single-quoted string, then rewrite it as a template literal.
2. Make a template literal that calculates a subtotal from quantity and price.
3. Create a multiline note and inspect its whitespace and line breaks.
4. Replace the first occurrence of a word with **replace()**, then replace every occurrence with **replaceAll()**.
5. Use **trim()**, **includes()**, **startsWith()**, and **endsWith()** on a sentence.
6. Interpolate **null**, a Boolean, an array, and an object. Explain the resulting text.
7. Compare **"😀".length** with **[..."😀"].length**.
8. Write a tag function that surrounds a substituted value with brackets.
9. Compare a normal template literal containing **\n** with the same template tagged by **String.raw**.
10. Put a string into a page with **textContent**. Explain why that is different from inserting it with **innerHTML**.

## Key points

- Strings are immutable primitive values.
- Single quotes, double quotes, and backticks create strings; backticks also support interpolation and multiline text.
- A template substitution evaluates an expression and converts its result to text.
- String methods return new strings.
- **replace()** with a string search replaces the first match; **replaceAll()** replaces all matching occurrences.
- String indexes and **length** count UTF-16 code units, not necessarily visible characters.
- A tagged template calls a function with literal segments and substitution values.
- Templates do not automatically escape HTML or other structured content.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [22 - BigInt](022-bigint.md) | [Open Q&A](../qnas/023-strings-and-template-literals.md) | [Open example](../examples/023-strings-and-template-literals.md) | [24 - Unicode: code units, code points, and graphemes](024-unicode-code-units-code-points-and-graphemes.md) |