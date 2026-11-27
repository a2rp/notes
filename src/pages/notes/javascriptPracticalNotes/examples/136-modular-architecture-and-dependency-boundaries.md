# 136 - Modular architecture and dependency boundaries: Example

## Question

Build a small task application with clear module and dependency boundaries. Keep task rules in a domain module, coordinate use cases in an application module, place storage behind an adapter, and wire the concrete pieces in one entry point.

The application must create a task, mark it complete, and list saved tasks. Its application service should not import or construct the storage adapter.

## Project structure

~~~text
task-app/
  package.json
  src/
    domain/
      task.js
    application/
      task-service.js
    adapters/
      memory-task-repository.js
    main.js
~~~

## Package setup

The package metadata tells Node.js to interpret the project's JavaScript files as ECMAScript modules.

~~~json
{
  "type": "module"
}
~~~

## Domain module: src/domain/task.js

~~~js
export class Task {
  #id;
  #title;
  #completed;

  constructor({ id, title, completed = false }) {
    if (typeof id !== "string" || id.length === 0) {
      throw new TypeError("Task id is required");
    }
    if (typeof title !== "string" || title.trim().length === 0) {
      throw new TypeError("Task title is required");
    }
    if (typeof completed !== "boolean") {
      throw new TypeError("Task completion must be a boolean");
    }

    this.#id = id;
    this.#title = title.trim();
    this.#completed = completed;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get completed() {
    return this.#completed;
  }

  complete() {
    this.#completed = true;
  }

  toRecord() {
    return {
      id: this.#id,
      title: this.#title,
      completed: this.#completed
    };
  }

  static fromRecord(record) {
    return new Task(record);
  }
}
~~~

## Application module: src/application/task-service.js

~~~js
import { Task } from "../domain/task.js";

export class TaskService {
  #repository;
  #makeId;

  constructor({ repository, makeId }) {
    if (
      !repository ||
      typeof repository.save !== "function" ||
      typeof repository.findById !== "function" ||
      typeof repository.findAll !== "function"
    ) {
      throw new TypeError("Repository must provide save, findById, and findAll");
    }
    if (typeof makeId !== "function") {
      throw new TypeError("makeId must be a function");
    }

    this.#repository = repository;
    this.#makeId = makeId;
  }

  async create(title) {
    const task = new Task({ id: this.#makeId(), title });
    await this.#repository.save(task.toRecord());
    return task;
  }

  async complete(taskId) {
    const record = await this.#repository.findById(taskId);
    if (!record) {
      throw new RangeError("Task was not found: " + taskId);
    }

    const task = Task.fromRecord(record);
    task.complete();
    await this.#repository.save(task.toRecord());
    return task;
  }

  async list() {
    const records = await this.#repository.findAll();
    return records.map((record) => Task.fromRecord(record));
  }
}
~~~

## Storage adapter: src/adapters/memory-task-repository.js

~~~js
export class MemoryTaskRepository {
  #records = new Map();

  async save(record) {
    this.#records.set(record.id, { ...record });
  }

  async findById(taskId) {
    const record = this.#records.get(taskId);
    return record ? { ...record } : null;
  }

  async findAll() {
    return Array.from(this.#records.values(), (record) => ({ ...record }));
  }
}
~~~

## Composition root: src/main.js

~~~js
import { TaskService } from "./application/task-service.js";
import { MemoryTaskRepository } from "./adapters/memory-task-repository.js";

async function main() {
  let nextId = 1;
  const repository = new MemoryTaskRepository();
  const taskService = new TaskService({
    repository,
    makeId: () => String(nextId++)
  });

  const task = await taskService.create("Modularize the application");
  await taskService.complete(task.id);

  const tasks = await taskService.list();
  for (const item of tasks) {
    const status = item.completed ? "completed" : "open";
    console.log("Task " + item.id + ": " + item.title + " (" + status + ")");
  }
}

main().catch((error) => {
  console.error("Application failed: " + error.message);
});
~~~

## Expected output

~~~text
Task 1: Modularize the application (completed)
~~~

## Explanation

### The domain owns task rules

The **Task** class validates its state and exposes the operation that changes completion. Callers cannot directly assign to its private fields. The module exports the domain concept without importing a database, web framework, or command-line API.

### The application owns the use case

**TaskService** coordinates creating, completing, and listing tasks. It imports the domain model and depends on a repository contract expressed by the methods it calls: **save**, **findById**, and **findAll**.

The service does not import **MemoryTaskRepository**. A different adapter can be supplied as long as it provides those operations.

### The adapter owns storage details

**MemoryTaskRepository** stores plain records in a private map and returns copies. Its in-memory data disappears when the process exits. A database or file adapter could replace it without changing the domain or use-case modules.

### The entry point is the composition root

**main.js** imports the service and concrete adapter, constructs them, and supplies an ID generator. This is the only module that needs to know which repository implementation is selected.

### Dependencies point toward application rules

The dependency direction is visible in the imports: the service imports the domain; the entry point imports the service and adapter. The adapter does not import the service, so there is no circular dependency.

All local imports include their **.js** extension, and package metadata selects ESM for Node.js. The modules declare code; only the entry point starts the application.

## Try these changes

- Create a second repository adapter with the same three methods and pass it to **TaskService**.
- Supply a fake repository that records calls to **save**, then use it to inspect the application behavior.
- Ask the service to complete a missing task and handle the returned error at the entry point.
- Add a domain rule that prevents completing an already completed task.
- Add a second use case without importing the repository implementation into the application module.
- Introduce a barrel file only if it provides a clear public API, then check that it does not create a cycle.

## What this example demonstrates

- Separate files for domain rules, application behavior, storage implementation, and startup wiring.
- Named exports and explicit relative imports.
- A repository capability that is supplied through dependency injection.
- A composition root that selects the concrete adapter.
- A storage adapter that can be replaced without changing the use case.
- Clear dependency direction without circular imports.

The code is provided for study and has not been run as part of this chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [135 - Object-oriented programming, composition, and design patterns](../lessons/135-object-oriented-programming-composition-and-design-patterns.md) | [Open Q&A](../qnas/136-modular-architecture-and-dependency-boundaries.md) | [Open lesson](../lessons/136-modular-architecture-and-dependency-boundaries.md) | [137 - Error handling, reliability, and application security](../lessons/137-error-handling-reliability-and-application-security.md) |
