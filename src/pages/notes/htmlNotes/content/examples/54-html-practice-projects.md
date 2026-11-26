# Example 54 - HTML-only practice pages

## Question

Create a single page for a community garden workshop using HTML only. Combine a page introduction, a schedule table, a list, native FAQ disclosures, and a labeled registration form. Do not add CSS or JavaScript.

The workshop details and date are sample content. Replace them with accurate information for a real event.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Community Garden Workshop - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="#overview">About</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#questions">Questions</a></li>
          <li><a href="#register">Register</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Community Garden Workshop</h1>

      <section id="overview">
        <h2>About the workshop</h2>
        <p>
          Learn how to prepare a container, choose soil, and plant herbs for a
          small outdoor space. No previous gardening experience is needed.
        </p>
        <p>Date: <time datetime="2027-06-19">June 19, 2027</time></p>
        <p>Location: City Garden teaching area</p>

        <h3>What to bring</h3>
        <ul>
          <li>A reusable water bottle</li>
          <li>Gloves, if you have them</li>
          <li>A notebook for taking notes</li>
        </ul>
      </section>

      <section id="schedule">
        <h2>Workshop schedule</h2>
        <table>
          <caption>Sessions for the community garden workshop</caption>
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Session</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><time datetime="09:00">9:00 a.m.</time></td>
              <td>Welcome and introductions</td>
              <td>Teaching area</td>
            </tr>
            <tr>
              <td><time datetime="09:30">9:30 a.m.</time></td>
              <td>Choose a container and prepare the soil</td>
              <td>Potting tables</td>
            </tr>
            <tr>
              <td><time datetime="10:30">10:30 a.m.</time></td>
              <td>Plant herbs and ask questions</td>
              <td>Teaching area</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="questions">
        <h2>Frequently asked questions</h2>

        <details>
          <summary>Do I need gardening experience?</summary>
          <p>No. The workshop introduces the basic steps and is suitable for beginners.</p>
        </details>

        <details>
          <summary>Should I bring any tools?</summary>
          <p>Shared tools and planting materials will be available during the session.</p>
        </details>

        <details>
          <summary>Can I bring a child with me?</summary>
          <p>Children may attend with a responsible adult. Please include them in your registration note.</p>
        </details>

        <details>
          <summary>What happens if it rains?</summary>
          <p>The planting activity will move to the covered teaching area.</p>
        </details>

        <details>
          <summary>Do I need to bring a plant home?</summary>
          <p>No. The workshop is complete even if you do not take a plant home.</p>
        </details>
      </section>

      <section id="register">
        <h2>Register for the workshop</h2>
        <p>Your name, email address, and topic are required. The message field is optional.</p>

        <form action="/register" method="post">
          <p>
            <label for="attendee-name">Full name (required)</label>
            <input
              id="attendee-name"
              name="name"
              autocomplete="name"
              required>
          </p>

          <p>
            <label for="attendee-email">Email address (required)</label>
            <input
              id="attendee-email"
              name="email"
              type="email"
              autocomplete="email"
              required>
          </p>

          <p>
            <label for="attendee-topic">What would you like to learn? (required)</label>
            <select id="attendee-topic" name="topic" required>
              <option value="">Choose a topic</option>
              <option value="containers">Container gardening</option>
              <option value="soil">Soil and compost</option>
              <option value="herbs">Growing herbs</option>
            </select>
          </p>

          <p>
            <label for="attendee-message">Message (optional)</label>
            <textarea id="attendee-message" name="message" rows="5"></textarea>
          </p>

          <button type="submit">Send registration</button>
        </form>
      </section>
    </main>

    <footer>
      <p>City Garden community workshops</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The browser displays a plain workshop page with same-page navigation links, an introduction, a bring list, a three-row schedule table, five expandable questions, and a registration form. Its appearance uses the browser's default presentation because the document contains no CSS or JavaScript.

The FAQ disclosures work using the browser's built-in `<details>` behavior. The form displays required fields and a submit button, but it cannot register anyone until a server or service handles the `/register` request.

## Explanation

- The complete document includes a doctype, language, character encoding, viewport metadata, a descriptive title, and one main heading.
- Each navigation link points to a section with a matching `id`.
- The schedule is real tabular information. Its `<caption>` identifies the table, and each `<th scope="col">` names a column. The table is not being used to lay out the page.
- The packing list uses `<ul>` because the items do not have a required sequence.
- Each FAQ uses `<details>` with `<summary>` as its first child. The browser supplies the disclosure control without JavaScript.
- Each form control has a visible `<label>` associated through matching `for` and `id` values. `type="email"` and `required` provide basic browser-side input checks.
- The form's `action` and `method` describe where and how to submit the information. A real `/register` endpoint must receive and process it. The server still needs to validate submitted data.
- The date and schedule use `<time>` so the visible time also has a machine-readable `datetime` value.
- No CSS or JavaScript is included. The HTML describes content and structure, while native browser defaults provide the basic presentation and built-in disclosure behavior.

## How to try it

1. Copy the HTML code block using its copy button and save it as `index.html`.
2. Open the file in a browser. Use the navigation links and expand each FAQ.
3. Submit the form with a required field empty and observe the browser's built-in constraint check. Do not expect the sample form to complete registration because the example has no server endpoint.
4. If you connect a real endpoint, update `action="/register"`, explain what information is collected, and validate the submitted data on the server.
5. Run the document through the Nu Html Checker and review the page for meaning and usability as well as markup errors.

## Related lesson

[Read lesson 54 - HTML-only practice pages](../lessons/54-html-practice-projects.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [53 - Validate and debug HTML](53-validation-and-debugging.md) | [Lesson](../lessons/54-html-practice-projects.md) | [Q&A](../qnas/54-html-practice-projects.md) | [55 - HTML quick reference and glossary](55-html-reference-and-glossary.md) |
