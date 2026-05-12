import { describe, it, expect } from 'vitest'
import { validateNexus } from '../../src/core/validator/index.js'

describe('nexus semantic validation', () => {
  it('detects !pk outside of Model', () => {
    const errors = validateNexus('Page Home\n  Text "ID" !pk')
    expect(errors.some(e => e.message.includes('"!pk" (Primary Key) must be defined inside a "Model"'))).toBe(true)
  })

  it('accepts !pk inside of Model', () => {
    const errors = validateNexus('Model User\n  Entity id !pk')
    expect(errors.some(e => e.message.includes('!pk'))).toBe(false)
  })

  it('detects Endpoint outside of Controller', () => {
    const errors = validateNexus('Model User\n  Endpoint GET /')
    expect(errors.some(e => e.message.includes('Orchestrator "Endpoint" cannot be nested inside "Model"'))).toBe(true)
  })

  it('detects Action outside of Store', () => {
    const errors = validateNexus('Page Home\n  Action login')
    expect(errors.some(e => e.message.includes('"Action" is not allowed inside "Page"'))).toBe(true)
  })

  it('detects keywords outside of any orchestrator', () => {
    const errors = validateNexus('Action login')
    expect(errors.some(e => e.message.includes('Keyword "Action" must be defined inside an orchestrator block'))).toBe(true)
  })

  it('detects invalid orchestrator nesting', () => {
    const errors = validateNexus('Model User\n  Page SubPage')
    expect(errors.some(e => e.message.includes('Orchestrator "Page" cannot be nested inside "Model"'))).toBe(true)
  })

  it('accepts valid nested orchestrators (Section inside Page)', () => {
    const errors = validateNexus('Page Home\n  Section Hero')
    expect(errors.length).toBe(0)
  })

  it('accepts valid SDD structure', () => {
    const content = `
System "Nexus"
  architecture: Hexagonal
  Actor "Admin"
    can: manage-users
  Requirement "Security"
    must: be-encrypted
    `.trim()
    const errors = validateNexus(content)
    expect(errors.length).toBe(0)
  })

  it('detects invalid nesting in SDD', () => {
    const errors = validateNexus('Actor "User"\n  architecture: Monolith')
    expect(errors.some(e => e.message.includes('"architecture" is not allowed inside "Actor"'))).toBe(true)
  })

  it('accepts Index inside Model', () => {
    const content = 'Model User\n  Index email [unique]'
    const errors = validateNexus(content)
    expect(errors.length).toBe(0)
  })

  it('detects policy outside authorized orchestrators', () => {
    const errors = validateNexus('Page Home\n  policy: public')
    expect(errors.some(e => e.message.includes('"policy" is not allowed inside "Page"'))).toBe(true)
  })

  it('accepts Router inside Controller', () => {
    const content = 'Controller User\n  Router Auth\n    Endpoint POST /login'
    const errors = validateNexus(content)
    expect(errors.length).toBe(0)
  })

  it('detects SDD keywords outside orchestrators', () => {
    const errors = validateNexus('can: do-something')
    expect(errors.some(e => e.message.includes('Keyword "can" must be defined inside an orchestrator block'))).toBe(true)
  })

  it('manages nested indentation correctly', () => {
    const content = `
Model User
  Entity id !pk
Page Home
  Text "Test" !pk
    `.trim()
    const errors = validateNexus(content)
    // Error should be on line 4 (Text "Test" !pk)
    const pkError = errors.find(e => e.line === 4 && e.message.includes('!pk'))
    expect(pkError).toBeDefined()
  })
})
