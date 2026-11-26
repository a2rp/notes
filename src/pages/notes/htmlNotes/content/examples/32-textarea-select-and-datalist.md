# Example 32 - Textarea, select, option, and datalist

## Question

Create a garden help form with a required fixed topic menu grouped into categories, an optional multi-select for interests, a plant-name field with suggestions that still permits other entries, and a labeled message area.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ask the Garden Club</title>
  </head>
  <body>
    <main>
      <h1>Ask the Garden Club</h1>
      <p>Choose a topic and describe how we can help.</p>

      <form action="/garden-help" method="post">
        <p>
          <label for="help-topic">Help topic</label>
          <select id="help-topic" name="topic" required>
            <option value="" selected>Choose a topic</option>
            <optgroup label="Plant care">
              <option value="watering">Watering</option>
              <option value="soil">Soil health</option>
              <option value="pests">Pests and plant health</option>
            </optgroup>
            <optgroup label="Garden Club">
              <option value="membership">Membership</option>
              <option value="workshops">Workshops</option>
            </optgroup>
          </select>
        </p>

        <p>
          <label for="interests">Related interests</label>
          <select
            id="interests"
            name="interest"
            multiple
            size="4">
            <option value="herbs" selected>Herb gardening</option>
            <option value="vegetables">Vegetable gardening</option>
            <option value="flowers">Growing flowers</option>
            <option value="compost">Composting</option>
          </select>
        </p>
        <p>You may choose more than one related interest.</p>

        <p>
          <label for="plant-name">Plant name</label>
          <input
            id="plant-name"
            name="plant"
            type="text"
            list="plant-suggestions"
            placeholder="For example, tomato">
          <datalist id="plant-suggestions">
            <option value="Basil"></option>
            <option value="Mint"></option>
            <option value="Tomato"></option>
          </datalist>
        </p>

        <p>
          <label for="help-message">Describe your question</label>
          <textarea
            id="help-message"
            name="message"
            rows="6"
            cols="40"
            minlength="20"
            maxlength="1000"
            placeholder="Tell us what you have noticed and what you have tried."
            required></textarea>
        </p>

        <button type="submit">Send question</button>
      </form>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays a required Help topic select with options grouped under Plant care and Garden Club. It also shows a multi-select list of interests, a plant-name text field that can suggest values, and a multi-line question field.

The topic menu limits the user to one listed option. The plant field accepts a suggested plant name or another value typed by the user. The browser's appearance for the multi-select and datalist suggestions can vary.

## Explanation

- The label identifies each control, and each control has a name so its value can be included in submitted form data.
- The first topic option has an empty value. Because the select is required, the user must choose one of the real topics before submitting.
- The optgroup elements organize related options under visible group labels. The user chooses an option, not an optgroup.
- Each option has an explicit value. For example, choosing Watering submits the value watering for the topic field.
- The interests select uses multiple, so several options can be selected. The selected values are submitted using the same name, interest.
- The plant input's list value matches the datalist id. The suggestions can help, but the user can still type a plant name that is not listed.
- The textarea accepts multiple lines. Its rows and cols set its initial visible size, and its length attributes set browser-side constraints. If an initial message were needed, its text would go between the textarea tags, not in a value attribute.
- The placeholders provide short hints. The visible labels still identify the fields.
- The /garden-help action is an example route. A server or service must process the submitted values.

## How to try it

Copy the HTML code block using its copy button and save it as garden-help.html. Open it in a browser, choose a required topic, select more than one interest, and type a plant name that is not in the suggestions. The example route needs a server or service before the form can submit successfully.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 32 - Textarea, select, option, and datalist](../lessons/32-textarea-select-and-datalist.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [31 - Fieldset and legend](31-fieldset-and-legend.md) | [Lesson](../lessons/32-textarea-select-and-datalist.md) | [Q&A](../qnas/32-textarea-select-and-datalist.md) | [33 - Buttons and form actions](33-buttons-and-form-actions.md) |
