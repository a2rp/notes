# 4. Templates, bindings, and events

| [Previous: Components and standalone architecture](03-components-and-standalone-architecture.md) | [Notes index](../README.md) | [Next: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) |

An Angular template is HTML enhanced with expressions, bindings, and built-in blocks. Angular compiles templates and checks many binding mistakes during the build.

## Interpolation and property binding

Interpolation displays a value as text. Property binding sets a DOM property or a component input.

```html
<h1>{{ pageTitle }}</h1>
<button [disabled]="isSaving">Save</button>
<img [src]="avatarUrl" [alt]="userName + ' profile photo'" />
```

Use text interpolation for text. For a boolean property such as `disabled`, bind the property rather than writing a string attribute like `disabled="false"`.

## Event binding

Parentheses bind a DOM event to a component method. `$event` is available when the handler needs the browser event.

```html
<button type="button" (click)="save()">Save</button>
<input (input)="updateSearch($event)" />
```

```ts
updateSearch(event: Event) {
  const input = event.target;
  if (input instanceof HTMLInputElement) {
    this.searchTerm = input.value;
  }
}
```

Type narrowing matters because `EventTarget` does not guarantee an input element. For forms, Angular form controls often provide a cleaner way to manage values and validation.

## Two-way binding

Two-way binding combines reading a value and sending changes back. For native controls, `[(ngModel)]` is part of template-driven forms and requires `FormsModule`. For a child component, two-way binding can use a model input when the child should both receive and update a value.

Do not use two-way binding everywhere. A one-way input plus an explicit output often makes data flow easier to follow.

## Bind classes, styles, and attributes

Angular supports class and style bindings for conditional presentation:

```html
<p [class.warning]="hasWarnings" [style.opacity]="isBusy ? 0.6 : 1">
  {{ statusMessage }}
</p>
<button [attr.aria-expanded]="isOpen">Details</button>
```

Use semantic HTML and keep styling decisions in CSS where possible. Attribute binding is useful when the needed DOM attribute has no matching property or when an ARIA attribute must reflect state.

## Template expression boundaries

Template expressions are not arbitrary TypeScript. Keep them simple and avoid side effects in bindings. Move multi-step calculations into a component method, a computed signal, or a small view model. Avoid calling expensive methods repeatedly during rendering.

Angular templates do not allow a `<script>` element. Never use template interpolation to bypass Angular's normal text escaping for untrusted content.

## Debug a binding

When a view is wrong, check that the component is in scope, the property name matches, the value has the expected type, and the event actually reaches the element. Angular's template type checking and browser devtools both help locate the source.

## References

- [Angular template syntax](https://angular.dev/guide/templates)
- [Angular templates essentials](https://angular.dev/essentials/templates)
- [Binding dynamic text, properties, and attributes](https://angular.dev/guide/templates/binding)
- [Adding event listeners](https://angular.dev/guide/templates/event-listeners)

| [Previous: Components and standalone architecture](03-components-and-standalone-architecture.md) | [Notes index](../README.md) | [Next: Control flow, pipes, and directives](05-control-flow-pipes-and-directives.md) |
