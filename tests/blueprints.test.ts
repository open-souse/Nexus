import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { validateNexus } from '../src/core/validator.js'

const BLUEPRINTS_DIR = resolve('./blueprints')

const blueprints = [
  'auth-login.nexus',
  'dashboard.nexus',
  'landing-page.nexus',
  'profile.nexus',
  'store-cart.nexus',
]

describe('blueprints — all official files must pass validation', () => {
  for (const file of blueprints) {
    it(`${file} is valid`, () => {
      const content = readFileSync(resolve(BLUEPRINTS_DIR, file), 'utf8')
      const errors = validateNexus(content)
      if (errors.length > 0) {
        const summary = errors.map(e => `  Line ${e.line}: ${e.message}`).join('\n')
        throw new Error(`${file} has ${errors.length} validation error(s):\n${summary}`)
      }
      expect(errors).toHaveLength(0)
    })
  }
})
