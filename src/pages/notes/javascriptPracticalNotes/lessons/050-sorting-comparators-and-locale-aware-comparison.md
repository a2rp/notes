# 50 - Sorting, comparators, and locale-aware comparison

Sorting puts array values into a chosen order. JavaScript can sort strings with its default behavior, but it does not automatically sort numbers by numeric value. For predictable results, choose the right comparison rule and know whether the method changes the original array.

This chapter covers default sorting, comparator functions, stable sorting, sorting objects, locale-aware text comparison, and non-mutating sorting.

## What you will learn

- Explain the default behavior of **sort**.
- Write numeric and descending comparators.
- Sort objects by one or more properties.
- Keep the original array unchanged with **toSorted** or a copy.
- Use **localeCompare** and **Intl.Collator** for human-readable text.
- Understand stable ordering and comparator requirements.
- Avoid common sorting mistakes with mixed values, **NaN**, and side effects.

## Default sort compares string representations

Without a comparator, **sort** converts values to strings and orders those strings by their UTF-16 code units. This can be useful for simple text, but it is not numeric ordering.

~~~js
const values = [3, 20, 100, 4];

values.sort();

console.log(values);
~~~

Output:

~~~text
[ 100, 20, 3, 4 ]
~~~

The values are compared as strings: **"100"**, **"20"**, **"3"**, and **"4"**. Their order is not the order of the numeric values.

For ordinary strings, default sorting may look as expected:

~~~js
const names = ["Mina", "Asha", "Dev"];

names.sort();

console.log(names);
~~~

Output:

~~~text
[ 'Asha', 'Dev', 'Mina' ]
~~~

However, the default order is based on UTF-16 code units, not a human language's alphabetic or dictionary rules. Case, accents, punctuation, and characters from different writing systems may not appear in the order a person expects.

## sort mutates the source array

**sort** reorders the array it is called on and returns that same array object.

~~~js
const scores = [40, 10, 30];
const returned = scores.sort(function (a, b) {
    return a - b;
});

console.log(scores);
console.log(returned === scores);
~~~

Output:

~~~text
[ 10, 30, 40 ]
true
~~~

The original order is lost unless you made a copy first.

## Write a comparator

A comparator receives two values and tells the sorting operation how to order them:

- Return a negative number if **a** should come before **b**.
- Return a positive number if **a** should come after **b**.
- Return zero when they should be treated as equal for sorting.

The exact negative or positive number does not matter. The sign matters.

~~~js
function compareAscending(a, b) {
    if (a < b) {
        return -1;
    }

    if (a > b) {
        return 1;
    }

    return 0;
}

const values = [12, 3, 25, 7];

console.log(values.toSorted(compareAscending));
~~~

Output:

~~~text
[ 3, 7, 12, 25 ]
~~~

A comparator should describe the relationship between its two inputs consistently. It should not depend on which pair happened to be compared earlier.

## Sort numbers numerically

For numbers that are known to be ordinary finite values, subtraction is a concise ascending comparator:

~~~js
const scores = [40, 10, 30, 20];

scores.sort(function (a, b) {
    return a - b;
});

console.log(scores);
~~~

Output:

~~~text
[ 10, 20, 30, 40 ]
~~~

If **a** is smaller than **b**, **a - b** is negative, so **a** comes first. If **a** is larger, the result is positive.

### Sort numbers in descending order

Reverse the operands to sort descending:

~~~js
const scores = [40, 10, 30, 20];

const descending = scores.toSorted(function (a, b) {
    return b - a;
});

console.log(scores);
console.log(descending);
~~~

Output:

~~~text
[ 40, 10, 30, 20 ]
[ 40, 30, 20, 10 ]
~~~

The original array is preserved because **toSorted** returns a new array.

### Handle special numeric values deliberately

Do not assume **a - b** gives a meaningful order for every JavaScript number. If the array may contain **NaN**, define where it belongs.

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

Output:

~~~text
[ 3, 5, 8, NaN ]
~~~

This comparator puts **NaN** values last. Another application might reject them or put them first. The important point is to choose a policy rather than letting arithmetic produce an accidental ordering.

## Sort objects by a property

To sort objects, compare the property that defines their order.

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

Output:

~~~text
[ 'Marker', 'Folder', 'Notebook' ]
~~~

The array order changes in the result, but the product objects are not cloned. **byPrice** contains references to the same objects as **products**.

### Sort by more than one property

Use the next comparison only when the earlier comparison says the items are tied.

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

Output:

~~~text
[ 'Das, Dev', 'Rao, Asha', 'Rao, Mina' ]
~~~

First, the comparator orders by last name. If the last names compare as equal, it orders by first name.

A concise version can use **||** because a nonzero comparison result is truthy:

~~~js
function comparePeople(a, b) {
    return a.lastName.localeCompare(b.lastName) ||
        a.firstName.localeCompare(b.firstName);
}
~~~

Keep the expanded version when it is easier to read or when additional ordering rules are needed.

### Put missing property values in a chosen position

Real data may have absent values. Decide where those items belong rather than trying to subtract missing values.

~~~js
const products = [
    { name: "Notebook", price: 8 },
    { name: "Mystery item" },
    { name: "Marker", price: 3 }
];

const byPriceMissingLast = products.toSorted(function (a, b) {
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

console.log(byPriceMissingLast.map(function (product) {
    return product.name;
}));
~~~

Output:

~~~text
[ 'Marker', 'Notebook', 'Mystery item' ]
~~~

The comparator explicitly places products with no **price** after products that have one.

## Stable sorting

JavaScript sorting is stable. If the comparator considers two values equal by returning zero, their original relative order is preserved.

~~~js
const entries = [
    { group: "b", label: "first b" },
    { group: "a", label: "only a" },
    { group: "b", label: "second b" }
];

const grouped = entries.toSorted(function (a, b) {
    return a.group.localeCompare(b.group);
});

console.log(grouped.map(function (entry) {
    return entry.label;
}));
~~~

Output:

~~~text
[ 'only a', 'first b', 'second b' ]
~~~

The two **b** entries compare equally by group, so **first b** remains before **second b**. Stability is useful when a sequence has already been sorted by a secondary key and you then sort it by a primary key, though an explicit multi-key comparator often makes the rule clearer.

Stable sorting is part of modern JavaScript behavior. Do not use a comparator that returns zero for values that should have a defined order if that distinction matters.

## Sort text for people with locale-aware comparison

Human language sorting is more complex than UTF-16 code-unit ordering. It can depend on language, accent handling, case handling, punctuation, and numeric-looking text.

### Use localeCompare for occasional comparisons

**localeCompare** compares two strings according to a locale and optional comparison settings. It returns a negative value, zero, or a positive value. Do not assume it returns exactly **-1** or **1**.

~~~js
const names = ["Élodie", "Asha", "Mina"];

const sortedNames = names.toSorted(function (a, b) {
    return a.localeCompare(b, "en", { sensitivity: "base" });
});

console.log(sortedNames);
~~~

Output:

~~~text
[ 'Asha', 'Élodie', 'Mina' ]
~~~

The locale and options let the comparison follow human language rules. **sensitivity: "base"** treats strings that differ only by case or accent as equivalent for comparison. Stable sorting preserves their original relative order when they compare equal.

Locale data can vary with the runtime's locale implementation. For deterministic identifiers, protocol values, or machine keys, use an explicit rule such as a numeric comparator or a code-unit comparison designed for that data instead of relying on a user's language settings.

### Reuse Intl.Collator for many comparisons

When sorting many strings, create one **Intl.Collator** and reuse its **compare** function.

~~~js
const filenames = ["page10", "page2", "page1"];

const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
});

const sortedFiles = filenames.toSorted(collator.compare);

console.log(sortedFiles);
~~~

Output:

~~~text
[ 'page1', 'page2', 'page10' ]
~~~

With **numeric: true**, sequences of digits are compared by numeric value. Without this option, ordinary string comparison can put **page10** before **page2**.

### Choose locale options deliberately

Common **Intl.Collator** options include:

| Option | Purpose |
| --- | --- |
| **numeric** | Compare digit sequences by numeric value |
| **sensitivity** | Decide whether accents and case distinguish strings |
| **ignorePunctuation** | Ignore punctuation in comparisons when true |
| **caseFirst** | Request lowercase-first, uppercase-first, or locale-default case ordering |

The **sensitivity** values have these general meanings:

| Value | Differences that affect comparison |
| --- | --- |
| **base** | Base letters; ignores accent and case differences |
| **accent** | Base letters and accents; ignores case differences |
| **case** | Base letters and case; ignores accent differences |
| **variant** | Base letters, accents, and case |

The final order depends on the selected locale. Try the settings with the language and data your application actually needs.

## Build descending and multi-key orderings

A numeric ascending comparator can be reversed by swapping its operands:

~~~js
function comparePriceAscending(a, b) {
    return a.price - b.price;
}

function comparePriceDescending(a, b) {
    return comparePriceAscending(b, a);
}
~~~

For strings, swap the values passed to **localeCompare**:

~~~js
const names = ["Asha", "Mina", "Dev"];

const descendingNames = names.toSorted(function (a, b) {
    return b.localeCompare(a, "en");
});

console.log(descendingNames);
~~~

Output:

~~~text
[ 'Mina', 'Dev', 'Asha' ]
~~~

For multiple keys, return the first nonzero comparison result. For example, order records by status and then by a numeric identifier:

~~~js
const records = [
    { status: "open", id: 12 },
    { status: "closed", id: 30 },
    { status: "open", id: 4 }
];

const sortedRecords = records.toSorted(function (a, b) {
    const byStatus = a.status.localeCompare(b.status);

    if (byStatus !== 0) {
        return byStatus;
    }

    return a.id - b.id;
});

console.log(sortedRecords.map(function (record) {
    return record.status + " " + record.id;
}));
~~~

Output:

~~~text
[ 'closed 30', 'open 4', 'open 12' ]
~~~

## Keep or change the original array

Use **sort** when it is acceptable to reorder the existing array:

~~~js
const scores = [14, 3, 9];

scores.sort(function (a, b) {
    return a - b;
});

console.log(scores);
~~~

Output:

~~~text
[ 3, 9, 14 ]
~~~

Use **toSorted** to get a sorted copy:

~~~js
const scores = [14, 3, 9];
const sortedScores = scores.toSorted(function (a, b) {
    return a - b;
});

console.log(scores);
console.log(sortedScores);
~~~

Output:

~~~text
[ 14, 3, 9 ]
[ 3, 9, 14 ]
~~~

For a runtime without **toSorted**, copy first and sort the copy:

~~~js
const scores = [14, 3, 9];
const sortedScores = [...scores].sort(function (a, b) {
    return a - b;
});

console.log(scores);
console.log(sortedScores);
~~~

Output:

~~~text
[ 14, 3, 9 ]
[ 3, 9, 14 ]
~~~

**toSorted** is a modern array method. Check support in the runtime you target or use the copy-then-sort form.

## Comparator rules and common pitfalls

A reliable comparator should be consistent:

- If it says **a** comes before **b**, it should not later say **b** comes before **a** for the same values.
- It should treat a value as equal to itself.
- Its result should depend on the values being compared, not on hidden changing state.
- It should not mutate the array or values while sorting.
- It should return a negative number, zero, or a positive number, not a boolean.

A boolean comparator is not a correct substitute for a numeric result:

~~~js
const values = [8, 2, 5];

const unreliable = values.toSorted(function (a, b) {
    return a > b;
});

console.log(unreliable);
~~~

The callback's **true** and **false** values are converted to 1 and 0. There is no negative result to consistently place one value before the other. Write **a - b** for ordinary finite numbers or use explicit comparisons.

Do not depend on how many times the comparator runs or which pairs are compared first. Sorting algorithms can make different comparison calls while still producing a valid result. Keep the comparator free of required side effects.

## Common mistakes

- Expecting default **sort** to compare numbers numerically.
- Assuming **sort** returns a new array.
- Assuming **toSorted** changes the original.
- Returning a boolean from a comparator.
- Assuming **localeCompare** returns exactly **-1** or **1**.
- Using subtraction for values that may not be numbers.
- Forgetting to define where missing values or **NaN** should go.
- Comparing object values without selecting the properties that determine order.
- Writing an inconsistent comparator that can produce unpredictable results.
- Mutating values or doing required work inside the comparator.
- Sorting human names or filenames with default code-unit order when locale-aware or numeric-aware ordering is needed.
- Forgetting that **toSorted** may not exist in older runtimes.

## Try it yourself

1. Sort a list of numbers ascending with a comparator.
2. Sort the same values descending.
3. Sort products by price, placing products without a price last.
4. Sort people by last name and then first name.
5. Compare the output of default sorting and numeric sorting for **["item2", "item10", "item1"]**.
6. Sort names with **Intl.Collator** using a chosen locale and sensitivity.
7. Check whether your comparator returns zero for equal keys.
8. Sort a copy and verify that the original order remains unchanged.
9. Include **NaN** in a numeric list and choose an explicit placement rule.
10. Explain why a comparator should not depend on side effects or call order.

## Key points

- Default **sort** orders string representations, not numeric values.
- A comparator returns a negative number, zero, or a positive number to express order.
- **sort** mutates and returns the source array.
- **toSorted** returns a sorted copy in modern runtimes.
- Stable sorting preserves the relative order of values that compare equally.
- **localeCompare** and **Intl.Collator** support locale-aware string ordering.
- Use **Intl.Collator** when many locale-aware comparisons are needed.
- Define explicit rules for missing values, **NaN**, and multiple sort keys.
- Keep comparators consistent, predictable, and free of mutations.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [49 - Mutation, copying, and immutable array updates](049-mutation-copying-and-immutable-array-updates.md) | [Open Q&A](../qnas/050-sorting-comparators-and-locale-aware-comparison.md) | [Open example](../examples/050-sorting-comparators-and-locale-aware-comparison.md) | [51 - Sparse arrays, array-like objects, and array protocols](051-sparse-arrays-array-like-objects-and-array-protocols.md) |
