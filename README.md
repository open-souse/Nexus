# NEXUS: The Human-AI Language Protocol

[![npm version](https://img.shields.io/npm/v/nxlang.svg)](https://www.npmjs.com/package/nxlang)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**Stop writing "prompts". Start writing intentions.**

NEXUS is a structured, AI-native shorthand designed to eliminate the ambiguity of natural language. Version 4.0 transforms NEXUS from a simple CLI into a **high-performance core library** designed to power the next generation of AI-native IDEs (like NEXUS Studio).

---

## 🚀 Version 4.0: The IDE-Ready Core

Nexus has pivoted. We've stripped away the CLI clutter to focus on being the most robust **Human-AI Communication Layer** for both Frontend and Backend development.

### Key Enhancements:
- **Elite Backend Support**: Complete grammar for models, controllers, services, and workers.
- **Library-First Architecture**: Designed to be imported into web editors and IDEs.
- **Provider-Aware Prompts**: Built-in support for generating system prompts for Claude, GPT-4, and Gemini.
- **Filesystem Native**: Optimized for tools like Claude Code, Cursor, and Copilot.

---

## 📦 Installation

```bash
# Use as a global CLI
npm install -g nxlang

# Use as a library in your project
npm install nxlang
```

---

## 🛠️ Usage as a Library

NEXUS is now the engine behind **NEXUS Studio**. You can use it to build your own AI integrations:

```typescript
import { 
  buildSystemPrompt, 
  validateNexus, 
  createDefaultConfig 
} from 'nxlang';

// 1. Create a project DNA (Full-Stack Support)
const config = createDefaultConfig({
  framework: 'next-ts',
  backend: {
    framework: 'nestjs',
    database: 'postgresql',
    orm: 'prisma'
  }
});

// 2. Build a provider-optimized prompt (Claude, GPT, Gemini)
const prompt = buildSystemPrompt(config, 'claude');

// 3. Validate NEXUS syntax on the fly
const errors = validateNexus('@React Page Home');
```

---

## 💬 The NEXUS Grammar (v4.0)

| Operator | Meaning | Example |
|---|---|---|
| `!pk` | **Primary Key** | `Entity id type:uuid !pk` |
| `@Auth` | **Authentication** | `@Auth[mode:jwt]` |
| `@RateLimit` | **Rate Limiting** | `@RateLimit[100/min]` |
| `->` | **Relations / Navigation** | `Relation posts -> Post * N` |
| `=>` | **Logic / Side-effects** | `Action save() => DB.save()` |
| `??` | **Natural Query** | `?? "How to optimize this query?"` |
| `@modify` | **Safe Edit** | `@modify [preserve:all]` |

### Advanced Orchestrators:
- **Frontend**: `Page`, `Layout`, `Section`, `Store`
- **Backend**: `Model`, `Controller`, `Service`, `Worker`, `Queue`, `CronJob`
*Para una referencia completa, consulta [NEXUS-Grammar.md](./NEXUS-Grammar.md)*

---

## ⌨️ CLI Commands

| Command | Description |
|---|---|
| `nexus init` | Initialize your project DNA (`nexus.config.json`) |
| `nexus context` | Generate `NEXUS.md` for universal AI integration |
| `nexus validate <file>` | Validate syntax of a `.nexus` file |

---

## 🗺️ Vision

NEXUS was born from the frustration of explaining complex structures to IAs. Today, it is a universal protocol that simplifies how humans and machines build full-stack software together.

**NEXUS Studio** is coming soon.

---

**MIT License** — Developed by [Edwin Realpe](https://github.com/edwinreal) / 2026 Ventures SAS
