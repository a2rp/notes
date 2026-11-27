# 16. Validation, testing, and release checks

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Global attributes and data attributes](./15-global-and-data-attributes.md) | [Notes index](../README.md) | [Next: All code samples](./98-all-code-samples.md) |

## Validate the source markup

Use an HTML checker to find invalid nesting, missing required attributes, duplicate ids, and other markup errors.

~~~text
https://validator.w3.org/nu/
~~~

A browser may repair malformed markup while displaying the page. Validation checks the source rules that the rendered appearance alone cannot confirm.

## Inspect the page in a browser

Open the page at narrow and wide viewport sizes. Check that links reach the intended pages, images load, forms submit the expected fields, media controls work, and no important information depends on a visual effect.

Use browser developer tools to inspect the document tree, console errors, network requests, and accessibility tree. Confirm that the rendered structure matches the intended parent and child elements.

## Test keyboard and assistive technology behavior

Navigate with the keyboard. Confirm that focus order follows the page, visible focus remains clear, skip links work, dialogs can close, and all actions have an accessible name.

Use a screen reader when possible to check headings, landmarks, images, table headers, and form labels. A page can look correct and still have an unclear reading order or missing control names.

## Review forms and links

Submit forms with valid and invalid values. Confirm that labels and errors are associated with the right controls, required fields are clear, and server-side validation is in place.

Check internal and external links, capitalization in deployed paths, fragment targets, new-tab behavior, and descriptive link text.

## Check media and metadata

Confirm that images have useful alternatives, dimensions, and responsive sources where appropriate. Verify that captions load with their media, iframe titles are clear, and the document title and description match the page.

## Release checklist

Before publishing, check that the page validates, local assets load, headings and landmarks are meaningful, all controls work by keyboard, forms validate on the server, no important content depends on scripts or animation, and the deployed version matches the tested source.

## Practice questions

1. What can an HTML checker find?
2. Why can a correct visual appearance hide source markup problems?
3. Which page sizes should be checked?
4. What should be inspected in browser developer tools?
5. Which keyboard behaviors should be verified?
6. Why test with a screen reader when possible?
7. Which form behaviors should be checked before release?
8. What should the final release checklist confirm?

## Main references

- [Nu HTML Checker](https://validator.w3.org/nu/)
- [HTML conformance requirements](https://html.spec.whatwg.org/multipage/)
- [HTML accessibility basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
- [HTML validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_testing/Cross_browser_testing/HTML_and_CSS)