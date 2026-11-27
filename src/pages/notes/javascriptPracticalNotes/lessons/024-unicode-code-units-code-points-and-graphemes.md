# 24 - Unicode: code units, code points, and graphemes

Text can look like a sequence of simple characters, but a JavaScript string is stored and indexed as UTF-16 code units. One visible symbol may use one code unit, a pair of code units, several Unicode code points, or a combination of letters and marks.

These differences matter when you count, inspect, split, truncate, compare, or display international text. This chapter distinguishes code units, code points, and grapheme clusters, then introduces JavaScript tools for working with them.

## Three useful units

| Unit | What it describes | Example |
| --- | --- | --- |
| Code unit | A 16-bit element used by JavaScript string indexing | One half of a UTF-16 surrogate pair |
| Code point | A Unicode number such as **U+0041** or **U+1F600** | The code point for 😀 is **U+1F600** |
| Grapheme cluster | A sequence that behaves like one user-perceived character | A letter plus an accent mark, or a joined emoji |

These units answer different questions. Use the one that matches the task.

## JavaScript strings use UTF-16 code units

JavaScript string **length** counts 16-bit code units. Basic Latin characters usually use one code unit:

~~~js
const word = "cat";

console.log(word.length); // 3
console.log(word[0]); // "c"
~~~

A code point above **U+FFFF** is encoded as a pair of UTF-16 code units called a surrogate pair. For example, 😀 is **U+1F600** and uses two code units:

~~~js
const face = "😀";

console.log(face.length); // 2
console.log(face[0]); // first surrogate code unit, not the whole emoji
console.log(face[1]); // second surrogate code unit
~~~

This is why indexing or slicing at an arbitrary position can split a surrogate pair.

## Code points and surrogate pairs

A code point is a numeric value in the Unicode code space. Code points up to **U+FFFF** are encoded in one UTF-16 code unit, except that surrogate code points are reserved for encoding pairs. A supplementary code point is encoded as a leading surrogate followed by a trailing surrogate.

JavaScript provides methods to inspect code units and code points:

~~~js
const face = "😀";

console.log(face.charCodeAt(0)); // 55357, the leading surrogate
console.log(face.charCodeAt(1)); // 56832, the trailing surrogate
console.log(face.codePointAt(0)); // 128512, U+1F600
console.log(face.codePointAt(1)); // 56832, the code unit at index 1
~~~

**charCodeAt(index)** returns the code unit at a UTF-16 index. **codePointAt(index)** combines a valid surrogate pair only when the index points to its leading surrogate. Its argument is still a code-unit index.

Use **String.fromCharCode()** to build from code units, and **String.fromCodePoint()** to build from code point values:

~~~js
const faceFromCodePoint = String.fromCodePoint(0x1F600);
const faceFromPair = String.fromCharCode(0xD83D, 0xDE00);

console.log(faceFromCodePoint); // "😀"
console.log(faceFromPair); // "😀"
console.log(String.fromCodePoint(0x41, 0x1F600)); // "A😀"
~~~

**String.fromCharCode(0x1F600)** does not build the full emoji because that method converts arguments to 16-bit code units. Use **String.fromCodePoint()** for a full code point.

## Iterate by code point

String iteration with **for...of**, spread syntax, and **Array.from()** combines valid surrogate pairs into a single string item:

~~~js
const face = "😀";

console.log([...face]); // ["😀"]
console.log([...face].length); // 1

for (const point of face) {
    console.log(point);
}
~~~

This counts code points, not user-perceived characters. A grapheme can contain multiple code points, such as a base letter with a combining accent or an emoji sequence.

## Grapheme clusters

A grapheme cluster is a sequence treated as one user-perceived character for many text operations. It can consist of:

- One code point, such as **A**.
- A base letter followed by a combining mark, such as **e** plus **U+0301**.
- A flag made from two regional indicator code points.
- An emoji followed by a skin-tone modifier.
- Several emoji joined by zero-width joiner characters.

For example, the visible text **é** can be represented as a single precomposed code point or as **e** plus a combining acute accent:

~~~js
const precomposed = "\u00E9";
const decomposed = "e\u0301";

console.log(precomposed === decomposed); // false
console.log(precomposed.length); // 1
console.log(decomposed.length); // 2
console.log([...precomposed].length); // 1 code point
console.log([...decomposed].length); // 2 code points
~~~

They can look the same while having different underlying sequences.

## Segment graphemes with Intl.Segmenter

Use **Intl.Segmenter** with **granularity: "grapheme"** when an operation needs to work with user-perceived characters, such as counting or truncating visible text.

~~~js
const text = "A😀e\u0301";
const segmenter = new Intl.Segmenter(undefined, {
    granularity: "grapheme"
});
const graphemes = Array.from(
    segmenter.segment(text),
    item => item.segment
);

console.log(graphemes); // ["A", "😀", "é"]
console.log(graphemes.length); // 3
~~~

The segment data also includes the original input and a **index** property containing the segment's starting UTF-16 code-unit index:

~~~js
const firstSegment = segmenter.segment(text)[Symbol.iterator]().next().value;

console.log(firstSegment.segment); // "A"
console.log(firstSegment.index); // 0
console.log(firstSegment.input); // "A😀é"
~~~

The **Intl.Segmenter** constructor also supports **"word"** and **"sentence"** granularity for locale-sensitive text boundaries. Make sure the JavaScript runtime used by an application provides **Intl.Segmenter**.

### Count graphemes

~~~js
function countGraphemes(text) {
    const segmenter = new Intl.Segmenter(undefined, {
        granularity: "grapheme"
    });

    return Array.from(segmenter.segment(text)).length;
}

console.log(countGraphemes("😀")); // 1
console.log(countGraphemes("e\u0301")); // 1
console.log(countGraphemes("👨‍👩‍👧‍👦")); // 1
~~~

A grapheme count is not a measurement of rendered width. Fonts, shaping, and layout determine how text appears on screen.

## Normalize equivalent text

Unicode allows some text to be represented by different code point sequences. **String.prototype.normalize()** can convert text to a standard normalization form.

The common forms are:

- **NFC**: canonical decomposition followed by composition.
- **NFD**: canonical decomposition.
- **NFKC**: compatibility decomposition followed by composition.
- **NFKD**: compatibility decomposition.

The default form is **NFC**:

~~~js
const precomposed = "\u00E9";
const decomposed = "e\u0301";

console.log(precomposed === decomposed); // false
console.log(precomposed.normalize("NFC") === decomposed.normalize("NFC")); // true
console.log(precomposed.normalize("NFD") === decomposed.normalize("NFD")); // true
~~~

Normalization helps when equivalent text must use a consistent representation, such as before comparison or storage. Compatibility forms can change distinctions between characters, so choose a form based on the application's requirements. Normalization does not detect every visually confusable character and is not a complete security check.

## Ill-formed UTF-16 and unpaired surrogates

JavaScript strings can contain a leading or trailing surrogate that is not paired correctly. Such a sequence is called ill-formed UTF-16. It can be created directly from a code unit:

~~~js
const unpaired = String.fromCharCode(0xD800);

console.log(unpaired.length); // 1
console.log(unpaired.isWellFormed()); // false
~~~

**isWellFormed()** checks whether a string contains valid surrogate pairing. **toWellFormed()** returns a copy where unpaired surrogates are replaced with the replacement character **U+FFFD**:

~~~js
const unpaired = String.fromCharCode(0xD800);
const repaired = unpaired.toWellFormed();

console.log(repaired); // "�"
console.log(repaired.isWellFormed()); // true
~~~

These methods are useful when sending text to systems that require well-formed UTF-16. They do not normalize equivalent sequences or fix unrelated text problems.

## Choosing the right operation

| Goal | Useful approach |
| --- | --- |
| Count UTF-16 storage units | **text.length** |
| Read a code unit by index | **charCodeAt(index)** |
| Read a code point starting at an index | **codePointAt(index)** |
| Iterate code points | **for...of**, spread, or **Array.from()** |
| Count or slice user-perceived characters | **Intl.Segmenter** with grapheme granularity |
| Build from 16-bit units | **String.fromCharCode()** |
| Build from code points | **String.fromCodePoint()** |
| Canonicalize equivalent sequences | **normalize()** |
| Check or repair unpaired surrogates | **isWellFormed()** and **toWellFormed()** |

Do not use **length**, **slice()**, or array spread as a substitute for grapheme segmentation when the requirement is based on visible characters.

## Common mistakes

- Treating **length** as the number of visible characters.
- Assuming each string index contains a complete Unicode code point.
- Using **charCodeAt()** when a code point is needed.
- Calling **codePointAt()** with the second half of a surrogate pair and expecting it to look backward.
- Assuming **for...of** counts grapheme clusters.
- Splitting or truncating text at arbitrary code-unit indexes.
- Assuming two visually identical strings must compare equal before normalization.
- Assuming normalization removes visual confusables or makes arbitrary text safe.
- Using **String.fromCharCode()** for a supplementary code point instead of **String.fromCodePoint()**.
- Assuming a grapheme count predicts pixel width.

## Try it yourself

1. Compare **"A".length** and **"😀".length**.
2. Inspect **charCodeAt(0)**, **charCodeAt(1)**, and **codePointAt(0)** for an emoji.
3. Iterate over a string containing ASCII, an emoji, and a combining accent with **for...of**.
4. Compare the code-unit length and code-point count for **"e\u0301"**.
5. Use **Intl.Segmenter** to count the graphemes in a flag and a family emoji.
6. Compare the results of **String.fromCharCode(0x1F600)** and **String.fromCodePoint(0x1F600)**.
7. Normalize precomposed and decomposed accented text with **NFC**.
8. Create an unpaired surrogate and inspect **isWellFormed()** and **toWellFormed()**.
9. Write a function that truncates text after a chosen number of graphemes.
10. Explain why grapheme count and visual width are different measurements.

## Key points

- JavaScript strings are sequences of UTF-16 code units.
- A code point above **U+FFFF** uses a surrogate pair and therefore takes two code units.
- **for...of** iterates code points, not grapheme clusters.
- A grapheme cluster is closer to a user-perceived character.
- Use **Intl.Segmenter** with grapheme granularity for grapheme-aware operations.
- **normalize()** can create a consistent representation for canonically equivalent text.
- **isWellFormed()** and **toWellFormed()** detect and repair unpaired surrogates.
- Counting text and measuring its rendered width are separate tasks.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [23 - Strings and template literals](023-strings-and-template-literals.md) | [Open Q&A](../qnas/024-unicode-code-units-code-points-and-graphemes.md) | [Open example](../examples/024-unicode-code-units-code-points-and-graphemes.md) | [25 - String methods and text processing](025-string-methods-and-text-processing.md) |