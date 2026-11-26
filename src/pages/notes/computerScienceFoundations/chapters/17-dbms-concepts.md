# 17. DBMS Concepts

Core database structures, queries, transactions, and constraints.

DBMS Concepts

A DBMS (Database Management System) is software that stores data safely and helps you query and update it efficiently. The key ideas are correctness (ACID), concurrency (transactions, locks), and speed (indexes).

ACID Transactions Indexing Normalization Isolation and locking

DBMS Concepts

Click to collapse with beginner explanations and examples

### What a DBMS solves in real life

Without a DBMS, your data can get corrupted when multiple users update at the same time, queries can become slow as data grows, and crashes can cause lost updates.
DBMS gives you safe storage, fast querying, and controlled concurrency.

Example product

An ecommerce app needs correct stock counts. If two customers buy the last item at the same time, DBMS prevents negative stock.

Example banking

Money transfer must be correct. If the server crashes mid transfer, you cannot lose or duplicate money.

### Transactions

A **transaction** is a group of queries that must be treated as one unit. It either fully completes or does not apply at all.

Example - bank transfer



```text
Transaction:
1) deduct 500 from A
2) add 500 to B

If step 1 succeeds but step 2 fails, the transaction must roll back.
So the final state stays correct.
```



Simple rule

Use a transaction when multiple updates must stay consistent together.

### ACID properties

ACID are the guarantees provided by most relational databases during transactions.
ACID stands for Atomicity, Consistency, Isolation, Durability.

Atomicity

All or nothing. A transaction is fully applied or fully rolled back.

Consistency

Rules remain true. Constraints and invariants are not broken.

Isolation

Concurrent transactions do not corrupt each other. Results look like one after another.

Durability

Once committed, data survives crashes.

ACID in one example



```text
Order placement:
- Reduce stock
- Create order row
- Create payment row

Atomicity: either all three happen or none happen
Consistency: stock cannot go below 0
Isolation: two users do not buy the same last unit
Durability: after commit, crash will not remove the order
```



### Indexing

An **index** is a data structure that makes reads faster by helping the DB jump to matching rows instead of scanning everything.
Most common index type is a B tree (balanced tree).

Without index

Full table scan. Check every row. Slow on large tables.

With index

Jump directly to matching rows. Much faster for lookups and filtering.

Trade-off

Indexes speed up reads but add extra cost on writes because indexes also must be updated.

Example intuition



```text
users table with 10 million rows

Query:
SELECT * FROM users WHERE email = "x@y.com"

With index on email:
- find key fast
- fetch row fast

Without index:
- scan all rows until match is found
```



### Normalization

Normalization is a way to design tables to reduce duplication and avoid update bugs. It usually means splitting data into related tables and linking with keys.

Why it exists

If the same data is repeated in many places, updates become risky and inconsistent.

Common outcome

Separate entities into separate tables like users, orders, products, payments.

Example - avoid duplicate user info



```text
Bad design:
orders table stores customerName and customerPhone in every row

Problem:
If phone changes, you must update many rows

Better design:
users table stores name and phone once
orders table stores userId
Join when needed
```



### Isolation levels (beginner view)

Isolation decides how much one transaction can "see" the uncommitted work of another. Lower isolation means more concurrency but more anomalies.

Read Uncommitted

Can see uncommitted changes. Risky. Dirty reads possible.

Read Committed

Only sees committed changes. Common default in many systems.

Repeatable Read

Same row reads stay stable inside a transaction.

Serializable

Strongest. Behaves like transactions ran one by one.

Dirty read example



```text
T1 updates balance to 0 but does not commit yet
T2 reads balance as 0
T1 rolls back
Now T2 used a value that never actually happened -> dirty read
```



### Locking

Locks prevent unsafe concurrent updates. A lock controls access to a row or range so two transactions do not write conflicting data.

Shared lock

Multiple readers allowed. Writers blocked.

Exclusive lock

Only one writer. Readers and writers blocked.

Watch out

Locks can reduce concurrency and can also lead to deadlocks if acquired in different orders.

Example



```text
Two transactions update same row:

T1: lock row 101, update, commit
T2: waits for lock, then updates, commit

This prevents lost updates.
```



### Full forms and key terms

DBMS - Database Management System

ACID - Atomicity, Consistency, Isolation, Durability

SQL - Structured Query Language

B tree - Balanced tree used for indexes

T1 T2 - Transaction 1 Transaction 2

DBMS topics show up everywhere in backend interviews because they explain correctness under concurrency, and performance at scale.

### Mini practice

Q Why do indexes slow down writes?

A Because every insert, update, delete must also update the index structure.

Q What does Atomicity guarantee?

A A transaction is all or nothing. No partial updates remain.

### How to say it in interviews

- "A transaction groups multiple queries into one unit that commits or rolls back."

- "ACID guarantees correctness. Isolation controls anomalies under concurrency."

- "Indexes speed up reads but cost extra on writes because the index must be updated."

- "Normalization reduces duplication and avoids update anomalies."

### Next topics

Transactions and isolation (deep)

Index types and query planning

Locking, deadlocks, and MVCC

Normal forms and practical schema design
