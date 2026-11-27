# 42 - this and invocation context - Examples

These examples show how call form affects **this** for regular functions and how arrow functions use lexical **this**. Each example includes a question, code, expected result, and explanation.

## 1. Use one method with two receivers

### Question

Can the same regular function use the receiver from different method calls?

### Code

~~~js
function showName() {
    return this.name;
}

const firstUser = {
    name: "Asha",
    show: showName
};

const secondUser = {
    name: "Mina",
    show: showName
};

console.log(firstUser.show());
console.log(secondUser.show());
~~~

### Expected output

~~~text
Asha
Mina
~~~

### Explanation

The function is not permanently attached to either object. Each method call supplies the object before the dot as **this**.

## 2. See a detached method in strict mode

### Question

What happens if a strict-mode method is copied and called by itself?

### Code

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

### Expected result

The call throws a **TypeError** because **this** is **undefined** and the code tries to read **name** from it.

### Explanation

The expression **readName()** is a bare call. The **user** object is no longer the receiver. Strict mode does not replace the missing receiver with the global object.

## 3. A nested regular function has its own invocation

### Question

Does a nested regular function automatically use the outer method's **this**?

### Code

~~~js
"use strict";

const team = {
    name: "North",
    report() {
        function readReceiver() {
            return this;
        }

        console.log(readReceiver() === undefined);
    }
};

team.report();
~~~

### Expected output

~~~text
true
~~~

### Explanation

**readReceiver()** is a separate bare call. Its **this** is determined by that call, not by where the function was written.

## 4. Use an arrow to keep the surrounding method's this

### Question

How can a nested callback use the receiver of its containing method?

### Code

~~~js
"use strict";

const team = {
    name: "North",
    report() {
        const readName = () => this.name;
        console.log(readName());
    }
};

team.report();
~~~

### Expected output

~~~text
North
~~~

### Explanation

The arrow has no own **this**. It reads the **this** value of **report**, which is **team** because the call is **team.report()**.

## 5. Show that an arrow uses its lexical receiver

### Question

What value does an arrow method read if it is created inside a method called on an outer object?

### Code

~~~js
const outer = {
    value: "outer receiver",
    createInner() {
        return {
            value: "inner object",
            read: () => this.value
        };
    }
};

const inner = outer.createInner();
console.log(inner.read());
~~~

### Expected output

~~~text
outer receiver
~~~

### Explanation

The arrow is created while **createInner** is running with **outer** as its receiver. Calling **inner.read()** does not change the arrow's lexical **this** to **inner**.

## 6. Prefer a regular method when this should be the object

### Question

How should an object method read a property from its own object?

### Code

~~~js
const product = {
    name: "Notebook",
    describe() {
        return "Product: " + this.name;
    }
};

console.log(product.describe());
~~~

### Expected output

~~~text
Product: Notebook
~~~

### Explanation

Method shorthand creates a regular method. The call **product.describe()** supplies **product** as its receiver.

## 7. Initialize an instance with a constructor function

### Question

How does a constructor function assign values to a new instance?

### Code

~~~js
function User(name) {
    this.name = name;
}

const user = new User("Dev");
console.log(user.name);
~~~

### Expected output

~~~text
Dev
~~~

### Explanation

The **new** call creates an instance and supplies it as **this** while **User** runs.

## 8. Use this in a class instance

### Question

How can a class method update the current instance?

### Code

~~~js
class Counter {
    constructor(start) {
        this.value = start;
    }

    increment() {
        this.value += 1;
    }
}

const counter = new Counter(4);
counter.increment();
counter.increment();

console.log(counter.value);
~~~

### Expected output

~~~text
6
~~~

### Explanation

The constructor initializes **this.value** on the new instance. Each **counter.increment()** method call uses **counter** as its receiver.

## 9. Supply a thisArg to map

### Question

How can a regular array callback use a multiplier object as **this**?

### Code

~~~js
const multiplier = {
    factor: 5
};

const values = [1, 2, 3];

const results = values.map(function (value) {
    return value * this.factor;
}, multiplier);

console.log(results);
~~~

### Expected output

~~~text
[ 5, 10, 15 ]
~~~

### Explanation

The second argument to **map** is a **thisArg** for its regular callback. The callback uses that object as **this**.

## 10. Use a local value with an arrow callback

### Question

How can an arrow callback use a value without relying on callback **this**?

### Code

~~~js
const multiplier = {
    factor: 5
};

const values = [1, 2, 3];
const factor = multiplier.factor;

const results = values.map(value => value * factor);

console.log(results);
~~~

### Expected output

~~~text
[ 5, 10, 15 ]
~~~

### Explanation

The arrow reads **factor** from lexical scope. This avoids depending on a callback **thisArg**.

## 11. Avoid losing a method receiver in a callback

### Question

How can an array callback safely call an object's method?

### Code

~~~js
"use strict";

const formatter = {
    prefix: "Item",
    format(value) {
        return this.prefix + ": " + value;
    }
};

const values = [1, 2];

const labels = values.map(value => formatter.format(value));
console.log(labels);
~~~

### Expected output

~~~text
[ 'Item: 1', 'Item: 2' ]
~~~

### Explanation

The arrow callback calls **formatter.format(value)** as a method each time, so **formatter** is supplied as the receiver. Passing **formatter.format** directly to **map** would not preserve that receiver.

## 12. Compare passing a method directly with a wrapper

### Question

Why is this wrapper useful when the callback must call a method?

### Code

~~~js
"use strict";

const user = {
    name: "Mina",
    getName() {
        return this.name;
    }
};

const readNames = [user].map(function (item) {
    return item.getName();
});

console.log(readNames);
~~~

### Expected output

~~~text
[ 'Mina' ]
~~~

### Explanation

The callback receives the **user** object as **item**, then calls **item.getName()** as a method. This call supplies the correct receiver. A direct **map(user.getName)** call would invoke the function without **user** as its receiver.

## 13. Observe that an arrow ignores map's thisArg

### Question

Does passing a **thisArg** change the **this** used by an arrow callback?

### Code

~~~js
const multiplier = {
    factor: 5
};

const values = [1, 2];

const results = values.map(
    value => value * multiplier.factor,
    { factor: 100 }
);

console.log(results);
~~~

### Expected output

~~~text
[ 5, 10 ]
~~~

### Explanation

The arrow reads the local **multiplier** variable. The second argument to **map** does not set an arrow's **this**.

## 14. Use this in a browser event listener

### Question

In a browser, does a regular event listener's **this** match the event's **currentTarget**?

### Code

~~~js
button.addEventListener("click", function (event) {
    console.log(this === event.currentTarget);
});
~~~

### Expected output after clicking the button

~~~text
true
~~~

### Explanation

For a regular listener registered with **addEventListener**, **this** is the element on which the listener is registered. The event object is also passed as the first argument. This example assumes **button** refers to a browser element.

## 15. Use event.currentTarget with an arrow listener

### Question

How can an arrow event listener explicitly access the element whose listener is running?

### Code

~~~js
button.addEventListener("click", event => {
    console.log(event.currentTarget === button);
});
~~~

### Expected output after clicking the button

~~~text
true
~~~

### Explanation

The arrow does not receive **this** from the event system. **event.currentTarget** explicitly identifies the element handling the event.

## 16. Compare a method call with a bare call

### Question

What does each call use as **this** in strict mode?

### Code

~~~js
"use strict";

function readName() {
    return this.name;
}

const user = {
    name: "Asha",
    readName
};

console.log(user.readName());
console.log(readName());
~~~

### Expected result

The first call prints **Asha**. The second call throws a **TypeError**.

### Explanation

**user.readName()** is a method call, so **user** is supplied as **this**. **readName()** is a bare call, so strict mode gives it **undefined**.

## Practice prompts

1. Create one regular function and call it as a method of two objects with different names.
2. Detach a method in strict mode and explain why its receiver is missing.
3. Write a nested regular callback and then rewrite it as an arrow. Compare **this**.
4. Create a constructor that stores a value on each new instance.
5. Use **map** with a regular callback and a **thisArg**.
6. Rewrite that callback to use a local variable and an arrow.
7. Write a browser event listener that logs **event.currentTarget**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [41 - Lexical scope and closures](041-lexical-scope-and-closures.md) | [Open lesson](../lessons/042-this-and-invocation-context.md) | [Open Q&A](../qnas/042-this-and-invocation-context.md) | [43 - call, apply, and bind](043-call-apply-and-bind.md) |