# 76 - Dates, time zones, and Temporal

Date and time code is difficult because a calendar date, a wall-clock time, and an exact moment are different kinds of information. Time zones also follow rules that can change over time, including daylight-saving transitions and government decisions.

Choose a representation that matches the question. A birthday is usually a date without a time zone. A completed payment is an exact moment. A meeting scheduled for 9:00 AM in a city needs a local date and time plus that city's time zone.

## Learning goals

- Distinguish an exact instant from a calendar date and local clock time.
- Understand what JavaScript Date stores and what it does not store.
- Parse and serialize dates using explicit formats and offsets.
- Format the same instant in different time zones.
- Account for daylight-saving gaps and repeated local times.
- Choose an appropriate Temporal type when the runtime supports it.
- Avoid treating every day as exactly 24 hours.

## Three different questions

Before choosing an API, ask what the value means:

| Meaning | Example | Suitable representation |
| --- | --- | --- |
| Exact moment on the global timeline | A payment completed at a recorded moment. | UTC timestamp, Date, or Temporal.Instant. |
| Calendar date with no time | A birthday or a due date. | Date-only text such as YYYY-MM-DD, or Temporal.PlainDate. |
| Local clock time | A store opens at 9:00 AM every day. | Local time such as 09:00, or Temporal.PlainTime. |
| Local date and time in a region | A meeting at 9:00 AM in New York. | Local date-time plus a time-zone identifier, or Temporal.ZonedDateTime. |
| Length of time | A timer lasts 90 minutes. | Duration or a numeric elapsed-time value. |

These meanings are not interchangeable. A date-only value does not identify an instant. A local date-time without a time zone may correspond to zero, one, or two instants when time-zone transition rules are applied.

## Legacy Date

JavaScript's **Date** object represents an exact timestamp as milliseconds relative to the Unix epoch. It does not store the time zone used to construct it. Methods interpret that timestamp either as UTC or in the host environment's local time zone.

~~~js
const event = new Date('2026-04-01T16:00:00.000Z');

console.log(event.toISOString());
console.log(event.getTime());
console.log(event.getUTCFullYear());
~~~

~~~text
2026-04-01T16:00:00.000Z
1775068800000
2026
~~~

The trailing **Z** means UTC. **toISOString()** produces an ISO-style UTC string. The numeric timestamp is useful for comparing exact moments and measuring elapsed milliseconds.

### Local and UTC methods

Date has pairs of methods that use different interpretations:

- **getHours()** and **setHours()** use the host's local time zone.
- **getUTCHours()** and **setUTCHours()** use UTC.
- **getFullYear()** uses local time. **getUTCFullYear()** uses UTC.
- **getMonth()** and **getUTCMonth()** return a zero-based month, where January is 0.
- **getTimezoneOffset()** reports the local offset from UTC for that date, in minutes.

Do not assume local methods use the user's location when code runs on a server. They use the host environment's configured time zone.

### Parsing date text

Prefer standardized date-time strings with an explicit UTC marker or numeric offset when the value is an instant:

~~~js
const utcEvent = new Date('2026-04-01T16:00:00Z');
const offsetEvent = new Date('2026-04-01T12:00:00-04:00');

console.log(utcEvent.getTime() === offsetEvent.getTime());
~~~

~~~text
true
~~~

A date-only ISO string such as **2026-04-01** is interpreted as UTC by the standardized Date parsing behavior. A date-time string without an offset is interpreted in the host's local time zone. This difference can surprise code that treats both forms as the same kind of value.

Other date string formats may be parsed inconsistently. Validate an input format and avoid relying on implementation-specific parsing.

### Invalid Date

An invalid date is still an object, but its timestamp is NaN.

~~~js
const invalid = new Date('not a date');

console.log(invalid instanceof Date);
console.log(Number.isNaN(invalid.getTime()));
~~~

~~~text
true
true
~~~

Check **Number.isNaN(date.getTime())** or use a strict input parser before using a Date. Calling **toISOString()** on an invalid Date throws a RangeError.

### Date construction details

When constructing with numeric components, the month is zero-based. The constructor also normalizes some out-of-range components, which may hide mistakes.

~~~js
const date = new Date(2026, 3, 1);

console.log(date.getMonth());
~~~

~~~text
3
~~~

This creates a local-time Date for April 1 because month index 3 is April. The result depends on the host time zone. Prefer explicit strings for instants and deliberate UTC methods or date libraries for calculations that require a specific interpretation.

## Time zones and offsets

A UTC offset such as **-04:00** describes the offset from UTC at a particular moment. A region time-zone identifier such as **America/New_York** refers to a rule set that can have different offsets at different dates.

Do not store only the current offset when future local behavior matters. A region can change its offset because of daylight-saving rules or legal changes.

~~~js
const instant = new Date('2026-04-01T16:00:00Z');

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
});

console.log(formatter.format(instant));
~~~

The instant is the same, but the displayed calendar date and clock time depend on the chosen time zone. Specify **timeZone** when the result must be predictable. Without it, formatting uses the runtime's default zone.

### Daylight-saving gaps and overlaps

When clocks move forward, some local clock times do not exist. When clocks move backward, some local times occur twice. For example, a schedule near a transition might ask for a time that is skipped or ambiguous in its region.

For future appointments, store the intended local date and time together with the region time-zone identifier. Apply an explicit policy for ambiguous or nonexistent times. For a completed event, store its exact instant, usually in UTC.

### Elapsed time and calendar arithmetic

Adding 86,400,000 milliseconds adds exactly 24 elapsed hours. It does not necessarily mean the local clock will show the same time on the next calendar day across a daylight-saving transition.

~~~js
const beforeTransition = new Date('2026-03-07T17:00:00Z');
const after24Hours = new Date(beforeTransition.getTime() + 24 * 60 * 60 * 1000);

console.log(beforeTransition.toISOString());
console.log(after24Hours.toISOString());
~~~

~~~text
2026-03-07T17:00:00.000Z
2026-03-08T17:00:00.000Z
~~~

The elapsed time is exactly 24 hours. In a time zone with a spring clock change during that interval, the displayed local clock hour may differ. Use a time-zone-aware calendar API for tasks such as "same local time tomorrow" or "one calendar month later."

## Formatting with Intl.DateTimeFormat

Keep the underlying value as a date or instant. Use **Intl.DateTimeFormat** to present it in a locale and time zone.

~~~js
const appointment = new Date('2026-04-01T16:00:00Z');

const display = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/New_York'
});

console.log(display.format(appointment));
~~~

Locale affects ordering, names, digits, and punctuation. Time zone affects the local date and clock time. Specify both when output needs to be reproducible.

Use **formatToParts()** when a UI needs the individual localized fields. Avoid manually assembling a localized date from month names or fixed separators.

## Temporal

**Temporal** is a newer date and time API designed to make these distinctions explicit. It has types for exact time, date-only values, local time, local date-time, zoned date-time, and durations. Availability varies by runtime, so check support before using it in a project.

| Temporal type | Represents |
| --- | --- |
| Temporal.Instant | An exact point on the timeline, independent of a time zone. |
| Temporal.PlainDate | A calendar date with no time or time zone. |
| Temporal.PlainTime | A clock time with no date or time zone. |
| Temporal.PlainDateTime | A local date and clock time with no time zone. |
| Temporal.ZonedDateTime | An exact instant viewed through a named time zone and calendar. |
| Temporal.Duration | A length or calendar-based amount of time. |

~~~js
if (typeof Temporal !== 'undefined') {
  const birthday = Temporal.PlainDate.from('2000-04-01');
  const instant = Temporal.Instant.from('2026-04-01T16:00:00Z');
  const tokyoTime = instant.toZonedDateTimeISO('Asia/Tokyo');

  console.log(birthday.toString());
  console.log(tokyoTime.toString());
} else {
  console.log('Temporal is not available in this runtime');
}
~~~

A PlainDate is appropriate for a birthday because no instant or time zone is involved. An Instant is appropriate for a timestamp. A ZonedDateTime is appropriate when calculations must preserve the rules of a named region.

Use **Temporal.Now** when an application needs the current date or time in an explicit time zone. Avoid silently using a server's local zone for a user's schedule.

## Date storage and interchange

Choose stored data according to its meaning:

- Store a completed event as an ISO UTC timestamp or another unambiguous instant representation.
- Store a birthday or due date as a date-only value, not as midnight UTC.
- Store a future regional appointment with its local date-time and time-zone identifier.
- Store an elapsed duration as a duration or a clearly defined numeric unit.
- Document whether an API field is an instant, local time, or calendar date.

Serializing a Date with **JSON.stringify()** calls its **toJSON()** method and produces a UTC string. Parsing that string with JSON.parse() returns a string, not a Date. Convert it explicitly after checking the format.

## Common mistakes

- Treating Date as if it stores the original time zone.
- Assuming a UTC offset is a permanent regional time-zone rule.
- Parsing arbitrary date strings without validating their format.
- Forgetting that getMonth() is zero-based.
- Confusing a calendar day with exactly 24 elapsed hours.
- Storing a birthday as an instant and displaying it in arbitrary time zones.
- Using a server's local time zone for a user's regional schedule.
- Ignoring skipped or repeated local times during clock transitions.
- Assuming Temporal is available in every browser or runtime.
- Expecting JSON parsing to restore a Date automatically.

## Practice

1. Parse an ISO timestamp with **Z** and display it in UTC and in a named time zone.
2. Compare the timestamps of two strings that describe the same instant with different offsets.
3. Construct an invalid Date and check its timestamp.
4. Use a date-only value for a birthday and explain why it should not shift across time zones.
5. Add 24 elapsed hours to an instant around a daylight-saving transition and compare local display.
6. Format an instant with an explicit locale and time zone.
7. If Temporal is supported, create a PlainDate, Instant, and ZonedDateTime for matching values.
8. Choose what should be stored for a completed event, a birthday, and a future meeting in a named region.

## Key points

- A calendar date, wall-clock time, exact instant, and duration are different data.
- Date stores a timestamp, not a time-zone identifier.
- Use explicit offsets or UTC for instants and named zones for regional rules.
- Calendar arithmetic is not always the same as adding a fixed number of milliseconds.
- Intl.DateTimeFormat controls localized display and should receive an explicit time zone when output must be predictable.
- Temporal provides more precise types, but runtime availability should be checked.
- Store dates according to their meaning and convert them deliberately.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [75 - Math, Number, and numeric utilities](075-math-number-and-numeric-utilities.md) | [Open Q&A](../qnas/076-dates-time-zones-and-temporal.md) | [Open example](../examples/076-dates-time-zones-and-temporal.md) | [77 - Intl and locale-aware formatting](077-intl-and-locale-aware-formatting.md) |

