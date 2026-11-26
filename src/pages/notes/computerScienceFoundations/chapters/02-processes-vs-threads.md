# 02. Processes vs Threads

How processes and threads differ in memory, execution, and coordination.

Process vs thread

A process is a running program with its own memory and resources. A thread is a smaller execution unit inside a process. Threads share the process memory, but each thread has its own stack and CPU state.

Process - isolated Thread - shared memory Runs on CPU Separate stack per thread

Process vs Thread

Click to collapse with clear terms and examples

### Simple meaning

Process

A running program.
- own memory space
- own resources (files, sockets)
- safer isolation

Thread

A worker inside a process.
- shares process memory
- has its own stack
- needs sync for shared data

Analogy

Process is a house. Threads are people working inside the same house. People share the kitchen (shared memory), but each person has their own backpack (stack).

### What is shared and what is separate

Process

Memory Separate address space

Crash One process crash usually does not crash others

Creation Heavier, slower than threads

Switch Context switch cost is higher

Thread

Memory Shared heap and globals

Crash Thread crash can kill the whole process

Creation Lightweight and faster

Switch Usually cheaper than processes

Shared memory is powerful, but it can create race conditions if two threads update the same data at the same time.

### Why each thread has its own stack

A **stack** stores function call frames: local variables, return addresses, and temporary values.
If threads shared a single stack, function calls would overwrite each other and everything would break.

Example (why separate stacks matter)



```text
Thread 1 calls: handleRequest()
- local vars: userId, token

Thread 2 calls: renderUI()
- local vars: width, height

If both used one shared stack:
Thread 2 would overwrite Thread 1 local vars
So each thread must have its own stack
```



### Synchronization (locks) - why needed

Because threads share memory, they can update the same variable at the same time.
A **lock** (mutex) forces only one thread to enter a critical section at a time.

Race condition

Output depends on timing. The bug appears randomly.

Critical section

Code that reads or writes shared data.

Example race (bank balance)



```text
balance = 100

Thread A: withdraw 60
- reads balance (100)
- computes new balance (40)
- writes balance (40)

Thread B: withdraw 60
- reads balance (100)
- computes new balance (40)
- writes balance (40)

Final balance becomes 40
But correct result should be -20 or block the second withdraw
This happened because both read the same old value
```



Lock ordering matters

Incorrect lock order can cause deadlock. One common rule is: always lock A then B, in every place in your codebase.

### Real world examples (what uses what)

Browser tabs

Often separate processes for isolation. One tab crash should not kill the whole browser.

Web server

Can use threads to handle many requests inside one process for speed.

Node.js

Single main thread event loop, but uses background threads for some tasks via libuv.

Tiny example (request handling)



```text
Approach A: Process per request
- safer isolation
- heavy and slower

Approach B: Thread per request
- faster creation
- must handle shared memory with locks

Approach C: Event loop (single thread)
- avoids locks for most user code
- relies on async I O and callbacks
```



### Quick decision guide

Use processes When isolation and safety matter, or when you want separate memory per task.

Use threads When you need parallel work inside one program and shared data is helpful.

In interviews, always mention trade-off: processes are safer but heavier, threads are faster but need synchronization.

### Full forms and key terms

OS - Operating System

CPU - Central Processing Unit

RAM - Random Access Memory

PCB - Process Control Block

TCB - Thread Control Block

I O - Input Output

Mutex - Mutual Exclusion lock

### Mini practice

Q Why are threads usually faster than processes?

A Because they share the same address space, so creation and switching usually needs less setup and less memory mapping work.

Q Why do threads need locks?

A Because shared memory can be updated by multiple threads at the same time, causing race conditions and corrupted data.

### Interview lines

"Process has its own address space, thread shares process memory but has its own stack."

"Processes are safer but heavier, threads are faster but require synchronization."
