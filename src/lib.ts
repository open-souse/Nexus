// NEXUS core library — public API for NEXUS Studio and external integrations

export { validateNexus } from './core/validator.js'
export type { ValidationError } from './core/validator.js'

export { extractContract } from './core/extractor.js'
export type { ContractItem, ContractItemType } from './core/extractor.js'

export { verifyContract } from './core/verifier.js'
export type { VerifyResult } from './core/verifier.js'

export { buildPrompt, buildSystemPrompt, buildDefaultGrammarReference } from './context/builder.js'
export type { NexusProvider } from './context/builder.js'

export type { NexusConfig, NexusTokens } from './types/nexus.js'

export {
  NEXUS_VERSION,
  NEXUS_ORCHESTRATORS,
  NEXUS_OPERATORS,
  NEXUS_KEYWORDS,
  NEXUS_MODULES,
  NEXUS_BLUEPRINTS
} from './core/grammar.js'
export type { NexusOperator, NexusModule, NexusBlueprint } from './core/grammar.js'

export { createDefaultConfig } from './context/config.js'
