# 62 - Organizing large stylesheets - Q&A

Use these questions to review stylesheet entry points, file grouping, cascade layers, imports, Sass modules, and incremental refactoring. Each answer appears immediately after its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is a useful goal for organizing a growing stylesheet?

- A. Put each declaration in its own file
- B. Make rules easy to find, understand, and safely change
- C. Avoid using the cascade
- D. Require a preprocessor

**Answer: B. Make rules easy to find, understand, and safely change.**

**Explanation:** Organization should clarify ownership and dependencies. The number of files or use of a tool does not determine quality by itself.

### 2. What does a stylesheet entry point help a developer identify?

- A. The first HTML element in the document
- B. The CSS files the page loads and their intended order
- C. The browser's default font
- D. Every CSS selector used by a browser

**Answer: B. The CSS files the page loads and their intended order.**

**Explanation:** A clear entry point makes stylesheet dependencies visible and gives contributors a place to understand how the CSS is assembled.

### 3. What does layer-first organization group together?

- A. Styles with the same broad responsibility
- B. Every file that contains the same color
- C. Only files from the same author
- D. HTML pages that have the same title

**Answer: A. Styles with the same broad responsibility.**

**Explanation:** Reset, base, layout, component, and utility files are examples of layer-first grouping.

### 4. What is one advantage of component-first organization?

- A. A component's styles are easier to locate together
- B. It removes the cascade
- C. Every stylesheet becomes smaller than one rule
- D. It guarantees no duplicate CSS

**Answer: A. A component's styles are easier to locate together.**

**Explanation:** A focused file can keep a component's base styles and variations together. It may also create more files to navigate.

### 5. What does this declaration establish?

~~~
@layer reset, base, components, utilities;
~~~

- A. The order of named cascade layers
- B. The order of HTML elements
- C. The font size of the root
- D. A list of CSS files to import

**Answer: A. The order of named cascade layers.**

**Explanation:** It establishes the relative order for normal declarations in those named layers. The first occurrence of the names determines their order.

### 6. Which normal declaration has higher layer precedence when the order is reset, base, components?

- A. A declaration in reset
- B. A declaration in base
- C. A declaration in components
- D. All layers always have equal precedence

**Answer: C. A declaration in components.**

**Explanation:** Later named layers take precedence over earlier named layers for normal declarations with the same origin and importance.

### 7. What is true of unlayered normal author declarations compared with layered normal author declarations?

- A. Unlayered declarations take precedence over layered ones
- B. Unlayered declarations are ignored
- C. Layered declarations always take precedence
- D. The browser chooses based on file size

**Answer: A. Unlayered declarations take precedence over layered ones.**

**Explanation:** If a project adopts layers, placing its author rules consistently inside them helps avoid accidental unlayered overrides.

### 8. Why does stylesheet link order still matter when a project uses layers?

- A. It can decide source order when declarations have otherwise equal cascade precedence
- B. The first link always wins for every property
- C. It changes the HTML document order
- D. It disables layer ordering

**Answer: A. It can decide source order when declarations have otherwise equal cascade precedence.**

**Explanation:** Layers make one part of the cascade explicit. They do not remove specificity or source order from the cascade.

### 9. Where should native CSS @import rules generally appear?

- A. At the end of a stylesheet after all selectors
- B. At the start of a stylesheet, following its syntax ordering rules
- C. Inside every declaration block
- D. Only inside HTML style attributes

**Answer: B. At the start of a stylesheet, following its syntax ordering rules.**

**Explanation:** CSS has ordering requirements for @import. It is not a general-purpose rule that can be placed anywhere in a stylesheet.

### 10. At which point do imported stylesheet rules participate in the cascade?

- A. As if their contents appeared at the import point
- B. Before all user-agent styles
- C. After every linked stylesheet
- D. Only after inline styles

**Answer: A. As if their contents appeared at the import point.**

**Explanation:** The import location affects the relationship of imported rules to other rules in the stylesheet system.

### 11. What is one benefit of linking separate CSS files directly from HTML?

- A. The page's stylesheet dependencies are visible in its markup
- B. CSS selectors no longer need names
- C. The browser skips the cascade
- D. The files stop sharing design tokens

**Answer: A. The page's stylesheet dependencies are visible in its markup.**

**Explanation:** Direct links make it straightforward to inspect which stylesheets a page loads.

### 12. What is Sass @use?

- A. A Sass module-system rule processed before CSS reaches the browser
- B. Another spelling for an HTML link element
- C. A CSS selector
- D. A browser-only replacement for @layer

**Answer: A. A Sass module-system rule processed before CSS reaches the browser.**

**Explanation:** Sass is compiled to CSS. Plain CSS does not understand Sass-specific module rules such as @use or @forward.

### 13. Why can a long chain of imports be hard to maintain?

- A. It hides dependencies and makes ordering harder to follow
- B. It prevents CSS from using classes
- C. It makes every selector global
- D. It removes all layer declarations

**Answer: A. It hides dependencies and makes ordering harder to follow.**

**Explanation:** A small aggregator can be useful, but deeply nested imports make it less obvious where rules come from.

### 14. Which file structure is always best for every project?

- A. Layer-first
- B. Component-first
- C. Feature-first
- D. There is no single structure that fits every project

**Answer: D. There is no single structure that fits every project.**

**Explanation:** Choose a structure that matches project size, ownership, and how contributors locate and change styles.

### 15. What is a safe way to reorganize a large stylesheet?

- A. Rewrite every file at once
- B. Move a small group of related rules and preserve behavior
- C. Delete all existing rules and start over
- D. Rename every class during the same change

**Answer: B. Move a small group of related rules and preserve behavior.**

**Explanation:** Incremental changes make regressions easier to detect and explain.

## Short-answer questions

### 16. What is the difference between layer-first and component-first file organization?

**Answer:** Layer-first organization groups rules by broad responsibility, such as base styles or components. Component-first organization groups the rules for an interface component in a focused file.

**Explanation:** Either can work. The best choice makes ownership and navigation clear for the team.

### 17. Why should a project declare cascade layer order in a predictable place?

**Answer:** The first declaration of named layers establishes their order.

**Explanation:** A central order declaration makes it easier to reason about precedence across files and prevents an unrelated file from establishing an unexpected order first.

### 18. Does cascade layer order replace specificity and source order?

**Answer:** No. Layers add another stage of cascade precedence. Specificity and source order still matter when declarations are compared within the relevant cascade context.

**Explanation:** Layers reduce the need for specificity tricks but do not eliminate the cascade.

### 19. Why should a project avoid casually mixing layered and unlayered rules?

**Answer:** Normal unlayered author declarations can take precedence over normal declarations in named layers.

**Explanation:** A rule outside the declared layer plan can unexpectedly override component or utility styles.

### 20. What is one good reason to split a stylesheet into more files?

**Answer:** Splitting can make ownership, review, reuse, or page-specific loading clearer.

**Explanation:** If the split only creates more navigation with no clear benefit, keeping the rules together may be simpler.

### 21. How should a team decide between layer-first and feature-first organization?

**Answer:** Consider how contributors work. Use layer-first when broad style responsibilities are the easiest way to find rules. Use feature-first when page areas have distinct ownership or loading needs.

**Explanation:** These approaches can be combined, but shared tokens and base styles still need a clear owner.

### 22. What should a component stylesheet depend on?

**Answer:** It can depend on shared tokens and base styles, but should avoid depending on the exact markup structure of one unrelated page.

**Explanation:** Clear dependency direction helps a component remain reusable and easier to move.

### 23. How is Sass @use different from CSS @import?

**Answer:** Sass @use loads Sass modules and is processed by the Sass compiler. CSS @import is a browser CSS rule that includes another stylesheet in the cascade.

**Explanation:** They have different syntax, scope, and processing stages. Plain CSS cannot use Sass variables, mixins, @use, or @forward.

### 24. Why should a stylesheet entry point be easy to find?

**Answer:** It shows which CSS files are part of a page and helps developers trace loading order and ownership.

**Explanation:** A clear entry point reduces time spent searching for hidden imports or build configuration.

### 25. What should you inspect before adding another override for a property?

**Answer:** Locate the existing declaration and inspect its file, layer, selector specificity, and source order.

**Explanation:** The new override may conceal a problem in the original rule's scope or ownership.

## Applied questions

### 26. A site has one 2,000-line file. What is a reasonable first organization step?

**Answer:** Add clear responsibility-based sections and identify repeated components before splitting files.

**Explanation:** Sections improve navigation immediately. A later split can follow actual ownership and reuse patterns.

### 27. Several component files all set color, spacing, and radius values independently. What should be considered?

**Answer:** Move repeated design values into shared custom properties with role-based names.

~~~
:root {
    --color-accent: #285c42;
    --space-card: 1.5rem;
    --radius-card: 0.75rem;
}
~~~

**Explanation:** Shared tokens centralize values used across components. Keep one-off values local unless they represent a reusable design decision.

### 28. Two files use the components layer, but a declaration in the second file wins. Why?

**Answer:** If the declarations have otherwise equal cascade precedence, the later source order can decide the result.

**Explanation:** Layer membership does not remove source order within a layer. Inspect specificity and stylesheet order as well.

### 29. A project has layers named base and components, but some styles are outside any layer. What should be checked?

**Answer:** Check whether those unlayered declarations are unexpectedly overriding normal layered styles.

**Explanation:** Unlayered normal author styles take precedence over normal author styles in named layers.

### 30. A developer writes many nested CSS @import rules to assemble components. What could make the organization clearer?

**Answer:** Use a clear entry point that lists the dependencies directly, or link the needed stylesheets from HTML in a deliberate order.

**Explanation:** A long chain makes it harder to see where rules are loaded from and how they enter the cascade.

### 31. A team uses Sass but writes @use in a plain .css file. What is wrong?

**Answer:** The browser does not process Sass module syntax. The rule belongs in Sass source that is compiled to CSS.

**Explanation:** Keep source-language modules separate from browser-ready CSS output.

### 32. A refactor moves all component styles into separate files and breaks one page. What should be investigated?

**Answer:** Check the stylesheet links, source order, layer assignment, specificity, and any page-specific context the old rules relied on.

**Explanation:** Moving rules can change how declarations interact even if the selectors themselves are unchanged.

### 33. A project has a button with one selector and three declarations. Does it need a separate file?

**Answer:** Not automatically. Keep it with related styles unless a separate file makes ownership or reuse clearer.

**Explanation:** A file per selector adds overhead without necessarily improving navigation.

### 34. A visual bug is fixed by appending another declaration at the end of a global stylesheet. What should happen next?

**Answer:** Find the original conflicting rule, determine why it wins, and decide which rule should own the property. Remove the temporary override if it becomes obsolete.

**Explanation:** Stacking patches makes the cascade harder to understand and can cause later regressions.

## Practice task

Organize a small stylesheet with a reset, shared tokens, one page layout, two components, and one utility. Declare layers in an entry file, then put component rules in separate files. Explain which file owns each kind of change.

**One possible file structure:**

~~~
styles/
  00-order-and-tokens.css
  01-reset.css
  02-layout.css
  components/
    card.css
    button.css
  90-utilities.css
~~~

**One possible entry file:**

~~~
@layer reset, base, layout, components, utilities;

@layer base {
    :root {
        --color-accent: #285c42;
        --space-card: 1.5rem;
    }
}
~~~

**Explanation:** The entry file declares a predictable layer order and shared values. The reset, layout, components, and utilities each have clear ownership. The HTML should link the files deliberately, and later source order still matters when declarations have equal precedence in the same layer.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [61 - Resets and base styles](../lessons/61-resets-and-base-styles.md) | [Q&A](62-organizing-large-stylesheets.md) | [Example](../examples/62-organizing-large-stylesheets.md) | [63 - Styling Shadow DOM and web components](../lessons/63-shadow-dom-and-web-components.md) |