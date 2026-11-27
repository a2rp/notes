# 86 - Transpilation, bundlers, polyfills, and source maps

JavaScript projects often run a build step before their code reaches a browser or another runtime. A build can transform syntax, combine modules, include compatibility code, and create files that are easier to deploy. These tasks are related, but each solves a different problem.

This chapter explains four important ideas: **transpilation**, **bundling**, **polyfills**, and **source maps**. A tool or framework may perform several of them in one build, so learn to identify what each part contributes.

## Learning goals

After this chapter, you should be able to:

- Explain what a transpiler changes and what it does not change.
- Describe how a bundler follows an application's dependency graph.
- Distinguish syntax transformation from API polyfilling.
- Explain how source maps help debug generated files.
- Read a simple build pipeline and trace its inputs and outputs.
- Choose compatibility targets based on the environments a project supports.

## Source code and build output

A project may contain source files organized for people to understand and maintain. A build tool reads one or more entry files and their dependencies, applies configured transformations, and writes generated output to a directory such as **dist/**.

~~~text
src/                         dist/
  app.js       build           app.js
  helpers.js   ------->        app.js.map
  styles.css                   styles.css
                               styles.css.map
~~~

The files in **dist/** are build artifacts. They can be bundled, transformed, minified, or accompanied by maps. They are generally regenerated from source and configuration rather than edited by hand.

## Transpilation

A **transpiler** transforms source code into code with different syntax or language features, often while keeping it in the same general language. A JavaScript build may convert newer JavaScript syntax into syntax understood by older target runtimes.

For example, a transform could convert an arrow function:

~~~js
const double = value => value * 2;
~~~

into a function expression:

~~~js
var double = function (value) {
  return value * 2;
};
~~~

The exact output depends on the tool and its configuration. A transpiler can also perform other source transformations. Tool capabilities differ, so check which input types and transformations are configured in the project.

### Transpilation does not automatically add every missing API

A syntax transform changes how code is written. It does not automatically create every runtime method or browser API that might be missing from an older environment.

For example, converting optional chaining syntax does not by itself provide a missing **Promise** implementation or a missing **Array.prototype.includes** method. Those are runtime APIs, not syntax forms.

A transform also does not necessarily type-check a program. A tool may strip type annotations or transform the syntax while a separate type checker performs semantic checks.

## Bundling

A **bundler** starts at one or more entry points, follows the dependencies that the project imports, and writes one or more output bundles or chunks. It builds a dependency graph. It is more than simple file concatenation because it must understand relationships between modules and may process those modules as part of the build.

For example, if **app.js** imports **format.js**, the bundler can include both modules in a generated output:

~~~text
src/app.js
  imports src/format.js
          |
          v
     build graph
          |
          v
dist/app.bundle.js
~~~

Bundlers can also split output into chunks, so a feature can be loaded only when needed. They may process assets or apply transformations through plugins and loaders. The precise features depend on the chosen tool and configuration.

Bundling is not always required. Browsers and Node.js can load module files directly in supported setups. A bundler is useful when a project needs a build graph, transformed assets, code splitting, optimization, or a particular deployment format.

## Minification and optimization

**Minification** reduces generated code size by removing unnecessary whitespace and shortening names where safe. It is a separate transformation from transpilation and bundling, although build tools often combine these steps.

A production build may also remove code that cannot be reached, eliminate unused exports, or split output into smaller chunks. These optimizations depend on the project and tool. They should not change the program's intended behavior.

Generated files can be hard to read after minification. Source maps help connect those files back to the source code.

## Compatibility targets

A build target describes the environments that must run the output, such as supported browsers or a supported Node.js version. A project should select targets from its actual requirements rather than assuming every user has the newest runtime or trying to support every historical browser.

Targets affect which syntax needs transformation and which runtime features need attention. The data and configuration used by build tools can change over time, so update the toolchain and review target settings as project support changes.

A target is a compatibility goal, not proof that the output works. Test the built application in the environments the project promises to support.

## Polyfills

A **polyfill** is code that provides an API when the runtime does not provide the needed behavior natively. A polyfill may define or patch a global object or built-in method, or provide a module that application code imports.

Examples of features that may need a polyfill in a particular environment include newer collection methods, newer promise methods, or browser APIs. The exact requirement depends on the API and the project's supported targets.

### Syntax transform versus polyfill

| Need | Typical solution | Example |
| --- | --- | --- |
| The runtime cannot parse a syntax form | Transform the syntax | Convert an arrow function to a function expression |
| The runtime parses the code but lacks a method or API | Add a suitable polyfill or fallback | Provide a missing array method or browser API |
| The code should not use an unsupported feature | Avoid it or use a fallback | Check for the API and choose another behavior |

A polyfill cannot make every feature available. Some browser features depend on security, hardware, user settings, or behavior that cannot be reproduced completely in JavaScript. A polyfill also adds code and can affect global behavior, so include only what the supported environments need.

### Choose polyfills deliberately

Before adding a polyfill:

1. Identify the exact runtime feature the application uses.
2. Check whether the project's target environments lack that feature.
3. Decide whether a polyfill, an imported alternative, or a fallback is appropriate.
4. Confirm the polyfill loads before code that uses the feature.
5. Check the added bundle size and test the feature in the target environments.

Some build systems can add selected polyfills based on target data and configuration. This is an integration that must be configured; do not assume that merely installing a transpiler provides all runtime APIs.

## Source maps

A **source map** records how positions in generated code correspond to positions in original source files. Developer tools and compatible runtimes can use it to display source locations when stepping through generated code or inspecting an error.

A JavaScript source map often has a **.map** extension and metadata describing the original sources and their mappings. A generated file may include a source-map directive that points to the corresponding map. The exact format is handled by the toolchain, so developers normally generate maps instead of editing the mapping data manually.

For example, the application might deploy:

~~~text
dist/app.bundle.js
dist/app.bundle.js.map
~~~

When source-map support is enabled, developer tools can show the original files and locations while the browser executes **app.bundle.js**. Without a usable map, a stack trace may point to a generated file and a line that is difficult to relate to the source.

Source maps help with debugging. They do not reverse a build into a perfect copy of the original project, and they do not change the runtime behavior of the generated code.

### Source map contents and deployment

Depending on build settings, a map may include original source content and paths. Review what the map reveals before publishing it. Source maps can expose source code or directory details that a project does not intend to publish. Teams may keep maps in an error-monitoring service, publish them with an application, or omit them from a public deployment. Choose and document the policy for the project.

## A typical build pipeline

A browser application build may follow steps like these:

1. Start from configured entry points.
2. Resolve imports and construct a dependency graph.
3. Transform syntax and process configured assets.
4. Add selected polyfills or fallback code when required.
5. Bundle modules into one or more output files.
6. Minify or otherwise optimize the output when appropriate.
7. Generate source maps that match the final generated files.
8. Write deployable assets to the output directory.

The exact order can vary. Some tools combine transformations and bundling in a single pass. The key is to know which inputs, targets, options, and outputs your configured build actually uses.

## Build configuration basics

A project's scripts often expose a build command:

~~~json
{
  "scripts": {
    "build": "build-tool src/app.js --outdir dist"
  }
}
~~~

A tool configuration may specify an entry point, output path, compatibility targets, transformations, and source-map settings. Build tools use different names and defaults for these options. Read the project configuration before changing a command, and keep generated assets separate from hand-written source files.

Useful checks after a build include:

- Confirm the command exits successfully.
- Inspect which files were created in **dist/**.
- Load the built output in the intended runtime.
- Trigger an error and confirm the source map points to the expected source location.
- Check that assets and lazy-loaded chunks resolve from their deployed paths.
- Review the final bundle size and any polyfill additions.

## Common misunderstandings

- **“Transpiling means every old browser feature is supported.”** Syntax may be transformed while runtime APIs are still missing.
- **“A bundler only joins files.”** It follows a dependency graph and may split, transform, and optimize output.
- **“A polyfill changes unsupported syntax.”** A polyfill supplies runtime behavior; a syntax transform rewrites code that a parser cannot understand.
- **“A source map changes the code being executed.”** It provides a mapping for tools; the generated JavaScript still runs.
- **“A build target guarantees compatibility.”** It guides transformations, but the built application still needs testing against its support requirements.
- **“Every source map is safe to publish.”** Maps may reveal original source content or paths, depending on configuration.

## Try it yourself

1. Write a small module that imports a helper, then draw the dependency graph from its entry point.
2. Run a syntax transform on an arrow function and compare the input and output.
3. Find a runtime API your target environment does not support and decide whether to use a polyfill or a fallback.
4. Build a small app into a **dist/** folder and identify which files are generated.
5. Enable source maps, trigger an error in the built app, and inspect the original source location in developer tools.
6. Disable source maps and compare the location shown for the same generated error.
7. Inspect the source map configuration to determine whether original source content is included.
8. Change the configured target and compare the generated output. Restore the project's intended target afterward.
9. Check whether your framework already configures bundling and transpilation before adding another build tool.

## Key points

- Transpilation transforms syntax or source code; it does not automatically supply every missing runtime API.
- Bundlers follow module dependencies from entry points and create bundles or chunks.
- Minification is a separate optimization that build tools may combine with other steps.
- A polyfill implements a missing runtime API when a suitable JavaScript implementation is possible.
- Compatibility targets guide build decisions but do not replace testing.
- Source maps map generated code positions back to source locations for debugging.
- Source maps may expose original code or paths, so review deployment settings.
- Keep source files, build configuration, and generated output distinct and reproducible.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [85 - ES modules and CommonJS in Node.js](085-es-modules-and-commonjs-in-node-js.md) | [Open Q&A](../qnas/086-transpilation-bundlers-polyfills-and-source-maps.md) | [Open example](../examples/086-transpilation-bundlers-polyfills-and-source-maps.md) | [87 - Testing fundamentals, assertions, and test design](087-testing-fundamentals-assertions-and-test-design.md) |
