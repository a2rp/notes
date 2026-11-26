# Example 44 - Dialog elements

## Question

Create a workshop information page with a modal dialog that opens and closes using HTML controls. Give the dialog a clear accessible name, place keyboard focus sensibly, and make it clear why a dialog with the open attribute alone is not modal.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Workshop information - City Garden</title>
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
      <h1>Garden workshops</h1>
      <p>
        Join a practical session and learn how to grow herbs and vegetables.
      </p>

      <section aria-labelledby="sessions-heading">
        <h2 id="sessions-heading">Upcoming sessions</h2>
        <ul>
          <li>Saturday, 10 a.m. - Introduction to herbs</li>
          <li>Sunday, 1 p.m. - Starting a vegetable patch</li>
        </ul>

        <button
          type="button"
          commandfor="workshop-dialog"
          command="show-modal">
          Read workshop information
        </button>
      </section>
    </main>

    <dialog id="workshop-dialog" aria-labelledby="dialog-title">
      <h2 id="dialog-title">Before you attend</h2>
      <p>
        Meet at the welcome desk 10 minutes before your session. We provide
        gardening tools. Wear comfortable clothes that can get muddy.
      </p>
      <p>
        If you have an access question, contact the workshop team before
        booking.
      </p>

      <form method="dialog">
        <button type="submit" value="acknowledged" autofocus>
          Got it
        </button>
      </form>
    </dialog>

    <footer>
      <p>City Garden workshops</p>
    </footer>
  </body>
</html>
~~~

## Expected output

The page shows its workshop information and a button labelled “Read workshop information”. Activating the button opens a modal dialog with the heading “Before you attend”. The rest of the page cannot be interacted with until the dialog is dismissed.

Focus moves to the “Got it” button. Activating it closes the dialog without submitting information to a server. The browser returns focus to the button that opened the dialog. A modal dialog can also be dismissed with the browser's close request, such as the Escape key.

## Explanation

- The button's commandfor value matches the id of the dialog. Its show-modal command asks the browser to open that dialog modally without JavaScript.
- The dialog has a visible heading. aria-labelledby connects the dialog's accessible name to that heading. The id in the reference matches the heading's id.
- A modal dialog makes the rest of the document inert while it is open. The browser moves focus into the dialog and normally returns it to the opening button when the dialog closes.
- The autofocus attribute places initial focus on the acknowledgement button. Focus should start somewhere that makes sense for the task.
- The form uses method="dialog". Activating its submit button closes the containing dialog. This does not send the form data to a server.
- The dialog does not use a redundant dialog role or modal ARIA attribute. The native dialog element and modal opening behavior provide those semantics.
- This example uses the declarative command and commandfor attributes. They are supported in current modern browsers, but older browser targets may need a JavaScript fallback using showModal() and close().
- The open attribute only makes a dialog visible in a non-modal state. It does not block interaction with the page or create the modal behavior of the show-modal command.

### A visible dialog is not necessarily modal

This separate fragment starts visible because it has the open attribute. The rest of the page remains interactive because it was not opened as a modal:

~~~html
<dialog open aria-labelledby="hours-title">
  <h2 id="hours-title">Today's garden hours</h2>
  <p>The garden is open from 9 a.m. to 5 p.m.</p>
</dialog>
~~~

Use this only when a visible non-modal dialog is the right pattern. For ordinary page information, a heading and section are usually more appropriate.

## How to try it

Copy the HTML code block using its copy button and save it as garden-workshop-information.html. Open it in a current browser. Activate the information button, use the keyboard to reach the content, and close the dialog. Check that focus returns to the opening button.

Try replacing the method="dialog" form with a button that has commandfor="workshop-dialog" and command="close". That is another declarative way to close the dialog. Then try adding open to the dialog in the original page. It will appear without being modal, so the rest of the page remains interactive.

The command and commandfor attributes may not work in older browsers. If you need to support an older browser, use JavaScript dialog methods such as showModal() and close(). The links in this example are illustrative paths. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 44 - Dialog elements](../lessons/44-dialog-element.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [43 - Details and summary](43-details-and-summary.md) | [Lesson](../lessons/44-dialog-element.md) | [Q&A](../qnas/44-dialog-element.md) | [45 - Popover attributes](45-popover-attributes.md) |
