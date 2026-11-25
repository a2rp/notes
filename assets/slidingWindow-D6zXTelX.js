import{W as e,at as t,n,pt as r,st as i,tt as a}from"./index-CiOkSCYJ.js";var o={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},s=r(),c=()=>(0,s.jsxs)(`section`,{className:o.page,children:[(0,s.jsx)(`div`,{className:o.pageHeader,children:(0,s.jsxs)(`div`,{className:o.titleSection,children:[(0,s.jsx)(`div`,{className:o.iconBox,children:(0,s.jsx)(e,{})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`h2`,{className:o.title,children:`Sliding Window`}),(0,s.jsx)(`p`,{className:o.subtitle,children:`Fixed window, variable window, and two pointers`})]})]})}),(0,s.jsx)(`div`,{className:o.intro,children:`Sliding Window is a pattern for problems where you need information about a continuous subarray / substring. Instead of recomputing from scratch, you reuse work by moving a window step-by-step. This converts many O(n²) solutions into O(n).`}),(0,s.jsxs)(`div`,{className:o.grid,children:[(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(n,{}),(0,s.jsx)(`h3`,{children:`What is a Window`})]}),(0,s.jsx)(`p`,{children:`A window is a range inside an array/string represented by two pointers: left and right.`}),(0,s.jsx)(`pre`,{children:`// window is [l..r]
let l = 0;

for (let r = 0; r < arr.length; r++) {
  // expand window by moving r

  // shrink window by moving l when needed
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`Mental model: expand, then shrink to maintain a condition.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(t,{}),(0,s.jsx)(`h3`,{children:`Fixed Window`})]}),(0,s.jsx)(`p`,{children:`Window size is constant (k). You slide by adding the new element and removing the old one.`}),(0,s.jsx)(`pre`,{children:`// Max sum of subarray of size k
function maxSumFixedWindow(arr, k) {
  if (k <= 0 || k > arr.length) {
    return null;
  }

  let sum = 0;

  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }

  let best = sum;

  for (let r = k; r < arr.length; r++) {
    sum += arr[r];        // add new
    sum -= arr[r - k];    // remove old

    best = Math.max(best, sum);
  }

  return best;
}

// Example:
console.log(
  maxSumFixedWindow(
    [2, 1, 5, 1, 3, 2],
    3
  )
);

// 9 (5 + 1 + 3)`}),(0,s.jsx)(`p`,{className:o.mini,children:`Time: O(n), Space: O(1)`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(i,{}),(0,s.jsx)(`h3`,{children:`Variable Window`})]}),(0,s.jsx)(`p`,{children:`Window size changes. Typically used when you need the smallest or longest range satisfying a condition.`}),(0,s.jsx)(`pre`,{children:`// Smallest subarray length
// with sum >= target
function minLenSubarraySum(arr, target) {
  let l = 0;
  let sum = 0;
  let best = Infinity;

  for (let r = 0; r < arr.length; r++) {
    sum += arr[r];

    while (sum >= target) {
      best = Math.min(
        best,
        r - l + 1
      );

      sum -= arr[l];
      l++;
    }
  }

  return best === Infinity ? 0 : best;
}

// Example:
console.log(
  minLenSubarraySum(
    [2, 3, 1, 2, 4, 3],
    7
  )
);

// 2 (4 + 3)`}),(0,s.jsx)(`p`,{className:o.mini,children:`Pattern: expand until valid, shrink to minimize.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(a,{}),(0,s.jsx)(`h3`,{children:`Two Pointer Technique`})]}),(0,s.jsx)(`p`,{children:`Two pointers is a broader pattern. Sliding window is one type. Two pointers also works on sorted arrays and opposite-end scanning.`}),(0,s.jsx)(`pre`,{children:`// Pair sum in sorted array
function hasPairWithSumSorted(
  arr,
  target
) {
  let l = 0;
  let r = arr.length - 1;

  while (l < r) {
    const sum = arr[l] + arr[r];

    if (sum === target) {
      return true;
    }

    if (sum < target) {
      l++;
    } else {
      r--;
    }
  }

  return false;
}

// Example:
console.log(
  hasPairWithSumSorted(
    [1, 2, 4, 7, 11, 15],
    15
  )
);

// true (4 + 11)`}),(0,s.jsx)(`p`,{className:o.mini,children:`Works best when array is sorted or condition is monotonic.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(e,{}),(0,s.jsx)(`h3`,{children:`Common Use Cases`})]}),(0,s.jsx)(`p`,{children:`Sliding window is common for:`}),(0,s.jsx)(`pre`,{children:`- longest substring without
  repeating characters

- max/min sum in range
  of size k

- smallest window meeting
  a condition

- count of distinct elements
  in a window

- frequency-based substring
  problems`}),(0,s.jsx)(`p`,{className:o.mini,children:`If it says "subarray" / "substring", think window.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(n,{}),(0,s.jsx)(`h3`,{children:`Common Pitfalls`})]}),(0,s.jsx)(`p`,{children:`Sliding window works when the condition is maintainable as you move pointers. If the property is not monotonic, window logic can break.`}),(0,s.jsx)(`pre`,{children:`// Pitfalls:

- forgetting to shrink
  with while(...)

- shrinking with if
  instead of while

- incorrect window size
  calculation:
  r - l + 1

- using window for
  non-monotonic constraints`}),(0,s.jsx)(`p`,{className:o.mini,children:`Use "while" when condition might need multiple shrinks.`})]})]})]});export{c as default};