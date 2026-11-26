# Example 33 - Buttons and form actions

## Question

Create a garden journal page with a GET search form and a story editor. Let the editor publish or save a draft to different destinations, restore its initial values, and show a button with no built-in action.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Journal Stories</title>
  </head>
  <body>
    <main>
      <h1>Garden Journal</h1>

      <section aria-labelledby="search-heading">
        <h2 id="search-heading">Search stories</h2>
        <form action="/stories/search" method="get">
          <p>
            <label for="story-query">Search terms</label>
            <input
              id="story-query"
              name="q"
              type="search">
          </p>
          <button type="submit">Search stories</button>
        </form>
      </section>

      <section aria-labelledby="editor-heading">
        <h2 id="editor-heading">Write a story</h2>
        <form action="/stories/publish" method="post">
          <p>
            <label for="story-title">Story title</label>
            <input
              id="story-title"
              name="title"
              value="Garden notes"
              required>
          </p>

          <p>
            <label for="story-body">Story text</label>
            <textarea
              id="story-body"
              name="body"
              rows="6"
              cols="50"
              required>The seedlings are growing well.</textarea>
          </p>

          <button
            type="submit"
            name="action"
            value="publish">
            Publish story
          </button>

          <button
            type="submit"
            name="action"
            value="draft"
            formaction="/stories/draft"
            formmethod="post">
            Save draft
          </button>

          <button type="reset">Restore starter text</button>

          <button type="button">Custom action with no behavior yet</button>
        </form>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page displays a search form and a story editor with a title field, a text area, and four buttons.

Searching for a phrase submits a GET request to /stories/search with the named query in the URL. Publish story submits the editor to /stories/publish. Save draft overrides the form destination and submits to /stories/draft. Both editor submissions use POST and include the activated button's action value.

Restore starter text returns the editor fields to their initial values. The final button does nothing by default because it has type="button" and no script is connected to it.

## Explanation

- The search form uses action to identify its destination and method="get" to put the named query in the URL.
- The story editor uses method="post". Its title and body controls have name attributes so their values are included in a normal submission.
- The Publish story button submits to the form's action. Its name and value add action=publish to the submitted data.
- The Save draft button uses formaction and formmethod to override the form settings for that button. Its name and value add action=draft.
- The reset button restores the title and story text to their original values from the HTML. It does not send the form.
- The type="button" control has no built-in form behavior. JavaScript could add a custom action, but none is provided here.
- Each button states its type explicitly so its behavior is clear.
- The example destinations need server-side handlers. POST sends values in the request body, but does not encrypt them. Use HTTPS to protect data in transit.

## How to try it

Copy the HTML code block using its copy button and save it as garden-journal.html. Open it in a browser, change the title and story, then try Restore starter text. The two submit buttons require their example server routes to process submissions.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 33 - Buttons and form actions](../lessons/33-buttons-and-form-actions.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [32 - Textarea, select, option, and datalist](32-textarea-select-and-datalist.md) | [Lesson](../lessons/33-buttons-and-form-actions.md) | [Q&A](../qnas/33-buttons-and-form-actions.md) | [34 - Built-in form validation](34-form-validation.md) |
