# 107 - CORS, credentials, and cross-origin rules

A browser page can request data from another origin, but browser JavaScript cannot automatically read every response. Cross-Origin Resource Sharing (CORS) is the HTTP protocol that lets a server say which browser origins may read a response.

This chapter explains how origins are compared, why a browser sends an OPTIONS preflight for some requests, how credentials change the response headers that are required, and how to diagnose CORS failures. CORS controls browser access to responses. It does not authenticate a user or replace server-side authorization.

## Learning goals

By the end of this chapter, you should be able to:

- Define an origin using its scheme, host, and port.
- Explain what CORS does and what it does not do.
- Recognize when a browser sends a preflight request.
- Read the request and response headers used by preflight.
- Configure credentialed CORS with a specific allowed origin.
- Explain how cookies and other credentials interact with Fetch.
- Expose a response header to browser JavaScript.
- Diagnose common CORS failures without treating them as API responses.
- Keep CORS configuration separate from authentication and authorization.

## What is an origin?

A web origin is the combination of a URL's scheme, host, and port. Two URLs have the same origin only when all three match.

| URL A | URL B | Same origin? | Reason |
| --- | --- | --- | --- |
| **http://example.test/page** | **http://example.test/api** | Yes | Same scheme, host, and port; paths do not affect origin. |
| **http://example.test** | **https://example.test** | No | The schemes differ. |
| **https://example.test** | **https://api.example.test** | No | The hosts differ. |
| **http://127.0.0.1:3000** | **http://127.0.0.1:4000** | No | The ports differ. |

An origin is not the same thing as a site. Browser cookie rules use additional concepts such as site and cookie attributes. A pair of URLs can be cross-origin but still be same-site. Do not infer cookie behavior from origin alone.

## What CORS controls

Browsers enforce the same-origin policy for scripts. A script can freely use many resources from its own origin, but reading a response from a different origin requires the response to pass the browser's CORS check.

For a cross-origin Fetch request, the browser sends an **Origin** request header. The server can allow a particular origin by returning **Access-Control-Allow-Origin** with that origin. The browser checks the response before making it available to the calling script.

CORS is enforced by browsers. A server can still receive some cross-origin requests even when the browser later prevents the page from reading the response. This is one reason CORS is not a substitute for CSRF defenses, authentication, or authorization.

CORS configuration belongs on the server that owns the requested resource. Adding a request header in frontend code cannot grant the page permission to read a response.

## CORS response headers

The server uses response headers to describe what browser access it permits.

| Header | Purpose |
| --- | --- |
| **Access-Control-Allow-Origin** | Allows a particular origin, or uses ***** for requests without credentials. |
| **Access-Control-Allow-Credentials** | Allows a response to be shared with a request whose credentials mode is **include**. Its accepted value is exactly **true**. |
| **Access-Control-Allow-Methods** | Lists methods allowed by the preflight response. |
| **Access-Control-Allow-Headers** | Lists request headers allowed by the preflight response. |
| **Access-Control-Expose-Headers** | Lists additional response headers browser JavaScript may read. |
| **Access-Control-Max-Age** | Gives the browser a time in seconds for caching preflight permission. |
| **Vary: Origin** | Tells caches that the response can differ according to the request's Origin. |

For a public API that does not use credentials, **Access-Control-Allow-Origin: *** may be suitable. It does not mean the server has authenticated the caller. Avoid using it for private data.

If a server chooses among an allowlist of origins, it should return only the matching, approved origin and include **Vary: Origin**. Never copy an arbitrary Origin value into the response and call that an allowlist.

## Requests that need a preflight

Some cross-origin requests can be sent without a preflight. Other requests require the browser to ask permission first. The browser sends an **OPTIONS** request called a CORS preflight. It describes the method and headers the browser plans to use.

Common reasons for a preflight include:

- Using a method outside the CORS-safelisted methods, such as **PUT**, **PATCH**, or **DELETE**.
- Sending a custom request header such as **X-Client-Name**.
- Sending JSON with **Content-Type: application/json**. That media type is not one of the CORS-safelisted content types.

A preflight request can look like this:

~~~http
OPTIONS /api/profile HTTP/1.1
Origin: http://127.0.0.1:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, x-client-name
~~~

The server can approve that planned request with a response like this:

~~~http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://127.0.0.1:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: content-type, x-client-name
Access-Control-Max-Age: 600
Vary: Origin
~~~

If the preflight succeeds, the browser sends the actual request. The actual response must also pass the CORS check. If preflight fails, the browser does not send the planned request.

A preflight itself does not include the request's credentials. The server still needs to state the appropriate CORS permissions in the preflight response when the later request will use credentials.

## Credential modes

Fetch has a **credentials** option with three common values:

| Mode | Credential behavior |
| --- | --- |
| **same-origin** | Send credentials for same-origin requests. This is the default. |
| **include** | Allow credentials on cross-origin requests as well, subject to browser cookie and credential policies. |
| **omit** | Do not send credentials. |

A credential can include cookies, HTTP authentication information, or a TLS client certificate. **credentials: "include"** does not force a cookie to be sent. Cookie attributes, browser privacy settings, and other browser policies still apply.

~~~js
const response = await fetch("http://127.0.0.1:4000/api/profile", {
  credentials: "include"
});
~~~

For a credentialed cross-origin response, the server must return the specific allowed origin and **Access-Control-Allow-Credentials: true**:

~~~http
Access-Control-Allow-Origin: http://127.0.0.1:3000
Access-Control-Allow-Credentials: true
~~~

The wildcard origin **Access-Control-Allow-Origin: *** cannot be used to share a response with a credentialed request. The browser will reject that combination. Credentials also change how wildcard values are interpreted for other CORS permission headers, so a server should name the permitted methods and headers explicitly.

Cookies require extra care. JavaScript cannot read the **Set-Cookie** response header. With an eligible credentialed request, the browser processes cookies according to their attributes and its cookie policies. An **HttpOnly** cookie is not readable through **document.cookie**. Do not put secrets in frontend JavaScript or treat CORS as a way to protect a cookie.

## Read additional response headers

Browser JavaScript can read the CORS-safelisted response headers. Other response headers are hidden from the script unless the server lists them in **Access-Control-Expose-Headers**.

For example, the server can return:

~~~http
Access-Control-Expose-Headers: X-Request-Id
X-Request-Id: req-73f8
~~~

Then browser code can read that header:

~~~js
const requestId = response.headers.get("X-Request-Id");
~~~

The **Set-Cookie** header is forbidden to frontend scripts and cannot be made readable by adding it to **Access-Control-Expose-Headers**.

## CORS is not authorization

CORS controls whether browser JavaScript can read a response. It is not a firewall around an API. A command-line client, another server, or a custom application can send HTTP requests without enforcing browser CORS rules.

Every API must enforce its own security requirements:

- Authenticate the user when the endpoint requires an identity.
- Authorize each requested operation and resource on the server.
- Validate all input on the server.
- Use CSRF defenses where cookie-based authentication and the application threat model require them.
- Allow only the browser origins, methods, and headers the application needs.
- Avoid returning private data to unauthenticated callers.

A request's **Origin** header is not proof of identity. Non-browser clients can send arbitrary headers. Use Origin checks as one part of a deliberate browser access policy, not as a replacement for authentication.

## Common mistakes

### Setting CORS headers in frontend JavaScript

A page cannot grant itself permission. The server hosting the requested resource must return the appropriate CORS response headers.

### Using wildcard origin with credentials

A credentialed request requires the exact allowed origin, plus **Access-Control-Allow-Credentials: true**. Replace the wildcard with a carefully checked allowlist entry.

### Treating no-cors as a CORS fix

**mode: "no-cors"** does not let JavaScript read a blocked response. It restricts the request and produces an opaque response whose status, headers, and body are unavailable to the script.

### Assuming a failed CORS check means the request never reached the server

For a request that does not need preflight, the server may process the request, while the browser still blocks JavaScript from reading the response. Check server logs before retrying a state-changing request.

### Returning a wildcard origin for private endpoints

A wildcard is not authentication. Do not expose private data or actions just because a request comes from a page that appears to be yours.

### Forgetting the actual response headers after preflight

A successful preflight is not the final permission to read the data. The actual response must also pass the CORS check.

### Allowing a custom response header without exposing it

A response can contain **X-Request-Id** while **response.headers.get("X-Request-Id")** returns **null**. Add it to **Access-Control-Expose-Headers** when the page needs to read it.

### Chasing a browser error as if it were an HTTP status

A CORS failure is surfaced to page JavaScript as a fetch failure, often a **TypeError**. The page does not get a readable response status or body. Inspect the browser's Network panel and the server's logs.

## A practical debugging sequence

1. Compare the page and API scheme, host, and port to confirm whether they are cross-origin.
2. In the browser Network panel, inspect the request's **Origin** header.
3. If an **OPTIONS** request appears, inspect its **Access-Control-Request-Method** and **Access-Control-Request-Headers**.
4. Check that the preflight response allows the exact origin, requested method, and requested headers.
5. If credentials are included, check that the server uses the exact origin and **Access-Control-Allow-Credentials: true**.
6. Inspect the actual response too. It needs the CORS headers for the browser to share it with the script.
7. Check cookies separately. Confirm the request credentials mode, cookie attributes, and browser cookie policy.
8. Check the server logs. A CORS error can hide a response that the server already generated.

## Try it yourself

1. Compare **http://127.0.0.1:3000** and **http://127.0.0.1:4000**. Which part of the origin differs?
2. Request a JSON endpoint with **Content-Type: application/json** and observe the browser's preflight.
3. Add a custom **X-Client-Name** header and note how it appears in **Access-Control-Request-Headers**.
4. Remove **Access-Control-Allow-Headers** from the preflight response and observe whether the actual request is sent.
5. Use **credentials: "include"** and change the API response from the exact origin to *****. Record the browser's error.
6. Return **X-Request-Id** and try to read it before and after adding **Access-Control-Expose-Headers**.
7. Set **mode: "no-cors"** and inspect why the returned response is opaque.
8. Make the endpoint change state, then show why a server log can matter even when JavaScript reports a CORS error.
9. Explain which checks belong in CORS configuration and which must remain server-side authorization.

## Key points

- Origin is scheme, host, and port. A different path is same-origin; a different port is cross-origin.
- CORS is a browser protocol that controls whether a script can read a cross-origin response.
- Some requests trigger an **OPTIONS** preflight that lists the requested method and headers.
- A preflight response and the actual response each need the appropriate CORS permissions.
- Credentialed cross-origin requests need an exact allowed origin and **Access-Control-Allow-Credentials: true**.
- Cookie attributes and browser privacy policies still affect whether cookies are sent or stored.
- **Access-Control-Expose-Headers** makes selected response headers readable to JavaScript.
- **no-cors** does not bypass CORS, and CORS does not replace authentication, authorization, or CSRF defenses.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [106 - HTTP methods, status codes, and JSON APIs](106-http-methods-status-codes-and-json-apis.md) | [Open Q&A](../qnas/107-cors-credentials-and-cross-origin-rules.md) | [Open example](../examples/107-cors-credentials-and-cross-origin-rules.md) | [108 - URL, URLSearchParams, and the History API](108-url-urlsearchparams-and-the-history-api.md) |