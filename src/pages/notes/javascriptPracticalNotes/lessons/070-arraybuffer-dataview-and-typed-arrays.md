# 70 - ArrayBuffer, DataView, and typed arrays

JavaScript usually represents everyday data as strings, numbers, objects, and arrays. When working with files, network protocols, images, audio, or other binary formats, programs also need to read and write bytes. **ArrayBuffer** stores raw binary data, while **typed arrays** and **DataView** provide ways to interpret that data.

A buffer is the storage. A view is an object that reads and writes some of that storage using a chosen interpretation. Multiple views can refer to the same bytes and observe each other's changes.

## Learning goals

By the end of this chapter, you should be able to:

- Explain the difference between a buffer and a view.
- Allocate an **ArrayBuffer** and inspect its byte length.
- Choose a typed array based on its element type and byte size.
- Create a typed array that copies values or views an existing buffer.
- Compare **slice()**, **subarray()**, and **set()** for typed arrays.
- Use **DataView** to read and write multiple numeric formats at byte offsets.
- Set byte order explicitly when a binary format requires it.
- Encode and decode text as bytes in environments with **TextEncoder** and **TextDecoder**.
- Recognize resizable and transferable buffers and check runtime support.

## Bytes, buffers, and views

A **byte** contains 8 bits. Bytes are commonly written as decimal numbers from **0** through **255** or as two-digit hexadecimal numbers from **00** through **ff**.

An **ArrayBuffer** is a fixed-size block of raw bytes by default. It does not have ordinary array elements. A typed array or **DataView** is needed to interpret or change its contents.

~~~js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);

console.log(buffer.byteLength);
console.log(bytes.length);
console.log([...bytes].join(", "));
~~~

Output:

~~~text
4
4
0, 0, 0, 0
~~~

The buffer holds four bytes. The **Uint8Array** view interprets each byte as an unsigned 8-bit integer. Newly allocated bytes are initialized to zero.

The relationship is:

| Object | Role |
| --- | --- |
| **ArrayBuffer** | Owns a block of raw bytes |
| **TypedArray** | Views the bytes as a sequence of one numeric element type |
| **DataView** | Reads or writes multiple numeric types at explicit byte offsets |

A view does not normally own a separate copy of the bytes. It refers to a region of an **ArrayBuffer**. The special constructor forms that take an existing typed array or buffer determine whether a copy is made or storage is shared.

## Allocate and inspect an ArrayBuffer

Pass the number of bytes to **ArrayBuffer**.

~~~js
const buffer = new ArrayBuffer(12);

console.log(buffer.byteLength);
console.log(ArrayBuffer.isView(buffer));
~~~

Output:

~~~text
12
false
~~~

**ArrayBuffer.isView(value)** tells you whether a value is a typed array or a **DataView**. The buffer itself is not a view.

An **ArrayBuffer** cannot be indexed like an array. Create a view to get useful element access.

~~~js
const buffer = new ArrayBuffer(3);
console.log(buffer[0]);

const bytes = new Uint8Array(buffer);
bytes[0] = 65;
console.log(bytes[0]);
~~~

Output:

~~~text
undefined
65
~~~

The buffer is storage, not an indexed collection. The typed array exposes indexed access.

## Choose a typed array element type

A typed array converts each assigned value to one fixed numeric type. The element type determines how many bytes each entry uses and how values are represented.

| Constructor | Element type | Bytes per element | Typical range or use |
| --- | --- | ---: | --- |
| **Int8Array** | Signed 8-bit integer | 1 | -128 through 127 |
| **Uint8Array** | Unsigned 8-bit integer | 1 | 0 through 255 |
| **Uint8ClampedArray** | Clamped unsigned 8-bit integer | 1 | Image channel values from 0 through 255 |
| **Int16Array** | Signed 16-bit integer | 2 | Small signed integer data |
| **Uint16Array** | Unsigned 16-bit integer | 2 | Small non-negative integer data |
| **Int32Array** | Signed 32-bit integer | 4 | Larger signed integer data |
| **Uint32Array** | Unsigned 32-bit integer | 4 | Larger non-negative integer data |
| **Float16Array** | 16-bit floating point | 2 | Reduced-precision floating-point data in supporting runtimes |
| **Float32Array** | 32-bit floating point | 4 | Reduced-precision floating-point data |
| **Float64Array** | 64-bit floating point | 8 | JavaScript's common floating-point precision |
| **BigInt64Array** | Signed 64-bit BigInt | 8 | Large signed integer values |
| **BigUint64Array** | Unsigned 64-bit BigInt | 8 | Large non-negative integer values |

The element size is available through **BYTES_PER_ELEMENT**.

~~~js
console.log(Uint8Array.BYTES_PER_ELEMENT);
console.log(Uint16Array.BYTES_PER_ELEMENT);
console.log(Float32Array.BYTES_PER_ELEMENT);
console.log(BigInt64Array.BYTES_PER_ELEMENT);
~~~

Output:

~~~text
1
2
4
8
~~~

Use **BigInt64Array** and **BigUint64Array** with BigInt values such as **12n**. Number and BigInt values cannot be mixed in arithmetic, and BigInt typed arrays do not accept ordinary Number values as their elements.

## Create typed arrays from different inputs

Typed array constructor arguments have different meanings.

### Allocate by element count

~~~js
const values = new Uint16Array(3);
console.log(values.length);
console.log(values.byteLength);
console.log([...values].join(", "));
~~~

Output:

~~~text
3
6
0, 0, 0
~~~

The numeric argument is a number of elements, not bytes. Three **Uint16** elements use six bytes.

### Initialize from an iterable or array-like value

~~~js
const values = new Uint8Array([10, 20, 30]);
console.log(values.length);
console.log([...values].join(", "));
~~~

Output:

~~~text
3
10, 20, 30
~~~

This creates typed array storage and copies converted values from the source.

### Copy from another typed array

~~~js
const original = new Uint8Array([4, 8]);
const copy = new Uint8Array(original);

copy[0] = 99;
console.log(original[0]);
console.log(copy[0]);
~~~

Output:

~~~text
4
99
~~~

Passing a typed array creates a new typed array and copies its element values, converting them to the destination element type if needed.

### View an existing buffer

~~~js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);
const words = new Uint16Array(buffer);

bytes[0] = 5;
bytes[1] = 6;

console.log(words.length);
console.log(buffer.byteLength);
~~~

Output:

~~~text
2
4
~~~

Both views refer to the same buffer. A **Uint16Array** groups the four bytes into two 16-bit elements. The numeric values depend on the platform's native byte order, so use **DataView** when a file or protocol specifies byte order.

## Read typed array properties

Typed arrays provide properties describing their view and storage.

- **length** is the number of elements.
- **byteLength** is the number of bytes in the view.
- **byteOffset** is the view's starting byte position inside its buffer.
- **buffer** is the underlying **ArrayBuffer**.
- **BYTES_PER_ELEMENT** is the size of one element for that typed array type.

~~~js
const buffer = new ArrayBuffer(16);
const values = new Uint16Array(buffer, 4, 3);

console.log(values.length);
console.log(values.byteLength);
console.log(values.byteOffset);
console.log(values.buffer === buffer);
~~~

Output:

~~~text
3
6
4
true
~~~

The view starts at byte offset 4 and covers three 2-byte elements, for a total of 6 bytes.

For typed arrays that use more than one byte per element, **byteOffset** must be aligned to the element size. The view must also fit within the buffer.

~~~js
const buffer = new ArrayBuffer(8);

try {
  new Uint16Array(buffer, 1);
} catch (error) {
  console.log(error instanceof RangeError);
}
~~~

Output:

~~~text
true
~~~

A 16-bit element cannot start at byte offset 1 because the offset is not aligned to a 2-byte element boundary.

## Typed arrays convert assigned values

Integer typed arrays convert assigned values to their fixed-width representation. Unsigned integer values wrap into the available range, while **Uint8ClampedArray** clamps to the range 0 through 255.

~~~js
const bytes = new Uint8Array([-1, 256, 257]);
const clamped = new Uint8ClampedArray([-1, 1.5, 2.5, 3.5, 300]);

console.log([...bytes].join(", "));
console.log([...clamped].join(", "));
~~~

Output:

~~~text
255, 0, 1
0, 2, 2, 4, 255
~~~

**Uint8Array** uses an 8-bit unsigned representation, so values wrap modulo 256. **Uint8ClampedArray** limits values to 0 through 255 and rounds halfway values to the nearest even integer.

Floating-point typed arrays round values to their supported precision. **BigInt64Array** and **BigUint64Array** use BigInt values and do not use Number conversion.

## Share or copy a view's data

A view constructed from a buffer shares storage. Changes through one view are visible through the other views of the same bytes.

~~~js
const buffer = new ArrayBuffer(4);
const bytes = new Uint8Array(buffer);
const firstTwo = new Uint8Array(buffer, 0, 2);

bytes[0] = 12;
firstTwo[1] = 34;

console.log([...bytes].join(", "));
~~~

Output:

~~~text
12, 34, 0, 0
~~~

The two typed arrays are views over the same buffer, so both writes affect the same storage.

### subarray() creates another view

**subarray(start, end)** creates a new view over a range of the same bytes.

~~~js
const values = new Uint8Array([10, 20, 30, 40]);
const middle = values.subarray(1, 3);

middle[0] = 99;
console.log([...values].join(", "));
console.log([...middle].join(", "));
~~~

Output:

~~~text
10, 99, 30, 40
99, 30
~~~

Changing **middle** changes the original because the views share the same buffer.

### slice() creates a copy

**slice(start, end)** creates a new typed array containing copied values.

~~~js
const values = new Uint8Array([10, 20, 30]);
const copy = values.slice(0, 2);

copy[0] = 99;
console.log([...values].join(", "));
console.log([...copy].join(", "));
~~~

Output:

~~~text
10, 20, 30
99, 20
~~~

The **copy** has independent storage. Use **subarray()** for a shared view and **slice()** for an independent copy.

### set() copies values into an existing view

**set(source, offset)** copies source values into the target typed array, beginning at the element offset.

~~~js
const target = new Uint8Array(5);
target.set([7, 8], 2);

console.log([...target].join(", "));
~~~

Output:

~~~text
0, 0, 7, 8, 0
~~~

The offset is measured in target elements, not bytes. The copy must fit in the target view or a **RangeError** is thrown.

## Use DataView for mixed binary formats

A **DataView** reads and writes several numeric types over one buffer. Each operation specifies a byte offset. This is useful when a binary record contains fields with different sizes or when a format specifies byte order.

~~~js
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);

view.setUint8(0, 7);
view.setUint16(1, 500, true);
view.setFloat32(4, 1.5, true);

console.log(view.getUint8(0));
console.log(view.getUint16(1, true));
console.log(view.getFloat32(4, true));
~~~

Output:

~~~text
7
500
1.5
~~~

The view can interpret the first byte as an unsigned integer, the next two bytes as a 16-bit integer, and the last four bytes as a 32-bit float.

A **DataView** offset is measured in bytes. Its methods check that the requested field fits inside the view. Reading or writing beyond the view's range throws a **RangeError**.

~~~js
const view = new DataView(new ArrayBuffer(2));

try {
  view.getUint32(0);
} catch (error) {
  console.log(error instanceof RangeError);
}
~~~

Output:

~~~text
true
~~~

## Understand byte order

Multi-byte numbers can be stored in either little-endian or big-endian order.

- **Little-endian** stores the least significant byte first.
- **Big-endian** stores the most significant byte first.

**DataView** methods accept a **littleEndian** argument for multi-byte fields. The default is **false**, meaning big-endian. Single-byte methods such as **getUint8()** do not need an endianness argument.

~~~js
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

view.setUint16(0, 0x1234, true);

console.log(view.getUint8(0).toString(16));
console.log(view.getUint8(1).toString(16));
console.log(view.getUint16(0, true).toString(16));
console.log(view.getUint16(0, false).toString(16));
~~~

Output:

~~~text
34
12
1234
3412
~~~

The explicit **true** writes the low byte first. Reading those bytes as little-endian gives **0x1234**. Reading the same bytes as big-endian gives **0x3412**. Always follow the format's byte-order rule instead of assuming a machine's native order.

## Read and write BigInt fields with DataView

Use **getBigInt64()**, **getBigUint64()**, **setBigInt64()**, and **setBigUint64()** for 64-bit integer fields that need BigInt values.

~~~js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);

view.setBigInt64(0, -12n, true);
view.setBigUint64(8, 9007199254740993n, true);

console.log(view.getBigInt64(0, true));
console.log(view.getBigUint64(8, true));
~~~

Output:

~~~text
-12n
9007199254740993n
~~~

The unsigned field can preserve an integer larger than **Number.MAX_SAFE_INTEGER** because the methods use BigInt. These methods require BigInt arguments rather than Number values.

## Use Float16Array and float16 DataView methods

Modern ECMAScript includes **Float16Array** and **DataView** methods for 16-bit floating-point values. Support may vary in older runtimes.

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

A 16-bit float uses less storage than a 32-bit or 64-bit float but provides less precision and range. Check support if your code must run in older environments.

**DataView** also provides **getFloat16()** and **setFloat16()** in current runtimes.

~~~js
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

if (typeof view.setFloat16 === "function") {
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

## Use typed array methods

Typed arrays have indexed access and many familiar array methods. They are not ordinary arrays, so methods that return a typed array generally preserve the typed array kind.

~~~js
const scores = new Uint8Array([30, 10, 20]);
const doubled = scores.map((score) => score * 2);

console.log([...scores].join(", "));
console.log([...doubled].join(", "));
console.log(doubled instanceof Uint8Array);
~~~

Output:

~~~text
30, 10, 20
60, 20, 40
true
~~~

Typed arrays support methods such as **set()**, **subarray()**, **slice()**, **map()**, **filter()**, **reduce()**, **find()**, **fill()**, **reverse()**, and **sort()**. Values are converted to the typed array's element type when written.

Use **Array.from(view)** or **[...view]** when an ordinary array is needed.

~~~js
const bytes = new Uint8Array([3, 1, 2]);
const ordinaryArray = Array.from(bytes);

ordinaryArray.push(4);
console.log(Array.isArray(ordinaryArray));
console.log(ordinaryArray.join(", "));
console.log(bytes.join(", "));
~~~

Output:

~~~text
true
3, 1, 2, 4
3, 1, 2
~~~

The ordinary array is independent of the typed array storage.

## Encode and decode text bytes

In browser and modern server runtimes that provide **TextEncoder** and **TextDecoder**, these APIs convert between JavaScript strings and UTF-8 bytes.

~~~js
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const bytes = encoder.encode("Hi");

console.log([...bytes].join(", "));
console.log(decoder.decode(bytes));
~~~

Output:

~~~text
72, 105
Hi
~~~

A **Uint8Array** is suitable for the encoded bytes. Text encoding is separate from the buffer itself: the buffer stores bytes, while the encoder and decoder apply a character encoding.

## Use current Uint8Array text conversion methods

Current ECMAScript editions provide methods for converting a **Uint8Array** to and from hexadecimal and base64 text. Older runtimes may not support them, so check the relevant method before using it.

~~~js
const bytes = new Uint8Array([72, 105]);

if (typeof bytes.toHex === "function" && typeof Uint8Array.fromHex === "function") {
  const hex = bytes.toHex();
  const decoded = Uint8Array.fromHex(hex);
  console.log(hex);
  console.log(new TextDecoder().decode(decoded));
} else {
  console.log("Uint8Array hex methods unavailable");
}
~~~

Expected output when supported:

~~~text
4869
Hi
~~~

The corresponding base64 methods are **toBase64()** and **Uint8Array.fromBase64()**. These encode bytes, not arbitrary JavaScript string code units. Encode a string as UTF-8 first when the input is text.

~~~js
const bytes = new TextEncoder().encode("Hi");

if (typeof bytes.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function") {
  const encoded = bytes.toBase64();
  const decoded = Uint8Array.fromBase64(encoded);
  console.log(encoded);
  console.log(new TextDecoder().decode(decoded));
} else {
  console.log("Uint8Array base64 methods unavailable");
}
~~~

Expected output when supported:

~~~text
SGk=
Hi
~~~

## Resize an ArrayBuffer when supported

A resizable **ArrayBuffer** is created with a **maxByteLength** option. Its **resize()** method can then change the current byte length without exceeding that maximum.

~~~js
if (typeof ArrayBuffer.prototype.resize === "function") {
  const buffer = new ArrayBuffer(2, { maxByteLength: 4 });
  const bytes = new Uint8Array(buffer);

  bytes[0] = 9;
  buffer.resize(4);

  console.log(buffer.byteLength);
  console.log([...bytes].join(", "));
} else {
  console.log("Resizable ArrayBuffer unavailable");
}
~~~

Expected output when supported:

~~~text
4
9, 0, 0, 0
~~~

When the typed array is created from a resizable buffer without an explicit element count, it tracks the buffer's current size. New bytes are zero-initialized. A typed array with an explicit length is fixed-length and may become out of bounds if the buffer is shrunk too far.

Resizable buffers are an advanced feature. Keep the maximum length in mind and avoid resizing a buffer while code assumes all of its views remain in bounds.

## Transfer an ArrayBuffer when supported

**ArrayBuffer.prototype.transfer()** moves the buffer's data to a new buffer and detaches the original buffer. Check for support before using this newer method.

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

The original buffer is detached and its byte length becomes zero. Views that referred to the detached buffer can no longer read its former data. The new buffer owns the transferred bytes.

## Choose DataView or a typed array

Use a typed array when the data is a sequence of one numeric type, such as a list of unsigned bytes or 32-bit floats.

Use **DataView** when:

- A record contains fields with different numeric types.
- Fields begin at arbitrary byte offsets.
- A file or protocol specifies big-endian or little-endian storage.
- You need explicit reads and writes for 8-bit, 16-bit, 32-bit, 64-bit, or floating-point fields.

A typed array view interprets repeated elements of one type and uses the platform's native byte order. **DataView** lets each multi-byte read or write specify its byte order.

## Common mistakes

### Treating ArrayBuffer as an array

An **ArrayBuffer** stores raw bytes and does not provide ordinary indexed elements. Create a typed array or **DataView** to access those bytes.

### Confusing bytes with elements

**new Uint16Array(4)** allocates four elements, which use eight bytes. The constructor's numeric argument is an element count.

### Assuming every typed array constructor copies

Constructing from an existing **ArrayBuffer** creates a view over that buffer. Constructing from another typed array creates a new typed array and copies converted element values.

### Confusing subarray() and slice()

**subarray()** shares bytes with the original view. **slice()** copies values into new typed array storage.

### Assuming native byte order matches a file format

Typed arrays use the platform's native byte order. Use **DataView** and pass the format's endian choice for portable binary layouts.

### Forgetting that integer values are converted

An integer typed array cannot preserve every assigned Number value. The value is converted to the element type's fixed-width representation.

### Passing Number values to BigInt typed arrays

**BigInt64Array** and **BigUint64Array** use BigInt values. Use literals such as **42n** and do not mix BigInt and Number arithmetic.

### Assuming typed array operations return ordinary arrays

Methods such as **map()** generally return the same typed array kind. Use **Array.from()** when an ordinary array is required.

### Assuming newer methods are in every runtime

Float16 typed arrays, resizable buffers, transfer methods, and byte string conversion methods may not be available in older engines. Feature-detect APIs when the supported environments vary.

## Try it yourself

1. Allocate a 12-byte buffer and view it with **Uint8Array**.
2. Create **Uint16Array** and **Float32Array** views over one buffer and compare their byte lengths.
3. Construct a typed array from values, from another typed array, and from an existing buffer. Identify which operations share storage.
4. Set a typed array value outside the unsigned 8-bit range and observe conversion.
5. Compare **subarray()** and **slice()** by changing the returned values.
6. Use **DataView** to write a 16-bit integer in both byte orders and inspect individual bytes.
7. Read a floating-point value and a BigInt value with **DataView**.
8. Encode a short string with **TextEncoder** and decode it with **TextDecoder**.
9. Check whether your runtime supports **Float16Array**, resizable buffers, and typed array hex or base64 methods.
10. If supported, resize a buffer and inspect a length-tracking view.

## Key points

- **ArrayBuffer** owns raw bytes. A typed array or **DataView** interprets those bytes.
- Typed arrays have a fixed element type and expose element count, byte length, byte offset, and their underlying buffer.
- Constructing a view from a buffer shares storage. Constructing from another typed array copies element values.
- **subarray()** creates a shared view, while **slice()** copies data.
- Typed arrays convert assigned values to their element type. BigInt typed arrays use BigInt values.
- **DataView** reads and writes multiple types at byte offsets and supports explicit byte order.
- Typed arrays use the platform's native byte order, so use **DataView** for a specified external binary format.
- **TextEncoder** and **TextDecoder** convert strings to and from encoded bytes in supporting environments.
- Modern runtimes add Float16, resizable and transferable buffers, and byte string conversion methods. Check support when older engines matter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [69 - Generators and yield](069-generators-and-yield.md) | [Open Q&A](../qnas/070-arraybuffer-dataview-and-typed-arrays.md) | [Open example](../examples/070-arraybuffer-dataview-and-typed-arrays.md) | [71 - SharedArrayBuffer, Atomics, and shared memory](071-sharedarraybuffer-atomics-and-shared-memory.md) |
