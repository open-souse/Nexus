import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

const EXAMPLES: Record<string, { description: string; file: string }> = {
  dashboard: {
    description: 'Panel de administración con sidebar, stats y tabla',
    file: 'dashboard.nexus'
  },
  landing: {
    description: 'Página de marketing con hero, features y footer',
    file: 'landing-page.nexus'
  },
  medical: {
    description: 'Protocolo de Triaje Médico (Emergencias)',
    file: 'medical-triage.nexus'
  }
}

function getExamplesDir(): string {
  // Busca la carpeta examples relativa al CLI instalado o al proyecto local
  const localPath = path.join(process.cwd(), 'examples')
  if (fs.existsSync(localPath)) return localPath
  // Cuando está instalado globalmente, busca relativo al propio CLI
  const pkgPath = new URL('../../examples', import.meta.url).pathname
  return pkgPath
}

export function examplesCommand(): Command {
  const cmd = new Command('examples')
    .description('Lista y muestra ejemplos de código NEXUS')

  cmd
    .command('list')
    .description('Lista todos los ejemplos disponibles')
    .action(() => {
      console.log(chalk.cyan('\nEjemplos disponibles:\n'))
      for (const [name, { description }] of Object.entries(EXAMPLES)) {
        console.log(`  ${chalk.bold.green(name.padEnd(12))} ${chalk.gray(description)}`)
      }
      console.log(chalk.gray('\nUso: nexus examples show <nombre>\n'))
    })

  cmd
    .command('show <name>')
    .description('Muestra el contenido de un ejemplo')
    .action((name: string) => {
      const example = EXAMPLES[name]
      if (!example) {
        console.log(chalk.red(`Ejemplo "${name}" no encontrado.`))
        console.log(chalk.gray('Usa nexus examples list para ver los disponibles.'))
        process.exit(1)
      }

      const filePath = path.join(getExamplesDir(), example.file)
      if (!fs.existsSync(filePath)) {
        console.log(chalk.red(`Archivo no encontrado: ${filePath}`))
        process.exit(1)
      }

      const content = fs.readFileSync(filePath, 'utf8')
      console.log(chalk.cyan(`\n— ${name} — ${example.description}\n`))
      console.log(content)
    })

  // Sin subcomando muestra el listado por defecto
  cmd.action(() => {
    console.log(chalk.cyan('\nEjemplos disponibles:\n'))
    for (const [name, { description }] of Object.entries(EXAMPLES)) {
      console.log(`  ${chalk.bold.green(name.padEnd(12))} ${chalk.gray(description)}`)
    }
    console.log(chalk.gray('\nUso: nexus examples show <nombre>\n'))
  })

  return cmd
}
