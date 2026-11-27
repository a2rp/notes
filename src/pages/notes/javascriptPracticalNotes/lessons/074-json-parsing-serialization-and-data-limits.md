# 74 - JSON parsing, serialization, and data limits

JSON is a text format for exchanging data. JavaScript provides **JSON.parse()** to turn JSON text into JavaScript values and **JSON.stringify()** to turn supported JavaScript values into JSON text.

Parsing checks JSON syntax. It does not prove that the result has the shape, types, size, or meaning your program expects. Treat parsing and validation as separate steps.

## Learning goals

- Recognize the values and syntax JSON supports.
- Parse JSON and handle malformed input.
- Serialize JavaScript data with **JSON.stringify()**.
- Explain how unsupported values, numbers, and object types are handled.
- Use revivers and replacers for deliberate transformations.
- Validate parsed data and set sensible size limits.
- Avoid unsafe evaluation and unsafe merging of untrusted data.

## JSON is a data format, not JavaScript source

JSON supports objects, arrays, strings, numbers, booleans, and null. Object keys and string values use double quotes. JSON does not support comments, trailing commas, single-quoted strings, **undefined**, functions, symbols, or BigInt values.

~~~json
{
  "title": "Study notes",
  "published": false,
  "chapters": 3,
  "tags": ["javascript", "json"],
  "metadata": null
}
~~~

A JSON text can describe a top-level object, array, string, number, boolean, or null. It does not have to start with an object.

~~~js
JSON.parse('42');
JSON.parse('"ready"');
JSON.parse('false');
JSON.parse('null');
~~~

JSON resembles JavaScript object literal syntax, but the formats are not interchangeable. For example, JSON requires quoted property names and does not permit comments.

## Parse text with JSON.parse()

**JSON.parse(text)** returns the JavaScript value described by valid JSON text. Invalid JSON causes a **SyntaxError**.

~~~js
const source = '{"title":"Study notes","complete":true}';
const record = JSON.parse(source);

console.log(record.title);
console.log(record.complete);
~~~

~~~text
Study notes
true
~~~

Parsing an object creates an ordinary JavaScript object. Parsing an array creates an array. Primitive JSON values remain primitive values.

Never use **eval()** to parse JSON. JSON.parse() follows the JSON grammar and does not execute the input as JavaScript code.

### Handle malformed input

If text comes from a file, request, form, or storage, parsing can fail. Catch the syntax error at a boundary where the application can show a useful message or recover.

~~~js
function parseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { ok: false, message: 'The saved data is not valid JSON.' };
    }

    throw error;
  }
}

const result = parseJson('{"title":');

if (result.ok) {
  console.log(result.value);
} else {
  console.error(result.message);
}
~~~

Do not catch every error and silently replace the input with an empty object. That can hide damaged data and make the program appear to succeed.

## Parsing is not validation

This is valid JSON:

~~~json
{
  "title": 17,
  "minutes": "many",
  "done": "yes"
}
~~~

But it may not match the data your program needs. Validate the root type, required properties, allowed values, and ranges before using the result.

~~~js
function isStudyTask(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && typeof value.title === 'string'
    && value.title.trim().length > 0
    && typeof value.minutes === 'number'
    && Number.isFinite(value.minutes)
    && value.minutes >= 0
    && typeof value.done === 'boolean';
}

const parsed = JSON.parse(
  '{"title":"Review JSON","minutes":20,"done":false}'
);

if (!isStudyTask(parsed)) {
  throw new TypeError('The JSON value is not a valid study task');
}
~~~

For a collection, check the array before validating each item. For production data, define an explicit schema or equivalent validation rules and decide how unknown properties should be handled.

~~~js
function isStudyTaskList(value) {
  return Array.isArray(value) && value.every(isStudyTask);
}
~~~

A parsed value can be **null**, a primitive, or an array. Check its type before reading object properties.

## Serialize with JSON.stringify()

**JSON.stringify(value)** returns a JSON string when the value can be represented. A third argument can add indentation for readable output.

~~~js
const task = {
  title: 'Review JSON',
  minutes: 20,
  done: false
};

const compact = JSON.stringify(task);
const readable = JSON.stringify(task, null, 2);

console.log(compact);
console.log(readable);
~~~

The optional second argument is a replacer. It can be a function that transforms or omits values, or an array of property names to include. The third argument controls indentation. The indentation is capped at ten spaces or ten characters.

~~~js
const publicProfile = JSON.stringify(
  { name: 'Mina', email: 'mina@example.test', token: 'private-value' },
  (key, value) => key === 'token' ? undefined : value,
  2
);
~~~

A replacer is a serialization rule, not a complete privacy system. Review the resulting data before sending or storing it, and do not put secrets into data that will be exposed.

## Values that do not round-trip directly

JSON has fewer value types than JavaScript. Stringification handles unsupported or special values differently depending on where they appear.

| JavaScript value | In an object property | In an array item | As the top-level value |
| --- | --- | --- | --- |
| undefined | Property is omitted | Becomes null | stringify returns undefined |
| Function | Property is omitted | Becomes null | stringify returns undefined |
| Symbol value | Property is omitted | Becomes null | stringify returns undefined |
| NaN or Infinity | Becomes null | Becomes null | Becomes the text null |
| BigInt | Throws TypeError | Throws TypeError | Throws TypeError |
| Circular reference | Throws TypeError | Throws TypeError | Throws TypeError |

~~~js
const data = {
  present: 1,
  missing: undefined,
  invalidNumber: NaN,
  values: [undefined, Infinity]
};

console.log(JSON.stringify(data));
~~~

~~~text
{"present":1,"invalidNumber":null,"values":[null,null]}
~~~

Object properties with **undefined**, functions, or symbol values are omitted. Matching array slots become null so the array positions remain. Do not assume that parsing a serialized value recreates the original object exactly.

### Dates, Map, Set, and custom values

A **Date** provides a **toJSON()** method, so it normally becomes a string. **Map** and **Set** do not serialize their entries by default and commonly become empty objects. Convert them into an agreed JSON shape explicitly.

~~~js
const data = {
  createdAt: new Date('2026-01-02T03:04:05.000Z'),
  labels: new Set(['beginner', 'javascript']),
  scores: new Map([['quiz', 8]])
};

const json = JSON.stringify({
  createdAt: data.createdAt,
  labels: [...data.labels],
  scores: Object.fromEntries(data.scores)
});
~~~

~~~json
{"createdAt":"2026-01-02T03:04:05.000Z","labels":["beginner","javascript"],"scores":{"quiz":8}}
~~~

On parsing, a date string remains a string unless the application deliberately converts it back to a Date. Choose and document a stable representation for custom values.

### BigInt and precise numbers

JSON has a number syntax, but JavaScript parses JSON numbers as **Number** values. Integers beyond JavaScript's safe integer range may lose precision. If exact digits matter, exchange the value as a string and convert it deliberately.

~~~js
const accountId = 9007199254740993n;
const json = JSON.stringify({ accountId: accountId.toString() });
const restored = BigInt(JSON.parse(json).accountId);
~~~

~~~text
The JSON contains the account ID as a string. Converting it back with BigInt preserves its integer value.
~~~

JSON.stringify() throws when it encounters a BigInt by default. A replacer can encode BigInt values, but both sides must agree on the representation and decoding rules. Avoid converting an arbitrarily large BigInt to Number because that can lose precision.

## Replacer and reviver

A **replacer** runs during stringification and can transform or omit values. A **reviver** runs during parsing and can transform values after they have been parsed.

~~~js
const source = '{"title":"Review JSON","minutes":20}';

const task = JSON.parse(source, (key, value) => {
  if (key === 'minutes') {
    return value * 60;
  }

  return value;
});

console.log(task.minutes);
~~~

~~~text
1200
~~~

The reviver is called for nested values before their containing object, then for the root with an empty key. If it returns **undefined** for a property, that property is deleted. Return every value that should remain unchanged.

Revivers run after JSON numbers have already been converted to JavaScript Number values. If an integer's exact digits matter, encode it as a string before parsing. Some modern runtimes provide the original primitive source text to a reviver, but applications should rely on that only when their supported runtime guarantees it.

## JSON is not a general-purpose deep clone

This pattern is sometimes used for a quick copy:

~~~js
const copy = JSON.parse(JSON.stringify(value));
~~~

It only works for data that JSON can represent and changes or drops unsupported values. It converts dates to strings, omits some object properties, changes unsupported array items to null, loses prototypes, and throws for circular references and BigInt. Use a purpose-built copy strategy when those differences matter.

## Data limits and safe handling

Parsing and stringifying are synchronous operations. Very large input can consume substantial memory and block the thread that is processing it. Set application-specific limits before parsing data from untrusted or unreliable sources.

Useful boundaries include:

- Limit payload size before parsing. Define whether the limit is measured in encoded bytes or string code units.
- Limit arrays, strings, and nested structures according to the application's needs.
- Validate the parsed structure before using it.
- Reject unknown fields or copy only the fields the application expects.
- Handle malformed input without hiding the failure.
- Avoid repeatedly parsing or stringifying the same large value in a hot path.
- Avoid merging untrusted properties directly into configuration or prototype-sensitive objects.

JSON.parse() does not execute JSON text as code. However, parsed values can still contain unexpected types, large collections, or property names that become dangerous when later copied or merged unsafely. Parse, validate, and then construct the application's own data model.

## Common mistakes

- Using **eval()** instead of JSON.parse().
- Assuming valid JSON has the expected application schema.
- Assuming JSON supports comments, trailing commas, or single quotes.
- Assuming JSON.stringify() returns a string for every JavaScript value.
- Expecting undefined object properties to become null.
- Expecting Map, Set, functions, or symbols to preserve their contents.
- Assuming a date string automatically becomes a Date after parsing.
- Sending large integers as JSON numbers when exact digits are required.
- Treating a JSON round trip as a universal deep-copy method.
- Parsing unbounded input or blindly merging parsed objects into sensitive objects.

## Practice

1. Parse a JSON object and check every required property before using it.
2. Pass malformed text to a parsing function and return a useful error result.
3. Stringify an object containing undefined, a function, and NaN. Compare the output with those values inside an array.
4. Add a replacer that omits a property named **privateNote**.
5. Add a reviver that converts a known ISO date field into a Date, and return all unrelated values unchanged.
6. Serialize a BigInt identifier as a string and restore it without converting through Number.
7. Write down a maximum payload size for a small application and decide whether its unit is bytes or string code units.

## Key points

- JSON is a constrained text format for data, not executable JavaScript.
- JSON.parse() checks syntax. Application code must validate the resulting shape and values.
- JSON.stringify() omits or changes unsupported values and can throw.
- Replacer and reviver functions should encode explicit, documented transformations.
- JSON numbers may not preserve arbitrary integer precision in JavaScript.
- JSON parsing and serialization can use significant time and memory for large data.
- Limit untrusted input, validate it, and copy only expected fields into application objects.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [73 - RegExp groups, flags, and string methods](073-regexp-groups-flags-and-string-methods.md) | [Open Q&A](../qnas/074-json-parsing-serialization-and-data-limits.md) | [Open example](../examples/074-json-parsing-serialization-and-data-limits.md) | [75 - Math, number, and numeric utilities](075-math-number-and-numeric-utilities.md) |

