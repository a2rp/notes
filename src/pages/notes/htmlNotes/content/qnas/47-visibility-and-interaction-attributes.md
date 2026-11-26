# 47 - Hidden, inert, tabindex, and editable content: Questions and Answers

Use these questions to review [Chapter 47 - Hidden, inert, tabindex, and editable content](../lessons/47-visibility-and-interaction-attributes.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does the regular `hidden` state mean?

A. The element is transparent but still presented to assistive technology

B. The element is not currently presented to the user

C. The element is disabled and omitted from form submission

D. The element can only be seen by keyboard users

**Answer: B.** Regular `hidden` removes currently irrelevant content from presentation. It does not mean the same thing as `disabled` or `inert`.

### 2. What is a purpose of `hidden="until-found"`?

A. Keep content available to find-in-page and reveal it when a matching target is found

B. Make content permanently inaccessible to scripts

C. Disable every control in the section

D. Add the content to the browser's bookmark list

**Answer: A.** The until-found state allows find-in-page and fragment navigation to locate the content and reveal it.

### 3. What does adding `inert` to a section generally do?

A. It hides the section visually but leaves all descendants interactive

B. It makes the section and descendants inactive for interaction and accessibility exposure

C. It submits all controls in the section

D. It moves all links in the section to the end of the Tab order

**Answer: B.** Inert descendants cannot normally be focused or interacted with and are not exposed in the accessibility tree. The attribute does not itself visually hide the section.

### 4. Which attribute is usually the right choice to disable one form control?

A. `hidden`

B. `inert`

C. `disabled`

D. `contenteditable="false"`

**Answer: C.** Use `disabled` on an individual form control when it should be unavailable. `inert` is intended for a whole inactive region.

### 5. What does `tabindex="0"` generally request?

A. The element is removed from keyboard navigation

B. The element is included in sequential keyboard navigation at its document position

C. The element is always focused when the page loads

D. The element is disabled

**Answer: B.** A zero value requests focusability and inclusion in normal sequential keyboard navigation.

### 6. What is a typical use for `tabindex="-1"`?

A. To give a target focus through script without adding it to the normal Tab sequence

B. To make the browser focus the element before every other element

C. To hide the element from screen readers

D. To make the element submit a form

**Answer: A.** A negative value such as `-1` is useful for programmatically focusing a heading or result message without placing it in the normal Tab order.

### 7. Why should positive `tabindex` values generally be avoided?

A. They disable the element's text

B. They can create a keyboard focus order that differs from the document's logical order

C. They only work on images

D. They prevent programmatic focus

**Answer: B.** A custom positive order is difficult to maintain and can make keyboard navigation confusing. Prefer logical source order and values `0` or `-1` for specific needs.

### 8. What kind of attribute is `contenteditable`?

A. A Boolean attribute where any presence means true

B. An enumerated attribute with values such as `true`, `false`, and `plaintext-only`

C. A URL attribute

D. A form submission attribute

**Answer: B.** `contenteditable` has several states and inherits from its parent when missing or invalid. An empty value means editable, so its presence alone does not describe all its behavior.

## True or false

### 1. `hidden="false"` makes an element visible.

**Answer: False.** `hidden` is an enumerated attribute, but the value `false` is not a keyword for showing the element. The attribute should be removed to show it.

### 2. Controls inside a regular `hidden` region are automatically disabled.

**Answer: False.** Hidden changes presentation. Controls and scripts inside can remain active. Use `disabled` or `inert` when interaction needs to be prevented.

### 3. `inert` automatically applies a dimmed visual style to its content.

**Answer: False.** The attribute affects interaction and accessibility exposure, but it does not supply visual styling. Authors should make the inactive state clear in the interface.

### 4. The `disabled` attribute is a better fit than `inert` for a single input that cannot currently be used.

**Answer: True.** `disabled` expresses the state of an individual form control. `inert` is more suitable for an inactive subtree.

### 5. `tabindex="-1"` removes an element from normal sequential Tab navigation but can still allow script to focus it.

**Answer: True.** This is a common way to make a destination focusable by script without adding it to the normal keyboard sequence.

### 6. A positive `tabindex` value is recommended to fix a page whose source order is confusing.

**Answer: False.** Fix the document's source order. Positive values can make keyboard navigation difficult to predict.

### 7. `contenteditable="plaintext-only"` removes formatting when formatted text is pasted into the editable area.

**Answer: True.** It allows text editing while stripping pasted formatting.

### 8. Text in a `contenteditable` region is automatically submitted with a form in the same way as a `<textarea>`.

**Answer: False.** An editable region is not a form control. An application needs to collect its content and deliberately submit or store it.

## Short-answer questions

### 1. How do you show an element that currently has the regular `hidden` attribute?

**Answer:** Remove the `hidden` attribute. Because it is a Boolean attribute, changing its text value to `false` does not show the element.

### 2. How is `hidden="until-found"` different from regular `hidden`?

**Answer:** Its content can be located by find-in-page and fragment navigation. When a matching target is reached, the browser can remove the attribute and reveal the content.

### 3. Does `inert` hide a section visually? What should the author do?

**Answer:** No. It blocks interaction and removes the subtree from accessibility exposure, but it does not visually hide or dim the content. Provide a visible indication of the inactive state, and keep any needed explanation outside the inert subtree.

### 4. When should `disabled` be used instead of `inert`?

**Answer:** Use `disabled` when an individual form control is unavailable. Use `inert` when an entire region and its descendants should be inactive.

### 5. What do `tabindex="0"` and `tabindex="-1"` generally request?

**Answer:** `0` requests inclusion in normal sequential keyboard navigation at the element's document position. `-1` requests that the element be focusable without being in that normal sequence, which is useful for programmatic focus.

### 6. Why is a positive `tabindex` value risky?

**Answer:** It can impose an order that conflicts with the logical source order. This makes the focus sequence hard to predict and maintain.

### 7. What are common values for `contenteditable`, and what does `plaintext-only` do?

**Answer:** Common values are `true`, `false`, and `plaintext-only`. The last enables text editing but removes formatting from pasted text.

### 8. Why might a developer choose `<textarea>` instead of `contenteditable` for a simple form field?

**Answer:** A `<textarea>` is a native form control with built-in form submission, label association, and validation behavior. Editable content does not automatically become submitted form data.

## Practical questions

### 1. This element remains hidden. Explain why and show how to make it visible.

```html
<p hidden="false">The update is complete.</p>
```

**Answer:** The presence of `hidden` keeps the element in the hidden state. Remove the attribute:

```html
<p>The update is complete.</p>
```

### 2. A loading message should be visible while an entire report section is temporarily unavailable. Where should `inert` go, and where should the loading message go?

**Answer:** Put `inert` on the report section, and keep the loading message outside it so the message remains perceivable and available.

```html
<p role="status">Loading the report...</p>
<section inert aria-labelledby="report-heading">
  <h2 id="report-heading">Report</h2>
  <button type="button">Export</button>
</section>
```

The inactive state also needs an appropriate visual treatment. `inert` itself does not dim the section.

### 3. A search page should move keyboard focus to its results heading after updating results, but the heading should not be in the usual Tab sequence. Write the HTML and JavaScript.

**Answer:** Give the heading `tabindex="-1"` and focus it after updating the results.

```html
<h2 id="results-heading" tabindex="-1">Search results</h2>
```

```js
document.querySelector("#results-heading").focus();
```

The negative value permits programmatic focus without adding the heading to the regular sequential Tab order.

### 4. A developer adds `tabindex="5"`, `tabindex="1"`, and `tabindex="0"` to several unrelated page elements to arrange the focus sequence. What should they do instead?

**Answer:** Remove the positive values and arrange the elements in a logical document order. Use native interactive elements and add `tabindex="0"` or `tabindex="-1"` only for a specific focus need.

### 5. Make this region editable as plain text and prevent its nested note from being edited.

```html
<div>
  <p>Write a draft here.</p>
  <p>Do not edit this instruction.</p>
</div>
```

**Answer:**

```html
<div contenteditable="plaintext-only">
  <p>Write a draft here.</p>
  <p contenteditable="false">Do not edit this instruction.</p>
</div>
```

The parent is editable as plain text. The second paragraph explicitly opts out of the parent's inherited editable state.

### 6. A developer expects this editable region to be included in a form submission. What is missing?

```html
<form action="/save" method="post">
  <p contenteditable="true">Draft message</p>
  <button type="submit">Save</button>
</form>
```

**Answer:** The editable paragraph is not a form control and has no submitted value. Use a `<textarea name="message">` for a simple field, or add application logic that copies the edited content into a named form control before submission.

### 7. Which state should be used for each situation: a section not relevant on the current screen, one temporarily inactive subtree, and a single unavailable button?

**Answer:** Use `hidden` for the currently irrelevant section, `inert` for the temporarily inactive subtree, and `disabled` on the unavailable button.

```html
<section hidden>Content for a later step</section>
<section inert>Inactive region and descendants</section>
<button type="button" disabled>Unavailable action</button>
```

These states have different presentation and interaction effects, so choose each based on the intended behavior.

### 8. Two editable regions are nested, and the inner one should be reachable with Tab. What should be added to the inner region?

**Answer:** Add `tabindex="0"` to the inner region if it needs its own stop in sequential keyboard navigation.

```html
<div contenteditable="true">
  <p>Outer editable area</p>
  <p contenteditable="true" tabindex="0">Nested editable area</p>
</div>
```

Nested editable regions are not added to the Tab sequence by default. Confirm that this nested editing interaction is clear and useful for users.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [46 - Template elements](46-template-element.md) | [Lesson](../lessons/47-visibility-and-interaction-attributes.md) | [Example](../examples/47-visibility-and-interaction-attributes.md) | [48 - Favicons and document icons](48-favicons-and-icons.md) |