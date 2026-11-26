# 42 - Generated content and counters

CSS can generate text and decorative boxes with pseudo-elements. It can also keep track of named counters and display their values. These tools are useful for visual labels, section numbering, and nested outlines, but they do not replace meaningful HTML content or semantic lists.

## Learning outcomes

After this chapter, you should be able to:

- Add generated content with `::before`, `::after`, and the `content` property.
- Create, increment, and display a CSS counter.
- Use nested counters for section numbers.
- Explain the difference between `counter()` and `counters()`.
- Keep essential text and ordered content in the HTML.

## Generate content with pseudo-elements

`::before` and `::after` create styleable pseudo-elements immediately before or after an element's actual content. Set `content` to make the pseudo-element generate a box:

~~~css
.note::before {
  content: "Note: ";
  font-weight: 700;
}

.note::after {
  content: "";
  display: block;
  width: 3rem;
  height: 0.2rem;
  margin-top: 0.75rem;
  background-color: #075b9b;
}
~~~

The first rule adds a text prefix. The second creates an empty decorative box after the element. `content: none` or the default `normal` suppresses the generated pseudo-element.

Generated content is not HTML markup. You cannot insert a new `<strong>`, button, or other HTML element through a string in `content`. Use HTML when the content needs its own semantics, behavior, or structure.

## Keep important content in HTML

CSS-generated text can be useful as a visual aid, but keep essential information in the document markup. A page should still communicate its meaning if styles do not load or a user agent handles generated content differently.

For example, use an HTML heading for the subject, then add a visual prefix with CSS:

~~~html
<h2 class="chapter-title">Plan the project</h2>
~~~

~~~css
.chapter-title::before {
  content: "Chapter " counter(chapter) ": ";
}
~~~

The heading text remains in HTML. The generated number is a visual supplement. If a number is essential to understanding or referencing the content, include it in the HTML too.

For a meaningful ordered sequence, use an ordered list:

~~~html
<ol>
  <li>Choose a topic.</li>
  <li>Outline the sections.</li>
  <li>Review the result.</li>
</ol>
~~~

CSS can change how the list markers look, but the HTML still communicates that the steps have an order. Do not replace an `<ol>` with visually numbered paragraphs if the sequence matters.

## Create a counter

CSS counters keep a number that can be reset, incremented, and displayed. The main properties and functions are:

| Feature | Purpose |
| :--- | :--- |
| `counter-reset` | Creates or resets a named counter, usually to zero or a specified value. |
| `counter-increment` | Increases or decreases a counter. The default increment is one. |
| `counter-set` | Sets a counter to a specified value. |
| `counter(name)` | Displays the value of the innermost counter with that name. |
| `counters(name, separator)` | Displays the values of all nested counters with that name, joined by a separator. |

A simple counter can number chapter headings:

~~~css
.document {
  counter-reset: chapter;
}

.chapter {
  counter-increment: chapter;
}

.chapter > h2::before {
  content: "Chapter " counter(chapter) ". ";
}
~~~

The `.document` element starts the counter at zero. Each `.chapter` increments it. The heading's pseudo-element displays the current value.

A counter does not display anything until a value is used, for example with `counter()` in generated content.

## Number nested sections

A document outline can use separate counters for chapter and subsection levels. Reset the subsection counter when a new chapter starts:

~~~css
.outline {
  counter-reset: chapter;
}

.outline h2 {
  counter-increment: chapter;
  counter-reset: section;
}

.outline h3 {
  counter-increment: section;
}

.outline h2::before {
  content: counter(chapter) " ";
}

.outline h3::before {
  content: counter(chapter) "." counter(section) " ";
}
~~~

A subsection under chapter 2 can now display `2.1`. Each `h2` starts its section counter again. The numbering is still generated presentation, so keep meaningful headings in HTML.

The `counters()` function is especially useful when the same counter is nested, such as in a nested ordered list:

~~~css
ol.numbered {
  counter-reset: item;
  list-style: none;
}

ol.numbered li {
  counter-increment: item;
}

ol.numbered li::before {
  content: counters(item, ".") " ";
}
~~~

Give the `numbered` class to each nested `<ol>`. Each list resets its own `item` counter. `counters(item, ".")` joins the nested values from outermost to innermost, so a child item can display `2.1`. By contrast, `counter(item)` displays only the innermost counter value.

Counter scope follows the document tree and reset locations. When debugging numbering, check where each counter is reset and which elements increment it.
## Choose a counter style

The optional second argument to `counter()` selects a counter style:

~~~css
.chapter-title::before {
  content: counter(chapter, upper-roman) ". ";
}
~~~

Common styles include `decimal`, `decimal-leading-zero`, `lower-alpha`, `upper-alpha`, `lower-roman`, and `upper-roman`. If the style is omitted, the default is decimal.

You can combine generated strings with counter values:

~~~css
.chapter-title::before {
  content: "Part " counter(chapter, upper-alpha) ": ";
}
~~~

The quotes are part of the CSS string. They do not appear in the rendered text.

## Use counters with care

CSS counters are presentation mechanisms. They can be helpful for automatically numbering headings in a document whose structure already exists in HTML. They do not change the document tree or create semantic relationships between headings.

For ordered tasks, recipes, or instructions, HTML's `<ol>` is usually the better source of sequence. Use CSS to restyle its marker when needed. A CSS counter can be appropriate for visual numbering when the numbering is supplementary, such as chapters or subsections.

## Common mistakes

- Forgetting to set `content` on `::before` or `::after`.
- Putting essential instructions only in CSS-generated text.
- Using CSS counters instead of an ordered list for steps that must retain their order.
- Incrementing a counter without resetting it in the intended scope.
- Resetting a nested counter at a level that causes it to restart too often.
- Using `counter()` when the desired result needs all nested counter values from `counters()`.
- Expecting generated content to create real HTML elements or interactive controls.

## Try it yourself

1. Add a decorative line after each section heading with `::after`.
2. Create a chapter counter and display it before each chapter heading.
3. Change the counter style from decimal to upper Roman numerals.
4. Create a nested section counter and compare `counter()` with `counters()`.
5. Build a three-step instruction as an `<ol>` and style its marker without removing the list semantics.
6. Disable the stylesheet and check that the essential document content still makes sense.

## Key points

- `::before` and `::after` create styleable pseudo-elements around an element's actual content.
- The `content` property supplies generated text, counters, or an empty decorative box.
- CSS counters use `counter-reset`, `counter-increment`, and `counter-set` to manage values.
- `counter()` displays the innermost value; `counters()` displays nested values joined by a separator.
- Keep important words and real ordered sequences in HTML.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [41 - Custom properties and design tokens](41-custom-properties-and-design-tokens.md) | [Q&A](../qnas/42-generated-content-and-counters.md) | [Example](../examples/42-generated-content-and-counters.md) | [43 - Transforms](43-transforms.md) |