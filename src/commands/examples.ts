import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

const BLUEPRINTS: Record<string, { description: string; file: string }> = {
  dashboard: {
    description: 'Panel de administración con sidebar, stats y tabla',
    file: 'dashboard.nexus'
  },
  landing: {
    description: 'Página de marketing con hero, features y footer',
    file: 'landing-page.nexus'
  },
  auth: {
    description: 'Login con OAuth, validación y manejo de errores',
    file: 'auth-login.nexus'
  },
  profile: {
    description: 'Perfil de usuario con edición inline y navegación de ajustes',
    file: 'profile.nexus'
  },
  cart: {
    description: 'Carrito con Store global, animaciones y accesibilidad',
    file: 'store-cart.nexus'
  }
}

function getBlueprintsDir(): string {
  const localPath = path.join(process.cwd(), 'blueprints')
  if (fs.existsSync(localPath)) return localPath
  return new URL('../../blueprints', import.meta.url).pathname
}

function printList() {
  console.log(chalk.cyan('\nBlueprints disponibles:\n'))
  for (const [name, { description }] of Object.entries(BLUEPRINTS)) {
    console.log(`  ${chalk.bold.green(name.padEnd(12))} ${chalk.gray(description)}`)
  }
  console.log(chalk.gray('\nUso: nexus examples show <nombre>\n'))
}

export function examplesCommand(): Command {
  const cmd = new Command('examples')
    .description('Lista y muestra blueprints de código NEXUS')

  cmd
    .command('list')
    .description('Lista todos los blueprints disponibles')
    .action(printList)

  cmd
    .command('show <name>')
    .description('Muestra el contenido de un blueprint')
    .action((name: string) => {
      const blueprint = BLUEPRINTS[name]
      if (!blueprint) {
        console.log(chalk.red(`Blueprint "${name}" no encontrado.`))
        console.log(chalk.gray('Usa nexus examples list para ver los disponibles.'))
        process.exit(1)
      }

      const filePath = path.join(getBlueprintsDir(), blueprint.file)
      if (!fs.existsSync(filePath)) {
        console.log(chalk.red(`Archivo no encontrado: ${filePath}`))
        process.exit(1)
      }

      const content = fs.readFileSync(filePath, 'utf8')
      console.log(chalk.cyan(`\n— ${name} — ${blueprint.description}\n`))
      console.log(content)
    })

  cmd.action(printList)

  return cmd
}
