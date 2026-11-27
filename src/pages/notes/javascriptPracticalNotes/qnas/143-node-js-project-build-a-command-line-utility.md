# Node.js project: build a command-line utility - Q&A

These questions review [Chapter 143](../lessons/143-node-js-project-build-a-command-line-utility.md). Each answer follows its question and includes an explanation.

## Multiple-choice questions

### 1. What is part of a command-line tool's user interface?

A. Only its colors  
B. Its syntax, output, file behavior, and errors  
C. The browser viewport  
D. The operating system wallpaper  

**Answer:** B. Its syntax, output, file behavior, and errors.

**Explanation:** A CLI communicates through command arguments, terminal messages, exit status, and any files it reads or writes.

### 2. What is a positional argument?

A. A named setting such as --file  
B. An argument interpreted by its position, such as a command or ID  
C. A process exit code  
D. A file permission  

**Answer:** B. An argument interpreted by its position, such as a command or ID.

**Explanation:** A command interface might use the first positional value for the command and the next for a note ID.

### 3. What is an option used for?

A. A named configuration value or switch  
B. A file's contents  
C. The process's current exit status  
D. A JSON collection  

**Answer:** A. A named configuration value or switch.

**Explanation:** An option such as --file selects a data path by name instead of relying on an argument's position.

### 4. Why use strict argument parsing?

A. To silently ignore misspelled options  
B. To report unknown options instead of continuing with a possibly wrong command  
C. To make a file write synchronous  
D. To create a JSON file automatically  

**Answer:** B. To report unknown options instead of continuing with a possibly wrong command.

**Explanation:** A typo should be visible to the user. Silently ignoring it can cause the utility to behave differently than expected.

### 5. What does the double hyphen argument conventionally do during parsing?

A. Ends option parsing so following values are positional  
B. Runs the command twice  
C. Prints help automatically  
D. Changes the working directory  

**Answer:** A. Ends option parsing so following values are positional.

**Explanation:** This lets a user pass text that begins with a hyphen without the parser treating it as another option.

### 6. What does path.resolve help produce?

A. A normalized absolute path  
B. A parsed JSON object  
C. A command exit code  
D. A standard error message  

**Answer:** A. A normalized absolute path.

**Explanation:** Resolving a path relative to a clear base makes it easier to know which file the utility will read or write.

### 7. What should happen when the default data file does not exist yet?

A. Treat every file error as a missing file  
B. Initialize a new empty store for the specific not-found case  
C. Delete the working directory  
D. Report malformed JSON  

**Answer:** B. Initialize a new empty store for the specific not-found case.

**Explanation:** The missing file can represent a first run. Permission errors and other failures should not be misinterpreted as first-run state.

### 8. What does successful JSON parsing prove?

A. The file has all fields required by the application  
B. The file contains syntactically valid JSON  
C. The file has no duplicate IDs  
D. The file is safe for concurrent writes  

**Answer:** B. The file contains syntactically valid JSON.

**Explanation:** The program still needs to validate the parsed data shape, values, version, and identifiers.

### 9. Where should normal command results generally be written?

A. Standard output  
B. Standard error  
C. The process exit code only  
D. The shell history  

**Answer:** A. Standard output.

**Explanation:** Keeping results on standard output lets users redirect or pipe them separately from error messages.

### 10. What should a failed command normally communicate through its exit status?

A. Success with code zero  
B. Failure with a non-zero code  
C. The note's ID  
D. The current file path  

**Answer:** B. Failure with a non-zero code.

**Explanation:** Shell scripts and other tools can check the exit code to determine whether the operation succeeded.

## Short-answer questions

### 11. Why should invalid commands be checked before loading or changing the store?

**Answer:** To avoid unnecessary work and unintended side effects for a command that cannot run.

**Explanation:** For example, an unknown subcommand should not create an empty data file before reporting a usage problem.

### 12. What is the difference between an option and a positional argument?

**Answer:** An option is named, while a positional argument is interpreted by its place in the command.

**Explanation:** A file option can select storage; positionals can specify add, list, done, or remove and their operands.

### 13. Why document the default data file path?

**Answer:** Users need to know where their data will be read from and written to.

**Explanation:** A surprising default location can make it seem as if notes disappeared or were stored somewhere unsafe.

### 14. Why is checking only whether JSON parsing succeeded not enough?

**Answer:** Valid JSON may not match the fields and types the program requires.

**Explanation:** Validate the version, note collection, each note record, and ID uniqueness before using the data.

### 15. Why should corrupted data not be silently replaced with an empty store?

**Answer:** Doing so can destroy existing user data.

**Explanation:** Report the problem and let the user recover or repair the file intentionally.

### 16. What does ENOENT commonly mean when reading a file?

**Answer:** The requested path or file does not exist.

**Explanation:** A CLI can treat this specific case as a first run, while propagating permission and other I/O errors.

### 17. Why await a file write before starting another write to the same file?

**Answer:** Overlapping writes may race or overwrite each other's contents.

**Explanation:** A small local utility should serialize writes and avoid acting as though one JSON file is a concurrent database.

### 18. What is a useful reason to include a version field in stored JSON?

**Answer:** It identifies the schema version so future code can migrate or reject older and newer formats deliberately.

**Explanation:** Without a version, structural changes can be hard to distinguish from corruption.

### 19. Why keep storage functions separate from console reporting?

**Answer:** Storage code can focus on reading and writing data, while the command layer decides what to show users.

**Explanation:** This separation makes the functions easier to reuse and keeps terminal output consistent.

### 20. Why avoid placing passwords in command-line arguments?

**Answer:** Arguments can be visible to process inspection, shell history, and other tools.

**Explanation:** Secrets should use a protected credential mechanism and should not be printed or logged.

## Read the code

### 21. What two parsed values can this code inspect?

~~~js
const parsed = parseArgs({
  allowPositionals: true,
  options: {
    help: { type: "boolean" }
  }
});
~~~

**Answer:** Named option values and positional arguments.

**Explanation:** The parsed result separates switches and options from values such as a command name and its operands.

### 22. What does this condition do?

~~~js
if (error.code === "ENOENT") {
  return { version: 1, nextId: 1, notes: [] };
}
~~~

**Answer:** It returns a new empty store only for the file-not-found error.

**Explanation:** Other read failures are not silently converted into an empty collection.

### 23. Why does this operation need to be awaited?

~~~js
await writeFile(filePath, serializedStore, "utf8");
~~~

**Answer:** To know when the asynchronous write has completed or failed before continuing.

**Explanation:** Without awaiting, the program could report success or start another write before persistence finishes.

### 24. What does this expression produce?

~~~js
path.resolve(options.file ?? path.join(process.cwd(), "notes.json"));
~~~

**Answer:** An absolute path from the custom file option, or the default notes file in the current working directory.

**Explanation:** The nullish fallback uses the default only when no file value was supplied.

### 25. What is the problem with this conversion by itself?

~~~js
const id = Number(rawId);
~~~

**Answer:** Invalid input can become NaN, and other numeric forms may be accepted unintentionally.

**Explanation:** Parse and validate separately, checking that the value is a positive integer and that the ID exists.

### 26. Where does this error message go?

~~~js
console.error("The note was not found.");
~~~

**Answer:** Standard error.

**Explanation:** console.error keeps failures separate from normal results printed with console.log.

### 27. What does setting this property do?

~~~js
process.exitCode = 1;
~~~

**Answer:** It marks the process as unsuccessful when it exits naturally.

**Explanation:** It avoids forcing immediate termination while pending output or asynchronous work may still need to finish.

### 28. What does JSON.parse return when it successfully parses a JSON object?

**Answer:** A JavaScript value representing that object and its nested values.

**Explanation:** The result still needs validation before the program assumes its properties and types are correct.

### 29. Why is this command-layer code better than printing inside readStore?

~~~js
const store = await readStore(filePath);
console.log(store.notes.length + " notes");
~~~

**Answer:** The storage function can return data without taking responsibility for how the terminal presents it.

**Explanation:** Keeping I/O and presentation separate makes storage reusable by multiple commands.

### 30. What should the top-level catch do?

~~~js
main().catch((error) => {
  console.error("Error: " + error.message);
  process.exitCode = 1;
});
~~~

**Answer:** Report the failure to standard error and set a non-zero exit status.

**Explanation:** This gives asynchronous command failures a consistent process-level outcome.

## Applied questions

### 31. A user runs done without an ID. What should the utility do?

**Answer:** Print concise usage or an operand error, exit unsuccessfully, and avoid changing the store.

**Explanation:** Validate the command syntax before reading or writing data.

### 32. The store file contains valid JSON but notes is a string. What should happen?

**Answer:** Report that the store shape is invalid and preserve the original file.

**Explanation:** Syntactic JSON validity does not satisfy the utility's data contract.

### 33. The data file cannot be read because of access permissions. Should the CLI start with an empty store?

**Answer:** No. It should report the read failure and exit unsuccessfully.

**Explanation:** Only the explicit not-found condition should initialize a new empty store. Treating access denial as an empty file could overwrite data later.

### 34. A note text begins with two hyphens and looks like an option. How can a user pass it as text?

**Answer:** Use the option terminator before the text if required by the parser, or quote and document the command syntax clearly.

**Explanation:** After the terminator, following tokens are positional values rather than options.

### 35. The custom file option contains a relative path. Relative to what should it be resolved?

**Answer:** Resolve it against a documented base, commonly the process's current working directory.

**Explanation:** Predictable resolution makes the selected file location clear across invocations.

### 36. A write fails because the target directory does not exist. What should the command report?

**Answer:** A concise write failure, with the selected path when useful, and a non-zero exit status.

**Explanation:** The tool should not report success when persistence failed or create unrelated directories without documenting that behavior.

### 37. Two utility processes add notes at the same time and both read the same next ID. What can go wrong?

**Answer:** They may assign the same ID and overwrite one another's updates.

**Explanation:** A single JSON file with simple read-modify-write logic is not safe concurrent storage. Use locking or a database if concurrent writers are required.

### 38. Why should an error not be printed to standard output?

**Answer:** It can corrupt output that a user intended to pipe or save as command results.

**Explanation:** Standard error is the conventional stream for diagnostics, separate from normal output.

### 39. A caught error is followed by a success message. What is wrong with this flow?

**Answer:** The command misleads the user and may exit with a success status despite a failure.

**Explanation:** After an unrecoverable operation fails, report the failure and set a non-zero exit code.

### 40. What should be reviewed before calling the notes utility complete?

**Answer:** Help and syntax, valid and invalid input, missing and malformed files, persistence errors, output streams, exit codes, and documented path and concurrency limits.

**Explanation:** A CLI's successful add path is only one part of its interface. Users also rely on predictable failures and safe data handling.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [142 - Browser project: build an API-driven application](../lessons/142-browser-project-build-an-api-driven-application.md) | [Lesson](../lessons/143-node-js-project-build-a-command-line-utility.md) · [Example](../examples/143-node-js-project-build-a-command-line-utility.md) | [144 - Capstone project: plan, build, test, and document an application](144-capstone-project-plan-build-test-and-document-an-application.md) |
