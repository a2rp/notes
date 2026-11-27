# 73 - RegExp groups, flags, and string methods

Regular expression syntax describes what text can match. Groups let a pattern capture parts of a match, name those parts, or apply an operation to a larger expression. Flags change how matching works. JavaScript string methods use regular expressions to search, iterate over matches, replace text, and split strings.

This chapter connects these features so you can choose the right capture style, understand stateful flags, and retrieve or transform matches predictably.

## Learning goals

By the end of this chapter, you should be able to:

- Use capturing, non-capturing, and named groups.
- Read numbered and named captures and use backreferences.
- Use lookahead and lookbehind assertions.
- Choose the appropriate regular expression flag.
- Explain how **lastIndex** behaves with global and sticky regexes.
- Choose among **exec()**, **test()**, **match()**, **matchAll()**, **search()**, **replace()**, **replaceAll()**, and **split()**.
- Use replacement tokens and replacement callbacks.
- Avoid common state and iteration mistakes.

## Capturing groups

Parentheses create a capturing group. The group remembers the part of the input that matched its subpattern.

~~~js
const match = /(\d{4})-(\d{2})-(\d{2})/.exec("2026-11-20");

console.log(match[0]);
console.log(match[1]);
console.log(match[2]);
console.log(match[3]);
~~~

Output:

~~~text
2026-11-20
2026
11
20
~~~

For an **exec()** result, element **0** is the complete match. Captures follow in the order their opening parentheses appear. A capture that did not participate in the match has the value **undefined**.

Capturing groups are useful when code needs to extract pieces, reuse a match in a replacement, or refer back to captured text. Each capture has a small cost and shifts the numbers of later captures, so do not capture a group if its value is not needed.

## Non-capturing groups

Use **(?:...)** to group a pattern without creating a capture.

~~~js
const match = /(?:ha)+/.exec("hahaha");

console.log(match[0]);
console.log(match.length);
~~~

Output:

~~~text
hahaha
1
~~~

The parentheses let the plus quantifier repeat the whole **ha** sequence. Since the group is non-capturing, the result contains only the complete match.

## Named capturing groups

A named capturing group uses **(?<name>...)**. Its value is available through the match result's **groups** property.

~~~js
const match = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec("2026-11-20");

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

Named captures make code easier to read when a pattern has several meaningful fields. The match result still has numbered captures as well.

A name must be a valid capture-group name, and a name must not conflict with another participating named group under the pattern's rules. If a named group is optional and does not match, its property is **undefined**.

## Backreferences

A backreference matches the same text that an earlier capturing group matched. A numbered backreference uses a number such as **\1**. A named backreference uses **\k<name>**.

~~~js
const repeatedWord = /\b(\w+)\s+\1\b/i;

console.log(repeatedWord.test("go go"));
console.log(repeatedWord.test("go stop"));
~~~

Output:

~~~text
true
false
~~~

The first capture stores **go**. The **\1** requires the same captured text to appear again. The **i** flag makes this example case-insensitive.

A named backreference makes the relationship explicit:

~~~js
const repeatedWord = /\b(?<word>\w+)\s+\k<word>\b/i;

console.log(repeatedWord.test("Echo echo"));
~~~

Output:

~~~text
true
~~~

Backreferences match previously captured text. They are not the same as writing the same character class twice, because each occurrence must match the specific captured text.

## Lookahead and lookbehind

Lookaround assertions check nearby text without including that text in the match.

- **(?=pattern)** is a positive lookahead. It requires the following text to match.
- **(?!pattern)** is a negative lookahead. It requires the following text not to match.
- **(?<=pattern)** is a positive lookbehind. It requires preceding text to match.
- **(?<!pattern)** is a negative lookbehind. It requires preceding text not to match.

~~~js
const amount = /\d+(?= dollars)/;

console.log("20 dollars".match(amount)[0]);
console.log(amount.test("20 euros"));
~~~

Output:

~~~text
20
false
~~~

The lookahead requires the word **dollars** after the number, but it does not include that word in the match.

~~~js
const price = /(?<=\$)\d+/;

console.log("$25".match(price)[0]);
console.log("25".match(price));
~~~

Output:

~~~text
25
null
~~~

The lookbehind requires a dollar sign before the digits. The dollar sign is not part of the returned match.

Lookarounds do not consume input. This makes them useful for adding context requirements while keeping the match limited to the text that should be extracted. Complex lookarounds can make patterns harder to understand, so use a clearer sequence of checks when that is easier to maintain.

## Flags

Flags are written after a regex literal's closing slash or passed as the second argument to **RegExp**. They are fixed when a regex is constructed, cannot be repeated, and **u** and **v** cannot be used together.

| Flag | Name | Effect |
| --- | --- | --- |
| **d** | has indices | Adds start and end positions for the full match and captures |
| **g** | global | Finds repeated matches and uses **lastIndex** with regex execution |
| **i** | ignore case | Matches letters without requiring the same case |
| **m** | multiline | Makes **^** and **$** work at line boundaries |
| **s** | dotAll | Lets **.** match line terminators |
| **u** | Unicode | Enables Unicode-aware matching and Unicode property escapes |
| **v** | Unicode sets | Adds Unicode set operations and string properties in character classes |
| **y** | sticky | Requires a match at exactly **lastIndex** |

The **flags** property reports a regex's flags in a canonical order.

~~~js
const pattern = /hello/gim;

console.log(pattern.flags);
console.log(pattern.global);
console.log(pattern.ignoreCase);
console.log(pattern.multiline);
~~~

Output:

~~~text
gim
true
true
true
~~~

Flags cannot be turned on or off after creating the regular expression. Construct another regex when different behavior is required.

### Case-insensitive matching

The **i** flag removes case distinctions for matching.

~~~js
console.log(/javascript/i.test("JavaScript"));
console.log(/javascript/.test("JavaScript"));
~~~

Output:

~~~text
true
false
~~~

Unicode-aware case folding can have details beyond basic ASCII letters. If a pattern handles international text, choose **u** or **v** as needed and test the actual characters that matter.

### Multiline anchors

The **m** flag changes the behavior of **^** and **$** so they can match the beginning and end of lines inside a string.

~~~js
const text = "first\nsecond";
const pattern = /^second$/m;

console.log(pattern.test(text));
~~~

Output:

~~~text
true
~~~

Without **m**, those assertions refer to the input boundaries, subject to the special final-line-terminator behavior of **$**.

### DotAll

The **s** flag lets a dot match line terminators.

~~~js
console.log(/a.b/.test("a\nb"));
console.log(/a.b/s.test("a\nb"));
~~~

Output:

~~~text
false
true
~~~

### Indices

The **d** flag adds an **indices** property to match results. Each pair is a start index and an exclusive end index.

~~~js
const match = /(?<name>\w+)-(?<id>\d+)/d.exec("item-42");

console.log(match.indices[0].join(","));
console.log(match.indices.groups.name.join(","));
console.log(match.indices.groups.id.join(","));
~~~

Output:

~~~text
0,7
0,4
5,7
~~~

Indices use JavaScript string offsets, which count UTF-16 code units. For Unicode text, a visible character may occupy more than one code unit.

### Unicode and Unicode sets

The **u** flag enables Unicode-aware pattern behavior. The **v** flag includes Unicode-aware behavior and adds set operations in character classes. They are mutually exclusive.

~~~js
const unicodeLetters = /\p{Letter}+/u;

console.log(unicodeLetters.test("café"));
~~~

Output:

~~~text
true
~~~

A **v** pattern can intersect Unicode properties:

~~~js
const greekLetters = /[\p{Letter}&&\p{Script=Greek}]+/v;

console.log(greekLetters.test("Καλημέρα"));
~~~

Output in a runtime that supports **v**:

~~~text
true
~~~

Check runtime support when using newer Unicode set syntax in environments that may be older.

## Global, sticky, and lastIndex

A regex with **g** or **y** is stateful when used with **exec()** or **test()**. The **lastIndex** property indicates where the next attempt begins.

~~~js
const pattern = /cat/g;
const text = "cat cat";

console.log(pattern.test(text), pattern.lastIndex);
console.log(pattern.test(text), pattern.lastIndex);
console.log(pattern.test(text), pattern.lastIndex);
~~~

Output:

~~~text
true 3
true 7
false 0
~~~

After a successful global match, **lastIndex** moves to the end of the match. When the next attempt fails, it resets to zero. Reusing the same global regex for unrelated checks can therefore produce surprising results.

The **y** flag is sticky. It requires the next match to begin exactly at **lastIndex**. Unlike **g**, it does not search later positions to find a match.

~~~js
const globalPattern = /\d+/g;
const stickyPattern = /\d+/y;

globalPattern.lastIndex = 1;
stickyPattern.lastIndex = 1;

console.log(globalPattern.exec("a 42")[0]);
console.log(stickyPattern.exec("a 42"));
~~~

Output:

~~~text
42
null
~~~

The global regex searches forward and finds **42**. The sticky regex tries exactly at index one, where the input has a space, so it fails.

When checking a pattern only once, a non-global and non-sticky regex avoids **lastIndex** state. If a global or sticky regex is reused, reset its **lastIndex** deliberately.

## RegExp methods

### exec()

**exec()** returns a match array or **null**. The array contains the complete match, captures, and properties such as **index**, **input**, and, for named captures, **groups**. With **g** or **y**, repeated calls use **lastIndex**.

~~~js
const pattern = /(?<name>\w+)=(\d+)/;
const match = pattern.exec("count=12");

console.log(match[0]);
console.log(match[1]);
console.log(match.groups.name);
console.log(match.index);
~~~

Output:

~~~text
count=12
count
count
0
~~~

Use **exec()** when code needs one match result with its captures or metadata.

### test()

**test()** returns a Boolean indicating whether a match exists. It also uses and changes **lastIndex** when the regex has **g** or **y**.

~~~js
const pattern = /\d+/;

console.log(pattern.test("item 7"));
console.log(pattern.test("item"));
~~~

Output:

~~~text
true
false
~~~

For a global regex, successive **test()** calls are not independent checks. Reset **lastIndex** or use a non-global regex for repeated yes-or-no questions.

## String matching methods

### match()

**match()** has different result shapes depending on the regex:

- With a regex that is not global, it returns the first match array, including capture groups and match metadata.
- With a global regex, it returns an array of all matched substrings. It does not include capture groups in that array.
- If nothing matches, it returns **null**.

~~~js
const first = "red blue red".match(/(r)(ed)/);
const all = "red blue red".match(/red/g);

console.log(first[0], first[1], first[2], first.index);
console.log(all.join(", "));
~~~

Output:

~~~text
red r ed 0
red, red
~~~

Use **matchAll()** when every match and its captures are needed.

### matchAll()

**matchAll()** returns an iterator of match arrays. The regex must have the **g** flag. Each result can include captures, **index**, **input**, and **groups**. It uses a cloned matcher, so it does not change the original regex's **lastIndex**. The clone starts from the original regex's current **lastIndex**.

~~~js
const pattern = /(?<key>\w+)=(?<value>\d+)/g;
const text = "x=1 y=20";

for (const match of text.matchAll(pattern)) {
  console.log(match[0], match.groups.key, match.groups.value, match.index);
}
~~~

Output:

~~~text
x=1 x 1 0
y=20 y 20 4
~~~

The iterator can be converted to an array with **Array.from()**. A regex passed to **matchAll()** without **g** causes a **TypeError**.

### search()

**search()** returns the index of the first match, or **-1** if there is no match. It is for finding a position, not collecting captures. The global flag does not make it return every match.

~~~js
console.log("one 42 two".search(/\d+/));
console.log("no digits".search(/\d+/));
~~~

Output:

~~~text
4
-1
~~~

**search()** ignores the regex's **lastIndex** and restores its previous value after searching.

## Replacing text

### replace()

With a string search value, **replace()** replaces the first occurrence. With a regex, it replaces the first match unless the regex has **g**, in which case it replaces all matches.

~~~js
console.log("red red".replace("red", "blue"));
console.log("red red".replace(/red/g, "blue"));
~~~

Output:

~~~text
blue red
blue blue
~~~

Replacement strings can include special substitutions:

| Replacement | Meaning |
| --- | --- |
| **$$** | A literal dollar sign |
| **$&** | The complete matched text |
| **$1**, **$2**, and so on | A numbered capture |
| A dollar sign followed by a backtick | Text before the match |
| **$'** | Text after the match |
| **$<name>** | A named capture |

~~~js
const text = "2026-11-20";
const date = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

console.log(text.replace(date, "$<day>/$<month>/$<year>"));
~~~

Output:

~~~text
20/11/2026
~~~

Use a replacement callback when the transformation needs logic.

~~~js
const text = "item 2, item 12";
const result = text.replace(/\d+/g, (digits) => String(Number(digits) * 2));

console.log(result);
~~~

Output:

~~~text
item 4, item 24
~~~

For a named capture, the callback receives the complete match, numbered capture values, the match offset, the input string, and a final groups object.

~~~js
const result = "Ada Lovelace".replace(
  /(?<first>\w+) (?<last>\w+)/,
  (match, first, last, offset, input, groups) =>
    groups.last + ", " + groups.first
);

console.log(result);
~~~

Output:

~~~text
Lovelace, Ada
~~~

A replacement callback's return value is inserted as text. Replacement tokens such as **$&** inside that returned value are not expanded again.

### replaceAll()

**replaceAll()** replaces every occurrence of a string search value. If the search value is a regular expression, that regex must have the **g** flag.

~~~js
console.log("red red".replaceAll("red", "blue"));
console.log("one, two, three".replaceAll(/, /g, " | "));
~~~

Output:

~~~text
blue blue
one | two | three
~~~

Use **replaceAll()** when the intent is explicitly to replace every literal occurrence. For regular expressions, include **g**.

## Splitting strings

**split()** separates a string at each occurrence of a separator. A regex can describe a separator pattern. Captures in the separator regex are included in the returned array.

~~~js
console.log("red,green;blue".split(/[,;]/).join("|"));
console.log("red,green".split(/(,)/).join("|"));
~~~

Output:

~~~text
red|green|blue
red|,|green
~~~

In the second output, the comma is included because it is captured by the separator pattern. Use a non-capturing group if the separator needs grouping but should not appear in the result.

## Choosing a method

| Need | Method |
| --- | --- |
| Check whether a match exists | **test()** |
| Get one match and its captures | **exec()** |
| Get a simple match result from a string | **match()** |
| Iterate over every match and capture | **matchAll()** |
| Find the first match position | **search()** |
| Replace one or many matches | **replace()** |
| Explicitly replace all literal occurrences | **replaceAll()** |
| Divide a string at separators | **split()** |

## Common mistakes

### Reusing a global regex without resetting lastIndex

A **g** or **y** regex keeps state for **exec()** and **test()**. A later call can start from a previous match's end. Use a non-stateful regex for independent checks, or reset **lastIndex**.

### Expecting match() with g to return captures

With **g**, **match()** returns matched strings and omits capture groups. Use **matchAll()** or repeated **exec()** when each capture is needed.

### Forgetting that matchAll() requires g

A regex passed to **matchAll()** must be global. It returns an iterator, so use a loop or convert it with **Array.from()**.

### Assuming global and sticky mean the same thing

The **g** flag can search forward from **lastIndex**. The **y** flag requires a match exactly at **lastIndex**.

### Treating a lookaround as part of the match

A lookaround checks context without consuming it. The text it verifies is not automatically included in the returned match.

### Confusing replacement tokens with callback results

Replacement-string tokens are interpreted in a replacement string. A callback's return value is inserted as-is.

### Forgetting captures change callback arguments

A replacement callback receives each numbered capture before its offset and input arguments. When named groups exist, a groups object is appended at the end.

### Using a regular expression for every split or replacement

A plain string is clearer for literal delimiters and search text. Use a regex when the delimiter or target is a pattern.

## Try it yourself

1. Capture a year, month, and day from a date string using named groups.
2. Match two repeated words and compare a numbered backreference with a named backreference.
3. Extract digits only when followed by a unit word using lookahead.
4. Extract digits only when preceded by a currency symbol using lookbehind.
5. Use **d** to inspect the start and end indices of named captures.
6. Compare **g** and **y** when the next match begins after whitespace.
7. Find all key-value pairs with **matchAll()** and named captures.
8. Use **replace()** with a capture token to reorder date components.
9. Use a replacement callback to normalize repeated whitespace or transform matched numbers.
10. Split a string with a regex and compare a capturing separator with a non-capturing separator.
11. Call **test()** twice with a global regex and observe **lastIndex**.
12. Explain why **match()** with a global regex does not provide capture groups.

## Key points

- Capturing groups return parts of a match. Non-capturing groups organize patterns without adding result entries.
- Named groups expose captures through **match.groups** and support named backreferences.
- Lookarounds check context without including that context in the match.
- Flags change matching behavior. **g** and **y** make **exec()** and **test()** stateful through **lastIndex**.
- **match()** with **g** returns matched strings; **matchAll()** returns every full match result with its captures.
- **replace()** supports capture substitutions and callback functions. **replaceAll()** explicitly replaces all occurrences.
- **split()** can include captured separators in its result.
- Choose the string or regex method whose return value and state behavior match the task.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [72 - Regular expression syntax](072-regular-expression-syntax.md) | [Open Q&A](../qnas/073-regexp-groups-flags-and-string-methods.md) | [Open example](../examples/073-regexp-groups-flags-and-string-methods.md) | [74 - JSON parsing, serialization, and data limits](074-json-parsing-serialization-and-data-limits.md) |
