import { describe, it, expect, afterEach } from 'vitest'
import { execSync } from 'child_process'
import Conf from 'conf'

const config = new Conf({ projectName: 'nxlang' })

describe('nexus config', () => {
  afterEach(() => {
    config.clear()
  })

  it('saves a value with config set', () => {
    execSync('npx tsx src/index.ts config set testKey testValue')
    expect(config.get('testKey')).toBe('testValue')
  })

  it('displays the configuration with config show', () => {
    config.set('sampleKey', 'sampleValue')
    const output = execSync('npx tsx src/index.ts config show').toString()
    expect(output).toContain('sampleKey')
    expect(output).toContain('sampleValue')
  })
})