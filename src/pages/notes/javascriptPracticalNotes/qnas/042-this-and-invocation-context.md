# 42 - this and invocation context - Q&A

Review how JavaScript determines **this** for regular functions, methods, arrows, constructors, and callbacks. Each answer appears directly after its question.

## Multiple-choice questions

### 1. In a regular function, what usually determines **this**?

A. The function's variable name  
B. The way the function is called  
C. The file name  
D. The function's return value

**Answer:** B. The way the function is called.

**Explanation:** Regular-function **this** is invocation-dependent. A method call, a bare call, and a constructor call can provide different values.

### 2. What is **this** in the call **account.show()**, when **show** is a regular function?

A. Always **globalThis**  
B. The object before the dot, **account**  
C. Always **undefined**  
D. The function's lexical parent

**Answer:** B. The object before the dot, **account**.

**Explanation:** The method call supplies the object before the dot as the receiver.

### 3. What usually happens to the receiver when a method is copied into a variable and called by itself?

A. The original object is remembered automatically  
B. The function becomes an arrow  
C. The object receiver is no longer supplied by the call  
D. The function can no longer run

**Answer:** C. The object receiver is no longer supplied by the call.

**Explanation:** **const method = object.method; method()** is a bare call. The former object is not part of that call expression.

### 4. In strict mode, what is **this** in a bare call of a regular function?

A. **undefined**  
B. **globalThis**  
C. The function itself  
D. The last object that used the function

**Answer:** A. **undefined**.

**Explanation:** Strict regular functions use the supplied **this** value exactly. A bare call supplies **undefined**.

### 5. What does a bare regular-function call do with **this** in non-strict code?

A. It always throws  
B. It converts **undefined** or **null** to the global object  
C. It uses the function's lexical parent  
D. It converts **this** to an arrow function

**Answer:** B. It converts **undefined** or **null** to the global object.

**Explanation:** This is legacy non-strict behavior. Avoid depending on it because it can hide a missing receiver.

### 6. How does an arrow function get **this**?

A. From the object before the dot  
B. From the caller's **thisArg**  
C. From the surrounding lexical context  
D. From **globalThis** in every case

**Answer:** C. From the surrounding lexical context.

**Explanation:** An arrow has no own **this** binding, so method-call syntax does not change its **this**.

### 7. What does **new User("Mina")** provide as **this** inside a constructor function?

A. The new instance being initialized  
B. The string **"Mina"**  
C. **undefined** in all cases  
D. The prototype object

**Answer:** A. The new instance being initialized.

**Explanation:** A constructor call creates an object and uses it as **this** while the constructor initializes it.

### 8. What is **this** in a nested regular function called as **report()**?

A. Automatically the outer method's receiver  
B. Determined by the nested function's own call  
C. Always the function that created it  
D. Always the global object

**Answer:** B. Determined by the nested function's own call.

**Explanation:** A nested regular function does not automatically inherit **this**. An arrow function does use its surrounding lexical **this**.

### 9. What does the **thisArg** argument to **map** do for a regular callback?

A. Supplies a receiver for the callback's **this**  
B. Changes the array being mapped  
C. Makes the callback asynchronous  
D. Supplies the callback's first parameter

**Answer:** A. Supplies a receiver for the callback's **this**.

**Explanation:** **map** passes its optional second argument as **this** for a regular callback. Arrow callbacks ignore it because they have lexical **this**.

### 10. In a browser event listener written with a regular function, what does **this** refer to?

A. Always the document  
B. The element on which the listener is registered  
C. The event object  
D. The callback's first argument

**Answer:** B. The element on which the listener is registered.

**Explanation:** A regular listener's **this** is the event's current target. The event object is passed as an argument.

### 11. Which function form is usually suitable for an object method that reads the object's own property through **this**?

A. An arrow function stored as the method  
B. A regular method  
C. A callback with no body  
D. A function called before it is assigned

**Answer:** B. A regular method.

**Explanation:** A regular method receives the object when called as **object.method()**. An arrow uses **this** from its surrounding lexical context.

### 12. Which statement about class code is correct?

A. It is non-strict by default  
B. It is strict mode code  
C. Class methods always use arrow semantics  
D. A class constructor can be called without **new**

**Answer:** B. It is strict mode code.

**Explanation:** Class bodies are strict. A class constructor called without **new** throws a **TypeError**.

## True or false

### 13. A regular function permanently remembers the object where it was first stored.

**Answer:** False.

**Explanation:** The call form supplies the regular function's receiver. Storing a method on an object does not permanently bind it to that object.

### 14. Calling **object.method()** supplies **object** as the receiver for a regular method.

**Answer:** True.

**Explanation:** The object expression before the dot supplies the method call's **this** value.

### 15. An arrow function gets a new **this** value from **object.arrowMethod()**.

**Answer:** False.

**Explanation:** Arrows do not create their own **this**. They use the surrounding lexical **this**.

### 16. A nested regular function automatically gets the same **this** as its containing method.

**Answer:** False.

**Explanation:** The nested function has its own invocation. Use an arrow or an explicit binding technique when the surrounding receiver is needed.

### 17. A strict bare function call has **this** equal to **undefined**.

**Answer:** True.

**Explanation:** A strict function does not convert the supplied **undefined** value to the global object.

### 18. The **thisArg** argument of **map** changes an arrow callback's **this**.

**Answer:** False.

**Explanation:** An arrow has lexical **this** and ignores a receiver supplied at the call site.

### 19. The first argument to a browser event listener is the event object.

**Answer:** True.

**Explanation:** The browser passes the event as the callback argument. With a regular listener, **this** refers to the current target element.

### 20. A constructor function called with **new** initializes the new instance through **this**.

**Answer:** True.

**Explanation:** The newly created object is used as the constructor's receiver.

### 21. A function's **this** is the same thing as its lexical outer variables.

**Answer:** False.

**Explanation:** Lexical variables are looked up through the written scope structure. Regular-function **this** is determined by the invocation.

### 22. An arrow function can be used with **new** as a constructor.

**Answer:** False.

**Explanation:** Arrow functions do not have constructor behavior and cannot be called with **new**.

## Short-answer questions

### 23. How do you determine **this** for a regular function?

**Answer:** Inspect how that function is invoked.

**Explanation:** Look for method-call syntax, a bare call, a **new** call, or an explicit binding operation. The next chapter covers **call**, **apply**, and **bind**.

### 24. Why can a detached method fail when it reads **this.name**?

**Answer:** The detached function may be called without the original object as its receiver.

**Explanation:** In strict mode, **this** is then **undefined**, so reading **this.name** throws a **TypeError**.

### 25. What is the key difference between regular-function and arrow-function **this**?

**Answer:** A regular function receives **this** from its invocation. An arrow uses **this** from its surrounding lexical context.

**Explanation:** This difference determines whether method calls, callback receivers, and nested functions can change **this**.

### 26. Why are arrow functions often useful inside an object method?

**Answer:** A nested arrow can use the surrounding method's **this**.

**Explanation:** The method is called with an object receiver, and the arrow inherits that receiver lexically. This is useful for nested callbacks.

### 27. Why should an arrow function usually not be used for an object method that needs **this** to mean the object?

**Answer:** The arrow does not receive the object as **this** from the method call.

**Explanation:** It uses the **this** value from where the arrow was created. Use method shorthand or a regular function when the receiver object is needed.

### 28. How can a constructor function set an instance property?

**Answer:** Assign the property to **this** inside the constructor and call it with **new**.

**Explanation:** The **new** call creates an instance and provides that instance as **this** during initialization.

### 29. What is the difference between **this** and **event.currentTarget** in an event listener?

**Answer:** With a regular browser listener, **this** is the current target. **event.currentTarget** explicitly reads the current target from the event.

**Explanation:** Explicitly using **event.currentTarget** can make the intended element clearer, and it also works when the listener is an arrow.

### 30. Why should code avoid relying on the non-strict global conversion for a bare call?

**Answer:** A missing object receiver can silently become the global object.

**Explanation:** That can cause confusing state changes or bugs instead of making the missing receiver obvious. Strict mode exposes it as **undefined**.

### 31. Does **map** automatically use the object from which a callback method was taken?

**Answer:** No.

**Explanation:** Passing **object.method** passes the function value. When **map** invokes it, it does not restore the original object as the receiver. Use a wrapper or an explicit binding when needed.

### 32. What should you check if a callback's **this** value is unexpected?

**Answer:** Check whether the callback is regular or arrow, and check how the API invokes it.

**Explanation:** A regular callback may receive a documented **thisArg** or API-specific receiver. An arrow always uses its surrounding lexical **this**.

## Coding and output questions

### 33. What is printed?

~~~js
const first = {
    name: "Asha",
    readName() {
        return this.name;
    }
};

const second = {
    name: "Mina",
    readName: first.readName
};

console.log(first.readName());
console.log(second.readName());
~~~

**Answer:**

~~~text
Asha
Mina
~~~

**Explanation:** Both objects refer to the same function, but each method call supplies the object before the dot as **this**.

### 34. What happens?

~~~js
"use strict";

const user = {
    name: "Asha",
    getName() {
        return this.name;
    }
};

const readName = user.getName;
console.log(readName());
~~~

**Answer:** It throws a **TypeError** while trying to read **name** from **undefined**.

**Explanation:** **readName()** is a bare strict-mode call. The former **user** receiver is not supplied.

### 35. What is printed?

~~~js
"use strict";

const user = {
    name: "Mina",
    show() {
        const getName = () => this.name;
        console.log(getName());
    }
};

user.show();
~~~

**Answer:**

~~~text
Mina
~~~

**Explanation:** The arrow uses **this** from **show**. Since **show** is called as **user.show()**, its receiver is **user**.

### 36. What is printed?

~~~js
"use strict";

const user = {
    name: "Mina",
    show() {
        function getName() {
            return this;
        }

        console.log(getName() === undefined);
    }
};

user.show();
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** **getName()** is a bare call of a regular function in strict mode. It does not inherit **user** as its receiver.

### 37. What is printed?

~~~js
const user = {
    name: "Asha",
    getName: () => this.name
};
~~~

**Answer:** There is no single portable name result to print from this snippet. **getName** reads the surrounding **this**, not **user**.

**Explanation:** The arrow's **this** depends on the outer execution context. Calling **user.getName()** does not change it. If this code is in a module, top-level **this** is **undefined**, so reading **this.name** throws a **TypeError** when called.

### 38. What is printed?

~~~js
function User(name) {
    this.name = name;
}

const user = new User("Dev");
console.log(user.name);
~~~

**Answer:**

~~~text
Dev
~~~

**Explanation:** **new** creates the instance and supplies it as **this** inside **User**.

### 39. What is printed?

~~~js
const multiplier = { factor: 4 };

const values = [2, 3];
const results = values.map(function (value) {
    return value * this.factor;
}, multiplier);

console.log(results);
~~~

**Answer:**

~~~text
[ 8, 12 ]
~~~

**Explanation:** **map** supplies **multiplier** as **this** for the regular callback because it is given as the second argument.

### 40. What happens if the callback in the previous question is changed to an arrow?

**Answer:** The arrow ignores the **thisArg** argument and uses its surrounding **this** instead. Depending on that surrounding context, the calculation may produce a different result or an error.

**Explanation:** Arrow functions do not have an invocation-provided **this**. Use a regular callback for **thisArg**, or capture the needed property in a local variable and use an arrow.

### 41. In a browser, what does this regular event listener log when a button is clicked?

~~~js
button.addEventListener("click", function (event) {
    console.log(this === event.currentTarget);
});
~~~

A. **true**  
B. **false**  
C. **undefined**  
D. It does not run

**Answer:** A. **true**.

**Explanation:** For a regular listener registered with **addEventListener**, **this** is the element on which the listener is registered, which is the event's **currentTarget**.

### 42. Why does the same function print two different names here?

~~~js
function showName() {
    console.log(this.name);
}

const first = { name: "First", show: showName };
const second = { name: "Second", show: showName };

first.show();
second.show();
~~~

**Answer:**

~~~text
First
Second
~~~

**Explanation:** **this** is supplied by each method call. The function body is the same, but its receiver changes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [41 - Lexical scope and closures](041-lexical-scope-and-closures.md) | [Open lesson](../lessons/042-this-and-invocation-context.md) | [Open example](../examples/042-this-and-invocation-context.md) | [43 - call, apply, and bind](043-call-apply-and-bind.md) |