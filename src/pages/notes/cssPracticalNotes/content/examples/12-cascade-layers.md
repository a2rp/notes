# 12 - Cascade Layers: Example

## Goal

See how cascade layers affect the winning CSS declaration. This page compares normal layers, unlayered styles, specificity within one layer, reversed priority for important declarations, and revert-layer.

Copy the complete HTML into a file named index.html and open it in a browser. GitHub's Markdown preview also provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Cascade Layers</title>
  <style>
    @layer reset, base, framework, components, application, utilities;

    @layer reset {
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
      }
    }

    @layer base {
      body {
        padding: 2rem;
        background: #f1f5f9;
        color: #1e293b;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }

      h1,
      h2 {
        color: #173b68;
        line-height: 1.25;
      }

      main {
        max-width: 52rem;
        margin: 0 auto;
        padding: 2rem;
        background: white;
        border: 1px solid #cbd5e1;
        border-radius: 0.75rem;
      }

      section {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #cbd5e1;
      }

      #normal-layer-sample {
        color: #1d4ed8;
      }

      .revert-sample {
        color: #0f766e;
      }
    }

    @layer framework {
      .important-layer-sample {
        color: #1d4ed8 !important;
      }
    }

    @layer components {
      .sample {
        margin: 0.5rem 0;
        padding: 0.75rem 1rem;
        background: #f8fafc;
        border-left: 4px solid #94a3b8;
      }

      p {
        color: #15803d;
      }

      #same-layer-sample {
        color: #7e22ce;
      }

      #unlayered-sample {
        color: #7e22ce;
      }

      .revert-sample {
        color: #7e22ce;
      }

      .revert-sample.reset-layer {
        color: revert-layer;
      }
    }

    @layer application {
      #important-layer-sample {
        color: #dc2626 !important;
      }
    }

    /* Normal declarations outside explicit layers come after them. */
    p#unlayered-sample {
      color: #0f766e;
    }

    .note {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>Cascade layers</h1>
    <p>Each paragraph shows one layer rule in action.</p>

    <section>
      <h2>1. A later normal layer beats a more specific earlier layer</h2>
      <p id="normal-layer-sample" class="sample">
        This text is green because the components layer comes after base.
      </p>
    </section>

    <section>
      <h2>2. Specificity still matters inside the same layer</h2>
      <p id="same-layer-sample" class="sample">
        This text is purple because the ID selector wins inside components.
      </p>
    </section>

    <section>
      <h2>3. Unlayered normal styles follow explicit layers</h2>
      <p id="unlayered-sample" class="sample">
        This text is teal because the unlayered rule comes after components.
      </p>
    </section>

    <section>
      <h2>4. Important layer order is reversed</h2>
      <p id="important-layer-sample" class="important-layer-sample sample">
        This text is blue because the important declaration in framework wins.
      </p>
    </section>

    <section>
      <h2>5. revert-layer returns to a lower layer</h2>
      <p class="revert-sample reset-layer sample">
        This text is teal because revert-layer removes the components value.
      </p>
    </section>

    <aside class="note">
      <strong>Reminder:</strong> Layer order is compared before specificity.
      Normal and important declarations use opposite layer orders.
    </aside>
  </main>
</body>
</html>
~~~

## Expected output

The browser shows a centered white panel with five numbered examples:

1. **Green** for the first paragraph. The base layer gives the ID selector a blue color, but the later components layer supplies green through a type selector. Layer priority is compared before specificity.
2. **Purple** for the second paragraph. Both matching declarations are in components, so specificity is compared. The ID rule wins over the general type rule.
3. **Teal** for the third paragraph. The ID selector in components is purple, but an unlayered normal declaration comes after the explicit layers and supplies teal.
4. **Blue** for the fourth paragraph. Both declarations are important. Their layer order is reversed, so framework wins over application even though its selector is less specific.
5. **Teal** for the fifth paragraph. The components layer's purple value is rolled back by revert-layer, allowing the base layer's teal value to apply.

The panel backgrounds and borders only separate the examples. The text color in each paragraph is the value selected by the cascade.

## Why each example resolves that way

### Later normal layer beats specificity

The base layer uses #normal-layer-sample, which is more specific than the p rule in components. The components layer is later in the declared normal layer order, so its green color wins before specificity is compared.

### Specificity applies within a layer

For the second paragraph, both the p rule and #same-layer-sample are normal declarations in components. Since their layer priority ties, the ID selector has higher specificity and supplies purple.

### Unlayered normal declarations win over explicit layers

The rule for p#unlayered-sample is outside every explicit layer. Normal unlayered declarations occupy an implicit layer after the explicit layers, so teal wins over the more specific layered ID rule.

### Important declarations reverse the order

The framework and application declarations are both important. For important declarations, the earlier layer has higher priority. The framework color wins even though the application selector contains an ID.

### revert-layer rolls back the current layer

The base layer supplies teal. The components layer changes the color to purple, but the more specific .revert-sample.reset-layer rule sets color to revert-layer. The components layer's color is discarded for this property, so the base value is used.

## Try these changes

1. Move components before base in the layer statement. The first example changes to blue because base becomes the later normal layer.
2. Move the p rule and #same-layer-sample rule into different layers. Observe that layer priority is checked before their specificity.
3. Remove p#unlayered-sample. The third example becomes purple from the layered ID declaration.
4. Reverse framework and application in the layer statement. The important example changes to red because application becomes the earlier layer.
5. Remove revert-layer from .revert-sample.reset-layer. The final example becomes purple.
6. Add a second @layer components block after application. The components layer keeps its original position and the new block adds declarations to that layer.

## Key points

- The @layer statement establishes layer order before the blocks add styles.
- Later layers win for normal declarations, and unlayered normal declarations follow explicit layers.
- Important declarations reverse layer order.
- Specificity is compared after layer priority.
- Reopening a named layer adds to it without moving it.
- revert-layer rolls back the current layer's value for a property.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [11 - Specificity and resolving conflicts](../examples/11-specificity-and-conflicts.md) | [Lesson](../lessons/12-cascade-layers.md) | [Q&A](../qnas/12-cascade-layers.md) | [13 - Values, units, and percentages](13-values-units-and-percentages.md) |