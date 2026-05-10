import { buildPrompt } from './commands/context.js'
import type { NexusConfig } from './types/nexus.js'

export type NexusProvider = 'claude' | 'gpt' | 'gemini'

const PROVIDER_HEADERS: Record<NexusProvider, string> = {
  claude: 'You are a coding assistant. The user writes requests in NEXUS notation — a structured shorthand for UI, logic, and project structure. Parse NEXUS input and generate the implementation.',
  gpt: 'You are a precise coding assistant. The user communicates using NEXUS notation, a structured DSL for describing UI components, logic, and project structure. Interpret NEXUS syntax and generate the corresponding implementation.',
  gemini: 'You are a coding assistant that understands NEXUS notation — a shorthand language for describing UI, logic, and code structure. When the user writes NEXUS, generate the implementation code.'
}

/**
 * Build a system prompt for use in AI API calls.
 * Adapts the NEXUS grammar reference to the target provider's format.
 */
export function buildSystemPrompt(config: Partial<NexusConfig>, provider: NexusProvider = 'claude'): string {
  const header = PROVIDER_HEADERS[provider]
  const grammar = buildPrompt(config)
  return `${header}\n\n${grammar}`
}
