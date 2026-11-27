# Dependency hygiene, lockfiles, and software supply chain - Q&A

These questions review [Chapter 138](../lessons/138-dependency-hygiene-lockfiles-and-software-supply-chain.md). Each answer follows its question and includes an explanation.

## Multiple-choice questions

### 1. What is the main role of a lockfile?

A. To replace the project manifest  
B. To record a resolved dependency tree for repeatable installs  
C. To prove every package is safe  
D. To store the application's source code

**Answer:** B. To record a resolved dependency tree for repeatable installs.

**Explanation:** The lockfile captures selected direct and transitive package versions. It helps installs use the same tree, but it is not a security certification.

### 2. What does a package manifest primarily describe?

A. Direct dependency requirements and project metadata  
B. Every file in node_modules  
C. The exact runtime behavior of every dependency  
D. A guarantee that no package scripts will run

**Answer:** A. Direct dependency requirements and project metadata.

**Explanation:** In npm projects, package.json declares direct dependencies and ranges. The lockfile records the resolved tree.

### 3. What is a transitive dependency?

A. A dependency declared directly by the application  
B. A dependency required by another dependency  
C. A dependency that is never installed  
D. A package available only in a browser

**Answer:** B. A dependency required by another dependency.

**Explanation:** Transitive packages are part of the installed program too, so their updates, vulnerabilities, and sources matter.

### 4. What does the caret in a range such as ^2.4.0 generally communicate?

A. Only version 2.4.0 is allowed  
B. A compatible range is allowed according to semantic versioning rules  
C. Any package version, including all future major versions, is allowed  
D. The package is signed

**Answer:** B. A compatible range is allowed according to semantic versioning rules.

**Explanation:** A range is a version constraint, not a security claim. Its exact behavior has details, especially for zero-major versions and prereleases.

### 5. Why does an exact version for one direct dependency not freeze the full tree?

A. It cannot be recorded in a manifest  
B. That package may itself depend on ranged versions of other packages  
C. npm ignores exact versions  
D. It disables the lockfile

**Answer:** B. That package may itself depend on ranged versions of other packages.

**Explanation:** The lockfile records the selected versions through the transitive tree. An exact top-level version alone is not a complete resolution.

### 6. Which statement about npm ci is correct?

A. It updates package.json to the newest versions  
B. It installs from the lockfile and fails when the manifest and lockfile disagree  
C. It is used to add one package interactively  
D. It always runs without removing node_modules

**Answer:** B. It installs from the lockfile and fails when the manifest and lockfile disagree.

**Explanation:** npm ci is intended for clean, reproducible installs. It does not rewrite the manifest or lockfile and removes an existing node_modules directory before installation.

### 7. What should happen after a deliberate npm install changes dependencies?

A. Review and usually commit the manifest and lockfile changes together  
B. Delete the lockfile before review  
C. Ignore the lockfile because npm generated it  
D. Commit node_modules instead

**Answer:** A. Review and usually commit the manifest and lockfile changes together.

**Explanation:** The manifest records requirements and the lockfile records resolution. Reviewing both helps explain what changed in the dependency tree.

### 8. What does npm audit primarily report?

A. Every possible malicious behavior in dependencies  
B. Known vulnerability information available to the configured audit service  
C. Whether an application has no security bugs  
D. Whether every license is acceptable to the project

**Answer:** B. Known vulnerability information available to the configured audit service.

**Explanation:** Audit reports are useful but incomplete and time-dependent. A clean report does not prove that packages or application code are safe.

### 9. What can package provenance help establish?

A. That a package contains no malicious behavior  
B. A verifiable relationship between a package artifact, source, and build process  
C. That every dependency is up to date  
D. That a package has no transitive dependencies

**Answer:** B. A verifiable relationship between a package artifact, source, and build process.

**Explanation:** Provenance provides evidence about where and how a package was produced. It does not guarantee that its source is benign or bug-free.

### 10. What is a careful use of npm --ignore-scripts?

A. Apply it universally without checking packages  
B. Use it when the project can support installs without lifecycle scripts, after reviewing build requirements  
C. Use it to verify registry signatures  
D. Use it to remove transitive dependencies

**Answer:** B. Use it when the project can support installs without lifecycle scripts, after reviewing build requirements.

**Explanation:** Lifecycle scripts may be needed by some packages. Disabling them can reduce one execution path, but may also break required package setup.

## Short-answer questions

### 11. Why should an application commit its lockfile?

**Answer:** So teammates, automation, and deployments can install the same resolved dependency tree and review dependency changes over time.

**Explanation:** A manifest range alone can resolve to different transitive versions later. The lockfile records the selected tree.

### 12. What is the difference between npm install and npm ci for routine project installs?

**Answer:** npm install can resolve or update the local tree and lockfile. npm ci performs a clean install from the existing lockfile and fails on a manifest-lock mismatch.

**Explanation:** Use npm install when deliberately changing dependencies. Use npm ci when verifying or building from the committed resolution.

### 13. Why should developers avoid hand-editing resolved versions in a lockfile?

**Answer:** The lockfile contains related resolution and integrity data that can become inconsistent when edited manually.

**Explanation:** Let the package manager update its lockfile format, then review the resulting diff instead of forcing individual fields.

### 14. What is a lockfile integrity value intended to help with?

**Answer:** It helps verify that the downloaded package content matches the expected artifact recorded for that resolution.

**Explanation:** It does not assess whether the artifact itself is safe or whether the package maintainer is trustworthy.

### 15. Give two checks to make before adding a package.

**Answer:** Confirm the exact package name and registry, then review its purpose, maintenance, source, release history, license, and dependency tree.

**Explanation:** A plausible name or high download count is not sufficient evidence. The package becomes code that the application may execute.

### 16. Why are install lifecycle scripts a supply-chain concern?

**Answer:** They can run commands during installation with the permissions of the installing process.

**Explanation:** A compromised package or maintainer could use those permissions. Limit credentials and machine access during installs.

### 17. What limitation does an audit report have?

**Answer:** It reports issues known to the configured vulnerability data source at the time of the scan, not every possible malicious behavior or application defect.

**Explanation:** Audits support review. They do not replace source inspection, dependency review, or application security practices.

### 18. What should be reviewed before accepting an automatic audit fix?

**Answer:** Review the manifest and lockfile changes, compatibility impact, dependency updates, and the project's existing checks.

**Explanation:** A fix can change more than one package. Force options may allow major changes that need code updates.

### 19. Why is it risky to expose deployment secrets to a dependency installation job?

**Answer:** Install-time package code may run with the job's permissions and could access available credentials.

**Explanation:** Separate jobs and scopes so ordinary or untrusted dependency code does not receive powerful deployment secrets.

### 20. What is dependency confusion?

**Answer:** A resolver obtains a similarly named package from an unintended registry or source instead of the intended private package.

**Explanation:** Explicit registry and scope configuration, careful naming, and lockfile review help reduce this risk.

## Code-reading questions

### 21. What does this declaration allow, in general?

~~~json
{
  "dependencies": {
    "date-library": "^4.2.0"
  }
}
~~~

**Answer:** It declares a direct dependency and permits a semantic version range compatible with 4.2.0 under npm's range rules.

**Explanation:** It does not specify the complete transitive tree. The lockfile records the versions selected for an install.

### 22. Why is this build command useful in continuous integration?

~~~sh
npm ci
~~~

**Answer:** It installs a clean dependency tree from the lockfile and fails if the manifest and lockfile are out of sync.

**Explanation:** This helps automation verify the committed dependency resolution rather than silently creating a new one.

### 23. What is the purpose of the following commands?

~~~sh
npm ls
npm explain some-package
~~~

**Answer:** npm ls displays the installed dependency tree, and npm explain describes why a package is included.

**Explanation:** These commands help identify indirect dependencies, multiple versions, and packages that may no longer be needed.

### 24. What is risky about this script in an update workflow?

~~~sh
npm audit fix --force
~~~

**Answer:** The force option can permit changes outside the declared compatible range, including major version updates.

**Explanation:** It may require application changes or introduce regressions. Review a proposed update and its full diff before accepting it.

### 25. Does this prove that every package in the project is safe?

~~~sh
npm audit
~~~

**Answer:** No.

**Explanation:** It checks for known vulnerabilities in available audit data. It cannot prove the absence of malicious code, unknown issues, or defects in the application.

### 26. What can this command verify, and what can it not prove?

~~~sh
npm audit signatures
~~~

**Answer:** It checks registry signatures and available provenance attestations for installed packages. It cannot prove that their code is harmless.

**Explanation:** A valid signature or attestation helps with artifact identity and origin, while code safety still needs assessment.

### 27. What is the likely problem with these repository files?

~~~text
package-lock.json
pnpm-lock.yaml
yarn.lock
~~~

**Answer:** They may represent competing resolutions if the project has no intentional policy for using multiple package managers.

**Explanation:** Pick the package manager used by the project and follow its lockfile model so contributors do not accidentally resolve different trees.

### 28. Why can this install run package code?

~~~sh
npm install some-package
~~~

**Answer:** Package installation may run lifecycle scripts declared by packages in the dependency tree.

**Explanation:** Review packages and run installs with appropriately limited permissions. Do not assume installation only copies inert files.

### 29. What is missing from this dependency update?

~~~text
package.json changed
package-lock.json not committed
~~~

**Answer:** The resolved dependency tree was not recorded with the manifest change.

**Explanation:** Another clean install may resolve a different tree. Commit and review the manifest and lockfile together.

### 30. Why should this not be used as an automatic fix for every lockfile conflict?

~~~sh
rm package-lock.json
npm install
~~~

**Answer:** It discards the existing resolution and can create a broad, difficult-to-review dependency update.

**Explanation:** First understand which dependency choices should remain, resolve the conflict deliberately, then inspect the resulting tree and lockfile diff.

## Practical and applied questions

### 31. A developer adds a package with a name one letter away from a popular library. What should the reviewer do?

**Answer:** Verify the intended package name, registry, owner, source, release history, and purpose before approving it.

**Explanation:** Typosquatting uses lookalike names. A lockfile can consistently install the wrong package if the initial package choice was wrong.

### 32. A pull request updates one direct package but changes dozens of transitive packages. What should the reviewer inspect?

**Answer:** Inspect the full lockfile diff, identify why each group changed, check package sources and versions, and review vulnerability or license concerns.

**Explanation:** One manifest change can alter much of the transitive graph. The diff is part of the change and should be understandable.

### 33. An npm clean install fails because package.json and package-lock.json disagree. What is the right next step?

**Answer:** Inspect the recent dependency edits, determine the intended requirement, then use the package manager to produce a consistent lockfile and review the result.

**Explanation:** The failure is a useful signal that the committed project state is inconsistent. Do not delete the lockfile blindly.

### 34. A package's postinstall script needs to compile a native addon. Should the team simply disable all scripts?

**Answer:** Not without checking the build requirements. The team should assess the script and package, then use a controlled install environment and only disable scripts if the application can still build correctly.

**Explanation:** Script blocking can reduce risk, but some packages rely on scripts. Security controls must be compatible with the actual dependency workflow.

### 35. A dependency audit reports a high-severity issue in an unused development tool. Should it be ignored automatically?

**Answer:** No. Determine whether it is reachable in the relevant environment, whether a fix exists, and how it affects the project's risk policy. Remove the tool if it is no longer needed.

**Explanation:** Runtime exposure and dependency role inform priority, but a development package can still run in developer or CI environments.

### 36. An automated fix proposes a major-version update. What should happen before merging?

**Answer:** Review the release changes and lockfile diff, update application code if needed, run the project's established checks, and document the reason for the change.

**Explanation:** A major update may be incompatible. A passing vulnerability scan alone does not establish that the application still works.

### 37. A package has valid provenance but an unexpected install script. What should the team conclude?

**Answer:** Provenance gives evidence about the artifact's origin and build, but the script still requires review.

**Explanation:** Traceability is not a safety guarantee. Examine what the package does and what permissions its install receives.

### 38. How should a project protect deployment credentials in CI?

**Answer:** Limit credentials to deployment jobs, use the narrowest scope and lifetime available, and do not expose them to untrusted pull request code or package install steps.

**Explanation:** Dependency code may execute during installs. A compromised package should not automatically gain release credentials.

### 39. The team wants to use both npm and pnpm locally. What project decision is needed?

**Answer:** Decide which package manager and lockfile define the project's official dependency resolution, or document a tested multi-manager policy.

**Explanation:** Without a deliberate rule, contributors can create competing lockfiles and different dependency trees.

### 40. What should a reviewer ask before approving any new dependency?

**Answer:** Is it needed, is the exact package intended, is it maintained and licensed acceptably, what else does it install, what code runs during install, and how will updates be reviewed?

**Explanation:** Dependency review considers both the package itself and the code and operational risk it brings into the project.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [137 - Error handling, reliability, and application security](137-error-handling-reliability-and-application-security.md) | [Lesson](../lessons/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) · [Q&A](138-dependency-hygiene-lockfiles-and-software-supply-chain.md) · [Example](../examples/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [139 - Performance analysis, memory leaks, and optimization](139-performance-analysis-memory-leaks-and-optimization.md) |
