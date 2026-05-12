import { VALID_DIRECTIVE, VALID_TOKEN } from './rules.js'
import type { ValidationError } from './types.js'

export function validateSyntax(content: string): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = content.split('\n')

  let braceDepth = 0
  let bracketDepth = 0
  let braceOpenLine = 0
  let bracketOpenLine = 0

  lines.forEach((raw, index) => {
    const lineNumber = index + 1
    const line = raw.trimEnd()

    if (line.trim() === '' || line.trim().startsWith('//')) return

    // Indentation
    const leadingSpaces = line.length - line.trimStart().length
    if (leadingSpaces % 2 !== 0) {
      errors.push({
        line: lineNumber,
        message: `Invalid indentation (${leadingSpaces} spaces). Use multiples of 2.`
      })
    }

    const trimmed = line.trim()

    // Directives
    if (trimmed.startsWith('@')) {
      const directive = trimmed.split(/[\s[]/)[0]
      if (!VALID_DIRECTIVE.test(directive)) {
        errors.push({
          line: lineNumber,
          message: `Invalid directive: "${directive}". Expected format: @FrameworkName`
        })
      }
    }

    // Style Tokens
    const tokenMatches = trimmed.match(/#\S*/g) || []
    for (const token of tokenMatches) {
      if (!VALID_TOKEN.test(token)) {
        errors.push({
          line: lineNumber,
          message: `Invalid token: "${token}". Expected format: #name`
        })
      }
    }

    // Operators
    if (/->$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"->" without a defined destination.' })
    }
    if (/=>$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"=>" without a defined action.' })
    }
    if (/\s<$/.test(trimmed) || trimmed === '<') {
      errors.push({
        line: lineNumber,
        message: '"<" without a defined type. Expected format: < TypeName'
      })
    }

    // [animate: ...] — value cannot be empty
    const animateMatch = trimmed.match(/\[animate:\s*([^\],]*)\]/)
    if (animateMatch && !animateMatch[1].trim()) {
      errors.push({
        line: lineNumber,
        message: '"[animate:]" missing value. Example: [animate: fade-in, duration: 200ms]'
      })
    }

    // [a11y: ...] — value cannot be empty
    const a11yMatch = trimmed.match(/\[a11y:\s*([^\]]*)\]/)
    if (a11yMatch && !a11yMatch[1].trim()) {
      errors.push({
        line: lineNumber,
        message: '"[a11y:]" missing attributes. Example: [a11y: aria-label="Close"]'
      })
    }

    // Variables & State
    if (trimmed.startsWith('$') && !/^\$[a-zA-Z_]\w*\s*:/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Invalid variable: "${trimmed.split(/[\s:]/)[0]}". Expected format: $name: value`
      })
    }
    if (trimmed.startsWith('~') && !/^~[a-zA-Z_]\w*\s*:/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Invalid state: "${trimmed.split(/[\s:]/)[0]}". Expected format: ~name: value`
      })
    }

    // Multiplier
    const multiplierMatch = trimmed.match(/(?:^|\s)\*\s*(\S*)/)
    if (multiplierMatch) {
      const num = multiplierMatch[1]
      if (!num) {
        errors.push({ line: lineNumber, message: '"*" without a number.' })
      } else if (!/^\d+$/.test(num)) {
        errors.push({ line: lineNumber, message: `Invalid multiplier: "* ${num}".` })
      }
    }

    // Balance
    for (const ch of trimmed) {
      if (ch === '{') {
        if (braceDepth === 0) braceOpenLine = lineNumber
        braceDepth++
      } else if (ch === '}') {
        braceDepth--
        if (braceDepth < 0) {
          errors.push({ line: lineNumber, message: '"}" without matching "{".' })
          braceDepth = 0
        }
      } else if (ch === '[') {
        if (bracketDepth === 0) bracketOpenLine = lineNumber
        bracketDepth++
      } else if (ch === ']') {
        bracketDepth--
        if (bracketDepth < 0) {
          errors.push({ line: lineNumber, message: '"]" without matching "[".' })
          bracketDepth = 0
        }
      }
    }
  })

  if (braceDepth > 0) errors.push({ line: braceOpenLine, message: '"{" unclosed.' })
  if (bracketDepth > 0) errors.push({ line: bracketOpenLine, message: '"[" unclosed.' })

  return errors
}
