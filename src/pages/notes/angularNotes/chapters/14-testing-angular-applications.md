# 14. Testing Angular applications

| [Previous: RxJS and signal interop](13-rxjs-and-signal-interop.md) | [Notes index](../README.md) | [Next: Accessibility, security, and performance](15-accessibility-security-and-performance.md) |

Tests make behavior repeatable. Angular testing utilities create components and inject dependencies so a test can check observable outcomes without relying on manual clicking for every change.

## Test behavior, not implementation details

A useful component test creates the component, renders its template, interacts through the DOM, and checks what the user can observe. Avoid tests coupled to private fields or incidental implementation details; those tests make refactoring harder without protecting behavior.

```ts
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
```

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
