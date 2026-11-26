# Example 18 - Unordered, ordered, and description lists

## Question

Create a small herb-garden plan with a supply list, a nested list of container choices, ordered planting steps, a countdown list, and a glossary of garden terms. Use each list type to match the relationship between its items.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Planning an Herb Garden | Garden Journal</title>
  </head>
  <body>
    <main>
      <h1>Plan a small herb garden</h1>
      <p>
        Gather the supplies, follow the planting steps, and learn a few useful
        garden terms.
      </p>

      <section>
        <h2>Supplies</h2>
        <ul>
          <li>Herb seeds</li>
          <li>Potting mix</li>
          <li>
            Containers
            <ul>
              <li>Small pots for seedlings</li>
              <li>One larger pot for established plants</li>
            </ul>
          </li>
          <li>A watering can</li>
        </ul>
      </section>

      <section>
        <h2>Planting steps</h2>
        <ol>
          <li>Choose a container with drainage holes.</li>
          <li>Fill it with potting mix.</li>
          <li>Plant the seeds according to their packet directions.</li>
        </ol>

        <h3>Continue with the next steps</h3>
        <ol start="4">
          <li>Water the soil gently.</li>
          <li>Place the container where the herbs get suitable light.</li>
        </ol>
      </section>

      <section>
        <h2>Closing the garden for the day</h2>
        <ol reversed>
          <li>Put the tools away.</li>
          <li>Water the seedlings if the soil needs it.</li>
          <li>Check that each pot is in a safe place.</li>
        </ol>
      </section>

      <section>
        <h2>Garden terms</h2>
        <dl>
          <dt>Seedling</dt>
          <dd>A young plant that has grown from a seed.</dd>

          <dt>Potting mix</dt>
          <dd>A growing material prepared for use in containers.</dd>

          <dt>Drainage</dt>
          <dd>The movement of extra water out of soil or a container.</dd>
        </dl>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The browser displays a heading and several sections. Supplies appear as bullets, with the container choices nested under Containers. Planting steps are numbered from 1 to 3, and the continued list starts at 4. The closing checklist counts down from 3 to 1. The garden terms appear with their descriptions.

The browser uses its default list markers and spacing because this page has no CSS.

## Explanation

- The ul element groups supplies whose order does not matter. Each item is an li.
- The nested ul belongs inside the Containers li because it lists types of that item.
- The ol element marks planting steps whose order matters. The start="4" attribute continues their numbering from step 4.
- The reversed attribute makes the closing checklist count down. The browser calculates its initial number from the number of list items.
- The dl element groups terms with descriptions. Each dt gives a term, and the dd that follows gives its description.
- Choose a list element based on the relationship between items. The default bullets, numbers, and indentation are presentation.

## How to try it

Copy the HTML code block using its copy button, save it as herb-garden-plan.html, and open it in a browser. Add a supply and a planting step. Move the nested list outside the Containers item and consider whether its relationship to that item is still clear.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 18 - Unordered, ordered, and description lists](../lessons/18-lists.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [17 - Navigation and linking between pages](17-navigation-and-page-links.md) | [Lesson](../lessons/18-lists.md) | [Q&A](../qnas/18-lists.md) | [19 - Images and alternative text](19-images-and-alt-text.md) |
