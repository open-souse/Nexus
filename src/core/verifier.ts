// Verifies contract items against generated code.
// Accepts a Map<filename, content> so the core logic stays pure and testable.

import type { ContractItem } from './extractor.js'

export interface VerifyResult {
  item: ContractItem
  found: boolean
  foundIn?: string
}

function search(files: Map<string, string>, pattern: RegExp): string | undefined {
  for (const [name, content] of files) {
    if (pattern.test(content)) return name
  }
  return undefined
}

function searchString(files: Map<string, string>, needle: string): string | undefined {
  const lower = needle.toLowerCase()
  for (const [name, content] of files) {
    if (content.toLowerCase().includes(lower)) return name
  }
  return undefined
}

export function verifyContract(
  items: ContractItem[],
  codeFiles: Map<string, string>,
  packageJson: Record<string, unknown> = {}
): VerifyResult[] {
  const deps: Record<string, unknown> = {
    ...(packageJson.dependencies as object ?? {}),
    ...(packageJson.devDependencies as object ?? {})
  }

  return items.map(item => {
    let found = false
    let foundIn: string | undefined

    switch (item.type) {
      case 'auth':
        foundIn = search(codeFiles, /jwt|JwtGuard|UseGuards|authenticate|requireAuth|Bearer|authorization/i)
        found = !!foundIn
        break

      case 'assertion': {
        // Strip surrounding quotes then plain-string search (no dynamic regex)
        const msg = item.declaration.replace(/^["']|["']$/g, '')
        foundIn = searchString(codeFiles, msg)
        found = !!foundIn
        break
      }

      case 'error-handler': {
        const codeMatch = item.declaration.match(/!error:(\d{3}|timeout|network|\*)/)
        if (codeMatch) {
          const code = codeMatch[1]
          // Numeric codes: also accept HttpStatus constant style (e.g. HttpStatus.BAD_REQUEST)
          foundIn = /^\d{3}$/.test(code)
            ? search(codeFiles, /HttpStatus\./i) ?? searchString(codeFiles, code)
            : searchString(codeFiles, code)
          found = !!foundIn
        }
        break
      }

      case 'action': {
        // Strip trailing (args) from "CartService.add()" → "CartService.add"
        const parenIdx = item.declaration.lastIndexOf('(')
        const call = parenIdx !== -1 ? item.declaration.slice(0, parenIdx) : item.declaration
        foundIn = searchString(codeFiles, call)
        found = !!foundIn
        break
      }

      case 'install':
        found = item.declaration in deps
        if (found) foundIn = 'package.json'
        break

      case 'endpoint': {
        const [, route] = item.declaration.split(' ')
        // /carrito/:itemId → strip param segment, plain-string search
        const base = route.split(':')[0].replace(/\/$/, '')
        foundIn = searchString(codeFiles, base)
        found = !!foundIn
        break
      }

      case 'pagination':
        foundIn = search(codeFiles, /\bpaginat|\bpage\b|\blimit\b|\bskip\b|\btake\b|\boffset\b/i)
        found = !!foundIn
        break
    }

    return { item, found, foundIn }
  })
}
