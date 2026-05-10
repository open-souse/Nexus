import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus learn', () => {
  it('generates the NEXUS learning session prompt', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('NEXUS LEARNING SESSION')
    expect(output).toContain('v3.3')
  })

  it('includes all 5 curriculum levels', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Level 1')
    expect(output).toContain('Level 2')
    expect(output).toContain('Level 3')
    expect(output).toContain('Level 4')
    expect(output).toContain('Level 5')
  })

  it('teaches level 1 basics', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Text')
    expect(output).toContain('Button')
    expect(output).toContain('#style')
  })

  it('teaches level 2 interactivity', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Form')
    expect(output).toContain('~state')
    expect(output).toContain('=>')
  })

  it('teaches level 3 structure and navigation', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Page')
    expect(output).toContain('Section')
    expect(output).toContain('->')
  })

  it('teaches level 4 advanced patterns', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Store')
    expect(output).toContain('[animate:')
    expect(output).toContain('[a11y:')
  })

  it('teaches level 5 filesystem mastery', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Create')
    expect(output).toContain('Test')
    expect(output).toContain('Suite')
  })

  it('includes exit keywords', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('exit nexus')
    expect(output).toContain('//quit')
  })

  it('includes teaching instructions', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('Level X/5')
  })

  it('includes project DNA', () => {
    const output = execSync('npx tsx src/index.ts learn').toString()
    expect(output).toContain('PROJECT DNA')
  })
})
