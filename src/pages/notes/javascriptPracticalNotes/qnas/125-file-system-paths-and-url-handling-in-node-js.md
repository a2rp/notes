# 125 - File system, paths, and URL handling in Node.js: Q&A

Review filesystem operations, path resolution, file URLs, and safe handling of user-selected paths. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. Which module provides promise-based file operations?

- A. node:fs/promises
- B. node:path/promises
- C. node:url/promises
- D. node:process/promises

**Answer: A.**

**Explanation:** node:fs/promises exposes asynchronous filesystem functions that return Promises.

### 2. What does a relative filesystem path usually use as its starting directory?

- A. The process current working directory
- B. The directory of every imported module
- C. The Node.js installation directory
- D. The user's home directory in every case

**Answer: A.**

**Explanation:** Relative paths normally depend on process.cwd() unless the application constructs a different absolute path or file URL.

### 3. How can an ES module read a file located beside that module?

- A. Pass new URL("./file.txt", import.meta.url) to a compatible filesystem API
- B. Assume process.cwd() is the module directory
- C. Use document.location
- D. Use path.basename() as the full path

**Answer: A.**

**Explanation:** The URL is tied to the importing module's location, so it does not depend on the caller's working directory.

### 4. Which API should be used to join platform-specific filesystem path segments?

- A. node:path
- B. node:events
- C. node:crypto
- D. node:stream

**Answer: A.**

**Explanation:** node:path provides path joining, resolution, inspection, and platform-specific behavior.

### 5. What is the main difference between path.join() and path.resolve()?

- A. join combines and normalizes segments; resolve returns an absolute path
- B. join returns a URL; resolve returns a Buffer
- C. join only works on Windows; resolve only works on Linux
- D. They are interchangeable in every case

**Answer: A.**

**Explanation:** resolve() uses an absolute path as its result and falls back to the current working directory when needed.

### 6. What does the default node:path implementation use for separators?

- A. The platform on which Node.js is running
- B. Always forward slashes
- C. Always backslashes
- D. The separator in package.json

**Answer: A.**

**Explanation:** On Windows the default follows Windows paths; on POSIX systems it follows POSIX paths. Use path.win32 or path.posix when parsing a specific syntax independent of the current platform.

### 7. Which API correctly converts a file URL to a platform filesystem path?

- A. fileURLToPath()
- B. URL.pathname
- C. path.basename()
- D. JSON.parse()

**Answer: A.**

**Explanation:** fileURLToPath() handles percent encoding and platform-specific forms such as Windows drive paths.

### 8. Which API correctly converts a filesystem path to a file URL?

- A. pathToFileURL()
- B. new URL(path)
- C. path.resolveURL()
- D. filePath.pathname

**Answer: A.**

**Explanation:** pathToFileURL() encodes special characters and creates an absolute file URL.

### 9. Why should code not use URL.pathname as a general filesystem path?

- A. It may remain percent-encoded and does not fully map platform-specific paths
- B. It always returns a Buffer
- C. It removes every file extension
- D. It cannot be used with URLs

**Answer: A.**

**Explanation:** Use fileURLToPath() to convert a file URL correctly for the current platform.

### 10. What does readFile(path, "utf8") return on success?

- A. A string
- B. A FileHandle
- C. A URL
- D. A directory entry

**Answer: A.**

**Explanation:** Providing an encoding asks Node.js to decode the bytes to a string. Without an encoding, readFile() returns a Buffer.

### 11. What does readFile(path) return if no encoding is provided?

- A. A Buffer
- B. A string in every case
- C. A Promise of a URL
- D. A file descriptor number

**Answer: A.**

**Explanation:** The Buffer contains the file's bytes and can be decoded later if appropriate.

### 12. Why is fs.access() not recommended as a precheck before reading a file?

- A. The file can change between the access check and the read
- B. fs.access() permanently locks the file
- C. fs.access() changes the file encoding
- D. The method cannot report errors

**Answer: A.**

**Explanation:** Attempt the intended operation and handle its error instead of relying on a separate check that may become stale.

### 13. How should code usually identify a missing-file error?

- A. Check error.code for ENOENT
- B. Compare the entire error message string
- C. Check whether process.cwd() is empty
- D. Inspect the file extension

**Answer: A.**

**Explanation:** Error codes are more stable for program logic than platform-specific human-readable messages.

### 14. What should code do with a FileHandle when it is finished?

- A. Close it explicitly, including on error paths
- B. Wait for garbage collection
- C. Convert it to a URL
- D. Store it in process.argv

**Answer: A.**

**Explanation:** File handles represent operating-system resources. Use try/finally or another reliable cleanup pattern to close them.

### 15. Which option is generally more suitable for processing a very large file incrementally?

- A. A stream
- B. readFile() with no encoding
- C. path.basename()
- D. process.env

**Answer: A.**

**Explanation:** A stream can process chunks without loading the entire file into memory at once.

### 16. Does path normalization alone make an untrusted path safe from symlink attacks?

- A. No
- B. Yes, always
- C. Only on Windows
- D. Only when the path contains an extension

**Answer: A.**

**Explanation:** Lexical path checks do not resolve all symlink, race, permission, and filesystem concerns. Treat untrusted filesystem access as a security design problem.

### 17. What does writeFile() do by default when the destination file already exists?

- A. It replaces the file contents
- B. It always fails
- C. It appends in every case
- D. It silently skips the write

**Answer: A.**

**Explanation:** Use an appropriate flag such as "wx" when the intended behavior is to create only if the file does not already exist.

## Short-answer questions

### 18. What is the difference between process.cwd() and import.meta.url?

**Answer:** process.cwd() represents the process's current working directory. import.meta.url identifies the current ES module as a URL.

**Explanation:** Use cwd-based resolution for inputs that are intentionally relative to the caller. Use the module URL for resources that belong next to the module.

### 19. Why is hard-coding a slash or backslash fragile when constructing paths?

**Answer:** Path separators and path syntax vary by operating system.

**Explanation:** Use node:path for filesystem paths, or use URL construction for module-relative URLs.

### 20. What is the difference between path.win32 and the default path methods?

**Answer:** The default path methods follow the current operating system. path.win32 applies Windows path rules on any platform.

**Explanation:** Use path.win32 or path.posix when parsing a known path format independent of where the program is running.

### 21. Why should code use fileURLToPath() instead of decoding a URL pathname manually?

**Answer:** fileURLToPath() handles percent encoding and platform-specific file URL rules, including drive paths.

**Explanation:** Manual string conversion can produce an invalid or incorrect filesystem path.

### 22. What is the benefit of using new URL("./file", import.meta.url) for module resources?

**Answer:** It locates the file relative to the module, independent of the directory from which the process was launched.

**Explanation:** It is especially useful for bundled resources such as templates and default configuration files.

### 23. What does the error code ENOENT usually mean?

**Answer:** The requested file or directory does not exist at the path used.

**Explanation:** Handle this case if the application has a meaningful fallback. Re-throw errors that it cannot safely recover from.

### 24. Why must a FileHandle be closed in a finally block?

**Answer:** The finally block runs after success or failure, making it a reliable place to release the file resource.

**Explanation:** Relying on automatic cleanup can hold descriptors open longer than intended.

### 25. Why might reading a file asynchronously still result in a memory problem?

**Answer:** readFile() returns the entire file contents in memory after the read completes.

**Explanation:** Asynchronous I/O avoids blocking the JavaScript thread during the filesystem operation, but it does not reduce the size of the resulting Buffer or string.

### 26. What does an exclusive write flag such as "wx" request?

**Answer:** Create the file for writing only if it does not already exist.

**Explanation:** If the path already exists, the operation fails instead of replacing it.

## Scenarios

### 27. A program reads ./config.json successfully when launched from the project folder but fails when launched from another folder. Why?

**Answer:** The relative path is based on process.cwd(), which changed when the caller launched the program elsewhere.

**Explanation:** Resolve the config path from the module URL if the file is a resource that belongs beside the module.

### 28. A developer converts file:///C:/docs/a%20b.txt by reading URL.pathname and gets an unexpected path. What should be used?

**Answer:** Use fileURLToPath() from node:url.

**Explanation:** URL.pathname is a URL component, not a general platform filesystem path.

### 29. A service checks fs.access() and then calls readFile(). The file is sometimes removed between the calls. What should change?

**Answer:** Remove the precheck and call readFile() directly, handling ENOENT and other relevant errors.

**Explanation:** The file can change between separate operations. Handling the intended operation avoids relying on a stale check.

### 30. A user supplies ../../private.txt as a filename under an upload folder. What must the application consider?

**Answer:** Resolve and validate that the candidate remains within the intended root, and account for symlinks, races, and filesystem permissions.

**Explanation:** A lexical relative-path check can catch ordinary traversal but is not a complete security boundary.

### 31. An application uses readFile() to load a multi-gigabyte log. What is the likely issue?

**Answer:** The program attempts to keep the entire file in memory.

**Explanation:** Process the file with a stream so memory use can be bounded and data handled incrementally.

### 32. A developer catches every filesystem error and silently returns an empty string. What is the risk?

**Answer:** Permission errors, invalid paths, and I/O failures may be hidden as if the file simply had no contents.

**Explanation:** Handle expected codes such as ENOENT separately and propagate unexpected errors.

### 33. A file is successfully read but the program keeps running after it should be done. The code used open() and did not close the handle. What is the likely problem?

**Answer:** The open file handle may still hold an operating-system resource and keep work active.

**Explanation:** Close file handles explicitly in a finally block.

## Coding questions

### 34. Read a text file relative to the current ES module.

**Answer:**

~~~js
import { readFile } from "node:fs/promises";

const text = await readFile(
  new URL("./message.txt", import.meta.url),
  "utf8"
);

console.log(text);
~~~

**Explanation:** The file URL is resolved from the module location, not process.cwd().

### 35. Build an absolute path from a relative path and the current working directory.

**Answer:**

~~~js
import path from "node:path";

const inputPath = path.resolve("data", "input.txt");
console.log(inputPath);
~~~

**Explanation:** path.resolve() uses the current working directory when it needs a starting absolute location.

### 36. Convert a file URL into a filesystem path.

**Answer:**

~~~js
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(
  new URL("./message.txt", import.meta.url)
);

console.log(filePath);
~~~

**Explanation:** This handles URL encoding and operating-system-specific path forms.

### 37. Read a file and report only the missing-file case as a friendly message.

**Answer:**

~~~js
import { readFile } from "node:fs/promises";

try {
  const contents = await readFile("input.txt", "utf8");
  console.log(contents);
} catch (error) {
  if (error.code === "ENOENT") {
    console.error("input.txt was not found.");
  } else {
    throw error;
  }
}
~~~

**Explanation:** Known errors can be handled deliberately. Unexpected filesystem failures should not be hidden.

### 38. Resolve an input path lexically inside an allowed root.

**Answer:**

~~~js
import path from "node:path";

function resolveInside(rootDirectory, userPath) {
  const root = path.resolve(rootDirectory);
  const candidate = path.resolve(root, userPath);
  const relative = path.relative(root, candidate);
  const parentPrefix = ".." + path.sep;

  if (
    relative === ".." ||
    relative.startsWith(parentPrefix) ||
    path.isAbsolute(relative)
  ) {
    throw new Error("Path is outside the allowed root.");
  }

  return candidate;
}
~~~

**Explanation:** This catches ordinary lexical traversal. It does not by itself defend against symlinks, races, or unsafe filesystem permissions.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [124 - Node.js modules, core APIs, and package resolution](../lessons/124-node-js-modules-core-apis-and-package-resolution.md) | [Open lesson](../lessons/125-file-system-paths-and-url-handling-in-node-js.md) | [Open example](../examples/125-file-system-paths-and-url-handling-in-node-js.md) | [126 - Buffers, streams, and backpressure](../lessons/126-buffers-streams-and-backpressure.md) |
