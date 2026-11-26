# 64 - Debugging with browser developer tools

Browser developer tools help you inspect the page the browser actually built and styled. They show the matching CSS rules, computed values, element dimensions, layout overlays, and stylesheet sources. Panel names differ between browsers, but the debugging ideas are similar.

Use the tools to form and test a specific explanation for a visual problem. A temporary change in developer tools is useful evidence, but update the actual source file so the fix survives a reload.

## Start with the exact element

Select the element that has the visible problem. You can usually use an element picker, or right-click the page and choose an inspect action.

Check that the selected node is the one you intended. A style on a child may come from an inherited parent value. A wrapper may control the width or position. If the problem concerns a pseudo-element, inspect the originating element and look for its ::before or ::after rules.

Do not begin by changing the nearest selector that looks familiar. Confirm the element, its classes, its ancestors, and whether it is inside a shadow tree.

## Compare matching rules with computed values

Developer tools commonly show a rules view and a computed view.

The rules view lists declarations from stylesheets that match the selected element. Declarations that lose in the cascade may be crossed out. Invalid declarations can be marked, and conditional or inactive declarations may appear dimmed or explain why they do not apply.

The computed view shows the resolved value the browser uses for a property. It can include values from inheritance, the cascade, and shorthand expansion. Expand or inspect a computed property to find the rule that supplied its value.

These views answer different questions:

- **Rules view:** Which declarations match, and which declarations are overridden or invalid?
- **Computed view:** What value is the browser using for this property?
- **Source link:** Which file and line contains the declaration?

For example, if a title is gray instead of green, search for color in the computed view. Then inspect the winning declaration and the competing rules. The first selector you notice is not necessarily the one that wins.

## Read why a declaration lost

When a declaration is crossed out, compare its competing rule. Check the cascade in a useful order:

1. Is the rule active for the current media or support condition?
2. Is the selector matching the element?
3. Is the declaration valid and applicable to that property?
4. Which origin, importance, and layer apply?
5. Which selector has higher specificity?
6. If the previous factors tie, which declaration comes later?

Do not solve every conflict by adding !important or making a selector longer. The losing declaration may be in the wrong layer, an old override may no longer be needed, or a state selector may be more specific than expected.

A declaration can match and still not affect the visible result. For example, width does not control the layout size of every inline element, and some properties do not apply to every display type. Developer tools may mark such a declaration inactive or provide a reason.

## Inspect the box model and layout

Use the box model view to distinguish content, padding, border, and margin. The highlighted regions can show which spacing is inside the element and which spacing is outside it.

If an element is too wide, check:

- The computed width and max-width or inline-size.
- Padding and border under the element's box-sizing model.
- Min-width constraints on flex or grid items.
- The dimensions of parent containers.
- Overflow and intrinsic sizes of children.

For layout problems, use the browser's grid or flexbox overlays when available. Check the container's tracks, gaps, alignment, and item sizes. A child may appear misplaced because the parent layout is different from what the CSS author expected.

Change one value temporarily and observe what changes. This turns the tool into a way to test a hypothesis. Once you understand the cause, make the change in the source stylesheet.

## Toggle states and conditions

Many developer tools can emulate pseudo-classes such as :hover, :focus, or :active on an inspected element. This is useful when a state disappears as soon as the pointer moves to the tools panel.

You can also inspect responsive behavior by changing the viewport size and using available device or media emulation controls. Check which media query becomes active, not just whether the page looks different.

Useful checks include:

- Narrow and wide viewport sizes.
- Keyboard focus and hover states.
- Reduced motion preferences.
- Light and dark color scheme conditions.
- Print styles.
- Container query conditions, when the browser exposes them.

Emulation is a quick diagnostic aid. It does not replace checking the page on the actual browsers, devices, input methods, and user settings that matter for the project.

## Confirm the stylesheet loaded

If a rule is missing entirely, check that the stylesheet loaded and the browser is using the expected file. A path typo, missing file, failed request, incorrect response, stale cache, or build output issue can make the browser render an older or incomplete stylesheet.

Use the network panel to check the stylesheet request and response. Follow the source link in the rules view to confirm that the file and line match the project source you are editing. If a build system produces generated CSS, confirm whether the browser is loading the source file or the generated output.

A change in developer tools may be temporary and disappear on reload. Some tools offer local overrides or workspace integration, but these are separate features that must be configured. By default, make the durable fix in the project source.

## Debug Shadow DOM deliberately

When inspecting a web component, check whether the selected element belongs to the light DOM or a shadow tree. Developer tools usually let you expand a host to inspect its shadow root and component styles.

A document stylesheet does not normally select internal elements in the shadow tree. Inspect the component's own rules, its host attributes, inherited custom properties, slots, and exposed parts. If an outer style is expected to affect an internal element, confirm that the component exposes an appropriate part.

For slotted content, inspect both the light DOM node and its rendered slot location. The node remains in the light DOM, even though it appears at a slot inside the component.

## Use a small debugging loop

A reliable debugging loop is:

1. Describe the visible symptom in one sentence.
2. Select the exact affected element.
3. Identify the property that controls the symptom.
4. Read its computed value.
5. Find the winning declaration and the rules that compete with it.
6. Check the box model, layout context, media condition, or state as needed.
7. Change one value temporarily to test the suspected cause.
8. Fix the source file and reload the page.
9. Recheck the affected state and nearby layouts.

Keeping the investigation narrow helps avoid unrelated changes. If a title has the wrong color, first trace color. If a card is too wide, inspect sizing and its parent layout before changing typography or spacing.

## Common mistakes

- **Inspecting the wrong node:** The visible result may be controlled by a parent, child, or pseudo-element.
- **Reading only the rules view:** The final computed value may come from inheritance or another rule.
- **Ignoring crossed-out declarations:** They show that a matching rule lost the cascade.
- **Ignoring inactive or invalid rules:** A declaration may not apply even if it appears in the stylesheet.
- **Changing many values at once:** It becomes difficult to tell which change affected the symptom.
- **Treating a temporary edit as a saved fix:** Developer tools edits often disappear on reload.
- **Adding !important immediately:** First understand the existing cascade and rule ownership.
- **Debugging a narrow layout at only one viewport:** Check the breakpoint and the actual container dimensions.
- **Assuming a stylesheet is current:** Confirm which file the browser loaded and whether a request failed or was cached.
- **Testing focus with a mouse only:** Use the keyboard and inspect focus-visible behavior.
- **Expecting page CSS to reach into a shadow tree:** Inspect the component boundary and public styling hooks.
- **Stopping when the main viewport looks correct:** Recheck hover, focus, narrow widths, zoom, and relevant preferences.

## Try it yourself

1. Inspect a heading and find its computed font-size, color, and line-height.
2. Find a crossed-out declaration and identify the rule that wins instead.
3. Change a padding value temporarily, observe the box model, then undo the experiment.
4. Toggle :hover or :focus on a link and inspect its state rules.
5. Resize the viewport until a media query changes, then find the active rule.
6. Intentionally mistype a property name and observe how the tool marks the invalid declaration.
7. Check the network panel for the stylesheet request and open its source location.
8. Make a temporary style edit, reload, and confirm whether it persists.
9. Inspect a flex or grid container with the layout overlay.
10. Inspect a custom element and identify the host, shadow root, slotted nodes, and exposed parts.
11. Reproduce a visual bug, change only one suspected declaration, and record what evidence confirms the cause.
12. Apply the final fix in the source file and verify the page again after a reload.

## Key points

- Inspect the exact element before changing CSS.
- Use the rules view to see matching declarations and the computed view to see resolved values.
- Follow source links to find the declaration that supplied a value.
- Use the box model and layout tools to inspect dimensions, gaps, tracks, and overflow.
- Emulate states and viewport conditions to test responsive and interactive styles.
- Check network requests when a stylesheet or rule is missing.
- Treat developer tools edits as experiments unless persistence is explicitly configured.
- Debug Shadow DOM from the correct tree and use documented public styling hooks.
- Change one thing at a time, then save and verify the actual source.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [63 - Styling Shadow DOM and web components](63-shadow-dom-and-web-components.md) | [Q&A](../qnas/64-debugging-with-browser-devtools.md) | [Example](../examples/64-debugging-with-browser-devtools.md) | [65 - Validation and browser compatibility](65-validation-and-browser-compatibility.md) |