# 81 - Export and import forms Q&A

These questions review named and default exports, import aliases, namespace and side-effect imports, live bindings, re-exports, and common module-interface mistakes. Each answer follows its question.

## Named exports and aliases

### 1. What is a named export?

**Answer:** A binding that a module exposes under a specific public name.

**Explanation:** Another module imports it using that name, optionally choosing a different local name with `as`.

### 2. Which declaration exports a function named `formatDate`?

- A. `export function formatDate() {}`
- B. `public function formatDate() {}`
- C. `function export formatDate() {}`
- D. `import function formatDate() {}`

**Answer:** A.

**Explanation:** The `export` keyword can precede a function declaration in a module.

### 3. How can you export existing local bindings named `url` and `timeout`?

**Answer:** Write `export { url, timeout };` at the module's top level.

**Explanation:** An export list exposes selected local bindings without exporting every declaration in the module.

### 4. How do you export a local name `formatDateValue` as public name `formatDate`?

**Answer:** `export { formatDateValue as formatDate };`

**Explanation:** The local name remains `formatDateValue`; importers see `formatDate`.

### 5. Does an export alias rename the local variable in the exporting module?

**Answer:** No.

**Explanation:** `as` changes the name at the module boundary. References inside the exporting module continue to use the local name.

### 6. How can an importer locally call an exported `formatDate` by the name `displayDate`?

**Answer:** `import { formatDate as displayDate } from './dates.js';`

**Explanation:** The source module still exports `formatDate`; the importing module uses `displayDate` locally.

### 7. What is the purpose of braces in `import { save } from './storage.js'`?

**Answer:** They indicate that `save` is a named export.

**Explanation:** A default import uses no braces. Named and default exports have distinct import syntax.

### 8. Must the imported name match a named export exactly if no alias is used?

**Answer:** Yes.

**Explanation:** If the exporter provides `save`, `import { store }` requests a different name and fails during module linking unless `store` is also exported.

### 9. Can a module export a binding declared later in its source text?

**Answer:** Yes.

**Explanation:** An export list can name a binding declared later. The module is linked before its body is evaluated.

### 10. Can two different local bindings be exported under the same public name?

**Answer:** No, a module cannot provide conflicting duplicate export names.

**Explanation:** Rename one export or choose a single binding for that public name. Conflicting exports make the module invalid or its export resolution ambiguous.

## Default exports

### 11. How many default exports may one module have?

**Answer:** At most one.

**Explanation:** Export additional public values by name.

### 12. How do you import a default export from `logger.js`?

**Answer:** `import logger from './logger.js';`

**Explanation:** The importing module chooses the local name `logger`; it does not need to match the name used inside the exporter.

### 13. Does a default import use braces?

**Answer:** No.

**Explanation:** `import logger from './logger.js'` requests the default export. Braces are used for named imports.

### 14. How do you combine a default import and a named import?

**Answer:** `import logger, { level } from './logger.js';`

**Explanation:** The default local name comes first, followed by a comma and the named-import list in braces.

### 15. Can a default-exported function be anonymous?

**Answer:** Yes.

**Explanation:** A module may use `export default function () {}`. A named default function declaration is also allowed.

### 16. What does `export default 'ready';` export?

**Answer:** The value of the expression, the string `'ready'`, as the module's default export.

**Explanation:** A default export can be an expression, a function declaration, or a class declaration.

### 17. How do you export an existing local `let` binding named `theme` as the default live binding?

**Answer:** `export { theme as default };`

**Explanation:** This exports the binding itself. If the exporting module later assigns a new value to `theme`, importers observe the updated value when they read the import.

### 18. How does `export default theme` differ from `export { theme as default }`?

**Answer:** The first evaluates `theme` and exports that value at that point. The second exports the live binding named `theme`.

**Explanation:** If `theme` is reassigned later inside the module, the second form reflects the reassignment. An importer cannot assign to either imported binding.

### 19. Can a default export be imported locally using a named-import style?

**Answer:** Yes, with `import { default as logger } from './logger.js';`.

**Explanation:** This explicitly imports the export named `default` and aliases it to `logger`. The simpler conventional form is `import logger from './logger.js'`.

### 20. Which is a valid way to export two named functions and one default value?

- A. `export { first, second, default value };`
- B. `export function first() {}; export function second() {}; export default value;`
- C. `export default first, second;`
- D. `export all first, second, value;`

**Answer:** B.

**Explanation:** Named declarations and a single default export can appear in the same module. Each export declaration follows its own syntax.

## Import forms and live bindings

### 21. What does `import * as tools from './tools.js'` create?

**Answer:** A module namespace object named `tools` that exposes the module's exported names.

**Explanation:** If the module has a default export, it is available through `tools.default`.

### 22. Does a namespace import allow you to add new exports to the imported module?

**Answer:** No.

**Explanation:** A module namespace object represents the module's exports. It is not a mutable object for changing the module interface.

### 23. What does `import './setup.js';` do?

**Answer:** It loads and evaluates the module for its side effects without creating a local import binding.

**Explanation:** Use this form when evaluation itself is intentionally needed, such as registering a custom element.

### 24. Can a static `import` declaration appear inside an `if` block?

**Answer:** No.

**Explanation:** Static imports are module-level declarations. Use dynamic `import()` for conditional runtime loading; that topic is covered in Chapter 82.

### 25. Can an importer assign a new value to an imported `let` binding?

**Answer:** No.

**Explanation:** Imported bindings are read-only from the importing module, even when the exporter declared the original binding with `let`.

### 26. What does it mean that an imported binding is live?

**Answer:** A later read reflects updates made to that exported binding by its owning module.

**Explanation:** An import is not simply an independently writable copy of the value.

### 27. What is printed if `state.js` exports `let count = 0` and `increment()` changes it to `1`, then `app.js` logs the imported `count` again?

**Answer:** The later log prints `1`.

**Explanation:** The imported `count` is a live binding to the export. The importing module reads the updated value after the exporter changes it.

### 28. What is the difference between importing `{ save }` and importing `* as storage`?

**Answer:** The first creates a local binding for the named export `save`; the second creates a namespace object for the module's exports.

**Explanation:** Use the form that makes the dependency clear and convenient at the call site.

### 29. Does the order of names in a named import list determine when exports execute?

**Answer:** No.

**Explanation:** Static imports describe dependencies. The host links and evaluates the module graph according to module rules, not the order of names inside the braces.

### 30. Does `import { save as persist } from './storage.js'` change the exporter's API name?

**Answer:** No.

**Explanation:** It only changes the local imported name to `persist` in this module.

## Re-exports and common errors

### 31. What does `export { save } from './storage.js';` do?

**Answer:** It forwards the `save` export from `storage.js` as an export of the current module.

**Explanation:** It does not create a local `save` binding in the forwarding module.

### 32. How do you locally use a re-exported function inside the forwarding module too?

**Answer:** Import it locally, then export that local binding, such as `import { save } from './storage.js'; export { save };`.

**Explanation:** A direct `export ... from` declaration forwards a name but does not bind it for local statements.

### 33. Does `export * from './tools.js';` forward the other module's default export?

**Answer:** No.

**Explanation:** It forwards the other module's named exports. Re-export a default explicitly with `export { default } from './tools.js';` or give it a name with `export { default as tools } from './tools.js';`.

### 34. What does `export * as math from './math.js';` provide to importers?

**Answer:** A named export called `math` whose value is the namespace object for `math.js`.

**Explanation:** It forwards a module namespace under one public name and does not create a local `math` binding in the current module.

### 35. How do you re-export a default export under the named export `createSlug`?

**Answer:** `export { default as createSlug } from './slugify.js';`

**Explanation:** The `default` name identifies the other module's default export, while `createSlug` becomes the public name of this module.

### 36. What can happen when two `export *` declarations provide the same name from different bindings?

**Answer:** That name becomes ambiguous and cannot be imported by that name from the forwarding module.

**Explanation:** An explicit export of the intended binding takes precedence and clarifies the public interface.

### 37. What does a syntax error for two `export default` declarations usually indicate?

**Answer:** The module declares more than one default export.

**Explanation:** Keep one default export and expose additional values through named exports.

### 38. What commonly causes a module-linking error for `import { store } from './storage.js'`?

**Answer:** The requested module does not export a named binding called `store`.

**Explanation:** Check the export name, spelling, capitalization, and whether the value is default or named.

### 39. Why does this code fail to call `save` inside the forwarding module?

~~~js
export { save } from './storage.js';
save();
~~~

**Answer:** The re-export does not create a local binding named `save`.

**Explanation:** Add a local import if the forwarding module itself needs to call the function, then export that imported binding.

### 40. Which statement best describes a clear module interface?

- A. Export every local variable and use globals to avoid import syntax.
- B. Use explicit named or default exports, import only what is needed, and re-export intentionally.
- C. Use `export *` everywhere so consumers never need to know file boundaries.
- D. Treat imported bindings as writable local variables.

**Answer:** B.

**Explanation:** Explicit interfaces show dependencies, keep implementation details private, and make the module's public API easier to understand.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [80 - Modules: scripts, modules, and module scope](../lessons/080-modules-scripts-modules-and-module-scope.md) | [Lesson](../lessons/081-export-and-import-forms.md) · [Example](../examples/081-export-and-import-forms.md) | [82 - Dynamic imports and import attributes](../lessons/082-dynamic-imports-and-import-attributes.md) |
