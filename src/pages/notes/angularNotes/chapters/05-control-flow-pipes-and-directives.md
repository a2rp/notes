# 5. Control flow, pipes, and directives

| [Previous: Templates, bindings, and events](04-templates-binding-and-events.md) | [Notes index](../README.md) | [Next: Component communication and content](06-component-communication-and-content.md) |

Angular's built-in control flow makes conditional and repeated UI explicit. Pipes format values in templates. Directives add reusable behavior to elements or templates.

## Conditional content with `@if`

```html
@if (loadState() === 'loading') {
  <app-spinner />
} @else if (loadState() === 'error') {
  <p role="alert">Could not load tasks.</p>
} @else {
  <app-task-list [tasks]="tasks()" />
}
```

The built-in block is part of template syntax and does not require importing `NgIf`. Use an explicit loading, empty, error, and success state when those cases matter to the user.

## Repeat data with `@for`

```html
@for (task of tasks(); track task.id) {
  <app-task-row [task]="task" />
} @empty {
  <p>No tasks yet. Add one to get started.</p>
}
```

The `track` expression lets Angular associate each rendered row with a stable record. Prefer a unique identifier such as `task.id`. `$index` is appropriate only when the collection is static or items have no stable identity and do not reorder.

## Choose among states with `@switch`

```html
@switch (requestState()) {
  @case ('loading') { <app-spinner /> }
  @case ('ready') { <app-task-list [tasks]="tasks()" /> }
  @case ('error') { <p role="alert">Try again later.</p> }
  @default { <p>Waiting to start.</p> }
}
```

`@switch` cases do not fall through. For a union type, exhaustive handling can catch newly added states during template checking.

## Format values with pipes

Pipes transform values for display without changing the original data. Common pipes format dates, currencies, numbers, and JSON. Import a built-in pipe in a standalone component before using it in that template.

```ts
import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  imports: [CurrencyPipe],
  template: `{{ total() | currency:'USD' }}`,
})
export class CartSummary {
  total = signal(42.5);
}
```

Pipes are not a substitute for domain calculations. Format a value for presentation, but keep the underlying numeric amount available for comparisons and business rules.

## Directives

Attribute directives can add behavior or alter an element's presentation. Structural directives historically controlled whether a template was inserted, but for everyday conditional and repeated rendering, use `@if`, `@for`, and `@switch`. Create a custom directive when the behavior is reusable and does not belong to a particular component.

## Defer non-critical UI

`@defer` can split out eligible dependencies and load them when a trigger is met. Use it for genuinely non-critical or large UI, then verify the generated chunks and loading experience. Deferral is a performance choice; it should not hide content users need immediately.

## References

- [Angular control flow](https://angular.dev/guide/templates/control-flow)
- [Angular pipes](https://angular.dev/guide/templates/pipes)
- [Angular directives](https://angular.dev/guide/directives)
- [Deferred loading with `@defer`](https://angular.dev/guide/templates/defer)

| [Previous: Templates, bindings, and events](04-templates-binding-and-events.md) | [Notes index](../README.md) | [Next: Component communication and content](06-component-communication-and-content.md) |
