# 59 - Prototypes and the prototype chain

JavaScript objects can obtain properties from other objects. This sharing mechanism is called **prototype inheritance**. When a property is not found directly on an object, JavaScript can look for it on that object's prototype, then on that prototype's prototype, and continue until it finds the property or reaches **null**.

Understanding this lookup explains why ordinary objects can use methods such as **toString**, how objects can share methods without copying them, and why an inherited property can behave differently from an own property.

## Learning goals

By the end of this chapter, you should be able to:

- Describe an object's prototype as another object in its lookup chain.
- Inspect an object's prototype with **Object.getPrototypeOf**.
- Create an object with a chosen prototype using **Object.create**.
- Distinguish own properties from inherited properties.
- Explain property lookup, shadowing, and deletion.
- Choose between **Object.hasOwn** and the **in** operator.
- Explain how **this** behaves in an inherited method.
- Recognize objects with a **null** prototype and their tradeoffs.
- Avoid common prototype-related mistakes.

## What is a prototype?

A prototype is an object that another object can consult when it needs a property that it does not own. The relationship is stored in an object's internal **[[Prototype]]** link. That link is not an ordinary property that appears in **Object.keys**.

Here is a simple object and its prototype:

~~~js
const profile = {
  name: "Mina"
};

const prototype = Object.getPrototypeOf(profile);

console.log(prototype === Object.prototype);
console.log(Object.getPrototypeOf(prototype));
~~~

Output:

~~~text
true
null
~~~

An ordinary object literal normally gets **Object.prototype** as its prototype. **Object.prototype** provides shared methods and properties that ordinary objects can inherit. It is the end of this familiar chain because its own prototype is **null**.

The prototype link is different from a property named **prototype**. In particular, a function's **.prototype** property is used by **new** when it creates an instance. That constructor behavior is the subject of the next chapter. For this chapter, focus on the prototype link of an object and how property lookup follows it.

## Property lookup follows the chain

When JavaScript evaluates **object.property**, it searches in this order:

1. Check whether **object** has an own property with that key.
2. If it does not, check the object's prototype.
3. Continue up the prototype chain.
4. If the property is not found before the chain reaches **null**, the result is **undefined**.

~~~js
const animal = {
  canMove: true
};

const dog = Object.create(animal);
dog.name = "Rex";

console.log(dog.name);
console.log(dog.canMove);
console.log(dog.missing);
console.log(Object.getPrototypeOf(dog) === animal);
~~~

Output:

~~~text
Rex
true
undefined
true
~~~

**name** is an own property of **dog**. **canMove** is found on **animal**, which is **dog**'s prototype. The missing property is not found anywhere, so the expression evaluates to **undefined**.

The property is not copied from **animal** onto **dog**. The object remains where it was defined, and the lookup chain lets **dog** use it.

## Own properties and inherited properties

An **own property** is stored directly on the object being inspected. An **inherited property** is found on one of its prototypes.

~~~js
const defaults = {
  theme: "light"
};

const settings = Object.create(defaults);
settings.fontSize = 16;

console.log(Object.hasOwn(settings, "fontSize"));
console.log(Object.hasOwn(settings, "theme"));
console.log("theme" in settings);
~~~

Output:

~~~text
true
false
true
~~~

**Object.hasOwn(object, key)** checks only the object itself. The **in** operator checks the object and its entire prototype chain. Use **Object.hasOwn** when you need to know whether data belongs directly to an object. Use **in** when inherited properties should count.

**Object.hasOwn** is safer than calling **object.hasOwnProperty(key)**. An object can have its own property named **hasOwnProperty**, or it can have no such method because it has a **null** prototype.

~~~js
const record = {
  hasOwnProperty: "This key hides the inherited method"
};

console.log(Object.hasOwn(record, "hasOwnProperty"));
console.log(Object.hasOwn(record, "missing"));
~~~

Output:

~~~text
true
false
~~~

**Object.keys(object)** also lists only the object's own enumerable string-keyed properties. It does not list inherited properties or the prototype link.

~~~js
const shared = {
  category: "book"
};

const item = Object.create(shared);
item.title = "The Long Way";

console.log(Object.keys(item));
console.log("category" in item);
~~~

Output:

~~~text
[ 'title' ]
true
~~~

## Create a prototype relationship with Object.create

**Object.create(prototype)** creates a new object whose prototype is the object passed as its argument. It is a direct way to establish a prototype relationship at creation time.

~~~js
const vehicle = {
  describe() {
    return this.brand + " is ready to drive.";
  }
};

const car = Object.create(vehicle);
car.brand = "Cedar";

console.log(car.describe());
console.log(Object.getPrototypeOf(car) === vehicle);
console.log(Object.hasOwn(car, "describe"));
~~~

Output:

~~~text
Cedar is ready to drive.
true
false
~~~

**car** inherits **describe** from **vehicle**, so the method is not duplicated as an own property on every car object. The method is called as **car.describe()**, which makes **car** the receiver for that call. As a result, **this.brand** refers to **car.brand**.

The prototype object can also hold shared default behavior while each child object stores its own data:

~~~js
const accountDefaults = {
  currency: "INR",
  summary() {
    return this.owner + ": " + this.balance + " " + this.currency;
  }
};

const firstAccount = Object.create(accountDefaults);
firstAccount.owner = "Asha";
firstAccount.balance = 500;

const secondAccount = Object.create(accountDefaults);
secondAccount.owner = "Dev";
secondAccount.balance = 800;

console.log(firstAccount.summary());
console.log(secondAccount.summary());
console.log(firstAccount.summary === secondAccount.summary);
~~~

Output:

~~~text
Asha: 500 INR
Dev: 800 INR
true
~~~

Both objects use the same function from **accountDefaults**. Each call still uses the individual object as **this**.

## Shadowing an inherited property

If an object and its prototype both have the same property key, the own property is found first. This is called **shadowing**.

~~~js
const defaults = {
  color: "blue"
};

const button = Object.create(defaults);

console.log(button.color);

button.color = "green";

console.log(button.color);
console.log(Object.hasOwn(button, "color"));
console.log(defaults.color);
~~~

Output:

~~~text
blue
green
true
blue
~~~

Before assignment, reading **button.color** finds the inherited value. Assignment creates an own **color** property on **button**; it does not change **defaults.color**.

Deleting the own property reveals the inherited property again:

~~~js
delete button.color;

console.log(button.color);
console.log(Object.hasOwn(button, "color"));
~~~

Output:

~~~text
blue
false
~~~

**delete button.color** removes the own property. It does not delete **color** from the prototype.

### Assignment and inherited setters

An inherited writable data property usually leads to an own property being created on the receiver during assignment, provided the receiver can accept that property. An inherited setter is different: assignment calls the setter with the child object as **this**.

~~~js
const prototype = {
  set label(value) {
    this.savedLabel = value.trim();
  }
};

const entry = Object.create(prototype);
entry.label = "  Draft  ";

console.log(entry.savedLabel);
console.log(Object.hasOwn(entry, "label"));
console.log(Object.hasOwn(entry, "savedLabel"));
~~~

Output:

~~~text
Draft
false
true
~~~

The setter was found on the prototype and called with **entry** as its receiver. It created **savedLabel** on **entry**. There is no own **label** property.

## Inherited methods and this

A method's **this** value depends on how it is called, not simply on where the method was defined.

~~~js
const formatter = {
  format() {
    return "Item: " + this.name;
  }
};

const product = Object.create(formatter);
product.name = "Notebook";

console.log(product.format());

const detachedFormat = product.format;

console.log(detachedFormat.call({ name: "Pencil" }));
~~~

Output:

~~~text
Item: Notebook
Item: Pencil
~~~

In the first call, **product** is the receiver. In the second call, **call** supplies a different receiver. A method inherited from a prototype does not permanently bind **this** to the prototype object.

If an inherited method is extracted and called without a receiver, its **this** behavior depends on whether the function is strict and on how it is invoked. Do not rely on an inherited method having the prototype as **this**. Pass or bind the intended receiver when needed.

## Longer prototype chains

A prototype can itself have a prototype. JavaScript keeps searching until the property is found or the chain ends at **null**.

~~~js
const livingThing = {
  alive: true
};

const mammal = Object.create(livingThing);
mammal.warmBlooded = true;

const cat = Object.create(mammal);
cat.name = "Luna";

console.log(cat.name);
console.log(cat.warmBlooded);
console.log(cat.alive);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(cat)) === livingThing);
~~~

Output:

~~~text
Luna
true
true
true
~~~

This is a chain of three objects: **cat**, **mammal**, and **livingThing**. A very long or confusing chain can make behavior difficult to follow, so keep prototype relationships clear and purposeful.

## Objects with a null prototype

Passing **null** to **Object.create** creates an object that has no prototype:

~~~js
const dictionary = Object.create(null);

dictionary["display-name"] = "Mira";
dictionary.role = "editor";

console.log(Object.getPrototypeOf(dictionary));
console.log(Object.hasOwn(dictionary, "role"));
console.log("toString" in dictionary);
console.log(Object.keys(dictionary));
~~~

Output:

~~~text
null
true
false
[ 'display-name', 'role' ]
~~~

This kind of object does not inherit methods such as **toString** or **hasOwnProperty**. Use **Object.hasOwn(dictionary, key)** for own-property checks.

A null-prototype object can be useful for a plain dictionary where keys are supplied as data and inherited names should not appear. It is less convenient when code expects ordinary object methods. For general key-value collections, a **Map** is often a clearer choice; that collection is covered later in this guide.

## Inspecting a prototype

Use **Object.getPrototypeOf** to inspect the actual prototype link. Avoid relying on the legacy **__proto__** accessor for normal code.

~~~js
const parent = { active: true };
const child = Object.create(parent);

console.log(Object.getPrototypeOf(child) === parent);
console.log(Object.hasOwn(child, "__proto__"));
~~~

Output:

~~~text
true
false
~~~

The second result is **false** because **__proto__** is not an own property on **child**. Ordinary objects inherit a legacy accessor with that name from **Object.prototype**, which is one reason it can be confusing. Prefer **Object.getPrototypeOf** for inspection and **Object.create** when choosing a prototype at creation time.

## Prototype changes after creation

JavaScript has APIs that can change an object's prototype after it has been created, but doing so in routine application code is usually harder to understand and may make optimization more difficult for JavaScript engines. Choose the intended prototype when creating the object, or use a class or constructor pattern where that relationship is explicit.

For example, prefer this:

~~~js
const base = {
  describe() {
    return "shared behavior";
  }
};

const object = Object.create(base);
~~~

Avoid changing an existing object's prototype just to reuse one method. Composition, a direct function call, or a clear class design may express the relationship more plainly.

## Security and untrusted keys

Prototype inheritance matters when handling property names from untrusted input. **in** includes inherited names, so it should not be used as an own-data check. Use **Object.hasOwn** when deciding whether an object itself contains a key.

~~~js
const options = {
  enabled: false
};

const requestedKey = "toString";

console.log(requestedKey in options);
console.log(Object.hasOwn(options, requestedKey));
~~~

Output:

~~~text
true
false
~~~

The first result is true because an ordinary object inherits **toString**. The object does not define that key itself. When building dictionaries from arbitrary keys, consider a **Map** or an object created with a **null** prototype, and validate input according to the needs of the application.

## Common mistakes

### Assuming inherited properties are copied

An inherited value is found through lookup. It is not copied onto the child object.

~~~js
const shared = { mode: "quiet" };
const user = Object.create(shared);

console.log(Object.hasOwn(user, "mode"));
console.log(user.mode);
~~~

Output:

~~~text
false
quiet
~~~

### Using in to check whether a key is own

**in** searches the entire chain. Use **Object.hasOwn** when the question is whether the current object directly defines the key.

### Assuming assignment edits the prototype

Assigning to a missing or inherited writable data property normally creates an own property on the receiver. It does not edit the prototype's value.

### Treating every object as if it has Object.prototype

Objects made with **Object.create(null)** have no inherited object methods. Code that calls **value.hasOwnProperty(...)** may fail for those objects. **Object.hasOwn(value, key)** works for both ordinary and null-prototype objects.

### Confusing [[Prototype]] with a function's .prototype

**Object.getPrototypeOf(instance)** reads the instance's prototype link. A constructor function's **.prototype** property is a separate object used by **new** when creating instances. The next chapter explains constructors, **new**, and **instanceof**.

### Using prototype mutation as a shortcut

Changing an object's prototype after creation can make behavior less predictable. Prefer establishing the relationship at creation time or choosing a different design.

## Try it yourself

1. Create a **defaults** object with a **language** property. Create a child with **Object.create(defaults)** and compare reading the property with **Object.hasOwn**.
2. Add an own **language** property to the child. Explain why the prototype's value remains unchanged.
3. Delete the child's own property and observe which value is read next.
4. Create a prototype with a **describe** method that reads **this.name**. Use it from two child objects with different names.
5. Compare **Object.hasOwn(object, "toString")** with **"toString" in object**.
6. Create an object with a **null** prototype. Store two keys, list them with **Object.keys**, and check one using **Object.hasOwn**.
7. Add an inherited setter and assign through a child. Record which object receives the setter's side effect.
8. Draw the chain for an object literal and identify the point where the chain ends.

## Key points

- Every object has an internal prototype link, which may point to another object or to **null**.
- Property lookup checks own properties first, then walks up the prototype chain.
- Inherited values are found through lookup; they are not copied onto the child.
- An own property shadows an inherited property with the same key.
- Deleting a shadowing own property can reveal the inherited property again.
- **Object.hasOwn** checks only own properties. The **in** operator checks own and inherited properties.
- **Object.create(proto)** creates an object with the chosen prototype.
- Inherited methods receive the object used as the call receiver through **this**.
- A null-prototype object inherits no methods from **Object.prototype**.
- **Object.getPrototypeOf** is the clear way to inspect an object's prototype link.
- A function's **.prototype** property and an object's internal prototype link are different concepts.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [58 - Getters, setters, property control, freeze, and seal](058-getters-setters-property-control-freeze-and-seal.md) | [Open Q&A](../qnas/059-prototypes-and-the-prototype-chain.md) | [Open example](../examples/059-prototypes-and-the-prototype-chain.md) | [60 - Constructor functions, new, and instanceof](060-constructor-functions-new-and-instanceof.md) |
