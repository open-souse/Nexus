import { Command } from 'commander'
import Conf from 'conf'
import chalk from 'chalk'

const config = new Conf({ projectName: 'nxlang' })

/**
 * Comando 'config': Gestiona la configuración global de Nexus mediante persistencia local.
 * Permite establecer (set) y mostrar (show) valores de configuración que persisten
 * entre diferentes sesiones y proyectos.
 * 
 * @returns {Command} El comando de configuración con subcomandos 'set' y 'show'.
 */
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