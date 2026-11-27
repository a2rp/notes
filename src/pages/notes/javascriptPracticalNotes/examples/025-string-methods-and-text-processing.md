# 25 - String methods and text processing

This example demonstrates common string operations: searching, extracting, replacing, splitting, trimming, padding, and changing case. The code is displayed for study. Run each JavaScript block in a modern browser console or compatible JavaScript runtime.

## 1. Search for text

### Question

How can you check whether a sentence contains a word, starts with a phrase, ends with punctuation, and find the positions of matching text?

### Code

~~~js
const sentence = "JavaScript makes the web.";

console.log("contains web:", sentence.includes("web"));
console.log("starts with JavaScript:", sentence.startsWith("JavaScript"));
console.log("ends with period:", sentence.endsWith("."));
console.log("first a:", sentence.indexOf("a"));
console.log("last a:", sentence.lastIndexOf("a"));
console.log("missing word:", sentence.indexOf("Python"));
~~~

### Expected output

~~~text
contains web: true
starts with JavaScript: true
ends with period: true
first a: 1
last a: 3
missing word: -1
~~~

### Explanation

Use **includes()** for a yes or no answer, **startsWith()** and **endsWith()** for boundaries, and **indexOf()** or **lastIndexOf()** when you need an index. A missing search value returns **-1**, while a match at the start of the string has index **0**.

These comparisons are case-sensitive and count indexes in UTF-16 code units.

## 2. Extract a portion of a string

### Question

How can you select part of a string, including a portion counted from the end?

### Code

~~~js
const word = "JavaScript";

console.log("slice by range:", word.slice(4, 10));
console.log("last six units:", word.slice(-6));
console.log("substring:", word.substring(4, 10));
console.log("at from end:", word.at(-1));
~~~

### Expected output

~~~text
slice by range: Script
last six units: Script
substring: Script
at from end: t
~~~

### Explanation

The end argument is excluded. **slice()** accepts a negative index, where **-1** represents the last UTF-16 code unit. **substring()** does not interpret a negative index from the end and swaps its indexes if the start is greater than the end.

**at()** also accepts a negative index, but returns one UTF-16 code unit. For Unicode-aware slicing, use the code-point or grapheme techniques from the previous chapter.

## 3. Replace one or all occurrences

### Question

How can you replace the first matching word, replace every matching word, and compute replacement text from a match?

### Code

~~~js
const list = "red, red, red";

console.log("replace first:", list.replace("red", "blue"));
console.log("replace all:", list.replaceAll("red", "blue"));

const price = "Cost: $5";
const doubled = price.replace(/\$(\d+)/, (match, amount) =>
    "$" + String(Number(amount) * 2)
);

console.log("computed replacement:", doubled);
console.log("original:", list);
~~~

### Expected output

~~~text
replace first: blue, red, red
replace all: blue, blue, blue
computed replacement: Cost: $10
original: red, red, red
~~~

### Explanation

With a string search value, **replace()** changes only the first occurrence and **replaceAll()** changes every occurrence. Both return new strings.

The callback receives the match and captured groups. It calculates a replacement value for the matched amount. A callback is useful when replacement text is computed dynamically.

## 4. Split a string into parts

### Question

How can you split a delimited value, limit the number of results, and see why an empty separator is not Unicode-safe?

### Code

~~~js
const colors = "red,green,blue";

console.log("all colors:", colors.split(",").join(" | "));
console.log("limited colors:", colors.split(",", 2).join(" | "));

const face = "😀";

console.log(
    "split empty separator code units:",
    face.split("").map((part) => part.charCodeAt(0)).join(", "),
);
console.log(
    "string iteration code points:",
    [...face].map((part) => part.codePointAt(0)).join(", "),
);
~~~

### Expected output

~~~text
all colors: red | green | blue
limited colors: red | green
split empty separator code units: 55357, 56832
string iteration code points: 128512
~~~

### Explanation

The optional second argument to **split()** limits how many array items are returned. With **split("")**, the emoji is separated into its two UTF-16 surrogate code units. Spread syntax uses the string iterator and keeps the valid surrogate pair together as one code point.

That still does not group grapheme clusters such as combining sequences or joined emoji. Use **Intl.Segmenter** from the previous chapter when grapheme boundaries matter.

## 5. Trim, pad, and repeat

### Question

How can you remove whitespace at the edges, add padding, and repeat a string?

### Code

~~~js
const input = "   JavaScript \n";

console.log("trim:", input.trim());
console.log("trim start:", JSON.stringify(input.trimStart()));
console.log("trim end:", JSON.stringify(input.trimEnd()));

console.log("pad start:", "7".padStart(3, "0"));
console.log("pad end:", "7".padEnd(3, "."));
console.log("repeat:", "ha".repeat(3));
~~~

### Expected output

~~~text
trim: JavaScript
trim start: "JavaScript \n"
trim end: "   JavaScript"
pad start: 007
pad end: 7..
repeat: hahaha
~~~

### Explanation

**trim()** removes whitespace from both edges. **trimStart()** and **trimEnd()** remove it from one side. The example uses **JSON.stringify()** so remaining spaces and the newline are visible in the output.

Padding reaches the requested UTF-16 code-unit length. **repeat()** concatenates the string the requested number of times.

## 6. Normalize a basic search by case

### Question

How can you perform a simple case-insensitive substring check?

### Code

~~~js
function includesIgnoringCase(text, query) {
    return text.toLowerCase().includes(query.toLowerCase());
}

console.log(includesIgnoringCase("JavaScript", "script"));
console.log(includesIgnoringCase("JavaScript", "Python"));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

This approach works for many simple searches. It is not a complete multilingual search solution. Case mappings can depend on locale and may change the number of code points. Use locale-aware behavior when the application's search requirements need it.

## 7. Chain transformations without changing the source

### Question

How can you clean and transform a string while keeping the original value?

### Code

~~~js
const raw = "   JavaScript   ";

const cleaned = raw
    .trim()
    .toLowerCase()
    .replaceAll("javascript", "js");

console.log("cleaned:", cleaned);
console.log("original:", raw);
~~~

### Expected output

~~~text
cleaned: js
original:    JavaScript
~~~

### Explanation

Each method returns a new string, and the next method operates on that result. The original **raw** value remains unchanged.

## 8. Sort strings using locale-aware comparison

### Question

How can you sort names using a locale's collation rules without modifying the caller's array?

### Code

~~~js
function sortNames(names, locale) {
    return [...names].sort((first, second) =>
        first.localeCompare(second, locale)
    );
}

const names = ["Émile", "Ada", "Zoë"];
const sorted = sortNames(names, "en");

console.log("sorted:", sorted.join(", "));
console.log("original:", names.join(", "));
console.log("apple before banana:", "apple".localeCompare("banana", "en") < 0);
~~~

### Expected output

~~~text
sorted: Ada, Émile, Zoë
original: Émile, Ada, Zoë
apple before banana: true
~~~

### Explanation

**localeCompare()** applies locale-aware collation. The exact order can depend on the locale and runtime's collation data. Its result is negative, zero, or positive, so test the sign rather than expecting an exact **-1** or **1**.

The helper copies the array before sorting. This avoids changing the original array with **sort()**.

## 9. Display untrusted text as text

### Question

How should a browser display user-provided text without treating it as HTML markup?

### Code

~~~js
const userInput = "<strong>Hello</strong>";
const paragraph = document.createElement("p");

paragraph.textContent = userInput;

console.log(paragraph.textContent);
console.log(paragraph.querySelector("strong"));
~~~

### Expected output

~~~text
<strong>Hello</strong>
null
~~~

### Explanation

Setting **textContent** creates a text node. The angle brackets are displayed as text, and no **strong** element is created. String replacement and trimming are not HTML sanitizers.

## Try it yourself

1. Add another occurrence of **a** to the search sentence and compare **indexOf()** with **lastIndexOf()**.
2. Compare **slice()** with **substring()** using a negative index and reversed arguments.
3. Replace every occurrence of a chosen word using a callback.
4. Use a regular-expression separator to split text on commas or semicolons.
5. Compare **split("")**, spread syntax, and **Intl.Segmenter** on a flag and a family emoji.
6. Change the padding string and observe how the target length works.
7. Try **localeCompare()** with another locale.
8. Put text containing markup into **textContent** and observe that it remains text.

## Key points

- Search methods are case-sensitive and use UTF-16 indexes.
- **slice()** and **substring()** differ in how they handle negative and reversed indexes.
- **replace()** replaces one string occurrence; **replaceAll()** replaces all literal occurrences.
- **split("")** can divide a surrogate pair.
- Trimming affects string edges; padding and repetition produce new strings.
- **localeCompare()** performs locale-aware comparison, not fixed ASCII sorting.
- JavaScript string methods do not mutate the original string.
- Display untrusted text with **textContent** instead of interpreting it as HTML.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [24 - Unicode: code units, code points, and graphemes](../lessons/024-unicode-code-units-code-points-and-graphemes.md) | [Open lesson](../lessons/025-string-methods-and-text-processing.md) | [Open Q&A](../qnas/025-string-methods-and-text-processing.md) | [26 - Operators, precedence, and associativity](../lessons/026-operators-precedence-and-associativity.md) |
