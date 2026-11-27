# 84 - Package.json, npm, dependencies, scripts, and package managers Q&A

These questions review project manifests, dependency types, version ranges, npm installs, lockfiles, scripts, and package-manager habits. Each answer follows its question, with an explanation where it helps clarify the idea.

## Project manifests and dependencies

### 1. What is the main purpose of package.json?

**Answer:** It describes a JavaScript package or project, including metadata, dependencies, and named scripts.

**Explanation:** A package manager reads the manifest to understand what the project needs and which tasks it exposes.

### 2. Which item is invalid in a JSON package.json file?

- A. A property name in double quotes.
- B. A trailing comma after the final property.
- C. A string value in double quotes.
- D. A comma between two properties.

**Answer:** B.

**Explanation:** JSON does not allow trailing commas or comments. One syntax error can prevent npm from reading the entire manifest.

### 3. What does npm init -y do?

**Answer:** It creates a package.json using default answers without prompting for each field.

**Explanation:** The generated values are a starting point. Review and adjust them to describe the actual project.

### 4. What does setting private to true in package.json do?

**Answer:** It prevents the project from being published to the npm registry by mistake.

**Explanation:** This is useful for applications and private learning projects that are not intended to be published as packages.

### 5. What does the version field usually describe?

**Answer:** The version of the package itself.

**Explanation:** It is separate from the versions of packages the project depends on. Published packages commonly follow semantic-versioning conventions.

### 6. Which packages usually belong in dependencies?

**Answer:** Packages required by the application while it runs.

**Explanation:** If deployed application code imports a package at runtime, that package normally belongs in dependencies.

### 7. Which packages usually belong in devDependencies?

**Answer:** Development tools such as test runners, formatters, linters, and build tools.

**Explanation:** These tools help create or check the application but are not normally needed by the deployed application at runtime.

### 8. What does npm install date-fns normally do in a project?

**Answer:** It installs the package, records it in dependencies, and updates the npm lockfile.

**Explanation:** Run the command from the project root. Review the manifest and lockfile changes afterward.

### 9. Is npm i a different package manager from npm install?

**Answer:** No. It is a shorter alias for npm install.

**Explanation:** Both forms use npm and follow the same install behavior.

### 10. What files does npm uninstall date-fns normally update?

**Answer:** It removes the package and updates package.json and package-lock.json.

**Explanation:** The package should be removed from the project's declared dependencies as well as the installed dependency tree.

### 11. When is an optional dependency appropriate?

**Answer:** When a project can work without a package, and the application handles the package being unavailable.

**Explanation:** Marking a dependency optional does not make its features magically available. Code must check or otherwise tolerate its absence.

### 12. What relationship does a peer dependency describe?

**Answer:** A compatibility expectation between a package and a host package supplied by the project that uses it.

**Explanation:** Plugins often declare a peer dependency on the library they extend so that the consuming project provides a compatible host.

### 13. What does this command communicate about a package?

~~~sh
npm install --save-dev vite
~~~

**Answer:** Vite is being added as a development dependency.

**Explanation:** The --save-dev option records the package in devDependencies rather than dependencies.

### 14. What does an exact dependency version such as 4.2.0 request?

**Answer:** That specific version, rather than a range of later releases.

**Explanation:** A version range can allow npm to select other compatible releases. An exact entry is more restrictive in the manifest.

### 15. In a common semantic-versioning range, what does ^4.2.0 allow?

**Answer:** Compatible releases at or above 4.2.0 while remaining below 5.0.0.

**Explanation:** For this nonzero major version, the caret range allows minor and patch updates while excluding a new major version.

### 16. In a common semantic-versioning range, what does ~4.2.0 allow?

**Answer:** Patch releases at or above 4.2.0 while remaining below 4.3.0.

**Explanation:** The tilde range is narrower than the caret range in this example. Check the project's version policy before changing ranges.

## Lockfiles and installation

### 17. What is the difference between package.json and package-lock.json?

**Answer:** The manifest declares project requirements, while the lockfile records npm's concrete dependency resolution.

**Explanation:** The lockfile includes the selected versions of direct and transitive packages so a project can reproduce an installation.

### 18. Which npm project files should an application normally commit together?

**Answer:** package.json and package-lock.json.

**Explanation:** Committing both records the declared dependency requirements and the resolved dependency tree used by the project.

### 19. What is a transitive dependency?

**Answer:** A package required by another dependency rather than listed as a direct dependency of the application.

**Explanation:** A project can have many transitive dependencies even when its own manifest names only a few packages.

### 20. Should node_modules normally be committed to an application repository?

**Answer:** No. It is normally regenerated from the manifest and lockfile and should be ignored by Git.

**Explanation:** The directory can be large and machine-specific. Commit dependency declarations and the lockfile instead.

### 21. What does npm install do when run in an existing project root?

**Answer:** It installs the packages declared by the project and may update the lockfile if the manifest and lockfile need to be reconciled.

**Explanation:** It is the usual command for working on dependencies. Review any manifest or lockfile changes it creates.

### 22. What does npm ci expect before it installs packages?

**Answer:** A committed npm lockfile that agrees with the package manifest.

**Explanation:** If the manifest and lockfile are inconsistent, npm ci reports an error. Update the dependencies and lockfile deliberately, then commit them.

### 23. What does npm ci do with the existing node_modules directory?

**Answer:** It removes the existing directory and installs from the lockfile.

**Explanation:** This gives automation a clean installation based on the recorded npm dependency tree. npm ci does not rewrite package.json or the lockfile.

### 24. Where should node_modules/ commonly be listed?

**Answer:** In the project's .gitignore file.

**Explanation:** This keeps generated installed packages out of normal version-control changes.

### 25. Why should developers avoid hand-editing package-lock.json?

**Answer:** npm must keep a consistent, detailed dependency resolution, and manual edits can make that record invalid or misleading.

**Explanation:** Use npm commands to add, remove, or update dependencies, then review the generated lockfile diff.

### 26. If an application intentionally changes a dependency, which related files should be reviewed and committed?

**Answer:** package.json and package-lock.json.

**Explanation:** The manifest states the intended requirement and the lockfile captures the resolved tree. Committing them together keeps the project reproducible.

### 27. Which install command is a good fit for automated builds using a committed npm lockfile?

- A. npm ci
- B. npm init -y
- C. npm uninstall
- D. npm run

**Answer:** A.

**Explanation:** npm ci performs a clean installation from the lockfile and checks that it agrees with the manifest.

## Scripts and package managers

### 28. Where does a project declare named npm commands?

**Answer:** In the scripts object in package.json.

**Explanation:** Each property name is a script name and its string value is the command npm runs.

### 29. How do you run a custom script named check?

**Answer:** Run npm run check.

**Explanation:** Custom script names are invoked with npm run followed by the name.

### 30. What convenient commands can run scripts named start and test?

**Answer:** npm start and npm test.

**Explanation:** These common script names have convenient npm forms. npm run start and npm run test also work.

### 31. What does running npm run with no script name do?

**Answer:** It lists the scripts available in the current package.

**Explanation:** This is a quick way to discover the tasks a project exposes.

### 32. How can an npm script use a locally installed command-line tool?

**Answer:** Add a script that calls the tool by its executable name.

**Explanation:** npm adds the project's local executable directory to the script command path, so a matching global installation is not usually required.

### 33. From which directory does npm run a package script?

**Answer:** From the package root.

**Explanation:** This gives scripts a predictable working directory even when the npm command was started from a nested folder.

### 34. Why can a script that uses shell-specific syntax fail for a teammate?

**Answer:** The teammate may be using a different operating system or shell with different command syntax.

**Explanation:** Keep scripts portable or use a project tool that handles cross-platform behavior.

### 35. Which statement about npm, Yarn, and pnpm is correct?

- A. They are all names for the same lockfile format.
- B. They are package managers with their own commands and lockfile formats.
- C. They are JavaScript engines.
- D. They replace package.json with unrelated manifests in every project.

**Answer:** B.

**Explanation:** Each manager can install dependencies and run project tasks, but each has its own conventions and lockfile format.

### 36. Why should a team use one package manager consistently in a project?

**Answer:** To keep dependency installation and lockfile updates predictable for everyone.

**Explanation:** Mixing managers can produce competing lockfiles and different dependency resolutions.

### 37. A project uses npm and has package-lock.json. Which file should the team generally keep as the npm lockfile?

**Answer:** package-lock.json.

**Explanation:** Keep the lockfile for the package manager selected by the project rather than adding a second manager's lockfile casually.

### 38. A package.json file is valid JSON, but npm cannot find a package command. What should you check first?

**Answer:** Confirm the terminal is at the project root and the command exists in the scripts object or is installed as a project tool.

**Explanation:** npm commands depend on the current package and its declared scripts or executables.

### 39. A production install omits development dependencies. Which category should contain the application's runtime library?

**Answer:** dependencies.

**Explanation:** Tools that are only needed to build or test can be development dependencies, but a package imported by the running application must be available at runtime.

### 40. Which summary best describes a reliable npm application setup?

- A. Commit node_modules and omit the lockfile.
- B. Put every package in devDependencies and install tools globally.
- C. Commit package.json and package-lock.json, ignore node_modules, and document project scripts.
- D. Commit package.json only and mix lockfiles from multiple managers.

**Answer:** C.

**Explanation:** The manifest describes project requirements, the lockfile records npm's concrete resolution, node_modules is generated, and scripts provide repeatable project commands.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [83 - Module loading, resolution, and import maps](../lessons/083-module-loading-resolution-and-import-maps.md) | [Lesson](../lessons/084-package-json-npm-dependencies-scripts-and-package-managers.md) / [Example](../examples/084-package-json-npm-dependencies-scripts-and-package-managers.md) | [85 - ES modules and CommonJS in Node.js](../lessons/085-es-modules-and-commonjs-in-node-js.md) |
