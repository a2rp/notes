# 3. Components and standalone architecture

| [Previous: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) | [Notes index](../README.md) | [Next: Templates, bindings, and events](04-templates-binding-and-events.md) |

Components are Angular's main UI building block. A component connects a TypeScript class to a template and optional styles through the `@Component` decorator.

## Define a component

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `<h2>Hello, {{ name }}</h2>`,
  styles: `h2 { color: #b42318; }`,
})
export class GreetingComponent {
  name = 'Angular';
}
```

For larger templates and styles, use separate `.html` and `.css` files through `templateUrl` and `styleUrl`. Keep a component responsible for a coherent piece of UI. A page component can compose smaller presentational components.

## Standalone components

Standalone components declare their own template dependencies in `imports`. Current Angular CLI projects generate standalone components by default, which removes the need to declare every component in an `NgModule`.

```ts
import { Component } from '@angular/core';
import { GreetingComponent } from './greeting.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent],
  template: `<main><app-greeting /></main>`,
})
export class HomeComponent {}
```

Import only what the template uses. If the template uses a pipe or directive, make it available through the component's imports or an imported feature that exports it.

## Compose the application

The root component usually hosts the global shell and a router outlet. Feature components render inside the root or inside another feature component. This creates a tree, not a collection of unrelated pages.

```html
<app-site-header />
<main>
  <router-outlet />
</main>
<app-site-footer />
```

The `RouterOutlet` must be imported into the standalone component that uses it. The actual route configuration is covered in the routing chapter.

## Selectors and component files

Selectors should communicate where a component belongs, such as `app-task-card`. Keep component class names descriptive and PascalCase. The CLI can create the class, template, stylesheet, and test together so those files stay aligned.

## When NgModules appear

Older Angular applications often organize declarations and providers in NgModules. Existing module-based projects remain supported; migration can be incremental. When working in a legacy codebase, follow its architecture rather than mixing standalone and module patterns without a reason. New learning examples here use standalone components.

## Component boundaries

Split a component when the child has a clear responsibility, is reused, has meaningful independent state, or makes a large template easier to understand. Avoid creating one component per tiny wrapper; too many boundaries can obscure simple data flow.

## Notes to remember

- `@Component` describes the selector, template, imports, and styles.
- Standalone dependencies are imported where they are used.
- The root component is bootstrapped; the rest are composed into its view tree.
- Use NgModules when maintaining an existing module-based app, not because every Angular project requires one.

## References

- [Angular components essentials](https://angular.dev/essentials/components)
- [Component configuration](https://angular.dev/guide/components)
- [Standalone migration](https://angular.dev/reference/migrations/standalone)
- [Angular CLI component generator](https://angular.dev/cli/generate/component)

| [Previous: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) | [Notes index](../README.md) | [Next: Templates, bindings, and events](04-templates-binding-and-events.md) |
