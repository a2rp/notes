# 06. Paging

Virtual address translation, page tables, and page-level memory management.

Paging

Paging is a memory management technique where virtual memory is split into fixed-size pages and physical memory is split into fixed-size frames. The OS maps pages to frames using a page table so programs get a clean illusion of continuous memory.

Pages and frames Page table mapping MMU translation Page fault Swap to disk

Paging

Click to collapse with clear terms and practical examples

### Why paging exists

Programs want memory like one smooth, continuous block. Real RAM is messy because many programs come and go. Paging fixes this by splitting memory into equal chunks and mapping them.

Problem without paging

You get fragmentation - free memory exists but in scattered pieces. Large contiguous allocations become hard.

Paging benefit

No need for contiguous physical memory. Any free frame can hold any page.

### Core terms

Page Virtual

A fixed-size block of virtual memory used by a process.

Frame Physical

A fixed-size block of physical RAM that holds one page.

Page table Map

A per-process mapping that says which page is stored in which frame.

Offset Inside

The position inside a page. Offset stays the same during translation.

### How address translation works

A virtual address is split into two parts - page number and offset. The MMU looks up the page number in the page table to find the frame number. Then it combines frame number and offset to get the physical address.

Step by step example



```text
Virtual address = [pageNumber | offset]

1) CPU generates virtual address
2) MMU reads pageNumber
3) MMU uses page table to get frameNumber
4) Physical address = [frameNumber | offset]

Offset does not change.
Only pageNumber becomes frameNumber.
```



Beginner intuition

Think of a page table like an address book. You ask "where is page 7" and it tells you "frame 21". Then you go to frame 21 and pick the exact byte using the offset.

### Page fault

A page fault happens when a process tries to access a page that is not currently in RAM. The OS must bring that page into RAM from disk (swap area or file backing).

What triggers it

Accessing a page not present in RAM, or accessing a page without permission.

Why it feels slow

Disk I O is much slower than RAM. So page faults can cause visible lag.

Page fault flow



```text
1) CPU accesses a page
2) Page table says "not present"
3) Trap to OS (page fault handler)
4) OS loads page from disk into a free frame
5) Page table updated
6) CPU instruction restarted
```



### Page replacement idea

If RAM is full, the OS must choose a victim page to evict (remove) to make room. This is called page replacement.

FIFO

First In First Out - evict the oldest page in memory.

LRU

Least Recently Used - evict the page that has not been used for the longest time.

Optimal

Evict the page that will not be used for the longest time in the future. Used as a theoretical benchmark.

Most real systems use approximations of LRU because perfect LRU is expensive.

### Quick numeric example

Let page size be 4 KB. A program accesses address 13 KB in its virtual space.

Compute



```text
pageSize = 4 KB

virtualAddress = 13 KB

pageNumber = floor(13 / 4) = 3
offset     = 13 - (3 * 4) = 1 KB

So address 13 KB means
pageNumber 3 and offset 1 KB inside that page.
```



What you say in interviews

"Virtual address splits into page number and offset. Page table maps page to frame. Physical address is frame plus offset."

### Full forms and key terms

OS - Operating System

RAM - Random Access Memory

CPU - Central Processing Unit

MMU - Memory Management Unit

I O - Input Output

FIFO - First In First Out

LRU - Least Recently Used

KB - KiloByte (commonly 1024 bytes in memory context)

Paging is the backbone of virtual memory. Once paging clicks, context switching and process isolation also become easier to understand.

### Mini practice

Q Why is paging better than allocating one large contiguous block in RAM?

A Because pages can be placed in any free frame, so physical memory does not need to be contiguous and fragmentation is reduced.

Q Why does a page fault cause slowness?

A Because fetching a page from disk is far slower than reading from RAM.
