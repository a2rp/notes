# 1. JavaScript, ECMAScript, and the runtime

JavaScript is the language you write; **ECMAScript** is the standard that defines its core syntax and behavior. Browsers add Web APIs such as `document`, `fetch`, and `localStorage`. Node.js adds server APIs such as `process`, filesystem access, and streams. A feature available in one host is not automatically part of the language or available in every other host.

## From source to behavior

A JavaScript engine parses source, creates execution contexts, and evaluates code. Browsers and Node use engines such as V8, SpiderMonkey, and JavaScriptCore. Bundlers and transpilers can transform syntax and combine files, but they do not change the language's underlying runtime model. Polyfills can supply some missing APIs; they cannot safely emulate every platform capability.

A browser script can be loaded as a classic script or as an ES module. Modules have their own scope, use `import` and `export`, and run in strict mode. In Node, `.mjs` and package `"type": "module"` identify ES modules; `.cjs` identifies CommonJS. Choose one module system intentionally in a project.

```js
// An ES module can run in a browser or a supported Node.js runtime.
export function greet(name) {
  return "Hello, " + name;
}
```

## Run JavaScript

Use the browser console for a quick experiment, or run a file with a supported Node.js version:

```sh
node --version
node app.mjs
```

Prefer small experiments that isolate one idea. Read the first error and its line before changing unrelated code. For browser-specific behavior, test in a browser; Node does not provide a DOM by default.

## A safe mental model

- Values have types; variables hold references or primitive values.
- Functions create scopes and can retain access to their lexical environment.
- Objects and arrays are mutable unless your code treats them immutably.
- Async operations schedule future work; they do not make CPU-heavy code parallel.
- The host determines which APIs exist.

## References

- [ECMAScript 2026 specification](https://tc39.es/ecma262/2026/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)
- [Node.js: ECMAScript modules](https://nodejs.org/api/esm.html)
