# 31 - Container Queries

Container queries let a component adapt to the space available around it. The same card can use a compact layout in a sidebar and a wider layout in the main column, even when both appear in the same viewport.

## Learning outcomes

After this chapter, you should be able to:

- Explain when a container query is useful and how it differs from a media query.
- Establish a size query container with `container-type`.
- Write conditions with `@container` and select a named ancestor.
- Choose between `inline-size` and `size` containment.
- Use container-relative length units.
- Keep a useful fallback and diagnose queries that do not match.

## Media queries and container queries

Media queries respond to the display environment, such as the viewport, print output, pointer capability, or user preferences. Container queries respond to the size or other queryable features of an ancestor element.

| Question | Media query | Container query |
| :--- | :--- | :--- |
| What is measured? | The viewport or display environment | A query container in the document |
| Common use | Page columns, print, dark scheme, reduced motion | A card, widget, or reusable component |
| What can make it change? | Viewport or user environment | The space available to the component |
| Can two instances respond differently in one viewport? | Not from viewport width alone | Yes, when their containers differ |

Use media queries for page-level changes or user preferences. Use container queries when a component should adapt to its own available space. A page can use both.

## Establish a query container

A size query needs an ancestor that is explicitly set up as a size query container. The common choice is `container-type: inline-size`:

~~~css
.card {
  container-type: inline-size;
}
~~~

In ordinary horizontal writing, the inline dimension runs left to right and is similar to width. Using the logical dimension also works when the writing mode changes.

The query styles descendants of the container. An element cannot use its own size query to style itself, so put `container-type` on the element surrounding the content whose layout should respond.

## Write a size query

Use `@container` followed by a size condition. Keep a useful base layout outside the query, then add the change for the size range that needs it:

~~~css
.card {
  container-type: inline-size;
}

.card__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

@container (inline-size >= 34rem) {
  .card__content {
    grid-template-columns: 10rem minmax(0, 1fr);
    align-items: center;
  }
}
~~~

The base rule is the narrow layout. When the card's content box reaches the chosen inline size, its inner content becomes two columns. Choose a threshold where the content needs extra room, not because a particular device is called a tablet or desktop.

Range comparisons make the condition readable:

~~~css
@container (inline-size >= 34rem) {
  /* At least 34rem */
}

@container (inline-size < 34rem) {
  /* Less than 34rem */
}
~~~

Minimum and maximum feature syntax is also valid:

~~~css
@container (min-width: 34rem) {
  /* At least 34rem wide */
}
~~~

Prefer logical `inline-size` for component layouts that should work across writing modes. Physical `width` and `height` features are available when the design specifically depends on physical dimensions.

## Choose the containment type

`container-type` determines which dimensions can be queried.

| Value | Queryable dimensions | Common use |
| :--- | :--- | :--- |
| `normal` | No dimensions for size queries | Default value |
| `inline-size` | The inline dimension | Most responsive components |
| `size` | Inline and block dimensions | Boxes with independently constrained dimensions |

### Inline-size containment

Use `inline-size` for most cards and reusable UI. It lets descendants query the inline dimension while the block dimension remains content-driven. It also means the container's own contents no longer determine its intrinsic inline size. Give grid or flex items a sensible available width and check their minimum size if they overflow.

~~~css
.card {
  container-type: inline-size;
  min-width: 0;
}
~~~

### Size containment

Use `size` only when both dimensions can be determined without measuring the container's contents. Size containment affects intrinsic sizing on both axes. A box that previously got its size from its contents may need explicit dimensions or constraints.

~~~css
.chart-frame {
  container: chart / size;
  inline-size: 100%;
  block-size: 24rem;
}

@container chart (block-size >= 20rem) {
  .chart-legend {
    display: block;
  }
}
~~~

This query checks the named container's block dimension. A block-size query needs a container type that supports that axis, such as `size`.

## Name containers

An unnamed query uses the nearest eligible ancestor. When a component sits inside nested query containers, a name lets it target a particular ancestor.

Set the name and type separately:

~~~css
.page-shell {
  container-name: page;
  container-type: inline-size;
}
~~~

Or use the `container` shorthand:

~~~css
.page-shell {
  container: page / inline-size;
}
~~~

Then write a named query:

~~~css
@container page (inline-size >= 60rem) {
  .page-layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
  }
}
~~~

The name is an identifier. It does not establish a container by itself. A named query needs a matching ancestor with a suitable `container-type`. The browser searches ancestors for a matching name that can answer the queried dimension.

Names are useful when different ancestors have different jobs. A page shell might control the overall page layout while each card controls its own inner layout.

## Combine conditions

Use `and` when all conditions must match:

~~~css
@container card (inline-size >= 24rem) and (inline-size < 48rem) {
  .card__actions {
    justify-content: flex-start;
  }
}
~~~

This rule applies only when an eligible ancestor named `card` meets both size conditions. Keep ranges simple unless the design needs multiple distinct states. A narrow base style and one or two content-driven transitions are easier to maintain.

## Container-relative length units

Container query units size values relative to an eligible ancestor query container.

| Unit | Relative to |
| :--- | :--- |
| `cqi` | 1% of the container's inline size |
| `cqb` | 1% of its block size |
| `cqw` | 1% of its physical width |
| `cqh` | 1% of its physical height |
| `cqmin` | The smaller of `cqi` and `cqb` |
| `cqmax` | The larger of `cqi` and `cqb` |

For example, a heading can grow modestly as its component gets wider:

~~~css
.card {
  container-type: inline-size;
}

.card__title {
  font-size: clamp(1rem, calc(1rem + 1.5cqi), 1.5rem);
}
~~~

Bound fluid text with `clamp()` so it stays readable at small and large sizes. If no eligible query container exists for a container unit, it falls back to the corresponding small viewport dimension. Provide a useful base value and test the component both inside and outside its intended container.

## Reusable component example

This card can be placed in a wide column or a narrow sidebar. Each instance switches layout based on its own container:

~~~html
<article class="product-card">
  <div class="product-card__content">
    <div class="product-card__image" aria-hidden="true">Image area</div>
    <div>
      <h2>Field notebook</h2>
      <p>A durable notebook for observations and sketches.</p>
      <a href="#details">View details</a>
    </div>
  </div>
</article>
~~~

~~~css
.product-card {
  container: product-card / inline-size;
  min-width: 0;
  padding: 1rem;
  border: 1px solid #9aa7b5;
  border-radius: 0.75rem;
}

.product-card__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.product-card__image {
  display: grid;
  min-block-size: 9rem;
  place-items: center;
  background: #e9eef3;
  color: #243447;
}

@container product-card (inline-size >= 34rem) {
  .product-card__content {
    grid-template-columns: minmax(9rem, 0.8fr) minmax(0, 1.2fr);
    align-items: center;
  }
}
~~~

The base layout stacks the image area and text. The named query changes the descendants to two columns when the card itself has room. It does not need a viewport breakpoint for each place the card might appear.

## Keep a fallback

Write the simplest usable layout outside the query. Browsers without container query support can still display the content in that layout:

~~~css
.card {
  container-type: inline-size;
}

.card__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@supports (container-type: inline-size) {
  @container (inline-size >= 34rem) {
    .card__content {
      grid-template-columns: 10rem minmax(0, 1fr);
    }
  }
}
~~~

The base style is the fallback. The `@supports` wrapper is optional for this short example because unsupported declarations and at-rules are ignored. It can clarify a larger enhancement block. Do not hide essential content or actions behind a container query.

## Use both query types

A media query can change the page shell while a container query changes a component's internal layout:

~~~css
.page-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

@media (min-width: 70rem) {
  .page-layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
  }
}

.product-card {
  container: product-card / inline-size;
}

@container product-card (inline-size >= 34rem) {
  .product-card__content {
    grid-template-columns: 10rem minmax(0, 1fr);
  }
}
~~~

The media query decides when the page has room for a sidebar. The container query decides whether an individual card has room for its internal columns.

## Common problems

| Symptom | Likely cause | What to check |
| :--- | :--- | :--- |
| The query never applies | No ancestor is a size query container | Set `container-type: inline-size` or `size` on the intended ancestor |
| The query targets the container itself | A size query styles descendants, not its own box | Move the queried declarations to a descendant |
| A named query does not match | The name is missing or the ancestor cannot answer that query | Check the name, ancestor relationship, and queried axis |
| A card becomes unexpectedly narrow | Inline-size containment changes intrinsic sizing behavior | Check the grid or flex track, available width, and minimum size |
| A height query has no effect | The container only supports inline-size queries | Use `size` only when both dimensions can be constrained |
| A container unit looks viewport-sized | No eligible ancestor exists for that axis | Check the unit's location and ancestor container type |
| Resizing the browser shows no change | The component's parent may stay the same width | Resize or change the layout of the query container |

## Debugging checklist

1. Identify the element whose descendants need to adapt.
2. Put `container-type` on that element, usually with `inline-size`.
3. Confirm the changing selectors target descendants.
4. Check that the query dimension is supported by the container type.
5. If named, check the name and ancestor relationship.
6. Resize the component's parent or move it between narrow and wide regions.
7. Check the base style below the query threshold.
8. Verify readability, source order, and overflow.

## Practice

1. Create a card with a one-column base layout. Put its title beside an icon when the card reaches a chosen inline size.
2. Place the same card in a wide main column and a narrow sidebar. Confirm that the instances respond independently.
3. Name an outer container for a page layout and an inner container for card layout.
4. Use `cqi` in a bounded heading size. Add a base font size and test the component outside its query container.
5. Try `container-type: size` on an element with automatic height. Observe why explicit size constraints may be needed.
6. Test long text, browser zoom, and a narrow container. Check for overflow and keep the HTML reading order logical.

## Key points

- Media queries respond to the viewport or user environment; container queries respond to an ancestor element.
- A size query needs a suitable ancestor with `container-type`.
- `container-type: inline-size` is the usual choice for responsive components.
- A query styles descendants, not the container's own box.
- Use `container-name` or `container` to select a particular ancestor.
- `size` allows both axes to be queried but changes intrinsic sizing in both axes.
- Units such as `cqi` can size details relative to a component.
- Keep a usable base style and test the component at its actual available sizes.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [30 - Responsive Design and Media Queries](30-responsive-design-and-media-queries.md) | [Q&A](../qnas/31-container-queries.md) | [Example](../examples/31-container-queries.md) | [32 - Logical Properties and Writing Modes](32-logical-properties-and-writing-modes.md) |
