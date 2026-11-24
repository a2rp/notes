# 11. ES modules and project tooling

ES modules split a program into files with explicit imports and exports. Prefer named exports for multiple public values and a default export when a module has one primary value. Imports are resolved before a module runs; static imports make dependencies visible to tools and easier to analyze.

A module named math.js can export a helper:

```js
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
```

Another module imports that binding:

```js
import { clamp } from "./math.js";
console.log(clamp(12, 0, 10));
```

Module exports are live bindings: an importing module observes later updates to an exported binding, but should not assign to the imported name. Module code has its own top-level scope and runs in strict mode. Avoid large modules that mix UI, network, formatting, and persistence responsibilities.

## Dynamic imports and package boundaries

Use `import()` for code that should load only when needed, such as a rarely opened feature. It returns a Promise. In Node, package metadata and file extensions determine whether a file is parsed as ESM or CommonJS. Follow the package's declared module format instead of guessing from the syntax.

A package manager installs declared dependencies from the lockfile. Commit the lockfile for applications so contributors and CI resolve the same dependency graph. Keep runtime dependencies and development-only tools separate.

## Tooling roles

- A linter reports suspicious or inconsistent code.
- A formatter applies consistent layout.
- A bundler packages modules and assets for a target.
- A transpiler can transform syntax for older runtimes.
- A test runner executes behavior checks.

These tools do not replace understanding the runtime. Verify browser and Node compatibility, and do not add a build tool to a small script unless it provides a clear benefit.

## References

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Node.js: ECMAScript modules](https://nodejs.org/api/esm.html)
- [Node.js: Packages](https://nodejs.org/api/packages.html)
