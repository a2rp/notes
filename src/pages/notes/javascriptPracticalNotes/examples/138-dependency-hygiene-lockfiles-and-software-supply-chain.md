# Example 138 - Dependency hygiene, lockfiles, and software supply chain

## Question

A Node.js project needs a new date-formatting package. How should the team add it, review the full dependency change, and verify that a clean build uses the committed lockfile?

## Starting point

This example uses **@acme/date-format** as an illustrative package name. Replace it with a real package that your project has reviewed and can resolve from its configured registry.

The project already has a manifest and npm lockfile. Before the change, its direct dependencies include:

~~~json
{
  "name": "report-service",
  "private": true,
  "scripts": {
    "test": "node --test",
    "build": "node scripts/build.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
~~~

## Add the reviewed dependency

After checking the package name, source, maintenance, license, release history, and install behavior, add it through npm:

~~~sh
npm install @acme/date-format
~~~

This updates the project manifest and usually its lockfile. Review both files together:

~~~sh
git diff -- package.json package-lock.json
~~~

A simplified manifest change could look like this:

~~~diff
 {
   "dependencies": {
+    "@acme/date-format": "^2.4.0"
   }
 }
~~~

The selected version in the lockfile may be a compatible version newer than the minimum in the range. The lockfile also records transitive dependencies and integrity information. The version and all related entries should be reviewed as one dependency-tree change.

## Inspect why packages are present

Ask npm to show the dependency tree and why a package was installed:

~~~sh
npm ls @acme/date-format
npm explain @acme/date-format
npm explain @acme/date-format-runtime
~~~

Illustrative output:

~~~text
report-service
└── @acme/date-format@2.4.3

@acme/date-format-runtime
node_modules/@acme/date-format-runtime
  @acme/date-format-runtime@"^1.6.0" from @acme/date-format@2.4.3
~~~

The first package is a direct dependency. The runtime helper is transitive. Review unexpected packages, duplicate major versions, and packages from unexpected sources.

## Check vulnerability and provenance information

Request the registry's vulnerability report:

~~~sh
npm audit
~~~

For registries and packages that support signature and provenance verification, inspect the installed package attestations:

~~~sh
npm audit signatures
~~~

Example of a clean audit result:

~~~text
found 0 vulnerabilities
~~~

This means the audit source reported no matching known vulnerabilities at that time. It does not establish that the package has no malicious behavior, that the source is safe, or that the application uses it correctly. Signature and provenance output can help verify artifact origin, but it is also evidence to evaluate, not a safety guarantee.

If an audit reports an issue, inspect its affected package, severity, dependency path, and suggested fixed versions. Preview remediation before changing dependencies:

~~~sh
npm audit fix --dry-run
~~~

Review any proposed manifest or lockfile changes. Avoid force updates until the major-version and compatibility impact is understood.

## Verify the lockfile from a clean install

A clean build should verify the committed dependency resolution:

~~~sh
npm ci
npm test
npm run build
git diff --exit-code -- package.json package-lock.json
~~~

Expected result:

- npm ci completes without changing the manifest or lockfile.
- Existing tests and the build complete successfully.
- The final diff command reports no dependency-file changes.

If npm ci reports that the manifest and lockfile disagree, stop and fix the project state instead of deleting the lockfile. After intentionally resolving the mismatch, inspect and commit the updated manifest and lockfile together.

## Review install-time permissions

Package installation may run scripts from dependencies. In a CI system:

- Use a clean, limited-permission runner for dependency installation.
- Do not expose deployment tokens to untrusted pull requests or install steps.
- Use short-lived, narrow credentials only in the job that needs them.
- Consider disabling lifecycle scripts only after confirming the project can build without them.
- Review the package's scripts and build requirements when a dependency changes.

A lockfile makes the resolved tree repeatable. It cannot restrict what an install script can do with the permissions of the process that runs it.

## Pull request checklist

Before approving this change, confirm that:

1. The manifest and lockfile are both included in the change.
2. The package name and registry are the intended ones.
3. The complete direct and transitive dependency diff is understood.
4. The license and package maintenance are acceptable for the project.
5. Install scripts and build steps are expected.
6. Audit and provenance results have been reviewed with their limits in mind.
7. A clean npm ci and the project's established checks succeed.
8. No credentials or private configuration were exposed to the dependency install.

## Try it yourself

1. Remove the illustrative package from the manifest and compare the install tree before and after it is added.
2. Use npm explain on one transitive package and trace which direct dependency brings it in.
3. Review a lockfile update that changes several transitive packages. Write down why each changed.
4. Run npm ci after intentionally changing only the manifest. Observe that npm reports the mismatch rather than updating the lockfile.
5. Restore a consistent manifest and lockfile, then verify that npm ci leaves both files unchanged.
6. Consider which job permissions are needed during install and which secrets can be withheld.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [137 - Error handling, reliability, and application security](../lessons/137-error-handling-reliability-and-application-security.md) | [Lesson](../lessons/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) · [Q&A](../qnas/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) · [Example](138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [139 - Performance analysis, memory leaks, and optimization](../lessons/139-performance-analysis-memory-leaks-and-optimization.md) |
