# 15 - CSS Math Functions: calc, min, max, and clamp

CSS math functions let a property value be calculated from lengths, percentages, numbers, and other compatible values. They are useful when a value should respond to its layout context or stay within clear limits.

This chapter focuses on calc(), min(), max(), and clamp(), the functions used most often for layout sizing and responsive values.

## calc() for arithmetic

calc() performs arithmetic inside a CSS value:

~~~css
.panel {
  width: calc(100% - 2rem);
}
~~~

If the containing block is 600px wide and 1rem is 16px, the panel's calculated width is 568px. The percentage still uses the reference defined by the property, as described in the previous chapter.

The operators follow normal arithmetic order: multiplication and division happen before addition and subtraction. Parentheses can make the intended grouping clear:

~~~css
.card {
  width: calc((100% - 2rem) / 2);
}
~~~

The outer subtraction happens first because of the parentheses, then the result is divided by two.

### Spaces around plus and minus

Write spaces on both sides of + and - in a CSS calculation:

~~~css
.valid {
  width: calc(100% - 2rem);
  padding-inline: calc(1rem + 1vw);
}

.invalid {
  width: calc(100%-2rem);
}
~~~

The last value is invalid because the minus operator has no surrounding spaces. The browser ignores that declaration.

Multiplication and division operators do not require surrounding whitespace, although spaces can make a complex expression easier to read.

### Types must be compatible

CSS checks the types in a calculation. Lengths can be added to lengths, and numbers can be multiplied by lengths. A length cannot be added directly to a time or to a number:

~~~css
.valid {
  width: calc(10rem + 20px);
  padding: calc(1rem * 2);
  width: calc(100% / 3);
}

.invalid {
  width: calc(10px + 2s);
  width: calc(10px + 2);
}
~~~

The last two expressions combine incompatible types for width. Unitless zero is allowed as a literal where zero is valid, but calc(0 + 10px) still attempts to add a number and a length. Use calc(10px) or simply 10px instead.

When a percentage and a length are combined, the target property must accept the resulting type. For example, width accepts both percentages and lengths, so width: calc(100% - 2rem) is a useful pattern. Each property's percentage basis still applies.

## min() for an upper limit

min() returns the smallest of its comma-separated calculations:

~~~css
.article {
  width: min(100% - 2rem, 68rem);
  margin-inline: auto;
}
~~~

This makes the article 2rem narrower than its containing block when space is limited, and stops it growing beyond 68rem. The calculation does not require a nested calc() function.

A min() value can include multiple arguments:

~~~css
.compact {
  width: min(100%, 50rem, 80vw);
}
~~~

The smallest resolved value is used. Make sure all arguments are meaningful for the property and context.

## max() for a lower limit

max() returns the largest of its comma-separated calculations:

~~~css
.safe-space {
  padding: max(1rem, 3vw);
}
~~~

The padding is at least 1rem. On a wider viewport, 3vw may become larger and provide more space.

The name describes the operation, not the design intention. max() often creates a minimum size because the largest candidate is chosen. Similarly, min() often limits the maximum size.

## clamp() for a responsive range

clamp() takes a minimum, a preferred value, and a maximum:

~~~css
.page-title {
  font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
}
~~~

The browser starts with the preferred value in the middle. If it is smaller than the minimum, the minimum wins. If it is larger than the maximum, the maximum wins. Otherwise, the preferred value is used.

In general:

~~~css
property: clamp(MINIMUM, PREFERRED, MAXIMUM);
~~~

The order is important. clamp() is not a list of three values from which the browser chooses arbitrarily. It bounds the middle value.

If the minimum is greater than the maximum, the minimum wins. Keep the bounds in a deliberate order unless that behavior is specifically desired.

## Responsive sizing patterns

### Keep content within the viewport

~~~css
.page {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
~~~

On a narrow screen, the page leaves 1rem on each side. On a wide screen, it stops at 72rem.

### Keep headings in a readable range

~~~css
h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3.5rem);
}
~~~

The heading grows as the viewport grows, but it has a lower and upper limit. A rem-based minimum also responds to the root font size.

### Let spacing grow gently

~~~css
.card {
  padding: clamp(1rem, 2vw, 2rem);
}
~~~

The padding is at least 1rem, grows with viewport width, and does not exceed 2rem.

### Combine a calculated value with a limit

~~~css
.sidebar {
  width: min(24rem, 40%);
}
~~~

The sidebar takes the smaller of 24rem and 40% of the property's percentage reference. Do not assume every percentage refers to the viewport; the property and containing block determine its basis.

## Using custom properties in calculations

Custom properties can hold values used by math functions:

~~~css
:root {
  --page-gutter: 1.25rem;
  --page-limit: 72rem;
}

.page {
  width: min(100% - 2 * var(--page-gutter), var(--page-limit));
  margin-inline: auto;
}
~~~

The variables keep related values in one place. The math is evaluated when the custom property is substituted into a consuming declaration.

If a custom property contains a complete calculation, it can also be reused:

~~~css
:root {
  --half-space: calc(1rem / 2);
}

.card {
  padding: var(--half-space);
}
~~~

If the substituted value has an incompatible type or invalid syntax, the consuming declaration becomes invalid at computed-value time. Provide a useful declaration before a more complex value when a fallback is needed.

## Math in different properties

Math functions are not limited to width and height. They can be used wherever the property accepts the result type:

~~~css
.grid {
  gap: max(0.75rem, 2vw);
}

.overlay {
  inset-block-start: calc(100% + 1rem);
}

.icon {
  transform: translateX(calc(50% - 0.5rem));
}
~~~

A percentage in a transform, inset, font size, or width may use a different reference. Understand the property before calculating with its percentages.

## Function comparison

| Function | What it does | Common use |
| --- | --- | --- |
| calc() | Performs arithmetic | Combine a percentage and a length |
| min() | Chooses the smallest candidate | Set an upper size limit |
| max() | Chooses the largest candidate | Set a lower size limit |
| clamp() | Bounds a preferred value between a minimum and maximum | Fluid type and spacing |

min(), max(), and clamp() accept comma-separated calculations. The function arguments must resolve to compatible types for the receiving property.

## Common mistakes

### Forgetting spaces around plus or minus

Write calc(100% - 2rem), not calc(100%-2rem). The operator needs whitespace on both sides.

### Adding incompatible units

A width calculation cannot add seconds to pixels. Use units of compatible types and values that the receiving property can accept.

### Using min() when a minimum is needed

min() selects the smaller candidate, so it usually creates an upper limit. To keep a value above a floor, use max() or use the first argument of clamp().

### Reversing clamp() arguments

clamp() takes minimum, preferred, maximum in that order. Put the fluid or calculated value in the middle.

### Making a fluid value without bounds

A viewport-only font size may become too small on a narrow screen or too large on a wide screen. Use clamp() when a safe range is needed.

### Assuming percentages are always based on parent width

The receiving property's percentage rules still apply inside a math function. calc() does not change what a percentage refers to.

### Overcomplicating a value

Use the simplest expression that communicates the intent. If the same result can be expressed clearly with a normal fixed value, a complex calculation may make the stylesheet harder to maintain.

## Beyond the four core functions

CSS also defines additional mathematical functions for operations such as rounding, absolute values, powers, and trigonometry. They are useful for specialized effects and calculations. Their support can vary, so check the browsers a project targets before relying on an advanced function.

~~~css
.rounded-step {
  width: round(1rem, 5px);
}
~~~

This is an example of a more specialized function. Most everyday responsive sizing can be handled with calc(), min(), max(), and clamp().

## Try it yourself

1. Set a panel to width: calc(100% - 2rem). Resize its containing block and describe what stays fixed and what changes.
2. Remove the spaces around the minus operator. Observe that the browser ignores the invalid declaration.
3. Write width: min(100% - 2rem, 60rem) and compare it in a narrow and wide viewport.
4. Use max(1rem, 4vw) for padding. Find the viewport width where the viewport-based value becomes larger than 1rem.
5. Set a heading to clamp(1.5rem, 1rem + 3vw, 3rem). Resize the viewport and observe its lower and upper bounds.
6. Reverse the minimum and maximum values in clamp() and note which bound wins.
7. Put a spacing value in a custom property and use it inside calc().
8. Try adding a time value to a length in a width calculation. Identify why that type combination is invalid.
9. Replace a nested calc() inside a min() with direct arithmetic in the argument.
10. Use a calculation on a property other than width and check which reference its percentage uses.

## Key points

- calc() performs typed arithmetic and follows standard operator precedence.
- Addition and subtraction need whitespace on both sides of the operator.
- The values in a calculation must have compatible types and be valid for the receiving property.
- min() chooses the smallest value, max() the largest, and clamp() bounds a preferred value.
- Percentages still use the reference defined by the receiving property.
- clamp() is useful for fluid values that need readable lower and upper bounds.
- Custom properties can keep related calculation inputs together.
- Use advanced math functions only when they are supported by the target browsers and improve clarity.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [14 - Colors and Color Functions](14-colors-and-color-functions.md) | [Q&A](../qnas/15-css-math-functions.md) | [Example](../examples/15-css-math-functions.md) | [16 - The CSS box model](16-box-model.md) |