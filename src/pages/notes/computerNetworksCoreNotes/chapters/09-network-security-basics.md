# 09. Network Security Basics

Threats, firewalls, VPNs, segmentation, encryption, and practical network defenses.

### CIA triad

CIA means Confidentiality, Integrity, and Availability. It is a simple way to remember what "security" is trying to protect.

- **Confidentiality** - only authorized people can read data Example: HTTPS encryption, access control

- **Integrity** - data should not be changed silently Example: hashes, digital signatures, checksums

- **Availability** - systems should stay usable Example: DDoS protection, redundancy, rate limiting

Most real incidents hit one or more CIA points.

### TLS and SSL

TLS means Transport Layer Security. SSL means Secure Sockets Layer. SSL is the older protocol family. Today, people say "SSL" in casual talk, but modern security uses TLS.

- **Goal** - secure data in transit between client and server Example: browser to website over HTTPS

- **Provides** - encryption, integrity, and server identity Identity comes from certificates (CA signed)

HTTPS is basically HTTP running inside a TLS tunnel.

### Symmetric vs asymmetric encryption

Encryption means turning readable data into unreadable data using keys. The difference is how keys are used.

Symmetric

Same key is used to encrypt and decrypt. Fast. Used for bulk data after a secure connection is established.

Asymmetric

Two keys - public key and private key. Public encrypts or verifies, private decrypts or signs. Slower. Used for key exchange and identity.

In TLS, asymmetric crypto helps start trust, symmetric crypto handles the ongoing data.

### Hashing vs encryption

Hashing and encryption are not the same. A hash is like a fingerprint of data. Encryption is reversible with the correct key.

- **Hashing** - one-way transformation Example: password hashing, file integrity check

- **Encryption** - reversible with a key Example: HTTPS traffic encryption, encrypted storage

Passwords should be hashed, not encrypted, because you should not be able to recover them.

### Authentication vs authorization

Authentication answers "Who are you" and authorization answers "What can you do". Many systems fail because they do authentication but forget strict authorization.

Authentication

Proves identity using password, OTP, token, biometrics. Example: login with email and password

Authorization

Checks permissions after identity is known. Example: only admin can delete users

Easy memory: AuthN is "name", AuthZ is "zone" access.

### Firewall basics and stateful concept

A firewall is a security system that allows or blocks network traffic based on rules. Rules can be based on IP, port, protocol, and direction.

- **Stateless firewall** - checks each packet independently Simple rules, less context

- **Stateful firewall** - tracks connection state Knows if a packet belongs to an existing allowed connection

Stateful firewalls are common because they reduce random inbound traffic and allow valid replies.

### VPN basics

VPN means Virtual Private Network. It creates an encrypted tunnel between your device and a VPN server. Your traffic travels inside this tunnel.

- **Use** - secure connection on public Wi-Fi Example: coffee shop Wi-Fi

- **Use** - access private office network remotely Example: connect to company intranet from home

VPN improves privacy on the local network, but trust shifts to the VPN provider.

### Common attacks

You do not need deep details here. Just know names, full forms, and what they mean in one line.

MITM

Man In The Middle

Attacker secretly sits between two parties and can read or alter traffic.

DNS spoofing

DNS - Domain Name System

Fake DNS answers redirect you to a wrong or malicious IP address.

ARP spoofing

ARP - Address Resolution Protocol

Attacker links their MAC address to someone else’s IP on a LAN to intercept traffic.

DDoS

Distributed Denial of Service

Many machines flood a target to make it slow or unavailable.

Phishing

Social engineering attack

Fake messages trick users into sharing passwords, OTPs, or clicking bad links.

Basic defense idea: use HTTPS, verify domains, keep MFA, and do not trust random links.
