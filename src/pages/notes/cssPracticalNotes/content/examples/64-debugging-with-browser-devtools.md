# 64 - Debugging with browser developer tools - Example

This example creates a profile card whose heading appears gray even though an earlier rule sets it to green. The page is intentionally written with a cascade conflict so you can diagnose the rendered result in browser developer tools.

## Question

The card title should use the green accent color, but it appears gray. Which declaration wins, how can you prove why, and what source change fixes the issue?

## Complete example

Save the following two files in the same folder. Open `index.html` in a browser, then use the browser's developer tools to investigate the title.

### index.html

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profile card - CSS debugging practice</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <main class="page-shell">
    <header class="page-heading">
      <p class="eyebrow">Debugging practice</p>
      <h1>Inspect the rule that controls this title</h1>
      <p>
        The profile title is meant to use the green accent, but a competing
        declaration currently changes its color.
      </p>
    </header>

    <article class="profile-card" aria-labelledby="profile-title">
      <div class="profile-card__avatar" aria-hidden="true">AR</div>
      <div class="profile-card__body">
        <p class="profile-card__eyebrow">Frontend learner</p>
        <h2 class="profile-card__title" id="profile-title">Ashish Ranjan</h2>
        <p class="profile-card__summary">
          Learning how browser evidence can turn a CSS guess into a precise fix.
        </p>
        <a class="profile-card__link" href="#details">View profile details</a>
      </div>
    </article>

    <section class="debug-notes" id="details" aria-labelledby="debug-title">
      <h2 id="debug-title">What to investigate</h2>
      <ol>
        <li>Select the profile title in the page inspector.</li>
        <li>Find the computed <code>color</code> value.</li>
        <li>Trace that value to the winning selector in the rules view.</li>
        <li>Temporarily disable the winning declaration and observe the title.</li>
        <li>Fix the source stylesheet and reload the page.</li>
      </ol>
    </section>
  </main>
</body>
</html>
~~~

### styles.css

~~~css
:root {
  color-scheme: light;
  font-family: Arial, Helvetica, sans-serif;
  background: #f3f6f4;
  color: #202a24;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  padding: 48px 20px;
}

.page-shell {
  width: min(100%, 760px);
  margin-inline: auto;
}

.page-heading {
  margin-bottom: 28px;
}

.eyebrow,
.profile-card__eyebrow {
  margin: 0 0 8px;
  color: #52645a;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-heading h1 {
  max-width: 24ch;
  margin: 0 0 12px;
  font-size: clamp(1.8rem, 5vw, 2.7rem);
  line-height: 1.1;
}

.page-heading > p:last-child {
  max-width: 62ch;
  margin: 0;
  color: #52645a;
  line-height: 1.6;
}

.profile-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border: 1px solid #cbd6ce;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 30px rgb(32 42 36 / 8%);
}

.profile-card__avatar {
  display: grid;
  flex: 0 0 64px;
  width: 64px;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: #dceee2;
  color: #176b3b;
  font-size: 1.15rem;
  font-weight: 800;
}

.profile-card__body {
  min-width: 0;
}

.profile-card__eyebrow {
  margin-bottom: 6px;
}

/* This is the intended title color, but a later, more specific rule wins. */
.profile-card__title {
  margin: 0;
  color: #176b3b;
  font-size: 1.6rem;
  line-height: 1.2;
}

.profile-card__summary {
  max-width: 55ch;
  margin: 12px 0 16px;
  color: #52645a;
  line-height: 1.6;
}

.profile-card__link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 0 14px;
  border-radius: 8px;
  background: #176b3b;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}

.profile-card__link:hover {
  background: #10552e;
}

.profile-card__link:focus-visible {
  outline: 3px solid #e0a800;
  outline-offset: 3px;
}

/* Intentional bug: this later rule has greater specificity than the title rule. */
.page-shell .profile-card__title {
  color: #586174;
}

.debug-notes {
  margin-top: 28px;
  padding: 20px 24px;
  border: 1px solid #cbd6ce;
  border-radius: 12px;
  background: #fff;
}

.debug-notes h2 {
  margin: 0 0 12px;
  font-size: 1.15rem;
}

.debug-notes ol {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 22px;
  color: #39473e;
  line-height: 1.5;
}

.debug-notes code {
  padding: 2px 5px;
  border-radius: 4px;
  background: #edf2ee;
  color: #174b2d;
}

@media (max-width: 520px) {
  body {
    padding: 28px 16px;
  }

  .profile-card {
    gap: 14px;
    padding: 18px;
  }

  .profile-card__avatar {
    flex-basis: 48px;
    width: 48px;
    font-size: 0.95rem;
  }
}
~~~

## Expected output

The page shows a profile card with the title **Ashish Ranjan** in gray. The stylesheet also contains a green color declaration for that title. The later selector `.page-shell .profile-card__title` wins because it has greater specificity than `.profile-card__title`.

The exact DevTools panel labels differ between browsers. Look for the selected element's matching rules and its computed `color` value.

## Debug it in the browser

1. Open the page and inspect the profile title.
2. Confirm the selected element is the `<h2 id="profile-title">`, not its parent card.
3. Find `color` in the computed styles. It should resolve to `rgb(88, 97, 116)`, which corresponds to `#586174`.
4. In the matching rules, find `.page-shell .profile-card__title`. Its `color` declaration is the winning declaration.
5. Find `.profile-card__title`. Its green `color` declaration should be crossed out because the more specific rule wins.
6. Temporarily uncheck `color: #586174`. The title should turn green. This confirms that the gray declaration controls the symptom.
7. Reload the page. The temporary DevTools edit should disappear, and the title should be gray again.

## Fix the source

The gray selector is an obsolete override in this example. Remove this whole rule from `styles.css`:

~~~css
/* Intentional bug: this later rule has greater specificity than the title rule. */
.page-shell .profile-card__title {
  color: #586174;
}
~~~

Keep the intended title rule:

~~~css
.profile-card__title {
  margin: 0;
  color: #176b3b;
  font-size: 1.6rem;
  line-height: 1.2;
}
~~~

Save `styles.css` and reload the page. The title should now appear green. Inspect it again to confirm that the computed color comes from `.profile-card__title` and that no competing gray declaration remains.

## Why the bug happened

Both selectors match the title. The class selector `.profile-card__title` has one class component. The later selector `.page-shell .profile-card__title` has two class components, so it has greater specificity. Since both declarations have the same origin, importance, and layer, the more specific selector wins before source order needs to decide the result.

The useful fix is to remove the obsolete rule that no longer belongs. Adding `!important` or making the intended selector even more specific would hide the conflict instead of removing its cause.

## Try it yourself

1. Change the gray selector to `.page-shell h2.profile-card__title`. Inspect the rules and note the specificity change.
2. Move the gray rule above the green rule without changing either selector. Observe whether source order changes the winner.
3. Change the viewport below 520 pixels. Confirm that the card layout changes while the title color stays green after the fix.
4. Add a temporary `font-size` declaration in DevTools, reload, and compare it with the saved source file.
5. Intentionally change the stylesheet path in the HTML, reload, and use the network tools to find the failed request. Restore the correct path afterward.

## Chapter navigation

| Previous chapter | Lesson | Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [63 - Styling Shadow DOM and web components](../lessons/63-shadow-dom-and-web-components.md) | [Lesson](../lessons/64-debugging-with-browser-devtools.md) | [Q&A](../qnas/64-debugging-with-browser-devtools.md) | [65 - Validation and browser compatibility](../lessons/65-validation-and-browser-compatibility.md) |