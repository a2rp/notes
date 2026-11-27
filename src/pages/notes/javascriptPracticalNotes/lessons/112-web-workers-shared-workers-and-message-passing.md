# 112 - Web Workers, shared workers, and message passing

JavaScript in a page normally runs on the main thread, which also handles user input, rendering, and many browser events. A long calculation on that thread can make a page feel frozen. Web Workers provide separate JavaScript execution contexts that can do work away from the page's main thread.

Workers communicate through messages. They do not share ordinary JavaScript objects with the page. Understanding the message contract, data-copying rules, and worker lifecycle makes worker code easier to design and debug.

## Learning goals

By the end of this chapter, you should be able to:

- Explain when a worker can help and what it cannot do.
- Create a dedicated worker and exchange messages with it.
- Use module workers and understand the worker global scope.
- Handle worker errors and clean up workers.
- Describe structured cloning and transferable objects.
- Use a SharedWorker port to communicate with a worker used by multiple same-origin pages.
- Design and validate a simple message protocol.
- Distinguish shared workers from service workers.

## 1. What a worker is

A worker runs JavaScript in a separate global context with its own event loop. A worker is not a second reference to the page's JavaScript environment. The page and worker send messages to exchange data.

A worker can often perform tasks such as:

- Parsing or transforming large data sets.
- Running a search, simulation, or calculation.
- Processing image or audio data.
- Coordinating work with other same-origin pages when using a shared worker.

Moving work into a worker can keep the main page available for interaction. It does not automatically make work faster. Creating a worker has a startup cost, and sending large messages can require data to be copied. Use a worker when the work is substantial enough to justify that cost.

## 2. Worker globals and limitations

The page runs with a Window global. A worker runs with a WorkerGlobalScope. Use **self** or **globalThis** to refer to the worker global scope.

A worker does not have direct access to the page's **window**, **document**, or DOM elements. It cannot directly change a button, draw into a page-owned canvas, or read a page form field. Send the needed data to the worker, let it process the data, and send a result back for the page to display.

Workers can use many APIs that do not depend on a page's DOM, such as timers and fetch. The available APIs vary by worker type and browser. A worker can also create nested workers when permitted.

## 3. Create a dedicated worker

A dedicated worker is created for one page or script. A module worker can use JavaScript module imports:

~~~js
const worker = new Worker(
    new URL("./math-worker.js", import.meta.url),
    { type: "module" }
);
~~~

The URL is resolved relative to the current module. The **type: "module"** option makes the worker script a module. Module workers can use **import** and **export**. A classic worker is the default when no type is supplied; classic workers use different loading rules and may use **importScripts()**.

A page sends data with **postMessage()** and receives the response through a **message** event:

~~~js
worker.addEventListener("message", (event) => {
    console.log("Worker replied:", event.data);
});

worker.postMessage({
    type: "sum",
    numbers: [4, 7, 9]
});
~~~

The worker receives the message through its own **message** event:

~~~js
self.addEventListener("message", (event) => {
    const message = event.data;

    if (message.type === "sum") {
        const result = message.numbers.reduce((total, number) => {
            return total + number;
        }, 0);

        self.postMessage({
            type: "sum-result",
            result
        });
    }
});
~~~

The worker uses **self.postMessage()** to send a message to the page that created it. The page uses **worker.postMessage()** to send a message into the worker.

## 4. Design a message protocol

A protocol is the agreement about what messages mean and what data they contain. Use a type or action field so a receiver can distinguish different requests and responses:

~~~js
{
    type: "sum",
    requestId: 12,
    numbers: [4, 7, 9]
}
~~~

A corresponding response could be:

~~~js
{
    type: "sum-result",
    requestId: 12,
    result: 20
}
~~~

A **requestId** lets the page match a response to the request that created it. This is useful when work can finish in a different order than it was started.

Check message types and input data at the receiving side. Messages may come from code that has a bug, an outdated page, or another client when using a shared worker. Do not assume a received object has the expected fields or types.

For long-running operations, define progress, completion, and error messages. For example, include the requestId in each update so that the page can associate progress with the correct operation.

## 5. Structured cloning

Worker messages are passed using the structured clone algorithm. The browser creates a copy of supported data for the receiving context. This is more capable than JSON in some ways, but it does not support every JavaScript value.

For example, message data can include ordinary objects, arrays, strings, numbers, Maps, Sets, Dates, and many other supported values. Functions and DOM nodes cannot be cloned. Sending unsupported data can throw a DataCloneError.

~~~js
worker.postMessage({
    type: "lookup",
    options: {
        caseSensitive: false,
        terms: ["worker", "message"]
    }
});
~~~

Avoid sending a whole page model when the worker only needs a few fields. Smaller messages are easier to validate and can reduce copy cost.

## 6. Transferable objects

Some objects can be transferred instead of cloned. An **ArrayBuffer** is a common transferable object. Transferring can avoid copying a large block of bytes, but it moves ownership: the sender's original buffer is detached and cannot be read or written afterward.

~~~js
const buffer = new ArrayBuffer(1024);
worker.postMessage(
    { type: "process-bytes", buffer },
    [buffer]
);

console.log(buffer.byteLength); // 0 after transfer
~~~

The transferable object must be both included in the message and listed in the transfer list. Listing it only in the transfer list moves it away from the sender without giving the receiver a reference to it.

A worker can transfer the buffer back in a response:

~~~js
self.addEventListener("message", (event) => {
    const { buffer } = event.data;

    // Process the bytes here.

    self.postMessage(
        { type: "processed-bytes", buffer },
        [buffer]
    );
});
~~~

Use transfers when ownership can move and the data is large enough to justify it. Do not transfer a buffer if the sending page still needs to use the same bytes.

## 7. Handle errors and finish work

Listen for worker startup or runtime errors. Also handle **messageerror**, which reports a message that could not be deserialized:

~~~js
worker.addEventListener("error", (event) => {
    console.error("Worker error:", event.message);
});

worker.addEventListener("messageerror", () => {
    console.error("The worker message could not be read.");
});
~~~

For a worker that should finish in response to a request, define a shutdown message and let it close itself:

~~~js
self.addEventListener("message", (event) => {
    if (event.data.type === "shutdown") {
        self.close();
    }
});
~~~

The page can also call **worker.terminate()** to stop a dedicated worker immediately:

~~~js
worker.terminate();
~~~

Immediate termination can interrupt work before a result is sent. If the worker should save or report state, use a shutdown message and a completion acknowledgement first. Remove event listeners and discard the Worker reference when the page no longer needs it.

## 8. Shared workers

A **SharedWorker** can connect multiple same-origin pages or scripts to the same worker, subject to browser rules. Each connecting page communicates through its own **MessagePort**. A shared worker can coordinate state or work across open tabs, but it is not a permanent background process.

Page code creates the shared worker, attaches message listeners to its port, starts the port, and sends a message:

~~~js
const sharedWorker = new SharedWorker(
    new URL("./shared-worker.js", import.meta.url),
    { type: "module", name: "counter" }
);

const port = sharedWorker.port;

port.addEventListener("message", (event) => {
    console.log("Shared worker replied:", event.data);
});

port.start();
port.postMessage({ type: "get-count" });
~~~

The shared worker receives a **connect** event for each new client. The event contains a port for that client:

~~~js
self.addEventListener("connect", (event) => {
    const port = event.ports[0];

    port.addEventListener("message", (messageEvent) => {
        if (messageEvent.data.type === "get-count") {
            port.postMessage({
                type: "count",
                value: 0
            });
        }
    });

    port.start();
    port.postMessage({ type: "ready" });
});
~~~

Each page needs to listen on its own port. Messages sent to one port are not automatically broadcast to every connected page. If every client needs an update, the shared worker must keep track of connected ports and send the message to each one.

Use a shared worker when multiple active pages need a common coordinator. Check support in the browsers you target, and provide a fallback or a simpler design if needed. Do not depend on the worker staying alive after all pages disconnect.

## 9. MessageChannel and explicit ports

**MessageChannel** creates a pair of connected MessagePorts. Ports can be sent to another context using postMessage and a transfer list, giving that context a private communication channel.

~~~js
const channel = new MessageChannel();

worker.postMessage(
    { type: "connect-channel" },
    [channel.port2]
);

channel.port1.addEventListener("message", (event) => {
    console.log(event.data);
});

channel.port1.start();
~~~

A port is useful when a component needs a dedicated two-way communication channel. A port is itself transferable, so the sender gives up its copy when transferring it.

## 10. Workers and security

Worker scripts are subject to origin and content security rules. Keep worker code within the application's trust boundary, and configure Content Security Policy with an appropriate **worker-src** directive.

Treat messages as input. Validate their shape, length, and values before using them. A worker can improve responsiveness, but it does not make untrusted input safe and does not create an authorization boundary.

Workers cannot directly access the DOM, but they may have access to network and storage APIs. Consider what data is sent to a worker and what the worker can request. Keep secrets and permission checks out of worker messages unless the design explicitly requires them.

## 11. Workers and service workers are different

A dedicated worker belongs to the page or script that created it. A shared worker can be connected to by multiple same-origin pages. Both are designed for message-based work outside the page's main thread.

A service worker has a different lifecycle and purpose. It can mediate network requests for controlled pages and support offline behavior, but the browser may stop and restart it. Service workers are covered in the next chapter.

## Common mistakes

- Trying to use **document** or **window** inside a worker.
- Assuming the page and worker share ordinary objects.
- Sending functions or DOM nodes through postMessage.
- Transferring a buffer and then trying to read it on the sending side.
- Forgetting to include a transferred object in the message data itself.
- Sending huge objects when a small message would do.
- Assuming a SharedWorker broadcasts one port's message to every client.
- Assuming a SharedWorker stays alive after every connected page is gone.
- Calling terminate() when the worker should first finish or report its work.
- Forgetting to handle worker **error** and **messageerror** events.
- Using a worker for tiny tasks where startup and messaging costs exceed the work.

## Key points

- Workers run in separate JavaScript execution contexts and do not directly manipulate the page DOM.
- A dedicated worker is created for a page or script. A SharedWorker can coordinate multiple same-origin clients through separate ports.
- Worker communication uses **postMessage()** and message events.
- Structured cloning copies supported values; transferable objects move ownership instead.
- A transferred ArrayBuffer is no longer usable in the sending context.
- Validate messages, handle errors, and define how work ends.
- Shared workers are not persistent background processes. Service workers have a separate lifecycle and role.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [111 - Files, blobs, object URLs, clipboard, and downloads](111-files-blobs-object-urls-clipboard-and-downloads.md) | [Open Q&A](../qnas/112-web-workers-shared-workers-and-message-passing.md) | [Open example](../examples/112-web-workers-shared-workers-and-message-passing.md) | [113 - Service workers, offline behavior, and cache lifecycle](113-service-workers-offline-behavior-and-cache-lifecycle.md) |