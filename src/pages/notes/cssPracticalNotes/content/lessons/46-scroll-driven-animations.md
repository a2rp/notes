# 46 - Scroll-driven animations

A scroll-driven animation links keyframe progress to scrolling instead of to elapsed clock time. It can follow the progress of a scroll container or the passage of an element through a scrollport. Unlike a scroll-triggered effect that starts on reaching a position and then runs by time, a scroll-driven animation moves forward or backward as the relevant scroll position changes.

## Learning outcomes

After this chapter, you should be able to:

- Distinguish scroll progress timelines from view progress timelines.
- Attach an animation to an anonymous timeline with `scroll()` or `view()`.
- Create and reference a named scroll or view timeline.
- Limit an effect to a timeline range with `animation-range`.
- Add a fallback and respect reduced-motion preferences.

## Scroll-driven animation basics

A regular CSS animation usually follows the document's clock. A scroll-driven animation uses a timeline whose progress is controlled by scroll position. It can reverse naturally when the visitor scrolls back.

There are two main timeline types:

1. A **scroll progress timeline** follows a scroll container from its starting scroll position to its ending scroll position.
2. A **view progress timeline** follows a particular element as it enters, crosses, and leaves a scrollport.

Both use CSS keyframes. The timeline determines how far through the animation those keyframes have progressed.

## Follow a scroll container with `scroll()`

The `scroll()` function creates an anonymous scroll progress timeline. With no arguments, it uses the nearest ancestor scroll container on the block axis. Use `root` to follow the document viewport explicitly:

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
  animation-fill-mode: both;
  animation-timeline: scroll(root block);
}
~~~

The scroll position at the beginning of the range represents 0% progress. The ending scroll position represents 100%. In this example, a thin bar grows as the document is scrolled vertically.

`scroll()` accepts a scroller and an axis. Common scroller values are `nearest`, `root`, and `self`. Common axes are `block`, `inline`, `x`, and `y`. The block axis is the default and usually means vertical scrolling in a horizontal writing mode.

The scroll container needs a scrollable range. If it has no overflow to scroll, its timeline is inactive and there is no progress to drive the animation.

## Follow an element with `view()`

The `view()` function creates an anonymous view progress timeline for the element's own passage through its nearest ancestor scrollport:

~~~css
@keyframes reveal-card {
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
  animation-name: reveal-card;
  animation-duration: auto;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
~~~

The animation progresses as the card enters and moves through the scrollport. The default axis is the block axis. An explicit axis or inset can be supplied, for example `view(block 10%)`, to adjust which scrollport range is used.

Use a view progress timeline when an element's own visibility should drive its effect. It is useful for revealing an article section as it enters view or progressing an item while it crosses the viewport.

## Timeline ranges

A view progress timeline has named ranges that describe different parts of an element's passage through a scrollport:

- `cover`: the full range from entering to leaving the scrollport.
- `entry`: the part where the element is entering.
- `contain`: the part where the element is fully inside the scrollport, when its size allows that.
- `exit`: the part where the element is leaving.

`animation-range` selects which portion of a timeline drives the animation:

~~~css
.card {
  animation-range: entry 0% cover 40%;
}
~~~

This starts at the beginning of entry and ends at 40% of the full cover range. Percentages can also be used without a named range to refer to a percentage of the whole timeline. Adjust ranges for the element size and scrollport. A very tall element may not fit fully inside the scrollport, so its `contain` range may be empty.

## Name a timeline

The `scroll()` and `view()` functions create anonymous timelines directly where they are used. Named timelines are useful when another element should use the scroll progress of a particular scroller or the view progress of a subject.

Name a scroll progress timeline on a scroll container:

~~~css
.article-list {
  overflow-y: auto;
  scroll-timeline-name: --article-scroll;
  scroll-timeline-axis: block;
}

.reading-progress {
  animation-name: grow;
  animation-duration: auto;
  animation-timing-function: linear;
  animation-timeline: --article-scroll;
}
~~~

Name a view progress timeline on the element whose visibility should drive the progress:

~~~css
.story-card {
  view-timeline-name: --story-card;
  view-timeline-axis: block;
}

.story-card__content {
  animation-name: reveal-card;
  animation-duration: auto;
  animation-timeline: --story-card;
  animation-range: entry 0% cover 40%;
}
~~~

A named timeline can be referenced by the element that declares it and by its descendants. If an unrelated sibling needs to reference that timeline, `timeline-scope` can widen its scope on an ancestor. Start with anonymous timelines when they express the effect clearly.

## Shorthand ordering

The `animation` shorthand resets animation sub-properties, including the timeline, to their defaults. If you use the shorthand and a scroll-driven timeline, declare `animation-timeline` after the shorthand:

~~~css
.card {
  animation: reveal-card linear both;
  animation-timeline: view();
}
~~~

If the shorthand is written later and resets the timeline to its default document clock, the scroll-driven behavior will be lost. The longhand examples above make the timeline and keyframe settings explicit.

Scroll-driven timelines are based on distance, not time. A time-based `animation-delay` does not create a scroll offset. `animation-duration: auto` lets the animation use its available timeline range; it is commonly used for this reason.

## Progressive enhancement

Scroll-driven animation features may not be available in every browser or version. Keep the page's meaning and essential content in normal styles. Add the scroll-driven effect only when the browser supports the timeline syntax:

~~~css
.story-card {
  opacity: 1;
  transform: none;
}

@supports (animation-timeline: view()) {
  .story-card {
    animation-name: reveal-card;
    animation-duration: auto;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
    animation-fill-mode: both;
  }
}
~~~

When the feature is unsupported, the base style remains visible and readable. Test the effect in the browsers your site supports, and do not make content available only through the animation.

## Accessibility and motion

Scroll-linked movement can be distracting or uncomfortable. Keep it subtle, avoid using it to convey information that is unavailable elsewhere, and respect a reduced-motion preference:

~~~css
@media (prefers-reduced-motion: reduce) {
  .reading-progress,
  .story-card {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
~~~

The content should still be visible if the animation is disabled. Make sure animated elements do not cover text or controls, and avoid large or rapid movement. Transform and opacity are useful for many visual effects because they do not change normal layout in the same way as animating dimensions, but the actual result still needs to be checked.

## Common mistakes

- Confusing scroll-driven progress with a time-based animation that merely starts after scrolling.
- Using `scroll()` when the effect should follow an element's visibility, or `view()` when it should follow a whole scroller.
- Attaching a scroll progress timeline to a container that has no scrollable range.
- Forgetting that `animation` shorthand can reset `animation-timeline`.
- Expecting `animation-delay` to correspond to a scroll offset.
- Hiding content in the base style so it stays hidden when the timeline feature is unsupported.
- Using large motion that distracts from or obscures content.
- Ignoring reduced-motion preferences.

## Try it yourself

1. Create a top reading bar driven by `scroll(root block)`.
2. Animate a card with `view()` as it enters the scrollport.
3. Compare the default full `cover` range with `animation-range: entry`.
4. Define a named view timeline on a card and use it to animate a child element.
5. Move a named scroll timeline from the root scroller to an `overflow-y: auto` panel.
6. Put the `animation` shorthand after `animation-timeline` and observe how the timeline resets.
7. Disable the effect under `prefers-reduced-motion` and confirm all content remains visible.

## Key points

- Scroll progress timelines follow a scroll container from 0% to 100% of its scrollable range.
- View progress timelines follow an element as it enters, crosses, and leaves a scrollport.
- `scroll()` and `view()` can attach an animation directly to anonymous timelines.
- Named scroll and view timelines can connect a subject to another element's animation.
- `animation-range` restricts the part of a timeline used by an animation.
- Set `animation-timeline` after the `animation` shorthand.
- Provide visible static styles, test browser support, and respect reduced-motion preferences.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [45 - Animations and keyframes](45-animations-and-keyframes.md) | [Q&A](../qnas/46-scroll-driven-animations.md) | [Example](../examples/46-scroll-driven-animations.md) | [47 - Filters, blending, and opacity](47-filters-blending-and-opacity.md) |