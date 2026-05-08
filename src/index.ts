#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { configCommand } from './commands/config.js'
import { contextCommand } from './commands/context.js'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Leer versión desde package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'))

const program = new Command()

program
  .name('nexus')
  .description('NEXUS: Human-AI Language Protocol CLI')
  .version(packageJson.version)

// Solo registramos los comandos esenciales del protocolo
program.addCommand(initCommand())
program.addCommand(configCommand())
program.addCommand(contextCommand())

program.parse(process.argv)