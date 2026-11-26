# 31 - Fieldset and legend

A form can contain controls that belong together, such as a set of radio choices or a group of address fields. The `fieldset` element groups related controls in the HTML structure. Its `legend` element gives the group a short, clear name.

A fieldset and legend add context for people who use assistive technology and make the structure easier to understand in the browser. They complement individual labels: the legend names the group, and each control still needs its own label.

## What you will learn

- When to group controls with `fieldset`
- How `legend` describes a fieldset
- How legends and individual labels work together
- How to group radio buttons and checkboxes
- How the `disabled` attribute affects a group
- Common grouping mistakes and how to fix them

## What is a fieldset?

`fieldset` is an HTML element for grouping related form controls and their labels. Browsers usually draw a border around it by default, but its important purpose is structural: it identifies controls as a related set.

Use it when the group has a shared purpose that needs its own description. A group of radio buttons asking for a delivery speed is a common example. A set of related address fields may also be grouped when that structure helps people understand the form.

Do not wrap every individual field in a fieldset just to get a border. A single name field usually needs a label, not a group. Use fieldsets where a group label adds useful context.

## What is a legend?

`legend` provides the caption for a `fieldset`. When you use one, place it as the first child of the fieldset:

~~~html
<fieldset>
  <legend>Preferred contact method</legend>

  <input id="contact-email" name="contact-method" type="radio" value="email">
  <label for="contact-email">Email</label>

  <input id="contact-phone" name="contact-method" type="radio" value="phone">
  <label for="contact-phone">Phone</label>
</fieldset>
~~~

The legend names the question or topic shared by the choices. The labels identify each individual option. A screen reader may announce both the group context and the current option, such as “Preferred contact method, Email”.

The `legend` is not a replacement for the labels on the controls inside the fieldset. Keep both levels of description clear.

## Grouping radio buttons

Radio buttons with the same `name` represent choices where the user selects one value. If the whole question helps explain each option, use a fieldset and legend for the question, then give each radio button its own label:

~~~html
<fieldset>
  <legend>Choose a delivery speed</legend>

  <p>
    <input id="delivery-standard" name="delivery-speed" type="radio" value="standard" checked>
    <label for="delivery-standard">Standard, 3 to 5 business days</label>
  </p>

  <p>
    <input id="delivery-express" name="delivery-speed" type="radio" value="express">
    <label for="delivery-express">Express, 1 to 2 business days</label>
  </p>
</fieldset>
~~~

The legend describes the overall choice. The individual labels distinguish the available options. The unique `id` values connect each label, while the shared `name` groups the radio buttons for selection and form submission.

Do not put the whole question into every option label. Use the legend for shared context and keep each option label focused on its own value.

## Grouping checkboxes

Checkboxes allow independent choices. A legend can describe what a set of related checkboxes has in common:

~~~html
<fieldset>
  <legend>Choose the updates you want to receive</legend>

  <p>
    <input id="update-news" name="updates" type="checkbox" value="news">
    <label for="update-news">Product news</label>
  </p>

  <p>
    <input id="update-events" name="updates" type="checkbox" value="events">
    <label for="update-events">Event announcements</label>
  </p>

  <p>
    <input id="update-releases" name="updates" type="checkbox" value="releases">
    <label for="update-releases">Release notes</label>
  </p>
</fieldset>
~~~

Each checkbox is independently selectable, and each one has its own label. The legend explains what the choices are about.

## Grouping related fields

A fieldset can also group related text fields, select menus, or other controls. Keep a label for every individual field:

~~~html
<fieldset>
  <legend>Shipping address</legend>

  <p>
    <label for="shipping-street">Street address</label>
    <input id="shipping-street" name="shipping-street" autocomplete="address-line1">
  </p>

  <p>
    <label for="shipping-city">City</label>
    <input id="shipping-city" name="shipping-city" autocomplete="address-level2">
  </p>

  <p>
    <label for="shipping-postal-code">Postal code</label>
    <input id="shipping-postal-code" name="shipping-postal-code" autocomplete="postal-code">
  </p>
</fieldset>
~~~

Here, “Shipping address” describes the group, while “Street address”, “City”, and “Postal code” name the individual controls. A fieldset does not automatically label its descendant controls.

## A form with multiple groups

A longer form can use separate fieldsets to show its main sections. Individual controls keep their own labels, and a related choice group gets a legend:

~~~html
<form action="/order" method="post">
  <fieldset>
    <legend>Contact details</legend>

    <p>
      <label for="customer-name">Name</label>
      <input id="customer-name" name="name" autocomplete="name" required>
    </p>

    <p>
      <label for="customer-email">Email address</label>
      <input id="customer-email" name="email" type="email" autocomplete="email" required>
    </p>
  </fieldset>

  <fieldset>
    <legend>Delivery speed</legend>

    <p>
      <input id="speed-standard" name="speed" type="radio" value="standard" checked>
      <label for="speed-standard">Standard</label>
    </p>

    <p>
      <input id="speed-express" name="speed" type="radio" value="express">
      <label for="speed-express">Express</label>
    </p>
  </fieldset>

  <button type="submit">Continue to payment</button>
</form>
~~~

The two legends make the groups easy to identify. The submit button is outside the fieldsets because it submits the form rather than belonging to either group.

## Disabling a whole group

Adding the Boolean `disabled` attribute to a fieldset disables its descendant form controls as a group:

~~~html
<fieldset disabled>
  <legend>Account details are unavailable</legend>

  <p>
    <label for="account-email">Email address</label>
    <input id="account-email" name="email" type="email">
  </p>

  <p>
    <label for="account-phone">Phone number</label>
    <input id="account-phone" name="phone" type="tel">
  </p>
</fieldset>
~~~

The controls inside the disabled fieldset cannot be edited or focused by the user, and their values are not included when the form is submitted. The first `legend` itself is excluded from the disabled-fieldset rule, so keep interactive controls out of the legend. Use `disabled` only when those controls should truly be unavailable.

The attribute is Boolean: its presence enables the disabled state. For example, `disabled="false"` is still disabled because the attribute is present. To enable the controls, remove the attribute.

## `fieldset` and visual design

Browsers commonly draw a border around a fieldset and position the legend over that border. This default appearance can help show the group, but the relationship is also represented in the HTML, not just by the border.

You can style fieldsets and legends with CSS in a styled page. Avoid removing visual grouping in a way that makes related controls hard to distinguish. The HTML grouping remains useful even when the default border is changed.

## When a fieldset may not be needed

A fieldset is useful when the group needs a shared description. It is not mandatory for every possible set of controls. If each option is already clearly explained and there is no additional group context, individual labels may be enough.

Choose grouping based on what will make the form understandable. Avoid deeply nested or repeated fieldsets that make the structure harder to follow.

## Common mistakes

### Using only a heading instead of a legend

~~~html
<fieldset>
  <h2>Preferred contact method</h2>
  <!-- choices -->
</fieldset>
~~~

A heading may look like a caption, but it is not the fieldset's legend. Use a `legend` as the first child to provide the fieldset's caption:

~~~html
<fieldset>
  <legend>Preferred contact method</legend>
  <!-- choices -->
</fieldset>
~~~

### Forgetting individual labels

A legend describes the group, not each control. Keep an individual label for every radio button, checkbox, or text field.

### Putting `legend` after the controls

Place the legend first so it clearly captions the group and the HTML follows the expected structure.

### Using a fieldset only for its default border

A fieldset should communicate a real group. Use CSS for borders around unrelated content; do not add form semantics only to get a visual effect.

### Giving a group an unclear legend

Use a short legend that describes the shared question or purpose, such as “Choose a delivery speed”. Avoid a vague legend such as “Options”.

### Treating several controls as one choice

A fieldset groups controls but does not change their behavior. Radio buttons need a shared `name` to form a one-choice group. Checkboxes remain independently selectable unless other form behavior says otherwise.

### Disabling a fieldset by setting its value to false

~~~html
<fieldset disabled="false">
  <!-- controls -->
</fieldset>
~~~

This fieldset is still disabled because `disabled` is a Boolean attribute. Remove the attribute when the controls should be enabled.

## Try it yourself

1. Create a radio group for choosing a delivery speed. Add a legend for the question and a label for each option.
2. Create a checkbox group for choosing email updates. Add one legend and an individual label for each checkbox.
3. Group street, city, and postal code fields under a “Shipping address” legend. Keep a label for each field.
4. Add a second fieldset to a small order form and place the submit button outside both groups.
5. Add `disabled` to a fieldset and inspect which controls can be focused and edited. Remove the attribute and inspect again.
6. Replace a heading inside a fieldset with a legend, then review the structure.

## Key points

- `fieldset` groups related controls and their labels.
- `legend` gives the fieldset a concise caption. Put it first when using one.
- The legend names the group; individual labels name individual controls.
- Group related radio buttons and checkboxes when shared context helps users understand the choices.
- A fieldset does not automatically label its controls or change their selection behavior.
- The Boolean `disabled` attribute disables descendant controls, prevents interaction, and excludes their values from form submission. Controls inside the first legend are an exception.
- Use fieldsets when group context is useful, not just to draw a border.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [30 - Labels and accessible form controls](30-labels-and-form-controls.md) | [Q&A](../qnas/31-fieldset-and-legend.md) | [Example](../examples/31-fieldset-and-legend.md) | [32 - Textarea, select, option, and datalist](32-textarea-select-and-datalist.md) |
