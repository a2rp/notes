# 07 - Attribute Selectors: Questions and Answers

Use these questions to review how CSS attribute selectors match an element's attributes and values. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which selector matches elements that have a `required` attribute, regardless of its value?

A. `[required]` / B. `[required="true"]` / C. `.required` / D. `#required`

**Answer: A.** An attribute selector with only the attribute name checks whether the attribute is present.

### 2. Which selector matches only inputs with `type="email"`?

A. `input.email` / B. `input[type="email"]` / C. `input[type~="mail"]` / D. `input#email`

**Answer: B.** The `=` operator checks for an exact attribute value, and the `input` type selector narrows the match to inputs.

### 3. Which operator checks for a complete word in a whitespace-separated attribute value?

A. `*=` / B. `~=` / C. `^=` / D. `$=`

**Answer: B.** The `~=` operator matches a complete token separated by whitespace, such as the class token `featured` in `class="card featured"`.

### 4. Which selector matches `lang="en"` and `lang="en-GB"`, but not `lang="english"`?

A. `[lang^="en"]` / B. `[lang|="en"]` / C. `[lang*="en"]` / D. `[lang$="en"]`

**Answer: B.** The `|=` operator matches the exact value or that value followed by a hyphen.

### 5. Which operator matches an attribute value that starts with a string?

A. `^=` / B. `~=` / C. `|=` / D. `$=`

**Answer: A.** The `^=` operator checks the beginning of the attribute value.

### 6. Which selector matches `href` values that end in `.pdf`?

A. `[href^=".pdf"]` / B. `[href~=".pdf"]` / C. `[href$=".pdf"]` / D. `[href|=".pdf"]`

**Answer: C.** The `$=` operator checks the end of the attribute value.

### 7. Which selector matches an attribute value containing the substring `guide` anywhere?

A. `[data-kind^="guide"]` / B. `[data-kind$="guide"]` / C. `[data-kind*="guide"]` / D. `[data-kind~="guide"]`

**Answer: C.** The `*=` operator checks whether the text occurs anywhere in the value.

### 8. Which selector matches an input whether it has `class="button"` or `class="button primary"`?

A. `input[class="button"]` / B. `input[class~="button"]` / C. `input[class$="button"]` / D. `input[class|="button"]`

**Answer: B.** The class attribute is a whitespace-separated list, so `~=` matches the complete `button` token in either value. The class selector `input.button` would also be a clear choice.

## True or false

### 9. `[disabled]` checks for the presence of the `disabled` attribute.

**Answer: True.** It matches any element that has the attribute. For an HTML boolean attribute, its presence represents the true state.

### 10. `[class="featured"]` matches `class="card featured"`.

**Answer: False.** The equals operator requires the whole class attribute value to equal `featured`. Use `.featured` or `[class~="featured"]` to match that class token.

### 11. `[class*="card"]` and `[class~="card"]` always match the same elements.

**Answer: False.** `*=` matches a substring anywhere, including inside a longer token. `~=` matches the complete whitespace-separated token.

### 12. `[lang|="en"]` matches `lang="en-US"`.

**Answer: True.** The `|=` operator accepts the exact value or the value followed by a hyphen and another part.

### 13. `a[href^="https://"]` proves that a link is safe to visit.

**Answer: False.** It only checks how the literal `href` attribute begins. It does not validate a destination or its behavior.

### 14. Attribute selectors change an element's HTML attribute value.

**Answer: False.** Selectors match existing markup. They do not modify attributes or application state.

### 15. The `i` flag requests ASCII case-insensitive comparison for an attribute value.

**Answer: True.** For example, `[type="EMAIL" i]` can match an input whose type value is `email`.

## Short-answer questions

### 16. What does `[data-state]` match?

**Answer:** Any element that has a `data-state` attribute, regardless of the value it contains.

### 17. What does `[data-state="open"]` match?

**Answer:** Elements whose `data-state` attribute value is exactly `open`, using the default case behavior for that attribute.

### 18. What is the difference between `[class="active"]` and `.active`?

**Answer:** `[class="active"]` requires the entire class attribute value to be exactly `active`. `.active` matches an element with the `active` class token, even if it has other classes too.

### 19. What is the difference between `~=` and `*=`?

**Answer:** `~=` matches a complete whitespace-separated token. `*=` matches a substring anywhere, even if it is only part of a longer token.

### 20. What does `[lang|="fr"]` match?

**Answer:** Values equal to `fr` or beginning with `fr-`, such as `fr-CA`. It does not match a value such as `french`.

### 21. What is the purpose of the `i` flag in `[data-code="open" i]`?

**Answer:** It requests ASCII case-insensitive comparison, so values such as `OPEN` or `Open` can match the selector value `open`.

### 22. When is `[required]` a better selector than `[required="true"]`?

**Answer:** When the condition is that the HTML boolean attribute is present. Boolean attributes are true when present, and their text value is not the condition.

## Read the HTML and CSS

Use this markup for Questions 23 to 27:

```html
<form>
  <input type="email" name="email" required>
  <input type="text" name="name">
  <a href="/guide.pdf" data-kind="download">Guide</a>
  <a href="/guide.html" data-kind="download featured">Read online</a>
  <p lang="en-US">Welcome.</p>
  <div class="card featured">Featured card</div>
  <div class="postcard">Postcard</div>
</form>
```

### 23. Which input matches `input[required]`?

**Answer:** The email input only. It is the only input with a `required` attribute.

### 24. Which element matches `a[href$=".pdf"]`?

**Answer:** The link whose `href` is `/guide.pdf`. That attribute value ends with `.pdf`.

### 25. Which link matches `a[data-kind~="featured"]`?

**Answer:** The “Read online” link. Its `data-kind` value contains `featured` as a complete whitespace-separated token.

### 26. Does `[lang|="en"]` match the paragraph? Explain.

**Answer:** Yes. `en-US` begins with the exact value `en` followed by a hyphen, which is the pattern that `|=` matches.

### 27. Which elements match `[class~="card"]`, and which match `[class*="card"]`?

**Answer:** `[class~="card"]` matches only the element with `class="card featured"`. `[class*="card"]` matches both that element and the one with `class="postcard"`, because `card` appears as a substring in `postcard`.

## Fix the selector

### 28. The goal is to match every element whose class list includes the token `button`. Fix the selector.

```css
[class="button"] {
  padding: 0.5rem;
}
```

**Answer:**

```css
[class~="button"] {
  padding: 0.5rem;
}
```

**Explanation:** Exact value matching fails when the element has additional classes. Token matching finds `button` among the whitespace-separated class names. For ordinary class styling, `.button` is simpler.

### 29. The goal is to match a language value of `en` or a regional value such as `en-GB`, but not `english`. Fix the selector.

```css
[lang^="en"] {
  font-family: Arial, sans-serif;
}
```

**Answer:**

```css
[lang|="en"] {
  font-family: Arial, sans-serif;
}
```

**Explanation:** `^=` would also match `english`. `|=` requires the exact value or a hyphen after the prefix.

### 30. The goal is to match a `data-state` value of `open`, ignoring ASCII letter case. Write the selector.

**Answer:**

```css
[data-state="open" i] {
  border-color: seagreen;
}
```

**Explanation:** The `i` flag requests ASCII case-insensitive matching for the value comparison.

## Practice questions

### 31. Write a selector for every `input` with `type="email"` and a `required` attribute.

**Answer:**

```css
input[type="email"][required] {
  /* declarations */
}
```

**Explanation:** The type and attribute value must match, and the `required` attribute must be present.

### 32. Write a selector for links whose `href` values end with `.pdf`.

**Answer:**

```css
a[href$=".pdf"] {
  /* declarations */
}
```

### 33. Write a selector for elements whose `data-state` is exactly `open`.

**Answer:**

```css
[data-state="open"] {
  /* declarations */
}
```

### 34. Write a selector for elements whose `class` list includes the complete token `featured`.

**Answer:**

```css
[class~="featured"] {
  /* declarations */
}
```

**Explanation:** The class selector `.featured` is the usual concise form for matching that class.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [06 - Combinators and selector relationships](../qnas/06-combinators-and-selector-relationships.md) | [Lesson](../lessons/07-attribute-selectors.md) | [Example](../examples/07-attribute-selectors.md) | [08 - Pseudo-classes](08-pseudo-classes.md) |
