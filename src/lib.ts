// NEXUS core library — importable by NEXUS Studio and other integrations

export { validateNexus } from './commands/validate.js'
export type { ValidationError } from './commands/validate.js'

export { buildPrompt as buildContextPrompt } from './commands/context.js'
export { buildLockdownPrompt as buildPrecisionPrompt } from './commands/lockdown.js'
export { buildLearnPrompt } from './commands/learn.js'

export type { NexusConfig, NexusTokens } from './types/nexus.js'
