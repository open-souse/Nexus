import { Command } from 'commander'
import Conf from 'conf'
import chalk from 'chalk'

const config = new Conf({ projectName: 'nexus-lang' })

export function configCommand(): Command {
  const configCmd = new Command("config")
    .description("Configuración de NEXUS")

  configCmd
    .command("set <key> <value>")
    .description("Guarda un valor en la configuración global")
    .action((key, value) => {
      config.set(key, value)
      console.log(chalk.green(`Configuración global actualizada: ${key} = ${value}`))
    })

  configCmd
    .command("show")
    .description("Muestra la configuración actual")
    .action(() => {
      const allConfig = config.store
      if (Object.keys(allConfig).length === 0) {
        console.log(chalk.yellow("No hay configuración global guardada."))
      } else {
        console.log(chalk.blue("Configuración global actual:"))
        console.log(JSON.stringify(allConfig, null, 2))
      }
    })

  return configCmd
}