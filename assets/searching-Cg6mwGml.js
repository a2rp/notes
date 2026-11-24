import{A as e,M as t,N as n,O as r,j as i}from"./index-h3VUpvVn.js";var a={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},o=n(),s=()=>(0,o.jsxs)(`section`,{className:a.page,children:[(0,o.jsx)(`div`,{className:a.pageHeader,children:(0,o.jsxs)(`div`,{className:a.titleSection,children:[(0,o.jsx)(`div`,{className:a.iconBox,children:(0,o.jsx)(r,{})}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h2`,{className:a.title,children:`Searching`}),(0,o.jsx)(`p`,{className:a.subtitle,children:`Find a target efficiently`})]})]})}),(0,o.jsx)(`div`,{className:a.intro,children:`Searching is about locating a target in data. The key decision is whether the data is unsorted or sorted. Unsorted data usually needs a linear scan. Sorted data enables logarithmic searching using binary search and its variations.`}),(0,o.jsxs)(`div`,{className:a.grid,children:[(0,o.jsxs)(`article`,{className:a.card,children:[(0,o.jsxs)(`div`,{className:a.cardHead,children:[(0,o.jsx)(i,{}),(0,o.jsx)(`h3`,{children:`Linear Search`})]}),(0,o.jsx)(`p`,{children:`Checks every element one by one until the target is found. Works on any array (sorted or unsorted).`}),(0,o.jsx)(`pre`,{children:`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }

  return -1;
}

// Time: O(n)
// Space: O(1)`}),(0,o.jsx)(`p`,{className:a.mini,children:`Best when the array is small or unsorted.`})]}),(0,o.jsxs)(`article`,{className:a.card,children:[(0,o.jsxs)(`div`,{className:a.cardHead,children:[(0,o.jsx)(t,{}),(0,o.jsx)(`h3`,{children:`Binary Search`})]}),(0,o.jsx)(`p`,{children:`Works only on sorted data. Repeatedly cuts the search space in half.`}),(0,o.jsx)(`pre`,{children:`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// Time: O(log n)
// Space: O(1)`}),(0,o.jsx)(`p`,{className:a.mini,children:`Requires sorted order. Most common searching tool.`})]}),(0,o.jsxs)(`article`,{className:a.card,children:[(0,o.jsxs)(`div`,{className:a.cardHead,children:[(0,o.jsx)(e,{}),(0,o.jsx)(`h3`,{children:`Binary Search Variations`})]}),(0,o.jsx)(`p`,{children:`Binary search can be modified to find boundaries like first occurrence, last occurrence, lower bound, and upper bound.`}),(0,o.jsx)(`pre`,{children:`// First occurrence of target
function firstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      ans = mid;
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

// Last occurrence of target
function lastOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      ans = mid;
      left = mid + 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}`}),(0,o.jsx)(`p`,{className:a.mini,children:`Variations are used heavily in interviews.`})]}),(0,o.jsxs)(`article`,{className:a.card,children:[(0,o.jsxs)(`div`,{className:a.cardHead,children:[(0,o.jsx)(r,{}),(0,o.jsx)(`h3`,{children:`Lower Bound and Upper Bound`})]}),(0,o.jsx)(`p`,{children:`Lower bound is the first index where value is not less than target. Upper bound is the first index where value is greater than target.`}),(0,o.jsx)(`pre`,{children:`// Lower bound
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}

// Upper bound
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) left = mid + 1;
    else right = mid;
  }

  return left;
}`}),(0,o.jsx)(`p`,{className:a.mini,children:`These are boundary-finding patterns.`})]}),(0,o.jsxs)(`article`,{className:a.card,children:[(0,o.jsxs)(`div`,{className:a.cardHead,children:[(0,o.jsx)(t,{}),(0,o.jsx)(`h3`,{children:`Ternary Search (Brief)`})]}),(0,o.jsx)(`p`,{children:`Similar to binary search but splits range into three parts. Mostly used when searching for a maximum/minimum in a unimodal function.`}),(0,o.jsx)(`pre`,{children:`// Ternary search on a unimodal function f(x)
// Conceptual example
function ternarySearch(left, right, f, eps = 1e-6) {
  while (right - left > eps) {
    const m1 = left + (right - left) / 3;
    const m2 = right - (right - left) / 3;

    if (f(m1) < f(m2)) left = m1;
    else right = m2;
  }

  return left;
}`}),(0,o.jsx)(`p`,{className:a.mini,children:`Rare for array search. More common in optimization problems.`})]}),(0,o.jsxs)(`article`,{className:a.card,children:[(0,o.jsxs)(`div`,{className:a.cardHead,children:[(0,o.jsx)(i,{}),(0,o.jsx)(`h3`,{children:`Mental Checklist`})]}),(0,o.jsx)(`p`,{children:`Before choosing a search method, ask:`}),(0,o.jsx)(`pre`,{children:`1) Is the data sorted?
2) Do I need exact value or boundary?
3) Is it a function optimization problem?
4) Can I reduce the search space each step?`}),(0,o.jsx)(`p`,{className:a.mini,children:`If sorted → binary search family. If unsorted → linear search.`})]})]})]});export{s as default};