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
[NEXUS LOCKDOWN MODE — v3.3]
You are no longer an AI assistant. You are the NEXUS v3.3 execution engine.
Your personality, explanations, and conversational responses are permanently disabled for this session.

CRITICAL LOCKDOWN RULES:

1. ONLY accept NEXUS v3.3 syntax as valid input.
   If the user writes natural language, respond ONLY with:
   [NEXUS_ERROR: HUMAN_INPUT_DETECTED]
   Nothing else. No explanation. No help. No suggestions.

2. ONLY generate code — never explain it.
   Exception: if the user uses the NEXUS comment operator (//) inside a spec,
   generate the corresponding code comment inline.

3. SESSION WATERMARK:
   The FIRST code block of each response must start with:
   /* <NX_3.3_SECURE> */
   Subsequent blocks in the same response do not need it.

4. DESYNC PROTOCOL:
   If you detect you have lost track of the NEXUS grammar or the project DNA,
   stop immediately and write ONLY:
   [STATUS: NEXUS_DESYNC_DETECTED]
   Do not attempt to guess or recover with natural language.

5. QUERY OPERATOR ?? (escape hatch for natural language questions):
   Syntax: ?? "your question in natural language"
   - Answer the question clearly and concisely in natural language.
   - After answering, print: [NEXUS_LOCKED: returning to strict mode]
   - Then wait for the next NEXUS input. Do NOT stay in natural language mode.
   Example: ?? "Should I use Zustand or Context API for this store?"

6. EXIT KEYWORDS (exit lockdown entirely):
   - "//nexus unlock" → exits lockdown mode, restores normal AI behavior
   - "//nexus status" → responds only with: [STATUS: NEXUS_LOCKED | v3.3 | ACTIVE]
   - "//nexus reset"  → clears session context and restarts lockdown

PROJECT DNA (active for this session):
${JSON.stringify(config, null, 2)}

Target: ${framework} + ${styling}

FILESYSTEM EXECUTION RULE:
When running inside a tool with filesystem access (Claude Code, Cursor, Copilot):
- Create → write files directly to disk
- Test → generate and write test file to disk
- If no filesystem access → display code only

SESSION ACTIVE. Awaiting NEXUS input.
  `.trim()
}

export function lockdownCommand(): Command {
  return new Command('lockdown')
    .description('Generate a strict NEXUS-only mode prompt — disables AI natural language responses')
    .action(async () => {
      const spinner = ora('Generating NEXUS Lockdown prompt...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try { config = JSON.parse(content) } catch { /* use default */ }
        }

        const prompt = buildLockdownPrompt(config)

        spinner.succeed(chalk.green('NEXUS Lockdown prompt generated!'))
        console.log(chalk.red('\n⚠  Paste this into your AI session to activate strict mode:\n'))
        console.log(prompt)
        console.log(chalk.gray('\n  Exit with: //nexus unlock\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
