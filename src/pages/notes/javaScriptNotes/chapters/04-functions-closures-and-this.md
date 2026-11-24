# 4. Functions, closures, and `this`

Functions are values: assign them to variables, pass them as callbacks, and return them from other functions. Function declarations are hoisted within their scope; function expressions are initialized where they are assigned. Arrow functions are concise expressions and capture `this` from their surrounding scope. They do not have their own `this`, `arguments`, or constructor behavior.

```js
function makeCounter(start = 0) {
  let count = start;
  return () => ++count;
}

const next = makeCounter(4);
next(); // 5
next(); // 6
```

The returned function is a **closure**: it retains access to `count` after `makeCounter` has returned. Closures are useful for private state and callbacks. They can also keep large objects alive; remove event listeners and release references when a long-lived callback is no longer needed.

## Parameters and return values

Default parameters apply when an argument is `undefined`, not when it is `null`. Rest parameters gather trailing arguments into an array. Return a value rather than modifying unrelated outer state when practical; pure functions are easier to test.

```js
function total(first, ...remaining) {
  return [first, ...remaining].reduce((sum, value) => sum + value, 0);
}
```

## How `this` is chosen

For an ordinary function, `this` depends on how the function is called. A method call like `user.save()` supplies `user` as `this`; extracting the method loses that receiver unless it is bound. An arrow function uses lexical `this`, which is useful inside callbacks but usually not as an object method when the method needs its receiver.

```js
const user = {
  name: "Asha",
  greeting() { return "Hi, " + this.name; },
};
```

Use `bind`, `call`, or `apply` only when you need to control a function's receiver. Avoid relying on browser globals as implicit `this`; modules and strict mode make behavior more predictable.

## References

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
