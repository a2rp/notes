# 25 - String methods and text processing

JavaScript strings are immutable sequences of UTF-16 code units. String methods return a result without changing the original string. This chapter groups common methods for searching, extracting, replacing, splitting, cleaning, and formatting text.

The previous chapter explains code units, code points, grapheme clusters, and normalization. Keep those distinctions in mind: most string indexes and lengths still use UTF-16 code units.

## Searching text

Use the method that matches the question you need to ask.

| Question | Method | Result |
| --- | --- | --- |
| Does this text contain a substring? | **includes(search, position)** | Boolean |
| Does it begin with a prefix? | **startsWith(search, position)** | Boolean |
| Does it end with a suffix? | **endsWith(search, endPosition)** | Boolean |
| Where is the first occurrence? | **indexOf(search, position)** | Index or **-1** |
| Where is the last occurrence? | **lastIndexOf(search, position)** | Index or **-1** |

These methods compare string sequences exactly. They are case-sensitive and do not automatically normalize Unicode.

~~~js
const sentence = "JavaScript makes the web.";

console.log(sentence.includes("web")); // true
console.log(sentence.startsWith("JavaScript")); // true
console.log(sentence.endsWith("web.")); // true
console.log(sentence.indexOf("a")); // 1
console.log(sentence.lastIndexOf("a")); // 3
console.log(sentence.indexOf("Python")); // -1
~~~

The optional position arguments are indexes measured in UTF-16 code units. For search that ignores case, simple lowercasing can work for limited cases, but it is not a complete locale-aware search solution.

~~~js
const text = "JavaScript";
const query = "script";

console.log(text.toLowerCase().includes(query.toLowerCase())); // true
~~~

**includes()**, **startsWith()**, and **endsWith()** expect string search values, not regular expressions. Passing a regular expression to these methods throws a **TypeError**. Regular-expression search and matching are covered in the regular expression chapters.

## Finding and selecting portions

### Indexing and the at() method

Bracket access, **charAt()**, and **at()** select a UTF-16 code unit. **at()** also accepts a negative index, counting backward from the end.

~~~js
const word = "JavaScript";

console.log(word[0]); // J
console.log(word.charAt(1)); // a
console.log(word.at(-1)); // t
console.log(word.charAt(20)); // ""
console.log(word.at(20)); // undefined
~~~

These indexing operations can split a surrogate pair. They are useful for ordinary ASCII-like text, but they do not return a grapheme cluster. Use the Unicode-aware tools from the previous chapter when a task must respect code-point or grapheme boundaries.

### slice() and substring()

Both **slice()** and **substring()** return part of a string. The end index is excluded.

~~~js
const text = "JavaScript";

console.log(text.slice(4, 10)); // Script
console.log(text.slice(-6)); // Script
console.log(text.substring(4, 10)); // Script
console.log(text.substring(10, 4)); // Script
~~~

Their handling of indexes differs:

- **slice(start, end)** supports negative indexes, interpreted from the end of the string. If the start is after the end, it returns an empty string.
- **substring(start, end)** treats negative indexes as zero and swaps the arguments when start is greater than end.

Prefer **slice()** for most code because its negative-index behavior is consistent and it does not swap arguments. Both methods count UTF-16 code units, so a range can split a surrogate pair.

Avoid the old **substr()** method in new code. It is a legacy method and is not part of the recommended modern string API.

## Replacing text

**replace()** replaces the first matching substring when its search argument is a string. **replaceAll()** replaces every occurrence of a string.

~~~js
const text = "red, red, red";

console.log(text.replace("red", "blue"));
// blue, red, red

console.log(text.replaceAll("red", "blue"));
// blue, blue, blue

console.log(text);
// red, red, red
~~~

The original string is unchanged.

The search value may also be a regular expression. For a global regular expression, **replace()** replaces every match. **replaceAll()** requires a global regular expression; a non-global regular expression causes a **TypeError**.

~~~js
const text = "cat CAT Cat";

console.log(text.replace(/cat/gi, "dog"));
// dog dog dog
~~~

A replacement string can contain special replacement patterns:

| Pattern | Meaning |
| --- | --- |
| **$$** | A literal dollar sign |
| **$&** | The complete matched text |
| Dollar sign followed by a grave accent | The text before the match |
| **$'** | The text after the match |
| **$1**, **$2**, and so on | Captured groups in a regular expression |

For replacement text created dynamically, a callback avoids interpreting dollar sequences as replacement patterns.

~~~js
const message = "Price: 5";
const result = message.replace(/\d+/, (digits) => String(Number(digits) * 2));

console.log(result); // Price: 10
~~~

A replacement callback can receive the full match, captured groups, the match position, and the original string. Its exact arguments depend on whether the regular expression contains groups.

## Splitting text

**split()** divides a string around a separator and returns an array.

~~~js
const csv = "red,green,blue";

console.log(csv.split(","));
// ["red", "green", "blue"]

console.log(csv.split(",", 2));
// ["red", "green"]
~~~

The optional limit caps the number of returned array items. It does not mean a maximum character length.

A string separator is matched exactly. A regular-expression separator can match a pattern. Capturing groups in a separator regular expression are included in the returned array, which can be surprising.

~~~js
console.log("one:two:three".split(/(:)/));
// ["one", ":", "two", ":", "three"]
~~~

An empty string separator has an important Unicode limitation:

~~~js
console.log("😀".split(""));
// two UTF-16 code-unit strings
console.log([..."😀"]);
// one string containing the complete code point
~~~

**split("")** divides UTF-16 code units and may separate a surrogate pair. Spread syntax uses string iteration and keeps a valid surrogate pair together, but it still does not group grapheme clusters. Use **Intl.Segmenter** with grapheme granularity for grapheme-aware segmentation.

## Trimming whitespace

**trim()** removes whitespace and line terminators from both ends. **trimStart()** and **trimEnd()** remove them from one side.

~~~js
const input = "   JavaScript \n";

console.log(input.trim()); // JavaScript
console.log(input.trimStart()); // JavaScript \n
console.log(input.trimEnd()); //    JavaScript
~~~

These methods do not remove whitespace from the middle of a string.

**trimLeft()** and **trimRight()** are legacy aliases for **trimStart()** and **trimEnd()**. Use the start and end names in new code.

## Padding and repetition

**padStart()** and **padEnd()** add padding until a string reaches a requested length. **repeat()** repeats a string a chosen number of times.

~~~js
console.log("7".padStart(3, "0")); // 007
console.log("7".padEnd(3, ".")); // 7..
console.log("ha".repeat(3)); // hahaha
~~~

Padding length is measured in UTF-16 code units. The padding string can be repeated and shortened to fit. Choose padding carefully if it contains Unicode characters.

**repeat()** requires a non-negative finite count. A negative count throws a **RangeError**. A very large count can require too much memory.

Padding is useful for display formatting, but it does not format numbers or dates according to a locale. Use the relevant internationalization APIs for locale-sensitive formatting.

## Changing letter case

**toLowerCase()** and **toUpperCase()** return a new string with case mappings applied. **toLocaleLowerCase()** and **toLocaleUpperCase()** apply locale-sensitive mappings.

~~~js
const word = "JavaScript";

console.log(word.toLowerCase()); // javascript
console.log(word.toUpperCase()); // JAVASCRIPT
console.log("I".toLocaleLowerCase("tr")); // ı
~~~

Case conversion can change the number of code units and may produce more than one code point. It is not a substitute for Unicode normalization or a complete language-aware search algorithm.

For locale-aware ordering, **localeCompare()** compares strings using language-sensitive collation rules. Its result is negative, zero, or positive. Do not depend on it returning exactly **-1** or **1**.

~~~js
const names = ["Émile", "Ada", "Zoë"];

names.sort((first, second) => first.localeCompare(second, "en"));

console.log(names);
~~~

Collation order depends on locale and options. It can differ from JavaScript's default code-unit comparison.

## Chaining methods

Because string methods return new strings, they can be chained. Break a longer pipeline into named steps when that makes the transformation easier to inspect.

~~~js
const raw = "   JavaScript   ";

const cleaned = raw
    .trim()
    .toLowerCase()
    .replaceAll("javascript", "js");

console.log(cleaned); // js
console.log(raw); //    JavaScript
~~~

Each step operates on the result of the previous step. The original value remains unchanged.

## Text-processing caution

String methods perform the operation they name. They do not automatically:

- ignore letter case
- normalize canonically equivalent Unicode sequences
- understand words in every language
- preserve grapheme boundaries when slicing by index
- escape text for HTML, SQL, shell commands, or another output format

For web pages, use **textContent** when displaying untrusted text as text. Do not assume that **replace()** or **trim()** makes input safe for HTML.

~~~js
const userInput = "<strong>Hello</strong>";
messageElement.textContent = userInput;
~~~

## Common choices

| Task | Recommended starting point |
| --- | --- |
| Check for a literal substring | **includes()** |
| Check a prefix or suffix | **startsWith()** or **endsWith()** |
| Get part of a string | **slice()** |
| Replace one literal occurrence | **replace()** |
| Replace every literal occurrence | **replaceAll()** |
| Split around a known separator | **split()** |
| Remove whitespace at the edges | **trim()** |
| Pad a display string | **padStart()** or **padEnd()** |
| Repeat a short string | **repeat()** |
| Compare strings in a locale | **localeCompare()** |
| Segment visible character clusters | **Intl.Segmenter** |

## Try it yourself

1. Search a sentence with **includes()**, **startsWith()**, **endsWith()**, **indexOf()**, and **lastIndexOf()**.
2. Compare **slice()** and **substring()** with a negative index and with reversed start and end values.
3. Replace one occurrence and then every occurrence of the same word.
4. Split a CSV-like string with a comma separator and a limit.
5. Compare **split("")**, spread syntax, and grapheme segmentation on an emoji and a combining sequence.
6. Clean leading and trailing whitespace, then add padding to a short value.
7. Compare **toLowerCase()** with **toLocaleLowerCase()** for a locale-sensitive character.
8. Sort names with **localeCompare()** and try another locale.
9. Use a replacement callback to calculate a new value from matched digits.
10. Explain why text display and HTML escaping are separate concerns.

## Key points

- String methods return new strings. They do not mutate the original string.
- Search methods are case-sensitive and compare exact string sequences.
- String positions and lengths count UTF-16 code units.
- **slice()** accepts negative indexes; **substring()** swaps reversed indexes.
- **replace()** and **replaceAll()** differ in how many literal matches they replace.
- **split("")** can split a surrogate pair and should not be used for Unicode character counting.
- Trimming, padding, repetition, and case conversion each have specific behavior.
- Locale-aware comparison and formatting require locale-aware APIs.
- String transformation does not automatically make untrusted text safe for HTML.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [24 - Unicode: code units, code points, and graphemes](024-unicode-code-units-code-points-and-graphemes.md) | [Open Q&A](../qnas/025-string-methods-and-text-processing.md) | [Open example](../examples/025-string-methods-and-text-processing.md) | [26 - Operators, precedence, and associativity](026-operators-precedence-and-associativity.md) |
