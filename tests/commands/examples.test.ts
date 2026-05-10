import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

function run(args: string) {
  try {
    const out = execSync(`npx tsx src/index.ts examples ${args}`, {
      stdio: ['pipe', 'pipe', 'pipe']
    })
    return { output: out.toString(), ok: true }
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer; stderr?: Buffer }
    return { output: (err.stdout?.toString() || '') + (err.stderr?.toString() || ''), ok: false }
  }
}

describe('nexus examples', () => {
  it('lists all 5 blueprints by default', () => {
    const { output, ok } = run('')
    expect(ok).toBe(true)
    expect(output).toContain('dashboard')
    expect(output).toContain('landing')
    expect(output).toContain('auth')
    expect(output).toContain('profile')
    expect(output).toContain('cart')
  })

  it('nexus examples list shows all blueprints', () => {
    const { output, ok } = run('list')
    expect(ok).toBe(true)
    expect(output).toContain('dashboard')
    expect(output).toContain('landing')
    expect(output).toContain('auth')
    expect(output).toContain('profile')
    expect(output).toContain('cart')
  })

  it('nexus examples show dashboard displays blueprint content', () => {
    const { output, ok } = run('show dashboard')
    expect(ok).toBe(true)
    expect(output.length).toBeGreaterThan(50)
  })

  it('nexus examples show cart displays blueprint content', () => {
    const { output, ok } = run('show cart')
    expect(ok).toBe(true)
    expect(output.length).toBeGreaterThan(50)
  })

  it('nexus examples show unknown exits with error', () => {
    const { output, ok } = run('show unknown-blueprint')
    expect(ok).toBe(false)
    expect(output).toContain('not found')
  })
})
