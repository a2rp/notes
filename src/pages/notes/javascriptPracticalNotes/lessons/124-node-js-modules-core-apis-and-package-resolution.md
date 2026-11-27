# 124 - Node.js modules, core APIs, and package resolution

A Node.js application can be split across modules and can use APIs built into the runtime or dependencies installed in a project. To understand what an import means, identify the module specifier, the module format, and the package rules that resolve it.

## Learning goals

After this lesson, you should be able to:

- distinguish built-in, relative, absolute, bare, and package-internal module specifiers;
- import Node.js core APIs using the <code>node:</code> scheme;
- explain how a module resolver finds files and packages;
- describe the purpose of <code>main</code>, <code>exports</code>, and <code>imports</code>;
- use package subpath exports to define a public API;
- understand conditional exports at a high level;
- recognize common module resolution errors;
- avoid relying on private package files or hard-coded <code>node_modules</code> paths.

## What a module specifier identifies

An import statement names a module using a specifier. The shape of the specifier tells Node.js what kind of thing it may refer to.

| Specifier form | Example | Meaning |
| --- | --- | --- |
| Built-in | <code>node:fs/promises</code> | A Node.js API shipped with the runtime |
| Relative | <code>./format.js</code> | A file relative to the importing module |
| Parent relative | <code>../shared.js</code> | A file relative to a parent directory |
| Absolute file URL | <code>file:///app/config.js</code> | A file identified by a complete file URL |
| Bare package | <code>date-fns</code> | A package found by package resolution |
| Package subpath | <code>date-fns/format</code> | A package entry point that the package permits |
| Internal package import | <code>#internal/logger.js</code> | A path mapped by the current package's imports field |

The specifier is not always a literal filesystem path. A bare package name is resolved according to package rules. An internal <code>#</code> import uses the nearest package's <code>imports</code> map.

## Import Node.js core APIs

Core APIs ship with Node.js and do not need to be installed from a package registry. Import them with a <code>node:</code> specifier to make their source clear.

~~~js
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { platform } from "node:os";
import { randomUUID } from "node:crypto";

console.log("Platform:", platform());
console.log("Temporary id:", randomUUID());

const filename = join(process.cwd(), "notes.txt");
const text = await readFile(filename, "utf8");
console.log(text);
~~~

Common core APIs include:

| Module | Common use |
| --- | --- |
| <code>node:fs</code> and <code>node:fs/promises</code> | Read, write, and inspect files |
| <code>node:path</code> | Join and inspect filesystem paths |
| <code>node:url</code> | Work with URLs and convert file URLs |
| <code>node:os</code> | Read operating-system and machine information |
| <code>node:crypto</code> | Cryptographic and random-value operations |
| <code>node:events</code> | EventEmitter-based event patterns |
| <code>node:stream</code> | Process data in chunks |
| <code>node:http</code> and <code>node:https</code> | Build HTTP clients and servers |
| <code>node:util</code> | Utilities such as argument parsing and formatting |

Core APIs often have synchronous and asynchronous variants. A synchronous file read blocks the current JavaScript thread while it completes. Prefer an asynchronous API for routine I/O in a server or interactive command unless there is a specific reason to block.

## Relative imports in ECMAScript modules

In Node.js ECMAScript modules, write the file extension for relative file imports:

~~~js
import { formatName } from "./format-name.js";
import { readSettings } from "../config/read-settings.js";
~~~

These paths are resolved relative to the importing module, not automatically from <code>process.cwd()</code>. The extension is part of the specifier. Do not assume a development bundler's extensionless import behavior also applies to Node.js.

For files next to an ES module, a file URL is often a reliable way to construct a location:

~~~js
import { readFile } from "node:fs/promises";

const settingsText = await readFile(
  new URL("./settings.json", import.meta.url),
  "utf8"
);
~~~

This keeps the resource path tied to the module that uses it, even if the program is launched from another working directory.

## Resolve package dependencies

A bare specifier such as <code>import { parse } from "some-package"</code> asks the package resolver to find that package from the importing module's location and package configuration.

A simplified view is:

1. Node.js checks whether the specifier names a built-in module.
2. Relative and absolute specifiers are resolved as file or URL references.
3. Bare package names are resolved through package and dependency locations such as <code>node_modules</code>.
4. Package metadata determines the allowed entry points and module formats.
5. The loader reads and evaluates the selected module.

This is a teaching summary, not the complete resolution algorithm. CommonJS and ECMAScript module loaders have related but not identical rules. Package exports, conditions, extensions, and module type all affect the result.

Do not manually construct paths into <code>node_modules</code>. Package managers can use nested layouts, links, or other valid structures. Import by the package's documented name and entry points.

## Package entry points: main and exports

A package's <code>package.json</code> can describe its entry points.

The <code>main</code> field defines a package's main entry point and is supported for compatibility with older Node.js releases and tooling:

~~~json
{
  "main": "./index.js"
}
~~~

The <code>exports</code> field provides a more explicit public interface. It can define the main entry point and selected subpaths:

~~~json
{
  "name": "example-tools",
  "type": "module",
  "exports": {
    ".": "./src/index.js",
    "./format": "./src/format.js",
    "./features/date": "./src/features/date.js"
  }
}
~~~

Consumers can then import the declared paths:

~~~js
import { createTool } from "example-tools";
import { format } from "example-tools/format";
~~~

When <code>exports</code> is present, package consumers cannot import arbitrary undeclared package subpaths by package name. This keeps internal files from accidentally becoming part of the public API. In supported Node.js versions, <code>exports</code> takes precedence over <code>main</code>.

Adding <code>exports</code> to an established package can break consumers if they previously imported paths that are not listed. Define and maintain the public paths intentionally.

## Internal package imports

The <code>imports</code> field defines aliases that are private to the package. Keys start with <code>#</code>.

~~~json
{
  "type": "module",
  "imports": {
    "#internal/*": "./src/internal/*.js"
  }
}
~~~

Code inside the package can use the alias:

~~~js
import { readConfig } from "#internal/config.js";
~~~

This can avoid long relative paths. Internal imports are not public package exports. Another package cannot use the alias as if it were a public entry point.

## Conditional exports

A package can expose different files depending on how a consumer loads it. For example, a package can provide one entry for ECMAScript module imports and another for CommonJS require calls:

~~~json
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    }
  }
}
~~~

Conditions are checked in the order written. Put specific conditions before a fallback such as <code>default</code>. The selected target must be compatible with the way it will be loaded.

Most applications should consume a package's public API without needing to define conditional exports themselves. Package authors should test each supported entry point and module format.

## Core modules and package names

A core module is part of Node.js. It does not need an entry in <code>dependencies</code>:

~~~js
import { parseArgs } from "node:util";
~~~

An installed third-party package is declared as a dependency and resolved by package name:

~~~js
import { parse } from "some-installed-package";
~~~

The <code>node:</code> prefix also makes it clear that the import refers to Node.js rather than a similarly named package. Follow a package's documented import paths instead of guessing its internal file structure.

## Common resolution errors

### Module not found

The requested relative file or package could not be located. Check:

- spelling and capitalization;
- relative path from the importing file;
- file extension in an ESM relative import;
- whether the dependency is installed in the project;
- whether the package is available from the importer's resolution path.

### Package path not exported

The package exists, but the requested subpath is not in its <code>exports</code> map. Import a documented public entry point or use a supported API. Do not bypass the package boundary by reaching into private files.

### Module format mismatch

The file was interpreted as CommonJS or ESM differently than the code expects. Check the file extension and nearest <code>package.json</code> <code>type</code> field. Use <code>.mjs</code> or <code>.cjs</code> when an explicit per-file marker is useful.

### Import specifier does not resolve

An ESM relative import may be missing its file extension, or an internal <code>#</code> alias may not match an <code>imports</code> entry. Compare the specifier with the mapping exactly.

## Dependency basics

Third-party dependencies are installed and managed by a package manager, commonly npm. A project's <code>package.json</code> declares package metadata and dependency ranges. A lockfile records a resolved dependency tree so installs can be repeated more consistently.

Do not edit files inside <code>node_modules</code> as if they were application source. Those files are generated or installed dependency contents. Update the dependency declaration and lockfile through the package manager when changing dependencies.

For a project, review:

- whether a feature is already available as a Node.js core API;
- which package entry points are public;
- the Node.js versions and module formats the package supports;
- the dependency's maintenance and security needs;
- whether the lockfile is committed for reproducible installs.

## Common mistakes

- Treating every module specifier as a filesystem path.
- Installing a package that is already provided by Node.js core.
- Omitting extensions from relative ESM imports.
- Resolving a resource relative to the wrong directory.
- Importing an undeclared private package subpath.
- Assuming <code>main</code> and <code>exports</code> have identical capabilities.
- Adding <code>exports</code> without preserving package paths consumers already use.
- Assuming the <code>imports</code> field creates public aliases for other packages.
- Depending on the layout of <code>node_modules</code>.
- Mixing CommonJS and ESM entry points without understanding which one a condition selects.
- Editing installed package files directly.
- Ignoring the package's declared Node.js compatibility.

## Key points

- Use <code>node:</code> imports for built-in Node.js APIs.
- Relative ESM imports are resolved from the importing module and normally include the file extension.
- Bare package names are resolved through package rules, not from arbitrary hard-coded paths.
- <code>main</code> provides a traditional main entry point; <code>exports</code> defines the supported public package interface.
- A package's <code>imports</code> map provides internal <code>#</code> aliases.
- Conditional exports can select different entry files for import and require.
- A package path not exported is intentionally outside its public interface.
- Use package managers to install dependencies and keep package metadata and lockfiles in sync.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [123 - Command-line arguments, environment variables, and process](123-command-line-arguments-environment-variables-and-process.md) | [Open Q&A](../qnas/124-node-js-modules-core-apis-and-package-resolution.md) | [Open example](../examples/124-node-js-modules-core-apis-and-package-resolution.md) | [125 - File system, paths, and URL handling in Node.js](125-file-system-paths-and-url-handling-in-node-js.md) |
