# 24 - Unicode: code units, code points, and graphemes

This example compares JavaScript's UTF-16 code units, Unicode code points, and grapheme clusters. The code is displayed for study. Run each JavaScript block in a modern browser console or a compatible JavaScript runtime.

## 1. Inspect a supplementary character

### Question

How can you tell the difference between the UTF-16 units that store 😀 and its Unicode code point?

### Code

~~~js
const face = "😀";

console.log("UTF-16 length:", face.length);
console.log("first code unit:", face.charCodeAt(0));
console.log("second code unit:", face.charCodeAt(1));
console.log("code point:", face.codePointAt(0));
console.log("iteration count:", [...face].length);
console.log("built from code point:", String.fromCodePoint(0x1F600));
console.log(
    "fromCharCode result unit:",
    String.fromCharCode(0x1F600).charCodeAt(0),
);
~~~

### Expected output

~~~text
UTF-16 length: 2
first code unit: 55357
second code unit: 56832
code point: 128512
iteration count: 1
built from code point: 😀
fromCharCode result unit: 62976
~~~

### Explanation

JavaScript strings are indexed by UTF-16 code units. The emoji's code point, U+1F600, is represented by a high and low surrogate, so its string length is two. **codePointAt(0)** reads both units when called at the start of the pair. String iteration also combines a valid pair, which is why spreading the string produces one item.

**String.fromCodePoint()** accepts the full code point. **String.fromCharCode()** accepts code units, so passing it **0x1F600** does not create the same emoji.

## 2. Compare code points with grapheme clusters

### Question

How many code units, code points, and grapheme clusters are in a string containing a letter, an emoji, an accented letter written with a combining mark, and a flag?

### Code

~~~js
const text = "A😀e\u0301🇮🇳";
const segmenter = new Intl.Segmenter(undefined, {
    granularity: "grapheme",
});
const segments = Array.from(segmenter.segment(text));

console.log("UTF-16 code units:", text.length);
console.log("code points:", [...text].length);
console.log("grapheme clusters:", segments.length);
console.log(
    "graphemes:",
    segments.map((part) => part.segment).join(" | "),
);
console.log(
    "starting UTF-16 offsets:",
    segments.map((part) => part.index).join(", "),
);
~~~

### Expected output

~~~text
UTF-16 code units: 9
code points: 6
grapheme clusters: 4
graphemes: A | 😀 | é | 🇮🇳
starting UTF-16 offsets: 0, 1, 3, 5
~~~

### Explanation

The string contains:

- **9 UTF-16 code units:** the emoji and the two flag symbols each use surrogate pairs, and the accented spelling includes a combining mark.
- **6 code points:** **A**, the emoji, **e**, the combining acute accent, and two regional-indicator code points.
- **4 grapheme clusters:** the combining mark belongs with **e**, and the regional indicators are grouped as one flag.

**Intl.Segmenter** with grapheme granularity returns the grapheme text and its starting index. The indexes are UTF-16 code-unit offsets, not code-point indexes.

## 3. Compare composed and decomposed text

### Question

Why can two strings that look alike compare as different, and how can NFC normalization help?

### Code

~~~js
const composed = "\u00E9";
const decomposed = "e\u0301";
const segmenter = new Intl.Segmenter(undefined, {
    granularity: "grapheme",
});

console.log("composed code units:", composed.length);
console.log("decomposed code units:", decomposed.length);
console.log("same before normalization:", composed === decomposed);
console.log(
    "same after NFC:",
    composed.normalize("NFC") === decomposed.normalize("NFC"),
);
console.log(
    "composed graphemes:",
    Array.from(segmenter.segment(composed)).length,
);
console.log(
    "decomposed graphemes:",
    Array.from(segmenter.segment(decomposed)).length,
);
~~~

### Expected output

~~~text
composed code units: 1
decomposed code units: 2
same before normalization: false
same after NFC: true
composed graphemes: 1
decomposed graphemes: 1
~~~

### Explanation

The composed form contains one precomposed code point. The decomposed form contains the base letter and a combining accent. They are canonically equivalent, but JavaScript's strict equality compares the string sequences directly. Normalizing both to NFC makes these forms comparable as the same normalized sequence.

Normalization returns a new string. It does not mutate either original value.

## 4. See a compatibility normalization

### Question

How can compatibility normalization change the representation of a character?

### Code

~~~js
const fullWidthFive = "\uFF15";

console.log("original:", fullWidthFive);
console.log("NFC:", fullWidthFive.normalize("NFC"));
console.log("NFKC:", fullWidthFive.normalize("NFKC"));
~~~

### Expected output

~~~text
original: ５
NFC: ５
NFKC: 5
~~~

### Explanation

NFC preserves this fullwidth form because it does not treat it as canonically equivalent to the ASCII digit. NFKC applies compatibility mappings and converts it to the ASCII digit. Compatibility normalization is useful for some search and matching tasks, but it can remove distinctions that matter in other contexts.

## 5. Detect and repair an unpaired surrogate

### Question

What happens when a string contains a high surrogate without a matching low surrogate?

### Code

~~~js
const malformed = String.fromCharCode(0xD800);

console.log("well formed:", malformed.isWellFormed());

const repaired = malformed.toWellFormed();

console.log("repaired code point:", repaired.codePointAt(0));
console.log("replacement character:", repaired);
~~~

### Expected output

~~~text
well formed: false
repaired code point: 65533
replacement character: �
~~~

### Explanation

JavaScript strings can contain unpaired surrogates. **isWellFormed()** reports that this string is not well formed. **toWellFormed()** returns a copy with the unpaired surrogate replaced by U+FFFD, the replacement character. A valid surrogate pair is preserved.

These methods are available in current JavaScript runtimes. For older runtimes, check feature support or provide a compatible fallback.

## 6. A reusable grapheme-counting helper

### Question

How can a function count user-perceived text units without splitting combining sequences or joined emoji?

### Code

~~~js
function countGraphemes(text, locale) {
    const segmenter = new Intl.Segmenter(locale, {
        granularity: "grapheme",
    });

    return Array.from(segmenter.segment(text)).length;
}

console.log(countGraphemes("A😀e\u0301🇮🇳"));
console.log(countGraphemes("👨‍👩‍👧‍👦"));
~~~

### Expected output

~~~text
4
1
~~~

### Explanation

The family emoji is made from several code points joined into one grapheme cluster. **Intl.Segmenter** can recognize that cluster, whereas **text.length** and spread syntax count different units.

The exact rendered width of a grapheme is not determined by its count. Font, shaping, and layout affect how much space it occupies.

## Try it yourself

1. Change the sample string and predict its UTF-16 length, code-point count, and grapheme count before running the code.
2. Compare the flag **🇮🇳** using **length**, spread syntax, and **Intl.Segmenter**.
3. Replace the decomposed accent with another base letter and combining mark.
4. Check whether the target runtime provides **Intl.Segmenter**, **isWellFormed()**, and **toWellFormed()**.
5. Explain why **split("")** is not a reliable way to count code points or grapheme clusters.

## Key points

- JavaScript string indexes and **length** use UTF-16 code units.
- **codePointAt()** and **String.fromCodePoint()** work with Unicode code points.
- String iteration combines valid surrogate pairs but does not segment graphemes.
- **Intl.Segmenter** can find grapheme, word, and sentence boundaries.
- Normalization can make canonically equivalent sequences comparable.
- **isWellFormed()** detects unpaired surrogates, and **toWellFormed()** replaces them.
- Code-unit, code-point, grapheme, and display-width counts answer different questions.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [23 - Strings and template literals](../lessons/023-strings-and-template-literals.md) | [Open lesson](../lessons/024-unicode-code-units-code-points-and-graphemes.md) | [Open Q&A](../qnas/024-unicode-code-units-code-points-and-graphemes.md) | [25 - String methods and text processing](../lessons/025-string-methods-and-text-processing.md) |
