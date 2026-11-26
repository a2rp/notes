# 14 - Colors and Color Functions: Questions and Answers

Use these questions to practise reading CSS color values, choosing color formats, understanding transparency, and using newer color functions carefully. Each answer follows its question.

## Multiple-choice questions

### 1. Which value is a valid six-digit hexadecimal color?

- A. #12FG89
- B. #12 34 56
- C. #123456
- D. 123456#

**Answer: C.** A full hex color uses six hexadecimal digits after the # sign. Hex digits can be 0 to 9 and A to F.

### 2. Which hex form includes red, green, blue, and alpha channels with full precision?

- A. #RGB
- B. #RGBA
- C. #RRGGBB
- D. #RRGGBBAA

**Answer: D.** Eight-digit hex uses two digits per channel, with the alpha channel at the end.

### 3. In #33669980, which part is the alpha channel?

- A. 33
- B. 66
- C. 99
- D. 80

**Answer: D.** In eight-digit hex notation, the final two digits are alpha. 80 is about half opaque.

### 4. What does alpha 0 mean in an RGB color?

- A. Fully opaque
- B. Fully transparent
- C. Fully saturated
- D. A missing red channel

**Answer: B.** Alpha controls the transparency of that color. Zero is fully transparent and one, or 100%, is fully opaque.

### 5. Which is modern space-separated RGB syntax with alpha?

- A. rgb(20, 40, 60, 0.5)
- B. rgb(20 40 60 / 50%)
- C. rgb(20 / 40 / 60 / 50%)
- D. rgb(20 40, 60 50%)

**Answer: B.** Modern RGB syntax separates the red, green, and blue channels with spaces and uses a slash before alpha.

### 6. What does the first component in hsl(210 60% 40%) represent?

- A. Alpha
- B. Hue
- C. Lightness
- D. Whiteness

**Answer: B.** HSL components are hue, saturation, and lightness, in that order.

### 7. What color family does hsl(120 100% 50%) describe?

- A. A fully saturated green
- B. A fully saturated blue
- C. Black
- D. A neutral gray

**Answer: A.** A hue near 120 degrees is green. At 100% saturation and 50% lightness, the result is vivid green.

### 8. What happens to hue when HSL saturation is 0%?

- A. It becomes alpha.
- B. It has no visible effect on the resulting gray.
- C. It forces the color to black.
- D. It selects a system color.

**Answer: B.** With zero saturation, an HSL color is achromatic. The hue value cannot make a gray more colorful.

### 9. Which statement about HWB is correct?

- A. It uses hue, whiteness, and blackness.
- B. It uses height, width, and brightness.
- C. It only accepts named colors.
- D. It describes color alpha and opacity.

**Answer: A.** HWB uses hue, whiteness, and blackness to describe an sRGB color.

### 10. Which property makes text blue?

- A. color
- B. background-color
- C. border-color
- D. opacity

**Answer: A.** The color property sets an element's foreground text color and is inherited by descendants.

### 11. What does currentColor represent?

- A. The browser's default link color
- B. The current value of the color property on the same element
- C. The background color of the root element
- D. The last color in a stylesheet

**Answer: B.** currentColor lets other color properties reuse the element's own color value.

### 12. What is the main difference between background alpha and opacity on an element?

- A. They both affect only the background.
- B. Background alpha affects the background color; opacity fades the whole rendered element and its descendants.
- C. Opacity changes the color format to HSL.
- D. Background alpha always creates an opaque result.

**Answer: B.** Use alpha in background-color when the surface alone should be translucent. opacity applies to the element as a group.

### 13. What does transparent represent?

- A. White with 50% alpha
- B. Fully transparent black
- C. The current text color
- D. The system Canvas color

**Answer: B.** The transparent keyword represents a color with zero alpha and black color channels.

### 14. Which function explicitly names the color space used for its components?

- A. currentColor()
- B. color()
- C. opacity()
- D. hex()

**Answer: B.** The color() function begins with a color-space identifier such as srgb or display-p3, followed by that space's components.

### 15. What is an out-of-gamut color?

- A. A color with no alpha channel
- B. A valid color that cannot be produced exactly by a particular output device
- C. A color name that is misspelled
- D. A color that uses percentages

**Answer: B.** Different screens and printers can reproduce different ranges of color. A valid value can be outside the range of a specific device.

### 16. What is the main benefit of OkLCh for making a color scale?

- A. It removes the need to choose any colors.
- B. It separates lightness, chroma, and hue in a perceptually oriented space.
- C. It guarantees identical appearance on every display.
- D. It only works with black and white.

**Answer: B.** OkLCh gives separate controls for lightness, chroma, and hue, which can make palette adjustments easier to reason about. It does not guarantee identical display across devices.

### 17. Which pair of declarations provides a basic color fallback before a wider-gamut value?

- A. color: color(display-p3 1 0 0); color: red;
- B. background-color: rgb(235 70 55); background-color: color(display-p3 0.95 0.18 0.12);
- C. display-p3: red; background-color: rgb(235 70 55);
- D. background-color: color(display-p3 0.95 0.18 0.12); background-color: rgb(235 70 55);

**Answer: B.** The basic sRGB declaration comes first. A browser that supports the later color() syntax uses the later declaration.

### 18. In color-mix(in oklab, blue 75%, white), what does 75% specify?

- A. The output alpha
- B. The share of blue used in the mix
- C. The Oklab lightness
- D. The saturation of white

**Answer: B.** The percentage after a color specifies that color's share in the mix. The unassigned share is used by the other color.

### 19. Which form derives a color from a custom property using relative HSL syntax?

- A. hsl(from var(--brand) h s 90%)
- B. hsl(var(--brand) from 90%)
- C. hsl(--brand, h, s, 90%)
- D. from(hsl var(--brand) 90%)

**Answer: A.** Relative color syntax starts with from and the source color, followed by the component values to keep or change.

### 20. What does light-dark() use to choose between its two colors?

- A. The user's current scroll position
- B. The element's color scheme
- C. The root font size
- D. The viewport width

**Answer: B.** light-dark() returns one color for a light color scheme and another for a dark color scheme. The color-scheme property and environment determine the active scheme.

### 21. Which is a useful way to provide a fallback for a newer color value?

- A. Put the newer declaration first and the fallback second.
- B. Put a broadly supported declaration first, then the newer value, or guard it with @supports.
- C. Use opacity instead of a fallback.
- D. Put the fallback in an HTML comment.

**Answer: B.** Unsupported declarations are ignored. A fallback first remains available if a later color value is not understood.

### 22. Which statement about named colors is correct?

- A. CSS accepts only six named colors.
- B. CSS color keywords are case-sensitive.
- C. CSS defines many named colors, but they may not match a custom brand palette exactly.
- D. Named colors can only be used for text.

**Answer: C.** CSS has many named colors, and they are accepted anywhere a color value is accepted. Exact brand colors are better recorded in a deliberate palette.

### 23. Which color-space pair is suitable for describing display colors with red, green, and blue components?

- A. display-p3 and srgb
- B. hwb and opacity
- C. Canvas and CanvasText
- D. transparent and currentColor

**Answer: A.** Both display-p3 and srgb are predefined RGB color spaces that can be named in color().

### 24. Why should an interface avoid using color as the only signal for an error?

- A. CSS cannot show red.
- B. Some people may not distinguish the color, and other viewing conditions can change how it appears.
- C. Error states cannot use text.
- D. Color always changes the document structure.

**Answer: B.** Include text, icons, shapes, or another cue so the meaning is not conveyed only by color.

## Short-answer questions

### 25. Convert #39c to its equivalent six-digit hex form.

**Answer: #3399cc.** In three-digit hex, each channel digit is repeated: 3 becomes 33, 9 becomes 99, and c becomes cc.

### 26. What does rgb(255 0 0 / 50%) describe?

**Answer: A red color with 50% alpha.** The red channel is at its maximum, green and blue are zero, and the slash introduces alpha.

### 27. What does hsl(0 0% 50%) look like?

**Answer: A medium gray.** Saturation is zero, so the hue does not affect the result. Lightness is halfway between black and white.

### 28. Why might two HSL colors with the same lightness look like different brightnesses?

**Answer: HSL lightness is not a perceptual brightness scale.** Human vision is more sensitive to some hues than others, so equal HSL lightness values can appear different.

### 29. When should alpha be used instead of opacity?

**Answer: Use alpha when only one color, such as a background surface, should be translucent.** Use opacity only when the whole rendered element, including its text and children, should fade.

### 30. What does a border using border-color: currentColor do?

**Answer: It uses the element's color property for the border.** Updating the text color also updates the border color.

### 31. Why put an sRGB color before a display-p3 declaration?

**Answer: It provides a fallback for browsers that do not understand the wider-gamut color syntax.** Supporting browsers can use the later declaration.

### 32. What do the three components in oklch(65% 0.16 250) describe?

**Answer: Lightness, chroma, and hue.** The first is lightness, the second is chroma, and the third is an angle around the hue circle.

### 33. Is 0.5 alpha the same thing as opacity: 0.5 on a parent element?

**Answer: No.** Alpha affects one color value. opacity fades the parent element's entire rendered group, including its descendants.

### 34. What does CanvasText mean?

**Answer: It is a system color representing text on the system Canvas surface.** The browser or user's environment can adapt system colors to relevant display settings.

## Read and explain the code

### 35. Which color is visible if both declarations are supported?

~~~css
.tag {
  background-color: #2563eb;
  background-color: rgb(37 99 235);
}
~~~

**Answer: Both declarations describe the same sRGB blue, and the later declaration wins.** CSS uses the last valid declaration when origin, importance, and selector priority tie.

### 36. What happens to the child text here?

~~~css
.card {
  opacity: 0.5;
}
~~~

**Answer: The card's text and all its other painted content become translucent together.** opacity applies to the rendered element as a group, not just its background.

### 37. What color does the border use here?

~~~css
.alert {
  color: #b91c1c;
  border: 1px solid currentColor;
}
~~~

**Answer: The border uses #b91c1c.** currentColor resolves from the same element's color property.

### 38. Does this use valid modern RGB separators?

~~~css
.sample {
  color: rgb(20, 40 60 / 50%);
}
~~~

**Answer: No.** The function mixes comma-separated and space-separated syntax. Write either the modern form rgb(20 40 60 / 50%) or the legacy form rgba(20, 40, 60, 0.5).

### 39. What color does the browser use if it does not support the second declaration?

~~~css
.surface {
  background-color: #dbeafe;
  background-color: color-mix(in oklab, #1d4ed8 15%, white);
}
~~~

**Answer: #dbeafe.** If the browser rejects the color-mix declaration, the earlier valid background-color remains in effect.

### 40. What would make light-dark() select its dark value?

~~~css
.panel {
  color: light-dark(#172554, #e0e7ff);
  background-color: light-dark(#eff6ff, #172554);
}
~~~

**Answer: The element must resolve to a dark color scheme.** A color-scheme declaration or inherited user-agent scheme can establish which branch is selected. A basic fallback should be provided for clients that do not support light-dark().

## Practical questions

### 41. Write a translucent blue background using modern RGB syntax.

**Answer: background-color: rgb(37 99 235 / 25%);** The slash introduces an alpha value of 25%, so the background is mostly transparent.

### 42. Give a button text and border the same color without repeating the color value.

**Answer: Set color on the button, then use border-color: currentColor.** For example, color: #1d4ed8; border: 1px solid currentColor;.

### 43. A status badge is currently red for errors and green for success. What should be added?

**Answer: Add a text label, icon, shape, or another visible cue for each state.** This lets users understand the status even if they do not perceive the color difference.

### 44. A card needs a translucent background but fully opaque text. Which approach should be used?

**Answer: Put alpha in the background-color and leave opacity at its default.** Lowering opacity on the card would also fade its text and children.

### 45. How can a project safely try a newer color function?

**Answer: Keep a usable color declaration first and place the newer declaration after it, or guard the newer syntax with @supports.** Test the result in the browsers the project intends to support.

## Key points

- CSS accepts named, hexadecimal, RGB, HSL, HWB, Lab/LCH, Oklab/OkLCh, and color() values.
- Modern RGB and HSL functions use spaces between channels and a slash before alpha.
- The alpha component controls transparency for one color; opacity affects the entire rendered element and its descendants.
- currentColor reuses the element's color property.
- Perceptual color spaces can make palette adjustments easier, but their component values are not interchangeable with HSL.
- Provide a fallback for newer functions and do not rely on color alone to communicate meaning.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [13 - Values, Units, and Percentages](13-values-units-and-percentages.md) | [Lesson](../lessons/14-colors-and-color-functions.md) | [Example](../examples/14-colors-and-color-functions.md) | [15 - CSS math functions: calc, min, max, and clamp](15-css-math-functions.md) |