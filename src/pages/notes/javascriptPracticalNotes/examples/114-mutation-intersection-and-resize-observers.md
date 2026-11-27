# 114 - Mutation, intersection, and resize observers: Example

## Question

How can a page detect DOM list changes, notice when a scroll sentinel enters a panel, and respond to an element's size changing?

## Goal

Build one page with three small demonstrations:

1. Add or remove list items and report the DOM changes with MutationObserver.
2. Scroll a panel until a sentinel intersects, then load more cards with IntersectionObserver.
3. Resize a card with a range input and display its dimensions with ResizeObserver.

The example uses no external libraries or network resources.

## Files for the example

Create a folder containing **server.js** and **index.html**. Copy each complete code block into the matching file. The server uses only Node.js built-in modules.

## Server code: server.js

~~~js
"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3000;
const origin = "http://" + HOST + ":" + PORT;

const server = createServer(async (request, response) => {
  const url = new URL(request.url, origin);

  if (
    request.method !== "GET" ||
    (url.pathname !== "/" && url.pathname !== "/index.html")
  ) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
    return;
  }

  try {
    const page = await readFile(path.join(__dirname, "index.html"));
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(page);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Could not read index.html");
  }
});

server.listen(PORT, HOST, () => {
  console.log("Open " + origin);
});
~~~

## Page code: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Observer lab</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        font: 1rem/1.5 system-ui, sans-serif;
        color: #18212b;
        background: #f4f6f9;
      }

      body {
        max-width: 54rem;
        margin: 2rem auto;
        padding: 0 1rem 3rem;
      }

      main,
      section {
        display: grid;
        gap: 0.8rem;
      }

      section {
        margin-top: 1.25rem;
        padding: 1rem;
        border: 1px solid #aab4c0;
        border-radius: 0.5rem;
        background: #fff;
      }

      h1,
      h2 {
        line-height: 1.2;
      }

      button,
      input {
        width: fit-content;
        max-width: 100%;
        font: inherit;
      }

      button {
        padding: 0.45rem 0.7rem;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .item-list,
      .mutation-log {
        display: grid;
        gap: 0.4rem;
        padding-left: 1.5rem;
      }

      .scroll-panel {
        height: 15rem;
        overflow: auto;
        padding: 0.75rem;
        border: 1px solid #8291a1;
        background: #f8fafc;
      }

      .card-list {
        display: grid;
        gap: 0.6rem;
      }

      .demo-card {
        min-height: 4rem;
        padding: 0.7rem;
        border: 1px solid #c3ccd6;
        background: #fff;
      }

      .sentinel {
        min-height: 2rem;
        padding: 0.35rem;
        color: #475569;
        text-align: center;
      }

      .resize-box {
        width: 300px;
        max-width: 100%;
        min-height: 7rem;
        padding: 1rem;
        border: 2px solid #47647f;
        background: #eaf2fa;
        transition: background-color 150ms ease;
      }

      .resize-box.compact {
        background: #fcebdc;
      }

      [role="status"] {
        min-height: 1.5em;
      }

      :focus-visible {
        outline: 3px solid #1769aa;
        outline-offset: 3px;
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Observer lab</h1>
        <p>
          Change the list, scroll the card panel, and resize the box to see
          three different observers in action.
        </p>
      </header>

      <section aria-labelledby="mutation-heading">
        <h2 id="mutation-heading">MutationObserver: list changes</h2>
        <div class="button-row">
          <button id="add-item" type="button">Add item</button>
          <button id="remove-item" type="button">Remove last item</button>
        </div>
        <ul id="items" class="item-list">
          <li>First item</li>
          <li>Second item</li>
        </ul>
        <h3>Observed changes</h3>
        <ol id="mutation-log" class="mutation-log" aria-live="polite"></ol>
      </section>

      <section aria-labelledby="intersection-heading">
        <h2 id="intersection-heading">
          IntersectionObserver: scroll sentinel
        </h2>
        <p id="intersection-status" role="status" aria-live="polite">
          Scroll the panel down to the sentinel.
        </p>
        <div id="scroll-panel" class="scroll-panel" tabindex="0">
          <div id="card-list" class="card-list"></div>
          <div id="sentinel" class="sentinel">More content can load here</div>
        </div>
        <button id="load-more" type="button" disabled>Load next cards</button>
      </section>

      <section aria-labelledby="resize-heading">
        <h2 id="resize-heading">ResizeObserver: element size</h2>
        <label for="resize-range">Change the card width</label>
        <input id="resize-range" type="range" min="160" max="500" value="300">
        <p id="resize-status" role="status" aria-live="polite">
          Waiting for the first size notification.
        </p>
        <div id="resize-box" class="resize-box">
          This card changes its color when its content box becomes compact.
        </div>
      </section>
    </main>

    <script>
      "use strict";

      const itemList = document.querySelector("#items");
      const mutationLog = document.querySelector("#mutation-log");
      const addItemButton = document.querySelector("#add-item");
      const removeItemButton = document.querySelector("#remove-item");
      let nextItemNumber = 3;

      function addMutationLog(message) {
        const item = document.createElement("li");
        item.textContent = message;
        mutationLog.prepend(item);

        while (mutationLog.children.length > 8) {
          mutationLog.lastElementChild.remove();
        }
      }

      const mutationObserver = new MutationObserver((records) => {
        for (const record of records) {
          const addedNames = Array.from(record.addedNodes)
            .filter((node) => node.nodeType === Node.ELEMENT_NODE)
            .map((node) => node.textContent.trim());

          const removedNames = Array.from(record.removedNodes)
            .filter((node) => node.nodeType === Node.ELEMENT_NODE)
            .map((node) => node.textContent.trim());

          if (addedNames.length > 0) {
            addMutationLog("Added: " + addedNames.join(", "));
          }

          if (removedNames.length > 0) {
            addMutationLog("Removed: " + removedNames.join(", "));
          }
        }
      });

      mutationObserver.observe(itemList, {
        childList: true
      });

      addItemButton.addEventListener("click", () => {
        const item = document.createElement("li");
        item.textContent = "Item " + nextItemNumber;
        nextItemNumber += 1;
        itemList.append(item);
      });

      removeItemButton.addEventListener("click", () => {
        if (itemList.lastElementChild) {
          itemList.lastElementChild.remove();
        } else {
          addMutationLog("There are no items to remove.");
        }
      });

      const scrollPanel = document.querySelector("#scroll-panel");
      const cardList = document.querySelector("#card-list");
      const sentinel = document.querySelector("#sentinel");
      const intersectionStatus =
        document.querySelector("#intersection-status");
      const loadMoreButton = document.querySelector("#load-more");

      const MAX_CARDS = 17;
      let nextCardNumber = 1;
      let sentinelIsNear = false;

      function appendCards(amount) {
        for (let count = 0; count < amount; count += 1) {
          if (nextCardNumber > MAX_CARDS) {
            break;
          }

          const card = document.createElement("article");
          card.className = "demo-card";
          card.textContent = "Card " + nextCardNumber;
          cardList.append(card);
          nextCardNumber += 1;
        }

        if (nextCardNumber > MAX_CARDS) {
          intersectionStatus.textContent = "All cards have been loaded.";
          loadMoreButton.disabled = true;
          return;
        }

        intersectionStatus.textContent =
          "Loaded " + (nextCardNumber - 1) + " cards. Scroll to the sentinel.";
        loadMoreButton.disabled = !sentinelIsNear;
      }

      appendCards(6);

      let intersectionObserver;

      if ("IntersectionObserver" in window) {
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.target !== sentinel) {
                continue;
              }

              sentinelIsNear = entry.isIntersecting;
              loadMoreButton.disabled =
                !sentinelIsNear || nextCardNumber > MAX_CARDS;

              intersectionStatus.textContent = sentinelIsNear
                ? "Sentinel is near. You can load more cards."
                : "Scroll the panel down to the sentinel.";
            }
          },
          {
            root: scrollPanel,
            rootMargin: "0px 0px 30px 0px",
            threshold: 0
          }
        );

        intersectionObserver.observe(sentinel);
      } else {
        sentinelIsNear = true;
        loadMoreButton.disabled = false;
        intersectionStatus.textContent =
          "IntersectionObserver is unavailable. Use the button to load cards.";
      }

      loadMoreButton.addEventListener("click", () => {
        if (nextCardNumber > MAX_CARDS) {
          intersectionStatus.textContent = "All cards have been loaded.";
          loadMoreButton.disabled = true;
          return;
        }

        appendCards(3);
      });

      const resizeRange = document.querySelector("#resize-range");
      const resizeBox = document.querySelector("#resize-box");
      const resizeStatus = document.querySelector("#resize-status");

      resizeRange.addEventListener("input", () => {
        resizeBox.style.width = resizeRange.value + "px";
      });

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const size = entry.contentBoxSize
            ? entry.contentBoxSize[0]
            : undefined;
          const inlineSize = size
            ? size.inlineSize
            : entry.contentRect.width;
          const blockSize = size
            ? size.blockSize
            : entry.contentRect.height;

          resizeBox.classList.toggle("compact", inlineSize < 260);
          resizeStatus.textContent =
            "Content box: " + Math.round(inlineSize) + " by " +
            Math.round(blockSize) + " CSS pixels.";
        }
      });

      resizeObserver.observe(resizeBox);

      window.addEventListener("pagehide", () => {
        mutationObserver.disconnect();
        intersectionObserver?.disconnect();
        resizeObserver.disconnect();
      });
    </script>
  </body>
</html>
~~~

## Run the example

Use a recent Node.js version. In a terminal opened in the folder containing both files, run:

~~~sh
node server.js
~~~

Open **http://127.0.0.1:3000**.

## Expected result

- Adding or removing a list item creates a MutationRecord and adds a message to the observed-changes list.
- Scrolling the card panel near its sentinel enables the button. Pressing it appends up to three more cards.
- Moving the range input changes the resize box's width.
- ResizeObserver reports the content box's inline and block sizes. The card changes color below 260 CSS pixels.
- Observer callbacks do not require a timer-based polling loop.

## Explanation

- MutationObserver watches only the list's childList. Its callback checks addedNodes and removedNodes and writes a plain-text summary outside the observed list.
- IntersectionObserver uses the scroll panel as its root and a positive bottom rootMargin. It enables the load button shortly before the sentinel becomes visible.
- ResizeObserver watches the box's content size. The callback uses logical inlineSize and blockSize when available and contentRect as a fallback.
- The compact class changes only the box color, not its size. That prevents the style change from creating a resize feedback loop.
- The page disconnects observers when it is left.

## Important limits

Intersection only reports geometric overlap. It does not prove that a person saw or read a card. MutationObserver reports configured DOM mutations, not computed style or layout changes. ResizeObserver reports box size changes, not all position changes.

## Try it yourself

- Add several list items, remove them, and inspect how records group the changes.
- Change the MutationObserver options to watch attributes on one item.
- Change rootMargin and observe when the load button becomes enabled.
- Add another IntersectionObserver threshold and display intersectionRatio.
- Resize the panel to below and above the compact threshold.
- Change the compact style so it affects width, then observe how an unstable size rule can cause repeated notifications.
- Replace the ResizeObserver style rule with a CSS container query and compare the result.
- Disconnect an observer after its component is removed, then verify that it no longer reports changes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [113 - Service workers, offline behavior, and cache lifecycle](113-service-workers-offline-behavior-and-cache-lifecycle.md) | [Open lesson](../lessons/114-mutation-intersection-and-resize-observers.md) | [Open Q&A](../qnas/114-mutation-intersection-and-resize-observers.md) | [115 - Web Components, custom elements, and Shadow DOM](../lessons/115-web-components-custom-elements-and-shadow-dom.md) |
