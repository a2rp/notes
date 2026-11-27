# 28 - Optional chaining and nullish coalescing

This example shows how to read optional data, call optional functions, choose nullish defaults, and understand where an optional chain stops. The code is displayed for study. Run each JavaScript block in a modern JavaScript console.

## 1. Read nested values that may be missing

### Question

How can you read a nested value safely and provide a default only when the result is missing?

### Code

~~~js
const user = {
    profile: {
        displayName: "Asha",
        age: 0,
        nickname: "",
    },
};

const missingUser = null;

console.log(
    "name:",
    user?.profile?.displayName ?? "Anonymous",
);
console.log(
    "missing user:",
    missingUser?.profile?.displayName ?? "Anonymous",
);
console.log(
    "age:",
    user?.profile?.age ?? 18,
);
console.log(
    "nickname:",
    JSON.stringify(user?.profile?.nickname ?? "No nickname"),
);
~~~

### Expected output

~~~text
name: Asha
missing user: Anonymous
age: 0
nickname: ""
~~~

### Explanation

Each **?.** checks a potentially nullish level. If the chain produces **undefined**, **??** supplies the fallback. It preserves the valid values **0** and **""**.

## 2. Skip a computed key when its object is absent

### Question

Does JavaScript evaluate the key expression in **object?.[makeKey()]** when the object is nullish?

### Code

~~~js
function makeKey() {
    console.log("key expression ran");
    return "theme";
}

const missingSettings = null;
const settings = {
    theme: "dark",
};

console.log("missing:", missingSettings?.[makeKey()]);
console.log("present:", settings?.[makeKey()]);
~~~

### Expected output

~~~text
missing: undefined
key expression ran
present: dark
~~~

### Explanation

The object is checked first. If it is nullish, JavaScript returns **undefined** without evaluating the computed key expression. The key function runs only when the object exists.

## 3. Call optional functions and methods

### Question

How can you call a method if the method may be missing, while preserving the method's receiver?

### Code

~~~js
const service = {
    prefix: "saved: ",

    save(message) {
        return this.prefix + message;
    },
};

const missingService = null;
const callbacks = {
    onSave: undefined,
};

console.log("method:", service.save?.("draft"));
console.log("missing service:", missingService?.save?.("draft"));
console.log("missing callback:", callbacks.onSave?.("draft"));
~~~

### Expected output

~~~text
method: saved: draft
missing service: undefined
missing callback: undefined
~~~

### Explanation

**service.save?.()** checks whether the method is nullish before calling it, and the call keeps **service** as **this**. **missingService?.save?.()** checks both the object and method.

Optional call does not make a present non-function callable. If **onSave** contained a number, calling **onSave?.()** would still throw a **TypeError**.

## 4. Compare || defaults with ?? defaults

### Question

Which fallback operator preserves zero, false, and the empty string?

### Code

~~~js
const values = [0, false, "", null, undefined];

for (const value of values) {
    console.log(
        JSON.stringify(value),
        "OR:",
        JSON.stringify(value || "fallback"),
        "nullish:",
        JSON.stringify(value ?? "fallback"),
    );
}
~~~

### Expected output

~~~text
0 OR: "fallback" nullish: 0
false OR: "fallback" nullish: false
"" OR: "fallback" nullish: ""
null OR: "fallback" nullish: "fallback"
undefined OR: "fallback" nullish: "fallback"
~~~

### Explanation

**||** checks truthiness, so it replaces every falsy value. **??** checks only for **null** and **undefined**. Choose based on which values your application considers missing.

## 5. Add optional checks at each nullable level

### Question

Why does this chain use **?.** at each level?

### Code

~~~js
const firstRecord = {
    profile: {
        name: "Asha",
    },
};

const secondRecord = {
    profile: null,
};

const missingRecord = undefined;

function readName(record) {
    return record?.profile?.name ?? "No name";
}

console.log(readName(firstRecord));
console.log(readName(secondRecord));
console.log(readName(missingRecord));
~~~

### Expected output

~~~text
Asha
No name
No name
~~~

### Explanation

The first optional access handles a missing record. The second handles a present record whose profile is missing or nullish. If the code used **record?.profile.name**, it could still throw when **profile** is nullish.

## 6. Grouping ends an optional chain

### Question

What changes when an optional expression is placed inside parentheses?

### Code

~~~js
const response = null;

console.log("continuous chain:", response?.data.user.name);

// Uncommenting this line throws a TypeError because grouping ends the chain:
// console.log((response?.data).user);
~~~

### Expected output

~~~text
continuous chain: undefined
~~~

### Explanation

The continuous chain short-circuits after seeing **response** is nullish. In the parenthesized form, **response?.data** produces **undefined**, then the regular **.user** access occurs outside the chain and throws.

## 7. Optional delete

### Question

How does optional chaining behave with **delete**?

### Code

~~~js
const settings = {
    theme: "dark",
};

const missingSettings = null;

console.log(delete settings?.theme);
console.log(settings.theme);
console.log(delete missingSettings?.theme);
~~~

### Expected output

~~~text
true
undefined
true
~~~

### Explanation

The first expression deletes the property and returns **true**. The nullish base causes the second optional delete to skip the property access and return **true**.

## 8. Required grouping for ?? with logical operators

### Question

How can you combine nullish coalescing with logical OR?

### Code

~~~js
const input = null;
const label = (input ?? "Default") || "Unknown";

console.log(label);

// This direct mix is a syntax error:
// const invalid = input ?? "Default" || "Unknown";
~~~

### Expected output

~~~text
Default
~~~

### Explanation

JavaScript requires parentheses when **??** is combined directly with **||** or **&&**. Here **??** first chooses **"Default"**, and the logical OR keeps it because it is truthy.

## Try it yourself

1. Change the age in section 1 to **null**, **undefined**, and **false**.
2. Make **makeKey()** increment a counter and check whether it runs for a nullish base.
3. Replace **save** with **undefined**, then with a number, and compare the results of optional call.
4. Try a non-empty value and an empty string with **||** and **??**.
5. Remove one optional check from section 5 and explain when it throws.
6. Group the continuous chain in section 6 and predict the error.
7. Use **delete** with an existing object and a nullish value.
8. Add parentheses around a mixed nullish and logical expression.

## Key points

- Optional chaining protects the value at the exact **?.** point.
- Place optional checks at every path level that can be nullish.
- Optional calls skip only **null** or **undefined** functions. A present non-function still throws.
- A computed key expression is skipped when its optional base is nullish.
- Grouping ends a continuous optional chain.
- **??** preserves falsy values and falls back only for **null** or **undefined**.
- **||** uses truthiness and replaces zero, false, and empty strings.
- Optional chaining does not catch exceptions from getters or called functions.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [27 - Logical operators and short-circuiting](../lessons/027-logical-operators-and-short-circuiting.md) | [Open lesson](../lessons/028-optional-chaining-and-nullish-coalescing.md) | [Open Q&A](../qnas/028-optional-chaining-and-nullish-coalescing.md) | [29 - Bitwise operators and integer operations](../lessons/029-bitwise-operators-and-integer-operations.md) |
