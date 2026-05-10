import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import type { NexusConfig, NexusTokens } from '../types/nexus.js'

const REQUIRED_TOKENS = ['primary', 'secondary', 'danger'] as const satisfies ReadonlyArray<keyof NexusTokens>
const VALID_FRAMEWORKS = ['react-ts', 'react-js', 'vue-ts', 'vue-js', 'svelte', 'next-ts', 'next-js']
const VALID_STYLING = ['tailwind', 'css-modules', 'styled-components', 'sass', 'none']

function pass(msg: string) {
  console.log(chalk.green('  ✓ ') + msg)
}

function fail(msg: string) {
  console.log(chalk.red('  ✗ ') + msg)
}

function warn(msg: string) {
  console.log(chalk.yellow('  ! ') + msg)
}

export function doctorCommand(): Command {
  return new Command('doctor')
    .description('Check that the NEXUS configuration is correct')
    .action(() => {
      console.log(chalk.cyan('\nNEXUS Diagnostics\n'))

      let errors = 0
      const configPath = path.join(process.cwd(), 'nexus.config.json')

      // 1. Check nexus.config.json exists
      if (!fs.existsSync(configPath)) {
        fail('nexus.config.json not found — run nexus init')
        console.log(chalk.red('\n  1 critical error. Run nexus init to get started.\n'))
        process.exit(1)
      }
      pass('nexus.config.json found')

      // 2. Check valid JSON
      let config: NexusConfig
      try {
        config = fs.readJsonSync(configPath) as NexusConfig
        pass('nexus.config.json is valid JSON')
      } catch {
        fail('nexus.config.json has JSON syntax errors')
        process.exit(1)
      }

      // 3. Check framework
      if (!config.framework) {
        fail('framework not defined')
        errors++
      } else if (!VALID_FRAMEWORKS.includes(config.framework)) {
        warn(`framework "${config.framework}" is not standard — valid values: ${VALID_FRAMEWORKS.join(', ')}`)
      } else {
        pass(`framework: ${config.framework}`)
      }

      // 4. Check styling
      if (!config.styling) {
        warn('styling not defined — recommended to specify it')
      } else if (!VALID_STYLING.includes(config.styling)) {
        warn(`styling "${config.styling}" not recognized`)
      } else {
        pass(`styling: ${config.styling}`)
      }

      // 5. Check tokens
      if (!config.tokens) {
        fail('tokens not defined')
        errors++
      } else {
        for (const token of REQUIRED_TOKENS) {
          if (!config.tokens[token]) {
            fail(`tokens.${token} not defined`)
            errors++
          } else {
            pass(`tokens.${token}: ${config.tokens[token]}`)
          }
        }

        // Check design scales
        if (!config.tokens.scales) {
          warn('design scales (scales) not defined — recommended for better precision')
        } else {
          pass('design scales (radius, spacing, shadows) configured')
        }
      }

      // 6. Check output
      if (!config.output) {
        warn('output not defined — defaults to ./src/components')
      } else {
        pass(`output: ${config.output}`)
      }

      // 7. Check lang
      if (!config.lang) {
        warn('lang not defined — defaults to "en"')
      } else {
        pass(`lang: ${config.lang}`)
      }

      console.log()
      if (errors === 0) {
        console.log(chalk.green('  Everything looks good. Run nexus context to induce your AI.\n'))
      } else {
        console.log(chalk.red(`  ${errors} error(s) found. Edit nexus.config.json to fix them.\n`))
        process.exit(1)
      }
    })
}
