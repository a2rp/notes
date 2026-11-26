# 03. Database Management Systems

Relational data, transactions, indexes, and database design.

DBMS

At-a-glance revision notes for DBMS fundamentals - models, SQL, normalization, transactions, indexing, and optimization.

Collapse

Start with "At a glance", then read examples. This is designed for quick revision before interviews.

Fundamentals

Quick revision and beginner intuition

At a glance

- DBMS stores data safely and lets you query it efficiently.

- A database is the data, DBMS is the software managing it.

- ACID makes transactions reliable even with failures.

What is DBMS

DBMS stands for Database Management System. It is software that stores data, organizes it, and provides a safe way to read and write it.

It handles data consistency, security, backup, concurrency, and performance so apps do not reinvent these problems.

Example

- A shopping app uses a DBMS to store users, products, orders, and payments.

- DBMS ensures two users can place orders at the same time without corrupting stock counts.

Types of databases

Databases can be relational or non-relational depending on how they store and query data.

Each type is good for certain workloads and trade-offs.

Common types

- Relational (SQL): tables, strict schema, strong consistency

- Document: JSON-like documents, flexible schema

- Key-Value: fast lookups by key

- Columnar: analytics and reporting

- Graph: relationships and traversals

ACID properties

ACID describes reliability rules for transactions.

Transactions are groups of operations that should behave like one unit of work.

ACID in one line each

- Atomicity: all-or-nothing

- Consistency: rules remain true

- Isolation: transactions do not break each other

- Durability: committed data survives crashes

Data Models

Quick revision and beginner intuition

At a glance

- Relational model stores data in tables with rows and columns.

- ER model is a design tool to plan tables and relationships.

- Modeling decides clarity and future flexibility.

Relational model

Data is stored in relations (tables). Rows are records, columns are attributes.

Relationships are represented using keys and constraints.

Example

- Users(id, name)

- Orders(id, userId, total)

- Orders.userId references Users.id

ER model

ER model stands for Entity-Relationship model.

It is used during design to map entities, attributes, and relationships before writing SQL tables.

Example

- Entity: Student

- Entity: Course

- Relationship: Student enrolls in Course

SQL

Quick revision and beginner intuition

At a glance

- DDL defines structure, DML manipulates data.

- Joins combine rows from multiple tables.

- Indexes speed reads but cost extra writes and storage.

Beginner join intuition

- INNER JOIN returns only matches.

- LEFT JOIN returns all left rows and matches from right, missing becomes NULL.

- Most real bugs come from wrong join key or missing indexes on join columns.

SQL essentials

DDL

Data Definition Language. Used to create or change schema. Example: CREATE, ALTER, DROP.

DML

Data Manipulation Language. Used to read and modify data. Example: SELECT, INSERT, UPDATE, DELETE.

Joins

Combine rows across tables using a condition. Common: INNER, LEFT, RIGHT, FULL (DB dependent).

Indexes

Extra data structure to speed up reads. Great for WHERE and JOIN keys.

Constraints

Rules to keep data valid. Examples: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK.

Normalization

Quick revision and beginner intuition

At a glance

- Normalization reduces redundancy and update bugs.

- It splits tables so one fact lives in one place.

- BCNF is a stronger form of 3NF.

Quick example

- Bad: Orders(orderId, userName, userPhone, total)

- Better: Users(userId, name, phone) and Orders(orderId, userId, total)

- Now updating phone happens in one place only.

Normal forms

1NF

Atomic values. No repeating groups. Each cell holds a single value.

2NF

No partial dependency on a composite key. Every non-key depends on full key.

3NF

No transitive dependency. Non-key should not depend on another non-key.

BCNF

For every dependency X -> Y, X should be a super key. Stronger than 3NF.

Transactions

Quick revision and beginner intuition

At a glance

- Isolation decides how much transactions can see each other.

- Locking prevents conflicts but can reduce concurrency.

- Deadlocks happen when locks form a cycle.

Practical deadlock reduction

- Lock rows in a consistent order in all code paths.

- Keep transactions short, do not hold locks while calling external services.

- Use proper indexes so queries lock fewer rows.

Transaction building blocks

Isolation levels

Rules for visibility between transactions. Lower isolation is faster but can show anomalies.

Locking

Shared locks for reads, exclusive locks for writes. Used to protect data correctness.

Deadlock

Two transactions each wait for a lock held by the other. DB detects and aborts one.

Indexing

Quick revision and beginner intuition

At a glance

- Indexes trade storage and write cost for faster reads.

- B Tree and B+ Tree handle range queries well.

- Hash indexing is great for exact match lookups.

Index intuition

- WHERE email = 'x' benefits from hash or B+ tree.

- WHERE createdAt BETWEEN ... benefits strongly from B+ tree.

- Too many indexes make writes slower because DB must update all indexes on insert or update.

Index types

B Tree

Balanced tree. Good general-purpose index structure. Supports range queries.

B+ Tree

Leaf nodes contain sorted data pointers and are linked. Very efficient for range scans.

Hash indexing

Fast equality lookups like key = value. Not ideal for range queries like BETWEEN.

Query Optimization

Quick revision and beginner intuition

At a glance

- DB chooses a plan to execute SQL efficiently.

- Execution plan shows how DB will scan, join, and filter.

- Cost estimation picks the cheapest plan based on stats.

Beginner debugging steps

- Check if WHERE and JOIN columns are indexed.

- Avoid SELECT * in heavy queries.

- Look for full table scans on big tables.

- Reduce rows early using filters before joins.

Optimization basics

Execution plan

Step-by-step strategy DB uses. Examples: index scan, full table scan, hash join, nested loop.

Cost estimation

DB guesses runtime cost using table size, indexes, and statistics to choose the best plan.

Interview tip - Always connect DBMS answers to trade-offs like consistency vs availability, indexes vs write cost, and isolation vs performance.
