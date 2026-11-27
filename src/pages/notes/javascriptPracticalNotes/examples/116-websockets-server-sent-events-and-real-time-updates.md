# 116 - WebSockets, Server-Sent Events, and real-time updates: Example

This project runs a small browser chat over WebSockets and a live counter feed over Server-Sent Events. It shows why the transports have different jobs: the chat sends messages in both directions, while the feed only sends updates from the server to the page.

## Goal

Build a page that:

- connects a browser WebSocket to a Node.js server;
- broadcasts validated chat messages to connected browser clients;
- receives a server update stream with `EventSource`;
- replays a short in-memory history after a temporary SSE reconnect;
- renders incoming chat text safely and reports connection state.

## Project files

```text
realtime-demo/
├── package.json
├── server.js
└── public/
    ├── index.html
    └── client.js
```

## 1. Create `package.json`

```json
{
  "name": "realtime-websockets-sse-demo",
  "version": "1.0.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "ws": "^8.18.0"
  }
}
```

Install the dependency from the project directory:

```sh
npm install
```

The `ws` package supplies a WebSocket server for Node.js. Browser code uses the built-in `WebSocket` API.

## 2. Create `public/index.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Realtime updates demo</title>
  <style>
    :root {
      color-scheme: light;
      font-family: system-ui, sans-serif;
      line-height: 1.5;
    }

    body {
      max-width: 58rem;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #172033;
      background: #f4f7fb;
    }

    main {
      display: grid;
      gap: 1.5rem;
    }

    section {
      padding: 1rem;
      border: 1px solid #c7d2e0;
      border-radius: 0.75rem;
      background: white;
    }

    h1,
    h2 {
      line-height: 1.2;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: end;
    }

    label {
      display: grid;
      flex: 1 1 18rem;
      gap: 0.25rem;
    }

    input,
    button {
      min-height: 2.5rem;
      padding: 0.45rem 0.7rem;
      font: inherit;
    }

    #chat-messages {
      max-height: 16rem;
      overflow: auto;
      padding-inline-start: 1.5rem;
    }

    #chat-messages li + li {
      margin-block-start: 0.35rem;
    }

    time {
      margin-inline-end: 0.5rem;
      color: #526174;
      font-size: 0.9rem;
    }

    #feed-count {
      font-size: 1.6rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    :focus-visible {
      outline: 3px solid #175cd3;
      outline-offset: 3px;
    }
  </style>
  <script src="/client.js" defer></script>
</head>
<body>
  <main>
    <h1>Realtime updates</h1>

    <section aria-labelledby="chat-heading">
      <h2 id="chat-heading">WebSocket chat</h2>
      <p id="socket-status" role="status">Connecting to chat...</p>
      <button id="reconnect" type="button">Reconnect chat</button>

      <form id="chat-form">
        <label for="chat-input">Message</label>
        <input id="chat-input" name="message" maxlength="240" required>
        <button id="send-button" type="submit">Send</button>
      </form>

      <ol id="chat-messages" aria-label="Chat messages" aria-live="polite" aria-relevant="additions"></ol>
    </section>

    <section aria-labelledby="feed-heading">
      <h2 id="feed-heading">Server-Sent Events feed</h2>
      <p id="feed-status" role="status">Connecting to the update feed...</p>
      <p>Update number: <output id="feed-count">Waiting</output></p>
      <p>Server time: <time id="feed-time">Waiting</time></p>
      <p>Last event ID: <output id="feed-event-id">None</output></p>
    </section>
  </main>
</body>
</html>
```

The chat list is a small live region so new messages can be announced. A high-volume chat may need a user preference to pause announcements. The feed status only reports connection changes; its rapidly changing counter is not a live region.

## 3. Create `public/client.js`

```js
const socketStatus = document.querySelector("#socket-status");
const reconnectButton = document.querySelector("#reconnect");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-button");
const chatMessages = document.querySelector("#chat-messages");

const feedStatus = document.querySelector("#feed-status");
const feedCount = document.querySelector("#feed-count");
const feedTime = document.querySelector("#feed-time");
const feedEventId = document.querySelector("#feed-event-id");

let socket;
let source;

function addChatMessage(message) {
  const item = document.createElement("li");
  const time = document.createElement("time");
  const text = document.createElement("span");
  const sentAt = new Date(message.sentAt);

  time.dateTime = sentAt.toISOString();
  time.textContent = sentAt.toLocaleTimeString();
  text.textContent = message.text;
  item.append(time, text);
  chatMessages.append(item);

  while (chatMessages.children.length > 50) {
    chatMessages.firstElementChild.remove();
  }
}

function connectSocket() {
  if (socket && socket.readyState <= WebSocket.OPEN) {
    return;
  }

  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const nextSocket = new WebSocket(`${protocol}//${location.host}/ws`);
  socket = nextSocket;
  sendButton.disabled = true;
  socketStatus.textContent = "Connecting to chat...";

  nextSocket.addEventListener("open", () => {
    if (socket !== nextSocket) {
      return;
    }

    socketStatus.textContent = "Chat connected.";
    sendButton.disabled = false;
  });

  nextSocket.addEventListener("message", (event) => {
    if (socket !== nextSocket) {
      return;
    }

    let message;

    try {
      message = JSON.parse(event.data);
    } catch {
      socketStatus.textContent = "The server sent an unreadable message.";
      return;
    }

    if (message.type === "chat") {
      addChatMessage(message);
    } else if (message.type === "error") {
      socketStatus.textContent = message.message;
    }
  });

  nextSocket.addEventListener("error", () => {
    if (socket === nextSocket) {
      socketStatus.textContent = "Chat connection error.";
    }
  });

  nextSocket.addEventListener("close", () => {
    if (socket !== nextSocket) {
      return;
    }

    sendButton.disabled = true;
    socketStatus.textContent = "Chat disconnected. Choose Reconnect chat to try again.";
  });
}

function renderFeedUpdate(data, id) {
  feedCount.textContent = String(data.count);
  feedTime.dateTime = data.updatedAt;
  feedTime.textContent = new Date(data.updatedAt).toLocaleTimeString();
  feedEventId.textContent = id || "None";
}

function connectEventSource() {
  if (source && source.readyState !== EventSource.CLOSED) {
    return;
  }

  const nextSource = new EventSource("/events");
  source = nextSource;
  feedStatus.textContent = "Connecting to the update feed...";

  nextSource.addEventListener("open", () => {
    if (source === nextSource) {
      feedStatus.textContent = "Update feed connected.";
    }
  });

  nextSource.addEventListener("feed-update", (event) => {
    if (source !== nextSource) {
      return;
    }

    try {
      renderFeedUpdate(JSON.parse(event.data), event.lastEventId);
    } catch {
      feedStatus.textContent = "The update feed sent invalid data.";
    }
  });

  nextSource.addEventListener("snapshot", (event) => {
    if (source !== nextSource) {
      return;
    }

    try {
      renderFeedUpdate(JSON.parse(event.data), event.lastEventId);
      feedStatus.textContent = "Feed reconnected. Showing the latest snapshot.";
    } catch {
      feedStatus.textContent = "The update feed sent invalid data.";
    }
  });

  nextSource.addEventListener("error", () => {
    if (source !== nextSource) {
      return;
    }

    if (nextSource.readyState === EventSource.CONNECTING) {
      feedStatus.textContent = "Update feed interrupted. Reconnecting...";
    } else {
      feedStatus.textContent = "Update feed closed.";
    }
  });
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();

  if (!text) {
    chatInput.focus();
    return;
  }

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socketStatus.textContent = "Chat is not connected. Reconnect before sending.";
    return;
  }

  socket.send(JSON.stringify({ type: "chat", text }));
  chatInput.value = "";
  chatInput.focus();
});

reconnectButton.addEventListener("click", connectSocket);

window.addEventListener("pagehide", () => {
  if (socket && socket.readyState < WebSocket.CLOSING) {
    socket.close(1000, "Page hidden");
  }

  if (source) {
    source.close();
  }
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    connectSocket();
    connectEventSource();
  }
});

connectSocket();
connectEventSource();
```

The client parses JSON inside `try` blocks, checks the WebSocket state before sending, and uses `textContent` for chat messages. It keeps at most 50 chat rows in the document. The browser WebSocket does not reconnect automatically, so the page offers an explicit reconnect button. `EventSource` retries automatically until it is closed.

## 4. Create `server.js`

```js
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { WebSocket, WebSocketServer } = require("ws");

const PORT = 3000;
const APP_ORIGIN = `http://localhost:${PORT}`;
const PUBLIC_DIRECTORY = path.join(__dirname, "public");

const publicFiles = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/client.js", { file: "client.js", type: "text/javascript; charset=utf-8" }]
]);

const sseClients = new Set();
const sseHistory = [];
const MAX_HISTORY = 50;
const MAX_CHAT_LENGTH = 240;
const MAX_CHAT_BYTES = 2048;

let nextEventId = 0;
let feedCount = 0;
let latestFeedUpdate = {
  count: feedCount,
  updatedAt: new Date().toISOString()
};

function writeSseEvent(response, event) {
  if (response.destroyed || response.writableEnded) {
    return;
  }

  response.write(`id: ${event.id}\n`);
  response.write(`event: ${event.type}\n`);
  response.write(`data: ${JSON.stringify(event.data)}\n\n`);
}

function publishSseEvent(type, data) {
  const event = {
    id: ++nextEventId,
    type,
    data
  };

  sseHistory.push(event);

  if (sseHistory.length > MAX_HISTORY) {
    sseHistory.shift();
  }

  for (const response of sseClients) {
    writeSseEvent(response, event);
  }
}

function replaySseEvents(response, lastEventId) {
  if (lastEventId === undefined) {
    return;
  }

  const requestedId = Number(lastEventId);
  const oldestId = sseHistory[0]?.id ?? nextEventId + 1;
  const historyExpired = requestedId < oldestId - 1;
  const invalidOrFutureId = !Number.isSafeInteger(requestedId)
    || requestedId < 0
    || requestedId > nextEventId;

  if (historyExpired || invalidOrFutureId) {
    writeSseEvent(response, {
      id: nextEventId,
      type: "snapshot",
      data: latestFeedUpdate
    });
    return;
  }

  for (const event of sseHistory) {
    if (event.id > requestedId) {
      writeSseEvent(response, event);
    }
  }
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, APP_ORIGIN);

  if (request.method !== "GET") {
    response.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      "Allow": "GET"
    });
    response.end("Method not allowed");
    return;
  }

  if (requestUrl.pathname === "/events") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    });
    response.flushHeaders();
    response.write("retry: 3000\n\n");
    response.write(": connected\n\n");
    sseClients.add(response);
    replaySseEvents(response, request.headers["last-event-id"]);
    response.on("close", () => sseClients.delete(response));
    return;
  }

  const entry = publicFiles.get(requestUrl.pathname);

  if (!entry) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(path.join(PUBLIC_DIRECTORY, entry.file), (error, contents) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Could not read the example file");
      return;
    }

    response.writeHead(200, { "Content-Type": entry.type });
    response.end(contents);
  });
});

const webSocketServer = new WebSocketServer({
  noServer: true,
  maxPayload: MAX_CHAT_BYTES
});

server.on("upgrade", (request, socket, head) => {
  const requestUrl = new URL(request.url, APP_ORIGIN);

  if (requestUrl.pathname !== "/ws") {
    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    socket.destroy();
    return;
  }

  if (request.headers.origin !== APP_ORIGIN) {
    socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
    socket.destroy();
    return;
  }

  webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
    webSocketServer.emit("connection", webSocket, request);
  });
});

webSocketServer.on("connection", (webSocket) => {
  webSocket.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });

  webSocket.on("message", (rawData) => {
    if (rawData.length > MAX_CHAT_BYTES) {
      webSocket.close(1009, "Message too large");
      return;
    }

    let message;

    try {
      message = JSON.parse(rawData.toString("utf8"));
    } catch {
      webSocket.send(JSON.stringify({
        type: "error",
        message: "Send a valid JSON chat message."
      }));
      return;
    }

    if (message?.type !== "chat" || typeof message.text !== "string") {
      webSocket.send(JSON.stringify({
        type: "error",
        message: "Unsupported message format."
      }));
      return;
    }

    const text = message.text.trim();

    if (!text || text.length > MAX_CHAT_LENGTH) {
      webSocket.send(JSON.stringify({
        type: "error",
        message: `Messages must contain 1 to ${MAX_CHAT_LENGTH} characters.`
      }));
      return;
    }

    const chatMessage = JSON.stringify({
      type: "chat",
      text,
      sentAt: new Date().toISOString()
    });

    for (const client of webSocketServer.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(chatMessage);
      }
    }
  });
});

const keepalive = setInterval(() => {
  for (const response of sseClients) {
    if (!response.destroyed && !response.writableEnded) {
      response.write(": keepalive\n\n");
    }
  }
}, 15000);

const feedTimer = setInterval(() => {
  latestFeedUpdate = {
    count: ++feedCount,
    updatedAt: new Date().toISOString()
  };
  publishSseEvent("feed-update", latestFeedUpdate);
}, 2000);

server.listen(PORT, "localhost", () => {
  console.log(`Open ${APP_ORIGIN}`);
});

function shutDown() {
  clearInterval(keepalive);
  clearInterval(feedTimer);

  for (const response of sseClients) {
    response.end();
  }

  for (const client of webSocketServer.clients) {
    client.close(1001, "Server shutting down");
  }

  server.close(() => process.exit(0));
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
```

The WebSocket server accepts only the exact local demo origin and `/ws` path. It limits payload size, parses and validates each JSON message, then broadcasts only a normalized text and timestamp. The SSE server sends `text/event-stream`, event IDs, a retry interval, and comment keepalives. It retains the last 50 events in memory and uses `Last-Event-ID` to replay them. If the requested cursor is invalid or too old, it sends a snapshot of the current feed state.

This server is for local learning. It has no user authentication, persistent event history, production TLS setup, or rate limiter. A deployed service must add those controls and configure an explicit allowed-origin policy.

## Run the example

From the `realtime-demo` directory, install dependencies and start the server:

```sh
npm install
npm start
```

Open `http://localhost:3000` in two browser tabs. Send a message in one tab and see it appear in both. The feed counter updates every two seconds. Stop the server with `Ctrl+C`.

## Expected output

- The WebSocket status changes to **Chat connected**.
- The SSE status changes to **Update feed connected**.
- The feed shows an increasing update number, server time, and last event ID.
- A chat message sent in either tab appears in both tabs with a timestamp.
- If a temporary network interruption closes the SSE stream, `EventSource` retries. The server replays the retained events after the last ID, or sends a current snapshot if that ID is no longer in memory.
- The WebSocket does not retry by itself. Use **Reconnect chat** after it disconnects.

## How the pieces work together

1. The browser loads `index.html` and `client.js` from the same local origin.
2. The client opens `/ws` with the browser's native WebSocket API and `/events` with `EventSource`.
3. The server checks the WebSocket URL and `Origin` before completing the upgrade.
4. The server validates incoming chat JSON and message length, then broadcasts a normalized message to open clients.
5. Each browser creates DOM nodes and assigns message text with `textContent`.
6. The server sends SSE update events with increasing IDs and keeps a bounded in-memory history.
7. On SSE reconnect, the browser sends `Last-Event-ID`. The server replays newer retained events or sends a snapshot when replay is no longer possible.
8. When the page is hidden permanently, the client closes its WebSocket and `EventSource`. If the page returns from the back-forward cache, it opens new connections.

## What to notice

- The page uses separate endpoints for the two transports.
- The chat is bidirectional, while the feed is one-way.
- WebSocket reconnection is an explicit UI action in this small example.
- SSE reconnects automatically, but replay works only because this server stores a limited event history.
- The history is in memory, so a server restart loses it.
- `Origin` validation is a useful browser-origin check, not user authentication.
- Incoming chat content is inserted as text, not parsed as HTML.
- The server imposes message-size and chat-length limits.
- The server's local HTTP setup is not suitable for a deployed production service.

## Try it yourself

- Open several tabs and check that every connected tab receives a chat message.
- Stop and restart the server. Observe that the chat closes and the SSE stream reports a connection error.
- Temporarily block the `/events` request in browser developer tools, then restore it and observe event replay.
- Change `MAX_HISTORY` to a small number, interrupt the feed, and observe the snapshot path.
- Add a named SSE event such as `announcement` and listen for it with `addEventListener()`.
- Add a protocol version field to chat messages and reject unsupported versions on the server.
- Set a maximum number of connected clients and decide how the server responds when it is reached.
- Add authentication and per-room authorization before allowing production messages.
- Add a reconnect policy with exponential backoff for WebSockets, then provide a way to cancel it.

## Important limits

This example demonstrates connection flow, basic validation, safe rendering, and bounded in-memory SSE replay. It does not provide user accounts, persistence across process restarts, durable chat history, message acknowledgements, exactly-once delivery, production TLS termination, or a production rate limiter. The event IDs support replay only while the corresponding entries remain in this process's history.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [115 - Web Components, custom elements, and Shadow DOM](../examples/115-web-components-custom-elements-and-shadow-dom.md) | [Open lesson](../lessons/116-websockets-server-sent-events-and-real-time-updates.md) | [Open Q&A](../qnas/116-websockets-server-sent-events-and-real-time-updates.md) | [117 - Permissions, geolocation, and device APIs](../lessons/117-permissions-geolocation-and-device-apis.md) |
