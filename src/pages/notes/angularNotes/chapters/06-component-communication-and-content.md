# 6. Component communication and content

| [Previous: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) | [Notes index](../README.md) | [Next: Signals and reactive state](07-signals-and-reactive-state.md) |

Components stay easy to reason about when data moves through clear boundaries. A parent passes values to a child; a child emits a user intent back to its parent. Shared state belongs in a service when unrelated parts of the app need it.

## Pass data with signal inputs

```ts
import { Component, input } from '@angular/core';

type Task = { id: number; title: string };

@Component({ selector: 'app-task-row', template: `<span>{{ task().title }}</span>` })
export class TaskRow {
  task = input.required<Task>();
}
```

The parent binds `[task]="item"`. A required input tells the template checker that the parent must provide it. For optional values, use a default or account for `undefined` in the type.

## Send events with outputs

```ts
import { Component, input, output } from '@angular/core';

@Component({ selector: 'app-task-row', template: `<button (click)="remove.emit(taskId())">Remove</button>` })
export class TaskRow {
  taskId = input.required<number>();
  remove = output<number>();
}
```

The parent listens with `(remove)="deleteTask($event)"`. Name outputs after the event or intent. The child reports what the user requested; the owner decides how application data changes.

## Model inputs and content projection

A model input is useful for a control edited by both parent and child, such as a reusable toggle. For ordinary notifications, a separate input and output makes data flow clearer.

`<ng-content>` lets a component provide a shell while the caller supplies part of its content:

```html
<section class="callout">
  <h2>{{ title() }}</h2>
  <ng-content />
</section>
```

Use named slots with `select` when a component has distinct content regions. Projection works well for reusable panels and layout primitives.

## View queries and state ownership

Template reference variables and query APIs such as `viewChild()` are for cases where class code needs a template element or child instance. Prefer data bindings over manual DOM querying.

- Local interaction state belongs to the component owning that interaction.
- Parent-owned data flows down through inputs.
- Child actions flow up through outputs.
- Shared state belongs in a focused service when multiple features need it.
- Avoid a child reaching into a parent's private fields.

## References

- [Component inputs](https://angular.dev/guide/components/inputs)
- [Component outputs](https://angular.dev/guide/components/outputs)
- [Content projection](https://angular.dev/guide/components/content-projection)
- [View queries](https://angular.dev/guide/components/queries)

| [Previous: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) | [Notes index](../README.md) | [Next: Signals and reactive state](07-signals-and-reactive-state.md) |
