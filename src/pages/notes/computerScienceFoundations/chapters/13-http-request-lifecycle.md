# 13. HTTP Request Lifecycle

How browser requests move through DNS, transport, HTTP, and server responses.

HTTP lifecycle

HTTP lifecycle means the full journey of a web request from your browser to a server and back - including DNS, connection setup, request, response, caching, and connection reuse.

DNS lookup TCP / QUIC connect TLS / QUIC handshake HTTP request HTTP response Keep alive

HTTP lifecycle

Click to collapse with step by step flow and examples

### What happens when you open a site

When you type a URL in the browser and press Enter, your browser must find the server, connect to it, send an HTTP request, and receive an HTTP response. That full journey is the HTTP lifecycle.

The transport depends on the HTTP version

HTTP/1.1 and HTTP/2 commonly use TCP, with TLS for HTTPS. HTTP/3 uses QUIC over UDP; QUIC integrates TLS 1.3 into its connection handshake. If UDP is blocked, browsers can fall back to a TCP-based HTTP version.

Example URL



```text
https://example.com/products?page=2

Protocol: https
Host: example.com
Path: /products
Query: page=2
```



### Step 0 - Cache checks (fast path)

Before doing any network work, the browser checks if it already has a usable response. This can be from memory cache, disk cache, or a service worker cache.

Why it matters

If cache is valid, browser can skip most steps and load instantly.

Common headers

Cache-Control, ETag, If-None-Match, Last-Modified.

### Step 1 - DNS lookup

DNS (Domain Name System) converts the domain name into an IP address. The browser asks a DNS resolver for the IP of example.com.

Simple analogy

DNS is like a phonebook - name to number mapping.

Example



```text
example.com -> 93.184.216.34 (example IP)

Browser asks:
- browser DNS cache
- OS DNS cache
- router DNS cache
- ISP or public DNS resolver
```



### Step 2 - Transport connection

For HTTP/1.1 or HTTP/2, the browser opens a TCP (Transmission Control Protocol) connection to the server. HTTP/3 uses QUIC over UDP instead. TCP and QUIC both provide reliable delivery, but set up and manage the connection differently.

Handshake

TCP uses a 3-step handshake. QUIC establishes its secure connection over UDP.

Why TCP

It guarantees ordered delivery and retransmits lost packets.

3 way handshake



```text
Client -> Server: SYN
Server -> Client: SYN-ACK
Client -> Server: ACK

Now the connection is established
```



### Step 3 - Secure connection (for HTTPS)

For HTTPS over TCP, TLS (Transport Layer Security) creates a secure channel and verifies the server using its certificate. HTTP/3 uses QUIC, which integrates TLS 1.3 into its connection handshake.

What you get

Encryption, integrity, and authentication.

Beginner view



```text
Browser and server agree on:
- cipher suite
- encryption keys

Then all HTTP data is encrypted in transit
```



### Step 4 - Send HTTP request

The browser sends an HTTP request with a method, path, headers, and optional body.

GET

Read data. Usually no body.

POST

Create data. Body contains payload.

PUT

Replace data fully.

PATCH

Update partially.

DELETE

Remove data.

Headers

Metadata like auth, content type, caching rules.

HTTP request example



```text
GET /products?page=2 HTTP/1.1
Host: example.com
Accept: text/html
User-Agent: Chrome
Cookie: sid=abc123

Body: (usually empty for GET)
```



### Step 5 - Server processing

The server receives the request, runs application logic, may talk to a database, and produces a response. If there is a load balancer, the request may be routed to one server among many.

Reverse proxy

Nginx or similar routes requests, handles TLS, and forwards to app.

App server

Node, Java, Go, etc processes routes, auth, business logic.

DB and cache

Reads and writes data, may use Redis or memory cache.

### Step 6 - HTTP response

The server sends back a response with a status code, headers, and body.

Status codes

200 OK, 301 Redirect, 404 Not Found, 500 Server Error.

Body

HTML, JSON, images, CSS, JS, or any binary data.

HTTP response example



```text
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=60
Set-Cookie: sid=abc123; HttpOnly; Secure

<html>...</html>
```



### Step 7 - Browser rendering

For a page load, the browser parses HTML, downloads CSS and JS, builds the DOM, applies styles, and paints pixels to the screen. It may also make more HTTP requests for images, fonts, and APIs.

Common surprise

One page can trigger dozens or hundreds of extra HTTP requests.

### Step 8 - Connection reuse and HTTP versions

Modern browsers reuse connections using keep-alive so they do not open a new TCP connection for every request. HTTP versions also matter for performance.

HTTP 1.1

Keep-alive possible, but many requests can still block each other.

HTTP 2

Multiplexing - many streams on one connection, better performance.

HTTP 3

Uses QUIC over UDP, reduces handshake latency in many cases.

TCP keep-alive idea (HTTP/1.1 and HTTP/2)



```text
Without keep-alive:
Request 1 -> open TCP -> close
Request 2 -> open TCP -> close

With keep-alive:
Open TCP once
Send many requests on the same connection
```



### Where time goes (latency breakdown)

If a page feels slow, it is usually one of these parts. This section helps you debug performance like a grown up.

DNS

DNS lookup delay if not cached.

Transport

TCP handshake or QUIC setup and network RTT.

TLS / QUIC

Certificate and key setup; TLS 1.3 is part of the QUIC handshake for HTTP/3.

Server

Backend processing and DB queries.

TTFB

Time To First Byte - first response byte arrival time.

Render

DOM, CSS, JS parsing and painting.

### Full forms and key terms

HTTP - Hypertext Transfer Protocol

HTTPS - Hypertext Transfer Protocol Secure

DNS - Domain Name System

IP - Internet Protocol

TCP - Transmission Control Protocol

TLS - Transport Layer Security

URL - Uniform Resource Locator

TTFB - Time To First Byte

RTT - Round Trip Time

DOM - Document Object Model

QUIC - UDP-based secure transport used by HTTP/3

UDP - User Datagram Protocol

The HTTP lifecycle is not just "send request and get response". It is a chain of dependencies. When you know the chain, you can debug slow apps and random failures with confidence.

### Mini practice

Q Why can HTTPS be slower than HTTP on the first request?

A With HTTP/1.1 or HTTP/2, TLS adds setup on the TCP connection. HTTP/3 negotiates TLS 1.3 as part of QUIC. Connection reuse and session resumption can reduce later setup.

Q What is TTFB and what usually increases it?

A Time To First Byte. It increases due to slow server work, slow DB queries, network RTT, or cold starts.

### How to say it in interviews

- "After cache and DNS, HTTP/1.1 or HTTP/2 uses TCP and TLS for HTTPS. HTTP/3 uses QUIC over UDP with TLS 1.3 in its handshake."

- "Keep-alive reduces repeated TCP handshakes. HTTP/2 multiplexing reduces blocking and improves performance."

- "Latency is often DNS, handshake, server processing, or render time. TTFB is a key metric."
