# 34 - Fonts and Typography

Typography is how text looks and reads on a page. CSS lets you choose a font family, set its size and weight, control line spacing, and keep text comfortable across different screens.

## Learning outcomes

After this chapter, you should be able to:

- Build a font family stack with suitable fallbacks.
- Set a readable type scale, font weight, style, and line height.
- Load a local web font with `@font-face` and provide a fallback.
- Use the `font` shorthand without accidentally resetting other font properties.
- Apply basic text alignment, spacing, and transformation.
- Make typography usable when fonts fail to load or users zoom the page.

## Font family stacks

The `font-family` property accepts an ordered list of font families. The browser tries the first family, then moves through the list until it finds an available font that can display the text.

~~~css
body {
  font-family: "Segoe UI", Arial, sans-serif;
}
~~~

A family name containing spaces is quoted. A generic family such as `sans-serif` at the end gives the browser a category to use if the named families are unavailable.

Common generic families include:

| Generic family | General appearance |
| :--- | :--- |
| `serif` | Letters with small finishing strokes |
| `sans-serif` | Letters without finishing strokes |
| `monospace` | Characters designed with equal-width advances |
| `cursive` | Handwriting-like letterforms |
| `fantasy` | Decorative display faces |
| `system-ui` | The platform's default user-interface typeface |

A generic family is a category, not a specific font file. The actual font can differ between operating systems and browsers. Keep a generic fallback at the end of a font stack.

~~~css
.article {
  font-family: Georgia, "Times New Roman", serif;
}

.code-sample {
  font-family: Consolas, "Courier New", monospace;
}
~~~

The browser may also choose a fallback font for individual characters that the selected face does not contain. This is useful for mixed-language text and symbols. Setting an accurate HTML `lang` attribute helps browsers and assistive technologies interpret text correctly.

## Font size and a type scale

`font-size` controls the size of text. Relative units make it easier for text to respond to user settings and the surrounding design.

- `rem` is relative to the root element's font size. It is a useful unit for a consistent site-wide scale.
- `em` is relative to the element's font size context. Nested use can compound.
- `px` is a fixed CSS length and can be useful for small details, but avoid making all text a fixed pixel size.
- `%` and viewport units can express relative sizing, though viewport-only sizing can become too small or too large at the extremes.

~~~css
:root {
  font-size: 100%;
}

body {
  font-size: 1rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
~~~

`clamp(minimum, preferred, maximum)` creates a size that can grow with the viewport while staying within limits. The root font size above remains the browser default so user preferences can influence the scale.

A type scale uses a small set of related sizes for headings, body text, labels, and supporting text. Keeping the number of sizes manageable helps a page feel consistent.

~~~css
:root {
  --text-small: 0.875rem;
  --text-body: 1rem;
  --text-lead: 1.25rem;
  --heading-large: clamp(2rem, 5vw, 3.5rem);
}

body {
  font-size: var(--text-body);
}

.lead {
  font-size: var(--text-lead);
}

h1 {
  font-size: var(--heading-large);
}
~~~

Avoid setting very small text just to fit more words into a fixed area. Let content wrap, adjust the layout, or shorten the text instead.

## Weight and style

`font-weight` sets how heavy the glyphs appear. Common values are `400` for normal weight and `700` for bold. The keywords `normal` and `bold` correspond to those common values.

~~~css
body {
  font-weight: 400;
}

h1,
h2 {
  font-weight: 700;
}
~~~

A font family may provide only some weights. When a requested weight is missing, the browser selects the closest available face or may synthesize a heavier or slanted appearance. Do not assume that declaring a weight means the font files contain that exact design.

Variable fonts can contain a range of weights in one file. When using one, describe the supported range in the `@font-face` rule:

~~~css
@font-face {
  font-family: "Notes Sans";
  src: url("../fonts/notes-sans-variable.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
~~~

The file path is relative to the stylesheet. This example expects a font file in a local `fonts` folder. If that file is unavailable, the family stack should still provide a usable alternative.

`font-style` commonly uses `normal` or `italic`. Use italic sparingly for emphasis or for text that is actually styled as an alternate voice. Do not rely on slant alone to communicate meaning.

## Line height and reading width

`line-height` controls the height of a line box. A unitless value is usually flexible because it scales with each element's font size.

~~~css
body {
  line-height: 1.6;
}

h1 {
  line-height: 1.1;
}
~~~

Body text often needs more line spacing than a large heading. A value such as `1.5` or `1.6` is a common starting point for body copy, but inspect the actual font and layout. Avoid a fixed line-height that becomes cramped when users increase text size.

Long lines can make it harder to find the beginning of the next line. Limit the width of reading text when appropriate:

~~~css
.article {
  max-width: 68ch;
}
~~~

`ch` is based on the width of the `0` glyph in the current font. It gives an approximate character-based width, not an exact count of characters in every line. Check paragraphs at narrow and wide viewports.

## Font shorthand

The `font` shorthand can set several font properties at once. It requires a font size and a font family. The line height, if specified, follows the size after a slash.

~~~css
.card-title {
  font: 700 1.25rem / 1.3 "Segoe UI", Arial, sans-serif;
}
~~~

This sets a bold weight, a size of `1.25rem`, a line height of `1.3`, and a family stack.

A shorthand resets the font subproperties it leaves out to their initial values. If you only want to change weight or size, use that longhand property rather than rewriting the entire shorthand. The `font` shorthand also has special system-font keywords, which are a separate form.

## Loading a local web font

`@font-face` makes a font file available to the page under a family name you choose:

~~~css
@font-face {
  font-family: "Notes Sans";
  src: url("../fonts/notes-sans-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

body {
  font-family: "Notes Sans", Arial, sans-serif;
}
~~~

The `src` descriptor identifies the local font file. `font-display: swap` allows fallback text to appear while the font is loading, then swaps in the web font if it becomes available.

For a family with several separate files, declare each file with matching style and weight descriptors:

~~~css
@font-face {
  font-family: "Notes Sans";
  src: url("../fonts/notes-sans-regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Notes Sans";
  src: url("../fonts/notes-sans-bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
~~~

If a required font file cannot be found or decoded, the browser continues to the next family in `font-family`. Keep the fallback stack even when you ship your own font. Use only the font files and character ranges your page needs.

## Text alignment and spacing

`text-align` controls how inline content is aligned inside a block:

~~~css
.article {
  text-align: start;
}

.legal-copy {
  text-align: justify;
}
~~~

`start` follows the text direction, so it is generally more adaptable than hard-coding `left`. Justified text can create uneven spaces between words, especially in narrow columns. Use it only when it suits the content and language.

`letter-spacing` adjusts the space between characters. `word-spacing` adjusts spaces between words:

~~~css
.navigation-label {
  letter-spacing: 0.04em;
}

.reading-copy {
  word-spacing: 0.02em;
}
~~~

Use spacing adjustments carefully. Too much letter spacing can make connected letterforms harder to read, and negative spacing can cause letters to collide.

## Text transformation and capitalization

`text-transform` changes how text is displayed without changing the underlying HTML text:

~~~css
.category-label {
  text-transform: uppercase;
}
~~~

Keep the original text meaningful and correctly capitalized in HTML. CSS casing is a visual treatment and may not match every language's capitalization rules. Long passages in all caps are harder to scan, so reserve it for short labels.

## Typography and inclusive design

- Keep body text readable and let users zoom the page.
- Avoid fixed-height text containers that clip enlarged text.
- Preserve a clear hierarchy without using font size or weight as the only signal for meaning.
- Provide a font fallback that can display the page if a web font fails.
- Use the document's correct `lang` attribute for the language of its text.
- Check the result with actual content, including names, punctuation, and the scripts your page supports.

## Common mistakes

| Mistake | Why it causes trouble | Better approach |
| :--- | :--- | :--- |
| Listing only one named font | It may not be installed or available | Add a generic family at the end |
| Using `font-size: 12px` for all text | Text does not follow the user's preferred root size | Use a relative type scale for most text |
| Setting a tiny fixed `line-height` | Enlarged text can overlap or clip | Use a unitless line-height and check zoom |
| Loading a web font without a fallback | Text can become unusable if the font fails | Keep a complete `font-family` stack |
| Using `font` to change only one property | The shorthand resets omitted font subproperties | Change the relevant longhand property |
| Applying wide letter spacing to paragraphs | Word shapes become harder to recognize | Use small spacing changes only when needed |
| Using uppercase for long passages | It slows scanning and can be language-sensitive | Keep uppercase to short labels |

## Try it yourself

1. Create a font stack with a named family and a generic fallback.
2. Set a body size in `rem` and a responsive heading size with `clamp()`.
3. Set a unitless `line-height` and inspect paragraphs at several text sizes.
4. Add a local `@font-face` rule with `font-display: swap` and keep a fallback stack.
5. Use `text-align: start` and compare it with `text-align: justify` on a paragraph.
6. Increase browser zoom and confirm that headings, buttons, and paragraph text remain visible.

## Key points

- A family stack gives the browser ordered font choices and a generic fallback.
- Relative font sizes and unitless line heights adapt more naturally to user settings.
- Font weight availability depends on the font faces that are installed or loaded.
- A web font needs correct descriptors and a useful fallback.
- The `font` shorthand resets omitted font subproperties.
- Typography should remain readable when fonts fail, text grows, or the layout narrows.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [33 - Backgrounds and gradients](33-backgrounds-and-gradients.md) | [Q&A](../qnas/34-fonts-and-typography.md) | [Example](../examples/34-fonts-and-typography.md) | [35 - Text layout, spacing, and wrapping](35-text-layout-and-wrapping.md) |
