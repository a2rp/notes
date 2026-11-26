# 56 - Print styles - Q&A

Review print media queries, page setup, pagination, and the limits of print CSS. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which media query applies declarations to print output?

- A. @media paper
- B. @media print
- C. @media page
- D. @media output

**Answer: B. @media print.**

**Explanation:** The print media type targets paged output such as a printer or a browser's print preview and print-to-PDF flow.

### 2. What is a useful reason to hide a site navigation bar when printing?

- A. It is usually interface chrome that takes space but does not help the printed content
- B. CSS cannot print navigation
- C. It makes every page fit on one sheet
- D. It changes the HTML structure

**Answer: A. It is usually interface chrome that takes space but does not help the printed content.**

**Explanation:** Print rules can remove controls that are useful on screen but not on paper. Keep content that readers need, including headings and instructions.

### 3. What does display: none do to an element in print layout?

- A. Hides it while preserving its layout space
- B. Removes it and its descendants from the layout
- C. Makes it print in gray
- D. Moves it to the next page

**Answer: B. Removes it and its descendants from the layout.**

**Explanation:** The element does not occupy space in the printed layout. Use visibility: hidden if space should remain, though that is less common for print cleanup.

### 4. What is the purpose of the @page at-rule?

- A. To set document language
- B. To describe page-box properties such as paper size and margins
- C. To make an element repeat on every page
- D. To choose a screen breakpoint

**Answer: B. To describe page-box properties such as paper size and margins.**

**Explanation:** @page can request page dimensions and margins for paged output. The browser, printer, and user settings may affect the final result.

### 5. What does break-before: page request?

- A. A page break before the selected element
- B. That the element be hidden
- C. That the element be repeated in the header
- D. That the browser open a new tab

**Answer: A. A page break before the selected element.**

**Explanation:** It is useful for intentional boundaries, such as starting a major report section on a new sheet. Overusing forced breaks can create blank space.

### 6. What does break-inside: avoid-page mean?

- A. The browser must never split the element under any circumstance
- B. The browser should try to avoid a page break inside the element
- C. The element starts on a new page
- D. The element is removed from print

**Answer: B. The browser should try to avoid a page break inside the element.**

**Explanation:** Avoidance is a pagination preference, not an absolute guarantee. A box that is taller than the printable page may still need to split or overflow.

### 7. Which property requests a minimum number of paragraph lines at the bottom of a page before a break?

- A. widows
- B. orphans
- C. line-clamp
- D. text-wrap

**Answer: B. orphans.**

**Explanation:** Orphans is the minimum number of lines left at the bottom of a page. Widows is the minimum number of lines continued at the top of the next page.

### 8. What does widows control in paged text?

- A. The minimum number of lines at the top of a page after a paragraph breaks
- B. The maximum width of a paragraph
- C. Whether headings are bold
- D. Whether a page has a footer

**Answer: A. The minimum number of lines at the top of a page after a paragraph breaks.**

**Explanation:** The property helps avoid leaving a single line of a paragraph by itself at the top of the next page.

### 9. Why might a stylesheet use display: table-header-group on thead in print styles?

- A. To request that the table header repeat on pages containing later rows
- B. To hide the header
- C. To turn the table into a flex container
- D. To force each row onto a separate sheet

**Answer: A. To request that the table header repeat on pages containing later rows.**

**Explanation:** This is a print-layout hint supported by common browser engines, but the result should still be checked in print preview.

### 10. What is the initial print-color-adjust value designed to allow?

- A. The browser to adjust colors for printing economy or legibility
- B. The browser to ignore all author colors
- C. Every color to print exactly
- D. All backgrounds to print

**Answer: A. The browser to adjust colors for printing economy or legibility.**

**Explanation:** The economy value allows adjustments such as saving ink. User and browser print preferences can also affect colors.

### 11. What does print-color-adjust: exact communicate?

- A. A request to preserve specified colors more closely
- B. A guarantee that every printer uses the exact ink values
- C. A request to remove all colors
- D. A setting for screen contrast only

**Answer: A. A request to preserve specified colors more closely.**

**Explanation:** Exact is a hint, not a guarantee. User preferences and print-system settings take priority, so do not rely on color alone to convey important information.

### 12. Why should essential information not depend on a background color?

- A. Print dialogs often disable background printing
- B. Background colors cannot be used in CSS
- C. Backgrounds always print darker than text
- D. @media print removes all backgrounds automatically

**Answer: A. Print dialogs often disable background printing.**

**Explanation:** Readers and browsers may omit backgrounds to save ink. Include essential meaning in text, structure, borders, or symbols as well.

### 13. Which statement about @page margins is accurate?

- A. They always override printer hardware limits
- B. They request margins, but dialog and printer settings may affect the result
- C. They only apply to screen layout
- D. They remove the need to test print preview

**Answer: B. They request margins, but dialog and printer settings may affect the result.**

**Explanation:** CSS cannot make a printer print into a non-printable area, and users can change paper, scale, and margin settings.

### 14. Which CSS property is the modern choice for starting a new page before a section?

- A. break-before
- B. page-open
- C. print-start
- D. margin-before

**Answer: A. break-before.**

**Explanation:** The break-before, break-after, and break-inside properties are the modern fragmentation properties. Older page-break-* aliases may still appear in legacy stylesheets.

## Short-answer questions

### 15. What is a print stylesheet?

**Answer:** CSS rules that adapt a document for printed pages or print-to-PDF output.

**Explanation:** It can restyle text and layout, hide screen-only controls, set page preferences, and guide page breaks while retaining the same document content.

### 16. Why is it often better to add a small print override than to duplicate the entire stylesheet?

**Answer:** Focused overrides are easier to maintain and keep the screen and print presentations consistent.

**Explanation:** The normal cascade still applies in print. Only declarations that need a different print treatment have to be overridden.

### 17. Name two kinds of elements that may be hidden in print and one kind that should usually remain.

**Answer:** A site menu and a search control may be hidden; the page title and meaningful article content should remain.

**Explanation:** Remove interface-only elements when they do not help on paper, but keep information needed to understand the document.

### 18. What is the difference between break-before and break-after?

**Answer:** break-before controls a break before an element; break-after controls a break after it.

**Explanation:** Both can guide page boundaries. Values such as page request a forced break, while avoid values discourage certain breaks.

### 19. Why should break-inside: avoid-page usually be used on a short card or figure rather than an entire long article?

**Answer:** A short unit may fit on a page, while a long article may be taller than the printable area and cannot be kept together.

**Explanation:** The browser must still paginate content. Avoidance does not override the physical page size or guarantee that a large box stays unbroken.

### 20. What should you check when printing a table that spans several pages?

**Answer:** Check whether its header repeats, whether columns fit, and whether rows split or clip awkwardly.

**Explanation:** Print table behavior can vary. Use semantic table markup and inspect the actual preview.

### 21. Why might you append link addresses after link text in a print stylesheet?

**Answer:** Readers can see where a link points when they cannot click the printed page.

**Explanation:** This is optional and can make lines long. Use it only when destinations are useful and the link text does not already show them.

### 22. What does the print media query not control completely?

**Answer:** It cannot fully control the browser, printer, operating system, or user's print settings.

**Explanation:** Settings such as paper, scaling, margins, background printing, and browser-added headers or footers can affect the result.

## Applied questions

### 23. A page has a screen navigation element with class site-navigation. Hide it only in print.

**Answer:**

~~~
@media print {
    .site-navigation {
        display: none;
    }
}
~~~

**Explanation:** The rule applies in print output and leaves the ordinary screen presentation unchanged.

### 24. A report section should begin on a new printed page. Write the rule.

**Answer:**

~~~
@media print {
    .report-section {
        break-before: page;
    }
}
~~~

**Explanation:** This requests a page break before each selected section. Apply it only to real section boundaries to avoid excessive blank space.

### 25. A short figure should stay with its caption when possible. What rule can help?

**Answer:**

~~~
@media print {
    figure {
        break-inside: avoid-page;
    }
}
~~~

**Explanation:** This discourages a page break inside the figure. If the figure is taller than the available page area, the browser may still split it.

### 26. Write print CSS that requests A4 portrait pages with 18 mm margins.

**Answer:**

~~~
@page {
    size: A4 portrait;
    margin: 18mm;
}
~~~

**Explanation:** This sets a preferred page size and margin. A print dialog or printer may use different settings.

### 27. A paragraph is split with only one line at the bottom of the first page. Show a rule requesting at least three lines there and at the top of the next page.

**Answer:**

~~~
@media print {
    p {
        orphans: 3;
        widows: 3;
    }
}
~~~

**Explanation:** Orphans applies to the bottom of the first page; widows applies to the top of the next page. They guide, but do not guarantee, exact pagination.

### 28. Show a print rule that repeats table headers when a table continues onto another page.

**Answer:**

~~~
@media print {
    thead {
        display: table-header-group;
    }
}
~~~

**Explanation:** This requests repeated header-group behavior in paged output. Inspect the result because browser handling can vary.

### 29. A dark card uses white text on a dark background. What should a print stylesheet consider?

**Answer:** Set readable dark text on a light surface, remove decorative shadows, and ensure the content remains clear when backgrounds are not printed.

**Explanation:** Print backgrounds may be disabled. A print override should preserve meaning without relying on the dark fill.

### 30. A print preview shows a large blank area before every small subsection. What is a likely cause and a sensible correction?

**Answer:** A forced page break is probably applied too broadly. Remove it from small subsections and reserve forced breaks for major boundaries.

**Explanation:** A page break before each small block can push content to the next sheet and waste space. Use automatic pagination unless a new page is intentional.

### 31. How can CSS optionally show the destination after an absolute link in print?

**Answer:**

~~~
@media print {
    a[href^="http"]::after {
        content: " (" attr(href) ")";
    }
}
~~~

**Explanation:** Generated content can add a visible address, but the pattern is optional and may lengthen lines. Descriptive link text should still make sense on its own.

### 32. A logo's brand color should be preserved in print when possible. What property can express that preference, and what limitation should you explain?

**Answer:**

~~~
@media print {
    .brand-mark {
        print-color-adjust: exact;
    }
}
~~~

The property asks the browser to preserve the color more closely, but browser and user print settings may still change it.

**Explanation:** It is a preference hint, not a guarantee. Do not encode essential information only in that color.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [55 - Color schemes and theming](../lessons/55-color-schemes-and-theming.md) | [Q&A](56-print-styles.md) | [Example](../examples/56-print-styles.md) | [57 - Anchor positioning](../lessons/57-anchor-positioning.md) |