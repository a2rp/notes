# 123 - Command-line arguments, environment variables, and process

This example is a small command-line greeting program. It parses options and positional input, reads an optional environment variable, validates values, reports its paths, and returns a failure status for invalid input.

It uses Node.js built-in modules only. The example expects Node.js 20 or newer for a stable <code>node:util</code> <code>parseArgs()</code> API.

## Create these files

Create a folder named <code>cli-greeter</code> and add these files.

### <code>cli-greeter/package.json</code>

~~~json
{
  "name": "cli-greeter",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node app.mjs"
  }
}
~~~

### <code>cli-greeter/app.mjs</code>

~~~js
import { parseArgs } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDirectory = path.dirname(scriptPath);

function printHelp() {
  console.log("CLI Greeter");
  console.log("");
  console.log("Usage:");
  console.log("  node app.mjs [options] [name]");
  console.log("");
  console.log("Options:");
  console.log("  -n, --name <name>    Name to greet");
  console.log("  -r, --repeat <count> Number of greetings from 1 to 5");
  console.log("  -s, --shout          Print the greeting in uppercase");
  console.log("  -h, --help           Show this help");
  console.log("");
  console.log("Environment:");
  console.log("  GREETER_NAME         Fallback name when no name is passed");
}

function parseRepeatCount(value) {
  const count = Number(value);

  if (!Number.isSafeInteger(count) || count < 1 || count > 5) {
    throw new RangeError("repeat must be a whole number from 1 to 5.");
  }

  return count;
}

function parseCommandLine(args) {
  return parseArgs({
    args,
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
        short: "s",
        default: false
      },
      help: {
        type: "boolean",
        short: "h",
        default: false
      }
    },
    allowPositionals: true
  });
}

function chooseName(values, positionals) {
  if (positionals.length > 1) {
    throw new Error("Provide only one positional name.");
  }

  const environmentName = process.env.GREETER_NAME?.trim();
  const sources = [
    { value: values.name, label: "command-line option" },
    { value: environmentName || undefined, label: "GREETER_NAME" },
    { value: positionals[0], label: "positional argument" },
    { value: "friend", label: "built-in default" }
  ];

  const selected = sources.find((source) => source.value !== undefined);
  const name = selected.value.trim();

  if (name.length === 0) {
    throw new Error("Name must not be empty.");
  }

  return {
    name,
    source: selected.label
  };
}

async function main() {
  try {
    const { values, positionals } =
      parseCommandLine(process.argv.slice(2));

    if (values.help) {
      printHelp();
      return;
    }

    const { name, source } = chooseName(values, positionals);
    const repeat = parseRepeatCount(values.repeat);
    const greeting = "Hello, " + name + "!";
    const output = values.shout ? greeting.toUpperCase() : greeting;

    console.log("Node version:", process.versions.node);
    console.log("Working directory:", process.cwd());
    console.log("Script directory:", scriptDirectory);
    console.log("Name source:", source);
    console.log("");

    for (let index = 0; index < repeat; index += 1) {
      console.log(output);
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Run the program with --help to see valid options.");
    process.exitCode = 1;
  }
}

await main();
~~~

The program applies this name precedence:

1. <code>--name</code> or <code>-n</code>;
2. <code>GREETER_NAME</code>;
3. one positional name;
4. the built-in value <code>friend</code>.

An empty command-line name is rejected rather than silently replaced by another source.

## Run the example

Open a terminal in the folder that contains <code>cli-greeter</code> and run:

~~~sh
node cli-greeter/app.mjs --name "Ada Lovelace" --repeat 2 --shout
~~~

You can also use the package script from inside the project folder:

~~~sh
npm start -- --name Ada --repeat 2
~~~

The extra <code>--</code> tells npm that the following arguments should be passed to the application command.

To use an environment value from Bash or another POSIX-style shell:

~~~sh
GREETER_NAME=Ada node cli-greeter/app.mjs --repeat 2
~~~

In PowerShell:

~~~powershell
$env:GREETER_NAME = "Ada"
node cli-greeter/app.mjs --repeat 2
Remove-Item Env:GREETER_NAME
~~~

In Command Prompt:

~~~bat
set GREETER_NAME=Ada && node cli-greeter/app.mjs --repeat 2
~~~

Shell syntax differs. The PowerShell environment assignment remains set in that terminal session until it is removed or the session is closed.

## Try different inputs

Use a positional name:

~~~sh
node cli-greeter/app.mjs Ada
~~~

Use a short option:

~~~sh
node cli-greeter/app.mjs -n Ada -r 3
~~~

Show the help text:

~~~sh
node cli-greeter/app.mjs --help
~~~

Send a value that begins with a hyphen as positional data:

~~~sh
node cli-greeter/app.mjs -- --guest
~~~

This last command is accepted as a positional name by the parser, although the program will greet the text including its leading hyphens.

Test invalid input:

~~~sh
node cli-greeter/app.mjs --repeat 20
~~~

The program prints an error to standard error and sets a non-zero exit status. In a shell, inspect the status immediately after running the command. PowerShell exposes it in <code>$LASTEXITCODE</code>; POSIX shells expose it in <code>$?</code>.

## Expected result

The first command prints the Node.js version, the caller's working directory, the app's script directory, the selected name source, and two uppercase greetings.

The working directory may differ from the script directory depending on where the command is launched. Exact paths and Node version vary by machine.

With no name option, environment variable, or positional name, the program uses <code>friend</code>. Invalid repeat counts and empty names produce an error and a non-zero exit status.

## Why the example is structured this way

- parseArgs() parses declared string and boolean options and separates positional arguments.
- Numeric input is converted and range-checked before use.
- CLI, environment, positional, and default values have a visible precedence.
- process.env is treated as optional string configuration.
- process.cwd() and the module's own directory are printed separately.
- Errors go to standard error, and process.exitCode allows normal shutdown.
- The program does not print environment variables or store credentials.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [122 - Node.js runtime, globals, and execution model](../lessons/122-node-js-runtime-globals-and-execution-model.md) | [Open Q&A](../qnas/123-command-line-arguments-environment-variables-and-process.md) | [Open lesson](../lessons/123-command-line-arguments-environment-variables-and-process.md) | [124 - Node.js modules, core APIs, and package resolution](../lessons/124-node-js-modules-core-apis-and-package-resolution.md) |
