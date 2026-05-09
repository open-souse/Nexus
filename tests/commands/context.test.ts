import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('genera las instrucciones maestras de inducción v2.6', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('[NEXUS LANGUAGE INDUCTION]')
    expect(output).toContain('Intérprete Nativo de NEXUS v3.0')
    expect(output).toContain('GRAMÁTICA MAESTRA (v3.0)')
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

  it('incluye los nuevos operadores de edición segura', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('@modify')
    expect(output).toContain('preserve:all')
    expect(output).toContain('inherit:siblings')
    expect(output).toContain('cascade:children')
    expect(output).toContain('position:move-to:N')
  })

  it('incluye ejemplos de @modify en el prompt', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('Captcha [new, inherit:siblings]')
    expect(output).toContain('position:move-to:1')
    expect(output).toContain('shadow:elevated, cascade:children')
  })
})
