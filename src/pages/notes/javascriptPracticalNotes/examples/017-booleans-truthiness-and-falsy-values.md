# 17 - Booleans, truthiness, and falsy values: example

This complete HTML page demonstrates Boolean conversion, common truthy and falsy values, conditions, logical operators, short-circuiting, and checks that are more specific than truthiness. It prints each result to the browser Console.

## Goal

After working through this example, you should be able to:

- Identify JavaScript's ordinary falsy values.
- Explain why non-empty strings, arrays, and objects are truthy.
- Convert a value to a Boolean with **Boolean()**.
- Predict what **!**, **&&**, **||**, and **??** return.
- See when short-circuiting skips an expression.
- Write checks that preserve valid values such as zero.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript booleans and truthiness practice</title>
</head>
<body>
  <main>
    <h1>Booleans, truthiness, and falsy values</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      Boolean conversions, conditions, logical operators, and input checks.
    </p>
  </main>

  <script>
    // The Boolean primitives represent true and false.
    const isPublished = true;
    const hasErrors = false;

    console.log("Boolean values:", isPublished, hasErrors);

    // Convert each ordinary falsy value to a Boolean.
    console.log("Boolean(false):", Boolean(false));
    console.log("Boolean(0):", Boolean(0));
    console.log("Boolean(-0):", Boolean(-0));
    console.log("Boolean(0n):", Boolean(0n));
    console.log('Boolean(""):', Boolean(""));
    console.log("Boolean(null):", Boolean(null));
    console.log("Boolean(undefined):", Boolean(undefined));
    console.log("Boolean(NaN):", Boolean(NaN));

    // These values may look empty or false-like, but they are truthy.
    console.log('Boolean("false"):', Boolean("false"));
    console.log('Boolean("0"):', Boolean("0"));
    console.log('Boolean(" "):', Boolean(" "));
    console.log("Boolean([]):", Boolean([]));
    console.log("Boolean({}):", Boolean({}));
    console.log("Boolean(Infinity):", Boolean(Infinity));

    // Conditions evaluate truthiness without changing the value.
    if ("false") {
      console.log('if ("false"): condition runs');
    }

    if ([]) {
      console.log("if ([]): condition runs");
    }

    // Boolean wrapper objects are truthy even when they wrap false.
    const wrappedFalse = new Boolean(false);

    console.log("Boolean wrapper object:", Boolean(wrappedFalse));
    console.log("wrapped Boolean value:", wrappedFalse.valueOf());

    // NOT returns the opposite truthiness as a Boolean.
    console.log('NOT empty string:', !"");
    console.log('NOT "ready":', !"ready");

    // OR and AND return operands, not necessarily Boolean values.
    console.log('OR keeps left operand:', "ready" || "fallback");
    console.log('OR uses fallback:', "" || "fallback");
    console.log("OR replaces zero:", 0 || 50);
    console.log("Nullish coalescing keeps zero:", 0 ?? 50);
    console.log('AND returns right operand:', "ready" && 7);
    console.log("AND returns falsy left operand:", 0 && "next");

    // Count calls to show that the right side can be skipped.
    let shortCircuitCalls = 0;

    function markCall() {
      shortCircuitCalls += 1;
      return true;
    }

    false && markCall();
    true || markCall();

    console.log("short-circuited calls:", shortCircuitCalls);

    // A type and range check is more precise than a generic truthy check.
    function isPositiveNumber(value) {
      return typeof value === "number" && value > 0;
    }

    console.log("isPositiveNumber(5):", isPositiveNumber(5));
    console.log("isPositiveNumber(0):", isPositiveNumber(0));
    console.log('isPositiveNumber("5"):', isPositiveNumber("5"));

    // Decide explicitly whether whitespace-only text counts as input.
    function hasText(value) {
      return typeof value === "string" && value.trim().length > 0;
    }

    console.log('hasText("   "):', hasText("   "));
    console.log('hasText(" JS "):', hasText(" JS "));
  </script>
</body>
</html>
~~~

## View the results

Open **index.html** in a browser, open the developer tools, and select the **Console**. The page itself does not need to display the JavaScript results.

The output is:

~~~text
Boolean values: true false
Boolean(false): false
Boolean(0): false
Boolean(-0): false
Boolean(0n): false
Boolean(""): false
Boolean(null): false
Boolean(undefined): false
Boolean(NaN): false
Boolean("false"): true
Boolean("0"): true
Boolean(" "): true
Boolean([]): true
Boolean({}): true
Boolean(Infinity): true
if ("false"): condition runs
if ([]): condition runs
Boolean wrapper object: true
wrapped Boolean value: false
NOT empty string: true
NOT "ready": false
OR keeps left operand: ready
OR uses fallback: fallback
OR replaces zero: 50
Nullish coalescing keeps zero: 0
AND returns right operand: 7
AND returns falsy left operand: 0
short-circuited calls: 0
isPositiveNumber(5): true
isPositiveNumber(0): false
isPositiveNumber("5"): false
hasText("   "): false
hasText(" JS "): true
~~~

The **Boolean values** line shows the two Boolean primitives. The next group converts each ordinary falsy value to **false**. Non-empty strings, empty arrays, empty objects, and **Infinity** convert to **true**.

The two **if** examples also run because a non-empty string and an array are truthy. The Boolean wrapper example shows why **new Boolean(false)** should be avoided: the wrapper object is truthy even though its wrapped value is false.

The NOT examples return Boolean results. The logical OR and AND examples return the operand selected by truthiness, so some results are strings or numbers rather than Booleans. The short-circuit call count remains zero because neither skipped call is evaluated.

The last two functions use explicit checks. **isPositiveNumber** checks both type and range, while **hasText** rejects text that contains only whitespace. These checks express their requirements more accurately than a generic truthy condition.

## Try a small change

1. Change **Boolean("false")** to **Boolean(false)** and compare the results.
2. Change **Boolean([])** to **Boolean([0])**. Both values are truthy.
3. Change **0 || 50** to **false || 50**, then to **"" || 50**. Each falsy left operand selects the fallback.
4. Change **0 ?? 50** to **null ?? 50**. Nullish coalescing now selects the fallback.
5. Set **isPublished** to **false** and inspect the first output line.
6. Add a call to **markCall()** by itself. The call count should increase.
7. Change the right side of **false && markCall()** to **true && markCall()**. The call should run.
8. Try **hasText("JavaScript")**, **hasText("")**, and **hasText("   ")**.
9. Give **isPositiveNumber** the values **-1**, **NaN**, and **Infinity**. Decide whether the function's name and rule match what it accepts.
10. Remove **Boolean()** from a condition and predict whether the branch changes. Conditions evaluate truthiness directly.

## Key ideas shown

- **Boolean()** converts a value without changing the original.
- The ordinary falsy values are **false**, **0**, **-0**, **0n**, **""**, **null**, **undefined**, and **NaN**.
- Non-empty strings, arrays, and objects are truthy, including **"false"**, **"0"**, **[]**, and **{}**.
- Boolean wrapper objects are truthy, so prefer primitive Boolean values.
- **!** returns the opposite truthiness as a Boolean.
- **&&** and **||** short-circuit and return operand values.
- **||** replaces every falsy value, while **??** replaces only **null** and **undefined**.
- Explicit checks make validation rules clear and preserve meaningful values such as zero.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [16 - undefined, null, and NaN](../lessons/016-undefined-null-and-nan.md) | [Open lesson](../lessons/017-booleans-truthiness-and-falsy-values.md) | [Open Q&A](../qnas/017-booleans-truthiness-and-falsy-values.md) | [18 - typeof, instanceof, and reliable type checks](../lessons/018-typeof-instanceof-and-reliable-type-checks.md) |
