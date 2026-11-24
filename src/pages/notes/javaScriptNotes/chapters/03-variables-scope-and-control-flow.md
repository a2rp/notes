# 3. Variables, scope, and control flow

Use `const` by default, `let` when a binding must be reassigned, and avoid `var` in new code. `var` is function-scoped and can be redeclared; `let` and `const` are block-scoped. A `let` or `const` binding exists from the start of its block but cannot be read before its declaration is initialized. This period is the **temporal dead zone**.

```js
const label = "outer";

function describe(enabled) {
  if (enabled) {
    const label = "active"; // a separate block-scoped binding
    return label;
  }
  return label;
}
```

Keep variables close to where they are used. Narrow scope reduces accidental reuse and makes the lifetime of state easier to understand. Prefer explicit reassignment over mutating a shared outer variable from many branches.

## Branching and loops

Use `if` for branching and `switch` when matching one value against several cases. Include `break` or return from each `switch` case unless fall-through is deliberate. Use `for...of` for values in an iterable such as an array; `for...in` enumerates object keys and is usually not the right way to walk an array.

```js
for (const item of items) {
  if (!item.enabled) continue;
  process(item);
}
```

`break` exits a loop; `continue` skips to the next iteration. For search operations, array methods such as `find`, `some`, and `every` can express intent more clearly than manual index bookkeeping.

## Avoid surprising coercion

Conditions convert values to booleans. Compare values explicitly when the rule matters: `count > 0`, `status === "ready"`, or `value != null` when intentionally accepting both `null` and `undefined`. Do not depend on implicit string-to-number conversion for business rules.

## Keep control flow readable

Return early for invalid or completed cases, and avoid deeply nested conditions. Keep each function focused on one operation. A clear guard clause can replace nested branches:

```js
function getDisplayName(user) {
  if (!user) return "Guest";
  return user.displayName || user.email || "Guest";
}
```

The example uses `||` because empty strings should fall through; use `??` if an empty string is a valid name.

## References

- [MDN: Declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
- [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
