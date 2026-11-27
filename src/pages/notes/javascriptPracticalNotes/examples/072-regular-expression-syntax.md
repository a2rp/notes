# 72 - Regular expression syntax: Examples

These examples demonstrate JavaScript regex literals, constructor strings, escapes, classes, quantifiers, alternatives, assertions, and Unicode syntax. Each example includes a task, complete code, expected output, and an explanation. Examples using the **v** flag need a runtime that supports Unicode set notation.

## 1. Find a substring

**Task:** Find a word inside a longer string.

~~~js
const pattern = /cat/;

console.log(pattern.test("A cat is here."));
console.log(pattern.test("concatenate"));
~~~

Expected output:

~~~text
true
true
~~~

**Explanation:** The pattern has no anchors, so it can match **cat** anywhere in the input, including inside a longer word.

## 2. Create the same pattern with RegExp()

**Task:** Construct a pattern for one or more digits from a JavaScript string.

~~~js
const digits = new RegExp("\\d+");

console.log(digits.test("Room 42"));
console.log(digits.test("Room A"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** The constructor first receives a JavaScript string. Two backslashes in the source string produce one backslash for the regex parser.

## 3. Match a literal metacharacter

**Task:** Match a period as punctuation rather than as a wildcard.

~~~js
const pattern = /a\.b/;

console.log(pattern.test("a.b"));
console.log(pattern.test("a-b"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** An unescaped dot is a wildcard. The backslash makes it match a literal period.

## 4. Match a slash in a regex literal

**Task:** Find a slash between two words.

~~~js
const path = /docs\/chapter/;

console.log(path.test("docs/chapter"));
console.log(path.test("docs-chapter"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** The escaped slash is part of the pattern instead of closing the regex literal.

## 5. Use common character escapes

**Task:** Match a tab between two words.

~~~js
const pattern = /first\tsecond/;

console.log(pattern.test("first\tsecond"));
console.log(pattern.test("first second"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** **\t** represents a tab character. The ordinary space in the second string is a different character.

## 6. Use hexadecimal and Unicode escapes

**Task:** Match the two letters represented by their escape sequences.

~~~js
const pattern = /\x41\u0042/;

console.log(pattern.test("AB"));
console.log(pattern.test("ab"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** **\x41** represents uppercase A, and **\u0042** represents uppercase B.

## 7. Use the dot wildcard

**Task:** Match one character between two letters, then observe the line-terminator behavior.

~~~js
const pattern = /c.t/;

console.log(pattern.test("cat"));
console.log(pattern.test("c-t"));
console.log(pattern.test("c\nt"));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** The dot matches one character other than a line terminator. The dotAll flag, covered in the next chapter, changes this behavior.

## 8. Match a range of characters

**Task:** Match an uppercase letter from A through F or a digit from zero through three.

~~~js
const pattern = /[A-F0-3]/;

console.log(pattern.test("B"));
console.log(pattern.test("3"));
console.log(pattern.test("G"));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** A hyphen between class endpoints defines a range. This pattern has two ranges: **A-F** and **0-3**.

## 9. Include a literal hyphen in a class

**Task:** Match a literal hyphen or one of the letters from A through C.

~~~js
const pattern = /[-A-C]/;

console.log(pattern.test("-"));
console.log(pattern.test("B"));
console.log(pattern.test("D"));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** A hyphen at the start of a class is literal. Between two characters, it defines a range.

## 10. Use a negated character class

**Task:** Check whether a string contains any character that is not an ASCII digit.

~~~js
const nonDigit = /[^0-9]/;

console.log(nonDigit.test("508"));
console.log(nonDigit.test("50x"));
~~~

Expected output:

~~~text
false
true
~~~

**Explanation:** The caret immediately after the opening bracket negates the class. The expression succeeds when it finds one non-digit character.

## 11. Use character-class shorthand

**Task:** Check for a digit, a basic word character, and whitespace.

~~~js
console.log(/\d+/.test("Box 42"));
console.log(/\w+/.test("user_name"));
console.log(/\s/.test("two words"));
~~~

Expected output:

~~~text
true
true
true
~~~

**Explanation:** **\d** matches ASCII digits, **\w** matches the basic word-character set, and **\s** matches whitespace.

## 12. Match a bounded number of digits

**Task:** Find exactly four consecutive digits in a larger input.

~~~js
const fourDigits = /\d{4}/;

console.log(fourDigits.test("Room 2048"));
console.log(fourDigits.test("Room 208"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** The bounded quantifier requires four consecutive digits. Without anchors, those digits can be part of a larger string.

## 13. Make a character optional

**Task:** Match both common spellings, with and without the letter u.

~~~js
const color = /colou?r/;

console.log(color.test("color"));
console.log(color.test("colour"));
console.log(color.test("colouur"));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** The question mark applies only to the preceding **u**, making that one character optional.

## 14. Match alternatives

**Task:** Accept either of two beverage names.

~~~js
const beverage = /tea|coffee/;

console.log(beverage.test("tea break"));
console.log(beverage.test("coffee break"));
console.log(beverage.test("water break"));
~~~

Expected output:

~~~text
true
true
false
~~~

**Explanation:** The vertical bar separates alternatives. Either alternative can produce a match.

## 15. Require the match at the input boundaries

**Task:** Match exactly the text **cat**.

~~~js
const wholeInput = /^cat$/;

console.log(wholeInput.test("cat"));
console.log(wholeInput.test("a cat"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** **^** asserts the start position and **$** asserts the end position. For strict validation, account for the special behavior of **$** before a final line terminator.

## 16. Notice the final line-terminator behavior of $

**Task:** Compare an input with and without a trailing line feed.

~~~js
const fourDigits = /^\d{4}$/;

console.log(fourDigits.test("2048"));
console.log(fourDigits.test("2048\n"));
~~~

Expected output:

~~~text
true
true
~~~

**Explanation:** Without multiline mode, **$** can match at the end of the input or just before a final line terminator. If a format must reject a trailing newline, use a validation strategy that explicitly checks the complete input.

## 17. Find a whole basic word

**Task:** Find **cat** as a whole word, not as part of **concatenate**.

~~~js
const wholeWord = /\bcat\b/;

console.log(wholeWord.test("a cat sleeps"));
console.log(wholeWord.test("concatenate"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** **\b** asserts a boundary between a basic word character and a non-word character. It does not consume the surrounding characters.

## 18. Compare greedy and lazy matching

**Task:** Compare how much text greedy and lazy quantifiers consume.

~~~js
const text = "<b>one</b><i>two</i>";

console.log(text.match(/<.*>/)[0]);
console.log(text.match(/<.*?>/)[0]);
~~~

Expected output:

~~~text
<b>one</b><i>two</i>
<b>
~~~

**Explanation:** The greedy pattern consumes through the last available closing angle bracket. The lazy pattern tries the shortest match that lets the pattern finish, so it stops at the first one.

## 19. Match Unicode letters

**Task:** Match consecutive letters from a Unicode string.

~~~js
const letters = /\p{Letter}+/u;

console.log("café7".match(letters)[0]);
console.log("Καλημέρα".match(letters)[0]);
~~~

Expected output:

~~~text
café
Καλημέρα
~~~

**Explanation:** The Unicode property escape **\p{Letter}** matches letters across scripts. Unicode-aware mode is required. The digit ends the first match.

## 20. Match a Unicode code point escape

**Task:** Match an emoji by its Unicode code point.

~~~js
const smile = /\u{1F600}/u;

console.log(smile.test("😀"));
console.log(smile.test("A"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** The braced code point escape is used with Unicode-aware mode. It can represent characters outside the Basic Multilingual Plane.

## 21. Intersect Unicode character properties

**Task:** Match characters that are both letters and Greek script characters.

~~~js
const greekLetters = /[\p{Letter}&&\p{Script=Greek}]+/v;

console.log(greekLetters.test("Καλημέρα"));
console.log(greekLetters.test("hello"));
~~~

Expected output in a runtime that supports the **v** flag:

~~~text
true
false
~~~

**Explanation:** The **v** flag enables set operations in character classes. The intersection operator **&&** requires a character to belong to both properties. The **u** and **v** flags cannot be used together.

## 22. Catch an invalid pattern

**Task:** Handle a malformed character class.

~~~js
try {
  new RegExp("[");
  console.log("valid");
} catch (error) {
  console.log(error instanceof SyntaxError);
}
~~~

Expected output:

~~~text
true
~~~

**Explanation:** An opening bracket starts a character class. Since this pattern has no valid closing bracket, constructing it throws a **SyntaxError**.

## 23. Build a simple identifier-like pattern

**Task:** Require a letter or underscore first, followed by zero or more basic word characters.

~~~js
const identifier = /^[A-Za-z_]\w*$/;

console.log(identifier.test("_item42"));
console.log(identifier.test("42item"));
console.log(identifier.test("item-name"));
~~~

Expected output:

~~~text
true
false
false
~~~

**Explanation:** The first character class excludes digits and hyphens. Later characters can include digits because **\w** includes them. This is a teaching pattern, not the complete JavaScript identifier grammar.

## 24. Compare a search pattern with a whole-input pattern

**Task:** See the effect of adding anchors.

~~~js
const search = /\d{3}/;
const complete = /^\d{3}$/;

console.log(search.test("Order 204"));
console.log(complete.test("Order 204"));
console.log(complete.test("204"));
~~~

Expected output:

~~~text
true
false
true
~~~

**Explanation:** The first pattern can find three digits anywhere. The second requires the entire input to satisfy the pattern, subject to the end assertion's final-line-terminator behavior.

## 25. Recognize the different meanings of \b

**Task:** Match a boundary outside a class and a backspace inside a class.

~~~js
const boundary = /\bcat\b/;
const backspace = /[\b]/;

console.log(boundary.test("a cat"));
console.log(backspace.test("\b"));
~~~

Expected output:

~~~text
true
true
~~~

**Explanation:** Outside a character class, **\b** is a zero-width word-boundary assertion. Inside a class, it denotes the backspace character.

## 26. Avoid assuming that a regex is an HTML parser

**Task:** Use a simple tag-shaped pattern to find the first tag.

~~~js
const text = "<b>one</b><i>two</i>";
const firstTag = /<[^<>]*>/;

console.log(text.match(firstTag)[0]);
~~~

Expected output:

~~~text
<b>
~~~

**Explanation:** The negated class stops at the next angle bracket. This can illustrate delimiters in simple text, but HTML has nested structure, quoted attributes, comments, and other rules that require an HTML parser for general processing.

## Review checklist

- Does the pattern search for a substring or require the whole input?
- Are special characters escaped when they should be literal?
- Does each quantifier repeat the intended atom?
- Does the dot's line-terminator behavior fit the task?
- Does the shorthand character class fit the text's writing systems?
- Does the pattern need Unicode-aware mode?
- Could an ambiguous pattern backtrack excessively?
- Have trailing line terminators and malformed input been considered?

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [71 - SharedArrayBuffer, Atomics, and shared memory](../lessons/071-sharedarraybuffer-atomics-and-shared-memory.md) | [Open lesson](../lessons/072-regular-expression-syntax.md) | [Open Q&A](../qnas/072-regular-expression-syntax.md) | [73 - RegExp groups, flags, and string methods](../lessons/073-regexp-groups-flags-and-string-methods.md) |
