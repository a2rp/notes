# 92 - Timers, animation frames, and scheduling

## Question

How should a browser page schedule a delayed reminder, repeat independent work, animate an element smoothly, cancel callbacks, and process a larger job without keeping the main thread busy?

## Project file

~~~text
browser-scheduling-example/
  index.html
~~~

## Complete example

Save this as **index.html** and open it in a browser. The controls demonstrate one-shot timers, repeated timers, animation frames, and chunked work.

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Browser scheduling playground</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: system-ui, sans-serif;
      }

      body {
        max-width: 48rem;
        margin: 2rem auto;
        padding: 0 1rem;
      }

      section {
        margin-block: 1.5rem;
        padding-block: 1rem;
        border-top: 1px solid currentColor;
      }

      button {
        margin: 0.25rem;
        padding: 0.5rem 0.75rem;
      }

      .track {
        position: relative;
        width: min(100%, 32rem);
        height: 2.5rem;
        margin-block: 1rem;
        border: 1px solid currentColor;
        border-radius: 0.5rem;
      }

      .dot {
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: steelblue;
        will-change: transform;
      }

      #log {
        min-height: 8rem;
        padding: 1rem;
        overflow: auto;
        border: 1px solid currentColor;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Browser scheduling playground</h1>
      <p>
        Try each control. Timer callbacks can run later than requested, while
        animation frames follow the browser's rendering schedule.
      </p>

      <section aria-labelledby="reminder-heading">
        <h2 id="reminder-heading">One delayed reminder</h2>
        <button id="schedule-reminder" type="button">Schedule reminder</button>
        <button id="cancel-reminder" type="button">Cancel reminder</button>
        <p id="reminder-status">No reminder is pending.</p>
      </section>

      <section aria-labelledby="interval-heading">
        <h2 id="interval-heading">Repeating counter</h2>
        <p>Ticks observed: <output id="tick-count">0</output></p>
        <button id="start-interval" type="button">Start counter</button>
        <button id="stop-interval" type="button">Stop counter</button>
      </section>

      <section aria-labelledby="animation-heading">
        <h2 id="animation-heading">Frame-based animation</h2>
        <p>The dot travels across the track over about two seconds.</p>
        <div class="track" id="track">
          <div class="dot" id="dot"></div>
        </div>
        <button id="start-animation" type="button">Start animation</button>
        <button id="stop-animation" type="button">Stop animation</button>
      </section>

      <section aria-labelledby="chunk-heading">
        <h2 id="chunk-heading">Chunked work</h2>
        <p>
          Process a small group of items, yield to the browser, then continue.
        </p>
        <button id="process-chunks" type="button">Process sample items</button>
      </section>

      <section aria-labelledby="log-heading">
        <h2 id="log-heading">Activity log</h2>
        <pre id="log" aria-label="Activity log">Ready.</pre>
      </section>
    </main>

    <script>
      const logElement = document.querySelector("#log");

      function log(message) {
        console.log(message);
        logElement.textContent += "\n" + message;
      }

      const reminderStatus = document.querySelector("#reminder-status");
      let reminderId = null;

      document.querySelector("#schedule-reminder").addEventListener("click", () => {
        if (reminderId !== null) {
          clearTimeout(reminderId);
        }

        reminderStatus.textContent = "Reminder scheduled. It may run after two seconds.";
        log("Reminder scheduled.");

        reminderId = setTimeout(() => {
          reminderStatus.textContent = "Reminder callback ran.";
          log("Reminder callback ran.");
          reminderId = null;
        }, 2000);
      });

      document.querySelector("#cancel-reminder").addEventListener("click", () => {
        if (reminderId === null) {
          log("There is no pending reminder to cancel.");
          return;
        }

        clearTimeout(reminderId);
        reminderId = null;
        reminderStatus.textContent = "Reminder canceled.";
        log("Reminder canceled.");
      });

      const tickCount = document.querySelector("#tick-count");
      let intervalId = null;
      let ticks = 0;

      document.querySelector("#start-interval").addEventListener("click", () => {
        if (intervalId !== null) {
          log("The counter is already running.");
          return;
        }

        intervalId = setInterval(() => {
          ticks += 1;
          tickCount.textContent = String(ticks);
          log("Interval callback: tick " + ticks);
        }, 1000);

        log("Counter started. Ticks are approximate, not a precise clock.");
      });

      document.querySelector("#stop-interval").addEventListener("click", () => {
        if (intervalId === null) {
          log("The counter is already stopped.");
          return;
        }

        clearInterval(intervalId);
        intervalId = null;
        log("Counter stopped.");
      });

      const track = document.querySelector("#track");
      const dot = document.querySelector("#dot");
      let animationId = null;
      let animationStart = null;

      function animate(timestamp) {
        if (animationStart === null) {
          animationStart = timestamp;
        }

        const duration = 2000;
        const elapsed = timestamp - animationStart;
        const progress = Math.min(elapsed / duration, 1);
        const distance = Math.max(0, track.clientWidth - dot.offsetWidth - 8);

        dot.style.transform = "translateX(" + distance * progress + "px)";

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        } else {
          animationId = null;
          animationStart = null;
          log("Animation completed.");
        }
      }

      document.querySelector("#start-animation").addEventListener("click", () => {
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
        }

        animationStart = null;
        dot.style.transform = "translateX(0px)";
        animationId = requestAnimationFrame(animate);
        log("Animation started.");
      });

      document.querySelector("#stop-animation").addEventListener("click", () => {
        if (animationId === null) {
          log("There is no pending animation frame to cancel.");
          return;
        }

        cancelAnimationFrame(animationId);
        animationId = null;
        animationStart = null;
        log("Animation stopped.");
      });

      async function yieldToHost() {
        if (globalThis.scheduler?.yield) {
          await globalThis.scheduler.yield();
          return;
        }

        await new Promise((resolve) => {
          setTimeout(resolve, 0);
        });
      }

      const processButton = document.querySelector("#process-chunks");
      let processing = false;

      processButton.addEventListener("click", async () => {
        if (processing) {
          return;
        }

        processing = true;
        processButton.disabled = true;

        const total = 200;
        const chunkSize = 50;
        let nextIndex = 0;
        let checksum = 0;

        try {
          while (nextIndex < total) {
            const end = Math.min(nextIndex + chunkSize, total);

            while (nextIndex < end) {
              checksum += (nextIndex + 1) % 7;
              nextIndex += 1;
            }

            log("Processed items 1 to " + nextIndex + " of " + total + ".");

            if (nextIndex < total) {
              await yieldToHost();
            }
          }

          log("Chunked work completed. Checksum: " + checksum + ".");
        } finally {
          processing = false;
          processButton.disabled = false;
        }
      });
    </script>
  </body>
</html>
~~~

## Expected behavior

The activity log begins with **Ready.** The exact order of messages depends on which buttons you press and when the browser schedules the callbacks.

- **Schedule reminder** adds “Reminder scheduled.” The reminder callback runs after its delay when the browser can process it. Press **Cancel reminder** first to prevent it.
- **Start counter** adds one tick after each approximate one-second interval. **Stop counter** cancels future interval callbacks.
- **Start animation** moves the dot across the track over about two seconds. **Stop animation** cancels the next requested frame and leaves the dot at its current position.
- **Process sample items** logs four chunks of 50 items, yielding between chunks when possible. The browser can process other work between those pieces.

The requested delays are not exact deadlines. A busy page or background tab can make callbacks run later. The animation uses the requestAnimationFrame timestamp, so its duration does not depend on a fixed number of frames.

## Explanation

### The reminder

The reminder stores the identifier from setTimeout. Scheduling another reminder first cancels the older one. The Cancel button calls clearTimeout and resets the stored identifier. Once the callback runs, it also resets the identifier because there is no longer a pending timeout.

### The repeating counter

The counter stores one interval identifier and refuses to start a second interval while the first is active. The Stop button calls clearInterval. This is a counter of callbacks the browser has delivered, not a precise measurement of elapsed seconds.

### The animation

The animation stores the requestAnimationFrame identifier so Stop can cancel the next frame. Each callback calculates progress from the timestamp and requests another frame only while progress is below one. The transform changes based on elapsed time rather than a fixed number of pixels per frame.

### Chunked work

The sample processes at most 50 values before yielding. If scheduler.yield is available, it lets the asynchronous function yield through that API. Otherwise it uses a zero-delay timeout fallback. Neither option guarantees a paint after every chunk, but both return control to the host so other work can be scheduled.

## Try another case

1. Schedule a reminder, then schedule another reminder immediately. Only the latest pending callback should update the status.
2. Start the counter, wait for a few ticks, and stop it. Press Start again and confirm that there is still only one active interval.
3. Start the animation, stop it partway through, then start it again. Observe how the new run resets its start position.
4. Start the animation and hide the tab. Return to it and observe how your browser handles the paused frame callbacks.
5. Start chunked work while the counter is running. Notice that the activity log can contain messages from both scheduled jobs.
6. In developer tools, disable or remove the scheduler.yield branch to observe the setTimeout fallback.

## Key points

- Timers schedule callbacks for later and should be canceled when they are no longer needed.
- setInterval is useful for independent repeated callbacks, but it is not a precise clock.
- requestAnimationFrame is one-shot and should be requested again for each continuing animation.
- Elapsed-time calculations keep frame-based animation independent of display refresh rate.
- Chunking and yielding let the browser schedule other work between pieces of a large job.
- Timing and callback order can vary with load, browser policies, and user interaction.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [91 - The event loop, task queues, and microtasks](../lessons/091-the-event-loop-task-queues-and-microtasks.md) | [Open lesson](../lessons/092-timers-animation-frames-and-scheduling.md) | [Open Q&A](../qnas/092-timers-animation-frames-and-scheduling.md) | [93 - Promises, states, chaining, and error handling](../lessons/093-promises-states-chaining-and-error-handling.md) |
