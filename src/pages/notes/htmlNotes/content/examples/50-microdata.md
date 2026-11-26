# Example 50 - Microdata and structured information

## Question

Create a book details page and use Schema.org Microdata to label the book's visible title, author, publication year, publisher, description, and details link. Represent the author and publisher as nested items.

This is a markup example. On a real page, use accurate details that visitors can also see.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>The Hobbit - City Garden Reading Shelf</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden Reading Shelf</a></p>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/books/">Books</a></li>
          <li><a href="/about/">About this collection</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article itemscope itemtype="https://schema.org/Book">
        <header>
          <h1 itemprop="name">The Hobbit</h1>
          <p>
            By
            <span itemprop="author" itemscope itemtype="https://schema.org/Person">
              <span itemprop="name">J. R. R. Tolkien</span>
            </span>
          </p>
        </header>

        <p>
          First published in
          <time itemprop="datePublished" datetime="1937">1937</time>.
        </p>

        <p>
          Original publisher:
          <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
            <span itemprop="name">George Allen &amp; Unwin</span>
          </span>
        </p>

        <p itemprop="description">
          Bilbo Baggins leaves his quiet home and joins a journey to reclaim a
          treasure guarded by a dragon.
        </p>

        <p>
          <a itemprop="url" href="https://www.example.com/books/the-hobbit">
            View book details
          </a>
        </p>
      </article>
    </main>

    <footer>
      <p>City Garden Reading Shelf</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The browser displays a book title, author, publication year, publisher, description, and link. The Microdata attributes do not add visible labels or styling by themselves. The page remains understandable if software ignores the structured data.

The link points to a placeholder URL. Replace it with the real destination before using this markup on a published page.

## Explanation

- `itemscope` starts a Microdata item. Here, the `<article>` is one item.
- `itemtype="https://schema.org/Book"` identifies that item using the Schema.org `Book` type.
- `itemprop` labels a value as a property of its containing item. The heading is the book's `name`, and the paragraph is its `description`.
- The author value is a nested item. The outer `itemprop="author"` connects it to the book, and its own `itemscope` and `itemtype` identify it as a `Person`. The inner `name` belongs to that person.
- The publisher is nested in the same way, using the `Organization` type. Its `name` belongs to the publisher item.
- The `<time>` element displays `1937` and provides the machine-readable value through its `datetime` attribute.
- The anchor's `itemprop="url"` value comes from its `href` attribute. Microdata uses the destination URL, while visitors see the link text.
- `&amp;` displays an ampersand in the publisher name while keeping the HTML attribute and text valid.
- Microdata does not replace semantic HTML, accessible text, or accurate visible content. Structured data can help software interpret a page, but correct markup does not guarantee a rich search result.

## How to try it

1. Copy the HTML code block using its copy button and save it as `index.html`.
2. Open the file in a browser and read the page. Its appearance comes from the browser's default styles, not from the Microdata attributes.
3. Inspect the source and find the Book item, its properties, and the nested Person and Organization items.
4. Replace the placeholder link with the real destination, and keep each marked value accurate for that page.
5. Check the markup with the Schema.org Markup Validator. A validator can help inspect the structure, but it cannot confirm that invented or incorrect content is true.

## Related lesson

[Read lesson 50 - Microdata and structured information](../lessons/50-microdata.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [49 - Search and social sharing metadata](49-search-and-social-metadata.md) | [Lesson](../lessons/50-microdata.md) | [Q&A](../qnas/50-microdata.md) | [51 - Safe links and embedded content](51-html-safety.md) |
