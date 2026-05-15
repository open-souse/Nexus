import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/core/validator.js'

describe('validateNexus — !error handler', () => {
  describe('valid cases', () => {
    it('accepts !error:400 under =>', () => {
      expect(validateNexus("Button 'Save' => api.save()\n  !error:400 -> /error")).toHaveLength(0)
    })

    it('accepts !error:timeout under =>', () => {
      expect(validateNexus("Button 'Save' => api.save()\n  !error:timeout -> /retry")).toHaveLength(0)
    })

    it('accepts !error:network under =>', () => {
      expect(validateNexus("Button 'Save' => api.save()\n  !error:network -> /offline")).toHaveLength(0)
    })

    it('accepts !error:* wildcard under =>', () => {
      expect(validateNexus("Button 'Save' => api.save()\n  !error:* -> /error/general")).toHaveLength(0)
    })

    it('accepts multiple !error under the same =>', () => {
      const src = "Button 'Save' => api.save()\n  !error:400 -> /bad\n  !error:500 -> /fail"
      expect(validateNexus(src)).toHaveLength(0)
    })

    it('accepts all HTTP 4xx and 5xx codes', () => {
      for (const code of [400, 401, 403, 404, 422, 500, 502, 503]) {
        const src = `Button => api.do()\n  !error:${code} -> /err`
        expect(validateNexus(src), `code ${code}`).toHaveLength(0)
      }
    })
  })

  describe('invalid cases', () => {
    it('rejects !error without a parent => action', () => {
      const errors = validateNexus('!error:400 -> /error')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain("!error must be nested under a '=>' action")
    })

    it('rejects !error:999 (out-of-range HTTP code)', () => {
      const errors = validateNexus("Button 'Save' => api.save()\n  !error:999 -> /error")
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('Invalid error code')
    })

    it('rejects !error:200 (non-error HTTP code)', () => {
      const errors = validateNexus("Button => api()\n  !error:200 -> /ok")
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('Invalid error code')
    })

    it('rejects !error:400 without -> destination', () => {
      const errors = validateNexus("Button 'Save' => api.save()\n  !error:400")
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('destination')
    })
  })
})
