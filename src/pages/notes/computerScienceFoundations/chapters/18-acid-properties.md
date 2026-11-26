# 18. ACID Properties

Atomicity, consistency, isolation, and durability in database transactions.

ACID

ACID is a set of four properties that guarantee reliable database transactions. It ensures your data remains correct even during crashes, errors, or concurrent access.

Atomicity Consistency Isolation Durability

ACID in DBMS

Click to collapse with proper examples and clear explanation

### What is a Transaction

A **transaction** is a group of database operations treated as a single unit of work.

Bank transfer example



```text
Transfer 100 from Account A to Account B

1. Subtract 100 from A
2. Add 100 to B

Both must succeed together.
If one fails, everything must roll back.
```



### A - Atomicity

Atomicity means "all or nothing". Either the whole transaction completes, or none of it does.

If failure happens

Database performs a rollback to undo partial changes.

Example

If system crashes after subtracting money but before adding it, the subtraction must be undone.

### C - Consistency

Consistency means the database moves from one valid state to another valid state. All constraints must be satisfied.

Example constraint

Account balance cannot be negative.

Example



```text
Before transaction:
Total money in system = 1000

After transfer:
Total money must still be 1000

No money should magically appear or disappear.
```



### I - Isolation

Isolation means multiple transactions running at the same time should not interfere with each other in a harmful way.

Problem without isolation

Dirty reads, lost updates, phantom reads.

Isolation levels

Read Uncommitted, Read Committed, Repeatable Read, Serializable.

Lost update example



```text
Initial balance = 500

Transaction 1 reads 500
Transaction 2 reads 500

T1 adds 100 -> 600
T2 adds 200 -> 700

Final value should be 800 but becomes 700.
Isolation prevents this.
```



### D - Durability

Durability means once a transaction is committed, it will not be lost even if the system crashes.

How achieved

Write Ahead Logging (WAL) and storing data safely on disk.

Example

If power fails after commit, data still exists when system restarts.

### Full Forms and Key Terms

ACID - Atomicity Consistency Isolation Durability

DBMS - Database Management System

WAL - Write Ahead Logging

### How to explain in interview

- Atomicity means all or nothing execution.

- Consistency means constraints remain valid.

- Isolation prevents concurrent corruption.

- Durability ensures committed data survives crashes.

ACID is what makes relational databases reliable for banking, finance, and critical systems.
