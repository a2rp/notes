# 50 - Microdata and structured information

HTML gives content structure and meaning. Structured data adds machine-readable labels that help software interpret the information on a page. Microdata is one way to add those labels using attributes on regular HTML elements. It does not change how a page looks by itself.

## Items, properties, and vocabularies

Microdata organizes information into items. An item has properties, and each property has a value. A vocabulary defines the types and property names that software can interpret. Schema.org is a widely used vocabulary: for example, `https://schema.org/Book` identifies a Book type with properties such as `name`, `author`, and `isbn`.

The three main Microdata attributes are:

- `itemscope` creates a new item.
- `itemtype` identifies the type of item using a vocabulary URL.
- `itemprop` names a property of the current item.

Example:

```html
<div itemscope itemtype="https://schema.org/Person">
  <p>Name: <span itemprop="name">Ada Lovelace</span></p>
  <p>Job title: <span itemprop="jobTitle">Mathematician</span></p>
</div>
```

The `div` creates a Person item. The two nested spans provide its `name` and `jobTitle` properties. The text stays visible to the reader; Microdata adds labels for software. `itemscope` is a Boolean attribute, so write it without a value.

## Add Microdata to existing content

Start with appropriate HTML and meaningful visible content:

```html
<article>
  <h1>The Hobbit</h1>
  <p>By J. R. R. Tolkien</p>
  <p>First published in 1937.</p>
</article>
```

Add an item and label its properties:

```html
<article itemscope itemtype="https://schema.org/Book">
  <h1 itemprop="name">The Hobbit</h1>
  <p>By <span itemprop="author">J. R. R. Tolkien</span></p>
  <p>
    First published in
    <time itemprop="datePublished" datetime="1937">1937</time>.
  </p>
</article>
```

The article is a Book item. Its title, author, and publication date are properties. The type and property names should come from the same vocabulary and describe the actual content.

## Nested items

A property can itself be another item. This is useful when a value has its own details:

```html
<article itemscope itemtype="https://schema.org/Book">
  <h1 itemprop="name">The Hobbit</h1>
  <p>
    By
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">J. R. R. Tolkien</span>
    </span>
  </p>
</article>
```

The outer item is a Book. Its author property has a nested Person item. The inner name belongs to the Person, while the outer name belongs to the Book.

## A fuller example

```html
<article itemscope itemtype="https://schema.org/Book">
  <h1 itemprop="name">The Hobbit</h1>

  <p>
    Author:
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">J. R. R. Tolkien</span>
    </span>
  </p>

  <p>
    ISBN:
    <data itemprop="isbn" value="9780547928227">978-0-547-92822-7</data>
  </p>

  <p>
    First published:
    <time itemprop="datePublished" datetime="1937">1937</time>
  </p>

  <p>Publisher: <span itemprop="publisher">George Allen & Unwin</span></p>

  <a itemprop="url" href="https://example.com/books/the-hobbit">Book details</a>
</article>
```

The `data` element can show a readable ISBN while its `value` contains a machine-friendly form. The `time` element can show a readable date while `datetime` provides its machine-readable value. An `a` element's property value comes from `href`. Use real page information and real link destinations in your own markup.

## How an element supplies its property value

For most elements, the value is their text content. Some HTML elements use an attribute instead:

| Element | Property value |
| --- | --- |
| Most elements, such as `span` and `p` | Text content |
| `a`, `area`, and `link` | `href` |
| `img`, `audio`, `iframe`, and other media elements | `src` |
| `data` and `meter` | `value` |
| `time` | `datetime`, if present, otherwise text content |
| An element with `itemscope` | The nested item |

For example, an image property uses its source URL, but its alternative text still helps people understand the image:

```html
<img itemprop="image" src="hobbit-cover.jpg" alt="Cover of The Hobbit">
```

The `alt` text has a separate accessibility purpose. Microdata does not replace it.

## Repeated properties and itemref

An item can have multiple values for one property. Repeat the property attribute on each value when the vocabulary allows it:

```html
<div itemscope itemtype="https://schema.org/Person">
  <h1 itemprop="name">Ada Lovelace</h1>
  <a itemprop="sameAs" href="https://example.com/ada-profile">Profile</a>
  <a itemprop="sameAs" href="https://example.org/ada-archive">Archive</a>
</div>
```

Usually, put properties inside the element with `itemscope`. Microdata also has an advanced `itemref` attribute that can associate properties in other elements by their `id`. Prefer ordinary nesting when it keeps the document clear.

## Microdata and semantic HTML

Microdata describes what content represents for software. It does not replace semantic HTML. Use headings for headings, lists for lists, links for navigation, and suitable form labels and alternative text. These HTML features communicate structure and purpose to browsers and assistive technology.

Microdata also does not provide styling or interactive behavior. Those are separate concerns.

## Structured data and search

Search engines and other software may use structured data to understand a page. Some search features accept Microdata, JSON-LD, or RDFa. JSON-LD is often easier to maintain separately, but this chapter focuses on Microdata attributes in HTML.

Correct markup does not guarantee a rich search result. Search engines apply their own feature requirements and policies. Markup should describe content that visitors can see and should not invent ratings, prices, authors, or other details.

## Common mistakes

- Adding `itemprop` without a containing item.
- Using an item type URL or property name that does not match the vocabulary.
- Putting `itemtype` on an element without `itemscope`.
- Marking up details that are hidden or inaccurate.
- Treating Microdata as a replacement for semantic HTML or accessibility.
- Expecting Microdata to change how the page looks or guarantee a search enhancement.

## Try it yourself

1. Mark up a visible book description as a `Book` item.
2. Add its `name`, `author`, and `datePublished` properties.
3. Make the author a nested `Person` item with a `name`.
4. Add an ISBN with `data` and a link with `a`.
5. Open the page in a browser and notice that the attributes add no visual styling.
6. Check the vocabulary documentation to confirm the types and properties fit the content.

## Key points

- Microdata groups machine-readable properties into items.
- `itemscope` creates an item, `itemtype` identifies its type, and `itemprop` labels a property.
- Nested items can describe relationships such as a book and its author.
- Some elements supply values through attributes such as `href`, `src`, `value`, and `datetime`.
- Structured data should accurately describe the visible page.
- Microdata does not replace semantic HTML, accessibility, or CSS.
- Correct structured data does not guarantee a rich search result.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [49 - Search and social sharing metadata](49-search-and-social-metadata.md) | [Q&A](../qnas/50-microdata.md) | [Example](../examples/50-microdata.md) | [51 - Safe links and embedded content](51-html-safety.md) |
