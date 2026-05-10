import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

export function buildLearnPrompt(config: Partial<NexusConfig>): string {
  const framework = config.framework || 'next-ts'
  const styling = config.styling || 'tailwind'

  return `
NEXUS LEARNING SESSION — v3.3

I want to learn NEXUS notation. Please guide me through 5 progressive levels.
NEXUS is a shorthand I use to describe UI, logic, and project structure to coding tools like Claude Code and Cursor.

CURRICULUM:

Level 1 — Basics
  Concepts: Text, Button, #style tokens
  Goal: write a styled card with a button
  Challenge: "Build a Card with a title, description, and a 'Get Started' button in #primary style"

Level 2 — Interactivity
  Concepts: Form, ~state, => handlers, ? conditional states
  Goal: write a login form with validation states
  Challenge: "Write a LoginForm with email/password, submit button, and error/loading states"

Level 3 — Structure & Navigation
  Concepts: Page, Section, Layout, -> routing
  Goal: scaffold a full page with sections and navigation
  Challenge: "Build a landing Page with a Hero Section and a CTA button that routes to /signup"

Level 4 — Advanced Patterns
  Concepts: Store (global state), [animate:], [hover:], [a11y:]
  Goal: write a store and use animation/accessibility operators
  Challenge: "Create a CartStore with ~items state, an AddItem action, and an ItemCount selector"

Level 5 — Filesystem Mastery
  Concepts: Create orchestrator, Test, Suite
  Goal: understand how NEXUS generates files and tests on disk
  Challenge: "Create a full auth feature at src/features/auth with LoginForm, useAuth hook, and a vitest test suite"

HOW TO TEACH ME:
- One level at a time. Never skip ahead.
- Brief explanation + one short example.
- Give me the challenge. Wait for my attempt before continuing.
- Evaluate my attempt and show the ideal version.
- Show progress: [Level X/5 | Concept: Y] at the top of each response.

To end the session: write "exit nexus" or "//quit"

PROJECT DNA (my project context):
${JSON.stringify({ framework, styling, ...config }, null, 2)}

Start with Level 1 — explain the concept briefly and give me the challenge.
  `.trim()
}

export function learnCommand(): Command {
  return new Command('learn')
    .description('Generate an interactive NEXUS tutorial prompt (5 levels)')
    .action(async () => {
      const spinner = ora('Generating NEXUS learning session...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try { config = JSON.parse(content) } catch { /* use default */ }
        }

        const prompt = buildLearnPrompt(config)

        spinner.succeed(chalk.green('NEXUS learning session ready!'))
        console.log(chalk.cyan('\nPaste this into your AI session to start learning:\n'))
        console.log(prompt)
        console.log(chalk.gray('\n  End session with: exit nexus  or  //quit\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
