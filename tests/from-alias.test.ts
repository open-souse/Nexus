import { describe, it, expect } from 'vitest'
import { validateNexus } from '../src/lib.js'

describe('from — readable alias for < data binding', () => {

  it('Table from User is valid', () => {
    expect(validateNexus('Page Dashboard\n  Table from User')).toHaveLength(0)
  })

  it('List from items with [paginate:] is valid', () => {
    expect(validateNexus('Page Home\n  List from items [paginate:10]')).toHaveLength(0)
  })

  it('Image from source with [ratio:] is valid', () => {
    expect(validateNexus('Page Profile\n  Image from user.avatar [ratio:1/1]')).toHaveLength(0)
  })

  it('!error: nested under from binding is valid', () => {
    const src = `Page Dashboard
  Table from User [paginate:20]
    !error:404 -> /error/not-found`
    expect(validateNexus(src)).toHaveLength(0)
  })

  it('from without source is invalid', () => {
    const errors = validateNexus('Page Home\n  Table from')
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('"from" without a source')
  })

  it('[paginate:] with from instead of < is valid', () => {
    expect(validateNexus('Page Home\n  Table from Users [paginate:25]')).toHaveLength(0)
  })

  it('< still works (backward compatible)', () => {
    expect(validateNexus('Page Home\n  Table < User [paginate:20]')).toHaveLength(0)
  })

  it('complete blueprint using from syntax is valid', () => {
    const src = `@React @Tailwind
Page Dashboard
  @Auth[mode:jwt]
  Layout SplitView
  Section Analytics #glass
    Chart from MetricsData [paginate:10]
    Text "Ingresos totales" !bold #accent
  Section Users
    Table from User [paginate:20]
      !error:404 -> /error/not-found
  Section Actions
    Button "Exportar" => DashboardService.export()
    Button "Actualizar" => DashboardService.refresh()`
    expect(validateNexus(src)).toHaveLength(0)
  })

})
