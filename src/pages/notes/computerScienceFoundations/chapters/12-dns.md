# 12. DNS

How domain names are resolved through the Domain Name System.

DNS

DNS (Domain Name System) converts human friendly domain names like 'google.com' into IP addresses like '142.250.x.x'. Browsers and servers need IP addresses to talk on the internet.

Name to IP Caching via TTL Records like A, AAAA, CNAME DNSSEC (optional)

DNS

Click to collapse with clear terms and real examples

### Meaning

DNS is like the internet's phonebook. Humans type domain names, but networking needs IP addresses.

Domain name

A readable name like example.com .

IP address

A numeric address like 93.184.216.34 (IPv4) or 2606:2800:220:1:248:1893:25c8:1946 (IPv6).

### What happens when you open a website

When you type a domain in a browser, the browser needs the IP first. DNS resolution is the process of finding that IP.

Step 1 - check cache

Browser cache, OS cache, and local router cache.

Step 2 - ask resolver

Recursive resolver (ISP or public like Cloudflare 1.1.1.1).

Step 3 - walk the DNS tree

Root servers - TLD servers - Authoritative servers.

DNS resolution flow (simple)



```text
You type: example.com

1) Browser checks cache
2) OS checks cache
3) Resolver asks:
   - Root DNS: where is .com?
   - TLD DNS (.com): where is example.com?
   - Authoritative DNS: here is the IP

Then the browser uses the IP to connect with TCP (HTTP/1.1 or HTTP/2) or QUIC over UDP (HTTP/3). HTTPS secures the connection.
```



### DNS record types

DNS stores different kinds of records. Each record answers a specific question.

A

Maps name to IPv4 address.

AAAA

Maps name to IPv6 address.

CNAME

Alias to another domain name.

MX

Mail server routing for email.

TXT

Text record, used for verification and email security.

NS

Name Server records for authoritative servers.

Example DNS records



```text
example.com   A      93.184.216.34
www           CNAME  example.com
example.com   MX     mail.example.com
example.com   TXT    "google-site-verification=..."
example.com   NS     ns1.provider.net
```



### TTL and caching

TTL means Time To Live. It tells how long a DNS answer should be cached. Caching makes DNS fast, but can delay changes.

Fast

Cached DNS avoids repeated lookups. Page loads quicker.

Delay

If you change an IP, some users may still get the old IP until TTL expires.

Real production tip

Before big migrations, teams reduce TTL to a small value (like 60 seconds) so changes propagate faster.

### Recursive vs Authoritative servers

A recursive resolver finds the answer for you. An authoritative server is the final source of truth for the domain.

Recursive resolver

- Does the lookup steps

- Caches answers

- Returns final IP

Authoritative DNS

- Stores real DNS records

- Final answer source

- Managed by DNS provider

### DNS problems you see in real life

Wrong IP

Old cache or wrong A record.

Propagation delay

TTL not expired yet.

CNAME loops

Alias points back and never resolves.

DNS outage

Resolver or provider down, so no one can find your IP.

Quick debugging path



```text
If a site is not opening:

1) Check domain resolves:
   - nslookup example.com
   - dig example.com

2) Compare results across resolvers:
   - 1.1.1.1
   - 8.8.8.8
   - your ISP resolver

3) Verify TTL and records in DNS dashboard
```



### Full forms and terms

DNS - Domain Name System

IP - Internet Protocol

TTL - Time To Live

TLD - Top Level Domain

NS - Name Server

MX - Mail Exchange

A - Address (IPv4 record)

AAAA - IPv6 Address record

CNAME - Canonical Name

TXT - Text record

DNS is the first step of almost every web request. If DNS fails, nothing else starts.

### Mini practice

Q Why can DNS changes feel slow?

A Because caches keep DNS answers for the TTL duration. Until TTL expires, some users see old records.

Q When would you use CNAME?

A When you want a subdomain like 'www' to point to another domain name, not directly to an IP.

### How to say it in interviews

- "DNS resolves domain names to IP addresses using caches and a recursive resolver that queries root, TLD, and authoritative servers."

- "TTL controls caching. Lower TTL helps faster migrations, higher TTL reduces DNS load."

- "A is IPv4, AAAA is IPv6, CNAME is alias, MX is mail routing, TXT is verification."

### Next topics around DNS

HTTP lifecycle

HTTPS and SSL

Load balancing

TCP vs UDP
