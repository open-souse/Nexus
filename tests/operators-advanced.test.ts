import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/lib.js'

describe('Operadores avanzados — cobertura completa', () => {

  // @modify
  it('@modify es válido como directiva', () => {
    const result = validateNexus('@modify\nButton "Enviar" #primary')
    expect(result).toHaveLength(0)
  })

  // ?? Query
  it('?? query es válido', () => {
    const result = validateNexus('Page Dashboard\n  ?? "¿Cuántos items mostrar?"')
    expect(result).toHaveLength(0)
  })

  it('?? sin contenido es válido (es una pregunta abierta)', () => {
    const result = validateNexus('Page Dashboard\n  ??')
    expect(result).toHaveLength(0)
  })

  // | Variante responsiva
  it('| variante responsiva es válida', () => {
    const result = validateNexus('Section Hero | Section HeroMobile')
    expect(result).toHaveLength(0)
  })

  // [hover:]
  it('[hover:] es válido en botones', () => {
    const result = validateNexus('Page Home\n  Button "CTA" #primary [hover:scale-105]')
    expect(result).toHaveLength(0)
  })

  // [new]
  it('[new] marca elemento como nuevo', () => {
    const result = validateNexus('Page Home\n  Section Promo [new]')
    expect(result).toHaveLength(0)
  })

  // [locked]
  it('[locked] protege elemento de regeneración', () => {
    const result = validateNexus('Page Home\n  Section Header [locked]')
    expect(result).toHaveLength(0)
  })

  // [inherit:siblings]
  it('[inherit:siblings] hereda estilo de hermanos', () => {
    const result = validateNexus('Page Home\n  Card #glass [inherit:siblings]')
    expect(result).toHaveLength(0)
  })

  // [cascade:children]
  it('[cascade:children] propaga estilos a hijos', () => {
    const result = validateNexus('Page Home\n  Section #dark [cascade:children]')
    expect(result).toHaveLength(0)
  })

  // [position:move-to:N]
  it('[position:move-to:N] mueve elemento a posición N', () => {
    const result = validateNexus('Page Home\n  Button "CTA" [position:move-to:1]')
    expect(result).toHaveLength(0)
  })

  // Combinación de operadores avanzados
  it('blueprint completo con operadores avanzados es válido', () => {
    const result = validateNexus(`@React @Tailwind
Page ProductCard
  Section Hero #glass [cascade:children]
    Image < product.thumbnail [ratio:16/9] [locked]
    Text < product.name !bold [new]
    Button "Comprar" #primary [hover:scale-105]
      !! "El producto debe tener stock"
      => CartStore.add(product)
      !error:400 -> /error/sin-stock`)
    expect(result).toHaveLength(0)
  })

})
