import type { NexusConfig } from './types/nexus.js'

export function createDefaultConfig(partial?: Partial<NexusConfig>): NexusConfig {
  return {
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
    standards: ['Clean Code', 'Modular Architecture'],
    ...partial
  }
}
