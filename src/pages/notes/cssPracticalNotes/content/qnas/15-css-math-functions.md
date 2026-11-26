# 15 - CSS Math Functions: Questions and Answers

Use these questions to practise evaluating CSS calculations, checking value types, and choosing between calc(), min(), max(), and clamp(). Each answer follows its question.

## Multiple-choice questions

### 1. What does calc() do?

- A. It calculates CSS values from an expression.
- B. It evaluates JavaScript in a stylesheet.
- C. It converts every value to pixels at parse time.
- D. It automatically fixes invalid declarations.

**Answer: A.** calc() lets a property value be expressed as arithmetic over compatible CSS values.

### 2. Which expression has the required whitespace around subtraction?

- A. calc(100%-2rem)
- B. calc(100% -2rem)
- C. calc(100%- 2rem)
- D. calc(100% - 2rem)

**Answer: D.** Addition and subtraction operators need whitespace on both sides.

### 3. If 1rem equals 16px, what is calc(100% - 2rem) when its percentage reference is 600px?

- A. 568px
- B. 584px
- C. 600px
- D. 632px

**Answer: A.** Two rem equal 32px. Subtracting 32px from 600px gives 568px.

### 4. Which expression is invalid for width because it adds incompatible types?

- A. calc(10px + 2rem)
- B. calc(100% - 2rem)
- C. calc(10px + 2s)
- D. calc(10px * 2)

**Answer: C.** A length and a time cannot be added to produce a width.

### 5. What does min(30rem, 50vw) return?

- A. The larger candidate
- B. The smaller candidate
- C. The average of both candidates
- D. The first candidate every time

**Answer: B.** min() chooses the smallest resolved calculation.

### 6. Which function is useful for making padding at least 1rem?

- A. min(1rem, 3vw)
- B. max(1rem, 3vw)
- C. clamp(3vw, 1rem, 0)
- D. calc(1rem / 0)

**Answer: B.** max() chooses the larger candidate. The result cannot be smaller than 1rem.

### 7. What is the argument order for clamp()?

- A. preferred, minimum, maximum
- B. maximum, minimum, preferred
- C. minimum, preferred, maximum
- D. minimum, maximum, preferred

**Answer: C.** clamp() takes a minimum, then a preferred value, then a maximum.

### 8. What happens if clamp()'s preferred value is below its minimum?

- A. The minimum is used.
- B. The maximum is used.
- C. The declaration becomes invalid.
- D. The preferred value is averaged with the minimum.

**Answer: A.** clamp() keeps the preferred value between its bounds, so the minimum wins when the preferred value is too small.

### 9. Which expression creates fluid text with both a floor and a ceiling?

- A. font-size: 3vw;
- B. font-size: calc(1rem + 2vw);
- C. font-size: clamp(1rem, 1rem + 2vw, 3rem);
- D. font-size: min(1rem, 3rem);

**Answer: C.** clamp() bounds the responsive middle value, preventing it from dropping below 1rem or growing above 3rem.

### 10. Which operator has higher precedence in a calc() expression?

- A. Addition
- B. Subtraction
- C. Multiplication
- D. All operators have equal precedence

**Answer: C.** Multiplication and division happen before addition and subtraction.

### 11. What does calc(2 + 3 * 4) evaluate to?

- A. 14
- B. 20
- C. 24
- D. 36

**Answer: A.** Multiplication happens first, so the expression is 2 + 12.

### 12. What does calc((2 + 3) * 4) evaluate to?

- A. 14
- B. 20
- C. 24
- D. 36

**Answer: B.** The parentheses make 2 + 3 happen first, then 5 is multiplied by 4.

### 13. Which expression splits a length-percentage value into three equal parts?

- A. calc(100% / 3)
- B. calc(100% - 3)
- C. calc(100% + 3s)
- D. calc(100 / 3)%

**Answer: A.** The percentage remains part of the resulting CSS value. calc(100 / 3)% is invalid because the function cannot calculate a unitless number and then attach a percent sign outside it.

### 14. If the viewport is 1200px wide and 1rem is 16px, what does max(1rem, 3vw) choose?

- A. 16px
- B. 24px
- C. 36px
- D. 1200px

**Answer: C.** 3vw is 36px, which is larger than 1rem, or 16px.

### 15. What does min(100% - 2rem, 60rem) usually help express?

- A. A width that uses available space with a maximum size
- B. A font that is always 60rem
- C. A negative margin
- D. A fixed viewport height

**Answer: A.** The smaller value is used, so the width can shrink with its containing block but stops growing beyond 60rem.

### 16. What does the percentage in width: calc(100% - 2rem) refer to?

- A. Always the viewport width
- B. The percentage reference defined for width, usually the containing block's width
- C. The element's font size
- D. The browser's default font size

**Answer: B.** A math function does not change the property's percentage reference.

### 17. What does width: calc(10px + 2) attempt to add?

- A. Two lengths
- B. A length and a unitless number
- C. Two percentages
- D. A length and a time

**Answer: B.** The values have incompatible types for width. Use a length for the second value, such as 2px.

### 18. Why is calc(0 + 10px) invalid even though width: 0 is valid?

- A. Zero is never valid in calculations.
- B. Inside calc(), zero is a number, so it is being added to a length.
- C. calc() cannot contain plus signs.
- D. 10px cannot be used for width.

**Answer: B.** A literal zero can stand in for a zero length in some properties, but calc() still checks the types of its operands.

### 19. Which rule usually sets a maximum width while keeping a page centered?

- A. width: min(100% - 2rem, 72rem); margin-inline: auto;
- B. width: max(100% - 2rem, 72rem);
- C. width: clamp(72rem, 1rem, 100%);
- D. width: calc(100% + 72rem);

**Answer: A.** min() uses the available width when space is narrow and caps the page at 72rem when it is wide.

### 20. When does max() commonly act like a minimum-size rule?

- A. When one candidate is a floor and max() chooses the larger value
- B. When max() always chooses the first value
- C. When the values are invalid
- D. When it has no arguments

**Answer: A.** For example, max(1rem, 3vw) never returns less than 1rem.

## Short-answer questions

### 21. How should spaces be written around + and - in calc()?

**Answer: Put whitespace on both sides of each plus or minus operator.** For example, calc(100% - 2rem) is valid, while calc(100%-2rem) is not.

### 22. Can a width calculation add 10px and 2s?

**Answer: No.** Pixels are a length and seconds are a time. Their sum does not have a meaningful type for width.

### 23. What do min(), max(), and clamp() each choose?

**Answer: min() chooses the smallest candidate, max() chooses the largest, and clamp() keeps a preferred value between a minimum and a maximum.**

### 24. What does calc(100% - 2rem) do for a width?

**Answer: It subtracts 2rem from the width property's 100% reference.** The percentage usually refers to the containing block's width, and the rem value comes from the root font size.

### 25. Why use rem in a clamp() minimum for text?

**Answer: A rem-based minimum follows the root font size.** It can help keep text from becoming too small when the user's default text size is larger.

### 26. Do min() and max() require exactly two values?

**Answer: No.** They can compare multiple comma-separated calculations, provided the values have compatible types for their use.

### 27. Should calc() be nested inside min() for arithmetic in an argument?

**Answer: Usually no.** Modern math functions accept a calculation as an argument, so min(100% - 2rem, 60rem) is valid and more direct.

### 28. What does a custom property add to a calculation?

**Answer: It lets a value be named and reused.** For example, a shared gutter can be stored once and substituted into multiple calculations.

### 29. Why can a math expression return a fractional CSS pixel?

**Answer: The arithmetic can produce a fractional result.** The browser can retain subpixel layout values and map them to the display during rendering.

### 30. What is a risk of using only vw for font-size?

**Answer: The text can become too small on a narrow viewport or too large on a wide one.** A clamp() range can place lower and upper bounds around the fluid value.

## Read and explain the code

### 31. What happens to the width at a 900px containing block when 1rem is 16px?

~~~css
.box {
  width: calc(100% - 2rem);
}
~~~

**Answer: The width is 868px.** Two rem are 32px, and 900px minus 32px is 868px.

### 32. What width does this produce if the containing block is 900px wide?

~~~css
.box {
  width: min(70rem, 100% - 2rem);
}
~~~

**Answer: It produces 868px when 1rem is 16px.** The candidates are 70rem, or 1120px, and 868px. min() chooses the smaller one.

### 33. What is the result of max(1rem, 5vw) at a 1000px viewport if 1rem is 16px?

**Answer: 50px.** Five percent of 1000px is 50px, which is larger than 16px.

### 34. What does clamp(1rem, 2rem, 3rem) return when 1rem is 16px?

**Answer: 2rem, or 32px.** The preferred value lies between the 16px minimum and 48px maximum.

### 35. What does clamp(2rem, 1rem, 3rem) return?

**Answer: 2rem.** The preferred 1rem is below the minimum, so clamp() uses its minimum.

### 36. What does clamp(4rem, 5rem, 3rem) return?

**Answer: 4rem.** Here the minimum is greater than the maximum. CSS clamp() favors the minimum when the bounds conflict.

### 37. Why is the first width valid and the second invalid?

~~~css
.panel {
  width: calc(100% - 2rem);
  width: calc(100%-2rem);
}
~~~

**Answer: The first has spaces around subtraction; the second does not.** Since the second declaration is invalid, the browser keeps the earlier valid width.

### 38. What does this expression evaluate to?

~~~css
.item {
  width: calc((100% - 2rem) / 2);
}
~~~

**Answer: Half of the containing block's width after subtracting 2rem.** Parentheses make subtraction happen before division.

### 39. What does this custom property pattern achieve?

~~~css
:root {
  --gutter: 1rem;
}

.page {
  width: calc(100% - 2 * var(--gutter));
}
~~~

**Answer: It leaves a gutter on both sides of the page.** Each gutter is 1rem, and multiplying by 2 subtracts both from the available width.

### 40. Why is this declaration invalid?

~~~css
.card {
  width: calc(20px + 1s);
}
~~~

**Answer: It adds a length to a time.** A width calculation must resolve to a type that width accepts, such as a length or length-percentage.

## Practical questions

### 41. Write a page width that leaves 1rem at each side and stops growing at 72rem.

**Answer: width: min(100% - 2rem, 72rem);** Center it with margin-inline: auto if a centered page is desired.

### 42. Write padding that is at least 1rem and grows to 3vw when 3vw is larger.

**Answer: padding: max(1rem, 3vw);** max() selects the larger candidate, so padding never falls below 1rem.

### 43. Write a responsive heading between 1.5rem and 3rem, with a preferred value of 1rem plus 2vw.

**Answer: font-size: clamp(1.5rem, 1rem + 2vw, 3rem);** The first and third arguments are the lower and upper bounds.

### 44. A developer wrote calc(100%-24px). How should it be corrected?

**Answer: Write calc(100% - 24px).** The subtraction operator needs whitespace on both sides.

### 45. A width expression adds 2rem and 300ms. What should be changed?

**Answer: Replace the time with a compatible length or remove it from the width calculation.** Milliseconds are for time-based properties, not width.

## Key points

- calc() evaluates arithmetic and follows normal operator precedence.
- Use spaces around + and -.
- Use compatible value types that the receiving property accepts.
- min() chooses the smallest value, max() the largest, and clamp() bounds a preferred value.
- Percentage references come from the receiving property, even inside math functions.
- Use rem-based limits for text and other values that should respond to user font-size settings.
- Custom properties can name and share values used in calculations.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [14 - Colors and Color Functions](14-colors-and-color-functions.md) | [Lesson](../lessons/15-css-math-functions.md) | [Example](../examples/15-css-math-functions.md) | [16 - The CSS box model](16-box-model.md) |