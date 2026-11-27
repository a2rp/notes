# Example 143 - Node.js project: build a command-line utility

## Question

How can a Node.js command-line program add, list, complete, and remove notes while validating its arguments and preserving its JSON data file when an error occurs?

## Complete example

Save this as notes.mjs and run it with Node.js 20 or newer. It uses Node.js built-in modules only. By default, it reads and writes notes.json in the current working directory. Use the --file option to select another data file.

~~~js
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const HELP = [
  "Notes CLI",
  "",
  "Usage:",
  "  node notes.mjs [--file <path>] <command> [arguments]",
  "",
  "Commands:",
  "  add <text>     Add a note",
  "  list           List all notes",
  "  done <id>      Mark a note complete",
  "  remove <id>    Remove a note",
  "  help           Show this help message",
  "",
  "Options:",
  "  -f, --file <path>  Select the JSON data file",
  "  -h, --help         Show this help message",
  "",
  "Examples:",
  '  node notes.mjs add "Read the deployment guide"',
  "  node notes.mjs list",
  "  node notes.mjs done 1",
  '  node notes.mjs --file ./data/notes.json add "Review the form"',
  "",
  "The default data file is notes.json in the current working directory.",
  "Use -- before note text that begins with an option-like value."
].join("\n");

function makeError(message, exitCode = 1) {
  const error = new Error(message);
  error.exitCode = exitCode;
  return error;
}

function parseCommandLine() {
  try {
    return parseArgs({
      options: {
        file: { type: "string", short: "f" },
        help: { type: "boolean", short: "h" }
      },
      allowPositionals: true,
      strict: true
    });
  } catch (error) {
    throw makeError(error.message, 2);
  }
}

function createEmptyStore() {
  return {
    version: 1,
    nextId: 1,
    notes: []
  };
}

function validateStore(value, filePath) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    value.version !== 1 ||
    !Number.isSafeInteger(value.nextId) ||
    value.nextId < 1 ||
    !Array.isArray(value.notes)
  ) {
    throw makeError(
      "The data file has an unsupported or invalid structure: " + filePath
    );
  }

  const seenIds = new Set();
  let highestId = 0;

  for (const note of value.notes) {
    if (
      !note ||
      typeof note !== "object" ||
      !Number.isSafeInteger(note.id) ||
      note.id < 1 ||
      typeof note.text !== "string" ||
      note.text.trim() === "" ||
      typeof note.completed !== "boolean" ||
      typeof note.createdAt !== "string" ||
      !Number.isFinite(Date.parse(note.createdAt)) ||
      seenIds.has(note.id)
    ) {
      throw makeError(
        "The data file contains an invalid note record: " + filePath
      );
    }

    seenIds.add(note.id);
    highestId = Math.max(highestId, note.id);
  }

  if (value.nextId <= highestId) {
    throw makeError(
      "The nextId value is not greater than all existing note IDs: " + filePath
    );
  }

  return value;
}

async function readStore(filePath) {
  let text;

  try {
    text = await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return createEmptyStore();
    }

    throw makeError(
      "Cannot read the data file " + filePath + ": " + error.message
    );
  }

  let value;

  try {
    value = JSON.parse(text);
  } catch {
    throw makeError(
      "The data file is not valid JSON. Restore or repair it before continuing: " +
        filePath
    );
  }

  return validateStore(value, filePath);
}

async function writeStore(filePath, store) {
  const serialized = JSON.stringify(store, null, 2) + "\n";

  try {
    await writeFile(filePath, serialized, "utf8");
  } catch (error) {
    throw makeError(
      "Cannot write the data file " + filePath + ": " + error.message
    );
  }
}

function parseNoteId(rawValue) {
  const id = Number(rawValue);

  if (!Number.isSafeInteger(id) || id < 1) {
    throw makeError("The note ID must be a positive whole number.", 2);
  }

  return id;
}

function printHelp() {
  console.log(HELP);
}

function requireArgumentCount(positionals, expected, command) {
  if (positionals.length !== expected) {
    throw makeError(
      "The " + command + " command received the wrong number of arguments. " +
        "Run node notes.mjs --help for usage.",
      2
    );
  }
}

async function runCommand(command, positionals, filePath) {
  if (command === "add") {
    if (positionals.length < 2) {
      throw makeError(
        "Provide note text. Run node notes.mjs --help for usage.",
        2
      );
    }

    const text = positionals.slice(1).join(" ").trim();

    if (text === "") {
      throw makeError("Note text cannot be empty.", 2);
    }

    if (text.length > 500) {
      throw makeError("Note text must be 500 characters or fewer.", 2);
    }

    const store = await readStore(filePath);
    const note = {
      id: store.nextId,
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    store.notes.push(note);
    store.nextId += 1;
    await writeStore(filePath, store);
    console.log("Added note " + note.id + ".");
    return;
  }

  if (command === "list") {
    requireArgumentCount(positionals, 1, command);
    const store = await readStore(filePath);

    if (store.notes.length === 0) {
      console.log("No notes yet. Add one with the add command.");
      return;
    }

    for (const note of store.notes) {
      const marker = note.completed ? "[x]" : "[ ]";
      console.log(marker + " " + note.id + " " + note.text);
    }

    return;
  }

  if (command === "done") {
    requireArgumentCount(positionals, 2, command);
    const id = parseNoteId(positionals[1]);
    const store = await readStore(filePath);
    const note = store.notes.find((item) => item.id === id);

    if (!note) {
      throw makeError("No note was found with ID " + id + ".");
    }

    if (note.completed) {
      console.log("Note " + id + " is already complete.");
      return;
    }

    note.completed = true;
    await writeStore(filePath, store);
    console.log("Completed note " + id + ".");
    return;
  }

  if (command === "remove") {
    requireArgumentCount(positionals, 2, command);
    const id = parseNoteId(positionals[1]);
    const store = await readStore(filePath);
    const noteIndex = store.notes.findIndex((item) => item.id === id);

    if (noteIndex === -1) {
      throw makeError("No note was found with ID " + id + ".");
    }

    store.notes.splice(noteIndex, 1);
    await writeStore(filePath, store);
    console.log("Removed note " + id + ".");
    return;
  }

  if (command === "help") {
    requireArgumentCount(positionals, 1, command);
    printHelp();
    return;
  }

  throw makeError(
    "Unknown command: " + command + ". Run node notes.mjs --help for usage.",
    2
  );
}

async function main() {
  const parsed = parseCommandLine();

  if (parsed.values.help) {
    printHelp();
    return;
  }

  const positionals = parsed.positionals;
  const command = positionals[0];

  if (!command) {
    printHelp();
    throw makeError("A command is required.", 2);
  }

  if (command === "help") {
    await runCommand(command, positionals);
    return;
  }

  const defaultFile = path.join(process.cwd(), "notes.json");
  const filePath = path.resolve(parsed.values.file ?? defaultFile);

  await runCommand(command, positionals, filePath);
}

main().catch((error) => {
  console.error("Error: " + error.message);
  process.exitCode = error.exitCode ?? 1;
});
~~~

## Expected output

With a new data file, listing notes prints:

~~~text
No notes yet. Add one with the add command.
~~~

Adding a note prints its ID:

~~~text
Added note 1.
~~~

Listing after adding two notes prints one note per line:

~~~text
[ ] 1 Read the deployment guide
[ ] 2 Review the form
~~~

Marking the first note complete changes its marker:

~~~text
Completed note 1.
~~~

~~~text
[x] 1 Read the deployment guide
[ ] 2 Review the form
~~~

Removing a note reports the removed ID:

~~~text
Removed note 2.
~~~

Running a command with invalid syntax writes an error to standard error and exits with a non-zero status. The data file remains unchanged when argument validation fails.

## Explanation

- **Arguments are parsed once.** The built-in argument parser separates the file and help options from command positionals and rejects unknown options.
- **Commands validate their inputs.** The add command rejects empty or oversized text. The done and remove commands require positive integer IDs and verify that a record exists.
- **Paths are explicit.** The selected path is resolved to an absolute path. If no file option is supplied, notes.json is located in the current working directory.
- **Missing and invalid files differ.** A missing file creates an in-memory empty store. Invalid JSON, unsupported versions, invalid fields, and duplicate IDs are errors. The program does not overwrite corrupted content with an empty collection.
- **Writes are awaited.** Each mutation waits for its write to finish before reporting success.
- **Output streams have separate purposes.** Successful results use standard output. Errors use standard error and set a non-zero process exit code.
- **No external packages are required.** Argument parsing, file access, and path handling use Node.js built-in modules.
- **The storage model is intentionally small.** Two processes writing at once can overwrite each other's updates, and an interrupted write can leave incomplete data. Use a database or a carefully designed locking and recovery strategy if the utility needs concurrent writers or stronger durability.
- **Note text is passed as an argument.** Avoid using this approach for passwords or secrets because command arguments may be visible in shell history or process listings.

## Try it yourself

1. Run the help command and check each command's required arguments.
2. Add two notes, list them, complete one, list again, then remove the other.
3. Run the commands with a custom file path and confirm the default file is separate.
4. Try an unknown command, a missing note ID, zero, a decimal, and text longer than the limit.
5. Put invalid JSON in the selected data file. Confirm the utility reports it without replacing the file.
6. Try a data file with a duplicate ID or an unsupported version.
7. Redirect normal output and error output separately in your shell.
8. Run two instances close together and consider why this file-based version does not guarantee safe concurrent updates.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [142 - Browser project: build an API-driven application](../lessons/142-browser-project-build-an-api-driven-application.md) | [Lesson](../lessons/143-node-js-project-build-a-command-line-utility.md) · [Q&A](../qnas/143-node-js-project-build-a-command-line-utility.md) · [Example](143-node-js-project-build-a-command-line-utility.md) | [144 - Capstone project: plan, build, test, and document an application](../lessons/144-capstone-project-plan-build-test-and-document-an-application.md) |
