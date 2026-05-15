import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/core/validator.js'

describe('validateNexus — model relations (-> Model.Name)', () => {
  describe('valid cases', () => {
    it('accepts Entity usuario -> Model.Usuario', () => {
      expect(validateNexus('Model Pedido\n  Entity usuario -> Model.Usuario')).toHaveLength(0)
    })

    it('accepts [many] modifier', () => {
      expect(validateNexus('Model Pedido\n  Entity items -> Model.Producto [many]')).toHaveLength(0)
    })

    it('accepts [optional] modifier', () => {
      expect(validateNexus('Model Pedido\n  Entity categoria -> Model.Categoria [optional]')).toHaveLength(0)
    })

    it('accepts [cascade] modifier', () => {
      expect(validateNexus('Model Pedido\n  Entity items -> Model.Producto [cascade]')).toHaveLength(0)
    })

    it('accepts combined [many, optional] modifiers', () => {
      expect(validateNexus('Model Pedido\n  Entity items -> Model.Producto [many, optional]')).toHaveLength(0)
    })

    it('accepts no modifier (one-to-one required)', () => {
      expect(validateNexus('Model Order\n  Entity user -> Model.User')).toHaveLength(0)
    })
  })

  describe('invalid cases', () => {
    it('rejects lowercase model name', () => {
      const errors = validateNexus('Entity usuario -> Model.usuario')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('uppercase')
    })

    it('rejects -> Model. outside of Entity', () => {
      const errors = validateNexus('Page Dashboard\n  -> Model.Usuario')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('Model relations must be defined inside an Entity')
    })

    it('rejects invalid modifier', () => {
      const errors = validateNexus('Model Pedido\n  Entity items -> Model.Producto [invalid]')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('Invalid relation modifier')
    })

    it('rejects unknown modifier in combined list', () => {
      const errors = validateNexus('Model Pedido\n  Entity items -> Model.Producto [many, destroy]')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].message).toContain('Invalid relation modifier')
    })
  })
})
