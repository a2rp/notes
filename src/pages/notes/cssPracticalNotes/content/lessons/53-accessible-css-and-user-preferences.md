# 53 - Accessible CSS and user preferences

Accessible CSS helps people read, understand, and use a page across different devices, settings, and abilities. Good styles remain usable when text is enlarged, colors are changed, motion is reduced, or the page is printed.

CSS can respond to user preferences, but a media query is only one part of an accessible interface. Keep content meaningful in HTML, use sufficient contrast, avoid relying on color alone, and make layouts adapt to available space.

## Learning outcomes

After this chapter, you should be able to:

- Build readable CSS with adaptable sizing and layout.
- Adapt colors to a light or dark color-scheme preference.
- Reduce non-essential motion when requested.
- Respond to increased contrast preferences and forced colors mode.
- Provide a useful print stylesheet.
- Explain why preference queries do not replace accessible defaults.

## Start with readable defaults

Set a clear text and page background, use a comfortable line height, and avoid fixed dimensions that can clip text when it grows:

~~~css
body {
  margin: 0;
  color: #243447;
  background-color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

.page {
  width: min(100% - 2rem, 68rem);
  margin-inline: auto;
}

.card {
  min-width: 0;
  padding: 1rem;
}
~~~

Use relative units such as `rem`, flexible widths, and content-driven height where possible. Avoid fixed heights for text containers. A layout should tolerate zoom and narrow viewports without hiding content or forcing horizontal scrolling for ordinary reading.

Choose text and background colors as a pair and check their contrast. WCAG 2.2 Success Criterion 1.4.3 sets minimum contrast ratios for text, with specified exceptions. Do not use color as the only signal for meaning. Pair color with text, a shape, a border, or another visible cue.

## Support the preferred color scheme

The `prefers-color-scheme` media feature can match a user's light or dark preference. Start with a complete default palette and override the colors together:

~~~css
:root {
  color-scheme: light dark;
  color: #243447;
  background-color: #ffffff;
}

.card {
  color: #243447;
  background-color: #f3f6fa;
  border: 1px solid #7b8794;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #e8eef5;
    background-color: #151b23;
  }

  .card {
    color: #e8eef5;
    background-color: #202a36;
    border-color: #aab6c3;
  }
}
~~~

The `color-scheme` property tells the browser which schemes the page supports. Browser-provided controls, scrollbars, and other user interface can then use a matching scheme. It does not invent an accessible palette for author-defined colors. Set foreground and background colors that work together in each scheme.

A dark scheme is a palette choice, not an automatic accessibility improvement. Check the text, links, borders, controls, and states in both palettes.

## Respect reduced-motion preferences

Some people are sensitive to motion, and some motion can distract from content. The `prefers-reduced-motion` feature can remove or simplify non-essential movement:

~~~css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .loading-indicator {
    animation: none;
  }

  .card {
    transition: none;
  }
}
~~~

Prefer to prevent non-essential motion or provide a static alternative. Do not use an animation to convey information unless that information is also available in another way. A CSS preference rule does not provide a pause button for an animation that needs one.

Avoid applying a broad reset without considering each effect. Identify which animations and transitions are present, then remove, shorten, or replace the ones that can cause discomfort while preserving understandable state changes.

## Respond to contrast preferences

The `prefers-contrast` feature can report values such as `more`, `less`, or `custom`. Be specific about which preference a rule handles:

~~~css
@media (prefers-contrast: more) {
  .card {
    border-width: 2px;
  }

  a {
    text-decoration-thickness: 0.12em;
  }
}
~~~

A more explicit border or link underline can make boundaries and links easier to identify. Continue to meet the contrast needs of the content by default. A preference query should enhance the experience, not be the only thing making text readable.

Do not use an unqualified `@media (prefers-contrast)` to apply a high-contrast palette. It can match preferences other than `more`. If responding to a specific preference, name its value.

## Work with forced colors mode

Forced colors mode lets the browser apply a user-selected color palette. The `forced-colors` media feature can identify that mode. In most cases, let the browser adjust colors. If a component needs an explicit boundary, system colors can preserve a visible distinction:

~~~css
@media (forced-colors: active) {
  .card {
    border: 1px solid CanvasText;
  }

  .action {
    border: 1px solid ButtonText;
  }
}
~~~

System colors such as `Canvas`, `CanvasText`, `ButtonFace`, `ButtonText`, and `LinkText` represent colors from the active system palette. They can help CSS use the user's chosen colors.

Avoid using `forced-color-adjust: none` as a way to preserve a brand palette. It opts an element out of the user's color adjustment and can make content harder to see. Reserve it for carefully tested cases where preserving the original colors is necessary to understand the content.

Do not rely only on shadows, background images, or subtle background colors to communicate a boundary or state. These may not remain visible in a forced palette. Include a border, text, or another robust cue where needed.

## Keep layouts usable when content changes

Accessible layouts work with enlarged text, translated content, and narrow windows:

- Use flexible grid or flex layouts rather than fixed-width columns.
- Let text wrap and containers grow in height.
- Avoid clipping with fixed heights and `overflow: hidden` around important text.
- Use a comfortable line length for long passages.
- Make controls large enough for their content and labels.
- Test at narrow widths and with text zoom.

A fixed width can make content difficult to read when zoomed. Use a maximum width for long text while allowing the container to shrink:

~~~css
.article {
  width: 100%;
  max-width: 70ch;
  margin-inline: auto;
  padding-inline: 1rem;
}
~~~

## Provide a print stylesheet

A print media query can remove controls that do not belong on paper and keep text and borders clear:

~~~css
@media print {
  body {
    color: #000000;
    background: #ffffff;
  }

  .screen-only,
  nav {
    display: none;
  }

  .card {
    border: 1px solid #555555;
    box-shadow: none;
    break-inside: avoid;
  }
}
~~~

Do not require a colored background to distinguish sections. Browsers and users may suppress background printing to save ink. If a distinction matters on paper, use text, spacing, headings, or borders as well.

## Preference queries are enhancements, not defaults

The user agent may not expose a particular preference, and a user may not have set one. Styles outside preference queries still need to be usable. For example:

- Text must be readable before a dark-mode override is applied.
- Links need an identifying cue beyond color.
- Content should not depend on animation to communicate a change.
- A component should remain understandable when author colors are replaced.
- Printed pages should still identify sections when backgrounds are omitted.

Check the complete design at default settings and under each supported preference. Preference values describe a user's preference, not a guarantee about their exact display, lighting, or abilities.

## Common mistakes

- **Changing only the background in dark mode:** The foreground, cards, borders, links, and controls can become unreadable if their colors are not considered together.
- **Assuming `color-scheme` styles every author element:** It helps browser-provided UI; authors still need suitable colors for their own content.
- **Animating essential information:** Reduced motion can remove movement, so the underlying state must remain understandable.
- **Using a general contrast query to impose one direction:** Specify `prefers-contrast: more` when responding specifically to a request for more contrast.
- **Overriding forced colors unnecessarily:** The user palette may be an essential accessibility setting.
- **Using color alone:** Provide another cue for errors, links, selection, and status.
- **Fixing text container heights:** Enlarged text or translation can be clipped.
- **Making print depend on background color:** Backgrounds can be omitted by browser or user print settings.

## Try it yourself

1. Add a dark color scheme and update text, surface, border, and link colors together.
2. Check the scheme with form controls and browser UI by setting `color-scheme` appropriately.
3. Add a decorative animation, then remove or replace it for `prefers-reduced-motion: reduce`.
4. Increase card border and link underline visibility for `prefers-contrast: more`.
5. Test a card in forced colors mode and make its boundary visible without relying on a shadow.
6. Add a print stylesheet that removes navigation and preserves section boundaries without background fills.
7. Narrow the viewport and enlarge the text. Fix any clipping or horizontal scrolling.
8. Remove color from a status indicator and add a second cue that still communicates its meaning.

## Key points

- Start with readable defaults that do not depend on a preference being detected.
- Pair foreground and background colors, and do not use color as the only cue.
- `prefers-color-scheme`, `prefers-reduced-motion`, and `prefers-contrast` can adapt presentation to user preferences.
- Let forced colors mode use the user's palette; use system colors for necessary visible boundaries.
- Flexible sizing and content-driven heights help when text is enlarged or translated.
- Print styles should preserve meaning when backgrounds are omitted.
- Preference queries enhance accessibility, but they do not replace semantic content or sound defaults.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [52 - Scoped styles and component styling](52-scoping-and-component-styles.md) | [Q&A](../qnas/53-accessible-css-and-user-preferences.md) | [Example](../examples/53-accessible-css-and-user-preferences.md) | [54 - Focus styles and keyboard interaction](54-focus-and-keyboard-interaction.md) |
