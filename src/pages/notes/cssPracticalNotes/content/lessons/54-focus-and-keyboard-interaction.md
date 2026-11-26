# 54 - Focus styles and keyboard interaction

Keyboard users need to know which link, button, or form control will respond to their next action. CSS can make that focus visible, but styles alone do not make an element keyboard-operable. Start with the right HTML controls, preserve a logical order, and keep a visible focus indicator.

## Learning outcomes

After this chapter, you should be able to:

- Explain keyboard focus and sequential focus order.
- Style focused elements with `:focus` and `:focus-visible`.
- Use `:focus-within` to style a component containing focus.
- Preserve visible focus outlines and make them easy to see.
- Keep focused controls from being hidden by sticky content.
- Recognize when CSS cannot provide the keyboard behavior a widget needs.

## What keyboard focus means

Focus identifies the element that currently receives keyboard input. A user can often move through links, buttons, and form controls with Tab and Shift+Tab. The order should follow the page's structure and make sense when read aloud or visually scanned.

Use semantic HTML controls for their built-in keyboard behavior:

~~~html
<a href="#details">Read the details</a>
<button type="button">Show details</button>
<label for="email">Email address</label>
<input id="email" name="email" type="email">
~~~

A link navigates to a destination. A button performs an action. Inputs provide native focus and text-entry behavior. CSS can change how these elements look, but it cannot add the complete keyboard behavior of a button to an arbitrary `div`.

Avoid positive `tabindex` values to force a custom order. They can make focus jump away from the natural document sequence. For ordinary content, rely on semantic elements and source order. A `tabindex="0"` can add a custom element to sequential navigation when there is a specific, well-designed reason. A `tabindex="-1"` can make an element focusable by script without adding it to the normal Tab sequence.

## The `:focus` pseudo-class

The `:focus` pseudo-class matches an element that currently has focus. A basic rule can provide an indicator in browsers that do not support `:focus-visible`:

~~~css
:focus {
  outline: 2px solid #174a7e;
  outline-offset: 2px;
}
~~~

Do not remove the browser's focus indicator without providing a clear replacement. A focused control should remain visually distinguishable from the same control when it is not focused.

## The `:focus-visible` pseudo-class

The `:focus-visible` pseudo-class matches focused elements when the browser determines that a visible focus indicator is appropriate. Browsers commonly show it during keyboard navigation. The exact decision is based on user-agent heuristics, so do not treat it as an absolute keyboard detector.

~~~css
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
}
~~~

A useful pattern keeps a general `:focus` fallback and gives the more prominent `:focus-visible` state to browsers that support it:

~~~css
:focus {
  outline: 2px solid #174a7e;
  outline-offset: 2px;
}

:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
}
~~~

The second rule applies to the focused elements that match `:focus-visible`. Pointer interaction may still show a focus indicator, depending on the browser and the element. This is acceptable; visible focus can help pointer users too.

## Make the indicator easy to see

A focus indicator should be visible against the component and the surrounding page. Consider its thickness, contrast, offset, and the backgrounds it can appear against:

~~~css
.button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 3px;
}
~~~

An outline is drawn outside the element's border and does not take up layout space. This makes it useful for focus indication. A border-color change can also help, but should not be the only signal if the change is too subtle or shifts layout.

Do not use `outline: none` or `outline: 0` unless an equally visible replacement is provided. A focus style that only changes the background can disappear in forced colors mode or against a similar surrounding color. Check indicators on every surface, in dark mode, and with user-selected colors.

## Style a containing component with `:focus-within`

The `:focus-within` pseudo-class matches an element when it or one of its descendants has focus. It can highlight a whole form field or navigation group while the user interacts with a control inside it:

~~~css
.form-field {
  padding: 0.75rem;
  border: 1px solid #64748b;
  border-radius: 0.5rem;
}

.form-field:focus-within {
  border-color: #005fcc;
  box-shadow: 0 0 0 2px #005fcc;
}
~~~

The input still needs its own visible focus indicator. `:focus-within` adds context to the group; it does not move focus or make a child focusable.

## Keyboard behavior and visual styling are separate

CSS pseudo-classes reflect states. They do not create behavior:

- `:hover` represents pointer hover and is not a replacement for keyboard focus.
- `:focus` and `:focus-visible` style focus, but do not make an element enter the Tab order.
- `:focus-within` styles an ancestor when a descendant is focused, but does not make the ancestor interactive.
- `cursor: pointer` changes the pointer cursor, but does not add keyboard behavior or an accessible name.

If a custom widget needs arrow-key navigation, selection behavior, or other interaction patterns, those must be implemented and tested as part of the widget. Prefer native controls when they already provide the needed semantics and behavior.

## Keep focus visible while scrolling

Sticky headers, footers, and banners can cover a focused item after the browser scrolls it into view. Scroll padding can reserve space in the scroll container:

~~~css
:root {
  scroll-padding-block-start: 5rem;
}

section[id],
[tabindex="-1"] {
  scroll-margin-block-start: 5rem;
}
~~~

Choose values that match the actual sticky content. Also test at zoom and narrow widths, where a fixed header may cover more of the viewport. CSS spacing helps, but the page's layout and overlays still need to keep the focused control visible.

## Respect user color settings

Focus indicators must remain visible when colors change. In forced colors mode, let the browser use the user's palette and use a system color for the outline when needed:

~~~css
@media (forced-colors: active) {
  :focus {
    outline: 2px solid Highlight;
    outline-offset: 3px;
  }

  :focus-visible {
    outline: 3px solid Highlight;
  }
}
~~~

Avoid suppressing forced color adjustments for ordinary controls. Test the focus state in both light and dark schemes as well as in forced colors mode.

## Common mistakes

- **Removing the outline without a replacement:** Keyboard users may no longer know where they are.
- **Styling only `:hover`:** Keyboard interaction does not trigger pointer hover.
- **Assuming `:focus-visible` means keyboard only:** It follows browser heuristics and user needs, not a strict input-device detector.
- **Using a low-contrast indicator:** The focused state can blend into the control or its background.
- **Relying only on a shadow:** Shadows can be suppressed, clipped, or difficult to see in user-selected palettes.
- **Clipping an outline with an ancestor:** `overflow: hidden` can cut off an outside indicator.
- **Using CSS to imitate a button:** Visual styling does not supply native keyboard operation or semantics.
- **Creating a positive tabindex order:** It can conflict with document order and become hard to maintain.
- **Letting sticky content cover focus:** The user can lose track of the active control.

## Try it yourself

1. Navigate a page using only Tab and Shift+Tab. Record the order of links, controls, and buttons.
2. Add a visible `:focus` style, then add a more prominent `:focus-visible` style.
3. Check that focus is visible on links, buttons, text fields, selects, and textareas.
4. Add `:focus-within` to a form field wrapper and verify that the child control still has its own indicator.
5. Remove a focus outline and observe which users lose the location cue.
6. Add a sticky header and make sure focused controls are not hidden behind it.
7. Test focus indicators in forced colors mode and replace hard-coded outline colors with a system color where needed.
8. Compare a styled `div` with a native `button`. Identify the keyboard behavior CSS does not provide.

## Key points

- Use semantic HTML so controls have appropriate native keyboard behavior.
- Keep a visible focus indicator for keyboard-operable controls.
- `:focus-visible` follows browser heuristics about when focus should be indicated; it is not an absolute keyboard detector.
- `:focus-within` can add context to a group without replacing the child's focus indicator.
- Do not rely on hover, cursor changes, or color alone to communicate focus.
- Keep focused items from being hidden behind sticky content.
- CSS styles focus, but does not create widget semantics or keyboard behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [53 - Accessible CSS and user preferences](53-accessible-css-and-user-preferences.md) | [Q&A](../qnas/54-focus-and-keyboard-interaction.md) | [Example](../examples/54-focus-and-keyboard-interaction.md) | [55 - Color schemes and theming](55-color-schemes-and-theming.md) |
