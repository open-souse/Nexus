import { describe, it, expect } from 'vitest'
import { buildAIComplement, generateNexusMd } from '../../src/cli/init.js'

describe('nexus init — NEXUS.md generation', () => {
  it('generates valid NEXUS notation reference', () => {
    const content = generateNexusMd()
    expect(content).toContain('NEXUS NOTATION')
    expect(content).toContain('NEXUS SYNTAX REFERENCE')
  })

  it('includes all three modules in generated content', () => {
    const content = generateNexusMd()
    expect(content).toContain('EXAMPLES')
    expect(content).toContain('Test')
    expect(content).toContain('Model')
    expect(content).toContain('Card #glass')
  })

  it('includes grammar operators in generated content', () => {
    const content = generateNexusMd()
    expect(content).toContain('=>')
    expect(content).toContain('->')
    expect(content).toContain('!!')
    expect(content).toContain('!error:')
    expect(content).toContain('[paginate:')
  })
})

describe('nexus init — AI complement generation', () => {
  it('does not mention any specific AI by name', () => {
    const content = buildAIComplement('Gemini')
    expect(content).not.toContain('Claude Code')
    expect(content).not.toContain('Cursor')
    expect(content).not.toContain('ChatGPT')
  })

  it('contains required behavioral rules', () => {
    const content = buildAIComplement('TestAI')
    expect(content).toContain('SIEMPRE')
    expect(content).toContain('NUNCA')
    expect(content).toContain('!!')
    expect(content).toContain('!error')
  })

  it('mentions the protocol as source of truth', () => {
    const content = buildAIComplement('TestAI')
    expect(content).toContain('fuente de verdad')
    expect(content).toContain('nexuslang.dev')
  })

  it('enforces blueprint-first workflow in rules', () => {
    const content = buildAIComplement('TestAI')
    expect(content).toContain('blueprint NEXUS')
    expect(content).toContain('@install')
    expect(content).toContain('@React')
  })
})
