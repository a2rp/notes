# 13. RxJS and signal interop

| [Previous: HTTP and asynchronous data](12-http-and-asynchronous-data.md) | [Notes index](../README.md) | [Next: Testing Angular applications](14-testing-angular-applications.md) |

RxJS Observables model values over time: user input, network responses, timers, and event streams. Signals model the current value of state. Angular provides interop APIs so an app can use each where it fits.

## Compose an event stream

```ts
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

const normalizedSearch$ = searchInput$.pipe(
  map(value => value.trim()),
  debounceTime(250),
  distinctUntilChanged(),
);
```

Operators transform a stream without manually managing nested callbacks. `switchMap` is useful for a search stream where a newer query should replace an older request. `concatMap` preserves order; `mergeMap` permits concurrent work. Pick based on the operation's required behavior.

## Read an Observable as a signal

`toSignal` subscribes immediately and returns a signal for the latest value. Supply an initial value if the stream may not emit synchronously. Angular cleans up the subscription when its injection context is destroyed.

```ts
import { toSignal } from '@angular/core/rxjs-interop';

readonly tasks = toSignal(this.taskApi.list(), { initialValue: [] });
```

Do not call `toSignal` repeatedly for the same Observable; create it once and reuse the result. Handle errors so the user can distinguish failure from an empty value.

## Convert a signal to an Observable

`toObservable` exposes signal changes as an Observable. Its updates are propagated asynchronously through an effect, so it is not guaranteed to synchronously emit each intermediate value after rapid updates.

```ts
readonly searchTerm = signal('');
readonly searchTerm$ = toObservable(this.searchTerm);
```

## Subscription lifetime

Use the `async` pipe, `toSignal`, or `takeUntilDestroyed` to tie subscriptions to a component or service lifetime. Avoid unmanaged subscriptions to streams that never complete. For one-shot HTTP calls, the stream normally completes, but subscriptions can still be avoided when a template or signal is a better fit.

## Practical division

- Use signals for values the template needs to read now.
- Use Observables for events, cancellation, and stream composition.
- Use `computed` for synchronous derived values.
- Use RxJS operators for timing, concurrency, retries, and stream transformations.
- Convert between them at a boundary instead of maintaining duplicate state.

## References

- [RxJS interop with Angular signals](https://angular.dev/guide/signals/rxjs-interop)
- [RxJS `toSignal`](https://angular.dev/api/core/rxjs-interop/toSignal)
- [RxJS `toObservable`](https://angular.dev/api/core/rxjs-interop/toObservable)
- [RxJS operators](https://rxjs.dev/guide/operators)

| [Previous: HTTP and asynchronous data](12-http-and-asynchronous-data.md) | [Notes index](../README.md) | [Next: Testing Angular applications](14-testing-angular-applications.md) |
