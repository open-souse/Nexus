import { describe, it, expect } from 'vitest'
import { extractContract } from '../../src/core/extractor.js'
import { verifyContract } from '../../src/core/verifier.js'

// ─── extractContract ──────────────────────────────────────────────────────────

describe('extractContract — identifies contract items', () => {
  it('extracts @Auth', () => {
    const items = extractContract('@Auth[mode:jwt]\nPage Dashboard')
    expect(items.some(i => i.type === 'auth')).toBe(true)
  })

  it('extracts !! assertions', () => {
    const items = extractContract('!! "El carrito no puede estar vacío"')
    expect(items).toHaveLength(1)
    expect(items[0].type).toBe('assertion')
    expect(items[0].declaration).toBe('"El carrito no puede estar vacío"')
  })

  it('ignores empty !! lines', () => {
    const items = extractContract('!!')
    expect(items.filter(i => i.type === 'assertion')).toHaveLength(0)
  })

  it('extracts !error: handlers', () => {
    const items = extractContract('!error:400 -> /error')
    expect(items[0].type).toBe('error-handler')
    expect(items[0].declaration).toBe('!error:400 -> /error')
  })

  it('extracts => actions', () => {
    const items = extractContract('Button "Go" => CartService.add()')
    expect(items[0].type).toBe('action')
    expect(items[0].declaration).toBe('CartService.add()')
  })

  it('extracts @install packages', () => {
    const items = extractContract('@install lodash')
    expect(items[0].type).toBe('install')
    expect(items[0].declaration).toBe('lodash')
  })

  it('extracts @install-dev packages', () => {
    const items = extractContract('@install-dev vitest')
    expect(items[0].type).toBe('install')
    expect(items[0].declaration).toBe('vitest')
  })

  it('extracts Endpoint declarations', () => {
    const items = extractContract('Endpoint POST /carrito/agregar')
    expect(items[0].type).toBe('endpoint')
    expect(items[0].declaration).toBe('POST /carrito/agregar')
  })

  it('extracts [paginate:] declarations', () => {
    const items = extractContract('Table from User [paginate:20]')
    expect(items[0].type).toBe('pagination')
  })

  it('extracts multiple items from a full blueprint', () => {
    const src = `@React @Tailwind
Page Checkout
  @Auth[mode:jwt]
  Form CheckoutForm
    !! "El carrito no puede estar vacío"
    !! stock > 0
    Button "Pagar" => OrderService.create()
    !error:400 -> /error/carrito-vacio
    !error:402 -> /error/pago-fallido`
    const items = extractContract(src)
    expect(items.some(i => i.type === 'auth')).toBe(true)
    expect(items.filter(i => i.type === 'assertion')).toHaveLength(2)
    expect(items.some(i => i.type === 'action')).toBe(true)
    expect(items.filter(i => i.type === 'error-handler')).toHaveLength(2)
  })
})

// ─── verifyContract ───────────────────────────────────────────────────────────

describe('verifyContract — matches items against code', () => {
  it('finds @Auth in code with JWT guard', () => {
    const items = extractContract('@Auth[mode:jwt]')
    const files = new Map([['src/auth.guard.ts', 'export class JwtGuard { verify(token) {} }']])
    const results = verifyContract(items, files)
    expect(results[0].found).toBe(true)
    expect(results[0].foundIn).toBe('src/auth.guard.ts')
  })

  it('finds assertion message in code', () => {
    const items = extractContract('!! "El carrito no puede estar vacío"')
    const files = new Map([['src/cart.service.ts', "if (cart.isEmpty()) throw new Error('El carrito no puede estar vacío')"]])
    const results = verifyContract(items, files)
    expect(results[0].found).toBe(true)
  })

  it('finds HTTP error code in code', () => {
    const items = extractContract('!error:400 -> /error')
    const files = new Map([['src/handler.ts', 'throw new BadRequestException("invalid", 400)']])
    const results = verifyContract(items, files)
    expect(results[0].found).toBe(true)
  })

  it('finds service action call in code', () => {
    const items = extractContract('Button "Go" => CartService.add()')
    const files = new Map([['src/cart.tsx', 'await CartService.add(item)']])
    const results = verifyContract(items, files)
    expect(results[0].found).toBe(true)
  })

  it('finds installed package in package.json deps', () => {
    const items = extractContract('@install lodash')
    const results = verifyContract(items, new Map(), { dependencies: { lodash: '^4.17.21' } })
    expect(results[0].found).toBe(true)
    expect(results[0].foundIn).toBe('package.json')
  })

  it('reports missing package as not found', () => {
    const items = extractContract('@install lodash')
    const results = verifyContract(items, new Map(), {})
    expect(results[0].found).toBe(false)
  })

  it('finds endpoint route in code', () => {
    const items = extractContract('Endpoint POST /carrito/agregar')
    const files = new Map([['src/cart.controller.ts', "@Post('/carrito/agregar')\nasync agregar() {}"]])
    const results = verifyContract(items, files)
    expect(results[0].found).toBe(true)
  })

  it('finds pagination in code', () => {
    const items = extractContract('Table from User [paginate:20]')
    const files = new Map([['src/users.service.ts', 'return this.repo.find({ skip, take: limit })']])
    const results = verifyContract(items, files)
    expect(results.find(r => r.item.type === 'pagination')?.found).toBe(true)
  })

  it('reports not found when code is empty', () => {
    const items = extractContract('Button "Go" => OrderService.create()')
    const results = verifyContract(items, new Map())
    expect(results[0].found).toBe(false)
    expect(results[0].foundIn).toBeUndefined()
  })
})
