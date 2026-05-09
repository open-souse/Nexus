import { describe, it, expect, afterEach } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, unlinkSync, writeFileSync } from 'fs'

const CONFIG_PATH = './nexus.config.json'

const VALID_CONFIG = {
  lang: 'es',
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

  it('pasa con una configuración válida completa', () => {
    writeConfig(VALID_CONFIG)
    const { ok, output } = runDoctor()
    expect(ok).toBe(true)
    expect(output).toContain('Todo está en orden')
  })

  it('falla si no existe nexus.config.json', () => {
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('nexus.config.json no encontrado')
  })

  it('falla si falta el campo framework', () => {
    const { framework: _f, ...withoutFramework } = VALID_CONFIG
    writeConfig(withoutFramework)
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('framework no definido')
  })

  it('falla si faltan tokens requeridos', () => {
    const config = { ...VALID_CONFIG, tokens: { success: '#22c55e', radius: '8px', font: 'Inter' } }
    writeConfig(config)
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('tokens.primary no definido')
  })

  it('muestra advertencia si framework no es estándar', () => {
    writeConfig({ ...VALID_CONFIG, framework: 'angular' })
    const { output } = runDoctor()
    expect(output).toContain('no es estándar')
  })

  it('muestra advertencia si lang no está definido', () => {
    const { lang: _l, ...withoutLang } = VALID_CONFIG
    writeConfig(withoutLang)
    const { output } = runDoctor()
    expect(output).toContain('lang no definido')
  })

  it('verifica cada token requerido por separado', () => {
    writeConfig({
      ...VALID_CONFIG,
      tokens: { ...VALID_CONFIG.tokens, danger: undefined }
    })
    const { ok, output } = runDoctor()
    expect(ok).toBe(false)
    expect(output).toContain('tokens.danger no definido')
  })

  it('reporta la versión del framework cuando es válido', () => {
    writeConfig(VALID_CONFIG)
    const { output } = runDoctor()
    expect(output).toContain('framework: react-ts')
  })

  it('reporta el output configurado', () => {
    writeConfig(VALID_CONFIG)
    const { output } = runDoctor()
    expect(output).toContain('output: ./src/components')
  })
})
