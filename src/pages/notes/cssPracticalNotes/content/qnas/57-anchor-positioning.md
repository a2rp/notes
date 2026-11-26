# 57 - Anchor positioning - Q&A

Review how CSS names anchors, places positioned elements in relation to them, and handles overflow. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What is an anchor in CSS anchor positioning?

- A. An element whose box provides a reference for positioning another element
- B. A link that jumps to a page fragment
- C. A replacement for the position property
- D. An element that must be a button

**Answer: A. An element whose box provides a reference for positioning another element.**

**Explanation:** CSS anchor positioning lets a positioned box use another element's geometry as its reference.

### 2. Which property gives an element an anchor name?

- A. anchor-name
- B. position-anchor
- C. anchor-target
- D. position-area

**Answer: A. anchor-name.**

**Explanation:** The anchor-name property registers an element as a named anchor that other positioned elements can reference.

### 3. Which value is a valid example of an anchor name?

- A. help
- B. #help
- C. --help
- D. $help

**Answer: C. --help.**

**Explanation:** Named anchors use a dashed identifier that begins with two hyphens.

### 4. What does position-anchor do?

- A. Chooses the default anchor for the positioned element
- B. Gives an element keyboard focus
- C. Creates a new HTML element
- D. Opens a popover

**Answer: A. Chooses the default anchor for the positioned element.**

**Explanation:** Other anchor positioning features, including position-area and unnamed anchor() functions, can use this default anchor.

### 5. What positioning mode does an element generally need for anchor-based placement?

- A. static
- B. absolute or fixed
- C. float
- D. sticky only

**Answer: B. absolute or fixed.**

**Explanation:** Anchor positioning extends positioned layout. Merely assigning anchor-name to one element does not position another element.

### 6. What does position-area: block-end request in a horizontal writing mode?

- A. A position in the region below the anchor
- B. A position to the left of the anchor
- C. A new block formatting context
- D. A page break after the anchor

**Answer: A. A position in the region below the anchor.**

**Explanation:** block-end is a logical direction. It maps to the bottom in a horizontal writing mode and adapts to other writing modes.

### 7. What does position-area describe?

- A. A region of a grid around the anchor used for the positioned element's placement
- B. A margin that is always 10 pixels
- C. The anchor's accessible name
- D. The stacking order of all elements

**Answer: A. A region of a grid around the anchor used for the positioned element's placement.**

**Explanation:** The grid has the anchor in its center and regions around it. The selected region affects the positioned element's containing block calculations.

### 8. Which value can center an anchor-positioned element relative to its anchor along an alignment axis?

- A. anchor-center
- B. center-anchor
- C. position-center
- D. anchor-align

**Answer: A. anchor-center.**

**Explanation:** Use anchor-center with an alignment property such as justify-self or align-self.

### 9. Where can the anchor() function be used?

- A. In inset properties such as top, left, or inset-block-start
- B. In every CSS property
- C. Only in color properties
- D. Only in selectors

**Answer: A. In inset properties such as top, left, or inset-block-start.**

**Explanation:** anchor() resolves to a position relative to an anchor edge and is used in inset properties.

### 10. What does anchor-size() provide?

- A. A dimension of an anchor for sizing a positioned element
- B. An anchor's text content
- C. A page margin
- D. A computed color

**Answer: A. A dimension of an anchor for sizing a positioned element.**

**Explanation:** It can refer to dimensions such as width, height, inline size, or block size.

### 11. What is the purpose of a fallback argument in anchor(--name right, 0px)?

- A. It supplies a value if the anchor function cannot resolve its anchor
- B. It disables the anchor
- C. It automatically loads a polyfill
- D. It moves the element to the viewport center

**Answer: A. It supplies a value if the anchor function cannot resolve its anchor.**

**Explanation:** The fallback belongs to that function. It does not teach unsupported browsers how to parse anchor positioning.

### 12. What does position-try-fallbacks: flip-block request?

- A. A fallback placement on the opposite side along the block axis
- B. A horizontal transform
- C. A new containing block
- D. A change to the anchor's writing mode

**Answer: A. A fallback placement on the opposite side along the block axis.**

**Explanation:** If the initial placement overflows, the browser can try the opposite block direction.

### 13. When does the browser try position fallbacks?

- A. When the positioned element's current placement overflows its relevant containing block
- B. Whenever the user moves the pointer
- C. Only when an anchor has no name
- D. Only during page load

**Answer: A. When the positioned element's current placement overflows its relevant containing block.**

**Explanation:** Fallbacks are part of overflow management. They do not guarantee a perfect fit in every viewport or clipping context.

### 14. What does @supports provide for anchor positioning?

- A. A way to apply an enhancement only when the browser supports its declarations
- B. A polyfill for every unsupported browser
- C. A way to create anchor names from HTML IDs
- D. A method for changing focus order

**Answer: A. A way to apply an enhancement only when the browser supports its declarations.**

**Explanation:** Feature queries can guard enhanced CSS. They do not implement the feature in browsers that lack it.

### 15. Which statement about anchor positioning and accessibility is correct?

- A. Positioning an element automatically makes it a tooltip
- B. CSS placement alone does not create behavior or semantic relationships
- C. Every anchor must be an HTML link
- D. position-anchor controls keyboard focus

**Answer: B. CSS placement alone does not create behavior or semantic relationships.**

**Explanation:** HTML and interaction code provide semantics, opening and closing behavior, and focus handling. Anchor positioning supplies geometry.

### 16. What can anchor-scope help with?

- A. Reusing an anchor name safely inside repeated component boundaries
- B. Changing the page language
- C. Opening every positioned panel
- D. Setting a panel's text color

**Answer: A. Reusing an anchor name safely inside repeated component boundaries.**

**Explanation:** Scoping limits where a named anchor can be found, which helps reusable components avoid matching another component's anchor.

## Short-answer questions

### 17. Explain the difference between anchor-name and position-anchor.

**Answer:** anchor-name registers an element as a named anchor. position-anchor connects a positioned element to the named anchor as its default reference.

**Explanation:** The first declaration identifies the reference box; the second tells another positioned box which reference to use.

### 18. What does position-area: block-start do?

**Answer:** It places the positioned element in the region on the block-start side of its default anchor.

**Explanation:** In a horizontal writing mode, block-start is above the anchor. Logical directions adapt to the writing mode.

### 19. When might anchor() be more useful than position-area?

**Answer:** Use anchor() when you need to align specific inset edges or refer explicitly to more than one anchor.

**Explanation:** position-area is a convenient region-based placement. anchor() gives edge-level control in inset declarations.

### 20. What is the difference between an unnamed anchor() reference and an explicit named reference?

**Answer:** An unnamed reference uses the positioned element's default anchor; a named reference identifies the anchor directly inside the function.

**Explanation:** Explicit names are useful when an element uses more than one anchor or when a specific edge must refer to a specific element.

### 21. Why is a fallback length in anchor() not a browser compatibility fallback?

**Answer:** It only handles a function that cannot resolve its anchor in a browser that understands the syntax.

**Explanation:** An unsupported browser may reject the declaration. Use ordinary layout rules and @supports for progressive enhancement.

### 22. Why should an anchor-positioned panel have a maximum size?

**Answer:** The anchor's size or available space may be too small or large for the panel's content.

**Explanation:** A sensible max-inline-size or max-block-size helps the panel fit the containing area and remain readable.

### 23. What should you check if a panel appears clipped even though its anchor relationship is correct?

**Answer:** Check the containing block, ancestor overflow, stacking contexts, panel size, and fallback placements.

**Explanation:** Anchor positioning does not remove the normal effects of clipping and stacking. The anchor can be positioned correctly while part of the panel remains hidden.

### 24. What does anchor-scope do in a repeated component?

**Answer:** It limits a named anchor so positioned elements in one component instance do not accidentally use another instance's anchor.

**Explanation:** Scoping allows each component instance to reuse a descriptive internal anchor name.

### 25. Does position-anchor open a menu or move keyboard focus?

**Answer:** No. It only connects geometry for layout.

**Explanation:** Use suitable HTML interaction features and code for the open state, keyboard behavior, and focus management.

### 26. Why should an anchor-positioned element have a non-anchor fallback layout?

**Answer:** Some browsers may not support the required anchor positioning features, and an ordinary layout keeps the content available.

**Explanation:** Place the enhancement inside @supports while leaving the default document flow useful.

## Applied questions

### 27. Write CSS that names a help control and positions a note below and centered on it.

**Answer:**

~~~
.help-control {
    anchor-name: --help-control;
}

.help-note {
    position: absolute;
    position-anchor: --help-control;
    position-area: block-end;
    justify-self: anchor-center;
}
~~~

**Explanation:** anchor-name registers the reference. The positioned note selects it as the default anchor, then chooses the block-end region and centers itself on the anchor.

### 28. Write an inset-based placement that puts a note's top edge at an anchor's bottom edge and its left edge at the anchor's right edge.

**Answer:**

~~~
.note {
    position: absolute;
    position-anchor: --help-control;
    top: anchor(bottom);
    left: anchor(right);
}
~~~

**Explanation:** Since position-anchor selects the default anchor, the anchor name can be omitted inside these anchor() functions.

### 29. The note should align to the right edge of an anchor named --menu-button, even if it has a different default anchor. Write the inset declaration.

**Answer:**

~~~
.note {
    right: anchor(--menu-button right);
}
~~~

**Explanation:** The explicit name selects the anchor directly. anchor() is used here in an inset property.

### 30. Make a panel at least as wide as its anchor's inline size.

**Answer:**

~~~
.panel {
    position: absolute;
    position-anchor: --action;
    min-inline-size: anchor-size(inline);
}
~~~

**Explanation:** anchor-size(inline) returns the anchor's inline dimension. Add a maximum size too when the panel must fit within a smaller container.

### 31. Ask the browser to try the opposite block side if a panel overflows its initial position.

**Answer:**

~~~
.panel {
    position-try-fallbacks: flip-block;
}
~~~

**Explanation:** The browser can try the opposite block direction when the original position overflows. The result still depends on the containing block and available space.

### 32. Write a custom fallback that changes a panel to block-end and centers it on the anchor.

**Answer:**

~~~
.panel {
    position-try-fallbacks: --panel-below;
}

@position-try --panel-below {
    position-area: block-end;
    justify-self: anchor-center;
}
~~~

**Explanation:** The named @position-try rule defines an alternate set of layout properties. The browser may try it if the preferred placement overflows.

### 33. Show a feature query that applies anchor-positioned styles only when the browser recognizes the anchor name and position area properties.

**Answer:**

~~~
@supports (anchor-name: --action) and (position-area: block-end) {
    .action {
        anchor-name: --action;
    }

    .panel {
        position: absolute;
        position-anchor: --action;
        position-area: block-end;
    }
}
~~~

**Explanation:** Browsers that do not support these declarations skip the block. Define useful ordinary positioning outside the feature query.

### 34. A page repeats a card many times, and every card contains an element named --card-action. What can prevent one card's panel from finding another card's action?

**Answer:**

~~~
.card {
    anchor-scope: --card-action;
}
~~~

**Explanation:** The scope limits the named anchor lookup to each card component. Use a descriptive name and test the repeated structure.

### 35. A visually attached note should open only after a user activates a control. Is position-anchor enough? What else is needed?

**Answer:** No. Use an appropriate interactive pattern such as a popover or dialog, with an operable control and its built-in or implemented keyboard and focus behavior.

**Explanation:** Anchor positioning only handles placement. It does not create an open state, user interaction, or semantic relationship.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [56 - Print styles](../lessons/56-print-styles.md) | [Q&A](57-anchor-positioning.md) | [Example](../examples/57-anchor-positioning.md) | [58 - Styling view transitions](../lessons/58-view-transitions.md) |