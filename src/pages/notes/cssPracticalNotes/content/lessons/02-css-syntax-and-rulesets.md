# 02 - CSS Syntax and Rulesets

A CSS ruleset connects a selector to one or more declarations. The selector identifies what the rule can match, and the declarations describe the styles to apply. In this chapter, you will learn to read and write rulesets, format declarations, group simple selectors, use comments, and spot common syntax errors.

## What you will learn

By the end of this chapter, you should be able to:

- Identify a selector, declaration block, declaration, property, and value.
- Write a ruleset with one or more valid declarations.
- Separate declarations correctly and format them consistently.
- Group simple selectors in a selector list.
- Add CSS comments and distinguish them from JavaScript comments.
- Find common syntax mistakes and explain how browsers handle invalid declarations.
- Recognize that at-rules have their own syntax and purpose.

## The parts of a ruleset

Here is a CSS ruleset:

```css
h1 {
  color: rebeccapurple;
  font-size: 2rem;
}
```

It contains these parts:

| Part | In this example | Purpose |
| --- | --- | --- |
| Selector | `h1` | Identifies the elements the rule can match. |
| Opening brace | `{` | Starts the declaration block. |
| Declaration | `color: rebeccapurple;` | Sets one property to a value. |
| Property | `color` | Names the style setting to change. |
| Colon | `:` | Separates the property from its value. |
| Value | `rebeccapurple` | Gives the requested setting for the property. |
| Closing brace | `}` | Ends the declaration block. |

The complete selector and declaration block together form a **ruleset**, also commonly called a **CSS rule**. A declaration block is the content between the braces. It can contain one declaration, many declarations, or no declarations.

## Declarations

A declaration pairs a property with a value:

```css
color: rebeccapurple;
```

The colon separates the property name from its value. A semicolon marks the end of a declaration and separates it from the next one. Write one declaration per line to make styles easier to scan:

```css
.card {
  color: #202b3c;
  background-color: white;
  border: 1px solid #cbd5e1;
  padding: 1rem;
}
```

The final semicolon before the closing brace is optional in CSS, but keeping it is a useful habit. It makes later edits safer because a new declaration can be added without first changing the previous line.

Values have different forms. Some are one keyword, such as `white`; others contain numbers and units, multiple words, or several parts:

```css
body {
  color: #202b3c;
  font-family: Arial, sans-serif;
  margin: 1rem 2rem;
}
```

The browser checks a value against the property's grammar. A property name or value that the browser does not recognize, or cannot parse for that property, does not produce the intended declaration. Values and units are explored in more detail later in this guide.

## Writing multiple rules

A stylesheet can contain many rules. Each rule has its own selector and declaration block:

```css
h1 {
  color: darkslateblue;
  font-size: 2rem;
}

p {
  color: #334155;
  line-height: 1.6;
}
```

The blank line is not required by CSS. It is a formatting choice that makes the two rules easier to distinguish. Indentation is also for people reading the stylesheet. Browsers do not require declarations to be indented, but consistent formatting makes errors easier to notice.

## Selector lists

When several selectors should receive the same declarations, separate them with commas:

```css
h1,
h2,
h3 {
  color: darkslateblue;
  font-family: Arial, sans-serif;
}
```

This is a **selector list**. The browser applies the rule to elements matched by any selector in the list. The commas mean that the selectors are separate alternatives.

A missing comma can change the meaning of a selector. These are not the same:

```css
h1, h2 {
  color: darkslateblue;
}
```

```css
h1 h2 {
  color: darkslateblue;
}
```

The first rule is a list of two selectors. The second is one selector describing an `h2` inside an `h1`. Relationships between selectors are covered later in the selector lessons.

## Whitespace and formatting

CSS allows spaces, tabs, and line breaks around many parts of a rule. These versions express the same basic rule:

```css
p { color: teal; }
```

```css
p {
  color: teal;
}
```

Use a readable style and stay consistent. A common format is:

- Put the opening brace on the same line as the selector.
- Put each declaration on its own line.
- Indent declarations by two or four spaces.
- Put a space after the colon.
- Put a semicolon after every declaration, including the last one.
- Put a blank line between separate rules when it helps readability.

Whitespace is not universally meaningless. Some property values use spaces to separate parts, such as `margin: 1rem 2rem`, and some values can contain quoted text. Keep the spaces required by the value's syntax.

## Comments

A CSS comment starts with `/*` and ends with `*/`:

```css
/* Main page heading */
h1 {
  color: darkslateblue;
}
```

Comments can explain intent or label sections of a stylesheet. The browser ignores the comment when applying styles.

CSS comments do not nest. Also, `//` is not the CSS comment syntax. This is not a CSS comment:

```css
// Style the page heading
```

Use `/* ... */` instead. How to organize comments and stylesheet sections is covered in [Lesson 04 - Stylesheets, comments, and organization](04-stylesheets-comments-and-organization.md).

## Common syntax mistakes

### Using `=` instead of `:`

Incorrect:

```css
p {
  color = teal;
}
```

Correct:

```css
p {
  color: teal;
}
```

A CSS declaration uses a colon between its property and value.

### Forgetting the separator between declarations

Incorrect:

```css
h1 {
  color: teal
  font-size: 2rem;
}
```

Correct:

```css
h1 {
  color: teal;
  font-size: 2rem;
}
```

A semicolon separates one declaration from the next. Without it, the browser may treat the text as one malformed value and discard the declaration.

### Misspelling a property or value

```css
p {
  colour: teal;
  font-szie: 1rem;
}
```

The spelling `colour` is not the CSS property name for text color, and `font-szie` is not a recognized property. Use `color` and `font-size`. A browser generally ignores declarations it cannot understand, while other valid declarations in the same rule can still work.

### Leaving out braces or a colon

The declaration block needs braces, and each declaration needs a colon. When a rule does not work, check the braces and the punctuation around its declarations before changing the values.

## Browser error handling

Browsers are designed to recover from many CSS errors so that one mistake does not necessarily prevent the entire stylesheet from being used. A declaration with an unknown property or invalid value is generally ignored. Other valid declarations can continue to apply.

For example, `colour` below is misspelled, but the valid `font-size` declaration can still be applied:

```css
p {
  colour: teal;
  font-size: 1rem;
}
```

A missing semicolon can affect more than one declaration because the browser may read the following text as part of the first value. Correct punctuation is important even when the browser appears to recover.

Do not rely on error recovery. Check spelling, braces, colons, and semicolons, then inspect the page again.

## Rulesets and at-rules

Most examples in this chapter are style rules: a selector followed by a declaration block. CSS also has **at-rules**, which begin with an at sign (`@`) and have their own forms. For example, a media query uses an at-rule to group styles under a condition:

```css
@media (max-width: 40rem) {
  .card {
    padding: 1rem;
  }
}
```

The `@media` line is not a selector. It introduces a conditional group that contains a ruleset. At-rules and media queries are covered in later chapters.

## A reliable editing routine

When writing or debugging a ruleset, check it in this order:

1. Confirm that the selector names the element or elements you intended to target.
2. Confirm that the opening and closing braces are present.
3. Check each property name against the intended CSS property.
4. Make sure a colon separates every property from its value.
5. Make sure declarations are separated by semicolons.
6. Check that each value is valid for its property.
7. Save the stylesheet and inspect the page again.

If the rule is valid but does not match an element, the issue may be the selector rather than the declaration syntax. Selector types and matching are covered in [Lesson 05 - CSS selector basics](05-selector-basics.md).

## Common beginner misunderstandings

- **A declaration is the same as a ruleset.** A declaration is one property-value pair. A ruleset contains a selector and a declaration block.
- **The braces go around the selector.** Braces surround the declaration block, which follows the selector.
- **A property and its value are separated with `=`.** CSS uses a colon.
- **Every CSS comment starts with `//`.** CSS comments use `/*` and `*/`.
- **A missing semicolon always breaks every later rule.** Browsers try to recover, but a missing separator can make nearby declarations invalid. Correct it instead of relying on recovery.
- **Whitespace can be removed everywhere.** Formatting whitespace can often change without changing the rule, but whitespace within some values is meaningful.
- **A comma and a space mean the same thing in a selector.** A comma separates selector alternatives. A space between selectors can describe a descendant relationship.

## Try it yourself

1. In the first code example, label the selector, declaration block, property, and value.
2. Write a rule that sets paragraph text to `#334155` and line height to `1.6`.
3. Group `h1`, `h2`, and `h3` in one selector list and give them the same text color.
4. Add a CSS comment above a rule explaining its purpose.
5. Correct the punctuation and spelling in this rule:

   ```css
   .notice {
     background-color = lightyellow
     border: 1px solid orange
     paddding: 1rem;
   }
   ```

6. Explain the difference between `h1, h2` and `h1 h2` at a high level.
7. Add one deliberately misspelled declaration to a test stylesheet, observe what happens, then correct it.

## Key points

- A ruleset contains a selector and a declaration block.
- A declaration pairs a property with a value using a colon.
- Braces surround the declaration block, and semicolons separate declarations.
- A selector list uses commas to group selectors as alternatives.
- CSS comments use `/*` and `*/`.
- Browsers generally ignore invalid declarations and continue parsing other CSS.
- Readable formatting makes stylesheets easier to maintain and debug.
- At-rules begin with `@` and use syntax specific to their purpose.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [01 - Introduction to CSS](01-introduction-to-css.md) | [Q&A](../qnas/02-css-syntax-and-rulesets.md) | [Example](../examples/02-css-syntax-and-rulesets.md) | [03 - Connecting CSS to HTML](03-connecting-css-to-html.md) |
