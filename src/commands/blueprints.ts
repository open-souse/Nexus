import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { NEXUS_BLUEPRINTS } from '../grammar.js'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function blueprintsCommand(): Command {
  const blueprints = new Command('blueprints')
    .description('Manage and apply NEXUS blueprints (templates)')

  blueprints
    .command('list')
    .description('List all available blueprints')
    .action(() => {
      console.log(chalk.cyan('\nAvailable NEXUS Blueprints:\n'))
      NEXUS_BLUEPRINTS.forEach(b => {
        console.log(`${chalk.bold(b.name)} ${chalk.gray(`(${b.id})`)}`)
        console.log(`  ${b.description}\n`)
      })
      console.log(chalk.gray('Use "nexus blueprints apply <id>" to use one.\n'))
    })

  blueprints
    .command('apply')
    .description('Apply a blueprint to the current directory')
    .argument('[id]', 'ID of the blueprint to apply')
    .action(async (id: string) => {
      let selectedId = id

      if (!selectedId) {
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'blueprintId',
            message: 'Select a blueprint to apply:',
            choices: NEXUS_BLUEPRINTS.map(b => ({ name: b.name, value: b.id }))
          }
        ])
        selectedId = answers.blueprintId
      }

      const blueprint = NEXUS_BLUEPRINTS.find(b => b.id === selectedId)
      if (!blueprint) {
        console.log(chalk.red(`Error: Blueprint "${selectedId}" not found.`))
        return
      }

      // Blueprints are in the root /blueprints folder
      // Since we are in dist/commands or src/commands, we need to go up
      const blueprintPath = path.join(process.cwd(), 'blueprints', blueprint.file)
      
      // Fallback for development/published package structure
      const internalBlueprintPath = path.resolve(__dirname, '../../blueprints', blueprint.file)
      
      const finalSource = fs.existsSync(blueprintPath) ? blueprintPath : internalBlueprintPath

      if (!fs.existsSync(finalSource)) {
        console.log(chalk.red(`Error: Could not find blueprint file: ${blueprint.file}`))
        return
      }

      const destPath = path.join(process.cwd(), blueprint.file)
      await fs.copy(finalSource, destPath)
      
      console.log(chalk.green(`\n✓ Blueprint "${blueprint.name}" applied successfully!`))
      console.log(chalk.gray(`Created: ./${blueprint.file}\n`))
    })

  return blueprints
}
