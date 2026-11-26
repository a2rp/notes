# 62 - Organizing large stylesheets

As a project grows, the main CSS challenge is often finding and safely changing a rule. A stylesheet may contain shared defaults, page layouts, reusable components, utilities, responsive variations, and states. Good organization makes those responsibilities visible and keeps the cascade predictable.

There is no single file structure that works for every project. Organize around how the team finds and changes styles. Keep the number of files and conventions small enough that a new contributor can understand where a rule belongs.

## Start with one clear entry point

An entry point is the stylesheet or set of stylesheets that the HTML page loads. Make that starting point easy to identify.

A small site may use one file with clear sections:

~~~
/* Layer order */
/* Tokens and base styles */
/* Layout */
/* Components */
/* Utilities */
~~~

A larger site may use several files and link them from HTML:

~~~
<link rel="stylesheet" href="./styles/00-layer-order.css">
<link rel="stylesheet" href="./styles/01-reset.css">
<link rel="stylesheet" href="./styles/02-base.css">
<link rel="stylesheet" href="./styles/03-layout.css">
<link rel="stylesheet" href="./styles/04-components.css">
<link rel="stylesheet" href="./styles/05-utilities.css">
~~~

The page makes its stylesheet dependencies visible. Keep the order intentional and avoid loading the same rules more than once.

## Choose a grouping model

Styles can be grouped by layer or by component.

A **layer-first** structure groups styles with the same broad responsibility:

~~~
styles/
  reset.css
  base.css
  layout.css
  components.css
  utilities.css
~~~

This is easy to understand when the project has a small number of components. Over time, components.css can grow into a large file.

A **component-first** structure keeps each component's styles together:

~~~
styles/
  base/
    reset.css
    typography.css
  layout/
    page-shell.css
    grid.css
  components/
    button.css
    card.css
    site-header.css
  utilities/
    spacing.css
~~~

This can make a component easier to locate and change. It may create more files and make global ordering less obvious.

A **feature-first** structure groups styles by a page or product area:

~~~
styles/
  account/
  catalog/
  checkout/
  shared/
~~~

This can work well when separate parts of an application have different owners or are loaded on different pages. Shared tokens, resets, and components still need a clear home.

These approaches can be combined. For example, a project can group by feature and keep component files inside each feature. Avoid duplicating the same component or token in several areas.

## Declare cascade layers before using them

Cascade layers provide an explicit order for groups of styles. Declare the intended order once near the beginning of the stylesheet system:

~~~
@layer reset, base, layout, components, utilities;
~~~

Then assign styles to those layers:

~~~
@layer base {
    body {
        font-family: system-ui, sans-serif;
    }
}

@layer components {
    .card {
        border-radius: 0.75rem;
    }
}
~~~

For normal declarations in the same origin and importance, later named layers take precedence over earlier named layers. A utility layer can therefore intentionally override a component layer when both set the same property.

Layer order is established by the first declaration of each layer name. If styles are split across files, keep the order declaration in a predictable entry file and use the same layer names everywhere. Do not let a component file accidentally establish a conflicting order before the entry point.

Unlayered normal author styles take precedence over layered normal author styles. If a project adopts layers, put its styles in layers consistently. Important declarations have a different precedence order, so do not use layers as a substitute for understanding the cascade.

## Keep files focused and discoverable

Give files names that describe their contents. A file called card.css is easier to find than a series of numbered files whose purpose is unclear. If ordering is critical, use a single entry file to show the order and keep filenames descriptive.

A component file can contain its base styles, elements, and variations:

~~~
@layer components {
    .notice {}
    .notice__title {}
    .notice--warning {}
}
~~~

A shared base file can contain document-wide defaults, while page layout files arrange larger regions. Avoid mixing unrelated site-wide rules into a component file.

Not every selector needs its own file. A small component with a few rules may be easier to maintain beside related components. Split files when it helps a person find ownership, review a change, reuse a component, or load only a page's needed CSS.

## Link stylesheets directly when the page uses separate files

HTML link elements make the stylesheet entry points explicit:

~~~
<link rel="stylesheet" href="./styles/base.css">
<link rel="stylesheet" href="./styles/components/card.css">
<link rel="stylesheet" href="./styles/components/site-header.css">
~~~

The linked stylesheets participate in the same cascade. Their order can matter for declarations in the same layer or with otherwise equal cascade precedence. Keep the link order documented and deliberate.

Native CSS @import is another way to include a stylesheet:

~~~
@import url("./base.css");
@import url("./components/card.css");
~~~

Place @import rules at the start of a stylesheet according to the CSS syntax rules. The imported rules participate in the cascade at the point of the import. This can be useful for a small aggregator, but long chains of imports make the dependency order harder to see. Avoid mixing several loading strategies without a clear reason.

If a build tool combines CSS files, treat the generated output as the browser's stylesheet. Keep the source modules organized and check that the build preserves intended order and layer assignments.

## Keep Sass and CSS concepts distinct

Sass is a stylesheet preprocessor with its own module system. In Sass, @use loads a module's members into a local namespace, and @forward can expose members to other Sass modules. Sass files are compiled to CSS before the browser uses them.

The browser's CSS @import rule and Sass module rules are not interchangeable. Plain CSS does not understand Sass variables, mixins, @use, or @forward. If a project uses Sass, organize Sass source with Sass's module system and inspect the compiled CSS when debugging the browser cascade.

For a project using plain CSS, use linked CSS files, cascade layers, and custom properties without adding a preprocessor solely to create more files.

## Organize by ownership and dependency

A useful structure makes it clear who owns each rule:

- **Tokens** own shared design values such as colors, type sizes, spacing, and radii.
- **Base styles** own document-wide defaults.
- **Layout styles** own page regions and major arrangements.
- **Component styles** own reusable interface parts and their variations.
- **Utilities** own deliberate, single-purpose helpers.

Keep dependencies moving in a clear direction. A component may use shared tokens and base styles. A shared base rule should not depend on the markup of one particular page component.

When several files define the same component selector, the ownership becomes harder to understand. Consolidate the component's rules where practical, or clearly document when a separate file contains an intentional override.

## Avoid making source order a mystery

Source order is one part of the cascade. If two declarations have the same cascade precedence, the later one can win. A stylesheet system should make that order understandable instead of relying on accidental file loading or duplicate overrides.

Before adding a new rule, locate the existing one and check:

1. Which file owns the rule?
2. Which layer contains it?
3. What specificity does its selector have?
4. Which stylesheet loads later?
5. Is the new declaration a component rule, a state, a utility, or a base choice?

Fix the source of a conflict instead of adding another override at the end of a file. Remove obsolete declarations after verifying they are no longer needed.

## Refactor gradually

A large stylesheet does not need to be rewritten all at once. Move a small, related group of rules, keep the rendered behavior stable, and verify the pages that use those rules. Repeat as the new structure becomes clear.

During a refactor:

- Keep selectors and declarations together when they have the same responsibility.
- Preserve cascade order while moving rules between files.
- Remove duplicate declarations only after checking their effects.
- Avoid renaming classes unless the rename improves clarity or fixes a real problem.
- Keep a short note describing conventions that are not obvious from the file tree.

A file split is successful when it makes a change easier to locate and review. More folders are not automatically better organization.

## Common mistakes

- **Splitting every component into tiny files:** Finding a rule can take longer than reading a cohesive file.
- **Keeping a single file with no headings or ownership:** Related rules become difficult to locate.
- **Using filenames that hide their purpose:** Descriptive names help contributors navigate.
- **Declaring cascade layer order in several unpredictable places:** The first declaration establishes the order.
- **Mixing layered and unlayered author styles casually:** Unlayered normal declarations can take precedence over layered normal declarations.
- **Relying on link order without documenting it:** Later rules can win when cascade precedence is otherwise equal.
- **Creating long chains of CSS @import rules:** Dependencies and ordering become harder to follow.
- **Confusing Sass @use with CSS @import:** They belong to different stylesheet systems.
- **Defining the same component in unrelated files:** Ownership and maintenance become unclear.
- **Adding overrides without removing obsolete rules:** The stylesheet accumulates contradictory declarations.
- **Refactoring everything at once:** It becomes difficult to identify the source of a visual regression.
- **Adding a build tool only to create folders:** Use a tool when it solves a project need.

## Try it yourself

1. Inspect a stylesheet and group its rules into reset, base, layout, components, and utilities.
2. Choose whether a repeated pattern belongs in a shared component or a page-specific file.
3. Create a single entry point that lists stylesheet dependencies in a readable order.
4. Declare named cascade layers once, then place rules from several files into those layers.
5. Add one component's styles in a single focused file and identify which shared tokens it uses.
6. Find repeated declarations that belong to one component and move them together.
7. Trace a conflicting property through source order, layer, and selector specificity.
8. Remove an obsolete override after checking every page that used it.
9. If using Sass, identify which files are Sass modules and which are plain CSS output.
10. Ask a teammate to locate a component rule using only the file structure and naming.

## Key points

- Organize stylesheets around how people find and change rules.
- A single file with clear sections can be right for a small project.
- Layer-first, component-first, and feature-first structures each have tradeoffs.
- Cascade layers can make precedence explicit across separate files.
- Declare layer order once and use layer names consistently.
- Direct stylesheet links make page dependencies visible; native CSS imports should be used deliberately.
- Sass module rules and browser CSS imports are different systems.
- Give each token, base rule, layout, component, and utility a clear owner.
- Refactor incrementally and preserve the cascade while moving rules.
- A good structure reduces maintenance work rather than adding ceremony.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [61 - Resets and base styles](61-resets-and-base-styles.md) | [Q&A](../qnas/62-organizing-large-stylesheets.md) | [Example](../examples/62-organizing-large-stylesheets.md) | [63 - Styling Shadow DOM and web components](63-shadow-dom-and-web-components.md) |