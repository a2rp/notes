# 9. Lifecycle, rendering, and cleanup

| [Previous: Services and dependency injection](08-services-and-dependency-injection.md) | [Notes index](../README.md) | [Next: Routing and navigation](10-routing-and-navigation.md) |

Angular creates a component, checks its bindings, renders its view, updates it when state changes, and eventually destroys it. Lifecycle hooks let a component participate at meaningful points in that process.

## Common lifecycle hooks

- `ngOnInit` runs once after Angular initializes the component's inputs.
- `ngOnChanges` runs when input values change; the first call happens before `ngOnInit`.
- `ngAfterViewInit` runs after the component view is initialized.
- `ngOnDestroy` runs before the component is removed.

Signals and input transforms can remove the need for some manual change tracking. Use a hook because its lifecycle timing is needed, not as a default location for all code.

## Clean up subscriptions and listeners

Subscriptions to long-lived streams should stop when their owner is destroyed. Prefer `async` pipe or `toSignal` when they fit; both manage subscription lifetime for their view or injection context. In imperative subscriptions, use `takeUntilDestroyed` or explicitly unsubscribe.

```ts
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class TaskEvents {
  private readonly destroyRef = inject(DestroyRef);
  private readonly events$ = inject(EventBus).events$;

  constructor() {
    this.events$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      this.handle(event);
    });
  }

  private handle(event: AppEvent) {
    // Update the feature state for this event.
  }
}
```

Remove timers and browser event listeners you create. A cleanup callback can be registered with `DestroyRef` when a hook class is not otherwise needed.

## DOM work and render callbacks

Prefer Angular bindings and template queries over direct DOM manipulation. If an imperative library must measure or update the DOM, use render callbacks such as `afterNextRender` or `afterEveryRender` in an injection context and keep browser-only code away from server execution.

Do not read layout measurements during every change check. Batch necessary reads and writes, and clean up observers when the component is destroyed.

## Avoid lifecycle traps

- Do not change bound state at an unexpected late check phase; it can trigger expression-changed errors.
- Do not subscribe repeatedly from a hook that runs on every input change unless each subscription has a clear cleanup.
- Do not use `setTimeout` to conceal a state-flow problem.
- Avoid assuming `window`, `document`, or storage APIs exist in SSR.

## References

- [Component lifecycle](https://angular.dev/guide/components/lifecycle)
- [DestroyRef](https://angular.dev/guide/components/lifecycle#destroyref)
- [RxJS interop and cleanup](https://angular.dev/guide/signals/rxjs-interop)
- [Using DOM APIs](https://angular.dev/guide/components/dom-apis)

| [Previous: Services and dependency injection](08-services-and-dependency-injection.md) | [Notes index](../README.md) | [Next: Routing and navigation](10-routing-and-navigation.md) |
