# 07. Distributed Systems

Coordination, consistency, replication, fault tolerance, and distributed communication.

Distributed Systems

At-a-glance revision notes for distributed models, RPC, consensus, 2PC, Paxos, Raft, consistency, and distributed locking.

Collapse

Scan "At a glance" first. Then read examples. Distributed systems are mostly about failure cases and trade-offs.

Distributed models

Quick revision points and beginner examples

At a glance

- Distributed system means multiple machines working together as one system.

- Main pain is failures and network delays, not just code.

- Design is about trade-offs: consistency, availability, latency.

What is a distributed model

A distributed model describes how components communicate and coordinate when they are running on different machines.

Unlike single-machine programs, distributed systems must handle partial failures, slow networks, and out-of-order messages.

Example

- A chat app uses multiple servers: one for authentication, one for messaging, one for storage. They coordinate over the network.

Common models

Client-server is the most common model where clients request and servers respond.

Peer-to-peer systems allow nodes to act as both client and server.

Microservices is a distributed model where each service owns a small responsibility and communicates via APIs or events.

Quick intuition

- Client-server is simpler.

- Peer-to-peer can scale but is harder to coordinate.

- Microservices improve isolation but increase coordination complexity.

Why distributed is hard

Network is unreliable: packets can be lost, delayed, duplicated, or arrive out of order.

You cannot assume all machines share the same clock or fail at the same time.

Some nodes may be alive but unreachable, creating split-brain situations.

Classic headache

- A service times out and retries, but the original request actually succeeded, causing duplicate operations.

RPC

Quick revision points and beginner examples

At a glance

- RPC makes a remote call look like a local function call.

- Failures are normal: timeouts and retries must be designed carefully.

- Idempotency is your best friend for safe retries.

What is RPC

RPC (Remote Procedure Call) lets a program call a function on another machine as if it was local.

Under the hood it does serialization, networking, and deserialization.

Example

- orderService.createOrder(userId, items) calls a remote service over the network.

Timeouts and retries

Timeout does not mean failure, it means you did not get a response in time.

Retries can cause duplicate work if the server actually processed the request.

Safe retry example

- Use an idempotency key like orderId so repeating the same request does not create multiple orders.

At-least-once vs at-most-once

At-least-once delivery means retries happen and duplicates are possible.

At-most-once delivery tries to avoid duplicates but can drop requests if not careful.

Exactly-once is extremely hard and usually simulated with idempotency and deduplication.

Mental model

- In distributed systems, you usually choose between occasional duplicates or occasional drops, then build safety around it.

Consensus algorithms

Quick revision points and beginner examples

At a glance

- Consensus means nodes agree on one value, even with failures.

- Used for leader election and replicated logs.

- Raft is easier to understand, Paxos is more theoretical.

What is consensus

Consensus algorithms help a group of machines agree on a single decision like who is leader or what the next log entry is.

This is critical when nodes can fail or messages can be delayed.

Example

- A database cluster needs one leader to accept writes. Consensus elects that leader.

When you need consensus

Leader election: choose one leader among many nodes.

Replicated state machine: keep multiple copies of data in sync using a shared log of operations.

Coordination services: configuration, locks, membership.

Real-world systems

- ZooKeeper and etcd use consensus-like mechanisms for coordination.

Two phase commit

Quick revision points and beginner examples

At a glance

- 2PC coordinates a transaction across multiple services or databases.

- Phase 1 asks if everyone can commit, Phase 2 commits or aborts.

- Main downside is blocking if coordinator fails.

What is Two Phase Commit

Two Phase Commit (2PC) is a protocol to make multiple participants commit a transaction together.

It is used when one logical operation touches multiple databases or services and you want all-or-nothing behavior.

Example

- Transfer money: debit account service and credit another service must both commit or both rollback.

How it works

Phase 1 (prepare): coordinator asks participants to prepare and vote yes or no.

Phase 2 (commit): if all vote yes, coordinator tells everyone to commit, else abort.

Simple flow

- Coordinator -> prepare

- Participants -> yes/no

- Coordinator -> commit/abort

Why it can block

If coordinator crashes after participants prepared, they may be stuck waiting.

This makes 2PC a blocking protocol and less ideal under failures.

Practical note

- Modern systems often prefer sagas and compensating actions instead of strict 2PC across services.

Paxos

Quick revision points and beginner examples

At a glance

- Paxos is a family of consensus algorithms.

- It is correct but hard to implement and explain.

- Often learned for theory, not written from scratch in apps.

What is Paxos

Paxos is a consensus protocol that ensures safety even with failures and message delays.

It uses roles like proposer, acceptor, and learner to agree on values.

Beginner intuition

- Nodes propose values, acceptors choose one based on rules that prevent conflicting decisions.

Why Paxos is famous

It proved that consensus can be achieved safely in unreliable networks under certain assumptions.

Many practical systems are inspired by Paxos or use simplified variants.

Practical reality

- You usually use existing libraries or systems rather than implementing Paxos directly.

Raft

Quick revision points and beginner examples

At a glance

- Raft is designed to be understandable and practical.

- It uses leader-based replication with a replicated log.

- Main parts: leader election, log replication, safety.

What is Raft

Raft is a consensus algorithm that keeps multiple nodes consistent by using a single leader.

The leader replicates a log of operations to followers.

Example

- A config store like etcd can use Raft so all nodes agree on the same configuration changes.

Leader election

Nodes start as followers. If they do not hear from a leader, they become candidates.

Candidates ask for votes. Majority vote wins and becomes leader.

Key idea

- Majority quorum prevents split-brain decisions.

Log replication

Clients send writes to leader. Leader appends to its log and replicates to followers.

Once a majority confirms, the entry is committed and applied.

Why it works

- Majority confirmation ensures the committed history survives node failures.

Consistency models

Quick revision points and beginner examples

At a glance

- Consistency is about what values reads can return in a distributed system.

- Strong consistency feels like a single database.

- Weaker models allow stale reads but reduce latency and improve availability.

Strong consistency

After a write completes, all reads return the latest value.

Often needs coordination like consensus or synchronous replication.

Example

- Bank balance reads should usually be strongly consistent to avoid showing wrong money.

Eventual consistency

If no new updates happen, all replicas will eventually converge to the same value.

Reads can be stale for a short time, but system stays available under partitions.

Example

- Social media like counts can be eventually consistent because slight delay is acceptable.

Trade-off mindset

Strong consistency often increases latency because nodes must coordinate.

Eventual consistency improves availability and speed but needs conflict handling.

Rule of thumb

- Money and security need stronger consistency.

- Analytics and feeds can accept eventual consistency.

Distributed locking

Quick revision points and beginner examples

At a glance

- Distributed lock coordinates access to a shared resource across machines.

- Hard because locks can get stuck if node crashes.

- Leases and timeouts help prevent permanent locks.

What is a distributed lock

A distributed lock ensures only one node performs a critical operation at a time, across a cluster.

This is useful for leader-only jobs, scheduled tasks, or preventing double processing.

Example

- Only one worker should run daily billing job even if 5 instances are running.

Why it is tricky

If a node holding the lock crashes, the lock can remain stuck unless there is a timeout or lease.

Network partitions can cause two nodes to think they have the lock if design is weak.

Classic failure

- Node A acquires lock, network splits, Node B also acquires lock and both process same job.

Leases and fencing tokens

Lease means lock expires after time unless renewed.

Fencing token is a monotonically increasing number that prevents old lock holders from making writes.

Simple safety idea

- Resource only accepts operations with the newest token, so stale nodes cannot damage data.

Locking is expensive

- Prefer designs that avoid distributed locks when possible.

- If you must lock, use proven systems like etcd or ZooKeeper and design for failure.

Interview tip - Always mention network failures, timeouts, retries, and trade-offs. In distributed systems, "works on my machine" is a joke, not a plan.
