# 03. Context Switching

How the operating system pauses and resumes tasks on a CPU.

Context switching

Context switching is when the CPU pauses one thread or process and resumes another. The Operating System saves the current execution state and restores the next one, so multitasking feels smooth.

Save and restore state Enables multitasking Has overhead cost

Context switching

Click to collapse with clear terms and examples

### Meaning

A CPU can run only one thread at a time per core. So the OS switches between tasks rapidly. This switch is called **context switching**.

Context means

The full "current state" of a running task - CPU registers, program counter, stack pointer, and more.

Switching means

Save the old state, load the new state, and continue as if nothing happened.

### What gets saved and restored

The OS saves execution details so it can pause and later resume exactly from the same point.

Program Counter (PC)

The address of the next instruction to execute.

Registers

Fast CPU storage holding temporary values.

Stack Pointer

Points to the current location of the call stack.

CPU flags

Status bits like zero, carry, sign, overflow.

Memory mappings

Page table pointers or memory map references, depending on OS.

Kernel bookkeeping

The OS stores these in structures like PCB or TCB.

Simple instruction flow



```text
Thread A is running
PC = 1200
Registers hold values for calculations

Timer interrupt happens
OS saves A context to memory
OS loads Thread B context
PC becomes B's PC value
CPU continues from B's next instruction
```



### Why it happens

Context switching happens for multiple reasons. Some are planned (time slicing), some are forced (interrupts).

Time slice ended

In Round Robin scheduling, each task gets a small time. When time is over, the OS switches to another task.

Interrupts

Hardware events like keyboard input or network packet arrival can interrupt and trigger OS work.

I O waiting

If a task waits for disk or network I O, the OS switches to another runnable task to avoid wasting CPU.

Higher priority arrives

A high priority task can preempt a low priority one, so urgent work runs first.

### Context switch cost (why it is not free)

A context switch takes time. During the switch, no "useful" app work is happening. Too many context switches reduce throughput.

Save and restore work

The OS must store registers and load new registers, update kernel structures, and update scheduling.

Cache disruption

CPU caches may no longer match the new task's data. This causes cache misses and slows down execution.

Real production vibe

If you create too many threads, the system may spend more time switching than doing useful work. This is one reason why thread pools exist.

### Process switch vs thread switch

Switching between threads of the same process is often cheaper than switching between different processes, because processes have separate memory maps.

Thread context switch

- Switch stacks and registers

- Same address space

- Usually cheaper

Process context switch

- Switch memory mappings

- Flush TLB often

- Usually more expensive

Practical example



```text
Same process threads:
- Browser UI thread -> Browser network thread
Less overhead

Different processes:
- Chrome process -> VS Code process
More overhead because memory mapping changes
```



### Full forms and key terms

CPU - Central Processing Unit

OS - Operating System

PC - Program Counter

I O - Input Output

PCB - Process Control Block

TCB - Thread Control Block

TLB - Translation Lookaside Buffer

Context switching is the hidden cost behind "too many threads" and "too many runnable tasks". It enables multitasking, but it also adds overhead.

### Mini practice

Q Why can too many threads hurt performance?

A Because the OS spends more time doing context switches and the CPU caches get disturbed more often.

Q What starts a context switch during Round Robin?

A The timer interrupt when the time slice ends.

### How to say it in interviews

- "A context switch saves CPU state of the current thread and restores the next, so execution can resume later."

- "Context switching has overhead because saving registers, scheduling, and cache or TLB effects take time."

- "Thread switches are usually cheaper than process switches because address space stays the same."
