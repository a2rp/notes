# Capstone project: plan, build, test, and document an application - Q&A

These questions review [Chapter 144](../lessons/144-capstone-project-plan-build-test-and-document-an-application.md). Each answer follows its question and includes an explanation.

## Multiple-choice questions

### 1. What should a project plan define before implementation?

A. Every possible future feature  
B. The problem, audience, scope, and observable requirements  
C. The final color palette only  
D. The deployment provider only  

**Answer:** B. The problem, audience, scope, and observable requirements.

**Explanation:** A clear scope helps the project deliver a useful first version without growing into unrelated work.

### 2. What makes an acceptance criterion useful?

A. It describes behavior that can be observed or reviewed  
B. It lists vague aspirations  
C. It names a programming language  
D. It guarantees zero future bugs  

**Answer:** A. It describes behavior that can be observed or reviewed.

**Explanation:** A criterion such as "a saved book reappears after reload when storage is available" can guide implementation and review.

### 3. Why should a capstone keep its first version small?

A. Small projects never need tests  
B. A focused scope can be completed and reviewed end to end  
C. Small projects cannot have errors  
D. It avoids writing documentation  

**Answer:** B. A focused scope can be completed and reviewed end to end.

**Explanation:** A complete core flow is more useful than many unfinished features.

### 4. What should the UI do with a filtered list?

A. Delete the hidden records from application state  
B. Derive a visible list while retaining the full collection  
C. Use visible row indexes as permanent IDs  
D. Store the filter as a book record  

**Answer:** B. Derive a visible list while retaining the full collection.

**Explanation:** Filtering changes the view, not the underlying data. Keeping the collection intact allows other filters to show all records.

### 5. Why use stable record IDs?

A. They let actions target the same record after filtering or reordering  
B. They determine the browser's screen size  
C. They replace data validation  
D. They make local storage encrypted  

**Answer:** A. They let actions target the same record after filtering or reordering.

**Explanation:** Array positions can change. An ID remains associated with the same record.

### 6. What should happen when browser storage contains invalid data?

A. Silently replace it with an empty list  
B. Report the problem and avoid overwriting it automatically  
C. Treat it as a valid empty list  
D. Print the data on the page as HTML  

**Answer:** B. Report the problem and avoid overwriting it automatically.

**Explanation:** Silent replacement can destroy user data. Preserve it until a deliberate recovery action is chosen.

### 7. What is a useful responsibility for a domain module?

A. Create and filter book records using predictable functions  
B. Write all terminal output  
C. Own every DOM event  
D. Choose the README title  

**Answer:** A. Create and filter book records using predictable functions.

**Explanation:** Pure domain logic can be reused and tested without a browser or storage device.

### 8. Which test level is appropriate for checking that filtering returns read books only?

A. A unit test for the filter function  
B. A deployment test only  
C. A screenshot comparison only  
D. A browser compatibility report only  

**Answer:** A. A unit test for the filter function.

**Explanation:** Filtering is deterministic domain logic and does not need a browser to test.

### 9. What do manual browser checks add beyond unit tests?

A. Keyboard behavior, focus, layout, and assistive technology review  
B. Automatic database migration  
C. Proof that every runtime is correct  
D. A guarantee that no API can fail  

**Answer:** A. Keyboard behavior, focus, layout, and assistive technology review.

**Explanation:** Unit tests do not fully exercise browser rendering and real user interaction.

### 10. What should documentation say about a local storage application?

A. That it synchronizes across devices automatically  
B. Where data is stored and what happens if storage is unavailable  
C. That browser storage is encrypted by default  
D. Nothing about data  

**Answer:** B. Where data is stored and what happens if storage is unavailable.

**Explanation:** Users need to understand the storage scope, privacy limitations, and recovery behavior.

## Short-answer questions

### 11. What is a user story?

**Answer:** A concise description of a user's goal and why they need it.

**Explanation:** It keeps project decisions tied to the intended person and outcome instead of starting with implementation details.

### 12. How do acceptance criteria differ from a broad feature idea?

**Answer:** Acceptance criteria state specific behavior that can be checked.

**Explanation:** "Support reading" is broad. "A visitor can mark one saved book read and see its state persist after reload" is observable.

### 13. Why list features that are out of scope?

**Answer:** It prevents optional ideas from silently expanding the first version.

**Explanation:** Naming exclusions such as accounts and cloud sync helps protect the schedule and makes future work easier to plan.

### 14. What is a vertical slice?

**Answer:** A small path through input, application logic, and visible result that works end to end.

**Explanation:** It creates a usable checkpoint early and reveals integration issues before many layers are built.

### 15. Why separate domain logic from DOM code?

**Answer:** Domain functions can be understood and tested without browser elements.

**Explanation:** This reduces dependencies and makes core behavior easier to review and reuse.

### 16. What does it mean for a rendering function to be derived from state?

**Answer:** It displays the current application state without secretly changing the underlying data.

**Explanation:** Clear boundaries make it easier to tell why the interface changed and to reproduce a view.

### 17. What should happen if saving a book to browser storage fails?

**Answer:** The application should not claim it was saved and should tell the visitor if the change exists only in memory.

**Explanation:** A visible session change is not the same as durable persistence across reloads.

### 18. Why inject a storage object into a storage module?

**Answer:** It allows tests to provide a controlled fake or failing storage implementation.

**Explanation:** Tests can verify success and error paths without depending on a real browser profile.

### 19. What does a project README need to help a new contributor do?

**Answer:** Understand the application, prerequisites, setup, tests, data location, and known limitations.

**Explanation:** Clear instructions reduce assumptions and make the project reproducible from a fresh checkout.

### 20. Why should a release checklist include accessibility?

**Answer:** Accessibility affects whether people can use the core application, not just its appearance.

**Explanation:** Keyboard access, focus, labels, and announcements are requirements for complete interactions.

## Read the code

### 21. What is preserved by this operation?

~~~js
const visible = books.filter((book) => !book.read);
~~~

**Answer:** The original books array remains intact; visible is a separate array of unread books.

**Explanation:** Filtering derives a view and does not remove the hidden read records from the source collection.

### 22. Why is a new array returned here?

~~~js
return books.map((book) =>
  book.id === id ? { ...book, read: true } : book
);
~~~

**Answer:** It creates an updated collection with a changed copy of the matching book.

**Explanation:** Immutable updates make state transitions easier to reason about and keep the original collection available.

### 23. What does this check help prevent?

~~~js
if (!title.trim()) {
  throw new Error("A title is required.");
}
~~~

**Answer:** It prevents an empty or whitespace-only title from being accepted.

**Explanation:** Trimming removes leading and trailing whitespace before checking for meaningful input.

### 24. What should a parser validate after JSON.parse succeeds?

**Answer:** The parsed value's expected structure, field types, and invariants.

**Explanation:** Valid JSON syntax does not guarantee valid application data.

### 25. What is the problem if the UI says "Saved" after a storage write error?

**Answer:** It tells the visitor persistence succeeded when it did not.

**Explanation:** The application should report the true outcome and distinguish current in-memory state from stored data.

### 26. Why is local storage not suitable for secret credentials?

**Answer:** It is accessible to scripts running in the page and is not an encrypted secret vault.

**Explanation:** Sensitive secrets should not be stored in browser-accessible storage.

### 27. What does a unit test for a pure filter function avoid needing?

**Answer:** A real browser DOM, user profile, and storage backend.

**Explanation:** Pure functions accept data and return data, so tests can focus on expected inputs and outputs.

### 28. Why are these tests distinct?

~~~text
unit test
integration test
manual browser review
~~~

**Answer:** They check different boundaries and behaviors.

**Explanation:** Unit tests cover isolated logic, integration checks cover module interactions, and manual review covers real browser experience.

### 29. What should a test do when a function is expected to reject invalid input?

**Answer:** Assert that the function throws or returns the documented validation failure.

**Explanation:** A negative case verifies the boundary behavior, not only the successful path.

### 30. What does a release checklist help expose?

**Answer:** Required completion steps that might otherwise be forgotten or assumed.

**Explanation:** A checklist makes testing, documentation, privacy, and repository state visible before release.

## Applied questions

### 31. A stakeholder asks for cloud synchronization before the first version works. What should the project owner do?

**Answer:** Compare the request with the user story and scope, then record it as future work unless it is essential.

**Explanation:** Synchronization adds accounts, server storage, conflict handling, and security work. It should be an explicit scope decision.

### 32. A book disappears from the list when the filter changes. What is a likely implementation mistake?

**Answer:** The app may have replaced its source collection with the filtered results.

**Explanation:** Keep the full list in state and derive a separate visible collection for each view.

### 33. A record's button updates the wrong book after filtering. What should you inspect?

**Answer:** Check whether the handler uses a row index instead of a stable book ID.

**Explanation:** Visible positions change when filters or removals change the list. A stable identifier targets the correct record.

### 34. Browser storage contains malformed JSON. What should the app do?

**Answer:** Show a clear warning, avoid overwriting the value automatically, and offer a deliberate recovery path if the product supports one.

**Explanation:** Treat stored data as an input boundary. Replacing it silently can destroy the user's saved list.

### 35. A developer's unit tests pass, but keyboard users cannot reach the remove action. Is the capstone complete?

**Answer:** No. The manual interaction and accessibility criteria are still failing.

**Explanation:** Unit tests cannot prove every browser interaction. The release review must include keyboard behavior and focus.

### 36. A browser storage write fails after the user adds a book. What should the page communicate?

**Answer:** The book is available for the current session but was not saved for a later reload.

**Explanation:** The interface should be accurate about persistence and not discard the current in-memory work unnecessarily.

### 37. A project README says npm test passes, but nobody ran the tests. What should be changed?

**Answer:** Run the command before making the claim, or describe the command without claiming its result.

**Explanation:** Documentation should report observed outcomes, not assumed outcomes.

### 38. A form uses required and maxlength, but the app also validates values in JavaScript. Why is that reasonable?

**Answer:** Native constraints provide immediate browser guidance, while application logic enforces the domain rules.

**Explanation:** Client validation improves usability, but any server introduced later must validate independently.

### 39. A project works on the author's machine but setup fails from a fresh checkout. Which project area needs attention?

**Answer:** The setup documentation, dependency declaration, or reproducible configuration.

**Explanation:** A capstone is not complete if another person cannot follow its documented setup.

### 40. What is a sensible definition of done for this capstone?

**Answer:** Acceptance criteria are met, tests and manual checks are reviewed, limitations are documented, setup is reproducible, and the release state is intentional.

**Explanation:** Completion includes code, user experience, reliability, documentation, and delivery readiness.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [143 - Node.js project: build a command-line utility](../lessons/143-node-js-project-build-a-command-line-utility.md) | [Lesson](../lessons/144-capstone-project-plan-build-test-and-document-an-application.md) · [Example](../examples/144-capstone-project-plan-build-test-and-document-an-application.md) | [145 - JavaScript quick reference and glossary](145-javascript-quick-reference-and-glossary.md) |
