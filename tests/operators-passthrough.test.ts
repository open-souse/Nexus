import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/core/validator.js'

// These operators are defined in grammar.ts but have no dedicated validation rules.
// The tests confirm they are accepted without errors (valid pass-through syntax).

describe('operators — pass-through (no validation errors)', () => {
  it('accepts ?? (query) operator', () => {
    const errors = validateNexus(`
Page Dashboard
  ?? "¿Debería usar Zustand aquí?"
  Section Hero
    Text "Bienvenido" !bold
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts | (responsive) operator in attributes', () => {
    const errors = validateNexus(`
@React @Tailwind
Page Dashboard
  Grid [cols:1 | cols:3]
    Card #glass
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts @modify directive', () => {
    const errors = validateNexus(`
@modify [preserve:all]
Page Dashboard
  Section Hero
    Text "Título" !bold
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts [hover:] attribute', () => {
    const errors = validateNexus(`
@React
Page Dashboard
  Button "Guardar" [hover: scale-105]
    => Service.save()
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts [new] attribute', () => {
    const errors = validateNexus(`
@React
Page Dashboard
  Button "Nuevo" [new]
  Card #glass [new]
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts [locked] attribute', () => {
    const errors = validateNexus(`
@React
Page Dashboard
  Navbar [locked]
  Section Hero
    Text "Título" !bold
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts [inherit:siblings] attribute', () => {
    const errors = validateNexus(`
@React
Page Dashboard
  Section Hero
    Button "Primero" #primary
    Button "Segundo" [inherit:siblings]
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts [cascade:children] attribute', () => {
    const errors = validateNexus(`
@React
Page Dashboard
  Section Hero [cascade:children]
    Text "Uno" !bold
    Text "Dos" !bold
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts [position:move-to:N] attribute', () => {
    const errors = validateNexus(`
@React
Page Dashboard
  Section Hero
    Button "Arriba" [position:move-to:1]
    Button "Abajo" [position:move-to:3]
`)
    expect(errors).toHaveLength(0)
  })

  it('accepts combination of advanced operators in a single blueprint', () => {
    const errors = validateNexus(`
@React @Tailwind
@modify [preserve:all]

Page Dashboard
  Grid [cols:1 | cols:4] [cascade:children]
    Card #glass [new] [hover: shadow-lg]
      Text "Título" !bold
      ?? "¿Usar lazy loading aquí?"
  Navbar [locked]
  Button "Acción" [position:move-to:1] [inherit:siblings]
`)
    expect(errors).toHaveLength(0)
  })
})
