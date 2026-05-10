#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { configCommand } from './commands/config.js'
import { contextCommand } from './commands/context.js'
import { validateCommand } from './commands/validate.js'
import { examplesCommand } from './commands/examples.js'
import { updateCommand } from './commands/update.js'
import { doctorCommand } from './commands/doctor.js'
import { scaffoldCommand } from './commands/scaffold.js'
import { lockdownCommand } from './commands/lockdown.js'
import { learnCommand } from './commands/learn.js'
import fs from 'fs'

const pkgPath = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
const { version } = pkg

const program = new Command()

program
  .name('nexus')
  .description('NEXUS: Human-AI language protocol')
  .version(version)

program.addCommand(initCommand())
program.addCommand(contextCommand())
program.addCommand(validateCommand())
program.addCommand(examplesCommand())
program.addCommand(updateCommand(version))
program.addCommand(doctorCommand())
program.addCommand(scaffoldCommand())
program.addCommand(configCommand())
program.addCommand(lockdownCommand())
program.addCommand(learnCommand())

program.parse()
