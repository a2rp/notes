# 28. Load Balancing

How traffic is spread across multiple servers for capacity and resilience.

Load balancing

Load balancing distributes incoming traffic across multiple servers so no single server is overloaded. It improves scalability, reliability, and performance.

Multiple servers Traffic distribution High availability Scalability

Load balancing

Click to collapse with real world examples

### Why load balancing is needed

If 10,000 users hit one server at the same time, that server may crash or slow down. Instead, we place a **load balancer** in front of multiple servers.

Simple architecture



```text
Users
   |
   v
Load Balancer
   |    |    |
   v    v    v
Server1 Server2 Server3

The load balancer decides which server handles each request.
```



### What a load balancer does

Distribute traffic

Spreads incoming requests across available servers.

Health checks

Stops sending traffic to servers that are down.

Failover

Automatically shifts traffic if a server crashes.

SSL termination

Handles HTTPS decryption to reduce load on backend servers.

### Load balancing algorithms

Round Robin

Sends requests one by one in order. Simple and common.

Least Connections

Sends request to the server with the fewest active connections.

IP Hash

Same client IP always goes to the same server.

Intuition

Round Robin is fair. Least Connections is smarter when some requests are heavy and long running.

### Horizontal vs Vertical scaling

Vertical scaling

Increase power of one server. More CPU, more RAM.

Horizontal scaling

Add more servers and use load balancing.

Real example



```text
Vertical:
Upgrade from 8GB RAM to 32GB RAM.

Horizontal:
Add 3 more servers and place load balancer in front.
```



### L4 vs L7 load balancing

Layer 4

Works at transport layer (TCP or UDP). Routes based on IP and port.

Layer 7

Works at application layer (HTTP). Can route based on URL path or headers.

Example routing



```text
example.com/api -> Server A
example.com/images -> Server B

This is Layer 7 load balancing.
```



### Sticky sessions

Sticky sessions mean the same user always connects to the same backend server. Useful when session data is stored in memory.

Better approach

Store session in Redis or database so any server can handle any user.

### Full forms and terms

CPU - Central Processing Unit

RAM - Random Access Memory

TCP - Transmission Control Protocol

UDP - User Datagram Protocol

HTTP - HyperText Transfer Protocol

HTTPS - HyperText Transfer Protocol Secure

### How to explain in interviews

- "Load balancing distributes traffic across multiple servers to improve scalability and availability."

- "Round Robin is simple. Least Connections adapts better under uneven load."

- "Layer 7 load balancer can route based on URL paths."

- "Horizontal scaling combined with load balancing supports large traffic."
