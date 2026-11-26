# 54 - HTML-only practice pages

The best way to practice HTML is to build pages with real content and clear structure. In these projects, use HTML only. Do not add CSS or JavaScript. The browser's default presentation is enough to show headings, paragraphs, lists, links, images, tables, and form controls.

These exercises combine elements from earlier chapters. Focus on choosing elements for their meaning, not on making the page look like a designed website.

## Before you start

Create a separate .html file for each project. Begin with a complete document structure:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Descriptive page title</title>
  </head>
  <body>
    <main>
      <h1>Page heading</h1>
      <p>Page content goes here.</p>
    </main>
  </body>
</html>
~~~

Replace the title, heading, and content with information about your project. Keep the document language accurate if you write the page in another language.

For every project:

- Use one main heading that describes the page.
- Organize content with suitable sections and headings.
- Write links that say where they go.
- Add text alternatives for meaningful images.
- Keep HTML focused on content and structure.
- Validate the finished document and review what the browser displays.

## Project 1: Personal profile

Create a simple profile page for a fictional person or for yourself. Include:

- A page title and one main heading with the person's name.
- A short introduction.
- A meaningful portrait or a decorative image with the correct alternative text choice.
- A list of interests or skills.
- Links to three relevant pages or profiles.
- A contact section with an email link.

Starter example:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About Maya Chen</title>
  </head>
  <body>
    <header>
      <h1>Maya Chen</h1>
      <p>Student, reader, and amateur gardener.</p>
    </header>

    <main>
      <section>
        <h2>About</h2>
        <p>I am learning how plants grow in small city spaces.</p>
        <img src="maya-garden.jpg" alt="Maya watering herbs on a balcony">
      </section>

      <section>
        <h2>Interests</h2>
        <ul>
          <li>Balcony gardening</li>
          <li>Nature photography</li>
          <li>Science books</li>
        </ul>
      </section>

      <section>
        <h2>Find me online</h2>
        <ul>
          <li><a href="https://example.com/garden-notes">Garden notes</a></li>
          <li><a href="https://example.org/photographs">Photo collection</a></li>
          <li><a href="mailto:maya@example.net">Email Maya</a></li>
        </ul>
      </section>
    </main>
  </body>
</html>
~~~

Change the example instead of copying it without thought. The image path needs to point to a real image in your project, and the alternative text should match that image.

## Project 2: Article page

Create an article about a topic you know. Include:

- A site or publication name.
- An article title and a short introduction.
- An author name and a publication date using a time element.
- At least three sections with headings.
- One quotation with a source.
- A related article link.
- A footer with publication information.

Use article for a self-contained article, header for its introductory information, section for thematic sections, and footer for related publication details. A heading should describe the content that follows it.

## Project 3: Recipe

Create a recipe page with:

- The recipe name and a short description.
- Preparation information written as visible text.
- An ingredients list using ul.
- Numbered cooking instructions using ol.
- At least one note or substitution.
- A relevant image with useful alternative text.
- A link to another related recipe.

Choose lists by meaning. Ingredients do not have a required sequence, while the cooking steps do.

## Project 4: Event schedule

Create a page for a one-day community event. Include an introduction, location, date, and a schedule table.

Use a table only for information that belongs in rows and columns. Give it a caption, column headings in th elements, and scope="col" for each column header.

~~~html
<table>
  <caption>Saturday garden workshop schedule</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Session</th>
      <th scope="col">Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>9:00 a.m.</td>
      <td>Welcome and introductions</td>
      <td>Community room</td>
    </tr>
    <tr>
      <td>10:00 a.m.</td>
      <td>Planting workshop</td>
      <td>Roof garden</td>
    </tr>
  </tbody>
</table>
~~~

Add at least three schedule rows of your own. Do not use a table just to position the page's headings or other content.

## Project 5: Frequently asked questions

Create a page with at least five questions and answers. Use a details element for each disclosure and place its question in the first summary element.

~~~html
<section>
  <h2>Frequently asked questions</h2>

  <details>
    <summary>Do I need to bring gardening tools?</summary>
    <p>No. Shared tools will be available at the workshop.</p>
  </details>

  <details>
    <summary>Can I attend if I am new to gardening?</summary>
    <p>Yes. The workshop is designed for beginners.</p>
  </details>
</section>
~~~

The browser provides the built-in control for each details element. Do not use this pattern for tabs or menus; those are different kinds of controls.

## Project 6: Contact form

Create a contact form with:

- A visible label for every control.
- A name field.
- An email field using the appropriate input type.
- A topic selector or a group of radio buttons.
- A message field using textarea.
- A submit button.
- A short explanation of which information is required.

Example:

~~~html
<form action="/contact" method="post">
  <p>
    <label for="visitor-name">Your name</label>
    <input id="visitor-name" name="name" autocomplete="name" required>
  </p>

  <p>
    <label for="visitor-email">Email address</label>
    <input
      id="visitor-email"
      name="email"
      type="email"
      autocomplete="email"
      required>
  </p>

  <p>
    <label for="message">Message</label>
    <textarea id="message" name="message" required></textarea>
  </p>

  <button type="submit">Send message</button>
</form>
~~~

The path /contact is an example endpoint. A real form needs a server or service at its action URL to receive and process the submission. HTML alone does not send an email or store a message. The browser can check some constraints, such as whether a required value is present, but the receiving application still needs to validate submitted data.

## Project 7: Book or movie collection

Create a small catalog with at least four items. For each item, include:

- A title as a heading.
- A short description.
- A creator or author.
- A year, if known.
- A link to more information.
- A cover image with suitable alternative text, if you include one.

Use a list when you need a straightforward collection. Use an article for each item when every entry is a self-contained description. Do not invent details just to fill every field.

## Project 8: Personal portfolio

Build a one-page portfolio using content from the earlier projects. Include:

- A header with your name and a brief introduction.
- A nav with links to sections on the same page.
- A main with sections for your work, skills, and background.
- At least two project descriptions with links.
- A contact section.
- A footer with relevant information.

Give each section a unique id, then link to it from the navigation:

~~~html
<nav>
  <ul>
    <li><a href="#work">Work</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<main>
  <section id="work">
    <h2>Work</h2>
    <p>Examples of projects go here.</p>
  </section>

  <section id="skills">
    <h2>Skills</h2>
    <p>Skills you can describe accurately go here.</p>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <p><a href="mailto:hello@example.net">Email me</a></p>
  </section>
</main>
~~~

Replace the example address and text with real content before sharing the page.

## Final review checklist

Before considering a project complete, ask:

- Does the document include a doctype, a language, a character encoding, and a useful title?
- Is there one clear h1 that names the page?
- Are headings in a logical order and do they describe their sections?
- Are lists, tables, forms, links, and images used for their proper purposes?
- Does each link have a clear destination?
- Does each form control have a programmatically associated label?
- Do meaningful images have accurate alternative text?
- Is the content understandable without CSS or JavaScript?
- Does the document pass an HTML conformance check?
- Have you opened it in a browser and tried its links, disclosures, and controls?

A valid document is a good milestone, not the only measure of quality. Review meaning and usability as well as syntax.

## Common mistakes

- Adding CSS or JavaScript when the exercise asks for HTML only.
- Using headings only to make text look larger.
- Using a table for layout instead of tabular information.
- Using generic div elements when a meaningful element fits.
- Adding images without checking their file paths or alternative text.
- Creating a form that looks finished but has no real server or service to receive it.
- Treating browser validation as a replacement for checking data on the server.
- Assuming that a page is accessible just because it passes a validator.

## Key points

- Practice projects help combine elements from different lessons.
- Use semantic HTML to describe content and structure.
- The browser's default presentation is enough for HTML-only practice.
- Native elements such as details and form controls provide built-in behavior.
- A form needs an endpoint if it is expected to process submissions.
- Validate the document and review how people can understand and use it.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [53 - Validate and debug HTML](53-validation-and-debugging.md) | [Q&A](../qnas/54-html-practice-projects.md) | [Example](../examples/54-html-practice-projects.md) | [55 - HTML quick reference and glossary](55-html-reference-and-glossary.md) |