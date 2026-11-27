# 99. Complete questions and answers

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: All code samples](./98-all-code-samples.md) | [Notes index](../README.md) | End of notes |

## 01. [01. HTML document structure and first page](./01-html-document-structure-and-first-page.md)

### Question 1: What does HTML describe in a web document?

**Answer:** HTML gives a document structure and semantic meaning for content such as headings, paragraphs, links, and forms.

### Question 2: Which declaration should appear at the beginning of a modern HTML document?

**Answer:** Start with the <!doctype html> declaration so the browser uses standards mode.

### Question 3: What is the role of the html element?

**Answer:** html is the root element and contains the document head and body.

### Question 4: What belongs inside head?

**Answer:** head contains document metadata and links to resources such as stylesheets and icons.

### Question 5: What belongs inside body?

**Answer:** body contains the content presented as the page.

### Question 6: What does the lang attribute identify?

**Answer:** lang identifies the language of the document text.

### Question 7: Where does the title usually appear to the user?

**Answer:** The title is commonly shown in the browser tab, history, and bookmarks.

### Question 8: Why is indentation helpful even though it does not define nesting?

**Answer:** Indentation makes parent and child relationships easier for people to inspect, while the tags themselves define nesting.

## 02. [02. Elements, attributes, and nesting](./02-elements-attributes-and-nesting.md)

### Question 1: What is the difference between a tag and an element?

**Answer:** A tag is markup such as an opening or closing marker; an element includes the tags and its content.

### Question 2: What makes an HTML element a void element?

**Answer:** A void element cannot contain child content and has no closing tag.

### Question 3: Name three common void elements.

**Answer:** Examples include img, br, and input.

### Question 4: Where are attributes written?

**Answer:** Attributes are written in an elements opening tag.

### Question 5: What information does href give to an anchor?

**Answer:** href gives the destination URL for the anchor link.

### Question 6: What does correct nesting mean?

**Answer:** Correct nesting closes an inner element before closing its parent.

### Question 7: How is a boolean attribute enabled?

**Answer:** A boolean attribute is enabled by being present.

### Question 8: Why does disabled="false" still disable a button?

**Answer:** Boolean attributes are enabled by presence, so the text false does not turn disabled off.

## 03. [03. Text, headings, and lists](./03-text-headings-and-lists.md)

### Question 1: What does an HTML heading describe?

**Answer:** A heading labels a page or a section of content.

### Question 2: How should a heading level be chosen?

**Answer:** Choose the level based on the content outline and its relationship to surrounding sections.

### Question 3: Which element marks a paragraph?

**Answer:** The p element marks a paragraph.

### Question 4: When should strong be used?

**Answer:** Use strong when the words have strong importance.

### Question 5: When should em be used?

**Answer:** Use em when spoken emphasis affects the meaning.

### Question 6: What is the difference between ul and ol?

**Answer:** ul is for items with no meaningful order; ol is for an ordered sequence.

### Question 7: Which element represents an item in ul or ol?

**Answer:** li represents each item in an unordered or ordered list.

### Question 8: What kind of content can a description list represent?

**Answer:** A description list can represent related terms and their descriptions or name and value pairs.

## 04. [04. Links, paths, and navigation](./04-links-paths-and-navigation.md)

### Question 1: Which element creates a hyperlink?

**Answer:** The a element creates a hyperlink when it has an href attribute.

### Question 2: What makes link text useful when scanned outside its paragraph?

**Answer:** Descriptive link text names its destination or action without needing the surrounding sentence.

### Question 3: How is a relative URL resolved?

**Answer:** A relative URL is resolved from the current document URL.

### Question 4: What does a hash fragment in href target?

**Answer:** A hash fragment targets an element whose id matches the fragment.

### Question 5: Why should ids be unique?

**Answer:** Unique ids prevent ambiguous references for links, labels, and scripts.

### Question 6: When is nav appropriate?

**Answer:** Use nav for a major group of navigation links.

### Question 7: When should an anchor be used instead of a button?

**Answer:** Use an anchor for navigation to a destination; use a button for an action.

### Question 8: What should be considered before opening a link in a new tab?

**Answer:** Opening a new tab can surprise users, so do it only when useful and make the behavior clear.

## 05. [05. Images, figures, and responsive sources](./05-images-figures-and-responsive-sources.md)

### Question 1: Which element embeds an image?

**Answer:** The img element embeds an image.

### Question 2: What should alt text communicate?

**Answer:** Alt text should communicate the images purpose or information in its context.

### Question 3: How does alt="" differ from omitting alt?

**Answer:** alt="" tells assistive technology to skip a decorative image; an omitted alt does not clearly make that intent.

### Question 4: What do figure and figcaption group?

**Answer:** figure and figcaption group self-contained content with its caption.

### Question 5: What does srcset provide?

**Answer:** srcset provides candidate image files for different source sizes or pixel densities.

### Question 6: What does sizes tell the browser?

**Answer:** sizes tells the browser how wide the image is expected to appear at viewport conditions.

### Question 7: When is picture useful?

**Answer:** picture is useful when choosing a different crop or file type for different conditions.

### Question 8: Why provide image width and height?

**Answer:** Width and height let the browser reserve the image aspect ratio before it loads.

## 06. [06. Audio, video, and embedded content](./06-audio-video-and-embedded-content.md)

### Question 1: Which element plays audio?

**Answer:** The audio element plays audio files.

### Question 2: What does controls provide?

**Answer:** controls provides browser playback controls such as play, pause, and volume.

### Question 3: How does the browser use multiple source elements?

**Answer:** The browser tries source elements in order until it finds a format it can play.

### Question 4: What does preload="metadata" request?

**Answer:** preload="metadata" requests basic media information without loading the entire file in advance.

### Question 5: What kind of information belongs in captions?

**Answer:** Captions include dialogue and meaningful sound information.

### Question 6: What does the track element add to video?

**Answer:** track provides timed text such as captions for the media.

### Question 7: Why should unexpected audio autoplay be avoided?

**Answer:** Unexpected sound can interrupt users and is difficult to control in some contexts.

### Question 8: Why does an iframe need a title?

**Answer:** A title identifies the embedded documents content to people using assistive technology.

## 07. [07. Tables and accessible data](./07-tables-and-accessible-data.md)

### Question 1: When is a table the right element?

**Answer:** Use a table for data with meaningful relationships arranged in rows and columns.

### Question 2: What does caption describe?

**Answer:** caption names or summarizes the table.

### Question 3: How does th differ from td?

**Answer:** th marks a header cell; td marks an ordinary data cell.

### Question 4: What does scope="col" communicate?

**Answer:** scope="col" communicates that the header applies to a column.

### Question 5: What does scope="row" communicate?

**Answer:** scope="row" communicates that the header applies to a row.

### Question 6: What do thead, tbody, and tfoot group?

**Answer:** thead groups header rows, tbody groups main rows, and tfoot groups summary rows.

### Question 7: When can headers and id associations help?

**Answer:** Explicit headers and id associations help describe relationships in complex tables.

### Question 8: Why should tables not be used for page layout?

**Answer:** Tables for layout misuse data semantics and can make reading order confusing.

## 08. [08. Forms, controls, and labels](./08-forms-controls-and-labels.md)

### Question 1: What does a form element group?

**Answer:** A form groups interactive controls for collecting and submitting related information.

### Question 2: What does the name attribute contribute to submitted data?

**Answer:** name becomes the key associated with that controls submitted value.

### Question 3: How do label for and control id connect?

**Answer:** The label for value must match the control id.

### Question 4: Why is placeholder not a replacement for a label?

**Answer:** Placeholder disappears when text is entered and does not provide a persistent label.

### Question 5: What do fieldset and legend describe?

**Answer:** fieldset groups related controls and legend names the group.

### Question 6: Why do radio controls in one choice group share a name?

**Answer:** A shared name makes radio controls one choice group, where one option can be selected.

### Question 7: Which element is appropriate for longer text input?

**Answer:** Use textarea for longer text input.

### Question 8: Why set type="button" on a non-submit button inside a form?

**Answer:** A button inside a form defaults to submit, so type="button" prevents an unrelated action from submitting it.

## 09. [09. Native form validation and submission](./09-native-form-validation-and-submission.md)

### Question 1: What does required check?

**Answer:** required prevents submission when the control has no value.

### Question 2: What does type="email" check?

**Answer:** type="email" checks that the value has a basic email address format.

### Question 3: Name two other native constraint attributes.

**Answer:** Examples include minlength, maxlength, min, max, step, and pattern.

### Question 4: When is GET useful for a form?

**Answer:** GET is useful for searches and filters whose values can appear in the URL and be bookmarked.

### Question 5: Why should sensitive values not be placed in a GET URL?

**Answer:** Sensitive values in a URL can appear in history, logs, or shared links.

### Question 6: Does POST alone encrypt form data?

**Answer:** No. POST sends data in the request body but HTTPS is still needed to encrypt transport.

### Question 7: Why is server-side validation still necessary?

**Answer:** Requests can be created without the page controls, so the server must verify every submitted value.

### Question 8: When is novalidate appropriate?

**Answer:** Use novalidate only when the page provides its own complete accessible validation flow.

## 10. [10. Semantic page structure and landmarks](./10-semantic-page-structure-and-landmarks.md)

### Question 1: What does semantic HTML communicate?

**Answer:** Semantic HTML communicates the purpose and structure of content to browsers and assistive technology.

### Question 2: What is the main role of main?

**Answer:** main identifies the central content of the document.

### Question 3: When is section useful?

**Answer:** section groups a thematic part of a page, usually with its own heading.

### Question 4: What kind of content can article represent?

**Answer:** article can represent self-contained content such as a post or news item.

### Question 5: What does aside usually contain?

**Answer:** aside usually contains related or supporting content.

### Question 6: When is div appropriate?

**Answer:** Use div as a generic container when no semantic element describes the purpose.

### Question 7: How does a skip link help keyboard users?

**Answer:** A skip link lets keyboard users jump past repeated navigation to main content.

### Question 8: Why label multiple navigation regions?

**Answer:** Distinct labels help users identify which navigation region they are entering.

## 11. [11. Metadata and the document head](./11-metadata-and-the-document-head.md)

### Question 1: What type of information belongs in head?

**Answer:** head contains metadata and resource links that describe or support the document.

### Question 2: What does the charset declaration configure?

**Answer:** The charset declaration tells the browser how text characters are encoded.

### Question 3: Why include viewport metadata?

**Answer:** Viewport metadata helps the page use the device width on mobile screens.

### Question 4: Where is the title commonly shown?

**Answer:** The title commonly appears in browser tabs and browsing history.

### Question 5: What does the meta description summarize?

**Answer:** The meta description provides a short summary of the page for search and sharing contexts.

### Question 6: What is the role of a favicon link?

**Answer:** A favicon link connects an icon used to identify the site in browser interfaces.

### Question 7: What does Open Graph metadata describe?

**Answer:** Open Graph metadata describes a page title, description, image, and URL for link previews on compatible services.

### Question 8: Why should metadata match visible page content?

**Answer:** Matching metadata gives users an accurate description of the page they will open.

## 12. [12. Loading scripts and external resources](./12-loading-scripts-and-external-resources.md)

### Question 1: Which element links an external stylesheet?

**Answer:** The link element in head connects an external stylesheet.

### Question 2: When does a deferred classic script run?

**Answer:** A deferred classic script runs after document parsing completes.

### Question 3: Do deferred classic scripts preserve their document order?

**Answer:** Yes. Deferred classic scripts execute in document order.

### Question 4: How does async script execution differ from defer?

**Answer:** async runs as soon as a script is ready with no ordering guarantee; defer waits until parsing finishes and preserves order.

### Question 5: When is async a suitable choice?

**Answer:** Use async for independent code that does not rely on document parsing order or another script.

### Question 6: What does type="module" enable?

**Answer:** type="module" enables JavaScript module loading with import and export, and module scripts are deferred by default.

### Question 7: Why attach event listeners in JavaScript instead of inline onclick?

**Answer:** Separate event wiring keeps behavior out of markup and is easier to organize and maintain.

### Question 8: What is a useful purpose for noscript?

**Answer:** noscript can explain a script requirement or offer a fallback when scripting is disabled.

## 13. [13. Native interactive elements](./13-native-interactive-elements.md)

### Question 1: Which elements create a native disclosure?

**Answer:** details and summary create a native disclosure.

### Question 2: Does details require JavaScript to open and close?

**Answer:** No. The browser provides its open and close behavior.

### Question 3: What does dialog represent?

**Answer:** dialog represents a dialog box or window.

### Question 4: How does showModal differ from show?

**Answer:** showModal opens a modal dialog in the top layer; show opens it without making it modal.

### Question 5: What happens to the rest of the page while a modal dialog is open?

**Answer:** The rest of the document is made non-interactive while the modal dialog is open.

### Question 6: What does method="dialog" do on a form?

**Answer:** A form with method="dialog" closes its containing dialog when submitted.

### Question 7: Why should a dialog have a heading or accessible name?

**Answer:** A heading or accessible name identifies the dialog purpose to assistive technology.

### Question 8: Which native element should represent an action?

**Answer:** Use button for an action.

## 14. [14. Accessibility and ARIA basics](./14-accessibility-and-aria-basics.md)

### Question 1: Why should semantic HTML be the starting point?

**Answer:** Semantic HTML provides built-in roles and behavior, so it should be the first choice.

### Question 2: How does an anchor differ from a button?

**Answer:** An anchor navigates to a destination; a button performs an action.

### Question 3: What is an accessible name?

**Answer:** An accessible name is the text or label assistive technology uses to identify a control or element.

### Question 4: When can aria-label be useful?

**Answer:** Use aria-label when a visible label is not appropriate but the element still needs a clear name.

### Question 5: What does aria-describedby connect?

**Answer:** aria-describedby connects an element to additional descriptive text, such as help or an error.

### Question 6: How should decorative images provide alt text?

**Answer:** Use alt="" for an image that is purely decorative.

### Question 7: Why should DOM order match the intended reading order?

**Answer:** Matching DOM and reading order keeps keyboard navigation and spoken content understandable.

### Question 8: When should ARIA be added?

**Answer:** Add ARIA when native HTML does not already express the needed name, description, state, or role.

## 15. [15. Global attributes and data attributes](./15-global-and-data-attributes.md)

### Question 1: Which attributes are commonly available on many HTML elements?

**Answer:** Examples include id, class, lang, dir, hidden, title, and tabindex.

### Question 2: What should be true about an id value?

**Answer:** An id should be unique in the document.

### Question 3: What does class commonly group?

**Answer:** class groups elements for shared styling or script selection.

### Question 4: What does hidden do?

**Answer:** hidden indicates that content is not currently relevant and should not be rendered.

### Question 5: How does tabindex="0" differ from tabindex="-1"?

**Answer:** tabindex="0" joins normal keyboard order; tabindex="-1" allows programmatic focus but not normal Tab navigation.

### Question 6: Why should positive tabindex values be avoided?

**Answer:** Positive values create a separate focus order that can conflict with document order.

### Question 7: How does data-note-id appear through dataset?

**Answer:** The attribute data-note-id is exposed as the string property dataset.noteId.

### Question 8: Why should title not replace a visible label?

**Answer:** title is not consistently available and does not replace a persistent visible label or instruction.

## 16. [16. Validation, testing, and release checks](./16-validation-testing-and-release-checks.md)

### Question 1: What can an HTML checker find?

**Answer:** It can find invalid nesting, missing required attributes, duplicate ids, and other conformance issues.

### Question 2: Why can a correct visual appearance hide source markup problems?

**Answer:** Browsers may repair invalid markup before display, so the rendered page can hide mistakes in the source.

### Question 3: Which page sizes should be checked?

**Answer:** Check narrow and wide viewport sizes.

### Question 4: What should be inspected in browser developer tools?

**Answer:** Inspect the document tree, console errors, network requests, and accessibility tree.

### Question 5: Which keyboard behaviors should be verified?

**Answer:** Verify visible focus, tab order, skip links, dialog controls, and keyboard activation.

### Question 6: Why test with a screen reader when possible?

**Answer:** A screen reader can reveal missing names, confusing landmarks, or reading order problems that are not visible.

### Question 7: Which form behaviors should be checked before release?

**Answer:** Test valid and invalid values, labels, error associations, expected submitted data, and server-side checks.

### Question 8: What should the final release checklist confirm?

**Answer:** Confirm valid markup, working assets and controls, keyboard access, accurate metadata, server validation, and the deployed tested version.

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: All code samples](./98-all-code-samples.md) | [Notes index](../README.md) | End of notes |
