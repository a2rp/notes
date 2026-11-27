# 89 - Formatting, linting, JSDoc, and editor tooling

## Question

A small JavaScript project has a price calculation that other modules use. The team wants readable API documentation and editor hints, consistent formatting, useful lint diagnostics, and one repeatable command for local checks and CI.

How can you document the API, configure the tools, and verify the behavior?

## Project structure

~~~text
tooling-example/
  src/
    pricing.js
  tests/
    pricing.test.js
  .vscode/
    settings.json
  .prettierignore
  .prettierrc.json
  eslint.config.mjs
  jsconfig.json
  package.json
~~~

## 1. Create the project and install tools

Initialize a Node.js project and install the formatter and linter as local development dependencies:

~~~bash
npm init -y
npm install --save-dev --save-exact prettier eslint @eslint/js globals
~~~

The exact package versions are recorded in the generated package manifest and lockfile. Use a Node.js version supported by the ESLint version selected for the project.

Set the project to use ECMAScript modules and add scripts to the existing package manifest. Keep the other generated fields and dependencies:

~~~json
{
  "type": "module",
  "scripts": {
    "test": "node --test",
    "lint": "eslint src tests",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "check": "npm run format:check && npm run lint && npm test"
  }
}
~~~

The package manifest must retain the development dependencies created by the install command. The snippet shows the fields to add or merge.

## 2. Document and implement the API

~~~js
// src/pricing.js

/**
 * A product available for purchase.
 *
 * @typedef {Object} Product
 * @property {string} name - Human-readable product name.
 * @property {number} price - Non-negative price in currency units.
 */

/**
 * Applies a percentage discount to a non-negative subtotal.
 *
 * @param {number} subtotal - Original subtotal in currency units.
 * @param {number} percentage - Discount percentage from 0 through 100.
 * @returns {number} Subtotal after the discount.
 * @throws {RangeError} If an input is non-finite or outside its allowed range.
 * @example
 * applyDiscount(100, 25);
 * // 75
 */
export function applyDiscount(subtotal, percentage) {
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new RangeError('subtotal must be a finite non-negative number');
  }

  if (
    !Number.isFinite(percentage) ||
    percentage < 0 ||
    percentage > 100
  ) {
    throw new RangeError('percentage must be between 0 and 100');
  }

  return subtotal * (1 - percentage / 100);
}

/**
 * Creates a label that shows a product name and price.
 *
 * @param {Product} product - Product to format.
 * @returns {string} Product name followed by a two-decimal price.
 * @throws {TypeError} If the product does not have a valid name and price.
 */
export function formatProductLabel(product) {
  if (
    !product ||
    typeof product.name !== 'string' ||
    product.name.length === 0 ||
    !Number.isFinite(product.price) ||
    product.price < 0
  ) {
    throw new TypeError('product must have a name and non-negative price');
  }

  return product.name + ' - $' + product.price.toFixed(2);
}
~~~

The JSDoc comments describe the public contract and a reusable object shape. The code still validates runtime values because annotations alone do not validate data.

## 3. Add behavior tests

~~~js
// tests/pricing.test.js
import assert from 'node:assert/strict';
import test from 'node:test';
import { applyDiscount, formatProductLabel } from '../src/pricing.js';

test('applies a percentage discount', () => {
  assert.equal(applyDiscount(100, 25), 75);
});

test('allows a full discount', () => {
  assert.equal(applyDiscount(40, 100), 0);
});

test('rejects a negative subtotal', () => {
  assert.throws(() => applyDiscount(-1, 10), RangeError);
});

test('rejects a percentage above the allowed range', () => {
  assert.throws(() => applyDiscount(100, 101), RangeError);
});

test('formats a product label using the documented shape', () => {
  assert.equal(
    formatProductLabel({ name: 'Notebook', price: 4.5 }),
    'Notebook - $4.50'
  );
});

test('rejects a product with an invalid price', () => {
  assert.throws(
    () => formatProductLabel({ name: 'Notebook', price: Number.NaN }),
    TypeError
  );
});
~~~

These tests check the contract, valid boundaries, and validation behavior. They do not rely on private implementation details.

## 4. Configure JavaScript checking

~~~json
{
  "compilerOptions": {
    "checkJs": true,
    "target": "ES2022"
  },
  "include": ["src/**/*.js"]
}
~~~

Save this as **jsconfig.json**. The editor can use JSDoc and inferred types to report some incorrect arguments or property accesses in the source files.

## 5. Configure ESLint

~~~js
// eslint.config.mjs
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**']
  },
  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      globals: globals.node
    },
    plugins: { js },
    extends: ['js/recommended']
  }
]);
~~~

This configuration applies recommended JavaScript rules to the source and test files and identifies the Node.js runtime globals. If some files run in a browser, configure browser globals for those files instead of treating every file as Node code.

## 6. Configure Prettier

~~~json
{
  "singleQuote": true,
  "semi": true
}
~~~

Save this as **.prettierrc.json**. Keep a **.prettierignore** file for generated or unsuitable files:

~~~text
node_modules/
coverage/
dist/
package-lock.json
~~~

The ignore list keeps installed dependencies, build artifacts, coverage output, and the generated lockfile out of formatting runs.

## 7. Connect the editor

A Visual Studio Code workspace can select the Prettier extension as the JavaScript formatter and format JavaScript files on save:

~~~json
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
~~~

Save this as **.vscode/settings.json**. The extension must be installed in the editor. ESLint's editor extension can show configured diagnostics and offer fixes. The command-line scripts remain the shared source of validation for the whole team.

## 8. Run the checks

Run the unit tests:

~~~bash
npm test
~~~

Check lint rules:

~~~bash
npm run lint
~~~

Check formatting without changing files:

~~~bash
npm run format:check
~~~

To format files locally, use:

~~~bash
npm run format
~~~

Run all non-writing checks with one command:

~~~bash
npm run check
~~~

A successful check reports six passing tests, no ESLint errors, and no files requiring formatting. Exact terminal output depends on the selected tool versions.

## Expected result

- The discount function returns 75 for a subtotal of 100 with a 25 percent discount.
- The formatter keeps the source and tests consistently laid out.
- ESLint checks the configured source and test files.
- JSDoc gives the editor useful parameter and product-shape information.
- The project check command runs formatting validation, linting, and tests.
- Invalid inputs still fail at runtime because the implementation validates them.

## Explanation

- JSDoc describes API expectations and does not replace runtime validation.
- The typedef allows the editor to offer product property hints.
- ESLint and Prettier have separate jobs and are configured with a clear division.
- The lockfile and local development dependencies make tool versions reproducible.
- The formatter's check command is safe for CI because it reports changes instead of writing them.
- The editor improves the feedback loop, while scripts let every contributor and CI run the same checks.

## Try another case

Change the product label to include a currency code instead of a dollar sign. Update the JSDoc example, behavior test, and formatter output. Then run the check command and inspect the diff before committing.

## Key points

- Document reusable JavaScript APIs with accurate JSDoc.
- Keep runtime validation for values that can be invalid at runtime.
- Let Prettier format files and ESLint check selected code patterns.
- Use local, recorded tool versions and a shared lockfile.
- Use editor support for fast feedback and command-line scripts for repeatable checks.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [88 - Test runners, mocking, and browser testing](../lessons/088-test-runners-mocking-and-browser-testing.md) | [Open lesson](../lessons/089-formatting-linting-jsdoc-and-editor-tooling.md) | [Open Q&A](../qnas/089-formatting-linting-jsdoc-and-editor-tooling.md) | [90 - The asynchronous programming model](../lessons/090-the-asynchronous-programming-model.md) |
