# 75 - Math, Number, and numeric utilities example

This complete example builds a small trip-expense report. It validates decimal text, stores expenses as integer cents, calculates totals, applies an explicit tax-rounding rule, and formats the result for display.

## Goal

Use numeric utilities in a realistic calculation while keeping input parsing, exact storage, arithmetic, and display separate.

## Complete example

Copy this into **75-trip-expense-report.mjs** and run it with a modern JavaScript runtime that supports Intl.NumberFormat.

~~~js
function parseCents(text) {
  if (typeof text !== 'string') {
    throw new TypeError('An amount must be supplied as text');
  }

  const normalized = text.trim();
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(normalized);

  if (!match) {
    throw new TypeError('Enter a non-negative amount with at most two decimals');
  }

  const wholeUnits = Number(match[1]);
  const fractionalText = (match[2] ?? '').padEnd(2, '0');
  const minorUnits = Number(fractionalText);
  const cents = wholeUnits * 100 + minorUnits;

  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('The amount is outside the safe integer range');
  }

  return cents;
}

function createExpense(name, amountText) {
  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new TypeError('An expense needs a non-empty name');
  }

  return {
    name: name.trim(),
    cents: parseCents(amountText)
  };
}

function sumCents(expenses) {
  return expenses.reduce((total, expense) => {
    const nextTotal = total + expense.cents;

    if (!Number.isSafeInteger(nextTotal)) {
      throw new RangeError('The total is outside the safe integer range');
    }

    return nextTotal;
  }, 0);
}

function findExpense(expenses, compare) {
  return expenses.reduce((best, current) => {
    return compare(current.cents, best.cents) ? current : best;
  });
}

function nearlyEqual(a, b, tolerance = 1e-12) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return a === b;
  }

  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= tolerance * scale;
}

const expenses = [
  createExpense('Train', '1250.00'),
  createExpense('Stay', '3400.50'),
  createExpense('Meals', '850.25'),
  createExpense('Museum', '499.99')
];

const totalCents = sumCents(expenses);
const taxRatePercent = 5;
const taxCents = Math.round(totalCents * taxRatePercent / 100);
const totalWithTaxCents = totalCents + taxCents;
const averageCents = Math.round(totalCents / expenses.length);

const smallestExpense = findExpense(
  expenses,
  (current, best) => current < best
);
const largestExpense = findExpense(
  expenses,
  (current, best) => current > best
);

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
});

function formatCents(cents) {
  return currency.format(cents / 100);
}

console.log('Expenses: ' + expenses.length);
console.log('Total: ' + formatCents(totalCents));
console.log('Tax at ' + taxRatePercent + '%: ' + formatCents(taxCents));
console.log('Estimated total: ' + formatCents(totalWithTaxCents));
console.log('Average expense: ' + formatCents(averageCents));
console.log(
  'Largest: ' + largestExpense.name + ' at ' + formatCents(largestExpense.cents)
);
console.log(
  'Smallest: ' + smallestExpense.name + ' at ' + formatCents(smallestExpense.cents)
);

const floatingResult = 0.1 + 0.2;

console.log('0.1 + 0.2: ' + floatingResult);
console.log('Direct equality: ' + (floatingResult === 0.3));
console.log('Approximate equality: ' + nearlyEqual(floatingResult, 0.3));
console.log('parseInt prefix: ' + parseInt('12.5', 10));
console.log('Number full conversion is finite: ' + Number.isFinite(Number('12px')));
~~~

## Expected output

~~~text
Expenses: 4
Total: ₹5,100.74
Tax at 5%: ₹255.04
Estimated total: ₹5,355.78
Average expense: ₹1,275.19
Largest: Stay at ₹3,400.50
Smallest: Museum at ₹499.99
0.1 + 0.2: 0.30000000000000004
Direct equality: false
Approximate equality: true
parseInt prefix: 12
Number full conversion is finite: false
~~~

## How it works

### Validate decimal text before converting

**parseCents()** accepts only non-negative decimal text with zero, one, or two digits after the decimal point. It converts the whole and fractional parts separately, so it does not first perform arithmetic on an inexact decimal fraction.

The accepted format is deliberately narrow. It rejects signs, commas, currency symbols, and more than two decimal places. A real application should define its accepted input format and localization rules.

### Store minor units as integers

Each expense is stored in cents. The program checks each amount and each running total with **Number.isSafeInteger()**. This keeps these values exact within the safe integer range.

The tax and average calculations still need a rounding policy. This example rounds to the nearest cent with **Math.round()**. The policy is appropriate for this demonstration, but financial systems should follow the required currency and business rules.

### Calculate and format separately

The program uses **reduce()** for the total, compares cents to find the smallest and largest items, and applies the percentage before formatting. **Intl.NumberFormat** adds the locale-sensitive INR currency display only at the output boundary.

Formatted currency strings are not fed back into calculations.

### Compare approximate floating-point results

The 0.1 plus 0.2 demonstration shows why strict equality can fail for floating-point arithmetic. **nearlyEqual()** compares the difference with a relative tolerance. The tolerance should be chosen for the scale and accuracy of a real calculation.

### Contrast numeric parsers

**parseInt('12.5', 10)** intentionally reads the integer prefix and returns 12. **Number('12px')** rejects the full string and produces NaN, so **Number.isFinite()** returns false.

## Try these changes

1. Change the Train amount to **1250.5** and see it become 1250.50.
2. Change an amount to **1250.555** and observe the input validation error.
3. Try a blank amount, a negative amount, or a currency symbol.
4. Increase the tax rate and compare the tax and estimated total.
5. Replace the average calculation with Math.floor() and explain how the result changes.
6. Change the currency code and locale in Intl.NumberFormat, then compare the display.
7. Add an expense and confirm the total and smallest or largest item update.
8. Replace the amounts with JavaScript decimal Numbers and compare the behavior with integer cents.

## What this example does not cover

The amount format and tax rule are intentionally simple. The example does not implement locale-aware input parsing, refunds, multiple currencies, exchange rates, or a jurisdiction-specific accounting policy. It is a learning example, not a financial system.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [74 - JSON parsing, serialization, and data limits](../lessons/074-json-parsing-serialization-and-data-limits.md) | [Open lesson](../lessons/075-math-number-and-numeric-utilities.md) | [Open Q&A](../qnas/075-math-number-and-numeric-utilities.md) | [76 - Dates, time zones, and Temporal](../lessons/076-dates-time-zones-and-temporal.md) |

