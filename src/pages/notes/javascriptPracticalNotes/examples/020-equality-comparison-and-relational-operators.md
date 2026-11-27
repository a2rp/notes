# 20 - Equality, comparison, and relational operators: example

This complete HTML page demonstrates strict and loose equality, object identity, relational comparisons, string ordering, **NaN**, BigInt comparisons, and range checks. It writes each result to the browser Console.

## Question

What changes when JavaScript compares the same values using strict equality, loose equality, and relational operators?

## Goal

After working through this example, you should be able to:

- Compare values with **===**, **!==**, **==**, and **!=**.
- Explain why two separate objects are not equal by identity.
- Recognize the special equality behavior of **NaN** and signed zero.
- Distinguish string ordering from numeric comparison.
- Use relational comparisons with Numbers and BigInts.
- Write a correct inclusive range check.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript equality and comparison practice</title>
</head>
<body>
  <main>
    <h1>Equality, comparison, and relational operators</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      strict equality, coercion, object identity, and ordering comparisons.
    </p>
  </main>

  <script>
    // Strict equality compares without converting the operand types.
    console.log("7 === 7:", 7 === 7);
    console.log('7 === "7":', 7 === "7");
    console.log("false === 0:", false === 0);

    // Strict equality compares object identity, not object contents.
    const firstUser = { name: "Ada" };
    const anotherUser = { name: "Ada" };
    const sameUser = firstUser;

    console.log("firstUser === anotherUser:", firstUser === anotherUser);
    console.log("firstUser === sameUser:", firstUser === sameUser);

    // NaN and signed zero have special equality behavior.
    console.log("NaN === NaN:", NaN === NaN);
    console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN));
    console.log("+0 === -0:", +0 === -0);
    console.log("Object.is(+0, -0):", Object.is(+0, -0));

    // Loose equality applies its defined coercion rules.
    console.log('5 == "5":', 5 == "5");
    console.log("0 == false:", 0 == false);
    console.log('"" == 0:', "" == 0);
    console.log('"0" == false:', "0" == false);
    console.log("null == undefined:", null == undefined);
    console.log("null == 0:", null == 0);
    console.log("[] == 0:", [] == 0);
    console.log("[5] == 5:", [5] == 5);

    // BigInt and Number can compare loosely by numeric value.
    console.log("1n == 1:", 1n == 1);
    console.log("1n === 1:", 1n === 1);

    // Two strings are compared lexicographically.
    console.log('"20" < "3":', "20" < "3");
    console.log('"10" < "2":', "10" < "2");

    // A mixed string and Number comparison is numeric.
    console.log('"20" < 3:', "20" < 3);
    console.log('3 < "10":', 3 < "10");

    // Relational comparisons involving NaN are all false.
    console.log("NaN < 5:", NaN < 5);
    console.log("NaN >= 5:", NaN >= 5);

    // Relational operators can compare a BigInt and a Number.
    console.log("1n < 2:", 1n < 2);
    console.log("2n < 2:", 2n < 2);

    // Use two comparisons to test an inclusive range.
    const score = 72;
    const isPassingScore = score >= 50 && score <= 100;

    console.log("score is between 50 and 100:", isPassingScore);

    // Relational operators do not chain like math notation.
    console.log("3 < 2 < 1:", 3 < 2 < 1);
    console.log("3 < 2 && 2 < 1:", 3 < 2 && 2 < 1);
  </script>
</body>
</html>
~~~

## Expected Console output

~~~text
7 === 7: true
7 === "7": false
false === 0: false
firstUser === anotherUser: false
firstUser === sameUser: true
NaN === NaN: false
Object.is(NaN, NaN): true
+0 === -0: true
Object.is(+0, -0): false
5 == "5": true
0 == false: true
"" == 0: true
"0" == false: true
null == undefined: true
null == 0: false
[] == 0: true
[5] == 5: true
1n == 1: true
1n === 1: false
"20" < "3": true
"10" < "2": true
"20" < 3: false
3 < "10": true
NaN < 5: false
NaN >= 5: false
1n < 2: true
2n < 2: false
score is between 50 and 100: true
3 < 2 < 1: true
3 < 2 && 2 < 1: false
~~~

## Explanation

- **7 === "7"** is false because strict equality does not convert the string to a Number.
- **firstUser === anotherUser** is false because each object literal creates a distinct object. **sameUser** refers to the same object as **firstUser**.
- **NaN === NaN** is false, while **Object.is(NaN, NaN)** is true. Strict equality considers **+0** and **-0** equal, while **Object.is()** distinguishes them.
- Loose equality converts operands only according to its specified rules. That is why examples such as **0 == false**, **"" == 0**, and **[] == 0** are true. Prefer strict equality unless the loose conversion is intentional.
- **null == undefined** is true under a special rule. **null == 0** is false.
- **"20" < "3"** compares two strings lexicographically. **"20" < 3** uses numeric comparison, so the string becomes Number **20**.
- Every relational comparison involving **NaN** is false.
- A BigInt and a Number can be compared relationally, but mixing them in arithmetic without an explicit conversion throws a TypeError.
- **score >= 50 && score <= 100** performs two comparisons. In contrast, **3 < 2 < 1** first produces a Boolean, then compares that Boolean with **1**.

## Try it yourself

1. Change **score** to **49**, **50**, **100**, and **101**. Observe which values pass the inclusive range check.
2. Change the object properties so both objects match exactly. Explain why strict equality remains false.
3. Change **"20" < 3** to **"20" < "3"** and explain why the result changes.
4. Replace **==** with **===** in the loose equality examples and predict each result before running the page.
5. Add a check with **Number.isNaN()** and explain why it is clearer than comparing with **NaN**.
6. Change **3 < 2 < 1** to **1 < 2 < 3**. Explain why both expressions can evaluate to true for different reasons.

## Key ideas shown

- **===** and **!==** do not coerce operand types.
- Objects are compared by identity.
- **==** applies specific coercion rules, so use it only intentionally.
- **NaN** is unequal to itself, and relational comparisons involving it are false.
- Two strings are ordered lexicographically, while mixed string and Number comparisons are numeric.
- Use **left >= minimum && left <= maximum** for an inclusive range.
- Relational comparisons can compare a BigInt and Number, though mixed arithmetic cannot.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [19 - Type conversion and coercion](../lessons/019-type-conversion-and-coercion.md) | [Open lesson](../lessons/020-equality-comparison-and-relational-operators.md) | [Open Q&A](../qnas/020-equality-comparison-and-relational-operators.md) | [21 - Numbers, floating point, and safe integers](../lessons/021-numbers-floating-point-and-safe-integers.md) |