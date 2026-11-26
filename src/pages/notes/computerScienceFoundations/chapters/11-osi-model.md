# 11. OSI Model

The seven-layer reference model and what each layer contributes.

OSI model

OSI model means Open Systems Interconnection model. It is a 7 layer framework that explains how data moves from one device to another over a network. It helps you understand where each networking concept fits.

7 layers Data travel map Debugging guide Interview must know

OSI model

Click to collapse with layers, examples, and a real request walk through

### What is OSI used for

OSI is not a protocol you install. It is a learning and debugging model. When something breaks, you can ask "which layer is failing".

Why engineers love it

- Makes networking less confusing

- Helps locate issues quickly

- Explains where TCP, IP, HTTP fit

- Standard interview framework

Quick example

If WiFi is off, it is a lower layer problem. If WiFi works but website does not load, it may be DNS or HTTP.

### The 7 layers - top to bottom

7
Application
user level

What apps use to communicate. Examples: HTTP, HTTPS, WebSocket, FTP.

6
Presentation
format

Data format and encryption concepts. Examples: JSON, UTF-8, TLS idea.

5
Session
conversation

Manages a connection session and keeps it alive. Example idea: login session, connection control.

4
Transport
end to end

Reliable or fast delivery. Examples: TCP, UDP. Ports live here.

3
Network
routing

Finds a path across networks. Examples: IP, routers. Addresses live here.

2
Data Link
local hop

Moves data inside the same network. Examples: Ethernet, MAC address, switches.

1
Physical
signals

Actual bits over cable or air. Examples: fiber, copper, radio, WiFi signal.

In real life, internet uses TCP IP model more commonly, but OSI is still the best way to explain and debug.

### Real example - opening a website

When you open a site like "example.com", data travels down the layers on your machine, then across the network, then up the layers on the server.

7 - Application

Browser creates an HTTP request.

4 - Transport

HTTPS over HTTP/1.1 or HTTP/2 commonly uses TCP port 443. HTTP/3 commonly uses UDP port 443.

3 - Network

IP routes packets to server address.

2 - Data Link

Ethernet or WiFi delivers frames on local network.

1 - Physical

Bits travel as signals.

Server side

Reverse happens. Server replies with HTTP response.

Tiny mapping



```text
URL -> DNS lookup (commonly placed around layer 7)
HTTP request -> layer 7
TLS encryption -> layer 6 idea
TCP connection -> layer 4
IP routing -> layer 3
WiFi or Ethernet -> layer 2
Signals -> layer 1
```



### Layer mapping table

Layer

What it does

Examples

7

App protocols

HTTP, HTTPS, WebSocket

6

Format and encrypt

UTF-8, JSON, TLS idea

5

Session control

Session keep alive

4

Transport end to end

TCP, UDP, ports

3

Routing

IP, routers

2

Local delivery

Ethernet, MAC, switches

1

Signals

Cables, radio, fiber

### Common interview and debugging lines

Website not loading

Check layer 1 to 3 first - WiFi, IP, routing - then DNS, then HTTP.

TCP vs UDP belongs to

Transport layer (layer 4).

IP address belongs to

Network layer (layer 3).

Easy memory trick

"Please Do Not Throw Sausage Pizza Away" - Physical, Data link, Network, Transport, Session, Presentation, Application.

### Full forms

OSI - Open Systems Interconnection

TCP - Transmission Control Protocol

UDP - User Datagram Protocol

IP - Internet Protocol

TLS - Transport Layer Security

MAC - Media Access Control

OSI is your map. Protocols are the roads. If you can place a concept into a layer, you can explain it clearly.

### Mini practice

Q Which layer handles routing between networks?

A Network layer (layer 3).

Q Which layer handles ports and reliable delivery?

A Transport layer (layer 4) using TCP.

### Next topics

TCP vs UDP

HTTP lifecycle

HTTPS and SSL

DNS
