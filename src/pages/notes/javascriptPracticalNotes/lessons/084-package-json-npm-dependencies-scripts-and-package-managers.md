# 84 - Package.json, npm, dependencies, scripts, and package managers

A JavaScript project needs a clear record of its identity, dependencies, and repeatable commands. The **package.json** file provides that project manifest. A package manager such as **npm** reads it to install packages, manage the dependency tree, and run project scripts.

This chapter focuses on managing a JavaScript project. Node.js module formats and how Node resolves imports are covered in the next chapter.

## Learning goals

After this chapter, you should be able to:

- Create and read a **package.json** file.
- Tell runtime dependencies apart from development dependencies.
- Install and remove packages with npm.
- Explain why a lockfile belongs in version control.
- Define and run project scripts.
- Choose one package manager for a project and use it consistently.

## What is a package?

A package is a directory of software described by metadata. Packages can contain JavaScript, styles, command-line tools, type declarations, documentation, or other files. A package can be installed into another project or published for other people to use.

A project can depend on packages created by other people, packages maintained by a team, or packages in the project itself. npm can retrieve public packages from a registry, or install packages from other supported sources.

## The package.json manifest

A **package.json** file is a JSON document at the root of a project. It describes the project and can declare dependencies and commands. JSON has strict syntax: property names and string values use double quotes, entries are separated by commas, and comments and trailing commas are not allowed.

Create a starter manifest interactively with:

~~~sh
npm init
~~~

For a quick manifest using default answers, run:

~~~sh
npm init -y
~~~

Review the generated file. Defaults are a starting point, not a complete description of what the project needs. A small application manifest might look like this:

~~~json
{
  "name": "reading-list",
  "version": "1.0.0",
  "private": true,
  "description": "A small reading-list application",
  "scripts": {
    "start": "node src/index.js",
    "test": "node test/smoke-test.js"
  },
  "dependencies": {
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
~~~

The example shows several common fields:

- **name** identifies the package. Published package names have additional naming rules.
- **version** describes a package release, commonly using semantic-versioning notation.
- **private** set to **true** prevents accidentally publishing this project with npm.
- **description** briefly explains the project.
- **scripts** names commands that the project can run.
- **dependencies** lists packages needed by the application at runtime.
- **devDependencies** lists packages used while developing, building, or checking the project.

A project can have other fields, such as **license**, **repository**, **engines**, and **type**. Their meaning depends on the project. Module-related package settings such as **type** are explained with Node.js module formats in Chapter 85.

## Install a package

From the project root, install a runtime package with:

~~~sh
npm install date-fns
~~~

npm records the package in **dependencies** and installs it into **node_modules**. The **npm i** spelling is a shorter alias for **npm install**.

Install a development tool with:

~~~sh
npm install --save-dev vite
~~~

The **--save-dev** option records it under **devDependencies**. This makes the intended role of the package visible to people working on the project and to deployment tools that install only runtime dependencies.

Remove a dependency with:

~~~sh
npm uninstall date-fns
~~~

The command removes the installed package and updates the manifest and lockfile. Review both files after package changes.

## Dependency categories

Choose the category based on why the project needs the package:

| Field | Use it for | Example |
| --- | --- | --- |
| **dependencies** | Packages the application needs when it runs | A date formatting library used by application code |
| **devDependencies** | Tools used to develop, test, lint, or build the project | A test runner, formatter, bundler, or compiler |
| **optionalDependencies** | Packages that may be unavailable or may fail to install without making the whole installation fail | A platform-specific enhancement the application can work without |
| **peerDependencies** | A package's compatibility expectation for a package supplied by the consuming project | A plugin that works with a compatible host library |

Do not put every package in the same category. For example, if a bundler is only needed to create build output, it is normally a development dependency. If the deployed application imports a library at runtime, that library belongs in **dependencies**.

Optional dependencies need deliberate handling. The program must account for the package being absent or unusable. A peer dependency also has a different purpose from an ordinary runtime dependency: it describes a relationship with the host environment that uses your package. It is common in reusable libraries and plugins.

## Version ranges

A dependency entry normally specifies a version or version range. For example:

~~~json
{
  "dependencies": {
    "exact-example": "4.2.0",
    "compatible-minor-example": "^4.2.0",
    "patch-updates-example": "~4.2.0"
  }
}
~~~

In common semantic-versioning ranges:

- **4.2.0** requests that exact version.
- **^4.2.0** allows compatible releases at or above 4.2.0 while staying below 5.0.0.
- **~4.2.0** allows patch releases at or above 4.2.0 while staying below 4.3.0.

A range expresses which releases may be selected. It does not prove that every allowed release is safe for a particular application. Review dependency changes, especially when they affect production behavior. The lockfile records the concrete resolution used for an installation.

## The lockfile and node_modules

When npm installs packages, it creates or updates **package-lock.json**. This lockfile records the resolved dependency tree, including transitive dependencies and package integrity information. The manifest declares project requirements; the lockfile captures the concrete package resolution npm selected.

For an application, commit **package.json** and **package-lock.json** together. This lets teammates and continuous-integration jobs reproduce the same npm dependency tree. If you intentionally change dependencies, let npm update the lockfile and commit the related changes together.

Installed packages are placed in **node_modules**. This directory can be large and is generated from the manifest and lockfile, so applications usually exclude it from version control. Add an entry such as this to **.gitignore**:

~~~gitignore
node_modules/
~~~

Do not delete a lockfile just to silence a conflict without understanding the change. A regenerated lockfile can select different transitive versions.

## Install from the manifest

After cloning a project or checking out its files, install the declared packages from its root:

~~~sh
npm install
~~~

For a clean automated installation when the repository contains a valid npm lockfile, use:

~~~sh
npm ci
~~~

**npm ci** expects the lockfile and manifest to agree, removes the existing **node_modules** directory, and installs the recorded dependency tree. It is useful in automated builds because it checks that dependency changes are recorded. If the manifest and lockfile are out of sync, resolve the dependency change locally, then commit the updated files.

Use **npm install** when you are adding or changing dependencies during regular project work. Use **npm ci** for a clean install from the committed lockfile, such as in continuous integration. Do not edit the lockfile by hand.

## Project scripts

Scripts give a project named commands in **package.json**. They can make common tasks easier to discover and repeat. For example:

~~~json
{
  "scripts": {
    "start": "node src/index.js",
    "test": "node test/smoke-test.js",
    "check": "node tools/check-files.js"
  }
}
~~~

Run a script by its name:

~~~sh
npm start
npm test
npm run check
~~~

The **start** and **test** names have convenient npm command forms. For other names, use **npm run** followed by the script name. Run **npm run** without a name to list the available scripts.

When npm runs a script, it makes executables installed by the project available on the script's command path. A script can therefore call a local tool without requiring that tool to be installed globally. Scripts run from the package root, even if a command is invoked from a nested directory.

Keep scripts understandable and portable. Prefer a small named script over a long command that teammates cannot recognize. Shell syntax can differ across operating systems, so a command that works only in one shell may fail for someone on another platform.

## Choosing and using a package manager

A package manager installs dependencies, manages a lockfile, and provides commands for project tasks. npm is commonly used with Node.js. Yarn and pnpm are other package managers with their own commands, configuration, and lockfile formats.

Use the package manager selected for the project. Keep its lockfile, such as **package-lock.json**, **yarn.lock**, or **pnpm-lock.yaml**, in version control. Avoid mixing package managers in one project because they may create different lockfiles and dependency resolutions. If a project changes package managers, make that a deliberate change and update its contribution instructions and lockfiles accordingly.

A globally installed tool can be useful for commands that are intentionally shared across projects, but application dependencies should normally be declared by the project. A new teammate should be able to install the project's tools and run its scripts from the repository instructions without first guessing what must be installed globally.

## A typical project workflow

1. Create or open a project directory.
2. Run **npm init** and review **package.json**.
3. Add runtime packages with **npm install package-name**.
4. Add project tools with **npm install --save-dev package-name**.
5. Define useful tasks under **scripts**.
6. Confirm **node_modules/** is ignored by Git.
7. Commit **package.json** and **package-lock.json** together.
8. On another machine, run **npm ci** and then the documented project scripts.

If a command fails, first make sure the terminal is in the project root. Check that **package.json** contains valid JSON, the package name is spelled correctly, and the lockfile matches the manifest. For installation failures, read the first useful error in the output rather than treating every later message as the cause.

## Try it yourself

1. Create a new directory for a small JavaScript application and initialize it with **npm init**.
2. Add one package that your application imports as a runtime dependency.
3. Add a test or formatting tool as a development dependency.
4. Add **start** and **test** scripts, then run each one through npm.
5. Inspect the manifest and lockfile after adding and removing a package.
6. Add **node_modules/** to **.gitignore** and check that Git does not list installed packages as project files.
7. Clone or copy the project into a fresh directory, run **npm ci**, and run its scripts.
8. Change a version range, reinstall, and compare the manifest with the lockfile. Restore the intended files afterward.
9. Explain why a plugin might declare a peer dependency rather than bundling its host library as an ordinary dependency.

## Key points

- **package.json** describes a package, its dependencies, and named project scripts.
- Runtime packages belong in **dependencies**; development tools usually belong in **devDependencies**.
- Optional and peer dependencies express different relationships and need deliberate handling.
- Version ranges declare acceptable releases; **package-lock.json** records npm's concrete dependency resolution.
- Commit the manifest and lockfile together, and normally keep **node_modules/** out of Git.
- **npm install** supports ordinary dependency work; **npm ci** performs a clean install from a consistent npm lockfile.
- Define common commands in **scripts** so teammates can run them consistently.
- Pick one package manager per project and use its lockfile consistently.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [83 - Module loading, resolution, and import maps](083-module-loading-resolution-and-import-maps.md) | [Open Q&A](../qnas/084-package-json-npm-dependencies-scripts-and-package-managers.md) | [Open example](../examples/084-package-json-npm-dependencies-scripts-and-package-managers.md) | [85 - ES modules and CommonJS in Node.js](085-es-modules-and-commonjs-in-node-js.md) |
