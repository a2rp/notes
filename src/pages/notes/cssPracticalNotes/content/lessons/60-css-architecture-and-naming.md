# 60 - CSS architecture and naming conventions

CSS architecture is the set of decisions that helps styles remain understandable as a page or project grows. It covers how rules are named, grouped, scoped, and allowed to interact through the cascade.

There is no single naming system that fits every project. A useful architecture makes it clear where a rule belongs, reduces unintended effects, and lets a developer change one component without surprising changes elsewhere. Start with the smallest structure that solves the current problem, then add conventions when repeated work shows they are needed.

## Give each rule a clear responsibility

A stylesheet becomes easier to navigate when rules have recognizable roles:

- **Base styles** set sensible defaults for document elements, such as body text, headings, links, and form controls.
- **Layout styles** arrange larger regions, such as a page shell, header, sidebar, and main content.
- **Component styles** define reusable interface parts, such as a card, button, alert, or navigation menu.
- **Utility styles** provide small, single-purpose adjustments, such as visually hiding text or adding a standard spacing value.
- **State styles** show a meaningful state, such as selected, expanded, invalid, or disabled.

A small site may keep these roles in one well-organized file. A larger site may use one file per area or component. The names of the files matter less than a predictable place to find each kind of rule.

## Choose names for meaning

Prefer names that explain the role of an element in the interface:

~~~
.article-card {}
.article-card__title {}
.article-card--featured {}
~~~

These names tell a reader that the title belongs to an article card and that the card has a featured variation. They remain useful if the design changes from a bordered box to a plain row.

Names tied only to today's appearance are less durable:

~~~
.red-box {}
.big-text {}
.left-column {}
~~~

A red box may become blue, text size may change, or a column may move. A visual name is appropriate when the appearance itself is the meaning, such as a color swatch in a palette tool. For ordinary interface parts, name the role or purpose.

Keep names concise, specific, and consistent. Avoid unexplained abbreviations, names that repeat the element type without adding meaning, and selectors whose names describe a past implementation detail.

## Use a naming convention consistently

BEM is one optional naming convention. Its common pattern uses a **block**, an **element**, and a **modifier**:

- A **block** is a standalone component, such as article-card.
- An **element** is a part that depends on that block, such as its title or image.
- A **modifier** marks a variation or state, such as featured or compact.

The common spelling uses one underscore pair for elements and two hyphens for modifiers:

~~~
.article-card {}
.article-card__title {}
.article-card--featured {}
.article-card__title--large {}
~~~

In HTML, a modified block usually keeps its base class as well:

~~~
<article class="article-card article-card--featured">
  <h2 class="article-card__title">A useful article</h2>
</article>
~~~

A class can have several responsibilities when the names make them explicit. The base class supplies the normal component styles; the modifier adds only the variation.

BEM is a convention, not a CSS feature or a requirement. Teams may use another clear system, such as short component names, utility classes, or a combination. The important part is that the chosen pattern is documented and used consistently.

## Keep selectors easy to override

A class selector is often a useful default for component styling because it can be reused and does not depend on a particular nesting depth:

~~~
.article-card__title {
    margin-block: 0;
}
~~~

A long selector tied to the exact document tree is more fragile:

~~~
main section article h2 {}
~~~

If a wrapper is added or an article moves to another region, the selector may stop matching. Deeply nested selectors also make a rule harder to reuse and can increase specificity.

Avoid using IDs for ordinary component styling. An ID is intended to identify one element in a document and produces a selector that is harder to override than a class. Use IDs when a document feature needs an identifier, such as a fragment target, and use classes for reusable style hooks.

Do not qualify every class with an element name without a reason. A selector such as article.article-card is more restrictive than .article-card and may couple the style to one HTML element even when the component could be represented by another valid element later.

## Use semantic HTML and accessible state

A class name describes a styling hook. It does not replace the element's meaning or accessibility state. Use the correct HTML element for the content and interaction, then use a class when it helps style that element.

For a selected navigation link, an accessible state can be expressed by the relevant HTML attribute and styled directly:

~~~
<nav aria-label="Primary">
  <a class="site-nav__link" href="/" aria-current="page">Home</a>
  <a class="site-nav__link" href="/about">About</a>
</nav>
~~~

~~~
.site-nav__link[aria-current="page"] {
    font-weight: 700;
}
~~~

For a custom visual state that has no matching semantic attribute, a documented state class such as is-open or has-error can be useful. Keep the state source of truth clear. If an interactive control has aria-expanded, update that attribute along with the visual state instead of letting the class and accessible state disagree.

## Decide when to use components and utilities

A component class is useful when a group of styles belongs together and appears in more than one place:

~~~
.notice {}
.notice__title {}
.notice--warning {}
~~~

A utility class is useful for a small, deliberately reusable job:

~~~
.visually-hidden {}
.text-center {}
.flow-space {}
~~~

Utilities can reduce repeated one-off rules, but a page made of many unexplained utility classes can be hard to understand. Components can make intent clear, but creating a component for every single element can add unnecessary markup and CSS. Use both when each has a clear purpose.

Avoid building a giant collection of nearly identical classes before the design has repeated patterns. If the same value or pattern appears several times, consider a shared token, utility, or component. If it appears once, a local rule may be simpler.

## Keep scope intentional

Global element selectors are useful for document-wide defaults:

~~~
body {
    color: #243047;
    font-family: system-ui, sans-serif;
    line-height: 1.6;
}

h1,
h2,
h3 {
    line-height: 1.2;
}
~~~

Use them sparingly for rules that should apply broadly. A rule for every paragraph, button, or heading can accidentally affect content that has different requirements. Put component-specific differences behind component classes or a narrow scope.

A component should generally style its own parts without assuming its exact ancestor chain. When a style truly depends on context, make that relationship explicit with a contextual class or a container that has a clear role.

## Organize the cascade deliberately

The cascade resolves competing declarations using origin, importance, layer order, specificity, and source order. A team can reduce accidental competition by giving groups of styles an explicit order with cascade layers:

~~~
@layer reset, base, layout, components, utilities;

@layer base {
    body {
        font-family: system-ui, sans-serif;
    }
}

@layer components {
    .article-card {
        padding: 1rem;
    }
}

@layer utilities {
    .text-center {
        text-align: center;
    }
}
~~~

The first declaration establishes the named layer order. Normal declarations in later layers take precedence over normal declarations in earlier layers. Unlayered normal author styles take precedence over layered normal author styles, so be consistent about where project rules live.

Important declarations reverse layer order, which can make overrides surprising. Avoid using !important as a routine way to fix architecture. First check whether a rule is in the intended layer, whether its selector is unnecessarily specific, and whether the component should own that value.

Layers are optional. For a small stylesheet, clear sections and source order may be enough. Add layers when they solve a real ordering problem, especially when several sources of CSS need predictable precedence.

## Store repeated design values as custom properties

Custom properties can name values that are shared across components:

~~~
:root {
    --color-text: #243047;
    --color-surface: #ffffff;
    --color-accent: #155eef;
    --space-2: 0.5rem;
    --space-4: 1rem;
    --radius-card: 0.75rem;
}

.article-card {
    padding: var(--space-4);
    border-radius: var(--radius-card);
    color: var(--color-text);
    background: var(--color-surface);
}
~~~

A repeated value becomes easier to update and its purpose is visible. Use names that describe the design role, such as --color-text or --space-4, rather than names tied to one component if the value is shared.

Custom properties inherit by default. Define global design tokens at an appropriate shared scope, and define component-specific values near the component when that makes ownership clearer. A fallback in var(), such as var(--color-accent, blue), can help when a value may be absent, but it should not hide a typo in a required token.

## Pick a file structure that matches the project

A simple project can organize one stylesheet with headings:

~~~
/* Base */
/* Layout */
/* Components */
/* Utilities */
~~~

A project with several page areas might group files by role:

~~~
styles/
  base.css
  layout.css
  components/
    article-card.css
    site-navigation.css
  utilities.css
~~~

A large application might group styles near the components they serve, while sharing tokens and base styles centrally. Keep dependencies and loading order understandable. Splitting files does not automatically make CSS modular: imported styles still participate in the cascade, and a component file can still contain broad selectors.

Avoid both extremes: one giant stylesheet with no structure, and a complex folder hierarchy that makes a small project harder to work on. Let the codebase's size, team workflow, and repeated patterns guide the structure.

## Make changes safely

When changing an established stylesheet:

1. Find the existing rule and identify which elements it currently affects.
2. Check the selector's specificity, source order, and layer.
3. Decide whether the change belongs to a base rule, layout, component, utility, or state.
4. Use a name that fits the project's convention.
5. Check every page or component that shares the selector.
6. Remove obsolete rules after confirming they are no longer needed.
7. Review keyboard focus, accessible states, responsive layouts, and user preferences if the change affects them.

Avoid adding a new override at the end of the file without understanding the old rule. Repeated patches make the cascade difficult to reason about and can hide the original source of a style.

## Common mistakes

- **Mixing several naming systems:** Readers cannot predict how new classes should be named.
- **Naming every class after its color or position:** A design change makes the names misleading.
- **Using long descendant selectors:** Small HTML changes can break the styling relationship.
- **Using IDs for reusable styles:** Their high specificity makes later changes harder.
- **Creating a modifier without the base class:** The variation may not include the component's normal styles.
- **Letting visual state disagree with accessible state:** A control can look open while its aria-expanded value says false.
- **Making every declaration global:** Component-specific styles can leak into unrelated content.
- **Using !important to patch specificity repeatedly:** This makes later overrides harder to predict.
- **Adding layers without understanding their order:** Layer order changes which normal declarations win.
- **Creating tokens for every one-off value:** Unnecessary abstraction makes styles harder to follow.
- **Splitting files without a reason:** More files do not guarantee better separation.
- **Overengineering a small project:** Architecture should reduce work, not add ceremony.

## Try it yourself

1. Choose a small card or alert in an existing page and list its base, element, modifier, and state styles.
2. Rename classes that describe a temporary color or position so they describe the component's role.
3. Replace a deep descendant selector with a component class and compare how easy it is to reuse.
4. Add a featured modifier while keeping the base class on the element.
5. Identify a repeated color and spacing value, then promote only those repeated values to custom properties.
6. Group a stylesheet into base, layout, components, and utilities without changing the rendered design.
7. Add cascade layers to a small project and verify the declared order with competing normal declarations.
8. Inspect any !important declaration and see whether a clearer scope or layer removes the need for it.
9. Style an accessible current-page or expanded state from its HTML attribute.
10. Ask another person to find where a component is styled and note whether the architecture makes it easy.

## Key points

- CSS architecture makes styles easier to locate, reason about, and change as a project grows.
- Use names that communicate a component's role and keep one naming convention consistent.
- BEM is an optional convention for blocks, elements, and modifiers, not a CSS language feature.
- Prefer reusable class hooks and selectors that do not depend on deep document structure.
- Keep global defaults broad in purpose and component styles intentionally scoped.
- Use semantic HTML and keep visual state synchronized with accessible state.
- Custom properties can centralize repeated design values.
- Cascade layers can make source precedence explicit, but their ordering must be understood.
- Organize files to fit the size and workflow of the project.
- Make architecture simpler to maintain, not more complicated than the project requires.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [59 - Responsive typography and fluid sizing](59-responsive-typography-and-fluid-sizing.md) | [Q&A](../qnas/60-css-architecture-and-naming.md) | [Example](../examples/60-css-architecture-and-naming.md) | [61 - Resets and base styles](61-resets-and-base-styles.md) |