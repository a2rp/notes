# 10. Network Devices and Tools

Routers, switches, access points, firewalls, and practical diagnostic commands.

### Hub vs Switch vs Router

These devices look similar, but they work at different layers and make very different decisions.

Device

Layer

Decision based on

Beginner example

Hub

Physical layer (Layer 1)

No decision - broadcasts everything

Like a loud speaker - everyone hears the same data

Switch

Data Link layer (Layer 2)

MAC address (Media Access Control address)

Sends frames only to the correct port inside a LAN

Router

Network layer (Layer 3)

IP address (Internet Protocol address)

Connects different networks and forwards packets

- **MAC** - Media Access Control - hardware address used inside a local network

- **IP** - Internet Protocol - logical address used across networks

- Switch learns a **MAC table** to know which device is on which port

- Router uses a **routing table** to choose the next hop toward destination IP

Quick memory: switch is inside a network, router connects networks.

### Modem meaning

**Modem** means **MO**dulator **DEM**odulator. It converts signals so your home network can talk to your Internet Service Provider.

- **ISP** - Internet Service Provider - the company that gives you internet

- In many homes, the modem is built into the router device you get from the ISP

- Fiber setups often use an **ONT** - Optical Network Terminal - similar role for fiber

Router manages your home network. Modem connects your network to the ISP line.

### NAT device role

**NAT** means **Network Address Translation**. It lets many devices in your private network share one public IP address on the internet.

192.168.0.10 - NAT router - Public IP

- **Private IP** - used inside home or office network, not directly reachable from internet

- **Public IP** - visible on the internet, used to reach your network from outside

- NAT keeps a translation table mapping internal connections to the public IP and ports

NAT is one reason most home devices are not directly exposed to the internet.

### Reachability and path tools

ping ICMP

Checks if a host is reachable and measures round trip time.

**ICMP** - Internet Control Message Protocol

traceroute or tracert

Shows the route packets take by listing hops (routers) between you and a destination.

Uses TTL (Time To Live) changes to reveal each hop.

First check ping, then check traceroute to see where it is failing.

### DNS lookup tools

nslookup DNS

Basic tool to query domain name records and see IP addresses.

**DNS** - Domain Name System - converts names to IP addresses

dig DNS

Advanced DNS lookup tool. Shows detailed answers and timings.

dig is very useful for debugging CNAME, A, AAAA, MX records.

Many "site not opening" issues are DNS problems, not server issues.

### Local network info tools

ipconfig Windows

Shows your IP address, gateway, DNS servers, and adapter details.

Linux and macOS use ifconfig or ip addr.

ifconfig Linux or macOS

Shows network interfaces and their IP configuration.

Modern Linux often prefers ip addr and ip route.

If you do not know your gateway or DNS, start with ipconfig or ip addr.

### Connection and port tools

netstat network statistics

Shows active connections, listening ports, and routing table info.

Often used to check if a port is open on your machine.

ss socket statistics

Faster modern alternative to netstat on Linux.

**Socket** means IP plus port endpoint used by apps.

telnet port test

Can test if a TCP port is reachable, but telnet is not secure for real login use.

Example: telnet example.com 80 checks if port 80 is reachable.

nc netcat

Powerful tool to test TCP or UDP ports, send data, and listen on ports.

**nc** is short for netcat. Common for quick port checks.

curl client URL

Makes HTTP requests from terminal to test APIs, headers, redirects, and TLS.

curl is the fastest way to confirm if your API is responding.

For dev debugging: check if server is listening, then check if client can reach the port.

### Wireshark packet sniffing

**Wireshark** is a packet analyzer. It captures network traffic and shows packet details like IP, TCP, DNS, and HTTP fields.

- Useful for seeing if DNS queries are happening and what response you get

- Useful for checking TCP handshake and retransmissions

- Helps confirm what is actually sent on the wire

Packet sniffing means capturing packets. It is used for debugging, not hacking.

### Reading an IP and route quickly

When you see an IP like 192.168.1.25-24, the "-24" is CIDR. It means the first 24 bits are the network part and the rest is host part.

CIDR

Classless Inter-Domain Routing - notation like 10.0.0.5-16

Gateway

The router address used to reach outside your local network

Route

Rule that says where to send packets for a destination network

Next hop

The next router IP that will forward your packet

- Fast check on Linux: **ip addr** for IP, **ip route** for route

- Fast check on Windows: **ipconfig** for IP, **route print** for routes

- If gateway is wrong, internet will not work even if Wi-Fi is connected

Debug habit: confirm your IP, confirm gateway, confirm DNS, then test a public IP, then test a domain.
