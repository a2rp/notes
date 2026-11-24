# 99. Complete Q&A

| [Previous: Angular code samples](98-all-code-samples.md) | [Notes index](../README.md) |

## Angular basics

### Is Angular the same thing as TypeScript?

No. TypeScript is the language used to author most Angular application code. Angular is the framework that supplies components, templates, DI, routing, forms, and other app capabilities.

### Does every Angular app need an NgModule?

No. New CLI projects use standalone APIs by default. NgModules remain supported for existing applications and libraries that use them.

### What belongs in a component?

The behavior and view state for one coherent part of the interface. Reusable data access belongs in a service, while shared rendering belongs in child components.

## Templates and state

### What is the difference between `{{ value }}` and `[value]="value"`?

Interpolation renders a value as text. Property binding sets a DOM property or component input.

### Why should `@for` use `track`?

It lets Angular associate each rendered row with a stable data item and update the minimum necessary DOM. Prefer a unique ID.

### Are signals a replacement for RxJS?

No. Signals represent current state; Observables represent values over time and provide stream operators for events, cancellation, and concurrency. Angular offers APIs to bridge them.

### Should I use an effect to keep two signals synchronized?

Usually no. Derive one value with `computed`. Effects are intended for side effects such as synchronizing with an external API.

## Dependency injection and routing

### Why use a service?

A service can own reusable logic or data access outside a particular view. DI supplies it to the parts of the app that need it and lets tests replace it.

### Does a route guard secure data?

No. A browser user can alter client code and state. Enforce authorization on the server; guards only control client navigation and improve the user experience.

### Why does refreshing a nested route return 404?

The hosting server may be looking for a physical file at that URL. Configure a fallback or server route so client-side routes serve the application entry document.

## Forms and HTTP

### Which Angular form approach should I use?

Use Signal Forms for new signal-based forms when the project version supports the stable API. Reactive forms remain suitable for complex forms and established codebases. Template-driven forms can fit small forms.

### Does a TypeScript generic validate an HTTP response?

No. `http.get<Task[]>()` tells the compiler what the program expects; it does not inspect server JSON at runtime.

### Does client validation protect the server?

No. Validate submitted data on the server as well. Client validation provides faster feedback but is controlled by the user.

### Should every HTTP error become an empty list?

No. An empty successful result and a failed request are different states. Preserve that difference in the UI and let the user retry when appropriate.

## Testing and rendering

### What should a component test verify?

Important behavior visible to a user: rendered text, enabled state, validation, output events, and responses to interaction. Avoid overfitting tests to private implementation details.

### Is SSR required for an Angular app?

No. CSR is the default and fits many interactive apps. Use SSR or prerendering when initial content, search visibility, or a delivery requirement justifies its build and hosting complexity.

### Can browser APIs run during SSR?

Not on the server. `window`, `document`, and browser storage are unavailable there. Keep browser-only work behind a platform-aware boundary or a suitable render callback.

## Notes index

- [Angular and TypeScript foundations](01-angular-and-typescript-foundations.md)
- [Components and standalone architecture](03-components-and-standalone-architecture.md)
- [Signals and reactive state](07-signals-and-reactive-state.md)
- [Routing and navigation](10-routing-and-navigation.md)
- [Forms and validation](11-forms-and-validation.md)
- [SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md)

## References

- [Angular documentation](https://angular.dev/)
- [Angular releases](https://angular.dev/reference/releases)

| [Previous: Angular code samples](98-all-code-samples.md) | [Notes index](../README.md) |
