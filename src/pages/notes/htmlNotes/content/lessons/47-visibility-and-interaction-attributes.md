# 47 - Hidden, inert, tabindex, and editable content

HTML has attributes that affect whether content is presented, whether people can interact with it, how keyboard focus moves, and whether text can be edited in the page. These behaviors are related, but the attributes are not interchangeable. Choose the one that matches the state the page needs to communicate.

## The `hidden` attribute

The `hidden` attribute says that an element is not currently relevant to the page's presentation. In its regular state, browsers do not render the element or its descendants. The attribute is Boolean, so its presence matters: `hidden="false"` still means hidden. To show the element, remove the attribute.

```html
<section id="account-panel" hidden>
  <h2>Account details</h2>
  <p>Your account information appears here.</p>
</section>
```

An element with `hidden` is not merely visually transparent. It is hidden from the page's presentations, including assistive technology. Use it for content that is genuinely not currently relevant, such as a screen that becomes relevant after a step is completed. Do not use it just to hide content that is still relevant in another presentation, such as an inactive tab panel.

### `hidden="until-found"`

The `until-found` value hides content while allowing browser find-in-page and fragment navigation to locate it. When a matching target is found, the browser can remove the attribute and reveal the content.

```html
<details>
  <summary>Extra background</summary>
  <p>This content is available through the disclosure control.</p>
</details>

<section id="appendix" hidden="until-found">
  <h2>Appendix</h2>
  <p>Find-in-page can reveal this section when a matching phrase is found.</p>
</section>
```

`hidden="until-found"` has different rendering behavior from regular `hidden`. CSS rules that set `display: none`, `display: contents`, or `display: inline` can prevent the browser from revealing an until-found element through find-in-page. Avoid overriding the rendering behavior of this state unless you know the consequences.

The `hidden` attribute changes presentation. It does not turn off scripts or make controls inside the element inert. A form control in a hidden region can still participate in form behavior. Also, CSS can override the browser's usual hidden styling, so avoid rules that accidentally display elements carrying `hidden`.

## The `inert` attribute

The Boolean `inert` attribute makes an element and its flat-tree descendants inactive for user interaction. They cannot normally receive focus or pointer interaction, text selection is unavailable, and the content is not exposed in the accessibility tree. Editable content inside an inert subtree also behaves as non-editable.

```html
<div class="loading-state">
  <p>Loading the report...</p>
</div>

<section inert aria-labelledby="report-title">
  <h2 id="report-title">Monthly report</h2>
  <button type="button">Export report</button>
  <p>The report controls are temporarily unavailable.</p>
</section>
```

`inert` does not itself hide or visually dim the content. Provide an appropriate visible indication of the inactive state, and keep the explanation outside the inert subtree so it remains available. For one disabled form control, use the control's `disabled` attribute where appropriate. Use `inert` when a whole section must become inactive.

A modal dialog opened with `showModal()` makes the rest of its document inert while the dialog is active. This is a built-in modal behavior. A dialog can still be explicitly made inert by putting `inert` on the dialog itself.

## Keyboard focus and `tabindex`

Many native interactive elements, such as links with `href`, buttons, and form controls, already participate in keyboard focus navigation. Use the correct HTML element first. The `tabindex` attribute is for controlling focusability of other elements or adjusting an element's sequential keyboard navigation behavior.

| Value | General behavior |
| --- | --- |
| Omitted | The browser follows the element's normal behavior and platform conventions. |
| `0` | Requests that the element can be focused and included in sequential keyboard navigation at its position in the document. |
| Negative integer, often `-1` | Requests that the element can be focused programmatically but omitted from sequential Tab navigation. |
| Positive integer | Adds a custom order that can put focus out of the document's natural sequence. Avoid it. |

For example, a page may move focus to a results heading after an update. `tabindex="-1"` allows script to focus the heading without adding it to the normal Tab sequence.

```html
<h2 id="results-title" tabindex="-1">Search results</h2>
```

```js
document.querySelector("#results-title").focus();
```

A `tabindex` value does not disable an element. Use `disabled` for a form control that should be unavailable, or `inert` for an inactive subtree. Do not add positive `tabindex` values to reorder a page. Keep the source order logical so keyboard users can follow it naturally.

## Making content editable

`contenteditable` makes an element's text editable by the user. It is an enumerated attribute, not a Boolean attribute. Its common values are `true`, `false`, and `plaintext-only`. An empty value means editable, while a missing or invalid value inherits the editable state of the parent.

```html
<section aria-labelledby="draft-heading">
  <h2 id="draft-heading">Draft message</h2>
  <p contenteditable="true">
    Edit this text directly in the page.
  </p>
</section>
```

`contenteditable="true"` allows rich text editing behavior, including preserving formatting when formatted text is pasted. `contenteditable="plaintext-only"` allows editing text while removing formatting from pasted content. `contenteditable="false"` makes that element non-editable, even when it is inside an editable parent.

```html
<div contenteditable="true">
  You can edit this paragraph.
  <p contenteditable="false">This note is not editable.</p>
  <p contenteditable="plaintext-only">This area accepts plain text.</p>
</div>
```

Editable regions are not form controls and do not automatically submit their content with a form. If an application needs to save the edited text, it must provide a deliberate way to collect and submit or store it. For a simple form field, prefer `<input>` or `<textarea>` because they have native form behavior, labels, and validation support.

Nested editable regions are not added to the sequential keyboard navigation order by default. If a nested editing region needs to be reached with Tab, give it `tabindex="0"` and make sure the nested editing experience is understandable.

## Choose the right attribute

| Need | Appropriate choice |
| --- | --- |
| Content is not relevant in the current page state | `hidden` |
| Content should remain findable and be revealed by find-in-page | `hidden="until-found"`, with its rendering constraints in mind |
| A whole region must be temporarily inactive | `inert` |
| One form control should be unavailable | `disabled` on that control |
| A custom element should be included in normal keyboard navigation | `tabindex="0"`, only when needed |
| Script should focus a target without adding it to normal Tab order | `tabindex="-1"` |
| The user should edit text in place | `contenteditable`, when a form control is not a better fit |

## Common mistakes

- Writing `hidden="false"` and expecting the element to appear. The attribute's presence still puts it in the hidden state.
- Using `hidden` for inactive tab panels that should remain available as part of the interface.
- Assuming `hidden` also disables scripts and controls inside the region.
- Assuming `inert` visually hides or dims an element. It blocks interaction and accessibility exposure, but does not provide a visual treatment.
- Using `inert` for a single form control when `disabled` is the more direct choice.
- Using positive `tabindex` values to force an unnatural keyboard order.
- Treating `contenteditable` as a Boolean attribute. The values `true`, `false`, and `plaintext-only` have distinct behavior.
- Expecting a `contenteditable` region to submit data like a `<textarea>`.

## Try it yourself

1. Add and remove `hidden` from a section. Check whether its controls remain part of form behavior while it is hidden.
2. Add `inert` to a section containing a link, a button, and an editable paragraph. Try to focus or interact with each item, and add a visible notice outside the inert section.
3. Give a heading `tabindex="-1"`, then focus it from a script. Remove the attribute and compare the result when pressing Tab.
4. Create two editing regions, one with `contenteditable="true"` and one with `contenteditable="plaintext-only"`. Paste formatted text into both and compare.
5. Put a `contenteditable="false"` paragraph inside an editable container and verify that the paragraph itself cannot be edited.

## Key points

- `hidden` removes currently irrelevant content from presentation. It does not disable its controls or scripts.
- `hidden="until-found"` allows browser find-in-page and fragment navigation to reveal matching content, subject to rendering constraints.
- `inert` makes an element's subtree unavailable for interaction and accessibility exposure, but does not visually hide it.
- Use native controls and natural document order before reaching for `tabindex`.
- Prefer `tabindex="0"` or `tabindex="-1"` for specific focus needs. Avoid positive values.
- `contenteditable` is enumerated, can inherit from a parent, and does not provide form submission by itself.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [46 - Template elements](46-template-element.md) | [Q&A](../qnas/47-visibility-and-interaction-attributes.md) | [Example](../examples/47-visibility-and-interaction-attributes.md) | [48 - Favicons and document icons](48-favicons-and-icons.md) |
