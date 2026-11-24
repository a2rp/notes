# 8. Modern syntax and data transformation

Modern JavaScript syntax helps express intent, but concise code is not automatically clear. Destructuring reads values from arrays or objects; defaults apply when the selected value is `undefined`, not when it is `null`.

```js
const { title = "Untitled", author: owner } = article;
const [first, second, ...remaining] = values;
```

Spread syntax expands an iterable or copies enumerable own properties into a new array or object. These are shallow operations. Rest syntax gathers remaining parameters or properties. In a function signature, rest parameters must be last.

## Optional and fallback values

Optional chaining (`?.`) stops a property, element, or function call when the left side is `null` or `undefined`. It does not make every possible error disappear. Nullish coalescing (`??`) uses a fallback only for `null` or `undefined`; `||` uses it for all falsy values.

```js
const displayName = account?.profile?.name ?? "Guest";
const suppliedLimit = config.limit ?? 20; // preserves a valid zero
```

Do not mix `??` with `&&` or `||` without parentheses; the grammar requires explicit grouping. Logical assignment operators (`||=`, `&&=`, `??=`) combine a test with assignment, but use them only when the condition reads naturally.

## Transforming data

Keep transformations small and explicit. Use object spread to update a top-level field without mutating the original:

```js
const updated = {
  ...user,
  preferences: { ...user.preferences, theme: "light" },
};
```

This copies only the levels shown. For deeply nested updates, normalize the data shape or use a well-understood immutable update helper instead of assuming spread performs a deep clone.

## Compatibility

Syntax support and API support are separate. A build tool may transform syntax for older targets, but a runtime API may need a polyfill or a different implementation. Check the browsers and Node versions your app supports.

## References

- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN: Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
