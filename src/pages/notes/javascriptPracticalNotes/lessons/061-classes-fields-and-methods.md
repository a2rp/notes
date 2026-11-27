# 61 - Classes: fields and methods

JavaScript classes provide a clear syntax for creating objects that share behavior. A class declaration defines a constructor and methods. Public instance fields let each object store its own data, while methods are normally shared through the class's prototype.

Classes connect directly to the constructor functions and prototype chains from the previous chapters. They also have important rules of their own: classes must be called with **new**, their bodies run in strict mode, and class methods are not enumerable. This chapter focuses on class declarations, constructors, public instance fields, instance methods, and static methods. Static fields and private elements are covered in the next chapter.

## Learning goals

By the end of this chapter, you should be able to:

- Declare a class and construct instances from it.
- Initialize instance data with a constructor or public fields.
- Add methods shared by all instances.
- Explain where instance fields and methods are stored.
- Use getters and setters in a class body.
- Define and call a static method.
- Explain class strictness and the requirement to use **new**.
- Understand field initialization order and per-instance initial values.
- Recognize how class methods handle **this**.
- Avoid common mistakes with class syntax.

## A basic class

A class declaration names a class and provides a class body. The **constructor** method initializes each new instance.

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

Output:

~~~text
Asha
I am Asha and I am 28.
true
~~~

Use **new Person(...)** to create an instance. The constructor runs with the new object as **this**. The assignments create own properties on that instance.

The **introduce** method is not created inside the constructor. It is stored on **Person.prototype**, so every instance can share the same function.

~~~js
const anotherPerson = new Person("Dev", 31);

console.log(person.introduce === anotherPerson.introduce);
console.log(Object.hasOwn(person, "introduce"));
console.log(Object.hasOwn(Person.prototype, "introduce"));
~~~

Output:

~~~text
true
false
true
~~~

## Public instance fields

A public instance field declares a property that each instance receives. The field initializer runs for every instance, so object and array values declared as fields are not shared between instances.

~~~js
class ShoppingCart {
  items = [];

  constructor(owner) {
    this.owner = owner;
  }

  add(item) {
    this.items.push(item);
  }
}

const firstCart = new ShoppingCart("Asha");
const secondCart = new ShoppingCart("Dev");

firstCart.add("Notebook");

console.log(firstCart.owner);
console.log(firstCart.items);
console.log(secondCart.items);
console.log(firstCart.items === secondCart.items);
~~~

Output:

~~~text
Asha
[ 'Notebook' ]
[]
false
~~~

The **items** field is initialized separately for each object. Changing one cart's array does not change the other cart's array.

A field without an initializer starts as **undefined**:

~~~js
class Profile {
  nickname;
}

const profile = new Profile();

console.log(profile.nickname);
console.log(Object.hasOwn(profile, "nickname"));
~~~

Output:

~~~text
undefined
true
~~~

The field exists as an own property even though its value is **undefined**.

## Field initialization order

For a base class, instance field initializers run for the new instance before the body of its constructor executes. Fields are initialized in the order they appear in the class body.

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

Output:

~~~text
paid
new
~~~

The fields are initialized first, so **initialStatus** reads the initial value **new**. The constructor body then changes **status** to **paid**. In a derived class, initialization also involves **super()**; that order is covered with inheritance in a later chapter.

A field initializer can use earlier fields, but a later field has not been initialized yet:

~~~js
class Dimensions {
  width = 8;
  height = 5;
  area = this.width * this.height;
}

const dimensions = new Dimensions();

console.log(dimensions.area);
~~~

Output:

~~~text
40
~~~

Keep related fields in a clear order so their dependencies are easy to see.

## Methods are shared through the prototype

An instance method is written directly in the class body. JavaScript stores it on the class's prototype, not as a new own function on each instance.

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

Output:

~~~text
River Town by Mina Shah
Bright Sky by Dev Rao
true
false
~~~

The method is shared, while **title** and **author** are separate own properties. This is the same prototype relationship used by constructor functions, expressed with class syntax.

Class methods are non-enumerable properties on the prototype:

~~~js
class Note {
  save() {
    return "saved";
  }
}

const note = new Note();

console.log(Object.keys(Note.prototype));
console.log(Object.hasOwn(Note.prototype, "save"));
console.log(Object.keys(note));
~~~

Output:

~~~text
[]
true
[]
~~~

**Object.keys** lists own enumerable string-keyed properties. The method is an own property of **Note.prototype**, but class methods are not enumerable. The instance has no own enumerable fields in this example.

## this in a class method

A class method gets **this** from the way it is called. Calling it as **instance.method()** supplies the instance as the receiver.

~~~js
class Counter {
  value = 0;

  increment() {
    this.value += 1;
    return this.value;
  }
}

const counter = new Counter();

console.log(counter.increment());
console.log(counter.increment());
~~~

Output:

~~~text
1
2
~~~

Extracting a method does not automatically bind it to its instance. Class methods run in strict mode, so a detached call has **this** as **undefined** unless a receiver is supplied or the method is bound.

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

console.log(detachedGreet.call({ name: "Dev" }));
~~~

Output:

~~~text
true
Hello, Dev
~~~

Use **bind** or call the method through its instance when the original receiver must be preserved.

~~~js
const boundGreet = greeter.greet.bind(greeter);
console.log(boundGreet());
~~~

Output:

~~~text
Hello, Mina
~~~

Arrow-function fields can capture the instance's **this**, but they create a separate function for every instance. Use them when a stable callback receiver is useful, not as a default replacement for shared prototype methods.

## Getters and setters in a class

Class bodies can define getters and setters using the same accessor syntax used in object literals. A getter is read like a property, while a setter runs when the property is assigned.

~~~js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  set width(value) {
    if (typeof value !== "number" || value < 0) {
      throw new RangeError("Width must be a non-negative number.");
    }

    this._width = value;
  }

  get width() {
    return this._width;
  }
}

const rectangle = new Rectangle(4, 3);

console.log(rectangle.area);
rectangle.width = 6;
console.log(rectangle.area);
~~~

Output:

~~~text
12
18
~~~

The accessor pair validates updates to **width** and stores its value in **_width**. The **area** getter calculates its result when read. The underscore is only a naming convention; it does not make **_width** private. Private elements use separate syntax covered next.

A setter can reject an invalid assignment:

~~~js
try {
  rectangle.width = -1;
} catch (error) {
  console.log(error instanceof RangeError);
}

console.log(rectangle.width);
~~~

Output:

~~~text
true
6
~~~

The invalid value is rejected before it replaces the stored width.

## Static methods

A static method belongs to the class itself rather than to its instances. Call it using the class name.

~~~js
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  toFahrenheit() {
    return this.celsius * 9 / 5 + 32;
  }

  static fromFahrenheit(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return new Temperature(celsius);
  }
}

const room = Temperature.fromFahrenheit(68);

console.log(room.celsius);
console.log(room.toFahrenheit());
console.log(typeof room.fromFahrenheit);
~~~

Output:

~~~text
20
68
undefined
~~~

**fromFahrenheit** is called on **Temperature**, and it returns a new instance. It is not an instance method, so **room.fromFahrenheit** is **undefined**.

Static methods are useful for operations related to a class, such as factories or validation helpers. Static fields and class initialization blocks are covered in the next chapter.

## A class declaration and a class expression

A class can be declared with a class declaration or created as an expression and assigned to a variable.

~~~js
class NamedItem {
  constructor(name) {
    this.name = name;
  }
}

const Item = class {
  constructor(name) {
    this.name = name;
  }
};

const first = new NamedItem("First");
const second = new Item("Second");

console.log(first.name);
console.log(second.name);
console.log(first instanceof NamedItem);
console.log(second instanceof Item);
~~~

Output:

~~~text
First
Second
true
true
~~~

Class expressions are useful when a class value is assigned, passed, or returned like other expressions. A class expression can also have an internal name for use inside its body.

## Class declarations are not usable before their declaration

Class declarations are lexical bindings. They are in a temporal dead zone before the declaration executes, so they cannot be used earlier in the same scope.

~~~js
try {
  console.log(typeof Widget);
} catch (error) {
  console.log(error instanceof ReferenceError);
}

class Widget {}

console.log(typeof Widget);
~~~

Output:

~~~text
true
function
~~~

Even **typeof** throws for a lexical class binding while it is in its temporal dead zone. After the declaration, the class value is a function object.

## Classes require new

A class constructor cannot be called as an ordinary function.

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

Output:

~~~text
true
Hello
~~~

Always use **new** with a class. Unlike a regular constructor function, a class cannot be called without it.

## A class without a constructor

If a class does not define a constructor, JavaScript provides a default constructor. A simple base class default constructor accepts the arguments passed to **new** but does not assign them to fields automatically.

~~~js
class Empty {}

const value = new Empty("ignored");

console.log(value instanceof Empty);
console.log(Object.keys(value));
~~~

Output:

~~~text
true
[]
~~~

The object is still an instance of **Empty**, but no own properties were added. Define fields or a constructor when the instance needs data.

## Class methods and function properties

The methods in a class body are distinct from fields. A field whose initializer is a function is an own property on each instance, while a method is shared on the prototype.

~~~js
class ActionPanel {
  onClick = () => "clicked";

  handleClick() {
    return "handled";
  }
}

const first = new ActionPanel();
const second = new ActionPanel();

console.log(first.onClick === second.onClick);
console.log(first.handleClick === second.handleClick);
console.log(Object.hasOwn(first, "onClick"));
console.log(Object.hasOwn(first, "handleClick"));
~~~

Output:

~~~text
false
true
true
false
~~~

The arrow function field is created for every instance. The regular class method is shared from **ActionPanel.prototype**. The arrow field captures the instance's **this**, but uses more per-instance function storage.

## Common mistakes

### Calling a class without new

A class constructor must be called with **new**. A plain call throws a **TypeError**.

### Putting every method in the constructor

Methods created inside the constructor become separate own functions on each instance. Put shared behavior in the class body as methods.

### Assuming fields are shared

Each instance receives its own field values. An array or object field initializer runs separately for every new instance.

### Assuming methods are own enumerable properties

Class methods are stored on the prototype and are non-enumerable. Use **Object.getPrototypeOf(instance)** to inspect the prototype where methods are found.

### Detaching a method and expecting this to stay bound

A method's **this** comes from its call receiver. Bind it or provide the receiver explicitly when passing it elsewhere.

### Assuming an underscore makes a property private

Names such as **_width** are ordinary public properties. JavaScript private elements use **#name** syntax, which is covered in the next chapter.

### Using an instance to call a static method

Static methods belong to the class, so call them on the class name, for example **Temperature.fromFahrenheit(...)**.

### Using a class name before its declaration

Class declarations are lexical and cannot be accessed before initialization. Move the use below the declaration or reorganize the code.

## Try it yourself

1. Create a **Movie** class with **title** and **year** fields initialized by a constructor.
2. Add a **describe** method and create two movie instances. Check whether the method is shared.
3. Add an array field and verify that changing one instance's array does not change another's.
4. Add a getter that calculates a display label from two fields.
5. Add a setter that validates one field and try both valid and invalid values.
6. Add a static factory method that converts input data into an instance.
7. Detach an instance method, observe the error, and then bind it to the instance.
8. Compare a class method with an arrow-function field by checking ownership and function equality.
9. Attempt to use a class before its declaration and explain the temporal dead zone.
10. Create a class with no constructor and list the resulting instance's own keys.

## Key points

- A class defines a constructor and methods for creating related objects.
- Use **new ClassName(...)** to construct an instance.
- Public instance fields are own properties initialized separately for every instance.
- The constructor body runs after base-class instance fields are initialized.
- Instance methods are shared on the class's prototype and are non-enumerable.
- A method's **this** depends on its call receiver; class methods are strict.
- Getters and setters can be declared in the class body.
- Static methods belong to the class, not to each instance.
- Class declarations are lexical bindings and are not usable before initialization.
- An underscore is a naming convention, not privacy.
- Static fields, private elements, and initialization blocks are covered next.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [60 - Constructor functions, new, and instanceof](060-constructor-functions-new-and-instanceof.md) | [Open Q&A](../qnas/061-classes-fields-and-methods.md) | [Open example](../examples/061-classes-fields-and-methods.md) | [62 - Static fields, private elements, and initialization blocks](062-static-fields-private-elements-and-initialization-blocks.md) |
