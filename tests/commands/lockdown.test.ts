import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus lockdown', () => {
  it('generates the NEXUS Precision Mode prompt', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('NEXUS PRECISION MODE')
    expect(output).toContain('v3.3')
  })

  it('instructs code-only responses for NEXUS input', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('generate code directly')
  })

  it('includes ?? query operator instructions', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('??')
    expect(output).toContain('answer briefly')
  })

  it('includes the session watermark rule', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('NX:3.3')
  })

  it('includes context loss fallback', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain("lost context")
  })

  it('includes all session commands', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('//nexus unlock')
    expect(output).toContain('//nexus status')
    expect(output).toContain('//nexus reset')
  })

  it('includes @modify preserve rule', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('@modify')
    expect(output).toContain('preserve:all')
  })

  it('includes project DNA section', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('PROJECT DNA')
  })
})
