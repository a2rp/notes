# 77 - Intl and locale-aware formatting Q&A

These questions review locale selection, number and date formatting, text comparison, plural categories, localized lists, relative time, and text segmentation. Each answer follows its question.

## Locale basics

### 1. What does a locale affect?

**Answer:** A locale selects language and regional conventions used for formatting, comparison, and related internationalized behavior.

**Explanation:** It can affect separators, digit grouping, currency placement, date order, sorting, and wording. It does not by itself identify a time zone or prove which currency an amount represents.

### 2. Which of these is a well-formed locale tag?

- A. en_US
- B. en-US
- C. english-US
- D. US-en

**Answer:** B.

**Explanation:** Locale identifiers use language-tag conventions with hyphens. The other spellings are not the standard forms shown here.

### 3. What is the purpose of passing an array of locales to an Intl constructor?

**Answer:** It provides an ordered preference list so the runtime can choose a supported locale match.

**Explanation:** For example, an application can offer a preferred language followed by fallbacks. The selected locale can be inspected with resolvedOptions().

### 4. Which API canonicalizes locale identifiers?

**Answer:** Intl.getCanonicalLocales().

**Explanation:** It returns canonical forms for valid tags and throws a RangeError for malformed locale identifiers.

### 5. How can code check which requested locales an Intl formatter supports without falling back to the runtime default?

**Answer:** Use the constructor's supportedLocalesOf() static method.

**Explanation:** For example, Intl.NumberFormat.supportedLocalesOf(locales) returns the requested locales that the implementation supports.

### 6. Why should a browser application avoid directly assuming navigator exists?

**Answer:** navigator is a browser API and may not exist in Node.js or other non-browser runtimes.

**Explanation:** Check the environment before reading navigator.language or navigator.languages, and choose a deliberate fallback.

## Number formatting

### 7. What does Intl.NumberFormat.format() return?

**Answer:** A string formatted for display.

**Explanation:** Keep the numeric source value separately. A display string is not a machine-readable number or an inverse parse format.

### 8. What does style: 'percent' do to a ratio of 0.25?

**Answer:** It displays a percentage equivalent to 25%.

**Explanation:** The formatter scales the input by 100 for display. Passing 25 would display 2,500%.

### 9. Which option is required when using NumberFormat with style: 'currency'?

**Answer:** A currency code, such as USD or INR.

**Explanation:** A symbol such as $ is not a reliable currency identity because multiple currencies use it.

### 10. Why should currency arithmetic not be delegated to NumberFormat?

**Answer:** NumberFormat changes presentation and rounding, not the accuracy of the underlying calculation.

**Explanation:** Choose an appropriate money representation and calculation strategy first, then format the result.

### 11. What does unitDisplay control in a unit formatter?

**Answer:** Whether the unit is displayed in a long, short, or narrow form.

**Explanation:** The exact localized wording and spacing are provided by Intl rather than manually appended by the application.

### 12. What is the main difference between fraction digits and significant digits?

**Answer:** Fraction digits limit digits after the decimal separator, while significant digits limit meaningful digits across the number.

**Explanation:** Which is appropriate depends on the intended display rule. Defaults can affect output, so inspect resolvedOptions() when needed.

### 13. What does notation: 'compact' request?

**Answer:** A shortened display such as 1.3M for a large value, according to the locale's conventions.

**Explanation:** Compact notation and its rounding are for presentation. Do not infer the original numeric value from the abbreviated string.

### 14. What does signDisplay: 'always' do?

**Answer:** It displays a sign for positive values as well as negative values.

**Explanation:** The exact sign conventions can still depend on the locale and formatter options.

### 15. What can NumberFormat.formatToParts() provide?

**Answer:** An ordered array of typed pieces such as integer, group, decimal, fraction, currency, and literal.

**Explanation:** A UI can style or place markup around parts while preserving locale-specific order and separators.

### 16. Why is removing commas from localized number text not a safe parser?

**Answer:** Separators vary by locale, and some locales use commas for decimals or nonbreaking spaces for grouping.

**Explanation:** Display formatting is not a general input grammar. Define and validate an input format separately.

### 17. Which statement about rounding is correct?

- A. Formatting provides exact decimal arithmetic.
- B. Formatting can round only for display; domain calculations need their own rule.
- C. Currency always has two decimal places.
- D. Compact notation preserves every digit in the output.

**Answer:** B.

**Explanation:** NumberFormat applies display options to a value. It does not make binary floating-point calculations exact, and currency conventions differ.

## Dates and time zones

### 18. What does the locale control in Intl.DateTimeFormat?

**Answer:** The conventions for presenting date and time fields, such as order, names, and punctuation.

**Explanation:** The locale affects presentation. A separate timeZone option controls the zone used to display an instant.

### 19. Why set timeZone explicitly when output must be predictable?

**Answer:** Without it, the formatter uses the runtime's default time zone, which can differ between devices or servers.

**Explanation:** An explicit zone makes the intended regional clock display clear.

### 20. Can dateStyle or timeStyle be combined with individual date and time component options?

**Answer:** No.

**Explanation:** Use the style presets by themselves, or configure individual fields such as year, month, day, hour, and minute.

### 21. What is formatToParts() useful for with DateTimeFormat?

**Answer:** It exposes the localized fields and literals in their formatted order.

**Explanation:** This supports custom markup without guessing month order, punctuation, or spacing.

### 22. What is formatRange() intended to do?

**Answer:** Format a start and end value as one localized date or time range.

**Explanation:** It can avoid repeating fields when the locale has a compact range convention. Check method support when targeting older runtimes.

### 23. If the same Date is formatted in two time zones, does its instant change?

**Answer:** No.

**Explanation:** The formatter changes the displayed local date and clock fields, not the underlying timestamp.

## Comparing text and selecting messages

### 24. What does Intl.Collator.compare() return?

**Answer:** A negative number, zero, or a positive number to indicate ordering or equality at the selected comparison sensitivity.

**Explanation:** Code should test the sign, not expect exactly -1 or 1.

### 25. What does numeric: true change in an Intl.Collator?

**Answer:** It makes number sequences inside strings compare numerically, such as item 2 before item 10.

**Explanation:** This is useful for filenames, labels, and similar human-readable text.

### 26. What does the sensitivity option influence?

**Answer:** Which textual differences matter during comparison, such as accents and letter case.

**Explanation:** The best setting depends on the language and task. A search comparison and a sort comparison may need different behavior.

### 27. How can repeated locale-aware sorting avoid reconstructing comparison behavior for each pair?

**Answer:** Create one Intl.Collator and reuse its compare function.

**Explanation:** A collator is designed to represent the chosen locale and options for repeated string comparisons.

### 28. Does Intl.PluralRules translate a complete sentence?

**Answer:** No.

**Explanation:** It selects a plural category, and the application uses that category to choose an appropriately localized message.

### 29. Why should code not assume plural categories are only one and other?

**Answer:** Languages have different plural systems and may use categories such as zero, two, few, or many.

**Explanation:** Use the category returned by PluralRules and provide messages for the categories required by the localization data.

### 30. What does the type: 'ordinal' option mean for PluralRules?

**Answer:** It selects categories for ordinal positions, such as first, second, and third, rather than cardinal quantities.

**Explanation:** Cardinal and ordinal categories can differ, even for the same number and locale.

### 31. What does Intl.ListFormat do?

**Answer:** It joins a collection of strings using localized list wording and punctuation.

**Explanation:** Its type can express conjunction, disjunction, or unit-style lists.

### 32. What does Intl.RelativeTimeFormat do, and what does the application still need to do?

**Answer:** It localizes a numeric offset and time unit into a relative phrase. The application still calculates the offset and chooses the unit.

**Explanation:** For example, format(-1, 'day') can produce a localized equivalent of yesterday when numeric is set to auto.

## Names, segmentation, and runtime behavior

### 33. What kind of value can Intl.DisplayNames format?

**Answer:** A code such as a region, language, script, currency, calendar, or date-time field identifier, depending on the configured type.

**Explanation:** It returns the corresponding display name in the selected locale when supported.

### 34. What can Intl.Segmenter divide text into?

**Answer:** Grapheme, word, or sentence segments.

**Explanation:** Locale-sensitive segmentation is useful when a user-perceived character or word boundary cannot be found reliably with simple string indexes.

### 35. Does JavaScript string length count user-perceived characters?

**Answer:** No.

**Explanation:** It counts UTF-16 code units. Iterating by Unicode code point still does not always match grapheme clusters, which may contain multiple code points.

### 36. Why should applications feature-detect newer Intl APIs?

**Answer:** Their availability can differ across the application's supported browsers and runtimes.

**Explanation:** Check the constructor or method before use, then provide a documented fallback or polyfill if needed.

### 37. Why can exact formatted output differ between runtime versions?

**Answer:** Runtimes can ship different versions of locale and time-zone data or implement evolving internationalization standards.

**Explanation:** Separators, spaces, labels, abbreviations, and time-zone names can change while the formatting intent remains the same.

### 38. Which result is the best test target when localized punctuation may change?

- A. Exact full string in every runtime.
- B. A business rule based on the currency symbol.
- C. Semantic format parts, or exact output in a pinned runtime and locale-data environment.
- D. A hand-written replacement for Intl.

**Answer:** C.

**Explanation:** Tests should focus on stable meaning or control the environment when exact output is required.

## Applied and coding questions

### 39. Write a formatter that displays a ratio as a percentage with one fractional digit.

**Answer:**

~~~js
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1
});

console.log(percent.format(0.256));
~~~

~~~text
25.6%
~~~

**Explanation:** Percent style scales the ratio for display. The input is 0.256, not 25.6.

### 40. How should a UI sort product labels so item 2 comes before item 10 and format an amount of 1250 US dollars?

**Answer:**

~~~js
const labels = ['item 10', 'item 2', 'item 1'];
const collator = new Intl.Collator('en', { numeric: true });

console.log(labels.toSorted(collator.compare));

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

console.log(money.format(1250));
~~~

~~~text
[ 'item 1', 'item 2', 'item 10' ]
$1,250.00
~~~

**Explanation:** The collator compares number sequences by numeric value. The currency formatter handles grouping, currency placement, and the locale's default currency precision. Keep the original numeric amount for calculations.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [76 - Dates, time zones, and Temporal](../lessons/076-dates-time-zones-and-temporal.md) | [Lesson](../lessons/077-intl-and-locale-aware-formatting.md) · [Example](../examples/077-intl-and-locale-aware-formatting.md) | [78 - Proxy and Reflect](../lessons/078-proxy-and-reflect.md) |
