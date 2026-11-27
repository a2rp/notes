# 18 - typeof, instanceof, and reliable type checks: example

This complete HTML page demonstrates what **typeof** can and cannot distinguish, how **instanceof** checks constructor relationships, and how focused checks can validate arrays, numbers, dates, and object shapes. It prints the results to the browser Console.

## Goal

After working through this example, you should be able to:

- Read common **typeof** results and recognize the **null** exception.
- Identify arrays with **Array.isArray**.
- Check class relationships with **instanceof**.
- Distinguish a Date instance from a valid date value.
- Check finite numbers and **NaN** without converting input.
- Combine checks to validate data used by a function.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript type checks practice</title>
</head>
<body>
  <main>
    <h1>typeof, instanceof, and reliable type checks</h1>
    <p>
      Open the browser developer tools and select the Console to compare
      type categories, constructor relationships, and input validation.
    </p>
  </main>

  <script>
    // typeof returns a string for a broad type category.
    function greet() {}

    console.log("typeof undefined:", typeof undefined);
    console.log("typeof null:", typeof null);
    console.log("typeof true:", typeof true);
    console.log("typeof 42:", typeof 42);
    console.log("typeof NaN:", typeof NaN);
    console.log("typeof 42n:", typeof 42n);
    console.log('typeof "hello":', typeof "hello");
    console.log("typeof Symbol:", typeof Symbol("id"));
    console.log("typeof function:", typeof greet);
    console.log("typeof array:", typeof []);
    console.log("typeof object:", typeof {});

    // Use specific checks to distinguish null and arrays from objects.
    function isNonNullObject(value) {
      return value !== null && typeof value === "object";
    }

    function isNonArrayObject(value) {
      return value !== null &&
        typeof value === "object" &&
        !Array.isArray(value);
    }

    console.log("null is a non-null object:", isNonNullObject(null));
    console.log("array is a non-null object:", isNonNullObject([]));
    console.log("array is an array:", Array.isArray([]));
    console.log("object is an array:", Array.isArray({}));
    console.log("array is a non-array object:", isNonArrayObject([]));
    console.log("date is a non-array object:", isNonArrayObject(new Date()));

    // instanceof checks constructor relationships in this realm.
    class Animal {}

    class Dog extends Animal {}

    const dog = new Dog();

    console.log("dog instanceof Dog:", dog instanceof Dog);
    console.log("dog instanceof Animal:", dog instanceof Animal);
    console.log("dog instanceof Array:", dog instanceof Array);
    console.log("array instanceof Object:", [] instanceof Object);

    // An object without Object.prototype is still an object.
    const nullPrototypeObject = Object.create(null);

    console.log("null-prototype typeof:", typeof nullPrototypeObject);
    console.log(
      "null-prototype instanceof Object:",
      nullPrototypeObject instanceof Object
    );

    // A different realm has a different Array constructor.
    const frame = document.createElement("iframe");
    document.body.append(frame);

    const foreignArray = new frame.contentWindow.Array();

    console.log(
      "cross-realm array instanceof Array:",
      foreignArray instanceof Array
    );
    console.log(
      "cross-realm Array.isArray:",
      Array.isArray(foreignArray)
    );

    frame.remove();

    // Number checks should match the requirement.
    console.log("Number.isFinite(25):", Number.isFinite(25));
    console.log('Number.isFinite("25"):', Number.isFinite("25"));
    console.log("Number.isFinite(Infinity):", Number.isFinite(Infinity));
    console.log("Number.isNaN(NaN):", Number.isNaN(NaN));
    console.log('Number.isNaN("hello"):', Number.isNaN("hello"));

    function isFiniteNumber(value) {
      return typeof value === "number" && Number.isFinite(value);
    }

    console.log("isFiniteNumber(12):", isFiniteNumber(12));
    console.log('isFiniteNumber("12"):', isFiniteNumber("12"));
    console.log("isFiniteNumber(NaN):", isFiniteNumber(NaN));

    // A Date can be an instance even when its timestamp is invalid.
    const validDate = new Date("2026-11-20T00:00:00Z");
    const invalidDate = new Date("not a date");

    function isValidDate(value) {
      return value instanceof Date &&
        !Number.isNaN(value.getTime());
    }

    console.log("validDate instanceof Date:", validDate instanceof Date);
    console.log("invalidDate instanceof Date:", invalidDate instanceof Date);
    console.log("isValidDate(validDate):", isValidDate(validDate));
    console.log("isValidDate(invalidDate):", isValidDate(invalidDate));

    // Validate the fields the application needs, not just the object category.
    function isValidProduct(value) {
      return value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        typeof value.name === "string" &&
        value.name.trim().length > 0 &&
        Number.isFinite(value.price) &&
        value.price >= 0;
    }

    console.log(
      "valid product:",
      isValidProduct({ name: "Notebook", price: 4.5 })
    );
    console.log(
      "numeric string price:",
      isValidProduct({ name: "Notebook", price: "4.5" })
    );
    console.log(
      "empty product name:",
      isValidProduct({ name: "   ", price: 4.5 })
    );
    console.log("array is a valid product:", isValidProduct([]));
    console.log("null is a valid product:", isValidProduct(null));

    // typeof has a special result for an undeclared identifier.
    console.log(
      "typeof optionalDemoFeature:",
      typeof optionalDemoFeature
    );

    // typeof does not bypass the Temporal Dead Zone for let or const.
    // Using typeof a lexical binding before its declaration runs throws
    // a ReferenceError. Keep that check out of executable code.
  </script>
</body>
</html>
~~~

## View the results

Open **index.html** in a browser, open the developer tools, and select the **Console**. The page does not need to display the JavaScript results.

The output is:

~~~text
typeof undefined: undefined
typeof null: object
typeof true: boolean
typeof 42: number
typeof NaN: number
typeof 42n: bigint
typeof "hello": string
typeof Symbol: symbol
typeof function: function
typeof array: object
typeof object: object
null is a non-null object: false
array is a non-null object: true
array is an array: true
object is an array: false
array is a non-array object: false
date is a non-array object: true
dog instanceof Dog: true
dog instanceof Animal: true
dog instanceof Array: false
array instanceof Object: true
null-prototype typeof: object
null-prototype instanceof Object: false
cross-realm array instanceof Array: false
cross-realm Array.isArray: true
Number.isFinite(25): true
Number.isFinite("25"): false
Number.isFinite(Infinity): false
Number.isNaN(NaN): true
Number.isNaN("hello"): false
isFiniteNumber(12): true
isFiniteNumber("12"): false
isFiniteNumber(NaN): false
validDate instanceof Date: true
invalidDate instanceof Date: true
isValidDate(validDate): true
isValidDate(invalidDate): false
valid product: true
numeric string price: false
empty product name: false
array is a valid product: false
null is a valid product: false
typeof optionalDemoFeature: undefined
~~~

## Understand the output

The first group shows that **typeof** returns broad categories. **null**, arrays, and ordinary objects all produce **"object"**. Functions produce **"function"**, and **NaN** still has type **"number"**.

The next group uses **Array.isArray** and an explicit null check to distinguish arrays and objects. The array is an object, but it is not a non-array object.

The class example shows that a **Dog** is an instance of both **Dog** and its parent class **Animal**. The null-prototype object has type **"object"**, but it does not pass **instanceof Object** because its prototype chain does not contain **Object.prototype**.

The iframe creates an array in a different realm. It does not pass this page's **instanceof Array** check, but **Array.isArray** still recognizes it as an array.

The numeric checks reject a numeric string, infinity, and **NaN** when the rule requires a finite Number. Both dates pass **instanceof Date**, while only the valid date passes **isValidDate**.

The product validator checks the actual fields and constraints required by its example. It rejects a string price, whitespace-only name, array, and **null**.

Finally, **typeof optionalDemoFeature** returns **"undefined"** because that identifier has not been declared. This special behavior does not apply to a **let** or **const** variable while it is in the Temporal Dead Zone.

## Try a small change

1. Add **typeof 42n**, **typeof Symbol("key")**, and **typeof (() => {})** to the first group.
2. Change **isNonNullObject** to return false for arrays as well. Compare it with **isNonArrayObject**.
3. Change **class Dog extends Animal** to a class without a parent. Check **dog instanceof Animal**.
4. Add a **quantity** field to the product validator. Require it to be a non-negative integer with **Number.isInteger**.
5. Replace **Number.isFinite(value)** with **typeof value === "number"**. Notice that **NaN** and **Infinity** now pass this partial check.
6. Change the valid date string to **"not a date"** and observe how the validity check changes.
7. Add another property to the product input and decide whether the validator needs to check it.
8. Remove the iframe's **instanceof Array** log. Explain why **Array.isArray** is the more reliable check across realms.
9. Try **typeof optionalDemoFeature** without the **typeof** operator. It throws a **ReferenceError** if that name is undeclared.
10. Move a **typeof** check above a **let** declaration in a separate experiment. Observe the Temporal Dead Zone error.

## Key ideas shown

- **typeof null** and **typeof array** both produce **"object"**, so use more specific checks when needed.
- **Array.isArray** identifies arrays, including arrays from another realm.
- **instanceof** normally checks prototype relationships and may be customized.
- A Date instance can still contain an invalid timestamp.
- **Number.isFinite** and **Number.isNaN** provide focused numeric checks without converting input.
- Validate the fields and constraints your program will actually use.
- **typeof** can inspect an undeclared identifier, but it does not bypass the Temporal Dead Zone.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [17 - Booleans, truthiness, and falsy values](../lessons/017-booleans-truthiness-and-falsy-values.md) | [Open lesson](../lessons/018-typeof-instanceof-and-reliable-type-checks.md) | [Open Q&A](../qnas/018-typeof-instanceof-and-reliable-type-checks.md) | [19 - Type conversion and coercion](../lessons/019-type-conversion-and-coercion.md) |
