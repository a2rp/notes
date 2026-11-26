# 57 - Image maps with map and area: Questions and Answers

Use these questions to review [Chapter 57 - Image maps with map and area](../lessons/57-image-maps-with-map-and-area.md). Each answer follows its question, with an explanation where useful.

## Multiple-choice questions

### 1. Which pair connects an image with its image map?

A. `src` and `href`
B. `usemap` and `name`
C. `id` and `alt`
D. `shape` and `coords`

**Answer: B.** The image's `usemap` value is a hash-name reference to the map's `name`, for example `usemap="#campus"` and `name="campus"`.

### 2. Which shape uses three coordinate values?

A. `rect`
B. `poly`
C. `circle`
D. `default`

**Answer: C.** A circle uses x-coordinate, y-coordinate, and radius. The default shape covers the entire image and does not use `coords`.

### 3. What must a linked `<area>` include?

A. `href` and `alt`
B. `src` and `title`
C. `id` and `name`
D. `width` and `height`

**Answer: A.** A linked area uses `href` for its destination and must have `alt` text to name that hyperlink.

### 4. Which coordinate list describes a rectangle?

A. `"120,80,25"`
B. `"20,20,120,80"`
C. `"20,20,60,20,120,80"`
D. No coordinates

**Answer: B.** A rectangle has four values: left, top, right, and bottom. Its left and top values must be smaller than its right and bottom values.

## True or false

### 5. The `<map>` element draws the image that visitors see.

**Answer: False.** The `<img>` displays the image. The `<map>` connects the image with its region definitions.

### 6. A map's `name` can be empty if the image has a descriptive `alt`.

**Answer: False.** A map must have a non-empty name without ASCII whitespace, and its name must match the image's `usemap` reference.

### 7. An `<area>` element has an end tag.

**Answer: False.** `<area>` is a void element and has no closing tag.

### 8. A region without `href` is a selectable link if it has `alt` text.

**Answer: False.** Without `href` the area is not selectable, and its `alt` attribute must be omitted.

## Short-answer questions

### 9. What should the image's `alt` text describe?

**Answer:** It should describe the image or summarize the choices it presents. Each linked area's own `alt` text describes that specific destination or action.

### 10. Why should a page include ordinary text links as well as an image map?

**Answer:** Text links provide the same choices without requiring people to see or target the image. They also help when the image cannot load or the image hotspots are difficult to use.

### 11. In `coords="40,30,260,180"` for a rectangle, where is the top-left corner?

**Answer:** 40 CSS pixels from the image's left edge and 30 CSS pixels from its top edge.

### 12. How many coordinate values does a polygon need at minimum?

**Answer:** Six values, representing at least three x,y points. The total number of values must be even, and the points should be listed in order around the polygon.

### 13. What does `shape="default"` mean?

**Answer:** Its area covers the whole image, and it must not have a `coords` attribute. Use it carefully because it can cover areas intended for other links.

## Practical questions

### 14. Complete the image-map connection.

~~~html
<img src="campus.png" alt="Campus map" usemap="_____">
<map name="_____">
  <area shape="rect" coords="10,10,90,70" href="/library/" alt="Visit the library">
</map>
~~~

**Answer:**

~~~html
<img src="campus.png" alt="Campus map" usemap="#campus">
<map name="campus">
  <area shape="rect" coords="10,10,90,70" href="/library/" alt="Visit the library">
</map>
~~~

The value after `usemap` begins with `#` and matches the map's `name` without that character.

### 15. A linked hotspot has `href="/help/"` but no `alt`. What should be fixed?

**Answer:** Add concise alternative text that identifies the help destination, such as `alt="Open the help page"`. Also include an ordinary visible help link elsewhere on the page.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :---: | :---: | ---: |
| [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) | [Lesson](../lessons/57-image-maps-with-map-and-area.md) | [Example](../examples/57-image-maps-with-map-and-area.md) |  |
