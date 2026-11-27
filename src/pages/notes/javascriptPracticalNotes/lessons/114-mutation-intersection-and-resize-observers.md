# 114 - Mutation, intersection, and resize observers

Observers let a page react to browser-managed changes without repeatedly checking for them. JavaScript has different observer APIs for different kinds of changes:

- **MutationObserver** reports changes to a DOM subtree.
- **IntersectionObserver** reports when a target intersects a root or viewport.
- **ResizeObserver** reports when an element's box size changes.

Choose the observer that matches the change you care about. A DOM edit, viewport intersection, and element resize are separate signals.

## Learning goals

By the end of this chapter, you should be able to:

- Observe DOM child, attribute, and text changes with MutationObserver.
- Observe visibility intersections with IntersectionObserver.
- Configure roots, margins, and thresholds.
- Observe element sizes with ResizeObserver.
- Clean up observers with disconnect() or unobserve().
- Avoid feedback loops and unnecessary broad observations.
- Decide when CSS or a direct event listener is a better fit.

## 1. MutationObserver

A MutationObserver reports changes to a DOM node or subtree. It is useful when code needs to react to DOM changes made by another script, a custom widget, or a component integration.

Create an observer with a callback, then call observe() with the target and the mutation types to watch:

~~~js
const list = document.querySelector("#items");

const observer = new MutationObserver((records) => {
    for (const record of records) {
        console.log(record.type, record.addedNodes, record.removedNodes);
    }
});

observer.observe(list, {
    childList: true,
    subtree: true
});
~~~

The callback receives a list of MutationRecord objects. A record can describe:

- **childList** - child nodes were added or removed.
- **attributes** - an attribute value changed.
- **characterData** - a text node's data changed.

Observe only the types of changes the code needs. For example, to watch selected attributes and keep their old values:

~~~js
observer.observe(document.querySelector("#profile"), {
    attributes: true,
    attributeFilter: ["class", "aria-expanded"],
    attributeOldValue: true
});
~~~

To watch text-node changes:

~~~js
observer.observe(document.querySelector("#message"), {
    characterData: true,
    subtree: true
});
~~~

Observation options must request at least one mutation type. Attribute and character data old values can be requested when their corresponding type is observed.

### Mutation callbacks happen after changes

Mutation records are queued and delivered asynchronously. Several changes may be reported together. Do not assume that one callback corresponds to exactly one DOM operation.

A MutationObserver is not a replacement for direct event listeners. If the code that changes an element is under your control, calling a function or dispatching an application event is often clearer than watching the resulting DOM change.

MutationObserver also does not report computed style changes, layout changes, or a box resizing just because of CSS. Use ResizeObserver for size changes.

### Stop or pause observation

Use **disconnect()** to stop observing every target:

~~~js
observer.disconnect();
~~~

Use **takeRecords()** to retrieve any queued records before disconnecting, if the application needs to process them:

~~~js
const pendingRecords = observer.takeRecords();
observer.disconnect();
~~~

Call **observe()** again if the same observer should start watching a target later.

## 2. IntersectionObserver

An IntersectionObserver reports when a target's intersection with a root changes enough to cross a configured threshold. If root is null, the viewport is used. Otherwise, root can be an ancestor element that acts as a scrolling or clipping area.

~~~js
const target = document.querySelector("#sentinel");

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log("Sentinel entered the root.");
        }
    }
});

observer.observe(target);
~~~

An IntersectionObserverEntry provides information such as:

- **target** - the observed element.
- **isIntersecting** - whether the target intersects the root.
- **intersectionRatio** - the proportion of the target's area that intersects.
- **boundingClientRect** - the target's rectangle.
- **rootBounds** - the root's rectangle, when available.
- **intersectionRect** - the intersecting rectangle.

The callback is asynchronous. An initial entry is delivered after observing a target, even when the target is not intersecting. Use **isIntersecting** and the entry's values rather than assuming every callback means that a target just entered the viewport.

### Root, rootMargin, and threshold

Pass options to the constructor:

~~~js
const observer = new IntersectionObserver(handleEntries, {
    root: document.querySelector("#scroll-panel"),
    rootMargin: "0px 0px 100px 0px",
    threshold: 0.25
});
~~~

- **root** - the viewport or a scrolling ancestor.
- **rootMargin** - expands or shrinks the root rectangle before intersection is calculated.
- **threshold** - a number from 0 to 1, or an array of such numbers, describing intersection ratio thresholds.

A threshold of 0 is useful for detecting when a target starts to intersect. A threshold of 1 asks for a fully intersecting target before that threshold is crossed. Thresholds are not a precise timer or a guarantee that a person actually saw or understood content.

A positive bottom rootMargin can let the page load content shortly before the target becomes visible. This is useful for lazy loading and infinite scrolling.

### Unobserve targets

Stop observing one target with **unobserve()** or all targets with **disconnect()**:

~~~js
observer.unobserve(target);
observer.disconnect();
~~~

For a one-time action, unobserve after the target enters. For example, after loading an image or appending the next page of content, the code can stop observing a sentinel until it has been repositioned.

IntersectionObserver is not designed for exact pixel-by-pixel scroll animation or guaranteed advertising view-time measurement. Use CSS scroll-driven effects or a suitable scroll-related approach for those needs.

## 3. ResizeObserver

A ResizeObserver reports changes to an element's observed box size. It is useful when a component needs to respond to its own available space, which may change because of a parent layout, a sidebar, a grid, or a window resize.

~~~js
const panel = document.querySelector("#panel");

const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
        console.log(entry.contentRect.width, entry.contentRect.height);
    }
});

observer.observe(panel);
~~~

A ResizeObserverEntry describes the target and its size. Modern entries expose logical **inlineSize** and **blockSize** values in **contentBoxSize** or **borderBoxSize**. The **contentRect** property is also available for compatibility and returns physical width and height.

The default observed box is the content box. You can select a different box when observing:

~~~js
observer.observe(panel, { box: "border-box" });
~~~

The supported options are **content-box**, **border-box**, and **device-pixel-content-box**. The device-pixel box reports content dimensions in device pixels and may be more expensive to observe.

Use logical inline and block dimensions when code should work across writing modes:

~~~js
const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const size = entry.contentBoxSize[0];
        console.log(size.inlineSize, size.blockSize);
    }
});
~~~

A box size property is a sequence because elements can have multiple fragments, such as in multi-column layout. Code should account for that shape instead of assuming a single number.

### Avoid resize feedback loops

A ResizeObserver callback can change the size of an element that it observes. That change may cause another notification. If callbacks keep changing sizes in response to their own effects, the browser can report a ResizeObserver loop error and defer some notifications.

Prefer CSS for layout rules that can be expressed with media or container queries. If JavaScript must change size in response to an observation, compare the current size with the desired size and avoid writing the same value repeatedly.

~~~js
const box = document.querySelector("#box");

const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry.contentBoxSize[0].inlineSize;

    box.classList.toggle("compact", width < 280);
});
~~~

If the class itself changes the observed width back and forth around the threshold, the code can oscillate. Make the style change stable, use sensible thresholds, or redesign the rule in CSS.

Disconnect when the component is removed or no longer needs size notifications:

~~~js
observer.disconnect();
~~~

## 4. Compare the observers

| Observer | What it reports | Common uses |
| --- | --- | --- |
| MutationObserver | DOM tree, attributes, or text changed | Integrating with DOM changed by another system |
| IntersectionObserver | Target crosses intersection thresholds | Lazy loading, reveal-on-view, scroll sentinels |
| ResizeObserver | Target box size changed | Responsive components, canvas sizing |

These APIs do not replace one another. If a component needs both visibility and size information, it may need both observers. Observe only the required targets and stop observation when their lifecycle ends.

## 5. Performance and design

Observers avoid polling loops such as checking an element's position every few milliseconds. They do not make unlimited observation free. Watching a large subtree, many targets, or changing layout on every callback can still create work.

- Observe the smallest DOM subtree that satisfies the requirement.
- Use **attributeFilter** when only a few attributes matter.
- Reuse an observer for targets that share the same options.
- Remove targets that are no longer relevant.
- Keep callbacks short and avoid repeated layout reads and writes.
- Prefer CSS for visual layout behavior when CSS can express the rule.
- Use a direct event or application callback when the code already knows a change occurred.

## Common mistakes

- Using MutationObserver to detect an element's size or computed style.
- Observing the entire document when only one component matters.
- Assuming one mutation callback corresponds to exactly one DOM change.
- Forgetting that IntersectionObserver delivers an initial entry after observation.
- Treating intersection as proof that a person saw or read the target.
- Using IntersectionObserver as a precise animation clock.
- Treating contentRect width and height as logical inline and block dimensions.
- Changing an observed element's size on every ResizeObserver callback.
- Forgetting to unobserve removed targets or disconnect a component's observers.
- Polling with timers when a suitable observer already exists.

## Key points

- MutationObserver reports selected DOM mutations.
- IntersectionObserver reports threshold crossings between a target and a root.
- ResizeObserver reports changes to an element's observed box size.
- Each callback can receive entries for multiple observed targets.
- Use observe(), unobserve(), disconnect(), and takeRecords() according to the observer lifecycle.
- Keep callbacks short and avoid feedback loops.
- CSS and direct application events are often simpler when they already express the needed behavior.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [113 - Service workers, offline behavior, and cache lifecycle](113-service-workers-offline-behavior-and-cache-lifecycle.md) | [Open Q&A](../qnas/114-mutation-intersection-and-resize-observers.md) | [Open example](../examples/114-mutation-intersection-and-resize-observers.md) | [115 - Web Components, custom elements, and Shadow DOM](115-web-components-custom-elements-and-shadow-dom.md) |