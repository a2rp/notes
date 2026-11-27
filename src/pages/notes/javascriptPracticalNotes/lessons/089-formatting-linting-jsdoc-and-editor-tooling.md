# 89 - Formatting, linting, JSDoc, and editor tooling

A maintainable JavaScript project benefits from consistent formatting, automated checks, useful documentation, and a well-configured editor. These tools have different jobs: a formatter changes layout, a linter reports suspicious code patterns, JSDoc explains APIs and can supply type information, and editor tooling makes that information available while you work.

This chapter shows how the pieces can work together without treating one tool as a replacement for the others.

## Learning goals

After this chapter, you should be able to:

- Explain the difference between formatting, linting, and type-oriented documentation.
- Use JSDoc to document parameters, return values, errors, and object shapes.
- Understand how JSDoc can improve editor hints in JavaScript.
- Configure a project to run formatting and linting consistently.
- Use editor settings and project configuration that work for a team.
- Keep generated files and dependencies out of formatting and linting.

## Formatting and linting solve different problems

A **formatter** applies consistent layout rules, such as indentation, quote style, and line wrapping. It reduces style-only review discussions and makes diffs more predictable.

A **linter** checks code for selected patterns that may indicate mistakes or inconsistency. A rule might report an unused variable, an undefined name, or a suspicious condition. Lint rules are configurable, and different projects can choose different policies.

Neither tool proves that a program is correct:

- Formatting changes presentation, not intended behavior.
- Linting checks configured rules, not every possible runtime failure.
- A clean lint report does not replace tests or review.
- A formatted file can still contain a logical bug.

Use each tool for the kind of feedback it is designed to provide.

## Keep the toolchain reproducible

Install project tools locally and record them in the project's development dependencies. Commit the package manifest and lockfile so team members and CI can use the same dependency versions.

For example, a project can install a formatter as a development dependency with an exact version:

~~~bash
npm install --save-dev --save-exact prettier
~~~

A project can add its linter and the JavaScript recommended rules as development dependencies:

~~~bash
npm install --save-dev eslint @eslint/js globals
~~~

The exact versions available change over time. Use the versions selected for the project and keep its lockfile current. Avoid depending on an unpinned temporary download for routine formatting because a formatter update can change output.

## Format with Prettier

Prettier formats supported files using a consistent set of rules. Run it on a specific file, directory, or the project:

~~~bash
npx prettier src/ --write
~~~

The **write** mode changes files. A check-only run reports files that need formatting without rewriting them:

~~~bash
npx prettier . --check
~~~

For a team, run the check in CI and format files locally or through the editor. Keep generated output, dependencies, and other unsuitable files out of the formatter's input.

A simple ignore file might contain:

~~~text
node_modules/
dist/
coverage/
~~~

Prettier can also read configuration from a project config file. A small JSON configuration can make a few shared preferences explicit:

~~~json
{
  "singleQuote": true,
  "semi": true
}
~~~

Only add options the project actually wants to maintain. If the defaults are acceptable, a config file is not required.

## Lint with ESLint

ESLint analyzes JavaScript against configured rules. Current ESLint versions use the flat configuration format, typically in a root-level file such as **eslint.config.mjs**.

Here is a small browser-source configuration using the recommended JavaScript rules:

~~~js
// eslint.config.mjs
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: globals.browser
    },
    plugins: { js },
    extends: ["js/recommended"]
  }
]);
~~~

This configuration applies to JavaScript files under **src/** and identifies standard browser names such as **window** and **document**. A Node.js project should configure Node globals for the files that run in Node. A mixed project can use separate configuration objects with different file patterns and globals.

Run the linter from the command line:

~~~bash
npx eslint .
~~~

Use rules that match the project's runtime and codebase. An undefined browser global may mean the configuration is wrong rather than that the source is wrong. Read a diagnostic before changing code or disabling a rule.

### Coordinate ESLint and Prettier

ESLint can enforce some stylistic rules, and Prettier formats style. If both tools disagree about the same layout decision, developers can receive conflicting diagnostics. A project can keep ESLint focused on code-quality rules and use a compatibility configuration to turn off overlapping stylistic rules.

Make the division clear:

- Prettier owns automatic formatting.
- ESLint reports selected code patterns and errors.
- Tests verify behavior.
- Review checks intent, maintainability, and risks outside those automated rules.

## Document JavaScript with JSDoc

JSDoc comments explain what a function expects and returns. They can also help editors provide parameter hints, completions, and diagnostics while keeping the implementation in JavaScript.

~~~js
/**
 * Calculates the price after a percentage discount.
 *
 * @param {number} price - Original price in currency units.
 * @param {number} percentage - Discount from 0 through 100.
 * @returns {number} Price after applying the discount.
 * @throws {RangeError} If an input is outside its allowed range.
 */
export function applyDiscount(price, percentage) {
  if (!Number.isFinite(price) || price < 0) {
    throw new RangeError("price must be a finite non-negative number");
  }

  if (
    !Number.isFinite(percentage) ||
    percentage < 0 ||
    percentage > 100
  ) {
    throw new RangeError("percentage must be between 0 and 100");
  }

  return price * (1 - percentage / 100);
}
~~~

The comment describes the function's contract. It does not change JavaScript runtime behavior. The implementation still performs the validation and calculation.

Common tags include:

- **@param** for a parameter and its type or meaning.
- **@returns** for the returned value.
- **@throws** for documented error conditions.
- **@example** for a small usage sample.
- **@typedef** for a reusable object or function type.
- **@deprecated** when callers should move to another API.

Keep comments accurate. A stale JSDoc block can mislead callers more than a missing one.

### Document object shapes

A typedef can describe an object passed between functions:

~~~js
/**
 * A product shown in the catalog.
 *
 * @typedef {Object} Product
 * @property {string} name - Human-readable product name.
 * @property {number} price - Price in currency units.
 */

/**
 * Formats a product label for display.
 *
 * @param {Product} product - Product to describe.
 * @returns {string} Name followed by its price.
 */
export function formatProduct(product) {
  return product.name + " - " + product.price.toFixed(2);
}
~~~

This annotation helps readers understand the expected shape and can improve editor suggestions. Runtime validation is still a separate concern if data can be missing or untrusted.

## Enable JavaScript checking in the project

Editors can infer a great deal from JavaScript, but a project can ask the language service to check more code. A **jsconfig.json** file configures JavaScript projects in editors such as Visual Studio Code.

~~~json
{
  "compilerOptions": {
    "checkJs": true,
    "target": "ES2022"
  },
  "include": ["src/**/*.js"]
}
~~~

With checking enabled, the editor can report some type mismatches and invalid property uses based on inference and JSDoc. This is static feedback. It does not execute the code and does not replace tests.

For a smaller file-level trial, a **// @ts-check** comment can enable checking for that JavaScript file in supported editors.

## Use editor tooling consistently

A code editor can combine language understanding, JSDoc hints, lint diagnostics, and formatting actions:

- Completion suggests names and members available in the current context.
- Parameter help shows a function's expected arguments.
- Hover information can display a JSDoc description and inferred type.
- Diagnostics point out configured lint or JavaScript errors.
- Format Document applies the project's selected formatter.
- Rename and code navigation help update or inspect symbols.

Visual Studio Code includes JavaScript language features. Formatter and linter extensions connect the editor to project tools. Install the extensions the project uses, choose the workspace formatter, and confirm the editor is using the repository's local tool versions.

Editor settings can enable format-on-save for JavaScript:

~~~json
{
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
~~~

The project's command-line scripts and CI remain important. Editors differ, and not every contributor uses the same editor. A saved file should still pass the documented command-line checks.

## Add clear project scripts

Scripts make routine checks discoverable. A project might define:

~~~json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "check": "npm run lint && npm run format:check"
  }
}
~~~

Add these entries to the existing **scripts** object and retain the project's other package fields. Run a formatter only when you intend it to change files. CI should use the check mode so validation does not rewrite the working tree.

A useful contributor workflow is:

1. Edit code and keep JSDoc aligned with the implementation.
2. Format changed files.
3. Run lint and the project's tests.
4. Review the final diff for accidental edits.
5. Let CI repeat the documented checks.

## Keep documentation proportional

Not every local variable needs a comment. Prefer JSDoc for exported functions, reusable modules, complex object shapes, and APIs where callers benefit from a contract. Avoid restating an obvious implementation line by line.

A useful doc comment helps answer one or more of these questions:

- What does this API do?
- What inputs does it accept?
- What does it return?
- What errors can callers expect?
- What assumptions or side effects matter?

Update or remove documentation when the behavior changes.

## Key points

- Formatters normalize layout; linters apply configured code rules.
- Keep project tools and lockfiles consistent across contributors and CI.
- JSDoc documents contracts and can improve editor hints, but does not validate values at runtime.
- Use JSDoc types and project JavaScript checking where they add useful feedback.
- Treat editor conveniences as part of a shared workflow, not the only source of validation.
- Keep documentation useful and aligned with current behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [88 - Test runners, mocking, and browser testing](088-test-runners-mocking-and-browser-testing.md) | [Open Q&A](../qnas/089-formatting-linting-jsdoc-and-editor-tooling.md) | [Open example](../examples/089-formatting-linting-jsdoc-and-editor-tooling.md) | [90 - The asynchronous programming model](090-the-asynchronous-programming-model.md) |
