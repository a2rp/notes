# Example 139 - Performance analysis, memory leaks, and optimization

## Question

How can a browser page measure filtering and list-render work, avoid creating DOM nodes for every matching record, and release a view's event listener when that view is unmounted?

## Complete example

Save this as an HTML file and open it in a browser. It creates a fixed set of sample records, filters them as you type, renders at most 100 rows, and reports the time spent filtering and updating the DOM. The exact duration depends on the browser and device.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Measure a searchable list</title>
  <style>
    body {
      max-width: 48rem;
      margin: 2rem auto;
      padding: 0 1rem;
      font: 1rem/1.5 system-ui, sans-serif;
    }

    label, input, button {
      font: inherit;
    }

    input, button {
      padding: 0.5rem;
    }

    #controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    #records {
      max-height: 22rem;
      overflow: auto;
      padding-left: 2rem;
    }

    #records li {
      padding: 0.2rem;
    }

    #status, #timing {
      min-height: 1.5em;
    }
  </style>
</head>
<body>
  <main>
    <h1>Searchable records</h1>
    <p>The page keeps 5,000 sample records but renders at most 100 rows.</p>

    <div id="controls">
      <label for="query">Search</label>
      <input id="query" type="search" autocomplete="off">
      <button id="mount" type="button">Mount list</button>
      <button id="unmount" type="button">Unmount list</button>
    </div>

    <p id="status" role="status" aria-live="polite">List is unmounted.</p>
    <p id="timing"></p>
    <ol id="records"></ol>
  </main>

  <script>
    const recordCount = 5000;
    const visibleLimit = 100;
    const records = Array.from(
      { length: recordCount },
      (_, index) => "Record " + String(index + 1).padStart(5, "0")
    );

    const queryInput = document.querySelector("#query");
    const list = document.querySelector("#records");
    const status = document.querySelector("#status");
    const timing = document.querySelector("#timing");
    const mountButton = document.querySelector("#mount");
    const unmountButton = document.querySelector("#unmount");

    let viewController = null;

    function renderResults() {
      performance.mark("list-render-start");

      const query = queryInput.value.trim().toLowerCase();
      const matches = records.filter((record) =>
        record.toLowerCase().includes(query)
      );
      const visible = matches.slice(0, visibleLimit);
      const fragment = document.createDocumentFragment();

      for (const record of visible) {
        const item = document.createElement("li");
        item.textContent = record;
        fragment.append(item);
      }

      list.replaceChildren(fragment);

      performance.mark("list-render-end");
      performance.measure(
        "list-filter-and-dom-update",
        "list-render-start",
        "list-render-end"
      );

      const measurements = performance.getEntriesByName(
        "list-filter-and-dom-update"
      );
      const latest = measurements[measurements.length - 1];

      status.textContent =
        "Found " + matches.length + " records. Showing " + visible.length + ".";
      timing.textContent =
        "Filter and DOM update: " + latest.duration.toFixed(2) + " ms";

      performance.clearMarks("list-render-start");
      performance.clearMarks("list-render-end");
      performance.clearMeasures("list-filter-and-dom-update");
    }

    function mountList() {
      if (viewController !== null) {
        return;
      }

      viewController = new AbortController();
      queryInput.addEventListener("input", renderResults, {
        signal: viewController.signal
      });

      renderResults();
    }

    function unmountList() {
      if (viewController === null) {
        return;
      }

      viewController.abort();
      viewController = null;
      list.replaceChildren();
      status.textContent = "List unmounted. Input listener removed.";
      timing.textContent = "";
    }

    mountButton.addEventListener("click", mountList);
    unmountButton.addEventListener("click", unmountList);
  </script>
</body>
</html>
~~~

## Expected output

After selecting **Mount list**:

- The status reports **Found 5000 records. Showing 100.**
- The ordered list displays the first 100 records.
- The timing line reports a duration in milliseconds. The number varies by browser, device, and current system load.

Entering a search term updates the match count and visible rows. Selecting **Unmount list** clears the rows, removes the input listener, and reports **List unmounted. Input listener removed.**

The browser may paint after the JavaScript finishes. The displayed duration covers filtering and DOM creation/update code, not the full time until pixels appear on screen.

## Explanation

- **The workload is explicit.** The example filters 5,000 records and displays no more than 100 at once. A real application should choose limits based on its data and interaction.
- **The cost is named and measured.** performance.mark and performance.measure place a named duration on the Performance timeline. The marks and measure are cleared after reading so repeated input does not retain an ever-growing list of entries.
- **A monotonic clock is used by the Performance API.** The page measures elapsed work rather than comparing wall-clock timestamps.
- **The DOM work is bounded.** The code creates nodes only for the visible slice and uses textContent so record text is not parsed as markup.
- **The listener follows the view lifecycle.** The input listener is registered with an AbortSignal and removed when unmountList aborts its controller. Mounting repeatedly does not add another input listener.
- **Timing is not a complete user-perceived metric.** The measurement does not include the browser's later paint or every scheduling delay. Use a browser performance recording to inspect the full interaction.
- **The example is not proof of a leak.** For a real leak investigation, take memory snapshots around repeated mount and unmount cycles and inspect objects that remain retained.
- **The records array is intentionally kept alive.** It is sample data owned by the page. A production application should release or bound data that is no longer needed.

## Try it yourself

1. Mount the list several times, unmounting between each mount. Confirm that each mount adds only one active input handler.
2. Search for 42 and compare the match count and measured duration.
3. Change visibleLimit to 5000 and compare the measured DOM update duration and scrolling behavior.
4. Add a temporary setInterval inside mountList, then observe why unmountList must clear it as well.
5. In browser DevTools, record the interaction in the Performance panel and compare the trace with the displayed JavaScript duration.
6. Take a heap snapshot, repeat mount and unmount several times, and inspect whether detached list nodes or listener closures accumulate.

## Chapter navigation

| Previous chapter | Current chapter | Next chapter |
| --- | --- | --- |
| [138 - Dependency hygiene, lockfiles, and software supply chain](../lessons/138-dependency-hygiene-lockfiles-and-software-supply-chain.md) | [Lesson](../lessons/139-performance-analysis-memory-leaks-and-optimization.md) · [Q&A](../qnas/139-performance-analysis-memory-leaks-and-optimization.md) · [Example](139-performance-analysis-memory-leaks-and-optimization.md) | [140 - Feature detection, compatibility, and graceful fallback](../lessons/140-feature-detection-compatibility-and-graceful-fallback.md) |
