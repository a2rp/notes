# 2. Values, types, and coercion

JavaScript has seven primitive types: `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, and `symbol`. Everything else is an object, including arrays, dates, regular expressions, functions, maps, and sets. Primitive values are immutable; an object variable refers to an object that may be changed.

```js
const profile = { name: "Mina" };
const sameProfile = profile;
sameProfile.name = "Ravi";
console.log(profile.name); // Ravi: both variables refer to the same object
```

`const` prevents reassignment of the binding, not mutation of the referenced object. Use `Object.freeze` for a shallow runtime freeze when appropriate, and remember nested objects remain mutable unless separately frozen.

## Missing values and checks

Use `undefined` for an absent value and `null` when your program deliberately represents “no value.” Avoid using either ambiguously. `typeof null` is the historical string `"object"`; test `value === null` directly. `typeof` is useful for primitives, but arrays need `Array.isArray(value)`.

Numbers include `NaN`, `Infinity`, and `-Infinity`. A `NaN` value is unequal to itself; use `Number.isNaN(value)` to detect it. `Number.isFinite(value)` rejects non-finite values without coercing strings.

## Equality and conversion

Prefer strict equality (`===`) because it does not convert operands first. `==` applies coercion and has edge cases that are easy to overlook. Convert input at a boundary and validate the result:

```js
const quantity = Number(formValue);
if (!Number.isFinite(quantity) || quantity < 0) {
  throw new RangeError("Quantity must be a non-negative number");
}
```

Truthiness is not the same as “present”: `0`, `""`, `false`, `null`, `undefined`, and `NaN` are falsy. If zero or an empty string is valid, check explicitly instead of writing `if (!value)`.

`Object.is` differs from `===` for `NaN` and signed zero. It is useful for precise identity checks, but ordinary application comparisons usually need `===`.

## Remember

- Validate external input; TypeScript annotations would not validate runtime values either.
- Use `Number(...)` plus a finite/range check for numeric form values.
- Use `??` when only `null` and `undefined` should trigger a fallback; use `||` only when every falsy value should.

## References

- [MDN: JavaScript data types and structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN: Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
