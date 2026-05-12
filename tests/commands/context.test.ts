import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../../src/commands/context.js'
import type { NexusConfig } from '../../src/types/nexus.js'

const mockConfig: Partial<NexusConfig> = {
  lang: 'en',
  modules: ['frontend'],
  framework: 'next-ts',
  styling: 'tailwind',
  output: './src/components',
  tokens: { 
    primary: '#2563eb', 
    secondary: '#64748b', 
    danger: '#ef4444', 
    success: '#22c55e', 
    radius: '8px', 
    font: "'Inter'" 
  },
  icons: { library: 'lucide-react' },
  standards: ['Clean Code']
}

describe('nexus context', () => {
  it('generates NEXUS.md with the NEXUS notation reference', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('NEXUS NOTATION')
    expect(content).toContain('v4.5')
  })

  it('includes the syntax reference header', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('NEXUS SYNTAX REFERENCE')
    expect(content).toContain('PROJECT DNA')
  })

  it('includes reference examples', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('EXAMPLES')
    expect(content).toContain('Card #glass')
  })

  it('includes safe-edit operator rules', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('@modify')
    expect(content).toContain('preserve:all')
    expect(content).toContain('inherit:siblings')
    expect(content).toContain('cascade:children')
    expect(content).toContain('position:move-to:N')
  })

  it('includes all main grammar operators', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('->')
    expect(content).toContain('=>')
    expect(content).toContain('* N')
    expect(content).toContain('[locked]')
    expect(content).toContain('[new]')
  })

  it('includes v3.3 frontend operators', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('[animate:')
    expect(content).toContain('[hover:')
    expect(content).toContain('[a11y:')
    expect(content).toContain('Store')
  })

  it('includes Create orchestrator and filesystem rule', () => {
    const content = buildPrompt(mockConfig)
    expect(content).toContain('Create')
    expect(content).toContain('type:component')
    expect(content).toContain('type:feature')
    expect(content).toContain('filesystem')
  })

  it('includes backend operators when backend module is active', () => {
    const backendConfig = { ...mockConfig, modules: ['frontend', 'backend'] }
    const content = buildPrompt(backendConfig)
    expect(content).toContain('Model')
    expect(content).toContain('Controller')
    expect(content).toContain('Endpoint')
    expect(content).toContain('!pk')
    expect(content).toContain('@Auth')
  })
})
