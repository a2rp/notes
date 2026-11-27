# 15 - Primitive values and object references: example

This complete HTML page compares primitive values and object references. It demonstrates assignment, mutation, function parameters, object identity, and shallow copies in the browser Console.

## Goal

You will observe:

- Reassigning a primitive binding does not change another binding that received its value.
- Two object bindings can refer to one shared object.
- Reassigning an object binding does not redirect another binding.
- A function can mutate a shared object, while reassigning its parameter only changes the local parameter.
- Strict equality checks object identity.
- Object and array spread create shallow copies.
- Nested objects remain shared after a shallow copy.
- Primitive strings differ from String wrapper objects.

## Create the practice page

Create a file named **index.html** in a practice folder. Copy the complete code below into the file and save it.

~~~html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JavaScript primitives and object references</title>
</head>
<body>
  <main>
    <h1>Primitive values and object references</h1>
    <p>
      Open the browser developer tools and select the Console to inspect
      how assignments and mutations affect primitive values and objects.
    </p>
  </main>

  <script>
    // Primitive assignments copy the current value.
    let firstScore = 7;
    let secondScore = firstScore;
    firstScore = 9;

    console.log("primitive first binding:", firstScore);
    console.log("primitive second binding:", secondScore);

    // String methods return a new string instead of changing the original.
    const originalText = "javascript";
    const upperText = originalText.toUpperCase();

    console.log("original string:", originalText);
    console.log("new uppercase string:", upperText);

    // Both bindings refer to the same object.
    const firstProfile = {
      name: "Asha"
    };

    const secondProfile = firstProfile;
    secondProfile.name = "Mina";

    console.log("name through first reference:", firstProfile.name);
    console.log("name through second reference:", secondProfile.name);

    // Reassigning one binding does not redirect the other binding.
    let currentProfile = {
      name: "Asha"
    };

    const savedProfile = currentProfile;
    currentProfile = {
      name: "Mina"
    };

    console.log("current profile after reassignment:", currentProfile.name);
    console.log("saved profile after reassignment:", savedProfile.name);

    // Mutating an object parameter changes the shared object.
    function changeName(profile) {
      profile.name = "Changed by mutation";
    }

    // Reassigning the parameter changes only the local parameter binding.
    function replaceParameter(profile) {
      profile = {
        name: "Local replacement"
      };

      console.log("parameter after local reassignment:", profile.name);
    }

    const user = {
      name: "Asha"
    };

    changeName(user);
    console.log("caller after object mutation:", user.name);

    replaceParameter(user);
    console.log("caller after parameter reassignment:", user.name);

    // Strict equality checks whether object references identify the same object.
    const firstLevel = {
      value: 1
    };

    const matchingLevel = {
      value: 1
    };

    const anotherNameForFirst = firstLevel;

    console.log(
      "separate matching objects are identical:",
      firstLevel === matchingLevel
    );
    console.log(
      "shared object references are identical:",
      firstLevel === anotherNameForFirst
    );

    // Object spread creates a new outer object but keeps nested references.
    const originalSettings = {
      name: "Asha",
      preferences: {
        theme: "light"
      }
    };

    const copiedSettings = {
      ...originalSettings
    };

    copiedSettings.name = "Mina";
    copiedSettings.preferences.theme = "dark";

    console.log("original top-level name:", originalSettings.name);
    console.log("copied top-level name:", copiedSettings.name);
    console.log("original nested theme:", originalSettings.preferences.theme);
    console.log("copied nested theme:", copiedSettings.preferences.theme);
    console.log(
      "outer objects are identical:",
      originalSettings === copiedSettings
    );
    console.log(
      "nested objects are identical:",
      originalSettings.preferences === copiedSettings.preferences
    );

    // Array spread makes a new array. Its nested objects are still shared.
    const originalColors = ["blue", "green"];
    const copiedColors = [...originalColors];
    copiedColors[0] = "red";

    console.log("original first color:", originalColors[0]);
    console.log("copied first color:", copiedColors[0]);
    console.log("color arrays are identical:", originalColors === copiedColors);

    const originalMembers = [
      {
        role: "admin"
      }
    ];

    const copiedMembers = [...originalMembers];
    copiedMembers[0].role = "editor";

    console.log("original nested member role:", originalMembers[0].role);
    console.log("copied nested member role:", copiedMembers[0].role);
    console.log(
      "nested member objects are identical:",
      originalMembers[0] === copiedMembers[0]
    );

    // A primitive string is not the same type or identity as a String object.
    const primitiveText = "hello";
    const wrapperText = new String("hello");

    console.log("primitive string type:", typeof primitiveText);
    console.log("String wrapper type:", typeof wrapperText);
    console.log("primitive and wrapper are strictly equal:", primitiveText === wrapperText);
  </script>
</body>
</html>
~~~

## Open the Console

1. Open **index.html** in a browser.
2. Open Developer Tools. In most desktop browsers, **F12** opens them.
3. Select the **Console** tab.
4. Compare the logs with the expected output below.

## Expected Console output

~~~text
primitive first binding: 9
primitive second binding: 7
original string: javascript
new uppercase string: JAVASCRIPT
name through first reference: Mina
name through second reference: Mina
current profile after reassignment: Mina
saved profile after reassignment: Asha
caller after object mutation: Changed by mutation
parameter after local reassignment: Local replacement
caller after parameter reassignment: Changed by mutation
separate matching objects are identical: false
shared object references are identical: true
original top-level name: Asha
copied top-level name: Mina
original nested theme: dark
copied nested theme: dark
outer objects are identical: false
nested objects are identical: true
original first color: blue
copied first color: red
color arrays are identical: false
original nested member role: editor
copied nested member role: editor
nested member objects are identical: true
primitive string type: string
String wrapper type: object
primitive and wrapper are strictly equal: false
~~~

## Explanation

### Primitive assignment and strings

**secondScore** receives the number value **7**. Reassigning **firstScore** to **9** does not affect it.

The string method **toUpperCase** returns a new string. **originalText** remains **"javascript"**, and **upperText** refers to **"JAVASCRIPT"**.

### Shared object reference

**firstProfile** and **secondProfile** refer to the same object. Changing the **name** property through **secondProfile** is visible through **firstProfile**.

### Reassignment and function parameters

After **savedProfile** receives the reference from **currentProfile**, **currentProfile** is reassigned to a new object. **savedProfile** still refers to the original object.

**changeName** mutates the object that **user** refers to, so the caller sees the new name. **replaceParameter** assigns a different object to its local parameter. That does not change the caller's **user** binding.

### Object identity

**firstLevel** and **matchingLevel** are separate object creations. Their property values match, but they are different objects, so strict equality is **false**.

**anotherNameForFirst** receives the reference from **firstLevel**. They both refer to the same object, so strict equality is **true**.

### Shallow object copy

Object spread creates a new **copiedSettings** object. Changing its top-level **name** property does not change the top-level property on **originalSettings**.

The nested **preferences** object is shared. Changing its **theme** through the copy is visible through the original. The outer objects are different, while the nested object references are identical.

### Shallow array copy

Array spread creates a new outer array. Replacing the first element in **copiedColors** does not change **originalColors**.

The **originalMembers** and **copiedMembers** arrays are different, but each contains a reference to the same member object. Changing that object's **role** is visible through both arrays.

### String primitive and wrapper object

**primitiveText** is a string primitive. **wrapperText** is an object created with **new String**. Their types differ and strict equality is **false**. Prefer string literals for ordinary text.

## Try a small change

1. Set **secondScore** to a new number and check whether **firstScore** changes.
2. Add another property to **firstProfile** and read it through both bindings.
3. Reassign **savedProfile** to a new object after **currentProfile** changes. Predict the output.
4. Add a second object property to **changeName** and observe the caller's object.
5. Pass the same object into **changeName** and **replaceParameter** in a different order.
6. Add a top-level property to **copiedSettings** and compare it with **originalSettings**.
7. Add another nested property to **preferences** and observe it through both objects.
8. Put an object inside **originalColors**, shallow-copy the array, and mutate the nested object through the copy.
9. Compare a primitive string with a String wrapper using **typeof** and **===**.

## Key ideas shown

- Primitive assignment copies the current primitive value.
- Primitive values are immutable, and string methods return new strings.
- Object assignment copies a reference, so two bindings can point to one object.
- Mutating a shared object is visible through every reference to it.
- Reassigning a binding or function parameter changes only that binding.
- Function arguments are passed by value, including the reference value for objects.
- Strict equality compares object identity rather than matching object contents.
- Object and array spread make shallow copies.
- Nested objects remain shared when only the outer object or array is copied.
- String wrapper objects are different from string primitives.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [14 - Values, types, and dynamic typing](../lessons/014-values-types-and-dynamic-typing.md) | [Open lesson](../lessons/015-primitive-values-and-object-references.md) | [Open Q&A](../qnas/015-primitive-values-and-object-references.md) | [16 - undefined, null, and NaN](../lessons/016-undefined-null-and-nan.md) |