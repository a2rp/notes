import{A as e,C as t,M as n,N as r,_ as i,h as a,k as o,m as s,r as c,x as l}from"./index-h3VUpvVn.js";var u={page:`_page_15wqv_1`,pageHeader:`_pageHeader_15wqv_5`,titleSection:`_titleSection_15wqv_7`,iconBox:`_iconBox_15wqv_13`,title:`_title_15wqv_7`,subtitle:`_subtitle_15wqv_35`,intro:`_intro_15wqv_41`,grid:`_grid_15wqv_55`,card:`_card_15wqv_61`,cardHead:`_cardHead_15wqv_86`,mini:`_mini_15wqv_120`},d=r(),f=()=>(0,d.jsxs)(`section`,{className:u.page,children:[(0,d.jsx)(`div`,{className:u.pageHeader,children:(0,d.jsxs)(`div`,{className:u.titleSection,children:[(0,d.jsx)(`div`,{className:u.iconBox,children:(0,d.jsx)(i,{})}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`h2`,{className:u.title,children:`Graph Algorithms`}),(0,d.jsx)(`p`,{className:u.subtitle,children:`BFS, DFS, shortest paths, ordering, MST`})]})]})}),(0,d.jsx)(`div`,{className:u.intro,children:`Graph algorithms handle relationships: roads, networks, dependencies, friends, routes, and flows. Most graph problems reduce to traversal (BFS/DFS), ordering (topological sort), shortest path (Dijkstra/Bellman-Ford/Floyd), or connectivity building (MST/Union-Find).`}),(0,d.jsxs)(`div`,{className:u.grid,children:[(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(l,{}),(0,d.jsx)(`h3`,{children:`BFS`})]}),(0,d.jsx)(`p`,{children:`Breadth First Search explores level by level. Use BFS for shortest path in unweighted graphs.`}),(0,d.jsx)(`pre`,{children:`// BFS (adjacency list)
function bfs(graph, start) {
  const q = [start];
  const visited = new Set([start]);
  const order = [];

  while (q.length) {
    const node = q.shift();
    order.push(node);

    for (const nei of (graph[node] || [])) {
      if (!visited.has(nei)) {
        visited.add(nei);
        q.push(nei);
      }
    }
  }

  return order;
}

// Example graph
const g = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: [],
  E: []
};

console.log(bfs(g, "A"));
// A B C D E`}),(0,d.jsx)(`p`,{className:u.mini,children:`Time: O(V+E), Space: O(V)`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(o,{}),(0,d.jsx)(`h3`,{children:`DFS`})]}),(0,d.jsx)(`p`,{children:`Depth First Search explores deeply before backtracking. Useful for components, cycle checks, paths, topological sort.`}),(0,d.jsx)(`pre`,{children:`// DFS (recursive)
function dfs(
  graph,
  start,
  visited = new Set(),
  order = []
) {
  if (visited.has(start)) return order;

  visited.add(start);
  order.push(start);

  for (const nei of (graph[start] || [])) {
    if (!visited.has(nei)) {
      dfs(graph, nei, visited, order);
    }
  }

  return order;
}

console.log(dfs(g, "A"));
// A B D C E
// one possible order`}),(0,d.jsx)(`p`,{className:u.mini,children:`Time: O(V+E), Space: O(V) (stack/visited)`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(e,{}),(0,d.jsx)(`h3`,{children:`Topological Sort`})]}),(0,d.jsx)(`p`,{children:`Works only on DAG (Directed Acyclic Graph). Gives an order where every edge u → v means u comes before v.`}),(0,d.jsx)(`pre`,{children:`// Kahn's Algorithm
// BFS using indegree
function topoSort(graph) {
  const indeg = {};

  for (const u in graph) {
    indeg[u] = indeg[u] ?? 0;

    for (const v of graph[u]) {
      indeg[v] =
        (indeg[v] ?? 0) + 1;
    }
  }

  const q = [];

  for (const node in indeg) {
    if (indeg[node] === 0) {
      q.push(node);
    }
  }

  const order = [];

  while (q.length) {
    const u = q.shift();
    order.push(u);

    for (const v of (graph[u] || [])) {
      indeg[v]--;

      if (indeg[v] === 0) {
        q.push(v);
      }
    }
  }

  return order.length ===
    Object.keys(indeg).length
      ? order
      : [];
}

// Example DAG
const dag = {
  A: ["C"],
  B: ["C", "D"],
  C: ["E"],
  D: ["F"],
  E: [],
  F: []
};

console.log(topoSort(dag));`}),(0,d.jsx)(`p`,{className:u.mini,children:`Time: O(V+E). Empty result can indicate a cycle.`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(s,{}),(0,d.jsx)(`h3`,{children:`Dijkstra`})]}),(0,d.jsx)(`p`,{children:`Shortest path for non-negative edge weights. Uses greedy: always expand current smallest distance.`}),(0,d.jsx)(`pre`,{children:`// Dijkstra
// simple version O(V^2)
// without heap

// graph:
// {
//   node: [[neighbor, weight], ...]
// }

function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();

  for (const node in graph) {
    dist[node] = Infinity;
  }

  dist[start] = 0;

  const nodes =
    Object.keys(graph);

  for (
    let i = 0;
    i < nodes.length;
    i++
  ) {
    let u = null;
    let best = Infinity;

    for (const n of nodes) {
      if (
        !visited.has(n) &&
        dist[n] < best
      ) {
        best = dist[n];
        u = n;
      }
    }

    if (u === null) break;

    visited.add(u);

    for (const [v, w] of graph[u]) {
      if (
        dist[u] + w <
        dist[v]
      ) {
        dist[v] =
          dist[u] + w;
      }
    }
  }

  return dist;
}

const wg = {
  A: [["B", 4], ["C", 2]],
  B: [["C", 5], ["D", 10]],
  C: [["E", 3]],
  D: [["F", 11]],
  E: [["D", 4]],
  F: []
};

console.log(
  dijkstra(wg, "A")
);`}),(0,d.jsx)(`p`,{className:u.mini,children:`Use a min-heap for O((V+E) log V) in production.`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(c,{}),(0,d.jsx)(`h3`,{children:`Bellman-Ford`})]}),(0,d.jsx)(`p`,{children:`Shortest path that supports negative weights. Can detect negative cycles.`}),(0,d.jsx)(`pre`,{children:`// Bellman-Ford
// edges: [[u, v, w], ...]

function bellmanFord(
  nodes,
  edges,
  start
) {
  const dist = {};

  for (const n of nodes) {
    dist[n] = Infinity;
  }

  dist[start] = 0;

  // Relax edges V-1 times
  for (
    let i = 0;
    i < nodes.length - 1;
    i++
  ) {
    let changed = false;

    for (const [u, v, w] of edges) {
      if (
        dist[u] !== Infinity &&
        dist[u] + w < dist[v]
      ) {
        dist[v] =
          dist[u] + w;

        changed = true;
      }
    }

    if (!changed) break;
  }

  // Detect negative cycle
  for (const [u, v, w] of edges) {
    if (
      dist[u] !== Infinity &&
      dist[u] + w < dist[v]
    ) {
      return {
        dist,
        hasNegativeCycle: true
      };
    }
  }

  return {
    dist,
    hasNegativeCycle: false
  };
}

const nodes =
  ["A", "B", "C", "D"];

const edges = [
  ["A", "B", 1],
  ["B", "C", 2],
  ["A", "C", 6],
  ["C", "D", -3]
];

console.log(
  bellmanFord(
    nodes,
    edges,
    "A"
  )
);`}),(0,d.jsx)(`p`,{className:u.mini,children:`Time: O(VE). Slower than Dijkstra but more flexible.`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(t,{}),(0,d.jsx)(`h3`,{children:`Floyd-Warshall`})]}),(0,d.jsx)(`p`,{children:`All-pairs shortest paths. Works with negative edges (but not negative cycles). Best for dense graphs or small n.`}),(0,d.jsx)(`pre`,{children:`// Floyd-Warshall idea
// O(n^3)

// dist[i][j] = shortest
// distance i -> j

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = Math.min(
        dist[i][j],
        dist[i][k] +
          dist[k][j]
      );
    }
  }
}`}),(0,d.jsx)(`p`,{className:u.mini,children:`Think: try every node as an intermediate stop.`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(n,{}),(0,d.jsx)(`h3`,{children:`Minimum Spanning Tree`})]}),(0,d.jsx)(`p`,{children:`MST connects all nodes with minimum total edge weight in an undirected weighted graph. Common algorithms: Kruskal and Prim.`}),(0,d.jsx)(`pre`,{children:`// Kruskal idea:

// 1) Sort edges by weight

// 2) Add the next lightest edge
//    if it does not form a cycle

// 3) Union-Find helps detect
//    cycles efficiently

// Continue until all nodes
// are connected.`}),(0,d.jsx)(`p`,{className:u.mini,children:`Used in network design, clustering, wiring, and road planning.`})]}),(0,d.jsxs)(`article`,{className:u.card,children:[(0,d.jsxs)(`div`,{className:u.cardHead,children:[(0,d.jsx)(a,{}),(0,d.jsx)(`h3`,{children:`Union-Find`})]}),(0,d.jsx)(`p`,{children:`Union-Find (Disjoint Set) tracks connected components and supports find(x) and union(a, b). Very useful for Kruskal MST and cycle detection.`}),(0,d.jsx)(`pre`,{children:`class UnionFind {
  constructor(n) {
    this.parent =
      Array.from(
        { length: n },
        (_, i) => i
      );

    this.rank =
      Array(n).fill(0);
  }

  find(x) {
    if (
      this.parent[x] !== x
    ) {
      this.parent[x] =
        this.find(
          this.parent[x]
        );
    }

    return this.parent[x];
  }

  union(a, b) {
    const ra = this.find(a);
    const rb = this.find(b);

    if (ra === rb) {
      return false;
    }

    if (
      this.rank[ra] <
      this.rank[rb]
    ) {
      this.parent[ra] = rb;
    } else if (
      this.rank[ra] >
      this.rank[rb]
    ) {
      this.parent[rb] = ra;
    } else {
      this.parent[rb] = ra;
      this.rank[ra]++;
    }

    return true;
  }
}

// Example: 5 nodes
const uf =
  new UnionFind(5);

uf.union(0, 1);
uf.union(1, 2);

console.log(
  uf.find(0) ===
  uf.find(2)
);

// true`}),(0,d.jsx)(`p`,{className:u.mini,children:`With path compression + union by rank: almost O(1) per operation.`})]})]})]});export{f as default};