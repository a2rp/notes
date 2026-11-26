# 43 - Details and summary: Questions and Answers

Use these questions to review [Chapter 43 - Details and summary](../lessons/43-details-and-summary.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does `<details>` create?

A. A navigation menu

B. A native disclosure widget for showing or hiding additional content

C. A modal dialog

D. A tab interface

**Answer: B.** A disclosure lets a user reveal or hide supporting content. Use another pattern when the task is navigation, tabs, or a dialog.

### 2. What is the purpose of `<summary>` inside `<details>`?

A. It labels the disclosure and can be activated to toggle it

B. It defines the page title

C. It hides the entire disclosure

D. It adds a form label to the disclosure

**Answer: A.** The summary remains available when the details are closed and gives users a clear control for opening or closing the content.

### 3. Where should `<summary>` appear inside `<details>`?

A. As the first child

B. As the last child

C. Inside the `<head>` element

D. Only after a nested `<details>` element

**Answer: A.** The summary belongs as the first child of its details element. It identifies and controls the disclosure.

### 4. What does the `open` attribute do?

A. It makes the disclosure start open

B. It disables the summary

C. It makes the disclosure modal

D. It allows several named details to stay open in one group

**Answer: A.** `open` is a Boolean attribute. Its presence means the details are shown; its absence means they start closed.

### 5. What happens with `<details open="false">`?

A. The disclosure starts closed

B. The disclosure starts open because the Boolean attribute is present

C. The browser ignores the details element

D. The summary becomes disabled

**Answer: B.** Boolean attributes are true when present, regardless of their text value. Remove `open` to start closed.

### 6. How can multiple disclosures be grouped so only one is open at a time?

A. Give them the same non-empty `name` value

B. Give them the same `id`

C. Put them in the same paragraph

D. Add `open` to every member

**Answer: A.** Details elements with the same non-empty `name` value form an exclusive group. Opening one closes another member of that group.

### 7. Which pattern is usually appropriate for a list of optional FAQ answers?

A. A set of `<details>` elements with meaningful `<summary>` labels

B. A set of headings with `hidden` text and no controls

C. A `<dialog>` for each answer

D. A table used only to hide and show text

**Answer: A.** Each question can label a native disclosure containing its answer. Use a clear summary so the topic is understandable while the answer is closed.

### 8. What does the `toggle` event on `<details>` indicate?

A. The page has loaded

B. The disclosure changed between open and closed

C. The user submitted a form

D. A link was followed

**Answer: B.** The event is useful when a script needs to respond to a disclosure state change. The basic disclosure works without listening for it.

### 9. Which statement about keyboard interaction is correct?

A. A native disclosure supports standard browser interaction without a custom clickable `<div>`

B. The author must add `tabindex="1"` to `<summary>`

C. The author must add an `onclick` attribute to `<details>`

D. A disclosure cannot be used without JavaScript

**Answer: A.** The native `<summary>` control can be reached and activated with a keyboard. Rebuilding it with generic elements requires extra interaction code and is unnecessary for a normal disclosure.

### 10. Which interface should not be represented with `<details>`?

A. Optional shipping information

B. A frequently asked question

C. A set of tabs that switches between panels

D. Supporting instructions

**Answer: C.** A tab interface has different semantics and interaction from a disclosure. Choose elements that match the interface pattern.

## True or false

### 1. The summary should be the first child of its `<details>` element.

**Answer: True.** The first summary labels and controls the disclosure.

### 2. The `open` attribute must have the text value `true` to show a disclosure.

**Answer: False.** `open` is Boolean. Its presence makes the disclosure open, including values such as `open="false"`.

### 3. If a details element has no `open` attribute, its additional content starts hidden.

**Answer: True.** The closed state is the default. The summary remains visible so the user can open it.

### 4. Multiple `<details>` elements with the same non-empty `name` value form an exclusive group.

**Answer: True.** Opening one member closes another member of the same group.

### 5. A `<details>` element needs JavaScript to open and close when a user activates its summary.

**Answer: False.** The browser provides the disclosure interaction. JavaScript is needed only for additional behavior.

### 6. Adding `aria-expanded` to every native `<details>` element is necessary to expose its state.

**Answer: False.** Native disclosure semantics already expose the open or closed state. Redundant ARIA could disagree with the actual state.

### 7. Every disclosure in a FAQ should be put in the same named group.

**Answer: False.** Use an exclusive group only when having one answer open at a time helps users. Otherwise, let disclosures open independently.

### 8. The `toggle` event is needed for the basic disclosure to work.

**Answer: False.** It is an optional way for a script to react to a change. The native widget itself works without an event listener.

## Short-answer questions

### 1. What do `<details>` and `<summary>` do together?

**Answer:** `<details>` contains a disclosure's content, and `<summary>` labels and toggles that disclosure. The browser handles the open and closed states.

### 2. Why should a summary label be specific?

**Answer:** The summary remains visible when the answer is closed. A specific label helps users decide whether to open it without guessing what "More" or "Read this" contains.

### 3. How do you make a disclosure start open?

**Answer:** Add the Boolean `open` attribute to `<details>`, for example `<details open>`. Remove the attribute to have it start closed.

### 4. Why does `open="false"` still make a disclosure open?

**Answer:** `open` is a Boolean attribute, so its presence means true. Its textual value does not turn it off. The attribute must be absent for the disclosure to start closed.

### 5. How does the `name` attribute affect a set of `<details>` elements?

**Answer:** Details elements with the same non-empty `name` value form an exclusive group. Opening one closes another open member of the same group.

### 6. When might you avoid grouping disclosures with `name`?

**Answer:** Avoid exclusive grouping when users may want to keep multiple answers open to compare them. In that case, omit the shared `name` so each disclosure can stay open independently.

### 7. When would a page listen for the `toggle` event?

**Answer:** A script may listen when it needs to perform extra work after the disclosure opens or closes, such as recording that the content was viewed. The event is not required for native toggling.

### 8. Name two interface patterns for which `<details>` is not a good substitute.

**Answer:** Do not use it to imitate tabs, navigation menus, or modal dialogs. A disclosure reveals supporting content, so use a pattern and element that match the actual task.

## Practical questions

### 1. Create a disclosure for delivery information with a clear label and one paragraph of content.

**Answer:**

~~~html
<details>
  <summary>When will my order arrive?</summary>
  <p>Orders are usually delivered within three business days.</p>
</details>
~~~

The summary names the answer, and the paragraph is the additional content shown when the disclosure is open.

### 2. Make this disclosure start open.

~~~html
<details>
  <summary>Workshop location</summary>
  <p>The workshop meets in the north greenhouse.</p>
</details>
~~~

**Answer:**

~~~html
<details open>
  <summary>Workshop location</summary>
  <p>The workshop meets in the north greenhouse.</p>
</details>
~~~

The Boolean `open` attribute makes its content visible at the start.

### 3. Make this disclosure start closed. It currently uses `open="false"`.

~~~html
<details open="false">
  <summary>Cancellation policy</summary>
  <p>Cancel at least one day before the workshop.</p>
</details>
~~~

**Answer:**

~~~html
<details>
  <summary>Cancellation policy</summary>
  <p>Cancel at least one day before the workshop.</p>
</details>
~~~

Remove the Boolean attribute entirely. Setting its value to the word `false` does not close it.

### 4. Fix this markup so the summary is in the correct position.

~~~html
<details>
  <p>We deliver to all local addresses.</p>
  <summary>Where do you deliver?</summary>
</details>
~~~

**Answer:**

~~~html
<details>
  <summary>Where do you deliver?</summary>
  <p>We deliver to all local addresses.</p>
</details>
~~~

The summary must come first so it can label and control the disclosure.

### 5. Group these questions so opening one closes the other.

~~~html
<details>
  <summary>When should I plant tomatoes?</summary>
  <p>Plant them after the last expected frost.</p>
</details>

<details>
  <summary>How often should I water them?</summary>
  <p>Water when the soil begins to dry.</p>
</details>
~~~

**Answer:**

~~~html
<details name="tomato-faq">
  <summary>When should I plant tomatoes?</summary>
  <p>Plant them after the last expected frost.</p>
</details>

<details name="tomato-faq">
  <summary>How often should I water them?</summary>
  <p>Water when the soil begins to dry.</p>
</details>
~~~

The matching non-empty `name` values put them in an exclusive group.

### 6. Improve this vague summary so readers know what it reveals.

~~~html
<details>
  <summary>More</summary>
  <p>Our return window is 30 days from the purchase date.</p>
</details>
~~~

**Answer:**

~~~html
<details>
  <summary>What is the return window?</summary>
  <p>Our return window is 30 days from the purchase date.</p>
</details>
~~~

A useful summary describes the hidden information, even when the rest of the disclosure is not visible.

### 7. Create two disclosures that can remain open independently.

**Answer:**

~~~html
<details>
  <summary>Growing herbs</summary>
  <p>Most herbs need a sunny location and well-drained soil.</p>
</details>

<details>
  <summary>Growing lettuce</summary>
  <p>Lettuce often grows well in cooler conditions.</p>
</details>
~~~

Neither element has a shared `name`, so opening one does not automatically close the other.

### 8. Add an event listener to log when the user changes the state of this disclosure.

~~~html
<details id="shipping-details">
  <summary>Shipping information</summary>
  <p>Orders are delivered within three business days.</p>
</details>
~~~

**Answer:**

~~~html
<details id="shipping-details">
  <summary>Shipping information</summary>
  <p>Orders are delivered within three business days.</p>
</details>

<script>
  const shippingDetails = document.querySelector("#shipping-details");

  shippingDetails.addEventListener("toggle", () => {
    console.log(shippingDetails.open ? "Shipping details opened" : "Shipping details closed");
  });
</script>
~~~

The `toggle` event runs after the disclosure state changes. This script adds logging only; the disclosure itself works without it.

### 9. Identify and remove unnecessary state markup from this native disclosure.

~~~html
<details aria-expanded="false">
  <summary>Read the care instructions</summary>
  <p>Water the plant when the top layer of soil feels dry.</p>
</details>
~~~

**Answer:**

~~~html
<details>
  <summary>Read the care instructions</summary>
  <p>Water the plant when the top layer of soil feels dry.</p>
</details>
~~~

The browser already exposes the native disclosure state. A separate `aria-expanded` value could become out of sync with the actual state.

### 10. Decide whether this should be a disclosure or a tab interface. The user needs to switch between one of several panels, with one panel selected at a time.

**Answer:** Use a tab interface pattern, not `<details>`. A disclosure reveals or hides supporting content. Tabs switch the selected panel within a set and have different semantics and keyboard interactions.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [42 - Language, text direction, and international content](42-language-and-text-direction.md) | [Lesson](../lessons/43-details-and-summary.md) | [Example](../examples/43-details-and-summary.md) | [44 - Dialog elements](44-dialog-element.md) |