# RFC-XXXX — [Proposal Title]

**Status:** `Draft` | `Under Review` | `Approved` | `Rejected`
**Author:** [Your name] ([@github](https://github.com/your-username))
**Date:** YYYY-MM-DD
**Target version:** v4.x.0

---

## Summary

One line explaining what you propose to add or change in the NEXUS protocol.

---

## Motivation

What real problem does this proposal solve?

Why does the current syntax not solve it?

Who benefits? In which industry or use case?

---

## Proposed Syntax

```nexus
[Example of what the new operator or feature would look like]
```

Explain each part of the proposed syntax.

---

## Semantic Rules

- Rule 1: when the operator is valid
- Rule 2: when it is invalid
- Rule 3: how it interacts with other operators
- Edge cases and how they are handled

---

## Valid Examples

```nexus
// Example 1 — basic use case
...

// Example 2 — advanced use case
...
```

## Invalid Examples

```nexus
// ❌ Invalid — why it fails
...

// ❌ Invalid — another failure case
...
```

---

## Protocol Impact

**Does it break backward compatibility?**
Yes / No — explanation

**Does it affect the validator (`core/validator.ts`)?**
Yes / No — what would change

**Does it affect the system prompt builder (`context/builder.ts`)?**
Yes / No — what would change

**Does it affect the grammar (`core/grammar.ts`)?**
Yes / No — what would change

---

## Alternatives Considered

### Alternative A: [name]
```nexus
// Alternative syntax
```
**Why it was rejected:** ...

### Alternative B: [name]
**Why it was rejected:** ...

---

## Real-World Use Cases

Minimum 2 real-world examples that justify the proposal:

**Case 1: [description]**
```nexus
// NEXUS code using the new operator
```

**Case 2: [description]**
```nexus
// NEXUS code using the new operator
```

---

## Test Proposal

```typescript
// Test cases that would cover the new functionality
describe('RFC-XXXX: NewOperator', () => {
  test('basic valid case', () => {
    // ...
  })
  test('invalid case — expected error', () => {
    // ...
  })
})
```

---

## Checklist

- [ ] Proposed syntax does not conflict with existing operators
- [ ] Includes at least 2 valid examples
- [ ] Includes at least 2 invalid examples
- [ ] Includes test proposal
- [ ] Documents impact on validator, builder, and grammar
- [ ] Describes at least 2 real-world use cases

---

*To create a new RFC, copy this file and rename it `RFC-XXXX-short-name.md`.*
*Open an issue with the `[RFC]` prefix before submitting a PR.*
