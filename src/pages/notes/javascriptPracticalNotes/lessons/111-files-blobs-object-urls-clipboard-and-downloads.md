# 111 - Files, blobs, object URLs, clipboard, and downloads

A browser page can let a person choose a local file, inspect its contents, show a temporary preview, copy text, and create a downloadable file. These tasks use browser APIs, but they still follow normal web security rules: the person chooses what to share, the browser controls access, and a server must validate anything it receives.

## Learning goals

By the end of this chapter, you should be able to:

- Read files selected through a file input.
- Explain the relationship between File and Blob.
- Read text and binary file data with promise-based methods.
- Create and clean up object URLs for previews and downloads.
- Copy text through the Clipboard API and handle failure.
- Build a download from a Blob.
- Upload selected files with FormData.
- Apply basic privacy, security, and resource-cleanup practices.

## 1. Let the person choose a file

A page cannot freely browse a person's disk. Use a file input to let the person choose files:

~~~html
<label for="document">Choose a text file</label>
<input id="document" type="file" accept=".txt,text/plain">
~~~

The input's **files** property is a **FileList**. It contains zero or more **File** objects. A single-file input normally has one item after selection:

~~~js
const input = document.querySelector("#document");

input.addEventListener("change", () => {
    const file = input.files[0];

    if (!file) {
        return;
    }

    console.log(file.name);
    console.log(file.type);
    console.log(file.size);
    console.log(file.lastModified);
});
~~~

The **accept** attribute is a hint to the file picker. It helps people find suitable files, but it does not validate a file. A page must still check the selected data, and a server must validate uploaded data independently.

A file input with the **multiple** attribute permits choosing more than one file:

~~~html
<input id="documents" type="file" multiple>
~~~

Loop through its files with a normal array conversion:

~~~js
const files = Array.from(document.querySelector("#documents").files);

for (const file of files) {
    console.log(file.name, file.size);
}
~~~

A file's name and declared media type are data supplied by the file or operating system. Do not treat either as proof that the file is safe or has the claimed contents.

## 2. File and Blob

A **Blob** represents immutable raw data. It has a size and a media type. A **File** is a kind of Blob with additional file metadata, such as a name and last-modified time.

You can use Blob methods to read data:

- **text()** reads the Blob as a UTF-8 string.
- **arrayBuffer()** reads its bytes into an ArrayBuffer.
- **slice()** returns a new Blob containing a selected byte range.

For a selected text file:

~~~js
const file = input.files[0];

if (file) {
    const text = await file.text();
    console.log(text);
}
~~~

For binary data:

~~~js
const file = input.files[0];

if (file) {
    const bytes = await file.arrayBuffer();
    console.log(bytes.byteLength);
}
~~~

These methods return promises. Handle errors when the read is part of an interface:

~~~js
try {
    const text = await file.text();
    showText(text);
} catch (error) {
    showMessage("The file could not be read.");
    console.error(error);
}
~~~

Older code may use **FileReader**, which reports progress and completion through events. For straightforward text and byte reads, **text()** and **arrayBuffer()** are usually simpler. Use FileReader when its event-based progress or data URL behavior is specifically useful.

## 3. Validate what the page accepts

Validate basic limits before reading or processing a file. For example, a text editor can reject an empty selection, an oversized file, or an unexpected extension:

~~~js
function isAllowedTextFile(file) {
    const maximumBytes = 1_000_000;
    const hasTextExtension = file.name.toLowerCase().endsWith(".txt");

    return file.size <= maximumBytes && hasTextExtension;
}
~~~

This is a user-interface check, not a security boundary. File extensions and **file.type** can be missing or misleading. If a file is uploaded, the server must enforce its own size limits, inspect the contents where appropriate, generate safe storage names, and avoid serving untrusted files as executable content.

## 4. Preview a file with an object URL

An object URL is a temporary browser-managed reference to a Blob or File. It can be used as the **src** of an image or media element:

~~~js
const image = document.querySelector("#preview");
const file = document.querySelector("#photo").files[0];

if (file) {
    const objectUrl = URL.createObjectURL(file);
    image.src = objectUrl;
}
~~~

Object URLs are useful when a page needs to preview a local file without encoding the entire file into a long data URL. They are not permanent links and do not upload the file.

Every object URL should eventually be released with **URL.revokeObjectURL()**. Keep the URL while the preview is in use, then revoke it when replacing or removing that preview:

~~~js
let currentPreviewUrl;

function showPreview(file, image) {
    if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
    }

    currentPreviewUrl = URL.createObjectURL(file);
    image.src = currentPreviewUrl;
}

function clearPreview(image) {
    image.removeAttribute("src");

    if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
        currentPreviewUrl = undefined;
    }
}
~~~

Do not revoke the URL immediately after setting **src** if the image still needs to load. Releasing it too early can prevent the resource from being used. Revoke it when the preview is replaced or no longer needed.

For text, you do not need an object URL just to display the file. Read it with **file.text()**, then put the result in **textContent**:

~~~js
const text = await file.text();
document.querySelector("#output").textContent = text;
~~~

Using **textContent** treats the file as text. Avoid placing untrusted file contents into **innerHTML**, which would ask the browser to parse those contents as markup.

## 5. Copy text with the Clipboard API

The asynchronous Clipboard API exposes methods such as **navigator.clipboard.writeText()**. A browser may require a secure context, user permission, and a recent user action. Call it in response to a clear user action, such as a button click, and handle rejection:

~~~js
copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(output.textContent);
        showMessage("Copied.");
    } catch (error) {
        showMessage("Copy was not allowed. Select the text and copy it manually.");
    }
});
~~~

Do not assume clipboard access will always succeed. Browser settings, permissions, document focus, and the browsing context can affect the operation. Provide a useful manual fallback.

Clipboard data can contain private information. Read from the clipboard only when the person clearly asks for that action, and explain why the page needs it. Copy only the content the person requested.

## 6. Create a downloadable file

Create a Blob from generated text, create an object URL, and provide a download link:

~~~js
const contents = "A note created in the browser.";
const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
const objectUrl = URL.createObjectURL(blob);

downloadLink.href = objectUrl;
downloadLink.download = "note.txt";
downloadLink.hidden = false;
~~~

The **download** attribute supplies a suggested filename. The browser may adjust the name or behavior based on its settings and the resource's origin or response headers.

After the person has used the download link, clean up the object URL when it is no longer needed:

~~~js
downloadLink.addEventListener("click", () => {
    setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href);
        downloadLink.removeAttribute("href");
        downloadLink.hidden = true;
    }, 0);
});
~~~

A download begins under browser control. The page should not imply that it can silently choose an arbitrary location or bypass the person's download settings.

## 7. Upload a file with FormData

When sending a chosen file to a server, **FormData** can represent a form submission:

~~~js
const formData = new FormData();
formData.append("document", file, file.name);

const response = await fetch("/uploads", {
    method: "POST",
    body: formData
});

if (!response.ok) {
    throw new Error("The upload failed.");
}
~~~

When using **FormData** as the request body, do not manually set the **Content-Type** header to **multipart/form-data**. The browser adds the required boundary parameter.

A selected file stays on the person's device until page code reads it or sends it somewhere. Make uploads clear and intentional. The server must enforce file size and content rules; client-side checks alone can be bypassed.

## 8. Common mistakes

- Treating **accept** as security validation.
- Trusting a file's name or **type** without checking.
- Using **innerHTML** to display untrusted file contents or names.
- Creating a new object URL every time without revoking the previous one.
- Revoking an image URL before the preview has finished loading.
- Assuming clipboard writes always succeed.
- Reading clipboard contents without a clear reason and user action.
- Setting **Content-Type** manually for a **FormData** upload.
- Sending files to a server without explaining the upload or validating them on the server.
- Assuming a browser download always uses the exact requested filename or location.

## Key points

- A file input gives the page access to files the person selected.
- A **File** is a **Blob** with file metadata.
- Use **text()** or **arrayBuffer()** to read data, according to its format.
- Object URLs can preview Blobs and Files. Revoke them when they are no longer needed.
- Use **textContent** for displaying untrusted text.
- Clipboard operations can fail and should have a manual fallback.
- A Blob and an anchor's **download** attribute can create a browser-managed download.
- **FormData** is a convenient request body for uploads, but the server still has to validate the data.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [110 - IndexedDB and structured client storage](110-indexeddb-and-structured-client-storage.md) | [Open Q&A](../qnas/111-files-blobs-object-urls-clipboard-and-downloads.md) | [Open example](../examples/111-files-blobs-object-urls-clipboard-and-downloads.md) | [112 - Web Workers, shared workers, and message passing](112-web-workers-shared-workers-and-message-passing.md) |