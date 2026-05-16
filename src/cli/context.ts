import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'
import { buildPrompt } from '../context/builder.js'

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
        } else {
          console.warn(
            chalk.yellow('⚠ nexus.config.json not found. Using defaults.') +
            chalk.dim('\n  Run "nexus init" to create your project DNA file.\n')
          )
        }

        const prompt = buildPrompt(config)
        const nexusMd = `# NEXUS Notation Reference\n\n${prompt}\n`

        // Write NEXUS.md — The universal context for AI models
        const nexusMdPath = path.join(cwd, 'NEXUS.md')
        await fs.writeFile(nexusMdPath, nexusMd, 'utf8')

        spinner.succeed(chalk.green('NEXUS notation reference written to NEXUS.md'))
        console.log(chalk.cyan('\nYour AI context is ready in NEXUS.md.'))
        console.log(chalk.cyan('Attach NEXUS.md to your AI session to load the protocol reference.\n'))

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
