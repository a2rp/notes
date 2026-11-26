# 23 - Embedding external content safely

An iframe loads a separate document, which may run scripts, submit forms, open popups, or request browser features. HTML provides iframe attributes that can reduce what embedded content is allowed to do. Start with the smallest set of permissions the embed needs, and use content from sources you trust.

## What you will learn

- How sandbox restricts an embedded document.
- How to add back only the capabilities an embed requires.
- How allow controls features such as fullscreen.
- How referrerpolicy can limit information sent with a request.
- Why untrusted content needs careful isolation.
- How to provide a regular link as another way to reach embedded content.

## Start with a sandbox

The sandbox attribute applies restrictions to a page loaded in an iframe. With no tokens, it blocks capabilities such as scripts, form submission, popups, and top-level navigation.

~~~html
<iframe
  src="https://content.example.net/preview/42"
  title="Preview of the submitted page"
  width="640"
  height="400"
  sandbox>
</iframe>
~~~

This is a restrictive starting point for content that does not need those capabilities. The embedded page may stop working if it depends on scripts, forms, or other restricted features. Test the result and add only the specific capability that is necessary.

## Add only the capabilities that are needed

Sandbox tokens are space-separated values that re-enable particular capabilities. For example, allow-scripts permits scripts to run inside the embedded page:

~~~html
<iframe
  src="https://widgets.example.net/chart/weekly"
  title="Weekly activity chart"
  sandbox="allow-scripts">
</iframe>
~~~

The frame remains sandboxed in other ways. Do not add tokens just to make an embed work without first understanding what each permission allows.

Common tokens include:

- allow-scripts permits scripts inside the embedded page.
- allow-forms permits form submission.
- allow-popups permits popups opened by the embedded page.
- allow-downloads permits downloads initiated by the embedded page.
- allow-same-origin preserves the embedded page's origin instead of assigning it an opaque origin.
- allow-top-navigation-by-user-activation lets the frame navigate the top-level page after user interaction.

For content on the same origin as the parent page, do not combine allow-scripts and allow-same-origin. Together they can let embedded code remove the sandbox and reload without its restrictions.

For untrusted user content, a sandbox is only one layer of protection. Serve that content from a separate, dedicated origin as well. Then it is less able to affect the main site's origin if someone opens the content directly.

## Limit powerful browser features with allow

The allow attribute applies a Permissions Policy to the embedded document. Use it to name only features the embed needs. For example, a video player may need fullscreen:

~~~html
<iframe
  src="https://video.example.net/embed/clip-42"
  title="Video: A walk through the garden"
  allow="fullscreen"
  sandbox="allow-scripts">
</iframe>
~~~

An allow value cannot override restrictions set by the parent page, browser settings, or a user's permission choice. Do not grant access to a camera, microphone, location, or other sensitive feature unless the embed needs it and the visitor expects it.

## Limit referrer information

When an iframe request loads another site, the browser may send the referring page address in the Referer request header. The referrerpolicy attribute controls what referrer information is sent for requests initiated by the frame.

~~~html
<iframe
  src="https://viewer.example.net/report/42"
  title="Embedded report"
  referrerpolicy="no-referrer"
  sandbox>
</iframe>
~~~

The no-referrer value sends no referrer information. This can improve privacy, but it may affect an embed that relies on referrer information. Choose a policy that fits the content and its provider.

## Load offscreen embeds later

For content below the visible part of a long page, loading="lazy" asks the browser to defer loading the iframe until it is near the viewport.

~~~html
<iframe
  src="https://calendar.example.net/embed/community"
  title="Community events calendar"
  width="640"
  height="480"
  loading="lazy"
  sandbox>
</iframe>
~~~

Lazy loading can avoid loading a third-party page before a visitor is likely to see it. It does not replace a consent choice when one is needed.

## Keep a direct link available

An embedded page might be blocked by its provider, unavailable, or difficult to use in a small frame. Put a regular link near the iframe so visitors can open the content on its own page.

~~~html
<iframe
  src="https://maps.example.net/place/library"
  title="Map showing the central library"
  width="640"
  height="400"
  loading="lazy">
</iframe>

<p>
  <a href="https://maps.example.net/place/library">
    Open the map in a separate page
  </a>
</p>
~~~

An iframe does not have useful fallback content for current browsers. A link outside the frame remains available even when the embedded page cannot load.

## Choose embed sources carefully

- Use an embed URL published or documented by the provider. A normal page URL may not be designed to work inside an iframe.
- Avoid putting arbitrary user-provided URLs directly into src.
- Do not put untrusted HTML into srcdoc without appropriate sanitizing and isolation.
- Give the iframe a specific title so visitors know what it contains.
- Grant only required sandbox tokens and browser features.
- Provide a direct link when it helps visitors use the content.

HTML attributes reduce some risks, but they do not make an unknown site or user-submitted content trustworthy. For user-generated pages that can contain active content, use a separate origin and apply server-side protections as well.

## Common mistakes

- Omitting sandbox for untrusted embedded HTML without considering the capabilities it receives.
- Adding every sandbox token to make a third-party widget work.
- Combining allow-scripts and allow-same-origin for same-origin embedded content.
- Treating allow as a way to override browser permissions or parent-page policy.
- Allowing access to sensitive features without a clear need.
- Assuming referrerpolicy="no-referrer" is compatible with every provider.
- Embedding arbitrary user-supplied URLs or markup.
- Providing no direct link when the embed may be unavailable.

## Try it yourself

1. Add sandbox to a static embedded page and observe which interactions are restricted.
2. Add allow-scripts only to an example that needs scripts. Leave other sandbox restrictions in place.
3. Explain why allow-scripts and allow-same-origin should not be combined for same-origin content.
4. Add allow="fullscreen" to a video embed that needs fullscreen.
5. Add referrerpolicy="no-referrer" and explain what information this setting withholds.
6. Add loading="lazy" to an iframe below the fold.
7. Add a regular link outside an iframe to open the content directly.
8. Review an embed and list each capability it needs before adding sandbox tokens or allow features.

## Key points

- Sandbox restricts capabilities inside an iframe.
- Add only the sandbox tokens an embed needs.
- Do not combine allow-scripts and allow-same-origin for same-origin embedded content.
- Allow controls a permissions policy for the embedded document, but cannot override broader restrictions or user choices.
- Referrerpolicy can limit referrer information sent with iframe requests.
- Use separate origins and server-side protections for untrusted content.
- Keep a direct link available when an embed cannot be used.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [22 - The iframe element and embedded pages](22-iframes-and-embedded-pages.md) | [Q&A](../qnas/23-safe-embedded-content.md) | [Example](../examples/23-safe-embedded-content.md) | [24 - Responsive images: picture, srcset, and sizes](24-responsive-images.md) |
