# 16 - URLs, file paths, and page fragments

An `href` value is a URL. URLs can point to a page on another website, a file in the same site, or a specific part of a page. Understanding how URLs are written helps you build links that keep working when pages move between your computer and a website.

## What you will learn

- The main parts of a URL.
- The difference between absolute and relative URLs.
- How relative paths are resolved from the current page.
- How query strings and fragments work.
- How to link to an element by its `id`.
- How to avoid common URL and file path errors.

## Parts of a URL

Consider this example:

~~~text
https://example.com/guides/links.html?topic=paths#relative-links
~~~

A URL can contain these parts:

| Part | Example | Purpose |
| --- | --- | --- |
| Scheme | https | Describes how the resource is accessed |
| Host | example.com | Identifies the website |
| Path | /guides/links.html | Identifies a resource on that website |
| Query | ?topic=paths | Carries additional information in the URL |
| Fragment | #relative-links | Points to a part of a document |

A URL does not need every part. For example, `page.html` is a relative URL with a path and no scheme, host, query, or fragment.

## Absolute URLs

An absolute web URL includes the scheme and host, and may include a path, query, or fragment:

~~~html
<a href="https://example.com/guides/">Browse the guides</a>
~~~

Use an absolute URL when linking to a destination on another website or when you need to state a complete web address.

## Relative URLs

A relative URL leaves out the scheme and host. The browser resolves it using the current document's URL.

Assume the current page is:

~~~text
https://example.com/guides/links.html
~~~

Then these paths point to different destinations:

| Relative URL | Resolved destination |
| --- | --- |
| next.html | https://example.com/guides/next.html |
| ../index.html | https://example.com/index.html |
| /help/index.html | https://example.com/help/index.html |
| #examples | https://example.com/guides/links.html#examples |

A path without a leading slash starts from the current page's directory. A path beginning with `../` moves up one directory level. A path beginning with `/` starts from the website's root.

~~~html
<p><a href="next.html">Next guide</a></p>
<p><a href="../index.html">Main page</a></p>
<p><a href="/help/index.html">Help center</a></p>
~~~

The exact result depends on the URL of the current page. Test local links from the folder structure that will actually be published. A Windows path such as `D:\html\page.html` is a path on one computer, not a suitable website URL for other visitors.

## Queries

A query begins with `?` and can pass information as part of a URL:

~~~html
<a href="/search?q=html&amp;level=beginner">Search beginner HTML lessons</a>
~~~

In an HTML attribute, write an ampersand between query parameters as `&amp;`. The browser interprets it as the ampersand character in the URL. The destination decides what the query values mean.

The query comes before the fragment:

~~~text
/search?q=html#results
~~~

A query does not automatically filter or search a page. The destination must be built to use the values.

## Fragments and element IDs

A fragment begins with `#`. It can point to an element in the current document or another document.

Give a destination element an `id`:

~~~html
<h2 id="relative-links">Relative links</h2>
~~~

Then link to that ID:

~~~html
<a href="#relative-links">Read about relative links</a>
~~~

To link to a section in another page, include the page path and fragment:

~~~html
<a href="urls.html#relative-links">Read about relative links</a>
~~~

The fragment value must match the target element's ID. IDs should be unique within a document. Choose clear, stable IDs, often using lowercase words separated by hyphens.

## Characters in URLs

Some characters have a special role in a URL. For example, `?` begins a query and `#` begins a fragment. Spaces in a URL are represented with percent encoding, commonly `%20`.

~~~html
<a href="/files/my%20notes.pdf">Download my notes</a>
~~~

When practical, use simple file names without spaces. When a URL needs a space, encode it as `%20`. In an HTML attribute, also write ampersands as `&amp;`.

Do not replace every punctuation mark with an encoded form by guesswork. Encode characters when the URL format requires it, and keep the destination's URL intact.

## A complete example

~~~html
<main>
  <h1>HTML guide</h1>

  <p>
    Start with the <a href="introduction.html">introduction</a>.
  </p>

  <p>
    Continue to the
    <a href="elements.html#headings">section about headings</a>.
  </p>

  <h2 id="resources">Additional resources</h2>

  <p>
    <a href="/search?q=html&amp;level=beginner#results">
      Find beginner HTML resources
    </a>
  </p>
</main>
~~~

The first link uses a relative path to another page. The second adds a fragment to reach a specific element in that page. The final link uses a root-relative path, query parameters, and a fragment.

## Common mistakes

- Using a Windows file path such as `D:\html\page.html` as a public website link.
- Forgetting that relative paths are resolved from the current document's URL.
- Using `/` when you intended a path relative to the current directory.
- Using too many or too few `../` segments.
- Writing a fragment that does not exactly match an element's `id`.
- Reusing the same `id` on multiple elements in one document.
- Putting a query after a fragment instead of before it.
- Leaving a space in a URL instead of encoding it as `%20`.
- Writing a raw ampersand between query parameters in an HTML attribute instead of `&amp;`.
- Assuming that adding a query string automatically makes the destination perform a search.

## Try it yourself

Assume your page is `https://example.com/courses/html/index.html`.

1. Write a relative URL to `lesson-1.html` in the same folder.
2. Write a relative URL to `https://example.com/courses/index.html`.
3. Write a root-relative URL to `https://example.com/contact.html`.
4. Create an `h2` with the ID `practice`, then link to it from the same page.
5. Write a URL to `lesson-2.html` and its `examples` section.
6. Add query parameters named `topic` and `level` to a link in an HTML attribute.
7. Explain why a path beginning with `/` resolves differently from one beginning with `../`.
8. Check your links after moving the files into a different folder.

## Key points

- Absolute URLs include a scheme and host. Relative URLs are resolved from the current document.
- `../` moves up one directory; a leading `/` starts from the website root.
- A query begins with `?` and comes before a fragment.
- A fragment begins with `#` and can identify an element with a matching `id`.
- IDs should be unique within a document.
- Encode spaces in URLs as `%20`, and write ampersands in HTML attributes as `&amp;`.
- A local computer file path is not a public website URL.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [15 - Links and the anchor element](15-links.md) | [Q&A](../qnas/16-urls-paths-and-fragments.md) | [Example](../examples/16-urls-paths-and-fragments.md) | [17 - Navigation and linking between pages](17-navigation-and-page-links.md) |
