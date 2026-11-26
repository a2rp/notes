# 04. Routing Basics

Routing tables, static and dynamic routes, common protocols, and packet forwarding.

### Router vs switch vs gateway

Switch

Works inside a LAN. Forwards by MAC address. Example: office switch connects many PCs

Router

Connects different networks. Forwards by IP and routing table. Example: home router connects LAN to Internet

Gateway

The exit point from your network to another network. In homes, the router is usually the gateway. Example: default gateway is 192.168.1.1

Quick memory: switch is inside, router connects outside, gateway is the exit address your device uses.

### Routing table idea

A routing table is like a map that tells the router where to send a packet next. The router looks at the destination IP, finds the best matching route, then forwards the packet to the next hop.

Destination

Next hop

Interface

192.168.1.0/24

Direct

LAN

10.0.0.0/8

10.1.1.1

WAN

0.0.0.0/0

ISP gateway

WAN

The default route 0.0.0.0/0 means "everything else goes this way".

### Default gateway

Default gateway is the IP address your device uses when the destination is outside your local network. If you are sending to a different subnet or the internet, your computer sends the packet to the gateway first.

Laptop - Default gateway - ISP - Server

If your internet is not working, check if you can ping the default gateway first.

### Static vs dynamic routing

- **Static routing** Routes are manually configured. Simple, predictable, but not flexible.

- **Dynamic routing** Routers learn routes automatically using routing protocols. Handles changes better.

Static is common in small networks. Dynamic is used when you have many routers or changing paths.

### Routing protocols (high level use)

Protocol

Used for

Simple idea

RIP

Small networks

Uses hop count as metric. Easy but limited.

OSPF

Enterprise internal routing

Chooses best path using cost. Fast convergence.

BGP

Internet wide routing

Connects ISPs and big networks. Policy based routing.

Easy memory: RIP small, OSPF enterprise, BGP internet.

### ICMP basics (ping and traceroute)

ICMP is used for network diagnostics and error reporting. It is not TCP or UDP. Ping uses ICMP Echo Request and Echo Reply to test reachability.

- **ping** Checks if a host is reachable and shows latency.

- **traceroute** Shows the path packets take across hops using TTL behavior.

If ping to gateway fails, it is likely local network issue, not DNS.

### TTL and hop concept

TTL means Time To Live. It is a number inside the IP header. Every router that forwards a packet decreases TTL by 1. If TTL reaches 0, the packet is dropped.

Start TTL 64 - Hop 1 TTL 63 - Hop 2 TTL 62 - and so on

TTL prevents infinite loops. Traceroute uses this behavior to reveal hop-by-hop path.
