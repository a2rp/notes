# 43 - Transforms - Q&A

Review transform functions, layout behavior, transform origins, function order, individual transform properties, and perspective. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. What does the CSS `transform` property change?

- A. The element's text content
- B. How the element is rendered visually
- C. The document's HTML structure
- D. The element's intrinsic width in normal layout

**Answer: B. How the element is rendered visually.**

**Explanation:** A transform changes the rendered position or shape. It does not rewrite the HTML or recalculate normal layout as if the element had moved to a new layout position.

### 2. What usually happens to nearby content when an element is translated with `transform`?

- A. Nearby content moves with it automatically
- B. Nearby content keeps its layout position and may be overlapped
- C. Nearby content is removed
- D. Nearby content changes size to fill the old space

**Answer: B. Nearby content keeps its layout position and may be overlapped.**

**Explanation:** Transforms do not make the browser reserve new layout space at the transformed location. The transformed element can visually overlap other content.

### 3. Which function moves an element horizontally and vertically?

- A. `translate()`
- B. `rotate()`
- C. `skew()`
- D. `perspective()`

**Answer: A. `translate()`.**

**Explanation:** `translate(x, y)` moves along the X and Y axes. Axis-specific forms include `translateX()` and `translateY()`.

### 4. In the usual screen coordinate system, which way does `rotate(10deg)` turn an element?

- A. Counterclockwise
- B. Clockwise
- C. It only moves the element down
- D. It flips the element horizontally

**Answer: B. Clockwise.**

**Explanation:** A positive 2D rotation angle appears clockwise on screen. A negative angle appears counterclockwise.

### 5. What does `scale(1.5)` do?

- A. Moves the element 1.5 pixels to the right
- B. Makes the element 1.5 times as large in both dimensions
- C. Rotates the element 1.5 degrees
- D. Changes its normal layout width to 1.5 times its original value

**Answer: B. Makes the element 1.5 times as large in both dimensions.**

**Explanation:** A scale factor of `1` leaves a dimension unchanged. A factor above `1` enlarges the rendered result, while a factor between `0` and `1` makes it smaller. The layout size stays the same.

### 6. Which property changes the pivot point used by a transform?

- A. `transform-origin`
- B. `transform-style`
- C. `perspective-origin`
- D. `transform-box`

**Answer: A. `transform-origin`.**

**Explanation:** `transform-origin` sets the point around which operations such as rotation and scaling take place. Its default is the element's center.

### 7. What happens if a later rule changes `transform: rotate(5deg)` to `transform: scale(1.1)`?

- A. The two values automatically combine
- B. The later `transform` value replaces the earlier one
- C. The browser ignores the later rule
- D. The element is removed from layout

**Answer: B. The later `transform` value replaces the earlier one.**

**Explanation:** `transform` is one property. To keep both effects in the transform list, write both functions in the later value, or use individual transform properties.

### 8. What is the composition order when individual transform properties and `transform` are combined?

- A. `transform`, then `scale`, then `rotate`, then `translate`
- B. `translate`, then `rotate`, then `scale`, then `transform`
- C. The order is random
- D. Individual properties are ignored whenever `transform` is set

**Answer: B. `translate`, then `rotate`, then `scale`, then `transform`.**

**Explanation:** The individual properties have a fixed composition order before the transform list. A single `transform` list lets you choose the order of its functions.

### 9. What additional effect can a non-`none` transform have on stacking?

- A. It creates a stacking context
- B. It removes every descendant from the page
- C. It disables all `z-index` values in the document
- D. It always places the element above every other element

**Answer: A. It creates a stacking context.**

**Explanation:** A transformed element forms its own stacking context. This affects how it and its descendants are layered relative to other stacking contexts, but it does not guarantee that the element is above everything.

### 10. A transform on a regular inline text span appears ineffective. What is a useful fix?

- A. Set `display: inline-block`
- B. Add `position: static`
- C. Set `content: none`
- D. Replace the span with a CSS counter

**Answer: A. Set `display: inline-block`.**

**Explanation:** A regular non-replaced inline box is not transformed like a block box. Giving the span an independent transformable box, such as `inline-block`, is a common solution.

## Short-answer questions

### 11. Explain the difference between transforming an element and changing layout to move it.

**Answer:** A transform changes where or how the element is drawn, while its original layout space remains in place. A layout change affects how the element is positioned or how surrounding layout is calculated.

**Explanation:** This is why a transformed card can overlap its neighbor without pushing that neighbor away. Use Grid, Flexbox, margins, or positioning for layout, and transforms for visual effects.

### 12. Why can changing the order of transform functions change the result?

**Answer:** Each function is composed with the coordinate system produced by the other functions, so a different order can change the direction and location of the final result.

**Explanation:** For example, translating and then rotating can differ from rotating and then translating. Compare both values visually when composing effects.

### 13. What is the default `transform-origin`, and when might you change it?

**Answer:** The default origin is the center of the element. Change it when the element should rotate or scale around a different point, such as a door rotating around its left edge.

**Explanation:** `transform-origin: left center` makes the left-center point the pivot. It changes the transform's pivot, not the element's layout position.

### 14. What does `scaleX(-1)` do?

**Answer:** It flips the rendered element horizontally.

**Explanation:** A negative scale factor reverses the element across that axis. The element's normal layout size remains unchanged.

### 15. What is the difference between `perspective` on a parent and `perspective()` in a transform list?

**Answer:** The `perspective` property on a parent establishes a viewing distance for its transformed descendants. The `perspective()` transform function is applied as part of an element's own transform list.

**Explanation:** Both can create depth effects, but they apply from different places in the transform setup. A parent perspective is a common way to present a group of 3D transformed children.

### 16. What do `transform-style: preserve-3d` and `backface-visibility: hidden` control?

**Answer:** `transform-style: preserve-3d` allows descendants to retain depth in a 3D scene. `backface-visibility: hidden` hides an element's back face when it is turned away.

**Explanation:** These properties control how the faces and depth of transformed descendants are rendered. They do not create meaningful HTML structure or interaction by themselves.

### 17. What should you remember when adding a transform to hover feedback?

**Answer:** Provide an equivalent visible focus state for keyboard users, keep the focus indicator visible, and avoid moving the control outside the visible area.

**Explanation:** A hover-only effect is unavailable to people navigating with a keyboard. If the effect includes motion, honor the visitor's reduced-motion preference.

## Applied questions

### 18. A card grows on hover and covers text next to it. Why does the text not move, and what can you change?

**Answer:** Scaling changes the rendered card size but not its layout size. Reduce the scale, reserve more space around the card, or choose a layout that provides enough room for the effect.

**Explanation:** A transform does not reflow neighboring elements. Also check whether an ancestor clips overflowing content.

### 19. Write a rule that lifts a card slightly when hovered or focused with a keyboard.

**Answer:**

~~~css
.card:hover,
.card:focus-visible {
  transform: translateY(-0.25rem);
}
~~~

**Explanation:** The `:hover` selector responds to pointer hover and `:focus-visible` provides the effect for keyboard focus. The element should still have a clear focus indicator.

### 20. A base rule rotates an icon, but the hover rule scales it and the rotation disappears. How can you preserve both effects?

**Answer:** Include both functions in the hover value:

~~~css
.icon {
  transform: rotate(4deg);
}

.icon:hover {
  transform: rotate(4deg) scale(1.1);
}
~~~

**Explanation:** The hover declaration replaces the base `transform` value, so the rotation must be included again. Alternatively, use `rotate` and `scale` as separate individual properties.

### 21. Provide CSS that rotates a label around its left edge and moves it 4 degrees counterclockwise.

**Answer:**

~~~css
.label {
  transform-origin: left center;
  transform: rotate(-4deg);
}
~~~

**Explanation:** `left center` chooses the left edge's midpoint as the pivot. A negative angle turns counterclockwise on screen.

### 22. How can a card move, rotate, and scale using separate individual transform properties?

**Answer:**

~~~css
.card:hover {
  translate: 0 -0.3rem;
  rotate: 1deg;
  scale: 1.03;
}
~~~

**Explanation:** These properties control the three effects independently. When combined with each other or `transform`, they follow the fixed composition order described in the lesson.

### 23. A perspective effect looks too exaggerated. What change can make it subtler?

**Answer:** Increase the perspective distance, for example change `perspective: 400px` to `perspective: 900px`.

**Explanation:** A smaller distance creates stronger perspective. A larger distance makes the depth appear less pronounced.

### 24. Write a basic 3D scene where a parent provides perspective and a child rotates around the Y axis.

**Answer:**

~~~css
.scene {
  perspective: 800px;
}

.panel {
  transform: rotateY(12deg);
}
~~~

**Explanation:** The parent's perspective provides the viewing distance for its child. `rotateY()` turns the panel around its vertical axis.

## Coding questions

### 25. A text word needs a small rotation. Write CSS that gives it a transformable box and rotates it clockwise by 3 degrees.

**Answer:**

~~~css
.word {
  display: inline-block;
  transform: rotate(3deg);
}
~~~

**Explanation:** A regular inline span does not behave like a block box for transforms. `inline-block` gives the word an independent box, and a positive angle turns clockwise on screen.

### 26. Write a transform that moves an element 12 pixels right and 6 pixels up, then rotates it 2 degrees clockwise.

**Answer:**

~~~css
.element {
  transform: translate(12px, -6px) rotate(2deg);
}
~~~

**Explanation:** Positive X moves right and negative Y moves up. The positive angle rotates clockwise. If the element overlaps other content, adjust the values or the surrounding layout.

### 27. Write CSS for a 3D panel whose reverse face is hidden when turned away.

**Answer:**

~~~css
.scene {
  perspective: 700px;
}

.panel {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
~~~

**Explanation:** The parent supplies perspective and the panel is turned around its Y axis. `backface-visibility: hidden` hides its reverse face. A complete flip-card interaction also needs carefully designed front and back content and an accessible way to reveal it.

## Key takeaways

- Transforms change rendered appearance while leaving normal layout space in place.
- Translation, rotation, scale, and skew are common transform operations.
- `transform-origin` sets the pivot, and transform function order matters.
- A later `transform` value replaces the earlier list unless its functions are included again.
- Individual `translate`, `rotate`, and `scale` properties compose in a fixed order.
- Transformed elements can overlap content and establish stacking contexts.
- 3D scenes use perspective and depth-related properties.
- Provide keyboard focus feedback and account for reduced motion.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [42 - Generated content and counters](../lessons/42-generated-content-and-counters.md) | [Q&A](43-transforms.md) | [Example](../examples/43-transforms.md) | [44 - Transitions](../lessons/44-transitions.md) |