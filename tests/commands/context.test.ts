import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('genera las instrucciones maestras de inducción v2.5', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('[NEXUS LANGUAGE INDUCTION]')
    expect(output).toContain('Intérprete Nativo de NEXUS v2.5')
    expect(output).toContain('GRAMÁTICA MAESTRA (v2.5)')
    expect(output).toContain('DNA DEL PROYECTO')
    expect(output).toContain('NEXUS_SYSTEM_ONLINE')
  })

  it('incluye ejemplos de referencia en el prompt', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('EJEMPLOS DE REFERENCIA')
    expect(output).toContain('Card #glass')
    expect(output).toContain('Form "login"')
    expect(output).toContain('Grid [cols:3]')
  })
})
