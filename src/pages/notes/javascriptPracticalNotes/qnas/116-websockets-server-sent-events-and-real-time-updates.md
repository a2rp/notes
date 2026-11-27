# 116 - WebSockets, Server-Sent Events, and real-time updates: Q&A

Use these questions to review realtime communication patterns, WebSocket state, Server-Sent Events, reconnect behavior, and security. Each answer appears directly after its question.

## Multiple-choice questions

### 1. A browser and server must send frequent messages to each other over one persistent connection. Which option fits best?

A. WebSocket  
B. Server-Sent Events  
C. A static HTML file  
D. A CSS animation

**Answer: A. WebSocket.**

**Explanation:** WebSockets are bidirectional. SSE is designed for server-to-browser events.

### 2. Which API is designed for a browser that mostly receives server updates over HTTP?

A. `EventSource`  
B. `MutationObserver`  
C. `WebSocketStream`  
D. `localStorage`

**Answer: A. `EventSource`.**

**Explanation:** `EventSource` consumes a server-sent event stream and automatically attempts to reconnect after many interruptions.

### 3. Which WebSocket URL scheme should a deployed HTTPS page normally use?

A. `file://`  
B. `ws://`  
C. `wss://`  
D. `ftp://`

**Answer: C. `wss://`.**

**Explanation:** The secure WebSocket scheme protects the connection with TLS. `ws://` is appropriate for local development or explicitly unencrypted contexts.

### 4. When is it safe for a browser WebSocket to call `send()`?

A. When `readyState` is `CONNECTING`  
B. When `readyState` is `OPEN`  
C. At any time after construction  
D. Only after a `close` event

**Answer: B. When `readyState` is `OPEN`.**

**Explanation:** Calling `send()` while connecting throws. A client should check the connection state.

### 5. Which value reports bytes of outgoing WebSocket application data queued for transmission?

A. `socket.bufferedAmount`  
B. `socket.readyState`  
C. `socket.protocol`  
D. `socket.extensions`

**Answer: A. `socket.bufferedAmount`.**

**Explanation:** This can help an application detect that it is producing outgoing data faster than it is being sent.

### 6. Which content type should a server use for an SSE response?

A. `application/json`  
B. `text/event-stream`  
C. `text/html`  
D. `application/octet-stream`

**Answer: B. `text/event-stream`.**

### 7. What ends an SSE event block?

A. A single space  
B. A semicolon  
C. A blank line  
D. The end of each `data:` line

**Answer: C. A blank line.**

**Explanation:** The browser dispatches the event when it processes the terminating blank line.

### 8. Which SSE field names a non-default event type?

A. `type:`  
B. `event:`  
C. `name:`  
D. `kind:`

**Answer: B. `event:`.**

**Explanation:** A named event can be handled with `source.addEventListener("event-name", handler)`.

### 9. What does an SSE `id:` field support?

A. Automatic durable storage in the browser  
B. A cursor that can be sent as `Last-Event-ID` after reconnecting  
C. User authentication by itself  
D. Two-way client messages

**Answer: B.**

**Explanation:** The server must retain and replay events if the application needs missed messages to be resent. The ID alone does not provide replay.

### 10. What does an SSE `retry:` field specify when it contains only digits?

A. The number of bytes to buffer  
B. A reconnection delay in milliseconds  
C. The number of events to replay  
D. A WebSocket close code

**Answer: B.**

### 11. Which method stops an `EventSource` from reconnecting?

A. `source.stop()`  
B. `source.close()`  
C. `source.abort()`  
D. `source.disconnect()`

**Answer: B. `source.close()`.**

### 12. What does a colon-prefixed line such as `: keepalive` do in an SSE stream?

A. Dispatches a message whose data is `keepalive`  
B. Sets the event ID  
C. Acts as a comment and dispatches no event  
D. Closes the connection

**Answer: C.**

**Explanation:** SSE comments can be used as keepalive traffic without producing an application event.

## True or false

### 13. The browser's WebSocket API automatically reconnects after the connection closes.

**Answer: False.**

**Explanation:** Reconnection is an application responsibility. Implement a policy with limits, backoff, and cancellation if needed.

### 14. `EventSource` automatically retries after many temporary connection interruptions.

**Answer: True.**

**Explanation:** The browser's EventSource processing model includes reconnection behavior. Calling `close()` stops it.

### 15. Adding an SSE `id:` makes the server replay all missed messages automatically.

**Answer: False.**

**Explanation:** The browser can send `Last-Event-ID`, but the server must keep event history and implement replay.

### 16. A WebSocket message containing valid JSON is automatically safe to trust.

**Answer: False.**

**Explanation:** JSON parsing only checks syntax. The server still has to validate the message schema, authorize the requested action, and enforce size and rate limits.

### 17. The browser WebSocket API exposes methods for sending protocol ping and pong control frames.

**Answer: False.**

**Explanation:** The browser API does not expose those control-frame methods. WebSocket servers can use ping and pong at the protocol layer to check liveness.

### 18. CORS configuration alone replaces WebSocket origin validation and authorization.

**Answer: False.**

**Explanation:** Servers should validate browser origins when relevant and authenticate and authorize each connection and action. CORS is not a substitute for those checks.

### 19. Multiple SSE `data:` lines in one event are combined with newline characters.

**Answer: True.**

### 20. An SSE stream can be used by the browser to send application messages back to the server over that same stream.

**Answer: False.**

**Explanation:** SSE delivers events from server to browser. Use a separate HTTP request for client actions or choose a bidirectional transport.

### 21. A WebSocket connection guarantees durable, exactly-once processing of every message.

**Answer: False.**

**Explanation:** Durable delivery and deduplication require application-level IDs, acknowledgements, persistence, and retry rules.

### 22. It is usually safer to put incoming chat text into the page with `textContent` than with `innerHTML`.

**Answer: True.**

**Explanation:** `textContent` treats the value as text instead of parsing it as markup.

## Short-answer questions

### 23. What is the main communication-direction difference between WebSockets and SSE?

**Answer:** WebSockets carry application messages in both directions. SSE sends events from the server to the browser; client actions use a separate request.

### 24. What does the `close` event on a WebSocket report?

**Answer:** It includes a close `code`, a `reason`, and `wasClean`, which indicates whether the closing handshake completed cleanly.

### 25. What is the difference between `WebSocket.CONNECTING` and `WebSocket.OPEN`?

**Answer:** `CONNECTING` means the opening handshake has not finished. `OPEN` means the connection is established and messages can be sent.

### 26. Why might an application monitor `bufferedAmount`?

**Answer:** To notice when outgoing WebSocket data is accumulating faster than it can be transmitted, then slow or limit its producer.

### 27. How does a browser know which SSE event listener to call for this block?

```text
event: stock-change
data: {"symbol":"XYZ"}

```

**Answer:** It dispatches an event named `stock-change`. The page can register with `source.addEventListener("stock-change", handler)`.

### 28. What information can the browser send back to an SSE server after reconnecting?

**Answer:** If an earlier event set an ID, the browser can include it in the `Last-Event-ID` request header.

### 29. Why should a server validate the `Origin` header during a browser WebSocket handshake?

**Answer:** It helps the server reject connections initiated from untrusted browser origins, which matters especially when authentication cookies are sent with the handshake.

**Explanation:** Origin validation does not replace authentication or authorization. The server must still check who the user is and what actions they may perform.

### 30. What is the purpose of a WebSocket subprotocol?

**Answer:** It lets the client and server agree on an application-level protocol during the opening handshake, such as a particular message format or protocol version.

### 31. What is one limit of native browser `EventSource` request configuration?

**Answer:** It does not provide the general custom-header configuration available with `fetch()`. It supports a URL and a `withCredentials` option.

### 32. How can SSE event comments help a deployment?

**Answer:** A server can send comment lines periodically as keepalive traffic. This can help prevent some intermediaries from treating an otherwise idle stream as dead.

### 33. What additional work is needed for reliable replay after an SSE reconnect?

**Answer:** The server needs to retain events, read the reconnecting client's last event ID, and replay the appropriate missing events. The client should tolerate repeats.

### 34. Why should an application not promise exactly-once message delivery based only on a persistent connection?

**Answer:** A connection can fail before the sender knows whether a message was processed. Exactly-once effects require application-level acknowledgement, durable state, retry rules, and deduplication.

## Code and design questions

### 35. Complete the code so it sends a message only when the WebSocket is open.

```js
if (socket.readyState === WebSocket.____) {
  socket.send(JSON.stringify({ type: "refresh" }));
}
```

**Answer:**

```js
if (socket.readyState === WebSocket.OPEN) {
  socket.send(JSON.stringify({ type: "refresh" }));
}
```

### 36. Write a browser listener for the named SSE event `job-progress` that parses JSON from `event.data`.

**Answer:**

```js
source.addEventListener("job-progress", (event) => {
  const progress = JSON.parse(event.data);
  console.log(progress);
});
```

**Explanation:** Parsing can fail if the server sends malformed JSON, so production code should handle parse errors.

### 37. How should this WebSocket message be rendered if `message.text` came from another user?

```js
const item = document.createElement("li");
// Add message.text to item safely.
```

**Answer:**

```js
item.textContent = message.text;
```

**Explanation:** Do not insert untrusted message data with `innerHTML`.

### 38. Write code to stop an SSE stream when a view is permanently removed.

**Answer:**

```js
source.close();
```

**Explanation:** Closing the source prevents automatic reconnection. A view that can be temporarily hidden may have a different lifecycle policy.

### 39. A server receives this message, but accepts it because `JSON.parse()` succeeded. What other checks should it perform?

```json
{"type":"delete-room","room":"private"}
```

**Answer:** Validate the message type and field values, enforce message size and rate limits, authenticate the sender, and authorize that sender to delete that room. Do not assume a valid JSON shape is permission to perform the action.

### 40. An application needs server-to-client notifications and occasional client actions. It does not need frequent two-way messages. Name a simple design.

**Answer:** Use SSE for notifications and ordinary HTTP requests for client actions.

**Explanation:** A separate bidirectional WebSocket is not required unless the product needs its capabilities.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [115 - Web Components, custom elements, and Shadow DOM](115-web-components-custom-elements-and-shadow-dom.md) | [Open lesson](../lessons/116-websockets-server-sent-events-and-real-time-updates.md) | [Open example](../examples/116-websockets-server-sent-events-and-real-time-updates.md) | [117 - Permissions, geolocation, and device APIs](../lessons/117-permissions-geolocation-and-device-apis.md) |
