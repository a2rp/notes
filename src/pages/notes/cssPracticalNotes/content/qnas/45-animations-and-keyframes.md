# 45 - Animations and keyframes - Q&A

Review keyframes, animation settings, repetition, direction, fill modes, playback control, and reduced motion. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. What does an `@keyframes` rule define?

- A. The HTML elements in a document
- B. The property values at stages of one animation cycle
- C. Which stylesheet loads first
- D. A list of event handlers

**Answer: B. The property values at stages of one animation cycle.**

**Explanation:** Keyframes name an animation and declare CSS values at `from`, `to`, or percentage points. Animation properties control how that cycle is played.

### 2. What do `from` and `to` mean inside `@keyframes`?

- A. `from` means `50%` and `to` means `100%`
- B. `from` means `0%` and `to` means `100%`
- C. They are invalid selectors
- D. They name CSS properties

**Answer: B. `from` means `0%` and `to` means `100%`.**

**Explanation:** These keywords are convenient names for the start and end of one animation cycle.

### 3. Which property connects an element to a named keyframes rule?

- A. `animation-name`
- B. `animation-target`
- C. `keyframes-name`
- D. `animation-state`

**Answer: A. `animation-name`.**

**Explanation:** Its value must match the name in the `@keyframes` rule. A missing or misspelled name means there is no matching named animation.

### 4. What is the initial value of `animation-duration`?

- A. `1s`
- B. `500ms`
- C. `0s`
- D. `infinite`

**Answer: C. `0s`.**

**Explanation:** A positive duration is normally needed to see a gradual animation. The initial zero duration makes the cycle instantaneous.

### 5. What is the default `animation-iteration-count`?

- A. `1`
- B. `0`
- C. `infinite`
- D. `2`

**Answer: A. `1`.**

**Explanation:** By default, an animation cycle plays once. Use a number for another count or `infinite` to repeat continuously.

### 6. What does `animation-direction: alternate` do?

- A. Plays every cycle forward
- B. Plays every cycle backward
- C. Alternates between forward and backward cycles
- D. Reverses the HTML order

**Answer: C. Alternates between forward and backward cycles.**

**Explanation:** Alternate direction plays odd cycles forward and even cycles in reverse, which can avoid a jump back to the starting value.

### 7. Which fill mode keeps the final keyframe values after an animation ends?

- A. `none`
- B. `forwards`
- C. `backwards`
- D. `running`

**Answer: B. `forwards`.**

**Explanation:** `forwards` retains the end state after the cycle. The default `none` does not keep the animation's values after it ends.

### 8. Which fill mode applies the starting keyframe during a positive delay?

- A. `backwards`
- B. `forwards`
- C. `infinite`
- D. `paused`

**Answer: A. `backwards`.**

**Explanation:** `backwards` applies the first keyframe during the delay. With reverse directions, the first keyframe is the one that starts that direction.

### 9. What does `animation-fill-mode: both` combine?

- A. The effect of `forwards` and `backwards`
- B. The effect of `normal` and `reverse`
- C. Two different keyframes names
- D. Hover and focus states

**Answer: A. The effect of `forwards` and `backwards`.**

**Explanation:** `both` applies the backwards fill during the delay and the forwards fill after the active cycle.

### 10. Which property pauses an animation without deleting its current position?

- A. `animation-play-state`
- B. `animation-fill-mode`
- C. `animation-delay`
- D. `animation-direction`

**Answer: A. `animation-play-state`.**

**Explanation:** Setting it to `paused` holds the animation at its current point. Setting it back to `running` resumes it.

### 11. How are multiple animations listed in one shorthand declaration?

- A. Separate each animation with a comma
- B. Separate each animation with a semicolon inside the value
- C. Put each animation in a new HTML attribute
- D. Combine the keyframe names with a slash

**Answer: A. Separate each animation with a comma.**

**Explanation:** Each comma-separated item describes one animation. Each name should match a keyframes rule.

### 12. What can CSS use to detect a visitor's request for less motion?

- A. `@media (prefers-reduced-motion: reduce)`
- B. `@media (motion: none)`
- C. `@keyframes (reduce)`
- D. `animation-preference: slow`

**Answer: A. `@media (prefers-reduced-motion: reduce)`.**

**Explanation:** This media query can disable or simplify non-essential motion when the system preference requests reduced motion.

## Short-answer questions

### 13. What happens if an element's `animation-name` does not match any `@keyframes` rule?

**Answer:** No named animation runs for that name.

**Explanation:** The name connects the element's animation settings to a keyframes rule. Check spelling and ensure the rule is present.

### 14. What is the difference between `animation-direction: reverse` and `alternate`?

**Answer:** `reverse` plays each cycle backward. `alternate` switches direction on each cycle.

**Explanation:** With `alternate`, one cycle runs forward and the next runs backward. `reverse` keeps every cycle in the reverse direction.

### 15. Explain `none`, `forwards`, `backwards`, and `both` for `animation-fill-mode`.

**Answer:** `none` applies no keyframe values outside the active cycle, `forwards` keeps the ending values, `backwards` applies the starting values during a delay, and `both` combines the last two behaviors.

**Explanation:** Fill mode controls styles before the cycle begins and after it ends. It does not change the keyframe sequence itself.

### 16. How is a CSS animation different from a transition?

**Answer:** An animation can define multiple stages in keyframes and can run when its style is applied. A transition interpolates between values after a state change.

**Explanation:** Use a transition for a simple change such as a focused link color. Use an animation for a sequence with several stages or repetition.

### 17. What happens when `animation-play-state` changes from `paused` to `running`?

**Answer:** The animation continues from the point where it was paused.

**Explanation:** Pausing holds the current progress rather than resetting the animation to its first keyframe.

### 18. Why should essential text not be visible only in an animation's first keyframe?

**Answer:** The animation may be disabled or shortened for reduced motion, and the initial state may otherwise hide the text.

**Explanation:** Essential content should remain available in the normal document and style flow without depending on motion.

## Applied questions

### 19. An animation should play twice, alternating forward and backward. Which settings are needed?

**Answer:**

~~~css
.item {
  animation-iteration-count: 2;
  animation-direction: alternate;
}
~~~

**Explanation:** The count sets two cycles. Alternate direction reverses every other cycle.

### 20. A message appears after a delay and should stay visible at its final keyframe. Which fill mode is useful?

**Answer:** `animation-fill-mode: both`.

**Explanation:** `both` applies the starting keyframe during the delay and keeps the ending values after the animation completes.

### 21. A decorative animation loops forever and should pause while its link is focused. What property value should the focus rule set?

**Answer:**

~~~css
.motion-link:focus-visible .decoration {
  animation-play-state: paused;
}
~~~

**Explanation:** The `paused` value holds the current animation position. A matching hover rule can pause it for pointer users too.

### 22. A one-time animation runs but the element returns to its old opacity afterward. What setting can preserve the final keyframe value?

**Answer:** Set `animation-fill-mode: forwards` or include `forwards` in the shorthand.

**Explanation:** With the default `none`, the keyframe values stop applying after the animation ends. `forwards` retains the final keyframe values.

### 23. What should a reduced-motion rule do to an entrance animation, and what should happen to the content?

**Answer:** It can remove the animation with `animation: none`; the content should still be visible in its normal style.

**Explanation:** Reduced-motion support should not make important information disappear. Keep the static state readable without relying on the keyframes.

### 24. When is `animation-iteration-count: infinite` appropriate?

**Answer:** Use it for motion that has an ongoing purpose, keep it subtle, and provide a way to pause it when appropriate.

**Explanation:** Continuous motion can distract or cause discomfort. Avoid looping effects that do not help explain the interface.

## Coding questions

### 25. Write keyframes that fade an element from transparent to opaque, then apply them over 500 milliseconds.

**Answer:**

~~~css
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.message {
  animation-name: fade-in;
  animation-duration: 500ms;
}
~~~

**Explanation:** The keyframes set the start and end opacity. The element rule refers to the matching name and sets the duration of one cycle.

### 26. Write a keyframes rule that moves a dot to the right by 8rem over one cycle, with a midpoint at 4rem.

**Answer:**

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

**Explanation:** The percentage selectors define intermediate stages. The browser interpolates the transform between them.

### 27. Write a shorthand for a `pulse` animation that lasts 1.5 seconds, uses ease-in-out, repeats forever, and alternates direction.

**Answer:**

~~~css
.pulse {
  animation: pulse 1.5s ease-in-out infinite alternate;
}
~~~

**Explanation:** The value sets the animation name, duration, timing function, iteration count, and direction. The `pulse` keyframes rule must also be defined.

### 28. Write a one-time `arrive` animation that lasts 700 milliseconds, waits 100 milliseconds, and keeps the final state.

**Answer:**

~~~css
.notice {
  animation: arrive 700ms ease-out 100ms 1 normal forwards;
}
~~~

**Explanation:** The first time is the duration and the second is the delay. The count is one, the direction is normal, and `forwards` retains the last keyframe values.

### 29. Write a reduced-motion rule that removes a decorative looping animation.

**Answer:**

~~~css
@media (prefers-reduced-motion: reduce) {
  .decoration {
    animation: none;
  }
}
~~~

**Explanation:** This disables the non-essential animation for visitors who request reduced motion. The design should still show all essential content in its normal style.

## Key takeaways

- `@keyframes` defines stages; animation properties control how those stages play.
- A name must match a keyframes rule, and a non-zero duration is normally needed for visible motion.
- Iteration count, direction, delay, fill mode, and play state control the animation lifecycle.
- `forwards`, `backwards`, and `both` affect values outside the active cycle.
- Keep essential content visible without animation and respect reduced-motion preferences.
- Use looping motion only when it has a clear purpose and can be controlled where appropriate.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [44 - Transitions](../lessons/44-transitions.md) | [Q&A](45-animations-and-keyframes.md) | [Example](../examples/45-animations-and-keyframes.md) | [46 - Scroll-driven animations](../lessons/46-scroll-driven-animations.md) |