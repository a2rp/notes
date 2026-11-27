# 124 - Node.js modules, core APIs, and package resolution: Q&A

Use these questions to review Node.js core modules, module specifiers, package entry points, and resolution errors. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does a specifier such as node:fs/promises identify?

- A. A Node.js built-in module
- B. A package that must always be installed
- C. A file in the current working directory
- D. A browser API

**Answer: A.**

**Explanation:** Node.js core modules ship with the runtime. The node: prefix makes the built-in source explicit.

### 2. From which location is an ECMAScript module's relative import resolved?

- A. From the importing module
- B. Always from process.cwd()
- C. From the Node.js executable directory
- D. From the root of the filesystem

**Answer: A.**

**Explanation:** A specifier such as ./format.js is relative to the file that imports it. It does not automatically use the process working directory.

### 3. Which relative import is the normal explicit form in Node.js ESM?

- A. import "./format.js"
- B. import "format"
- C. import "/node_modules/format"
- D. import "node:./format"

**Answer: A.**

**Explanation:** Use an explicit relative path and file extension for Node.js ESM imports.

### 4. What does a bare specifier such as some-package usually name?

- A. An installed package resolved by package rules
- B. A relative file next to the module
- C. A built-in module in every case
- D. A directory under process.cwd() in every case

**Answer: A.**

**Explanation:** Package resolution uses the importing module's context and package metadata. It is not equivalent to an arbitrary filesystem path.

### 5. Which field defines a package's supported public entry points and subpaths?

- A. exports
- B. imports
- C. scripts
- D. engines

**Answer: A.**

**Explanation:** The exports field defines the package entry points consumers may use by package name.

### 6. What does the imports field primarily provide?

- A. Package-internal specifier aliases that begin with #
- B. Public URLs for every package consumer
- C. A list of command-line arguments
- D. A mapping of environment variable values

**Answer: A.**

**Explanation:** A package can use imports for internal aliases. These mappings are not general public entry points for consumers.

### 7. What may happen when a package has an exports field and a consumer imports an undeclared subpath?

- A. The package path may be rejected as not exported
- B. Node.js automatically installs another package
- C. The subpath is always loaded anyway
- D. Node.js switches the file to CommonJS

**Answer: A.**

**Explanation:** Exports intentionally limits supported package subpaths. Consumers should use a documented public entry point.

### 8. If both main and exports are present, which one takes precedence in supported Node.js versions?

- A. exports
- B. main
- C. package.json name
- D. Neither field can be used

**Answer: A.**

**Explanation:** exports is the more expressive package interface and takes precedence when supported.

### 9. What is a benefit of explicitly listing subpaths in exports?

- A. It makes the package's public API clearer
- B. It makes every internal file globally available
- C. It removes the need for a package.json file
- D. It converts the package to a core module

**Answer: A.**

**Explanation:** An explicit public interface avoids consumers depending on accidental internal paths.

### 10. What do conditional exports allow a package author to do?

- A. Select entry files based on conditions such as import or require
- B. Change the user's operating system
- C. Turn a relative import into an environment variable
- D. Load any package path without metadata

**Answer: A.**

**Explanation:** A package can provide different entry files for different loading conditions. Each target must match its intended module format and use.

### 11. Why should specific conditional exports generally appear before default?

- A. Conditions are checked in object order
- B. default disables all other entries
- C. JSON sorts the entries alphabetically
- D. Node.js ignores the first condition

**Answer: A.**

**Explanation:** A matching earlier condition can be selected before a later fallback. Put the fallback last.

### 12. Does a Node.js core module need to be installed as a third-party dependency?

- A. No
- B. Yes, with every new project
- C. Only when using ESM
- D. Only on Windows

**Answer: A.**

**Explanation:** Core modules are shipped with Node.js. A separate package is not needed for APIs such as node:path or node:util.

### 13. Why should application code avoid hard-coding a path inside node_modules?

- A. Package managers can use different valid dependency layouts
- B. node_modules is always a network drive
- C. Node.js does not permit package imports
- D. All package paths are encrypted

**Answer: A.**

**Explanation:** Import dependencies by their package names and public entry points, rather than depending on a particular installation layout.

### 14. Where does the specifier #internal/logger.js get its mapping?

- A. From the current package's imports field
- B. From the operating system
- C. From process.argv
- D. From the package registry

**Answer: A.**

**Explanation:** A # specifier is mapped by the nearest package scope's imports configuration.

### 15. What does a Module not found error usually indicate?

- A. A requested file or package could not be resolved
- B. The CPU ran out of time
- C. Every package export was successful
- D. The process has no environment variables

**Answer: A.**

**Explanation:** Check the spelling, relative path, extension, dependency installation, and package resolution context.

### 16. What does Package path not exported usually mean?

- A. The package exists, but that subpath is outside its declared public interface
- B. The package is a core module
- C. The import is a valid relative path
- D. The package needs a different operating system

**Answer: A.**

**Explanation:** Use a public package entry point or an API that the package documents.

### 17. Which should usually be used for a simple asynchronous file read?

- A. node:fs/promises
- B. A manually constructed node_modules path
- C. A CSS import
- D. process.env

**Answer: A.**

**Explanation:** The promises API provides asynchronous filesystem operations and is a core Node.js API.

## Short-answer questions

### 18. What is the difference between a built-in specifier and a bare package specifier?

**Answer:** A built-in specifier such as node:path refers to an API shipped with Node.js. A bare package specifier such as a package name refers to an installed dependency resolved through package rules.

**Explanation:** Core modules do not need to be installed, while third-party packages must be declared and installed for a project.

### 19. Why should an ESM relative import include a file extension?

**Answer:** Node.js ESM resolves the explicit relative specifier, including its extension. It does not automatically apply the extension-search behavior some bundlers provide.

**Explanation:** Explicit paths reduce ambiguity and make the import work with the Node.js loader.

### 20. What is the difference between package exports and package imports?

**Answer:** exports defines public package entry points for consumers. imports defines internal aliases for modules within the package, using keys that start with #.

**Explanation:** An internal alias does not automatically become a public API.

### 21. What can exports prevent package consumers from doing?

**Answer:** It can prevent consumers from importing undeclared subpaths by package name.

**Explanation:** This protects the package interface from accidental dependence on internal file structure.

### 22. What is the relationship between main and exports?

**Answer:** main provides a traditional package main entry point. exports can provide the main entry, multiple subpaths, and conditional mappings, and takes precedence where supported.

**Explanation:** New packages commonly use exports to define a clearer public interface.

### 23. What is a conditional export?

**Answer:** It maps a package entry to different files depending on conditions such as whether the consumer uses import or require.

**Explanation:** The target files must have module formats that match how they are loaded.

### 24. Why should developers not edit files inside node_modules as application code?

**Answer:** Those files are installed dependency contents and can be replaced during installation or updates.

**Explanation:** Make dependency changes through package metadata and the package manager, or contribute changes to the dependency itself.

### 25. Why can adding exports to an existing package be a breaking change?

**Answer:** Consumers may have been importing subpaths that the new exports map does not expose.

**Explanation:** Preserve previously supported entry points or make a deliberate breaking release.

## Scenarios

### 26. A Node.js ES module imports ./helper but fails to find it, although helper.js exists beside the file. What should be checked first?

**Answer:** Check whether the import includes the explicit extension, such as ./helper.js.

**Explanation:** Node.js ESM relative specifiers normally include the file extension.

### 27. A package is installed, but importing package/private.js fails with a path-not-exported error. How should the consumer proceed?

**Answer:** Use a documented public package entry point or an API the package exposes.

**Explanation:** The error means the requested subpath is not in the package's public exports. Reaching into internal files creates fragile coupling.

### 28. A project imports node:fs/promises and also installs a package named fs. Which import clearly selects the Node.js built-in?

**Answer:** node:fs/promises.

**Explanation:** The node: prefix explicitly identifies a built-in module.

### 29. A package's package.json maps #internal/*.js to ./src/internal/*.js. What does #internal/date.js resolve to?

**Answer:** ./src/internal/date.js within that package.

**Explanation:** The wildcard portion date is substituted into the target mapping.

### 30. A consumer uses require() but the package's exports map has only an import condition. What should the package author review?

**Answer:** Whether the package intends to support require() and, if so, whether it needs a compatible require condition and CommonJS target.

**Explanation:** Conditional entry points must match the consumers and module formats the package claims to support.

### 31. A file works when imported by a bundler but fails under Node.js because the relative path omits an extension. Why?

**Answer:** The bundler may resolve extensionless paths using its own rules, while Node.js ESM expects an explicit relative file specifier.

**Explanation:** Build tools and Node.js do not necessarily share the same resolution behavior.

## Coding questions

### 32. Import and use a built-in Node.js module and a relative ESM module.

**Answer:**

~~~js
import { platform } from "node:os";
import { formatName } from "./format-name.js";

console.log(platform());
console.log(formatName("ada"));
~~~

**Explanation:** The node: specifier identifies a core module. The relative import is resolved from this module and includes its extension.

### 33. Define a package main entry and one public subpath.

**Answer:**

~~~json
{
  "name": "example-tools",
  "type": "module",
  "exports": {
    ".": "./src/index.js",
    "./format": "./src/format.js"
  }
}
~~~

**Explanation:** Consumers can import the package root or its declared format subpath. Other internal files are not automatically exposed.

### 34. Define a private alias for modules inside a package.

**Answer:**

~~~json
{
  "type": "module",
  "imports": {
    "#internal/*": "./src/internal/*.js"
  }
}
~~~

~~~js
import { readConfig } from "#internal/config.js";
~~~

**Explanation:** The alias resolves within the package. It is not a public package subpath for other packages.

### 35. Provide separate entry points for ESM and CommonJS consumers.

**Answer:**

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

**Explanation:** The ESM entry uses .js in a module package, while .cjs marks the CommonJS entry explicitly. The default condition is a fallback.

### 36. Read a text file located beside the current ES module.

**Answer:**

~~~js
import { readFile } from "node:fs/promises";

const text = await readFile(
  new URL("./message.txt", import.meta.url),
  "utf8"
);

console.log(text);
~~~

**Explanation:** The URL is based on the module's location, not on the caller's current working directory.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [123 - Command-line arguments, environment variables, and process](../lessons/123-command-line-arguments-environment-variables-and-process.md) | [Open lesson](../lessons/124-node-js-modules-core-apis-and-package-resolution.md) | [Open example](../examples/124-node-js-modules-core-apis-and-package-resolution.md) | [125 - File system, paths, and URL handling in Node.js](../lessons/125-file-system-paths-and-url-handling-in-node-js.md) |
