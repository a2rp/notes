# 28 - Optional chaining and nullish coalescing

This Q&A checks optional property access, optional calls, nullish defaults, and the limits of optional chains. Each answer follows its question.

## Multiple-choice questions

### 1. When does **object?.property** short-circuit?

A. When **object** is any falsy value  
B. When **object** is **null** or **undefined**  
C. When the property is an empty string  
D. When the property does not exist

**Answer: B. When object is null or undefined.**

Values such as **0**, **false**, and **""** do not cause the optional chain to short-circuit.

### 2. What value does **null?.name** produce?

A. **null**  
B. **false**  
C. **undefined**  
D. A **TypeError**

**Answer: C. undefined.**

The optional chain stops when the base is nullish and produces **undefined**.

### 3. Which syntax safely reads a property using a variable key?

A. **object?.key**  
B. **object?[key]**  
C. **object?.[key]**  
D. **object?[.key]**

**Answer: C. object?.[key].**

The computed property access is skipped if **object** is nullish.

### 4. Which syntax conditionally calls a callback that might be nullish?

A. **callback?()**  
B. **callback?.()**  
C. **callback??()**  
D. **callback &&?()**

**Answer: B. callback?.().**

The call is skipped if the callback is **null** or **undefined**.

### 5. What does **value ?? fallback** preserve?

A. Only truthy values  
B. Every value except **false**  
C. Values other than **null** and **undefined**  
D. Only strings and numbers

**Answer: C. Values other than null and undefined.**

The operator preserves valid falsy values such as zero, false, and the empty string.

### 6. What happens with **object?.method()** when **object** is nullish?

A. It throws before reaching the method  
B. The call is skipped and the expression returns **undefined**  
C. It returns **null**  
D. It creates a no-op function

**Answer: B.**

The optional check is on **object**, so the rest of that continuous chain is skipped.

### 7. What happens with **object.method?.()** if **method** is undefined?

A. It throws a **TypeError**  
B. It skips the call and returns **undefined**  
C. It returns **null**  
D. It calls the object itself

**Answer: B.**

This form checks whether the method value is nullish before calling it.

### 8. What if **object.method** is the number **5** in **object.method?.()**?

A. It returns **5**  
B. It returns **undefined**  
C. It throws a **TypeError** because the value is not callable  
D. It converts the number to a function

**Answer: C.**

Optional call skips nullish values. It does not suppress errors for a present value that is not a function.

### 9. Which expression is valid?

A. **object?.property = 1**  
B. **new object?.Constructor()**  
C. **delete object?.property**  
D. **object ?? .property**

**Answer: C. delete object?.property.**

Optional chains cannot be assignment targets or used directly as a constructor in a **new** expression.

### 10. Why does **(object?.profile).name** behave differently from **object?.profile.name**?

A. Parentheses convert the value to a string  
B. Parentheses end the continuous optional chain  
C. Parentheses remove the profile property  
D. The two expressions are always identical

**Answer: B.**

The grouped expression can produce **undefined**, after which the ordinary **.name** access can throw.

### 11. Can optional chaining catch an exception thrown by a getter?

A. Yes, all exceptions are converted to **undefined**  
B. Yes, but only in strict mode  
C. No, the getter's exception still propagates  
D. Only when used with **??**

**Answer: C.**

Optional chaining handles nullish bases. It is not exception handling.

### 12. What does **delete missingObject?.property** return when **missingObject** is null?

A. **false**  
B. **true**  
C. **undefined**  
D. **TypeError**

**Answer: B. true.**

If the base is nullish, the optional delete completes without attempting to delete a property.

## Predict the output

### 13. What is the output?

~~~js
const user = {
    profile: {
        name: "Asha",
    },
};
const missingUser = null;

console.log(user?.profile.name);
console.log(missingUser?.profile.name);
~~~

**Answer:**

~~~text
Asha
undefined
~~~

The optional chain stops before attempting the property access when **missingUser** is null.

### 14. What is the output?

~~~js
const record = {
    profile: null,
};

console.log(record?.profile?.name);
~~~

**Answer:**

~~~text
undefined
~~~

The second optional check protects the nullable **profile** value.

### 15. What happens with this expression?

~~~js
const record = {
    profile: null,
};

// record?.profile.name;
~~~

**Answer:**

It throws a **TypeError** if uncommented.

The first optional check protects **record**. Since **record** exists, the chain continues. The regular **.name** access then attempts to read a property of **null**.

### 16. What is the output?

~~~js
const user = {
    age: 0,
};

console.log(user?.age ?? 18);
console.log(user?.missing ?? 18);
~~~

**Answer:**

~~~text
0
18
~~~

Optional property access can return **undefined** for a missing property. Nullish coalescing preserves zero but supplies a default for undefined.

### 17. What is the output?

~~~js
console.log(null ?? "fallback");
console.log(undefined ?? "fallback");
console.log(false ?? true);
console.log("" ?? "text");
~~~

**Answer:**

~~~text
fallback
fallback
false

~~~

The last result is an empty string, which appears as a blank line. **??** only uses its fallback for **null** and **undefined**.

### 18. What is the output?

~~~js
console.log(0 || 10);
console.log(0 ?? 10);
console.log("" || "text");
console.log("" ?? "text");
~~~

**Answer:**

~~~text
10
0
text

~~~

**||** uses truthiness. **??** checks for nullish values only. The final line is an empty string.

### 19. Which messages are printed?

~~~js
function getKey() {
    console.log("key evaluated");
    return "name";
}

const missing = null;
const present = { name: "Asha" };

console.log(missing?.[getKey()]);
console.log(present?.[getKey()]);
~~~

**Answer:**

~~~text
undefined
key evaluated
Asha
~~~

The computed key expression is skipped for the nullish base and evaluated for the existing object.

### 20. What is the output?

~~~js
const api = {
    name: "service",
    send(message) {
        return this.name + ": " + message;
    },
};

console.log(api.send?.("ready"));
~~~

**Answer:**

~~~text
service: ready
~~~

The method call keeps **api** as the receiver for **this**.

### 21. What is the output?

~~~js
let callback;

console.log(callback?.("hello"));
~~~

**Answer:**

~~~text
undefined
~~~

The optional call skips the call because **callback** is undefined.

### 22. What happens here?

~~~js
const object = {
    method: 5,
};

// object.method?.();
~~~

**Answer:**

It throws a **TypeError** if uncommented.

The method value is not nullish, so optional call attempts to call it. Since a number is not callable, the call fails.

### 23. What is the output?

~~~js
const response = null;

console.log(response?.data.user.name);
~~~

**Answer:**

~~~text
undefined
~~~

The first optional access sees a nullish base and short-circuits the rest of the same continuous chain.

### 24. What happens here?

~~~js
const response = null;

// (response?.data).user;
~~~

**Answer:**

It throws a **TypeError** if uncommented.

The optional chain inside parentheses evaluates to **undefined**. The following **.user** access is outside that chain.

### 25. What is the output?

~~~js
const preferences = { theme: "dark" };
const missing = null;

console.log(delete preferences?.theme);
console.log(preferences.theme);
console.log(delete missing?.theme);
~~~

**Answer:**

~~~text
true
undefined
true
~~~

The first expression deletes the existing property. The optional delete on a nullish base returns **true** without a property access.

## True or false

### 26. Optional chaining short-circuits for every falsy value.

**Answer: False.**

It short-circuits only for **null** and **undefined**. It does not skip access just because a value is zero, false, or an empty string.

### 27. **object?.property** returns **null** when object is null.

**Answer: False.**

It evaluates to **undefined**.

### 28. **object?.a.b** protects both property accesses if **object.a** is null.

**Answer: False.**

It protects the initial **object** check. If **object** exists but **a** is nullish, the regular **.b** access can throw. Use **object?.a?.b** when both levels can be nullish.

### 29. **object?.method()** and **object.method?.()** check the same value.

**Answer: False.**

The first checks whether **object** is nullish. The second checks whether **object.method** is nullish.

### 30. A missing property accessed with **?.** produces **undefined**.

**Answer: True.**

If the base exists but has no such property, normal property lookup returns **undefined**.

### 31. Optional chaining catches errors thrown inside a called function.

**Answer: False.**

An exception from the function propagates normally. Optional chaining only skips the call when the checked value is nullish.

### 32. Parentheses can end a continuous optional chain.

**Answer: True.**

A normal property access after a parenthesized optional expression is no longer protected by that chain.

### 33. **??** treats an empty string as missing.

**Answer: False.**

An empty string is not nullish, so **"" ?? fallback** returns the empty string.

### 34. Optional chaining can be used on the left side of an assignment.

**Answer: False.**

An expression such as **object?.property = value** is invalid syntax.

### 35. The key expression in **object?.[getKey()]** is skipped when object is nullish.

**Answer: True.**

The optional chain stops before evaluating that computed property expression.

## Short-answer questions

### 36. What values does optional chaining check for?

**Answer:**

It checks whether the value at the optional point is **null** or **undefined**. Other falsy values do not trigger short-circuiting.

### 37. When should you write **object?.a?.b** instead of **object?.a.b**?

**Answer:**

Use **object?.a?.b** when either **object** or **object.a** may be nullish. The first form checks both levels. The second protects only **object**.

### 38. Explain the difference between **object?.method()** and **object.method?.()**.

**Answer:**

**object?.method()** checks whether the object is nullish before continuing. **object.method?.()** checks whether the method value is nullish before calling it. If a checked value exists but is not callable, the call still throws.

### 39. Why is **user?.age ?? 18** useful?

**Answer:**

Optional chaining safely reads the age when **user** may be missing. Nullish coalescing supplies **18** only if the result is **null** or **undefined**, preserving age **0**.

### 40. What does grouping change in **(object?.a).b**?

**Answer:**

Grouping ends the optional chain. If **object** is nullish, **object?.a** evaluates to **undefined**, and the following regular property access to **.b** throws.

### 41. Does optional chaining make a getter or function safe if it throws?

**Answer:**

No. A getter or function that is actually evaluated can throw normally. Use **try...catch** when the exception needs handling.

### 42. What happens to **this** in **object.method?.()**?

**Answer:**

When called in this form, the method is still called with **object** as its receiver, so **this** inside the method refers to **object**.

### 43. Why can't optional chaining be used for assignment?

**Answer:**

An optional chain can produce **undefined** instead of a property reference when its base is nullish. It is therefore not a valid assignment target. Check the base with an **if** statement before assigning.

## Coding questions

### 44. Safely read a nested email address and provide a default.

**Answer:**

~~~js
function emailOrDefault(account) {
    return account?.contact?.email ?? "No email provided";
}
~~~

Each potentially nullish level is checked. The default is used only when the final result is nullish.

### 45. Call an optional callback with a value.

**Answer:**

~~~js
function notifyIfAvailable(callback, message) {
    return callback?.(message);
}
~~~

The function call is skipped if the callback is **null** or **undefined**. A present non-function value still causes a **TypeError**.

### 46. Read a property using a key expression that should run only when the object exists.

**Answer:**

~~~js
function readProperty(object, makeKey) {
    return object?.[makeKey()];
}
~~~

If **object** is nullish, **makeKey()** is not called.

### 47. Choose a title while preserving an intentionally empty string.

**Answer:**

~~~js
function pageTitle(page) {
    return page?.metadata?.title ?? "Untitled";
}
~~~

The fallback is used only when a path value is nullish. If the title is **""**, the function preserves it.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [27 - Logical operators and short-circuiting](../lessons/027-logical-operators-and-short-circuiting.md) | [Open lesson](../lessons/028-optional-chaining-and-nullish-coalescing.md) | [Open example](../examples/028-optional-chaining-and-nullish-coalescing.md) | [29 - Bitwise operators and integer operations](../lessons/029-bitwise-operators-and-integer-operations.md) |
