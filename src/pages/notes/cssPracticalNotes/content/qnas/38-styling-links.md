# 38 - Styling links and link states - Q&A

Review hyperlink semantics, link-state pseudo-classes, keyboard focus, readable styling, and state-rule order. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. Which element is the right choice when activating text should navigate to a destination?

- A. `<button>`
- B. `<a href="...">`
- C. `<span role="link">`
- D. `<label>`

**Answer: B. `<a href="...">`.**

**Explanation:** An anchor with an `href` creates a hyperlink and provides built-in navigation behavior. A button is for an action such as submitting a form or opening a dialog.

### 2. What does `:link` select?

- A. Every element containing a URL
- B. An unvisited hyperlink
- C. A link currently under the pointer
- D. Any focused control

**Answer: B. An unvisited hyperlink.**

**Explanation:** `:link` matches hyperlinks that the browser does not consider visited. It does not match an anchor that has no `href`.

### 3. Which pseudo-class represents a hyperlink the browser considers visited?

- A. `:checked`
- B. `:target`
- C. `:visited`
- D. `:enabled`

**Answer: C. `:visited`.**

**Explanation:** Browsers restrict `:visited` styling to protect browsing history. The browser controls which styles can differ and what scripts can inspect.

### 4. Why should a link have a visible keyboard-focus style?

- A. It makes the link load faster
- B. It shows keyboard users which interactive element currently has focus
- C. It changes the link destination
- D. It replaces descriptive link text

**Answer: B. It shows keyboard users which interactive element currently has focus.**

**Explanation:** A clear focus indicator helps people who navigate with a keyboard track their position. Do not remove the browser outline unless you replace it with an equally visible indicator.

### 5. What does `:target` match?

- A. The element whose `id` matches the current URL fragment
- B. The first link in a navigation menu
- C. Every visited link
- D. A link while it is being clicked

**Answer: A. The element whose `id` matches the current URL fragment.**

**Explanation:** If the current address ends with `#details`, the element with `id="details"` can match `:target`.

### 6. Why is underlining useful on links in paragraphs?

- A. It makes the destination private
- B. It provides a visual cue in addition to color
- C. It prevents keyboard focus
- D. It marks the link as visited

**Answer: B. It provides a visual cue in addition to color.**

**Explanation:** An underline helps distinguish a link when a reader cannot rely on color alone. If you remove it, another clear visual treatment should identify the link.

### 7. What is a risk of styling links only with `:hover`?

- A. Touch users and keyboard users may not receive an equivalent cue
- B. The link will stop having a destination
- C. The browser will always show it as visited
- D. It disables the cascade

**Answer: A. Touch users and keyboard users may not receive an equivalent cue.**

**Explanation:** Hover is a pointer interaction. Provide recognizable default styling and a visible focus style as well.

### 8. When several state selectors of equal specificity match at the same time, what determines which declaration wins?

- A. The order of declarations in the cascade
- B. The order of HTML attributes
- C. The link destination length
- D. The element's text content

**Answer: A. The order of declarations in the cascade.**

**Explanation:** Later declarations can override earlier ones when importance and specificity are equal. Arrange link-state rules intentionally.

## Short-answer questions

### 9. What is the difference between a link and a button?

**Answer:** A link navigates to a destination. A button performs an action.

**Explanation:** Use an anchor with `href` for another page or a page fragment. Use a button for actions such as opening a dialog, submitting a form, or changing a setting.

### 10. Does `<a>Contact</a>` create a hyperlink?

**Answer:** No.

**Explanation:** An anchor needs an `href` attribute to create a hyperlink. Without it, the element is not a usable navigation link.

### 11. What is the purpose of `:focus-visible`?

**Answer:** It selects a focused element when the browser determines a visible focus indicator is appropriate.

**Explanation:** It can help style keyboard focus without forcing the same focus treatment after every pointer interaction. Browser heuristics decide when it matches, so do not treat it as a keyboard-only selector.

### 12. Why should link text describe its destination?

**Answer:** Descriptive text lets people understand a link when reading it in context or navigating through a list of links.

**Explanation:** Phrases such as “View the course schedule” communicate more than “Click here.” A link's visible text normally provides its accessible name.

### 13. What is the difference between `:hover` and `:active`?

**Answer:** `:hover` matches while a pointing device is over an element. `:active` matches while the element is being activated.

**Explanation:** A link may match both during a pointer press. If equal-specificity styles overlap, the rule order affects the visible result.

### 14. What should you do if a design removes the default link underline?

**Answer:** Keep another clear, consistent visual treatment that identifies links, and check that links remain distinguishable without color alone.

**Explanation:** Color can be difficult to perceive for some readers and may be lost in other display conditions. A persistent underline is a reliable cue for links within text.

### 15. What does `aria-current="page"` communicate on a navigation link?

**Answer:** It identifies the link for the current page in a related set of navigation links.

**Explanation:** Use it on the current destination when appropriate. CSS can style that link with `[aria-current="page"]`, while the attribute provides semantic information to assistive technology.

### 16. Why should CSS not be used to make a link act like a button?

**Answer:** CSS changes appearance, not the element's meaning or behavior.

**Explanation:** A link still navigates, while a button performs an action. Choose the semantic HTML element that matches the behavior, then style it.

## Applied questions

### 17. Write a selector that gives every hyperlink in the main content a visible underline.

**Answer:**

~~~css
main a {
  text-decoration-line: underline;
  text-underline-offset: 0.18em;
}
~~~

**Explanation:** Scoping the selector to `main` avoids changing links in unrelated interface regions. The underline remains a non-color cue.

### 18. Write a focus style for links that is visible without relying on color alone.

**Answer:**

~~~css
a:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
~~~

**Explanation:** An outline surrounds the focused link and is separate from its text decoration. Keep enough space around it so the indicator is easy to see.

### 19. Put these equal-specificity state rules in a useful order: `:active`, `:visited`, `:focus-visible`, `:link`, `:hover`.

**Answer:** `:link`, `:visited`, `:hover`, `:focus-visible`, `:active`.

**Explanation:** This order lets later interaction states override earlier base states when they overlap. It is a useful convention, but other selectors, specificity, and cascade layers can still affect the final result.

### 20. Write a selector that adds a background to the section identified by the current URL fragment.

**Answer:**

~~~css
:target {
  background-color: #fff4bf;
}
~~~

**Explanation:** The browser matches `:target` on the element whose `id` equals the fragment identifier. Ensure the text remains readable against the chosen background.

### 21. A link changes from blue to purple on hover, but it has no underline and no focus style. Name two improvements.

**Answer:** Keep a visible underline or another persistent non-color cue, and add a clear `:focus-visible` indicator.

**Explanation:** Hover styling does not help every input method, and color alone may not distinguish the link. A visible default treatment and keyboard focus style make the interaction easier to recognize.

### 22. A navigation link points to `#contact`. What must the page contain for that destination to exist?

**Answer:** An element with `id="contact"`.

**Explanation:** The fragment in the `href` refers to an element identifier in the same document. For example, `<a href="#contact">Contact details</a>` can target `<section id="contact">...</section>`.

## Coding questions

### 23. Complete the CSS so visited links use a different text color, while hover, focus, and active states remain visible.

**Answer:**

~~~css
a:link {
  color: #075b9b;
}

a:visited {
  color: #6741a5;
}

a:hover {
  text-decoration-thickness: 0.16em;
}

a:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

a:active {
  color: #a33125;
}
~~~

**Explanation:** The rules put the base link states before interaction states. Browsers may restrict visited styling, and the `:active` appearance is usually brief while the link is being activated.

### 24. Create an in-page link to a section and style the destination when it is targeted.

**Answer:**

~~~html
<a href="#reading-list">Jump to the reading list</a>

<section id="reading-list">
  <h2>Reading list</h2>
  <p>Topics to review this week.</p>
</section>
~~~

~~~css
#reading-list:target {
  outline: 3px solid #075b9b;
  outline-offset: 0.5rem;
}
~~~

**Explanation:** The fragment and the section `id` must match. The target outline indicates which section the browser navigated to.

## Key takeaways

- Use anchors with `href` for navigation and buttons for actions.
- Keep link text descriptive and links recognizable in their default state.
- Provide visible focus feedback and do not rely on hover alone.
- Link state rules can overlap, so order and specificity matter.
- Browsers restrict visited-link styling to protect browsing privacy.
- `:target` can style the element addressed by a page fragment.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [37 - Styling tables](../lessons/37-styling-tables.md) | [Q&A](38-styling-links.md) | [Example](../examples/38-styling-links.md) | [39 - Styling forms and controls](../lessons/39-styling-forms-and-controls.md) |