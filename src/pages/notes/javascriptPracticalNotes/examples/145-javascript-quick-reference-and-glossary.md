# 145 - JavaScript quick reference and glossary example

This example is a small study planner report. It combines common JavaScript syntax and data operations in one readable program. It uses only built-in language features and runs in a modern Node.js runtime.

## Goal

Create a list of study tasks, validate each record, then print a summary with completion counts, time totals, categories, unique tags, and open tasks.

## Complete example

Copy the JavaScript into a file named **145-quick-reference-demo.mjs**.

~~~js
const DEFAULT_CATEGORY = 'General';

function normalizeText(value, fieldName) {
  if (typeof value !== 'string') {
    throw new TypeError(fieldName + ' must be text');
  }

  const normalized = value.trim().replace(/\s+/g, ' ');

  if (normalized.length === 0) {
    throw new Error(fieldName + ' cannot be empty');
  }

  return normalized;
}

function makeIdGenerator(prefix = 'task') {
  let nextNumber = 1;

  return function nextId() {
    const id = prefix + '-' + String(nextNumber).padStart(3, '0');
    nextNumber += 1;
    return id;
  };
}

function createTask(input, nextId) {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('A task must be an object');
  }

  const title = normalizeText(input.title, 'title');
  const category = normalizeText(input.category ?? DEFAULT_CATEGORY, 'category');
  const minutes = input.minutes ?? 0;

  if (typeof minutes !== 'number' || !Number.isFinite(minutes) || minutes < 0) {
    throw new RangeError('minutes must be a finite, non-negative number');
  }

  if (input.done !== undefined && typeof input.done !== 'boolean') {
    throw new TypeError('done must be a boolean');
  }

  const sourceTags = input.tags ?? [];

  if (!Array.isArray(sourceTags)) {
    throw new TypeError('tags must be an array');
  }

  const tags = [...new Set(sourceTags.map(tag => normalizeText(tag, 'tag')))];
  const owner = input.owner === null || input.owner === undefined
    ? undefined
    : normalizeText(input.owner, 'owner');

  return {
    id: nextId(),
    title,
    category,
    minutes,
    done: input.done ?? false,
    owner,
    tags
  };
}

function summarizeTasks(tasks) {
  const completedTasks = tasks.filter(({ done }) => done);
  const plannedMinutes = tasks.reduce(
    (total, { minutes }) => total + minutes,
    0
  );

  const categoryCounts = tasks.reduce((counts, task) => {
    const previousCount = counts.get(task.category) ?? 0;
    counts.set(task.category, previousCount + 1);
    return counts;
  }, new Map());

  const uniqueTags = [
    ...new Set(tasks.flatMap(task => task.tags))
  ].sort((a, b) => a.localeCompare(b));

  const openTasks = [...tasks]
    .filter(task => !task.done)
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    taskCount: tasks.length,
    completedCount: completedTasks.length,
    plannedMinutes,
    categoryCounts: [...categoryCounts.entries()]
      .sort(([a], [b]) => a.localeCompare(b)),
    uniqueTags,
    openTasks
  };
}

function formatTask({ title, minutes, owner }) {
  const ownerName = owner ?? 'Unassigned';
  return '- ' + title + ' (' + minutes + ' min, owner: ' + ownerName + ')';
}

async function loadTasks() {
  const nextId = makeIdGenerator('study');

  const taskInputs = [
    {
      title: ' Read values ',
      category: 'JavaScript',
      minutes: 25,
      done: true,
      owner: 'Mina',
      tags: ['values', 'core', 'values']
    },
    {
      title: 'Build a small page',
      category: 'HTML',
      minutes: 40,
      done: true,
      owner: 'Arjun',
      tags: ['structure', 'browser']
    },
    {
      title: 'Check semantic structure',
      category: 'HTML',
      minutes: 15,
      tags: ['structure', 'accessibility']
    },
    {
      title: 'Add accessible labels',
      category: 'Accessibility',
      minutes: 10,
      owner: 'Mina',
      tags: ['accessibility', 'forms']
    }
  ];

  return taskInputs.map(input => createTask(input, nextId));
}

async function main() {
  const tasks = await loadTasks();
  const report = summarizeTasks(tasks);

  console.log('JavaScript quick reference report');
  console.log('Tasks: ' + report.taskCount);
  console.log('Completed: ' + report.completedCount);
  console.log('Planned time: ' + report.plannedMinutes + ' minutes');

  console.log('Categories:');
  for (const [category, count] of report.categoryCounts) {
    console.log('- ' + category + ': ' + count);
  }

  console.log('Unique tags: ' + report.uniqueTags.join(', '));
  console.log('Open tasks:');
  for (const task of report.openTasks) {
    console.log(formatTask(task));
  }
}

main().catch(error => {
  console.error('Could not create the report:', error.message);
  process.exitCode = 1;
});
~~~

## Expected output

~~~text
JavaScript quick reference report
Tasks: 4
Completed: 2
Planned time: 90 minutes
Categories:
- Accessibility: 1
- HTML: 2
- JavaScript: 1
Unique tags: accessibility, browser, core, forms, structure, values
Open tasks:
- Add accessible labels (10 min, owner: Mina)
- Check semantic structure (15 min, owner: Unassigned)
~~~

## How it works

### Validate at the boundary

**normalizeText** checks that a value is a string, trims surrounding whitespace, and compresses repeated whitespace. **createTask** validates the record before returning a normalized task. Invalid titles, categories, tags, completion states, or time values cause a useful error.

The task identifier is created only after validation. A rejected record therefore does not consume an identifier.

### Keep state in a closure

**makeIdGenerator** returns a function that remembers **nextNumber**. Each call creates a new identifier and advances the private counter. The counter is not a global variable and callers cannot change it directly.

### Transform and summarize collections

**map** turns input records into validated tasks. **filter** selects completed and open tasks. **reduce** totals planned minutes and builds a **Map** of category counts. **flatMap** gathers tags, and **Set** removes duplicates. A numeric total is not sorted as text; the category and task names use **localeCompare** for readable alphabetical ordering.

The sort calls operate on arrays created for the report. They do not reorder the original task list.

### Use object syntax intentionally

The report uses destructuring in function parameters, default values, nullish coalescing, and array spread. The **owner** property can be undefined. The formatter uses a fallback label for that case.

### Follow asynchronous control flow

**loadTasks** is async to model an asynchronous data source. **main** awaits its result and catches a failure at the program boundary. In a real app, replace the local task array with an appropriate browser or Node.js API and handle that API's failure modes.

## Try these changes

1. Add another task with a new category and see the category count update.
2. Repeat a tag in a task and confirm it appears only once in the report.
3. Set **minutes** to a negative number and read the validation error.
4. Set **done** to the string **'true'** and confirm the boolean check rejects it.
5. Remove an owner's name and see the **Unassigned** fallback.
6. Mark an open task complete and compare the completed and open task sections.

## What this example does not cover

The data stays in memory and resets whenever the program runs. The async function models an asynchronous boundary but does not perform network or file-system I/O. A production app would need persistence, project-specific validation, and tests for its expected inputs and failures.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [144 - Capstone project: plan, build, test, and document an application](../lessons/144-capstone-project-plan-build-test-and-document-an-application.md) | [Lesson](../lessons/145-javascript-quick-reference-and-glossary.md) · [Q&A](../qnas/145-javascript-quick-reference-and-glossary.md) | |

