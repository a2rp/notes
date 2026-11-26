import{F as e,G as t,Pt as n,f as r,gt as i,i as a,m as o}from"./index-COQIkgJQ.js";var s={scope:`_scope_1crwo_1`,pageHeader:`_pageHeader_1crwo_17`,label:`_label_1crwo_27`,introGrid:`_introGrid_1crwo_91`,section:`_section_1crwo_159`,sectionHeader:`_sectionHeader_1crwo_175`,sectionLabel:`_sectionLabel_1crwo_185`,takeaway:`_takeaway_1crwo_203`,compareGrid:`_compareGrid_1crwo_233`,exampleGrid:`_exampleGrid_1crwo_235`,exampleLabel:`_exampleLabel_1crwo_287`,riskGrid:`_riskGrid_1crwo_351`,fitGrid:`_fitGrid_1crwo_353`,warningGrid:`_warningGrid_1crwo_355`,checklist:`_checklist_1crwo_357`,behaviorBox:`_behaviorBox_1crwo_483`,behaviorText:`_behaviorText_1crwo_513`,noteBox:`_noteBox_1crwo_555`},c=n(),l=()=>(0,c.jsxs)(`div`,{className:`${s.scope} pageCompositionOverInheritance`,children:[(0,c.jsxs)(`header`,{className:`pageHeader`,children:[(0,c.jsxs)(`div`,{className:`label`,children:[(0,c.jsx)(e,{}),(0,c.jsx)(`span`,{children:`Design Principle`})]}),(0,c.jsx)(`h1`,{children:`Composition over Inheritance`}),(0,c.jsx)(`p`,{children:`Composition over Inheritance encourages building behavior by combining smaller focused parts instead of creating deep inheritance hierarchies. Composition often provides clearer dependencies and more flexible behavior.`})]}),(0,c.jsxs)(`section`,{className:`introGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(i,{}),(0,c.jsx)(`h2`,{children:`Combine focused behavior`}),(0,c.jsx)(`p`,{children:`Small responsibilities can be composed together to create richer behavior without forcing every variation into one class hierarchy.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(t,{}),(0,c.jsx)(`h2`,{children:`Avoid rigid inheritance trees`}),(0,c.jsx)(`p`,{children:`Deep inheritance can make behavior depend on several parent classes and make changes harder to reason about.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(r,{}),(0,c.jsx)(`h2`,{children:`Make dependencies explicit`}),(0,c.jsx)(`p`,{children:`Composition usually shows which capabilities an object uses instead of receiving behavior indirectly through ancestry.`})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Core Idea`}),(0,c.jsx)(`h2`,{children:`Build complex behavior from smaller responsibilities`}),(0,c.jsx)(`p`,{children:`Inheritance models an "is-a" relationship. Composition models a "has-a" or "uses-a" relationship. Many application behaviors fit composition more naturally because they combine several independent capabilities.`})]}),(0,c.jsxs)(`div`,{className:`compareGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Inheritance`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`class Employee {
  work() {}
}

class Manager extends Employee {
  approveBudget() {}
}

class TechnicalManager extends Manager {
  writeCode() {}
}`})}),(0,c.jsx)(`p`,{children:`Behavior is inherited through a hierarchy. A child receives the assumptions and responsibilities of every parent above it.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(o,{}),(0,c.jsx)(`h3`,{children:`Composition`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`const technicalManager = {
  work: workBehavior,
  approveBudget: budgetBehavior,
  writeCode: codingBehavior,
};`})}),(0,c.jsx)(`p`,{children:`Capabilities are combined directly according to what the object actually needs.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Inheritance Risks`}),(0,c.jsx)(`h2`,{children:`Deep hierarchies can create hidden coupling`})]}),(0,c.jsxs)(`div`,{className:`riskGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`01`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Parent changes affect descendants`}),(0,c.jsx)(`p`,{children:`A modification to a base class can unexpectedly alter behavior in several subclasses.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`02`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Children inherit unnecessary behavior`}),(0,c.jsx)(`p`,{children:`A subclass may receive methods or assumptions that do not fit its actual responsibility.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`03`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Behavior can become difficult to trace`}),(0,c.jsx)(`p`,{children:`Understanding one method may require inspecting multiple levels of inheritance.`})]})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{children:`04`}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`New combinations become awkward`}),(0,c.jsx)(`p`,{children:`A hierarchy often struggles when a new type needs behavior from different branches.`})]})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Composition Example`}),(0,c.jsx)(`h2`,{children:`Inject capabilities instead of inheriting them`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Inheritance-based design`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`class FileLogger extends Logger {
  write(message) {
    // File implementation
  }
}

class UserService extends FileLogger {
  createUser(user) {
    this.write("User created");
  }
}`})}),(0,c.jsx)(`p`,{children:"`UserService` becomes a kind of logger even though logging is only one dependency it uses."})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Composition-based design`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`class UserService {
  constructor(logger) {
    this.logger = logger;
  }

  createUser(user) {
    this.logger.write("User created");
  }
}`})}),(0,c.jsx)(`p`,{children:"Logging is an explicit dependency and can be replaced without changing what `UserService` represents."})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Behavior Composition`}),(0,c.jsx)(`h2`,{children:`Small capabilities can create several useful combinations`})]}),(0,c.jsxs)(`div`,{className:`behaviorBox`,children:[(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`const canRead = {
  read() {
    return "Reading";
  },
};

const canWrite = {
  write() {
    return "Writing";
  },
};

const canShare = {
  share() {
    return "Sharing";
  },
};

const viewer = {
  ...canRead,
};

const editor = {
  ...canRead,
  ...canWrite,
};

const owner = {
  ...canRead,
  ...canWrite,
  ...canShare,
};`})}),(0,c.jsxs)(`div`,{className:`behaviorText`,children:[(0,c.jsx)(`h3`,{children:`Capabilities remain independent.`}),(0,c.jsx)(`p`,{children:`Different objects can receive the exact combination of behavior they need without creating a subclass for every possible variation.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`React`}),(0,c.jsx)(`h2`,{children:`React naturally favors composition`}),(0,c.jsx)(`p`,{children:`React components commonly build larger interfaces by combining smaller components through props and children rather than using component inheritance.`})]}),(0,c.jsxs)(`div`,{className:`exampleGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Reusable shell`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};`})})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`span`,{className:`exampleLabel`,children:`Composed content`}),(0,c.jsx)(`pre`,{children:(0,c.jsx)(`code`,{children:`<Card>
  <UserAvatar />
  <UserName />
  <UserActions />
</Card>`})}),(0,c.jsx)(`p`,{children:`The card provides structure while separate components provide the behavior and content needed by a specific use case.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`When Inheritance Fits`}),(0,c.jsx)(`h2`,{children:`Inheritance is not automatically wrong`})]}),(0,c.jsxs)(`div`,{className:`noteBox`,children:[(0,c.jsx)(o,{}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{children:`Use inheritance when the relationship is genuinely stable.`}),(0,c.jsx)(`p`,{children:`Inheritance can be appropriate when a subtype truly satisfies the contract of its parent and the hierarchy represents a meaningful domain relationship rather than a shortcut for code reuse.`})]})]}),(0,c.jsxs)(`div`,{className:`fitGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Reasonable inheritance`}),(0,c.jsx)(`p`,{children:`A specialized type genuinely behaves as the parent type and can safely be substituted wherever the parent is expected.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Prefer composition`}),(0,c.jsx)(`p`,{children:`The object only needs one capability from another type or needs a combination of several independent behaviors.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Reasonable inheritance`}),(0,c.jsx)(`p`,{children:`The hierarchy is shallow, stable, and communicates an obvious domain relationship.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Prefer composition`}),(0,c.jsx)(`p`,{children:`New requirements frequently require mixing capabilities that do not fit one inheritance branch.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Warning Signs`}),(0,c.jsx)(`h2`,{children:`Signals that inheritance may be doing too much`})]}),(0,c.jsxs)(`div`,{className:`warningGrid`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Deep hierarchy`}),(0,c.jsx)(`p`,{children:`Understanding a class requires reading several parent classes.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Empty overrides`}),(0,c.jsx)(`p`,{children:`Subclasses repeatedly disable methods that do not apply to them.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Behavioral flags`}),(0,c.jsx)(`p`,{children:`Parent classes contain conditionals to handle many different subclass variations.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(a,{}),(0,c.jsx)(`h3`,{children:`Forced relationships`}),(0,c.jsx)(`p`,{children:`Inheritance exists mainly to reuse code rather than because the child truly represents the parent type.`})]})]})]}),(0,c.jsxs)(`section`,{className:`section`,children:[(0,c.jsxs)(`div`,{className:`sectionHeader`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Review Checklist`}),(0,c.jsx)(`h2`,{children:`Questions to ask before choosing inheritance`})]}),(0,c.jsxs)(`div`,{className:`checklist`,children:[(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Is this genuinely an "is-a" relationship?`}),(0,c.jsx)(`p`,{children:`The child should represent the parent concept rather than simply reuse some of its code.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Can the subtype safely replace the parent?`}),(0,c.jsx)(`p`,{children:`If callers must treat the child differently, the hierarchy may be incorrect.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Does the child need all inherited behavior?`}),(0,c.jsx)(`p`,{children:`Unused or invalid parent methods indicate a weak relationship.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Could this behavior be injected or composed instead?`}),(0,c.jsx)(`p`,{children:`A focused dependency may communicate the relationship more clearly.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Will new combinations fit the hierarchy?`}),(0,c.jsx)(`p`,{children:`Composition usually handles independent capabilities more flexibly.`})]}),(0,c.jsxs)(`article`,{children:[(0,c.jsx)(`strong`,{children:`Is inheritance being used only for code reuse?`}),(0,c.jsx)(`p`,{children:`Shared code alone is not enough reason to create a type relationship.`})]})]})]}),(0,c.jsxs)(`section`,{className:`takeaway`,children:[(0,c.jsx)(`span`,{className:`sectionLabel`,children:`Key Takeaway`}),(0,c.jsx)(`h2`,{children:`Prefer combining focused capabilities over building rigid hierarchies.`}),(0,c.jsx)(`p`,{children:`Composition keeps dependencies explicit and allows behavior to be combined according to real needs. Use inheritance when it represents a genuine substitutable type relationship, not simply as a shortcut for reuse.`})]})]});export{l as default};