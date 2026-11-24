# 8. Services and dependency injection

| [Previous: Signals and reactive state](07-signals-and-reactive-state.md) | [Notes index](../README.md) | [Next: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) |

Services hold reusable behavior or data access outside a particular view. Angular's dependency injection (DI) system creates and supplies dependencies to components, services, and other framework-managed code.

## Create and inject a service

```ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly taskState = signal<string[]>([]);
  readonly tasks = this.taskState.asReadonly();

  add(title: string) {
    this.taskState.update(items => [...items, title]);
  }
}
```

```ts
import { Component, inject } from '@angular/core';

@Component({ template: `{{ store.tasks().length }} tasks` })
export class TaskSummary {
  readonly store = inject(TaskStore);
}
```

`providedIn: 'root'` makes the service available from the application injector and allows tree-shaking when it is unused. A component can also provide a service locally when the instance should be scoped to that component subtree.

## Dependency injection tokens

Classes are common injection tokens, but configuration values and interfaces need an `InjectionToken` because TypeScript interfaces do not exist at runtime. Keep configuration explicit and avoid reading global environment values throughout the UI.

## Provider scope matters

Providing a service at the root generally creates one shared application instance. Providing it on a component creates an instance associated with that component's injector; descendants can share it, while another component tree can receive a different instance. Choose the scope based on ownership and lifetime.

## Keep services focused

A data service can own HTTP calls and map the response into application types. A state service can own shared state. A component should still own presentation details such as focus and local open/closed state. Avoid turning one service into a global container for every feature.

## Testability

DI lets tests provide a fake service instead of making a real network request. Keep dependencies behind constructor or `inject()` boundaries so they can be replaced in a test configuration.

## References

- [Dependency injection overview](https://angular.dev/guide/di)
- [Creating and using services](https://angular.dev/guide/di/creating-injectable-service)
- [Defining dependency providers](https://angular.dev/guide/di/defining-dependency-providers)
- [Injection tokens](https://angular.dev/guide/di/optimizing-injection-tokens)

| [Previous: Signals and reactive state](07-signals-and-reactive-state.md) | [Notes index](../README.md) | [Next: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) |
