# 06 - Combinators and Selector Relationships: Example

## Goal

See how the descendant, child, adjacent sibling, and general sibling combinators match elements in one small page.

## Complete example

Copy the complete document into a file named `index.html`, then open it in a browser to compare it with the expected output below.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Combinators in Context</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem;
      background-color: #f1f5f9;
      color: #1e293b;
      font-family: Arial, sans-serif;
    }

    .panel {
      max-width: 44rem;
      margin: 0 auto;
      padding: 1.5rem;
      background-color: white;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    .panel p {
      color: #475569;
      line-height: 1.6;
    }

    .panel > p {
      padding: 0.75rem;
      background-color: #f8fafc;
      border-radius: 0.35rem;
    }

    h1 + p {
      border-left: 0.25rem solid #2563eb;
    }

    h1 ~ p {
      color: #1d4ed8;
    }

    .nested {
      margin-top: 1rem;
      padding: 0.75rem;
      background-color: #eef2ff;
      border-radius: 0.35rem;
    }
  </style>
</head>
<body>
  <main class="panel">
    <p>Selector relationships</p>
    <h1>Combinators in context</h1>
    <p>This paragraph immediately follows the heading.</p>
    <ul>
      <li>The list creates another sibling between the paragraphs.</li>
    </ul>
    <p>This paragraph follows the list, but it is still a sibling of the heading.</p>
    <div class="nested">
      <p>This paragraph is nested inside a div.</p>
    </div>
  </main>
</body>
</html>
```

## Expected output

The browser shows a centered white panel on a pale background. Inside it are the label â€œSelector relationships,â€ the heading â€œCombinators in context,â€ three highlighted direct-child paragraphs, including the label before the heading, a one-item list, and a nested pale-blue box containing the final paragraph.

The paragraph immediately after the heading has a blue left border. Both paragraphs that follow the heading as siblings have blue text. The nested paragraph remains slate-colored because it is a descendant of the panel, but it is not a sibling of the heading.

## Which selectors match?

| Selector | Elements matched in this example | Why |
| --- | --- | --- |
| `.panel p` | All four paragraphs | Every paragraph is somewhere inside `.panel`, including the nested one. |
| `.panel > p` | The first, second, and third paragraphs | These paragraphs are direct children of `.panel`. The final paragraph is inside `.nested`. |
| `h1 + p` | â€œThis paragraph immediately follows the heading.â€ | It is the element sibling immediately after the `h1`. |
| `h1 ~ p` | The first and second paragraphs after the heading | They are later paragraph siblings of the `h1`. The list between them does not prevent a match. |

The label paragraph appears before the heading. It matches `.panel p` and `.panel > p`, but neither sibling selector because it comes before the heading.

## How the rules work

### Descendant selector

```css
.panel p {
  color: #475569;
  line-height: 1.6;
}
```

The space means â€œanywhere inside.â€ This rule sets the base color and line height for every paragraph in the panel, including the nested paragraph.

### Child selector

```css
.panel > p {
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.35rem;
}
```

The `>` requires a direct parent-child relationship. The three paragraphs that are direct children of `.panel` receive the padding and pale background. The paragraph inside `.nested` does not.

### Adjacent sibling selector

```css
h1 + p {
  border-left: 0.25rem solid #2563eb;
}
```

The `+` matches the paragraph immediately after the `h1`. Both elements share `.panel` as their parent, with no other element sibling between them.

### General sibling selector

```css
h1 ~ p {
  color: #1d4ed8;
}
```

The `~` matches later paragraph siblings under the same parent. The second paragraph still matches even though a list appears between it and the heading. The nested paragraph does not match because its parent is `.nested`, not `.panel`.

## Try these changes

1. Move the first paragraph before the heading. It no longer matches `h1 + p` or `h1 ~ p` because those selectors only match later siblings.
2. Add another paragraph directly after the `h1`. The new paragraph now matches `h1 + p`.
3. Add a paragraph after the list. It matches `h1 ~ p`, even though it is not adjacent to the heading.
4. Move the nested paragraph outside the `.nested` div but keep it inside `.panel`. It becomes a direct child and matches `.panel > p`.
5. Add another wrapper around a direct child paragraph. The paragraph still matches `.panel p`, but no longer matches `.panel > p`.
6. Add another parent around the heading and first paragraph. Check that the two siblings still match each other, while the panel's child selector only matches elements directly under the panel.

## Key points

- A space selects descendants at any depth.
- `>` selects direct children only.
- `+` selects the immediately following sibling.
- `~` selects later siblings, even when other siblings appear between them.
- Sibling selectors require the same direct parent and respect document order.
- A nested element can be a descendant without being a direct child or sibling of another element.
- Combinators describe structure. They do not change the HTML or add elements.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [05 - CSS selector basics](../examples/05-selector-basics.md) | [Lesson](../lessons/06-combinators-and-selector-relationships.md) | [Q&A](../qnas/06-combinators-and-selector-relationships.md) | [07 - Attribute selectors](07-attribute-selectors.md) |
