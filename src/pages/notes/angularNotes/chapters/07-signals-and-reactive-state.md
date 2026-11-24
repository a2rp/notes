# 7. Signals and reactive state

| [Previous: Component communication and content](06-component-communication-and-content.md) | [Notes index](../README.md) | [Next: Services and dependency injection](08-services-and-dependency-injection.md) |

Signals hold current state and let Angular track which parts of a view depend on it. They are a good fit for values such as selected filters, a counter, and a loaded view model.

## Writable and computed signals

```ts
import { computed, signal } from '@angular/core';

const quantity = signal(1);
const unitPrice = signal(12.5);
const total = computed(() => quantity() * unitPrice());

quantity.update(current => current + 1);
console.log(total());
```

Read a signal by calling it. Update a writable signal with `set` or `update`. A computed signal is read-only, lazy, and memoized; Angular recalculates it when a signal it read changes.

## Treat signal values as immutable

Updating an object in place can leave consumers unaware of the change. Create a new object or array instead:

```ts
const tasks = signal([{ id: 1, done: false }]);
tasks.update(items => items.map(task =>
  task.id === 1 ? { ...task, done: true } : task
));
```

This also makes state transitions easier to inspect and test.

## Effects are for side effects

An `effect` runs when the signals it reads change. Use it to synchronize with an imperative API, log a value, or persist a small preference. Do not use effects to copy one signal into another; derive values with `computed` instead. Effects run in an injection context by default and should be created with a clear owner.

```ts
import { Component, effect, signal } from '@angular/core';

@Component({ template: '' })
export class ThemePersistence {
  theme = signal('dark');

  private readonly persistTheme = effect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.theme());
    }
  });
}
```

Browser globals such as `localStorage` do not exist during server rendering. Guard browser-only work or run it after rendering when the app supports SSR.

## Choose the right reactive tool

- Use a plain field for a value that does not participate in reactive rendering.
- Use a signal for current state that a template or computed value reads.
- Use an Observable for events and asynchronous streams over time.
- Use `computed` for synchronous derivation.
- Use `effect` for synchronization with something outside the signal graph.

Signals and Observables can work together; the next chapters cover services and RxJS interop.

## References

- [Angular Signals](https://angular.dev/guide/signals)
- [Signals essentials](https://angular.dev/essentials/signals)
- [Linked signals](https://angular.dev/guide/signals/linked-signal)
- [Effects](https://angular.dev/guide/signals/effect)

| [Previous: Component communication and content](06-component-communication-and-content.md) | [Notes index](../README.md) | [Next: Services and dependency injection](08-services-and-dependency-injection.md) |
