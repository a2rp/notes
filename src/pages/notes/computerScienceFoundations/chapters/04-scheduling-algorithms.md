# 04. Scheduling Algorithms

Common CPU scheduling strategies and their tradeoffs.

Scheduling algorithms

Scheduling algorithms decide which process or thread gets CPU time next. The goal is to keep the system responsive, fair, and efficient while minimizing waiting time and maximizing throughput.

Who runs next Response time Time slicing Priority rules Preemptive vs non preemptive

Scheduling algorithms

Click to collapse with clear terms, examples, and quick comparisons

### Why scheduling exists

CPU (Central Processing Unit) is limited. Many processes want CPU time at the same moment. The OS (Operating System) uses a scheduler to decide the next process to run.

What scheduler tries to achieve

- Good response time for users

- Fairness between tasks

- High throughput (more work done)

- Low waiting time

- Avoid starvation (never getting CPU)

Simple example

You have Chrome, VS Code, and a video call. If one task hogs CPU, the system feels frozen. Scheduling prevents that.

### Preemptive vs non preemptive

**Preemptive** means the OS can interrupt a running process and give CPU to another process. **Non preemptive** means a running process keeps CPU until it finishes or blocks for I O (Input Output).

Preemptive

- Better responsiveness

- More context switches

- More complex

Non preemptive

- Simple to implement

- Can feel stuck with long jobs

- Less switching overhead

Key term

Context switch happens when OS saves current task state and loads next task state. It costs time.

### Core algorithms

FCFS

First Come First Serve - run jobs in arrival order. Non preemptive.

Pros

Simple, low overhead

Cons

Convoy effect - long job blocks all

SJF

Shortest Job First - pick the smallest CPU burst next. Non preemptive.

Pros

Great average waiting time

Cons

Needs burst estimate, can starve long jobs

SRTF

Shortest Remaining Time First - preemptive version of SJF. If a shorter job arrives, it interrupts.

Pros

Very good average waiting time

Cons

More context switches, starvation possible

Round Robin

Give each process a time quantum (time slice). Preemptive. Cycles through ready queue.

Pros

Fair, good for interactive systems

Cons

Bad quantum choice hurts performance

Priority

Higher priority runs first. Can be preemptive or non preemptive.

Pros

Supports real time importance

Cons

Starvation risk for low priority

MLQ and MLFQ

Multiple queues. MLQ (Multilevel Queue) has fixed queues. MLFQ (Multilevel Feedback Queue) moves processes between queues.

Pros

Balances interactive and batch workloads

Cons

Complex tuning, tricky fairness rules

Interview tip - Always mention whether the algorithm is preemptive or non preemptive, and what it optimizes.

### Metrics you must know

These metrics compare scheduling algorithms. They show user experience and system efficiency.

Turnaround time Total time from arrival to completion

Waiting time Time spent waiting in ready queue

Response time Time until first CPU response after arrival

Throughput Number of processes completed per unit time

Important

Best algorithm depends on goal. Interactive systems care about response time. Batch systems care about throughput.

### Round Robin example (easy)

Suppose time quantum is 2 units. Three processes arrive at time 0.

Input



```text
P1 burst = 5
P2 burst = 4
P3 burst = 2
Quantum = 2
```



Schedule timeline



```text
0-2  : P1 (remaining 3)
2-4  : P2 (remaining 2)
4-6  : P3 (remaining 0) done
6-8  : P1 (remaining 1)
8-10 : P2 (remaining 0) done
10-11: P1 (remaining 0) done
```



What to notice

Smaller quantum improves responsiveness but increases context switching. Bigger quantum reduces switching but feels closer to FCFS.

### Starvation and aging

**Starvation** means a process keeps waiting because other processes always get CPU. Priority scheduling and SJF style algorithms can cause starvation.

Aging

Aging slowly increases priority of waiting processes over time, so they eventually run.

Simple rule

The longer you wait, the more priority you earn.

### Full forms and terms

CPU - Central Processing Unit

OS - Operating System

FCFS - First Come First Serve

SJF - Shortest Job First

SRTF - Shortest Remaining Time First

RR - Round Robin

MLQ - Multilevel Queue

MLFQ - Multilevel Feedback Queue

I O - Input Output

If you can explain Round Robin quantum tradeoff and starvation with aging, you are already ahead of many candidates.

### Mini practice

Q Why can FCFS cause convoy effect?

A A long CPU heavy job at the front blocks many short jobs behind it, so everyone waits and the system feels slow.

Q What happens if Round Robin quantum is too small?

A Too many context switches, more overhead, lower throughput.
