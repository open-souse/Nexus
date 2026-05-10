import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

const BLUEPRINTS: Record<string, { description: string; file: string }> = {
  dashboard: {
    description: 'Admin panel with sidebar, stats and table',
    file: 'dashboard.nexus'
  },
  landing: {
    description: 'Marketing page with hero, features and footer',
    file: 'landing-page.nexus'
  },
  auth: {
    description: 'Login with OAuth, validation and error handling',
    file: 'auth-login.nexus'
  },
  profile: {
    description: 'User profile with inline editing and settings navigation',
    file: 'profile.nexus'
  },
  cart: {
    description: 'Cart with global Store, animations and accessibility',
    file: 'store-cart.nexus'
  }
}

function getBlueprintsDir(): string {
  const localPath = path.join(process.cwd(), 'blueprints')
  if (fs.existsSync(localPath)) return localPath
  return new URL('../../blueprints', import.meta.url).pathname
}

function printList() {
  console.log(chalk.cyan('\nAvailable blueprints:\n'))
  for (const [name, { description }] of Object.entries(BLUEPRINTS)) {
    console.log(`  ${chalk.bold.green(name.padEnd(12))} ${chalk.gray(description)}`)
  }
  console.log(chalk.gray('\nUsage: nexus examples show <name>\n'))
}

export function examplesCommand(): Command {
  const cmd = new Command('examples')
    .description('List and display NEXUS code blueprints')

  cmd
    .command('list')
    .description('List all available blueprints')
    .action(printList)

  cmd
    .command('show <name>')
    .description('Display the contents of a blueprint')
    .action((name: string) => {
      const blueprint = BLUEPRINTS[name]
      if (!blueprint) {
        console.log(chalk.red(`Blueprint "${name}" not found.`))
        console.log(chalk.gray('Run nexus examples list to see available blueprints.'))
        process.exit(1)
      }

      const filePath = path.join(getBlueprintsDir(), blueprint.file)
      if (!fs.existsSync(filePath)) {
        console.log(chalk.red(`File not found: ${filePath}`))
        process.exit(1)
      }

      const content = fs.readFileSync(filePath, 'utf8')
      console.log(chalk.cyan(`\n— ${name} — ${blueprint.description}\n`))
      console.log(content)
    })

  cmd.action(printList)

  return cmd
}
