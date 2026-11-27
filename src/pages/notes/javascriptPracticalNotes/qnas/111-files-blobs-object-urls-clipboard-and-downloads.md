# 111 - Files, blobs, object URLs, clipboard, and downloads - Q&A

This chapter practices reading files selected by a person, working with Blob data, managing object URLs, copying text, and creating downloads.

## Multiple-choice questions

### 1. What does a file input's files property contain after a person selects files?

A. A string containing the file paths
B. A FileList containing File objects
C. A Blob URL
D. The file contents as HTML

**Answer: B. A FileList containing File objects.**

**Explanation:** Each selected File provides data and metadata such as its name, size, media type, and last-modified time. A browser does not give a page unrestricted access to the person's disk.

### 2. Which statement describes the relationship between File and Blob?

A. A Blob is a kind of File with a filename.
B. File extends Blob with file-related metadata.
C. They are unrelated types.
D. A File can only contain text.

**Answer: B. File extends Blob with file-related metadata.**

**Explanation:** Both represent immutable data. A File also includes properties such as name and lastModified.

### 3. What does the accept attribute on a file input do?

A. It guarantees the chosen file is safe.
B. It hints which files the picker should show.
C. It uploads the file automatically.
D. It prevents a person from selecting another file type.

**Answer: B. It hints which files the picker should show.**

**Explanation:** The selected file still needs appropriate checks. A server must independently validate any uploaded file because client-side checks can be bypassed.

### 4. Which method reads a Blob as a string?

A. file.text()
B. file.json()
C. file.html()
D. file.read()

**Answer: A. file.text().**

**Explanation:** The method returns a Promise that resolves to text decoded as UTF-8. Use arrayBuffer() when the code needs the raw bytes.

### 5. What is an object URL useful for?

A. Permanently storing a file on the server
B. Giving a Blob or File a temporary browser-managed URL, for example for a preview
C. Granting permission to browse a disk
D. Replacing a server-side upload endpoint

**Answer: B. Giving a Blob or File a temporary browser-managed URL, for example for a preview.**

**Explanation:** Create one with URL.createObjectURL() and release it with URL.revokeObjectURL() when it is no longer needed.

### 6. When should a page revoke an object URL used by an image preview?

A. Immediately after assigning it to the image's src
B. When that preview is replaced or removed
C. Before the image has a chance to load
D. Never

**Answer: B. When that preview is replaced or removed.**

**Explanation:** Revoking too early can prevent the image from loading. Keeping every old URL indefinitely can retain resources unnecessarily.

### 7. Which is the safer way to display text read from a user-selected file?

A. Put it directly into innerHTML.
B. Put it into textContent.
C. Use eval() on the text.
D. Add it as a script element.

**Answer: B. Put it into textContent.**

**Explanation:** textContent displays the value as text. innerHTML parses the value as markup, which is unsafe for untrusted contents.

### 8. Which requirement may apply when writing to the clipboard with navigator.clipboard.writeText()?

A. The page must be opened from a local file path.
B. The browser may require a secure context, permission, or a recent user action.
C. The page must have read every clipboard item first.
D. The clipboard write always succeeds if the API exists.

**Answer: B. The browser may require a secure context, permission, or a recent user action.**

**Explanation:** Clipboard access can be denied by browser policy, focus, permission, or context. Handle failure and provide a manual copy fallback.

### 9. What does the download attribute on a link provide?

A. A guaranteed filesystem path
B. A suggested filename for a download
C. A guarantee that the user will save the file
D. Permission to upload a file

**Answer: B. A suggested filename for a download.**

**Explanation:** The browser controls the actual download behavior and may adjust the filename or behavior according to its settings and the resource.

### 10. When using FormData as a fetch request body, what should the code do about Content-Type?

A. Always set it to multipart/form-data manually.
B. Set it to application/json.
C. Let the browser set it, including the multipart boundary.
D. Remove the request body.

**Answer: C. Let the browser set it, including the multipart boundary.**

**Explanation:** Setting the header manually can omit the boundary the server needs to parse the form data.

## True or false

### 11. The file type reported by file.type proves that the file's contents are safe.

**Answer: False.**

**Explanation:** The reported type can be empty or inaccurate. Validate on the server too, and do not rely only on filenames, extensions, or client-side checks.

### 12. Creating an object URL uploads the file.

**Answer: False.**

**Explanation:** An object URL gives the page a temporary local reference to the Blob or File. Uploading requires sending data to a server, for example in a fetch request.

### 13. A page should handle rejection from navigator.clipboard.writeText().

**Answer: True.**

**Explanation:** Permission, focus, secure-context, and browser policy requirements can prevent the operation. The interface should explain what happened and offer a manual fallback.

### 14. Client-side file-size checks replace server-side upload limits.

**Answer: False.**

**Explanation:** A user can bypass client-side code. The server must enforce its own size, content, and storage rules.

## Short-answer questions

### 15. What are two pieces of metadata a File adds beyond its byte data?

**Answer:** A File includes a name and a last-modified time.

**Explanation:** It also inherits Blob properties such as size and type. These metadata values are useful for an interface but are not proof that the contents are safe.

### 16. When would you use arrayBuffer() instead of text()?

**Answer:** Use arrayBuffer() when code needs the bytes, such as when processing binary formats. Use text() when the file should be decoded into text.

**Explanation:** Choosing the method that matches the data avoids treating arbitrary bytes as readable text.

### 17. Why should an application explain a file upload and make it intentional?

**Answer:** Uploading sends selected local data to a server. The person should understand what is sent and why.

**Explanation:** Clear consent and a visible action help protect privacy. The server still has to validate and safely handle the received file.

### 18. What is a manual clipboard fallback?

**Answer:** Show the text in a selectable field or output area and tell the person they can select and copy it themselves.

**Explanation:** This gives the person a usable option when the browser denies clipboard access.

## Code questions

### 19. What does this code print if a person selects a 3,000-byte file?

~~~js
const file = input.files[0];
console.log(file.size);
~~~

**Answer: 3000.**

**Explanation:** File.size is the file's size in bytes. It does not print the file's contents.

### 20. What is unsafe about this code, and how should it be changed?

~~~js
const text = await file.text();
output.innerHTML = text;
~~~

**Answer:** It parses the file contents as HTML. Use output.textContent = text instead.

**Explanation:** A selected file can contain untrusted markup or script-like content. textContent displays the value literally rather than interpreting it as markup.

### 21. Complete the missing method so the previous preview URL is released.

~~~js
if (previewUrl) {
    URL.__________(previewUrl);
}
~~~

**Answer: revokeObjectURL**

~~~js
if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
}
~~~

**Explanation:** An object URL should be revoked when the page no longer needs it, such as when replacing a preview. Do not release it before a resource still using it has loaded.

### 22. Why can this upload request be difficult for the server to parse?

~~~js
const data = new FormData();
data.append("document", file);

fetch("/uploads", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data
});
~~~

**Answer:** The code manually sets Content-Type and can omit the boundary parameter. Remove the Content-Type header and let the browser set it.

**Explanation:** The browser constructs the multipart body and its matching boundary. The server uses that boundary to separate form fields and file data.

### 23. Write the essential code to read a chosen text file and show it as text in a page.

**Answer:**

~~~js
const file = input.files[0];

if (file) {
    const contents = await file.text();
    output.textContent = contents;
}
~~~

**Explanation:** The file input supplies a File. text() returns a Promise, and textContent safely displays the result as text.

### 24. What important cleanup is missing?

~~~js
const url = URL.createObjectURL(file);
image.src = url;
~~~

**Answer:** The code should remember the URL and call URL.revokeObjectURL(url) when the preview is replaced or removed.

**Explanation:** Creating another preview should release the previous URL. Do not revoke this URL before the image has loaded.

### 25. What does this code ask the browser to do?

~~~js
const blob = new Blob(["Hello"], { type: "text/plain" });
const url = URL.createObjectURL(blob);
link.href = url;
link.download = "hello.txt";
~~~

**Answer:** It prepares a link that can download a text file containing Hello, with hello.txt as the suggested filename.

**Explanation:** The browser controls the actual download flow. The page should revoke the object URL after it is no longer needed.

## Practical and design questions

### 26. A user chooses a very large image. Name two checks or design choices that can help.

**Answer:** Check the file size before processing it, and give a clear message if it exceeds the page's limit. The page can also avoid creating multiple previews and release old object URLs.

**Explanation:** A client-side size check improves the experience but does not replace server-side limits if the image is uploaded.

### 27. A clipboard copy button sometimes fails. How should the interface respond?

**Answer:** Catch the error, show a clear message, and leave the text available for manual selection and copying.

**Explanation:** Clipboard access is controlled by browser policies and permissions, so code should not assume success.

### 28. A filename contains markup-like characters. How should the page show it?

**Answer:** Insert it as text, for example with textContent, rather than using innerHTML.

**Explanation:** A filename is still untrusted input. Treat it as data and let the browser display the characters literally.

### 29. A file passes the page's extension and size checks. Is it safe for the server to store and serve?

**Answer: No.**

**Explanation:** Client-side checks can be bypassed, and an extension does not prove the file's format. The server needs independent content validation, size limits, safe generated storage names, and a safe serving policy.

### 30. Why should a page avoid reading clipboard contents unless the user requests it?

**Answer:** The clipboard can contain private information copied from other applications.

**Explanation:** Clipboard reads should have a clear user purpose, a visible action, and a suitable explanation. A page should not inspect clipboard data without a reason.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [110 - IndexedDB and structured client storage](110-indexeddb-and-structured-client-storage.md) | [Open lesson](../lessons/111-files-blobs-object-urls-clipboard-and-downloads.md) | [Open example](../examples/111-files-blobs-object-urls-clipboard-and-downloads.md) | [112 - Web Workers, shared workers, and message passing](../lessons/112-web-workers-shared-workers-and-message-passing.md) |
