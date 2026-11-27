# 120 - Web Crypto and secure random values

This example is a local browser demo for secure random bytes, a UUID, an unbiased die roll, a SHA-256 digest, and Web Crypto key generation. It uses no third-party library.

The generated value is shown on the page for learning. It is not a server session token or a secret from the person using the browser.

## Create these files

Make a folder named <code>web-crypto-demo</code> and add the four files below.

### <code>web-crypto-demo/index.html</code>

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web Crypto demo</title>
    <link rel="stylesheet" href="styles.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Web Crypto demo</h1>
      <p>
        Generate sample values in this browser. They are not sent to a server.
      </p>

      <p id="status" role="status" aria-atomic="true">
        Choose a demo below.
      </p>

      <section aria-labelledby="uuid-heading">
        <h2 id="uuid-heading">UUID identifier</h2>
        <p>A UUID identifies a record. It does not grant access to that record.</p>
        <button id="uuid-button" type="button">Generate UUID</button>
        <p class="value" id="uuid-output">No UUID generated yet.</p>
      </section>

      <section aria-labelledby="bytes-heading">
        <h2 id="bytes-heading">32 random bytes</h2>
        <p>
          This demonstration displays 32 random bytes as 64 hexadecimal
          characters. Do not use a value displayed in a public browser page as
          a server secret.
        </p>
        <button id="bytes-button" type="button">Generate random bytes</button>
        <p class="value" id="bytes-output">No bytes generated yet.</p>
      </section>

      <section aria-labelledby="integer-heading">
        <h2 id="integer-heading">Unbiased integer</h2>
        <p>The result should be a number from 1 through 6.</p>
        <button id="die-button" type="button">Roll a secure die</button>
        <p class="value" id="die-output">No result yet.</p>
      </section>

      <section aria-labelledby="digest-heading">
        <h2 id="digest-heading">SHA-256 digest</h2>
        <label for="digest-input">Text to fingerprint</label>
        <input id="digest-input" type="text" value="hello">
        <button id="digest-button" type="button">Calculate digest</button>
        <p class="value" id="digest-output">No digest calculated yet.</p>
        <p>
          A digest is not encryption and this fast hash is not for password
          storage.
        </p>
      </section>

      <section aria-labelledby="key-heading">
        <h2 id="key-heading">Generate a non-extractable key</h2>
        <p>
          The demo creates an AES-GCM CryptoKey in memory. It does not display
          or export the key, and it does not encrypt data.
        </p>
        <button id="key-button" type="button">Generate AES key</button>
        <p class="value" id="key-output">No key generated yet.</p>
      </section>
    </main>
  </body>
</html>
~~~

### <code>web-crypto-demo/styles.css</code>

~~~css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem;
  color: #1b1b1b;
  background: #fff;
  font: 1rem/1.6 system-ui, sans-serif;
}

main {
  width: min(100%, 48rem);
  margin-inline: auto;
}

section {
  margin-block: 2rem;
  padding-block: 1rem;
  border-top: 1px solid #8a8a8a;
}

h1,
h2 {
  line-height: 1.2;
}

button,
input {
  padding: 0.65rem 0.8rem;
  font: inherit;
}

button {
  color: #fff;
  background: #174ea6;
  border: 2px solid #174ea6;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background: #123d83;
}

button:focus-visible,
input:focus-visible {
  outline: 3px solid #b45309;
  outline-offset: 3px;
}

label {
  display: block;
  margin-block-end: 0.4rem;
  font-weight: 700;
}

.value {
  overflow-wrap: anywhere;
  padding: 0.75rem;
  background: #f2f4f7;
  border: 1px solid #aab0b8;
  border-radius: 0.25rem;
  font-family: ui-monospace, monospace;
}

#status {
  min-height: 1.6em;
  font-weight: 700;
}

@media (max-width: 32rem) {
  body {
    padding: 1rem;
  }

  input {
    width: 100%;
    margin-block-end: 0.5rem;
  }
}
~~~

### <code>web-crypto-demo/app.js</code>

~~~js
"use strict";

const status = document.querySelector("#status");

const uuidButton = document.querySelector("#uuid-button");
const uuidOutput = document.querySelector("#uuid-output");

const bytesButton = document.querySelector("#bytes-button");
const bytesOutput = document.querySelector("#bytes-output");

const dieButton = document.querySelector("#die-button");
const dieOutput = document.querySelector("#die-output");

const digestInput = document.querySelector("#digest-input");
const digestButton = document.querySelector("#digest-button");
const digestOutput = document.querySelector("#digest-output");

const keyButton = document.querySelector("#key-button");
const keyOutput = document.querySelector("#key-output");

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function secureRandomInt(maxExclusive) {
  const range = 2 ** 32;

  if (
    !Number.isSafeInteger(maxExclusive) ||
    maxExclusive < 1 ||
    maxExclusive > range
  ) {
    throw new RangeError("The maximum must be from 1 through 2^32.");
  }

  const limit = Math.floor(range / maxExclusive) * maxExclusive;
  const sample = new Uint32Array(1);

  do {
    crypto.getRandomValues(sample);
  } while (sample[0] >= limit);

  return sample[0] % maxExclusive;
}

uuidButton.addEventListener("click", () => {
  if (typeof crypto.randomUUID !== "function") {
    status.textContent =
      "UUID generation is unavailable in this browser context.";
    return;
  }

  uuidOutput.textContent = crypto.randomUUID();
  status.textContent = "A UUID was generated and displayed below.";
});

bytesButton.addEventListener("click", () => {
  if (typeof crypto.getRandomValues !== "function") {
    status.textContent = "Secure random values are unavailable here.";
    return;
  }

  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  bytesOutput.textContent = bytesToHex(bytes);
  status.textContent =
    "32 random bytes were generated. This displayed demo value is not a server secret.";
});

dieButton.addEventListener("click", () => {
  if (typeof crypto.getRandomValues !== "function") {
    status.textContent = "Secure random values are unavailable here.";
    return;
  }

  try {
    const result = secureRandomInt(6) + 1;
    dieOutput.textContent = String(result);
    status.textContent = "The secure die result is " + result + ".";
  } catch {
    status.textContent = "The browser could not generate a secure result.";
  }
});

digestButton.addEventListener("click", async () => {
  if (!crypto.subtle) {
    status.textContent =
      "The digest API is unavailable. Use HTTPS or localhost.";
    return;
  }

  try {
    const data = new TextEncoder().encode(digestInput.value);
    const digest = await crypto.subtle.digest("SHA-256", data);

    digestOutput.textContent = bytesToHex(new Uint8Array(digest));
    status.textContent = "A SHA-256 digest was calculated.";
  } catch {
    status.textContent = "The browser could not calculate the digest.";
  }
});

keyButton.addEventListener("click", async () => {
  if (!crypto.subtle) {
    status.textContent =
      "Key generation is unavailable. Use HTTPS or localhost.";
    return;
  }

  try {
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    keyOutput.textContent =
      key.algorithm.name +
      " key created. Extractable: " +
      key.extractable +
      ". Usages: " +
      key.usages.join(", ") +
      ".";

    status.textContent =
      "A non-extractable key object was created in memory.";
  } catch {
    status.textContent = "The browser could not generate the key.";
  }
});
~~~

### <code>web-crypto-demo/server.mjs</code>

The SubtleCrypto and randomUUID parts need a secure context. This small development server uses Node.js built-in modules and serves the demo from localhost.

~~~js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const files = new Map([
  ["/", { name: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { name: "index.html", type: "text/html; charset=utf-8" }],
  ["/styles.css", { name: "styles.css", type: "text/css; charset=utf-8" }],
  ["/app.js", { name: "app.js", type: "text/javascript; charset=utf-8" }]
]);

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const file = files.get(pathname);

  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  try {
    const contents = await readFile(new URL(file.name, import.meta.url));

    response.writeHead(200, {
      "Content-Type": file.type,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    });
    response.end(contents);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Could not read the demo file");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Open http://localhost:4173");
});
~~~

## Run the example

Open a terminal in the folder that contains <code>web-crypto-demo</code> and run:

~~~sh
node web-crypto-demo/server.mjs
~~~

Open <code>http://localhost:4173</code> in a browser. The server uses only Node.js built-in modules.

## Try it

1. Select **Generate UUID**. The output should be a version 4 UUID string.
2. Select **Generate random bytes**. The output should be 64 hexadecimal characters representing 32 bytes.
3. Select **Roll a secure die** several times. Each result should be an integer from 1 through 6.
4. Leave the text as <code>hello</code> and select **Calculate digest**. The SHA-256 digest should be <code>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code>.
5. Select **Generate AES key**. The page shows the algorithm, extractability, and permitted usages, not the raw key.

The UUID, random bytes, die result, and generated key are not fixed. They can differ on every run.

## Expected result

The page reports each action in a status region. UUID generation displays an identifier. Random byte generation displays a 64-character hexadecimal value. The die result is an integer from 1 through 6. The digest of the default text is stable because the same input and hash algorithm produce the same digest. Key generation reports a non-extractable AES-GCM key object.

The page performs every operation locally. It does not save values or send them to a server.

## Why the example is structured this way

- The UUID API is used for an identifier, not as an access-control decision.
- Random bytes come from getRandomValues(), not Math.random().
- The bounded integer helper uses rejection sampling to avoid modulo bias.
- The digest is demonstrated on sample text, not a password.
- Key material is created through generateKey() and marked non-extractable.
- The demo displays generated bytes to teach their format, and clearly says they are not a server secret.
- SubtleCrypto is checked and its asynchronous operations are handled with try/catch.
- A localhost server provides the secure development context required for the secure-context APIs.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [119 - Browser security: XSS, injection, and safe DOM updates](../lessons/119-browser-security-xss-injection-and-safe-dom-updates.md) | [Open Q&A](../qnas/120-web-crypto-and-secure-random-values.md) | [Open lesson](../lessons/120-web-crypto-and-secure-random-values.md) | [121 - Browser rendering, scheduling, and performance](../lessons/121-browser-rendering-scheduling-and-performance.md) |
