# Example 43 - Details and summary

## Question

Create an accessible visitor information page for a community garden. Show one useful section when the page loads, provide a set of related workshop FAQs where opening one answer closes another, and include optional information that can stay open independently.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden workshop information - City Garden</title>
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
      <h1>Plan your garden workshop visit</h1>
      <p>
        Find the practical details for joining a beginner-friendly garden
        workshop.
      </p>

      <section aria-labelledby="visit-heading">
        <h2 id="visit-heading">Before you arrive</h2>

        <details open>
          <summary>Where and when is the workshop?</summary>
          <p>
            Meet at the City Garden welcome desk at 10 a.m. on your booked
            workshop date.
          </p>
          <p>
            The garden entrance is at 18 Green Lane. Please arrive about
            10 minutes early.
          </p>
        </details>

        <details>
          <summary>What should I bring?</summary>
          <p>
            Bring a water bottle and wear comfortable clothes that can get
            muddy. We provide gardening tools and gloves.
          </p>
        </details>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading">Workshop questions</h2>
        <p>
          Open a question to read its answer. Within this FAQ group, opening
          one answer closes the previously open answer.
        </p>

        <details name="workshop-faq" open>
          <summary>Can I attend if I am new to gardening?</summary>
          <p>
            Yes. The workshop starts with the basics, and the instructor will
            guide each activity.
          </p>
        </details>

        <details name="workshop-faq">
          <summary>Are the tools provided?</summary>
          <p>
            Yes. Shared hand tools and gloves are available for workshop
            participants.
          </p>
        </details>

        <details name="workshop-faq">
          <summary>What happens if it rains?</summary>
          <p>
            Light rain will not stop the workshop. If severe weather makes the
            garden unsafe, we will contact registered participants about a new
            date.
          </p>
        </details>
      </section>

      <section aria-labelledby="access-heading">
        <h2 id="access-heading">Access and contact</h2>

        <details>
          <summary>Can I ask about access needs?</summary>
          <p>
            Yes. Contact the workshop team before booking so we can discuss
            the route, seating, and any adjustments that may help.
          </p>
          <p><a href="/contact">Contact the workshop team</a></p>
        </details>
      </section>
    </main>

    <footer>
      <p>City Garden workshops</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page shows the garden navigation, a main heading, and three information sections. The answer to “Where and when is the workshop?” is visible when the page first loads because its details element has the open attribute. “What should I bring?” starts closed and can be opened without a script.

The FAQ starts with its first answer open. Opening another question in that FAQ group closes the answer that was open before. The access question is not in that group, so it can stay open while an FAQ answer is open.

Browsers provide a disclosure marker beside each summary. Its shape and position depend on the browser. Activating a summary reveals or hides the content below it.

## Explanation

- Each details element creates a native disclosure. Its summary is the visible control, and the remaining flow content is shown when the disclosure is open.
- The summary is the first child of every details element and describes the information a person will find inside.
- The first visit detail uses the Boolean open attribute to show its answer at page load. The attribute is either present or absent. Writing open="false" still leaves it open because the attribute is present; remove the attribute to start closed.
- The workshop FAQ details elements share the same non-empty name value. This groups them so opening one closes another in that group. The first FAQ alone has open in the initial markup.
- The other details elements have no matching name. They operate independently and can remain open alongside an FAQ answer.
- The page uses native details and summary behavior, so this basic disclosure does not require JavaScript, a custom clickable element, or a manually added expanded-state attribute.
- The question summaries make sense without opening the answers. Important orientation information is visible outside of optional disclosures too.
- A disclosure is suitable for optional supporting information like an FAQ. It should not be used as a substitute for a navigation menu, tabs, a dialog, or footnotes.

## How to try it

Copy the HTML code block using its copy button and save it as garden-workshop-information.html. Open the file in a browser. Use a mouse, then a keyboard, to open and close the summaries. Open two questions in the Workshop questions group and notice that only one answer in that group stays open. Then open the access question and notice it can stay open at the same time.

Remove the open attribute from the first visit detail and reload the page to make it start closed. As another experiment, change it to open="false" and reload. It will still start open because open is a Boolean attribute.

The links in this example are illustrative paths. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 43 - Details and summary](../lessons/43-details-and-summary.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [42 - Language, text direction, and international content](42-language-and-text-direction.md) | [Lesson](../lessons/43-details-and-summary.md) | [Q&A](../qnas/43-details-and-summary.md) | [44 - Dialog elements](44-dialog-element.md) |
