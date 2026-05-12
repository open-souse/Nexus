#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { contextCommand } from './commands/context.js'
import { validateCommand } from './commands/validate.js'
import { doctorCommand } from './commands/doctor.js'
import { blueprintsCommand } from './commands/blueprints.js'
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
program.addCommand(doctorCommand())
program.addCommand(blueprintsCommand())

program.parse()
