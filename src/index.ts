import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { configCommand } from './commands/config.js'
import { contextCommand } from './commands/context.js'
import { validateCommand } from './commands/validate.js'
import fs from 'fs'

// Leer versión desde package.json
const pkgPath = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
const { version } = pkg

const program = new Command()

program
  .name('nexus')
  .description('NEXUS: El protocolo de comunicación minimalista Humano-IA')
  .version(version)

program.addCommand(initCommand())
program.addCommand(configCommand())
program.addCommand(contextCommand())
program.addCommand(validateCommand())

program.parse()