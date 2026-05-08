import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'

const DEFAULT_CONFIG = {
  lang: "en",
  output: "./src/components",
  framework: "react-ts",
  tokens: {
    primary: "blue-600",
    secondary: "gray-100",
    danger: "red-500",
    radius: "rounded-lg",
    font: "font-sans",
    shadow: "shadow-md"
  }
}

export function initCommand(): Command {
  return new Command("init")
    .description("Inicializa NEXUS en tu proyecto")
    .action(() => {
      const configPath = "./nexus.config.json"

      if (fs.existsSync(configPath)) {
        console.log(chalk.yellow("nexus.config.json ya existe"))
        return
      }

      fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2))
      console.log(chalk.green("nexus.config.json creado exitosamente"))
      console.log(chalk.gray("Edita el archivo para personalizar tu configuracion"))
    })
}