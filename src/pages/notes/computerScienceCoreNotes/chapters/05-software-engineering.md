# 05. Software Engineering

Requirements, design, testing, collaboration, and maintainable software delivery.

Software Engineering

At-a-glance revision notes for SDLC, Agile, Scrum, Git workflows, testing, CI/CD, reviews, docs, and technical debt.

Collapse

Scan the "At a glance" bullets first. Use examples to lock the idea into memory.

SDLC models

Quick revision points and beginner examples

At a glance

- SDLC is the step-by-step process to build and maintain software.

- Different models fit different risk levels and project clarity.

- Pick model based on uncertainty, compliance needs, and speed.

What is SDLC

SDLC stands for Software Development Life Cycle.

It describes how a product moves from idea to development, testing, release, and maintenance.

A clear SDLC reduces chaos and makes delivery predictable.

Typical phases

- Requirements - What problem to solve

- Design - How to solve it

- Implementation - Build it

- Testing - Verify it

- Deployment - Release it

- Maintenance - Fix and improve

Common SDLC models

Waterfall: linear phases. Good when requirements are stable and compliance-heavy.

Iterative: build in repeated cycles, learn, improve.

Incremental: deliver feature chunks over time.

Spiral: iterative with strong risk analysis each cycle.

When to use

- Waterfall - government or compliance projects with fixed scope

- Iterative - product development with changing requirements

- Spiral - high risk systems like safety or financial systems

Model quick compare

Waterfall

Simple planning, slower feedback, expensive changes later.

Iterative

Fast feedback, improves over cycles, needs good planning discipline.

Incremental

Ship in parts, reduces risk, requires solid integration strategy.

Spiral

Risk-first approach, good for complex systems, heavier process.

Agile

Quick revision points and beginner examples

At a glance

- Agile is a mindset for fast feedback and continuous improvement.

- Deliver small increments, learn from users, and adapt quickly.

- Works best when requirements evolve and teams collaborate closely.

Agile basics

Agile focuses on short cycles, frequent delivery, and reacting to change instead of rigid long-term plans.

Agile is not just meetings. It is about measurable delivery and feedback loops.

Example

- Instead of planning 6 months and launching once, ship every 1 to 2 weeks and improve using real user feedback.

Key Agile ideas

Small batches: deliver small features quickly.

Transparency: everyone knows progress and blockers.

Continuous improvement: regularly improve process and code.

Quick mental model

- Agile is like steering a bike with frequent small corrections, not like steering a ship with one huge turn.

Scrum

Quick revision points and beginner examples

At a glance

- Scrum is a popular Agile framework with sprints and roles.

- Sprints are short fixed-time cycles with a clear goal.

- Daily sync keeps blockers visible and progress real.

Scrum roles

Product Owner: owns priority and product direction.

Scrum Master: removes blockers and protects process.

Development Team: builds and delivers increment.

Simple example

- PO says: build login first.

- Team estimates and commits to sprint goal.

- Scrum Master helps remove dependency or delay.

Scrum events

Sprint planning: choose work for sprint.

Daily scrum: short daily sync.

Sprint review: demo what is done.

Sprint retrospective: improve the process.

Why it works

- Because it forces regular delivery and honest reflection.

Scrum terms

Sprint

Fixed time box, often 1 to 2 weeks, focused delivery window.

Backlog

Ordered list of work items.

Increment

Potentially shippable output at sprint end.

Definition of Done

Clear checklist for when work is considered complete.

Version control

Quick revision points and beginner examples

At a glance

- Version control tracks changes and enables safe collaboration.

- Branches allow parallel work without breaking main line.

- Good commit history reduces debugging pain later.

Why version control matters

It keeps a history of changes, so you can roll back mistakes and understand what changed.

It supports collaboration by merging work from multiple people safely.

Example

- A bug appears today. You use git blame and commit history to find the exact change that caused it.

Branching and merging basics

Branch is an isolated line of development.

Merge combines changes from branches.

Pull request is a review step before merging.

Healthy workflow

- main stays stable

- feature branch for each task

- PR review before merge

Testing types

Quick revision points and beginner examples

At a glance

- Testing reduces risk and increases confidence in changes.

- Different tests catch different failures at different cost.

- Aim for fast feedback with unit tests, plus coverage with integration tests.

Testing overview

Testing verifies expected behavior and prevents regressions.

A good test strategy balances speed, coverage, and maintainability.

Key idea

- Unit tests are fast and cheap.

- End-to-end tests are slow and expensive but catch real user flows.

Common testing types

Unit testing

Test a small function or module in isolation.

Integration testing

Test multiple modules together like API + DB.

End-to-end testing

Test full user flow like login -> checkout.

Regression testing

Ensure old features still work after changes.

Smoke testing

Quick check that the app starts and core paths work.

Performance testing

Measure speed, throughput, latency under load.

Security testing

Check vulnerabilities like injection and auth flaws.

CI/CD basics

Quick revision points and beginner examples

At a glance

- CI means automatically building and testing changes.

- CD means automatically delivering changes to environments.

- Automation reduces human mistakes and speeds delivery.

CI and CD

Continuous Integration means every push triggers build and tests.

Continuous Delivery means changes are always ready to deploy.

Continuous Deployment means changes go live automatically after passing checks.

Example pipeline

- push to repo

- run lint + tests

- build

- deploy to staging

- optional approval

- deploy to production

Why CI/CD matters

It catches bugs early, reduces integration problems, and speeds release cycles.

It also enforces consistent checks across the team.

Real-world win

- Without CI, bugs pile up and integration becomes painful near release time.

Code reviews

Quick revision points and beginner examples

At a glance

- Code reviews improve quality and reduce bugs.

- They are also knowledge sharing and consistency enforcement.

- Best reviews focus on correctness, readability, and maintainability.

What to check in a review

Correctness: does it do what it claims.

Edge cases: nulls, errors, retries, timeouts.

Readability: naming, structure, clear intent.

Security: input validation, auth checks.

Performance: avoid accidental O(n^2) and unnecessary calls.

Example comment style

- Instead of saying 'wrong', say 'this can fail when input is empty, add a guard'.

Review anti-patterns

Only style nitpicks and ignoring logic issues.

Huge PRs that are impossible to review properly.

Personal attacks or unclear feedback.

Healthy practice

- Small PRs, clear descriptions, and objective feedback.

Documentation

Quick revision points and beginner examples

At a glance

- Docs reduce onboarding time and prevent repeated mistakes.

- Good docs explain why, not just what.

- Keep docs close to code and update them with changes.

What to document

Setup steps, environment variables, and run commands.

Architecture overview and key decisions.

API contracts and error handling rules.

Deployment steps and rollback strategy.

Example docs

- README for quick start

- ADR for decision logs

- API docs for endpoints and payloads

Common doc mistakes

Docs that go stale because they are not maintained.

Docs that are too long but still miss critical info.

Docs that explain commands but not the reasoning.

Rule

- If docs do not match reality, developers stop trusting them.

Technical debt

Quick revision points and beginner examples

At a glance

- Tech debt is future cost caused by shortcuts today.

- Not all debt is bad if it is planned and paid back.

- Uncontrolled debt slows development and increases bugs.

What is technical debt

Technical debt is the long-term cost of quick fixes, messy architecture, missing tests, or rushed decisions.

It usually shows up as slower delivery, higher bug rate, and fear of changing code.

Example

- Hardcoding values to ship quickly works today, but later every change becomes risky and slow.

How to manage it

Track debt like a backlog item, not like a hidden problem.

Refactor in small steps, with tests.

Set a rule: every sprint allocate time to pay debt.

Simple tactic

- When you touch a messy file, improve one small part while keeping behavior same.

Quick warning signs

- Developers avoid touching certain files.

- Build times and deploy times keep increasing.

- Small changes break unrelated features.

- Same bugs keep coming back.

Interview tip - Talk like an engineer. Mention trade-offs like speed vs safety, quality vs time, and automation vs manual risk.
