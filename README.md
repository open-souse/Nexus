# NEXUS: Human-AI Language Protocol

[![CI](https://github.com/edwinreal/Nexus-/actions/workflows/ci.yml/badge.svg)](https://github.com/edwinreal/Nexus-/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/nxlang.svg)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Stop writing "prompts". Start writing intentions.**

Just as programming languages simplified human-machine communication, NEXUS simplifies human-AI communication. A structured grammar that AI interprets exactly — no ambiguity, no distortion.

---

## The Problem

Communicating an idea to an AI in natural language is imprecise. The AI distorts, guesses, or asks constant clarifying questions. The result rarely matches what you envisioned on the first try.

**NEXUS is the abstraction layer.** A concise grammar the AI understands natively.

---

## Installation

```bash
npm install -g nxlang
```

> Requires Node.js >= 18

---

## How it works

### 1. Initialize your project

```bash
nexus init
```

NEXUS asks about your framework, colors, and icons, then generates a personalized `nexus.config.json` — the DNA of your project. The AI uses it as global context in every session.

### 2. Load the grammar into your AI tool

```bash
nexus context
```

Writes `CLAUDE.md` to your project root with the full NEXUS grammar and your project DNA. Claude Code reads this file automatically at session start — no copy/paste needed. Use `/nexus` inside Claude Code to refresh context mid-session.

### 3. Validate your files

```bash
nexus validate ./my-component.nexus
```

Checks syntax before sending it to the AI.

---

## Writing in NEXUS

Once the AI is induced, write directly in NEXUS syntax:

```nexus
@React #Tailwind
Card #glass
  Text "Hello World" !bold
  Button "Accept" #primary -> /dashboard
```

The AI delivers exact code following your DNA.

---

## Grammar v3.3

| Operator | Meaning | Example |
|---|---|---|
| `@` | Environment directives | `@React`, `@CleanCode` |
| `#` | Design Tokens / Styles | `Button #primary #glass` |
| `$` | Global Variables / DNA | `$brand: "Nexus"` |
| `~` | Local State / Reactivity | `~isOpen: false` |
| `\|` | Responsive / Adaptability | `Grid [cols:1 \| cols:3]` |
| `* N` | Element multiplier | `Card * 3` |
| `?` | UI States | `?loading`, `?error` |
| `!` | Priority / Emphasis | `Text !bold !danger` |
| `[locked]` | Protected component | `Navbar [locked]` |
| `[ ]` | Technical attributes | `Grid [cols:3]` |
| `[animate:]` | Animations | `Modal [animate: fade-in, duration: 200ms]` |
| `[hover:]` | Hover styles | `Card [hover: scale-105]` |
| `[a11y:]` | ARIA accessibility | `Button [a11y: aria-label="Close"]` |
| `->` | Navigation flow | `-> /dashboard` |
| `=>` | Side-effects / API | `=> login()` |
| `<` | Data binding / Types | `Table < User` |
| `{ }` | Context injection | `{ ./UserCard.tsx }` |
| `( cond ) -> A : B` | Conditional | `( ?auth ) -> Home : Login` |
| `@modify [preserve:all]` | Safe edit mode | AI delivers only the modified fragment |
| `?? "question"` | Query operator | Ask a question without leaving NEXUS mode |

See full grammar in [NEXUS-Grammar.md](./NEXUS-Grammar.md).

---

## CLI Commands

| Command | Description |
|---|---|
| `nexus init` | Initialize `nexus.config.json` with your project DNA |
| `nexus context` | Generate the AI language inductor prompt |
| `nexus lockdown` | Generate strict NEXUS-only mode prompt (blocks natural language) |
| `nexus learn` | Launch the Nexus Sensei interactive tutorial (5 levels) |
| `nexus validate <file>` | Validate the syntax of a `.nexus` file |
| `nexus scaffold` | Generate starter files and folder structure |
| `nexus examples list` | List available code blueprints |
| `nexus examples show <name>` | Display a blueprint |
| `nexus doctor` | Diagnose your configuration |
| `nexus update` | Check for a newer version on npm |
| `nexus config set <key> <value>` | Save global config |
| `nexus config show` | Display current global config |

---

## Works with

NEXUS is designed for coding tools with filesystem access:

- **Claude Code** ✓
- **Cursor** ✓
- **GitHub Copilot** ✓

> Plain chat (Claude.ai, ChatGPT web) can interpret NEXUS but cannot write files to disk.

---

## Use as a Library (NEXUS Studio / API integrations)

`nxlang` exports its core engine so NEXUS Studio and other tools can use it programmatically:

```bash
npm install nxlang
```

```typescript
import {
  buildContextPrompt,    // full NEXUS grammar prompt from a config
  buildSystemPrompt,     // provider-aware system prompt (claude | gpt | gemini)
  validateNexus,         // validate .nexus file content
  createDefaultConfig,   // factory for a valid NexusConfig with sensible defaults
  NEXUS_OPERATORS,       // structured grammar data for Monaco syntax highlighting
  NEXUS_MODULES,         // available modules with orchestrator lists
  NEXUS_BLUEPRINTS,      // starter blueprint registry
  NEXUS_VERSION,         // current grammar version string
} from 'nxlang'

// Build a system prompt for the Claude API
const config = createDefaultConfig({ framework: 'next-ts', styling: 'tailwind' })
const systemPrompt = buildSystemPrompt(config, 'claude')

// Build for GPT or Gemini
const gptPrompt = buildSystemPrompt(config, 'gpt')

// Validate a .nexus file before sending to AI
const errors = validateNexus(nexusFileContent)
if (errors.length === 0) {
  // safe to send
}
```

TypeScript types are included via `dist/lib.d.ts`.

---

## Local Development

```bash
git clone https://github.com/edwinreal/Nexus-.git
cd Nexus-
npm install
npm run build    # Compile TypeScript to dist/
npm test         # Run 95 tests
npm install -g . # Install CLI globally
```

---

## Vision

NEXUS started focused on frontend, but the vision is broader: become the standard for Human-AI communication across any domain. An open, universal language built by the community.

---

## Contributing

NEXUS is an open standard. Read [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to participate.

**MIT License** — Developed by [Edwin Realpe](https://github.com/edwinreal)
