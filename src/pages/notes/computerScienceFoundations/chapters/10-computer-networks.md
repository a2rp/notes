# 10. Computer Networks

The network stack, core protocols, and communication between hosts.

Computer Networks

Computer Networks is the study of how devices communicate. It explains how data moves from your browser to a server and back using IP, TCP, HTTP, DNS, and more.

OSI model TCP vs UDP DNS HTTPS and SSL Load balancing WebSockets

Computer Networks

Click to collapse with clear terms and beginner examples

### What networks solve

Networks let one machine talk to another. The hard part is making it reliable, secure, and fast across millions of devices.

Real life

You type a URL, hit Enter, and the page loads. Under the hood, your device finds the server IP using DNS, opens a connection, sends an HTTP request, and receives an HTTP response.

Why it matters

Debugging slow APIs, random timeouts, and connection errors becomes easier when you understand the flow.

### OSI model (full form and layers)

**OSI** means **Open Systems Interconnection**. It is a conceptual model of networking in 7 layers. Most real stacks follow the same idea, even if they combine layers.

7 Application HTTP, DNS

User level protocols. Your browser and apps.

6 Presentation Encoding

Data format, compression, encryption style.

5 Session Sessions

Starts, manages, and ends sessions.

4 Transport TCP, UDP

End to end delivery - reliability and ordering.

3 Network IP

Routing between networks - chooses the path.

2 Data Link Ethernet, WiFi

Local network delivery - frames and MAC addresses.

1 Physical Cables, radio

Bits as signals on wire or air.

Beginner shortcut

For web dev, remember - HTTP on top of TCP on top of IP.

### TCP vs UDP

**TCP** means **Transmission Control Protocol**. It is reliable and ordered.
**UDP** means **User Datagram Protocol**. It is faster but does not guarantee delivery or ordering.

TCP

- Connection based (handshake)

- Reliable delivery

- Ordered packets

- Congestion control

UDP

- No handshake

- Best effort delivery

- No ordering guarantee

- Lower overhead

Examples



```text
TCP use cases
- HTTP and HTTPS web traffic
- File downloads
- Email

UDP use cases
- Video calls and live streaming
- Online gaming
- DNS queries (often UDP)

Reason - some apps prefer speed over perfect reliability.
```



### HTTP lifecycle (a web request)

**HTTP** means **Hypertext Transfer Protocol**. It is the request response protocol of the web.

1 - DNS lookup

Find the server IP for the domain.

2 - Connect

TCP handshake (and TLS handshake for HTTPS).

3 - Request

Send HTTP method, path, headers, body.

4 - Response

Server returns status code, headers, body.

5 - Render

Browser parses HTML, downloads assets, executes JS.

6 - Keep alive

Connection can be reused for more requests.

Mini example



```text
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json

Response
HTTP/1.1 200 OK
Content-Type: application/json
{ "users": [ ... ] }
```



### HTTPS and SSL

**HTTPS** means **HTTP Secure**. It is HTTP over **TLS** (Transport Layer Security). People often say SSL, but modern security uses TLS.

What HTTPS gives

- Encryption - nobody can read your traffic

- Integrity - data cannot be changed silently

- Authentication - you are talking to the real server

Simple mental model

Browser checks certificate, agrees on keys, then encrypts everything in the connection.

SSL vs TLS

SSL means Secure Sockets Layer. TLS replaced SSL. People still say SSL as a habit.

### DNS

**DNS** means **Domain Name System**. It converts a domain name into an IP address. Humans remember names, machines route using IP.

Example



```text
example.com -> 93.184.216.34

If DNS fails, you get errors like
- DNS_PROBE_FINISHED_NXDOMAIN
- Could not resolve host
```



Common records

- A - points to IPv4 address

- AAAA - points to IPv6 address

- CNAME - alias to another name

- TXT - verification and policies

- MX - mail server routing

Caching

DNS responses are cached for a TTL (Time To Live). This is why changes can take time.

### Load balancing

A **load balancer** sits in front of servers and distributes incoming requests so one server does not get overloaded.

Why it is used

- Scale traffic across many servers

- Improve reliability (failover)

- Enable rolling deployments

Strategies

- Round robin

- Least connections

- IP hash (sticky sessions)

Example



```text
Client -> Load Balancer -> Server A
                         -> Server B
                         -> Server C

If Server B is down, traffic goes to A and C.
```



### WebSockets

**WebSockets** is a protocol that keeps a persistent connection between client and server. It allows two way communication, not just request response.

Use cases

- Chat apps

- Live dashboards

- Real time notifications

- Multiplayer games

Why not HTTP

HTTP is request response. WebSockets keeps one connection open so server can push updates instantly.

Simple example



```text
HTTP
Client: request
Server: response
Connection often closes

WebSocket
Client and server stay connected
Both can send messages any time
```



### Full forms and key terms

OSI - Open Systems Interconnection

TCP - Transmission Control Protocol

UDP - User Datagram Protocol

IP - Internet Protocol

HTTP - Hypertext Transfer Protocol

HTTPS - Hypertext Transfer Protocol Secure

DNS - Domain Name System

TLS - Transport Layer Security

TTL - Time To Live

When something fails in production, ask this - DNS, TCP, TLS, HTTP, server, or database. Networks gives you that map.

### Mini practice

Q Why does HTTPS feel slower than HTTP sometimes?

A Because HTTPS adds a TLS handshake and encryption work, especially for new connections. Reusing connections helps.

Q Why is UDP used for live streaming?

A Dropping some packets is better than waiting. Speed matters more than perfect delivery.

### How to say it in interviews

- "HTTP/1.1 and HTTP/2 commonly use TCP; HTTP/3 uses QUIC over UDP."

- "DNS resolves a domain to an IP and is heavily cached using TTL."

- "HTTPS is HTTP over TLS, providing encryption, integrity, and authentication."

- "WebSockets keeps a persistent connection for two way real time messaging."
