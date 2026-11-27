# 70 - ArrayBuffer, DataView, and typed arrays: Q&A

Use these questions to review binary storage, typed views, value conversion, byte order, and modern buffer features. Each answer appears immediately after its question.

## Multiple-choice questions

### 1. What does an ArrayBuffer store?

- A. A sequence of JavaScript strings
- B. A block of raw bytes
- C. A collection of object properties
- D. A sequence of BigInt values only

**Answer: B.** An **ArrayBuffer** owns raw binary storage. A typed array or **DataView** is used to interpret and access its bytes.

### 2. What does a typed array provide?

- A. A view of buffer bytes as elements of one numeric type
- B. A way to resize every buffer
- C. A string encoding by itself
- D. A view that can only read data

**Answer: A.** A typed array views a buffer as indexed values of one fixed element type, such as unsigned bytes or 32-bit floats.

### 3. What does the numeric argument mean in **new Uint16Array(4)**?

- A. Allocate 4 bytes
- B. Allocate 4 elements
- C. Set the fourth element to 16
- D. Set a 4-byte offset

**Answer: B.** The number is an element count. Four 16-bit elements use 8 bytes.

### 4. What happens when a typed array is constructed from an ArrayBuffer?

- A. It normally creates a view over the buffer's storage.
- B. It always converts the buffer to a string.
- C. It always copies the bytes into a new buffer.
- D. It detaches the buffer.

**Answer: A.** A typed array constructed from an **ArrayBuffer** views that buffer. Writes through the view affect the buffer and other views of the same bytes.

### 5. What happens when a typed array is constructed from another typed array?

- A. The new view always shares the source buffer.
- B. The constructor copies and converts the source element values.
- C. The source buffer is detached.
- D. The values become object properties.

**Answer: B.** Passing a typed array creates new typed array storage and copies the element values, converting them for the destination element type.

### 6. Which typed array method creates a view of part of the same buffer?

- A. **slice()**
- B. **subarray()**
- C. **map()**
- D. **Array.from()**

**Answer: B.** **subarray()** creates a new view over the same underlying bytes. **slice()** copies values into new storage.

### 7. What does DataView add over a typed array?

- A. Explicit byte offsets and control of byte order for multi-byte reads and writes
- B. Automatic text encoding
- C. A guarantee that all values are exact
- D. A way to change values without a buffer

**Answer: A.** **DataView** can read or write different numeric formats at specified byte offsets and lets you choose the byte order for multi-byte fields.

### 8. What is the default byte order for a multi-byte DataView operation when the endian argument is omitted?

- A. Little-endian
- B. Big-endian
- C. The previous operation's byte order
- D. The byte order of the first typed array created

**Answer: B.** DataView multi-byte methods default to big-endian. Pass **true** for little-endian when required by the data format.

### 9. What happens when **new Uint8Array([-1, 256, 257])** is created?

- A. It throws a **RangeError**.
- B. It contains **0, 255, 256**.
- C. It contains **255, 0, 1**.
- D. It contains **-1, 256, 257**.

**Answer: C.** Unsigned 8-bit conversion wraps values into the range 0 through 255.

### 10. Which typed array is designed to clamp values into the range 0 through 255?

- A. **Int8Array**
- B. **Uint8Array**
- C. **Uint8ClampedArray**
- D. **Float32Array**

**Answer: C.** **Uint8ClampedArray** clamps out-of-range values and rounds halfway values to the nearest even integer.

### 11. What type of values do **BigInt64Array** and **BigUint64Array** use?

- A. Ordinary Number values only
- B. BigInt values
- C. Strings that contain digits
- D. Boolean values

**Answer: B.** These typed arrays use BigInt values. Use literals such as **15n** and avoid mixing BigInt with Number arithmetic.

### 12. Which API is best for a record containing fields of different widths and a specified byte order?

- A. **DataView**
- B. **Uint8Array** only
- C. **ArrayBuffer.isView()**
- D. **Array.prototype.slice()**

**Answer: A.** **DataView** is suited to mixed binary fields because each operation chooses a type, byte offset, and byte order.

## True or false

### 13. An ArrayBuffer can be indexed like an ordinary array.

**Answer: False.** An **ArrayBuffer** stores bytes but does not expose ordinary indexed elements. Use a view to access the bytes.

### 14. Constructing a typed array from a buffer shares its storage.

**Answer: True.** The typed array is a view over the buffer. Updating bytes through one view can be observed through another view of the same region.

### 15. **subarray()** and **slice()** both create independent copies.

**Answer: False.** **subarray()** shares storage. **slice()** creates a copy.

### 16. **DataView** multi-byte reads must use a byte offset aligned to the field size.

**Answer: False.** **DataView** can read and write at arbitrary byte offsets as long as the complete field is within the view. Typed array constructors have alignment requirements for their starting offsets.

### 17. A DataView operation outside the view's byte range throws a RangeError.

**Answer: True.** A read or write must fit within the DataView. An out-of-range access throws a **RangeError**.

### 18. Typed arrays always use the byte order specified by an external file format.

**Answer: False.** Typed arrays use the platform's native byte order. Use **DataView** with an explicit endian argument when a file format specifies byte order.

### 19. Assigning a negative value to a Uint8Array keeps it negative.

**Answer: False.** The value is converted to an unsigned 8-bit integer. For example, **-1** becomes **255**.

### 20. A typed array's numeric constructor argument is measured in bytes.

**Answer: False.** It is measured in elements. For example, **new Uint16Array(4)** has four elements and uses eight bytes.

### 21. BigInt typed arrays accept Number values through implicit conversion.

**Answer: False.** Use BigInt values. Do not pass ordinary Numbers where a BigInt is required.

### 22. Resizable ArrayBuffers and Float16 typed arrays are supported by every older JavaScript runtime.

**Answer: False.** These are modern language features. Check support when the code must run in older environments.

## Predict the output

### 23. How many elements and bytes does this typed array have?

~~~js
const values = new Uint16Array(3);

console.log(values.length);
console.log(values.byteLength);
~~~

**Answer:**

~~~text
3
6
~~~

**Explanation:** There are three 16-bit elements. Each element uses two bytes, so the view covers six bytes.

### 24. How are these values converted to unsigned bytes?

~~~js
const values = new Uint8Array([-1, 256, 257, 2.9]);
console.log([...values].join(", "));
~~~

**Answer:**

~~~text
255, 0, 1, 2
~~~

**Explanation:** Values are converted to 8-bit unsigned integers. Fractional values are truncated toward zero before wrapping into the byte range.

### 25. How does Uint8ClampedArray handle these values?

~~~js
const values = new Uint8ClampedArray([-2, 1.5, 2.5, 3.5, 300]);
console.log([...values].join(", "));
~~~

**Answer:**

~~~text
0, 2, 2, 4, 255
~~~

**Explanation:** Values are clamped to 0 through 255. Halfway values are rounded to the nearest even integer.

### 26. Does a subarray share changes with its source?

~~~js
const values = new Uint8Array([10, 20, 30]);
const middle = values.subarray(1);
middle[0] = 99;

console.log([...values].join(", "));
~~~

**Answer:**

~~~text
10, 99, 30
~~~

**Explanation:** **subarray()** creates another view of the same buffer. Updating the view changes the original data.

### 27. Does a slice share changes with its source?

~~~js
const values = new Uint8Array([10, 20, 30]);
const copy = values.slice(1);
copy[0] = 99;

console.log([...values].join(", "));
console.log([...copy].join(", "));
~~~

**Answer:**

~~~text
10, 20, 30
99, 30
~~~

**Explanation:** **slice()** creates an independent copy, so changing it does not change the original typed array.

### 28. What bytes and values are read with the two endian choices?

~~~js
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

view.setUint16(0, 0x1234, true);
console.log(view.getUint8(0).toString(16));
console.log(view.getUint8(1).toString(16));
console.log(view.getUint16(0, true).toString(16));
console.log(view.getUint16(0, false).toString(16));
~~~

**Answer:**

~~~text
34
12
1234
3412
~~~

**Explanation:** Little-endian stores the low byte first. The same two bytes form a different 16-bit value when read as big-endian.

### 29. What does DataView return for mixed fields?

~~~js
const view = new DataView(new ArrayBuffer(7));
view.setInt8(0, -1);
view.setUint16(1, 500, true);
view.setFloat32(3, 1.5, true);

console.log(view.getInt8(0));
console.log(view.getUint16(1, true));
console.log(view.getFloat32(3, true));
~~~

**Answer:**

~~~text
-1
500
1.5
~~~

**Explanation:** Each DataView method reads the field's type at a byte offset. The endian argument is supplied for the multi-byte fields.

### 30. Do two views observe the same write?

~~~js
const buffer = new ArrayBuffer(3);
const allBytes = new Uint8Array(buffer);
const lastTwo = new Uint8Array(buffer, 1, 2);

lastTwo[0] = 42;
console.log(allBytes[1]);
~~~

**Answer:**

~~~text
42
~~~

**Explanation:** Both views use the same underlying buffer. The second view's first element corresponds to the first view's byte at offset 1.

### 31. Does constructing from another typed array share its buffer?

~~~js
const source = new Uint8Array([5, 6]);
const copy = new Uint8Array(source);
copy[0] = 99;

console.log(source[0]);
console.log(copy[0]);
~~~

**Answer:**

~~~text
5
99
~~~

**Explanation:** The constructor copies element values into new storage when its argument is another typed array.

### 32. What value does this BigInt view preserve?

~~~js
const values = new BigUint64Array([9007199254740993n]);
console.log(values[0]);
~~~

**Answer:**

~~~text
9007199254740993n
~~~

**Explanation:** BigInt typed arrays store BigInt values and can represent integers beyond the exact integer range of Number.

### 33. What UTF-8 bytes encode this string?

~~~js
const bytes = new TextEncoder().encode("Aé");
console.log([...bytes].join(", "));
~~~

**Answer:**

~~~text
65, 195, 169
~~~

**Explanation:** **TextEncoder** encodes the string as UTF-8. The ASCII letter takes one byte, while **é** takes two bytes in UTF-8.

### 34. What is the expected result after resizing this buffer in a supporting runtime?

~~~js
const buffer = new ArrayBuffer(2, { maxByteLength: 4 });
const bytes = new Uint8Array(buffer);
bytes[0] = 9;
buffer.resize(4);

console.log(buffer.byteLength);
console.log([...bytes].join(", "));
~~~

**Answer when resizable buffers are supported:**

~~~text
4
9, 0, 0, 0
~~~

**Explanation:** The buffer grows from two bytes to four. Existing bytes remain, and the newly added bytes are initialized to zero. This API may be absent in older runtimes.

### 35. What happens to the original after transfer in a supporting runtime?

~~~js
const original = new ArrayBuffer(2);
new Uint8Array(original).set([4, 5]);
const moved = original.transfer();

console.log(original.byteLength);
console.log(moved.byteLength);
console.log([...new Uint8Array(moved)].join(", "));
~~~

**Answer when ArrayBuffer transfer is supported:**

~~~text
0
2
4, 5
~~~

**Explanation:** The new buffer receives the bytes and the original is detached. Its byte length becomes zero. Check support before relying on this method.

### 36. What does a typed array map() return?

~~~js
const values = new Uint8Array([2, 3]);
const doubled = values.map((value) => value * 2);

console.log(doubled instanceof Uint8Array);
console.log([...doubled].join(", "));
~~~

**Answer:**

~~~text
true
4, 6
~~~

**Explanation:** Typed array methods such as **map()** return a typed array of the same kind.

## Short-answer questions

### 37. What is the difference between a buffer and a view?

**Answer:** A buffer owns raw bytes. A view interprets or accesses some of those bytes. A typed array uses one element type, while **DataView** supports different types and byte offsets.

### 38. What are the units of length and offset properties on a typed array?

**Answer:** **length** is an element count. **byteLength** is a byte count. **byteOffset** is the number of bytes from the start of the underlying buffer to the view.

### 39. When should you use DataView instead of a typed array?

**Answer:** Use **DataView** for mixed field types, arbitrary byte offsets, or formats with a specified byte order. Use a typed array for a sequence of one repeated numeric type.

### 40. What is the difference between subarray() and slice()?

**Answer:** **subarray()** creates a view over the same bytes. **slice()** copies values into independent typed array storage.

### 41. Why can Uint8Array and Uint8ClampedArray produce different results?

**Answer:** **Uint8Array** wraps values into its unsigned 8-bit representation. **Uint8ClampedArray** clamps values to 0 through 255 and rounds halfway values to the nearest even integer.

### 42. How should code read a multi-byte number from a file with a known byte order?

**Answer:** Use a **DataView** and pass the file format's endian choice to the read method. For example, pass **true** to read little-endian and **false** to read big-endian.

### 43. What does transferring an ArrayBuffer do?

**Answer:** It returns a new buffer that receives the bytes and detaches the original buffer. Views of the original can no longer access its former data.

### 44. How do you check if a value is an ArrayBuffer view?

**Answer:** Use **ArrayBuffer.isView(value)**. It returns true for typed arrays and **DataView**, and false for the **ArrayBuffer** itself.

### 45. Why should runtime support be checked for Float16Array and newer buffer methods?

**Answer:** Older JavaScript runtimes may not implement these APIs. Feature detection or a compatible fallback helps code work across the environments a project supports.

## Coding and design questions

### 46. Create a small binary record with fields of different types.

**Answer:**

~~~js
const buffer = new ArrayBuffer(7);
const record = new DataView(buffer);

record.setUint16(0, 513, true);
record.setFloat32(2, 22.5, true);
record.setUint8(6, 1);

console.log(record.getUint16(0, true));
console.log(record.getFloat32(2, true));
console.log(record.getUint8(6));
~~~

Output:

~~~text
513
22.5
1
~~~

**Explanation:** The record contains a little-endian 16-bit integer at byte 0, a little-endian 32-bit float at byte 2, and a single byte at byte 6.

### 47. Copy part of a byte view into a larger target.

**Answer:**

~~~js
const source = new Uint8Array([10, 20, 30]);
const target = new Uint8Array(5);

target.set(source.subarray(1), 2);
console.log([...target].join(", "));
~~~

Output:

~~~text
0, 0, 20, 30, 0
~~~

**Explanation:** **subarray(1)** makes a view of the last two source bytes. **set()** copies them into the target starting at element offset 2.

### 48. Convert a typed array to an ordinary array.

**Answer:**

~~~js
const bytes = new Uint8Array([3, 1, 2]);
const ordinary = Array.from(bytes);
ordinary.push(4);

console.log(Array.isArray(ordinary));
console.log(ordinary.join(", "));
console.log(bytes.join(", "));
~~~

Output:

~~~text
true
3, 1, 2, 4
3, 1, 2
~~~

**Explanation:** **Array.from()** creates a separate ordinary array. Pushing to it does not change the typed array.

### 49. Encode and decode text using UTF-8 bytes.

**Answer:**

~~~js
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const bytes = encoder.encode("Hello");

console.log(bytes instanceof Uint8Array);
console.log(decoder.decode(bytes));
~~~

Output:

~~~text
true
Hello
~~~

**Explanation:** **TextEncoder** returns UTF-8 bytes in a **Uint8Array**. **TextDecoder** converts those bytes back to text.

### 50. Convert bytes to hexadecimal when the runtime supports it.

**Answer:**

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

Output when supported:

~~~text
0aff
10, 255
~~~

**Explanation:** **toHex()** encodes bytes as hexadecimal text. **Uint8Array.fromHex()** decodes that text into a new byte array. Check support for older runtimes.

## Review checklist

Before moving on, make sure you can explain:

- Which object owns bytes and which object views them.
- How typed array constructors differ when given a number, values, another view, or a buffer.
- How element size affects **length** and **byteLength**.
- Why typed array offsets may need alignment.
- Which operations share storage and which copy it.
- How typed arrays convert integers, clamped bytes, floats, and BigInts.
- How to read mixed fields with **DataView** and explicit byte order.
- What happens to an ArrayBuffer when it is resized or transferred.
- How text encoders turn strings into bytes.
- Why newer binary APIs may require feature detection.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [69 - Generators and yield](../lessons/069-generators-and-yield.md) | [Open lesson](../lessons/070-arraybuffer-dataview-and-typed-arrays.md) | [Open example](../examples/070-arraybuffer-dataview-and-typed-arrays.md) | [71 - SharedArrayBuffer, Atomics, and shared memory](../lessons/071-sharedarraybuffer-atomics-and-shared-memory.md) |
