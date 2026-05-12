import type { ValidationError } from './types.js'
import { NEXUS_ORCHESTRATORS, NEXUS_KEYWORDS, ORCHESTRATOR_RULES } from '../../grammar.js'

interface ContextFrame {
  orchestrator: string
  indent: number
}

export function validateSemantic(content: string): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = content.split('\n')
  const contextStack: ContextFrame[] = []

  lines.forEach((raw, index) => {
    const lineNumber = index + 1
    const line = raw.trimEnd()
    if (line.trim() === '' || line.trim().startsWith('//')) return

    const indent = line.length - line.trimStart().length
    const trimmed = line.trim()

    // 1. Manage context stack based on indentation
    while (contextStack.length > 0 && contextStack[contextStack.length - 1].indent >= indent) {
      contextStack.pop()
    }

    let firstWord = trimmed.split(/[\s[]/)[0]
    if (firstWord.endsWith(':')) firstWord = firstWord.slice(0, -1)

    const isOrchestrator = (NEXUS_ORCHESTRATORS as readonly string[]).includes(firstWord)
    const isKeyword = (NEXUS_KEYWORDS as readonly string[]).includes(firstWord)

    const currentContext = contextStack.length > 0 ? contextStack[contextStack.length - 1].orchestrator : null

    // 2. Advanced Compatibility Check
    if (currentContext) {
      const rules = ORCHESTRATOR_RULES[currentContext]
      
      if (rules) {
        if (isKeyword && !rules.allowedKeywords.includes(firstWord)) {
          errors.push({
            line: lineNumber,
            message: `Semantic Error: "${firstWord}" is not allowed inside "${currentContext}".`
          })
        }
        
        if (isOrchestrator && rules.allowedOrchestrators && !rules.allowedOrchestrators.includes(firstWord)) {
          errors.push({
            line: lineNumber,
            message: `Semantic Error: Orchestrator "${firstWord}" cannot be nested inside "${currentContext}".`
          })
        }
      }
    } else {
      // Rule: Keywords cannot exist outside an orchestrator
      if (isKeyword) {
        errors.push({
          line: lineNumber,
          message: `Semantic Error: Keyword "${firstWord}" must be defined inside an orchestrator block.`
        })
      }
    }

    // Rule: Specific check for symbols like !pk
    if (trimmed.includes('!pk') && currentContext !== 'Model') {
      errors.push({
        line: lineNumber,
        message: 'Semantic Error: "!pk" (Primary Key) must be defined inside a "Model" orchestrator.'
      })
    }

    // 3. Update stack
    if (isOrchestrator) {
      contextStack.push({ orchestrator: firstWord, indent })
    }
  })

  return errors
}
