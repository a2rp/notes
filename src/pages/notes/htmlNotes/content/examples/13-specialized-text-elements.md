# Example 13 - Code, abbreviations, dates, and machine-readable text

## Question

Create a short HTML reference page that shows a code sample, a command a reader types, sample program output, and a simple expression with variables. Also define a technical term, introduce an abbreviation, and pair readable product and date information with machine-readable values.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML Reference Notes | Garden Journal</title>
  </head>
  <body>
    <main>
      <article>
        <h1>Useful details in HTML</h1>
        <p>
          HyperText Markup Language
          (<abbr title="HyperText Markup Language">HTML</abbr>)
          describes the structure of web content.
        </p>

        <section>
          <h2>Code and commands</h2>
          <p>
            The <code>&lt;main&gt;</code> element contains the main content
            of a page.
          </p>

          <p>Here is a two-line HTML sample:</p>
          <pre><code>&lt;p&gt;Basil needs bright light.&lt;/p&gt;
&lt;p&gt;Check the soil before watering.&lt;/p&gt;</code></pre>

          <p>At the prompt, type <kbd>html-check garden.html</kbd>.</p>
          <p>The program responds with <samp>No errors found.</samp></p>
          <p>
            In the expression <var>total</var> = <var>price</var> *
            <var>quantity</var>, the values can change.
          </p>
        </section>

        <section>
          <h2>Terms and machine-readable values</h2>
          <p>
            A <dfn>machine-readable value</dfn> is information written in a
            format that software can use.
          </p>

          <p>
            Product:
            <data value="SKU-4821">Basil seed packet</data>
          </p>
          <p>
            Published:
            <time datetime="2026-11-18">November 18, 2026</time>
          </p>
          <p>
            Estimated reading time:
            <time datetime="PT20M">20 minutes</time>
          </p>
        </section>
      </article>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **HTML Reference Notes | Garden Journal**. The page shows an introduction to HTML, a code fragment, a two-line HTML sample, a command, a sample response, an expression with variable names, a definition, a product name, a publication date, and an estimated reading time.

The two-line sample keeps its line break. By default, code-related elements commonly use a monospace font. The product name and readable date appear as ordinary text. Their machine-readable values are stored in attributes and are not shown as extra page text.

## Explanation

- The code element identifies a short code fragment. The angle brackets in the example are written as character references so the browser displays them as text.
- The pre element preserves the sample's line break. The code element inside it identifies the preserved text as code. These elements do not run or syntax-highlight the sample.
- The kbd element marks the command the reader types. The samp element marks the program's sample response. The var elements mark values that can change in the expression.
- The abbr element marks the abbreviation. Its title gives the expanded form, and the visible text spells out the full name as well.
- The dfn element marks the term being defined. Its meaning is explained in the same paragraph.
- The data element connects the readable product name with its identifier in the value attribute.
- The time elements contain readable text and valid machine-readable date or duration values in their datetime attributes.

## How to try it

Copy the HTML code block using its copy button, save it as html-reference-notes.html, and open it in a browser. Change the product identifier while keeping the product name readable. Then update the publication date in both the visible text and its datetime value so they continue to describe the same date.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 13 - Code, abbreviations, dates, and machine-readable text](../lessons/13-specialized-text-elements.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [12 - Text semantics: emphasis, importance, and meaning](12-text-semantics.md) | [Lesson](../lessons/13-specialized-text-elements.md) | [Q&A](../qnas/13-specialized-text-elements.md) | [14 - Quotations and citations](14-quotations-and-citations.md) |
