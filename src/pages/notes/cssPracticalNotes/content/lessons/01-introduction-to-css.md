# 01 - Introduction to CSS

CSS controls how web content is presented. It can set colors, type, spacing, and layout while the HTML continues to describe the content and its meaning. In this chapter, you will learn what CSS is, how a browser uses it, and how it works alongside HTML and JavaScript.

## What you will learn

By the end of this chapter, you should be able to:

- Explain what CSS stands for and what it is used for.
- Describe the different roles of HTML, CSS, and JavaScript.
- Identify the selector, property, and value in a small CSS rule.
- Explain why styling should not replace meaningful HTML.
- Describe what happens to a page when its CSS is unavailable.

## What is CSS?

**CSS** stands for **Cascading Style Sheets**. It is a stylesheet language that describes how a document should be presented. On the web, CSS most often styles HTML documents.

A stylesheet is a set of rules. Each rule describes which elements to target and which presentation choices to apply to them. For example:

```css
p {
  color: navy;
  font-size: 1.125rem;
}
```

This rule targets paragraph elements and asks the browser to display their text in navy at a larger size. The HTML still identifies the content as paragraphs. CSS changes their presentation, not their meaning.

The details of CSS rule syntax are covered in [Lesson 02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md).

## The roles of HTML, CSS, and JavaScript

A web page can use several technologies together. Each has a different primary role:

| Technology | Main role | Examples |
| --- | --- | --- |
| HTML | Structure and meaning | Headings, paragraphs, links, forms |
| CSS | Presentation and layout | Color, typography, spacing, page layout |
| JavaScript | Behavior and logic | Responding to an action or updating content |

For example, HTML can mark a heading as the page's main heading. CSS can change its color and size. JavaScript can respond when a visitor selects a button. A page does not need JavaScript for every interaction, and it does not need CSS for its content to exist.

## What CSS can control

CSS can describe many parts of a page's presentation, including:

- **Color:** text, backgrounds, borders, and other visual details.
- **Typography:** font family, size, weight, and line spacing.
- **Spacing and sizing:** the space around content and the size of elements.
- **Layout:** how content is arranged in normal flow, columns, grids, or flexible rows.
- **Responsive presentation:** how a layout adapts to the available screen or container size.
- **Visual states:** how an element appears when it is hovered, focused, or otherwise in a state the browser can expose to CSS.

CSS can make a link easier to recognize or a focused control easier to see. It does not create the link destination or perform the action of a button. Those behaviors come from the document, the browser, or JavaScript.

## How a browser uses CSS

A browser reads the HTML document and any stylesheets connected to it. It parses the CSS rules, works out which rules apply to which elements, and uses the resulting styles when laying out and painting the page.

A useful mental model is:

1. HTML describes the document's content and structure.
2. CSS rules select parts of that structure and describe their presentation.
3. The browser combines the document and its applicable styles to display the page.

A browser also has built-in default styles. That is why headings, paragraphs, and links remain recognizable even when a page has no author-written stylesheet. The page may look plain, but the HTML content is still there.

## CSS styles elements without changing their meaning

Consider this paragraph:

```html
<p class="intro">I am learning how CSS presents a page.</p>
```

The `p` element tells the browser that this is a paragraph. The `class` attribute gives the paragraph a name that CSS can target. A matching rule could look like this:

```css
.intro {
  color: darkslateblue;
  font-size: 1.25rem;
}
```

The paragraph remains a paragraph. It does not become a heading just because its text is large or bold. If the content is a heading, use an appropriate heading element in HTML, then use CSS to choose how that heading looks.

Class selectors and other selector types are explained in [Lesson 05 - CSS selector basics](05-selector-basics.md).

## Where CSS can be written

CSS can be placed in a separate stylesheet, inside a `style` element in an HTML document, or in a `style` attribute on one element. A separate stylesheet is usually the clearest choice for reusable page styles because it keeps presentation in one place and can be shared across documents.

This is a preview of a link to an external stylesheet:

```html
<link rel="stylesheet" href="styles.css">
```

The HTML element connects the document to a file named `styles.css`. The browser can then load and apply the CSS rules in that file. How to connect stylesheets is the focus of [Lesson 03 - Connecting CSS to HTML](03-connecting-css-to-html.md).

## CSS does not replace good content or behavior

CSS is responsible for presentation. Keep each responsibility in the appropriate place:

- Use HTML elements to describe what content is and how it is organized.
- Use CSS to control how that content is presented.
- Use JavaScript when a page needs behavior that HTML does not already provide.

Do not use CSS appearance alone to communicate important information. For example, color can reinforce that a message is an error, but the message should also say that it is an error. Make sure text remains readable and keyboard focus remains visible when you style a page.

## A simple way to think about a CSS rule

When reading a rule, ask three questions:

1. **What is being targeted?** The selector names the elements the rule can match.
2. **What aspect is being changed?** A property names a presentation setting, such as `color`.
3. **What setting is requested?** A value supplies the choice, such as `navy`.

In this example, `p` is the selector, `color` is a property, and `navy` is its value:

```css
p {
  color: navy;
}
```

A browser applies a declaration when it can parse the rule and the selector matches an element. The next chapters explain the syntax, selectors, and how the browser resolves multiple rules.

## Common beginner misunderstandings

- **CSS creates the page content.** HTML contains the content. CSS describes its presentation.
- **A large, bold paragraph becomes a heading.** It remains a paragraph. Use the correct HTML element for the content's role.
- **JavaScript is needed to make every page interactive.** Links and many form controls have browser behavior built in. CSS can also present their different visual states.
- **A page without CSS has no content.** The browser can still display the HTML using its default styles.
- **Color alone is enough to communicate meaning.** Important information should also be clear from text or structure.
- **CSS only changes colors.** It also controls type, spacing, sizing, layout, and responsive presentation.

## Try it yourself

1. In your own words, describe the different roles of HTML, CSS, and JavaScript.
2. Read the CSS rule in this chapter and identify its selector, property, and value.
3. Look at a web page with styling and name three presentation choices that CSS may control.
4. Think about what parts of a page would remain if its stylesheet failed to load.
5. Choose a heading on a page. Identify which part of its role comes from HTML and which parts of its appearance could come from CSS.

## Key points

- CSS means Cascading Style Sheets.
- CSS describes the presentation and layout of document content.
- HTML provides the content's structure and meaning.
- JavaScript can provide behavior and logic when needed.
- CSS can change an element's appearance without changing the element's meaning.
- A browser can display HTML with default styles even when no author stylesheet is available.
- Use meaningful HTML and readable, accessible styling together.

---

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
|  | [Q&A](../qnas/01-introduction-to-css.md) | [Example](../examples/01-introduction-to-css.md) | [02 - CSS syntax and rulesets](02-css-syntax-and-rulesets.md) |
