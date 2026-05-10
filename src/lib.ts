// NEXUS core library — importable by NEXUS Studio and other integrations

export { validateNexus } from './commands/validate.js'
export type { ValidationError } from './commands/validate.js'

export { buildPrompt as buildContextPrompt } from './commands/context.js'
export { buildLockdownPrompt as buildPrecisionPrompt } from './commands/lockdown.js'
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

export { createDefaultConfig } from './defaults.js'

export { buildSystemPrompt } from './system-prompt.js'
export type { NexusProvider } from './system-prompt.js'
