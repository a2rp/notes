# 06. Application Layer Protocols

DNS, HTTP, TLS, DHCP, email protocols, and common application-layer workflows.

### HTTP vs HTTPS with TLS overview

**HTTP** means "Hypertext Transfer Protocol". It is the request-response protocol used by browsers and APIs. It sends data as plain text by default.

**HTTPS** means "Hypertext Transfer Protocol Secure". It is HTTP running over **TLS**, which means "Transport Layer Security". TLS encrypts data in transit and also helps verify the server identity using certificates.

HTTP

No encryption. Easier to sniff on public Wi-Fi. Mostly used only for test or internal.

HTTPS

Encrypted with TLS. Protects login, cookies, and private data.

Quick TLS idea: browser and server do a handshake, agree on keys, then encrypt all traffic.

### DNS basics and records

**DNS** means "Domain Name System". It converts domain names like "example.com" into IP addresses so computers can connect.

- **A** record - "Address" record for IPv4 Example: example.com - 93.184.216.34

- **AAAA** record - IPv6 address record Example: example.com - 2606:2800:220:1:248:1893:25c8:1946

- **CNAME** record - "Canonical Name" alias Example: www.example.com points to example.com

- **MX** record - "Mail Exchange" for email routing Example: mail for example.com is handled by mail.example.com

- **NS** record - "Name Server" that hosts DNS records Example: ns1.provider.com and ns2.provider.com

DNS caching is common. That is why changes can take time to fully show everywhere.

### Email basics: SMTP, IMAP, POP3

Email has two main parts - sending and receiving. Sending is usually SMTP. Receiving is IMAP or POP3.

SMTP

"Simple Mail Transfer Protocol" - used to send email from client to server and between mail servers.

IMAP

"Internet Message Access Protocol" - keeps mail on server and syncs across devices.

POP3

"Post Office Protocol version 3" - downloads mail to device, often less sync-friendly.

Modern apps mostly use IMAP for receiving because it keeps mailbox consistent across phone and laptop.

### FTP vs SFTP vs SCP

These are used to transfer files between machines. Main difference is security and how they operate.

- **FTP** - "File Transfer Protocol" Old and not secure by default. Username and password can be exposed.

- **SFTP** - "SSH File Transfer Protocol" Runs over SSH. Encrypted. Safe option for file transfer.

- **SCP** - "Secure Copy Protocol" Simple secure copy over SSH. Best for quick file copy, not a full file manager.

Memory: SFTP and SCP use SSH so they are encrypted.

### SSH basics

**SSH** means "Secure Shell". It provides a secure way to remotely login and run commands on a server. It also supports tunneling and secure file transfer.

ssh user@server - Encrypted remote terminal

SSH commonly uses port 22. Authentication can be password or key-based.

### DHCP and NTP

**DHCP** means "Dynamic Host Configuration Protocol". It automatically assigns IP address, subnet mask, gateway, and DNS server details to devices.

Discover - Offer - Request - Acknowledge

**NTP** means "Network Time Protocol". It keeps system clocks correct by syncing time from time servers. Correct time matters for logs, security, and certificates.

Broken time can break HTTPS because certificates depend on correct date and time.

### WebSockets concept

**WebSocket** is a protocol that creates a long-lived connection between browser and server. It allows two-way communication, so server can push updates instantly.

Use case: chat apps, live notifications, real-time dashboards, multiplayer games. It avoids repeated polling requests.

WebSocket usually starts as an HTTP request, then upgrades the connection.

### REST vs gRPC

**REST** means "Representational State Transfer". It is an API style that uses HTTP methods like GET, POST, PUT, DELETE, usually with JSON payloads.

**gRPC** means "Google Remote Procedure Call". It is a high-performance RPC framework. It uses Protocol Buffers and often runs over HTTP/2.

REST

Human-readable, easy for web, common for public APIs.

gRPC

Faster and strongly typed, common in microservices and internal systems.

Very high level rule: REST is simpler to start, gRPC is stronger for service-to-service.

Quick debug mindset

If a website fails: check DNS first, then ping, then ports, then TLS, then HTTP status codes.
