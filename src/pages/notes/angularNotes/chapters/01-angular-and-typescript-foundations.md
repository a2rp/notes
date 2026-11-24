# 1. Angular and TypeScript foundations

| [Notes index](../README.md) | [Next: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) |

Angular is a TypeScript-based framework for building web applications. It gives an application a consistent structure for UI components, templates, dependency injection, navigation, forms, HTTP, and testing. The browser still renders HTML, CSS, and JavaScript; Angular coordinates how application state becomes that UI.

## What Angular provides

An Angular application is assembled from components. Each component owns a view and the behavior for one part of the interface. Templates describe the view with HTML plus Angular bindings and control flow. Services hold reusable logic or data access, and dependency injection supplies those services where they are needed.

Angular also ships first-party libraries for routing, forms, and HTTP. Signals provide fine-grained reactive state. RxJS remains useful for event streams and asynchronous workflows. These pieces work together, but they solve different problems; a small component does not need every abstraction at once.

## TypeScript essentials

Angular applications use TypeScript. Types describe the shape of values and help the compiler catch mistakes before the browser runs the app.

```ts
type Note = {
  id: number;
  title: string;
  isRead: boolean;
};

const notes: Note[] = [
  { id: 1, title: 'Components', isRead: false },
];
```

Prefer explicit, narrow types for data that crosses a boundary. `unknown` is safer than `any` when a value has not yet been checked. A TypeScript type does not validate JSON received from a server at runtime; validate external data before trusting it.

## Framework code and template code

Component class code is TypeScript. A template is HTML with expressions and Angular syntax. Keep calculations and state transitions in TypeScript, and keep templates focused on rendering and user interaction.

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button type="button" (click)="count.update(value => value + 1)">
      Count: {{ count() }}
    </button>
  `,
})
export class CounterComponent {
  count = signal(0);
}
```

The `signal` stores state; calling `count()` reads its current value. The interpolation renders that value, and the click binding updates it.

## Learn Angular in layers

1. Get comfortable with TypeScript objects, arrays, functions, and modules.
2. Learn how a component connects a class, template, and stylesheet.
3. Practice bindings and built-in control flow.
4. Add shared state through signals and services when the interface needs it.
5. Add routing, forms, and HTTP when the app requires those capabilities.
6. Test behavior and consider rendering strategy before production.

You do not need to learn every advanced API before building a small feature. Start with the smallest Angular building block that makes the behavior clear.

## Common misconceptions

- Angular is a framework, while TypeScript is the language used to author most application code.
- A component is not just a template. It combines metadata, behavior, and a view.
- Signals are not a replacement for every Observable. Signals represent current state; Observables model values over time.
- Type annotations do not sanitize input or validate server responses at runtime.
- A new standalone app does not need an `AppModule`; NgModules still appear in older applications and library integrations.

## Notes to remember

- Components form the UI tree.
- Templates bind data and user events to component behavior.
- Services and dependency injection organize shared capabilities.
- TypeScript helps at build time; validate untrusted values at runtime.
- Build one feature at a time and introduce complexity only when it solves a real need.

## References

- [Angular overview](https://angular.dev/overview)
- [Angular essentials](https://angular.dev/essentials)
- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Angular style guide](https://angular.dev/style-guide)

| [Notes index](../README.md) | [Next: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) |
