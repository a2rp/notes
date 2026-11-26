# 12. Must-Know Networking Q&A

A quick review of common networking terms, protocol behavior, security, and troubleshooting.

## Network Basics and Models

### What is a computer network

A computer network is a group of interconnected devices that communicate and share data using standardized protocols.

### What is a protocol

A protocol is a defined set of rules that governs how data is transmitted and received over a network. Example: HTTP, TCP, DNS.

### What is a packet

A packet is a small unit of data sent across a network. It contains headers and payload.

### Difference between packet, segment and frame

Segment is Transport layer data unit, Packet is Network layer data unit, Frame is Data Link layer data unit.

### What is bandwidth

Bandwidth is the maximum capacity of a link measured in Mbps or Gbps.

### What is throughput

Throughput is the actual data transfer rate achieved in real conditions.

### What is latency

Latency is the time delay between sending and receiving data, usually measured in milliseconds.

### What is jitter

Jitter is the variation in latency over time.

### What is LAN

LAN stands for Local Area Network. It connects devices within a small area like a home or office.

### What is WAN

WAN stands for Wide Area Network. It connects networks across large geographic areas. The internet is a WAN.

### What is PAN

PAN stands for Personal Area Network. Example: Bluetooth connection between phone and earphones.

### What is network topology

Topology defines how devices are physically or logically connected. Example: star, mesh, bus, ring.

## OSI and TCP-IP

### Explain OSI model

OSI stands for Open Systems Interconnection. It is a 7 layer conceptual model used to understand networking functions.

### Name OSI layers

Physical, Data Link, Network, Transport, Session, Presentation, Application.

### Which layer does a router work on

Router works at Layer 3 which is the Network layer.

### Which layer does a switch work on

Switch works at Layer 2 which is the Data Link layer.

### What is encapsulation

Encapsulation is the process where each layer adds its header while sending data down the stack.

### What is decapsulation

Decapsulation is removing headers at each layer while receiving data.

### Explain TCP-IP model

TCP-IP model has 4 layers: Application, Transport, Internet, and Link.

### Map OSI to TCP-IP

OSI 5,6,7 map to Application. OSI 4 maps to Transport. OSI 3 maps to Internet. OSI 1,2 map to Link.

## IP Addressing and Subnetting

### What is an IP address

IP address uniquely identifies a device in a network using Internet Protocol.

### What is IPv4

IPv4 is 32 bit addressing format written as four octets. Example: 192.168.1.1.

### What is IPv6

IPv6 is 128 bit addressing format designed to replace IPv4.

### What is CIDR

CIDR stands for Classless Inter-Domain Routing. It uses slash notation like /24 to define subnet mask.

### What is subnet mask

Subnet mask separates network portion and host portion of an IP address.

### What is private IP range

10.0.0.0/8, 172.16.0.0 to 172.31.255.255, 192.168.0.0/16.

### What is NAT

NAT stands for Network Address Translation. It translates private IP addresses to public IP addresses.

### What is DHCP

DHCP stands for Dynamic Host Configuration Protocol. It automatically assigns IP addresses.

### Explain DORA process

DORA means Discover, Offer, Request, Acknowledge. It is the DHCP handshake.

### What is default gateway

Default gateway is the router that forwards traffic outside the local network.

## Routing

### What is routing

Routing is the process of forwarding packets between networks.

### What is routing table

Routing table stores network paths and next hop information.

### Static vs dynamic routing

Static routing is manually configured. Dynamic routing uses protocols like OSPF or BGP.

### What is ICMP

ICMP stands for Internet Control Message Protocol. Used for error reporting and ping.

### What is TTL

TTL stands for Time To Live. It limits packet lifetime in hops.

### What is traceroute

Traceroute shows the path packets take across routers using TTL.

## Transport Layer TCP vs UDP

### Difference between TCP and UDP

TCP is reliable and connection oriented. UDP is faster and connectionless.

### What is three way handshake

TCP connection setup process using SYN, SYN-ACK, ACK.

### What is SYN

SYN is synchronize flag used to initiate TCP connection.

### What is ACK

ACK stands for acknowledgement confirming receipt of data.

### What is flow control

Flow control ensures sender does not overwhelm receiver.

### What is congestion control

Congestion control prevents network overload by adjusting transmission rate.

## Application Layer and Ports

### Port number of HTTP

HTTP default port is 80.

### Port number of HTTPS

HTTPS default port is 443.

### Port number of SSH

SSH default port is 22.

### Port number of FTP

FTP default port is 21.

### Port number of DNS

DNS default port is 53.

### What is DNS

DNS stands for Domain Name System. It converts domain names into IP addresses.

### What is HTTP

HTTP stands for HyperText Transfer Protocol. It is used to transfer web pages.

### What is HTTPS

HTTPS is HTTP over TLS encryption.

### POP3 vs IMAP

POP3 downloads emails locally. IMAP syncs emails across devices.

## Security Basics

### What is TLS

TLS stands for Transport Layer Security. It encrypts communication over the network.

### Symmetric vs asymmetric encryption

Symmetric uses one key for encryption and decryption. Asymmetric uses public and private key pair.

### What is hashing

Hashing converts data into fixed length output. It is one way.

### What is firewall

Firewall filters network traffic based on rules.

### What is VPN

VPN stands for Virtual Private Network. It creates secure encrypted tunnel.

### What is MITM attack

MITM means Man In The Middle attack where attacker intercepts communication.

## Performance and Troubleshooting

### What is packet loss

Packet loss means packets fail to reach the destination.

### What is MTU

MTU stands for Maximum Transmission Unit. It defines maximum packet size.

### What is PMTUD

PMTUD stands for Path MTU Discovery. It finds smallest MTU along path.

### What is QoS

QoS stands for Quality of Service. It prioritizes certain traffic types.

### What is caching

Caching stores data temporarily to reduce repeated network requests.

### What is keep alive

Keep alive allows reuse of TCP connection for multiple requests.

### Why can I ping IP but not domain

DNS resolution may be failing even though connectivity exists.

### What happens when you type a URL

DNS lookup, TCP handshake, TLS handshake, HTTP request, server response.
