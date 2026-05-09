import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import https from 'https'

function fetchLatestVersion(packageName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).version)
        } catch {
          reject(new Error('No se pudo leer la versión desde npm'))
        }
      })
    }).on('error', reject)
  })
}

export function updateCommand(currentVersion: string): Command {
  return new Command('update')
    .description('Verifica si hay una nueva versión de NEXUS disponible')
    .action(async () => {
      const spinner = ora('Verificando última versión...').start()

      try {
        const latest = await fetchLatestVersion('nxlang')
        spinner.stop()

        if (latest === currentVersion) {
          console.log(chalk.green(`✓ Ya tienes la versión más reciente: v${currentVersion}`))
        } else {
          console.log(chalk.yellow(`\nHay una nueva versión disponible: v${latest}`))
          console.log(chalk.gray(`  Versión actual: v${currentVersion}`))
          console.log(chalk.cyan(`\n  Actualiza con: npm install -g nxlang\n`))
        }
      } catch {
        spinner.fail(chalk.red('No se pudo verificar la versión. Revisa tu conexión a internet.'))
      }
    })
}
