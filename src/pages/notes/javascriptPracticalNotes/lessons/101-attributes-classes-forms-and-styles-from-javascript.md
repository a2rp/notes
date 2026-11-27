# 101 - Attributes, classes, forms, and styles from JavaScript

JavaScript can change an element's attributes, classes, form state, and inline CSS. These changes let a page respond to user choices and keep its visual state aligned with its data.

This chapter explains when to work with an HTML attribute and when to use the corresponding JavaScript property. It also covers class lists, form controls, and inline styles.

## Learning goals

By the end of this chapter, you should be able to:

- Read, set, remove, and toggle HTML attributes.
- Explain the difference between an attribute and a DOM property.
- Handle boolean attributes by presence, not by the text "true" or "false".
- Read and update **data-*** attributes through **dataset**.
- Add, remove, test, and toggle classes with **classList**.
- Read and update form controls through their properties.
- Use built-in form validation and **FormData** for form values.
- Change inline CSS and custom properties from JavaScript.
- Choose classes for visual states and avoid unsafe dynamic attributes.

## HTML attributes and JavaScript properties

Attributes are written in markup and are part of an element's content attributes. JavaScript exposes elements as objects with properties. Some properties reflect an attribute, but not every property and attribute mean the same thing.

~~~html
<input id="email" type="email" value="person@example.com">
~~~

~~~js
const emailInput = document.querySelector("#email");

console.log(emailInput.getAttribute("value"));
console.log(emailInput.value);
~~~

The **value** attribute gives the input's default value. The **value** property represents its current value and may change when a user edits the control. For a text input, **defaultValue** reflects the default while **value** tracks the current control state.

Use an element property when you want to work with the live state represented by that property. Use attribute methods when you specifically need to inspect or change the markup attribute.

## Read and change attributes

Use **getAttribute()** to read an attribute. It returns the attribute's string value, or **null** when that attribute is absent.

~~~js
const link = document.querySelector("a");

const destination = link.getAttribute("href");
link.setAttribute("title", "Open the course home");
link.removeAttribute("target");
~~~

Use **setAttribute(name, value)** to add or update an attribute, and **removeAttribute(name)** to remove it. Attribute values are strings. A number or boolean passed as the second argument is converted to a string.

**toggleAttribute()** adds an attribute if it is absent and removes it if present. Its optional second argument forces a known state:

~~~js
const panel = document.querySelector("#help");

panel.toggleAttribute("hidden", shouldHide);
~~~

When **shouldHide** is **true**, the **hidden** attribute is present. When it is **false**, the attribute is absent. Passing the state makes the operation predictable if the code runs more than once.

## Boolean attributes represent presence

In HTML, a boolean attribute is true when it is present and false when it is absent. The text assigned as its value does not change that rule.

~~~js
const saveButton = document.querySelector("#save");

saveButton.setAttribute("disabled", "false");
console.log(saveButton.disabled);
~~~

The button is still disabled because the **disabled** attribute exists. For a form control, use its boolean property for live state:

~~~js
saveButton.disabled = false;
~~~

You can also remove the attribute:

~~~js
saveButton.removeAttribute("disabled");
~~~

The property form is usually clearer when the goal is to enable or disable a control.

## Use data attributes

Custom data attributes let markup carry small pieces of page-specific data. An attribute such as **data-user-id** is available through the element's **dataset** object:

~~~html
<button data-user-id="42">View profile</button>
~~~

~~~js
const button = document.querySelector("button");

console.log(button.dataset.userId);
button.dataset.userId = "57";
~~~

The dash-separated attribute name becomes camel case in **dataset**. Values are strings, so convert them when the code needs another type:

~~~js
const userId = Number(button.dataset.userId);
~~~

Use data attributes for simple data associated with an element. They are visible in the DOM and should not hold secrets or replace an application's real data model.

## Work with classes using classList

A class is a space-separated set of tokens. **classList** provides methods for changing one token without replacing the element's other classes.

~~~js
const card = document.querySelector(".card");

card.classList.add("is-highlighted");
card.classList.remove("is-muted");

console.log(card.classList.contains("is-highlighted"));
~~~

Important **classList** methods include:

- **add(name)** adds a class if it is not already present.
- **remove(name)** removes a class.
- **contains(name)** checks whether a class is present.
- **toggle(name)** adds an absent class or removes a present class.
- **toggle(name, force)** sets the class to a known on or off state.
- **replace(oldName, newName)** replaces one class with another.

Use the force argument when the desired state already exists as a boolean:

~~~js
card.classList.toggle("is-highlighted", shouldHighlight);
~~~

This is easier to reason about than toggling blindly when the code may run repeatedly. **className** reads or replaces the whole class attribute, so assigning it can accidentally remove classes that another part of the page needs.

## Form controls have live properties

Form controls expose properties for their current state. Common examples include:

- **input.value** and **textarea.value** for current text.
- **input.checked** for the current checkbox or radio state.
- **option.selected** for whether an option is selected.
- **control.disabled** for whether the control is disabled.
- **control.required** for whether an input is required.

Use the control property to read or update the live state:

~~~js
const newsletter = document.querySelector("#newsletter");

newsletter.checked = true;
newsletter.disabled = false;
~~~

For a checkbox, the **checked** attribute describes its default checkedness in the markup. The **checked** property describes its current state. A user can change the current state without changing the original attribute. **defaultChecked** reads the default state.

For text inputs and text areas, **value** is the current value. **defaultValue** represents the default value associated with the markup. The live value can differ after the user edits the field or code assigns to **value**.

## Read and validate form values

Give controls a **name** when their values need to be included in form data:

~~~html
<form id="profile-form">
  <label>
    Display name
    <input name="displayName" required>
  </label>
  <label>
    Email
    <input name="email" type="email" required>
  </label>
</form>
~~~

JavaScript can read current values from the control properties:

~~~js
const form = document.querySelector("#profile-form");
const displayName = form.elements.displayName.value;
~~~

Use **FormData** to collect the successful named controls in a form:

~~~js
const data = new FormData(form);

console.log(data.get("displayName"));
console.log(data.get("email"));
~~~

Disabled controls are not included in form data. Controls without a **name** are not included either. A checkbox or radio control is included only when it is checked.

HTML constraints such as **required**, **type="email"**, **min**, and **max** can provide built-in validation. JavaScript can inspect the result:

~~~js
if (form.checkValidity()) {
  console.log("The form is valid.");
} else {
  form.reportValidity();
}
~~~

**checkValidity()** returns a boolean. **reportValidity()** also asks the browser to report invalid controls to the user. For a custom rule, call **setCustomValidity(message)** with a useful message. Pass an empty string later to clear the custom error.

Client-side validation improves the interface, but a server must still validate data it receives.

## Reset form controls

Calling **form.reset()** restores form controls to their default values and states from the markup. It does not reset unrelated JavaScript variables or automatically undo page changes made elsewhere.

If code updates a control's **defaultValue**, **defaultChecked**, or selected default, a later reset uses that updated default. Use **value** or **checked** to change only the current live state.

## Update inline CSS

An element's **style** property represents its inline style declarations. CSS property names use camel case when accessed as JavaScript properties:

~~~js
const notice = document.querySelector(".notice");

notice.style.backgroundColor = "lightyellow";
notice.style.padding = "1rem";
~~~

For a hyphenated CSS property or a custom property, use **setProperty()**:

~~~js
notice.style.setProperty("border-color", "darkorange");
notice.style.setProperty("--accent-color", "rebeccapurple");
~~~

Remove an inline declaration with **removeProperty()**:

~~~js
notice.style.removeProperty("background-color");
~~~

These changes affect inline styles on that element. A stylesheet rule is usually a better place for reusable visual design. JavaScript can add a class for a state, while CSS defines how that state looks.

~~~css
.card.is-highlighted {
  outline: 3px solid var(--accent-color);
}
~~~

~~~js
card.style.setProperty("--accent-color", "#2457c5");
card.classList.add("is-highlighted");
~~~

This separates the state change from the visual rules. Avoid using JavaScript to set many individual style values when one state class can represent the change.

## Common mistakes

### Setting a boolean attribute to the string "false"

An attribute such as **disabled** is true because it is present. Set the **disabled** property to **false** or remove the attribute.

### Reading a default instead of the current form value

An input's **value** property is current state. Its **value** attribute or **defaultValue** describes the default. Use the property that matches the question the code is asking.

### Replacing the full class list

Assigning **className** replaces all classes. Use **classList.add()** and **classList.remove()** to change selected tokens.

### Assuming data attributes store typed values

Properties of **dataset** return strings. Convert numeric or boolean-looking data explicitly before using it as that type.

### Using dynamic inline styles for every visual state

A state class keeps presentation in CSS and lets JavaScript express intent. Use **style** for a value that is genuinely dynamic, such as a user-selected color.

### Trusting browser validation as security

Browser checks can be bypassed. Validate submitted data on the server as well.

## Try it yourself

1. Read an element's **title** with **getAttribute()**, change it, and then remove it.
2. Set **disabled** to the string **"false"** with **setAttribute()**. Observe why the control remains disabled, then enable it using the property.
3. Toggle a class with **classList.toggle(name, force)** using both **true** and **false**.
4. Read **data-item-count** through **dataset.itemCount** and convert the string to a number.
5. Change a text input's **value**, then compare it with **defaultValue**.
6. Change a checkbox's **checked** property and compare it with **defaultChecked**.
7. Use **FormData** to read named controls. Uncheck a checkbox and compare the submitted entries.
8. Call **checkValidity()** on a form with a missing required value, then fill it and check again.
9. Use **style.setProperty()** to change a CSS custom property used by a class.
10. Reset a form after changing values and note which values return to their markup defaults.

## Key points

- Attribute methods read and change markup attributes; DOM properties often expose live element state.
- Boolean HTML attributes are true when present and false when absent.
- **dataset** maps **data-*** attributes to string-valued properties.
- **classList** changes individual class tokens and can set a specific state with its force argument.
- Form control properties such as **value**, **checked**, and **disabled** represent live state.
- **FormData** collects eligible named controls, while built-in validation can improve form feedback.
- **style** changes inline CSS. Use classes for reusable presentation states and custom properties for dynamic CSS values.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [100 - Creating, updating, and removing DOM content](100-creating-updating-and-removing-dom-content.md) | [Open Q&A](../qnas/101-attributes-classes-forms-and-styles-from-javascript.md) | [Open example](../examples/101-attributes-classes-forms-and-styles-from-javascript.md) | [102 - Browser events: capture, bubbling, and default actions](102-browser-events-capture-bubbling-and-default-actions.md) |
