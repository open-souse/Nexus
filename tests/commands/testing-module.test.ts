import { describe, it, expect } from 'vitest'
import { buildPrompt } from '../../src/context/builder.js'

describe('nexus context — testing module', () => {
  it('includes Test and Suite orchestrators when testing module is active', () => {
    const output = buildPrompt({ modules: ['frontend', 'testing'] })
    expect(output).toContain('Test')
    expect(output).toContain('Suite')
  })

  it('includes test grammar operators when testing module is active', () => {
    const output = buildPrompt({ modules: ['frontend', 'testing'] })
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
    const output = buildPrompt({ modules: ['frontend', 'testing'] })
    expect(output).toContain('vitest')
    expect(output).toContain('jest')
    expect(output).toContain('cypress')
  })

  it('includes testing reference example in prompt', () => {
    const output = buildPrompt({ modules: ['frontend', 'testing'] })
    expect(output).toContain('Test UserTable')
    expect(output).toContain('Suite "Auth Flow"')
  })

  it('does NOT include test grammar when testing module is not active', () => {
    const output = buildPrompt({ modules: ['frontend'] })
    expect(output).not.toContain('renders:')
    expect(output).not.toContain('handles:')
    expect(output).not.toContain('snapshot:')
  })

  it('works standalone without frontend module', () => {
    const output = buildPrompt({ modules: ['testing'] })
    expect(output).toContain('Test')
    expect(output).toContain('renders:')
    expect(output).toContain('NEXUS NOTATION')
  })
})
