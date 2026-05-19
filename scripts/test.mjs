import { execSync } from 'child_process'

const major = parseInt(process.versions.node.split('.')[0], 10)
if (major < 20) {
  console.warn(`⚠️  Node ${process.versions.node} detected. nxlang requires Node >=20.`)
  console.warn('    Tests skipped. Use Node 20+ for full test coverage.')
  process.exit(0)
}

execSync('vitest run', { stdio: 'inherit' })
