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
[![Tests](https://img.shields.io/badge/tests-241%20passing-brightgreen?style=flat-square)]()
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

## CLI

```bash
npm install -g nxlang

# Configures NEXUS for your project and your AI tool
nexus init

# Verify that generated code implements the blueprint
nexus verify ./my-component.nexus ./src
nexus verify ./my-component.nexus ./src --json
```

`nexus init` generates two files automatically:
- `NEXUS.md` — complete protocol grammar reference
- The AI-specific complement file (skill, .cursorrules, custom instructions, etc.)

`nexus verify` scans the generated code directory and reports which blueprint contract items are implemented and which are missing.

Compatible with **Claude Code**, **Cursor**, **ChatGPT**, **Gemini**, and any AI.

## The Grammar

- [Full grammar reference](./docs/en/grammar.md)
- [Operator dictionary](./docs/en/operators.md)
- [Real-world examples](./docs/en/examples.md)

## Library API

### Validation

```typescript
import { validateNexus } from 'nxlang'
import type { ValidationError } from 'nxlang'

const errors: ValidationError[] = validateNexus(fileContent)
if (errors.length === 0) {
  console.log('Valid NEXUS syntax')
} else {
  errors.forEach(e => console.error(`Line ${e.line}: ${e.message}`))
}
```

### Prompt generation

```typescript
import { buildPrompt, buildSystemPrompt, buildDefaultGrammarReference } from 'nxlang'
import type { NexusProvider } from 'nxlang'

// Full prompt for NEXUS.md (grammar + examples + instructions)
const nexusMd = buildPrompt({ modules: ['frontend', 'backend', 'testing'] })

// System prompt ready to pass to your AI model API
// provider: 'llm' | 'gpt' | 'gemini'
const systemPrompt = buildSystemPrompt(config, 'llm')

// Just the syntax reference — embed in SKILL.md or .cursorrules
const grammarRef = buildDefaultGrammarReference()
```

### Contract verification

```typescript
import { extractContract, verifyContract } from 'nxlang'
import type { ContractItem, VerifyResult } from 'nxlang'
import fs from 'fs'

// Extract verifiable items from blueprint
const items: ContractItem[] = extractContract(blueprintContent)
// items: [{ type: 'auth', declaration: '@Auth[mode:jwt]', line: 3 }, ...]

// Verify that generated code implements them
const codeFiles = new Map([
  ['src/auth.guard.ts', fs.readFileSync('src/auth.guard.ts', 'utf-8')],
])
const results: VerifyResult[] = verifyContract(items, codeFiles, packageJson)
results.forEach(r => {
  console.log(`${r.found ? '✓' : '✗'} [${r.item.type}] ${r.item.declaration}`)
})
```

### Configuration

```typescript
import { createDefaultConfig } from 'nxlang'
import type { NexusConfig } from 'nxlang'

const config: NexusConfig = createDefaultConfig({
  lang: 'en',
  modules: ['frontend', 'backend'],
  framework: 'next-ts',
  styling: 'tailwind',
  backend: { framework: 'nestjs', database: 'postgresql', orm: 'prisma' }
})
```

### Grammar data

```typescript
import { NEXUS_VERSION, NEXUS_OPERATORS, NEXUS_MODULES } from 'nxlang'
import type { NexusOperator, NexusModule } from 'nxlang'

console.log(NEXUS_VERSION) // '4.3.0'

// For syntax highlighting or autocomplete in your editor
NEXUS_OPERATORS.forEach((op: NexusOperator) => {
  console.log(`${op.symbol} — ${op.description}`)
})

// Filter active modules based on project stack
const modules: NexusModule[] = NEXUS_MODULES.filter(m =>
  ['frontend', 'backend'].includes(m.id)
)
```

## Ecosystem

| Tool | Description |
|---|---|
| [Prism](https://github.com/open-souse/prism) | AI-native code editor powered by nxlang |

## AI Skills

Run `nexus init` to configure NEXUS for your AI tool. It generates two files automatically:
- `NEXUS.md` — complete protocol grammar reference
- The AI-specific complement for your tool

| AI | Generated file |
|---|---|
| Claude Code | `.claude/skills/nexus/SKILL.md` |
| Cursor | `.cursorrules` |
| ChatGPT | `custom-instructions.md` |
| Gemini | `gemini-context.md` |
| Other | `AI-INSTRUCTIONS.md` |

## Roadmap

[See full roadmap](./docs/en/roadmap.md)

- [x] v4.0.0 — Modular core, Library-First, 90 tests, defensive security
- [x] v4.1.0 — !error handler, [paginate], model relations, complete bilingual documentation
- [x] v4.1.1 — Quality: orchestrator validation, deep merge, API consistency
- [x] v4.1.2 — Security: control characters, per-line bracket validation
- [x] v4.2.0 — Assertion operator (`!!`) — explicit preconditions for `=>` actions
- [x] v4.3.0 — Unified `nexus init` — configures NEXUS for any AI in one command
- [x] v4.3.1 — `from` operator (alias for `<`), `nexus verify`, contract verification API
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
