# Example 35 - Form submission: name, method, action, and enctype

## Question

Build a garden journal page with a shareable search, a form for publishing an observation, and a separate form for uploading a garden photo. Show how named controls become submitted data and how the form settings affect each request.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Journal</title>
  </head>
  <body>
    <main>
      <h1>Garden Journal</h1>

      <section aria-labelledby="search-heading">
        <h2 id="search-heading">Search journal entries</h2>
        <form action="/journal/search" method="get">
          <p>
            <label for="search-query">Search words</label>
            <input
              id="search-query"
              name="q"
              type="search"
              value="raised beds">
          </p>
          <button type="submit">Search</button>
        </form>
      </section>

      <section aria-labelledby="observation-heading">
        <h2 id="observation-heading">Share a garden observation</h2>
        <form
          action="/journal/observations"
          method="post"
          enctype="application/x-www-form-urlencoded">
          <p>
            <label for="author-name">Your name</label>
            <input
              id="author-name"
              name="author"
              autocomplete="name"
              required>
          </p>

          <p>
            <label for="observation-title">Entry title</label>
            <input
              id="observation-title"
              name="title"
              required>
          </p>

          <p>
            <label for="observation-text">What did you notice?</label>
            <textarea
              id="observation-text"
              name="body"
              rows="5"
              cols="45"
              required></textarea>
          </p>

          <p>
            <label>
              <input
                name="notify"
                type="checkbox"
                value="yes">
              Email me when someone comments
            </label>
          </p>

          <button
            type="submit"
            name="action"
            value="publish">
            Publish observation
          </button>

          <button
            type="submit"
            name="action"
            value="draft"
            formaction="/journal/observations/draft">
            Save draft
          </button>
        </form>
      </section>

      <section aria-labelledby="photo-heading">
        <h2 id="photo-heading">Upload a garden photo</h2>
        <form
          action="/journal/photos"
          method="post"
          enctype="multipart/form-data">
          <p>
            <label for="photo-caption">Photo caption</label>
            <input
              id="photo-caption"
              name="caption"
              required>
          </p>

          <p>
            <label for="garden-photo">Choose an image</label>
            <input
              id="garden-photo"
              name="photo"
              type="file"
              accept="image/png, image/jpeg"
              required>
            <small>Choose a PNG or JPEG image.</small>
          </p>

          <button type="submit">Upload photo</button>
        </form>
      </section>
    </main>
  </body>
</html>
~~~

## Expected output

The page shows three sections: a journal search form, an observation form, and a photo upload form.

Submitting the search sends the named query to the search address using GET. With the example search text, the URL will contain a query similar to /journal/search?q=raised+beds.

Publishing an observation sends its named values in a POST request to /journal/observations. Saving a draft sends the same form values to /journal/observations/draft instead. If the checkbox is checked, its value is included as notify=yes. If it is unchecked, it is omitted.

The photo form sends the caption and selected file in a POST request encoded as multipart/form-data. The file picker may use the accept hint to make PNG and JPEG files easier to choose.

These example addresses need server-side handlers. The HTML page alone does not save searches, observations, or photos.

## Explanation

- The search form uses method="get". Its search control has name="q", so the current value is added to the destination URL as a query parameter. GET is useful for searches because the resulting URL can be shared or bookmarked. Do not put private values in a GET URL.
- The observation form uses method="post" to send its values in the request body. Its enctype is application/x-www-form-urlencoded, the default encoding for ordinary form values.
- Each observation control has a name. The name and current value form the submitted data. The id connects a label to its control; it is not the submitted field name.
- Each submit button has a name and value. The button the user activates contributes its own pair, such as action=publish or action=draft.
- The Save draft button uses formaction to send that submission to a different destination. It inherits the form's POST method and encoding.
- The checked notification box submits notify=yes. An unchecked checkbox contributes no value.
- The photo form uses POST and multipart/form-data, which supports sending file contents along with other form values.
- The photo input has a name, so it can be included in the submitted data. Its accept value is a picker hint, not a security check. The server must verify the uploaded file's type, contents, and size.
- POST does not encrypt data in transit. Use HTTPS and validate submitted values on the server.
- The action paths identify destinations. A server must implement those paths and process the submitted data.

## How to try it

Copy the HTML code block using its copy button and save it as garden-journal.html. Open the file in a browser and inspect the three forms. Try changing the search text, checking or unchecking the notification box, and choosing a photo.

The example paths have no server handlers in this file, so the forms cannot store data or return search results. This Markdown file displays the HTML as text and does not run it.

## Related lesson

[Read lesson 35 - Form submission: name, method, action, and enctype](../lessons/35-form-submission.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [34 - Built-in form validation](34-form-validation.md) | [Lesson](../lessons/35-form-submission.md) | [Q&A](../qnas/35-form-submission.md) | [36 - Autocomplete and autofill](36-autocomplete-and-autofill.md) |
