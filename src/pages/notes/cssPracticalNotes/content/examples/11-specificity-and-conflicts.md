# 11 - Specificity and Resolving Conflicts: Example

## Goal

Use one complete page to see how CSS chooses between matching declarations. The examples compare selector specificity, source order, importance, and the special behavior of :where() and :is().

Copy the HTML into a file named index.html and open it in a browser. GitHub's Markdown preview also provides a copy button for the code block.

## Complete example

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CSS Specificity Examples</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 2rem;
      background: #f1f5f9;
      color: #1e293b;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    main {
      max-width: 52rem;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
    }

    h1,
    h2 {
      color: #173b68;
      line-height: 1.25;
    }

    section {
      margin-top: 1.75rem;
      padding-top: 1rem;
      border-top: 1px solid #cbd5e1;
    }

    .sample {
      margin: 0.5rem 0;
      padding: 0.75rem 1rem;
      background: #f8fafc;
      border-left: 4px solid #94a3b8;
    }

    /* The later type selector has lower specificity than the ID. */
    p {
      color: #15803d;
    }

    .status {
      color: #b45309;
    }

    #status {
      color: #1d4ed8;
    }

    /* One ID beats three classes when earlier cascade priorities tie. */
    .many-classes.featured.highlighted {
      color: #c2410c;
    }

    #id-beats-classes {
      color: #7e22ce;
    }

    /* Equal-specificity class rules are resolved by source order. */
    .source-order {
      color: #15803d;
    }

    .source-order {
      color: #7c3aed;
    }

    /* Importance is compared before specificity. */
    #important-sample {
      color: #1d4ed8;
    }

    .message {
      color: #dc2626 !important;
    }

    /* :where() and its arguments add zero specificity. */
    :where(#app) .where-sample {
      color: #1d4ed8;
    }

    .override-where {
      color: #15803d;
    }

    /* :is() uses the specificity of its most specific argument. */
    :is(.text, #is-sample) {
      color: #7e22ce;
    }

    .override-is {
      color: #c2410c;
    }

    .note {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  <main id="app">
    <h1>Specificity and resolving conflicts</h1>
    <p>Each example below changes one part of the cascade.</p>

    <section>
      <h2>1. ID, class, and type selectors</h2>
      <p id="status" class="status sample">
        This text is blue because the ID selector wins.
      </p>
    </section>

    <section>
      <h2>2. One ID compared with several classes</h2>
      <p id="id-beats-classes" class="many-classes featured highlighted sample">
        This text is purple because one ID outranks three classes.
      </p>
    </section>

    <section>
      <h2>3. Equal specificity and source order</h2>
      <p class="source-order sample">
        This text is purple because the later matching class rule wins.
      </p>
    </section>

    <section>
      <h2>4. Importance is checked before specificity</h2>
      <p id="important-sample" class="message sample">
        This text is red because the class declaration is important.
      </p>
    </section>

    <section>
      <h2>5. A low-specificity contextual default</h2>
      <p class="where-sample override-where sample">
        This text is green because the later class rule ties and wins.
      </p>
    </section>

    <section>
      <h2>6. The most specific argument in :is()</h2>
      <p id="is-sample" class="text override-is sample">
        This text is purple because the ID inside :is() gives that rule ID specificity.
      </p>
    </section>

    <aside class="note">
      <strong>Reminder:</strong> Specificity is compared after earlier cascade priorities.
      A selector must match before its specificity can matter.
    </aside>
  </main>
</body>
</html>
~~~

## Expected output

The page has a centered white panel with six numbered sections. The key text colors are:

1. **Blue** for the status paragraph. The ID selector has specificity 1-0-0, which beats the class selector at 0-1-0 and the type selector at 0-0-1.
2. **Purple** for the paragraph with three classes. Its ID selector at 1-0-0 beats the three-class selector at 0-3-0.
3. **Purple** for the source-order paragraph. Both selectors have specificity 0-1-0, so the later rule wins.
4. **Red** for the important paragraph. The class declaration marked !important wins over the normal ID declaration before specificity is compared.
5. **Green** for the :where() paragraph. The :where() selector has specificity 0-1-0 because its arguments contribute zero. The later .override-where selector also has 0-1-0, so it wins by source order.
6. **Purple** for the :is() paragraph. The most specific argument is the ID selector, so the :is() rule has specificity 1-0-0 and beats the later class rule.

The text colors demonstrate which declaration won. The pale panel backgrounds and borders are there to separate the examples.

## Why each rule wins

### The ID selector wins

For the status paragraph, all three selectors match the same element:

| Selector | Specificity |
| --- | --- |
| p | 0-0-1 |
| .status | 0-1-0 |
| #status | 1-0-0 |

The ID selector wins because A is compared before B and C. The type rule appears first, but order does not matter when specificity differs.

### One ID beats several classes

The selectors have scores of 0-3-0 and 1-0-0. Because the first component is higher for the ID selector, adding more classes cannot make the class selector outrank it.

### Source order breaks a tie

The two .source-order rules both have specificity 0-1-0. The second rule comes later, so its purple color is used.

### Importance is not specificity

The ID rule is normal, while the class rule is important. Importance is considered before selector specificity, so the class rule supplies the red color.

### :where() keeps context from adding weight

The :where(#app) portion contributes zero, including the ID inside it. The remaining .where-sample class makes the first rule 0-1-0. The later .override-where rule has the same score, so its green color wins.

### :is() uses its most specific argument

The selector :is(.text, #is-sample) has the specificity of #is-sample, which is 1-0-0. The class rule .override-is is only 0-1-0, so it loses even though it appears later.

## Try these changes

1. Remove id="status". The status paragraph becomes orange because the class rule then beats the type selector.
2. Remove id="id-beats-classes". The three-class rule makes that paragraph orange.
3. Move the first .source-order rule after the second one. The paragraph becomes green because the later equal-specificity rule changes.
4. Remove !important from .message. The normal ID rule then makes the important example blue.
5. Remove .override-where from the contextual example. The text becomes blue.
6. Replace #is-sample inside :is() with .override-is. The .override-is rule can then win by coming later with equal specificity.

## Key points

- Specificity uses an A-B-C tuple and is compared from left to right.
- Cascade origin, importance, and layer are checked before specificity.
- Source order resolves ties only after earlier priorities and specificity are equal.
- :where() and its arguments contribute zero specificity.
- :is(), :not(), and :has() use the most specific selector in their argument list.
- Developer tools show matching and crossed-out declarations, which helps identify the real cause of a conflict.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | :--- | :--- | :--- |
| [10 - The cascade and inheritance](../examples/10-cascade-and-inheritance.md) | [Lesson](../lessons/11-specificity-and-conflicts.md) | [Q&A](../qnas/11-specificity-and-conflicts.md) | [12 - Cascade layers](12-cascade-layers.md) |