// Extracts verifiable contract items from a NEXUS blueprint.

export type ContractItemType =
  | 'auth'
  | 'assertion'
  | 'error-handler'
  | 'action'
  | 'install'
  | 'endpoint'
  | 'pagination'

export interface ContractItem {
  type: ContractItemType
  declaration: string
  line: number
}

export function extractContract(blueprint: string): ContractItem[] {
  const items: ContractItem[] = []
  const lines = blueprint.replace(/\r/g, '').split('\n')

  lines.forEach((raw, index) => {
    const lineNumber = index + 1
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//')) return

    // @Auth
    if (/@Auth/.test(trimmed)) {
      items.push({ type: 'auth', declaration: trimmed, line: lineNumber })
    }

    // !! assertions
    if (trimmed.startsWith('!!')) {
      const content = trimmed.slice(2).trim()
      if (content) {
        items.push({ type: 'assertion', declaration: content, line: lineNumber })
      }
    }

    // !error:
    if (trimmed.startsWith('!error:')) {
      items.push({ type: 'error-handler', declaration: trimmed, line: lineNumber })
    }

    // => actions (skip lines that only have => with no target)
    const actionMatch = trimmed.match(/=>\s*(\S+)/)
    if (actionMatch && actionMatch[1]) {
      items.push({ type: 'action', declaration: actionMatch[1], line: lineNumber })
    }

    // @install / @install-dev
    if (trimmed.startsWith('@install')) {
      const pkg = trimmed.replace(/^@install(-dev)?\s+(-D\s+)?/, '').trim()
      if (pkg) {
        items.push({ type: 'install', declaration: pkg, line: lineNumber })
      }
    }

    // Endpoint METHOD /route
    const endpointMatch = trimmed.match(/^Endpoint\s+(GET|POST|PUT|PATCH|DELETE)\s+(\S+)/)
    if (endpointMatch) {
      items.push({
        type: 'endpoint',
        declaration: `${endpointMatch[1]} ${endpointMatch[2]}`,
        line: lineNumber
      })
    }

    // [paginate:]
    if (/\[paginate:/.test(trimmed)) {
      items.push({ type: 'pagination', declaration: trimmed, line: lineNumber })
    }
  })

  return items
}
