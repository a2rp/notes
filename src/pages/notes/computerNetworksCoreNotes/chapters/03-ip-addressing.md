# 03. IP Addressing

IPv4 and IPv6 addressing, subnetting, CIDR, private ranges, NAT, and address planning.

### IPv4 format and CIDR

IPv4 is a 32-bit address written as four numbers separated by dots. Each part is 0 to 255.

192.168.1.25 example IPv4 address

192.168.1.0/24 CIDR - first 24 bits are network

CIDR tells how many bits belong to the network part. The remaining bits are for hosts inside that network.

Quick memory: /24 often means 255.255.255.0

### Subnetting essentials

Subnetting splits a bigger network into smaller networks. It helps manage IPs, routing, and isolation.

- **Network ID** identifies the network. It is the first address of the subnet.

- **Broadcast** last address of the subnet. Used to reach all hosts on that subnet.

- **Usable range** IPs between network id and broadcast. Used by devices.

192.168.1.0/24

Network id: 192.168.1.0

Broadcast: 192.168.1.255

Usable: 192.168.1.1 to 192.168.1.254

Many networks block broadcast usage directly by clients, but the concept is important.

### Subnet mask meaning

A subnet mask tells which part is network and which part is host. In a mask, network bits are 1 and host bits are 0.

CIDR

/24

Mask

255.255.255.0

Meaning

first 24 bits are network, last 8 bits are hosts

In troubleshooting, wrong subnet mask is a very common reason for "no internet".

### Private IPv4 ranges

Private IPs are used inside homes and companies. They are not routed on the public internet.

10.0.0.0/8

10.x.x.x - very large private space

172.16.0.0/12

172.16.x.x to 172.31.x.x

192.168.0.0/16

192.168.x.x - common home routers

Your router usually gives private IPs to devices using DHCP.

### NAT (SNAT and DNAT idea)

NAT is Network Address Translation. It lets private IP devices access the internet using a public IP on the router.

- **SNAT** Source NAT - outgoing traffic source IP changes from private to public.

- **DNAT** Destination NAT - incoming traffic destination changes to an internal device.

192.168.1.10 - laptop inside home

Public IP - router uses this on the internet

Port forwarding is DNAT in a common home setup.

### DHCP (DORA flow)

DHCP automatically gives your device an IP address, subnet mask, gateway, and DNS settings.

D

**Discover** device asks "is there a DHCP server"

O

**Offer** server offers an IP and config

R

**Request** device requests that offered IP

A

**Ack** server confirms and lease starts

If DHCP fails, you often see "no IP" or "self-assigned IP" issues.

### IPv6 basics

IPv6 is a 128-bit address written in hex groups separated by colons. It exists because IPv4 addresses are limited and the internet needs more unique addresses.

Format

2001:0db8:85a3:0000:0000:8a2e:0370:7334

Shorthand rules

- Leading zeros can be removed in a group
- One longest run of consecutive zeros can be replaced with "::"

Common types

**Global** - public internet reachable
**Link-local** - starts with fe80:: , used inside local link
**Multicast** - starts with ff00::

Why IPv6 exists

More address space, better end-to-end connectivity, simpler address assignment ideas, less NAT dependency.

You will often see both IPv4 and IPv6 on modern systems. That is dual stack.
