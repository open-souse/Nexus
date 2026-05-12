import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

export function doctorCommand(): Command {
  return new Command('doctor')
    .description('Audit the health of your Nexus project and DNA alignment')
    .action(async () => {
      const spinner = ora('Analyzing project health...').start()
      const cwd = process.cwd()
      const issues: { type: 'error' | 'warn', message: string }[] = []

      // 1. Check for nexus.config.json
      const configPath = path.join(cwd, 'nexus.config.json')
      if (!fs.existsSync(configPath)) {
        spinner.fail(chalk.red('Nexus is not initialized in this directory.'))
        console.log(chalk.gray('Run "nexus init" to get started.\n'))
        return
      }

      const config: NexusConfig = await fs.readJson(configPath)

      // 2. Check for package.json
      const pkgPath = path.join(cwd, 'package.json')
      let pkg: any = {}
      if (fs.existsSync(pkgPath)) {
        pkg = await fs.readJson(pkgPath)
      } else {
        issues.push({ type: 'warn', message: 'No package.json found. Is this a Node.js project?' })
      }

      // 3. Check for Framework Alignment
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      
      if (config.framework.startsWith('react') && !deps['react']) {
        issues.push({ type: 'error', message: `DNA says "${config.framework}" but "react" is not in package.json.` })
      }
      if (config.framework.startsWith('vue') && !deps['vue']) {
        issues.push({ type: 'error', message: `DNA says "${config.framework}" but "vue" is not in package.json.` })
      }
      if (config.framework.startsWith('next') && !deps['next']) {
        issues.push({ type: 'error', message: `DNA says "${config.framework}" but "next" is not in package.json.` })
      }

      // 4. Check for Styling Alignment
      if (config.styling === 'tailwind' && !deps['tailwindcss']) {
        issues.push({ type: 'warn', message: 'DNA says "tailwind" but "tailwindcss" dependency was not found.' })
      }

      // 5. Check for Output Directory and Entry Point
      const outputPath = path.resolve(cwd, config.output)
      if (!fs.existsSync(outputPath)) {
        issues.push({ type: 'warn', message: `Output directory "${config.output}" does not exist.` })
      } else {
        const entryPoint = path.join(outputPath, config.framework.startsWith('next') ? 'app/page.tsx' : 'App.tsx')
        if (!fs.existsSync(entryPoint) && !config.framework.startsWith('express')) {
          issues.push({ type: 'warn', message: `Main entry point not found at "${entryPoint}".` })
        }
      }

      // 6. Check for Backend Alignment
      if (config.backend) {
        if (config.backend.framework === 'nestjs' && !deps['@nestjs/core']) {
          issues.push({ type: 'error', message: 'DNA says "nestjs" but "@nestjs/core" is missing.' })
        }
        if (config.backend.orm === 'prisma' && !deps['prisma'] && !deps['@prisma/client']) {
          issues.push({ type: 'error', message: 'DNA says "prisma" but prisma dependencies are missing.' })
        }
      }

      spinner.stop()

      if (issues.length === 0) {
        console.log(chalk.green('\n✓ Nexus Health: Perfect! Your DNA and project are in sync.'))
      } else {
        console.log(chalk.yellow(`\nNexus Health Check — ${issues.length} issue(s) found:\n`))
        
        const errors = issues.filter(i => i.type === 'error')
        const warns = issues.filter(i => i.type === 'warn')

        for (const issue of issues) {
          const icon = issue.type === 'error' ? chalk.red('✗') : chalk.yellow('⚠')
          console.log(`  ${icon} ${issue.message}`)
        }

        if (errors.length > 0) {
          console.log(chalk.cyan('\nRecommended fixes:'))
          if (errors.some(e => e.message.includes('missing') || e.message.includes('not in package.json'))) {
            console.log(chalk.gray(`  → Run: npm install`))
          }
          console.log(chalk.gray(`  → Update your DNA in: nexus.config.json`))
        }

        if (warns.some(w => w.message.includes('Output directory'))) {
          console.log(chalk.cyan('\nTo fix output directory:'))
          console.log(chalk.gray(`  → Run: mkdir -p ${config.output}`))
        }
        
        console.log('')
      }
    })
}
