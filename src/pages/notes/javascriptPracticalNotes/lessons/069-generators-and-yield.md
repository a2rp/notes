# 69 - Generators and yield

A **generator function** is a function that can pause and resume. It is written with **function\*** and uses **yield** to produce values over time. Calling a generator function creates a generator object, but does not run the function body immediately. Each call to the generator object's **next()** method resumes the body until it reaches the next **yield**, a **return**, or the end of the function.

A generator object follows both the iterator and iterable protocols. This makes generators a convenient way to create custom sequences without manually writing **next()** and iterator result objects.

## Learning goals

By the end of this chapter, you should be able to:

- Declare generator functions, generator expressions, and generator methods.
- Explain why calling a generator function does not immediately execute its body.
- Use **yield** to pause and produce iterator results.
- Use the value passed to **next()** as the result of a suspended **yield** expression.
- Distinguish yielded values from a generator's final **return** value.
- Delegate iteration with **yield\***.
- Use **return()** and **throw()** to control a generator.
- Run cleanup with **try...finally** when a generator is closed.
- Use generators as lazy, single-use iterables and recognize their limits.

## Declare and call a generator function

Add an asterisk after **function** to declare a generator function. Calling it returns a generator object.

~~~js
function* createLetters() {
  console.log("generator started");
  yield "A";
  yield "B";
}

const letters = createLetters();
console.log("generator created");
console.log(letters.next().value);
console.log(letters.next().value);
~~~

Output:

~~~text
generator created
generator started
A
B
~~~

The body starts only when **next()** is called. When execution reaches **yield**, the generator pauses and returns an iterator result with **done: false**.

A generator function is not an iterator. It is a function that creates a generator object. The generator object is the iterator.

~~~js
function* oneValue() {
  yield "ready";
}

const generator = oneValue();

console.log(typeof oneValue);
console.log(typeof generator.next);
console.log(generator[Symbol.iterator]() === generator);
~~~

Output:

~~~text
function
function
true
~~~

The generator object has **next()** and is itself iterable. Its **[Symbol.iterator]()** method returns the same object, so it is a one-use iterator.

## Generator function forms

A generator declaration is one common form:

~~~js
function* count() {
  yield 1;
  yield 2;
}
~~~

A generator expression can be assigned to a variable:

~~~js
const count = function* () {
  yield 1;
  yield 2;
};
~~~

An object or class can define a generator method:

~~~js
const sequence = {
  *values() {
    yield "first";
    yield "second";
  }
};

console.log([...sequence.values()].join(", "));
~~~

Output:

~~~text
first, second
~~~

There is no arrow-function form of a generator. A generator function needs the **function\*** or generator method syntax.

## yield pauses execution and produces a value

Each **yield** pauses the generator and produces an iterator result. The generator's local variables and execution position are preserved until it resumes.

~~~js
function* steps() {
  console.log("step 1 starts");
  yield "first value";
  console.log("step 2 starts");
  yield "second value";
  console.log("step 3 starts");
}

const iterator = steps();
console.log("before next");
console.log(iterator.next().value);
console.log("between next calls");
console.log(iterator.next().value);
console.log(iterator.next().done);
~~~

Output:

~~~text
before next
step 1 starts
first value
between next calls
step 2 starts
second value
step 3 starts
true
~~~

Execution proceeds only as far as necessary to provide the next result. The last **next()** resumes after the second **yield**, reaches the end of the function, and returns a completed iterator result.

## Inspect generator results

The generator object follows the iterator protocol. **next()** returns an object with a **value** and a **done** property.

~~~js
function* colors() {
  yield "red";
  yield "blue";
}

const iterator = colors();

const first = iterator.next();
const second = iterator.next();
const finished = iterator.next();

console.log(first.value, first.done);
console.log(second.value, second.done);
console.log(finished.value, finished.done);
~~~

Output:

~~~text
red false
blue false
undefined true
~~~

After the generator completes, later **next()** calls keep returning a completed result. They do not restart the function.

~~~js
function* onlyOnce() {
  yield "value";
}

const iterator = onlyOnce();
console.log(iterator.next().value);
console.log(iterator.next().done);
console.log(iterator.next().done);
~~~

Output:

~~~text
value
true
true
~~~

Call the generator function again to create a fresh generator object.

## Consume generator values with for...of

Because a generator object is iterable, it works with **for...of**, array spread, destructuring, **Array.from()**, and other synchronous iterable consumers.

~~~js
function* menu() {
  yield "Home";
  yield "Lessons";
  yield "About";
}

for (const item of menu()) {
  console.log(item);
}
~~~

Output:

~~~text
Home
Lessons
About
~~~

Each call to **menu()** returns a new generator. A particular generator object can be consumed only once.

~~~js
function* values() {
  yield 10;
  yield 20;
}

const generator = values();
console.log([...generator].join(", "));
console.log([...generator].length);
console.log([...values()].join(", "));
~~~

Output:

~~~text
10, 20
0
10, 20
~~~

The first spread consumes **generator**. The second spread has no values remaining. Calling **values()** again creates a new generator.

## A generator's return value is not a yielded value

A **return** statement completes the generator and supplies the final iterator result's **value**. It is different from **yield**, which produces a value with **done: false**.

~~~js
function* report() {
  yield "processing";
  return "complete";
}

const iterator = report();
const first = iterator.next();
const final = iterator.next();

console.log(first.value, first.done);
console.log(final.value, final.done);
~~~

Output:

~~~text
processing false
complete true
~~~

Normal **for...of**, spread, and **Array.from()** stop when **done** is true. They do not include the generator's final return value.

~~~js
function* report() {
  yield "processing";
  return "complete";
}

console.log([...report()].join(", "));
~~~

Output:

~~~text
processing
~~~

If the final return value matters, inspect the result from a direct call to **next()**.

## Send a value into a suspended generator

Calling **next(value)** resumes a generator. The value passed to **next()** becomes the result of the **yield** expression where the generator was paused.

~~~js
function* askForName() {
  const name = yield "What is your name?";
  yield "Hello, " + name;
}

const conversation = askForName();

console.log(conversation.next("ignored").value);
console.log(conversation.next("Mira").value);
console.log(conversation.next().done);
~~~

Output:

~~~text
What is your name?
Hello, Mira
true
~~~

The first **next()** starts the generator. No **yield** expression has paused yet, so an argument passed to that first call is ignored. The second call supplies **"Mira"** as the value of the suspended **yield** expression.

This pattern makes a generator a two-way communication channel. It can yield values out and receive values back in.

~~~js
function* runningTotal() {
  let total = 0;
  total += yield total;
  total += yield total;
  return total;
}

const total = runningTotal();

console.log(total.next().value);
console.log(total.next(5).value);
console.log(total.next(3));
~~~

Output:

~~~text
0
5
{ value: 8, done: true }
~~~

The first call starts at the first **yield** and produces **0**. The next call supplies **5** to that suspended expression, and the generator adds it to the total. The third call supplies **3**, then the generator returns the final total.

## Use yield in expressions

A **yield** expression can appear as part of a larger expression. The expression pauses while yielding its value and evaluates to the value passed by the next **next()** call when resumed.

~~~js
function* addValues() {
  const first = yield "first number";
  const second = yield "second number";
  return first + second;
}

const addition = addValues();
console.log(addition.next().value);
console.log(addition.next(4).value);
console.log(addition.next(6));
~~~

Output:

~~~text
first number
second number
{ value: 10, done: true }
~~~

The yielded prompts are outputs. The values sent through **next(4)** and **next(6)** become the results of the corresponding **yield** expressions.

## Delegate with yield*

Use **yield\*** to delegate to another iterable or iterator. The outer generator yields each delegated value in order.

~~~js
function* allTopics() {
  yield "HTML";
  yield* ["CSS", "JavaScript"];
  yield "Accessibility";
}

console.log([...allTopics()].join(", "));
~~~

Output:

~~~text
HTML, CSS, JavaScript, Accessibility
~~~

The outer generator pauses while the delegated iterator produces values. **yield\*** works with any iterable, not only another generator.

A delegated generator's final return value becomes the value of the **yield\*** expression.

~~~js
function* inner() {
  yield "first";
  yield "second";
  return "inner result";
}

function* outer() {
  const result = yield* inner();
  yield "received: " + result;
}

console.log([...outer()].join(", "));
~~~

Output:

~~~text
first, second, received: inner result
~~~

The inner generator's yielded values are delegated outward. Its final return value is assigned to **result** and is then used by the outer generator.

## Use generator methods next(), return(), and throw()

Generator objects provide three control methods:

- **next(value)** resumes execution and optionally supplies a value to the suspended **yield** expression.
- **return(value)** asks the generator to finish as if a **return** statement were reached at its current pause.
- **throw(error)** resumes the generator by throwing a value at the suspended **yield** expression.

### Stop a generator with return()

~~~js
function* tasks() {
  yield "task 1";
  yield "task 2";
  yield "task 3";
}

const iterator = tasks();
console.log(iterator.next().value);
console.log(iterator.return("cancelled"));
console.log(iterator.next().done);
~~~

Output:

~~~text
task 1
{ value: 'cancelled', done: true }
true
~~~

The generator is closed by **return()**. Code after the current pause is skipped, except that **finally** blocks are still run.

### Inject an error with throw()

~~~js
function* processInput() {
  try {
    yield "ready";
  } catch (error) {
    yield "handled: " + error.message;
  }

  yield "finished";
}

const processor = processInput();
console.log(processor.next().value);
console.log(processor.throw(new Error("invalid input")).value);
console.log(processor.next().value);
~~~

Output:

~~~text
ready
handled: invalid input
finished
~~~

The error is thrown at the suspended **yield** expression. The generator's **catch** block handles it and may continue yielding values.

If the generator does not catch the injected error, the call to **throw()** throws to its caller and the generator becomes completed.

## Run cleanup with try...finally

A **finally** block runs when the generator finishes normally, receives a **return()** request, or exits because of an uncaught error. This is useful when a generator manages a resource.

~~~js
function* readRecords() {
  try {
    yield "record 1";
    yield "record 2";
  } finally {
    console.log("release resource");
  }
}

const records = readRecords();
console.log(records.next().value);
console.log(records.return().done);
~~~

Output:

~~~text
record 1
release resource
true
~~~

The generator pauses at the first **yield**. Calling **return()** begins completion, which runs the **finally** block before the generator reports it is done.

A **for...of** loop also closes a generator when it exits early. This means a loop's **break** can trigger the generator's **finally** block.

~~~js
function* readPages() {
  try {
    yield "page 1";
    yield "page 2";
  } finally {
    console.log("reader closed");
  }
}

for (const page of readPages()) {
  console.log(page);
  break;
}
~~~

Output:

~~~text
page 1
reader closed
~~~

## Create lazy sequences

A generator computes a value only when a consumer asks for it. This is called **lazy evaluation**. It can be useful for large sequences, streams, or values that are expensive to calculate.

~~~js
function* squares(limit) {
  for (let number = 1; number <= limit; number += 1) {
    console.log("calculate", number);
    yield number * number;
  }
}

const sequence = squares(3);
console.log("generator created");
console.log(sequence.next().value);
console.log(sequence.next().value);
~~~

Output:

~~~text
generator created
calculate 1
1
calculate 2
4
~~~

The third square has not been calculated because the consumer has not requested it. If the consumer never asks for another value, the remaining work is not performed.

Generators can represent infinite sequences because they do not have to build all values at once. Consumers must still limit an infinite sequence.

~~~js
function* naturalNumbers() {
  let number = 1;
  while (true) {
    yield number;
    number += 1;
  }
}

let count = 0;
for (const number of naturalNumbers()) {
  console.log(number);
  count += 1;

  if (count === 4) {
    break;
  }
}
~~~

Output:

~~~text
1
2
3
4
~~~

Do not spread an infinite generator or pass it to an eager consumer such as **Array.from()**. Those operations wait for the sequence to finish.

## Use a generator method on an object

A generator method can provide a custom iteration order for an object.

~~~js
const library = {
  books: ["The Long Way", "Small Worlds"],

  *[Symbol.iterator]() {
    for (const book of this.books) {
      yield book;
    }
  }
};

console.log([...library].join(" | "));
~~~

Output:

~~~text
The Long Way | Small Worlds
~~~

The generator method is the object's **[Symbol.iterator]()** implementation. The object itself can now be used with **for...of** and spread.

## Generators and errors

Errors thrown inside a generator appear when a consumer resumes the generator. Creating the generator does not execute the body, so it does not throw an error from code that has not started yet.

~~~js
function* riskySteps() {
  yield "started";
  throw new Error("step failed");
}

const steps = riskySteps();
console.log(steps.next().value);

try {
  steps.next();
} catch (error) {
  console.log(error.message);
}
~~~

Output:

~~~text
started
step failed
~~~

Wrap the call that resumes the generator in **try...catch** when the generator can throw. A **try...catch** around only the generator function call will not catch an error that occurs later during **next()**.

## Common mistakes

### Expecting the function body to run when it is called

Calling a generator function creates a generator object. Its body begins on the first **next()** call.

### Expecting yield to finish the generator

**yield** pauses and produces a value. The generator can resume later. **return** or reaching the end completes it.

### Passing a value to the first next() call

The first **next(value)** starts the generator. Its argument is not received by a **yield** expression because the generator has not paused yet.

### Expecting a generator's return value in for...of

A normal iterator consumer stops on **done: true**. The generator's final **return** value is not included among the yielded values.

### Reusing an exhausted generator object

A generator object is a one-use iterator. Call the generator function again for a fresh sequence.

### Spreading an infinite generator

Spread consumes until completion. An infinite generator does not complete, so the operation does not finish.

### Forgetting cleanup when a consumer exits early

Use **try...finally** inside the generator when cleanup must happen after a **return()** request or when **for...of** closes the generator.

## Try it yourself

1. Write a generator that yields three messages and observe exactly when its body starts.
2. Inspect **value** and **done** from each **next()** call.
3. Use **for...of** and spread to consume a generator.
4. Add a **return** statement and compare its final result with a yielded value.
5. Send a value into a suspended **yield** expression with **next(value)**.
6. Delegate to an array with **yield\*** and then to another generator.
7. Use **return()** to stop a generator and verify that its **finally** block runs.
8. Use **throw()** to inject an error into a generator's **try...catch** block.
9. Make a lazy sequence of squares and log when each square is calculated.
10. Make an infinite sequence and consume only a fixed number of values.
11. Add a generator method at **[Symbol.iterator]()** to make a custom object iterable.
12. Explain why a generator function call and a generator object are different values.

## Key points

- A generator function is declared with **function\*** or generator method syntax.
- Calling a generator function returns a generator object without running its body.
- **yield** pauses execution and returns an iterator result with **done: false**.
- Calling **next(value)** resumes execution, and after the first call the value can become the result of a suspended **yield** expression.
- A generator object is both an iterator and an iterable, and it is normally consumed only once.
- **return** completes a generator. Its final value is not yielded by **for...of** or spread.
- **yield\*** delegates to another iterable and evaluates to its completion value.
- **return()** and **throw()** can control a suspended generator.
- **try...finally** supports cleanup when a generator completes or is closed.
- Generators produce values lazily, but an infinite sequence still needs a bounded consumer.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [68 - Iterables and the iterator protocol](068-iterables-and-the-iterator-protocol.md) | [Open Q&A](../qnas/069-generators-and-yield.md) | [Open example](../examples/069-generators-and-yield.md) | [70 - ArrayBuffer, DataView, and typed arrays](070-arraybuffer-dataview-and-typed-arrays.md) |
