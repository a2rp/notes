# 16. WebSockets

Persistent two-way communication between a browser and a server.

WebSockets

WebSockets is a protocol that creates a persistent, two way (full duplex) connection between client and server. After a one time handshake, both sides can send messages anytime without creating a new HTTP request each time.

Persistent connection Real time Two way messaging Low latency Works with WSS

WebSockets

Click to collapse with clear terms and practical examples

### What problem it solves

HTTP is request response. The browser asks, server replies, connection often closes or becomes idle. For real time apps, doing this again and again is wasteful and adds delay.

Without WebSockets

Chat app does polling every 2 seconds using HTTP.
- extra requests
- higher latency
- more server load

With WebSockets

One connection stays open.
- server pushes messages instantly
- client can send anytime
- less overhead

### Core idea

WebSockets starts as an HTTP handshake, then upgrades to a WebSocket connection. After that, both sides exchange small "frames" (messages) over the same connection.

Step 1 - Handshake

Browser sends HTTP request with "Upgrade: websocket".

Step 2 - Upgrade

Server replies "101 Switching Protocols".

Step 3 - Messages

Both can send messages anytime until connection closes.

Handshake mental model



```text
Client -> Server (HTTP)
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade

Server -> Client
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade

Now protocol is WebSocket, not normal HTTP.
```



### Full form and terms

WS - WebSocket (ws scheme)

WSS - WebSocket Secure (ws over TLS)

TLS - Transport Layer Security

Full duplex - two way communication at the same time

Security

Use wss in production so traffic is encrypted, similar to https.

### Where WebSockets is used

Live dashboards - logs, metrics, alerts

Chat and messaging apps

Multiplayer games and live collaboration

Notifications and server push updates

### Example - simple message flow

Think of it like a phone call. Once connected, you do not dial again for every sentence.

Flow



```text
Client connects (ws or wss)
Server accepts
Client sends: "join room-1"
Server sends: "welcome"
Server sends: "user123 joined"
Client sends: "hello everyone"
Server broadcasts to room-1
```



### WebSockets vs HTTP polling vs SSE

HTTP polling Client repeatedly asks. Simple but wasteful.

SSE Server Sent Events. One way server to client. Great for updates, not for two way chat.

WebSockets Two way, persistent, best for real time interaction.

Use WebSockets when you need two way real time messaging. Use SSE when you only need server to client updates. Use polling when you want the simplest fallback.

### Mini practice

Q Why is WebSockets faster than polling for chat messages?

A Because the connection stays open and the server can push messages instantly without creating a new HTTP request every time.

Q What should you use in production - ws or wss?

A Use wss so traffic is encrypted using TLS.

### Interview lines

- "WebSockets upgrades an HTTP connection into a persistent full duplex channel."

- "After handshake, both client and server can push messages anytime."

- "Use wss in production because it is ws over TLS."
