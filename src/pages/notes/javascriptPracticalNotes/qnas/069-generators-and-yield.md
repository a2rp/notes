# 69 - Generators and yield: Q&A

Use these questions to review generator functions, suspension and resumption, values sent through **next()**, delegation, completion, error handling, cleanup, and lazy sequences. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does calling a generator function return?

- A. The function's final return value
- B. A generator object
- C. An array of every yielded value
- D. A promise

**Answer: B.** Calling a generator function creates a generator object. Its body does not begin until the generator is resumed, usually with **next()**.

### 2. Which syntax declares a generator function?

- A. **async function name()**
- B. **function* name()**
- C. **generator name()**
- D. **function name*()**

**Answer: B.** The asterisk after **function** marks a generator function. Generator methods use an asterisk before the method name.

### 3. When does a generator function body begin executing?

- A. As soon as the function is called
- B. When its returned generator object's **next()** method is first called
- C. When the generator object is converted to a string
- D. Only after **return()** is called

**Answer: B.** The function call creates a suspended generator object. The first **next()** call begins execution.

### 4. What does a **yield** expression do?

- A. Permanently exits the generator
- B. Pauses the generator and produces a value with **done: false**
- C. Restarts the generator from its first line
- D. Converts the generator into an array

**Answer: B.** **yield** produces a value and suspends execution at that point. A later call to **next()** resumes from there.

### 5. What can a later **next(value)** call provide to a generator?

- A. The result of the suspended **yield** expression
- B. A new parameter to the generator function
- C. A replacement generator object
- D. The value of the generator's **this** binding

**Answer: A.** After the generator has started and paused at **yield**, the next call's argument becomes the result of that suspended **yield** expression.

### 6. What happens to an argument passed to the first **next(value)** call?

- A. It is returned as the first yielded value.
- B. It becomes the value of a yield expression before the function body starts.
- C. It is ignored because the generator has not paused at a yield expression yet.
- D. It is saved as the generator's first parameter.

**Answer: C.** The first call starts execution. There is no suspended **yield** expression to receive the argument yet.

### 7. What is the final **return** value of a generator when consumed by **for...of**?

- A. It is included as the last loop value.
- B. It is ignored by the loop.
- C. It restarts the generator.
- D. It becomes the loop's index.

**Answer: B.** **for...of** stops when **done** becomes true. It does not yield the value from the generator's final **return** statement.

### 8. What does **yield\*** do?

- A. Calls the generator recursively forever
- B. Delegates iteration to another iterable or iterator
- C. Makes a generator asynchronous
- D. Returns the generator function itself

**Answer: B.** **yield\*** forwards values from another iterable or iterator. If the delegate is a generator, its completion value becomes the result of the **yield\*** expression.

### 9. What does calling a suspended generator's **return(value)** method do?

- A. Requests that the generator complete with that value
- B. Sends a normal value into the next **yield** expression
- C. Restarts the generator
- D. Converts its remaining values into an array

**Answer: A.** **return(value)** injects a return completion at the generator's suspended point. Any **finally** block can run before it completes.

### 10. What does calling a suspended generator's **throw(error)** method do?

- A. Always returns the error as a yielded value
- B. Throws the error at the suspended **yield** expression
- C. Throws the error before the generator function is called
- D. Closes every other generator in the program

**Answer: B.** The error is injected at the paused point. A generator's **try...catch** can handle it. If it is not caught, the error propagates to the caller.

## True or false

### 11. A generator function call runs its entire body immediately.

**Answer: False.** The call creates a generator object in a suspended state. Execution starts when a consumer calls **next()**.

### 12. A generator object is both an iterator and an iterable.

**Answer: True.** It has **next()** and its **[Symbol.iterator]()** method returns the generator object itself.

### 13. Calling **next()** after a generator has completed starts it again.

**Answer: False.** A completed generator stays completed. Later **next()** calls return a completed iterator result. Call the generator function again to create a new generator object.

### 14. The first **next(value)** call supplies that value to the first **yield** expression.

**Answer: False.** The first call starts the function, so its argument is ignored. A later call supplies the value to the yield expression where the generator is paused.

### 15. A generator's **return** statement produces an iterator result with **done: true**.

**Answer: True.** It completes the generator. Its return value is available from the final direct **next()** result but is not yielded by **for...of**.

### 16. **yield\*** can delegate only to another generator function.

**Answer: False.** It can delegate to any synchronous iterable or iterator, including an array, a set, or a generator object.

### 17. A **finally** block can run when a consumer breaks from a **for...of** loop over a generator.

**Answer: True.** The loop closes the generator on early exit. The generator's cleanup code in **finally** runs.

### 18. Spreading a generator always gives the same values each time.

**Answer: False.** A particular generator object is a one-use iterator. After it is consumed, spread returns no remaining values. Calling the generator function again creates a fresh one.

## Predict the output

### 19. When does the generator body start?

~~~js
function* start() {
  console.log("body");
  yield "value";
}

const iterator = start();
console.log("called");
iterator.next();
~~~

**Answer:**

~~~text
called
body
~~~

**Explanation:** Calling **start()** creates the generator but does not run its body. The first **next()** starts it.

### 20. What values and completion flags are printed?

~~~js
function* colors() {
  yield "red";
  yield "blue";
}

const iterator = colors();
const first = iterator.next();
const second = iterator.next();
const final = iterator.next();

console.log(first.value, first.done);
console.log(second.value, second.done);
console.log(final.value, final.done);
~~~

**Answer:**

~~~text
red false
blue false
undefined true
~~~

**Explanation:** Each **yield** creates a result with **done: false**. Reaching the end creates a completed result.

### 21. What happens when a generator is consumed twice?

~~~js
function* pair() {
  yield "left";
  yield "right";
}

const iterator = pair();
console.log([...iterator].join(", "));
console.log([...iterator].length);
console.log([...pair()].join(", "));
~~~

**Answer:**

~~~text
left, right
0
left, right
~~~

**Explanation:** The first spread exhausts that generator object. A new call to **pair()** creates a fresh generator.

### 22. Does for...of include a generator's return value?

~~~js
function* result() {
  yield "work";
  return "finished";
}

console.log([...result()].join(", "));
~~~

**Answer:**

~~~text
work
~~~

**Explanation:** The final **return** result has **done: true**, so spread stops without adding its value.

### 23. What value does the final direct next() call receive?

~~~js
function* result() {
  yield "work";
  return "finished";
}

const iterator = result();
iterator.next();
const final = iterator.next();
console.log(final.value, final.done);
~~~

**Answer:**

~~~text
finished true
~~~

**Explanation:** A direct call exposes the final iterator result. The **value** is **"finished"**, and **done** is true.

### 24. What value is sent into the suspended yield expression?

~~~js
function* ask() {
  const answer = yield "question";
  yield "answer: " + answer;
}

const iterator = ask();
console.log(iterator.next("ignored").value);
console.log(iterator.next("yes").value);
~~~

**Answer:**

~~~text
question
answer: yes
~~~

**Explanation:** The first argument is ignored because the generator has not started. The second argument becomes the result of the paused **yield** expression.

### 25. What does the delegated generator produce?

~~~js
function* inner() {
  yield "a";
  yield "b";
  return "complete";
}

function* outer() {
  const final = yield* inner();
  yield final;
}

console.log([...outer()].join(", "));
~~~

**Answer:**

~~~text
a, b, complete
~~~

**Explanation:** **yield\*** forwards **"a"** and **"b"**. The inner generator's final return value becomes the result of **yield\*** and is then yielded by the outer generator.

### 26. What does return() cause?

~~~js
function* tasks() {
  yield "first";
  yield "second";
}

const iterator = tasks();
console.log(iterator.next().value);
const result = iterator.return("cancelled");
console.log(result.value, result.done);
console.log(iterator.next().done);
~~~

**Answer:**

~~~text
first
cancelled true
true
~~~

**Explanation:** **return()** asks the suspended generator to finish with the supplied value. The generator remains completed afterward.

### 27. What does throw() do when the generator catches the error?

~~~js
function* process() {
  try {
    yield "ready";
  } catch (error) {
    yield error.message;
  }
}

const iterator = process();
console.log(iterator.next().value);
console.log(iterator.throw(new Error("invalid")).value);
~~~

**Answer:**

~~~text
ready
invalid
~~~

**Explanation:** The error is injected at the suspended **yield** expression and handled by the generator's **catch** block.

### 28. What happens when throw() is called before the generator starts?

~~~js
function* process() {
  try {
    yield "ready";
  } catch (error) {
    yield "caught";
  }
}

const iterator = process();

try {
  iterator.throw(new Error("early"));
} catch (error) {
  console.log(error.message);
}
~~~

**Answer:**

~~~text
early
~~~

**Explanation:** The generator body has not started, so its **try...catch** is not active. The injected error is thrown to the caller and the generator completes.

### 29. Does finally run when a generator is closed with return()?

~~~js
function* read() {
  try {
    yield "record";
  } finally {
    console.log("cleanup");
  }
}

const iterator = read();
console.log(iterator.next().value);
console.log(iterator.return().done);
~~~

**Answer:**

~~~text
record
cleanup
true
~~~

**Explanation:** Closing the suspended generator runs its **finally** block before the generator reports completion.

### 30. What happens when for...of breaks from a generator?

~~~js
function* items() {
  try {
    yield "one";
    yield "two";
  } finally {
    console.log("closed");
  }
}

for (const item of items()) {
  console.log(item);
  break;
}
~~~

**Answer:**

~~~text
one
closed
~~~

**Explanation:** Breaking out of **for...of** closes the generator. Its **finally** block runs.

### 31. When are the values calculated in this generator?

~~~js
function* squares() {
  for (let number = 1; number <= 3; number += 1) {
    console.log("calculate", number);
    yield number * number;
  }
}

const iterator = squares();
console.log("created");
console.log(iterator.next().value);
~~~

**Answer:**

~~~text
created
calculate 1
1
~~~

**Explanation:** Generator creation is lazy. Only the first value is calculated because the consumer called **next()** once.

### 32. What values are produced by this bounded infinite sequence?

~~~js
function* numbers() {
  let value = 1;
  while (true) {
    yield value++;
  }
}

let count = 0;
for (const value of numbers()) {
  console.log(value);
  count += 1;
  if (count === 3) break;
}
~~~

**Answer:**

~~~text
1
2
3
~~~

**Explanation:** The loop consumes only three values and then breaks. Spreading this generator would never finish.

## Short-answer questions

### 33. What is the difference between a generator function and a generator object?

**Answer:** The generator function is declared with **function\*** and creates generator objects when called. A generator object is the stateful iterator returned from that call.

### 34. What does the first next() call do?

**Answer:** It starts the generator body and runs until the first **yield**, **return**, or the end of the function. Its optional argument is ignored because no **yield** expression has suspended yet.

### 35. How does a generator communicate in both directions?

**Answer:** It sends values to its consumer with **yield**. After it suspends, a later **next(value)** call can send a value back, which becomes the result of the suspended **yield** expression.

### 36. Why does for...of omit a generator's final return value?

**Answer:** The final return result has **done: true**. **for...of** stops when it sees a completed result and yields only results whose **done** property is false.

### 37. What does yield* delegate, and what value does it produce when the delegate finishes?

**Answer:** It delegates iteration to another iterable or iterator. When that iterator completes, its final **value** becomes the result of the **yield\*** expression.

### 38. What is the purpose of a generator's finally block?

**Answer:** It provides cleanup that runs when the generator completes, when **return()** closes it, or when an uncaught error exits it. A **for...of** loop that breaks also closes the generator.

### 39. Why should an infinite generator be consumed with a bound?

**Answer:** Eager consumers such as spread and **Array.from()** keep requesting values until completion. An infinite generator never completes, so the consumer must stop after a known number of values or another condition.

### 40. Can a generator object be traversed from the beginning more than once?

**Answer:** No. A generator object stores its current state and is normally a one-use iterator. Call the generator function again to get a fresh generator object.

## Coding and design questions

### 41. Write a generator that yields the numbers from 1 through 3.

**Answer:**

~~~js
function* countToThree() {
  yield 1;
  yield 2;
  yield 3;
}

console.log([...countToThree()].join(", "));
~~~

Output:

~~~text
1, 2, 3
~~~

**Explanation:** Each **yield** produces the next value. Array spread consumes the generator until it completes.

### 42. Write a generator that receives two values and returns their sum.

**Answer:**

~~~js
function* add() {
  const first = yield "send first value";
  const second = yield "send second value";
  return first + second;
}

const iterator = add();
console.log(iterator.next().value);
console.log(iterator.next(4).value);
const final = iterator.next(6);
console.log(final.value, final.done);
~~~

Output:

~~~text
send first value
send second value
10 true
~~~

**Explanation:** The first **next()** starts the generator. Later calls provide the values that complete each suspended **yield** expression.

### 43. Delegate to an iterable and use its final result.

**Answer:**

~~~js
function* inner() {
  yield "step 1";
  return "done";
}

function* outer() {
  const status = yield* inner();
  yield "status: " + status;
}

console.log([...outer()].join(", "));
~~~

Output:

~~~text
step 1, status: done
~~~

**Explanation:** **yield\*** forwards the inner value. The inner return value is assigned to **status** and used by the outer generator.

### 44. Handle an injected error inside a generator.

**Answer:**

~~~js
function* validate() {
  try {
    yield "waiting";
  } catch (error) {
    yield "invalid: " + error.message;
  }
}

const iterator = validate();
console.log(iterator.next().value);
console.log(iterator.throw(new Error("email")).value);
~~~

Output:

~~~text
waiting
invalid: email
~~~

**Explanation:** The generator must be started and suspended at a **yield** before its **catch** block can receive an error from **throw()**.

### 45. Add cleanup to a generator consumed by a loop.

**Answer:**

~~~js
function* readItems() {
  try {
    yield "item 1";
    yield "item 2";
  } finally {
    console.log("reader released");
  }
}

for (const item of readItems()) {
  console.log(item);
  break;
}
~~~

Output:

~~~text
item 1
reader released
~~~

**Explanation:** The loop's **break** closes the generator, which runs its **finally** block. Use this pattern when a generator holds a resource that must be released after early exit.

## Review checklist

Before moving on, make sure you can explain:

- Why a generator body begins on **next()**, not on the generator function call.
- What **yield** returns and how the generator resumes.
- Why the first **next(value)** argument is ignored.
- How a later **next(value)** supplies the result of a suspended **yield** expression.
- How **return** differs from **yield**.
- What **yield\*** delegates and how it captures a delegate's return value.
- How **return()**, **throw()**, and **finally** affect a suspended generator.
- Why a generator object is a one-use iterator.
- How to consume an infinite generator safely.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [68 - Iterables and the iterator protocol](../lessons/068-iterables-and-the-iterator-protocol.md) | [Open lesson](../lessons/069-generators-and-yield.md) | [Open example](../examples/069-generators-and-yield.md) | [70 - ArrayBuffer, DataView, and typed arrays](../lessons/070-arraybuffer-dataview-and-typed-arrays.md) |
