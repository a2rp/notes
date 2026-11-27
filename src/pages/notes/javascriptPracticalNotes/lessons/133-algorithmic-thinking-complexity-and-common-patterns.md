# 133 - Algorithmic thinking, complexity, and common patterns

An algorithm is a finite set of steps that solves a problem. Algorithmic thinking means making the input, output, rules, and edge cases clear before choosing those steps.

Complexity analysis describes how the work or extra memory grows as the input grows. It helps compare approaches, but it does not replace measurement. A clear solution that handles the expected data is usually a better starting point than a clever solution whose assumptions are unclear.

## Learning goals

By the end of this chapter, you can:

- describe a problem in terms of input, output, constraints, and edge cases;
- estimate time and auxiliary space growth;
- distinguish Big O, Big Omega, and Big Theta notation;
- recognize constant, logarithmic, linear, linearithmic, quadratic, and exponential growth;
- use common patterns such as frequency counting, two pointers, sliding windows, prefix sums, and binary search;
- explain the assumptions behind an algorithm's complexity.

## Describe the problem first

Before writing code, answer these questions:

1. What values are given?
2. What result must be returned or changed?
3. What input sizes are possible?
4. Is the input sorted? Can values repeat?
5. What should happen for empty or invalid input?
6. Are there constraints on extra memory or mutation?
7. Which operations are frequent?

For example, "find a pair that adds to a target" is incomplete until you decide whether the input is sorted, whether the pair must use two different positions, and whether you need a pair of values or just a true/false result.

Clear requirements help avoid solving a different problem efficiently.

## Time and space complexity

Let `n` represent the input size. Time complexity describes how the number of operations grows as `n` increases. Space complexity describes how memory use grows.

Auxiliary space usually means extra memory used by the algorithm, excluding the input itself. State what is included when comparing approaches. Returning a copied output array uses memory even if the input is excluded.

Complexity focuses on growth, not elapsed milliseconds. Two implementations with the same growth can still run at different speeds because of constants, runtime behavior, hardware, or data shape.

## Read asymptotic notation

Big O, written `O(g(n))`, gives an asymptotic upper bound on growth. It is commonly used to describe an algorithm's worst-case growth, but Big O itself does not mean "worst case." Worst, average, and best case describe which inputs are being analyzed; Big O, Omega, and Theta describe bounds on the growth function.

- `O(g(n))` is an upper bound.
- `Omega(g(n))` is a lower bound.
- `Theta(g(n))` is a tight bound, both upper and lower.

For beginner comparisons, simplify constants and lower-order terms:

- `O(3n + 20)` becomes `O(n)`.
- `O(n^2 + 4n + 1)` becomes `O(n^2)`.

This does not say constants never matter. They matter for actual runtime. The notation helps compare how work scales when inputs become large.

## Common growth rates

| Growth | Common name | Example shape |
| --- | --- | --- |
| `O(1)` | Constant | Read an array item by index |
| `O(log n)` | Logarithmic | Halve a sorted search range repeatedly |
| `O(n)` | Linear | Visit each item once |
| `O(n log n)` | Linearithmic | Many comparison sorts in common implementations |
| `O(n^2)` | Quadratic | Compare many pairs with nested loops |
| `O(2^n)` | Exponential | Try every subset of n independent choices |
| `O(n!)` | Factorial | Try every ordering of n distinct items |

This is a guide to growth, not a ranking of every real program. A small quadratic method may be simpler and faster than a linear method for tiny inputs. Measure when performance matters.

## Count work in loops

A loop that visits each of `n` items once usually does linear work:

~~~js
function containsValue(values, target) {
  for (const value of values) {
    if (value === target) return true;
  }

  return false;
}
~~~

Its best case is constant work when the first item matches. Its worst case is linear when no item matches or the match is last. The extra space is constant.

Two separate passes still grow linearly:

~~~js
for (const value of values) {
  inspect(value);
}

for (const value of values) {
  save(value);
}
~~~

The total is `O(n) + O(n)`, which simplifies to `O(n)`.

A nested loop that compares every pair has quadratic growth:

~~~js
function compareEveryPair(values) {
  for (let first = 0; first < values.length; first += 1) {
    for (let second = first + 1; second < values.length; second += 1) {
      compare(values[first], values[second]);
    }
  }
}
~~~

It visits `n(n - 1) / 2` pairs, which grows as `O(n^2)`. The inner loop does not always run n times, but its total still has quadratic growth.

When two input collections have different sizes, keep both sizes in the analysis. A loop over `n` items nested inside a loop over `m` items is `O(nm)`, not automatically `O(n^2)`.

A loop that doubles its counter covers a logarithmic number of steps:

~~~js
for (let size = 1; size < limit; size *= 2) {
  process(size);
}
~~~

Each iteration multiplies the counter by two. It reaches a limit of `n` in about `log2(n)` steps.

## Common algorithm patterns

### 1. Linear scan

Use a single pass to find a match, maximum, minimum, or first item satisfying a rule.

~~~js
function findLargest(values) {
  if (values.length === 0) return undefined;

  let largest = values[0];

  for (let index = 1; index < values.length; index += 1) {
    if (values[index] > largest) {
      largest = values[index];
    }
  }

  return largest;
}
~~~

This takes `O(n)` time and `O(1)` auxiliary space. Initialize from the first item so the function works for negative values too.

### 2. Frequency counting

Use a Map to count occurrences when the problem asks how often values appear:

~~~js
function countValues(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}
~~~

The loop visits n values. The map uses extra space proportional to the number of distinct values, written `O(k)` where `k <= n`. Map operations have sublinear average access requirements in the language specification, but the exact runtime is implementation-dependent. Complexity estimates for this pattern usually state the assumption that individual map operations are efficient.

### 3. Two pointers

For a sorted array, two pointers can move inward instead of checking every pair:

~~~js
function hasPairWithSum(sortedValues, target) {
  let left = 0;
  let right = sortedValues.length - 1;

  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];

    if (sum === target) return true;

    if (sum < target) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return false;
}
~~~

This takes `O(n)` time and `O(1)` extra space. The input must be sorted, and the two pointers must refer to different positions. Sorting first would add a separate cost and might mutate the input.

### 4. Sliding window

For a contiguous range of fixed length, update a running total instead of summing each range from scratch:

~~~js
function maximumWindowSum(values, windowSize) {
  if (
    !Number.isInteger(windowSize)
    || windowSize < 1
    || windowSize > values.length
  ) {
    return undefined;
  }

  let currentSum = 0;

  for (let index = 0; index < windowSize; index += 1) {
    currentSum += values[index];
  }

  let bestSum = currentSum;

  for (let end = windowSize; end < values.length; end += 1) {
    currentSum += values[end] - values[end - windowSize];
    bestSum = Math.max(bestSum, currentSum);
  }

  return bestSum;
}
~~~

The first window takes `O(w)` work and the remaining values are processed once, for a total of `O(n)` time. The extra space is `O(1)`. Re-summing every window separately would do up to `O(nw)` work.

### 5. Prefix sums

For many range-sum queries over an unchanged array, precompute cumulative totals:

~~~js
function buildPrefixSums(values) {
  const prefix = [0];

  for (const value of values) {
    prefix.push(prefix[prefix.length - 1] + value);
  }

  return prefix;
}

function rangeSum(prefix, start, endExclusive) {
  return prefix[endExclusive] - prefix[start];
}
~~~

For a half-open range `[start, endExclusive)`, subtract the prefix before the range from the prefix after it. Building the prefix array takes `O(n)` time and space. Each valid range query then takes `O(1)` time.

### 6. Binary search

Binary search repeatedly discards half of a sorted search range:

~~~js
function binarySearch(sortedValues, target) {
  let low = 0;
  let high = sortedValues.length;

  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    const value = sortedValues[middle];

    if (value === target) return middle;

    if (value < target) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  return -1;
}
~~~

This version uses a half-open interval from `low` up to, but not including, `high`. It takes `O(log n)` time and `O(1)` extra space. The input must already be sorted using an order compatible with the comparisons in the search.

## Avoid accidental quadratic work

Copying an accumulating array on every iteration can repeatedly copy earlier items:

~~~js
const result = values.reduce(
  (accumulator, value) => [...accumulator, transform(value)],
  [],
);
~~~

If the accumulator grows each time, the total copied values can grow quadratically. A direct loop appends to one local array:

~~~js
const result = [];

for (const value of values) {
  result.push(transform(value));
}
~~~

The loop takes linear work, excluding the cost of `transform`. This version mutates a local array that has not been shared. Avoid mutation when it would violate an important program contract, but do not assume that copying on every step is free.

## Account for built-in operations

Complexity analysis must include the operations inside a loop. A loop that calls a linear search each time can become quadratic. Copying or sorting inside a loop can also dominate its cost.

JavaScript does not promise an exact time complexity for every built-in method. For example, the language does not specify a particular sorting algorithm or a guaranteed time and space complexity for Array sort. Treat commonly quoted method costs as implementation expectations, not language guarantees, and check the documentation for operations that matter to a design.

A useful analysis names its assumptions:

- input size and shape;
- whether the input is sorted;
- cost assumptions for Map, Set, callbacks, and comparisons;
- whether returned output is counted as extra space;
- whether the operation mutates or copies data.

## Edge cases and correctness

Before trusting a complexity estimate, check that the algorithm solves the full problem:

- Empty arrays and one-item arrays.
- Duplicate values and repeated keys.
- Negative values, zero, and large values.
- Whether two results may use the same index.
- Whether input order must be preserved.
- Whether the input may be changed.
- Whether range boundaries are inclusive or exclusive.
- Whether invalid input should throw, return a sentinel, or be rejected earlier.

A fast incorrect answer is still incorrect. Use examples that include boundary cases, then measure performance with representative input sizes when needed.

## Common mistakes

- Treating Big O as synonymous with worst case instead of an upper bound.
- Calling every pair of nested loops `O(n^2)` even when the input sizes differ.
- Forgetting that two linear passes are still linear growth.
- Assuming an array is sorted before using binary search or two pointers.
- Re-summing each sliding window instead of updating its total.
- Repeatedly copying an accumulator inside a loop.
- Ignoring the cost of a callback, comparison, lookup, or copy inside a loop.
- Claiming a built-in operation has a guaranteed complexity when the language does not specify it.
- Comparing benchmark numbers from different workloads or machines.
- Optimizing before defining expected inputs and correctness rules.

## Key points

- Define input, output, constraints, and edge cases before selecting an algorithm.
- Complexity describes growth, while measurement describes observed performance.
- Big O is an upper bound; best, average, and worst case describe input scenarios.
- Count all work, including helper operations inside loops.
- Use frequency maps, two pointers, sliding windows, prefix sums, and binary search when their input assumptions fit.
- State assumptions about built-in operations and whether extra output memory counts.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [132 - Data structures in JavaScript](132-data-structures-in-javascript.md) | [Open Q&A](../qnas/133-algorithmic-thinking-complexity-and-common-patterns.md) | [Open example](../examples/133-algorithmic-thinking-complexity-and-common-patterns.md) | [134 - Functional programming: composition and purity](134-functional-programming-composition-and-purity.md) |
