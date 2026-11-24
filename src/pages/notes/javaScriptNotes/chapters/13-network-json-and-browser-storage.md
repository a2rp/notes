# 13. Network requests, JSON, and browser storage

Use `fetch` for HTTP requests in modern browsers and supported Node.js versions. A fulfilled fetch response does not mean the server returned a successful status: check `response.ok` or `response.status`. Parsing JSON is a separate asynchronous step and can fail if the body is malformed.

```js
async function getItems(query, signal) {
  const params = new URLSearchParams({ q: query });
  const response = await fetch("/api/items?" + params, { signal });

  if (!response.ok) {
    throw new Error("Could not load items (" + response.status + ")");
  }

  return response.json();
}
```

Encode dynamic path segments with `encodeURIComponent` and query values with `URLSearchParams`. Do not manually concatenate untrusted values into URLs. Respect the API's authentication and CORS policy; CORS is enforced by the browser and is not a security control for the server itself.

## JSON boundaries

`JSON.parse` turns JSON text into JavaScript values; it does not validate that the resulting shape matches your assumptions. Validate required fields and types before using external data. `JSON.stringify` omits some values and throws on cyclic structures and ordinary `BigInt` values unless handled explicitly.

## Browser storage

- `localStorage` persists string values for the origin and is synchronous.
- `sessionStorage` is scoped to a browser tab session.
- IndexedDB supports larger structured data and asynchronous access.

Storage may be unavailable, cleared, or quota-limited. Handle failures. Never store passwords, long-lived secrets, or sensitive tokens in browser storage where injected page script could read them. Store only what the user experience requires and provide expiry/clear behavior.

## References

- [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
