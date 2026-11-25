import{E as e,M as t,N as n,b as r,h as i,j as a,x as o}from"./index-BQ0h7Bio.js";var s={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},c=n(),l=()=>(0,c.jsxs)(`section`,{className:s.page,children:[(0,c.jsx)(`div`,{className:s.pageHeader,children:(0,c.jsxs)(`div`,{className:s.titleSection,children:[(0,c.jsx)(`div`,{className:s.iconBox,children:(0,c.jsx)(r,{})}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{className:s.title,children:`Dynamic Programming`}),(0,c.jsx)(`p`,{className:s.subtitle,children:`Turn exponential into polynomial`})]})]})}),(0,c.jsxs)(`div`,{className:s.intro,children:[`Dynamic Programming (DP) is a technique for solving problems by breaking them into subproblems and reusing computed results. DP is usually used when a problem has`,` `,(0,c.jsx)(`strong`,{children:`overlapping subproblems`}),` and`,` `,(0,c.jsx)(`strong`,{children:`optimal substructure`}),`. The goal is simple: avoid recomputing the same work again and again.`]}),(0,c.jsxs)(`div`,{className:s.grid,children:[(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(e,{}),(0,c.jsx)(`h3`,{children:`Overlapping Subproblems`})]}),(0,c.jsx)(`p`,{children:`If the same subproblem appears multiple times, naive recursion repeats work. DP stores results so each subproblem is solved once.`}),(0,c.jsx)(`pre`,{children:`// Fibonacci overlap example:
// fib(5) calls fib(4) and fib(3)
// fib(4) again calls fib(3) and fib(2)
// fib(3) repeats multiple times`}),(0,c.jsx)(`p`,{className:s.mini,children:`Repeated work is the main DP signal.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(o,{}),(0,c.jsx)(`h3`,{children:`Memoization (Top-down)`})]}),(0,c.jsx)(`p`,{children:`Memoization keeps recursion but caches answers. If you ask for the same state again, return cached value.`}),(0,c.jsx)(`pre`,{children:`// Fibonacci with memoization
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];

  memo[n] =
    fibMemo(n - 1, memo) +
    fibMemo(n - 2, memo);

  return memo[n];
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Same recursion structure, but faster.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(i,{}),(0,c.jsx)(`h3`,{children:`Tabulation (Bottom-up)`})]}),(0,c.jsx)(`p`,{children:`Tabulation builds answers iteratively from base cases to the final answer using a DP table.`}),(0,c.jsx)(`pre`,{children:`// Fibonacci with tabulation
function fibTab(n) {
  if (n <= 1) return n;

  const dp = Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] =
      dp[i - 1] +
      dp[i - 2];
  }

  return dp[n];
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Usually easier to control space usage.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`0/1 Knapsack (Core Idea)`})]}),(0,c.jsxs)(`p`,{children:[`You either take an item or skip it (no partial items). DP state often uses`,` `,(0,c.jsx)(`strong`,{children:`(index, remainingCapacity)`}),`.`]}),(0,c.jsx)(`pre`,{children:`// 0/1 Knapsack (tabulation idea)

// dp[i][w] = max value using
// first i items with capacity w

// transition:
dp[i][w] = dp[i - 1][w];

// skip item

dp[i][w] = Math.max(
  dp[i][w],
  value[i] +
    dp[i - 1][w - weight[i]]
);

// take item`}),(0,c.jsx)(`p`,{className:s.mini,children:`Classic example of "choice" DP.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(t,{}),(0,c.jsx)(`h3`,{children:`LIS Concept`})]}),(0,c.jsx)(`p`,{children:`LIS = Longest Increasing Subsequence. The DP idea: for each position, find the best sequence ending there.`}),(0,c.jsx)(`pre`,{children:`// LIS DP (O(n^2) idea)

// dp[i] = length of LIS
// ending at i

dp[i] =
  1 + max(dp[j])

// for all j < i
// where arr[j] < arr[i]`}),(0,c.jsx)(`p`,{className:s.mini,children:`Later optimized with binary search (O(n log n)).`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(e,{}),(0,c.jsx)(`h3`,{children:`Fibonacci DP (Most Basic DP)`})]}),(0,c.jsx)(`p`,{children:`Fibonacci is the easiest way to understand DP. It shows overlap and caching clearly.`}),(0,c.jsx)(`pre`,{children:`// Space optimized Fibonacci
function fibOpt(n) {
  if (n <= 1) return n;

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }

  return b;
}`}),(0,c.jsx)(`p`,{className:s.mini,children:`Same DP, but O(1) extra space.`})]}),(0,c.jsxs)(`article`,{className:s.card,children:[(0,c.jsxs)(`div`,{className:s.cardHead,children:[(0,c.jsx)(o,{}),(0,c.jsx)(`h3`,{children:`DP State Thinking`})]}),(0,c.jsxs)(`p`,{children:[`DP is mostly about designing the right`,` `,(0,c.jsx)(`strong`,{children:`state`}),`.`]}),(0,c.jsx)(`pre`,{children:`DP checklist:

1) What changes during recursion?
   => state variables

2) What is the answer
   for that state?

3) What are the choices
   (transitions)?

4) What are base cases?

5) Can you reuse results
   for same state?`}),(0,c.jsx)(`p`,{className:s.mini,children:`If state is wrong, DP becomes impossible.`})]})]})]});export{l as default};