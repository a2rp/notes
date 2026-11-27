# 15 - Primitive values and object references

When you assign a value to another binding or pass it to a function, the behavior depends on whether the value is primitive or an object.

- Primitive values such as numbers, strings, and Booleans are copied as values.
- Objects are accessed through references. Copying an object value copies the reference, so multiple bindings can refer to the same object.

Understanding this difference explains why changing one variable sometimes has no effect on another, while changing an object through one name can be seen through another.

## Copying a primitive value

When one binding receives a primitive value, it receives that value independently:

~~~js
let firstScore = 7;
let secondScore = firstScore;

firstScore = 9;

console.log(firstScore); // 9
console.log(secondScore); // 7
~~~

The assignment copies the current number value into **secondScore**. Reassigning **firstScore** later does not change **secondScore**.

The same idea applies to primitive values such as strings and Booleans:

~~~js
let firstName = "Asha";
let secondName = firstName;

firstName = "Mina";

console.log(firstName); // Mina
console.log(secondName); // Asha
~~~

Each binding has its own current primitive value after the assignment.

## Primitive values do not change in place

Primitive values are immutable. An operation on a primitive produces a result; it does not edit the original value in place.

~~~js
const originalText = "javascript";
const upperText = originalText.toUpperCase();

console.log(originalText); // javascript
console.log(upperText); // JAVASCRIPT
~~~

The **toUpperCase** method returns a new string. The original string stays the same.

A mutable binding can be reassigned to that new value, but that is a new assignment:

~~~js
let text = "javascript";
text = text.toUpperCase();

console.log(text); // JAVASCRIPT
~~~

This updates the binding **text**. It does not mutate the original string.

## Assigning an object copies its reference

An object value can be used through a reference. Assigning that value to another binding copies the reference, not a separate object:

~~~js
const firstProfile = {
  name: "Asha"
};

const secondProfile = firstProfile;

secondProfile.name = "Mina";

console.log(firstProfile.name); // Mina
console.log(secondProfile.name); // Mina
~~~

Both bindings refer to the same object. A property change made through either name is visible through the other.

A simple diagram:

~~~text
firstProfile  ----+
                  +----> one profile object
secondProfile ----+
~~~

The two names are different, but there is only one object.

## Reassigning a binding is different from mutating an object

Reassigning one binding to a different object does not redirect another binding:

~~~js
let currentProfile = { name: "Asha" };
const savedProfile = currentProfile;

currentProfile = { name: "Mina" };

console.log(currentProfile.name); // Mina
console.log(savedProfile.name); // Asha
~~~

At first, both bindings referred to the first object. The reassignment made **currentProfile** refer to a new object. **savedProfile** still refers to the first object.

~~~text
savedProfile     --------> first profile object: Asha
currentProfile   --------> second profile object: Mina
~~~

These are separate actions:

- **Mutation** changes a property or element on an existing object.
- **Reassignment** makes a binding refer to another value.

## Objects passed to functions

Function arguments are passed by value. When the value is an object, the copied value is a reference to that object. The function can mutate the object through that reference:

~~~js
function changeName(profile) {
  profile.name = "Mina";
}

const user = { name: "Asha" };
changeName(user);

console.log(user.name); // Mina
~~~

The function parameter **profile** refers to the same object as **user**, so the property change is visible to the caller.

But assigning the parameter to another object does not reassign the caller's binding:

~~~js
function replaceProfile(profile) {
  profile = { name: "Local copy" };
}

const user = { name: "Asha" };
replaceProfile(user);

console.log(user.name); // Asha
~~~

The function parameter is its own binding. Reassigning it changes only what that parameter refers to. It does not change **user**.

This is often described as **pass by value**, where the value copied for an object is a reference. JavaScript is not pass by reference for variables.

## Object equality checks identity

Two different object creations produce two different objects, even if their properties look the same:

~~~js
const first = { level: 1 };
const second = { level: 1 };

console.log(first === second); // false
~~~

The objects have the same property values but different identities.

If two bindings refer to the same object, strict equality is true:

~~~js
const original = { level: 1 };
const anotherName = original;

console.log(original === anotherName); // true
~~~

For primitive values, strict equality compares the primitive values, with a few special cases covered in the equality chapter. For objects, it checks whether both operands refer to the same object.

## Making a shallow copy

A shallow copy creates a new outer object and copies its property values. The copied outer object has a different identity:

~~~js
const original = {
  name: "Asha",
  active: true
};

const copy = { ...original };

console.log(original === copy); // false
~~~

For these flat properties, changing the copy does not change the original:

~~~js
copy.name = "Mina";

console.log(original.name); // Asha
console.log(copy.name); // Mina
~~~

But a shallow copy does not recursively copy nested objects. The nested reference is copied, so both outer objects still share the nested object:

~~~js
const original = {
  name: "Asha",
  preferences: {
    theme: "light"
  }
};

const copy = { ...original };

copy.preferences.theme = "dark";

console.log(original.preferences.theme); // dark
console.log(copy.preferences.theme); // dark
~~~

The two **preferences** properties refer to the same nested object. Shallow copying and deep copying are different operations.

Arrays can also be shallow-copied with spread syntax:

~~~js
const originalColors = ["blue", "green"];
const copiedColors = [...originalColors];

console.log(originalColors === copiedColors); // false
~~~

The new array is separate, but nested objects or arrays inside it would still be shared references.

## Primitive wrappers are objects

JavaScript has object wrapper types such as **String**, **Number**, and **Boolean**, but they are different from primitive values:

~~~js
const primitiveText = "hello";
const wrapperText = new String("hello");

console.log(typeof primitiveText); // string
console.log(typeof wrapperText); // object
console.log(primitiveText === wrapperText); // false
~~~

Avoid using **new String**, **new Number**, or **new Boolean** for ordinary values. They create objects and can behave unexpectedly in comparisons and conditions. Use primitive literals such as **"hello"**, **42**, and **true**.

JavaScript can let primitive values access methods through temporary wrapper behavior. For example, **"hello".toUpperCase()** works without turning the string into a persistent String object.

## A practical checklist

When a change appears in an unexpected place, ask:

1. Is the value primitive or an object?
2. Did the assignment create an independent primitive value or copy an object reference?
3. Did the code mutate a property or reassign a binding?
4. Did a function change the shared object, or only reassign its parameter?
5. Is a spread copy shallow, leaving nested references shared?

These questions often reveal why changes do or do not appear through another variable.

## Common mistakes

- **Assuming object assignment makes a duplicate:** it copies a reference, so both bindings can reach the same object.
- **Confusing mutation with reassignment:** changing an object's property is different from assigning a different value to a variable.
- **Assuming a function can reassign the caller's variable through its parameter:** the function parameter is a separate binding.
- **Calling JavaScript pass by reference:** arguments are passed by value. For objects, the copied value is a reference to the object.
- **Expecting two matching object literals to be equal with ===:** they are distinct objects with different identities.
- **Assuming object spread deeply copies nested data:** spread makes a shallow copy, so nested objects can remain shared.
- **Treating strings as mutable:** string operations return values; they do not edit the existing string.
- **Using wrapper constructors for primitive values:** prefer primitive literals over **new String**, **new Number**, or **new Boolean**.
- **Using const to infer that an object cannot change:** **const** restricts rebinding, not mutation of the referenced object.

## Try it yourself

1. Assign a number to two **let** bindings. Reassign one and record both values.
2. Assign an object to two bindings. Change a property through one and read it through the other.
3. Reassign one of the object bindings to a new object. Check whether the other binding moved.
4. Pass an object into a function that mutates a property. Then pass it into a function that reassigns its parameter.
5. Compare two object literals with the same properties using **===**.
6. Assign an object to a new binding and compare both bindings using **===**.
7. Use object spread to make a shallow copy. Change a top-level property, then change a nested property.
8. Use array spread to make a copy and check whether it is a different array.
9. Compare a string primitive with **new String("hello")** using **typeof** and **===**.
10. Explain why a binding declared with **const** can still refer to an object whose properties change.

## Key points

- Primitive assignments copy primitive values independently.
- Primitive values are immutable. Operations produce values rather than editing primitives in place.
- Assigning an object copies a reference, so multiple bindings can refer to the same object.
- Mutating a shared object is visible through every reference to that object.
- Reassigning a binding changes only that binding.
- Function arguments are passed by value. For an object, the copied value is a reference to the object.
- Object equality with **===** compares identity, not matching property contents.
- Object spread and array spread make shallow copies.
- Wrapper objects such as **new String("hello")** are not the same as primitive values.
- **const** prevents rebinding but does not prevent mutation of a referenced object.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [14 - Values, types, and dynamic typing](014-values-types-and-dynamic-typing.md) | [Open Q&A](../qnas/015-primitive-values-and-object-references.md) | [Open example](../examples/015-primitive-values-and-object-references.md) | [16 - undefined, null, and NaN](016-undefined-null-and-nan.md) |