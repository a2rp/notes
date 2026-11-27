# 68 - Iterables and the iterator protocol: Examples

These examples show how JavaScript obtains values from iterables, how iterators track progress, how to create custom sequences, and how consumers close iterators. Each example includes a task, complete code, expected output, and an explanation.

## 1. Read an array iterator one result at a time

**Task:** Inspect the **value** and **done** properties without relying on console formatting for objects.

~~~js
const iterator = ["north", "south"][Symbol.iterator]();

const first = iterator.next();
const second = iterator.next();
const finished = iterator.next();

console.log(first.value, first.done);
console.log(second.value, second.done);
console.log(finished.value, finished.done);
~~~

Expected output:

~~~text
north false
south false
undefined true
~~~

**Explanation:** The iterator yields one value per call. The result after the last array element has **done: true**.

## 2. Get two independent iterators from one iterable

**Task:** Show that separate iterators have separate positions.

~~~js
const colors = ["red", "green"];
const firstIterator = colors[Symbol.iterator]();
const secondIterator = colors[Symbol.iterator]();

console.log(firstIterator.next().value);
console.log(firstIterator.next().value);
console.log(secondIterator.next().value);
~~~

Expected output:

~~~text
red
green
red
~~~

**Explanation:** The array is reusable. Calling its **[Symbol.iterator]()** method creates an iterator with fresh state.

## 3. Consume an iterable with for...of

**Task:** Print the values produced by an array.

~~~js
const frameworks = ["HTML", "CSS", "JavaScript"];

for (const framework of frameworks) {
  console.log(framework);
}
~~~

Expected output:

~~~text
HTML
CSS
JavaScript
~~~

**Explanation:** **for...of** reads values from the iterator and stops when the iterator reports that it is done.

## 4. Compare for...of with for...in

**Task:** Print the array values and property keys using the correct loop for each job.

~~~js
const tools = ["editor", "browser"];

for (const value of tools) {
  console.log("value:", value);
}

for (const key in tools) {
  console.log("key:", key);
}
~~~

Expected output:

~~~text
value: editor
value: browser
key: 0
key: 1
~~~

**Explanation:** **for...of** consumes values. **for...in** enumerates enumerable string keys, which for this simple array are the indexes.

## 5. Iterate through a Map and a Set

**Task:** Print map entries and set values in insertion order.

~~~js
const profile = new Map([
  ["name", "Riya"],
  ["level", "beginner"]
]);
const tags = new Set(["html", "css", "html"]);

for (const [key, value] of profile) {
  console.log(key + ": " + value);
}

for (const tag of tags) {
  console.log(tag);
}
~~~

Expected output:

~~~text
name: Riya
level: beginner
html
css
~~~

**Explanation:** A map yields **[key, value]** pairs. A set yields each distinct value once.

## 6. Create a reusable range iterable

**Task:** Make an object that yields the integers from 2 through 5 every time it is iterated.

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

Expected output:

~~~text
2, 3, 4, 5
2, 3, 4, 5
~~~

**Explanation:** Every call to **[Symbol.iterator]()** creates its own **current** variable. The source can therefore be traversed repeatedly.

## 7. Interleave two iterators from the same source

**Task:** Advance two iterators independently and observe their positions.

~~~js
const source = [10, 20, 30];
const left = source[Symbol.iterator]();
const right = source[Symbol.iterator]();

console.log(left.next().value);
console.log(right.next().value);
console.log(left.next().value);
console.log(right.next().value);
~~~

Expected output:

~~~text
10
10
20
20
~~~

**Explanation:** Both iterators read the same source but keep independent progress. Advancing one iterator does not advance the other.

## 8. Create a one-use iterable iterator

**Task:** Make a countdown object that is both an iterator and an iterable. Show that it is exhausted after one pass.

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
console.log([...countdown].length);
~~~

Expected output:

~~~text
3, 2, 1
0
~~~

**Explanation:** The object is an iterator because it has **next()** and an iterable because **[Symbol.iterator]()** returns itself. Its state is not reset after the first pass.

## 9. Compare an array-like object with an iterable

**Task:** Convert an array-like object with **Array.from()** and try to spread it directly.

~~~js
const arrayLike = {
  0: "first",
  1: "second",
  length: 2
};

console.log(Array.from(arrayLike).join(", "));

try {
  console.log([...arrayLike]);
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
first, second
true
~~~

**Explanation:** **Array.from()** accepts an array-like object. Spread requires **[Symbol.iterator]()**, which this object does not have.

## 10. Make an array-like object iterable

**Task:** Add an iterator method so **for...of** can read indexed values.

~~~js
const word = {
  0: "i",
  1: "t",
  2: "e",
  3: "r",
  length: 4,

  [Symbol.iterator]() {
    let index = 0;
    const object = this;

    return {
      next() {
        if (index < object.length) {
          return { value: object[index++], done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...word].join(""));
~~~

Expected output:

~~~text
iter
~~~

**Explanation:** The numeric properties and **length** alone were not enough. The **[Symbol.iterator]()** method makes the object iterable.

## 11. Compare UTF-16 length with string iteration

**Task:** Count a supplementary Unicode character using **length** and the string iterator.

~~~js
const character = "😀";

console.log(character.length);
console.log(character.charCodeAt(0).toString(16));
console.log([...character].length);
console.log([...character][0]);
~~~

Expected output:

~~~text
2
d83d
1
😀
~~~

**Explanation:** The emoji is encoded as a surrogate pair in UTF-16. **length** counts two code units, while the string iterator yields one code point.

## 12. See why a code point is not always a visible character

**Task:** Count the code points in a joined family emoji sequence.

~~~js
const family = "👨‍👩‍👧‍👦";

console.log([...family].length);
console.log([...family].join(" | "));
~~~

Expected output:

~~~text
7
👨 | ‍ | 👩 | ‍ | 👧 | ‍ | 👦
~~~

**Explanation:** The displayed family is made from several code points joined together. String iteration does not group code points into grapheme clusters.

## 13. Spread a sparse array

**Task:** Observe the values produced by an array iterator for empty array slots.

~~~js
const sparse = Array(2);
const copy = [...sparse];

console.log(copy.length);
console.log(copy.map((value) => String(value)).join(", "));
~~~

Expected output:

~~~text
2
undefined, undefined
~~~

**Explanation:** The array iterator visits both positions. Spread creates a new array with **undefined** at each previously empty position.

## 14. Destructure values from an iterable

**Task:** Read the first two values from a set with array destructuring.

~~~js
const topics = new Set(["syntax", "selectors", "layout"]);
const [first, second] = topics;

console.log(first);
console.log(second);
~~~

Expected output:

~~~text
syntax
selectors
~~~

**Explanation:** Array destructuring consumes values from the right-hand iterable. It does not require the right-hand value to be an array.

## 15. Create a Map from iterable entry pairs

**Task:** Build a map from an array of two-item arrays, then iterate through it.

~~~js
const settings = new Map([
  ["theme", "dark"],
  ["fontSize", 16]
]);

for (const [key, value] of settings) {
  console.log(key + "=" + value);
}
~~~

Expected output:

~~~text
theme=dark
fontSize=16
~~~

**Explanation:** The **Map** constructor accepts an iterable of entry pairs. The resulting map is itself iterable and yields the same pair shape.

## 16. Consume an iterator manually

**Task:** Call **next()** until the iterator signals completion.

~~~js
const iterator = ["red", "blue"][Symbol.iterator]();
let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
~~~

Expected output:

~~~text
red
blue
~~~

**Explanation:** The consumer must check **done** before reading **value**. A **for...of** loop handles this protocol work automatically.

## 17. Close an iterator when a loop breaks

**Task:** Add cleanup to a custom iterator and stop consuming it after the first value.

~~~js
const source = {
  [Symbol.iterator]() {
    let value = 1;

    return {
      next() {
        return { value: value++, done: false };
      },
      return() {
        console.log("closed");
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

Expected output:

~~~text
1
closed
~~~

**Explanation:** **break** causes **for...of** to close the iterator. The optional **return()** method is a place for cleanup.

## 18. Close an iterator when loop processing throws

**Task:** Show that an exception inside **for...of** triggers the iterator's cleanup method.

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

Expected output:

~~~text
closed, stop
~~~

**Explanation:** The loop attempts iterator cleanup as the thrown error leaves the loop. The original error is then handled by the **catch** block.

## 19. Limit an unbounded iterator with a loop

**Task:** Read exactly three values from an iterator that never completes.

~~~js
const numbers = {
  [Symbol.iterator]() {
    let value = 1;

    return {
      next() {
        return { value: value++, done: false };
      },
      return() {
        console.log("stopped");
        return { done: true };
      }
    };
  }
};

let count = 0;
for (const value of numbers) {
  console.log(value);
  count += 1;

  if (count === 3) {
    break;
  }
}
~~~

Expected output:

~~~text
1
2
3
stopped
~~~

**Explanation:** The loop provides a stopping condition. Avoid passing an unbounded iterator to spread or **Array.from()**, because those operations try to consume it completely.

## 20. Use an iterable with Promise.all

**Task:** Pass a set of promises to **Promise.all()**.

~~~js
const tasks = new Set([
  Promise.resolve("first"),
  Promise.resolve("second")
]);

Promise.all(tasks).then((values) => {
  console.log(values.join(", "));
});
~~~

Expected output after the promises resolve:

~~~text
first, second
~~~

**Explanation:** **Promise.all()** accepts an iterable. It consumes the set's values and fulfills with an array in the same iteration order.

## 21. Use modern iterator helpers when supported

**Task:** Filter, transform, and limit an array iterator without creating an intermediate array at each step.

~~~js
const iterator = [1, 2, 3, 4, 5].values();

if (typeof Iterator !== "undefined" && typeof iterator.filter === "function") {
  const result = iterator
    .filter((value) => value % 2 === 1)
    .map((value) => value * 10)
    .take(2)
    .toArray();

  console.log(result.join(", "));
} else {
  console.log("Iterator helpers unavailable");
}
~~~

Expected output in a runtime with iterator helpers:

~~~text
10, 30
~~~

**Explanation:** The helper methods create a lazy pipeline. **toArray()** is the terminal step that consumes the remaining values. Older runtimes print the fallback message.

## 22. Distinguish an undefined value from completion

**Task:** Read an iterator that deliberately yields **undefined** before it is done.

~~~js
const source = {
  [Symbol.iterator]() {
    let position = 0;

    return {
      next() {
        if (position++ === 0) {
          return { value: undefined, done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

const iterator = source[Symbol.iterator]();
const yielded = iterator.next();
const finished = iterator.next();

console.log(yielded.value, yielded.done);
console.log(finished.value, finished.done);
~~~

Expected output:

~~~text
undefined false
undefined true
~~~

**Explanation:** The **done** property distinguishes a yielded **undefined** value from the end of the sequence. Do not use **value === undefined** as the completion check.

## 23. Catch a malformed iterator result

**Task:** Return a primitive from **next()** and observe that a protocol consumer rejects it.

~~~js
const malformed = {
  [Symbol.iterator]() {
    return {
      next() {
        return "not an object";
      }
    };
  }
};

try {
  [...malformed];
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

Expected output:

~~~text
true
~~~

**Explanation:** An iterator's **next()** method must return an object containing the iterator result. A primitive result violates the protocol.

## 24. Use the collection constructors with iterables

**Task:** Construct a set and a map from other iterable values.

~~~js
const unique = new Set(["a", "b", "a"]);
const lookup = new Map([
  ["one", 1],
  ["two", 2]
]);

console.log([...unique].join(", "));
console.log([...lookup].map(([key, value]) => key + value).join(", "));
~~~

Expected output:

~~~text
a, b
one1, two2
~~~

**Explanation:** The set constructor consumes values and keeps each distinct one. The map constructor consumes entry pairs.

## Review checklist

For each example, make sure you can identify:

- Which object is the iterable and which object is the iterator.
- Where iterator state is created and whether it resets on a new pass.
- How **done** distinguishes completion from a yielded **undefined** value.
- Which operations require an iterable and which also accept array-like input.
- Whether a consumer reads values lazily or eagerly.
- Why a loop break calls **return()** when that method exists.
- Why string iteration counts code points rather than all user-perceived characters.
- Whether iterator helper methods are supported in the target runtime.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [67 - Symbols and well-known symbols](../lessons/067-symbols-and-well-known-symbols.md) | [Open lesson](../lessons/068-iterables-and-the-iterator-protocol.md) | [Open Q&A](../qnas/068-iterables-and-the-iterator-protocol.md) | [69 - Generators and yield](../lessons/069-generators-and-yield.md) |
