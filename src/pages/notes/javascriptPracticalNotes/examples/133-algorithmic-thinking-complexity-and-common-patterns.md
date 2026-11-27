# 133 - Algorithmic thinking, complexity, and common patterns: Example

This example implements several patterns from the lesson in one JavaScript file. It prints deterministic results so you can compare each algorithm with its input assumptions and complexity notes.

## Create this file

~~~text
algorithm-patterns-demo/
  algorithm-patterns.mjs
~~~

### algorithm-patterns-demo/algorithm-patterns.mjs

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

function countValues(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

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

function buildPrefixSums(values) {
  const prefix = [0];

  for (const value of values) {
    prefix.push(prefix[prefix.length - 1] + value);
  }

  return prefix;
}

function rangeSum(prefix, start, endExclusive) {
  if (
    !Number.isInteger(start)
    || !Number.isInteger(endExclusive)
    || start < 0
    || endExclusive < start
    || endExclusive >= prefix.length
  ) {
    return undefined;
  }

  return prefix[endExclusive] - prefix[start];
}

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

console.log("largest:", findLargest([-11, -4, -20]));

const frequencies = countValues([
  "red",
  "blue",
  "red",
  "green",
  "blue",
  "red",
]);
console.log("frequencies:", JSON.stringify([...frequencies]));

const sortedValues = [1, 2, 4, 7, 11];
console.log("pair sum 9:", hasPairWithSum(sortedValues, 9));
console.log("pair sum 20:", hasPairWithSum(sortedValues, 20));

const measurements = [2, 1, 5, 1, 3, 2];
console.log("largest window sum:", maximumWindowSum(measurements, 3));
console.log("invalid window:", maximumWindowSum(measurements, 0));

const dailyChanges = [3, 1, 4, 1, 5];
const prefix = buildPrefixSums(dailyChanges);
console.log("sum of range [1, 4):", rangeSum(prefix, 1, 4));

const sortedScores = [-8, -2, 3, 7, 12, 19];
console.log("index of 7:", binarySearch(sortedScores, 7));
console.log("index of 8:", binarySearch(sortedScores, 8));
~~~

## Run the example

From the demo folder, run:

~~~sh
node algorithm-patterns.mjs
~~~

Expected output:

~~~text
largest: -4
frequencies: [["red",3],["blue",2],["green",1]]
pair sum 9: true
pair sum 20: false
largest window sum: 9
invalid window: undefined
sum of range [1, 4): 6
index of 7: 3
index of 8: -1
~~~

## How the examples work

### Linear scan

findLargest() starts with the first value, so it correctly handles an array containing only negative numbers. It returns undefined for an empty array. It takes O(n) time and O(1) auxiliary space.

### Frequency counting

countValues() uses a Map to associate each distinct value with its count. For n inputs and k distinct values, the map stores O(k) entries. The loop visits each input once. Exact lookup cost depends on the runtime implementation, so treat efficient Map access as an explicit assumption in a practical estimate.

### Two pointers

hasPairWithSum() begins at both ends of an already sorted array. A sum that is too small advances the left pointer. A sum that is too large moves the right pointer inward. Each pointer only moves toward the other, so the search takes O(n) time and O(1) auxiliary space. The function does not sort its input.

### Sliding window

maximumWindowSum() sums the first window and then updates the total by subtracting the value that leaves and adding the value that enters. It takes O(n) time and O(1) auxiliary space instead of summing each overlapping window again.

The function rejects a window size that is not an integer between one and the input length.

### Prefix sums

buildPrefixSums() creates an array where each position stores the sum before that position in the original input. rangeSum() accepts a half-open interval, including start and stopping before endExclusive.

Building the prefix array takes O(n) time and O(n) extra space. Each valid range query takes O(1) time.

### Binary search

binarySearch() uses a half-open range from low to high. Each comparison discards about half the remaining values, so it takes O(log n) time and O(1) auxiliary space. The input must already be sorted according to the same ordering used by the comparisons.

## Compare the patterns

| Pattern | Input requirement | Time | Extra space |
| --- | --- | --- | --- |
| Linear scan for a maximum | Any array of comparable numbers | O(n) | O(1) |
| Frequency counting | Values usable as Map keys | O(n) loop work, assuming efficient map operations | O(k) |
| Two pointers for pair sum | Sorted numeric array | O(n) | O(1) |
| Fixed-size sliding window | Valid window size | O(n) | O(1) |
| Prefix sums | Repeated range queries over unchanged values | O(n) to build, O(1) per query | O(n) |
| Binary search | Sorted input | O(log n) | O(1) |

The table states the assumptions used by these estimates. It does not guarantee the exact time of a particular JavaScript runtime.

## Try these changes

- Pass an empty array and a one-item array to findLargest().
- Add another value to the frequency-counting input and check how the Map changes.
- Try pair sums that use the first and last values, and try a target that is absent.
- Use a window size equal to the full array length.
- Query the first and last valid half-open ranges with the prefix array.
- Search for the first item, last item, and a missing value with binary search.
- Change the input sizes and estimate how each pattern's work grows before measuring it.

## What this example demonstrates

- Turning a plain-language problem into explicit inputs and return behavior.
- Counting values with a map.
- Replacing pair-by-pair checks with two pointers for sorted data.
- Updating a running total as a fixed-size window moves.
- Reusing precomputed prefix sums for range queries.
- Halving a sorted search range with binary search.
- Stating input assumptions, time growth, and extra space.

The code in this example is provided for study. It has not been run as part of this chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [132 - Data structures in JavaScript](../lessons/132-data-structures-in-javascript.md) | [Open Q&A](../qnas/133-algorithmic-thinking-complexity-and-common-patterns.md) | [Open lesson](../lessons/133-algorithmic-thinking-complexity-and-common-patterns.md) | [134 - Functional programming: composition and purity](../lessons/134-functional-programming-composition-and-purity.md) |
