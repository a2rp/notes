# Example 46 - Template elements

## Question

Create a workshop page that uses one HTML template to build three workshop cards from data. Reuse the same markup for each card, insert the data as text, and keep the template definition out of the visible page.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Upcoming workshops - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/garden">The garden</a></li>
          <li><a href="/workshops">Workshops</a></li>
          <li><a href="/visit">Plan your visit</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Upcoming garden workshops</h1>
      <p>
        Explore practical sessions for growing plants at home and in the
        community garden.
      </p>

      <section aria-labelledby="workshops-heading">
        <h2 id="workshops-heading">Choose a workshop</h2>
        <div id="workshop-list"></div>
        <noscript>
          <p>
            Turn on JavaScript to display the workshop list. The workshop
            details are added from the page's data.
          </p>
        </noscript>
      </section>

      <template id="workshop-card-template">
        <article class="workshop-card">
          <h3 class="workshop-title"></h3>
          <p class="workshop-schedule"></p>
          <p class="workshop-description"></p>
        </article>
      </template>
    </main>

    <footer>
      <p>City Garden workshops</p>
    </footer>

    <script>
      const workshopTemplate = document.querySelector("#workshop-card-template");
      const workshopList = document.querySelector("#workshop-list");

      const workshops = [
        {
          title: "Growing herbs in containers",
          schedule: "Saturday at 10 a.m.",
          description:
            "Choose suitable pots, prepare the soil, and plant a small herb garden."
        },
        {
          title: "Starting a vegetable patch",
          schedule: "Sunday at 1 p.m.",
          description:
            "Plan a simple vegetable patch and learn how to prepare its growing area."
        },
        {
          title: "Composting at home",
          schedule: "Wednesday at 6 p.m.",
          description:
            "Learn what can go into a compost bin and how to care for it."
        }
      ];

      for (const workshop of workshops) {
        const card = document.importNode(workshopTemplate.content, true);

        card.querySelector(".workshop-title").textContent = workshop.title;
        card.querySelector(".workshop-schedule").textContent =
          workshop.schedule;
        card.querySelector(".workshop-description").textContent =
          workshop.description;

        workshopList.append(card);
      }
    </script>
  </body>
</html>
~~~

## Expected output

When the script runs, the page displays three workshop articles under “Choose a workshop”. Each article has a heading, a schedule, and a short description. The template definition itself is not displayed as a fourth article.

If scripting is disabled, the cards are not created and the message inside noscript is shown. The page structure and introductory text remain visible.

## Explanation

- The template stores one reusable article structure. Its contents are kept in the template's content fragment and do not appear in the page on initial load.
- The template has classes for the values that will change. The same class names can appear in every cloned card, so no repeated id attributes are needed.
- The script reads the data and selects the template and destination container. The script is a normal page script after the template, not a script stored inside the template.
- document.importNode(template.content, true) creates a deep copy of the template content for each workshop. Each loop iteration gets a fresh fragment, leaving the original template available for the next card.
- textContent inserts each title, schedule, and description as text. This avoids treating data as HTML markup.
- Appending the fragment moves its article into the destination container. The fragment is not added as an extra wrapper.
- The noscript element provides a message when scripting is disabled. The template alone does not fill the workshop list.
- This example includes JavaScript because a template is only a stored fragment. HTML defines the reusable structure, and the script clones, fills, and inserts that structure.

## How to try it

Copy the HTML code block using its copy button and save it as garden-workshops.html. Open it in a browser to see the three cards created from the data. Inspect the page source and notice that the template markup remains separate from the generated articles.

Change one workshop title or description in the array and reload the page. Try adding a fourth data item. For a safe-text check, change a description to text containing angle brackets such as &lt;strong&gt;Garden soil&lt;/strong&gt;. Because the script uses textContent, the text is displayed literally instead of being interpreted as an HTML element.

This Markdown file displays the code and does not run it.

## Related lesson

[Read lesson 46 - Template elements](../lessons/46-template-element.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [45 - Popover attributes](45-popover-attributes.md) | [Lesson](../lessons/46-template-element.md) | [Q&A](../qnas/46-template-element.md) | [47 - Hidden, inert, tabindex, and editable content](47-visibility-and-interaction-attributes.md) |
