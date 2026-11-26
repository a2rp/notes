# 04 - Stylesheets, Comments, and Organization

A stylesheet is easier to use when its rules are easy to find and understand. Consistent formatting, useful comments, and sensible grouping help you maintain CSS as a page grows. In this chapter, you will learn how to organize a CSS file, write comments that add context, and decide when styles belong together or in separate files.

## What you will learn

By the end of this chapter, you should be able to:

- Format a stylesheet consistently so rules and declarations are easy to scan.
- Use CSS comments to explain sections or non-obvious decisions.
- Avoid comments that repeat the code or leave misleading notes.
- Group related rules using a structure that fits the page.
- Decide when a stylesheet should be split into multiple files.
- Recognize common stylesheet organization problems and improve them.

## Consistent formatting

A consistent style makes it easier to notice where one rule ends and another begins. A common format uses one ruleset per block, one declaration per line, a space after each colon, and a final semicolon on every declaration:

```css
.card {
  background-color: white;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.card-title {
  color: #164e63;
  font-size: 1.5rem;
}
```

The browser does not require this exact indentation or line spacing. It is a convention for people reading and editing the file. Pick a format and use it consistently across the project.

Keep each rule's declarations together. This makes it easier to understand how a component is styled and to find the property that needs changing. Avoid spreading one small rule across many lines without a reason, or putting a whole stylesheet on one long line.

## CSS comments

A CSS comment begins with `/*` and ends with `*/`:

```css
/* Main content card */
.card {
  padding: 1.25rem;
}
```

The browser ignores comments when applying styles. Comments can document the purpose of a group of rules or explain a decision that would otherwise be confusing.

CSS comments do not nest. This does not work as two separate nested comments:

```css
/* Outer comment
   /* Inner comment */
   More outer text
*/
```

The first `*/` closes the comment. Use one comment at a time, or rewrite the text so it does not contain another comment opener and closer.

JavaScript-style `//` is not a CSS comment:

```css
// This is not a CSS comment
```

Use `/* ... */` in a CSS file.

## Write comments that add context

A useful comment explains intent, scope, or a constraint that is not obvious from the declarations:

```css
/* Keep long article lines comfortable to read. */
.article {
  max-width: 68ch;
  margin-inline: auto;
}
```

The comment explains why the width is limited. The property names already show that the rule sets a maximum width and margins, so a comment that only says "set the max width" would add little.

Comments are especially useful for:

- Labeling groups of related rules.
- Explaining why a less obvious value or selector is needed.
- Recording constraints that future edits should preserve.
- Marking a project-specific convention.

Avoid comments that:

- Repeat what the next declaration says.
- Describe outdated behavior after the CSS has changed.
- Hide old code that should be deleted.
- Claim a style is temporary when it has become permanent.

If the reason for a rule changes, update or remove its comment. A wrong comment can be more confusing than no comment.

## Organize a stylesheet into sections

For a small page, one stylesheet can be divided into a few sections. A simple order is:

1. Base styles that affect the document as a whole.
2. Page layout rules.
3. Reusable components.
4. Page-specific details or visual states.

For example:

```css
/* Base styles */
body {
  margin: 0;
  color: #1f2937;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

/* Page layout */
.page {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Components: notice */
.notice {
  padding: 1rem;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
}

/* Components: notice heading */
.notice-title {
  margin-top: 0;
  color: #164e63;
}
```

This order is a practical choice, not a CSS requirement. Some projects organize rules by page, component, or feature instead. The important point is that a reader can predict where a related rule belongs.

Do not create a heading for every single declaration. Use section comments when they help readers navigate a meaningful group.

## Group related rules

Rules that belong to the same component are often easier to maintain together:

```css
/* Profile card */
.profile-card {
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  background-color: white;
}

.profile-card-title {
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
}

.profile-card-description {
  margin: 0;
  color: #475569;
}
```

A reader can find the card and its related parts together. If you have a group of styles for a page header, navigation, and footer, keeping each component's rules in a clear section can make editing easier.

Avoid grouping all declarations by property type, such as putting every `color` rule in one far-away section and every `padding` rule in another. That can force someone to search in many places to understand one component.

## Keep stylesheets a useful size

Start with a separate stylesheet for the page or small site. As the project grows, split CSS when there is a clear reason, such as shared base styles used by multiple pages or a component group that has become easier to manage on its own.

For example, a larger project might have:

```text
css/
  base.css
  layout.css
  components.css
  pages/
    contact.css
```

This is only an example. A project does not need this many files just because it has a few rules. Too many tiny files can make the styles harder to locate and require more links to coordinate. Choose file boundaries that reflect how the project is actually organized.

When one HTML document loads several stylesheets, keep the links together in the `head` and give the files clear names:

```html
<head>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/contact.css">
</head>
```

The order of linked stylesheets can matter when declarations conflict. The browser's full cascade also considers other factors, which are covered later in this guide.

## Avoid stale and commented-out code

It can be tempting to disable an old declaration by placing it in a comment:

```css
/* .old-banner {
  color: red;
  padding: 2rem;
} */
```

This leaves inactive code in the stylesheet and makes it unclear whether it is still needed. If the old code is no longer useful, remove it. If you need to keep a record of earlier work, version control stores that history more clearly than commented-out code.

A temporary comment can help while diagnosing an issue, but remove it or turn it into a clear explanation before finishing the edit.

## Common stylesheet organization problems

### Repeated rules for the same component

When the same selector appears in several distant places, it can be hard to tell which declarations are intentional. Keep related declarations together when practical. If a later rule represents a deliberate state or responsive adjustment, label or group it clearly.

### Unclear comments

A comment like `/* fix */` does not explain what is being fixed. Write the reason or remove the comment.

### Comments that repeat declarations

A comment such as `/* make text teal */` above `color: teal;` usually adds no information. Use a comment to explain intent that is not obvious from the declaration.

### One enormous stylesheet with no structure

As a file grows, add meaningful sections and group related rules. Split it into files only when a clear boundary makes the project easier to understand.

### Many files for a very small page

Too many small files add navigation and connection overhead. Keep the structure proportional to the project's needs.

## A simple maintenance routine

When updating a stylesheet:

1. Find the existing rule for the component or page area.
2. Add or change declarations in that related section when appropriate.
3. Keep the formatting consistent with surrounding rules.
4. Add a comment only when it explains scope, intent, or a non-obvious constraint.
5. Remove obsolete declarations and comments instead of leaving dead code behind.
6. Check whether the rule is still used and whether its selector is understandable.
7. Save the file and inspect the page.

## Common beginner misunderstandings

- **Comments are instructions to the browser.** Comments are ignored when styles are applied; they are notes for people maintaining the file.
- **Every rule needs a comment.** Comment rules when context is useful. Obvious declarations do not need narration.
- **CSS supports `//` comments.** CSS comments use `/*` and `*/`.
- **Comments can safely be nested.** CSS comments do not nest; the first closing marker ends the comment.
- **A more organized stylesheet needs more files.** Clear sections in one file may be easier than many tiny files.
- **Commented-out code is a good permanent backup.** Remove unused code and use version control for change history.
- **There is only one correct order for all CSS files.** Projects can use different structures. Choose a consistent organization that makes related styles easy to find.

## Try it yourself

1. Take a stylesheet with several rules and format each declaration on its own indented line.
2. Add comments named `Base styles`, `Page layout`, and `Components` where they make sense.
3. Find a comment that simply repeats the declaration below it. Rewrite it to explain intent or remove it.
4. Find a block of commented-out CSS. Decide whether it is still needed, then remove it or restore the active rule.
5. Group the rules for one component together.
6. If the stylesheet has become long, sketch a file structure that separates shared styles from page-specific styles. Do not split it unless that makes the code easier to maintain.
7. Check that each comment is accurate after your edits.

## Key points

- Consistent formatting helps people read and maintain CSS.
- CSS comments use `/* ... */` and do not nest.
- Comments should explain intent, scope, or non-obvious decisions.
- Group related rules and use section comments when they help navigation.
- Split stylesheets when clear project boundaries make the code easier to maintain.
- Remove stale comments and unused code rather than keeping them permanently commented out.
- A predictable organization is more useful than a complicated structure.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [03 - Connecting CSS to HTML](03-connecting-css-to-html.md) | [Q&A](../qnas/04-stylesheets-comments-and-organization.md) | [Example](../examples/04-stylesheets-comments-and-organization.md) | [05 - CSS selector basics](05-selector-basics.md) |
