# 98. JavaScript code recipes

Short examples for everyday tasks. Validate inputs and adapt error handling to the application that calls them.

## Group records by a key

```js
function groupBy(items, getKey) {
  return Map.groupBy
    ? Map.groupBy(items, getKey)
    : items.reduce((groups, item) => {
        const key = getKey(item);
        const group = groups.get(key) ?? [];
        group.push(item);
        groups.set(key, group);
        return groups;
      }, new Map());
}
```

Check target compatibility if using newer built-ins. A fallback should be tested against the same edge cases.

## Remove duplicates while keeping order

```js
const uniqueValues = [...new Set(values)];
```

## Safely read and validate JSON

```js
function parseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error };
  }
}
```

## Sort without mutating the original array

```js
const sortedUsers = [...users].sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
);
```

## Debounce repeated calls

```js
function debounce(callback, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
}
```

Debounce is suitable for reducing repeated work such as search suggestions. It is not a replacement for request cancellation or server-side rate limiting.

## Fetch with a timeout signal

```js
async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Request failed: " + response.status);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
```

## Create an element and set user text safely

```js
const message = document.createElement("p");
message.textContent = userSuppliedMessage;
container.append(message);
```

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN: Map.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy)
- [MDN: AbortSignal timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)
