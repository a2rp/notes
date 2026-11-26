# 07 - Global attributes

Global attributes are attributes that can be used on many HTML elements. They add information or affect how an element behaves without changing the element's basic meaning. This chapter covers common global attributes and practical rules for using them.

## What you will learn

By the end of this chapter, you should be able to:

- Explain what makes an attribute global.
- Use `id` and `class` to identify and group elements.
- Set language and text direction with `lang` and `dir`.
- Understand the purpose and limits of `title`, `hidden`, and `tabindex`.
- Recognize editing and hint attributes such as `contenteditable` and `spellcheck`.
- Use `data-*` attributes for custom data and avoid treating them as visible content.

## What does global mean?

A global attribute can be written on many different HTML elements. For example, `id` and `class` can label headings, paragraphs, links, images, and sections:

~~~html
<h1 id="page-title" class="page-heading">Garden journal</h1>
<p class="page-intro">Notes from the backyard.</p>
<section id="watering" class="topic">
  <h2>Watering</h2>
</section>
~~~

The attributes add information to the elements. The `h1` is still a heading, the `p` is still a paragraph, and the `section` is still a section.

"Global" does not mean that every global attribute is useful on every element in every situation. Some attributes have specific rules or make sense only for certain content. Use each attribute for its documented purpose.

## Identify one element with `id`

An `id` gives an element a unique identifier within a document:

~~~html
<h2 id="watering">Watering the garden</h2>
~~~

A good id is descriptive and unique. Use letters, digits, hyphens, or underscores to keep ids readable, and do not include spaces:

~~~html
<section id="plant-care">
  <h2>Plant care</h2>
</section>
~~~

Do not assign the same id to multiple elements in one document. Software such as a browser, stylesheet, or script may use an id to refer to one specific element.

An id is not a substitute for an appropriate element. Give a heading an id when it needs an identifier, but keep the heading element because the content is still a heading.

## Group elements with `class`

A `class` assigns one or more class names to an element. Separate multiple class names with spaces:

~~~html
<article class="guide featured">
  <h2>Growing herbs</h2>
  <p>A short guide to a sunny windowsill.</p>
</article>
~~~

This element has two class names: `guide` and `featured`. A class can be used by CSS or JavaScript to find related elements. Class names do not have built-in meaning by themselves, so choose names that describe the group or purpose.

Several elements can share a class:

~~~html
<p class="tip">Water the soil, not the leaves.</p>
<p class="tip">Check the pot drainage.</p>
~~~

Use `id` when one element needs a unique identifier. Use `class` when elements belong to a group or need one or more shared labels.

## Provide language with `lang`

The `lang` attribute identifies the language of text. It is commonly set on the root `html` element:

~~~html
<html lang="en">
~~~

You can set a different language on a section whose text changes language:

~~~html
<p lang="es">Buenos días.</p>
~~~

The value should describe the language actually used. It does not translate text. Language information can help assistive technology choose pronunciation and can help other software process the content.

Use a recognized language tag. Examples include `en` for English, `en-GB` for British English, `hi` for Hindi, and `es` for Spanish.

## Set text direction with `dir`

The `dir` attribute tells the browser the direction in which text should be laid out:

~~~html
<p dir="ltr">This is left-to-right text.</p>
<p dir="rtl">هذا نص يكتب من اليمين إلى اليسار.</p>
<p dir="auto">Direction is selected from the text.</p>
~~~

Common values are:

- `ltr` for left-to-right text.
- `rtl` for right-to-left text.
- `auto` to let the browser determine direction from the text.

Direction is not the same thing as language. For example, `lang` identifies the language, while `dir` identifies its direction. Do not use CSS text alignment as a replacement for the semantic direction attribute.

For an entire document, set direction on `html` when appropriate. Use a more specific `dir` on a passage that runs in a different direction.

## Add advisory information with `title`

A `title` attribute can provide advisory information about an element:

~~~html
<p title="This note was updated today">Check the latest garden notes.</p>
~~~

Some browsers show the value as a tooltip when a pointer rests over the element. This behavior is not equally available to every user, especially people using touch screens or keyboards. Do not put essential instructions only in a `title` value. Put important information in visible page content.

## Hide content with `hidden`

The `hidden` attribute controls whether an element is presented. Its common form, with no value, puts the element in the hidden state:

~~~html
<p hidden>This content is currently hidden.</p>
~~~

When the attribute is present, the browser normally does not render that element. An advanced value, `hidden="until-found"`, keeps content hidden but allows find-in-page or fragment navigation to reveal it. Use the simple form unless you need that behavior. Browser support for this advanced value is not universal, so check support before relying on it. Remove the attribute when the content should be shown:

~~~html
<p>This content is now shown.</p>
~~~

Do not use `hidden` for content that users need to read or operate. If content should be available, leave it visible. The attribute does not delete the content from the HTML source.

## Manage keyboard focus with `tabindex`

The `tabindex` attribute affects whether an element can receive keyboard focus and where it participates in sequential keyboard navigation:

~~~html
<a href="/contact" tabindex="0">Contact</a>
~~~

The most useful values to recognize are:

- `tabindex="0"`: include the element in the normal sequential focus order.
- `tabindex="-1"`: allow the element to be focused programmatically, but do not include it in the normal Tab sequence.
- Positive values: assign a custom order. Avoid positive values because they can make keyboard navigation confusing.

Links and form controls are normally keyboard-focusable without `tabindex`. Do not add it everywhere. Use semantic elements such as links and buttons for interactive actions, and test any custom focus behavior with a keyboard.

## Make content editable with `contenteditable`

The `contenteditable` attribute makes an element's content editable in the browser:

~~~html
<p contenteditable="true">You can edit this text in the page.</p>
~~~

Common values are `true`, `false`, and `plaintext-only`. When an element is editable, its child content generally inherits that editing behavior unless another value changes it.

Editing in the browser does not automatically save changes to the source file or a server. A user can modify what is displayed, but an application needs additional behavior to store those edits.

Unlike a Boolean attribute, `contenteditable` is an enumerated attribute. Write the value that describes the desired state:

~~~html
<p contenteditable="false">This paragraph is not editable.</p>
~~~

## Provide hints with `spellcheck` and `translate`

The `spellcheck` attribute gives the browser a hint about whether text should be checked for spelling:

~~~html
<textarea spellcheck="true"></textarea>
~~~

Spell checking depends on the browser, language tools, and user settings. The attribute is a hint, not a guarantee.

The `translate` attribute can indicate whether an element's text should be translated when a translation tool processes the page:

~~~html
<p translate="no">HTML</p>
~~~

This is a hint for translation tools. It does not prevent every service from changing the text.

## Store custom information with `data-*`

A custom data attribute starts with `data-` and can store a value associated with an element:

~~~html
<button type="button" data-action="save" data-item-id="42">
  Save item
</button>
~~~

The values are available to scripts, but they do not create visible text or built-in behavior by themselves. Use them for application-specific information that belongs with an element. Do not invent a data attribute when HTML already has a meaningful attribute for the information.

## Other global attributes

The HTML Standard defines more global attributes. This quick reference names several you may encounter. Their global availability does not mean every one is useful on every element:

| Attribute | Purpose |
| --- | --- |
| `accesskey` | Suggests a keyboard shortcut. Shortcuts may conflict with browser or assistive technology commands, so use it cautiously. |
| `autocapitalize` and `autocorrect` | Give text-entry controls hints about capitalization and correction. |
| `autofocus` | Requests focus when a page or dialog opens. Automatic focus can disorient users, so use it sparingly. |
| `draggable` | Indicates whether an element can be dragged. It does not define what an application should do after a drop. |
| `enterkeyhint` and `inputmode` | Suggest a label or type of virtual keyboard for text entry. |
| `inert` | Makes an element and its descendants unavailable for interaction while the attribute is active. |
| `headingoffset` | Offsets heading levels for descendants. This is advanced; prefer a correct `h1` to `h6` hierarchy and check support before relying on it. |
| `headingreset` | Stops heading-offset calculations from continuing beyond the element. This is advanced; check support before using it. |
| `is` and `slot` | Support custom elements and web component composition. |
| `itemid`, `itemprop`, `itemref`, `itemscope`, and `itemtype` | Add microdata, which is covered in a later chapter. |
| `nonce` | Carries a server-generated value used by Content Security Policy. Do not invent a nonce for a static example. |
| `popover` | Enables built-in popover behavior, covered in a later chapter. |
| `style` | Contains inline CSS declarations. A separate stylesheet is usually easier to maintain. |
| `writingsuggestions` | Gives the browser a hint about writing suggestions. Support and behavior can vary. |

The `role` and `aria-*` attributes add accessibility semantics and have their own rules. Prefer native HTML elements first. The later accessibility chapters explain when ARIA is appropriate.

Global attributes evolve as HTML evolves. Use this chapter as a practical guide, and check current browser support for unfamiliar attributes.

## A complete example

This example uses several global attributes for different purposes:

~~~html
<article id="herb-guide" class="guide featured" lang="en" dir="ltr">
  <h2 title="A short guide">Growing herbs at home</h2>
  <p class="summary">Start with a sunny window and a suitable pot.</p>
  <p lang="hi" dir="ltr">यह पौधों की देखभाल के बारे में एक छोटा नोट है।</p>
  <p contenteditable="true" spellcheck="true">Draft a reminder here.</p>
  <p hidden>This reminder is not currently shown.</p>
</article>
~~~

The `id` identifies this article, and `class` gives it reusable labels. The summary and editable paragraphs inherit the article's language and direction. The Hindi passage overrides the language and sets its direction explicitly. The editable paragraph can be changed in the browser, but the changes are not saved automatically. The last paragraph is hidden because it has the `hidden` attribute.

## Common mistakes

- **Repeating an id.** Keep each id unique within its document.
- **Using a class when you need one unique identifier.** Use `id` for one element and `class` for reusable groups.
- **Treating class names as built-in HTML behavior.** A class is a label. It has no visual effect unless another technology uses it.
- **Expecting `lang` to translate text.** It identifies the text's language.
- **Confusing language with direction.** Use `lang` to describe the language and `dir` to describe text direction.
- **Putting important instructions only in `title`.** Some users may not be able to access a tooltip.
- **Adding `tabindex` to every element.** Use normal interactive elements and keep keyboard order natural.
- **Expecting `contenteditable` to save changes.** It only allows editing in the current page; saving needs application behavior.
- **Using `hidden` for content that should remain available.** Hidden content is not presented while the attribute is active.
- **Using `data-*` for information already represented by a meaningful HTML attribute.** Prefer the native attribute when one exists.

## Try it yourself

1. Give a main heading the id `page-title`.
2. Give two paragraphs the shared class `tip`.
3. Write a paragraph in Hindi and identify its language with `lang`.
4. Add a right-to-left passage using an appropriate `dir` value.
5. Add a `title` value to a paragraph, then make sure its important message is also visible as text.
6. Make one sentence editable with `contenteditable="true"`. Change it in the browser and observe whether the file itself has been saved.
7. Add `data-item-id="42"` to an element and explain whether this alone displays the number to the reader.
8. Use the keyboard to navigate a page and explain why positive `tabindex` values can cause confusing order.

## Key points

- Global attributes can be used on many HTML elements, subject to each attribute's rules.
- `id` identifies one element in a document; `class` groups elements.
- `lang` identifies language, and `dir` identifies text direction.
- `title` is advisory and should not hold essential information.
- `hidden` controls whether an element is presented; it does not delete the source.
- `tabindex` affects keyboard focus and should be used carefully.
- `contenteditable` enables in-page editing but does not save changes automatically.
- `data-*` stores custom data for scripts and does not add visible content by itself.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [06 - Nesting, void elements, and HTML syntax](06-nesting-and-html-syntax.md) | [Q&A](../qnas/07-global-attributes.md) | [Example](../examples/07-global-attributes.md) | [08 - Comments, character references, and special characters](08-comments-and-character-references.md) |
