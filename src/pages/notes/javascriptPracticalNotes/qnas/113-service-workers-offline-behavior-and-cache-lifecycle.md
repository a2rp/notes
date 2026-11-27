# 113 - Service workers, offline behavior, and cache lifecycle - Q&A

These questions review service worker registration, lifecycle, fetch handling, Cache Storage, updates, offline behavior, and security.

## Multiple-choice questions

### 1. What can a service worker do for a page within its scope?

A. Directly read or edit the page's DOM
B. Intercept eligible requests and provide responses
C. Run forever after the browser closes
D. Change the server's authorization rules

**Answer: B. Intercept eligible requests and provide responses.**

**Explanation:** A service worker handles events such as fetch and can return a network, cached, or generated response. It does not have direct DOM access and is not a permanent background process.

### 2. Which environment is generally required to register a service worker?

A. Any plain HTTP site
B. A secure context, such as HTTPS or localhost during development
C. A Node.js process only
D. A page opened from an arbitrary file path

**Answer: B. A secure context, such as HTTPS or localhost during development.**

**Explanation:** Service workers have powerful request and storage capabilities, so browsers restrict them to secure contexts.

### 3. Which event is commonly used to precache essential app files?

A. click
B. install
C. resize
D. input

**Answer: B. install.**

**Explanation:** The install event is commonly used to prepare the new worker and its core cache. If required installation work fails, the new worker should not take over.

### 4. What is the purpose of event.waitUntil() in an install or activate handler?

A. Keep the lifecycle event alive until its Promise settles
B. Skip all service worker updates
C. Make the page load faster by deleting caches
D. Change the worker's scope

**Answer: A. Keep the lifecycle event alive until its Promise settles.**

**Explanation:** It tells the browser that asynchronous work is part of the lifecycle event. Installation can fail if required installation work rejects.

### 5. When should fetch event code call event.respondWith()?

A. Synchronously while handling the fetch event
B. After a setTimeout of several seconds
C. Only after the page calls navigator.serviceWorker.ready
D. From an unrelated click handler

**Answer: A. Synchronously while handling the fetch event.**

**Explanation:** The service worker must provide the response promise during event dispatch. The promise itself can perform asynchronous work.

### 6. What does Cache Storage contain?

A. Named collections of Request and Response pairs
B. Only images and stylesheets
C. The browser's JavaScript heap
D. A permanent copy of every network request

**Answer: A. Named collections of Request and Response pairs.**

**Explanation:** The application manages cache names, matching, contents, and cleanup. Browser storage can still be cleared or evicted.

### 7. Why is response.clone() used before putting a fetched response into a cache and returning it?

A. A response body is a stream that is generally consumed once.
B. Cache Storage only accepts cloned URLs.
C. It encrypts the response.
D. It makes the request same-origin.

**Answer: A. A response body is a stream that is generally consumed once.**

**Explanation:** Cloning gives the cache and the page separate response bodies to consume.

### 8. Which strategy tries the cache first and uses the network if there is no cached response?

A. Network only
B. Cache first
C. Network first
D. Cache never

**Answer: B. Cache first.**

**Explanation:** Cache first can work well for versioned static resources. It needs a freshness or versioning plan so stale files do not remain indefinitely.

### 9. Which strategy usually tries the network first and falls back to cached data if the request fails?

A. Network first
B. Cache only
C. Cache first
D. Install first

**Answer: A. Network first.**

**Explanation:** Network first is useful when fresh data matters but a cached fallback improves offline behavior.

### 10. What is the default lifecycle behavior when a new worker is installed while an older one still controls open pages?

A. The new worker always replaces it immediately.
B. The new worker usually waits until the old clients no longer use the previous version.
C. Both workers merge into one.
D. The browser deletes every cache.

**Answer: B. The new worker usually waits until the old clients no longer use the previous version.**

**Explanation:** The waiting state helps avoid changing the worker underneath open pages that may depend on old assets.

### 11. What does clients.claim() request an active worker to do?

A. Take control of eligible open clients within its scope
B. Delete all clients
C. Send every request to a new server
D. Install a different service worker

**Answer: A. Take control of eligible open clients within its scope.**

**Explanation:** It can make pages controlled sooner, but a new worker must be compatible with already open pages.

### 12. Why should cache cleanup use an application-specific prefix?

A. To delete caches belonging only to this application
B. To delete every cache on the device
C. To disable the HTTP cache
D. To avoid registering a worker

**Answer: A. To delete caches belonging only to this application.**

**Explanation:** Other parts of the same origin may own different caches. Delete only outdated caches the application owns.

### 13. Which request is generally a safer default candidate for application caching?

A. A GET request for a public static file
B. A payment POST request
C. A request containing a password
D. Every request regardless of method or content

**Answer: A. A GET request for a public static file.**

**Explanation:** Caching private or mutating requests without an explicit policy can expose data or return misleading results.

### 14. What does a fulfilled fetch() Promise guarantee?

A. The server returned a successful 2xx status.
B. The request completed with a Response, which may still have an error status.
C. The response is fresh.
D. The browser saved the response in Cache Storage.

**Answer: B. The request completed with a Response, which may still have an error status.**

**Explanation:** Check response.ok or response.status before treating the response as success or caching it.

### 15. What does a successful register() Promise mean?

A. The current page is definitely controlled already.
B. The registration was accepted, but the current page may not yet be controlled.
C. Every resource has been cached.
D. The app will work offline automatically.

**Answer: B. The registration was accepted, but the current page may not yet be controlled.**

**Explanation:** Check navigator.serviceWorker.controller or listen for controllerchange when the page needs to know it is controlled.

## True or false

### 16. Registering a service worker automatically makes a website fully available offline.

**Answer: False.**

**Explanation:** The application must cache what it needs and write fetch behavior and fallbacks for when resources are missing.

### 17. A service worker can directly call document.querySelector() on the controlled page.

**Answer: False.**

**Explanation:** A service worker runs in a worker context without direct access to the page DOM.

### 18. Cache Storage and the browser's ordinary HTTP cache are the same storage system.

**Answer: False.**

**Explanation:** Cache Storage is an application-managed store with named caches. The browser's HTTP cache is a separate mechanism.

### 19. A browser may stop a service worker when it has no event to handle.

**Answer: True.**

**Explanation:** The browser controls a service worker's execution lifetime. Important state should not depend on global variables surviving a stop and restart.

### 20. A user or browser may clear or evict cached data.

**Answer: True.**

**Explanation:** Cache Storage is useful for application resources, but it is not guaranteed permanent storage for important user data.

### 21. Calling skipWaiting() is always risk-free.

**Answer: False.**

**Explanation:** The new worker may take over while older pages are still open. Those pages and the new worker's assets need to be compatible, or the app should use a safe reload flow.

### 22. A page that registers a worker can assume all its earlier requests were intercepted by it.

**Answer: False.**

**Explanation:** Registration does not retroactively intercept requests. The page may not be controlled until a later load or until a worker claims it.

### 23. If a navigation request is not available online, an offline fallback can be returned only if the app cached it earlier.

**Answer: True.**

**Explanation:** An offline page must be available locally before the network fails. Otherwise the worker has no response to return.

## Short-answer questions

### 24. What is a service worker scope?

**Answer:** It is the URL path range that a service worker registration can control.

**Explanation:** A worker's location normally limits its default scope. Choose a scope that covers the intended pages without unnecessarily affecting unrelated parts of the origin.

### 25. What is the difference between installing and activating a service worker?

**Answer:** Installation prepares a new worker, often including required caches. Activation is where the worker takes over and can clean up outdated caches or perform migrations.

**Explanation:** The phases let an application prepare the new version before it handles functional events.

### 26. Why should an application use versioned cache names?

**Answer:** Versioned names let the new worker identify and clean up obsolete assets while keeping the current cache explicit.

**Explanation:** If the asset set changes, a new cache name prevents old entries from being confused with the new release.

### 27. Why can a cache-first policy show stale content?

**Answer:** It returns an existing cached response without first checking whether the network has newer content.

**Explanation:** Use versioned assets, explicit revalidation, or a different strategy when freshness matters.

### 28. What should an offline fallback tell the user?

**Answer:** It should clearly state that the requested resource or data is unavailable and explain what the person can do next.

**Explanation:** A fallback should not imply that missing or stale information was successfully loaded.

### 29. Why should service worker code not be treated as an authorization boundary?

**Answer:** It runs on the client and can be modified, bypassed, or run in an environment controlled by the user.

**Explanation:** Sensitive actions must be validated and authorized by the server.

## Code questions

### 30. What happens if the Promise returned by cache.addAll() rejects during this install handler?

~~~js
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("app-shell-v1").then((cache) => {
            return cache.addAll(["/", "/index.html"]);
        })
    );
});
~~~

**Answer:** Installation fails, so the new worker does not become active.

**Explanation:** waitUntil() includes the cache operation in the installation process. A required asset failing to cache rejects the Promise and fails installation.

### 31. What is the bug in this response handling?

~~~js
const response = await fetch(request);
await cache.put(request, response);
return response;
~~~

**Answer:** The response body can be consumed by cache.put(), leaving no usable body to return.

**Explanation:** Put a clone in the cache and return the original response.

~~~js
const response = await fetch(request);

if (response.ok) {
    await cache.put(request, response.clone());
}

return response;
~~~

### 32. What does this strategy do when a cached response exists?

~~~js
const cached = await caches.match(request);
return cached || fetch(request);
~~~

**Answer:** It returns the cached response without first checking the network.

**Explanation:** That is a cache-first strategy. It is often appropriate for versioned static resources, but can return stale data.

### 33. When does this fetch handler intercept a request?

~~~js
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(fetch(event.request));
});
~~~

**Answer:** It provides a network response for GET requests handled by this listener. Non-GET requests are left to the browser's default handling.

**Explanation:** Returning without calling respondWith() leaves that request unhandled by this service worker. The example should also check scope, origin, and its intended resource policy.

### 34. What is missing from this code if the page needs to know when it becomes controlled?

~~~js
const registration = await navigator.serviceWorker.register("/sw.js");
console.log(registration.scope);
~~~

**Answer:** It should check navigator.serviceWorker.controller or listen for the controllerchange event.

**Explanation:** A successful registration does not guarantee the current page is controlled at that moment.

### 35. Why could deleting every cache name during activate be harmful?

~~~js
const names = await caches.keys();
await Promise.all(names.map((name) => caches.delete(name)));
~~~

**Answer:** It can delete caches owned by other application features on the same origin.

**Explanation:** Delete only outdated cache names that belong to this application, typically by checking a unique prefix.

## Practical and design questions

### 36. Which caching strategy would you consider for a versioned JavaScript bundle?

**Answer:** Cache first can be suitable when the bundle has a versioned or content-hashed filename.

**Explanation:** A new filename identifies a new asset. The app can serve the cached bundle quickly while deleting outdated versions in a controlled activation step.

### 37. Which strategy would you consider for a page that should prefer current server content but still work offline?

**Answer:** Network first with a cached response or offline page as a fallback.

**Explanation:** The online response is preferred, while the cache provides a response when the network request fails.

### 38. A cached response contains account-specific details. What should the developer consider before storing it?

**Answer:** Whether the data is private, how cache matching is scoped, who can access it on the device, and when it must be deleted.

**Explanation:** Do not cache private responses by default. Cache policy must account for authentication, user changes, and explicit cleanup.

### 39. A new service worker activates immediately while old pages are still open. What risk should the team review?

**Answer:** Old pages may request assets or APIs with assumptions that do not match the new worker and cache version.

**Explanation:** skipWaiting() and clients.claim() can speed up takeover, but the app needs compatibility handling or a coordinated reload.

### 40. How should an app test its offline behavior?

**Answer:** First load the app online so required files can be cached, then disable the network and test navigation, cached resources, and missing-resource fallbacks. Also test updates and cleared storage.

**Explanation:** Offline behavior depends on both the current cache contents and the active worker. A single online visit does not prove every offline path works.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [112 - Web Workers, shared workers, and message passing](112-web-workers-shared-workers-and-message-passing.md) | [Open lesson](../lessons/113-service-workers-offline-behavior-and-cache-lifecycle.md) | [Open example](../examples/113-service-workers-offline-behavior-and-cache-lifecycle.md) | [114 - Mutation, intersection, and resize observers](../lessons/114-mutation-intersection-and-resize-observers.md) |
