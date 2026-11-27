# 23 - Strings and template literals

This Q&A reviews string values, escape sequences, interpolation, common string methods, tagged templates, and basic Unicode length behavior. Each answer appears immediately after its question, with an explanation where useful.

## Multiple-choice questions

### 1. What is the type of a string value such as **"hello"**?

A. **number**  
B. **string**  
C. **object**  
D. **character**

**Answer: B. string.**

JavaScript strings are primitive values. JavaScript does not have a separate primitive type for one character.

### 2. Which expression creates a template literal with interpolation?

A. **"Hello, ${name}"**  
B. **'Hello, ${name}'**  
C. **`Hello, ${name}`**  
D. **String("Hello, name")**

**Answer: C. `Hello, ${name}`.**

Template literals use backticks. Single and double quoted strings do not evaluate **${...}** substitutions.

### 3. What does the escape sequence **\n** represent in a string?

A. A tab  
B. A line feed  
C. A backslash  
D. A quote

**Answer: B. A line feed.**

For example, **"one\n two"** contains a line feed between the words.

### 4. What does this code print?

~~~js
const greeting = "hello";
greeting.toUpperCase();
console.log(greeting);
~~~

A. **"HELLO"**  
B. **"hello"**  
C. **undefined**  
D. It throws a TypeError.

**Answer: B. "hello".**

Strings are immutable. **toUpperCase()** returns a new string, and this code does not save that returned value.

### 5. What does this code print?

~~~js
const name = "Maya";
console.log(`Hello, ${name}!`);
~~~

A. **Hello, name!**  
B. **Hello, Maya!**  
C. **${name}**  
D. It throws a SyntaxError.

**Answer: B. Hello, Maya!**

The template substitution evaluates **name** and inserts its value as text.

### 6. What does this code print?

~~~js
const name = "Maya";
console.log("Hello, ${name}!");
~~~

A. **Hello, Maya!**  
B. **Hello, ${name}!**  
C. **Maya**  
D. It throws a SyntaxError.

**Answer: B. Hello, ${name}!.**

Interpolation only works inside a template literal enclosed by backticks. This is an ordinary double-quoted string.

### 7. Which method removes whitespace from both ends of a string?

A. **slice()**  
B. **trim()**  
C. **split()**  
D. **repeat()**

**Answer: B. trim().**

**trim()** returns a new string with leading and trailing whitespace removed. It does not remove whitespace from the middle.

### 8. With a string search value, what does **replace()** replace?

A. Every matching occurrence  
B. The first matching occurrence  
C. Only the last occurrence  
D. It never replaces text.

**Answer: B. The first matching occurrence.**

Use **replaceAll()** when all matching occurrences should be replaced.

### 9. What does **slice(1, 4)** select?

A. Indexes 1 through 4, inclusive  
B. Starting at index 1 and stopping before index 4  
C. The last four characters  
D. The first four characters

**Answer: B. Starting at index 1 and stopping before index 4.**

The end index is excluded.

### 10. What does **"😀".length** return in JavaScript?

A. **0**  
B. **1**  
C. **2**  
D. It returns a string.

**Answer: C. 2.**

This emoji uses two UTF-16 code units. JavaScript string length counts code units. The next chapter covers the difference between code units, code points, and visible graphemes.

### 11. What does **[..."😀"].length** return?

A. **0**  
B. **1**  
C. **2**  
D. **4**

**Answer: B. 1.**

String iteration and spread combine this surrogate pair into one code point. A user-perceived character can still consist of multiple code points.

### 12. What arguments does a tag function receive first?

A. The complete rendered string only  
B. An array of literal string segments  
C. The template source file name  
D. The substitutions converted to Numbers

**Answer: B. An array of literal string segments.**

The tag also receives the evaluated substitution values as later arguments.

### 13. Does a tagged template automatically escape values for HTML?

A. Yes, every tag escapes HTML  
B. Yes, but only in browsers  
C. No, escaping depends on the tag implementation  
D. It cannot contain substitutions.

**Answer: C. No, escaping depends on the tag implementation.**

A tag function can implement context-specific escaping, but the syntax alone does not sanitize values.

### 14. What does **String.raw** do to escape sequences in template text?

A. It converts every escape to a line break.  
B. It uses the raw template text, so escapes are not interpreted normally.  
C. It removes backslashes.  
D. It converts the value to JSON.

**Answer: B. It uses the raw template text, so escapes are not interpreted normally.**

For example, a raw template containing **\n** includes a backslash and the letter n instead of a line feed.

### 15. Which method checks whether a string contains a substring?

A. **has()**  
B. **contains()**  
C. **includes()**  
D. **index()**

**Answer: C. includes().**

**includes(search)** returns a Boolean and is case-sensitive.

### 16. Which statement about string methods is correct?

A. They change the original string in place.  
B. They return new results and leave the original string unchanged.  
C. They only work on variables declared with **let**.  
D. They convert strings to arrays automatically.

**Answer: B. They return new results and leave the original string unchanged.**

Strings are immutable primitive values.

### 17. What is the safest choice for placing untrusted text into an element as plain text?

A. Set **innerHTML** directly  
B. Set **textContent**  
C. Put it inside a template literal  
D. Call **trim()**

**Answer: B. Set textContent.**

Template literals create strings but do not make HTML parsing safe. **textContent** inserts the value as text.

### 18. What does **"red red".replaceAll("red", "blue")** return?

A. **"blue red"**  
B. **"red blue"**  
C. **"blue blue"**  
D. **"red red"**

**Answer: C. "blue blue".**

**replaceAll()** replaces every exact string match.

## Predict the result

### 19. What does this code print?

~~~js
const quantity = 3;
const price = 12;
console.log(`Total: ${quantity * price}`);
~~~

**Answer:**

~~~text
Total: 36
~~~

The expression inside the substitution is evaluated before its result is converted to text.

### 20. What does this code print?

~~~js
const note = `First line
Second line`;
console.log(note);
~~~

**Answer:**

~~~text
First line
Second line
~~~

The line break in the template literal is part of the resulting string.

### 21. What does this code print?

~~~js
const profile = { name: "Asha" };
console.log(`Profile: ${profile}`);
console.log(`Name: ${profile.name}`);
~~~

**Answer:**

~~~text
Profile: [object Object]
Name: Asha
~~~

Interpolating an ordinary object does not automatically serialize its properties. Select a property or use **JSON.stringify()** when JSON text is intended.

### 22. What does this code print?

~~~js
console.log("red red".replace("red", "blue"));
console.log("red red".replaceAll("red", "blue"));
~~~

**Answer:**

~~~text
blue red
blue blue
~~~

With a string search, **replace()** replaces the first occurrence, while **replaceAll()** replaces each occurrence.

### 23. What does this code print?

~~~js
const text = "  JavaScript  ";
console.log(text.trim());
console.log(text);
~~~

**Answer:**

~~~text
JavaScript
  JavaScript
~~~

**trim()** returns a new string. It does not modify **text**.

### 24. What does this code print?

~~~js
console.log("JavaScript".slice(4, 10));
console.log("JavaScript".slice(-6));
~~~

**Answer:**

~~~text
Script
Script
~~~

The end index is excluded. A negative start index counts from the end of the string.

### 25. What does this code print?

~~~js
const value = `Line 1\nLine 2`;
console.log(value);
~~~

**Answer:**

~~~text
Line 1
Line 2
~~~

The escape sequence **\n** inside a template literal creates a line feed.

### 26. What does this code print?

~~~js
const value = String.raw`Line 1\nLine 2`;
console.log(value);
~~~

**Answer:**

~~~text
Line 1\nLine 2
~~~

**String.raw** uses the raw template text, so the output contains the backslash and the letter n.

### 27. What does this code print?

~~~js
function tag(strings, value) {
    return strings[0] + "[" + value + "]" + strings[1];
}

console.log(tag`Hello ${"Ada"}!`);
~~~

**Answer:**

~~~text
Hello [Ada]!
~~~

The tag receives the literal parts **"Hello "** and **"!"**, plus the substitution value **"Ada"**.

### 28. What does this code print?

~~~js
const name = "Maya";
console.log(`Show \${name}`);
~~~

**Answer:**

~~~text
Show ${name}
~~~

Escaping the dollar sign prevents the opening brace from starting a substitution.

### 29. What does this code print?

~~~js
console.log("Hello".includes("hell"));
console.log("Hello".includes("Hell"));
~~~

**Answer:**

~~~text
false
true
~~~

String matching with **includes()** is case-sensitive.

### 30. What does this code print?

~~~js
console.log("a,b,c".split(","));
console.log("a,b,c".split(",").join(" / "));
~~~

**Answer:**

~~~text
["a", "b", "c"]
a / b / c
~~~

**split()** creates an array of pieces. **join()** combines array elements into a string.

## True or false

### 31. Single-quoted and double-quoted strings can contain template substitutions.

**Answer: False.**

Substitution syntax works in template literals enclosed by backticks.

### 32. A multiline template literal includes its line breaks and indentation in the string.

**Answer: True.**

Whitespace inside the template literal is part of the value.

### 33. Calling **toLowerCase()** changes the original string.

**Answer: False.**

It returns a new string. Store that result if you want to use it.

### 34. **String.prototype.length** always equals the number of characters a person sees.

**Answer: False.**

Length counts UTF-16 code units. Some Unicode sequences contain multiple code units or code points but appear as one grapheme.

### 35. A tag function decides how template substitutions are processed.

**Answer: True.**

A tag receives literal string segments and substitution values. It can return any value and must implement its own escaping or formatting.

### 36. A template literal automatically protects interpolated input from HTML injection.

**Answer: False.**

It only builds a string. Use safe DOM APIs such as **textContent** for plain text, and use appropriate sanitization when markup is intended.

## Short-answer questions

### 37. What is the difference between an ordinary quoted string and a template literal?

**Answer:** Both create strings. A template literal uses backticks and supports multiline source text and expression substitutions. Single and double quoted strings do not interpolate.

### 38. Why does **text.toUpperCase()** not change **text**?

**Answer:** Strings are immutable. The method returns a new uppercase string, and the original value remains unchanged.

### 39. What is the difference between **replace()** and **replaceAll()** when their search argument is a string?

**Answer:** **replace()** replaces the first match. **replaceAll()** replaces all matches.

### 40. Why might interpolating an object into a template literal not be useful?

**Answer:** An ordinary object commonly converts to the text **"[object Object]"**, rather than a readable list of its properties.

Interpolate a selected property or explicitly serialize the object when JSON text is required.

### 41. Why is **textContent** safer than assigning untrusted text to **innerHTML**?

**Answer:** **textContent** treats the value as text. **innerHTML** parses the value as markup, so untrusted content may become executable or otherwise unsafe HTML.

### 42. What does **String.raw** change?

**Answer:** It is a tag that returns template literal raw text for its literal segments, leaving escape sequences such as **\n** unprocessed.

It does not remove or sanitize substitutions.

## Coding questions

### 43. Write a function that returns a greeting containing a user's name.

**Answer:**

~~~js
function greet(name) {
    return `Hello, ${name}!`;
}
~~~

A template literal makes the inserted value visible in the sentence.

### 44. Write a function that trims a value converted to text and returns the result in uppercase.

**Answer:**

~~~js
function normalizeLabel(value) {
    return String(value).trim().toUpperCase();
}
~~~

Calling **String()** explicitly converts supported values before the string methods are used.

### 45. Write a tag function that surrounds each substitution with square brackets.

**Answer:**

~~~js
function bracket(strings, ...values) {
    let result = strings[0];

    for (let index = 0; index < values.length; index += 1) {
        result += "[" + values[index] + "]" + strings[index + 1];
    }

    return result;
}

const name = "Ada";
console.log(bracket`Hello ${name}!`); // Hello [Ada]!
~~~

The tag receives the literal segments and all substitution values. This simple tag is for demonstration and does not perform HTML escaping.

### 46. Write a function that replaces every occurrence of a word with another word.

**Answer:**

~~~js
function replaceEverywhere(text, search, replacement) {
    return text.replaceAll(search, replacement);
}
~~~

The function returns a new string and leaves the input string unchanged.

### 47. Write a function that inserts user-provided text into an element as plain text.

**Answer:**

~~~js
function showMessage(element, userInput) {
    element.textContent = `Message: ${userInput}`;
}
~~~

Using **textContent** inserts the value as text rather than parsing it as HTML.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [22 - BigInt](../lessons/022-bigint.md) | [Open lesson](../lessons/023-strings-and-template-literals.md) | [Open example](../examples/023-strings-and-template-literals.md) | [24 - Unicode: code units, code points, and graphemes](../lessons/024-unicode-code-units-code-points-and-graphemes.md) |