# 138 - Dependency hygiene, lockfiles, and software supply chain

A JavaScript project depends on more code than the files written by its maintainers. Direct dependencies can bring in many transitive packages, and package installation can run code on a developer machine or build server. Dependency hygiene is the practice of choosing, recording, updating, and checking those packages deliberately.

A lockfile makes a resolved dependency tree repeatable. It does not prove the packages are safe, well maintained, or free of vulnerabilities. Reliable dependency management combines a committed lockfile with review, controlled updates, vulnerability checks, and a build environment that limits the damage a compromised package could cause.

## Learning goals

- Distinguish a package manifest from a lockfile.
- Explain direct and transitive dependencies and version ranges.
- Use a clean, lockfile-based install for automated builds.
- Review dependency changes and lockfile diffs.
- Assess package identity, maintenance, lifecycle scripts, and provenance.
- Use vulnerability and signature checks with their limits in mind.
- Update dependencies in small, verifiable changes.
- Reduce the permissions and secrets exposed to package installation.

## The manifest and the lockfile

A package manifest describes the project and its direct dependency requirements. In an npm project, this information is primarily in **package.json**. It may declare packages under **dependencies**, **devDependencies**, **optionalDependencies**, or **peerDependencies**.

A lockfile records a resolved dependency tree for a specific package manager. With npm, the root lockfile is **package-lock.json**. It records selected versions and dependency relationships for both direct and transitive packages, along with integrity information used during installation.

~~~json
{
  "dependencies": {
    "date-library": "^4.2.0"
  },
  "devDependencies": {
    "test-runner": "~3.1.0"
  }
}
~~~

The example manifest says which versions are acceptable according to the ranges. It does not by itself select every transitive package version. The lockfile records a concrete resolution for the project.

Commit both the manifest and its lockfile. Review changes to both together. Do not commit **node_modules** as a replacement for a lockfile, and do not remove a lockfile just to make an installation error disappear.

A lockfile belongs to a package manager and its project configuration. Avoid maintaining competing lockfiles for different package managers in the same project unless the repository has a deliberate multi-manager process. In a workspace, use the package manager's documented root lockfile model.

## Version ranges and selected versions

A dependency declaration may use an exact version or a semantic version range. Common npm range prefixes include:

- **^** generally permits compatible minor and patch releases, according to semantic versioning and the package's current major version.
- **~** generally permits patch releases within the specified minor version.
- An exact version selects only that declared version for the direct dependency.
- Tags such as **latest** can move over time, so they do not describe an immutable version.

Range behavior has details around zero-major versions and prereleases. Read the range as a constraint, not as a promise that a release is safe or compatible with your application.

An exact direct dependency version does not by itself freeze the entire dependency tree. Its dependencies may still have ranges. The lockfile records their resolved versions too.

Use ranges that match the update policy of the project. A lockfile gives a normal application repeatable installs while the manifest can continue to express the range allowed for a deliberate update. Pinning every direct dependency exactly can make updates less automatic, but it is not a substitute for a lockfile or review.

## Install deliberately

Use the package manager commands for the task at hand:

~~~sh
npm install
~~~

This resolves or updates the local installation and may update the lockfile. Run it when changing dependencies intentionally, then inspect the resulting manifest and lockfile diff.

For a clean install from an existing npm lockfile, use:

~~~sh
npm ci
~~~

A clean install is useful in continuous integration and deployment. It expects a compatible manifest and lockfile, removes an existing **node_modules** tree, and fails instead of silently rewriting the lockfile when the two disagree. It does not write changes to the manifest or lockfile.

If the lockfile was created with project-level options that change dependency resolution, the same configuration may be needed for a clean install. Keep required npm settings in reviewed project configuration rather than relying on one developer's machine.

Do not regenerate the lockfile as a first response to every conflict. Inspect the manifest and lockfile changes, determine which branch's dependency decision should be retained, and resolve the conflict with the package manager when appropriate. Then review the complete resulting dependency diff.

## Direct and transitive dependencies

A **direct dependency** is declared by the project. A **transitive dependency** is required by one of those dependencies, possibly several levels down. Both are part of the installed code and both matter to reliability and security.

Use the package manager to inspect the installed tree:

~~~sh
npm ls
npm ls date-library
npm explain a-transitive-package
~~~

The dependency tree can contain multiple versions of the same package. This may be valid, but it can increase install size or cause problems when a library expects shared identity, such as a plugin system that compares class instances.

Remove packages that the project no longer uses. Before adding a dependency, check whether a small standard-library function is enough. For a package you do need, check that the name is spelled correctly and that the package, maintainer, release history, source, license, and expected behavior fit the project.

## Choose packages as code you will run

An installable package is executable code with access to the permissions of the process that loads it. Package installation may also run lifecycle scripts. A compromised or intentionally malicious dependency could read files available to the process or make network requests.

Before adding a package:

1. Confirm its exact package name and intended registry.
2. Review its purpose, maintenance activity, release history, ownership, and source.
3. Check the dependency tree it adds and whether the package needs install scripts.
4. Check the license and whether the project can accept it.
5. Prefer a maintained package with a clear reason to exist in the project.
6. Review what is actually published or installed when that differs from the source repository.
7. Record why the dependency is needed so a later maintainer can reassess it.

Popularity is one signal, not a security guarantee. A source repository link or a clean audit report is not proof that a particular release is harmless.

## Lifecycle scripts and install permissions

Packages may declare scripts such as **preinstall**, **install**, and **postinstall**. These may be needed to build native code or download platform-specific assets, but they also execute during an install workflow.

Do not blindly run installation commands with broad credentials available. In continuous integration, use short-lived or narrowly scoped credentials, avoid exposing secrets to untrusted pull requests, and separate dependency installation from jobs that need deployment credentials.

The npm **--ignore-scripts** option can prevent package lifecycle scripts from running during installation, but some packages rely on them to work. Use it when the project can support it, and document any required build step. It is not a universal setting that can be applied without checking the application.

Install dependencies in a controlled environment. Keep the runner and developer account permissions limited to what the project actually needs. A lockfile cannot contain the effects of arbitrary code that runs during installation.

## Review lockfile changes

A lockfile diff is part of a dependency change, not generated noise. Review it alongside the manifest:

~~~sh
git diff -- package.json package-lock.json
npm ls
~~~

Check:

- Which direct package was added, removed, or updated.
- Which transitive packages changed as a result.
- Whether the selected versions and sources are expected.
- Whether integrity values and registry locations changed unexpectedly.
- Whether the change introduces a different package with a similar name.
- Whether a project configuration change also alters the resolution.

Some lockfile diffs are large because a package manager represents the tree differently or updates lockfile metadata. Understand the reason before merging. Do not hand-edit resolved package versions or integrity fields to force an install to pass.

## Vulnerability audits

A vulnerability audit compares dependency information with known vulnerability data available to the configured registry or scanner. With npm, inspect the report using:

~~~sh
npm audit
~~~

An audit can identify known issues and suggested remediations. It cannot detect every malicious package, undisclosed vulnerability, unsafe use of a package, or vulnerability in application code. A clean result means no matching issue was reported by that data source at that time.

An automated fix can change versions and the lockfile. Review those changes and run the project's established checks before accepting them. Be especially cautious with options that permit updates outside the declared compatible range. A forced major update can require code changes and can introduce regressions even when it resolves a reported advisory.

Decide how findings should be handled based on severity, reachability, runtime exposure, available fixes, and the project's risk. Document an accepted exception with an owner and a review date. Do not hide or downgrade a finding just to make a pipeline green.

## Signatures and provenance

Package registries may provide signatures or provenance attestations. These can help verify that an artifact is associated with a particular publisher, source repository, or build process. For npm, the CLI provides a signature and provenance verification command:

~~~sh
npm audit signatures
~~~

Availability depends on the package, registry, and npm version. A missing attestation is not automatically proof of malicious code, and a valid attestation is not a guarantee that the source or package is safe. Provenance helps establish where and how an artifact was built; it does not replace reviewing the code, its permissions, and its behavior.

Treat mismatches between a package's claimed source and its published artifact as a reason to investigate. Use a verification feature only when its trust roots and result are understood.

## Supply-chain risks to recognize

Dependency attacks can involve:

- **Typosquatting:** a package name is made to resemble a package developers expect.
- **Dependency confusion:** a package resolver obtains a similarly named package from an unintended source.
- **Compromised maintainer access:** an attacker publishes a release through a legitimate account.
- **Malicious or compromised release:** a package version includes harmful behavior.
- **Lockfile tampering:** the resolved tree is changed to introduce an unexpected source or version.
- **Lifecycle abuse:** install-time code runs with more access than it needs.
- **Unmaintained packages:** known issues remain without a viable fix.

Use an explicit registry policy for private scopes and internal packages. Review package names carefully. Keep lockfile changes in normal code review, and avoid automatically trusting every update just because it is within a version range.

## A controlled update workflow

For a routine dependency update:

1. Start from a clean working tree and note the current runtime and package manager versions.
2. Review the package's update notes and check for breaking changes.
3. Update one package or a small, related group.
4. Inspect the manifest and lockfile diff.
5. Review direct and transitive changes, sources, licenses, and audit findings.
6. Install from the resulting lockfile in a clean environment.
7. Run the project's established test, build, and compatibility checks.
8. Commit the manifest and lockfile together with a clear explanation.
9. Monitor the application after deployment and be prepared to roll back.

For an urgent security update, shorten the schedule but keep the review. Determine whether the vulnerable code path is reachable, identify a patched version, and verify that the update changes only what is needed.

## Keep the project reproducible

Record the runtime and package manager assumptions the project depends on. Use one declared package manager and a reviewed lockfile. Build and deploy from a clean checkout so local **node_modules** does not conceal a missing or inconsistent dependency.

Use the same install mode in local CI reproduction and automation. Keep operating-system-specific optional packages and native build requirements in mind when comparing results across platforms.

Reproducibility reduces surprises, but does not guarantee identical behavior across every operating system, runtime, environment variable, or install script. Verify the environments where the application is expected to run.

## Common mistakes

- Treating **package.json** as the complete record of the resolved tree.
- Forgetting to commit the lockfile after changing dependencies.
- Committing several competing lockfiles without a deliberate policy.
- Running **npm install** in CI when the build should verify a committed lockfile.
- Assuming an exact top-level version fixes all transitive versions.
- Assuming a lockfile proves a package is trustworthy.
- Automatically accepting an audit fix without reviewing its diff.
- Using a force option to apply a major upgrade without checking compatibility.
- Treating a clean vulnerability audit as proof that the project is secure.
- Running install scripts with production secrets or broad machine permissions.
- Adding packages by name without checking for spelling and registry confusion.
- Hand-editing lockfile data or deleting the file to resolve an install error.
- Assuming provenance means that the package contains no malicious code.

## Key points

- The manifest states dependency requirements; the lockfile records a resolved tree.
- Commit and review both files together.
- Use clean lockfile installs in automation and let mismatches fail visibly.
- Direct and transitive dependencies both execute as part of the application.
- Audit results, signatures, and provenance are useful evidence with defined limits.
- Review updates, constrain install permissions, and retain an intentional recovery path.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [137 - Error handling, reliability, and application security](137-error-handling-reliability-and-application-security.md) | [Open Q&A](../qnas/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [Open example](../examples/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [139 - Performance analysis, memory leaks, and optimization](139-performance-analysis-memory-leaks-and-optimization.md) |
