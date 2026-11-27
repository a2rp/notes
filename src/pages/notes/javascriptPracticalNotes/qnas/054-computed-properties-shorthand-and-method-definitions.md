# 54 - Computed properties, shorthand, and method definitions: Q&A

This Q&A reviews object-literal property names, computed keys, shorthand properties, method definitions, duplicate keys, evaluation order, and the special object-literal prototype setter. Each answer and explanation appears immediately after its question.

## Multiple-choice questions

### 1. What does this object literal create?

~~~js
const field = "email";
const user = { [field]: "asha@example.test" };
~~~

A. An object with a property named field  
B. An object with a property named email  
C. An object whose key changes whenever field changes  
D. A syntax error

**Answer: B. An object with a property named email.**

**Explanation:** Brackets mark a computed property name. JavaScript evaluates field when it creates the object, and its string value becomes the key.

### 2. What is shorthand for the definition name: name?

A. name  
B. [name]  
C. this.name  
D. name()

**Answer: A. name**

**Explanation:** A shorthand property reads an in-scope binding and uses its identifier for both the property key and value.

### 3. What happens if a shorthand identifier has no binding in scope?

A. The property is created with null  
B. The property is created with undefined  
C. The object literal throws a ReferenceError when evaluated  
D. The identifier is converted to a string automatically

**Answer: C. The object literal throws a ReferenceError when evaluated.**

**Explanation:** Shorthand syntax evaluates an identifier reference. It does not invent a value for an undeclared name.

### 4. When is a computed property name evaluated?

A. Every time the property is read  
B. When the object literal is evaluated  
C. Only when Object.keys is called  
D. When the variable holding the object is declared, even if the literal is never evaluated

**Answer: B. When the object literal is evaluated.**

**Explanation:** The computed expression produces the key during object creation. The object does not retain the expression.

### 5. Which computed result can remain a symbol property key?

A. A Symbol value  
B. A Boolean value  
C. A regular expression  
D. Any object without conversion

**Answer: A. A Symbol value.**

**Explanation:** Property keys are strings or symbols. Non-symbol computed values are converted to strings.

### 6. Which definition creates a method named multiply?

A. multiply: (a, b) => a * b  
B. multiply(a, b) { return a * b; }  
C. [multiply] = (a, b) => a * b  
D. multiply => { return a * b; }

**Answer: B. multiply(a, b) { return a * b; }**

**Explanation:** This is concise method-definition syntax. Option A is an arrow function stored as a property value, which is a different definition form.

### 7. In user.describe(), what supplies this to an ordinary method?

A. The object before the dot, user  
B. The method's first parameter  
C. The object where the method was originally written, permanently  
D. The global object in all cases

**Answer: A. The object before the dot, user.**

**Explanation:** A method call uses its receiver as this. Defining a method on an object does not permanently bind it to that object.

### 8. Why is an arrow function usually unsuitable for an object property that needs receiver-based this?

A. Arrow functions cannot be stored in objects  
B. Arrow functions use this from their surrounding scope  
C. Arrow functions always return undefined  
D. Arrow functions cannot read object properties

**Answer: B. Arrow functions use this from their surrounding scope.**

**Explanation:** Arrow functions do not create their own this. An ordinary method is usually clearer when this should refer to the receiver.

### 9. What does the later definition do here?

~~~js
const settings = { mode: "draft", mode: "published" };
~~~

A. It causes a syntax error in every JavaScript version  
B. It leaves both values stored under two mode keys  
C. It replaces the earlier value  
D. It changes mode into a symbol

**Answer: C. It replaces the earlier value.**

**Explanation:** The object has one mode property, and its final value is published. Repeated keys are usually best avoided unless the override is intentional.

### 10. Which form uses a variable's value as the property key?

A. { field: value }  
B. { [field]: value }  
C. { "field": value }  
D. { this.field: value }

**Answer: B. { [field]: value }**

**Explanation:** Brackets indicate that field is an expression. Without brackets, field is simply the literal property name.

### 11. Which statement about this object literal is correct?

~~~js
const defaults = { active: true };
const options = { __proto__: defaults };
~~~

A. options owns the active property  
B. options has defaults as its prototype  
C. It creates an own property named __proto__ with value defaults  
D. It throws because defaults is an object

**Answer: B. options has defaults as its prototype.**

**Explanation:** The uncomputed __proto__: value form in an object initializer is a special prototype setter. Since defaults is an object, it becomes options' prototype.

### 12. Which form creates an ordinary own property named __proto__?

A. { __proto__: source }  
B. { ["__proto__"]: source }  
C. Both forms have the same special behavior  
D. Neither form can use that name

**Answer: B. { ["__proto__"]: source }**

**Explanation:** A computed property name is an ordinary property definition. Only the uncomputed colon form has the special prototype-setting behavior.

## True or false

### 13. In { name }, JavaScript reads the current value of the name binding while creating the object.

**Answer: True.**

**Explanation:** Shorthand is equivalent to name: name. The object stores that value at the time the literal is evaluated.

### 14. If the name variable changes later, the value in an object created with { name } changes automatically.

**Answer: False.**

**Explanation:** The property stores the value read during creation. It is not a live link to the variable.

### 15. A computed property expression can return a symbol to create a symbol-keyed property.

**Answer: True.**

**Explanation:** Symbol values are valid property keys and remain symbols instead of being converted to strings.

### 16. A computed key expression runs again whenever the property is accessed.

**Answer: False.**

**Explanation:** The expression is evaluated once as the object literal is evaluated. Later access uses the resulting property key.

### 17. Method shorthand and an arrow function property have identical this behavior.

**Answer: False.**

**Explanation:** An ordinary method call receives this from its receiver. An arrow function uses this from its surrounding scope.

### 18. An object literal can contain the same ordinary property name more than once.

**Answer: True.**

**Explanation:** Later definitions replace earlier values. Duplicate keys can make code confusing and should be intentional.

### 19. Every property named __proto__ changes an object's prototype.

**Answer: False.**

**Explanation:** The special behavior applies only to the uncomputed __proto__: value form in an object initializer. A computed key creates ordinary data.

### 20. Object-literal property definitions are evaluated from left to right.

**Answer: True.**

**Explanation:** This includes computed key expressions and associated value expressions, so side effects can be observed in that order.

## Short-answer questions

### 21. What is the difference between field: value and [field]: value inside an object literal?

**Answer:** field: value creates the literal key "field". [field]: value evaluates the variable or expression named field and uses its result as the key.

**Explanation:** Brackets turn the property name into an expression. For a dynamic field name, use the bracketed form.

### 22. When is shorthand useful, and when should the full key: value form be used?

**Answer:** Use shorthand when a variable name exactly matches the desired property name. Use key: value when the key differs from the variable or when an expression supplies the value.

**Explanation:** For example, { name } is concise when name is already the intended key. { displayName: name } clearly maps one name to another.

### 23. What happens if a computed key expression evaluates to the number 7?

**Answer:** The number is converted to the string property key "7".

**Explanation:** Ordinary object property keys are strings or symbols. A symbol is retained; other computed values are converted to strings.

### 24. Does defining a method on an object permanently bind it to that object?

**Answer:** No. The receiver of each call determines this for an ordinary method.

**Explanation:** Calling object.method() supplies object as this. Extracting the method and calling it separately no longer calls it through the original receiver.

### 25. Give one practical difference between method syntax and a function-valued property.

**Answer:** A method definition is concise and its function cannot be used as a constructor. A function-valued property stores a function expression or other function value.

**Explanation:** Both can be called through an object, but their function behavior is not identical. Method syntax also makes object APIs easier to scan.

### 26. What happens when an object literal defines an ordinary key twice?

**Answer:** The later definition replaces the earlier value for that key.

**Explanation:** The resulting object contains one property with that key and the final assigned value.

### 27. What is the difference between { __proto__: base } and { ["__proto__"]: base }?

**Answer:** The first form sets the new object's prototype to base when base is an object or null. The second creates an own property named "__proto__" whose value is base.

**Explanation:** Only the uncomputed special colon form has prototype-setting behavior in an object initializer.

### 28. Why should a computed property expression usually be simple?

**Answer:** It runs during object creation and may have side effects or depend on changing state.

**Explanation:** A complicated expression can make it harder to see which key is created and in what order other expressions run.

## Predict the output

### 29. What is printed?

~~~js
let value = "first";
const record = { value };

value = "second";

console.log(record.value);
console.log(value);
~~~

**Answer:**

~~~text
first
second
~~~

**Explanation:** The shorthand property stores the value read when record is created. It does not track later assignments to value.

### 30. What is printed?

~~~js
let key = "one";
const record = { [key]: 1 };

key = "two";

console.log(record.one);
console.log(record.two);
~~~

**Answer:**

~~~text
1
undefined
~~~

**Explanation:** The computed key was evaluated while the literal was created, when key held "one".

### 31. What is printed?

~~~js
const key = Symbol("id");
const record = { [key]: 5 };

console.log(record[key]);
console.log(typeof Reflect.ownKeys(record)[0]);
~~~

**Answer:**

~~~text
5
symbol
~~~

**Explanation:** A symbol used as a computed key remains a symbol key, and bracket access reads its value.

### 32. What is printed?

~~~js
const settings = {
    mode: "draft",
    mode: "ready"
};

console.log(settings.mode);
console.log(Object.keys(settings).length);
~~~

**Answer:**

~~~text
ready
1
~~~

**Explanation:** The second definition replaces the first value. There is still only one own key named mode.

### 33. What is printed?

~~~js
const steps = [];
function mark(value) {
    steps.push(value);
    return value;
}

const record = {
    [mark("key")]: mark("value")
};

console.log(steps.join(", "));
~~~

**Answer:**

~~~text
key, value
~~~

**Explanation:** JavaScript evaluates the computed property name first, then evaluates its associated value.

### 34. What is printed?

~~~js
const base = { active: true };
const object = { __proto__: base };

console.log(object.active);
console.log(Object.hasOwn(object, "active"));
~~~

**Answer:**

~~~text
true
false
~~~

**Explanation:** active is inherited through the prototype set by the special object-literal form. It is not an own property of object.

### 35. What is printed?

~~~js
const object = { ["__proto__"]: "data" };

console.log(Object.hasOwn(object, "__proto__"));
console.log(object.__proto__);
~~~

**Answer:**

~~~text
true
data
~~~

**Explanation:** A computed property name is an ordinary own property definition. It does not set the object's prototype.

### 36. What is printed?

~~~js
const name = "Asha";
const role = "author";
const user = { name, role: name };

console.log(user.name);
console.log(user.role);
~~~

**Answer:**

~~~text
Asha
Asha
~~~

**Explanation:** name is shorthand for name: name. The role property uses the explicit key role and reads the variable name for its value.

## Coding questions

### 37. Create an object whose property key comes from a variable named field, then print the stored value.

**Answer:**

~~~js
const field = "status";
const record = {
    [field]: "ready"
};

console.log(record.status);
~~~

Output:

~~~text
ready
~~~

**Explanation:** The brackets evaluate field and use "status" as the key.

### 38. Use shorthand to create an object with name and score properties, then print both values.

**Answer:**

~~~js
const name = "Mina";
const score = 18;
const result = { name, score };

console.log(result.name);
console.log(result.score);
~~~

Output:

~~~text
Mina
18
~~~

**Explanation:** Each shorthand property uses the variable name as the key and reads its value.

### 39. Create an object method that returns a full name from firstName and lastName.

**Answer:**

~~~js
const person = {
    firstName: "Asha",
    lastName: "Rao",
    fullName() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(person.fullName());
~~~

Output:

~~~text
Asha Rao
~~~

**Explanation:** Calling person.fullName() makes person the receiver, so this refers to person inside the method.

### 40. Create a computed method named from an operation variable and call it.

**Answer:**

~~~js
const operation = "subtract";
const calculator = {
    [operation](first, second) {
        return first - second;
    }
};

console.log(calculator.subtract(9, 4));
~~~

Output:

~~~text
5
~~~

**Explanation:** The computed name is evaluated during object creation and becomes the method key subtract.

### 41. Add a symbol-keyed method and call it using bracket notation.

**Answer:**

~~~js
const describe = Symbol("describe");
const item = {
    name: "Notebook",
    [describe]() {
        return this.name;
    }
};

console.log(item[describe]());
~~~

Output:

~~~text
Notebook
~~~

**Explanation:** Symbols cannot be written as dot-notation names. Brackets evaluate the symbol variable, and the call's receiver is item.

### 42. Build an object from an array of field names using computed keys.

**Answer:**

~~~js
const fields = ["firstName", "lastName"];
const values = ["Mina", "Dev"];
const person = {
    [fields[0]]: values[0],
    [fields[1]]: values[1]
};

console.log(person.firstName);
console.log(person.lastName);
~~~

Output:

~~~text
Mina
Dev
~~~

**Explanation:** Each bracket expression is evaluated to produce a key. This is useful when a key is selected from data.

### 43. Create a new object that inherits a default setting using the object-literal prototype form. Check whether the setting is own or inherited.

**Answer:**

~~~js
const defaults = { theme: "light" };
const options = {
    __proto__: defaults,
    compact: true
};

console.log(options.theme);
console.log(Object.hasOwn(options, "theme"));
console.log(Object.hasOwn(options, "compact"));
~~~

Output:

~~~text
light
false
true
~~~

**Explanation:** The special uncomputed __proto__ entry sets the prototype. theme comes from defaults, while compact is defined directly on options.

### 44. Rewrite this object using shorthand where it is clear, while preserving the renamed key.

~~~js
const title = "Guide";
const pageCount = 12;

const book = {
    title: title,
    pages: pageCount
};
~~~

**Answer:**

~~~js
const title = "Guide";
const pageCount = 12;

const book = {
    title,
    pages: pageCount
};

console.log(book.title);
console.log(book.pages);
~~~

Output:

~~~text
Guide
12
~~~

**Explanation:** title uses the same variable and property name, so shorthand is clear. The pages key differs from pageCount, so keep the explicit mapping.

## Review checklist

- Use brackets around a computed property name.
- Remember that computed expressions are evaluated during object creation.
- Use shorthand only when the matching variable exists in scope.
- Remember that shorthand stores the current value, not a live variable binding.
- Use method syntax when defining an ordinary object method.
- Use an arrow function only when its surrounding this behavior is intended.
- Expect the later duplicate ordinary key to replace the earlier value.
- Distinguish the special uncomputed __proto__ prototype setter from a computed own property.
- Keep key and value expressions simple enough to read their evaluation order.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [53 - Property keys, descriptors, and enumerability](053-property-keys-descriptors-and-enumerability.md) | [Open lesson](../lessons/054-computed-properties-shorthand-and-method-definitions.md) | [Open example](../examples/054-computed-properties-shorthand-and-method-definitions.md) | [55 - Object and array destructuring](../lessons/055-object-and-array-destructuring.md) |
