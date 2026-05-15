import type { NexusConfig } from '../types/nexus.js'

const DEFAULT_CONFIG: NexusConfig = {
  lang: 'en',
  modules: ['frontend'],
  framework: 'next-ts',
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
  icons: { library: 'lucide-react' },
  backend: {
    framework: 'nestjs',
    database: 'postgresql',
    orm: 'prisma'
  },
  testing: {
    scope: 'full-stack'
  },
  standards: ['Clean Code', 'Modular Architecture']
}

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base }
  for (const key in override) {
    const val = override[key]
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = deepMerge(result[key] as object, val as object) as T[typeof key]
    } else if (val !== undefined) {
      result[key] = val as T[typeof key]
    }
  }
  return result
}

export function createDefaultConfig(partial: Partial<NexusConfig> = {}): NexusConfig {
  return deepMerge(DEFAULT_CONFIG, partial)
}
