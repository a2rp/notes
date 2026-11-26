# 19. Database Transactions

Atomic units of database work, commit, rollback, and failure handling.

Transactions

A transaction is a single unit of work in a database. It groups multiple operations so they either all succeed together or all fail together. This prevents partial updates and keeps data consistent.

Group operations All or nothing Isolation and locking Commit or rollback

Transactions

Click to collapse with clear terms and beginner examples

### Meaning

A transaction is a "safe box" for multiple database operations. It ensures your data is not left half updated if something fails in the middle.

Why transactions exist

- Prevent partial updates when an error happens

- Keep multi step operations consistent

- Protect data when multiple users update at once

Real world analogy

Like sending money between two bank accounts. Either debit and credit both happen, or nothing happens.

### Classic example - transfer

Suppose you transfer 500 from Account A to Account B.
Without a transaction, you can end up with money removed from A but not added to B if the server crashes in between.

Example flow



```text
Start transaction

1) A balance = A balance - 500
2) B balance = B balance + 500

If both succeed -> COMMIT
If anything fails -> ROLLBACK
```



What a crash would do

Transactions protect you from "half done" states. If a crash happens before commit, rollback keeps data unchanged.

### Transaction life cycle

Most databases follow a simple life cycle: begin, do operations, commit or rollback.

BEGIN

Start a new transaction boundary.

READ and WRITE

Queries run inside the transaction.

COMMIT

Make changes permanent.

ROLLBACK

Undo changes made in this transaction.

SQL example



```text
BEGIN;

UPDATE accounts
SET balance = balance - 500
WHERE id = 'A';

UPDATE accounts
SET balance = balance + 500
WHERE id = 'B';

COMMIT;
```



### Commit vs rollback

Commit

Confirms the transaction. Changes are saved and become visible to others.

Rollback

Cancels the transaction. Any changes inside it are undone.

Most real bugs happen when developers forget to commit, forget to rollback on error, or leave transactions open for too long.

### Concurrency - why locking shows up

When multiple users update the same row at the same time, databases use isolation and locks to avoid inconsistent results.

Locking

Locking blocks other transactions from modifying the same data until the lock is released.

Isolation level

Controls how much one transaction can see of another transaction's changes.

Simple conflict example



```text
Transaction 1:
Read balance = 1000
Update balance = 900 (not committed yet)

Transaction 2 at same time:
If it also reads 1000 and updates, final balance can be wrong

Isolation + locks prevent this kind of race condition
```



Practical tip

Keep transactions short. Long transactions hold locks longer and slow down other users.

### Terms and full forms

DBMS - Database Management System

SQL - Structured Query Language

ACID - Atomicity, Consistency, Isolation, Durability

BEGIN - Start of a transaction

COMMIT - Save changes permanently

ROLLBACK - Undo changes in a transaction

### Mini practice

Q Why is "transfer money" a transaction problem?

A Because it has multiple dependent updates. If one update happens and the other fails, the system becomes inconsistent.

Q Why should transactions be short?

A Short transactions release locks quickly, improving concurrency and performance.

### How to say it in interviews

- "A transaction groups operations so they either all succeed (commit) or all fail (rollback)."

- "Transactions protect consistency in multi step updates like money transfer."

- "Concurrency issues are handled using isolation levels and locking."

### Next topics in DBMS

ACID properties (deep)

Isolation levels (deep)

Locking and deadlocks (deep)

Indexing and performance (deep)
