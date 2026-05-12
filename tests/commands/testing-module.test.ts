import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../../src/commands/context.js'
import type { NexusConfig } from '../../src/types/nexus.js'

const baseConfig: Partial<NexusConfig> = {
  lang: 'en',
  framework: 'next-ts',
  styling: 'tailwind',
  output: './src/components',
  tokens: { primary: '#6EE7B7', secondary: '#64748b', danger: '#ef4444', success: '#22c55e', radius: '8px', font: "'Inter'" },
  icons: { library: 'lucide-react' },
  standards: ['Clean Code']
}

describe('nexus context — testing module', () => {
  it('includes Test and Suite orchestrators when testing module is active', () => {
    const output = buildPrompt({ ...baseConfig, modules: ['frontend', 'testing'] })
    expect(output).toContain('Test')
    expect(output).toContain('Suite')
  })

  it('includes test grammar operators when testing module is active', () => {
    const output = buildPrompt({ ...baseConfig, modules: ['frontend', 'testing'] })
    expect(output).toContain('renders:')
    expect(output).toContain('handles:')
    expect(output).toContain('expects:')
    expect(output).toContain('status:')
    expect(output).toContain('body:')
    expect(output).toContain('db:')
    expect(output).toContain('asserts:')
    expect(output).toContain('mocks:')
  })

  it('includes supported frameworks in grammar', () => {
    const output = buildPrompt({ ...baseConfig, modules: ['frontend', 'testing'] })
    expect(output).toContain('vitest')
    expect(output).toContain('jest')
    expect(output).toContain('cypress')
  })

  it('includes testing reference example in prompt', () => {
    const output = buildPrompt({ ...baseConfig, modules: ['frontend', 'testing'] })
    expect(output).toContain('Test UserTable')
    expect(output).toContain('Suite "Auth Flow"')
  })

  it('does NOT include test grammar when testing module is not active', () => {
    const output = buildPrompt({ ...baseConfig, modules: ['frontend'] })
    expect(output).not.toContain('renders:')
    expect(output).not.toContain('handles:')
  })

  it('works standalone without frontend module', () => {
    const output = buildPrompt({ ...baseConfig, modules: ['testing'] })
    expect(output).toContain('Test')
    expect(output).toContain('renders:')
    expect(output).toContain('NEXUS NOTATION')
  })
})
