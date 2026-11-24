# 7. Strings, numbers, dates, and regular expressions

Strings are immutable sequences represented with UTF-16 code units. Therefore `text.length` counts code units, not necessarily user-perceived characters. Some characters use two code units; combining marks and emoji sequences can contain several code points. Use `Intl.Segmenter` when the product needs language-aware word or grapheme boundaries, after checking runtime support.

Template literals interpolate expressions and support multiline text. For dynamic HTML, do not assume that interpolation is safe; use DOM text APIs or a framework's escaping behavior rather than concatenating untrusted input into markup.

## Numbers and precision

JavaScript's `Number` is IEEE 754 binary floating point. Some decimal fractions cannot be represented exactly, so compare currency as integer minor units or use a decimal library designed for the domain. `BigInt` handles arbitrary-size integers, but cannot be mixed directly with `Number` arithmetic and is not serialized by `JSON.stringify` without an explicit conversion.

```js
const cents = 1299;
const formatted = new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR",
}).format(cents / 100);
```

## Dates and regular expressions

`Date` stores an instant as milliseconds from the Unix epoch. Local display depends on timezone; parse and format with an explicit policy rather than assuming the user's timezone is UTC. For locale-aware output, use `Intl.DateTimeFormat`.

Regular expressions are useful for bounded pattern checks and extraction. They are not a substitute for a parser when the input has nested structure. Escape or constrain user-provided patterns, set reasonable input limits, and beware of patterns with catastrophic backtracking on attacker-controlled strings.

## References

- [MDN: Text formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting)
- [MDN: Numbers and strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings)
- [MDN: `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [MDN: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
