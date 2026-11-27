# 124 - Node.js modules, core APIs, and package resolution

This example is a small Node.js package that demonstrates built-in modules, relative imports, package self-references, public package exports, and private package imports.

It has no third-party dependencies. One optional file catches the error produced when code tries to import a package subpath that is not exported.

## Create these files

Create a folder named <code>node-resolution-demo</code> and add the files below.

### <code>node-resolution-demo/package.json</code>

~~~json
{
  "name": "node-resolution-demo",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.js",
    "./format": "./src/format.js"
  },
  "imports": {
    "#internal/*": "./src/internal/*.js"
  }
}
~~~

The <code>exports</code> map makes the package root and <code>./format</code> its public entry points. The <code>imports</code> map creates private aliases for modules inside this package.

### <code>node-resolution-demo/sample.txt</code>

~~~text
This text is read from a file beside app.mjs.
~~~

### <code>node-resolution-demo/src/format.js</code>

~~~js
export function formatTitle(value) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
~~~

### <code>node-resolution-demo/src/internal/runtime-info.js</code>

~~~js
import { arch, platform } from "node:os";
import { basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const modulePath = fileURLToPath(import.meta.url);

export function getRuntimeInfo() {
  return {
    runtime: process.release.name,
    nodeVersion: process.versions.node,
    platform: platform(),
    architecture: arch(),
    moduleFile: basename(modulePath),
    moduleDirectory: dirname(modulePath)
  };
}
~~~

This module uses built-in Node.js APIs with <code>node:</code> specifiers. Its <code>#internal</code> alias is available only inside the package.

### <code>node-resolution-demo/src/index.js</code>

~~~js
import { formatTitle } from "./format.js";
import { getRuntimeInfo } from "#internal/runtime-info";

export function createSummary(value) {
  return {
    title: formatTitle(value),
    runtime: getRuntimeInfo()
  };
}
~~~

The relative import includes its file extension. The internal alias is resolved through the package imports map.

### <code>node-resolution-demo/app.mjs</code>

~~~js
import { readFile } from "node:fs/promises";
import { createSummary } from "node-resolution-demo";
import { formatTitle } from "node-resolution-demo/format";

const sampleText = await readFile(
  new URL("./sample.txt", import.meta.url),
  "utf8"
);

console.log("Package root import:");
console.log(createSummary("node package resolution"));

console.log("");
console.log("Public package subpath:");
console.log(formatTitle("core api imports"));

console.log("");
console.log("Module-relative file:");
console.log(sampleText.trim());
~~~

The imports by package name are self-references. Node.js uses the package name and its exports map to resolve them.

### <code>node-resolution-demo/check-private-import.mjs</code>

~~~js
try {
  await import("node-resolution-demo/src/internal/runtime-info.js");
  console.error("The private path was unexpectedly available.");
  process.exitCode = 1;
} catch (error) {
  if (error.code === "ERR_PACKAGE_PATH_NOT_EXPORTED") {
    console.log("Private package subpath is not exported.");
  } else {
    console.error("Unexpected import error:", error.message);
    process.exitCode = 1;
  }
}
~~~

This file deliberately tries to load an internal source path through the package name. Since the path is absent from <code>exports</code>, Node.js rejects it. The internal module can still be used through <code>#internal/runtime-info</code> by code inside this package.

## Run the example

Open a terminal in the folder that contains <code>node-resolution-demo</code>. Run the application:

~~~sh
node node-resolution-demo/app.mjs
~~~

Then run the private-path check:

~~~sh
node node-resolution-demo/check-private-import.mjs
~~~

No package installation is needed because the project uses only Node.js built-in modules and its own files.

## Expected result

The application prints a summary object containing the Node.js version, operating system, architecture, and internal module location. It also prints the public formatter result and the text from <code>sample.txt</code>.

The private-path check prints that the package subpath is not exported. Paths, operating system, architecture, and Node.js version depend on the machine.

## Try these changes

1. Change the wording passed to <code>createSummary()</code> and observe the formatted title.
2. Add a public file at <code>src/version.js</code>, then expose it with an explicit <code>"./version"</code> entry in <code>exports</code>.
3. Try importing <code>node-resolution-demo/src/format.js</code> directly. It is not a declared public subpath.
4. Change the internal import in <code>src/index.js</code> to a matching <code>#internal</code> alias and check the target mapping.
5. Change the sample text and run the app again. The file is resolved relative to <code>app.mjs</code>, not the terminal's current working directory.

## Why the example is structured this way

- <code>node:fs/promises</code>, <code>node:os</code>, <code>node:path</code>, and <code>node:url</code> show core APIs.
- The relative import shows a path resolved from its importing module.
- Imports by the package's own name demonstrate self-reference through <code>exports</code>.
- The <code>#internal</code> alias demonstrates a private mapping through <code>imports</code>.
- The private-path check shows how <code>exports</code> blocks undeclared package subpaths.
- No code depends on a hard-coded <code>node_modules</code> layout.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [123 - Command-line arguments, environment variables, and process](../lessons/123-command-line-arguments-environment-variables-and-process.md) | [Open Q&A](../qnas/124-node-js-modules-core-apis-and-package-resolution.md) | [Open lesson](../lessons/124-node-js-modules-core-apis-and-package-resolution.md) | [125 - File system, paths, and URL handling in Node.js](../lessons/125-file-system-paths-and-url-handling-in-node-js.md) |
