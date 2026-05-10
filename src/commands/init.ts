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
        { name: 'Testing (Vitest/Jest/Cypress)', value: 'testing' },
        { name: lang === 'es' ? 'Diseño (System Tokens)' : 'Design (System Tokens)', value: 'design' }
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
      type: 'list',
      name: 'backendFramework',
      message: lang === 'es' ? '¿Qué framework de backend usas?' : 'Which backend framework do you use?',
      choices: ['express', 'nestjs', 'fastify', 'hono', 'none'],
      when: (a) => a.modules.includes('backend')
    },
    {
      type: 'list',
      name: 'database',
      message: lang === 'es' ? '¿Qué base de datos usas?' : 'Which database do you use?',
      choices: ['postgresql', 'mongodb', 'mysql', 'sqlite', 'none'],
      when: (a) => a.modules.includes('backend')
    },
    {
      type: 'list',
      name: 'orm',
      message: lang === 'es' ? '¿Qué ORM/ODM usas?' : 'Which ORM/ODM do you use?',
      choices: ['prisma', 'typeorm', 'drizzle', 'mongoose', 'none'],
      when: (a) => a.modules.includes('backend')
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
    backend: answers.modules.includes('backend') ? {
      framework: answers.backendFramework || 'none',
      database: answers.database || 'none',
      orm: answers.orm || 'none'
    } : undefined,
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

export function initCommand(): Command {
  return new Command('init')
    .description('Initialize NEXUS in your project')
    .option('--reset', 'Regenerate nexus.config.json even if it already exists')
    .option('--lang <lang>', 'Interface language: es | en', 'en')
    .action(async (options) => {
      const configPath = './nexus.config.json'
      const lang = options.lang === 'es' ? 'es' : 'en'

      if (fs.existsSync(configPath) && !options.reset) {
        console.log(chalk.yellow('nexus.config.json already exists'))
        console.log(chalk.gray('Use nexus init --reset to regenerate it'))
        return
      }

      if (options.reset && fs.existsSync(configPath)) {
        fs.removeSync(configPath)
        console.log(chalk.gray('Previous config removed\n'))
      }

      await runInit(lang)
    })
}
