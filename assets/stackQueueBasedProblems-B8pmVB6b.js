import{G as e,N as t,Pt as n,Tt as r,gt as i,m as a}from"./index-COQIkgJQ.js";var o={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},s=n(),c=()=>(0,s.jsxs)(`section`,{className:o.page,children:[(0,s.jsx)(`div`,{className:o.pageHeader,children:(0,s.jsxs)(`div`,{className:o.titleSection,children:[(0,s.jsx)(`div`,{className:o.iconBox,children:(0,s.jsx)(e,{})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`h2`,{className:o.title,children:`Stack & Queue Based Problems`}),(0,s.jsx)(`p`,{className:o.subtitle,children:`Classic interview patterns using LIFO and FIFO`})]})]})}),(0,s.jsxs)(`div`,{className:o.intro,children:[`Stacks and queues show up everywhere: parsing, matching brackets, “next greater” problems, and graph traversals. The key is recognizing whether you need `,(0,s.jsx)(`strong`,{children:`LIFO`}),` (stack) or`,` `,(0,s.jsx)(`strong`,{children:`FIFO`}),` (queue) behavior.`]}),(0,s.jsxs)(`div`,{className:o.grid,children:[(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(r,{}),(0,s.jsx)(`h3`,{children:`Monotonic Stack`})]}),(0,s.jsxs)(`p`,{children:[`A monotonic stack keeps elements in increasing or decreasing order. It helps you find the next greater/smaller element in`,(0,s.jsx)(`strong`,{children:` O(n)`}),`.`]}),(0,s.jsx)(`pre`,{children:`// Monotonic decreasing stack (stores indices)
// Useful for next greater element problems
// Idea: keep stack values strictly decreasing

// While current element is greater,
// pop until stack top is greater again`}),(0,s.jsx)(`p`,{className:o.mini,children:`Common trick: store indices, not values.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(i,{}),(0,s.jsx)(`h3`,{children:`Next Greater Element`})]}),(0,s.jsx)(`p`,{children:`For each element, find the next element to the right that is greater. Naive is O(n²). Monotonic stack solves it in O(n).`}),(0,s.jsx)(`pre`,{children:`function nextGreaterElements(nums) {
  const res = new Array(nums.length).fill(-1);
  const st = []; // stack of indices

  for (let i = 0; i < nums.length; i++) {
    while (
      st.length &&
      nums[i] > nums[st[st.length - 1]]
    ) {
      const idx = st.pop();
      res[idx] = nums[i];
    }

    st.push(i);
  }

  return res;
}

// Example:
// [2, 1, 2, 4, 3]
// -> [4, 2, 4, -1, -1]`}),(0,s.jsx)(`p`,{className:o.mini,children:`Time: O(n) because each index is pushed and popped once.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(a,{}),(0,s.jsx)(`h3`,{children:`Valid Parentheses`})]}),(0,s.jsx)(`p`,{children:`Use a stack to match opening brackets. Every closing bracket must match the latest unmatched opener.`}),(0,s.jsx)(`pre`,{children:`function isValid(s) {
  const st = [];

  const match = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const ch of s) {
    if (
      ch === "(" ||
      ch === "[" ||
      ch === "{"
    ) {
      st.push(ch);
    } else {
      if (!st.length) return false;

      const top = st.pop();

      if (top !== match[ch]) {
        return false;
      }
    }
  }

  return st.length === 0;
}

// Examples:
// "()[]{}" -> true
// "(]" -> false
// "([{}])" -> true`}),(0,s.jsx)(`p`,{className:o.mini,children:`Time: O(n), Space: O(n) worst case.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(t,{}),(0,s.jsx)(`h3`,{children:`BFS vs DFS Mental Model`})]}),(0,s.jsx)(`p`,{children:`BFS uses a queue (FIFO) to explore level by level. DFS uses a stack/recursion (LIFO) to go deep first.`}),(0,s.jsx)(`pre`,{children:`// BFS (queue) - level order
function bfs(start, adj) {
  const q = [start];
  const seen = new Set([start]);

  while (q.length) {
    const node = q.shift();

    for (const nei of adj[node]) {
      if (!seen.has(nei)) {
        seen.add(nei);
        q.push(nei);
      }
    }
  }
}

// DFS (stack) - depth first
function dfs(start, adj) {
  const st = [start];
  const seen = new Set([start]);

  while (st.length) {
    const node = st.pop();

    for (const nei of adj[node]) {
      if (!seen.has(nei)) {
        seen.add(nei);
        st.push(nei);
      }
    }
  }
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`BFS is great for shortest path in unweighted graphs. DFS is great for exploration, cycles, components.`})]})]})]});export{c as default};