# Example 40 - Accessibility with native HTML

## Question

Create an accessible workshop information page using native HTML. Include a skip link, useful image alternatives, descriptive links, a labeled form with a related radio group, and a data table with clear headers.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>City Garden Workshops</title>
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>

    <header>
      <a href="/">
        <img src="images/city-garden-logo.svg" alt="City Garden home">
      </a>
      <p>Learn practical ways to grow plants at home.</p>

      <nav>
        <ul>
          <li><a href="/plants">Explore the plant directory</a></li>
          <li><a href="/workshops">Browse all garden workshops</a></li>
          <li><a href="/contact">Contact the garden team</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
      <h1>City Garden workshops</h1>
      <p>Join a practical workshop and learn by growing.</p>

      <section>
        <h2>Upcoming workshop schedule</h2>

        <p>
          <img
            src="images/seedling-workshop.jpg"
            alt="A volunteer guides a participant transplanting a seedling into a pot.">
        </p>

        <p>
          <img src="images/leaf-divider.svg" alt="">
        </p>

        <table>
          <caption>Workshop dates, topics, and start times</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Workshop topic</th>
              <th scope="col">Start time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <time datetime="2026-11-24">Tuesday, November 24</time>
              </th>
              <td>Starting seeds</td>
              <td><time datetime="10:00">10:00 a.m.</time></td>
            </tr>
            <tr>
              <th scope="row">
                <time datetime="2026-11-26">Thursday, November 26</time>
              </th>
              <td>Container gardening</td>
              <td><time datetime="14:00">2:00 p.m.</time></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Ask about a workshop</h2>
        <p>Fields marked required must be completed.</p>

        <form action="/workshop-questions" method="post">
          <p>
            <label for="visitor-name">Your name (required)</label>
            <input
              id="visitor-name"
              name="name"
              autocomplete="name"
              required>
          </p>

          <p>
            <label for="visitor-email">Email address (required)</label>
            <input
              id="visitor-email"
              name="email"
              type="email"
              autocomplete="email"
              required>
          </p>

          <p>
            <label for="visitor-phone">Phone number (optional)</label>
            <input
              id="visitor-phone"
              name="phone"
              type="tel"
              autocomplete="tel">
          </p>

          <fieldset>
            <legend>How would you prefer us to reply?</legend>

            <p>
              <label>
                <input
                  type="radio"
                  name="reply-method"
                  value="email"
                  checked>
                Email
              </label>
            </p>

            <p>
              <label>
                <input
                  type="radio"
                  name="reply-method"
                  value="phone">
                Phone
              </label>
            </p>
          </fieldset>

          <p>
            <label for="visitor-question">Your question (required)</label>
            <textarea
              id="visitor-question"
              name="question"
              rows="4"
              cols="45"
              required></textarea>
          </p>

          <button type="submit">Send workshop question</button>
        </form>
      </section>
    </main>

    <footer>
      <p>City Garden workshops</p>
      <p><a href="/accessibility">Read our accessibility information</a></p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page shows a site header with a linked logo and navigation, one main heading, a workshop schedule, and a question form. The schedule is presented as a table with a caption, column headings, and row headings. The form has visible labels, a fieldset and legend for the reply choices, and a submit button.

If the image files are available at the paths in the code, the logo and workshop photograph appear. The logo's alternative text names the link destination, the photograph's alternative text describes useful information, and the decorative divider has an empty alternative so it can be skipped by assistive technology.

Links and form controls use native keyboard behavior. The skip link appears first in the page's normal tab order and points to the main content.

## Explanation

- The html element declares the page language with lang="en".
- The skip link is an ordinary link placed before repeated site content. Its fragment matches the id on main.
- The logo image is the only content in its link, so its alt text names the destination. The workshop photo conveys information, so its alt describes the relevant action. The decorative divider uses alt="".
- The headings describe the content hierarchy. The sections group the workshop schedule and question form around their topics.
- Each link has text that describes its destination. The form submit button performs an action.
- The name, email, phone, and question controls each have an explicitly associated label. Placeholder text is not used as a substitute.
- The radio controls share one name, so they form a single choice group. The fieldset and legend describe that group.
- The table caption identifies the data. Column headers use scope="col", and each date row header uses scope="row".
- The elements appear in an order that makes sense when read from the start. Native links, radio buttons, and other form controls can be reached and used from the keyboard.
- The example uses browser-native focus behavior and does not set a custom keyboard order with positive tabindex.

## How to try it

Copy the HTML code block using its copy button and save it as garden-workshops.html. Replace the three example image paths with image files you have. Open the page in a browser, press Tab to move through its links and controls, and check that every control has a visible label.

The schedule dates and form destination are examples. The form needs a server endpoint to receive questions. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 40 - Accessibility with native HTML](../lessons/40-accessibility-with-html.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [39 - Landmarks, headings, and accessible page navigation](39-landmarks-and-page-navigation.md) | [Lesson](../lessons/40-accessibility-with-html.md) | [Q&A](../qnas/40-accessibility-with-html.md) | [41 - ARIA in HTML: when and how to use it](41-aria-in-html.md) |
