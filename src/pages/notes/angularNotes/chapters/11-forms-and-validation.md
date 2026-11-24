# 11. Forms and validation

| [Previous: Routing and navigation](10-routing-and-navigation.md) | [Notes index](../README.md) | [Next: HTTP and asynchronous data](12-http-and-asynchronous-data.md) |

Angular offers template-driven forms, reactive forms, and (in the current Angular 22 documentation) Signal Forms. Choose based on form complexity, project version, and the team's existing approach. Do not mix form models casually within one form.

## Signal Forms

Signal Forms use a writable signal as the source of truth and derive a field tree with `form()`. The current docs mark Signal Forms stable in Angular v22+. For projects on earlier versions, use the supported form approach for that version.

```ts
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <form>
      <label>Email <input type="email" [formField]="profileForm.email" /></label>
      @for (error of profileForm.email().errors(); track error.kind) {
        <p role="alert">{{ error.message }}</p>
      }
    </form>
  `,
})
export class ProfileForm {
  model = signal({ email: '' });
  profileForm = form(this.model, path => {
    required(path.email, { message: 'Enter an email address.' });
    email(path.email, { message: 'Enter a valid email address.' });
  });
}
```

Keep validation messages specific and associate them with the field. Validate again on the server; client validation improves the experience but cannot secure an API.

## Reactive forms

Reactive forms build an explicit model with `FormControl`, `FormGroup`, and validators. They remain a stable option for complex forms, dynamic controls, and existing applications.

```ts
loginForm = new FormGroup({
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
});
```

Bind the group with `[formGroup]` and fields with `formControlName`. Typed forms help keep the form model aligned with TypeScript types.

## Template-driven forms

Template-driven forms use `ngModel` and directives in the template. They can work well for simple forms, but as rules and dynamic behavior grow, the form's state is harder to see in one explicit model.

## Submission and errors

On submit, check the form's validity, show field-level errors after the user has interacted, and preserve entered data when a server error occurs. Disable or otherwise guard repeated submission while a request is pending. Never treat a hidden input or client-side validator as trusted data.

## References

- [Angular forms overview](https://angular.dev/guide/forms)
- [Signal Forms overview](https://angular.dev/guide/forms/signals/overview)
- [Signal Forms validation](https://angular.dev/guide/forms/signals/validation)
- [Reactive forms](https://angular.dev/guide/forms/reactive-forms)
- [Template-driven forms](https://angular.dev/guide/forms/template-driven-forms)

| [Previous: Routing and navigation](10-routing-and-navigation.md) | [Notes index](../README.md) | [Next: HTTP and asynchronous data](12-http-and-asynchronous-data.md) |
