# 44 - Transitions

A CSS transition gradually changes an animatable property from one computed value to another. The change begins when a state or style changes, such as when a visitor hovers over a link, focuses a control, or a class is updated. Transitions add feedback to an existing state change; they do not create the state change themselves.

## Learning outcomes

After this chapter, you should be able to:

- Explain what starts a CSS transition and why its duration matters.
- Configure the property, duration, timing function, and delay.
- Write the `transition` shorthand and a list of transitions.
- Choose properties and timing that make an interaction clear.
- Add transition feedback for keyboard focus as well as pointer hover.
- Respect reduced-motion preferences.

## How a transition works

A transition needs a starting value, a changed value, and a non-zero duration. For example, the link below has one color normally and another color while hovered or focused:

~~~css
a {
  color: #075b9b;
  transition: color 180ms ease;
}

a:hover,
a:focus-visible {
  color: #a13a00;
}
~~~

When the link enters or leaves either state, the browser interpolates the color over 180 milliseconds. The transition does not run unless the computed value changes. If the duration is `0s`, the value changes immediately.

Transitions commonly respond to pseudo-classes such as `:hover`, `:focus-visible`, and `:active`, or to class changes that update an element's style. Put the transition declaration on the element's base rule so it applies both when entering and leaving the changed state.

## The four transition settings

A transition can use four settings. The `transition` shorthand combines them.

### Choose a property

`transition-property` names which property changes should be gradual:

~~~css
.card {
  transition-property: transform, box-shadow;
}
~~~

Prefer a short, explicit list such as `transform`, `opacity`, `color`, or `background-color`. The keyword `all` requests transitions for every property that can transition. It can also animate an unrelated property added later, so explicit property names are usually easier to review and maintain.

### Set a duration

`transition-duration` controls how long a change takes:

~~~css
.card {
  transition-duration: 220ms;
}
~~~

CSS accepts seconds (`s`) and milliseconds (`ms`). Use a duration that gives people time to perceive the effect without making the interface feel slow. The default duration is `0s`, so a transition needs a non-zero duration to be visible.

### Choose a timing function

`transition-timing-function` controls how the change progresses over time:

~~~css
.panel {
  transition-timing-function: ease-out;
}
~~~

Common choices include:

- `ease`: starts and ends gently, with a faster middle.
- `linear`: progresses at a constant rate.
- `ease-in`: starts slowly and speeds up.
- `ease-out`: starts quickly and slows down at the end.
- `ease-in-out`: starts and ends slowly.
- `cubic-bezier(...)`: defines a custom easing curve.
- `steps(...)`: changes in discrete steps instead of a smooth curve.

Choose a timing function that helps explain the change. For example, `ease-out` can make an arriving element settle, while `linear` can suit a steady progress indicator.

### Add a delay

`transition-delay` waits before starting the transition:

~~~css
.tooltip {
  transition-delay: 120ms;
}
~~~

A positive delay can be useful when a small pause is intentional. Long delays make controls feel unresponsive, so use them carefully. A negative delay starts the transition as though some of its time has already elapsed and is an advanced effect.

## Write the shorthand

The shorthand is written as a property, duration, timing function, and optional delay:

~~~css
.card {
  transition: transform 220ms ease-out 0ms;
}
~~~

The delay is optional and defaults to `0s`. If two time values appear, the first is the duration and the second is the delay. The transition property's default is `all`, but naming the property makes the rule more specific and easier to understand.

Several properties can have separate transition settings, separated by commas:

~~~css
.button {
  transition:
    transform 180ms ease-out,
    background-color 180ms linear,
    box-shadow 180ms ease-out;
}
~~~

Each comma-separated entry describes one property. Use separate entries when different properties need different timing or duration.

## Properties and values must be transitionable

A transition interpolates between compatible computed values. Many color, opacity, length, and transform values can change gradually. Some properties or value changes do not interpolate in a basic transition. For example, changing text content is not a CSS property transition, and a typical `display: none` to `display: block` change does not smoothly interpolate like a color.

If an effect does not transition, check these points:

1. Did the computed property value change between the two states?
2. Is the property named by `transition-property`?
3. Is the duration greater than zero?
4. Can those two values be interpolated?
5. Is another rule overriding the transition or the changed value?

Do not assume every property will animate smoothly. Test the actual state change and choose a property with an appropriate transition type.

## Choose effects that communicate state

Transitions should help explain the result of an action. A subtle color change, a small movement, or a fade can clarify that a link or card is interactive:

~~~css
.card-link {
  transform: translateY(0);
  box-shadow: 0 0.2rem 0.6rem rgb(0 0 0 / 12%);
  transition: transform 180ms ease-out, box-shadow 180ms ease-out;
}

.card-link:hover,
.card-link:focus-visible {
  transform: translateY(-0.2rem);
  box-shadow: 0 0.6rem 1rem rgb(0 0 0 / 18%);
}
~~~

The transition does not make the link interactive. Its HTML still needs a useful destination, and keyboard focus needs a visible indication.

Properties such as `width`, `height`, `top`, and `left` can trigger layout work as they change. A transform or opacity effect often avoids changing the surrounding layout, but performance depends on the page and device. Use the simplest effect that communicates the state and check it in the actual interface.

## Transitions and changing states

A transition runs from the current computed value toward the value for the new state. If the state changes again while the transition is running, the visual value can move toward the latest state. This makes hover and focus effects respond naturally as the pointer or focus enters and leaves an element.

Declare the transition in a rule that applies in both states, usually the base rule. If it is declared only in `:hover`, the transition may apply on entry but not when leaving hover, because the declaration is no longer active in the base state.

~~~css
.notice {
  opacity: 0.75;
  transition: opacity 200ms ease-in-out;
}

.notice:hover,
.notice:focus-visible {
  opacity: 1;
}
~~~

## Keyboard access and reduced motion

A pointer hover is not available to someone navigating with a keyboard. Pair hover feedback with `:focus-visible` when the same feedback helps both groups, and preserve a visible focus indicator:

~~~css
.control {
  transition: background-color 160ms ease, transform 160ms ease;
}

.control:hover,
.control:focus-visible {
  background-color: #e7f3ef;
  transform: translateY(-0.1rem);
}

.control:focus-visible {
  outline: 3px solid #176b57;
  outline-offset: 3px;
}
~~~

Some visitors ask their device to reduce motion. Keep essential state information available without motion, and shorten or remove non-essential transitions for that preference:

~~~css
@media (prefers-reduced-motion: reduce) {
  .control {
    transition-duration: 0.01ms;
  }
}
~~~

Do not use a transition to hide important information behind a long delay. Essential content and controls should remain understandable and usable even when transitions are disabled.

## Transitions versus animations

A transition moves between values when a style change occurs. It usually has a starting state and a destination state, such as the normal and focused appearance of a button.

A CSS animation can run from keyframes, define several intermediate states, repeat, and play without a hover or focus change. The next chapter covers animations and `@keyframes`.

## Common mistakes

- Setting only a duration and expecting a transition without a changed value.
- Forgetting that the default duration is `0s`.
- Declaring the transition only in the hover rule, so the reverse change is abrupt.
- Using `all` and unintentionally transitioning unrelated properties.
- Expecting every property or every pair of values to interpolate.
- Using a long delay that makes a control feel unresponsive.
- Adding hover feedback without keyboard focus feedback.
- Using motion to communicate information that disappears when motion is reduced.
- Treating a transition as a replacement for a semantic control or a real state change.

## Try it yourself

1. Transition a link's text color over `180ms` and test both hover and keyboard focus.
2. Add separate transitions for a card's `transform` and `box-shadow`.
3. Compare `linear`, `ease-in`, and `ease-out` timing on a small movement.
4. Add a short delay to a decorative tooltip and decide whether it improves or slows the interaction.
5. Move the transition declaration from `:hover` to the base rule and observe how the return state changes.
6. Enable the operating system's reduced-motion preference and verify that essential information remains available.

## Key points

- A transition interpolates an animatable property after its computed value changes.
- A non-zero duration is required for a visible transition.
- The four settings are property, duration, timing function, and delay.
- Put transitions on the base state and name the properties that should change.
- Not all properties or values interpolate in a basic transition.
- Pair pointer feedback with keyboard focus feedback.
- Respect reduced-motion preferences and keep essential information usable without motion.
- Transitions respond to a state change; keyframe animations can define a sequence of states.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [43 - Transforms](43-transforms.md) | [Q&A](../qnas/44-transitions.md) | [Example](../examples/44-transitions.md) | [45 - Animations and keyframes](45-animations-and-keyframes.md) |