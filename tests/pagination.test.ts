import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/core/validator.js'

describe('validateNexus — [paginate] operator', () => {
  describe('valid cases', () => {
    it('accepts Table < Pedido [paginate:20]', () => {
      expect(validateNexus('Table < Pedido [paginate:20]')).toHaveLength(0)
    })

    it('accepts List < Producto [paginate:12, layout:grid]', () => {
      expect(validateNexus('List < Producto [paginate:12, layout:grid]')).toHaveLength(0)
    })

    it('accepts Table < Usuario [paginate:10, page:~currentPage]', () => {
      expect(validateNexus('Table < Usuario [paginate:10, page:~currentPage]')).toHaveLength(0)
    })

    it('accepts [paginate:1] (minimum)', () => {
      expect(validateNexus('Table < Item [paginate:1]')).toHaveLength(0)
    })

    it('accepts [paginate:500] (maximum)', () => {
      expect(validateNexus('Table < Item [paginate:500]')).toHaveLength(0)
    })

    it('accepts layout:list', () => {
      expect(validateNexus('List < Post [paginate:5, layout:list]')).toHaveLength(0)
    })
  })

  describe('invalid cases', () => {
    it('rejects [paginate:20] without data binding <', () => {
      const errors = validateNexus('Table [paginate:20]')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain("[paginate] requires a data binding operator '<'")
    })

    it('rejects [paginate:0] (below range)', () => {
      const errors = validateNexus('Table < Pedido [paginate:0]')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('between 1 and 500')
    })

    it('rejects [paginate:600] (above range)', () => {
      const errors = validateNexus('Table < Pedido [paginate:600]')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('between 1 and 500')
    })

    it('rejects [paginate:abc] (non-numeric)', () => {
      const errors = validateNexus('Table < Pedido [paginate:abc]')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('positive integer')
    })

    it('rejects [paginate:20] combined with * N multiplier', () => {
      const errors = validateNexus('Table < Pedido [paginate:20] * 5')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain("Cannot use [paginate] with multiplier")
    })
  })
})
