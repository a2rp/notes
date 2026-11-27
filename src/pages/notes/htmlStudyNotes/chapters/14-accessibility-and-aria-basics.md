# 14. Accessibility and ARIA basics

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Native interactive elements](./13-native-interactive-elements.md) | [Notes index](../README.md) | [Next: Global attributes and data attributes](./15-global-and-data-attributes.md) |

## Start with meaningful HTML

Semantic HTML gives browsers and assistive technology built-in information about a control or region. Use headings, links, buttons, labels, and landmarks for their intended purpose.

~~~html
<a href="./account.html">Open account settings</a>
<button type="button">Save changes</button>
~~~

The anchor navigates to another location. The button performs an action. A generic div does not get those behaviors automatically.

## Give controls accessible names

Every interactive control needs a name that explains its purpose. Visible text is usually the clearest name. Use aria-label only when a visible label is not appropriate and the purpose is still clear.

~~~html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel" />

<button type="button" aria-label="Close dialog">×</button>
~~~

The input gets its name from the associated label. The close button uses aria-label because its visible symbol alone does not explain its action.

## Describe help and errors

aria-describedby can connect a control to additional help or an error message.

~~~html
<label for="password">Password</label>
<p id="password-help">Use at least 12 characters.</p>
<input
  id="password"
  name="password"
  type="password"
  aria-describedby="password-help"
/>
~~~

The label names the control, while the description adds guidance. Keep help text close to the field and update an error message when validation finds a problem.

## Use useful alternatives and keyboard order

Give informative images meaningful alt text, keep decorative images at alt="", and write links that identify their destination. Keep focus order aligned with the reading and interaction order in the document.

~~~html
<a href="./invoice.pdf">Download the April invoice</a>
<img src="./images/soil-test.jpg" alt="A soil test kit showing neutral pH" />
<img src="./images/dot-pattern.svg" alt="" />
~~~

Do not add tabindex values that create a confusing keyboard order. Native links and controls are already keyboard reachable.

## Add ARIA only when HTML needs help

ARIA can add accessible names, descriptions, states, and roles. Prefer native HTML when it already expresses the required meaning and behavior. Incorrect ARIA can make the interface less clear.

Use aria-expanded to expose whether a disclosure is open, and keep its value synchronized with the visible state. Do not add a role that contradicts the native element.

## Practice questions

1. Why should semantic HTML be the starting point?
2. How does an anchor differ from a button?
3. What is an accessible name?
4. When can aria-label be useful?
5. What does aria-describedby connect?
6. How should decorative images provide alt text?
7. Why should DOM order match the intended reading order?
8. When should ARIA be added?

## Main references

- [HTML accessibility basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
- [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)
- [aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)