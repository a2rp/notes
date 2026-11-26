# Example 57 - Image maps with map and area

## Question

Create an accessible campus-location page. Make three regions in one map image clickable, and provide ordinary text links to the same locations.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Campus locations</title>
    <style>
      .campus-map {
        width: 100%;
        max-width: 900px;
        height: auto;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Explore the campus</h1>
      <p>Select a location on the map or use the text links below.</p>

      <img
        class="campus-map"
        src="images/campus-map.png"
        width="900"
        height="500"
        alt="Campus map showing the library in the west, science building in the east, and student center in the south."
        usemap="#campus-locations"
      >

      <map name="campus-locations">
        <area
          shape="rect"
          coords="60,70,280,220"
          href="https://campus.example.test/library/"
          alt="Visit the library"
        >
        <area
          shape="circle"
          coords="650,160,90"
          href="https://campus.example.test/science/"
          alt="Visit the science building"
        >
        <area
          shape="poly"
          coords="360,330,450,270,550,330,530,450,390,450"
          href="https://campus.example.test/student-center/"
          alt="Visit the student center"
        >
      </map>

      <nav aria-label="Campus locations">
        <h2>Locations</h2>
        <ul>
          <li><a href="https://campus.example.test/library/">Library</a></li>
          <li><a href="https://campus.example.test/science/">Science building</a></li>
          <li><a href="https://campus.example.test/student-center/">Student center</a></li>
        </ul>
      </nav>
    </main>
  </body>
</html>
~~~

## Explanation

- `usemap="#campus-locations"` refers to the `<map>` whose `name` is `campus-locations`.
- The rectangle marks the library area. Its values mean left, top, right, bottom.
- The circle marks the science building. Its values mean center x, center y, radius.
- The polygon marks the student center. Its values are ordered x,y points.
- Each linked `<area>` has alternative text describing its destination.
- The visible list repeats the three destinations for people who do not use the hotspots.
- The image uses a 900 by 500 coordinate space. The CSS makes it narrower on smaller screens while preserving its aspect ratio.

## Expected output

Assuming `images/campus-map.png` is supplied and its locations match the coordinates, the page shows a heading, a campus map, and a list of three location links. The rectangular, circular, and polygon regions navigate to the library, science building, and student center. The visible links below the image reach those same destinations.

The map file is a placeholder path in this example. Replace it with an actual map image, then adjust and test the coordinates. The image map does not draw outlines or labels for the clickable regions.

## Coordinate summary

| Location | Shape | Coordinates |
| --- | --- | --- |
| Library | Rectangle | `60,70,280,220` |
| Science building | Circle | `650,160,90` |
| Student center | Polygon | `360,330,450,270,550,330,530,450,390,450` |

## Try it yourself

1. Replace the placeholder image with a 900 by 500 campus map.
2. Adjust each region so it covers the correct location.
3. Temporarily add visible borders or labels to a copy of the image while planning coordinates. The borders are part of the image, not drawn by `<area>`.
4. Test the map with a mouse, keyboard, and touch screen.
5. Test the ordinary location links without using the image.

## Related lesson

[Read lesson 57 - Image maps with map and area](../lessons/57-image-maps-with-map-and-area.md)

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :---: | :---: | ---: |
| [56 - The base element and relative URLs](56-base-element-and-relative-urls.md) | [Lesson](../lessons/57-image-maps-with-map-and-area.md) | [Q&A](../qnas/57-image-maps-with-map-and-area.md) |  |
