# 135 - Object-oriented programming, composition, and design patterns: Example

## Question

Design a small checkout flow that keeps product and cart state valid, applies a replaceable discount, adapts a legacy payment API, and announces a successful order to observers.

Use objects where they own meaningful state and operations. Make the collaborators visible so a different discount or payment implementation can be supplied later.

## Complete example

This single JavaScript program demonstrates private fields, a Strategy for discounts, an Adapter for a legacy payment provider, and a small Observer-style event bus.

~~~js
function assertNonNegativeInteger(value, label) {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(label + " must be a non-negative integer");
  }
}

class Product {
  #id;
  #name;
  #priceCents;

  constructor({ id, name, priceCents }) {
    if (typeof id !== "string" || id.length === 0) {
      throw new TypeError("Product id is required");
    }
    if (typeof name !== "string" || name.length === 0) {
      throw new TypeError("Product name is required");
    }
    assertNonNegativeInteger(priceCents, "Price");
    this.#id = id;
    this.#name = name;
    this.#priceCents = priceCents;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get priceCents() {
    return this.#priceCents;
  }
}

class ShoppingCart {
  #items = new Map();

  add(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new TypeError("Cart accepts Product instances");
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new RangeError("Quantity must be a positive integer");
    }

    const current = this.#items.get(product.id);
    const nextQuantity = (current ? current.quantity : 0) + quantity;
    this.#items.set(product.id, { product, quantity: nextQuantity });
  }

  remove(productId) {
    return this.#items.delete(productId);
  }

  get lineItems() {
    return Array.from(this.#items.values()).map(({ product, quantity }) => ({
      product,
      quantity
    }));
  }

  subtotalCents() {
    return this.lineItems.reduce(
      (total, { product, quantity }) => total + product.priceCents * quantity,
      0
    );
  }
}

class NoDiscount {
  discountCents() {
    return 0;
  }
}

class PercentageDiscount {
  #percent;

  constructor(percent) {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new RangeError("Discount percent must be from 0 to 100");
    }
    this.#percent = percent;
  }

  discountCents(subtotalCents) {
    return Math.round(subtotalCents * this.#percent / 100);
  }
}

class LegacyPaymentProvider {
  async chargeCents(cents, reference) {
    assertNonNegativeInteger(cents, "Charge");
    console.log("Payment provider charged " + cents + " cents for " + reference);
    return { approved: true, transactionId: "txn-" + reference };
  }
}

class PaymentGatewayAdapter {
  #provider;

  constructor(provider) {
    if (!provider || typeof provider.chargeCents !== "function") {
      throw new TypeError("Provider must implement chargeCents");
    }
    this.#provider = provider;
  }

  async charge({ amountCents, reference }) {
    const result = await this.#provider.chargeCents(amountCents, reference);
    if (!result.approved) {
      throw new Error("Payment was declined");
    }
    return { status: "paid", transactionId: result.transactionId };
  }
}

class EventBus {
  #listeners = new Map();

  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }

    const listeners = this.#listeners.get(eventName) || new Set();
    listeners.add(listener);
    this.#listeners.set(eventName, listeners);
    return () => listeners.delete(listener);
  }

  emit(eventName, payload) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners) return;

    for (const listener of Array.from(listeners)) {
      listener(payload);
    }
  }
}

class CheckoutService {
  #cart;
  #discountPolicy;
  #paymentGateway;
  #events;

  constructor({ cart, discountPolicy, paymentGateway, events }) {
    if (!cart || typeof cart.subtotalCents !== "function") {
      throw new TypeError("Cart must provide subtotalCents");
    }
    if (!discountPolicy || typeof discountPolicy.discountCents !== "function") {
      throw new TypeError("Discount policy must provide discountCents");
    }
    if (!paymentGateway || typeof paymentGateway.charge !== "function") {
      throw new TypeError("Payment gateway must provide charge");
    }
    if (!events || typeof events.emit !== "function") {
      throw new TypeError("Events must provide emit");
    }

    this.#cart = cart;
    this.#discountPolicy = discountPolicy;
    this.#paymentGateway = paymentGateway;
    this.#events = events;
  }

  async placeOrder(reference) {
    const subtotalCents = this.#cart.subtotalCents();
    const proposedDiscount = this.#discountPolicy.discountCents(subtotalCents);
    assertNonNegativeInteger(proposedDiscount, "Discount");

    const discountCents = Math.min(proposedDiscount, subtotalCents);
    const totalCents = subtotalCents - discountCents;
    const payment = await this.#paymentGateway.charge({
      amountCents: totalCents,
      reference
    });

    const receipt = Object.freeze({
      reference,
      subtotalCents,
      discountCents,
      totalCents,
      status: payment.status,
      transactionId: payment.transactionId
    });

    this.#events.emit("order:paid", receipt);
    return receipt;
  }
}

function formatMoney(cents) {
  return "$" + (cents / 100).toFixed(2);
}

async function main() {
  const book = new Product({
    id: "book",
    name: "JavaScript Guide",
    priceCents: 3000
  });
  const notebook = new Product({
    id: "notebook",
    name: "Notebook",
    priceCents: 2000
  });

  const cart = new ShoppingCart();
  cart.add(book);
  cart.add(notebook);

  const events = new EventBus();
  events.on("order:paid", (receipt) => {
    console.log(
      "Observer: order " + receipt.reference +
      " paid for " + formatMoney(receipt.totalCents)
    );
  });

  const checkout = new CheckoutService({
    cart,
    discountPolicy: new PercentageDiscount(10),
    paymentGateway: new PaymentGatewayAdapter(new LegacyPaymentProvider()),
    events
  });

  const receipt = await checkout.placeOrder("ORD-1001");

  console.log(
    "Receipt: subtotal=" + formatMoney(receipt.subtotalCents) +
    ", discount=" + formatMoney(receipt.discountCents) +
    ", total=" + formatMoney(receipt.totalCents) +
    ", status=" + receipt.status
  );
}

main().catch((error) => {
  console.error("Checkout failed: " + error.message);
});
~~~

## Expected output

~~~text
Payment provider charged 4500 cents for ORD-1001
Observer: order ORD-1001 paid for $45.00
Receipt: subtotal=$50.00, discount=$5.00, total=$45.00, status=paid
~~~

## Explanation

### Product owns validated data

**Product** keeps its identifier, name, and price in private fields. Its constructor validates the initial values, and read-only getters expose the data the cart needs. Prices use integer cents to avoid floating-point currency arithmetic.

### Cart protects its collection

**ShoppingCart** stores line items in a private **Map**. **add** validates the product and quantity, then combines repeated additions of the same product. **lineItems** returns a new array of new line-item records, so callers cannot edit the cart's internal map through the returned array.

### Discount is a Strategy

**NoDiscount** and **PercentageDiscount** provide the same **discountCents** operation. **CheckoutService** receives a policy in its constructor. A fixed-amount policy could be added without adding another branch to checkout. The service caps a discount at the subtotal, so the total cannot become negative.

### The payment adapter contains the legacy interface

The provider expects **chargeCents(cents, reference)**. Checkout expects **charge({ amountCents, reference })**. **PaymentGatewayAdapter** translates the request and maps the provider's approval result to the application's status shape.

A real provider would be injected at the application boundary. This example uses a local implementation and makes no network request.

### The event bus demonstrates observers

Checkout emits **order:paid** after payment succeeds. A listener reacts without being called directly by the service. **on** returns a function that unsubscribes that listener.

This event bus is synchronous, so a listener error can affect the caller. A larger application should define event payloads and error behavior deliberately.

### Checkout composes collaborators

Checkout receives its cart, discount policy, gateway, and event publisher. It coordinates them but does not construct a real payment provider or decide how a discount is calculated.

## Try these changes

- Replace **PercentageDiscount(10)** with **NoDiscount** and compare the receipt.
- Add a second book and confirm the cart increases its quantity.
- Try to add a quantity of zero and observe the validation error.
- Add a fixed-amount discount policy implementing **discountCents**.
- Make the fake provider return **approved: false** and decide how the caller should handle failure.
- Subscribe a second observer, unsubscribe it, then place an order.
- Add a second payment adapter with the same public **charge** contract.

## What this example demonstrates

- Encapsulation with private fields and validated public operations.
- A focused cart that owns its collection.
- Strategy-based discount selection.
- An adapter around a legacy payment interface.
- Observer-style event notification.
- Composition and dependency injection in a service.
- Clear side-effect boundaries and integer currency units.

The code is provided for study and has not been run as part of this chapter.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [134 - Functional programming: composition and purity](../lessons/134-functional-programming-composition-and-purity.md) | [Open Q&A](../qnas/135-object-oriented-programming-composition-and-design-patterns.md) | [Open lesson](../lessons/135-object-oriented-programming-composition-and-design-patterns.md) | [136 - Modular architecture and dependency boundaries](../lessons/136-modular-architecture-and-dependency-boundaries.md) |
