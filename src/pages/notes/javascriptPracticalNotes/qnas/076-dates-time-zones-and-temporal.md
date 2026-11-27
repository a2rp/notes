# 76 - Dates, time zones, and Temporal Q&A

These questions review JavaScript Date, instants, calendar dates, time zones, daylight-saving changes, formatting, and Temporal. Each answer follows its question.

## Date and time concepts

### 1. What is the difference between an instant and a calendar date?

**Answer:** An instant is one exact point on a global timeline. A calendar date identifies a day without necessarily identifying a time or time zone.

**Explanation:** A completed payment needs an instant. A birthday usually needs a date only.

### 2. What does a JavaScript Date store?

**Answer:** A timestamp measured in milliseconds relative to the Unix epoch.

**Explanation:** It does not retain the time zone or original text used to construct it.

### 3. Does a Date remember the time zone from its input string?

**Answer:** No.

**Explanation:** A Date represents an instant. Local Date methods interpret it in the host's local time zone, while UTC methods interpret it in UTC.

### 4. What does the Z suffix mean in an ISO timestamp?

**Answer:** It indicates that the time is expressed in UTC.

**Explanation:** An explicit Z or numeric offset makes the timestamp's relationship to UTC clear.

### 5. Do these strings identify the same instant?

~~~text
2026-04-01T16:00:00Z
2026-04-01T12:00:00-04:00
~~~

**Answer:** Yes.

**Explanation:** Noon at offset -04:00 is 16:00 UTC. Their parsed timestamps represent the same moment.

### 6. How is a date-only ISO string interpreted by standardized Date parsing?

**Answer:** As UTC midnight on that calendar date.

**Explanation:** A date-time string without an offset is interpreted in the host's local time zone. These two formats can therefore have different behaviors.

### 7. Why should code avoid arbitrary date string formats?

**Answer:** Their parsing can vary across implementations.

**Explanation:** Prefer standardized ISO forms with explicit offsets for instants, and validate the expected input format.

### 8. What does getMonth() return for April?

**Answer:** 3.

**Explanation:** Date month getters use zero-based month indexes, so January is 0 and December is 11.

### 9. What is the difference between getHours() and getUTCHours()?

**Answer:** getHours() reads the host's local clock hour. getUTCHours() reads the UTC hour.

**Explanation:** The local result depends on the runtime's configured time zone. Use UTC methods when UTC fields are intended.

### 10. How can code detect an invalid Date?

**Answer:** Check Number.isNaN(date.getTime()).

**Explanation:** Invalid Date is still an object, but its timestamp is NaN. Calling toISOString() on it throws a RangeError.

## Time zones and calculations

### 11. What does a numeric offset such as -04:00 describe?

**Answer:** The offset from UTC at a particular moment.

**Explanation:** It does not contain the future and historical rules associated with a geographic region.

### 12. Why can a named time-zone identifier be more useful than a fixed offset?

**Answer:** A named zone represents regional rules that can change with date, daylight-saving transitions, or legal decisions.

**Explanation:** A fixed offset alone cannot determine the correct regional offset for another date.

### 13. What is a daylight-saving gap?

**Answer:** A range of local clock times that does not occur when clocks move forward.

**Explanation:** Scheduling a local event inside that gap requires an explicit policy, such as rejecting it or shifting it.

### 14. What is a daylight-saving overlap?

**Answer:** A range of local clock times that occurs twice when clocks move backward.

**Explanation:** A local date-time alone is ambiguous during the repeated interval. A region and disambiguation policy are needed to select an instant.

### 15. Is adding 86,400,000 milliseconds always the same as moving to the same local time tomorrow?

**Answer:** No.

**Explanation:** It adds exactly 24 elapsed hours. A local calendar day can have a different elapsed length around a time-zone transition.

### 16. What should be stored for a completed event?

**Answer:** Its exact instant, commonly as an ISO UTC timestamp.

**Explanation:** The instant can later be displayed in the viewer's or event's time zone.

### 17. What should be stored for a birthday that has no time?

**Answer:** A date-only value, such as a PlainDate or a validated YYYY-MM-DD string.

**Explanation:** Turning a birthday into midnight UTC can cause it to display as the previous calendar day in some time zones.

### 18. What information is needed for a future meeting at 9:00 AM in a named region?

**Answer:** The intended local date and time plus the region's time-zone identifier.

**Explanation:** The region identifier supplies date-specific rules needed to map local time to an instant.

### 19. What should Intl.DateTimeFormat receive when output must use a specific zone?

**Answer:** An explicit timeZone option.

**Explanation:** Without it, formatting uses the runtime's default time zone and may differ across devices or servers.

### 20. What is formatToParts() useful for?

**Answer:** Getting localized date or time fields as separate parts.

**Explanation:** It lets a UI rearrange or style fields while preserving locale-specific values and ordering.

## Temporal types

### 21. What does Temporal.Instant represent?

**Answer:** An exact point on the timeline without a time zone.

**Explanation:** Add a time zone when local calendar or clock fields are needed.

### 22. What does Temporal.PlainDate represent?

**Answer:** A calendar date without a time or time zone.

**Explanation:** It is suitable for birthdays, due dates, and other date-only values.

### 23. What does Temporal.PlainTime represent?

**Answer:** A time of day without a date or time zone.

**Explanation:** It is useful for values such as store opening time when no particular day or region is attached to the value.

### 24. What does Temporal.PlainDateTime represent?

**Answer:** A local calendar date and clock time without a time zone.

**Explanation:** It does not identify an exact instant until a time zone is applied.

### 25. What does Temporal.ZonedDateTime represent?

**Answer:** An exact instant viewed using a particular time zone and calendar.

**Explanation:** It keeps the regional time-zone information needed for date-aware operations across transitions.

### 26. What does Temporal.Duration represent?

**Answer:** A length or calendar-based amount of time.

**Explanation:** A duration can describe units such as days, hours, minutes, or nanoseconds. Its meaning depends on the operation and starting value.

### 27. Why should Temporal availability be checked before using it?

**Answer:** Runtime and browser support varies.

**Explanation:** Check the project's supported environments and feature-detect the API or use an approved polyfill where needed.

### 28. Is Temporal a constructor that should be called with new?

**Answer:** No. Temporal is a namespace object with types and static methods.

**Explanation:** Create values with APIs such as Temporal.PlainDate.from() or Temporal.Instant.from().

### 29. What does this produce?

~~~js
Temporal.PlainDate.from('2026-04-01').toString();
~~~

**Answer:** The string '2026-04-01'.

**Explanation:** PlainDate represents a date without adding a time zone or an instant.

### 30. Why is Temporal.ZonedDateTime useful for regional calendar arithmetic?

**Answer:** It keeps the time zone attached so calculations can apply the zone's rules.

**Explanation:** Moving by one calendar day may not equal adding exactly 24 elapsed hours across a daylight-saving change.

## Storage, formatting, and errors

### 31. What does JSON.stringify() normally produce for a Date?

**Answer:** A UTC ISO timestamp string through the Date's toJSON() method.

**Explanation:** JSON has no Date type. Parsing the serialized text gives a string unless the application converts it explicitly.

### 32. Does JSON.parse() automatically restore a Date from an ISO string?

**Answer:** No.

**Explanation:** It returns a string. Validate the expected format and convert it deliberately.

### 33. What does Date.now() return?

**Answer:** The current timestamp in milliseconds since the Unix epoch.

**Explanation:** It is useful for measuring approximate elapsed time, but it is a timestamp, not a formatted date.

### 34. Why should a server avoid using its local time zone for a user's future appointment?

**Answer:** The server's configured zone may not be the user's intended region.

**Explanation:** Keep the user's regional zone explicit and apply that zone's rules when interpreting the appointment.

### 35. Which representation should be used for a timer that measures elapsed duration?

A. A date-only string  
B. A timestamp difference or duration value with a defined unit  
C. A birthday  
D. A local clock string with no date

**Answer:** B.

**Explanation:** A timer measures elapsed time. Define the unit clearly and use a monotonic clock for precise performance timing when available in the target runtime.

### 36. What should an application validate when accepting a date string?

**Answer:** Its required format and whether it represents a valid value in the intended date model.

**Explanation:** A syntactically accepted string can still be the wrong date type, an invalid date, or a local time without the zone needed by the application.

### 37. How can a date be formatted for a predictable region?

**Answer:** Use Intl.DateTimeFormat with the intended locale and an explicit timeZone.

**Explanation:** Locale controls presentation conventions, while the timeZone controls how the instant maps to local date and clock fields.

### 38. What can happen if a birthday is stored as midnight UTC and displayed in a western time zone?

**Answer:** It can appear on the previous local calendar date.

**Explanation:** The instant is shifted into the display zone. A birthday normally should be modeled as a date-only value instead.

### 39. When is a local date-time insufficient to identify one instant?

**Answer:** When no time zone is specified, or when a daylight-saving overlap makes the local time occur twice.

**Explanation:** The local fields alone do not supply the region rules or ambiguity choice needed to select an exact moment.

### 40. Which statement best summarizes safe date modeling?

A. Every date should be stored as a local Date object.  
B. Add 24 hours whenever the next calendar day is needed.  
C. Choose the type based on whether the value is a date, local time, exact instant, zoned appointment, or duration.  
D. Use the server's local time zone for every conversion.

**Answer:** C.

**Explanation:** Correct date handling begins by identifying what the value means. The chosen representation and time-zone rules should match that meaning.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [75 - Math, Number, and numeric utilities](../lessons/075-math-number-and-numeric-utilities.md) | [Lesson](../lessons/076-dates-time-zones-and-temporal.md) · [Example](../examples/076-dates-time-zones-and-temporal.md) | [77 - Intl and locale-aware formatting](../lessons/077-intl-and-locale-aware-formatting.md) |

