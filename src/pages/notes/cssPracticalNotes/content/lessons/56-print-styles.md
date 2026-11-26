# 56 - Print styles

Print styles prepare a web page for paper or a print-to-PDF workflow. A screen layout often includes navigation, controls, dark surfaces, and multi-column arrangements that do not help on paper. A print stylesheet can hide interface-only elements, keep essential content readable, and guide where content breaks across pages.

Print CSS is still CSS. The browser applies the normal cascade, then applies rules inside the print media query when it creates a print preview or print output. The browser, operating system, printer, and the reader's print settings can all affect the final result, so inspect the preview instead of assuming that every property will be honored exactly.

## The print media query

Use @media print for declarations that should apply only to printed output. Keep the ordinary screen rules as the default, then add print overrides where the two presentations need different treatment.

~~~
/* Screen and other media */
.site-header {
    display: flex;
    justify-content: space-between;
}

/* Printed pages */
@media print {
    .site-header {
        display: none;
    }
}
~~~

Rules in the print query participate in the same cascade as other author rules. A more specific screen selector can still win, so use selectors with appropriate specificity and place overrides where they are easy to maintain. Do not duplicate the entire stylesheet if a few focused overrides are enough.

You can also use a print query in a stylesheet link:

~~~
<link rel="stylesheet" href="print.css" media="print">
~~~

This is useful when a project has a substantial print design. For most pages, a small @media print block beside the related component styles is simpler.

## Make printed content readable

Paper output should work without relying on the screen's background colors, animations, or interactive controls. A common print pass sets a plain page background and dark text, removes decorative shadows, and preserves enough spacing to distinguish sections.

~~~
@media print {
    body {
        color: #000;
        background: #fff;
        font: 11pt/1.45 Georgia, "Times New Roman", serif;
    }

    h1,
    h2,
    h3 {
        color: #000;
        break-after: avoid-page;
    }

    .card {
        color: #000;
        background: transparent;
        border: 1px solid #777;
        box-shadow: none;
    }
}
~~~

Print backgrounds are often disabled by default to save ink. Do not put essential text, meaning, or distinctions only in a background image or color. If a color carries meaning, add another cue such as a label, border, or symbol. The reader can also choose print settings that change background printing.

Elements used only for screen interaction, such as a site menu, search form, carousel controls, or a print button, can be hidden if they do not contribute useful printed information.

~~~
@media print {
    .site-navigation,
    .search-form,
    .carousel-controls,
    .print-button {
        display: none !important;
    }
}
~~~

Use display: none selectively. Hiding an element removes it and its descendants from the printed layout. Do not hide the only copy of a heading, instruction, contact detail, or other information the reader needs on paper.

## Page size and margins with @page

The @page at-rule describes the page box used for paged output. It can set a preferred paper size and page margins.

~~~
@page {
    size: A4 portrait;
    margin: 18mm;
}

@page :first {
    margin-top: 25mm;
}
~~~

The size descriptor can request a named paper size such as A4 or letter, optionally with an orientation such as portrait or landscape. The margin descriptor accepts the familiar one-to-four value shorthand. Page settings are requests to the print system. The browser's print dialog, available paper, printer capabilities, and user choices may override them.

Keep important content away from the physical edge of a sheet. Printers may have non-printable areas, even when CSS margins are small. Avoid assuming that every printer supports borderless output.

Some paged-media features, including page-margin boxes for running headers and footers, vary in browser support. Use them only when the target browsers support them, and keep the document understandable without them.

## Control page breaks

A browser normally chooses page breaks automatically. Break properties can guide those choices:

- break-before controls whether a break should occur before an element.
- break-after controls whether a break should occur after an element.
- break-inside controls whether a break should occur inside an element.

Common values include auto, avoid, and page. The more specific values avoid-page and page apply to page fragmentation.

~~~
@media print {
    .chapter {
        break-before: page;
    }

    h2,
    h3 {
        break-after: avoid-page;
    }

    figure,
    .summary-card {
        break-inside: avoid-page;
    }
}
~~~

Use forced page breaks for intentional boundaries, such as starting each major report section on a new sheet. Avoid forcing a break before every small section because that can leave large blank areas.

Avoidance is a preference, not a guarantee. If a box is taller than the printable area, the browser may need to split it or overflow it. Apply break-inside: avoid-page to compact units such as a short card, figure, or table row, not to an entire long article.

Older stylesheets may use page-break-before, page-break-after, or page-break-inside. The modern break-before, break-after, and break-inside properties are the preferred names. Legacy aliases may still appear in existing projects for compatibility with older browsers.

## Keep headings and paragraphs together

A heading at the very bottom of a page with its paragraph on the next page is difficult to read. Prevent a break immediately after headings, and use orphans and widows to request a minimum number of lines at the bottom and top of a fragmented block.

~~~
@media print {
    h1,
    h2,
    h3 {
        break-after: avoid-page;
    }

    p {
        orphans: 3;
        widows: 3;
    }
}
~~~

These properties guide pagination but do not promise exact line placement. The available page space and other break rules still matter.

## Tables and images

Use real table markup for tabular data. A table header group can be repeated on later pages by the browser's print layout, which helps readers understand a table that spans several sheets.

~~~
@media print {
    thead {
        display: table-header-group;
    }

    tfoot {
        display: table-footer-group;
    }

    tr {
        break-inside: avoid-page;
    }
}
~~~

This is a layout hint and browser behavior can vary. Do not make table rows so tall that they cannot fit on a page. Check the printed output for clipped columns, repeated headers, and rows split in inconvenient places.

Keep images within the printable content area and preserve their proportions:

~~~
@media print {
    img,
    svg,
    video {
        max-width: 100%;
    }

    img {
        height: auto;
    }
}
~~~

A video itself cannot be meaningfully printed. If the page needs to communicate information from a video, provide a useful text description or poster image in the document. Do not make essential information available only through animation or playback.

## Links in printed pages

A printed page cannot be clicked, so make link text descriptive. For a document where readers need to visit destinations later, CSS can append the address after links:

~~~
@media print {
    a[href^="http"]::after {
        content: " (" attr(href) ")";
        overflow-wrap: anywhere;
        font-size: 90%;
    }
}
~~~

This pattern is optional. It may create long lines, expose destinations that are not useful on paper, or print an address for a link whose text already contains it. Use a class or a more specific selector when only some links should show their address. Do not use generated content as a replacement for meaningful link text because generated content may not be available to every reader or assistive technology.

## Color adjustment

The print-color-adjust property communicates whether the author prefers the browser to preserve color choices or optimize them for printing.

~~~
@media print {
    .brand-mark {
        print-color-adjust: exact;
    }
}
~~~

The initial value, economy, allows the browser to adjust colors to save ink or improve legibility. exact asks the browser to preserve the specified colors more closely, but it is still a hint. Browser and user print preferences take priority. Essential information must remain clear if colors are changed or omitted.

## A practical print stylesheet

~~~
@page {
    size: A4 portrait;
    margin: 18mm;
}

@media print {
    body {
        color: #111;
        background: #fff;
        font-size: 11pt;
        line-height: 1.45;
    }

    .site-header,
    .site-navigation,
    .screen-controls,
    .print-button {
        display: none !important;
    }

    main {
        width: auto;
        max-width: none;
        margin: 0;
        padding: 0;
    }

    h1,
    h2,
    h3 {
        color: #000;
        break-after: avoid-page;
    }

    .new-page {
        break-before: page;
    }

    figure,
    .notice {
        break-inside: avoid-page;
    }

    p {
        orphans: 3;
        widows: 3;
    }

    img,
    svg {
        max-width: 100%;
    }

    img {
        height: auto;
    }
}
~~~

This is a starting point, not a universal stylesheet. Remove only elements that do not help the paper version, then inspect the result at the intended paper size.

## Test with print preview

Use the browser's print preview to check the page before printing. Review:

1. Whether navigation and controls are hidden without hiding useful content.
2. Whether text is readable against the printed page background.
3. Whether headings are separated from the content that follows them.
4. Whether cards, figures, tables, and images fit within page margins.
5. Whether page breaks create empty pages or split content awkwardly.
6. Whether URLs, colors, and browser-added headers or footers are useful for this document.
7. Whether the result still makes sense when background printing is disabled.

Test a long page, a short page, and a page with a table or image. Browser print settings can change paper size, scale, margins, background printing, and headers or footers, so a stylesheet cannot control every part of the final sheet.

## Common mistakes

- **Treating print as a screenshot of the screen:** Paper has page boundaries and different constraints. Plan for pagination.
- **Depending on background color:** Background printing may be disabled. Keep meaning in text and structure.
- **Hiding too much:** Removing navigation is often useful, but hiding a section heading or instruction can make the document incomplete.
- **Forcing too many page breaks:** Breaks before every card or heading create unnecessary blank space.
- **Applying break-inside: avoid-page to a long container:** A large element still has to fit somewhere and may paginate badly.
- **Using color alone to communicate status:** Printed colors may change or disappear. Include text, symbols, or other cues.
- **Expecting @page to override printer settings:** The print dialog and device settings can take precedence.
- **Forgetting link destinations:** On paper, descriptive link text is useful; append addresses only where they help.
- **Checking only one page:** Break behavior can change later in a long document. Review several page boundaries.

## Try it yourself

1. Add a print button to a sample page and hide it inside @media print.
2. Hide the screen navigation while keeping the page title and main content.
3. Set a print font size, line height, text color, and white background.
4. Add an @page rule with a paper size and margins, then compare it with the print dialog settings.
5. Start one major section on a new page with break-before: page.
6. Keep a short figure with its caption using break-inside: avoid-page.
7. Add widows and orphans to paragraphs and inspect where they break.
8. Print-preview a table that spans multiple pages and inspect its header and rows.
9. Disable background printing in the dialog and check whether the document still communicates its meaning.
10. Compare the preview after changing the scale or paper size.

## Key points

- Use @media print to adapt screen styles for printed pages and print-to-PDF output.
- Use @page to request page size and margins, while accounting for user and printer settings.
- Use page-break properties to guide pagination, not to assume perfect control over it.
- Keep headings with following content and use widows and orphans as pagination hints.
- Keep tables and images readable within the printable area, and inspect multi-page content.
- Do not rely on backgrounds or color alone to communicate important information.
- Check print preview at realistic page sizes because the final result depends on more than CSS.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [55 - Color schemes and theming](55-color-schemes-and-theming.md) | [Q&A](../qnas/56-print-styles.md) | [Example](../examples/56-print-styles.md) | [57 - Anchor positioning](57-anchor-positioning.md) |