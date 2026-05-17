import { describe, it, expect } from 'vitest'
import { extractDependenciesFromContent } from '../../src/cli/install.js'

describe('nexus install — JIT syntax dependency extractor', () => {
  it('extracts React + Tailwind + Lucide dependencies from file syntax (isTs = true)', () => {
    const content = `
      @React @Tailwind
      Page Dashboard
        Layout SplitView
        Section Resumen #glass
          Text "Ingresos" !bold
          Button "OK" [icons:lucide-react] => onClick()
    `
    const { prodDeps, devDeps } = extractDependenciesFromContent(content, true)

    expect(prodDeps).toContain('react')
    expect(prodDeps).toContain('react-dom')
    expect(prodDeps).toContain('lucide-react')

    expect(devDeps).toContain('@types/react')
    expect(devDeps).toContain('@types/react-dom')
    expect(devDeps).toContain('tailwindcss')
    expect(devDeps).toContain('postcss')
    expect(devDeps).toContain('autoprefixer')
  })

  it('extracts React + Tailwind dependencies from file syntax (isTs = false)', () => {
    const content = `
      @React @Tailwind
      Page Dashboard
    `
    const { prodDeps, devDeps } = extractDependenciesFromContent(content, false)

    expect(prodDeps).toContain('react')
    expect(prodDeps).toContain('react-dom')

    expect(devDeps).not.toContain('@types/react')
    expect(devDeps).not.toContain('@types/react-dom')
    expect(devDeps).toContain('tailwindcss')
  })

  it('extracts backend NestJS + Postgres + Prisma dependencies', () => {
    const content = `
      @NestJS @Prisma @PostgreSQL
      Model Pedido
        Entity id type:uuid !pk
    `
    const { prodDeps, devDeps } = extractDependenciesFromContent(content, true)

    expect(prodDeps).toContain('@nestjs/common')
    expect(prodDeps).toContain('@nestjs/core')
    expect(prodDeps).toContain('reflect-metadata')
    expect(prodDeps).toContain('rxjs')
    expect(prodDeps).toContain('@prisma/client')
    expect(prodDeps).toContain('pg')

    expect(devDeps).toContain('prisma')
    expect(devDeps).toContain('@types/pg')
  })

  it('extracts Hono + SQLite + Drizzle setup', () => {
    const content = `
      @Hono @Drizzle
      Database sqlite
    `
    const { prodDeps, devDeps } = extractDependenciesFromContent(content, true)

    expect(prodDeps).toContain('hono')
    expect(prodDeps).toContain('sqlite3')
    expect(prodDeps).toContain('drizzle-orm')

    expect(devDeps).toContain('drizzle-kit')
  })

  it('extracts testing frameworks like Vitest, Jest or Cypress', () => {
    const content = `
      Suite "Auth Flow"
        Test LoginForm [type:unit] Frontend vitest
        Test AuthService [type:unit] Backend jest
    `
    const { prodDeps, devDeps } = extractDependenciesFromContent(content, true)

    expect(devDeps).toContain('vitest')
    expect(devDeps).toContain('jest')
    expect(devDeps).toContain('@types/jest')
  })

  it('extracts explicit JIT @install and @install-dev directives', () => {
    const content = `
      @install lodash
      @install axios
      @install-dev typescript
      @install -D eslint
      Page Dashboard
    `
    const { prodDeps, devDeps } = extractDependenciesFromContent(content, true)

    expect(prodDeps).toContain('lodash')
    expect(prodDeps).toContain('axios')
    expect(devDeps).toContain('typescript')
    expect(devDeps).toContain('eslint')
  })
})
