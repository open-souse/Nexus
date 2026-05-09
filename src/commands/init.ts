import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'
import inquirer from 'inquirer'

async function runInit() {
  console.log(chalk.cyan('\nWelcome to NEXUS — Let\'s configure your project DNA\n'))

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules do you want to activate?',
      choices: [
        { name: 'Frontend (React/Vue/Next)', value: 'frontend', checked: true },
        { name: 'Backend (API/DB)', value: 'backend' },
        { name: 'Design (System Tokens)', value: 'design' },
        { name: 'Medical (Protocols)', value: 'medical' }
      ]
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework do you use?',
      choices: ['react-ts', 'react-js', 'vue-ts', 'vue-js', 'svelte', 'next-ts', 'next-js'],
      when: (a) => a.modules.includes('frontend')
    },
    {
      type: 'list',
      name: 'styling',
      message: 'Which styling system do you use?',
      choices: ['tailwind', 'css-modules', 'styled-components', 'sass', 'none'],
      when: (a) => a.modules.includes('frontend')
    },
    {
      type: 'input',
      name: 'primary',
      message: 'Primary color (e.g. #2563eb):',
      default: '#2563eb'
    },
    {
      type: 'input',
      name: 'secondary',
      message: 'Secondary color:',
      default: '#64748b'
    },
    {
      type: 'input',
      name: 'danger',
      message: 'Danger/error color:',
      default: '#ef4444'
    },
    {
      type: 'list',
      name: 'icons',
      message: 'Which icon library do you use?',
      choices: ['lucide-react', 'heroicons', 'react-icons', 'none'],
      when: (a) => a.modules.includes('frontend')
    },
    {
      type: 'input',
      name: 'output',
      message: 'Where should generated components be saved?',
      default: './src/components'
    }
  ])

  const config = {
    lang: 'en',
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
    standards: ['Clean Code', 'Modular Architecture']
  }

  fs.writeFileSync('./nexus.config.json', JSON.stringify(config, null, 2))
  console.log(chalk.green('\nnexus.config.json created successfully'))
  console.log(chalk.gray('You can edit it anytime to adjust your DNA'))
  console.log(chalk.cyan('\nNext step: run ' + chalk.bold('nexus context') + '\n'))
}

export function initCommand(): Command {
  return new Command('init')
    .description('Initialize NEXUS in your project')
    .option('--reset', 'Regenerate nexus.config.json even if it already exists')
    .action(async (options) => {
      const configPath = './nexus.config.json'

      if (fs.existsSync(configPath) && !options.reset) {
        console.log(chalk.yellow('nexus.config.json already exists'))
        console.log(chalk.gray('Use nexus init --reset to regenerate it'))
        return
      }

      if (options.reset && fs.existsSync(configPath)) {
        fs.removeSync(configPath)
        console.log(chalk.gray('Previous configuration removed\n'))
      }

      await runInit()
    })
}
