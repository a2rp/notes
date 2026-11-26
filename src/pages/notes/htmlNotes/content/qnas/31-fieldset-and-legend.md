# 31 - Fieldset and legend: Questions and Answers

Use these questions to review [Chapter 31 - Fieldset and legend](../lessons/31-fieldset-and-legend.md). Every answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the main purpose of a `fieldset` element?

A. To group related form controls

B. To submit a form automatically

C. To provide a label for one input

D. To create a radio button

**Answer: A.** A fieldset groups controls that share a purpose or context. It does not submit the form or replace labels on its controls.

### 2. What does the `legend` element do inside a fieldset?

A. It names or describes the group

B. It gives every input the same name

C. It disables the group

D. It creates a submit button

**Answer: A.** The legend is the caption for the fieldset and explains what the grouped controls have in common.

### 3. Where should a legend go inside its fieldset?

A. After the last form control

B. As the first child

C. Outside the fieldset

D. Inside a label for one input

**Answer: B.** Put the legend first so it clearly captions the group and follows the expected HTML structure.

### 4. What should each radio button in a fieldset still have?

A. Its own label

B. Its own fieldset

C. A different name from all other radio buttons

D. A placeholder

**Answer: A.** The legend describes the question for the group. Each radio button still needs a label that identifies that particular choice.

### 5. Which structure correctly groups radio choices?

A. A `fieldset` with a `legend`, then each radio input and its label

B. A `label` containing all radio inputs and all their labels

C. A `fieldset` with no individual labels

D. A `legend` placed after the fieldset

**Answer: A.** Use the legend for the shared question and a separate label for each option.

### 6. What does the `disabled` attribute on a fieldset do?

A. Disables descendant form controls as a group

B. Hides the legend only

C. Makes the form submit immediately

D. Changes radio buttons into checkboxes

**Answer: A.** A disabled fieldset disables its descendant form controls, with the special exception for controls inside the first legend element.

### 7. What happens if you write `disabled="false"` on a fieldset?

A. The fieldset is enabled because the value says false

B. The fieldset is disabled because the Boolean attribute is present

C. Only the legend is disabled

D. The browser ignores all fieldset attributes

**Answer: B.** `disabled` is a Boolean attribute. Its presence enables the disabled state, regardless of the text value.

### 8. Does a fieldset automatically give each child input an individual label?

A. Yes, the legend labels every input

B. Yes, but only for checkboxes

C. No, each control still needs its own label

D. No, but `name` replaces the label

**Answer: C.** A legend describes the group. Use a label for each control within that group.

### 9. Which is a suitable reason to use a fieldset?

A. To group radio options under “Choose a delivery speed”

B. To add a border around unrelated page content

C. To replace every input id

D. To make placeholder text permanent

**Answer: A.** The shared question provides context for the related choices. Use CSS for borders that do not represent form groups.

### 10. What does a fieldset do to the behavior of the controls it groups?

A. It always turns them into one control

B. It groups them semantically, but does not change their selection behavior

C. It makes all checkboxes mutually exclusive

D. It submits each value twice

**Answer: B.** Radio buttons still need a shared `name` to form a one-choice group. Checkboxes remain independently selectable.

## True or false

### 1. A fieldset can group related controls and their labels.

**Answer: True.** It creates a semantic group in the form structure.

### 2. The legend describes the group, and each label describes an individual control.

**Answer: True.** They provide two different levels of context and both are useful.

### 3. A fieldset should be added around every single input to make the form accessible.

**Answer: False.** Use fieldsets when a group-level description adds useful context. A single field generally needs its own label, not a fieldset.

### 4. A heading inside a fieldset always works exactly like a legend.

**Answer: False.** A heading may be visually prominent, but it is not the fieldset's caption. Use a `legend` as the first child when the group needs a caption.

### 5. A fieldset changes a set of checkboxes into a single-choice group.

**Answer: False.** A fieldset groups controls but does not change their behavior. Checkboxes remain independent choices.

### 6. The `disabled` attribute is Boolean, so its presence disables the fieldset even if its value is `false`.

**Answer: True.** Remove the attribute to make the fieldset enabled.

### 7. Disabled controls in a disabled fieldset can still be edited and submitted normally.

**Answer: False.** They cannot be interacted with normally and their values are omitted from form submission. Controls inside the first legend are an exception to the fieldset disabled rule.

### 8. A fieldset can still provide useful semantics if its default border is changed with CSS.

**Answer: True.** The grouping comes from the HTML structure. The default border is only the browser's visual presentation.

## Short-answer questions

### 1. Explain the difference between `fieldset` and `legend`.

**Answer:** `fieldset` groups related form controls. `legend` provides the caption that describes the group's shared purpose.

### 2. Why should a radio group often use a fieldset and legend?

**Answer:** The legend communicates the overall question, and each radio label communicates one possible answer. Assistive technology can present the group context along with the selected option.

### 3. Does a legend remove the need for individual labels? Why?

**Answer:** No. The legend names the group, but it does not tell users which individual choice each radio button or checkbox represents. Give every control its own label.

### 4. What does the disabled state of a fieldset do to descendant controls?

**Answer:** It disables descendant form controls so users cannot normally focus or change them, and their values are not submitted with the form. Controls inside the fieldset's first legend are excluded from this rule.

### 5. Why is `disabled="false"` still disabled?

**Answer:** `disabled` is a Boolean attribute. Its presence means the state is enabled; the written value does not turn it off. Remove the attribute to enable the controls.

### 6. When should a fieldset not be used?

**Answer:** Avoid it when there is no useful group context, such as wrapping a lone text field just to get a border. Also avoid deeply nested or repeated groups that make the structure difficult to understand.

### 7. What is the difference between a legend and a heading that appears above a form group?

**Answer:** A legend is the semantic caption for its fieldset. A heading can organize a page visually, but it does not automatically provide the fieldset's group caption.

### 8. Do controls inside a fieldset need to share the same `name`?

**Answer:** Not necessarily. A fieldset groups related controls structurally. Radio buttons that represent one choice group usually share a name; other controls can have their own names and behavior.

## Practical questions

### 1. Add a legend to this group of radio buttons and label both options.

~~~html
<fieldset>
  <input id="format-html" name="format" type="radio" value="html">
  <input id="format-text" name="format" type="radio" value="text">
</fieldset>
~~~

**Answer:**

~~~html
<fieldset>
  <legend>Choose an output format</legend>

  <input id="format-html" name="format" type="radio" value="html">
  <label for="format-html">HTML</label>

  <input id="format-text" name="format" type="radio" value="text">
  <label for="format-text">Plain text</label>
</fieldset>
~~~

The legend gives the question, and each option has its own label.

### 2. Put these three address fields into a group named “Billing address”.

~~~html
<label for="billing-street">Street</label>
<input id="billing-street" name="street">

<label for="billing-city">City</label>
<input id="billing-city" name="city">

<label for="billing-postal">Postal code</label>
<input id="billing-postal" name="postal-code">
~~~

**Answer:**

~~~html
<fieldset>
  <legend>Billing address</legend>

  <label for="billing-street">Street</label>
  <input id="billing-street" name="street">

  <label for="billing-city">City</label>
  <input id="billing-city" name="city">

  <label for="billing-postal">Postal code</label>
  <input id="billing-postal" name="postal-code">
</fieldset>
~~~

Each control keeps its individual label. The fieldset and legend add the shared group context.

### 3. Group these checkbox options and give the group a clear legend.

~~~html
<input id="news" name="updates" type="checkbox" value="news">
<label for="news">News</label>

<input id="events" name="updates" type="checkbox" value="events">
<label for="events">Events</label>
~~~

**Answer:**

~~~html
<fieldset>
  <legend>Choose the updates you want</legend>

  <input id="news" name="updates" type="checkbox" value="news">
  <label for="news">News</label>

  <input id="events" name="updates" type="checkbox" value="events">
  <label for="events">Events</label>
</fieldset>
~~~

### 4. Find the structural mistake and correct it.

~~~html
<fieldset>
  <input id="delivery" name="speed" type="radio" value="standard">
  <label for="delivery">Standard</label>
  <legend>Delivery speed</legend>
</fieldset>
~~~

**Answer:** The legend appears after a control. Move it to the start of the fieldset:

~~~html
<fieldset>
  <legend>Delivery speed</legend>
  <input id="delivery" name="speed" type="radio" value="standard">
  <label for="delivery">Standard</label>
</fieldset>
~~~

### 5. This group has only a heading. Change it to use a fieldset caption.

~~~html
<fieldset>
  <h2>Choose a payment method</h2>
  <!-- payment controls -->
</fieldset>
~~~

**Answer:** Use a `legend` as the first child:

~~~html
<fieldset>
  <legend>Choose a payment method</legend>
  <!-- payment controls -->
</fieldset>
~~~

### 6. This fieldset is intended to be enabled. What is wrong?

~~~html
<fieldset disabled="false">
  <legend>Profile details</legend>
  <input name="display-name">
</fieldset>
~~~

**Answer:** The presence of the Boolean `disabled` attribute disables the group, even when its value is `false`. Remove the attribute:

~~~html
<fieldset>
  <legend>Profile details</legend>
  <input name="display-name">
</fieldset>
~~~

### 7. Mark this group as unavailable for now.

~~~html
<fieldset>
  <legend>Account settings</legend>
  <label for="account-name">Account name</label>
  <input id="account-name" name="account-name">
</fieldset>
~~~

**Answer:** Add the Boolean `disabled` attribute to the fieldset:

~~~html
<fieldset disabled>
  <legend>Account settings</legend>
  <label for="account-name">Account name</label>
  <input id="account-name" name="account-name">
</fieldset>
~~~

This disables the descendant control as part of the group.

### 8. Should this lone search field be placed in a fieldset only to draw a border?

~~~html
<label for="site-search">Search</label>
<input id="site-search" name="q" type="search">
~~~

**Answer:** No. It is a single, clearly labeled control with no additional group context. Keep the label and input together, and use CSS if a visual border is needed.

### 9. Build a group with a legend and two independent checkboxes for delivery preferences.

**Answer:**

~~~html
<fieldset>
  <legend>Delivery preferences</legend>

  <input id="leave-at-door" name="preferences" type="checkbox" value="door">
  <label for="leave-at-door">Leave the package at my door</label>

  <input id="text-before-arrival" name="preferences" type="checkbox" value="text">
  <label for="text-before-arrival">Text me before arrival</label>
</fieldset>
~~~

The checkboxes are independently selectable. The legend describes what the preferences have in common.

### 10. Review this form. What should be improved?

~~~html
<form>
  <fieldset>
    <legend>Contact method</legend>
    <input id="contact-email" name="method" type="radio" value="email">
    <input id="contact-phone" name="method" type="radio" value="phone">
  </fieldset>
</form>
~~~

**Answer:** The group has a legend, but neither radio button has an individual label. Add a label for each choice:

~~~html
<form>
  <fieldset>
    <legend>Contact method</legend>

    <input id="contact-email" name="method" type="radio" value="email">
    <label for="contact-email">Email</label>

    <input id="contact-phone" name="method" type="radio" value="phone">
    <label for="contact-phone">Phone</label>
  </fieldset>
</form>
~~~

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [30 - Labels and accessible form controls](30-labels-and-form-controls.md) | [Lesson](../lessons/31-fieldset-and-legend.md) | [Example](../examples/31-fieldset-and-legend.md) | [32 - Textarea, select, option, and datalist](32-textarea-select-and-datalist.md) |
