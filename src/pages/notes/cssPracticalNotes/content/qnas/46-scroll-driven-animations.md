# 46 - Scroll-driven animations - Q&A

Review scroll progress timelines, view progress timelines, timeline ranges, named timelines, fallbacks, and motion preferences. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. What drives the progress of a scroll-driven animation?

- A. Elapsed clock time only
- B. A scroll position or an element's progress through a scrollport
- C. The number of CSS rules in a stylesheet
- D. The visitor's pointer speed

**Answer: B. A scroll position or an element's progress through a scrollport.**

**Explanation:** A scroll-driven timeline maps scroll progress to animation progress. Scrolling backward can move the animation backward too.

### 2. What does a scroll progress timeline follow?

- A. A scroll container from its starting to ending scroll position
- B. Only the time spent on a page
- C. The pointer's position over a button
- D. The animation's number of keyframes

**Answer: A. A scroll container from its starting to ending scroll position.**

**Explanation:** Its progress is 0% at the start of the scrollable range and 100% at its end.

### 3. What does a view progress timeline follow?

- A. The visibility of a particular element as it passes through a scrollport
- B. The browser window's resize events
- C. A CSS color value
- D. The duration of a video

**Answer: A. The visibility of a particular element as it passes through a scrollport.**

**Explanation:** It links progress to the element entering, crossing, and leaving the relevant scrollport.

### 4. Which function creates an anonymous scroll progress timeline?

- A. `scroll()`
- B. `view()`
- C. `timeline()`
- D. `progress()`

**Answer: A. `scroll()`.**

**Explanation:** Use `animation-timeline: scroll()` to follow the nearest ancestor scroll container by default, or provide a scroller and axis.

### 5. Which function creates an anonymous view progress timeline?

- A. `scroll()`
- B. `view()`
- C. `watch()`
- D. `visible()`

**Answer: B. `view()`.**

**Explanation:** `view()` follows the subject element's passage through the nearest ancestor scrollport.

### 6. What does `scroll(root block)` select?

- A. The document viewport's block-axis scroll progress
- B. The nearest horizontal scrollbar
- C. The element's own height
- D. A clock-based animation

**Answer: A. The document viewport's block-axis scroll progress.**

**Explanation:** `root` selects the document viewport as the scroller. `block` selects progress along its block axis.

### 7. What does `animation-range` control?

- A. The part of the timeline during which the animation progresses
- B. The width of the element's margin
- C. The number of CSS animations on a page
- D. Whether an element can receive focus

**Answer: A. The part of the timeline during which the animation progresses.**

**Explanation:** It can restrict the animation to a named portion such as `entry`, `exit`, or `cover` of a view timeline.

### 8. What does the named range `cover` refer to for a view progress timeline?

- A. The full range from the subject entering until it leaves the scrollport
- B. Only the time before the subject enters the scrollport
- C. The area hidden by a CSS cover
- D. The width of the scroll container

**Answer: A. The full range from the subject entering until it leaves the scrollport.**

**Explanation:** `cover` spans the subject's full passage through the view progress visibility range.

### 9. Why should `animation-timeline` come after the `animation` shorthand?

- A. The shorthand resets the timeline to its default value
- B. The timeline must be the first CSS property in the stylesheet
- C. The shorthand deletes all keyframes
- D. The timeline only works on links

**Answer: A. The shorthand resets the timeline to its default value.**

**Explanation:** If a shorthand is declared afterward, it can reset `animation-timeline` to `auto`. Put the timeline declaration after the shorthand.

### 10. What does `animation-duration: auto` do for a scroll-driven animation?

- A. Lets the animation use its available timeline range
- B. Makes it run for exactly one second
- C. Repeats it forever
- D. Disables its keyframes

**Answer: A. Lets the animation use its available timeline range.**

**Explanation:** Scroll-driven animation progress is distance-based. `auto` is commonly used so the effect fills the applicable timeline range.

### 11. What happens if a scroll progress timeline has no scrollable range?

- A. Its timeline is inactive
- B. The browser invents a scroll offset
- C. The animation becomes a transition
- D. The page automatically gains a scrollbar

**Answer: A. Its timeline is inactive.**

**Explanation:** If there is no scroll range between the start and end positions, the timeline has no progress to provide.

### 12. What should a page do if scroll-driven animation is not supported?

- A. Keep important content visible in normal styles and treat the animation as an enhancement
- B. Hide all content until the animation starts
- C. Require the visitor to enable JavaScript to read the page
- D. Replace the page with a blank screen

**Answer: A. Keep important content visible in normal styles and treat the animation as an enhancement.**

**Explanation:** A base style and feature query allow the content to remain readable when the browser does not support the timeline feature.

## Short-answer questions

### 13. Explain the difference between a scroll-driven animation and a scroll-triggered animation.

**Answer:** In a scroll-driven animation, scroll progress controls how far through the effect it is. A scroll-triggered animation starts at a scroll position but then progresses by time.

**Explanation:** The defining feature of a scroll-driven animation is that its timeline is linked to scroll progress rather than to a clock.

### 14. What is the default axis for `scroll()` and `view()`?

**Answer:** The default is the block axis.

**Explanation:** In common horizontal writing modes, the block axis is vertical. Explicit values such as `x`, `y`, `inline`, or `block` can select the needed axis.

### 15. What are `entry`, `contain`, `exit`, and `cover`?

**Answer:** They are named ranges describing parts of an element's view progress through a scrollport. `entry` is entering, `contain` is fully inside when its size permits, `exit` is leaving, and `cover` is the full passage.

**Explanation:** These names can be used with `animation-range` to choose which part of the view timeline drives the keyframes.

### 16. Why might the `contain` range be empty for a tall element?

**Answer:** The element may be taller than the scrollport, so it is never fully contained inside it.

**Explanation:** `contain` describes the portion where the subject fits completely within the view range. An oversized subject has no such interval.

### 17. What does `timeline-scope` help with?

**Answer:** It can widen the scope of a named timeline so elements outside the defining element's descendant tree, such as siblings, can reference it.

**Explanation:** Named timelines are normally referenceable by the element declaring them and its descendants. `timeline-scope` can make a name visible from a shared ancestor.

### 18. Why does `animation-delay` not act as a scroll offset?

**Answer:** Scroll-driven animations are based on distance along a timeline, not elapsed time. A time delay does not specify how far the visitor must scroll.

**Explanation:** Use `animation-range` to select a segment of the scroll or view timeline.

### 19. How should a reduced-motion rule affect scroll-driven effects?

**Answer:** It should remove or simplify non-essential movement while leaving the content visible and understandable.

**Explanation:** The page should not rely on scrolling motion to reveal essential text or controls.

## Applied questions

### 20. A reading bar should fill from the top of a page to the bottom. Which timeline type is suitable?

**Answer:** A scroll progress timeline for the root scroller, such as `scroll(root block)`.

**Explanation:** The bar should reflect total document scroll progress, not the visibility of one particular content element.

### 21. A card should fade in while it enters the viewport. Which timeline is suitable?

**Answer:** A view progress timeline, such as `view()`.

**Explanation:** The card's own movement through the scrollport should drive the effect.

### 22. An animation is defined on a child, but it should follow the visibility of its parent card. How can the parent provide a named timeline?

**Answer:** Give the parent a `view-timeline-name` and reference it from the child:

~~~css
.card {
  view-timeline-name: --card-view;
  view-timeline-axis: block;
}

.card__content {
  animation-timeline: --card-view;
}
~~~

**Explanation:** A named view timeline declared on the card can be referenced by its descendants. The child can then animate according to the card's view progress.

### 23. A scroll animation does not run on a panel. What should you check about the panel?

**Answer:** Check that the panel is actually a scroll container and has a scrollable range on the selected axis.

**Explanation:** A named timeline on a box that is not a scroll container is inactive. The panel also needs content or dimensions that allow scrolling.

### 24. Why should the base style keep a card visible before applying a view animation?

**Answer:** The timeline syntax might not be supported, or reduced motion might disable the animation. A visible base style prevents the card from remaining hidden.

**Explanation:** Scroll-driven motion should enhance a page, not gate access to its content.

## Coding questions

### 25. Write a keyframes animation that scales a reading bar from zero to full width and ties it to the document's vertical scroll progress.

**Answer:**

~~~css
@keyframes grow {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.reading-progress {
  transform-origin: left center;
  animation-name: grow;
  animation-duration: auto;
  animation-timing-function: linear;
  animation-timeline: scroll(root block);
}
~~~

**Explanation:** The root block-axis timeline follows the document viewport. The scale value follows its progress from the start to the end of the scroll range.

### 26. Write CSS that reveals a card using its view progress from entry to 40% of the cover range.

**Answer:**

~~~css
@keyframes reveal {
  from {
    opacity: 0.25;
    transform: translateY(2rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  opacity: 1;
  transform: none;
}

@supports (animation-timeline: view()) {
  .card {
    animation-name: reveal;
    animation-duration: auto;
    animation-fill-mode: both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
}
~~~

**Explanation:** The base styles leave the card visible if the feature is unsupported. The feature query attaches the animation to the card's view progress when supported.

### 27. Write a named block-axis scroll timeline on a scrollable panel and attach a child indicator to it.

**Answer:**

~~~css
.panel {
  overflow-y: auto;
  scroll-timeline-name: --panel-scroll;
  scroll-timeline-axis: block;
}

.indicator {
  animation-name: grow;
  animation-duration: auto;
  animation-timeline: --panel-scroll;
}
~~~

**Explanation:** The panel supplies a named timeline based on its block-axis scroll progress. A descendant can reference that timeline by name.

### 28. Write a reduced-motion rule that removes a scroll-driven reveal and restores visible content.

**Answer:**

~~~css
@media (prefers-reduced-motion: reduce) {
  .card {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
~~~

**Explanation:** The animation is removed for visitors who request less motion, and the card's content remains visible in a static state.

## Key takeaways

- A scroll progress timeline follows a scroller's position; a view progress timeline follows a subject through a scrollport.
- `scroll()` and `view()` attach an animation to anonymous timelines.
- Named timelines connect one element's scroll or view progress to another element.
- `animation-range` chooses the portion of a timeline used by an effect.
- `animation-timeline` should follow the `animation` shorthand.
- Keep content visible without the feature and honor reduced-motion preferences.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [45 - Animations and keyframes](../lessons/45-animations-and-keyframes.md) | [Q&A](46-scroll-driven-animations.md) | [Example](../examples/46-scroll-driven-animations.md) | [47 - Filters, blending, and opacity](../lessons/47-filters-blending-and-opacity.md) |