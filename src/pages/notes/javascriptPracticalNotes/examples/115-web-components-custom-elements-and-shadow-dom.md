# 115 - Web Components, custom elements, and Shadow DOM: Example

Build a small counter component that can be placed more than once on a page. The component will use an autonomous custom element, an open shadow root, a reusable template, named slots, observed attributes, native buttons, a public `value` property, and a custom event that crosses the shadow boundary.

The example displays HTML and JavaScript source code. Run the files locally to see the expected behavior.

## Goal

Create a `<step-counter>` element with configurable `value`, `min`, and `max` attributes. Its internal buttons update the count, while the page listens for a `counter-change` event without reaching into the component's private shadow markup.

## Project files

```text
web-components-demo/
├── index.html
├── server.js
└── components/
    └── step-counter.js
```

## 1. Create `index.html`

This page defines the component's reusable template, uses the custom element twice, and supplies different title and button labels through named slots.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Step counter component</title>
  <style>
    :root {
      color-scheme: light;
      font-family: system-ui, sans-serif;
      line-height: 1.5;
    }

    body {
      max-width: 48rem;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #172033;
      background: #f4f7fb;
    }

    #counters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
      gap: 1rem;
    }

    step-counter {
      --counter-accent: #175cd3;
    }

    step-counter:nth-of-type(2) {
      --counter-accent: #9a3412;
    }

    step-counter::part(control) {
      min-width: 2.75rem;
      min-height: 2.5rem;
    }

    step-counter::part(control):focus-visible,
    #reset:focus-visible {
      outline: 3px solid #111827;
      outline-offset: 3px;
    }

    #event-log {
      min-height: 1.5em;
      padding: 0.75rem;
      border-inline-start: 4px solid #175cd3;
      background: #e8eef9;
    }

    #reset {
      padding: 0.55rem 0.8rem;
      font: inherit;
    }
  </style>
</head>
<body>
  <main>
    <h1>Step counter</h1>
    <p>Each counter has its own state and shadow tree. Use the buttons to change a value.</p>

    <template id="step-counter-template">
      <style>
        :host {
          display: block;
          color: #172033;
        }

        section {
          height: 100%;
          padding: 1rem;
          border: 1px solid #c7d2e0;
          border-radius: 0.75rem;
          background: white;
          box-shadow: 0 0.2rem 0.8rem rgb(23 32 51 / 8%);
        }

        h2 {
          margin: 0 0 0.75rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0 0 0.75rem;
        }

        output {
          font-size: 1.5rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .controls {
          display: flex;
          gap: 0.5rem;
        }

        button {
          padding: 0.45rem 0.7rem;
          border: 1px solid var(--counter-accent, #175cd3);
          border-radius: 0.4rem;
          color: white;
          background: var(--counter-accent, #175cd3);
          font: inherit;
          cursor: pointer;
        }

        button:disabled {
          border-color: #8792a2;
          background: #8792a2;
          cursor: not-allowed;
        }
      </style>

      <section aria-labelledby="counter-title">
        <h2 id="counter-title"><slot name="title">Counter</slot></h2>
        <p>Current value: <output id="value">0</output></p>
        <div class="controls">
          <button part="control" type="button" data-action="decrease">
            <slot name="decrease-label">Decrease</slot>
          </button>
          <button part="control" type="button" data-action="increase">
            <slot name="increase-label">Increase</slot>
          </button>
        </div>
      </section>
    </template>

    <div id="counters">
      <step-counter id="primary-counter" value="2" min="0" max="5">
        <span slot="title">Primary counter</span>
        <span slot="decrease-label">Less</span>
        <span slot="increase-label">More</span>
      </step-counter>

      <step-counter value="7" min="5" max="9">
        <span slot="title">Practice counter</span>
      </step-counter>
    </div>

    <p id="event-log" role="status" aria-live="polite">Use a counter button to see its public event.</p>
    <button id="reset" type="button">Reset primary counter to 2</button>
  </main>

  <script type="module">
    import "/components/step-counter.js";

    await customElements.whenDefined("step-counter");

    const counters = document.querySelector("#counters");
    const primaryCounter = document.querySelector("#primary-counter");
    const eventLog = document.querySelector("#event-log");

    counters.addEventListener("counter-change", (event) => {
      const title = event.target.querySelector('[slot="title"]');
      const name = title?.textContent.trim() || "Counter";
      eventLog.textContent = `${name} changed to ${event.detail.value}.`;
    });

    document.querySelector("#reset").addEventListener("click", () => {
      primaryCounter.value = 2;
      eventLog.textContent = "Primary counter reset to 2.";
    });
  </script>
</body>
</html>
```

The page owns the light DOM labels and the reset button. The component owns its internal section, output, and counter buttons. The page styles only the parts explicitly exposed with `part="control"` and passes a color through a CSS custom property.

## 2. Create `components/step-counter.js`

```js
const template = document.querySelector("#step-counter-template");

if (!template) {
  throw new Error("The step-counter template is missing.");
}

class StepCounter extends HTMLElement {
  static observedAttributes = ["value", "min", "max"];

  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.append(template.content.cloneNode(true));
    this._valueOutput = this._root.querySelector("#value");
    this._decreaseButton = this._root.querySelector('[data-action="decrease"]');
    this._increaseButton = this._root.querySelector('[data-action="increase"]');
    this._handleClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    this._root.addEventListener("click", this._handleClick);
    this._render();
  }

  disconnectedCallback() {
    this._root.removeEventListener("click", this._handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._valueOutput) {
      this._render();
    }
  }

  get value() {
    return this._readState().value;
  }

  set value(nextValue) {
    const numericValue = Number(nextValue);

    if (!Number.isFinite(numericValue)) {
      throw new TypeError("The value property must be a finite number.");
    }

    const state = this._readState();

    if (state.validRange) {
      const boundedValue = Math.min(
        state.max,
        Math.max(state.min, numericValue)
      );
      this.setAttribute("value", String(boundedValue));
    }
  }

  _readNumber(name, fallback) {
    const rawValue = this.getAttribute(name);

    if (rawValue === null) {
      return fallback;
    }

    const numericValue = Number(rawValue);
    return Number.isFinite(numericValue) ? numericValue : fallback;
  }

  _readState() {
    const min = this._readNumber("min", 0);
    const max = this._readNumber("max", 10);
    const validRange = min <= max;
    const requestedValue = this._readNumber("value", min);
    const value = validRange
      ? Math.min(max, Math.max(min, requestedValue))
      : min;

    return { min, max, value, validRange };
  }

  _render() {
    const state = this._readState();

    this._valueOutput.textContent = String(state.value);
    this._decreaseButton.disabled = !state.validRange || state.value <= state.min;
    this._increaseButton.disabled = !state.validRange || state.value >= state.max;
  }

  _handleClick(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest("button[data-action]");

    if (!button || !this._root.contains(button)) {
      return;
    }

    const state = this._readState();

    if (!state.validRange) {
      return;
    }

    const change = button.dataset.action === "increase" ? 1 : -1;
    this.value = state.value + change;

    button.dispatchEvent(new CustomEvent("counter-change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }
}

customElements.define("step-counter", StepCounter);
```

The constructor creates one shadow root and clones the template. It does not inspect light DOM or begin connection-dependent work. The lifecycle callbacks attach and remove the click listener so the element can disconnect and reconnect safely.

The observed attributes trigger `_render()` when the markup changes. The `value` property reflects writes to the `value` attribute, and `_readState()` parses values, supplies defaults, bounds the count, and handles an invalid range. The `counter-change` event starts on the internal button, then bubbles and crosses the shadow boundary. Outside listeners see the `<step-counter>` host as the event target, while the current value is available in `event.detail`.

## 3. Create `server.js`

JavaScript modules are usually served over HTTP during local development. This small Node.js server serves only the page and component module used by the example.

```js
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const files = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/components/step-counter.js", {
    file: "components/step-counter.js",
    type: "text/javascript; charset=utf-8"
  }]
]);

const server = http.createServer((request, response) => {
  if (request.method !== "GET") {
    response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }

  const pathname = new URL(request.url, "http://localhost").pathname;
  const entry = files.get(pathname);

  if (!entry) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(path.join(__dirname, entry.file), (error, contents) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Could not read the example file");
      return;
    }

    response.writeHead(200, { "Content-Type": entry.type });
    response.end(contents);
  });
});

server.listen(8000, () => {
  console.log("Open http://localhost:8000");
});
```

## Run the example

From the `web-components-demo` directory, start the server:

```sh
node server.js
```

Open `http://localhost:8000` in a browser. Stop the server with `Ctrl+C` in the terminal.

## Expected output

The page shows two separate counter cards. The primary counter starts at `2` and can change from `0` to `5`. The practice counter starts at `7` and can change from `5` to `9`. The primary counter has custom labels, while the second uses the component's default button labels.

When a counter changes, the page's status message reports the counter title and value. The page receives this notification through `counter-change` without selecting or changing an internal shadow-tree node. The buttons become disabled at the configured minimum and maximum. The reset button sets the first element's public `value` property back to `2`.

## How the pieces work together

1. The browser parses the template and both `<step-counter>` elements.
2. The module registers the `step-counter` name. The browser constructs and upgrades the matching elements.
3. Each constructor attaches its own open shadow root and clones the template into it.
4. `connectedCallback()` installs one click listener and renders the current observed attributes.
5. The named slots display page-owned title and button text. Unnamed button labels use the fallback slot content.
6. A click updates the `value` attribute. Its observed-attribute callback rerenders the number and disabled states.
7. The component dispatches `counter-change` from the internal button. The event bubbles and is composed, so the page's ancestor listener receives it across the shadow boundary.
8. The outside listener sees the host as `event.target` and reads the documented value from `event.detail`.
9. Removing a counter invokes `disconnectedCallback()`, which removes its listener. Reconnecting it installs the listener again.

## What to notice

- The custom element name contains a hyphen and is registered only once.
- The component uses real `<button>` elements, preserving native keyboard activation and focus behavior.
- The component's own styles live in the shadow tree. The page passes a CSS custom property and styles only a named part.
- Slotted labels remain in the light DOM and belong to the page using the component.
- An open shadow root makes internal inspection convenient for debugging, but it is not private or secure.
- The page listens for a documented custom event instead of depending on internal markup.
- Invalid attribute strings use a fallback, and values are bounded by the configured range.

## Try it yourself

- Remove the `value` attribute and observe that the counter starts at its `min` value.
- Change `min` and `max` in the HTML and verify that the buttons disable at the new limits.
- Give the second counter a `slot="title"` child and custom button labels.
- Change `--counter-accent` on one host without editing the shadow stylesheet.
- Remove a counter from the page and then append it again. Confirm that it still responds to clicks.
- Add a documented `reset()` method to the class and compare a method API with the `value` property.
- Change the event listener to log `event.composedPath()` and inspect the path for an open shadow root.
- Try a `closed` shadow root and compare which debugging access through `element.shadowRoot` is available.

## Important limits

This is a teaching component, not a complete design system. It uses numeric attributes and clamps invalid values for simplicity. A production component should document its API, test keyboard and assistive-technology behavior, consider localization, and decide whether form participation or richer validation belongs in its design. Closed Shadow DOM is not a security mechanism.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [114 - Mutation, intersection, and resize observers](../examples/114-mutation-intersection-and-resize-observers.md) | [Open lesson](../lessons/115-web-components-custom-elements-and-shadow-dom.md) | [Open Q&A](../qnas/115-web-components-custom-elements-and-shadow-dom.md) | [116 - WebSockets, Server-Sent Events, and real-time updates](../lessons/116-websockets-server-sent-events-and-real-time-updates.md) |

