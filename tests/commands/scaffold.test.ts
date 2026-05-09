import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'

const ROOT = path.resolve('.')
const VALID_CONFIG = {
  lang: 'en',
  modules: ['frontend'],
  framework: 'next-ts',
  styling: 'tailwind',
  output: './src/components',
  tokens: {
    primary: '#6EE7B7', secondary: '#64748b', danger: '#ef4444',
    success: '#22c55e', radius: '8px', font: "'Inter', sans-serif"
  },
  icons: { library: 'lucide-react' },
  standards: ['Clean Code']
}

let tmpDir: string

function setup(config = VALID_CONFIG) {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nexus-scaffold-'))
  fs.writeFileSync(path.join(tmpDir, 'nexus.config.json'), JSON.stringify(config, null, 2))
}

function runScaffold(args = '') {
  try {
    const out = execSync(`npx tsx ${ROOT}/src/index.ts scaffold ${args}`, {
      cwd: tmpDir,
      stdio: ['pipe', 'pipe', 'pipe']
    })
    return { output: out.toString(), ok: true }
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer; stderr?: Buffer }
    const combined = (err.stdout?.toString() || '') + (err.stderr?.toString() || '')
    return { output: combined, ok: false }
  }
}

afterEach(() => {
  if (tmpDir) fs.removeSync(tmpDir)
})

describe('nexus scaffold', () => {
  it('fails if nexus.config.json is missing', () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nexus-scaffold-'))
    const { output } = runScaffold()
    expect(output).toContain('nexus.config.json not found')
  })

  it('creates all base files with next-ts + tailwind', () => {
    setup()
    const { output, ok } = runScaffold()
    expect(ok).toBe(true)
    expect(output).toContain('6 files created')
    expect(fs.existsSync(path.join(tmpDir, 'src/lib/utils.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src/types/index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src/hooks/index.ts'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src/components/ui/Button.tsx'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src/components/ui/Card.tsx'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src/components/ui/Input.tsx'))).toBe(true)
  })

  it('dry-run shows files without creating them', () => {
    setup()
    const { output, ok } = runScaffold('--dry-run')
    expect(ok).toBe(true)
    expect(output).toContain('would be created')
    expect(output).toContain('Run nexus scaffold to apply')
    expect(fs.existsSync(path.join(tmpDir, 'src/lib/utils.ts'))).toBe(false)
  })

  it('skips files that already exist', () => {
    setup()
    runScaffold()
    const { output } = runScaffold()
    expect(output).toContain('0 files created, 6 skipped')
    expect(output).toContain('already exists, skipped')
  })

  it('utils.ts includes cn helper for tailwind projects', () => {
    setup()
    runScaffold()
    const utils = fs.readFileSync(path.join(tmpDir, 'src/lib/utils.ts'), 'utf8')
    expect(utils).toContain('cn')
  })

  it('Button.tsx uses tailwind classes for tailwind projects', () => {
    setup()
    runScaffold()
    const button = fs.readFileSync(path.join(tmpDir, 'src/components/ui/Button.tsx'), 'utf8')
    expect(button).toContain('bg-blue-600')
  })

  it('uses .jsx extension for react-js framework', () => {
    setup({ ...VALID_CONFIG, framework: 'react-js' })
    runScaffold()
    expect(fs.existsSync(path.join(tmpDir, 'src/components/ui/Button.jsx'))).toBe(true)
    expect(fs.existsSync(path.join(tmpDir, 'src/hooks/index.js'))).toBe(true)
  })

  it('types/index.ts includes ApiResponse for typescript projects', () => {
    setup()
    runScaffold()
    const types = fs.readFileSync(path.join(tmpDir, 'src/types/index.ts'), 'utf8')
    expect(types).toContain('ApiResponse')
  })

  it('hooks/index.ts includes useLocalStorage and useDebounce', () => {
    setup()
    runScaffold()
    const hooks = fs.readFileSync(path.join(tmpDir, 'src/hooks/index.ts'), 'utf8')
    expect(hooks).toContain('useLocalStorage')
    expect(hooks).toContain('useDebounce')
  })
})
