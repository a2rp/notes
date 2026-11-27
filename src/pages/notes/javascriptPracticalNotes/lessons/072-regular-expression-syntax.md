# 72 - Regular expression syntax

A regular expression is a pattern for finding text. JavaScript uses regular expressions to search, check, extract, and replace parts of strings. A pattern can describe literal characters, character choices, repetition, and positions in the input.

A regular expression usually finds a matching part of a string. It does not automatically require the whole string to match. Anchors and a careful understanding of the pattern are needed when a pattern is used for validation.

## Learning goals

By the end of this chapter, you should be able to:

- Create a regular expression with a literal or the **RegExp** constructor.
- Recognize literal characters, escaped characters, and regex metacharacters.
- Use character classes, ranges, and common character-class escapes.
- Apply repetition quantifiers and understand greedy and lazy matching.
- Combine alternatives and use anchors and word-boundary assertions.
- Use Unicode-aware character escapes and property escapes.
- Recognize invalid patterns and avoid common matching mistakes.

## What a regular expression does

A regular expression describes a pattern. String methods and **RegExp** methods use that pattern to test or locate text.

~~~js
const pattern = /cat/;
const text = "A cat sleeps.";

console.log(pattern.test(text));
console.log(text.match(pattern)[0]);
~~~

Output:

~~~text
true
cat
~~~

The pattern matches the substring **cat**. It does not require the entire string to contain only those three letters. The same pattern also finds **cat** inside a longer word:

~~~js
console.log(/cat/.test("concatenate"));
~~~

Output:

~~~text
true
~~~

Use anchors when the pattern must describe a position such as the start or end of the input.

## Create a regular expression

A regex literal is written between slashes. It is convenient when the pattern is known in the source code.

~~~js
const digits = /\d+/;

console.log(digits.test("Room 42"));
~~~

Output:

~~~text
true
~~~

The **RegExp** constructor accepts a pattern string. It is useful when a pattern must be assembled at runtime.

~~~js
const digits = new RegExp("\\d+");

console.log(digits.test("Room 42"));
console.log(digits.test("Room A"));
~~~

Output:

~~~text
true
false
~~~

The constructor receives a JavaScript string first. The JavaScript string parser processes its backslashes, so a regex escape such as **\d** is written as **\\d** in a quoted string. Regex literals do not need this extra JavaScript string escaping.

A slash inside a regex literal must be escaped so it is not mistaken for the end of the literal.

~~~js
const pathPattern = /docs\/chapter/;

console.log(pathPattern.test("docs/chapter"));
~~~

Output:

~~~text
true
~~~

## Literal characters and metacharacters

Most ordinary characters match themselves. For example, **/javascript/** matches the letters in **javascript**.

Some characters have special meanings in regex syntax:

| Character | Meaning |
| --- | --- |
| **.** | Any character except a line terminator, unless dotAll mode is enabled |
| **^** | Start assertion, or the start of a line in multiline mode |
| **$** | End assertion, or the end of a line in multiline mode |
| **\*** | Repeat the preceding atom zero or more times |
| **+** | Repeat the preceding atom one or more times |
| **?** | Make the preceding atom optional, or modify a quantifier |
| **{ }** | Specify a repetition count |
| **[ ]** | Define a character class |
| **( )** | Group a pattern, and optionally capture a match |
| **\|** | Separate alternatives |
| **\\** | Introduce an escape or make a metacharacter literal |

A metacharacter can be escaped when it should match literally.

~~~js
const pattern = /\$\d+/;

console.log(pattern.test("Price: $25"));
console.log(pattern.test("Price: 25"));
~~~

Output:

~~~text
true
false
~~~

The backslash makes the dollar sign a literal character. The **\d+** part then matches one or more digits.

## Common character escapes

Escapes let a pattern represent characters that are awkward to type or have special meaning.

| Escape | Meaning |
| --- | --- |
| **\n** | Line feed |
| **\r** | Carriage return |
| **\t** | Tab |
| **\v** | Vertical tab |
| **\f** | Form feed |
| **\0** | Null character when not followed by a digit |
| **\xHH** | Character with a two-digit hexadecimal code |
| **\uHHHH** | Character with a four-digit Unicode escape |
| **\u{...}** | Unicode code point escape in Unicode-aware mode |

~~~js
const pattern = /\x41\u0042/;

console.log(pattern.test("AB"));
~~~

Output:

~~~text
true
~~~

**\x41** represents **A**, and **\u0042** represents **B**. Unicode code point escapes can represent characters outside the Basic Multilingual Plane when used with the **u** or **v** flag. Flags are covered in the next chapter.

To match a metacharacter literally, escape it. For example, **/a\.b/** matches **a.b**, where the dot is a period rather than the wildcard.

~~~js
console.log(/a\.b/.test("a.b"));
console.log(/a\.b/.test("a-b"));
~~~

Output:

~~~text
true
false
~~~

## The wildcard dot

The dot **.** matches one character except line terminators. It does not mean every possible character when the dotAll flag is absent.

~~~js
console.log(/c.t/.test("cat"));
console.log(/c.t/.test("c-t"));
console.log(/c.t/.test("c\nt"));
~~~

Output:

~~~text
true
true
false
~~~

The dotAll flag, introduced in the next chapter, changes how the dot handles line terminators. A negated character class can also match a line terminator if it is not excluded.

## Character classes

A character class in square brackets matches one character from the set.

~~~js
const pattern = /[aeiou]/;

console.log(pattern.test("rhythm"));
console.log(pattern.test("javascript"));
~~~

Output:

~~~text
false
true
~~~

A hyphen can define a range when it appears between range endpoints.

~~~js
const pattern = /[A-F0-3]/;

console.log(pattern.test("B"));
console.log(pattern.test("2"));
console.log(pattern.test("G"));
~~~

Output:

~~~text
true
true
false
~~~

The range **A-F** includes uppercase letters from A through F. The range **0-3** includes digits zero through three. Ranges are based on character code ordering, so use them only when that ordering is suitable.

A caret immediately after the opening bracket negates the class.

~~~js
const nonDigit = /[^0-9]/;

console.log(nonDigit.test("508"));
console.log(nonDigit.test("50x"));
~~~

Output:

~~~text
false
true
~~~

The negated class matches any character that is not one of the listed digits. Unlike a dot, it can match line terminators.

To include a hyphen literally, put it at the start or end of the class, or escape it. Escape a closing bracket when it must be included as a class character. In Unicode-aware modes, more punctuation has special restrictions, so escape characters that are intended literally.

## Character-class escapes

JavaScript provides shorthand classes for common sets.

| Escape | Meaning |
| --- | --- |
| **\d** | ASCII digit from 0 through 9 |
| **\D** | Character that is not an ASCII digit |
| **\w** | ASCII letter, digit, or underscore |
| **\W** | Character that is not in the basic word-character set |
| **\s** | Whitespace character |
| **\S** | Character that is not whitespace |

~~~js
console.log(/\d+/.test("Order 204"));
console.log(/\w+/.test("user_name"));
console.log(/\s/.test("two words"));
~~~

Output:

~~~text
true
true
true
~~~

These escapes can be used inside character classes as well.

~~~js
const identifierPart = /[\w-]+/;

console.log(identifierPart.test("item-42"));
~~~

Output:

~~~text
true
~~~

The shorthand **\w** is not a general test for every letter in every writing system. For Unicode letters, use a Unicode property escape when the runtime and pattern mode support it.

## Unicode-aware character syntax

JavaScript strings use UTF-16. Without Unicode-aware mode, regex matching treats a supplementary character such as many emoji as two code units. The **u** flag enables Unicode-aware interpretation, and the **v** flag provides Unicode set features.

A Unicode property escape can match characters by a Unicode property rather than listing each character.

~~~js
const letters = /\p{Letter}+/u;

console.log("café".match(letters)[0]);
console.log(letters.test("123"));
~~~

Output:

~~~text
café
false
~~~

The escape **\p{Letter}** matches Unicode characters with the Letter property. **\P{...}** denotes the complement of a property in Unicode-aware mode.

~~~js
const notLetters = /\P{Letter}+/u;

console.log("abc 123".match(notLetters)[0]);
~~~

Output:

~~~text
 123
~~~

The **v** flag adds set operations inside character classes, including intersection and subtraction. For example, this pattern matches Greek letters by intersecting the Letter and Greek script properties:

~~~js
const greekLetters = /[\p{Letter}&&\p{Script=Greek}]+/v;

console.log(greekLetters.test("Καλημέρα"));
console.log(greekLetters.test("hello"));
~~~

Output:

~~~text
true
false
~~~

Unicode property names and set syntax must follow the JavaScript regex grammar exactly. The **u** and **v** flags cannot be used together. Check runtime support before relying on newer syntax in older environments.

Unicode code points are not always the same as user-perceived characters. A visible character can consist of multiple code points, such as a base letter and a combining mark. Unicode-aware matching does not automatically treat every grapheme cluster as one character.

## Quantifiers

A quantifier repeats the atom immediately before it.

| Quantifier | Meaning |
| --- | --- |
| **\*** | Zero or more repetitions |
| **+** | One or more repetitions |
| **?** | Zero or one repetition |
| **{n}** | Exactly n repetitions |
| **{n,}** | At least n repetitions |
| **{n,m}** | At least n and at most m repetitions |

~~~js
console.log(/colou?r/.test("color"));
console.log(/colou?r/.test("colour"));
console.log(/\d{3}/.test("Room 204"));
console.log(/\d{2,4}/.test("7"));
~~~

Output:

~~~text
true
true
true
false
~~~

A quantifier applies only to the preceding atom. In **ab+**, the **b** repeats, not the whole **ab**. Parentheses can group an expression before quantifying it. Group syntax is discussed in the next chapter.

Quantifiers are greedy by default. A greedy quantifier takes as much text as it can while still allowing the rest of the pattern to match.

~~~js
const match = "<b>one</b>".match(/<.*>/);

console.log(match[0]);
~~~

Output:

~~~text
<b>one</b>
~~~

Adding **?** after a quantifier makes it lazy. A lazy quantifier takes as little text as it can while allowing the rest of the pattern to match.

~~~js
const match = "<b>one</b><i>two</i>".match(/<.*?>/);

console.log(match[0]);
~~~

Output:

~~~text
<b>
~~~

Greedy and lazy quantifiers do not mean "always longest" and "always shortest" in isolation. They affect how the engine explores possible matches while the rest of the pattern is considered.

## Alternatives

The vertical bar separates alternatives. The pattern succeeds if one alternative matches.

~~~js
const pattern = /tea|coffee/;

console.log(pattern.test("tea break"));
console.log(pattern.test("coffee break"));
console.log(pattern.test("water break"));
~~~

Output:

~~~text
true
true
false
~~~

Alternatives are tried from left to right, with backtracking when a later part of a pattern cannot match. Their interaction with groups and precedence is covered in the next chapter.

## Assertions and positions

Assertions check a position without consuming a character.

### Start and end assertions

**^** asserts the start of the input. **$** asserts the end of the input, with line behavior affected by the multiline flag.

~~~js
const pattern = /^cat$/;

console.log(pattern.test("cat"));
console.log(pattern.test("a cat"));
~~~

Output:

~~~text
true
false
~~~

Without anchors, **/cat/** can match a substring inside a longer string. Anchors make the position requirements explicit. The exact behavior of **$** around a final line terminator and the effect of multiline mode are important when validating complete input.

### Word-boundary assertions

**\b** asserts a boundary between a word character and a non-word character. **\B** asserts a position that is not a word boundary. These assertions do not consume characters.

~~~js
const wholeWord = /\bcat\b/;

console.log(wholeWord.test("a cat sleeps"));
console.log(wholeWord.test("concatenate"));
~~~

Output:

~~~text
true
false
~~~

JavaScript's basic word-character definition is based on **\w**, so **\b** is not a full natural-language word boundary for every writing system. For Unicode text, choose a pattern that matches the actual data requirements.

## A complete pattern made from smaller pieces

This pattern checks for a simple identifier-like string that begins with a letter or underscore, followed by letters, digits, or underscores:

~~~js
const identifier = /^[A-Za-z_]\w*$/;

console.log(identifier.test("_item42"));
console.log(identifier.test("42item"));
console.log(identifier.test("item-name"));
~~~

Output:

~~~text
true
false
false
~~~

The beginning assertion fixes the start position. The character class describes the first character. **\w*** allows zero or more basic word characters after it. The ending assertion requires the pattern to finish at the input boundary.

This is a teaching pattern, not a complete definition of every valid JavaScript identifier. Language identifiers have additional Unicode and reserved-word rules.

## Invalid patterns and errors

A malformed pattern or invalid flag combination throws a **SyntaxError** when the regular expression is created.

~~~js
try {
  new RegExp("[");
} catch (error) {
  console.log(error instanceof SyntaxError);
}
~~~

Output:

~~~text
true
~~~

Unicode-aware modes apply stricter syntax rules. If punctuation is meant literally, escape it where required. Do not rely on legacy patterns that happen to be accepted without **u** or **v**.

When patterns come from dynamic input, validate or escape that input before building a regex. A user-provided string can contain regex syntax and change the meaning or cost of the pattern.

## Performance and safe pattern design

A regex can do a lot of backtracking when several nested or overlapping quantifiers can match the same text. On a long input, an ambiguous pattern may take much longer than expected.

Prefer patterns that express the needed structure directly. Test them against long, malformed inputs as well as ordinary examples. Do not assume that adding anchors alone makes an ambiguous pattern efficient.

## Common mistakes

### Expecting a regex to validate the whole string automatically

Most search operations look for a matching substring. Use start and end assertions when the requirement concerns the whole input, and account for final line terminators when using **$**.

### Forgetting string escaping with RegExp()

A regex literal **/\d/** and constructor string **new RegExp("\\d")** express the same pattern. In the string form, the backslash must survive JavaScript string parsing.

### Using dot as every possible character

The dot does not match line terminators unless dotAll mode is enabled. A negated class such as **[^,]** may match line terminators.

### Assuming \w means every language's letters

The basic **\w** set is mostly ASCII letters, digits, and underscore. Use Unicode property escapes for Unicode letter categories when appropriate.

### Applying a quantifier to the wrong atom

In **ab+**, only **b** repeats. Group a larger expression when the whole expression must repeat.

### Assuming a lazy quantifier is always better

Lazy quantifiers still backtrack and may produce a surprising match if the surrounding pattern is not specific. Use delimiters and clear structure where possible.

### Treating \b as a natural-language word separator

The assertion is based on regex word-character rules, not linguistic segmentation. It may not match the boundary users expect in non-ASCII text.

## Try it yourself

1. Write a pattern that finds a literal period between two letters.
2. Match a sequence of exactly four digits and explain why it can still match inside a longer string.
3. Use a negated character class to find text that contains a character other than a digit.
4. Compare **\d**, **\w**, and **\s** on a string containing letters, digits, punctuation, and whitespace.
5. Create a pattern with an optional character using **?**.
6. Compare greedy and lazy matching on two tags in one string.
7. Anchor a pattern to the input boundaries and test it with a prefix and suffix.
8. Use **\p{Letter}** with Unicode-aware mode to match letters from more than one writing system.
9. Check a pattern using the **v** flag only in a runtime that supports Unicode set notation.
10. Explain why **\b** may not be suitable for every language's word boundaries.
11. Pass an invalid pattern to the **RegExp** constructor and catch its **SyntaxError**.
12. Review a pattern with nested quantifiers and identify where excessive backtracking could occur.

## Key points

- A regular expression describes a pattern, and ordinary searches can find a substring.
- Regex literals and the **RegExp** constructor have different escaping rules.
- Metacharacters control matching; escape them when a literal character is intended.
- Character classes match one character from a set, while quantifiers repeat the preceding atom.
- Greedy and lazy quantifiers change how much text an atom tries to consume.
- Anchors and word boundaries assert positions without consuming characters.
- Unicode-aware modes support code point escapes, Unicode properties, and, with **v**, set operations.
- Regex syntax errors are thrown when invalid patterns are constructed.
- Prefer clear patterns and avoid ambiguous nested quantifiers on untrusted input.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [71 - SharedArrayBuffer, Atomics, and shared memory](071-sharedarraybuffer-atomics-and-shared-memory.md) | [Open Q&A](../qnas/072-regular-expression-syntax.md) | [Open example](../examples/072-regular-expression-syntax.md) | [73 - RegExp groups, flags, and string methods](073-regexp-groups-flags-and-string-methods.md) |
