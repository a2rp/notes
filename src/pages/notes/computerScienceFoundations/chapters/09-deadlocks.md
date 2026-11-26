# 09. Deadlocks

Deadlock conditions, prevention, avoidance, and recovery.

Deadlock

Deadlock is a situation where two or more processes or threads are stuck forever because each one is waiting for a resource held by another. Nobody can move, so the system becomes stuck.

Locks and resources Circular waiting System stuck Prevent and avoid

Deadlock

Click to collapse with clear terms, conditions, and fixes

### Meaning in simple words

A deadlock happens when work cannot continue because each worker is waiting for something another worker will not release.

Real life analogy

Two people enter a narrow hallway from opposite sides and both refuse to step back. Nobody can pass.

In software

Two threads each hold one lock and both wait for the other lock. Both threads freeze forever.

### Classic deadlock example (two locks)

Locks are used to protect shared data. But if locks are taken in the wrong order, you can create a circular wait.

Example



```text
Thread 1:
lock(A)
lock(B)  - waits because Thread 2 has B

Thread 2:
lock(B)
lock(A)  - waits because Thread 1 has A

Both threads wait forever - deadlock
```



What is the problem?

Thread 1 holds A and wants B. Thread 2 holds B and wants A. No one can continue.

### Four conditions for deadlock (must all hold)

Deadlock is not random. It happens only if these four conditions are true at the same time. These are called the Coffman conditions.

1 Mutual exclusion

At least one resource can be used by only one thread at a time.
Example - a lock.

2 Hold and wait

A thread holds one resource and waits for another.
Example - holds A, waits for B.

3 No preemption

Resources cannot be forcibly taken away. Only the owner releases them.

4 Circular wait

A cycle exists.
Thread 1 waits for Thread 2 and Thread 2 waits for Thread 1.

If you break any one condition, deadlock cannot happen.

### How to prevent deadlock (practical methods)

Lock ordering (most common)

Always acquire locks in the same order everywhere.
Example - always lock A then B.

Example rule



```text
Rule:
If you need locks A and B, always lock A first, then lock B.

Thread 1: lock(A) then lock(B)
Thread 2: lock(A) then lock(B)

No circular wait - no deadlock
```



Timeout and retry

Try to acquire lock. If not possible within time, release what you have and retry later.

Useful when you cannot enforce a strict order.

Avoid holding locks during I O

I O operations can block for long time. If you hold locks while doing I O, you increase the chance of long waiting chains.

Minimize shared state

Less shared state means fewer locks. Fewer locks means fewer deadlocks.

### Deadlock vs starvation (very important)

People confuse these two. They are different.

Deadlock

Everyone in the cycle is stuck. Progress stops forever.

Starvation

One thread keeps getting denied resources because others keep winning.

Livelock

Threads keep changing state but still no progress, like endless retry loops.

### Full forms and key terms

OS - Operating System

CPU - Central Processing Unit

I O - Input Output

Mutex - Mutual exclusion lock

Lock order - A fixed rule for acquiring locks

Deadlock prevention is mostly about being disciplined with locks - lock order, short lock duration, and avoiding I O inside locks.

### Mini practice

Q Which Coffman condition does "lock ordering" break?

A It breaks circular wait because a cycle cannot form if everyone follows the same order.

Q Why is holding a lock during I O risky?

A Because I O can block for long time, increasing waiting chains and raising deadlock chances.

### Interview lines (simple and strong)

- "Deadlock happens when threads wait forever due to a circular wait of locks."

- "Deadlock requires all four Coffman conditions. Break any one to prevent it."

- "The most common prevention is consistent lock ordering."

### Next related topics

Locking and synchronization

Isolation levels in DBMS

Concurrency patterns

Scheduling and starvation
