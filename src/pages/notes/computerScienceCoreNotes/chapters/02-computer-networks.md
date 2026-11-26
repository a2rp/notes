# 02. Computer Networks

Network models, protocols, addressing, and how computers exchange data.

Computer Networks

At-a-glance revision for OSI layers, TCP/IP, routing, transport, and web protocols with beginner examples.

Collapse

Think in layers. When something fails, locate the layer before guessing the fix.

Basics

Quick revision points and examples

At a glance

- Networks connect devices so they can share data and resources.

- OSI is a conceptual 7-layer model, TCP/IP is the practical internet stack.

- Encapsulation is wrapping data with headers as it moves down the stack.

Network types

LAN is a small local network like home or office.

WAN connects larger areas and usually involves ISPs.

PAN is personal area network like Bluetooth devices.

MAN covers a city-scale network (less common in daily dev talk).

Example

- Your phone and laptop connected via WiFi at home is LAN.

- Your home router to the internet is WAN.

OSI model

OSI has 7 layers. It is mainly used to understand and debug networking.

Layers from bottom to top are Physical, Data Link, Network, Transport, Session, Presentation, Application.

Debug mindset

- No internet? Check cable/WiFi (Physical), then IP (Network), then DNS/HTTP (Application).

TCP/IP model

TCP/IP is the real-world model used on the internet.

Common mapping is Link, Internet, Transport, Application.

OSI is more detailed, TCP/IP is more practical.

Quick mapping

- OSI Network layer roughly maps to TCP/IP Internet layer (IP).

Encapsulation

Encapsulation means each layer adds its own header around the data.

When sending, data goes down the layers and gets wrapped.

When receiving, headers are removed layer by layer (decapsulation).

Example

- HTTP data is wrapped inside TCP segment, inside IP packet, inside Ethernet frame.

Physical Layer

Quick revision points and examples

At a glance

- Physical layer is about bits over a medium, not IPs or ports.

- Bandwidth is how much data can flow, latency is how long it takes to arrive.

- Wired is stable, wireless is convenient but noisy.

Transmission media

Twisted pair (Ethernet) is common for short-distance wiring.

Fiber optic is fast and long-distance with low interference.

Wireless uses radio signals and is affected by interference and obstacles.

Example

- Fiber is used for backbone links, Ethernet for office wiring, WiFi for last meter mobility.

Bandwidth vs Latency

Bandwidth is the maximum data rate (like width of a highway).

Latency is the time delay for a packet to travel (like travel time).

High bandwidth does not guarantee low latency.

Simple intuition

- Downloading a big file needs bandwidth.

- Gaming and calls need low latency and stable jitter.

Data Link Layer

Quick revision points and examples

At a glance

- Data Link handles local delivery on the same network segment.

- MAC addresses identify devices on a local link.

- Switches forward frames using MAC tables.

MAC addressing

MAC address is a hardware-like identifier used inside a local network.

It is used for delivering frames within the same LAN.

Example

- When your laptop sends data to your router on WiFi, it uses MAC addresses at this layer.

ARP

ARP resolves IP address to MAC address on a local network.

If you know the target IP, you still need the MAC to send the frame locally.

Example

- Your laptop wants to reach 192.168.1.1 so it asks 'Who has 192.168.1.1?' and learns the router MAC.

Switching

Switches operate at Data Link layer and forward frames based on destination MAC.

They learn which MAC is on which port by observing traffic (MAC table).

Why switches help

- A hub broadcasts everywhere, a switch forwards only to the right port, reducing noise.

Network Layer

Quick revision points and examples

At a glance

- Network layer is about IP addressing and routing between networks.

- Subnetting splits a network into smaller networks.

- Routers move packets between networks.

IP addressing

IP address identifies a host on a network and helps route packets across networks.

IPv4 is 32-bit, IPv6 is 128-bit for a much larger address space.

Example

- Your laptop has a private IP like 192.168.x.x inside home network.

- Your router has a public IP assigned by ISP for the internet side.

Subnetting

Subnetting divides a large network into smaller ranges using a subnet mask or CIDR prefix.

It helps manage routing, security boundaries, and IP allocation.

Example

- 192.168.1.0/24 means 256 addresses in that subnet (0 to 255).

Routing algorithms

Routing decides the path packets take from source network to destination network.

Common ideas include distance vector and link state routing.

Quick intuition

- Routers maintain tables so they know which next hop leads closer to a network.

ICMP

ICMP is used for network diagnostics and control messages.

Ping uses ICMP echo request and echo reply to test reachability.

Example

- If ping fails, you might have routing, firewall, or connectivity issues.

Transport Layer

Quick revision points and examples

At a glance

- Transport is end-to-end communication between applications.

- TCP is reliable and ordered, UDP is fast and lightweight.

- Ports identify which app should receive the data.

TCP vs UDP

TCP provides reliable delivery with ordering, retransmissions, and congestion control.

UDP sends packets without guarantees, but with low overhead and lower latency.

Example

- TCP is used for web browsing and file downloads.

- UDP is common for live streaming, VoIP, and gaming.

3-way handshake

TCP connection starts with SYN, SYN-ACK, ACK.

This establishes initial sequence numbers and confirms both sides are ready.

Example

- Client says 'SYN' (I want to connect).

- Server says 'SYN-ACK' (ok and I also want to connect).

- Client says 'ACK' (confirmed).

Congestion control

Congestion control prevents the network from being overloaded.

TCP adjusts sending rate based on packet loss and RTT changes.

Intuition

- If too many packets drop, TCP slows down to avoid collapse.

Flow control

Flow control ensures sender does not overwhelm the receiver.

TCP uses sliding window so receiver can say how much it can handle.

Example

- A slow device can advertise a smaller receive window to reduce incoming rate.

Application Layer

Quick revision points and examples

At a glance

- This is where real app protocols live like HTTP and DNS.

- HTTPS is HTTP plus TLS encryption and identity verification.

- DNS turns human names into IP addresses.

HTTP

HTTP is the web protocol for request and response.

Common methods are GET, POST, PUT, DELETE.

Example

- Browser sends GET /products. Server returns HTML or JSON response.

HTTPS

HTTPS is HTTP over TLS, meaning data is encrypted and protected from tampering.

It also verifies the server identity using certificates.

Example

- Without HTTPS, someone on the same WiFi can sniff or modify traffic.

DNS

DNS resolves domain names into IP addresses.

Your device asks a resolver, which may ask root, TLD, and authoritative servers.

Example

- google.com becomes an IP address so your device knows where to send packets.

FTP

FTP is an older protocol for transferring files.

It is often replaced by SFTP and HTTPS-based upload for security.

Example

- FTP without encryption can expose credentials and file contents.

SMTP

SMTP is used to send emails between mail servers.

Receiving is often done via IMAP or POP3, but sending is SMTP.

Example

- Your app sends email through SMTP provider or an email API built on top of SMTP.

Advanced

Quick revision points and examples

At a glance

- NAT allows many private devices to share one public IP.

- Load balancing spreads traffic across servers for reliability and scaling.

- CDN puts content closer to users to reduce latency.

NAT

NAT translates private IP addresses to a public IP for internet access.

This is why many devices at home can share one ISP connection.

Example

- Laptop 192.168.1.10 and phone 192.168.1.11 both appear as the same public IP to the internet.

Load balancing

A load balancer distributes incoming traffic across multiple servers.

It improves availability, helps scaling, and can do health checks.

Example

- If one server fails, load balancer routes traffic to healthy servers.

CDN

CDN caches static content like images, CSS, JS at edge locations near users.

This reduces latency and decreases load on your origin server.

Example

- Your website images load faster in different countries using CDN edge caches.

Network security basics

Use HTTPS, secure DNS settings when possible, and avoid exposing services directly.

Firewalls restrict traffic, VPN encrypts tunnels, and segmentation limits blast radius.

Example

- Closing unused ports and using least privilege reduces attack surface.

Practical debugging order

- Check connectivity (WiFi, cable) then IP and gateway then DNS then HTTP.

- Many 'internet down' issues are actually DNS issues.

Interview tip - Always explain network problems with a layer-based approach and mention trade-offs like latency vs throughput and reliability vs speed.
