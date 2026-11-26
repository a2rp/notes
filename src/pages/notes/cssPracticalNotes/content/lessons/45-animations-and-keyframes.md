# 45 - Animations and keyframes

CSS animations let an element change through a sequence of styles over time. The `@keyframes` rule describes that sequence, and animation properties control its duration, repetition, direction, delay, and end state. Unlike a transition, an animation can start when its style is applied and can include several intermediate steps.

## Learning outcomes

After this chapter, you should be able to:

- Define animation steps with `@keyframes`.
- Apply an animation with `animation-name` and `animation-duration`.
- Control timing, delay, repetition, direction, and fill behavior.
- Pause and resume an animation with `animation-play-state`.
- Use the `animation` shorthand and multiple animations.
- Reduce or remove non-essential motion for visitors who prefer less motion.

## Define the keyframes

An `@keyframes` rule names an animation and describes property values at points in one cycle. The `from` and `to` keywords mean `0%` and `100%`:

~~~css
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
~~~

You can also use percentages to add intermediate steps:

~~~css
@keyframes travel {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(4rem);
  }

  100% {
    transform: translateX(8rem);
  }
}
~~~

The browser interpolates between keyframes when the property supports interpolation. If a property is missing at the beginning or end, its underlying style can supply that endpoint. Use explicit `from` and `to` values when they make the intended motion clearer.

Keyframes define one cycle. Animation properties determine how that cycle is played.

## Apply an animation

Use `animation-name` to connect an element to a matching keyframes name, and set a non-zero `animation-duration` to make the cycle visible:

~~~css
.message {
  animation-name: fade-in;
  animation-duration: 500ms;
}
~~~

If the name does not match a defined `@keyframes` rule, no named animation runs. The initial duration is `0s`, so a positive duration is usually required for a visible effect.

## Set timing and delay

`animation-timing-function` controls the pace between keyframes. Common values include `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(...)`, and `steps(...)`.

~~~css
.message {
  animation-timing-function: ease-out;
}
~~~

`animation-delay` waits before the animation begins:

~~~css
.message {
  animation-delay: 120ms;
}
~~~

A negative delay is valid and makes the animation appear to begin partway through its cycle. It is an advanced option. Avoid delays that make important information appear late.

## Repeat and change direction

`animation-iteration-count` sets how many cycles run. The default is `1`; `infinite` repeats continuously:

~~~css
.spinner {
  animation-iteration-count: infinite;
}
~~~

`animation-direction` determines how cycles play:

- `normal`: every cycle runs from the first keyframe to the last.
- `reverse`: each cycle runs from the last keyframe to the first.
- `alternate`: cycles alternate forward and backward.
- `alternate-reverse`: cycles alternate backward and forward.

~~~css
.pulse {
  animation-direction: alternate;
}
~~~

An alternating animation can return smoothly without an abrupt reset when it repeats. Repeating motion should have a clear purpose and should not distract from reading or controls.

## Decide what happens before and after

`animation-fill-mode` controls whether keyframe values affect the element outside the active cycle:

- `none`: the default. The animation does not keep its keyframe values before or after it runs.
- `forwards`: keeps the values from the final keyframe after the animation ends.
- `backwards`: applies the values from the first keyframe during the delay.
- `both`: applies the backwards and forwards behavior.

~~~css
.message {
  animation: fade-in 500ms ease-out 100ms both;
}
~~~

Here, `both` applies the initial keyframe during the delay and keeps the final keyframe after the animation completes. Without a fill mode, the element returns to the values from its normal styles after the animation ends.

Be deliberate with `forwards` and `both`. The animation may continue to determine a property's value after the active cycle, which can affect later style changes.

## Pause and resume

`animation-play-state` can pause an animation or let it run:

~~~css
.decorative-motion {
  animation-play-state: running;
}

.decorative-motion:hover,
.decorative-motion:focus-visible {
  animation-play-state: paused;
}
~~~

Pausing holds the animation at its current point. Changing it back to `running` resumes from there. If continuous motion is not essential, consider whether it should run at all and provide a way to stop it when needed.

## Use the `animation` shorthand

The `animation` shorthand combines animation properties in a compact declaration:

~~~css
.banner {
  animation: arrive 700ms ease-out 100ms 1 normal both;
}
~~~

This value names the `arrive` keyframes, sets a 700 millisecond duration, uses `ease-out`, waits 100 milliseconds, plays once in the normal direction, and applies both fill modes.

The first time value is the duration and the second time value is the delay. Other settings have defaults when omitted. A shorthand is concise, but long values are easier to maintain when the properties are written separately.

## Run multiple animations

Separate multiple animations with commas. Each animation name must have a matching `@keyframes` rule:

~~~css
.badge {
  animation:
    fade-in 500ms ease-out both,
    travel 1s linear 500ms both;
}
~~~

Multiple animations can affect different properties on the same element. If they both set the same property, their order and the animation cascade determine which animated value is used. Keeping each effect on separate nested elements can make a design easier to reason about.

## Choose properties with care

An animation can only interpolate values when the property and the pair of values support it. A change from `opacity: 0` to `opacity: 1` or from one transform to another can interpolate. Changing text content is not a CSS property animation, and not every property or pair of values changes smoothly.

Transforms and opacity are useful for many visual effects because they do not change surrounding layout in the same way as animating dimensions or positional layout properties. This does not guarantee that every animation will be fast. Use a restrained effect, then check how it behaves in the real page.

## Respect motion preferences

Motion can distract or cause discomfort for some visitors. Keep essential information available without animation, avoid unnecessary looping and flashing, and use the `prefers-reduced-motion` media feature to remove or simplify non-essential motion:

~~~css
@media (prefers-reduced-motion: reduce) {
  .message,
  .decorative-motion {
    animation: none;
  }
}
~~~

For an entrance effect, the static style should still show the content when the animation is disabled. Do not make important text or controls visible only in a keyframe that some visitors may never see.

## Animations and transitions

A transition interpolates between values after a state change, such as moving from a link's normal state to its focused state. A CSS animation uses keyframes to describe a sequence of values and can start as soon as its animation style is applied.

Use a transition for a simple state change. Use an animation when several stages, repetition, or a timed sequence are needed.

## Common mistakes

- Misspelling the keyframes name or assigning an animation with no matching name.
- Forgetting that the default animation duration is `0s`.
- Expecting an animation to change a property that is not included in its keyframes.
- Forgetting that `forwards` and `both` can keep animation values after the cycle.
- Using `infinite` for motion that has no clear purpose or pause behavior.
- Hiding essential content in an animation's initial keyframe.
- Making hover the only way to pause or control motion.
- Ignoring the visitor's reduced-motion preference.
- Animating many layout properties without checking the result in the actual page.

## Try it yourself

1. Create a `fade-in` keyframes rule with `opacity` values from `0` to `1`.
2. Apply it to a message with a duration of `500ms` and an `ease-out` timing function.
3. Add a middle keyframe at `50%` that changes the message's scale.
4. Repeat the animation with `alternate` direction and compare it with `normal`.
5. Set `animation-fill-mode: forwards` and observe the value after the cycle ends.
6. Pause an infinite decorative animation on both hover and keyboard focus.
7. Enable reduced motion and verify that all essential content remains visible.

## Key points

- `@keyframes` defines the values and stages in one animation cycle.
- Animation properties control the name, duration, timing, delay, repetition, direction, fill, and play state.
- The default duration is `0s` and the default fill mode is `none`.
- `forwards`, `backwards`, and `both` control the effect outside the active cycle.
- Use looping motion only when it has a purpose and can be controlled where appropriate.
- Keep essential content available without animation and respect reduced-motion preferences.
- Transitions respond to a state change; animations can define multi-stage sequences.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [44 - Transitions](44-transitions.md) | [Q&A](../qnas/45-animations-and-keyframes.md) | [Example](../examples/45-animations-and-keyframes.md) | [46 - Scroll-driven animations](46-scroll-driven-animations.md) |