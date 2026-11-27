# 70 - ArrayBuffer, DataView, and typed arrays: Examples

These examples demonstrate how to allocate binary storage, create typed views, copy or share data, and read binary records. Each example includes a task, complete code, expected output, and an explanation.

## 1. Allocate raw bytes and view them

**Task:** Create a four-byte buffer and display its zero-initialized bytes.

~~~js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);

console.log(buffer.byteLength);
console.log(bytes.length);
console.log([...bytes].join(", "));
~~~

Expected output:

~~~text
4
4
0, 0, 0, 0
~~~

**Explanation:** The buffer holds four bytes. The unsigned byte view exposes those bytes as four elements.

## 2. Distinguish element count from byte count

**Task:** Compare the size of three 16-bit elements with their total byte length.

~~~js
const values = new Uint16Array(3);

console.log(values.length);
console.log(values.byteLength);
console.log(values.BYTES_PER_ELEMENT);
~~~

Expected output:

~~~text
3
6
2
~~~

**Explanation:** The numeric constructor argument is an element count. Each 16-bit element uses two bytes.

## 3. Initialize from values and copy a typed array

**Task:** Construct a typed array from values, then make an independent copy.

~~~js
const original = new Uint8Array([10, 20, 30]);
const copy = new Uint8Array(original);

copy[0] = 99;
console.log([...original].join(", "));
console.log([...copy].join(", "));
~~~

Expected output:

~~~text
10, 20, 30
99, 20, 30
~~~

**Explanation:** Constructing from another typed array copies and converts its element values into new storage.

## 4. Share one buffer across multiple views

**Task:** Write through one view and read the changed byte through another view.

~~~js
const buffer = new ArrayBuffer(4);
const allBytes = new Uint8Array(buffer);
const lastThree = new Uint8Array(buffer, 1, 3);

lastThree[0] = 42;
console.log(allBytes[1]);
console.log(buffer.byteLength);
~~~

Expected output:

~~~text
42
4
~~~

**Explanation:** Both views refer to the same buffer. The first element of **lastThree** corresponds to byte offset 1 of **allBytes**.

## 5. Inspect a view's byte offset and length

**Task:** Create a view over part of a buffer and inspect its metadata.

~~~js
const buffer = new ArrayBuffer(16);
const values = new Uint16Array(buffer, 4, 3);

console.log(values.length);
console.log(values.byteLength);
console.log(values.byteOffset);
console.log(values.buffer === buffer);
~~~

Expected output:

~~~text
3
6
4
true
~~~

**Explanation:** The view begins four bytes into the buffer and covers three two-byte elements.

## 6. Check typed array byte alignment

**Task:** Catch an invalid offset for a 16-bit view.

~~~js
const buffer = new ArrayBuffer(8);

try {
  new Uint16Array(buffer, 1);
} catch (error) {
  console.log(error instanceof RangeError);
}
~~~

Expected output:

~~~text
true
~~~

**Explanation:** A typed array's byte offset must be aligned to the element size. A 16-bit typed array needs an even offset.

## 7. Observe unsigned 8-bit conversion

**Task:** Assign values outside the unsigned byte range.

~~~js
const bytes = new Uint8Array([-1, 0, 255, 256, 257, 2.9]);
console.log([...bytes].join(", "));
~~~

Expected output:

~~~text
255, 0, 255, 0, 1, 2
~~~

**Explanation:** Values are converted to unsigned 8-bit integers. Fractions are truncated toward zero, and integer values wrap into the range from 0 through 255.

## 8. Compare Uint8Array with Uint8ClampedArray

**Task:** Clamp image-like channel values to the byte range.

~~~js
const values = [-2, 1.5, 2.5, 3.5, 300];
const wrapped = new Uint8Array(values);
const clamped = new Uint8ClampedArray(values);

console.log([...wrapped].join(", "));
console.log([...clamped].join(", "));
~~~

Expected output:

~~~text
254, 2, 2, 4, 44
0, 2, 2, 4, 255
~~~

**Explanation:** **Uint8Array** wraps converted values modulo 256. **Uint8ClampedArray** clamps outside values and rounds halfway values to the nearest even integer.

## 9. Store large integers with BigInt typed arrays

**Task:** Store an integer above Number's safe integer range.

~~~js
const values = new BigUint64Array([9007199254740993n]);
console.log(values[0]);
console.log(values[0] > BigInt(Number.MAX_SAFE_INTEGER));
~~~

Expected output:

~~~text
9007199254740993n
true
~~~

**Explanation:** BigInt typed arrays store BigInt values. They can represent 64-bit integer data that Number cannot represent exactly.

## 10. Use subarray() as a shared view

**Task:** Change a subarray and observe the original typed array change.

~~~js
const bytes = new Uint8Array([10, 20, 30, 40]);
const middle = bytes.subarray(1, 3);

middle[0] = 99;
console.log([...bytes].join(", "));
console.log([...middle].join(", "));
~~~

Expected output:

~~~text
10, 99, 30, 40
99, 30
~~~

**Explanation:** **subarray()** creates a view over the same buffer. The two views share their bytes.

## 11. Use slice() as an independent copy

**Task:** Change a slice and verify the original is unchanged.

~~~js
const bytes = new Uint8Array([10, 20, 30, 40]);
const copy = bytes.slice(1, 3);

copy[0] = 99;
console.log([...bytes].join(", "));
console.log([...copy].join(", "));
~~~

Expected output:

~~~text
10, 20, 30, 40
99, 30
~~~

**Explanation:** **slice()** allocates new typed array storage and copies the selected values.

## 12. Copy into a target typed array with set()

**Task:** Put two values into a larger typed array starting at element offset 2.

~~~js
const target = new Uint8Array(5);
target.set([7, 8], 2);

console.log([...target].join(", "));
~~~

Expected output:

~~~text
0, 0, 7, 8, 0
~~~

**Explanation:** The offset for **set()** is measured in target elements. The input values are copied into the target view.

## 13. Use typed array methods

**Task:** Map byte values and check the result's type.

~~~js
const scores = new Uint8Array([30, 10, 20]);
const doubled = scores.map((score) => score * 2);

console.log([...doubled].join(", "));
console.log(doubled instanceof Uint8Array);
~~~

Expected output:

~~~text
60, 20, 40
true
~~~

**Explanation:** Typed array methods such as **map()** return a typed array of the same kind.

## 14. Read and write a mixed binary record

**Task:** Store an 8-bit flag, a 16-bit count, and a 32-bit float in one buffer.

~~~js
const buffer = new ArrayBuffer(7);
const view = new DataView(buffer);

view.setUint8(0, 1);
view.setUint16(1, 500, true);
view.setFloat32(3, 1.5, true);

console.log(view.getUint8(0));
console.log(view.getUint16(1, true));
console.log(view.getFloat32(3, true));
~~~

Expected output:

~~~text
1
500
1.5
~~~

**Explanation:** **DataView** lets one record contain multiple numeric types at explicit byte offsets. The two multi-byte fields specify little-endian order.

## 15. Read the same bytes with different endianness

**Task:** Write a 16-bit value in little-endian order and inspect both interpretations.

~~~js
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

view.setUint16(0, 0x1234, true);

console.log(view.getUint8(0).toString(16));
console.log(view.getUint8(1).toString(16));
console.log(view.getUint16(0, true).toString(16));
console.log(view.getUint16(0, false).toString(16));
~~~

Expected output:

~~~text
34
12
1234
3412
~~~

**Explanation:** Little-endian stores the least significant byte first. Reading the same two bytes as big-endian gives a different number.

## 16. Use DataView at an unaligned byte offset

**Task:** Read a 16-bit value beginning at byte offset 1.

~~~js
const buffer = new ArrayBuffer(3);
const view = new DataView(buffer);

view.setUint8(0, 0xaa);
view.setUint16(1, 0x1234, false);

console.log(view.getUint16(1, false).toString(16));
~~~

Expected output:

~~~text
1234
~~~

**Explanation:** **DataView** accesses values at byte offsets and does not require the offset to align with the field width. The whole field must still fit in the view.

## 17. Catch an out-of-range DataView access

**Task:** Read a 32-bit field from a buffer that is too short.

~~~js
const view = new DataView(new ArrayBuffer(2));

try {
  view.getUint32(0);
} catch (error) {
  console.log(error instanceof RangeError);
}
~~~

Expected output:

~~~text
true
~~~

**Explanation:** The requested four-byte field exceeds the two-byte view, so **DataView** throws a **RangeError**.

## 18. Read and write 64-bit integers with DataView

**Task:** Store and retrieve signed and unsigned BigInt values.

~~~js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);

view.setBigInt64(0, -12n, true);
view.setBigUint64(8, 9007199254740993n, true);

console.log(view.getBigInt64(0, true));
console.log(view.getBigUint64(8, true));
~~~

Expected output:

~~~text
-12n
9007199254740993n
~~~

**Explanation:** DataView's 64-bit integer methods use BigInt values. The byte order is specified separately for each multi-byte field.

## 19. Use a Float16Array when supported

**Task:** Create and inspect 16-bit floating-point values.

~~~js
if (typeof Float16Array === "function") {
  const values = new Float16Array([1.5, -2.25]);
  console.log(values.length);
  console.log(values[0]);
  console.log(values[1]);
} else {
  console.log("Float16Array unavailable");
}
~~~

Expected output when supported:

~~~text
2
1.5
-2.25
~~~

**Explanation:** **Float16Array** stores 16-bit floating-point elements. It uses less memory than Float32Array but has less precision and range.

## 20. Encode and decode a string as UTF-8

**Task:** Convert a string to bytes, then decode those bytes back to text.

~~~js
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const bytes = encoder.encode("Hi");

console.log([...bytes].join(", "));
console.log(decoder.decode(bytes));
~~~

Expected output:

~~~text
72, 105
Hi
~~~

**Explanation:** **TextEncoder** produces UTF-8 bytes in a **Uint8Array**. **TextDecoder** turns the encoded bytes back into a string.

## 21. Encode a non-ASCII character

**Task:** Observe how a non-ASCII character uses multiple UTF-8 bytes.

~~~js
const bytes = new TextEncoder().encode("Aé");
console.log([...bytes].join(", "));
~~~

Expected output:

~~~text
65, 195, 169
~~~

**Explanation:** The ASCII letter is one byte. In UTF-8, **é** is encoded with two bytes.

## 22. Convert bytes to hexadecimal when supported

**Task:** Encode and decode a byte array as hexadecimal text.

~~~js
const bytes = new Uint8Array([10, 255]);

if (typeof bytes.toHex === "function" && typeof Uint8Array.fromHex === "function") {
  const hex = bytes.toHex();
  const decoded = Uint8Array.fromHex(hex);
  console.log(hex);
  console.log([...decoded].join(", "));
} else {
  console.log("hex methods unavailable");
}
~~~

Expected output when supported:

~~~text
0aff
10, 255
~~~

**Explanation:** **toHex()** represents each byte with two hexadecimal digits. **Uint8Array.fromHex()** decodes the string into bytes. Older runtimes may use the fallback output.

## 23. Convert bytes to base64 when supported

**Task:** Encode and decode UTF-8 bytes with the Uint8Array base64 methods.

~~~js
const bytes = new TextEncoder().encode("Hi");

if (typeof bytes.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function") {
  const encoded = bytes.toBase64();
  const decoded = Uint8Array.fromBase64(encoded);
  console.log(encoded);
  console.log(new TextDecoder().decode(decoded));
} else {
  console.log("base64 methods unavailable");
}
~~~

Expected output when supported:

~~~text
SGk=
Hi
~~~

**Explanation:** Base64 methods encode and decode bytes. For string data, encode the string to UTF-8 first.

## 24. Decode hexadecimal into an existing byte array

**Task:** Use **setFromHex()** when the runtime supports it.

~~~js
const target = new Uint8Array(4);

if (typeof target.setFromHex === "function") {
  const result = target.setFromHex("a1b2");
  console.log([...target].join(", "));
  console.log(result.read, result.written);
} else {
  console.log("setFromHex unavailable");
}
~~~

Expected output when supported:

~~~text
161, 178, 0, 0
4 2
~~~

**Explanation:** **setFromHex()** writes decoded bytes into an existing array and reports the number of input characters read and output bytes written. This modern API may be missing in older runtimes.

## 25. Resize a buffer and observe a length-tracking view

**Task:** Grow a resizable buffer and inspect a typed array view created without a fixed element count.

~~~js
if (typeof ArrayBuffer.prototype.resize === "function") {
  const buffer = new ArrayBuffer(2, { maxByteLength: 4 });
  const view = new Uint8Array(buffer);

  view[0] = 9;
  buffer.resize(4);

  console.log(buffer.byteLength);
  console.log(view.length);
  console.log([...view].join(", "));
} else {
  console.log("Resizable ArrayBuffer unavailable");
}
~~~

Expected output when supported:

~~~text
4
4
9, 0, 0, 0
~~~

**Explanation:** The view tracks the size of the resizable buffer because no fixed element count was supplied. Newly added bytes contain zero.

## 26. Compare length-tracking and fixed-length views

**Task:** Grow the same buffer and compare a view with an explicit element count to a length-tracking view.

~~~js
if (typeof ArrayBuffer.prototype.resize === "function") {
  const buffer = new ArrayBuffer(2, { maxByteLength: 4 });
  const tracking = new Uint8Array(buffer);
  const fixed = new Uint8Array(buffer, 0, 2);

  console.log(tracking.length, fixed.length);
  buffer.resize(4);
  console.log(tracking.length, fixed.length);
} else {
  console.log("Resizable ArrayBuffer unavailable");
}
~~~

Expected output when supported:

~~~text
2 2
4 2
~~~

**Explanation:** The first view tracks the buffer's current length. The second view has a fixed length of two elements.

## 27. Transfer a buffer when supported

**Task:** Move bytes into a new buffer and inspect the detached original.

~~~js
if (typeof ArrayBuffer.prototype.transfer === "function") {
  const original = new ArrayBuffer(2);
  new Uint8Array(original).set([4, 5]);

  const moved = original.transfer();

  console.log(original.byteLength);
  console.log(moved.byteLength);
  console.log([...new Uint8Array(moved)].join(", "));
} else {
  console.log("ArrayBuffer transfer unavailable");
}
~~~

Expected output when supported:

~~~text
0
2
4, 5
~~~

**Explanation:** The original is detached and the new buffer owns the bytes. Views associated with the original buffer can no longer access its previous contents.

## 28. Check whether a value is a view

**Task:** Distinguish an ArrayBuffer from typed arrays and DataView.

~~~js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);
const view = new DataView(buffer);

console.log(ArrayBuffer.isView(buffer));
console.log(ArrayBuffer.isView(bytes));
console.log(ArrayBuffer.isView(view));
~~~

Expected output:

~~~text
false
true
true
~~~

**Explanation:** **ArrayBuffer.isView()** returns true for typed arrays and **DataView**, but false for the underlying buffer.

## 29. Detect Float16 DataView support

**Task:** Write and read a float16 value only when both methods exist.

~~~js
const view = new DataView(new ArrayBuffer(2));

if (typeof view.setFloat16 === "function" && typeof view.getFloat16 === "function") {
  view.setFloat16(0, 1.5, true);
  console.log(view.getFloat16(0, true));
} else {
  console.log("DataView float16 methods unavailable");
}
~~~

Expected output when supported:

~~~text
1.5
~~~

**Explanation:** The feature check prevents an older runtime from trying to call methods it does not implement.

## 30. Build ordinary array data from a typed view

**Task:** Create an ordinary array, extend it, and show that the typed array is unchanged.

~~~js
const bytes = new Uint8Array([3, 1, 2]);
const values = Array.from(bytes);
values.push(4);

console.log(Array.isArray(values));
console.log(values.join(", "));
console.log(bytes.join(", "));
~~~

Expected output:

~~~text
true
3, 1, 2, 4
3, 1, 2
~~~

**Explanation:** **Array.from()** creates a new ordinary array. It does not expose or share the typed array's buffer.

## Review checklist

For each example, make sure you can identify:

- Which object owns the bytes and which objects view them.
- Whether a constructor copies values or shares an existing buffer.
- Whether an offset is measured in bytes or elements.
- Whether a typed array conversion wraps, clamps, rounds, or requires BigInt.
- Whether **slice()** or **subarray()** is the intended operation.
- Which byte order is used for each DataView field.
- Whether a newer API is protected by a feature check.
- How encoding changes text into bytes.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [69 - Generators and yield](../lessons/069-generators-and-yield.md) | [Open lesson](../lessons/070-arraybuffer-dataview-and-typed-arrays.md) | [Open Q&A](../qnas/070-arraybuffer-dataview-and-typed-arrays.md) | [71 - SharedArrayBuffer, Atomics, and shared memory](../lessons/071-sharedarraybuffer-atomics-and-shared-memory.md) |
