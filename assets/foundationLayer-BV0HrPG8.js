import{I as e,at as t,b as n,n as r,pt as i,st as a,tt as o}from"./index-CiOkSCYJ.js";var s={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},c=i(),l=()=>(0,c.jsxs)(`section`,{className:s.page,children:[(0,c.jsx)(`div`,{className:s.pageHeader,children:(0,c.jsxs)(`div`,{className:s.titleSection,children:[(0,c.jsx)(`div`,{className:s.iconBox,children:(0,c.jsx)(e,{})}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{className:s.title,children:`Foundation Layer`}),(0,c.jsx)(`p`,{className:s.subtitle,children:`Non negotiable thinking tools`})]})]})}),(0,c.jsx)(`div`,{className:s.intro,children:`Algorithms are not “code tricks”. They are ways of thinking. This section builds the mental tools you need before patterns like binary search, sliding window, greedy, or dynamic programming. If this layer is strong, you stop guessing and start choosing the right approach.`}),(0,c.jsxs)(`div`,{className:s.grid,children:[(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(o,{}),(0,c.jsx)(`h3`,{children:`What is an Algorithm`})]}),(0,c.jsx)(`p`,{children:`An algorithm is a step-by-step procedure that transforms an input into an output. It must be correct, finite, and repeatable.`}),(0,c.jsx)(`pre`,{children:`// "Find max" is an algorithm:
// input: array
// output: maximum value
function maxOf(arr) {
  let best = -Infinity;
  for (const x of arr) best = Math.max(best, x);
  return best;
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Key idea: same input always gives same output (deterministic case).`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Input → Process → Output`})]}),(0,c.jsx)(`p`,{children:`Every problem can be viewed as: data comes in, work happens, result comes out. This helps you avoid messy thinking.`}),(0,c.jsx)(`pre`,{children:`// Input: [2, 4, 6]
// Process: sum them
// Output: 12
function sum(arr) {
  let s = 0;
  for (const x of arr) s += x;
  return s;
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`If you cannot clearly define input/output, the problem is not understood yet.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(t,{}),(0,c.jsx)(`h3`,{children:`Correctness vs Efficiency`})]}),(0,c.jsx)(`p`,{children:`Correctness means the algorithm works for all valid inputs. Efficiency means it performs well as input grows.`}),(0,c.jsx)(`pre`,{children:`// Correct but inefficient (O(n^2))
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
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`First make it correct. Then make it fast.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Time Complexity Recap`})]}),(0,c.jsx)(`p`,{children:`Time complexity describes how runtime grows with input size (n).`}),(0,c.jsx)(`pre`,{children:`// O(1)
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
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Watch for nested loops, repeated scanning, and hidden loops.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(n,{}),(0,c.jsx)(`h3`,{children:`Space Complexity Recap`})]}),(0,c.jsx)(`p`,{children:`Space complexity describes extra memory usage (not counting the input itself).`}),(0,c.jsx)(`pre`,{children:`// O(1) extra space
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
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Space often buys speed (like using Set/Map).`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Big O Refresher`})]}),(0,c.jsx)(`p`,{children:`Big O gives an upper bound on growth. In interviews, treat it as “how bad can it get”.`}),(0,c.jsx)(`pre`,{children:`// Common orders:
O(1)        constant
O(log n)    binary search, balanced trees
O(n)        single pass
O(n log n)  efficient sorting (merge/quick avg)
O(n^2)      nested loops
O(2^n)      subsets/backtracking`}),(0,c.jsx)(`p`,{className:s.mini,children:`Focus on the dominant term, ignore constants.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(e,{}),(0,c.jsx)(`h3`,{children:`Recursion Mental Model`})]}),(0,c.jsx)(`p`,{children:`Recursion means a function calls itself. It requires a base case to stop.`}),(0,c.jsx)(`pre`,{children:`// Factorial: n! = n * (n-1)!
function factorial(n) {
  if (n <= 1) return 1;   // base case
  return n * factorial(n - 1);
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Each call adds a frame to the call stack. Deep recursion can overflow.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(o,{}),(0,c.jsx)(`h3`,{children:`Iterative vs Recursive Trade-offs`})]}),(0,c.jsx)(`p`,{children:`Iteration is often more memory safe. Recursion is often more readable for trees/DFS.`}),(0,c.jsx)(`pre`,{children:`// Fibonacci (iterative) - O(1) space
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
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Recursion without memoization can explode.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Master Theorem (Intuitive Intro)`})]}),(0,c.jsx)(`p`,{children:`Master theorem helps estimate runtime of divide-and-conquer recurrences like:`}),(0,c.jsx)(`pre`,{children:`T(n) = a * T(n/b) + f(n)

// Example: Merge sort
T(n) = 2*T(n/2) + O(n)
=> O(n log n)`}),(0,c.jsx)(`p`,{className:s.mini,children:`You do not need full proof. You need the intuition: “split + combine cost”.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(t,{}),(0,c.jsx)(`h3`,{children:`Lower Bounds (Concept)`})]}),(0,c.jsx)(`p`,{children:`Lower bound means the best possible time any algorithm can achieve for a problem under a model.`}),(0,c.jsx)(`pre`,{children:`// Comparison sorting lower bound:
// Any comparison-based sorting needs
// at least O(n log n) comparisons in worst case.

// That is why merge sort, heap sort are optimal
// in comparison model.`}),(0,c.jsx)(`p`,{className:s.mini,children:`If you know lower bounds, you stop chasing impossible optimizations.`})]})]})]});export{l as default};