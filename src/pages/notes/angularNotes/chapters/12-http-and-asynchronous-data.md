# 12. HTTP and asynchronous data

| [Previous: Forms and validation](11-forms-and-validation.md) | [Notes index](../README.md) | [Next: RxJS and signal interop](13-rxjs-and-signal-interop.md) |

Angular's `HttpClient` sends HTTP requests and returns RxJS Observables. Configure it with `provideHttpClient()` during application bootstrap. Keep API details in a service so components can focus on loading, success, and error states.

## Request data through a service

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type TaskDto = { id: number; title: string };

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly http = inject(HttpClient);

  list(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>('/api/tasks');
  }
}
```

The generic type describes what the app expects; it does not validate server JSON at runtime. Validate external response data at the boundary when correctness or security depends on its shape.

## Loading, errors, and cancellation

An HTTP Observable sends a request when subscribed. Unsubscribing can cancel an in-flight request. Use `catchError` where recovery belongs, and expose explicit state to the view. Do not turn every failure into an empty list; that makes an outage look like a successful empty response.

```ts
type LoadState<T> =
  | { status: 'loading' }
  | { status: 'ready'; value: T }
  | { status: 'error'; message: string };
```

Use interceptors for cross-cutting request behavior such as attaching a token or recording timing. Keep endpoint-specific mapping and business rules in the API service.

## `httpResource` and safe API practices

Angular's current docs include `httpResource` for signal-oriented data fetching. It can expose value, loading, and error state as signals. Check the exact stability and behavior in the installed Angular version; `HttpClient` remains a useful foundation.

- Use HTTPS outside local development.
- Keep server credentials on the server; browser bundles are public.
- Treat URL parameters and response data as untrusted input.
- Handle HTTP failures explicitly.
- Configure CORS on the server; frontend code cannot safely bypass it.

## References

- [Angular HTTP overview](https://angular.dev/guide/http)
- [Configure `HttpClient`](https://angular.dev/guide/http/setup)
- [Make HTTP requests](https://angular.dev/guide/http/making-requests)
- [HTTP interceptors](https://angular.dev/guide/http/interceptors)
- [Reactive data fetching with `httpResource`](https://angular.dev/guide/http/http-resource)

| [Previous: Forms and validation](11-forms-and-validation.md) | [Notes index](../README.md) | [Next: RxJS and signal interop](13-rxjs-and-signal-interop.md) |
