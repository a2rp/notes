# 86 - Transpilation, bundlers, polyfills, and source maps Q&A

These questions review JavaScript build output, syntax transforms, bundling, compatibility targets, polyfills, minification, and source maps. Each answer follows its question, with an explanation to clarify the distinction.

## Transpilation and targets

### 1. What is the usual purpose of a JavaScript transpiler?

**Answer:** To transform source code into code with different syntax or language features, often for a target runtime.

**Explanation:** A transpiler can rewrite newer syntax into forms a target may understand, while leaving the program's intended behavior intact.

### 2. Which is an example of a syntax transformation?

- A. Add a missing browser API implementation.
- B. Convert an arrow function into a function expression.
- C. Combine imported modules into output chunks.
- D. Map generated lines back to original source locations.

**Answer:** B.

**Explanation:** Rewriting an arrow function is a source syntax transformation. The other choices describe a polyfill, bundling, and source maps.

### 3. Does transforming optional chaining syntax automatically provide a missing Promise API?

**Answer:** No.

**Explanation:** Optional chaining is syntax. Promise is a runtime API. A transform and a polyfill solve different compatibility problems.

### 4. What does a build target describe?

**Answer:** The runtime environments that the generated code is intended to support.

**Explanation:** Targets guide which syntax transformations and compatibility additions a build may need.

### 5. Does choosing an old-browser target prove that the application will work in every old browser?

**Answer:** No.

**Explanation:** The target guides build tooling, but the complete application must still be tested against the project's supported environments.

### 6. Does every JavaScript transformation perform type checking?

**Answer:** No.

**Explanation:** A tool may rewrite or strip syntax without checking its types or proving that the program is correct.

### 7. What is the difference between an input source file and build output?

**Answer:** Source files are the project's authored inputs; build output is generated from them and the build configuration.

**Explanation:** Generated files should normally be recreated by the build rather than edited by hand.

## Bundling and optimization

### 8. What does a bundler use as the start of its dependency graph?

**Answer:** One or more configured entry points.

**Explanation:** The bundler follows imports and other configured dependencies from those entries.

### 9. Is bundling only concatenating files in order?

**Answer:** No.

**Explanation:** A bundler builds a dependency graph and may resolve modules, transform inputs, split output into chunks, or process assets.

### 10. What is an output chunk?

**Answer:** A generated file containing some portion of the bundled dependency graph.

**Explanation:** A build can create several chunks so that not all code must be loaded at the same time.

### 11. Is a bundler required for every JavaScript application?

**Answer:** No.

**Explanation:** Some browsers and Node.js setups can load modules directly. A bundler is useful when the project needs a bundle graph, asset processing, transformations, splitting, or a chosen deployment format.

### 12. What does minification usually try to reduce?

**Answer:** The size of generated code.

**Explanation:** It can remove unnecessary whitespace and shorten names where safe. Minification is separate from bundling and syntax transformation, even if one tool performs them together.

### 13. What should a project do with generated dist files when it needs a different build?

**Answer:** Rebuild them from the source files and configuration.

**Explanation:** The source and configuration are the maintainable inputs. Hand-editing generated output is fragile because the next build can overwrite it.

### 14. What information should you inspect when a configured build behaves unexpectedly?

**Answer:** Its entry points, targets, transformations, output settings, and generated files.

**Explanation:** A tool's defaults and configuration determine what it actually builds.

## Polyfills and compatibility

### 15. What does a polyfill provide?

**Answer:** A JavaScript implementation of a runtime API that is missing from the target environment.

**Explanation:** A polyfill can provide behavior such as a missing method, when that behavior can be implemented suitably in JavaScript.

### 16. Which problem is a polyfill intended to address?

- A. The parser cannot understand a syntax form.
- B. The runtime lacks an API the program uses.
- C. A bundle contains too many line breaks.
- D. A generated stack trace points to a minified file.

**Answer:** B.

**Explanation:** A polyfill provides runtime behavior. Syntax transforms, minification, and source maps address the other choices.

### 17. Can every browser feature be polyfilled completely?

**Answer:** No.

**Explanation:** Some capabilities depend on security, hardware, user settings, or native behavior that JavaScript cannot reproduce fully.

### 18. Why should a project include only the polyfills its targets need?

**Answer:** To avoid unnecessary code size and global changes.

**Explanation:** Polyfills add code, and some modify global objects or built-in APIs. The compatibility requirements should justify what is included.

### 19. What should you determine before adding a polyfill?

**Answer:** Which exact API is missing and whether a supported target environment needs it.

**Explanation:** Start from the runtime behavior the application uses, then choose a compatible polyfill, imported alternative, or fallback.

### 20. Why should a polyfill load before the code that uses its API?

**Answer:** The API must exist before that code attempts to call it.

**Explanation:** Loading a polyfill after its first use cannot prevent the earlier failure.

### 21. What might a build tool do when configured to select polyfills from targets?

**Answer:** Add the compatibility code needed for features the configured targets lack.

**Explanation:** This behavior requires a suitable tool integration and configuration. Installing a transpiler alone does not guarantee that all runtime APIs are supplied.

### 22. What is a fallback in compatibility work?

**Answer:** An alternate implementation or behavior used when a preferred API is unavailable.

**Explanation:** A fallback can avoid a polyfill when the application can provide a suitable alternative path.

### 23. A transform makes a new JavaScript syntax parse in an older runtime, but calling a method still fails. What kind of support may be missing?

**Answer:** A polyfill or fallback for that runtime method.

**Explanation:** The source syntax may now parse, while the target still lacks the API used during execution.

## Source maps

### 24. What is the main purpose of a source map?

**Answer:** To map positions in generated code back to their original source locations.

**Explanation:** Developer tools or compatible runtimes can use this mapping to make debugging transformed or bundled files easier.

### 25. Does a source map change the behavior of generated JavaScript?

**Answer:** No.

**Explanation:** It is metadata used by debugging tools. The generated JavaScript is still the code executed by the runtime.

### 26. What does a debugger often show when a generated bundle has a usable source map?

**Answer:** Original source files and locations corresponding to the generated code.

**Explanation:** The map helps relate a stack trace or breakpoint in a bundle to the code a developer authored.

### 27. What may a source map file contain in addition to mappings?

**Answer:** Source file names or paths, and optionally the original source contents.

**Explanation:** The exact fields depend on how the map is generated. Review the settings before publishing it.

### 28. What deployment concern can source maps create?

**Answer:** They may reveal source code or file path details.

**Explanation:** A project should choose whether maps are published, kept privately for error monitoring, or omitted from public deployment.

### 29. Should developers normally hand-edit a generated source map's mappings?

**Answer:** No.

**Explanation:** Build tools generate mapping data that must match the final output. Change the build inputs or configuration and regenerate the map instead.

### 30. What is one reason a source map can become misleading?

**Answer:** The generated code changed after the map was created.

**Explanation:** A map must correspond to the exact generated file. Reusing a stale map can point debugging tools to incorrect source locations.

## Build pipeline and diagnosis

### 31. Which sequence best describes a common application build?

- A. Minify, edit generated output, then remove the source files.
- B. Find entry points, follow dependencies, transform or bundle as configured, optimize, then generate matching maps.
- C. Generate a source map before the source code exists.
- D. Add every polyfill before checking the target environments.

**Answer:** B.

**Explanation:** The exact pipeline varies by tool, but a build starts with source inputs and configuration and produces the final output and related maps.

### 32. Is the order of every build step identical across all tools?

**Answer:** No.

**Explanation:** Tools can combine steps or process files differently. Understand the configured toolchain instead of assuming one universal order.

### 33. What should you verify after running a production build?

**Answer:** That the command succeeds, expected files exist, and the output works in the intended runtime.

**Explanation:** A completed build does not by itself prove that deployed asset paths, lazy-loaded chunks, maps, and runtime behavior are correct.

### 34. Which result would a source map help explain?

- A. Why a request to a deleted source file returned 404.
- B. Which authored line corresponds to an error location in a minified bundle.
- C. Which browser a user installed.
- D. Whether an API is available on a user's device without running code.

**Answer:** B.

**Explanation:** A source map links generated positions to original source locations. It cannot answer unrelated environment or network questions by itself.

### 35. A bundle runs, but an older target throws because a browser API is missing. What should you review?

**Answer:** The target configuration and the project's polyfill or fallback strategy.

**Explanation:** Syntax transformation and bundling do not necessarily provide missing runtime APIs.

### 36. A source map opens a different source location from the code currently deployed. What should you check?

**Answer:** That the map was generated from the exact deployed output and source revision.

**Explanation:** A stale map may not correspond to the code that produced the observed error.

### 37. Which statement about a build target is correct?

- A. It is a guarantee that every test passes on every device.
- B. It guides the build's compatibility decisions for specified environments.
- C. It automatically installs all packages from npm.
- D. It tells a source map which source file to delete.

**Answer:** B.

**Explanation:** Targets inform transformations and compatibility work. Testing is still needed to verify the actual application.

### 38. A framework already creates optimized bundles. What should you check before adding another bundler?

**Answer:** The framework's existing build configuration and which parts of the pipeline it already handles.

**Explanation:** Adding overlapping tools can complicate configuration and produce duplicate or conflicting transformations.

### 39. Why might developers keep production source maps private?

**Answer:** To retain original-location debugging while limiting public exposure of source contents or paths.

**Explanation:** A team can upload maps to a restricted error-monitoring service rather than serving them publicly. The right policy depends on the project.

### 40. Which summary best distinguishes the four concepts in this chapter?

- A. Transpilers rewrite code, bundlers follow dependencies to produce bundles, polyfills supply missing runtime APIs, and source maps connect generated locations to source.
- B. Transpilers install dependencies, bundlers type-check, polyfills minify, and source maps run code.
- C. Transpilers and polyfills both only change file names, while bundlers and source maps change runtime APIs.
- D. All four terms mean the same build step.

**Answer:** A.

**Explanation:** These tools can be combined in one build, but each concept addresses a different part of transforming, deploying, or debugging an application.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [85 - ES modules and CommonJS in Node.js](../lessons/085-es-modules-and-commonjs-in-node-js.md) | [Lesson](../lessons/086-transpilation-bundlers-polyfills-and-source-maps.md) / [Example](../examples/086-transpilation-bundlers-polyfills-and-source-maps.md) | [87 - Testing fundamentals, assertions, and test design](../lessons/087-testing-fundamentals-assertions-and-test-design.md) |
