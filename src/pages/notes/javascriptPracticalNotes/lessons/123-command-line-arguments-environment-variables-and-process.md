# 123 - Command-line arguments, environment variables, and process

A command-line program receives text from its shell, reads configuration from its environment, and runs inside a Node.js process. These inputs have different sources and rules. A reliable CLI parses them deliberately, validates their values, avoids exposing secrets, and exits with a meaningful status.

## Learning goals

After this lesson, you should be able to:

- distinguish Node.js options from arguments passed to a script;
- inspect process.argv and process.execArgv;
- parse flags and positional arguments with node:util parseArgs();
- validate command-line values instead of trusting their types;
- read environment variables and apply a clear configuration precedence;
- distinguish the current working directory from the script's directory;
- report success or failure with process.exitCode;
- handle shutdown signals without discarding pending work.

## Starting a Node.js command

A command has a Node.js executable, optional Node.js options, an entry file, and arguments for that file:

~~~sh
node --trace-warnings app.mjs --name Ada --repeat 2
~~~

In this example:

- <code>node</code> starts the runtime;
- <code>--trace-warnings</code> is a Node.js runtime option;
- <code>app.mjs</code> is the entry file;
- <code>--name Ada --repeat 2</code> is application input.

On Windows, PowerShell and Command Prompt have their own quoting and environment-variable syntax. The shell builds the argument list before Node.js receives it. Quote values with spaces for the shell you are using.

## Read the raw argument list

Node.js exposes the startup arguments through <code>process.argv</code>. The first entry is the Node.js executable path, the second is the script path when a script was supplied, and later entries are arguments for the script.

~~~js
console.log(process.argv);
~~~

If run as:

~~~sh
node app.mjs Ada --repeat 2
~~~

the shape is similar to:

~~~text
[
  "/path/to/node",
  "/path/to/app.mjs",
  "Ada",
  "--repeat",
  "2"
]
~~~

Paths vary by operating system and installation. <code>process.execArgv</code> contains Node.js-specific options passed to the process, while <code>process.argv</code> includes the executable and script entries as well as script arguments.

Raw parsing is useful for simple scripts, but it becomes easy to mishandle flags, missing values, repeated options, and positional arguments. For a normal CLI, use an argument parser.

## Parse options with node:util parseArgs()

Node.js includes <code>parseArgs()</code> in <code>node:util</code>. It describes the options your program accepts and returns values and positional arguments.

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
    },
    shout: {
      type: "boolean",
      short: "s"
    }
  },
  allowPositionals: true
});

console.log(values);
console.log(positionals);
~~~

A call such as:

~~~sh
node app.mjs --name "Ada Lovelace" --repeat 2 --shout guest
~~~

produces a string value for <code>name</code>, a string value for <code>repeat</code>, a boolean for <code>shout</code>, and a positional value for <code>guest</code>. Argument values are not automatically converted to numbers just because they look numeric.

A short alias can be used where one is declared:

~~~sh
node app.mjs -n Ada -r 2 -s
~~~

Boolean options normally need no following value. A string option expects a value. Parser settings such as <code>multiple</code>, <code>default</code>, <code>strict</code>, and <code>allowPositionals</code> help define what the CLI accepts. Check the Node.js version your project supports before choosing an API.

### The option terminator

The token <code>--</code> marks the end of options for <code>parseArgs()</code>. Values after it are positional arguments, even if they begin with a hyphen:

~~~sh
node app.mjs --name Ada -- --literal-filename
~~~

Here, <code>--literal-filename</code> is positional data, not another option. This is useful when a CLI accepts filenames or values that may begin with a hyphen.

## Validate parsed values

Parsing establishes which option received a value. It does not prove that the value is valid for your program.

~~~js
function parseRepeatCount(value) {
  const count = Number(value);

  if (!Number.isSafeInteger(count) || count < 1 || count > 10) {
    throw new RangeError("repeat must be a whole number from 1 to 10.");
  }

  return count;
}
~~~

Validate according to the program's needs:

- convert numeric strings explicitly;
- check integer, finite, and range requirements;
- reject unknown options unless there is a reason to accept them;
- distinguish a missing value from an empty string;
- provide a helpful message that explains valid input;
- avoid evaluating argument strings as JavaScript.

When invalid input should stop the command, print an error and set a non-zero process exit code.

## Read environment variables

Environment variables provide configuration outside the command's argument list. Node.js exposes them through <code>process.env</code>:

~~~js
const mode = process.env.APP_MODE;
const portText = process.env.PORT;

console.log({ mode, portText });
~~~

Environment variable values are strings when present. A missing variable evaluates to <code>undefined</code>. Convert and validate values before using them.

~~~js
function readPort(value) {
  if (value === undefined || value.trim() === "") {
    return 3000;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new RangeError("PORT must be an integer from 1 to 65535.");
  }

  return port;
}

const port = readPort(process.env.PORT);
~~~

Changing <code>process.env</code> changes the environment visible to the current process and, depending on how a child process is started, values passed to that child. It does not change the environment of the parent shell after Node.js exits.

Environment variable names and shell syntax vary by platform. For example, to set a temporary value for a command:

~~~sh
APP_MODE=development node app.mjs
~~~

In PowerShell:

~~~powershell
$env:APP_MODE = "development"
node app.mjs
~~~

In Command Prompt:

~~~bat
set APP_MODE=development && node app.mjs
~~~

The PowerShell assignment lasts for that shell session unless you remove it or close the session. Avoid typing real secrets into commands that may be saved in shell history.

## Choose a configuration precedence

An application should document how it combines defaults, environment variables, and command-line options. One common policy is:

1. built-in default;
2. environment variable;
3. explicit command-line option.

The command-line option wins because it is the most direct input for this invocation.

~~~js
const name =
  values.name ??
  process.env.GREETER_NAME ??
  "friend";
~~~

This expression encodes one precedence policy: CLI option, then environment, then default. It does not trim or validate the chosen value. Perform those steps separately and decide how an empty string should behave.

Do not assume <code>parseArgs()</code> automatically reads environment variables or applies your application's precedence rules. The application must combine its configuration sources.

## Process paths and the working directory

<code>process.cwd()</code> reports the current working directory from which the process was started. It is not necessarily the directory containing the script.

~~~js
console.log("Current working directory:", process.cwd());
console.log("Entry script:", process.argv[1]);
~~~

A relative path such as <code>./input.txt</code> is normally resolved from the current working directory by APIs that accept filesystem paths. If a file should be located relative to an ES module, use its module URL:

~~~js
import { readFile } from "node:fs/promises";

const input = await readFile(
  new URL("./input.txt", import.meta.url),
  "utf8"
);
~~~

Choose deliberately whether a CLI path is relative to the caller's working directory or to the installed program's own files.

## Exit status and process output

A process exit status communicates whether a command succeeded. By convention, zero means success and a non-zero value means failure.

~~~js
const inputIsValid = false;

if (!inputIsValid) {
  console.error("Invalid input.");
  process.exitCode = 1;
}
~~~

Prefer setting <code>process.exitCode</code> and allowing the process to finish naturally. Calling <code>process.exit()</code> can stop the process before pending output or asynchronous cleanup completes.

Use the output streams intentionally:

- <code>console.log()</code> writes ordinary output, usually to standard output;
- <code>console.error()</code> writes diagnostics, usually to standard error.

Keeping results separate from errors lets a shell redirect or pipe them independently.

~~~sh
node app.mjs >result.txt 2>errors.txt
~~~

The exact redirection syntax depends on the shell, but standard output and standard error are separate process streams.

## Handle termination signals

A terminal interrupt commonly sends a signal such as <code>SIGINT</code>. A process manager or operating system may use <code>SIGTERM</code> to request shutdown. A long-running service can handle a supported signal to stop accepting new work and close resources.

~~~js
let shuttingDown = false;

function beginShutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log("Received", signal, "- starting cleanup.");

  server.close((error) => {
    if (error) {
      console.error("Server shutdown failed:", error.message);
      process.exitCode = 1;
      return;
    }

    console.log("Server closed.");
  });
}

process.on("SIGINT", () => beginShutdown("SIGINT"));
process.on("SIGTERM", () => beginShutdown("SIGTERM"));
~~~

This example assumes a server object with a <code>close()</code> method. A command-line script should clean up only resources it actually owns. Signal support and default behavior can differ across operating systems, so test the shutdown behavior on the platforms you support.

Do not put asynchronous cleanup in the <code>exit</code> event handler. That event is for synchronous final work and does not keep the event loop open for new asynchronous operations.

## Keep secrets and configuration safe

Environment variables are a convenient way to provide configuration, but they are not a complete secret-management system. Their values may be visible to the running process, debugging tools, crash reports, or other processes with sufficient access.

- Do not commit credentials into source code or example files.
- Do not print secrets in logs or error messages.
- Do not assume a secret is safe just because it came from an environment variable.
- For local configuration files, exclude files containing secrets from version control.
- Validate configuration as the process starts and fail with a clear message if required values are missing.

## Common mistakes

- Reading <code>process.argv[0]</code> as the first user argument.
- Confusing Node.js runtime options with arguments for the application.
- Assuming numeric-looking arguments are already numbers.
- Reading <code>process.env.PORT</code> without validating its string value.
- Assuming an environment variable set by a child process changes the parent shell.
- Assuming <code>process.cwd()</code> is the script's directory.
- Making CLI values executable by evaluating them as JavaScript.
- Depending on an undocumented precedence between CLI flags and environment values.
- Printing secrets while debugging configuration.
- Calling <code>process.exit()</code> before output or cleanup completes.
- Registering signal handlers without closing resources.
- Starting asynchronous work from an <code>exit</code> handler.

## Key points

- <code>process.argv</code> contains the executable, entry script, and script arguments.
- <code>process.execArgv</code> describes Node.js options passed to the process.
- <code>node:util</code> <code>parseArgs()</code> can parse typed options and positional arguments.
- Parsed strings still need validation and conversion before use.
- Environment variables are strings and can be absent.
- Define how defaults, environment values, and command-line flags combine.
- <code>process.cwd()</code> is the caller's working directory, not automatically the script directory.
- Use <code>process.exitCode</code> to report failure while allowing normal shutdown.
- Handle signals to close resources, and keep secrets out of logs and source control.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [122 - Node.js runtime, globals, and execution model](122-node-js-runtime-globals-and-execution-model.md) | [Open Q&A](../qnas/123-command-line-arguments-environment-variables-and-process.md) | [Open example](../examples/123-command-line-arguments-environment-variables-and-process.md) | [124 - Node.js modules, core APIs, and package resolution](124-node-js-modules-core-apis-and-package-resolution.md) |
