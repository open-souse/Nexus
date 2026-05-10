import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus lockdown', () => {
  it('generates the NEXUS Lockdown prompt', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('[NEXUS LOCKDOWN MODE')
    expect(output).toContain('NEXUS v3.3 execution engine')
  })

  it('includes the human input error response', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('[NEXUS_ERROR: HUMAN_INPUT_DETECTED]')
  })

  it('includes the session watermark rule', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('NX_3.3_SECURE')
  })

  it('includes the desync protocol', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('[STATUS: NEXUS_DESYNC_DETECTED]')
  })

  it('includes all exit keywords', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('//nexus unlock')
    expect(output).toContain('//nexus status')
    expect(output).toContain('//nexus reset')
  })

  it('includes the NEXUS_LOCKED status response', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('[STATUS: NEXUS_LOCKED | v3.3 | ACTIVE]')
  })

  it('includes the filesystem execution rule', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('FILESYSTEM EXECUTION RULE')
  })

  it('includes project DNA section', () => {
    const output = execSync('npx tsx src/index.ts lockdown').toString()
    expect(output).toContain('PROJECT DNA')
  })
})
