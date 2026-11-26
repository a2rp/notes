import{N as e,Pt as t,ct as n,i as r,m as i,st as a,ut as o}from"./index-COQIkgJQ.js";var s={scope:`_scope_380gq_1`,pageHeader:`_pageHeader_380gq_17`,label:`_label_380gq_27`,introGrid:`_introGrid_380gq_91`,section:`_section_380gq_159`,sectionHeader:`_sectionHeader_380gq_175`,sectionLabel:`_sectionLabel_380gq_185`,takeaway:`_takeaway_380gq_203`,compareGrid:`_compareGrid_380gq_233`,exampleGrid:`_exampleGrid_380gq_235`,rewriteGrid:`_rewriteGrid_380gq_237`,signalGrid:`_signalGrid_380gq_353`,checklist:`_checklist_380gq_355`,exampleLabel:`_exampleLabel_380gq_433`,moveLabel:`_moveLabel_380gq_435`,moveBox:`_moveBox_380gq_497`,moveColumn:`_moveColumn_380gq_511`,moveArrow:`_moveArrow_380gq_535`,steps:`_steps_380gq_561`,warningBox:`_warningBox_380gq_643`,testBox:`_testBox_380gq_645`,warningIcon:`_warningIcon_380gq_667`,testGrid:`_testGrid_380gq_723`},c=t(),l=()=>(0,c.jsxs)(`div`,{className:`${s.scope} pageRefactoring`,children:[(0,c.jsxs)(`header`,{className:`pageHeader`,children:[(0,c.jsxs)(`div`,{className:`label`,children:[(0,c.jsx)(a,{}),(0,c.jsx)(`span`,{children:`Code Quality`})]}),(0,c.jsx)(`h1`,{children:`Refactoring`}),(0,c.jsx)(`p`,{children:`Refactoring means improving the internal structure of existing code without intentionally changing its observable behavior. The goal is to make future development safer, clearer, and easier while preserving what the software already does.`})]}),(0,c.jsxs)(`section`,{className:`introGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(i,{}),(0,c.jsx)(`h2`,{children:`Preserve behavior`}),(0,c.jsx)(`p`,{children:`Refactoring changes how code is organized, not what the user should experience from the same inputs and workflows.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(n,{}),(0,c.jsx)(`h2`,{children:`Prefer incremental changes`}),(0,c.jsx)(`p`,{children:`Small transformations are easier to review, test, understand, and reverse than one large uncontrolled rewrite.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(e,{}),(0,c.jsx)(`h2`,{children:`Improve future changeability`}),(0,c.jsx)(`p`,{children:`Good refactoring reduces duplication, unclear responsibilities, unnecessary coupling, and other sources of maintenance friction.`})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Core Idea`}),(0,c.jsx)(`h2`,{children:`Change the structure while preserving the behavior`}),(0,c.jsx)(`p`,{children:`Refactoring is different from adding a feature. Ideally, the same input continues to produce the same expected result while the internal implementation becomes easier to understand or maintain.`})]}),(0,c.jsxs)(`div`,{className:`compareGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(i,{}),(0,c.jsx)(`h3`,{children:`Refactoring`}),(0,c.jsxs)(`ul`,{children:[(0,c.jsx)(`li`,{children:`Rename unclear identifiers.`}),(0,c.jsx)(`li`,{children:`Extract focused functions.`}),(0,c.jsx)(`li`,{children:`Move responsibilities to better modules.`}),(0,c.jsx)(`li`,{children:`Simplify conditionals.`}),(0,c.jsx)(`li`,{children:`Reduce meaningful duplication.`}),(0,c.jsx)(`li`,{children:`Improve dependency boundaries.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Not purely refactoring`}),(0,c.jsxs)(`ul`,{children:[(0,c.jsx)(`li`,{children:`Add a new user-facing feature.`}),(0,c.jsx)(`li`,{children:`Change business behavior.`}),(0,c.jsx)(`li`,{children:`Alter validation requirements.`}),(0,c.jsx)(`li`,{children:`Change API contracts intentionally.`}),(0,c.jsx)(`li`,{children:`Remove supported workflows.`}),(0,c.jsx)(`li`,{children:`Change outputs because requirements changed.`})]})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`When to Refactor`}),(0,c.jsx)(`h2`,{children:`Refactor when structure is slowing down safe change`})]}),(0,c.jsxs)(`div`,{className:`signalGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Changes repeatedly touch many unrelated files`}),(0,c.jsx)(`p`,{children:`Responsibilities or dependencies may be spread across weak boundaries.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`The same rule is duplicated`}),(0,c.jsx)(`p`,{children:`Repeated knowledge can create inconsistent future updates.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Code requires constant explanation`}),(0,c.jsx)(`p`,{children:`Naming, structure, or responsibility boundaries may need improvement.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Testing simple behavior is difficult`}),(0,c.jsx)(`p`,{children:`Too many dependencies or mixed responsibilities can make isolated tests expensive.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`A new change feels risky`}),(0,c.jsx)(`p`,{children:`Improving the surrounding structure first can make the real modification safer.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`A pattern has become clear`}),(0,c.jsx)(`p`,{children:`Repeated real usage can justify an abstraction that was previously premature.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Rename`}),(0,c.jsx)(`h2`,{children:`Improving a name can be a meaningful refactor`}),(0,c.jsx)(`p`,{children:`Renaming is valuable when the current name no longer communicates the real responsibility or domain concept.`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Before`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function process(data) {
  return data.filter(
    (item) => item.s,
  );
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`After`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function getShippedOrders(orders) {
  return orders.filter(
    (order) => order.isShipped,
  );
}`})}),(0,c.jsx)(`p`,{children:`The behavior is essentially the same, but the responsibility is much easier to understand.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Extract Function`}),(0,c.jsx)(`h2`,{children:`Turn a meaningful block into a named operation`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Before extraction`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function checkout(cart) {
  const subtotal = cart.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total,
  };
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`After extraction`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function calculateSubtotal(items) {
  return items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0,
  );
}

function calculateTax(subtotal) {
  return subtotal * 0.18;
}

function checkout(cart) {
  const subtotal =
    calculateSubtotal(cart.items);

  const tax = calculateTax(subtotal);

  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}`})})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Move Responsibility`}),(0,c.jsx)(`h2`,{children:`Put behavior where its knowledge belongs`}),(0,c.jsx)(`p`,{children:`Refactoring often involves moving logic out of a component, service, or utility that has accumulated responsibilities belonging to another concept.`})]}),(0,c.jsxs)(`div`,{className:`moveBox`,children:[(0,c.jsxs)(`div`,{className:`moveColumn`,children:[(0,c.jsx)(`span`,{className:`moveLabel`,children:`Before`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`UserPage
├── render UI
├── validate user
├── call API
├── format payload
└── handle persistence`})})]}),(0,c.jsx)(`div`,{className:`moveArrow`,children:(0,c.jsx)(e,{})}),(0,c.jsxs)(`div`,{className:`moveColumn`,children:[(0,c.jsx)(`span`,{className:`moveLabel`,children:`After`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`UserPage
└── coordinate UI

userValidator
└── validate user

userService
└── call API

userMapper
└── format payload`})})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Conditionals`}),(0,c.jsx)(`h2`,{children:`Simplify branching without hiding important rules`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Complex condition`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`if (
  user &&
  user.active === true &&
  user.role === "admin" &&
  user.permissions.includes("edit")
) {
  showEditor();
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Named decision`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`function canEditContent(user) {
  return (
    user?.active &&
    user.role === "admin" &&
    user.permissions.includes("edit")
  );
}

if (canEditContent(user)) {
  showEditor();
}`})}),(0,c.jsx)(`p`,{children:`The condition now communicates the business meaning behind the individual checks.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Dependency Cleanup`}),(0,c.jsx)(`h2`,{children:`Reduce unnecessary knowledge between modules`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Direct infrastructure dependency`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`class OrderService {
  async create(order) {
    const database =
      new MongoClient(connectionString);

    await database
      .db("shop")
      .collection("orders")
      .insertOne(order);
  }
}`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Focused dependency`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`class OrderService {
  constructor(orderRepository) {
    this.orderRepository =
      orderRepository;
  }

  async create(order) {
    return this.orderRepository.create(
      order,
    );
  }
}`})}),(0,c.jsx)(`p`,{children:`Application behavior no longer needs to manage low-level database setup directly.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Incremental Refactoring`}),(0,c.jsx)(`h2`,{children:`Prefer a series of safe changes over one large transformation`})]}),(0,c.jsxs)(`div`,{className:`steps`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`01`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Understand current behavior`}),(0,c.jsx)(`p`,{children:`Identify what the code currently guarantees before changing its structure.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`02`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Create a safety net`}),(0,c.jsx)(`p`,{children:`Use existing tests, add focused tests where useful, or verify important behavior manually.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`03`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Make one small structural change`}),(0,c.jsx)(`p`,{children:`Rename, extract, move, or simplify one responsibility at a time.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`04`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Verify behavior`}),(0,c.jsx)(`p`,{children:`Confirm that the software still behaves as expected before continuing.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`05`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Repeat`}),(0,c.jsx)(`p`,{children:`Continue in small steps until the targeted structural problem is resolved.`})]})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Refactoring vs Rewriting`}),(0,c.jsx)(`h2`,{children:`Improving existing code is different from replacing it`})]}),(0,c.jsxs)(`div`,{className:`rewriteGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(i,{}),(0,c.jsx)(`h3`,{children:`Refactoring`}),(0,c.jsxs)(`ul`,{children:[(0,c.jsx)(`li`,{children:`Usually incremental`}),(0,c.jsx)(`li`,{children:`Preserves behavior`}),(0,c.jsx)(`li`,{children:`Existing knowledge stays available`}),(0,c.jsx)(`li`,{children:`Risk can be controlled in small steps`}),(0,c.jsx)(`li`,{children:`Can happen continuously`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h3`,{children:`Rewrite`}),(0,c.jsxs)(`ul`,{children:[(0,c.jsx)(`li`,{children:`Replaces a substantial implementation`}),(0,c.jsx)(`li`,{children:`May recreate solved problems`}),(0,c.jsx)(`li`,{children:`Requires rediscovering edge cases`}),(0,c.jsx)(`li`,{children:`Often has a larger validation surface`}),(0,c.jsx)(`li`,{children:`Can create long parallel-development periods`})]})]})]}),(0,c.jsxs)(`div`,{className:`warningBox`,children:[(0,c.jsx)(`div`,{className:`warningIcon`,children:(0,c.jsx)(r,{})}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Do not rewrite only because existing code looks old.`}),(0,c.jsx)(`p`,{children:`A rewrite can be justified when the current architecture cannot reasonably support required change, but it carries different risks from incremental refactoring. Evaluate those tradeoffs deliberately.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Tests`}),(0,c.jsx)(`h2`,{children:`Tests can provide confidence that behavior remains stable`})]}),(0,c.jsxs)(`div`,{className:`testBox`,children:[(0,c.jsx)(i,{}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Refactoring becomes safer when important behavior is observable.`}),(0,c.jsx)(`p`,{children:`Tests are especially useful around business rules, transformations, calculations, public contracts, and areas being changed structurally.`})]})]}),(0,c.jsxs)(`div`,{className:`testGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Before refactoring`}),(0,c.jsx)(`p`,{children:`Confirm that existing tests pass and understand what behavior they protect.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`During refactoring`}),(0,c.jsx)(`p`,{children:`Run focused tests after small structural changes.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`After refactoring`}),(0,c.jsx)(`p`,{children:`Run the broader relevant test suite and verify important user workflows.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Avoid Over-Refactoring`}),(0,c.jsx)(`h2`,{children:`Do not redesign stable code without a useful reason`})]}),(0,c.jsxs)(`div`,{className:`warningBox`,children:[(0,c.jsx)(`div`,{className:`warningIcon`,children:(0,c.jsx)(o,{})}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Improvement should solve an actual maintenance problem.`}),(0,c.jsx)(`p`,{children:`Repeatedly restructuring working code without a clear benefit can create churn, merge conflicts, new defects, and unnecessary review cost.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Review Checklist`}),(0,c.jsx)(`h2`,{children:`Questions to ask before and during refactoring`})]}),(0,c.jsxs)(`div`,{className:`checklist`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`What structural problem am I solving?`}),(0,c.jsx)(`p`,{children:`Refactoring should have a clear maintainability or design goal.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Do I understand the current behavior?`}),(0,c.jsx)(`p`,{children:`Preserve behavior intentionally rather than assuming what the code does.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Can the change be made in smaller steps?`}),(0,c.jsx)(`p`,{children:`Incremental transformations usually reduce risk.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Is there a useful safety net?`}),(0,c.jsx)(`p`,{children:`Tests or deliberate verification help detect unintended behavior changes.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Does the result become easier to understand?`}),(0,c.jsx)(`p`,{children:`Refactoring should reduce complexity rather than simply move it.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Am I introducing unnecessary abstraction?`}),(0,c.jsx)(`p`,{children:`Structural improvement does not require maximizing the number of layers.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Would a rewrite actually be justified?`}),(0,c.jsx)(`p`,{children:`Do not discard working behavior without understanding the cost and risk.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Did observable behavior remain correct?`}),(0,c.jsx)(`p`,{children:`Verify the software after completing structural changes.`})]})]})]}),(0,c.jsxs)(`section`,{className:`takeaway`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Key Takeaway`}),(0,c.jsx)(`h2`,{children:`Improve structure in small steps while protecting behavior.`}),(0,c.jsx)(`p`,{children:`Effective refactoring makes future changes easier without introducing unnecessary product changes. Understand existing behavior, make focused structural improvements, verify continuously, and stop when the code is clear enough for the real needs of the system.`})]})]});export{l as default};