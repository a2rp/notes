# HTML Keywords and Syntax Terms

## HTML has no reserved keywords

HTML is a markup language, not a programming language with reserved words such as JavaScript's `if` or `return`. HTML uses element names, attribute names, attribute values, declarations, and character references. These names are sometimes informally called HTML keywords.

This file is a practical index. See the [HTML elements reference](elements-reference.md) for element meanings and obsolete elements.

## Core syntax terms

| Term | Meaning |
| --- | --- |
| Doctype declaration | `<!doctype html>` identifies an HTML document and requests standards mode. It is not an element. |
| Element | A document structure or feature, usually made from tags and content. |
| Start tag | Opens an element, for example `<p>`. Attributes can be written here. |
| End tag | Closes an element that requires one, for example `</p>`. |
| Void element | An element with no end tag that cannot contain child content, such as `img`. |
| Attribute | A name and optional value in a start tag, for example `href="contact.html"`. |
| Boolean attribute | Its presence means true. Absence means false. `disabled="false"` still means disabled. |
| Enumerated attribute | Its value must be one of the values allowed for that attribute, such as `contenteditable="true"`. |
| Character reference | Source notation for a character, such as `&amp;` for an ampersand. |
| Comment | A source note such as `<!-- note -->`, not ordinary page content. |
| DOM | The document tree a browser creates from HTML. |
| Semantic HTML | Elements whose names convey content purpose, such as `nav` and `button`. |

## Built-in HTML element names

The following groups cover the built-in element names used in this course. Custom elements and SVG and MathML vocabularies are separate.

### Document and metadata

`html`, `head`, `title`, `base`, `link`, `meta`, `style`, `script`, `noscript`.

### Page structure and headings

`body`, `address`, `article`, `aside`, `footer`, `header`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hgroup`, `main`, `nav`, `search`, `section`.

### Grouping, text, and lists

`blockquote`, `dd`, `div`, `dl`, `dt`, `figcaption`, `figure`, `hr`, `li`, `menu`, `ol`, `p`, `pre`, `ul`, `a`, `abbr`, `b`, `bdi`, `bdo`, `br`, `cite`, `code`, `data`, `del`, `dfn`, `em`, `i`, `ins`, `kbd`, `mark`, `q`, `rp`, `rt`, `ruby`, `s`, `samp`, `small`, `span`, `strong`, `sub`, `sup`, `time`, `u`, `var`, `wbr`.

### Images, media, and embedded content

`area`, `audio`, `canvas`, `embed`, `iframe`, `img`, `map`, `object`, `picture`, `source`, `track`, `video`.

### Tables

`caption`, `col`, `colgroup`, `table`, `tbody`, `td`, `tfoot`, `th`, `thead`, `tr`.

### Forms and controls

`button`, `datalist`, `fieldset`, `form`, `input`, `label`, `legend`, `meter`, `optgroup`, `option`, `output`, `progress`, `select`, `selectedcontent`, `textarea`.

### Interactive and reusable content

`details`, `dialog`, `summary`, `template`, `slot`.

The standard void elements are `area`, `base`, `br`, `col`, `embed`, `hr`, `img`, `input`, `link`, `meta`, `source`, `track`, and `wbr`. SVG `svg` and MathML `math` roots are not HTML elements. Custom element names include a hyphen, such as `user-card`. Do not use obsolete names such as `font`, `center`, or `marquee` in new pages.

## Common global attributes

Global attributes are available on many elements, but their rules still depend on the element and use.

| Attribute | Purpose |
| --- | --- |
| `id` | Identifies one element in a document. Keep each id unique. |
| `class` | Assigns one or more reusable class names. |
| `lang` | Identifies the language of the content. |
| `dir` | Sets text direction, commonly `ltr`, `rtl`, or `auto`. |
| `title` | Supplies advisory information. Essential instructions should be visible in page content. |
| `hidden` | Marks content as not currently presented. |
| `inert` | Makes a subtree unavailable for interaction and focus. |
| `tabindex` | Controls focus participation. Avoid positive values. |
| `contenteditable` | Makes content editable in the browser, but does not save changes by itself. |
| `spellcheck` | Hints whether editable text should be spell-checked. |
| `translate` | Hints whether text should be translated. |
| `style` | Adds inline CSS declarations. |
| `data-*` | Stores custom data but does not create a standard feature by itself. |
| `aria-*` | Adds accessibility semantics when native HTML does not provide the needed semantics. |

Other global attributes support focus, editing, microdata, popovers, and custom elements. See [global attributes](lessons/07-global-attributes.md) and [ARIA in HTML](lessons/41-aria-in-html.md).

## Frequently used element-specific attributes

| Element or use | Common attributes |
| --- | --- |
| Document language | `lang` |
| Metadata | `charset`, `name`, `content`, `http-equiv` |
| Resource links | `href`, `rel`, `type`, `media`, `integrity`, `crossorigin` |
| Script loading | `src`, `defer`, `async`, `type` |
| Anchors and areas | `href`, `target`, `rel`, `download`, `hreflang` |
| Images | `src`, `alt`, `width`, `height`, `loading`, `srcset`, `sizes`, `usemap`, `ismap` |
| Audio and video | `src`, `controls`, `autoplay`, `muted`, `loop`, `poster`, `preload` |
| Forms | `action`, `method`, `enctype`, `name`, `value`, `autocomplete`, `novalidate` |
| Form controls | `type`, `for`, `required`, `disabled`, `readonly`, `checked`, `selected`, `multiple`, `min`, `max`, `step`, `pattern`, `placeholder` |
| Tables | `scope`, `headers`, `colspan`, `rowspan` |
| Embedded pages | `src`, `srcdoc`, `title`, `sandbox`, `allow`, `loading`, `referrerpolicy` |
| Image maps | `usemap`, `name`, `shape`, `coords`, `href`, `alt` |

This is a practical index, not a substitute for element-specific rules. An attribute is valid only where HTML permits it.

## Boolean attributes

A Boolean attribute is true when present and false when absent. These are equivalent:

~~~html
<input required>
<input required="">
<input required="required">
~~~

This does not turn it off:

~~~html
<input required="false">
~~~

The attribute is still present. Remove it to make it false. Common Boolean attributes include `disabled`, `required`, `checked`, `selected`, `multiple`, `readonly`, `autofocus`, `hidden`, `open`, and `controls`. `contenteditable` is not a Boolean attribute.

## Common input type values

The `type` attribute on `<input>` selects a control:

| Type values | Typical use |
| --- | --- |
| `hidden` | Submitted without a visible control. It is not a security boundary. |
| `text`, `search`, `tel`, `url`, `email`, `password` | Text entry. |
| `date`, `month`, `week`, `time`, `datetime-local` | Date and time entry. Browser interfaces can vary. |
| `number`, `range`, `color` | Numeric or color values. |
| `checkbox`, `radio` | Independent choices or a choice from a group. |
| `file` | File selection. |
| `submit`, `image`, `reset`, `button` | Form actions. |

The input type value `datetime` is obsolete. Use `datetime-local` when local date and time entry is intended. See [input types and attributes](lessons/29-input-types-and-attributes.md).

## Common values

- `dir`: `ltr`, `rtl`, or `auto`.
- `target`: `_self` for the current context or `_blank` for a new context.
- `method`: commonly `get` or `post`; dialog forms can use `dialog`.
- `rel`: relationship keywords such as `noopener`, `noreferrer`, and `nofollow`, chosen for the link's purpose.
- Image-map `shape`: `rect`, `circle`, `poly`, or `default`.
- Table header `scope`: commonly `row`, `col`, `rowgroup`, or `colgroup`.
- `aria-hidden="true"` and `aria-expanded="false"` use string values, not HTML Boolean attribute behavior.

An accepted value is specific to its attribute. Do not assume `true` or `false` behaves the same everywhere.

## Character references

| Reference | Character |
| --- | --- |
| `&amp;` | Ampersand |
| `&lt;` | Less-than sign |
| `&gt;` | Greater-than sign |
| `&quot;` | Double quotation mark |
| `&apos;` | Apostrophe |

Use a character reference in source text where needed, such as `Tom &amp; Ana`.

## Related chapters

- [Elements, tags, and attributes](lessons/05-elements-tags-and-attributes.md)
- [Global attributes](lessons/07-global-attributes.md)
- [Character references](lessons/08-comments-and-character-references.md)
- [Input types and attributes](lessons/29-input-types-and-attributes.md)
- [ARIA in HTML](lessons/41-aria-in-html.md)
- [HTML quick reference and glossary](lessons/55-html-reference-and-glossary.md)
- [HTML elements reference](elements-reference.md)
- [HTML summary](html-summary.md)
- [Back to the README](README.md)
