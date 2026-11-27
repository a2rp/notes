# 112 - Web Workers, shared workers, and message passing - Q&A

These questions practice worker types, communication, data cloning and transfer, errors, cleanup, and security.

## Multiple-choice questions

### 1. What is a dedicated worker primarily connected to?

A. Every browser tab on the same computer
B. The page or script that created it
C. Every server on the network
D. The browser's address bar

**Answer: B. The page or script that created it.**

**Explanation:** A dedicated worker is created for a particular page or script. The page communicates with it through messages.

### 2. Which object can a worker not directly use to change the page?

A. A string
B. A message event
C. The page's document object
D. An ArrayBuffer sent to it

**Answer: C. The page's document object.**

**Explanation:** A worker has no direct access to the page's Window or DOM. The page can update the document after receiving a worker message.

### 3. What does postMessage() normally do with supported object data?

A. Shares the same ordinary JavaScript object between contexts
B. Sends it using the structured clone algorithm
C. Converts every value into JSON text
D. Writes it to local storage

**Answer: B. Sends it using the structured clone algorithm.**

**Explanation:** The receiver gets a structured clone. Certain objects can instead be transferred, which moves ownership.

### 4. Which value cannot be sent as ordinary structured-clone message data?

A. A string
B. An array of numbers
C. A function
D. A Date

**Answer: C. A function.**

**Explanation:** Functions and DOM nodes cannot be cloned. Attempting to send unsupported data can cause a DataCloneError.

### 5. What happens to an ArrayBuffer after it is transferred to a worker?

A. Both contexts keep a usable copy of the same buffer.
B. The sender's buffer is detached and is no longer usable.
C. The browser converts it into a string.
D. The buffer is saved to disk.

**Answer: B. The sender's buffer is detached and is no longer usable.**

**Explanation:** Transfer moves ownership instead of cloning the bytes. The sender should not expect to keep using the transferred buffer.

### 6. To transfer a buffer, what must the message call do?

A. List it only in the transfer list.
B. Include it in the message data and list it in the transfer list.
C. Convert it to JSON first.
D. Store it in a global variable in both contexts.

**Answer: B. Include it in the message data and list it in the transfer list.**

**Explanation:** The transfer list says which resource should move. The message data gives the receiver a reference to that resource.

### 7. How does a page communicate with a SharedWorker?

A. Through the shared worker's document property
B. Through a MessagePort
C. Through the browser's URL bar
D. By directly calling functions in the worker

**Answer: B. Through a MessagePort.**

**Explanation:** Each connection uses a port. The shared worker receives a connect event and can communicate with each client's port.

### 8. When using addEventListener() on a MessagePort, which method starts message delivery?

A. port.run()
B. port.start()
C. port.open()
D. port.listen()

**Answer: B. port.start().**

**Explanation:** Explicitly calling start() is appropriate when adding a message event listener. Assigning an onmessage handler starts the port implicitly.

### 9. What does worker.terminate() do?

A. Waits for all current work to finish and then stops the worker.
B. Stops the dedicated worker immediately.
C. Reloads the page.
D. Sends a shutdown message and waits for an acknowledgement.

**Answer: B. Stops the dedicated worker immediately.**

**Explanation:** If work must finish or report state, use an application-level shutdown message and acknowledgement before terminating.

### 10. What does a worker's messageerror event indicate?

A. The worker has finished successfully.
B. A message could not be deserialized.
C. The browser lost its internet connection.
D. A stylesheet failed to load.

**Answer: B. A message could not be deserialized.**

**Explanation:** Handle messageerror when message data cannot be reconstructed by the receiving context.

### 11. How is a module worker created?

A. Pass type: "module" in the Worker options.
B. Add a module attribute to postMessage().
C. Use a SharedWorker only.
D. Add type="module" to the body element.

**Answer: A. Pass type: "module" in the Worker options.**

**Explanation:** A module worker can use import and export. The default worker type is classic.

### 12. Which statement about a SharedWorker is correct?

A. It automatically broadcasts each client's messages to every other client.
B. Each client has a port, and the worker chooses what to send through each port.
C. It is a permanent server process.
D. It can be directly accessed by unrelated origins.

**Answer: B. Each client has a port, and the worker chooses what to send through each port.**

**Explanation:** Messages sent to one port are not automatically broadcast to all clients. The worker needs to track ports and send a separate message to each intended client.

### 13. Which is a useful reason to use a worker?

A. A task is large enough to delay page interaction if run on the main thread.
B. A page needs to change a heading directly from the worker.
C. A task consists of one simple arithmetic operation.
D. A page wants to avoid validating input.

**Answer: A. A task is large enough to delay page interaction if run on the main thread.**

**Explanation:** Workers can keep substantial computation off the page's main thread. Worker startup and messaging have costs, so tiny tasks may be simpler on the main thread.

### 14. Which statement best distinguishes a service worker from a shared worker?

A. They have the same lifecycle and purpose.
B. A service worker can mediate requests for controlled pages and has a separate lifecycle.
C. A shared worker can directly manipulate every page's DOM.
D. A service worker is always a dedicated worker created by a page.

**Answer: B. A service worker can mediate requests for controlled pages and has a separate lifecycle.**

**Explanation:** Dedicated and shared workers are used for message-based work. Service workers are designed for request handling and offline behavior, among other features.

## True or false

### 15. A worker can directly use document.querySelector() to update a page heading.

**Answer: False.**

**Explanation:** A worker has no direct DOM access. Send a result to the page and let page code update the heading.

### 16. Sending an object to a worker always shares the original object by reference.

**Answer: False.**

**Explanation:** The default behavior is structured cloning. Transferable objects can move ownership, but that also does not create shared ordinary objects.

### 17. A SharedWorker message sent through one client's port automatically appears on every other client's port.

**Answer: False.**

**Explanation:** A shared worker must explicitly send messages through each port that should receive them.

### 18. A SharedWorker can be relied on to stay alive forever when no pages are connected.

**Answer: False.**

**Explanation:** The browser controls worker lifetime. A SharedWorker is not a permanent background process.

### 19. A transferred ArrayBuffer should be treated as unavailable to the sending context after postMessage().

**Answer: True.**

**Explanation:** The transfer detaches the sender's buffer. If the page needs the bytes later, it should not transfer that buffer or should arrange for the worker to transfer it back.

### 20. Moving code into a worker automatically makes the calculation faster.

**Answer: False.**

**Explanation:** Workers have startup and message costs. They help keep the page responsive, but performance depends on the task and the amount of data exchanged.

## Short-answer questions

### 21. What is the difference between worker.postMessage() and self.postMessage() in a dedicated worker?

**Answer:** The page calls worker.postMessage() to send data into the worker. The worker calls self.postMessage() to send data back to its page.

**Explanation:** The two sides each use postMessage(), but the receiver is different depending on which global scope calls it.

### 22. Why might a message include a requestId?

**Answer:** The requestId lets the page match a response or progress update to the request that started the work.

**Explanation:** When several operations are in flight, IDs prevent the interface from associating a result with the wrong request.

### 23. Why should a worker validate the data it receives?

**Answer:** Messages can contain missing, malformed, or unexpected values because of bugs, version mismatches, or other clients.

**Explanation:** Validate message type, fields, sizes, and value ranges before using the data.

### 24. What does a MessageChannel provide?

**Answer:** It creates a pair of connected MessagePorts that can form a dedicated two-way communication channel.

**Explanation:** A port can be transferred to another context, allowing that context to use one end of the channel.

### 25. When is graceful shutdown preferable to terminate()?

**Answer:** Use graceful shutdown when the worker must finish a task, report a result, or release application resources before it stops.

**Explanation:** terminate() stops the worker immediately and may interrupt pending work. A shutdown message can define an orderly completion protocol.

## Code questions

### 26. What does the page receive from this worker?

~~~js
self.addEventListener("message", (event) => {
    self.postMessage(event.data + 1);
});
~~~

If the page sends the number 4, what is the response?

**Answer: The page receives 5.**

**Explanation:** The worker reads the message data, adds one, and posts the result to the page.

### 27. What is the problem with this message?

~~~js
worker.postMessage({
    callback: () => console.log("done")
});
~~~

**Answer:** The object contains a function, which cannot be structured-cloned.

**Explanation:** Send a message such as { type: "done" } instead, then let the receiving context decide which local function to call.

### 28. What is the value of buffer.byteLength after this call transfers the buffer?

~~~js
const buffer = new ArrayBuffer(64);
worker.postMessage({ buffer }, [buffer]);
console.log(buffer.byteLength);
~~~

**Answer: 0.**

**Explanation:** The buffer is detached from the sending context after transfer. The receiving worker now owns the transferred resource.

### 29. What is missing if the worker code assigns a message listener with addEventListener()?

~~~js
const port = sharedWorker.port;
port.addEventListener("message", handleMessage);
~~~

**Answer:** Call port.start() to start message delivery.

~~~js
const port = sharedWorker.port;
port.addEventListener("message", handleMessage);
port.start();
~~~

**Explanation:** A MessagePort can start implicitly when onmessage is assigned. With addEventListener(), explicitly starting it makes the listener receive messages.

### 30. What worker-side event handles a new SharedWorker connection?

~~~js
self.addEventListener("________", (event) => {
    const port = event.ports[0];
});
~~~

**Answer: connect.**

~~~js
self.addEventListener("connect", (event) => {
    const port = event.ports[0];
});
~~~

**Explanation:** Each connecting page receives a port in the connect event. The worker attaches a message handler to that port.

### 31. Why might this design lose a result?

~~~js
worker.postMessage({ type: "start-large-job" });
worker.terminate();
~~~

**Answer:** terminate() stops the worker immediately, so the calculation may be interrupted before it sends a result.

**Explanation:** Wait for a completion message or use a shutdown request that lets the worker finish before stopping it.

## Practical and design questions

### 32. A page starts three worker requests and their results may arrive in a different order. What should it do?

**Answer:** Give each request a unique ID and include that ID in the corresponding result and progress messages.

**Explanation:** The page can use the ID to update the correct task instead of assuming that messages arrive in request order.

### 33. A worker needs to process a 50 MB ArrayBuffer, and the page does not need the bytes while processing. Which message strategy is suitable?

**Answer:** Transfer the ArrayBuffer with postMessage() and include it in both the message and the transfer list.

**Explanation:** Transfer avoids cloning the large byte buffer, but the page loses access to its original buffer until the worker transfers it back.

### 34. Two tabs need a counter coordinator. Would a dedicated worker be shared automatically between them?

**Answer: No. A dedicated worker belongs to its creating page or script. A SharedWorker may be suitable if the target browsers support it and the tabs are same-origin.

**Explanation:** Each tab can connect to the SharedWorker through its own MessagePort. The worker must explicitly coordinate and send updates to each client.

### 35. A page sends { type: "delete-account" } to a worker. Is it safe for the worker to trust this message without checking anything?

**Answer: No.**

**Explanation:** A worker should validate the message shape and values. More importantly, client-side worker code is not an authorization boundary. Sensitive actions must be authorized by the server.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [111 - Files, blobs, object URLs, clipboard, and downloads](111-files-blobs-object-urls-clipboard-and-downloads.md) | [Open lesson](../lessons/112-web-workers-shared-workers-and-message-passing.md) | [Open example](../examples/112-web-workers-shared-workers-and-message-passing.md) | [113 - Service workers, offline behavior, and cache lifecycle](../lessons/113-service-workers-offline-behavior-and-cache-lifecycle.md) |
