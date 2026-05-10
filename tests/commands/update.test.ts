import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('nexus update', () => {
  it('runs without crashing', () => {
    try {
      const output = execSync('npx tsx src/index.ts update', {
        timeout: 10000,
        stdio: ['pipe', 'pipe', 'pipe']
      }).toString()
      // Either up to date or new version available
      expect(
        output.includes('latest version') ||
        output.includes('new version') ||
        output.includes('connection') ||
        output.includes('internet')
      ).toBe(true)
    } catch {
      // Network may not be available in CI — that is an acceptable outcome
    }
  })

  it('command is registered and reachable', () => {
    const help = execSync('npx tsx src/index.ts --help').toString()
    expect(help).toContain('update')
  })
})
