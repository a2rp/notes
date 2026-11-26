# Example 37 - Semantic HTML and page structure

## Question

Create a basil care note using HTML elements for the meaning of the content and controls. Include a heading hierarchy, a list, emphasis, a date, a navigation link, and a form action.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Basil Care Plan</title>
  </head>
  <body>
    <article>
      <h1>Basil care plan</h1>
      <p>A simple checklist for keeping a basil plant healthy indoors.</p>

      <div class="care-tip">
        <p>
          <strong>Important:</strong>
          Give the plant bright light, and water it
          <em>when the top layer of soil feels dry</em>.
        </p>
      </div>

      <h2>This week's checklist</h2>
      <ul>
        <li>Check the soil before watering.</li>
        <li>Turn the pot so each side gets light.</li>
        <li>Remove any dry or damaged leaves.</li>
      </ul>

      <h2>Next garden check</h2>
      <p>
        Add the next check to your calendar for
        <time datetime="2026-12-05">December 5, 2026</time>.
      </p>

      <p>
        Read the
        <a href="/guides/growing-basil">complete basil growing guide</a>
        for more care information.
      </p>

      <p>
        Use <span class="tool-name">clean scissors</span> when trimming the plant.
      </p>

      <form action="/garden-checks" method="post">
        <p>
          <input
            id="watering-done"
            name="completed-checks"
            type="checkbox"
            value="basil-watering">
          <label for="watering-done">I checked whether the soil needs water</label>
        </p>
        <button type="submit">Save checklist</button>
      </form>
    </article>
  </body>
</html>
~~~

## Expected output

The page displays a basil care heading, an introductory paragraph, an important care note, a three-item checklist, a scheduled date, a link to a growing guide, and a checklist form with a checkbox and button.

The HTML identifies which text is a heading, paragraph, list, emphasized phrase, date, link, checkbox, and action. A browser's default styles may make some elements look different, but changing their appearance with CSS does not change their HTML meaning.

## Explanation

- The article contains a self-contained basil care note that could make sense on its own.
- The h1 names the note. The h2 elements introduce its two subsections. The heading levels describe the content hierarchy rather than a desired font size.
- The ul and li elements identify a checklist as a list.
- The strong element marks an important warning. The em element marks words that should receive stress emphasis.
- The time element gives the date a machine-readable value in its datetime attribute while showing a readable date to visitors.
- The anchor has an href and navigates to another page. The button submits the checklist form, so it performs an action instead of navigating.
- The form control has a label and a name. If checked, it contributes the value basil-watering under the name completed-checks when the form is submitted.
- The care-tip div and tool-name span are generic containers. Their classes can be used by CSS, but the containers do not add a special meaning by themselves.
- A semantic element does not automatically make all page content accessible. Use clear labels and content, and make interactive controls work as expected.

## How to try it

Copy the HTML code block using its copy button and save it as basil-care.html. Open it in a browser and identify the headings, list, link, checkbox, and button. Change the CSS in your own copy to alter the appearance of the important note, then check that the HTML still describes the same content.

The example link and form destination do not have server handlers in this file. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 37 - Semantic HTML and page structure](../lessons/37-semantic-html.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [36 - Autocomplete and autofill](36-autocomplete-and-autofill.md) | [Lesson](../lessons/37-semantic-html.md) | [Q&A](../qnas/37-semantic-html.md) | [38 - Header, navigation, main, section, article, and footer](38-page-structure-elements.md) |
