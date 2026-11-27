# 133 - Algorithmic thinking, complexity, and common patterns: Q&A

Review problem definition, growth rates, complexity bounds, and common algorithm patterns. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does time complexity describe?

- A. How operation count grows as input size grows
- B. The exact runtime on every computer
- C. The number of files in a project
- D. The time shown by one benchmark run

**Answer: A.**

**Explanation:** Complexity models growth as input size changes. Actual elapsed time also depends on constants, runtime, hardware, and workload.

### 2. What does Big O notation express?

- A. An asymptotic upper bound
- B. Only the best-case input
- C. An exact number of milliseconds
- D. A lower bound only

**Answer: A.**

**Explanation:** Big O is an upper bound on growth. It is often used for worst-case analysis, but the notation itself does not mean worst case.

### 3. Which notation describes a tight asymptotic bound?

- A. Theta
- B. Big O only
- C. Big Omega only
- D. Little o only

**Answer: A.**

**Explanation:** Theta is both an upper and lower asymptotic bound.

### 4. How does O(5n + 20) simplify?

- A. O(n)
- B. O(1)
- C. O(n squared)
- D. O(2 to the n)

**Answer: A.**

**Explanation:** Complexity comparison drops constant factors and lower-order terms when describing asymptotic growth.

### 5. A loop visits each of n values once. What is its usual time complexity?

- A. O(n)
- B. O(log n)
- C. O(n squared)
- D. O(1)

**Answer: A.**

**Explanation:** The number of visits grows proportionally with the number of input values.

### 6. Two separate loops each visit all n values. What is their combined asymptotic complexity?

- A. O(n)
- B. O(n squared)
- C. O(log n)
- D. O(1)

**Answer: A.**

**Explanation:** O(n) plus O(n) is 2n, which simplifies to O(n).

### 7. What is the complexity of a loop over n items nested inside a loop over m items?

- A. O(nm)
- B. Always O(n squared)
- C. O(n + m) in every case
- D. O(log n)

**Answer: A.**

**Explanation:** The inner work is repeated for each of the outer loop's n values, producing n times m operations.

### 8. A loop doubles its counter on each iteration until it reaches n. What is its usual complexity?

- A. O(log n)
- B. O(n)
- C. O(n squared)
- D. O(2 to the n)

**Answer: A.**

**Explanation:** Each step multiplies the counter, so the number of steps grows with the logarithm of n.

### 9. What must be true before using ordinary binary search on an array?

- A. The input is sorted according to the search comparison
- B. The input contains only strings
- C. The input has no duplicate values
- D. The input must be copied first

**Answer: A.**

**Explanation:** Binary search discards half the range based on order. Without sorted input, it can discard the target.

### 10. Which pattern is a natural fit for finding a pair sum in a sorted array?

- A. Two pointers
- B. Prefix sums only
- C. A recursive copy of the input
- D. A WeakMap

**Answer: A.**

**Explanation:** A pointer at each end can move inward based on whether the current sum is too small or too large.

### 11. What does a sliding window help process efficiently?

- A. Contiguous ranges of an array
- B. Arbitrary object keys
- C. Every permutation of a collection
- D. A binary tree only

**Answer: A.**

**Explanation:** A running value can be updated as the window moves instead of recomputing each overlapping range.

### 12. What is the extra space used by a prefix-sum array for n input values?

- A. O(n)
- B. O(1)
- C. O(log n)
- D. O(n squared)

**Answer: A.**

**Explanation:** The prefix array stores a cumulative value for each position, so its length grows with n.

### 13. What is one common use for a frequency map?

- A. Count how often each value occurs
- B. Preserve a numeric array's original sort order
- C. Store only unique values without counts
- D. Read bytes from a file

**Answer: A.**

**Explanation:** A Map can associate each distinct value with its running count.

### 14. Why can repeatedly spreading an accumulator inside reduce cause quadratic work?

- A. Each iteration may copy all values accumulated so far
- B. reduce always runs a nested loop
- C. Spread sorts the array
- D. It converts all values to strings

**Answer: A.**

**Explanation:** If the accumulator grows by one each time, repeated copying can sum to a quadratic number of copied elements.

### 15. Is the exact time complexity of JavaScript Array sort guaranteed by the language?

- A. No, the exact algorithm and complexity are implementation-dependent
- B. Yes, it is always O(n log n)
- C. Yes, it is always O(n squared)
- D. No, because sort cannot compare numbers

**Answer: A.**

**Explanation:** Do not promise a particular complexity for a built-in operation unless the language specification guarantees it.

### 16. What is auxiliary space?

- A. Extra memory used by an algorithm, usually excluding the input
- B. The size of the source file
- C. The complete memory of the operating system
- D. The amount of network traffic

**Answer: A.**

**Explanation:** State clearly whether a returned output structure is counted when comparing memory use.

### 17. What does a linear scan that returns as soon as it finds a match have in its best case?

- A. O(1) time
- B. O(n squared) time
- C. O(log n) time
- D. O(2 to the n) time

**Answer: A.**

**Explanation:** If the first value matches, the algorithm performs only a constant amount of work. Its worst case remains linear.

### 18. Which statement best describes a benchmark?

- A. It measures observed performance for a particular workload and environment
- B. It proves the asymptotic complexity for every input
- C. It guarantees the algorithm is correct
- D. It replaces the need to define input constraints

**Answer: A.**

**Explanation:** A benchmark is useful only in context. It does not replace correctness reasoning or growth analysis.

## Short-answer questions

### 19. How are worst-case analysis and Big O related, and how are they different?

**Answer:** Worst case selects the input scenario with the most work for a given size. Big O describes an asymptotic upper bound on the resulting growth function.

**Explanation:** Big O is commonly used to report worst-case growth, but it can also describe an upper bound for another scenario.

### 20. Why do constants still matter even though asymptotic notation drops them?

**Answer:** Constants affect actual runtime for a particular input size, even though they do not change the broad growth class as the input becomes large.

**Explanation:** Complexity helps reason about scaling. Benchmarks and practical measurements help compare implementations at real sizes.

### 21. What is the difference between time complexity and auxiliary space complexity?

**Answer:** Time complexity estimates how operation count grows. Auxiliary space estimates extra memory growth used while computing the result, usually excluding input storage.

**Explanation:** An algorithm can trade extra memory for less repeated work, as with prefix sums.

### 22. Why is O(nm) more accurate than O(n squared) for two differently sized inputs?

**Answer:** The work depends on both the n-sized and m-sized collections, so the count scales with their product.

**Explanation:** Writing separate input sizes avoids assuming the collections always have equal lengths.

### 23. What precondition does the two-pointer pair-sum algorithm need?

**Answer:** The values must be sorted according to the comparisons used by the algorithm.

**Explanation:** Pointer movement is justified by sorted order. Without it, moving either pointer may discard a valid pair.

### 24. How does a sliding-window sum avoid re-summing every range?

**Answer:** It subtracts the value leaving the window and adds the value entering it.

**Explanation:** Each new window can be updated in constant work after the first window is summed.

### 25. Why do prefix sums help answer multiple range-sum queries?

**Answer:** Precomputation stores cumulative totals, so a range can be answered by subtracting two prefix values.

**Explanation:** Building takes linear time and space, then each valid range query takes constant time.

### 26. Why should complexity claims for Map and Set state their assumptions?

**Answer:** ECMAScript specifies average sublinear access behavior but not a particular exact constant-time implementation.

**Explanation:** Practical estimates often treat lookups as efficient, but the implementation and key costs still matter.

### 27. What is the risk of using a clever algorithm before defining the edge cases?

**Answer:** It may efficiently solve a different problem or fail on empty, repeated, negative, or boundary values.

**Explanation:** Correctness requirements and input constraints should guide the algorithm choice.

### 28. What should be held consistent when comparing two benchmark results?

**Answer:** The workload, input size and shape, runtime, machine, warm-up, and measurement conditions should be comparable.

**Explanation:** Otherwise, environmental differences can explain the result instead of the code change.

## Scenario questions

### 29. A function has two loops, one over users and one over roles, with the second loop nested inside the first. What complexity should you report?

**Answer:** O(u r), where u is the number of users and r is the number of roles.

**Explanation:** Keep separate input sizes when they may grow independently.

### 30. A search checks an unsorted list and returns as soon as it finds the target. What are its best-case and worst-case time complexities?

**Answer:** Best case O(1), worst case O(n).

**Explanation:** The first value may match immediately. If the target is absent or appears last, every value is checked.

### 31. A pair-sum problem allows repeated values in the input but forbids using one position twice. Can two pointers still work?

**Answer:** Yes, if the values are sorted and the pointers remain at distinct positions with left less than right.

**Explanation:** Equal values at different indexes may form a valid pair, while left less than right ensures one index is not used twice.

### 32. You need to answer thousands of sums over ranges in an array that does not change. Which approach fits?

**Answer:** Build prefix sums once, then answer each half-open range by subtracting its start prefix from its end prefix.

**Explanation:** The setup takes O(n) time and space. Each subsequent query takes O(1) time.

### 33. A method maps over an array, and its callback performs a linear search over the same array. What is the likely time complexity?

**Answer:** O(n squared), assuming the callback search scans up to n values for each of n array items.

**Explanation:** The outer n calls each perform up to linear work.

### 34. A program is slow only on large inputs. What should you do before optimizing?

**Answer:** Define the input shape and constraints, identify the hot operation, analyze its growth, and measure a representative workload.

**Explanation:** This connects the reported symptom to the actual algorithm and avoids optimizing unrelated code.

### 35. A sorted array is copied and then sorted again inside each iteration of a loop over n items. What should you investigate?

**Answer:** Move repeated work outside the loop if the sorted copy does not change, or choose a data structure or algorithm that avoids repeated full copies and sorts.

**Explanation:** Copying and sorting repeatedly can dominate the loop. Count the cost of the entire operation, not just the loop body.

## Coding questions

### 36. Find the largest number in one pass and return undefined for an empty array.

**Answer:**

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

**Explanation:** The algorithm visits each value at most once, so it takes O(n) time and O(1) auxiliary space.

### 37. Count values with a Map.

**Answer:**

~~~js
function countValues(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}
~~~

**Explanation:** The loop performs one count update per input value. The extra map space grows with the number of distinct values.

### 38. Use two pointers to find whether a sorted array contains a pair with a target sum.

**Answer:**

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

**Explanation:** Each step moves one pointer inward, so there are at most n pointer moves. The input must be sorted.

### 39. Find the maximum sum of a fixed-size window.

**Answer:**

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

**Explanation:** The first window is summed once. Each following window adds one value and removes one value, giving O(n) total time and O(1) extra space.

### 40. Search a sorted array with binary search and return -1 when the target is absent.

**Answer:**

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

**Explanation:** Each comparison discards about half of the remaining range. The time complexity is O(log n), with O(1) auxiliary space. The array must be sorted.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [132 - Data structures in JavaScript](../lessons/132-data-structures-in-javascript.md) | [Lesson 133](../lessons/133-algorithmic-thinking-complexity-and-common-patterns.md) | [Open example](../examples/133-algorithmic-thinking-complexity-and-common-patterns.md) | [134 - Functional programming: composition and purity](../lessons/134-functional-programming-composition-and-purity.md) |
