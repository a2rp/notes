# Example 45 - Popover attributes

## Question

Create a garden visitor page with native popovers for visitor information. Include an auto popover that can be light-dismissed, a nested hint for a short tip, and a manual popover with its own close button.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Plan your visit - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/garden">The garden</a></li>
          <li><a href="/workshops">Workshops</a></li>
          <li><a href="/visit">Plan your visit</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Plan your garden visit</h1>
      <p>
        Find opening hours, directions, and helpful information before you
        arrive.
      </p>

      <section aria-labelledby="visitor-info-heading">
        <h2 id="visitor-info-heading">Visitor information</h2>

        <button
          type="button"
          popovertarget="visit-guide"
          popovertargetaction="show">
          Open the visitor guide
        </button>

        <button
          type="button"
          popovertarget="garden-hours"
          popovertargetaction="show">
          Check garden hours
        </button>

        <aside
          id="visit-guide"
          popover="auto"
          aria-labelledby="guide-heading">
          <h2 id="guide-heading">Getting ready for your visit</h2>
          <p>
            The garden entrance is at 18 Green Lane. The welcome desk is just
            inside the main gate.
          </p>
          <p>
            <button type="button" popovertarget="planting-tip">
              Read a planting tip
            </button>
          </p>

          <div id="planting-tip" popover="hint">
            <p>Most leafy herbs grow well with several hours of sunlight.</p>
          </div>

          <button
            type="button"
            popovertarget="visit-guide"
            popovertargetaction="hide">
            Close the visitor guide
          </button>
        </aside>

        <aside
          id="garden-hours"
          popover="auto"
          aria-labelledby="hours-heading">
          <h2 id="hours-heading">Opening hours</h2>
          <p>The garden is open every day from 9 a.m. to 5 p.m.</p>
          <p>Last entry is at 4:30 p.m.</p>
          <button
            type="button"
            popovertarget="garden-hours"
            popovertargetaction="hide">
            Close opening hours
          </button>
        </aside>
      </section>

      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading">A message that stays open</h2>
        <p>
          This example uses a manual popover to show a message that needs an
          explicit close action.
        </p>

        <button
          type="button"
          popovertarget="visit-message"
          popovertargetaction="show">
          Show visit message
        </button>

        <aside
          id="visit-message"
          popover="manual"
          aria-labelledby="message-heading">
          <h2 id="message-heading">Visit checklist</h2>
          <ul>
            <li>Check the weather.</li>
            <li>Bring a water bottle.</li>
            <li>Wear comfortable shoes.</li>
          </ul>
          <button
            type="button"
            popovertarget="visit-message"
            popovertargetaction="hide">
            Dismiss checklist
          </button>
        </aside>
      </section>
    </main>

    <footer>
      <p>City Garden visitor information</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page shows visitor information controls and a separate visit checklist control. Activating “Open the visitor guide” displays the guide above the page. The nested planting tip can be opened while the guide remains open. Activating “Check garden hours” opens the other auto popover and closes the visitor guide.

Auto popovers can be dismissed by clicking outside them or pressing Escape. Their appearance and exact placement depend on the browser because this example uses no CSS positioning.

The checklist uses a manual popover. Clicking outside it or opening another popover does not automatically close it. Use “Dismiss checklist” to hide it. Popovers do not block interaction with the rest of the page.

## Explanation

- The popover attribute designates an element as a popover. The popover is hidden when the page first loads.
- Each popovertarget value matches the id of its target popover. Keep those ids unique.
- The visitor guide and opening hours use popover="auto". Auto popovers support light dismissal and generally close other auto popovers when opened.
- The visitor guide uses an aside because its content is related supporting information. The hint uses a div because it is a short supplemental tip.
- The planting tip is nested inside the visitor guide. The hint state is designed for brief supplemental content and does not close an auto popover when shown in a nested relationship.
- The auto popover buttons demonstrate explicit show and hide actions. The planting tip button omits popovertargetaction, so its action is toggle.
- The checklist uses popover="manual". A manual popover does not light-dismiss or close automatically when another popover opens, so the page includes an explicit hide button.
- Shown popovers are displayed in the browser's top layer, above ordinary page content. They remain in their original place in the document and do not make the rest of the page inert.
- A popover is not automatically a menu, tooltip, disclosure, or modal dialog. This example uses headings, paragraphs, lists, and buttons according to the content's meaning.
- The hint popover state is newer and may not be supported in some older browsers. Check browser compatibility if the hint behavior is important.

## How to try it

Copy the HTML code block using its copy button and save it as garden-visit-popovers.html. Open it in a current browser. Open the visitor guide, open the planting tip, and then open the garden hours. Observe which auto popovers close. Click outside an auto popover or press Escape to dismiss it.

Open the visit checklist and click outside it. It remains open until you activate “Dismiss checklist”. Try removing popovertargetaction from the other buttons to see the default toggle action.

The links in this example are illustrative paths. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 45 - Popover attributes](../lessons/45-popover-attributes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [44 - Dialog elements](44-dialog-element.md) | [Lesson](../lessons/45-popover-attributes.md) | [Q&A](../qnas/45-popover-attributes.md) | [46 - Template elements](46-template-element.md) |
