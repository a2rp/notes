# 08 - Identifiers, keywords, reserved words, and naming: Q&A

These questions review JavaScript identifiers, keyword restrictions, property names, Unicode characters, and clear naming conventions.

## Multiple-choice questions

### 1. What is an identifier?

A. A name used in source code for a binding or other language element  
B. A comment that describes a function  
C. A value that can only be a number  
D. A file extension

**Answer: A.** Identifiers name variables, functions, classes, parameters, and other elements.

### 2. Which is a valid variable identifier?

A. **3items**  
B. **item-count**  
C. **itemCount**  
D. **item count**

**Answer: C.** An identifier can include letters and later digits, but cannot begin with a digit or contain spaces or hyphens.

### 3. What does JavaScript do with **userName** and **username**?

A. It treats them as the same identifier  
B. It treats them as different identifiers  
C. It rejects both names  
D. It changes them to lowercase

**Answer: B.** JavaScript is case-sensitive, so uppercase and lowercase letters make different names.

### 4. Which identifier character is allowed at the start of a normal identifier?

A. A digit  
B. A hyphen  
C. An underscore  
D. A space

**Answer: C.** An underscore can start an identifier. A digit, hyphen, or space cannot.

### 5. What does the hyphen mean in **user-name**?

A. It joins both words into one identifier  
B. It is the subtraction operator  
C. It makes the name private  
D. It is ignored

**Answer: B.** JavaScript reads the hyphen as subtraction, so use a name such as **userName** if you mean one identifier.

### 6. Which statement about Unicode identifiers is correct?

A. JavaScript identifiers must use only ASCII English letters  
B. Many Unicode letters can be used in identifiers  
C. Emoji can always start an identifier  
D. Unicode characters can only appear in comments

**Answer: B.** JavaScript allows many Unicode identifier characters. For shared code, teams often prefer a consistent, easy-to-type naming style.

### 7. What is a keyword?

A. A word with a special syntactic role in JavaScript  
B. Any variable name with capital letters  
C. A browser setting  
D. A comment marker

**Answer: A.** Words such as **const**, **if**, and **return** have language-defined roles.

### 8. Which is generally legal?

A. Declaring a variable named **class**  
B. Using **class** as an object property key  
C. Declaring a variable named **return**  
D. Using **const** as a function name

**Answer: B.** A reserved word can often appear as an object property name, because a property key is not a variable binding.

### 9. What does the underscore in **_value** do?

A. Makes it private according to JavaScript  
B. Makes it a reserved word  
C. It is part of an ordinary identifier and may follow a style convention  
D. Prevents the value from changing

**Answer: C.** An underscore does not create privacy or immutability. It is a valid identifier character and may carry a team-defined convention.

### 10. Which name style is commonly used for JavaScript class names?

A. camelCase  
B. PascalCase  
C. lowercase-with-hyphens  
D. names with spaces

**Answer: B.** PascalCase, such as **ShoppingCart**, is a common convention for class names. It is style, not a syntax requirement.

## True or false

### 11. Identifiers can start with a digit if the rest of the name contains letters.

**Answer: False.** An identifier cannot begin with a digit. A later character may be a digit, as in **item2**.

### 12. The name **first-name** is one JavaScript identifier.

**Answer: False.** The hyphen is parsed as subtraction between **first** and **name**.

### 13. The names **score** and **Score** are different identifiers.

**Answer: True.** JavaScript is case-sensitive.

### 14. Any English-looking word can be used as a variable name.

**Answer: False.** Some words are keywords or reserved words, and some names are restricted in particular contexts.

### 15. A reserved word is always invalid in every syntactic position.

**Answer: False.** A reserved word is invalid as an identifier in restricted positions, but it can often be used as an object property name.

### 16. **async** is always a reserved word and can never be a variable name.

**Answer: False.** **async** has special meaning in certain syntax but can also be used as an identifier where the grammar permits it.

### 17. **await** and **yield** have context-dependent restrictions.

**Answer: True.** Their use as identifiers depends on surrounding syntax, such as modules, async functions, or generator contexts.

### 18. Naming conventions such as camelCase are enforced by the JavaScript parser.

**Answer: False.** They are style conventions. The parser accepts many legal naming styles.

### 19. Prefixing a variable name with an underscore makes it inaccessible from other code.

**Answer: False.** **_value** is an ordinary identifier. JavaScript class private elements use the special **#name** syntax within a class.

### 20. Unicode escape spellings can represent identifier characters.

**Answer: True.** JavaScript supports Unicode escape sequences in identifiers, though using the visible character is usually easier to read.

## Short-answer questions

### 21. What is the difference between a keyword and an identifier?

**Answer:** A keyword has a special syntactic role in JavaScript, such as **const** or **return**. An identifier is a name used for a binding or another program element, such as **userName**.

### 22. What is a reserved word?

**Answer:** A reserved word is a name that cannot be used as an identifier in a restricted language position. Some restrictions depend on the surrounding context.

### 23. Why should beginners avoid naming variables after keywords?

**Answer:** A keyword has a language-defined purpose, so using it as a binding name causes a syntax error in that position. A descriptive alternative also makes the code easier to read.

### 24. Why can **default** be a property name but not a normal variable binding?

**Answer:** Object property names use a grammar position that can accept an identifier name such as **default**. A variable declaration requires a valid binding identifier, and **default** is reserved there.

### 25. What naming convention is commonly used for variables and functions?

**Answer:** camelCase is common, for example **totalPrice** and **calculateTotal**. Follow the project's convention consistently.

### 26. How can boolean names make conditions easier to understand?

**Answer:** Prefixes such as **is**, **has**, or **can** make the meaning clear, for example **isReady**, **hasAccess**, or **canSubmit**.

### 27. What is the difference between **_secret** and **#secret**?

**Answer:** **_secret** is an ordinary identifier that may signal a convention to people. **#secret** is private class element syntax and is only valid inside the class that declares it.

### 28. Why should code avoid mixing visually similar characters from different writing systems in identifiers?

**Answer:** Characters can look alike while being different code points. This can make names difficult to inspect, search, and review, and can lead to mistakes.

## Read the code

### 29. Is this declaration valid?

~~~js
const item2 = "notebook";
~~~

**Answer: Yes.** An identifier can contain a digit after its first character.

### 30. Is this declaration valid?

~~~js
const 2item = "notebook";
~~~

**Answer: No.** Identifiers cannot begin with a digit. A valid alternative is **item2**.

### 31. What is wrong with this declaration?

~~~js
const user-name = "Asha";
~~~

**Answer:** The hyphen is subtraction, not part of an identifier. Use **userName** or **user_name**.

### 32. Is this object valid?

~~~js
const settings = {
  default: "compact",
  class: "highlighted"
};

console.log(settings.default);
~~~

**Answer: Yes.** **default** and **class** are object property names in this position. They are not variable bindings.

### 33. What do the two log statements print?

~~~js
const score = 10;
const Score = 20;

console.log(score);
console.log(Score);
~~~

**Answer:**

~~~text
10
20
~~~

The lowercase and uppercase initial letters create different identifiers.

### 34. Is this binding name safe to use in every JavaScript context?

~~~js
const await = 5;
~~~

**Answer:** No. **await** is restricted in contexts such as modules and async functions. Avoid it as an identifier so the code remains clear across contexts.

### 35. What is a clearer name for **x** in this code?

~~~js
const x = itemPrice * itemCount;
~~~

**Answer:** **totalPrice** or **lineTotal** communicates the result more clearly. Good names explain what a value represents.

### 36. Is **MAX_RETRIES** special syntax?

~~~js
const MAX_RETRIES = 3;
~~~

**Answer: No.** It is a style convention some teams use for fixed configuration values. JavaScript does not treat uppercase spelling as a special declaration type.

## Scenarios

### 37. You see **userName is not defined**, but your file declares **username**. What is a likely cause?

**Answer:** The capitalization differs. JavaScript treats **userName** and **username** as separate names, so make the spelling and capitalization consistent.

### 38. A teammate wants to name a variable **class** because it stores a CSS class. What should you suggest?

**Answer:** Use a descriptive alternative such as **className**, **cssClass**, or **selectedClass**. **class** is a keyword and cannot be used as a normal binding name.

### 39. Your team uses PascalCase for functions, but a library uses camelCase. Is one of them necessarily invalid?

**Answer:** No. Naming style is a convention, not a syntax rule. Follow the convention of the codebase or API you are working with.

### 40. You want to declare a value named **secret** that should be private inside a class. Is **_secret** enough?

**Answer:** No. An underscore is only a naming convention. A class can use a private element such as **#secret**, which is declared and accessed within that class.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion](../lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) | [Open lesson](../lessons/008-identifiers-keywords-reserved-words-and-naming.md) | [Open example](../examples/008-identifiers-keywords-reserved-words-and-naming.md) | [09 - Classic scripts, modules, and script loading](../lessons/009-classic-scripts-modules-and-script-loading.md) |
