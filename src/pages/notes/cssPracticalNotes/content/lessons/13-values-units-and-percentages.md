# 13 - Values, Units, and Percentages

CSS declarations assign values to properties. A value might be a keyword, a number, a length with a unit, a percentage, or a function. Each property accepts a defined set of value types, so a value that is valid for one property may be invalid for another.

Choosing the right value and unit helps make a layout readable, responsive, and easier to adjust.

## Values, numbers, dimensions, and percentages

A number has no unit:

~~~css
opacity: 0.75;
line-height: 1.5;
flex-grow: 2;
~~~

A dimension is a number immediately followed by a unit:

~~~css
width: 24rem;
transition-duration: 200ms;
rotate: 15deg;
~~~

Do not put a space between the number and its unit. For example, 24 rem is not the same valid dimension as 24rem.

A percentage is a number followed by %:

~~~css
width: 80%;
font-size: 120%;
~~~

Percentages are relative values. The property defines what the percentage is relative to.

A keyword such as auto, none, or inherit is a value too, but it is not a number with a unit. A function such as calc() can combine accepted values into a more complex value.

## Length units

Length units are used for dimensions such as width, padding, font size, and positioning. They are grouped into absolute and relative units.

### Absolute length units

| Unit | Meaning | Common use |
| --- | --- | --- |
| px | CSS reference pixel | Fine borders, icons, and precise small details |
| in | Inch | Print layouts and measurements |
| cm | Centimeter | Print layouts and measurements |
| mm | Millimeter | Print layouts and measurements |
| Q | Quarter-millimeter | Specialized print measurements |
| pt | Point, 1/72 of an inch | Print typography |
| pc | Pica, 1/6 of an inch | Print typography |

CSS defines fixed ratios among absolute units. One CSS inch equals 96 CSS pixels, so 1in is 96px and 1pt is 1/72in.

A CSS pixel is a reference unit, not necessarily one physical screen pixel. Devices can map CSS pixels to different numbers of device pixels. Use absolute units when fixed-size details are needed or when preparing print styles. For most page layout and text sizing, relative units are often more adaptable.

### Font-relative units

| Unit | Relative to |
| --- | --- |
| em | The element's font size, with special parent-relative behavior in the font-size property |
| rem | The root element's font size |
| ex | The font's x-height |
| ch | The advance width of the font's zero glyph |
| cap | The font's capital letter height |
| ic | The advance width of a full-width glyph |
| lh | The element's line height |
| rlh | The root element's line height |

The em unit is useful for sizing something in proportion to nearby text:

~~~css
.button {
  padding: 0.6em 1em;
}
~~~

If the button text gets larger, its padding grows with it. For the font-size property itself, em is relative to the parent's computed font size. In other properties, em is based on the element's computed font size.

The rem unit is relative to the root element's font size. It is useful for a consistent spacing scale:

~~~css
:root {
  font-size: 100%;
}

.card {
  padding: 1.5rem;
}
~~~

If the user or browser changes the default root text size, rem-based spacing can scale with it. Avoid changing the root font size to a fixed pixel value just to make rem calculations look simple.

The ch unit is based on the advance width of the zero glyph, not a guaranteed count of characters. It can be useful for approximate text widths:

~~~css
.article {
  max-width: 68ch;
}
~~~

The result depends on the font and writing mode. Treat ch as a typographic measure, not an exact character counter.

### Viewport-relative units

Viewport units represent a fraction of the viewport:

| Unit | Meaning |
| --- | --- |
| vw | 1% of the viewport width |
| vh | 1% of the viewport height |
| vi | 1% of the viewport size along the inline axis |
| vb | 1% of the viewport size along the block axis |
| vmin | 1% of the smaller viewport dimension |
| vmax | 1% of the larger viewport dimension |

For a viewport 1200 CSS pixels wide, 1vw is 12 CSS pixels. Viewport units can size content in relation to the screen, but large text based only on vw may become too small on narrow screens or too large on wide screens. Use them with limits when appropriate. Responsive sizing functions are covered later in the guide.

On mobile browsers, the visible viewport can change as browser controls appear and disappear. CSS also defines small, large, and dynamic viewport unit variants, such as svh, lvh, and dvh:

- The small viewport units use the viewport size with expandable browser interface controls shown.
- The large viewport units use the viewport size with those controls retracted.
- The dynamic viewport units track changes in the visible viewport size.

For example, 100svh can fit within the smaller viewport size, while 100dvh follows the changing visible viewport. Dynamic units can cause the layout to resize while the browser interface changes.

## Percentages depend on the property

A percentage is not universally based on the parent's width. Each property defines its own reference value.

For example, width percentages are commonly based on the containing block's width:

~~~css
.parent {
  width: 800px;
}

.child {
  width: 50%;
}
~~~

If the containing block is 800 CSS pixels wide, the child's width is 400 CSS pixels.

For font-size, the percentage is based on the parent's font size:

~~~css
.parent {
  font-size: 20px;
}

.child {
  font-size: 120%;
}
~~~

The child's font size is 24 CSS pixels.

Other properties define other percentage references. Check the property's meaning rather than assuming that 50% always means half the parent's width. For some properties, a percentage can remain unresolved until the browser knows the layout context.

## Numbers without units

Some properties expect a number rather than a length. Examples include opacity and the unitless multiplier form of line-height:

~~~css
.badge {
  opacity: 0.8;
}

.article {
  line-height: 1.5;
}
~~~

Do not add px to values that expect a number. opacity: 0.8 is valid, while opacity: 0.8px is not.

A zero length can generally be written without a unit where that property accepts a length:

~~~css
.card {
  margin: 0;
  border-width: 0;
}
~~~

This convenience applies to zero, not to arbitrary nonzero lengths. A nonzero length needs a suitable unit, such as 8px or 0.5rem.

## Unitless line-height and percentage line-height

A unitless line-height acts as a multiplier for each element's own font size:

~~~css
body {
  line-height: 1.5;
}
~~~

A child with a different font size keeps the 1.5 multiplier and gets line spacing based on its own text size.

A percentage line-height is calculated as a length on the element where it is declared:

~~~css
body {
  font-size: 20px;
  line-height: 150%;
}
~~~

The percentage computes to 30px on body. If a child inherits that computed line-height, it inherits the 30px length rather than a multiplier that scales to the child's own font size. For general text, a unitless line-height is often more flexible.

## Other unit families

CSS uses dimensions for more than lengths:

| Kind | Units | Example use |
| --- | --- | --- |
| Time | s, ms | Transition and animation durations |
| Angle | deg, grad, rad, turn | Rotation and gradients |
| Resolution | dpi, dpcm, dppx | Resolution media queries |
| Frequency | Hz, kHz | Speech-related and audio contexts |
| Grid fraction | fr | Share of available grid track space |

A 200ms duration is one fifth of a second. A full turn is 360deg. The fr unit is not a length: it distributes available space among grid tracks.

The property determines which kind of value is accepted. For example, width can accept a length or percentage, while a transition duration takes a time.

## Combining compatible values

Some properties accept both lengths and percentages. A calc() expression can combine them when they represent compatible quantities:

~~~css
.content {
  width: calc(100% - 2rem);
}
~~~

Here the percentage provides a context-based width and the rem value provides fixed root-relative spacing. Spaces around the plus and minus operators are required in calc() expressions. More CSS math functions, including min(), max(), and clamp(), are covered in a later chapter.

## Selecting a suitable unit

- Use rem for a consistent root-relative type and spacing scale.
- Use em when an item's spacing should grow with its own text.
- Use percentages when the property should scale with its defined reference value.
- Use viewport units for sizing relative to the viewport, while considering narrow and changing viewports.
- Use px for small precise details when a reference-pixel size is appropriate.
- Use unitless line-height so each text size can keep a proportional line height.
- Use the unit required by the property's value type, such as ms for duration or deg for an angle.

No single unit is best for every property. Choose the unit based on what the value should respond to.

## Common mistakes

### Treating CSS pixels as physical device pixels

A CSS pixel is a reference unit. It does not guarantee one physical pixel on every display.

### Assuming all percentages use the parent's width

Each property defines its percentage reference. A width percentage and a font-size percentage use different references.

### Forgetting units on nonzero lengths

A value such as margin: 12 is invalid as a length. Use a unit, such as 12px or 0.75rem. Unitless zero is a special case.

### Using em without considering inheritance

Nested font-size values in em can compound because each is relative to its parent. Use rem when you want values relative to the root instead.

### Treating ch as an exact character count

ch measures a font glyph's advance width. Different glyphs and fonts have different widths.

### Using viewport units for all text sizes

Viewport width can vary greatly. Text sized only with vw may become uncomfortable at screen extremes. Use limits or another responsive strategy.

### Adding a unit to a number-valued property

A number-valued property such as opacity expects a number, not a length. Use values such as 0.5, not 0.5px.

## Try it yourself

1. Set the root font size to 100% and give a card 1.5rem of padding. Change the browser's default text size and observe how the spacing responds.
2. Give a button padding in em, then increase its font size. Observe how the padding grows with the text.
3. Place a child with width: 50% inside a containing block with a known width. Calculate the child's used width.
4. Compare font-size: 120% with width: 120%. Identify the reference for each property.
5. Create a parent with a 20px font size and 150% line-height. Give a child a 10px font size and inspect the inherited line height.
6. Replace the parent line-height with 1.5 and compare the child's spacing.
7. Set a section to 100vh and then to 100svh or 100dvh. On a mobile browser, compare how the height relates to browser controls.
8. Use max-width: 68ch for a paragraph. Change the font and observe how the line length changes.
9. Try width: calc(100% - 2rem) and change the containing block width.

## Key points

- CSS values may be keywords, numbers, dimensions, percentages, or functions.
- A dimension has a number and unit with no intervening space.
- Absolute lengths have fixed ratios; a CSS pixel is not always one physical device pixel.
- Relative units scale from font metrics, the root element, or the viewport.
- Each property defines what its percentage is relative to.
- Some properties expect unitless numbers, and zero lengths can often omit the unit.
- Use units that respond to the design relationship you want.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [12 - Cascade layers](12-cascade-layers.md) | [Q&A](../qnas/13-values-units-and-percentages.md) | [Example](../examples/13-values-units-and-percentages.md) | [14 - Colors and color functions](14-colors-and-color-functions.md) |