import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'
import inquirer from 'inquirer'

async function runInit(lang: 'es' | 'en') {
  const t = lang === 'es' ? {
    welcome: '\nBienvenido a NEXUS — Configuremos el DNA de tu proyecto\n',
    framework: '¿Qué framework usas?',
    styling: '¿Qué sistema de estilos usas?',
    primary: 'Color primario (ej: #2563eb):',
    secondary: 'Color secundario:',
    danger: 'Color de peligro/error:',
    icons: '¿Qué librería de iconos usas?',
    output: '¿Dónde guardar los componentes generados?',
    success: '\nnexus.config.json creado exitosamente',
    hint: 'Puedes editarlo en cualquier momento para ajustar tu DNA',
    next: '\nSiguiente paso: ejecuta '
  } : {
    welcome: '\nWelcome to NEXUS — Let\'s configure your project DNA\n',
    framework: 'Which framework do you use?',
    styling: 'Which styling system do you use?',
    primary: 'Primary color (e.g. #2563eb):',
    secondary: 'Secondary color:',
    danger: 'Danger/error color:',
    icons: 'Which icon library do you use?',
    output: 'Where should generated components be saved?',
    success: '\nnexus.config.json created successfully',
    hint: 'You can edit it anytime to adjust your DNA',
    next: '\nNext step: run '
  }

  console.log(chalk.cyan(t.welcome))

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'lang',
      message: lang === 'es' ? '¿En qué idioma quieres que NEXUS te hable?' : 'Which language should NEXUS use?',
      choices: [{ name: 'Español', value: 'es' }, { name: 'English', value: 'en' }],
      default: lang
    },
    {
      type: 'checkbox',
      name: 'modules',
      message: lang === 'es' ? '¿Qué módulos deseas activar?' : 'Which modules do you want to activate?',
      choices: [
        { name: 'Frontend (React/Vue/Next)', value: 'frontend', checked: true },
        { name: 'Backend (API/DB)', value: 'backend' },
        { name: 'Diseño (System Tokens)', value: 'design' },
        { name: 'Medicina (Protocolos)', value: 'medical' }
      ]
    },
    {
      type: 'list',
      name: 'framework',
      message: t.framework,
      choices: ['react-ts', 'react-js', 'vue-ts', 'vue-js', 'svelte', 'next-ts', 'next-js'],
      when: (a) => a.modules.includes('frontend')
    },
    {
      type: 'list',
      name: 'styling',
      message: t.styling,
      choices: ['tailwind', 'css-modules', 'styled-components', 'sass', 'none'],
      when: (a) => a.modules.includes('frontend')
    },
    {
      type: 'input',
      name: 'primary',
      message: t.primary,
      default: '#2563eb'
    },
    {
      type: 'input',
      name: 'secondary',
      message: t.secondary,
      default: '#64748b'
    },
    {
      type: 'input',
      name: 'danger',
      message: t.danger,
      default: '#ef4444'
    },
    {
      type: 'list',
      name: 'icons',
      message: t.icons,
      choices: ['lucide-react', 'heroicons', 'react-icons', 'none'],
      when: (a) => a.modules.includes('frontend')
    },
    {
      type: 'input',
      name: 'output',
      message: t.output,
      default: './src/components'
    }
  ])

  const config = {
    lang: answers.lang,
    modules: answers.modules,
    framework: answers.framework || 'none',
    styling: answers.styling || 'none',
    output: answers.output,
    tokens: {
      primary: answers.primary,
      secondary: answers.secondary,
      danger: answers.danger,
      success: '#22c55e',
      radius: '8px',
      font: "'Inter', sans-serif"
    },
    icons: {
      library: answers.icons || 'none'
    },
    standards: ["Clean Code", "Modular Architecture"]
  }

  fs.writeFileSync('./nexus.config.json', JSON.stringify(config, null, 2))
  console.log(chalk.green(t.success))
  console.log(chalk.gray(t.hint))
  console.log(chalk.cyan(t.next + chalk.bold('nexus context') + '\n'))
}

/**
 * Comando 'init': Inicializa el ecosistema Nexus en un proyecto local.
 * Crea un archivo de configuración (DNA) con valores por defecto basados en React y Tailwind.
 * 
 * @returns {Command} El objeto Command de Commander para ser registrado en el CLI.
 */
export function initCommand(): Command {
  return new Command('init')
    .description('Inicializa NEXUS en tu proyecto')
    .option('--reset', 'Regenera nexus.config.json aunque ya exista')
    .option('--lang <lang>', 'Idioma de la interfaz: es | en', 'es')
    .action(async (options) => {
      const configPath = './nexus.config.json'
      const lang = options.lang === 'en' ? 'en' : 'es'

      if (fs.existsSync(configPath) && !options.reset) {
        console.log(chalk.yellow('nexus.config.json ya existe'))
        console.log(chalk.gray('Usa nexus init --reset para regenerarlo'))
        return
      }

      if (options.reset && fs.existsSync(configPath)) {
        fs.removeSync(configPath)
        console.log(chalk.gray('Configuración anterior eliminada\n'))
      }

      await runInit(lang)
    })
}
