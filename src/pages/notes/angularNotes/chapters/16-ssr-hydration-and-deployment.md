# 16. SSR, hydration, and deployment

| [Previous: Accessibility, security, and performance](15-accessibility-security-and-performance.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |

Angular applications use client-side rendering by default. Depending on the product, server-side rendering (SSR), prerendering (static generation), or a hybrid strategy can improve initial content delivery and search visibility. Each option changes build and hosting needs.

## Choose a rendering strategy

- **CSR** renders the app in the browser. It is simple to host as static files and fits many interactive applications.
- **SSR** renders a request on the server, then the browser hydrates the HTML to attach client behavior.
- **Prerendering** creates HTML at build time for routes whose content is known then.
- **Hybrid rendering** lets routes use different strategies where supported by the application setup.

Rendering strategy is a product and hosting decision, not a default requirement for every site. Compare first content time, SEO needs, personalization, caching, and operational cost.

## Browser-only APIs and hydration

Server code has no browser `window`, `document`, or `localStorage`. Keep browser-dependent work behind platform-aware boundaries or render callbacks. Hydration reuses server-rendered DOM in the browser; avoid code that produces different initial markup on server and client, since mismatches can cause extra work or visual changes.

## Build and host

Run the production build and inspect the generated output. Static hosting needs correct MIME types and, for client-side routes, a fallback that serves the app entry document on direct navigation. A non-root deployment path must be reflected in the build and host configuration.

Keep secrets in a server-side environment, not in frontend environment files. For SSR, deploy to a runtime that supports the generated server entry and configure its environment safely.

## Release checklist

1. Run tests and linting.
2. Build with production settings.
3. Check direct loads and refreshes on nested routes.
4. Verify API URLs, asset paths, and error states in the target environment.
5. Confirm no credentials or source maps with sensitive content are published unintentionally.
6. Monitor errors and performance after release.

## References

- [Angular rendering strategies](https://angular.dev/guide/routing/rendering-strategies)
- [Angular server and hybrid rendering](https://angular.dev/guide/ssr)
- [Angular hydration](https://angular.dev/guide/hydration)
- [Angular deployment](https://angular.dev/tools/cli/deployment)

| [Previous: Accessibility, security, and performance](15-accessibility-security-and-performance.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |
