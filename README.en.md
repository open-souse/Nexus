<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS Logo" width="100"/>
</p>

<p align="center">
  <a href="./README.md">🇪🇸 Español</a> · <strong>🇺🇸 English</strong>
</p>

# 🌐 NEXUS Protocol — nxlang

> The universal communication protocol between Humans and AI.

[![npm version](https://img.shields.io/npm/v/nxlang.svg?style=flat-square)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-154%20passing-brightgreen?style=flat-square)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square)]()

## The Problem

AI exists. It works. But communicating with it precisely is hard.

Natural language is ambiguous by design — what seems obvious to a human can have ten different interpretations for an AI. That produces inconsistent code, incorrect designs, and misunderstood processes.

This is not a model problem. It's a language problem.

## The Solution

NEXUS is a shorthand protocol designed for humans to communicate intentions to AI with total precision and zero ambiguity.

It's not a programming language. It doesn't replace JavaScript, Python, or any other language. It's the communication layer between what the human wants and what the AI generates.

```nexus
@React @Tailwind
Page Dashboard
  Layout SplitView
  Section Summary #glass
    Text "Revenue" !bold
    Chart < SalesData
  Section Orders
    Table < Order [paginate:20]
      !error:500 -> /error/server
```

Ten lines. Zero ambiguity. The AI knows exactly what to build.

## Why It Works

| Problem | Natural Language | NEXUS |
|---|---|---|
| Ambiguity | High | Zero |
| Tokens needed | 100+ lines | 8–12 lines |
| Consistency | Varies per session | Deterministic |
| Architectural rules | Implicit | Validated |
| Reuse | Copy-paste | `.nexus` files |

## Not Just Programming

NEXUS was designed for code but the problem it solves — ambiguity in AI communication — exists across all industries.

The community is expanding the protocol into design, marketing, business processes, legal, and more. If your industry has the problem, NEXUS can be the solution.

## Installation

```bash
# Global CLI
npm install -g nxlang

# Library for your tools
npm install nxlang
```

**Requirements:** Node.js ≥ 20.0.0

## CLI Commands

```bash
# Initialize NEXUS in your project
nexus init

# Validate your .nexus files — no side effects
nexus validate ./my-component.nexus

# Validate + install dependencies if validation passes (opt-in)
nexus validate ./my-component.nexus --install

# Preview what would be installed without installing
nexus install --dry-run

# Install dependencies from a .nexus file
nexus install my-component.nexus

# Install all dependencies detected in the directory
nexus install
```

### Explicit declaration in your file

```nexus
@install lodash
@install-dev typescript
@install -D eslint
```

## The Grammar

- [Full grammar reference](./docs/en/grammar.md)
- [Operator dictionary](./docs/en/operators.md)
- [Real-world examples](./docs/en/examples.md)

## Library API

```typescript
import { validateNexus, buildSystemPrompt, createDefaultConfig } from 'nxlang'

// Validate syntax
const errors = validateNexus(content)

// Generate system prompt for AI
const prompt = buildSystemPrompt(config)

// Create default config
const config = createDefaultConfig({ project: 'my-app', modules: ['frontend'] })
```

## Ecosystem

| Tool | Description |
|---|---|
| [Prism](https://github.com/open-souse/prism) | AI-native code editor powered by nxlang |

## Roadmap

[See full roadmap](./docs/en/roadmap.md)

- [x] v4.0.0 — Modular core, Library-First, 90 tests, defensive security
- [x] v4.1.0 — !error handler, [paginate], model relations, complete bilingual documentation
- [x] v4.1.1 — Quality: orchestrator validation, deep merge, API consistency
- [x] v4.1.2 — Security: control characters, per-line bracket validation
- [x] v4.2.0 — Assertion operator (`!!`) — explicit preconditions for `=>` actions
- [ ] v4.5.0 — Semantic engine, CLI Doctor (when there's real demand)
- [ ] SDD — Software Design by Declaration (active research, RFC open)

## Contributing

NEXUS is an open standard. Your contribution builds the future of Human-AI communication.

- [Contribution guide](./CONTRIBUTING.md)
- [Propose a protocol extension (RFC)](./docs/en/rfcs/RFC-0001-template.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)

```bash
git clone https://github.com/open-souse/Nexus.git
cd Nexus
npm install
npm run test
```

## License

MIT — Built by [Edwin Realpe](https://github.com/edwinreal) · [open-souse](https://github.com/open-souse) · 2026

> "The future of AI communication is not writing better prompts. It's having a protocol."
