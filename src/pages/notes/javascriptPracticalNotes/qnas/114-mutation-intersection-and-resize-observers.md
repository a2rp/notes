# 114 - Mutation, intersection, and resize observers - Q&A

These questions practice choosing an observer, configuring it, reading its entries, and cleaning it up.

## Multiple-choice questions

### 1. Which observer reports changes to a DOM subtree?

A. IntersectionObserver
B. MutationObserver
C. ResizeObserver
D. PerformanceObserver

**Answer: B. MutationObserver.**

**Explanation:** MutationObserver can report child-list, attribute, and character-data changes.

### 2. Which observer is the best fit for detecting when a target approaches a scrolling viewport?

A. MutationObserver
B. IntersectionObserver
C. ResizeObserver
D. A timer that polls every millisecond

**Answer: B. IntersectionObserver.**

**Explanation:** It reports when a target intersects a root or viewport and crosses configured thresholds. A positive rootMargin can trigger before the target enters the visible area.

### 3. Which observer reports changes to an element's box size?

A. MutationObserver
B. IntersectionObserver
C. ResizeObserver
D. EventSource

**Answer: C. ResizeObserver.**

**Explanation:** ResizeObserver reports changes to the observed content, border, or device-pixel content box.

### 4. What does the subtree option do in MutationObserver.observe()?

A. Observes descendants of the target as well as the target
B. Observes only CSS styles
C. Stops all callbacks
D. Changes the target's size

**Answer: A. Observes descendants of the target as well as the target.**

**Explanation:** Use subtree: true when changes inside nested descendants are relevant. A broader subtree can create more callback work.

### 5. Which mutation type reports child nodes being added or removed?

A. attributes
B. characterData
C. childList
D. layout

**Answer: C. childList.**

**Explanation:** childList reports changes to the child-node list of the observed target or descendants when subtree is enabled.

### 6. What is root: null for IntersectionObserver?

A. The document body only
B. The viewport
C. No intersection checks
D. The observed target itself

**Answer: B. The viewport.**

**Explanation:** If root is not provided or is null, the viewport is used as the root.

### 7. What does rootMargin change?

A. The dimensions of the target's CSS box
B. The root rectangle used to calculate intersection
C. The observer callback frequency to a fixed timer
D. The DOM tree

**Answer: B. The root rectangle used to calculate intersection.**

**Explanation:** It expands or shrinks the root rectangle. For example, a positive bottom margin can report a target before it reaches the visible viewport.

### 8. What range is valid for an IntersectionObserver threshold?

A. -1 through 1
B. 0 through 1
C. 0 through 100
D. Any string value

**Answer: B. 0 through 1.**

**Explanation:** Threshold values represent ratios of the target's intersection area. An array can specify multiple threshold ratios.

### 9. Which ResizeObserver box is observed by default?

A. content-box
B. border-box
C. margin-box
D. device-pixel-content-box

**Answer: A. content-box.**

**Explanation:** The default is the content box. An observe() option can request another supported box.

### 10. Which methods can stop observing?

A. MutationObserver.stop()
B. IntersectionObserver.unobserve() and disconnect()
C. ResizeObserver.pause()
D. All observers use removeEventListener()

**Answer: B. IntersectionObserver.unobserve() and disconnect().**

**Explanation:** Each observer API provides cleanup methods. unobserve() removes one target, while disconnect() stops observing all targets.

### 11. What does MutationObserver.takeRecords() return?

A. A list of queued MutationRecord objects
B. The current DOM as an HTML string
C. A list of all stylesheets
D. A Promise that resolves after resize

**Answer: A. A list of queued MutationRecord objects.**

**Explanation:** It retrieves queued mutation records. This can be useful if the application needs to process them before disconnecting.

### 12. Which is the better choice if code directly controls a button click and already knows when it will update a list?

A. Poll the list with a timer
B. Use a direct function or application event
C. Use ResizeObserver
D. Use IntersectionObserver

**Answer: B. Use a direct function or application event.**

**Explanation:** An observer is helpful when code needs to detect changes made elsewhere. When the application knows that it caused the change, a direct call is often clearer.

### 13. What does IntersectionObserverEntry.isIntersecting indicate?

A. Whether the target intersects the root
B. Whether the target's text changed
C. Whether the target has a CSS class
D. Whether the page is online

**Answer: A. Whether the target intersects the root.**

**Explanation:** Use it to distinguish intersecting entries. An observer also delivers an initial entry after a target is observed.

### 14. What can happen if a ResizeObserver callback keeps changing the observed element's size?

A. The browser may report a resize loop error and defer notifications.
B. The browser automatically rewrites the CSS permanently.
C. The observer becomes an IntersectionObserver.
D. The page always crashes immediately.

**Answer: A. The browser may report a resize loop error and defer notifications.**

**Explanation:** Changing the observed size can trigger another observation. Repeated feedback should be avoided by using stable size rules and checking whether a change is actually needed.

### 15. Which task is often better expressed with CSS than ResizeObserver JavaScript?

A. Make a component's layout change at a container width
B. Watch DOM changes made by another library
C. Detect a sentinel near a scroll viewport
D. Process a list of MutationRecord entries

**Answer: A. Make a component's layout change at a container width.**

**Explanation:** CSS container queries or media queries can express many visual layout rules without JavaScript callbacks.

## True or false

### 16. One MutationObserver callback always corresponds to one DOM operation.

**Answer: False.**

**Explanation:** Mutations are queued and delivered asynchronously. One callback can receive several records.

### 17. MutationObserver reports computed style changes whenever the layout changes.

**Answer: False.**

**Explanation:** It reports selected DOM mutations, not general style or layout changes. Use ResizeObserver for element size changes.

### 18. IntersectionObserver can deliver an initial entry that says the target is not intersecting.

**Answer: True.**

**Explanation:** The observer reports the target's initial state after it is observed, as well as later threshold changes.

### 19. An IntersectionObserver threshold of 1 can be reached by any target regardless of its size relative to the root.

**Answer: False.**

**Explanation:** A ratio of 1 means the entire target area intersects. A target larger than the root may never reach that ratio.

### 20. ResizeObserver can be useful when a component's parent changes size without the window being resized.

**Answer: True.**

**Explanation:** ResizeObserver watches the element's box, so it can report size changes caused by grid, flexbox, sidebars, or other layout changes.

### 21. disconnect() stops an observer from watching all of its current targets.

**Answer: True.**

**Explanation:** It clears the observer's target list. Call observe() again to start observing later.

### 22. IntersectionObserver is a precise clock for scroll animations.

**Answer: False.**

**Explanation:** It reports intersection threshold changes asynchronously. It is not intended to deliver frame-by-frame animation timing.

## Short-answer questions

### 23. What is the difference between childList and characterData mutations?

**Answer:** childList reports child nodes being added or removed. characterData reports changes to a text node's data.

**Explanation:** Select only the mutation types the application needs to detect.

### 24. When would attributeFilter be useful?

**Answer:** When the observer only needs to respond to a small set of attributes, such as class and aria-expanded.

**Explanation:** It reduces irrelevant records and makes the observation's intent clearer.

### 25. What does IntersectionObserverEntry.intersectionRatio describe?

**Answer:** It is the ratio of the target's intersecting area to the target's area.

**Explanation:** It is a geometric ratio, not proof that a person actually saw or understood the target.

### 26. What is the difference between contentBoxSize and borderBoxSize?

**Answer:** contentBoxSize reports the content box dimensions. borderBoxSize reports the border box dimensions.

**Explanation:** Choose the box that matches the component behavior. The size values use logical inline and block dimensions.

### 27. Why should observers be disconnected when a component is removed?

**Answer:** Cleanup stops unnecessary callbacks and releases the observer's relationship to its targets.

**Explanation:** Component teardown should include observer cleanup, especially when a long-lived observer or callback references removed elements.

## Code questions

### 28. What mutation type is missing if the code should notice a newly appended list item?

~~~js
observer.observe(list, {
    subtree: true
});
~~~

**Answer: childList.**

~~~js
observer.observe(list, {
    childList: true,
    subtree: true
});
~~~

**Explanation:** Observation options must request a mutation type. childList watches additions and removals; subtree includes descendants.

### 29. What does this IntersectionObserver configuration use as its root?

~~~js
const observer = new IntersectionObserver(handleEntries, {
    root: null,
    rootMargin: "0px",
    threshold: 0
});
~~~

**Answer: The viewport.**

**Explanation:** A null root uses the viewport. A threshold of 0 reports when the target starts or stops intersecting.

### 30. What is the likely problem with this ResizeObserver callback?

~~~js
const observer = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    entries[0].target.style.width = width + 1 + "px";
});
~~~

**Answer:** Every callback increases the observed width, causing another resize and potentially a feedback loop.

**Explanation:** Avoid changing the observed size on every callback. Use CSS for layout rules or write a stable value only when it differs from the desired size.

### 31. How can the observer stop watching one target after the target becomes visible?

**Answer:**

~~~js
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            loadContent(entry.target);
            observer.unobserve(entry.target);
        }
    }
});
~~~

**Explanation:** unobserve() removes only that target. Other targets using the same observer continue to be watched.

### 32. What does takeRecords() do before disconnecting?

~~~js
const pending = observer.takeRecords();
observer.disconnect();
~~~

**Answer:** It returns any queued mutation records and then disconnect() stops observing all targets.

**Explanation:** If the application needs to process the queued records, it can inspect pending before disconnecting.

## Practical and design questions

### 33. A page needs to lazy-load content shortly before a section scrolls into view. Which observer and option are useful?

**Answer:** Use IntersectionObserver and a positive rootMargin near the direction of scrolling, such as a positive bottom margin.

**Explanation:** The expanded root rectangle makes the target intersect earlier. The callback can begin loading before the target becomes visible.

### 34. A third-party widget changes elements inside a container, and the application needs to detect new child nodes. Which observer settings are relevant?

**Answer:** Use MutationObserver with childList: true and subtree: true if descendants inside the container matter.

**Explanation:** Keep the observed subtree as small as possible and inspect addedNodes from each MutationRecord.

### 35. A card should use a compact layout when its own container becomes narrow, even if the window does not resize. Which approaches should be considered?

**Answer:** Prefer a CSS container query when the rule is purely visual. Use ResizeObserver when JavaScript behavior needs the measured size.

**Explanation:** A CSS rule avoids unnecessary JavaScript callbacks. ResizeObserver is useful when size affects behavior beyond styling.

### 36. A developer wants to report that a person read an article because its IntersectionObserver entry has isIntersecting set to true. Is that conclusion justified?

**Answer: No.**

**Explanation:** Intersection only describes geometric overlap with a root. It does not prove attention, comprehension, or even that the content was unobscured.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [113 - Service workers, offline behavior, and cache lifecycle](113-service-workers-offline-behavior-and-cache-lifecycle.md) | [Open lesson](../lessons/114-mutation-intersection-and-resize-observers.md) | [Open example](../examples/114-mutation-intersection-and-resize-observers.md) | [115 - Web Components, custom elements, and Shadow DOM](../lessons/115-web-components-custom-elements-and-shadow-dom.md) |
