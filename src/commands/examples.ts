import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

interface BlueprintEntry {
  description: string
  file: string
  community?: boolean
}

const BLUEPRINTS: Record<string, BlueprintEntry> = {
  // — Frontend (oficial) ——————————————————————————————————————
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
  // — Community (contribuciones externas, no validadas oficialmente) ——
  'community-medical': {
    description: 'Protocolo de Triaje Médico Manchester [community]',
    file: 'community-medical-triage.nexus',
    community: true
  },
  'community-backend': {
    description: 'API REST con endpoints, DTOs y manejo de errores [community]',
    file: 'community-backend-api.nexus',
    community: true
  }
}

function getBlueprintsDir(): string {
  const localPath = path.join(process.cwd(), 'blueprints')
  if (fs.existsSync(localPath)) return localPath
  // Cuando está instalado globalmente, busca relativo al CLI (dist/ → blueprints/)
  return new URL('../../blueprints', import.meta.url).pathname
}

function printList() {
  const official = Object.entries(BLUEPRINTS).filter(([, e]) => !e.community)
  const community = Object.entries(BLUEPRINTS).filter(([, e]) => e.community)

  console.log(chalk.cyan('\nBlueprints disponibles:\n'))

  console.log(chalk.bold('  Frontend (oficial)'))
  for (const [name, { description }] of official) {
    console.log(`    ${chalk.bold.green(name.padEnd(14))} ${chalk.gray(description)}`)
  }

  console.log(chalk.bold('\n  Community') + chalk.gray(' — no validados oficialmente'))
  for (const [name, { description }] of community) {
    console.log(`    ${chalk.yellow(name.padEnd(20))} ${chalk.gray(description)}`)
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

      if (blueprint.community) {
        console.log(chalk.yellow(`\n⚠  Blueprint community — no validado oficialmente por el equipo de NEXUS\n`))
      }

      console.log(chalk.cyan(`\n— ${name} — ${blueprint.description}\n`))
      console.log(content)
    })

  cmd.action(printList)

  return cmd
}
