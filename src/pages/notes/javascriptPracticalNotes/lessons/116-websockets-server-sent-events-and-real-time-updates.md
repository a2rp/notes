# 116 - WebSockets, Server-Sent Events, and real-time updates

Many interfaces need information to arrive after the page has loaded. A dashboard might receive new measurements, a support page might show incoming messages, and a progress screen might report a job's status. The browser can get these updates by polling, by opening a server-sent events stream, or by opening a WebSocket connection.

The best choice depends on the direction of communication, delivery requirements, infrastructure, and how often data changes. A persistent connection is not automatically better than a normal HTTP request.

## Learning goals

After this lesson, you should be able to:

- compare polling, Server-Sent Events, and WebSockets;
- open, use, and close a browser WebSocket safely;
- read a server-sent event stream with `EventSource`;
- understand connection states, reconnection, event IDs, and buffering;
- validate and authorize realtime messages on the server;
- update a page without inserting untrusted data as HTML.

## Choose a communication pattern

| Pattern | Direction | Good fit | Main tradeoff |
| --- | --- | --- | --- |
| Ordinary HTTP request or polling | Client asks, server responds | Infrequent changes, simple status checks, or short tasks | Polling can create repeated requests between updates. |
| Server-Sent Events (SSE) | Server to browser | Feeds, notifications, progress, and dashboards where the browser mostly listens | The browser's `EventSource` API is a one-way stream and offers fewer request options than `fetch()`. |
| WebSocket | Browser and server in both directions | Chat, collaboration, multiplayer state, or frequent two-way messages | Both sides must manage a long-lived connection, message protocol, security, and resource limits. |

Use the simplest option that meets the product requirement. For example, polling every few minutes may be easier to operate than a permanent connection when updates are rare.

## WebSockets

A WebSocket begins with an HTTP-based opening handshake, then the connection carries messages in both directions until either side closes it. In a secure page, connect with `wss://`; use `ws://` for local development or explicitly unencrypted environments.

The browser API is event based:

```js
const socket = new WebSocket("wss://example.test/live");

socket.addEventListener("open", () => {
  socket.send(JSON.stringify({ type: "subscribe", room: "news" }));
});

socket.addEventListener("message", (event) => {
  console.log("Server sent:", event.data);
});

socket.addEventListener("error", () => {
  console.error("The WebSocket connection reported an error.");
});

socket.addEventListener("close", (event) => {
  console.log("Closed:", event.code, event.reason, event.wasClean);
});
```

### Connection states

`readyState` tells you whether the connection is opening, open, closing, or closed:

| State | Meaning |
| --- | --- |
| `WebSocket.CONNECTING` | The opening handshake is in progress. |
| `WebSocket.OPEN` | Messages can be sent and received. |
| `WebSocket.CLOSING` | A close handshake is in progress or the connection is closing. |
| `WebSocket.CLOSED` | The connection is closed or could not be opened. |

Only call `send()` when the state is `OPEN`. Calling it while connecting throws. `send()` accepts text strings, `Blob`, `ArrayBuffer`, and typed array views. Applications commonly serialize small structured messages as JSON strings.

```js
if (socket.readyState === WebSocket.OPEN) {
  socket.send(JSON.stringify({ type: "typing", active: true }));
}
```

The browser's WebSocket API does not expose control-frame ping and pong methods. Servers and protocol implementations can use those control frames to detect dead connections. The browser does expose `bufferedAmount`, which reports queued outgoing application bytes. If an application sends faster than the network can transmit, the queue can grow. Limit message rates and sizes, and use `bufferedAmount` as one signal when producing frequent updates.

### Define an application message protocol

WebSocket transports messages. Your application still has to define what each message means. A small JSON protocol might use a `type` field and a well-defined payload:

```json
{"type":"chat-message","room":"support","text":"Can someone help?"}
```

On both client and server:

1. parse the message and reject malformed JSON;
2. validate its shape, type, field lengths, and permitted values;
3. authenticate the connection and authorize the requested action;
4. handle the message without assuming the sender is trusted;
5. encode output safely when showing it in a page.

Do not use `innerHTML` for untrusted message text. Create an element and assign its `textContent` instead.

### Close deliberately

Call `close()` when the connection is no longer needed, such as when a view is permanently removed. It can take a close code and a short reason within the API's permitted limits:

```js
socket.close(1000, "View closed");
```

The `close` event reports a code, reason, and whether the close handshake completed cleanly. A network loss can end a connection without a clean close. The browser does not automatically reconnect a WebSocket. If the feature needs reconnection, write an explicit policy with bounded backoff, cancellation, and a way to avoid opening duplicate connections.

## Server-Sent Events

Server-Sent Events use a long-lived HTTP response with the `text/event-stream` media type. The browser's `EventSource` API listens for server messages and attempts to reconnect when the connection is interrupted.

```js
const source = new EventSource("/events");

source.addEventListener("open", () => {
  console.log("Event stream connected.");
});

source.addEventListener("message", (event) => {
  console.log("Default event:", event.data);
});

source.addEventListener("price-update", (event) => {
  const update = JSON.parse(event.data);
  console.log("Price:", update.value);
});

source.addEventListener("error", () => {
  console.log("The stream closed or is trying to reconnect.");
});
```

An event stream is UTF-8 text. Each event consists of optional fields and ends with a blank line:

```text
event: price-update
id: 42
data: {"symbol":"XYZ","value":18.25}

```

Common fields are:

- `data:` carries event data. Multiple `data:` lines are joined with newline characters.
- `event:` sets a named event type. Without it, the type is `message`.
- `id:` sets the event ID. During reconnection, the browser can send the last ID in a `Last-Event-ID` request header.
- `retry:` sets the reconnection delay in milliseconds when its value contains only digits.
- A line that starts with `:` is a comment and does not dispatch an event. Servers can send comments as keepalive traffic where needed.

The server must finish an event with a blank line. Sending only a final partial block without the blank line does not dispatch that event.

### Reconnection and event IDs

`EventSource` reconnects automatically after many connection interruptions. The server can include an `id:` field so a reconnecting request carries a `Last-Event-ID` header. This gives the server a cursor it can use to replay missed events.

An event ID alone does not make an application reliable. The server must retain enough history and implement replay. The client should tolerate a repeated event, and the server should make state-changing operations idempotent when possible. If replay is not implemented, events sent while disconnected can still be missed.

Call `source.close()` when the page no longer needs the stream. This stops reconnection attempts and closes the `EventSource` object. `readyState` is `CONNECTING`, `OPEN`, or `CLOSED`; `CONNECTING` can mean either the first connection or a reconnect attempt.

### Request constraints

The native `EventSource` constructor accepts a URL and a `withCredentials` option. It does not offer the general custom-header configuration available with `fetch()`. If a protocol requires custom request headers, binary messages, or browser-to-server messages over the same connection, consider a different design such as `fetch()` streaming or WebSockets.

SSE is a server-to-client stream. The browser sends a normal HTTP request to establish it, but does not send application messages back on that stream. Use a separate HTTP request for client actions.

## Keep a realtime interface responsive and safe

### Connection state is part of the interface

Tell users when a live feature is connecting, online, reconnecting, or unavailable if that affects their task. Do not announce every incoming update to assistive technology if that would overwhelm the user. Use an appropriate status region for meaningful state changes and let users pause or dismiss rapidly changing content where needed.

Keep a connection's ownership clear. If a page component creates a socket or event source, close it when that component is permanently removed. A hidden tab is not necessarily a removed page, so decide whether to retain or pause connections based on the feature's needs.

### Security belongs on the server

A browser connection is not authorization. For every connection and message, the server should:

- authenticate the user using the application's normal identity mechanism;
- authorize access to each requested room, stream, or operation;
- validate the request `Origin` for WebSocket handshakes when browser origins matter;
- validate every message's type, fields, and size;
- rate limit expensive or abusive work;
- avoid broadcasting private data to the wrong recipients;
- use `wss://` in production and protect credentials and logs.

WebSocket handshakes can include cookies, so a server that trusts cookies must consider cross-site WebSocket hijacking. Verify allowed origins and enforce authorization. CORS settings alone do not replace WebSocket origin checks or message-level authorization.

SSE endpoints also need normal authentication, authorization, and data privacy checks. If cookies are included cross-origin, configure the allowed origin and credentials deliberately. Never use a state-changing GET endpoint merely because it is convenient for an event stream.

### Capacity and delivery limits

A long-lived connection consumes server and proxy resources. Set connection limits and message-size limits. Handle idle timeouts, proxies, and deployment restarts. Use server-side ping/pong for WebSocket liveness where appropriate; use SSE comments as keepalive traffic when the deployment requires them.

Neither transport automatically provides durable delivery, exactly-once processing, or storage. If those guarantees matter, design message IDs, acknowledgements, replay, deduplication, and persistent state at the application layer.

## WebSocket and SSE comparison

| Need | Consider | Why |
| --- | --- | --- |
| Client and server both need to send frequent messages | WebSocket | The connection is bidirectional. |
| Browser mostly receives updates | SSE | The browser API is designed for an HTTP event stream and reconnects automatically. |
| Small, occasional status changes | Polling or a normal request | It may be easier to understand and operate than a permanent connection. |
| Resume missed events after reconnect | SSE with retained event IDs, or an application protocol over WebSocket | Resumption requires server history and application logic. |
| Binary messages | WebSocket | The browser API can send and receive binary data. |
| Custom authorization headers on the browser's stream request | Fetch-based design or another API | Native `EventSource` has limited request configuration. |

## Common mistakes

- Choosing WebSockets for a one-way feed without comparing SSE or polling.
- Assuming WebSockets reconnect automatically.
- Sending before the WebSocket reaches `OPEN`.
- Letting outgoing buffers or server queues grow without limits.
- Treating event IDs as proof that missed messages are replayed.
- Forgetting the blank line that ends an SSE event.
- Assuming `EventSource` supports custom request headers.
- Treating `Origin` checks, CORS, or an open socket as user authorization.
- Trusting JSON because it parsed successfully.
- Rendering a message with `innerHTML` instead of `textContent`.
- Leaving page-owned connections open after their view is destroyed.
- Promising exactly-once delivery without implementing acknowledgements and deduplication.

## Key points

- Polling, SSE, and WebSockets solve different update patterns.
- WebSockets provide two-way messages; SSE provides a server-to-browser event stream.
- WebSocket clients need explicit connection-state handling and an intentional reconnect policy.
- SSE uses UTF-8 text events, named event types, optional IDs, and automatic reconnect behavior.
- Event replay, authorization, validation, deduplication, and durable storage are application responsibilities.
- Set resource limits, close unused connections, and render incoming content as text.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [115 - Web Components, custom elements, and Shadow DOM](115-web-components-custom-elements-and-shadow-dom.md) | [Open Q&A](../qnas/116-websockets-server-sent-events-and-real-time-updates.md) | [Open example](../examples/116-websockets-server-sent-events-and-real-time-updates.md) | [117 - Permissions, geolocation, and device APIs](117-permissions-geolocation-and-device-apis.md) |
