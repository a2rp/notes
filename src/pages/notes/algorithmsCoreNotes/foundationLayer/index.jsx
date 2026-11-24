
import {
    FiActivity,
    FiCpu,
    FiLayers,
    FiShuffle,
    FiTarget,
    FiTrendingUp,
} from "react-icons/fi";

import styles from "./style.module.css";

const FoundationLayer = () => {
    return (
        <section className={styles.page}>
            <div className={styles.pageHeader}>
                <div className={styles.titleSection}>
                    <div className={styles.iconBox}>
                        <FiLayers />
                    </div>

                    <div>
                        <h2 className={styles.title}>Foundation Layer</h2>

                        <p className={styles.subtitle}>
                            Non negotiable thinking tools
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.intro}>
                Algorithms are not “code tricks”. They are ways of thinking.
                This section builds the mental tools you need before patterns
                like binary search, sliding window, greedy, or dynamic
                programming. If this layer is strong, you stop guessing and
                start choosing the right approach.
            </div>

            <div className={styles.grid}>
                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiShuffle />

                        <h3>What is an Algorithm</h3>
                    </div>

                    <p>
                        An algorithm is a step-by-step procedure that transforms
                        an input into an output. It must be correct, finite, and
                        repeatable.
                    </p>

                    <pre>{`// "Find max" is an algorithm:
// input: array
// output: maximum value
function maxOf(arr) {
  let best = -Infinity;
  for (const x of arr) best = Math.max(best, x);
  return best;
}`}</pre>

                    <p className={styles.mini}>
                        Key idea: same input always gives same output
                        (deterministic case).
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiActivity />

                        <h3>Input → Process → Output</h3>
                    </div>

                    <p>
                        Every problem can be viewed as: data comes in, work
                        happens, result comes out. This helps you avoid messy
                        thinking.
                    </p>

                    <pre>{`// Input: [2, 4, 6]
// Process: sum them
// Output: 12
function sum(arr) {
  let s = 0;
  for (const x of arr) s += x;
  return s;
}`}</pre>

                    <p className={styles.mini}>
                        If you cannot clearly define input/output, the problem
                        is not understood yet.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiTarget />

                        <h3>Correctness vs Efficiency</h3>
                    </div>

                    <p>
                        Correctness means the algorithm works for all valid
                        inputs. Efficiency means it performs well as input
                        grows.
                    </p>

                    <pre>{`// Correct but inefficient (O(n^2))
function hasDuplicateSlow(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// Correct and faster average (O(n))
function hasDuplicateFast(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}`}</pre>

                    <p className={styles.mini}>
                        First make it correct. Then make it fast.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiTrendingUp />

                        <h3>Time Complexity Recap</h3>
                    </div>

                    <p>
                        Time complexity describes how runtime grows with input
                        size (n).
                    </p>

                    <pre>{`// O(1)
function getFirst(arr) {
  return arr[0];
}

// O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// O(n^2)
function allPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      // work
    }
  }
}`}</pre>

                    <p className={styles.mini}>
                        Watch for nested loops, repeated scanning, and hidden
                        loops.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiCpu />

                        <h3>Space Complexity Recap</h3>
                    </div>

                    <p>
                        Space complexity describes extra memory usage (not
                        counting the input itself).
                    </p>

                    <pre>{`// O(1) extra space
function sumInPlace(arr) {
  let s = 0;
  for (const x of arr) s += x;
  return s;
}

// O(n) extra space
function copyArray(arr) {
  const out = [];
  for (const x of arr) out.push(x);
  return out;
}`}</pre>

                    <p className={styles.mini}>
                        Space often buys speed (like using Set/Map).
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiTrendingUp />

                        <h3>Big O Refresher</h3>
                    </div>

                    <p>
                        Big O gives an upper bound on growth. In interviews,
                        treat it as “how bad can it get”.
                    </p>

                    <pre>{`// Common orders:
O(1)        constant
O(log n)    binary search, balanced trees
O(n)        single pass
O(n log n)  efficient sorting (merge/quick avg)
O(n^2)      nested loops
O(2^n)      subsets/backtracking`}</pre>

                    <p className={styles.mini}>
                        Focus on the dominant term, ignore constants.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiLayers />

                        <h3>Recursion Mental Model</h3>
                    </div>

                    <p>
                        Recursion means a function calls itself. It requires a
                        base case to stop.
                    </p>

                    <pre>{`// Factorial: n! = n * (n-1)!
function factorial(n) {
  if (n <= 1) return 1;   // base case
  return n * factorial(n - 1);
}`}</pre>

                    <p className={styles.mini}>
                        Each call adds a frame to the call stack. Deep recursion
                        can overflow.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiShuffle />

                        <h3>Iterative vs Recursive Trade-offs</h3>
                    </div>

                    <p>
                        Iteration is often more memory safe. Recursion is often
                        more readable for trees/DFS.
                    </p>

                    <pre>{`// Fibonacci (iterative) - O(1) space
function fib(n) {
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }

  return a;
}

// Fibonacci (recursive) - exponential without memoization
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}`}</pre>

                    <p className={styles.mini}>
                        Recursion without memoization can explode.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiTrendingUp />

                        <h3>Master Theorem (Intuitive Intro)</h3>
                    </div>

                    <p>
                        Master theorem helps estimate runtime of
                        divide-and-conquer recurrences like:
                    </p>

                    <pre>{`T(n) = a * T(n/b) + f(n)

// Example: Merge sort
T(n) = 2*T(n/2) + O(n)
=> O(n log n)`}</pre>

                    <p className={styles.mini}>
                        You do not need full proof. You need the intuition:
                        “split + combine cost”.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiTarget />

                        <h3>Lower Bounds (Concept)</h3>
                    </div>

                    <p>
                        Lower bound means the best possible time any algorithm
                        can achieve for a problem under a model.
                    </p>

                    <pre>{`// Comparison sorting lower bound:
// Any comparison-based sorting needs
// at least O(n log n) comparisons in worst case.

// That is why merge sort, heap sort are optimal
// in comparison model.`}</pre>

                    <p className={styles.mini}>
                        If you know lower bounds, you stop chasing impossible
                        optimizations.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default FoundationLayer;
