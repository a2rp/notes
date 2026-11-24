# 16. Internationalization and runtime compatibility

Use the built-in `Intl` APIs for locale-aware formatting rather than hand-building separators, currency symbols, or date strings. The user's locale, numbering system, and timezone can differ from yours.

```js
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
}).format(1250);

const date = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeZone: "Asia/Kolkata",
}).format(new Date());
```

For calendar-sensitive or scheduling features, distinguish a date-only value (such as a birthday) from an instant (such as a payment timestamp). Store instants in a consistent representation, commonly ISO 8601 UTC timestamps, and format for the user's chosen timezone. Do not append a timezone label to a local time that was calculated in another timezone.

## Choose supported features deliberately

ECMAScript is updated through a standards process, while browsers and Node.js adopt features on their own schedules. The latest specification does not guarantee that every deployed runtime implements every built-in. Check compatibility for your actual support targets and test the oldest supported environment.

A proposal is not a stable platform contract. Prefer standardized features that your target runtimes support. When support is missing, choose a maintained polyfill or a simpler compatible implementation; avoid shipping a polyfill blindly if it changes global behavior.

Feature detection is usually safer than user-agent sniffing:

```js
if ("Segmenter" in Intl) {
  const segmenter = new Intl.Segmenter("en", { granularity: "word" });
  console.log([...segmenter.segment("JavaScript notes")]);
}
```

Keep date, currency, and language choices configurable when users may work across locales. Test representative scripts and right-to-left layouts, not only English text.

## References

- [MDN: Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization)
- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [ECMAScript 2026 specification](https://tc39.es/ecma262/2026/)
- [MDN browser compatibility data](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Compatibility_tables)
