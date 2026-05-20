import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { extractContract } from '../core/extractor.js'
import { verifyContract } from '../core/verifier.js'

const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.vue', '.py', '.go'])

function readCodeFiles(dir: string): Map<string, string> {
  const files = new Map<string, string>()
  if (!fs.existsSync(dir)) return files

  function walk(current: string): void {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'dist') {
          walk(full)
        }
      } else if (CODE_EXTENSIONS.has(path.extname(entry.name))) {
        files.set(path.relative(process.cwd(), full), fs.readFileSync(full, 'utf-8'))
      }
    }
  }

  walk(dir)
  return files
}

const TYPE_LABELS: Record<string, string> = {
  auth:           'auth',
  assertion:      'precondition',
  'error-handler':'error handler',
  action:         'action',
  install:        'dependency',
  endpoint:       'endpoint',
  pagination:     'pagination',
}

export const verifyCommand = new Command('verify')
  .description('Verify that generated code implements a NEXUS blueprint')
  .argument('<blueprint>', 'Path to the .nexus blueprint file')
  .argument('[codedir]', 'Directory to scan for generated code', './src')
  .option('--json', 'Output results as JSON')
  .action((blueprintPath: string, codeDir: string, options: { json?: boolean }) => {
    const absBlueprint = path.resolve(process.cwd(), blueprintPath)
    if (!fs.existsSync(absBlueprint)) {
      console.error(chalk.red(`Blueprint not found: ${blueprintPath}`))
      process.exit(1)
    }

    const blueprint = fs.readFileSync(absBlueprint, 'utf-8')
    const items = extractContract(blueprint)

    if (items.length === 0) {
      console.log(chalk.yellow('⚠  No verifiable contract items found in blueprint.'))
      process.exit(0)
    }

    const absCodeDir = path.resolve(process.cwd(), codeDir)
    const codeFiles = readCodeFiles(absCodeDir)

    // Load package.json from project root if present
    let packageJson: Record<string, unknown> = {}
    const pkgPath = path.join(process.cwd(), 'package.json')
    if (fs.existsSync(pkgPath)) {
      packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    }

    const results = verifyContract(items, codeFiles, packageJson)

    if (options.json) {
      console.log(JSON.stringify(results, null, 2))
      return
    }

    const passed = results.filter(r => r.found)
    const failed = results.filter(r => !r.found)

    console.log(chalk.cyan(`\n⬡ nexus verify — ${path.basename(blueprintPath)}\n`))

    for (const r of results) {
      const icon     = r.found ? chalk.green('✓') : chalk.red('✗')
      const label    = chalk.dim(`[${TYPE_LABELS[r.item.type] ?? r.item.type}]`)
      const location = r.foundIn ? chalk.dim(` → ${r.foundIn}`) : ''
      console.log(`  ${icon} ${label} ${r.item.declaration}${location}`)
    }

    console.log()
    console.log(
      `  ${chalk.green(`${passed.length} passed`)}  ` +
      (failed.length > 0 ? chalk.red(`${failed.length} failed`) : chalk.dim('0 failed'))
    )
    console.log()

    if (failed.length > 0) process.exit(1)
  })
