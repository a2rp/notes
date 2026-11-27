# 98. All code samples

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Validation, testing, and release checks](./16-validation-testing-and-release-checks.md) | [Notes index](../README.md) | [Next: Complete questions and answers](./99-complete-q-and-a.md) |

## Source chapter: [01. HTML document structure and first page](./01-html-document-structure-and-first-page.md)

### Sample 1

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first page</title>
  </head>
  <body>
    <header>
      <h1>Learning HTML</h1>
    </header>

    <main>
      <p>This is my first structured web page.</p>
    </main>
  </body>
</html>
~~~

## Source chapter: [02. Elements, attributes, and nesting](./02-elements-attributes-and-nesting.md)

### Sample 1

~~~html
<p>HTML gives this sentence paragraph meaning.</p>
~~~

### Sample 2

~~~html
<img src="desk.jpg" alt="A notebook beside a laptop" />
<br />
<input type="email" name="email" />
~~~

### Sample 3

~~~html
<a href="https://developer.mozilla.org/">Read the HTML reference</a>
~~~

### Sample 4

~~~html
<p>Read the <strong>important</strong> part carefully.</p>
~~~

### Sample 5

~~~html
<input type="text" required />
<button type="button" disabled>Unavailable</button>
~~~

## Source chapter: [03. Text, headings, and lists](./03-text-headings-and-lists.md)

### Sample 1

~~~html
<main>
  <h1>Garden planning</h1>

  <section>
    <h2>Choose a location</h2>
    <p>Check sunlight, drainage, and access to water.</p>

    <h3>Measure the space</h3>
    <p>Record the width and length before choosing plants.</p>
  </section>
</main>
~~~

### Sample 2

~~~html
<p>Save a copy before you change the original file.</p>
<p><strong>Warning:</strong> this action removes the saved draft.</p>
<p>You <em>must</em> review the filename before submission.</p>
~~~

### Sample 3

~~~html
<h2>Pack the tools</h2>
<ul>
  <li>Notebook</li>
  <li>Measuring tape</li>
  <li>Garden gloves</li>
</ul>

<h2>Prepare the bed</h2>
<ol>
  <li>Remove weeds.</li>
  <li>Loosen the soil.</li>
  <li>Water the area.</li>
</ol>
~~~

### Sample 4

~~~html
<dl>
  <dt>Compost</dt>
  <dd>Organic material added to improve soil.</dd>

  <dt>Mulch</dt>
  <dd>A surface layer that helps protect the soil.</dd>
</dl>
~~~

## Source chapter: [04. Links, paths, and navigation](./04-links-paths-and-navigation.md)

### Sample 1

~~~html
<a href="./about.html">Read about this project</a>
<a href="https://developer.mozilla.org/">Open the HTML reference</a>
~~~

### Sample 2

~~~html
<a href="./contact.html">Contact</a>
<a href="../index.html">Return to the parent folder</a>
<a href="https://example.com/guide">Open an external guide</a>
~~~

### Sample 3

~~~html
<nav aria-label="On this page">
  <a href="#requirements">Requirements</a>
  <a href="#contact">Contact</a>
</nav>

<section id="requirements">
  <h2>Requirements</h2>
  <p>Review the information before submitting.</p>
</section>

<section id="contact">
  <h2>Contact</h2>
  <p>Send a message to the project team.</p>
</section>
~~~

### Sample 4

~~~html
<nav aria-label="Primary">
  <ul>
    <li><a href="./index.html" aria-current="page">Home</a></li>
    <li><a href="./notes.html">Notes</a></li>
    <li><a href="./contact.html">Contact</a></li>
  </ul>
</nav>
~~~

### Sample 5

~~~html
<a href="https://example.com/report" target="_blank" rel="noopener">
  Read the report in a new tab
</a>
~~~

## Source chapter: [05. Images, figures, and responsive sources](./05-images-figures-and-responsive-sources.md)

### Sample 1

~~~html
<img
  src="./images/planting-plan.jpg"
  alt="Three garden beds arranged beside a sunny fence"
  width="1200"
  height="800"
/>
~~~

### Sample 2

~~~html
<img src="./images/orange-divider.svg" alt="" />
~~~

### Sample 3

~~~html
<figure>
  <img
    src="./images/seedlings.jpg"
    alt="Young seedlings growing in small pots"
    width="960"
    height="640"
  />
  <figcaption>Seedlings started indoors in early spring.</figcaption>
</figure>
~~~

### Sample 4

~~~html
<img
  src="./images/garden-800.jpg"
  srcset="./images/garden-480.jpg 480w, ./images/garden-800.jpg 800w, ./images/garden-1400.jpg 1400w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="A small vegetable garden with raised beds"
  width="1400"
  height="900"
/>
~~~

### Sample 5

~~~html
<picture>
  <source
    media="(max-width: 600px)"
    srcset="./images/garden-portrait.jpg"
  />
  <source
    type="image/avif"
    srcset="./images/garden.avif"
  />
  <img
    src="./images/garden-wide.jpg"
    alt="Raised vegetable beds beside a fence"
    width="1400"
    height="900"
  />
</picture>
~~~

## Source chapter: [06. Audio, video, and embedded content](./06-audio-video-and-embedded-content.md)

### Sample 1

~~~html
<audio controls preload="metadata">
  <source src="./media/field-recording.mp3" type="audio/mpeg" />
  <source src="./media/field-recording.ogg" type="audio/ogg" />
  <p>
    Your browser cannot play this audio.
    <a href="./media/field-recording.mp3">Download the recording</a>.
  </p>
</audio>
~~~

### Sample 2

~~~html
<video controls preload="metadata" width="960" poster="./images/field-poster.jpg">
  <source src="./media/field-guide.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="./media/field-guide-en.vtt"
    srclang="en"
    label="English captions"
    default
  />
  <p>
    Your browser cannot play this video.
    <a href="./media/field-guide.mp4">Download the video</a>.
  </p>
</video>
~~~

### Sample 3

~~~html
<iframe
  src="https://example.com/map"
  title="Map showing the garden entrance"
  width="600"
  height="400"
  loading="lazy"
></iframe>
~~~

## Source chapter: [07. Tables and accessible data](./07-tables-and-accessible-data.md)

### Sample 1

~~~html
<table>
  <caption>Weekly garden watering schedule</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Morning</th>
      <th scope="col">Evening</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>Seedlings</td>
      <td>Tomatoes</td>
    </tr>
    <tr>
      <th scope="row">Tuesday</th>
      <td>Herbs</td>
      <td>Raised beds</td>
    </tr>
  </tbody>
</table>
~~~

### Sample 2

~~~html
<table>
  <caption>Hours spent studying this week</caption>
  <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Hours</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML</th>
      <td>4</td>
    </tr>
    <tr>
      <th scope="row">JavaScript</th>
      <td>6</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>10</td>
    </tr>
  </tfoot>
</table>
~~~

### Sample 3

~~~html
<table>
  <caption>Monthly rainfall by location</caption>
  <thead>
    <tr>
      <th id="location" scope="col">Location</th>
      <th id="january" scope="col">January</th>
      <th id="february" scope="col">February</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="north" scope="row">North garden</th>
      <td headers="north january">42 mm</td>
      <td headers="north february">38 mm</td>
    </tr>
  </tbody>
</table>
~~~

## Source chapter: [08. Forms, controls, and labels](./08-forms-controls-and-labels.md)

### Sample 1

~~~html
<form action="/signup" method="post">
  <div>
    <label for="full-name">Full name</label>
    <input id="full-name" name="fullName" autocomplete="name" required />
  </div>

  <div>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" required />
  </div>

  <button type="submit">Create account</button>
</form>
~~~

### Sample 2

~~~html
<label for="search-term">Search articles</label>
<input id="search-term" name="q" type="search" />
~~~

### Sample 3

~~~html
<label>
  <input type="checkbox" name="updates" value="yes" />
  Send me product updates
</label>
~~~

### Sample 4

~~~html
<fieldset>
  <legend>Preferred contact method</legend>

  <label>
    <input type="radio" name="contactMethod" value="email" checked />
    Email
  </label>

  <label>
    <input type="radio" name="contactMethod" value="phone" />
    Phone
  </label>
</fieldset>
~~~

## Source chapter: [09. Native form validation and submission](./09-native-form-validation-and-submission.md)

### Sample 1

~~~html
<form id="newsletter-form" action="/newsletter" method="post">
  <label for="newsletter-email">Email address</label>
  <input
    id="newsletter-email"
    name="email"
    type="email"
    autocomplete="email"
    required
  />
  <button type="button" id="check-fields">Check fields</button>
  <button type="submit">Subscribe</button>
</form>
~~~

### Sample 2

~~~html
<form action="/search" method="get">
  <label for="site-search">Search this site</label>
  <input id="site-search" name="q" type="search" />
  <button type="submit">Search</button>
</form>
~~~

### Sample 3

~~~js
const form = document.querySelector("#newsletter-form");
const checkButton = document.querySelector("#check-fields");

checkButton.addEventListener("click", () => {
  form.reportValidity();
});
~~~

## Source chapter: [10. Semantic page structure and landmarks](./10-semantic-page-structure-and-landmarks.md)

### Sample 1

~~~html
<header>
  <a href="./index.html">Garden journal</a>
  <nav aria-label="Primary">
    <a href="./plants.html">Plants</a>
    <a href="./plans.html">Plans</a>
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Preparing a spring garden</h1>
    <p>Plan the beds before planting.</p>

    <section aria-labelledby="checklist-heading">
      <h2 id="checklist-heading">Preparation checklist</h2>
      <ul>
        <li>Check the soil.</li>
        <li>Measure the beds.</li>
      </ul>
    </section>
  </article>

  <aside aria-label="Related reading">
    <a href="./compost.html">How compost improves soil</a>
  </aside>
</main>

<footer>
  <p>Garden journal</p>
</footer>
~~~

### Sample 2

~~~html
<a href="#main-content">Skip to main content</a>

<header>
  <nav aria-label="Primary">
    <a href="./index.html">Home</a>
    <a href="./notes.html">Notes</a>
  </nav>
</header>

<main id="main-content">
  <h1>Notes</h1>
</main>
~~~

## Source chapter: [11. Metadata and the document head](./11-metadata-and-the-document-head.md)

### Sample 1

~~~html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta
    name="description"
    content="A field journal about planning and caring for a home garden."
  />
  <title>Garden Journal | Home</title>
  <link rel="icon" href="./favicon.ico" sizes="any" />
</head>
~~~

### Sample 2

~~~html
<link rel="stylesheet" href="./styles.css" />
<link rel="icon" href="./images/site-icon.svg" type="image/svg+xml" />
~~~

### Sample 3

~~~html
<meta property="og:title" content="Garden Journal" />
<meta
  property="og:description"
  content="Notes from planning and growing a home garden."
/>
<meta property="og:image" content="https://example.com/images/garden-share.jpg" />
<meta property="og:url" content="https://example.com/garden/" />
~~~

## Source chapter: [12. Loading scripts and external resources](./12-loading-scripts-and-external-resources.md)

### Sample 1

~~~html
<head>
  <link rel="stylesheet" href="./styles.css" />
</head>
~~~

### Sample 2

~~~html
<head>
  <script src="./app.js" defer></script>
</head>
~~~

### Sample 3

~~~html
<script src="https://example.com/independent-widget.js" async></script>
~~~

### Sample 4

~~~html
<script type="module" src="./main.js"></script>
~~~

### Sample 5

~~~html
<button type="button" id="save-button">Save</button>
<script type="module" src="./main.js"></script>
~~~

### Sample 6

~~~js
const saveButton = document.querySelector("#save-button");

saveButton.addEventListener("click", () => {
  console.log("Save requested");
});
~~~

### Sample 7

~~~html
<noscript>
  <p>Enable JavaScript to use the interactive map.</p>
</noscript>
~~~

## Source chapter: [13. Native interactive elements](./13-native-interactive-elements.md)

### Sample 1

~~~html
<details>
  <summary>Show planting notes</summary>
  <p>Water the seedlings after moving them into the bed.</p>
</details>
~~~

### Sample 2

~~~html
<button type="button" id="open-help">Open help</button>

<dialog id="help-dialog" aria-labelledby="help-title">
  <h2 id="help-title">Garden help</h2>
  <p>Choose a sunny spot with good drainage.</p>

  <form method="dialog">
    <button type="submit">Close help</button>
  </form>
</dialog>
~~~

### Sample 3

~~~js
const helpDialog = document.querySelector("#help-dialog");
const openHelpButton = document.querySelector("#open-help");

openHelpButton.addEventListener("click", () => {
  helpDialog.showModal();
});
~~~

### Sample 4

~~~html
<dialog id="confirm-dialog">
  <p>Remove this draft?</p>
  <form method="dialog">
    <button value="cancel">Keep draft</button>
    <button value="remove">Remove draft</button>
  </form>
</dialog>
~~~

## Source chapter: [14. Accessibility and ARIA basics](./14-accessibility-and-aria-basics.md)

### Sample 1

~~~html
<a href="./account.html">Open account settings</a>
<button type="button">Save changes</button>
~~~

### Sample 2

~~~html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel" />

<button type="button" aria-label="Close dialog">×</button>
~~~

### Sample 3

~~~html
<label for="password">Password</label>
<p id="password-help">Use at least 12 characters.</p>
<input
  id="password"
  name="password"
  type="password"
  aria-describedby="password-help"
/>
~~~

### Sample 4

~~~html
<a href="./invoice.pdf">Download the April invoice</a>
<img src="./images/soil-test.jpg" alt="A soil test kit showing neutral pH" />
<img src="./images/dot-pattern.svg" alt="" />
~~~

## Source chapter: [15. Global attributes and data attributes](./15-global-and-data-attributes.md)

### Sample 1

~~~html
<article id="spring-plan" class="note-card" lang="en">
  <h2>Spring plan</h2>
  <p>Prepare the soil before planting.</p>
</article>
~~~

### Sample 2

~~~html
<p hidden>This message is not currently shown.</p>
~~~

### Sample 3

~~~html
<button
  type="button"
  data-action="archive"
  data-note-id="42"
>
  Archive note
</button>
~~~

### Sample 4

~~~js
const archiveButton = document.querySelector("[data-action='archive']");

console.log(archiveButton.dataset.action);
console.log(archiveButton.dataset.noteId);
~~~

## Source chapter: [16. Validation, testing, and release checks](./16-validation-testing-and-release-checks.md)

### Sample 1

~~~text
https://validator.w3.org/nu/
~~~

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Validation, testing, and release checks](./16-validation-testing-and-release-checks.md) | [Notes index](../README.md) | [Next: Complete questions and answers](./99-complete-q-and-a.md) |
