# 120 - Web Crypto and secure random values: Q&A

Review secure random values, bounded integer selection, UUIDs, and the difference between random generation, hashing, and key operations. Each answer follows its question.

## Multiple-choice questions

### 1. Which API is appropriate for a decorative, non-security random choice?

- A. Math.random()
- B. crypto.subtle.generateKey()
- C. document.write()
- D. localStorage

**Answer: A.**

**Explanation:** Math.random() is suitable for ordinary presentation choices. It is not intended to resist prediction by an attacker.

### 2. Which API fills an integer typed array with cryptographically secure random values?

- A. crypto.random()
- B. crypto.getRandomValues()
- C. Math.secureRandom()
- D. Uint8Array.random()

**Answer: B.**

**Explanation:** Pass an integer typed array to getRandomValues(). The provided array is filled in place.

### 3. Which typed array is suitable for getRandomValues()?

- A. Float32Array
- B. Float64Array
- C. Uint8Array
- D. Array

**Answer: C.**

**Explanation:** getRandomValues() accepts integer typed arrays. Floating-point typed arrays are not supported for this method.

### 4. What is the maximum byte length for one getRandomValues() call?

- A. 256 bytes
- B. 4,096 bytes
- C. 65,536 bytes
- D. There is no limit

**Answer: C.**

**Explanation:** A larger array causes a quota error. If a larger amount is genuinely needed, request it in smaller calls.

### 5. How much random data does a Uint8Array with 32 entries hold?

- A. 32 bits
- B. 32 bytes, or 256 bits
- C. 64 bytes
- D. 1,024 bytes

**Answer: B.**

**Explanation:** Each Uint8Array element stores one byte. Thirty-two bytes contain 256 bits.

### 6. Does generating a token in browser JavaScript make it secret from the user running the page?

- A. Yes, JavaScript is hidden from the browser user.
- B. No, values available to the page can be inspected by that user.
- C. Yes, if the token is 64 characters.
- D. Only when using Math.random()

**Answer: B.**

**Explanation:** A browser client is under the control of the person running it. A client-generated value is not confidential from that client.

### 7. What does crypto.randomUUID() return?

- A. A UUID version 4 string
- B. An encrypted password
- C. A cryptographic key
- D. A user permission

**Answer: A.**

**Explanation:** randomUUID() is useful for identifiers. It does not provide authentication or authorization by itself.

### 8. Can a UUID replace an authorization check?

- A. Yes, if it is random
- B. No, access must still be authorized independently
- C. Yes, if it is version 4
- D. Only for administrator accounts

**Answer: B.**

**Explanation:** An identifier labels a record. The server must still check whether the current user is allowed to access that record.

### 9. Which Web Crypto property exposes low-level operations such as digest and key generation?

- A. crypto.subtle
- B. Math.subtle
- C. navigator.cryptoStorage
- D. window.random

**Answer: A.**

**Explanation:** SubtleCrypto provides asynchronous cryptographic operations. Its use generally requires a secure context.

### 10. What does a cryptographic digest do?

- A. Encrypts data so it can be decrypted later
- B. Produces a one-way hash value from data
- C. Generates a password
- D. Grants a browser permission

**Answer: B.**

**Explanation:** A digest is not encryption. It does not provide a way to recover the original data.

### 11. What API should be used to generate a cryptographic key?

- A. crypto.getRandomValues() and a hand-built key format
- B. crypto.subtle.generateKey() for the chosen algorithm and usages
- C. Math.random()
- D. Date.now()

**Answer: B.**

**Explanation:** The Web Crypto specification says not to generate keys using getRandomValues(). Use the algorithm's key-generation operation.

### 12. What does the false argument in this example request?

~~~js
crypto.subtle.generateKey(algorithm, false, usages);
~~~

- A. A key that can never be used
- B. A non-extractable key
- C. An encrypted key
- D. A public key only

**Answer: B.**

**Explanation:** The extractable flag controls whether key material can be exported with the normal export operation.

### 13. Why can taking a random integer modulo six be biased?

- A. The source value may have a range that is not divisible by six.
- B. JavaScript cannot represent six.
- C. Modulo always returns decimals.
- D. Uint32Array has only six values.

**Answer: A.**

**Explanation:** Some results can have one more possible input value than others. Rejection sampling removes the uneven remainder.

### 14. What does rejection sampling do?

- A. Repeats a request until the result is in an evenly divisible part of the source range
- B. Rejects every odd value
- C. Sorts all random values
- D. Encrypts the modulo result

**Answer: A.**

**Explanation:** It discards only values that would make outcomes uneven, then maps the accepted range to the requested bounds.

### 15. When would taking a modulo produce no bias?

- A. Whenever the random source is a Uint32Array
- B. When the source range is evenly divisible by the target range
- C. Whenever the target range is six
- D. Never, in any situation

**Answer: B.**

**Explanation:** If every outcome has the same number of source values, modulo is uniform. The size of the 32-bit range is not evenly divisible by most target ranges.

### 16. Does getRandomValues() request user permission?

- A. Yes, on every call
- B. No, it is an API call that does not show a permission prompt
- C. Only when the array has 32 elements
- D. Only in a Web Worker

**Answer: B.**

**Explanation:** It does not have a user-facing permission flow. The application still needs to handle API availability and design the use safely.

### 17. What does the browser use to provide secure random values?

- A. A cryptographically secure pseudorandom generator seeded with entropy
- B. The current time only
- C. A visible sequence of numbers
- D. A user's mouse position

**Answer: A.**

**Explanation:** The API provides cryptographically strong values through a pseudorandom generator seeded from appropriate entropy sources.

### 18. Which method is the secure-context exception in the Crypto interface?

- A. crypto.subtle
- B. crypto.randomUUID()
- C. crypto.getRandomValues()
- D. crypto.subtle.digest()

**Answer: C.**

**Explanation:** getRandomValues() is the special exception. SubtleCrypto and randomUUID() are marked for secure contexts.

### 19. What is a secure context for a deployed site?

- A. A page served over HTTPS
- B. A page with a long file name
- C. A page that uses Math.random()
- D. Any page opened from a file

**Answer: A.**

**Explanation:** Deploy security-sensitive browser features over HTTPS. Localhost is generally suitable for local development.

### 20. Is SHA-256 appropriate for storing user passwords by itself?

- A. Yes, because all hashes are slow
- B. No, fast digests allow guesses to be tested quickly
- C. Yes, if the output is hexadecimal
- D. Only when generated in the browser

**Answer: B.**

**Explanation:** Password storage needs a dedicated slow password-hashing design with suitable parameters, normally handled by the server.

## Short-answer questions

### 21. What is the difference between ordinary pseudo-random values and cryptographically secure random values?

**Answer:** Ordinary pseudo-random values are useful for presentation but are not designed to resist an attacker trying to predict them. Cryptographically secure values are produced by a generator intended to make prediction computationally infeasible.

**Explanation:** Use the source that matches the threat. A random-looking value is not automatically secure.

### 22. How does getRandomValues() use the array you pass to it?

**Answer:** It overwrites the entries in the supplied integer typed array and returns that same array.

**Explanation:** The array is changed in place. Its byte length is subject to the per-call limit.

### 23. Why should one not use getRandomValues() to assemble a key manually?

**Answer:** Key generation is a purpose-built operation provided by crypto.subtle.generateKey() for the selected algorithm.

**Explanation:** The key API handles algorithm-specific key generation requirements and returns a CryptoKey with defined usages.

### 24. What is a UUID useful for?

**Answer:** It is useful as a practical identifier for a record or request.

**Explanation:** It is not proof of identity, authorization, or guaranteed global uniqueness.

### 25. What is the difference between a digest and encryption?

**Answer:** A digest is a one-way summary of data. Encryption is designed to be reversible by someone with the appropriate key.

**Explanation:** Do not describe a hash as encrypted data.

### 26. Why is a value generated in browser code not a good long-term server secret?

**Answer:** The page and its values are available to the person running that page.

**Explanation:** Generate, validate, and protect authentication or recovery tokens as part of a server-side design.

### 27. What is modulo bias?

**Answer:** It is an uneven outcome distribution caused when a source range is mapped to a target range whose size does not divide the source range evenly.

**Explanation:** Rejection sampling avoids giving some target values an extra source representation.

### 28. Why is randomUUID() not an authorization mechanism?

**Answer:** The UUID identifies a resource but does not determine whether a user is allowed to access it.

**Explanation:** The server must perform an authorization check for every protected operation.

### 29. What should happen if a required crypto API is unavailable?

**Answer:** Detect the missing method and show a useful failure or use an explicitly acceptable alternative.

**Explanation:** Do not silently fall back to Math.random() for a security-sensitive value.

### 30. What is one reason not to put a token in a URL?

**Answer:** URLs can be copied, logged, saved in history, or sent as referrer data depending on the context.

**Explanation:** Keep sensitive tokens out of URLs and use a design that limits their exposure and lifetime.

## Scenarios

### 31. A game picks a background color using Math.random(). Is that necessarily a security flaw?

**Answer:** No. If the choice is purely decorative and prediction has no security or fairness consequence, ordinary randomness may be sufficient.

**Explanation:** Choose the random source based on what an attacker could gain by predicting or influencing the result.

### 32. A page creates password-reset links by calling Math.random(). What should change?

**Answer:** Use a server-side process with a cryptographically secure random source and a complete token lifecycle.

**Explanation:** Reset tokens must be unpredictable, validated server-side, limited in lifetime, and protected from exposure.

### 33. A developer generates a 32-byte array and calls it a secure browser session secret. What important limitation remains?

**Answer:** The value exists in the browser client and is available to the user and page scripts. It should not be treated as a server secret.

**Explanation:** Secure randomness protects unpredictability, not confidentiality from the client or safe storage.

### 34. A user selects a random integer from zero to five by reducing a random 32-bit value modulo six. What could be improved?

**Answer:** Use rejection sampling to discard values outside the evenly divisible part of the 32-bit range.

**Explanation:** This removes modulo bias so each result has the same number of source values.

### 35. An application uses SHA-256 on passwords before saving them. Is that enough?

**Answer:** No. Use a dedicated password hashing algorithm and appropriate work parameters on the server.

**Explanation:** Fast general-purpose digests make large numbers of password guesses cheap.

### 36. A key is created by filling an array with random bytes and passing those bytes into custom encryption code. What is the safer direction?

**Answer:** Use crypto.subtle.generateKey() for a supported algorithm and established cryptographic protocol.

**Explanation:** Do not implement key formats, encryption, or other cryptographic primitives by hand.

## Coding questions

### 37. Generate 16 secure random bytes and display them as hexadecimal.

**Answer:**

~~~js
function bytesToHex(bytes) {
  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

const bytes = new Uint8Array(16);
crypto.getRandomValues(bytes);

const value = bytesToHex(bytes);
console.log(value);
~~~

**Explanation:** The array contains 16 bytes. Hexadecimal uses two characters to display each byte, so the output has 32 characters.

### 38. Generate an unbiased integer from zero up to maxExclusive.

**Answer:**

~~~js
function secureRandomInt(maxExclusive) {
  const range = 2 ** 32;

  if (
    !Number.isSafeInteger(maxExclusive) ||
    maxExclusive < 1 ||
    maxExclusive > range
  ) {
    throw new RangeError("Invalid upper bound.");
  }

  const limit = Math.floor(range / maxExclusive) * maxExclusive;
  const sample = new Uint32Array(1);

  do {
    crypto.getRandomValues(sample);
  } while (sample[0] >= limit);

  return sample[0] % maxExclusive;
}
~~~

**Explanation:** Values above limit are rejected before modulo is applied. The returned integer is in the range zero inclusive to maxExclusive exclusive.

### 39. Create a UUID for a local record, but do not silently use a weak fallback.

**Answer:**

~~~js
function createRecordId() {
  if (typeof crypto.randomUUID !== "function") {
    throw new Error("Secure UUID generation is unavailable.");
  }

  return crypto.randomUUID();
}
~~~

**Explanation:** A missing API should be handled explicitly. Do not silently fall back to Math.random() if the identifier is security-sensitive.

### 40. Generate a non-extractable AES-GCM key with the Web Crypto key API.

**Answer:**

~~~js
async function createEncryptionKey() {
  if (!crypto.subtle) {
    throw new Error("Web Crypto is unavailable in this context.");
  }

  return crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
~~~

**Explanation:** generateKey() creates a key object for the selected algorithm and usages. This snippet does not provide a complete encryption protocol, nonce lifecycle, or key-storage design.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [119 - Browser security: XSS, injection, and safe DOM updates](../lessons/119-browser-security-xss-injection-and-safe-dom-updates.md) | [Open lesson](../lessons/120-web-crypto-and-secure-random-values.md) | [Open example](../examples/120-web-crypto-and-secure-random-values.md) | [121 - Browser rendering, scheduling, and performance](../lessons/121-browser-rendering-scheduling-and-performance.md) |
