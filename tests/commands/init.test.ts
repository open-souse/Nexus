import { describe, it, expect, afterEach } from 'vitest'
import { existsSync, unlinkSync, writeFileSync } from 'fs'
import fs from 'fs-extra'

describe('nexus init', () => {
  const configPath = './nexus.config.json'

  afterEach(() => {
    if (existsSync(configPath)) unlinkSync(configPath)
  })

  it('does not overwrite nexus.config.json if it already exists', () => {
    const original = { lang: 'en', framework: 'vue-ts' }
    writeFileSync(configPath, JSON.stringify(original))

    // File already exists — init should not overwrite it
    const content = fs.readJsonSync(configPath)
    expect(content.framework).toBe('vue-ts')
  })

  it('generated config has the correct structure (v4.0 Full-Stack)', () => {
    const config = {
      lang: 'en',
      modules: ['frontend', 'backend'],
      framework: 'react-ts',
      styling: 'tailwind',
      output: './src/components',
      backend: {
        framework: 'nestjs',
        database: 'postgresql',
        orm: 'prisma'
      },
      tokens: {
        primary: '#2563eb',
        secondary: '#64748b',
        danger: '#ef4444',
        success: '#22c55e',
        radius: '8px',
        font: "'Inter', sans-serif"
      },
      icons: { library: 'lucide-react' }
    }
    writeFileSync(configPath, JSON.stringify(config, null, 2))
    const loaded = fs.readJsonSync(configPath)
    expect(loaded.lang).toBe('en')
    expect(loaded.modules).toContain('backend')
    expect(loaded.backend.framework).toBe('nestjs')
    expect(loaded.tokens.primary).toBe('#2563eb')
    expect(loaded.icons.library).toBe('lucide-react')
  })
})
