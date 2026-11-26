# 10. Cryptography

Encryption, hashes, signatures, keys, and secure communication foundations.

Cryptography

At-a-glance revision notes for encryption, hashing, signatures, TLS, and PKI.

Collapse

Scan the "At a glance" bullets first. Then read examples to build real intuition.

Symmetric encryption

Quick revision points and beginner examples

At a glance

- Same secret key is used to encrypt and decrypt.

- Very fast, best for large data like files and streams.

- Key sharing is the main problem - you must deliver the secret safely.

What it is

Symmetric encryption uses one shared secret key for both encryption and decryption.

If both sides have the same key, they can protect data from eavesdroppers.

Example

- You encrypt a file with key K.

- Anyone with key K can decrypt it.

- If K leaks, security is gone.

Where it is used

Disk encryption, backups, secure messaging payloads, VPN data channels, HTTPS session data.

In TLS, symmetric keys are used after a secure handshake because symmetric encryption is fast.

Practical intuition

- Symmetric is like one locker key shared by two people. Fast and simple, but you must hand over the key safely.

Important idea - key distribution

The hardest part is sharing the secret key without attackers seeing it.

That is why we combine symmetric encryption with asymmetric encryption in modern systems.

Real-world pattern

- Asymmetric is used to exchange a symmetric session key.

- Then symmetric is used for the actual data.

Common terms

Block cipher

Encrypts fixed-size blocks. Example: AES. Often used with a mode like GCM.

Stream cipher

Encrypts data as a stream. Useful for continuous data.

Nonce / IV

Random or unique value used to make encryption safe even for repeated messages.

Asymmetric encryption

Quick revision points and beginner examples

At a glance

- Uses a public key and a private key.

- Public key can be shared openly, private key must stay secret.

- Great for key exchange and identity, slower than symmetric encryption.

What it is

Asymmetric encryption uses a pair of keys: public and private.

Data encrypted with the public key can be decrypted only with the matching private key.

Example

- You publish your public key on your website.

- People encrypt secrets for you using that public key.

- Only you can decrypt them using your private key.

Why it matters

It solves the key distribution problem for symmetric encryption.

It also enables identity and trust mechanisms using digital signatures.

Practical intuition

- Asymmetric is like a mailbox slot: anyone can drop a letter in, only the owner can open it.

Where it is used

TLS handshakes, secure key exchange, encrypting small secrets, signing software updates, SSH authentication.

It is usually not used to encrypt large files directly because it is slower.

Common real use

- Asymmetric sets up trust and exchanges keys.

- Symmetric does the heavy lifting for bulk data.

Common terms

Public key

Shared key used to encrypt or verify signatures.

Private key

Secret key used to decrypt or create signatures.

Key exchange

Process to establish a shared secret securely over an insecure network.

Hashing

Quick revision points and beginner examples

At a glance

- Hashing is one-way, not reversible.

- Same input produces the same output, but you cannot go backward.

- Used for integrity checks and password storage (with salt).

What it is

A hash function converts input data into a fixed-size output (hash or digest).

Good cryptographic hashes are fast to compute but extremely hard to reverse or collide.

Example

- hash('hello') = some digest

- hash('hello') will always produce the same digest

- hash('Hello') produces a different digest

Integrity checks

If you download a file, you can compare its hash with the expected hash to detect tampering.

Even a 1-bit change creates a very different hash (avalanche effect).

Example

- Vendor posts SHA-256 hash of an installer.

- You compute SHA-256 locally and compare.

- If it matches, file is likely intact.

Password storage basics

Passwords should not be encrypted and stored.

Instead store a slow hash of the password with a unique salt.

Salt prevents attackers from using precomputed tables.

Example

- Store: salt + hash(salt + password)

- On login: compute again and compare hashes

Key properties

One-way

You cannot reverse a hash to get the original input.

Collision resistance

Hard to find two different inputs with the same hash.

Avalanche effect

Small input change causes huge output change.

Digital signatures

Quick revision points and beginner examples

At a glance

- Proves who created a message and that it was not altered.

- Uses private key to sign, public key to verify.

- Gives authenticity and integrity, not secrecy.

What it is

A digital signature is created using a private key and verified using a public key.

It proves the sender owned the private key and the message was not modified.

Example

- Sender signs the hash of a message with private key.

- Receiver verifies signature using sender's public key.

What it gives you

Integrity - message not changed.

Authenticity - message came from holder of private key.

Non-repudiation concept - signer cannot easily deny signing later.

Practical intuition

- Signature is like a tamper-proof seal plus identity stamp.

Common uses

Signed software updates, package registries, document signing, certificates, blockchain transactions.

TLS uses server certificates and signatures to prove server identity.

Example

- When you install a package, signature verification helps ensure it was published by the real author.

Remember this

Sign

Private key signs.

Verify

Public key verifies.

Not encryption

Signature does not hide data. It proves integrity and identity.

TLS basics

Quick revision points and beginner examples

At a glance

- TLS secures network communication like HTTPS.

- Handshake sets up identity and shared keys.

- After handshake, fast symmetric encryption protects data.

What TLS does

TLS provides privacy, integrity, and server authenticity for network traffic.

It prevents attackers from reading or modifying data in transit.

Example

- HTTPS is HTTP running inside a TLS tunnel.

High-level handshake flow

Client connects and asks server to prove identity.

Server sends certificate containing its public key.

Client verifies certificate using trusted CAs.

Client and server establish a shared session key.

All application data after this uses symmetric encryption.

Mental model

- Handshake is about trust and key setup.

- Session is about fast encrypted data transfer.

What can go wrong

If certificate validation is skipped, attackers can do man-in-the-middle attacks.

Bad random number generation can weaken security.

Outdated TLS versions can have known vulnerabilities.

Developer tip

- Never disable TLS verification in production code.

TLS gives you

- Confidentiality - attackers cannot read your data.

- Integrity - attackers cannot silently modify your data.

- Authenticity - you can verify you are talking to the right server.

Public key infrastructure

Quick revision points and beginner examples

At a glance

- PKI is the system that makes public keys trustworthy.

- Certificates bind identity to a public key.

- Certificate Authorities (CAs) act as trusted issuers.

What PKI is

PKI is a set of rules, roles, and processes to create, manage, and verify digital certificates.

It answers the question: how do you know this public key really belongs to this website or person?

Example

- A certificate says: this public key belongs to example.com and is signed by a trusted CA.

Certificates

A certificate contains the public key and identity details like domain name.

It is signed by a CA so clients can verify it using the CA public key that is already trusted.

Mental model

- Certificate is an ID card for a public key.

Trust chain

Browsers and operating systems ship with a list of trusted root CAs.

A website certificate is verified by walking a chain up to a trusted root.

Example

- Server cert -> intermediate cert -> root cert (trusted).

Key PKI terms

CA

Certificate Authority. Issues certificates and signs them.

Certificate

Binds identity to a public key, signed by CA.

Trust store

List of trusted root CA certificates in OS/browser.

Revision tip - Always separate goals: confidentiality (hide data), integrity (detect changes), authenticity (prove identity). TLS combines all three using encryption, hashing, and certificates.
