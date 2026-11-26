# 14. HTTPS and TLS

Certificates, handshakes, encryption, and authenticated web connections.

HTTPS and SSL

HTTPS (HyperText Transfer Protocol Secure) is HTTP + encryption. It uses TLS (Transport Layer Security, earlier called SSL) to protect data in transit so attackers cannot easily read or change it.

Encrypted Authentic Integrity Certificates Handshake

HTTPS and SSL

Click to collapse with beginner explanation and examples

### What HTTPS gives you

HTTPS protects data traveling between your browser and the server. It mainly provides 3 guarantees:

Confidentiality

Data is encrypted so attackers cannot read it.

Integrity

Data cannot be silently modified in transit.

Authentication

You are connected to the real server, not an impersonator.

Real scenario

On public WiFi, HTTP traffic can be sniffed and modified. HTTPS blocks easy snooping and tampering.

### SSL vs TLS

SSL means "Secure Sockets Layer". TLS means "Transport Layer Security".
Today, real HTTPS uses TLS. People still say "SSL certificate" because the name stuck.

Simple rule

Say "TLS" for correctness. Use "SSL" only as a casual term.

Where it sits

HTTP/1.1 and HTTP/2 use TLS over TCP. HTTP/3 carries HTTP over QUIC, which integrates TLS 1.3 into its handshake.

Stack view



```text
HTTP/1.1 or HTTP/2 over HTTPS:
Application: HTTP
Security: TLS
Transport: TCP
Network: IP

HTTP/3 over HTTPS:
Application: HTTP
Transport/security: QUIC with TLS 1.3
Network: IP (QUIC uses UDP)
```



### Certificates - what they do

A certificate proves the server identity. It includes the domain name and the server public key, and it is signed by a trusted CA (Certificate Authority).

Public key

Shared openly. Used to encrypt or verify signatures.

Private key

Kept secret on server. Used to decrypt or sign data.

Beginner intuition

Certificate says: "This public key belongs to this domain". Browser trusts it because a trusted CA signed it.

### TLS handshake - the basic story

A handshake is the setup phase before secure data transfer. The goal is to:
- verify server identity
- agree on encryption settings
- create a shared session key for fast symmetric encryption

1

ClientHello - browser proposes TLS version and ciphers

2

ServerHello - server picks cipher and sends certificate

3

Browser verifies certificate (domain, signature chain, expiry)

4

Key exchange creates shared session key

5

Encrypted HTTP starts using the session key

Why not encrypt everything with public key?



```text
Public key crypto is slower.
So TLS uses public key crypto mainly for setup (handshake),
then uses a fast symmetric session key for the actual data.
```



### Common myths and clarity

"HTTPS means the site is safe"

HTTPS only secures transport. A site can still be malicious.

"HTTPS hides everything"

It hides the path and query, but the domain can still be visible via DNS and SNI in many setups.

"SSL and TLS are different things"

TLS replaced SSL. People use SSL as a name, but modern traffic is TLS.

Practical dev takeaway

Use HTTPS always. Secure cookies need HTTPS. OAuth callbacks should be HTTPS. Production APIs should be HTTPS.

### Full forms and key terms

HTTP - HyperText Transfer Protocol

HTTPS - HyperText Transfer Protocol Secure

SSL - Secure Sockets Layer

TLS - Transport Layer Security

CA - Certificate Authority

SNI - Server Name Indication

TCP - Transmission Control Protocol

HTTPS is "secure transport". It is not a magic security shield for bad backend code, but it is a must-have foundation.

### Mini practice

Q Why does TLS use a session key?

A Because symmetric encryption with a session key is fast, while public key encryption is slow. TLS uses public key crypto mainly for handshake, then uses a session key for data.

Q What does a certificate prove?

A It proves that a public key belongs to a specific domain, because a trusted CA signed it.

### How to say it in interviews

- "HTTPS is HTTP over TLS. TLS provides confidentiality, integrity, and server authentication."

- "TLS handshake verifies the certificate and establishes a shared session key, then data is encrypted symmetrically."

- "People say SSL, but modern HTTPS uses TLS."
