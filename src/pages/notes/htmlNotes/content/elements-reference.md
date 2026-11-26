# HTML Elements Reference

HTML elements give web content structure and meaning. An element is usually written with a start tag, content, and an end tag. Some elements are void elements and do not have an end tag.

This reference groups the standard HTML elements by their common purpose. Element names are not a list of programming-language keywords. Use each element where its meaning fits the content.

## Document and metadata

| Element | Purpose |
| --- | --- |
| &lt;html&gt; | Root element that contains the document. Its lang attribute identifies the page's primary language. |
| &lt;head&gt; | Holds document metadata and resource references. |
| &lt;title&gt; | Names the document, commonly shown in a browser tab or bookmark. |
| &lt;base&gt; | Sets the document base URL for relative URLs, or the default target for links and form submissions. |
| &lt;link&gt; | Connects the document to an external resource, commonly a stylesheet or icon. |
| &lt;meta&gt; | Provides document metadata such as character encoding, viewport settings, and description. |
| &lt;style&gt; | Contains document-specific CSS. |
| &lt;script&gt; | Embeds or references a script, or provides certain data blocks. |
| &lt;noscript&gt; | Provides fallback content for situations where scripts are unavailable or disabled. |

## Page sections and headings

| Element | Purpose |
| --- | --- |
| &lt;body&gt; | Contains the page content. |
| &lt;address&gt; | Provides contact information for the nearest page or article. |
| &lt;article&gt; | Marks a self-contained composition that could stand on its own, such as a post. |
| &lt;aside&gt; | Marks content related to the surrounding content, such as a sidebar. |
| &lt;footer&gt; | Holds footer information for a page or section. |
| &lt;header&gt; | Holds introductory or navigational content for a page or section. |
| &lt;h1&gt; to &lt;h6&gt; | Mark headings from the highest to the lowest heading level. |
| &lt;hgroup&gt; | Groups a heading with related supporting content. |
| &lt;main&gt; | Marks the dominant content of the page. Normally use one visible main element per page. |
| &lt;nav&gt; | Marks a section whose main purpose is navigation. |
| &lt;search&gt; | Groups controls or content used for searching or filtering. |
| &lt;section&gt; | Groups content into a thematic section, usually with a heading. |

## Grouping content

| Element | Purpose |
| --- | --- |
| &lt;blockquote&gt; | Marks a longer quotation from another source. |
| &lt;dd&gt; | Provides a description or value in a description list. |
| &lt;div&gt; | Generic flow container. Use it when no more meaningful element fits. |
| &lt;dl&gt; | Groups terms and their descriptions or other name-value pairs. |
| &lt;dt&gt; | Marks a term or name in a description list. |
| &lt;figcaption&gt; | Provides a caption for a figure. |
| &lt;figure&gt; | Groups self-contained content, such as an image with its caption. |
| &lt;hr&gt; | Marks a thematic break between sections of content. |
| &lt;li&gt; | Marks an item in a list. |
| &lt;menu&gt; | Represents a list of commands or items. |
| &lt;ol&gt; | Marks an ordered list where sequence matters. |
| &lt;p&gt; | Marks a paragraph. |
| &lt;pre&gt; | Preserves whitespace in preformatted text, often used with code. |
| &lt;ul&gt; | Marks an unordered list where sequence does not matter. |

## Text-level semantics

| Element | Purpose |
| --- | --- |
| &lt;a&gt; | Creates a hyperlink when it has an href attribute. |
| &lt;abbr&gt; | Marks an abbreviation or acronym. |
| &lt;b&gt; | Draws attention to text without adding importance or emphasis. |
| &lt;bdi&gt; | Isolates text whose direction may differ from surrounding text. |
| &lt;bdo&gt; | Explicitly sets the text direction for its contents. |
| &lt;br&gt; | Creates a line break within text, such as in an address or poem. |
| &lt;cite&gt; | Marks the title of a creative work. |
| &lt;code&gt; | Marks a fragment of computer code. |
| &lt;data&gt; | Pairs visible text with a machine-readable value. |
| &lt;del&gt; | Marks content that has been removed from a document. |
| &lt;dfn&gt; | Marks the defining instance of a term. |
| &lt;em&gt; | Marks stress emphasis. |
| &lt;i&gt; | Marks text in an alternate voice or mood, or a term that needs distinction. |
| &lt;ins&gt; | Marks content that has been added to a document. |
| &lt;kbd&gt; | Marks user input, such as keyboard input. |
| &lt;mark&gt; | Highlights text relevant to the current context. |
| &lt;q&gt; | Marks a short inline quotation. |
| &lt;rp&gt; | Provides fallback punctuation for ruby annotations in browsers without ruby support. |
| &lt;rt&gt; | Marks pronunciation or annotation text in a ruby annotation. |
| &lt;ruby&gt; | Groups ruby annotation text with the text it annotates. |
| &lt;s&gt; | Marks content that is no longer accurate or relevant. |
| &lt;samp&gt; | Marks sample output from a computer program. |
| &lt;small&gt; | Marks side comments or small print, such as legal notices. |
| &lt;span&gt; | Generic inline container. Use it when no more meaningful element fits. |
| &lt;strong&gt; | Marks strong importance, seriousness, or urgency. |
| &lt;sub&gt; | Marks subscript text. |
| &lt;sup&gt; | Marks superscript text. |
| &lt;time&gt; | Marks a date or time and can provide a machine-readable datetime value. |
| &lt;u&gt; | Marks text with a non-textual annotation, such as a proper-name annotation. |
| &lt;var&gt; | Marks a variable name in a mathematical or programming expression. |
| &lt;wbr&gt; | Marks a possible line-break point in a long word or string. |

## Lists, links, and image maps

| Element | Purpose |
| --- | --- |
| &lt;area&gt; | Defines a region in an image map. With href, it is a hyperlink and requires alt text. |
| &lt;map&gt; | Names a set of image-map regions referenced by an img element's usemap attribute. |

Use area inside map, and connect the map to an image with the img element's usemap attribute.

## Images, media, and embedded content

| Element | Purpose |
| --- | --- |
| &lt;audio&gt; | Embeds audio, optionally with browser playback controls. |
| &lt;canvas&gt; | Provides a bitmap drawing area, usually drawn with a script. |
| &lt;embed&gt; | Embeds an external resource. |
| &lt;iframe&gt; | Embeds another HTML page inside the current page. |
| &lt;img&gt; | Embeds an image. Provide an appropriate alt value. |
| &lt;object&gt; | Embeds an external resource and can contain fallback content. |
| &lt;picture&gt; | Offers alternative image sources, commonly for responsive images or different formats. |
| &lt;source&gt; | Provides a media or image source for picture, audio, or video. |
| &lt;track&gt; | Provides timed text such as captions or subtitles for audio or video. |
| &lt;video&gt; | Embeds video, optionally with browser playback controls. |

## Tables

| Element | Purpose |
| --- | --- |
| &lt;caption&gt; | Gives a table its title or caption. |
| &lt;col&gt; | Represents a table column, usually inside colgroup. |
| &lt;colgroup&gt; | Groups columns in a table. |
| &lt;table&gt; | Represents tabular data arranged in rows and columns. |
| &lt;tbody&gt; | Groups the main rows of a table. |
| &lt;td&gt; | Represents a data cell. |
| &lt;tfoot&gt; | Groups summary or footer rows. |
| &lt;th&gt; | Represents a header cell. Use scope where it helps define which cells it labels. |
| &lt;thead&gt; | Groups header rows. |
| &lt;tr&gt; | Represents a row of table cells. |

## Forms and controls

| Element | Purpose |
| --- | --- |
| &lt;button&gt; | Creates a button control. Choose its type for the intended behavior. |
| &lt;datalist&gt; | Provides suggested options for a text input. |
| &lt;fieldset&gt; | Groups related form controls. |
| &lt;form&gt; | Groups controls that submit data together. |
| &lt;input&gt; | Creates a form control. Its type attribute selects the control type. |
| &lt;label&gt; | Gives a form control a programmatic and visible label. |
| &lt;legend&gt; | Gives a fieldset a caption. |
| &lt;meter&gt; | Shows a measurement within a known range, such as disk usage. |
| &lt;optgroup&gt; | Groups related options in a select control. |
| &lt;option&gt; | Represents a choice in a select or datalist. |
| &lt;output&gt; | Represents the result of a calculation or user action. |
| &lt;progress&gt; | Shows the completion progress of a task. |
| &lt;select&gt; | Creates a control for choosing one or more options. |
| &lt;selectedcontent&gt; | Mirrors the selected option's content inside a customizable select button. Browser support may vary. |
| &lt;textarea&gt; | Creates a multiline text input control. |

## Interactive and reusable content

| Element | Purpose |
| --- | --- |
| &lt;details&gt; | Creates a disclosure widget that can show or hide additional content. |
| &lt;dialog&gt; | Represents a dialog box or other interactive window. |
| &lt;summary&gt; | Provides the visible label for a details disclosure widget. |
| &lt;template&gt; | Holds markup that is not rendered until it is used. |
| &lt;slot&gt; | Marks a placeholder in a web component's shadow tree. |

## Void elements

Void elements cannot contain child content and do not have end tags. The standard HTML void elements are:

~~~text
area
base
br
col
embed
hr
img
input
link
meta
source
track
wbr
~~~

Write a void element without a closing tag, for example:

~~~html
<img src="garden.jpg" alt="Tomato plants growing in a garden">
~~~

A slash before the closing angle bracket is not needed in HTML. Do not add a separate end tag such as &lt;/img&gt;.

## SVG, MathML, and custom elements

SVG and MathML use their own element vocabularies. Their root elements, svg and math, can be embedded in an HTML document, but they are not HTML elements.

Web Components can define custom elements. Custom element names are author-defined and include a hyphen, for example:

~~~html
<user-card></user-card>
~~~

Custom elements are not part of the built-in HTML element list above.

## Obsolete elements

Old web pages may contain elements that are obsolete and non-conforming in modern HTML. Do not use these in new pages:

~~~text
acronym, applet, basefont, bgsound, big, blink, center, dir,
font, frame, frameset, isindex, keygen, listing, marquee,
menuitem, multicol, nextid, nobr, noembed, noframes, param,
plaintext, rb, rtc, spacer, strike, tt, xmp
~~~

Use modern semantic HTML, form controls, and CSS instead. Some of these names may still be recognized by browsers for compatibility, but that does not make them suitable for new documents.

## Good habits

- Choose an element for its meaning, not only for its default appearance.
- Use headings in a meaningful outline and place them in the page content.
- Prefer semantic elements such as main, nav, article, and button when their meaning fits.
- Use div and span for generic grouping when no more specific element applies.
- Use alt text that conveys an image's purpose, or an empty alt value when the image is decorative.
- Associate each form control with a label.
- Use table elements for data with row and column relationships, not for page layout.
- Validate unfamiliar or complex markup with an HTML conformance checker.
