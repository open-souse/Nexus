import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus context', () => {
  it('generates the NEXUS notation reference', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('NEXUS NOTATION')
    expect(output).toContain('v3.3')
  })

  it('includes the syntax reference header', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('NEXUS SYNTAX REFERENCE')
    expect(output).toContain('PROJECT DNA')
  })

  it('includes reference examples', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('EXAMPLES')
    expect(output).toContain('Card #glass')
  })

  it('includes safe-edit operator rules', () => {
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
    expect(output).toContain('* N')
    expect(output).toContain('[locked]')
    expect(output).toContain('[new]')
  })

  it('includes v3.3 frontend operators', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('[animate:')
    expect(output).toContain('[hover:')
    expect(output).toContain('[a11y:')
    expect(output).toContain('Store')
  })

  it('includes Create orchestrator and filesystem rule', () => {
    const output = execSync('npx tsx src/index.ts context').toString()
    expect(output).toContain('Create')
    expect(output).toContain('type:component')
    expect(output).toContain('type:feature')
    expect(output).toContain('filesystem')
  })
})
