import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import type { NexusConfig } from '../types/nexus.js'

interface ScaffoldFile {
  path: string
  content: string
}

function getUtilsContent(styling: string): string {
  if (styling === 'tailwind') {
    return `type ClassValue = string | undefined | null | false | ClassValue[]

function flatClasses(inputs: ClassValue[]): string[] {
  return inputs.reduce<string[]>((acc, val) => {
    if (Array.isArray(val)) return acc.concat(flatClasses(val))
    if (val) acc.push(val)
    return acc
  }, [])
}

function cn(...inputs: ClassValue[]): string {
  return flatClasses(inputs).join(' ')
}

export { cn }
`
  }
  return `export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
`
}

function getButtonContent(framework: string, styling: string): string {
  const isTs = framework.endsWith('-ts')
  const useTailwind = styling === 'tailwind'

  if (isTs) {
    return `import React from 'react'
${useTailwind ? "import { cn } from '@/lib/utils'\n" : ''}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
${useTailwind ? `  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  }
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </button>
  )` : `  return (
    <button
      className={\`btn btn--\${variant} btn--\${size}\${loading ? ' btn--loading' : ''}\${className ? ' ' + className : ''}\`}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  )`}
}
`
  }

  return `import React from 'react'
${useTailwind ? "import { cn } from '@/lib/utils'\n" : ''}
export default function Button({ children, variant = 'primary', size = 'md', loading = false, className, disabled, ...props }) {
  return (
    <button
      className={${useTailwind ? `cn('btn', \`btn--\${variant}\`, \`btn--\${size}\`, className)` : `\`btn btn--\${variant} btn--\${size}\``}}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  )
}
`
}

function getCardContent(framework: string, styling: string): string {
  const isTs = framework.endsWith('-ts')
  const useTailwind = styling === 'tailwind'

  if (isTs) {
    return `import React from 'react'
${useTailwind ? "import { cn } from '@/lib/utils'\n" : ''}
interface CardProps {
  children: React.ReactNode
  className?: string
  elevated?: boolean
}

export default function Card({ children, className, elevated = false }: CardProps) {
  return (
    <div
      className={${useTailwind
        ? `cn('rounded-xl border border-gray-200 bg-white p-6', elevated && 'shadow-lg', className)`
        : `\`card\${elevated ? ' card--elevated' : ''}\${className ? ' ' + className : ''}\``
      }}
    >
      {children}
    </div>
  )
}
`
  }

  return `import React from 'react'
${useTailwind ? "import { cn } from '@/lib/utils'\n" : ''}
export default function Card({ children, className, elevated = false }) {
  return (
    <div className={${useTailwind
      ? `cn('rounded-xl border border-gray-200 bg-white p-6', elevated && 'shadow-lg', className)`
      : `\`card\${elevated ? ' card--elevated' : ''}\${className ? ' ' + className : ''}\``
    }}>
      {children}
    </div>
  )
}
`
}

function getInputContent(framework: string, styling: string): string {
  const isTs = framework.endsWith('-ts')
  const useTailwind = styling === 'tailwind'

  if (isTs) {
    return `import React from 'react'
${useTailwind ? "import { cn } from '@/lib/utils'\n" : ''}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\\s+/g, '-')
  return (
    <div className=${useTailwind ? `"flex flex-col gap-1"` : `"input-wrapper"`}>
      {label && (
        <label htmlFor={inputId} className=${useTailwind ? `"text-sm font-medium text-gray-700"` : `"input-label"`}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={${useTailwind
          ? `cn('w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent', error && 'border-red-500 focus:ring-red-500', className)`
          : `\`input\${error ? ' input--error' : ''}\${className ? ' ' + className : ''}\``
        }}
        {...props}
      />
      {error && <span className=${useTailwind ? `"text-xs text-red-500"` : `"input-error"`}>{error}</span>}
    </div>
  )
}
`
  }

  return `import React from 'react'
${useTailwind ? "import { cn } from '@/lib/utils'\n" : ''}
export default function Input({ label, error, className, id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\\s+/g, '-')
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={\`input\${error ? ' input--error' : ''}\`} {...props} />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
`
}

function getHooksIndex(framework: string): string {
  const isTs = framework.endsWith('-ts')
  if (isTs) {
    return `import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStored(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch { /* ignore */ }
  }

  return [stored, setValue]
}

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
`
  }
  return `import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStored(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch { /* ignore */ }
  }

  return [stored, setValue]
}

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
`
}

function getTypesIndex(framework: string): string {
  const isTs = framework.endsWith('-ts')
  if (!isTs) return '// Add your shared types here\n'
  return `export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  perPage: number
}

export type ID = string | number

export type Nullable<T> = T | null

export type Optional<T> = T | undefined
`
}

function buildScaffold(config: Partial<NexusConfig>): ScaffoldFile[] {
  const framework = config.framework || 'react-ts'
  const styling = config.styling || 'none'
  const ext = framework.endsWith('-ts') ? 'tsx' : 'jsx'
  const utilsExt = framework.endsWith('-ts') ? 'ts' : 'js'
  const typesExt = framework.endsWith('-ts') ? 'ts' : 'js'

  const files: ScaffoldFile[] = [
    { path: `src/lib/utils.${utilsExt}`, content: getUtilsContent(styling) },
    { path: `src/types/index.${typesExt}`, content: getTypesIndex(framework) },
    { path: `src/hooks/index.${utilsExt}`, content: getHooksIndex(framework) },
    { path: `src/components/ui/Button.${ext}`, content: getButtonContent(framework, styling) },
    { path: `src/components/ui/Card.${ext}`, content: getCardContent(framework, styling) },
    { path: `src/components/ui/Input.${ext}`, content: getInputContent(framework, styling) },
  ]

  return files
}

export function scaffoldCommand(): Command {
  return new Command('scaffold')
    .description('Generate base folder structure and starter files for your project')
    .option('--dry-run', 'Preview what will be created without writing files')
    .action(async (options) => {
      const isDryRun: boolean = options.dryRun || false
      const spinner = ora('Reading project DNA...').start()

      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')

        if (!fs.existsSync(configPath)) {
          spinner.fail(chalk.red('nexus.config.json not found. Run nexus init first.'))
          process.exit(1)
        }

        const config: Partial<NexusConfig> = JSON.parse(await fs.readFile(configPath, 'utf8'))
        const files = buildScaffold(config)

        spinner.succeed(chalk.green(isDryRun ? 'Preview (dry-run):' : 'Scaffolding project...'))
        console.log()

        let created = 0
        let skipped = 0

        for (const file of files) {
          const fullPath = path.join(process.cwd(), file.path)
          const exists = fs.existsSync(fullPath)

          if (exists) {
            console.log(chalk.gray(`  ~ ${file.path} (already exists, skipped)`))
            skipped++
          } else if (isDryRun) {
            console.log(chalk.cyan(`  + ${file.path}`))
            created++
          } else {
            await fs.ensureDir(path.dirname(fullPath))
            await fs.writeFile(fullPath, file.content, 'utf8')
            console.log(chalk.green(`  ✓ ${file.path}`))
            created++
          }
        }

        console.log()
        if (isDryRun) {
          console.log(chalk.cyan(`  ${created} files would be created, ${skipped} skipped`))
          console.log(chalk.gray('  Run nexus scaffold to apply.\n'))
        } else {
          console.log(chalk.green(`  ${created} files created, ${skipped} skipped`))
          console.log(chalk.gray('  Run nexus context to generate your AI inductor.\n'))
        }

      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        spinner.fail(chalk.red(`Error: ${msg}`))
      }
    })
}
