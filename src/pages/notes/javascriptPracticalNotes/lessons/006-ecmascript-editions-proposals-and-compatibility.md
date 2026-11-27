# 06 - ECMAScript editions, proposals, and compatibility

JavaScript changes over time. The ECMAScript specification defines the language, TC39 develops changes to it, and browser and server runtimes implement those changes at their own pace. Understanding these pieces helps you tell the difference between a finished language feature, a proposal, and a feature supported by the environment where your code runs.

## JavaScript and ECMAScript

**JavaScript** is the name most developers use for the language. **ECMAScript** is the standard specification that defines core language behavior, including syntax, values, functions, objects, and built-in APIs.

Browsers also provide web platform APIs such as the DOM and Fetch. Those APIs are not all defined by the ECMAScript language specification. This distinction matters when checking support:

- A JavaScript language feature may be defined by ECMAScript.
- A browser feature may be provided by a web platform API.
- A server runtime can implement ECMAScript while providing a different set of host APIs.

The specification describes expected behavior. A runtime implements that behavior, and implementation support can differ by version.

## ECMAScript editions and names

The language specification has been published in editions. **ECMAScript 2015**, commonly called **ES2015**, was also widely called **ES6** because it was the sixth edition. Starting with the editions after ES2015, year-based names such as **ES2016** and **ES2017** became the common way to identify releases.

You may see several styles of names:

- **ECMAScript** or **ECMA-262** for the language specification.
- **ES2015**, **ES2016**, and similar labels for yearly editions.
- **ES6** as a familiar older name for ES2015.
- **ES2020+** as a convenient informal way to describe later editions.

A year label identifies an edition. It does not mean every browser started supporting all of its features on that date. Implementations release independently and may support a feature before or after a particular publication.

## How a language change is developed

TC39 is the committee that evolves ECMAScript. A proposed language change moves through maturity stages. The stages help the committee investigate a problem, shape a solution, validate it, and gain implementation experience.

The process includes **Stage 0**, **Stage 1**, **Stage 2**, **Stage 2.7**, **Stage 3**, and **Stage 4**:

- **Stage 0 - Strawperson:** An idea is being explored. It is not yet a formal committee proposal with acceptance criteria.
- **Stage 1 - Proposal:** The problem and a possible direction are described, and a champion takes responsibility for developing it.
- **Stage 2 - Draft:** The proposed design is described in specification-style detail. It is still possible for the design to change.
- **Stage 2.7 - Ready for testing:** The design and specification text are considered complete enough for rigorous validation and implementation feedback.
- **Stage 3 - Candidate:** The design has been recommended for implementation. Real implementations and compatibility feedback help reveal issues.
- **Stage 4 - Finished:** The proposal has met the process requirements for completion and can be integrated into a future edition of the standard.

A proposal can move backward or be withdrawn if new concerns appear. Stage numbers express proposal maturity. They do not promise that a feature is already enabled in every browser or runtime.

### Proposal stage is not browser support

These statements mean different things:

- **A proposal reached Stage 3** means the committee recommended implementation and wants implementation experience.
- **A proposal reached Stage 4** means the proposal is complete in the standards process.
- **A browser supports a feature** means that a particular browser version implements it.
- **A project can use a feature** means the project's supported environments can run it, possibly with a build step or fallback.

Do not infer environment support from a proposal stage alone. Check the actual feature and the target runtimes.

## Compatibility

Compatibility is whether code works as expected in the environments you intend to support. An environment may include a browser and its version, a device, a server runtime, or a managed web view embedded in another application.

Before choosing a feature, ask:

1. Which browsers, devices, or server runtimes does the project need to support?
2. Does each target support the syntax and APIs the code will use?
3. Is a fallback or build step needed?
4. How will the behavior be checked in the target environments?

A feature can be supported in a recent desktop browser but unavailable in an older mobile browser or a different runtime. A project should choose a support target that fits its users rather than assume every visitor has the newest environment.

## Syntax, built-ins, and host APIs

Compatibility checks need to distinguish three things.

### Language syntax

Syntax changes how JavaScript source is written. Examples include arrow functions, optional chaining, and newer forms of declarations. If an older engine cannot parse syntax, the script can fail before normal code runs.

This means a runtime check like **if (supportsFeature) { codeWithNewSyntax() }** does not protect against unsupported syntax in the same script. The parser has to understand the whole script before executing the condition.

A **transpiler** can transform newer syntax into syntax understood by older targets. A build tool may do this as part of preparing files for deployment.

### Built-in language APIs

Built-ins are objects and methods provided by the language runtime, such as **Array.prototype.at** or **Object.hasOwn**. Their availability can often be checked at runtime:

~~~js
if (typeof Array.prototype.at === "function") {
  console.log("Array.prototype.at is available");
}
~~~

This is feature detection. It checks for the capability your code needs instead of guessing which browser brand is running.

### Host APIs

Host APIs are supplied by an environment. For example, **document** is provided by a browser page, while Node.js provides its own APIs. A browser API may be missing, restricted, or behave differently in another environment.

Check the relevant property or method and handle the unavailable case. For APIs that require permissions, user gestures, a secure context, or network access, checking that a method exists is only the first check. The operation can still fail for other reasons.

## Feature detection and fallbacks

Feature detection checks whether the needed capability exists, then chooses an available behavior:

~~~js
function getLastItem(items) {
  if (typeof items.at === "function") {
    return items.at(-1);
  }

  return items[items.length - 1];
}
~~~

The fallback uses indexing when the **at** method is unavailable. The code still needs to be written in syntax supported by the project's oldest target, unless the project uses a build step to transform it.

A good fallback should preserve the important user-facing behavior. If a feature is optional, the page can still be useful without it. If it is essential, show a clear message or choose a different implementation.

Avoid **user-agent sniffing** as a substitute for feature detection. Checking a browser name or version can be unreliable because user-agent strings can include multiple product names, and browsers change over time. Check the actual capability when possible.

## Transpilers and polyfills

A transpiler and a polyfill solve different compatibility problems:

- A **transpiler** transforms source syntax, often during a build, so older engines can parse the output.
- A **polyfill** provides a missing API using code that the target environment can run.
- Neither automatically makes every behavior identical across every environment.

A polyfill cannot generally make an old JavaScript parser understand arbitrary new syntax, because that syntax fails before the polyfill could run. A transpiler may convert syntax, but an API that does not exist may still need a polyfill or a fallback.

Build tools should be configured for the project's actual target environments. Transforming code to an older syntax target does not automatically guarantee that every API is provided.

## Checking compatibility responsibly

Use a compatibility workflow:

1. Define which browsers, runtimes, and versions matter for the project.
2. Identify the exact syntax, built-in, or host API you want to use.
3. Check current compatibility information for that feature and those targets.
4. Decide whether to use a fallback, polyfill, or build transformation.
5. Test the behavior in representative target environments.
6. Recheck compatibility when the feature or target list changes.

Compatibility information changes as implementations ship new versions. Check current information during project planning rather than relying on memory or an old note.

Use actual feature detection when the code needs a capability at runtime. Use compatibility tables and environment testing when deciding whether the feature can be used across the whole project. These methods complement each other.

## Common misconceptions

- **“ES6” is a separate language from JavaScript.** ES6 is a common name for the ECMAScript 2015 edition.
- **“The proposal is Stage 3, so all browsers support it.”** Proposal stage and runtime implementation are different facts.
- **“A yearly edition means every browser updates at once.”** Browsers and other runtimes release independently.
- **“A condition can protect any new syntax.”** A parser must understand the source before it can evaluate the condition.
- **“A transpiler adds every missing API.”** Transpilation changes syntax; missing APIs may need a polyfill or fallback.
- **“Browser detection is the best way to choose code.”** Checking for a capability is usually more reliable than guessing from a browser name.
- **“If an API exists, every call will succeed.”** Permissions, user activation, security context, and runtime conditions can still affect the operation.

## Try it yourself

1. Find **ES2015** and **ES6** in the lesson and explain why they refer to the same edition.
2. Put the proposal stages in order from early idea to finished proposal.
3. Explain why **Stage 3** is not the same as browser support.
4. In a browser Console, check whether **Array.prototype.at** is a function.
5. Use the fallback example in the companion chapter example with a list containing several values.
6. Remove or rename the **at** capability check in a practice copy, then confirm that the fallback still returns the last item.
7. Name one piece of JavaScript syntax and one runtime API. Explain why they need different compatibility checks.
8. Pick a target environment for a small project and list how you would check one feature before depending on it.

## Key points

- ECMAScript specifies core JavaScript language behavior, while runtimes provide implementations and host APIs.
- ES2015 is also commonly called ES6; later editions are commonly identified by year.
- TC39 proposal stages describe maturity in the standards process, not universal environment support.
- Syntax support, built-in API support, and host API support are separate compatibility concerns.
- Feature detection checks for a capability directly and is often more reliable than browser-name guessing.
- Transpilers transform syntax, while polyfills can provide some missing APIs.
- Define target environments, check current compatibility information, and test the behavior you plan to rely on.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [05 - Browser console and developer tools](005-browser-console-and-developer-tools.md) | [Open Q&A](../qnas/006-ecmascript-editions-proposals-and-compatibility.md) | [Open example](../examples/006-ecmascript-editions-proposals-and-compatibility.md) | [07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion](007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) |
