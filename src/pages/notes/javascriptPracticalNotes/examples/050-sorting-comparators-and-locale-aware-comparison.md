# 50 - Sorting, comparators, and locale-aware comparison: examples

These examples show default sorting, custom comparators, locale-aware text order, and how to keep the source array unchanged. Each example includes the expected output and the reason for the result.

## 1. Default sort compares strings

### Question

Why does the default sort order for these numbers look unusual?

### Code

~~~js
const values = [3, 20, 100, 4];

values.sort();

console.log(values);
~~~

### Expected output

~~~text
[ 100, 20, 3, 4 ]
~~~

### Explanation

Without a comparator, **sort** converts values to strings and compares their UTF-16 code units. It does not compare the numbers by numeric value.

## 2. Sort numbers in ascending order

### Question

How can the values be ordered numerically from smallest to largest?

### Code

~~~js
const values = [3, 20, 100, 4];

values.sort(function (a, b) {
    return a - b;
});

console.log(values);
~~~

### Expected output

~~~text
[ 3, 4, 20, 100 ]
~~~

### Explanation

For ordinary finite numbers, subtraction produces a negative result when **a** is smaller, zero when equal, and a positive result when **a** is larger.

## 3. Sort numbers in descending order

### Question

How can the same values be sorted from largest to smallest?

### Code

~~~js
const values = [3, 20, 100, 4];

values.sort(function (a, b) {
    return b - a;
});

console.log(values);
~~~

### Expected output

~~~text
[ 100, 20, 4, 3 ]
~~~

### Explanation

Swapping the comparator operands reverses the numeric order.

## 4. Observe that sort mutates and returns the source

### Question

Does **sort** return a different array object?

### Code

~~~js
const values = [30, 10, 20];
const returned = values.sort(function (a, b) {
    return a - b;
});

console.log(values);
console.log(returned === values);
~~~

### Expected output

~~~text
[ 10, 20, 30 ]
true
~~~

### Explanation

**sort** changes its source array and returns the same array object.

## 5. Sort a copy with toSorted

### Question

How can the values be sorted while preserving the original order?

### Code

~~~js
const values = [30, 10, 20];

const sortedValues = values.toSorted(function (a, b) {
    return a - b;
});

console.log(values);
console.log(sortedValues);
console.log(sortedValues === values);
~~~

### Expected output

~~~text
[ 30, 10, 20 ]
[ 10, 20, 30 ]
false
~~~

### Explanation

**toSorted** returns a new outer array. The original array remains unchanged.

## 6. Sort a copy in an older runtime

### Question

What copy-based pattern can be used when **toSorted** is unavailable?

### Code

~~~js
const values = [30, 10, 20];

const sortedValues = [...values].sort(function (a, b) {
    return a - b;
});

console.log(values);
console.log(sortedValues);
~~~

### Expected output

~~~text
[ 30, 10, 20 ]
[ 10, 20, 30 ]
~~~

### Explanation

Spread syntax creates a shallow copy, and **sort** mutates that copy. The source stays in its original order.

## 7. Read a comparator result by its sign

### Question

Should code depend on **localeCompare** returning exactly -1 or 1?

### Code

~~~js
const result = "Asha".localeCompare("Mina", "en");

console.log(result < 0);
console.log(result === 0);
console.log(result > 0);
~~~

### Expected output

~~~text
true
false
false
~~~

### Explanation

**localeCompare** guarantees a negative, zero, or positive result for ordering. Its specific nonzero number is not guaranteed to be -1 or 1.

## 8. Sort objects by a numeric property

### Question

Order products from the lowest price to the highest price.

### Code

~~~js
const products = [
    { name: "Notebook", price: 8 },
    { name: "Marker", price: 3 },
    { name: "Folder", price: 5 }
];

const byPrice = products.toSorted(function (a, b) {
    return a.price - b.price;
});

console.log(byPrice.map(function (product) {
    return product.name;
}));
~~~

### Expected output

~~~text
[ 'Marker', 'Folder', 'Notebook' ]
~~~

### Explanation

The comparator compares the **price** values numerically. The returned array contains the same product objects in a new order.

## 9. Sort objects by two properties

### Question

Order people by last name, then first name.

### Code

~~~js
const people = [
    { lastName: "Rao", firstName: "Mina" },
    { lastName: "Das", firstName: "Dev" },
    { lastName: "Rao", firstName: "Asha" }
];

const sortedPeople = people.toSorted(function (a, b) {
    const byLastName = a.lastName.localeCompare(b.lastName);

    if (byLastName !== 0) {
        return byLastName;
    }

    return a.firstName.localeCompare(b.firstName);
});

console.log(sortedPeople.map(function (person) {
    return person.lastName + ", " + person.firstName;
}));
~~~

### Expected output

~~~text
[ 'Das, Dev', 'Rao, Asha', 'Rao, Mina' ]
~~~

### Explanation

The comparator checks last names first. When they compare equally, it uses first names as a tie-breaker.

## 10. Stable sorting keeps equal items in order

### Question

What happens to records with the same group when sorting by group?

### Code

~~~js
const records = [
    { group: "b", label: "first b" },
    { group: "a", label: "only a" },
    { group: "b", label: "second b" }
];

const grouped = records.toSorted(function (a, b) {
    return a.group.localeCompare(b.group);
});

console.log(grouped.map(function (record) {
    return record.label;
}));
~~~

### Expected output

~~~text
[ 'only a', 'first b', 'second b' ]
~~~

### Explanation

The two **b** groups compare as equal. Stable sorting preserves their relative order from the original array.

## 11. Sort names with locale-aware comparison

### Question

Sort these names using English locale rules and base sensitivity.

### Code

~~~js
const names = ["Élodie", "Asha", "Mina"];

const sortedNames = names.toSorted(function (a, b) {
    return a.localeCompare(b, "en", { sensitivity: "base" });
});

console.log(sortedNames);
~~~

### Expected output

~~~text
[ 'Asha', 'Élodie', 'Mina' ]
~~~

### Explanation

**localeCompare** applies the requested locale and options. Base sensitivity ignores case and accent differences when comparing strings. Exact ordering can depend on runtime locale data, so use a chosen locale and options suitable for the application.

## 12. Sort filenames naturally with Intl.Collator

### Question

How can filenames with digit sequences be ordered as people usually expect?

### Code

~~~js
const filenames = ["page10", "page2", "page1"];

const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
});

const sortedFilenames = filenames.toSorted(collator.compare);

console.log(sortedFilenames);
~~~

### Expected output

~~~text
[ 'page1', 'page2', 'page10' ]
~~~

### Explanation

With **numeric: true**, digit sequences are compared numerically. Reusing a collator is useful when sorting many strings.

## 13. Choose where missing values should go

### Question

Sort products by price and put products without a price last.

### Code

~~~js
const products = [
    { name: "Notebook", price: 8 },
    { name: "Mystery item" },
    { name: "Marker", price: 3 }
];

const sortedProducts = products.toSorted(function (a, b) {
    const aMissing = a.price === undefined;
    const bMissing = b.price === undefined;

    if (aMissing && bMissing) {
        return 0;
    }

    if (aMissing) {
        return 1;
    }

    if (bMissing) {
        return -1;
    }

    return a.price - b.price;
});

console.log(sortedProducts.map(function (product) {
    return product.name;
}));
~~~

### Expected output

~~~text
[ 'Marker', 'Notebook', 'Mystery item' ]
~~~

### Explanation

The comparator defines the missing-price policy explicitly, then compares available prices numerically.

## 14. Choose where NaN should go

### Question

Sort numbers ascending and place **NaN** values at the end.

### Code

~~~js
function compareNumbersWithNaNLast(a, b) {
    const aIsNaN = Number.isNaN(a);
    const bIsNaN = Number.isNaN(b);

    if (aIsNaN && bIsNaN) {
        return 0;
    }

    if (aIsNaN) {
        return 1;
    }

    if (bIsNaN) {
        return -1;
    }

    if (a < b) {
        return -1;
    }

    if (a > b) {
        return 1;
    }

    return 0;
}

const measurements = [8, NaN, 3, 5];

console.log(measurements.toSorted(compareNumbersWithNaNLast));
~~~

### Expected output

~~~text
[ 3, 5, 8, NaN ]
~~~

### Explanation

The comparator gives **NaN** an explicit position. The ordinary values are compared numerically.

## 15. See why a boolean comparator is wrong

### Question

Does returning **a > b** fully describe the desired ordering?

### Code

~~~js
function incorrectComparator(a, b) {
    return a > b;
}

console.log(incorrectComparator(8, 2));
console.log(incorrectComparator(2, 8));
~~~

### Expected output

~~~text
true
false
~~~

### Explanation

Booleans convert to 1 or 0. The comparator never returns a negative number, so it cannot consistently say that the first value should come before the second. Use subtraction for ordinary finite numbers or explicit comparison branches.

## 16. Reverse a sort direction by swapping comparator arguments

### Question

Sort names in descending locale order.

### Code

~~~js
const names = ["Asha", "Mina", "Dev"];

const descendingNames = names.toSorted(function (a, b) {
    return b.localeCompare(a, "en");
});

console.log(descendingNames);
~~~

### Expected output

~~~text
[ 'Mina', 'Dev', 'Asha' ]
~~~

### Explanation

The comparator compares **b** with **a**, reversing the ascending locale order.

## 17. Use a compact multi-key comparator

### Question

Use the **||** operator to compare status and then id.

### Code

~~~js
const records = [
    { status: "open", id: 12 },
    { status: "closed", id: 30 },
    { status: "open", id: 4 }
];

const sortedRecords = records.toSorted(function (a, b) {
    return a.status.localeCompare(b.status) || a.id - b.id;
});

console.log(sortedRecords.map(function (record) {
    return record.status + " " + record.id;
}));
~~~

### Expected output

~~~text
[ 'closed 30', 'open 4', 'open 12' ]
~~~

### Explanation

A nonzero comparison result is truthy, so the id comparison is used only when the status comparison returns zero.

## 18. Default sort places undefined after defined values

### Question

Where does **undefined** appear when using default sorting?

### Code

~~~js
const values = ["b", undefined, "a"];

console.log(values.toSorted());
~~~

### Expected output

~~~text
[ 'a', 'b', undefined ]
~~~

### Explanation

Default sorting puts defined values in string order and places **undefined** values after them.

## 19. Reuse a collator for repeated comparisons

### Question

How can one collator be reused for a list of labels?

### Code

~~~js
const labels = ["Part 12", "Part 3", "Part 1"];

const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
});

const sortedLabels = labels.toSorted(collator.compare);

console.log(sortedLabels);
~~~

### Expected output

~~~text
[ 'Part 1', 'Part 3', 'Part 12' ]
~~~

### Explanation

The collator's **compare** function applies the same locale and options to every comparison during sorting.

## 20. Separate machine ordering from human ordering

### Question

Which comparator makes a list of numeric identifiers sort predictably without locale rules?

### Code

~~~js
const identifiers = [40, 5, 12];

const sortedIdentifiers = identifiers.toSorted(function (a, b) {
    return a - b;
});

console.log(sortedIdentifiers);
~~~

### Expected output

~~~text
[ 5, 12, 40 ]
~~~

### Explanation

These values are numeric identifiers, so an explicit numeric comparator is appropriate. Locale-aware string comparison is intended for human-readable text, not numeric data stored as numbers.

## 21. Sort a list of labels without changing it

### Question

Can a filtered or previously stored list remain available while a sorted view is created?

### Code

~~~js
const original = ["Zara", "Asha", "Mina"];
const sorted = original.toSorted(function (a, b) {
    return a.localeCompare(b, "en");
});

console.log(original);
console.log(sorted);
~~~

### Expected output

~~~text
[ 'Zara', 'Asha', 'Mina' ]
[ 'Asha', 'Mina', 'Zara' ]
~~~

### Explanation

**toSorted** is useful when the original order should remain available, for example when creating a separate sorted view.

## Practice prompts

1. Sort an array of decimal numbers ascending and descending.
2. Sort records by a numeric field and then a text field.
3. Sort a copy and confirm that the source is unchanged.
4. Create a collator with numeric comparison for filenames.
5. Decide where records with missing values should go.
6. Define a policy for **NaN** in numeric sorting.
7. Compare default sorting with an explicit locale-aware comparator.
8. Use stable sorting to preserve original order among equal keys.
9. Rewrite a boolean comparator as a valid three-way comparator.
10. Explain why a comparator should avoid changing data or relying on call order.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [49 - Mutation, copying, and immutable array updates](049-mutation-copying-and-immutable-array-updates.md) | [Open lesson](../lessons/050-sorting-comparators-and-locale-aware-comparison.md) | [Open Q&A](../qnas/050-sorting-comparators-and-locale-aware-comparison.md) | [51 - Sparse arrays, array-like objects, and array protocols](../lessons/051-sparse-arrays-array-like-objects-and-array-protocols.md) |
