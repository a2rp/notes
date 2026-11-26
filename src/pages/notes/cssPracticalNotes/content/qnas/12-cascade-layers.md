# 12 - Cascade Layers: Questions and Answers

Use these questions to review how cascade layers organize CSS priority. Answers appear immediately after each question, with explanations where they help clarify the cascade.

## Multiple-choice questions

### 1. What is the main purpose of cascade layers?

- **A.** To make selectors match more elements
- **B.** To organize groups of declarations into an explicit cascade priority order
- **C.** To replace media queries
- **D.** To make every declaration important

**Answer: B.** Layers let authors organize style groups, such as defaults, vendor styles, and components, into an intentional priority order.

### 2. What does this statement establish?

~~~css
@layer reset, base, components;
~~~

- **A.** A selector list
- **B.** A normal declaration order from lower to higher layer priority
- **C.** A list of stylesheets to download
- **D.** An order that applies only to important declarations

**Answer: B.** For normal declarations at the same origin and importance, reset comes before base, which comes before components.

### 3. Two normal declarations in different layers set the same property. Which layer normally wins?

- **A.** The earlier layer
- **B.** The later layer
- **C.** The layer with the more specific selector, in every case
- **D.** The layer with fewer declarations

**Answer: B.** For normal declarations, a later layer has priority over an earlier layer before specificity is compared.

### 4. How are normal declarations outside an explicit layer treated?

- **A.** They are placed in an implicit final layer that wins over explicit layers
- **B.** They are always placed in the reset layer
- **C.** They have zero specificity
- **D.** They are ignored when layers are used

**Answer: A.** Unlayered normal declarations belong to an implicit layer after explicit layers.

### 5. What happens to layer order for important declarations?

- **A.** It stays the same as for normal declarations
- **B.** It is reversed
- **C.** It is decided by source order only
- **D.** Important declarations ignore layers

**Answer: B.** For important declarations in the same origin, earlier layers outrank later layers.

### 6. At the same origin, how do important unlayered declarations compare with important declarations in explicit layers?

- **A.** Unlayered important declarations outrank every explicit layer
- **B.** They have lower layer priority than important declarations in explicit layers
- **C.** Specificity always decides first
- **D.** Source order always decides first

**Answer: B.** Important layer ordering is reversed. Since the implicit unlayered layer follows explicit layers in the normal order, it has lower priority when that order is reversed for important declarations.

### 7. When is selector specificity compared for declarations in different layers?

- **A.** Before the layer order
- **B.** After the layer order, if earlier cascade priorities allow comparison
- **C.** Only if both selectors are IDs
- **D.** Never

**Answer: B.** Layer priority is considered before specificity. A more specific selector in an earlier normal layer can lose to a simpler selector in a later layer.

### 8. When is a named layer's position established?

- **A.** When its first declaration appears
- **B.** When its last declaration appears
- **C.** When the browser finishes loading the page
- **D.** When the layer contains its first ID selector

**Answer: A.** The first occurrence of the layer name determines its position in the order.

### 9. What does a later block using an already declared layer name do?

- **A.** It creates a different layer with the same name
- **B.** It adds more rules to the existing named layer
- **C.** It moves the layer to the end
- **D.** It converts the layer to an anonymous layer

**Answer: B.** Reusing a named layer adds declarations to that same layer without moving its established position.

### 10. Which syntax declares a layer order without adding style rules?

- **A.** @layer reset, base, components;
- **B.** @layers reset, base, components;
- **C.** layer(reset, base, components);
- **D.** @order reset, base, components;

**Answer: A.** An @layer statement can declare several comma-separated layer names in order.

### 11. If two normal declarations are in the same layer and have equal specificity, what normally decides the winner?

- **A.** The later declaration in source order
- **B.** The earlier declaration in source order
- **C.** The declaration in the shorter file
- **D.** Neither declaration

**Answer: A.** Once layer priority and specificity tie, source order breaks the tie.

### 12. An ID selector in an earlier layer conflicts with a type selector in a later layer. Both are normal declarations from the same origin. Which normally wins?

- **A.** The ID selector, because IDs always win
- **B.** The type selector in the later layer
- **C.** The rule with more declarations
- **D.** The later rule, regardless of layers

**Answer: B.** The later layer wins before specificity is compared.

### 13. What is an anonymous layer?

- **A.** A layer declared without a name
- **B.** A layer that contains no declarations
- **C.** A layer with an ID selector
- **D.** A layer that only contains important declarations

**Answer: A.** An @layer block without a name creates an anonymous layer. Each occurrence is unique and cannot be named later.

### 14. What does a nested layer belong to?

- **A.** The user-agent origin
- **B.** Its parent layer
- **C.** The unlayered implicit layer
- **D.** Every layer in the stylesheet

**Answer: B.** A nested layer is part of its parent layer and has an order among that parent's sublayers.

### 15. Which statement about this import is correct?

~~~css
@import url("vendor.css") layer(vendor);
~~~

- **A.** It assigns the imported stylesheet to the vendor layer
- **B.** It makes every imported declaration important
- **C.** It imports only vendor-prefixed properties
- **D.** It must be written after all style rules

**Answer: A.** The layer() modifier places the imported stylesheet's rules in the named layer. The import must appear in the valid import section before ordinary rules.

### 16. What does revert-layer do to a property value?

- **A.** It makes the declaration important
- **B.** It rolls back the current layer's contribution for that property
- **C.** It removes all styles from the document
- **D.** It resets every property to its initial value

**Answer: B.** revert-layer rolls the cascaded value back past the current layer so an eligible lower-priority declaration can supply the value.

### 17. What is the key difference between revert and revert-layer?

- **A.** revert rolls back the current origin; revert-layer rolls back the current layer
- **B.** revert applies only to color; revert-layer applies only to layout
- **C.** revert is a selector; revert-layer is a property
- **D.** They are exactly the same

**Answer: A.** They roll back different parts of the cascade: origin for revert and layer for revert-layer.

### 18. Why declare a layer order near the beginning of a stylesheet?

- **A.** It makes selectors shorter
- **B.** It makes the intended priority visible before layer blocks are spread through the project
- **C.** It prevents use of classes
- **D.** It guarantees that styles work in every browser version

**Answer: B.** An upfront order makes the cascade easier to understand as the stylesheet grows.

## Short-answer questions

### 19. What is a cascade layer?

**Answer:** It is a named or anonymous group of CSS declarations that occupies a position in the cascade layer order.

**Explanation:** Layer priority is considered before specificity and source order for declarations whose earlier cascade priorities are comparable.

### 20. What does @layer reset, base, components; mean for normal declarations?

**Answer:** It places reset before base and base before components. At the same origin and importance, later layers have higher priority for normal declarations.

### 21. Why can a type selector in components beat an ID selector in base?

**Answer:** The declarations are in different layers, and components has higher normal layer priority. Layer order is compared before selector specificity.

### 22. What is the effect of putting a normal rule outside every explicit layer?

**Answer:** The rule belongs to an implicit final layer and normally outranks declarations in explicit layers at the same origin.

### 23. How does !important affect layer order?

**Answer:** Important declarations reverse the layer order. Within the same origin, an important declaration in an earlier explicit layer outranks an important declaration in a later layer.

### 24. Does a more specific selector always win when both declarations are important?

**Answer:** No. Compare origin and layer priority first. Specificity is considered only after those priorities tie.

### 25. What happens if a named layer is opened in several blocks?

**Answer:** The blocks add rules to the same named layer. Its order remains where the layer first appeared.

### 26. What is the difference between an @layer statement and an @layer block?

**Answer:** A statement declares layer names and their order without containing style rules. A block assigns its enclosed rules to a layer.

### 27. Why might a project use a vendor layer?

**Answer:** It can place third-party styles in a known position relative to the project's own layers, making normal project rules easier to organize and override.

### 28. When might an anonymous layer be useful?

**Answer:** It can group styles that need layer priority but do not need a reusable name. Each anonymous layer is separate and cannot be reopened by name.

### 29. Why should a project avoid creating too many layers?

**Answer:** A complicated layer tree is harder to understand and debug. A small, documented order usually makes priorities clearer.

### 30. How do layers and source order work together?

**Answer:** Layer priority is considered before source order. Source order only breaks a tie after the declarations have the same relevant earlier cascade priorities and specificity.

## Code and cascade analysis

### 31. Which color is used for this paragraph?

~~~css
@layer base, components;

@layer base {
  #notice {
    color: navy;
  }
}

@layer components {
  p {
    color: teal;
  }
}
~~~

**Answer: Teal.** Both rules match, but components is a later layer for normal declarations. The layer comparison happens before specificity, so the ID in base does not win.

### 32. Which color is used here?

~~~css
@layer components {
  #notice {
    color: navy;
  }
}

p {
  color: teal;
}
~~~

**Answer: Teal.** The type selector is unlayered. Normal unlayered declarations occupy an implicit final layer after explicit layers, so teal wins over the layered ID rule.

### 33. Which color is used here if both rules match?

~~~css
@layer framework, application;

@layer framework {
  .notice {
    color: navy !important;
  }
}

@layer application {
  #notice {
    color: tomato !important;
  }
}
~~~

**Answer: Navy.** Both declarations are important and have the same origin. Important layer order is reversed, so framework, the earlier layer, wins before specificity is compared.

### 34. Which declaration wins when both rules are in components?

~~~css
@layer components {
  #notice {
    color: navy;
  }

  p {
    color: teal;
  }
}
~~~

**Answer: Navy.** Both are normal declarations in the same layer, so specificity is compared. The ID selector is more specific than the type selector.

### 35. What is the result if a later block reopens base?

~~~css
@layer base, components;

@layer base {
  p { color: navy; }
}

@layer components {
  p { color: teal; }
}

@layer base {
  p { color: purple; }
}
~~~

**Answer: Teal.** The second base block adds a declaration to the existing base layer. It does not move base after components, so components remains the later normal layer.

### 36. What color does revert-layer expose in this example?

~~~css
@layer base, components;

@layer base {
  .notice { color: teal; }
}

@layer components {
  .notice { color: purple; }
  .notice.reset { color: revert-layer; }
}
~~~

**Answer: Teal.** The matching revert-layer declaration rolls back the components layer's color. The normal value from base can then supply the color.

### 37. Why does the ID selector fail to win in this example?

~~~css
@layer defaults, application;

@layer defaults {
  #banner { background-color: navy; }
}

@layer application {
  .banner { background-color: teal; }
}
~~~

**Answer:** The selectors may both match, but application is a later layer for normal declarations. Layer priority is compared before specificity.

### 38. If you move both rules from question 37 into the same layer, which one wins?

**Answer:** The ID selector wins, assuming both are normal declarations with the same origin. Once layer priority ties, specificity is compared.

### 39. What should you inspect if an unlayered rule unexpectedly overrides your layered component rule?

**Answer:** Check whether the competing declaration is normal and outside an explicit layer. Unlayered normal declarations belong to an implicit final layer, which comes after explicit layers.

### 40. Where should an imported stylesheet's layer be assigned?

**Answer:** In its @import rule, for example:

~~~css
@import url("vendor.css") layer(vendor);
~~~

The import belongs in the valid import section before ordinary style rules.

## Practice questions

### 41. Create a layer order for reset, vendor styles, base styles, components, and utilities.

**Answer:**

~~~css
@layer reset, vendor, base, components, utilities;
~~~

For normal declarations at the same origin, the order runs from lower to higher priority.

### 42. How would you make a component rule beat a base rule without increasing selector specificity?

**Answer:** Put the rule in a layer that comes after base for normal declarations, such as components.

**Explanation:** Layer order provides priority before specificity, so a simple selector can win without an ID or a longer selector chain.

### 43. A class rule in a later normal layer loses to an important rule in an earlier layer. What should you check?

**Answer:** Check the importance flag first. Important and normal declarations occupy different cascade priorities, so compare importance before comparing their layer order.

### 44. What is one reason to put the layer order statement near the top of a stylesheet?

**Answer:** It documents the intended cascade priority in one visible place and prevents later block placement from silently defining the order.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | :--- | :--- | :--- |
| [11 - Specificity and resolving conflicts](../qnas/11-specificity-and-conflicts.md) | [Lesson](../lessons/12-cascade-layers.md) | [Example](../examples/12-cascade-layers.md) | [13 - Values, units, and percentages](13-values-units-and-percentages.md) |