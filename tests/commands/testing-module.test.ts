import { describe, it, expect, afterEach } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'

const ROOT = path.resolve('.')

let tmpDir: string

function setup(modules: string[]) {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nexus-testing-module-'))
  fs.writeFileSync(path.join(tmpDir, 'nexus.config.json'), JSON.stringify({
    lang: 'en',
    modules,
    framework: 'next-ts',
    styling: 'tailwind',
    output: './src/components',
    tokens: { primary: '#6EE7B7', secondary: '#64748b', danger: '#ef4444', success: '#22c55e', radius: '8px', font: "'Inter'" },
    icons: { library: 'lucide-react' },
    standards: ['Clean Code']
  }, null, 2))
}

function runContext() {
  return execSync(`npx tsx ${ROOT}/src/index.ts context`, { cwd: tmpDir }).toString()
}

afterEach(() => {
  if (tmpDir) fs.removeSync(tmpDir)
})

describe('nexus context — testing module', () => {
  it('includes Test and Suite orchestrators when testing module is active', () => {
    setup(['frontend', 'testing'])
    const output = runContext()
    expect(output).toContain('Test')
    expect(output).toContain('Suite')
  })

  it('includes test grammar operators when testing module is active', () => {
    setup(['frontend', 'testing'])
    const output = runContext()
    expect(output).toContain('renders:')
    expect(output).toContain('handles:')
    expect(output).toContain('asserts:')
    expect(output).toContain('mocks:')
  })

  it('includes supported frameworks in grammar', () => {
    setup(['frontend', 'testing'])
    const output = runContext()
    expect(output).toContain('vitest')
    expect(output).toContain('jest')
    expect(output).toContain('cypress')
  })

  it('includes testing reference example in prompt', () => {
    setup(['frontend', 'testing'])
    const output = runContext()
    expect(output).toContain('Test UserTable')
    expect(output).toContain('Suite "Auth Flow"')
  })

  it('does NOT include test grammar when testing module is not active', () => {
    setup(['frontend'])
    const output = runContext()
    expect(output).not.toContain('renders:')
    expect(output).not.toContain('handles:')
    expect(output).not.toContain('snapshot:')
  })

  it('works standalone without frontend module', () => {
    setup(['testing'])
    const output = runContext()
    expect(output).toContain('Test')
    expect(output).toContain('renders:')
    expect(output).toContain('NEXUS NOTATION')
  })
})
