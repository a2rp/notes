# Example 55 - HTML quick reference and glossary

## Question

Build a single, HTML-only reference page that a learner can use to review common document structure, elements, attributes, and HTML terms. Include examples that demonstrate the meaning of the markup, not just a list of tag names.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta
      name="description"
      content="A practical quick reference for common HTML elements, attributes, and terms.">
    <title>HTML Quick Reference</title>
  </head>
  <body>
    <header id="top">
      <h1>HTML Quick Reference</h1>
      <p>
        A compact guide to common HTML patterns and the terms used to describe
        them. Use the links below to jump to a topic.
      </p>

      <nav aria-label="Page sections">
        <ul>
          <li><a href="#document">Document basics</a></li>
          <li><a href="#syntax">Syntax and attributes</a></li>
          <li><a href="#text">Text and page structure</a></li>
          <li><a href="#links">Links and images</a></li>
          <li><a href="#lists-tables">Lists and tables</a></li>
          <li><a href="#forms">Forms</a></li>
          <li><a href="#head">Document head</a></li>
          <li><a href="#attributes">Global attributes</a></li>
          <li><a href="#interactive">Interactive elements</a></li>
          <li><a href="#glossary">Glossary</a></li>
          <li><a href="#choices">Choose an element</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <p>
        HTML gives web content structure and meaning. This page is a quick
        reminder; follow the linked lesson for detailed explanations.
      </p>

      <section id="document">
        <h2>1. Basic document</h2>
        <p>
          A normal HTML document has a doctype, a root html element, document
          metadata in head, and visible content in body.
        </p>

        <pre><code>&lt;!doctype html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;title&gt;Page title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;main&gt;
      &lt;h1&gt;Page heading&lt;/h1&gt;
      &lt;p&gt;Page content.&lt;/p&gt;
    &lt;/main&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

        <ul>
          <li>The doctype asks browsers to use standards mode.</li>
          <li>The lang value identifies the main language of the page.</li>
          <li>The title names the document in browser interfaces.</li>
          <li>The main element contains the page's primary content.</li>
        </ul>
      </section>

      <section id="syntax">
        <h2>2. Syntax and attributes</h2>
        <p>
          An element is a complete piece of document structure. A tag is the
          markup that opens or closes an element. Attributes add information
          to an element.
        </p>

        <pre><code>&lt;p&gt;A paragraph.&lt;/p&gt;

&lt;a href="/about"&gt;About this site&lt;/a&gt;

&lt;img src="garden.jpg" alt="Rows of herbs in a garden bed"&gt;

&lt;!-- A comment for people editing the source --&gt;

&amp;amp; becomes an ampersand in text.
&amp;lt; becomes a less-than sign in text.</code></pre>

        <ul>
          <li>Most elements have a start tag, content, and an end tag.</li>
          <li>
            Void elements, such as img, input, meta, and br, do not have
            contents or end tags.
          </li>
          <li>Attribute values should normally be written in quotation marks.</li>
          <li>
            A boolean attribute is enabled by being present. For example,
            required="false" still means required is present.
          </li>
          <li>
            Character references such as <code>&amp;amp;</code> and
            <code>&amp;lt;</code> represent characters that have special
            meaning in markup.
          </li>
        </ul>
      </section>

      <section id="text">
        <h2>3. Text and page structure</h2>
        <p>
          Choose elements for the meaning and role of the content. Their default
          appearance is not the reason to choose them.
        </p>

        <table>
          <caption>Common text elements</caption>
          <thead>
            <tr>
              <th scope="col">Purpose</th>
              <th scope="col">Element</th>
              <th scope="col">Example content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Heading</td>
              <td><code>h1</code> through <code>h6</code></td>
              <td>A section title</td>
            </tr>
            <tr>
              <td>Paragraph</td>
              <td><code>p</code></td>
              <td>A group of related sentences</td>
            </tr>
            <tr>
              <td>Strong importance</td>
              <td><code>strong</code></td>
              <td>A safety warning</td>
            </tr>
            <tr>
              <td>Emphasis</td>
              <td><code>em</code></td>
              <td>A word that changes the sentence emphasis</td>
            </tr>
            <tr>
              <td>Inline code</td>
              <td><code>code</code></td>
              <td>A tag name such as <code>main</code></td>
            </tr>
            <tr>
              <td>Date or time</td>
              <td><code>time</code></td>
              <td>A date with a machine-readable value</td>
            </tr>
            <tr>
              <td>Abbreviation</td>
              <td><code>abbr</code></td>
              <td>An abbreviation with an optional expansion</td>
            </tr>
            <tr>
              <td>Quotation</td>
              <td><code>q</code> or <code>blockquote</code></td>
              <td>Short or longer quoted material</td>
            </tr>
          </tbody>
        </table>

        <h3>Common structural elements</h3>
        <dl>
          <dt><code>header</code></dt>
          <dd>Introductory content for a page or section.</dd>
          <dt><code>nav</code></dt>
          <dd>A major group of navigation links.</dd>
          <dt><code>main</code></dt>
          <dd>The primary content of the document.</dd>
          <dt><code>section</code></dt>
          <dd>A thematic group of content, usually with a heading.</dd>
          <dt><code>article</code></dt>
          <dd>A self-contained composition that can stand on its own.</dd>
          <dt><code>aside</code></dt>
          <dd>Related or complementary content.</dd>
          <dt><code>footer</code></dt>
          <dd>Footer information for a page or section.</dd>
          <dt><code>div</code> and <code>span</code></dt>
          <dd>
            Generic containers for cases where no more meaningful element
            fits.
          </dd>
        </dl>
      </section>

      <section id="links">
        <h2>4. Links and images</h2>
        <p>
          Use an anchor with href to navigate. Link text should make the
          destination or purpose clear.
        </p>

        <ul>
          <li><a href="#glossary">Jump to the glossary on this page</a></li>
          <li><a href="mailto:hello@example.org">Email the example team</a></li>
          <li><a href="https://example.com/html-standard">Read the HTML Standard</a></li>
        </ul>

        <p>
          An id identifies a target in the current document. Each id value
          should be unique on that page.
        </p>

        <pre><code>&lt;a href="#contact"&gt;Go to contact information&lt;/a&gt;

&lt;section id="contact"&gt;
  &lt;h2&gt;Contact&lt;/h2&gt;
&lt;/section&gt;</code></pre>

        <h3>Images</h3>
        <p>
          The alt text should communicate the image's purpose. Use an empty
          alt value when the image is purely decorative.
        </p>

        <pre><code>&lt;figure&gt;
  &lt;img
    src="images/garden.jpg"
    alt="Rows of herbs growing in a raised garden bed"&gt;
  &lt;figcaption&gt;The herb garden in early summer.&lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>

        <p>
          The image path above is an example. Add an image at that path or
          replace it with a path to an image you have.
        </p>

        <h3>Audio, video, and embedded pages</h3>
        <ul>
          <li>
            Use audio or video with controls when visitors need to operate
            playback.
          </li>
          <li>
            Add captions or other text alternatives when they are needed to
            understand prerecorded media.
          </li>
          <li>
            Give an iframe a descriptive title and only the capabilities it
            needs.
          </li>
          <li>
            Offer a normal link to embedded material when that helps visitors.
          </li>
        </ul>
      </section>

      <section id="lists-tables">
        <h2>5. Lists and tables</h2>

        <h3>Lists</h3>
        <p>
          Use an unordered list when order does not matter and an ordered list
          when the sequence matters.
        </p>

        <pre><code>&lt;ul&gt;
  &lt;li&gt;Notebook&lt;/li&gt;
  &lt;li&gt;Pencil&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
  &lt;li&gt;Open the document.&lt;/li&gt;
  &lt;li&gt;Find the section to update.&lt;/li&gt;
&lt;/ol&gt;</code></pre>

        <p>
          Use a description list with dl, dt, and dd for groups of terms and
          their descriptions.
        </p>

        <h3>Tables</h3>
        <p>
          Tables are for data with row and column relationships. Do not use
          them to position page content.
        </p>

        <table>
          <caption>Sample workshop schedule</caption>
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9:00 a.m.</td>
              <td>Welcome and introductions</td>
            </tr>
            <tr>
              <td>9:30 a.m.</td>
              <td>Prepare the garden beds</td>
            </tr>
          </tbody>
        </table>

        <ul>
          <li><code>caption</code> gives the table a visible title.</li>
          <li><code>th</code> marks a header cell.</li>
          <li><code>scope="col"</code> says a header applies to its column.</li>
          <li><code>td</code> contains an ordinary data cell.</li>
        </ul>
      </section>

      <section id="forms">
        <h2>6. Forms</h2>
        <p>
          Associate every form control with a visible label. The name attribute
          supplies the key used when a form submits its value.
        </p>

        <form action="#form-result" method="get">
          <p>
            <label for="search-query">Search this example page</label>
            <input
              id="search-query"
              name="q"
              type="search"
              required>
          </p>
          <button type="submit">Show submitted value in the address</button>
        </form>

        <p id="form-result">
          This demonstration uses a GET submission to the current page. It
          places the entered value in the address but does not search a
          database or contact a service.
        </p>

        <table>
          <caption>Common form elements</caption>
          <thead>
            <tr>
              <th scope="col">Element</th>
              <th scope="col">Typical role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>form</code></td>
              <td>Groups controls for submission.</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>Names a form control.</td>
            </tr>
            <tr>
              <td><code>input</code></td>
              <td>Creates a single-line or specialized control.</td>
            </tr>
            <tr>
              <td><code>textarea</code></td>
              <td>Creates a multi-line text control.</td>
            </tr>
            <tr>
              <td><code>select</code> and <code>option</code></td>
              <td>Create a selection control and its choices.</td>
            </tr>
            <tr>
              <td><code>fieldset</code> and <code>legend</code></td>
              <td>Group related controls and name the group.</td>
            </tr>
          </tbody>
        </table>

        <p>
          HTML can check some required values and input formats in the browser.
          A real application must also receive and validate submitted data.
        </p>
      </section>

      <section id="head">
        <h2>7. The document head</h2>
        <p>
          The head contains metadata that describes or connects resources for
          the document. Put visible page content in the body.
        </p>

        <table>
          <caption>Common head elements</caption>
          <thead>
            <tr>
              <th scope="col">Markup</th>
              <th scope="col">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>title</code></td>
              <td>Names the document in browser interfaces.</td>
            </tr>
            <tr>
              <td><code>meta charset="utf-8"</code></td>
              <td>Declares the character encoding.</td>
            </tr>
            <tr>
              <td><code>meta name="viewport"</code></td>
              <td>Sets the layout viewport behavior on mobile devices.</td>
            </tr>
            <tr>
              <td><code>meta name="description"</code></td>
              <td>Provides a short page summary for other systems.</td>
            </tr>
            <tr>
              <td><code>link rel="icon"</code></td>
              <td>Links to an icon resource for the document.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="attributes">
        <h2>8. Useful global attributes</h2>
        <p>
          Global attributes are available on many HTML elements. Use them
          according to their meaning and behavior.
        </p>

        <table>
          <caption>Common global attributes</caption>
          <thead>
            <tr>
              <th scope="col">Attribute</th>
              <th scope="col">Common purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>id</code></td>
              <td>Identifies one element in the document.</td>
            </tr>
            <tr>
              <td><code>class</code></td>
              <td>Groups elements, often for CSS or scripting.</td>
            </tr>
            <tr>
              <td><code>lang</code></td>
              <td>Identifies the language of an element's content.</td>
            </tr>
            <tr>
              <td><code>dir</code></td>
              <td>Sets the direction of the element's text.</td>
            </tr>
            <tr>
              <td><code>hidden</code></td>
              <td>Marks content as not currently relevant for presentation.</td>
            </tr>
            <tr>
              <td><code>tabindex</code></td>
              <td>Controls focus behavior. Prefer natural document order.</td>
            </tr>
            <tr>
              <td><code>data-*</code></td>
              <td>Stores custom data for scripts.</td>
            </tr>
            <tr>
              <td><code>contenteditable</code></td>
              <td>Allows the user to edit an element's content.</td>
            </tr>
          </tbody>
        </table>

        <p>
          Prefer native HTML semantics and controls. Add ARIA when native HTML
          does not already express the required meaning or behavior.
        </p>
      </section>

      <section id="interactive">
        <h2>9. Interactive and advanced elements</h2>
        <ul>
          <li>
            <code>details</code> with <code>summary</code> creates a native
            disclosure control.
          </li>
          <li><code>dialog</code> represents a dialog box.</li>
          <li>
            The <code>popover</code> attribute marks an element as popover
            content.
          </li>
          <li>
            <code>template</code> holds content that is not rendered as
            ordinary page content.
          </li>
          <li>
            <code>loading="lazy"</code> requests deferred loading for
            supported images or iframes.
          </li>
        </ul>

        <details>
          <summary>Example disclosure</summary>
          <p>
            This paragraph is hidden until the disclosure is opened. The
            browser provides the basic interaction without JavaScript.
          </p>
        </details>

        <p>
          Choose an element that matches the interaction. A disclosure is not
          automatically a menu or a tab system.
        </p>
      </section>

      <section id="glossary">
        <h2>10. Glossary</h2>
        <dl>
          <dt>Attribute</dt>
          <dd>
            Extra information written in an element's start tag, such as the
            href attribute on a link.
          </dd>

          <dt>Boolean attribute</dt>
          <dd>
            An attribute whose presence enables the setting, such as required.
          </dd>

          <dt>Character reference</dt>
          <dd>
            Text notation such as <code>&amp;amp;</code> that represents a
            character in HTML source.
          </dd>

          <dt>Content model</dt>
          <dd>The rules describing what content an element can contain.</dd>

          <dt>DOM</dt>
          <dd>The structured document tree that a browser builds from a page.</dd>

          <dt>Element</dt>
          <dd>
            A unit of HTML structure, usually made from tags and its content.
          </dd>

          <dt>Global attribute</dt>
          <dd>An attribute that can be used on many HTML elements.</dd>

          <dt>Landmark</dt>
          <dd>A named or well-known page region that helps people navigate.</dd>

          <dt>Semantic HTML</dt>
          <dd>HTML that communicates the role and meaning of the content.</dd>

          <dt>Tag</dt>
          <dd>Markup that begins or ends an element.</dd>

          <dt>URL</dt>
          <dd>An address that identifies a resource.</dd>

          <dt>Validation</dt>
          <dd>Checking markup against HTML conformance requirements.</dd>

          <dt>Void element</dt>
          <dd>An element that cannot contain content and has no end tag.</dd>
        </dl>
      </section>

      <section id="choices">
        <h2>11. Choose an element by purpose</h2>
        <table>
          <caption>Quick element choices</caption>
          <thead>
            <tr>
              <th scope="col">If the content is...</th>
              <th scope="col">Consider using...</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A link to another page or location</td>
              <td>An anchor with an href attribute</td>
            </tr>
            <tr>
              <td>An action or command</td>
              <td>A button</td>
            </tr>
            <tr>
              <td>A group with no required order</td>
              <td>An unordered list with list items</td>
            </tr>
            <tr>
              <td>A sequence of steps</td>
              <td>An ordered list with list items</td>
            </tr>
            <tr>
              <td>Data organized into rows and columns</td>
              <td>A table with header cells</td>
            </tr>
            <tr>
              <td>The primary content of the page</td>
              <td>The main element</td>
            </tr>
            <tr>
              <td>A self-contained composition</td>
              <td>The article element</td>
            </tr>
            <tr>
              <td>An image that conveys information</td>
              <td>An img element with appropriate alt text</td>
            </tr>
            <tr>
              <td>A form field</td>
              <td>A suitable control with an associated label</td>
            </tr>
            <tr>
              <td>A term and its description</td>
              <td>A description list with dt and dd</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <footer>
      <h2>Keep learning</h2>
      <p>
        This page is a quick reference, not a replacement for the full
        explanations in the HTML lessons.
      </p>
      <p>
        <a href="../lessons/55-html-reference-and-glossary.md">
          Read lesson 55 - HTML quick reference and glossary
        </a>
      </p>
      <p><a href="#top">Return to the top of this page</a></p>
    </footer>
  </body>
</html>
~~~

## Expected output

The browser displays a plain reference page with a title, a list of same-page navigation links, explanations, examples, data tables, a glossary, a search field, and an expandable disclosure. Selecting a navigation link jumps to its matching section.

The search form uses a GET request to the current page. Submitting it adds the entered value to the address; it does not search a database. The image shown in the code sample is illustrative and is not part of the page, so no image file is needed to display this reference page.

The page uses browser default presentation because it contains no CSS. The disclosure uses native browser behavior and does not require JavaScript.

## Explanation

- The doctype, html language, head metadata, title, and body form a complete document shell.
- The navigation links point to section IDs. Each destination ID is used once.
- The code samples are inside pre and code elements. Character references keep the sample markup visible as text instead of letting the browser interpret it as page structure.
- The text and structural element references describe the role of each element. A heading or semantic element is chosen for its meaning, not just its default appearance.
- The glossary uses dl for the group, dt for each term, and dd for its description.
- The tables represent real comparisons and reference data. Captions describe each table, and column headers use th with scope.
- The form has an associated visible label and a named search control. It demonstrates browser GET submission only; it is not connected to a search service.
- The image example explains alternative text but is shown as code, so this page does not depend on a separate image file.
- The details and summary elements provide an expandable disclosure using native browser behavior.
- No CSS or JavaScript is included. HTML supplies the structure, meaning, links, and native controls.

## How to try it

1. Copy the complete HTML code block using its copy button and save it as index.html.
2. Open the file in a browser. Use the navigation links to jump between sections.
3. Expand the disclosure and try submitting a word in the search field. Notice that the URL changes, but no search service is contacted.
4. View the page source and compare the complete document with the code samples displayed within the page.
5. Run the saved document through the Nu Html Checker. Review the page for meaning and usability as well as markup errors.

## Related lesson

[Read lesson 55 - HTML quick reference and glossary](../lessons/55-html-reference-and-glossary.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [54 - HTML-only practice pages](54-html-practice-projects.md) | [Lesson](../lessons/55-html-reference-and-glossary.md) | [Q&A](../qnas/55-html-reference-and-glossary.md) | [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) |
