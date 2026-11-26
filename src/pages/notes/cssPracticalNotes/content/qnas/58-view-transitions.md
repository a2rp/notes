# 58 - Styling view transitions - Q&A

Review the view transition lifecycle, CSS pseudo-elements, named captures, and motion preferences. Each answer appears immediately after its question, with an explanation where it helps.

## Multiple-choice questions

### 1. What do CSS view transition rules primarily control?

- A. The visual presentation and animation of captured states
- B. The application's data model
- C. The HTML document language
- D. The browser's navigation history

**Answer: A. The visual presentation and animation of captured states.**

**Explanation:** CSS styles the view transition pseudo-elements that represent the old and new visual states. Other code or browser navigation starts the transition.

### 2. What starts a same-document view transition around a DOM update?

- A. The CSS view-transition-name property
- B. document.startViewTransition()
- C. The ::view-transition-old() pseudo-element
- D. The @keyframes at-rule

**Answer: B. document.startViewTransition().**

**Explanation:** The method captures the visual states around a supplied update callback. CSS can then customize the visual transition.

### 3. What should an application do if document.startViewTransition is not available?

- A. Skip the content update
- B. Run the update directly without a transition
- C. Leave the old page visible
- D. Add a duplicate root view-transition name

**Answer: B. Run the update directly without a transition.**

**Explanation:** The transition should be an enhancement. The application must still update and show its content in browsers without the API.

### 4. What does the browser use as the default root transition name?

- A. document
- B. page
- C. root
- D. viewport

**Answer: C. root.**

**Explanation:** The root pseudo-elements can be targeted with selectors such as ::view-transition-old(root) and ::view-transition-new(root).

### 5. What does view-transition-name do?

- A. Tags an element so its visual capture can transition independently
- B. Sets the HTML title
- C. Starts an animation immediately on page load
- D. Changes an element's DOM ID

**Answer: A. Tags an element so its visual capture can transition independently.**

**Explanation:** The same conceptual item can use the same view transition name in the old and new states to create a matched visual pair.

### 6. What is an important rule for view-transition-name values in one captured state?

- A. The same name must appear on every element
- B. Each active name should identify at most one element
- C. Names must match the element's class
- D. Every name must begin with two hyphens

**Answer: B. Each active name should identify at most one element.**

**Explanation:** Duplicate active names make the pairing ambiguous and can cause the transition to be skipped or aborted.

### 7. What does view-transition-name: none do?

- A. Prevents an element from being captured independently under a named transition
- B. Removes the element from the DOM
- C. Stops the DOM update callback
- D. Disables every transition on the page

**Answer: A. Prevents an element from being captured independently under a named transition.**

**Explanation:** The element can remain part of the root page capture while not receiving its own named capture.

### 8. Which pseudo-element represents the old visual capture for a name?

- A. ::view-transition-group(name)
- B. ::view-transition-old(name)
- C. ::view-transition-new(name)
- D. ::view-transition-image-pair(name)

**Answer: B. ::view-transition-old(name).**

**Explanation:** The old pseudo-element represents the captured appearance before the update. The new pseudo-element represents the new appearance.

### 9. Which pseudo-element can be used to style the combined group for a named capture?

- A. ::view-transition-group(name)
- B. ::view-transition-old(name)
- C. ::view-transition-new(name)
- D. ::view-transition-root(name)

**Answer: A. ::view-transition-group(name).**

**Explanation:** The group organizes the transition for a name and can be styled for its movement, size, and animation timing.

### 10. Where are view transition pseudo-elements selected from?

- A. The original element's ID
- B. The document root
- C. The browser toolbar
- D. The new element only

**Answer: B. The document root.**

**Explanation:** The pseudo-element tree is generated for the transition and is not inserted as ordinary HTML children of the original element.

### 11. What does view-transition-class provide in supporting implementations?

- A. A shared styling label for multiple view transition pseudo-elements
- B. A replacement for every unique view-transition-name
- C. A way to trigger document navigation
- D. An HTML class on the pseudo-element in the DOM

**Answer: A. A shared styling label for multiple view transition pseudo-elements.**

**Explanation:** A class can share CSS rules while each independently transitioning element keeps an appropriate unique name.

### 12. How can CSS respond to a reduced-motion preference?

- A. With @media (prefers-reduced-motion: reduce)
- B. With @media (motion: none)
- C. With :reduce-motion
- D. With view-transition-name: reduced

**Answer: A. With @media (prefers-reduced-motion: reduce).**

**Explanation:** This media feature lets the stylesheet reduce or remove animation for users who request reduced motion.

### 13. What does @view-transition { navigation: auto; } opt into?

- A. Cross-document view transitions for supported navigations
- B. Same-document JavaScript updates only
- C. Scroll snapping
- D. Automatic navigation links

**Answer: A. Cross-document view transitions for supported navigations.**

**Explanation:** It opts a document into browser navigation transitions where supported. Both the source and destination documents must participate.

### 14. Which statement about the old capture of a video is correct?

- A. It is a live video element that always keeps playing
- B. It is a captured visual and may appear frozen
- C. It is converted into an audio track
- D. It cannot be styled

**Answer: B. It is a captured visual and may appear frozen.**

**Explanation:** The old view is a snapshot, not the original live video. Consider whether animating that media capture is useful.

### 15. Does view-transition-name create an accessible relationship or open a menu?

- A. Yes, it automatically creates both
- B. No, it provides visual transition identity only
- C. It creates an ARIA label but not interaction
- D. It moves keyboard focus to the element

**Answer: B. No, it provides visual transition identity only.**

**Explanation:** CSS transition names do not provide semantics or interaction. HTML and application behavior still define those.

### 16. What is the main use of @supports around newer view transition CSS?

- A. Apply the CSS enhancement only when the browser recognizes the declarations
- B. Add a JavaScript polyfill
- C. Force all browsers to animate
- D. Replace the reduced-motion setting

**Answer: A. Apply the CSS enhancement only when the browser recognizes the declarations.**

**Explanation:** A feature query guards syntax. It does not add support to a browser that lacks the feature.

## Short-answer questions

### 17. Describe the basic order of a same-document view transition.

**Answer:** The browser captures the old visual state, runs the update callback, captures the new visual state, and presents the transition between those captures.

**Explanation:** The document changes through the callback. The visual transition is represented separately by the transition pseudo-elements.

### 18. What is the difference between the old and new pseudo-elements?

**Answer:** The old pseudo-element shows the captured appearance before the update; the new pseudo-element shows the appearance after the update.

**Explanation:** They can have separate animations, such as fading the old image out while fading the new image in.

### 19. When should an element receive a unique view-transition-name?

**Answer:** When it should be captured and animated independently from the root or other named elements.

**Explanation:** A name pairs the same conceptual visual item between states. Use a different unique name for a different item in the same state.

### 20. What is the difference between view-transition-name and view-transition-class?

**Answer:** A name identifies a specific transition capture. A class groups pseudo-elements for shared styling.

**Explanation:** A class does not make duplicate names safe or provide unique identities.

### 21. What do the view transition pseudo-elements change in the document?

**Answer:** They provide a visual layer for the transition but do not change the document's HTML structure.

**Explanation:** They are generated pseudo-elements and are not normal content nodes or semantic replacements for the updated page.

### 22. Why should the application have a direct-update fallback?

**Answer:** The API may not be supported or may not run in a particular context, and users still need the updated content.

**Explanation:** View transitions should improve presentation without becoming a requirement for navigation or state changes.

### 23. What must be true for a cross-document transition between two pages?

**Answer:** Both pages need to opt in, and the browser must support the relevant navigation transition behavior.

**Explanation:** Cross-document transitions depend on participation by both documents and are distinct from wrapping a same-document update callback.

### 24. Why is prefers-reduced-motion relevant to view transitions?

**Answer:** It lets the page reduce or remove animation for users who request less motion.

**Explanation:** A view transition can include large changes in position or size. Respecting the preference helps avoid unnecessary motion.

## Applied questions

### 25. Write a JavaScript function that updates the UI with a view transition when available and directly otherwise.

**Answer:**

~~~
function updatePage(nextPage) {
    const update = () => renderPage(nextPage);

    if (typeof document.startViewTransition === "function") {
        document.startViewTransition(update);
    } else {
        update();
    }
}
~~~

**Explanation:** The callback performs the same update in either case. The API adds a visual transition when the browser supports it.

### 26. Write CSS that gives an image a unique transition name.

**Answer:**

~~~
.product-image {
    view-transition-name: product-image;
}
~~~

**Explanation:** Use this name for the corresponding image in the old and new states. Do not assign it to multiple active elements in the same state.

### 27. Fade the old root capture out and the new root capture in.

**Answer:**

~~~
@keyframes fade-out {
    to {
        opacity: 0;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
}

:root::view-transition-old(root) {
    animation: 180ms ease-out both fade-out;
}

:root::view-transition-new(root) {
    animation: 240ms ease-in both fade-in;
}
~~~

**Explanation:** The named root pseudo-elements can use separate keyframes and durations for the two captures.

### 28. Set a 400 millisecond duration for the transition group named product-image.

**Answer:**

~~~
:root::view-transition-group(product-image) {
    animation-duration: 400ms;
}
~~~

**Explanation:** The group covers the named transition's geometry and can receive shared timing styles.

### 29. Show a reduced-motion rule that minimizes the root transition duration.

**Answer:**

~~~
@media (prefers-reduced-motion: reduce) {
    :root::view-transition-group(root),
    :root::view-transition-old(root),
    :root::view-transition-new(root) {
        animation-duration: 1ms;
    }
}
~~~

**Explanation:** The transition becomes very short for users who request reduced motion. An application can also choose to remove nonessential animation altogether.

### 30. Write CSS to opt a document into automatic cross-document navigation transitions.

**Answer:**

~~~
@view-transition {
    navigation: auto;
}
~~~

**Explanation:** Add the opt-in to both participating pages and verify that the required navigation type is supported.

### 31. Guard a named element transition with a feature query.

**Answer:**

~~~
@supports (view-transition-name: none) {
    .profile-photo {
        view-transition-name: profile-photo;
    }
}
~~~

**Explanation:** The named capture is applied only when the browser recognizes the property and value. The page should still work without it.

### 32. Two cards use the same active transition name, card. What should you change?

**Answer:** Give each independently transitioning card a unique view-transition-name, or avoid giving them separate names if they should not transition independently.

**Explanation:** A shared styling class can group styles, but two elements in one captured state should not compete for the same transition name.

### 33. A video appears frozen in the old transition image. Why can this happen, and what should you consider?

**Answer:** The old state is a captured visual snapshot, so the video frame does not keep playing inside that snapshot. Consider whether the video needs to participate in the transition at all.

**Explanation:** The new state may contain the live video while the old state is only an image capture. Avoid custom effects that make essential media confusing.

### 34. A transition pseudo-element selector is written as #hero::view-transition-new(hero), but it does not match. What is the correct selector pattern?

**Answer:**

~~~
:root::view-transition-new(hero) {
    animation: 240ms ease-in both fade-in;
}
~~~

**Explanation:** The view transition pseudo-element tree is selected from the document root. The original element's ID is not the pseudo-element's parent.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [57 - Anchor positioning](../lessons/57-anchor-positioning.md) | [Q&A](58-view-transitions.md) | [Example](../examples/58-view-transitions.md) | [59 - Responsive typography and fluid sizing](../lessons/59-responsive-typography-and-fluid-sizing.md) |