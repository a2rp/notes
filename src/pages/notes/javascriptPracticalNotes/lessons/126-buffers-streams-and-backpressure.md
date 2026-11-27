# 126 - Buffers, streams, and backpressure

Node.js often handles data as bytes before an application interprets it as text. A Buffer stores bytes. A stream lets a program process data in chunks instead of waiting for one complete value. Backpressure coordinates a fast producer with a slower consumer so that queued data does not grow without control.

These ideas work together: streams pass chunks, chunks are often Buffers, and backpressure helps regulate how quickly those chunks move.

## Learning goals

After this lesson, you should be able to:

- distinguish bytes in a Buffer from decoded text;
- create and inspect Buffers safely;
- recognize Readable, Writable, Duplex, and Transform streams;
- choose a suitable stream consumption style;
- explain highWaterMark and backpressure;
- use pipeline() to connect streams and handle errors;
- apply a transform without loading an entire file into memory;
- recognize common stream and encoding mistakes.

## Bytes and text are different

A computer stores text as bytes using an encoding. UTF-8 is a common encoding, but one visible character can require more than one byte. For example, the text café contains four characters, but its UTF-8 representation needs five bytes because é uses two bytes.

A Buffer is a fixed-length sequence of bytes. It does not know which character encoding those bytes represent.

~~~js
import { Buffer } from "node:buffer";

const bytes = Buffer.from("café", "utf8");

console.log(bytes.length);
console.log(bytes.toString("utf8"));
console.log(bytes.toString("hex"));
~~~

The byte length can differ from a JavaScript string's character count. Decode a Buffer with the encoding that was used to produce its bytes.

### Create Buffers intentionally

Use Buffer.from() when starting with known bytes or text:

~~~js
import { Buffer } from "node:buffer";

const textBytes = Buffer.from("Hello", "utf8");
const binaryBytes = Buffer.from([0x48, 0x69]);

console.log(textBytes.toString("utf8"));
console.log(binaryBytes.toString("utf8"));
~~~

Use Buffer.alloc() when you need a zero-filled buffer:

~~~js
import { Buffer } from "node:buffer";

const packet = Buffer.alloc(8);
packet.writeUInt16BE(513, 0);

console.log(packet);
~~~

Buffer.allocUnsafe(size) may be faster for some low-level operations, but its returned memory is not initialized. It can contain old data until every byte is overwritten. Do not expose or read those bytes before filling them. Beginners should normally prefer Buffer.alloc().

### Decode data at the right boundary

If bytes are known to be UTF-8 text, decode them as UTF-8. If they represent an image, compressed data, or a network protocol, do not convert them to text just because they are in a Buffer.

~~~js
import { readFile } from "node:fs/promises";

const text = await readFile("notes.txt", "utf8");
const bytes = await readFile("image.bin");

console.log(typeof text);
console.log(Buffer.isBuffer(bytes));
~~~

For a stream, decoding each arbitrary chunk separately with chunk.toString("utf8") can split a multibyte character across chunk boundaries. A readable stream can decode text while preserving the character boundary:

~~~js
import { createReadStream } from "node:fs";

const source = createReadStream("notes.txt", {
  encoding: "utf8"
});

for await (const textChunk of source) {
  console.log(textChunk);
}
~~~

Alternatively, use Node.js's StringDecoder when a custom byte-by-byte consumer needs to decode text incrementally.

## What is a stream?

A stream is an interface for handling data that arrives or is written over time. The source may be a file, a network connection, a generated sequence, or another stream.

Instead of holding the entire input and output in memory, a streaming program processes chunks as they become available. This can reduce memory pressure and let work begin before the full input is ready.

Node.js has four fundamental stream types:

| Type | Main role | Example |
| --- | --- | --- |
| Readable | Produces data for a consumer | A file being read |
| Writable | Receives data from a producer | A file being written |
| Duplex | Reads and writes independently | A network socket |
| Transform | Reads input, transforms it, and produces output | Compression or text conversion |

A Transform is a kind of Duplex stream with a transformation step between its writable and readable sides.

## Readable streams

A Readable supplies chunks. A file read stream is a common example:

~~~js
import { createReadStream } from "node:fs";

const readable = createReadStream("large.log");

for await (const chunk of readable) {
  console.log("Received", chunk.length, "bytes");
}
~~~

An async iterator is useful when the consumer needs to process chunks with ordinary await control flow. Each loop iteration waits for the next chunk, and the iteration ends when the stream finishes.

Readable streams can also be consumed with events or by calling read(). Choose one consumption style for a stream. Mixing data events, readable events, pipe(), pause(), and async iteration without a clear design can cause confusing flow behavior.

Do not attach a data listener just to observe a stream if another part of the program expects to consume it in paused mode. A data listener can switch a readable into flowing mode.

## Writable streams

A Writable accepts chunks:

~~~js
import { createWriteStream } from "node:fs";

const destination = createWriteStream("output.txt", {
  encoding: "utf8"
});

destination.write("First line\n");
destination.end("Last line\n");
~~~

write() does not mean that the bytes are already saved to the final destination. It submits data to the stream. Call end() when no more data will be written. In callback-based stream code, listen for completion and errors; do not treat a successful write() call as proof that a file has been fully written.

A Writable has an internal queue. If the consumer is slower than the producer, more chunks can wait in that queue.

## Backpressure: let the slower side set the pace

Suppose a program reads data quickly but writes to a slow destination. If it keeps writing without waiting, the queued data can consume increasing memory.

For a Writable, write(chunk) returns:

- true when the producer may continue writing for now;
- false when the producer should wait for the drain event before writing more.

~~~js
import { once } from "node:events";

if (!destination.write("A chunk\n")) {
  await once(destination, "drain");
}
~~~

The drain event means the Writable has made enough progress for the producer to resume. Real manual stream code must also handle errors and premature closure. For connected streams, prefer pipeline() because it coordinates flow control and error propagation.

Readable and Writable streams use a highWaterMark threshold to decide when to apply this pressure. It is a threshold for buffering behavior, not a promise that memory use can never exceed that number. In byte mode it is expressed in bytes. In object mode it is a count of objects.

~~~js
import { createReadStream } from "node:fs";

const readable = createReadStream("large.log", {
  highWaterMark: 64 * 1024
});
~~~

The chunk size and actual memory use can vary by stream implementation. Do not treat highWaterMark as a strict maximum allocation or a substitute for handling backpressure.

## Connect streams with pipeline()

pipeline() connects a source, optional transforms, and a destination. It forwards errors, coordinates backpressure, and completes when the whole chain finishes.

The promise version is convenient with async functions:

~~~js
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

await pipeline(
  createReadStream("input.txt"),
  createWriteStream("copy.txt")
);
~~~

A pipeline can include a Transform:

~~~js
import { createReadStream, createWriteStream } from "node:fs";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const uppercase = new Transform({
  decodeStrings: false,
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase());
  }
});

await pipeline(
  createReadStream("input.txt", { encoding: "utf8" }),
  uppercase,
  createWriteStream("uppercase.txt", { encoding: "utf8" })
);
~~~

The Readable decodes UTF-8 incrementally. Setting decodeStrings to false keeps each resulting string chunk as a string when it reaches the Transform. The output is written as UTF-8 text.

A production pipeline should allow errors to reach the caller:

~~~js
try {
  await pipeline(source, transform, destination);
  console.log("Processing complete.");
} catch (error) {
  console.error("Stream processing failed:", error.message);
}
~~~

Do not swallow a stream error and then report success. A read may fail, a transform may throw, or the destination may run out of space or close unexpectedly.

### Cancel work with an AbortSignal

The promise-based pipeline accepts an AbortSignal. Aborting the signal destroys the pipeline streams with an abort error:

~~~js
import { pipeline } from "node:stream/promises";

const controller = new AbortController();

const work = pipeline(source, transform, destination, {
  signal: controller.signal
});

controller.abort();

try {
  await work;
} catch (error) {
  console.log("The pipeline stopped:", error.name);
}
~~~

Cancellation is useful when a request is abandoned or an operation exceeds an application-defined time limit. The application still needs to decide how to report cancellation and clean up any unrelated resources.

## Object mode

By default, streams handle byte-like chunks. In object mode, a stream can pass JavaScript values such as objects instead of only strings or byte arrays.

~~~js
import { Readable } from "node:stream";

const records = Readable.from(
  [
    { id: 1, name: "Ada" },
    { id: 2, name: "Grace" }
  ],
  { objectMode: true }
);

for await (const record of records) {
  console.log(record.id, record.name);
}
~~~

Object mode is useful for application records, but it does not automatically make a stream safe for unlimited data. The highWaterMark is then a count of objects, and objects can vary greatly in memory size.

## Streams and memory use

Streaming helps avoid loading a complete input into memory, but it does not guarantee constant memory in every program. A transform might retain all chunks, a consumer might build a giant array, or a producer might ignore backpressure.

To keep memory usage predictable:

- process each chunk and release it when practical;
- avoid collecting the entire stream unless the total size is known to be small;
- use pipeline() for connected streams;
- choose a reasonable highWaterMark only after understanding the workload;
- consider object size as well as object count in object mode;
- handle cancellation and errors so work does not continue needlessly.

## Common mistakes

- Treating a Buffer as text without knowing its encoding.
- Assuming one UTF-8 character always fits in one byte.
- Decoding arbitrary chunks independently when a character may span chunk boundaries.
- Using Buffer.allocUnsafe() before overwriting every byte.
- Reading a huge file with readFile() when it should be processed incrementally.
- Calling write() repeatedly after it returns false.
- Treating highWaterMark as a strict memory limit.
- Forgetting to call end() when manually writing to a Writable.
- Ignoring stream errors or reporting success before the pipeline completes.
- Mixing stream consumption modes without a deliberate design.
- Assuming object mode bounds memory by bytes.
- Assuming a streaming API automatically prevents the application from accumulating all chunks.

## Key points

- A Buffer stores bytes; decoding those bytes produces text.
- The encoding must match the data, and multibyte characters can cross chunk boundaries.
- Readable produces data, Writable receives it, Duplex does both, and Transform changes data as it passes through.
- Streams process data incrementally and can reduce the need to keep a full input in memory.
- If write() returns false, a manual producer should wait for drain.
- highWaterMark guides buffering and flow control. It is not a strict memory cap.
- pipeline() is the usual choice for connecting streams because it coordinates backpressure, errors, and completion.
- Object mode passes values rather than bytes, so object sizes still matter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [125 - File system, paths, and URL handling in Node.js](125-file-system-paths-and-url-handling-in-node-js.md) | [Open Q&A](../qnas/126-buffers-streams-and-backpressure.md) | [Open example](../examples/126-buffers-streams-and-backpressure.md) | [127 - EventEmitter, signals, timers, and the Node.js event loop](127-eventemitter-signals-timers-and-the-node-js-event-loop.md) |
