# Example 47 - Hidden, inert, tabindex, and editable content

## Question

Create a volunteer review page that reveals a summary when a step is completed, keeps an appendix available to find-in-page, pauses an inactive preview, and provides editable rich-text and plain-text areas. Show how focus can move to the new summary without adding it to the normal Tab order.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Volunteer review - City Garden</title>
  </head>
  <body>
    <header>
      <p><a href="/">City Garden</a></p>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="/garden">The garden</a></li>
          <li><a href="/volunteer">Volunteer</a></li>
          <li><a href="/visit">Plan your visit</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Volunteer review</h1>
      <p>
        Review the garden notes, then mark the review step complete to reveal
        its summary.
      </p>

      <section aria-labelledby="review-heading">
        <h2 id="review-heading">Review the notes</h2>
        <p>Check the planting notes before completing this step.</p>
        <button type="button" id="complete-review">
          Mark review complete
        </button>

        <section id="review-summary" hidden aria-labelledby="summary-heading">
          <h3 id="summary-heading" tabindex="-1">Review summary</h3>
          <p>
            The planting notes are ready. The next step is to prepare the
            seed trays.
          </p>
        </section>

        <noscript>
          <p>
            The review summary needs JavaScript to appear after the button is
            activated.
          </p>
        </noscript>
      </section>

      <section
        id="soil-appendix"
        hidden="until-found"
        aria-labelledby="appendix-heading">
        <h2 id="appendix-heading">Soil appendix</h2>
        <p>
          Mulch reduces moisture loss from the soil and can help suppress
          weeds around young plants.
        </p>
      </section>

      <section aria-labelledby="preview-heading">
        <h2 id="preview-heading">Monthly report preview</h2>
        <p>
          The preview below is temporarily paused while the report is updated.
          It is visible for context, but its controls and text cannot be used
          right now.
        </p>

        <div inert>
          <h3>Paused preview</h3>
          <p>June volunteer hours: 24</p>
          <button type="button">Export this preview</button>
          <p contenteditable="true">This draft is also inactive while paused.</p>
        </div>
      </section>

      <section aria-labelledby="draft-heading">
        <h2 id="draft-heading">Edit a volunteer note</h2>
        <div contenteditable="true" aria-labelledby="draft-heading">
          <p>
            The tomato seedlings are ready to move into larger containers.
          </p>
          <p contenteditable="false">
            Fixed note: water the seedlings after transplanting.
          </p>
          <h3 id="plain-reply-heading" contenteditable="false">
            Plain-text reply
          </h3>
          <p
            contenteditable="plaintext-only"
            tabindex="0"
            aria-labelledby="plain-reply-heading">
            Add a reply here. Pasted formatting is not kept in this area.
          </p>
        </div>
        <p>
          These editable regions are not form fields and do not submit their
          text automatically.
        </p>
      </section>
    </main>

    <footer>
      <p>City Garden volunteer notes</p>
    </footer>

    <script>
      const completeReviewButton = document.querySelector("#complete-review");
      const reviewSummary = document.querySelector("#review-summary");
      const summaryHeading = document.querySelector("#summary-heading");

      completeReviewButton.addEventListener("click", () => {
        reviewSummary.hidden = false;
        summaryHeading.focus();
      });
    </script>
  </body>
</html>
~~~

## Expected output

At first, the review summary is hidden. Activating “Mark review complete” reveals it and moves keyboard focus to the “Review summary” heading. The heading can receive this programmatic focus but is not added to the regular Tab sequence.

The soil appendix is hidden while remaining available to find-in-page in browsers that support the hidden-until-found state. Searching for “Mulch” can reveal the appendix in those browsers.

The paused preview remains visible, but its button and editable paragraph cannot be focused or used because their parent section is inert. The explanatory message outside that section stays available.

The volunteer note can be edited. Its fixed note cannot be changed, and its nested plain-text reply area is separately reachable with Tab. A browser that supports plaintext-only editing removes rich formatting pasted into that area.

## Explanation

- The review summary starts with the Boolean hidden attribute. The script removes that state by setting the hidden property to false after the button is activated.
- The summary heading has tabindex="-1". The script can move focus to it with focus(), but it is omitted from normal sequential Tab navigation.
- The appendix uses hidden="until-found" so find-in-page or fragment navigation can reveal it in supporting browsers. Browser support varies, so check the browsers the page needs to serve.
- The preview has inert on its parent. Its descendants cannot normally receive focus or pointer interaction, text selection is unavailable, and the editable paragraph behaves as non-editable. The visible explanation is outside the inert area.
- contenteditable is an enumerated attribute. The outer editor uses true, the fixed note uses false, and the reply uses plaintext-only.
- The reply area has tabindex="0" because nested editing hosts do not normally join sequential keyboard navigation automatically.
- The editable regions are not input or textarea controls. Their content is not included in form submission automatically.
- The code uses a short script because revealing a completed state and moving focus require an action. The attributes describe the state and editing behavior; the script changes the state after the button is activated.
- Positive tabindex values are not used. Keep keyboard order aligned with the page's natural reading order.

## How to try it

Copy the HTML code block using its copy button and save it as volunteer-review.html. Open it in a browser and activate “Mark review complete”. Notice that the summary appears and receives focus. Press Tab to continue through the page.

Use the browser's find feature to search for “Mulch”. The appendix may be revealed in browsers that support hidden="until-found". Try to click, select, or edit content in the paused preview. Then edit the volunteer note, check that the fixed note stays unchanged, and paste formatted text into the plain-text reply area.

This Markdown file displays the code and does not run it. The editable text is only held in the page and is not saved or submitted.

## Related lesson

[Read lesson 47 - Hidden, inert, tabindex, and editable content](../lessons/47-visibility-and-interaction-attributes.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [46 - Template elements](46-template-element.md) | [Lesson](../lessons/47-visibility-and-interaction-attributes.md) | [Q&A](../qnas/47-visibility-and-interaction-attributes.md) | [48 - Favicons and document icons](48-favicons-and-icons.md) |
