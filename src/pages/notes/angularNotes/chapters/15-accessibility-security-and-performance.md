# 15. Accessibility, security, and performance

| [Previous: Testing Angular applications](14-testing-angular-applications.md) | [Notes index](../README.md) | [Next: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) |

Accessible, secure, and fast behavior comes from everyday implementation choices. Angular helps with some defaults, but application code still needs sound HTML, careful data handling, and measured performance work.

## Build accessible interactions

- Use native buttons for actions and anchors for navigation.
- Give inputs visible labels and connect validation messages to their fields.
- Keep keyboard focus visible and predictable in menus, dialogs, and route changes.
- Use headings in a meaningful order and provide text alternatives for informative images.
- Use ARIA only when native HTML does not already express the correct semantics.
- Test keyboard navigation and inspect the interface with assistive technology.

Do not rely on color alone for errors or selected state. Announce important asynchronous status changes without flooding a live region.

## Angular security basics

Angular treats template-bound values as untrusted and sanitizes many values for the relevant DOM context. Do not bypass sanitization with `bypassSecurityTrust...` unless the value is reviewed and the security boundary is understood. Never render untrusted HTML as trusted markup.

Avoid `javascript:` URLs, unsafe dynamic code, and secrets in client bundles. Client-side route guards can improve navigation behavior, but server authorization must protect data and operations. Keep dependencies patched and review third-party packages.

## Measure before optimizing

Use production builds and browser performance tools to find the actual bottleneck. Lazy-load route features, use `@defer` for appropriate non-critical UI, and track repeated list items with stable IDs. Avoid expensive work in template expressions and unnecessary subscriptions.

Signals help Angular track state dependencies, but they do not make expensive calculations free. Cache derived work with `computed` when appropriate and avoid creating new large data structures on every render.

## Responsive and resilient UI

Use semantic structure, flexible layouts, and useful empty/error/loading states. Verify narrow viewports, zoom, reduced motion preferences, and slow network conditions. A performance optimization should preserve a clear loading and fallback experience.

## References

- [Angular accessibility guide](https://angular.dev/best-practices/a11y)
- [Angular security guide](https://angular.dev/best-practices/security)
- [Angular performance guide](https://angular.dev/best-practices/performance)
- [Angular template defer](https://angular.dev/guide/templates/defer)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

| [Previous: Testing Angular applications](14-testing-angular-applications.md) | [Notes index](../README.md) | [Next: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) |
