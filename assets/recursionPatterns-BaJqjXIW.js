import{E as e,I as t,Y as n,at as r,pt as i,tt as a}from"./index-CiOkSCYJ.js";var o={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},s=i(),c=()=>(0,s.jsxs)(`section`,{className:o.page,children:[(0,s.jsx)(`div`,{className:o.pageHeader,children:(0,s.jsxs)(`div`,{className:o.titleSection,children:[(0,s.jsx)(`div`,{className:o.iconBox,children:(0,s.jsx)(n,{})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`h2`,{className:o.title,children:`Recursion Patterns`}),(0,s.jsx)(`p`,{className:o.subtitle,children:`Backtracking, divide and conquer, subsets, permutations`})]})]})}),(0,s.jsx)(`div`,{className:o.intro,children:`Recursion is a technique where a function solves a problem by calling itself on smaller inputs. The power of recursion comes from patterns. Once you understand these patterns, many “hard” problems become predictable.`}),(0,s.jsxs)(`div`,{className:o.grid,children:[(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(r,{}),(0,s.jsx)(`h3`,{children:`Backtracking (Intro)`})]}),(0,s.jsx)(`p`,{children:`Backtracking explores multiple choices, builds a partial solution, and undoes steps when a path fails. Think: “try, recurse, undo”.`}),(0,s.jsx)(`pre`,{children:`// Backtracking skeleton
function backtrack(path, choices) {
  // 1) check if done
  // 2) loop over choices
  // 3) choose
  // 4) recurse
  // 5) undo
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`Used in: permutations, combinations, sudoku, n-queens, subsets.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(e,{}),(0,s.jsx)(`h3`,{children:`Divide and Conquer`})]}),(0,s.jsx)(`p`,{children:`Divide the problem into smaller subproblems, solve them recursively, then combine results.`}),(0,s.jsx)(`pre`,{children:`// Example idea: Merge Sort
// divide: split array into two halves
// conquer: sort each half
// combine: merge two sorted halves`}),(0,s.jsx)(`p`,{className:o.mini,children:`Common: merge sort, quick sort, binary search.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(t,{}),(0,s.jsx)(`h3`,{children:`Subset Generation`})]}),(0,s.jsx)(`p`,{children:`For each element, you have two choices: include it or skip it. That creates a binary decision tree.`}),(0,s.jsx)(`pre`,{children:`// Generate all subsets (power set)
function subsets(nums) {
  const res = [];

  function dfs(i, path) {
    if (i === nums.length) {
      res.push([...path]);
      return;
    }

    // choice 1: skip nums[i]
    dfs(i + 1, path);

    // choice 2: include nums[i]
    path.push(nums[i]);
    dfs(i + 1, path);
    path.pop(); // undo
  }

  dfs(0, []);

  return res;
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`Time: O(2^n) subsets. Space: recursion depth O(n).`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(a,{}),(0,s.jsx)(`h3`,{children:`Permutations`})]}),(0,s.jsx)(`p`,{children:`Permutations are about arranging elements. Backtracking picks one unused element at a time.`}),(0,s.jsx)(`pre`,{children:`// Permutations of nums
function permutations(nums) {
  const res = [];
  const used = Array(nums.length).fill(false);

  function dfs(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);

      dfs(path);

      path.pop();     // undo
      used[i] = false;
    }
  }

  dfs([]);

  return res;
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`Time: O(n!) permutations. Space: O(n) recursion + used array.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(n,{}),(0,s.jsx)(`h3`,{children:`Tail Recursion (Concept)`})]}),(0,s.jsx)(`p`,{children:`Tail recursion happens when the recursive call is the last operation in the function. Some languages can optimize it, reducing stack usage. JavaScript engines usually do not rely on it.`}),(0,s.jsx)(`pre`,{children:`// Tail recursion style (concept)
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, acc * n);
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`In JS, prefer iterative approach when depth can be large.`})]})]})]});export{c as default};