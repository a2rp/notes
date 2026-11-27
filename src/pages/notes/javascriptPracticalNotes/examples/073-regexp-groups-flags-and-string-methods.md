# 73 - RegExp groups, flags, and string methods: Examples

These examples demonstrate captures, backreferences, lookarounds, flags, stateful matching, and JavaScript string methods. Each example includes a task, complete code, expected output, and an explanation. The **d**, **u**, and **v** flags require a runtime that supports those features.

## 1. Read numbered captures

**Task:** Extract year, month, and day from a date.

~~~js
const match = /(\d{4})-(\d{2})-(\d{2})/.exec("2026-11-20");

console.log(match[0]);
console.log(match[1]);
console.log(match[2]);
console.log(match[3]);
~~~

Expected output:

~~~text
2026-11-20
2026
11
20
~~~

**Explanation:** Index zero is the complete match. Captures follow in the order their opening parentheses appear.

## 2. Group without capturing

**Task:** Repeat a sequence without adding it to the capture result.

~~~js
const match = /(?:ha)+/.exec("hahaha");

console.log(match[0]);
console.log(match.length);
~~~

Expected output:

~~~text
hahaha
1
~~~

**Explanation:** The non-capturing group lets the quantifier repeat the whole **ha** sequence. It does not add a numbered capture.

## 3. Read named captures

**Task:** Extract date parts by their group names.

~~~js
const match =
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec("2026-11-20");

console.log(match.groups.year);
console.log(match.groups.month);
console.log(match.groups.day);
~~~

Expected output:

~~~text
2026
11
20
~~~

**Explanation:** Named capture values are properties of the result's **groups** object.

## 4. Observe an unmatched optional capture

**Task:** Check the capture when the optional part did not match.

~~~js
const match = /^(a)?b$/.exec("b");

console.log(match[0]);
console.log(match[1]);
~~~

Expected output:

~~~text
b
undefined
~~~

**Explanation:** The complete match exists, but the optional capture did not participate, so its value is **undefined**.

## 5. Match repeated text with a numbered backreference

**Task:** Detect two adjacent copies of the same word.

~~~js
const repeated = /\b(\w+)\s+\1\b/i;

console.log(repeated.test("Echo echo"));
console.log(repeated.test("Echo stop"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** The first group captures a word. The **\1** requires the same text to appear again. The **i** flag makes the comparison case-insensitive.

## 6. Use a named backreference

**Task:** Match a word repeated with a space between the copies.

~~~js
const repeated = /\b(?<word>\w+)\s+\k<word>\b/i;

console.log(repeated.test("Go go"));
console.log(repeated.test("Go now"));
~~~

Expected output:

~~~text
true
false
~~~

**Explanation:** **\k<word>** refers to the text captured by the group named **word**.

## 7. Require following context with lookahead

**Task:** Match a number only when the word **dollars** follows it.

~~~js
const amount = /\d+(?= dollars)/;

console.log("20 dollars".match(amount)[0]);
console.log("20 euros".match(amount));
~~~

Expected output:

~~~text
20
null
~~~

**Explanation:** The positive lookahead checks the following text without including it in the returned match.

## 8. Exclude following context with negative lookahead

**Task:** Match **foo** only when it is not followed by **bar**.

~~~js
const pattern = /foo(?!bar)/;

console.log(pattern.test("foobar"));
console.log(pattern.test("foobaz"));
~~~

Expected output:

~~~text
false
true
~~~

**Explanation:** The negative lookahead succeeds only when **bar** does not begin at the current position after **foo**.

## 9. Require preceding context with lookbehind

**Task:** Match digits only when they follow a dollar sign.

~~~js
const price = /(?<=\$)\d+/;

console.log("$25".match(price)[0]);
console.log("25".match(price));
~~~

Expected output:

~~~text
25
null
~~~

**Explanation:** The positive lookbehind checks the preceding dollar sign but excludes it from the match.

## 10. Exclude preceding context with negative lookbehind

**Task:** Find a standalone number that is not immediately preceded by a dollar sign.

~~~js
const number = /(?<!\$)\b\d+\b/;
const match = "$25 and 30".match(number);

console.log(match[0]);
~~~

Expected output:

~~~text
30
~~~

**Explanation:** The negative lookbehind rejects the number immediately following **$**. Word boundaries prevent matching only part of a larger number.

## 11. Inspect capture positions with the d flag

**Task:** Read the start and exclusive end offsets of a match and its named captures.

~~~js
const match = /(?<name>\w+)-(?<id>\d+)/d.exec("item-42");

console.log(match.indices[0].join(","));
console.log(match.indices.groups.name.join(","));
console.log(match.indices.groups.id.join(","));
~~~

Expected output:

~~~text
0,7
0,4
5,7
~~~

**Explanation:** The **d** flag adds **indices** ranges. Each pair has a start offset and an exclusive end offset.

## 12. Inspect flags and their properties

**Task:** Read a regex's canonical flags and two Boolean properties.

~~~js
const pattern = /hello/gim;

console.log(pattern.flags);
console.log(pattern.global);
console.log(pattern.ignoreCase);
console.log(pattern.multiline);
~~~

Expected output:

~~~text
gim
true
true
true
~~~

**Explanation:** The **flags** property returns the flags in canonical order. Individual properties expose whether a flag is active.

## 13. Ignore letter case

**Task:** Compare case-sensitive and case-insensitive matching.

~~~js
console.log(/javascript/.test("JavaScript"));
console.log(/javascript/i.test("JavaScript"));
~~~

Expected output:

~~~text
false
true
~~~

**Explanation:** The **i** flag allows matching without requiring the same letter case.

## 14. Use anchors at each line

**Task:** Find a line containing only **second**.

~~~js
const text = "first\nsecond";
const line = /^second$/m;

console.log(line.test(text));
~~~

Expected output:

~~~text
true
~~~

**Explanation:** The **m** flag makes start and end assertions work at line boundaries, not only the full input boundaries.

## 15. Let the dot match a line terminator

**Task:** Compare dot behavior with and without dotAll mode.

~~~js
console.log(/a.b/.test("a\nb"));
console.log(/a.b/s.test("a\nb"));
~~~

Expected output:

~~~text
false
true
~~~

**Explanation:** The **s** flag lets the dot match line terminators.

## 16. Use a global regex with test()

**Task:** Observe **lastIndex** across repeated calls.

~~~js
const pattern = /cat/g;
const text = "cat cat";

console.log(pattern.test(text), pattern.lastIndex);
console.log(pattern.test(text), pattern.lastIndex);
console.log(pattern.test(text), pattern.lastIndex);
~~~

Expected output:

~~~text
true 3
true 7
false 0
~~~

**Explanation:** A global regex begins each attempt at **lastIndex**. A successful match advances it; a failed attempt resets it.

## 17. Compare global and sticky matching

**Task:** Start both patterns at the space before the digits.

~~~js
const globalPattern = /\d+/g;
const stickyPattern = /\d+/y;

globalPattern.lastIndex = 1;
stickyPattern.lastIndex = 1;

console.log(globalPattern.exec("a 42")[0]);
console.log(stickyPattern.exec("a 42"));
~~~

Expected output:

~~~text
42
null
~~~

**Explanation:** The global pattern scans forward and finds the digits. The sticky pattern must match exactly at index one, where there is a space.

## 18. Read a match result with exec()

**Task:** Retrieve the complete match, captures, and starting index.

~~~js
const pattern = /(?<key>\w+)=(\d+)/;
const match = pattern.exec("count=12");

console.log(match[0]);
console.log(match.groups.key);
console.log(match[2]);
console.log(match.index);
~~~

Expected output:

~~~text
count=12
count
12
0
~~~

**Explanation:** **exec()** returns the complete match and its captures with metadata. The named value appears in **groups**.

## 19. Compare match() with and without g

**Task:** Compare the result shape of a first match and global matches.

~~~js
const first = "red blue red".match(/(r)(ed)/);
const all = "red blue red".match(/(r)(ed)/g);

console.log(first[0], first[1], first[2], first.index);
console.log(all.join("|"));
~~~

Expected output:

~~~text
red r ed 0
red|red
~~~

**Explanation:** Without **g**, **match()** returns a match array with captures. With **g**, it returns only all matched substrings.

## 20. Iterate over all matches with matchAll()

**Task:** Read the named captures and match position for every key-value pair.

~~~js
const pattern = /(?<key>\w+)=(?<value>\d+)/g;

for (const match of "x=1 y=20".matchAll(pattern)) {
  console.log(match.groups.key, match.groups.value, match.index);
}
~~~

Expected output:

~~~text
x 1 0
y 20 4
~~~

**Explanation:** **matchAll()** yields full match arrays, including captures, names, and indices. Its regex argument must have **g**.

## 21. Confirm matchAll() leaves the original lastIndex unchanged

**Task:** Start iteration partway through a string and inspect the regex afterward.

~~~js
const pattern = /\w+/g;
pattern.lastIndex = 4;

const matches = [..."one two".matchAll(pattern)];

console.log(matches.map((match) => match[0]).join("|"));
console.log(pattern.lastIndex);
~~~

Expected output:

~~~text
two
4
~~~

**Explanation:** **matchAll()** uses a clone starting at the original regex's current **lastIndex**. Advancing the iterator does not mutate the original regex.

## 22. Find a match position with search()

**Task:** Find digits and confirm that the regex's previous **lastIndex** is restored.

~~~js
const pattern = /\d+/g;
pattern.lastIndex = 5;

console.log("a cat 42".search(pattern));
console.log(pattern.lastIndex);
~~~

Expected output:

~~~text
6
5
~~~

**Explanation:** **search()** returns the first match position and ignores the regex's existing **lastIndex** for its search. It restores the prior value afterward.

## 23. Reorder captures in a replacement string

**Task:** Convert a year-month-day date to day/month/year.

~~~js
const date = /(\d{4})-(\d{2})-(\d{2})/;
const result = "2026-11-20".replace(date, "$3/$2/$1");

console.log(result);
~~~

Expected output:

~~~text
20/11/2026
~~~

**Explanation:** Numbered replacement tokens insert the corresponding captures.

## 24. Use a named capture in a replacement

**Task:** Reformat a date using named captures.

~~~js
const date =
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const result = "2026-11-20".replace(
  date,
  "$<day>/$<month>/$<year>"
);

console.log(result);
~~~

Expected output:

~~~text
20/11/2026
~~~

**Explanation:** A named replacement token inserts the value from the corresponding named group.

## 25. Replace every number with a callback

**Task:** Double every number in a sentence.

~~~js
const result = "item 2, item 12".replace(
  /\d+/g,
  (digits) => String(Number(digits) * 2)
);

console.log(result);
~~~

Expected output:

~~~text
item 4, item 24
~~~

**Explanation:** The global regex finds both digit sequences. The callback converts each match and returns the replacement text.

## 26. Reorder words with named captures in a callback

**Task:** Convert a first-name last-name string to last-name, first-name format.

~~~js
const result = "Ada Lovelace".replace(
  /(?<first>\w+) (?<last>\w+)/,
  (match, first, last, offset, input, groups) =>
    groups.last + ", " + groups.first
);

console.log(result);
~~~

Expected output:

~~~text
Lovelace, Ada
~~~

**Explanation:** The callback receives the complete match, capture values, offset, input, then the named groups object. Returning a string inserts it directly.

## 27. Replace all literal occurrences

**Task:** Replace every literal occurrence of a word and every regex match of a delimiter.

~~~js
console.log("red red".replaceAll("red", "blue"));
console.log("one, two, three".replaceAll(/, /g, " | "));
~~~

Expected output:

~~~text
blue blue
one | two | three
~~~

**Explanation:** **replaceAll()** replaces all literal string occurrences. A regex passed to **replaceAll()** must include **g**.

## 28. Compare captured and uncaptured separators

**Task:** See whether the delimiter appears in the split result.

~~~js
console.log("red,green;blue".split(/[,;]/).join("|"));
console.log("red,green".split(/(,)/).join("|"));
~~~

Expected output:

~~~text
red|green|blue
red|,|green
~~~

**Explanation:** The first regex discards separators. The second captures the comma, so **split()** includes it in the output array.

## 29. Catch a non-global regex passed to replaceAll()

**Task:** Handle the error produced by a non-global regex.

~~~js
try {
  "red red".replaceAll(/red/, "blue");
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
true
~~~

**Explanation:** A regular expression passed to **replaceAll()** must have the global flag.

## 30. Iterate over zero-width matches safely

**Task:** Find positions immediately before each **a**.

~~~js
const positions = Array.from(
  "aba".matchAll(/(?=a)/g),
  (match) => match.index
);

console.log(positions.join(","));
~~~

Expected output:

~~~text
0,2
~~~

**Explanation:** The matches are empty because the lookahead does not consume the **a**. The built-in **matchAll()** iterator advances correctly after an empty match. A manual **exec()** loop with a zero-width global pattern needs its own progress handling.

## 31. Compare a numbered capture with a named capture

**Task:** Retrieve the same field using both result forms.

~~~js
const match = /(?<word>\w+)/.exec("JavaScript");

console.log(match[1]);
console.log(match.groups.word);
~~~

Expected output:

~~~text
JavaScript
JavaScript
~~~

**Explanation:** A named capture remains available by its numeric position and by its name.

## Review checklist

- Does each capture need to be returned, or should it be non-capturing?
- Would a named capture clarify the result?
- Does **lastIndex** affect this use of **exec()** or **test()**?
- Should matching search ahead or require the exact current position?
- Does the chosen string method preserve the capture data needed?
- Should replacement use capture tokens or a callback?
- Should delimiters be present in a split result?
- Can an empty match cause a manual loop to stop making progress?

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [72 - Regular expression syntax](../lessons/072-regular-expression-syntax.md) | [Open lesson](../lessons/073-regexp-groups-flags-and-string-methods.md) | [Open Q&A](../qnas/073-regexp-groups-flags-and-string-methods.md) | [74 - JSON parsing, serialization, and data limits](../lessons/074-json-parsing-serialization-and-data-limits.md) |
