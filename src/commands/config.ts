import { Command } from 'commander'
import Conf from 'conf'
import chalk from 'chalk'

const config = new Conf({ projectName: 'nxlang' })

export function configCommand(): Command {
  const configCmd = new Command("config")
    .description("Manage global NEXUS configuration")

  configCmd
    .command("set <key> <value>")
    .description("Save a value to the global config")
    .action((key, value) => {
      config.set(key, value)
      console.log(chalk.green(`Global config updated: ${key} = ${value}`))
    })

  configCmd
    .command("show")
    .description("Display the current global config")
    .action(() => {
      const allConfig = config.store
      if (Object.keys(allConfig).length === 0) {
        console.log(chalk.yellow("No global config saved yet."))
      } else {
        console.log(chalk.blue("Current global config:"))
        console.log(JSON.stringify(allConfig, null, 2))
      }
    })

  return configCmd
}
