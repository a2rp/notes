# 2. CLI, workspaces, and your first app

| [Previous: Angular and TypeScript foundations](01-angular-and-typescript-foundations.md) | [Notes index](../README.md) | [Next: Components and standalone architecture](03-components-and-standalone-architecture.md) |

The Angular CLI creates projects, generates common files, starts a local development server, and runs builds and tests. Use the CLI version that matches the Angular version in the workspace; the project manifest and lockfile record the installed toolchain.

## Create and run a project

The official setup guide lists the current Node.js prerequisite. Check it before installing the CLI, because supported Node versions change over time.

```sh
npm install -g @angular/cli
ng new task-board
cd task-board
npm start
```

The CLI asks about options such as stylesheet format, routing, and server rendering. Choose what the app needs; an answer is not permanent, and many options can be added later. The development server prints a local URL, normally `http://localhost:4200/`.

Useful commands:

```sh
ng serve                 # run the development server
ng generate component features/tasks/task-list
ng generate service data/task-api
ng test                  # run the configured unit tests
ng build                 # produce a production build
```

`ng generate` accepts short forms such as `ng g c`. Prefer readable commands in team documentation.

## Understand the workspace

A current CLI workspace commonly contains:

- `src/` for application source and global assets.
- `src/main.ts` as the browser bootstrap entry point.
- `src/app/` for the root component, routes, and feature code.
- `angular.json` for workspace and build configuration.
- `package.json` for scripts and dependency ranges.
- A lockfile for reproducible dependency installation.
- TypeScript configuration files for compiler behavior.

The generated filenames can vary with CLI options and naming conventions. Read the actual project rather than assuming that every Angular workspace has identical files.

## Bootstrap a standalone app

New applications use standalone APIs by default. `bootstrapApplication` starts the root component and can receive providers for router, HTTP, and other app-wide services.

```ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(error => console.error(error));
```

The root component is the top of the rendered component tree. Keep `main.ts` small; application configuration belongs in the generated config file when the workspace uses one.

## Development server versus production build

`ng serve` compiles for local development and watches for edits. It is not the artifact to upload to a production host. `ng build` creates deployable output according to the workspace configuration. Test the built application with the host and base path it will use.

## Keep projects maintainable

- Keep feature code together by domain as an app grows.
- Use CLI generators for consistent component and service scaffolding.
- Commit the lockfile, not `node_modules`.
- Do not commit access tokens, private keys, or environment secrets.
- Review CLI prompts instead of blindly accepting server rendering or other options that change deployment requirements.

## References

- [Angular installation](https://angular.dev/installation)
- [Angular CLI](https://angular.dev/tools/cli)
- [Angular workspace configuration](https://angular.dev/reference/configs/workspace-config)
- [Angular release and support policy](https://angular.dev/reference/releases)

| [Previous: Angular and TypeScript foundations](01-angular-and-typescript-foundations.md) | [Notes index](../README.md) | [Next: Components and standalone architecture](03-components-and-standalone-architecture.md) |
