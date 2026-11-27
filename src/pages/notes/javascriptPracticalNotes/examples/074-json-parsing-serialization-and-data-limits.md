# 74 - JSON parsing, serialization, and data limits example

This complete example imports a small task list from JSON text, validates it, converts known date fields, discards unrecognized fields, and prints a summary. It also demonstrates serialization, malformed input handling, and the fact that a JSON round trip turns a Date back into a string.

## Goal

Practice the full data boundary:

1. Check a text-size limit.
2. Parse JSON and handle syntax errors.
3. Validate the parsed shape and each required field.
4. Copy only fields the application understands.
5. Serialize an export with a deliberate replacer.
6. Inspect what changes when the export is parsed again.

## Complete example

Copy this into a file named **74-json-data-boundary.mjs** and run it with a modern Node.js runtime.

~~~js
const MAX_JSON_CODE_UNITS = 4000;
const MAX_TASKS = 20;

const source = '[{"id":"task-001","title":" Review JSON ","minutes":20,"done":true,"createdAt":"2026-02-01T09:00:00.000Z","unusedField":"This field is not copied"},{"id":"task-002","title":"Validate parsed data","minutes":35,"done":false,"createdAt":"2026-02-02T09:00:00.000Z"},{"id":"9007199254740993","title":"Preserve exact ID digits","minutes":20,"done":false,"createdAt":"2026-02-03T09:00:00.000Z"}]';

function isRecord(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value);
}

function parseTasks(text) {
  if (typeof text !== 'string') {
    throw new TypeError('JSON input must be a string');
  }

  if (text.length > MAX_JSON_CODE_UNITS) {
    throw new RangeError('JSON input exceeds the example size limit');
  }

  const parsed = JSON.parse(text, (key, value) => {
    if (key === 'createdAt' && typeof value === 'string') {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return date;
      }
    }

    return value;
  });

  if (!Array.isArray(parsed)) {
    throw new TypeError('The JSON root must be an array');
  }

  if (parsed.length > MAX_TASKS) {
    throw new RangeError('The task list exceeds the example item limit');
  }

  return parsed.map((item, index) => {
    if (!isRecord(item)) {
      throw new TypeError('Task at index ' + index + ' must be an object');
    }

    if (typeof item.id !== 'string' || item.id.length === 0) {
      throw new TypeError('Task at index ' + index + ' needs a string ID');
    }

    if (typeof item.title !== 'string' || item.title.trim().length === 0) {
      throw new TypeError('Task at index ' + index + ' needs a non-empty title');
    }

    if (
      typeof item.minutes !== 'number'
      || !Number.isFinite(item.minutes)
      || item.minutes < 0
    ) {
      throw new TypeError('Task at index ' + index + ' needs valid minutes');
    }

    if (typeof item.done !== 'boolean') {
      throw new TypeError('Task at index ' + index + ' needs a boolean done value');
    }

    if (!(item.createdAt instanceof Date)) {
      throw new TypeError('Task at index ' + index + ' needs a valid date');
    }

    return {
      id: item.id,
      title: item.title.trim(),
      minutes: item.minutes,
      done: item.done,
      createdAt: item.createdAt
    };
  });
}

function summarize(tasks) {
  const completedCount = tasks.filter(task => task.done).length;
  const plannedMinutes = tasks.reduce(
    (total, task) => total + task.minutes,
    0
  );

  return { completedCount, plannedMinutes };
}

function printReport(tasks) {
  const summary = summarize(tasks);
  const openTasks = tasks.filter(task => !task.done);

  console.log('Imported tasks: ' + tasks.length);
  console.log('Completed tasks: ' + summary.completedCount);
  console.log('Planned minutes: ' + summary.plannedMinutes);
  console.log('Open tasks:');

  for (const task of openTasks) {
    const day = task.createdAt.toISOString().slice(0, 10);
    console.log(
      '- ' + task.title + ' (' + task.minutes + ' min, ' + day + ')'
    );
  }
}

function exportTasks(tasks) {
  return JSON.stringify(
    { tasks, debugOnly: 'This field is removed from the export' },
    (key, value) => key === 'debugOnly' ? undefined : value,
    2
  );
}

function checkMalformedInput() {
  try {
    parseTasks('{"title":');
    return false;
  } catch (error) {
    return error instanceof SyntaxError;
  }
}

function main() {
  const tasks = parseTasks(source);
  printReport(tasks);

  const exportedText = exportTasks(tasks);
  const parsedAgain = JSON.parse(exportedText);

  console.log(
    'Internal field exported: ' + Object.hasOwn(parsedAgain, 'debugOnly')
  );
  console.log(
    'Date after JSON round trip: ' + typeof parsedAgain.tasks[0].createdAt
  );
  console.log('Malformed JSON handled: ' + checkMalformedInput());
}

try {
  main();
} catch (error) {
  console.error('Could not import task data:', error.message);
  process.exitCode = 1;
}
~~~

## Expected output

~~~text
Imported tasks: 3
Completed tasks: 1
Planned minutes: 75
Open tasks:
- Validate parsed data (35 min, 2026-02-02)
- Preserve exact ID digits (20 min, 2026-02-03)
Internal field exported: false
Date after JSON round trip: string
Malformed JSON handled: true
~~~

## Walkthrough

### The size check runs before parsing

The example measures the input with JavaScript string length. That value counts UTF-16 code units, not encoded bytes. A real application should choose a limit appropriate to its transport or storage boundary and document its unit.

The task count is limited after parsing. This is a separate limit from the text-size limit.

### The reviver converts a known date field

The reviver checks for a property named **createdAt** containing a string. It converts valid date strings to Date objects and returns all other values unchanged. The following validator requires each task date to be a valid Date.

If an input date is invalid, the reviver leaves it as a string and validation rejects the record. A reviver transforms values; it does not replace structural validation.

### Validation and projection are separate

The validator checks the root array, record type, identifier, title, minutes, completion state, and date. It then constructs a new object with only those known fields. The input's **unusedField** is not copied into the application model.

The long identifier is kept as a string, so its digits are not rounded by conversion to Number.

### Serialization changes the representation

JSON.stringify() calls the Date's **toJSON()** method, so the exported date is an ISO string. The replacer is called after that conversion and omits **debugOnly**. Parsing the export again produces a string for the date unless another reviver converts it.

The property check is a demonstration of the replacer, not a substitute for reviewing sensitive data before export.

### Errors remain visible

Malformed JSON throws a SyntaxError. The example catches that expected failure in **checkMalformedInput()** and reports whether the error was recognized. Other import failures reach the top-level catch and produce a useful message and non-zero process exit code.

## Try these changes

1. Add a trailing comma to the source and observe the SyntaxError.
2. Change **minutes** from a number to a string and observe validation reject it.
3. Set **done** to null and confirm the required boolean check rejects it.
4. Add more than twenty task records and observe the item limit.
5. Add an invalid date string and see validation reject the task.
6. Add a field such as **privateNote** to the source. Confirm it is not copied into the returned task object.
7. Remove the replacer from **exportTasks()** and compare the exported **debugOnly** field.
8. Change the large string identifier into a JSON number. Observe why exact large integer digits should not be sent as a JavaScript Number.

## What this example does not do

The task data is embedded in the program rather than read from a file or network. The size and item limits are illustrative values, not universal recommendations. A real application should choose limits for its own data, validate its own schema, and decide how to handle unknown fields.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [73 - RegExp groups, flags, and string methods](../lessons/073-regexp-groups-flags-and-string-methods.md) | [Open lesson](../lessons/074-json-parsing-serialization-and-data-limits.md) | [Open Q&A](../qnas/074-json-parsing-serialization-and-data-limits.md) | [75 - Math, number, and numeric utilities](../lessons/075-math-number-and-numeric-utilities.md) |

