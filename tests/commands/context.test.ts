import { describe, it, expect, afterEach } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'

const ROOT = path.resolve('.')

let tmpDir: string

function setup() {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nexus-context-'))
  fs.writeFileSync(path.join(tmpDir, 'nexus.config.json'), JSON.stringify({
    lang: 'en',
    modules: ['frontend'],
    framework: 'next-ts',
    styling: 'tailwind',
    output: './src/components',
    tokens: { primary: '#2563eb', secondary: '#64748b', danger: '#ef4444', success: '#22c55e', radius: '8px', font: "'Inter'" },
    icons: { library: 'lucide-react' },
    standards: ['Clean Code']
  }, null, 2))
}

function runContext() {
  return execSync(`npx tsx ${ROOT}/src/index.ts context`, { cwd: tmpDir }).toString()
}

function readNexusMd() {
  return fs.readFileSync(path.join(tmpDir, 'NEXUS.md'), 'utf8')
}

afterEach(() => {
  if (tmpDir) fs.removeSync(tmpDir)
})

describe('nexus context', () => {
  it('generates NEXUS.md with the NEXUS notation reference', () => {
    setup()
    runContext()
    const content = readNexusMd()
    expect(content).toContain('NEXUS NOTATION')
    expect(content).toContain('v4.0')
  })

  it('includes the syntax reference header', () => {
    setup()
    runContext()
    const content = readNexusMd()
    expect(content).toContain('NEXUS SYNTAX REFERENCE')
    expect(content).toContain('PROJECT DNA')
  })

  it('includes reference examples', () => {
    setup()
    runContext()
    const content = readNexusMd()
    expect(content).toContain('EXAMPLES')
    expect(content).toContain('Card #glass')
  })

  it('includes safe-edit operator rules', () => {
    setup()
    runContext()
    const content = readNexusMd()
    expect(content).toContain('@modify')
    expect(content).toContain('preserve:all')
    expect(content).toContain('inherit:siblings')
    expect(content).toContain('cascade:children')
    expect(content).toContain('position:move-to:N')
  })

  it('includes all main grammar operators', () => {
    setup()
    runContext()
    const content = readNexusMd()
    expect(content).toContain('->')
    expect(content).toContain('=>')
    expect(content).toContain('* N')
    expect(content).toContain('[locked]')
    expect(content).toContain('[new]')
  })

  it('includes v3.3 frontend operators', () => {
    setup()
    runContext()
    const content = readNexusMd()
    expect(content).toContain('[animate:')
    expect(content).toContain('[hover:')
    expect(content).toContain('[a11y:')
    expect(content).toContain('Store')
  })

  it('includes Create orchestrator and filesystem rule', () => {
    setup()
    runContext()
    const content = readClaudeMd()
    expect(content).toContain('Create')
    expect(content).toContain('type:component')
    expect(content).toContain('type:feature')
    expect(content).toContain('filesystem')
  })

  it('registers the /nexus slash command', () => {
    setup()
    runContext()
    const slashCmd = path.join(tmpDir, '.claude', 'commands', 'nexus.md')
    expect(fs.existsSync(slashCmd)).toBe(true)
    const content = fs.readFileSync(slashCmd, 'utf8')
    expect(content).toContain('NEXUS')
  })
})
