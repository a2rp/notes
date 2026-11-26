# Example 14 - Quotations and citations

## Question

Create a page with a longer quotation and a short inline quotation. Identify each quoted work and author, attach a source URL to each quotation, and provide visible links readers can follow. Use clearly fictional sample text and attribution for this demonstration.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Quotations and Citations | Garden Journal</title>
  </head>
  <body>
    <main>
      <article>
        <h1>Quotations about learning</h1>
        <p>
          The quotations and attribution below are fictional examples for
          demonstrating HTML citation markup.
        </p>

        <figure>
          <blockquote cite="https://example.com/sources/learning-the-web">
            <p>
              Clear examples help readers understand how an idea works.
              A careful explanation gives them a way to try the idea for
              themselves.
            </p>
          </blockquote>
          <figcaption>
            From <cite>Learning the Web</cite>, by A. Writer.
            <a href="https://example.com/sources/learning-the-web">
              Read the sample source page
            </a>
          </figcaption>
        </figure>

        <p>
          In a sample interview, A. Writer describes HTML as
          <q cite="https://example.com/interviews/web-notes">
            a way to give content structure
          </q>.
          <a href="https://example.com/interviews/web-notes">
            Read the sample interview
          </a>
        </p>
      </article>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **Quotations and Citations | Garden Journal**. The page displays a heading, a note that the source details are fictional, a longer quotation with an attribution, and an inline quotation within a sentence.

Browsers commonly display the block quotation with indentation and add quotation marks around the q text. The visible links let readers open the sample source pages. The URLs use example.com, so they are placeholders and do not provide real source material.

## Explanation

- The blockquote element marks the longer quoted passage. The cite attribute records a URL for its source.
- The figcaption gives readers a visible attribution after the quotation. The cite element marks the title of the work. The author's name stays ordinary text.
- The q element marks a short quotation within a sentence. Its cite attribute supplies the source URL.
- A cite attribute does not create a visible or clickable link. The a elements provide links readers can follow.
- The source details are fictional examples. HTML can mark quotation and source relationships, but it cannot verify that a quotation or attribution is accurate. Use accurate source details when quoting real work.

## How to try it

Copy the HTML code block using its copy button, save it as quotations-and-citations.html, and open it in a browser. Replace the sample quotations, work title, author, and placeholder URLs with details from a source you can verify. Keep the author outside the cite element, which is for the title of the work.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 14 - Quotations and citations](../lessons/14-quotations-and-citations.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [13 - Code, abbreviations, dates, and machine-readable text](13-specialized-text-elements.md) | [Lesson](../lessons/14-quotations-and-citations.md) | [Q&A](../qnas/14-quotations-and-citations.md) | [15 - Links and the anchor element](15-links.md) |
