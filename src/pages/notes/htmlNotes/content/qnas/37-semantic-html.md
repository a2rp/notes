# 37 - Semantic HTML and page structure: Questions and Answers

Use these questions to review [Chapter 37 - Semantic HTML and page structure](../lessons/37-semantic-html.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What does semantic HTML primarily describe?

A. The colors and spacing of a page

B. The meaning and purpose of content and controls

C. The programming language used by a browser

D. The file size of an HTML document

**Answer: B.** HTML semantics describe what content is or what a control does. CSS is used to control visual presentation such as colors and spacing.

### 2. Which element is the best choice for a paragraph of prose?

A. `<p>`

B. `<span>`

C. `<button>`

D. `<time>`

**Answer: A.** The `<p>` element identifies a paragraph. A `<span>` is generic, a `<button>` is an interactive control, and `<time>` represents a date or time.

### 3. What is the built-in semantic purpose of a `<div>`?

A. It always represents a page section

B. It represents a button

C. It is a generic container without a specific meaning of its own

D. It represents a paragraph

**Answer: C.** Use `<div>` when a generic flow-content container is useful and no more specific element fits. It does not become a heading, section, or button just because it is styled to look like one.

### 4. A heading needs to look smaller. What should you change?

A. Replace it with a `<span>`

B. Keep the semantically correct heading and change its appearance with CSS

C. Remove the heading and use bold text

D. Change the heading to a button

**Answer: B.** The heading level describes the content hierarchy. CSS can change its font size without changing that meaning.

### 5. Which element marks stress emphasis that can affect the meaning of a sentence?

A. `<strong>`

B. `<em>`

C. `<div>`

D. `<b>`

**Answer: B.** `<em>` marks stress emphasis. `<strong>` marks strong importance, seriousness, or urgency.

### 6. Which element should be used to navigate to another page?

A. `<button>`

B. `<a href="/contact">`

C. `<div>`

D. `<strong>`

**Answer: B.** An anchor with a meaningful `href` is a link to a destination. A button is for an action in the current interface.

### 7. A control opens a disclosure on the current page. Which element is the suitable general choice for its action?

A. `<button type="button">`

B. `<a href="#">`

C. `<p>`

D. `<time>`

**Answer: A.** A button is intended for an action. An anchor should have a real navigation destination, not a placeholder URL used to imitate a button.

### 8. Which element can mark a date while providing a machine-readable value?

A. `<date value="2026-11-25">`

B. `<time datetime="2026-11-25">November 25</time>`

C. `<span date="2026-11-25">November 25</span>`

D. `<p datetime="2026-11-25">November 25</p>`

**Answer: B.** The `<time>` element can represent a date or time, and `datetime` can provide its machine-readable form.

### 9. What is a main advantage of using a native `<button>` instead of a styled `<div>` for an action?

A. A button automatically submits every kind of data to any server

B. A button has native button semantics and keyboard behavior

C. A div cannot be styled with CSS

D. A button always opens a dialog

**Answer: B.** A native button gives browsers and assistive technologies a standard control role and built-in interaction behavior. The exact action still needs to be implemented or provided by HTML features.

### 10. Does using semantic elements by itself guarantee that a page is accessible?

A. Yes, semantic elements fix every accessibility issue

B. Yes, if the page has a heading

C. No, the complete content and interaction still need to be implemented accessibly

D. No, semantics are unrelated to accessibility

**Answer: C.** Semantic elements are a useful foundation, but labels, meaningful content, keyboard behavior, names, states, and other implementation details still matter.

## True or false

### 1. CSS can change an element's appearance without changing its HTML meaning.

**Answer: True.** CSS styles an element. Styling a `<div>` to look like a heading does not make it a heading.

### 2. A `<div>` is always the best element for grouping any content.

**Answer: False.** A `<div>` is a useful generic container, but use a more specific element when its meaning matches the content.

### 3. A heading level should be chosen only by comparing its default font size with the design.

**Answer: False.** Heading levels communicate hierarchy. Use CSS to match the design after choosing the correct heading for the content.

### 4. A link and a button have the same purpose because both can be clicked.

**Answer: False.** A link navigates to a destination. A button performs an action in the current interface. Their keyboard and browser behaviors also differ.

### 5. `<strong>` is the semantic equivalent of the CSS instruction to make text bold.

**Answer: False.** `<strong>` marks strong importance. CSS controls bold appearance. Browsers often display strong text in bold by default, but that is a visual convention.

### 6. A suitable native HTML element is usually a better starting point than recreating its role with a generic element and ARIA.

**Answer: True.** Native elements already provide standard semantics, and interactive elements commonly provide familiar keyboard behavior. Custom controls require developers to implement those details.

### 7. Adding an ARIA role automatically gives a generic element all of a native control's keyboard behavior.

**Answer: False.** ARIA describes accessibility information, but does not automatically implement interaction behavior. A custom control still needs correct focus, keyboard support, state, and behavior.

### 8. Semantic HTML guarantees that a page will rank higher in search results.

**Answer: False.** Semantic markup can make document meaning clearer to tools, but no individual element guarantees search ranking. Good content and many other factors matter.

## Short-answer questions

### 1. What does semantic HTML mean?

**Answer:** It means choosing HTML elements according to the meaning or purpose of their content. For example, use `<p>` for a paragraph and `<ul>` with `<li>` for an unordered list.

### 2. What is the difference between HTML meaning and visual presentation?

**Answer:** HTML describes what content is and how it relates to other content. CSS controls how it looks, including color, spacing, and font size. Styling changes appearance without changing the element's semantic meaning.

### 3. When is it appropriate to use `<div>` or `<span>`?

**Answer:** Use them as generic containers when you need grouping, styling, or scripting and no more specific HTML element matches. `<div>` is for generic flow content, while `<span>` is for generic phrasing content.

### 4. Why should a heading not be selected just because its default text size looks right?

**Answer:** A heading contributes to the document's heading structure, which browsers and assistive technologies can expose to users. Choose its level according to the content hierarchy, then use CSS for its visual size.

### 5. Explain the difference between a link and a button.

**Answer:** A link takes the user to a destination, usually specified with `href`. A button performs an action, such as submitting a form or toggling an interface control.

### 6. What is the difference between `<em>` and `<strong>`?

**Answer:** `<em>` marks stress emphasis that can affect a sentence's meaning. `<strong>` marks strong importance, seriousness, or urgency. Their default italic and bold appearance is not the meaning itself.

### 7. Why is a native button usually preferable to a styled `<div>` for an action?

**Answer:** A native button has a standard button role, can receive keyboard focus, and supports familiar keyboard activation. A styled `<div>` does not acquire those semantics or behaviors just from its appearance.

### 8. Does semantic HTML by itself make every interface accessible? Why or why not?

**Answer:** No. Semantics help communicate structure and purpose, but the full interface still needs clear labels, useful content, keyboard support, correct states, and other accessible behavior.

## Practical questions

### 1. Replace generic containers with elements that match the content.

~~~html
<div>Weekend menu</div>
<div>Soup and fresh bread are available today.</div>
<div>See all dishes</div>
~~~

**Answer:**

~~~html
<h2>Weekend menu</h2>
<p>Soup and fresh bread are available today.</p>
<a href="/dishes">See all dishes</a>
~~~

The heading identifies the title of the content, the paragraph contains prose, and the link navigates to a real destination. Change the heading level if the surrounding document structure calls for another level.

### 2. Correct this markup for an action and a navigation destination.

~~~html
<a href="#" onclick="saveItem()">Save item</a>
<button type="button" onclick="window.location.href='/account'">Account</button>
~~~

**Answer:** Use a button for the save action and a link for navigation:

~~~html
<button type="button" onclick="saveItem()">Save item</button>
<a href="/account">Account</a>
~~~

The element should match what happens when the user activates it. In a real project, JavaScript behavior should be implemented safely and tested as part of the interface.

### 3. The design asks for a large title and small section headings. Should you change the heading levels to match their font sizes?

**Answer:** No. Choose heading levels according to the document hierarchy, then use CSS to set the desired sizes. Visual size does not determine semantic level.

### 4. Mark the important warning in this paragraph.

~~~html
<p><b>Warning:</b> Disconnect the power before opening the case.</p>
~~~

**Answer:**

~~~html
<p><strong>Warning:</strong> Disconnect the power before opening the case.</p>
~~~

`<strong>` communicates that the warning is important. It is not chosen merely to make the word bold.

### 5. Add a machine-readable date to the sentence.

~~~html
<p>The class meets on November 25, 2026.</p>
~~~

**Answer:**

~~~html
<p>The class meets on <time datetime="2026-11-25">November 25, 2026</time>.</p>
~~~

The visible text stays natural for readers, while the `datetime` attribute provides a standard machine-readable date.

### 6. Replace this fake button with a native control.

~~~html
<div class="button" tabindex="0">Add to favorites</div>
~~~

**Answer:**

~~~html
<button type="button">Add to favorites</button>
~~~

The native button has button semantics and standard keyboard behavior. The action itself still needs to be connected to the application.

### 7. Correct the element choice for this content. The word "urgent" is important, not just italicized.

~~~html
<p>Please respond <em>urgent</em>.</p>
~~~

**Answer:**

~~~html
<p>Please respond <strong>urgently</strong>.</p>
~~~

`<strong>` is appropriate when the content is important. If the intended sentence instead stresses one word to change its spoken meaning, `<em>` may be appropriate. Choose according to the intended meaning.

### 8. A developer wants text to appear italic purely for visual design. Should the developer use `<em>`?

**Answer:** Not just for appearance. `<em>` means that the text has stress emphasis. If the italics are decorative, keep the appropriate semantic HTML and use CSS for the visual style.

### 9. Review this custom control. What is missing if it is intended to behave like a button?

~~~html
<span class="switch" onclick="toggleNotifications()">Notifications</span>
~~~

**Answer:** The `<span>` is generic and is not a native button. A better starting point for an action is:

~~~html
<button type="button" onclick="toggleNotifications()">Notifications</button>
~~~

A custom widget may need additional accessible state information, but simply adding a role would not provide keyboard behavior or implement the toggle. Prefer a native control and represent its changing state correctly.

### 10. A paragraph is styled to look exactly like a level-two heading. What should you check?

**Answer:** Check whether the text actually introduces a section. If it does, use the heading element that matches the document hierarchy and keep the visual style with CSS. If it is ordinary prose, leave it as a paragraph even if its design is large.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [36 - Autocomplete and autofill](36-autocomplete-and-autofill.md) | [Lesson](../lessons/37-semantic-html.md) | [Example](../examples/37-semantic-html.md) | [38 - Header, navigation, main, section, article, and footer](38-page-structure-elements.md) |
