# 51 - Safe links and embedded content

A link can take a visitor to another site or download a file. An embedded page can run in its own browsing context inside yours. Good HTML helps people understand what will happen and limits some risks, but no attribute can make an unknown destination trustworthy.

This chapter applies safe patterns to links and embeds. Chapter 15 covers how to create links, and Chapter 23 covers iframe sandboxing in more detail.

## Make link destinations clear

Link text should describe the destination or action. When it helps the visitor, name the destination site and say when a link opens a new tab or downloads a file.

~~~html
<p>
  Read the
  <a href="https://example.org/html-guide">
    HTML guide
  </a>.
</p>

<p>
  <a href="https://example.org/report.pdf" download>
    Download the annual report (PDF)
  </a>
</p>
~~~

The link text is a promise about what the link does. Keep it accurate. A familiar logo or domain in the text does not prove that the actual `href` destination is safe, so inspect both when reviewing markup.

## Opening a link in a new tab

Most links should open in the current tab. If a new browsing context is useful, `target="_blank"` requests one. Browsers generally open a new tab, but the browser or user's settings can choose otherwise.

~~~html
<a
  href="https://example.org/guide"
  target="_blank"
  rel="noopener"
>
  Read the guide on Example.org (opens in a new tab or window)
</a>
~~~

`noopener` prevents the opened page from receiving a `window.opener` reference to the page that created it. Current HTML gives links with `target="_blank"` this behavior by default, unless the link explicitly requests an opener. Including `rel="noopener"` makes the intent clear in the markup and helps readers recognize the relationship.

`noopener` does not verify the destination or prevent the new page from displaying misleading content. The visitor still needs a clear indication of where the link goes.

## Referrer information and `noreferrer`

When a browser follows a link, it may send information about the page the visitor came from in the `Referer` request header. The link's `referrerpolicy` attribute can control this. For example, `no-referrer` sends no referrer information:

~~~html
<a
  href="https://example.org/guide"
  referrerpolicy="no-referrer"
>
  Read the guide
</a>
~~~

The `noreferrer` value for `rel` also withholds referrer information, and it includes the behavior of `noopener`:

~~~html
<a href="https://example.org/guide" target="_blank" rel="noreferrer">
  Read the guide on Example.org
</a>
~~~

Withholding referrer information can affect analytics or a destination that expects it. Choose the behavior for a reason. `noreferrer` is a privacy choice, not a way to certify that a destination is safe.

## Downloads should be expected

The `download` attribute expresses that a link is intended to download a resource. It may also suggest a filename:

~~~html
<a href="/files/html-notes.pdf" download="html-notes.pdf">
  Download the HTML notes (PDF)
</a>
~~~

The browser can adjust the suggested filename. Whether a file downloads can depend on the browser, response headers, and whether the resource is same-origin. Do not promise a forced download for an arbitrary cross-origin URL. Tell visitors the file type and, when useful, its size or source.

Only link to files you expect visitors to receive. Do not disguise a download as a normal page link or use a misleading file name.

## Do not use executable URL schemes for ordinary links

An `href` is a URL, and some URL schemes can run code when followed. Do not use a `javascript:` URL as a link or as a substitute for a button:

~~~html
<a href="javascript:saveDocument()">Save</a>
~~~

Use a button for an action instead:

~~~html
<button type="button">Save</button>
~~~

Avoid inserting untrusted values directly into `href` or `src`. If a site accepts a URL from a user, it needs to validate which schemes and destinations it permits before presenting the value as a link or loading it as embedded content. A plain HTML attribute is not a security check. For user-submitted HTML or URLs, validation and output handling must also happen in the application that processes and displays that data.

## Embed only content you intend to show

An `iframe` loads another document inside the current page. The embedded document can have its own scripts and content, and the provider can change what it serves later. Use an embed URL provided for that purpose, and consider whether a regular link would be simpler.

When an iframe is useful:

- Give it a specific `title` so people know what it contains.
- Use `sandbox` to restrict capabilities, then add only the tokens the embed needs.
- Use the `allow` attribute to name only browser features the embed needs.
- Use an appropriate `referrerpolicy` if the page address should not be sent to the provider.
- Use `loading="lazy"` for an iframe below the fold when delaying it is appropriate. Lazy loading is a performance option, not a security control.
- Keep a normal link nearby so visitors can open the content directly if the embed fails or is hard to use.

Example:

~~~html
<iframe
  src="https://player.example.org/embed/42"
  title="Video: How to grow basil indoors"
  width="640"
  height="360"
  loading="lazy"
  referrerpolicy="no-referrer"
  sandbox="allow-scripts"
  allow="fullscreen">
</iframe>

<p>
  <a href="https://player.example.org/embed/42">
    Open the video on Player Example
  </a>
</p>
~~~

This example allows scripts because a typical player needs them, but leaves other sandbox restrictions in place. It permits fullscreen only. A real provider may require different capabilities, so check its embed documentation and grant the minimum needed. `no-referrer` may affect some embeds; use a different policy if the provider requires referrer information and sharing it is appropriate.

For user-created or otherwise untrusted embedded documents, sandboxing an iframe is only one layer. Do not treat it as a substitute for sanitizing submitted markup or isolating it from sensitive site content. The earlier [Chapter 23 lesson](23-safe-embedded-content.md) covers sandbox tokens and iframe restrictions in depth.

## Review an example

Consider these two links:

~~~html
<a href="https://trusted.example.org/login">Continue</a>
<a href="javascript:openSettings()">Settings</a>
~~~

The first has vague text, so a visitor cannot easily tell where it goes. The second uses a script URL for an action. Improve the first with descriptive text, and make the second a button:

~~~html
<a href="https://trusted.example.org/login">
  Sign in to Trusted Example
</a>

<button type="button">Open settings</button>
~~~

In a real application, the button needs behavior supplied by the application. The HTML element still communicates that this is an action, while the anchor communicates navigation.

## Common mistakes

- Assuming link text proves that the `href` has the expected destination.
- Opening every external link in a new tab without telling visitors.
- Treating `noopener` as a check that the destination is trustworthy.
- Using `noreferrer` without understanding that the destination will not receive referrer information.
- Expecting `download` to force every cross-origin resource to save locally.
- Using `javascript:` as a link for an action.
- Putting unvalidated user-provided URLs in `href` or an iframe's `src`.
- Embedding a regular page URL when the provider requires a dedicated embed URL.
- Giving an iframe broad permissions without checking what it needs.
- Treating `loading="lazy"` or an iframe sandbox as complete protection for untrusted content.
- Omitting an iframe title or a direct link to the embedded content.

## Try it yourself

1. Review three external links and compare each visible label with its actual `href`.
2. Update one new-tab link to explain that it opens a new tab or window and explicitly include `rel="noopener"`.
3. Add `referrerpolicy="no-referrer"` to a link and explain what information the destination will not receive.
4. Create a clearly labeled download link that names its file type.
5. Replace a `javascript:` link with a button for the action it performs.
6. Add a titled iframe with `sandbox`, then list why each added permission is needed.
7. Put a direct link next to the iframe and explain when a visitor might use it.
8. Explain why an application must validate untrusted URLs instead of relying on HTML attributes alone.

## Key points

- Make link text match the actual destination or action.
- Use a new tab only when it helps, and make that behavior clear.
- `noopener` protects the opener relationship. It does not make a destination trustworthy.
- `noreferrer` withholds referrer information and also has `noopener` behavior.
- The `download` attribute expresses intent, but does not guarantee a cross-origin download.
- Do not use executable URL schemes such as `javascript:` for ordinary links.
- Give embedded content a title, limit its capabilities, and provide a direct link.
- HTML attributes are not a substitute for validating untrusted URLs or isolating untrusted content.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [50 - Microdata and structured information](50-microdata.md) | [Q&A](../qnas/51-html-safety.md) | [Example](../examples/51-html-safety.md) | [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md) |