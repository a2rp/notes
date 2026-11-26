# 44 - Transitions - Q&A

Review transition triggers, properties, durations, timing functions, delays, shorthand, keyboard feedback, and reduced motion. Each answer and explanation follow its question.

## Multiple-choice questions

### 1. What starts a CSS transition?

- A. A computed property value changes and a transition applies to it
- B. The browser loads any stylesheet
- C. The element receives an HTML comment
- D. The page scrolls by one pixel

**Answer: A. A computed property value changes and a transition applies to it.**

**Explanation:** A transition interpolates an animatable property between its old and new computed values. It does not create the state change itself.

### 2. What happens when the transition duration is `0s`?

- A. The value changes immediately with no visible transition
- B. The transition repeats forever
- C. The property is disabled
- D. The browser waits one second

**Answer: A. The value changes immediately with no visible transition.**

**Explanation:** A non-zero duration is needed to see a transition over time. The initial duration is `0s`.

### 3. Which property selects which CSS property changes should transition?

- A. `transition-property`
- B. `transition-name`
- C. `transition-start`
- D. `transition-state`

**Answer: A. `transition-property`.**

**Explanation:** It accepts property names, `all`, or `none`. A short explicit list is often easier to maintain than `all`.

### 4. Which set contains the four transition settings?

- A. Property, duration, timing function, and delay
- B. Color, font, position, and size
- C. Start, loop, direction, and fill
- D. Margin, padding, border, and outline

**Answer: A. Property, duration, timing function, and delay.**

**Explanation:** The `transition` shorthand combines the property, duration, timing function, and optional delay.

### 5. In `transition: opacity 300ms ease 100ms`, what is the delay?

- A. `300ms`
- B. `100ms`
- C. `ease`
- D. There is no delay

**Answer: B. `100ms`.**

**Explanation:** In the shorthand, the first time value is the duration and the second time value is the delay.

### 6. Which timing function progresses at a constant rate?

- A. `linear`
- B. `ease-in`
- C. `ease-out`
- D. `ease-in-out`

**Answer: A. `linear`.**

**Explanation:** `linear` uses a constant rate. The ease functions change speed during the transition.

### 7. Where should a transition usually be declared for hover feedback that should also animate back to the normal state?

- A. Only in the `:hover` rule
- B. In the base rule that applies before and after hover
- C. In an HTML comment
- D. Only in a media query for print

**Answer: B. In the base rule that applies before and after hover.**

**Explanation:** The base rule remains active when the pointer leaves hover, so the transition can apply in both directions.

### 8. Which is a reasonable transition declaration for a card that moves and changes shadow?

- A. `transition: transform 180ms ease-out, box-shadow 180ms ease-out;`
- B. `transition: hover 180ms;`
- C. `transition: display forever;`
- D. `transition: all -2s;`

**Answer: A. `transition: transform 180ms ease-out, box-shadow 180ms ease-out;`.**

**Explanation:** The declaration names two properties, gives each a valid duration, and selects a timing function. The other options use invalid or unrelated values.

### 9. What does the keyword `all` mean for `transition-property`?

- A. Every property in the document is set to its initial value
- B. All properties that can transition are selected
- C. Every property changes immediately
- D. All transitions repeat forever

**Answer: B. All properties that can transition are selected.**

**Explanation:** `all` can also catch unrelated properties added later. Naming only the properties that should change makes behavior clearer.

### 10. Which preference can CSS query to reduce non-essential transition motion?

- A. `prefers-reduced-motion`
- B. `prefers-transition-delay`
- C. `keyboard-hover`
- D. `motion-duration`

**Answer: A. `prefers-reduced-motion`.**

**Explanation:** The `prefers-reduced-motion: reduce` media query lets a design shorten or remove non-essential motion for visitors who request it.

## Short-answer questions

### 11. Name the four properties represented by the `transition` shorthand.

**Answer:** `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.

**Explanation:** The delay is optional in the shorthand and defaults to zero. The other settings determine what changes and how.

### 12. Why does a transition not show if the computed value never changes?

**Answer:** A transition needs different starting and destination values to interpolate between.

**Explanation:** Merely declaring `transition` does not change a property. A state or style change must supply a new value.

### 13. What does `transition-delay` do?

**Answer:** It specifies how long to wait after the property change before beginning the transition.

**Explanation:** A positive delay postpones the start. A negative delay makes the transition appear to start partway through its duration.

### 14. Why is `transition: all 250ms ease` sometimes less maintainable than listing properties?

**Answer:** It can apply to unrelated animatable properties, including properties added by later rules.

**Explanation:** Explicit property names document the intended effect and reduce surprise when the component changes.

### 15. Why might `display: none` to `display: block` not fade smoothly with a basic transition?

**Answer:** A typical `display` change does not interpolate like a color or opacity value in a basic transition.

**Explanation:** Not every property or pair of values has a smooth interpolation. Use an appropriate transitionable property, such as opacity, when it communicates the desired visual state.

### 16. What is the practical difference between a transition and a CSS keyframe animation?

**Answer:** A transition responds to a change between states. A keyframe animation can define a sequence of intermediate states and can run without a hover or focus change.

**Explanation:** A button's focus color is a common transition use. A repeated loading indicator is a common animation use.

### 17. Why should hover feedback often have a `:focus-visible` counterpart?

**Answer:** Keyboard users do not hover with a pointer, so they need visible feedback when the control receives keyboard focus.

**Explanation:** Pairing the states can make the same cue available to pointer and keyboard users. Keep a clear focus indicator as well.

## Applied questions

### 18. A button changes color on hover instantly even though its rule says `transition: color ease`. What is missing?

**Answer:** A non-zero duration, for example `transition: color 180ms ease;`.

**Explanation:** The initial duration is `0s`. A timing function alone does not make a change take time.

### 19. A link animates while the pointer enters but changes back instantly when it leaves. What should you inspect?

**Answer:** Check whether the `transition` declaration is only in the `:hover` rule. Move it to the link's base rule so it applies in both states.

**Explanation:** On pointer exit, the hover rule no longer applies. A base rule can govern both the transition into hover and the return to the normal value.

### 20. A component's color and transform need different durations. How should the transitions be declared?

**Answer:** Give each property its own comma-separated transition entry:

~~~css
.component {
  transition: color 140ms linear, transform 220ms ease-out;
}
~~~

**Explanation:** Separate entries allow each property to use its own duration and timing function.

### 21. A pointer hover effect works, but keyboard users cannot see the same change. What is a suitable selector update?

**Answer:** Apply the state rule to both selectors:

~~~css
.control:hover,
.control:focus-visible {
  background-color: #e7f3ef;
}
~~~

**Explanation:** The control can show the same state feedback on pointer hover and visible keyboard focus. Keep its focus outline visible too.

### 22. A decorative movement lasts too long for a visitor who prefers reduced motion. What can you do?

**Answer:** Use a reduced-motion media query to remove or greatly shorten the non-essential transition:

~~~css
@media (prefers-reduced-motion: reduce) {
  .decoration {
    transition-duration: 0.01ms;
  }
}
~~~

**Explanation:** Essential information should remain available without relying on motion. Keep the effect short or remove it for this preference.

### 23. Should a transition be declared only on `:hover` if the hover-out state should also change smoothly?

**Answer:** No. Declare it on the base rule that applies in both the normal and hover states.

**Explanation:** When hover ends, the base rule becomes active again. A base transition allows the property to transition back as well.

### 24. A transition is declared for `opacity`, but the element does not fade. List two things to check.

**Answer:** Check that opacity actually changes between the states, that the transition property includes `opacity`, and that the duration is non-zero.

**Explanation:** A transition needs a changed computed value, a matching property, and time to interpolate. Also check for overriding rules.

## Coding questions

### 25. Write CSS that changes a link's color smoothly over 180 milliseconds on hover and keyboard focus.

**Answer:**

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

**Explanation:** The transition is on the base link rule, so it applies when entering and leaving the changed state. Both hover and visible keyboard focus receive the color change.

### 26. Write a transition for `transform` and `box-shadow`, each lasting 220 milliseconds, with an ease-out timing function.

**Answer:**

~~~css
.card {
  transition: transform 220ms ease-out, box-shadow 220ms ease-out;
}
~~~

**Explanation:** Each comma-separated entry names one property and its own duration and timing function.

### 27. Write a transition shorthand for opacity that lasts 400 milliseconds, uses a linear timing function, and waits 100 milliseconds before starting.

**Answer:**

~~~css
.panel {
  transition: opacity 400ms linear 100ms;
}
~~~

**Explanation:** The first time value is the duration and the second is the delay. `linear` keeps the interpolation rate constant.

### 28. Add a visible focus outline and a short transform transition to a link that lifts on hover or keyboard focus.

**Answer:**

~~~css
.card-link {
  transform: translateY(0);
  transition: transform 180ms ease-out;
}

.card-link:hover,
.card-link:focus-visible {
  transform: translateY(-0.2rem);
}

.card-link:focus-visible {
  outline: 3px solid #176b57;
  outline-offset: 3px;
}
~~~

**Explanation:** The base rule supplies the transition for both entering and leaving the state. The focus outline stays visible while the link is focused.

## Key takeaways

- A transition needs a changed value, a transitionable property, and a non-zero duration.
- The shorthand combines property, duration, timing function, and delay.
- Put the transition on the base state and explicitly list the properties that should change.
- Timing functions control the pace of interpolation, and delay controls when it starts.
- Provide hover and keyboard focus feedback, and respect reduced-motion preferences.
- Use transitions for state changes and keyframe animations for a defined sequence of states.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [43 - Transforms](../lessons/43-transforms.md) | [Q&A](44-transitions.md) | [Example](../examples/44-transitions.md) | [45 - Animations and keyframes](../lessons/45-animations-and-keyframes.md) |