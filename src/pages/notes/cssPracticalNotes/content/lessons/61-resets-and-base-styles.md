# 61 - Resets and base styles

Browsers apply user-agent styles to HTML elements so that an unstyled document has useful structure. Headings, lists, buttons, form controls, and other elements can therefore look different before an author stylesheet changes them. The exact presentation can vary by browser and platform.

A CSS reset or base stylesheet establishes the starting point for a project. A reset changes selected browser defaults. Base styles add the project's general typography, colors, and behavior. They are related, but they are not the same job. A good starting stylesheet removes only defaults that cause problems, keeps useful native behavior, and makes the project's choices explicit.

## Understand where browser defaults come from

When a page has no author styles, browser-provided styles still participate in its rendering. These user-agent styles help elements communicate their meaning. For example, headings are visually distinct, lists have markers, links look interactive, and form controls receive browser-specific presentation.

Do not assume every browser gives every element identical margins, font sizes, borders, or control appearance. Platform fonts and native controls may also differ. Inspect the browser you are using when a detail matters.

A reset does not remove HTML semantics. Making a heading look like ordinary text does not make it a paragraph, and removing a list marker does not turn a list into something else. Use semantic HTML for meaning and CSS for presentation.

## Reset and normalize are different approaches

A **reset** intentionally removes or replaces selected defaults so the project can build its own baseline. A common example is setting box sizing consistently or removing default margins before applying a spacing system.

A **normalization** approach keeps useful defaults while correcting differences that commonly appear between browsers. It tries to make default presentation more consistent without making every element visually blank.

A **base stylesheet** sets shared project-wide choices such as body font, text color, line height, link appearance, and heading rhythm. Many projects combine a small reset with their own base styles.

These terms are often used loosely. Focus on what the stylesheet does, not its label. Choose the defaults that help the project and preserve native behavior where it is useful.

## Make box sizing predictable

With the default content-box model, an element's declared width describes its content box. Padding and border add to the outside size:

~~~
.card {
    width: 20rem;
    padding: 1rem;
    border: 2px solid;
}
~~~

The card's outer width is larger than 20rem because the padding and borders are added around the content. With border-box sizing, the declared width includes the content, padding, and border, which is often easier to reason about.

A common baseline applies border-box to elements and pseudo-elements:

~~~
*,
*::before,
*::after {
    box-sizing: border-box;
}
~~~

This does not make every layout predictable by itself. Percentages, min/max constraints, intrinsic sizing, and flex or grid behavior still need to be understood. It does make the relationship between declared width and outer box size more straightforward.

## Decide deliberately what spacing to reset

Browsers give many elements default margins. A project may remove margins from common text and grouping elements, then add spacing through a consistent layout pattern:

~~~
body,
h1,
h2,
h3,
p,
ul,
ol,
figure,
blockquote {
    margin: 0;
}
~~~

This is a choice, not a requirement. If you remove default spacing, add an intentional way to create rhythm. For example, a reusable flow container can space its direct children:

~~~
.flow > * + * {
    margin-block-start: 1rem;
}
~~~

Do not reset every margin and padding without deciding what should replace them. It can make pages harder to read if paragraphs, headings, lists, and sections are left crowded together.

Lists need special care. Keep list markers for ordinary content lists. Remove markers and padding only from a list that is deliberately being used as a navigation or menu layout, then preserve its semantic list markup.

## Establish shared typography

Set the general font and line-height on the body. A unitless line-height scales with the text that inherits it:

~~~
body {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
}
~~~

Give headings their own line-height and spacing where needed. Do not make every heading the same size or remove all heading differences unless the design calls for it. Use a clear type scale and leave enough space for text to wrap.

Relative units such as rem and em make type easier to adapt. A body font size of 1rem follows the root font size. Browser zoom and user settings should remain usable, so avoid fixing the root font to a value that overrides the user's chosen default.

## Make media fit its container

Images and video can exceed a narrow parent if their intrinsic dimensions are larger. A useful baseline is:

~~~
img,
picture,
video {
    display: block;
    max-inline-size: 100%;
}
~~~

The max size prevents media from overflowing its container while preserving its intrinsic aspect ratio when its size is otherwise automatic. Do not force every image to the same height unless the design needs a crop. Use object-fit or a dedicated frame when a deliberate crop is required.

SVG icons are often used inline with text, so do not blindly apply display: block to every SVG. Choose whether the project treats SVG as standalone media or inline iconography.

## Keep form controls usable

Form controls can have native appearance and behavior that varies between browsers and operating systems. A reset should not remove that behavior without a clear reason.

Making controls inherit the page font is often useful:

~~~
button,
input,
select,
textarea {
    font: inherit;
}
~~~

You may also set color and a maximum inline size so controls fit their container. Keep native indicators and interaction states unless the design supplies an accessible replacement. If you restyle a checkbox, radio button, select, or other control, verify keyboard operation, visible focus, and state indication.

Do not remove button borders, outlines, or browser appearance as an isolated cleanup step. Decide how the component should look in its normal, hover, focus, disabled, and invalid states. A disabled control should still look disabled, and a keyboard user must be able to identify focus.

## Preserve focus visibility

Keyboard users need a visible indication of which control is active. If the default outline does not fit the visual design, replace it with a clear focus style:

~~~
:focus-visible {
    outline: 3px solid #a34d13;
    outline-offset: 3px;
}
~~~

Do not use outline: none unless another equally visible focus treatment is provided. Check focus against both light and dark surfaces, and ensure it is not clipped by an ancestor with overflow.

The :focus-visible pseudo-class lets the browser determine when a visible focus indicator is useful, including typical keyboard navigation. Test with a keyboard rather than assuming the pointer appearance is enough.

## Use logical properties for a flexible baseline

Logical properties describe the inline and block directions instead of assuming left, right, top, and bottom:

~~~
.page-shell {
    padding-inline: 1rem;
}

section {
    margin-block: 2rem;
}
~~~

This usually matches the intended spacing in both left-to-right and right-to-left writing modes. Use physical properties when the design specifically requires a physical direction.

## Avoid broad resets that erase useful behavior

The all property can reset many CSS properties at once, but a broad use such as all: unset can remove expected display, inheritance, typography, and interaction styling. It can make an element behave unexpectedly unless all needed styles are restored.

A reset that strips every default from links, controls, headings, and lists often creates more work than it saves. Keep the reset small, document unusual choices, and add component styles for elements that need a distinct appearance.

A reset also cannot guarantee identical rendering in every environment. Font availability, native controls, operating system settings, browser updates, user styles, and accessibility preferences still matter.

## A small starting stylesheet

This example shows one possible starting point. It resets a few common differences, then builds general styles on top:

~~~
@layer reset, base;

@layer reset {
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body,
    h1,
    h2,
    h3,
    p,
    ul,
    ol,
    figure {
        margin: 0;
    }

    img,
    picture,
    video {
        display: block;
        max-inline-size: 100%;
    }

    button,
    input,
    select,
    textarea {
        font: inherit;
    }
}

@layer base {
    body {
        min-block-size: 100vh;
        font-family: system-ui, sans-serif;
        line-height: 1.5;
    }

    h1,
    h2,
    h3 {
        line-height: 1.2;
    }

    :focus-visible {
        outline: 3px solid #a34d13;
        outline-offset: 3px;
    }
}
~~~

This is a starting point, not a mandatory recipe. Add only the rules that suit the project. Keep content lists readable, preserve control behavior, and give spacing and typography a deliberate system.

## Common mistakes

- **Assuming every browser starts from identical styles:** Defaults and native controls can vary by browser, platform, and user settings.
- **Removing all margins without adding rhythm:** Text and sections can become crowded.
- **Removing list markers from all lists:** Content lists lose a useful visual cue.
- **Applying display: block to every SVG:** Inline icons may no longer align with text.
- **Resetting native controls without rebuilding their states:** Focus, disabled, checked, or invalid states can become unclear.
- **Removing focus outlines without a replacement:** Keyboard users can lose track of the active control.
- **Using all: unset on common elements:** Useful display, inheritance, and interaction styles may disappear.
- **Treating a reset as an accessibility solution:** Semantic HTML, contrast, keyboard behavior, and user preferences still need attention.
- **Adding a large reset without understanding it:** Unneeded rules create extra work and can hide useful browser behavior.
- **Testing only one browser and device:** Font rendering and native controls can differ across environments.

## Try it yourself

1. Make a page with a heading, paragraphs, a content list, an image, a link, and a form control. View it before adding CSS.
2. Apply border-box sizing and compare the outer size of a padded card.
3. Remove margins from selected elements, then add a consistent flow pattern.
4. Keep markers on a content list while styling a separate navigation list without markers.
5. Set a body font and unitless line-height, then inspect how headings and paragraphs wrap.
6. Constrain an image to its container and preserve its aspect ratio.
7. Tab through links and controls. Confirm that every focused element is visible.
8. Compare a native button with a restyled button in normal, hover, focus, and disabled states.
9. Test the page at a narrow width, with browser zoom, and with a larger default text size.
10. Remove one reset declaration at a time and decide whether it solves a real project problem.

## Key points

- User-agent styles provide useful default presentation, but exact details can vary.
- A reset changes selected defaults; base styles add shared project choices.
- Border-box sizing makes declared dimensions include padding and borders.
- If default spacing is removed, replace it with a deliberate spacing rhythm.
- Keep content list markers and native control behavior unless there is a clear design reason to change them.
- Constrain media so it fits its container without unintended distortion.
- Preserve visible keyboard focus and test actual interactions.
- A small, intentional baseline is easier to maintain than a blanket reset.
- Reset styles do not replace semantic HTML, accessibility checks, or cross-browser review.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [60 - CSS architecture and naming conventions](60-css-architecture-and-naming.md) | [Q&A](../qnas/61-resets-and-base-styles.md) | [Example](../examples/61-resets-and-base-styles.md) | [62 - Organizing large stylesheets](62-organizing-large-stylesheets.md) |