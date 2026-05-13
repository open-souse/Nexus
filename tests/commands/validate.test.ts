import { describe, it, expect } from 'vitest'
import { validateNexus } from '../../src/core/validator.js'

// Thin wrapper that mirrors the original { output, ok } interface so all
// existing test assertions work without modification, but calls validateNexus
// directly instead of spawning an npx child process.
function run(content: string): { output: string; ok: boolean } {
  const errors = validateNexus(content)
  const output = errors.map(e => `  Line ${e.line}: ${e.message}`).join('\n')
  return { output, ok: errors.length === 0 }
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

// ─── Direct-import tests (no execSync) ────────────────────────────────────────

describe('validateNexus — conditional expressions (direct import)', () => {
  it('accepts single-line conditional: ( ?auth ) -> Home : Login', () => {
    const errors = validateNexus('( ?auth ) -> Home : Login')
    expect(errors).toHaveLength(0)
  })

  it('accepts multi-line conditional with : separator', () => {
    const src = [
      '( ~editing ) ->',
      '  Form "profile-edit"',
      ':',
      '  Stack #gap-1',
    ].join('\n')
    const errors = validateNexus(src)
    expect(errors).toHaveLength(0)
  })

  it('accepts nested multi-line conditionals', () => {
    const src = [
      '( ?loading ) ->',
      '  Skeleton',
      ':',
      '  ( ~empty ) ->',
      '    EmptyState',
      '  :',
      '    Table < Data',
    ].join('\n')
    const errors = validateNexus(src)
    expect(errors).toHaveLength(0)
  })

  it('reports error for multi-line conditional without closing :', () => {
    const src = [
      '( ~editing ) ->',
      '  Form "profile-edit"',
    ].join('\n')
    const errors = validateNexus(src)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('"( cond ) ->"')
    expect(errors[0].line).toBe(1)
  })

  it('still reports error for plain -> without destination', () => {
    const errors = validateNexus('Button "Go" ->')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('"->" without')
  })
})

describe('validateNexus — $ variable value required (direct import)', () => {
  it('accepts $brand: "Nexus"', () => {
    expect(validateNexus('$brand: "Nexus"')).toHaveLength(0)
  })

  it('accepts $count: 42', () => {
    expect(validateNexus('$count: 42')).toHaveLength(0)
  })

  it('rejects $brand: (colon with no value)', () => {
    const errors = validateNexus('$brand:')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid variable')
  })

  it('rejects $brand: (colon followed only by spaces)', () => {
    const errors = validateNexus('$brand:   ')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid variable')
  })

  it('rejects $brand (no colon at all)', () => {
    const errors = validateNexus('$brand')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid variable')
  })
})

describe('validateNexus — # token scanner ignores string content (direct import)', () => {
  it('does not flag #number inside double-quoted string', () => {
    expect(validateNexus('Text "Error #404 not found"')).toHaveLength(0)
  })

  it('does not flag #word inside single-quoted string', () => {
    expect(validateNexus("Text 'Message #1'")).toHaveLength(0)
  })

  it('still flags invalid # token outside strings', () => {
    const errors = validateNexus('Card #123')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid token')
  })

  it('accepts valid # token alongside string content', () => {
    expect(validateNexus('Button #primary "Click #1"')).toHaveLength(0)
  })
})

describe('validateNexus — input sanitization (direct import)', () => {
  it('rejects content exceeding 500 KB', () => {
    const huge = 'Card #glass\n'.repeat(50000) // ~600 KB
    const errors = validateNexus(huge)
    expect(errors).toHaveLength(1)
    expect(errors[0].line).toBe(0)
    expect(errors[0].message).toContain('500 KB')
  })

  it('rejects content with null bytes', () => {
    const errors = validateNexus('Card #glass\0Button')
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toContain('null bytes')
  })

  it('rejects content exceeding 2000 lines', () => {
    const big = 'Card #glass\n'.repeat(2001)
    const errors = validateNexus(big)
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toContain('2000 lines')
  })

  it('normalizes CRLF without error', () => {
    const errors = validateNexus('@React\r\nCard #glass\r\n')
    expect(errors).toHaveLength(0)
  })
})

describe('validateNexus — @Auth validation (direct import)', () => {
  it('accepts standalone @Auth', () => {
    expect(validateNexus('Endpoint GET /profile @Auth')).toHaveLength(0)
  })

  it('accepts @Auth[mode:jwt]', () => {
    expect(validateNexus('@Auth[mode:jwt]')).toHaveLength(0)
  })

  it('accepts @Auth[role:admin, mode:jwt]', () => {
    expect(validateNexus('Endpoint POST /admin @Auth[role:admin, mode:jwt]')).toHaveLength(0)
  })

  it('rejects @Auth followed by parentheses: @Auth()', () => {
    const errors = validateNexus('@Auth(jwt)')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid @Auth')
  })

  it('rejects @Auth followed by alphanumeric: @Auth123', () => {
    const errors = validateNexus('@Auth123')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid @Auth')
  })

  it('rejects @Auth followed by colon: @Auth:role', () => {
    const errors = validateNexus('Endpoint GET /me @Auth:role')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('Invalid @Auth')
  })
})
