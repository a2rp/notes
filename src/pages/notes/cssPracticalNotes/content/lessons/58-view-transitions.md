# 58 - Styling view transitions

A view transition animates the visual change between two rendered states. The browser captures the old state, updates the document, captures the new state, and presents those visuals through a set of view transition pseudo-elements. CSS can style and animate those pseudo-elements.

CSS customizes a transition, but it does not by itself start a same-document transition. JavaScript or browser navigation starts the transition. If view transitions are unsupported or disabled, the page should still update and remain usable.

## Same-document transitions

A same-document transition can be started around a DOM update with document.startViewTransition():

~~~
function showView(nextView) {
    const update = () => renderView(nextView);

    if (typeof document.startViewTransition === "function") {
        document.startViewTransition(update);
    } else {
        update();
    }
}
~~~

The callback updates the DOM to the new state. The browser captures the old and new visual states around that update. The transition API does not replace the renderView function or the app's navigation logic.

Keep the non-transition path functional. A transition is a visual enhancement, so unsupported browsers should still get the updated content.

## The view transition pseudo-element tree

A view transition is represented by pseudo-elements, not extra elements inserted into the document's HTML. For each participating name, the browser can create a group containing an image pair and old and new snapshots.

~~~
::view-transition
└── ::view-transition-group(name)
    └── ::view-transition-image-pair(name)
        ├── ::view-transition-old(name)
        └── ::view-transition-new(name)
~~~

The old pseudo-element displays the captured old appearance. The new pseudo-element displays the new appearance. The group handles the relationship between the two states, including size and position changes. The image-pair pseudo-element groups the old and new captures.

The browser supplies a default root transition that cross-fades the document. The root transition uses the name root. You can customize its pseudo-elements:

~~~
@keyframes root-fade-out {
    to {
        opacity: 0;
    }
}

@keyframes root-fade-in {
    from {
        opacity: 0;
    }
}

:root::view-transition-old(root) {
    animation: 180ms ease-out both root-fade-out;
}

:root::view-transition-new(root) {
    animation: 240ms ease-in both root-fade-in;
}
~~~

The transition pseudo-elements are part of a visual layer above the document. They do not change the document's HTML order or provide semantic content.

## Give important elements a transition name

By default, the root captures the page as one view. Use view-transition-name to have a specific element captured and animated independently.

~~~
.product-image {
    view-transition-name: product-image;
}
~~~

Use the same name for the visual element representing the same conceptual content in both states. For example, an image in a product list and the larger image in the product detail view can share the product-image name.

A transition name must be unique among elements in a single captured state. Do not give the same name to every card in a list. Duplicate names can cause the transition to be skipped or aborted. Set view-transition-name: none when an element should not participate as an independent named capture.

~~~
.decorative-background {
    view-transition-name: none;
}
~~~

Each unique name gets its own group and image pair. Style only the parts of that pseudo-element tree that need a custom effect.

~~~
:root::view-transition-group(product-image) {
    animation-duration: 420ms;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
}

:root::view-transition-old(product-image) {
    animation: 180ms ease-out both root-fade-out;
}

:root::view-transition-new(product-image) {
    animation: 240ms ease-in both root-fade-in;
}
~~~

The browser interpolates the group's geometry between the old and new captures. The old and new pseudo-elements can have separate opacity or other animation styles.

## Understand the pseudo-element selectors

These selectors target different levels of a named transition:

- ::view-transition targets the transition's root pseudo-element.
- ::view-transition-group(name) targets the group for a particular transition name.
- ::view-transition-image-pair(name) targets the old and new captures as a pair.
- ::view-transition-old(name) targets the old visual capture.
- ::view-transition-new(name) targets the new visual capture.

For example, use the group to control movement or duration, and use old or new to define how the images enter or leave.

~~~
:root::view-transition-group(profile-photo) {
    animation-duration: 350ms;
}

:root::view-transition-old(profile-photo) {
    filter: grayscale(1);
}

:root::view-transition-new(profile-photo) {
    filter: none;
}
~~~

These are CSS pseudo-elements. They are not queryable HTML nodes, and selectors such as #profile-photo::view-transition-new do not target the document element that originally had the name. The pseudo-elements are selected from the document root.

## Use a shared class for repeated styles

When several named elements should share the same animation settings, newer implementations may support view-transition-class. It gives transition pseudo-elements a shared selector label without reusing a view-transition-name.

~~~
@supports (view-transition-class: card) {
    .product-card {
        view-transition-class: card;
    }

    :root::view-transition-group(.card) {
        animation-duration: 300ms;
        animation-timing-function: ease-out;
    }
}
~~~

Each participating card still needs a unique view-transition-name when each one should transition independently. The class groups styling; it does not create unique transition identities. This feature is newer, so use a feature query and check support in target browsers.

## Cross-document transitions

A browser navigation between documents can also have a view transition in supporting browsers. The CSS @view-transition rule can opt a document into automatic navigation transitions:

~~~
@view-transition {
    navigation: auto;
}
~~~

For a cross-document transition, the source and destination documents both need to opt in. Shared view-transition-name values can pair corresponding elements between the two states. Cross-document behavior has different browser support from same-document transitions, so verify the browsers and navigation scenarios that matter to the project.

Do not add this rule when the site does not need navigation transitions. Keep navigation and page rendering correct without an animation.

## Respect reduced motion

Some users request reduced motion in their operating system or browser. Provide a shorter or less pronounced transition for that preference.

~~~
@media (prefers-reduced-motion: reduce) {
    :root::view-transition-group(root),
    :root::view-transition-group(product-image) {
        animation-duration: 1ms;
    }

    :root::view-transition-old(root),
    :root::view-transition-new(root),
    :root::view-transition-old(product-image),
    :root::view-transition-new(product-image) {
        animation-duration: 1ms;
    }
}
~~~

A minimal duration reduces movement while allowing the DOM update to complete normally. You can also remove nonessential motion entirely. Do not make content appear only during an animation or delay access to the new state until an animation finishes.

## Progressive enhancement and feature detection

View transition support can vary by browser, API, and navigation type. Keep the ordinary interface complete, and guard newer CSS styling where appropriate.

~~~
@supports (view-transition-name: none) {
    .product-image {
        view-transition-name: product-image;
    }
}
~~~

Feature queries can check CSS syntax support. JavaScript should still check for document.startViewTransition before calling it. A CSS feature query does not detect every API detail or guarantee the same behavior across all browsers.

Avoid styling the transition pseudo-elements as if they were persistent page content. They exist during the transition, not as a replacement for the updated document.

## Common mistakes

- **Expecting CSS to start a same-document transition:** The update must be wrapped in the View Transition API call.
- **Giving several elements the same active name:** Each name must identify at most one element in a captured state.
- **Using a transition name as an HTML ID:** The values have different roles. IDs identify document elements; view-transition-name connects visual captures.
- **Styling the original element with a transition pseudo-element selector:** The pseudo-elements are selected from the root, not from the original element.
- **Animating every layer without understanding the default:** The browser already provides a root cross-fade. Add only the changes that improve the experience.
- **Assuming the old capture stays live:** It is a visual snapshot. Live media may appear frozen in the old capture.
- **Treating a CSS transition class as a unique name:** A shared class groups styles, while each participating element still needs an appropriate unique name.
- **Opting into document navigation transitions on only one page:** Both pages need compatible participation for cross-document transitions.
- **Ignoring reduced motion:** Offer a short or less pronounced transition when users request reduced motion.
- **Depending on transition support for navigation:** The page update and content must work when no transition runs.

## Try it yourself

1. Wrap a same-document content update in document.startViewTransition and keep a direct update fallback.
2. Customize the root old and new pseudo-elements with a simple cross-fade.
3. Give one meaningful image the same view-transition-name in the old and new states.
4. Use ::view-transition-group(name) to adjust the shared transition duration.
5. Give a second element a different unique name and compare its animation.
6. Temporarily give two elements the same name in one state and inspect what happens.
7. Set an unrelated element to view-transition-name: none.
8. Add a prefers-reduced-motion rule and inspect the shorter transition.
9. If target browsers support it, use view-transition-class to share styles across separately named elements.
10. For a multi-page site, explore @view-transition navigation opt-in on both pages and verify the non-transition navigation path.

## Key points

- View Transitions animate captured visuals around a document update or navigation.
- JavaScript or browser navigation starts the transition; CSS styles its pseudo-elements.
- view-transition-name identifies an element that should be captured independently and should be unique in each state.
- Group, old, new, and image-pair pseudo-elements provide different levels for styling.
- Cross-document transitions and newer Level 2 CSS features have support that should be checked in target browsers.
- Reduced-motion preferences and a functional non-transition path keep the experience usable.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [57 - Anchor positioning](57-anchor-positioning.md) | [Q&A](../qnas/58-view-transitions.md) | [Example](../examples/58-view-transitions.md) | [59 - Responsive typography and fluid sizing](59-responsive-typography-and-fluid-sizing.md) |