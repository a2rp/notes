# 14 - Colors and Color Functions

Color values control text, surfaces, borders, outlines, shadows, gradients, and other painted parts of a page. CSS supports named colors, hexadecimal notation, RGB and HSL functions, and newer functions that describe colors in perceptual or wider-gamut spaces.

A color format is a way to describe a color. The selected property determines where that color is used.

## Properties that accept colors

The most common color properties are:

~~~css
.notice {
  color: #172554;
  background-color: #dbeafe;
  border-color: #2563eb;
  outline-color: currentColor;
  text-decoration-color: #1d4ed8;
}
~~~

- color sets the foreground color of text and text decorations that inherit it.
- background-color paints an element's background behind its content and border.
- border-color and outline-color set border and outline colors.
- Other properties, including box-shadow, text-shadow, fill, and stroke, also accept colors.

The background shorthand can set a color along with images and other background features. Use background-color when you only want to set the color and avoid resetting other background values.

## Named colors

CSS provides a set of named colors:

~~~css
.named-colors {
  color: rebeccapurple;
  background-color: aliceblue;
}
~~~

Names are convenient and readable, but the built-in set is finite. Names are case-insensitive, although lowercase is common in stylesheets. Both gray and grey are valid spellings for the same CSS color. Use a deliberate palette instead of relying on a name when exact brand colors matter.

The transparent keyword represents a fully transparent color. It can be useful for backgrounds and gradients. A transparent color has zero alpha and black color channels, so do not assume transparent is the same as a partially transparent version of the nearby color.

## Hexadecimal colors

Hex notation represents red, green, and blue channels, with an optional alpha channel:

~~~css
.hex-colors {
  color: #1e40af;
  background-color: #e0f2fe;
  border-color: #1e40af80;
}
~~~

The supported forms are:

| Form | Meaning |
| --- | --- |
| #RGB | Short red, green, and blue channels |
| #RGBA | Short red, green, blue, and alpha channels |
| #RRGGBB | Full red, green, and blue channels |
| #RRGGBBAA | Full red, green, blue, and alpha channels |

Each short hexadecimal digit is repeated to form its full channel. For example, #39c is equivalent to #3399cc. In the eight-digit form, alpha comes last: #RRGGBBAA. An alpha byte of ff is fully opaque and 00 is fully transparent.

Hex notation is compact and common in design files. The channel values are less easy to adjust by eye than hue, saturation, and lightness.

## RGB colors

RGB describes red, green, and blue channels. Modern syntax separates the channels with spaces and uses a slash before optional alpha:

~~~css
.rgb-colors {
  color: rgb(30 64 175);
  background-color: rgb(224 242 254 / 80%);
}
~~~

The three channels can be written as numbers in the 0 to 255 range or as percentages. Alpha can be a number from 0 to 1 or a percentage from 0% to 100%. An alpha of 1 is opaque, and 0 is transparent.

Older comma-separated syntax is still encountered:

~~~css
.legacy-rgb {
  color: rgb(30, 64, 175);
  background-color: rgba(224, 242, 254, 0.8);
}
~~~

In older syntax, alpha is supplied as a fourth comma-separated argument. The rgba() spelling is retained as an alias. For new stylesheets, use the modern space-separated form so the channel and alpha separators are easy to see. Do not mix the comma-separated and space-separated forms in one function.

RGB is useful when values come from an image editor, brand guide, or color picker that reports red, green, and blue channels.

## HSL colors

HSL describes a color using hue, saturation, and lightness:

~~~css
.hsl-colors {
  color: hsl(225 71% 40%);
  background-color: hsl(200 80% 94%);
  border-color: hsl(225 71% 40% / 65%);
}
~~~

- Hue describes a position around a color wheel. It can be written as an angle, usually in degrees.
- Saturation describes how vivid or muted the color is.
- Lightness describes how light or dark the color is.

In HSL, saturation and lightness are percentages. At 0% lightness, the result is black; at 100% lightness, it is white. At 0% saturation, the color is a gray at that lightness. Hue does not change an achromatic color when saturation is zero.

HSL makes it straightforward to create lighter or darker variations while keeping hue and saturation similar. Equal HSL lightness values do not always look equally bright to people. For carefully balanced color scales, a perceptual color space can be a better starting point.

The older hsl() and hsla() comma-separated forms still appear in existing code. Modern hsl() syntax uses spaces and a slash for alpha, as shown above.

## HWB colors

HWB describes a color using hue, whiteness, and blackness:

~~~css
.hwb-color {
  color: hwb(225 15% 20%);
}
~~~

Hue selects the color family, then whiteness and blackness adjust how much white or black is mixed into it. HWB also supports optional alpha after a slash. It is another way to describe sRGB colors, and you can use it when its controls match the way you think about a color.

## Alpha transparency and opacity

Alpha is the transparency component of a color. It can be included in hex, RGB, HSL, HWB, and other color functions:

~~~css
.translucent-surface {
  background-color: rgb(37 99 235 / 25%);
}
~~~

This makes that background color translucent so the painted content behind it can show through.

The opacity property behaves differently:

~~~css
.translucent-element {
  opacity: 0.25;
}
~~~

opacity applies to the rendered element as a group, including its text, background, borders, and descendants. Color alpha affects only the color value where it is set. If only a background should be translucent, use alpha in background-color rather than lowering opacity on the entire element.

Avoid using opacity alone to make text appear disabled or secondary if it makes the text hard to read. Choose a suitable foreground color and keep text legible against its background.

## currentColor and system colors

currentColor represents the element's color property. It helps related parts of a component share one foreground color:

~~~css
.icon-button {
  color: #1d4ed8;
  border: 2px solid currentColor;
  box-shadow: 0 0 0 3px rgb(29 78 216 / 15%);
}
~~~

The border uses the same color as the text. If the color changes, both update together. The keyword is written with that capitalization in examples, but CSS keywords are case-insensitive.

System color keywords such as Canvas and CanvasText can refer to colors chosen by the browser or user's environment. They can help styles remain compatible with settings such as forced colors:

~~~css
.system-color-example {
  color: CanvasText;
  background-color: Canvas;
  border: 1px solid CanvasText;
}
~~~

Use system colors when adapting to user or browser color settings, not as substitutes for an intentional brand palette.

## Lab, LCH, Oklab, and OkLCh

RGB, HSL, and HWB describe colors in the sRGB color family. CSS also supports color spaces designed to describe colors independently of a particular display or in ways that better match human perception.

~~~css
.perceptual-colors {
  background-color: oklch(62% 0.16 250);
  border-color: oklab(55% -0.02 -0.12);
}
~~~

The Lab and Oklab functions use lightness and two rectangular color coordinates. The LCH and OkLCh functions use lightness, chroma, and hue:

| Function | Components |
| --- | --- |
| lab() | Lightness, a axis, b axis |
| lch() | Lightness, chroma, hue |
| oklab() | Oklab lightness, a axis, b axis |
| oklch() | Oklab lightness, chroma, hue |

The LCH forms are convenient for making palettes because hue and chroma are separate controls. Oklab and OkLCh are designed to be more perceptually uniform than older Lab and LCH spaces for many color operations. The values are not interchangeable with HSL values. Do not copy a hue or lightness number from one color space into another and expect the same result.

A color can be valid CSS but outside the range a particular screen can display. This is called being out of gamut. Browsers map colors to the output device, so a color may appear less vivid on a screen with a smaller gamut.

## The color() function and wider-gamut colors

The color() function names a color space and provides its component values. For example, display-p3 can express some colors outside the sRGB gamut:

~~~css
.wide-gamut-sample {
  background-color: rgb(235 70 55);
  background-color: color(display-p3 0.95 0.18 0.12);
}
~~~

The first declaration is an sRGB fallback. A browser that understands the later color() declaration uses that value. A display that cannot show the full color range may show a mapped approximation.

Other predefined color spaces include srgb, srgb-linear, a98-rgb, prophoto-rgb, rec2020, and xyz variants. Most everyday interfaces can use sRGB colors. Use wider-gamut values when the design and target displays call for them, and keep a fallback for clients that do not support the required syntax.

## Mixing and modifying colors

The color-mix() function combines two colors in a selected interpolation space:

~~~css
.mixed-color {
  background-color: #3157b7;
  background-color: color-mix(in oklab, #3157b7 75%, white);
}
~~~

Here the second declaration mixes 75% of the blue color with 25% white in Oklab. The percentages normally add to 100%. If a value is omitted, the function distributes the remaining share. Choose the interpolation space intentionally because the same pair can produce different intermediate colors in different spaces.

Relative color syntax can derive a color from another color and reuse or adjust its components:

~~~css
:root {
  --brand: #3157b7;
}

.relative-color {
  color: hsl(from var(--brand) h s 92%);
}
~~~

This example takes the source color's hue and saturation, then sets lightness to 92%. Relative color syntax is useful for deriving related states, but it is more advanced than choosing a fixed palette.

The light-dark() function can select one color for a light color scheme and another for a dark color scheme. The element's color-scheme determines which value is used:

~~~css
:root {
  color-scheme: light dark;
}

.scheme-aware-card {
  color: light-dark(#172554, #e0e7ff);
  background-color: light-dark(#eff6ff, #172554);
}
~~~

Some color functions and syntaxes are newer than named colors, hex, RGB, and HSL. Support varies across browsers and versions. Put a simple fallback declaration first, check the target browser support, and use feature queries when a fallback must be explicit.

## Using colors accessibly

Color is one part of a visual design, and it should not be the only way to communicate information.

- Use text labels, icons, shapes, or patterns in addition to color for status and meaning.
- Check that text remains readable against its background.
- Check interactive states, focus indicators, disabled states, and data visualizations.
- Test designs in light and dark schemes, forced colors, and with color-vision differences in mind.
- Do not assume that a pair that looks distinct to you will be distinct to every reader.

A color contrast checker can help evaluate foreground and background pairs, but contrast alone does not guarantee readability. Font size, weight, spacing, and surrounding colors also matter.

## Choosing a color format

- Use named colors for simple demonstrations when an exact shade is not important.
- Use hex or RGB when values come from a design tool, image, or brand palette.
- Use HSL when you want to adjust hue, saturation, and lightness separately.
- Use OkLCh when you want to create or adjust perceptual color scales.
- Use color() for an explicitly named color space such as Display P3.
- Use alpha when one paint color should be translucent; use opacity only when the whole element should fade.
- Use currentColor when text, borders, and icons should share the same foreground color.
- Use newer functions with fallbacks when older clients are part of your support target.

## Common mistakes

### Putting a space in hexadecimal notation

A hex color is written as one token, such as #2563eb. Spaces split it into invalid CSS tokens.

### Putting the alpha byte in the wrong place

In eight-digit hex notation, alpha comes last. #2563eb80 has a semi-transparent alpha channel; it does not put alpha before the blue channel.

### Mixing separators in a color function

Modern RGB and HSL syntax uses spaces between channels and a slash before alpha. Legacy syntax uses commas. Do not combine the styles in one function.

### Using percentages where the function expects another component

HSL saturation and lightness use percentages. An OkLCh hue is an angle, while chroma is a number. Follow the component grammar for the selected function.

### Lowering opacity on a parent to fade only its background

opacity fades the entire rendered element, including text and child elements. Put alpha in the background color when only that surface should be translucent.

### Assuming HSL lightness is perceived brightness

HSL is useful for direct adjustments, but equal lightness values across different hues do not necessarily look equally bright. Consider Oklab or OkLCh for perceptually-oriented palette adjustments.

### Depending on a new function without a fallback

If a browser does not understand a color declaration, it ignores that declaration. Put a usable fallback first or guard newer syntax with @supports.

## Try it yourself

1. Write one blue color as a named color, a short or full hex color, an RGB value, and an HSL value.
2. Add an alpha value to a background color. Compare it with setting opacity on the whole card.
3. Change an HSL color's hue while keeping its saturation and lightness fixed.
4. Use currentColor for a border, then change the element's color and observe both.
5. Make a two-color color-mix() value and change its percentages while keeping their total at 100%.
6. Compare a color-mix() result in srgb and oklab.
7. Create a lighter related shade with relative HSL color syntax, then add a fixed fallback before it.
8. Add a light and dark value with light-dark() and set color-scheme: light dark.
9. Review an interface state that currently uses only color. Add a text label or other visual cue.
10. Check text and control colors against their backgrounds in the themes you support.

## Key points

- CSS colors can be written as names, hex, RGB, HSL, HWB, Lab/LCH, Oklab/OkLCh, and color() values.
- RGB, HSL, and HWB describe colors in the sRGB family; color() can name other color spaces.
- Modern color functions separate channels with spaces and use a slash before alpha.
- Hex alpha is at the end of the color notation; alpha 1 or 100% is opaque and 0 is transparent.
- Color alpha changes one paint color, while opacity fades the whole rendered element and its descendants.
- currentColor reuses the element's color property.
- Perceptual spaces can help with palette work, but their component values are not interchangeable with HSL.
- Newer color functions need suitable fallbacks for the browsers a project supports.
- Do not rely on color alone to convey important information.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [13 - Values, Units, and Percentages](13-values-units-and-percentages.md) | [Q&A](../qnas/14-colors-and-color-functions.md) | [Example](../examples/14-colors-and-color-functions.md) | [15 - CSS math functions: calc, min, max, and clamp](15-css-math-functions.md) |