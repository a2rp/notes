# 68 - Iterables and the iterator protocol: Q&A

Use these questions to review iterable and iterator roles, the synchronous iteration protocol, built-in consumers, custom sequences, Unicode string iteration, and iterator cleanup. Every answer appears directly after its question.

## Multiple-choice questions

### 1. What does an iterable provide?

- A. A **next()** method that must return a number
- B. A **[Symbol.iterator]()** method that returns an iterator
- C. A numeric **length** property
- D. A **return()** method that is always required

**Answer: B.** An iterable provides a method at **Symbol.iterator**. Calling that method returns an iterator object.

### 2. What is the required method on an iterator?

- A. **next()**
- B. **forEach()**
- C. **length()**
- D. **toArray()**

**Answer: A.** The synchronous iterator protocol requires a callable **next()** method that returns an iterator result object.

### 3. Which shape represents a normal unfinished iterator result?

- A. **{ value: "red", done: false }**
- B. **{ key: "red", finished: false }**
- C. **["red", false]**
- D. **"red"**

**Answer: A.** An iterator result is an object. Its **value** holds the yielded value, and its **done** property indicates whether iteration is complete.

### 4. What does a truthy **done** property mean?

- A. The result contains an error.
- B. The iterator has completed.
- C. The iterator should restart.
- D. The iterable has no **Symbol.iterator** property.

**Answer: B.** Consumers convert **done** to a Boolean. When it is truthy, the sequence is complete and the result's **value** is not yielded by normal iteration.

### 5. What happens when an array's **[Symbol.iterator]()** method is called twice?

- A. The second call resumes the first iterator.
- B. Both calls return the array itself.
- C. Each call normally returns a new iterator starting at the beginning.
- D. The second call throws a **TypeError**.

**Answer: C.** Arrays are reusable iterables. Each call creates an iterator with independent progress.

### 6. Which statement correctly compares **for...of** and **for...in**?

- A. Both always yield array values.
- B. **for...of** yields iterator values, while **for...in** enumerates property keys.
- C. **for...in** uses **Symbol.iterator**.
- D. **for...of** is only for arrays.

**Answer: B.** **for...of** consumes an iterable. **for...in** enumerates enumerable string property names.

### 7. Which value is yielded by a **Map**'s default iterator?

- A. Only each key
- B. Only each value
- C. A **[key, value]** pair for each entry
- D. The map's numeric index

**Answer: C.** A map's default iterator yields entry pairs, which can be unpacked with array destructuring in a **for...of** loop.

### 8. Which statement about **Array.from()** is correct?

- A. It accepts only arrays.
- B. It accepts iterable and array-like inputs.
- C. It makes every object iterable permanently.
- D. It does not consume iterators.

**Answer: B.** **Array.from()** can read an iterable or use an array-like object's length and indexed properties. Array spread, by comparison, requires an iterable.

### 9. What does a string's default iterator yield?

- A. UTF-8 bytes
- B. UTF-16 code units only
- C. Unicode code points
- D. User-perceived grapheme clusters in every case

**Answer: C.** A string iterator yields Unicode code points. A visible character can still consist of multiple code points, so iteration does not always match grapheme clusters.

### 10. What can **for...of** do when it exits early with **break**?

- A. Call the iterator's optional **return()** method
- B. Reset the iterator to its beginning
- C. Convert the iterator to an array
- D. Call **next()** until normal completion

**Answer: A.** If the iterator provides **return()**, early loop exit calls it to allow cleanup. The method is optional.

## True or false

### 11. An iterable and its iterator must always be the same object.

**Answer: False.** An iterable can create a separate iterator each time. An iterator may also be iterable by returning **this** from its own **[Symbol.iterator]()** method.

### 12. Any object with numeric indexes and a **length** property is iterable.

**Answer: False.** That shape is array-like, but it does not automatically provide **[Symbol.iterator]()**. **Array.from()** accepts array-like objects, while **for...of** requires an iterable.

### 13. A particular array iterator stores its current position as it is consumed.

**Answer: True.** Calls to **next()** advance that iterator. Ask the array for another iterator to start a separate pass.

### 14. Array spread is a safe way to collect an infinite iterable.

**Answer: False.** Spread keeps requesting values until the iterator reports completion. An infinite iterator never completes, so the operation does not finish.

### 15. A **for...of** loop can destructure **Map** entries into a key and value.

**Answer: True.** Each yielded map entry is a two-element pair, so **for (const [key, value] of map)** is a common pattern.

### 16. String iteration always returns one value per visible character.

**Answer: False.** It returns Unicode code points. Combining sequences and joined emoji can contain several code points while displaying as one grapheme cluster.

### 17. A **continue** statement exits the loop and calls the iterator's **return()** method.

**Answer: False.** **continue** advances to the next iteration. It does not close the iterator because the loop remains active.

### 18. Iterator helper methods such as **map()** and **filter()** are available in every JavaScript runtime.

**Answer: False.** They are modern built-in methods. Check support when a project must run in older environments.

## Predict the output

### 19. What do the first three calls to **next()** return?

~~~js
const iterator = ["a", "b"][Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
~~~

**Answer:**

~~~text
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: undefined, done: true }
~~~

**Explanation:** The array iterator yields each element in order, then reports completion. Developer tools may format the object differently, but the property values are the same.

### 20. What does this code print?

~~~js
const source = {
  [Symbol.iterator]() {
    let current = 1;

    return {
      next() {
        if (current <= 2) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...source].join(", "));
console.log([...source].join(", "));
~~~

**Answer:**

~~~text
1, 2
1, 2
~~~

**Explanation:** Each call to **source[Symbol.iterator]()** creates fresh state, so this iterable can be traversed more than once.

### 21. What values are printed from this set?

~~~js
const values = new Set(["a", "b", "a"]);

for (const value of values) {
  console.log(value);
}
~~~

**Answer:**

~~~text
a
b
~~~

**Explanation:** A set stores each value once and its default iterator yields values in insertion order.

### 22. What does each loop print?

~~~js
const letters = ["x", "y"];

for (const value of letters) {
  console.log("value", value);
}

for (const key in letters) {
  console.log("key", key);
}
~~~

**Answer:**

~~~text
value x
value y
key 0
key 1
~~~

**Explanation:** **for...of** yields values from the array iterator. **for...in** yields enumerable property keys as strings.

### 23. What is printed for the supplementary character?

~~~js
const character = "😀";

console.log(character.length);
console.log([...character].length);
~~~

**Answer:**

~~~text
2
1
~~~

**Explanation:** The character occupies two UTF-16 code units, so **length** is **2**. The string iterator yields one Unicode code point.

### 24. What is printed for this sparse array?

~~~js
const values = Array(2);
const copied = [...values];

console.log(copied.length);
console.log(copied.map((value) => String(value)).join(", "));
~~~

**Answer:**

~~~text
2
undefined, undefined
~~~

**Explanation:** The array iterator visits both positions. Array spread creates a dense array containing **undefined** values at those positions.

### 25. What does this array-like comparison print?

~~~js
const item = {
  0: "first",
  length: 1
};

console.log(Array.from(item)[0]);

try {
  [...item];
} catch (error) {
  console.log(error instanceof TypeError);
}
~~~

**Answer:**

~~~text
first
true
~~~

**Explanation:** **Array.from()** accepts array-like objects. Spread requires the iterable protocol, which this object does not provide.

### 26. What happens when a loop stops early?

~~~js
const source = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: "item", done: false };
      },
      return() {
        console.log("cleanup");
        return { done: true };
      }
    };
  }
};

for (const value of source) {
  console.log(value);
  break;
}
~~~

**Answer:**

~~~text
item
cleanup
~~~

**Explanation:** **break** ends the **for...of** loop. Because the iterator has a **return()** method, the loop calls it to close the iterator.

### 27. Does a truthy **done** value yield its **value**?

~~~js
const source = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: "skip me", done: 1 };
      }
    };
  }
};

console.log([...source].length);
~~~

**Answer:**

~~~text
0
~~~

**Explanation:** The protocol converts **done** to a Boolean. Since **1** is truthy, the iterator is complete and **"skip me"** is not yielded.

### 28. What happens when an iterator has been exhausted?

~~~js
const iterator = [5][Symbol.iterator]();

console.log(iterator.next().value);
console.log(iterator.next().done);
console.log(iterator.next().done);
~~~

**Answer:**

~~~text
5
true
true
~~~

**Explanation:** After the only value is read, the iterator reports completion. Later calls remain completed.

### 29. What does this map loop print?

~~~js
const settings = new Map([
  ["theme", "dark"],
  ["fontSize", 16]
]);

for (const [key, value] of settings) {
  console.log(key + "=" + value);
}
~~~

**Answer:**

~~~text
theme=dark
fontSize=16
~~~

**Explanation:** Each map iteration produces a **[key, value]** pair. The loop destructures that pair.

### 30. What does the iterator helper chain produce in a supporting runtime?

~~~js
const result = [1, 2, 3, 4, 5]
  .values()
  .filter((value) => value % 2 === 1)
  .map((value) => value * 10)
  .take(2)
  .toArray();

console.log(result.join(", "));
~~~

**Answer:**

~~~text
10, 30
~~~

**Explanation:** **filter()**, **map()**, and **take()** build a lazy iterator pipeline. **toArray()** consumes it. This code requires a runtime that supports iterator helpers.

## Short-answer questions

### 31. Explain the difference between an iterable and an iterator.

**Answer:** An iterable provides **[Symbol.iterator]()** and can create an iterator. An iterator provides **next()** and tracks progress through a sequence. They can be the same object, but commonly they are separate objects.

### 32. What properties are used in an iterator result?

**Answer:** **value** contains the current result, and **done** indicates completion. Consumers treat **done** as a Boolean and stop when it is truthy.

### 33. Why can an array be traversed twice but an array iterator is usually exhausted after one pass?

**Answer:** The array is a reusable iterable that creates a fresh iterator on each call to **[Symbol.iterator]()**. An iterator stores its own progress, so consuming that particular iterator advances it.

### 34. What is the difference between an iterable and an array-like object?

**Answer:** An iterable implements **[Symbol.iterator]()**. An array-like object has a **length** property and indexed values but might not implement the iterator protocol. **Array.from()** can accept either shape, but **for...of** and spread require an iterable.

### 35. Why can spreading an infinite iterable be a problem?

**Answer:** Spread keeps requesting values until **done** is truthy. An infinite iterator never completes, so spread cannot finish and may consume unbounded time and memory.

### 36. What is an iterator's optional **return()** method for?

**Answer:** It lets a consumer signal that iteration is stopping early. A **for...of** loop calls it on early or abrupt exit, giving the iterator a chance to release resources or perform cleanup.

### 37. Does **continue** close a **for...of** iterator?

**Answer:** No. **continue** requests the next loop iteration. Since the loop is still using the iterator, it does not close it.

### 38. What does a string iterator yield, and what does it not promise?

**Answer:** It yields Unicode code points. It does not promise one value per user-perceived grapheme cluster, since a visible character can be composed of multiple code points.

### 39. Why should iterator helper support be checked for some projects?

**Answer:** Iterator helpers are modern built-ins and may be missing in older JavaScript engines. If the application targets such engines, feature detection or a compatible alternative is needed.

## Coding and design questions

### 40. Create a reusable iterable that yields a range from 1 through 3.

**Answer:**

~~~js
const range = {
  [Symbol.iterator]() {
    let current = 1;

    return {
      next() {
        if (current <= 3) {
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
1, 2, 3
1, 2, 3
~~~

**Explanation:** The iterator state is created inside **[Symbol.iterator]()**. Each traversal receives new state and starts again at 1.

### 41. Create a one-use iterator that is also iterable.

**Answer:**

~~~js
function createIterator() {
  let current = 1;

  return {
    next() {
      if (current <= 2) {
        return { value: current++, done: false };
      }

      return { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}

const iterator = createIterator();
console.log([...iterator].join(", "));
console.log([...iterator].length);
~~~

Output:

~~~text
1, 2
0
~~~

**Explanation:** Returning **this** makes the iterator usable with iterable consumers. Its position is not reset, so the second traversal has no values left.

### 42. Manually consume an iterator until it completes.

**Answer:**

~~~js
const iterator = new Set(["open", "closed"])[Symbol.iterator]();
let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
~~~

Output:

~~~text
open
closed
~~~

**Explanation:** The loop checks **done** before reading **value**, then requests the next result. A **for...of** loop is shorter when manual access to result objects is not needed.

### 43. Add early cleanup to a custom iterator.

**Answer:**

~~~js
const source = {
  [Symbol.iterator]() {
    let current = 1;

    return {
      next() {
        return { value: current++, done: false };
      },
      return() {
        console.log("resource released");
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
resource released
~~~

**Explanation:** The sequence itself could continue forever, but the consumer stops at **break**. The loop invokes **return()** so the iterator can clean up.

### 44. Turn an iterable into an array, then select its first two values.

**Answer:**

~~~js
const source = new Set(["HTML", "CSS", "JavaScript"]);
const values = Array.from(source);
const [first, second] = values;

console.log(first);
console.log(second);
~~~

Output:

~~~text
HTML
CSS
~~~

**Explanation:** **Array.from()** consumes the iterable into an array. Array destructuring then reads the first two array values.

### 45. Explain how to consume only a bounded number of values from an unbounded iterator.

**Answer:** Use a loop with an explicit stopping condition or, when supported, a lazy iterator helper such as **take()**.

~~~js
const numbers = {
  [Symbol.iterator]() {
    let value = 1;

    return {
      next() {
        return { value: value++, done: false };
      }
    };
  }
};

let count = 0;
for (const value of numbers) {
  console.log(value);
  count += 1;
  if (count === 3) break;
}
~~~

Output:

~~~text
1
2
3
~~~

**Explanation:** The loop imposes a bound and exits before trying to collect the infinite sequence. The **for...of** loop also closes the iterator if it provides a **return()** method.

## Review checklist

Before moving on, make sure you can explain:

- What **[Symbol.iterator]()** returns and what **next()** returns.
- Why an iterable can be reused while a particular iterator is usually stateful.
- Which JavaScript features consume iterables.
- Why an array-like object might work with **Array.from()** but fail with spread.
- What values strings, maps, and sets yield.
- Why Unicode code points are not always the same as visible grapheme clusters.
- How **return()** supports cleanup when a **for...of** loop exits early.
- Why eager consumers should not be used on unbounded sequences.
- How to check for iterator helper support before using newer built-ins.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [67 - Symbols and well-known symbols](../lessons/067-symbols-and-well-known-symbols.md) | [Open lesson](../lessons/068-iterables-and-the-iterator-protocol.md) | [Open example](../examples/068-iterables-and-the-iterator-protocol.md) | [69 - Generators and yield](../lessons/069-generators-and-yield.md) |
