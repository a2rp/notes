# 15. TCP vs UDP

Reliable stream delivery compared with lightweight datagrams.

TCP vs UDP

TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are two transport layer protocols. TCP focuses on reliable, ordered delivery. UDP focuses on speed and low overhead.

TCP - reliable UDP - fast TCP has retries UDP sends and moves on

TCP vs UDP

Click to collapse with clear terms and real examples

### Full forms

TCP - Transmission Control Protocol

UDP - User Datagram Protocol

IP - Internet Protocol

RTT - Round Trip Time

### One line difference

TCP is like a phone call

Connection is established, messages are acknowledged, missing parts are re-sent, and order is maintained.

UDP is like shouting messages

You send packets quickly without waiting. Some packets may be lost or arrive out of order.

### Core properties

TCP

- Connection oriented

- Reliable delivery

- Ordered bytes stream

- Retransmission on loss

- Flow control

- Congestion control

UDP

- Connectionless

- No guaranteed delivery

- No guaranteed order

- No retransmission built in

- Low overhead

- Lower latency

### What is connection oriented

**Connection oriented** means TCP first creates a connection before data transfer. This is done using the **3 way handshake**.

TCP 3 way handshake



```text
Client -> Server: SYN (I want to start)
Server -> Client: SYN-ACK (Ok, I agree)
Client -> Server: ACK (Confirmed)

Now connection is established, then data starts.
```



Why handshake matters

It adds initial delay but gives reliability and correct ordering.

### Reliability and ordering

TCP numbers data using sequence numbers and expects acknowledgements (ACK). If a packet is lost, TCP resends it. This keeps the final received stream complete and ordered.

TCP - reliable stream

You always get the correct file content, in correct order, even if the network drops some packets.

UDP - best effort packets

You may miss some updates. The app can choose to ignore missing ones or send again manually.

Small example



```text
TCP:
Send packets: 1 2 3 4
Packet 3 lost
Receiver ACKs 1 2, missing 3
Sender resends 3
Receiver finally gets 1 2 3 4 (ordered)

UDP:
Send packets: 1 2 3 4
Packet 3 lost
Receiver may see: 1 2 4 (no automatic resend)
```



### Where each is used

TCP
Use when correctness matters

- Web browsing - HTTP and HTTPS

- APIs and database connections

- File downloads

- Email and SSH

UDP
Use when speed matters

- Live video and voice calls

- Online games (position updates)

- DNS queries (often)

- Streaming telemetry

Many modern apps use UDP but build reliability at the application level when needed. Example - QUIC runs on UDP and is used for HTTP 3.

### Common confusion points

Is UDP always faster

Usually lower overhead, but if you need retries at app layer, you may lose the advantage.

Why not use TCP for video calls

Retries and strict ordering can add delay. For calls, recent data is more important than perfect old data.

Can UDP be reliable

UDP itself is not, but apps can add sequence numbers and ACK logic if needed.

### Mini practice

Q You are downloading a PDF. TCP or UDP and why

A TCP, because the file must be complete and correct. Missing packets must be resent.

Q You are building a real time multiplayer game. TCP or UDP and why

A UDP, because low latency updates matter more. If one update is missed, the next update can correct the state.

### How to say it in interviews

- "TCP is connection oriented and reliable, so it guarantees ordered delivery using sequence numbers and ACK."

- "UDP is connectionless and best effort, so it is lower overhead and great for low latency use cases."

- "If data correctness matters, pick TCP. If low latency matters and losing a little is ok, pick UDP."

Important - TCP and UDP are transport protocols. IP handles routing. HTTP is an application layer protocol that usually uses TCP.
