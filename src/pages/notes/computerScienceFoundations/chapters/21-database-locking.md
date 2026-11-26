# 21. Database Locking

Locks, contention, concurrency control, and common lock behavior.

Locking

Locking is a coordination technique to protect shared data when multiple threads or processes run at the same time. A lock ensures only one worker enters a critical section at a time.

Mutual exclusion Protect shared state Prevent race conditions Avoid inconsistent reads

Locking

Click to collapse with beginner explanation and real examples

### Meaning

A **lock** is like a key for a shared room. Only the thread holding the key can enter the room and modify shared data.
The protected code area is called the **critical section**.

When you need locks

- Multiple threads update the same variable

- Shared cache, queue, map, or list

- Bank balance, inventory count, counters

What locks prevent

Race conditions and corrupted state when two threads write at the same time.

### Race condition example

A **race condition** happens when output depends on unpredictable timing of threads.
Example: two threads increment the same counter.

Without lock - wrong result possible



```text
counter = 0

Thread A reads counter -> 0
Thread B reads counter -> 0
Thread A writes counter -> 1
Thread B writes counter -> 1

Expected 2, got 1 -> race condition
```



Why this happens

Increment is not one operation. It is read, add, write. Threads can interleave between these steps.

### With lock - correct result

With a lock, only one thread can enter the critical section at a time.

With lock - safe



```text
lock(L)

Thread A:
- acquire L
- counter = counter + 1
- release L

Thread B:
- waits until L is released
- acquire L
- counter = counter + 1
- release L

Now you get correct counter value
```



Mutual exclusion

Only one thread can be inside the critical section.

Progress

Threads eventually enter, but might wait their turn.

### Common lock types (concept)

Locking shows up in OS, DBMS, and app code. Different locks solve different patterns.

Mutex

Mutual Exclusion lock. One owner at a time.

Semaphore

Allows up to N threads. Useful for limited resources.

Read Write lock

Many readers allowed, only one writer.

Small examples (mental)



```text
Mutex:
- Only 1 thread updates shared counter

Semaphore(3):
- Only 3 threads can access DB connection pool

Read Write lock:
- Many threads can read config
- Only 1 thread can update config
```



### Locking problems

Locks solve correctness, but can introduce new issues if used badly.

Deadlock

Two threads wait forever for each other due to conflicting lock order.

Starvation

A thread waits too long because others keep getting the lock.

Contention

Many threads fight for the same lock, slowing the program.

Priority inversion

Low priority thread holds a lock that a high priority thread needs.

Deadlock example



```text
Thread 1:
- lock(A)
- lock(B) waits

Thread 2:
- lock(B)
- lock(A) waits

Both stuck -> deadlock
```



### Best practices (beginner)

Keep critical section small

Lock only the minimum code that must be protected. This reduces contention.

Use consistent lock order

If you must acquire multiple locks, always acquire them in the same order. This reduces deadlocks.

Avoid locking around I O

Long waiting operations inside a lock block everyone. Do I O outside lock if possible.

Prefer immutability for reads

Read only data structures reduce need for locks in many situations.

### Full forms and key terms

Mutex - Mutual Exclusion

RW - Read Write

I O - Input Output

CS - Critical Section

OS - Operating System

Locks are about correctness first. Performance comes after. Fix correctness, then reduce lock time and contention.

### Mini practice

Q Why is counter++ unsafe in multithreading?

A Because it is read, add, write. Threads can interleave and overwrite updates.

Q What is the simplest deadlock prevention?

A Acquire locks in a consistent global order.
