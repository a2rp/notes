# 59 - Prototypes and the prototype chain: examples

These examples demonstrate how JavaScript follows prototype links, how own properties differ from inherited properties, and how shadowing and method receivers work. Each example includes a question, complete code, expected output, and an explanation.

## 1. Inspect the prototype of an object literal

### Question

What prototype does an ordinary object literal inherit from, and where does that prototype chain end?

### Code

~~~js
const profile = {
    name: "Mina"
};

const profilePrototype = Object.getPrototypeOf(profile);
const nextPrototype = Object.getPrototypeOf(profilePrototype);

console.log(profilePrototype === Object.prototype);
console.log(nextPrototype === null);
~~~

### Expected output

~~~text
true
true
~~~

### Explanation

An ordinary object literal normally has **Object.prototype** as its prototype. **Object.prototype** has a **null** prototype, which ends this chain.

## 2. Read an inherited property without copying it

### Question

Can an object read a value from its prototype while still not owning that property?

### Code

~~~js
const animal = {
    canMove: true
};

const dog = Object.create(animal);
dog.name = "Rex";

console.log(dog.name);
console.log(dog.canMove);
console.log(Object.hasOwn(dog, "canMove"));
~~~

### Expected output

~~~text
Rex
true
false
~~~

### Explanation

**name** is stored directly on **dog**. **canMove** is found on **animal** through prototype lookup, so **dog** can read it without owning or copying it.

## 3. Compare own-property checks with the in operator

### Question

How can you tell that a key is inherited rather than defined directly on an object?

### Code

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

### Expected output

~~~text
true
false
true
~~~

### Explanation

**Object.hasOwn** checks only the object itself. The **in** operator searches the object and its prototype chain, so it finds **theme** on **defaults**.

## 4. List own keys without listing inherited keys

### Question

Does **Object.keys** include a property inherited from a prototype?

### Code

~~~js
const shared = {
    category: "book"
};

const item = Object.create(shared);
item.title = "The Long Way";

console.log(Object.keys(item));
console.log("category" in item);
~~~

### Expected output

~~~text
[ 'title' ]
true
~~~

### Explanation

**Object.keys** returns own enumerable string-keyed properties. It does not list **category**, though normal property lookup can find that inherited key.

## 5. Share one method across multiple objects

### Question

How can two objects use the same method while supplying different data through **this**?

### Code

~~~js
const accountPrototype = {
    currency: "INR",

    summary() {
        return this.owner + ": " + this.balance + " " + this.currency;
    }
};

const firstAccount = Object.create(accountPrototype);
firstAccount.owner = "Asha";
firstAccount.balance = 500;

const secondAccount = Object.create(accountPrototype);
secondAccount.owner = "Dev";
secondAccount.balance = 800;

console.log(firstAccount.summary());
console.log(secondAccount.summary());
console.log(firstAccount.summary === secondAccount.summary);
~~~

### Expected output

~~~text
Asha: 500 INR
Dev: 800 INR
true
~~~

### Explanation

Both objects inherit the same **summary** function. Each call supplies its own receiver, so **this.owner** and **this.balance** use the data belonging to that object.

## 6. Shadow an inherited property

### Question

What happens when an object gets an own property with the same key as an inherited property?

### Code

~~~js
const defaults = {
    color: "blue"
};

const button = Object.create(defaults);

console.log(button.color);

button.color = "green";

console.log(button.color);
console.log(defaults.color);
console.log(Object.hasOwn(button, "color"));
~~~

### Expected output

~~~text
blue
green
blue
true
~~~

### Explanation

Before assignment, **button.color** is inherited. Assignment creates an own **color** property on **button**, which shadows the inherited value. It does not change **defaults.color**.

## 7. Reveal an inherited value by deleting a shadow

### Question

After removing an own property, what does a read find on the prototype?

### Code

~~~js
const prototype = {
    status: "default"
};

const item = Object.create(prototype);
item.status = "custom";

delete item.status;

console.log(item.status);
console.log(Object.hasOwn(item, "status"));
~~~

### Expected output

~~~text
default
false
~~~

### Explanation

The delete operation removes the own **status** property from **item**. Lookup then continues to the prototype and finds **default**.

## 8. Assignment to an inherited writable data property

### Question

Does assigning to an inherited writable value update the prototype or create an own value?

### Code

~~~js
const defaults = {
    retries: 2
};

const request = Object.create(defaults);
request.retries = 5;

console.log(request.retries);
console.log(defaults.retries);
console.log(Object.hasOwn(request, "retries"));
~~~

### Expected output

~~~text
5
2
true
~~~

### Explanation

For this ordinary writable data-property case, assignment creates an own **retries** property on **request**. The value on **defaults** remains unchanged.

## 9. Call an inherited method with an explicit receiver

### Question

Can the same inherited method use a different object as its receiver?

### Code

~~~js
const formatter = {
    format() {
        return "Item: " + this.name;
    }
};

const product = Object.create(formatter);
product.name = "Notebook";

const detachedFormat = product.format;

console.log(product.format());
console.log(detachedFormat.call({ name: "Pencil" }));
~~~

### Expected output

~~~text
Item: Notebook
Item: Pencil
~~~

### Explanation

The method is found through **formatter**, but its **this** value depends on the call. The first call uses **product**. The **call** method explicitly supplies a different object for the second call.

## 10. Use an inherited setter

### Question

When a setter is inherited, which object receives data written through **this**?

### Code

~~~js
const inputPrototype = {
    set label(value) {
        this.savedLabel = value.trim();
    }
};

const entry = Object.create(inputPrototype);
entry.label = "  Draft  ";

console.log(entry.savedLabel);
console.log(Object.hasOwn(entry, "label"));
console.log(Object.hasOwn(entry, "savedLabel"));
~~~

### Expected output

~~~text
Draft
false
true
~~~

### Explanation

The setter is found on the prototype and is called with **entry** as its receiver. It creates **savedLabel** on **entry**. An own **label** property is not created.

## 11. Use an inherited getter with child data

### Question

Can a getter on a prototype calculate a value from properties on the child?

### Code

~~~js
const measurementPrototype = {
    get summary() {
        return this.width + " by " + this.height;
    }
};

const card = Object.create(measurementPrototype);
card.width = 8;
card.height = 5;

console.log(card.summary);
console.log(Object.hasOwn(card, "summary"));
~~~

### Expected output

~~~text
8 by 5
false
~~~

### Explanation

Reading **card.summary** finds the getter on the prototype. The getter runs with **card** as **this**, so it can read the child's own **width** and **height**. The accessor remains on the prototype.

## 12. Follow a multi-level prototype chain

### Question

Can lookup find properties more than one prototype above the object?

### Code

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

### Expected output

~~~text
Luna
true
true
true
~~~

### Explanation

The chain is **cat**, then **mammal**, then **livingThing**, then **Object.prototype**? In this example, **mammal** was created with **livingThing** as its prototype, and **livingThing** is an ordinary object whose prototype is **Object.prototype**. The fourth expression checks that the prototype two steps above **cat** is **livingThing**.

## 13. See the result of a missing lookup

### Question

What does a property read return when the key is not found anywhere in the chain?

### Code

~~~js
const base = {
    ready: true
};

const item = Object.create(base);

console.log(item.unknown);
console.log("unknown" in item);
~~~

### Expected output

~~~text
undefined
false
~~~

### Explanation

Lookup checks **item**, then **base**, then its remaining prototypes. None defines **unknown**, so the read is **undefined** and the **in** check is false.

## 14. Make a null-prototype dictionary

### Question

How do you create a dictionary without inherited object names?

### Code

~~~js
const dictionary = Object.create(null);

dictionary["display-name"] = "Mira";
dictionary.role = "editor";

console.log(Object.getPrototypeOf(dictionary));
console.log("toString" in dictionary);
console.log(Object.hasOwn(dictionary, "role"));
console.log(Object.keys(dictionary));
~~~

### Expected output

~~~text
null
false
true
[ 'display-name', 'role' ]
~~~

### Explanation

The dictionary has no prototype, so it does not inherit **toString**. It still supports ordinary own-property assignment and checks. Use **Object.hasOwn** rather than calling an inherited **hasOwnProperty** method.

## 15. Compare inherited and own names on an ordinary object

### Question

Why can **in** find **toString** even when an empty object does not own it?

### Code

~~~js
const object = {};

console.log("toString" in object);
console.log(Object.hasOwn(object, "toString"));
console.log(Object.keys(object));
~~~

### Expected output

~~~text
true
false
[]
~~~

### Explanation

The empty object inherits **toString** from **Object.prototype**. It does not own that method, and it has no own enumerable keys.

## 16. Safely check a key when hasOwnProperty is shadowed

### Question

How can code check an own key when the object has a data property named **hasOwnProperty**?

### Code

~~~js
const data = {
    hasOwnProperty: "ordinary data",
    id: 7
};

console.log(Object.hasOwn(data, "id"));
console.log(typeof data.hasOwnProperty);
~~~

### Expected output

~~~text
true
string
~~~

### Explanation

The own string property named **hasOwnProperty** hides the inherited method with that name. The static **Object.hasOwn** method does not depend on the object's property.

## 17. Observe enumerable inherited properties with for...in

### Question

How does **for...in** differ from **Object.keys** when a prototype has an enumerable property?

### Code

~~~js
const base = {
    inherited: "from base"
};

const item = Object.create(base);
item.own = "from item";

console.log(Object.keys(item));

for (const key in item) {
    console.log(key);
}
~~~

### Expected output

~~~text
[ 'own' ]
own
inherited
~~~

### Explanation

**Object.keys** lists own enumerable keys only. **for...in** visits enumerable string keys on the object and along its prototype chain. If a loop should process only own data, guard it with **Object.hasOwn**.

## 18. Guard a for...in loop to process only own keys

### Question

How can a **for...in** loop ignore inherited enumerable keys?

### Code

~~~js
const base = {
    inherited: "skip"
};

const item = Object.create(base);
item.own = "keep";

for (const key in item) {
    if (Object.hasOwn(item, key)) {
        console.log(key + ": " + item[key]);
    }
}
~~~

### Expected output

~~~text
own: keep
~~~

### Explanation

The loop can see the inherited **inherited** key. The **Object.hasOwn** guard restricts processing to properties defined directly on **item**.

## 19. Distinguish an object's prototype from a constructor's prototype property

### Question

With a constructor function, how can you verify that its instance links to the function's **prototype** property?

### Code

~~~js
function Device() {}

const phone = new Device();

console.log(Object.getPrototypeOf(phone) === Device.prototype);
console.log(Object.hasOwn(phone, "prototype"));
console.log(Object.hasOwn(Device, "prototype"));
~~~

### Expected output

~~~text
true
false
true
~~~

### Explanation

**phone** has an internal prototype link that points to **Device.prototype**. The instance does not own a property named **prototype**. The function **Device** does own a **prototype** property. This is the connection between prototype lookup and constructor behavior that the next chapter explores in more detail.

## 20. Use one helper to classify a property

### Question

How can a helper report whether a key is own, inherited, or missing?

### Code

~~~js
function describeProperty(object, key) {
    if (Object.hasOwn(object, key)) {
        return "own";
    }

    if (key in object) {
        return "inherited";
    }

    return "missing";
}

const base = {
    active: true
};

const item = Object.create(base);
item.name = "Row";

console.log(describeProperty(item, "name"));
console.log(describeProperty(item, "active"));
console.log(describeProperty(item, "unknown"));
~~~

### Expected output

~~~text
own
inherited
missing
~~~

### Explanation

The helper first tests the object itself. If that check fails, **in** distinguishes an inherited property from a key that does not exist anywhere in the chain.

## Practice prompts

1. Create two child objects from a shared prototype and give each a different own label.
2. Add an inherited method that reads a value from **this**, and call it from both children.
3. Add an own property that shadows an inherited one, then delete it and compare the values.
4. Create a null-prototype dictionary and safely check a key that is also present on **Object.prototype**.
5. Compare the results of **Object.keys** and **for...in** for an object with an enumerable prototype property.
6. Add a getter to a prototype and have it calculate a result from own properties on a child.
7. Use **Object.getPrototypeOf** repeatedly to draw a small object's full chain.
8. Explain why a function's **.prototype** property and the prototype link on an instance are related but not the same thing.

## Key points

- JavaScript looks for a property on the object first, then on its prototypes.
- Inherited properties are found through lookup; they are not copied to the child.
- An own property shadows an inherited property with the same key.
- Deleting a shadowing own property can reveal the inherited value again.
- **Object.hasOwn** checks direct ownership. The **in** operator includes the prototype chain.
- Inherited methods and accessors use the receiver supplied by the property call.
- **Object.keys** lists own enumerable string keys, while **for...in** can include inherited enumerable keys.
- Objects created with **Object.create(null)** do not inherit from **Object.prototype**.
- A constructor's **.prototype** property is used to establish the prototype link of instances created with **new**.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [58 - Getters, setters, property control, freeze, and seal](../lessons/058-getters-setters-property-control-freeze-and-seal.md) | [Open lesson](../lessons/059-prototypes-and-the-prototype-chain.md) | [Open Q&A](../qnas/059-prototypes-and-the-prototype-chain.md) | [60 - Constructor functions, new, and instanceof](../lessons/060-constructor-functions-new-and-instanceof.md) |
