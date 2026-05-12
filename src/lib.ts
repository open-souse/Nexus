// NEXUS core library — importable by NEXUS Studio and other integrations

export { validateNexus } from './core/validator/index.js'
export type { ValidationError } from './core/validator/index.js'

export { buildPrompt, buildSystemPrompt } from './core/prompts/builder.js'
export type { NexusProvider } from './core/prompts/builder.js'

export type { NexusConfig, NexusTokens } from './types/nexus.js'

export {
  NEXUS_VERSION,
  NEXUS_ORCHESTRATORS,
  NEXUS_KEYWORDS,
  NEXUS_OPERATORS,
  NEXUS_MODULES,
  NEXUS_BLUEPRINTS
} from './grammar.js'
export type { NexusOperator, NexusModule, NexusBlueprint } from './grammar.js'

export { createDefaultConfig } from './core/config.js'
