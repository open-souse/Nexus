import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

function buildLockdownPrompt(config: Partial<NexusConfig>): string {
  const framework = config.framework || 'next-ts'
  const styling = config.styling || 'tailwind'

  return `
NEXUS PRECISION MODE — v3.3

I'll write exclusively in NEXUS notation this session.
Please work with me like this:

1. NEXUS input → generate code directly.
   Keep responses tight: code only, no preamble or explanation.

2. Natural language input → gently remind me:
   "Please use NEXUS notation. Use ?? to ask a question."

3. ?? "question" → answer briefly and concisely, then return to code-only mode.

4. First code block of each response → add a comment: /* NX:3.3 */ at the top.

5. @modify [preserve:all] → only touch what I explicitly describe. Nothing else.

6. If you lose track of the context or DNA, say:
   "I've lost context — please resend your NEXUS spec."

Session commands:
- "//nexus unlock" → return to normal conversation mode
- "//nexus status" → reply with: [NEXUS: precision mode active | v3.3 | ${framework} + ${styling}]
- "//nexus reset"  → clear context and restart precision mode

PROJECT DNA:
${JSON.stringify(config, null, 2)}
  `.trim()
}

export function lockdownCommand(): Command {
  return new Command('lockdown')
    .description('Generate a NEXUS precision mode prompt — code-only, no explanations')
    .action(async () => {
      const spinner = ora('Generating NEXUS Precision Mode prompt...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try { config = JSON.parse(content) } catch { /* use default */ }
        }

        const prompt = buildLockdownPrompt(config)

        spinner.succeed(chalk.green('NEXUS Precision Mode prompt generated!'))
        console.log(chalk.cyan('\nPaste this into your AI session to activate precision mode:\n'))
        console.log(prompt)
        console.log(chalk.gray('\n  Exit with: //nexus unlock\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
