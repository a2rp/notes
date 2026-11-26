# 50 - Microdata and structured information: Questions and Answers

Use these questions to review [Chapter 50 - Microdata and structured information](../lessons/50-microdata.md). Each answer follows its question, with an explanation or example where it helps.

## Multiple-choice questions

### 1. Which attribute creates a new Microdata item?

A. `itemprop`

B. `itemscope`

C. `itemtype`

D. `itemref`

**Answer: B.** `itemscope` marks the element as the start of an item.

### 2. What does `itemtype` identify?

A. The CSS class used to style an item

B. The document language

C. The vocabulary type represented by an item

D. The URL of every property value

**Answer: C.** A type such as `https://schema.org/Book` identifies what kind of item is described. It is used with `itemscope`.

### 3. What does `itemprop` do?

A. It creates an item

B. It names a property of a containing item

C. It makes text bold

D. It creates a link

**Answer: B.** It labels the element's value as a property of the current item.

### 4. For an `a` element with `itemprop`, where does Microdata get the property value?

A. From its `href` attribute

B. From its `title` attribute only

C. From its CSS color

D. From the page URL

**Answer: A.** An `a` element contributes its `href` value.

### 5. What does valid structured data guarantee about search results?

A. A rich result will always appear

B. The page will rank first

C. Nothing by itself; search engines apply their own requirements and decisions

D. The page will be indexed immediately

**Answer: C.** Correct markup may make a page eligible for a feature, but it does not guarantee a rich result or ranking.

## True or false

### 1. `itemscope` creates a Microdata item.

**Answer: True.** It marks an element as an item.

### 2. `itemprop` creates a new item every time it appears.

**Answer: False.** It names a property. Use `itemscope` to create an item.

### 3. A nested item can be the value of a property on its containing item.

**Answer: True.** For example, a Book's `author` property can have a nested Person item as its value.

### 4. Microdata adds visual styling to a page.

**Answer: False.** Microdata attributes add machine-readable information. CSS controls visual styling.

### 5. Accurate structured data always appears as a rich result in a search engine.

**Answer: False.** Search engines choose what to display and apply feature-specific requirements and policies.

## Short-answer questions

### 1. What is structured data?

**Answer:** Structured data is information labeled in a consistent, machine-readable way. Labels help software understand what values represent, such as a person's name or a book's publication date.

### 2. What are an item and a property in Microdata?

**Answer:** An item is a group of related information. A property is a named value that describes the item, such as the `name` property of a Person.

### 3. What is a vocabulary, and why use one?

**Answer:** A vocabulary defines shared types and property names. Using Schema.org helps different tools interpret those labels consistently.

### 4. Explain the roles of `itemscope`, `itemtype`, and `itemprop`.

**Answer:** `itemscope` creates an item, `itemtype` identifies its vocabulary type, and `itemprop` labels a property belonging to the item.

### 5. How does Microdata get a value from a `time` element?

**Answer:** It uses the `datetime` attribute when present. Otherwise, it uses the element's text content.

## Practical questions

### 1. Mark up a visible Person with the name Ada Lovelace and job title Mathematician.

**Answer:**

```html
<div itemscope itemtype="https://schema.org/Person">
  <p>Name: <span itemprop="name">Ada Lovelace</span></p>
  <p>Job title: <span itemprop="jobTitle">Mathematician</span></p>
</div>
```

The outer element creates a typed item. Each span labels a property of that Person.

### 2. Add a nested Person author to this Book and give the author a name.

```html
<article itemscope itemtype="https://schema.org/Book">
  <h1 itemprop="name">The Hobbit</h1>
</article>
```

**Answer:**

```html
<article itemscope itemtype="https://schema.org/Book">
  <h1 itemprop="name">The Hobbit</h1>
  <p>
    Author:
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">J. R. R. Tolkien</span>
    </span>
  </p>
</article>
```

The nested Person is the value of the Book's `author` property. Its `name` belongs to the Person.

### 3. Add a machine-readable ISBN of `9780547928227` while displaying `978-0-547-92822-7`.

**Answer:**

```html
<data itemprop="isbn" value="9780547928227">978-0-547-92822-7</data>
```

A `data` element contributes its `value` attribute as the property value and keeps readable text for visitors.

### 4. Mark up a publication year of 1937 so it has a machine-readable value.

**Answer:**

```html
<time itemprop="datePublished" datetime="1937">1937</time>
```

The `datetime` attribute provides the Microdata value, while the text appears on the page.

### 5. Add a link as the `url` property of a Book item.

**Answer:**

```html
<a itemprop="url" href="https://example.com/books/the-hobbit">Book details</a>
```

For an `a` element, the Microdata value comes from `href`, not from its visible text.

### Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [49 - Search and social sharing metadata](49-search-and-social-metadata.md) | [Lesson](../lessons/50-microdata.md) | [Example](../examples/50-microdata.md) | [51 - Safe links and embedded content](51-html-safety.md) |