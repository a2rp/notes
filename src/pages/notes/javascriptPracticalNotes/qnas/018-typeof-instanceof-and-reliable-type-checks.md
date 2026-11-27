# 18 - typeof, instanceof, and reliable type checks

Use these questions to practice the results and limits of **typeof** and **instanceof**, then choose more focused checks for arrays, numbers, dates, and object shapes. Each answer and explanation follows its question.

## Multiple-choice questions

### 1. What does **typeof null** return?

A. **"null"**  
B. **"undefined"**  
C. **"object"**  
D. **"boolean"**

**Answer: C. "object".**

This is a historical JavaScript behavior kept for compatibility. **null** is still a distinct primitive value.

### 2. What does **typeof NaN** return?

A. **"NaN"**  
B. **"number"**  
C. **"undefined"**  
D. **"object"**

**Answer: B. "number".**

**NaN** is a special value in the Number type. Use **Number.isNaN(value)** when you need to detect it.

### 3. What does **typeof []** return?

A. **"array"**  
B. **"object"**  
C. **"function"**  
D. **"undefined"**

**Answer: B. "object".**

Arrays are objects, so **typeof** does not distinguish them from other objects. Use **Array.isArray**.

### 4. Which check directly identifies an array?

A. **typeof value === "array"**  
B. **value instanceof Object**  
C. **Array.isArray(value)**  
D. **typeof value === "object"**

**Answer: C. Array.isArray(value).**

**typeof** returns **"object"** for arrays, and every array is also an object. **Array.isArray** is the specific array check.

### 5. What does **typeof function () {}** return?

A. **"function"**  
B. **"object"**  
C. **"callable"**  
D. **"undefined"**

**Answer: A. "function".**

Functions are callable objects, and **typeof** gives them the special result **"function"**.

### 6. What does **typeof (class Account {})** return?

A. **"class"**  
B. **"object"**  
C. **"function"**  
D. **"undefined"**

**Answer: C. "function".**

A class declaration or class expression has **typeof** result **"function"**.

### 7. What does **Number.isFinite("12")** return?

A. **true**  
B. **false**  
C. **12**  
D. It throws a TypeError.

**Answer: B. false.**

**Number.isFinite** does not convert strings to numbers. The input must be a finite Number value.

### 8. What does **Number.isNaN("hello")** return?

A. **true**  
B. **false**  
C. **"NaN"**  
D. It throws an error.

**Answer: B. false.**

The string **"hello"** is not the Number value **NaN**. **Number.isNaN** does not coerce the input.

### 9. What does **dog instanceof Animal** normally check?

A. Whether **dog** has a property named **Animal**  
B. Whether **Animal.prototype** is in **dog**'s prototype chain  
C. Whether **dog** was created by JSON  
D. Whether **dog** is a primitive

**Answer: B. Whether Animal.prototype is in dog’s prototype chain.**

This is the usual behavior for **instanceof** when its right operand uses the default instance check. A custom **Symbol.hasInstance** can change that behavior.

### 10. Which check is the best direct test that a value is not null and has JavaScript object type?

A. **typeof value === "object"**  
B. **value instanceof Object**  
C. **value !== null && typeof value === "object"**  
D. **Boolean(value)**

**Answer: C. value !== null && typeof value === "object".**

The explicit null comparison excludes **null**, which would otherwise pass **typeof value === "object"**. Arrays also pass this check, so add **!Array.isArray(value)** if arrays must be excluded.

## True or false

### 11. **typeof null** returns **"object"**, but **null** is still a primitive.

**Answer: True.**

The **typeof** result is a historical exception. It does not mean that **null** is an object value.

### 12. **typeof []** returns **"array"**.

**Answer: False.**

It returns **"object"**. Use **Array.isArray([])** to identify an array.

### 13. **typeof Infinity** and **typeof NaN** both return **"number"**.

**Answer: True.**

Both values belong to the Number type. Use additional checks to determine whether a number is finite or is **NaN**.

### 14. **instanceof Array** is guaranteed to identify every array from every iframe or JavaScript realm.

**Answer: False.**

Each realm can have a different **Array** constructor. Prefer **Array.isArray** when arrays may come from other realms.

### 15. An invalid Date object still passes **value instanceof Date** in the same realm.

**Answer: True.**

The value is still a Date object even though its stored time value is invalid. Check **Number.isNaN(value.getTime())** to detect an invalid date.

### 16. **Number.isFinite("12")** converts the string to the number 12.

**Answer: False.**

It returns false without converting the string. Convert input separately only when conversion is part of the desired behavior.

### 17. **Number.isNaN("hello")** returns true because the text cannot become a number.

**Answer: False.**

It returns false because the argument is a string, not the Number value **NaN**. The global **isNaN** function has different conversion behavior.

### 18. **typeof someUndeclaredName** can return **"undefined"** without throwing.

**Answer: True.**

The **typeof** operator has special behavior for an unresolvable identifier. Reading the same name directly would throw a **ReferenceError**.

### 19. **typeof** bypasses the Temporal Dead Zone for a **let** binding.

**Answer: False.**

Using **typeof** on a lexical binding before its declaration has initialized still throws a **ReferenceError**.

### 20. Every value that passes **value instanceof Object** has all the properties your application expects.

**Answer: False.**

**instanceof Object** does not validate the object's shape or data. Check the required properties, types, and constraints directly.

## Predict the result

### 21. What does this code print?

~~~js
console.log(typeof "JavaScript");
console.log(typeof 8n);
console.log(typeof (() => {}));
~~~

**Answer:**

~~~text
string
bigint
function
~~~

The first value is a string, the second is a BigInt, and the third is a function.

### 22. What does this code print?

~~~js
console.log(typeof null);
console.log(typeof []);
console.log(typeof {});
~~~

**Answer:**

~~~text
object
object
object
~~~

**typeof** returns **"object"** for all three. Use a strict null check and **Array.isArray** when those distinctions matter.

### 23. What does this code print?

~~~js
console.log(Array.isArray([]));
console.log(Array.isArray({}));
console.log(Array.isArray(null));
~~~

**Answer:**

~~~text
true
false
false
~~~

**Array.isArray** returns true only for array values, including empty arrays.

### 24. What does this code print?

~~~js
console.log([] instanceof Array);
console.log([] instanceof Object);
console.log({} instanceof Array);
~~~

**Answer:**

~~~text
true
true
false
~~~

In the same realm, an array is an instance of both **Array** and **Object**. A plain object is not an instance of **Array**.

### 25. What does this code print?

~~~js
const item = Object.create(null);

console.log(typeof item);
console.log(item instanceof Object);
~~~

**Answer:**

~~~text
object
false
~~~

The value is an object with no prototype. Its prototype chain does not contain **Object.prototype**, so it does not pass the default **instanceof Object** check.

### 26. What does this code print?

~~~js
console.log(typeof optionalSetting);
~~~

Assume no variable named **optionalSetting** has been declared.

**Answer:**

~~~text
undefined
~~~

**typeof** returns the string **"undefined"** for an unresolvable identifier. This special case does not make it safe to read that identifier without **typeof**.

### 27. What happens here?

~~~js
console.log(typeof currentMode);
let currentMode = "edit";
~~~

**Answer:** It throws a **ReferenceError** before logging a value.

The **let** binding exists in the Temporal Dead Zone until its declaration is initialized. **typeof** does not bypass that restriction.

### 28. What does this code print?

~~~js
const invalidDate = new Date("not a date");

console.log(invalidDate instanceof Date);
console.log(Number.isNaN(invalidDate.getTime()));
~~~

**Answer:**

~~~text
true
true
~~~

The value is a Date instance, but its timestamp is **NaN**. Constructor membership and data validity are separate checks.

### 29. What does this code print?

~~~js
console.log(Number.isFinite(12));
console.log(Number.isFinite("12"));
console.log(Number.isFinite(Infinity));
~~~

**Answer:**

~~~text
true
false
false
~~~

Only the first argument is a finite Number. The string is not converted, and infinity is not finite.

### 30. What does this code print?

~~~js
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("NaN"));
console.log(Number.isNaN(0 / 0));
~~~

**Answer:**

~~~text
true
false
true
~~~

The text **"NaN"** is a string. The other two expressions evaluate to the Number value **NaN**.

## Short-answer questions

### 31. What kind of result does **typeof** produce?

**Answer:** It produces a string.

Examples include **"string"**, **"number"**, **"boolean"**, **"bigint"**, **"symbol"**, **"undefined"**, **"function"**, and **"object"**.

### 32. Why is **typeof value === "object"** not enough to check for a useful object?

**Answer:** It also matches **null**, arrays, dates, and many other kinds of objects.

First exclude **null**. Then use additional checks for arrays or other categories and validate the properties the code needs.

### 33. What does **instanceof** normally tell you?

**Answer:** It tells you whether a constructor's prototype appears in the object's prototype chain.

This makes it useful for class or constructor relationships. It does not validate an object's complete structure or contents.

### 34. Why is **Array.isArray** preferred over **instanceof Array** for general array detection?

**Answer:** **Array.isArray** identifies arrays across realms, while **instanceof Array** depends on the current realm's **Array** constructor.

An iframe can have a different **Array** constructor from the page that receives its array.

### 35. Does **instanceof Date** prove that a date represents a valid time?

**Answer:** No. An invalid Date is still a Date instance.

For a same-realm Date, check **value instanceof Date** and make sure **Number.isNaN(value.getTime())** is false.

### 36. What is the difference between **Number.isFinite** and **typeof value === "number"**?

**Answer:** **typeof value === "number"** also accepts **NaN** and positive or negative infinity. **Number.isFinite** accepts only finite Number values and does not coerce input.

### 37. What does **Number.isNaN** check that a regular equality comparison cannot check?

**Answer:** It identifies the Number value **NaN**, which is not equal to itself.

For example, **NaN === NaN** is false, while **Number.isNaN(NaN)** is true.

### 38. Why might a program check the shape of an object instead of using **instanceof Object**?

**Answer:** The program may need particular properties with particular types, not just a prototype relationship.

Shape checks can validate fields such as a string identifier or a Boolean status before the program uses them.

## Coding questions

### 39. Write a function that checks whether a value is an array with at least one item.

**Answer:**

~~~js
function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}
~~~

An empty array is still truthy. Check its type and length to ensure that it contains at least one item.

### 40. Write a function that accepts only finite Number values.

**Answer:**

~~~js
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
~~~

**Number.isFinite** rejects strings, **NaN**, and infinities. The explicit type comparison makes the expected primitive type clear.

### 41. Write a function that checks for a non-null, non-array object.

**Answer:**

~~~js
function isNonArrayObject(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value);
}
~~~

This excludes **null** and arrays. It still accepts values such as dates and maps, so it does not mean that the value is a plain object.

### 42. Write a function that accepts an object with a string **id** and a Boolean **enabled** property.

**Answer:**

~~~js
function hasExpectedAccountShape(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.id === "string" &&
    typeof value.enabled === "boolean";
}
~~~

The function excludes null and arrays before checking the fields. It then checks each property against the type required by this example.

### 43. Write a function that checks whether a same-realm Date is valid.

**Answer:**

~~~js
function isValidDate(value) {
  return value instanceof Date &&
    !Number.isNaN(value.getTime());
}
~~~

**instanceof Date** checks the Date relationship, and the timestamp check rejects invalid Date instances. This example assumes the Date was created in the same realm.

### 44. Write a function that calls a value only if it is a function.

**Answer:**

~~~js
function callIfFunction(value) {
  if (typeof value === "function") {
    value();
    return true;
  }

  return false;
}
~~~

The **typeof** check avoids trying to call ordinary non-function values. The function returns a Boolean to report whether it called the value.

### 45. Write a validator for a product with a non-empty string name and a finite, non-negative number price.

**Answer:**

~~~js
function isValidProduct(value) {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    Number.isFinite(value.price) &&
    value.price >= 0;
}
~~~

The validator checks the outer object, the name's type and content, and the price's type and range. A numeric string such as **"4.5"** is rejected because the price must be a Number.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [17 - Booleans, truthiness, and falsy values](../lessons/017-booleans-truthiness-and-falsy-values.md) | [Open lesson](../lessons/018-typeof-instanceof-and-reliable-type-checks.md) | [Open example](../examples/018-typeof-instanceof-and-reliable-type-checks.md) | [19 - Type conversion and coercion](../lessons/019-type-conversion-and-coercion.md) |
