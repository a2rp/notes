# 50 - Sorting, comparators, and locale-aware comparison: Q&A

This Q&A reviews default sorting, comparator functions, numeric ordering, locale-aware string comparison, stable sorting, and how to preserve the original array.

## Multiple-choice questions

### 1. How does **sort()** order values when no comparator is provided?

A. By numeric value  
B. By converting values to strings and comparing their UTF-16 code units  
C. By insertion time only  
D. By locale-aware alphabetical order

**Answer: B. By converting values to strings and comparing their UTF-16 code units.**

**Explanation:** Default sorting is string-based. It does not infer that numbers should be compared numerically.

### 2. Which comparator sorts ordinary finite numbers in ascending order?

A. **(a, b) => a + b**  
B. **(a, b) => a - b**  
C. **(a, b) => a === b**  
D. **(a, b) => a / b**

**Answer: B. (a, b) => a - b**

**Explanation:** When **a** is less than **b**, **a - b** is negative, so **a** comes first. This form is suitable for ordinary finite numbers.

### 3. What does a comparator's negative result mean?

A. Treat the values as equal.  
B. Put the first argument before the second.  
C. Put the second argument before the first.  
D. Remove the first value.

**Answer: B. Put the first argument before the second.**

**Explanation:** A negative result means **a** should appear before **b**. A positive result means it should appear after **b**. Zero means the comparator considers them equal for this ordering.

### 4. Does a comparator have to return exactly -1 or 1?

A. Yes, only those values are accepted.  
B. No, only the negative, zero, or positive sign matters.  
C. It must return a boolean.  
D. It must return the index.

**Answer: B. No, only the negative, zero, or positive sign matters.**

**Explanation:** Any negative number, zero, or positive number can express the ordering. **localeCompare** also returns a sign, but its exact nonzero value should not be assumed.

### 5. Which method reorders and returns the same array object?

A. **toSorted**  
B. **slice**  
C. **sort**  
D. **filter**

**Answer: C. sort**

**Explanation:** **sort** mutates the array it is called on and returns that same array.

### 6. Which method returns a sorted copy?

A. **sort**  
B. **toSorted**  
C. **reverse**  
D. **splice**

**Answer: B. toSorted**

**Explanation:** **toSorted** preserves the original and returns a new array in sorted order.

### 7. What should a comparator return when the two values are equal for the chosen ordering?

A. A positive number  
B. A negative number  
C. Zero  
D. **undefined**

**Answer: C. Zero**

**Explanation:** Returning zero indicates that the comparator considers those values equal in the sort order.

### 8. Which method is best suited for locale-aware string comparisons?

A. **parseInt**  
B. **localeCompare**  
C. **indexOf**  
D. **toString**

**Answer: B. localeCompare**

**Explanation:** **localeCompare** compares strings according to locale rules and optional comparison settings.

### 9. What does **numeric: true** do in an **Intl.Collator**?

A. Converts every string into a number.  
B. Compares digit sequences by numeric value.  
C. Removes all digits.  
D. Forces descending order.

**Answer: B. Compares digit sequences by numeric value.**

**Explanation:** It gives natural-looking ordering for strings such as **file2** and **file10**.

### 10. What does a stable sort guarantee when two values compare as equal?

A. Their original relative order is preserved.  
B. They are removed.  
C. They always move to the end.  
D. The comparator is called exactly once for each value.

**Answer: A. Their original relative order is preserved.**

**Explanation:** Stable sorting preserves the order of equal items as they appeared in the input.

### 11. Which comparator correctly sorts numeric prices from low to high?

A. **(a, b) => a.price > b.price**  
B. **(a, b) => a.price - b.price**  
C. **(a, b) => a.price + b.price**  
D. **(a, b) => a.name**

**Answer: B. (a, b) => a.price - b.price**

**Explanation:** Subtraction returns a negative, zero, or positive numeric result according to the two prices, assuming ordinary finite numbers.

### 12. Why is returning **a > b** a poor comparator?

A. It returns a boolean that converts only to 0 or 1, so it never returns a negative result.  
B. Comparators cannot use relational operators.  
C. It always mutates the array.  
D. It returns a string.

**Answer: A. It returns a boolean that converts only to 0 or 1, so it never returns a negative result.**

**Explanation:** A comparator needs to express both directions and equality. Use numeric comparison logic instead.

### 13. Which option can be used to sort a copy in a runtime without **toSorted**?

A. **[...values].sort(comparator)**  
B. **values.splice(comparator)**  
C. **values.fill(comparator)**  
D. **values.push(comparator)**

**Answer: A. [...values].sort(comparator)**

**Explanation:** Spread creates a new outer array, and **sort** mutates that copy rather than the source.

### 14. What does **sensitivity: "base"** generally do in locale-aware comparison?

A. Makes case and accent differences important.  
B. Ignores case and accent differences for comparison.  
C. Sorts digits descending.  
D. Ignores every character.

**Answer: B. Ignores case and accent differences for comparison.**

**Explanation:** At base sensitivity, strings differing only by case or accents compare as equivalent. Locale behavior should be chosen for the intended language and data.

## True or false

### 15. Default **sort()** compares numeric values numerically.

**Answer: False.**

**Explanation:** Without a comparator, values are converted to strings and compared by UTF-16 code units.

### 16. Default sorting can place the number 100 before the number 20.

**Answer: True.**

**Explanation:** The strings **"100"** and **"20"** are compared character by character, so the default result is not numeric order.

### 17. **sort()** changes the source array.

**Answer: True.**

**Explanation:** It mutates the array in place and returns the same array object.

### 18. **toSorted()** changes the source array.

**Answer: False.**

**Explanation:** It returns a sorted copy and leaves the source in its original order.

### 19. A comparator must always return exactly -1, 0, or 1.

**Answer: False.**

**Explanation:** Any negative, zero, or positive result is enough. The sign is what communicates the ordering.

### 20. **localeCompare** always returns exactly -1 or 1 when strings differ.

**Answer: False.**

**Explanation:** It returns a negative or positive value, but the exact value is not guaranteed to be -1 or 1.

### 21. JavaScript array sorting is stable in modern JavaScript.

**Answer: True.**

**Explanation:** When a comparator returns zero for two values, stable sorting preserves their relative input order.

### 22. A sorting comparator should mutate the array to help the sort finish sooner.

**Answer: False.**

**Explanation:** Mutating the array or compared data inside a comparator makes the ordering inconsistent and difficult to reason about.

### 23. **Intl.Collator** can be reused for many comparisons.

**Answer: True.**

**Explanation:** Create a collator once, then pass its **compare** function to sorting or use it for repeated comparisons.

### 24. **numeric: true** makes the entire string comparison purely numeric.

**Answer: False.**

**Explanation:** It affects digit sequences in the string. Other text is still compared according to locale and the collator options.

## Predict the result

### 25. What does this print?

~~~js
const values = [3, 20, 100, 4];

console.log(values.toSorted());
~~~

**Answer:**

~~~text
[ 100, 20, 3, 4 ]
~~~

**Explanation:** No comparator is provided, so the values are sorted by their string representations.

### 26. What does this print?

~~~js
const values = [3, 20, 100, 4];

console.log(values.toSorted(function (a, b) {
    return a - b;
}));
~~~

**Answer:**

~~~text
[ 3, 4, 20, 100 ]
~~~

**Explanation:** The comparator uses numeric subtraction to order the values from smallest to largest.

### 27. What does this print?

~~~js
const values = [3, 20, 100, 4];

console.log(values.toSorted(function (a, b) {
    return b - a;
}));
~~~

**Answer:**

~~~text
[ 100, 20, 4, 3 ]
~~~

**Explanation:** Reversing the operands creates descending numeric order.

### 28. What does this print?

~~~js
const values = [30, 10, 20];
const returned = values.sort(function (a, b) {
    return a - b;
});

console.log(values);
console.log(returned === values);
~~~

**Answer:**

~~~text
[ 10, 20, 30 ]
true
~~~

**Explanation:** **sort** mutates the source and returns that same array object.

### 29. What does this print?

~~~js
const values = [30, 10, 20];
const returned = values.toSorted(function (a, b) {
    return a - b;
});

console.log(values);
console.log(returned);
console.log(returned === values);
~~~

**Answer:**

~~~text
[ 30, 10, 20 ]
[ 10, 20, 30 ]
false
~~~

**Explanation:** **toSorted** returns a new array and preserves the original order.

### 30. What does this print?

~~~js
const people = [
    { name: "Mina", age: 28 },
    { name: "Asha", age: 21 },
    { name: "Dev", age: 24 }
];

const byAge = people.toSorted(function (a, b) {
    return a.age - b.age;
});

console.log(byAge.map(function (person) {
    return person.name;
}));
~~~

**Answer:**

~~~text
[ 'Asha', 'Dev', 'Mina' ]
~~~

**Explanation:** The comparator orders people by their numeric **age** property. The mapped output makes the resulting order easy to see.

### 31. What does this print?

~~~js
const items = ["page10", "page2", "page1"];

const collator = new Intl.Collator("en", { numeric: true });

console.log(items.toSorted(collator.compare));
~~~

**Answer:**

~~~text
[ 'page1', 'page2', 'page10' ]
~~~

**Explanation:** The collator compares digit sequences numerically, producing natural-looking order.

### 32. What does this print?

~~~js
const entries = [
    { group: "b", label: "first b" },
    { group: "a", label: "only a" },
    { group: "b", label: "second b" }
];

const result = entries.toSorted(function (a, b) {
    return a.group.localeCompare(b.group);
});

console.log(result.map(function (entry) {
    return entry.label;
}));
~~~

**Answer:**

~~~text
[ 'only a', 'first b', 'second b' ]
~~~

**Explanation:** Sorting by **group** puts **a** first. The two **b** values compare equally, so stable sorting preserves their relative input order.

### 33. What does this print?

~~~js
const names = ["Zara", "Asha", "Mina"];

const result = names.toSorted(function (a, b) {
    return b.localeCompare(a, "en");
});

console.log(result);
~~~

**Answer:**

~~~text
[ 'Zara', 'Mina', 'Asha' ]
~~~

**Explanation:** The arguments are reversed, so the locale-aware string order is descending.

### 34. What does this print?

~~~js
const measurements = [8, NaN, 3, 5];

const result = measurements.toSorted(function (a, b) {
    const aIsNaN = Number.isNaN(a);
    const bIsNaN = Number.isNaN(b);

    if (aIsNaN && bIsNaN) return 0;
    if (aIsNaN) return 1;
    if (bIsNaN) return -1;
    return a - b;
});

console.log(result);
~~~

**Answer:**

~~~text
[ 3, 5, 8, NaN ]
~~~

**Explanation:** The comparator explicitly puts **NaN** last and compares the other numeric values in ascending order.

### 35. What does this print?

~~~js
const values = [5, 1, 3];

const result = values.toSorted(function (a, b) {
    return a > b;
});

console.log(result);
~~~

**Answer:** The exact result should not be relied on as a correct numeric ordering.

**Explanation:** The callback returns a boolean, which becomes 0 or 1. It never returns a negative result to say that **a** belongs before **b**. Use **a - b** or explicit comparisons.

## Short-answer questions

### 36. What does a comparator communicate?

**Answer:** It communicates whether the first argument should come before, after, or be considered equal to the second.

**Explanation:** A negative result means before, a positive result means after, and zero means equal for that ordering.

### 37. Why is a comparator expected to be consistent?

**Answer:** The comparison between two values should not contradict itself or depend on hidden changing state.

**Explanation:** Sorting can compare the same values multiple times and in different pairings. An inconsistent comparator can produce an unexpected order.

### 38. Why should a comparator avoid side effects?

**Answer:** The sort operation may call it many times in an implementation-dependent order.

**Explanation:** A comparator should calculate an ordering, not perform required application work or mutate the values being sorted.

### 39. How do you sort objects by a property?

**Answer:** Compare that property in a comparator.

**Explanation:** For numeric properties, subtract the values when they are ordinary numbers. For text, compare with **localeCompare** or a chosen **Intl.Collator**.

### 40. How do you sort by two properties?

**Answer:** Compare the primary property first, then compare the secondary property when the first comparison returns zero.

**Explanation:** This produces an explicit tie-breaking rule. For example, sort by last name and then first name.

### 41. What does stable sorting preserve?

**Answer:** The original relative order of items that compare equally.

**Explanation:** If two records compare as equal by a selected key, a stable sort keeps their input order.

### 42. When is **Intl.Collator** useful?

**Answer:** When many locale-aware string comparisons are needed, such as sorting a list of names or filenames.

**Explanation:** Reusing one collator avoids creating comparison settings repeatedly and makes the chosen locale and options explicit.

### 43. What does **sensitivity: "accent"** generally mean?

**Answer:** Accents matter, while case differences do not.

**Explanation:** Collator sensitivity controls which character differences affect ordering. The actual ordering still follows the chosen locale.

### 44. Why should code not assume **localeCompare** returns exactly -1 or 1?

**Answer:** The method guarantees the sign of the result, not those specific integers.

**Explanation:** Check for less than zero, greater than zero, or equal to zero, or return the result directly from a comparator.

### 45. Why should a program define how **NaN** sorts?

**Answer:** Arithmetic comparison can produce **NaN**, which does not express a clear ordering.

**Explanation:** Decide whether invalid values should be rejected, placed first, or placed last, then encode that policy in the comparator.

## Practical and coding questions

### 46. Write an ascending comparator for ordinary finite numbers.

**Answer:**

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

**Explanation:** The branches return a negative value, positive value, or zero according to the numeric relationship.

### 47. Sort products by price from low to high without changing the source array.

**Answer:**

~~~js
const products = [
    { name: "Notebook", price: 8 },
    { name: "Marker", price: 3 },
    { name: "Folder", price: 5 }
];

const sortedProducts = products.toSorted(function (a, b) {
    return a.price - b.price;
});

console.log(products.map(function (product) {
    return product.name;
}));

console.log(sortedProducts.map(function (product) {
    return product.name;
}));
~~~

Output:

~~~text
[ 'Notebook', 'Marker', 'Folder' ]
[ 'Marker', 'Folder', 'Notebook' ]
~~~

**Explanation:** **toSorted** creates a new outer array. The objects themselves are not cloned.

### 48. Sort people by last name and then first name.

**Answer:**

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

**Explanation:** The first comparison handles last name. First name is used only to break a last-name tie.

### 49. Put records without a score after records with a score.

**Answer:**

~~~js
const records = [
    { name: "Mina", score: 82 },
    { name: "Unknown" },
    { name: "Asha", score: 91 }
];

const sortedRecords = records.toSorted(function (a, b) {
    const aMissing = a.score === undefined;
    const bMissing = b.score === undefined;

    if (aMissing && bMissing) return 0;
    if (aMissing) return 1;
    if (bMissing) return -1;

    return a.score - b.score;
});

console.log(sortedRecords.map(function (record) {
    return record.name;
}));
~~~

Output:

~~~text
[ 'Mina', 'Asha', 'Unknown' ]
~~~

**Explanation:** The comparator defines missing-value placement, then sorts records with scores numerically.

### 50. Sort strings with one reusable collator.

**Answer:**

~~~js
const labels = ["Chapter 10", "Chapter 2", "Chapter 1"];

const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
});

const sortedLabels = labels.toSorted(collator.compare);

console.log(sortedLabels);
~~~

Output:

~~~text
[ 'Chapter 1', 'Chapter 2', 'Chapter 10' ]
~~~

**Explanation:** Numeric comparison makes digit sequences sort by their numeric value. The same collator can be reused for other comparisons with the same locale and options.

### 51. Sort a copy in an older runtime without **toSorted**.

**Answer:**

~~~js
const values = [14, 3, 9];

const sortedValues = [...values].sort(function (a, b) {
    return a - b;
});

console.log(values);
console.log(sortedValues);
~~~

Output:

~~~text
[ 14, 3, 9 ]
[ 3, 9, 14 ]
~~~

**Explanation:** Spread makes a shallow copy first. Mutating **sort** then affects the copy, not the original.

## Review checklist

- Default **sort** is string-based.
- Use a comparator for numeric or property-based ordering.
- Return negative, zero, or positive values from a comparator.
- **sort** mutates; **toSorted** returns a copy.
- Stable sorting keeps equal items in their original relative order.
- Use **localeCompare** or **Intl.Collator** for human language text.
- Set **numeric: true** for natural ordering of digit sequences in strings.
- Define rules for missing data and **NaN**.
- Keep comparators consistent and free of side effects.
- Verify runtime support for **toSorted** and **Intl** features you use.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [49 - Mutation, copying, and immutable array updates](049-mutation-copying-and-immutable-array-updates.md) | [Open lesson](../lessons/050-sorting-comparators-and-locale-aware-comparison.md) | [Open example](../examples/050-sorting-comparators-and-locale-aware-comparison.md) | [51 - Sparse arrays, array-like objects, and array protocols](../lessons/051-sparse-arrays-array-like-objects-and-array-protocols.md) |
