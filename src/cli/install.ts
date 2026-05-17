import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'
import ora from 'ora'
import { execSync } from 'child_process'
import path from 'path'

export function detectPackageManager(cwd: string): 'npm' | 'yarn' | 'pnpm' {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

export function isPackageInstalled(pkg: string, cwd: string): boolean {
  try {
    return fs.existsSync(path.join(cwd, 'node_modules', pkg))
  } catch {
    return false
  }
}

export function extractDependenciesFromContent(content: string, isTs: boolean): { prodDeps: string[], devDeps: string[] } {
  const prodDeps = new Set<string>()
  const devDeps = new Set<string>()

  // Normalize and split into lines
  const lines = content.replace(/\r/g, '').split('\n')

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line === '' || line.startsWith('//')) continue

    // 1. Scan for Framework Directives (@React, @Vue, @NextJS, @Express, @NestJS, @Fastify, @Hono, @Svelte)
    const directiveMatches = line.match(/@[A-Za-z0-9_-]+/g) || []
    for (const directive of directiveMatches) {
      const name = directive.slice(1).toLowerCase()
      if (name === 'react' || name === 'next' || name === 'nextjs') {
        prodDeps.add('react')
        prodDeps.add('react-dom')
        if (isTs) {
          devDeps.add('@types/react')
          devDeps.add('@types/react-dom')
        }
      } else if (name === 'vue') {
        prodDeps.add('vue')
      } else if (name === 'svelte') {
        prodDeps.add('svelte')
      } else if (name === 'express') {
        prodDeps.add('express')
        if (isTs) devDeps.add('@types/express')
      } else if (name === 'nestjs') {
        prodDeps.add('@nestjs/common')
        prodDeps.add('@nestjs/core')
        prodDeps.add('reflect-metadata')
        prodDeps.add('rxjs')
      } else if (name === 'fastify') {
        prodDeps.add('fastify')
      } else if (name === 'hono') {
        prodDeps.add('hono')
      } else if (name === 'prisma') {
        prodDeps.add('@prisma/client')
        devDeps.add('prisma')
      } else if (name === 'drizzle') {
        prodDeps.add('drizzle-orm')
        devDeps.add('drizzle-kit')
      } else if (name === 'typeorm') {
        prodDeps.add('typeorm')
        prodDeps.add('reflect-metadata')
      } else if (name === 'mongoose') {
        prodDeps.add('mongoose')
        if (isTs) devDeps.add('@types/mongoose')
      } else if (name === 'tailwind') {
        devDeps.add('tailwindcss')
        devDeps.add('postcss')
        devDeps.add('autoprefixer')
      } else if (name === 'sass') {
        devDeps.add('sass')
      } else if (name === 'styledcomponents' || name === 'styled-components') {
        prodDeps.add('styled-components')
        if (isTs) devDeps.add('@types/styled-components')
      }
    }

    const lowercaseLine = line.toLowerCase()

    // 2. Scan for Style Tokens (#tailwind, #sass)
    const tokenMatches = line.match(/#[A-Za-z0-9_-]+/g) || []
    for (const token of tokenMatches) {
      const name = token.slice(1).toLowerCase()
      if (name === 'tailwind') {
        devDeps.add('tailwindcss')
        devDeps.add('postcss')
        devDeps.add('autoprefixer')
      } else if (name === 'sass') {
        devDeps.add('sass')
      }
    }

    // 3. Scan for icons library inside attributes [icons:lucide-react] or [library:...]
    if (lowercaseLine.includes('lucide')) {
      prodDeps.add('lucide-react')
    }
    if (lowercaseLine.includes('heroicons')) {
      prodDeps.add('@heroicons/react')
    }
    if (lowercaseLine.includes('react-icons')) {
      prodDeps.add('react-icons')
    }

    // 4. Scan database drivers in entity/relation or general text
    if (lowercaseLine.includes('postgres') || lowercaseLine.includes('postgresql')) {
      prodDeps.add('pg')
      if (isTs) devDeps.add('@types/pg')
    } else if (lowercaseLine.includes('mysql')) {
      prodDeps.add('mysql2')
    } else if (lowercaseLine.includes('mongodb') || lowercaseLine.includes('mongo')) {
      prodDeps.add('mongodb')
    } else if (lowercaseLine.includes('sqlite')) {
      prodDeps.add('sqlite3')
    }

    // 5. Testing frameworks in Test/Suite lines
    if (line.startsWith('Test ') || line.startsWith('Suite ')) {
      if (lowercaseLine.includes('vitest')) {
        devDeps.add('vitest')
      } else if (lowercaseLine.includes('jest')) {
        devDeps.add('jest')
        if (isTs) devDeps.add('@types/jest')
      } else if (lowercaseLine.includes('cypress')) {
        devDeps.add('cypress')
      }
    }

    // 6. Scan for explicit JIT @install directive: @install <package-name> or @install-dev <package-name> or @install -D <package-name>
    const explicitInstallMatches = line.match(/@install(?:-dev|\s+-D)?\s+["']?([A-Za-z0-9_/@-]+)["']?/gi) || []
    for (const match of explicitInstallMatches) {
      const isDev = match.includes('-dev') || match.includes('-D')
      const pkg = match.replace(/@install(?:-dev|\s+-D)?\s+["']?/, '').replace(/["']?$/, '').trim()
      if (pkg) {
        if (isDev) {
          devDeps.add(pkg)
        } else {
          prodDeps.add(pkg)
        }
      }
    }
  }

  // Remove duplicates from devDeps if present in prodDeps
  for (const d of devDeps) {
    prodDeps.delete(d)
  }

  return {
    prodDeps: Array.from(prodDeps),
    devDeps: Array.from(devDeps)
  }
}

export async function installDependencies(file: string, options: { dryRun?: boolean, silentIfAllInstalled?: boolean } = {}) {
  const cwd = process.cwd()
  const isTs = fs.existsSync(path.join(cwd, 'tsconfig.json'))

  if (!fs.existsSync(file)) {
    console.log(chalk.red(`✗ File not found: ${file}`))
    process.exit(1)
  }

  const content = fs.readFileSync(file, 'utf8')
  const { prodDeps, devDeps } = extractDependenciesFromContent(content, isTs)

  // Filter only those packages that are NOT installed yet
  const missingProd = prodDeps.filter(d => !isPackageInstalled(d, cwd))
  const missingDev = devDeps.filter(d => !isPackageInstalled(d, cwd))

  if (missingProd.length === 0 && missingDev.length === 0) {
    if (!options.silentIfAllInstalled) {
      console.log(chalk.green(`✓ All dependencies for ${path.basename(file)} are already satisfied.`))
    }
    return
  }

  const pm = detectPackageManager(cwd)

  if (options.dryRun) {
    console.log(chalk.cyan(`\nDry run: JIT Dependencies mapping for ${path.basename(file)} (${chalk.bold(pm)}):`))
    if (missingProd.length > 0) {
      console.log(chalk.green(`  Production Dependencies (to install):`))
      missingProd.forEach(d => console.log(`    - ${d}`))
    }
    if (missingDev.length > 0) {
      console.log(chalk.blue(`  Development Dependencies (to install):`))
      missingDev.forEach(d => console.log(`    - ${d}`))
    }
    console.log()
    return
  }

  const spinner = ora('Detecting package manager...').start()
  spinner.text = `Installing JIT dependencies using ${pm}...`

  try {
    if (missingProd.length > 0) {
      let cmd = ''
      if (pm === 'npm') cmd = `npm install ${missingProd.join(' ')}`
      else if (pm === 'pnpm') cmd = `pnpm add ${missingProd.join(' ')}`
      else if (pm === 'yarn') cmd = `yarn add ${missingProd.join(' ')}`

      spinner.text = `Installing production dependencies: ${missingProd.join(', ')}...`
      execSync(cmd, { stdio: 'ignore', cwd })
    }

    if (missingDev.length > 0) {
      let cmd = ''
      if (pm === 'npm') cmd = `npm install -D ${missingDev.join(' ')}`
      else if (pm === 'pnpm') cmd = `pnpm add -D ${missingDev.join(' ')}`
      else if (pm === 'yarn') cmd = `yarn add -D ${missingDev.join(' ')}`

      spinner.text = `Installing dev dependencies: ${missingDev.join(', ')}...`
      execSync(cmd, { stdio: 'ignore', cwd })
    }

    spinner.succeed(chalk.green(`✓ Dependencies for ${path.basename(file)} installed successfully JIT!`))
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    spinner.fail(chalk.red(`Failed to install JIT dependencies: ${msg}`))
    process.exit(1)
  }
}

export function installCommand(): Command {
  return new Command('install')
    .description('Install dependencies required by a specific .nexus file or scan the workspace JIT')
    .argument('[file]', '.nexus file to parse and install dependencies for (optional)')
    .option('--dry-run', 'List dependencies that would be installed without installing them')
    .action(async (file: string | undefined, options) => {
      const cwd = process.cwd()

      if (file) {
        await installDependencies(file, options)
      } else {
        // Fallback: Scan current workspace directory for any .nexus files
        const files = fs.readdirSync(cwd).filter(f => f.endsWith('.nexus'))
        
        if (files.length === 0) {
          console.log(chalk.red('✗ No .nexus files found in the current directory.'))
          console.log(chalk.gray('  Specify a specific file: "nexus install <file.nexus>"'))
          process.exit(1)
        }

        console.log(chalk.cyan(`Scanning all ${files.length} .nexus files in the directory...`))
        
        // Merge contents to extract total dependencies
        let combinedContent = ''
        for (const f of files) {
          combinedContent += fs.readFileSync(path.join(cwd, f), 'utf8') + '\n'
        }

        const isTs = fs.existsSync(path.join(cwd, 'tsconfig.json'))
        const { prodDeps, devDeps } = extractDependenciesFromContent(combinedContent, isTs)

        // Filter only those packages that are NOT installed yet
        const missingProd = prodDeps.filter(d => !isPackageInstalled(d, cwd))
        const missingDev = devDeps.filter(d => !isPackageInstalled(d, cwd))

        if (missingProd.length === 0 && missingDev.length === 0) {
          console.log(chalk.green('✓ All workspace dependencies are already satisfied.'))
          return
        }

        const pm = detectPackageManager(cwd)

        if (options.dryRun) {
          console.log(chalk.cyan(`\nDry run: JIT Workspace Dependencies mapping (${chalk.bold(pm)}):`))
          if (missingProd.length > 0) {
            console.log(chalk.green(`  Production Dependencies (to install):`))
            missingProd.forEach(d => console.log(`    - ${d}`))
          }
          if (missingDev.length > 0) {
            console.log(chalk.blue(`  Development Dependencies (to install):`))
            missingDev.forEach(d => console.log(`    - ${d}`))
          }
          console.log()
          return
        }

        const spinner = ora('Detecting package manager...').start()
        spinner.text = `Installing combined dependencies using ${pm}...`

        try {
          if (missingProd.length > 0) {
            let cmd = ''
            if (pm === 'npm') cmd = `npm install ${missingProd.join(' ')}`
            else if (pm === 'pnpm') cmd = `pnpm add ${missingProd.join(' ')}`
            else if (pm === 'yarn') cmd = `yarn add ${missingProd.join(' ')}`

            spinner.text = `Installing production dependencies...`
            execSync(cmd, { stdio: 'ignore', cwd })
          }

          if (missingDev.length > 0) {
            let cmd = ''
            if (pm === 'npm') cmd = `npm install -D ${missingDev.join(' ')}`
            else if (pm === 'pnpm') cmd = `pnpm add -D ${missingDev.join(' ')}`
            else if (pm === 'yarn') cmd = `yarn add -D ${missingDev.join(' ')}`

            spinner.text = `Installing dev dependencies...`
            execSync(cmd, { stdio: 'ignore', cwd })
          }

          spinner.succeed(chalk.green('✓ All workspace .nexus dependencies installed successfully JIT!'))
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err)
          spinner.fail(chalk.red(`Failed to install workspace dependencies: ${msg}`))
          process.exit(1)
        }
      }
    })
}
