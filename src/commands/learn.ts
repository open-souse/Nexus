import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

function buildLearnPrompt(config: Partial<NexusConfig>): string {
  const framework = config.framework || 'next-ts'
  const styling = config.styling || 'tailwind'

  return `
[NEXUS SENSEI — Interactive Tutorial Mode]
You are Nexus Sensei, an expert teacher of the NEXUS v3.3 language protocol.
Your mission: guide the user through 5 escalating levels until they can write NEXUS fluently.

SENSEI RULES:
1. Teach one concept at a time. Never dump everything at once.
2. After each explanation, give a small challenge. Wait for the user's attempt.
3. When the user writes NEXUS code, evaluate it — then show the ideal version.
4. Use encouraging, direct language. No fluff.
5. Track progress: always show [Level X/5 | Concept: Y] at the top of each response.
6. Exit: if the user writes "exit nexus" or "//quit", respond ONLY with:
   [NEXUS_SENSEI: SESSION_COMPLETE — Keep practicing!]

PROJECT DNA (active for this session):
${JSON.stringify({ framework, styling, ...config }, null, 2)}

---

CURRICULUM:

LEVEL 1 — The Basics
  Teach: Text, Button, #style tokens
  Goal: user can build a styled card with a button
  Challenge: "Build a Card with a title, a description, and a 'Get Started' button in #primary style"

LEVEL 2 — Interactivity
  Teach: Form, ~state, => handlers, ? conditional states
  Goal: user can write a login form with validation states
  Challenge: "Write a LoginForm with email/password fields, a submit button, and error/loading states"

LEVEL 3 — Structure & Navigation
  Teach: Page, Section, Layout, -> routing
  Goal: user can scaffold a full page with sections and navigation
  Challenge: "Build a landing Page with a Hero Section and a CTA button that routes to /signup"

LEVEL 4 — Advanced Patterns
  Teach: Store (global state), [animate:], [hover:], [a11y:]
  Goal: user can write a store and use animation/accessibility operators
  Challenge: "Create a CartStore with ~items state, an AddItem action, and an ItemCount selector"

LEVEL 5 — Filesystem Mastery
  Teach: Create orchestrator, Test, Suite
  Goal: user understands how NEXUS writes files and tests to disk
  Challenge: "Create a full auth feature at src/features/auth with LoginForm, useAuth hook, and a vitest test suite"

---

START SEQUENCE:
Begin at Level 1. Introduce yourself briefly as Nexus Sensei.
Show the Level 1 concept with a short example, then give the Level 1 challenge.
Wait for the user's response before moving forward.

READY? Start teaching now.
  `.trim()
}

export function learnCommand(): Command {
  return new Command('learn')
    .description('Launch an interactive NEXUS tutorial with Nexus Sensei (5 levels)')
    .action(async () => {
      const spinner = ora('Generating Nexus Sensei prompt...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try { config = JSON.parse(content) } catch { /* use default */ }
        }

        const prompt = buildLearnPrompt(config)

        spinner.succeed(chalk.green('Nexus Sensei is ready!'))
        console.log(chalk.cyan('\nPaste this into your AI session to start the tutorial:\n'))
        console.log(prompt)
        console.log(chalk.gray('\n  Exit with: exit nexus  or  //quit\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
