<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS Logo" width="100"/>
</p>

<p align="center">
  <a href="./README.es.md">🇪🇸 Español</a> ·
  <a href="./README.en.md">🇺🇸 English</a>
</p>

# 🌐 NEXUS Protocol — nxlang

> The universal communication protocol between Humans and AI.

[![npm version](https://img.shields.io/npm/v/nxlang.svg?style=flat-square)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-121%20passing-brightgreen?style=flat-square)]()
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

# Validate your .nexus files
nexus validate ./my-component.nexus
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

- [x] **v4.0.0** — Modular core, Library-First, 121 tests, defensive security
- [x] **v4.1.0** — `!error` handler, `[paginate]`, model relations, complete documentation
- [ ] **v4.5.0** — Semantic engine, CLI Doctor (when the community asks for it)

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
