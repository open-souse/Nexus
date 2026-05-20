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

function escape(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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
        // Strip surrounding quotes then search for the message string
        const msg = item.declaration.replace(/^["']|["']$/g, '')
        foundIn = search(codeFiles, new RegExp(escape(msg), 'i'))
        found = !!foundIn
        break
      }

      case 'error-handler': {
        const codeMatch = item.declaration.match(/!error:(\d{3}|timeout|network|\*)/)
        if (codeMatch) {
          const code = codeMatch[1]
          const pattern = /^\d{3}$/.test(code)
            ? new RegExp(`\\b${code}\\b|HttpStatus\\.`, 'i')
            : new RegExp(escape(code), 'i')
          foundIn = search(codeFiles, pattern)
          found = !!foundIn
        }
        break
      }

      case 'action': {
        // => CartService.add() → search for the call (case-insensitive)
        const call = item.declaration.replace(/\(.*\)$/, '')
        foundIn = search(codeFiles, new RegExp(escape(call), 'i'))
        found = !!foundIn
        break
      }

      case 'install':
        found = item.declaration in deps
        if (found) foundIn = 'package.json'
        break

      case 'endpoint': {
        const [, route] = item.declaration.split(' ')
        // /carrito/:itemId → search for /carrito/
        const base = route.split(':')[0].replace(/\/$/, '')
        foundIn = search(codeFiles, new RegExp(escape(base), 'i'))
        found = !!foundIn
        break
      }

      case 'pagination':
        foundIn = search(codeFiles, /paginate|pagination|page.*limit|skip.*take|offset\b/i)
        found = !!foundIn
        break
    }

    return { item, found, foundIn }
  })
}
