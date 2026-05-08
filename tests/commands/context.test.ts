import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('genera las instrucciones maestras', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('Actúa como un Desarrollador Senior Experto')
    expect(output).toContain('REGLAS DE ORO DE NEXUS')
    expect(output).toContain('SISTEMA NEXUS ONLINE')
  })
})
