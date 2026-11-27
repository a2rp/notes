# 73 - RegExp groups, flags, and string methods: Q&A

Use these questions to review captures, backreferences, lookarounds, flags, **lastIndex**, and JavaScript's string and regular expression methods. Every answer appears immediately after its question with an explanation.

## Multiple-choice questions

### 1. What is the first numbered capture in a match result?

- A. The complete match
- B. The first parenthesized capturing group
- C. The match index
- D. The first named group only

**Answer: B.** Index zero contains the complete match. Numbered captures begin at index one and follow the order of their opening parentheses.

### 2. What does a non-capturing group do?

- A. Groups syntax without adding a capture to the result
- B. Prevents its pattern from matching
- C. Captures text under an automatic name
- D. Turns on global matching

**Answer: A.** The **(?:...)** form groups a subpattern for quantifiers or alternatives without adding a numbered capture.

### 3. Where can a named capture's value be found?

- A. In match.name
- B. In match.groups under its name
- C. In RegExp.lastIndex
- D. Only in the replacement string

**Answer: B.** A named capturing group such as **(?<year>...)** is available in the result's **groups** object.

### 4. What value does a capture have if its optional group did not match?

- A. An empty array
- B. Zero
- C. undefined
- D. The whole match

**Answer: C.** A capturing group that did not participate in the successful match has the value **undefined**.

### 5. What does a backreference require?

- A. Another arbitrary character
- B. Text equal to what an earlier capture matched
- C. A match at the beginning of the input
- D. A second regular expression

**Answer: B.** A numbered or named backreference matches the same text captured earlier in the current match.

### 6. Does a positive lookahead include the text it checks in the returned match?

- A. Yes, always
- B. No, it checks following context without consuming it
- C. Only with the global flag
- D. Only when it contains a capture

**Answer: B.** A lookahead asserts that following text does or does not match. Its checked text is not consumed by the assertion.

### 7. What does a positive lookbehind check?

- A. Text that follows the match
- B. Text before the current position
- C. The previous match result object
- D. The regex's lastIndex

**Answer: B.** Lookbehind checks preceding context without including that context in the match.

### 8. Which flags make RegExp.exec() and RegExp.test() stateful through lastIndex?

- A. i and m
- B. g and y
- C. d and s
- D. u and v

**Answer: B.** Global and sticky regexes use **lastIndex** to determine the next matching position. A failed attempt resets it to zero.

### 9. What is the difference between g and y?

- A. g ignores case, y enables Unicode
- B. g searches forward from lastIndex, while y requires a match exactly there
- C. g matches one time, y matches all times
- D. There is no difference

**Answer: B.** A global regex can search later positions. A sticky regex only attempts to match at its current **lastIndex**.

### 10. What does the i flag do?

- A. Makes matching case-insensitive
- B. Includes match indices
- C. Makes the dot match line breaks
- D. Requires a match at lastIndex

**Answer: A.** The **i** flag removes case distinctions during matching.

### 11. What does the m flag change?

- A. It makes the dot match line terminators
- B. It makes start and end assertions work at line boundaries
- C. It makes matching global
- D. It adds named groups

**Answer: B.** Multiline mode changes **^** and **$** so they can assert the beginning and end of lines within a string.

### 12. What does the s flag do?

- A. Makes the dot match line terminators
- B. Makes the regex sticky
- C. Makes the regex case-sensitive
- D. Returns all captures

**Answer: A.** The dotAll flag allows **.** to match line terminators.

### 13. What does the d flag add to a match result?

- A. An indices property with start and end positions
- B. A duplicate match
- C. A date conversion
- D. A string iterator

**Answer: A.** With **d**, match results have **indices** ranges for the complete match and captures.

### 14. Which statement about u and v is correct?

- A. They must be used together
- B. They cannot both be used in the same regex
- C. They both mean global
- D. They are replacement flags

**Answer: B.** Both are Unicode-aware modes, but they cannot be combined on one regular expression.

### 15. What does String.prototype.match() return with a global regex?

- A. Every complete match as an array of strings, without capture groups
- B. Only the first match array with all captures
- C. An iterator
- D. The first match index

**Answer: A.** A global **match()** returns an array of matched substrings. Use **matchAll()** when every capture result is needed.

### 16. What does String.prototype.matchAll() return?

- A. A Boolean
- B. An iterator of match arrays
- C. A replacement string
- D. An integer index

**Answer: B.** The iterator yields a match array for each match, including any captures and metadata.

### 17. What does String.prototype.search() return when the pattern is not found?

- A. null
- B. false
- C. -1
- D. An empty array

**Answer: C.** **search()** returns the position of the first match or **-1** when no match is found.

### 18. What must a RegExp passed to String.prototype.matchAll() have?

- A. The g flag
- B. The y flag
- C. A named group
- D. The d flag

**Answer: A.** **matchAll()** requires a global regex. It throws a **TypeError** if a RegExp argument does not have **g**.

### 19. What does String.prototype.replace() do with a non-global regex?

- A. Replaces every match
- B. Replaces only the first match
- C. Returns all match arrays
- D. Throws a TypeError

**Answer: B.** A non-global regex replacement stops after the first match. A global regex replaces every match.

### 20. What does a capturing separator do in String.prototype.split()?

- A. It prevents splitting
- B. It includes the captured separator text in the output array
- C. It turns the array into a string
- D. It resets lastIndex

**Answer: B.** Captured parts of a separator regex are inserted into the array returned by **split()**.

## Code-reading questions

### 21. What does this print?

~~~js
const match = /(\d{4})-(\d{2})/.exec("2026-11");

console.log(match[0]);
console.log(match[1]);
console.log(match[2]);
~~~

**Answer:**

~~~text
2026-11
2026
11
~~~

**Explanation:** The complete match is at index zero. The year and month captures follow in opening-parenthesis order.

### 22. What does this print?

~~~js
const match = /(?<key>\w+)=(?<value>\d+)/.exec("count=12");

console.log(match.groups.key);
console.log(match.groups.value);
~~~

**Answer:**

~~~text
count
12
~~~

**Explanation:** Named captures are properties on the result's **groups** object.

### 23. What does this print?

~~~js
const match = /^(a)?b$/.exec("b");

console.log(match[1]);
~~~

**Answer:** **undefined**

**Explanation:** The optional **a** group is part of the pattern but does not participate in this match.

### 24. What does this print?

~~~js
console.log(/\b(\w+)\s+\1\b/i.test("Echo echo"));
console.log(/\b(\w+)\s+\1\b/i.test("Echo echoing"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** The backreference requires the second word to equal the first captured word. The boundary assertions prevent matching just the prefix **echo** in **echoing**.

### 25. What part of the input is returned?

~~~js
console.log("Price: $25".match(/\d+(?= dollars)/));
console.log("Price: $25 dollars".match(/\d+(?= dollars)/)[0]);
~~~

**Answer:**

~~~text
null
25
~~~

**Explanation:** The positive lookahead requires ** dollars** immediately after the digits, but it does not include that text in the match.

### 26. What does the lookbehind pattern return?

~~~js
console.log("$25".match(/(?<=\$)\d+/)[0]);
~~~

**Answer:** **25**

**Explanation:** The lookbehind requires a dollar sign before the digits. The dollar sign is not consumed or included in the result.

### 27. What does this print?

~~~js
const pattern = /cat/g;
const text = "cat cat";

console.log(pattern.test(text), pattern.lastIndex);
console.log(pattern.test(text), pattern.lastIndex);
console.log(pattern.test(text), pattern.lastIndex);
~~~

**Answer:**

~~~text
true 3
true 7
false 0
~~~

**Explanation:** Each successful global test starts at the current **lastIndex** and advances it to the end of the match. After a failed attempt, **lastIndex** resets to zero.

### 28. What does this print?

~~~js
const pattern = /\d+/y;
pattern.lastIndex = 1;

console.log(pattern.exec("a 42"));
console.log(pattern.lastIndex);
~~~

**Answer:**

~~~text
null
0
~~~

**Explanation:** The sticky regex tries only at index one, which is a space. It does not scan forward to the digits, and failure resets **lastIndex**.

### 29. What does this print?

~~~js
const first = "red blue red".match(/(r)(ed)/);
const all = "red blue red".match(/(r)(ed)/g);

console.log(first[0], first[1], first[2]);
console.log(all.join("|"));
~~~

**Answer:**

~~~text
red r ed
red|red
~~~

**Explanation:** A non-global match result includes captures. A global **match()** returns only matched strings, not the capture groups.

### 30. What does this print?

~~~js
const pattern = /(?<key>\w+)=(?<value>\d+)/g;

for (const match of "x=1 y=20".matchAll(pattern)) {
  console.log(match.groups.key, match.groups.value, match.index);
}
~~~

**Answer:**

~~~text
x 1 0
y 20 4
~~~

**Explanation:** **matchAll()** yields each match result with its named groups and starting index.

### 31. What does this print?

~~~js
const pattern = /cat/g;
pattern.lastIndex = 5;

console.log("a cat".search(pattern));
console.log(pattern.lastIndex);
~~~

**Answer:**

~~~text
2
5
~~~

**Explanation:** **search()** finds the match at index two. It ignores the regex's previous **lastIndex** for the search and restores that prior value afterward.

### 32. What does this replacement produce?

~~~js
console.log(
  "2026-11-20".replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    "$3/$2/$1"
  )
);
~~~

**Answer:**

~~~text
20/11/2026
~~~

**Explanation:** **$1**, **$2**, and **$3** refer to the year, month, and day captures.

### 33. What does this print?

~~~js
console.log("red red".replace(/red/, "blue"));
console.log("red red".replace(/red/g, "blue"));
~~~

**Answer:**

~~~text
blue red
blue blue
~~~

**Explanation:** A non-global regex replaces the first occurrence. The **g** flag makes the regex replace every occurrence.

### 34. What does this print?

~~~js
console.log("red,green".split(/(,)/).join("|"));
~~~

**Answer:**

~~~text
red|,|green
~~~

**Explanation:** The comma is captured by the separator regex, so it is retained as an element in the split result.

### 35. What does this print?

~~~js
const match = /(?<name>\w+)-(?<id>\d+)/d.exec("item-42");

console.log(match.indices[0].join(","));
console.log(match.indices.groups.name.join(","));
console.log(match.indices.groups.id.join(","));
~~~

**Answer:**

~~~text
0,7
0,4
5,7
~~~

**Explanation:** Each range has a start offset and an exclusive end offset. The **d** flag adds ranges for the full match and captures.

### 36. Does matchAll() change the original regex's lastIndex?

~~~js
const pattern = /\w+/g;
pattern.lastIndex = 4;

const matches = [..."one two".matchAll(pattern)];

console.log(matches.map((match) => match[0]).join("|"));
console.log(pattern.lastIndex);
~~~

**Answer:**

~~~text
two
4
~~~

**Explanation:** **matchAll()** works with a clone and begins from the original regex's current **lastIndex**. It does not advance the original regex.

## Short-answer questions

### 37. When should a group be non-capturing?

**Answer:** Use a non-capturing group when parentheses are needed for grouping or quantification, but the captured text is not needed.

**Explanation:** **(?:...)** avoids adding a capture index and keeps later capture numbering stable.

### 38. What is the difference between a numbered and named capture?

**Answer:** A numbered capture is referenced by its position in the match result. A named capture also has a readable name available in the **groups** object.

**Explanation:** Named groups can make code easier to maintain when a pattern contains several captures. Both forms can be used in replacements.

### 39. How does a backreference differ from a repeated character class?

**Answer:** A backreference matches the exact text captured earlier. A repeated character class can match different characters on each repetition.

**Explanation:** If a pattern captures **Ab** and later uses a backreference, it requires the same captured text, subject to the regex flags.

### 40. What is the difference between a lookahead and a lookbehind?

**Answer:** A lookahead checks text after the current position. A lookbehind checks text before it.

**Explanation:** Neither assertion consumes its checked text, so that text is not automatically part of the returned match.

### 41. What is the difference between global and sticky matching?

**Answer:** Global matching can continue searching from **lastIndex** until a later match is found. Sticky matching only accepts a match exactly at **lastIndex**.

**Explanation:** Sticky matching is useful when parsing a string token by token without skipping unexpected characters.

### 42. Why can a global regex make repeated test() calls surprising?

**Answer:** A regex with **g** updates **lastIndex** after a successful match and resets it after failure.

**Explanation:** Each call may begin at a different position. Use a non-global regex for independent Boolean checks or reset **lastIndex** deliberately.

### 43. When should matchAll() be used instead of match() with g?

**Answer:** Use **matchAll()** when every match's capture groups, index, or named groups are needed.

**Explanation:** Global **match()** returns only matched substrings, while **matchAll()** yields complete match arrays.

### 44. Does matchAll() mutate the original regex?

**Answer:** No. It creates a matcher clone and starts it at the original regex's current **lastIndex**.

**Explanation:** The iterator advances its clone. The original regex's state remains unchanged.

### 45. What is the purpose of the d flag?

**Answer:** It adds start and end index ranges for the complete match and each capture.

**Explanation:** These ranges are useful when code needs to highlight or edit the exact source spans. The end offset is exclusive.

### 46. How does replace() decide how many occurrences to replace?

**Answer:** A string search value or non-global regex replaces only the first occurrence. A global regex replaces all matches.

**Explanation:** **replaceAll()** makes the intent to replace all literal occurrences explicit. A regex passed to **replaceAll()** must be global.

### 47. What does a replacement callback receive?

**Answer:** It receives the complete match, numbered captures, match offset, original input, and, when named captures exist, a groups object.

**Explanation:** Capture parameters come before the offset and input. The groups object is the last argument when it exists.

### 48. Are replacement tokens interpreted inside a callback's returned string?

**Answer:** No. The callback's return value is inserted directly as replacement text.

**Explanation:** Tokens such as **$&** and numbered capture substitutions are interpreted in a replacement string, not recursively in a callback's result.

### 49. What happens when a separator regex has capturing groups in split()?

**Answer:** The captured separator text is included in the returned array.

**Explanation:** Use non-capturing groups if grouping is needed but the separator should not appear in the pieces.

### 50. What does the i, m, or s flag change?

**Answer:** **i** ignores case distinctions, **m** changes the behavior of line anchors, and **s** lets dot match line terminators.

**Explanation:** Flags change pattern behavior at construction time. They cannot be enabled after a regex is created.

## Coding and design questions

### 51. Extract named fields from a date string.

**Answer:**

~~~js
const match =
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec("2026-11-20");

console.log(match.groups.year);
console.log(match.groups.month);
console.log(match.groups.day);
~~~

Output:

~~~text
2026
11
20
~~~

**Explanation:** Named groups make the extracted fields clear without relying on numeric positions.

### 52. Reformat a date with a replacement string.

**Answer:**

~~~js
const result = "2026-11-20".replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  "$<day>/$<month>/$<year>"
);

console.log(result);
~~~

Output:

~~~text
20/11/2026
~~~

**Explanation:** A named replacement token inserts the value of its matching named capture.

### 53. Convert every matched number with a callback.

**Answer:**

~~~js
const result = "item 2, item 12".replace(
  /\d+/g,
  (digits) => String(Number(digits) * 2)
);

console.log(result);
~~~

Output:

~~~text
item 4, item 24
~~~

**Explanation:** The global flag finds each number. The callback converts the matched digits, doubles the number, and returns replacement text.

### 54. Find every key-value pair and retain its captures.

**Answer:**

~~~js
const pattern = /(?<key>\w+)=(?<value>\d+)/g;

for (const match of "x=1 y=20".matchAll(pattern)) {
  console.log(match.groups.key + ":" + match.groups.value);
}
~~~

Output:

~~~text
x:1
y:20
~~~

**Explanation:** **matchAll()** is suited to repeated matches whose named captures are needed.

### 55. Split while discarding delimiters.

**Answer:**

~~~js
const pieces = "red,green;blue".split(/[,;]/);

console.log(pieces.join("|"));
~~~

Output:

~~~text
red|green|blue
~~~

**Explanation:** The separators are not captured, so they are omitted from the result array.

### 56. Use sticky matching to parse a sequence without skipping unexpected text.

**Answer:**

~~~js
const token = /\d+/y;
const text = "42x7";

token.lastIndex = 0;
const first = token.exec(text);

token.lastIndex = first.index + first[0].length;
const second = token.exec(text);

console.log(first[0]);
console.log(second);
~~~

Output:

~~~text
42
null
~~~

**Explanation:** After consuming **42**, the next sticky attempt begins at **x**. It fails there instead of searching ahead for the later **7**. This makes sticky matching useful for detecting where a parser encounters invalid input.

## Review checklist

- Are capturing groups used only when their values are needed?
- Would named groups make extracted fields clearer?
- Does each backreference refer to the intended capture?
- Is a lookaround checking the correct side of the match?
- Does the selected flag change **lastIndex**?
- Does the chosen string method return the captures and metadata the code needs?
- Does a replacement string use the correct capture token?
- Is a callback preferable to replacement-token syntax?
- Should split delimiters be captured or omitted?

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [72 - Regular expression syntax](../lessons/072-regular-expression-syntax.md) | [Open lesson](../lessons/073-regexp-groups-flags-and-string-methods.md) | [Open example](../examples/073-regexp-groups-flags-and-string-methods.md) | [74 - JSON parsing, serialization, and data limits](../lessons/074-json-parsing-serialization-and-data-limits.md) |
