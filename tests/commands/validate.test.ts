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

describe('nexus validate — valid cases', () => {
  it('accepts a correct basic file', () => {
    const { ok } = run('@React #Tailwind\nCard #primary\n  Button "OK" -> /home')
    expect(ok).toBe(true)
  })

  it('ignores comments and empty lines', () => {
    const { ok } = run('// comment\n\n@React\nCard #glass')
    expect(ok).toBe(true)
  })

  it('accepts well-formed $ variables', () => {
    const { ok } = run('$brand: "Nexus"\nCard #glass')
    expect(ok).toBe(true)
  })

  it('accepts well-formed ~ local state', () => {
    const { ok } = run('~isOpen: false\nCard #glass')
    expect(ok).toBe(true)
  })

  it('accepts * multiplier with valid number', () => {
    const { ok } = run('Card * 3')
    expect(ok).toBe(true)
  })

  it('accepts data binding < with type', () => {
    const { ok } = run('Table < User')
    expect(ok).toBe(true)
  })

  it('accepts balanced context injection {}', () => {
    const { ok } = run('UserMenu < { ./UserMenu.tsx }')
    expect(ok).toBe(true)
  })

  it('accepts balanced attributes []', () => {
    const { ok } = run('Grid [cols:3]')
    expect(ok).toBe(true)
  })

  it('accepts -> navigation with destination', () => {
    const { ok } = run('Button "Go" -> /dashboard')
    expect(ok).toBe(true)
  })

  it('accepts => side-effect with action', () => {
    const { ok } = run('Button "Login" => API.post(/auth)')
    expect(ok).toBe(true)
  })

  it('accepts protected component [locked]', () => {
    const { ok } = run('Navbar [locked]')
    expect(ok).toBe(true)
  })

  it('accepts @modify with preserve:all', () => {
    const { ok } = run('@modify [preserve:all]\nCard "summary" [position:move-to:1]')
    expect(ok).toBe(true)
  })
})

describe('nexus validate — indentation errors', () => {
  it('detects 3-space indentation', () => {
    const { ok, output } = run('Card\n   Button "OK"')
    expect(ok).toBe(false)
    expect(output).toContain('Invalid indentation')
  })

  it('detects 1-space indentation', () => {
    const { ok, output } = run('Card\n Button "OK"')
    expect(ok).toBe(false)
    expect(output).toContain('Invalid indentation')
  })

  it('accepts 2-space indentation', () => {
    const { ok } = run('Card\n  Button "OK"')
    expect(ok).toBe(true)
  })

  it('accepts 4-space indentation', () => {
    const { ok } = run('Card\n    Button "OK"')
    expect(ok).toBe(true)
  })
})

describe('nexus validate — operator errors', () => {
  it('detects -> without destination', () => {
    const { ok, output } = run('Button "Go" ->')
    expect(ok).toBe(false)
    expect(output).toContain('"->" without')
  })

  it('detects => without action', () => {
    const { ok, output } = run('Button "Send" =>')
    expect(ok).toBe(false)
    expect(output).toContain('"=>" without')
  })

  it('detects $ variable without :', () => {
    const { ok, output } = run('$brand')
    expect(ok).toBe(false)
    expect(output).toContain('Invalid variable')
  })

  it('detects ~ state without :', () => {
    const { ok, output } = run('~isOpen')
    expect(ok).toBe(false)
    expect(output).toContain('Invalid state')
  })

  it('detects * multiplier without number', () => {
    const { ok, output } = run('Card *')
    expect(ok).toBe(false)
    expect(output).toContain('"*" without')
  })

  it('detects * multiplier with non-numeric value', () => {
    const { ok, output } = run('Card * N')
    expect(ok).toBe(false)
    expect(output).toContain('Invalid multiplier')
  })

  it('detects < without type', () => {
    const { ok, output } = run('Table <')
    expect(ok).toBe(false)
    expect(output).toContain('"<" without')
  })

  it('detects unclosed { at end of file', () => {
    const { ok, output } = run('UserMenu < { ./Menu.tsx')
    expect(ok).toBe(false)
    expect(output).toContain('unclosed')
  })

  it('detects unclosed [ at end of file', () => {
    const { ok, output } = run('Grid [cols:3')
    expect(ok).toBe(false)
    expect(output).toContain('unclosed')
  })

  it('accepts multi-line blocks with braces', () => {
    const { ok } = run('Type User {\n  name: string\n  role: string\n}')
    expect(ok).toBe(true)
  })

  it('detects invalid # token', () => {
    const { ok, output } = run('Card #123')
    expect(ok).toBe(false)
    expect(output).toContain('Invalid token')
  })
})

describe('nexus validate — v3.2 operators (animate, a11y, Store)', () => {
  it('accepts valid [animate: fade-in]', () => {
    const { ok } = run('Modal [animate: fade-in, duration: 200ms]')
    expect(ok).toBe(true)
  })

  it('detects [animate:] without value', () => {
    const { ok, output } = run('Modal [animate:]')
    expect(ok).toBe(false)
    expect(output).toContain('[animate:]')
  })

  it('accepts valid [a11y: aria-label]', () => {
    const { ok } = run('Button "×" [a11y: aria-label="Close modal"]')
    expect(ok).toBe(true)
  })

  it('detects [a11y:] without attributes', () => {
    const { ok, output } = run('Button "×" [a11y:]')
    expect(ok).toBe(false)
    expect(output).toContain('[a11y:]')
  })

  it('accepts valid [hover: scale-105]', () => {
    const { ok } = run('Card [hover: scale-105]')
    expect(ok).toBe(true)
  })

  it('accepts Store with multi-line block', () => {
    const { ok } = run('Store CartStore {\n  ~items: []\n  Action add => ~items: []\n}')
    expect(ok).toBe(true)
  })

  it('accepts Store with Action and Selector', () => {
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

describe('nexus validate — multiple errors', () => {
  it('reports all errors, not just the first', () => {
    const { ok, output } = run('Card *\n   Button "x" ->')
    expect(ok).toBe(false)
    expect(output).toContain('"*" without')
    expect(output).toContain('Invalid indentation')
    expect(output).toContain('"->" without')
  })
})
