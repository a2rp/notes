# 76 - Dates, time zones, and Temporal example

This example models a scheduled event as an exact instant, displays it in two regions, demonstrates a date-only display shift with legacy Date, and shows why adding 24 hours is not always the same local time on the next day.

## Goal

Practice choosing a representation based on what the value means:

- An exact instant for a scheduled event.
- A plain string for a date that has no time zone.
- A named time zone for regional display and daylight-saving rules.

## Complete example

Copy this into **76-date-time-zones.mjs** and run it with a modern JavaScript runtime that provides Intl.DateTimeFormat and IANA time-zone data.

~~~js
function formatInZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date);

  const fields = Object.fromEntries(
    parts.map(part => [part.type, part.value])
  );

  return fields.year
    + '-' + fields.month
    + '-' + fields.day
    + ' ' + fields.hour
    + ':' + fields.minute;
}

const meeting = new Date('2026-04-01T16:00:00.000Z');
const sameMeetingFromOffset = new Date('2026-04-01T12:00:00.000-04:00');

console.log('Exact instant: ' + meeting.toISOString());
console.log(
  'Offset timestamps match: '
  + (meeting.getTime() === sameMeetingFromOffset.getTime())
);
console.log('Tokyo local time: ' + formatInZone(meeting, 'Asia/Tokyo'));
console.log(
  'New York local time: '
  + formatInZone(meeting, 'America/New_York')
);

const birthdayText = '2000-01-01';
const legacyBirthday = new Date(birthdayText);

console.log('Date-only value: ' + birthdayText);
console.log(
  'Legacy Date in Los Angeles: '
  + formatInZone(legacyBirthday, 'America/Los_Angeles')
);

const beforeClockChange = new Date('2026-03-07T17:00:00.000Z');
const after24Hours = new Date(
  beforeClockChange.getTime() + 24 * 60 * 60 * 1000
);

console.log(
  'Elapsed hours: '
  + (after24Hours.getTime() - beforeClockChange.getTime()) / (60 * 60 * 1000)
);
console.log(
  'New York before clock change: '
  + formatInZone(beforeClockChange, 'America/New_York')
);
console.log(
  'New York after 24 hours: '
  + formatInZone(after24Hours, 'America/New_York')
);

const serialized = JSON.stringify({ happenedAt: meeting });
const parsedAgain = JSON.parse(serialized);
console.log('JSON date field type after parsing: ' + typeof parsedAgain.happenedAt);

const invalidDate = new Date('not a date');
console.log(
  'Invalid Date timestamp is NaN: '
  + Number.isNaN(invalidDate.getTime())
);
~~~

## Expected output

~~~text
Exact instant: 2026-04-01T16:00:00.000Z
Offset timestamps match: true
Tokyo local time: 2026-04-02 01:00
New York local time: 2026-04-01 12:00
Date-only value: 2000-01-01
Legacy Date in Los Angeles: 1999-12-31 16:00
Elapsed hours: 24
New York before clock change: 2026-03-07 12:00
New York after 24 hours: 2026-03-08 13:00
JSON date field type after parsing: string
Invalid Date timestamp is NaN: true
~~~

## How it works

### One instant can have multiple local displays

The meeting is represented by an ISO timestamp ending in Z. The offset form describes the same instant, so their millisecond timestamps match.

Intl.DateTimeFormat applies the chosen region's rules at that instant. Tokyo is already on the next calendar date, while New York shows midday on the same date.

### A date-only value is not an instant

The birthday text is a date-only value. Passing it to legacy Date interprets it as UTC midnight. Displaying that instant in Los Angeles shows the previous calendar date and the local clock time.

For a birthday, keep a validated date-only value or use Temporal.PlainDate when supported. Do not shift it through a time zone unless that is part of the intended meaning.

### Elapsed time and local calendar time differ

Adding 24 hours to the UTC timestamp produces exactly 24 elapsed hours. New York changes its clock during this interval, so the local time is 1 PM on the following date rather than noon.

For a rule such as "the same local time tomorrow", use a time-zone-aware calendar operation rather than adding a fixed number of milliseconds.

### JSON serialization does not restore Date

JSON.stringify() calls Date.toJSON() and writes a UTC string. JSON.parse() returns that field as a string. Convert it back to a Date only after validating the expected format.

### Invalid dates need a check

Invalid Date is still an object, so instanceof Date alone is not sufficient. Its timestamp is NaN. Validate before formatting or calling toISOString().

## Temporal option

Temporal support varies by runtime. Check for the global before using Temporal in an application. This separate snippet shows a date-only birthday, an exact instant, and a regional meeting:

~~~js
if (typeof Temporal === 'undefined') {
  console.log('Temporal is not available in this runtime');
} else {
  const birthday = Temporal.PlainDate.from('2000-01-01');
  const instant = Temporal.Instant.from('2026-04-01T16:00:00Z');
  const tokyo = instant.toZonedDateTimeISO('Asia/Tokyo');

  const localMeeting = Temporal.PlainDateTime
    .from('2026-04-01T09:00')
    .toZonedDateTime('America/New_York');

  console.log('Birthday: ' + birthday.toString());
  console.log('Tokyo event: ' + tokyo.toString());
  console.log('Regional meeting: ' + localMeeting.toString());
}
~~~

When Temporal is available, the output is:

~~~text
Birthday: 2000-01-01
Tokyo event: 2026-04-02T01:00:00+09:00[Asia/Tokyo]
Regional meeting: 2026-04-01T09:00:00-04:00[America/New_York]
~~~

If it is unavailable, the guarded snippet prints the fallback message. Do not assume that Temporal is present in every supported browser or runtime.

## Try these changes

1. Change the meeting instant and compare its Tokyo and New York displays.
2. Use UTC in Intl.DateTimeFormat and compare the result.
3. Change the birthday string and see how the legacy Date display can shift west of UTC.
4. Add 24 hours around a different daylight-saving transition and compare local wall-clock time.
5. Remove the Z or offset from a date-time string and note that legacy Date uses the host's local zone.
6. Serialize another Date with JSON.stringify() and inspect the type returned after JSON.parse().
7. If Temporal is supported, change the PlainDate and regional time-zone identifier.

## What this example does not cover

Time-zone databases and local display conventions can change. The example uses specific 2026 dates and named zones to explain the model. It does not implement a calendar scheduler, resolve ambiguous local appointment times, or provide a substitute for checking the runtime's time-zone data.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [75 - Math, Number, and numeric utilities](../lessons/075-math-number-and-numeric-utilities.md) | [Open lesson](../lessons/076-dates-time-zones-and-temporal.md) | [Open Q&A](../qnas/076-dates-time-zones-and-temporal.md) | [77 - Intl and locale-aware formatting](../lessons/077-intl-and-locale-aware-formatting.md) |

