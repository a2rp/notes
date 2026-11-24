# 15. Performance, security, and reliability

Optimize from evidence. Measure the slow interaction, inspect a profile, and address the costly work. Common wins include avoiding repeated expensive calculations, reducing unnecessary DOM updates, splitting large bundles, and caching data with a clear invalidation rule. Do not trade correctness for a micro-optimization without a measured benefit.

## Memory and responsiveness

Long-running pages can retain objects through event listeners, timers, closures, and caches. Clean up work when a view or task ends. Keep the main thread responsive; use a Web Worker for suitable CPU-heavy browser work, remembering workers communicate by messages and cannot directly manipulate the page DOM.

## Security boundaries

- Treat form input, URL parameters, API data, and third-party messages as untrusted.
- Render text with safe APIs; avoid constructing markup from untrusted strings.
- Validate on the server too; client-side validation is for user experience, not authorization.
- Never ship private keys or server credentials in browser JavaScript.
- Check authorization on the server for every protected operation.
- Keep dependencies current and review the source and permissions of new packages.

Prototype pollution can happen when merging untrusted object keys into sensitive objects. Validate allowed keys and avoid unsafe generic merge routines. Do not assume a value is trustworthy because it came from your own frontend.

## Reliability

Represent loading, success, empty, and failure states explicitly. Add timeouts or cancellation where the API permits them, retry only transient failures with a limit and backoff, and make repeated operations safe when a user can retry. Log diagnostic context without exposing secrets or personal data.

## References

- [MDN: Web security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [OWASP: Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN: Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Node.js: Security best practices](https://nodejs.org/en/learn/getting-started/security-best-practices)
