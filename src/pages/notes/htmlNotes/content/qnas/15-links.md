# 15 - Links and the anchor element: Questions and Answers

Practice questions for [Lesson 15 - Links and the anchor element](../lessons/15-links.md). Each question is followed by its answer and an explanation or worked example where useful. Other examples can also be correct when they describe the link purpose clearly.

## Multiple-choice questions

### 1. Which attribute gives an anchor its destination?

- A. title
- B. href
- C. src
- D. alt

**Answer: B.** Href contains the address the hyperlink points to.

### 2. What does an a element with an href represent?

- A. A hyperlink.
- B. A form submission.
- C. A heading.
- D. An image.

**Answer: A.** The href attribute makes the a element a hyperlink.

### 3. What happens when an a element has no href?

- A. It becomes a button.
- B. It is still a working hyperlink.
- C. It does not create a hyperlink.
- D. It automatically links to the current page.

**Answer: C.** Without href, an a element is not a hyperlink. Use a real destination when navigation is intended.

### 4. Which link text is most descriptive?

- A. Click here
- B. More
- C. Read the HTML learning guide
- D. This link

**Answer: C.** The text names the destination so a person can decide whether to follow it.

### 5. Which element should normally be used to navigate to another page?

- A. button
- B. a with href
- C. div
- D. strong

**Answer: B.** Anchors with href navigate to resources. Buttons are for actions.

### 6. Which element is more appropriate for submitting a form?

- A. button
- B. a with href="#"
- C. cite
- D. q

**Answer: A.** A button performs an action such as submitting a form.

### 7. What does the mailto scheme do when followed?

- A. It guarantees that an email is sent.
- B. It asks the device to open an available email handler.
- C. It opens the link in a new window.
- D. It downloads a message.

**Answer: B.** A mailto link asks the device to use an email handler. It does not send a message by itself.

### 8. What does target="_blank" request?

- A. A new browsing context, often a new tab or window.
- B. A blank page with no content.
- C. A download.
- D. A form submission.

**Answer: A.** Browsers commonly open a new tab, though the exact presentation can depend on browser settings.

### 9. Which statement about rel="noopener" with target="_blank" is correct?

- A. It prevents the link from opening.
- B. It explicitly states that the new context should not get an opener relationship.
- C. It makes the link text bold.
- D. It hides the destination URL.

**Answer: B.** Noopener prevents the newly opened page from controlling the page that opened it. Current HTML also gives target="_blank" this behavior by default.

### 10. Why should an anchor not contain another link or button?

- A. Nested interactive controls create confusing, invalid interaction.
- B. It makes the page load faster.
- C. Links are only allowed inside headings.
- D. Buttons cannot be used in HTML.

**Answer: A.** Interactive controls should not be nested inside an anchor. Give each control its own clear purpose.

## True or false

### 1. The href attribute supplies the destination for a hyperlink.

**Answer: True.** The browser uses the href value as the link's address.

### 2. An anchor without href is a working link to the current page.

**Answer: False.** Without href, the a element does not represent a hyperlink.

### 3. “Click here” is always the clearest link text.

**Answer: False.** Prefer text that names the destination or action, such as “Read the HTML guide”.

### 4. A link and a button always have the same purpose.

**Answer: False.** A link navigates to a resource. A button performs an action.

### 5. A mailto link sends an email immediately when selected.

**Answer: False.** It asks the device to open an email handler. The user still reviews and sends the message.

### 6. A tel link can be useful on a device that supports calling.

**Answer: True.** It asks the device to use an available calling handler for the number.

### 7. target="_blank" always opens a browser tab, never a window.

**Answer: False.** It requests a new browsing context. A browser may present that context as a tab or window.

### 8. Current HTML gives target="_blank" noopener behavior by default.

**Answer: True.** The new context does not get an opener relationship unless the opener behavior is explicitly requested.

### 9. Putting a button inside an anchor is a good way to make the entire card clickable.

**Answer: False.** Do not nest interactive controls. Use separate links or buttons with distinct purposes.

### 10. Relative page addresses are covered in more detail in the next lesson.

**Answer: True.** Chapter 16 covers URL forms, file paths, and page fragments.

## Fill in the blanks

### 1. The ______ element creates a hyperlink when it has an href attribute.

**Answer: a.** It is also called the anchor element.

### 2. The ______ attribute contains the link destination.

**Answer: href.** It gives the browser the address to navigate to.

### 3. Link text should describe the link's ______ or action.

**Answer: purpose.** Descriptive text helps people decide whether to follow the link.

### 4. Use a ______ for an action such as submitting a form.

**Answer: button.** Use an anchor for navigation to a resource.

### 5. The ______ scheme can open an available email handler.

**Answer: mailto.** For example, mailto:hello@example.com.

### 6. The ______ scheme can open an available phone handler.

**Answer: tel.** For example, tel:+18005550123.

### 7. The target value ______ requests a new browsing context.

**Answer: _blank.** It is commonly presented as a new tab or window.

### 8. An anchor without an ______ does not create a hyperlink.

**Answer: href.** Add a real destination if the element should navigate somewhere.

## Short-answer questions

### 1. Explain what the a element and href attribute do together.

**Answer:** The a element contains the link content, and href supplies the destination. With href present, the element represents a hyperlink.

### 2. Why should link text be descriptive?

**Answer:** Descriptive text tells people what destination or action the link has. It remains useful when links are read out of context or shown in a list.

### 3. Explain the difference between an anchor and a button.

**Answer:** An anchor navigates to a resource, such as a page or document. A button performs an action, such as submitting a form or showing a control.

### 4. Why is href="#" usually a poor substitute for a button?

**Answer:** It is not a meaningful destination and can change the page fragment or move the viewport. Use a button for an action and an anchor with a real destination for navigation.

### 5. What is a mailto link, and what does it not guarantee?

**Answer:** A mailto link asks the device to open an available email handler. It does not guarantee that a handler is installed or configured, and it does not send the email automatically.

### 6. What is the difference between target="_blank" and an ordinary link?

**Answer:** An ordinary link navigates in the current browsing context. Target="_blank" requests a new context, commonly a new tab or window. Let users know when the behavior may matter.

### 7. What does rel="noopener" do with a link that opens a new context?

**Answer:** It prevents the new context from receiving an opener relationship that could let it control the original page. Current HTML gives target="_blank" this behavior by default, but writing rel="noopener" makes the intent explicit.

### 8. What is wrong with putting a link and a button inside one clickable card anchor?

**Answer:** It nests interactive controls inside another interactive control. The result can be confusing for keyboard and assistive technology users. Mark up each action separately.

## Practical and coding questions

### 1. Link the words “HTML learning guide” to a page named html-guide.html.

**Answer:**

~~~html
<a href="html-guide.html">HTML learning guide</a>
~~~

The link text describes the destination and href supplies its address.

### 2. Rewrite the vague link text "Click here" while keeping its destination at /lessons/.

**Answer:**

~~~html
<a href="/lessons/">Browse the HTML lessons</a>
~~~

The text explains what the destination contains. Keep the same href.

### 3. Create an email link for hello@example.com with the visible label “Email the team”.

**Answer:**

~~~html
<a href="mailto:hello@example.com">Email the team</a>
~~~

Following it asks the device to open an email handler.

### 4. Create a phone link for +1 800 555 0123 with a readable label.

**Answer:**

~~~html
<a href="tel:+18005550123">Call 1-800-555-0123</a>
~~~

The tel value uses a dialing-friendly form, while the visible text is easy to read.

### 5. Create a link that requests a new browsing context and tells the user.

**Answer:**

~~~html
<a href="https://www.example.com/" target="_blank" rel="noopener">
  Visit Example (opens in a new tab or window)
</a>
~~~

Target requests a new context. The visible text communicates the behavior, and rel explicitly states noopener.

### 6. Replace the fake link used to show details with a button.

**Answer:**

~~~html
<button type="button">Show details</button>
~~~

Showing details is an action on the current page, so use a button. A real page destination would use an anchor with href.

### 7. Correct this markup so the button is not nested inside the anchor.

~~~html
<a href="/products/">
  <h2>Products</h2>
  <button type="button">Add to favorites</button>
</a>
~~~

**Answer:**

~~~html
<section>
  <h2><a href="/products/">Products</a></h2>
  <button type="button">Add to favorites</button>
</section>
~~~

The page link and the favorite action are separate controls. Each can be used independently.

### 8. Decide whether each action should be an anchor or a button: open the About page, submit a search form, and call a phone number.

**Answer:**

~~~html
<a href="about.html">About this site</a>
<button type="submit">Search</button>
<a href="tel:+18005550123">Call 1-800-555-0123</a>
~~~

The first and third navigate to resources or handlers, so they are links. Submitting a form is an action, so it uses a button.

## Related lesson

- [Lesson 15 - Links and the anchor element](../lessons/15-links.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [14 - Quotations and citations](14-quotations-and-citations.md) | [Lesson](../lessons/15-links.md) | [Example](../examples/15-links.md) | [16 - URLs, file paths, and page fragments](16-urls-paths-and-fragments.md) |
