# 125 - File system, paths, and URL handling in Node.js

Node.js can read, write, and inspect files, but reliable file handling requires more than passing strings to an API. A path may be relative to the current working directory or to a module. Paths differ across operating systems, while URLs use a separate encoding and structure. Treating those formats as interchangeable can produce bugs and security problems.

## Learning goals

After this lesson, you should be able to:

- use the promise-based filesystem API for common file operations;
- distinguish a current-working-directory path from a module-relative file;
- build paths with node:path instead of concatenating separators;
- distinguish path.join() from path.resolve();
- convert correctly between filesystem paths and file URLs;
- handle expected filesystem errors without prechecking for access;
- avoid unsafe path traversal when user input selects a file;
- know when to use a stream instead of reading an entire file into memory.

## Use the promise-based filesystem API

Import filesystem functions from <code>node:fs/promises</code>:

~~~js
import {
  mkdir,
  readFile,
  readdir,
  writeFile
} from "node:fs/promises";

await mkdir("output", { recursive: true });
await writeFile("output/message.txt", "Hello from Node.js.\n", "utf8");

const message = await readFile("output/message.txt", "utf8");
console.log(message);

const entries = await readdir("output", { withFileTypes: true });
for (const entry of entries) {
  console.log(entry.name, entry.isDirectory() ? "directory" : "file");
}
~~~

Filesystem methods can fail for normal reasons: the file may not exist, access may be denied, a parent directory may be missing, or the path may refer to the wrong kind of object. Handle the failures that your application can recover from:

~~~js
import { readFile } from "node:fs/promises";

try {
  const text = await readFile("settings.json", "utf8");
  console.log(text);
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("No settings file exists yet.");
  } else {
    throw error;
  }
}
~~~

Use <code>error.code</code> for known operating-system error categories. Avoid matching the human-readable error message because it can vary by platform or runtime version.

### Do not check and then use

Do not use <code>fs.access()</code> as a precheck before calling <code>readFile()</code>, <code>writeFile()</code>, or <code>open()</code>. The file can change between the check and the later operation. Attempt the operation and handle its error:

~~~js
try {
  const contents = await readFile("input.txt", "utf8");
  console.log(contents);
} catch (error) {
  if (error.code === "ENOENT") {
    console.error("input.txt does not exist.");
  } else {
    throw error;
  }
}
~~~

This avoids a time-of-check to time-of-use gap in ordinary file handling.

## Understand where a path starts

A relative filesystem path is interpreted relative to the process's current working directory unless the API or application constructs it another way.

~~~js
import path from "node:path";

const fromWorkingDirectory = path.resolve("data", "input.txt");
console.log(fromWorkingDirectory);
~~~

The current working directory is available from <code>process.cwd()</code>. It is where the program was launched from, not necessarily where the script is stored.

For a file that belongs beside an ES module, construct a file URL from <code>import.meta.url</code>:

~~~js
import { readFile } from "node:fs/promises";

const contents = await readFile(
  new URL("./data/input.txt", import.meta.url),
  "utf8"
);

console.log(contents);
~~~

Many Node.js filesystem APIs accept a <code>file:</code> URL object. This pattern avoids dependence on the caller's current working directory.

## Build filesystem paths with node:path

Do not concatenate path strings with a hard-coded slash or backslash. Use <code>node:path</code> to apply the current platform's path rules.

~~~js
import path from "node:path";

const filename = path.join("data", "reports", "summary.txt");
console.log(filename);
~~~

On Windows the separator is normally a backslash. On POSIX systems it is a forward slash. The default <code>path</code> methods follow the operating system running Node.js.

Common methods include:

| Method | Purpose |
| --- | --- |
| <code>path.join(...segments)</code> | Join path segments and normalize the result |
| <code>path.resolve(...segments)</code> | Resolve segments into an absolute path, using the working directory if needed |
| <code>path.basename(path)</code> | Get the final path component |
| <code>path.dirname(path)</code> | Get the directory portion |
| <code>path.extname(path)</code> | Get the final extension, including its leading dot |
| <code>path.relative(from, to)</code> | Find a relative path between two locations |
| <code>path.isAbsolute(path)</code> | Check whether a path is absolute for the current platform |

<code>join()</code> and <code>resolve()</code> solve different problems:

~~~js
import path from "node:path";

console.log(path.join("data", "notes.txt"));
console.log(path.resolve("data", "notes.txt"));
~~~

The first is a normalized path formed from the supplied segments. The second returns an absolute path. If a later segment passed to <code>resolve()</code> is absolute, it can replace the earlier path segments.

The default methods are platform-specific. If a program must parse a Windows path while running on another operating system, use <code>path.win32</code>. For POSIX path syntax on any platform, use <code>path.posix</code>.

## Convert paths and file URLs correctly

A filesystem path and a URL are not the same string format. URLs have percent-encoding and URL separators. A path can contain spaces, non-ASCII text, a drive letter, or platform-specific separators.

Use <code>pathToFileURL()</code> to convert a filesystem path into a file URL:

~~~js
import { pathToFileURL } from "node:url";

const fileUrl = pathToFileURL("/project/files/hello world.txt");
console.log(fileUrl.href);
~~~

Use <code>fileURLToPath()</code> to convert a file URL into a filesystem path:

~~~js
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(
  new URL("./files/hello world.txt", import.meta.url)
);

console.log(filePath);
~~~

Do not use <code>new URL(filePath)</code> or <code>fileUrl.pathname</code> as a general conversion. URL pathnames may remain percent-encoded and do not handle Windows drive paths or network shares as filesystem paths. Use the conversion functions from <code>node:url</code>.

## Read and write text and bytes

When <code>readFile()</code> receives an encoding, it returns a string. Without an encoding, it returns a <code>Buffer</code> containing bytes:

~~~js
import { readFile } from "node:fs/promises";

const text = await readFile("message.txt", "utf8");
const bytes = await readFile("image.bin");

console.log(typeof text);
console.log(Buffer.isBuffer(bytes));
~~~

Likewise, <code>writeFile()</code> can write text or bytes:

~~~js
import { writeFile } from "node:fs/promises";

await writeFile("message.txt", "Saved text.\n", "utf8");
await writeFile("copy.bin", bytes);
~~~

<code>writeFile()</code> replaces the file by default. If the file contents are large, repeatedly appended, or need bounded memory use, consider a stream or an explicit file handle instead.

For an exclusive create that fails if the path already exists, use an appropriate flag such as <code>flag: "wx"</code>:

~~~js
await writeFile("new-file.txt", "Create once.\n", {
  encoding: "utf8",
  flag: "wx"
});
~~~

Handle the resulting error if the file already exists. Choosing a flag is a policy decision and should match the operation's intent.

## File handles and cleanup

An open file handle represents an operating-system resource. Close it when finished, including when an operation throws:

~~~js
import { open } from "node:fs/promises";

const file = await open("message.txt", "r");

try {
  const contents = await file.readFile("utf8");
  console.log(contents);
} finally {
  await file.close();
}
~~~

A <code>try...finally</code> block makes the cleanup intent explicit. Do not rely on garbage collection to close an open file handle at a particular time.

## Prevent unsafe user-selected paths

If user input selects a file under a specific directory, do not simply concatenate it with the directory name. Resolve the candidate and check its relative path:

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
    throw new Error("The requested path is outside the allowed directory.");
  }

  return candidate;
}
~~~

This check prevents ordinary lexical paths such as <code>../secret.txt</code> from escaping the chosen root. It is not a complete defense against symlinks, races, or a directory writable by an attacker. Applications handling untrusted filesystem paths need a threat-specific design, careful filesystem permissions, and safe file-opening behavior. Do not claim that normalization alone makes a path secure.

For web applications, avoid allowing a client to choose arbitrary filesystem paths. Map a validated identifier to a known file or record instead.

## Large files and asynchronous work

<code>readFile()</code> reads the entire file into memory before returning. That is convenient for small configuration files and text examples. For a large file or ongoing data flow, use streams so data can be processed in chunks.

The promise-based filesystem APIs avoid blocking the JavaScript event-loop thread for the actual filesystem operation, but JavaScript still needs to process the returned data. Large buffers can consume substantial memory, and many concurrent operations can create resource pressure.

Concurrent operations on the same file are not automatically coordinated. If multiple writes can target the same data, define an ordering or synchronization strategy rather than assuming the filesystem API will serialize application intent.

## Common mistakes

- Assuming relative paths start beside the script.
- Using a hard-coded slash or backslash to construct a cross-platform path.
- Confusing path.join() with path.resolve().
- Assuming a resolved path is automatically authorized or safe.
- Calling fs.access() before a later read or write.
- Using URL.pathname as a filesystem path.
- Constructing a file URL from a path with new URL(path).
- Reading a large file into memory when a stream is more appropriate.
- Failing to close a FileHandle in every code path.
- Assuming an async filesystem API makes later CPU-heavy processing non-blocking.
- Assuming normalized paths are safe from symlinks or filesystem races.
- Replacing a file with writeFile() when the operation should fail if it already exists.

## Key points

- Use <code>node:fs/promises</code> for promise-based file operations.
- Handle filesystem errors from the operation itself instead of prechecking with <code>access()</code>.
- Relative paths usually depend on <code>process.cwd()</code>; module resources can be resolved from <code>import.meta.url</code>.
- Use <code>node:path</code> to build and inspect platform-specific paths.
- Use <code>pathToFileURL()</code> and <code>fileURLToPath()</code> to convert between paths and file URLs.
- Read small files with <code>readFile()</code>; use streams for large or continuous data.
- Close file handles explicitly.
- Validate untrusted paths and do not treat path normalization as a complete security boundary.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [124 - Node.js modules, core APIs, and package resolution](124-node-js-modules-core-apis-and-package-resolution.md) | [Open Q&A](../qnas/125-file-system-paths-and-url-handling-in-node-js.md) | [Open example](../examples/125-file-system-paths-and-url-handling-in-node-js.md) | [126 - Buffers, streams, and backpressure](126-buffers-streams-and-backpressure.md) |
