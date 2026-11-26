# Example 28 - Forms: the form element and submission flow

## Question

Create a garden club page with two independent forms: a GET search form that sends a named query in the URL, and a POST feedback form that sends a name and message to a destination.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Club Forms</title>
  </head>
  <body>
    <main>
      <h1>Garden Club</h1>
      <p>Find a guide or send feedback about the club's gardening resources.</p>

      <section aria-labelledby="search-heading">
        <h2 id="search-heading">Search the guides</h2>
        <form action="/search" method="get">
          <p>
            <label for="guide-query">Search terms</label>
            <input
              id="guide-query"
              type="search"
              name="q">
          </p>
          <button type="submit">Search</button>
        </form>
      </section>

      <section aria-labelledby="feedback-heading">
        <h2 id="feedback-heading">Send feedback</h2>
        <form action="/feedback" method="post">
          <p>
            <label for="visitor-name">Your name</label>
            <input
              id="visitor-name"
              name="name">
          </p>
          <p>
            <label for="feedback-message">Your message</label>
            <textarea
              id="feedback-message"
              name="message"
              rows="5"
              cols="35"></textarea>
          </p>
          <button type="submit">Send feedback</button>
        </form>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays a heading, a search form, and a feedback form. The search form has a search field and a submit button. The feedback form has a name field, a message area, and its own submit button.

If a visitor searches for the words shade plants, the browser can send a GET request to /search?q=shade+plants. The feedback form sends the named values to /feedback in a POST request body. These example routes need a server or service to process the requests and return a response.

## Explanation

- Each form groups controls for one task. The two forms are separate and are not nested.
- The label elements identify their controls through matching for and id values.
- The name attributes q, name, and message identify the values submitted by the browser. A control without a name does not contribute its value as a named form entry.
- The search form uses method="get". Its named value is included in the request URL, which is useful for a search that can be shared or bookmarked.
- The feedback form uses method="post". Its values are sent in the request body instead of being appended to the URL.
- The action values /search and /feedback are example destinations. HTML displays the form and sends the request, but a server or service must handle the route and produce a response.
- POST does not encrypt submitted data. Secure transport depends on HTTPS, and the destination must handle submitted information appropriately.
- The browser performs the regular form submission without JavaScript.

## How to try it

Copy the HTML code block using its copy button and save it as garden-club-forms.html. Open the file to inspect the two forms. The page can display without a server, but submitting it will not work as intended until the example routes are provided by a server or service.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 28 - Forms: the form element and submission flow](../lessons/28-forms-overview.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [27 - Table headings, captions, and accessible structure](27-accessible-tables.md) | [Lesson](../lessons/28-forms-overview.md) | [Q&A](../qnas/28-forms-overview.md) | [29 - Input types and input attributes](29-input-types-and-attributes.md) |
