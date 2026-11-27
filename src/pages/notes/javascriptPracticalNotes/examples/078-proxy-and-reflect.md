# 78 - Proxy and Reflect example

This example creates a validated profile proxy, forwards reads and writes with Reflect, wraps a function call and constructor, and demonstrates revocation and an invariant error.

## Goal

See how ordinary property access can invoke a Proxy trap, how Reflect forwards the operation, and which proxy rules the runtime enforces.

## Complete example

Copy this into **78-proxy-reflect.mjs** and run it with a modern JavaScript runtime.

~~~js
const profileData = {
  name: 'Asha',
  score: 10
};

const profile = new Proxy(profileData, {
  get(target, property, receiver) {
    console.log('get:', String(property));

    if (property === 'label') {
      return Reflect.get(target, 'name', receiver).toUpperCase();
    }

    return Reflect.get(target, property, receiver);
  },

  set(target, property, value, receiver) {
    console.log('set:', String(property));

    if (
      property === 'score'
      && (typeof value !== 'number' || !Number.isFinite(value) || value < 0)
    ) {
      throw new TypeError('score must be a finite non-negative number');
    }

    return Reflect.set(target, property, value, receiver);
  }
});

console.log('Label:', profile.label);

profile.score = 12;
console.log('Score after assignment:', profile.score);

const writeSucceeded = Reflect.set(profile, 'score', 15);
console.log('Reflect.set succeeded:', writeSucceeded);
console.log('Score after Reflect.set:', Reflect.get(profile, 'score'));

try {
  profile.score = -1;
} catch (error) {
  console.log('Invalid score:', error.name);
}

profileData.score = 18;
console.log('Score after direct target change:', profile.score);

console.log('Reflect.has score:', Reflect.has(profile, 'score'));
console.log('Own keys:', Reflect.ownKeys(profile).join(', '));

const multiplyByTwo = new Proxy(
  function (value) {
    return value * 2;
  },
  {
    apply(target, thisValue, argumentsList) {
      console.log('call:', argumentsList[0]);
      return Reflect.apply(target, thisValue, argumentsList);
    }
  }
);

console.log('Function result:', multiplyByTwo(6));

class Task {
  constructor(title) {
    this.title = title;
  }
}

const TrackedTask = new Proxy(Task, {
  construct(target, argumentsList, newTarget) {
    console.log('construct:', argumentsList[0]);
    return Reflect.construct(target, argumentsList, newTarget);
  }
});

const task = new TrackedTask('Review');
console.log('Task title:', task.title);
console.log('Task is Task:', task instanceof Task);

const revocable = Proxy.revocable(
  { status: 'active' },
  {}
);

console.log('Revocable value:', revocable.proxy.status);
revocable.revoke();

try {
  console.log(revocable.proxy.status);
} catch (error) {
  console.log('Revoked read:', error.name);
}

const fixedTarget = {};

Object.defineProperty(fixedTarget, 'id', {
  value: 7,
  writable: false,
  configurable: false
});

const inconsistentProxy = new Proxy(fixedTarget, {
  get() {
    return 0;
  }
});

try {
  console.log(inconsistentProxy.id);
} catch (error) {
  console.log('Invariant read:', error.name);
}
~~~

## Expected output

~~~text
get: label
Label: ASHA
set: score
get: score
Score after assignment: 12
set: score
Reflect.set succeeded: true
get: score
Score after Reflect.set: 15
set: score
Invalid score: TypeError
get: score
Score after direct target change: 18
Reflect.has score: true
Own keys: name, score
call: 6
Function result: 12
construct: Review
Task title: Review
Task is Task: true
Revocable value: active
Revoked read: TypeError
Invariant read: TypeError
~~~

## How it works

### The profile proxy validates writes

The handler implements get and set. Reading **profile.label** invokes get, which supplies a computed value based on the target's name. Other reads are forwarded with Reflect.get.

The set trap rejects a score that is not a finite, non-negative number. Valid writes are forwarded with Reflect.set, and the trap returns its Boolean result. Both ordinary assignment and Reflect.set on the proxy invoke this trap.

### Receiver forwarding keeps access behavior

Reflect.get and Reflect.set receive the receiver from their traps. This preserves accessor and inherited-property behavior. When the target is an ordinary object, forwarding set with the proxy as receiver may use the proxy's default defineProperty behavior to update the target.

### Direct target access bypasses the handler

Changing profileData.score writes directly to the target and does not invoke the proxy's set trap. A later read through profile still invokes get and sees the changed target value. Keep the target private if every write must pass through validation.

### Reflect exposes operations explicitly

Reflect.has performs a membership check, and Reflect.ownKeys returns the target's own property keys. Neither requires a custom trap in this handler, so the proxy forwards them by default.

The call proxy intercepts a function call with apply and forwards using Reflect.apply. The constructor proxy intercepts new with construct and forwards the arguments and newTarget through Reflect.construct.

### Revocation and invariants

After revoke is called, reading through the revocable proxy throws a TypeError. Revocation does not erase the target or values already read.

The final proxy attempts to return a different value for a non-configurable, non-writable property. The runtime rejects that result with a TypeError because it violates a Proxy invariant.

## Try these changes

1. Read profile.name and note that get logs the operation.
2. Assign a valid score, then try a negative number, NaN, and Infinity.
3. Change profileData.score directly and confirm that the proxy does not log a set operation.
4. Change the computed label behavior and observe that it does not create a stored target property.
5. Add a has trap and compare its result with Reflect.has.
6. Add an ownKeys trap only if you can keep it consistent with the target's descriptors.
7. Change multiplyByTwo to log both arguments and return Reflect.apply's result.
8. Add validation to TrackedTask's construct trap and continue forwarding newTarget.
9. Try reading the revoked proxy a second time and handle the error.
10. Change the locked property's descriptor and observe when the get result becomes valid.

## Important boundaries

- The proxy and its target have different identities.
- Target operations made directly do not pass through the proxy.
- A proxy does not automatically make private-field instances or built-in objects transparent.
- Traps must obey descriptor, extensibility, and prototype invariants.
- Revocation stops future operations through that proxy but does not undo earlier work.
- Reflect forwards operations; it does not bypass a proxy when the supplied target is itself a proxy.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| --- | --- | --- | --- |
| [77 - Intl and locale-aware formatting](../lessons/077-intl-and-locale-aware-formatting.md) | [Open lesson](../lessons/078-proxy-and-reflect.md) | [Open Q&A](../qnas/078-proxy-and-reflect.md) | [79 - Memory, garbage collection, and weak references](../lessons/079-memory-garbage-collection-and-weak-references.md) |
