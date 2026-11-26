# 07. Virtual Memory

Address spaces, demand paging, and the abstraction of memory beyond RAM.

Virtual memory

Virtual memory is a memory management technique where each process gets its own private address space. It lets programs behave as if they have a large continuous memory, even though the system uses RAM and disk together behind the scenes.

Private address space Paging MMU mapping Page faults Disk as backup

Virtual memory

Click to collapse with beginner explanation and practical examples

### Meaning in simple words

Virtual memory means your program does not work with real RAM addresses directly. Instead, it uses **virtual addresses**.
The OS and hardware translate those virtual addresses to **physical addresses** in RAM.

Virtual address

The address your program thinks it is using, like address 0x1000.

Physical address

The real RAM location where the data actually lives.

### Why virtual memory exists

Virtual memory solves multiple problems at once:
- **Isolation** - one app cannot easily read another app memory
- **Safety** - prevents many crashes and attacks
- **Simpler programming** - each process feels like it has its own memory
- **Bigger memory illusion** - can use disk when RAM is limited

Key benefit

Two processes can both use the same virtual address 0x1000, but they map to different physical RAM. This is how isolation works.

### Paging - the core technique

Most systems implement virtual memory using **paging**.
Memory is split into fixed size blocks:
- **Page** - block in virtual memory
- **Frame** - block in physical RAM
The OS maintains a **page table** that stores which page maps to which frame.

Virtual memory

Page 0, Page 1, Page 2, Page 3...

RAM

Frame 0, Frame 1, Frame 2...

Page table

Tells where each page is stored.

Tiny mapping example



```text
Virtual pages:
Page 0 -> Frame 5
Page 1 -> Frame 2
Page 2 -> not in RAM (on disk)
Page 3 -> Frame 9

Your program asks for an address in Page 2
Then a page fault happens
```



### MMU and address translation

The **MMU** (Memory Management Unit) is hardware that translates virtual addresses to physical addresses.
It uses the page table and often uses a fast cache called **TLB**.

MMU

Memory Management Unit. Hardware that does address translation.

TLB

Translation Lookaside Buffer. A fast cache for recent page table lookups.

What happens on a memory access



```text
1) CPU generates a virtual address
2) MMU checks TLB for mapping
3) If hit -> get physical address quickly
4) If miss -> read page table (slower)
5) If page not present -> page fault -> OS loads page
```



### Page fault (very important)

A **page fault** happens when a program accesses a page that is not currently in RAM.
The OS pauses the program, loads the needed page from disk into RAM, updates the page table, and resumes the program.

Why it feels slow

Disk access is much slower than RAM. So page faults can cause visible lag, like app freezing for a moment.

Real world feel



```text
You open a heavy app
RAM is almost full
OS moves some old pages to disk (swap)
When the app needs them again -> page faults happen
You feel the system stutter
```



### Swap and thrashing (danger zone)

**Swap** is disk space used to store memory pages when RAM is full.
**Thrashing** is when the OS spends most time swapping pages in and out, and little time doing real work.

Swap

Disk area used as memory backup.

Thrashing

Too many page faults, system becomes slow and unresponsive.

Virtual memory is powerful, but if RAM is too low and page faults are too frequent, the system can thrash.

### Full forms and key terms

VM - Virtual Memory

RAM - Random Access Memory

MMU - Memory Management Unit

TLB - Translation Lookaside Buffer

OS - Operating System

I O - Input Output

### Mini practice

Q Why do we need virtual memory if we already have RAM?

A Because virtual memory gives process isolation, safer memory access, and the ability to use disk as a backup when RAM is not enough.

Q What makes page faults expensive?

A Disk is much slower than RAM. Loading a page from disk can take milliseconds, while RAM access is in nanoseconds.

### How to say it in interviews

- "Virtual memory gives each process its own private address space and maps it to physical RAM."

- "Paging splits memory into pages and frames, and the page table stores mappings."

- "A page fault happens when a needed page is not in RAM, so the OS loads it from disk."

- "Thrashing is excessive paging that makes the system slow."
