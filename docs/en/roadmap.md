<p align="center">
  <img src="../../assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <a href="../es/roadmap.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# NEXUS Protocol Roadmap

## Philosophy

NEXUS grows with the community. Future versions are based on:

1. Real problems reported by users
2. Proposals approved via RFC
3. Needs from new industries and use cases

The protocol doesn't chase features. It chases precision.

---

## Version History

### v4.0.0 — Modular Core ✅

Released: May 2026

- Library-First architecture (`core/`, `context/`, `cli/`)
- Defensive security: 500KB limit, 2000 lines, null bytes, string-aware tokenizer
- 90 tests, suite in ~1 second
- Public API: `validateNexus()`, `buildSystemPrompt()`, `createDefaultConfig()`
- Multi-provider support: GPT, Gemini, and major LLMs
- CLI: `nexus init`

### v4.1.0 — Protocol Extensions ✅

Released: May 2026

- `!error:code -> route` operator for explicit error handling under `=>`
- `[paginate:N]` operator for native pagination with automatic controls
- `-> Model.Name [modifier]` syntax for database model relations
- Complete bilingual documentation (Spanish/English)
- `docs/` folder with grammar, operators, examples, roadmap, RFC template
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`

### v4.1.1 — Quality ✅

Released: May 2026

- PascalCase orchestrator validation against the full known set
- UI orchestrator expansion (`Card`, `Button`, `Text`, `Image`, `Input`, etc.)
- Deep merge in `createDefaultConfig` — partial overrides don't lose sibling defaults
- `NEXUS_VERSION` as single source of truth in `grammar.ts`
- Escaped quotes in strings (`\"`, `\'`) without false positives

### v4.1.2 — Security ✅

Released: May 2026

- Block control characters U+0001–U+001F before processing
- Per-line bracket balance validation (must open and close on the same line)

### v4.2.0 — Assertion Operator ✅

Released: May 2026

- `!!` operator for declaring explicit preconditions before `=>` actions
- Two forms: `!! "description"` (semantic guard) and `!! expression` (logical guard)
- 8 new tests covering all assertion operator cases

### v4.3.0 — Unified `nexus init` ✅

Released: May 2026

- `nexus init` redesigned — asks which AI the developer uses, generates two files automatically
- Skills architecture: `skills/base/` (neutral grammar) + `skills/{ai}/` (AI-specific complement)
- Compatible with Claude Code, Cursor, ChatGPT, Gemini, and any AI
- Removed commands: `nexus validate`, `nexus install`, `nexus context`

### v4.3.1 — `from` Operator and Contract Verification ✅

Released: May 2026

- `from` operator — readable alias for `<` (`Table from User [paginate:20]` ≡ `Table < User [paginate:20]`)
- `!error:` now valid under `<`/`from` in addition to `=>` — fixes dashboard.nexus and similar cases
- `nexus verify` command — verifies that generated code implements the blueprint
- Public API: `extractContract()`, `verifyContract()`, `ContractItem`, `VerifyResult`
- `buildDefaultGrammarReference()` exported — single source of truth for skills and NEXUS.md
- 59 new tests — total: 241 tests
- Security: eliminated all ReDoS vulnerabilities in `verifier.ts`

---

## Upcoming Versions

### v4.5.0 — Semantic Engine

No fixed date — requires ecosystem maturity.

- Detection of impossible architectures before generating code
- CLI Doctor: NEXUS project diagnostics with suggestions
- Anti-pattern detection at validation time

### v5.0.0 — NEXUS LSP

Long term — requires established ecosystem.

- NEXUS Language Server Protocol for native editor integration
- Syntax highlighting, autocomplete, and real-time validation in VS Code, JetBrains, Neovim
- Requires the community to build it on top of `core/`

---

## Out of Scope for nxlang

These features are **NOT** on the `nxlang` roadmap:

| Out of scope | Why |
|---|---|
| Generating code directly | That's [Prism](https://github.com/open-souse/prism) |
| Becoming a compiler | NEXUS is a protocol, not a compiler |
| Replacing existing languages | NEXUS describes intentions, not implementations |
| Browser runtime | The core is Node.js — embedded in tools |

---

## How to Propose Changes

1. Open an issue with the `[RFC]` prefix
2. Use the [RFC template](./rfcs/RFC-0001-template.md)
3. The community discusses for a minimum of 14 days
4. Edwin Realpe (protocol guardian) approves or rejects
5. If approved, it's implemented in the next minor version

→ [See full RFC process](./rfcs/RFC-0001-template.md)

---

## The Next Leap — SDD (Software Design by Declaration)

### What is SDD?

SDD is the natural evolution of the NEXUS protocol. While the current version allows describing components, endpoints and flows with precision, SDD extends that capability toward something more ambitious: describing complete software design decisions.

The core idea is that a developer can express not just *what to build*, but *how it should be designed* — architecture, patterns, contracts between systems, consistency rules — in a way that AI can implement with total coherence throughout the entire project.

### The problem it solves

Today, even with NEXUS, every AI session starts from zero in terms of architectural decisions. SDD proposes that those decisions are declared once and respected always.

### Current status

Under research. No syntax has been defined yet — that's a decision we'll make together with the community when the time comes.

### How to participate

If you have ideas about what SDD could look like, open an RFC:
→ [RFC Template](./rfcs/RFC-0001-template.md)

The protocol grows with the community.
