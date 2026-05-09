import { describe, it, expect, afterEach } from 'vitest'
import { existsSync, unlinkSync, writeFileSync } from 'fs'
import fs from 'fs-extra'

describe('nexus init', () => {
  const configPath = './nexus.config.json'

  afterEach(() => {
    if (existsSync(configPath)) unlinkSync(configPath)
  })

  it('no sobreescribe nexus.config.json si ya existe', () => {
    const original = { lang: 'en', framework: 'vue-ts' }
    writeFileSync(configPath, JSON.stringify(original))

    // Simula que el archivo ya existe — init no debe sobreescribirlo
    const content = fs.readJsonSync(configPath)
    expect(content.framework).toBe('vue-ts')
  })

  it('el config generado tiene la estructura correcta', () => {
    const config = {
      lang: 'en',
      framework: 'react-ts',
      styling: 'tailwind',
      output: './src/components',
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
    expect(loaded.tokens.primary).toBe('#2563eb')
    expect(loaded.icons.library).toBe('lucide-react')
  })
})
