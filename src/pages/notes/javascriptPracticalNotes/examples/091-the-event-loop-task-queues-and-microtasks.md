# 91 - The event loop, task queues, and microtasks

## Question

What runs first when a page schedules synchronous code, a Promise reaction, a queueMicrotask callback, a microtask from inside another microtask, and a later task? How does the order show that synchronous JavaScript finishes before the host processes queued work?

## Project file

~~~text
event-loop-example/
  index.html
~~~

## Complete example

Save the following as **index.html**, open it in a browser, and inspect the page output or the browser console.

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Event loop and microtasks</title>
  </head>
  <body>
    <main>
      <h1>Event loop and microtasks</h1>
      <p>
        The output shows synchronous statements first, then microtasks, then
        a later task.
      </p>
      <pre id="output" aria-live="polite"></pre>
    </main>

    <script>
      const output = document.querySelector("#output");

      function log(message) {
        console.log(message);
        output.textContent += message + "\n";
      }

      log("synchronous: start");

      setTimeout(() => {
        log("task: timer callback");
      }, 0);

      Promise.resolve().then(() => {
        log("microtask: Promise reaction");

        queueMicrotask(() => {
          log("microtask: queued during the checkpoint");
        });
      });

      queueMicrotask(() => {
        log("microtask: queueMicrotask callback");
      });

      log("synchronous: end");
    </script>
  </body>
</html>
~~~

## Expected output

~~~text
synchronous: start
synchronous: end
microtask: Promise reaction
microtask: queueMicrotask callback
microtask: queued during the checkpoint
task: timer callback
~~~

The output in the page and console follows the same order.

## Explanation

1. The first log call runs as part of the current script task.
2. setTimeout asks the browser to schedule its callback as later task work. A delay of zero does not make it run immediately.
3. Promise.resolve().then queues a Promise reaction microtask.
4. queueMicrotask queues another microtask after the Promise reaction.
5. The last synchronous log runs before either microtask, because synchronous JavaScript continues to completion.
6. When the current stack is empty, the browser starts draining the microtask queue. The Promise reaction runs first.
7. That reaction queues another microtask. The previously queued queueMicrotask callback is already waiting, so it runs next.
8. The newly queued microtask runs after it. The host drains microtasks added during the checkpoint before moving on.
9. The timer callback runs as later task work, after the current microtask checkpoint.

The zero delay is used only to make the later task easy to see. It does not guarantee an exact amount of elapsed time. Timer behavior and visual scheduling are covered in the next chapter.

## Try another case

Move the queueMicrotask call so it appears before the Promise.resolve().then call. Run the page again. The two top-level microtask callbacks should appear in the order they were queued.

Then remove the nested queueMicrotask call from the Promise reaction. Compare the output and explain why the timer task still appears after the remaining microtasks.

Do not add an endless function that queues another microtask forever. That would keep the microtask queue from emptying and could make the page unresponsive.

## Key points

- Synchronous statements complete before queued callbacks run.
- Promise reactions and queueMicrotask callbacks are microtasks.
- Microtasks are processed in their queue order at a checkpoint.
- A microtask added while the queue is draining is processed before the host proceeds to later task work.
- A timer callback is later task work, even when its requested delay is zero.
- A long-running task or an endlessly replenished microtask queue can delay page updates and input.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [90 - The asynchronous programming model](../lessons/090-the-asynchronous-programming-model.md) | [Open lesson](../lessons/091-the-event-loop-task-queues-and-microtasks.md) | [Open Q&A](../qnas/091-the-event-loop-task-queues-and-microtasks.md) | [92 - Timers, animation frames, and scheduling](../lessons/092-timers-animation-frames-and-scheduling.md) |
