# 111 - Files, blobs, object URLs, clipboard, and downloads: Example

## Question

How can a browser page read a text file chosen by a person, preview an image without uploading it, copy the text on request, and create a downloadable text file?

## Goal

Build a small local file desk. The page reads a selected text file, previews a selected image, copies the text after a button press, and creates a text download from editable content.

The example uses Blob and File methods, object URLs, the Clipboard API, and an anchor download. It does not send files to a server.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses Node.js built-in modules and only serves the page.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3000;
const origin = "http://" + HOST + ":" + PORT;

const server = createServer(async (request, response) => {
  const url = new URL(request.url, origin);

  if (
    request.method !== "GET" ||
    (url.pathname !== "/" && url.pathname !== "/index.html")
  ) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
    return;
  }

  try {
    const page = await readFile(path.join(__dirname, "index.html"));
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(page);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Could not read index.html");
  }
});

server.listen(PORT, HOST, () => {
  console.log("Open " + origin);
});
~~~

## Browser code: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Local file desk</title>
    <style>
      * ,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        color-scheme: light;
        font: 1rem/1.5 system-ui, sans-serif;
      }

      body {
        max-width: 52rem;
        margin: 2rem auto;
        padding: 0 1rem 3rem;
        color: #18212b;
        background: #f5f7fa;
      }

      main {
        display: grid;
        gap: 1.25rem;
      }

      h1 {
        line-height: 1.2;
      }

      section {
        display: grid;
        gap: 0.75rem;
        padding: 1rem;
        border: 1px solid #aab4c0;
        border-radius: 0.5rem;
        background: #fff;
      }

      label {
        font-weight: 700;
      }

      input,
      textarea,
      button,
      a {
        font: inherit;
      }

      textarea {
        width: 100%;
        min-height: 8rem;
        padding: 0.65rem;
      }

      button,
      .download-link {
        width: fit-content;
        padding: 0.5rem 0.75rem;
        border: 1px solid #35465a;
        border-radius: 0.35rem;
        color: #fff;
        background: #26384d;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }

      a {
        color: #0757a6;
      }

      .download-link {
        color: #fff;
      }

      .status {
        min-height: 1.5em;
      }

      pre {
        overflow-wrap: anywhere;
        min-height: 2rem;
        max-height: 18rem;
        overflow: auto;
        padding: 0.75rem;
        border: 1px solid #c3ccd6;
        background: #f8fafc;
        white-space: pre-wrap;
      }

      img {
        display: block;
        max-width: 100%;
        max-height: 24rem;
        object-fit: contain;
      }

      [hidden] {
        display: none !important;
      }

      :focus-visible {
        outline: 3px solid #1769aa;
        outline-offset: 3px;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Local file desk</h1>
        <p>Choose files to preview them in this browser page.</p>
      </header>

      <section aria-labelledby="text-heading">
        <h2 id="text-heading">Read a text file</h2>
        <label for="text-file">Choose a .txt file up to 1 MB</label>
        <input id="text-file" type="file" accept=".txt,text/plain">
        <p id="text-status" class="status" role="status" aria-live="polite">
          No text file selected.
        </p>
        <pre id="text-output" tabindex="0"></pre>
        <button id="copy-text" type="button" disabled>Copy text</button>
      </section>

      <section aria-labelledby="image-heading">
        <h2 id="image-heading">Preview an image</h2>
        <label for="image-file">Choose an image up to 5 MB</label>
        <input id="image-file" type="file" accept="image/*">
        <p id="image-status" class="status" role="status" aria-live="polite">
          No image selected.
        </p>
        <img id="image-preview" alt="Preview of the selected image" hidden>
      </section>

      <section aria-labelledby="download-heading">
        <h2 id="download-heading">Create a text download</h2>
        <label for="download-content">Text to put in the downloaded file</label>
        <textarea id="download-content">A note created in the browser.</textarea>
        <button id="make-download" type="button">Prepare download</button>
        <p id="download-status" class="status" role="status" aria-live="polite">
          No download prepared.
        </p>
        <a id="download-link" class="download-link" hidden>Download note.txt</a>
      </section>
    </main>

    <script>
      "use strict";

      const MAX_TEXT_BYTES = 1_000_000;
      const MAX_IMAGE_BYTES = 5_000_000;

      const textFileInput = document.querySelector("#text-file");
      const textStatus = document.querySelector("#text-status");
      const textOutput = document.querySelector("#text-output");
      const copyButton = document.querySelector("#copy-text");

      const imageFileInput = document.querySelector("#image-file");
      const imageStatus = document.querySelector("#image-status");
      const imagePreview = document.querySelector("#image-preview");

      const downloadContent = document.querySelector("#download-content");
      const makeDownloadButton = document.querySelector("#make-download");
      const downloadStatus = document.querySelector("#download-status");
      const downloadLink = document.querySelector("#download-link");

      let imageObjectUrl;
      let imagePreviewVersion = 0;
      let downloadObjectUrl;

      function clearImagePreview() {
        imagePreviewVersion += 1;
        imagePreview.removeAttribute("src");
        imagePreview.hidden = true;

        if (imageObjectUrl) {
          URL.revokeObjectURL(imageObjectUrl);
          imageObjectUrl = undefined;
        }
      }

      function clearDownload() {
        if (downloadObjectUrl) {
          URL.revokeObjectURL(downloadObjectUrl);
          downloadObjectUrl = undefined;
        }

        downloadLink.removeAttribute("href");
        downloadLink.hidden = true;
      }

      textFileInput.addEventListener("change", async () => {
        const file = textFileInput.files[0];
        textOutput.textContent = "";
        copyButton.disabled = true;

        if (!file) {
          textStatus.textContent = "No text file selected.";
          return;
        }

        if (!file.name.toLowerCase().endsWith(".txt")) {
          textStatus.textContent = "Choose a file whose name ends in .txt.";
          textFileInput.value = "";
          return;
        }

        if (file.size > MAX_TEXT_BYTES) {
          textStatus.textContent = "The text file must be 1 MB or smaller.";
          textFileInput.value = "";
          return;
        }

        textStatus.textContent = "Reading " + file.name + "...";

        try {
          const contents = await file.text();

          if (textFileInput.files[0] !== file) {
            return;
          }

          textOutput.textContent = contents;
          copyButton.disabled = false;
          textStatus.textContent = "Loaded " + file.name + " (" + file.size + " bytes).";
        } catch (error) {
          textStatus.textContent = "The file could not be read.";
          console.error(error);
        }
      });

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(textOutput.textContent);
          textStatus.textContent = "Text copied to the clipboard.";
        } catch (error) {
          textStatus.textContent =
            "Copy was not allowed. Select the text above and copy it manually.";
        }
      });

      imageFileInput.addEventListener("change", () => {
        clearImagePreview();

        const file = imageFileInput.files[0];

        if (!file) {
          imageStatus.textContent = "No image selected.";
          return;
        }

        if (!file.type.startsWith("image/")) {
          imageStatus.textContent = "Choose an image file.";
          imageFileInput.value = "";
          return;
        }

        if (file.size > MAX_IMAGE_BYTES) {
          imageStatus.textContent = "The image must be 5 MB or smaller.";
          imageFileInput.value = "";
          return;
        }

        imageObjectUrl = URL.createObjectURL(file);
        const thisPreviewVersion = imagePreviewVersion;
        imagePreview.src = imageObjectUrl;
        imagePreview.hidden = false;
        imageStatus.textContent =
          "Previewing " + file.name + " (" + file.size + " bytes).";

        imagePreview.onerror = () => {
          if (thisPreviewVersion !== imagePreviewVersion) {
            return;
          }

          clearImagePreview();
          imageStatus.textContent = "The browser could not display this image.";
        };
      });

      makeDownloadButton.addEventListener("click", () => {
        clearDownload();

        const blob = new Blob([downloadContent.value], {
          type: "text/plain;charset=utf-8"
        });

        downloadObjectUrl = URL.createObjectURL(blob);
        downloadLink.href = downloadObjectUrl;
        downloadLink.download = "note.txt";
        downloadLink.hidden = false;
        downloadStatus.textContent =
          "Download ready (" + blob.size + " bytes).";

        downloadLink.onclick = () => {
          const usedObjectUrl = downloadObjectUrl;

          window.setTimeout(() => {
            URL.revokeObjectURL(usedObjectUrl);

            if (downloadObjectUrl === usedObjectUrl) {
              downloadObjectUrl = undefined;
              downloadLink.removeAttribute("href");
              downloadLink.hidden = true;
            }
          }, 1000);
        };
      });

      window.addEventListener("pagehide", () => {
        clearImagePreview();
        clearDownload();
      });
    </script>
  </body>
</html>
~~~

## Run the example

Use a recent Node.js version. In a terminal opened in the folder containing both files, run:

~~~sh
node server.js
~~~

Open **http://127.0.0.1:3000** in a browser. Clipboard access is subject to browser policy. Localhost is treated as a secure context by current browsers, but the person may still need to allow the action.

## Expected result

- The text file section reads a selected .txt file and displays its contents as plain text.
- The Copy text button writes those displayed contents to the clipboard after the person presses it. If the browser denies access, the page suggests manual copying.
- The image section displays a selected image locally. Choosing another image releases the previous object URL.
- The download section creates a text Blob and exposes a link with **note.txt** as the suggested filename.
- After the download link is used, its object URL is released and the link is hidden.
- No selected file is uploaded by this page.

## Explanation

- The file inputs expose File objects only after the person chooses files.
- The text reader uses **File.text()** and assigns the result to **textContent** so the file is displayed as text, not parsed as markup.
- The page checks file size and extension for a useful interface. These are not security checks for a server.
- The image preview uses **URL.createObjectURL()**. **clearImagePreview()** releases the previous URL when the image is changed or the page is left.
- The Copy text button calls **navigator.clipboard.writeText()** from a user action and handles failure.
- The download uses a Blob, an object URL, and the anchor's **download** attribute. The filename is a suggestion controlled by the browser.
- The code does not use **innerHTML** for selected file contents or filenames.

## Upload pattern

This example intentionally has no upload endpoint. If an application later adds a clearly explained upload action, a selected File can be sent with FormData:

~~~js
const data = new FormData();
data.append("document", file, file.name);

const response = await fetch("/uploads", {
  method: "POST",
  body: data
});

if (!response.ok) {
  throw new Error("The upload failed.");
}
~~~

Do not manually set the **Content-Type** header for this request. The browser must add a multipart boundary. A real server also needs its own size limits, file inspection, safe storage names, and safe serving rules.

## Try it yourself

- Choose a small text file and confirm its contents appear in the text output.
- Choose a file larger than 1 MB and observe the validation message.
- Put markup-like text in a .txt file and confirm it appears literally rather than becoming page elements.
- Choose an image, then choose a different image and observe that the preview changes.
- Edit the download text, prepare the download, and open the resulting note.txt file.
- Deny clipboard access and use the manual selection fallback.
- Add a visible upload button only after designing the server endpoint and the user-facing explanation of what will be sent.

## Important limits

The extension and size checks improve the interface. They do not establish that a file is safe. This example does not upload files, inspect clipboard contents, or write to a chosen filesystem location. The browser controls clipboard permission and download behavior.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [110 - IndexedDB and structured client storage](110-indexeddb-and-structured-client-storage.md) | [Open lesson](../lessons/111-files-blobs-object-urls-clipboard-and-downloads.md) | [Open Q&A](../qnas/111-files-blobs-object-urls-clipboard-and-downloads.md) | [112 - Web Workers, shared workers, and message passing](../lessons/112-web-workers-shared-workers-and-message-passing.md) |