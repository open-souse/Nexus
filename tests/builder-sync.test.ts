import { describe, it, expect } from 'vitest'
import { NEXUS_OPERATORS } from '../src/core/grammar.js'
import { buildPrompt } from '../src/context/builder.js'

describe('builder-sync — operators documented in buildPrompt', () => {
  const prompt = buildPrompt({ modules: ['frontend', 'backend', 'testing'] })

  for (const op of NEXUS_OPERATORS) {
    it(`"${op.symbol}" (${op.name}) appears in grammar reference`, () => {
      expect(prompt, `Operator "${op.symbol}" missing from buildPrompt — add it to buildGrammarReference in builder.ts`).toContain(op.symbol)
    })
  }
})
