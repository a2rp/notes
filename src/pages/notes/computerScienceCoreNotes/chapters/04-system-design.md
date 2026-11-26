# 04. System Design

Scalability, reliability, architecture tradeoffs, and distributed application patterns.

System Design

At-a-glance revision notes for scalability, reliability, databases, caching, messaging, and architecture patterns.

Collapse

Scan "At a glance" first, then read examples. In interviews, always explain trade-offs.

Basics

Beginner notes with short examples

At a glance

- Scalability is about handling growth smoothly.

- Availability is about being up when users need you.

- Reliability is about doing correct work consistently.

- CAP theorem explains trade-offs in distributed systems.

Scalability

Scalability means your system can handle more load by adding resources without breaking.

Two common types are vertical scaling (bigger machine) and horizontal scaling (more machines).

A scalable design avoids single bottlenecks and supports adding capacity gradually.

Example

- If traffic doubles, you can add 2 more app servers behind a load balancer.

- If a single database is the bottleneck, you may add read replicas or shard the data.

Availability

Availability means the system is reachable and usable when needed.

High availability uses redundancy so if one part fails, another takes over.

Downtime can come from deployments, crashes, network issues, or bad configuration.

Example

- Two app servers in different zones. If one zone goes down, users still get responses.

- Health checks remove unhealthy servers automatically.

Reliability

Reliability means the system works correctly over time and produces correct results.

A system can be available but not reliable if it returns wrong data or loses requests.

Reliability comes from good testing, safe deployments, retries with limits, idempotency, and strong observability.

Example

- Payment API returns success only after the transaction is confirmed and recorded safely.

- Using idempotency keys prevents double charging if clients retry.

CAP theorem

CAP says a distributed system cannot guarantee Consistency, Availability, and Partition tolerance at the same time.

Partition tolerance means the system continues operating even if network splits happen.

In real distributed systems, partitions can happen, so the main trade-off becomes Consistency vs Availability during partition.

Quick intuition

- CP system: prefers correctness, may reject or delay requests during partition.

- AP system: prefers staying available, may serve slightly stale data during partition.

Practical tip: always add timeouts, retries with limits, and monitoring.

Architecture

Beginner notes with short examples

At a glance

- Monolith is simpler to start, microservices scale teams and domains.

- Client-server is the baseline for most apps.

- Load balancer spreads traffic, reverse proxy protects and routes traffic.

Monolith vs Microservices

Monolith is one codebase and usually one deployable unit. It is easier to build and debug early.

Microservices split the system into smaller services. Each service owns a domain and can be deployed independently.

Microservices add complexity: network calls, distributed tracing, deployment coordination, and versioning.

Example

- Monolith: ecommerce app in one backend.

- Microservices: auth service, catalog service, orders service, payments service.

Client-server

Client is the app that requests data, server is the app that processes requests and returns responses.

Clients can be web, mobile, desktop, or other services.

APIs define how clients talk to servers. HTTP with JSON is common.

Example

- Browser requests /products, server returns product list as JSON.

Load balancer

A load balancer distributes incoming requests across multiple servers.

It improves availability and scalability by avoiding a single overloaded server.

It also performs health checks and can stop sending traffic to unhealthy instances.

Example

- Round robin sends each request to the next server.

- Least connections sends to the server with fewer active connections.

Reverse proxy

A reverse proxy sits in front of your servers and routes requests to the correct backend.

It can handle SSL termination, caching, compression, security headers, and rate limiting.

It hides internal server structure from the public internet.

Example

- Reverse proxy routes /api to backend and / to frontend static site.

- It can block suspicious traffic before it reaches your app servers.

Practical tip: always add timeouts, retries with limits, and monitoring.

Database Scaling

Beginner notes with short examples

At a glance

- Replication improves read capacity and availability.

- Sharding splits data across databases to scale writes and storage.

- Partitioning splits data inside a database to manage large tables.

Replication

Replication copies data from a primary database to one or more replicas.

Read replicas increase read throughput and can help during failover.

Replication can be synchronous (stronger consistency, slower writes) or asynchronous (faster, can be slightly stale).

Example

- Primary handles writes, replicas handle reads for product browsing.

- During failover, a replica can be promoted to primary.

Sharding

Sharding splits data across multiple databases so each shard stores only a subset of data.

It helps when a single database cannot handle write load or storage size.

Sharding requires a shard key, like userId, to decide where data lives.

Example

- Users with userId 0-1M in shard A, 1M-2M in shard B.

- Orders are routed to shard based on customerId.

Partitioning

Partitioning splits a large table into smaller parts within the same database.

It improves query performance and maintenance by scanning smaller partitions.

Common strategies are range partitioning by date and hash partitioning by id.

Example

- Logs table partitioned by month so queries for last 7 days scan only current partition.

Practical tip: always add timeouts, retries with limits, and monitoring.

Caching

Beginner notes with short examples

At a glance

- Caching reduces latency and database load.

- Redis is a common in-memory cache and data structure store.

- Eviction decides what to remove when cache is full.

Redis basics

Redis is an in-memory key-value store often used for caching, sessions, rate limiting, queues, and leaderboards.

It is fast because data lives in memory, but you must handle eviction and persistence settings carefully.

Common cache pattern is cache-aside: check cache first, fallback to DB, then fill cache.

Example

- Read product details: key = product:123, value = JSON of product.

- Cache-aside: if miss, fetch from DB, set in Redis with TTL.

Cache eviction strategies

Eviction strategy decides what to remove when cache is full.

LRU removes least recently used items.

LFU removes least frequently used items.

TTL based eviction removes expired items first and keeps fresh data.

Example

- Trending products stay in cache due to frequent access.

- Old rarely accessed product entries get evicted.

Common caching patterns

Cache-aside

App checks cache, on miss reads DB and writes to cache. Simple and common.

Write-through

Writes go to cache and DB together. Cache stays consistent but writes are slower.

Write-back

Writes go to cache first, DB later. Faster but risk of data loss if cache fails.

Practical tip: always add timeouts, retries with limits, and monitoring.

Messaging

Beginner notes with short examples

At a glance

- Queues decouple services and smooth traffic spikes.

- Event-driven systems react to events instead of direct calls.

- Messaging improves reliability using retries and dead letter queues.

Message queues

Message queues store tasks so producers and consumers can work independently.

They help handle spikes by buffering work and processing at a stable rate.

Queues improve reliability by allowing retries and tracking failed messages.

Example

- Order placed sends a message to queue, worker processes inventory update.

- Email sending runs asynchronously so user request stays fast.

Event driven architecture

In event-driven architecture, services publish events and other services subscribe to react.

Events represent facts like 'OrderCreated' or 'PaymentSucceeded'.

This reduces tight coupling but requires good event schemas and observability.

Example

- Orders service emits OrderCreated event.

- Analytics service consumes it and updates dashboards.

Queue terms that interviewers like

- At least once delivery means messages can be delivered more than once, consumers must be idempotent.

- Dead letter queue stores messages that fail repeatedly.

- Backpressure means slowing producers when consumers cannot keep up.

Practical tip: always add timeouts, retries with limits, and monitoring.

Design Patterns

Beginner notes with short examples

At a glance

- Rate limiter protects your system from abuse and spikes.

- API gateway is the front door for microservices.

- Circuit breaker prevents cascading failures.

Rate limiter

Rate limiting controls how many requests a client can make in a time window.

It protects against abuse and prevents one client from taking all resources.

Common algorithms include token bucket and leaky bucket.

Example

- Limit login attempts to 5 per minute per IP.

- Allow 100 requests per minute per userId for public API.

API gateway

API gateway is a single entry point for client requests in microservices.

It can handle routing, authentication, rate limiting, caching, and request aggregation.

It keeps clients simple because they call one endpoint instead of many services.

Example

- Mobile app calls gateway, gateway calls user service and orders service and combines response.

Circuit breaker

Circuit breaker stops calling a failing service for a short time to prevent overload.

It has states: closed (normal), open (blocked), half-open (test requests).

This prevents cascading failure where one broken service takes down the entire system.

Example

- If payment service is failing, circuit opens and app returns a friendly error quickly instead of hanging.

Practical usage notes

Rate limiter

Use at edge like reverse proxy or gateway. Store counters in Redis.

API gateway

Good for authentication and routing. Avoid too much business logic inside gateway.

Circuit breaker

Pair with timeouts and retries. Unlimited retries can kill systems.

Practical tip: always add timeouts, retries with limits, and monitoring.

Interview tip: describe system design using components like load balancer, cache, queue, database, and then explain bottlenecks and trade-offs.
