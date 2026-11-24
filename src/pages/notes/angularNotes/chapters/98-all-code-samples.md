# 98. Angular code samples

| [Previous: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) | [Notes index](../README.md) | [Next: Complete Q&A](99-complete-q-and-a.md) |

Small examples collected for quick reference. They are building blocks, not a complete production application; add error handling, tests, and project-specific types before using them in a real feature.

## Standalone component and signal state

```ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubled() }}</p>
    <button type="button" (click)="increment()">Add one</button>
  `,
})
export class Counter {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }
}
```

## Render a stable list

```html
@for (task of tasks(); track task.id) {
  <article>
    <h2>{{ task.title }}</h2>
    <button type="button" (click)="remove(task.id)">Remove</button>
  </article>
} @empty {
  <p>No tasks yet.</p>
}
```

## Pass an input and emit an output

```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  template: `<button type="button" (click)="confirmed.emit()">{{ label() }}</button>`,
})
export class ConfirmButton {
  label = input('Confirm');
  confirmed = output<void>();
}
```

## Provide a service and configure HTTP

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
```

## Lazy route

```ts
export const routes: Routes = [
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings-page')
      .then(module => module.SettingsPage),
  },
  { path: '**', redirectTo: '' },
];
```

## Stream-to-signal bridge

```ts
readonly tasks = toSignal(this.taskApi.list(), { initialValue: [] });
```

Create this bridge once within an injection context. For loading and failure states, model those states explicitly instead of treating an empty initial array as a completed response.

## Reactive form control

```ts
readonly email = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required, Validators.email],
});
```

## Notes

- Import template dependencies in the standalone component that uses them.
- Give repeated data a stable tracking key.
- Use server validation for every security-sensitive rule.
- Check API stability and exact signatures for the Angular version in the workspace.

| [Previous: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) | [Notes index](../README.md) | [Next: Complete Q&A](99-complete-q-and-a.md) |
