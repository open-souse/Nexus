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
- Multi-provider support: Claude, GPT, Gemini
- CLI: `nexus init`, `nexus validate`

### v4.1.0 — Protocol Extensions ✅

Released: May 2026

- `!error:code -> route` operator for explicit error handling under `=>`
- `[paginate:N]` operator for native pagination with automatic controls
- `-> Model.Name [modifier]` syntax for database model relations
- Complete bilingual documentation (Spanish/English)
- `docs/` folder with grammar, operators, examples, roadmap, RFC template
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`

---

## Upcoming Versions

### v4.2.0 — Community Driven

No fixed date — released when enough approved RFCs accumulate.

Possible inclusions (subject to RFC approval):
- Protocol extensions proposed by the community
- Support for new industries based on real adoption
- Validator improvements based on reported errors

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
