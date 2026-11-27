# 43 - call, apply, and bind - Q&A

Review how **call**, **apply**, and **bind** supply receivers and arguments. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What does **call** do?

A. Creates a new function without invoking the target  
B. Invokes the target immediately with separate arguments  
C. Converts an object to an array  
D. Delays a function until a later event

**Answer:** B. It invokes the target immediately with separate arguments.

**Explanation:** The first argument is the receiver for **this**. Remaining arguments are passed individually.

### 2. What does **apply** use for its arguments?

A. One array-like argument collection  
B. A callback name as a string  
C. Only individual arguments  
D. A promise

**Answer:** A. One array-like argument collection.

**Explanation:** **apply** invokes immediately with a receiver and an array or array-like value containing the target's arguments.

### 3. What does **bind** return?

A. The target function's return value  
B. A new function with a preset receiver and optional preset arguments  
C. An array of arguments  
D. A promise that runs the function later

**Answer:** B. A new function with a preset receiver and optional preset arguments.

**Explanation:** **bind** prepares a callable function. The target does not run until the bound function is called.

### 4. Which method should you use when the function should run immediately and arguments are separate?

A. **bind**  
B. **apply**  
C. **call**  
D. **map**

**Answer:** C. **call**.

**Explanation:** **call** invokes immediately and accepts arguments one by one.

### 5. Which method should you use when the function should run immediately and arguments are already in an array?

A. **apply**  
B. **bind**  
C. **call**  
D. **filter**

**Answer:** A. **apply**.

**Explanation:** **apply** accepts the arguments as one array-like collection.

### 6. Which method should you use to make a callback that keeps an object's receiver for later?

A. **call**  
B. **apply**  
C. **bind**  
D. **reduce**

**Answer:** C. **bind**.

**Explanation:** **bind** returns a new function that retains the specified receiver for later calls.

### 7. What is the first argument to **call**, **apply**, or **bind**?

A. The function's first normal parameter  
B. The intended **this** value  
C. The function's return value  
D. The number of arguments

**Answer:** B. The intended **this** value.

**Explanation:** Normal arguments come after that receiver argument. **apply** then takes those normal arguments together in an array-like value.

### 8. In **greet.bind(user, "Hello")**, what does the string **"Hello"** do?

A. It becomes the preset value of **this**  
B. It is a preset leading argument  
C. It is passed as the last argument on every call  
D. It calls **greet** immediately

**Answer:** B. It is a preset leading argument.

**Explanation:** The first argument after **user** is saved as the first normal argument for each later call.

### 9. Can a later **call** replace a bound function's receiver?

A. Yes, always  
B. No, the original bound receiver is retained  
C. Only if the receiver is an object  
D. Only for arrow functions

**Answer:** B. No, the original bound receiver is retained.

**Explanation:** A bound function keeps the receiver set by its initial **bind** call. Later **call** or **apply** receiver arguments do not override it.

### 10. Can **call** change an arrow function's **this**?

A. Yes, because it always overrides lexical values  
B. No, an arrow uses lexical **this**  
C. Only when **thisArg** is an array  
D. Only in strict mode

**Answer:** B. No, an arrow uses lexical **this**.

**Explanation:** Arrow functions do not have their own receiver binding. **call**, **apply**, and **bind** cannot replace that lexical **this**.

### 11. What happens to a bound constructor's receiver when it is called with **new**?

A. The bound receiver is always used as the instance  
B. The new instance is used as **this**  
C. The constructor becomes an arrow  
D. **new** is ignored

**Answer:** B. The new instance is used as **this**.

**Explanation:** Construction creates a new instance. The bound receiver is ignored for that construction, while preset arguments are still passed.

### 12. What does **apply** do if its argument collection is **null** or **undefined**?

A. Throws a **TypeError** before calling the target  
B. Calls the target with no normal arguments  
C. Passes the word **"null"** as an argument  
D. Calls the target with one undefined argument

**Answer:** B. It calls the target with no normal arguments.

**Explanation:** A nullish argument collection is treated as an empty list for **apply**.

## True or false

### 13. **call** invokes the target function immediately.

**Answer:** True.

**Explanation:** The return value of the target call is returned by **call**.

### 14. **apply** takes each normal argument as a separate parameter after the receiver.

**Answer:** False.

**Explanation:** **apply** takes one array-like collection containing the target's normal arguments.

### 15. **bind** invokes the target as soon as it is called.

**Answer:** False.

**Explanation:** **bind** returns a new function. The target runs when that returned function is called.

### 16. Arguments preset with **bind** come before arguments supplied later.

**Answer:** True.

**Explanation:** Bound arguments are placed at the beginning of the target's argument list.

### 17. A bound function's receiver can be changed by calling **bind** on it again.

**Answer:** False.

**Explanation:** A subsequent binding does not replace the receiver already bound to the function.

### 18. **bind** can set a different **this** for an arrow function.

**Answer:** False.

**Explanation:** An arrow's **this** is lexical. **bind** may still preset arguments, but the receiver is ignored.

### 19. A bound constructor can receive preset arguments when constructed with **new**.

**Answer:** True.

**Explanation:** The bound receiver is ignored for construction, but the preset arguments are still included.

### 20. **call** and **apply** return the value produced by the target function.

**Answer:** True.

**Explanation:** They perform the function call and return its result.

### 21. **call**, **apply**, and **bind** always convert **null** to the global object before invoking the function.

**Answer:** False.

**Explanation:** They pass the receiver as specified. The target function's strictness determines how a regular function treats it. Strict functions preserve **null**; non-strict functions apply legacy conversion behavior.

### 22. Spread syntax can pass array values as individual arguments, but it does not itself supply **this**.

**Answer:** True.

**Explanation:** **fn(...values)** spreads values into separate arguments. Use **call** or another explicit receiver technique when a function also needs a receiver.

## Short-answer questions

### 23. State the difference between **call** and **apply**.

**Answer:** Both invoke immediately and can provide a receiver. **call** takes normal arguments separately, while **apply** takes them from an array-like collection.

**Explanation:** For example, **fn.call(receiver, a, b)** corresponds to **fn.apply(receiver, [a, b])**.

### 24. State the difference between **call** and **bind**.

**Answer:** **call** invokes the function immediately. **bind** returns a new function for a later call.

**Explanation:** Use **call** for a one-time invocation. Use **bind** when a reusable callback should keep a receiver or preset arguments.

### 25. What is partial application with **bind**?

**Answer:** It is creating a function with one or more leading arguments preset.

**Explanation:** Later calls supply only the remaining arguments. Preset arguments come before the later ones.

### 26. Why does a bound function keep its receiver when passed as a callback?

**Answer:** The receiver is stored in the function returned by **bind**.

**Explanation:** When the callback API calls the bound function without an object receiver, the bound function still calls its target with the saved receiver.

### 27. What happens when a strict function is called with **call(null)**?

**Answer:** Inside the target function, **this** is **null**.

**Explanation:** Strict functions use the supplied receiver as-is. A non-strict regular function applies legacy conversion rules.

### 28. Can a bound arrow function change the arrow's **this**?

**Answer:** No.

**Explanation:** The arrow continues to use its lexical **this**. **bind** can still preset normal arguments for the arrow.

### 29. What does construction with **new** change for a bound constructor?

**Answer:** The new instance becomes **this**, and the bound receiver is ignored.

**Explanation:** Any arguments preset with **bind** are still passed to the target constructor.

### 30. When might a wrapper callback be clearer than **bind**?

**Answer:** Use a wrapper when the callback needs argument transformation, a small extra action, or clearer visible method invocation.

**Explanation:** A wrapper such as **value => object.method(value)** shows exactly which object receives the method call.

### 31. How can you use **apply** with an array-like object?

**Answer:** Pass the object as the argument collection if it has indexed values and a **length**.

**Explanation:** **apply** reads the array-like values as the target function's arguments.

### 32. Why do **call**, **apply**, and **bind** not override a bound receiver on a later call?

**Answer:** The receiver is part of the bound function's stored configuration.

**Explanation:** A later invocation's **thisArg** does not replace the receiver captured when the function was bound.

## Coding and output questions

### 33. What is printed?

~~~js
function introduce(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Asha" };

console.log(introduce.call(user, "Hello", "!"));
~~~

**Answer:**

~~~text
Hello, Asha!
~~~

**Explanation:** **call** supplies **user** as **this** and passes the two normal arguments separately.

### 34. What is printed?

~~~js
function introduce(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
}

const user = { name: "Mina" };

console.log(introduce.apply(user, ["Welcome", "."]));
~~~

**Answer:**

~~~text
Welcome, Mina.
~~~

**Explanation:** **apply** supplies **user** as **this** and reads the normal arguments from the array.

### 35. When is **introduce** called, and what is printed?

~~~js
function introduce(greeting) {
    return greeting + ", " + this.name;
}

const user = { name: "Dev" };
const greetUser = introduce.bind(user, "Hi");

console.log("Created");
console.log(greetUser());
~~~

**Answer:**

~~~text
Created
Hi, Dev
~~~

**Explanation:** **bind** creates **greetUser** without invoking **introduce**. The target runs when **greetUser()** is called.

### 36. What is printed?

~~~js
function join(first, second, third) {
    return first + "-" + second + "-" + third;
}

const joinWithStart = join.bind(null, "A");

console.log(joinWithStart("B", "C"));
~~~

**Answer:**

~~~text
A-B-C
~~~

**Explanation:** **"A"** is preset as the first argument. The later arguments fill the second and third positions.

### 37. What is printed?

~~~js
function getName() {
    return this.name;
}

const first = { name: "Asha" };
const second = { name: "Mina" };
const fixed = getName.bind(first);

console.log(fixed());
console.log(fixed.call(second));
~~~

**Answer:**

~~~text
Asha
Asha
~~~

**Explanation:** **fixed** keeps **first** as its receiver. **call(second)** cannot replace the receiver already set by **bind**.

### 38. What is printed?

~~~js
function add(a, b, c) {
    return a + b + c;
}

console.log(add.call(null, 1, 2, 3));
console.log(add.apply(null, [1, 2, 3]));
~~~

**Answer:**

~~~text
6
6
~~~

**Explanation:** Both methods invoke **add** with the same normal arguments. They differ only in how those arguments are supplied.

### 39. What is printed?

~~~js
"use strict";

function readThis() {
    return this;
}

console.log(readThis.call(null) === null);
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** The strict function receives the **null** receiver exactly as supplied.

### 40. Does this code print **"Asha"**?

~~~js
"use strict";

const arrow = () => this.name;
const user = { name: "Asha" };

console.log(arrow.call(user));
~~~

**Answer:** Not because of **user**. The arrow ignores the receiver passed to **call**.

**Explanation:** The result depends on the surrounding **this** where the arrow was created. In a module, top-level **this** is **undefined**, so reading **name** throws a **TypeError**.

### 41. What is printed?

~~~js
function User(name, role) {
    this.name = name;
    this.role = role;
}

const makeAdmin = User.bind({ ignored: true }, "Mina");
const admin = new makeAdmin("admin");

console.log(admin.name);
console.log(admin.role);
console.log(Object.hasOwn(admin, "ignored"));
~~~

**Answer:**

~~~text
Mina
admin
false
~~~

**Explanation:** **new** creates an instance and supplies it as **this**, so the bound receiver is ignored. The preset name and later role arguments are still passed to the constructor.

### 42. What does this borrowed method return?

~~~js
const values = {
    0: 3,
    1: 5,
    length: 2
};

const doubled = Array.prototype.map.call(values, function (value) {
    return value * 2;
});

console.log(doubled);
~~~

**Answer:**

~~~text
[ 6, 10 ]
~~~

**Explanation:** **call** supplies the array-like object as the receiver for **map**. The callback doubles each indexed value, and **map** returns a new array.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [42 - this and invocation context](042-this-and-invocation-context.md) | [Open lesson](../lessons/043-call-apply-and-bind.md) | [Open example](../examples/043-call-apply-and-bind.md) | [44 - Recursion and the call stack](044-recursion-and-the-call-stack.md) |