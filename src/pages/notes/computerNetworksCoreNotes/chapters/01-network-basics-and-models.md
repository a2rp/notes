# 01. Network Basics and Models

Core terms, network types, topologies, and the OSI and TCP/IP models.

### What is a network

A computer network is a group of devices connected so they can communicate and share data. Devices can be phones, laptops, servers, printers, smart TVs, routers, and switches.

Data is sent in small pieces called packets. Packets travel across cables or Wi-Fi and pass through devices like switches and routers until they reach the destination.

Device - Switch - Router - Internet

Switch usually connects devices inside a LAN. Router connects different networks.

### Network types and full forms

LAN

Local Area Network Example: home Wi-Fi, office network, college lab

MAN

Metropolitan Area Network Example: city-level network, large campus across a city

WAN

Wide Area Network Example: internet, bank branches connected across states

PAN

Personal Area Network Example: Bluetooth earphones, smartwatch, phone hotspot

Easy memory: PAN is around one person, LAN is one place, WAN is huge.

### Topologies

Topology means the shape of connections in a network. It is about how devices are linked, not the physical location.

- **Star** - all devices connect to one central device (switch or router) Example: most office and home networks

- **Mesh** - devices have many connections with each other Example: some wireless mesh Wi-Fi systems

- **Bus** - one main cable shared by many devices Example: older Ethernet setups, not common now

- **Ring** - each device connects to two neighbors, forming a loop Example: older ring networks, some industrial systems

In real networks, star and partial mesh are most common.

### Bandwidth vs throughput vs latency vs jitter

Bandwidth

Maximum capacity of a network link. Example: a 100 Mbps plan is bandwidth capacity

Throughput

Actual useful speed you get in real life. Example: you might get 60 Mbps on a 100 Mbps plan

Latency

Time delay for data to travel from source to destination. Example: ping shows 20 ms latency

Jitter

Variation in latency over time. Example: voice call breaks when delay keeps changing

Video calls and gaming need low latency and low jitter, not only bandwidth.

### OSI model (Open Systems Interconnection)

OSI stands for Open Systems Interconnection. It is a 7-layer model used to understand how networking works. It is mainly a learning and troubleshooting model.

Each layer has a specific job. When you send data, it moves from layer 7 down to layer 1. At the receiver, it moves from layer 1 up to layer 7.

Layer

Meaning

Examples

7 - Application

User-level network services

HTTP, DNS, SMTP

6 - Presentation

Format, encryption, compression

TLS, JSON, UTF-8

5 - Session

Session control and continuity

Session concepts, RPC

4 - Transport

Reliable delivery, ports

TCP, UDP

3 - Network

IP addressing and routing

IPv4, IPv6, ICMP

2 - Data Link

Local delivery using MAC

Ethernet, ARP, VLAN

1 - Physical

Bits on wire or air

Cable, fiber, Wi-Fi signal

Full forms: HTTP is Hypertext Transfer Protocol, DNS is Domain Name System, SMTP is Simple Mail Transfer Protocol, TLS is Transport Layer Security, TCP is Transmission Control Protocol, UDP is User Datagram Protocol, IP is Internet Protocol, ICMP is Internet Control Message Protocol, ARP is Address Resolution Protocol, VLAN is Virtual Local Area Network.

### TCP-IP model (Transmission Control Protocol - Internet Protocol)

TCP-IP stands for Transmission Control Protocol and Internet Protocol. It is the model used by the internet in real systems. Most diagrams show 4 layers.

TCP-IP layer

OSI mapping

Application

OSI 5, 6, 7

Transport

OSI 4

Internet

OSI 3

Link

OSI 1, 2

Some books show 5 layers by splitting Link into Data Link and Physical.

### Encapsulation and decapsulation

Encapsulation means each layer adds its own header while sending data down the stack. Decapsulation means headers are removed while data moves up the stack at the receiver.

Application

Data

Transport

TCP or UDP header + data

Network

IP header + segment

Data Link

MAC header + packet + trailer

Physical

Bits on wire or air

Common naming: data becomes segment, then packet, then frame, then bits.
