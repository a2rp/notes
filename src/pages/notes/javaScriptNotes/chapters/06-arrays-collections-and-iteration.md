# 6. Arrays, collections, and iteration

Arrays are ordered, zero-indexed objects. Use `map` to transform every item, `filter` to keep matching items, `find` to get the first match, and `some` or `every` for boolean questions. Use `reduce` when the accumulation is genuinely clearer than another method or loop; it is not automatically more readable.

```js
const visibleNames = users
  .filter((user) => user.active)
  .map((user) => user.name);
```

Methods such as `sort`, `reverse`, `splice`, and `push` mutate the array. `sort` mutates and sorts values as strings by default, so provide a comparator for numbers:

```js
const sorted = [...scores].sort((a, b) => a - b);
```

`toSorted`, `toReversed`, and `toSpliced` return new arrays in runtimes that support them. Check target compatibility before using newer methods. Sparse arrays have missing slots and behave differently across array methods; prefer dense arrays with an explicit value such as `null` when a position must be empty.

## Choosing a collection

- **Array:** ordered sequence, duplicates allowed, access by index.
- **Set:** unique values and fast membership checks.
- **Map:** key-value pairs where keys can be values of any type.
- **WeakMap / WeakSet:** object-keyed associations that do not keep keys alive solely through the collection; they are not enumerable.

Use `for...of` to iterate values and `Map`/`Set` entries. Iterables expose an iterator, which is why they can be consumed by `for...of` and spread syntax. Avoid `for...in` for collection values.

## Keep updates predictable

When state is shared with other code, prefer returning a new array instead of mutating it in place. This makes changes easier to observe and reduces hidden coupling. For large datasets, measure before replacing simple collection operations with more complex data structures.

## References

- [MDN: Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)
- [MDN: Keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)
- [MDN: Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
