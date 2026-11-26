import{N as e,O as t,Pt as n,dt as r,i,m as a,st as o,wt as s,x as c}from"./index-COQIkgJQ.js";var l={scope:`_scope_jr0hy_1`,pageHeader:`_pageHeader_jr0hy_17`,label:`_label_jr0hy_27`,introGrid:`_introGrid_jr0hy_91`,section:`_section_jr0hy_159`,sectionHeader:`_sectionHeader_jr0hy_175`,sectionLabel:`_sectionLabel_jr0hy_185`,takeaway:`_takeaway_jr0hy_203`,sectionNote:`_sectionNote_jr0hy_221`,smellGrid:`_smellGrid_jr0hy_235`,exampleGrid:`_exampleGrid_jr0hy_315`,exampleLabel:`_exampleLabel_jr0hy_343`,duplicateBox:`_duplicateBox_jr0hy_405`,noteBox:`_noteBox_jr0hy_407`,deadCodeBox:`_deadCodeBox_jr0hy_409`,warningBox:`_warningBox_jr0hy_411`,warningIcon:`_warningIcon_jr0hy_437`,duplicateExample:`_duplicateExample_jr0hy_495`,deadExample:`_deadExample_jr0hy_497`,shotgunBox:`_shotgunBox_jr0hy_505`,fileList:`_fileList_jr0hy_561`,mapping:`_mapping_jr0hy_593`,checklist:`_checklist_jr0hy_661`},u=n(),d=[{title:`Long Function`,text:`A function contains several responsibilities, abstraction levels, or decision paths that are difficult to understand together.`,signal:`Difficult to explain with one focused name.`},{title:`Large Module or Class`,text:`One module accumulates behavior for several unrelated concerns and becomes a common destination for new code.`,signal:`Changes happen for many unrelated reasons.`},{title:`Duplicate Knowledge`,text:`The same business rule, calculation, validation, or decision is maintained independently in several places.`,signal:`One rule change requires several coordinated edits.`},{title:`Feature Envy`,text:`A function or module repeatedly accesses another module's data and behavior more than its own.`,signal:`Behavior may belong closer to the data it uses.`},{title:`Primitive Obsession`,text:`Important domain concepts are represented only with generic strings, numbers, arrays, or booleans.`,signal:`The same validation and interpretation logic appears repeatedly.`},{title:`Boolean Flags`,text:`A boolean parameter changes a function into two substantially different modes of operation.`,signal:`The function may contain multiple responsibilities.`},{title:`Shotgun Surgery`,text:`One small requirement regularly requires changes across many unrelated files or modules.`,signal:`Knowledge or responsibility may be scattered.`},{title:`Dead Code`,text:`Unused functions, old branches, abandoned variables, or commented-out implementations remain in the codebase.`,signal:`Developers cannot tell whether obsolete code is still important.`},{title:`Speculative Generality`,text:`Abstractions and extension points exist for future requirements that never became real.`,signal:`Infrastructure exists without an active consumer.`},{title:`Comments as Deodorant`,text:`Comments repeatedly explain confusing code instead of improving the code's naming, structure, or responsibility boundaries.`,signal:`The explanation is compensating for unclear implementation.`}],f=()=>(0,u.jsxs)(`div`,{className:`${l.scope} pageCodeSmells`,children:[(0,u.jsxs)(`header`,{className:`pageHeader`,children:[(0,u.jsxs)(`div`,{className:`label`,children:[(0,u.jsx)(r,{}),(0,u.jsx)(`span`,{children:`Code Quality`})]}),(0,u.jsx)(`h1`,{children:`Code Smells`}),(0,u.jsx)(`p`,{children:`A code smell is a warning sign that code may contain a deeper design or maintainability problem. A smell does not automatically mean the code is wrong, but it can indicate an area worth understanding before future changes make it more expensive.`})]}),(0,u.jsxs)(`section`,{className:`introGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(t,{}),(0,u.jsx)(`h2`,{children:`Smells are signals`}),(0,u.jsx)(`p`,{children:`They point toward possible design problems but should be evaluated in context rather than treated as automatic violations.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(i,{}),(0,u.jsx)(`h2`,{children:`Symptoms are not always causes`}),(0,u.jsx)(`p`,{children:`A long function or duplicate block may be visible while the deeper issue is unclear responsibility, weak boundaries, or changing requirements.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(o,{}),(0,u.jsx)(`h2`,{children:`Refactor deliberately`}),(0,u.jsx)(`p`,{children:`Understand why a smell exists before applying a mechanical transformation that could create a different problem.`})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Common Smells`}),(0,u.jsx)(`h2`,{children:`Patterns worth investigating`}),(0,u.jsx)(`p`,{children:`These are common indicators that responsibilities, abstractions, or dependencies may no longer match the needs of the code.`})]}),(0,u.jsx)(`div`,{className:`smellGrid`,children:d.map(e=>(0,u.jsxs)(`article`,{children:[(0,u.jsx)(i,{}),(0,u.jsx)(`h3`,{children:e.title}),(0,u.jsx)(`p`,{children:e.text}),(0,u.jsx)(`span`,{children:e.signal})]},e.title))})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Long Functions`}),(0,u.jsx)(`h2`,{children:`Length becomes a problem when responsibilities become unclear`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Several concerns together`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`async function checkout(cart, user) {
  if (!cart.items.length) {
    throw new Error("Empty cart");
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const tax = subtotal * 0.18;

  const response = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      cart,
      user,
      subtotal,
      tax,
    }),
  });

  const order = await response.json();

  await sendConfirmationEmail(order);

  analytics.track("checkout_completed");

  return order;
}`})}),(0,u.jsx)(`p`,{children:`Validation, calculation, transport, notifications, and analytics all compete inside the same function.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Focused orchestration`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`async function checkout(cart, user) {
  validateCart(cart);

  const pricing = calculatePricing(cart);

  const order = await orderService.create({
    cart,
    user,
    pricing,
  });

  await notifyOrderCreated(order);

  trackCheckout(order);

  return order;
}`})}),(0,u.jsx)(`p`,{children:`The higher-level workflow remains visible while details live in focused operations.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Large Modules`}),(0,u.jsx)(`h2`,{children:`Watch for modules that become responsible for everything`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Low cohesion`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`class ApplicationManager {
  createUser() {}
  resetPassword() {}
  calculateTax() {}
  sendInvoice() {}
  resizeImage() {}
  exportReport() {}
  clearCache() {}
}`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Focused responsibilities`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`UserService
PaymentService
InvoiceService
ImageService
ReportService`})}),(0,u.jsx)(`p`,{children:`Separate modules can represent clearer concepts when the responsibilities genuinely evolve independently.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Duplicate Code`}),(0,u.jsx)(`h2`,{children:`Look for duplicated knowledge, not only repeated syntax`})]}),(0,u.jsxs)(`div`,{className:`duplicateBox`,children:[(0,u.jsx)(c,{}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h3`,{children:`Repeated rules are more dangerous than repeated shape.`}),(0,u.jsx)(`p`,{children:`Two blocks can look similar while representing different concepts. A stronger smell appears when the same business rule must remain synchronized across several locations.`})]})]}),(0,u.jsxs)(`div`,{className:`exampleGrid duplicateExample`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Repeated rule`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function invoiceTotal(price) {
  return price + price * 0.18;
}

function checkoutTotal(price) {
  return price + price * 0.18;
}`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Shared knowledge`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`const TAX_RATE = 0.18;

function calculateTotal(price) {
  return price + price * TAX_RATE;
}`})})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Feature Envy`}),(0,u.jsx)(`h2`,{children:`Behavior often belongs near the data it understands deeply`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Outside logic knows too much`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function calculateOrderTotal(order) {
  return order.items.reduce(
    (total, item) =>
      total +
      item.price *
        item.quantity *
        (1 - item.discount),
    0,
  );
}`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Responsibility closer to concept`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`class Order {
  calculateTotal() {
    return this.items.reduce(
      (total, item) =>
        total + item.totalPrice(),
      0,
    );
  }
}`})}),(0,u.jsx)(`p`,{children:`If the order owns pricing behavior, keeping that knowledge close to the order can improve cohesion.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Primitive Obsession`}),(0,u.jsx)(`h2`,{children:`Important concepts can deserve meaningful types or objects`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Primitive everywhere`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function pay(
  amount,
  currency,
  cardNumber,
  expiryMonth,
  expiryYear,
) {}`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Concepts grouped`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function pay(
  money,
  paymentMethod,
) {}

const money = {
  amount: 1200,
  currency: "INR",
};

const paymentMethod = {
  cardNumber,
  expiryMonth,
  expiryYear,
};`})})]})]}),(0,u.jsxs)(`div`,{className:`noteBox`,children:[(0,u.jsx)(a,{}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h3`,{children:`Do not wrap every primitive automatically.`}),(0,u.jsx)(`p`,{children:`Introduce a richer concept when values have shared rules, behavior, validation, or meaning that appears repeatedly in the domain.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Boolean Flags`}),(0,u.jsx)(`h2`,{children:`A mode flag can hide multiple functions inside one function`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Flag changes responsibility`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function saveUser(user, sendEmail) {
  save(user);

  if (sendEmail) {
    sendWelcomeEmail(user);
  }
}

saveUser(user, true);`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Explicit operations`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function saveUser(user) {
  return save(user);
}

function registerUser(user) {
  const savedUser = saveUser(user);

  sendWelcomeEmail(savedUser);

  return savedUser;
}`})})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Shotgun Surgery`}),(0,u.jsx)(`h2`,{children:`One requirement should not require unrelated edits everywhere`})]}),(0,u.jsxs)(`div`,{className:`shotgunBox`,children:[(0,u.jsx)(`div`,{children:(0,u.jsx)(`span`,{children:`Pricing change`})}),(0,u.jsx)(e,{}),(0,u.jsxs)(`div`,{className:`fileList`,children:[(0,u.jsx)(`span`,{children:`checkout.js`}),(0,u.jsx)(`span`,{children:`invoice.js`}),(0,u.jsx)(`span`,{children:`report.js`}),(0,u.jsx)(`span`,{children:`email.js`}),(0,u.jsx)(`span`,{children:`admin.js`})]})]}),(0,u.jsx)(`p`,{className:`sectionNote`,children:`When one rule change repeatedly touches many locations, the knowledge may need a clearer source of truth or stronger boundary.`})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Dead Code`}),(0,u.jsx)(`h2`,{children:`Version control is usually a better archive than source comments`})]}),(0,u.jsxs)(`div`,{className:`deadCodeBox`,children:[(0,u.jsx)(s,{}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h3`,{children:`Remove code that no longer participates in the application.`}),(0,u.jsx)(`p`,{children:`Dead branches, unused helpers, obsolete feature code, and large commented-out blocks increase the amount of code developers must consider even though they provide no current behavior.`})]})]}),(0,u.jsxs)(`div`,{className:`exampleGrid deadExample`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Dead code retained`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`// Old implementation.
// Keep in case we need it later.
//
// function calculateOldPrice() {
//   ...
// }`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Current code only`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function calculatePrice(order) {
  return pricingService.calculate(order);
}`})}),(0,u.jsx)(`p`,{children:`Previous implementations can normally be recovered from version history if they are genuinely needed again.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Speculative Generality`}),(0,u.jsx)(`h2`,{children:`Unused flexibility is still complexity`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Built for imaginary variants`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`class StorageFactory {
  create(type) {
    if (type === "mongo") {}
    if (type === "postgres") {}
    if (type === "mysql") {}
    if (type === "memory") {}
    if (type === "file") {}
  }
}`})}),(0,u.jsx)(`p`,{children:`If only one storage implementation exists and no requirement for alternatives exists, the abstraction may be speculative.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Current requirement`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`const userRepository =
  createMongoUserRepository();`})}),(0,u.jsx)(`p`,{children:`A broader abstraction can be introduced when a real requirement provides evidence for it.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Comments as Deodorant`}),(0,u.jsx)(`h2`,{children:`Do not use comments only to make confusing code tolerable`})]}),(0,u.jsxs)(`div`,{className:`exampleGrid`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Comment explains unclear code`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`// If user is active admin and has edit
// permission then allow editing.
if (
  u.a &&
  u.r === "admin" &&
  u.p.includes("edit")
) {
  return true;
}`})})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`span`,{className:`exampleLabel`,children:`Code communicates intent`}),(0,u.jsx)(`pre`,{children:(0,u.jsx)(`code`,{children:`function canEditContent(user) {
  return (
    user.isActive &&
    user.role === "admin" &&
    user.permissions.includes("edit")
  );
}`})})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Smell to Refactoring`}),(0,u.jsx)(`h2`,{children:`Possible responses depend on the underlying cause`})]}),(0,u.jsxs)(`div`,{className:`mapping`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Long Function`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Extract focused functions`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Large Module`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Separate responsibilities`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Duplicate Knowledge`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Introduce a shared source of truth`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Feature Envy`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Move behavior closer to its data`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Primitive Obsession`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Introduce a meaningful domain concept`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Boolean Flag`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Split distinct operations`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Shotgun Surgery`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Centralize scattered knowledge`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Dead Code`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Delete obsolete implementation`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Speculative Generality`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Remove unused abstractions`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Comment Deodorant`}),(0,u.jsx)(o,{}),(0,u.jsx)(`span`,{children:`Improve naming and structure`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Important`}),(0,u.jsx)(`h2`,{children:`Do not refactor based on smell names alone`})]}),(0,u.jsxs)(`div`,{className:`warningBox`,children:[(0,u.jsx)(`div`,{className:`warningIcon`,children:(0,u.jsx)(i,{})}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h3`,{children:`Context determines whether a smell is actually harmful.`}),(0,u.jsx)(`p`,{children:`A long function can sometimes be easier to understand than many tiny functions. Duplication can sometimes be safer than premature abstraction. A large module can be cohesive if all of its behavior represents one concept. Investigate before changing.`})]})]})]}),(0,u.jsxs)(`section`,{className:`section`,children:[(0,u.jsxs)(`div`,{className:`sectionHeader`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Review Checklist`}),(0,u.jsx)(`h2`,{children:`Questions to ask when investigating a smell`})]}),(0,u.jsxs)(`div`,{className:`checklist`,children:[(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`What maintenance problem does this create?`}),(0,u.jsx)(`p`,{children:`Identify the real cost instead of refactoring only because a pattern has a smell name.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Does this code change for multiple reasons?`}),(0,u.jsx)(`p`,{children:`Mixed change pressure can reveal weak responsibility boundaries.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Is knowledge duplicated or only syntax?`}),(0,u.jsx)(`p`,{children:`Similar-looking code does not always represent the same concept.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Is another module better suited to this behavior?`}),(0,u.jsx)(`p`,{children:`Keep responsibilities near the data and knowledge they require.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Is this abstraction used by real requirements?`}),(0,u.jsx)(`p`,{children:`Remove speculative complexity that provides no current value.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Can obsolete code simply be deleted?`}),(0,u.jsx)(`p`,{children:`Source control already preserves previous implementations.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Would clearer naming remove the need for comments?`}),(0,u.jsx)(`p`,{children:`Comments should add context rather than compensate for unclear code.`})]}),(0,u.jsxs)(`article`,{children:[(0,u.jsx)(`strong`,{children:`Will the refactoring actually make change easier?`}),(0,u.jsx)(`p`,{children:`The goal is maintainability, not maximizing abstraction.`})]})]})]}),(0,u.jsxs)(`section`,{className:`takeaway`,children:[(0,u.jsx)(`span`,{className:`sectionLabel`,children:`Key Takeaway`}),(0,u.jsx)(`h2`,{children:`Code smells are prompts to investigate, not automatic failures.`}),(0,u.jsx)(`p`,{children:`Use smells to identify areas where responsibilities, dependencies, abstractions, or naming may have become difficult to maintain. Understand the underlying cause first, then apply the smallest useful refactoring that improves the code.`})]})]});export{f as default};