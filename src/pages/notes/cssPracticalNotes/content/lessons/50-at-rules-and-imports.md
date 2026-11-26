# 50 - At-rules, imports, and font-face

At-rules are CSS instructions that begin with `@`. Some introduce conditional blocks, some organize or load stylesheets, and some define resources such as downloadable fonts.

This chapter focuses on how to read common at-rules, where imports belong, and how to register a font with `@font-face` while keeping a useful fallback.

## Learning outcomes

After this chapter, you should be able to:

- Recognize statement at-rules and block at-rules.
- Read common conditional and organizational at-rules.
- Place `@import` correctly and understand its effect on stylesheet order.
- Explain when an HTML stylesheet link may be simpler than a CSS import.
- Define font faces with `@font-face` descriptors.
- Choose a font family, source, weight, style, and display policy.
- Keep font loading resilient with fallbacks and sensible resource choices.

## What is an at-rule?

An at-rule starts with an at sign followed by its name. The rule's grammar determines what follows it.

A **statement at-rule** ends with a semicolon and has no block:

~~~css
@import url("./base.css");
~~~

A **block at-rule** contains a brace-delimited block:

~~~css
@media (min-width: 48rem) {
  .layout {
    display: grid;
  }
}
~~~

The block's contents depend on the at-rule. For example, `@media` contains ordinary style rules, while `@font-face` contains descriptors for a font resource.

## Common at-rules

| At-rule | Purpose |
| :--- | :--- |
| `@media` | Apply rules when media conditions match, such as viewport size or print output. |
| `@supports` | Apply rules when the browser supports a declaration or selector feature. |
| `@layer` | Organize declarations into cascade layers. |
| `@keyframes` | Define the stages used by CSS animations. |
| `@import` | Load another stylesheet from a stylesheet. |
| `@font-face` | Register a font face that CSS can use. |

Several of these were introduced in earlier chapters. The key idea is that at-rules are instructions interpreted by CSS, and their block contents follow the grammar of that particular rule.

## Import another stylesheet

`@import` loads another stylesheet. Its basic form uses a quoted path or `url()`:

~~~css
@import "./base.css";
@import url("./components.css");
~~~

The imported rules participate in the cascade as if they were inserted at the location of the import. This makes the position of an import important.

All `@import` rules must come before other valid at-rules and style rules in that stylesheet. If the file has an `@charset` declaration, it appears first:

~~~css
@charset "UTF-8";
@import "./reset.css";
@import "./typography.css";

:root {
  color-scheme: light;
}
~~~

An import placed after a style rule is invalid and is ignored:

~~~css
.card {
  padding: 1rem;
}

/* Invalid here because a style rule came first. */
@import "./cards.css";
~~~

Imports can be conditional. A media condition applies the imported stylesheet only in matching media:

~~~css
@import "./print.css" print;
~~~

An import may also include a support condition. Read its conditions carefully because they determine when the imported rules participate in the page.

Importing stylesheets can be useful for organizing a stylesheet, but a long chain of imports can make loading order harder to inspect. For stylesheets owned by the HTML page, a `<link rel="stylesheet">` element is often clearer because the document lists its stylesheets directly. Use one consistent organization and make the order intentional.

## Organize layers and imports

A layer order statement can name the order of layers. Keep it after imports so every import appears before ordinary rules:

~~~css
@import "./reset.css";

@layer reset, base, components, utilities;

@layer base {
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
}

@layer components {
  .card {
    padding: 1rem;
  }
}
~~~

Rules in layers participate in the cascade according to layer order as well as importance and specificity. This chapter does not replace the separate cascade-layer lesson; here, notice how imports, layer declarations, and ordinary rules have deliberate positions in the file.

## Define a downloadable font with `@font-face`

`@font-face` registers a font face. Its block contains descriptors, not ordinary selectors and declarations for page elements:

~~~css
@font-face {
  font-family: "Study Sans";
  src: url("./fonts/study-sans-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
~~~

The two essential descriptors are `font-family` and `src`. If either is missing, the face cannot be used for font matching. The family name is an author-chosen label that you use in a `font-family` property:

~~~css
body {
  font-family: "Study Sans", Arial, sans-serif;
}
~~~

The fallback list matters. If the font file cannot be found, downloaded, or decoded, the browser can still render text with another available font.

### Match each face to its real style and weight

Each `@font-face` rule describes a face. Declare its actual style and weight so the browser can select the intended resource:

~~~css
@font-face {
  font-family: "Study Sans";
  src: url("./fonts/study-sans-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Study Sans";
  src: url("./fonts/study-sans-bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
~~~

Use another face for italic when an italic file is available:

~~~css
@font-face {
  font-family: "Study Sans";
  src: url("./fonts/study-sans-italic.woff2") format("woff2");
  font-style: italic;
  font-weight: 400;
  font-display: swap;
}
~~~

For a variable font that supports a weight range, the descriptor can state that range:

~~~css
@font-face {
  font-family: "Study Sans Variable";
  src: url("./fonts/study-sans-variable.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
~~~

Only declare a range that the font file actually supports. A descriptor does not create missing weights or styles in the font file.

### Choose a font display policy

The `font-display` descriptor controls how text is shown while a downloadable face is loading:

- `swap` shows fallback text promptly and swaps to the custom face if it loads.
- `block` may briefly hide text while the browser waits for the face, then uses a fallback if needed.
- `fallback` allows a short block period and a limited swap period.
- `optional` lets the browser decide whether to use the font based on loading conditions.
- `auto` leaves the policy to the browser.

The exact timing can vary by browser. Choose a policy that fits the page, keep a fallback family, and avoid making text depend on a successful font download.

### Understand font source paths

A relative URL in `src` is resolved from the stylesheet file that contains the `@font-face` rule, not from the HTML document that uses the font. For example, if the stylesheet is in `css/site.css` and the font is in `fonts/study-sans.woff2`, the path from that stylesheet is `../fonts/study-sans.woff2`.

Check path spelling and capitalization, especially when files are deployed to a case-sensitive server. A valid rule cannot load a font file from a path that does not exist.

The `format()` hint describes the font resource format. It can help a browser decide whether it can use a listed source. Keep source declarations accurate and use formats supported by the project's target browsers.

## Use `@charset` only when needed

A CSS file's text encoding should be UTF-8. The `@charset` rule, when present, must be at the beginning of the stylesheet. Modern web projects normally save CSS as UTF-8 and do not need to add this rule to every file.

Do not confuse `@charset` with an HTML `<meta charset="UTF-8">` element. One describes stylesheet bytes; the other describes the HTML document encoding.

## Keep font loading resilient

- Include generic fallback families such as `serif` or `sans-serif` after a named family.
- Register normal, italic, and bold faces accurately when separate files are available.
- Avoid downloading faces and character ranges the page does not use.
- Use a font-display policy that keeps content readable while the resource loads.
- Verify that every relative source path points to a file that is part of the project.
- Keep custom-font use optional so users can still read and navigate if loading fails.
- Use fonts with appropriate usage rights for the project.

## Common mistakes

- Putting `@import` after a style rule or another at-rule.
- Assuming an import behaves like a declaration inside a selector.
- Creating a long import chain that makes order difficult to follow.
- Leaving out `font-family` or `src` from an `@font-face` rule.
- Writing `font-weight` or `font-style` descriptors that do not match the font file.
- Forgetting that font URLs are relative to the stylesheet that contains the rule.
- Omitting fallback families from the normal `font-family` declaration.
- Expecting `font-display: swap` to guarantee that the custom font loads successfully.
- Treating `@font-face` descriptors as inherited declarations on page elements.

## Try it yourself

1. Create a stylesheet with an import at the top, then move it below a style rule and observe that it is ignored.
2. Add a print-only import and explain when it applies.
3. Organize a reset, base rules, and component rules into named layers.
4. Register a regular font face and use it with a generic fallback family.
5. Add a separate bold face and compare it with a synthesized bold weight.
6. Change the regular face's descriptor to italic and observe how font matching changes.
7. Change the relative font path and inspect the browser's network panel for a failed request.
8. Compare `font-display: swap` with `font-display: optional` while keeping the same fallback.

## Key points

- At-rules begin with `@`, and each at-rule defines how its following block or statement is parsed.
- `@import` loads another stylesheet and must appear before other valid rules in its stylesheet.
- Imports affect cascade order at their position; use a deliberate stylesheet organization.
- `@font-face` registers a font face through descriptors such as `font-family`, `src`, `font-style`, `font-weight`, and `font-display`.
- A normal `font-family` declaration still needs fallbacks.
- Font source URLs are relative to the stylesheet containing the `@font-face` rule.
- Font descriptors should reflect the actual font resource, and text should remain readable if it fails to load.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [49 - CSS nesting](49-css-nesting.md) | [Q&A](../qnas/50-at-rules-and-imports.md) | [Example](../examples/50-at-rules-and-imports.md) | [51 - Feature queries and progressive enhancement](51-feature-queries-and-progressive-enhancement.md) |
