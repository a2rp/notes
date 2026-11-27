# 08 - Identifiers, keywords, reserved words, and naming

Names let you refer to values and program elements in JavaScript. This lesson explains how identifiers are written, why some names cannot be used for variables, and how to choose names that make code easier to understand.

## What is an identifier?

An **identifier** is a name used in source code. You use identifiers for variables, functions, classes, parameters, and other bindings.

~~~js
const firstName = "Asha";

function greet(personName) {
  return "Hello, " + personName;
}

console.log(greet(firstName));
~~~

In this example, **firstName**, **greet**, and **personName** are identifiers. The string **"Asha"** and the keyword **const** are not identifiers.

Identifiers can also appear in other language positions. For example, **status** is a property name in this object:

~~~js
const account = {
  status: "active"
};
~~~

## Basic identifier rules

A JavaScript identifier:

- Can contain letters, digits, underscores, and dollar signs.
- Cannot begin with a digit.
- Can begin with a letter, underscore, dollar sign, or many Unicode letters.
- Cannot contain spaces or hyphens as part of one identifier.
- Cannot be a reserved word in a position that requires an identifier.
- Is case-sensitive.

Examples of ordinary valid identifiers include:

~~~js
const userName = "Asha";
const item2 = "book";
const _temporary = true;
const $element = document.querySelector("main");
~~~

These are not valid variable declarations:

~~~js
const 2items = []; // An identifier cannot start with a digit.
const user-name = "Asha"; // The hyphen is subtraction, not part of the name.
const user name = "Asha"; // A space separates two tokens.
~~~

A hyphen is an operator in JavaScript. For example, **user-name** is read as one identifier, a minus sign, and another identifier. Use **userName** or **user_name** when you need one name.

## Identifier characters and Unicode

The first character of an identifier must be an allowed identifier-start character. After the first character, digits may also be used. JavaScript permits many Unicode letters, so identifiers are not limited to the English alphabet.

~~~js
const caféName = "Corner Cafe";
const नाम = "Asha";

console.log(caféName);
console.log(नाम);
~~~

JavaScript also supports Unicode escape sequences inside identifiers. For example, an escaped spelling can represent the same identifier as the corresponding Unicode character. This is legal, but it is uncommon in everyday application code and can make names harder to read.

For collaborative projects, prefer clear, consistent names that are easy to type and search. ASCII letters are a common choice for shared code. If you use non-English identifiers, follow one consistent convention and avoid mixing characters that look alike from different writing systems.

## Names are case-sensitive

JavaScript treats uppercase and lowercase letters as different characters in names:

~~~js
const score = 10;
const Score = 20;

console.log(score); // 10
console.log(Score); // 20
~~~

**score** and **Score** are separate identifiers. Changing capitalization by mistake can make JavaScript report that a name is not defined.

## Keywords

A **keyword** is a word with a special syntactic role in JavaScript. Examples include **const**, **if**, **return**, **class**, and **function**.

~~~js
if (isReady) {
  return;
}
~~~

In this code, **if** and **return** are keywords. The name **isReady** is an identifier chosen by the programmer.

Keywords form part of JavaScript grammar. Do not use a keyword as a variable or function name where the grammar requires an ordinary identifier.

## Reserved words and contextual names

A **reserved word** is a name that JavaScript does not allow as an identifier in a particular language position. Many familiar keywords are reserved:

~~~js
const class = "JavaScript"; // SyntaxError
~~~

The word **class** has a special language meaning, so it cannot be used there as a variable name.

Not every word that looks important is reserved everywhere. Some names have meaning only in particular contexts:

- **await** is reserved in modules and async functions, where it introduces asynchronous waiting.
- **yield** has special restrictions in generator contexts and other grammar contexts.
- **async** introduces async function syntax in some positions, but it can also be an ordinary identifier where the grammar allows it.
- **of** and **from** can have special roles in specific syntax without being universally reserved.
- Some names, such as **implements**, **interface**, **package**, **private**, **protected**, and **public**, have restrictions in strict-mode code.

You do not need to memorize every contextual edge case. Avoid using words with special language roles as variable names. Descriptive names such as **requestStatus** or **selectedItem** are clearer and less likely to create syntax problems.

## A reserved word can still be a property name

The grammar distinguishes an **identifier** used for a binding from an **identifier name** used as a property key. A reserved word is generally invalid as a variable name, but it can often be used as an object property name:

~~~js
const settings = {
  default: "compact",
  class: "highlighted"
};

console.log(settings.default);
console.log(settings.class);
~~~

The keys **default** and **class** are allowed in this object. They are property names, not variable declarations.

This difference also appears in bracket notation:

~~~js
console.log(settings["default"]);
~~~

The text **"default"** is a string property key.

## Private class elements

A name beginning with **#** has special syntax for a private class element. It is not an ordinary variable name:

~~~js
class Counter {
  #value = 0;

  increment() {
    this.#value += 1;
  }
}
~~~

The private name **#value** is only valid in the body of the class that declares it. An underscore such as **_value** is only a naming convention. It does not create JavaScript privacy.

## Clear naming conventions

The language allows many names, but a consistent style helps people understand what each name represents. Common conventions include:

### camelCase for variables and functions

Start with a lowercase word and capitalize the beginning of later words:

~~~js
const firstName = "Asha";
const totalPrice = 30;

function calculateTotal(price, quantity) {
  return price * quantity;
}
~~~

Function names often begin with a verb because functions perform actions, such as **calculateTotal**, **loadProfile**, or **formatDate**.

### PascalCase for classes

Capitalize the first letter of each word in class names:

~~~js
class ShoppingCart {
  constructor() {
    this.items = [];
  }
}
~~~

### Boolean names that read clearly

Names such as **isReady**, **hasPermission**, and **canSubmit** make conditions easier to read:

~~~js
const hasItems = true;

if (hasItems) {
  console.log("The cart is not empty.");
}
~~~

### Constants and uppercase names

Some teams use uppercase names with underscores for values that are intended to be fixed configuration constants:

~~~js
const MAX_RETRIES = 3;
~~~

This is a style convention, not a special JavaScript rule. **const** prevents rebinding the variable, but uppercase spelling does not make an object immutable.

For ordinary values declared with **const**, camelCase is also common:

~~~js
const userProfile = {
  name: "Asha"
};
~~~

Follow the style used by the project.

## Avoid unclear or misleading names

Prefer a name that describes the value or purpose:

~~~js
const unpaidInvoiceCount = 3;

function sendWelcomeEmail(customer) {
  // Send a welcome message for this customer.
}
~~~

Names such as **x**, **data**, or **thing** may be fine in a small calculation or a short loop, but they give little context when used for important application values.

Avoid names whose capitalization differs only slightly when both are used nearby:

~~~js
const user = { name: "Asha" };
const User = class {};
~~~

Although these are distinct identifiers, readers can confuse them. Choose names that are visually distinct and meaningful.

Do not use misleading prefixes or suffixes. A value called **isConnected** should normally be a boolean. A function called **getUserName** should normally return a name.

## Naming is not the same as declaring

An identifier is a name. A declaration creates a binding for that name:

~~~js
const cityName = "Jaipur";
~~~

Here **cityName** is the identifier and **const** declares a binding for it. The rules for when a binding is available, where it can be used, and whether it can be reassigned are covered in later lessons about declarations and scope.

## Common mistakes

- **Starting with a digit:** use **item2**, not **2item**.
- **Using a hyphen:** **first-name** is parsed as subtraction. Use **firstName** instead.
- **Including spaces:** use **first name** as two separate words only in a string, not a single identifier.
- **Using a keyword as a binding:** choose a different name instead of **class**, **return**, or **const**.
- **Changing capitalization:** JavaScript treats **userName** and **username** as different names.
- **Assuming an underscore makes a name private:** **_value** is an ordinary identifier; a class private name uses **#value** in its declared class.
- **Using confusing abbreviations:** prefer a clear name such as **customerCount** over an unexplained short form.
- **Using invisible or visually similar Unicode characters:** these can make names difficult to inspect and search.

## Try it yourself

1. Identify all identifiers in **const orderTotal = calculateTotal(price, quantity);**.
2. Correct **const 4thItem = "pen";**.
3. Correct **const user-name = "Asha";**.
4. Explain why **const return = 5;** is invalid.
5. Create an object with a property named **default**, then read it using dot notation.
6. Declare **score** and **Score** with different values. Observe that JavaScript treats them as separate names.
7. Rename **x** and **y** in a short calculation to names that explain their roles.
8. Write a boolean name that begins with **is**, **has**, or **can**.
9. Explain the difference between **_secret** and a class private name such as **#secret**.
10. Choose one naming style for a small file and apply it consistently.

## Key points

- Identifiers are names used for bindings, functions, classes, parameters, and other language elements.
- Identifiers cannot start with a digit or contain spaces or hyphens.
- JavaScript identifiers are case-sensitive and may use many Unicode letters.
- Keywords have a syntactic role, while reserved words cannot be used as identifiers in restricted positions.
- Some names are contextual, so their restrictions depend on the surrounding grammar.
- Reserved words can often be used as object property names.
- Naming conventions are style choices. Clear, consistent names make code easier to read.
- An underscore is only a convention; a class private name uses the special **#** syntax.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion](007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [Open Q&A](../qnas/008-identifiers-keywords-reserved-words-and-naming.md) | [Open example](../examples/008-identifiers-keywords-reserved-words-and-naming.md) | [09 - Classic scripts, modules, and script loading](009-classic-scripts-modules-and-script-loading.md) |
