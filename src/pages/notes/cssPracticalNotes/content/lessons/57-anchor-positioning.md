# 57 - Anchor positioning

CSS anchor positioning lets a positioned element place itself relative to another element, called its anchor. It is useful for attached notes, menus, badges, and popover panels that should stay aligned with a trigger while the page moves or changes size.

Anchor positioning builds on absolute or fixed positioning. The anchor is a geometric reference for layout. Naming an anchor does not open a menu, move content in the document flow, or create an accessible relationship by itself.

## Name an anchor and connect a positioned element

Give the anchor a custom name with anchor-name. Anchor names start with two hyphens, like custom property names.

~~~
.help-trigger {
    anchor-name: --help-trigger;
}
~~~

Make the other element positioned and connect it to that name with position-anchor.

~~~
.help-panel {
    position: absolute;
    position-anchor: --help-trigger;
}
~~~

The positioned element needs an absolute or fixed positioning mode for anchor-based placement. position-anchor chooses its default anchor. When a declaration uses the anchor() function without naming an anchor inside the function, it refers to this default anchor.

One anchor can have more than one name, and a positioned element can reference a named anchor directly in anchor(). Use descriptive names so it is clear which elements are connected.

## Place the element with position-area

position-area places the positioned element in a region of a 3-by-3 grid around its default anchor. The center cell contains the anchor, with cells around it for the block and inline sides.

~~~
.help-panel {
    position: absolute;
    position-anchor: --help-trigger;
    position-area: block-end;
    justify-self: anchor-center;
    margin-block-start: 0.5rem;
}
~~~

In a horizontal writing mode, block-end is below the anchor. block-start is above it. inline-start and inline-end refer to the sides along the inline axis. Logical directions adapt to writing mode and text direction, so they are often more reusable than physical values such as top and left.

anchor-center is an alignment value that centers a positioned element in relation to its anchor along the relevant alignment axis. Use justify-self or align-self to choose the axis.

position-area is more than a small offset. It selects a region that becomes the positioned element's containing block for sizing and inset calculations. If you only need to align particular edges or refer to more than one anchor, anchor() may be more direct.

## Place edges with anchor()

The anchor() function can be used in inset properties to align an edge of a positioned element with an anchor edge. For example, this places the top-left corner of a positioned note near the bottom-right of an anchor:

~~~
.note {
    position: absolute;
    left: anchor(--help-trigger right);
    top: anchor(--help-trigger bottom);
}
~~~

If the note already has position-anchor: --help-trigger, the anchor name can be omitted:

~~~
.note {
    position: absolute;
    position-anchor: --help-trigger;
    inset-inline-start: anchor(right);
    inset-block-start: anchor(bottom);
}
~~~

anchor() is for inset properties such as top, right, bottom, left, and their logical equivalents. It is not a general replacement for lengths in every CSS property.

You can provide a fallback length for cases where the anchor reference cannot be resolved:

~~~
.note {
    position: absolute;
    left: anchor(--help-trigger right, 0px);
    top: anchor(--help-trigger bottom, 0px);
}
~~~

This fallback is used when the function cannot resolve its anchor. It does not make an unsupported browser understand the anchor() function. Use @supports and ordinary layout rules to handle browsers that do not support the feature.

The explicit name inside anchor() is useful when different inset edges need to refer to different anchors. For example, one edge can align to a first anchor while another edge aligns to a second anchor.

## Match a size with anchor-size()

anchor-size() returns a dimension of an anchor. It can be used in sizing properties on an absolutely positioned element.

~~~
.help-panel {
    position: absolute;
    position-anchor: --help-trigger;
    min-inline-size: anchor-size(inline);
    max-inline-size: min(24rem, calc(100vw - 2rem));
}
~~~

Here the panel is at least as wide as the anchor's inline size, while the maximum keeps it from becoming too wide. The function can also refer to physical width or height, or to block and inline dimensions.

A fallback can be supplied if the size reference cannot be resolved:

~~~
.help-panel {
    min-inline-size: anchor-size(inline, 12rem);
}
~~~

Do not assume the anchor's size is always a useful size for the positioned element. Consider long text, narrow screens, zoom, and the containing block's available space.

## Handle overflow with position fallbacks

A panel placed beside or below an anchor may run outside its containing block. position-try-fallbacks lets the browser try alternate positions when the initial choice overflows.

~~~
.help-panel {
    position: absolute;
    position-anchor: --help-trigger;
    position-area: block-end;
    justify-self: anchor-center;
    position-try-fallbacks: flip-block;
}
~~~

flip-block tries the opposite side along the block axis. flip-inline tries the opposite inline side. Both can be listed when either axis may need to change.

The position-try shorthand can express the same simple fallback:

~~~
.help-panel {
    position-try: flip-block, flip-inline;
}
~~~

Fallbacks are tried when the current position overflows its inset-modified containing block. They do not guarantee that a panel will fit in every viewport or within every clipping ancestor. Choose the containing block deliberately, give the panel a sensible maximum size, and test around the edges of the layout.

For a custom alternate layout, define a named position option with @position-try:

~~~
.help-panel {
    position: absolute;
    position-anchor: --help-trigger;
    position-area: inline-end;
    margin-inline-start: 0.5rem;
    position-try-fallbacks: --panel-below;
}

@position-try --panel-below {
    position-area: block-end;
    margin-inline-start: 0;
    margin-block-start: 0.5rem;
    justify-self: anchor-center;
}
~~~

The named option can change positioning, margins, sizing, and self-alignment. Keep fallback declarations focused on those layout properties. The browser uses the first candidate that avoids the relevant overflow according to its fallback rules.

## Scope repeated anchor names

A page may render many reusable components that each contain an anchor and a positioned element. Reusing the same name without scoping can make it unclear which anchor a positioned element should use.

anchor-scope can limit a named anchor to a component subtree:

~~~
.help-card {
    anchor-scope: --card-action;
}

.help-card__action {
    anchor-name: --card-action;
}

.help-card__note {
    position: absolute;
    position-anchor: --card-action;
    position-area: block-end;
}
~~~

This makes the name local to each help-card scope. Use scoping when repeated components need the same internal name. For a single anchor, a unique descriptive name is simpler.

## Progressive enhancement

Anchor positioning is a newer CSS feature, so provide a useful layout before applying the enhancement. Use @supports to place the anchor-specific declarations behind a feature check.

~~~
.positioning-stage {
    position: relative;
}

.help-panel {
    margin-block-start: 1rem;
}

@supports (anchor-name: --help-trigger) and (position-area: block-end) {
    .help-trigger {
        anchor-name: --help-trigger;
    }

    .help-panel {
        position: absolute;
        position-anchor: --help-trigger;
        position-area: block-end;
        justify-self: anchor-center;
        margin-block-start: 0.5rem;
    }
}
~~~

Without support, the panel remains in normal flow after its anchor. With support, the additional declarations attach it to the anchor. Feature queries do not polyfill unsupported CSS. Check the browsers your project needs to support, and choose a fallback that still makes the content understandable.

## Anchor positioning and interactive components

Anchor positioning controls layout, not component behavior. It does not open or close a panel, move keyboard focus, announce a relationship, or make a plain element behave like a tooltip.

Use the appropriate HTML and interaction pattern for the component. A real menu or popover needs a control that opens and closes it, keyboard behavior, sensible focus handling, and appropriate semantics. CSS can position that interface after it is opened. If the relationship is only visual, do not imply that the CSS anchor name supplies semantic meaning.

Top-layer elements such as popovers and dialogs can also be positioned relative to anchors in supporting implementations. Their open state and focus behavior come from the HTML interaction mechanism; anchor positioning supplies the geometry. Check target browser behavior and reset any default inset or margin values that interfere with the intended placement.

## Common mistakes

- **Forgetting position:** anchor-name alone does not position another element. The positioned element needs a suitable positioning mode.
- **Mismatched names:** the value in position-anchor must match an anchor-name, including both leading hyphens.
- **Using anchor() in an unrelated property:** anchor() belongs in inset properties. Use anchor-size() for dimensions.
- **Treating position-area as a small offset:** it defines a placement region and affects containing block calculations.
- **Assuming fallback means viewport-aware in every layout:** fallbacks respond to overflow against the relevant containing block, which may be affected by ancestors.
- **Ignoring clipping and stacking:** overflow, containing blocks, and stacking contexts still affect what is visible and on top.
- **Reusing an unscoped name in repeated components:** scope repeated names or make anchor names unique.
- **Relying on unsupported syntax without a fallback:** keep ordinary layout useful and use @supports for progressive enhancement.
- **Treating visual placement as semantics:** CSS creates no control behavior or accessible relationship by itself.
- **Using anchor positioning to hide content:** positioning is not a substitute for a deliberate open and closed state.

## Try it yourself

1. Give a heading or control an anchor name that begins with two hyphens.
2. Absolutely position a nearby note and connect it with position-anchor.
3. Place the note at block-end with position-area and center it using anchor-center.
4. Rewrite the placement using anchor() in logical inset properties.
5. Add a fallback length to one anchor() function, then test what the fallback is for.
6. Use anchor-size() to make a panel at least as wide as its anchor.
7. Add flip-block and move the anchor close to the edge of its containing block.
8. Define an @position-try option that moves the panel to a different side.
9. Put two copies of the component on the page and use anchor-scope for their repeated name.
10. Wrap the enhancement in @supports and confirm the ordinary layout still makes sense.

## Key points

- anchor-name identifies an anchor, and position-anchor connects a positioned element to its default anchor.
- The positioned element must use absolute or fixed positioning for anchor-based placement.
- position-area selects a region around the anchor; anchor() aligns inset edges; anchor-size() uses anchor dimensions.
- Position fallbacks can try another side when a placement overflows its containing block.
- @supports and ordinary layout rules provide progressive enhancement, not a polyfill.
- Anchor positioning changes geometry only. HTML and interaction code still provide behavior and semantics.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [56 - Print styles](56-print-styles.md) | [Q&A](../qnas/57-anchor-positioning.md) | [Example](../examples/57-anchor-positioning.md) | [58 - Styling view transitions](58-view-transitions.md) |