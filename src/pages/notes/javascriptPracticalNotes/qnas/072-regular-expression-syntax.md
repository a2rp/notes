# 72 - Regular expression syntax: Q&A

Use these questions to review pattern matching, regex literals, escaping, character classes, quantifiers, assertions, and Unicode syntax. Each answer appears immediately after its question and explains the reasoning.

## Multiple-choice questions

### 1. What does a regular expression describe?

- A. A JavaScript object schema
- B. A text pattern
- C. A replacement string only
- D. A function that always validates an entire string

**Answer: B.** A regular expression describes a pattern for finding or checking text. A search usually finds a matching substring unless the pattern uses position assertions to constrain the match.

### 2. What does this test?

~~~js
/cat/.test("concatenate")
~~~

- A. Whether the entire input is exactly "cat"
- B. Whether the input contains a substring matching "cat"
- C. Whether the input starts with "cat"
- D. Whether the input contains three vowels

**Answer: B.** The pattern has no anchors, so **test()** succeeds if a matching substring appears anywhere in the input.

### 3. Which constructor creates the same digit pattern as the literal /\d+/?

- A. new RegExp("\d+")
- B. new RegExp("\\d+")
- C. new RegExp("/d+")
- D. new RegExp("[d]+")

**Answer: B.** The JavaScript string parser consumes one level of escaping. The string must contain a backslash for the regex parser, so the source code uses two backslashes.

### 4. What must happen to a slash inside a regex literal?

- A. It must be doubled
- B. It must be escaped
- C. It must be placed inside a character class
- D. It cannot appear in a regex literal

**Answer: B.** A slash marks the end of a regex literal, so an intended slash character inside the pattern is written as **\/**.

### 5. What does the dot match in a pattern without dotAll mode?

- A. Only digits
- B. Any character including every line terminator
- C. Any character except line terminators
- D. Only punctuation

**Answer: C.** The dot is a wildcard for one character, except line terminators unless dotAll mode is enabled.

### 6. What does [A-C] match?

- A. Any uppercase letter
- B. One of A, B, or C
- C. The literal text "A-C"
- D. A, C, or any digit

**Answer: B.** A hyphen between endpoints defines a character range. This range includes A through C.

### 7. What does [^0-9] match?

- A. One digit
- B. A string with no digits anywhere
- C. One character that is not an ASCII digit
- D. The beginning of a line

**Answer: C.** A caret immediately after the opening bracket negates the character class. The class matches one non-digit character, including a line terminator.

### 8. Which statement about \d is accurate in JavaScript?

- A. It matches every numeral character in every writing system
- B. It matches ASCII digits from 0 through 9
- C. It matches letters and digits
- D. It matches whitespace

**Answer: B.** JavaScript's **\d** shorthand matches ASCII digits. Use Unicode property escapes when the requirement concerns broader Unicode character categories.

### 9. What does \w generally match?

- A. Any letter from any language
- B. ASCII letters, digits, and underscore
- C. Whitespace
- D. Any character that is not punctuation

**Answer: B.** The basic word-character set is mostly ASCII letters, digits, and underscore. It is not a general linguistic definition of a word.

### 10. What does \s match?

- A. Whitespace
- B. Only the ordinary space character
- C. Any punctuation
- D. A word boundary

**Answer: A.** **\s** matches whitespace characters, including spaces and line terminators.

### 11. What does + mean in a pattern?

- A. Zero or more repetitions
- B. One or more repetitions
- C. Exactly one repetition
- D. The end of the input

**Answer: B.** A plus quantifier repeats the preceding atom one or more times. A star allows zero repetitions.

### 12. Which quantifier means zero or one occurrence?

- A. *
- B. +
- C. ?
- D. {2,}

**Answer: C.** **?** after an atom makes that atom optional. After another quantifier, it makes the quantifier lazy.

### 13. In the pattern ab+, what repeats?

- A. The whole text "ab"
- B. Only the letter b
- C. Only the letter a
- D. Neither character

**Answer: B.** A quantifier applies to the immediately preceding atom. Parentheses are used when a larger expression must repeat.

### 14. What is the difference between a greedy and a lazy quantifier?

- A. Greedy quantifiers are invalid, while lazy ones are valid
- B. Greedy quantifiers try to consume more text first, while lazy quantifiers try less first
- C. Lazy quantifiers never backtrack
- D. Greedy quantifiers only work on digits

**Answer: B.** Greedy quantifiers initially take as much as possible while permitting the rest of the pattern to match. Appending **?** makes a quantifier lazy, so it initially takes less.

### 15. What does the vertical bar mean in a pattern such as tea|coffee?

- A. Repeat the preceding character
- B. Separate alternatives
- C. Match a literal space
- D. Assert the input end

**Answer: B.** The pattern succeeds if one of its alternatives matches.

### 16. What does ^ usually assert without multiline mode?

- A. The beginning of the input
- B. The beginning of a word
- C. A digit
- D. The previous match

**Answer: A.** Without multiline mode, **^** asserts the start of the input. The multiline flag changes its line behavior.

### 17. What does \b assert?

- A. A literal backspace only
- B. A position at a word boundary
- C. The beginning of the input only
- D. A match for one whitespace character

**Answer: B.** Outside a character class, **\b** is a zero-width word-boundary assertion. Inside a character class, **\b** represents a backspace character.

### 18. What does \p{Letter} require?

- A. A Unicode-aware regex mode
- B. A global flag
- C. A capturing group
- D. A RegExp constructor only

**Answer: A.** Unicode property escapes require Unicode-aware mode, using the **u** or **v** flag.

### 19. Which statement about u and v is correct?

- A. They must always be used together
- B. They cannot be used together on the same regular expression
- C. They both mean case-insensitive
- D. They are valid only with RegExp constructors

**Answer: B.** Both flags enable Unicode-aware behavior, but their pattern modes differ. A regex cannot specify both **u** and **v**.

### 20. What happens when a malformed pattern is passed to new RegExp()?

- A. It silently removes invalid characters
- B. It throws a SyntaxError
- C. It always matches an empty string
- D. It converts the pattern to a string and ignores it

**Answer: B.** The constructor parses the pattern and throws a **SyntaxError** if the pattern grammar is invalid.

## Code-reading questions

### 21. What does this print?

~~~js
console.log(/\d{3}/.test("Room 204"));
console.log(/\d{3}/.test("Room 20"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** **\d{3}** requires three consecutive ASCII digits. The first input contains them, while the second has only two.

### 22. What does this print?

~~~js
console.log(/[A-F0-3]/.test("D"));
console.log(/[A-F0-3]/.test("2"));
console.log(/[A-F0-3]/.test("G"));
~~~

**Answer:**

~~~text
true
true
false
~~~

**Explanation:** The class contains uppercase letters A through F and digits zero through three.

### 23. What does this print?

~~~js
console.log(/[^0-9]/.test("508"));
console.log(/[^0-9]/.test("50x"));
~~~

**Answer:**

~~~text
false
true
~~~

**Explanation:** The negated class succeeds if it can find one character that is not an ASCII digit. The first input contains no such character; the second contains **x**.

### 24. What does this print?

~~~js
console.log(/colou?r/.test("color"));
console.log(/colou?r/.test("colour"));
~~~

**Answer:**

~~~text
true
true
~~~

**Explanation:** The question mark makes the immediately preceding **u** optional.

### 25. What does this print?

~~~js
console.log(/a{2,4}/.test("a"));
console.log(/a{2,4}/.test("aaa"));
~~~

**Answer:**

~~~text
false
true
~~~

**Explanation:** The bounded quantifier requires at least two and at most four consecutive **a** characters.

### 26. What does this print?

~~~js
console.log(/cat/.test("a cat"));
console.log(/^cat$/.test("a cat"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The unanchored expression can match the substring **cat**. The anchored pattern requires a match at the input boundaries.

### 27. What does the greedy pattern match?

~~~js
console.log("<b>one</b><i>two</i>".match(/<.*>/)[0]);
~~~

**Answer:**

~~~text
<b>one</b><i>two</i>
~~~

**Explanation:** The dot can match the characters between tags, and **\*** is greedy. It consumes through the last **>** that allows the pattern to finish.

### 28. What does the lazy pattern match?

~~~js
console.log("<b>one</b><i>two</i>".match(/<.*?>/)[0]);
~~~

**Answer:**

~~~text
<b>
~~~

**Explanation:** The lazy **\*?** starts with the shortest possible match that lets the rest of the pattern succeed. The first closing angle bracket completes the match.

### 29. What does the Unicode property pattern find?

~~~js
console.log("café7".match(/\p{Letter}+/u)[0]);
~~~

**Answer:**

~~~text
café
~~~

**Explanation:** **\p{Letter}** matches Unicode letters. The digit is not a letter, so the consecutive match ends before **7**.

### 30. What does this print?

~~~js
console.log(/\bcat\b/.test("a cat!"));
console.log(/\bcat\b/.test("concatenate"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** In the first input, the pattern has a word boundary before and after **cat**. In the second, the letters are part of a longer word-character sequence.

### 31. What does this print?

~~~js
console.log("😀".length);
console.log([..."😀"].length);
~~~

**Answer:**

~~~text
2
1
~~~

**Explanation:** JavaScript string length counts UTF-16 code units. The spread operation iterates by Unicode code point, so this emoji contributes one item. Unicode-aware regex mode also treats surrogate pairs as code points, but not every multi-code-point grapheme as one character.

### 32. Does this pattern match a newline as the character after a?

~~~js
console.log(/a.b/.test("a\nb"));
~~~

**Answer:** **false**

**Explanation:** The dot does not match a line terminator without dotAll mode. The next chapter covers the dotAll flag and other regex flags.

## Short-answer questions

### 33. What is the difference between a regex literal and the RegExp constructor?

**Answer:** A regex literal is written directly between slashes in source code. The **RegExp** constructor receives a JavaScript string and is useful when the pattern is assembled dynamically.

**Explanation:** Backslashes in constructor strings are first processed by the JavaScript string parser, so they usually need an extra level of escaping.

### 34. Why does a regular expression often match only part of an input?

**Answer:** Search operations look for a matching substring by default.

**Explanation:** Start and end assertions constrain where a match may occur. Validation should be designed deliberately rather than assuming every regex checks the whole string.

### 35. What does escaping a metacharacter do?

**Answer:** It makes the metacharacter represent itself rather than its regex function.

**Explanation:** For example, **\.** matches a literal period, while an unescaped dot is a wildcard for a character other than a line terminator.

### 36. What is the difference between a character class and a quantifier?

**Answer:** A character class chooses one character from a set. A quantifier repeats the atom immediately before it.

**Explanation:** **[abc]** matches one of **a**, **b**, or **c**. **a+** matches one or more consecutive **a** characters.

### 37. Why is a negated character class not equivalent to the dot?

**Answer:** A negated character class matches any character not in its set, including line terminators. The dot excludes line terminators unless dotAll mode is enabled.

**Explanation:** For example, **[^,]** can match a newline because a newline is not a comma.

### 38. What is a zero-width assertion?

**Answer:** It checks a position in the input without consuming a character.

**Explanation:** Start, end, and word-boundary assertions constrain where a match can occur while leaving the matched text unchanged.

### 39. Why is \w not a universal Unicode letter class?

**Answer:** Its basic set is mostly ASCII letters, digits, and underscore.

**Explanation:** Use a Unicode property escape such as **\p{Letter}** with Unicode-aware mode when the requirement is to match Unicode letters.

### 40. What is the difference between a Unicode code point and a grapheme cluster?

**Answer:** A code point is one Unicode scalar value. A grapheme cluster is a sequence of code points that users perceive as one character.

**Explanation:** An accented letter can be represented as a precomposed code point or as a base letter plus a combining mark. Unicode regex mode handles code points, but it does not automatically combine every grapheme sequence into one match unit.

### 41. What does a lazy quantifier change?

**Answer:** It changes the quantifier's initial preference from consuming more text to consuming less text.

**Explanation:** The engine can still expand a lazy match when needed to satisfy the rest of the pattern. Lazy matching is not the same as disabling backtracking.

### 42. Why can nested or overlapping quantifiers be a performance problem?

**Answer:** They can create many possible ways to divide the same input among repeated parts, causing extensive backtracking.

**Explanation:** Ambiguous patterns can take a long time on long, malformed input. Prefer specific delimiters and test patterns against adversarial input.

### 43. What does $ mean when multiline mode is not enabled?

**Answer:** It asserts the end of the input, with a special behavior that can also match before a final line terminator.

**Explanation:** This detail matters for strict validation. Understand the input format and test boundary cases such as trailing newlines.

### 44. What does \b mean inside and outside a character class?

**Answer:** Outside a character class, it is a word-boundary assertion. Inside a character class, it represents a backspace character.

**Explanation:** The same escape can have context-dependent meaning in regex syntax.

## Coding and design questions

### 45. Write a pattern that finds a literal period between a and b.

**Answer:**

~~~js
const pattern = /a\.b/;

console.log(pattern.test("a.b"));
console.log(pattern.test("a-b"));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** The backslash escapes the dot, so the pattern requires a literal period.

### 46. Write a pattern for exactly four ASCII digits and check the whole input.

**Answer:**

~~~js
const fourDigits = /^\d{4}$/;

console.log(fourDigits.test("2048"));
console.log(fourDigits.test("Room 2048"));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** **\d{4}** requires four consecutive ASCII digits. The anchors require the match to be at the input boundaries. For strict validation, also test trailing line terminators because **$** has a final-line-terminator rule.

### 47. Match a run of Unicode letters from more than one writing system.

**Answer:**

~~~js
const letters = /\p{Letter}+/u;

console.log("café".match(letters)[0]);
console.log("Καλημέρα".match(letters)[0]);
~~~

Output:

~~~text
café
Καλημέρα
~~~

**Explanation:** The Unicode Letter property works across scripts. The **u** flag enables Unicode-aware property escapes.

### 48. Create a pattern that finds a whole basic word named item.

**Answer:**

~~~js
const itemWord = /\bitem\b/;

console.log(itemWord.test("the item is ready"));
console.log(itemWord.test("itemized list"));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** The boundary assertions prevent the match from being part of a larger basic word. This definition follows regex word-character rules and is not a universal linguistic boundary.

### 49. Write a constructor pattern that matches one or more digits.

**Answer:**

~~~js
const digits = new RegExp("\\d+");

console.log(digits.test("box 17"));
console.log(digits.test("box"));
~~~

Output:

~~~text
true
false
~~~

**Explanation:** The JavaScript string contains **\\d+**, which produces the regex pattern **\d+** after string parsing.

### 50. Catch an invalid pattern instead of allowing construction to stop the program.

**Answer:**

~~~js
try {
  const invalid = new RegExp("[");
  console.log(invalid);
} catch (error) {
  console.log(error instanceof SyntaxError);
}
~~~

Output:

~~~text
true
~~~

**Explanation:** An opening character-class bracket without a valid closing bracket is an invalid pattern. Construction throws a **SyntaxError**, which the catch block handles.

### 51. Review a pattern for a simple identifier and state its limitation.

~~~js
const identifier = /^[A-Za-z_]\w*$/;

console.log(identifier.test("_value7"));
console.log(identifier.test("7value"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The first character must be an ASCII letter or underscore. Later characters may also include digits because **\w** includes them. This is only an identifier-like pattern, not a complete implementation of JavaScript identifier grammar or reserved-word checks.

### 52. Improve this unsafe pattern for matching text between two angle brackets.

~~~js
/<.*>/
~~~

**Answer:** If the desired content cannot contain another angle bracket, a negated class is more specific:

~~~js
const tag = /<[^<>]*>/;

console.log("<b>text</b>".match(tag)[0]);
~~~

Output:

~~~text
<b>
~~~

**Explanation:** The negated class stops at the next angle bracket instead of consuming through later tags. The correct pattern depends on the input grammar. A regular expression like this is not a complete HTML parser.

## Review checklist

Before relying on a regex, ask:

- Should it find a substring or validate the entire input?
- Are metacharacters escaped when they should be literal?
- Does each quantifier apply to the intended atom?
- Can the pattern match a newline unexpectedly?
- Does the character shorthand fit the text's writing systems?
- Does the input need Unicode-aware behavior?
- Can nested quantifiers backtrack excessively?
- Have trailing line terminators and malformed inputs been considered?

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [71 - SharedArrayBuffer, Atomics, and shared memory](../lessons/071-sharedarraybuffer-atomics-and-shared-memory.md) | [Open lesson](../lessons/072-regular-expression-syntax.md) | [Open example](../examples/072-regular-expression-syntax.md) | [73 - RegExp groups, flags, and string methods](../lessons/073-regexp-groups-flags-and-string-methods.md) |
