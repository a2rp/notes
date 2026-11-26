# 41 - Custom properties and design tokens

Custom properties let you define reusable values in CSS and use them throughout a stylesheet. They are often used as design tokens for colors, spacing, typography, borders, and other shared choices. A well-organized token system makes changes easier and helps components stay visually consistent.

## Learning outcomes

After this chapter, you should be able to:

- Declare a custom property and use it with `var()`.
- Define shared design tokens at the root and override them in a component or theme.
- Provide a fallback value when a custom property is unavailable.
- Use `calc()` with complete custom property values.
- Recognize how custom properties participate in the cascade and inheritance.
- Explain what `@property` adds to a custom property.

## Declare and use a custom property

A custom property name begins with two hyphens. Declare it inside a CSS rule, then use `var()` where a property value is expected:

~~~css
:root {
  --color-brand: #075b9b;
}

.button {
  background-color: var(--color-brand);
}
~~~

Custom properties are case-sensitive. `--color-brand` and `--Color-brand` are different names. Choose a consistent naming style so tokens are easy to find.

The `var()` function substitutes a custom property's value into another declaration. A custom property does not apply a style by itself. It needs to be used in a regular property such as `color`, `padding`, or `border-radius`.

## Create shared design tokens

A design token is a named value that represents a design choice. CSS custom properties provide a built-in way to define and reuse those values.

~~~css
:root {
  --color-brand: #075b9b;
  --color-text: #1b2939;
  --color-muted: #526276;
  --color-surface: #ffffff;
  --color-page: #f2f6fa;

  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;

  --radius-control: 0.4rem;
  --radius-card: 0.9rem;
}

body {
  color: var(--color-text);
  background-color: var(--color-page);
}

.card {
  padding: var(--space-lg);
  color: var(--color-text);
  background-color: var(--color-surface);
  border-radius: var(--radius-card);
}
~~~

`:root` matches the document root element. Values declared there can be used by elements throughout the page because custom properties inherit by default.

Use names that describe a token's purpose. A semantic name such as `--color-surface` describes how a value is used. A name such as `--blue-700` describes a particular palette entry. A larger system may define both and connect them:

~~~css
:root {
  --blue-700: #075b9b;
  --color-action: var(--blue-700);
}
~~~

Components can then use the semantic token, while the palette value can change in one place.

## Provide a fallback

The second argument to `var()` is a fallback value. It is used when the referenced custom property is missing or has the guaranteed-invalid value:

~~~css
.notice {
  border-color: var(--notice-border, #075b9b);
}
~~~

A fallback can refer to another custom property:

~~~css
.button {
  background-color: var(--button-background, var(--color-brand, #075b9b));
}
~~~

Fallbacks help reusable components provide a default while still allowing a page to supply an override. They are not a general repair mechanism for every invalid declaration. If an existing custom property substitutes into a regular property with an incompatible value, the final declaration can become invalid.

## Override tokens by scope

Custom properties follow the cascade and inherit through the element tree. A closer declaration can override an inherited value for one component or one subtree:

~~~css
:root {
  --color-surface: #ffffff;
  --color-text: #1b2939;
  --color-accent: #075b9b;
}

.theme-dark {
  --color-surface: #182330;
  --color-text: #f1f5f9;
  --color-accent: #8cc8f0;
}

.card {
  color: var(--color-text);
  background-color: var(--color-surface);
  border-color: var(--color-accent);
}
~~~

Elements inside `.theme-dark` inherit the overridden values. The `.card` rules do not need a separate copy for the dark theme. A local override is also useful when a component exposes a small customization point:

~~~css
.button {
  --button-background: var(--color-accent);
  background-color: var(--button-background);
}

.button--warning {
  --button-background: #9a3412;
}
~~~

The warning button changes one token without duplicating the button's other styles.

## Use custom properties in calculations

A custom property can hold a complete value for `calc()`:

~~~css
:root {
  --space-unit: 0.25rem;
}

.card {
  padding: calc(var(--space-unit) * 6);
}
~~~

Keep units with the value. For example, `--space-unit: 0.25rem` is a length. Avoid trying to append a unit after substitution:

~~~css
:root {
  --space: 20;
}

/* This does not create the length 20px. */
.card {
  margin-top: var(--space)px;
}
~~~

CSS substitutes tokens rather than joining arbitrary text into a new token. Store a complete length such as `20px`, or use `calc()` with compatible values.

## Understand inheritance and the cascade

Custom properties participate in the normal cascade. If the same custom property is declared more than once on the same element, the cascade chooses the winning declaration. If no value is specified on an element, an unregistered custom property normally inherits from its parent.

~~~css
:root {
  --card-gap: 1rem;
}

.card-list {
  gap: var(--card-gap);
}

.card-list--compact {
  --card-gap: 0.5rem;
}
~~~

The compact list changes the token only within its subtree. Descendant cards that read `--card-gap` receive the closer value.

Custom properties are resolved where they are used. A variable that exists but contains a value invalid for the consuming property does not necessarily cause `var()` to use its fallback. Keep token values appropriate for the properties that consume them.

## Optional: register a custom property

An `@property` rule can register a custom property with a syntax, inheritance behavior, and initial value:

~~~css
@property --progress-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #075b9b;
}
~~~

Registration lets the browser validate values for the declared syntax and use the specified inheritance and initial value. It is an advanced option. Ordinary design tokens usually work without registration, so introduce it when typed values or explicit non-inheritance solve a real need.

## Common mistakes

- Forgetting the two leading hyphens in a custom property name.
- Declaring a token but never using it with `var()`.
- Treating custom property names as case-insensitive.
- Expecting a fallback to fix an existing value that is invalid for the consuming property.
- Defining tokens only at a distant scope when a local component override would be clearer.
- Storing a unitless number and appending `px` after `var()`.
- Creating many near-duplicate tokens without a clear purpose.
- Registering every custom property even when ordinary tokens are sufficient.

## Try it yourself

1. Define page, surface, text, and accent colors in `:root`.
2. Use spacing tokens for the padding and gap of a card layout.
3. Create a `.theme-dark` rule that overrides semantic color tokens.
4. Add a component-specific token for a warning button's background.
5. Add a `var()` fallback to a component token and remove the token to see the fallback.
6. Use `calc()` with a complete length token to create a larger spacing value.
7. Correct a declaration that tries to append a unit after `var()`.
8. Register a typed color with `@property` and identify its syntax, inheritance, and initial value.

## Key points

- Custom properties start with `--` and are used through `var()`.
- They follow the cascade and normally inherit, which makes scoped theme overrides possible.
- Design tokens give repeated design choices meaningful names.
- A fallback is used when a custom property is missing or has the guaranteed-invalid value, but it does not fix every invalid substituted value.
- Store complete CSS values, including their units.
- `@property` can add syntax checking, explicit inheritance, and an initial value when a registered token needs them.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [40 - Replaced elements, aspect ratios, and object fitting](40-replaced-elements-and-object-fitting.md) | [Q&A](../qnas/41-custom-properties-and-design-tokens.md) | [Example](../examples/41-custom-properties-and-design-tokens.md) | [42 - Generated content and counters](42-generated-content-and-counters.md) |