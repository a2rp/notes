# 10 - Variables: const, let, and var: Q&A

These questions review declaration, initialization, reassignment, scope basics, hoisting, and the Temporal Dead Zone.

## Multiple-choice questions

### 1. What does a variable declaration do?

A. Introduces a binding name  
B. Always freezes an object  
C. Runs a browser request  
D. Creates a comment

**Answer: A.** A declaration introduces a name that can refer to a value within its scope.

### 2. What is initialization?

A. Giving a binding its first value  
B. Renaming a file  
C. Removing a variable  
D. Repeating the same declaration

**Answer: A.** A declaration can include an initializer, such as **const name = "Asha"**.

### 3. Which declaration must have an initializer?

A. **var**  
B. **let**  
C. **const**  
D. All declarations

**Answer: C.** A **const** binding must be initialized when declared because it cannot be assigned later.

### 4. Which declaration should normally be preferred when a binding will not be reassigned?

A. **var**  
B. **const**  
C. A global assignment  
D. No declaration

**Answer: B.** **const** communicates that the binding itself will not be reassigned.

### 5. Which declaration allows reassignment and is block-scoped?

A. **let**  
B. **const**  
C. **var** only  
D. A function name

**Answer: A.** A **let** binding can receive a new value and is scoped to its block.

### 6. What happens when a **const** object property is changed?

A. It is always a SyntaxError  
B. The property can change while the binding still refers to the same object  
C. The object becomes a new binding  
D. The whole page reloads

**Answer: B.** **const** prevents rebinding. It does not deeply freeze object contents.

### 7. Which declaration is function-scoped rather than block-scoped?

A. **let**  
B. **const**  
C. **var**  
D. All three equally

**Answer: C.** **var** is scoped to its containing function, or to the script or module when not inside a function.

### 8. What value does a hoisted **var** have before its assignment runs?

A. **null**  
B. **undefined**  
C. The value of the next statement  
D. A SyntaxError in every case

**Answer: B.** The binding is available, but its initializer has not run yet, so it contains **undefined**.

### 9. What does TDZ stand for?

A. Temporary Data Zone  
B. Temporal Dead Zone  
C. Typed Declaration Zero  
D. Top-level Declaration Zone

**Answer: B.** The Temporal Dead Zone is the part of a **let** or **const** scope before its declaration is initialized.

### 10. What happens when a **let** is redeclared in the same scope?

A. The old declaration is silently replaced  
B. The program gets a SyntaxError  
C. The value becomes **undefined**  
D. It becomes a **var**

**Answer: B.** **let** and **const** cannot be redeclared in the same scope.

## True or false

### 11. A **const** binding can be reassigned if it was initialized with a number.

**Answer: False.** A **const** binding cannot be reassigned, regardless of the value's type.

### 12. A **const** array can be changed with **push**.

**Answer: True.** **push** mutates the array object. It does not reassign the binding.

### 13. A **let** declaration can omit its initializer.

**Answer: True.** It starts with the value **undefined** and can be assigned later.

### 14. A **var** declared inside an **if** block is limited to that block.

**Answer: False.** **var** does not have block scope. It belongs to the containing function, script, or module scope.

### 15. A **var** initializer is hoisted together with its declaration.

**Answer: False.** The declaration is processed before execution, but the assignment in the initializer happens only when execution reaches that line.

### 16. A **let** or **const** binding can be read before its declaration because the binding exists in the scope.

**Answer: False.** The binding cannot be accessed before initialization. A read in the TDZ causes a **ReferenceError**.

### 17. The **typeof** operator can always be used before a **let** declaration without an error.

**Answer: False.** **typeof** on a **let** or **const** binding inside its TDZ throws a **ReferenceError**.

### 18. A **var** declaration can be repeated in the same scope.

**Answer: True.** Repeating a **var** declaration in the same scope is allowed, though it can make code harder to understand.

### 19. A nested block can have its own **const** binding with the same name as an outer **const**.

**Answer: True.** Each binding belongs to a different block. Inside the nested block, the inner binding shadows the outer one.

### 20. Uppercase spelling makes a **const** object immutable.

**Answer: False.** Uppercase is only a naming convention. **const** prevents reassignment, not changes to object properties.

## Short-answer questions

### 21. What is the difference between reassignment and redeclaration?

**Answer:** Reassignment changes the value held by an existing binding. Redeclaration attempts to introduce the same binding name again in the same scope.

### 22. When should you use **let** instead of **const**?

**Answer:** Use **let** when the same binding needs to receive a different value later, such as a counter or a value that is updated during a calculation.

### 23. Why is **const** often the best starting choice?

**Answer:** It prevents accidental reassignment and makes it clear that the binding is intended to keep referring to its initial value.

### 24. Does **const** mean that the referenced object cannot change?

**Answer:** No. **const** prevents assigning a different value to the binding. The properties of an object or the elements of an array can still be modified.

### 25. What does **var** hoisting mean in practice?

**Answer:** A **var** binding is available in its function or script scope before the declaration line executes. Its initializer does not run early, so its value is **undefined** until the assignment is reached.

### 26. What happens in the Temporal Dead Zone?

**Answer:** A **let** or **const** binding exists in its scope but has not yet been initialized. Accessing it before the declaration line is evaluated throws a **ReferenceError**.

### 27. Why can shadowing make code confusing?

**Answer:** A nested binding with the same name temporarily hides the outer binding. Readers may need to track which binding a name refers to at each point.

### 28. Why should new code usually avoid **var**?

**Answer:** Its function scope, block behavior, and hoisting can make a name available in unexpected places. **const** and **let** make block boundaries and reassignment intent clearer.

## Read the code

### 29. What does this print?

~~~js
let page = 1;
page = page + 1;

console.log(page);
~~~

**Answer:**

~~~text
2
~~~

**let** allows reassignment, so the second line stores **2** in the existing binding.

### 30. What does this print?

~~~js
const profile = { name: "Asha" };
profile.name = "Mina";

console.log(profile.name);
~~~

**Answer:**

~~~text
Mina
~~~

The property changes, while **profile** continues to refer to the same object.

### 31. What happens when this runs?

~~~js
const count = 1;
count = 2;
~~~

**Answer:** Reassigning a **const** binding throws a **TypeError**. The precise error message can vary by engine.

### 32. What does this print?

~~~js
function inspectState() {
  console.log(state);
  var state = "ready";
  console.log(state);
}

inspectState();
~~~

**Answer:**

~~~text
undefined
ready
~~~

The **var** binding is available at the start of the function, but its assignment runs at the declaration line.

### 33. What happens here?

~~~js
{
  console.log(color);
  const color = "blue";
}
~~~

**Answer:** The first access throws a **ReferenceError** because **color** is in the TDZ until its declaration is initialized.

### 34. What does this print?

~~~js
const mode = "light";

{
  const mode = "dark";
  console.log(mode);
}

console.log(mode);
~~~

**Answer:**

~~~text
dark
light
~~~

The nested block has its own **mode** binding. After the block ends, the outer binding is visible again.

### 35. Does this code redeclare one binding?

~~~js
var message = "first";
var message = "second";

console.log(message);
~~~

**Answer: Yes.** Both declarations refer to the same **var** binding. The initializer in the second declaration assigns **"second"** to it, so that is printed.

### 36. What happens when the following runs in the same scope?

~~~js
let message = "first";
let message = "second";
~~~

**Answer:** It causes a **SyntaxError** because a **let** binding cannot be declared twice in the same scope.

### 37. What does this print?

~~~js
let selection;

console.log(selection);

selection = "blue";
console.log(selection);
~~~

**Answer:**

~~~text
undefined
blue
~~~

A **let** can be declared without an initializer. It has the value **undefined** until assigned.

### 38. What happens with this code?

~~~js
{
  console.log(typeof itemCount);
  let itemCount = 3;
}
~~~

**Answer:** It throws a **ReferenceError**. The **typeof** exception for undeclared names does not apply to a **let** binding while it is in the TDZ.

## Scenarios

### 39. You start with **let total = 0** and never assign a different value to **total**. Which declaration might communicate your intent better?

**Answer:** Use **const** if no later assignment is needed. If the code must update **total**, keep **let**.

### 40. You have a **const** array and want to append an item. Do you need to change it to **let**?

**Answer:** No. Calling **push** mutates the array without reassigning the binding. Change to **let** only if the binding itself must refer to another array.

### 41. A value reads as **undefined** before its **var** initializer. Is that the same as the TDZ?

**Answer:** No. A hoisted **var** binding is initialized to **undefined** and can be read. A **let** or **const** binding in the TDZ cannot be read and throws a **ReferenceError**.

### 42. A **var** declared inside a condition is unexpectedly visible after the condition. What explains this?

**Answer:** **var** is not block-scoped. Its scope is the containing function, script, or module, so the **if** braces do not contain it.

### 43. You need a value that starts as **undefined** and gets a result after a conditional. Which declaration can you use?

**Answer:** Use **let** with no initializer, then assign the result later. **const** must receive its initial value in its declaration.

### 44. You want an object binding that cannot be reassigned, but its properties should be updated. Which declaration fits?

**Answer:** Use **const**. It keeps the binding fixed while still allowing the object's contents to change.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [09 - Classic scripts, modules, and script loading](../lessons/009-classic-scripts-modules-and-script-loading.md) | [Open lesson](../lessons/010-variables-const-let-and-var.md) | [Open example](../examples/010-variables-const-let-and-var.md) | [11 - Scope: global, function, and block](../lessons/011-scope-global-function-and-block.md) |
