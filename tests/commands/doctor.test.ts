import { describe, it, expect, afterEach } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, unlinkSync, writeFileSync } from 'fs'

const CONFIG_PATH = './nexus.config.json'

const VALID_CONFIG = {
  lang: 'en',
  framework: 'react-ts',
  styling: 'tailwind',
  output: './src/components',
  tokens: {
    primary: '#2563eb',
    secondary: '#64748b',
    danger: '#ef4444',
    success: '#22c55e',
    radius: '8px',
    font: "'Inter', sans-serif"
  },
  icons: { library: 'lucide-react' }
}

function writeConfig(config: object) {
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2))
}

function runDoctor(): { output: string; ok: boolean } {
  try {
    const output = execSync('npx tsx src/index.ts doctor').toString()
    return { output, ok: true }
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer }
    return { output: err.stdout?.toString() ?? '', ok: false }
  }
}

describe('nexus doctor', () => {
  afterEach(() => {
    if (existsSync(CONFIG_PATH)) unlinkSync(CONFIG_PATH)
  })

  it('passes with a complete valid config', () => {
    writeConfig(VALID_CONFIG)
    const { ok, output } = runDoctor()
    expect(ok).toBe(true)
    expect(output).toContain('Everything looks good')
  })

  it('fails if nexus.config.json does not exist', () => {
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('nexus.config.json not found')
  })

  it('fails if framework field is missing', () => {
    const { framework: _f, ...withoutFramework } = VALID_CONFIG
    writeConfig(withoutFramework)
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('framework not defined')
  })

  it('fails if required tokens are missing', () => {
    const config = { ...VALID_CONFIG, tokens: { success: '#22c55e', radius: '8px', font: 'Inter' } }
    writeConfig(config)
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('tokens.primary not defined')
  })

  it('shows warning if framework is non-standard', () => {
    writeConfig({ ...VALID_CONFIG, framework: 'angular' })
    const { output } = runDoctor()
    expect(output).toContain('not standard')
  })

  it('shows warning if lang is not defined', () => {
    const { lang: _l, ...withoutLang } = VALID_CONFIG
    writeConfig(withoutLang)
    const { output } = runDoctor()
    expect(output).toContain('lang not defined')
  })

  it('checks each required token separately', () => {
    writeConfig({
      ...VALID_CONFIG,
      tokens: { ...VALID_CONFIG.tokens, danger: undefined }
    })
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('tokens.danger not defined')
  })

  it('reports the framework when valid', () => {
    writeConfig(VALID_CONFIG)
    const { output } = runDoctor()
    expect(output).toContain('framework: react-ts')
  })

  it('reports the configured output path', () => {
    writeConfig(VALID_CONFIG)
    const { output } = runDoctor()
    expect(output).toContain('output: ./src/components')
  })
})
