# 05. Memory Management

How systems allocate, protect, and reclaim memory.

Memory management

Memory management is how an OS (Operating System) allocates, tracks, protects, and reclaims RAM (Random Access Memory) so multiple programs can run safely at the same time.

Virtual memory Paging MMU mapping Swapping Protection

Memory management

Click to collapse with beginner explanation and strong examples

### What memory management solves

Without memory management, programs would overwrite each other’s data, crash the machine, or read sensitive memory. The OS creates rules and tools so each process gets "its own memory world".

Main jobs

- Allocate memory to processes

- Track which memory is free or used

- Protect processes from each other

- Share memory safely when needed

- Reclaim memory when a process ends

Simple example

You open a browser, a game, and a code editor. Each thinks it has its own memory. The OS maps them to real RAM and keeps them isolated.

### RAM vs disk

RAM is fast, but limited. Disk (HDD or SSD) is slower, but larger. Memory management uses both to create the feeling of "enough memory".

RAM

Very fast, used for active program data. If RAM is full, performance drops.

Disk

Slower storage. Used as backup for memory through swapping and paging.

### Virtual memory

Virtual memory is a technique where each process gets its own virtual address space (private memory map), even if physical RAM is smaller.

Key idea

Programs use virtual addresses. Hardware uses physical addresses. The OS connects them using a mapping system.

Beginner picture



```text
Process A (virtual)
0x0000 -> code
0x1000 -> heap
0x9000 -> stack

Process B (virtual)
0x0000 -> code
0x1000 -> heap
0x9000 -> stack

Both can use same virtual addresses
But OS maps them to different physical RAM locations
```



### Paging

Paging splits memory into fixed-size chunks:
- Virtual memory chunks are called pages
- Physical RAM chunks are called frames
The OS maintains a page table that maps pages to frames.

Why paging helps

It avoids needing one big continuous block of RAM. Pages can be placed anywhere in physical memory.

Trade-off

Paging adds mapping overhead, but hardware (MMU) makes it fast enough.

Mapping example



```text
Page size = 4 KB

Virtual page 5 -> Physical frame 12
Virtual page 6 -> Physical frame 3

So virtual address (page 5, offset 200)
maps to physical address (frame 12, offset 200)
```



### MMU and page tables

MMU (Memory Management Unit) is hardware that translates virtual addresses to physical addresses using page tables. This is what makes virtual memory work efficiently.

Step 1

CPU creates a virtual address while executing code

Step 2

MMU looks up page table entry for that address

Step 3

MMU returns physical RAM address and access rules

Protection

Page table entries store permissions like read, write, execute. That is how OS prevents one process from writing another process memory.

### Page fault and swapping

If a process tries to use a page that is not currently in RAM, a page fault happens. The OS loads that page from disk into RAM, then resumes the process.

Page fault

Not an error always. It often means the OS needs to fetch a page into RAM.

Swapping

Moving pages between RAM and disk to manage limited memory.

Real feel example



```text
You open many apps
RAM fills up
OS moves rarely used pages to disk (swap)
When you come back to that app, it feels slow
Because OS must bring pages back into RAM
```



Too much swapping causes thrashing - the system spends more time moving pages than doing real work.

### Common issues developers see

Out of memory

Process keeps allocating and OS cannot give more. Can crash the process or kill it.

Memory leak

Program holds references and memory never gets freed. Over time RAM usage keeps growing.

Thrashing

Too many page faults. System becomes slow because it is swapping constantly.

Developer example



```text
Node server memory keeps growing
- You store all requests in an array for logging
- You never clear it
RAM usage increases, OS starts swapping
Server becomes slow, then may crash or get killed
```



### Full forms and terms

OS - Operating System

RAM - Random Access Memory

MMU - Memory Management Unit

HDD - Hard Disk Drive

SSD - Solid State Drive

KB - Kilobyte

4 KB - 4 Kilobytes (common page size)

### Mini practice

Q Why does virtual memory help isolation?

A Each process has its own virtual address space and its own page table mapping, so one process cannot directly access another process memory.

Q Why does heavy swapping slow the system?

A Disk is much slower than RAM. If the OS constantly moves pages between disk and RAM, real work pauses.

### How to say it in interviews

- "Virtual memory gives each process a private address space mapped to physical memory using page tables."

- "Paging splits memory into pages and frames, avoiding the need for contiguous allocation."

- "Page faults occur when a page is not in RAM and must be loaded from disk."

- "Too much swapping leads to thrashing and performance collapse."

### Quick recap

Virtual memory Each process sees private memory

Paging Fixed-size pages mapped to frames

MMU Hardware that translates addresses

Page fault Page not in RAM, must load from disk
