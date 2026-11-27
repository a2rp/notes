# 06 - ECMAScript editions, proposals, and compatibility: example

This example is a small compatibility checker. It detects selected built-in methods, displays whether they are available in the current browser, and uses a fallback to get the last item from an array.

The page itself uses older, widely understood JavaScript syntax so the checks can run in environments that may not have every method being checked.

## Goal

You will learn how to:

- Check whether a built-in method exists.
- Show a different message depending on support.
- Use a fallback when a method is unavailable.
- Understand why a runtime check cannot protect unsupported syntax from a parser error.
- Distinguish JavaScript syntax from built-ins and browser APIs.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the full page below into it and save the file.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript compatibility practice</title>
  <style>
    body {
      max-width: 48rem;
      margin: 3rem auto;
      padding: 0 1rem;
      font-family: system-ui, sans-serif;
      line-height: 1.6;
    }

    li {
      margin-block: 0.5rem;
    }

    .supported {
      color: #176b35;
    }

    .not-supported {
      color: #9a3412;
    }

    code {
      padding: 0.1rem 0.3rem;
      background: #eee;
      color: #111;
    }
  </style>
</head>
<body>
  <main>
    <h1>JavaScript compatibility practice</h1>
    <p>
      This page checks selected JavaScript methods in the current browser.
      Results can differ between browsers and versions.
    </p>

    <h2>Detected capabilities</h2>
    <ul id="feature-list">
      <li>Checking features...</li>
    </ul>

    <h2>Fallback result</h2>
    <p id="fallback-result">The example result will appear here.</p>

    <h2>What the checks do not prove</h2>
    <p>
      These checks test whether selected methods are present. They do not prove
      that every call will succeed, and they do not detect whether the browser
      can parse every newer JavaScript syntax feature.
    </p>
  </main>

  <script>
    function getLastItem(items) {
      if (typeof items.at === "function") {
        return items.at(-1);
      }

      return items[items.length - 1];
    }

    var features = [
      {
        name: "Array.prototype.at()",
        supported: typeof Array.prototype.at === "function"
      },
      {
        name: "Object.hasOwn()",
        supported: typeof Object.hasOwn === "function"
      },
      {
        name: "Promise.allSettled()",
        supported: typeof Promise.allSettled === "function"
      },
      {
        name: "navigator.clipboard.writeText()",
        supported: typeof navigator.clipboard !== "undefined" &&
          typeof navigator.clipboard.writeText === "function"
      }
    ];

    var featureList = document.getElementById("feature-list");

    features.forEach(function (feature) {
      var item = document.createElement("li");
      var result = feature.supported ? "Available" : "Not detected";

      item.textContent = feature.name + ": " + result;
      item.className = feature.supported ? "supported" : "not-supported";
      featureList.appendChild(item);
    });

    var sampleItems = ["red", "green", "blue"];
    var lastItem = getLastItem(sampleItems);
    var fallbackResult = document.getElementById("fallback-result");

    fallbackResult.textContent =
      "The last item in the sample list is " + lastItem + ".";

    console.info("Compatibility practice page loaded.");
    console.log("Detected capabilities:", features);
    console.log("Last sample item:", lastItem);
  </script>
</body>
</html>
~~~

## Run and inspect the example

1. Save **index.html**.
2. Open it in a browser.
3. Read the detected capabilities list.
4. Open the browser developer tools and select the Console.
5. Read the info and log messages.
6. Try the same page in another browser or runtime version if available.

The capability list can vary. A result of **Available** means the tested property is present as a function in this environment. **Not detected** means the check did not find that function. It does not automatically mean the whole page is unusable.

The clipboard check only confirms that the method exists. Clipboard use may also depend on the browser's security context, permissions, and user interaction. This example intentionally detects the method without trying to write to the clipboard.

## How the fallback works

The sample list contains three values:

~~~js
var sampleItems = ["red", "green", "blue"];
~~~

The function first checks whether the array has an **at** method:

~~~js
if (typeof items.at === "function") {
  return items.at(-1);
}
~~~

If it does, the method returns the last value for the negative index **-1**. If it does not, the function uses the final numeric array index:

~~~js
return items[items.length - 1];
~~~

Both paths return **"blue"** for the sample list. The fallback preserves the needed behavior when the method is unavailable.

## Inspect the code in the Console

With the page open, enter these expressions in the browser Console:

~~~js
typeof Array.prototype.at
~~~

The result is **"function"** when the method is available and **"undefined"** otherwise.

Check another method:

~~~js
typeof Object.hasOwn
~~~

The result can vary by runtime version. The expression checks for a built-in method, not for a browser brand.

Call the fallback function with another list:

~~~js
getLastItem(["first", "middle", "last"])
~~~

The result is **"last"** whether the function uses **at** or the indexing fallback.

## Syntax support is different

This page deliberately avoids syntax such as optional chaining and nullish coalescing. A runtime feature check cannot protect newer syntax if the engine cannot parse the script containing the check.

For example, an older engine might fail to parse this expression:

~~~js
var city = user && user.address && user.address.city;
~~~

If you replace it with optional chaining in a script that the engine does not understand, the engine can report a syntax error before any runtime condition executes. For older syntax targets, use a build step that transforms newer syntax, or write syntax supported by the oldest target.

The compatibility checks in this example test method availability. They do not test parser support for new syntax.

## Try a controlled fallback check

The current browser may support **Array.prototype.at**, so the function may use that branch. To understand the fallback without modifying browser globals, make a second function that uses only indexing:

~~~js
function getLastItemWithIndexing(items) {
  return items[items.length - 1];
}

getLastItemWithIndexing(["red", "green", "blue"])
~~~

It returns **"blue"**. Comparing the two functions shows what behavior the fallback is intended to preserve.

Do not remove built-in methods from browser prototypes to simulate an old browser. Changing shared built-ins can affect unrelated code on the page and make debugging confusing.

## Expected results

| Part | Expected result |
| --- | --- |
| Feature list | Each item reports **Available** or **Not detected**, depending on the current environment |
| Fallback paragraph | The last sample item is **blue** |
| Console info | A message confirms that the page loaded |
| Console log | The feature objects and last sample item are displayed |
| Console expression **typeof Array.prototype.at** | **"function"** if present, otherwise **"undefined"** |
| Console expression **getLastItem(["first", "middle", "last"])** | **"last"** |

## What this example does not test

- It does not establish support in every browser or runtime version.
- It does not guarantee that a detected API operation will succeed.
- It does not test whether a JavaScript parser understands newer syntax.
- It does not replace a project decision about supported environments.
- It does not provide a polyfill for unavailable features.

Use the results as a small demonstration of runtime feature detection. For a real project, define the target environments, check current compatibility information for the features you need, and test the finished application in representative environments.

## Key ideas shown

- Feature detection checks for a capability instead of guessing the browser brand.
- Built-in method support can be checked before calling that method.
- A fallback can preserve behavior when a method is unavailable.
- A method check does not prove that every operation will succeed.
- Syntax must be parsed before runtime checks execute.
- Transpilation and polyfills address different compatibility needs.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [05 - Browser console and developer tools](../lessons/005-browser-console-and-developer-tools.md) | [Open lesson](../lessons/006-ecmascript-editions-proposals-and-compatibility.md) | [Open Q&A](../qnas/006-ecmascript-editions-proposals-and-compatibility.md) | [07 - Source syntax, statements, expressions, comments, and automatic semicolon insertion](../lessons/007-source-syntax-statements-expressions-comments-and-automatic-semicolon-insertion.md) |
