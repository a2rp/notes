# 05. Transport Layer: TCP and UDP

Ports, sockets, TCP reliability and control, UDP behavior, and choosing a transport.

### What is the Transport Layer

The Transport Layer (Layer 4 in OSI) delivers data from one application to another application. It sits above IP (Internet Protocol) and adds the idea of ports, reliability, ordering, and flow control.

App data - TCP or UDP - IP - Network

IP (Internet Protocol) moves packets host to host. TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) move data app to app using ports.

### Port numbers and sockets

A port is a logical number that identifies which application or service should receive the data on a machine. One IP address can run many services, ports separate them.

Port

A number in range 0 to 65535. Example: HTTPS uses port 443

Socket

An endpoint of communication. Usually written as IP:Port. Example: 192.168.1.10:5173

Connection

For TCP, a connection is identified by a 4-tuple. Source IP, Source Port, Destination IP, Destination Port

One server can handle thousands of clients because each client connection has a different 4-tuple.

### TCP vs UDP (quick compare)

Point

TCP

UDP

Full form

Transmission Control Protocol

User Datagram Protocol

Connection

Connection-oriented

Connectionless

Ordering

Keeps order (sequence numbers)

No ordering guarantee

Reliability

Reliable (ACK + retransmit)

Best effort

Speed

More overhead

Less overhead

Rule: use TCP when correctness matters, use UDP when speed and low delay matter.

### TCP features (explained)

#### 1) 3-way handshake

TCP starts with a handshake to create a connection and agree on initial sequence numbers.

SYN - SYN-ACK - ACK

- **SYN** - Synchronize. Client says "I want to start a connection".

- **ACK** - Acknowledgment. Receiver says "I received your message".

- **SYN-ACK** - Server replies "I agree, and I also acknowledge your SYN".

This handshake helps TCP start reliably and prevents confusion between old and new packets.

#### 2) Sequence number and ACK

TCP breaks data into segments. Each segment has a **sequence number** that helps the receiver put data back in correct order. Receiver sends **ACK** with the next expected sequence number.

Seq=1000 Segment sent

ACK=1200 Receiver expects next byte from 1200

If a segment is missing, ACK does not move forward and sender can retransmit.

#### 3) Flow control (window)

Flow control prevents a fast sender from overwhelming a slow receiver. Receiver tells the sender how much buffer space it has using a **window**.

- **Window** - how much data can be in flight without waiting for ACK.

- If receiver is busy, it advertises a smaller window.

- This protects the receiver from memory overload.

Think: window is receiver-side capacity control.

#### 4) Congestion control (high level)

Congestion control protects the network, not just the receiver. Congestion means routers and links are overloaded, causing packet loss and delays.

- TCP adjusts its sending rate depending on loss and delay signals.

- It increases speed when network is fine, and decreases when congestion is detected.

- **cwnd** - congestion window, a limit decided by TCP based on network conditions.

Think: window is receiver capacity, cwnd is network capacity.

#### 5) Retransmission

Retransmission means sending data again when it is lost. TCP detects loss using timeouts or repeated ACK patterns.

- If ACK does not arrive in time, sender retransmits (timeout).

- If receiver keeps ACKing the same number, sender suspects a missing segment (duplicate ACK).

- This is why TCP is reliable.

Reliability comes from tracking sequence numbers and resending missing parts.

### UDP features and use cases

UDP is simple and fast. It sends datagrams without creating a connection. There is no handshake, no ordering guarantee, and no built-in retransmission.

- Low overhead - minimal header, fast processing

- Best for real-time where late data is useless

- Apps can implement reliability if needed

video streaming voice calls online games DNS queries DHCP

Example: In a call, it is better to drop an old packet than to wait and create delay.

### Common port numbers (must know)

Many services have standard ports. You should remember the common ones for interviews and debugging.

Port

Protocol

Use

20, 21

FTP

File Transfer Protocol

22

SSH

Secure Shell (remote login)

23

Telnet

Unencrypted remote login

25

SMTP

Simple Mail Transfer Protocol

53

DNS

Domain Name System

67, 68

DHCP

Dynamic Host Configuration Protocol

80

HTTP

Hypertext Transfer Protocol

110

POP3

Post Office Protocol v3

143

IMAP

Internet Message Access Protocol

443

HTTPS

HTTP Secure (HTTP over TLS)

3306

MySQL

Database

5432

PostgreSQL

Database

6379

Redis

In-memory data store

TCP is common for HTTP and HTTPS. DNS mostly uses UDP, but it can use TCP for large responses.
