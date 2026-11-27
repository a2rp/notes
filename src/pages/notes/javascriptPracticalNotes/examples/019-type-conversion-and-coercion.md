# 19 - Type conversion and coercion: example

This complete HTML page demonstrates explicit conversions and implicit coercion with numbers, strings, Booleans, arrays, BigInts, and objects. It also shows how to convert and validate text input. Every result is printed to the browser Console.

## Goal

After working through this example, you should be able to:

- Compare **Number**, **String**, **Boolean**, and **BigInt** conversions.
- Explain why **+** can concatenate while other arithmetic operators calculate.
- Compare **Number** with **parseInt** and **parseFloat**.
- Recognize errors caused by unsupported or mixed numeric conversions.
- See how an object can customize its primitive conversion.
- Convert external text and validate the result before using it.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript type conversion practice</title>
</head>
<body>
  <main>
    <h1>Type conversion and coercion</h1>
    <p>
      Open the browser developer tools and select the Console to compare
      explicit conversions, implicit coercion, and validated input.
    </p>
  </main>

  <script>
    // Explicit conversion to Number.
    console.log('Number("42"):', Number("42"));
    console.log('Number(" 42 "):', Number(" 42 "));
    console.log('Number("12px"):', Number("12px"));
    console.log('Number(""):', Number(""));
    console.log('Number("   "):', Number("   "));
    console.log("Number(true):", Number(true));
    console.log("Number(false):", Number(false));
    console.log("Number(null):", Number(null));
    console.log("Number(undefined):", Number(undefined));

    // Number converts arrays through their primitive string values.
    console.log("Number([]):", Number([]));
    console.log("Number([5]):", Number([5]));
    console.log("Number([1, 2]):", Number([1, 2]));

    // Number and prefix parsers have different purposes.
    console.log('Number("24px"):', Number("24px"));
    console.log(
      'Number.parseInt("24px", 10):',
      Number.parseInt("24px", 10)
    );
    console.log(
      'Number.parseFloat("3.5rem"):',
      Number.parseFloat("3.5rem")
    );

    // Explicit conversion to String and Boolean.
    console.log("String(null):", String(null));
    console.log("String([1, 2, 3]):", String([1, 2, 3]));
    console.log("String({}):", String({}));
    console.log(
      'String(Symbol("id")):',
      String(Symbol("id"))
    );
    console.log('Boolean("false"):', Boolean("false"));
    console.log("Boolean([]):", Boolean([]));

    // A template literal converts an inserted value to text.
    const score = 7;
    const scoreMessage = `Score: ${score}`;

    console.log("template literal:", scoreMessage);

    // Implicit coercion in operators.
    console.log('"5" + 2:', "5" + 2);
    console.log('5 + "2":', 5 + "2");
    console.log('"5" - 2:', "5" - 2);
    console.log('"4" * 2:', "4" * 2);
    console.log("true + 1:", true + 1);
    console.log("null + 1:", null + 1);
    console.log("undefined + 1:", undefined + 1);

    // Some conversions throw. Catch them so the remaining example runs.
    try {
      console.log("unary plus with BigInt:", +1n);
    } catch (error) {
      console.log("unary plus with BigInt:", error.name);
    }

    try {
      console.log("mixed BigInt and Number:", 1n + 2);
    } catch (error) {
      console.log("mixed BigInt and Number:", error.name);
    }

    try {
      console.log('BigInt from "4.2":', BigInt("4.2"));
    } catch (error) {
      console.log('BigInt from "4.2":', error.name);
    }

    try {
      console.log("BigInt from 4.2:", BigInt(4.2));
    } catch (error) {
      console.log("BigInt from 4.2:", error.name);
    }

    console.log('BigInt from "42":', BigInt("42"));
    console.log("Number from 42n:", Number(42n));

    // An object can provide different primitives for different operations.
    const measurement = {
      value: 10,

      valueOf() {
        return this.value;
      },

      toString() {
        return "ten";
      }
    };

    console.log("Number(measurement):", Number(measurement));
    console.log("String(measurement):", String(measurement));
    console.log("measurement + 1:", measurement + 1);

    // Symbol.toPrimitive can control conversion using the supplied hint.
    const token = {
      [Symbol.toPrimitive](hint) {
        if (hint === "string") {
          return "token";
        }

        return 5;
      }
    };

    console.log("String(token):", String(token));
    console.log("Number(token):", Number(token));
    console.log("token + 1:", token + 1);

    // Convert input text, then validate the converted values.
    function readFiniteNumber(text) {
      if (typeof text !== "string" || text.trim() === "") {
        return null;
      }

      const value = Number(text);

      if (!Number.isFinite(value)) {
        return null;
      }

      return value;
    }

    console.log('readFiniteNumber("24"):', readFiniteNumber("24"));
    console.log(
      'readFiniteNumber("24px"):',
      readFiniteNumber("24px")
    );
    console.log('readFiniteNumber(""):', readFiniteNumber(""));

    function parseQuantity(text) {
      if (typeof text !== "string" || text.trim() === "") {
        return null;
      }

      const quantity = Number(text);

      if (!Number.isSafeInteger(quantity) || quantity < 0) {
        return null;
      }

      return quantity;
    }

    console.log('parseQuantity("12"):', parseQuantity("12"));
    console.log('parseQuantity("0"):', parseQuantity("0"));
    console.log('parseQuantity("2.5"):', parseQuantity("2.5"));
    console.log('parseQuantity("-1"):', parseQuantity("-1"));
    console.log(
      'parseQuantity("12 items"):',
      parseQuantity("12 items")
    );
  </script>
</body>
</html>
~~~

## View the results

Open **index.html** in a browser, open the developer tools, and select the **Console**. The page itself does not need to display the JavaScript results.

The output is:

~~~text
Number("42"): 42
Number(" 42 "): 42
Number("12px"): NaN
Number(""): 0
Number("   "): 0
Number(true): 1
Number(false): 0
Number(null): 0
Number(undefined): NaN
Number([]): 0
Number([5]): 5
Number([1, 2]): NaN
Number("24px"): NaN
Number.parseInt("24px", 10): 24
Number.parseFloat("3.5rem"): 3.5
String(null): null
String([1, 2, 3]): 1,2,3
String({}): [object Object]
String(Symbol("id")): Symbol(id)
Boolean("false"): true
Boolean([]): true
template literal: Score: 7
"5" + 2: 52
5 + "2": 52
"5" - 2: 3
"4" * 2: 8
true + 1: 2
null + 1: 1
undefined + 1: NaN
unary plus with BigInt: TypeError
mixed BigInt and Number: TypeError
BigInt from "4.2": SyntaxError
BigInt from 4.2: RangeError
BigInt from "42": 42n
Number from 42n: 42
Number(measurement): 10
String(measurement): ten
measurement + 1: 11
String(token): token
Number(token): 5
token + 1: 6
readFiniteNumber("24"): 24
readFiniteNumber("24px"): null
readFiniteNumber(""): null
parseQuantity("12"): 12
parseQuantity("0"): 0
parseQuantity("2.5"): null
parseQuantity("-1"): null
parseQuantity("12 items"): null
~~~

## Understand the output

**Number** converts complete numeric strings and surrounding whitespace. Invalid numeric text produces **NaN**. Empty and whitespace-only strings produce zero, so the input helpers reject blank text before converting it.

The array results come from object-to-primitive conversion. An empty array becomes an empty string and then zero. A one-item array becomes that item's text. Multiple items produce a comma-separated string that is not one number.

**parseInt** and **parseFloat** accept a numeric prefix, while **Number** requires the full string to represent a number. Choose the parser that matches the input format you mean to accept.

**String** converts values to text. Array conversion joins items with commas, and an ordinary object commonly becomes **"[object Object]"**. The explicit **String** conversion also supports a Symbol value.

The template literal converts the score to text for display. In arithmetic, **+** concatenates when an operand converts to a string. Subtraction and multiplication convert numeric strings to numbers. Boolean and null values also convert to numbers in arithmetic, while undefined produces **NaN**.

The BigInt examples show errors for unary plus, mixed BigInt and Number arithmetic, a decimal BigInt string, and a non-integer Number. The **try...catch** blocks let the rest of the page continue after each error.

The conversion methods on **measurement** return different primitives for numeric and string conversion. The **token** object uses **Symbol.toPrimitive** to choose a primitive based on the conversion hint.

Finally, the input helpers convert text explicitly and validate the result. **readFiniteNumber** rejects blank or invalid text. **parseQuantity** also requires a non-negative safe integer, so it preserves zero while rejecting fractions, negative values, and trailing text.

## Try a small change

1. Change **Number("12px")** to **Number("12")** and compare it with **Number.parseInt("12px", 10)**.
2. Change **Number("")** to **Number("0")**. Both return zero, but the input strings have different meanings.
3. Replace **"5" + 2** with **Number("5") + 2**. Observe the result and explain why it changes.
4. Change **Boolean("false")** to **Boolean(false)**.
5. Change the **measurement.value** from **10** to **20**. Check the numeric conversion and addition.
6. Change **token** so its **Symbol.toPrimitive** method returns a different primitive for the default hint.
7. Try **BigInt("42")** and **BigInt("42.5")** in a separate **try...catch**.
8. Change **parseQuantity("0")** to **parseQuantity("")**. The function should return **null**.
9. Try **parseQuantity("12px")** and explain why prefix parsing is not used.
10. Add a maximum allowed quantity to **parseQuantity** and reject values above it.

## Key ideas shown

- **Number**, **String**, **Boolean**, and **BigInt** perform explicit conversions.
- **Number** requires a complete numeric string, while the parse functions read numeric prefixes.
- Empty text converts to zero with **Number**, so reject blank input before conversion when required.
- Arithmetic operators can coerce values, and **+** can concatenate or add.
- BigInt conversions and mixed numeric types can throw errors.
- Objects can customize conversion with **valueOf()**, **toString()**, and **Symbol.toPrimitive**.
- Convert external text explicitly and validate it before using the result.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [18 - typeof, instanceof, and reliable type checks](../lessons/018-typeof-instanceof-and-reliable-type-checks.md) | [Open lesson](../lessons/019-type-conversion-and-coercion.md) | [Open Q&A](../qnas/019-type-conversion-and-coercion.md) | [20 - Equality, comparison, and relational operators](../lessons/020-equality-comparison-and-relational-operators.md) |
