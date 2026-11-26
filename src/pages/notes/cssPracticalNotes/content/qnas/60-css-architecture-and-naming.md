# 60 - CSS architecture and naming conventions - Q&A

Use these questions to review CSS architecture, selector scope, naming systems, custom properties, and cascade layers. Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. What is the main purpose of CSS architecture?

- A. To require every project to use the same framework
- B. To make styles easier to find, understand, and change
- C. To avoid using classes
- D. To place every rule in a separate file

**Answer: B. To make styles easier to find, understand, and change.**

**Explanation:** A useful architecture creates predictable organization and reduces unintended effects. Its exact conventions can vary by project.

### 2. In the common BEM naming pattern, what is a block?

- A. A standalone component
- B. A media query
- C. A declaration inside a rule
- D. A file containing all CSS

**Answer: A. A standalone component.**

**Explanation:** A card, navigation menu, or notice can each be treated as a block.

### 3. Which name follows the common BEM spelling for a card title element?

- A. card-title
- B. card_title
- C. card__title
- D. card--title

**Answer: C. card__title.**

**Explanation:** The double underscore convention marks an element that belongs to a block.

### 4. Which name is a BEM modifier for a featured card?

- A. card__featured
- B. card--featured
- C. card_featured
- D. featured__card

**Answer: B. card--featured.**

**Explanation:** A double hyphen marks a block variation in the common BEM spelling. The element should usually keep its base block class too.

### 5. Why is a name such as red-box often a poor component class?

- A. CSS class names cannot contain color words
- B. The name may become misleading when the design changes
- C. It has higher specificity than an ID
- D. It only works with inline styles

**Answer: B. The name may become misleading when the design changes.**

**Explanation:** Names such as .notice or .warning-message describe purpose more durably than a color or position that may change.

### 6. Why are classes commonly preferred over IDs for reusable component styles?

- A. IDs cannot be used in CSS
- B. Classes are reusable and usually easier to override
- C. Classes have higher specificity
- D. IDs only work in external stylesheets

**Answer: B. Classes are reusable and usually easier to override.**

**Explanation:** An ID is unique in a document and its selector has higher specificity than a class selector. Classes are generally a more flexible styling hook.

### 7. What is a likely problem with a selector such as main section article h2?

- A. It cannot select a heading
- B. It depends on a particular document nesting structure
- C. It only selects elements with an ID
- D. It automatically becomes a utility class

**Answer: B. It depends on a particular document nesting structure.**

**Explanation:** Moving the article or adding a wrapper may break the match. A component class can express the styling relationship more directly.

### 8. Which statement about BEM is correct?

- A. Browsers require BEM for class selectors
- B. BEM is an optional naming convention
- C. BEM prevents the cascade
- D. BEM replaces semantic HTML

**Answer: B. BEM is an optional naming convention.**

**Explanation:** CSS does not require a particular class naming method. The team should choose a clear convention and use it consistently.

### 9. What does a utility class usually provide?

- A. A small, single-purpose style
- B. The only valid way to style a component
- C. A full page layout
- D. An accessible name for an element

**Answer: A. A small, single-purpose style.**

**Explanation:** A utility might center text or visually hide content. A component class groups styles that belong to a reusable interface part.

### 10. In normal declarations, which layer wins when two declarations have the same origin and importance?

~~~
@layer base, components;

@layer base {
    .notice { color: navy; }
}

@layer components {
    .notice { color: maroon; }
}
~~~

- A. base
- B. components
- C. The first declaration always wins
- D. Neither declaration applies

**Answer: B. components.**

**Explanation:** The named order is declared as base then components. For normal declarations, later layers have precedence over earlier layers, subject to the rest of the cascade.

### 11. What normally happens to unlayered author styles compared with layered normal author styles?

- A. Unlayered normal styles take precedence over layered normal styles
- B. Unlayered styles are ignored
- C. Layered styles always lose to inline styles only
- D. The browser chooses randomly

**Answer: A. Unlayered normal styles take precedence over layered normal styles.**

**Explanation:** If a project uses layers, keep project styles consistently in the intended layers so unlayered rules do not produce unexpected overrides.

### 12. What important detail applies to important declarations in cascade layers?

- A. Their layer order is reversed
- B. They do not participate in the cascade
- C. Their specificity becomes zero
- D. They always lose to normal declarations

**Answer: A. Their layer order is reversed.**

**Explanation:** Important declarations reverse the layer precedence order. This is one reason not to use !important as a routine override mechanism.

### 13. Which selector styles the current page link using an existing accessibility state?

- A. .link--blue
- B. a[aria-current="page"]
- C. #page-link-only
- D. nav main a.active:hover:focus

**Answer: B. a[aria-current="page"].**

**Explanation:** Styling a state from an accurate attribute keeps the visual treatment connected to the state exposed in the markup.

### 14. What is a reasonable use for a CSS custom property?

- A. Naming and reusing a design value such as a shared accent color
- B. Replacing every CSS selector
- C. Making a rule automatically more specific
- D. Preventing a property from inheriting

**Answer: A. Naming and reusing a design value such as a shared accent color.**

**Explanation:** A custom property can give a repeated design value a meaningful name and let it be updated in one place.

## Short-answer questions

### 15. What kinds of decisions can CSS architecture cover?

**Answer:** It can cover naming, selector scope, how rules are grouped, where files live, how components and utilities are used, and how the cascade is managed.

**Explanation:** Architecture describes how a project keeps styles understandable and predictable. It is broader than a folder structure.

### 16. How should you choose between a component class and a utility class?

**Answer:** Use a component class for styles that belong together as an interface part. Use a utility for a small, reusable, single-purpose adjustment.

**Explanation:** A card's layout and parts usually belong to a component. A shared text alignment helper can be a utility.

### 17. Why should a BEM modifier usually appear alongside the base class?

**Answer:** The base class supplies the component's normal styles, while the modifier adds the variation.

~~~
<article class="article-card article-card--featured">
~~~

**Explanation:** If the modifier is used alone, it may not receive the component's default layout, spacing, or typography.

### 18. Why should global element selectors be used mainly for defaults?

**Answer:** A global rule affects every matching element, including content that may need different styling.

**Explanation:** Broad rules are appropriate for truly shared defaults. Component-specific styling is safer behind a component class or narrow scope.

### 19. What makes a class name durable?

**Answer:** It describes an element's role or purpose rather than a temporary color, size, position, or implementation detail.

**Explanation:** A class such as .site-header can remain accurate after a visual redesign.

### 20. Why does file splitting not automatically make CSS modular?

**Answer:** Rules from different files still participate in the same cascade, and a file can still contain broad selectors that affect unrelated parts of the page.

**Explanation:** Modularity also depends on scope, dependencies, naming, and predictable loading order.

### 21. When might cascade layers be useful?

**Answer:** They can make precedence explicit when a project has several groups of CSS, such as resets, base styles, components, and utilities.

**Explanation:** For a small stylesheet, clear sections and source order may be enough. Layers add value when they solve a real ordering problem.

### 22. What should you check before adding !important to fix a style conflict?

**Answer:** Check the selector's scope and specificity, the source order, and the layer where each rule is declared.

**Explanation:** The conflict may be caused by an unintended global rule or a rule in the wrong layer. Repeated important overrides obscure the source of the problem.

### 23. How can accessible state and visual state stay consistent?

**Answer:** Use the relevant semantic attribute as the state source when one exists, and update that attribute when the interaction state changes.

**Explanation:** For example, a disclosure control's aria-expanded value and its visible open state should agree.

### 24. How should you decide whether to create a custom property for a value?

**Answer:** Create one when the value is repeated or represents a design token that should be centrally adjustable. A one-off value can remain local.

**Explanation:** Tokens help reveal shared design decisions, but creating tokens for every unique value adds unnecessary indirection.

## Applied questions

### 25. A component is named .blue-panel, but the design may change to green. What would be a better name and why?

**Answer:** Use a purpose-based name such as .notice, .profile-panel, or .help-panel, depending on its role.

**Explanation:** The component name remains accurate when its color changes. If blue itself communicates a meaningful status, a state name such as .notice--info may be appropriate.

### 26. Refactor this selector so the component can be moved in the document without losing its title style.

~~~
main .content article h2 {}
~~~

**Answer:**

~~~
.article-card__title {}
~~~

The HTML can identify the component and title directly:

~~~
<article class="article-card">
  <h2 class="article-card__title">Title</h2>
</article>
~~~

**Explanation:** The selector no longer depends on the article's exact ancestors.

### 27. A card has normal and compact versions. Show markup that keeps the base styles and applies the compact variation.

**Answer:**

~~~
<article class="article-card article-card--compact">
  <h2 class="article-card__title">Updates</h2>
</article>
~~~

**Explanation:** The base class remains present, and the modifier adds only the compact behavior.

### 28. A navigation link is the current page. How can CSS style it without inventing a separate state that may disagree with accessibility information?

**Answer:**

~~~
<a class="site-nav__link" href="/news" aria-current="page">News</a>
~~~

~~~
.site-nav__link[aria-current="page"] {
    font-weight: 700;
}
~~~

**Explanation:** The same attribute communicates the current-page state and provides a styling hook.

### 29. The same accent color appears in buttons, links, and focus outlines. What change would make updates easier?

**Answer:** Define a shared custom property and use it in each relevant declaration.

~~~
:root {
    --color-accent: #155eef;
}

.button {
    background: var(--color-accent);
}

a {
    color: var(--color-accent);
}
~~~

**Explanation:** The value now has a clear role and can be adjusted centrally. Check contrast after changing it.

### 30. A stylesheet contains this routine override. What would you investigate before keeping it?

~~~
.button {
    background: blue !important;
}
~~~

**Answer:** Find competing rules, inspect selector specificity and source order, check cascade layers, and decide which component should own the background.

**Explanation:** If an external constraint truly requires an important declaration, document that reason. Otherwise, fix the underlying scope or ordering conflict.

### 31. A small one-page site has one stylesheet. Should it be split into many folders and files immediately?

**Answer:** No. Keep a readable single file with clear sections until splitting improves navigation or collaboration.

**Explanation:** Architecture should reduce maintenance effort. A larger project with distinct components or team ownership may benefit from more files.

### 32. A button is styled using only the class name .blue. What should be improved?

**Answer:** Use a semantic button element, a role-based class such as .button, and a modifier or state for a meaningful variant.

~~~
<button class="button button--primary" type="button">Save changes</button>
~~~

**Explanation:** The element provides native button semantics. The class describes the component and its visual variation.

### 33. A new wrapper element causes a heading to lose its styles. What does this suggest about the selector?

**Answer:** It may depend on an overly specific ancestor chain.

**Explanation:** A component class on the heading or its component can keep the styling relationship stable when markup is reorganized.

### 34. Two normal declarations in different named layers conflict. Which layer should you inspect first?

**Answer:** Check the order in which the layers were first declared, because that order determines precedence for normal declarations.

**Explanation:** Later named layers take precedence over earlier ones for normal declarations. Also check whether one rule is unlayered or important.

## Practice task

Create a small notice component with a base style, a warning variation, a title element, and an accessible state. Use the project's chosen naming convention consistently. Then explain where its CSS belongs and how another developer can find it.

**One possible answer:**

~~~
<aside class="notice notice--warning" aria-labelledby="notice-title">
  <h2 class="notice__title" id="notice-title">Before you continue</h2>
  <p>Save your work before closing this page.</p>
</aside>
~~~

~~~
.notice {
    padding: 1rem;
    border: 1px solid currentColor;
    border-radius: 0.5rem;
}

.notice--warning {
    color: #6b4600;
    background: #fff4cc;
}

.notice__title {
    margin-block: 0 0.5rem;
}
~~~

**Explanation:** The block owns the component, the element names the title, and the modifier indicates a meaningful variation. In a larger project, the rule could live in a notice component stylesheet. In a small project, it could live under a Components section.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [59 - Responsive typography and fluid sizing](../lessons/59-responsive-typography-and-fluid-sizing.md) | [Q&A](60-css-architecture-and-naming.md) | [Example](../examples/60-css-architecture-and-naming.md) | [61 - Resets and base styles](../lessons/61-resets-and-base-styles.md) |