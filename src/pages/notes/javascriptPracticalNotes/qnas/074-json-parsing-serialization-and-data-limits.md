# 74 - JSON parsing, serialization, and data limits Q&A

These questions review JSON syntax, JavaScript parsing and serialization, validation, precision, and safe handling. Every answer follows its question.

## JSON fundamentals

### 1. What is JSON?

**Answer:** JSON is a text format for representing data using objects, arrays, strings, numbers, booleans, and null.

**Explanation:** JSON is a data interchange format. It is not JavaScript source code and does not support JavaScript expressions or statements.

### 2. Which is valid JSON?

A. {name: 'Mina'}  
B. {"name": "Mina"}  
C. {"name": "Mina",}

**Answer:** B, {"name": "Mina"}.

**Explanation:** JSON object keys and string values require double quotes. Unquoted keys, single-quoted strings, and trailing commas are invalid.

### 3. Which item is not a JSON value type?

A. Array  
B. Boolean  
C. Function  
D. Null

**Answer:** C, function.

**Explanation:** JSON supports arrays, objects, strings, numbers, booleans, and null. Functions are JavaScript values but cannot be represented in JSON.

### 4. Can a JSON text describe a top-level number or string?

**Answer:** Yes.

**Explanation:** A JSON text can represent any JSON value, including a number, string, boolean, or null. It does not have to be an object or array.

### 5. What does JSON.parse() do?

**Answer:** It parses valid JSON text and returns the JavaScript value described by that text.

**Explanation:** Objects become JavaScript objects, arrays become arrays, and primitive values remain primitive values.

### 6. What happens when JSON.parse() receives malformed JSON?

**Answer:** It throws a SyntaxError.

**Explanation:** Callers should catch malformed input at a boundary where they can show an error, recover safely, or report the failure.

### 7. Does successful parsing prove that the data has the shape an application expects?

**Answer:** No.

**Explanation:** Parsing validates JSON syntax only. The application must separately check the root type, required fields, types, allowed values, and constraints.

### 8. Why should eval() not be used to parse JSON?

**Answer:** eval() evaluates input as JavaScript code, while JSON.parse() accepts JSON syntax without evaluating it as a program.

**Explanation:** Input data should not be treated as executable code. Use the parser designed for JSON.

### 9. What does JSON.parse('null') return?

**Answer:** The JavaScript value null.

**Explanation:** The parsed root may be null or another primitive. Check the returned value before reading object properties.

### 10. Is an empty string valid JSON text?

**Answer:** No. JSON.parse('') throws a SyntaxError.

**Explanation:** The input must contain a complete JSON value. Whitespace alone is also not a value.

## Serialization behavior

### 11. What does JSON.stringify() do?

**Answer:** It converts a JavaScript value that can be represented into JSON text.

**Explanation:** Serialization has rules for unsupported values and can throw for values such as BigInt and circular references.

### 12. How can JSON.stringify() produce readable indentation?

**Answer:** Pass a space count or string as the third argument.

**Explanation:** For example, JSON.stringify(value, null, 2) indents nested values by two spaces. The indentation argument is capped at ten characters.

### 13. What does a replacer function do during serialization?

**Answer:** It can transform or omit each value visited during stringification.

**Explanation:** Returning undefined omits an object property or produces null for an array position. Use a replacer only for an intentional and documented output shape.

### 14. What does an array replacer do?

**Answer:** It acts as a list of property names to include when serializing objects.

**Explanation:** It is useful for selecting known properties. It does not make arbitrary data safe to expose, so review the resulting output.

### 15. How does a Date usually serialize with JSON.stringify()?

**Answer:** It becomes a string through its toJSON() method.

**Explanation:** JSON has no date type. Parsing that string returns a string unless the application explicitly converts it to a Date.

### 16. What usually happens to a Map or Set when stringified without a custom conversion?

**Answer:** It commonly becomes an empty object.

**Explanation:** Map and Set entries are not ordinary enumerable own properties. Convert their contents into an agreed array or object shape before serialization.

### 17. What happens to an undefined object property during JSON.stringify()?

**Answer:** The property is omitted.

**Explanation:** JSON cannot represent undefined as an object property value.

### 18. What happens to undefined in an array during JSON.stringify()?

**Answer:** That array position becomes null.

**Explanation:** Array positions are preserved, so an unsupported array value is represented as null rather than removed.

### 19. What happens to NaN and Infinity during JSON.stringify()?

**Answer:** They are serialized as null.

**Explanation:** JSON number syntax has no NaN or Infinity values. Validate or encode special numeric meanings explicitly if they matter.

### 20. What can JSON.stringify(undefined) return?

**Answer:** It returns undefined, not a JSON string.

**Explanation:** A caller should not assume every call to JSON.stringify() returns a string. Functions and symbols at the top level also produce undefined.

## Revivers, precision, and copies

### 21. What is a reviver?

**Answer:** A function passed to JSON.parse() that can transform or filter parsed values.

**Explanation:** A reviver runs after parsing and can convert known fields to application-specific values.

### 22. In what order are values visited by a reviver?

**Answer:** Nested property values are visited before their containing objects, and the root is visited last.

**Explanation:** This bottom-up order allows a reviver to transform children before processing their parent.

### 23. What happens if a reviver returns undefined for a property?

**Answer:** The property is deleted from its containing object or array.

**Explanation:** Return the original value for every property that should remain unchanged.

### 24. What key is supplied to the reviver for the root value?

**Answer:** An empty string.

**Explanation:** The root is processed like a value associated with an empty key, so a reviver should account for the root if its logic depends on keys.

### 25. Why can a large integer lose precision when JSON is parsed in JavaScript?

**Answer:** JSON numbers are converted to JavaScript Number values, which cannot represent every integer exactly beyond the safe integer range.

**Explanation:** The digits may already be rounded by the time a reviver receives the parsed number.

### 26. How can an application preserve the exact digits of a very large integer across JSON?

**Answer:** Encode it as a string and convert it deliberately on the receiving side.

**Explanation:** A string preserves the digits. Convert to BigInt or another suitable integer type when needed, without passing through Number.

### 27. Does JSON.stringify() serialize BigInt by default?

**Answer:** No. It throws a TypeError when it encounters a BigInt.

**Explanation:** Define an explicit representation, such as a decimal string, and make both sender and receiver agree on how it is decoded.

### 28. What happens when JSON.stringify() encounters a circular reference?

**Answer:** It throws a TypeError.

**Explanation:** JSON has no reference or cycle notation. Remove the cycle or serialize an explicit representation of the relationships.

### 29. Is JSON.parse(JSON.stringify(value)) a universal deep-copy method?

**Answer:** No.

**Explanation:** It can omit or change unsupported values, convert dates to strings, and fail for BigInt or circular references. Use it only when the data is intentionally limited to JSON-compatible values.

### 30. Why should large integer identifiers often be represented as strings in JSON?

**Answer:** A string preserves every digit when JavaScript's Number type cannot represent the integer exactly.

**Explanation:** Converting an imprecise Number to a string does not restore digits that were already lost.

## Validation, size, and safe use

### 31. What should code do after parsing an object from an untrusted source?

**Answer:** Validate its shape and values, then copy the expected fields into the application's own data model.

**Explanation:** Valid JSON can still contain missing fields, unexpected types, out-of-range values, or extra properties.

### 32. Why should a parser not blindly merge an untrusted object into application configuration?

**Answer:** Unexpected properties can overwrite settings or interact unsafely with prototype-sensitive objects.

**Explanation:** Validate an allowlist of expected fields and construct the destination deliberately.

### 33. Does JSON.parse() execute strings inside the JSON as JavaScript code?

**Answer:** No.

**Explanation:** JSON.parse() creates data values. The program may still misuse those values later, so validate and handle them safely.

### 34. Why set a size limit before parsing untrusted JSON text?

**Answer:** Very large input can consume substantial memory and time, and parsing is synchronous.

**Explanation:** Define an application-specific limit and be clear whether it measures encoded bytes or JavaScript string code units.

### 35. What should a schema check verify?

**Answer:** The root type, required fields, field types, allowed values, and relevant size or range limits.

**Explanation:** Checking only that a value is an object is not enough to establish that it is a valid application record.

### 36. What is the difference between a parse error and a validation error?

**Answer:** A parse error means the text is not valid JSON. A validation error means valid JSON does not meet the application's requirements.

**Explanation:** Keeping these failures distinct makes error messages and recovery more useful.

### 37. A JSON payload has a field named date with a date-looking string. What does JSON.parse() return for that field?

**Answer:** A string.

**Explanation:** JSON has no date value type. Convert the string to a Date only after checking its format and meaning.

### 38. Why should code return unchanged values from a reviver when it only wants to transform one field?

**Answer:** A reviver that falls through without returning a value returns undefined, which deletes that value.

**Explanation:** Explicitly return value for unrelated keys so they remain in the parsed result.

### 39. Which statement about a successful JSON round trip is correct?

A. It preserves functions and prototypes.  
B. It preserves every JavaScript value exactly.  
C. It preserves only the information representable by the chosen JSON shape.  
D. It always handles circular references.

**Answer:** C.

**Explanation:** JSON is a constrained data format. JavaScript-specific values and object behavior may be omitted, transformed, or rejected.

### 40. What does this code print?

~~~js
const source = '{"items":[1,2],"active":true}';
const value = JSON.parse(source);
const output = JSON.stringify(value, null, 2);

console.log(output);
~~~

**Answer:**

~~~json
{
  "items": [
    1,
    2
  ],
  "active": true
}
~~~

**Explanation:** JSON.parse() creates an object with an array and boolean. JSON.stringify() converts it back to JSON text and the third argument adds two-space indentation.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [73 - RegExp groups, flags, and string methods](../lessons/073-regexp-groups-flags-and-string-methods.md) | [Lesson](../lessons/074-json-parsing-serialization-and-data-limits.md) · [Example](../examples/074-json-parsing-serialization-and-data-limits.md) | [75 - Math, number, and numeric utilities](../lessons/075-math-number-and-numeric-utilities.md) |

