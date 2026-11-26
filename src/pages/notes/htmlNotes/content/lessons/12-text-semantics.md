# 12 - Text semantics: emphasis, importance, and meaning

HTML includes text elements that explain how a phrase should be understood. Some elements mark stress or importance. Others mark highlighted, side, or otherwise distinct text. Choose an element for its meaning, not just for the way a browser normally styles it.

## What you will learn

- Tell stress emphasis from importance.
- Use **em** and **strong** according to their meanings.
- Recognize the roles of **b**, **i**, **mark**, **small**, **s**, and **u**.
- Use **span** as a generic inline container when no semantic element fits.
- Avoid choosing text elements only for bold, italic, or underlined appearance.

## Meaning and appearance are different

Browsers commonly display **strong** text in bold and **em** text in italics. These are default visual styles. Their HTML meaning is not simply “bold” or “italic”.

A text element communicates meaning to browsers and other tools. CSS can change how it looks without changing that meaning. When you later study CSS, you can style a semantic element while keeping the appropriate HTML.

## Use em for stress emphasis

The **em** element marks stress emphasis. It can affect how a sentence is understood:

~~~html
<p>I asked for <em>fresh</em> basil, not dried basil.</p>
~~~

The stress on “fresh” distinguishes it from dried basil. Another example:

~~~html
<p>You <em>must</em> water the seedlings today.</p>
~~~

Nest **em** elements only when the sentence genuinely needs stronger nested stress:

~~~html
<p>This is <em>very <em>important</em></em>.</p>
~~~

Do not use **em** just to make text italic. Choose it when the wording carries stress emphasis.

## Use strong for importance

The **strong** element marks text with strong importance, seriousness, or urgency:

~~~html
<p><strong>Warning:</strong> Keep the seeds away from pets.</p>
~~~

The word “Warning” is important to the reader. The element does not mean “make this bold”. Do not use it just to make an ordinary phrase look heavier.

**em** and **strong** can appear together when both meanings apply:

~~~html
<p><strong>Read the label <em>before</em> using the treatment.</strong></p>
~~~

The sentence is important, and “before” receives stress emphasis.

## Distinguish b and i from emphasis

The **b** element draws attention to text for a practical reason without saying that it is more important. For example, a product name in a review can be marked with **b**:

~~~html
<p>The <b>Sunrise Planter</b> holds three herb pots.</p>
~~~

The **i** element marks text in an alternate voice or mood, or a term that is set apart from the surrounding prose, such as a technical term:

~~~html
<p>The term <i>drainage</i> describes how water leaves the soil.</p>
~~~

Use **em** for stress emphasis and **strong** for importance. Use **b** or **i** only when their specific meanings fit. If you only want a visual effect, CSS is a better tool.

## Highlight relevant text with mark

The **mark** element highlights text that is relevant in the current context:

~~~html
<p>Search result: <mark>container gardening</mark> for small spaces.</p>
~~~

A highlighted phrase might match the words a reader searched for. Do not use **mark** just because text needs color. If the highlighting matters, also make sure the meaning is clear without relying only on color.

## Use small for side comments

The **small** element marks side comments or fine print, such as a copyright note:

~~~html
<p><small>Copyright 2026 Garden Journal.</small></p>
~~~

Browsers often display it in a smaller font, but its meaning is not simply “make this text tiny”. Use it when the content is a side comment or fine print. It is not a good way to make ordinary content less important.

## Use s for information that is no longer accurate

The **s** element marks text that is no longer accurate or relevant:

~~~html
<p>Regular price: <s>$12</s>. Today: $8.</p>
~~~

The old price is no longer current. The **s** element is not a general marker for text removed during editing. For a document edit, **del** has a different meaning and can represent deleted content.

## Use u only for a suitable annotation

The **u** element marks a span of text with a non-textual annotation, such as a spelling annotation:

~~~html
<p>The visitor <u>recieved</u> a seed catalog.</p>
~~~

Use **u** sparingly. Browsers often underline it, and readers commonly interpret underlined text as a link. Do not use it just to underline ordinary words or to mark stress emphasis.

## Use span when no semantic element fits

The **span** element is a generic inline container. It does not add meaning by itself:

~~~html
<p>Water the <span class="plant-name">basil</span> carefully.</p>
~~~

A **span** can group part of a sentence when another tool needs to target it, for example through a class. If an HTML element already describes the text's meaning, use that element instead of a generic span.

## A complete example

~~~html
<article>
  <h1>Using a plant treatment safely</h1>
  <p><strong>Important:</strong> Read the directions <em>before</em> applying it.</p>
  <p>The label describes the recommended <i>dosage</i>.</p>
  <p>Search result: <mark>plant treatment directions</mark>.</p>
  <p><small>Follow the product label and local guidance.</small></p>
  <p>Old price: <s>$12</s>. Current price: $8.</p>
  <p>The package misspells <u>instrutions</u>.</p>
</article>
~~~

Each element describes a different relationship to the text. The visible styles may vary by browser, stylesheet, or other presentation method.

## Common mistakes

- **Using em only to get italic text.** Use it for stress emphasis.
- **Using strong only to get bold text.** Use it for important content.
- **Treating em and strong as interchangeable.** Stress and importance are different meanings.
- **Using b to mark an urgent warning.** Use strong when the text is important.
- **Using mark just for color.** It identifies text relevant in context.
- **Using small only to make text tiny.** Use it for side comments or fine print.
- **Using s to represent edits that removed text.** Use the element that communicates the edit when that is what you mean.
- **Underlining ordinary text with u.** Underlines are commonly read as links, and u has a specific annotation meaning.
- **Using span when a semantic text element already fits.** Prefer the element that explains the content.

## Try it yourself

1. Mark the word that changes the meaning in “I wanted the fresh leaves, not the dried ones.”
2. Mark a safety warning with strong importance.
3. Write one phrase that uses both strong importance and stress emphasis.
4. Add a search-result example with the matched words marked as relevant.
5. Show an old price that is no longer accurate beside the current price.
6. Write a short copyright side note.
7. Decide whether a product name in a review needs strong, b, or neither, and explain why.
8. Find an example of underlined text and decide whether u's annotation meaning applies.

## Key points

- **em** marks stress emphasis; **strong** marks importance or seriousness.
- **b** draws attention without adding importance; **i** marks an alternate voice or a term set apart from the prose.
- **mark** highlights text relevant to the current context.
- **small** marks side comments or fine print.
- **s** marks information that is no longer accurate or relevant; **u** marks a specific kind of annotation.
- **span** is a generic inline container and adds no meaning by itself.
- Choose HTML elements for meaning and CSS for appearance.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [11 - Headings and paragraphs](11-headings-and-paragraphs.md) | [Q&A](../qnas/12-text-semantics.md) | [Example](../examples/12-text-semantics.md) | [13 - Code, abbreviations, dates, and machine-readable text](13-specialized-text-elements.md) |
