import { validateSyntax } from './syntax.js'
import { validateSemantic } from './semantic.js'
import type { ValidationError } from './types.js'

/**
 * Unified entry point for NEXUS validation.
 * Combines syntax and semantic checks to ensure a file is both grammatically 
 * correct and architecturally sound.
 * 
 * @param content - The raw string content of a .nexus file.
 * @returns An array of ValidationErrors, sorted by line number.
 */
export function validateNexus(content: string): ValidationError[] {
  const syntaxErrors = validateSyntax(content)
  const semanticErrors = validateSemantic(content)
  
  // Combine and sort by line number to provide a cohesive feedback loop
  return [...syntaxErrors, ...semanticErrors].sort((a, b) => a.line - b.line)
}

export type { ValidationError } from './types.js'
export { validateSyntax } from './syntax.js'
export { validateSemantic } from './semantic.js'
