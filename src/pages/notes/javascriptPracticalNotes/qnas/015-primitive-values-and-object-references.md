# 15 - Primitive values and object references: Q&A

Use these questions to review how primitive values and objects behave when assigned, compared, or passed to functions. Each answer follows its question.

## Multiple-choice questions

### 1. What happens when one primitive value is assigned to another binding?

A. Both bindings must always change together  
B. The primitive value is copied to the second binding  
C. The value becomes an object  
D. The first binding is removed

**Answer: B.** The second binding receives the primitive value independently. Reassigning the first binding later does not change the second.

### 2. What happens when one object value is assigned to another binding?

A. A deep duplicate is always created  
B. The reference to the same object is copied  
C. The object is converted to a string  
D. The first binding is cleared

**Answer: B.** Both bindings can refer to the same object. A mutation through either binding is visible through the other.

### 3. What does it mean that primitive values are immutable?

A. A variable holding a primitive can never be reassigned  
B. The primitive value cannot be changed in place  
C. Primitive values are always constants  
D. Primitive values cannot be compared

**Answer: B.** An operation such as **toUpperCase** produces a new string value. A mutable binding can be reassigned, but the original primitive is not edited in place.

### 4. What is the difference between mutation and reassignment?

A. They mean exactly the same thing  
B. Mutation changes an existing object's contents; reassignment makes a binding refer to another value  
C. Mutation changes a binding's name; reassignment changes its scope  
D. Only primitive values can be mutated

**Answer: B.** Changing **profile.name** mutates an object. Assigning a new object to **profile** reassigns the binding.

### 5. If two variables refer to the same object, what happens when a property is changed through one of them?

A. The other variable sees the changed property  
B. The property change is hidden from the other variable  
C. The other variable is reassigned automatically  
D. A copy of the object is created

**Answer: A.** Both references lead to the same object, so the mutation can be observed through either binding.

### 6. What happens when a function reassigns its object parameter to a new object?

A. The caller's variable is automatically reassigned  
B. Only the function's parameter binding is changed  
C. The original object is always deleted  
D. All other references are redirected

**Answer: B.** The parameter is a separate binding. Reassigning it does not reassign the caller's variable.

### 7. What happens when a function mutates a property on an object parameter?

A. The caller can observe the mutation through its reference  
B. The caller's binding is renamed  
C. The parameter becomes a primitive  
D. The mutation is discarded when the function returns

**Answer: A.** The parameter contains a copied reference to the same object, so the mutation is visible to the caller.

### 8. What does **first === second** check when both values are objects?

A. Whether their properties have the same names  
B. Whether both refer to the same object identity  
C. Whether both objects were created on the same line  
D. Whether both variables have the same name

**Answer: B.** Strict equality compares object identity. Two distinct objects with matching properties are not equal with **===**.

### 9. What does object spread create?

A. A deep copy of every nested value  
B. A shallow copy of the outer object  
C. A new reference to the same outer object  
D. A frozen object

**Answer: B.** Object spread creates a new outer object and copies property values. Nested objects are still shared references.

### 10. What happens when a string's **toUpperCase** method runs?

A. It modifies the original string in place  
B. It returns a new string  
C. It converts the string into a mutable object  
D. It changes every binding holding that string

**Answer: B.** Strings are primitive and immutable. The method returns a new string value.

### 11. Which statement about JavaScript function arguments is correct?

A. JavaScript passes caller variables by reference  
B. JavaScript passes values. An object value copied to a parameter is a reference to the object  
C. Functions always deep-copy object arguments  
D. A parameter cannot refer to an object

**Answer: B.** The parameter is a separate binding receiving a value. For an object, that value is a reference to the same object.

### 12. What is the difference between **"hello"** and **new String("hello")**?

A. They are both primitive strings  
B. The first is a string primitive; the second is a String object  
C. The first is an object; the second is a primitive  
D. There is no difference in type or identity

**Answer: B.** Wrapper constructors such as **new String** create objects. Prefer primitive string literals for ordinary text.

## True or false

### 13. Reassigning a primitive binding changes another binding that previously received its value.

**Answer: False.** The primitive value was copied. Reassigning one binding does not affect the other.

### 14. Two bindings can refer to the same object.

**Answer: True.** Assigning an object value to another binding copies its reference.

### 15. Changing a property through one reference can be seen through another reference to the same object.

**Answer: True.** Both references reach the same object.

### 16. Reassigning an object parameter changes the caller's variable.

**Answer: False.** The parameter is a separate binding. Reassigning it only changes the parameter's reference.

### 17. Mutating an object through a parameter can affect the object the caller passed.

**Answer: True.** The parameter refers to the same object, so a property mutation is visible to the caller.

### 18. JavaScript passes every object argument by reference.

**Answer: False.** JavaScript passes values. The value copied for an object is a reference to that object.

### 19. Two separate object literals with identical properties compare equal with **===**.

**Answer: False.** They are separate objects with separate identities.

### 20. Object spread recursively copies every nested object.

**Answer: False.** Object spread makes a shallow copy. Nested object references remain shared.

### 21. A **const** object cannot have its properties changed.

**Answer: False.** **const** prevents rebinding. It does not prevent mutation of the referenced object.

### 22. A primitive string can be changed in place by calling **toUpperCase**.

**Answer: False.** **toUpperCase** returns a new string. The original string stays unchanged.

## Predict the result

### 23. What does this code print?

~~~js
let first = 4;
let second = first;
first = 9;

console.log(first);
console.log(second);
~~~

**Answer:**

~~~text
9
4
~~~

The assignment copied the primitive number value. Reassigning **first** does not change **second**.

### 24. What does this code print?

~~~js
const first = { status: "pending" };
const second = first;

second.status = "complete";

console.log(first.status);
console.log(second.status);
~~~

**Answer:**

~~~text
complete
complete
~~~

Both bindings refer to the same object. Mutating the property through **second** changes the object seen through **first**.

### 25. What does this code print?

~~~js
let current = { name: "Asha" };
const saved = current;

current = { name: "Mina" };

console.log(current.name);
console.log(saved.name);
~~~

**Answer:**

~~~text
Mina
Asha
~~~

Reassigning **current** makes only that binding refer to a new object. **saved** still refers to the original object.

### 26. What does this code print?

~~~js
const first = { level: 1 };
const second = { level: 1 };
const third = first;

console.log(first === second);
console.log(first === third);
~~~

**Answer:**

~~~text
false
true
~~~

**first** and **second** refer to separate objects with matching contents. **third** refers to the same object as **first**.

### 27. What does this code print?

~~~js
function changeName(profile) {
  profile.name = "Mina";
}

const user = { name: "Asha" };
changeName(user);

console.log(user.name);
~~~

**Answer:**

~~~text
Mina
~~~

The parameter refers to the same object as **user**, so its property mutation is visible after the function returns.

### 28. What does this code print?

~~~js
function replaceProfile(profile) {
  profile = { name: "Local" };
}

const user = { name: "Asha" };
replaceProfile(user);

console.log(user.name);
~~~

**Answer:**

~~~text
Asha
~~~

The function reassigns only its local parameter. It does not reassign the caller's **user** binding.

### 29. What does this code print?

~~~js
const original = {
  settings: {
    theme: "light"
  }
};

const copy = { ...original };
copy.settings.theme = "dark";

console.log(original.settings.theme);
console.log(copy.settings.theme);
console.log(original === copy);
~~~

**Answer:**

~~~text
dark
dark
false
~~~

The outer objects are different, but the nested **settings** object is shared by the shallow copy.

### 30. What does this code print?

~~~js
const original = "hello";
const changed = original.toUpperCase();

console.log(original);
console.log(changed);
~~~

**Answer:**

~~~text
hello
HELLO
~~~

The string operation returns a new string. It does not mutate **original**.

### 31. What does this code print?

~~~js
const original = ["blue", "green"];
const copy = [...original];

copy[0] = "red";

console.log(original[0]);
console.log(copy[0]);
console.log(original === copy);
~~~

**Answer:**

~~~text
blue
red
false
~~~

Array spread creates a new outer array. Updating a top-level element in the copy does not change the original array.

### 32. What does this code print?

~~~js
const original = [{ label: "blue" }];
const copy = [...original];

copy[0].label = "red";

console.log(original[0].label);
console.log(copy[0].label);
~~~

**Answer:**

~~~text
red
red
~~~

The arrays are different, but their first elements refer to the same nested object. The nested property mutation is visible through both arrays.

## Short-answer questions

### 33. Why can a property change be visible through two different variable names?

**Answer:** Both bindings may refer to the same object. A property mutation changes that one shared object, so reading through either reference observes the change.

### 34. Explain why JavaScript is described as passing object references by value.

**Answer:** A function argument receives a copy of the argument value. If the value is an object, that copied value is a reference to the same object. The parameter can mutate that object, but reassigning the parameter does not change the caller's binding.

### 35. How are mutation and reassignment different when a binding refers to an object?

**Answer:** Mutation changes a property or element on the existing object. Reassignment makes the binding refer to another value or object.

### 36. Why can two object literals with identical data still be unequal with **===**?

**Answer:** They are two different objects. For objects, **===** compares identity, not their property contents.

### 37. What does "shallow copy" mean?

**Answer:** A shallow copy creates a new outer object or array and copies its immediate property values or elements. If one of those values is a nested object, its reference is copied rather than the nested object itself.

### 38. Why does **const** not prevent an object mutation?

**Answer:** **const** prevents the binding from being reassigned. It does not freeze the object that the binding refers to.

## Coding questions

### 39. Write a function that mutates an object's **active** property.

**Answer:**

~~~js
function activate(user) {
  user.active = true;
}

const account = { active: false };
activate(account);

console.log(account.active); // true
~~~

The parameter and **account** refer to the same object, so the mutation is visible to the caller.

### 40. Write a function that returns a new object instead of mutating the supplied object.

**Answer:**

~~~js
function withUpdatedName(profile, name) {
  return {
    ...profile,
    name
  };
}

const original = { name: "Asha", active: true };
const updated = withUpdatedName(original, "Mina");

console.log(original.name); // Asha
console.log(updated.name); // Mina
console.log(original === updated); // false
~~~

Spread makes a new outer object. This example's properties are flat, so the copied values do not include nested references.

### 41. Make a shallow array copy and explain what is shared.

**Answer:**

~~~js
const original = ["red", "blue"];
const copy = [...original];

console.log(original === copy); // false
~~~

The arrays themselves are different. If the array contained nested objects, those object references would still be shared.

### 42. Show how a function can mutate an object but cannot reassign the caller's binding through its parameter.

**Answer:**

~~~js
function updateAndReplace(profile) {
  profile.name = "Updated";
  profile = { name: "Local replacement" };
}

const user = { name: "Asha" };
updateAndReplace(user);

console.log(user.name); // Updated
~~~

The property mutation changes the shared object. Reassigning the local parameter afterward does not change **user**.

### 43. Check whether two bindings refer to the same object.

**Answer:**

~~~js
const first = { id: 1 };
const second = first;
const third = { id: 1 };

console.log(first === second); // true
console.log(first === third); // false
~~~

**second** receives the same reference as **first**. **third** is a different object even though its property matches.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [14 - Values, types, and dynamic typing](../lessons/014-values-types-and-dynamic-typing.md) | [Open lesson](../lessons/015-primitive-values-and-object-references.md) | [Open example](../examples/015-primitive-values-and-object-references.md) | [16 - undefined, null, and NaN](../lessons/016-undefined-null-and-nan.md) |