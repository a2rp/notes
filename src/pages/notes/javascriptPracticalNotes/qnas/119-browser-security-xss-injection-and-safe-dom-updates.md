# 119 - Browser security: XSS, injection, and safe DOM updates: Q&A

Review how untrusted data can become executable, how to update the DOM safely, and where validation, encoding, sanitization, CSP, and Trusted Types fit. Every answer follows its question.

## Multiple-choice questions

### 1. What is cross-site scripting, or XSS?

- A. A browser cache problem
- B. A flaw that lets attacker-controlled content run as code in a page
- C. A JavaScript formatting style
- D. A method for loading CSS faster

**Answer: B.**

**Explanation:** XSS occurs when an application handles untrusted data in a way that lets the browser interpret it as executable content.

### 2. Which value should be treated as untrusted?

- A. A URL query parameter
- B. A value from local storage
- C. A response from an API
- D. All of the above

**Answer: D.**

**Explanation:** Values can originate from users even if they arrive through a URL, storage, server, or another service.

### 3. What is a safe default for displaying plain user text in an ordinary element?

- A. Assign it to textContent
- B. Concatenate it into innerHTML
- C. Pass it to eval
- D. Put it in an onclick string

**Answer: A.**

**Explanation:** textContent creates or replaces text rather than parsing the value as HTML markup.

### 4. Why can innerHTML be dangerous with user data?

- A. It always deletes the page.
- B. It parses the string as markup.
- C. It prevents CSS from loading.
- D. It automatically validates URLs.

**Answer: B.**

**Explanation:** The browser interprets HTML syntax in the string. Untrusted input can change page structure or introduce unsafe content.

### 5. Which API pair is a good fit for adding a label and button safely?

- A. createElement and textContent
- B. eval and Function
- C. document.write and setTimeout with a string
- D. innerHTML and an onclick attribute

**Answer: A.**

**Explanation:** Create the elements with trusted code and insert untrusted labels as text.

### 6. What does input validation do?

- A. It removes every possible XSS payload in every output context.
- B. It checks whether data follows application rules, but does not replace safe output handling.
- C. It prevents a server from receiving requests.
- D. It makes all HTML strings safe.

**Answer: B.**

**Explanation:** Validation is useful for rules such as allowed quantity ranges. The value still needs safe handling wherever it is rendered.

### 7. Why is removing the word "script" not a reliable XSS defense?

- A. The browser does not support scripts.
- B. Attackers can use other parsing forms and contexts.
- C. It makes the page too slow.
- D. It changes all data into CSS.

**Answer: B.**

**Explanation:** Blacklists cover only patterns anticipated by the filter. Safe APIs and context-appropriate handling are more reliable.

### 8. What is context-specific output encoding?

- A. Applying the same escaping function to every value
- B. Encoding data for the exact grammar where it will be interpreted
- C. Encrypting every string in JavaScript
- D. Removing all punctuation from input

**Answer: B.**

**Explanation:** HTML, JavaScript, CSS, and URLs are parsed differently. A transformation suitable for one context may be unsafe or incorrect in another.

### 9. What does assigning a value to link.href not do by itself?

- A. Create a link element
- B. Validate whether the destination is allowed
- C. Set the URL property
- D. Let the browser navigate if the link is followed

**Answer: B.**

**Explanation:** URL assignment is not a security policy. Parse and allow only the protocols and destinations that the feature needs.

### 10. Which URL protocol is commonly rejected when the feature only needs web pages?

- A. https
- B. A same-origin relative URL
- C. javascript
- D. A path beginning with a slash

**Answer: C.**

**Explanation:** A javascript URL can execute code when followed. Decide allowed schemes explicitly instead of accepting any parseable URL.

### 11. When is HTML sanitization appropriate?

- A. For every user string
- B. When a feature intentionally allows users to author a limited form of HTML
- C. To validate an email address
- D. To replace server authorization

**Answer: B.**

**Explanation:** For plain text, textContent is simpler. If rich user-authored markup is a real product requirement, use a maintained sanitizer.

### 12. Why should a developer avoid writing a sanitizer with regular expressions?

- A. Regular expressions cannot match letters.
- B. HTML parsing is complex and a simple pattern filter can miss unsafe forms.
- C. Regular expressions only run on servers.
- D. Browsers do not parse HTML.

**Answer: B.**

**Explanation:** Use a maintained sanitizer configured for the allowed markup rather than trying to remove suspicious substrings.

### 13. What can happen if sanitized markup is modified with untrusted data afterward?

- A. The sanitizer's protection can be undone.
- B. The markup becomes encrypted.
- C. The browser removes all scripts automatically.
- D. It can only change text color.

**Answer: A.**

**Explanation:** New unsafe content added after sanitization was not covered by the sanitizer.

### 14. What is a Content Security Policy useful for?

- A. A defense-in-depth restriction on resource loading and script execution
- B. Making user input trustworthy
- C. Replacing safe DOM APIs
- D. Validating database permissions

**Answer: A.**

**Explanation:** CSP can limit some consequences of injection, but it does not make unsafe DOM updates safe or replace proper data handling.

### 15. What does a restrictive script-src policy do?

- A. Controls which sources may provide scripts
- B. Escapes all HTML text
- C. Validates every URL in a form
- D. Prevents all browser bugs

**Answer: A.**

**Explanation:** CSP can constrain scripts the page loads or runs. The exact policy must be designed and tested for the application.

### 16. Why should a page avoid broad unsafe-inline permission in CSP?

- A. It allows inline script patterns that a restrictive script policy is intended to control.
- B. It blocks native buttons.
- C. It removes the page title.
- D. It prevents textContent from working.

**Answer: A.**

**Explanation:** Broad exceptions weaken the policy. Do not relax CSP just to preserve an unsafe implementation.

### 17. What do Trusted Types provide?

- A. A mechanism to restrict strings passed to certain injection sinks when enforced
- B. Automatic sanitization of every user value
- C. A replacement for TLS
- D. A way to authorize server actions

**Answer: A.**

**Explanation:** A Trusted Types policy must still apply appropriate validation or sanitization. A permissive policy can undermine the protection.

### 18. What is an unsafe way to register a click handler?

- A. Use addEventListener with a trusted function
- B. Build a string and place it in an onclick attribute
- C. Add a button with a fixed event listener
- D. Keep the handler code separate from user text

**Answer: B.**

**Explanation:** Event-handler attributes interpret their value as code. Keep the code trusted and pass user data as an ordinary value.

### 19. Which statement about local storage is correct?

- A. Values in local storage are always trusted.
- B. A stored value can still be attacker-controlled and must be handled safely.
- C. Local storage encrypts values automatically.
- D. Local storage cannot contain HTML-like text.

**Answer: B.**

**Explanation:** Storage preserves data, not trust. A value may have originated from a user or a prior unsafe version of the application.

### 20. Which statement about HttpOnly cookies is correct?

- A. They make an XSS flaw harmless.
- B. They prevent page scripts from reading the cookie value, but XSS can still perform harmful actions in the page.
- C. They sanitize all DOM updates.
- D. They prevent all scripts from running.

**Answer: B.**

**Explanation:** HttpOnly limits direct cookie access. It does not prevent injected code from using the current page or changing what the user sees.

## Short-answer questions

### 21. What kinds of values can be untrusted?

**Answer:** Form values, URL parameters and fragments, saved data, API responses, uploaded content, and messages from other windows can all be untrusted.

**Explanation:** Trust depends on who controls the data, not which API delivered it.

### 22. What is a DOM injection sink?

**Answer:** It is an API or property that interprets a string as HTML, script, CSS, or another active syntax.

**Explanation:** Examples include innerHTML for markup and eval for executable JavaScript.

### 23. Why should code and user data stay separate?

**Answer:** The browser should execute only code that the application intentionally supplies, while user values remain data.

**Explanation:** Combining them into a syntax-interpreting string can turn data into markup or code.

### 24. How can plain text be inserted safely into a paragraph?

**Answer:** Select the paragraph and set its textContent to the value.

**Explanation:** This displays characters as text instead of parsing them as HTML.

### 25. Is textContent a sanitizer for arbitrary HTML?

**Answer:** No. It is a text API. It does not create sanitized rich HTML, and special elements such as script or style have their own meaning.

**Explanation:** Use it to display plain text. For user-authored HTML, use a maintained sanitizer only when the feature requires markup.

### 26. What is the difference between URL encoding and URL validation?

**Answer:** Encoding protects a value placed into a URL component. Validation decides whether the parsed destination is permitted.

**Explanation:** A well-encoded URL can still point to a destination or protocol the application should reject.

### 27. Why should attribute names be fixed in code?

**Answer:** Some attributes have special behavior, such as event-handler attributes that execute code or URL attributes that navigate or load resources.

**Explanation:** Untrusted values should not choose the attribute name or its interpretation.

### 28. What should an application do if it only needs to show user-authored text?

**Answer:** Render it as text with textContent instead of invoking an HTML sanitizer and parsing markup.

**Explanation:** This is simpler and avoids creating an unnecessary markup interpretation path.

### 29. What does CSP not replace?

**Answer:** Safe DOM APIs, context-appropriate output encoding, URL validation, sanitization where needed, and server-side authorization.

**Explanation:** CSP is another layer of defense. It cannot repair every unsafe code path.

### 30. Why must a sanitizer be maintained and kept up to date?

**Answer:** Browser parsing behavior and sanitizer bypasses can change over time.

**Explanation:** An old or incorrectly configured sanitizer may fail to remove dangerous markup.

## Scenarios

### 31. A comment containing markup appears as actual elements on a page. What should be changed?

**Answer:** If the comment is meant to be plain text, insert it with textContent or the framework's normal escaped text rendering.

**Explanation:** Do not parse user text as HTML when the feature only needs to display text.

### 32. A page reads location.hash and places it in innerHTML. What is the issue?

**Answer:** The URL fragment is user-controlled data and innerHTML parses it as markup.

**Explanation:** This can become DOM-based XSS. Render the fragment as text or validate and construct the specific intended DOM elements.

### 33. A user enters a javascript URL into a link form. What should the application do?

**Answer:** Reject it if the feature only allows web navigation. Parse the URL and allow only approved protocols and destinations.

**Explanation:** Assigning the value to href does not itself enforce the application's destination policy.

### 34. A product lets users write formatted comments. Should the application display the input using textContent?

**Answer:** textContent is safe but displays the markup characters literally. If formatted HTML is truly required, sanitize it with a maintained library configured for the allowed subset before rendering.

**Explanation:** Choose between plain text and rich markup based on the actual feature, not convenience.

### 35. A team enables a broad CSP exception because inline event handlers stopped working. Is that the right repair?

**Answer:** No. Move event logic into trusted JavaScript with addEventListener and keep the policy restrictive.

**Explanation:** Relaxing the policy may re-enable patterns that CSP was meant to constrain.

### 36. An app sanitizes a comment, then appends an untrusted image tag to the sanitized result. Is the final result still covered?

**Answer:** No. The appended content was added after sanitization and may reintroduce unsafe markup.

**Explanation:** Sanitize the final rich content at the correct boundary, or better, build permitted elements with safe DOM APIs.

## Coding questions

### 37. Render an untrusted message as plain text.

**Answer:**

~~~js
function showMessage(value) {
  const message = document.querySelector("#message");
  message.textContent = value;
}
~~~

**Explanation:** The value remains text and is not parsed as HTML. Do not pre-encode it before assigning it to textContent.

### 38. Create a link only for same-origin paths or HTTPS URLs.

**Answer:**

~~~js
function createSafeLink(value, label) {
  let url;

  try {
    url = new URL(value, document.baseURI);
  } catch {
    return null;
  }

  const sameOrigin = url.origin === window.location.origin;
  const secureWebUrl = url.protocol === "https:";

  if ((!sameOrigin && !secureWebUrl) || url.username || url.password) {
    return null;
  }

  const link = document.createElement("a");
  link.href = url.href;
  link.textContent = label;
  return link;
}
~~~

**Explanation:** Parse the destination first, then enforce an explicit scheme and origin policy. The label is inserted as text, not markup.

### 39. Replace this unsafe update with a safe one.

~~~js
preview.innerHTML = "<p>" + userComment + "</p>";
~~~

**Answer:**

~~~js
const paragraph = document.createElement("p");
paragraph.textContent = userComment;
preview.replaceChildren(paragraph);
~~~

**Explanation:** The replacement constructs a trusted paragraph element and adds the comment as text. The browser never parses the comment as HTML.

### 40. A feature accepts rich user-authored HTML. What should the rendering boundary look like?

**Answer:**

~~~js
function renderUserMarkup(dirtyMarkup, sanitizer) {
  const cleanMarkup = sanitizer.sanitize(dirtyMarkup);
  const container = document.querySelector("#formatted-content");
  container.innerHTML = cleanMarkup;
}
~~~

**Explanation:** This is appropriate only when a maintained sanitizer is configured for the allowed markup. Do not substitute an identity function or regex filter, and do not append untrusted markup after sanitizing.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [118 - Accessibility, keyboard interaction, and dynamic content](../lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md) | [Open lesson](../lessons/119-browser-security-xss-injection-and-safe-dom-updates.md) | [Open example](../examples/119-browser-security-xss-injection-and-safe-dom-updates.md) | [120 - Web Crypto and secure random values](../lessons/120-web-crypto-and-secure-random-values.md) |
