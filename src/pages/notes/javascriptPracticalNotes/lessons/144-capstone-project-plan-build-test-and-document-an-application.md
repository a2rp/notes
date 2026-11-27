# 144 - Capstone project: plan, build, test, and document an application

A capstone turns separate programming skills into one deliverable. This chapter plans and builds a small reading list application, then reviews its tests, accessibility, data handling, and documentation.

The goal is not to include every feature from the course. The goal is to choose a useful scope, make the requirements clear, build the smallest complete version, and explain its limits honestly.

## Learning goals

- Turn a problem statement into user stories and acceptance criteria.
- Separate required features from optional ideas.
- Plan a small architecture and data model before implementation.
- Build a usable application in short, reviewable steps.
- Test core logic and important user flows.
- Review error handling, accessibility, security, and storage behavior.
- Write setup instructions and document known limitations.
- Prepare a clear release checklist.

## Choose a useful, achievable scope

The capstone is a reading list. A visitor can add a book, mark it read or unread, search and filter the list, and remove an entry. The browser stores the list locally.

A first version does not need accounts, cloud synchronization, recommendations, a public API, or a database. Those features add cost and failure cases. Keep them as future work unless they are necessary for the core user story.

### User story

> As a reader, I want to save books I plan to read and mark them finished so I can keep a simple personal reading list.

### Acceptance criteria

1. A visitor can add a book with a title and author.
2. Whitespace-only titles and authors are rejected.
3. Input length limits are communicated and enforced.
4. A saved book appears in the list with its reading state.
5. A visitor can mark a book read or unread.
6. A visitor can remove a book.
7. Search matches title and author.
8. Filters show all books, unread books, or read books.
9. The page has useful empty and no-match messages.
10. The list is restored after a reload when browser storage is available.
11. Storage failure or invalid saved data does not silently overwrite the prior value.
12. Controls are labeled, keyboard accessible, and have visible focus.
13. Core data transformations have automated tests.
14. A new contributor can install nothing, run the project, run its tests, and understand its limits from the documentation.

Acceptance criteria make "done" observable. They also help decide whether a feature belongs in the first version.

## Plan before implementation

Write a small project brief:

- **Problem:** Readers need a place to keep a personal list of books.
- **Audience:** One person using the application in a browser.
- **Core value:** Add, find, mark, and remove books.
- **Data:** A stable ID, title, author, read state, and creation time.
- **Persistence:** Browser local storage on the current device and origin.
- **Risks:** Storage can be unavailable, full, or contain invalid data.
- **Out of scope:** Accounts, server sync, backups, and sharing.

Then sketch the main interaction:

~~~text
form submission
  -> validate title and author
  -> create a book record
  -> update in-memory state
  -> save if storage is available
  -> render the list and status

filter or search change
  -> update view state
  -> derive visible books
  -> render the filtered list
~~~

A short flow sketch exposes where validation, persistence, and rendering belong before they become tangled in event handlers.

## Choose a small architecture

Keep responsibilities separate without overengineering:

~~~text
reading-list/
  index.html
  styles.css
  package.json
  server.mjs
  README.md
  src/
    app.js
    library.js
    storage.js
  test/
    library.test.js
~~~

- **index.html** provides semantic page structure.
- **styles.css** controls the visual presentation.
- **library.js** validates and transforms book data.
- **storage.js** reads and writes the versioned local data.
- **app.js** connects browser events, state, storage, and rendering.
- **server.mjs** serves the static files during local development.
- **library.test.js** tests domain logic without needing a browser.
- **README.md** explains setup, use, tests, and limits.

A package manifest declares the module format and scripts. There are no external dependencies in this project.

## Define the data model

Use a small record with explicit field meanings:

~~~js
{
  id: "unique-id",
  title: "A book title",
  author: "An author's name",
  read: false,
  addedAt: "2026-11-20T12:00:00.000Z"
}
~~~

The ID is used to find a record when a control is activated. It should not depend on the record's current array position, because filtering or removal changes positions.

Keep date values in a portable string format. Validate data when it enters the application, including data loaded from browser storage. A value written by the application can still be malformed later through developer tools, old code, or partial edits.

## Implement in small vertical slices

Build a thin usable path before adding every interaction:

1. Create the page structure and labeled add form.
2. Add pure functions for creating, validating, filtering, and removing book records.
3. Render a list from in-memory state using DOM creation methods.
4. Add a book and show a clear validation message.
5. Add read-state updates, removal, search, and filters.
6. Add persistence behind a small storage interface.
7. Add loading or storage-warning and empty states.
8. Add automated domain tests.
9. Review keyboard behavior and responsive layout.
10. Write setup and troubleshooting documentation.

A vertical slice works from input through visible result. It gives a usable checkpoint early and makes regressions easier to locate.

## Keep state and rendering separate

The browser application has two kinds of state:

- **Library data:** the book records.
- **View state:** the search text and selected filter.

The visible list is derived from both. Do not mutate the array just to apply a filter. Keep every record in the library state and derive a separate visible array.

When the visitor toggles a book's read status, create the next state, save it if possible, and render again. A render function should describe the current state. It should not add or remove records as a side effect.

Use safe DOM construction for book titles and authors. These values are visitor-controlled data, even when they are later restored from storage. Assign them as text instead of parsing them as markup.

## Treat browser storage as a boundary

Local storage is convenient for a small single-device project, but it is not a database and does not synchronize across devices. Browser policy, private browsing behavior, storage quota, or user settings can make access fail.

Wrap storage calls in error handling. Parse and validate stored JSON before using it. If the saved data cannot be read, show a useful warning and avoid replacing the stored value with an empty list automatically.

If saving fails, keep the current session usable when practical, but tell the visitor that the change may not survive a reload. Do not show a success message that implies persistence when the write failed.

Client-side validation improves the user experience, but it is not a security boundary. If the app later sends data to a server, the server must validate it independently and enforce authorization.

## Test at the right levels

Testing is not a single command. Choose tests that match the responsibility:

### Unit tests

Test deterministic domain functions such as:

- Creating a valid book with trimmed fields.
- Rejecting a missing or overlong title.
- Filtering by title and author.
- Selecting read or unread records.
- Removing one ID without changing the original array.
- Rejecting malformed records and duplicate IDs.

These tests are fast and do not need a browser.

### Integration checks

Check the boundaries between modules:

- Valid records can be serialized and loaded again.
- Invalid saved data reports a warning and is not overwritten.
- A failed storage write returns a failure result to the interface.

Inject a storage object into the storage module so tests can simulate successful and failed browser storage without depending on a real browser profile.

### Manual browser review

Check behavior that unit tests do not cover well:

- Form labels and native validation.
- Keyboard order, focus after list updates, and visible focus styles.
- Screen reader status messages.
- Layout at narrow and wide viewports.
- Storage behavior after reload and when access is denied.

A test passing does not prove the whole application is usable. Combine automated checks with a short manual review.

## Make errors useful

Errors should help a person choose what to do next:

- Invalid form data should point to the field that needs attention.
- A missing saved value means a fresh empty library.
- Invalid saved JSON should say the saved list could not be read and must not be overwritten automatically.
- A storage write failure should explain that the current change is only in memory.
- An unexpected programming error should be available to developers without exposing sensitive data to visitors.

Avoid catching every error and replacing it with a generic success path. Handle expected failures where they occur, then let unexpected failures remain visible during development.

## Accessibility is part of completion

Review the interface with these questions:

- Does every input have a visible, associated label?
- Are actions native buttons with meaningful names?
- Can the user complete the main flow without a mouse?
- Does focus remain predictable when a list item is changed or removed?
- Are selected filters communicated with more than color?
- Are status and validation messages available to assistive technology?
- Does text remain readable at increased zoom and on a narrow viewport?

Do not wait until the end to add semantics. Native forms, buttons, labels, and lists make interaction more reliable from the start.

## Security and privacy review

Before release:

- Treat titles, authors, and stored values as untrusted text.
- Do not use an HTML parsing sink for book data.
- Do not store passwords, session secrets, or sensitive personal data in local storage.
- Do not claim local storage is private or encrypted.
- Validate saved data before using it.
- If a server is added, validate and authorize every server operation there.
- Avoid logging personal data unnecessarily.

A small personal tool can still expose data through a shared browser profile or device. Document that the list is stored locally and is not protected by an account.

## Write documentation for another person

A useful README should answer:

1. What problem does the application solve?
2. What features does it include?
3. What runtime or browser does it need?
4. How does someone start it locally?
5. How do they run the tests?
6. Where is data stored?
7. What are known limitations?
8. How can someone report or reproduce a problem?

Include commands that match the actual package scripts. Do not claim that tests pass unless they were run. Keep screenshots current and avoid placing secrets in the repository.

## Prepare a release checklist

Before calling the project complete:

- [ ] Every acceptance criterion has been reviewed.
- [ ] Core unit and integration tests have been run.
- [ ] Manual keyboard and responsive checks are complete.
- [ ] Errors and storage limitations are documented.
- [ ] No secrets or generated local data are committed.
- [ ] The README setup commands work from a fresh checkout.
- [ ] The working tree and commit history are intentional.
- [ ] The release notes describe user-visible changes.

A release checklist makes unfinished work visible. It is better to document a known limitation than to imply a capability the application does not provide.

## Common mistakes

- Adding features before deciding what the first version must do.
- Writing one large event handler for validation, storage, and rendering.
- Treating filtered data as the complete source of truth.
- Using array positions as record IDs.
- Trusting JSON because it parses successfully.
- Silently replacing invalid saved data with an empty collection.
- Claiming persistence after a storage write fails.
- Using browser storage for secrets or cross-device synchronization.
- Testing only a helper function and assuming the browser flow works.
- Writing setup instructions that do not match the project.
- Claiming tests pass without running them.
- Calling a project complete without reviewing accessibility and errors.

## Key points

- Keep the capstone small enough to finish and useful enough to review.
- Define user stories and acceptance criteria before coding.
- Separate domain logic, storage, UI, tests, and documentation.
- Build one working user flow at a time.
- Validate data at every boundary.
- Combine automated tests with manual browser checks.
- Treat accessibility, errors, privacy, and documentation as project requirements.
- State limitations clearly instead of implying unsupported features.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [143 - Node.js project: build a command-line utility](143-node-js-project-build-a-command-line-utility.md) | [Open Q&A](../qnas/144-capstone-project-plan-build-test-and-document-an-application.md) | [Open example](../examples/144-capstone-project-plan-build-test-and-document-an-application.md) | [145 - JavaScript quick reference and glossary](145-javascript-quick-reference-and-glossary.md) |
