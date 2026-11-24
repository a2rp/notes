# 10. Routing and navigation

| [Previous: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) | [Notes index](../README.md) | [Next: Forms and validation](11-forms-and-validation.md) |

Angular Router maps URLs to views without reloading the whole application. Routes describe what to render; `RouterOutlet` marks where the active route appears; router links navigate while preserving client-side state.

## Configure routes

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/task-page').then(m => m.TaskPage),
  },
  { path: '**', redirectTo: 'tasks' },
];
```

Provide the router during bootstrap with `provideRouter(routes)`, and import `RouterOutlet` into the component template that uses it. Lazy loading keeps feature code out of the initial bundle until a route is visited.

## Navigate in templates and code

Use `routerLink` for links in a template. Use `Router` for navigation that follows an action such as saving a form. A link should still look and behave like a link for keyboard users and browser context menus.

Route parameters represent identity, such as `/tasks/42`. Query parameters represent optional view state, such as `?sort=recent`. Read route state through `ActivatedRoute` or the current router APIs documented for the project version.

## Nested routes

Child routes render into a nested `RouterOutlet`. This is useful when a section has its own shared shell or local navigation. Make parent and child ownership clear, and avoid deeply nested URL structures without a user-facing reason.

## Guards and resolvers

Guards can control client-side navigation based on local application state. They are not a security boundary: the server must still authorize protected data and actions. Resolvers can load route-critical data before activating the page; show suitable pending and error states when loading happens inside the page instead.

## Route not found and scroll behavior

Place a wildcard route after specific routes. Configure scroll restoration and anchor behavior deliberately, especially for long pages and back/forward navigation. Test direct URL loads and refreshes on the production host; static hosts often need a fallback to `index.html`.

## References

- [Angular routing overview](https://angular.dev/guide/routing)
- [Define routes](https://angular.dev/guide/routing/define-routes)
- [Show routes with outlets](https://angular.dev/guide/routing/show-routes-with-outlets)
- [Route loading strategies](https://angular.dev/guide/routing/loading-strategies)
- [Route access guards](https://angular.dev/guide/routing/route-guards)

| [Previous: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) | [Notes index](../README.md) | [Next: Forms and validation](11-forms-and-validation.md) |
