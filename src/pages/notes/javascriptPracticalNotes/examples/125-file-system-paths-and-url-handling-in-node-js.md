# 125 - File system, paths, and URL handling in Node.js

This example is a local file-processing program. It reads a sample file beside its module, inspects file metadata, converts between a path and a file URL, writes a report into an output folder, and lists the generated files.

The optional output filename is checked so ordinary lexical paths cannot escape the output directory. This check is a teaching example, not a complete defense against symlinks or races.

## Create these files

Create a folder named <code>filesystem-path-demo</code> with this structure:

~~~text
filesystem-path-demo/
  app.mjs
  data/
    input.txt
~~~

### <code>filesystem-path-demo/data/input.txt</code>

~~~text
Node.js can read and write files with its filesystem APIs.
A module-relative URL keeps this input path independent from the caller's current directory.
~~~

### <code>filesystem-path-demo/app.mjs</code>

~~~js
import {
  mkdir,
  readFile,
  readdir,
  stat,
  writeFile
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const moduleFile = fileURLToPath(import.meta.url);
const moduleDirectory = path.dirname(moduleFile);
const inputUrl = new URL("./data/input.txt", import.meta.url);
const inputPath = fileURLToPath(inputUrl);
const outputDirectory = path.join(moduleDirectory, "output");

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
    throw new Error("The output path must stay inside the output folder.");
  }

  return candidate;
}

async function main() {
  const sourceText = await readFile(inputUrl, "utf8");
  const sourceStats = await stat(inputPath);
  const inputFileUrl = pathToFileURL(inputPath);

  console.log("Module directory:", moduleDirectory);
  console.log("Current working directory:", process.cwd());
  console.log("Input filename:", path.basename(inputPath));
  console.log("Input extension:", path.extname(inputPath));
  console.log("Input size:", sourceStats.size, "bytes");
  console.log("Input file URL:", inputFileUrl.href);
  console.log("Input text:");
  console.log(sourceText.trim());

  const requestedOutputName = process.argv[2] ?? "summary.txt";

  if (requestedOutputName.trim().length === 0) {
    throw new Error("The output filename must not be empty.");
  }

  const outputPath = resolveInside(
    outputDirectory,
    requestedOutputName
  );

  await mkdir(path.dirname(outputPath), { recursive: true });

  const report = [
    "File processing summary",
    "=======================",
    "",
    "Source file: " + path.basename(inputPath),
    "Bytes read: " + sourceStats.size,
    "",
    sourceText.trim()
  ].join("\n");

  await writeFile(outputPath, report + "\n", {
    encoding: "utf8"
  });

  const savedReport = await readFile(outputPath, "utf8");
  console.log("");
  console.log("Saved report to:", outputPath);
  console.log(savedReport);

  const entries = await readdir(outputDirectory, {
    withFileTypes: true
  });

  console.log("Output directory entries:");
  for (const entry of entries) {
    console.log(
      entry.isDirectory() ? "Directory:" : "File:",
      entry.name
    );
  }
}

main().catch((error) => {
  console.error("File processing failed:", error.message);
  process.exitCode = 1;
});
~~~

The program uses <code>readFile()</code> and <code>writeFile()</code> for this small text file. For large files, process data with streams instead of loading the entire contents into memory.

## Run the example

Open a terminal in the folder that contains <code>filesystem-path-demo</code>. Run the default report:

~~~sh
node filesystem-path-demo/app.mjs
~~~

Choose a different output file:

~~~sh
node filesystem-path-demo/app.mjs reports/second-summary.txt
~~~

The output directory is created if needed. The report is written beneath it.

Try a traversal path:

~~~sh
node filesystem-path-demo/app.mjs ../outside.txt
~~~

The program should print an error and return a non-zero exit status instead of writing that lexical path outside the output directory.

## Expected result

The program prints the module directory and current working directory separately. It displays the sample file's name, extension, byte size, file URL, and text. It then writes a report under <code>filesystem-path-demo/output</code> and lists the output directory entries.

Exact absolute paths and byte counts depend on the environment and file encoding. Running the program again with the same output filename replaces that report because <code>writeFile()</code> overwrites by default.

## Why the example is structured this way

- The input file is resolved from <code>import.meta.url</code>, not from the terminal's working directory.
- fileURLToPath() and pathToFileURL() perform the conversions between file URLs and filesystem paths.
- node:path builds paths using the current platform's rules.
- The filesystem operations are awaited and the main function handles failures.
- The output path is resolved and checked before it is written.
- The path check handles ordinary lexical traversal only. It does not claim protection from symlinks or filesystem races.
- The example uses a small file so readFile() is appropriate.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [124 - Node.js modules, core APIs, and package resolution](../lessons/124-node-js-modules-core-apis-and-package-resolution.md) | [Open Q&A](../qnas/125-file-system-paths-and-url-handling-in-node-js.md) | [Open lesson](../lessons/125-file-system-paths-and-url-handling-in-node-js.md) | [126 - Buffers, streams, and backpressure](../lessons/126-buffers-streams-and-backpressure.md) |
