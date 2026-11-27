# 08 - Identifiers, keywords, reserved words, and naming: example

This example is a complete HTML page that demonstrates valid JavaScript names and common naming conventions. It also shows that reserved words can be object property names, and that capitalization changes an identifier.

## Goal

You will learn to:

- Recognize valid identifiers.
- Use camelCase for variables and functions and PascalCase for a class.
- Read boolean names that describe a condition.
- Use a reserved word as an object property key.
- Observe case-sensitive names.
- See a Unicode identifier and a class private element.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the full code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript identifier practice</title>
</head>
<body>
  <main>
    <h1>JavaScript identifier practice</h1>
    <p>
      Open the browser developer tools and select the Console to see the
      identifier and naming examples.
    </p>
  </main>

  <script>
    const firstName = "Asha";
    const totalOrders = 3;
    const hasOrders = totalOrders > 0;
    const item2 = "Notebook";
    const _draftCount = 1;
    const $price = 12;
    const caféName = "Corner Cafe";

    function formatGreeting(personName) {
      return "Hello, " + personName + "!";
    }

    class ShoppingCart {
      #itemCount = 0;

      addItem() {
        this.#itemCount += 1;
        return this.#itemCount;
      }
    }

    const settings = {
      default: "compact",
      class: "highlighted"
    };

    const score = 10;
    const Score = 20;
    const cart = new ShoppingCart();

    console.log("Greeting:", formatGreeting(firstName));
    console.log("Orders:", totalOrders, "Has orders:", hasOrders);
    console.log("Digit after first character:", item2);
    console.log("Underscore name:", _draftCount);
    console.log("Dollar name:", $price);
    console.log("Unicode identifier:", caféName);
    console.log("Reserved word property names:", settings.default, settings.class);
    console.log("Case-sensitive names:", score, Score);
    console.log("Private class item counts:", cart.addItem(), cart.addItem());
  </script>
</body>
</html>
~~~

## Run the example

1. Save **index.html**.
2. Open it in a browser.
3. Open the browser developer tools and select the Console.
4. Reload the page if the Console was opened after the page loaded.
5. Read the messages and compare each name with the explanation below.

## Expected Console output

~~~text
Greeting: Hello, Asha!
Orders: 3 Has orders: true
Digit after first character: Notebook
Underscore name: 1
Dollar name: 12
Unicode identifier: Corner Cafe
Reserved word property names: compact highlighted
Case-sensitive names: 10 20
Private class item counts: 1 2
~~~

The Console may format messages differently, but the values should match.

## What each name shows

- **firstName**, **totalOrders**, and **hasOrders** use camelCase for variables.
- **formatGreeting** starts with a verb and uses camelCase for a function.
- **item2** shows that a digit is allowed after the first character.
- **_draftCount** and **$price** show valid underscore and dollar-sign characters.
- **caféName** shows that Unicode letters can be used in identifiers.
- **ShoppingCart** uses the common PascalCase style for a class.
- **#itemCount** is a private class element declared inside the class.
- **default** and **class** are object property names, not variable bindings.
- **score** and **Score** are different identifiers because JavaScript is case-sensitive.

The object property keys can also be read with bracket notation:

~~~js
console.log(settings["default"]);
console.log(settings["class"]);
~~~

## Invalid binding names

The following examples are invalid as variable declarations. Do not paste them into the runnable page because any syntax error can prevent the entire script from running.

~~~js
const 2items = []; // Cannot begin with a digit.
const user-name = "Asha"; // The hyphen is subtraction.
const first name = "Asha"; // A space separates tokens.
const class = "JavaScript"; // class is a reserved word here.
~~~

Choose valid alternatives:

~~~js
const items2 = [];
const userName = "Asha";
const firstName = "Asha";
const courseClass = "JavaScript";
~~~

## Property key compared with binding name

A reserved word cannot be used for a normal variable binding:

~~~js
const class = "JavaScript";
~~~

But it can be used as an object property key:

~~~js
const course = {
  class: "JavaScript"
};

console.log(course.class);
~~~

The word **class** has a special role in JavaScript syntax. In the object, it names a property. In the declaration, it would be required as a binding name, where it is not allowed.

## Naming suggestions for your own code

1. Use camelCase for variables and functions, such as **userName** and **loadProfile**.
2. Use PascalCase for classes, such as **ShoppingCart**.
3. Use boolean names that read clearly, such as **isReady**, **hasAccess**, or **canSubmit**.
4. Prefer descriptive names over unexplained abbreviations.
5. Follow the existing project's style.
6. Use **#privateName** only for a class private element. An underscore alone does not make a name private.
7. Avoid names that differ only by capitalization when they appear close together.

These are conventions for readability. JavaScript does not require camelCase or PascalCase.

## Try a small change

1. Change **firstName** and read the new greeting.
2. Rename **totalOrders** to **orderCount** and update every place that refers to it.
3. Change **hasOrders** to **isCartEmpty** and make sure its value matches its new meaning.
4. Add **settings["return"]** as another property and read it with bracket notation.
5. Change **score** to **Score** in one log argument only. Observe that the two names still refer to different bindings.
6. Add another item to **ShoppingCart** and inspect the incremented count.
7. Rename **_draftCount** to a descriptive camelCase name.

## Key ideas shown

- A valid identifier cannot begin with a digit or contain spaces and hyphens.
- Identifier spelling is case-sensitive.
- Many Unicode letters, underscores, and dollar signs are allowed.
- Keywords and reserved words cannot be used as binding names in restricted contexts.
- Reserved words can often be used as object property names.
- Naming conventions help people read code, but the conventions are not enforced by the parser.
- A class private name uses **#** syntax and is different from an underscore convention.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion](../lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [Open lesson](../lessons/008-identifiers-keywords-reserved-words-and-naming.md) | [Open Q&A](../qnas/008-identifiers-keywords-reserved-words-and-naming.md) | [09 - Classic scripts, modules, and script loading](../lessons/009-classic-scripts-modules-and-script-loading.md) |
