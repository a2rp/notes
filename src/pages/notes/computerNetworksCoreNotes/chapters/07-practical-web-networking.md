# 07. Practical Web Networking

How browser requests, DNS, TLS, HTTP, proxies, caching, and APIs work together.

### URL breakdown

A URL means "Uniform Resource Locator". It tells the browser where a resource is and how to reach it.

https :// api.example.com /users ? page=2 & sort=latest

Scheme

**https** tells the protocol. HTTP is "Hypertext Transfer Protocol". HTTPS is HTTP + TLS.

Host

**api.example.com** is the domain name that will be resolved to an IP address. IP is "Internet Protocol".

Path

**/users** is the resource path on the server. Often maps to a route in a web server or API.

Query

**?page=2&sort=latest** is extra parameters. Used for filtering, pagination, sorting, search.

A URL can also include a port like ":5173" and a fragment like "#section".

### What happens when you type a URL

The browser does a small chain of steps. If any step fails, the page does not load.

1

DNS resolve

DNS is "Domain Name System". It converts a domain name like "example.com" into an IP address like "93.184.216.34".

Example: Browser asks a DNS resolver, gets an A record for IPv4 or AAAA record for IPv6.

2

TCP connect

TCP is "Transmission Control Protocol". It creates a reliable connection using a 3-way handshake.

Example: Client connects to server IP on port 443 for HTTPS.

3

TLS handshake

TLS is "Transport Layer Security". It encrypts data so nobody can read it in the middle. TLS is what makes HTTPS secure.

Example: Browser verifies certificate and agrees on encryption keys.

4

HTTP request and response

HTTP is "Hypertext Transfer Protocol". Browser sends a request like GET or POST. Server responds with status code and data.

Example: GET "/users?page=2" returns JSON or HTML.

5

Render

Browser parses HTML, loads CSS, runs JavaScript, then paints the page.

Example: More requests happen for images, fonts, API calls, and scripts.

Debug order is usually DNS, reachability, port, TLS, then HTTP.

### Cookies, sessions, and CORS

Cookie

Small data stored by the browser and sent with requests to the same site. Common use: session id, preferences, auth tokens.

Session

A server-side memory of a logged-in user. Browser usually stores only a session id cookie. "Session id" points to user data on server.

CORS

CORS is "Cross-Origin Resource Sharing". It is a browser security rule that controls whether a webpage can call an API from a different origin. Origin = scheme + host + port. Example: "https://a.com:443".

CORS is enforced by browsers, not by servers. Server only sends headers that browser checks.

### CDN basics

CDN is "Content Delivery Network". It is a network of servers placed in many locations to serve content faster. Instead of every user hitting one server far away, users get content from a nearby edge server.

- Faster load because distance and latency reduce

- Caching of images, videos, JavaScript, CSS

- Helps absorb traffic spikes

Example: Cloudflare and other CDNs store a cached copy of static files near users.

### Proxy vs reverse proxy

Proxy

A client-side middleman. Client sends requests to proxy, proxy sends to internet. Used for privacy, filtering, access control.

Reverse proxy

A server-side middleman. Users hit reverse proxy, it forwards to your backend servers. Used for load balancing, SSL termination, caching, security.

Simple memory: proxy protects clients, reverse proxy protects servers.

### Load balancer basics

A load balancer distributes traffic across multiple servers so one server does not get overloaded. This improves performance and availability.

- Spreads requests across servers using strategies like round robin

- Can do health checks and remove bad servers automatically

- Helps scale horizontally by adding more servers

In many setups, the reverse proxy and load balancer are the same component.
