import { describe, it, expect, afterEach } from 'vitest'
import { existsSync, unlinkSync, readFileSync } from 'fs'
import { execSync } from 'child_process'

describe('nexus init', () => {
  const configPath = './nexus.config.json'

  afterEach(() => {
    if (existsSync(configPath)) unlinkSync(configPath)
  })

  it('crea nexus.config.json con valores por defecto', () => {
    execSync('npx tsx src/index.ts init')
    expect(existsSync(configPath)).toBe(true)
    const config = JSON.parse(readFileSync(configPath, 'utf8'))
    expect(config.lang).toBe('en')
    expect(config.framework).toBe('react-ts')
  })

  it('no sobreescribe si ya existe', () => {
    execSync('npx tsx src/index.ts init')
    execSync('npx tsx src/index.ts init')
    // No debe lanzar error
    expect(existsSync(configPath)).toBe(true)
  })
})