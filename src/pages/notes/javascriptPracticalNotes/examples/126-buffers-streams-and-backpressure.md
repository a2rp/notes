# 126 - Buffers, streams, and backpressure

This example reads a UTF-8 text file as a stream, converts each text chunk to uppercase, and writes the result to another file. It tracks the input byte and chunk counts without collecting the full file in an array.

## Create these files

Create a folder named `stream-transform-demo` with this structure:

~~~text
stream-transform-demo/
  app.mjs
  data/
    input.txt
~~~

### `stream-transform-demo/data/input.txt`

~~~text
Node.js streams handle data in chunks.
This café example keeps UTF-8 text intact.
A slow destination can apply backpressure.
~~~

### `stream-transform-demo/app.mjs`

~~~js
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { Buffer } from "node:buffer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const modulePath = fileURLToPath(import.meta.url);
const moduleDirectory = path.dirname(modulePath);
const inputPath = path.join(moduleDirectory, "data", "input.txt");
const outputDirectory = path.join(moduleDirectory, "output");
const outputPath = path.join(outputDirectory, "uppercase.txt");

async function main() {
  await mkdir(outputDirectory, { recursive: true });

  let inputBytes = 0;
  let inputChunks = 0;

  const uppercase = new Transform({
    // Preserve string chunks supplied by the UTF-8 decoding Readable.
    decodeStrings: false,

    transform(textChunk, encoding, callback) {
      inputChunks += 1;
      inputBytes += Buffer.byteLength(textChunk, "utf8");

      callback(null, textChunk.toUpperCase());
    }
  });

  await pipeline(
    createReadStream(inputPath, { encoding: "utf8" }),
    uppercase,
    createWriteStream(outputPath, { encoding: "utf8" })
  );

  const outputStats = await stat(outputPath);

  console.log("Input file:", inputPath);
  console.log("Input bytes:", inputBytes);
  console.log("Input chunks:", inputChunks);
  console.log("Output file:", outputPath);
  console.log("Output bytes:", outputStats.size);
  console.log("Stream processing complete.");
}

main().catch((error) => {
  console.error("Stream processing failed:", error.message);
  process.exitCode = 1;
});
~~~

## Run the example

From the directory containing `stream-transform-demo`, run:

~~~sh
node stream-transform-demo/app.mjs
~~~

The program creates the `output` directory if it does not exist. It reads the input relative to the module file, so the example does not depend on the terminal's current working directory.

## Expected output file

The file `stream-transform-demo/output/uppercase.txt` contains:

~~~text
NODE.JS STREAMS HANDLE DATA IN CHUNKS.
THIS CAFÉ EXAMPLE KEEPS UTF-8 TEXT INTACT.
A SLOW DESTINATION CAN APPLY BACKPRESSURE.
~~~

The console also prints the input and output paths, byte counts, chunk count, and a completion message. Exact paths and chunk counts depend on the environment and stream behavior. The text and byte counts for the provided input are deterministic with UTF-8.

Run the program again to replace the output with the same transformed contents. If the input file is missing, unreadable, or the output cannot be written, pipeline() rejects and the error handler reports failure.

## What the example demonstrates

- createReadStream() produces the file incrementally instead of loading the entire input with readFile().
- The Readable's UTF-8 encoding decodes multibyte characters safely across the underlying byte chunks.
- decodeStrings: false keeps those decoded string chunks as strings when they reach the Transform.
- Buffer.byteLength() measures the UTF-8 bytes represented by each input string chunk.
- The Transform changes each chunk and sends it onward as output.
- createWriteStream() accepts the transformed chunks and writes them incrementally.
- pipeline() connects the streams, coordinates backpressure, and propagates errors.
- The example tracks counts rather than storing all chunks in memory.

The transform's uppercase operation is suitable for this text demonstration. Real text processing may need locale-specific rules or a parser that understands the content format.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [125 - File system, paths, and URL handling in Node.js](../lessons/125-file-system-paths-and-url-handling-in-node-js.md) | [Open Q&A](../qnas/126-buffers-streams-and-backpressure.md) | [Open lesson](../lessons/126-buffers-streams-and-backpressure.md) | [127 - EventEmitter, signals, timers, and the Node.js event loop](../lessons/127-eventemitter-signals-timers-and-the-node-js-event-loop.md) |
