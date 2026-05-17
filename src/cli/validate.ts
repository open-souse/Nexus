import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'
import { validateNexus } from '../core/validator.js'
import { installDependencies } from './install.js'

export function validateCommand(): Command {
  return new Command('validate')
    .description('Validate the syntax of a .nexus file')
    .argument('<file>', '.nexus file to validate')
    .option('--install', 'Install missing dependencies after validation')
    .action(async (file: string, options) => {
      if (!fs.existsSync(file)) {
        console.log(chalk.red(`File not found: ${file}`))
        process.exit(1)
      }

      if (!file.endsWith('.nexus')) {
        console.log(chalk.yellow('Warning: file does not have a .nexus extension'))
      }

      const content = fs.readFileSync(file, 'utf8')
      const errors = validateNexus(content)

      if (errors.length === 0) {
        console.log(chalk.green(`✓ ${file} — valid syntax`))

        if (options.install) {
          await installDependencies(file, { silentIfAllInstalled: true })
        }
      } else {
        console.log(chalk.red(`✗ ${file} — ${errors.length} error(s) found:\n`))
        for (const error of errors) {
          console.log(chalk.red(`  Line ${error.line}: `) + error.message)
        }
        process.exit(1)
      }
    })
}
