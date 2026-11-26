import{Bt as e,Ft as t,It as n,Pt as r,Rt as i,Ut as a,c as o,d as s,s as c,y as l,zt as u}from"./index-COQIkgJQ.js";import{n as d,t as f}from"./lib-D-bAJtt-.js";var p=a(e(),1),m=Object.entries(Object.assign({"./chapters/01-angular-and-typescript-foundations.md":`# 1. Angular and TypeScript foundations

| [Notes index](../README.md) | [Next: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) |

Angular is a TypeScript-based framework for building web applications. It gives an application a consistent structure for UI components, templates, dependency injection, navigation, forms, HTTP, and testing. The browser still renders HTML, CSS, and JavaScript; Angular coordinates how application state becomes that UI.

## What Angular provides

An Angular application is assembled from components. Each component owns a view and the behavior for one part of the interface. Templates describe the view with HTML plus Angular bindings and control flow. Services hold reusable logic or data access, and dependency injection supplies those services where they are needed.

Angular also ships first-party libraries for routing, forms, and HTTP. Signals provide fine-grained reactive state. RxJS remains useful for event streams and asynchronous workflows. These pieces work together, but they solve different problems; a small component does not need every abstraction at once.

## TypeScript essentials

Angular applications use TypeScript. Types describe the shape of values and help the compiler catch mistakes before the browser runs the app.

\`\`\`ts
type Note = {
  id: number;
  title: string;
  isRead: boolean;
};

const notes: Note[] = [
  { id: 1, title: 'Components', isRead: false },
];
\`\`\`

Prefer explicit, narrow types for data that crosses a boundary. \`unknown\` is safer than \`any\` when a value has not yet been checked. A TypeScript type does not validate JSON received from a server at runtime; validate external data before trusting it.

## Framework code and template code

Component class code is TypeScript. A template is HTML with expressions and Angular syntax. Keep calculations and state transitions in TypeScript, and keep templates focused on rendering and user interaction.

\`\`\`ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <button type="button" (click)="count.update(value => value + 1)">
      Count: {{ count() }}
    </button>
  \`,
})
export class CounterComponent {
  count = signal(0);
}
\`\`\`

The \`signal\` stores state; calling \`count()\` reads its current value. The interpolation renders that value, and the click binding updates it.

## Learn Angular in layers

1. Get comfortable with TypeScript objects, arrays, functions, and modules.
2. Learn how a component connects a class, template, and stylesheet.
3. Practice bindings and built-in control flow.
4. Add shared state through signals and services when the interface needs it.
5. Add routing, forms, and HTTP when the app requires those capabilities.
6. Test behavior and consider rendering strategy before production.

You do not need to learn every advanced API before building a small feature. Start with the smallest Angular building block that makes the behavior clear.

## Common misconceptions

- Angular is a framework, while TypeScript is the language used to author most application code.
- A component is not just a template. It combines metadata, behavior, and a view.
- Signals are not a replacement for every Observable. Signals represent current state; Observables model values over time.
- Type annotations do not sanitize input or validate server responses at runtime.
- A new standalone app does not need an \`AppModule\`; NgModules still appear in older applications and library integrations.

## Notes to remember

- Components form the UI tree.
- Templates bind data and user events to component behavior.
- Services and dependency injection organize shared capabilities.
- TypeScript helps at build time; validate untrusted values at runtime.
- Build one feature at a time and introduce complexity only when it solves a real need.

## References

- [Angular overview](https://angular.dev/overview)
- [Angular essentials](https://angular.dev/essentials)
- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Angular style guide](https://angular.dev/style-guide)

| [Notes index](../README.md) | [Next: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) |
`,"./chapters/02-cli-workspaces-and-first-app.md":`# 2. CLI, workspaces, and your first app

| [Previous: Angular and TypeScript foundations](01-angular-and-typescript-foundations.md) | [Notes index](../README.md) | [Next: Components and standalone architecture](03-components-and-standalone-architecture.md) |

The Angular CLI creates projects, generates common files, starts a local development server, and runs builds and tests. Use the CLI version that matches the Angular version in the workspace; the project manifest and lockfile record the installed toolchain.

## Create and run a project

The official setup guide lists the current Node.js prerequisite. Check it before installing the CLI, because supported Node versions change over time.

\`\`\`sh
npm install -g @angular/cli
ng new task-board
cd task-board
npm start
\`\`\`

The CLI asks about options such as stylesheet format, routing, and server rendering. Choose what the app needs; an answer is not permanent, and many options can be added later. The development server prints a local URL, normally \`http://localhost:4200/\`.

Useful commands:

\`\`\`sh
ng serve                 # run the development server
ng generate component features/tasks/task-list
ng generate service data/task-api
ng test                  # run the configured unit tests
ng build                 # produce a production build
\`\`\`

\`ng generate\` accepts short forms such as \`ng g c\`. Prefer readable commands in team documentation.

## Understand the workspace

A current CLI workspace commonly contains:

- \`src/\` for application source and global assets.
- \`src/main.ts\` as the browser bootstrap entry point.
- \`src/app/\` for the root component, routes, and feature code.
- \`angular.json\` for workspace and build configuration.
- \`package.json\` for scripts and dependency ranges.
- A lockfile for reproducible dependency installation.
- TypeScript configuration files for compiler behavior.

The generated filenames can vary with CLI options and naming conventions. Read the actual project rather than assuming that every Angular workspace has identical files.

## Bootstrap a standalone app

New applications use standalone APIs by default. \`bootstrapApplication\` starts the root component and can receive providers for router, HTTP, and other app-wide services.

\`\`\`ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(error => console.error(error));
\`\`\`

The root component is the top of the rendered component tree. Keep \`main.ts\` small; application configuration belongs in the generated config file when the workspace uses one.

## Development server versus production build

\`ng serve\` compiles for local development and watches for edits. It is not the artifact to upload to a production host. \`ng build\` creates deployable output according to the workspace configuration. Test the built application with the host and base path it will use.

## Keep projects maintainable

- Keep feature code together by domain as an app grows.
- Use CLI generators for consistent component and service scaffolding.
- Commit the lockfile, not \`node_modules\`.
- Do not commit access tokens, private keys, or environment secrets.
- Review CLI prompts instead of blindly accepting server rendering or other options that change deployment requirements.

## References

- [Angular installation](https://angular.dev/installation)
- [Angular CLI](https://angular.dev/tools/cli)
- [Angular workspace configuration](https://angular.dev/reference/configs/workspace-config)
- [Angular release and support policy](https://angular.dev/reference/releases)

| [Previous: Angular and TypeScript foundations](01-angular-and-typescript-foundations.md) | [Notes index](../README.md) | [Next: Components and standalone architecture](03-components-and-standalone-architecture.md) |
`,"./chapters/03-components-and-standalone-architecture.md":`# 3. Components and standalone architecture

| [Previous: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) | [Notes index](../README.md) | [Next: Templates, bindings, and events](04-templates-binding-and-events.md) |

Components are Angular's main UI building block. A component connects a TypeScript class to a template and optional styles through the \`@Component\` decorator.

## Define a component

\`\`\`ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: \`<h2>Hello, {{ name }}</h2>\`,
  styles: \`h2 { color: #b42318; }\`,
})
export class GreetingComponent {
  name = 'Angular';
}
\`\`\`

For larger templates and styles, use separate \`.html\` and \`.css\` files through \`templateUrl\` and \`styleUrl\`. Keep a component responsible for a coherent piece of UI. A page component can compose smaller presentational components.

## Standalone components

Standalone components declare their own template dependencies in \`imports\`. Current Angular CLI projects generate standalone components by default, which removes the need to declare every component in an \`NgModule\`.

\`\`\`ts
import { Component } from '@angular/core';
import { GreetingComponent } from './greeting.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent],
  template: \`<main><app-greeting /></main>\`,
})
export class HomeComponent {}
\`\`\`

Import only what the template uses. If the template uses a pipe or directive, make it available through the component's imports or an imported feature that exports it.

## Compose the application

The root component usually hosts the global shell and a router outlet. Feature components render inside the root or inside another feature component. This creates a tree, not a collection of unrelated pages.

\`\`\`html
<app-site-header />
<main>
  <router-outlet />
</main>
<app-site-footer />
\`\`\`

The \`RouterOutlet\` must be imported into the standalone component that uses it. The actual route configuration is covered in the routing chapter.

## Selectors and component files

Selectors should communicate where a component belongs, such as \`app-task-card\`. Keep component class names descriptive and PascalCase. The CLI can create the class, template, stylesheet, and test together so those files stay aligned.

## When NgModules appear

Older Angular applications often organize declarations and providers in NgModules. Existing module-based projects remain supported; migration can be incremental. When working in a legacy codebase, follow its architecture rather than mixing standalone and module patterns without a reason. New learning examples here use standalone components.

## Component boundaries

Split a component when the child has a clear responsibility, is reused, has meaningful independent state, or makes a large template easier to understand. Avoid creating one component per tiny wrapper; too many boundaries can obscure simple data flow.

## Notes to remember

- \`@Component\` describes the selector, template, imports, and styles.
- Standalone dependencies are imported where they are used.
- The root component is bootstrapped; the rest are composed into its view tree.
- Use NgModules when maintaining an existing module-based app, not because every Angular project requires one.

## References

- [Angular components essentials](https://angular.dev/essentials/components)
- [Component configuration](https://angular.dev/guide/components)
- [Standalone migration](https://angular.dev/reference/migrations/standalone)
- [Angular CLI component generator](https://angular.dev/cli/generate/component)

| [Previous: CLI, workspaces, and your first app](02-cli-workspaces-and-first-app.md) | [Notes index](../README.md) | [Next: Templates, bindings, and events](04-templates-binding-and-events.md) |
`,"./chapters/04-templates-binding-and-events.md":`# 4. Templates, bindings, and events

| [Previous: Components and standalone architecture](03-components-and-standalone-architecture.md) | [Notes index](../README.md) | [Next: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) |

An Angular template is HTML enhanced with expressions, bindings, and built-in blocks. Angular compiles templates and checks many binding mistakes during the build.

## Interpolation and property binding

Interpolation displays a value as text. Property binding sets a DOM property or a component input.

\`\`\`html
<h1>{{ pageTitle }}</h1>
<button [disabled]="isSaving">Save</button>
<img [src]="avatarUrl" [alt]="userName + ' profile photo'" />
\`\`\`

Use text interpolation for text. For a boolean property such as \`disabled\`, bind the property rather than writing a string attribute like \`disabled="false"\`.

## Event binding

Parentheses bind a DOM event to a component method. \`$event\` is available when the handler needs the browser event.

\`\`\`html
<button type="button" (click)="save()">Save</button>
<input (input)="updateSearch($event)" />
\`\`\`

\`\`\`ts
updateSearch(event: Event) {
  const input = event.target;
  if (input instanceof HTMLInputElement) {
    this.searchTerm = input.value;
  }
}
\`\`\`

Type narrowing matters because \`EventTarget\` does not guarantee an input element. For forms, Angular form controls often provide a cleaner way to manage values and validation.

## Two-way binding

Two-way binding combines reading a value and sending changes back. For native controls, \`[(ngModel)]\` is part of template-driven forms and requires \`FormsModule\`. For a child component, two-way binding can use a model input when the child should both receive and update a value.

Do not use two-way binding everywhere. A one-way input plus an explicit output often makes data flow easier to follow.

## Bind classes, styles, and attributes

Angular supports class and style bindings for conditional presentation:

\`\`\`html
<p [class.warning]="hasWarnings" [style.opacity]="isBusy ? 0.6 : 1">
  {{ statusMessage }}
</p>
<button [attr.aria-expanded]="isOpen">Details</button>
\`\`\`

Use semantic HTML and keep styling decisions in CSS where possible. Attribute binding is useful when the needed DOM attribute has no matching property or when an ARIA attribute must reflect state.

## Template expression boundaries

Template expressions are not arbitrary TypeScript. Keep them simple and avoid side effects in bindings. Move multi-step calculations into a component method, a computed signal, or a small view model. Avoid calling expensive methods repeatedly during rendering.

Angular templates do not allow a \`<script>\` element. Never use template interpolation to bypass Angular's normal text escaping for untrusted content.

## Debug a binding

When a view is wrong, check that the component is in scope, the property name matches, the value has the expected type, and the event actually reaches the element. Angular's template type checking and browser devtools both help locate the source.

## References

- [Angular template syntax](https://angular.dev/guide/templates)
- [Angular templates essentials](https://angular.dev/essentials/templates)
- [Binding dynamic text, properties, and attributes](https://angular.dev/guide/templates/binding)
- [Adding event listeners](https://angular.dev/guide/templates/event-listeners)

| [Previous: Components and standalone architecture](03-components-and-standalone-architecture.md) | [Notes index](../README.md) | [Next: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) |
`,"./chapters/05-control-flow-pipes-and-directives.md":`# 5. Control flow, pipes, and directives

| [Previous: Templates, bindings, and events](04-templates-binding-and-events.md) | [Notes index](../README.md) | [Next: Component communication and content](06-component-communication-and-content.md) |

Angular's built-in control flow makes conditional and repeated UI explicit. Pipes format values in templates. Directives add reusable behavior to elements or templates.

## Conditional content with \`@if\`

\`\`\`html
@if (loadState() === 'loading') {
  <app-spinner />
} @else if (loadState() === 'error') {
  <p role="alert">Could not load tasks.</p>
} @else {
  <app-task-list [tasks]="tasks()" />
}
\`\`\`

The built-in block is part of template syntax and does not require importing \`NgIf\`. Use an explicit loading, empty, error, and success state when those cases matter to the user.

## Repeat data with \`@for\`

\`\`\`html
@for (task of tasks(); track task.id) {
  <app-task-row [task]="task" />
} @empty {
  <p>No tasks yet. Add one to get started.</p>
}
\`\`\`

The \`track\` expression lets Angular associate each rendered row with a stable record. Prefer a unique identifier such as \`task.id\`. \`$index\` is appropriate only when the collection is static or items have no stable identity and do not reorder.

## Choose among states with \`@switch\`

\`\`\`html
@switch (requestState()) {
  @case ('loading') { <app-spinner /> }
  @case ('ready') { <app-task-list [tasks]="tasks()" /> }
  @case ('error') { <p role="alert">Try again later.</p> }
  @default { <p>Waiting to start.</p> }
}
\`\`\`

\`@switch\` cases do not fall through. For a union type, exhaustive handling can catch newly added states during template checking.

## Format values with pipes

Pipes transform values for display without changing the original data. Common pipes format dates, currencies, numbers, and JSON. Import a built-in pipe in a standalone component before using it in that template.

\`\`\`ts
import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  imports: [CurrencyPipe],
  template: \`{{ total() | currency:'USD' }}\`,
})
export class CartSummary {
  total = signal(42.5);
}
\`\`\`

Pipes are not a substitute for domain calculations. Format a value for presentation, but keep the underlying numeric amount available for comparisons and business rules.

## Directives

Attribute directives can add behavior or alter an element's presentation. Structural directives historically controlled whether a template was inserted, but for everyday conditional and repeated rendering, use \`@if\`, \`@for\`, and \`@switch\`. Create a custom directive when the behavior is reusable and does not belong to a particular component.

## Defer non-critical UI

\`@defer\` can split out eligible dependencies and load them when a trigger is met. Use it for genuinely non-critical or large UI, then verify the generated chunks and loading experience. Deferral is a performance choice; it should not hide content users need immediately.

## References

- [Angular control flow](https://angular.dev/guide/templates/control-flow)
- [Angular pipes](https://angular.dev/guide/templates/pipes)
- [Angular directives](https://angular.dev/guide/directives)
- [Deferred loading with \`@defer\`](https://angular.dev/guide/templates/defer)

| [Previous: Templates, bindings, and events](04-templates-binding-and-events.md) | [Notes index](../README.md) | [Next: Component communication and content](06-component-communication-and-content.md) |
`,"./chapters/06-component-communication-and-content.md":`# 6. Component communication and content

| [Previous: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) | [Notes index](../README.md) | [Next: Signals and reactive state](07-signals-and-reactive-state.md) |

Components stay easy to reason about when data moves through clear boundaries. A parent passes values to a child; a child emits a user intent back to its parent. Shared state belongs in a service when unrelated parts of the app need it.

## Pass data with signal inputs

\`\`\`ts
import { Component, input } from '@angular/core';

type Task = { id: number; title: string };

@Component({ selector: 'app-task-row', template: \`<span>{{ task().title }}</span>\` })
export class TaskRow {
  task = input.required<Task>();
}
\`\`\`

The parent binds \`[task]="item"\`. A required input tells the template checker that the parent must provide it. For optional values, use a default or account for \`undefined\` in the type.

## Send events with outputs

\`\`\`ts
import { Component, input, output } from '@angular/core';

@Component({ selector: 'app-task-row', template: \`<button (click)="remove.emit(taskId())">Remove</button>\` })
export class TaskRow {
  taskId = input.required<number>();
  remove = output<number>();
}
\`\`\`

The parent listens with \`(remove)="deleteTask($event)"\`. Name outputs after the event or intent. The child reports what the user requested; the owner decides how application data changes.

## Model inputs and content projection

A model input is useful for a control edited by both parent and child, such as a reusable toggle. For ordinary notifications, a separate input and output makes data flow clearer.

\`<ng-content>\` lets a component provide a shell while the caller supplies part of its content:

\`\`\`html
<section class="callout">
  <h2>{{ title() }}</h2>
  <ng-content />
</section>
\`\`\`

Use named slots with \`select\` when a component has distinct content regions. Projection works well for reusable panels and layout primitives.

## View queries and state ownership

Template reference variables and query APIs such as \`viewChild()\` are for cases where class code needs a template element or child instance. Prefer data bindings over manual DOM querying.

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
`,"./chapters/07-signals-and-reactive-state.md":`# 7. Signals and reactive state

| [Previous: Component communication and content](06-component-communication-and-content.md) | [Notes index](../README.md) | [Next: Services and dependency injection](08-services-and-dependency-injection.md) |

Signals hold current state and let Angular track which parts of a view depend on it. They are a good fit for values such as selected filters, a counter, and a loaded view model.

## Writable and computed signals

\`\`\`ts
import { computed, signal } from '@angular/core';

const quantity = signal(1);
const unitPrice = signal(12.5);
const total = computed(() => quantity() * unitPrice());

quantity.update(current => current + 1);
console.log(total());
\`\`\`

Read a signal by calling it. Update a writable signal with \`set\` or \`update\`. A computed signal is read-only, lazy, and memoized; Angular recalculates it when a signal it read changes.

## Treat signal values as immutable

Updating an object in place can leave consumers unaware of the change. Create a new object or array instead:

\`\`\`ts
const tasks = signal([{ id: 1, done: false }]);
tasks.update(items => items.map(task =>
  task.id === 1 ? { ...task, done: true } : task
));
\`\`\`

This also makes state transitions easier to inspect and test.

## Effects are for side effects

An \`effect\` runs when the signals it reads change. Use it to synchronize with an imperative API, log a value, or persist a small preference. Do not use effects to copy one signal into another; derive values with \`computed\` instead. Effects run in an injection context by default and should be created with a clear owner.

\`\`\`ts
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
\`\`\`

Browser globals such as \`localStorage\` do not exist during server rendering. Guard browser-only work or run it after rendering when the app supports SSR.

## Choose the right reactive tool

- Use a plain field for a value that does not participate in reactive rendering.
- Use a signal for current state that a template or computed value reads.
- Use an Observable for events and asynchronous streams over time.
- Use \`computed\` for synchronous derivation.
- Use \`effect\` for synchronization with something outside the signal graph.

Signals and Observables can work together; the next chapters cover services and RxJS interop.

## References

- [Angular Signals](https://angular.dev/guide/signals)
- [Signals essentials](https://angular.dev/essentials/signals)
- [Linked signals](https://angular.dev/guide/signals/linked-signal)
- [Effects](https://angular.dev/guide/signals/effect)

| [Previous: Component communication and content](06-component-communication-and-content.md) | [Notes index](../README.md) | [Next: Services and dependency injection](08-services-and-dependency-injection.md) |
`,"./chapters/08-services-and-dependency-injection.md":`# 8. Services and dependency injection

| [Previous: Signals and reactive state](07-signals-and-reactive-state.md) | [Notes index](../README.md) | [Next: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) |

Services hold reusable behavior or data access outside a particular view. Angular's dependency injection (DI) system creates and supplies dependencies to components, services, and other framework-managed code.

## Create and inject a service

\`\`\`ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly taskState = signal<string[]>([]);
  readonly tasks = this.taskState.asReadonly();

  add(title: string) {
    this.taskState.update(items => [...items, title]);
  }
}
\`\`\`

\`\`\`ts
import { Component, inject } from '@angular/core';

@Component({ template: \`{{ store.tasks().length }} tasks\` })
export class TaskSummary {
  readonly store = inject(TaskStore);
}
\`\`\`

\`providedIn: 'root'\` makes the service available from the application injector and allows tree-shaking when it is unused. A component can also provide a service locally when the instance should be scoped to that component subtree.

## Dependency injection tokens

Classes are common injection tokens, but configuration values and interfaces need an \`InjectionToken\` because TypeScript interfaces do not exist at runtime. Keep configuration explicit and avoid reading global environment values throughout the UI.

## Provider scope matters

Providing a service at the root generally creates one shared application instance. Providing it on a component creates an instance associated with that component's injector; descendants can share it, while another component tree can receive a different instance. Choose the scope based on ownership and lifetime.

## Keep services focused

A data service can own HTTP calls and map the response into application types. A state service can own shared state. A component should still own presentation details such as focus and local open/closed state. Avoid turning one service into a global container for every feature.

## Testability

DI lets tests provide a fake service instead of making a real network request. Keep dependencies behind constructor or \`inject()\` boundaries so they can be replaced in a test configuration.

## References

- [Dependency injection overview](https://angular.dev/guide/di)
- [Creating and using services](https://angular.dev/guide/di/creating-injectable-service)
- [Defining dependency providers](https://angular.dev/guide/di/defining-dependency-providers)
- [Injection tokens](https://angular.dev/guide/di/optimizing-injection-tokens)

| [Previous: Signals and reactive state](07-signals-and-reactive-state.md) | [Notes index](../README.md) | [Next: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) |
`,"./chapters/09-lifecycle-rendering-and-cleanup.md":`# 9. Lifecycle, rendering, and cleanup

| [Previous: Services and dependency injection](08-services-and-dependency-injection.md) | [Notes index](../README.md) | [Next: Routing and navigation](10-routing-and-navigation.md) |

Angular creates a component, checks its bindings, renders its view, updates it when state changes, and eventually destroys it. Lifecycle hooks let a component participate at meaningful points in that process.

## Common lifecycle hooks

- \`ngOnInit\` runs once after Angular initializes the component's inputs.
- \`ngOnChanges\` runs when input values change; the first call happens before \`ngOnInit\`.
- \`ngAfterViewInit\` runs after the component view is initialized.
- \`ngOnDestroy\` runs before the component is removed.

Signals and input transforms can remove the need for some manual change tracking. Use a hook because its lifecycle timing is needed, not as a default location for all code.

## Clean up subscriptions and listeners

Subscriptions to long-lived streams should stop when their owner is destroyed. Prefer \`async\` pipe or \`toSignal\` when they fit; both manage subscription lifetime for their view or injection context. In imperative subscriptions, use \`takeUntilDestroyed\` or explicitly unsubscribe.

\`\`\`ts
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
\`\`\`

Remove timers and browser event listeners you create. A cleanup callback can be registered with \`DestroyRef\` when a hook class is not otherwise needed.

## DOM work and render callbacks

Prefer Angular bindings and template queries over direct DOM manipulation. If an imperative library must measure or update the DOM, use render callbacks such as \`afterNextRender\` or \`afterEveryRender\` in an injection context and keep browser-only code away from server execution.

Do not read layout measurements during every change check. Batch necessary reads and writes, and clean up observers when the component is destroyed.

## Avoid lifecycle traps

- Do not change bound state at an unexpected late check phase; it can trigger expression-changed errors.
- Do not subscribe repeatedly from a hook that runs on every input change unless each subscription has a clear cleanup.
- Do not use \`setTimeout\` to conceal a state-flow problem.
- Avoid assuming \`window\`, \`document\`, or storage APIs exist in SSR.

## References

- [Component lifecycle](https://angular.dev/guide/components/lifecycle)
- [DestroyRef](https://angular.dev/guide/components/lifecycle#destroyref)
- [RxJS interop and cleanup](https://angular.dev/guide/signals/rxjs-interop)
- [Using DOM APIs](https://angular.dev/guide/components/dom-apis)

| [Previous: Services and dependency injection](08-services-and-dependency-injection.md) | [Notes index](../README.md) | [Next: Routing and navigation](10-routing-and-navigation.md) |
`,"./chapters/10-routing-and-navigation.md":`# 10. Routing and navigation

| [Previous: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) | [Notes index](../README.md) | [Next: Forms and validation](11-forms-and-validation.md) |

Angular Router maps URLs to views without reloading the whole application. Routes describe what to render; \`RouterOutlet\` marks where the active route appears; router links navigate while preserving client-side state.

## Configure routes

\`\`\`ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/task-page').then(m => m.TaskPage),
  },
  { path: '**', redirectTo: 'tasks' },
];
\`\`\`

Provide the router during bootstrap with \`provideRouter(routes)\`, and import \`RouterOutlet\` into the component template that uses it. Lazy loading keeps feature code out of the initial bundle until a route is visited.

## Navigate in templates and code

Use \`routerLink\` for links in a template. Use \`Router\` for navigation that follows an action such as saving a form. A link should still look and behave like a link for keyboard users and browser context menus.

Route parameters represent identity, such as \`/tasks/42\`. Query parameters represent optional view state, such as \`?sort=recent\`. Read route state through \`ActivatedRoute\` or the current router APIs documented for the project version.

## Nested routes

Child routes render into a nested \`RouterOutlet\`. This is useful when a section has its own shared shell or local navigation. Make parent and child ownership clear, and avoid deeply nested URL structures without a user-facing reason.

## Guards and resolvers

Guards can control client-side navigation based on local application state. They are not a security boundary: the server must still authorize protected data and actions. Resolvers can load route-critical data before activating the page; show suitable pending and error states when loading happens inside the page instead.

## Route not found and scroll behavior

Place a wildcard route after specific routes. Configure scroll restoration and anchor behavior deliberately, especially for long pages and back/forward navigation. Test direct URL loads and refreshes on the production host; static hosts often need a fallback to \`index.html\`.

## References

- [Angular routing overview](https://angular.dev/guide/routing)
- [Define routes](https://angular.dev/guide/routing/define-routes)
- [Show routes with outlets](https://angular.dev/guide/routing/show-routes-with-outlets)
- [Route loading strategies](https://angular.dev/guide/routing/loading-strategies)
- [Route access guards](https://angular.dev/guide/routing/route-guards)

| [Previous: Lifecycle, rendering, and cleanup](09-lifecycle-rendering-and-cleanup.md) | [Notes index](../README.md) | [Next: Forms and validation](11-forms-and-validation.md) |
`,"./chapters/11-forms-and-validation.md":`# 11. Forms and validation

| [Previous: Routing and navigation](10-routing-and-navigation.md) | [Notes index](../README.md) | [Next: HTTP and asynchronous data](12-http-and-asynchronous-data.md) |

Angular offers template-driven forms, reactive forms, and (in the current Angular 22 documentation) Signal Forms. Choose based on form complexity, project version, and the team's existing approach. Do not mix form models casually within one form.

## Signal Forms

Signal Forms use a writable signal as the source of truth and derive a field tree with \`form()\`. The current docs mark Signal Forms stable in Angular v22+. For projects on earlier versions, use the supported form approach for that version.

\`\`\`ts
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: \`
    <form>
      <label>Email <input type="email" [formField]="profileForm.email" /></label>
      @for (error of profileForm.email().errors(); track error.kind) {
        <p role="alert">{{ error.message }}</p>
      }
    </form>
  \`,
})
export class ProfileForm {
  model = signal({ email: '' });
  profileForm = form(this.model, path => {
    required(path.email, { message: 'Enter an email address.' });
    email(path.email, { message: 'Enter a valid email address.' });
  });
}
\`\`\`

Keep validation messages specific and associate them with the field. Validate again on the server; client validation improves the experience but cannot secure an API.

## Reactive forms

Reactive forms build an explicit model with \`FormControl\`, \`FormGroup\`, and validators. They remain a stable option for complex forms, dynamic controls, and existing applications.

\`\`\`ts
loginForm = new FormGroup({
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
});
\`\`\`

Bind the group with \`[formGroup]\` and fields with \`formControlName\`. Typed forms help keep the form model aligned with TypeScript types.

## Template-driven forms

Template-driven forms use \`ngModel\` and directives in the template. They can work well for simple forms, but as rules and dynamic behavior grow, the form's state is harder to see in one explicit model.

## Submission and errors

On submit, check the form's validity, show field-level errors after the user has interacted, and preserve entered data when a server error occurs. Disable or otherwise guard repeated submission while a request is pending. Never treat a hidden input or client-side validator as trusted data.

## References

- [Angular forms overview](https://angular.dev/guide/forms)
- [Signal Forms overview](https://angular.dev/guide/forms/signals/overview)
- [Signal Forms validation](https://angular.dev/guide/forms/signals/validation)
- [Reactive forms](https://angular.dev/guide/forms/reactive-forms)
- [Template-driven forms](https://angular.dev/guide/forms/template-driven-forms)

| [Previous: Routing and navigation](10-routing-and-navigation.md) | [Notes index](../README.md) | [Next: HTTP and asynchronous data](12-http-and-asynchronous-data.md) |
`,"./chapters/12-http-and-asynchronous-data.md":`# 12. HTTP and asynchronous data

| [Previous: Forms and validation](11-forms-and-validation.md) | [Notes index](../README.md) | [Next: RxJS and signal interop](13-rxjs-and-signal-interop.md) |

Angular's \`HttpClient\` sends HTTP requests and returns RxJS Observables. Configure it with \`provideHttpClient()\` during application bootstrap. Keep API details in a service so components can focus on loading, success, and error states.

## Request data through a service

\`\`\`ts
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
\`\`\`

The generic type describes what the app expects; it does not validate server JSON at runtime. Validate external response data at the boundary when correctness or security depends on its shape.

## Loading, errors, and cancellation

An HTTP Observable sends a request when subscribed. Unsubscribing can cancel an in-flight request. Use \`catchError\` where recovery belongs, and expose explicit state to the view. Do not turn every failure into an empty list; that makes an outage look like a successful empty response.

\`\`\`ts
type LoadState<T> =
  | { status: 'loading' }
  | { status: 'ready'; value: T }
  | { status: 'error'; message: string };
\`\`\`

Use interceptors for cross-cutting request behavior such as attaching a token or recording timing. Keep endpoint-specific mapping and business rules in the API service.

## \`httpResource\` and safe API practices

Angular's current docs include \`httpResource\` for signal-oriented data fetching. It can expose value, loading, and error state as signals. Check the exact stability and behavior in the installed Angular version; \`HttpClient\` remains a useful foundation.

- Use HTTPS outside local development.
- Keep server credentials on the server; browser bundles are public.
- Treat URL parameters and response data as untrusted input.
- Handle HTTP failures explicitly.
- Configure CORS on the server; frontend code cannot safely bypass it.

## References

- [Angular HTTP overview](https://angular.dev/guide/http)
- [Configure \`HttpClient\`](https://angular.dev/guide/http/setup)
- [Make HTTP requests](https://angular.dev/guide/http/making-requests)
- [HTTP interceptors](https://angular.dev/guide/http/interceptors)
- [Reactive data fetching with \`httpResource\`](https://angular.dev/guide/http/http-resource)

| [Previous: Forms and validation](11-forms-and-validation.md) | [Notes index](../README.md) | [Next: RxJS and signal interop](13-rxjs-and-signal-interop.md) |
`,"./chapters/13-rxjs-and-signal-interop.md":`# 13. RxJS and signal interop

| [Previous: HTTP and asynchronous data](12-http-and-asynchronous-data.md) | [Notes index](../README.md) | [Next: Testing Angular applications](14-testing-angular-applications.md) |

RxJS Observables model values over time: user input, network responses, timers, and event streams. Signals model the current value of state. Angular provides interop APIs so an app can use each where it fits.

## Compose an event stream

\`\`\`ts
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

const normalizedSearch$ = searchInput$.pipe(
  map(value => value.trim()),
  debounceTime(250),
  distinctUntilChanged(),
);
\`\`\`

Operators transform a stream without manually managing nested callbacks. \`switchMap\` is useful for a search stream where a newer query should replace an older request. \`concatMap\` preserves order; \`mergeMap\` permits concurrent work. Pick based on the operation's required behavior.

## Read an Observable as a signal

\`toSignal\` subscribes immediately and returns a signal for the latest value. Supply an initial value if the stream may not emit synchronously. Angular cleans up the subscription when its injection context is destroyed.

\`\`\`ts
import { toSignal } from '@angular/core/rxjs-interop';

readonly tasks = toSignal(this.taskApi.list(), { initialValue: [] });
\`\`\`

Do not call \`toSignal\` repeatedly for the same Observable; create it once and reuse the result. Handle errors so the user can distinguish failure from an empty value.

## Convert a signal to an Observable

\`toObservable\` exposes signal changes as an Observable. Its updates are propagated asynchronously through an effect, so it is not guaranteed to synchronously emit each intermediate value after rapid updates.

\`\`\`ts
readonly searchTerm = signal('');
readonly searchTerm$ = toObservable(this.searchTerm);
\`\`\`

## Subscription lifetime

Use the \`async\` pipe, \`toSignal\`, or \`takeUntilDestroyed\` to tie subscriptions to a component or service lifetime. Avoid unmanaged subscriptions to streams that never complete. For one-shot HTTP calls, the stream normally completes, but subscriptions can still be avoided when a template or signal is a better fit.

## Practical division

- Use signals for values the template needs to read now.
- Use Observables for events, cancellation, and stream composition.
- Use \`computed\` for synchronous derived values.
- Use RxJS operators for timing, concurrency, retries, and stream transformations.
- Convert between them at a boundary instead of maintaining duplicate state.

## References

- [RxJS interop with Angular signals](https://angular.dev/guide/signals/rxjs-interop)
- [RxJS \`toSignal\`](https://angular.dev/api/core/rxjs-interop/toSignal)
- [RxJS \`toObservable\`](https://angular.dev/api/core/rxjs-interop/toObservable)
- [RxJS operators](https://rxjs.dev/guide/operators)

| [Previous: HTTP and asynchronous data](12-http-and-asynchronous-data.md) | [Notes index](../README.md) | [Next: Testing Angular applications](14-testing-angular-applications.md) |
`,"./chapters/14-testing-angular-applications.md":`# 14. Testing Angular applications

| [Previous: RxJS and signal interop](13-rxjs-and-signal-interop.md) | [Notes index](../README.md) | [Next: Accessibility, security, and performance](15-accessibility-security-and-performance.md) |

Tests make behavior repeatable. Angular testing utilities create components and inject dependencies so a test can check observable outcomes without relying on manual clicking for every change.

## Test behavior, not implementation details

A useful component test creates the component, renders its template, interacts through the DOM, and checks what the user can observe. Avoid tests coupled to private fields or incidental implementation details; those tests make refactoring harder without protecting behavior.

\`\`\`ts
it('adds a task when the form is submitted', async () => {
  const fixture = TestBed.createComponent(TaskForm);
  fixture.detectChanges();

  const input = fixture.nativeElement.querySelector('input');
  input.value = 'Review pull request';
  input.dispatchEvent(new Event('input'));
  fixture.nativeElement.querySelector('button').click();
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Review pull request');
});
\`\`\`

The exact setup depends on the form and test runner. New CLI workspaces can use the test tooling selected at project creation; check its generated scripts rather than assuming a specific runner.

## Isolate external dependencies

Provide a fake API service for component tests. Test the API service separately with Angular's HTTP testing utilities, which can capture a request and return a controlled response without contacting a real server.

Test important paths: normal data, empty data, validation failures, loading behavior, and server errors. Keep each test focused so a failure points to one behavior.

## Routing and asynchronous behavior

Use router testing utilities for navigation and route parameters. For asynchronous work, wait on the actual promise, stream, or fixture stabilization supported by the configured runner. Avoid arbitrary sleeps; they make suites slow and flaky.

## Test pyramid in practice

- Unit tests check pure functions and small state transitions quickly.
- Component tests check template behavior and inputs/outputs.
- Integration tests verify that services, routing, and UI work together.
- End-to-end tests cover a few critical user journeys in a real browser.

Use tests to reduce risk where behavior is important, not to assert every CSS class or duplicate the implementation line by line.

## References

- [Angular testing overview](https://angular.dev/guide/testing)
- [Basics of component testing](https://angular.dev/guide/testing/components-basics)
- [Testing services](https://angular.dev/guide/testing/services)
- [Testing HTTP requests](https://angular.dev/guide/http/testing)
- [Testing routes](https://angular.dev/guide/routing/testing)

| [Previous: RxJS and signal interop](13-rxjs-and-signal-interop.md) | [Notes index](../README.md) | [Next: Accessibility, security, and performance](15-accessibility-security-and-performance.md) |
`,"./chapters/15-accessibility-security-and-performance.md":`# 15. Accessibility, security, and performance

| [Previous: Testing Angular applications](14-testing-angular-applications.md) | [Notes index](../README.md) | [Next: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) |

Accessible, secure, and fast behavior comes from everyday implementation choices. Angular helps with some defaults, but application code still needs sound HTML, careful data handling, and measured performance work.

## Build accessible interactions

- Use native buttons for actions and anchors for navigation.
- Give inputs visible labels and connect validation messages to their fields.
- Keep keyboard focus visible and predictable in menus, dialogs, and route changes.
- Use headings in a meaningful order and provide text alternatives for informative images.
- Use ARIA only when native HTML does not already express the correct semantics.
- Test keyboard navigation and inspect the interface with assistive technology.

Do not rely on color alone for errors or selected state. Announce important asynchronous status changes without flooding a live region.

## Angular security basics

Angular treats template-bound values as untrusted and sanitizes many values for the relevant DOM context. Do not bypass sanitization with \`bypassSecurityTrust...\` unless the value is reviewed and the security boundary is understood. Never render untrusted HTML as trusted markup.

Avoid \`javascript:\` URLs, unsafe dynamic code, and secrets in client bundles. Client-side route guards can improve navigation behavior, but server authorization must protect data and operations. Keep dependencies patched and review third-party packages.

## Measure before optimizing

Use production builds and browser performance tools to find the actual bottleneck. Lazy-load route features, use \`@defer\` for appropriate non-critical UI, and track repeated list items with stable IDs. Avoid expensive work in template expressions and unnecessary subscriptions.

Signals help Angular track state dependencies, but they do not make expensive calculations free. Cache derived work with \`computed\` when appropriate and avoid creating new large data structures on every render.

## Responsive and resilient UI

Use semantic structure, flexible layouts, and useful empty/error/loading states. Verify narrow viewports, zoom, reduced motion preferences, and slow network conditions. A performance optimization should preserve a clear loading and fallback experience.

## References

- [Angular accessibility guide](https://angular.dev/best-practices/a11y)
- [Angular security guide](https://angular.dev/best-practices/security)
- [Angular performance guide](https://angular.dev/best-practices/performance)
- [Angular template defer](https://angular.dev/guide/templates/defer)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

| [Previous: Testing Angular applications](14-testing-angular-applications.md) | [Notes index](../README.md) | [Next: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) |
`,"./chapters/16-ssr-hydration-and-deployment.md":`# 16. SSR, hydration, and deployment

| [Previous: Accessibility, security, and performance](15-accessibility-security-and-performance.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |

Angular applications use client-side rendering by default. Depending on the product, server-side rendering (SSR), prerendering (static generation), or a hybrid strategy can improve initial content delivery and search visibility. Each option changes build and hosting needs.

## Choose a rendering strategy

- **CSR** renders the app in the browser. It is simple to host as static files and fits many interactive applications.
- **SSR** renders a request on the server, then the browser hydrates the HTML to attach client behavior.
- **Prerendering** creates HTML at build time for routes whose content is known then.
- **Hybrid rendering** lets routes use different strategies where supported by the application setup.

Rendering strategy is a product and hosting decision, not a default requirement for every site. Compare first content time, SEO needs, personalization, caching, and operational cost.

## Browser-only APIs and hydration

Server code has no browser \`window\`, \`document\`, or \`localStorage\`. Keep browser-dependent work behind platform-aware boundaries or render callbacks. Hydration reuses server-rendered DOM in the browser; avoid code that produces different initial markup on server and client, since mismatches can cause extra work or visual changes.

## Build and host

Run the production build and inspect the generated output. Static hosting needs correct MIME types and, for client-side routes, a fallback that serves the app entry document on direct navigation. A non-root deployment path must be reflected in the build and host configuration.

Keep secrets in a server-side environment, not in frontend environment files. For SSR, deploy to a runtime that supports the generated server entry and configure its environment safely.

## Release checklist

1. Run tests and linting.
2. Build with production settings.
3. Check direct loads and refreshes on nested routes.
4. Verify API URLs, asset paths, and error states in the target environment.
5. Confirm no credentials or source maps with sensitive content are published unintentionally.
6. Monitor errors and performance after release.

## References

- [Angular rendering strategies](https://angular.dev/guide/routing/rendering-strategies)
- [Angular server and hybrid rendering](https://angular.dev/guide/ssr)
- [Angular hydration](https://angular.dev/guide/hydration)
- [Angular deployment](https://angular.dev/tools/cli/deployment)

| [Previous: Accessibility, security, and performance](15-accessibility-security-and-performance.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |
`,"./chapters/98-all-code-samples.md":`# 98. Angular code samples

| [Previous: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) | [Notes index](../README.md) | [Next: Complete Q&A](99-complete-q-and-a.md) |

Small examples collected for quick reference. They are building blocks, not a complete production application; add error handling, tests, and project-specific types before using them in a real feature.

## Standalone component and signal state

\`\`\`ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubled() }}</p>
    <button type="button" (click)="increment()">Add one</button>
  \`,
})
export class Counter {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }
}
\`\`\`

## Render a stable list

\`\`\`html
@for (task of tasks(); track task.id) {
  <article>
    <h2>{{ task.title }}</h2>
    <button type="button" (click)="remove(task.id)">Remove</button>
  </article>
} @empty {
  <p>No tasks yet.</p>
}
\`\`\`

## Pass an input and emit an output

\`\`\`ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  template: \`<button type="button" (click)="confirmed.emit()">{{ label() }}</button>\`,
})
export class ConfirmButton {
  label = input('Confirm');
  confirmed = output<void>();
}
\`\`\`

## Provide a service and configure HTTP

\`\`\`ts
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
\`\`\`

## Lazy route

\`\`\`ts
export const routes: Routes = [
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings-page')
      .then(module => module.SettingsPage),
  },
  { path: '**', redirectTo: '' },
];
\`\`\`

## Stream-to-signal bridge

\`\`\`ts
readonly tasks = toSignal(this.taskApi.list(), { initialValue: [] });
\`\`\`

Create this bridge once within an injection context. For loading and failure states, model those states explicitly instead of treating an empty initial array as a completed response.

## Reactive form control

\`\`\`ts
readonly email = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required, Validators.email],
});
\`\`\`

## Notes

- Import template dependencies in the standalone component that uses them.
- Give repeated data a stable tracking key.
- Use server validation for every security-sensitive rule.
- Check API stability and exact signatures for the Angular version in the workspace.

| [Previous: SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md) | [Notes index](../README.md) | [Next: Complete Q&A](99-complete-q-and-a.md) |
`,"./chapters/99-complete-q-and-a.md":`# 99. Complete Q&A

| [Previous: Angular code samples](98-all-code-samples.md) | [Notes index](../README.md) |

## Angular basics

### Is Angular the same thing as TypeScript?

No. TypeScript is the language used to author most Angular application code. Angular is the framework that supplies components, templates, DI, routing, forms, and other app capabilities.

### Does every Angular app need an NgModule?

No. New CLI projects use standalone APIs by default. NgModules remain supported for existing applications and libraries that use them.

### What belongs in a component?

The behavior and view state for one coherent part of the interface. Reusable data access belongs in a service, while shared rendering belongs in child components.

## Templates and state

### What is the difference between \`{{ value }}\` and \`[value]="value"\`?

Interpolation renders a value as text. Property binding sets a DOM property or component input.

### Why should \`@for\` use \`track\`?

It lets Angular associate each rendered row with a stable data item and update the minimum necessary DOM. Prefer a unique ID.

### Are signals a replacement for RxJS?

No. Signals represent current state; Observables represent values over time and provide stream operators for events, cancellation, and concurrency. Angular offers APIs to bridge them.

### Should I use an effect to keep two signals synchronized?

Usually no. Derive one value with \`computed\`. Effects are intended for side effects such as synchronizing with an external API.

## Dependency injection and routing

### Why use a service?

A service can own reusable logic or data access outside a particular view. DI supplies it to the parts of the app that need it and lets tests replace it.

### Does a route guard secure data?

No. A browser user can alter client code and state. Enforce authorization on the server; guards only control client navigation and improve the user experience.

### Why does refreshing a nested route return 404?

The hosting server may be looking for a physical file at that URL. Configure a fallback or server route so client-side routes serve the application entry document.

## Forms and HTTP

### Which Angular form approach should I use?

Use Signal Forms for new signal-based forms when the project version supports the stable API. Reactive forms remain suitable for complex forms and established codebases. Template-driven forms can fit small forms.

### Does a TypeScript generic validate an HTTP response?

No. \`http.get<Task[]>()\` tells the compiler what the program expects; it does not inspect server JSON at runtime.

### Does client validation protect the server?

No. Validate submitted data on the server as well. Client validation provides faster feedback but is controlled by the user.

### Should every HTTP error become an empty list?

No. An empty successful result and a failed request are different states. Preserve that difference in the UI and let the user retry when appropriate.

## Testing and rendering

### What should a component test verify?

Important behavior visible to a user: rendered text, enabled state, validation, output events, and responses to interaction. Avoid overfitting tests to private implementation details.

### Is SSR required for an Angular app?

No. CSR is the default and fits many interactive apps. Use SSR or prerendering when initial content, search visibility, or a delivery requirement justifies its build and hosting complexity.

### Can browser APIs run during SSR?

Not on the server. \`window\`, \`document\`, and browser storage are unavailable there. Keep browser-only work behind a platform-aware boundary or a suitable render callback.

## Notes index

- [Angular and TypeScript foundations](01-angular-and-typescript-foundations.md)
- [Components and standalone architecture](03-components-and-standalone-architecture.md)
- [Signals and reactive state](07-signals-and-reactive-state.md)
- [Routing and navigation](10-routing-and-navigation.md)
- [Forms and validation](11-forms-and-validation.md)
- [SSR, hydration, and deployment](16-ssr-hydration-and-deployment.md)

## References

- [Angular documentation](https://angular.dev/)
- [Angular releases](https://angular.dev/reference/releases)

| [Previous: Angular code samples](98-all-code-samples.md) | [Notes index](../README.md) |
`})).map(([e,t])=>{let n=e.split(`/`).at(-1);return{content:t,fileName:n,number:Number(n.match(/^\d+/)?.[0]??0),slug:n.replace(/^\d+-/,``).replace(/\.md$/i,``),title:(t.match(/^#\s+(.+)$/m)?.[1]??n).replace(/^\d+\.\s*/,``)}}).sort((e,t)=>e.number-t.number),h=`/notes/angular-notes`,g=new Map(m.map(e=>[e.fileName,e]));function _({href:e=``,children:n,...r}){let{node:i,...a}=r,[o,s]=e.split(`#`),c=o.split(`/`).at(-1),l=g.get(c),u=s?`#${s}`:``;if(/^README\.md$/i.test(c))return(0,p.createElement)(t,{to:`${h}${u}`,...a},n);if(l)return(0,p.createElement)(t,{to:`${h}/${l.slug}${u}`,...a},n);let d=/^(https?:|mailto:|tel:)/i.test(e);return(0,p.createElement)(`a`,{href:e,target:d?`_blank`:void 0,rel:d?`noopener noreferrer`:void 0,...a},n)}var v={a:_},y=`# Angular Notes

A practical Angular learning guide built around the current standalone application model. It starts with TypeScript and the Angular CLI, then moves through components, templates, signals, dependency injection, routing, forms, HTTP, testing, and production rendering.

The examples use Angular 22-era APIs and TypeScript. Older Angular projects may use NgModules, RxJS-heavy state, or different CLI defaults; those patterns are called out where they matter. Check the linked Angular documentation when an API or compatibility detail depends on the exact version in your project.

## Chapters

1. [Angular and TypeScript foundations](chapters/01-angular-and-typescript-foundations.md)
2. [CLI, workspaces, and your first app](chapters/02-cli-workspaces-and-first-app.md)
3. [Components and standalone architecture](chapters/03-components-and-standalone-architecture.md)
4. [Templates, bindings, and events](chapters/04-templates-binding-and-events.md)
5. [Control flow, pipes, and directives](chapters/05-control-flow-pipes-and-directives.md)
6. [Component communication and content](chapters/06-component-communication-and-content.md)
7. [Signals and reactive state](chapters/07-signals-and-reactive-state.md)
8. [Services and dependency injection](chapters/08-services-and-dependency-injection.md)
9. [Lifecycle, rendering, and cleanup](chapters/09-lifecycle-rendering-and-cleanup.md)
10. [Routing and navigation](chapters/10-routing-and-navigation.md)
11. [Forms and validation](chapters/11-forms-and-validation.md)
12. [HTTP and asynchronous data](chapters/12-http-and-asynchronous-data.md)
13. [RxJS and signal interop](chapters/13-rxjs-and-signal-interop.md)
14. [Testing Angular applications](chapters/14-testing-angular-applications.md)
15. [Accessibility, security, and performance](chapters/15-accessibility-security-and-performance.md)
16. [SSR, hydration, and deployment](chapters/16-ssr-hydration-and-deployment.md)
17. [All code samples](chapters/98-all-code-samples.md)
18. [Complete Q&A](chapters/99-complete-q-and-a.md)

These notes are original study material, not copied from another repository. Official Angular documentation is linked in each chapter so APIs can be checked against the version being used.

## Official references

- [Angular documentation](https://angular.dev/)
- [Angular installation](https://angular.dev/installation)
- [Angular releases and support](https://angular.dev/reference/releases)\r
`,b={layout:`_layout_4vo94_1`,projectHeader:`_projectHeader_4vo94_10`,backLink:`_backLink_4vo94_27`,projectIdentity:`_projectIdentity_4vo94_41`,eyebrow:`_eyebrow_4vo94_44`,chapterCount:`_chapterCount_4vo94_71`,body:`_body_4vo94_83`,sidebar:`_sidebar_4vo94_94`,sidebarHeading:`_sidebarHeading_4vo94_107`,navigation:`_navigation_4vo94_126`,navLink:`_navLink_4vo94_141`,active:`_active_4vo94_164`,navNumber:`_navNumber_4vo94_166`,content:`_content_4vo94_177`,chapterHeading:`_chapterHeading_4vo94_180`,markdown:`_markdown_4vo94_203`,missingChapter:`_missingChapter_4vo94_245`,chapterNavigation:`_chapterNavigation_4vo94_256`,referenceLink:`_referenceLink_4vo94_283`},x=r(),S=`/notes/angular-notes`;function C(){let{chapterSlug:e}=u(),{pathname:r}=i(),a=(0,p.useRef)(null),h=m.findIndex(t=>t.slug===e),g=h>=0?m[h]:null,_=e?g?.content:y;return(0,p.useEffect)(()=>{a.current?.querySelector(`[aria-current="page"]`)?.scrollIntoView({behavior:`smooth`,block:`nearest`})},[r]),(0,x.jsxs)(`div`,{className:b.layout,children:[(0,x.jsxs)(`header`,{className:b.projectHeader,children:[(0,x.jsxs)(t,{className:b.backLink,to:`/notes`,children:[(0,x.jsx)(c,{"aria-hidden":`true`}),` All notes`]}),(0,x.jsxs)(`div`,{className:b.projectIdentity,children:[(0,x.jsxs)(`span`,{className:b.eyebrow,children:[(0,x.jsx)(s,{"aria-hidden":`true`}),` ANGULAR AND TYPESCRIPT`]}),(0,x.jsx)(`h1`,{children:`Angular Notes`}),(0,x.jsx)(`p`,{children:`A practical guide to building Angular apps, from the first component to production.`})]}),(0,x.jsxs)(`span`,{className:b.chapterCount,children:[m.length,` chapters`]})]}),(0,x.jsxs)(`div`,{className:b.body,children:[(0,x.jsxs)(`aside`,{className:b.sidebar,children:[(0,x.jsxs)(`div`,{className:b.sidebarHeading,children:[(0,x.jsx)(`span`,{children:`CONTENTS`}),(0,x.jsx)(`strong`,{children:`Angular study guide`})]}),(0,x.jsxs)(`nav`,{ref:a,className:b.navigation,"aria-label":`Angular notes chapters`,children:[(0,x.jsxs)(n,{to:S,end:!0,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(s,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:`Overview`})]}),m.map(e=>(0,x.jsxs)(n,{to:`${S}/${e.slug}`,className:({isActive:e})=>`${b.navLink} ${e?b.active:``}`,children:[(0,x.jsx)(`span`,{className:b.navNumber,children:String(e.number).padStart(2,`0`)}),(0,x.jsx)(`span`,{children:e.title})]},e.slug))]})]}),(0,x.jsxs)(`main`,{className:b.content,children:[g&&(0,x.jsxs)(`div`,{className:b.chapterHeading,children:[(0,x.jsxs)(`span`,{children:[(0,x.jsx)(l,{"aria-hidden":`true`}),` CHAPTER `,String(g.number).padStart(2,`0`)]}),(0,x.jsx)(`h2`,{children:g.title})]}),_?(0,x.jsx)(`article`,{className:b.markdown,children:(0,x.jsx)(d,{remarkPlugins:[f],components:v,children:_})}):(0,x.jsxs)(`section`,{className:b.missingChapter,children:[(0,x.jsx)(`span`,{children:`CHAPTER NOT FOUND`}),(0,x.jsx)(`h2`,{children:`This Angular notes chapter is unavailable.`}),(0,x.jsxs)(t,{to:S,children:[`Back to the Angular notes index `,(0,x.jsx)(o,{"aria-hidden":`true`})]})]}),g&&(0,x.jsxs)(`nav`,{className:b.chapterNavigation,"aria-label":`Previous and next chapters`,children:[(0,x.jsxs)(t,{to:h===0?S:`${S}/${m[h-1].slug}`,children:[(0,x.jsx)(c,{"aria-hidden":`true`}),(0,x.jsx)(`span`,{children:h===0?`Notes index`:m[h-1].title})]}),h<m.length-1&&(0,x.jsxs)(t,{to:`${S}/${m[h+1].slug}`,children:[(0,x.jsx)(`span`,{children:m[h+1].title}),(0,x.jsx)(o,{"aria-hidden":`true`})]})]})]})]}),(0,x.jsxs)(`a`,{className:b.referenceLink,href:`https://angular.dev/`,target:`_blank`,rel:`noopener noreferrer`,children:[`Official Angular Documentation `,(0,x.jsx)(o,{"aria-hidden":`true`})]})]})}export{C as default};