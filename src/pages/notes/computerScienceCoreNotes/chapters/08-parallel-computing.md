# 08. Parallel Computing

Concurrency, parallel work, synchronization, and performance considerations.

Parallel Computing

At-a-glance revision for parallelism, speedup limits, SIMD, multithreading, and GPU basics.

Collapse

Start with "At a glance" bullets, then read examples to build intuition.

Parallel vs Concurrent

Quick revision points and beginner examples

At a glance

- Concurrency is about dealing with many things at once.

- Parallelism is about doing many things at the same time.

- You can have concurrency without parallelism on a single core.

Parallelism

Parallelism means tasks literally run at the same time using multiple CPU cores or GPUs.

Goal is to reduce total time by splitting work into parts that can execute simultaneously.

Example

- Rendering 4K video by splitting frames across multiple cores.

- Processing a large array by dividing it into chunks and computing each chunk on different cores.

Concurrency

Concurrency means making progress on multiple tasks by switching between them.

Even on one CPU core, OS can switch tasks quickly so the system feels like it runs many tasks together.

Example

- A browser handling UI events while also downloading data.

- Node.js event loop doing many I/O tasks by switching callbacks.

Key difference (memory intuition)

Concurrency is about structure and coordination.

Parallelism is about hardware speedup.

Parallelism usually introduces shared data issues, so synchronization matters.

Quick check

- Single core - can be concurrent, cannot be truly parallel.

- Multi core - can be both concurrent and parallel.

Amdahl's Law

Quick revision points and beginner examples

At a glance

- Speedup is limited by the serial part you cannot parallelize.

- Even 1000 cores cannot fix a big serial bottleneck.

- Optimize the serial part first for real gains.

What it says

Amdahl's Law states that the maximum speedup of a program from parallelization is limited by the fraction that must run sequentially.

If a fraction of your code is serial, that part becomes the ceiling on speedup.

Beginner formula intuition

- If 10% is serial, best possible speedup is about 10x, even with infinite processors.

- If 30% is serial, best possible speedup is about 3.33x.

Why it matters

Parallel optimization only helps the parallel portion.

Real systems often have serial bottlenecks like I/O, locks, or a single-threaded coordinator.

Real-world example

- A database query might be parallel, but final aggregation or locking can be serial and limit speed.

Practical takeaway

Measure before adding threads.

Reduce serial work, reduce lock contention, batch I/O, and avoid unnecessary synchronization.

Checklist

- Reduce critical sections.

- Avoid a single global lock.

- Use chunked processing to reduce coordination overhead.

Mental model

- Parallelism is not magic.

- If your program spends time waiting on one slow step, more cores just wait faster.

SIMD

Quick revision points and beginner examples

At a glance

- SIMD means one instruction processes multiple data items.

- Great for arrays, vectors, images, and signal processing.

- It is parallelism inside the CPU itself.

What is SIMD

SIMD stands for Single Instruction Multiple Data.

CPU executes one instruction that applies to a vector of data values at once.

Example

- Add 8 integers in one CPU instruction using vector registers.

- Apply the same brightness change to many pixels in one step.

Where it shines

SIMD is strongest when the same operation repeats across large data sets.

Common in image filters, audio processing, machine learning inference, and physics simulations.

Quick intuition

- Loops over arrays can sometimes be auto-vectorized by compilers.

Limitations

SIMD does not help much when logic is branch-heavy or each element needs different work.

Memory alignment and data layout matter for best performance.

Example

- If each element has different if-else decisions, SIMD lanes become inefficient.

Multithreading

Quick revision points and beginner examples

At a glance

- Multiple threads run inside one process.

- Threads share memory so coordination and locking matter.

- Too many threads can slow things down due to context switching and contention.

What multithreading gives

Threads can run in parallel on multiple CPU cores.

Threads can also overlap work like computation plus I/O to improve responsiveness.

Example

- UI thread stays responsive while a worker thread loads data.

- A server handles many requests using a thread pool.

Costs and risks

Shared memory can cause race conditions if not protected.

Locks can cause contention and reduce speedup.

Context switching has overhead, especially with too many active threads.

Example

- A single global mutex can make 16 threads behave like 1 thread.

Beginner tips

Prefer a fixed-size thread pool instead of creating unlimited threads.

Keep critical sections small.

Batch work into chunks to reduce synchronization overhead.

Rule of thumb

- If CPU-bound, keep threads near number of cores.

- If I/O-bound, you can have more, but still avoid extreme counts.

GPU Basics

Quick revision points and beginner examples

At a glance

- GPU is built for massive parallel work on many small tasks.

- Best for data-parallel workloads like vectors, matrices, images.

- GPU has high throughput but higher latency and transfer overhead.

CPU vs GPU mindset

CPU has few powerful cores optimized for low-latency, complex control flow.

GPU has many smaller cores optimized for throughput and doing the same operation across lots of data.

Example

- CPU is like a few expert workers.

- GPU is like thousands of fast workers doing the same simple task.

Where GPU helps most

Matrix multiplication, image processing, physics simulation, deep learning training and inference.

Anything that can be expressed as the same operation over big arrays is a good match.

Example

- Multiply two large matrices for ML workloads.

- Apply blur filter to an image across millions of pixels.

GPU overhead and limitations

Moving data from CPU memory to GPU memory costs time.

Branch-heavy code performs poorly on GPUs.

Small jobs may be faster on CPU because GPU setup overhead dominates.

Quick intuition

- GPU is worth it when the workload is large and repetitive.

Interview edge

- When talking about GPU, always mention trade-off.

- High throughput, but transfer overhead and branch divergence can reduce gains.

Interview tip - Always mention speedup limits and overheads like synchronization, communication, and data transfer when discussing parallel performance.
