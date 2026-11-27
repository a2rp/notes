# 77 - Intl and locale-aware formatting example

This example builds a small event summary from ordinary JavaScript values. It formats money, a percentage, a distance, an event time, attendee names, a count message, and a relative update. It also shows locale-specific number grouping, formatted parts, region display names, and guarded word segmentation.

## Goal

Use Intl for display and comparison while keeping the original data numeric or structured. Specify the locale and time zone so the example does not depend on the machine's defaults.

## Complete example

Copy this into **77-intl-event-summary.mjs** and run it in a modern JavaScript runtime with Intl support.

~~~js
const locale = 'en-US';

const event = {
  subtotal: 1299.5,
  taxRate: 0.0825,
  distanceKilometers: 12.5,
  startsAt: new Date('2026-04-01T16:00:00.000Z'),
  attendeeCount: 2,
  attendeeNames: ['Zoe', 'Émile', 'Ana'],
  itemLabels: ['Item 12', 'Item 2', 'Item 1']
};

const currencyFormat = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'USD'
});

const percentFormat = new Intl.NumberFormat(locale, {
  style: 'percent',
  maximumFractionDigits: 1
});

const distanceFormat = new Intl.NumberFormat(locale, {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'short',
  maximumFractionDigits: 1
});

const eventTimeFormat = new Intl.DateTimeFormat(locale, {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/New_York'
});

const itemCollator = new Intl.Collator(locale, {
  numeric: true,
  sensitivity: 'base'
});

const cardinalRules = new Intl.PluralRules(locale);
const attendeeCategory = cardinalRules.select(event.attendeeCount);

// This English-only message illustrates category selection.
// A multilingual product should use translated messages for each locale.
const attendeeMessage = attendeeCategory === 'one'
  ? event.attendeeCount + ' attendee'
  : event.attendeeCount + ' attendees';

const attendeeList = new Intl.ListFormat(locale, {
  style: 'long',
  type: 'conjunction'
});

const relativeTime = new Intl.RelativeTimeFormat(locale, {
  numeric: 'auto'
});

console.log('Subtotal: ' + currencyFormat.format(event.subtotal));
console.log('Tax rate: ' + percentFormat.format(event.taxRate));
console.log('Distance: ' + distanceFormat.format(event.distanceKilometers));
console.log('Event in New York: ' + eventTimeFormat.format(event.startsAt));
console.log('Item order: ' + event.itemLabels.slice().sort(itemCollator.compare).join(', '));
console.log('Attendee count: ' + attendeeMessage);
console.log('Attendee names: ' + attendeeList.format(event.attendeeNames));
console.log('Last update: ' + relativeTime.format(-1, 'day'));

const localizedNumbers = ['en-US', 'de-DE', 'hi-IN'].map(function (numberLocale) {
  return numberLocale + ': '
    + new Intl.NumberFormat(numberLocale).format(1234567.89);
});

console.log('Number formats:');
console.log(localizedNumbers.join('\n'));

const currencyParts = currencyFormat
  .formatToParts(event.subtotal)
  .map(function (part) {
    return part.type + '=' + JSON.stringify(part.value);
  });

console.log('Currency parts: ' + currencyParts.join(' | '));

if (typeof Intl.DisplayNames === 'function') {
  const regionNames = new Intl.DisplayNames(locale, {
    type: 'region'
  });

  console.log('Region name: ' + regionNames.of('US'));
} else {
  console.log('DisplayNames is not available in this runtime');
}

if (typeof Intl.Segmenter === 'function') {
  const wordSegmenter = new Intl.Segmenter(locale, {
    granularity: 'word'
  });

  const words = Array.from(
    wordSegmenter.segment('JavaScript works well.')
  )
    .filter(function (part) {
      return part.isWordLike;
    })
    .map(function (part) {
      return part.segment;
    });

  console.log('Words: ' + words.join(', '));
} else {
  console.log('Segmenter is not available in this runtime');
}
~~~

## Expected output

A current runtime with English locale data typically prints:

~~~text
Subtotal: $1,299.50
Tax rate: 8.3%
Distance: 12.5 km
Event in New York: Apr 1, 2026, 12:00 PM
Item order: Item 1, Item 2, Item 12
Attendee count: 2 attendees
Attendee names: Zoe, Émile, and Ana
Last update: yesterday
Number formats:
en-US: 1,234,567.89
de-DE: 1.234.567,89
hi-IN: 12,34,567.89
Currency parts: currency="$" | integer="1" | group="," | integer="299" | decimal="." | fraction="50"
Region name: United States
Words: JavaScript, works, well
~~~

Spacing, punctuation, names, and other localized output can vary with the runtime's locale data. If DisplayNames or Segmenter is missing, the code prints the corresponding fallback line.

## How it works

### Source values remain structured

The event stores the subtotal and tax rate as numbers, the start time as a Date representing an instant, and the names and labels as arrays. The formatters create display strings only when the values are printed.

Do not store "$1,299.50" as the amount or calculate from a localized string. Keep the number and the currency code as separate data.

### Formatters are reused

Each formatter is constructed once with its locale and options, then reused. This makes the intended display rules visible and avoids reconstructing a formatter for every field.

The percent formatter receives the ratio 0.0825, which it displays as 8.3%. Intl.NumberFormat does not calculate the tax amount or define financial rounding policy.

### The event time zone is explicit

The Date represents the instant 2026-04-01T16:00:00Z. The formatter displays that instant in America/New_York. A different time zone would show a different local clock time while preserving the same instant.

### Text uses locale-aware helpers

The Collator sorts labels so the number in Item 2 is compared numerically with the number in Item 12. The ListFormat handles conjunction punctuation. PluralRules selects a category, while the small message expression supplies English wording. Real localized interfaces should select a translated message for each locale and category.

RelativeTimeFormat localizes the phrase for a one-day offset. The application would need to calculate the offset and select an appropriate unit from actual event data.

### Parts and optional APIs

formatToParts() exposes pieces of the currency output in their locale-defined order. DisplayNames maps a region code to a localized name. Segmenter finds word-like segments rather than splitting text at spaces, which would fail for many writing systems.

DisplayNames and Segmenter are feature-detected. A production application should choose its fallback based on its supported runtimes and language requirements.

## Try these changes

1. Change locale to **de-DE** for the main formatters and compare the currency, percentage, list, and relative-time output.
2. Change currency to **INR** and choose a locale that matches the intended audience.
3. Change taxRate to **0.1** and **10** to see how percent formatting scales the value.
4. Change the timeZone to **Asia/Kolkata** and note that the instant stays unchanged.
5. Set attendeeCount to **1**, then inspect the selected English message.
6. Add more names and see how ListFormat handles the final separator.
7. Remove numeric: true from the collator and compare Item 2 with Item 12.
8. Inspect eventTimeFormat.formatToParts(event.startsAt) and identify its field and literal parts.
9. Change the sentence passed to Segmenter or change granularity to **sentence**.
10. Run in a runtime without Segmenter or DisplayNames support, if available, and inspect the fallback.

## Important boundaries

- Locale-aware formatting is not localized input parsing.
- Formatting a number does not make its calculation exact.
- A Date is an instant. Its displayed calendar and clock fields depend on the time zone.
- A plural category does not provide a translated sentence.
- Exact localized strings can change when runtime data is updated.
- Use feature detection for optional or newer Intl APIs.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [76 - Dates, time zones, and Temporal](../lessons/076-dates-time-zones-and-temporal.md) | [Open lesson](../lessons/077-intl-and-locale-aware-formatting.md) | [Open Q&A](../qnas/077-intl-and-locale-aware-formatting.md) | [78 - Proxy and Reflect](../lessons/078-proxy-and-reflect.md) |
