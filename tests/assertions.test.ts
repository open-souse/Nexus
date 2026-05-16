import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/lib.js'

describe('Assertion operator (!!)', () => {
  it('!! with string description is valid', () => {
    expect(validateNexus('Endpoint POST /checkout\n  !! "El carrito no puede estar vacío"')).toHaveLength(0)
  })
  it('!! with logical expression is valid', () => {
    expect(validateNexus('Endpoint POST /checkout\n  !! stock.disponible > 0')).toHaveLength(0)
  })
  it('!! with simple expression is valid', () => {
    expect(validateNexus('Service AuthService\n  !! user.authenticated')).toHaveLength(0)
  })
  it('multiple !! under same orchestrator is valid', () => {
    expect(validateNexus('Endpoint POST /checkout\n  !! "Carrito no vacío"\n  !! stock.disponible > 0\n  !! user.authenticated\n  => OrderService.crear()')).toHaveLength(0)
  })
  it('!! without content emits error', () => {
    const result = validateNexus('Endpoint POST /checkout\n  !!')
    expect(result).toHaveLength(1)
    expect(result[0].message).toContain('requires content')
  })
  it('!! with only spaces emits error', () => {
    const result = validateNexus('Endpoint POST /checkout\n  !!   ')
    expect(result).toHaveLength(1)
    expect(result[0].message).toContain('requires content')
  })
  it('!! combined with => and !error is valid', () => {
    expect(validateNexus('Endpoint POST /checkout\n  !! "Carrito no vacío"\n  !! stock.disponible > 0\n  => OrderService.crear()\n  !error:400 -> /error/validacion')).toHaveLength(0)
  })
  it('!! with correct indentation is valid', () => {
    expect(validateNexus('Controller PagoController\n  Endpoint POST /pagar\n    !! "Usuario autenticado"\n    => PagoService.procesar()')).toHaveLength(0)
  })
})
