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
    const content = buildAIComplement()
    expect(content).not.toContain('Claude Code')
    expect(content).not.toContain('Cursor')
    expect(content).not.toContain('ChatGPT')
  })

  it('contains required behavioral rules (es)', () => {
    const content = buildAIComplement()
    expect(content).toContain('SIEMPRE')
    expect(content).toContain('NUNCA')
    expect(content).toContain('!!')
    expect(content).toContain('!error')
  })

  it('mentions the protocol as source of truth (es)', () => {
    const content = buildAIComplement()
    expect(content).toContain('fuente de verdad')
    expect(content).toContain('nexuslang.dev')
  })

  it('enforces blueprint-first workflow in rules (es)', () => {
    const content = buildAIComplement()
    expect(content).toContain('blueprint NEXUS')
    expect(content).toContain('@install')
    expect(content).toContain('@React')
  })

  it('generates English content when lang is en', () => {
    const content = buildAIComplement('en')
    expect(content).toContain('ALWAYS')
    expect(content).toContain('NEVER')
    expect(content).toContain('nexuslang.dev')
    expect(content).not.toContain('SIEMPRE')
  })

  it('does not mention any specific AI by name in English', () => {
    const content = buildAIComplement('en')
    expect(content).not.toContain('Claude Code')
    expect(content).not.toContain('Cursor')
    expect(content).not.toContain('ChatGPT')
  })
})
