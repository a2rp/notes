# 24 - Unicode: code units, code points, and graphemes

This Q&A reviews how JavaScript strings represent Unicode text. Each answer follows its question and includes an explanation where it helps.

## Multiple-choice questions

### 1. What does the **length** property count in a JavaScript string?

A. User-perceived characters  
B. Unicode code points  
C. UTF-16 code units  
D. Bytes in UTF-8

**Answer: C. UTF-16 code units.**

A supplementary character such as 😀 uses two UTF-16 code units, so **"😀".length** is **2**.

### 2. What does **"😀".codePointAt(0)** return?

A. **2**  
B. **55357**  
C. **56832**  
D. **128512**

**Answer: D. 128512.**

The first index of the surrogate pair identifies the complete Unicode code point. At index **1**, **codePointAt** returns the low surrogate's code-unit value instead.

### 3. Which expression iterates a string by Unicode code point?

A. **text.split("")**  
B. **for (const item of text)**  
C. **text.charAt(index)**  
D. **text.length**

**Answer: B. for...of.**

String iteration combines a valid surrogate pair into one iteration value. It does not combine multiple code points into a grapheme cluster.

### 4. Which API can segment text into grapheme clusters?

A. **String.split("")**  
B. **Intl.Segmenter** with **granularity: "grapheme"**  
C. **String.fromCodePoint**  
D. **Array.prototype.sort**

**Answer: B. Intl.Segmenter with granularity: "grapheme".**

A grapheme cluster approximates a user-perceived character, such as a letter plus combining mark or a joined emoji sequence.

### 5. What is the result of **"é" === "e\u0301"**?

A. **true**, because both look the same  
B. **false**, because their code-unit sequences differ  
C. **true**, because JavaScript normalizes strings automatically  
D. It throws a **TypeError**

**Answer: B. false.**

The first string can contain one precomposed code point. The second contains **e** followed by a combining acute accent. Normalize both before comparing them when canonical equivalence is intended.

### 6. Which method creates a string from a full Unicode code point such as **0x1F600**?

A. **String.fromCharCode**  
B. **String.fromCodePoint**  
C. **String.codePointAt**  
D. **String.normalize**

**Answer: B. String.fromCodePoint.**

**fromCharCode** accepts UTF-16 code units. For code points above **0xFFFF**, use **fromCodePoint**.

### 7. Which statement about **for...of** on a string is correct?

A. It iterates UTF-8 bytes  
B. It iterates UTF-16 code units  
C. It iterates Unicode code points  
D. It always iterates grapheme clusters

**Answer: C. It iterates Unicode code points.**

A multi-code-point emoji grapheme can still produce several iteration values.

### 8. What does NFC normalization generally do?

A. Converts text to UTF-8 bytes  
B. Uses canonical decomposition where possible  
C. Uses canonical composition where possible  
D. Removes all combining marks

**Answer: C. Uses canonical composition where possible.**

NFC can make canonically equivalent spellings use the same normalized sequence. It does not remove accents.

### 9. What does **String.prototype.isWellFormed()** check?

A. Whether a string contains only ASCII  
B. Whether a string contains no unpaired UTF-16 surrogates  
C. Whether a string has been normalized  
D. Whether every character is printable

**Answer: B. Whether a string contains no unpaired UTF-16 surrogates.**

A well-formed string can still contain many scripts, symbols, and combining characters.

### 10. What does **toWellFormed()** do with an unpaired surrogate?

A. Throws an error  
B. Deletes the entire string  
C. Replaces the unpaired surrogate with U+FFFD  
D. Converts the string to NFC

**Answer: C. Replaces it with U+FFFD.**

The replacement character is U+FFFD. Valid surrogate pairs are preserved.

## Predict the output

### 11. What is the output?

~~~js
console.log("A".length);
console.log("😀".length);
~~~

**Answer:**

~~~text
1
2
~~~

**length** counts UTF-16 code units. The emoji needs a surrogate pair.

### 12. What is the output?

~~~js
const face = "😀";

console.log(face.charCodeAt(0));
console.log(face.charCodeAt(1));
console.log(face.codePointAt(0));
~~~

**Answer:**

~~~text
55357
56832
128512
~~~

**charCodeAt** returns one UTF-16 code unit. **codePointAt(0)** combines the valid pair into the code point U+1F600.

### 13. What is the output?

~~~js
console.log([..."😀"].length);
console.log("😀".split("").length);
~~~

**Answer:**

~~~text
1
2
~~~

Spread syntax uses the string iterator, which combines the surrogate pair. **split("")** separates the UTF-16 code units.

### 14. What is the output?

~~~js
const text = "e\u0301";

console.log(text.length);
console.log([...text].length);
~~~

**Answer:**

~~~text
2
2
~~~

This spelling contains two code points: the letter **e** and a combining acute accent. Together they commonly display as one grapheme.

### 15. What is the output?

~~~js
console.log("é" === "e\u0301");
console.log("é".normalize("NFC") === "e\u0301".normalize("NFC"));
~~~

**Answer:**

~~~text
false
true
~~~

JavaScript compares the underlying string sequences. NFC maps these canonically equivalent spellings to the same normalized form.

### 16. What is the output?

~~~js
console.log(String.fromCodePoint(0x1F600));
console.log(String.fromCharCode(0x1F600).charCodeAt(0));
~~~

**Answer:**

~~~text
😀
62976
~~~

**fromCodePoint** produces the supplementary emoji. **fromCharCode** uses the low 16 bits of the number as one code unit, which is U+F600 in this case.

### 17. What does this print?

~~~js
let result = "";

for (const character of "A😀") {
    result += "[" + character + "]";
}

console.log(result);
~~~

**Answer:**

~~~text
[A][😀]
~~~

The string iterator returns **A** and the complete emoji as two iteration values.

### 18. What is the output?

~~~js
const flag = "🇮🇳";

console.log(flag.length);
console.log([...flag].length);
~~~

**Answer:**

~~~text
4
2
~~~

The flag consists of two regional-indicator code points, each represented by a surrogate pair. Many renderers display the pair together as one grapheme.

### 19. What is the output?

~~~js
const text = "A😀e\u0301";

console.log(text.length);
console.log([...text].length);
~~~

**Answer:**

~~~text
5
4
~~~

There are five UTF-16 code units and four code points. The **e** plus combining accent is two code points even though it usually appears as one grapheme.

### 20. What is the output?

~~~js
const malformed = String.fromCharCode(0xD800);

console.log(malformed.isWellFormed());
console.log(malformed.toWellFormed() === "\uFFFD");
~~~

**Answer:**

~~~text
false
true
~~~

U+D800 is a high surrogate with no matching low surrogate. **toWellFormed()** replaces it with U+FFFD.

## True or false

### 21. **"😀".length** is **1** because an emoji is one visible character.

**Answer: False.**

JavaScript string length counts UTF-16 code units. This emoji occupies two.

### 22. **for...of** always returns one value for every visible character.

**Answer: False.**

It iterates code points. A visible grapheme can contain multiple code points, such as a base letter and a combining mark.

### 23. A string can contain an unpaired surrogate.

**Answer: True.**

JavaScript strings can contain any UTF-16 code-unit sequence, including unpaired surrogates. Use **isWellFormed()** to detect them.

### 24. Normalization changes the original string.

**Answer: False.**

**normalize()** returns a normalized string and leaves the original string unchanged.

### 25. Two strings that look identical must compare equal with **===**.

**Answer: False.**

They may use different code-point sequences. Normalize them first when canonical equivalence should count as equality.

### 26. Grapheme count tells you how many pixels wide text will be.

**Answer: False.**

Grapheme segmentation groups text units. Display width depends on font, shaping, rendering, and other layout details.

### 27. **codePointAt(1)** on a supplementary character returns the complete code point.

**Answer: False.**

Index **1** points to the low-surrogate code unit. Read the pair at its first index to obtain the full code point.

### 28. **Intl.Segmenter** can count words as well as graphemes.

**Answer: True.**

Its **granularity** option supports **"grapheme"**, **"word"**, and **"sentence"**.

## Short-answer questions

### 29. Explain the difference between a code unit, code point, and grapheme cluster.

**Answer:**

- A **code unit** is one UTF-16 storage unit used by JavaScript strings.
- A **code point** is a Unicode value such as U+1F600.
- A **grapheme cluster** is a sequence of one or more code points that is treated as a single user-perceived character in text segmentation.

These are different units, so their counts can differ.

### 30. Why can **text.length** be unsuitable for counting displayed characters?

**Answer:**

It counts UTF-16 code units. A supplementary code point uses two units, and a grapheme may contain several code points. Use **Intl.Segmenter** with grapheme granularity when user-perceived character boundaries are needed.

### 31. Why does **String.fromCharCode(0x1F600)** not create 😀?

**Answer:**

**fromCharCode** creates UTF-16 code units, not arbitrary full code points. Use **String.fromCodePoint(0x1F600)** to construct that supplementary character.

### 32. What does **codePointAt()** return if its index points at a low surrogate?

**Answer:**

It returns the numeric value of that code unit. To read the supplementary code point, call it at the high surrogate's index.

### 33. How can you count grapheme clusters in a string?

**Answer:**

~~~js
const segmenter = new Intl.Segmenter(undefined, {
    granularity: "grapheme",
});

const count = Array.from(segmenter.segment(text)).length;
~~~

Each item from the segment iterator represents one grapheme cluster. Check that the target runtime supports **Intl.Segmenter**.

### 34. When should text be normalized before comparison?

**Answer:**

Normalize when the application intends canonically equivalent sequences to compare as equal, such as composed **é** and **e** followed by a combining acute accent. Choose the normalization form based on the application's requirements.

### 35. What is the practical difference between NFC and NFKC?

**Answer:**

NFC performs canonical normalization and preserves compatibility distinctions. NFKC also applies compatibility mappings, which can transform some formatting or presentation distinctions. Do not apply NFKC blindly when those distinctions matter.

### 36. What do **isWellFormed()** and **toWellFormed()** provide?

**Answer:**

**isWellFormed()** reports whether the string has no unpaired surrogates. **toWellFormed()** returns a copy in which unpaired surrogates are replaced by U+FFFD.

## Coding questions

### 37. Write a function that returns code points as strings.

**Answer:**

~~~js
function codePoints(text) {
    return [...text];
}
~~~

The string iterator combines valid surrogate pairs. This returns code-point strings, not grapheme clusters.

### 38. Write a function that returns grapheme clusters.

**Answer:**

~~~js
function graphemes(text, locale) {
    const segmenter = new Intl.Segmenter(locale, {
        granularity: "grapheme",
    });

    return Array.from(
        segmenter.segment(text),
        (part) => part.segment,
    );
}
~~~

This uses Unicode grapheme segmentation rather than splitting at code-unit or code-point boundaries.

### 39. Write a function that compares two strings after NFC normalization.

**Answer:**

~~~js
function canonicallyEqual(first, second) {
    return first.normalize("NFC") === second.normalize("NFC");
}
~~~

This compares the normalized forms and does not mutate either input.

### 40. Write a function that safely creates a character from a code point.

**Answer:**

~~~js
function characterFromCodePoint(value) {
    if (!Number.isInteger(value) || value < 0 || value > 0x10FFFF) {
        throw new RangeError("Expected a valid Unicode code point.");
    }

    return String.fromCodePoint(value);
}
~~~

**String.fromCodePoint** also validates its arguments and throws for out-of-range values. The explicit check makes the function's accepted input clear.

### 41. Write a helper that reports UTF-16 units, code points, and graphemes.

**Answer:**

~~~js
function textCounts(text, locale) {
    const segmenter = new Intl.Segmenter(locale, {
        granularity: "grapheme",
    });

    return {
        codeUnits: text.length,
        codePoints: [...text].length,
        graphemes: Array.from(segmenter.segment(text)).length,
    };
}
~~~

The three counts describe different units. Do not label any of them simply as a character count without explaining which unit is being counted.

### 42. How should an application handle a runtime without **Intl.Segmenter**?

**Answer:**

Choose a clear support strategy: require a runtime that implements it, load a maintained segmentation library, or provide a limited fallback with documented behavior. A simple **split("")** fallback is not Unicode-safe for grapheme counting.

### 43. Why should user-interface cursor movement avoid indexing strings by **length** alone?

**Answer:**

Indexing by UTF-16 code unit can split a surrogate pair or separate parts of a grapheme. Use Unicode-aware segmentation and the editor or platform APIs appropriate to the interface.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [23 - Strings and template literals](../lessons/023-strings-and-template-literals.md) | [Open lesson](../lessons/024-unicode-code-units-code-points-and-graphemes.md) | [Open example](../examples/024-unicode-code-units-code-points-and-graphemes.md) | [25 - String methods and text processing](../lessons/025-string-methods-and-text-processing.md) |
