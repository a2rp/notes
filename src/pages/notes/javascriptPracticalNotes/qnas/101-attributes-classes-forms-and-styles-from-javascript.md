# 101 - Attributes, classes, forms, and styles from JavaScript: Questions and Answers

Use these questions to review how JavaScript works with HTML attributes, classes, form state, and inline styles. Each answer appears directly after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What does **getAttribute("title")** return when the element has no **title** attribute?

- A. An empty element
- B. **false**
- C. **null**
- D. The string **"undefined"**

**Answer: C. null.**

**getAttribute()** returns the attribute's string value when present and **null** when absent.

### 2. What is the effect of this code on a button?

~~~js
button.setAttribute("disabled", "false");
~~~

- A. It enables the button because the string says false.
- B. It disables the button because the **disabled** attribute is present.
- C. It removes the **disabled** attribute.
- D. It sets **button.disabled** to the boolean false.

**Answer: B. It disables the button because the disabled attribute is present.**

HTML boolean attributes are true when present. To enable the button, set **button.disabled = false** or remove the attribute.

### 3. Which property should code read for the current text in an input?

- A. **input.value**
- B. **input.defaultValue**
- C. **input.name**
- D. **input.type**

**Answer: A. input.value.**

The **value** property represents the live value. **defaultValue** represents the input's default value associated with its markup.

### 4. What type of value does **element.dataset.userId** return?

- A. Always a number
- B. Always a boolean
- C. A string
- D. A DOM element

**Answer: C. A string.**

Values read through **dataset** are strings. Convert the value when the program needs a number or another type.

### 5. Which call sets a class to a known state based on a boolean?

- A. **element.classList.toggle("open", shouldOpen)**
- B. **element.className = shouldOpen**
- C. **element.classList.contains("open", shouldOpen)**
- D. **element.classList.replace(shouldOpen)**

**Answer: A. element.classList.toggle("open", shouldOpen).**

The optional force argument adds the class when true and removes it when false. Repeating the call keeps the class state aligned with the boolean.

### 6. Which property represents the current checked state of a checkbox?

- A. **checkbox.defaultChecked**
- B. **checkbox.checked**
- C. **checkbox.getAttribute("value")**
- D. **checkbox.selected**

**Answer: B. checkbox.checked.**

The **checked** property reflects the current state, which can change through user interaction or JavaScript. **defaultChecked** represents the default state.

### 7. Which control is included in **new FormData(form)**?

- A. Any element that has an **id**
- B. An enabled form control with a **name**
- C. Every disabled control
- D. Any element with a **class**

**Answer: B. An enabled form control with a name.**

Form data is based on successful named controls. Disabled controls and controls without a **name** are not included. Unchecked checkboxes and radio buttons are not included either.

### 8. Which method removes an inline CSS declaration using its CSS property name?

- A. **element.style.removeProperty("background-color")**
- B. **element.style.delete("background-color")**
- C. **element.classList.remove("background-color")**
- D. **element.removeAttribute("background-color")**

**Answer: A. element.style.removeProperty("background-color").**

**removeProperty()** accepts the CSS property name, including its hyphens.

### 9. What does **form.reset()** do?

- A. Removes the form element from the document
- B. Restores form controls to their default values and states
- C. Clears every JavaScript variable in the page
- D. Submits the form

**Answer: B. Restores form controls to their default values and states.**

Reset uses the controls' defaults. It does not undo arbitrary changes elsewhere in the page or reset unrelated application state.

### 10. What does **form.checkValidity()** return?

- A. A form element
- B. A string describing every input
- C. A boolean indicating whether the form controls pass constraint validation
- D. The form's serialized data

**Answer: C. A boolean indicating whether the form controls pass constraint validation.**

Use **reportValidity()** when you also want the browser to report invalid controls to the user.

## Objective questions

### 11. True or false: **getAttribute()** returns the live text a user has typed into a text input.

**Answer: False.**

Read the current value from **input.value**. The **value** attribute and **defaultValue** represent the default value, which can differ after the input changes.

### 12. True or false: Setting a boolean attribute to the string **"false"** removes or disables that attribute.

**Answer: False.**

The attribute is still present. For example, **setAttribute("disabled", "false")** leaves a control disabled.

### 13. Fill in the blank: **data-user-id** is available as **element.dataset.________**.

**Answer: userId.**

The dash-separated **data-user-id** attribute maps to the camel-case **dataset.userId** property.

### 14. True or false: Assigning a new value to **element.className** can replace the element's entire class list.

**Answer: True.**

Use **classList.add()**, **remove()**, or **toggle()** when changing only specific class tokens.

### 15. True or false: A disabled named control contributes its value to **new FormData(form)**.

**Answer: False.**

Disabled controls are not successful controls and are omitted from form data.

### 16. True or false: **form.reset()** sets every value to an empty string.

**Answer: False.**

Reset restores each control's default value or state. A control with a default value returns to that value.

### 17. Fill in the blank: To set the current checked state of a checkbox, assign a boolean to **checkbox.________**.

**Answer: checked.**

For example, **checkbox.checked = true** checks the control. **defaultChecked** represents its default state.

### 18. True or false: **element.style.backgroundColor** uses camel case for the CSS property name.

**Answer: True.**

For the hyphenated CSS name **background-color**, the JavaScript style property is **backgroundColor**. You can also use **style.setProperty("background-color", value)**.

## Short-answer and reasoning questions

### 19. Explain the difference between an HTML attribute and a DOM property.

**Answer:** An attribute is part of an element's markup. A property is part of the JavaScript object exposed for that element.

Some properties reflect attributes, while others represent current state. For example, a text input's **value** property can change as the user types even when the original **value** attribute remains unchanged.

### 20. How do you enable a button that has the **disabled** attribute?

**Answer:** Set its boolean property to false or remove the attribute.

~~~js
button.disabled = false;
// Equivalent attribute removal:
button.removeAttribute("disabled");
~~~

Setting **disabled** to the string **"false"** does not enable it because the boolean attribute remains present.

### 21. Why is **dataset** useful, and what conversion should you remember?

**Answer:** **dataset** provides access to an element's **data-*** attributes through JavaScript property names.

For example, **data-item-count** maps to **element.dataset.itemCount**. That value is a string, so convert it with **Number()** before arithmetic.

### 22. When should you use **classList.toggle(name, force)** instead of **classList.toggle(name)**?

**Answer:** Use the force form when the code already knows whether the class should be on or off.

The one-argument form flips the current state. The two-argument form sets a known state and is safe to call repeatedly without accidentally reversing it.

### 23. Explain the difference between **checked** and **defaultChecked**.

**Answer:** **checked** is the current checked state. **defaultChecked** represents the default checked state associated with the markup.

A user can uncheck an initially checked box. Its **checked** property then becomes false, while **defaultChecked** can remain true.

### 24. What are two requirements for a normal form control value to be included in form data?

**Answer:** The control needs a **name** and must not be disabled.

Checkboxes and radio buttons also need to be checked to contribute an entry. Form controls without names do not provide a key for their values.

### 25. Why might a class be preferable to setting several inline styles from JavaScript?

**Answer:** A class lets CSS own the presentation rules while JavaScript expresses which state applies.

This keeps reusable design in a stylesheet and makes the code easier to maintain. Inline styles are useful for genuinely dynamic values, such as a color chosen by the user.

### 26. Does built-in browser validation make server-side validation unnecessary?

**Answer:** No. Browser validation helps users correct input, but client-side code can be bypassed or changed.

A server must validate data it receives before trusting or storing it.

## Code-reading and coding questions

### 27. What do the following expressions print?

~~~js
const button = document.createElement("button");
button.setAttribute("disabled", "false");

console.log(button.hasAttribute("disabled"));
console.log(button.disabled);
~~~

**Answer:**

~~~text
true
true
~~~

The **disabled** attribute is present. Its string value does not make the boolean attribute false.

### 28. Write code to add the class **is-open** only when **shouldOpen** is true, and remove it when false.

**Answer:**

~~~js
panel.classList.toggle("is-open", shouldOpen);
~~~

The force argument sets the intended state directly.

### 29. Write code to read **data-item-count** from an element and convert it to a number.

**Answer:**

~~~js
const count = Number(element.dataset.itemCount);
~~~

The dataset value is a string, so **Number()** converts it before numeric operations.

### 30. Write code to check whether a form is valid and ask the browser to show validation messages if it is not.

**Answer:**

~~~js
if (form.checkValidity()) {
  console.log("The form is valid.");
} else {
  form.reportValidity();
}
~~~

**checkValidity()** returns a boolean. **reportValidity()** asks the browser to display its validation feedback.

### 31. Write code to set the custom CSS property **--accent-color** on an element, then remove it.

**Answer:**

~~~js
element.style.setProperty("--accent-color", "#2457c5");
element.style.removeProperty("--accent-color");
~~~

Custom CSS property names keep their leading double hyphen and are passed to **setProperty()** as written.

### 32. An input has a markup default value of **Ada**. A visitor types **Grace**. What do **input.value** and **input.defaultValue** represent?

**Answer:** **input.value** represents the current value, **Grace**. **input.defaultValue** represents the default, **Ada**.

Calling **form.reset()** restores the input to its default value.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [100 - Creating, updating, and removing DOM content](../qnas/100-creating-updating-and-removing-dom-content.md) | [Open lesson](../lessons/101-attributes-classes-forms-and-styles-from-javascript.md) | [Open example](../examples/101-attributes-classes-forms-and-styles-from-javascript.md) | [102 - Browser events: capture, bubbling, and default actions](../lessons/102-browser-events-capture-bubbling-and-default-actions.md) |
