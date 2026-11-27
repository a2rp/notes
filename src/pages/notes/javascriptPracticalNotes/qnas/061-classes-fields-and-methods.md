# 61 - Classes: fields and methods: Q&A

This question set reviews class declarations, constructors, public instance fields, methods, accessors, and static methods. Answers follow each question, with explanations and code outputs where useful.

## Multiple-choice questions

### 1. How do you normally create an instance of a class named **Person**?

A. **Person()**  
B. **new Person()**  
C. **Object.keys(Person)**  
D. **Person.prototype()**  

**Answer: B.** Class constructors must be called with **new**. Calling a class as a normal function throws a **TypeError**.

### 2. Where are ordinary instance methods declared in a class stored?

A. As a separate own function on every instance  
B. On the class's prototype  
C. In a global object  
D. In the constructor's local scope  

**Answer: B.** Class methods are shared through the class's prototype. A method declared inside the constructor as an arrow-function field is different and is created for each instance.

### 3. Where does a public instance field live?

A. As an own property on each instance  
B. Only on the class prototype  
C. Only on the class constructor function  
D. In **Object.prototype**  

**Answer: A.** Each new instance receives its own field. An object or array initializer is evaluated separately for each instance.

### 4. What does a declared field without an initializer contain on a new instance?

A. It is absent.  
B. It contains **null**.  
C. It exists with the value **undefined**.  
D. It causes a syntax error.  

**Answer: C.** The field is created as an own property, and its initial value is **undefined**.

### 5. What does **new** do with a class constructor?

A. Calls it as a plain function.  
B. Creates an instance and calls the constructor with that instance as **this**.  
C. Copies every class method onto the instance.  
D. Converts its methods into static methods.  

**Answer: B.** The constructor initializes the newly created instance. Instance methods are shared on the prototype.

### 6. When do base-class instance fields initialize relative to the constructor body?

A. After the constructor returns  
B. Before the constructor body runs  
C. Only when a field is read  
D. Only if the constructor has no parameters  

**Answer: B.** Base-class instance fields initialize before the body of the class constructor. In a derived class, initialization is coordinated with **super()**.

### 7. How can you call a static method named **fromText** on class **Message**?

A. **new Message().fromText()**  
B. **Message.fromText()**  
C. **Message.prototype.fromText()**  
D. **Object.fromText(Message)**  

**Answer: B.** A static method belongs to the class itself, so call it through the class name.

### 8. What is true of class methods regarding enumeration?

A. They are own enumerable properties of every instance.  
B. They are non-enumerable properties on the class prototype.  
C. They are copied to **Object.prototype**.  
D. They are always symbols.  

**Answer: B.** Class methods are stored on the prototype and are non-enumerable.

### 9. What happens if a class method is extracted and called without a receiver?

A. It stays bound to the original instance automatically.  
B. It runs with **this** equal to the class prototype.  
C. In strict mode, **this** is **undefined**, and using it as an object can throw.  
D. It becomes a static method.  

**Answer: C.** Class bodies are strict mode code. A detached method is not automatically bound to its former instance.

### 10. What does a class declaration name refer to before the declaration has initialized?

A. The global object  
B. **undefined**, and **typeof** is always safe  
C. A binding in its temporal dead zone  
D. The class prototype  

**Answer: C.** Class declarations are lexical bindings. Accessing one before initialization throws a **ReferenceError**, including through **typeof**.

## True or false

### 11. A class must be called with **new**.

**Answer: True.** Calling a class constructor as a normal function throws a **TypeError**.

### 12. Each instance gets a separate function for a method declared in the class body.

**Answer: False.** Such methods are shared on the prototype. A function field, such as an arrow function initialized per instance, does create a separate function for each instance.

### 13. An array declared as a public instance field is shared by all instances.

**Answer: False.** The field initializer runs separately for every instance, so each gets a distinct array.

### 14. A field without an initializer is not an own property.

**Answer: False.** The field exists as an own property with the value **undefined**.

### 15. A getter declared in a class is read using method-call parentheses.

**Answer: False.** A getter is accessed like a property. For example, read **rectangle.area**, not **rectangle.area()**.

### 16. A static method is normally called on the class rather than on an instance.

**Answer: True.** Static methods belong to the class object. They are not instance methods.

### 17. An underscore prefix makes a class field private.

**Answer: False.** Names such as **_value** are ordinary public properties. JavaScript private elements use **#value** syntax, covered in the next chapter.

### 18. Class methods are enumerable when listed with **Object.keys(ClassName.prototype)**.

**Answer: False.** Class methods are non-enumerable, so they do not appear in that result.

### 19. A detached class method automatically keeps the instance it came from as **this**.

**Answer: False.** Class methods are not automatically bound. Call the method through the instance, use **bind**, or explicitly supply a receiver.

### 20. A class declaration can be used before its declaration just like a function declaration.

**Answer: False.** Class declarations are lexical bindings and remain unavailable in their temporal dead zone.

## Short-answer questions

### 21. What is the role of a class constructor?

**Answer:** The constructor initializes a new instance. **new** creates the instance and calls the constructor with that object as **this**.

### 22. Where should data that varies by instance be stored?

**Answer:** Use public instance fields or assignments to **this** in the constructor. Each instance then owns its own data.

### 23. Where should behavior shared by all instances be declared?

**Answer:** Declare an instance method in the class body. JavaScript stores it on the class's prototype, where instances can share it through lookup.

### 24. What is the difference between a field and a method?

**Answer:** A field creates a property on each instance. An ordinary method declared in the class body is a shared function on the class prototype.

### 25. Why is an array field usually safe to mutate on one instance?

**Answer:** Each instance evaluates the field initializer separately. For example, **items = []** creates a new array for each instance rather than sharing one array.

### 26. What is the initialization order for fields in a base class?

**Answer:** Instance fields initialize in declaration order before the body of the base class constructor runs. A constructor can then read or replace those initialized values.

### 27. What is a static method?

**Answer:** A method attached to the class itself rather than to instances. It is useful for class-related operations such as factories or validation helpers.

### 28. How do you make a detached method use a particular object as **this**?

**Answer:** Call it with **method.call(object, ...)**, bind it with **method.bind(object)**, or invoke it through the object as **object.method()**.

### 29. Why can **typeof ClassName** throw before a class declaration?

**Answer:** The name is a lexical binding that is in its temporal dead zone until the declaration executes. Access during that period throws a **ReferenceError**, even through **typeof**.

### 30. Are properties such as **_width** private?

**Answer:** No. The underscore is only a naming convention. Such a property is still public and can be read or changed from outside the class.

## Predict the output

### 31. Which values are own properties and which method is shared?

~~~js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return "Hello, " + this.name;
  }
}

const first = new Person("Asha");
const second = new Person("Dev");

console.log(first.greet());
console.log(first.greet === second.greet);
console.log(Object.hasOwn(first, "name"));
console.log(Object.hasOwn(first, "greet"));
~~~

**Answer:**

~~~text
Hello, Asha
true
true
false
~~~

**Explanation:** **name** is an own field-like property assigned by the constructor. **greet** is shared on **Person.prototype**.

### 32. Are array fields shared between instances?

~~~js
class Basket {
  items = [];
}

const first = new Basket();
const second = new Basket();

first.items.push("pear");

console.log(first.items);
console.log(second.items);
console.log(first.items === second.items);
~~~

**Answer:**

~~~text
[ 'pear' ]
[]
false
~~~

**Explanation:** Each instance gets a separately initialized array.

### 33. What happens to a field declared without an initializer?

~~~js
class Profile {
  nickname;
}

const profile = new Profile();

console.log(profile.nickname);
console.log(Object.hasOwn(profile, "nickname"));
~~~

**Answer:**

~~~text
undefined
true
~~~

**Explanation:** The field is an own property with the value **undefined**.

### 34. In what order are fields and the base constructor body evaluated?

~~~js
class Order {
  status = "new";
  savedStatus = this.status;

  constructor() {
    this.status = "paid";
  }
}

const order = new Order();

console.log(order.status);
console.log(order.savedStatus);
~~~

**Answer:**

~~~text
paid
new
~~~

**Explanation:** Fields initialize before the base constructor body. **savedStatus** stores the earlier value; then the constructor changes **status**.

### 35. Is a class method an enumerable prototype key?

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
~~~

**Answer:**

~~~text
saved
true
[]
~~~

**Explanation:** The method is an own property of the prototype, but class methods are non-enumerable.

### 36. What happens when a class method is detached?

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
const detached = greeter.greet;

try {
  detached();
} catch (error) {
  console.log(error instanceof TypeError);
}

console.log(detached.call({ name: "Dev" }));
~~~

**Answer:**

~~~text
true
Hello, Dev
~~~

**Explanation:** The class method is strict and is not automatically bound to **greeter**. The **call** method supplies a receiver for the second invocation.

### 37. What does a static factory return?

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

**Answer:**

~~~text
20
68
undefined
~~~

**Explanation:** The static method is called on the class and returns an instance. It is not available as a method on that instance.

### 38. Can a class be called without new?

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
~~~

**Answer:**

~~~text
true
~~~

**Explanation:** Class constructors require **new**.

### 39. What happens before a class declaration initializes?

~~~js
try {
  console.log(typeof Panel);
} catch (error) {
  console.log(error instanceof ReferenceError);
}

class Panel {}

console.log(typeof Panel);
~~~

**Answer:**

~~~text
true
function
~~~

**Explanation:** The first access occurs in the temporal dead zone and throws. After declaration, the binding refers to the class value, which has type **function**.

### 40. Does an instance method become an own property?

~~~js
class Counter {
  count = 0;

  increment() {
    this.count += 1;
  }
}

const counter = new Counter();

console.log(Object.keys(counter));
console.log(Object.hasOwn(counter, "increment"));
console.log(Object.hasOwn(Counter.prototype, "increment"));
~~~

**Answer:**

~~~text
[ 'count' ]
false
true
~~~

**Explanation:** The public field is an own enumerable property. The method is stored on the prototype.

## Coding questions

### 41. Create a class with two fields and a shared description method.

**Answer:**

~~~js
class Movie {
  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  describe() {
    return this.title + " (" + this.year + ")";
  }
}

const movie = new Movie("River Town", 2024);

console.log(movie.describe());
console.log(Object.hasOwn(movie, "title"));
console.log(Object.hasOwn(movie, "describe"));
~~~

Output:

~~~text
River Town (2024)
true
false
~~~

**Explanation:** The constructor creates own data properties. The method is inherited from **Movie.prototype**.

### 42. Use a public field for a separate array on every instance.

**Answer:**

~~~js
class Playlist {
  tracks = [];

  add(track) {
    this.tracks.push(track);
  }
}

const morning = new Playlist();
const evening = new Playlist();

morning.add("Sunrise");

console.log(morning.tracks);
console.log(evening.tracks);
console.log(morning.tracks === evening.tracks);
~~~

Output:

~~~text
[ 'Sunrise' ]
[]
false
~~~

**Explanation:** The field initializer creates a new array whenever a **Playlist** instance is constructed.

### 43. Add a getter that calculates a value.

**Answer:**

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
~~~

Output:

~~~text
24
~~~

**Explanation:** A getter is read like a property. It calculates the value when accessed.

### 44. Add a validating setter and handle invalid data.

**Answer:**

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

Output:

~~~text
8
true
8
~~~

**Explanation:** The setter checks the incoming value before storing it. The invalid assignment throws, leaving the previous value unchanged. **_value** is still a public property, not a private field.

### 45. Add a static factory method.

**Answer:**

~~~js
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) * 5 / 9);
  }
}

const temperature = Temperature.fromFahrenheit(68);

console.log(temperature.celsius);
console.log(temperature instanceof Temperature);
~~~

Output:

~~~text
20
true
~~~

**Explanation:** The factory belongs to the class and constructs an instance. Call it as **Temperature.fromFahrenheit(...)**.

### 46. Bind a method before passing it elsewhere.

**Answer:**

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

Output:

~~~text
Hello, Mina
~~~

**Explanation:** **bind** creates a function whose **this** is fixed to **greeter**.

### 47. Compare a shared method with an arrow-function field.

**Answer:**

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

Output:

~~~text
false
true
true
false
~~~

**Explanation:** The arrow field creates a function for each instance. The method is shared on the prototype. The arrow field keeps the instance's **this** when passed as a callback, at the cost of per-instance function allocation.

### 48. Create an instance with a class expression.

**Answer:**

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

Output:

~~~text
Notebook
true
~~~

**Explanation:** A class expression produces a class value that can be assigned and used with **new**, just like a class declaration.

### 49. Create a class with no constructor.

**Answer:**

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

**Explanation:** JavaScript provides a default constructor. It allows construction, but it does not automatically assign arguments to properties.

### 50. Show that underscore naming does not make a field private.

**Answer:**

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

Output:

~~~text
50
true
~~~

**Explanation:** **_balance** is an ordinary own property. Private elements use different syntax and are covered in the next chapter.

## Review checklist

Before moving on, make sure you can explain:

- How a class constructor initializes an instance.
- Where public instance fields and ordinary methods are stored.
- Why each instance receives its own array field.
- When base-class fields initialize relative to the constructor body.
- How getters and setters behave in class bodies.
- How to call a static method.
- Why a detached method does not keep its original **this** automatically.
- Why class declarations are unavailable in their temporal dead zone.
- Why underscore-prefixed properties are still public.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- | --- |
| [60 - Constructor functions, new, and instanceof](../lessons/060-constructor-functions-new-and-instanceof.md) | [Open lesson](../lessons/061-classes-fields-and-methods.md) | [Open Q&A](../qnas/061-classes-fields-and-methods.md) | [Open example](../examples/061-classes-fields-and-methods.md) | [62 - Static fields, private elements, and initialization blocks](../lessons/062-static-fields-private-elements-and-initialization-blocks.md) |
