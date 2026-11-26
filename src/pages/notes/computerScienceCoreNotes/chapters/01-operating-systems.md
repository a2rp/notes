# 01. Operating Systems

Processes, memory, files, scheduling, and operating-system responsibilities.

Operating Systems

At-a-glance revision notes for OS fundamentals - processes, threads, scheduling, synchronization, memory, file systems, and disk scheduling.

Collapse

Scan the "At a glance" bullets first. Then read examples for real understanding.

Fundamentals

Quick revision points and beginner examples

At a glance

- OS is the manager between hardware and apps.

- Kernel runs with full privileges, user space runs with limited privileges.

- System calls are the official door from user programs to kernel services.

What is an OS

An Operating System (OS) is the core software that manages hardware and provides services to programs.

It controls CPU time, memory, storage, devices, and keeps programs isolated and secure.

Example

- When you open Chrome, the OS creates a process, gives it memory, schedules CPU time, and lets it read files and use the network safely.

OS goals and types

Common goals are performance, fairness, security, and stability.

Types include batch OS, time-sharing OS, real-time OS, distributed OS, and mobile OS.

Quick intuition

- Real-time OS cares about deadlines.

- Time-sharing OS cares about responsive multi-user experience.

Kernel vs User space

Kernel space has full control over the machine and can run privileged instructions.

User space is where normal apps run with restrictions to prevent crashes from taking down the whole system.

Example

- A buggy game can crash, but your OS should stay alive because the game runs in user space.

Monolithic vs Microkernel

Monolithic kernel keeps most services (drivers, filesystem, networking) inside the kernel for speed.

Microkernel keeps the kernel small and moves many services to user space for better isolation.

Trade-off

- Monolithic is often faster.

- Microkernel can be safer and easier to isolate faults.

System calls

System calls are APIs provided by the OS to request services like file access, process creation, network operations, and memory allocation.

They switch execution from user mode to kernel mode safely.

Example

- open() - open a file

- read() - read from file

- fork() - create a new process (Unix-like)

Process Management

Quick revision points and beginner examples

At a glance

- Process is a running program with its own memory and state.

- Context switch is when CPU stops one process and starts another.

- Scheduling decides who gets CPU next.

Process vs Program

A program is a passive file on disk (like an .exe).

A process is an active execution of that program with its own memory, CPU registers, and resources.

Example

- You can open the same program twice. That creates two processes.

Process states

Typical states are new, ready, running, waiting (blocked), and terminated.

Ready means it can run but is waiting for CPU.

Waiting means it is paused for I/O or some event.

Example

- When an app is downloading a file, it may be waiting for network I/O.

PCB structure

PCB (Process Control Block) stores everything the OS needs to manage a process.

It usually includes PID, state, registers, program counter, scheduling info, memory mappings, and open files.

Mental model

- PCB is like the OS notebook page for each process.

Context switching

Context switch saves the current process state (registers, program counter) and loads another process state.

It has overhead, so too many switches reduce performance.

Example

- Round Robin uses frequent switches to keep UI responsive, but switching too often wastes CPU time.

Scheduling algorithms

Scheduling decides the order and duration processes get CPU.

Different algorithms optimize different goals like fairness, throughput, or response time.

Real-world note

- Time-sharing systems often use Round Robin-like ideas for responsiveness.

Common scheduling algorithms

FCFS

First Come First Serve. Simple. Can cause convoy effect where short jobs wait behind long jobs.

SJF

Shortest Job First. Minimizes average waiting time. Needs job length estimate.

Round Robin

Each process gets a time slice (quantum). Fair and responsive.

Priority

Higher priority runs first. Risk of starvation for low priority tasks.

Multilevel queue

Separate queues for different task types (system, interactive, batch). Each queue may have its own algorithm.

Threads

Quick revision points and beginner examples

At a glance

- Thread is a lightweight execution path inside a process.

- Threads share process memory, so they are faster to switch but need synchronization.

- User threads are managed by libraries, kernel threads are managed by OS.

Process vs Thread

A process has its own address space and resources.

Threads inside a process share memory and resources, but each thread has its own stack and registers.

Example

- A browser process may have threads for UI, network, and rendering working at the same time.

User vs Kernel threads

User-level threads are created and managed in user space, often faster to create.

Kernel-level threads are known to the OS scheduler and can run truly in parallel on multiple CPU cores.

Quick intuition

- Kernel threads are more powerful for real parallelism.

- User threads can be lighter but depend on runtime support.

Multithreading models

Many-to-one, one-to-one, many-to-many are classic models.

Modern systems commonly use one-to-one or many-to-many depending on runtime and OS.

Example

- Some language runtimes map many lightweight tasks onto a smaller pool of OS threads.

Thread synchronization

Because threads share memory, they can corrupt shared data if they write at the same time.

Synchronization tools (mutex, semaphore) protect shared resources and enforce safe ordering.

Example

- Two threads updating the same counter must lock or use atomic operations to avoid wrong values.

CPU Scheduling Metrics

Quick revision points and beginner examples

At a glance

- These metrics tell you whether scheduling is fair and responsive.

- Response time matters for interactive apps.

- Throughput matters for batch workloads.

Metrics

Turnaround time

Total time from submission to completion.

Waiting time

Total time spent waiting in ready queue.

Response time

Time until the first response, important for UI and interactive tasks.

Throughput

Number of processes completed per unit time.

Synchronization

Quick revision points and beginner examples

At a glance

- Race conditions happen when timing changes the result.

- Critical section is the part that must not be executed by multiple threads at once.

- Mutex and semaphores are common protection tools.

Race condition

Race condition occurs when multiple threads access shared data and the final result depends on who runs first.

It can produce random bugs that disappear when you add logs or debugging.

Example

- Two threads read balance = 100, both add 10, both write 110. Correct answer should be 120.

Critical section

Critical section is the code region that reads or writes shared data.

Only one thread should enter at a time to maintain correctness.

Example

- Updating a shared queue, shared counter, or shared cache entry is a critical section.

Mutex

Mutex is a lock that allows only one thread to enter a critical section.

Lock before entering, unlock after leaving.

Example

- Thread A locks, updates shared map, unlocks. Thread B waits until unlock.

Semaphore

Semaphore is a counter-based synchronization tool.

Binary semaphore acts like a mutex. Counting semaphore allows N threads to enter (like limited resources).

Example

- A connection pool of size 10 can be protected by a counting semaphore of 10.

Deadlock snapshot

- Deadlock is when two or more threads wait forever because each holds a resource the other needs.

- Typical case is Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1.

Deadlock

Quick revision points and beginner examples

At a glance

- Deadlock needs 4 conditions. Break one to prevent it.

- Avoidance is proactive, detection is reactive.

- Banker’s Algorithm is a classic avoidance idea.

Deadlock essentials

Necessary conditions

Mutual exclusion, hold and wait, no preemption, circular wait.

Detection

System checks for cycles and stuck waits, then recovers by killing or rolling back processes.

Prevention

Design system to break at least one necessary condition, like ordering locks to avoid circular wait.

Avoidance

Decide at runtime if granting a resource keeps system in a safe state.

Banker’s Algorithm

Classic avoidance approach. Only grant if resources remain enough for all processes to eventually finish.

Memory Management

Quick revision points and beginner examples

At a glance

- OS must give each process an isolated view of memory.

- Virtual memory makes it look like you have more memory than RAM.

- Paging and page replacement decide how memory is used efficiently.

Logical vs Physical address

Logical (virtual) address is what the process uses.

Physical address is the real RAM address.

OS and hardware translate logical to physical using page tables.

Example

- Two processes can both use address 0x1000, but they map to different physical locations.

Paging

Memory is divided into fixed-size pages and frames.

Paging reduces external fragmentation and simplifies allocation.

Example

- Process pages can be placed into any free frames in RAM.

Segmentation

Memory is divided by logical segments like code, stack, heap.

Segmentation matches program structure but can suffer from external fragmentation.

Quick compare

- Paging is fixed-size blocks.

- Segmentation is variable-size blocks based on meaning.

Virtual memory

Virtual memory uses disk as an extension of RAM.

Only needed parts stay in RAM, rest can remain on disk until accessed.

Example

- Opening many apps works because inactive pages can be moved out of RAM.

Page replacement algorithms

When RAM is full and a new page is needed, OS must pick a page to evict.

Good eviction choices reduce page faults and improve performance.

Example

- If you keep evicting pages you need soon, system becomes slow and can start thrashing.

Page replacement

FIFO

Evict the oldest loaded page. Simple but not always smart.

LRU

Evict the least recently used page. Often performs better but needs tracking.

Optimal

Evict the page not needed for the longest time in future. Best in theory, not possible to implement perfectly.

File Systems and Disk Scheduling

Quick revision points and beginner examples

At a glance

- File system organizes files and directories on storage.

- Allocation method affects performance and fragmentation.

- Disk scheduling reduces head movement and improves throughput.

File allocation methods

Contiguous allocation is simple and fast but can fragment.

Linked allocation reduces fragmentation but can be slower for random access.

Indexed allocation uses an index block for fast random access.

Example

- Video files often benefit from contiguous allocation style because sequential reads are common.

Directory structures

Directories map names to file metadata locations.

Common structures include single-level, two-level, tree, and DAG-like structures.

Example

- A typical OS uses a tree structure: /home/user/docs.

Disk scheduling

SCAN

Disk head moves like an elevator, serving requests in one direction then reverses.

C-SCAN

Like SCAN but returns to start without serving on the way back, gives more uniform wait times.

Interview tip - Always explain OS topics using trade-offs like performance vs safety, throughput vs latency, and isolation vs sharing.
