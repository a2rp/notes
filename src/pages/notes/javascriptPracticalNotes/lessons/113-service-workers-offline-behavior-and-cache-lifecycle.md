# 113 - Service workers, offline behavior, and cache lifecycle

A service worker is a browser-managed script that can sit between a page and network requests. It can cache an app shell, answer requests from Cache Storage, and provide a fallback when the network is unavailable.

A service worker is not a page script that stays alive forever. The browser starts it to handle events and may stop it when there is no event to process. Good service worker code is event-driven, keeps important state in storage, and works with a deliberate cache and update plan.

## Learning goals

By the end of this chapter, you should be able to:

- Explain what a service worker can and cannot do.
- Register a service worker and understand its scope.
- Describe the install, waiting, activate, and controlling states.
- Use waitUntil() and respondWith() correctly.
- Store and retrieve responses with Cache Storage.
- Choose a caching strategy for different kinds of requests.
- Update caches without deleting resources still needed by an older page.
- Explain secure-context, privacy, storage, and offline limitations.

## 1. What a service worker does

A service worker runs in its own worker context. It has no direct access to the page DOM. Instead, it receives events, such as **install**, **activate**, **fetch**, and **message**.

A service worker can:

- Intercept eligible requests from pages it controls.
- Return a cached response or ask the network for a response.
- Store selected requests and responses in Cache Storage.
- Provide an offline page or other fallback.
- Coordinate with pages by sending messages.

A service worker does not automatically make a site work offline. The application must decide what to cache, handle requests deliberately, and provide useful behavior when a required resource is unavailable.

Service workers must run in a secure context. Production sites generally need HTTPS. Local development on localhost is treated as trustworthy by browsers, so it is suitable for learning and testing.

## 2. Register a service worker

A page registers a script through **navigator.serviceWorker.register()**:

~~~js
if ("serviceWorker" in navigator) {
    try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service worker registered:", registration.scope);
    } catch (error) {
        console.error("Service worker registration failed:", error);
    }
}
~~~

The URL passed to register() identifies the worker script. By default, its location also limits the scope it can control. A worker at **/sw.js** can usually control pages below the site root. A worker inside **/app/** normally controls pages only under **/app/**.

Choose the narrowest scope that fits the application. A root service worker can affect every page in the origin and should be reviewed carefully.

Registration is asynchronous. A fulfilled Promise means that the registration was accepted. It does not necessarily mean that the current page is already controlled by the new worker. Check **navigator.serviceWorker.controller** or listen for **controllerchange** when the page needs to know when control begins.

## 3. The service worker lifecycle

A service worker installation and update follow lifecycle states:

1. **Installing** - the browser evaluates a new worker script and dispatches **install**.
2. **Installed or waiting** - installation succeeded, but an older active worker may still control open pages.
3. **Activating** - the worker runs its **activate** event.
4. **Activated** - it can handle functional events such as **fetch**.
5. **Redundant** - the worker was replaced or failed to install.

During **install**, an application often caches files the app needs to start. If installation fails, the new worker does not become active. This lets the existing worker continue serving clients.

During **activate**, an application often deletes old cache versions. The new worker should finish any required migration or cleanup before it handles requests.

Use **event.waitUntil()** to keep the lifecycle event alive until asynchronous work completes:

~~~js
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("site-shell-v1").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/offline.html"
            ]);
        })
    );
});
~~~

If the Promise passed to waitUntil() rejects during installation, installation fails. Do not let a nonessential asset prevent installing the worker unless the app truly requires it.

## 4. Waiting workers and updates

When a new worker is installed while an older worker controls open pages, the new one usually waits until those clients stop using the old version. This avoids switching the worker underneath pages that may still expect older assets.

A page can inspect **registration.waiting** and show a message such as "An update is ready. Reload to use it." After the user chooses to reload, the page can reload and the waiting worker can activate naturally.

The worker can call **self.skipWaiting()** to ask to move from waiting to active sooner. A newly activated worker can call **clients.claim()** to take control of eligible open pages. These choices can be useful, but they can also make an older page use a new worker with different cached files. Use them only when the page and worker versions are compatible or when the update flow safely reloads clients.

Give each release's caches a versioned name, such as **site-shell-v2**. During activation, delete only old caches that belong to this application:

~~~js
const CURRENT_CACHES = new Set([
    "site-shell-v2",
    "site-data-v2"
]);

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(
                names
                    .filter((name) =>
                        name.startsWith("site-") &&
                        !CURRENT_CACHES.has(name)
                    )
                    .map((name) => caches.delete(name))
            );
        })
    );
});
~~~

A versioned cache makes cleanup explicit. Avoid deleting caches owned by unrelated features or applications on the same origin.

## 5. Intercept requests

The **fetch** event lets a service worker respond to requests made by its controlled pages. Call **event.respondWith()** while handling the event and pass it a Response or a Promise that resolves to a Response:

~~~js
self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            return cachedResponse || fetch(request);
        })
    );
});
~~~

Do not wait for unrelated asynchronous work before calling respondWith(). The browser needs the response promise during event dispatch.

A service worker can intercept page navigations and subresource requests such as scripts, styles, images, and fetch() requests. It should normally leave cross-origin requests or request types it does not own to the browser by not calling respondWith() for them.

## 6. Cache Storage

Cache Storage stores named caches of Request and Response pairs. It is separate from the browser's ordinary HTTP cache. The application decides what to put in a cache, how to match it, and when to delete it.

A response body is a stream and is generally consumed once. If the page must return a response and also store it, clone it before consuming the original:

~~~js
const response = await fetch(request);

if (response.ok) {
    await cache.put(request, response.clone());
}

return response;
~~~

Cache entries do not automatically become fresh just because the network response changed. The application needs a freshness policy, versioned cache, or explicit revalidation.

Browser storage is not permanent. Users can clear site data, and the browser can evict storage under pressure. Do not treat Cache Storage as the only copy of important user data.

## 7. Choose a caching strategy

A caching strategy defines which source to try first and what to do when it fails.

### Cache first

Try Cache Storage first, then use the network if there is no cached response. This can suit versioned scripts, styles, icons, and other static resources.

The tradeoff is freshness. If an entry is cached indefinitely under the same key, a person can continue seeing old content. Versioned asset names or cache cleanup can help.

### Network first

Try the network first, then return a cached response if the network request fails. This can suit pages or data where freshness matters but an offline fallback is useful.

A network-first strategy should decide what to do with error responses such as HTTP 404 or 500. A fulfilled fetch Promise can still contain a non-success status.

### Stale while revalidate

Return a cached response quickly, then request an updated response and save it for the next visit. This can suit content where a slightly old result is acceptable.

The current response remains stale while the update happens. Do not use this for data that must always be current or private unless the policy is explicit.

### Network only or cache only

Network only is suitable when cached data would be misleading or unsafe. Cache only can be useful for a strictly versioned app shell, but it needs a plan for cache misses.

No strategy is correct for every resource. Choose per request class, considering freshness, offline behavior, privacy, and update compatibility.

## 8. Provide an offline fallback

An offline page should be available from a cache before a navigation needs it. A network-first navigation handler can try the network and use that fallback when the request fails:

~~~js
async function respondToNavigation(request) {
    try {
        return await fetch(request);
    } catch {
        const offlinePage = await caches.match("/offline.html");
        return offlinePage || Response.error();
    }
}
~~~

Then connect it to the fetch event:

~~~js
self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(respondToNavigation(event.request));
    }
});
~~~

An offline fallback should explain what is unavailable and what the person can do. Avoid showing a generic success page when the requested data was not actually loaded.

## 9. Scope, control, and testing

A service worker only controls clients that fall within its scope and are controlled by its registration. The first page load that registers a service worker may not have been controlled when its earlier requests happened. A later navigation or clients.claim() can make it controlled.

Check these properties while debugging:

- **registration.scope** shows the scope URL.
- **registration.installing**, **registration.waiting**, and **registration.active** show worker versions in lifecycle states.
- **navigator.serviceWorker.controller** indicates whether this page is currently controlled.
- Browser developer tools show registrations, lifecycle state, storage, and Cache Storage entries.

Test both a first visit and a returning visit. Also test with network disabled, with a cache miss, after installing a changed worker script, and after removing site data. A page that works online once is not automatically an offline-ready application.

## 10. Privacy and security

- Cache only data that the application is allowed to store.
- Do not put authentication secrets or private user responses in a shared cache by default.
- Cache only requests the application intentionally handles, commonly GET requests.
- Validate and authorize sensitive operations on the server. A service worker is client-side code and is not an authorization boundary.
- Use HTTPS in production and narrow the worker's scope.
- Review the effect of skipWaiting() and clients.claim() on old open pages.
- Treat cache entries as potentially stale, missing, or evicted.
- Keep service worker updates and cache version changes deliberate.

## Common mistakes

- Assuming a service worker makes a site offline automatically.
- Registering a root-scope worker when a narrower scope would do.
- Forgetting to pass installation or cleanup Promises to waitUntil().
- Calling respondWith() after asynchronous work has already yielded.
- Caching every request without considering method, privacy, or freshness.
- Returning a consumed response after putting it in Cache Storage without cloning it first.
- Deleting every cache on the origin rather than only the app's own old caches.
- Assuming a successful registration means the current page is already controlled.
- Using skipWaiting() without checking whether old pages can work with the new worker.
- Treating Cache Storage as permanent storage.
- Assuming the service worker runs continuously in the background.

## Key points

- Service workers require a secure context and are registered with a scope.
- Install, waiting, activate, and controlling states govern how a new worker takes over.
- waitUntil() keeps lifecycle work alive. respondWith() supplies the fetch response.
- Cache Storage is an application-managed store of Request and Response pairs, separate from the HTTP cache.
- Cache and network strategies should match the freshness and offline needs of each resource.
- Version caches and delete only outdated caches belonging to the application.
- A browser may stop a service worker when it has no event to handle.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [112 - Web Workers, shared workers, and message passing](112-web-workers-shared-workers-and-message-passing.md) | [Open Q&A](../qnas/113-service-workers-offline-behavior-and-cache-lifecycle.md) | [Open example](../examples/113-service-workers-offline-behavior-and-cache-lifecycle.md) | [114 - Mutation, intersection, and resize observers](114-mutation-intersection-and-resize-observers.md) |