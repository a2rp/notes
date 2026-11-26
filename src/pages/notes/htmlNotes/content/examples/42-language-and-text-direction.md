# Example 42 - Language, text direction, and international content

## Question

Create a small community garden page that identifies its languages, displays an Arabic passage in the correct direction, keeps an English link readable inside that passage, isolates a name that may use any writing direction, and accepts comments written in either direction.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>International garden guide - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/garden">The garden</a></li>
          <li><a href="/visitors">Visitor information</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Welcome to the community garden</h1>
      <p>
        Find practical information for visiting and helping in our garden.
        Our Spanish-speaking visitors can read
        <span lang="es">información para visitantes</span>.
      </p>

      <section lang="ar" dir="rtl" aria-labelledby="arabic-heading">
        <h2 id="arabic-heading">&#1605;&#1593;&#1604;&#1608;&#1605;&#1575;&#1578; &#1575;&#1604;&#1586;&#1610;&#1575;&#1585;&#1577;</h2>
        <p>
          &#1575;&#1602;&#1585;&#1571; &#1605;&#1593;&#1604;&#1608;&#1605;&#1575;&#1578; &#1575;&#1604;&#1586;&#1610;&#1575;&#1585;&#1577; &#1602;&#1576;&#1604; &#1575;&#1604;&#1608;&#1589;&#1608;&#1604;.
          <a href="/english/visitors" lang="en" dir="ltr">Read the visitor guide in English</a>.
        </p>
      </section>

      <section aria-labelledby="contributors-heading">
        <h2 id="contributors-heading">Recent contributors</h2>
        <p>
          A new seed collection was shared by
          <bdi>Jamie Green</bdi>.
        </p>
        <p>
          A garden photo was shared by
          <bdi>&#1587;&#1605;&#1575;</bdi>.
        </p>
      </section>

      <section aria-labelledby="comment-heading">
        <h2 id="comment-heading">Leave a comment</h2>
        <form action="/comments" method="post">
          <p>
            <label for="visitor-comment">Your comment</label>
            <textarea
              id="visitor-comment"
              name="comment"
              dir="auto"
              rows="4"
              required></textarea>
          </p>
          <p>
            <button type="submit">Send comment</button>
          </p>
        </form>
      </section>

      <section aria-labelledby="override-heading">
        <h2 id="override-heading">A deliberate direction override</h2>
        <p>
          This unusual example forces the enclosed label to use right-to-left
          direction: <bdo dir="rtl">Garden entrance</bdo>.
        </p>
      </section>
    </main>

    <footer>
      <p>City Garden visitor information</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page displays an English introduction, followed by a right-to-left Arabic visitor section. The English visitor-guide link remains left-to-right within that Arabic passage. The Spanish phrase is identified as Spanish.

The contributor names are isolated from the surrounding English sentences, so a name written in another script does not change how nearby punctuation and text are arranged. The comment box determines its base direction from the text entered into it. The final direction-override example forces its short label to right-to-left display.

The exact appearance of Arabic glyphs depends on the browser and available fonts. This Markdown file displays the HTML as text and does not run it.

## Explanation

- The root html element uses lang="en" because English is the main language of the page. Software can use this information for pronunciation and other language-aware behavior. It does not translate the content.
- The Spanish phrase has lang="es". Language information is inherited, so only the passage that changes language needs its own language value.
- The Arabic section uses both lang="ar" and dir="rtl". The language attribute identifies Arabic; the direction attribute sets a right-to-left base direction. Neither attribute replaces the other.
- The English link inside the Arabic passage has lang="en" and dir="ltr" so its language and direction are explicit within its right-to-left context.
- The Arabic characters are written as numeric character references in this source example. A UTF-8 HTML file can also contain the Arabic characters directly.
- Each contributor name is wrapped in bdi because its writing direction is not known in advance. The element isolates the name from the surrounding sentence while the browser determines its direction from its content.
- The comment textarea uses dir="auto" because visitors may type in either direction. The browser chooses a base direction from the first strongly directional character. This is direction handling, not language detection.
- The bdo element deliberately overrides the normal bidirectional text algorithm. It is included to demonstrate the feature, not as a pattern for ordinary Arabic text. Use dir="rtl" for normal right-to-left content.
- The example uses language and direction as content information. CSS text alignment can change visual placement, but it does not identify a language or set the same text-direction information.

## How to try it

Copy the HTML code block using its copy button and save it as international-garden.html. Open the file in a browser to view the page. Try entering one English comment and one Arabic comment in the textarea, then compare their base directions. If you edit the source, try removing the explicit direction from the English link and observe how it behaves inside the Arabic passage.

The example links and form action are illustrative paths. This standalone file does not include a server to handle navigation or submit comments.

## Related lesson

[Read lesson 42 - Language, text direction, and international content](../lessons/42-language-and-text-direction.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [41 - ARIA in HTML: when and how to use it](41-aria-in-html.md) | [Lesson](../lessons/42-language-and-text-direction.md) | [Q&A](../qnas/42-language-and-text-direction.md) | [43 - Details and summary](43-details-and-summary.md) |
