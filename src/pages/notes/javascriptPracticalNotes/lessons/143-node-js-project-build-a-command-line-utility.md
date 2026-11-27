# 143 - Node.js project: build a command-line utility

This chapter builds a small command-line notes utility with Node.js. It accepts commands and options, stores notes in a local JSON file, and reports success or failure with useful process exit codes.

A command-line tool has no graphical page to guide the user. Its command syntax, output, file behavior, and errors form the interface. Plan them before writing implementation code.

## Learning goals

- Turn a command-line use case into commands and acceptance criteria.
- Read options and positional arguments with Node.js.
- Define clear command syntax and help output.
- Resolve file paths predictably.
- Read, parse, validate, and write JSON using promise-based file APIs.
- Separate standard output from error output.
- Return meaningful exit codes without interrupting pending I/O.
- Handle missing files, malformed data, and invalid arguments.
- Understand the limits of a small local file store.
- Organize a CLI into argument parsing, commands, storage, and reporting.

## Define the utility

The project is a local notes manager. It supports these commands:

~~~text
node notes.mjs add "Read the deployment guide"
node notes.mjs list
node notes.mjs done 1
node notes.mjs remove 1
node notes.mjs --help
~~~

The utility stores notes in notes.json in the current working directory by default. A --file option can select a different data file:

~~~text
node notes.mjs --file ./data/notes.json add "Review the form"
~~~

Define behavior before implementation:

1. **add** stores non-empty note text and prints the assigned ID.
2. **list** prints all notes and their completion state.
3. **done** marks one existing note complete.
4. **remove** deletes one existing note.
5. **--help** prints usage and command descriptions.
6. Missing or invalid arguments produce a concise error and a non-zero exit code.
7. A missing data file starts with an empty collection.
8. Invalid JSON or an unsupported data shape is reported rather than silently overwritten.
9. The selected data file path is resolved predictably.
10. Normal results go to standard output and failures go to standard error.

These criteria make the tool predictable before code is added.

## Understand command-line input

Node.js exposes command-line tokens through the process object. The first entries identify the Node executable and script path; application arguments follow them. Node's parseArgs utility can parse options and positional arguments without a custom parser.

~~~js
import { parseArgs } from "node:util";

const parsed = parseArgs({
  options: {
    file: { type: "string", short: "f" },
    help: { type: "boolean", short: "h" }
  },
  allowPositionals: true,
  strict: true
});

console.log(parsed.values);
console.log(parsed.positionals);
~~~

Use a supported Node.js version for the APIs the project relies on. This project uses the built-in argument parser and ES modules. Its package configuration or file extension should make the module format clear.

Options communicate named settings, such as the data file path. Positionals communicate the command and its operands, such as a note ID or text. Strict parsing catches unknown options instead of silently ignoring misspellings.

The special double hyphen token ends option parsing. A following value is treated as positional text even if it begins with a hyphen. This is useful when user text might look like an option.

## Design a small command interface

Document commands in a help message that includes:

- The invocation pattern.
- Each command and its required operands.
- Shared options.
- The default data file location.
- A short example.

Keep help readable in a narrow terminal. Use a consistent command grammar. For example, put the command first and then its operands:

~~~text
notes add <text>
notes list
notes done <id>
notes remove <id>
~~~

Do not create multiple spellings for the same command unless there is a clear reason. Validate command names and argument counts before reading or changing a file. An invalid command should not accidentally create an empty data file.

## Resolve paths deliberately

The current working directory is available through the process object, and the path module builds platform-aware file paths.

~~~js
import path from "node:path";

const dataFile = path.resolve(
  options.file ?? path.join(process.cwd(), "notes.json")
);
~~~

Using path.resolve produces an absolute path from the current directory or from the selected file option. This avoids ambiguity about where a relative file will be read and written.

Print or document the chosen default. A CLI that silently writes into an unexpected directory is difficult to trust. Do not assume that a path written for one operating system uses the same separators on another.

If the tool accepts a path from an untrusted source, validate its scope before writing. A command-line utility running with the user's permissions can modify files the user can access. Never treat an arbitrary path as harmless.

## Read and validate the data file

Use promise-based file system functions and await each operation.

~~~js
import { readFile } from "node:fs/promises";

async function readStore(filePath) {
  try {
    const text = await readFile(filePath, "utf8");
    return JSON.parse(text);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { version: 1, nextId: 1, notes: [] };
    }

    throw error;
  }
}
~~~

A missing file can mean a new empty store. Other read errors, such as permission failures, should remain errors. Do not treat every failure as though the file is missing.

Parsing JSON only checks syntax. Validate the parsed value before using it. Check the version, the collection type, each note's fields, and ID uniqueness. If the file is malformed or uses an unsupported shape, explain that it must be repaired or restored. Do not replace corrupted data with an empty store automatically, because that can destroy notes.

A simple store could have this structure:

~~~json
{
  "version": 1,
  "nextId": 3,
  "notes": [
    {
      "id": 1,
      "text": "Read the deployment guide",
      "completed": false,
      "createdAt": "2026-11-20T12:00:00.000Z"
    }
  ]
}
~~~

The version field makes future format changes explicit. If a later version changes the schema, the utility can migrate the old format or give a clear unsupported-version error.

## Validate command input

Validate the command and its operands before changing the store.

For a note ID, require a positive integer and confirm that the ID exists. For note text, trim leading and trailing whitespace, reject an empty result, and choose a reasonable maximum length. Preserve meaningful spaces inside the note.

Validation should give a specific message. A useful error might say that the ID must be a positive whole number, while a vague error such as **Invalid input** does not tell the user how to recover.

Do not coerce arbitrary input without checking it. Converting the word abc to a number produces a value that is not a valid note ID. Treat parsing and validation as separate steps.

## Write changes only after validation

For an add command, validate the text, load and validate the store, create a record, then save the updated store.

~~~js
const note = {
  id: store.nextId,
  text,
  completed: false,
  createdAt: new Date().toISOString()
};

store.notes.push(note);
store.nextId += 1;

await writeFile(filePath, JSON.stringify(store, null, 2) + "\n", "utf8");
~~~

Await a write before starting another write to the same file. Overlapping writes can race or replace one another. A simple local CLI should perform one mutation at a time.

For more important data, consider writing a temporary file and replacing the original only after the new content is complete, while accounting for platform behavior and recovery. A basic write is not a transaction and can be interrupted. The project should state its durability limits.

If the user runs two copies at the same time, both could read the same next ID and overwrite each other's updates. A small educational file store is not a database. Avoid claiming that it provides safe concurrent writes or multi-user synchronization.

## Keep output and errors distinct

Write normal results to standard output. Write errors and usage failures to standard error.

~~~js
console.log("Added note " + note.id + ".");
console.error("Error: the note ID was not found.");
~~~

This separation lets shell users redirect a result without hiding error messages. Keep output stable and concise so it can be read by a person or used by another command.

Use meaningful exit codes:

- **0** means the command succeeded.
- A non-zero code means the command failed.
- Different non-zero codes can distinguish usage errors from operational failures if the tool documents them.

Set the process exitCode after handling an error. Avoid forcing immediate process termination when it could cut off pending output or asynchronous writes.

## Structure asynchronous commands

An async main function gives the command a clear error boundary:

~~~js
async function main() {
  // Parse arguments, validate them, and run the requested command.
}

main().catch((error) => {
  console.error("Error: " + error.message);
  process.exitCode = 1;
});
~~~

Do not catch an error and then continue as if the requested operation succeeded. Handle expected conditions such as a missing data file explicitly. Let unexpected failures reach the top-level handler so the command exits unsuccessfully.

A command should validate its syntax before performing side effects. For example, done without an ID should print usage and exit without creating the data file.

## Keep responsibilities separate

A maintainable CLI can organize code into these jobs:

- **parseArguments** reads options and positionals.
- **validateCommand** checks command names and operands.
- **resolveStorePath** selects and resolves the file path.
- **readStore** loads JSON and validates the shape.
- **runCommand** applies one requested operation.
- **writeStore** persists a mutation.
- **printHelp** and **reportError** format terminal output.
- **main** connects the steps and sets the exit code.

A short project may keep these functions in one module. Split files when each module has a clear purpose and separation makes the project easier to change.

Avoid mixing console output into storage functions. A read function should return data or throw an error. The command layer can decide what message belongs in the terminal.

## Handle file and data errors carefully

Common operational failures include:

- The data file cannot be read because of permissions.
- The file contains malformed JSON.
- The store version is newer than the utility supports.
- The data has duplicate IDs or invalid fields.
- The destination directory does not exist.
- A write fails because the disk is full or access is denied.

Report the operation and path when useful, but avoid printing private note contents. Do not erase the file to make an error disappear. Preserve the original data until the user chooses a repair or recovery action.

The tool should distinguish a not-found note from a not-found data file. The first is a valid application error; the second can mean the store is being initialized.

## Security and privacy

A local notes utility still handles private data. File permissions depend on the operating system and directory. Avoid placing sensitive data in terminal logs, shell history, or command-line arguments when other processes or shell tools could inspect them.

The command line is not a safe place for passwords. If a future version needs authentication, use an appropriate protected credential mechanism instead of accepting a secret as a visible positional argument.

Treat the JSON file as input that may be edited or corrupted. Validate it before use. Do not execute its contents or interpret note text as code.

## Review the finished utility

Use the initial acceptance criteria to review the behavior:

- Help describes every command and option.
- A valid add stores text and reports an ID.
- List displays an empty message or all saved notes.
- Done and remove reject malformed and unknown IDs.
- Missing data starts an empty store.
- Invalid JSON is reported and is not silently overwritten.
- A write error exits unsuccessfully.
- Results go to standard output and errors go to standard error.
- The process exits with a meaningful status.
- The default and custom file locations are clear.
- Concurrent edits and durability limits are documented.

The next chapter builds a capstone application. The same habits apply: define the interface, validate input and stored data, handle failure explicitly, and document limits.

## Common mistakes

- Treating every command-line token as a positional argument.
- Ignoring unknown or misspelled options.
- Writing to a surprising default location.
- Assuming parsed JSON has the expected data shape.
- Treating every file error as a missing file.
- Replacing corrupted user data with an empty store without warning.
- Writing without awaiting the operation.
- Starting overlapping writes to one file.
- Printing errors to standard output.
- Calling process exit before pending output is flushed.
- Accepting an invalid ID because it was coerced to a number.
- Claiming a JSON file is safe for simultaneous writers.
- Putting secrets into command-line arguments or shell history.

## Key points

- Treat command syntax and terminal output as the user interface.
- Parse options and positionals deliberately.
- Resolve and document file paths predictably.
- Parse JSON and validate its structure as separate steps.
- Await file operations and preserve data on errors.
- Keep standard output separate from standard error.
- Use exit codes to report command success or failure.
- Keep parsing, storage, commands, and reporting responsibilities clear.
- Document limits such as concurrent writes and durability.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [142 - Browser project: build an API-driven application](142-browser-project-build-an-api-driven-application.md) | [Open Q&A](../qnas/143-node-js-project-build-a-command-line-utility.md) | [Open example](../examples/143-node-js-project-build-a-command-line-utility.md) | [144 - Capstone project: plan, build, test, and document an application](144-capstone-project-plan-build-test-and-document-an-application.md) |
