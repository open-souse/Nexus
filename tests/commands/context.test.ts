import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../../src/context/builder.js'

const FRONTEND_CONFIG = {
  lang: 'en' as const,
  modules: ['frontend'],
  framework: 'next-ts',
  styling: 'tailwind',
  output: './src/components',
  tokens: { primary: '#2563eb', secondary: '#64748b', danger: '#ef4444', success: '#22c55e', radius: '8px', font: "'Inter'" },
  icons: { library: 'lucide-react' },
  standards: ['Clean Code']
}

describe('nexus context', () => {
  it('generates NEXUS.md with the NEXUS notation reference', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('NEXUS NOTATION')
    expect(content).toContain('NEXUS NOTATION')
  })

  it('includes the syntax reference header', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('NEXUS SYNTAX REFERENCE')
    expect(content).toContain('PROJECT DNA')
  })

  it('includes reference examples', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('EXAMPLES')
    expect(content).toContain('Card #glass')
  })

  it('includes safe-edit operator rules', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('@modify')
    expect(content).toContain('preserve:all')
    expect(content).toContain('inherit:siblings')
    expect(content).toContain('cascade:children')
    expect(content).toContain('position:move-to:N')
  })

  it('includes all main grammar operators', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('->')
    expect(content).toContain('=>')
    expect(content).toContain('* N')
    expect(content).toContain('[locked]')
    expect(content).toContain('[new]')
  })

  it('includes v3.3 frontend operators', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('[animate:')
    expect(content).toContain('[hover:')
    expect(content).toContain('[a11y:')
    expect(content).toContain('Store')
  })

  it('includes Create orchestrator and filesystem rule', () => {
    const content = buildPrompt(FRONTEND_CONFIG)
    expect(content).toContain('Create')
    expect(content).toContain('type:component')
    expect(content).toContain('type:feature')
    expect(content).toContain('filesystem')
  })

  it('includes Router in backend orchestrator list', () => {
    const content = buildPrompt({ modules: ['backend'] })
    expect(content).toContain('Router')
  })
})
