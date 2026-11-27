# Error handling, reliability, and application security - Q&A

These questions review the ideas in [Chapter 137](../lessons/137-error-handling-reliability-and-application-security.md). Each answer follows its question and includes a short explanation.

## Multiple-choice questions

### 1. What is the main purpose of a try/catch block?

A. To make every operation succeed  
B. To handle an exception at a boundary where the program can respond usefully  
C. To hide all errors from developers  
D. To retry every failed operation

**Answer:** B. To handle an exception at a boundary where the program can respond usefully.

**Explanation:** Catching an error is useful when the code can recover, provide a safe fallback, add context, or report the failure. Catching and ignoring an error hides defects.

### 2. Which value should usually be thrown to represent an application failure?

A. A string  
B. A number  
C. An Error object or a meaningful subclass  
D. An arbitrary DOM node

**Answer:** C. An Error object or a meaningful subclass.

**Explanation:** Error objects carry a message and stack information and can preserve a cause. Throwing ordinary values makes consistent handling harder.

### 3. What does an error's cause help preserve?

A. The original underlying error when a higher layer adds context  
B. A copy of the current user's password  
C. The complete browser history  
D. An automatic retry count

**Answer:** A. The original underlying error when a higher layer adds context.

**Explanation:** A new error can describe what the application was doing while its cause points to the lower-level failure. This keeps useful diagnostic context.

### 4. Where should an error normally be caught?

A. In every function, whether or not it can recover  
B. At a boundary that can make a meaningful decision  
C. Nowhere, because errors should crash every application  
D. Only inside constructors

**Answer:** B. At a boundary that can make a meaningful decision.

**Explanation:** Low-level code can often let an error propagate. A UI, request handler, or job boundary can then choose a fallback or report the failure.

### 5. Which operation is generally appropriate for a bounded retry?

A. A non-idempotent payment submission with unknown outcome  
B. A read-only request that failed due to a temporary network issue  
C. Any operation after it returns invalid data  
D. A user input validation error

**Answer:** B. A read-only request that failed due to a temporary network issue.

**Explanation:** A repeatable read is usually safe to retry when the failure is transient. Retrying a write with an unknown outcome can duplicate side effects unless the operation is designed for idempotency.

### 6. What should a finally block be used for?

A. Cleanup that should happen whether the operation succeeds or fails  
B. Replacing every catch block  
C. Returning success after a rejected promise  
D. Printing secret values for debugging

**Answer:** A. Cleanup that should happen whether the operation succeeds or fails.

**Explanation:** finally is suitable for releasing a lock or restoring a state flag. A return or throw from finally can override an earlier result, so avoid that pattern.

### 7. What does client-side validation guarantee?

A. That submitted data is trustworthy  
B. That the server does not need to validate  
C. A better early user experience, while the server still validates independently  
D. That a malicious user cannot change the request

**Answer:** C. A better early user experience, while the server still validates independently.

**Explanation:** A client can be modified or bypassed. Validate again at the trusted server boundary before accepting data or performing an action.

### 8. Which method safely inserts untrusted text into a plain text element?

A. Assign it to innerHTML  
B. Assign it to textContent  
C. Concatenate it into a script element  
D. Put it in an event-handler attribute

**Answer:** B. Assign it to textContent.

**Explanation:** textContent treats the value as text. innerHTML parses a string as markup and can create an injection risk when the string is untrusted.

### 9. What is the safest default response when a request fails for the user interface?

A. Show a raw stack trace to every user  
B. Show a short actionable message and keep diagnostic details in an appropriately protected log  
C. Show environment variables  
D. Silently pretend that the request succeeded

**Answer:** B. Show a short actionable message and keep diagnostic details in an appropriately protected log.

**Explanation:** User messages should be useful without disclosing internals. Logs need access controls and should avoid secrets and unnecessary personal data.

### 10. When is cancellation especially useful?

A. When an operation is no longer needed, such as after navigation or a newer search  
B. Only after every operation has succeeded  
C. To turn invalid data into valid data  
D. To authenticate a user

**Answer:** A. When an operation is no longer needed, such as after navigation or a newer search.

**Explanation:** Cancellation can reduce wasted work and prevent stale results from updating the interface. The operation should still handle cancellation in a deliberate way.

## Short-answer questions

### 11. Explain the difference between an operational failure and a programming defect.

**Answer:** An operational failure is an expected problem during an otherwise valid operation, such as a timeout or unavailable service. A programming defect is a bug in the code, such as using an undefined value where an object was expected.

**Explanation:** Operational failures may support a fallback or retry. Defects need diagnosis and correction; hiding them as ordinary success is dangerous.

### 12. Why should a catch block avoid swallowing errors?

**Answer:** If it catches an error and neither recovers nor reports it, callers may continue with missing or incorrect state and developers lose the failure signal.

**Explanation:** A catch block should recover, translate and rethrow with context, or report the failure at a suitable boundary.

### 13. What is a useful custom error class?

**Answer:** A class extending Error that adds a stable name or code for a domain-specific failure, such as ProfileUnavailableError.

**Explanation:** A stable type or code allows callers to make intentional decisions without relying on fragile message text.

### 14. Why is testing error.message text for program logic fragile?

**Answer:** Message text is intended for people and can change with wording, localization, or implementation details.

**Explanation:** Prefer a custom error class, a stable error code, or a structured result field for control flow.

### 15. What does idempotent mean in the context of retries?

**Answer:** Repeating an operation produces the same intended effect as performing it once.

**Explanation:** Idempotency makes a retry safer when a client cannot tell whether the first request reached or changed the server. It does not mean all requests are automatically safe to repeat.

### 16. What is exponential backoff?

**Answer:** A retry schedule where the delay grows after each failed attempt, often with a maximum delay and random jitter.

**Explanation:** It reduces synchronized repeated requests during an outage. A retry policy should also cap the total attempts or elapsed time.

### 17. How are authentication and authorization different?

**Answer:** Authentication establishes who a user or service is. Authorization decides whether that identity is allowed to perform a particular action.

**Explanation:** A verified identity does not automatically have permission for every resource.

### 18. What is output encoding, and why does context matter?

**Answer:** Output encoding represents data so it is interpreted as data rather than executable syntax in its destination context.

**Explanation:** HTML text, an attribute, a URL, and JavaScript have different parsing rules. Use context-appropriate safe APIs and avoid building executable markup from untrusted strings.

### 19. Why should secrets not be placed in frontend source code?

**Answer:** Browser-delivered code and its configuration can be inspected by visitors.

**Explanation:** Private credentials belong in a trusted server or secret-management boundary. A public client identifier is not a secret simply because it is called a key.

### 20. What information should a useful error log include?

**Answer:** Enough structured context to identify the operation, time, safe correlation identifier, and failure category, while excluding credentials and unnecessary sensitive data.

**Explanation:** Logs should help diagnosis and be protected. Logging every input or complete request can expose private information.

## Code-reading questions

### 21. What happens here if parseUser throws an Error?

~~~js
try {
  return parseUser(value);
} catch (error) {
  return { ok: false, error };
}
~~~

**Answer:** The function returns an object with ok set to false and the caught error stored in error.

**Explanation:** The catch converts a thrown failure into a result value. This is useful if callers consistently inspect the result and do not accidentally treat it as success.

### 22. What is wrong with this handler?

~~~js
try {
  await saveProfile(profile);
} catch (error) {
  console.log("Saved");
}
~~~

**Answer:** It reports success after a failed save.

**Explanation:** The failure is swallowed and the message misleads the user. Return a failure result, show an error state, or rethrow so an appropriate boundary can handle it.

### 23. Does this code catch a rejected promise?

~~~js
try {
  loadProfile();
} catch (error) {
  showError(error);
}
~~~

**Answer:** Not necessarily. If loadProfile returns a promise that rejects later, this synchronous catch does not handle that rejection.

**Explanation:** Use await inside the try block in an async function, or attach a rejection handler with then/catch.

### 24. What does this finally block guarantee?

~~~js
setBusy(true);
try {
  await loadData();
} finally {
  setBusy(false);
}
~~~

**Answer:** setBusy(false) runs whether loadData fulfills or throws, assuming the process reaches the finally block.

**Explanation:** This prevents a busy indicator from remaining active after failure. The error still propagates because finally does not catch it.

### 25. What is risky about this code?

~~~js
message.innerHTML = userComment;
~~~

**Answer:** The browser parses userComment as HTML, which can allow untrusted markup or scriptable content to affect the page.

**Explanation:** Use textContent for plain text. If rich HTML is genuinely required, use a well-reviewed sanitization strategy for that exact context.

### 26. What happens to the original failure here?

~~~js
try {
  await readConfig();
} catch (cause) {
  throw new Error("Could not start the app", { cause });
}
~~~

**Answer:** The new error adds startup context and retains the caught failure in its cause property.

**Explanation:** A higher layer can present the broader context while diagnostics can inspect the causal chain. Avoid exposing this chain directly to users.

### 27. Why can this retry create duplicate effects?

~~~js
for (let attempt = 0; attempt < 3; attempt += 1) {
  try {
    await createOrder(order);
    break;
  } catch (error) {
    if (attempt === 2) throw error;
  }
}
~~~

**Answer:** If the server created the order but the response was lost, a retry may create another order.

**Explanation:** The client cannot infer that a failed response means the operation had no effect. Use an idempotency design and retry only failures covered by a deliberate policy.

### 28. What issue does the check below prevent?

~~~js
if (typeof payload.name !== "string") {
  throw new TypeError("name must be text");
}
~~~

**Answer:** It rejects a payload whose name field is not a string before later code treats it as one.

**Explanation:** This is a runtime shape check. A complete boundary may also need length limits, allowed values, and server-side validation.

### 29. What is missing from this timeout strategy?

~~~js
await Promise.race([request, timeoutPromise]);
~~~

**Answer:** Promise.race settles the wrapper when one promise settles, but does not by itself stop the underlying request.

**Explanation:** Use an API-supported cancellation signal when possible, and clear any timer during cleanup to avoid unnecessary work.

### 30. How should the caller interpret this result?

~~~js
{ ok: false, code: "PROFILE_UNAVAILABLE" }
~~~

**Answer:** It should branch on ok and use the stable code to select an appropriate fallback or user message.

**Explanation:** A result object makes expected failure explicit. Callers still need to avoid assuming a failed result contains success data.

## Practical and applied questions

### 31. A search request fails because the user navigated to another page. What should the application do?

**Answer:** Abort the request if supported, ignore any stale result, and avoid showing an error for work the user no longer needs.

**Explanation:** Cancellation is part of normal control flow. It should not be presented as a server outage when the user intentionally left.

### 32. A read request receives a temporary network failure. Propose a safe retry policy.

**Answer:** Retry only a small bounded number of times, use increasing delays with jitter, honor cancellation, and then show a clear fallback.

**Explanation:** A finite budget prevents infinite loops and reduces load. The policy should distinguish transient failures from invalid requests or access denial.

### 33. A form has a required email field. Where should validation occur?

**Answer:** Validate in the browser for prompt feedback and independently validate on the server before accepting or acting on the value.

**Explanation:** Client-side checks can be bypassed. The server is the enforcement boundary for data integrity and business rules.

### 34. A profile API returns an unexpected object shape. What should the UI do?

**Answer:** Reject or safely handle the malformed response, avoid rendering uncertain fields, record a bounded diagnostic, and show a recoverable error state.

**Explanation:** Data from an API is still input. A successful HTTP response does not guarantee the body matches the application's assumptions.

### 35. A payment request times out, and the UI does not know whether the payment was processed. Should it retry automatically?

**Answer:** Not as a new independent payment. First use the service's idempotency or status-check mechanism to determine the outcome.

**Explanation:** A timeout does not prove the server performed no action. Blind retries can charge twice.

### 36. A caught error contains a database hostname and internal stack. Should it be shown to the visitor?

**Answer:** No. Show a concise message and keep detailed diagnostics in protected logs.

**Explanation:** Internal details can reveal infrastructure or implementation information. Logging should also avoid credentials and sensitive user data.

### 37. A feature flag value is read from a public browser configuration. Can it authorize access to a restricted feature?

**Answer:** No. A user can inspect or modify client-side configuration, so authorization must be enforced by a trusted server boundary.

**Explanation:** A UI flag may control presentation, but it cannot serve as permission enforcement.

### 38. A dependency update changes the lockfile. What reliability checks are useful before release?

**Answer:** Review the dependency change and source, install from the committed lockfile in a clean environment, run the project's existing automated checks, and monitor the release.

**Explanation:** A lockfile makes dependency resolution repeatable, but does not prove a dependency is safe or correct. Review and controlled rollout remain useful.

### 39. How should expected validation failure differ from an unexpected programming error?

**Answer:** Validation failure should produce a clear field-level or domain-level response. Unexpected defects should be reported to diagnostics and handled by a safe general fallback.

**Explanation:** Distinguishing categories lets the application respond helpfully without disguising bugs as ordinary user mistakes.

### 40. What should you check before merging a change that adds a catch block?

**Answer:** Confirm that it handles an error the code can recover from, preserves or reports useful context, cannot falsely signal success, and does not expose sensitive details.

**Explanation:** A catch block changes the program's failure path. Review both what users see and what maintainers can safely diagnose.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [136 - Modular architecture and dependency boundaries](136-modular-architecture-and-dependency-boundaries.md) | [Lesson](../lessons/137-error-handling-reliability-and-application-security.md) · [Q&A](137-error-handling-reliability-and-application-security.md) · [Example](../examples/137-error-handling-reliability-and-application-security.md) | [138 - Dependency hygiene, lockfiles, and software supply chain](138-dependency-hygiene-lockfiles-and-software-supply-chain.md) |

