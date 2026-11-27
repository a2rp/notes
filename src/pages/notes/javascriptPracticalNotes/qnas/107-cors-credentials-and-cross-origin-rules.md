# 107 - CORS, credentials, and cross-origin rules: Questions and Answers

Use these questions to review origins, browser CORS checks, preflight requests, credentialed Fetch calls, and server-side security. Each answer follows its question, with an explanation where it helps.

## Multiple-choice questions

### 1. Which parts determine whether two URLs have the same origin?

- A. Scheme, host, and port
- B. Path and query string
- C. File name and fragment
- D. Page title and host

**Answer: A. Scheme, host, and port.**

For example, two pages on the same scheme, host, and port remain same-origin even when their paths differ. Changing the port makes them cross-origin.

### 2. A page at **http://127.0.0.1:3000** requests **http://127.0.0.1:4000**. Why is this cross-origin?

- A. The URL paths differ
- B. The ports differ
- C. The host is an IP address
- D. Fetch cannot request localhost

**Answer: B. The ports differ.**

The origin includes the port, so a development page and API on different ports are cross-origin.

### 3. Which request is most likely to require a CORS preflight?

- A. A GET with no custom headers
- B. A POST using **Content-Type: application/json**
- C. A page loading its own stylesheet
- D. A same-origin request with **Accept: application/json**

**Answer: B. A POST using Content-Type: application/json.**

That content type is not CORS-safelisted. A custom header or a method such as PUT can also cause a preflight.

### 4. What HTTP method does the browser use for a CORS preflight?

- A. GET
- B. POST
- C. OPTIONS
- D. HEAD

**Answer: C. OPTIONS.**

The preflight asks whether the server permits the planned cross-origin method and headers.

### 5. Which request header tells the server which method the browser intends to use after preflight?

- A. **Access-Control-Allow-Methods**
- B. **Access-Control-Request-Method**
- C. **Access-Control-Expose-Headers**
- D. **Allow-Origin**

**Answer: B. Access-Control-Request-Method.**

The browser sends it in the OPTIONS request. The server answers with **Access-Control-Allow-Methods**.

### 6. A page needs to read the API response header **X-Request-Id**. Which server response header is needed?

- A. **Access-Control-Allow-Headers**
- B. **Access-Control-Expose-Headers**
- C. **Access-Control-Request-Headers**
- D. **Access-Control-Allow-Credentials**

**Answer: B. Access-Control-Expose-Headers.**

**Access-Control-Allow-Headers** concerns request headers the browser may send. **Access-Control-Expose-Headers** concerns response headers the page may read.

### 7. What is required to share a credentialed cross-origin response with the page at **http://127.0.0.1:3000**?

- A. **Access-Control-Allow-Origin: *** only
- B. **Access-Control-Allow-Origin: http://127.0.0.1:3000** and **Access-Control-Allow-Credentials: true**
- C. **Access-Control-Allow-Methods: *** only
- D. **mode: "no-cors"**

**Answer: B. The exact origin and Access-Control-Allow-Credentials: true.**

The wildcard origin cannot be used when the request's credentials mode is **include**.

### 8. What does **credentials: "include"** do in Fetch?

- A. Guarantees that every cookie is sent
- B. Allows credentials on cross-origin requests, subject to browser and cookie policies
- C. Turns off CORS
- D. Makes the request same-origin

**Answer: B. It allows credentials on cross-origin requests, subject to browser and cookie policies.**

Cookie attributes, browser settings, and other policies still determine whether a cookie is sent or stored.

### 9. What does **mode: "no-cors"** do for a blocked cross-origin fetch?

- A. Gives the script unrestricted access to the response
- B. Disables server authentication
- C. Produces a restricted, opaque response that the script cannot inspect
- D. Makes the server return **Access-Control-Allow-Origin**

**Answer: C. It produces a restricted, opaque response.**

It is not a way to read a response that fails CORS.

### 10. What does CORS primarily control?

- A. Whether an API has authenticated a user
- B. Whether browser JavaScript may read a cross-origin response
- C. Whether a server accepts a TCP connection
- D. Whether a form's input is valid

**Answer: B. Whether browser JavaScript may read a cross-origin response.**

CORS is a browser access protocol. The API still needs its own authentication, authorization, and input validation.

### 11. Why might a server send **Vary: Origin**?

- A. To tell the browser to retry the request
- B. To tell caches that the response may depend on the request's Origin
- C. To expose the **Origin** header to JavaScript
- D. To require a preflight

**Answer: B. To tell caches that the response may depend on the request's Origin.**

This is useful when the server returns a selected origin from an allowlist rather than the same response for every origin.

### 12. Can JavaScript read the **Set-Cookie** response header if the server exposes it?

- A. Yes, if listed in **Access-Control-Expose-Headers**
- B. Yes, only when using POST
- C. No, it is forbidden to frontend scripts
- D. Yes, if the response is JSON

**Answer: C. No, it is forbidden to frontend scripts.**

The browser processes cookies according to the request credentials mode and cookie policies. A script cannot read **Set-Cookie** from the response headers.

## Objective questions

### 13. Name the three parts used to compare origins.

**Answer: Scheme, host, and port.**

A difference in any of these makes two URLs cross-origin.

### 14. What does the browser send in the **Origin** request header?

**Answer: The origin of the page initiating the cross-origin request.**

It contains the scheme, host, and port, not the page path.

### 15. What is the purpose of **Access-Control-Allow-Origin**?

**Answer: It tells the browser which origin may read the response.**

For credentialed requests, the server must use the specific approved origin rather than *****.

### 16. What does **Access-Control-Request-Headers** list?

**Answer: The request headers that the browser plans to send after preflight.**

The server responds with **Access-Control-Allow-Headers** to approve permitted request headers.

### 17. Does a successful preflight alone let JavaScript read the API response?

**Answer: No. The actual response must also pass the CORS check.**

The actual response needs the required CORS headers as well.

### 18. Does a CORS failure always mean that the request never reached the server?

**Answer: No.**

A request that does not require preflight may reach and be processed by the server even if the browser later blocks JavaScript from reading its response.

### 19. What does **Access-Control-Allow-Credentials** need to contain to allow a credentialed response?

**Answer: The exact value **true**.**

It is a response header, and the value is case-sensitive in the Fetch Standard.

### 20. What does **Access-Control-Expose-Headers** control?

**Answer: Which additional response headers browser JavaScript may read.**

It does not grant permission to send request headers. That is the role of **Access-Control-Allow-Headers**.

## Short-answer questions

### 21. Explain why a different path does not make two URLs cross-origin, but a different port does.

**Answer:** Origin comparison uses scheme, host, and port. Paths are part of the URL but are not part of the origin. Thus **http://example.test/page** and **http://example.test/api** share an origin, while ports 3000 and 4000 identify different origins.

### 22. Describe the basic preflight exchange for a JSON POST with a custom header.

**Answer:** The browser first sends an OPTIONS request with the page's **Origin**, the intended method in **Access-Control-Request-Method**, and planned headers in **Access-Control-Request-Headers**. If the server allows that origin, method, and headers, it responds with the matching **Access-Control-Allow-*** headers. The browser can then send the POST, whose response must also pass CORS.

### 23. Why does the wildcard origin fail for a request using **credentials: "include"**?

**Answer:** A credentialed response must be shared with a specific approved origin. The server must return that origin literally and include **Access-Control-Allow-Credentials: true**. A wildcard does not identify which origin is receiving a credentialed response.

### 24. Explain the difference between CORS and authorization.

**Answer:** CORS tells a browser whether a script may read a cross-origin response. Authorization is a server-side decision about whether an authenticated identity may perform an operation or access a resource. An API must enforce authorization even when CORS is configured.

### 25. Why is **no-cors** not a useful workaround for a page that needs JSON data?

**Answer:** In no-cors mode, Fetch restricts the request and returns an opaque response. The script cannot read its status, headers, or body, so it cannot use the JSON result.

### 26. Why can a browser report a fetch failure even when the server log shows a 200 response?

**Answer:** The server may have returned a successful HTTP response without the CORS headers needed for the browser to share it with the page. The browser hides the response from JavaScript, so the page receives a fetch error instead of a readable status and body.

## Code questions

### 27. What request sequence should this code cause, and why?

~~~js
await fetch("http://127.0.0.1:4000/api/profile", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "X-Client-Name": "lesson"
  },
  body: JSON.stringify({ active: true })
});
~~~

**Answer:** The browser first sends an OPTIONS preflight and, if it succeeds, sends the POST.

The JSON content type and custom **X-Client-Name** header require the server to approve the method and headers. Because the request includes credentials, both the preflight permission and actual response must support the credentialed CORS request. Browser cookie policies still apply.

### 28. What is wrong with this server response for the credentialed request in Question 27?

~~~http
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
~~~

**Answer:** The wildcard origin cannot be used for a credentialed response.

The server should check an explicit allowlist, return the specific approved **Origin**, and retain **Access-Control-Allow-Credentials: true**.

### 29. Why might this code return **null** even though the response contains **X-Request-Id**?

~~~js
const requestId = response.headers.get("X-Request-Id");
~~~

**Answer:** The server may not expose that response header to browser scripts.

Add **Access-Control-Expose-Headers: X-Request-Id** to the API response, along with the normal CORS permission headers.

### 30. A page logs a CORS error after submitting a request that changes server data. What should the developer check before retrying?

**Answer:** Check the server logs and the request's actual effect before retrying.

The browser may have blocked access to the response after the server processed the request. An automatic retry could repeat a state change. The API should also enforce authorization and validate the operation independently of CORS.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [106 - HTTP methods, status codes, and JSON APIs](../qnas/106-http-methods-status-codes-and-json-apis.md) | [Open lesson](../lessons/107-cors-credentials-and-cross-origin-rules.md) | [Open example](../examples/107-cors-credentials-and-cross-origin-rules.md) | [108 - URL, URLSearchParams, and the History API](../lessons/108-url-urlsearchparams-and-the-history-api.md) |