# 61 - Classes: fields and methods: examples

These examples demonstrate how JavaScript classes create instances, initialize public fields, share methods, and define accessors and static operations. Each example includes a question, complete code, expected output, and an explanation.

## 1. Create an instance with a constructor

### Question

How can a class initialize data on a new object?

### Code

~~~js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return "I am " + this.name + " and I am " + this.age + ".";
    }
}

const person = new Person("Asha", 28);

console.log(person.name);
console.log(person.introduce());
console.log(person instanceof Person);
~~~

### Expected output

~~~text
Asha
I am Asha and I am 28.
true
~~~

### Explanation

**new** creates the instance and calls the constructor with that object as **this**. The assignments create own properties on the instance.

## 2. Inspect instance fields

### Question

Are constructor assignments own properties on the instance?

### Code

~~~js
class Profile {
    constructor(name) {
        this.name = name;
    }
}

const profile = new Profile("Mina");

console.log(Object.hasOwn(profile, "name"));
console.log(Object.hasOwn(Profile.prototype, "name"));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

The constructor writes **name** to the new instance. It is not a field on the class prototype.

## 3. Initialize an array separately for every instance

### Question

Does a public array field share one array across instances?

### Code

~~~js
class ShoppingCart {
    items = [];

    add(item) {
        this.items.push(item);
    }
}

const firstCart = new ShoppingCart();
const secondCart = new ShoppingCart();

firstCart.add("Notebook");

console.log(firstCart.items);
console.log(secondCart.items);
console.log(firstCart.items === secondCart.items);
~~~

### Expected output

~~~text
[ 'Notebook' ]
[]
false
~~~

### Explanation

The field initializer runs for each instance. Each cart receives a distinct array.

## 4. Observe when fields initialize

### Question

What value does a field read before the constructor body changes it?

### Code

~~~js
class Order {
    status = "new";
    initialStatus = this.status;

    constructor() {
        this.status = "paid";
    }
}

const order = new Order();

console.log(order.status);
console.log(order.initialStatus);
~~~

### Expected output

~~~text
paid
new
~~~

### Explanation

In a base class, fields initialize in declaration order before the constructor body. The constructor later changes **status**, while **initialStatus** keeps the earlier value.

## 5. Initialize a field from earlier fields

### Question

Can a field initializer use values from earlier field declarations?

### Code

~~~js
class Dimensions {
    width = 8;
    height = 5;
    area = this.width * this.height;
}

const dimensions = new Dimensions();

console.log(dimensions.area);
~~~

### Expected output

~~~text
40
~~~

### Explanation

Fields initialize from top to bottom. When **area** runs, **width** and **height** have already been initialized.

## 6. Share a class method between instances

### Question

Where is a method declared in the class body stored?

### Code

~~~js
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    describe() {
        return this.title + " by " + this.author;
    }
}

const firstBook = new Book("River Town", "Mina Shah");
const secondBook = new Book("Bright Sky", "Dev Rao");

console.log(firstBook.describe());
console.log(secondBook.describe());
console.log(firstBook.describe === secondBook.describe);
console.log(Object.hasOwn(firstBook, "describe"));
~~~

### Expected output

~~~text
River Town by Mina Shah
Bright Sky by Dev Rao
true
false
~~~

### Explanation

The method is shared on **Book.prototype**. The title and author belong to each instance.

## 7. Check method enumerability

### Question

Does **Object.keys** list class methods on the prototype?

### Code

~~~js
class Note {
    save() {
        return "saved";
    }
}

const note = new Note();

console.log(note.save());
console.log(Object.hasOwn(Note.prototype, "save"));
console.log(Object.keys(Note.prototype));
console.log(Object.keys(note));
~~~

### Expected output

~~~text
saved
true
[]
[]
~~~

### Explanation

The method is an own property of **Note.prototype**, but class methods are non-enumerable. The instance has no own enumerable fields.

## 8. Use the call receiver as this

### Question

Can a class method be called with an object other than the instance it came from?

### Code

~~~js
class Formatter {
    format() {
        return "Item: " + this.name;
    }
}

const formatter = new Formatter();
const externalObject = { name: "Pencil" };

console.log(formatter.format.call(externalObject));
~~~

### Expected output

~~~text
Item: Pencil
~~~

### Explanation

A method's **this** comes from its call receiver. **call** explicitly supplies **externalObject** as **this**.

## 9. Catch a detached method call

### Question

Does extracting a class method preserve its original instance as **this**?

### Code

~~~js
class Greeter {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return "Hello, " + this.name;
    }
}

const greeter = new Greeter("Mina");
const detachedGreet = greeter.greet;

try {
    detachedGreet();
} catch (error) {
    console.log(error instanceof TypeError);
}
~~~

### Expected output

~~~text
true
~~~

### Explanation

The method is not automatically bound to **greeter**. Class methods are strict, so a detached call has **this** as **undefined**. Reading **this.name** throws a **TypeError**.

## 10. Bind a method for use as a callback

### Question

How can a detached method keep using its original instance?

### Code

~~~js
class Greeter {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return "Hello, " + this.name;
    }
}

const greeter = new Greeter("Mina");
const callback = greeter.greet.bind(greeter);

console.log(callback());
~~~

### Expected output

~~~text
Hello, Mina
~~~

### Explanation

**bind** returns a function whose **this** is fixed to **greeter**.

## 11. Calculate a value with a getter

### Question

How can a class expose a calculated value as a property?

### Code

~~~js
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }
}

const rectangle = new Rectangle(6, 4);

console.log(rectangle.area);
console.log(Object.hasOwn(rectangle, "area"));
~~~

### Expected output

~~~text
24
false
~~~

### Explanation

Reading **rectangle.area** invokes the getter on **Rectangle.prototype**. The getter calculates the value from the instance's own width and height.

## 12. Validate assignments with a setter

### Question

How can a setter reject invalid values and preserve the last valid value?

### Code

~~~js
class Score {
    set value(number) {
        if (typeof number !== "number" || number < 0) {
            throw new RangeError("Score must be a non-negative number.");
        }

        this._value = number;
    }

    get value() {
        return this._value;
    }
}

const score = new Score();
score.value = 8;

console.log(score.value);

try {
    score.value = -1;
} catch (error) {
    console.log(error instanceof RangeError);
}

console.log(score.value);
~~~

### Expected output

~~~text
8
true
8
~~~

### Explanation

The setter validates before changing the stored value. The invalid assignment throws, leaving the previous value intact. **_value** is still a public property; the underscore is only a convention.

## 13. Call a static factory method

### Question

How can a class provide a method that creates instances from alternate input?

### Code

~~~js
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) * 5 / 9);
    }

    toFahrenheit() {
        return this.celsius * 9 / 5 + 32;
    }
}

const room = Temperature.fromFahrenheit(68);

console.log(room.celsius);
console.log(room.toFahrenheit());
console.log(typeof room.fromFahrenheit);
~~~

### Expected output

~~~text
20
68
undefined
~~~

### Explanation

Call the static method on the class. It returns an instance, but the factory itself is not an instance method.

## 14. Use a class expression

### Question

Can a class value be assigned to a variable and used to construct objects?

### Code

~~~js
const Product = class {
    constructor(name) {
        this.name = name;
    }
};

const product = new Product("Notebook");

console.log(product.name);
console.log(product instanceof Product);
~~~

### Expected output

~~~text
Notebook
true
~~~

### Explanation

A class expression evaluates to a class value. It can be assigned and used with **new**, just like a declared class.

## 15. Observe the temporal dead zone

### Question

Can a class declaration be accessed before its declaration executes?

### Code

~~~js
try {
    console.log(typeof Panel);
} catch (error) {
    console.log(error instanceof ReferenceError);
}

class Panel {}

console.log(typeof Panel);
~~~

### Expected output

~~~text
true
function
~~~

### Explanation

Before the declaration executes, the lexical binding is in its temporal dead zone. Even **typeof** throws during that period. After the declaration, the class value has type **function**.

## 16. Catch a class call without new

### Question

What happens if a class is called as an ordinary function?

### Code

~~~js
class Message {
    constructor(text) {
        this.text = text;
    }
}

try {
    Message("Hello");
} catch (error) {
    console.log(error instanceof TypeError);
}

const message = new Message("Hello");
console.log(message.text);
~~~

### Expected output

~~~text
true
Hello
~~~

### Explanation

Classes must be constructed with **new**. A plain function call throws a **TypeError**.

## 17. Construct a class without a declared constructor

### Question

Does a class need an explicit constructor to create instances?

### Code

~~~js
class Empty {}

const value = new Empty("ignored");

console.log(value instanceof Empty);
console.log(Object.keys(value));
~~~

### Expected output

~~~text
true
[]
~~~

### Explanation

JavaScript provides a default constructor when the class has none. It creates an instance but does not assign the passed argument to a property.

## 18. Compare a function field with a prototype method

### Question

Which function is shared, and which function belongs to each instance?

### Code

~~~js
class Handler {
    callback = () => "callback";

    handle() {
        return "handled";
    }
}

const first = new Handler();
const second = new Handler();

console.log(first.callback === second.callback);
console.log(first.handle === second.handle);
console.log(Object.hasOwn(first, "callback"));
console.log(Object.hasOwn(first, "handle"));
~~~

### Expected output

~~~text
false
true
true
false
~~~

### Explanation

The arrow-function field is created separately for each instance. The class method is shared on the prototype. The field's arrow function captures the instance's **this**, while the method uses its call receiver.

## 19. Verify that static methods are not on instances

### Question

Where is a static method available?

### Code

~~~js
class Identifier {
    static isValid(value) {
        return typeof value === "string" && value.length > 0;
    }
}

const identifier = new Identifier();

console.log(Identifier.isValid("A-1"));
console.log(Identifier.isValid(""));
console.log(typeof identifier.isValid);
~~~

### Expected output

~~~text
true
false
undefined
~~~

### Explanation

The static method belongs to the **Identifier** class object. It is not an instance method.

## 20. Show that underscore-prefixed fields remain public

### Question

Does an underscore hide a property from other code?

### Code

~~~js
class Account {
    constructor(balance) {
        this._balance = balance;
    }
}

const account = new Account(50);

console.log(account._balance);
console.log(Object.hasOwn(account, "_balance"));
~~~

### Expected output

~~~text
50
true
~~~

### Explanation

**_balance** is an ordinary own property. The underscore communicates a convention only. Private class elements use separate syntax, covered in the next chapter.

## Practice prompts

1. Create a **Movie** class with **title** and **year** initialized by a constructor.
2. Add a **describe** method and create two instances. Check whether the method is shared.
3. Add an array field and verify that each instance receives a different array.
4. Add a getter that calculates a display label from two fields.
5. Add a setter that validates a field and try both valid and invalid values.
6. Add a static factory method that converts input into an instance.
7. Detach an instance method, observe the error, then bind it to the instance.
8. Compare a class method with an arrow-function field by checking ownership and function equality.
9. Attempt to use a class before its declaration and explain the temporal dead zone.
10. Create a class without a constructor and list the instance's own keys.

## Key points

- A class constructor initializes instance data when called with **new**.
- Public instance fields are own properties initialized separately for each object.
- Base-class fields initialize in declaration order before the constructor body.
- Instance methods are shared on the class prototype and are non-enumerable.
- A method's **this** depends on its call receiver, and class methods are strict.
- Getters and setters can be declared in the class body.
- Static methods belong to the class rather than to its instances.
- Class declarations are lexical bindings and cannot be used before initialization.
- An underscore is a naming convention, not privacy.
- Arrow-function fields create a separate function for every instance.
- Static fields, private elements, and initialization blocks are covered next.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [60 - Constructor functions, new, and instanceof](../lessons/060-constructor-functions-new-and-instanceof.md) | [Open lesson](../lessons/061-classes-fields-and-methods.md) | [Open Q&A](../qnas/061-classes-fields-and-methods.md) | [62 - Static fields, private elements, and initialization blocks](../lessons/062-static-fields-private-elements-and-initialization-blocks.md) |
