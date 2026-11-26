# 55 - HTML quick reference and glossary

Use this chapter to look up common HTML patterns and terms. It is a summary of the topics in this guide, not a replacement for the full lessons or the HTML Standard.

## Basic document

Start an HTML page with a doctype, a language, document metadata, a title, and a body:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page title</title>
  </head>
  <body>
    <header>
      <h1>Page heading</h1>
    </header>

    <main>
      <p>Page content.</p>
    </main>
  </body>
</html>
~~~

Set the language to match the main language of the page. Change the title and content to describe the actual document.

## Syntax at a glance

| Pattern | What it means |
| --- | --- |
| `<p>Text</p>` | A paragraph element with a start tag, content, and end tag |
| `<a href="/about">About</a>` | An anchor element with an attribute and quoted value |
| `<img src="photo.jpg" alt="A red bicycle">` | An image element, which is a void element |
| `<!-- A note for editors -->` | An HTML comment, not displayed as page content |
| `&amp;` and `&lt;` | Character references for an ampersand and a less-than sign |

An element is the complete structure. A tag is the markup that starts or ends an element. Attributes provide additional information. Boolean attributes are enabled by being present; writing a value such as `required="false"` does not turn one off.

Void elements have no content or end tag. Common examples include `img`, `input`, `meta`, `br`, `hr`, `link`, `source`, and `wbr`.

## Text and content elements

| Purpose | Common elements |
| --- | --- |
| Page or section heading | `h1` through `h6` |
| Paragraph | `p` |
| Important text | `strong` |
| Emphasized text | `em` |
| Abbreviation | `abbr` |
| Inline code | `code` |
| Keyboard input | `kbd` |
| Program output | `samp` |
| Variable name | `var` |
| Date or time | `time` |
| Short quotation | `q` |
| Block quotation | `blockquote` |
| Citation title | `cite` |
| Figure with a caption | `figure` and `figcaption` |
| Insertion or deletion | `ins` and `del` |
| Content no longer accurate or relevant | `s` |

Choose an element for the meaning of the text. Do not use a heading just to make text look larger or a semantic element just to get its default appearance.

## Page structure

| Element | Typical purpose |
| --- | --- |
| `header` | Introductory content for a page or section |
| `nav` | A major group of navigation links |
| `main` | The main content of the page |
| `section` | A thematic group of content, usually with a heading |
| `article` | A self-contained composition that can stand on its own |
| `aside` | Related or complementary content |
| `footer` | Footer information for a page or section |
| `address` | Contact information for a person or organization |
| `div` | A generic container when no more meaningful element fits |
| `span` | A generic inline container when no more meaningful element fits |

A document generally has one main element. A heading should describe the content that follows it. Use sectioning elements for their meaning, not as a styling shortcut.

## Links and navigation

~~~html
<a href="https://example.org/guide">Read the HTML guide</a>

<a href="mailto:hello@example.org">Email the team</a>

<a href="#contact">Go to contact information</a>

<section id="contact">
  <h2>Contact</h2>
</section>
~~~

Use an anchor with an href for navigation. Use a button for an action on the current page. Make link text describe its destination or purpose. An id value should be unique within the document.

For a link that opens a new browsing context, explain that behavior to visitors. Current HTML gives target="_blank" links noopener behavior by default; an explicit rel="noopener" can make the intent clear.

## Images and media

~~~html
<img src="garden.jpg" alt="Rows of herbs growing in a raised bed">

<figure>
  <img src="seedling.jpg" alt="A small basil seedling">
  <figcaption>A basil seedling, one week after planting.</figcaption>
</figure>

<audio controls src="birdsong.mp3">
  Your browser cannot play this audio file.
</audio>

<video controls width="640" poster="garden-video-poster.jpg">
  <source src="garden-tour.mp4" type="video/mp4">
  <track
    kind="captions"
    src="garden-tour-en.vtt"
    srclang="en"
    label="English">
  Your browser cannot play this video.
</video>
~~~

Write alt text that serves the image's purpose. Use an empty alt value when an image is purely decorative. Use captions for visible figure descriptions. Provide captions for prerecorded video when needed, and provide text alternatives for media content.

An iframe embeds another document. Give it a descriptive title, limit its capabilities when appropriate, and provide a normal link to the embedded content when useful.

## Lists and tables

Use an unordered list when item order does not matter:

~~~html
<ul>
  <li>Soil</li>
  <li>Seeds</li>
</ul>
~~~

Use an ordered list when sequence matters:

~~~html
<ol>
  <li>Fill the pot with soil.</li>
  <li>Plant the seed.</li>
</ol>
~~~

Use a description list for terms and their descriptions with `dl`, `dt`, and `dd`.

Use a table for data arranged in rows and columns, not for page layout:

~~~html
<table>
  <caption>Workshop schedule</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Activity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>9:00 a.m.</td>
      <td>Introductions</td>
    </tr>
  </tbody>
</table>
~~~

Use `th` for header cells and describe their relationship to rows or columns with `scope` where appropriate.

## Forms

| Element or attribute | Purpose |
| --- | --- |
| `form` | Groups controls that can be submitted |
| `label` | Names a form control |
| `input` | Provides a single-line control |
| `textarea` | Provides a multi-line text control |
| `select` and `option` | Create a selection control and its choices |
| `button` | Provides a button |
| `fieldset` and `legend` | Group related controls and name the group |
| `name` | Supplies a control's key for form submission |
| `required` | Requires an applicable control to have a value |
| `type` | Selects an input or button behavior |
| `action` and `method` | Specify where and how a form is submitted |

Common input types include `text`, `email`, `password`, `search`, `tel`, `url`, `number`, `date`, `checkbox`, `radio`, `file`, and `submit`.

~~~html
<form action="/contact" method="post">
  <p>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" required>
  </p>
  <button type="submit">Send message</button>
</form>
~~~

Give each control a label. The name attribute identifies the value when the form is submitted. HTML validation helps catch some invalid or missing values, but the receiving application must validate submitted data. A form needs a real server or service at its action URL to process submissions.

## The document head

| Element or attribute | Purpose |
| --- | --- |
| `title` | Names the document in browser interfaces and other contexts |
| `meta charset="utf-8"` | Declares the document character encoding |
| `meta name="viewport"` | Sets the layout viewport behavior for mobile devices |
| `meta name="description"` | Provides a summary that search engines may use |
| `link rel="icon"` | Links to a document icon |
| `link rel="canonical"` | Indicates a preferred URL for duplicate or similar pages |

Metadata goes in the head. Put visible page content in the body.

## Useful global attributes

Global attributes can be used on many HTML elements:

| Attribute | Common purpose |
| --- | --- |
| `id` | Identifies one element in the document |
| `class` | Groups elements for CSS or scripting |
| `lang` | Identifies the language of an element's content |
| `dir` | Specifies text direction |
| `title` | Provides advisory information in contexts where it is exposed |
| `hidden` | Marks content as not currently relevant for presentation |
| `tabindex` | Controls focus behavior; prefer natural document order |
| `contenteditable` | Makes an element's content editable by the user |
| `data-*` | Stores custom data for scripts |

Use built-in HTML elements and attributes first. Add ARIA only when native HTML does not already express the needed semantics. Do not use a positive tabindex to force an artificial keyboard order.

## Interactive and advanced elements

| Element or attribute | Purpose |
| --- | --- |
| `details` and `summary` | Provide a native disclosure control |
| `dialog` | Represents a dialog box |
| `popover` | Declares an element as popover content |
| `template` | Holds a fragment that is not rendered as ordinary page content |
| `itemscope`, `itemtype`, `itemprop` | Add Microdata items and properties |
| `loading="lazy"` | Requests deferred loading for supported images or iframes |

Use a native control that matches the interaction. For example, details is a disclosure, not a replacement for tabs or menus. Embedded content needs careful permissions and a descriptive title.

## Glossary

| Term | Meaning |
| --- | --- |
| Attribute | Extra information written in an element's start tag |
| Boolean attribute | An attribute enabled by its presence |
| Character reference | Markup such as `&amp;` used to represent a character |
| Content model | The kinds of content an element is allowed to contain |
| DOM | The structured document tree built by the browser from HTML |
| Element | The structure formed by a start tag, content, and usually an end tag |
| Entity | A named character reference, such as `&amp;` |
| Global attribute | An attribute available on many HTML elements |
| Landmark | A region that helps people navigate important parts of a page |
| Semantic HTML | HTML that communicates the role and meaning of content |
| Tag | Markup that starts or ends an element |
| URL | An address that identifies a resource |
| Validation | Checking a document against HTML conformance requirements |
| Void element | An element with no content and no end tag |

## Quick element choices

- Navigation to another page: an anchor with href.
- An action on the current page: a button.
- A group of unordered items: ul with li.
- Steps that must be followed in sequence: ol with li.
- Data arranged in rows and columns: table with header cells.
- A page's main content: main.
- An article that can stand alone: article.
- An abbreviation: abbr.
- A disclosure: details with summary.
- A meaningful image: img with a useful alt value.
- A form field: a control with an associated label.

## Find a full lesson by topic

| Topic | Lesson |
| --- | --- |
| Document basics and syntax | [03 - The basic HTML document](03-basic-html-document.md), [05 - Elements, tags, and attributes](05-elements-tags-and-attributes.md), [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) |
| Text and headings | [11 - Headings and paragraphs](11-headings-and-paragraphs.md), [12 - Text semantics](12-text-semantics.md) |
| Links and URLs | [15 - Links and the anchor element](15-links.md), [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) |
| Lists and images | [18 - Lists](18-lists.md), [19 - Images and alternative text](19-images-and-alt-text.md), [57 - Image maps with map and area](57-image-maps-with-map-and-area.md) |
| Tables and forms | [26 - HTML tables](26-html-tables.md), [28 - Forms](28-forms-overview.md), [30 - Labels and accessible form controls](30-labels-and-form-controls.md) |
| Structure and accessibility | [37 - Semantic HTML](37-semantic-html.md), [40 - Accessibility with native HTML](40-accessibility-with-html.md), [41 - ARIA in HTML](41-aria-in-html.md) |
| Interactions and attributes | [43 - Details and summary](43-details-and-summary.md), [44 - Dialog elements](44-dialog-element.md), [45 - Popover attributes](45-popover-attributes.md), [47 - Visibility and interaction attributes](47-visibility-and-interaction-attributes.md) |
| Metadata and structured data | [49 - Search and social sharing metadata](49-search-and-social-metadata.md), [50 - Microdata and structured information](50-microdata.md), [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) |
| Safety, obsolete markup, and validation | [51 - Safe links and embedded content](51-html-safety.md), [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md), [53 - Validate and debug HTML](53-validation-and-debugging.md) |

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [54 - HTML-only practice pages](54-html-practice-projects.md) | [Q&A](../qnas/55-html-reference-and-glossary.md) | [Example](../examples/55-html-reference-and-glossary.md) | [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) |