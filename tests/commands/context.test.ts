import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('genera las instrucciones maestras de inducción v2.5', () => {
    // Usamos npx tsx para ejecutar el código fuente directamente y evitar basura de compilación
    const output = execSync('npx tsx src/index.ts context').toString()
    
    expect(output).toContain('[NEXUS LANGUAGE INDUCTION]')
    expect(output).toContain('Intérprete Nativo de NEXUS v2.5')
    expect(output).toContain('GRAMÁTICA MAESTRA (v2.5)')
    expect(output).toContain('DNA DEL PROYECTO')
    expect(output).toContain('NEXUS_SYSTEM_ONLINE')
  })
})
