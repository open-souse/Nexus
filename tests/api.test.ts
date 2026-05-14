import { describe, it, expect } from 'vitest'
import { buildSystemPrompt } from '../src/context/builder.js'
import { createDefaultConfig } from '../src/context/config.js'
import { NEXUS_VERSION } from '../src/core/grammar.js'

describe('createDefaultConfig', () => {
  it('returns a complete config with all required fields', () => {
    const config = createDefaultConfig()
    expect(config.lang).toBe('en')
    expect(config.framework).toBe('next-ts')
    expect(config.styling).toBe('tailwind')
    expect(config.tokens.primary).toBe('#2563eb')
    expect(config.icons.library).toBe('lucide-react')
    expect(config.modules).toContain('frontend')
  })

  it('merges partial overrides', () => {
    const config = createDefaultConfig({ lang: 'es', framework: 'react-ts' })
    expect(config.lang).toBe('es')
    expect(config.framework).toBe('react-ts')
    expect(config.styling).toBe('tailwind')
  })

  it('always includes tokens object', () => {
    const config = createDefaultConfig()
    expect(config.tokens).toHaveProperty('primary')
    expect(config.tokens).toHaveProperty('secondary')
    expect(config.tokens).toHaveProperty('danger')
    expect(config.tokens).toHaveProperty('success')
  })

  it('deep merges partial token overrides without losing other token defaults', () => {
    const config = createDefaultConfig({ tokens: { primary: '#FF0000' } as never })
    expect(config.tokens.primary).toBe('#FF0000')
    expect(config.tokens.secondary).toBe('#64748b')
    expect(config.tokens.success).toBe('#22c55e')
  })
})

describe('buildSystemPrompt', () => {
  const config = createDefaultConfig()

  it('includes NEXUS header for default claude provider', () => {
    const prompt = buildSystemPrompt(config)
    expect(prompt).toContain('NEXUS NOTATION')
    expect(prompt).toContain(`v${NEXUS_VERSION}`)
  })

  it('adapts header for gpt provider', () => {
    const prompt = buildSystemPrompt(config, 'gpt')
    expect(prompt).toContain('precise coding assistant')
    expect(prompt).toContain('NEXUS NOTATION')
  })

  it('adapts header for gemini provider', () => {
    const prompt = buildSystemPrompt(config, 'gemini')
    expect(prompt).toContain('understands NEXUS notation')
    expect(prompt).toContain('NEXUS NOTATION')
  })

  it('includes project DNA in the prompt', () => {
    const cfg = createDefaultConfig({ framework: 'vue-ts' })
    const prompt = buildSystemPrompt(cfg)
    expect(prompt).toContain('vue-ts')
  })

  it('includes Router in orchestrator list for backend module', () => {
    const cfg = createDefaultConfig({ modules: ['backend'] })
    const prompt = buildSystemPrompt(cfg)
    expect(prompt).toContain('Router')
  })

  it('includes testing grammar when testing module is active', () => {
    const cfg = createDefaultConfig({ modules: ['frontend', 'testing'] })
    const prompt = buildSystemPrompt(cfg)
    expect(prompt).toContain('renders:')
    expect(prompt).toContain('handles:')
  })

  it('does not include testing grammar when testing module is inactive', () => {
    const cfg = createDefaultConfig({ modules: ['frontend'] })
    const prompt = buildSystemPrompt(cfg)
    expect(prompt).not.toContain('renders:')
  })

  it('gracefully handles unknown module without throwing', () => {
    const cfg = createDefaultConfig({ modules: ['design'] })
    expect(() => buildSystemPrompt(cfg)).not.toThrow()
  })
})
