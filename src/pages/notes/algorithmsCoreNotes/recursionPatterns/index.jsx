
import {
    FiGitBranch,
    FiLayers,
    FiRepeat,
    FiShuffle,
    FiTarget,
} from "react-icons/fi";

import styles from "./style.module.css";

const RecursionPatterns = () => {
    return (
        <section className={styles.page}>
            <div className={styles.pageHeader}>
                <div className={styles.titleSection}>
                    <div className={styles.iconBox}>
                        <FiRepeat />
                    </div>

                    <div>
                        <h2 className={styles.title}>Recursion Patterns</h2>

                        <p className={styles.subtitle}>
                            Backtracking, divide and conquer, subsets,
                            permutations
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.intro}>
                Recursion is a technique where a function solves a problem by
                calling itself on smaller inputs. The power of recursion comes
                from patterns. Once you understand these patterns, many “hard”
                problems become predictable.
            </div>

            <div className={styles.grid}>
                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiTarget />

                        <h3>Backtracking (Intro)</h3>
                    </div>

                    <p>
                        Backtracking explores multiple choices, builds a partial
                        solution, and undoes steps when a path fails. Think:
                        “try, recurse, undo”.
                    </p>

                    <pre>{`// Backtracking skeleton
function backtrack(path, choices) {
  // 1) check if done
  // 2) loop over choices
  // 3) choose
  // 4) recurse
  // 5) undo
}`}</pre>

                    <p className={styles.mini}>
                        Used in: permutations, combinations, sudoku, n-queens,
                        subsets.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiGitBranch />

                        <h3>Divide and Conquer</h3>
                    </div>

                    <p>
                        Divide the problem into smaller subproblems, solve them
                        recursively, then combine results.
                    </p>

                    <pre>{`// Example idea: Merge Sort
// divide: split array into two halves
// conquer: sort each half
// combine: merge two sorted halves`}</pre>

                    <p className={styles.mini}>
                        Common: merge sort, quick sort, binary search.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiLayers />

                        <h3>Subset Generation</h3>
                    </div>

                    <p>
                        For each element, you have two choices: include it or
                        skip it. That creates a binary decision tree.
                    </p>

                    <pre>{`// Generate all subsets (power set)
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
}`}</pre>

                    <p className={styles.mini}>
                        Time: O(2^n) subsets. Space: recursion depth O(n).
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiShuffle />

                        <h3>Permutations</h3>
                    </div>

                    <p>
                        Permutations are about arranging elements. Backtracking
                        picks one unused element at a time.
                    </p>

                    <pre>{`// Permutations of nums
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
}`}</pre>

                    <p className={styles.mini}>
                        Time: O(n!) permutations. Space: O(n) recursion + used
                        array.
                    </p>
                </article>

                <article className={styles.card}>
                    <div className={styles.cardHead}>
                        <FiRepeat />

                        <h3>Tail Recursion (Concept)</h3>
                    </div>

                    <p>
                        Tail recursion happens when the recursive call is the
                        last operation in the function. Some languages can
                        optimize it, reducing stack usage. JavaScript engines
                        usually do not rely on it.
                    </p>

                    <pre>{`// Tail recursion style (concept)
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, acc * n);
}`}</pre>

                    <p className={styles.mini}>
                        In JS, prefer iterative approach when depth can be
                        large.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default RecursionPatterns;
