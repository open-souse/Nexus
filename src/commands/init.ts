import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'
import inquirer from 'inquirer'

export function initCommand(): Command {
  return new Command("init")
    .description("Inicializa NEXUS en tu proyecto")
    .action(async () => {
      const configPath = "./nexus.config.json"

      if (fs.existsSync(configPath)) {
        console.log(chalk.yellow("nexus.config.json ya existe"))
        return
      }

      console.log(chalk.cyan("\nBienvenido a NEXUS — Configuremos el DNA de tu proyecto\n"))

      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "framework",
          message: "¿Qué framework usas?",
          choices: ["react-ts", "react-js", "vue-ts", "vue-js", "svelte", "next-ts", "next-js"]
        },
        {
          type: "list",
          name: "styling",
          message: "¿Qué sistema de estilos usas?",
          choices: ["tailwind", "css-modules", "styled-components", "sass", "none"]
        },
        {
          type: "input",
          name: "primary",
          message: "Color primario (ej: #2563eb o blue-600):",
          default: "#2563eb"
        },
        {
          type: "input",
          name: "secondary",
          message: "Color secundario:",
          default: "#64748b"
        },
        {
          type: "input",
          name: "danger",
          message: "Color de peligro/error:",
          default: "#ef4444"
        },
        {
          type: "list",
          name: "icons",
          message: "¿Qué librería de iconos usas?",
          choices: ["lucide-react", "heroicons", "react-icons", "none"]
        },
        {
          type: "input",
          name: "output",
          message: "¿Dónde guardar los componentes generados?",
          default: "./src/components"
        }
      ])

      const config = {
        lang: "en",
        framework: answers.framework,
        styling: answers.styling,
        output: answers.output,
        tokens: {
          primary: answers.primary,
          secondary: answers.secondary,
          danger: answers.danger,
          success: "#22c55e",
          radius: "8px",
          font: "'Inter', sans-serif"
        },
        icons: {
          library: answers.icons
        }
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
      console.log(chalk.green("\nnexus.config.json creado exitosamente"))
      console.log(chalk.gray("Puedes editarlo en cualquier momento para ajustar tu DNA"))
      console.log(chalk.cyan("\nSiguiente paso: ejecuta " + chalk.bold("nexus context") + " para inducir a tu IA\n"))
    })
}
