# 25 - String methods and text processing

This Q&A reviews common JavaScript string methods and their behavior. Each answer follows its question and includes an explanation where it helps.

## Multiple-choice questions

### 1. What does **includes()** return?

A. The index of the match  
B. A Boolean indicating whether a substring exists  
C. An array of all matches  
D. A new string with the match removed

**Answer: B. A Boolean indicating whether a substring exists.**

Use **indexOf()** if you need the position of the first occurrence.

### 2. What does **indexOf()** return when it cannot find the requested text?

A. **0**  
B. **null**  
C. **undefined**  
D. **-1**

**Answer: D. -1.**

Index zero is a valid match position, so test for **-1** rather than using a truthiness check.

### 3. Which method is usually the clearest choice for extracting text with negative indexes?

A. **slice()**  
B. **substring()**  
C. **split()**  
D. **trim()**

**Answer: A. slice().**

Negative indexes in **slice()** count backward from the end. **substring()** treats negative values as zero and swaps reversed arguments.

### 4. What is the main difference between **replace()** and **replaceAll()** with a string search value?

A. **replace()** mutates the original  
B. **replaceAll()** returns an array  
C. **replace()** replaces the first occurrence, while **replaceAll()** replaces every occurrence  
D. They always have identical behavior

**Answer: C.**

Both return a new string. Neither changes the original string.

### 5. Which statement about **replaceAll()** with a regular expression is correct?

A. It accepts only regular expressions without flags  
B. Its regular expression must have the global flag  
C. It accepts only strings  
D. It modifies the input string

**Answer: B. Its regular expression must have the global flag.**

A non-global regular expression passed to **replaceAll()** causes a **TypeError**.

### 6. What does **split(",")** do to the string **"a,b,c"**?

A. Returns **"a"**  
B. Returns **["a", "b", "c"]**  
C. Returns **["a,b", "c"]**  
D. Replaces commas with spaces

**Answer: B. Returns ["a", "b", "c"].**

The separator marks the boundaries between the resulting array items.

### 7. What does **"😀".split("")** split the string into?

A. One grapheme cluster  
B. One Unicode code point  
C. Two UTF-16 code units  
D. Four UTF-8 bytes

**Answer: C. Two UTF-16 code units.**

An empty string separator can split a surrogate pair. Use string iteration for code points, or **Intl.Segmenter** for graphemes.

### 8. Which method removes whitespace from both ends of a string?

A. **replace()**  
B. **trim()**  
C. **split()**  
D. **padEnd()**

**Answer: B. trim().**

**trimStart()** and **trimEnd()** remove whitespace from only one side.

### 9. What unit does **padStart(targetLength)** use for its target length?

A. UTF-8 bytes  
B. Grapheme clusters  
C. UTF-16 code units  
D. Words

**Answer: C. UTF-16 code units.**

Padding does not count user-perceived characters or display width.

### 10. What can **localeCompare()** return?

A. Only **-1** or **1**  
B. A negative number, zero, or a positive number  
C. An array of sorted strings  
D. A Boolean only

**Answer: B. A negative number, zero, or a positive number.**

The sign indicates sort order. Do not require the exact result to be **-1** or **1**.

## Predict the output

### 11. What is the output?

~~~js
const text = "JavaScript makes the web.";

console.log(text.includes("web"));
console.log(text.startsWith("Java"));
console.log(text.endsWith("web."));
~~~

**Answer:**

~~~text
true
true
true
~~~

These methods perform case-sensitive comparisons against the given string.

### 12. What is the output?

~~~js
const text = "JavaScript";

console.log(text.indexOf("a"));
console.log(text.lastIndexOf("a"));
console.log(text.indexOf("Python"));
~~~

**Answer:**

~~~text
1
3
-1
~~~

The first **a** is at UTF-16 index 1, the last is at index 3, and a missing search value produces **-1**.

### 13. What is the output?

~~~js
const text = "JavaScript";

console.log(text.slice(4, 10));
console.log(text.slice(-6));
~~~

**Answer:**

~~~text
Script
Script
~~~

The end index is excluded. A negative start index is measured from the end.

### 14. What is the output?

~~~js
const text = "JavaScript";

console.log(text.substring(4, 10));
console.log(text.substring(10, 4));
~~~

**Answer:**

~~~text
Script
Script
~~~

Unlike **slice()**, **substring()** swaps its arguments if the first index is greater than the second.

### 15. What is the output?

~~~js
const text = "red, red";

console.log(text.replace("red", "blue"));
console.log(text.replaceAll("red", "blue"));
console.log(text);
~~~

**Answer:**

~~~text
blue, red
blue, blue
red, red
~~~

The string form of **replace()** changes only the first occurrence. **replaceAll()** changes every occurrence. Both leave the original value unchanged.

### 16. What is the output?

~~~js
console.log("red RED".replace(/red/gi, "blue"));
~~~

**Answer:**

~~~text
blue blue
~~~

The regular expression's **i** flag ignores case and its **g** flag finds every match.

### 17. What is the output?

~~~js
console.log("red,green,blue".split(",").join(" | "));
console.log("red,green,blue".split(",", 2).join(" | "));
~~~

**Answer:**

~~~text
red | green | blue
red | green
~~~

The second argument to **split()** limits the number of returned array items.

### 18. What is the output?

~~~js
const value = "   JavaScript   ";

console.log(value.trim());
console.log(value.trimStart());
console.log(value.trimEnd());
~~~

**Answer:**

~~~text
JavaScript
JavaScript
      JavaScript
~~~

The spaces remaining in the last two outputs are on the opposite edge from the one being trimmed.

### 19. What is the output?

~~~js
console.log("7".padStart(3, "0"));
console.log("7".padEnd(3, "."));
console.log("ha".repeat(3));
~~~

**Answer:**

~~~text
007
7..
hahaha
~~~

Padding adds characters until the requested length is reached. **repeat()** concatenates repeated copies.

### 20. What is the output?

~~~js
const raw = "   JavaScript   ";
const cleaned = raw.trim().toLowerCase();

console.log(cleaned);
console.log(raw);
~~~

**Answer:**

~~~text
javascript
   JavaScript
~~~

The methods return new values. The original string remains unchanged.

## True or false

### 21. String search methods such as **includes()** are case-sensitive by default.

**Answer: True.**

For example, **"Cat".includes("cat")** returns **false**.

### 22. **indexOf()** returns **0** when it cannot find a match.

**Answer: False.**

It returns **-1**. An occurrence at the beginning of a string has index zero.

### 23. **slice()** and **substring()** handle negative indexes the same way.

**Answer: False.**

**slice()** counts negative indexes from the end. **substring()** clamps negative indexes to zero.

### 24. Calling **replace()** changes the original string.

**Answer: False.**

Strings are immutable. **replace()** returns a new string.

### 25. **split("")** safely splits any Unicode string into visible characters.

**Answer: False.**

It splits UTF-16 code units and can break a surrogate pair. It also does not account for grapheme clusters.

### 26. **trim()** removes whitespace between words.

**Answer: False.**

It removes whitespace and line terminators from the start and end only.

### 27. **padStart()** counts grapheme clusters.

**Answer: False.**

Its target length is measured in UTF-16 code units.

### 28. **toLowerCase()** performs Unicode normalization.

**Answer: False.**

Case conversion and normalization are separate operations. Use **normalize()** when canonical or compatibility normalization is required.

### 29. **localeCompare()** is guaranteed to return exactly **-1**, **0**, or **1**.

**Answer: False.**

Only the sign of the result is meaningful for ordering.

### 30. **replaceAll()** with a string search value replaces every exact occurrence of that string.

**Answer: True.**

It performs literal string replacement and returns a new string.

## Short-answer questions

### 31. When should you use **includes()** instead of **indexOf()**?

**Answer:**

Use **includes()** when you only need to know whether the text exists. Use **indexOf()** when you need the first matching index.

### 32. What is the difference between **slice()** and **substring()**?

**Answer:**

Both return a portion of a string and exclude the end index. **slice()** supports negative indexes and does not swap reversed positions. **substring()** treats negative values as zero and swaps its arguments when the first is greater.

### 33. How can you replace every occurrence of a literal string?

**Answer:**

~~~js
const result = text.replaceAll("old", "new");
~~~

This treats the search value as a literal string. A global regular expression is another option when pattern matching is needed.

### 34. Why might a replacement callback be safer than a replacement string?

**Answer:**

Replacement strings interpret special patterns such as **$&** and **$1**. A callback returns its result as replacement text, which avoids accidentally interpreting dollar sequences in dynamically created text.

### 35. What does the optional limit in **split(separator, limit)** control?

**Answer:**

It caps the number of array items returned. It does not limit the number of characters in each item.

### 36. When should you use **Intl.Segmenter** instead of **split("")**?

**Answer:**

Use **Intl.Segmenter** when boundaries must respect grapheme clusters, words, or sentences. **split("")** divides UTF-16 code units and can break surrogate pairs.

### 37. Why is lowercasing both strings not always a full solution for case-insensitive search?

**Answer:**

Case mappings can depend on language and can change the number of code points. Lowercasing can be useful for simple cases, but robust multilingual search needs locale-aware handling and may need normalization or collation-aware APIs.

### 38. What does **trim()** remove, and what does it leave?

**Answer:**

It removes whitespace and line terminators from both ends of a string. It leaves spaces between characters inside the string.

### 39. Why should string padding not be used as locale-aware number formatting?

**Answer:**

Padding inserts a chosen string to reach a code-unit length. It does not apply locale rules for decimal separators, grouping, digits, or currency. Use internationalization number-formatting APIs for those tasks.

### 40. Why is **replace()** not an HTML sanitizer?

**Answer:**

It only performs string replacement. It does not understand the HTML parsing context or safely encode every possible input. Display untrusted text with **textContent** or use a context-appropriate trusted sanitization strategy.

## Coding questions

### 41. Write a function that returns whether a string contains a query without regard to basic letter case.

**Answer:**

~~~js
function includesIgnoringCase(text, query) {
    return text.toLowerCase().includes(query.toLowerCase());
}
~~~

This is a simple solution for limited cases. It is not a complete locale-aware search algorithm.

### 42. Write a function that removes whitespace at both ends and collapses internal whitespace runs to one space.

**Answer:**

~~~js
function normalizeSpaces(text) {
    return text.trim().replace(/\s+/g, " ");
}
~~~

The regular expression matches runs of whitespace. If the application requires a more specific Unicode whitespace policy, define that policy explicitly.

### 43. Write a function that replaces every literal occurrence of a word.

**Answer:**

~~~js
function replaceEveryLiteral(text, search, replacement) {
    return text.replaceAll(search, replacement);
}
~~~

The search value is literal text. For a pattern, use a regular expression and understand its flags and replacement behavior.

### 44. Write a function that takes the last few UTF-16 units from a string.

**Answer:**

~~~js
function lastUnits(text, count) {
    return text.slice(-count);
}
~~~

This intentionally works with UTF-16 indexes and may split a surrogate pair. For code-point or grapheme truncation, use the Unicode-aware approaches from the previous chapter.

### 45. Sort a list of names using English locale collation.

**Answer:**

~~~js
function sortNames(names) {
    return [...names].sort((first, second) =>
        first.localeCompare(second, "en")
    );
}
~~~

The copied array is sorted, so the caller's original array is not mutated.

### 46. Replace each matched number with twice its value.

**Answer:**

~~~js
function doubleNumbers(text) {
    return text.replace(/\d+/g, (digits) =>
        String(Number(digits) * 2)
    );
}
~~~

The **g** flag replaces every match, and the callback computes the replacement from each matched number.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [24 - Unicode: code units, code points, and graphemes](../lessons/024-unicode-code-units-code-points-and-graphemes.md) | [Open lesson](../lessons/025-string-methods-and-text-processing.md) | [Open example](../examples/025-string-methods-and-text-processing.md) | [26 - Operators, precedence, and associativity](../lessons/026-operators-precedence-and-associativity.md) |
