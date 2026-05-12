import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'

const VALID_DIRECTIVE = /^@[A-Za-z]/
const VALID_TOKEN = /^#[a-zA-Z]/

export interface ValidationError {
  line: number
  message: string
}

export function validateNexus(content: string): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = content.split('\n')

  // Global depth counters for braces and brackets
  // (support multi-line blocks like Type User { ... })
  let braceDepth = 0
  let bracketDepth = 0
  let braceOpenLine = 0
  let bracketOpenLine = 0

  lines.forEach((raw, index) => {
    const lineNumber = index + 1
    const line = raw.trimEnd()

    if (line.trim() === '' || line.trim().startsWith('//')) return

    // Indentation: must be multiples of 2 spaces
    const leadingSpaces = line.length - line.trimStart().length
    if (leadingSpaces % 2 !== 0) {
      errors.push({
        line: lineNumber,
        message: `Invalid indentation (${leadingSpaces} spaces). Use multiples of 2.`
      })
    }

    const trimmed = line.trim()

    // @ directives: must match @[A-Za-z] (e.g. @React, @modify)
    if (trimmed.startsWith('@')) {
      const directive = trimmed.split(/[\s[]/)[0]
      if (!VALID_DIRECTIVE.test(directive)) {
        errors.push({
          line: lineNumber,
          message: `Invalid directive: "${directive}". Expected format: @FrameworkName`
        })
      }
    }

    // # tokens: must match #[a-zA-Z] (e.g. #primary, #glass)
    const tokenMatches = trimmed.match(/#\S*/g) || []
    for (const token of tokenMatches) {
      if (!VALID_TOKEN.test(token)) {
        errors.push({
          line: lineNumber,
          message: `Invalid token: "${token}". Expected format: #name`
        })
      }
    }

    // -> without destination
    if (/->$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"->" without a defined destination.' })
    }

    // => without action
    if (/=>$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"=>" without a defined action.' })
    }

    // $ variables: must have : and value (e.g. $brand: "Nexus")
    if (trimmed.startsWith('$') && !/^\$[a-zA-Z_]\w*\s*:/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Invalid variable: "${trimmed.split(/[\s:]/)[0]}". Expected format: $name: value`
      })
    }

    // ~ local state: must have : (e.g. ~isOpen: false)
    if (trimmed.startsWith('~') && !/^~[a-zA-Z_]\w*\s*:/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Invalid state: "${trimmed.split(/[\s:]/)[0]}". Expected format: ~name: value`
      })
    }

    // * multiplier: must be followed by a positive integer (e.g. Card * 3)
    const multiplierMatch = trimmed.match(/(?:^|\s)\*\s*(\S*)/)
    if (multiplierMatch) {
      const num = multiplierMatch[1]
      if (!num) {
        errors.push({
          line: lineNumber,
          message: '"*" without a number. Expected format: * N (positive integer)'
        })
      } else if (!/^\d+$/.test(num)) {
        errors.push({
          line: lineNumber,
          message: `Invalid multiplier: "* ${num}". Expected format: * N (positive integer)`
        })
      }
    }

    // < data binding: cannot appear alone at end of line (e.g. Table < User is valid; Table < is not)
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

    // { } — cumulative balance across the entire file
    // Supports multi-line blocks: Type User { \n ... \n }
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
      }
    }

    // [ ] — cumulative balance across the entire file
    for (const ch of trimmed) {
      if (ch === '[') {
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

    // !pk — primary key constraint
    if (trimmed.includes('!pk') && !trimmed.includes('Entity') && !trimmed.includes('id')) {
      // Valid but unusual
    }

    // @Auth — authentication directive
    if (trimmed.includes('@Auth')) {
      if (!trimmed.match(/@Auth(\[.*\])?/)) {
        errors.push({ line: lineNumber, message: 'Invalid @Auth directive. Expected format: @Auth or @Auth[mode:...]' })
      }
    }

    // @RateLimit — rate limit directive
    if (trimmed.includes('@RateLimit')) {
      if (!trimmed.match(/@RateLimit\[\d+\/\w+\]/)) {
        errors.push({ line: lineNumber, message: 'Invalid @RateLimit. Expected format: @RateLimit[number/unit] (e.g. 100/min)' })
      }
    }
  })

  // Check that all balances are zero at end of file
  if (braceDepth > 0) {
    errors.push({ line: braceOpenLine, message: `"{" unclosed (${braceDepth} unclosed at end of file).` })
  }
  if (bracketDepth > 0) {
    errors.push({ line: bracketOpenLine, message: `"[" unclosed (${bracketDepth} unclosed at end of file).` })
  }

  return errors
}

export function validateCommand(): Command {
  return new Command('validate')
    .description('Validate the syntax of a .nexus file')
    .argument('<file>', '.nexus file to validate')
    .action((file: string) => {
      if (!fs.existsSync(file)) {
        console.log(chalk.red(`File not found: ${file}`))
        process.exit(1)
      }

      if (!file.endsWith('.nexus')) {
        console.log(chalk.yellow('Warning: file does not have a .nexus extension'))
      }

      const content = fs.readFileSync(file, 'utf8')
      const errors = validateNexus(content)

      if (errors.length === 0) {
        console.log(chalk.green(`✓ ${file} — valid syntax`))
      } else {
        console.log(chalk.red(`✗ ${file} — ${errors.length} error(s) found:\n`))
        for (const error of errors) {
          console.log(chalk.red(`  Line ${error.line}: `) + error.message)
        }
        process.exit(1)
      }
    })
}
