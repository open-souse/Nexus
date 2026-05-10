import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus examples', () => {
  it('lists all available blueprints', () => {
    const output = execSync('npx tsx src/index.ts examples list').toString()
    expect(output).toContain('dashboard')
    expect(output).toContain('landing')
    expect(output).toContain('auth')
    expect(output).toContain('profile')
    expect(output).toContain('cart')
  })

  it('shows the dashboard blueprint', () => {
    const output = execSync('npx tsx src/index.ts examples show dashboard').toString()
    expect(output).toContain('dashboard')
  })

  it('shows the auth blueprint', () => {
    const output = execSync('npx tsx src/index.ts examples show auth').toString()
    expect(output).toContain('auth')
  })

  it('shows the cart blueprint', () => {
    const output = execSync('npx tsx src/index.ts examples show cart').toString()
    expect(output).toContain('cart')
  })

  it('exits with error for unknown blueprint', () => {
    try {
      execSync('npx tsx src/index.ts examples show unknown-blueprint', { stdio: ['pipe', 'pipe', 'pipe'] })
      expect.fail('Should have thrown')
    } catch (err: unknown) {
      const error = err as { stdout: Buffer }
      expect(error.stdout.toString()).toContain('unknown-blueprint')
    }
  })
})
