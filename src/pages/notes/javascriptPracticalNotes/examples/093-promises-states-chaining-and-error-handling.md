# 93 - Promises, states, chaining, and error handling

## Question

How can an order workflow use Promises to wait for asynchronous steps, pass results between handlers, recover from a useful failure, and always perform cleanup?

## Project file

~~~text
promise-order-example/
  promise-order.mjs
~~~

## Complete example

Save this as **promise-order.mjs** and run it with Node.js:

~~~sh
node promise-order.mjs
~~~

The example uses only built-in JavaScript and timers. It does not make network requests or read files.

~~~js
// promise-order.mjs

function fulfillAfter(value, milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, milliseconds);
  });
}

function saveReceipt(order) {
  const receipt = {
    orderId: order.id,
    total: order.quantity * order.unitPrice
  };

  return fulfillAfter(receipt, 30);
}

function processOrder(order) {
  console.log("Starting order " + order.id);

  return fulfillAfter(order, 20)
    .then((loadedOrder) => {
      console.log("Loaded order " + loadedOrder.id);

      if (loadedOrder.quantity > loadedOrder.stock) {
        throw new Error("Requested quantity is not in stock");
      }

      return {
        ...loadedOrder,
        total: loadedOrder.quantity * loadedOrder.unitPrice
      };
    })
    .then((pricedOrder) => {
      return saveReceipt(pricedOrder);
    })
    .then((receipt) => {
      console.log(
        "Receipt saved for " + receipt.orderId + ": $" + receipt.total.toFixed(2)
      );

      return {
        id: receipt.orderId,
        status: "complete"
      };
    })
    .catch((error) => {
      console.log(
        "Handled failure for " + order.id + ": " + error.message
      );

      return {
        id: order.id,
        status: "not processed"
      };
    })
    .finally(() => {
      console.log("Cleanup finished for " + order.id);
    })
    .then((result) => {
      console.log("Outcome: " + result.id + " is " + result.status);
      return result;
    });
}

const orders = [
  {
    id: "A-104",
    quantity: 2,
    stock: 5,
    unitPrice: 12.5
  },
  {
    id: "A-105",
    quantity: 4,
    stock: 1,
    unitPrice: 8
  }
];

processOrder(orders[0])
  .then(() => processOrder(orders[1]))
  .then(() => {
    console.log("Both demo workflows finished");
  });
~~~

## Expected output

~~~text
Starting order A-104
Loaded order A-104
Receipt saved for A-104: $25.00
Cleanup finished for A-104
Outcome: A-104 is complete
Starting order A-105
Loaded order A-105
Handled failure for A-105: Requested quantity is not in stock
Cleanup finished for A-105
Outcome: A-105 is not processed
Both demo workflows finished
~~~

The example waits on each order workflow before starting the next one. The short delays make the Promise handoffs observable, but their exact duration is not important.

## Explanation

### The Promise executor starts the simulated operation

fulfillAfter creates a Promise and schedules a timer inside its executor. The executor runs immediately. Its timer callback runs later and calls resolve with the supplied value.

### then passes values through a chain

processOrder returns the whole chain. The first then receives the loaded order and either throws an Error or returns a new order object with its total.

Throwing inside a then handler rejects the Promise returned by that then. A later rejection handler can catch the failure.

The next then returns saveReceipt's Promise. Because it returns that Promise, the chain waits until the receipt has been saved. The following handler receives the receipt value.

### catch handles and recovers from the stock failure

The second order requests more items than are in stock. The fulfillment handler throws an Error, so the receipt handlers are skipped and catch receives the error.

The catch returns an object with a not processed status. That value recovers the chain, so the Promise returned by catch is fulfilled and the later handler can display the outcome. The fallback is explicit and meaningful for this workflow.

### finally performs cleanup

finally runs after either the successful order or the handled failure. It does not receive the receipt or error. Since cleanup completes normally, the Promise chain continues with the value produced before finally.

### The outer chain waits before starting the next order

The first then returns processOrder for the second order. The outer chain waits for that Promise before printing the final message. No nested, floating workflow is left running in the background.

## Try another case

1. Change the second order's stock to 5 and run the file again. Both orders should complete successfully.
2. Change the first order's quantity to a value greater than its stock. Observe the handled failure and fallback status.
3. Remove return before saveReceipt(pricedOrder). Observe that the next handler no longer waits for the receipt Promise.
4. Change the catch handler to throw error instead of returning a fallback object. Add a catch after the outer chain to display the propagated failure.
5. Remove the finally callback and compare which output is lost. The success and recovery behavior should still work.

## Key points

- A Promise executor runs immediately, while a timer can complete the work later.
- then returns a new Promise and passes a returned value to the next handler.
- Return a Promise from a handler when the chain should wait for it.
- Throwing in a handler rejects the new Promise in the chain.
- catch can recover with a useful fallback value or rethrow the failure.
- finally runs for success and failure and normally preserves the current outcome.
- Returning a workflow Promise lets callers wait for the complete operation.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [92 - Timers, animation frames, and scheduling](../lessons/092-timers-animation-frames-and-scheduling.md) | [Open lesson](../lessons/093-promises-states-chaining-and-error-handling.md) | [Open Q&A](../qnas/093-promises-states-chaining-and-error-handling.md) | [94 - Promise combinators and concurrent work](../lessons/094-promise-combinators-and-concurrent-work.md) |
