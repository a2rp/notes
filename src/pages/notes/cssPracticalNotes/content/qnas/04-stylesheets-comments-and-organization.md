# 04 - Stylesheets, Comments, and Organization: Questions and Answers

Practice questions for [Lesson 04 - Stylesheets, comments, and organization](../lessons/04-stylesheets-comments-and-organization.md). Each question is followed by its answer and an explanation or improved example where useful.

## Multiple-choice questions

### 1. Which syntax starts and ends a CSS comment?

- A. `//` and a line break
- B. `<!--` and `-->`
- C. `/*` and `*/`
- D. `#` and a line break

**Answer: C. `/*` and `*/`.** These delimiters mark a CSS comment.

### 2. What is a useful purpose for a stylesheet comment?

- A. Explain why a non-obvious rule exists
- B. Make every declaration run faster
- C. Replace a selector
- D. Connect the stylesheet to HTML

**Answer: A. Explain why a non-obvious rule exists.** Comments are most useful when they provide context that is not already clear from the code.

### 3. Which comment adds the most useful information?

- A. `/* set the color teal */` above `color: teal;`
- B. `/* Keep the article text column readable on wide screens. */` above a `max-width` rule
- C. `/* CSS */` above every declaration
- D. `/* This selector is a selector. */`

**Answer: B.** It explains the intent behind the width limit rather than repeating a property or stating the obvious.

### 4. Which statement about CSS comments is true?

- A. CSS comments can be nested freely.
- B. The first `*/` closes the current comment.
- C. CSS comments always appear in the browser page.
- D. A CSS comment must be on a line by itself.

**Answer: B. The first `*/` closes the current comment.** CSS comments do not nest.

### 5. Which format is easiest to scan in a typical project?

- A. One long line for the whole stylesheet
- B. One declaration per line with consistent indentation
- C. Different indentation for every rule
- D. Put every property in a separate CSS file

**Answer: B. One declaration per line with consistent indentation.** It helps people compare declarations and spot mistakes.

### 6. How should related rules for one component usually be organized?

- A. Keep them together in a clear section when practical
- B. Put each declaration at the end of a random file
- C. Split them into a separate file per property
- D. Put all comments at the top and leave rules unordered

**Answer: A. Keep them together in a clear section when practical.** Grouping related rules makes a component easier to find and maintain.

### 7. When is it a good idea to split a stylesheet into more files?

- A. Whenever the file has more than one rule
- B. When a clear project boundary makes styles easier to manage
- C. For every individual selector
- D. Only when the styles contain comments

**Answer: B. When a clear project boundary makes styles easier to manage.** More files are useful when their organization reflects meaningful reuse or ownership. Too many tiny files can make styles harder to locate.

### 8. What is usually the best way to keep old code for future reference?

- A. Leave it commented out forever in the stylesheet
- B. Copy it into every component file
- C. Use version control history and remove unused code
- D. Rename the declarations as comments

**Answer: C. Use version control history and remove unused code.** Stale commented-out code makes it unclear what is active or still needed.

### 9. Does CSS require a particular indentation width?

- A. Yes, exactly two spaces
- B. Yes, exactly four spaces
- C. No, indentation is mainly a readability convention
- D. No, CSS cannot contain indentation

**Answer: C. No, indentation is mainly a readability convention.** Choose a consistent style that works for the project.

### 10. When can the order of linked stylesheets matter?

- A. When declarations conflict and other cascade factors do not decide the result first
- B. Only when the files contain comments
- C. It can never matter
- D. Only when the HTML has no `head`

**Answer: A.** Source order can affect the cascade when competing declarations otherwise have the same relevant priority. The cascade includes other factors too.

## Objective questions

### True or false

### 11. CSS comments use the same `//` syntax as JavaScript comments.

**Answer: False.** CSS uses `/* ... */` comments. The `//` form is not CSS comment syntax.

### 12. A browser applies the text inside a CSS comment as a style declaration.

**Answer: False.** The browser ignores comments when applying styles.

### 13. Indentation and blank lines are generally formatting choices for people reading CSS.

**Answer: True.** Browsers can parse CSS without a particular indentation style, but consistent formatting helps people maintain it.

### 14. A useful comment can explain why a rule exists.

**Answer: True.** Intent or constraints may not be obvious from the property names and values alone.

### 15. Every stylesheet should be divided into many small files.

**Answer: False.** Split files when a clear boundary improves reuse or maintainability. A small project can be easier to manage with one well-organized file.

### 16. A comment can become misleading if it is not updated after the code changes.

**Answer: True.** Stale comments can cause future edits to be based on incorrect information.

### 17. Grouping all rules for a component near each other can make that component easier to maintain.

**Answer: True.** Related rules are easier to find and understand when they are organized together.

### 18. Commented-out CSS is a clear substitute for version control.

**Answer: False.** Version control records code changes without leaving inactive code mixed into the active stylesheet.

## Short-answer questions

### 19. Name two formatting conventions that make CSS easier to read.

**Answer:** Examples include one declaration per line, consistent indentation, a space after each colon, final semicolons, and blank lines between rules.

**Explanation:** These are conventions for readability. CSS does not require exactly this visual format.

### 20. Write a CSS comment explaining why a content column has a maximum width.

**Example answer:**

```css
/* Keep long article lines comfortable to read. */
.article {
  max-width: 68ch;
}
```

**Explanation:** The comment explains the reason for the constraint, not merely the property name.

### 21. Why should you remove old CSS that is no longer used instead of keeping it in a comment?

**Answer:** Commented-out code adds clutter and makes it unclear whether it is still needed. Version control can preserve the change history.

### 22. What is one reasonable order for sections in a small stylesheet?

**Answer:** Base styles, page layout, reusable components, then page-specific details or visual states.

**Explanation:** This is a practical convention, not a rule required by CSS. A project can use another consistent structure.

### 23. When should a project consider adding another stylesheet file?

**Answer:** When a clear boundary, such as shared base styles or page-specific styles, makes the code easier to reuse or maintain.

**Explanation:** Do not split a small stylesheet into many tiny files without a practical reason.

### 24. Why is a comment such as `/* fix */` not very helpful?

**Answer:** It does not explain what is being fixed, why the code is needed, or what constraint future edits should preserve.

## Review and improve the stylesheet

### 25. Improve the comment in this example.

```css
/* Set the max width to 68ch */
.article {
  max-width: 68ch;
}
```

**Example improvement:**

```css
/* Keep long article lines comfortable to read. */
.article {
  max-width: 68ch;
}
```

**Explanation:** The improved comment describes the intent behind the value.

### 26. Is this a valid way to write two nested CSS comments?

```css
/* Outer note
   /* Inner note */
   More outer text
*/
```

**Answer:** No. CSS comments do not nest. The first `*/` closes the comment, so the remaining text is no longer inside the outer comment.

**Correction:** Use one comment with the full explanation, or put separate comments one after another.

### 27. A stylesheet has the following rules for one card in three distant sections. What organizational improvement could help?

```css
.card { padding: 1rem; }

/* Several unrelated rules appear here. */

.card-title { color: teal; }

/* Several more unrelated rules appear here. */

.card-description { margin: 0; }
```

**Answer:** Group the card and its related title and description rules near each other, optionally under a clear `/* Card */` comment.

**Explanation:** A reader can then find the component's styles in one place.

### 28. A developer put every component into a separate file, even when each file contains only one short rule. What should they consider?

**Answer:** Combine related rules into a more useful stylesheet unless separate ownership or reuse gives each file a clear purpose.

**Explanation:** Additional files add navigation and stylesheet links. The structure should make the project easier to understand.

### 29. Correct the comment syntax.

```css
// Shared page defaults
body {
  margin: 0;
}
```

**Answer:** Replace the JavaScript-style comment with a CSS comment.

```css
/* Shared page defaults */
body {
  margin: 0;
}
```

### 30. A comment says `/* temporary workaround */`, but the rule has been part of the design for months. What should you do?

**Answer:** Update the comment to describe the current reason for the rule, or remove the comment if it no longer adds useful context.

### 31. Why might a base stylesheet be linked before a component stylesheet?

**Answer:** It can make the source order reflect the intended progression from shared defaults to component styles. If declarations conflict, source order can matter along with the other cascade factors.

**Explanation:** The exact organization depends on the project. The full cascade is covered in later chapters.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [03 - Connecting CSS to HTML](03-connecting-css-to-html.md) | [Lesson](../lessons/04-stylesheets-comments-and-organization.md) | [Example](../examples/04-stylesheets-comments-and-organization.md) | [05 - CSS selector basics](../qnas/05-selector-basics.md) |
