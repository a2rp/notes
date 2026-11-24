import{I as e,N as t,P as n,_ as r,p as i,u as a}from"./index-EueyKTeo.js";var o={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},s=e(),c=()=>(0,s.jsxs)(`section`,{className:o.page,children:[(0,s.jsx)(`div`,{className:o.pageHeader,children:(0,s.jsxs)(`div`,{className:o.titleSection,children:[(0,s.jsx)(`div`,{className:o.iconBox,children:(0,s.jsx)(t,{})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`h2`,{className:o.title,children:`Greedy`}),(0,s.jsx)(`p`,{className:o.subtitle,children:`Make the best local choice and move forward`})]})]})}),(0,s.jsx)(`div`,{className:o.intro,children:`Greedy algorithms make the best available choice at each step without revisiting previous decisions. They are often simple and fast, but they work only when local optimal choices lead to a globally optimal solution.`}),(0,s.jsxs)(`div`,{className:o.grid,children:[(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(t,{}),(0,s.jsx)(`h3`,{children:`Greedy Mental Model`})]}),(0,s.jsx)(`p`,{children:`At every step, choose the option that looks best right now. Do not backtrack.`}),(0,s.jsx)(`pre`,{children:`// Generic greedy pattern

function greedy(items) {
  // Often sorting is the first step
  items.sort(/* useful order */);

  let result = [];

  for (const item of items) {
    if (canTake(item, result)) {
      result.push(item);
    }
  }

  return result;
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`The hard part is proving that the local choice is globally safe.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(i,{}),(0,s.jsx)(`h3`,{children:`Activity Selection`})]}),(0,s.jsx)(`p`,{children:`Select the maximum number of non-overlapping activities. Greedy choice: always pick the activity that finishes earliest.`}),(0,s.jsx)(`pre`,{children:`function activitySelection(activities) {
  activities.sort(
    (a, b) => a.end - b.end
  );

  const selected = [];
  let lastEnd = -Infinity;

  for (const activity of activities) {
    if (activity.start >= lastEnd) {
      selected.push(activity);
      lastEnd = activity.end;
    }
  }

  return selected;
}

// Example:
const activities = [
  { start: 1, end: 2 },
  { start: 3, end: 4 },
  { start: 0, end: 6 },
  { start: 5, end: 7 },
  { start: 8, end: 9 },
];

console.log(
  activitySelection(activities)
);`}),(0,s.jsx)(`p`,{className:o.mini,children:`Sorting dominates: O(n log n).`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(r,{}),(0,s.jsx)(`h3`,{children:`Fractional Knapsack`})]}),(0,s.jsx)(`p`,{children:`Items can be taken partially. Greedy choice: take the highest value-per-weight ratio first.`}),(0,s.jsx)(`pre`,{children:`function fractionalKnapsack(
  items,
  capacity
) {
  items.sort(
    (a, b) =>
      b.value / b.weight -
      a.value / a.weight
  );

  let totalValue = 0;

  for (const item of items) {
    if (capacity === 0) break;

    if (item.weight <= capacity) {
      totalValue += item.value;
      capacity -= item.weight;
    } else {
      const fraction =
        capacity / item.weight;

      totalValue +=
        item.value * fraction;

      capacity = 0;
    }
  }

  return totalValue;
}`}),(0,s.jsx)(`p`,{className:o.mini,children:`Greedy works here because fractions are allowed.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(n,{}),(0,s.jsx)(`h3`,{children:`Coin Change - When Greedy Works`})]}),(0,s.jsx)(`p`,{children:`For some coin systems, choosing the largest coin first gives the minimum number of coins.`}),(0,s.jsx)(`pre`,{children:`function greedyCoinChange(
  coins,
  amount
) {
  coins.sort((a, b) => b - a);

  const used = [];

  for (const coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      used.push(coin);
    }
  }

  return amount === 0
    ? used
    : null;
}

// Example:
// coins = [25, 10, 5, 1]
// amount = 41
//
// result:
// [25, 10, 5, 1]`}),(0,s.jsx)(`p`,{className:o.mini,children:`This is not correct for every coin system.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(a,{}),(0,s.jsx)(`h3`,{children:`When Greedy Fails`})]}),(0,s.jsx)(`p`,{children:`A locally best choice can block a better global solution.`}),(0,s.jsx)(`pre`,{children:`// Example coin system:
// [1, 3, 4]
//
// amount = 6
//
// Greedy:
// 4 + 1 + 1 = 3 coins
//
// Optimal:
// 3 + 3 = 2 coins

// Greedy fails.`}),(0,s.jsx)(`p`,{className:o.mini,children:`If choices affect future possibilities, dynamic programming may be needed.`})]}),(0,s.jsxs)(`article`,{className:o.card,children:[(0,s.jsxs)(`div`,{className:o.cardHead,children:[(0,s.jsx)(t,{}),(0,s.jsx)(`h3`,{children:`Greedy Checklist`})]}),(0,s.jsx)(`p`,{children:`Before choosing a greedy solution, ask:`}),(0,s.jsx)(`pre`,{children:`1) Can I make one local choice
   and safely move forward?

2) Does sorting expose the
   best choice?

3) Can I prove the greedy
   choice never hurts?

4) Is backtracking unnecessary?

5) Does a counterexample exist?`}),(0,s.jsx)(`p`,{className:o.mini,children:`Never use greedy only because the code looks simple.`})]})]})]});export{c as default};