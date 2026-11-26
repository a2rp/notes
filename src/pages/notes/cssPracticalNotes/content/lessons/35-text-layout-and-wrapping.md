# 35 - Text layout, spacing, and wrapping

CSS text layout controls how text fits inside its available space. Alignment, white-space handling, line breaking, and spacing all affect whether content is easy to read on different screens and in different languages.

## Learning outcomes

After this chapter, you should be able to:

- Align text with logical values such as `start` and `end`.
- Explain how `white-space` controls collapsing and wrapping.
- Handle long URLs and identifiers without forcing every word to break.
- Enable language-aware hyphenation with the correct document language.
- Adjust letter spacing, word spacing, and first-line indentation carefully.
- Use balanced wrapping for short headings when supported.
- Diagnose text that overflows or becomes difficult to read.

## Text wraps inside a line box

A block of text lays out within the inline size available to it. In a typical horizontal page, that is the available width. The browser uses the language, writing system, characters, spaces, and CSS properties to find line break opportunities.

Text usually wraps at spaces. Other writing systems can use different line-breaking rules. A long URL, product code, or other unbroken string may not have an ordinary break opportunity, so it may overflow its container.

Give text enough room to wrap before applying more aggressive break rules:

~~~css
.article {
  max-width: 68ch;
  line-height: 1.65;
}
~~~

A comfortable reading width depends on the font, language, and layout. The `ch` unit approximates a character-based measure using the width of the current font's `0` glyph. It is not an exact character count.

## Text alignment

`text-align` aligns inline content within a block:

~~~css
.article {
  text-align: start;
}

.hero-title {
  text-align: center;
}
~~~

Common values include:

| Value | Result |
| :--- | :--- |
| `start` | Aligns with the start edge of the current writing direction |
| `end` | Aligns with the end edge of the current writing direction |
| `left` | Aligns with the physical left edge |
| `right` | Aligns with the physical right edge |
| `center` | Centers inline content |
| `justify` | Expands spacing so most lines reach both edges |

Use `start` and `end` when the alignment should follow text direction. Physical values such as `left` and `right` are useful when the design depends on a physical side.

Justified text can create large or uneven spaces between words, particularly in narrow columns. It can be appropriate for some layouts and languages, but check actual paragraphs. Do not use justification as a substitute for a comfortable line length.

`text-align-last` controls the alignment of the final line in a block:

~~~css
.article {
  text-align: justify;
  text-align-last: start;
}
~~~

## White space and wrapping

In normal HTML flow, sequences of spaces and line breaks in the source are generally collapsed into a single space. The `white-space` property controls whether spaces and newlines are preserved and whether text may wrap.

| Value | Collapses repeated spaces? | Preserves source line breaks? | Allows wrapping? |
| :--- | :--- | :--- | :--- |
| `normal` | Yes | No | Yes |
| `nowrap` | Yes | No | No |
| `pre` | No | Yes | No |
| `pre-wrap` | No | Yes | Yes |
| `pre-line` | Yes | Yes | Yes |
| `break-spaces` | No | Yes | Yes |

Examples:

~~~css
.navigation {
  white-space: nowrap;
}

.user-entered-message {
  white-space: pre-wrap;
}

.poem {
  white-space: pre-line;
}
~~~

Use `normal` for most content. `nowrap` can be useful for a short label or a compact control, but a long no-wrap item can make a narrow page overflow. Use `pre` for content such as code where spaces and line breaks must remain exactly as written, and make sure it can fit or scroll on small screens. `pre-wrap` preserves spaces and line breaks while allowing wrapping.

## Long words and unbroken strings

For ordinary words and sentences, keep the browser's usual language-aware break behavior. For long identifiers, user-entered strings, or URLs that might otherwise overflow, use `overflow-wrap`:

~~~css
.user-content {
  overflow-wrap: anywhere;
}
~~~

`anywhere` allows a long unbroken sequence to wrap at an emergency opportunity if it cannot otherwise fit. This is useful for robustness, but it can split a word or identifier visually.

`word-break: break-all` can break text between nearly any characters, even when a normal break would be preferable:

~~~css
.code-token {
  word-break: break-all;
}
~~~

Use it only when breaking arbitrary strings is the intended behavior. For normal paragraphs, prefer `overflow-wrap: anywhere` on the specific content that needs protection.

## Hyphenation and language

`hyphens: auto` allows a browser to insert language-appropriate hyphens when a word needs to break:

~~~css
.article {
  hyphens: auto;
}
~~~

Automatic hyphenation depends on the language being known and on browser language resources. Mark the document with the correct language:

~~~html
<html lang="en">
~~~

For a passage in another language, put the appropriate `lang` value on that element. Hyphenation results vary with language and browser, so review them with representative text. Use `hyphens: manual` when you only want author-supplied soft hyphen opportunities to be considered.

## Balanced text wrapping

The `text-wrap` property can influence how lines are distributed:

~~~css
h1 {
  text-wrap: balance;
}
~~~

`balance` is useful for short blocks such as headings, where it can make the final line less short than the lines above it. It does not replace a sensible text width or font size. Use it on short headings and labels rather than long pages of body copy.

Some browsers also support `text-wrap: pretty` to improve paragraph line endings. Text wrapping features can vary by browser and may change how content breaks, so provide a readable default and check the browsers your page supports.

## Letter spacing and word spacing

`letter-spacing` adjusts spacing between typographic characters. `word-spacing` adjusts spacing between words:

~~~css
.eyebrow {
  letter-spacing: 0.08em;
}

.article {
  word-spacing: 0.02em;
}
~~~

Spacing adjustments should be small and purposeful. Too much letter spacing makes words harder to recognize and may interfere with writing systems that shape characters together. Avoid using large negative values to force text into a fixed box.

## First-line indentation

`text-indent` indents the first line of a block. It does not add space before the whole element:

~~~css
.article p + p {
  text-indent: 1.5em;
}
~~~

For many web layouts, paragraph margins are clearer than indented first lines. Use an indentation when it fits the design and writing convention. Do not indent the first paragraph after a heading without a deliberate reason.

## Truncation and hidden text

A one-line ellipsis pattern often combines several properties:

~~~css
.single-line-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
~~~

This is appropriate for a compact label when the full value is available elsewhere or can be revealed. It hides part of the visible text, so do not use it to silently remove required instructions, names, or other essential content.

## Common mistakes

| Mistake | Why it causes trouble | Better approach |
| :--- | :--- | :--- |
| Using `white-space: nowrap` on a long paragraph | Lines cannot wrap and may overflow | Use `normal` for body text |
| Applying `word-break: break-all` to every paragraph | Words can split at awkward points | Keep normal breaks and use `overflow-wrap` for long strings |
| Justifying a narrow text column | Word spacing can become uneven | Use start alignment or increase the column width |
| Using `text-align: left` for every language | It may not follow right-to-left direction | Use `text-align: start` when alignment follows text flow |
| Enabling automatic hyphenation without `lang` | The browser may not know which rules to apply | Set the correct language in HTML |
| Increasing letter spacing substantially | Reading and character shaping can suffer | Make small changes and check the language and font |

## Try it yourself

1. Add `white-space: pre-wrap` to a paragraph containing several spaces and source line breaks.
2. Put a long URL or identifier in a narrow card and use `overflow-wrap: anywhere`.
3. Compare `text-align: start` with `text-align: justify` on a long paragraph.
4. Add `lang` to the document and test `hyphens: auto` with a long word.
5. Apply `text-wrap: balance` to a short heading and inspect it at several widths.
6. Increase or decrease letter spacing slightly, then check whether the text is still comfortable to read.

## Key points

- Text wraps according to the available inline size, language, writing system, and CSS rules.
- `white-space` controls both whitespace preservation and wrapping behavior.
- Use `overflow-wrap: anywhere` selectively for long strings that could overflow.
- Automatic hyphenation needs language information and can vary by browser.
- Logical alignment values adapt to writing direction.
- Treat spacing, justification, and truncation as readability decisions, not ways to squeeze text into a fixed box.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [34 - Fonts and typography](34-fonts-and-typography.md) | [Q&A](../qnas/35-text-layout-and-wrapping.md) | [Example](../examples/35-text-layout-and-wrapping.md) | [36 - Lists and markers](36-lists-and-markers.md) |
