import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import { writeFileSync, unlinkSync } from 'fs'

const TMP = './tmp-test.nexus'

function run(content: string): { output: string; ok: boolean } {
  writeFileSync(TMP, content)
  try {
    const output = execSync(`npx tsx src/index.ts validate ${TMP}`).toString()
    return { output, ok: true }
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer }
    return { output: err.stdout?.toString() ?? '', ok: false }
  } finally {
    unlinkSync(TMP)
  }
}

describe('nexus validate — casos válidos', () => {
  it('acepta un archivo básico correcto', () => {
    const { ok } = run('@React #Tailwind\nCard #primary\n  Button "OK" -> /home')
    expect(ok).toBe(true)
  })

  it('ignora comentarios y líneas vacías', () => {
    const { ok } = run('// comentario\n\n@React\nCard #glass')
    expect(ok).toBe(true)
  })

  it('acepta variables $ bien formadas', () => {
    const { ok } = run('$brand: "Nexus"\nCard #glass')
    expect(ok).toBe(true)
  })

  it('acepta estado local ~ bien formado', () => {
    const { ok } = run('~isOpen: false\nCard #glass')
    expect(ok).toBe(true)
  })

  it('acepta multiplicador * con número válido', () => {
    const { ok } = run('Card * 3')
    expect(ok).toBe(true)
  })

  it('acepta data binding < con tipo', () => {
    const { ok } = run('Table < User')
    expect(ok).toBe(true)
  })

  it('acepta inyección de contexto {} balanceada', () => {
    const { ok } = run('UserMenu < { ./UserMenu.tsx }')
    expect(ok).toBe(true)
  })

  it('acepta atributos [] balanceados', () => {
    const { ok } = run('Grid [cols:3]')
    expect(ok).toBe(true)
  })

  it('acepta navegación -> con destino', () => {
    const { ok } = run('Button "Go" -> /dashboard')
    expect(ok).toBe(true)
  })

  it('acepta side-effect => con acción', () => {
    const { ok } = run('Button "Login" => API.post(/auth)')
    expect(ok).toBe(true)
  })

  it('acepta componente protegido [locked]', () => {
    const { ok } = run('Navbar [locked]')
    expect(ok).toBe(true)
  })

  it('acepta @modify con preserve:all', () => {
    const { ok } = run('@modify [preserve:all]\nCard "resumen" [position:move-to:1]')
    expect(ok).toBe(true)
  })
})

describe('nexus validate — errores de indentación', () => {
  it('detecta indentación de 3 espacios', () => {
    const { ok, output } = run('Card\n   Button "OK"')
    expect(ok).toBe(false)
    expect(output).toContain('Indentación inválida')
  })

  it('detecta indentación de 1 espacio', () => {
    const { ok, output } = run('Card\n Button "OK"')
    expect(ok).toBe(false)
    expect(output).toContain('Indentación inválida')
  })

  it('acepta indentación de 2 espacios', () => {
    const { ok } = run('Card\n  Button "OK"')
    expect(ok).toBe(true)
  })

  it('acepta indentación de 4 espacios', () => {
    const { ok } = run('Card\n    Button "OK"')
    expect(ok).toBe(true)
  })
})

describe('nexus validate — errores de operadores', () => {
  it('detecta -> sin destino', () => {
    const { ok, output } = run('Button "Go" ->')
    expect(ok).toBe(false)
    expect(output).toContain('"->" sin destino')
  })

  it('detecta => sin acción', () => {
    const { ok, output } = run('Button "Send" =>')
    expect(ok).toBe(false)
    expect(output).toContain('"=>" sin acción')
  })

  it('detecta variable $ sin :', () => {
    const { ok, output } = run('$brand')
    expect(ok).toBe(false)
    expect(output).toContain('Variable inválida')
  })

  it('detecta estado ~ sin :', () => {
    const { ok, output } = run('~isOpen')
    expect(ok).toBe(false)
    expect(output).toContain('Estado inválido')
  })

  it('detecta multiplicador * sin número', () => {
    const { ok, output } = run('Card *')
    expect(ok).toBe(false)
    expect(output).toContain('"*" sin número')
  })

  it('detecta multiplicador * con texto no numérico', () => {
    const { ok, output } = run('Card * N')
    expect(ok).toBe(false)
    expect(output).toContain('Multiplicador inválido')
  })

  it('detecta < sin tipo', () => {
    const { ok, output } = run('Table <')
    expect(ok).toBe(false)
    expect(output).toContain('"<" sin tipo definido')
  })

  it('detecta { sin cerrar } (al final del archivo)', () => {
    const { ok, output } = run('UserMenu < { ./Menu.tsx')
    expect(ok).toBe(false)
    expect(output).toContain('sin cerrar')
  })

  it('detecta [ sin cerrar ] (al final del archivo)', () => {
    const { ok, output } = run('Grid [cols:3')
    expect(ok).toBe(false)
    expect(output).toContain('sin cerrar')
  })

  it('acepta bloques multi-línea con llaves', () => {
    const { ok } = run('Type User {\n  name: string\n  role: string\n}')
    expect(ok).toBe(true)
  })

  it('detecta token # inválido', () => {
    const { ok, output } = run('Card #123')
    expect(ok).toBe(false)
    expect(output).toContain('Token inválido')
  })
})

describe('nexus validate — operadores v3.2 (animate, a11y, Store)', () => {
  it('acepta [animate: fade-in] válido', () => {
    const { ok } = run('Modal [animate: fade-in, duration: 200ms]')
    expect(ok).toBe(true)
  })

  it('detecta [animate:] sin valor', () => {
    const { ok, output } = run('Modal [animate:]')
    expect(ok).toBe(false)
    expect(output).toContain('[animate:]')
  })

  it('acepta [a11y: aria-label="Cerrar"] válido', () => {
    const { ok } = run('Button "×" [a11y: aria-label="Cerrar modal"]')
    expect(ok).toBe(true)
  })

  it('detecta [a11y:] sin atributos', () => {
    const { ok, output } = run('Button "×" [a11y:]')
    expect(ok).toBe(false)
    expect(output).toContain('[a11y:]')
  })

  it('acepta [hover: scale-105] válido', () => {
    const { ok } = run('Card [hover: scale-105]')
    expect(ok).toBe(true)
  })

  it('acepta Store con bloque multi-línea', () => {
    const { ok } = run('Store CartStore {\n  ~items: []\n  Action add => ~items: []\n}')
    expect(ok).toBe(true)
  })

  it('acepta Store con Action y Selector', () => {
    const { ok } = run(
      'Store UserStore {\n' +
      '  ~user: null\n' +
      '  Action login => ~user: $response\n' +
      '  Selector isAuth: ~user !== null\n' +
      '}'
    )
    expect(ok).toBe(true)
  })
})

describe('nexus validate — múltiples errores', () => {
  it('reporta todos los errores, no solo el primero', () => {
    const { ok, output } = run('Card *\n   Button "x" ->')
    expect(ok).toBe(false)
    expect(output).toContain('"*" sin número')
    expect(output).toContain('Indentación inválida')
    expect(output).toContain('"->" sin destino')
  })
})
