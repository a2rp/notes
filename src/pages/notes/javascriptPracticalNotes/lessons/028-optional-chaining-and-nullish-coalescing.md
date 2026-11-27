# 28 - Optional chaining and nullish coalescing

Optional chaining and nullish coalescing help work with values that may be absent. Optional chaining safely reads a property or calls a function when its base is **null** or **undefined**. Nullish coalescing supplies a fallback only for **null** or **undefined**.

They do not treat every falsy value as missing. Values such as **0**, **false**, and **""** are preserved.

## Optional property access

Use **?.** before a property name when the value to its left might be nullish.

~~~js
const user = {
    profile: {
        name: "Asha",
    },
};

const missingUser = null;

console.log(user?.profile.name); // Asha
console.log(missingUser?.profile.name); // undefined
~~~

If the value before **?.** is **null** or **undefined**, the optional chain stops and evaluates to **undefined**. No property access to the right of that optional point in the same continuous chain is performed.

Optional chaining does not validate that a property exists. If the base object is present but the property is missing, the property value is simply **undefined**.

## Protect each nullable level

Use optional chaining at each part of a path that might itself be nullish.

~~~js
const record = {
    profile: null,
};

console.log(record?.profile?.name); // undefined
~~~

The expression **record?.profile.name** protects the access to **record**, but does not protect **profile**. If **record** exists and **record.profile** is nullish, accessing **name** throws a **TypeError**.

Think of each **?.** as a specific nullish check. It does not make every later property access safe by itself.

## Optional element access

Use **?.[expression]** when the property name is computed or stored in a variable.

~~~js
const settings = {
    theme: "dark",
};

const key = "theme";
const absentSettings = undefined;

console.log(settings?.[key]); // dark
console.log(absentSettings?.[key]); // undefined
~~~

The computed property expression is skipped when the base is nullish:

~~~js
function getKey() {
    console.log("key evaluated");
    return "theme";
}

console.log(absentSettings?.[getKey()]);
console.log(settings?.[getKey()]);
~~~

Output:

~~~text
undefined
key evaluated
dark
~~~

## Optional function calls

Use **?.()** when a function value might be nullish.

~~~js
function notify(message) {
    console.log("Notice:", message);
}

let optionalCallback;

notify?.("Saved");
optionalCallback?.("Saved");
~~~

Output:

~~~text
Notice: Saved
~~~

A nullish function value is skipped. A value that exists but is not callable still throws a **TypeError**.

### Optional calls on methods

The location of the optional operator determines what is checked:

~~~js
const api = {
    send(message) {
        return "sent: " + message;
    },
};

const missingApi = null;
const apiWithoutSend = {};

console.log(api?.send("hello")); // sent: hello
console.log(missingApi?.send("hello")); // undefined
console.log(apiWithoutSend.send?.("hello")); // undefined
~~~

- **api?.send("hello")** checks that **api** is not nullish. If **api** exists, **send** must be callable.
- **apiWithoutSend.send?.("hello")** checks whether the **send** method is nullish before calling it.
- **api?.send?.("hello")** checks both the object and the method.

If the method exists but is a non-nullish non-function value, optional call does not hide the error.

Calling with **api.send?.()** preserves **api** as the method's **this** value. Taking the method into a separate variable can lose that receiver.

## Nullish coalescing

The **??** operator returns its left operand unless that operand is **null** or **undefined**. Otherwise, it evaluates and returns its right operand.

~~~js
console.log(null ?? "fallback"); // fallback
console.log(undefined ?? "fallback"); // fallback
console.log(0 ?? 10); // 0
console.log(false ?? true); // false
console.log("" ?? "text"); // ""
~~~

The fallback is evaluated only when the left side is nullish.

~~~js
function createDefault() {
    console.log("default created");
    return "Guest";
}

console.log("Asha" ?? createDefault());
console.log(null ?? createDefault());
~~~

Output:

~~~text
Asha
default created
Guest
~~~

## Combine optional chaining with ??

Optional chaining commonly produces **undefined** when a value is absent. Follow it with **??** to supply a meaningful default.

~~~js
const user = {
    settings: {
        pageSize: 0,
        title: "",
    },
};

const unknownUser = null;

console.log(user?.settings?.pageSize ?? 20); // 0
console.log(user?.settings?.title ?? "Untitled"); // ""
console.log(unknownUser?.settings?.title ?? "Untitled"); // Untitled
~~~

This preserves valid falsy values. Replacing **??** with **||** would replace zero, false, and the empty string too.

| Expression | Result |
| --- | --- |
| **0 ?? 20** | **0** |
| **0 || 20** | **20** |
| **"" ?? "Untitled"** | **""** |
| **"" || "Untitled"** | **"Untitled"** |

Use **||** only when all falsy values should trigger the fallback.

## Optional chains and grouping

An optional chain can include normal property accesses and calls after its first optional check. Grouping ends that continuous chain.

~~~js
const response = null;

console.log(response?.data.user.name); // undefined
~~~

The first optional access sees **response** is nullish, so the rest of that continuous chain is skipped.

Parentheses can change the behavior:

~~~js
const response = null;

// (response?.data).user; // TypeError
~~~

The parenthesized expression evaluates to **undefined**. The following **.user** access is outside the optional chain and throws.

Add **?.** where another property in the path can be nullish, or use a fallback before continuing.

## Parentheses when mixing logical operators

JavaScript requires parentheses when **??** is mixed directly with **&&** or **||**. These expressions are syntax errors:

~~~js
// value ?? fallback || other;
// value && other ?? fallback;
~~~

Write the intended grouping explicitly:

~~~js
const value = null;
const label = (value ?? "Default") || "Unknown";

console.log(label); // Default
~~~

## Optional chaining is not exception handling

Optional chaining handles a nullish base value at the marked point. It does not catch exceptions raised by a getter or by the function being called.

~~~js
const object = {
    get value() {
        throw new Error("getter failed");
    },
};

// object?.value still throws because object is present and its getter throws.
~~~

Use **try...catch** when an operation can throw and that exception needs handling.

Optional chaining also does not make an undeclared variable safe:

~~~js
// undeclaredValue?.property; // ReferenceError
~~~

The identifier must first be resolvable. Optional chaining checks the value after the base expression has been evaluated.

## Other restrictions and uses

An optional chain cannot be used as an assignment target:

~~~js
// object?.property = "value"; // SyntaxError
~~~

Check the object before assigning:

~~~js
if (object != null) {
    object.property = "value";
}
~~~

Optional chaining is allowed with **delete**:

~~~js
const preferences = {
    theme: "dark",
};

const missingPreferences = null;

console.log(delete preferences?.theme); // true
console.log(preferences.theme); // undefined
console.log(delete missingPreferences?.theme); // true
~~~

The first expression deletes the property. If the base is nullish, the optional delete completes without attempting a property access.

The optional chain syntax is not allowed directly as the constructor in **new** expressions. Store or choose a constructor first, then call **new** with the resulting constructor.

## When optional chaining helps

~~~js
const account = {
    contact: {
        email: "asha@example.test",
    },
};

const email = account?.contact?.email ?? "No email provided";

console.log(email);
~~~

This is concise when missing data is expected and the fallback is appropriate. Avoid using it to silently hide broken assumptions. If a required property is unexpectedly missing, an explicit check or a clear error may be better.

## Try it yourself

1. Read a deeply nested property where any level may be missing.
2. Use **?.[key]** with a computed key and check whether the key expression runs.
3. Call an optional callback and confirm it is skipped when nullish.
4. Compare **object?.method()** with **object.method?.()**.
5. Supply defaults for zero, false, an empty string, null, and undefined using both **||** and **??**.
6. Group an optional chain with parentheses and predict which property access throws.
7. Use **delete object?.property** and check the result.
8. Explain why optional chaining does not catch an exception thrown by a getter.

## Key points

- **?.** short-circuits only when its checked base is **null** or **undefined**.
- Optional property, element, and call forms are available.
- Put an optional check at every potentially nullish level in a property path.
- Grouping ends a continuous optional chain.
- **??** uses its fallback only for **null** or **undefined** and preserves **0**, **false**, and **""**.
- Parenthesize when combining **??** directly with **&&** or **||**.
- Optional chaining does not catch thrown exceptions or make undeclared identifiers safe.
- Optional chains cannot be assignment targets, but can be used with **delete**.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [27 - Logical operators and short-circuiting](027-logical-operators-and-short-circuiting.md) | [Open Q&A](../qnas/028-optional-chaining-and-nullish-coalescing.md) | [Open example](../examples/028-optional-chaining-and-nullish-coalescing.md) | [29 - Bitwise operators and integer operations](029-bitwise-operators-and-integer-operations.md) |
