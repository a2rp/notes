# 134 - Functional programming: composition and purity: Example

This example combines small string functions, transforms a product list, calculates an invoice from explicit inputs, updates nested data without changing the original, and isolates effects at the application boundary.

## Create this file

~~~text
functional-programming-demo/
  functional-pipeline.mjs
~~~

### functional-programming-demo/functional-pipeline.mjs

~~~js
const trim = (text) => text.trim();
const collapseSpaces = (text) => text.replace(/\s+/g, " ");
const lowercase = (text) => text.toLowerCase();

function pipe(...operations) {
  return (value) => operations.reduce(
    (current, operation) => operation(current),
    value,
  );
}

function compose(...operations) {
  return (value) => operations.reduceRight(
    (current, operation) => operation(current),
    value,
  );
}

const normalizeName = pipe(trim, collapseSpaces, lowercase);
const normalizeNameRightToLeft = compose(lowercase, collapseSpaces, trim);
const rawName = "  Ada   Lovelace  ";

console.log("normalized:", normalizeName(rawName));
console.log("composed:", normalizeNameRightToLeft(rawName));
console.log("original name:", JSON.stringify(rawName));

const products = [
  { name: "Notebook", price: 4, inStock: true },
  { name: "Pen", price: 2, inStock: false },
  { name: "Folder", price: 6, inStock: true },
];

const availableProductNames = products
  .filter((product) => product.inStock)
  .map((product) => product.name.toUpperCase());

console.log("available products:", JSON.stringify(availableProductNames));
console.log("product count:", products.length);

function calculateInvoice(items, taxRate) {
  const lines = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.price,
    lineTotal: item.price * item.quantity,
  }));

  const subtotal = lines.reduce(
    (sum, line) => sum + line.lineTotal,
    0,
  );
  const tax = subtotal * taxRate;

  return {
    lines,
    subtotal,
    tax,
    total: subtotal + tax,
  };
}

const orderItems = [
  { name: "Notebook", price: 4, quantity: 2 },
  { name: "Pen", price: 2, quantity: 3 },
  { name: "Folder", price: 6, quantity: 1 },
];

const invoice = calculateInvoice(orderItems, 0.1);
const invoiceSummary =
  "Subtotal: " + invoice.subtotal
  + ", tax: " + invoice.tax
  + ", total: " + invoice.total;

console.log("invoice:", invoiceSummary);
console.log("original first quantity:", orderItems[0].quantity);

function makeTaxAdder(rate) {
  return (amount) => amount + amount * rate;
}

const addTenPercent = makeTaxAdder(0.1);
console.log("configured tax:", addTenPercent(50));

function updateCity(profile, city) {
  return {
    ...profile,
    address: {
      ...profile.address,
      city,
    },
  };
}

const originalProfile = {
  name: "Mina",
  address: {
    city: "Pune",
    country: "India",
  },
};

const updatedProfile = updateCity(originalProfile, "Jaipur");

console.log("updated city:", updatedProfile.address.city);
console.log("original city:", originalProfile.address.city);

function createExpiryDate(now, daysToKeep) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return new Date(
    now.getTime() + daysToKeep * millisecondsPerDay,
  );
}

const fixedNow = new Date("2030-01-01T00:00:00.000Z");
const expiry = createExpiryDate(fixedNow, 7);

console.log("expiry:", expiry.toISOString());
console.log("input date:", fixedNow.toISOString());

function createCounter() {
  let value = 0;

  return () => {
    value += 1;
    return value;
  };
}

const nextCount = createCounter();
console.log("stateful closure calls:", nextCount(), nextCount());

const frozenSettings = Object.freeze({
  display: {
    theme: "dark",
  },
});

frozenSettings.display.theme = "light";
console.log("nested value after shallow freeze:", frozenSettings.display.theme);
~~~

## Run the example

From the demo folder, run:

~~~sh
node functional-pipeline.mjs
~~~

Expected output:

~~~text
normalized: ada lovelace
composed: ada lovelace
original name: "  Ada   Lovelace  "
available products: ["NOTEBOOK","FOLDER"]
product count: 3
invoice: Subtotal: 20, tax: 2, total: 22
original first quantity: 2
configured tax: 55
updated city: Jaipur
original city: Pune
expiry: 2030-01-08T00:00:00.000Z
input date: 2030-01-01T00:00:00.000Z
stateful closure calls: 1 2
nested value after shallow freeze: light
~~~

## How the example works

### Pipe and compose

pipe applies operations from left to right. compose applies them from right to left. Both helpers pass one value through unary functions, and both produce the same normalized name in this example.

The raw input string is unchanged. The trim, whitespace normalization, and lowercase functions return transformed strings rather than modifying shared data.

### Filter, map, and reduce

The product pipeline first selects items in stock, then maps the selected items to uppercase names. The original product array still has all three products.

calculateInvoice maps each input item to a new line object, then uses reduce to combine the line totals. The tax rate is an explicit input. The original order items remain unchanged.

The invoice summary is a string calculation. Printing it with console.log is an effect at the application boundary.

### Closure configuration

makeTaxAdder returns a function that remembers the supplied rate. The returned function is predictable because the captured rate is not changed after creation. A closure can be pure when it only uses stable captured values.

### Nested immutable update

updateCity creates a new profile and a new address object. Changing the returned profile does not change the original profile's address.

Both copies still share any other nested values that were not copied.

### Injected time

createExpiryDate receives a Date rather than reading the current clock itself. The fixed input makes the result repeatable. Production code can read the real time outside the calculation and pass it in.

### Stateful closure and shallow freeze

createCounter changes a captured variable, so its results depend on previous calls. This is controlled state, but the function is not pure.

Object.freeze protects the outer settings object only. The nested display object remains mutable, which is why its theme can change.

## Try these changes

- Reverse the order of operations in the pipe and compose calls and observe how the result changes.
- Add an unavailable product and confirm that it does not appear in the transformed list.
- Change the tax rate while leaving order items unchanged.
- Add a nested field to the profile and decide whether updateCity should copy it.
- Pass different fixed dates to createExpiryDate and compare the results.
- Create a second counter and compare its independent state with the first counter.
- Freeze the nested display object separately and observe what changes.

## What this example demonstrates

- Passing and returning functions as values.
- Composing small transformations in both directions.
- Using filter, map, and reduce for their distinct purposes.
- Keeping calculations dependent on explicit inputs.
- Updating nested data without mutating the original path.
- Separating calculation from console output.
- Recognizing captured mutable state and shallow freezing.

The code in this example is provided for study. It has not been run as part of this chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [133 - Algorithmic thinking, complexity, and common patterns](../lessons/133-algorithmic-thinking-complexity-and-common-patterns.md) | [Open Q&A](../qnas/134-functional-programming-composition-and-purity.md) | [Open lesson](../lessons/134-functional-programming-composition-and-purity.md) | [135 - Object-oriented programming, composition, and design patterns](../lessons/135-object-oriented-programming-composition-and-design-patterns.md) |
