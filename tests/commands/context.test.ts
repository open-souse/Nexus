import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('genera el inductor de lenguaje NEXUS v3.2', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('[NEXUS LANGUAGE INDUCTION]')
    expect(output).toContain('Intérprete Nativo de NEXUS v3.2')
    expect(output).toContain('GRAMÁTICA MAESTRA (v3.2)')
    expect(output).toContain('DNA DEL PROYECTO')
    expect(output).toContain('NEXUS_SYSTEM_ONLINE')
  })

  it('incluye ejemplos de referencia en el prompt', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('EJEMPLOS DE REFERENCIA')
    expect(output).toContain('Card #glass')
  })

  it('incluye los operadores de edición segura', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('@modify')
    expect(output).toContain('preserve:all')
    expect(output).toContain('inherit:siblings')
    expect(output).toContain('cascade:children')
    expect(output).toContain('position:move-to:N')
  })

  it('incluye todos los operadores principales de la gramática', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('->') // navegación
    expect(output).toContain('=>') // side-effects
    expect(output).toContain('< ') // data binding
    expect(output).toContain('* N') // multiplicador
    expect(output).toContain('? ') // estados
    expect(output).toContain('! ') // prioridad
    expect(output).toContain('[ ]') // atributos
    expect(output).toContain('[locked]') // componente protegido
    expect(output).toContain('[new]') // elemento nuevo
  })

  it('incluye los nuevos operadores de frontend v3.2', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('[animate:') // animaciones
    expect(output).toContain('[hover:') // interacción
    expect(output).toContain('[a11y:') // accesibilidad
    expect(output).toContain('Store') // estado global
  })


  it('incluye el DNA del proyecto en el prompt', () => {
    const output = execSync('npx tsx src/index.ts context').toString()

    expect(output).toContain('DNA DEL PROYECTO')
    expect(output).toContain('NEXUS_SYSTEM_ONLINE')
  })
})
