# 20. Transaction Isolation Levels

How isolation levels manage concurrent reads and writes.

Isolation levels

Isolation levels control how much one transaction can see the changes made by other concurrent transactions. They decide correctness vs performance trade-offs in a DBMS (Database Management System).

Concurrency control Locks or MVCC Correctness vs performance Transaction safety

Isolation levels

Click to collapse with clear anomalies and examples

### Meaning

In a database, many users do things at the same time. A **transaction** is one logical unit of work, like transfer money or place order .
Isolation decides what happens when two transactions run concurrently.

Goal of isolation

Make concurrent transactions behave as if they ran one by one, or close to it.

Trade-off

More isolation means fewer anomalies, but can reduce concurrency and throughput.

### Common anomalies you must know

Dirty read

You read data written by another transaction that has not committed yet. If it rolls back, you saw something that never happened.

Non-repeatable read

You read the same row twice and get different values because another committed update happened in between.

Phantom read

You run the same range query twice and the set of rows changes because another transaction inserted or deleted matching rows.

Quick mental example



```text
You: "Show all unpaid invoices over 10,000"
- You run query, get 3 rows

Another transaction inserts a new unpaid invoice of 12,000 and commits

You run same query again
- Now you get 4 rows

That new row is a phantom
```



### The 4 isolation levels

These levels are usually listed from weakest to strongest. Stronger levels prevent more anomalies.

Read Uncommitted

Allows dirty reads. Fast, but unsafe for most real apps.

Dirty read possible Non-repeatable possible Phantom possible

Read Committed

Prevents dirty reads. You only see committed data. Still allows non-repeatable reads and phantoms.

Dirty read blocked Non-repeatable possible Phantom possible

Repeatable Read

If you read a row, you will keep seeing the same value for that row during the transaction. Phantom reads may still happen depending on the DB implementation.

Dirty read blocked Non-repeatable blocked Phantom depends

Serializable

Strongest. Transactions behave like they ran one by one (serial order). Prevents dirty reads, non-repeatable reads, and phantom reads. Can reduce concurrency.

Dirty read blocked Non-repeatable blocked Phantom blocked

Most common default

Many systems use Read Committed as a default because it is a good balance for typical OLTP workloads (Online Transaction Processing).

### How databases implement isolation

Isolation can be achieved using locks, or MVCC (Multi Version Concurrency Control), or a mix. The exact behavior can differ between databases.

Locks

Prevent other transactions from reading or writing certain rows until you commit or rollback. Safer but can block.

MVCC

Readers see a consistent snapshot while writers create new versions. More concurrency, but complexity.

Example you can remember



```text
Transaction T1 starts
- reads balance = 100

Transaction T2 updates balance to 120 and commits

Under Read Committed
- if T1 reads again, it can see 120

Under Repeatable Read (snapshot style)
- T1 keeps seeing 100 for that row until it ends
```



### Full forms and key terms

DBMS - Database Management System

ACID - Atomicity Consistency Isolation Durability

MVCC - Multi Version Concurrency Control

OLTP - Online Transaction Processing

T1 - Transaction 1

T2 - Transaction 2

Isolation level is not just theory. It decides bugs like double charges, wrong balances, and inconsistent reports.

### Mini practice

Q Which isolation level prevents dirty reads?

A Read Committed and above.

Q What is a phantom read in one line?

A Same query returns different set of rows because of concurrent insert or delete.

Q Which level is strongest?

A Serializable.

### How to say it in interviews

- "Isolation levels define visibility of concurrent changes between transactions."

- "Read Committed blocks dirty reads but allows non-repeatable reads and phantoms."

- "Repeatable Read guarantees stable reads for the same row, phantoms depend on DB."

- "Serializable makes transactions behave as if executed one by one, but reduces concurrency."
