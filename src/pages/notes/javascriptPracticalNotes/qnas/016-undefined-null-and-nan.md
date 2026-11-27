# 16 - undefined, null, and NaN: Q&A

Use these questions to distinguish missing values, intentional absence, and invalid numeric results. Each answer follows its question.

## Multiple-choice questions

### 1. What does an uninitialized **let** binding contain after its declaration runs?

A. **null**  
B. **undefined**  
C. **NaN**  
D. An empty string

**Answer: B.** When execution reaches **let item;**, the binding is initialized to **undefined**.

### 2. What does a function return when it reaches the end without a **return** statement?

A. **null**  
B. **false**  
C. **undefined**  
D. **NaN**

**Answer: C.** A function with no returned value produces **undefined**.

### 3. What value usually results from reading a property that does not exist?

A. **undefined**  
B. **null**  
C. **false**  
D. A **SyntaxError**

**Answer: A.** A missing property read normally evaluates to **undefined**.

### 4. Which value is often used to deliberately represent an absent object?

A. **undefined**  
B. **null**  
C. **NaN**  
D. **false**

**Answer: B.** **null** can explicitly signal that an object or result is intentionally absent.

### 5. What does **typeof null** return?

A. **"null"**  
B. **"undefined"**  
C. **"object"**  
D. **"number"**

**Answer: C.** This is a historical JavaScript quirk. **null** is still its own primitive type.

### 6. What is **NaN**?

A. A primitive string  
B. A special value in the **Number** type  
C. A missing object property  
D. The same value as **null**

**Answer: B.** **NaN** is a numeric value that indicates an invalid or unrepresentable numeric result.

### 7. Which expression correctly checks whether **result** is NaN?

A. **result === NaN**  
B. **result == NaN**  
C. **Number.isNaN(result)**  
D. **typeof result === "NaN"**

**Answer: C.** **NaN** is unequal to itself, so equality cannot detect it. **Number.isNaN** is the direct check.

### 8. Why can global **isNaN("hello")** return true?

A. It first converts its argument to a number  
B. It checks whether the input is a null value  
C. It always returns true for strings  
D. It checks whether the input is an object

**Answer: A.** Global **isNaN** coerces its argument before checking. For exact NaN detection without coercion, use **Number.isNaN**.

### 9. What does **Number.isNaN("hello")** return?

A. **true**  
B. **false**  
C. **"NaN"**  
D. It throws a **TypeError**

**Answer: B.** The string is not the NaN value. **Number.isNaN** does not convert it first.

### 10. What does **NaN === NaN** return?

A. **true**  
B. **false**  
C. **undefined**  
D. A **TypeError**

**Answer: B.** NaN is not strictly equal to any value, including itself.

### 11. Which check distinguishes **undefined** from **null**?

A. **value == null**  
B. **value === undefined** or **value === null**  
C. **!value**  
D. **typeof value === "object"**

**Answer: B.** Strict equality checks each value without treating them as equal through coercion.

### 12. Which statement about **typeof NaN** is correct?

A. It returns **"NaN"**  
B. It returns **"number"**  
C. It returns **"undefined"**  
D. It throws a **ReferenceError**

**Answer: B.** NaN is a special value in the Number type.

### 13. What does **profile.nickname** normally evaluate to if **profile** exists but has no **nickname** property?

A. **null**  
B. **undefined**  
C. **NaN**  
D. An empty object

**Answer: B.** Reading a missing property normally gives **undefined**. This is different from a property that exists and explicitly contains **null**.

### 14. Which check should you prefer when you need to detect the NaN value without coercing the input?

A. Global **isNaN(value)**  
B. **Number.isNaN(value)**  
C. **value === NaN**  
D. **typeof value === "NaN"**

**Answer: B.** **Number.isNaN** reports whether the value itself is NaN without first converting strings or other inputs.

### 15. Which statement about a **let** binding before initialization is correct?

A. It is always safe to read as **undefined**  
B. It may be in the Temporal Dead Zone and reading it throws a **ReferenceError**  
C. It is automatically **null**  
D. It becomes **NaN**

**Answer: B.** Before execution reaches the declaration, the binding is in the TDZ. After a declaration such as **let value;** runs, it is initialized to **undefined**.

## True or false

### 16. **undefined** and **null** are the same value.

**Answer: False.** They are distinct values with different meanings and both can be checked with strict equality.

### 17. A function with no return value returns **undefined**.

**Answer: True.** Reaching the end of the function without returning a value produces **undefined**.

### 18. Reading a missing property on an existing object normally returns **null**.

**Answer: False.** It normally returns **undefined**. A property can explicitly be assigned **null**, which is a separate case.

### 19. **typeof null** returns **"object"**.

**Answer: True.** It is a historical behavior. It does not make **null** an object value.

### 20. **NaN** has the type **number**.

**Answer: True.** NaN is a special value in JavaScript's Number type.

### 21. **NaN === NaN** is true.

**Answer: False.** NaN is not equal to itself. Use **Number.isNaN** to detect it.

### 22. Global **isNaN** converts its argument before checking it.

**Answer: True.** This is why it can return true for a string that cannot be converted to a valid number.

### 23. **Number.isNaN("hello")** returns true.

**Answer: False.** It does not coerce the string. The string itself is not NaN, so the result is false.

### 24. **!value** is a safe way to detect only **undefined**.

**Answer: False.** Other values such as **null**, **0**, **false**, an empty string, and NaN can also be falsy. Truthiness is covered in the next chapter.

### 25. A **let** binding is readable as **undefined** before its declaration line.

**Answer: False.** Before initialization, it is in the TDZ and a read throws a **ReferenceError**.

## Predict the result

### 26. What does this code print?

~~~js
let selection;
console.log(selection);
console.log(selection === undefined);
~~~

**Answer:**

~~~text
undefined
true
~~~

The declaration has run without an initializer, so **selection** has the value **undefined**.

### 27. What does this code print?

~~~js
function buildMessage() {}

console.log(buildMessage());
~~~

**Answer:**

~~~text
undefined
~~~

The function reaches its end without returning a value.

### 28. What does this code print?

~~~js
const profile = {
  name: "Asha",
  nickname: null
};

console.log(profile.nickname);
console.log(profile.city);
~~~

**Answer:**

~~~text
null
undefined
~~~

The **nickname** property exists and explicitly contains **null**. The **city** property is missing, so its read returns **undefined**.

### 29. What does this code print?

~~~js
console.log(typeof null);
console.log(typeof NaN);
~~~

**Answer:**

~~~text
object
number
~~~

**typeof null** has a historical result of **"object"**. NaN belongs to the Number type.

### 30. What does this code print?

~~~js
console.log(NaN === NaN);
console.log(NaN !== NaN);
console.log(Number.isNaN(NaN));
~~~

**Answer:**

~~~text
false
true
true
~~~

NaN is unequal to itself. **Number.isNaN** is the correct direct check.

### 31. What does this code print?

~~~js
console.log(Number.isNaN("hello"));
console.log(isNaN("hello"));
~~~

**Answer:**

~~~text
false
true
~~~

**Number.isNaN** checks the value without coercion. Global **isNaN** first tries to convert the string to a number, and that conversion produces NaN.

### 32. What does this code print?

~~~js
const result = Number("unknown");

console.log(typeof result);
console.log(Number.isNaN(result));
~~~

**Answer:**

~~~text
number
true
~~~

A failed numeric conversion returns NaN, which is a value in the Number type.

### 33. What does this code print?

~~~js
const result = NaN + 10;

console.log(result);
console.log(Number.isNaN(result));
~~~

**Answer:**

~~~text
NaN
true
~~~

A numeric operation with NaN generally produces NaN.

### 34. What happens when this code runs?

~~~js
{
  console.log(value);
  let value;
}
~~~

**Answer:** It throws a **ReferenceError**. The binding is in the Temporal Dead Zone before its declaration initializes it. After execution reaches **let value**, it becomes **undefined**.

## Short-answer questions

### 35. How would you distinguish an intentionally empty property from a missing property?

**Answer:** Check the value with strict equality. An existing property set to **null** reads as **null**. A missing property read normally evaluates to **undefined**.

### 36. Why does **typeof** not reliably detect NaN?

**Answer:** NaN has type **number**, like other numeric values. Use **Number.isNaN(value)** to determine whether the value is NaN.

### 37. What is the difference between global **isNaN** and **Number.isNaN**?

**Answer:** Global **isNaN** converts its argument before checking, so a non-number input may be treated as NaN after conversion. **Number.isNaN** checks whether the input itself is the NaN value and does not coerce it.

### 38. Why should a generic falsy check not be used when only missing values are allowed?

**Answer:** Falsy values include more than **undefined** and **null**. A generic check can also reject valid values such as **0**, **false**, or an empty string. Check the exact values that your function considers missing.

### 39. Why can NaN make later calculations unusable?

**Answer:** Many arithmetic operations propagate NaN, so once an invalid numeric result enters a calculation, later results can remain NaN. Validate inputs and inspect numeric results near their source.

## Coding questions

### 40. Write a function that distinguishes **undefined** and **null**.

**Answer:**

~~~js
function describeAbsence(value) {
  if (value === undefined) {
    return "value was not provided";
  }

  if (value === null) {
    return "value was intentionally left empty";
  }

  return "value is present";
}

console.log(describeAbsence(undefined));
console.log(describeAbsence(null));
console.log(describeAbsence("ready"));
~~~

Strict equality checks the two distinct values without converting one into the other.

### 41. Write a function that checks whether an input is NaN without coercing it.

**Answer:**

~~~js
function isInvalidNumericResult(value) {
  return Number.isNaN(value);
}

console.log(isInvalidNumericResult(NaN)); // true
console.log(isInvalidNumericResult("hello")); // false
~~~

The function returns true only for the NaN value.

### 42. Write a function that accepts finite numbers and rejects other values.

**Answer:**

~~~js
function doubleFiniteNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError("value must be a finite number");
  }

  return value * 2;
}
~~~

The type check rejects non-numbers. **Number.isFinite** rejects NaN and positive or negative Infinity.

### 43. Check whether an object property is missing or explicitly null.

**Answer:**

~~~js
const profile = {
  middleName: null
};

if (profile.middleName === null) {
  console.log("middleName is explicitly empty");
}

if (profile.nickname === undefined) {
  console.log("nickname is missing or undefined");
}
~~~

A normal property read cannot distinguish a missing property from a property explicitly set to **undefined**. If that distinction matters, check property existence separately.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [15 - Primitive values and object references](../lessons/015-primitive-values-and-object-references.md) | [Open lesson](../lessons/016-undefined-null-and-nan.md) | [Open example](../examples/016-undefined-null-and-nan.md) | [17 - Booleans, truthiness, and falsy values](../lessons/017-booleans-truthiness-and-falsy-values.md) |