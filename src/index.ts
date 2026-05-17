#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './cli/init.js'
import { contextCommand } from './cli/context.js'
import { validateCommand } from './cli/validate.js'
import { installCommand } from './cli/install.js'
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
program.addCommand(installCommand())

program.parse()
