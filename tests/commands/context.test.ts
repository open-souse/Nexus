import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('generates the NEXUS v3.3 language inductor', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('[NEXUS LANGUAGE INDUCTION]')
    expect(output).toContain('Native Interpreter of NEXUS v3.3')
    expect(output).toContain('MASTER GRAMMAR (v3.3)')
    expect(output).toContain('PROJECT DNA')
    expect(output).toContain('NEXUS_SYSTEM_ONLINE')
  })

  it('includes reference examples in the prompt', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('REFERENCE EXAMPLES')
    expect(output).toContain('Card #glass')
  })

  it('includes safe-edit operators', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('@modify')
    expect(output).toContain('preserve:all')
    expect(output).toContain('inherit:siblings')
    expect(output).toContain('cascade:children')
    expect(output).toContain('position:move-to:N')
  })

  it('includes all main grammar operators', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('->')
    expect(output).toContain('=>')
    expect(output).toContain('< ')
    expect(output).toContain('* N')
    expect(output).toContain('[locked]')
    expect(output).toContain('[new]')
  })

  it('includes v3.2 frontend operators', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('[animate:')
    expect(output).toContain('[hover:')
    expect(output).toContain('[a11y:')
    expect(output).toContain('Store')
  })

  it('includes Create orchestrator and filesystem execution rule', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('Create')
    expect(output).toContain('FILESYSTEM EXECUTION RULE')
    expect(output).toContain('type:component')
    expect(output).toContain('type:feature')
  })

  it('includes project DNA and ready signal', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('PROJECT DNA')
    expect(output).toContain('NEXUS_SYSTEM_ONLINE')
  })
})
