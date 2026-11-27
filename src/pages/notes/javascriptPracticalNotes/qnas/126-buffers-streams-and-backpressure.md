# 126 - Buffers, streams, and backpressure: Q&A

Review byte data, stream types, flow control, and safe stream composition. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does a Buffer represent?

- A. A fixed-length sequence of bytes
- B. A JavaScript object tree
- C. A file path
- D. A decoded string in every case

**Answer: A.**

**Explanation:** A Buffer stores bytes. It does not know whether those bytes represent UTF-8 text, an image, or another format.

### 2. What does Buffer.from("hello", "utf8") create?

- A. A Buffer containing the UTF-8 bytes for the text
- B. A Readable stream
- C. A file handle
- D. A URL

**Answer: A.**

**Explanation:** Buffer.from() can encode text into bytes using the selected encoding.

### 3. Why should a beginner usually prefer Buffer.alloc() over Buffer.allocUnsafe()?

- A. Buffer.alloc() initializes the bytes to zero
- B. Buffer.alloc() creates a stream
- C. Buffer.allocUnsafe() always returns text
- D. Buffer.alloc() only works with UTF-8

**Answer: A.**

**Explanation:** allocUnsafe() does not initialize its memory. Every byte must be overwritten before it can be safely read or exposed.

### 4. Which stream type produces data for a consumer?

- A. Readable
- B. Writable
- C. Duplex only
- D. Transform only

**Answer: A.**

**Explanation:** A Readable supplies chunks that another part of a program can consume.

### 5. Which stream type transforms input into output?

- A. Transform
- B. Readable
- C. Writable
- D. FileHandle

**Answer: A.**

**Explanation:** A Transform has a writable side for input and a readable side for transformed output.

### 6. What should a manual producer generally do when writable.write(chunk) returns false?

- A. Wait for the drain event before writing more
- B. Keep writing faster
- C. Call readFile()
- D. Assume the chunk was discarded

**Answer: A.**

**Explanation:** false signals backpressure. The Writable needs time to process queued data before the producer continues.

### 7. What does highWaterMark represent?

- A. A threshold that guides buffering and flow control
- B. A strict maximum for all memory used by the program
- C. The size of a file on disk
- D. The number of bytes in every UTF-8 character

**Answer: A.**

**Explanation:** The threshold affects when a stream applies backpressure. It is not a general strict memory cap.

### 8. What is a key benefit of pipeline()?

- A. It coordinates connected streams, backpressure, errors, and completion
- B. It converts every file to JSON
- C. It removes the need to handle errors
- D. It guarantees that all data fits in memory

**Answer: A.**

**Explanation:** pipeline() manages the flow through connected streams and reports completion or failure.

### 9. Why can decoding each Buffer chunk independently with toString("utf8") be incorrect?

- A. A multibyte character can span two chunks
- B. UTF-8 cannot represent text
- C. Buffers cannot contain bytes
- D. toString() always reverses the bytes

**Answer: A.**

**Explanation:** A stream chunk boundary is unrelated to a text character boundary. Use a stream encoding or an incremental decoder.

### 10. In object mode, what does highWaterMark count?

- A. Objects
- B. Bytes only
- C. Files
- D. Event listeners

**Answer: A.**

**Explanation:** Object mode counts chunks as objects. Because objects have different sizes, the count alone does not describe total memory use.

## Short-answer questions

### 11. Name the four fundamental Node.js stream types and describe each briefly.

**Answer:** Readable produces data, Writable receives data, Duplex reads and writes, and Transform reads input while producing transformed output.

**Explanation:** These roles describe how data moves through a stream.

### 12. How can streaming reduce memory use compared with reading an entire file at once?

**Answer:** A streaming program can process chunks as they arrive instead of retaining the complete file contents at once.

**Explanation:** The application must still avoid accumulating every chunk elsewhere, or the memory benefit is lost.

### 13. Does using a stream guarantee that a program uses constant memory?

**Answer:** No.

**Explanation:** A transform can retain chunks, a consumer can build a large array, or a producer can ignore backpressure. The whole program's behavior determines memory use.

### 14. What is the difference between bytes and decoded text?

**Answer:** Bytes are stored values. Text is an interpretation of bytes using a character encoding such as UTF-8.

**Explanation:** The same bytes can be interpreted differently under different encodings, and not every byte sequence is valid text in a given encoding.

### 15. What does the drain event indicate?

**Answer:** A Writable has processed enough queued data for a producer that was waiting after write() returned false to resume.

**Explanation:** It is a flow-control signal, not a statement that the complete output file or remote operation has finished.

### 16. Why is highWaterMark not a strict memory cap?

**Answer:** It is a threshold used by a stream to decide when to stop requesting or accepting more data.

**Explanation:** Implementations, chunk sizes, transforms, and other application allocations can make actual memory use exceed the threshold.

## Scenarios

### 17. A program reads a large file quickly and writes it to a slow destination. What can happen if the program ignores write() returning false?

**Answer:** The destination's queue can grow, increasing memory use and potentially causing performance problems or exhaustion.

**Explanation:** The producer needs to respect backpressure or use pipeline() to coordinate the streams.

### 18. A streamed UTF-8 file occasionally shows a replacement character at a chunk boundary. What is a likely cause?

**Answer:** The program decoded each Buffer chunk separately, and a multibyte character was split between chunks.

**Explanation:** Decode through the stream's encoding option or use StringDecoder for custom incremental decoding.

### 19. A developer raises highWaterMark and says the application can no longer run out of memory. Is that conclusion correct?

**Answer:** No.

**Explanation:** highWaterMark guides stream buffering. It does not limit all memory use, and a larger threshold can permit more buffering.

### 20. A file-copy pipeline fails because the destination cannot be written, but the application logs “copy complete” anyway. What should change?

**Answer:** Let the pipeline rejection reach a catch block and report success only after the awaited pipeline completes.

**Explanation:** A stream error must not be swallowed or confused with normal completion.

### 21. A stream is consumed with async iteration, and another module adds a data listener to the same Readable. Why might this cause confusing behavior?

**Answer:** Attaching a data listener can switch the stream into flowing mode and interfere with the intended consumption design.

**Explanation:** Choose one clear way to consume a Readable instead of mixing modes without coordination.

### 22. A developer uses object mode with a highWaterMark of 10 and assumes memory use is always small. What is missing from that reasoning?

**Answer:** The ten objects may have very different sizes, and other parts of the program may allocate additional memory.

**Explanation:** In object mode, the threshold counts objects rather than bytes.

## Coding questions

### 23. Copy one file to another with the promise-based pipeline API.

**Answer:**

~~~js
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

try {
  await pipeline(
    createReadStream("input.bin"),
    createWriteStream("copy.bin")
  );

  console.log("Copy complete.");
} catch (error) {
  console.error("Copy failed:", error.message);
}
~~~

**Explanation:** Awaiting pipeline() lets the program report success only after the whole stream chain completes. Errors reject the promise.

### 24. Create a Transform that uppercases UTF-8 text chunks and connect it to file streams.

**Answer:**

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

**Explanation:** The source decodes UTF-8 while reading, and decodeStrings: false keeps those chunks as strings when they reach the Transform.

### 25. Create a Readable from two application records in object mode and consume it.

**Answer:**

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

**Explanation:** In object mode, each yielded JavaScript value is a chunk. The stream does not convert the records into bytes automatically.

### 26. Show the basic manual response to write() returning false.

**Answer:**

~~~js
import { once } from "node:events";

if (!writable.write(chunk)) {
  await once(writable, "drain");
}
~~~

**Explanation:** The producer waits for the Writable to make room before sending more data. Production code must also handle stream errors and premature closure. For a connected stream chain, pipeline() is usually simpler and safer.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [125 - File system, paths, and URL handling in Node.js](../lessons/125-file-system-paths-and-url-handling-in-node-js.md) | [Open lesson](../lessons/126-buffers-streams-and-backpressure.md) | [Open example](../examples/126-buffers-streams-and-backpressure.md) | [127 - EventEmitter, signals, timers, and the Node.js event loop](../lessons/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) |
