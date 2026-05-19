// Pure NEXUS validation logic — no CLI, no FS, no framework dependencies.
import { stripStringContent } from './parser.js'
import { NEXUS_ORCHESTRATORS, NEXUS_KEYWORDS } from './grammar.js'

const VALID_ORCHESTRATORS = new Set<string>([...NEXUS_ORCHESTRATORS, ...NEXUS_KEYWORDS])
const VALID_DIRECTIVE = /^@[A-Za-z]/
const VALID_TOKEN = /^#[a-zA-Z]/
const CONDITIONAL_OPENER = /^\(.*\)\s*->$/
const VALID_ERROR_CODES = new Set(['timeout', 'network', '*'])
const VALID_RELATION_MODS = new Set(['many', 'optional', 'cascade'])

export interface ValidationError {
  line: number
  message: string
}

const MAX_FILE_BYTES = 500 * 1024 // 500 KB
const MAX_LINES = 2000

export function validateNexus(content: string): ValidationError[] {
  const errors: ValidationError[] = []

  // Input guards — reject oversized or malformed content immediately
  if (Buffer.byteLength(content, 'utf8') > MAX_FILE_BYTES) {
    return [{ line: 0, message: 'File exceeds maximum allowed size of 500 KB.' }]
  }
  // Strip \r to normalize CRLF before splitting
  const normalized = content.replace(/\r/g, '')
  // Reject null bytes (binary / injection)
  if (normalized.includes('\0')) {
    return [{ line: 0, message: 'File contains null bytes (\\0). Only plain text is allowed.' }]
  }
  // Reject control characters U+0001–U+001F (tab \x09 and newline \x0A are legitimate)
  const controlChars = normalized.split('').filter(c => {
    const code = c.charCodeAt(0)
    return code < 32 && code !== 9 && code !== 10
  })
  if (controlChars.length > 0) {
    return [{ line: 0, message: 'File contains control characters (U+0001–U+001F). Only plain text is allowed.' }]
  }

  const lines = normalized.split('\n')

  if (lines.length > MAX_LINES) {
    return [{ line: 0, message: `File exceeds maximum of ${MAX_LINES} lines (found ${lines.length}).` }]
  }

  // Global depth counters for braces { } — they span multiple lines (Type User { ... })
  let braceDepth = 0
  let braceOpenLine = 0

  // Global depth counter for brackets [ ] used in data-binding arrays: < [ ... ]
  // Attribute brackets [attr:val] must be closed on the same line (checked per-line below)
  let bracketDepth = 0
  let bracketOpenLine = 0

  // Conditional block state: ( cond ) -> ... : ...
  let conditionalDepth = 0
  let conditionalOpenLine = 0

  // Track indentation of the last line with a complete => action or < data binding (for !error parent check)
  let lastActionIndent = -1
  let lastBindingIndent = -1

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

    // Track lines that have a complete => action or < data binding (used to validate !error parent)
    if (/=>\s*\S+/.test(trimmed)) {
      lastActionIndent = leadingSpaces
    }
    if (/<\s+\S/.test(trimmed)) {
      lastBindingIndent = leadingSpaces
    }

    // Orchestrator validation: PascalCase word followed by an identifier
    const orchestratorMatch = trimmed.match(/^([A-Z][a-zA-Z]+)\s+([A-Za-z]\w*)/)
    if (orchestratorMatch) {
      const word = orchestratorMatch[1]
      if (!VALID_ORCHESTRATORS.has(word)) {
        errors.push({
          line: lineNumber,
          message: `Unknown orchestrator "${word}". Valid orchestrators: ${[...VALID_ORCHESTRATORS].join(', ')}`
        })
      }
    }

    // ── !! assertion operator ────────────────────────────────────────────────
    if (trimmed.startsWith('!!')) {
      const assertionContent = trimmed.slice(2).trim()
      if (!assertionContent) {
        errors.push({
          line: lineNumber,
          message: '"!!" requires content. Expected: !! "description" or !! expression'
        })
      }
      return
    }

    // ── !error: handler ──────────────────────────────────────────────────────
    if (trimmed.startsWith('!error:')) {
      // Must be indented under a => action or < data binding line
      const underAction = lastActionIndent >= 0 && leadingSpaces >= lastActionIndent
      const underBinding = lastBindingIndent >= 0 && leadingSpaces >= lastBindingIndent
      if (!underAction && !underBinding) {
        errors.push({ line: lineNumber, message: "!error must be nested under a '=>' action or '<' data binding" })
      }
      const errorMatch = trimmed.match(/^!error:(\S+?)(?:\s*->\s*(\S+))?$/)
      if (!errorMatch) {
        errors.push({ line: lineNumber, message: '!error syntax is invalid. Expected: !error:code -> destination' })
      } else {
        const code = errorMatch[1]
        const dest = errorMatch[2]
        const numCode = /^\d{3}$/.test(code) ? parseInt(code, 10) : null
        const isValidCode =
          (numCode !== null && numCode >= 400 && numCode <= 599) || VALID_ERROR_CODES.has(code)
        if (!isValidCode) {
          errors.push({
            line: lineNumber,
            message: "Invalid error code. Use HTTP status (400-599), 'timeout', 'network', or '*'"
          })
        }
        if (!dest) {
          errors.push({ line: lineNumber, message: '!error must include a destination: !error:code -> /route' })
        }
      }
      // Skip remaining checks — !error lines don't use other operators
      return
    }

    // ── @install-dev / @install -D — explicit dev dependency declaration ────
    if (trimmed.startsWith('@install-dev') || trimmed.match(/^@install\s+-D/)) {
      let pkg: string
      if (trimmed.startsWith('@install-dev')) {
        pkg = trimmed.slice(12).trim()
      } else {
        pkg = trimmed.replace(/^@install\s+-D\s*/, '').trim()
      }
      if (!pkg) {
        errors.push({
          line: lineNumber,
          message: '"@install-dev" requires a package name. Expected: @install-dev typescript'
        })
      }
      return
    }

    // ── @install — explicit production dependency declaration ────────────────
    if (trimmed.startsWith('@install')) {
      const pkg = trimmed.slice(8).trim()
      if (!pkg || pkg.startsWith('-')) {
        errors.push({
          line: lineNumber,
          message: '"@install" requires a package name. Expected: @install lodash'
        })
      }
      return
    }

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

    // # tokens: must match #[a-zA-Z] — ignore tokens inside quoted strings
    const tokenMatches = stripStringContent(trimmed).match(/#\S*/g) || []
    for (const token of tokenMatches) {
      if (!VALID_TOKEN.test(token)) {
        errors.push({
          line: lineNumber,
          message: `Invalid token: "${token}". Expected format: #name`
        })
      }
    }

    // -> without destination — unless it opens a multi-line conditional block: ( cond ) ->
    if (/->$/.test(trimmed)) {
      if (CONDITIONAL_OPENER.test(trimmed)) {
        if (conditionalDepth === 0) conditionalOpenLine = lineNumber
        conditionalDepth++
      } else {
        errors.push({ line: lineNumber, message: '"->" without a defined destination.' })
      }
    }

    // : separator — closes the nearest open conditional block
    if (trimmed === ':') {
      if (conditionalDepth > 0) conditionalDepth--
    }

    // => without action
    if (/=>$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"=>" without a defined action.' })
    }

    // $ variables: must have : followed by a non-whitespace value (e.g. $brand: "Nexus")
    if (trimmed.startsWith('$')) {
      if (!/^\$[a-zA-Z_]\w*\s*:\s*\S/.test(trimmed)) {
        errors.push({
          line: lineNumber,
          message: `Invalid variable: "${trimmed.split(/[\s:]/)[0]}". Expected format: $name: value`
        })
      }
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

    // < data binding: cannot appear alone at end of line
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

    // ── [paginate:N] — native pagination ────────────────────────────────────
    const paginateMatch = trimmed.match(/\[paginate:\s*([^\],\s]+)/)
    if (paginateMatch) {
      // Requires data binding < on the same line
      if (!/</.test(trimmed)) {
        errors.push({ line: lineNumber, message: "[paginate] requires a data binding operator '<'" })
      }
      // N must be a positive integer between 1 and 500
      const paginateStr = paginateMatch[1]
      if (!/^\d+$/.test(paginateStr)) {
        errors.push({ line: lineNumber, message: 'Pagination size must be a positive integer. Expected: [paginate:N]' })
      } else {
        const paginateNum = parseInt(paginateStr, 10)
        if (paginateNum < 1 || paginateNum > 500) {
          errors.push({ line: lineNumber, message: 'Pagination size must be between 1 and 500' })
        }
      }
      // Cannot combine with multiplier * N
      if (/(?:^|\s)\*\s*\d+/.test(trimmed)) {
        errors.push({ line: lineNumber, message: "Cannot use [paginate] with multiplier '* N' — choose one" })
      }
      // Optional page:~var must be a valid local state variable
      const pageMatch = trimmed.match(/\bpage:\s*([^,\]\s]+)/)
      if (pageMatch) {
        const pageVar = pageMatch[1].trim()
        if (!/^~[a-zA-Z_]\w*$/.test(pageVar)) {
          errors.push({
            line: lineNumber,
            message: '"page:" value must reference a local state variable (e.g. page:~currentPage)'
          })
        }
      }
      // Optional layout: must be grid or list
      const layoutMatch = trimmed.match(/\blayout:\s*([^,\]\s]+)/)
      if (layoutMatch) {
        const layout = layoutMatch[1].trim()
        if (layout !== 'grid' && layout !== 'list') {
          errors.push({ line: lineNumber, message: `Invalid layout: "${layout}". Use "grid" or "list"` })
        }
      }
    }

    // ── -> Model.Name — model relations inside Entity lines ──────────────────
    const modelRelMatch = trimmed.match(/\->\s*Model\.([A-Za-z]\w*)/)
    if (modelRelMatch) {
      const modelName = modelRelMatch[1]
      if (!trimmed.startsWith('Entity ')) {
        errors.push({ line: lineNumber, message: "Model relations must be defined inside an Entity" })
      } else {
        if (!/^[A-Z]/.test(modelName)) {
          errors.push({
            line: lineNumber,
            message: `Model name must start with uppercase: "Model.${modelName}"`
          })
        }
        // Validate relation modifiers if present
        const modMatch = trimmed.match(/Model\.\w+\s*\[([^\]]+)\]/)
        if (modMatch) {
          const mods = modMatch[1].split(',').map(m => m.trim())
          for (const mod of mods) {
            if (!VALID_RELATION_MODS.has(mod)) {
              errors.push({
                line: lineNumber,
                message: `Invalid relation modifier "${mod}". Use [many], [optional], or [cascade]`
              })
            }
          }
        }
      }
    }

    // { } — cumulative balance across the entire file
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

    // [ ] — attribute brackets must be closed on the same line.
    // Exception: data-binding arrays opened with "< [" may span multiple lines and
    // are tracked via the global bracketDepth counter.
    const openBrackets = (trimmed.match(/\[/g) ?? []).length
    const closeBrackets = (trimmed.match(/\]/g) ?? []).length

    if (bracketDepth > 0) {
      // Inside a multi-line data array — track balance globally
      bracketDepth += openBrackets - closeBrackets
      if (bracketDepth < 0) {
        errors.push({ line: lineNumber, message: '"]" without matching "[".' })
        bracketDepth = 0
      }
    } else if (openBrackets > closeBrackets) {
      // More opening brackets than closing on this line — allow only for "< [" data arrays
      if (/(?:^|[^a-zA-Z0-9_])<\s*\[/.test(trimmed)) {
        bracketDepth = openBrackets - closeBrackets
        bracketOpenLine = lineNumber
      } else {
        errors.push({ line: lineNumber, message: '"[" unclosed on this line. Brackets must open and close on the same line.' })
      }
    } else if (closeBrackets > openBrackets) {
      errors.push({ line: lineNumber, message: '"]" without matching "[" on this line.' })
    }

    // @Auth — must be standalone or @Auth[key:value]; reject @Auth(...), @Auth123, etc.
    if (trimmed.includes('@Auth')) {
      const badAuth = trimmed.match(/@Auth([^\s\[])/)
      if (badAuth) {
        errors.push({
          line: lineNumber,
          message: `Invalid @Auth directive: "@Auth${badAuth[1]}...". Expected @Auth or @Auth[mode:...]`
        })
      }
    }

    // @RateLimit — must match @RateLimit[number/unit]
    if (trimmed.includes('@RateLimit')) {
      if (!trimmed.match(/@RateLimit\[\d+\/\w+\]/)) {
        errors.push({
          line: lineNumber,
          message: 'Invalid @RateLimit. Expected format: @RateLimit[number/unit] (e.g. 100/min)'
        })
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
  if (conditionalDepth > 0) {
    errors.push({ line: conditionalOpenLine, message: '"( cond ) ->" without closing ":".' })
  }

  return errors
}
