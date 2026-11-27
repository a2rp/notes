# 69 - Generators and yield: Examples

These examples demonstrate generator creation, lazy execution, yielded and returned values, communication through **next()**, delegation, error handling, and cleanup. Each example includes a task, complete code, expected output, and an explanation.

## 1. Confirm that a generator starts on next()

**Task:** Separate generator creation from generator execution.

~~~js
function* prepare() {
  console.log("body started");
  yield "ready";
}

const iterator = prepare();
console.log("generator created");
console.log(iterator.next().value);
~~~

Expected output:

~~~text
generator created
body started
ready
~~~

**Explanation:** Calling **prepare()** creates a generator object. Its body begins when **next()** is called.

## 2. Pause and resume at several yield expressions

**Task:** Observe how each call to **next()** resumes execution until the next **yield**.

~~~js
function* steps() {
  console.log("step one");
  yield 1;
  console.log("step two");
  yield 2;
  console.log("step three");
}

const iterator = steps();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().done);
~~~

Expected output:

~~~text
step one
1
step two
2
step three
true
~~~

**Explanation:** Each **next()** call continues from the generator's saved position. The last call reaches the end and reports **done: true**.

## 3. Inspect yielded values and completion

**Task:** Read all iterator result fields from a simple generator.

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

Expected output:

~~~text
red false
blue false
undefined true
~~~

**Explanation:** A yielded value has **done: false**. Once the generator reaches the end, the result has **done: true**.

## 4. Consume a generator with for...of

**Task:** Print a generated sequence without manually calling **next()**.

~~~js
function* navigationItems() {
  yield "Home";
  yield "Lessons";
  yield "Contact";
}

for (const item of navigationItems()) {
  console.log(item);
}
~~~

Expected output:

~~~text
Home
Lessons
Contact
~~~

**Explanation:** Generator objects are iterable. **for...of** requests values until the generator completes.

## 5. Observe that a generator object is one-use

**Task:** Consume the same generator object twice, then create a fresh one.

~~~js
function* values() {
  yield 10;
  yield 20;
}

const iterator = values();
console.log([...iterator].join(", "));
console.log([...iterator].length);
console.log([...values()].join(", "));
~~~

Expected output:

~~~text
10, 20
0
10, 20
~~~

**Explanation:** Spread exhausts the generator object. Calling **values()** again creates a new generator with fresh state.

## 6. Compare yield with return

**Task:** See the final result directly and compare it with normal iteration.

~~~js
function* process() {
  yield "working";
  return "finished";
}

const iterator = process();
const yielded = iterator.next();
const final = iterator.next();

console.log(yielded.value, yielded.done);
console.log(final.value, final.done);
console.log([...process()].join(", "));
~~~

Expected output:

~~~text
working false
finished true
working
~~~

**Explanation:** **yield** produces an iterable value with **done: false**. **return** completes the generator, so **for...of** and spread do not include its return value.

## 7. Send data into a suspended yield expression

**Task:** Ask for a value and send the answer back to the generator.

~~~js
function* greet() {
  const name = yield "Enter a name";
  yield "Hello, " + name;
}

const conversation = greet();
console.log(conversation.next("ignored").value);
console.log(conversation.next("Mina").value);
~~~

Expected output:

~~~text
Enter a name
Hello, Mina
~~~

**Explanation:** The argument to the first **next()** is ignored because the generator has not paused yet. The next call supplies the value for the suspended **yield** expression.

## 8. Use a generator as a two-way data flow

**Task:** Receive two numbers and return their sum.

~~~js
function* addNumbers() {
  const first = yield "first number";
  const second = yield "second number";
  return first + second;
}

const addition = addNumbers();
console.log(addition.next().value);
console.log(addition.next(4).value);
const final = addition.next(6);
console.log(final.value, final.done);
~~~

Expected output:

~~~text
first number
second number
10 true
~~~

**Explanation:** The first call starts the generator. The next two calls provide the values that become the results of the paused **yield** expressions.

## 9. Yield a computed sequence

**Task:** Generate the first four square numbers.

~~~js
function* squares(count) {
  for (let number = 1; number <= count; number += 1) {
    yield number * number;
  }
}

console.log([...squares(4)].join(", "));
~~~

Expected output:

~~~text
1, 4, 9, 16
~~~

**Explanation:** The loop computes and yields a square only when the consumer requests the next value.

## 10. Delegate to an array with yield*

**Task:** Insert another iterable's values into the sequence.

~~~js
function* topics() {
  yield "HTML";
  yield* ["CSS", "JavaScript"];
  yield "Accessibility";
}

console.log([...topics()].join(", "));
~~~

Expected output:

~~~text
HTML, CSS, JavaScript, Accessibility
~~~

**Explanation:** **yield\*** delegates to the array's iterator and yields each of its values from the outer generator.

## 11. Capture a delegated generator's return value

**Task:** Use the inner generator's return value after delegated iteration finishes.

~~~js
function* readStatus() {
  yield "reading";
  return "complete";
}

function* report() {
  const status = yield* readStatus();
  yield "status: " + status;
}

console.log([...report()].join(", "));
~~~

Expected output:

~~~text
reading, status: complete
~~~

**Explanation:** **yield\*** forwards the inner yielded value. When the inner generator completes, its final return value becomes the result of the **yield\*** expression.

## 12. Inject and catch an error with throw()

**Task:** Send an error into a generator suspended at **yield**.

~~~js
function* validateInput() {
  try {
    yield "waiting for input";
  } catch (error) {
    yield "invalid: " + error.message;
  }

  yield "ready for another step";
}

const validator = validateInput();
console.log(validator.next().value);
console.log(validator.throw(new Error("missing value")).value);
console.log(validator.next().value);
~~~

Expected output:

~~~text
waiting for input
invalid: missing value
ready for another step
~~~

**Explanation:** **throw()** injects the error at the suspended **yield** expression. The generator catches it and continues.

## 13. Catch an error that escapes from a generator

**Task:** Handle an error thrown during a later **next()** call.

~~~js
function* riskySteps() {
  yield "started";
  throw new Error("step failed");
}

const iterator = riskySteps();
console.log(iterator.next().value);

try {
  iterator.next();
} catch (error) {
  console.log(error.message);
}

console.log(iterator.next().done);
~~~

Expected output:

~~~text
started
step failed
true
~~~

**Explanation:** The generator body resumes during the second **next()**, where it throws. Once an uncaught error exits the generator, the generator is completed.

## 14. Close a generator with return()

**Task:** Stop a generator at its first suspension point.

~~~js
function* tasks() {
  yield "task one";
  yield "task two";
}

const iterator = tasks();
console.log(iterator.next().value);
const result = iterator.return("cancelled");
console.log(result.value, result.done);
console.log(iterator.next().done);
~~~

Expected output:

~~~text
task one
cancelled true
true
~~~

**Explanation:** **return()** asks the suspended generator to complete with the supplied value. It does not resume ordinary statements after the suspension point.

## 15. Call return() before a generator starts

**Task:** Verify that closing a suspended-start generator does not run its body.

~~~js
function* task() {
  console.log("body ran");
  yield "task";
}

const iterator = task();
const result = iterator.return("closed early");

console.log(result.value, result.done);
~~~

Expected output:

~~~text
closed early true
~~~

**Explanation:** The generator body never started, so the log inside it does not run. The generator immediately completes with the return value.

## 16. Run finally when return() closes a generator

**Task:** Release a resource when the generator is explicitly closed.

~~~js
function* readRecords() {
  try {
    yield "record";
  } finally {
    console.log("resource released");
  }
}

const records = readRecords();
console.log(records.next().value);
console.log(records.return().done);
~~~

Expected output:

~~~text
record
resource released
true
~~~

**Explanation:** The generator's **finally** block runs while **return()** completes the suspended generator.

## 17. Run finally when for...of breaks

**Task:** Stop a loop early and observe generator cleanup.

~~~js
function* readPages() {
  try {
    yield "page one";
    yield "page two";
  } finally {
    console.log("reader closed");
  }
}

for (const page of readPages()) {
  console.log(page);
  break;
}
~~~

Expected output:

~~~text
page one
reader closed
~~~

**Explanation:** **for...of** closes the generator when **break** exits the loop. The generator's **finally** block can release resources.

## 18. Yield from inside a finally block

**Task:** Observe that a **finally** block can suspend before a pending return completes.

~~~js
function* closeSequence() {
  try {
    yield "active";
  } finally {
    yield "cleanup started";
  }
}

const iterator = closeSequence();
console.log(iterator.next().value);
const closing = iterator.return("closed");
console.log(closing.value, closing.done);
const finished = iterator.next();
console.log(finished.value, finished.done);
~~~

Expected output:

~~~text
active
cleanup started false
closed true
~~~

**Explanation:** The **return()** request enters the **finally** block. Since that block yields, the generator pauses again with **done: false**. The next call resumes cleanup and completes the pending return.

## 19. See lazy evaluation one value at a time

**Task:** Log when each value is calculated and request only two values.

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
console.log(iterator.next().value);
~~~

Expected output:

~~~text
created
calculate 1
1
calculate 2
4
~~~

**Explanation:** Creating the generator performs no calculations. Each **next()** call calculates only the value needed at that point.

## 20. Build a generator method that makes an object iterable

**Task:** Define the iteration behavior for a custom object.

~~~js
const shelf = {
  books: ["Small Worlds", "Open Pages"],

  *[Symbol.iterator]() {
    for (const book of this.books) {
      yield book;
    }
  }
};

console.log([...shelf].join(" | "));
~~~

Expected output:

~~~text
Small Worlds | Open Pages
~~~

**Explanation:** The generator method implements **[Symbol.iterator]()**. The object is now directly usable with iteration syntax.

## 21. Compose generators with delegation

**Task:** Build a sequence from two smaller generator functions.

~~~js
function* letters() {
  yield "a";
  yield "b";
}

function* numbers() {
  yield 1;
  yield 2;
}

function* mixed() {
  yield* letters();
  yield* numbers();
}

console.log([...mixed()].join(", "));
~~~

Expected output:

~~~text
a, b, 1, 2
~~~

**Explanation:** Each **yield\*** delegates to another generator. The outer generator exposes their values in order.

## 22. Generate an unbounded sequence safely

**Task:** Produce natural numbers, but consume only four of them.

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

Expected output:

~~~text
1
2
3
4
~~~

**Explanation:** The generator can keep producing values, but the loop places a bound on consumption. Do not spread this infinite generator.

## 23. Generate entries for a collection

**Task:** Yield key and value pairs, then build a map from the generator.

~~~js
function* settings() {
  yield ["theme", "dark"];
  yield ["fontSize", 16];
}

const preferences = new Map(settings());
console.log(preferences.get("theme"));
console.log(preferences.get("fontSize"));
~~~

Expected output:

~~~text
dark
16
~~~

**Explanation:** A generator is an iterable. The **Map** constructor consumes its yielded pairs as entries.

## 24. Handle an empty generator

**Task:** Check the iterator result when a generator has no yield or return statement.

~~~js
function* empty() {}

const result = empty().next();
console.log(result.value);
console.log(result.done);
~~~

Expected output:

~~~text
undefined
true
~~~

**Explanation:** The first call runs directly to the end of the function. With no yielded or returned value, the result value is **undefined** and the generator is complete.

## Review checklist

For each example, make sure you can identify:

- When the generator body begins and where it pauses.
- Whether the observed value came from **yield** or **return**.
- How a value passed to **next()** is received.
- Whether **yield\*** is delegating and capturing a final value.
- When **return()** or **throw()** changes execution.
- Which code runs during generator cleanup.
- Whether a consumer exhausts the generator or stops after a bound.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [68 - Iterables and the iterator protocol](../lessons/068-iterables-and-the-iterator-protocol.md) | [Open lesson](../lessons/069-generators-and-yield.md) | [Open Q&A](../qnas/069-generators-and-yield.md) | [70 - ArrayBuffer, DataView, and typed arrays](../lessons/070-arraybuffer-dataview-and-typed-arrays.md) |
