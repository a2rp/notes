# 10 - The Cascade and Inheritance: Example

## Goal

Compare conflicting CSS declarations, see source order and specificity resolve ties, and observe which values inherit from a parent.

## Complete example

Copy the complete document into a file named `index.html`, then open it in a browser and compare each paragraph with the notes below.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Cascade and Inheritance</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem;
      background-color: #f1f5f9;
      color: #334155;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    .page {
      max-width: 48rem;
      margin: 0 auto;
      padding: 1.5rem;
      background-color: white;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    h1,
    h2 {
      color: #173b68;
    }

    #specificity-demo {
      color: #b91c1c;
    }

    p {
      color: #15803d;
    }

    .source-order {
      color: #1d4ed8;
    }

    .source-order {
      color: #7c3aed;
    }

    #priority-demo {
      color: #b91c1c;
    }

    .important-rule {
      color: #1d4ed8 !important;
    }

    .combined-rule {
      color: #1e40af;
      font-weight: bold;
    }

    #per-property {
      color: #be123c;
    }

    .inheritance-demo {
      margin-top: 1rem;
      padding: 1rem;
      color: #6d28d9;
      font-family: Georgia, serif;
      border: 2px solid #c4b5fd;
      border-radius: 0.5rem;
    }

    .child-override {
      color: #b91c1c;
    }

    .keyword-parent {
      padding: 1rem;
      color: #166534;
      border: 1px solid #86efac;
      border-radius: 0.5rem;
    }

    .explicit-inherit {
      color: inherit;
    }

    .explicit-unset {
      color: unset;
    }

    .initial-display {
      display: block;
      display: initial;
      padding: 0.25rem 0.5rem;
      background-color: #dbeafe;
      border: 1px solid #60a5fa;
    }
  </style>
</head>
<body>
  <main class="page">
    <h1>The Cascade and Inheritance</h1>

    <h2>Specificity and source order</h2>
    <p id="specificity-demo">
      The ID rule wins over the later type selector.
    </p>
    <p class="source-order">
      This text is purple because the later equal-specificity rule wins.
    </p>

    <h2>Importance and property-by-property results</h2>
    <p id="priority-demo" class="important-rule">
      This text is blue because the class declaration is important.
    </p>
    <p id="per-property" class="combined-rule">
      This text is red and bold because different declarations win different properties.
    </p>

    <h2>Inheritance</h2>
    <section class="inheritance-demo">
      <p>The paragraph has its own type rule, so it is green.</p>
      <strong>This bold text inherits purple color and Georgia from the section.</strong>
      <span class="child-override">This span has its own red color.</span>
    </section>

    <h2>CSS-wide keywords</h2>
    <section class="keyword-parent">
      <p class="explicit-inherit">This paragraph explicitly inherits the parent's green color.</p>
      <p class="explicit-unset">For color, unset behaves like inherit.</p>
      <div class="initial-display">This div uses the initial display value.</div>
      <span>Neighboring inline text follows the div.</span>
    </section>
  </main>
</body>
</html>
```

## Expected output

The browser shows a centered white page with examples grouped under headings.

- The first demonstration paragraph is red. Its ID selector beats the later type selector.
- The source-order paragraph is purple. Two `.source-order` rules have equal priority, so the later color wins.
- The important-rule paragraph is blue. The class rule's `!important` declaration beats the normal ID declaration in the same author layer.
- The property-by-property paragraph is bold and red. The class rule supplies bold text, while the ID rule supplies the winning color.
- The paragraph inside the inheritance section is green because it matches the page's `p` rule. The bold text inherits purple and Georgia from its parent section. The final span has its own red color.
- The border and padding surround the inheritance section. They are not copied onto its children.
- Both keyword paragraphs are green because `inherit` explicitly inherits color and `unset` behaves like `inherit` for this inherited property.
- The blue `div` box flows inline with the neighboring text because the initial value of `display` is `inline`, even though a `div` is normally displayed as a block by browser styles.

The `!important` declaration is included to demonstrate how priority works. Avoid using it as a routine way to resolve styling conflicts.

## How the rules resolve

### A more specific selector beats later lower-specificity rules

```css
#specificity-demo {
  color: #b91c1c;
}

p {
  color: #15803d;
}
```

Both rules can match the paragraph. The ID selector has greater specificity than the type selector, so red wins even though the `p` rule appears later.

### Source order breaks a tie

```css
.source-order {
  color: #1d4ed8;
}

.source-order {
  color: #7c3aed;
}
```

Both selectors have equal specificity, importance, origin, and layer. The later purple declaration wins for `color`.

### Importance is compared before specificity

```css
#priority-demo {
  color: #b91c1c;
}

.important-rule {
  color: #1d4ed8 !important;
}
```

The author-important declaration wins over the normal declaration in this example, even though the normal rule uses an ID selector. Importance changes cascade priority; it is not a way to add specificity.

### Each property is resolved independently

```css
.combined-rule {
  color: #1e40af;
  font-weight: bold;
}

#per-property {
  color: #be123c;
}
```

The ID declaration wins the color conflict. The class declaration still supplies `font-weight`, because the ID rule does not set it.

### Inherited values come from the parent

```css
.inheritance-demo {
  color: #6d28d9;
  font-family: Georgia, serif;
  border: 2px solid #c4b5fd;
}

.child-override {
  color: #b91c1c;
}
```

The `strong` text has no direct color or font-family declaration, so it inherits both values from the section. The `.child-override` span has its own color, so it is red. The border stays on the section because borders do not inherit by default.

The paragraph inside the section matches the earlier `p` type rule, so its own green declaration is used instead of the inherited purple color.

### CSS-wide keywords control a value

```css
.explicit-inherit {
  color: inherit;
}

.explicit-unset {
  color: unset;
}
```

Both paragraphs use the parent's green color. `inherit` explicitly requests the parent's value. Since `color` is inherited by default, `unset` behaves the same way here.

```css
.initial-display {
  display: initial;
}
```

The CSS-defined initial value for `display` is `inline`. This overrides the browser's usual block presentation for a `div`, so the box sits in the line with the following text.

## Try these changes

1. Remove `id="specificity-demo"`. The paragraph loses the ID selector match and becomes green from the `p` rule.
2. Move the second `.source-order` rule before the first one. The paragraph becomes blue because the later equal-specificity declaration changes.
3. Remove `!important` from `.important-rule`. The normal ID rule then wins and makes the priority paragraph red.
4. Remove `#per-property` from the paragraph. The class rule then supplies both its blue color and bold weight.
5. Remove `color` from `.child-override`. The span inherits purple from its section.
6. Remove `color: unset` from `.explicit-unset`. The paragraph still inherits green because `color` inherits by default.
7. Remove the second `display` declaration from `.initial-display`. The earlier `display: block` becomes active.
8. Add `padding` to `.inheritance-demo` and observe that the padding belongs to the parent box instead of being copied to each child.

## Key points

- The cascade resolves each property independently among declarations that apply.
- Origin, importance, layers, specificity, and source order have different priorities.
- Source order breaks ties after earlier priorities are equal.
- Inherited values are used when an element has no cascaded value of its own for an inherited property.
- A direct child declaration takes precedence over an inherited parent value for that child.
- `inherit`, `initial`, and `unset` make value resolution explicit.
- `!important` affects priority and should be used sparingly.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [09 - Pseudo-elements](../examples/09-pseudo-elements.md) | [Lesson](../lessons/10-cascade-and-inheritance.md) | [Q&A](../qnas/10-cascade-and-inheritance.md) | [11 - Specificity and resolving conflicts](11-specificity-and-conflicts.md) |
