# 12 - Cascade Layers

Cascade layers let you organize CSS into named groups with an intentional priority order. They help keep framework, base, component, and override styles from competing only through selector specificity.

A layer is part of the cascade. For declarations at the same origin and importance, the layer order is considered before selector specificity and source order. This means a simple selector in a later layer can beat a more specific selector in an earlier layer.

## Why use cascade layers?

Without layers, a stylesheet can accumulate increasingly specific selectors to override earlier rules:

~~~css
.card .title { color: navy; }
main .card .title { color: teal; }
#app main .card .title { color: purple; }
~~~

The later rules are harder to override and understand. Layers give groups of styles a clear order, so teams can decide which category should win before comparing selectors.

A layer does not change whether a selector matches. It changes the priority of declarations in the cascade.

## Create a layer

Use a named @layer block to put rules into a layer:

~~~css
@layer components {
  .button {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }
}
~~~

The rules inside the block belong to the components layer. You can add more rules to that same layer elsewhere:

~~~css
@layer components {
  .button-primary {
    background-color: navy;
    color: white;
  }
}
~~~

Repeated uses of the same layer name add rules to the same layer. The layer's position in the order is set by its first occurrence.

## Declare layer order up front

An @layer statement can establish the order before the layer blocks appear:

~~~css
@layer reset, vendor, base, components, utilities;
~~~

For normal declarations, the order here runs from lower priority to higher priority:

1. reset
2. vendor
3. base
4. components
5. utilities
6. unlayered normal styles

This makes the intended order visible near the start of the stylesheet. Rules added to these layers later do not change the order.

If you do not declare the order in advance, the first occurrence of each layer name establishes its position. A later layer has higher priority for normal declarations.

## Normal declarations: later layers win

For normal declarations from the same origin and context, a later layer wins over an earlier layer before specificity is compared:

~~~css
@layer base, components;

@layer base {
  #notice {
    color: navy;
  }
}

@layer components {
  p {
    color: teal;
  }
}
~~~

If the paragraph has id="notice", it is teal. The components layer comes after base, so its type selector wins over the earlier ID selector. Specificity is only compared after layer priority ties.

### Unlayered normal declarations

Normal declarations that are not inside an explicit layer belong to an implicit final layer. They take priority over normal declarations in every explicit layer:

~~~css
@layer components {
  #notice {
    color: navy;
  }
}

p {
  color: teal;
}
~~~

The unlayered type selector makes the paragraph teal, even though the ID selector is more specific. Put styles in a deliberate layer if they need to participate in your layer order.

## Important declarations: layer order reverses

For important declarations, the order of layers is reversed. An important declaration in an earlier layer beats an important declaration in a later layer, before specificity is compared.

~~~css
@layer framework, application;

@layer framework {
  .notice {
    color: navy !important;
  }
}

@layer application {
  #notice {
    color: tomato !important;
  }
}
~~~

If both selectors match, the important declaration in framework wins. The important layer order is reversed, so framework has higher priority than application for these important declarations. Its lower specificity does not change the result.

Important declarations that are not assigned to an explicit layer have lower priority than important declarations in explicit layers. This reverse ordering preserves the role of !important as a way to protect a declaration from ordinary overrides.

Layers do not remove the need to understand importance. The cascade still compares origin and importance before layer order. Avoid using !important for ordinary component styling.

## Nest layers when a layer needs internal groups

A layer can contain nested layers:

~~~css
@layer components {
  @layer buttons {
    .button {
      border-radius: 0.5rem;
    }
  }

  @layer forms {
    .field {
      border-radius: 0.25rem;
    }
  }
}
~~~

These are sublayers of components. Their order follows their first declaration within that parent. Nested layers are useful when one category needs its own smaller ordering system, but a flat layer list is easier to follow for many projects.

## Anonymous layers

An @layer block without a name creates an anonymous layer:

~~~css
@layer {
  .third-party-widget {
    font-family: sans-serif;
  }
}
~~~

Each anonymous layer is unique and cannot be named later to add more rules to it. Use named layers when you need to add to or order a group of rules across the stylesheet.

## Put an imported stylesheet in a layer

An imported stylesheet can be assigned to a named layer:

~~~css
@import url("vendor.css") layer(vendor);

@layer reset, vendor, base, components, utilities;
~~~

The @import rule must appear before ordinary style rules. The vendor rules then participate in the named layer order. For a stylesheet you control directly, a named @layer block is often easier to maintain than an import.

## Roll back a layer with revert-layer

The revert-layer keyword discards the current layer's value for a property and lets the cascade use a value from a lower-priority layer:

~~~css
@layer base, components;

@layer base {
  .notice {
    color: teal;
  }
}

@layer components {
  .notice {
    color: purple;
  }

  .notice.reset {
    color: revert-layer;
  }
}
~~~

For an element with both notice and reset classes, the components layer's color is rolled back. The base layer supplies teal.

revert-layer is different from revert. revert-layer rolls back the current layer, while revert rolls back declarations from the current origin according to the cascade.

## Plan a useful layer order

A common starting order separates broad defaults from increasingly specific application styles:

~~~css
@layer reset, vendor, base, layout, components, utilities, overrides;
~~~

Possible responsibilities include:

| Layer | Typical role |
| --- | --- |
| reset | Normalize default browser styles |
| vendor | Third-party stylesheets |
| base | Element defaults, typography, and shared variables |
| layout | Page regions and reusable layout rules |
| components | Buttons, cards, forms, and other UI parts |
| utilities | Small single-purpose helper classes |
| overrides | Intentional project-level adjustments |

The layer names and order depend on the project. Keep the order documented, declare it once near the beginning, and avoid adding new layers casually.

## How layers interact with specificity

The cascade compares layer priority before specificity. Specificity decides the winner only when the declarations have the same earlier priorities, including the same layer:

~~~css
@layer components {
  #notice {
    color: navy;
  }

  p {
    color: teal;
  }
}
~~~

Both rules are in components. If both match and are normal declarations, #notice wins because its selector is more specific. If specificity also ties, source order decides.

This distinction is useful:

- **Different layer priority:** compare the layer order first.
- **Same layer priority:** compare specificity, then source order if needed.
- **Different importance or origin:** resolve those earlier cascade priorities before comparing layers.

## Common mistakes

### Expecting a later selector to beat a later layer

Within normal declarations, the later layer wins before selector specificity is considered. A highly specific selector in an earlier layer can lose to a simple selector in a later layer.

### Forgetting unlayered styles

Unlayered normal styles occupy an implicit final layer and beat normal declarations in explicit layers. A stylesheet that introduces layers but leaves many rules unlayered may not behave as expected.

### Assuming important layers follow the same order

Important declarations reverse the layer order. Earlier explicit layers have higher priority than later explicit layers for important declarations.

### Thinking layer order follows the last block

A layer's position is determined by its first occurrence. Reopening the layer later adds declarations without moving it.

### Placing an @import after ordinary rules

Imports must appear before ordinary style rules. If importing a stylesheet into a layer, put the import in the valid import section at the top.

### Using too many layers

Layers should make priorities easier to understand. A complicated layer tree can make the cascade harder to follow than a small, documented order.

## Try it yourself

1. Create reset, base, and components layers. Put a type selector in base and a class selector in components that set the same color. Which one wins?
2. Add an ID selector in base and a type selector in components. Observe whether specificity changes the layer result.
3. Move the same competing normal declarations into one layer. Now compare their specificity.
4. Add an unlayered normal declaration that conflicts with a declaration in components. Observe which one wins.
5. Mark declarations in two layers important, then reverse their layer order and observe the result.
6. Add a later @layer components block. Confirm that it adds to the existing layer without changing its position.
7. Use revert-layer in the later layer and observe which earlier layer supplies the value.

## Key points

- Cascade layers group declarations into an explicit priority order.
- For normal declarations, later layers win; unlayered normal declarations are after explicit layers.
- For important declarations, layer order reverses; earlier explicit layers win.
- Layer priority is compared before specificity and source order.
- A layer's position is set by its first occurrence, and later blocks can add to it.
- Use revert-layer to roll back the current layer's value for a property.
- Declare a small, clear layer order near the beginning of the stylesheet.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [11 - Specificity and resolving conflicts](11-specificity-and-conflicts.md) | [Q&A](../qnas/12-cascade-layers.md) | [Example](../examples/12-cascade-layers.md) | [13 - Values, units, and percentages](13-values-units-and-percentages.md) |