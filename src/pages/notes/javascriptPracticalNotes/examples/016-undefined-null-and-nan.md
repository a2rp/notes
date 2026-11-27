# 16 - undefined, null, and NaN: example

This complete HTML page demonstrates where **undefined** appears, how **null** can represent intentional absence, and how to detect **NaN**. It prints every result to the browser Console.

## Goal

After running the example, you should be able to:

- Recognize **undefined** from an uninitialized binding, a missing property, an omitted argument, or a function without a return value.
- Distinguish a missing property from a property set to **null** or **undefined**.
- Explain why **typeof null** reports **"object"**.
- Produce **NaN** and check it with **Number.isNaN**.
- Compare global **isNaN** with **Number.isNaN**.
- Reject invalid numeric inputs before calculations.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript undefined, null, and NaN practice</title>
</head>
<body>
  <main>
    <h1>undefined, null, and NaN</h1>
    <p>
      Open the browser developer tools and select the Console to compare
      missing values, intentional absence, and invalid numeric results.
    </p>
  </main>

  <script>
    // An uninitialized let is undefined after its declaration runs.
    let selectedItem;

    console.log("uninitialized let:", selectedItem);
    console.log(
      "uninitialized let is undefined:",
      selectedItem === undefined
    );

    // A function without a return value returns undefined.
    function doNotReturnAValue() {}

    console.log("function without return:", doNotReturnAValue());

    // An omitted argument gives its parameter the value undefined.
    function greet(name) {
      if (name === undefined) {
        return "Hello, guest";
      }

      return "Hello, " + name;
    }

    console.log("greeting with omitted argument:", greet());
    console.log("greeting with provided argument:", greet("Asha"));

    // A property can be explicitly null, explicitly undefined, or missing.
    const profile = {
      middleName: null,
      nickname: undefined
    };

    console.log("middleName value:", profile.middleName);
    console.log("missing city value:", profile.city);
    console.log(
      "middleName property exists:",
      Object.prototype.hasOwnProperty.call(profile, "middleName")
    );
    console.log(
      "nickname property exists:",
      Object.prototype.hasOwnProperty.call(profile, "nickname")
    );
    console.log(
      "city property exists:",
      Object.prototype.hasOwnProperty.call(profile, "city")
    );

    console.log("typeof null:", typeof null);

    // Several numeric operations can produce NaN.
    const invalidDivision = 0 / 0;
    const invalidRoot = Math.sqrt(-1);
    const invalidConversion = Number("not a quantity");

    console.log("invalid division:", invalidDivision);
    console.log("invalid square root:", invalidRoot);
    console.log("invalid conversion:", invalidConversion);
    console.log("typeof NaN:", typeof invalidDivision);

    // NaN is unequal to itself.
    console.log("NaN strictly equals itself:", NaN === NaN);
    console.log("NaN differs from itself:", NaN !== NaN);

    // Number.isNaN checks the value without coercing it.
    console.log("Number.isNaN on NaN:", Number.isNaN(invalidDivision));
    console.log("Number.isNaN on text:", Number.isNaN("hello"));

    // Global isNaN converts its argument before checking.
    console.log("global isNaN on text:", isNaN("hello"));

    // NaN usually propagates through later arithmetic.
    const invalidTotal = invalidDivision + 10;
    console.log("calculation after NaN:", invalidTotal);
    console.log("total is NaN:", Number.isNaN(invalidTotal));

    // Validate both the type and the numeric result before using it.
    function doubleFiniteNumber(value) {
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return "invalid input";
      }

      return value * 2;
    }

    console.log("double valid number:", doubleFiniteNumber(5));
    console.log("double text:", doubleFiniteNumber("5"));
    console.log("double NaN:", doubleFiniteNumber(NaN));
    console.log("double Infinity:", doubleFiniteNumber(Infinity));
  </script>
</body>
</html>
~~~

## Open the Console

1. Open **index.html** in a browser.
2. Open Developer Tools. In most desktop browsers, **F12** opens them.
3. Select the **Console** tab.
4. Compare the output below with the logs from the page.

## Expected Console output

~~~text
uninitialized let: undefined
uninitialized let is undefined: true
function without return: undefined
greeting with omitted argument: Hello, guest
greeting with provided argument: Hello, Asha
middleName value: null
missing city value: undefined
middleName property exists: true
nickname property exists: true
city property exists: false
typeof null: object
invalid division: NaN
invalid square root: NaN
invalid conversion: NaN
typeof NaN: number
NaN strictly equals itself: false
NaN differs from itself: true
Number.isNaN on NaN: true
Number.isNaN on text: false
global isNaN on text: true
calculation after NaN: NaN
total is NaN: true
double valid number: 10
double text: invalid input
double NaN: invalid input
double Infinity: invalid input
~~~

## Explanation

### undefined values

**selectedItem** has the value **undefined** after its declaration runs without an initializer. **doNotReturnAValue** reaches the end without returning a value, so its call also evaluates to **undefined**.

When **greet** is called without an argument, its **name** parameter is **undefined**. The function detects that value and uses its guest greeting.

### null, undefined, and missing properties

The **middleName** property exists and is explicitly **null**. The **nickname** property also exists, but its value is explicitly **undefined**. The **city** property does not exist, so reading it returns **undefined**.

The **hasOwnProperty** checks distinguish an absent property from a property that exists with the value **undefined**. This distinction matters when property presence is part of an application's data format.

**typeof null** prints **"object"** because of a historical JavaScript behavior. The value **null** is still distinct from an object.

### NaN

The division **0 / 0**, square root of a negative number, and conversion of non-numeric text each produce **NaN**. The value is in the Number type, so **typeof** reports **"number"**.

NaN is unequal to itself, which is why **NaN === NaN** prints **false**. **Number.isNaN** identifies the NaN value directly.

Global **isNaN** first converts its argument. The text **"hello"** cannot become a valid number, so global **isNaN** reports **true**. **Number.isNaN("hello")** reports **false** because the input is a string, not the NaN value.

### Validate numeric inputs

**doubleFiniteNumber** accepts finite Number values. It rejects a string, NaN, and Infinity. The function has an explicit input rule so invalid values do not enter its calculation.

## Try a small change

1. Give **selectedItem** an initial string value and compare its check.
2. Add a **city: undefined** property to **profile**. Compare its value with its property-existence check.
3. Call **greet(null)** and observe why an explicit null value is different from an omitted argument.
4. Replace **Number.isNaN** with **value === NaN** in a separate check. Observe why it does not detect NaN.
5. Compare **Number.isNaN("hello")** with **isNaN("hello")**.
6. Change **doubleFiniteNumber** to use **Number.isNaN** in addition to its type check. Consider how you also want to handle Infinity.
7. Create a calculation that produces NaN, then pass its result into **doubleFiniteNumber**.
8. Write down which of **undefined**, **null**, and **NaN** matches a few missing or invalid data cases from your own code.

## Key ideas shown

- A declared but uninitialized **let** becomes **undefined** when its declaration runs.
- A function without a return value and an omitted argument produce **undefined**.
- A missing property reads as **undefined**.
- A property may exist and explicitly contain **null** or **undefined**.
- **typeof null** reports **"object"** for historical reasons.
- NaN has type **number** and is not equal to itself.
- **Number.isNaN** checks for NaN without coercion.
- Global **isNaN** converts its argument before checking.
- NaN usually propagates through arithmetic.
- Validate numeric inputs and results before relying on calculations.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [15 - Primitive values and object references](../lessons/015-primitive-values-and-object-references.md) | [Open lesson](../lessons/016-undefined-null-and-nan.md) | [Open Q&A](../qnas/016-undefined-null-and-nan.md) | [17 - Booleans, truthiness, and falsy values](../lessons/017-booleans-truthiness-and-falsy-values.md) |