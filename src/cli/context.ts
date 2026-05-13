import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'
import { buildPrompt } from '../context/builder.js'

const SLASH_COMMAND_CONTENT = `# NEXUS Context Refresh

Regenerate and reload the NEXUS notation reference for this session.

\`\`\`bash
npx nexus context
\`\`\`

After running, the NEXUS grammar and project DNA are reloaded from \`nexus.config.json\`.
Use this command whenever the AI seems to have forgotten NEXUS syntax.
`

export function contextCommand(): Command {
  return new Command('context')
    .description('Generate NEXUS.md with the NEXUS notation reference for AI context induction')
    .action(async () => {
      const spinner = ora('Generating NEXUS notation reference...').start()

      try {
        const cwd = process.cwd()
        const configPath = path.join(cwd, 'nexus.config.json')
        let config: Partial<NexusConfig> = { lang: 'en', modules: ['frontend'] }

        if (fs.existsSync(configPath)) {
          const content = await fs.readFile(configPath, 'utf8')
          try {
            config = JSON.parse(content)
          } catch { /* use default */ }
        }

        const prompt = buildPrompt(config)
        const nexusMd = `# NEXUS Notation Reference\n\n${prompt}\n`

        // Write NEXUS.md — The universal context for AI models
        const nexusMdPath = path.join(cwd, 'NEXUS.md')
        await fs.writeFile(nexusMdPath, nexusMd, 'utf8')

        // Register /nexus slash command for mid-session refresh
        const slashDir = path.join(cwd, '.claude', 'commands')
        await fs.ensureDir(slashDir)
        await fs.writeFile(path.join(slashDir, 'nexus.md'), SLASH_COMMAND_CONTENT, 'utf8')

        spinner.succeed(chalk.green('NEXUS notation reference written to NEXUS.md'))
        console.log(chalk.cyan('\nYour AI context is ready in NEXUS.md.'))
        console.log(chalk.cyan('Use /nexus inside Claude Code to refresh context mid-session.\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
