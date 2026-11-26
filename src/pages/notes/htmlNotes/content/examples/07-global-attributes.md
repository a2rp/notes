# Example 07 - Global attributes

## Question

Create a complete HTML page that uses common global attributes to identify and group content, describe text, allow in-page editing, hide a paragraph, and attach custom data.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Journal</title>
  </head>
  <body>
    <main id="main-content" class="page">
      <h1 id="page-title" class="page-heading">Garden journal</h1>
      <p class="summary">
        Simple notes for looking after herbs at home.
      </p>

      <section>
        <h2>Care reminders</h2>
        <p class="tip" title="A useful daily reminder">
          Water the herbs in the morning and check that each pot can drain.
        </p>
        <p lang="es" dir="auto">
          Hoy cuida las plantas.
        </p>
      </section>

      <section>
        <h2>Editable note</h2>
        <p contenteditable="true" spellcheck="true">
          Click here and change this reminder in the page.
        </p>
      </section>

      <p data-note-id="42">
        This visible note has a custom data value in its source.
      </p>

      <p hidden>
        This paragraph is in the document source but is currently hidden.
      </p>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Garden Journal**. The page displays a heading, a summary, care reminders in English and Spanish, an editable reminder, and a note. The hidden paragraph does not appear.

The editable reminder can be changed in the browser, but the edit is not saved to the HTML file. The `data-note-id` value does not appear on the page and does not create behavior by itself. A browser may show the `title` value as a tooltip when the pointer rests on the reminder.

## Explanation

- The `id` attribute identifies a single element in this document. Each id value here is unique.
- The `class` attribute groups elements by a shared label, such as `page`, `page-heading`, or `summary`. Class names have no built-in visual effect.
- The `lang` attribute identifies the Spanish paragraph's language. `dir="auto"` lets the browser determine its text direction from the content.
- The `title` attribute provides advisory information. Keep important instructions in visible text because a tooltip may not be available to every user.
- `contenteditable="true"` allows the reminder text to be changed in the current page. It does not save those edits.
- `spellcheck="true"` asks the browser to provide spelling assistance when available.
- The `hidden` Boolean attribute means the paragraph is not presented while the attribute is present. The content remains in the source.
- The custom `data-note-id` attribute associates a value with the note. It does not display that value or add behavior on its own.

## How to try it

Copy the HTML code block using its copy button, save it as `global-attributes-practice.html`, and open it in a browser. Click the editable reminder and change its text. Remove `hidden` from the last paragraph to show it. The Markdown file displays this code as text and does not execute it.

## Related lesson

[Read lesson 07 - Global attributes](../lessons/07-global-attributes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) | [Lesson](../lessons/07-global-attributes.md) | [Q&A](../qnas/07-global-attributes.md) | [08 - Comments, character references, and special characters](08-comments-and-character-references.md) |
