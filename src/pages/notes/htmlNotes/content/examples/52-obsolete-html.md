# Example 52 - Deprecated elements and obsolete HTML

## Question

Modernize an old garden notice that used presentational tags and outdated elements. Preserve what the content means, use semantic HTML for structure, and leave visual choices such as color and alignment to CSS.

## Legacy fragment to replace

This fragment mixes presentation with meaning and uses several obsolete elements:

~~~html
<center>
  <font color="navy" size="+2"><big>Garden Notes</big></font>
</center>
<p><acronym title="HyperText Markup Language">HTML</acronym> tips</p>
<p><strike>Doors open at 6:00 p.m.</strike> Doors open at 6:30 p.m.</p>
<p>Use <tt>href</tt> to give a link its destination.</p>
<dir>
  <li>Check the weather.</li>
  <li>Bring gloves.</li>
</dir>
~~~

## Updated HTML page

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Notes - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/garden/">The garden</a></li>
          <li><a href="/notes/">Garden notes</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <header>
          <h1>Garden Notes</h1>
          <p>
            The <abbr title="HyperText Markup Language">HTML</abbr> tips on this
            page explain how to structure a simple garden guide.
          </p>
        </header>

        <section aria-labelledby="schedule-heading">
          <h2 id="schedule-heading">Updated opening time</h2>
          <p>
            The schedule has been revised:
            <del>Doors open at 6:00 p.m.</del>
            <ins>Doors open at 6:30 p.m.</ins>
          </p>
          <p>The old ticket price is no longer accurate: <s>$25</s>. The current price is $18.</p>
        </section>

        <section aria-labelledby="guide-heading">
          <h2 id="guide-heading">Using a page link</h2>
          <p>In HTML, the <code>href</code> attribute gives a link its destination.</p>
          <p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save this page.</p>
          <p>The editor may show <samp>Saved</samp> after it writes the file.</p>
          <p>The example variable <var>plantCount</var> stores the number of plants.</p>
        </section>

        <section aria-labelledby="checklist-heading">
          <h2 id="checklist-heading">Before you visit</h2>
          <ul>
            <li>Check the weather.</li>
            <li>Bring gloves.</li>
          </ul>
        </section>
      </article>
    </main>

    <footer>
      <p>City Garden visitor notes</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The browser shows a page heading, navigation, an updated schedule, a current price, HTML tips, and a checklist. The old and revised schedule text is marked as a document edit. The expired price is marked as information that is no longer current.

The page uses the browser's default presentation. It does not depend on obsolete tags to set color, alignment, or text size. CSS can add those visual choices separately without changing the elements' meaning.

## Explanation

- The old `<center>`, `<font>`, and `<big>` tags tried to control appearance. The updated page uses `<h1>` because “Garden Notes” is the main heading. If it needs a particular color, size, or alignment, add that presentation with CSS.
- `<abbr>` marks an abbreviation. Its `title` gives the expansion of HTML.
- `<del>` and `<ins>` mark content removed and added during an edit. `<s>` marks information that is no longer accurate, such as the expired price. Choose among them by meaning, not by the line each browser draws.
- `<code>` marks an HTML attribute name. `<kbd>` marks keyboard input, `<samp>` marks sample program output, and `<var>` marks a variable.
- `<dir>` was used for a directory-style list. The updated checklist is an unordered list with `<ul>` and `<li>`.
- The page uses `header`, `nav`, `main`, `article`, `section`, headings, and `footer` to express its structure. When updating a frameset page, decide which areas should become ordinary page content and use an `iframe` only when you need to embed a separate document.
- There is no one-for-one replacement for every obsolete element. First identify whether the old markup represented meaning, presentation, or page layout.
- A browser may still display an old element, but that does not make it suitable or conforming for new pages.

## How to try it

1. Copy the updated HTML block using its copy button and save it as `index.html`.
2. Compare the legacy fragment with the updated page. Identify which old elements controlled appearance and which represented content.
3. Change the schedule and decide whether the text is an edit. Change the price and decide whether it is simply no longer current.
4. Remove an obsolete tag from the legacy fragment and explain which current element or CSS rule best expresses its purpose.
5. Run the updated page through an HTML conformance checker. Review warnings as well as errors, and decide whether each finding changes the page's intended meaning.

## Related lesson

[Read lesson 52 - Deprecated elements and obsolete HTML](../lessons/52-obsolete-html.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [51 - Safe links and embedded content](51-html-safety.md) | [Lesson](../lessons/52-obsolete-html.md) | [Q&A](../qnas/52-obsolete-html.md) | [53 - Validate and debug HTML](53-validation-and-debugging.md) |
