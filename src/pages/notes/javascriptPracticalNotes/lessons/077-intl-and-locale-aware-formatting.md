# 77 - Intl and locale-aware formatting

People expect numbers, dates, names, lists, and messages to follow the conventions of their language and region. A decimal separator, currency position, date order, plural form, or sorting rule can vary by locale.

JavaScript provides the **Intl** namespace for locale-sensitive operations. Keep application data in its meaningful, unformatted form, then use an Intl formatter at the point where it is displayed. A formatted string is presentation, not a replacement for the original number, date, or structured data.

## Learning goals

- Understand locale identifiers, locale negotiation, and runtime-dependent locale data.
- Format numbers, currencies, percentages, units, and compact values with Intl.NumberFormat.
- Format dates and ranges with an explicit locale and time zone.
- Compare and sort text with Intl.Collator.
- Choose plural forms, lists, and relative-time phrases with the matching Intl APIs.
- Segment text using Intl.Segmenter when the runtime supports it.
- Avoid parsing display strings or relying on exact output across runtimes.

## Locale-aware behavior

A **locale** identifies language and may include a region or script. Examples include **en-US**, **en-GB**, **hi-IN**, and **zh-Hant-TW**. Locale identifiers use language-tag conventions. The language is not the same as the user's location, currency, or time zone. An application may need to choose those separately.

A locale influences conventions such as:

- Decimal and grouping separators.
- Digit shapes and grouping patterns.
- Currency symbols, names, and placement.
- Date order, month names, punctuation, and clock conventions.
- Text comparison and sorting.
- Plural categories and list wording.

The same value can be presented differently without changing the underlying value:

~~~js
const amount = 1234567.89;

console.log(new Intl.NumberFormat('en-US').format(amount));
console.log(new Intl.NumberFormat('de-DE').format(amount));
console.log(new Intl.NumberFormat('hi-IN').format(amount));
~~~

~~~text
1,234,567.89
1.234.567,89
12,34,567.89
~~~

These are display strings. Do not use one locale's formatted output as a machine-readable number.

## Choosing and checking locales

Intl constructors accept a locale string, a list of preferred locale strings, or no locale. When given a list, the runtime chooses a supported match according to locale negotiation.

~~~js
const preferredLocales = ['fr-CA', 'fr', 'en'];

const formatter = new Intl.NumberFormat(preferredLocales);
console.log(formatter.format(12345.67));
console.log(formatter.resolvedOptions().locale);
~~~

When available, a browser can provide preferences through **navigator.languages** and **navigator.language**. These properties are browser APIs, so code shared with Node.js should not assume that navigator exists.

~~~js
const userLocales =
  typeof navigator !== 'undefined' && navigator.languages.length > 0
    ? navigator.languages
    : ['en'];

const formatter = new Intl.NumberFormat(userLocales);
~~~

If exact behavior matters, pass an explicit locale instead of depending on a machine's default. **Intl.getCanonicalLocales()** returns canonical locale identifiers and rejects malformed tags with a RangeError. **supportedLocalesOf()** checks which requested locales an Intl constructor can support without falling back to its default locale.

~~~js
console.log(Intl.getCanonicalLocales(['EN-us', 'hi-in']));

const supported = Intl.NumberFormat.supportedLocalesOf([
  'hi-IN',
  'fr-CA',
  'zz-ZZ'
]);

console.log(supported);
~~~

The exact supported set depends on the runtime's internationalization data. **resolvedOptions()** reveals the locale and options the formatter actually selected.

## Intl.NumberFormat

Create a NumberFormat instance for a particular locale and purpose, then reuse it for multiple values.

~~~js
const decimal = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
});

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1
});

console.log(decimal.format(12345.678));
console.log(currency.format(1234.5));
console.log(percent.format(0.256));
~~~

~~~text
12,345.68
$1,234.50
25.6%
~~~

### Number styles

The **style** option controls the kind of display:

| Style | Purpose | Important option |
| --- | --- | --- |
| decimal | General numbers | Fraction and significant digit limits |
| currency | Money display | currency, such as USD or INR |
| percent | A ratio displayed as a percentage | The input is multiplied by 100 for display |
| unit | A quantity with a unit | unit, such as kilometer or celsius |

~~~js
const distance = new Intl.NumberFormat('en-GB', {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'long',
  maximumFractionDigits: 1
});

console.log(distance.format(12.5));
~~~

A percentage formatter expects a ratio: **0.25** displays as **25%**. Passing **25** displays as **2,500%**. A currency formatter requires a currency code. Use the code as the stored currency identity, not a symbol such as **$**, since the same symbol can represent multiple currencies.

Currency defaults for fraction digits can differ by currency. Set digit options when the product has a specific display rule. Formatting does not perform financial calculations and does not make binary floating-point arithmetic exact. For money calculations, choose a suitable integer-minor-unit or decimal arithmetic strategy before formatting.

### Digit, notation, and sign options

Options such as **minimumFractionDigits**, **maximumFractionDigits**, **minimumSignificantDigits**, and **maximumSignificantDigits** control visible precision. If only one side of a fraction range is set, the other side still has a default. Inspect **resolvedOptions()** when defaults matter.

~~~js
const fixed = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
});

const signed = new Intl.NumberFormat('en-US', {
  signDisplay: 'always',
  maximumFractionDigits: 0
});

console.log(fixed.format(4));
console.log(compact.format(1250000));
console.log(signed.format(12));
~~~

~~~text
4.00
1.3M
+12
~~~

Compact labels and rounding are locale-sensitive. Do not build business rules by inspecting the resulting string. Modern runtimes also provide options such as **roundingMode**, **roundingIncrement**, and **trailingZeroDisplay**. Check the supported runtime before relying on newer options, and keep domain rounding rules explicit in the application logic.

### Formatting parts

**formatToParts()** returns objects with a **type** and **value** for pieces such as integer, group, decimal, fraction, currency, and literal. Use it to style parts while letting Intl determine separators and order.

~~~js
const parts = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).formatToParts(1234.5);

console.log(parts);
~~~

Do not assume a currency symbol always comes before the amount or that a decimal separator is a period. If a UI needs custom markup, render the parts without discarding their order or spacing.

**format()** returns display text. Intl does not provide a general inverse parser for localized number strings. Parse input with a deliberate input format and validation policy rather than stripping commas or replacing punctuation.

## Intl.DateTimeFormat

Use **Intl.DateTimeFormat** to present an instant or date in a locale. Choose a **timeZone** when output should not depend on the runtime's configured zone.

~~~js
const instant = new Date('2026-04-01T16:00:00.000Z');

const dateAndTime = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/London'
});

console.log(dateAndTime.format(instant));
~~~

~~~text
1 Apr 2026, 17:00
~~~

The instant stays the same. The locale controls how fields are presented, and the time zone controls which local date and clock time are shown. Without **timeZone**, the host's default zone is used.

Use **dateStyle** and **timeStyle** for common presets. For more specific output, use component options such as **year**, **month**, **day**, **weekday**, **hour**, **minute**, **second**, **timeZoneName**, and **hourCycle**. Do not combine a dateStyle or timeStyle preset with individual component options in the same formatter.

~~~js
const parts = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/New_York'
}).formatToParts(instant);

console.log(parts);
~~~

Use **formatToParts()** for custom layouts and **formatRange()** or **formatRangeToParts()** for a localized date range when supported. Feature-detect newer methods if the project's target runtimes vary. Avoid assembling localized dates by hand from month names and fixed punctuation.

The date input still needs a clear meaning. Formatting a Date shows an instant in a zone. A date-only value such as a birthday should not accidentally shift because it was modeled as UTC midnight and displayed in another zone. See the previous chapter for choosing date and time representations.

## Intl.Collator

Text ordering differs between languages. **Intl.Collator** provides locale-aware comparison. The function returned by **compare** produces a negative number, zero, or a positive number. Do not depend on it returning exactly -1 or 1.

~~~js
const names = ['Özil', 'Odin', 'Ada'];

const collator = new Intl.Collator('en', {
  sensitivity: 'base'
});

console.log(names.toSorted(collator.compare));
~~~

Use **numeric: true** when strings contain numbers that should compare by numeric value, such as filenames or product labels.

~~~js
const labels = ['item 10', 'item 2', 'item 1'];

const numericCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base'
});

console.log(labels.toSorted(numericCollator.compare));
~~~

~~~text
[ 'item 1', 'item 2', 'item 10' ]
~~~

Other options include **caseFirst**, **ignorePunctuation**, and **sensitivity**. Reuse one collator when sorting many values. **String.prototype.localeCompare()** is also locale-aware and can receive locale and options, but an explicit Collator is useful when the same comparison is repeated.

## Plural categories and localized messages

**Intl.PluralRules** selects a plural category for a number. Categories can include **zero**, **one**, **two**, **few**, **many**, and **other**. Which categories apply depends on the language. Cardinal quantities and ordinal positions can use different rules.

~~~js
const cardinal = new Intl.PluralRules('en');

console.log(cardinal.select(1));
console.log(cardinal.select(3));

const ordinal = new Intl.PluralRules('en', {
  type: 'ordinal'
});

console.log(ordinal.select(1));
console.log(ordinal.select(2));
console.log(ordinal.select(3));
console.log(ordinal.select(4));
~~~

~~~text
one
other
one
two
few
other
~~~

PluralRules selects a category, but it does not translate a complete message. Use the category to choose a message from the application's localization data. Do not assume every language has only singular and plural forms or that English suffix rules work elsewhere.

## Lists and relative time

**Intl.ListFormat** joins items using locale-specific wording and punctuation. Its **type** can be **conjunction**, **disjunction**, or **unit**. Its **style** can be **long**, **short**, or **narrow**.

~~~js
const list = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction'
});

console.log(list.format(['HTML', 'CSS', 'JavaScript']));
~~~

~~~text
HTML, CSS, and JavaScript
~~~

**Intl.RelativeTimeFormat** formats a numeric difference and a unit. The application still calculates the difference and chooses the unit.

~~~js
const relative = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto'
});

console.log(relative.format(-1, 'day'));
console.log(relative.format(3, 'hour'));
~~~

~~~text
yesterday
in 3 hours
~~~

Supported units include values such as **second**, **minute**, **hour**, **day**, **week**, **month**, **quarter**, and **year**. Use the singular unit name. The **numeric: 'auto'** option allows common phrases such as yesterday or tomorrow where the locale provides them.

## Display names and text segmentation

**Intl.DisplayNames** can produce locale-specific names for language, region, script, currency, calendar, or date-time field identifiers, depending on the type and runtime support.

~~~js
const regions = new Intl.DisplayNames('en', {
  type: 'region'
});

console.log(regions.of('IN'));
~~~

~~~text
India
~~~

**Intl.Segmenter** can split text into locale-sensitive grapheme, word, or sentence segments. This matters because a user-perceived character can contain multiple Unicode code points. JavaScript string length counts UTF-16 code units, and even iteration by code point does not always count visible grapheme clusters.

~~~js
if (typeof Intl.Segmenter === 'function') {
  const segmenter = new Intl.Segmenter('en', {
    granularity: 'word'
  });

  const words = Array.from(segmenter.segment('Learning JavaScript is useful.'))
    .filter(part => part.isWordLike)
    .map(part => part.segment);

  console.log(words);
} else {
  console.log('Intl.Segmenter is not available in this runtime');
}
~~~

Feature-detect APIs or methods that are newer than the project's minimum runtime. If an API is missing, choose a documented fallback or an appropriate polyfill. Do not silently treat a fallback as equivalent for every language.

## Runtime and output variability

Intl uses locale data supplied by the JavaScript runtime, often based on ICU and evolving internationalization standards. Different runtimes or data versions can vary in spacing, punctuation, symbols, abbreviations, grouping, or wording. Time-zone data can also change.

For this reason:

- Specify locale, time zone, and relevant options for stable application intent.
- Do not compare a localized string to a hard-coded value as a business rule.
- In tests, prefer checking semantic parts or use a pinned runtime and locale data.
- Treat examples of exact output as typical output for the stated settings, not a guarantee across all engines and locale-data versions.
- Keep machine-readable values separate from their display strings.
- Validate runtime support for newer Intl features.

## Common mistakes

- Relying on the host default locale when the interface has a selected locale.
- Treating region, language, currency, and time zone as interchangeable.
- Manually inserting grouping separators, currency symbols, or date punctuation.
- Passing 25 to a percent formatter when the intended ratio is 0.25.
- Assuming every currency uses two fractional digits.
- Treating formatted currency text as exact financial arithmetic.
- Parsing localized output by removing punctuation.
- Assuming compare returns exactly -1 or 1.
- Hard-coding English plural categories or ordinal suffixes.
- Expecting PluralRules to translate a full sentence.
- Building an instant display without specifying a required time zone.
- Expecting identical Intl strings on every runtime version.
- Assuming an optional newer Intl API exists everywhere.

## Practice

1. Format the same decimal number for en-US, de-DE, and hi-IN.
2. Format a money amount in USD and INR, and explain why the currency code must accompany the value.
3. Format a ratio as a percentage. Try both 0.25 and 25 and compare.
4. Create a unit formatter for distance or temperature.
5. Use fraction and significant digit options, then inspect resolvedOptions().
6. Use formatToParts() to identify currency, integer, decimal, and fraction parts.
7. Format one instant in two explicit time zones and two locales.
8. Format a date range if formatRange is available.
9. Sort labels containing item 1, item 2, and item 10 with and without numeric comparison.
10. Compare strings with different accents using sensitivity options.
11. Check cardinal and ordinal plural categories for several values.
12. Format a conjunction and disjunction list.
13. Format a past and future relative time with numeric set to auto.
14. Look up a region display name using DisplayNames.
15. If available, use Segmenter to find word boundaries in a sentence and grapheme boundaries in a string with a combining mark or emoji.
16. Explain why a formatted number should not be stored as the source value.

## Key points

- Intl formats or compares data according to locale conventions while leaving the source value unchanged.
- Pass explicit locales and time zones when output must have defined behavior.
- NumberFormat covers decimal, currency, percent, unit, precision, notation, signs, and formatted parts.
- DateTimeFormat localizes an instant or date display and supports parts and ranges.
- Collator handles language-aware comparison and sorting.
- PluralRules, ListFormat, and RelativeTimeFormat support common localized wording patterns.
- DisplayNames and Segmenter help localize names and analyze text where supported.
- Runtime locale data can change exact punctuation and output, so keep display strings out of business logic.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [76 - Dates, time zones, and Temporal](076-dates-time-zones-and-temporal.md) | [Open Q&A](../qnas/077-intl-and-locale-aware-formatting.md) | [Open example](../examples/077-intl-and-locale-aware-formatting.md) | [78 - Proxy and Reflect](078-proxy-and-reflect.md) |
