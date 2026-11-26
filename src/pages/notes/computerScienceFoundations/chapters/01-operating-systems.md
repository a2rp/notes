# 01. Operating Systems

Processes, threads, memory, files, and operating-system fundamentals.

Operating Systems

An Operating System (OS) is the core software that manages hardware and runs programs. It controls CPU time, memory, files, and input output (I O), so your apps do not have to talk to hardware directly.

CPU scheduling Memory management File systems Context switching Deadlock handling

Operating Systems

Click to collapse with clear terms and beginner examples

### What an OS actually does

Think of the OS as a manager between hardware and apps. It provides safe "services" so programs can run without fighting each other or crashing the machine.

OS responsibilities

- Run multiple programs safely

- Share CPU fairly

- Allocate memory (RAM)

- Read and write files

- Handle input output (I O)

- Protect and isolate processes

Real example

When you open Chrome, VS Code, and a music player together, the OS keeps switching CPU time between them and keeps their memory separate.

### Process vs Thread (quick mental model)

A **process** is a running program with its own memory space. A **thread** is a smaller unit of execution inside a process. Threads share the same process memory, but each thread has its own stack.

Process

- Own address space (memory)

- Stronger isolation

- Heavier to create and switch

Thread

- Shares process memory

- Lightweight execution

- Needs synchronization (locks)

Example



```text
Browser (one process)
- Thread 1: UI rendering
- Thread 2: Network requests
- Thread 3: JavaScript execution

They share memory like cache and page data, but run in parallel (or time sliced).
```



### CPU scheduling

CPU scheduling decides which process or thread runs next on the CPU (Central Processing Unit). The goal is good response time and fair usage.

FCFS

First Come First Serve. Simple queue order.

SJF

Shortest Job First. Minimizes average waiting time but needs job length estimate.

Round Robin

Each process gets a small time slice. Common in time sharing systems.

Quick intuition

Round Robin feels smooth for users because everyone gets CPU often. FCFS can feel "stuck" if a long job is first.

### Context switching

A **context switch** happens when the CPU stops running one thread and starts another. The OS saves the current state (registers, program counter, stack pointer) and loads the next state.

Why it happens

Time slice ended, I O waiting, higher priority task arrived, or an interrupt occurred.

Cost

Context switching is not free. Too many switches can reduce throughput.

Simple scenario



```text
Thread A is running
- Time slice ends
OS saves A state to PCB or TCB
OS loads Thread B state
CPU runs Thread B

PCB: Process Control Block
TCB: Thread Control Block
```



### Memory management

Memory management is how the OS uses RAM (Random Access Memory) to run programs safely. Each process thinks it has its own continuous memory, but the OS maps it to real physical memory.

Virtual memory

An illusion of large, private memory per process. Backed by RAM plus disk.

Paging

Splits memory into fixed size pages and frames to manage allocation and swapping.

Example mental model



```text
Your app asks for memory address 0x1000 (virtual)
MMU maps it to some physical RAM location
If the page is not in RAM, a page fault happens
OS loads the page from disk into RAM, then continues

MMU: Memory Management Unit
```



### Deadlock

A **deadlock** is when two or more processes wait forever for each other to release resources. Nobody moves.

Real world example

Two threads each hold one lock and wait for the other lock. Both are stuck.

Common fix idea

Always acquire locks in the same order, or use timeouts.

Example



```text
Thread 1:
lock(A)
lock(B)  <- waits because Thread 2 has B

Thread 2:
lock(B)
lock(A)  <- waits because Thread 1 has A

Both wait forever -> deadlock
```



### File systems

A **file system** organizes how data is stored and retrieved on disk (or SSD). It handles filenames, directories, metadata, and permissions.

File

Bytes stored on disk with metadata like size and timestamps.

Directory

A mapping from names to files and subfolders.

Permissions

Who can read, write, execute.

Beginner tip

A database also stores data on disk, but it sits on top of the file system. The OS is still involved.

### Full forms and key terms

OS - Operating System

CPU - Central Processing Unit

RAM - Random Access Memory

I O - Input Output

MMU - Memory Management Unit

PCB - Process Control Block

TCB - Thread Control Block

TLS - Transport Layer Security

If you understand process, thread, context switch, paging, and deadlock, you can debug many "random" production issues faster.

### Mini practice

Q Why does a context switch have a cost?

A Because the OS must save and restore CPU state and it can flush or disturb CPU caches, which wastes time.

Q Why do threads need locks?

A Threads share memory. Without locks, two threads can update the same data at the same time and corrupt it.

### How to say it in interviews

- "A process has its own memory space, a thread shares process memory but has its own stack."

- "Context switching saves and restores CPU state. Too many switches hurt throughput."

- "Paging maps virtual pages to physical frames using the MMU and page tables."

- "Deadlock happens when locks are acquired in conflicting orders. A common fix is consistent lock ordering."

### Next topics inside OS

Process vs thread (deep)

Scheduling algorithms (deep)

Paging and virtual memory (deep)

Deadlock conditions and prevention
