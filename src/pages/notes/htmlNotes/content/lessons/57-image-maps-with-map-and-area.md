# 57 - Image maps with map and area

An image map makes selected geometric regions of one image act as links. The `<img>` element displays the image, `usemap` connects it to a named `<map>`, and each `<area>` inside the map defines a region and its destination.

Image maps can be useful for diagrams, floor plans, and maps where locations in one image have different destinations. Add ordinary text links as an equivalent way to choose each destination.

## Connect an image to a map

The fragment in `usemap` must match the map's `name`. A map name must be present, non-empty, contain no ASCII whitespace, and be unique among maps in the same document. If the map also has an `id`, that value must match its `name`.

~~~html
<img
  src="images/campus-map.png"
  alt="Campus map showing the library, science building, and student center."
  usemap="#campus-map"
>

<map name="campus-map">
  <!-- Add area elements here. -->
</map>
~~~

The `<map>` element associates the hotspot definitions with the image. It does not draw or display the image. The `<area>` element is a void element, so it has no closing tag. Each area must be inside a `<map>`.

## Define the clickable shapes

The `shape` and `coords` attributes define the geometry of an area. Coordinates are distances in CSS pixels from the image's top-left edge.

| Shape | Coordinate format | Meaning |
| --- | --- | --- |
| `rect` | `x1,y1,x2,y2` | Rectangle from top-left to bottom-right |
| `circle` | `x,y,radius` | Circle centered at `x,y` |
| `poly` | `x1,y1,x2,y2,x3,y3...` | Polygon made from three or more ordered points |
| `default` | No `coords` | The whole image |

A rectangle needs exactly four integers, with the first x and y values less than the second x and y values. A circle needs exactly three integers and a non-negative radius. A polygon needs at least six integers, with an even number of values. List its points in order around the shape.

For example, `coords="40,30,260,180"` defines a rectangular region with its top-left corner 40 pixels from the left and 30 pixels from the top, and its bottom-right corner 260 pixels from the left and 180 pixels from the top.

Coordinates are interpreted relative to the displayed image after it is stretched by CSS `width` and `height` or corresponding HTML dimensions. Browser zoom and CSS or SVG transforms do not adjust the coordinates, so test the hotspots at the sizes and zoom levels your audience will use.

## Give every linked area a useful name

When an `<area>` has an `href`, it creates a hyperlink and must have an `alt` attribute. Write concise text that names the destination or action, such as `alt="Visit the library"`. This text serves as the link's text equivalent when the image itself is not available.

An area without `href` is not selectable. It must not have `alt`. Use this for a region that is intentionally not a link, such as the hole inside a ring-shaped area.

The image's own `alt` describes the image or the choices it presents. Each linked area's `alt` describes that particular link. They answer different questions and should not simply repeat one another.

## Provide equivalent text links

A user should not have to understand or operate the image to reach its destinations. Provide a visible list of ordinary links for the same places or actions. This also helps when the image is unavailable, a hotspot is difficult to target, or the user prefers text navigation.

~~~html
<nav aria-label="Campus locations">
  <ul>
    <li><a href="https://campus.example.test/library/">Library</a></li>
    <li><a href="https://campus.example.test/science/">Science building</a></li>
    <li><a href="https://campus.example.test/student-center/">Student center</a></li>
  </ul>
</nav>
~~~

Keep the text links and the image map destinations in sync. If a destination changes, update both places.

## Complete example

This example assumes that `images/campus-map.png` is a 900 by 500 pixel image. The example file shows the complete HTML, the coordinates, and an expected output description:

[Open Example 57 - Image maps with map and area](../examples/57-image-maps-with-map-and-area.md)

## Common mistakes

- A mismatched `usemap` and `name` means the image is not connected to the intended map.
- Duplicate map names can make references unclear. Give each map a unique name.
- A linked `<area>` without `alt` has no required text equivalent.
- A `default` area covers the whole image. It can unintentionally make other choices inaccessible or misleading.
- Coordinates are easy to get wrong. Test the real source image and each hotspot, including on touch screens.
- Image maps are awkward for content that reflows or changes independently. Separate images or ordinary links are often easier to maintain.

## Try it yourself

1. Sketch a diagram with three clearly separated regions and record its image dimensions.
2. Add the image and connect it to a map with a matching `usemap` and `name`.
3. Define one rectangle, one circle, and one polygon using coordinates that fit the image.
4. Give each linked area a useful `alt` and destination.
5. Add visible text links to the same destinations.
6. Check that each hotspot reaches the right place and that the text links remain usable without the image.

## Key points

- `<img usemap="#name">` connects an image to `<map name="name">`.
- `<area>` defines a rectangle, circle, polygon, or whole-image region.
- A linked area requires `href` and `alt`; an area without `href` is not selectable and omits `alt`.
- Describe the image and each hotspot with the right alternative text.
- Provide equivalent visible text links and test the coordinate alignment.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :---: | :---: | ---: |
| [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) | [Q&A](../qnas/57-image-maps-with-map-and-area.md) | [Example](../examples/57-image-maps-with-map-and-area.md) |  |
