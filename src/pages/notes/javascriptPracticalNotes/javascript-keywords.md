# JavaScript Keywords

This page focuses on JavaScript keywords and words that look like keywords. A keyword has a syntactic use. A reserved word cannot be used as an identifier. Most, but not all, keywords are reserved, and some reserved words have context-sensitive rules.

The complete list below is the ECMAScript 2026 ReservedWord list. Property names follow different rules from variable names.
## Contents

- [Reserved words](#reserved-words)
- [What the reserved words do](#what-the-reserved-words-do)
- [Context-dependent words](#context-dependent-words)
- [Future-reserved words and strict mode](#future-reserved-words-and-strict-mode)
- [Literal keywords](#literal-keywords)
- [Words that are not keywords](#words-that-are-not-keywords)
- [Keywords in property names](#keywords-in-property-names)
- [Identifier examples](#identifier-examples)
- [Quick checklist](#quick-checklist)
- [Related lessons](#related-lessons)

## Reserved words

These words are reserved by JavaScript syntax. Do not use them as variable, function, class, or label names.

~~~text
await break case catch class const continue debugger default delete do else enum
export extends false finally for function if import in instanceof new null return
super switch this throw true try typeof var void while with yield
~~~

Most of this list is reserved in every context. **await** and **yield** have context-sensitive rules, described below. **enum** is reserved for future use.

## What the reserved words do

This table groups the reserved words by their common role. Some words have more than one use.

| Purpose | Words |
| --- | --- |
| Declarations and definitions | class, const, function, var |
| Branching and loops | break, case, continue, default, do, else, finally, for, if, return, switch, while |
| Exceptions and debugging | catch, debugger, throw, try |
| Classes and inheritance | class, extends, super, this |
| Modules | export, import |
| Operators and expressions | delete, in, instanceof, new, typeof, void |
| Asynchronous and generator syntax | await, yield |
| Literal values | false, null, true |
| Reserved for future use | enum |
| Legacy statement | with |

**with** is reserved, but avoid the statement it names. It is disallowed in strict mode and makes name resolution harder to reason about.

## Context-dependent words

Some words are special only in particular syntactic positions, or their identifier rules depend on where code appears.

| Word or group | How it is used | Identifier guidance |
| --- | --- | --- |
| await | Used by asynchronous functions and module code to wait for a promise. | Treat it as reserved in modules and async functions. Avoid using it as a name in all code. |
| yield | Used to pause and resume a generator function. | Contextually allowed as an identifier outside restricted positions. Avoid using it as a name. |
| let | Introduces a block-scoped lexical declaration. | Its identifier use depends on the grammar context. Use another name. |
| static | Marks a static class member. | Restricted as an identifier in strict mode. Use another name. |
| async | Marks an async function or method when placed in the relevant position. | It is not globally reserved and can be an identifier in other positions. |
| as, from | Used in import and export syntax. | Not globally reserved; their special role depends on the module grammar. |
| get, set | Introduce getter and setter properties in object and class definitions. | Not globally reserved. |
| of | Separates the binding from the iterable in a for-of loop. | Not globally reserved. |
| meta, target | Appear in import.meta and new.target. | Not globally reserved. |
| using | Introduces a newer resource-management declaration, including the form **await using**. It is not in the ECMAScript 2026 ReservedWord list, and support depends on the runtime. | Context-dependent syntax, not a globally reserved word. Check runtime support before using it. |

Do not assume that a word is globally reserved just because it appears in a syntax form. For example, **async** has special meaning in **async function work()**, while it can be used as a property name or identifier in other grammatical positions.

## Future-reserved words and strict mode

**enum** is reserved in all code, even though JavaScript does not currently use it for a language construct.

These six words are future-reserved in strict mode:

~~~text
implements interface package private protected public
~~~

Strict mode also disallows **let** and **static** as identifier names. **yield** is reserved with context-sensitive rules and is restricted in strict mode and generator code. Avoid all of these as names so code works consistently across strict and non-strict contexts.

JavaScript modules are always strict mode. A classic script can opt in by placing **use strict** at the beginning of a script or function body.

**arguments** and **eval** are not keywords, but strict mode restricts using them as binding names and forbids assigning to them. Avoid those names too.
## Literal keywords

**true**, **false**, and **null** are reserved words that represent literal values:

- **true** and **false** are boolean values.
- **null** represents an intentional absence of an object value.

They are values, not names that can be declared. By contrast, **undefined** and **NaN** are ordinary identifiers that refer to built-in values. They are not keywords.

## Words that are not keywords

Many names that feel built into JavaScript are identifiers supplied by the language environment or by libraries. They are not reserved words.

| Name | What it is |
| --- | --- |
| Array, Object, Promise, Math | Standard built-in objects or constructors |
| console | A commonly available debugging object |
| document, window | Browser-provided objects |
| process, Buffer | Common Node.js globals |
| undefined, NaN, Infinity | Built-in values exposed through identifiers |

A host environment may provide different globals. For example, **document** is available in browsers but is not a core JavaScript keyword.

## Keywords in property names

Reserved words cannot be variable names, but they can be property names when the grammar expects a property name.

~~~js
const settings = {
  default: 'compact',
  class: 'primary'
};

console.log(settings.default);
console.log(settings.class);
~~~

Dot property access also accepts these names:

~~~js
const record = { return: 'stored as data' };

console.log(record.return);
~~~

This does not make **default**, **class**, or **return** valid variable names. The position in the code determines which grammar rule applies.

## Identifier examples

The following names are valid because they are not reserved:

~~~js
const className = 'notice';
const async = 'scheduled';
const of = 'a preposition';
~~~

These declarations are invalid because the names are reserved:

~~~js
// Invalid: class is a reserved word.
const class = 'notice';

// Invalid: return is a reserved word.
const return = 'value';
~~~

JavaScript is case-sensitive. **class** is reserved, while **Class** is a different identifier and may be used as a name. Prefer clear names instead of relying on capitalization to work around a keyword.

## Quick checklist

- Do not use reserved words as variable, function, class, or label names.
- Remember that **await**, **yield**, **let**, and **static** have context-sensitive rules.
- Treat **enum** as reserved, and avoid strict-mode future-reserved words as names.
- **true**, **false**, and **null** are literal values.
- Names such as **Promise**, **console**, **document**, **undefined**, and **NaN** are not keywords.
- Property names can use reserved words in object properties and dot access.
- Use descriptive alternatives such as **className**, **defaultValue**, or **isAvailable**.

## Related lessons

- [Identifiers, keywords, reserved words, and naming](lessons/008-identifiers-keywords-reserved-words-and-naming.md)
- [Classic scripts, modules, and script loading](lessons/009-classic-scripts-modules-and-script-loading.md)
- [Strict mode](lessons/013-strict-mode.md)
- [JavaScript quick reference and glossary](lessons/145-javascript-quick-reference-and-glossary.md)