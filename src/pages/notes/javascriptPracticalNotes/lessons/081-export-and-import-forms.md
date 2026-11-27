# 81 - Export and import forms

JavaScript modules share values through explicit exports and imports. The syntax supports named exports, a default export, aliases, namespace imports, side-effect imports, and re-exporting. Choosing a clear form makes a module's public interface easier to read and maintain.

## Learning goals

- Write named exports as declarations and as export lists.
- Create and consume a default export.
- Import named, default, and namespace exports, including aliases.
- Load a module for its side effects without importing a binding.
- Re-export values from another module and understand wildcard exports.
- Recognize live imported bindings and common syntax or linking errors.
- Design small, clear module interfaces.

## A module's public interface

A module can use its own declarations internally. Other modules can access only the bindings that it exports. An import names a value in another module's public interface.

~~~js
// greetings.js
const punctuation = '!';

export function greet(name) {
  return 'Hello, ' + name + punctuation;
}
~~~

~~~js
// main.js
import { greet } from './greetings.js';

console.log(greet('Asha'));
~~~

The `punctuation` binding remains private to **greetings.js**. The function `greet` is part of that module's interface. The example assumes these files are loaded as modules by their host.

Static `import` and `export` declarations must appear at the top level of a module. They can be written among the module's other top-level statements, but not inside a function, block, or conditional. A browser entry script is marked with `type="module"`; see the previous chapter.

## Named exports

A module may expose multiple named bindings. Names are explicit and can be imported individually.

### Export declarations

Use `export` before a supported declaration:

~~~js
// geometry.js
export const pi = 3.14159;

export function areaOfCircle(radius) {
  return pi * radius * radius;
}

export class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}
~~~

Variable declarations with `var`, `let`, or `const`, as well as function and class declarations, can be exported this way. The exported name is the declared name.

### Export lists

A module can declare its local values first and export selected names in a list:

~~~js
// settings.js
const endpoint = '/api';
const timeout = 5000;
const internalVersion = 2;

export { endpoint, timeout };
~~~

Only `endpoint` and `timeout` are exported. `internalVersion` stays private. An export list refers to bindings in the module; it is not an object literal and it does not create a snapshot object.

### Rename an exported name

Use `as` to expose a local binding under a different public name:

~~~js
// dates.js
function formatDateValue(date) {
  return date.toISOString().slice(0, 10);
}

export { formatDateValue as formatDate };
~~~

The local name remains `formatDateValue`. Importers see the public name `formatDate`.

An export list can refer to a binding declared later in the module:

~~~js
export { makeLabel };

function makeLabel(value) {
  return '[' + value + ']';
}
~~~

This is a module declaration, not an attempt to read `makeLabel` at the location of the export list. The module's declarations are linked before its body is evaluated.

## Default exports

A module can have at most one default export. It is useful when the module's main purpose is one primary value, such as a component, a class, or a factory function.

### Default function or class

~~~js
// slugify.js
export default function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(' ', '-');
}
~~~

A default function or class declaration may be named or anonymous. A named default declaration also has a local name that the module can use.

~~~js
// token.js
export default class Token {
  constructor(value) {
    this.value = value;
  }
}
~~~

### Default expression

An expression can be the default export:

~~~js
// build-info.js
const release = '1.0.0';
export default 'Release ' + release;
~~~

The expression is evaluated as the module executes, and the resulting value is exported. A default export of an expression is not the same as a live export of a local variable that may later be reassigned.

### Export an existing binding as default

A local binding can be listed under the public name `default`:

~~~js
// config.js
let activeTheme = 'light';

export { activeTheme as default };

export function setTheme(theme) {
  activeTheme = theme;
}
~~~

This form exports a live binding. If the module updates `activeTheme`, an importer that reads its default import again observes the updated value. The importer still cannot assign to the imported binding.

Compare these forms:

~~~js
const value = 1;
export default value;
~~~

~~~js
let value = 1;
export { value as default };
~~~

The first exports the value produced by evaluating the expression `value` at that point. The second exports the binding itself, so reassignment of `value` inside its module updates what importers observe.

## Import forms

An import declaration names a module specifier and optionally one or more exported bindings.

### Import named exports

Use braces and the exact exported names:

~~~js
import { pi, areaOfCircle } from './geometry.js';

console.log(areaOfCircle(2));
~~~

These are named imports. The imported names are read-only in the importing module and refer to live exported bindings.

### Rename an imported name

Use `as` to give an imported binding a local name:

~~~js
import { areaOfCircle as circleArea } from './geometry.js';

console.log(circleArea(2));
~~~

The exporter still calls the public binding `areaOfCircle`. Only the local name in this file changes.

### Import a default export

Write the local name before any braces:

~~~js
import slugify from './slugify.js';

console.log(slugify('Hello World'));
~~~

The local name does not have to match a name used inside the exporting module. The keyword `default` identifies the exported slot, and the importing module chooses the local binding name.

### Import a default and named exports together

~~~js
import slugify, { version, normalize } from './text-tools.js';
~~~

A default import can be combined with named imports. Keep the braces around the named exports.

### Import all named exports as a namespace

~~~js
import * as geometry from './geometry.js';

console.log(geometry.pi);
console.log(geometry.areaOfCircle(3));
~~~

The local name `geometry` refers to the module namespace object. Named exports are available as its properties. If the module has a default export, it is also available on the namespace object as `geometry.default`.

This namespace object is different from importing `*` into an ordinary object. It represents the module's exports and is not a place to assign new exports.

### Import only for side effects

An import can load a module without binding any of its exports:

~~~js
import './register-custom-elements.js';
~~~

This is called a side-effect import. It is appropriate when the module performs an intentional setup action on evaluation, such as registering a custom element. Use it sparingly because the importing file does not show a named value that explains the dependency.

### Import syntax at a glance

| Form | Example | Local result |
| --- | --- | --- |
| Named | `import { save } from './storage.js';` | The `save` export binding |
| Named alias | `import { save as persist } from './storage.js';` | The `save` export under local name `persist` |
| Default | `import logger from './logger.js';` | The default export under local name `logger` |
| Default and named | `import logger, { level } from './logger.js';` | The default and named bindings |
| Namespace | `import * as storage from './storage.js';` | A namespace object for the module's exports |
| Side effect | `import './setup.js';` | No local import binding |

A static import declaration is not an expression. It cannot be selected with `if`, placed inside a function, or caught with `try` and `catch`. Chapter 82 covers loading a module conditionally with dynamic `import()`.

## Re-exporting

A module can pass through exports from another module. This is often used by a small public entry point that gathers a package's API.

### Re-export selected names

~~~js
// public-api.js
export { areaOfCircle, Rectangle } from './geometry.js';
~~~

The names become exports of **public-api.js**. They do not become local variables inside **public-api.js**.

To re-export a name under a different public name:

~~~js
export { areaOfCircle as circleArea } from './geometry.js';
~~~

### Re-export a default export by name

A default export from another module can be given an explicit named export:

~~~js
export { default as slugify } from './slugify.js';
~~~

Or it can be forwarded as the default export of this module:

~~~js
export { default } from './slugify.js';
~~~

The form `export DefaultThing from './module.js'` is not standard JavaScript syntax. Name the default export using `export { default as DefaultThing } from './module.js'`.

### Re-export all named exports

~~~js
export * from './geometry.js';
~~~

This forwards the other module's named exports, but does not forward its default export. Use an explicit export when the default should be forwarded.

~~~js
export { default } from './slugify.js';
export * from './text-tools.js';
~~~

If multiple wildcard exports provide the same name from different bindings, that name is ambiguous. An explicit export of that name can resolve the ambiguity. Prefer explicit re-exports for a stable, easy-to-understand public API.

### Re-export a module namespace

~~~js
export * as geometry from './geometry.js';
~~~

Importers of this file can access the forwarded module through the `geometry` namespace export:

~~~js
import { geometry } from './public-api.js';

console.log(geometry.areaOfCircle(3));
~~~

This forwarding syntax does not create a local `geometry` variable in **public-api.js**. To both use a namespace locally and export it, import and export it explicitly:

~~~js
import * as geometry from './geometry.js';
export { geometry };
~~~

## Live bindings and read-only imports

An import refers to an exported binding rather than a writable local copy. The exporting module may update a `let` binding, and importers observe the updated value when they read it. An importer cannot assign to the imported name.

~~~js
// status.js
export let currentStatus = 'ready';

export function markBusy() {
  currentStatus = 'busy';
}
~~~

~~~js
// app.js
import { currentStatus, markBusy } from './status.js';

console.log(currentStatus);
markBusy();
console.log(currentStatus);
~~~

The output is:

~~~text
ready
busy
~~~

This assignment in **app.js** is invalid:

~~~js
currentStatus = 'done';
~~~

The module that owns the binding controls its updates. Consumers request changes through exported functions or other explicit APIs.

## Common errors

### Using an export that the module does not provide

~~~js
// module.js exports save, not store
export function save() {}
~~~

~~~js
import { store } from './module.js';
~~~

The requested name does not match the module's exports, so module linking fails before the importing module body runs.

### Using braces for a default export

~~~js
import { slugify } from './slugify.js';
~~~

If **slugify.js** only has a default export, this requests a named export called `slugify`, which it does not provide. Use `import slugify from './slugify.js'` for its default export.

### Importing a named export without braces

~~~js
import save from './storage.js';
~~~

This requests the default export. If **storage.js** exports only a named `save`, use `import { save } from './storage.js'`.

### Declaring more than one default export

A module can have only one default export. Two `export default` declarations are a syntax error. Use named exports for additional values.

### Exporting the same public name more than once

A module cannot expose duplicate export names through conflicting explicit declarations. Rename one of the bindings or intentionally select one export in the module's interface.

### Expecting a re-export to be a local binding

~~~js
export { save } from './storage.js';

save();
~~~

The first line forwards the name but does not create a local `save` binding. Import the name locally if this module also needs to call it:

~~~js
import { save } from './storage.js';
export { save };

save();
~~~

## Choosing an export style

- Use named exports when a module has several related functions, constants, or classes.
- Use a default export when the module has one obvious primary value and the project benefits from that convention.
- Avoid exporting implementation details that consumers do not need.
- Choose clear names so imports explain where a function or value came from.
- Alias a name at the import or export boundary when that improves clarity or resolves a collision.
- Use side-effect imports only when evaluation itself is the intended operation.
- Keep re-export modules focused. A large barrel that forwards everything can hide dependencies and create ambiguous names.
- Be consistent across a project. A default export and a named export are both valid, but inconsistent conventions can make files harder to scan.

## Try it yourself

1. Export a constant and a function from one module, then import both by name.
2. Rename a local function with an export alias, then rename it again when importing it elsewhere.
3. Change a named export into a default export and update the import syntax to match.
4. Export a local `let` binding as default, update it through a function, and observe the new value from an importer.
5. Create a public API module that explicitly re-exports selected functions from two modules.
6. Add a default export and a named export to the same module, then import both together.
7. Add a side-effect import for a module that registers a custom element.
8. Try to call a re-exported name inside the forwarding module, then add a local import and export to make that binding available.
9. Create two modules that each export a function named `format`, then import one as `formatDate` and the other as `formatCurrency`.
10. Add two wildcard re-exports with a matching name and inspect how an explicit export can make the intended public name clear.

## Key points

- Named exports are imported using braces and their public names.
- `as` can rename a binding at the import or export boundary.
- A module may have one default export, imported without braces under a chosen local name.
- Imports are read-only live bindings, not assignable local variables.
- Namespace imports expose a module's exports through one namespace object.
- A side-effect import loads a module without creating a local binding.
- Re-exports forward names without creating local bindings in the forwarding module.
- `export *` forwards named exports but excludes the default export.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [80 - Modules: scripts, modules, and module scope](080-modules-scripts-modules-and-module-scope.md) | [Open Q&A](../qnas/081-export-and-import-forms.md) | [Open example](../examples/081-export-and-import-forms.md) | [82 - Dynamic imports and import attributes](082-dynamic-imports-and-import-attributes.md) |
