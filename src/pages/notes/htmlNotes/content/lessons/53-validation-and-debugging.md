# 53 - Validate and debug HTML

A page can appear in a browser even when its HTML has errors. Browsers try to recover from many mistakes, so the page you see may not match the structure you intended. Validation helps find markup problems, and browser developer tools help you inspect the document the browser built.

Use both. A validator checks conformance to HTML rules, while a person still needs to check whether the page's content, meaning, and behavior make sense.

## What an HTML validator checks

An HTML validator, also called a conformance checker, analyzes a document against the HTML standard. It can report issues such as:

- Misnested or unexpected elements.
- Invalid attributes or attribute values.
- Duplicate IDs.
- Missing required information.
- Elements used in places where they are not allowed.
- Obsolete markup and other conformance problems.

The report usually includes a message and a line or column location. Read the whole message before changing the source. A validator cannot infer every author's intention, so it will not catch every content, design, or accessibility problem.

## Use the Nu Html Checker

The Nu Html Checker can check HTML supplied in several ways:

1. Enter the address of a publicly available page.
2. Upload an HTML file.
3. Paste markup directly into the checker.

Use the method that matches what you want to check. A public URL checks the document served at that address. Uploading or pasting checks the specific source you provide.

Do not submit private or sensitive page content to a public online checker. For private work, use an approved local tool or remove sensitive data first.

## Read the report and fix errors carefully

Start with the first relevant error, because one structural mistake can lead to several follow-up messages. Make one small fix, then run the checker again. Rechecking helps confirm whether later messages were consequences of the earlier problem.

For example, this markup closes the elements in the wrong order:

~~~html
<p><strong>Important text</p></strong>
~~~

The paragraph ends while the strong element is still open. Close nested elements in reverse order:

~~~html
<p><strong>Important text</strong></p>
~~~

A message's line number points to where the checker noticed a problem. The cause may be on that line or earlier. If you see many errors after one malformed opening tag, inspect the surrounding structure before making many separate edits.

## Errors, warnings, and suggestions

A checker can label findings as errors, warnings, or informational messages.

- An error means the markup does not conform to a requirement.
- A warning or suggestion asks you to review a choice, such as obsolete markup or a pattern that may cause problems.
- An informational message may describe the document or an optional improvement.

The exact labels depend on the checker. Do not ignore warnings automatically, but do not change code blindly either. Read the explanation, check the standard, and decide whether the advice applies to the page.

A page with no reported errors is not automatically accessible, secure, attractive, or useful. Validation checks markup rules. It cannot decide whether the link text is clear, the heading describes its section, or an image has the right alternative text.

## Inspect what the browser built

Browser developer tools show the live document tree, often called the DOM. Open the Elements or Inspector panel and examine the elements around the part of the page that looks wrong.

The DOM can differ from the source file because:

- The browser repairs some malformed markup while parsing it.
- Scripts can add, remove, or change elements after the document loads.
- Developer tools may let you edit the live page temporarily.

Use View Source or your editor to examine the original markup. Use the DOM inspector to examine the browser's current structure. If they differ, work out whether the difference comes from parser recovery, a script, or a temporary edit.

Edits made directly in developer tools are temporary. They are useful for exploring a possible fix, but update the actual source file and reload the page to keep the change.

## A simple debugging workflow

1. Reproduce the problem and note what you expected to happen.
2. Check the saved source file and confirm you are editing the document that the browser loads.
3. Run the HTML validator on that source or the served page.
4. Fix the first relevant structural error and run the validator again.
5. Inspect the affected elements in the browser's DOM panel.
6. Check the page visually and use the relevant interaction, such as following a link or submitting a form.
7. Check whether the content still has clear headings, labels, link text, and text alternatives.
8. Save the real source, reload the page, and repeat the checks.

If the markup validates but the page still behaves unexpectedly, check what is styling or changing it. CSS affects appearance, JavaScript can change the DOM, and network failures can prevent resources from loading. The browser console and Network panel can help investigate those separate issues.

## Common HTML problems to look for

### Elements closed in the wrong order

Nested elements should close in reverse order from how they opened:

~~~html
<p><em><strong>Both emphasized</strong></em></p>
~~~

If a browser repairs the order for display, the result may still differ from what the source author intended.

### Invalid nesting

Elements have rules about which other elements may appear inside them. For example, do not nest one link inside another:

~~~html
<a href="/first">
  First page
  <a href="/second">Second page</a>
</a>
~~~

Give each link its own destination and place them as separate siblings instead.

### Duplicate IDs

An ID should identify one element in a document. Reusing an ID can make fragment links and scripts select the wrong element:

~~~html
<h2 id="contact">Contact</h2>
<p id="contact">Send us a message.</p>
~~~

Give the paragraph a different ID if it needs one, or remove its ID if nothing refers to it.

### Missing or unclear text alternatives

A validator may help find a missing alt attribute, but it cannot decide what an image means in context. Write alternative text that serves the image's purpose. Use an empty alt value for an image that is purely decorative and should be skipped by assistive technology.

### Wrong document or stale changes

If the page does not reflect an edit, check the file path, browser address, saved status, and reload state. A local file and a deployed URL can contain different versions.

## Validation is one part of review

After fixing conformance errors, check the page's purpose and behavior:

- Does each section have a useful heading?
- Does every link name its destination?
- Do form controls have labels?
- Does each meaningful image have an appropriate text alternative?
- Can the page be used with a keyboard?
- Does the content still make sense if styling is unavailable?
- Are errors from the validator actually fixed in the source, rather than hidden by browser recovery?

Automated checkers are useful, but they cannot replace human review of meaning and usability.

## Common mistakes

- Assuming a page is correct because it renders in a browser.
- Fixing only the location shown in an error message without checking nearby markup.
- Treating all warnings as errors or ignoring every warning.
- Editing the live DOM in developer tools and forgetting to update the source file.
- Assuming zero validator errors proves accessibility or usability.
- Using the browser console as the only way to validate HTML.
- Checking a local source file when the actual problem is in a different deployed version.
- Uploading private page content to a public checker without considering its privacy.

## Try it yourself

1. Paste a complete HTML document into the Nu Html Checker and read its report.
2. Add a mismatched end tag, validate again, and fix the actual source.
3. Create an invalid nested-link example and then separate the links correctly.
4. Add the same ID to two elements, observe the validator message, and give each element an appropriate unique ID.
5. Open the page's DOM inspector and compare the displayed tree with View Source.
6. Temporarily edit an element in the inspector, reload the page, and explain why the edit disappears.
7. Check an image with the validator, then decide yourself whether its alt text is accurate for the page.
8. After the document validates, use the page and review its meaning and accessibility manually.

## Key points

- Browsers can recover from invalid markup, so rendering alone does not prove correctness.
- An HTML validator finds many conformance issues and points to likely locations.
- Fix related errors in small steps and run the checker again.
- The source file, the parsed DOM, and the live DOM after scripts may differ.
- Developer tools inspect the browser's current DOM; source view shows the original markup.
- No validator can decide every question of meaning, accessibility, or usability.
- Validate, inspect, use, and review the page.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [52 - Deprecated elements and obsolete HTML](52-obsolete-html.md) | [Q&A](../qnas/53-validation-and-debugging.md) | [Example](../examples/53-validation-and-debugging.md) | [54 - HTML-only practice pages](54-html-practice-projects.md) |