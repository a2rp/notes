# 08. Forms, controls, and labels

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Tables and accessible data](./07-tables-and-accessible-data.md) | [Notes index](../README.md) | [Next: Native form validation and submission](./09-native-form-validation-and-submission.md) |

## Group controls inside a form

The form element groups controls that collect and submit related information. Each submitted control needs a name, and its current value is sent with that name.

~~~html
<form action="/signup" method="post">
  <div>
    <label for="full-name">Full name</label>
    <input id="full-name" name="fullName" autocomplete="name" required />
  </div>

  <div>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" required />
  </div>

  <button type="submit">Create account</button>
</form>
~~~

action identifies where the form is sent. method describes how the browser sends it. The next chapter covers method choices and native validation.

## Associate a label with each control

A label can use for to refer to a control id. The for value and id must match.

~~~html
<label for="search-term">Search articles</label>
<input id="search-term" name="q" type="search" />
~~~

A placeholder is a hint inside a control, not a replacement for its label. Placeholder text disappears when the user enters a value and may have low contrast.

A label can also wrap its control:

~~~html
<label>
  <input type="checkbox" name="updates" value="yes" />
  Send me product updates
</label>
~~~

## Group related choices

Use fieldset and legend to group controls that share one question or purpose. Give radio buttons in the same choice group the same name.

~~~html
<fieldset>
  <legend>Preferred contact method</legend>

  <label>
    <input type="radio" name="contactMethod" value="email" checked />
    Email
  </label>

  <label>
    <input type="radio" name="contactMethod" value="phone" />
    Phone
  </label>
</fieldset>
~~~

The shared name makes the radio buttons one choice group. Each option still needs a distinct value.

## Choose the correct control

Use input types that match the data, such as email, number, date, checkbox, or radio. Use textarea for longer text, select for a list of options, and button for an action.

A button inside a form defaults to submit unless its type is set. Write type="button" for a button that should not submit the form.

## Practice questions

1. What does a form element group?
2. What does the name attribute contribute to submitted data?
3. How do label for and control id connect?
4. Why is placeholder not a replacement for a label?
5. What do fieldset and legend describe?
6. Why do radio controls in one choice group share a name?
7. Which element is appropriate for longer text input?
8. Why set type="button" on a non-submit button inside a form?

## Main references

- [Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form)
- [How to structure a form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form)
- [The form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
- [The label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label)
- [The fieldset element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset)