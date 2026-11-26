# 23. Database Normalization

Structuring relational tables to reduce duplication and update anomalies.

Normalization

Normalization is a database design method to reduce duplicate data and prevent update bugs. It organizes tables so each fact is stored in the right place, with clear relationships.

Reduce redundancy Avoid anomalies Clean relations Better schema

Normalization

Click to collapse with beginner explanation and examples

### Why normalization exists

When the same information is repeated in many rows, your database becomes harder to maintain. Normalization reduces repetition and prevents common data bugs called anomalies.

Redundancy

Redundancy means storing the same fact multiple times.
Example - saving a customer phone number in every order row.

Goal

Store each fact once, then connect tables using keys.

### The 3 classic anomalies

An anomaly is an unwanted side effect caused by poor table structure.

Update anomaly

Same value exists in many rows. You update one row but miss others.

Insert anomaly

You cannot add a fact without adding unrelated data.

Delete anomaly

Deleting a row removes useful facts accidentally.

Real pain example

If customer address is stored in every order row, updating an address means updating many rows. Missing one row causes inconsistent data.

### Before normalization - single wide table

This table repeats customer data for every order.

Orders table - bad design



```text
orders
- orderId
- customerId
- customerName
- customerPhone
- productId
- productName
- productPrice

Row 1: orderId=101, customerId=1, customerName=Ash, customerPhone=9999...
Row 2: orderId=102, customerId=1, customerName=Ash, customerPhone=9999...
```



Problem

customerName and customerPhone are repeated in every order.

Impact

Updates become risky and slow. Data can drift.

### After normalization - split into related tables

We store customer facts in one table, order facts in another, and connect them using keys.

customers

customerId, name, phone

orders

orderId, customerId, createdAt

orderItems

orderId, productId, qty

Example - normalized schema



```text
customers
- customerId (PK)
- name
- phone

orders
- orderId (PK)
- customerId (FK)
- createdAt

orderItems
- orderId (FK)
- productId (FK)
- qty

PK: Primary Key
FK: Foreign Key
```



Benefit

Update customer phone in one row in customers table. All orders stay consistent automatically.

### Normal forms - beginner view

Normal forms are levels of rules. Most projects target up to 3NF because it gives a clean schema without overcomplication.

1NF Atomic

One cell has one value, no lists. Each row is unique.
Example - do not store "red,blue" in one column.

2NF Full dependency

Non key columns depend on the whole primary key.
Mostly relevant when you have a composite key.

3NF No transitive

Non key columns should not depend on other non key columns.
Example - city and state should not both depend on zipcode in the same table.

Tiny 1NF example



```text
Bad
- studentId
- phones = "9999,8888"

Good
studentPhones
- studentId
- phone
```



### Tradeoff - normalization vs performance

Normalization often increases joins because data is split across tables. Sometimes for read heavy systems, teams use controlled denormalization to speed up reads.

Normalized

Less duplication, fewer anomalies, more joins.

Denormalized

Faster reads, more duplication, more update risk.

Practical rule

Normalize first for correctness. Only denormalize when a real performance bottleneck is proven.

### Full forms and terms

DBMS - Database Management System

NF - Normal Form

1NF - First Normal Form

2NF - Second Normal Form

3NF - Third Normal Form

PK - Primary Key

FK - Foreign Key

Join - Combine rows from multiple tables using keys

Normalization is mainly about correctness and maintainability. It makes your data easier to trust.

### Mini practice

Q Why is storing customerPhone in every order row risky?

A Because updates must be done in many rows. Missing one row creates inconsistent data.

Q What is 1NF in one line?

A Each column value is atomic and does not contain lists.

### How to say it in interviews

- "Normalization reduces redundancy and avoids update, insert, and delete anomalies."

- "1NF means atomic values, 2NF removes partial dependency, 3NF removes transitive dependency."

- "Normalize for correctness first, then denormalize only when a proven bottleneck exists."

### Next related DBMS topics

Indexing and B tree basics

Transactions and ACID

Isolation levels and locking
