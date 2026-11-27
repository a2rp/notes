# 68 - Iterables and the iterator protocol

JavaScript uses a shared protocol to let different kinds of values provide a sequence of values. Arrays, strings, maps, sets, and many browser and platform objects are **iterable**. Language features such as **for...of**, array spread, and array destructuring consume iterables through this protocol.

An iterable is a value that can create an iterator. An iterator is the object that produces values one at a time. Understanding this distinction helps you use built-in collections, create custom sequences, and avoid accidentally exhausting a one-use iterator.

## Learning goals

By the end of this chapter, you should be able to:

- Distinguish an iterable from an iterator.
- Explain the roles of **Symbol.iterator**, **next()**, **value**, and **done**.
- Consume iterables with **for...of**, spread, destructuring, and collection constructors.
- Identify common built-in iterables and understand how strings iterate Unicode code points.
- Create reusable iterable objects and one-use iterator objects.
- Compare an iterable with an array-like object.
- Close an iterator safely when a loop stops early.
- Recognize modern iterator helper methods and account for runtime support.

## The iterable and iterator are different roles

An **iterable** provides a method at **Symbol.iterator**. Calling that method returns an **iterator**.

An **iterator** provides a **next()** method. Each call returns an iterator result object with a **value** and a **done** property.

| Role | Required behavior | Example |
| --- | --- | --- |
| Iterable | Its **[Symbol.iterator]()** method returns an iterator | An array, string, or custom range |
| Iterator | Its **next()** method returns an iterator result | The object returned by **array[Symbol.iterator]()** |
| Iterator result | Its **done** property indicates whether iteration is finished | **{ value: "red", done: false }** |

A value can serve as both an iterable and an iterator, but the roles do not have to be the same object. Built-in arrays are reusable iterable sources. Each call to an array's **Symbol.iterator** method creates a fresh iterator with its own position.

~~~js
const colors = ["red", "green"];
const firstIterator = colors[Symbol.iterator]();
const secondIterator = colors[Symbol.iterator]();

console.log(firstIterator.next().value);
console.log(firstIterator.next().value);
console.log(secondIterator.next().value);
~~~

Output:

~~~text
red
green
red
~~~

The first iterator advanced twice. The second iterator has its own position and still begins at the first array element.

## The synchronous iterator protocol

An iterable object follows this general shape:

~~~js
const iterable = {
  [Symbol.iterator]() {
    return iterator;
  }
};
~~~

The returned iterator follows this shape:

~~~js
const iterator = {
  next() {
    return {
      value: nextValue,
      done: isFinished
    };
  }
};
~~~

The protocol requires these behaviors:

1. **[Symbol.iterator]** must be a function that returns an object.
2. The returned object must have a callable **next()** method.
3. Each call to **next()** must return an object. It may have **value** and **done** properties.
4. **done** is converted to a Boolean. When it is truthy, the sequence is complete.
5. Once an iterator reports **done: true**, later calls should continue to report completion.

A **value** is most useful while **done** is false. The value returned with **done: true** is ignored by normal **for...of** iteration.

~~~js
const iterator = {
  position: 1,

  next() {
    if (this.position <= 2) {
      return { value: this.position++, done: false };
    }

    return { value: undefined, done: true };
  }
};

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
~~~

Output:

~~~text
{ value: 1, done: false }
{ value: 2, done: false }
{ value: undefined, done: true }
{ value: undefined, done: true }
~~~

The last call continues to report that the iterator is finished. A protocol consumer expects iterator results to be objects. Returning a number or **null** from **next()** is invalid.

~~~js
const brokenIterator = {
  next() {
    return 1;
  }
};

try {
  [...{
    [Symbol.iterator]() {
      return brokenIterator;
    }
  }];
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

## Consume an iterable with for...of

**for...of** requests an iterator and repeatedly calls **next()**. It assigns each yielded **value** to the loop variable and stops when **done** becomes true.

~~~js
const scores = [72, 88, 95];

for (const score of scores) {
  console.log(score);
}
~~~

Output:

~~~text
72
88
95
~~~

The loop does not need to know whether the source is an array, set, string, or custom iterable. It only needs the iterable protocol.

Use **for...of** when you want values from an iterable. **for...in** has a different purpose: it enumerates enumerable string property names, usually object keys. It is not a substitute for **for...of**.

~~~js
const letters = ["a", "b"];

for (const value of letters) {
  console.log("value:", value);
}

for (const key in letters) {
  console.log("key:", key);
}
~~~

Output:

~~~text
value: a
value: b
key: 0
key: 1
~~~

For arrays, **for...in** gives property keys such as **"0"** and **"1"**, not the array's values. It can also include enumerable properties added to the array or inherited from its prototype, so use array methods or **for...of** for values.

## Consume iterables with other language features

Several JavaScript operations use the synchronous iterator protocol.

| Feature | How it consumes an iterable |
| --- | --- |
| **for...of** | Reads values until the iterator is complete |
| **[...iterable]** | Reads all values and puts them in a new array |
| **const [first, second] = iterable** | Reads only the values needed by the pattern |
| **new Set(iterable)** | Reads values and adds them to a set |
| **new Map(iterable)** | Reads entries that each provide a key and value |
| **Array.from(iterable)** | Reads values into a new array |
| **Promise.all(iterable)** | Reads promises or values and returns a promise for their results |

~~~js
const source = new Set(["HTML", "CSS", "JavaScript"]);
const [first, second] = source;
const copy = [...source];
const anotherSet = new Set(source);

console.log(first);
console.log(second);
console.log(copy.join(", "));
console.log(anotherSet.size);
~~~

Output:

~~~text
HTML
CSS
HTML, CSS, JavaScript
3
~~~

These operations request values from an iterator. A finite iterable is usually safe to spread into an array. Spreading an infinite iterable never completes and can exhaust memory, so use a bounded loop or stop condition for an unbounded sequence.

~~~js
const endless = {
  [Symbol.iterator]() {
    let number = 1;

    return {
      next() {
        return { value: number++, done: false };
      }
    };
  }
};

let count = 0;
for (const value of endless) {
  console.log(value);
  count += 1;

  if (count === 3) {
    break;
  }
}
~~~

Output:

~~~text
1
2
3
~~~

The **break** ends the loop after three values. Do not write **[...endless]** because this iterator never reports completion.

## Built-in iterable values

Common built-in iterables include:

- **Array** and array subclasses. The default iterator yields array values in order.
- **String**. Its iterator yields Unicode code points.
- **Map**. Its default iterator yields **[key, value]** pairs in insertion order.
- **Set**. Its default iterator yields values in insertion order.
- **Typed arrays**. Their default iterator yields numeric elements.
- **Arguments objects** in current JavaScript environments.
- **Many platform collections**, such as DOM node collections in modern browsers.

~~~js
const map = new Map([
  ["language", "JavaScript"],
  ["level", "beginner"]
]);

const set = new Set(["red", "green"]);

for (const [key, value] of map) {
  console.log(key + ": " + value);
}

for (const value of set) {
  console.log(value);
}
~~~

Output:

~~~text
language: JavaScript
level: beginner
red
green
~~~

The **Map** iterator yields entry pairs, which is why array destructuring can bind the key and value in each loop iteration. A **Set** iterator yields its values.

## Strings iterate Unicode code points

A string's iterator handles Unicode code points instead of yielding one UTF-16 code unit at a time. This is different from **string[index]**, which accesses a code unit.

~~~js
const face = "😀";

console.log(face.length);
console.log(face[0]);
console.log([...face].length);
console.log([...face][0]);
~~~

Output:

~~~text
2
\uD83D
1
😀
~~~

The emoji is represented by two UTF-16 code units, so **length** is **2** and indexed access returns only the first code unit. Iteration produces one Unicode code point.

Unicode code points are not the same as user-perceived characters, also called grapheme clusters. A visible character can be composed of multiple code points, such as a base letter plus a combining mark or a joined emoji sequence. The iterator protocol does not perform grapheme segmentation.

~~~js
const family = "👨‍👩‍👧‍👦";

console.log([...family].length);
console.log([...family].join(" | "));
~~~

Output:

~~~text
7
👨 | ‍ | 👩 | ‍ | 👧 | ‍ | 👦
~~~

The sequence contains several code points joined by zero-width joiners. A font may display them as one family emoji, but string iteration still yields the individual code points.

## Manually read an iterator

Calling **next()** directly lets you control consumption one value at a time.

~~~js
const iterator = ["first", "second"][Symbol.iterator]();

const firstResult = iterator.next();
const secondResult = iterator.next();
const finishedResult = iterator.next();

console.log(firstResult.value, firstResult.done);
console.log(secondResult.value, secondResult.done);
console.log(finishedResult.value, finishedResult.done);
~~~

Output:

~~~text
first false
second false
undefined true
~~~

A manual loop must check **done** before using the value.

~~~js
const iterator = [10, 20, 30][Symbol.iterator]();
let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
~~~

Output:

~~~text
10
20
30
~~~

A **for...of** loop usually expresses this more clearly. Manual calls are useful when you need to inspect iterator results or build a protocol implementation.

## Build a reusable iterable

A reusable iterable creates a new iterator each time its **[Symbol.iterator]()** method is called. This **Range** object produces the same values on every iteration.

~~~js
const range = {
  start: 2,
  end: 5,

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...range].join(", "));
console.log([...range].join(", "));
~~~

Output:

~~~text
2, 3, 4, 5
2, 3, 4, 5
~~~

The **current** variable is created inside **[Symbol.iterator]()**. Each call creates a new variable and a new iterator, so the two passes do not share their position.

## Build an iterable iterator

Some values use the same object for both roles. The iterator's **[Symbol.iterator]()** method returns **this**, making the iterator itself iterable.

~~~js
function createCountdown(start) {
  let current = start;

  return {
    next() {
      if (current > 0) {
        return { value: current--, done: false };
      }

      return { value: undefined, done: true };
    },

    [Symbol.iterator]() {
      return this;
    }
  };
}

const countdown = createCountdown(3);
console.log([...countdown].join(", "));
console.log([...countdown].join(", "));
~~~

Output:

~~~text
3, 2, 1
~~~

The second spread produces no values because the iterator has already been exhausted. Returning **this** from **[Symbol.iterator]()** makes an iterator acceptable anywhere an iterable is required, but it does not reset the iterator.

## Iterable versus array-like

An **array-like** object has a numeric **length** property and indexed properties. That shape alone does not make it iterable.

~~~js
const arrayLike = {
  0: "alpha",
  1: "beta",
  length: 2
};

console.log(Array.from(arrayLike).join(", "));

try {
  console.log([...arrayLike]);
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
alpha, beta
true
~~~

**Array.from()** accepts either an iterable or an array-like object. Array spread requires an iterable. To make an array-like object work with **for...of** or spread, give it a **[Symbol.iterator]()** method.

Do not assume every object with indexes can be used by **for...of**. Check whether the value implements the protocol or convert it with an appropriate API.

## Iterator closing and cleanup

When a **for...of** loop exits early with **break**, **return**, or an exception, the language checks for a **return()** method on the iterator and calls it if present. An iterator can use that method to release a resource or record that iteration ended early.

~~~js
const source = {
  [Symbol.iterator]() {
    let value = 1;

    return {
      next() {
        return { value: value++, done: false };
      },

      return() {
        console.log("iterator closed");
        return { value: undefined, done: true };
      }
    };
  }
};

for (const value of source) {
  console.log(value);
  break;
}
~~~

Output:

~~~text
1
iterator closed
~~~

The **return()** method is optional. If it exists, it should return an object, usually an iterator result with **done: true**. For example, an iterator that wraps a file reader could close the reader in **return()** when the loop stops before reaching the end.

A **continue** statement does not close the iterator because the loop continues. Normal completion after **done: true** does not need early cleanup.

## Exceptions and iterator cleanup

If processing a value throws inside a **for...of** loop, iterator closing is attempted before the error continues outward.

~~~js
const events = [];
const source = {
  [Symbol.iterator]() {
    let value = 1;

    return {
      next() {
        return { value: value++, done: false };
      },
      return() {
        events.push("closed");
        return { done: true };
      }
    };
  }
};

try {
  for (const value of source) {
    if (value === 2) {
      throw new Error("stop");
    }
  }
} catch (error) {
  events.push(error.message);
}

console.log(events.join(", "));
~~~

Output:

~~~text
closed, stop
~~~

Iterator closing is part of the iteration protocol's resource cleanup behavior. A manually written loop that calls **next()** itself does not automatically get the same **for...of** closing behavior. If your manual consumer can stop early, call the iterator's **return()** method when appropriate, usually inside a **finally** block.

## Iterator helper methods in modern JavaScript

Modern JavaScript includes an **Iterator** global and helper methods on iterator objects in current runtimes. These methods can transform iterator values lazily, which means values are processed as they are requested rather than all being stored in an intermediate array.

Common helpers include:

- **map(mapper)** and **filter(predicate)** for lazy transformations.
- **take(limit)** and **drop(limit)** for limiting or skipping values.
- **flatMap(mapper)** for mapping each value to another iterable and flattening one level.
- **toArray()** for consuming the iterator into an array.
- **reduce()**, **forEach()**, **some()**, **every()**, and **find()** for consuming values to produce a result or side effect.
- **Iterator.from(value)** for creating an iterator from an iterable or iterator.

~~~js
const values = [1, 2, 3, 4, 5].values();

if (typeof Iterator !== "undefined" && typeof values.filter === "function") {
  const result = values
    .filter((value) => value % 2 === 1)
    .map((value) => value * 10)
    .take(2)
    .toArray();

  console.log(result.join(", "));
} else {
  console.log("Iterator helpers are not available in this runtime");
}
~~~

In a runtime with iterator helpers, the output is:

~~~text
10, 30
~~~

The helpers operate on iterator objects, which are generally one-use. A terminal operation such as **toArray()**, **reduce()**, or **forEach()** consumes its iterator. After an iterator has been consumed, do not expect to read the same values again. Check the JavaScript runtimes your project supports before relying on newer built-in helpers.

## Iteration errors to recognize

### The source is not iterable

A plain object is not automatically iterable. **for...of**, spread, and APIs that require iterables throw a **TypeError** if no suitable **[Symbol.iterator]()** method exists.

~~~js
const plainObject = { name: "Asha" };

try {
  [...plainObject];
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Output:

~~~text
true
~~~

### The iterator method returns an invalid value

The **[Symbol.iterator]()** method must return an object with a callable **next()** method. A number, string, or **null** is not a valid iterator object.

### The next method returns an invalid result

Each call to **next()** must return an object. Returning a primitive causes a **TypeError** when a protocol consumer reads the result.

### An infinite iterator is fully consumed

Array spread, **Array.from()**, and other eager consumers keep reading until the iterator completes. They are unsuitable for infinite sequences unless you limit the values first with a supported lazy helper or a bounded loop.

### A one-use iterator is mistaken for reusable data

An iterator stores its current position. Asking it for values advances that state. If you need to traverse a source more than once, keep a reusable iterable that can create a fresh iterator.

## Practical design guidance

When you create an iterable, decide whether it represents reusable data or a stream that can only be read once.

- Use an iterable source whose **[Symbol.iterator]()** creates fresh iterator state when callers should be able to iterate more than once.
- Use an iterable iterator that returns **this** when the sequence represents a one-use cursor or stream.
- Keep state private to the iterator returned by **[Symbol.iterator]()** so simultaneous iterations do not interfere.
- Make **next()** return a fresh result object with a meaningful **done** value.
- Keep returning **done: true** after completion.
- Add **return()** when stopping early must clean up a resource or internal state.
- Prefer built-in collection methods when they express the work more clearly than a custom iterator.
- Avoid eagerly converting a potentially large or infinite sequence into an array.
- Treat iteration behavior as part of an object's public API because many language features will invoke it.

## Common misconceptions

### An iterable and an iterator are the same thing

They may be the same object, but an iterable only needs to create an iterator. An array is iterable, while the object returned by **array[Symbol.iterator]()** is its iterator.

### Every object with a length is iterable

A numeric **length** and indexed properties create an array-like object. The iterator protocol is separate. **Array.from()** supports both shapes, while **for...of** requires an iterable.

### for...of reads object keys

**for...of** reads values produced by the iterator. **for...in** enumerates enumerable string keys.

### An iterator can be read again from the beginning

A particular iterator generally stores progress. Ask a reusable iterable for a new iterator to start over.

### String iteration returns user-perceived characters

String iteration yields Unicode code points, not grapheme clusters. Some visible characters use multiple code points.

### Breaking a loop only stops reading values

For **for...of**, early exit also calls the iterator's optional **return()** method, allowing cleanup.

## Try it yourself

1. Get an array iterator and call **next()** until **done** is true.
2. Use **for...of** on an array, string, map, and set. Write down the shape of each yielded value.
3. Spread a finite iterable into an array and destructure its first two values.
4. Build a reusable range iterable that creates fresh state each time.
5. Build a one-use countdown iterator that returns **this** from **[Symbol.iterator]()**.
6. Compare an array-like object with an iterable object. Try both with spread and **Array.from()**.
7. Add **return()** to a custom iterator and use **break** to observe early cleanup.
8. Throw an error inside a **for...of** loop and observe whether the iterator's **return()** method runs.
9. Compare a supplementary Unicode character's **length**, indexed access, and spread result.
10. If the runtime supports iterator helpers, filter, map, and take values without first building an intermediate array.

## Key points

- An iterable has a **[Symbol.iterator]()** method that returns an iterator.
- An iterator has a **next()** method that returns an object with **value** and **done**.
- **for...of**, spread, destructuring, and several built-in APIs consume iterables.
- Arrays, strings, maps, sets, and typed arrays provide built-in iterators.
- A reusable iterable can create a fresh iterator; a particular iterator usually holds its current position.
- Array-like objects are not necessarily iterable. **Array.from()** accepts both iterable and array-like inputs.
- String iterators yield Unicode code points, not grapheme clusters.
- **for...of** invokes an iterator's optional **return()** method when the loop exits early or abruptly.
- Infinite iterables must not be passed to eager consumers without a bound.
- Iterator helper methods are available in modern runtimes, but support should be checked when older environments matter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [67 - Symbols and well-known symbols](067-symbols-and-well-known-symbols.md) | [Open Q&A](../qnas/068-iterables-and-the-iterator-protocol.md) | [Open example](../examples/068-iterables-and-the-iterator-protocol.md) | [69 - Generators and yield](069-generators-and-yield.md) |
