# Example 12 - Text semantics: emphasis, importance, and meaning

## Question

Create a short plant-care note that uses text elements to convey stress, importance, a technical term, relevant search words, fine print, an outdated price, and a spelling annotation. Also include a product name and a plant name in contexts where a generic attention element or inline container fits.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Plant Treatment Notes | Garden Journal</title>
  </head>
  <body>
    <main>
      <article>
        <h1>Using a plant treatment safely</h1>

        <p>
          <strong>Warning:</strong> Keep the treatment away from children and pets.
        </p>
        <p>
          Read the directions <em>before</em> applying the treatment, and use it
          <em>only</em> as the label instructs.
        </p>

        <p>
          The <b>LeafGuard Spray</b> comes in a 250 ml bottle.
        </p>
        <p>
          The label uses the term <i>foliar application</i> for spraying a
          treatment directly onto leaves.
        </p>

        <p>
          Search result: <mark>plant treatment directions</mark> for home gardeners.
        </p>
        <p>
          <small>Follow the product label and local safety guidance.</small>
        </p>

        <p>Previous price: <s>$12</s>. Current price: $8.</p>
        <p>
          Editorial change: <del>Water every plant each day.</del> This advice was removed from the draft.
        </p>
        <p>
          Spelling note: the sample label says
          <u>instrutions</u> instead of 'instructions'
        </p>
        <p>
          Plant name: <span class="plant-name">basil</span>.
        </p>
      </article>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Plant Treatment Notes | Garden Journal**. The page displays the heading **Using a plant treatment safely** and a series of short notes.

By default, the warning and fine-print note appear in distinctive styles, the stressed words are emphasized, the search phrase is highlighted, the old price is struck through, and the annotated spelling is underlined. The product name and the technical term may also have browser-default styling. The plant name appears like ordinary text because the span has no styling.

The editorial text marked with del is shown as removed content, usually with a strike-through. Its meaning is an edit, while s marks information that is no longer current. The exact appearance can vary by browser and stylesheet. This document contains no CSS.

## Explanation

- The strong element marks important or serious information. Here, it identifies the safety warning.
- The em element marks stress emphasis. Stressing **before** and **only** changes how those instructions should be understood.
- The b element draws attention to a product name without saying that it is more important. The i element sets the technical term apart from the surrounding prose.
- The mark element highlights words relevant to the current context, such as a phrase matched in a search result.
- The small element marks a side note or fine print.
- The s element marks information that is no longer current. The old price is shown beside the current price.
- The del element marks text that was removed from a document. It describes an edit, unlike s, which marks information that is no longer accurate or relevant.
- The u element marks an annotation, such as the sample spelling error. Underlining is its common default appearance.
- The span element groups the plant name but adds no meaning or visual style by itself. The class can be used by CSS or another tool.
- These elements communicate meaning or text relationships. Their default visual styles can be changed with CSS.

## How to try it

Copy the HTML code block using its copy button, save it as plant-treatment-notes.html, and open it in a browser. Change the words inside em and read how the stress changes the sentence. Then remove the class from span or replace one text element with another and explain what meaning changes.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 12 - Text semantics: emphasis, importance, and meaning](../lessons/12-text-semantics.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [11 - Headings and paragraphs](11-headings-and-paragraphs.md) | [Lesson](../lessons/12-text-semantics.md) | [Q&A](../qnas/12-text-semantics.md) | [13 - Code, abbreviations, dates, and machine-readable text](13-specialized-text-elements.md) |
