# 123 - Command-line arguments, environment variables, and process: Q&A

Use these questions to review CLI parsing, environment configuration, process paths, exit status, and shutdown. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does process.argv[0] normally contain?

- A. The Node.js executable path
- B. The first user-provided argument
- C. The process exit code
- D. The current working directory

**Answer: A.**

**Explanation:** The first entry identifies the Node.js executable. When a script is started, the second entry is the script path, and later entries are passed to the script.

### 2. Which property contains Node.js-specific command-line options?

- A. process.execArgv
- B. process.env
- C. process.cwd
- D. process.exitCode

**Answer: A.**

**Explanation:** process.execArgv contains options passed to the Node.js process. process.argv also includes the executable and script path along with script arguments.

### 3. What does process.argv normally contain after the executable and entry script paths?

- A. The script's command-line arguments
- B. All environment variable values
- C. The process's open file descriptors
- D. Parsed JavaScript objects for each option

**Answer: A.**

**Explanation:** process.argv contains strings. Applications can parse them with node:util parseArgs() or another parser.

### 4. Which built-in API parses declared CLI options into values and positionals?

- A. node:util parseArgs()
- B. node:fs readFile()
- C. node:events EventEmitter
- D. node:path resolve()

**Answer: A.**

**Explanation:** parseArgs() accepts an option definition and returns parsed option values and positional arguments.

### 5. What type does parseArgs() return for an option declared with type "string"?

- A. A string
- B. A number, if it looks numeric
- C. A boolean
- D. A Buffer

**Answer: A.**

**Explanation:** A numeric-looking argument remains a string. Convert and validate it in application code.

### 6. What should an application do before using a string argument as a port number?

- A. Validate and convert it to a number
- B. Pass it to eval()
- C. Assume the parser converted it
- D. Store it in globalThis

**Answer: A.**

**Explanation:** Validate that it is an integer in the allowed range before passing it to a networking API.

### 7. What does allowPositionals: true enable in parseArgs()?

- A. Arguments that are not option flags
- B. Every unknown option without validation
- C. Automatic environment variable loading
- D. Automatic numeric conversion

**Answer: A.**

**Explanation:** Positionals are arguments not consumed as declared options. Strictness and which options are accepted should still be configured deliberately.

### 8. What does the -- token mean to parseArgs()?

- A. Stop parsing later values as options and treat them as positional data
- B. Exit the Node.js process
- C. Start a Worker thread
- D. Read all environment variables

**Answer: A.**

**Explanation:** The option terminator is useful when a positional filename or value begins with a hyphen.

### 9. What type are values read from process.env?

- A. Strings when present
- B. Always numbers
- C. Booleans only
- D. Buffers

**Answer: A.**

**Explanation:** An absent variable is undefined. Present values still need conversion and validation.

### 10. Which is a reasonable configuration precedence policy?

- A. Command-line option, then environment variable, then built-in default
- B. Always choose an arbitrary environment variable
- C. The last variable alphabetically
- D. Never use a default

**Answer: A.**

**Explanation:** This is a common policy because the value supplied for the current invocation is most explicit. A project should document its chosen precedence.

### 11. If a child Node.js process changes process.env, what happens to the parent shell's environment after the child exits?

- A. It is automatically changed to match
- B. It is not changed by the child's process.env assignment
- C. The parent shell closes
- D. All environment variables are deleted

**Answer: B.**

**Explanation:** A child process receives an environment from its parent. Changes made inside the child do not modify the already-running parent shell.

### 12. What does process.cwd() return?

- A. The current working directory of the process
- B. The directory containing every module
- C. The Node.js installation directory
- D. The path of the previous command

**Answer: A.**

**Explanation:** The working directory is associated with how the process was started. It can differ from the directory containing the entry script.

### 13. How should an ES module read a file located next to that module?

- A. Resolve it from import.meta.url
- B. Assume process.cwd() is the module directory
- C. Use __dirname without importing anything
- D. Treat the filename as an environment variable

**Answer: A.**

**Explanation:** A module-relative URL identifies resources beside the ES module. Relative filesystem paths from process.cwd() instead depend on where the caller launched the process.

### 14. What is a conventional successful process exit code?

- A. 0
- B. 1
- C. -1
- D. 255 in every operating system

**Answer: A.**

**Explanation:** Zero conventionally indicates success. Non-zero codes conventionally signal failure.

### 15. Why can process.exitCode be preferable to process.exit()?

- A. It allows normal pending work and output to finish
- B. It always changes the parent shell's variables
- C. It restarts the process
- D. It hides all errors

**Answer: A.**

**Explanation:** Setting process.exitCode records the status while allowing normal event-loop shutdown. Immediate process.exit() may discard pending output or cleanup.

### 16. What should a server usually do after receiving a supported termination signal?

- A. Stop accepting new work and close owned resources
- B. Start an infinite process.nextTick() loop
- C. Force exit before cleanup begins
- D. Delete its package.json

**Answer: A.**

**Explanation:** Graceful shutdown should finish or cancel relevant work and release resources. Signal behavior can vary by platform.

## Short-answer questions

### 17. What is the difference between process.argv and process.execArgv?

**Answer:** process.argv contains the executable, entry script, and script arguments. process.execArgv contains Node.js-specific options passed when the process started.

**Explanation:** The two arrays describe different layers of the command invocation.

### 18. Why does parseArgs() not eliminate input validation?

**Answer:** It parses the declared structure and type of options, but string values still need application-specific conversion and range checks.

**Explanation:** A value such as "999999" can be a valid parsed string while being invalid for a port or repeat count.

### 19. What happens if an environment variable is missing?

**Answer:** Reading it from process.env returns undefined.

**Explanation:** Provide a default or report a clear configuration error according to the application's requirements.

### 20. Why should a program document precedence among defaults, environment variables, and CLI flags?

**Answer:** So users and maintainers can predict which source wins when more than one supplies a value.

**Explanation:** The parser does not automatically combine these sources for the application.

### 21. How is the current working directory different from the script directory?

**Answer:** The working directory is where the process was launched from. The script directory is where the entry file or module resides.

**Explanation:** A relative CLI input path often should be interpreted from the caller's working directory, while a bundled resource may need to be resolved from the module URL.

### 22. Why should secrets not be printed while debugging process.env?

**Answer:** Logs, shell histories, crash reports, and process inspection can expose values to people or systems that should not receive them.

**Explanation:** Environment variables are a configuration transport, not a complete secret-protection system.

### 23. What is the purpose of standard output and standard error?

**Answer:** Standard output carries ordinary results, while standard error carries diagnostics and errors.

**Explanation:** Keeping streams separate lets shells redirect or pipe result data independently from error messages.

### 24. Why should asynchronous cleanup not be started in a process exit event handler?

**Answer:** The exit event is for synchronous final work. The process exits after those listeners finish and will not wait for newly scheduled asynchronous work.

**Explanation:** Begin cleanup earlier, such as in a SIGINT or SIGTERM handler, and let it complete before natural process shutdown.

## Scenarios

### 25. A program reads process.argv[1] as the user's first name. Why is that wrong when launched with node app.mjs Ada?

**Answer:** process.argv[1] is the script path. The first user argument is at process.argv[2].

**Explanation:** The first two entries are the executable and entry script when a script is provided.

### 26. A CLI declares --repeat as a string option and then passes values.repeat directly to a loop count. What can go wrong?

**Answer:** The value is still a string and may be missing, non-numeric, fractional, negative, or too large.

**Explanation:** Convert it and validate that it is a safe integer within an acceptable range.

### 27. An application reads PORT from process.env and starts listening without checking it. Why is that fragile?

**Answer:** PORT can be absent or contain an invalid string, and environment values are not automatically numbers.

**Explanation:** Apply a default if appropriate, convert the string, and check the valid port range before starting the server.

### 28. A tool uses process.cwd() to find a package data file. It works from the project folder but fails when launched elsewhere. What is likely wrong?

**Answer:** The program assumes the caller's working directory is the package's own directory.

**Explanation:** Resolve packaged resources from the module URL or another deliberate application path.

### 29. A CLI accepts a filename named --help as positional input. How can the user avoid it being parsed as an option?

**Answer:** Place the filename after the option terminator, for example: node app.mjs -- --help.

**Explanation:** parseArgs() treats subsequent values as positional arguments after --.

### 30. A program prints a validation error and calls process.exit(1) immediately. What could be improved?

**Answer:** Write the error to standard error, set process.exitCode to a non-zero value, and let normal shutdown complete.

**Explanation:** This avoids discarding buffered output or pending cleanup.

### 31. A server begins asynchronous close work inside process.on("exit"). Why may the server still terminate before it completes?

**Answer:** The exit event does not keep the event loop alive for new asynchronous work.

**Explanation:** Handle shutdown signals earlier and await or callback on resource closure before allowing the process to exit.

### 32. A program prints all of process.env to diagnose configuration in a production log. What is the risk?

**Answer:** The output may expose credentials, tokens, or other sensitive configuration.

**Explanation:** Log only specific non-sensitive values, and avoid including secrets in diagnostic messages.

## Coding questions

### 33. Parse a name option, a repeat count, and a positional argument.

**Answer:**

~~~js
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  options: {
    name: {
      type: "string",
      short: "n"
    },
    repeat: {
      type: "string",
      short: "r",
      default: "1"
    }
  },
  allowPositionals: true
});

console.log(values.name);
console.log(values.repeat);
console.log(positionals);
~~~

**Explanation:** The parser returns declared options separately from positional arguments. String options remain strings.

### 34. Convert and validate a repeat count from parsed CLI input.

**Answer:**

~~~js
function parseRepeat(value) {
  const count = Number(value);

  if (!Number.isSafeInteger(count) || count < 1 || count > 10) {
    throw new RangeError("repeat must be an integer from 1 to 10.");
  }

  return count;
}
~~~

**Explanation:** Conversion is explicit, and invalid values are rejected before the application uses them.

### 35. Read a port environment variable with a default and validation.

**Answer:**

~~~js
function readPort(value) {
  if (value === undefined || value.trim() === "") {
    return 3000;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new RangeError("PORT must be from 1 to 65535.");
  }

  return port;
}

const port = readPort(process.env.PORT);
~~~

**Explanation:** Missing and empty values use the default. Supplied values are converted and range-checked.

### 36. Apply CLI, environment, then default precedence for a name.

**Answer:**

~~~js
const selectedName =
  values.name ??
  process.env.GREETER_NAME ??
  "friend";

const name = selectedName.trim();

if (name.length === 0) {
  throw new Error("A non-empty name is required.");
}
~~~

**Explanation:** The nullish coalescing operator chooses the first value that is not null or undefined. Trimming and validation happen after precedence is applied.

### 37. Report failure without forcing an immediate process exit.

**Answer:**

~~~js
function reportError(message) {
  console.error(message);
  process.exitCode = 1;
}

reportError("Could not read the input file.");
~~~

**Explanation:** The process reports a failure status while retaining the opportunity to finish normal output and cleanup.

### 38. Print the current working directory and the entry script path.

**Answer:**

~~~js
console.log("Working directory:", process.cwd());
console.log("Entry script:", process.argv[1]);
~~~

**Explanation:** These can be different directories. Use the one that matches the intended path-resolution rule.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [122 - Node.js runtime, globals, and execution model](../lessons/122-node-js-runtime-globals-and-execution-model.md) | [Open lesson](../lessons/123-command-line-arguments-environment-variables-and-process.md) | [Open example](../examples/123-command-line-arguments-environment-variables-and-process.md) | [124 - Node.js modules, core APIs, and package resolution](../lessons/124-node-js-modules-core-apis-and-package-resolution.md) |
