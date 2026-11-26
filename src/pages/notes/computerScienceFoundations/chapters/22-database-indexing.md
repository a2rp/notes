# 22. Database Indexing

How indexes speed up reads and what they cost to maintain.

Indexing

Indexing is a database technique that makes reads faster by keeping a special lookup structure. Without an index, the database often scans many rows. With an index, it can jump near the right rows quickly.

Faster queries Smart lookup Better performance Extra storage

Indexing

Click to collapse with clear terms and real examples

### Meaning

An **index** is like a "table of contents" for your database table. It helps the database find rows quickly without reading every row.

Without index

Database performs a full scan (checks many rows) to find matches.

With index

Database uses the index to jump near the matching rows fast.

### Classic analogy - book vs page scanning

Searching for a topic in a 500 page book:
- without a table of contents - you scan pages from start
- with a table of contents - you jump to the page number directly

Real query example



```text
users table has 10,000,000 rows

Query:
SELECT * FROM users WHERE email = "ash@example.com";

- Without index on email:
  DB may scan many rows until it finds it

- With index on email:
  DB uses index structure to find the row quickly
```



### What a DB actually stores

In most databases, an index stores:
- the indexed column value
- a pointer (reference) to the row location

Key Value

The column you index, like email or createdAt.

Pointer Row link

A reference to where the full row is stored.

Selectivity Uniqueness

If many rows share the same value, the index is less helpful.

### Common index types

B-Tree

Balanced tree used for range queries and sorting. Very common default in SQL.

Hash index

Great for exact match lookups, not for range queries.

Composite index

Index on multiple columns like (userId, createdAt). Useful for combined filters.

Range queries

If you do queries like "price between 100 and 500", B-Tree indexes are often ideal.

### Trade-offs

Indexing makes reads faster, but it has costs:
- more storage
- slower writes (insert update delete)
- maintenance overhead

Reads

Faster for searches, joins, sorting.

Writes

Slightly slower because indexes also need updates.

Too many indexes is bad

If you index everything, inserts and updates can become slow and storage increases.

### Example - composite index rule

Composite indexes follow a "left prefix" idea. If you create index (userId, createdAt):
- queries filtering by userId work well
- queries filtering only by createdAt may not

Example



```text
Index: (userId, createdAt)

Good:
SELECT * FROM orders
WHERE userId = "u1"
ORDER BY createdAt DESC;

Maybe not good:
SELECT * FROM orders
WHERE createdAt > "2026-01-01";
```



### Full forms and key terms

DB - Database

SQL - Structured Query Language

B-Tree - Balanced Tree (used for ordered indexes)

CRUD - Create Read Update Delete

IO - Input Output

Indexes are not magic. They are a deliberate trade-off: faster reads in exchange for storage and slower writes.

### Mini practice

Q When is an index most useful?

A When you filter by a column with high uniqueness, like email or userId, and the table is large.

Q Why can indexing slow inserts?

A Because the DB must also insert the new key and update index structures.

### Interview lines

- "An index speeds up reads by reducing full table scans, but adds write overhead."

- "B-Tree indexes support range queries and ordering, hash indexes are best for exact matches."

- "Composite indexes follow left prefix, so column order matters."
