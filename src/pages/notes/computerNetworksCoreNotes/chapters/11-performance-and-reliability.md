# 11. Performance and Reliability

Bandwidth, throughput, latency, jitter, loss, congestion, and availability.

### Packet loss

**Packet loss** means some packets never reach the destination. It usually happens due to Wi-Fi interference, congestion, weak signal, overloaded routers, or unstable ISP links.

Why it hurts: TCP (Transmission Control Protocol) assumes loss means congestion and slows down. Even a small loss can make the internet feel slow.

Symptoms

buffering, call drops, lag spikes, pages stuck

Quick check

use ping and watch for "Request timed out"

Low bandwidth can still work for browsing. Packet loss makes everything feel broken.

### Retries and timeouts

A **retry** happens when a sender sends the same data again because it did not get confirmation. In TCP, confirmations are called **ACK**(Acknowledgement).

A **timeout** is the maximum waiting time before retrying or failing. If the network is slow or packets are lost, timeouts trigger retries, which adds more delay.

Send - Wait for ACK - Timeout - Retry

Too aggressive retries can increase congestion. Too slow timeouts feel unresponsive.

### MTU issues and PMTUD

**MTU** (Maximum Transmission Unit) is the largest packet size that can be sent on a link without fragmentation. Common Ethernet MTU is 1500 bytes.

If a packet is larger than MTU, it may be**fragmented** (split) or dropped. Some networks block fragmentation, which causes weird issues like some websites loading and others failing.

**PMTUD** (Path MTU Discovery) is a method where systems discover the smallest MTU along the path and adjust packet size automatically. It often depends on ICMP (Internet Control Message Protocol) messages.

Symptoms

VPN works partially, large downloads fail, specific sites hang

Mental model

big packet hits a narrow tunnel and gets stuck

MTU bugs feel like magic until you know MTU exists.

### QoS concept

**QoS** means Quality of Service. It is a set of rules that prioritize certain traffic over others when the network is busy.

Example: voice calls and video meetings need low latency and low jitter. Downloads can tolerate delay. QoS can keep calls smooth by giving them priority.

voice video call gaming downloads backups

QoS does not create bandwidth. It manages who gets it first.

### Caching (DNS and HTTP)

**Caching** means storing results so next time the same request is faster. Caches exist everywhere in networking and the web.

DNS caching

**DNS** is Domain Name System. It translates domain names like "example.com" into IP addresses. DNS results are cached for a time called **TTL**(Time To Live).

- Good: reduces repeated DNS lookups and speeds up page loads

- Bad: old cache can point to old IP during changes

Example: you changed server IP but some users still hit the old one due to TTL.

HTTP caching

**HTTP** is HyperText Transfer Protocol. Browsers and CDNs cache files like images, CSS, and JS. Cache rules are controlled by headers like Cache-Control and ETag.

- Good: faster loads, less bandwidth usage

- Bad: stale cache can show old UI unless cache is managed

Example: deploy changed JS but user still sees old version due to caching.

### Connection keep-alive

**Keep-alive** means reusing an existing connection instead of creating a new one for every request. This saves time because setting up TCP and TLS connections costs extra round trips.

In HTTP, keep-alive allows multiple requests to use the same TCP connection. HTTP-2 goes further by multiplexing many requests in one connection.

Benefit

faster page loads, less handshake overhead

Tradeoff

too many open connections can waste server resources

Keep-alive makes repeated requests feel instant after the first load.

### Quick debug checklist

- Check packet loss first using ping

- Check latency stability, jitter shows instability

- If only some sites fail, suspect MTU or DNS cache

- If calls lag while downloads run, QoS can help

- If UI updates do not show, suspect HTTP caching

Most real bugs are not advanced. They are basic concepts showing up in messy ways.
