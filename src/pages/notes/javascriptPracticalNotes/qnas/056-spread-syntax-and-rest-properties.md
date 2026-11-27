# 56 - Spread syntax and rest properties: Q&A

This Q&A reviews spread in calls, arrays, and objects, rest parameters, object rest, property copying, overwrite order, and shallow copies. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. In a function parameter list, what does ...items do?

A. Expands items into separate arguments  
B. Gathers remaining arguments into an array  
C. Copies every property from an object  
D. Skips an argument

**Answer: B. Gathers remaining arguments into an array.**

**Explanation:** In a parameter list, the three dots introduce a rest parameter. Its position gives it the remaining arguments.

### 2. What does ...values do in an array literal?

~~~js
const copy = [...values];
~~~

A. Gathers values into a parameter  
B. Expands values from an iterable into array elements  
C. Copies only the length property  
D. Converts values to a string

**Answer: B. Expands values from an iterable into array elements.**

**Explanation:** In an array literal, spread consumes the operand's iterator and inserts its yielded values into the new array.

### 3. Which source can be spread into a function call?

A. A plain object with keys 0 and 1 only  
B. An iterable such as an array or Set  
C. Any object with a length property  
D. Only a string

**Answer: B. An iterable such as an array or Set.**

**Explanation:** Call spread uses the iterable protocol. Numeric property names and a length property do not by themselves make an object iterable.

### 4. Which properties does object spread copy?

A. Every own and inherited property  
B. Own enumerable string and symbol properties  
C. Only enumerable string properties  
D. Only properties created in an object literal

**Answer: B. Own enumerable string and symbol properties.**

**Explanation:** Object spread does not copy inherited or non-enumerable properties. Enumerable symbol properties are included.

### 5. What is the result of this expression?

~~~js
const result = { ...null, ...undefined, name: "Asha" };
~~~

A. A TypeError  
B. An empty object  
C. An object with name equal to "Asha"  
D. An object whose prototype is null

**Answer: C. An object with name equal to "Asha".**

**Explanation:** Object spread ignores null and undefined sources, then defines name.

### 6. What does a rest parameter receive when there are no extra arguments?

A. null  
B. undefined  
C. An empty array  
D. A new function

**Answer: C. An empty array.**

**Explanation:** A rest parameter always gathers the remaining arguments into an array, which can have length zero.

### 7. Which statement about array spread is correct?

A. It recursively clones nested arrays and objects  
B. It creates a new array, but nested object values remain shared references  
C. It changes the source array  
D. It copies only enumerable object properties

**Answer: B. It creates a new array, but nested object values remain shared references.**

**Explanation:** Spread creates a new outer array and copies the yielded values. Object values inside it are not deeply cloned.

### 8. Which property wins here?

~~~js
const result = { ...defaults, ...overrides, theme: "dark" };
~~~

A. The first theme in defaults always wins  
B. The theme in overrides always wins  
C. The explicit theme property at the end wins  
D. The result has multiple theme properties

**Answer: C. The explicit theme property at the end wins.**

**Explanation:** Object definitions are evaluated from left to right. A later property definition replaces an earlier value with the same key.

### 9. How many arguments are collected by this rest parameter?

~~~js
function show(first, ...remaining) {}
show("a", "b", "c");
~~~

A. Zero  
B. One  
C. Two  
D. Three

**Answer: C. Two.**

**Explanation:** first receives "a". The rest parameter gathers "b" and "c" into an array.

### 10. What does object rest collect in this pattern?

~~~js
const { id, ...details } = source;
~~~

A. The id property only  
B. Remaining own enumerable properties, excluding id  
C. All inherited properties  
D. The original source object

**Answer: B. Remaining own enumerable properties, excluding id.**

**Explanation:** Object rest creates a new shallow object from the remaining own enumerable properties.

### 11. What happens when an object with a getter is spread?

A. The getter descriptor is copied without running  
B. The getter runs to provide a value, which is copied as a data property  
C. The getter is removed from the source  
D. The spread fails

**Answer: B. The getter runs to provide a value, which is copied as a data property.**

**Explanation:** Object spread reads each enumerable own property's value. It does not preserve the accessor descriptor on the target.

### 12. What is true about a rest parameter's position?

A. It must be the first parameter  
B. It can appear anywhere  
C. It must be the last parameter  
D. It can be used only once per function call

**Answer: C. It must be the last parameter.**

**Explanation:** A rest parameter gathers all arguments that follow earlier parameters, so no parameter can come after it.

## True or false

### 13. Spread and rest use the same three dots but have different roles depending on context.

**Answer: True.**

**Explanation:** Spread expands values in calls and literals. Rest gathers remaining values in parameters and destructuring patterns.

### 14. Array spread can consume a Set.

**Answer: True.**

**Explanation:** A Set is iterable, so its yielded values can be expanded into an array.

### 15. An object with numeric keys and a length property is automatically iterable.

**Answer: False.**

**Explanation:** Array and call spread require an iterator. Array-like properties alone are insufficient.

### 16. An object spread copy has the same prototype as its source object.

**Answer: False.**

**Explanation:** Object spread copies selected property values into a new ordinary object. It does not copy the source prototype.

### 17. Object spread copies enumerable symbol properties.

**Answer: True.**

**Explanation:** It copies own enumerable properties whose keys are strings or symbols.

### 18. A rest parameter is an actual array.

**Answer: True.**

**Explanation:** Unlike the older arguments object, a rest parameter is an array and supports array methods directly.

### 19. Array spread preserves empty slots as empty holes.

**Answer: False.**

**Explanation:** The array iterator yields undefined for an empty slot. Spread adds that yielded value as an actual element in the new array.

### 20. Object rest and object spread create deep clones.

**Answer: False.**

**Explanation:** Both create a new outer object, but nested objects and arrays remain shared references.

## Short-answer questions

### 21. Explain the difference between spread and rest.

**Answer:** Spread expands values from an iterable or copies enumerable properties into a literal. Rest gathers remaining function arguments or destructured properties into a new collection.

**Explanation:** The surrounding syntax determines whether the three dots expand or collect values.

### 22. Why does this fail for an ordinary plain object?

~~~js
const values = { 0: "a", 1: "b", length: 2 };
const copy = [...values];
~~~

**Answer:** The object is not necessarily iterable.

**Explanation:** Array spread reads from the iterator protocol. Numeric keys and length do not provide an iterator automatically.

### 23. What does a rest parameter contain if no arguments remain?

**Answer:** An empty array.

**Explanation:** Rest parameters always gather remaining arguments into an array, even when there are none.

### 24. Why can an object spread getter have side effects?

**Answer:** Spread reads the getter's property value while copying it, so the getter runs.

**Explanation:** The target receives the returned value as a data property. It does not receive the original getter function or descriptor.

### 25. How does property order affect an object merge?

**Answer:** Later definitions replace earlier values for duplicate keys.

**Explanation:** Put defaults first and overrides later when later sources should take precedence.

### 26. Which properties does object rest exclude and include?

**Answer:** It excludes properties selected earlier in the destructuring pattern. It includes the remaining own enumerable string and symbol properties.

**Explanation:** It leaves out inherited and non-enumerable properties and creates a shallow new object.

### 27. Why is spreading a large array into a function call sometimes a problem?

**Answer:** Engines and environments have practical limits on the number of call arguments.

**Explanation:** For large collections, process the values with a loop or another collection-oriented API instead of making one enormous call.

### 28. Does object spread preserve property descriptors?

**Answer:** No. It reads enumerable own property values and creates ordinary data properties on the new object.

**Explanation:** Accessors may run, and flags such as writable, enumerable, and configurable are not preserved as descriptors.

## Predict the output

### 29. What is printed?

~~~js
const numbers = [3, 7, 2];
console.log(Math.max(...numbers));
~~~

**Answer:**

~~~text
7
~~~

**Explanation:** The array is expanded into three positional arguments to Math.max.

### 30. What is printed?

~~~js
function collect(first, ...rest) {
    return [first, rest.length, rest.join(", ")];
}

console.log(collect("a", "b", "c").join(" | "));
~~~

**Answer:**

~~~text
a | 2 | b, c
~~~

**Explanation:** first receives "a", and rest is an array containing the remaining two arguments.

### 31. What is printed?

~~~js
const original = ["a", "b"];
const result = ["start", ...original, "end"];

console.log(result.join(", "));
console.log(original.join(", "));
~~~

**Answer:**

~~~text
start, a, b, end
a, b
~~~

**Explanation:** Spread inserts the source values into a new array and leaves the original unchanged.

### 32. What is printed?

~~~js
const defaults = { theme: "light", compact: false };
const userOptions = { compact: true };
const result = { ...defaults, ...userOptions };

console.log(result.theme);
console.log(result.compact);
~~~

**Answer:**

~~~text
light
true
~~~

**Explanation:** Both sources are copied from left to right. userOptions appears later, so its compact value wins.

### 33. What is printed?

~~~js
const symbol = Symbol("id");
const source = { name: "Mina", [symbol]: 4 };
const copy = { ...source };

console.log(copy.name);
console.log(copy[symbol]);
console.log(Reflect.ownKeys(copy).length);
~~~

**Answer:**

~~~text
Mina
4
2
~~~

**Explanation:** Object spread includes enumerable own symbol keys as well as enumerable string keys.

### 34. What is printed?

~~~js
const source = { nested: { value: 1 } };
const copy = { ...source };

copy.nested.value = 9;

console.log(source.nested.value);
console.log(copy === source);
~~~

**Answer:**

~~~text
9
false
~~~

**Explanation:** The outer objects are different, but they share the nested object reference.

### 35. What is printed?

~~~js
const sparse = ["a", , "c"];
const copy = [...sparse];

console.log(1 in sparse);
console.log(1 in copy);
console.log(copy[1]);
~~~

**Answer:**

~~~text
false
true
undefined
~~~

**Explanation:** The array iterator yields undefined for the empty slot. The spread result contains an actual element at that position.

### 36. What is printed?

~~~js
const source = {
    get value() {
        return 5;
    }
};

const copy = { ...source };
const descriptor = Object.getOwnPropertyDescriptor(copy, "value");

console.log(copy.value);
console.log(typeof descriptor.get);
~~~

**Answer:**

~~~text
5
undefined
~~~

**Explanation:** The getter is invoked while the value is read. The new object stores the resulting value as a data property.

### 37. What is printed?

~~~js
const source = JSON.parse('{"__proto__":{"admin":true}}');
const copy = { ...source };

console.log(Object.hasOwn(copy, "__proto__"));
console.log(copy.__proto__.admin);
console.log(Object.getPrototypeOf(copy) === Object.prototype);
~~~

**Answer:**

~~~text
true
true
true
~~~

**Explanation:** Object spread creates an own data property named "__proto__". It does not use the special object-literal prototype setter form.

### 38. What is printed?

~~~js
const result = { ...null, ...undefined, ready: true };

console.log(result.ready);
console.log(Object.keys(result).length);
~~~

**Answer:**

~~~text
true
1
~~~

**Explanation:** Null and undefined sources are ignored by object spread. The ready property is then added normally.

### 39. What is printed?

~~~js
const set = new Set(["red", "blue"]);
const colors = [...set];

console.log(Array.isArray(colors));
console.log(colors.join(", "));
~~~

**Answer:**

~~~text
true
red, blue
~~~

**Explanation:** The Set iterator supplies values to array spread, producing a new array.

### 40. What is printed?

~~~js
const source = {
    id: 3,
    name: "Asha",
    role: "author"
};

const { id, ...details } = source;

console.log(id);
console.log(Object.keys(details).join(", "));
~~~

**Answer:**

~~~text
3
name, role
~~~

**Explanation:** Object rest gathers the remaining own enumerable properties after id is selected.

## Coding questions

### 41. Write a function that accepts any number of values and returns their total.

**Answer:**

~~~js
function sum(...values) {
    let total = 0;

    for (const value of values) {
        total += value;
    }

    return total;
}

console.log(sum(2, 3, 4));
console.log(sum());
~~~

Output:

~~~text
9
0
~~~

**Explanation:** The rest parameter collects all arguments in an array. With no arguments, the array is empty and the total remains zero.

### 42. Combine two arrays into a new array without changing either source.

**Answer:**

~~~js
const required = ["name", "email"];
const optional = ["phone", "company"];
const fields = [...required, ...optional];

console.log(fields.join(", "));
console.log(required.length);
console.log(optional.length);
~~~

Output:

~~~text
name, email, phone, company
2
2
~~~

**Explanation:** Both iterables are expanded into a new array. The original arrays are not modified.

### 43. Convert a Set to an array.

**Answer:**

~~~js
const uniqueIds = new Set([8, 3, 8, 5]);
const ids = [...uniqueIds];

console.log(Array.isArray(ids));
console.log(ids.join(", "));
~~~

Output:

~~~text
true
8, 3, 5
~~~

**Explanation:** Array spread consumes the Set iterator. The Set yields each distinct value once.

### 44. Create a new options object where caller values override defaults.

**Answer:**

~~~js
const defaults = {
    theme: "light",
    compact: false,
    language: "en"
};

const supplied = {
    theme: "dark",
    compact: true
};

const options = {
    ...defaults,
    ...supplied
};

console.log(options.theme);
console.log(options.compact);
console.log(options.language);
~~~

Output:

~~~text
dark
true
en
~~~

**Explanation:** Defaults are copied first. Supplied values are copied later and replace matching keys while leaving other defaults in place.

### 45. Copy an object while omitting its internal id.

**Answer:**

~~~js
const user = {
    id: 12,
    name: "Mina",
    role: "editor"
};

const { id, ...publicUser } = user;

console.log(id);
console.log(Object.keys(publicUser).join(", "));
~~~

Output:

~~~text
12
name, role
~~~

**Explanation:** The pattern binds id separately. Object rest gathers the remaining own enumerable properties into publicUser.

### 46. Add a rest parameter after a required argument and join all remaining labels.

**Answer:**

~~~js
function joinLabels(separator, ...labels) {
    return labels.join(separator);
}

console.log(joinLabels(" / ", "HTML", "CSS", "JavaScript"));
~~~

Output:

~~~text
HTML / CSS / JavaScript
~~~

**Explanation:** separator receives the first argument. The rest parameter contains each later label.

### 47. Copy only enumerable own properties from a source object.

**Answer:**

~~~js
const prototype = {
    inherited: true
};

const source = Object.create(prototype);
source.visible = "yes";

Object.defineProperty(source, "hidden", {
    value: "no",
    enumerable: false
});

const copy = { ...source };

console.log(copy.visible);
console.log(copy.inherited);
console.log(copy.hidden);
~~~

Output:

~~~text
yes
undefined
undefined
~~~

**Explanation:** Object spread copies visible because it is an own enumerable property. It skips the inherited and non-enumerable properties.

### 48. Demonstrate that spread is a shallow array copy.

**Answer:**

~~~js
const original = [{ name: "Asha" }];
const copy = [...original];

copy[0].name = "Dev";

console.log(original[0].name);
console.log(original === copy);
console.log(original[0] === copy[0]);
~~~

Output:

~~~text
Dev
false
true
~~~

**Explanation:** The outer arrays differ, but the object stored at index zero is shared. Spread does not make a deep copy.

## Review checklist

- Spread expands iterable values in calls and array literals.
- Rest parameters gather remaining arguments into an array and must be last.
- Object spread copies own enumerable string and symbol properties.
- Object rest gathers remaining own enumerable properties after selected keys are excluded.
- Later object properties override earlier properties with the same key.
- Array and object copies made with spread are shallow.
- Array-like objects are not necessarily iterable.
- Object spread reads property values and does not preserve accessor descriptors.
- Null and undefined are ignored as object spread sources, but object destructuring null or undefined still throws.
- Use loops or collection-oriented APIs for very large argument lists.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [55 - Object and array destructuring](055-object-and-array-destructuring.md) | [Open lesson](../lessons/056-spread-syntax-and-rest-properties.md) | [Open example](../examples/056-spread-syntax-and-rest-properties.md) | [57 - Object identity, shallow copies, deep copies, and structuredClone](../lessons/057-object-identity-shallow-copies-deep-copies-and-structuredclone.md) |
