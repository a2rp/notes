# 14 - Values, types, and dynamic typing: example

This complete HTML page logs JavaScript values and their types. It demonstrates dynamic reassignment, the primitive and object categories, basic **typeof** results, and a simple input check.

## Goal

After running this example, you should be able to:

- See a binding refer to values of different types.
- Recognize JavaScript's primitive types and object values.
- Explain why arrays need **Array.isArray** for a specific check.
- See that functions are callable objects, although **typeof** reports **"function"**.
- Observe that operations can behave differently based on operand types.
- Validate a value before using it as a string.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript values and types practice</title>
</head>
<body>
  <main>
    <h1>JavaScript values and types</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      values, types, and dynamic reassignment.
    </p>
  </main>

  <script>
    // One binding can refer to different types of values over time.
    let currentValue = "Waiting";
    console.log("first value:", currentValue);
    console.log("first type:", typeof currentValue);

    currentValue = 42;
    console.log("second value:", currentValue);
    console.log("second type:", typeof currentValue);

    currentValue = { status: "complete" };
    console.log("third value property:", currentValue.status);
    console.log("third type:", typeof currentValue);

    // Examples of JavaScript's primitive types.
    const undefinedValue = undefined;
    const nullValue = null;
    const booleanValue = true;
    const numberValue = 3.5;
    const bigintValue = 9007199254740993n;
    const stringValue = "JavaScript";
    const symbolValue = Symbol("record");

    console.log("undefined type:", typeof undefinedValue);
    console.log("null type reported by typeof:", typeof nullValue);
    console.log("boolean type:", typeof booleanValue);
    console.log("number type:", typeof numberValue);
    console.log("bigint type:", typeof bigintValue);
    console.log("string type:", typeof stringValue);
    console.log("symbol type:", typeof symbolValue);

    // Arrays and ordinary objects both have the object type.
    const colors = ["blue", "green"];
    const profile = {
      name: "Asha",
      active: true
    };

    console.log("array typeof:", typeof colors);
    console.log("array check:", Array.isArray(colors));
    console.log("object typeof:", typeof profile);
    console.log("profile name:", profile.name);

    // Functions are callable objects, with a special typeof result.
    const greet = function (name) {
      return "Hello, " + name;
    };

    console.log("function typeof:", typeof greet);
    console.log("function result:", greet("Mina"));

    // These values have the same operator but different types.
    console.log("number addition:", 5 + 2);
    console.log("string concatenation:", "5" + 2);

    // Validate a value before using it as text.
    function printGreeting(name) {
      if (typeof name !== "string") {
        throw new TypeError("name must be a string");
      }

      return "Hello, " + name;
    }

    console.log("valid greeting:", printGreeting("Asha"));

    try {
      printGreeting(42);
    } catch (error) {
      console.log("invalid greeting input:", error.name);
    }

    // Number and BigInt need an explicit conversion before mixing.
    try {
      console.log(5n + 2);
    } catch (error) {
      console.log("mixed BigInt and Number:", error.name);
    }
  </script>
</body>
</html>
~~~

## Open the Console

1. Open **index.html** in a browser.
2. Open Developer Tools. In most desktop browsers, **F12** opens them.
3. Select the **Console** tab.
4. Compare the logs with the expected output below.

The expected errors are caught by the page so the remaining lines still run.

## Expected Console output

~~~text
first value: Waiting
first type: string
second value: 42
second type: number
third value property: complete
third type: object
undefined type: undefined
null type reported by typeof: object
boolean type: boolean
number type: number
bigint type: bigint
string type: string
symbol type: symbol
array typeof: object
array check: true
object typeof: object
profile name: Asha
function typeof: function
function result: Hello, Mina
number addition: 7
string concatenation: 52
valid greeting: Hello, Asha
invalid greeting input: TypeError
mixed BigInt and Number: TypeError
~~~

## Explanation

### One binding, different current types

**currentValue** starts as a string, then refers to a number, and finally refers to an object. The binding name remains the same. The value and its type change after each assignment.

The last log reads **currentValue.status** because the current value is an object with that property.

### Primitive value types

The examples show **undefined**, **null**, **boolean**, **number**, **bigint**, **string**, and **symbol** values. The **typeof** operator gives useful introductory results for most of them.

**typeof null** prints **"object"** because of a historical behavior. The value **null** is still its own primitive type. Later chapters cover this case and more reliable type checks.

### Arrays and objects

Both an array and an ordinary object produce **"object"** with **typeof**. **Array.isArray(colors)** returns **true**, which identifies the array specifically.

### Functions

The **greet** value can be called, so it is a function. Functions are callable objects, but **typeof** uses the special result **"function"**.

### Operations depend on value types

Adding two numbers produces **7**. Using a string with **+** produces **"52"** through concatenation. Detailed conversion rules are covered in a later chapter.

The attempt to mix **BigInt** and **Number** values throws a **TypeError**. Convert deliberately when combining numeric types, and consider precision before converting.

### Validate values at a boundary

**printGreeting** requires a string. It returns a greeting for **"Asha"** and throws a **TypeError** for the number **42**. The caller catches that error and logs its name.

This kind of check makes a function's expectation clear. More detailed type-checking patterns appear in later chapters.

## Try a small change

1. Assign a Boolean value to **currentValue** between its number and object assignments. Log its value and type.
2. Replace **colors** with a plain object. Compare **typeof** and **Array.isArray**.
3. Add another property to **profile** and log it.
4. Pass a number to **printGreeting** and observe the caught error.
5. Change **printGreeting** so it returns a message instead of throwing for an invalid value.
6. Compare **10 + 5** with **"10" + 5**.
7. Try **5n + 2** in a separate expression and compare it with **5n + 2n**.
8. Record the binding, current value, and type for each **currentValue** assignment.

## Key ideas shown

- Values have types, while a binding can refer to different values over time.
- JavaScript is dynamically typed.
- JavaScript has seven primitive types and the broad object type.
- Arrays are objects, and **Array.isArray** checks for arrays.
- Functions are callable objects, and **typeof** reports **"function"**.
- **typeof null** reports **"object"**, even though **null** is a separate primitive type.
- The same operator can behave differently depending on value types.
- Validate values when a function expects a particular type.
- Mixing BigInt and Number in arithmetic throws unless values are converted deliberately.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [13 - Strict mode](../lessons/013-strict-mode.md) | [Open lesson](../lessons/014-values-types-and-dynamic-typing.md) | [Open Q&A](../qnas/014-values-types-and-dynamic-typing.md) | [15 - Primitive values and object references](../lessons/015-primitive-values-and-object-references.md) |