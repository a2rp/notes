# Example 08 - Comments, character references, and special characters

## Question

Create a complete HTML page that includes a source comment and shows how character references display angle brackets, ampersands, quotation marks, and copyright symbols as text.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML Character Examples</title>
  </head>
  <body>
    <!-- Source note: this page demonstrates characters that need references. -->
    <main>
      <h1>Characters in HTML</h1>
      <p>
        Write &lt;strong&gt;important&lt;/strong&gt; to show tag spelling as text.
      </p>
      <p>Comparison: 5 &lt; 8 and 8 &gt; 5.</p>
      <p>Tea &amp; coffee. The sign says &quot;ready&quot;.</p>
      <p title="She said &quot;hello&quot;">
        This sentence has a title value containing quotation marks.
      </p>
      <p>Copyright: &copy; 2026 Garden Journal.</p>
      <p>Numeric references: &#169; and &#xA9;.</p>
    </main>
  </body>
</html>
~~~

## Expected output

The browser tab shows **HTML Character Examples**. The page displays a heading and six paragraphs. The first paragraph shows the literal text `<strong>important</strong>`, rather than turning it into a bold element. The comparison shows **5 < 8 and 8 > 5**, and the next paragraph shows **Tea & coffee. The sign says "ready".** The copyright paragraph and both numeric references display the copyright sign.

The source comment does not appear as page text. The browser uses its default styles because the document contains no CSS.

## Explanation

- The comment begins with `<!--` and ends with `-->`. It remains in the source but is not displayed as ordinary page content. Do not put confidential information in comments because readers can inspect the source.
- Character references begin with `&` and end with `;`. For example, `&lt;` displays a less-than sign and `&gt;` displays a greater-than sign.
- The references around `strong` display the tag spelling as text. Without escaping its angle brackets, the browser would parse it as markup.
- `&amp;` displays an ampersand. `&quot;` represents a quotation mark in both text and the quoted `title` attribute value.
- `&copy;`, `&#169;`, and `&#xA9;` are named, decimal numeric, and hexadecimal numeric references for the copyright sign.
- The `meta charset="utf-8"` declaration identifies the document's text encoding.

## How to try it

Copy the HTML code block using its copy button, save it as `characters-practice.html` with UTF-8 encoding, and open it in a browser. Change the comment and compare it with the visible page. Try changing the character references and observe the displayed characters.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 08 - Comments, character references, and special characters](../lessons/08-comments-and-character-references.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [07 - Global attributes](07-global-attributes.md) | [Lesson](../lessons/08-comments-and-character-references.md) | [Q&A](../qnas/08-comments-and-character-references.md) | [09 - The head element and page title](09-head-and-title.md) |
