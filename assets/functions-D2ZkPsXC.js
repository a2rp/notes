import{N as e,Pt as t,S as n,i as r,jt as i,m as a,st as o}from"./index-COQIkgJQ.js";var s={scope:`_scope_2e604_1`,pageHeader:`_pageHeader_2e604_17`,label:`_label_2e604_27`,introGrid:`_introGrid_2e604_91`,section:`_section_2e604_159`,sectionHeader:`_sectionHeader_2e604_175`,sectionLabel:`_sectionLabel_2e604_185`,takeaway:`_takeaway_2e604_203`,exampleGrid:`_exampleGrid_2e604_233`,compareGrid:`_compareGrid_2e604_235`,commandGrid:`_commandGrid_2e604_237`,exampleLabel:`_exampleLabel_2e604_269`,typeLabel:`_typeLabel_2e604_271`,parameterRules:`_parameterRules_2e604_357`,asyncRules:`_asyncRules_2e604_359`,problemGrid:`_problemGrid_2e604_361`,checklist:`_checklist_2e604_363`,effectGrid:`_effectGrid_2e604_475`,effectExample:`_effectExample_2e604_533`,noteBox:`_noteBox_2e604_553`,warningBox:`_warningBox_2e604_555`,warningIcon:`_warningIcon_2e604_579`,extractionBox:`_extractionBox_2e604_633`,extractionText:`_extractionText_2e604_663`},c=t(),l=()=>(0,c.jsxs)(`div`,{className:`${s.scope} pageFunctions`,children:[(0,c.jsxs)(`header`,{className:`pageHeader`,children:[(0,c.jsxs)(`div`,{className:`label`,children:[(0,c.jsx)(i,{}),(0,c.jsx)(`span`,{children:`Code Quality`})]}),(0,c.jsx)(`h1`,{children:`Functions`}),(0,c.jsx)(`p`,{children:`Functions are one of the primary units of behavior in software. Well-designed functions communicate intent, keep responsibilities focused, make data flow easier to follow, and reduce the amount of context a developer must hold while reading code.`})]}),(0,c.jsxs)(`section`,{className:`introGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h2`,{children:`Keep one clear responsibility`}),(0,c.jsx)(`p`,{children:`A function should have a focused purpose that can be understood without reading several unrelated operations.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(n,{}),(0,c.jsx)(`h2`,{children:`Make data flow visible`}),(0,c.jsx)(`p`,{children:`Parameters and return values should make it clear what information enters a function and what result leaves it.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(o,{}),(0,c.jsx)(`h2`,{children:`Control side effects`}),(0,c.jsx)(`p`,{children:`State changes, network requests, storage updates, and other effects should be deliberate and easy to identify.`})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Focused Functions`}),(0,c.jsx)(`h2`,{children:`Give each function one clear reason to exist`}),(0,c.jsx)(`p`,{children:`Function size alone does not determine quality. A better question is whether all operations inside the function contribute to one understandable responsibility.`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Too many responsibilities`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`async function createUser(user) {
  validateUser(user);

  const savedUser = await database.users.create(user);

  await sendWelcomeEmail(savedUser.email);

  analytics.track("user_created");

  localStorage.setItem(
    "lastUser",
    JSON.stringify(savedUser),
  );

  return savedUser;
}`})}),(0,c.jsx)(`p`,{children:`Validation, persistence, email delivery, analytics, and browser storage are all coordinated inside one function.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Separated responsibilities`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`async function createUser(user) {
  validateUser(user);

  return userRepository.create(user);
}

async function registerUser(user) {
  const createdUser = await createUser(user);

  await sendWelcomeEmail(createdUser.email);

  trackUserCreated(createdUser);

  return createdUser;
}`})}),(0,c.jsx)(`p`,{children:`Lower-level behavior remains focused while orchestration is kept explicit at a higher level.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Parameters`}),(0,c.jsx)(`h2`,{children:`Keep function inputs understandable`}),(0,c.jsx)(`p`,{children:`Parameters are part of a function's public contract. Too many unrelated parameters often indicate that the function is doing too much or that related values belong together.`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Difficult call site`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`createUser(
  "Ashish",
  "ash@example.com",
  true,
  "admin",
  false,
  "IN",
  "Asia/Kolkata",
);`})}),(0,c.jsx)(`p`,{children:`Several positional values make it difficult to understand what each argument means.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Named input`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`createUser({
  name: "Ashish",
  email: "ash@example.com",
  isActive: true,
  role: "admin",
  country: "IN",
  timezone: "Asia/Kolkata",
});`})}),(0,c.jsx)(`p`,{children:`An options object can make related inputs easier to understand when a function genuinely requires several values.`})]})]}),(0,c.jsxs)(`div`,{className:`parameterRules`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Prefer fewer inputs`}),(0,c.jsx)(`p`,{children:`A small parameter list usually creates a simpler contract.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Group related values`}),(0,c.jsx)(`p`,{children:`Use meaningful objects when several values represent one concept.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Avoid boolean traps`}),(0,c.jsx)(`p`,{children:"Calls such as `createUser(data, true, false)` hide intent."})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Do not mutate inputs unexpectedly`}),(0,c.jsx)(`p`,{children:`Callers should not need to inspect a function to discover that their object will be modified.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Return Values`}),(0,c.jsx)(`h2`,{children:`Return predictable results`}),(0,c.jsx)(`p`,{children:`A function becomes easier to use when its return contract is consistent across successful execution paths.`})]}),(0,c.jsxs)(`div`,{className:`compareGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Inconsistent result`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function findUser(id) {
  const user = users.find(
    (item) => item.id === id,
  );

  if (!user) {
    return false;
  }

  return user;
}`})}),(0,c.jsx)(`p`,{children:`Consumers now need to understand two unrelated result types.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Consistent contract`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function findUser(id) {
  return (
    users.find(
      (user) => user.id === id,
    ) ?? null
  );
}`})}),(0,c.jsx)(`p`,{children:`The function returns either the expected entity or an explicit absence value.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Side Effects`}),(0,c.jsx)(`h2`,{children:`Make external changes deliberate`}),(0,c.jsx)(`p`,{children:`A side effect occurs when a function changes something outside its local scope or interacts with an external system.`})]}),(0,c.jsxs)(`div`,{className:`effectGrid`,children:[(0,c.jsx)(`article`,{children:(0,c.jsx)(`span`,{children:`Database writes`})}),(0,c.jsx)(`article`,{children:(0,c.jsx)(`span`,{children:`Network requests`})}),(0,c.jsx)(`article`,{children:(0,c.jsx)(`span`,{children:`File operations`})}),(0,c.jsx)(`article`,{children:(0,c.jsx)(`span`,{children:`DOM changes`})}),(0,c.jsx)(`article`,{children:(0,c.jsx)(`span`,{children:`Global state updates`})}),(0,c.jsx)(`article`,{children:(0,c.jsx)(`span`,{children:`Notifications`})})]}),(0,c.jsxs)(`div`,{className:`exampleGrid effectExample`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Hidden side effect`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function calculateTotal(cart) {
  const total = cart.items.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  localStorage.setItem("total", total);

  return total;
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Separated behavior`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function calculateTotal(cart) {
  return cart.items.reduce(
    (sum, item) => sum + item.price,
    0,
  );
}

const total = calculateTotal(cart);

saveCartTotal(total);`})})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Command Query Separation`}),(0,c.jsx)(`h2`,{children:`Ask for information or change state`}),(0,c.jsx)(`p`,{children:`Command-query separation is a useful design guideline where an operation either returns information or performs a state-changing action. Keeping those intentions distinct can make behavior easier to reason about.`})]}),(0,c.jsxs)(`div`,{className:`commandGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`typeLabel`,children:`Query`}),(0,c.jsx)(`h3`,{children:`Read information`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function getCartTotal(cart) {
  return cart.items.reduce(
    (total, item) => total + item.price,
    0,
  );
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`typeLabel`,children:`Command`}),(0,c.jsx)(`h3`,{children:`Change state`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function clearCart(cart) {
  cart.items = [];
}`})})]})]}),(0,c.jsxs)(`div`,{className:`noteBox`,children:[(0,c.jsx)(a,{}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Treat it as a guideline, not a mechanical rule.`}),(0,c.jsx)(`p`,{children:`Some operations naturally perform work and return a useful result. The goal is to avoid surprising callers with hidden state changes when they appear to be simply requesting information.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Guard Clauses`}),(0,c.jsx)(`h2`,{children:`Handle invalid or exceptional paths early`}),(0,c.jsx)(`p`,{children:`Guard clauses can reduce nesting by dealing with conditions that prevent normal execution before reaching the main behavior.`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Nested conditions`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.isPaid) {
        shipOrder(order);
      }
    }
  }
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Guard clauses`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function processOrder(order) {
  if (!order) {
    return;
  }

  if (order.items.length === 0) {
    return;
  }

  if (!order.isPaid) {
    return;
  }

  shipOrder(order);
}`})})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Extraction`}),(0,c.jsx)(`h2`,{children:`Extract meaningful behavior, not arbitrary lines`}),(0,c.jsx)(`p`,{children:`Function extraction is most useful when the extracted function represents a recognizable concept or responsibility.`})]}),(0,c.jsxs)(`div`,{className:`extractionBox`,children:[(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function checkout(cart, customer) {
  validateCart(cart);

  const subtotal = calculateSubtotal(cart);
  const discount = calculateDiscount(customer, subtotal);
  const total = subtotal - discount;

  return createOrder({
    cart,
    customer,
    subtotal,
    discount,
    total,
  });
}`})}),(0,c.jsxs)(`div`,{className:`extractionText`,children:[(0,c.jsx)(e,{}),(0,c.jsx)(`h3`,{children:`Each extracted function communicates a concept.`}),(0,c.jsx)(`p`,{children:`The main function now reads as a sequence of meaningful operations instead of exposing every implementation detail at once.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Async Functions`}),(0,c.jsx)(`h2`,{children:`Keep asynchronous control flow visible`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Mixed async chain`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function loadUser(id) {
  return fetchUser(id)
    .then((user) => {
      return fetchOrders(user.id)
        .then((orders) => {
          return {
            user,
            orders,
          };
        });
    });
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Linear async flow`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`async function loadUser(id) {
  const user = await fetchUser(id);

  const orders = await fetchOrders(
    user.id,
  );

  return {
    user,
    orders,
  };
}`})})]})]}),(0,c.jsxs)(`div`,{className:`asyncRules`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Await required operations`}),(0,c.jsx)(`p`,{children:`Make dependencies between asynchronous steps explicit.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Run independent work together`}),(0,c.jsx)(`p`,{children:`Use concurrency when operations do not depend on one another.`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`const [user, settings] =
  await Promise.all([
    fetchUser(),
    fetchSettings(),
  ]);`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Handle errors at useful boundaries`}),(0,c.jsx)(`p`,{children:"Do not add `try/catch` everywhere when the function cannot meaningfully recover or add context."})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Return the promise contract`}),(0,c.jsx)(`p`,{children:`Callers should be able to await completion and handle failures predictably.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Function Size`}),(0,c.jsx)(`h2`,{children:`Small is useful when it improves understanding`})]}),(0,c.jsxs)(`div`,{className:`warningBox`,children:[(0,c.jsx)(`div`,{className:`warningIcon`,children:(0,c.jsx)(r,{})}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Do not optimize for line count alone.`}),(0,c.jsx)(`p`,{children:`Splitting every few lines into separate functions can make simple behavior harder to follow. Extract when a block has its own responsibility, useful name, reuse value, or abstraction level.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Common Problems`}),(0,c.jsx)(`h2`,{children:`Warning signs in function design`})]}),(0,c.jsxs)(`div`,{className:`problemGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Too many parameters`}),(0,c.jsx)(`p`,{children:`The function may have too many responsibilities or an unclear data model.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Boolean mode flags`}),(0,c.jsx)(`p`,{children:`A flag that completely changes behavior can indicate multiple functions hidden inside one.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Unexpected mutation`}),(0,c.jsx)(`p`,{children:`Modifying arguments or shared state makes behavior harder to predict.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Mixed abstraction levels`}),(0,c.jsx)(`p`,{children:`High-level business steps and low-level implementation details compete for attention.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Duplicated condition logic`}),(0,c.jsx)(`p`,{children:`Repeated business decisions may belong in one focused operation.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Unclear return contract`}),(0,c.jsx)(`p`,{children:`Different branches return unrelated types or silently return nothing.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Review Checklist`}),(0,c.jsx)(`h2`,{children:`Questions to ask when reviewing functions`})]}),(0,c.jsxs)(`div`,{className:`checklist`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Does the function have a clear responsibility?`}),(0,c.jsx)(`p`,{children:`Its name and body should describe one understandable purpose.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Are the inputs easy to understand?`}),(0,c.jsx)(`p`,{children:`Parameters should communicate the data required by the behavior.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Is the return contract predictable?`}),(0,c.jsx)(`p`,{children:`Callers should know what kind of result to expect.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Are side effects obvious?`}),(0,c.jsx)(`p`,{children:`External state changes should not be surprising.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Can guard clauses simplify the main path?`}),(0,c.jsx)(`p`,{children:`Handle invalid conditions early when it improves readability.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Would extraction reveal useful concepts?`}),(0,c.jsx)(`p`,{children:`Extract behavior when a meaningful responsibility can be named.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Is asynchronous flow easy to follow?`}),(0,c.jsx)(`p`,{children:`Dependencies, concurrency, and failure behavior should be clear.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Is the function easy to test?`}),(0,c.jsx)(`p`,{children:`Focused inputs, outputs, and controlled dependencies usually make testing simpler.`})]})]})]}),(0,c.jsxs)(`section`,{className:`takeaway`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Key Takeaway`}),(0,c.jsx)(`h2`,{children:`Functions should make behavior easier to understand.`}),(0,c.jsx)(`p`,{children:`Keep responsibilities focused, make inputs and outputs clear, expose side effects deliberately, simplify exceptional paths with guard clauses where useful, and extract functions around meaningful concepts rather than arbitrary line counts.`})]})]});export{l as default};