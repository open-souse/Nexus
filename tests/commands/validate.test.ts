import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import { writeFileSync, unlinkSync } from 'fs'

const TMP = './tmp-test.nexus'

function run(content: string): { output: string; ok: boolean } {
  writeFileSync(TMP, content)
  try {
    const output = execSync(`npx tsx src/index.ts validate ${TMP}`).toString()
    return { output, ok: true }
  } catch (e: any) {
    return { output: e.stdout?.toString() ?? '', ok: false }
  } finally {
    unlinkSync(TMP)
  }
}

describe('nexus validate', () => {
  it('valida un archivo .nexus correcto', () => {
    const { ok } = run(`@React #Tailwind\nCard #primary\n  Button "OK" -> /home`)
    expect(ok).toBe(true)
  })

  it('detecta indentación inválida (3 espacios)', () => {
    const { ok, output } = run(`Card\n   Button "OK"`)
    expect(ok).toBe(false)
    expect(output).toContain('Indentación inválida')
  })

  it('detecta -> sin destino', () => {
    const { ok, output } = run(`Button "Go" ->`)
    expect(ok).toBe(false)
    expect(output).toContain('"->" sin destino')
  })

  it('detecta => sin acción', () => {
    const { ok, output } = run(`Button "Send" =>`)
    expect(ok).toBe(false)
    expect(output).toContain('"=>" sin acción')
  })

  it('ignora comentarios y líneas vacías', () => {
    const { ok } = run(`// Este es un comentario\n\n@React\nCard #glass`)
    expect(ok).toBe(true)
  })
})
